USE dataquest_hivemind;


-- ============================================
-- DATAQUEST HIVEMIND
-- SAMPLE / DEMO DATA
-- ============================================


-- ============================================
-- SAMPLE USERS
-- ============================================

INSERT INTO users
(name, email, password_hash, role)
VALUES
('Admin User', 'admin@dataquest.com', 'demo_hash_001', 'Admin'),
('Site Manager', 'manager@dataquest.com', 'demo_hash_002', 'Manager'),
('Maintenance Coordinator', 'coordinator@dataquest.com', 'demo_hash_003', 'Coordinator'),
('Technician One', 'tech1@dataquest.com', 'demo_hash_004', 'Technician'),
('Technician Two', 'tech2@dataquest.com', 'demo_hash_005', 'Technician'),
('Technician Three', 'tech3@dataquest.com', 'demo_hash_006', 'Technician');


-- ============================================
-- SAMPLE SITES
-- ============================================

INSERT INTO sites
(site_name, address, city, latitude, longitude)
VALUES
('Site A', 'Industrial Area, Phase 1', 'Chennai', 13.0827000, 80.2707000),
('Site B', 'Manufacturing Zone, Sector 4', 'Bengaluru', 12.9716000, 77.5946000),
('Site C', 'Industrial Estate, Block 2', 'Hyderabad', 17.3850000, 78.4867000);


-- ============================================
-- SAMPLE MACHINES
-- ============================================

INSERT INTO machines
(machine_code, machine_name, machine_type, model, serial_number, status, site_id)
VALUES
('M-101', 'Hydraulic Press', 'Press', 'HP-500', 'SN-HP-001', 'Operational', 1),
('M-102', 'CNC Milling Machine', 'CNC', 'CM-200', 'SN-CM-002', 'Maintenance Required', 1),
('M-201', 'Industrial Compressor', 'Compressor', 'IC-300', 'SN-IC-003', 'Operational', 2),
('M-202', 'Assembly Robot', 'Robotics', 'AR-450', 'SN-AR-004', 'Operational', 2),
('M-301', 'Power Generator', 'Generator', 'PG-600', 'SN-PG-005', 'Operational', 3);


-- ============================================
-- SAMPLE TECHNICIANS
-- ============================================

INSERT INTO technicians
(user_id, phone, availability_status, latitude, longitude)
VALUES
(4, '9876500001', 'Available', 13.0827000, 80.2707000),
(5, '9876500002', 'Available', 12.9716000, 77.5946000),
(6, '9876500003', 'Busy', 17.3850000, 78.4867000);


-- ============================================
-- SAMPLE SKILLS
-- ============================================

INSERT INTO skills
(skill_name, description)
VALUES
('Electrical', 'Electrical systems and equipment maintenance'),
('Mechanical', 'Mechanical equipment maintenance and repair'),
('CNC', 'CNC machine operation and maintenance'),
('Robotics', 'Industrial robot maintenance and troubleshooting');


-- ============================================
-- TECHNICIAN SKILLS
-- ============================================

INSERT INTO technician_skills
(technician_id, skill_id, proficiency_level)
VALUES
(1, 1, 'Advanced'),
(1, 2, 'Advanced'),
(2, 2, 'Intermediate'),
(2, 3, 'Advanced'),
(3, 1, 'Intermediate'),
(3, 4, 'Advanced');


-- ============================================
-- SAMPLE SERVICE REQUESTS
-- ============================================

INSERT INTO service_requests
(machine_id, requested_by, issue_description, priority, status, required_skill_id, sla_deadline)
VALUES
(
    1,
    2,
    'Hydraulic pressure is dropping during operation.',
    'High',
    'Pending',
    2,
    '2026-10-08 18:00:00'
),
(
    2,
    3,
    'CNC machine is producing inaccurate cuts.',
    'Urgent',
    'Assigned',
    3,
    '2026-10-07 20:00:00'
),
(
    3,
    2,
    'Compressor is producing unusual vibration.',
    'Medium',
    'In Progress',
    2,
    '2026-10-09 18:00:00'
),
(
    4,
    3,
    'Assembly robot is showing a movement error.',
    'High',
    'Pending',
    4,
    '2026-10-08 16:00:00'
),
(
    5,
    2,
    'Generator requires routine electrical inspection.',
    'Low',
    'Pending',
    1,
    '2026-10-10 18:00:00'
);


-- ============================================
-- SAMPLE ASSIGNMENTS
-- ============================================

INSERT INTO assignments
(request_id, technician_id, assignment_status, notes)
VALUES
(1, 1, 'Assigned', 'Technician One assigned for hydraulic inspection.'),
(2, 2, 'Assigned', 'Technician Two assigned due to CNC expertise.'),
(3, 2, 'In Progress', 'Technician Two currently inspecting compressor.'),
(4, 3, 'Assigned', 'Technician Three assigned for robotics troubleshooting.');


-- ============================================
-- SAMPLE SPARE PARTS
-- ============================================

INSERT INTO spare_parts
(part_code, part_name, description, unit)
VALUES
('P-001', 'Hydraulic Filter', 'Replacement filter for hydraulic systems', 'Piece'),
('P-002', 'Hydraulic Oil', 'Industrial hydraulic oil', 'Litre'),
('P-003', 'Bearing 6205', 'Standard industrial bearing', 'Piece'),
('P-004', 'CNC Cutting Tool', 'Replacement cutting tool for CNC machines', 'Piece'),
('P-005', 'Electrical Fuse', 'Industrial electrical protection fuse', 'Piece'),
('P-006', 'Robot Sensor', 'Replacement proximity sensor for assembly robots', 'Piece');


-- ============================================
-- SAMPLE PART INVENTORY
-- ============================================

INSERT INTO part_inventory
(part_id, site_id, quantity_available, minimum_stock_level)
VALUES
(1, 1, 12, 5),
(2, 1, 40, 10),
(3, 1, 8, 4),
(4, 1, 15, 5),
(5, 1, 20, 8),
(6, 1, 3, 2),

(1, 2, 8, 5),
(2, 2, 25, 10),
(3, 2, 15, 5),
(4, 2, 20, 5),
(5, 2, 12, 5),
(6, 2, 6, 2),

(1, 3, 5, 3),
(2, 3, 18, 8),
(3, 3, 10, 4),
(4, 3, 8, 3),
(5, 3, 15, 5),
(6, 3, 4, 2);


-- ============================================
-- SAMPLE REQUEST PARTS
-- ============================================

INSERT INTO request_parts
(request_id, part_id, quantity_required, quantity_used)
VALUES
(1, 1, 2, 0),
(1, 2, 10, 0),
(2, 4, 2, 0),
(3, 3, 2, 1),
(4, 6, 1, 0),
(5, 5, 2, 0);
