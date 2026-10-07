USE dataquest_hivemind;


-- ============================================
-- ADDITIONAL USERS
-- ============================================

INSERT INTO users
(name, email, password_hash, role)
VALUES
('Operations Manager', 'ops@dataquest.com', 'demo_hash_007', 'Manager'),
('Maintenance Engineer', 'engineer1@dataquest.com', 'demo_hash_008', 'Engineer'),
('Maintenance Engineer Two', 'engineer2@dataquest.com', 'demo_hash_009', 'Engineer'),
('Site Supervisor A', 'supervisor.a@dataquest.com', 'demo_hash_010', 'Supervisor'),
('Site Supervisor B', 'supervisor.b@dataquest.com', 'demo_hash_011', 'Supervisor'),
('Site Supervisor C', 'supervisor.c@dataquest.com', 'demo_hash_012', 'Supervisor'),
('Technician Four', 'tech4@dataquest.com', 'demo_hash_013', 'Technician'),
('Technician Five', 'tech5@dataquest.com', 'demo_hash_014', 'Technician');


-- ============================================
-- ADDITIONAL SITES
-- ============================================

INSERT INTO sites
(site_name, address, city, latitude, longitude)
VALUES
('Site D', 'Industrial Corridor, Phase 2', 'Pune', 18.5204000, 73.8567000),
('Site E', 'Manufacturing Park, Sector 8', 'Mumbai', 19.0760000, 72.8777000),
('Site F', 'Industrial Estate, Block 5', 'Coimbatore', 11.0168000, 76.9558000);


-- ============================================
-- ADDITIONAL MACHINES
-- ============================================

INSERT INTO machines
(machine_code, machine_name, machine_type, model, serial_number, status, site_id)
VALUES
('M-103', 'Hydraulic Pump', 'Hydraulic', 'HP-700', 'SN-HP-006', 'Operational', 1),
('M-104', 'Lathe Machine', 'CNC', 'LM-300', 'SN-LM-007', 'Maintenance Required', 1),
('M-203', 'Air Compressor', 'Compressor', 'AC-450', 'SN-AC-008', 'Operational', 2),
('M-204', 'Welding Robot', 'Robotics', 'WR-500', 'SN-WR-009', 'Under Maintenance', 2),
('M-302', 'Diesel Generator', 'Generator', 'DG-800', 'SN-DG-010', 'Operational', 3),
('M-303', 'Control Panel', 'Electrical', 'CP-220', 'SN-CP-011', 'Operational', 3),
('M-401', 'Hydraulic Cutter', 'Hydraulic', 'HC-250', 'SN-HC-012', 'Operational', 4),
('M-402', 'Industrial Mixer', 'Mechanical', 'IM-600', 'SN-IM-013', 'Maintenance Required', 4),
('M-501', 'Packaging Machine', 'Automation', 'PM-400', 'SN-PM-014', 'Operational', 5),
('M-601', 'Conveyor System', 'Mechanical', 'CS-900', 'SN-CS-015', 'Operational', 6);


-- ============================================
-- ADDITIONAL TECHNICIANS
-- ============================================

INSERT INTO technicians
(user_id, phone, availability_status, latitude, longitude)
VALUES
(13, '9876500004', 'Available', 18.5204000, 73.8567000),
(14, '9876500005', 'Available', 19.0760000, 72.8777000);


-- ============================================
-- ADDITIONAL SKILLS
-- ============================================

INSERT INTO skills
(skill_name, description)
VALUES
('Hydraulics', 'Hydraulic systems maintenance and troubleshooting'),
('Automation', 'Industrial automation systems and controls'),
('Welding', 'Industrial welding equipment and maintenance'),
('Instrumentation', 'Industrial measurement and control instruments');


-- ============================================
-- ADDITIONAL TECHNICIAN SKILLS
-- ============================================

INSERT INTO technician_skills
(technician_id, skill_id, proficiency_level)
VALUES
(4, 2, 'Advanced'),
(4, 5, 'Advanced'),
(4, 6, 'Intermediate'),

(5, 3, 'Intermediate'),
(5, 6, 'Advanced'),
(5, 7, 'Advanced');


-- ============================================
-- ADDITIONAL SERVICE REQUESTS
-- ============================================

INSERT INTO service_requests
(machine_id, requested_by, issue_description, priority, status, required_skill_id, sla_deadline)
VALUES
(
    6,
    10,
    'Hydraulic pump is showing reduced pressure.',
    'High',
    'Pending',
    5,
    '2026-10-08 14:00:00'
),
(
    7,
    11,
    'Lathe machine requires calibration.',
    'Medium',
    'Pending',
    3,
    '2026-10-09 16:00:00'
),
(
    8,
    10,
    'Compressor temperature is higher than normal.',
    'Urgent',
    'Assigned',
    2,
    '2026-10-07 18:00:00'
),
(
    9,
    11,
    'Welding robot has stopped responding to commands.',
    'High',
    'In Progress',
    7,
    '2026-10-08 12:00:00'
),
(
    10,
    12,
    'Generator battery requires inspection.',
    'Medium',
    'Pending',
    1,
    '2026-10-10 15:00:00'
),
(
    11,
    10,
    'Control panel is showing intermittent alarms.',
    'Urgent',
    'Pending',
    1,
    '2026-10-07 17:00:00'
),
(
    12,
    13,
    'Hydraulic cutter requires routine maintenance.',
    'Low',
    'Completed',
    5,
    '2026-10-12 18:00:00'
),
(
    13,
    14,
    'Industrial mixer is producing abnormal vibration.',
    'High',
    'Assigned',
    2,
    '2026-10-08 19:00:00'
),
(
    14,
    10,
    'Packaging machine sensor is not detecting products.',
    'High',
    'Pending',
    6,
    '2026-10-09 13:00:00'
),
(
    15,
    11,
    'Conveyor belt motor requires inspection.',
    'Medium',
    'In Progress',
    2,
    '2026-10-09 20:00:00'
);


-- ============================================
-- ADDITIONAL ASSIGNMENTS
-- ============================================

INSERT INTO assignments
(request_id, technician_id, assignment_status, notes)
VALUES
(6, 4, 'Assigned', 'Technician Four assigned for hydraulic inspection.'),
(7, 2, 'Assigned', 'Technician Two assigned for machine calibration.'),
(8, 5, 'Assigned', 'Technician Five assigned for compressor inspection.'),
(9, 3, 'In Progress', 'Technician Three troubleshooting welding robot.'),
(10, 1, 'Assigned', 'Technician One assigned for generator inspection.'),
(11, 1, 'Assigned', 'Electrical technician assigned for control panel.'),
(12, 4, 'Completed', 'Routine hydraulic maintenance completed.'),
(13, 5, 'Assigned', 'Technician Five assigned for mixer inspection.'),
(14, 4, 'Assigned', 'Automation technician assigned for packaging machine.'),
(15, 2, 'In Progress', 'Technician Two inspecting conveyor motor.');


-- ============================================
-- ADDITIONAL SPARE PARTS
-- ============================================

INSERT INTO spare_parts
(part_code, part_name, description, unit)
VALUES
('P-007', 'Hydraulic Seal Kit', 'Replacement seals for hydraulic systems', 'Kit'),
('P-008', 'Pressure Sensor', 'Industrial hydraulic pressure sensor', 'Piece'),
('P-009', 'Motor Coupling', 'Replacement coupling for industrial motors', 'Piece'),
('P-010', 'Temperature Sensor', 'Industrial temperature monitoring sensor', 'Piece'),
('P-011', 'Robot Controller Cable', 'Replacement cable for robot controller', 'Piece'),
('P-012', 'Conveyor Belt', 'Replacement industrial conveyor belt', 'Metre');


-- ============================================
-- ADDITIONAL PART INVENTORY
-- ============================================

INSERT INTO part_inventory
(part_id, site_id, quantity_available, minimum_stock_level)
VALUES

(7, 1, 10, 3),
(8, 1, 14, 5),
(9, 1, 8, 3),
(10, 1, 12, 4),
(11, 1, 6, 2),
(12, 1, 30, 10),

(7, 2, 8, 3),
(8, 2, 10, 4),
(9, 2, 12, 4),
(10, 2, 15, 5),
(11, 2, 8, 3),
(12, 2, 25, 10),

(7, 3, 6, 2),
(8, 3, 9, 3),
(9, 3, 10, 4),
(10, 3, 11, 4),
(11, 3, 5, 2),
(12, 3, 20, 8),

(7, 4, 15, 5),
(8, 4, 20, 5),
(9, 4, 10, 3),
(10, 4, 15, 5),
(11, 4, 7, 2),
(12, 4, 40, 12),

(7, 5, 5, 2),
(8, 5, 12, 4),
(9, 5, 9, 3),
(10, 5, 14, 4),
(11, 5, 6, 2),
(12, 5, 18, 8),

(7, 6, 7, 2),
(8, 6, 11, 4),
(9, 6, 13, 4),
(10, 6, 16, 5),
(11, 6, 9, 3),
(12, 6, 22, 8);


-- ============================================
-- ADDITIONAL REQUEST PARTS
-- ============================================

INSERT INTO request_parts
(request_id, part_id, quantity_required, quantity_used)
VALUES
(6, 7, 2, 0),
(6, 8, 1, 0),
(7, 9, 1, 0),
(8, 10, 2, 0),
(9, 11, 1, 0),
(10, 8, 1, 0),
(11, 10, 2, 0),
(12, 7, 1, 1),
(13, 9, 2, 0),
(14, 11, 1, 0),
(15, 12, 3, 1);
