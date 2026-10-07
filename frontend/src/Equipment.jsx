import "./Equipment.css";

function Equipment() {
  const equipment = [
    {
      id: "EQ-001",
      name: "CNC Milling Machine",
      type: "CNC Machine",
      location: "Site A",
      status: "Operational",
      lastService: "02 Oct 2026",
      nextService: "02 Nov 2026",
    },
    {
      id: "EQ-002",
      name: "Hydraulic Press",
      type: "Press Machine",
      location: "Site B",
      status: "Operational",
      lastService: "28 Sep 2026",
      nextService: "28 Oct 2026",
    },
    {
      id: "EQ-003",
      name: "Industrial Generator",
      type: "Generator",
      location: "Site A",
      status: "Under Maintenance",
      lastService: "25 Sep 2026",
      nextService: "10 Oct 2026",
    },
    {
      id: "EQ-004",
      name: "Air Compressor",
      type: "Compressor",
      location: "Site C",
      status: "Operational",
      lastService: "20 Sep 2026",
      nextService: "20 Oct 2026",
    },
    {
      id: "EQ-005",
      name: "Cooling System",
      type: "Cooling Equipment",
      location: "Site D",
      status: "Needs Attention",
      lastService: "15 Sep 2026",
      nextService: "08 Oct 2026",
    },
    {
      id: "EQ-006",
      name: "Conveyor System",
      type: "Material Handling",
      location: "Site B",
      status: "Operational",
      lastService: "12 Sep 2026",
      nextService: "12 Oct 2026",
    },
  ];

  return (
    <main className="equipment-page">
      {/* Page Header */}
      <div className="equipment-header">
        <div>
          <p className="equipment-eyebrow">ASSET MANAGEMENT</p>
          <h1>Equipment</h1>
          <p className="equipment-subtitle">
            Manage and monitor all equipment across your service locations.
          </p>
        </div>

        <button className="add-equipment-button">
          + Add Equipment
        </button>
      </div>

      {/* Summary Cards */}
      <section className="equipment-stats">
        <div className="equipment-stat-card">
          <span>Total Equipment</span>
          <strong>24</strong>
          <small>Across 4 locations</small>
        </div>

        <div className="equipment-stat-card">
          <span>Operational</span>
          <strong>18</strong>
          <small>75% of total equipment</small>
        </div>

        <div className="equipment-stat-card">
          <span>Under Maintenance</span>
          <strong>4</strong>
          <small>Currently being serviced</small>
        </div>

        <div className="equipment-stat-card equipment-stat-warning">
          <span>Needs Attention</span>
          <strong>2</strong>
          <small>Requires immediate review</small>
        </div>
      </section>

      {/* Equipment Table */}
      <section className="equipment-panel">
        <div className="equipment-panel-header">
          <div>
            <p className="equipment-eyebrow">EQUIPMENT LIST</p>
            <h2>All Equipment</h2>
          </div>

          <div className="equipment-controls">
            <input
              type="text"
              placeholder="Search equipment..."
              className="equipment-search"
            />

            <select className="equipment-filter" defaultValue="All">
              <option value="All">All Status</option>
              <option value="Operational">Operational</option>
              <option value="Under Maintenance">
                Under Maintenance
              </option>
              <option value="Needs Attention">
                Needs Attention
              </option>
            </select>
          </div>
        </div>

        <div className="equipment-table-wrapper">
          <table className="equipment-table">
            <thead>
              <tr>
                <th>Equipment</th>
                <th>Type</th>
                <th>Location</th>
                <th>Status</th>
                <th>Last Service</th>
                <th>Next Service</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {equipment.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="equipment-name">
                      <div className="equipment-icon">⚙</div>

                      <div>
                        <strong>{item.name}</strong>
                        <span>{item.id}</span>
                      </div>
                    </div>
                  </td>

                  <td>{item.type}</td>

                  <td>{item.location}</td>

                  <td>
                    <span
                      className={`equipment-status ${item.status
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>{item.lastService}</td>

                  <td>{item.nextService}</td>

                  <td>
                    <button className="equipment-view-button">
                      View →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default Equipment;