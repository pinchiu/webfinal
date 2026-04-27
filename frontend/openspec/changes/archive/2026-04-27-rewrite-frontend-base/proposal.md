## Why

We need to rewrite the frontend base in the `code.html` file to align with the requirements specified in the `final.md` file. The current frontend is a static layout, but we need to integrate the actual biotech company data and implement the requested dynamic features. Specifically, we must support filtering by location (city) and sorting by salary, along with displaying company product info, financial data, and creating a framework for individual company profiles.

## What Changes

- Rewrite the static HTML structure in `code.html` to act as a dynamic template or component.
- Integrate the company data from the backend/data source (currently detailed in `final.md`).
- Implement interactive filtering by Location (e.g., Taipei, Hsinchu, Taichung, Tainan, Kaohsiung).
- Implement interactive sorting by Salary (High to Low, Low to High).
- Update the company card UI to display required fields: Company Name, Address/Location, Product Info, Contact Info, Financial Info (Capital, Gross Profit, Net Profit, Stock Price), and HR Info (Salary).
- Prepare the structure for the Company Profile detailed view.

## Capabilities

### New Capabilities
- `frontend-data-integration`: Integrate the raw biotech company data into the frontend UI.
- `interactive-filtering`: Implement the logic to filter the company list based on selected locations.
- `interactive-sorting`: Implement the logic to sort the company list based on salary benchmarks.
- `company-profile-view`: Create the foundational structure for displaying detailed company information on a separate view or modal.

### Modified Capabilities
- `company-card-ui`: Modify the existing company card UI in `code.html` to display all the new required data points (financials, extended HR info).

## Impact

- `code.html`: Will be heavily modified to support dynamic data rendering and interactive logic (likely requiring Javascript or a framework if we decide to move away from vanilla JS).
- The overall user experience will become dynamic and interactive, rather than static.
