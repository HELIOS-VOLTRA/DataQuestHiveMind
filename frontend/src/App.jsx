import { useState } from "react";
import "./App.css";
import ServiceRequests from "./pages/ServiceRequests";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

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

  return (
    <div className="app">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-mark">D</div>

          <div>
            <h2>DataQuest</h2>
            <span>HiveMind</span>
          </div>
        </div>

        <nav>
          <button
            className={`nav-item ${
              currentPage === "dashboard" ? "active" : ""
            }`}
            onClick={() => setCurrentPage("dashboard")}
          >
            Dashboard
          </button>

          <button
            className={`nav-item ${
              currentPage === "requests" ? "active" : ""
            }`}
            onClick={() => setCurrentPage("requests")}
          >
            Service Requests
          </button>

          <button className="nav-item">Equipment</button>

          <button className="nav-item">Technicians</button>

          <button className="nav-item">Spare Parts</button>

          <button className="nav-item">Notifications</button>

          <button className="nav-item">Service History</button>
        </nav>

        <div className="sidebar-footer">
          <span>System Status</span>

          <strong>
            <i></i> Operational
          </strong>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      {currentPage === "dashboard" ? (
        <main className="main">
          {/* HEADER */}
          <header className="header">
            <div>
              <p className="eyebrow">OPERATIONS CENTER</p>
              <h1>Dashboard</h1>
            </div>

            <div className="header-right">
              <button className="notification-button">🔔</button>

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
                Here's what's happening across your equipment service
                operations.
              </p>
            </div>

            <button
              className="primary-button"
              onClick={() => setCurrentPage("requests")}
            >
              + Create Service Request
            </button>
          </section>

          {/* STATISTICS */}
          <section className="stats">
            <div className="stat-card">
              <span>Pending Requests</span>

              <strong>24</strong>

              <small>↑ 8% from yesterday</small>
            </div>

            <div className="stat-card">
              <span>Active Services</span>

              <strong>8</strong>

              <small>5 technicians on site</small>
            </div>

            <div className="stat-card urgent">
              <span>Urgent Issues</span>

              <strong>3</strong>

              <small>Requires attention</small>
            </div>

            <div className="stat-card">
              <span>Available Technicians</span>

              <strong>12</strong>

              <small>Across 4 locations</small>
            </div>
          </section>

          {/* CONTENT GRID */}
          <section className="content-grid">
            {/* RECENT REQUESTS */}
            <div className="panel requests-panel">
              <div className="panel-header">
                <div>
                  <p className="eyebrow">LIVE OPERATIONS</p>

                  <h2>Recent Service Requests</h2>
                </div>

                <button
                  className="text-button"
                  onClick={() => setCurrentPage("requests")}
                >
                  View all →
                </button>
              </div>

              <div className="request-list">
                {requests.map((request) => (
                  <div className="request-row" key={request.id}>
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
                      onClick={() => setCurrentPage("requests")}
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

                  <span>M-104 · Site A</span>
                </div>
              </div>

              <div className="alert">
                <div className="alert-icon">!</div>

                <div>
                  <strong>Spare part running low</strong>

                  <span>Motor Coupling · 2 remaining</span>
                </div>
              </div>

              <div className="alert">
                <div className="alert-icon">!</div>

                <div>
                  <strong>SLA approaching</strong>

                  <span>M-208 · 45 minutes remaining</span>
                </div>
              </div>
            </div>
          </section>
        </main>
      ) : (
        <ServiceRequests />
      )}
    </div>
  );
}

export default App;