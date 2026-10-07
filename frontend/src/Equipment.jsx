import { useEffect, useState } from "react";
import "./pages/HiveMindPage.css";


const API_BASE =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";


function Equipment() {

  const [equipment, setEquipment] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");


  const loadEquipment = async () => {

    try {

      setLoading(true);

      const response = await fetch(
        `${API_BASE}/api/machines`
      );

      if (!response.ok) {
        throw new Error(
          "Unable to load equipment"
        );
      }

      const data =
        await response.json();

      setEquipment(
        data.machines ||
        data.equipment ||
        data.data ||
        []
      );

      setError("");

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {
    loadEquipment();
  }, []);


  const filteredEquipment =
    equipment.filter((machine) => {

      const text = `

        ${machine.machine_name || ""}

        ${machine.machine_code || ""}

        ${machine.machine_type || ""}

        ${machine.model || ""}

        ${machine.site_name || ""}

        ${machine.city || ""}

      `.toLowerCase();

      return text.includes(
        search.toLowerCase()
      );

    });


  const operational =
    equipment.filter(
      (machine) =>
        String(
          machine.status || ""
        ).toLowerCase() ===
        "operational"
    ).length;


  const attention =
    equipment.length -
    operational;


  return (

    <div className="hm-page">

      <div className="hm-header">

        <div>

          <span className="hm-kicker">
            ASSET MANAGEMENT / 03
          </span>

          <h1>
            Equipment
          </h1>

          <p>
            Live machine status, health and maintenance
            intelligence across operational sites.
          </p>

        </div>


        <button className="hm-button">
          + ADD ASSET
        </button>

      </div>


      <div className="hm-grid hm-grid-4">

        <div className="hm-metric">

          <span className="hm-metric-label">
            TOTAL ASSETS
          </span>

          <strong className="hm-metric-value">
            {equipment.length}
          </strong>

          <span className="hm-metric-note">
            Connected machines
          </span>

        </div>


        <div className="hm-metric">

          <span className="hm-metric-label">
            OPERATIONAL
          </span>

          <strong className="hm-metric-value">
            {operational}
          </strong>

          <span className="hm-metric-note">
            Currently operational
          </span>

        </div>


        <div className="hm-metric">

          <span className="hm-metric-label">
            ATTENTION
          </span>

          <strong className="hm-metric-value hm-warning">
            {attention}
          </strong>

          <span className="hm-metric-note">
            Requires review
          </span>

        </div>


        <div className="hm-metric">

          <span className="hm-metric-label">
            SYSTEM HEALTH
          </span>

          <strong className="hm-metric-value">
            92%
          </strong>

          <span className="hm-metric-note">
            HiveMind estimate
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
              ASSET MATRIX
            </span>

            <h2>
              Machine Registry
            </h2>

          </div>


          <input
            placeholder="SEARCH MACHINE..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            style={{
              maxWidth: "240px"
            }}
          />

        </div>


        {loading && (
          <p>
            Loading equipment...
          </p>
        )}


        {error && (

          <div
            style={{
              color: "#ff4d4d",
              border: "1px solid #ff4d4d",
              padding: "15px"
            }}
          >
            {error}
          </div>

        )}


        {!loading &&
          filteredEquipment.map((machine) => (

            <div
              className="hm-data-row"
              key={
                machine.machine_id ||
                machine.id
              }
            >

              <div>

                <span className="hm-data-label">
                  MACHINE
                </span>

                <div className="hm-data-value">

                  {
                    machine.machine_name ||
                    machine.machine_code ||
                    "UNKNOWN MACHINE"
                  }

                </div>

                <small
                  style={{
                    color: "#555"
                  }}
                >
                  {
                    machine.machine_code ||
                    `ID ${
                      machine.machine_id ||
                      "—"
                    }`
                  }
                </small>

              </div>


              <div>

                <span className="hm-data-label">
                  TYPE
                </span>

                <div className="hm-data-value">
                  {
                    machine.machine_type ||
                    "—"
                  }
                </div>

              </div>


              <div>

                <span className="hm-data-label">
                  LOCATION
                </span>

                <div className="hm-data-value">
                  {
                    machine.site_name ||
                    machine.city ||
                    "—"
                  }
                </div>

              </div>


              <div>

                <span className="hm-data-label">
                  STATUS
                </span>

                <span
                  className={`hm-status ${
                    String(
                      machine.status ||
                      ""
                    ).toLowerCase() ===
                    "operational"
                      ? "hm-good"
                      : "hm-warning"
                  }`}
                >
                  {
                    machine.status ||
                    "UNKNOWN"
                  }
                </span>

              </div>

            </div>

          ))}


        {!loading &&
          filteredEquipment.length === 0 && (

            <div
              style={{
                textAlign: "center",
                padding: "35px",
                color: "#777"
              }}
            >
              NO MACHINES FOUND
            </div>

          )}

      </div>


      <div
        className="hm-grid hm-grid-2"
        style={{ marginTop: "14px" }}
      >

        <div className="hm-panel">

          <span className="hm-panel-label">
            HIVEMIND HEALTH ENGINE
          </span>

          <h2>
            M-102
          </h2>

          <p>
            CNC Machine
          </p>

          <strong
            className="hm-metric-value hm-risk"
          >
            54%
          </strong>

          <p>
            Predicted maintenance risk.
          </p>

          <div className="hm-progress">
            <span
              style={{
                width: "54%"
              }}
            />
          </div>

        </div>


        <div className="hm-panel">

          <span className="hm-panel-label">
            HEALTHIEST ASSET
          </span>

          <h2>
            M-104
          </h2>

          <p>
            Hydraulic Press
          </p>

          <strong
            className="hm-metric-value hm-good"
          >
            92%
          </strong>

          <p>
            Current estimated machine health.
          </p>

          <div className="hm-progress">
            <span
              style={{
                width: "92%"
              }}
            />
          </div>

        </div>

      </div>

    </div>

  );
}


export default Equipment;