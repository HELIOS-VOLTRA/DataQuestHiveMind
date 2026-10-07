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
