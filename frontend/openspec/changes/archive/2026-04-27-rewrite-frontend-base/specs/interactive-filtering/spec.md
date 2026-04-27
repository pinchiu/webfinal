## ADDED Requirements

### Requirement: Location Filtering Mechanism
The system SHALL provide a mechanism to filter the rendered company list based on selected geographic locations.

#### Scenario: Single location selected
- **WHEN** the user checks the checkbox for a specific location (e.g., "Taipei")
- **THEN** the system updates the active filter state
- **THEN** the system re-renders the company list, displaying only companies where the location field matches "Taipei"

#### Scenario: Multiple locations selected
- **WHEN** the user checks multiple location checkboxes (e.g., "Taipei" and "Hsinchu")
- **THEN** the system updates the active filter state to include all selected locations
- **THEN** the system re-renders the company list, displaying companies located in either "Taipei" OR "Hsinchu"

#### Scenario: No locations selected
- **WHEN** the user unchecks all location checkboxes
- **THEN** the active filter state is cleared
- **THEN** the system re-renders the complete, unfiltered company list
