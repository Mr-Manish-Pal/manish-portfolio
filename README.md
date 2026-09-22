# Manish Pal — Portfolio

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
  <img src="https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
</p>

## About

Personal portfolio website showcasing my work, projects, technical skills,
research interests, and experience as an Electronics & Communication
Engineering student focused on **Embedded Systems and Edge AI**.

## Built With

- **React** — UI development
- **TypeScript** — Type-safe development
- **Vite** — Development & production build tooling
- **Tailwind CSS** — Responsive styling
- **Framer Motion** — UI animations
- **Git & GitHub** — Version control
- **Vercel** — Deployment

## Highlights

- Responsive engineering-focused design
- Project showcase with technical details
- Embedded systems and Edge AI focus
- GitHub integration
- Production-ready build
- Optimized for desktop and mobile

## Live

🌐 **Portfolio:**  
https://manish-portfolio-beta-tawny.vercel.app

## Repository

💻 **GitHub:**  
https://github.com/Mr-Manish-Pal/manish-portfolio

---

<p align="center">
  Built with React, TypeScript & Vite.
</p>

# Manish Pal Portfolio

A React, Vite, and TypeScript portfolio focused on embedded systems, electronics, firmware, Linux, and edge AI.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The production output is generate in `dist/`.

## Deploy to GitHub Pages

1. Build with `npm run build`.
2. Publish `dist/` using a GitHub Pages workflow or static hosting action.
3. If the site is served from a repository subpath, set Vite's `base` option to that path before building.

## Deploy to Vercel

Import the repository into Vercel with these settings:

- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

## Content notes

- Project, skill, and research content lives in `src/data/content.ts`.
- Resume links point to `/resume/Manish_Pal_Resume.pdf`, but no fake PDF is included. Add the real resume at that path when ready.
- Email and LinkedIn remain placeholders until confirmed.
- The contact form is frontend-only and has no configured backend.

## Stack

React, TypeScript, Vite, Framer Motion, Lucide React, and CSS.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
