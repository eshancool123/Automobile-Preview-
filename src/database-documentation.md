# Database Schema Documentation

## Overview

This database schema supports a comprehensive service management application with appointment booking, payment processing, employee time tracking, and customer communication features.

## Entity Relationship Diagram (ERD)

```
┌─────────────┐         ┌──────────────────┐         ┌─────────────────┐
│   Users     │────────▶│   Appointments   │────────▶│  Service        │
│             │         │                  │         │  Categories     │
│ - id (PK)   │         │ - id (PK)        │         │                 │
│ - name      │         │ - customer_id    │         │ - id (PK)       │
│ - email     │         │ - employee_id    │         │ - name          │
│ - role      │         │ - service_cat_id │         │ - base_price    │
└─────────────┘         │ - status         │         └─────────────────┘
      │                 │ - progress       │                  │
      │                 └──────────────────┘                  │
      │                         │                             │
      │                         │                             │
      ├────────────────┬────────┼────────────────┬───────────┤
      │                │        │                │           │
      ▼                ▼        ▼                ▼           ▼
┌─────────────┐  ┌──────────┐  ┌────────────┐  ┌──────────────────┐
│  Payments   │  │ Reviews  │  │  Modif.    │  │  Employee        │
│             │  │          │  │  Requests  │  │  Service         │
│ - id (PK)   │  │ - rating │  │            │  │  Assignments     │
│ - amount    │  │ - comment│  │ - title    │  │                  │
│ - status    │  └──────────┘  │ - status   │  └──────────────────┘
└─────────────┘                └────────────┘
      │
      ▼
┌─────────────────┐
│  Notifications  │
│                 │
│ - id (PK)       │
│ - user_id       │
│ - message       │
│ - is_read       │
└─────────────────┘
```

## Core Tables

### 1. **users**
Stores all system users with role-based access control.

**Key Fields:**
- `role`: Determines access level (customer, employee, admin)
- `status`: Account status for access control
- `password_hash`: Encrypted password storage

**Relationships:**
- One-to-Many with `appointments` (as customer)
- One-to-Many with `appointments` (as employee)
- One-to-Many with `payments`
- One-to-Many with `modification_requests`
- One-to-Many with `time_logs`
- One-to-Many with `notifications`
- One-to-Many with `chat_messages`
- One-to-Many with `reviews`

---

### 2. **service_categories**
Defines available service types (Cleaning, HVAC, Plumbing, etc.)

**Key Fields:**
- `base_price`: Starting price for the service
- `estimated_duration`: Expected time in minutes
- `icon`: Visual identifier (emoji or icon name)

**Relationships:**
- One-to-Many with `appointments`
- Many-to-Many with `users` (employees) through `employee_service_assignments`

---

### 3. **appointments**
Central table for service bookings and scheduling.

**Key Fields:**
- `status`: Workflow state (pending → confirmed → in-progress → completed)
- `progress`: Percentage completion (0-100)
- `appointment_date` & `appointment_time`: Scheduled slot

**Relationships:**
- Many-to-One with `users` (customer)
- Many-to-One with `users` (employee)
- Many-to-One with `service_categories`
- One-to-Many with `payments`
- One-to-Many with `modification_requests`
- One-to-Many with `time_logs`
- One-to-One with `reviews`
- One-to-Many with `appointment_status_history`

**Status Flow:**
```
pending → confirmed → in-progress → completed
                         ↓
                    cancelled
```

---

### 4. **payments**
Tracks all financial transactions for services.

**Key Fields:**
- `payment_method`: How the payment was made
- `status`: Payment state (pending, completed, failed, refunded)
- `transaction_id`: External payment gateway reference

**Relationships:**
- Many-to-One with `appointments`
- Many-to-One with `users` (customer)

**Payment Flow:**
```
pending → completed
   ↓         ↓
 failed   refunded
```

---

### 5. **modification_requests**
Customer requests for changes to ongoing services.

**Key Fields:**
- `request_type`: Category of modification
- `priority`: Urgency level
- `estimated_cost`: Additional charges if approved
- `admin_response`: Approval/rejection message

**Relationships:**
- Many-to-One with `appointments`
- Many-to-One with `users` (customer)
- Many-to-One with `users` (responder)

**Status Flow:**
```
pending → approved → in-progress → completed
   ↓
rejected
```

---

### 6. **time_logs**
Employee work time tracking for billing and analytics.

**Key Fields:**
- `start_time` & `end_time`: Work period
- `duration`: Calculated time in minutes
- `activity_description`: What was done

**Relationships:**
- Many-to-One with `users` (employee)
- Many-to-One with `appointments`

**Usage:**
- Calculate employee hours
- Track billable time
- Generate timesheets
- Analyze productivity

---

### 7. **notifications**
System-wide notification management.

**Key Fields:**
- `type`: Categorizes notification (appointment, payment, message)
- `is_read`: Read/unread status
- `action_url`: Deep link to related content
- `related_id`: Reference to related entity

**Relationships:**
- Many-to-One with `users`

**Notification Types:**
- Appointment confirmations
- Payment receipts
- Status updates
- Chat messages
- System alerts

---

### 8. **chat_messages**
Customer support and employee communication.

**Key Fields:**
- `conversation_id`: Groups messages into threads
- `message_type`: Text, image, file, or system message
- `is_read`: Message read status

**Relationships:**
- Many-to-One with `users` (sender)
- Many-to-One with `users` (receiver)

**Use Cases:**
- Customer support chat
- Employee-customer communication
- Admin announcements

---

### 9. **reviews**
Customer feedback and ratings for completed services.

**Key Fields:**
- `rating`: 1-5 star rating
- `comment`: Written feedback
- `response`: Business reply to review

**Relationships:**
- One-to-One with `appointments`
- Many-to-One with `users` (customer)
- Many-to-One with `users` (employee)

**Business Logic:**
- Only one review per appointment
- Can only review completed appointments
- Average ratings shown on landing page

---

## Supporting Tables

### 10. **employee_service_assignments**
Defines which services each employee can perform.

**Purpose:**
- Skill-based routing
- Employee scheduling
- Service capacity planning

---

### 11. **service_availability**
Employee weekly schedule and availability.

**Key Fields:**
- `day_of_week`: 0 (Sunday) to 6 (Saturday)
- `start_time` & `end_time`: Available hours
- `is_available`: Enable/disable slots

**Usage:**
- Appointment booking time slots
- Employee scheduling
- Capacity management

---

### 12. **appointment_status_history**
Audit trail for appointment status changes.

**Purpose:**
- Track status changes
- Audit compliance
- Dispute resolution
- Analytics

---

## Indexes and Performance

### Critical Indexes
All foreign keys are indexed for join performance:
- User lookups by email and role
- Appointments by customer, employee, date, and status
- Payments by status and date
- Notifications by user and read status

### Query Optimization
- Use composite indexes for common query patterns
- Partition large tables (appointments, notifications) by date
- Archive old completed appointments

---

## Data Integrity

### Constraints
1. **Foreign Keys**: Maintain referential integrity
2. **Check Constraints**: Validate status values and ranges
3. **Unique Constraints**: Prevent duplicate reviews
4. **Not Null**: Enforce required fields

### Cascading Rules
- **ON DELETE CASCADE**: Remove dependent records (e.g., user deletion removes their appointments)
- **ON DELETE SET NULL**: Preserve records but remove reference (e.g., employee deletion keeps appointment history)
- **ON DELETE RESTRICT**: Prevent deletion if dependencies exist (e.g., can't delete service category with active appointments)

---

## Security Considerations

### Password Storage
- **Never store plain text passwords**
- Use bcrypt, argon2, or similar hashing algorithms
- Minimum 10 rounds for bcrypt

### Data Privacy
- Encrypt sensitive fields (payment info, addresses)
- Implement row-level security (RLS) in PostgreSQL
- Audit access to personal data

### Access Control
Role-based permissions:
- **Customers**: Own data only
- **Employees**: Assigned appointments and related data
- **Admins**: Full access with audit logging

---

## Common Queries

### Get Customer's Upcoming Appointments
```sql
SELECT a.*, sc.name as service_name, u.name as employee_name
FROM appointments a
JOIN service_categories sc ON a.service_category_id = sc.id
LEFT JOIN users u ON a.employee_id = u.id
WHERE a.customer_id = $1
  AND a.status IN ('pending', 'confirmed', 'in-progress')
  AND a.appointment_date >= CURRENT_DATE
ORDER BY a.appointment_date, a.appointment_time;
```

### Get Employee's Daily Schedule
```sql
SELECT a.*, sc.name as service_name, c.name as customer_name, c.phone
FROM appointments a
JOIN service_categories sc ON a.service_category_id = sc.id
JOIN users c ON a.customer_id = c.id
WHERE a.employee_id = $1
  AND a.appointment_date = $2
  AND a.status != 'cancelled'
ORDER BY a.appointment_time;
```

### Calculate Employee Earnings
```sql
SELECT 
  e.name,
  COUNT(DISTINCT a.id) as total_jobs,
  SUM(p.amount) as total_earnings,
  AVG(r.rating) as average_rating
FROM users e
JOIN appointments a ON e.id = a.employee_id
LEFT JOIN payments p ON a.id = p.appointment_id AND p.status = 'completed'
LEFT JOIN reviews r ON a.id = r.appointment_id
WHERE e.role = 'employee'
  AND a.status = 'completed'
  AND a.appointment_date BETWEEN $1 AND $2
GROUP BY e.id, e.name;
```

### Get Pending Payments
```sql
SELECT 
  p.*,
  a.service_type,
  a.appointment_date,
  c.name as customer_name,
  c.email
FROM payments p
JOIN appointments a ON p.appointment_id = a.id
JOIN users c ON p.customer_id = c.id
WHERE p.status = 'pending'
  AND p.due_date < CURRENT_DATE
ORDER BY p.due_date;
```

---

## Migrations and Versioning

### Migration Strategy
1. Use a migration tool (Flyway, Liquibase, or Supabase migrations)
2. Version all schema changes
3. Test migrations on staging environment
4. Keep rollback scripts for each migration

### Sample Migration
```sql
-- V1__initial_schema.sql
-- Create all tables

-- V2__add_appointment_progress.sql
ALTER TABLE appointments ADD COLUMN progress INTEGER DEFAULT 0;

-- V3__add_notification_indexes.sql
CREATE INDEX idx_notifications_user_read ON notifications(user_id, is_read);
```

---

## Scaling Considerations

### When to Optimize
- **1K+ users**: Add Redis caching for frequent queries
- **10K+ appointments**: Partition appointments table by month
- **100K+ messages**: Separate chat to dedicated database

### Horizontal Scaling
- Read replicas for analytics queries
- Separate databases for different modules
- Use connection pooling (PgBouncer)

### Vertical Scaling
- Increase database server resources
- Optimize query plans
- Archive old data

---

## Backup and Recovery

### Backup Strategy
- **Hourly**: Transaction logs
- **Daily**: Full database backup
- **Weekly**: Off-site backup
- **Monthly**: Long-term archive

### Critical Data
Priority order for recovery:
1. Users and authentication
2. Active appointments
3. Payment records
4. Service history

---

## Analytics and Reporting

### Key Metrics Tables
Consider materialized views for:
- Daily revenue by service category
- Employee performance metrics
- Customer satisfaction scores
- Appointment conversion rates

### Example Materialized View
```sql
CREATE MATERIALIZED VIEW mv_daily_revenue AS
SELECT 
  DATE(p.payment_date) as date,
  sc.name as service,
  COUNT(*) as transactions,
  SUM(p.amount) as revenue
FROM payments p
JOIN appointments a ON p.appointment_id = a.id
JOIN service_categories sc ON a.service_category_id = sc.id
WHERE p.status = 'completed'
GROUP BY DATE(p.payment_date), sc.name;

-- Refresh daily
REFRESH MATERIALIZED VIEW mv_daily_revenue;
```

---

## Implementation Notes

### Using with Supabase
1. Create a new Supabase project
2. Run the SQL schema in the SQL editor
3. Enable Row Level Security (RLS)
4. Set up authentication policies
5. Generate TypeScript types

### Using with PostgreSQL
1. Create a new database
2. Run migration files in order
3. Set up connection pooling
4. Configure backups
5. Set up monitoring

### Using with Other Databases
- **MySQL**: Adjust UUID to CHAR(36) or use AUTO_INCREMENT
- **SQLite**: Remove UUID functions, use INTEGER PRIMARY KEY
- **MongoDB**: Convert to document schema with embedded relationships

---

## Next Steps

1. **Set up the database** using the provided schema
2. **Configure authentication** with password hashing
3. **Implement Row Level Security** for data isolation
4. **Create API endpoints** for CRUD operations
5. **Add database backups** and monitoring
6. **Test with sample data** provided in schema file

---

## Support and Maintenance

### Regular Tasks
- Monitor slow queries
- Update statistics
- Vacuum tables (PostgreSQL)
- Review and archive old data
- Update indexes based on query patterns

### Health Checks
- Connection pool status
- Query performance metrics
- Disk space usage
- Backup success/failure
- Replication lag (if using replicas)
