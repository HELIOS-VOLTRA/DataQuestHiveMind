import { useState } from "react";
import "./HiveMindPage.css";


function Notifications() {

  const [notifications, setNotifications] =
    useState([

      {
        id: 1,
        type: "MACHINE",
        event: "M-102 health below threshold",
        priority: "CRITICAL",
        time: "14:32",
        read: false
      },

      {
        id: 2,
        type: "SERVICE",
        event: "SR-1025 awaiting technician assignment",
        priority: "HIGH",
        time: "13:58",
        read: false
      },

      {
        id: 3,
        type: "INVENTORY",
        event: "Hydraulic Seal Kit below minimum",
        priority: "LOW STOCK",
        time: "12:41",
        read: false
      },

      {
        id: 4,
        type: "SLA",
        event: "SR-1024 approaching SLA deadline",
        priority: "HIGH",
        time: "11:26",
        read: true
      },

      {
        id: 5,
        type: "WORKFORCE",
        event: "Technician Priya Sharma became available",
        priority: "INFO",
        time: "10:18",
        read: true
      },

      {
        id: 6,
        type: "MACHINE",
        event: "M-104 returned to operational state",
        priority: "INFO",
        time: "09:52",
        read: true
      }

    ]);


  const unread =
    notifications.filter(
      (item) => !item.read
    ).length;


  const critical =
    notifications.filter(
      (item) =>
        item.priority ===
        "CRITICAL"
    ).length;


  const markAllRead = () => {

    setNotifications(
      notifications.map(
        (item) => ({
          ...item,
          read: true
        })
      )
    );

  };


  return (

    <div className="hm-page">

      <div className="hm-header">

        <div>

          <span className="hm-kicker">
            SYSTEM SIGNALS / 06
          </span>

          <h1>
            Alerts
          </h1>

          <p>
            Critical operational events, service updates,
            SLA warnings and inventory exceptions.
          </p>

        </div>


        <button
          className="hm-button-dark"
          onClick={markAllRead}
        >
          MARK ALL READ
        </button>

      </div>


      <div className="hm-grid hm-grid-3">

        <div className="hm-metric">

          <span className="hm-metric-label">
            TOTAL SIGNALS
          </span>

          <strong className="hm-metric-value">
            {notifications.length}
          </strong>

        </div>


        <div className="hm-metric">

          <span className="hm-metric-label">
            UNREAD
          </span>

          <strong className="hm-metric-value hm-warning">
            {unread}
          </strong>

        </div>


        <div className="hm-metric">

          <span className="hm-metric-label">
            CRITICAL
          </span>

          <strong className="hm-metric-value hm-risk">
            {critical}
          </strong>

        </div>

      </div>


      <div
        className="hm-panel"
        style={{ marginTop: "14px" }}
      >

        <div className="hm-panel-header">

          <div>

            <span className="hm-panel-label">
              LIVE SIGNAL FEED
            </span>

            <h2>
              Operational Alerts
            </h2>

          </div>

        </div>


        {notifications.map((notification) => (

          <div
            className="hm-data-row"
            key={notification.id}
            style={{
              opacity:
                notification.read
                  ? 0.55
                  : 1
            }}
          >

            <div>

              <span className="hm-data-label">
                TYPE
              </span>

              <div className="hm-data-value">
                {notification.type}
              </div>

            </div>


            <div>

              <span className="hm-data-label">
                EVENT
              </span>

              <div className="hm-data-value">
                {notification.event}
              </div>

            </div>


            <div>

              <span className="hm-data-label">
                PRIORITY
              </span>

              <span
                className={`hm-status ${
                  notification.priority ===
                  "CRITICAL"
                    ? "hm-risk"
                    : notification.priority ===
                      "INFO"
                      ? "hm-good"
                      : "hm-warning"
                }`}
              >
                {notification.priority}
              </span>

            </div>


            <div>

              <span className="hm-data-label">
                TIME
              </span>

              <div className="hm-data-value">
                {notification.time}
              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}


export default Notifications;