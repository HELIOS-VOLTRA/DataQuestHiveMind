import { useEffect, useState } from "react";
import "./HiveMindPage.css";

const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

// These IDs match the current database seed data.
const MACHINES = [
  { id: 1, code: "M-101", name: "Hydraulic Press" },
  { id: 2, code: "M-102", name: "CNC Milling Machine" },
  { id: 3, code: "M-201", name: "Industrial Compressor" },
  { id: 4, code: "M-202", name: "Assembly Robot" },
  { id: 5, code: "M-301", name: "Power Generator" }
];

const USERS = [
  { id: 1, name: "Admin User" },
  { id: 2, name: "Site Manager" },
  { id: 3, name: "Maintenance Coordinator" },
  { id: 4, name: "Technician One" },
  { id: 5, name: "Technician Two" },
  { id: 6, name: "Technician Three" }
];

const SKILLS = [
  { id: 1, name: "Electrical" },
  { id: 2, name: "Mechanical" },
  { id: 3, name: "CNC" },
  { id: 4, name: "Robotics" }
];

function ServiceRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    machine_id: "",
    requested_by: "",
    issue_description: "",
    priority: "Medium",
    required_skill_id: "",
    sla_deadline: ""
  });

  const loadRequests = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE}/api/service-requests`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
          data.message ||
          "Unable to load service requests"
        );
      }

      const list =
        data.service_requests ||
        data.requests ||
        data.data ||
        [];

      setRequests(list);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));

    setError("");
    setSuccess("");
  };

  const resetForm = () => {
    setForm({
      machine_id: "",
      requested_by: "",
      issue_description: "",
      priority: "Medium",
      required_skill_id: "",
      sla_deadline: ""
    });
  };

  const createRequest = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    // Basic frontend validation
    if (!form.machine_id) {
      setError("Please select a machine.");
      return;
    }

    if (!form.requested_by) {
      setError("Please select the requesting user.");
      return;
    }

    if (!form.required_skill_id) {
      setError("Please select the required skill.");
      return;
    }

    if (!form.issue_description.trim()) {
      setError("Please describe the equipment issue.");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE}/api/service-requests`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            machine_id: Number(form.machine_id),
            requested_by: Number(form.requested_by),
            issue_description:
              form.issue_description.trim(),
            priority: form.priority,

            // This now ALWAYS sends 1, 2, 3 or 4.
            required_skill_id:
              Number(form.required_skill_id),

            sla_deadline:
              form.sla_deadline || null
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
          data.message ||
          "Failed to create service request"
        );
      }

      setSuccess(
        `Service request #${
          data.request_id || "created"
        } successfully.`
      );

      resetForm();
      setShowForm(false);

      await loadRequests();
    } catch (err) {
      setError(err.message);
    }
  };

  const openRequests = requests.filter(
    (item) =>
      !["Completed", "Closed"].includes(
        item.status
      )
  ).length;

  const criticalRequests = requests.filter(
    (item) =>
      String(item.priority || "").toLowerCase() ===
      "critical"
  ).length;

  const assignedRequests = requests.filter(
    (item) =>
      item.technician_id ||
      item.assigned_technician_id
  ).length;

  const pendingRequests = requests.filter(
    (item) =>
      String(item.status || "").toLowerCase() ===
      "pending"
  ).length;

  return (
    <div className="hm-page">

      {/* HEADER */}
      <div className="hm-header">

        <div>
          <span className="hm-kicker">
            SERVICE CONTROL / 02
          </span>

          <h1>
            Service Requests
          </h1>

          <p>
            Centralized control of maintenance requests,
            priorities, assignments and service progress.
          </p>
        </div>

        <button
          className="hm-button"
          onClick={() => {
            setShowForm(!showForm);
            setError("");
            setSuccess("");
          }}
        >
          {showForm
            ? "CLOSE FORM"
            : "+ CREATE REQUEST"}
        </button>

      </div>


      {/* METRICS */}
      <div className="hm-grid hm-grid-4">

        <div className="hm-metric">
          <span className="hm-metric-label">
            OPEN
          </span>

          <strong className="hm-metric-value">
            {openRequests}
          </strong>

          <span className="hm-metric-note">
            Active requests
          </span>
        </div>


        <div className="hm-metric">
          <span className="hm-metric-label">
            CRITICAL
          </span>

          <strong className="hm-metric-value hm-risk">
            {criticalRequests}
          </strong>

          <span className="hm-metric-note">
            Immediate attention
          </span>
        </div>


        <div className="hm-metric">
          <span className="hm-metric-label">
            ASSIGNED
          </span>

          <strong className="hm-metric-value">
            {assignedRequests}
          </strong>

          <span className="hm-metric-note">
            Workforce assigned
          </span>
        </div>


        <div className="hm-metric">
          <span className="hm-metric-label">
            PENDING
          </span>

          <strong className="hm-metric-value hm-warning">
            {pendingRequests}
          </strong>

          <span className="hm-metric-note">
            Awaiting action
          </span>
        </div>

      </div>


      {/* SUCCESS MESSAGE */}
      {success && (
        <div
          style={{
            marginTop: "14px",
            padding: "14px",
            border: "1px solid #dfff00",
            color: "#dfff00"
          }}
        >
          {success}
        </div>
      )}


      {/* ERROR MESSAGE */}
      {error && (
        <div
          style={{
            marginTop: "14px",
            padding: "14px",
            border: "1px solid #ff4d4d",
            color: "#ff4d4d"
          }}
        >
          {error}
        </div>
      )}


      {/* CREATE REQUEST FORM */}
      {showForm && (

        <div
          className="hm-panel"
          style={{ marginTop: "14px" }}
        >

          <div className="hm-panel-header">

            <div>
              <span className="hm-panel-label">
                NEW SERVICE REQUEST
              </span>

              <h2>
                Create Request
              </h2>
            </div>

          </div>


          <form onSubmit={createRequest}>

            <div
              className="hm-grid hm-grid-2"
              style={{ gap: "14px" }}
            >

              {/* MACHINE */}
              <select
                name="machine_id"
                value={form.machine_id}
                onChange={handleChange}
                required
              >
                <option value="">
                  SELECT MACHINE
                </option>

                {MACHINES.map((machine) => (
                  <option
                    key={machine.id}
                    value={machine.id}
                  >
                    {machine.code} — {machine.name}
                  </option>
                ))}
              </select>


              {/* REQUESTED BY */}
              <select
                name="requested_by"
                value={form.requested_by}
                onChange={handleChange}
                required
              >
                <option value="">
                  SELECT REQUESTED BY
                </option>

                {USERS.map((user) => (
                  <option
                    key={user.id}
                    value={user.id}
                  >
                    {user.name}
                  </option>
                ))}
              </select>


              {/* PRIORITY */}
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                required
              >
                <option value="Low">
                  LOW
                </option>

                <option value="Medium">
                  MEDIUM
                </option>

                <option value="High">
                  HIGH
                </option>

                <option value="Critical">
                  CRITICAL
                </option>
              </select>


              {/* REQUIRED SKILL */}
              <select
                name="required_skill_id"
                value={form.required_skill_id}
                onChange={handleChange}
                required
              >
                <option value="">
                  SELECT REQUIRED SKILL
                </option>

                {SKILLS.map((skill) => (
                  <option
                    key={skill.id}
                    value={skill.id}
                  >
                    {skill.name}
                  </option>
                ))}
              </select>


              {/* SLA DEADLINE */}
              <input
                name="sla_deadline"
                type="datetime-local"
                value={form.sla_deadline}
                onChange={handleChange}
              />

            </div>


            {/* ISSUE */}
            <textarea
              name="issue_description"
              placeholder="DESCRIBE THE EQUIPMENT ISSUE..."
              value={form.issue_description}
              onChange={handleChange}
              required
              rows="5"
              style={{
                width: "100%",
                marginTop: "14px"
              }}
            />


            {/* SUBMIT */}
            <button
              type="submit"
              className="hm-button"
              style={{ marginTop: "14px" }}
            >
              CREATE REQUEST
            </button>

          </form>

        </div>

      )}


      {/* LIVE REQUEST BOARD */}
      <div
        className="hm-panel"
        style={{ marginTop: "14px" }}
      >

        <div className="hm-panel-header">

          <div>
            <span className="hm-panel-label">
              LIVE SERVICE BOARD
            </span>

            <h2>
              Active Requests
            </h2>
          </div>

        </div>


        {/* LOADING */}
        {loading && (
          <p>
            Loading service requests...
          </p>
        )}


        {/* EMPTY */}
        {!loading &&
          !error &&
          requests.length === 0 && (

            <div
              style={{
                padding: "35px",
                textAlign: "center",
                color: "#777"
              }}
            >
              NO SERVICE REQUESTS FOUND
            </div>

          )}


        {/* REQUESTS */}
        {!loading &&
          requests.map((request) => (

            <div
              className="hm-data-row"
              key={
                request.request_id ||
                request.id
              }
            >

              <div>
                <span className="hm-data-label">
                  REQUEST
                </span>

                <div className="hm-data-value">
                  #
                  {request.request_id ||
                    request.id ||
                    "—"}
                </div>
              </div>


              <div>
                <span className="hm-data-label">
                  MACHINE
                </span>

                <div className="hm-data-value">
                  {request.machine_name ||
                    request.machine_code ||
                    request.machine ||
                    `MACHINE ${
                      request.machine_id || "—"
                    }`}
                </div>
              </div>


              <div>
                <span className="hm-data-label">
                  PRIORITY
                </span>

                <div
                  className={`hm-data-value ${
                    String(
                      request.priority || ""
                    ).toLowerCase() ===
                    "critical"
                      ? "hm-risk"
                      : ""
                  }`}
                >
                  {request.priority ||
                    "NORMAL"}
                </div>
              </div>


              <div>
                <span className="hm-data-label">
                  STATUS
                </span>

                <span className="hm-status hm-good">
                  {request.status ||
                    "PENDING"}
                </span>
              </div>

            </div>

          ))}

      </div>

    </div>
  );
}

export default ServiceRequests;