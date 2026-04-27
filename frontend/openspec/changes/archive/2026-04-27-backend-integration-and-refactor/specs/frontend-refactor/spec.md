## ADDED Requirements

### Requirement: External Stylesheet
The frontend SHALL move all CSS from `code.html` into a separate `style.css` file.

#### Scenario: CSS separation
- **WHEN** the page is loaded
- **THEN** it links to `style.css` in the `<head>` and no longer contains inline `<style>` blocks for the main application logic.

### Requirement: Navigation Bar Visibility
The navigation bar SHALL be fully restored and correctly positioned in the refactored layout.

#### Scenario: Nav bar verification
- **WHEN** the user views the page
- **THEN** the top navigation bar is visible, properly styled, and contains all expected links (Home, Search, etc.).
