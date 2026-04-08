# Calendar Component

A clean, production-ready React calendar component built with Vite, Tailwind CSS, and Framer Motion. This repository contains a polished, minimal calendar UI with date range selection, persistent notes, holiday support, and responsive animation.

## Overview

The project focuses on a single functional calendar feature set:

- date range selection with capsule-style highlights
- today and selected date state handling
- notes panel for journal entries attached to the current selection
- localStorage persistence for notes
- month navigation with animated transitions
- clean, minimal component structure for fast deployment

## Key Implementation Choices

### React + Vite
- Chosen for fast development startup, optimized production build, and modern frontend patterns.
- Vite provides lean bundling and instant HMR for component-driven UI updates.

### Tailwind CSS
- Used for utility-first styling and rapid layout refinement.
- Keeps the component codebase compact and easy to maintain.

### Framer Motion
- Provides smooth animation for month transitions, hover effects, and visual selection feedback.
- Enhances perceived quality without adding heavy complexity.

### date-fns
- Used for safe date manipulation and formatting.
- Keeps date logic readable and lightweight.

## Project Structure

```
src/
  App.jsx
  main.jsx
  components/
    Calendar/
      CalendarContainer.jsx
      CalendarGrid.jsx
      DateCell.jsx
      HeroSection.jsx
      NotesPanel.jsx
  styles/
    variables.css
  utils/
    dateUtils.js
    holidays.js
  index.css
```

### What remains

- `components/Calendar/` contains the full calendar UI and behavior
- `utils/` contains date utilities and holiday definitions
- `styles/` contains global CSS variables and theme tokens
- `assets/` contains hero and image assets used by the calendar header

## Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- npm or yarn
- Optional: GitHub CLI for repo management

### Install dependencies

```bash
cd frontend
npm install
```

### Start local development server

```bash
npm run dev
```

Open the provided local URL in your browser. The calendar component should render immediately.

### Build for production

```bash
npm run build
```

### Preview production build locally

```bash
npm run preview
```

## Features

- `CalendarContainer.jsx` – orchestrates date selection, navigation, notes, and localStorage save behavior.
- `CalendarGrid.jsx` – renders the calendar grid, weekday labels, and handles date hover/click events.
- `DateCell.jsx` – renders each date cell with selection, today highlight, and hover behavior.
- `HeroSection.jsx` – displays the large month hero header with dynamic current year.
- `NotesPanel.jsx` – stores notes attached to the current selection and persists them in localStorage.

## Usage

- Click a date to start a selection.
- Hover over a second date to preview a range.
- Click a second date to finalize the range.
- Click the selected node again to clear selection.
- Enter notes in the journal panel for the selected date/range.

## Validation

This project has been validated by:

- `npm run build` producing a successful production bundle
- preserving the calendar UI, selection behavior, and note persistence
- maintaining a minimal folder structure with no unused calendar files

## Notes

This repository is intentionally lean and focused on a single calendar feature set. The result is a production-ready component that can be integrated into larger apps or used as a standalone widget.

## License

This repository has not been assigned a license. Add one as needed for your use case.
