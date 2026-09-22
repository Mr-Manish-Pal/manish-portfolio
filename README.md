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
