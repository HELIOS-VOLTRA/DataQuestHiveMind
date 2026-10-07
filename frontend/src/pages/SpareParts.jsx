import { useState } from "react";
import "./HiveMindPage.css";


function SpareParts() {

  const [parts] = useState([

    {
      id: "P-001",
      name: "Hydraulic Seal Kit",
      category: "Hydraulics",
      stock: 3,
      minimum: 5,
      status: "LOW STOCK"
    },

    {
      id: "P-002",
      name: "CNC Spindle Bearing",
      category: "CNC",
      stock: 8,
      minimum: 4,
      status: "AVAILABLE"
    },

    {
      id: "P-003",
      name: "Pressure Sensor",
      category: "Sensors",
      stock: 12,
      minimum: 5,
      status: "AVAILABLE"
    },

    {
      id: "P-004",
      name: "Motor Coupling",
      category: "Mechanical",
      stock: 2,
      minimum: 4,
      status: "LOW STOCK"
    },

    {
      id: "P-005",
      name: "Air Filter",
      category: "Compressor",
      stock: 15,
      minimum: 5,
      status: "AVAILABLE"
    },

    {
      id: "P-006",
      name: "Drive Belt",
      category: "Mechanical",
      stock: 7,
      minimum: 3,
      status: "AVAILABLE"
    }

  ]);


  const [search, setSearch] =
    useState("");


  const filteredParts =
    parts.filter((part) => {

      const text = `

        ${part.name}

        ${part.category}

        ${part.id}

      `.toLowerCase();

      return text.includes(
        search.toLowerCase()
      );

    });


  const lowStock =
    parts.filter(
      (part) =>
        part.stock <= part.minimum
    ).length;


  return (

    <div className="hm-page">

      <div className="hm-header">

        <div>

          <span className="hm-kicker">
            RESOURCE INTELLIGENCE / 05
          </span>

          <h1>
            Inventory
          </h1>

          <p>
            Monitor spare-part availability, stock levels
            and replenishment risk.
          </p>

        </div>


        <button className="hm-button">
          + ADD PART
        </button>

      </div>


      <div className="hm-grid hm-grid-4">

        <div className="hm-metric">

          <span className="hm-metric-label">
            TOTAL PARTS
          </span>

          <strong className="hm-metric-value">
            {parts.length}
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
            {
              parts.filter(
                (part) =>
                  part.stock >
                  part.minimum
              ).length
            }
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
            {lowStock}
          </strong>

          <span className="hm-metric-note">
            Replenishment required
          </span>

        </div>


        <div className="hm-metric">

          <span className="hm-metric-label">
            FORECAST
          </span>

          <strong className="hm-metric-value">
            73%
          </strong>

          <span className="hm-metric-note">
            Highest stockout risk
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

            <h2>
              Parts Registry
            </h2>

          </div>


          <input
            placeholder="SEARCH PART..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            style={{
              maxWidth: "240px"
            }}
          />

        </div>


        {filteredParts.map((part) => (

          <div
            className="hm-data-row"
            key={part.id}
          >

            <div>

              <span className="hm-data-label">
                PART
              </span>

              <div className="hm-data-value">
                {part.name}
              </div>

              <small
                style={{
                  color: "#555"
                }}
              >
                {part.id}
              </small>

            </div>


            <div>

              <span className="hm-data-label">
                CATEGORY
              </span>

              <div className="hm-data-value">
                {part.category}
              </div>

            </div>


            <div>

              <span className="hm-data-label">
                STOCK
              </span>

              <div
                className={`hm-data-value ${
                  part.stock <=
                  part.minimum
                    ? "hm-warning"
                    : ""
                }`}
              >
                {part.stock}
              </div>

            </div>


            <div>

              <span className="hm-data-label">
                STATUS
              </span>

              <span
                className={`hm-status ${
                  part.stock <=
                  part.minimum
                    ? "hm-warning"
                    : "hm-good"
                }`}
              >
                {part.status}
              </span>

            </div>

          </div>

        ))}

      </div>


      <div
        className="hm-panel"
        style={{ marginTop: "14px" }}
      >

        <span className="hm-panel-label">
          HIVEMIND SUPPLY FORECAST
        </span>

        <h2>
          Hydraulic Seal Kit
        </h2>

        <p>
          Predicted stockout probability
        </p>

        <strong className="hm-metric-value hm-warning">
          73%
        </strong>

        <div className="hm-progress">

          <span
            style={{
              width: "73%"
            }}
          />

        </div>

        <p>
          Recommendation: replenish before the
          next hydraulic service cycle.
        </p>

        <button
          className="hm-button"
          style={{
            marginTop: "10px"
          }}
        >
          GENERATE REPLENISHMENT
        </button>

      </div>

    </div>

  );
}


export default SpareParts;