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
-- ============================================
-- SAMPLE SITES
-- ============================================

INSERT INTO sites
(site_name, address, city, latitude, longitude)
VALUES
('Site A', 'Industrial Area, Phase 1', 'Chennai', 13.0827000, 80.2707000),
('Site B', 'Manufacturing Zone, Sector 4', 'Bengaluru', 12.9716000, 77.5946000),
('Site C', 'Industrial Estate, Block 2', 'Hyderabad', 17.3850000, 78.4867000);
