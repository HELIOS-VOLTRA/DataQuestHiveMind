import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://127.0.0.1:5000";

function App() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/service-requests`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch service requests");
        }
        return response.json();
      })
      .then((data) => {
        setRequests(data.service_requests || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not connect to the backend.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-mark">D</div>
          <div>
            <h2>DataQuest</h2>
            <span>HiveMind</span>
          </div>
        </div>

        <nav>
          <a className="nav-item active">Dashboard</a>
          <a className="nav-item">Service Requests</a>
          <a className="nav-item">Equipment</a>
          <a className="nav-item">Technicians</a>
          <a className="nav-item">Spare Parts</a>
          <a className="nav-item">Notifications</a>
          <a className="nav-item">Service History</a>
        </nav>

        <div className="sidebar-footer">
          <span>System Status</span>
          <strong>
            <i></i> Operational
          </strong>
        </div>
      </aside>

      <main className="main">
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

        <section className="welcome">
          <div>
            <h2>Good morning, Admin.</h2>
            <p>
              Here's what's happening across your equipment service
              operations.
            </p>
          </div>

          <button className="primary-button">
            + Create Service Request
          </button>
        </section>

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

        <section className="content-grid">
          <div className="panel requests-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">LIVE OPERATIONS</p>
                <h2>Recent Service Requests</h2>
              </div>

              <button className="text-button">View all →</button>
            </div>

            {loading && (
              <p style={{ padding: "20px" }}>
                Loading service requests...
              </p>
            )}

            {error && (
              <p style={{ padding: "20px", color: "red" }}>
                {error}
              </p>
            )}

            {!loading && !error && (
              <div className="request-list">
                {requests.map((request) => (
                  <div
                    className="request-row"
                    key={request.request_id}
                  >
                    <div className="machine-icon">⚙</div>

                    <div className="request-info">
                      <strong>
                        Request #{request.request_id}
                      </strong>

                      <span>
                        Machine #{request.machine_id}
                      </span>
                    </div>

                    <span
                      className={`priority ${request.priority
                        .toLowerCase()
                        .replace(" ", "-")}`}
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

                    <button className="arrow-button">→</button>
                  </div>
                ))}
              </div>
            )}
          </div>

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
                <span>Robot Sensor · 3 remaining</span>
              </div>
            </div>

            <div className="alert">
              <div className="alert-icon">!</div>
              <div>
                <strong>SLA approaching</strong>
                <span>CNC request · High priority</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;