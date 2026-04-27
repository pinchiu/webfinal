## ADDED Requirements

### Requirement: Company Profile Architecture
The system SHALL provide a foundational HTML/JS structure to view detailed information for a single company without navigating away from the Single Page Application (SPA) context.

#### Scenario: Triggering profile view
- **WHEN** the user clicks the "View Profile" button on a specific company card
- **THEN** the system intercepts the click event to prevent default navigation
- **THEN** the system triggers a state change to render the detailed profile view (e.g., displaying a modal or replacing the main grid view) populated with data specific to that company
