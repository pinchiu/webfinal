## Why

The current frontend is entirely static or relies on embedded JSON data. To support real-world scaling and data management, we need to migrate the company data to a professional backend using PHP and SQL Server. Additionally, the existing `code.html` file has bloated CSS within its structure, which should be separated into a dedicated stylesheet for better maintainability. We also need to ensure the navigation bar is fully functional and consistent across views.

## What Changes

- Move all company data from `app.js`/`data.js` into a SQL Server database.
- Create a PHP-based API to handle data retrieval.
- Refactor the CSS in `code.html` into a separate `style.css` file.
- Update `app.js` to fetch data from the new backend API.
- Restore and verify the navigation bar functionality in `code.html`.

## Capabilities

### New Capabilities
- `php-sql-backend`: A backend system using PHP to interface with a SQL Server database.
- `company-data-api`: A RESTful API endpoint to provide company data in JSON format.
- `frontend-refactor`: Separation of concerns between HTML, CSS, and JS.

### Modified Capabilities
- `frontend-data-integration`: Update the data loading mechanism to use asynchronous API calls instead of local variables.

## Impact

- `backend/`: New directory for PHP logic and database connection scripts.
- `frontend/code.html`: CSS removed and moved to `style.css`.
- `frontend/app.js`: Data fetching logic updated to use `fetch()`.
- `frontend/style.css`: New file for all styles.
- Database: New table `companies` created in SQL Server.
