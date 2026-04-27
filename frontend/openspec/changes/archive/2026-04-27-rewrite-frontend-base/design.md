## Context

The current `code.html` file provides a static, beautifully styled UI for a Biotech HR portal. The goal of this project is to build an interactive frontend for the 404 Biotech platform, integrating the company list provided in `final.md`. The design needs to migrate from static HTML to an interactive implementation (using Vanilla JS or a lightweight approach) capable of loading data, rendering dynamic cards, and performing filtering/sorting on the client-side.

## Goals / Non-Goals

**Goals:**
- Maintain the exact visual aesthetic, CSS classes (Tailwind), and structure of the original `code.html`.
- Create a data-driven rendering mechanism for the company list.
- Implement client-side location filtering.
- Implement client-side salary sorting.
- Update the company card UI components to support new data attributes (e.g. financials, exact address, contact methods) without breaking the design.
- Define a base structure/state for a "Company Profile" view (e.g., via a modal or a separate page view, toggled by JS).

**Non-Goals:**
- Building a full backend API or database connection. Data will be mocked/embedded as a static JSON object for the frontend MVP based on `final.md`.
- Modifying the existing Tailwind configuration or fundamental layout structure beyond what's needed for the new data points.
- Complex state management libraries (like Redux or Zustand) - standard Vanilla JS or lightweight React/Vue is preferred if necessary, but plain JS is the default assumption here unless complexity dictates otherwise. We will proceed with Vanilla JS to keep it close to the existing `code.html`.

## Decisions

- **Data Representation**: Company data from `final.md` will be converted into a structured JSON array directly embedded in the JS for the initial prototype.
- **Framework**: Use Vanilla Javascript. The scope of interaction (filtering, sorting, rendering a list) is small enough that introducing a heavy framework like React might be overkill and complicate the migration of the static HTML, although it would make state management easier. Given the instruction to "rewrite the frontend base on this", we will create a structured JS file (`app.js`) to handle logic and use template literals to render the UI components.
- **Filtering Logic**: Locations will be handled as an array of active filters. The list updates dynamically when checkboxes change.
- **Sorting Logic**: Salary sorting will be a radio button selection that reorders the active (filtered) list.
- **Component Architecture**: We will split the HTML into logical JS rendering functions: `renderCompanyCard(company)`, `renderSidebar()`, `renderHeader()`.

## Risks / Trade-offs

- **Risk**: Moving from static HTML to JS-based rendering might cause a brief "flash of unstyled content" or empty state before JS execution.
  - Mitigation: Pre-render an empty container or a loading skeleton if needed, though for a small JSON dataset, it should be near-instantaneous.
- **Trade-off**: Using Vanilla JS over a framework means manual DOM manipulation and state tracking.
  - Mitigation: Keep state centralized in a simple `appState` object and use a single `render()` function triggered on state changes to mimic reactive principles.
