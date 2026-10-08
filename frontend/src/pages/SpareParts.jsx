import { useEffect, useState } from "react";
import "./HiveMindPage.css";

const API_BASE =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

function SpareParts() {
  const [parts, setParts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadParts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_BASE}/api/spare-parts`);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || "Failed to load inventory");
        }

        setParts(data.parts || []);
      } catch (err) {
        console.error("Inventory load failed:", err);
        setError(err.message || "Unable to load inventory");
      } finally {
        setLoading(false);
      }
    };

    loadParts();
  }, []);

  const filteredParts = parts.filter((part) => {
    const text = `
      ${part.part_name}
      ${part.part_code}
      ${part.description || ""}
      ${part.unit || ""}
    `.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  const lowStock = parts.filter(
    (part) => part.status === "LOW STOCK"
  ).length;

  const available = parts.filter(
    (part) => part.status === "AVAILABLE"
  ).length;

  const totalUnits = parts.reduce(
    (total, part) => total + Number(part.stock_quantity || 0),
    0
  );

  const stockHealth =
    parts.length > 0
      ? Math.round((available / parts.length) * 100)
      : 0;

  return (
    <div className="hm-page">
      <div className="hm-header">
        <div>
          <span className="hm-kicker">
            RESOURCE INTELLIGENCE / 05
          </span>

          <h1>Inventory</h1>

          <p>
            Monitor spare-part availability, stock levels
            and replenishment risk.
          </p>
        </div>

        <button className="hm-button">
          + ADD PART
        </button>
      </div>

      {error && (
        <div
          className="hm-panel"
          style={{
            marginTop: "14px",
            borderColor: "#ffcc00",
          }}
        >
          <span className="hm-warning">
            INVENTORY API ERROR
          </span>

          <p>{error}</p>
        </div>
      )}

      <div className="hm-grid hm-grid-4">
        <div className="hm-metric">
          <span className="hm-metric-label">
            TOTAL PARTS
          </span>

          <strong className="hm-metric-value">
            {loading ? "—" : parts.length}
          </strong>

          <span className="hm-metric-note">
            Registered inventory
          </span>
        </div>

        <div className="hm-metric">
          <span className="hm-metric-label">
            AVAILABLE
          </span>

          <strong className="hm-metric-value">
            {loading ? "—" : available}
          </strong>

          <span className="hm-metric-note">
            Healthy stock
          </span>
        </div>

        <div className="hm-metric">
          <span className="hm-metric-label">
            LOW STOCK
          </span>

          <strong className="hm-metric-value hm-warning">
            {loading ? "—" : lowStock}
          </strong>

          <span className="hm-metric-note">
            Replenishment required
          </span>
        </div>

        <div className="hm-metric">
          <span className="hm-metric-label">
            STOCK HEALTH
          </span>

          <strong className="hm-metric-value">
            {loading ? "—" : `${stockHealth}%`}
          </strong>

          <span className="hm-metric-note">
            {totalUnits.toLocaleString()} units available
          </span>
        </div>
      </div>

      <div
        className="hm-panel"
        style={{ marginTop: "14px" }}
      >
        <div className="hm-panel-header">
          <div>
            <span className="hm-panel-label">
              INVENTORY MATRIX
            </span>

            <h2>Parts Registry</h2>
          </div>

          <input
            placeholder="SEARCH PART..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            style={{
              maxWidth: "240px",
            }}
          />
        </div>

        {loading ? (
          <div
            className="hm-data-row"
            style={{ justifyContent: "center" }}
          >
            <div className="hm-data-value">
              LOADING INVENTORY...
            </div>
          </div>
        ) : filteredParts.length === 0 ? (
          <div
            className="hm-data-row"
            style={{ justifyContent: "center" }}
          >
            <div className="hm-data-value">
              NO PARTS FOUND
            </div>
          </div>
        ) : (
          filteredParts.map((part) => (
            <div
              className="hm-data-row"
              key={part.part_id}
            >
              <div>
                <span className="hm-data-label">
                  PART
                </span>

                <div className="hm-data-value">
                  {part.part_name}
                </div>

                <small style={{ color: "#555" }}>
                  {part.part_code}
                </small>
              </div>

              <div>
                <span className="hm-data-label">
                  DESCRIPTION
                </span>

                <div className="hm-data-value">
                  {part.description || "—"}
                </div>
              </div>

              <div>
                <span className="hm-data-label">
                  STOCK
                </span>

                <div
                  className={`hm-data-value ${
                    part.status === "LOW STOCK"
                      ? "hm-warning"
                      : ""
                  }`}
                >
                  {part.stock_quantity} {part.unit || ""}
                </div>

                <small style={{ color: "#555" }}>
                  MIN: {part.minimum_stock}
                </small>
              </div>

              <div>
                <span className="hm-data-label">
                  STATUS
                </span>

                <span
                  className={`hm-status ${
                    part.status === "LOW STOCK"
                      ? "hm-warning"
                      : "hm-good"
                  }`}
                >
                  {part.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <div
        className="hm-panel"
        style={{ marginTop: "14px" }}
      >
        <span className="hm-panel-label">
          HIVEMIND SUPPLY ANALYSIS
        </span>

        <h2>
          {lowStock > 0
            ? `${lowStock} parts require replenishment`
            : "Inventory levels are healthy"}
        </h2>

        <p>
          Current stock health is based directly on
          available inventory versus configured minimum
          stock levels.
        </p>

        <strong
          className={`hm-metric-value ${
            lowStock > 0 ? "hm-warning" : ""
          }`}
        >
          {loading ? "—" : `${stockHealth}%`}
        </strong>

        <div className="hm-progress">
          <span
            style={{
              width: `${stockHealth}%`,
            }}
          />
        </div>

        <p>
          {lowStock > 0
            ? `Recommendation: review ${lowStock} low-stock part${
                lowStock === 1 ? "" : "s"
              } before the next service cycle.`
            : "Recommendation: continue monitoring inventory levels."}
        </p>

        <button
          className="hm-button"
          style={{
            marginTop: "10px",
          }}
        >
          GENERATE REPLENISHMENT
        </button>
      </div>
    </div>
  );
}

export default SpareParts;
