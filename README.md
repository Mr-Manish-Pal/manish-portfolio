# Manish Pal | Embedded Systems Engineer

<p align="center">
  <b>Embedded Systems • Firmware • Electronics • Edge AI</b>
</p>

<p align="center">
  <a href="https://github.com/Mr-Manish-Pal">GitHub</a> •
  <a href="https://manish-portfolio-beta-tawny.vercel.app">Portfolio</a>
</p>

---

## About

I am an Electronics & Communication Engineering student focused on building
practical embedded systems that combine hardware, firmware, sensing, and
intelligent edge processing.

My work focuses on understanding systems from the circuit and sensor level
to firmware, communication, data processing, and real-world deployment.

---

## Core Areas

- Embedded Systems & Firmware Development
- Microcontroller-Based System Design
- Sensor Interfacing & Data Acquisition
- IoT & Wireless Communication
- Edge AI / TinyML
- Digital Signal Processing
- Electronics & PCB Debugging
- Linux-Based Development
- Hardware–Software Integration

---

## Technical Stack

**Languages**
`C` `C++` `Python`

**Microcontrollers & Platforms**
`ESP32` `STM32` `Arduino` `Raspberry Pi` `Raspberry Pi Pico`

**Development**
`VS Code` `PlatformIO` `Git` `GitHub` `Linux`

**Electronics**
`KiCad` `Multimeter` `Oscilloscope` `PCB Debugging`

**Embedded Technologies**
`UART` `I2C` `SPI` `ADC` `PWM` `GPIO` `MQTT`

---

## Selected Projects

### TinyML Predictive Maintenance
ESP32-based edge monitoring system using MPU6050 vibration data, with planned
DSP/FFT, TinyML anomaly detection, FreeRTOS and MQTT integration.

### Smart Energy Monitor
ESP32-based electrical monitoring system using ZMPT101B and ACS712 for
voltage, current, power, energy and related electrical measurements.

**Repository:**  
https://github.com/Mr-Manish-Pal/smart-energy-monitor

### Low-Cost Digital Oscilloscope
STM32-based experimental oscilloscope focused on ADC-based signal acquisition,
sampling and waveform processing.

### Smart Attendance System
Embedded + computer vision system using ESP-CAM and Raspberry Pi for classroom
monitoring and seat occupancy analysis.

### Portable Thermal Camera
STM32-based thermal imaging system exploring embedded sensor interfacing,
data acquisition and image processing.

---

## Engineering Experience

Hands-on experience with electronics troubleshooting and hardware debugging,
including amplifiers, home theatre systems, antenna systems, PCB-level
diagnostics and electronic device repair.

Alongside practical hardware work, I develop academic and personal projects
in embedded systems and intelligent hardware.

---

## Research Interests

`Edge AI` `TinyML` `Embedded Security` `Hardware Security`
`AI + Hardware` `Low-Power Computing` `Semiconductor Technology`
`FinFET` `Intelligent Sensing`

---

## Current Direction

Currently developing deeper expertise in:

**Embedded C → Microcontrollers → RTOS → DSP → Embedded AI → System Design**

---

## Connect

**Portfolio:**  
https://manish-portfolio-beta-tawny.vercel.app

**GitHub:**  
https://github.com/Mr-Manish-Pal

---

> **Build. Debug. Measure. Understand. Improve.**

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
