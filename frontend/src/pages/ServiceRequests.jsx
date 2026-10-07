import { useEffect, useState } from "react";
import "./HiveMindPage.css";


const API_BASE =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";


function ServiceRequests() {

  const [requests, setRequests] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [showForm, setShowForm] =
    useState(false);

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

      if (!response.ok) {
        throw new Error(
          "Unable to load service requests"
        );
      }

      const data = await response.json();

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

    setForm({
      ...form,
      [event.target.name]:
        event.target.value
    });

  };


  const createRequest = async (event) => {

    event.preventDefault();

    try {

      const response = await fetch(
        `${API_BASE}/api/service-requests`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            machine_id:
              form.machine_id
                ? Number(form.machine_id)
                : null,

            requested_by:
              form.requested_by
                ? Number(form.requested_by)
                : null,

            issue_description:
              form.issue_description,

            priority:
              form.priority,

            required_skill_id:
              form.required_skill_id
                ? Number(form.required_skill_id)
                : null,

            sla_deadline:
              form.sla_deadline || null
          })
        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.error ||
          data.message ||
          "Failed to create request"
        );

      }


      setShowForm(false);

      setForm({
        machine_id: "",
        requested_by: "",
        issue_description: "",
        priority: "Medium",
        required_skill_id: "",
        sla_deadline: ""
      });


      await loadRequests();

    } catch (err) {

      setError(err.message);

    }

  };


  return (

    <div className="hm-page">

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
          onClick={() =>
            setShowForm(!showForm)
          }
        >
          {showForm
            ? "CLOSE FORM"
            : "+ CREATE REQUEST"}
        </button>

      </div>


      <div className="hm-grid hm-grid-4">

        <div className="hm-metric">

          <span className="hm-metric-label">
            OPEN
          </span>

          <strong className="hm-metric-value">
            {requests.length}
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
            {
              requests.filter(
                (item) =>
                  String(
                    item.priority || ""
                  ).toLowerCase() ===
                  "critical"
              ).length
            }
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
            {
              requests.filter(
                (item) =>
                  item.technician_id ||
                  item.assigned_technician_id
              ).length
            }
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
            {
              requests.filter(
                (item) =>
                  String(
                    item.status || ""
                  ).toLowerCase() ===
                  "pending"
              ).length
            }
          </strong>

          <span className="hm-metric-note">
            Awaiting action
          </span>

        </div>

      </div>


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

              <input
                name="machine_id"
                type="number"
                placeholder="MACHINE ID"
                value={form.machine_id}
                onChange={handleChange}
                required
              />


              <input
                name="requested_by"
                type="number"
                placeholder="REQUESTED BY USER ID"
                value={form.requested_by}
                onChange={handleChange}
                required
              />


              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
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


              <input
                name="required_skill_id"
                type="number"
                placeholder="REQUIRED SKILL ID"
                value={form.required_skill_id}
                onChange={handleChange}
              />


              <input
                name="sla_deadline"
                type="datetime-local"
                value={form.sla_deadline}
                onChange={handleChange}
              />

            </div>


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


        {loading && (

          <p>
            Loading service requests...
          </p>

        )}


        {error && (

          <div
            style={{
              padding: "16px",
              border: "1px solid #ff4d4d",
              color: "#ff4d4d",
              marginBottom: "16px"
            }}
          >
            {error}
          </div>

        )}


        {!loading &&
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


        {requests.map((request) => (

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
                {
                  request.machine_name ||
                  request.machine_code ||
                  request.machine ||
                  `MACHINE ${
                    request.machine_id ||
                    "—"
                  }`
                }
              </div>

            </div>


            <div>

              <span className="hm-data-label">
                PRIORITY
              </span>

              <div
                className={`hm-data-value ${
                  String(
                    request.priority ||
                    ""
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
                {
                  request.status ||
                  "PENDING"
                }
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}


export default ServiceRequests;