USE dataquest_hivemind;


-- ============================================
-- MORE USERS
-- ============================================

INSERT INTO users
(name, email, password_hash, role)
VALUES
('Technician Six', 'tech6@dataquest.com', 'demo_hash_015', 'Technician'),
('Technician Seven', 'tech7@dataquest.com', 'demo_hash_016', 'Technician'),
('Technician Eight', 'tech8@dataquest.com', 'demo_hash_017', 'Technician'),
('Technician Nine', 'tech9@dataquest.com', 'demo_hash_018', 'Technician'),
('Technician Ten', 'tech10@dataquest.com', 'demo_hash_019', 'Technician'),
('Regional Manager', 'regional.manager@dataquest.com', 'demo_hash_020', 'Manager'),
('Inventory Manager', 'inventory@dataquest.com', 'demo_hash_021', 'Manager'),
('Service Coordinator', 'service.coordinator@dataquest.com', 'demo_hash_022', 'Coordinator'),
('Quality Engineer', 'quality@dataquest.com', 'demo_hash_023', 'Engineer'),
('Safety Officer', 'safety@dataquest.com', 'demo_hash_024', 'Supervisor');


-- ============================================
-- MORE SITES
-- ============================================

INSERT INTO sites
(site_name, address, city, latitude, longitude)
VALUES
('Site G', 'Industrial Park, Phase 3', 'Ahmedabad', 23.0225000, 72.5714000),
('Site H', 'Engineering Estate, Sector 6', 'Kochi', 9.9312000, 76.2673000),
('Site I', 'Manufacturing Hub, Block 7', 'Visakhapatnam', 17.6868000, 83.2185000),
('Site J', 'Industrial Zone, Phase 5', 'Jaipur', 26.9124000, 75.7873000);


-- ============================================
-- MORE MACHINES
-- ============================================

INSERT INTO machines
(machine_code, machine_name, machine_type, model, serial_number, status, site_id)
VALUES
('M-701', 'CNC Turning Center', 'CNC', 'TC-800', 'SN-TC-016', 'Operational',
    (SELECT site_id FROM sites WHERE site_name = 'Site G')),

('M-702', 'Industrial Boiler', 'Boiler', 'IB-900', 'SN-IB-017', 'Maintenance Required',
    (SELECT site_id FROM sites WHERE site_name = 'Site G')),

('M-801', 'Hydraulic Lift', 'Hydraulic', 'HL-350', 'SN-HL-018', 'Operational',
    (SELECT site_id FROM sites WHERE site_name = 'Site H')),

('M-802', 'Packaging Robot', 'Robotics', 'PR-700', 'SN-PR-019', 'Under Maintenance',
    (SELECT site_id FROM sites WHERE site_name = 'Site H')),

('M-901', 'Industrial Furnace', 'Thermal', 'IF-1000', 'SN-IF-020', 'Operational',
    (SELECT site_id FROM sites WHERE site_name = 'Site I')),

('M-902', 'Cooling System', 'Cooling', 'CS-500', 'SN-CS-021', 'Operational',
    (SELECT site_id FROM sites WHERE site_name = 'Site I')),

('M-A01', 'Assembly Line', 'Automation', 'AL-600', 'SN-AL-022', 'Maintenance Required',
    (SELECT site_id FROM sites WHERE site_name = 'Site J')),

('M-A02', 'Industrial Drill', 'Mechanical', 'ID-400', 'SN-ID-023', 'Operational',
    (SELECT site_id FROM sites WHERE site_name = 'Site J')),

('M-A03', 'Power Distribution Unit', 'Electrical', 'PDU-300', 'SN-PDU-024', 'Operational',
    (SELECT site_id FROM sites WHERE site_name = 'Site G')),

('M-A04', 'Material Handling Robot', 'Robotics', 'MHR-850', 'SN-MHR-025', 'Operational',
    (SELECT site_id FROM sites WHERE site_name = 'Site H'));


-- ============================================
-- MORE TECHNICIANS
-- ============================================

INSERT INTO technicians
(user_id, phone, availability_status, latitude, longitude)
VALUES
(
    (SELECT user_id FROM users WHERE email = 'tech6@dataquest.com'),
    '9876500006',
    'Available',
    23.0225000,
    72.5714000
),
(
    (SELECT user_id FROM users WHERE email = 'tech7@dataquest.com'),
    '9876500007',
    'Busy',
    9.9312000,
    76.2673000
),
(
    (SELECT user_id FROM users WHERE email = 'tech8@dataquest.com'),
    '9876500008',
    'Available',
    17.6868000,
    83.2185000
),
(
    (SELECT user_id FROM users WHERE email = 'tech9@dataquest.com'),
    '9876500009',
    'On Leave',
    26.9124000,
    75.7873000
),
(
    (SELECT user_id FROM users WHERE email = 'tech10@dataquest.com'),
    '9876500010',
    'Available',
    23.0225000,
    72.5714000
);


-- ============================================
-- MORE SKILLS
-- ============================================

INSERT INTO skills
(skill_name, description)
VALUES
('Boiler Maintenance', 'Industrial boiler inspection and maintenance'),
('Thermal Systems', 'Industrial furnace and thermal equipment maintenance'),
('Cooling Systems', 'Industrial cooling and temperature control systems'),
('Material Handling', 'Industrial material handling equipment and systems');


-- ============================================
-- MORE TECHNICIAN SKILLS
-- ============================================

INSERT INTO technician_skills
(technician_id, skill_id, proficiency_level)
VALUES
(
    (SELECT technician_id FROM technicians
     WHERE user_id = (SELECT user_id FROM users WHERE email = 'tech6@dataquest.com')),
    (SELECT skill_id FROM skills WHERE skill_name = 'CNC'),
    'Advanced'
),
(
    (SELECT technician_id FROM technicians
     WHERE user_id = (SELECT user_id FROM users WHERE email = 'tech6@dataquest.com')),
    (SELECT skill_id FROM skills WHERE skill_name = 'Mechanical'),
    'Advanced'
),
(
    (SELECT technician_id FROM technicians
     WHERE user_id = (SELECT user_id FROM users WHERE email = 'tech7@dataquest.com')),
    (SELECT skill_id FROM skills WHERE skill_name = 'Boiler Maintenance'),
    'Advanced'
),
(
    (SELECT technician_id FROM technicians
     WHERE user_id = (SELECT user_id FROM users WHERE email = 'tech7@dataquest.com')),
    (SELECT skill_id FROM skills WHERE skill_name = 'Electrical'),
    'Intermediate'
),
(
    (SELECT technician_id FROM technicians
     WHERE user_id = (SELECT user_id FROM users WHERE email = 'tech8@dataquest.com')),
    (SELECT skill_id FROM skills WHERE skill_name = 'Thermal Systems'),
    'Advanced'
),
(
    (SELECT technician_id FROM technicians
     WHERE user_id = (SELECT user_id FROM users WHERE email = 'tech8@dataquest.com')),
    (SELECT skill_id FROM skills WHERE skill_name = 'Cooling Systems'),
    'Advanced'
),
(
    (SELECT technician_id FROM technicians
     WHERE user_id = (SELECT user_id FROM users WHERE email = 'tech9@dataquest.com')),
    (SELECT skill_id FROM skills WHERE skill_name = 'Automation'),
    'Intermediate'
),
(
    (SELECT technician_id FROM technicians
     WHERE user_id = (SELECT user_id FROM users WHERE email = 'tech10@dataquest.com')),
    (SELECT skill_id FROM skills WHERE skill_name = 'Material Handling'),
    'Advanced'
),
(
    (SELECT technician_id FROM technicians
     WHERE user_id = (SELECT user_id FROM users WHERE email = 'tech10@dataquest.com')),
    (SELECT skill_id FROM skills WHERE skill_name = 'Robotics'),
    'Advanced'
);


-- ============================================
-- MORE SERVICE REQUESTS
-- ============================================

INSERT INTO service_requests
(machine_id, requested_by, issue_description, priority, status, required_skill_id, sla_deadline)
VALUES
(
    (SELECT machine_id FROM machines WHERE machine_code = 'M-701'),
    (SELECT user_id FROM users WHERE email = 'service.coordinator@dataquest.com'),
    'CNC turning center requires spindle alignment.',
    'High',
    'Pending',
    (SELECT skill_id FROM skills WHERE skill_name = 'CNC'),
    '2026-10-08 10:00:00'
),

(
    (SELECT machine_id FROM machines WHERE machine_code = 'M-702'),
    (SELECT user_id FROM users WHERE email = 'regional.manager@dataquest.com'),
    'Boiler pressure is below the expected operating range.',
    'Urgent',
    'Assigned',
    (SELECT skill_id FROM skills WHERE skill_name = 'Boiler Maintenance'),
    '2026-10-07 19:00:00'
),

(
    (SELECT machine_id FROM machines WHERE machine_code = 'M-801'),
    (SELECT user_id FROM users WHERE email = 'service.coordinator@dataquest.com'),
    'Hydraulic lift is moving slower than normal.',
    'Medium',
    'Pending',
    (SELECT skill_id FROM skills WHERE skill_name = 'Hydraulics'),
    '2026-10-09 17:00:00'
),

(
    (SELECT machine_id FROM machines WHERE machine_code = 'M-802'),
    (SELECT user_id FROM users WHERE email = 'quality@dataquest.com'),
    'Packaging robot is failing to complete its cycle.',
    'High',
    'In Progress',
    (SELECT skill_id FROM skills WHERE skill_name = 'Robotics'),
    '2026-10-08 15:00:00'
),

(
    (SELECT machine_id FROM machines WHERE machine_code = 'M-901'),
    (SELECT user_id FROM users WHERE email = 'regional.manager@dataquest.com'),
    'Furnace temperature is fluctuating during operation.',
    'Urgent',
    'Pending',
    (SELECT skill_id FROM skills WHERE skill_name = 'Thermal Systems'),
    '2026-10-07 21:00:00'
),

(
    (SELECT machine_id FROM machines WHERE machine_code = 'M-902'),
    (SELECT user_id FROM users WHERE email = 'service.coordinator@dataquest.com'),
    'Cooling system is not reaching the configured temperature.',
    'High',
    'Assigned',
    (SELECT skill_id FROM skills WHERE skill_name = 'Cooling Systems'),
    '2026-10-08 11:00:00'
),

(
    (SELECT machine_id FROM machines WHERE machine_code = 'M-A01'),
    (SELECT user_id FROM users WHERE email = 'quality@dataquest.com'),
    'Assembly line sensor requires recalibration.',
    'Medium',
    'Pending',
    (SELECT skill_id FROM skills WHERE skill_name = 'Automation'),
    '2026-10-10 14:00:00'
),

(
    (SELECT machine_id FROM machines WHERE machine_code = 'M-A02'),
    (SELECT user_id FROM users WHERE email = 'regional.manager@dataquest.com'),
    'Industrial drill is producing excessive vibration.',
    'High',
    'In Progress',
    (SELECT skill_id FROM skills WHERE skill_name = 'Mechanical'),
    '2026-10-08 18:00:00'
),

(
    (SELECT machine_id FROM machines WHERE machine_code = 'M-A03'),
    (SELECT user_id FROM users WHERE email = 'service.coordinator@dataquest.com'),
    'Power distribution unit is showing an intermittent fault.',
    'Urgent',
    'Pending',
    (SELECT skill_id FROM skills WHERE skill_name = 'Electrical'),
    '2026-10-07 16:30:00'
),

(
    (SELECT machine_id FROM machines WHERE machine_code = 'M-A04'),
    (SELECT user_id FROM users WHERE email = 'quality@dataquest.com'),
    'Material handling robot requires movement calibration.',
    'Medium',
    'Assigned',
    (SELECT skill_id FROM skills WHERE skill_name = 'Material Handling'),
    '2026-10-09 18:00:00'
);


-- ============================================
-- MORE ASSIGNMENTS
-- ============================================

INSERT INTO assignments
(request_id, technician_id, assignment_status, notes)
SELECT
    sr.request_id,
    t.technician_id,
    'Assigned',
    'Technician Six assigned for CNC inspection.'
FROM service_requests sr
JOIN machines m ON sr.machine_id = m.machine_id
JOIN technicians t
JOIN users u ON t.user_id = u.user_id
WHERE m.machine_code = 'M-701'
AND u.email = 'tech6@dataquest.com';


INSERT INTO assignments
(request_id, technician_id, assignment_status, notes)
SELECT
    sr.request_id,
    t.technician_id,
    'Assigned',
    'Technician Seven assigned for boiler inspection.'
FROM service_requests sr
JOIN machines m ON sr.machine_id = m.machine_id
JOIN technicians t
JOIN users u ON t.user_id = u.user_id
WHERE m.machine_code = 'M-702'
AND u.email = 'tech7@dataquest.com';


INSERT INTO assignments
(request_id, technician_id, assignment_status, notes)
SELECT
    sr.request_id,
    t.technician_id,
    'Assigned',
    'Technician Four assigned for hydraulic lift inspection.'
FROM service_requests sr
JOIN machines m ON sr.machine_id = m.machine_id
JOIN technicians t
JOIN users u ON t.user_id = u.user_id
WHERE m.machine_code = 'M-801'
AND u.email = 'tech4@dataquest.com';


INSERT INTO assignments
(request_id, technician_id, assignment_status, notes)
SELECT
    sr.request_id,
    t.technician_id,
    'In Progress',
    'Technician Three troubleshooting packaging robot.'
FROM service_requests sr
JOIN machines m ON sr.machine_id = m.machine_id
JOIN technicians t
JOIN users u ON t.user_id = u.user_id
WHERE m.machine_code = 'M-802'
AND u.email = 'tech3@dataquest.com';


INSERT INTO assignments
(request_id, technician_id, assignment_status, notes)
SELECT
    sr.request_id,
    t.technician_id,
    'Assigned',
    'Technician Eight assigned for furnace inspection.'
FROM service_requests sr
JOIN machines m ON sr.machine_id = m.machine_id
JOIN technicians t
JOIN users u ON t.user_id = u.user_id
WHERE m.machine_code = 'M-901'
AND u.email = 'tech8@dataquest.com';


INSERT INTO assignments
(request_id, technician_id, assignment_status, notes)
SELECT
    sr.request_id,
    t.technician_id,
    'Assigned',
    'Technician Eight assigned for cooling system inspection.'
FROM service_requests sr
JOIN machines m ON sr.machine_id = m.machine_id
JOIN technicians t
JOIN users u ON t.user_id = u.user_id
WHERE m.machine_code = 'M-902'
AND u.email = 'tech8@dataquest.com';


INSERT INTO assignments
(request_id, technician_id, assignment_status, notes)
SELECT
    sr.request_id,
    t.technician_id,
    'Assigned',
    'Technician Nine assigned for automation inspection.'
FROM service_requests sr
JOIN machines m ON sr.machine_id = m.machine_id
JOIN technicians t
JOIN users u ON t.user_id = u.user_id
WHERE m.machine_code = 'M-A01'
AND u.email = 'tech9@dataquest.com';


INSERT INTO assignments
(request_id, technician_id, assignment_status, notes)
SELECT
    sr.request_id,
    t.technician_id,
    'In Progress',
    'Technician Five inspecting industrial drill.'
FROM service_requests sr
JOIN machines m ON sr.machine_id = m.machine_id
JOIN technicians t
JOIN users u ON t.user_id = u.user_id
WHERE m.machine_code = 'M-A02'
AND u.email = 'tech5@dataquest.com';


INSERT INTO assignments
(request_id, technician_id, assignment_status, notes)
SELECT
    sr.request_id,
    t.technician_id,
    'Assigned',
    'Technician One assigned for electrical fault investigation.'
FROM service_requests sr
JOIN machines m ON sr.machine_id = m.machine_id
JOIN technicians t
JOIN users u ON t.user_id = u.user_id
WHERE m.machine_code = 'M-A03'
AND u.email = 'tech1@dataquest.com';


INSERT INTO assignments
(request_id, technician_id, assignment_status, notes)
SELECT
    sr.request_id,
    t.technician_id,
    'Assigned',
    'Technician Ten assigned for material handling robot.'
FROM service_requests sr
JOIN machines m ON sr.machine_id = m.machine_id
JOIN technicians t
JOIN users u ON t.user_id = u.user_id
WHERE m.machine_code = 'M-A04'
AND u.email = 'tech10@dataquest.com';


-- ============================================
-- MORE SPARE PARTS
-- ============================================

INSERT INTO spare_parts
(part_code, part_name, description, unit)
VALUES
('P-013', 'CNC Spindle Bearing', 'Precision bearing for CNC spindle assemblies', 'Piece'),
('P-014', 'Boiler Pressure Valve', 'Industrial boiler pressure control valve', 'Piece'),
('P-015', 'Hydraulic Cylinder Seal', 'Replacement seal for hydraulic cylinders', 'Piece'),
('P-016', 'Robot Encoder', 'Industrial robot position encoder', 'Piece'),
('P-017', 'Cooling Fan Motor', 'Replacement motor for industrial cooling systems', 'Piece'),
('P-018', 'Electrical Contactor', 'Industrial electrical switching contactor', 'Piece'),
('P-019', 'Thermal Sensor', 'High-temperature industrial sensor', 'Piece'),
('P-020', 'Conveyor Motor', 'Industrial conveyor drive motor', 'Piece');


-- ============================================
-- MORE INVENTORY
-- ============================================

INSERT INTO part_inventory
(part_id, site_id, quantity_available, minimum_stock_level)
SELECT
    p.part_id,
    s.site_id,
    x.quantity_available,
    x.minimum_stock_level
FROM
(
    SELECT 'P-013' AS part_code, 'Site G' AS site_name, 8 AS quantity_available, 3 AS minimum_stock_level
    UNION ALL SELECT 'P-014', 'Site G', 4, 2
    UNION ALL SELECT 'P-015', 'Site H', 12, 4
    UNION ALL SELECT 'P-016', 'Site H', 5, 2
    UNION ALL SELECT 'P-017', 'Site I', 7, 3
    UNION ALL SELECT 'P-018', 'Site I', 15, 5
    UNION ALL SELECT 'P-019', 'Site I', 6, 2
    UNION ALL SELECT 'P-020', 'Site J', 9, 3
) x
JOIN spare_parts p ON p.part_code = x.part_code
JOIN sites s ON s.site_name = x.site_name;


-- ============================================
-- MORE REQUEST PARTS
-- ============================================

INSERT INTO request_parts
(request_id, part_id, quantity_required, quantity_used)
SELECT
    sr.request_id,
    p.part_id,
    x.quantity_required,
    x.quantity_used
FROM
(
    SELECT 'M-701' AS machine_code, 'P-013' AS part_code, 2 AS quantity_required, 0 AS quantity_used
    UNION ALL SELECT 'M-702', 'P-014', 1, 0
    UNION ALL SELECT 'M-801', 'P-015', 2, 0
    UNION ALL SELECT 'M-802', 'P-016', 1, 0
    UNION ALL SELECT 'M-901', 'P-019', 2, 0
    UNION ALL SELECT 'M-902', 'P-017', 1, 0
    UNION ALL SELECT 'M-A01', 'P-016', 1, 0
    UNION ALL SELECT 'M-A02', 'P-020', 1, 0
    UNION ALL SELECT 'M-A03', 'P-018', 2, 0
    UNION ALL SELECT 'M-A04', 'P-016', 1, 0
) x
JOIN machines m
    ON m.machine_code = x.machine_code
JOIN service_requests sr
    ON sr.machine_id = m.machine_id
JOIN spare_parts p
    ON p.part_code = x.part_code
WHERE sr.issue_description IS NOT NULL
ORDER BY sr.request_id DESC
LIMIT 10;
