import { useState } from "react";
import "./App.css";

import ServiceRequests from "./pages/ServiceRequests";
import Technicians from "./pages/Technicians";
import SpareParts from "./pages/SpareParts";
import Notifications from "./pages/Notifications";

function App() {
  const [page, setPage] = useState("dashboard");

  const requests = [
    {
      id: "M-104",
      site: "Site A",
      priority: "Urgent",
      status: "Pending",
    },
    {
      id: "M-208",
      site: "Site B",
      priority: "High",
      status: "Assigned",
    },
    {
      id: "M-301",
      site: "Site C",
      priority: "Normal",
      status: "Active",
    },
  ];

  const handleNavigation = (selectedPage) => {
    setPage(selectedPage);
  };

  /* =========================
     DASHBOARD
  ========================= */

  const Dashboard = () => {
    return (
      <main className="main">
        <header className="header">
          <div>
            <p className="eyebrow">OPERATIONS CENTER</p>
            <h1>Dashboard</h1>
          </div>

          <div className="header-right">
            <button
              className="notification-button"
              onClick={() => handleNavigation("notifications")}
            >
              🔔
            </button>

            <div className="user">
              <div className="avatar">A</div>

              <div>
                <strong>Admin User</strong>
                <span>Operations Manager</span>
              </div>
            </div>
          </div>
        </header>

        {/* WELCOME */}
        <section className="welcome">
          <div>
            <h2>Good morning, Admin.</h2>

            <p>
              Here's what's happening across your equipment
              service operations.
            </p>
          </div>

          <button
            className="primary-button"
            onClick={() => handleNavigation("service-requests")}
          >
            + Create Service Request
          </button>
        </section>

        {/* STATISTICS */}
        <section className="stats">
          <div className="stat-card">
            <span>Pending Requests</span>
            <strong>
              {requests.filter((r) => r.status === "Pending").length}
            </strong>
            <small>From live database</small>
          </div>

          <div className="stat-card">
            <span>Active Services</span>
            <strong>
              {
                requests.filter(
                  (r) =>
                    r.status === "Assigned" ||
                    r.status === "In Progress"
                ).length
              }
            </strong>
            <small>Assigned or in progress</small>
          </div>

          <div className="stat-card urgent">
            <span>Urgent Issues</span>
            <strong>
              {requests.filter((r) => r.priority === "Urgent").length}
            </strong>
            <small>Requires attention</small>
          </div>

          <div className="stat-card">
            <span>Total Requests</span>
            <strong>{requests.length}</strong>
            <small>From live database</small>
          </div>
        </section>

        {/* CONTENT */}
        <section className="content-grid">
          {/* SERVICE REQUESTS */}
          <div className="panel requests-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">LIVE OPERATIONS</p>
                <h2>Recent Service Requests</h2>
              </div>

              <button
                className="text-button"
                onClick={() =>
                  handleNavigation("service-requests")
                }
              >
                View all →
              </button>
            </div>

            <div className="request-list">
              {requests.map((request) => (
                <div
                  className="request-row"
                  key={request.id}
                >
                  <div className="machine-icon">⚙</div>

                  <div className="request-info">
                    <strong>{request.id}</strong>
                    <span>{request.site}</span>
                  </div>

                  <span
                    className={`priority ${request.priority.toLowerCase()}`}
                  >
                    {request.priority}
                  </span>

                  <span
                    className={`status ${request.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {request.status}
                  </span>

                  <button
                    className="arrow-button"
                    onClick={() =>
                      handleNavigation("service-requests")
                    }
                  >
                    →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ALERTS */}
          <div className="panel alerts-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">ATTENTION</p>
                <h2>Alerts</h2>
              </div>

              <span className="alert-count">3</span>
            </div>

            <div className="alert">
              <div className="alert-icon">!</div>

              <div>
                <strong>Technician unavailable</strong>
                <span>Robotics request · Site C</span>
              </div>
            </div>

            <div className="alert">
              <div className="alert-icon">!</div>

              <div>
                <strong>Spare part running low</strong>
                <span>
                  Motor Coupling · 2 remaining
                </span>
              </div>
            </div>

            <div className="alert">
              <div className="alert-icon">!</div>

              <div>
                <strong>SLA approaching</strong>
                <span>
                  M-208 · 45 minutes remaining
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  };

  /* =========================
     PLACEHOLDER EQUIPMENT PAGE
  ========================= */

  const Equipment = () => {
    return (
      <main className="main">
        <header className="header">
          <div>
            <p className="eyebrow">OPERATIONS CENTER</p>
            <h1>Equipment</h1>
          </div>

          <div className="header-right">
            <button
              className="notification-button"
              onClick={() => handleNavigation("notifications")}
            >
              🔔
            </button>

            <div className="user">
              <div className="avatar">A</div>

              <div>
                <strong>Admin User</strong>
                <span>Operations Manager</span>
              </div>
            </div>
          </div>
        </header>

        <section className="welcome">
          <div>
            <h2>Equipment Management</h2>

            <p>
              Monitor equipment condition, maintenance status
              and operational health.
            </p>
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">FIELD OPERATIONS</p>
              <h2>Equipment Overview</h2>
            </div>
          </div>

          <div className="request-list">
            <div className="request-row">
              <div className="machine-icon">⚙</div>

              <div className="request-info">
                <strong>M-104</strong>
                <span>Site A · Motor</span>
              </div>

              <span className="status pending">
                Maintenance Required
              </span>
            </div>

            <div className="request-row">
              <div className="machine-icon">⚙</div>

              <div className="request-info">
                <strong>M-208</strong>
                <span>Site B · Hydraulic System</span>
              </div>

              <span className="status active">
                Operational
              </span>
            </div>

            <div className="request-row">
              <div className="machine-icon">⚙</div>

              <div className="request-info">
                <strong>M-301</strong>
                <span>Site C · Production Unit</span>
              </div>

              <span className="status active">
                Operational
              </span>
            </div>

            <div className="request-row">
              <div className="machine-icon">⚙</div>

              <div className="request-info">
                <strong>M-401</strong>
                <span>Site D · Industrial Motor</span>
              </div>

              <span className="status urgent">
                Attention Required
              </span>
            </div>
          </div>
        </section>
      </main>
    );
  };

  /* =========================
     SIDEBAR
  ========================= */

  const Sidebar = () => {
    return (
      <aside className="sidebar">
        {/* LOGO */}
        <div className="logo">
          <div className="logo-mark">D</div>

          <div>
            <h2>DataQuest</h2>
            <span>HiveMind</span>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav>
          <button
            className={`nav-item ${
              page === "dashboard" ? "active" : ""
            }`}
            onClick={() => handleNavigation("dashboard")}
          >
            Dashboard
          </button>

          <button
            className={`nav-item ${
              page === "service-requests"
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleNavigation("service-requests")
            }
          >
            Service Requests
          </button>

          <button
            className={`nav-item ${
              page === "equipment" ? "active" : ""
            }`}
            onClick={() => handleNavigation("equipment")}
          >
            Equipment
          </button>

          <button
            className={`nav-item ${
              page === "technicians" ? "active" : ""
            }`}
            onClick={() => handleNavigation("technicians")}
          >
            Technicians
          </button>

          <button
            className={`nav-item ${
              page === "spare-parts" ? "active" : ""
            }`}
            onClick={() =>
              handleNavigation("spare-parts")
            }
          >
            Spare Parts
          </button>

          <button
            className={`nav-item ${
              page === "notifications" ? "active" : ""
            }`}
            onClick={() =>
              handleNavigation("notifications")
            }
          >
            Notifications
          </button>

          <button
            className={`nav-item ${
              page === "service-history"
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleNavigation("service-history")
            }
          >
            Service History
          </button>
        </nav>

        {/* FOOTER */}
        <div className="sidebar-footer">
          <span>System Status</span>

          <strong>
            <i></i> Operational
          </strong>
        </div>
      </aside>
    );
  };

  /* =========================
     SERVICE HISTORY
  ========================= */

  const ServiceHistory = () => {
    return (
      <main className="main">
        <header className="header">
          <div>
            <p className="eyebrow">OPERATIONS CENTER</p>
            <h1>Service History</h1>
          </div>

          <div className="header-right">
            <button
              className="notification-button"
              onClick={() =>
                handleNavigation("notifications")
              }
            >
              🔔
            </button>

            <div className="user">
              <div className="avatar">A</div>

              <div>
                <strong>Admin User</strong>
                <span>Operations Manager</span>
              </div>
            </div>
          </div>
        </header>

        <section className="welcome">
          <div>
            <h2>Service History</h2>

            <p>
              Review completed service requests and
              maintenance activity.
            </p>
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">SERVICE RECORDS</p>
              <h2>Recent Completed Services</h2>
            </div>
          </div>

          <div className="request-list">
            <div className="request-row">
              <div className="machine-icon">✓</div>

              <div className="request-info">
                <strong>SR-1021</strong>
                <span>M-301 · Site C</span>
              </div>

              <span className="status active">
                Completed
              </span>
            </div>

            <div className="request-row">
              <div className="machine-icon">✓</div>

              <div className="request-info">
                <strong>SR-1020</strong>
                <span>M-208 · Site B</span>
              </div>

              <span className="status active">
                Completed
              </span>
            </div>

            <div className="request-row">
              <div className="machine-icon">✓</div>

              <div className="request-info">
                <strong>SR-1018</strong>
                <span>M-104 · Site A</span>
              </div>

              <span className="status active">
                Completed
              </span>
            </div>
          </div>
        </section>
      </main>
    );
  };

  /* =========================
     PAGE SWITCHING
  ========================= */

  const renderPage = () => {
    switch (page) {
      case "service-requests":
        return <ServiceRequests />;

      case "technicians":
        return <Technicians />;

      case "spare-parts":
        return <SpareParts />;

      case "notifications":
        return <Notifications />;

      case "equipment":
        return <Equipment />;

      case "service-history":
        return <ServiceHistory />;

      case "dashboard":
      default:
        return <Dashboard />;
    }
  };

  /* =========================
     FINAL APP
  ========================= */

  return (
    <div className="app">
      <Sidebar />

      {renderPage()}
    </div>
  );
}

export default App; 