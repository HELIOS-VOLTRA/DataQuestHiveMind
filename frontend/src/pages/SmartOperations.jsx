import { useMemo, useState } from "react";
import "./SmartOperations.css";

const technicians = [
  {
    name: "Arjun Kumar",
    skill: 100,
    availability: 95,
    workload: 90,
    distance: 92,
    experience: 96,
  },
  {
    name: "Priya Sharma",
    skill: 94,
    availability: 88,
    workload: 82,
    distance: 96,
    experience: 91,
  },
  {
    name: "Rahul Singh",
    skill: 86,
    availability: 97,
    workload: 74,
    distance: 80,
    experience: 88,
  },
];

const machines = [
  {
    id: "M-104",
    name: "Hydraulic Press",
    health: 87,
    risk: 18,
    temperature: "Normal",
    vibration: "Slightly elevated",
    pressure: "Normal",
    maintenance: 62,
    status: "Healthy",
  },
  {
    id: "M-102",
    name: "CNC Machine",
    health: 54,
    risk: 67,
    temperature: "Normal",
    vibration: "High",
    pressure: "Normal",
    maintenance: 91,
    status: "Attention Required",
  },
  {
    id: "M-103",
    name: "Air Compressor",
    health: 72,
    risk: 41,
    temperature: "Elevated",
    vibration: "Moderate",
    pressure: "Normal",
    maintenance: 78,
    status: "Monitor",
  },
];

const parts = [
  {
    name: "Hydraulic Seal Kit",
    stock: 4,
    minimum: 5,
    predictedUsage: 6,
    stockoutRisk: 73,
    recommendation: "Order 8 units",
  },
  {
    name: "CNC Cutting Insert",
    stock: 18,
    minimum: 10,
    predictedUsage: 7,
    stockoutRisk: 18,
    recommendation: "No immediate action",
  },
  {
    name: "Compressor Bearing",
    stock: 3,
    minimum: 4,
    predictedUsage: 5,
    stockoutRisk: 81,
    recommendation: "Order 6 units",
  },
];

const serviceRequests = [
  {
    id: "SR-1024",
    machine: "M-104",
    issue: "Hydraulic pressure failure",
    deadline: "Today • 8:00 PM",
    risk: 72,
    completion: "7:35 PM",
    buffer: "25 min",
    reasons: ["Technician availability", "Spare part availability"],
  },
  {
    id: "SR-1025",
    machine: "M-102",
    issue: "Inaccurate CNC cuts",
    deadline: "Tomorrow • 4:00 PM",
    risk: 12,
    completion: "11:40 AM",
    buffer: "4h 20m",
    reasons: ["No major blockers"],
  },
  {
    id: "SR-1026",
    machine: "M-103",
    issue: "Unusual vibration",
    deadline: "Tomorrow • 6:00 PM",
    risk: 43,
    completion: "4:50 PM",
    buffer: "1h 10m",
    reasons: ["Maintenance workload"],
  },
];

function ScoreBar({ value }) {
  return (
    <div className="score-bar">
      <div
        className="score-bar-fill"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}

function RiskBadge({ risk }) {
  let label = "LOW";
  let className = "risk-low";

  if (risk >= 60) {
    label = "HIGH";
    className = "risk-high";
  } else if (risk >= 35) {
    label = "MEDIUM";
    className = "risk-medium";
  }

  return <span className={`risk-badge ${className}`}>{label}</span>;
}

export default function SmartOperations() {
  const [activeTab, setActiveTab] = useState("overview");
  const [simulation, setSimulation] = useState("availability");
  const [simulationRun, setSimulationRun] = useState(false);

  const recommendedTechnician = useMemo(() => {
    return technicians
      .map((tech) => ({
        ...tech,
        score:
          tech.skill * 0.35 +
          tech.availability * 0.25 +
          tech.workload * 0.15 +
          tech.distance * 0.1 +
          tech.experience * 0.15,
      }))
      .sort((a, b) => b.score - a.score)[0];
  }, []);

  const simulationResults = {
    availability: {
      title: "Technician availability -20%",
      requests: "+7",
      sla: "+18%",
      delay: "+42 min",
      machines: "+3",
      impact: "HIGH",
    },
    parts: {
      title: "Spare part supply delayed",
      requests: "+5",
      sla: "+14%",
      delay: "+35 min",
      machines: "+2",
      impact: "HIGH",
    },
    workload: {
      title: "Workload increases by 25%",
      requests: "+4",
      sla: "+11%",
      delay: "+28 min",
      machines: "+2",
      impact: "MEDIUM",
    },
  };

  const currentSimulation = simulationResults[simulation];

  return (
    <div className="smart-page">
      <div className="smart-header">
        <div>
          <div className="smart-eyebrow">HIVEMIND INTELLIGENCE</div>
          <h1>Smart Operations Center</h1>
          <p>
            Predict problems, optimize resources and simulate operational
            decisions before they happen.
          </p>
        </div>

        <div className="intelligence-status">
          <span className="pulse-dot"></span>
          Intelligence Engine Active
        </div>
      </div>

      <div className="smart-tabs">
        <button
          className={activeTab === "overview" ? "active" : ""}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>

        <button
          className={activeTab === "technicians" ? "active" : ""}
          onClick={() => setActiveTab("technicians")}
        >
          Technician Matching
        </button>

        <button
          className={activeTab === "machines" ? "active" : ""}
          onClick={() => setActiveTab("machines")}
        >
          Machine Health
        </button>

        <button
          className={activeTab === "parts" ? "active" : ""}
          onClick={() => setActiveTab("parts")}
        >
          Parts Intelligence
        </button>

        <button
          className={activeTab === "sla" ? "active" : ""}
          onClick={() => setActiveTab("sla")}
        >
          SLA Prediction
        </button>

        <button
          className={activeTab === "simulation" ? "active" : ""}
          onClick={() => setActiveTab("simulation")}
        >
          Impact Simulation
        </button>
      </div>

      {activeTab === "overview" && (
        <>
          <div className="intelligence-grid">
            <div className="intelligence-card">
              <div className="card-heading">
                <div>
                  <span className="feature-icon">🧠</span>
                  <h2>Technician Matching</h2>
                </div>

                <span className="ai-label">SMART</span>
              </div>

              <p className="card-description">
                Automatically rank technicians using skill, availability,
                workload, distance and experience.
              </p>

              <div className="recommendation">
                <div>
                  <span className="small-label">BEST MATCH</span>
                  <h3>{recommendedTechnician.name}</h3>
                </div>

                <strong>
                  {Math.round(recommendedTechnician.score)}%
                </strong>
              </div>
            </div>

            <div className="intelligence-card">
              <div className="card-heading">
                <div>
                  <span className="feature-icon">❤️‍🩹</span>
                  <h2>Machine Health</h2>
                </div>

                <span className="warning-label">3 ALERTS</span>
              </div>

              <p className="card-description">
                Predict machine failure risk using equipment condition and
                maintenance indicators.
              </p>

              <div className="health-preview">
                <strong>54</strong>
                <div>
                  <span>Lowest machine health</span>
                  <small>M-102 • CNC Machine</small>
                </div>

                <RiskBadge risk={67} />
              </div>
            </div>

            <div className="intelligence-card">
              <div className="card-heading">
                <div>
                  <span className="feature-icon">📦</span>
                  <h2>Parts Intelligence</h2>
                </div>

                <span className="warning-label">2 ALERTS</span>
              </div>

              <p className="card-description">
                Predict upcoming stockouts and recommend replenishment before
                service is delayed.
              </p>

              <div className="health-preview">
                <strong>73%</strong>
                <div>
                  <span>Highest stockout risk</span>
                  <small>Hydraulic Seal Kit</small>
                </div>

                <RiskBadge risk={73} />
              </div>
            </div>

            <div className="intelligence-card">
              <div className="card-heading">
                <div>
                  <span className="feature-icon">⏱️</span>
                  <h2>SLA Prediction</h2>
                </div>

                <span className="warning-label">1 HIGH RISK</span>
              </div>

              <p className="card-description">
                Predict which service requests are likely to miss their SLA
                before they become overdue.
              </p>

              <div className="health-preview">
                <strong>72%</strong>
                <div>
                  <span>Highest SLA risk</span>
                  <small>SR-1024 • Hydraulic Press</small>
                </div>

                <RiskBadge risk={72} />
              </div>
            </div>
          </div>

          <div className="smart-section">
            <div className="section-title">
              <div>
                <h2>Priority Intelligence</h2>
                <p>
                  Items that need attention based on current predictions.
                </p>
              </div>
            </div>

            <div className="priority-table">
              {serviceRequests.map((request) => (
                <div className="priority-row" key={request.id}>
                  <div>
                    <strong>{request.id}</strong>
                    <span>{request.issue}</span>
                  </div>

                  <div>
                    <span className="table-label">SLA RISK</span>
                    <RiskBadge risk={request.risk} />
                  </div>

                  <div>
                    <span className="table-label">EST. COMPLETION</span>
                    <strong>{request.completion}</strong>
                  </div>

                  <div>
                    <span className="table-label">BUFFER</span>
                    <strong>{request.buffer}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === "technicians" && (
        <div className="smart-section">
          <div className="section-title">
            <div>
              <h2>Intelligent Technician Matching</h2>
              <p>
                Recommended technician for service request SR-1024.
              </p>
            </div>

            <span className="request-chip">SR-1024</span>
          </div>

          <div className="match-hero">
            <div>
              <span className="small-label">RECOMMENDED TECHNICIAN</span>
              <h2>{recommendedTechnician.name}</h2>
              <p>
                Best overall match based on five operational parameters.
              </p>
            </div>

            <div className="match-score">
              <strong>
                {Math.round(recommendedTechnician.score)}%
              </strong>
              <span>Match Score</span>
            </div>
          </div>

          <div className="technician-list">
            {technicians.map((tech) => {
              const score =
                tech.skill * 0.35 +
                tech.availability * 0.25 +
                tech.workload * 0.15 +
                tech.distance * 0.1 +
                tech.experience * 0.15;

              return (
                <div className="technician-card" key={tech.name}>
                  <div className="technician-card-top">
                    <div className="technician-avatar">
                      {tech.name.charAt(0)}
                    </div>

                    <div>
                      <h3>{tech.name}</h3>
                      <span>Technician</span>
                    </div>

                    <strong className="technician-score">
                      {Math.round(score)}%
                    </strong>
                  </div>

                  <div className="metric-grid">
                    <div>
                      <div className="metric-label">
                        Skill Match <strong>{tech.skill}%</strong>
                      </div>
                      <ScoreBar value={tech.skill} />
                    </div>

                    <div>
                      <div className="metric-label">
                        Availability <strong>{tech.availability}%</strong>
                      </div>
                      <ScoreBar value={tech.availability} />
                    </div>

                    <div>
                      <div className="metric-label">
                        Workload <strong>{tech.workload}%</strong>
                      </div>
                      <ScoreBar value={tech.workload} />
                    </div>

                    <div>
                      <div className="metric-label">
                        Distance <strong>{tech.distance}%</strong>
                      </div>
                      <ScoreBar value={tech.distance} />
                    </div>

                    <div>
                      <div className="metric-label">
                        Experience <strong>{tech.experience}%</strong>
                      </div>
                      <ScoreBar value={tech.experience} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === "machines" && (
        <div className="smart-section">
          <div className="section-title">
            <div>
              <h2>Predictive Machine Health</h2>
              <p>
                Identify machines that may require maintenance before failure.
              </p>
            </div>
          </div>

          <div className="machine-grid">
            {machines.map((machine) => (
              <div className="machine-card" key={machine.id}>
                <div className="machine-card-header">
                  <div>
                    <span className="small-label">{machine.id}</span>
                    <h3>{machine.name}</h3>
                  </div>

                  <RiskBadge risk={machine.risk} />
                </div>

                <div className="health-score">
                  <div>
                    <span>HEALTH SCORE</span>
                    <strong>{machine.health}</strong>
                    <small>/100</small>
                  </div>

                  <div className="health-ring">
                    <div
                      className="health-ring-inner"
                      style={{
                        "--health": `${machine.health}%`,
                      }}
                    >
                      {machine.health}
                    </div>
                  </div>
                </div>

                <div className="machine-status">
                  <span>{machine.status}</span>
                  <strong>{machine.risk}% failure risk</strong>
                </div>

                <div className="machine-metrics">
                  <div>
                    <span>Temperature</span>
                    <strong>{machine.temperature}</strong>
                  </div>

                  <div>
                    <span>Vibration</span>
                    <strong>{machine.vibration}</strong>
                  </div>

                  <div>
                    <span>Pressure</span>
                    <strong>{machine.pressure}</strong>
                  </div>

                  <div>
                    <span>Maintenance Age</span>
                    <strong>{machine.maintenance}%</strong>
                  </div>
                </div>

                {machine.risk >= 60 && (
                  <button className="action-button">
                    Create Service Request
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "parts" && (
        <div className="smart-section">
          <div className="section-title">
            <div>
              <h2>Spare Parts Intelligence</h2>
              <p>
                Predict stockouts and recommend replenishment before service
                is affected.
              </p>
            </div>
          </div>

          <div className="parts-grid">
            {parts.map((part) => (
              <div className="part-intelligence-card" key={part.name}>
                <div className="part-header">
                  <div>
                    <span className="small-label">PART</span>
                    <h3>{part.name}</h3>
                  </div>

                  <RiskBadge risk={part.stockoutRisk} />
                </div>

                <div className="part-stats">
                  <div>
                    <span>Current Stock</span>
                    <strong>{part.stock}</strong>
                  </div>

                  <div>
                    <span>Minimum</span>
                    <strong>{part.minimum}</strong>
                  </div>

                  <div>
                    <span>Predicted Usage</span>
                    <strong>{part.predictedUsage}</strong>
                  </div>
                </div>

                <div className="stockout-section">
                  <div className="metric-label">
                    Stockout Probability
                    <strong>{part.stockoutRisk}%</strong>
                  </div>

                  <ScoreBar value={part.stockoutRisk} />
                </div>

                <div className="recommendation-box">
                  <span>RECOMMENDED ACTION</span>
                  <strong>{part.recommendation}</strong>
                </div>

                {part.stockoutRisk >= 60 && (
                  <button className="action-button">
                    Generate Replenishment
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "sla" && (
        <div className="smart-section">
          <div className="section-title">
            <div>
              <h2>SLA & Delay Prediction</h2>
              <p>
                Identify requests that are likely to miss their SLA deadline.
              </p>
            </div>
          </div>

          <div className="sla-list">
            {serviceRequests.map((request) => (
              <div className="sla-card" key={request.id}>
                <div className="sla-main">
                  <div>
                    <span className="small-label">{request.id}</span>
                    <h3>{request.issue}</h3>
                    <p>
                      Machine: {request.machine} • Deadline:{" "}
                      {request.deadline}
                    </p>
                  </div>

                  <div className="sla-risk">
                    <strong>{request.risk}%</strong>
                    <span>Delay Risk</span>
                    <RiskBadge risk={request.risk} />
                  </div>
                </div>

                <div className="sla-progress">
                  <div className="metric-label">
                    <span>Predicted completion</span>
                    <strong>{request.completion}</strong>
                  </div>

                  <ScoreBar value={100 - request.risk} />
                </div>

                <div className="sla-bottom">
                  <div>
                    <span>BUFFER</span>
                    <strong>{request.buffer}</strong>
                  </div>

                  <div>
                    <span>RISK FACTORS</span>
                    <strong>{request.reasons.join(" • ")}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "simulation" && (
        <div className="smart-section">
          <div className="section-title">
            <div>
              <h2>Impact Simulation</h2>
              <p>
                Test operational scenarios before making real-world decisions.
              </p>
            </div>
          </div>

          <div className="simulation-controls">
            <button
              className={simulation === "availability" ? "selected" : ""}
              onClick={() => {
                setSimulation("availability");
                setSimulationRun(false);
              }}
            >
              Technician Availability
            </button>

            <button
              className={simulation === "parts" ? "selected" : ""}
              onClick={() => {
                setSimulation("parts");
                setSimulationRun(false);
              }}
            >
              Parts Supply
            </button>

            <button
              className={simulation === "workload" ? "selected" : ""}
              onClick={() => {
                setSimulation("workload");
                setSimulationRun(false);
              }}
            >
              Workload Increase
            </button>
          </div>

          <div className="simulation-card">
            <div className="simulation-input">
              <span className="small-label">SCENARIO</span>
              <h2>{currentSimulation.title}</h2>
              <p>
                HiveMind will estimate the operational impact across service
                requests, SLA compliance and machine availability.
              </p>

              <button
                className="simulate-button"
                onClick={() => setSimulationRun(true)}
              >
                {simulationRun ? "Simulation Complete" : "Run Simulation"}
              </button>
            </div>

            {simulationRun && (
              <div className="simulation-results">
                <div className="simulation-impact">
                  <span>OVERALL IMPACT</span>
                  <strong>{currentSimulation.impact}</strong>
                </div>

                <div className="simulation-stat">
                  <span>Affected Requests</span>
                  <strong>{currentSimulation.requests}</strong>
                </div>

                <div className="simulation-stat">
                  <span>SLA Risk</span>
                  <strong>{currentSimulation.sla}</strong>
                </div>

                <div className="simulation-stat">
                  <span>Average Delay</span>
                  <strong>{currentSimulation.delay}</strong>
                </div>

                <div className="simulation-stat">
                  <span>Machines at Risk</span>
                  <strong>{currentSimulation.machines}</strong>
                </div>
              </div>
            )}
          </div>

          {simulationRun && (
            <div className="recommendation-panel">
              <div>
                <span className="small-label">HIVEMIND RECOMMENDATION</span>
                <h3>Rebalance technician assignments</h3>
                <p>
                  Move one available technician toward high-risk requests to
                  reduce predicted SLA breaches.
                </p>
              </div>

              <button className="action-button">
                Apply Recommendation
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}