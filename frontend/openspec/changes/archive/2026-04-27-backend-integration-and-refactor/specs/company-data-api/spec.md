## ADDED Requirements

### Requirement: Get Companies API Endpoint
The backend SHALL provide a PHP endpoint (e.g., `get_companies.php`) that retrieves all companies from the database and returns them as a JSON array.

#### Scenario: Fetching company data
- **WHEN** a GET request is made to the API endpoint
- **THEN** the system returns a 200 OK response with a JSON body containing an array of company objects.

### Requirement: JSON Schema Consistency
The API SHALL return company objects that exactly match the schema currently used in the frontend's `companiesData` array.

#### Scenario: Data schema verification
- **WHEN** the API returns a company object
- **THEN** it contains all required nested objects (`contact`, `financials`, `salary`) with their respective fields.
