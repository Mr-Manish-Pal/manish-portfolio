# Manish Pal — Embedded Systems Portfolio

Personal portfolio for **Manish Pal**, a B.Tech Electronics & Communication Engineering student interested in embedded systems, firmware, electronics, Linux, and Edge AI.

The site brings together selected projects, technical interests, hands-on experience, education, and contact information in one responsive portfolio.

**Live portfolio:** [mr-manish-pal.github.io/portfolio](https://mr-manish-pal.github.io/portfolio/)

**GitHub:** [@Mr-Manish-Pal](https://github.com/Mr-Manish-Pal)

## Portfolio highlights

- Responsive layout with dedicated About, Skills, Projects, Research, Experience, Certifications, and Contact sections.
- Project cards with expandable details about the problem, approach, hardware, software, challenges, and next steps.
- Subtle motion and technical illustrations, with reduced-motion preferences respected.
- Resume download link and GitHub profile link.
- Student-focused content that distinguishes active work, concepts, and planned projects.

## Featured project areas

| Project | Focus |
| --- | --- |
| TinyML Predictive Maintenance System | ESP32, vibration sensing, signal processing, and TinyML |
| Smart Energy Monitor | Embedded sensing, electrical measurements, and IoT |
| Low-Cost Digital Oscilloscope | STM32, ADC sampling, and signal visualization |
| Universal Microcontroller Programmer | MCU programming and debugging workflows |
| Smart Attendance System | Computer vision and structured attendance records |
| Portable Thermal Camera | Embedded sensing and visualization |

Project status and descriptions are maintained in [`src/data/content.ts`](./src/data/content.ts).

## Built with

- React 19 and TypeScript
- Vite
- CSS
- Framer Motion
- Lucide icons

## Run locally

### Requirements

- Node.js 20.19+ or 22.12+
- npm

### Setup

```bash
git clone https://github.com/Mr-Manish-Pal/manish-portfolio.git
cd manish-portfolio
npm install
npm run dev
```

Open the local URL printed by Vite in your browser.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Type-check and create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |

## Project structure

```text
.
├── public/                 # Static assets, including the resume
├── src/
│   ├── data/content.ts     # Portfolio projects, skills, and research topics
│   ├── App.tsx             # Page sections and interactive components
│   ├── App.css             # Layout, components, and visual theme
│   ├── index.css           # Global styles and accessibility states
│   └── main.tsx            # React application entry point
├── index.html              # Document metadata and app mount point
└── package.json            # Dependencies and npm scripts
```

## Updating portfolio content

- Edit project details, skills, research topics, and toolbox items in `src/data/content.ts`.
- Update section content and contact details in `src/App.tsx`.
- Add the resume PDF at `public/resume/Manish_Pal_Resume.pdf` to provide the linked download.
- Adjust global colors and component styling in `src/App.css` and `src/index.css`.

## Build for production

```bash
npm run build
npm run preview
```

The optimized site is generated in `dist/`.
