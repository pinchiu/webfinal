## ADDED Requirements

### Requirement: Database Schema for Company Data
The backend SHALL maintain a SQL Server database with a `companies` table containing all fields required by the frontend (id, name, category, product, address, location, contact, financials, salary).

#### Scenario: Database table structure
- **WHEN** the database is initialized
- **THEN** the `companies` table exists with appropriate data types for each field (e.g., NVARCHAR for text, DECIMAL for financial values).

### Requirement: PHP Database Connection
The backend SHALL use PHP and PDO to establish a secure connection to the SQL Server database.

#### Scenario: Successful connection
- **WHEN** a backend script is executed
- **THEN** it successfully connects to the database using provided credentials.
