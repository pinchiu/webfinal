## ADDED Requirements

### Requirement: Initialize Company Data
The frontend SHALL load and initialize a static JSON dataset containing the company information derived from `final.md`.

#### Scenario: Successful data initialization
- **WHEN** the page loads
- **THEN** the system parses the mocked JSON array containing company objects
- **THEN** the system stores this dataset in memory as the base source of truth for rendering

### Requirement: Render Initial Company List
The system SHALL render the initial list of companies onto the DOM using the initialized dataset.

#### Scenario: Rendering all companies
- **WHEN** the dataset is successfully initialized and no filters are active
- **THEN** the system iterates through the full dataset
- **THEN** it generates and appends a company card component for each entry into the designated grid container
