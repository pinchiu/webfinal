## ADDED Requirements

### Requirement: Salary Sorting Mechanism
The system SHALL allow users to sort the currently displayed company list based on numerical salary data.

#### Scenario: Sort High to Low
- **WHEN** the user selects the "High to Low" salary sort radio button
- **THEN** the system updates the sorting state
- **THEN** the system re-renders the company list, ordering companies in descending order based on their maximum salary range value

#### Scenario: Sort Low to High
- **WHEN** the user selects the "Low to High" salary sort radio button
- **THEN** the system updates the sorting state
- **THEN** the system re-renders the company list, ordering companies in ascending order based on their minimum salary range value

#### Scenario: Sorting combined with Filtering
- **WHEN** the user has an active location filter AND selects a sorting option
- **THEN** the system applies the sort ONLY to the currently filtered subset of companies
- **THEN** the system re-renders the filtered list in the requested sorted order
