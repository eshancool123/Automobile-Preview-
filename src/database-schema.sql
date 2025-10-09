-- ============================================
-- SERVICE MANAGEMENT APPLICATION DATABASE SCHEMA
-- ============================================

-- Users Table
-- Stores all users (customers, employees, admins)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('customer', 'employee', 'admin')),
  avatar_url TEXT,
  phone VARCHAR(20),
  address TEXT,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Service Categories
-- Types of services offered (Cleaning, HVAC, Plumbing, etc.)
CREATE TABLE service_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(50), -- emoji or icon name
  base_price DECIMAL(10, 2),
  estimated_duration INTEGER, -- in minutes
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Appointments
-- Customer service bookings
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  employee_id UUID REFERENCES users(id) ON DELETE SET NULL,
  service_category_id UUID NOT NULL REFERENCES service_categories(id) ON DELETE RESTRICT,
  service_type VARCHAR(255) NOT NULL, -- specific service name
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  location TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in-progress', 'completed', 'cancelled')),
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  notes TEXT,
  cancellation_reason TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments
-- Payment records for services
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id UUID NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('credit_card', 'debit_card', 'paypal', 'bank_transfer', 'cash')),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  transaction_id VARCHAR(255),
  payment_date TIMESTAMP,
  due_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Modification Requests
-- Customer requests for changes to ongoing services
CREATE TABLE modification_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id UUID NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  request_type VARCHAR(50) CHECK (request_type IN ('change', 'addition', 'removal', 'other')),
  priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'in-progress', 'completed')),
  estimated_cost DECIMAL(10, 2),
  admin_response TEXT,
  responded_by UUID REFERENCES users(id) ON DELETE SET NULL,
  responded_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Time Logs
-- Employee work time tracking
CREATE TABLE time_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP,
  duration INTEGER, -- in minutes, calculated
  activity_description TEXT,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications
-- System notifications for users
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) CHECK (type IN ('info', 'success', 'warning', 'error', 'appointment', 'payment', 'message')),
  is_read BOOLEAN DEFAULT FALSE,
  action_url TEXT,
  related_id UUID, -- ID of related entity (appointment, payment, etc.)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chat Messages
-- Messages between customers and support/employees
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL,
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES users(id) ON DELETE SET NULL,
  message TEXT NOT NULL,
  message_type VARCHAR(20) DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'file', 'system')),
  is_read BOOLEAN DEFAULT FALSE,
  attachment_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews and Ratings
-- Customer reviews for completed services
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id UUID NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  employee_id UUID REFERENCES users(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  response TEXT, -- employee/admin response
  responded_by UUID REFERENCES users(id) ON DELETE SET NULL,
  responded_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(appointment_id, customer_id)
);

-- Employee Assignments
-- Track which employees are assigned to which service categories
CREATE TABLE employee_service_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  service_category_id UUID NOT NULL REFERENCES service_categories(id) ON DELETE CASCADE,
  skill_level VARCHAR(20) CHECK (skill_level IN ('beginner', 'intermediate', 'expert')),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(employee_id, service_category_id)
);

-- Service Availability
-- Employee availability schedules
CREATE TABLE service_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0=Sunday, 6=Saturday
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Appointment Status History
-- Track status changes for appointments
CREATE TABLE appointment_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id UUID NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
  old_status VARCHAR(20),
  new_status VARCHAR(20) NOT NULL,
  changed_by UUID REFERENCES users(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);

-- Appointments
CREATE INDEX idx_appointments_customer ON appointments(customer_id);
CREATE INDEX idx_appointments_employee ON appointments(employee_id);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_service_category ON appointments(service_category_id);

-- Payments
CREATE INDEX idx_payments_appointment ON payments(appointment_id);
CREATE INDEX idx_payments_customer ON payments(customer_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_date ON payments(payment_date);

-- Modification Requests
CREATE INDEX idx_modification_requests_appointment ON modification_requests(appointment_id);
CREATE INDEX idx_modification_requests_customer ON modification_requests(customer_id);
CREATE INDEX idx_modification_requests_status ON modification_requests(status);

-- Time Logs
CREATE INDEX idx_time_logs_employee ON time_logs(employee_id);
CREATE INDEX idx_time_logs_appointment ON time_logs(appointment_id);
CREATE INDEX idx_time_logs_start_time ON time_logs(start_time);

-- Notifications
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_notifications_created ON notifications(created_at);

-- Chat Messages
CREATE INDEX idx_chat_messages_conversation ON chat_messages(conversation_id);
CREATE INDEX idx_chat_messages_sender ON chat_messages(sender_id);
CREATE INDEX idx_chat_messages_receiver ON chat_messages(receiver_id);
CREATE INDEX idx_chat_messages_created ON chat_messages(created_at);

-- Reviews
CREATE INDEX idx_reviews_appointment ON reviews(appointment_id);
CREATE INDEX idx_reviews_customer ON reviews(customer_id);
CREATE INDEX idx_reviews_employee ON reviews(employee_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);

-- ============================================
-- TRIGGERS FOR AUTO-UPDATE TIMESTAMPS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_categories_updated_at BEFORE UPDATE ON service_categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_modification_requests_updated_at BEFORE UPDATE ON modification_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_time_logs_updated_at BEFORE UPDATE ON time_logs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_availability_updated_at BEFORE UPDATE ON service_availability
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SAMPLE DATA (FOR DEVELOPMENT/TESTING)
-- ============================================

-- Insert sample service categories
INSERT INTO service_categories (name, description, icon, base_price, estimated_duration) VALUES
  ('House Cleaning', 'Professional cleaning services for your home', '🧹', 120.00, 180),
  ('HVAC Maintenance', 'Keep your heating and cooling systems running smoothly', '❄️', 150.00, 120),
  ('Plumbing Repair', 'Expert plumbing solutions for all your needs', '🔧', 100.00, 90),
  ('Electrical Work', 'Safe and certified electrical services', '⚡', 130.00, 120),
  ('Landscaping', 'Beautiful outdoor spaces, professionally maintained', '🌿', 200.00, 240),
  ('General Repairs', 'All-around handyman services for your property', '🛠️', 80.00, 60);

-- Note: For user passwords, use proper hashing in production (bcrypt, argon2, etc.)
-- These are just examples
INSERT INTO users (name, email, password_hash, role, phone, address) VALUES
  ('John Doe', 'john@example.com', '$2a$10$example_hash_customer123', 'customer', '555-0101', '123 Main St, Apt 4B'),
  ('Jane Smith', 'jane@example.com', '$2a$10$example_hash_customer123', 'customer', '555-0102', '456 Oak Ave'),
  ('Sarah Smith', 'sarah@example.com', '$2a$10$example_hash_employee123', 'employee', '555-0201', '789 Pine Rd'),
  ('Mike Johnson', 'mike@example.com', '$2a$10$example_hash_employee123', 'employee', '555-0202', '321 Elm St'),
  ('Admin User', 'admin@example.com', '$2a$10$example_hash_admin123', 'admin', '555-0301', '100 Admin Blvd');
