USE dataquest_hivemind;
-- ============================================
-- SAMPLE USERS
-- ============================================

INSERT INTO users (name, email, password_hash, role)
VALUES
('Admin User', 'admin@dataquest.com', 'demo_hash_001', 'Admin'),
('Site Manager', 'manager@dataquest.com', 'demo_hash_002', 'Manager'),
('Maintenance Coordinator', 'coordinator@dataquest.com', 'demo_hash_003', 'Coordinator'),
('Technician One', 'tech1@dataquest.com', 'demo_hash_004', 'Technician'),
('Technician Two', 'tech2@dataquest.com', 'demo_hash_005', 'Technician'),
('Technician Three', 'tech3@dataquest.com', 'demo_hash_006', 'Technician');
