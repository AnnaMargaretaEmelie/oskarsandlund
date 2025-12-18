This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

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
