import { useState } from "react";
import "../App.css";

const initialNotifications = [
  {
    id: 1,
    title: "Urgent service request",
    message: "M-104 requires immediate attention.",
    time: "10 minutes ago",
    type: "Urgent",
    read: false,
  },
  {
    id: 2,
    title: "SLA approaching",
    message: "SR-1025 has 45 minutes remaining before the SLA deadline.",
    time: "25 minutes ago",
    type: "Warning",
    read: false,
  },
  {
    id: 3,
    title: "Low spare part stock",
    message: "Motor Coupling has only 2 units remaining.",
    time: "1 hour ago",
    type: "Warning",
    read: false,
  },
  {
    id: 4,
    title: "Technician assigned",
    message: "Rahul Kumar has been assigned to SR-1025.",
    time: "2 hours ago",
    type: "Assignment",
    read: true,
  },
  {
    id: 5,
    title: "Service completed",
    message: "Routine maintenance for M-301 has been completed.",
    time: "3 hours ago",
    type: "Success",
    read: true,
  },
  {
    id: 6,
    title: "Equipment maintenance required",
    message: "M-401 has been flagged for preventive maintenance.",
    time: "5 hours ago",
    type: "Maintenance",
    read: true,
  },
];

function Notifications() {
  const [notifications, setNotifications] =
    useState(initialNotifications);

  const [filter, setFilter] = useState("All");

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const filteredNotifications = notifications.filter(
    (notification) => {
      if (filter === "Unread") {
        return !notification.read;
      }

      if (filter === "Urgent") {
        return notification.type === "Urgent";
      }

      if (filter === "Warnings") {
        return notification.type === "Warning";
      }

      return true;
    }
  );

  const markAsRead = (id) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <main className="main">
      {/* HEADER */}
      <header className="header">
        <div>
          <p className="eyebrow">OPERATIONS CENTER</p>
          <h1>Notifications</h1>
        </div>

        <div className="header-right">
          <button className="notification-button">
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

      {/* INTRO */}
      <section className="welcome">
        <div>
          <h2>Notifications Center</h2>

          <p>
            Stay updated with service requests, technicians,
            equipment and inventory alerts.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={markAllAsRead}
        >
          ✓ Mark All as Read
        </button>
      </section>

      {/* SUMMARY */}
      <section className="stats">
        <div className="stat-card">
          <span>Total Notifications</span>
          <strong>{notifications.length}</strong>
          <small>Recent operational updates</small>
        </div>

        <div className="stat-card urgent">
          <span>Unread</span>
          <strong>{unreadCount}</strong>
          <small>Require your attention</small>
        </div>

        <div className="stat-card">
          <span>Warnings</span>
          <strong>
            {
              notifications.filter(
                (notification) =>
                  notification.type === "Warning"
              ).length
            }
          </strong>
          <small>Potential issues detected</small>
        </div>

        <div className="stat-card">
          <span>Urgent</span>
          <strong>
            {
              notifications.filter(
                (notification) =>
                  notification.type === "Urgent"
              ).length
            }
          </strong>
          <small>Immediate attention required</small>
        </div>
      </section>

      {/* NOTIFICATIONS PANEL */}
      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">RECENT ACTIVITY</p>
            <h2>Notification Feed</h2>
          </div>

          <button
            className="text-button"
            onClick={clearNotifications}
          >
            Clear all
          </button>
        </div>

        {/* FILTERS */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "22px",
            flexWrap: "wrap",
          }}
        >
          <button
            className={
              filter === "All"
                ? "primary-button"
                : "text-button"
            }
            onClick={() => setFilter("All")}
          >
            All
          </button>

          <button
            className={
              filter === "Unread"
                ? "primary-button"
                : "text-button"
            }
            onClick={() => setFilter("Unread")}
          >
            Unread
          </button>

          <button
            className={
              filter === "Urgent"
                ? "primary-button"
                : "text-button"
            }
            onClick={() => setFilter("Urgent")}
          >
            Urgent
          </button>

          <button
            className={
              filter === "Warnings"
                ? "primary-button"
                : "text-button"
            }
            onClick={() => setFilter("Warnings")}
          >
            Warnings
          </button>
        </div>

        {/* NOTIFICATION LIST */}
        <div className="service-request-list">
          {filteredNotifications.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
              }}
            >
              <div
                style={{
                  fontSize: "42px",
                  marginBottom: "15px",
                }}
              >
                ✓
              </div>

              <h2>No notifications</h2>

              <p
                style={{
                  color: "#64748b",
                }}
              >
                There are no notifications matching this
                filter.
              </p>

              <button
                className="text-button"
                onClick={() => setFilter("All")}
              >
                Show all notifications
              </button>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                className="service-request-card"
                key={notification.id}
                style={{
                  position: "relative",
                  borderLeft: notification.read
                    ? "4px solid #e2e8f0"
                    : "4px solid #38bdf8",
                  background: notification.read
                    ? "#ffffff"
                    : "#f8fbff",
                }}
              >
                <div className="request-card-top">
                  <div>
                    <span className="request-id">
                      {notification.time}
                    </span>

                    <h3>
                      {!notification.read && (
                        <span
                          style={{
                            color: "#38bdf8",
                            marginRight: "8px",
                            fontSize: "12px",
                          }}
                        >
                          ●
                        </span>
                      )}

                      {notification.title}
                    </h3>

                    <p
                      style={{
                        color: "#64748b",
                        marginTop: "7px",
                      }}
                    >
                      {notification.message}
                    </p>
                  </div>

                  <span
                    className={`status ${notification.type.toLowerCase()}`}
                  >
                    {notification.type}
                  </span>
                </div>

                <div className="request-card-bottom">
                  <span
                    style={{
                      color: notification.read
                        ? "#94a3b8"
                        : "#0f172a",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    {notification.read
                      ? "Read"
                      : "Unread"}
                  </span>

                  {!notification.read && (
                    <button
                      className="text-button"
                      onClick={() =>
                        markAsRead(notification.id)
                      }
                    >
                      Mark as read →
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default Notifications;