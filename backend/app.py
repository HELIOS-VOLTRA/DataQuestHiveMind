from flask import Flask, jsonify, request
from db.connection import get_db_connection

app = Flask(__name__)


# --------------------------------
# HOME
# --------------------------------
@app.route("/")
def home():
    return jsonify({
        "message": "Backend is working!"
    })


# --------------------------------
# TEST API
# --------------------------------
@app.route("/api/test")
def test():
    return jsonify({
        "success": True,
        "message": "Hello from Python backend!"
    })


# --------------------------------
# DATABASE HEALTH CHECK
# --------------------------------
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


# --------------------------------
# GET ALL SERVICE REQUESTS
# --------------------------------
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


# --------------------------------
# CREATE SERVICE REQUEST
# --------------------------------
@app.route("/api/service-requests", methods=["POST"])
def create_service_request():
    try:
        data = request.get_json()

        machine_id = data.get("machine_id")
        requested_by = data.get("requested_by")
        issue_description = data.get("issue_description")
        priority = data.get("priority", "Medium")
        required_skill_id = data.get("required_skill_id")
        sla_deadline = data.get("sla_deadline")

        # Validate required fields
        if not machine_id or not requested_by or not issue_description:
            return jsonify({
                "success": False,
                "message": "machine_id, requested_by, and issue_description are required"
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


# --------------------------------
# START SERVER
# --------------------------------
# --------------------------------
# GET ALL MACHINES
# --------------------------------
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
            JOIN sites s ON m.site_id = s.site_id
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

# --------------------------------
# GET ALL TECHNICIANS
# --------------------------------
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
            JOIN users u ON t.user_id = u.user_id
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
# --------------------------------
# FIND MATCHING TECHNICIANS
# --------------------------------
@app.route("/api/service-requests/<int:request_id>/matching-technicians", methods=["GET"])
def find_matching_technicians(request_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Find the required skill for this service request
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
                "message": "No required skill specified for this service request",
                "matching_technicians": []
            })

        # Find available technicians with the required skill
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
# --------------------------------
# ASSIGN TECHNICIAN TO SERVICE REQUEST
# --------------------------------
@app.route("/api/service-requests/<int:request_id>/assign", methods=["POST"])
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

        # 1. Check service request
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

        # 2. Check technician and required skill
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
                    "message": "Technician does not have the required skill"
                }), 400

        # 3. Create assignment
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

        # 4. Update service request status
        cursor.execute("""
            UPDATE service_requests
            SET status = 'Assigned'
            WHERE request_id = %s
        """, (request_id,))

        # 5. Update technician availability
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
# --------------------------------
# START WORK ON ASSIGNMENT
# --------------------------------
@app.route("/api/assignments/<int:assignment_id>/start", methods=["POST"])
def start_assignment_work(assignment_id):
    conn = None
    cursor = None

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Check assignment
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
                "message": "Assignment must be in Assigned status to start work"
            }), 400

        # Update assignment
        cursor.execute("""
            UPDATE assignments
            SET
                assignment_status = 'In Progress',
                work_started_at = CURRENT_TIMESTAMP
            WHERE assignment_id = %s
        """, (assignment_id,))

        # Update service request
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
# --------------------------------
# COMPLETE WORK ON ASSIGNMENT
# --------------------------------
@app.route("/api/assignments/<int:assignment_id>/complete", methods=["POST"])
def complete_assignment_work(assignment_id):
    conn = None
    cursor = None

    try:
        data = request.get_json() or {}
        notes = data.get("notes")

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Check assignment
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
                "message": "Assignment must be In Progress to be completed"
            }), 400

        # Complete assignment
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

        # Update service request
        cursor.execute("""
            UPDATE service_requests
            SET status = 'Completed'
            WHERE request_id = %s
        """, (assignment["request_id"],))

        # Make technician available again
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

if __name__ == "__main__":
    app.run(debug=True)