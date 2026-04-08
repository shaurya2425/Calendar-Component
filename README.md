# Calendar Component

A production-ready, self-contained React calendar component built with Vite, Tailwind CSS, Framer Motion, and date-fns.

This repo is intentionally focused on one reusable feature module: a clean, interactive calendar UI with date range selection, persistent notes storage, and polished motion.

## Project Summary

This project delivers:

- **Date range selection** with capsule-style visual continuity.
- **Today highlighting** with a distinct visual state.
- **Hover preview** before range finalization.
- **Month navigation** with animated transitions.
- **Persistent notes** saved to localStorage.
- **Minimal architecture** with only the files required for the calendar.

## Core Features

### Calendar Interaction
- Single-click to start selection.
- Hover to preview a date range.
- Second click finalizes the range.
- Clicking an already selected node clears the selection.
- Fixed 6-row grid layout prevents month layout shifting.

### Notes System
- Notes attach to the currently selected date or date range.
- Notes are persisted using localStorage.
- The notes panel shows save feedback and character count.

### UX & Visual Design
- Two-panel layout: hero visual panel + calendar panel.
- Neon-accent interaction system for selection and hover states.
- Clean typography and spacing for readability.
- Selectable range and date states are visually consistent.

### Motion & Interaction
- Smooth slide/fade transitions across month changes.
- Subtle hover animation on date cells.
- Motion improves clarity without overwhelming the UI.

## Project Structure

```
src/
  App.jsx
  main.jsx
  index.css
  styles/
    variables.css
  assets/
    calendar_hero.png
    hero.png
    react.svg
    vite.svg
  components/
    Calendar/
      BinderStrip.jsx
      CalendarContainer.jsx
      CalendarGrid.jsx
      DateCell.jsx
      HeroSection.jsx
      NotesPanel.jsx
  utils/
    dateUtils.js
    holidays.js
```

## Key Files

- `App.jsx` — entry layout and visual wrapper for the calendar component.
- `main.jsx` — React application bootstrap.
- `CalendarContainer.jsx` — central state hub for current month, selection, hover state, notes, and persisted storage.
- `CalendarGrid.jsx` — renders the full calendar grid and handles navigation controls.
- `DateCell.jsx` — atomic date cell with selection, current-day, and hover logic.
- `HeroSection.jsx` — left-side visual hero presentation with month/year branding.
- `NotesPanel.jsx` — contextual notes panel with save state and journal entry support.
- `dateUtils.js` — date formatting and calendar grid generation utilities.
- `holidays.js` — holiday dataset used for date marker rendering.

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Install dependencies
```bash
npm install
```

### Run locally
```bash
npm run dev
```

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

## How to Use

1. Click a date to start a selection.
2. Hover over another date to preview the range.
3. Click the end date to confirm the range.
4. Click the selected node again to clear selection.
5. Enter notes for the selected date/range in the journal panel.

## Validation

This project is validated for:

- successful production build via `npm run build`
- working calendar render and range selection
- smooth month transitions
- proper notes persistence through refresh
- minimal, clean repository structure

## Why This Approach

This component is built as a lightweight, reusable calendar module with a strong separation between UI and behavior. The focus is on:

- **clarity**: easy-to-understand selection and note behavior
- **stability**: fixed layout across months
- **maintainability**: small number of purpose-driven files
- **experience**: polished motion and visual feedback

## Notes

- The README is intentionally comprehensive to support future integration.
- The repository is kept minimal and production-ready.
- No unrelated pages, dashboards, or demo components are included.

## License

This repository is unlicensed by default. Add a license if you plan to publish or distribute this component.
