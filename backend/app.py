from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime

from db.connection import get_db_connection


app = Flask(__name__)

# Allow the React frontend to communicate with Flask
CORS(app)


# =========================================================
# HOME
# =========================================================

@app.route("/")
def home():
    return jsonify({
        "message": "Backend is working!"
    })


# =========================================================
# BASIC API TEST
# =========================================================

@app.route("/api/test")
def test():
    return jsonify({
        "success": True,
        "message": "Hello from Python backend!"
    })


# =========================================================
# DATABASE HEALTH CHECK
# =========================================================

@app.route("/api/health/db")
def database_health():

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT 1")
        result = cursor.fetchone()

        cursor.close()
        conn.close()

        return jsonify({
            "success": True,
            "database": "connected",
            "test_result": result[0]
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "database": "connection failed",
            "error": str(e)
        }), 500


# =========================================================
# GET ALL SERVICE REQUESTS
# =========================================================

@app.route("/api/service-requests", methods=["GET"])
def get_service_requests():

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT
                request_id,
                machine_id,
                requested_by,
                issue_description,
                priority,
                status,
                required_skill_id,
                sla_deadline,
                created_at,
                updated_at
            FROM service_requests
            ORDER BY created_at DESC
        """)

        requests = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify({
            "success": True,
            "count": len(requests),
            "service_requests": requests
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# =========================================================
# CREATE SERVICE REQUEST
# =========================================================

@app.route("/api/service-requests", methods=["POST"])
def create_service_request():

    try:
        data = request.get_json() or {}

        machine_id = data.get("machine_id")
        requested_by = data.get("requested_by")
        issue_description = data.get("issue_description")
        priority = data.get("priority", "Medium")
        required_skill_id = data.get("required_skill_id")
        sla_deadline = data.get("sla_deadline")

        if not machine_id or not requested_by or not issue_description:

            return jsonify({
                "success": False,
                "message": (
                    "machine_id, requested_by, and "
                    "issue_description are required"
                )
            }), 400

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO service_requests (
                machine_id,
                requested_by,
                issue_description,
                priority,
                required_skill_id,
                sla_deadline
            )
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (
            machine_id,
            requested_by,
            issue_description,
            priority,
            required_skill_id,
            sla_deadline
        ))

        conn.commit()

        request_id = cursor.lastrowid

        cursor.close()
        conn.close()

        return jsonify({
            "success": True,
            "message": "Service request created successfully",
            "request_id": request_id
        }), 201

    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# =========================================================
# GET ALL MACHINES
# =========================================================

@app.route("/api/machines", methods=["GET"])
def get_machines():

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT
                m.machine_id,
                m.machine_code,
                m.machine_name,
                m.machine_type,
                m.model,
                m.serial_number,
                m.status,
                m.site_id,
                s.site_name,
                s.city,
                m.created_at
            FROM machines m
            JOIN sites s
                ON m.site_id = s.site_id
            ORDER BY m.machine_id
        """)

        machines = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify({
            "success": True,
            "count": len(machines),
            "machines": machines
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# =========================================================
# GET ALL TECHNICIANS
# =========================================================

@app.route("/api/technicians", methods=["GET"])
def get_technicians():

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT
                t.technician_id,
                t.user_id,
                u.name,
                u.email,
                u.role,
                t.phone,
                t.availability_status,
                t.latitude,
                t.longitude,
                t.created_at
            FROM technicians t
            JOIN users u
                ON t.user_id = u.user_id
            ORDER BY t.technician_id
        """)

        technicians = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify({
            "success": True,
            "count": len(technicians),
            "technicians": technicians
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# =========================================================
# FIND MATCHING TECHNICIANS
# =========================================================

@app.route(
    "/api/service-requests/<int:request_id>/matching-technicians",
    methods=["GET"]
)
def find_matching_technicians(request_id):

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT
                request_id,
                required_skill_id
            FROM service_requests
            WHERE request_id = %s
        """, (request_id,))

        service_request = cursor.fetchone()

        if not service_request:

            cursor.close()
            conn.close()

            return jsonify({
                "success": False,
                "message": "Service request not found"
            }), 404

        required_skill_id = service_request["required_skill_id"]

        if required_skill_id is None:

            cursor.close()
            conn.close()

            return jsonify({
                "success": True,
                "message": (
                    "No required skill specified "
                    "for this service request"
                ),
                "matching_technicians": []
            })

        cursor.execute("""
            SELECT
                t.technician_id,
                t.user_id,
                u.name,
                u.email,
                t.phone,
                t.availability_status,
                ts.skill_id,
                s.skill_name,
                ts.proficiency_level
            FROM technicians t
            JOIN users u
                ON t.user_id = u.user_id
            JOIN technician_skills ts
                ON t.technician_id = ts.technician_id
            JOIN skills s
                ON ts.skill_id = s.skill_id
            WHERE ts.skill_id = %s
              AND t.availability_status = 'Available'
            ORDER BY
                CASE ts.proficiency_level
                    WHEN 'Expert' THEN 1
                    WHEN 'Advanced' THEN 2
                    WHEN 'Intermediate' THEN 3
                    WHEN 'Beginner' THEN 4
                    ELSE 5
                END,
                t.technician_id
        """, (required_skill_id,))

        matching_technicians = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify({
            "success": True,
            "request_id": request_id,
            "required_skill_id": required_skill_id,
            "count": len(matching_technicians),
            "matching_technicians": matching_technicians
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# =========================================================
# ASSIGN TECHNICIAN
# =========================================================

@app.route(
    "/api/service-requests/<int:request_id>/assign",
    methods=["POST"]
)
def assign_technician(request_id):

    conn = None
    cursor = None

    try:
        data = request.get_json() or {}

        technician_id = data.get("technician_id")
        notes = data.get("notes")

        if not technician_id:

            return jsonify({
                "success": False,
                "message": "technician_id is required"
            }), 400

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Get service request
        cursor.execute("""
            SELECT
                request_id,
                required_skill_id,
                status
            FROM service_requests
            WHERE request_id = %s
        """, (request_id,))

        service_request = cursor.fetchone()

        if not service_request:

            return jsonify({
                "success": False,
                "message": "Service request not found"
            }), 404

        if service_request["status"] != "Pending":

            return jsonify({
                "success": False,
                "message": "Service request is not pending"
            }), 400

        # Get technician and check required skill
        cursor.execute("""
            SELECT
                t.technician_id,
                t.availability_status,
                ts.skill_id,
                ts.proficiency_level
            FROM technicians t
            LEFT JOIN technician_skills ts
                ON t.technician_id = ts.technician_id
                AND ts.skill_id = %s
            WHERE t.technician_id = %s
        """, (
            service_request["required_skill_id"],
            technician_id
        ))

        technician = cursor.fetchone()

        if not technician:

            return jsonify({
                "success": False,
                "message": "Technician not found"
            }), 404

        if technician["availability_status"] != "Available":

            return jsonify({
                "success": False,
                "message": "Technician is not available"
            }), 400

        if service_request["required_skill_id"] is not None:

            if technician["skill_id"] is None:

                return jsonify({
                    "success": False,
                    "message": (
                        "Technician does not have "
                        "the required skill"
                    )
                }), 400

        # Create assignment
        cursor.execute("""
            INSERT INTO assignments (
                request_id,
                technician_id,
                assignment_status,
                notes
            )
            VALUES (%s, %s, 'Assigned', %s)
        """, (
            request_id,
            technician_id,
            notes
        ))

        assignment_id = cursor.lastrowid

        # Update request
        cursor.execute("""
            UPDATE service_requests
            SET status = 'Assigned'
            WHERE request_id = %s
        """, (request_id,))

        # Update technician
        cursor.execute("""
            UPDATE technicians
            SET availability_status = 'Busy'
            WHERE technician_id = %s
        """, (technician_id,))

        conn.commit()

        return jsonify({
            "success": True,
            "message": "Technician assigned successfully",
            "assignment_id": assignment_id,
            "request_id": request_id,
            "technician_id": technician_id
        }), 201

    except Exception as e:

        if conn:
            conn.rollback()

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

    finally:

        if cursor:
            cursor.close()

        if conn:
            conn.close()


# =========================================================
# START ASSIGNMENT
# =========================================================

@app.route(
    "/api/assignments/<int:assignment_id>/start",
    methods=["POST"]
)
def start_assignment_work(assignment_id):

    conn = None
    cursor = None

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT
                assignment_id,
                request_id,
                technician_id,
                assignment_status
            FROM assignments
            WHERE assignment_id = %s
        """, (assignment_id,))

        assignment = cursor.fetchone()

        if not assignment:

            return jsonify({
                "success": False,
                "message": "Assignment not found"
            }), 404

        if assignment["assignment_status"] != "Assigned":

            return jsonify({
                "success": False,
                "message": (
                    "Assignment must be in Assigned "
                    "status to start work"
                )
            }), 400

        cursor.execute("""
            UPDATE assignments
            SET
                assignment_status = 'In Progress',
                work_started_at = CURRENT_TIMESTAMP
            WHERE assignment_id = %s
        """, (assignment_id,))

        cursor.execute("""
            UPDATE service_requests
            SET status = 'In Progress'
            WHERE request_id = %s
        """, (assignment["request_id"],))

        conn.commit()

        return jsonify({
            "success": True,
            "message": "Work started successfully",
            "assignment_id": assignment_id,
            "request_id": assignment["request_id"]
        })

    except Exception as e:

        if conn:
            conn.rollback()

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

    finally:

        if cursor:
            cursor.close()

        if conn:
            conn.close()


# =========================================================
# COMPLETE ASSIGNMENT
# =========================================================

@app.route(
    "/api/assignments/<int:assignment_id>/complete",
    methods=["POST"]
)
def complete_assignment_work(assignment_id):

    conn = None
    cursor = None

    try:
        data = request.get_json() or {}
        notes = data.get("notes")

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT
                assignment_id,
                request_id,
                technician_id,
                assignment_status
            FROM assignments
            WHERE assignment_id = %s
        """, (assignment_id,))

        assignment = cursor.fetchone()

        if not assignment:

            return jsonify({
                "success": False,
                "message": "Assignment not found"
            }), 404

        if assignment["assignment_status"] != "In Progress":

            return jsonify({
                "success": False,
                "message": (
                    "Assignment must be In Progress "
                    "to be completed"
                )
            }), 400

        cursor.execute("""
            UPDATE assignments
            SET
                assignment_status = 'Completed',
                work_completed_at = CURRENT_TIMESTAMP,
                notes = COALESCE(%s, notes)
            WHERE assignment_id = %s
        """, (
            notes,
            assignment_id
        ))

        cursor.execute("""
            UPDATE service_requests
            SET status = 'Completed'
            WHERE request_id = %s
        """, (assignment["request_id"],))

        cursor.execute("""
            UPDATE technicians
            SET availability_status = 'Available'
            WHERE technician_id = %s
        """, (assignment["technician_id"],))

        conn.commit()

        return jsonify({
            "success": True,
            "message": "Work completed successfully",
            "assignment_id": assignment_id,
            "request_id": assignment["request_id"]
        })

    except Exception as e:

        if conn:
            conn.rollback()

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

    finally:

        if cursor:
            cursor.close()

        if conn:
            conn.close()


# =========================================================
# SMART OPERATIONS FEATURES
# =========================================================


# =========================================================
# 1. SMART TECHNICIAN SCORE
# =========================================================

@app.route(
    "/api/technicians/<int:technician_id>/score",
    methods=["GET"]
)
def technician_score(technician_id):

    conn = None
    cursor = None

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Get technician information
        cursor.execute("""
            SELECT
                t.technician_id,
                t.availability_status
            FROM technicians t
            WHERE t.technician_id = %s
        """, (technician_id,))

        technician = cursor.fetchone()

        if not technician:

            return jsonify({
                "success": False,
                "message": "Technician not found"
            }), 404

        # Get technician skills
        cursor.execute("""
            SELECT
                ts.proficiency_level
            FROM technician_skills ts
            WHERE ts.technician_id = %s
        """, (technician_id,))

        skills = cursor.fetchall()

        # Convert proficiency into points
        proficiency_points = {
            "Expert": 50,
            "Advanced": 42,
            "Intermediate": 34,
            "Beginner": 25
        }

        if skills:
            skill_score = max(
                proficiency_points.get(
                    skill["proficiency_level"],
                    20
                )
                for skill in skills
            )
        else:
            skill_score = 10

        # Get current workload
        cursor.execute("""
            SELECT COUNT(*) AS active_jobs
            FROM assignments
            WHERE technician_id = %s
            AND assignment_status IN ('Assigned', 'In Progress')
        """, (technician_id,))

        workload = cursor.fetchone()
        active_jobs = workload["active_jobs"]

        # Availability score
        if technician["availability_status"] == "Available":
            availability_score = 30
        else:
            availability_score = 10

        # Workload score
        if active_jobs == 0:
            workload_score = 20
        elif active_jobs == 1:
            workload_score = 15
        elif active_jobs == 2:
            workload_score = 8
        else:
            workload_score = 3

        total_score = min(
            100,
            skill_score +
            availability_score +
            workload_score
        )

        if total_score >= 85:
            rating = "Excellent"
        elif total_score >= 70:
            rating = "Good"
        elif total_score >= 50:
            rating = "Moderate"
        else:
            rating = "Low"

        return jsonify({
            "success": True,
            "technician_id": technician_id,
            "smart_score": total_score,
            "rating": rating,
            "skill_score": skill_score,
            "availability_score": availability_score,
            "workload_score": workload_score,
            "active_jobs": active_jobs,
            "availability_status": technician["availability_status"]
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

    finally:

        if cursor:
            cursor.close()

        if conn:
            conn.close()


# =========================================================
# 2. MACHINE HEALTH SCORE
# =========================================================

@app.route(
    "/api/machines/<int:machine_id>/health",
    methods=["GET"]
)
def machine_health(machine_id):

    conn = None
    cursor = None

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Get machine
        cursor.execute("""
            SELECT
                machine_id,
                machine_code,
                machine_name,
                machine_type,
                status
            FROM machines
            WHERE machine_id = %s
        """, (machine_id,))

        machine = cursor.fetchone()

        if not machine:

            return jsonify({
                "success": False,
                "message": "Machine not found"
            }), 404

        # Count unresolved service requests
        cursor.execute("""
            SELECT
                COUNT(*) AS active_requests,
                SUM(
                    CASE
                        WHEN priority = 'Urgent' THEN 1
                        ELSE 0
                    END
                ) AS urgent_requests,
                SUM(
                    CASE
                        WHEN priority = 'High' THEN 1
                        ELSE 0
                    END
                ) AS high_requests
            FROM service_requests
            WHERE machine_id = %s
            AND status != 'Completed'
        """, (machine_id,))

        issues = cursor.fetchone()

        active_requests = issues["active_requests"] or 0
        urgent_requests = issues["urgent_requests"] or 0
        high_requests = issues["high_requests"] or 0

        # Start with a healthy machine
        health_score = 100

        # Machine status impact
        status_penalties = {
            "Operational": 0,
            "Maintenance": 15,
            "Breakdown": 60,
            "Offline": 70
        }

        health_score -= status_penalties.get(
            machine["status"],
            20
        )

        # Active issue impact
        health_score -= active_requests * 8
        health_score -= urgent_requests * 15
        health_score -= high_requests * 7

        health_score = max(
            0,
            min(100, health_score)
        )

        if health_score >= 85:
            health_status = "Healthy"
        elif health_score >= 65:
            health_status = "Warning"
        elif health_score >= 40:
            health_status = "At Risk"
        else:
            health_status = "Critical"

        return jsonify({
            "success": True,
            "machine_id": machine_id,
            "machine_code": machine["machine_code"],
            "machine_name": machine["machine_name"],
            "machine_type": machine["machine_type"],
            "machine_status": machine["status"],
            "health_score": health_score,
            "health_status": health_status,
            "active_requests": active_requests,
            "urgent_requests": urgent_requests,
            "high_requests": high_requests
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

    finally:

        if cursor:
            cursor.close()

        if conn:
            conn.close()


# =========================================================
# 3. SPARE PARTS READINESS
# =========================================================

@app.route(
    "/api/service-requests/<int:request_id>/parts-readiness",
    methods=["GET"]
)
def parts_readiness(request_id):

    conn = None
    cursor = None

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Check whether the service request exists
        cursor.execute("""
            SELECT request_id
            FROM service_requests
            WHERE request_id = %s
        """, (request_id,))

        service_request = cursor.fetchone()

        if not service_request:
            return jsonify({
                "success": False,
                "message": "Service request not found"
            }), 404

        # Get all required parts and available inventory
        cursor.execute("""
            SELECT
                rp.part_id,
                sp.part_code,
                sp.part_name,
                rp.quantity_required,
                COALESCE(SUM(pi.quantity_available), 0) AS quantity_available
            FROM request_parts rp

            JOIN spare_parts sp
                ON rp.part_id = sp.part_id

            LEFT JOIN part_inventory pi
                ON rp.part_id = pi.part_id

            WHERE rp.request_id = %s

            GROUP BY
                rp.part_id,
                sp.part_code,
                sp.part_name,
                rp.quantity_required

            ORDER BY rp.part_id
        """, (request_id,))

        parts = cursor.fetchall()

        # No parts required
        if not parts:
            return jsonify({
                "success": True,
                "request_id": request_id,
                "readiness_score": 100,
                "readiness_status": "No Parts Required",
                "total_parts": 0,
                "ready_parts": 0,
                "parts": []
            })

        ready_parts = 0
        total_parts = len(parts)

        formatted_parts = []

        for part in parts:

            required = part["quantity_required"]
            available = part["quantity_available"]

            if available >= required:
                status = "Ready"
                ready_parts += 1

            elif available > 0:
                status = "Partially Ready"

            else:
                status = "Not Ready"

            formatted_parts.append({
                "part_id": part["part_id"],
                "part_code": part["part_code"],
                "part_name": part["part_name"],
                "quantity_required": required,
                "quantity_available": available,
                "status": status
            })

        readiness_score = round(
            (ready_parts / total_parts) * 100
        )

        if readiness_score == 100:
            readiness_status = "Ready"

        elif readiness_score >= 75:
            readiness_status = "Mostly Ready"

        elif readiness_score > 0:
            readiness_status = "Partially Ready"

        else:
            readiness_status = "Not Ready"

        return jsonify({
            "success": True,
            "request_id": request_id,
            "readiness_score": readiness_score,
            "readiness_status": readiness_status,
            "total_parts": total_parts,
            "ready_parts": ready_parts,
            "parts": formatted_parts
        })

    except Exception as e:

        if conn:
            conn.rollback()

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

    finally:

        if cursor:
            cursor.close()

        if conn:
            conn.close()

# =========================================================
# 4. SLA RISK
# =========================================================

@app.route(
    "/api/service-requests/<int:request_id>/sla-risk",
    methods=["GET"]
)
def sla_risk(request_id):

    conn = None
    cursor = None

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT
                request_id,
                priority,
                status,
                sla_deadline,
                created_at
            FROM service_requests
            WHERE request_id = %s
        """, (request_id,))

        service_request = cursor.fetchone()

        if not service_request:

            return jsonify({
                "success": False,
                "message": "Service request not found"
            }), 404

        # Completed requests are resolved
        if service_request["status"] == "Completed":

            return jsonify({
                "success": True,
                "request_id": request_id,
                "risk_score": 0,
                "risk_level": "Resolved",
                "minutes_remaining": 0,
                "sla_deadline": service_request["sla_deadline"]
            })

        deadline = service_request["sla_deadline"]

        # No SLA deadline
        if deadline is None:

            return jsonify({
                "success": True,
                "request_id": request_id,
                "risk_score": 0,
                "risk_level": "No SLA Defined",
                "minutes_remaining": None,
                "sla_deadline": None
            })

        now = datetime.now()

        seconds_remaining = (
            deadline - now
        ).total_seconds()

        minutes_remaining = round(
            seconds_remaining / 60
        )

        # Calculate SLA risk
        if minutes_remaining <= 0:

            risk_score = 100
            risk_level = "Breached"

        elif minutes_remaining <= 30:

            risk_score = 90
            risk_level = "Critical"

        elif minutes_remaining <= 60:

            risk_score = 75
            risk_level = "High"

        elif minutes_remaining <= 120:

            risk_score = 50
            risk_level = "Medium"

        else:

            risk_score = 20
            risk_level = "Low"

        # Urgent requests are more risky
        if service_request["priority"] == "Urgent":
            risk_score = min(
                100,
                risk_score + 10
            )

        return jsonify({
            "success": True,
            "request_id": request_id,
            "priority": service_request["priority"],
            "status": service_request["status"],
            "risk_score": risk_score,
            "risk_level": risk_level,
            "minutes_remaining": minutes_remaining,
            "sla_deadline": service_request["sla_deadline"]
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

    finally:

        if cursor:
            cursor.close()

        if conn:
            conn.close()


# =========================================================
# 5. DOWNTIME IMPACT
# =========================================================

@app.route(
    "/api/machines/<int:machine_id>/downtime-impact",
    methods=["GET"]
)
def downtime_impact(machine_id):

    conn = None
    cursor = None

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Get machine
        cursor.execute("""
            SELECT
                machine_id,
                machine_code,
                machine_name,
                machine_type,
                status
            FROM machines
            WHERE machine_id = %s
        """, (machine_id,))

        machine = cursor.fetchone()

        if not machine:

            return jsonify({
                "success": False,
                "message": "Machine not found"
            }), 404

        # Get active requests and highest priority
        cursor.execute("""
            SELECT
                COUNT(*) AS active_requests,
                MAX(
                    CASE
                        WHEN priority = 'Urgent' THEN 4
                        WHEN priority = 'High' THEN 3
                        WHEN priority = 'Medium' THEN 2
                        ELSE 1
                    END
                ) AS highest_priority
            FROM service_requests
            WHERE machine_id = %s
            AND status != 'Completed'
        """, (machine_id,))

        data = cursor.fetchone()

        active_requests = data["active_requests"] or 0
        highest_priority = data["highest_priority"] or 1

        # Demo estimated hourly impact by machine type.
        # These can later be replaced with actual
        # machine-specific business data.
        machine_type_rates = {
            "Hydraulic": 12000,
            "CNC": 18000,
            "Compressor": 10000,
            "Robot": 20000,
            "Generator": 15000
        }

        hourly_rate = machine_type_rates.get(
            machine["machine_type"],
            10000
        )

        priority_multiplier = {
            1: 1.0,
            2: 1.15,
            3: 1.35,
            4: 1.60
        }

        multiplier = priority_multiplier.get(
            highest_priority,
            1.0
        )

        # Demo downtime estimate
        estimated_downtime_hours = min(
            24,
            max(1, active_requests * 2)
        )

        estimated_impact = round(
            hourly_rate *
            estimated_downtime_hours *
            multiplier
        )

        if machine["status"] == "Operational":
            impact_level = "Low"
        elif machine["status"] == "Maintenance":
            impact_level = "Medium"
        elif machine["status"] == "Breakdown":
            impact_level = "Critical"
        else:
            impact_level = "High"

        return jsonify({
            "success": True,
            "machine_id": machine_id,
            "machine_code": machine["machine_code"],
            "machine_name": machine["machine_name"],
            "machine_type": machine["machine_type"],
            "machine_status": machine["status"],
            "active_requests": active_requests,
            "estimated_downtime_hours": estimated_downtime_hours,
            "estimated_hourly_impact": hourly_rate,
            "estimated_downtime_impact": estimated_impact,
            "impact_level": impact_level,
            "currency": "INR"
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

    finally:

        if cursor:
            cursor.close()

        if conn:
            conn.close()


# =========================================================
# RUN FLASK
# =========================================================

if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )