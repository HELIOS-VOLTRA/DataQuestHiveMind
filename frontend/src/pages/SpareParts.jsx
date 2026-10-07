import { useMemo, useState } from "react";
import "../App.css";

const initialParts = [
  {
    id: "P-001",
    name: "Motor Coupling",
    category: "Mechanical",
    stock: 2,
    minimum: 5,
    location: "Warehouse A",
    compatible: "M-104",
    supplier: "Industrial Spares Ltd.",
  },
  {
    id: "P-002",
    name: "Hydraulic Seal",
    category: "Hydraulic",
    stock: 12,
    minimum: 5,
    location: "Warehouse A",
    compatible: "M-208",
    supplier: "HydroTech Supplies",
  },
  {
    id: "P-003",
    name: "Pressure Valve",
    category: "Hydraulic",
    stock: 4,
    minimum: 6,
    location: "Warehouse B",
    compatible: "M-208, M-301",
    supplier: "HydroTech Supplies",
  },
  {
    id: "P-004",
    name: "Drive Belt",
    category: "Mechanical",
    stock: 18,
    minimum: 8,
    location: "Warehouse A",
    compatible: "M-301",
    supplier: "Industrial Spares Ltd.",
  },
  {
    id: "P-005",
    name: "Temperature Sensor",
    category: "Electrical",
    stock: 7,
    minimum: 5,
    location: "Warehouse B",
    compatible: "M-104, M-401",
    supplier: "SensorWorks",
  },
  {
    id: "P-006",
    name: "Bearing Assembly",
    category: "Mechanical",
    stock: 0,
    minimum: 4,
    location: "Warehouse A",
    compatible: "M-401",
    supplier: "Industrial Spares Ltd.",
  },
];

function getStockStatus(stock, minimum) {
  if (stock === 0) return "Out of Stock";
  if (stock < minimum) return "Low Stock";
  return "Available";
}

function SpareParts() {
  const [parts] = useState(initialParts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [selectedPart, setSelectedPart] = useState(null);

  const filteredParts = useMemo(() => {
    return parts.filter((part) => {
      const stockStatus = getStockStatus(part.stock, part.minimum);

      const matchesSearch =
        part.name.toLowerCase().includes(search.toLowerCase()) ||
        part.id.toLowerCase().includes(search.toLowerCase()) ||
        part.compatible.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || part.category === category;

      const matchesStatus =
        status === "All" || stockStatus === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [parts, search, category, status]);

  const totalParts = parts.length;
  const availableParts = parts.filter(
    (part) => getStockStatus(part.stock, part.minimum) === "Available"
  ).length;

  const lowStockParts = parts.filter(
    (part) => getStockStatus(part.stock, part.minimum) === "Low Stock"
  ).length;

  const outOfStockParts = parts.filter(
    (part) => getStockStatus(part.stock, part.minimum) === "Out of Stock"
  ).length;

  return (
    <main className="main">
      {/* HEADER */}
      <header className="header">
        <div>
          <p className="eyebrow">OPERATIONS CENTER</p>
          <h1>Spare Parts</h1>
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

      {/* INTRO */}
      <section className="welcome">
        <div>
          <h2>Spare Parts Management</h2>

          <p>
            Track inventory, identify shortages and ensure the right parts
            are available for equipment service.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => {
            const lowStock = parts.filter(
              (part) =>
                getStockStatus(part.stock, part.minimum) !== "Available"
            );

            alert(
              lowStock.length === 0
                ? "All spare parts are sufficiently stocked."
                : `${lowStock.length} parts require attention.`
            );
          }}
        >
          Check Inventory
        </button>
      </section>

      {/* INVENTORY SUMMARY */}
      <section className="stats">
        <div className="stat-card">
          <span>Total Parts</span>
          <strong>{totalParts}</strong>
          <small>Registered inventory items</small>
        </div>

        <div className="stat-card">
          <span>Available</span>
          <strong>{availableParts}</strong>
          <small>Ready for service requests</small>
        </div>

        <div className="stat-card urgent">
          <span>Low Stock</span>
          <strong>{lowStockParts}</strong>
          <small>Requires replenishment</small>
        </div>

        <div className="stat-card">
          <span>Out of Stock</span>
          <strong>{outOfStockParts}</strong>
          <small>Cannot currently be issued</small>
        </div>
      </section>

      {/* MAIN INVENTORY PANEL */}
      <section className="panel requests-page-panel">
        <div className="service-page-header">
          <div>
            <p className="eyebrow">INVENTORY OPERATIONS</p>
            <h2>Parts Inventory</h2>
          </div>

          <div className="request-filters">
            <input
              type="text"
              placeholder="Search parts..."
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="filter-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Hydraulic">Hydraulic</option>
              <option value="Electrical">Electrical</option>
            </select>

            <select
              className="filter-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Available">Available</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
        </div>

        {/* RESULT COUNT */}
        <div
          style={{
            marginBottom: "18px",
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          Showing {filteredParts.length} of {parts.length} parts
        </div>

        {/* PART LIST */}
        <div className="service-request-list">
          {filteredParts.length > 0 ? (
            filteredParts.map((part) => {
              const stockStatus = getStockStatus(
                part.stock,
                part.minimum
              );

              return (
                <div
                  className="service-request-card"
                  key={part.id}
                  style={{ position: "relative" }}
                >
                  {/* TOP */}
                  <div className="request-card-top">
                    <div>
                      <span className="request-id">{part.id}</span>

                      <h3>{part.name}</h3>

                      <p
                        style={{
                          margin: "6px 0 0",
                          color: "#64748b",
                        }}
                      >
                        {part.category} · Compatible with{" "}
                        {part.compatible}
                      </p>
                    </div>

                    <span
                      className={`status ${stockStatus
                        .toLowerCase()
                        .replace(" ", "-")}`}
                      style={{
                        padding: "7px 12px",
                        borderRadius: "8px",
                        fontWeight: "600",
                      }}
                    >
                      {stockStatus}
                    </span>
                  </div>

                  {/* DETAILS */}
                  <div className="request-details">
                    <div>
                      <span>Current Stock</span>
                      <strong
                        style={{
                          color:
                            stockStatus === "Out of Stock"
                              ? "#dc2626"
                              : stockStatus === "Low Stock"
                              ? "#d97706"
                              : "#16a34a",
                        }}
                      >
                        {part.stock} units
                      </strong>
                    </div>

                    <div>
                      <span>Minimum Required</span>
                      <strong>{part.minimum} units</strong>
                    </div>

                    <div>
                      <span>Location</span>
                      <strong>{part.location}</strong>
                    </div>
                  </div>

                  {/* BOTTOM */}
                  <div className="request-card-bottom">
                    <span
                      style={{
                        color: "#64748b",
                        fontSize: "14px",
                      }}
                    >
                      Supplier: {part.supplier}
                    </span>

                    <button
                      className="text-button"
                      onClick={() => setSelectedPart(part)}
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
              }}
            >
              <h2>No parts found</h2>

              <p style={{ color: "#64748b" }}>
                Try changing your search or filter settings.
              </p>

              <button
                className="text-button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                  setStatus("All");
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* PART DETAILS MODAL */}
      {selectedPart && (
        <div
          onClick={() => setSelectedPart(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(600px, 100%)",
              background: "#ffffff",
              borderRadius: "22px",
              overflow: "hidden",
              boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
            }}
          >
            {/* MODAL HEADER */}
            <div
              style={{
                padding: "28px 30px",
                borderBottom: "1px solid #e2e8f0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <p className="eyebrow">PART DETAILS</p>

                <h2 style={{ margin: "6px 0 0" }}>
                  {selectedPart.name}
                </h2>

                <span style={{ color: "#64748b" }}>
                  {selectedPart.id}
                </span>
              </div>

              <button
                onClick={() => setSelectedPart(null)}
                style={{
                  border: "none",
                  background: "#f1f5f9",
                  borderRadius: "10px",
                  width: "42px",
                  height: "42px",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>

            {/* MODAL CONTENT */}
            <div
              style={{
                padding: "28px 30px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <div className="stat-card">
                <span>Category</span>
                <strong style={{ fontSize: "18px" }}>
                  {selectedPart.category}
                </strong>
              </div>

              <div className="stat-card">
                <span>Stock</span>
                <strong style={{ fontSize: "18px" }}>
                  {selectedPart.stock} units
                </strong>
              </div>

              <div className="stat-card">
                <span>Minimum Level</span>
                <strong style={{ fontSize: "18px" }}>
                  {selectedPart.minimum} units
                </strong>
              </div>

              <div className="stat-card">
                <span>Location</span>
                <strong style={{ fontSize: "18px" }}>
                  {selectedPart.location}
                </strong>
              </div>

              <div
                className="stat-card"
                style={{ gridColumn: "1 / -1" }}
              >
                <span>Compatible Equipment</span>
                <strong style={{ fontSize: "18px" }}>
                  {selectedPart.compatible}
                </strong>
              </div>

              <div
                className="stat-card"
                style={{ gridColumn: "1 / -1" }}
              >
                <span>Supplier</span>
                <strong style={{ fontSize: "18px" }}>
                  {selectedPart.supplier}
                </strong>
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div
              style={{
                padding: "20px 30px",
                borderTop: "1px solid #e2e8f0",
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
              }}
            >
              {selectedPart.stock < selectedPart.minimum && (
                <button
                  className="primary-button"
                  onClick={() =>
                    alert(
                      `Replenishment request created for ${selectedPart.name}.`
                    )
                  }
                >
                  Request Replenishment
                </button>
              )}

              <button
                className="text-button"
                onClick={() => setSelectedPart(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default SpareParts;