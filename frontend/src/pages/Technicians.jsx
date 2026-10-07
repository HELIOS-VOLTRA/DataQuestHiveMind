import { useEffect, useState } from "react";
import "./HiveMindPage.css";


const API_BASE =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";


function Technicians() {

  const [technicians, setTechnicians] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  const loadTechnicians = async () => {

    try {

      setLoading(true);

      const response = await fetch(
        `${API_BASE}/api/technicians`
      );

      if (!response.ok) {
        throw new Error(
          "Unable to load technicians"
        );
      }

      const data =
        await response.json();

      setTechnicians(
        data.technicians ||
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
    loadTechnicians();
  }, []);


  const available =
    technicians.filter(
      (tech) =>
        String(
          tech.availability_status ||
          ""
        ).toLowerCase() ===
        "available"
    ).length;


  return (

    <div className="hm-page">

      <div className="hm-header">

        <div>

          <span className="hm-kicker">
            WORKFORCE INTELLIGENCE / 04
          </span>

          <h1>
            Workforce
          </h1>

          <p>
            Monitor technician availability, workload,
            skills and intelligent assignment recommendations.
          </p>

        </div>


        <button className="hm-button">
          + ADD TECHNICIAN
        </button>

      </div>


      <div className="hm-grid hm-grid-4">

        <div className="hm-metric">

          <span className="hm-metric-label">
            WORKFORCE
          </span>

          <strong className="hm-metric-value">
            {technicians.length}
          </strong>

          <span className="hm-metric-note">
            Registered technicians
          </span>

        </div>


        <div className="hm-metric">

          <span className="hm-metric-label">
            AVAILABLE
          </span>

          <strong className="hm-metric-value">
            {available}
          </strong>

          <span className="hm-metric-note">
            Ready for assignment
          </span>

        </div>


        <div className="hm-metric">

          <span className="hm-metric-label">
            ON SITE
          </span>

          <strong className="hm-metric-value">
            {
              technicians.length -
              available
            }
          </strong>

          <span className="hm-metric-note">
            Currently occupied
          </span>

        </div>


        <div className="hm-metric">

          <span className="hm-metric-label">
            MATCH ENGINE
          </span>

          <strong className="hm-metric-value">
            96%
          </strong>

          <span className="hm-metric-note">
            Best recommendation score
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
              WORKFORCE MATRIX
            </span>

            <h2>
              Technician Availability
            </h2>

          </div>

        </div>


        {loading && (
          <p>
            Loading workforce...
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
          technicians.map((tech) => (

            <div
              className="hm-data-row"
              key={
                tech.technician_id ||
                tech.id
              }
            >

              <div>

                <span className="hm-data-label">
                  TECHNICIAN
                </span>

                <div className="hm-data-value">
                  {
                    tech.name ||
                    "Unknown Technician"
                  }
                </div>

              </div>


              <div>

                <span className="hm-data-label">
                  SKILL
                </span>

                <div className="hm-data-value">
                  {
                    tech.skill_name ||
                    "Multi-Skilled"
                  }
                </div>

              </div>


              <div>

                <span className="hm-data-label">
                  CONTACT
                </span>

                <div className="hm-data-value">
                  {
                    tech.phone ||
                    tech.email ||
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
                      tech.availability_status ||
                      ""
                    ).toLowerCase() ===
                    "available"
                      ? "hm-good"
                      : "hm-warning"
                  }`}
                >
                  {
                    tech.availability_status ||
                    "UNKNOWN"
                  }
                </span>

              </div>

            </div>

          ))}

      </div>


      <div
        className="hm-grid hm-grid-2"
        style={{ marginTop: "14px" }}
      >

        <div className="hm-panel">

          <span className="hm-panel-label">
            HIVEMIND MATCH ENGINE
          </span>

          <h2>
            Best Current Match
          </h2>

          <p>
            Arjun Kumar
          </p>

          <strong className="hm-metric-value">
            96%
          </strong>

          <p>
            Skill compatibility + availability +
            workload + experience.
          </p>

          <div className="hm-progress">

            <span
              style={{
                width: "96%"
              }}
            />

          </div>

        </div>


        <div className="hm-panel">

          <span className="hm-panel-label">
            MATCH WEIGHTS
          </span>

          <div className="hm-data-row">

            <span className="hm-data-label">
              SKILL
            </span>

            <strong>
              35%
            </strong>

          </div>

          <div className="hm-data-row">

            <span className="hm-data-label">
              AVAILABILITY
            </span>

            <strong>
              25%
            </strong>

          </div>

          <div className="hm-data-row">

            <span className="hm-data-label">
              WORKLOAD
            </span>

            <strong>
              15%
            </strong>

          </div>

          <div className="hm-data-row">

            <span className="hm-data-label">
              DISTANCE
            </span>

            <strong>
              10%
            </strong>

          </div>

          <div className="hm-data-row">

            <span className="hm-data-label">
              EXPERIENCE
            </span>

            <strong>
              15%
            </strong>

          </div>

        </div>

      </div>

    </div>

  );
}


export default Technicians;