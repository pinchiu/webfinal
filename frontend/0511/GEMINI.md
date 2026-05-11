# GEMINI.md - 404 Biotech Platform

This file provides instructional context for the 404 Biotech platform, a specialized human resources and market intelligence portal for the Taiwan biotechnology and bioinformatics industry.

## Project Overview

*   **Purpose:** To connect talent with leading biotech firms in Taiwan while providing transparent market data and financial insights.
*   **Tech Stack:** 
    *   **Frontend:** HTML5, CSS3, Vanilla JavaScript.
    *   **Libraries:** 
        *   [GSAP](https://gsap.com/) (GreenSock Animation Platform) for high-performance scroll-driven animations and reveals.
        *   [Lucide Icons](https://lucide.dev/) & [Remix Icons](https://remixicon.com/) for iconography.
    *   **Design Philosophy:** "Bio-Digital Frontier" - A premium OLED dark mode aesthetic using a Zinc-950 base with Emerald-500 (`#10b981`) and Cyan-500 (`#06b6d4`) accents.

## Directory Structure

*   `index.html`: The main entry point containing the structural layout and content (Hero, Market, Companies, Sectors, Verify).
*   `styles.css`: Custom stylesheets for the unique biotech theme, including advanced CSS animations and responsive grid layouts.
*   `script.js`: The core logic for interactive components, DNA animations, GSAP scroll triggers, and the AI/Data analysis simulator.
*   `.gemini/`: Workspace configuration and skill data.

## Key Features & Components

### 1. Navigation (Floating Pill)
*   A responsive, centered pill-shaped navbar that collapses into a "scroll-nav" mode on downward scroll (triggered after 400px).
*   Prioritizes search/filters in the collapsed state for better UX.

### 2. Market Intelligence Dashboard
*   Visualizes real-time (simulated) financial metrics like Capitalization, Gross Margin, and Salary Competitiveness across different biotech sectors.
*   Utilizes a bento-grid and list-based layouts for high information density.

### 3. Bio-Interactive Hero
*   Features a custom-animated DNA double helix and a "scanning" effect simulation.
*   Includes a "Data Analysis" tool that simulates matching or analyzing biotech entities based on user input.

### 4. Company Directory
*   A categorized list of major Taiwanese biotech firms (Genomics, CDMO, Drug Dev, etc.).
*   Includes client-side filtering by location (Taipei, New Taipei, Hsinchu) and visual feedback for active filters.

> **Note:** The "Sectors Map" and "Talent Verification" sections are currently hidden to prioritize the Market Intelligence and Financial data UX.

## Building and Running

This is a static frontend project.
*   **Run:** Open `index.html` in any modern web browser.
*   **Deploy:** Can be hosted on any static web hosting service (GitHub Pages, Vercel, Netlify).

## Development Conventions

*   **Animations:** Use GSAP for all scroll-triggered reveals. Target classes: `.reveal-up`, `.reveal-left`, `.reveal-right`.
*   **Icons:** Use `data-lucide` attributes for SVG icons and `ri-` classes for Remix icons.
*   **Styling:** 
    *   Prefer CSS variables defined in `:root`.
    *   Maintain the high-contrast dark mode; avoid introducing bright backgrounds.
    *   Ensure all interactive elements have `cursor: pointer` and smooth hover transitions.

## Future TODOs
- [ ] Implement actual backend integration for real-time stock data.
- [ ] Complete the "Company Profile" detailed pages for each enterprise.
- [ ] Add a formal contact form validation logic.
