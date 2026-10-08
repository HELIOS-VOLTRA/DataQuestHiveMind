import { useState, useEffect } from "react";
import "./App.css";

import ServiceRequests from "./pages/ServiceRequests";
import Technicians from "./pages/Technicians";
import SpareParts from "./pages/SpareParts";
import Notifications from "./pages/Notifications";
import SmartOperations from "./pages/SmartOperations";
import Equipment from "./Equipment";
import Landing from "./pages/Landing";

function Dashboard({ setActivePage }) {
  const API_BASE =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000";

  const [requests, setRequests] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [machines, setMachines] = useState([]);
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const responses = await Promise.all([
          fetch(`${API_BASE}/api/service-requests`),
          fetch(`${API_BASE}/api/technicians`),
          fetch(`${API_BASE}/api/machines`),
          fetch(`${API_BASE}/api/spare-parts`)
        ]);

        if (responses.some((response) => !response.ok)) {
          throw new Error("Failed to load dashboard data");
        }

        const [
          requestsData,
          techniciansData,
          machinesData,
          partsData
        ] = await Promise.all(
          responses.map((response) => response.json())
        );

        if (
          !requestsData.success ||
          !techniciansData.success ||
          !machinesData.success ||
          !partsData.success
        ) {
          throw new Error("One or more dashboard APIs returned an error");
        }

        setRequests(requestsData.service_requests || []);
        setTechnicians(techniciansData.technicians || []);
        setMachines(machinesData.machines || []);
        setParts(partsData.parts || []);
      } catch (err) {
        console.error("Dashboard error:", err);
        setError(err.message || "Unable to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [API_BASE]);

  const openRequests = requests.filter(
    (request) =>
      String(request.status || "").toLowerCase() !== "completed"
  ).length;

  const activeTechnicians = technicians.filter((technician) => {
    const status = String(
      technician.availability_status ||
      technician.status ||
      ""
    ).toLowerCase();

    return ["available", "on duty", "ready"].includes(status);
  }).length;

  const lowStockParts = parts.filter(
    (part) => part.status === "LOW STOCK"
  ).length;

  const urgentRequests = requests.filter(
    (request) =>
      String(request.priority || "").toLowerCase() === "urgent"
  ).length;

  const inProgressRequests = requests.filter(
    (request) =>
      String(request.status || "").toLowerCase() === "in progress"
  ).length;

  const machinesNeedingAttention = machines.filter((machine) => {
    const status = String(
      machine.status ||
      machine.machine_status ||
      ""
    ).toLowerCase();

    return !["operational", "online", "active"].includes(status);
  }).length;

  const recentRequests = [...requests]
    .sort(
      (a, b) =>
        new Date(b.created_at || 0).getTime() -
        new Date(a.created_at || 0).getTime()
    )
    .slice(0, 3);

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Service Operations Dashboard</h1>
          <p>
            Monitor industrial equipment, service requests, technicians and
            resources from one place.
          </p>
        </div>
      </div>

      {error && (
        <div
          className="dashboard-card"
          style={{ marginBottom: "14px" }}
        >
          <strong>Dashboard API Error</strong>
          <p>{error}</p>
        </div>
      )}

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Open Requests</span>
          <strong>{loading ? "—" : openRequests}</strong>
          <span className="stat-subtitle">Needs attention</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Active Technicians</span>
          <strong>{loading ? "—" : activeTechnicians}</strong>
          <span className="stat-subtitle">Currently available</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Equipment</span>
          <strong>{loading ? "—" : machines.length}</strong>
          <span className="stat-subtitle">Tracked machines</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Low Stock Parts</span>
          <strong>{loading ? "—" : lowStockParts}</strong>
          <span className="stat-subtitle">Replenishment required</span>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Quick Actions</h2>

          <div className="quick-actions">
            <button onClick={() => setActivePage("service-requests")}>
              Create Service Request
            </button>

            <button onClick={() => setActivePage("technicians")}>
              Find Technician
            </button>

            <button onClick={() => setActivePage("equipment")}>
              View Equipment
            </button>

            <button onClick={() => setActivePage("spare-parts")}>
              Check Spare Parts
            </button>

            <button onClick={() => setActivePage("smart-operations")}>
              Open HiveMind Intelligence
            </button>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>System Overview</h2>

          <div className="overview-row">
            <span>Urgent Requests</span>
            <strong>{loading ? "—" : urgentRequests}</strong>
          </div>

          <div className="overview-row">
            <span>Requests In Progress</span>
            <strong>{loading ? "—" : inProgressRequests}</strong>
          </div>

          <div className="overview-row">
            <span>Available Technicians</span>
            <strong>{loading ? "—" : activeTechnicians}</strong>
          </div>

          <div className="overview-row">
            <span>Machines Requiring Attention</span>
            <strong>{loading ? "—" : machinesNeedingAttention}</strong>
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <h2>Recent Activity</h2>

        {loading ? (
          <div className="activity-list">
            <div className="activity-item">
              <div>
                <strong>Loading live activity...</strong>
                <p>Fetching the latest service requests.</p>
              </div>
            </div>
          </div>
        ) : recentRequests.length === 0 ? (
          <div className="activity-list">
            <div className="activity-item">
              <div>
                <strong>No recent requests</strong>
                <p>No service activity is currently available.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="activity-list">
            {recentRequests.map((request, index) => (
              <div
                className="activity-item"
                key={request.request_id || index}
              >
                <span
                  className={`activity-dot ${
                    String(request.priority || "").toLowerCase() === "urgent"
                      ? "urgent"
                      : String(request.status || "").toLowerCase() === "pending"
                        ? "warning"
                        : ""
                  }`}
                ></span>

                <div>
                  <strong>
                    {String(
                      request.status || "Service request"
                    ).toUpperCase()}
                  </strong>

                  <p>
                    {request.machine_name ||
                      request.machine_code ||
                      `Machine ${request.machine_id || "—"}`}{" "}
                    — {request.issue_description || "Maintenance request"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
function ServiceHistory() {
  const API_BASE =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000";

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadHistory = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_BASE}/api/service-history`
        );

        if (!response.ok) {
          throw new Error("Failed to load service history");
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(
            data.error || "Failed to load service history"
          );
        }

        setHistory(data.history || []);
      } catch (err) {
        console.error("Service history error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, [API_BASE]);

  const formatDate = (dateString) => {
    if (!dateString) return "â€”";

    const date = new Date(dateString);

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const calculateDuration = (start, end) => {
    if (!start || !end) return "â€”";

    const startTime = new Date(start);
    const endTime = new Date(end);

    const minutes = Math.max(
      0,
      Math.round((endTime - startTime) / 60000)
    );

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${remainingMinutes}m`;
    }

    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Service History</h1>
          <p>
            Review completed maintenance and service activities.
          </p>
        </div>
      </div>

      <div className="dashboard-card">
        {loading && (
          <div className="empty-state">
            <p>Loading service history...</p>
          </div>
        )}

        {!loading && error && (
          <div className="empty-state">
            <p>Unable to load service history.</p>
            <small>{error}</small>
          </div>
        )}

        {!loading && !error && history.length === 0 && (
          <div className="empty-state">
            <p>No completed service activities yet.</p>
          </div>
        )}

        {!loading && !error && history.length > 0 && (
          <div className="history-list">
            {history.map((item) => (
              <div
                className="history-card"
                key={item.assignment_id}
              >
                <div className="history-top">
                  <div>
                    <span className="request-id">
                      SR-{String(item.request_id).padStart(4, "0")}
                    </span>

                    <h3>
                      {item.machine_name}{" "}
                      {item.machine_code}
                    </h3>
                  </div>

                  <span className="status-completed">
                    {item.status}
                  </span>
                </div>

                <p>{item.issue_description}</p>

                <div className="history-details">
                  <span>
                    <strong>Technician:</strong>{" "}
                    {item.technician_name}
                  </span>

                  <span>
                    <strong>Date:</strong>{" "}
                    {formatDate(item.work_completed_at)}
                  </span>

                  <span>
                    <strong>Duration:</strong>{" "}
                    {calculateDuration(
                      item.work_started_at,
                      item.work_completed_at
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
  

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  // Controls whether the landing page is visible
  const [showLanding, setShowLanding] = useState(true);

  const navigation = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "â–¦",
    },
    {
      id: "service-requests",
      label: "Service Requests",
      icon: "ðŸ“‹",
    },
    {
      id: "equipment",
      label: "Equipment",
      icon: "âš™",
    },
    {
      id: "technicians",
      label: "Technicians",
      icon: "ðŸ‘¨â€ðŸ”§",
    },
    {
      id: "spare-parts",
      label: "Spare Parts",
      icon: "ðŸ“¦",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: "ðŸ””",
    },
    {
      id: "service-history",
      label: "Service History",
      icon: "ðŸ•˜",
    },
    {
      id: "smart-operations",
      label: "HiveMind Intelligence",
      icon: "ðŸ§ ",
    },
  ];

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard setActivePage={setActivePage} />;

      case "service-requests":
        return <ServiceRequests />;

      case "equipment":
        return <Equipment />;

      case "technicians":
        return <Technicians />;

      case "spare-parts":
        return <SpareParts />;

      case "notifications":
        return <Notifications />;

      case "service-history":
        return <ServiceHistory />;

      case "smart-operations":
        return <SmartOperations />;

      default:
        return <Dashboard setActivePage={setActivePage} />;
    }
  };

  // Show the new landing page first
  if (showLanding) {
    return (
      <Landing
        onEnter={() => setShowLanding(false)}
      />
    );
  }

  // Main application
  return (
    <div className="app-shell">
      <aside className="sidebar">

        <div className="brand">
          <div className="brand-logo">
            DQ
          </div>

          <div>
            <h2>DataQuest</h2>
            <span>HiveMind</span>
          </div>
        </div>

        <div className="sidebar-section">

          <span className="sidebar-title">
            OPERATIONS
          </span>

          <nav>
            {navigation.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${
                  activePage === item.id ? "active" : ""
                }`}
                onClick={() => setActivePage(item.id)}
              >
                <span className="nav-icon">
                  {item.icon}
                </span>

                <span>
                  {item.label}
                </span>
              </button>
            ))}
          </nav>

        </div>

        <div className="sidebar-bottom">

          <div className="system-status">

            <span className="status-indicator"></span>

            <div>
              <strong>
                System Online
              </strong>

              <small>
                All services operational
              </small>
            </div>

          </div>

        </div>

      </aside>

      <main className="main-content">

        <header className="topbar">

          <div>
            <span className="breadcrumb">
              DataQuest HiveMind
            </span>
          </div>

          <div className="topbar-right">

            <span className="live-indicator">
              <span></span>
              Live
            </span>

            <div className="user-profile">

              <div className="avatar">
                G
              </div>

              <div>
                <strong>
                  Admin
                </strong>

                <small>
                  Operations Manager
                </small>
              </div>

            </div>

          </div>

        </header>

        <section className="content-area">
          {renderPage()}
        </section>

      </main>
    </div>
  );
}

export default App;


