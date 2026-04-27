## Context

The current implementation uses a single `code.html` file with embedded CSS and a large JSON array in `app.js`. This makes the project hard to maintain and scale. We need to move the data to a SQL Server database and create a PHP backend to serve this data, while also cleaning up the frontend structure.

## Goals / Non-Goals

**Goals:**
- Move data to SQL Server.
- Implement PHP API for company data.
- Separate CSS into `style.css`.
- Update `app.js` to use `fetch()`.
- Ensure the navigation bar is fully restored and functional.

**Non-Goals:**
- Implementing user authentication or admin panels (out of scope for this task).
- Changing the visual design (unless necessary for the nav bar fix).
- Using a frontend framework (keep it Vanilla JS as per previous design).

## Decisions

- **Database Connection**: Use PHP Data Objects (PDO) for database connectivity. This provides a consistent interface for accessing the database and supports SQL Server.
- **Data Format**: The API will return JSON objects with the same schema as the current `companiesData` array to minimize changes to `app.js`.
- **CSS Refactor**: Extract all CSS from `code.html` into `style.css` and link it in the `<head>`.
- **Navigation Bar**: Verify the navigation bar's HTML and ensure it is properly styled and visible in the refactored layout. The user specifically requested to "bring back the navigation bar", so we will prioritize its visibility and positioning.

## Risks / Trade-offs

- **Risk**: SQL Server connectivity from PHP requires specific extensions (sqlsrv or pdo_sqlsrv). We must ensure the environment is ready.
- **Trade-off**: Introducing a backend adds a dependency on a server environment, but it's necessary for the data storage requirements.
