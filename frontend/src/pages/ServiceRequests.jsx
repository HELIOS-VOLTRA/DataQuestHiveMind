import { useMemo, useState } from "react";
import "../App.css";

const initialRequests = [
  {
    id: "SR-1024",
    machine: "M-104",
    site: "Site A",
    issue: "Motor overheating",
    priority: "Urgent",
    status: "Pending",
    technician: "Unassigned",
  },
  {
    id: "SR-1025",
    machine: "M-208",
    site: "Site B",
    issue: "Hydraulic pressure issue",
    priority: "High",
    status: "Assigned",
    technician: "Rahul Kumar",
  },
  {
    id: "SR-1026",
    machine: "M-301",
    site: "Site C",
    issue: "Routine maintenance",
    priority: "Normal",
    status: "Active",
    technician: "Ananya Sharma",
  },
];

function ServiceRequests() {
  const [requests, setRequests] = useState(initialRequests);

  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [formData, setFormData] = useState({
    machine: "",
    site: "",
    issue: "",
    priority: "Normal",
    technician: "Unassigned",
  });

  // --------------------------------------------------
  // SEARCH + FILTERING
  // --------------------------------------------------

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        request.id.toLowerCase().includes(searchText) ||
        request.machine.toLowerCase().includes(searchText) ||
        request.site.toLowerCase().includes(searchText) ||
        request.issue.toLowerCase().includes(searchText) ||
        request.technician.toLowerCase().includes(searchText);

      const matchesPriority =
        priorityFilter === "All" ||
        request.priority === priorityFilter;

      const matchesStatus =
        statusFilter === "All" ||
        request.status === statusFilter;

      return matchesSearch && matchesPriority && matchesStatus;
    });
  }, [requests, search, priorityFilter, statusFilter]);

  // --------------------------------------------------
  // FORM HANDLING
  // --------------------------------------------------

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleCreateRequest = (event) => {
    event.preventDefault();

    if (!formData.machine || !formData.site || !formData.issue) {
      alert("Please fill in Equipment, Location and Problem.");
      return;
    }

    const nextNumber =
      Math.max(
        ...requests.map((request) =>
          Number(request.id.replace("SR-", ""))
        )
      ) + 1;

    const newRequest = {
      id: `SR-${nextNumber}`,
      machine: formData.machine,
      site: formData.site,
      issue: formData.issue,
      priority: formData.priority,
      status: "Pending",
      technician: formData.technician || "Unassigned",
    };

    setRequests((previous) => [newRequest, ...previous]);

    setFormData({
      machine: "",
      site: "",
      issue: "",
      priority: "Normal",
      technician: "Unassigned",
    });

    setShowCreateForm(false);
  };

  return (
    <main className="main">
      {/* ==================================================
          HEADER
      ================================================== */}

      <header className="header">
        <div>
          <p className="eyebrow">OPERATIONS CENTER</p>
          <h1>Service Requests</h1>
        </div>

        <div className="header-right">
          <button className="notification-button">
            🔔
          </button>

          <div className="user">
            <div className="avatar">A</div>

            <div>
              <strong>Admin User</strong>
              <span>Operations Manager</span>
            </div>
          </div>
        </div>
      </header>

      {/* ==================================================
          PAGE INTRO
      ================================================== */}

      <section className="welcome">
        <div>
          <h2>Service Requests</h2>

          <p>
            Monitor, prioritize and manage equipment service requests.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowCreateForm(true)}
        >
          + Create Service Request
        </button>
      </section>

      {/* ==================================================
          REQUEST LIST
      ================================================== */}

      <section className="panel requests-page-panel">
        <div className="service-page-header">
          <div>
            <p className="eyebrow">SERVICE OPERATIONS</p>
            <h2>All Service Requests</h2>
          </div>

          {/* FILTERS */}

          <div className="request-filters">
            <input
              type="text"
              placeholder="Search requests..."
              className="search-input"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <select
              className="filter-select"
              value={priorityFilter}
              onChange={(event) =>
                setPriorityFilter(event.target.value)
              }
            >
              <option value="All">All Priorities</option>
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Normal">Normal</option>
            </select>

            <select
              className="filter-select"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Assigned">Assigned</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* REQUEST COUNT */}

        <div className="request-summary">
          Showing {filteredRequests.length} of {requests.length} requests
        </div>

        {/* REQUEST CARDS */}

        <div className="service-request-list">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <div
                className="service-request-card"
                key={request.id}
              >
                {/* TOP */}

                <div className="request-card-top">
                  <div>
                    <span className="request-id">
                      {request.id}
                    </span>

                    <h3>
                      {request.machine} — {request.issue}
                    </h3>
                  </div>

                  <span
                    className={`priority ${request.priority.toLowerCase()}`}
                  >
                    {request.priority}
                  </span>
                </div>

                {/* DETAILS */}

                <div className="request-details">
                  <div>
                    <span>Location</span>
                    <strong>{request.site}</strong>
                  </div>

                  <div>
                    <span>Technician</span>
                    <strong>{request.technician}</strong>
                  </div>

                  <div>
                    <span>Status</span>
                    <strong>{request.status}</strong>
                  </div>
                </div>

                {/* BOTTOM */}

                <div className="request-card-bottom">
                  <span
                    className={`status ${request.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {request.status}
                  </span>

                  <button
                    className="text-button"
                    onClick={() =>
                      setSelectedRequest(request)
                    }
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <h3>No service requests found</h3>

              <p>
                Try changing your search or filter settings.
              </p>

              <button
                className="text-button"
                onClick={() => {
                  setSearch("");
                  setPriorityFilter("All");
                  setStatusFilter("All");
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ==================================================
          VIEW DETAILS MODAL
      ================================================== */}

      {selectedRequest && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedRequest(null)}
        >
          <div
            className="modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <p className="eyebrow">SERVICE REQUEST</p>

                <h2>{selectedRequest.id}</h2>
              </div>

              <button
                className="modal-close"
                onClick={() => setSelectedRequest(null)}
              >
                ×
              </button>
            </div>

            <div className="modal-content">
              <h3>
                {selectedRequest.machine} —{" "}
                {selectedRequest.issue}
              </h3>

              <div className="modal-details">
                <div>
                  <span>Equipment</span>
                  <strong>{selectedRequest.machine}</strong>
                </div>

                <div>
                  <span>Location</span>
                  <strong>{selectedRequest.site}</strong>
                </div>

                <div>
                  <span>Priority</span>
                  <strong>{selectedRequest.priority}</strong>
                </div>

                <div>
                  <span>Status</span>
                  <strong>{selectedRequest.status}</strong>
                </div>

                <div>
                  <span>Technician</span>
                  <strong>
                    {selectedRequest.technician}
                  </strong>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="secondary-button"
                onClick={() => setSelectedRequest(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================
          CREATE REQUEST MODAL
      ================================================== */}

      {showCreateForm && (
        <div
          className="modal-overlay"
          onClick={() => setShowCreateForm(false)}
        >
          <div
            className="modal create-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <p className="eyebrow">NEW REQUEST</p>

                <h2>Create Service Request</h2>
              </div>

              <button
                className="modal-close"
                onClick={() => setShowCreateForm(false)}
              >
                ×
              </button>
            </div>

            <form
              className="request-form"
              onSubmit={handleCreateRequest}
            >
              <label>
                Equipment ID
                <input
                  name="machine"
                  type="text"
                  placeholder="Example: M-104"
                  value={formData.machine}
                  onChange={handleFormChange}
                />
              </label>

              <label>
                Location
                <input
                  name="site"
                  type="text"
                  placeholder="Example: Site A"
                  value={formData.site}
                  onChange={handleFormChange}
                />
              </label>

              <label>
                Problem
                <input
                  name="issue"
                  type="text"
                  placeholder="Describe the equipment issue"
                  value={formData.issue}
                  onChange={handleFormChange}
                />
              </label>

              <label>
                Priority
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleFormChange}
                >
                  <option value="Urgent">Urgent</option>
                  <option value="High">High</option>
                  <option value="Normal">Normal</option>
                </select>
              </label>

              <label>
                Technician
                <input
                  name="technician"
                  type="text"
                  placeholder="Leave as Unassigned if unknown"
                  value={formData.technician}
                  onChange={handleFormChange}
                />
              </label>

              <div className="modal-footer">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                >
                  Create Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default ServiceRequests;