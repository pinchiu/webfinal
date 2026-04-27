## 1. Project Setup and Data Preparation

- [x] 1.1 Extract raw company data from `final.md` and convert it into a structured JSON format within a new `data.js` file (or embed it at the top of `app.js`).
- [x] 1.2 Create an `app.js` file and link it in the `code.html` file right before the closing `</body>` tag.
- [x] 1.3 Refactor the static `code.html` structure to remove the hardcoded `<article>` tags for the company grid, replacing them with an empty `<div id="company-grid" class="grid grid-cols-1 md:grid-cols-2 gap-lg"></div>` container.

## 2. Core Rendering Logic (app.js)

- [x] 2.1 Create an `appState` object to store `companies` (the raw data), `filteredCompanies` (the working set), `activeLocations` (array), and `activeSort` (string: 'highToLow', 'lowToHigh', or null).
- [x] 2.2 Create a `renderCompanyCard(company)` template literal function that takes a company object and returns the HTML string for the card UI (incorporating new data points if necessary).
- [x] 2.3 Create a `renderCompanyGrid()` function that iterates over `appState.filteredCompanies`, calls `renderCompanyCard` for each, and injects the HTML into the `#company-grid` container.
- [x] 2.4 Initialize the app on DOMContentLoaded by populating `appState.companies` and calling `renderCompanyGrid()`.

## 3. Implement Interactive Filtering

- [x] 3.1 Update the sidebar location checkboxes in `code.html` to have values matching the location strings in the JSON data and add a specific class/id for event delegation.
- [x] 3.2 Add an event listener to the "Apply Filters" button (or attach change listeners directly to the checkboxes) in `app.js`.
- [x] 3.3 Create an `applyFilters()` function that updates `appState.activeLocations` based on checked inputs, filters `appState.companies` into `appState.filteredCompanies`, and calls `renderCompanyGrid()`.

## 4. Implement Interactive Sorting

- [x] 3.1 Update the sidebar sorting radio buttons in `code.html` to have a shared `name` attribute and specific `value`s ('highToLow', 'lowToHigh').
- [x] 3.2 Add event listeners to the radio buttons in `app.js` that trigger when the selection changes.
- [x] 3.3 Create an `applySorting()` function that updates `appState.activeSort`, sorts `appState.filteredCompanies` based on the selected salary criteria, and calls `renderCompanyGrid()`.

## 5. Implement Company Profile View Skeleton

- [x] 5.1 Create a hidden modal structure or a separate container in `code.html` dedicated to displaying a detailed company profile.
- [x] 5.2 Add click event listeners to the "View Profile" buttons generated within `renderCompanyCard`.
- [x] 5.3 Create an `openProfile(companyId)` function in `app.js` that intercepts the click, fetches the specific company data, populates the profile container, and toggles its visibility.
