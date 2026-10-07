import { useState } from "react";
import "./HiveMindPage.css";


function SmartOperations() {

  const [activeTab, setActiveTab] =
    useState("Overview");


  const tabs = [
    "Overview",
    "Technician Matching",
    "Machine Health",
    "Parts Intelligence",
    "SLA Prediction",
    "Impact Simulation"
  ];


  return (

    <div className="hm-page">

      <div className="hm-header">

        <div>

          <span className="hm-kicker">
            DECISION ENGINE / 08
          </span>

          <h1>
            HiveMind
          </h1>

          <p>
            The intelligence layer connecting machines,
            technicians, resources and operational decisions.
          </p>

        </div>


        <span className="hm-status hm-good">
          INTELLIGENCE ACTIVE
        </span>

      </div>


      <div className="hm-tabs">

        {tabs.map((tab) => (

          <button
            key={tab}
            className={`hm-tab ${
              activeTab === tab
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveTab(tab)
            }
          >
            {tab}
          </button>

        ))}

      </div>


      {/* =====================================================
          OVERVIEW
          ===================================================== */}

      {activeTab === "Overview" && (

        <>

          <div className="hm-grid hm-grid-4">

            <div className="hm-metric">

              <span className="hm-metric-label">
                DECISIONS
              </span>

              <strong className="hm-metric-value">
                124
              </strong>

              <span className="hm-metric-note">
                Intelligence evaluations
              </span>

            </div>


            <div className="hm-metric">

              <span className="hm-metric-label">
                MATCH SCORE
              </span>

              <strong className="hm-metric-value">
                96%
              </strong>

              <span className="hm-metric-note">
                Best technician match
              </span>

            </div>


            <div className="hm-metric">

              <span className="hm-metric-label">
                MACHINE RISK
              </span>

              <strong className="hm-metric-value hm-risk">
                54%
              </strong>

              <span className="hm-metric-note">
                Highest detected risk
              </span>

            </div>


            <div className="hm-metric">

              <span className="hm-metric-label">
                SLA RISK
              </span>

              <strong className="hm-metric-value hm-warning">
                72%
              </strong>

              <span className="hm-metric-note">
                Highest predicted delay
              </span>

            </div>

          </div>


          <div
            className="hm-grid hm-grid-2"
            style={{ marginTop: "14px" }}
          >

            <div className="hm-panel">

              <div className="hm-panel-header">

                <div>

                  <span className="hm-panel-label">
                    01 / WORKFORCE
                  </span>

                  <h2>
                    Technician Matching
                  </h2>

                </div>

                <span className="hm-status hm-good">
                  SMART
                </span>

              </div>


              <p>
                HiVeMind ranks technicians using
                skill, availability, workload,
                distance and experience.
              </p>


              <div
                style={{
                  marginTop: "35px",
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "end"
                }}
              >

                <div>

                  <span className="hm-panel-label">
                    BEST MATCH
                  </span>

                  <h2>
                    Arjun Kumar
                  </h2>

                </div>


                <strong className="hm-metric-value">
                  96%
                </strong>

              </div>


              <div className="hm-progress">

                <span
                  style={{
                    width: "96%"
                  }}
                />

              </div>

            </div>


            <div className="hm-panel">

              <div className="hm-panel-header">

                <div>

                  <span className="hm-panel-label">
                    02 / MACHINE
                  </span>

                  <h2>
                    Machine Health
                  </h2>

                </div>

                <span className="hm-status hm-risk">
                  HIGH RISK
                </span>

              </div>


              <p>
                Machine health scoring identifies
                equipment requiring preventative
                maintenance.
              </p>


              <div
                style={{
                  marginTop: "35px",
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "end"
                }}
              >

                <strong className="hm-metric-value hm-risk">
                  54%
                </strong>


                <div>

                  <span className="hm-panel-label">
                    ASSET
                  </span>

                  <div className="hm-data-value">
                    M-102 / CNC MACHINE
                  </div>

                </div>

              </div>


              <div className="hm-progress">

                <span
                  style={{
                    width: "54%"
                  }}
                />

              </div>

            </div>


            <div className="hm-panel">

              <div className="hm-panel-header">

                <div>

                  <span className="hm-panel-label">
                    03 / RESOURCE
                  </span>

                  <h2>
                    Parts Intelligence
                  </h2>

                </div>

                <span className="hm-status hm-warning">
                  02 ALERTS
                </span>

              </div>


              <p>
                Predict stockouts before they
                create service delays.
              </p>


              <strong className="hm-metric-value">
                73%
              </strong>

              <span className="hm-panel-label">
                STOCKOUT RISK
              </span>


              <div className="hm-progress">

                <span
                  style={{
                    width: "73%"
                  }}
                />

              </div>

            </div>


            <div className="hm-panel">

              <div className="hm-panel-header">

                <div>

                  <span className="hm-panel-label">
                    04 / SLA
                  </span>

                  <h2>
                    SLA Prediction
                  </h2>

                </div>

                <span className="hm-status hm-risk">
                  AT RISK
                </span>

              </div>


              <p>
                Identify service requests likely
                to exceed their SLA deadline.
              </p>


              <strong className="hm-metric-value hm-risk">
                72%
              </strong>

              <span className="hm-panel-label">
                SR-1024 / HYDRAULIC PRESS
              </span>


              <div className="hm-progress">

                <span
                  style={{
                    width: "72%"
                  }}
                />

              </div>

            </div>

          </div>

        </>

      )}


      {/* =====================================================
          TECHNICIAN MATCHING
          ===================================================== */}

      {activeTab === "Technician Matching" && (

        <div className="hm-grid hm-grid-2">

          <div className="hm-panel">

            <span className="hm-panel-label">
              REQUEST
            </span>

            <h2>
              SR-1025
            </h2>

            <p>
              Hydraulic pressure issue on M-104.
            </p>


            <div className="hm-data-row">

              <span className="hm-data-label">
                REQUIRED SKILL
              </span>

              <strong>
                HYDRAULICS
              </strong>

            </div>


            <div className="hm-data-row">

              <span className="hm-data-label">
                PRIORITY
              </span>

              <span className="hm-status hm-risk">
                CRITICAL
              </span>

            </div>


            <div className="hm-data-row">

              <span className="hm-data-label">
                SITE
              </span>

              <strong>
                SITE A
              </strong>

            </div>

          </div>


          <div className="hm-panel">

            <span className="hm-panel-label">
              TOP RECOMMENDATION
            </span>

            <h2>
              Arjun Kumar
            </h2>

            <strong className="hm-metric-value">
              96%
            </strong>

            <p>
              Overall suitability score.
            </p>


            <div className="hm-progress">

              <span
                style={{
                  width: "96%"
                }}
              />

            </div>


            <div className="hm-data-row">

              <span className="hm-data-label">
                SKILL
              </span>

              <strong>
                98%
              </strong>

            </div>


            <div className="hm-data-row">

              <span className="hm-data-label">
                AVAILABILITY
              </span>

              <strong>
                100%
              </strong>

            </div>


            <div className="hm-data-row">

              <span className="hm-data-label">
                WORKLOAD
              </span>

              <strong>
                82%
              </strong>

            </div>


            <div className="hm-data-row">

              <span className="hm-data-label">
                EXPERIENCE
              </span>

              <strong>
                95%
              </strong>

            </div>

          </div>

        </div>

      )}


      {/* =====================================================
          MACHINE HEALTH
          ===================================================== */}

      {activeTab === "Machine Health" && (

        <div className="hm-grid hm-grid-3">

          {[
            {
              id: "M-102",
              name: "CNC MACHINE",
              health: 54,
              risk: "HIGH"
            },
            {
              id: "M-104",
              name: "HYDRAULIC PRESS",
              health: 92,
              risk: "LOW"
            },
            {
              id: "M-103",
              name: "AIR COMPRESSOR",
              health: 81,
              risk: "MEDIUM"
            }
          ].map((machine) => (

            <div
              className="hm-panel"
              key={machine.id}
            >

              <span className="hm-panel-label">
                ASSET
              </span>

              <h2>
                {machine.id}
              </h2>

              <p>
                {machine.name}
              </p>


              <strong
                className={`hm-metric-value ${
                  machine.health < 60
                    ? "hm-risk"
                    : machine.health < 80
                      ? "hm-warning"
                      : "hm-good"
                }`}
              >
                {machine.health}%
              </strong>


              <span className="hm-panel-label">
                MACHINE HEALTH
              </span>


              <div className="hm-progress">

                <span
                  style={{
                    width:
                      `${machine.health}%`
                  }}
                />

              </div>


              <div
                style={{
                  marginTop: "20px"
                }}
              >

                <span
                  className={`hm-status ${
                    machine.health < 60
                      ? "hm-risk"
                      : machine.health < 80
                        ? "hm-warning"
                        : "hm-good"
                  }`}
                >
                  {machine.risk} RISK
                </span>

              </div>

            </div>

          ))}

        </div>

      )}


      {/* =====================================================
          PARTS INTELLIGENCE
          ===================================================== */}

      {activeTab === "Parts Intelligence" && (

        <div className="hm-grid hm-grid-2">

          <div className="hm-panel">

            <span className="hm-panel-label">
              FORECAST ENGINE
            </span>

            <h2>
              Hydraulic Seal Kit
            </h2>

            <p>
              Current stock is below the predicted
              demand threshold.
            </p>


            <strong className="hm-metric-value hm-warning">
              73%
            </strong>

            <span className="hm-panel-label">
              STOCKOUT PROBABILITY
            </span>


            <div className="hm-progress">

              <span
                style={{
                  width: "73%"
                }}
              />

            </div>


            <button
              className="hm-button"
              style={{
                marginTop: "25px"
              }}
            >
              GENERATE REPLENISHMENT
            </button>

          </div>


          <div className="hm-panel">

            <span className="hm-panel-label">
              PREDICTION LOGIC
            </span>

            <h2>
              Demand Analysis
            </h2>


            <div className="hm-data-row">

              <span className="hm-data-label">
                CURRENT STOCK
              </span>

              <strong>
                03
              </strong>

            </div>


            <div className="hm-data-row">

              <span className="hm-data-label">
                MINIMUM STOCK
              </span>

              <strong>
                05
              </strong>

            </div>


            <div className="hm-data-row">

              <span className="hm-data-label">
                EXPECTED DEMAND
              </span>

              <strong>
                08
              </strong>

            </div>


            <div className="hm-data-row">

              <span className="hm-data-label">
                RISK
              </span>

              <span className="hm-status hm-warning">
                HIGH
              </span>

            </div>

          </div>

        </div>

      )}


      {/* =====================================================
          SLA PREDICTION
          ===================================================== */}

      {activeTab === "SLA Prediction" && (

        <div className="hm-grid hm-grid-2">

          <div className="hm-panel">

            <span className="hm-panel-label">
              SLA ENGINE
            </span>

            <h2>
              SR-1024
            </h2>

            <p>
              Hydraulic Press M-104
            </p>


            <strong className="hm-metric-value hm-risk">
              72%
            </strong>

            <span className="hm-panel-label">
              DELAY PROBABILITY
            </span>


            <div className="hm-progress">

              <span
                style={{
                  width: "72%"
                }}
              />

            </div>

          </div>


          <div className="hm-panel">

            <span className="hm-panel-label">
              RISK FACTORS
            </span>

            <h2>
              Why is this request at risk?
            </h2>


            <div className="hm-data-row">

              <span className="hm-data-label">
                TECHNICIAN AVAILABILITY
              </span>

              <strong className="hm-risk">
                HIGH RISK
              </strong>

            </div>


            <div className="hm-data-row">

              <span className="hm-data-label">
                PART AVAILABILITY
              </span>

              <strong className="hm-warning">
                MEDIUM
              </strong>

            </div>


            <div className="hm-data-row">

              <span className="hm-data-label">
                CURRENT WORKLOAD
              </span>

              <strong className="hm-risk">
                HIGH
              </strong>

            </div>


            <div className="hm-data-row">

              <span className="hm-data-label">
                RECOMMENDATION
              </span>

              <strong>
                REASSIGN
              </strong>

            </div>

          </div>

        </div>

      )}


      {/* =====================================================
          IMPACT SIMULATION
          ===================================================== */}

      {activeTab === "Impact Simulation" && (

        <>

          <div className="hm-panel">

            <span className="hm-kicker">
              SCENARIO ENGINE
            </span>

            <h2>
              Operational Impact Simulation
            </h2>

            <p>
              Test operational changes before they
              affect the real service workflow.
            </p>


            <div
              className="hm-grid hm-grid-3"
              style={{
                marginTop: "30px"
              }}
            >

              <div className="hm-metric">

                <span className="hm-metric-label">
                  TECHNICIAN AVAILABILITY
                </span>

                <strong className="hm-metric-value hm-risk">
                  -20%
                </strong>

                <span className="hm-metric-note">
                  Workforce reduction
                </span>

              </div>


              <div className="hm-metric">

                <span className="hm-metric-label">
                  PART SUPPLY DELAY
                </span>

                <strong className="hm-metric-value hm-warning">
                  +7D
                </strong>

                <span className="hm-metric-note">
                  Additional delivery time
                </span>

              </div>


              <div className="hm-metric">

                <span className="hm-metric-label">
                  WORKLOAD
                </span>

                <strong className="hm-metric-value hm-risk">
                  +25%
                </strong>

                <span className="hm-metric-note">
                  Operational increase
                </span>

              </div>

            </div>

          </div>


          <div
            className="hm-grid hm-grid-2"
            style={{
              marginTop: "14px"
            }}
          >

            <div className="hm-panel">

              <span className="hm-panel-label">
                CURRENT SYSTEM
              </span>

              <h2>
                Baseline
              </h2>


              <div className="hm-data-row">

                <span className="hm-data-label">
                  OPEN REQUESTS
                </span>

                <strong>
                  12
                </strong>

              </div>


              <div className="hm-data-row">

                <span className="hm-data-label">
                  AT RISK
                </span>

                <strong>
                  04
                </strong>

              </div>


              <div className="hm-data-row">

                <span className="hm-data-label">
                  AVAILABLE TECHNICIANS
                </span>

                <strong>
                  06
                </strong>

              </div>

            </div>


            <div className="hm-panel">

              <span className="hm-panel-label">
                SIMULATED SYSTEM
              </span>

              <h2>
                Scenario
              </h2>


              <div className="hm-data-row">

                <span className="hm-data-label">
                  OPEN REQUESTS
                </span>

                <strong className="hm-risk">
                  17
                </strong>

              </div>


              <div className="hm-data-row">

                <span className="hm-data-label">
                  AT RISK
                </span>

                <strong className="hm-risk">
                  09
                </strong>

              </div>


              <div className="hm-data-row">

                <span className="hm-data-label">
                  AVAILABLE TECHNICIANS
                </span>

                <strong className="hm-risk">
                  05
                </strong>

              </div>

            </div>

          </div>


          <div
            className="hm-panel"
            style={{
              marginTop: "14px",
              borderColor: "#f3fb04"
            }}
          >

            <span className="hm-panel-label">
              SYSTEM IMPACT
            </span>

            <strong className="hm-metric-value hm-risk">
              +41%
            </strong>

            <p>
              Projected operational risk increase
              under the simulated conditions.
            </p>

          </div>

        </>

      )}

    </div>

  );
}


export default SmartOperations;