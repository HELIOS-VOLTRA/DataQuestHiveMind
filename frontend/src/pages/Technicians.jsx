import { useMemo, useState } from "react";
import "../App.css";

const technicians = [
  {
    id: "T-001",
    name: "Rahul Kumar",
    skills: ["Motor", "Hydraulic", "Electrical"],
    availability: "Available",
    workload: 25,
    distance: 4.2,
    experience: 5,
    rating: 4.8,
  },
  {
    id: "T-002",
    name: "Ananya Sharma",
    skills: ["Electrical", "PLC", "Automation"],
    availability: "On Site",
    workload: 70,
    distance: 8.5,
    experience: 4,
    rating: 4.6,
  },
  {
    id: "T-003",
    name: "Arjun Menon",
    skills: ["Motor", "Mechanical", "Hydraulic"],
    availability: "Available",
    workload: 40,
    distance: 6.1,
    experience: 7,
    rating: 4.9,
  },
  {
    id: "T-004",
    name: "Priya Nair",
    skills: ["Electrical", "Mechanical", "Safety"],
    availability: "Unavailable",
    workload: 90,
    distance: 12.4,
    experience: 3,
    rating: 4.5,
  },
];

const serviceRequest = {
  id: "SR-1024",
  machine: "M-104",
  issue: "Motor overheating",
  location: "Site A",
  requiredSkill: "Motor",
};

function calculateMatch(technician) {
  let score = 0;

  // Skill match - 35 points
  if (technician.skills.includes(serviceRequest.requiredSkill)) {
    score += 35;
  }

  // Availability - 25 points
  if (technician.availability === "Available") {
    score += 25;
  } else if (technician.availability === "On Site") {
    score += 10;
  }

  // Workload - 15 points
  if (technician.workload <= 30) {
    score += 15;
  } else if (technician.workload <= 50) {
    score += 10;
  } else if (technician.workload <= 75) {
    score += 5;
  }

  // Distance - 10 points
  if (technician.distance <= 5) {
    score += 10;
  } else if (technician.distance <= 10) {
    score += 7;
  } else {
    score += 3;
  }

  // Experience - 15 points
  if (technician.experience >= 7) {
    score += 15;
  } else if (technician.experience >= 5) {
    score += 12;
  } else if (technician.experience >= 3) {
    score += 8;
  } else {
    score += 5;
  }

  return score;
}

function Technicians() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showMatching, setShowMatching] = useState(false);
  const [assignedTechnician, setAssignedTechnician] = useState(null);

  const techniciansWithScores = useMemo(() => {
    return technicians
      .map((technician) => ({
        ...technician,
        matchScore: calculateMatch(technician),
      }))
      .sort((a, b) => b.matchScore - a.matchScore);
  }, []);

  const filteredTechnicians = techniciansWithScores.filter((technician) => {
    const matchesSearch = technician.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      technician.availability === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const bestMatch = techniciansWithScores[0];

  return (
    <main className="main">
      {/* HEADER */}
      <header className="header">
        <div>
          <p className="eyebrow">OPERATIONS CENTER</p>
          <h1>Technicians</h1>
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

      {/* HERO */}
      <section className="welcome">
        <div>
          <h2>Technician Management</h2>

          <p>
            Monitor technician availability, assignments and current workload.
          </p>
        </div>

        <button className="primary-button">
          + Add Technician
        </button>
      </section>

      {/* INTELLIGENT MATCHING */}
      <section className="panel" style={{ marginBottom: "24px" }}>
        <div className="panel-header">
          <div>
            <p className="eyebrow">INTELLIGENT ASSIGNMENT</p>

            <h2>AI Technician Matching</h2>

            <p style={{ marginTop: "8px" }}>
              Automatically rank technicians using skill, availability,
              workload, distance and experience.
            </p>
          </div>

          <button
            className="primary-button"
            onClick={() => setShowMatching(!showMatching)}
          >
            {showMatching ? "Hide Recommendation" : "Find Best Technician"}
          </button>
        </div>

        {showMatching && (
          <div
            style={{
              marginTop: "24px",
              padding: "24px",
              borderRadius: "16px",
              background: "#f5f8fc",
              border: "1px solid #dce5f0",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <p className="eyebrow">SERVICE REQUEST</p>

                <h2 style={{ margin: "6px 0" }}>
                  {serviceRequest.id} — {serviceRequest.issue}
                </h2>

                <p>
                  Equipment: <strong>{serviceRequest.machine}</strong>
                  {" • "}
                  Location: <strong>{serviceRequest.location}</strong>
                </p>
              </div>

              <div
                style={{
                  fontSize: "28px",
                  fontWeight: "800",
                }}
              >
                {bestMatch.matchScore}% Match
              </div>
            </div>

            <div
              style={{
                marginTop: "22px",
                padding: "20px",
                background: "white",
                borderRadius: "14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <div>
                  <p className="eyebrow">RECOMMENDED TECHNICIAN</p>

                  <h2 style={{ margin: "5px 0" }}>
                    {bestMatch.name}
                  </h2>

                  <p>
                    {bestMatch.experience} years experience
                    {" • "}
                    {bestMatch.distance} km away
                  </p>
                </div>

                <button
                  className="primary-button"
                  onClick={() => setAssignedTechnician(bestMatch.name)}
                >
                  Assign Technician
                </button>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(150px, 1fr))",
                  gap: "12px",
                  marginTop: "20px",
                }}
              >
                <div className="stat-card">
                  <span>Skill Match</span>
                  <strong>
                    {bestMatch.skills.includes(
                      serviceRequest.requiredSkill
                    )
                      ? "✓"
                      : "—"}
                  </strong>
                  <small>Motor specialist</small>
                </div>

                <div className="stat-card">
                  <span>Availability</span>
                  <strong>
                    {bestMatch.availability === "Available"
                      ? "✓"
                      : "—"}
                  </strong>
                  <small>{bestMatch.availability}</small>
                </div>

                <div className="stat-card">
                  <span>Workload</span>
                  <strong>{bestMatch.workload}%</strong>
                  <small>Current workload</small>
                </div>

                <div className="stat-card">
                  <span>Distance</span>
                  <strong>{bestMatch.distance} km</strong>
                  <small>From Site A</small>
                </div>

                <div className="stat-card">
                  <span>Experience</span>
                  <strong>{bestMatch.experience} yrs</strong>
                  <small>Field experience</small>
                </div>
              </div>

              {assignedTechnician && (
                <div
                  style={{
                    marginTop: "18px",
                    padding: "14px",
                    borderRadius: "10px",
                    background: "#e9f9ef",
                    color: "#18733c",
                    fontWeight: "700",
                  }}
                >
                  ✓ {assignedTechnician} assigned to {serviceRequest.id}
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* SUMMARY */}
      <section className="stats">
        <div className="stat-card">
          <span>Total Technicians</span>
          <strong>{technicians.length}</strong>
          <small>Registered technicians</small>
        </div>

        <div className="stat-card">
          <span>Available</span>
          <strong>
            {
              technicians.filter(
                (t) => t.availability === "Available"
              ).length
            }
          </strong>
          <small>Ready for assignment</small>
        </div>

        <div className="stat-card">
          <span>On Site</span>
          <strong>
            {
              technicians.filter(
                (t) => t.availability === "On Site"
              ).length
            }
          </strong>
          <small>Currently working</small>
        </div>

        <div className="stat-card urgent">
          <span>Unavailable</span>
          <strong>
            {
              technicians.filter(
                (t) => t.availability === "Unavailable"
              ).length
            }
          </strong>
          <small>Cannot accept jobs</small>
        </div>
      </section>

      {/* DIRECTORY */}
      <section className="panel" style={{ marginTop: "24px" }}>
        <div className="panel-header">
          <div>
            <p className="eyebrow">FIELD OPERATIONS</p>
            <h2>Technician Directory</h2>
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <input
              type="text"
              placeholder="Search technicians..."
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Available">Available</option>
              <option value="On Site">On Site</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>
        </div>

        <div className="service-request-list">
          {filteredTechnicians.map((technician) => (
            <div
              className="service-request-card"
              key={technician.id}
            >
              <div className="request-card-top">
                <div>
                  <span className="request-id">
                    {technician.id}
                  </span>

                  <h3>{technician.name}</h3>
                </div>

                <span
                  className={`status ${technician.availability
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {technician.availability}
                </span>
              </div>

              <div className="request-details">
                <div>
                  <span>Skills</span>
                  <strong>
                    {technician.skills.join(", ")}
                  </strong>
                </div>

                <div>
                  <span>Workload</span>
                  <strong>{technician.workload}%</strong>
                </div>

                <div>
                  <span>Experience</span>
                  <strong>
                    {technician.experience} years
                  </strong>
                </div>
              </div>

              <div className="request-card-bottom">
                <span>
                  ⭐ {technician.rating}
                </span>

                <strong>
                  {technician.matchScore}% match
                </strong>
              </div>
            </div>
          ))}

          {filteredTechnicians.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "40px",
              }}
            >
              <h3>No technicians found</h3>

              <p>
                Try changing your search or filter.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Technicians;