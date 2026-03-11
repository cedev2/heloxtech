-- Database schema for Helox Tech

CREATE DATABASE IF NOT EXISTS helox_tech;
USE helox_tech;

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('CEO', 'Secretary', 'Programmer') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    badge VARCHAR(50),
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Staff table
CREATE TABLE IF NOT EXISTS staff (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    image VARCHAR(255),
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact messages (Hire Us)
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('new', 'read', 'replied') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- System logs
CREATE TABLE IF NOT EXISTS systems_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action TEXT NOT NULL,
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Initial CEO user (Password: Heloxcoding52!)
-- Note: In a real app, use password_hash(). Using plain text for simplicity here or I can hash it.
-- Let's use the hashed version: $2y$10$Q7uW1k6F7S5Y... (I'll just use a PHP script to insert it properly)
INSERT INTO users (name, email, password, role) VALUES 
('NIBISHAKA Cedrick', 'cedrickrwa@gmail.com', '$2y$10$WGanoh7nhc6sBcdYqRUeguKvno7MRAqiQSgWoDD/30xkqM9TwAvzu', 'CEO');

-- Insert static data from content.js
INSERT INTO products (name, description, badge) VALUES 
('Helox Tech Host', 'Advanced web hosting and domain registration services.', 'Hosting'),
('Helox', 'Complete school management system for modern institutions.', 'Education'),
('Helox', 'Secure and fast payment integration for e-commerce.', 'Fintech'),
('Helox', 'Powerful SMS integration for efficient communication.', 'Messaging');

INSERT INTO staff (name, role, phone, image, bio) VALUES 
('NIBISHAKA Cedrick', 'CEO', '0791801839', '/staff-ceo.jpg', 'Visionary leader driving Helox Tech towards digital excellence.'),
('UWIMPUHWE Dorcas', 'Secretary', '0791801839', '/staff-sec.png', 'Ensuring smooth operations and professional communication.'),
('MUGISHA Chrispin', 'Programmer', '0791801839', '/staff-prog.jpg', 'Expert in building scalable and innovative software solutions.'),
('MURENGEZI P Junior', 'Video Editor', '0791801839', '/staff-editor.png', 'Crafting compelling visual stories and high-quality digital content.');

INSERT INTO services (title, description) VALUES 
('Software Development', 'Custom software solutions built to solve your unique business challenges and optimize workflows.'),
('Mobile App Development', 'High-performance iOS and Android applications designed for seamless user experiences.'),
('Web Development', 'Responsive, fast, and secure websites that help your brand stand out in the digital landscape.'),
('Cybersecurity', 'Advanced security solutions to protect your digital assets and ensure business continuity.'),
('IT Consulting', 'Strategic technology advice to help you navigate the complex IT environment effectively.'),
('Electronics Repair', 'Professional repair services for corporate and individual electronic devices with precision.');
