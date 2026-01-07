# Oskar Sandlund – Portfolio Website

## Project overview

This project is a portfolio website for a professional music producer and drummer.  
The goal of the project is to present services, a large catalogue of credits, and contact information in a clear, visually distinctive, and accessible way.

The website is built as a modern frontend application with a headless CMS setup, allowing the client to update content independently without code changes.

The project was developed as a solo final degree project (Examensarbete) during a six-week course in Front End Development.

---

## Purpose and goals

The purpose of the project was to:

- Design and develop a professional, responsive portfolio website
- Separate content management from presentation using a headless CMS
- Practice structured frontend architecture, accessibility, and deployment
- Deliver a realistic, production-like project within a limited timeframe

Key goals included:

- Clear visual identity
- Accessible and keyboard-navigable UI
- Dynamic, editable content
- Clean and maintainable codebase

---

## Tech stack

### Frontend

- Next.js
- React
- TypeScript
- SCSS (with design tokens)

### Backend / CMS

- Sanity (Headless CMS)

### Deployment

- Vercel

### Other

- Git & GitHub (branching, pull requests)
- Lighthouse (accessibility testing)
- Spotify Web API (fetching album artwork for credits)
- Resend (email handling for contact form)

---

## Features

- Dynamic content fetched from Sanity (services, credits, site settings)
- Responsive layout for mobile, tablet, and desktop
- Accessible navigation (keyboard navigation and ARIA attributes)
- Filterable credits section
- Dynamic album artwork fetched from the Spotify Web API
- External links to Spotify
- Contact form with email delivery handled via Resend

---

## Accessibility and testing

Accessibility has been a core consideration throughout the project.

- Lighthouse accessibility audit (score: 100)
- Full keyboard navigation tested (Tab, Enter, Escape)
- Semantic HTML structure and ARIA labels where needed

Basic usability testing was also performed by letting users:

- Find a credit
- Listen to a track
- Locate contact information

Feedback from these tests was documented and used for small refinements.

---

## Project structure

The project follows a component-based structure with clear separation of concerns:

- Pages handle data fetching and layout composition
- Components are small, “dumb”, and reusable
- Styling is handled with SCSS modules and shared design tokens
- Global utilities are used for spacing, labels, and layout consistency

Design tokens are used consistently for colors, spacing, and typography.

---

## Environment variables

NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=

SANITY_API_TOKEN=

SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=

RESEND_API_KEY=

These variables are required both for local development and deployment.

---

## Getting started (development)

Clone the repository and install dependencies:

git clone https://github.com/AnnaMargaretaEmelie/oskarsandlund
npm install
npm run dev

Create a .env.local file and add the required environment variables.

Run the development server:

npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Production build

To build the project for production:

npm run build
npm run start

---

## Deployment

- The project is deployed using Vercel.

- The main branch is connected to Vercel

- Each merge to main triggers an automatic deployment

- Environment variables are configured in the Vercel dashboard

No manual deployment steps are required.

---

## Content management and backup strategy

All content is managed through Sanity.

### Backup strategy:

- Sanity datasets can be exported using the Sanity CLI (sanity dataset export)

- Media assets can be downloaded from the Sanity Media Library

- Content can be restored by importing a previously exported dataset

- This approach ensures that content can be backed up and restored independently of the frontend application.

---

## Limitations and future improvements

Due to time constraints, some features were deliberately deprioritized:

- Advanced animations (e.g. Framer Motion)

- Detailed credit detail pages

- Performance optimizations beyond baseline best practices

- Social media feeds (e.g. Instagram embed)

These features were considered but scoped out to ensure a stable and complete core product.

## Reflection

This project was developed using an agile approach with continuous prioritization and scope adjustments.

Pull requests and small, focused commits were used to maintain code quality and traceability.

Throughout the project, decisions were made to balance technical ambition with realistic delivery within the given timeframe.

## Author

Developed by Anna Viklund
Front End Development student

## Accessibility & Testing Checklist

This project follows basic WCAG 2.1 AA accessibility principles and includes the following considerations for the development phase:

### Color & Contrast

- [ ] Text and UI elements meet WCAG AA contrast ratios (4.5:1 for body text, 3:1 for large headings)
- [ ] Accent colors are never the sole carrier of meaning
- [ ] Outlined or decorative text is not used for body copy

### Typography & Readability

- [ ] Minimum body font size: 16px
- [ ] Clear hierarchy using semantic HTML (H1 → H2 → H3)
- [ ] Line height ensures readability (1.4–1.6)

### Navigation & Interaction

- [ ] All interactive elements have visible focus states
- [ ] Keyboard navigation works for all core functionality
- [ ] Links and buttons are distinguishable and include descriptive labels

### Semantic Structure

- [ ] Headings follow a logical order
- [ ] Buttons use `<button>` and navigational items use `<a>` elements
- [ ] ARIA attributes added only when necessary (not used to replace semantic HTML)

### Images & Media

- [ ] All informative images include descriptive alt text
- [ ] Decorative images include `alt=""`
- [ ] No auto-play audio; video will include controls

### Testing

- [ ] Manual keyboard test (Tab, Shift+Tab, Enter, Space)
- [ ] Responsive testing on mobile, tablet, and desktop
- [ ] Lighthouse accessibility audit run before deployment
