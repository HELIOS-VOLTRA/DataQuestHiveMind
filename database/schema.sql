-- ============================================
-- DATAQUEST HIVEMIND
-- Database Schema
-- MySQL 8.x
-- ============================================


-- ============================================
-- USERS
-- Stores everyone who can use the platform
-- ============================================

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,

    password_hash VARCHAR(255) NOT NULL,

    role VARCHAR(50) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ============================================
-- SITES
-- Stores customer/industrial locations
-- ============================================

CREATE TABLE sites (
    site_id INT AUTO_INCREMENT PRIMARY KEY,

    site_name VARCHAR(100) NOT NULL,

    address VARCHAR(255) NOT NULL,

    city VARCHAR(100),

    latitude DECIMAL(10, 7),

    longitude DECIMAL(10, 7),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ============================================
-- MACHINES
-- Stores industrial equipment
-- Each machine belongs to one site
-- ============================================

CREATE TABLE machines (
    machine_id INT AUTO_INCREMENT PRIMARY KEY,

    machine_code VARCHAR(50) NOT NULL UNIQUE,

    machine_name VARCHAR(100) NOT NULL,

    machine_type VARCHAR(100),

    model VARCHAR(100),

    serial_number VARCHAR(100) UNIQUE,

    status VARCHAR(50) NOT NULL DEFAULT 'Operational',

    site_id INT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (site_id)
        REFERENCES sites(site_id)
);
-- ============================================
-- TECHNICIANS
-- Stores technician-specific information
-- Each technician is linked to a user account
-- ============================================

CREATE TABLE technicians (
    technician_id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL UNIQUE,

    phone VARCHAR(20),

    availability_status VARCHAR(50) NOT NULL DEFAULT 'Available',

    latitude DECIMAL(10, 7),

    longitude DECIMAL(10, 7),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
);
-- ============================================
-- SKILLS
-- Stores skills that technicians can have
-- ============================================

CREATE TABLE skills (
    skill_id INT AUTO_INCREMENT PRIMARY KEY,

    skill_name VARCHAR(100) NOT NULL UNIQUE,

    description VARCHAR(255)
);
-- ============================================
-- TECHNICIAN SKILLS
-- Links technicians to their skills
-- Many-to-many relationship
-- ============================================

CREATE TABLE technician_skills (
    technician_id INT NOT NULL,

    skill_id INT NOT NULL,

    proficiency_level VARCHAR(50) DEFAULT 'Intermediate',

    PRIMARY KEY (technician_id, skill_id),

    FOREIGN KEY (technician_id)
        REFERENCES technicians(technician_id),

    FOREIGN KEY (skill_id)
        REFERENCES skills(skill_id)
);
-- ============================================
-- SERVICE REQUESTS
-- Stores maintenance/service requests
-- created for industrial machines
-- ============================================

CREATE TABLE service_requests (
    request_id INT AUTO_INCREMENT PRIMARY KEY,

    machine_id INT NOT NULL,

    requested_by INT NOT NULL,

    issue_description TEXT NOT NULL,

    priority VARCHAR(20) NOT NULL DEFAULT 'Medium',

    status VARCHAR(50) NOT NULL DEFAULT 'Pending',

    required_skill_id INT,

    sla_deadline TIMESTAMP NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (machine_id)
        REFERENCES machines(machine_id),

    FOREIGN KEY (requested_by)
        REFERENCES users(user_id),

    FOREIGN KEY (required_skill_id)
        REFERENCES skills(skill_id)
);
-- ============================================
-- ASSIGNMENTS
-- Links service requests to technicians
-- Tracks technician assignment and work progress
-- ============================================

CREATE TABLE assignments (
    assignment_id INT AUTO_INCREMENT PRIMARY KEY,

    request_id INT NOT NULL,

    technician_id INT NOT NULL,

    assignment_status VARCHAR(50) NOT NULL DEFAULT 'Assigned',

    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    work_started_at TIMESTAMP NULL,

    work_completed_at TIMESTAMP NULL,

    notes TEXT,

    FOREIGN KEY (request_id)
        REFERENCES service_requests(request_id),

    FOREIGN KEY (technician_id)
        REFERENCES technicians(technician_id)
);
-- ============================================
-- SPARE PARTS
-- Stores spare parts/resources used for servicing
-- ============================================

CREATE TABLE spare_parts (
    part_id INT AUTO_INCREMENT PRIMARY KEY,

    part_code VARCHAR(50) NOT NULL UNIQUE,

    part_name VARCHAR(100) NOT NULL,

    description VARCHAR(255),

    unit VARCHAR(30) DEFAULT 'Piece',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- PART INVENTORY
-- Tracks spare-part availability at each site
-- ============================================

CREATE TABLE part_inventory (
    inventory_id INT AUTO_INCREMENT PRIMARY KEY,

    part_id INT NOT NULL,

    site_id INT NOT NULL,

    quantity_available INT NOT NULL DEFAULT 0,

    minimum_stock_level INT NOT NULL DEFAULT 0,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (part_id)
        REFERENCES spare_parts(part_id),

    FOREIGN KEY (site_id)
        REFERENCES sites(site_id),

    UNIQUE (part_id, site_id)
);
-- ============================================
-- REQUEST PARTS
-- Stores spare parts required for service requests
-- ============================================

CREATE TABLE request_parts (
    request_part_id INT AUTO_INCREMENT PRIMARY KEY,

    request_id INT NOT NULL,

    part_id INT NOT NULL,

    quantity_required INT NOT NULL DEFAULT 1,

    quantity_used INT NOT NULL DEFAULT 0,

    FOREIGN KEY (request_id)
        REFERENCES service_requests(request_id),

    FOREIGN KEY (part_id)
        REFERENCES spare_parts(part_id),

    UNIQUE (request_id, part_id)
);
