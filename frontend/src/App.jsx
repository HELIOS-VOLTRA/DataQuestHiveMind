import { useState } from "react";
import "./App.css";

import ServiceRequests from "./pages/ServiceRequests";
import Technicians from "./pages/Technicians";
import SpareParts from "./pages/SpareParts";
import Notifications from "./pages/Notifications";
import SmartOperations from "./pages/SmartOperations";
import Equipment from "./Equipment";
import Landing from "./pages/Landing";

function Dashboard({ setActivePage }) {
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

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Open Requests</span>
          <strong>12</strong>
          <span className="stat-subtitle">Needs attention</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Active Technicians</span>
          <strong>8</strong>
          <span className="stat-subtitle">Currently available</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Equipment</span>
          <strong>24</strong>
          <span className="stat-subtitle">Tracked machines</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Low Stock Parts</span>
          <strong>5</strong>
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
            <strong>2</strong>
          </div>

          <div className="overview-row">
            <span>Requests In Progress</span>
            <strong>4</strong>
          </div>

          <div className="overview-row">
            <span>Available Technicians</span>
            <strong>6</strong>
          </div>

          <div className="overview-row">
            <span>Machines Requiring Attention</span>
            <strong>3</strong>
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <h2>Recent Activity</h2>

        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-dot urgent"></span>

            <div>
              <strong>Urgent service request</strong>
              <p>CNC Machine M-102 requires immediate attention.</p>
            </div>
          </div>

          <div className="activity-item">
            <span className="activity-dot"></span>

            <div>
              <strong>Technician assigned</strong>
              <p>Technician assignment updated for SR-1002.</p>
            </div>
          </div>

          <div className="activity-item">
            <span className="activity-dot warning"></span>

            <div>
              <strong>Low stock alert</strong>
              <p>
                Hydraulic Seal Kit has reached its minimum stock level.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceHistory() {
  const history = [
    {
      id: "SR-1001",
      machine: "Hydraulic Press M-104",
      issue: "Hydraulic pressure dropping",
      technician: "Arjun Kumar",
      status: "Completed",
      date: "06 Oct 2026",
      duration: "2h 34m",
    },
    {
      id: "SR-1002",
      machine: "CNC Machine M-102",
      issue: "Inaccurate cuts",
      technician: "Priya Sharma",
      status: "Completed",
      date: "05 Oct 2026",
      duration: "3h 12m",
    },
    {
      id: "SR-1003",
      machine: "Air Compressor M-103",
      issue: "Unusual vibration",
      technician: "Rahul Singh",
      status: "Completed",
      date: "04 Oct 2026",
      duration: "1h 48m",
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Service History</h1>
          <p>Review completed maintenance and service activities.</p>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="history-list">
          {history.map((item) => (
            <div className="history-card" key={item.id}>
              <div className="history-top">
                <div>
                  <span className="request-id">{item.id}</span>
                  <h3>{item.machine}</h3>
                </div>

                <span className="status-completed">{item.status}</span>
              </div>

              <p>{item.issue}</p>

              <div className="history-details">
                <span>
                  <strong>Technician:</strong> {item.technician}
                </span>

                <span>
                  <strong>Date:</strong> {item.date}
                </span>

                <span>
                  <strong>Duration:</strong> {item.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
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
      icon: "▦",
    },
    {
      id: "service-requests",
      label: "Service Requests",
      icon: "📋",
    },
    {
      id: "equipment",
      label: "Equipment",
      icon: "⚙",
    },
    {
      id: "technicians",
      label: "Technicians",
      icon: "👨‍🔧",
    },
    {
      id: "spare-parts",
      label: "Spare Parts",
      icon: "📦",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: "🔔",
    },
    {
      id: "service-history",
      label: "Service History",
      icon: "🕘",
    },
    {
      id: "smart-operations",
      label: "HiveMind Intelligence",
      icon: "🧠",
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