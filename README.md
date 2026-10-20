# Manish Pal — Embedded Systems Portfolio

A personal portfolio for **Manish Pal**, a B.Tech Electronics & Communication Engineering student focused on embedded systems, firmware, electronics, Linux, and edge AI.

The site presents hands-on experience, education, skills, research interests, and project work—including concepts and active work clearly labelled by status.

- **Portfolio:** [mr-manish-pal.github.io/portfolio](https://mr-manish-pal.github.io/portfolio/)
- **GitHub:** [@Mr-Manish-Pal](https://github.com/Mr-Manish-Pal)

## Highlights

- Responsive editorial theme using warm cream (`#F4EFE7`), burgundy (`#54202D`), mahogany (`#38201F`), soft stone (`#E9E0D6`), and bronze (`#B58A68`); Times New Roman body typography with a Palatino-style display face for headings.
- A lazily loaded, low-poly Three.js workbench study with stylized embedded boards, an OLED waveform concept, pointer/scroll parallax, off-screen pausing, and a CSS fallback when WebGL is unavailable.
- Server-rendered HTML generated at build time so page content and metadata are present before client-side JavaScript runs.
- Filterable project cards with problem statements, current approaches, openly marked outcomes, and additional technical details.
- Education, practical electronics experience, achievements, workshop information, and research interests.
- Distinct project-specific engineering diagrams that are explicitly labelled illustrative, not to scale or live sensor data.
- Smooth section navigation, observer-triggered staggered reveals, scroll-linked depth where supported, restrained signal and card motion, reduced-motion support, keyboard-accessible navigation, and client-side project interactions.
- Accessible contact form with validation and success/error feedback when a Formspree endpoint is configured.
- Open Graph/social metadata, JSON-LD, a branded social preview, favicon set, web manifest, sitemap, and robots file.

## Tech stack

- React and TypeScript
- Three.js (lazy-loaded for the hero workbench scene)
- Vite
- Custom responsive CSS
- Lucide icons

## Run locally

### Requirements

- Node.js 20.19+ or 22.12+
- npm

### Install and start

```bash
git clone https://github.com/Mr-Manish-Pal/manish-portfolio.git
cd manish-portfolio
npm install
npm run dev
```

Vite prints the local development URL. To configure the optional form and production URL, copy `.env.example` to `.env.local` and fill in the values described below.

## Build and preview

```bash
npm run build
npm run preview
```

The build type-checks the application, creates the optimized Vite bundle in `dist/`, then server-renders the portfolio into `dist/index.html`. It also generates `sitemap.xml` and `robots.txt`.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Type-check, build, and pre-render the site |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |

## Deploy to Vercel

1. Import the repository into Vercel and keep the Vite framework preset.
2. Set the build command to `npm run build` and the output directory to `dist`.
3. Add `VITE_FORMSPREE_ENDPOINT` in the Vercel project environment settings after creating a Formspree form.
4. Vercel’s `VERCEL_PROJECT_PRODUCTION_URL` is used automatically to generate the production canonical URL, Open Graph URL, sitemap, and robots file. If that variable is unavailable, set `VITE_SITE_URL` to the actual HTTPS production domain (for example, `https://your-project.vercel.app`).
5. Deploy. Check the deployed page source for rendered portfolio content and verify `/sitemap.xml`, `/robots.txt`, and `/site.webmanifest`.

For local production-domain metadata, set `VITE_SITE_URL` in `.env.local`. Do not commit `.env.local`.

## Contact form

The form validates required name, email, and message fields in the browser. To enable message delivery:

1. Create a form in Formspree and copy its endpoint.
2. Set `VITE_FORMSPREE_ENDPOINT` to that endpoint in `.env.local` and in Vercel’s environment settings.
3. Rebuild and deploy. The form reports a success state only after the service accepts the submission; network and service errors are shown to the visitor.

Until configured, the form clearly reports that it is not connected and points visitors to GitHub instead. A Formspree endpoint is not assumed.

## Content and placeholders

Portfolio data lives in [`src/data/content.ts`](./src/data/content.ts); layout and interactions live in [`src/App.tsx`](./src/App.tsx). Update those files to change project status, technology tags, experience, skills, links, or profile copy.

Review the remaining confirmation items before announcing the site:

- The resume PDF is available at `public/resume/Manish_Pal_Resume.pdf`; the download action points to that file.
- Add actual results, demos, links, hardware details, certificate issuers/dates, and workshop or achievement details only when confirmed.
- Workshop date and event status remain unconfirmed.
- Project photographs are not yet available; labelled conceptual diagrams are used instead.
- Set `VITE_SITE_URL` to the production Vercel domain only if Vercel’s production URL variable is not available.
- Set `VITE_FORMSPREE_ENDPOINT` to enable form delivery.

Project statuses and outcomes are stated conservatively; update them only after validation.

## Project structure

```text
.
├── public/
│   ├── favicon.svg
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── og-image.png        # 1200 × 630 share card
│   ├── og-image.svg
│   ├── resume/
│   │   └── Manish_Pal_Resume.pdf
│   └── site.webmanifest
├── scripts/
│   └── prerender.mjs       # Generates static HTML and deployment-aware SEO files
├── src/
│   ├── data/content.ts     # Profile, skills, projects, and journey content
│   ├── App.tsx             # Semantic sections, filters, form, and interactions
│   ├── App.css             # Design tokens, components, motion, and breakpoints
│   ├── entry-server.tsx    # React server-rendering entry point
│   ├── index.css           # Root styles
│   └── main.tsx            # Client hydration entry point
├── index.html              # SEO metadata and rendered app insertion point
├── .env.example            # Optional public site and form settings
└── package.json            # Dependencies and npm scripts
```
