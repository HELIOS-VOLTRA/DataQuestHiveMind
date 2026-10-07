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
          <h1>Command Center</h1>

          <p>
            HiVeMind connects machines, technicians, service requests
            and resources into one operational intelligence layer.
          </p>
        </div>

      </div>


      {/* MAIN METRICS */}

      <div className="stats-grid">

        <div className="stat-card">
          <span className="stat-label">
            Open Requests
          </span>

          <strong>12</strong>

          <span className="stat-subtitle">
            Requires attention
          </span>
        </div>


        <div className="stat-card">
          <span className="stat-label">
            Active Workforce
          </span>

          <strong>08</strong>

          <span className="stat-subtitle">
            Technicians tracked
          </span>
        </div>


        <div className="stat-card">
          <span className="stat-label">
            Equipment
          </span>

          <strong>24</strong>

          <span className="stat-subtitle">
            Connected assets
          </span>
        </div>


        <div className="stat-card">
          <span className="stat-label">
            Low Stock
          </span>

          <strong>05</strong>

          <span className="stat-subtitle">
            Parts require action
          </span>
        </div>

      </div>


      {/* MAIN GRID */}

      <div className="dashboard-grid">

        {/* QUICK ACTIONS */}

        <div className="dashboard-card">

          <h2>Operational Actions</h2>

          <p
            style={{
              color: "#777",
              fontSize: "12px",
              marginBottom: "22px"
            }}
          >
            Access the most frequently used operational workflows.
          </p>


          <div className="quick-actions">

            <button
              onClick={() =>
                setActivePage("service-requests")
              }
            >
              CREATE REQUEST
            </button>


            <button
              onClick={() =>
                setActivePage("technicians")
              }
            >
              FIND TECHNICIAN
            </button>


            <button
              onClick={() =>
                setActivePage("equipment")
              }
            >
              VIEW EQUIPMENT
            </button>


            <button
              onClick={() =>
                setActivePage("spare-parts")
              }
            >
              CHECK INVENTORY
            </button>


            <button
              onClick={() =>
                setActivePage("smart-operations")
              }
            >
              OPEN HIVEMIND
            </button>


            <button
              onClick={() =>
                setActivePage("notifications")
              }
            >
              VIEW ALERTS
            </button>

          </div>

        </div>


        {/* SYSTEM OVERVIEW */}

        <div className="dashboard-card">

          <h2>System Overview</h2>

          <div className="overview-row">
            <span>Critical Requests</span>
            <strong>02</strong>
          </div>

          <div className="overview-row">
            <span>In Progress</span>
            <strong>04</strong>
          </div>

          <div className="overview-row">
            <span>Available Technicians</span>
            <strong>06</strong>
          </div>

          <div className="overview-row">
            <span>Machines At Risk</span>
            <strong>03</strong>
          </div>

        </div>

      </div>


      {/* RECENT ACTIVITY */}

      <div className="dashboard-card">

        <h2>Live Operational Feed</h2>

        <div className="activity-list">

          <div className="activity-item">

            <span className="activity-dot urgent"></span>

            <div>
              <strong>
                Critical machine event
              </strong>

              <p>
                CNC Machine M-102 requires immediate attention.
              </p>
            </div>

          </div>


          <div className="activity-item">

            <span className="activity-dot"></span>

            <div>
              <strong>
                Technician assigned
              </strong>

              <p>
                SR-1002 has been assigned to the workforce.
              </p>
            </div>

          </div>


          <div className="activity-item">

            <span className="activity-dot warning"></span>

            <div>
              <strong>
                Inventory warning
              </strong>

              <p>
                Hydraulic Seal Kit has reached its minimum stock level.
              </p>
            </div>

          </div>


          <div className="activity-item">

            <span className="activity-dot"></span>

            <div>
              <strong>
                HiveMind prediction
              </strong>

              <p>
                M-104 maintenance risk has increased by 8%.
              </p>
            </div>

          </div>

        </div>

      </div>


      {/* SERVICE HISTORY */}

      <div
        className="dashboard-card"
        style={{ marginTop: "14px" }}
      >

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "22px"
          }}
        >

          <div>

            <span className="stat-label">
              RECENT OPERATIONS
            </span>

            <h2 style={{ marginTop: "8px" }}>
              Service History
            </h2>

          </div>


          <button
            className="secondary-action"
            onClick={() =>
              setActivePage("service-history")
            }
          >
            VIEW ALL
          </button>

        </div>


        <div className="history-list">

          <div className="history-card">

            <div className="history-top">

              <div>

                <span className="request-id">
                  SR-1001
                </span>

                <h3>
                  Hydraulic Press M-104
                </h3>

              </div>

              <span className="status-completed">
                COMPLETED
              </span>

            </div>

            <p>
              Hydraulic pressure dropping
            </p>

            <div className="history-details">

              <span>
                <strong>Technician:</strong>{" "}
                Arjun Kumar
              </span>

              <span>
                <strong>Date:</strong>{" "}
                06 Oct 2026
              </span>

              <span>
                <strong>Duration:</strong>{" "}
                2h 34m
              </span>

            </div>

          </div>


          <div className="history-card">

            <div className="history-top">

              <div>

                <span className="request-id">
                  SR-1002
                </span>

                <h3>
                  CNC Machine M-102
                </h3>

              </div>

              <span className="status-completed">
                COMPLETED
              </span>

            </div>

            <p>
              Inaccurate cuts
            </p>

            <div className="history-details">

              <span>
                <strong>Technician:</strong>{" "}
                Priya Sharma
              </span>

              <span>
                <strong>Date:</strong>{" "}
                05 Oct 2026
              </span>

              <span>
                <strong>Duration:</strong>{" "}
                3h 12m
              </span>

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
      date: "06 Oct 2026",
      duration: "2h 34m"
    },
    {
      id: "SR-1002",
      machine: "CNC Machine M-102",
      issue: "Inaccurate cuts",
      technician: "Priya Sharma",
      date: "05 Oct 2026",
      duration: "3h 12m"
    },
    {
      id: "SR-1003",
      machine: "Air Compressor M-103",
      issue: "Unusual vibration",
      technician: "Rahul Singh",
      date: "04 Oct 2026",
      duration: "1h 48m"
    },
    {
      id: "SR-1004",
      machine: "Industrial Pump M-106",
      issue: "Reduced flow rate",
      technician: "Ananya Sharma",
      date: "03 Oct 2026",
      duration: "2h 06m"
    }
  ];


  return (
    <div className="page-container">

      <div className="page-header">

        <div>

          <h1>Service History</h1>

          <p>
            Complete operational history of equipment
            maintenance and service activity.
          </p>

        </div>

      </div>


      <div className="stats-grid">

        <div className="stat-card">
          <span className="stat-label">
            Completed
          </span>

          <strong>48</strong>

          <span className="stat-subtitle">
            Service operations
          </span>
        </div>


        <div className="stat-card">
          <span className="stat-label">
            This Month
          </span>

          <strong>17</strong>

          <span className="stat-subtitle">
            Completed requests
          </span>
        </div>


        <div className="stat-card">
          <span className="stat-label">
            Avg Duration
          </span>

          <strong>2.4</strong>

          <span className="stat-subtitle">
            Hours per operation
          </span>
        </div>


        <div className="stat-card">
          <span className="stat-label">
            Success Rate
          </span>

          <strong>96%</strong>

          <span className="stat-subtitle">
            First-time resolution
          </span>
        </div>

      </div>


      <div className="history-list">

        {history.map((item) => (

          <div
            className="history-card"
            key={item.id}
          >

            <div className="history-top">

              <div>

                <span className="request-id">
                  {item.id}
                </span>

                <h3>
                  {item.machine}
                </h3>

              </div>

              <span className="status-completed">
                COMPLETED
              </span>

            </div>


            <p>
              {item.issue}
            </p>


            <div className="history-details">

              <span>
                <strong>Technician:</strong>{" "}
                {item.technician}
              </span>

              <span>
                <strong>Date:</strong>{" "}
                {item.date}
              </span>

              <span>
                <strong>Duration:</strong>{" "}
                {item.duration}
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}


function App() {

  const [activePage, setActivePage] =
    useState("dashboard");

  const [showLanding, setShowLanding] =
    useState(true);


  const navigation = [

    {
      id: "dashboard",
      label: "Command Center",
      icon: "⌘"
    },

    {
      id: "service-requests",
      label: "Service Requests",
      icon: "◈"
    },

    {
      id: "equipment",
      label: "Equipment",
      icon: "◉"
    },

    {
      id: "technicians",
      label: "Workforce",
      icon: "◇"
    },

    {
      id: "spare-parts",
      label: "Inventory",
      icon: "□"
    },

    {
      id: "notifications",
      label: "Alerts",
      icon: "!"
    },

    {
      id: "service-history",
      label: "Service History",
      icon: "↻"
    },

    {
      id: "smart-operations",
      label: "Hive Intelligence",
      icon: "✦"
    }

  ];


  const renderPage = () => {

    switch (activePage) {

      case "dashboard":
        return (
          <Dashboard
            setActivePage={setActivePage}
          />
        );

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
        return (
          <Dashboard
            setActivePage={setActivePage}
          />
        );
    }
  };


  if (showLanding) {

    return (
      <Landing
        onEnter={() => setShowLanding(false)}
      />
    );

  }


  return (

    <div className="app-shell">

      <aside className="sidebar">

        <div className="brand">

          <div className="brand-logo">
            HM
          </div>

          <div>

            <h2>
              HiVeMind
            </h2>

            <span>
              INDUSTRIAL INTELLIGENCE
            </span>

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
                  activePage === item.id
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setActivePage(item.id)
                }
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
                SYSTEM ONLINE
              </strong>

              <small>
                All operational services active
              </small>

            </div>

          </div>

        </div>

      </aside>


      <main className="main-content">

        <header className="topbar">

          <div>

            <span className="breadcrumb">
              HIVEMIND / OPERATIONS
            </span>

          </div>


          <div className="topbar-right">

            <span className="live-indicator">

              <span></span>

              SYSTEM LIVE

            </span>


            <div className="user-profile">

              <div className="avatar">
                G
              </div>

              <div>

                <strong>
                  Operator
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