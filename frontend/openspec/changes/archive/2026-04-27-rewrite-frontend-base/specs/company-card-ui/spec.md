## MODIFIED Requirements

### Requirement: Enhanced Company Card Data Display
The company card UI component SHALL display extended data points derived from the `final.md` dataset while maintaining the existing design aesthetic.

#### Scenario: Rendering full company card
- **WHEN** a company object is passed to the rendering function
- **THEN** the card displays the Company Name, Product Info (shortened/categorized), Location, and a "View Profile" button as before
- **THEN** the card ALSO displays (or has placeholders for) the newly required fields: Contact Info, Financial Info (Capital, Gross Profit, Net Profit, Stock Price), and HR Info (Salary), potentially reformatted to fit the card layout (e.g., using icons and tooltips or dedicated small data rows) without breaking the existing flex/grid structure.
