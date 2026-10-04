# Manish Pal — Portfolio

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
  <img src="https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">
  <img #include <Adafruit_SSD1306.h>
#include <Wire.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include "secrets.h" // WiFi Configuration (WiFi name and Password)
#define SCREEN_WIDTH 128 // OLED display width, in pixels
#define SCREEN_HEIGHT 64 // OLED display height, in pixels
#define OLED_RESET     -1 // Reset pin # (or -1 if sharing Arduino reset pin)
#define SCREEN_ADDRESS 0x3C ///< See datasheet for Address; 0x3D for 128x64, 0x3C for 128x32
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

const char* ssid = "Wokwi-GUEST";
const char* password = "";

// Powered by CoinDesk - https://www.coindesk.com/price/bitcoin
const String url = "http://api.coindesk.com/v1/bpi/currentprice/BTC.json";
const String historyURL = "http://api.coindesk.com/v1/bpi/historical/close.json";
const String cryptoCode = "BTC";

// 'icons8-bitcoin-24', 24x24px
const unsigned char bitcoinIcon [] PROGMEM = {
0x00, 0x7e, 0x00, 0x03, 0xff, 0xc0, 0x07, 0x81, 0xe0, 0x0e, 0x00, 0x70, 0x18, 0x28, 0x18, 0x30, 
0x28, 0x0c, 0x70, 0xfc, 0x0e, 0x60, 0xfe, 0x06, 0x60, 0xc7, 0x06, 0xc0, 0xc3, 0x03, 0xc0, 0xc7, 
0x03, 0xc0, 0xfe, 0x03, 0xc0, 0xff, 0x03, 0xc0, 0xc3, 0x83, 0xc0, 0xc1, 0x83, 0x60, 0xc3, 0x86, 
0x60, 0xff, 0x06, 0x70, 0xfe, 0x0e, 0x30, 0x28, 0x0c, 0x18, 0x28, 0x18, 0x0e, 0x00, 0x70, 0x07, 
0x81, 0xe0, 0x03, 0xff, 0xc0, 0x00, 0x7e, 0x00
};

HTTPClient http;
String lastPrice;

void setup() {
  Serial.begin(115200);

  if (!display.begin(SSD1306_SWITCHCAPVCC, SCREEN_ADDRESS)) {
    Serial.println(F("SSD1306 allocation failed"));
    for (;;); // Don't proceed, loop forever
  }

  display.clearDisplay();
  display.setTextSize(1);           
  display.setTextColor(SSD1306_WHITE);      
  display.setCursor(0,0); 
  display.println("Connecting to WiFi...");
  display.display();

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
  }

  Serial.print("CONNECTED to SSID: ");
  Serial.println(ssid);

  display.print("Connected to ");
  display.println(ssid);
  display.display();
  delay(5000);
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("Getting current data...");

    http.begin(url);
    int httpCode = http.GET();
    Serial.print("HTTP Code: ");
    Serial.println(httpCode);
    if (httpCode > 0) {
      StaticJsonDocument<768> doc;
      DeserializationError error = deserializeJson(doc, http.getString());

      if (error) {
        Serial.print(F("deserializeJson failed: "));
        Serial.println(error.f_str());
        delay(2500);
        return;
      }

      Serial.print("HTTP Status Code: ");
      Serial.println(httpCode);

      String BTCUSDPrice = doc["bpi"]["USD"]["rate_float"].as<String>();
      if(BTCUSDPrice == lastPrice) {
        Serial.print("Price hasn't changed (Current/Last): ");
        Serial.print(BTCUSDPrice);
        Serial.print(" : ");
        Serial.println(lastPrice);
        delay(1250);
        return;
      } else {
        lastPrice = BTCUSDPrice;
      }
      String lastUpdated = doc["time"]["updated"].as<String>();
      http.end();

      Serial.println("Getting history...");
      StaticJsonDocument<1536> historyDoc;
      http.begin(historyURL);
      int historyHttpCode = http.GET();
      DeserializationError historyError = deserializeJson(historyDoc, http.getString());

      if (historyError) {
        Serial.print(F("deserializeJson(History) failed: "));
        Serial.println(historyError.f_str());
        delay(2500);
        return;
      }

      //Display Header
//      display.clearDisplay();
//      display.setTextSize(1);
//      printCenter("BTC/USD", 0, 0);
      display.clearDisplay();
      display.drawBitmap((128/2) - (24/2), 0, bitcoinIcon, 24, 24, WHITE);
      display.display();

      //Display BTC Price
      display.setTextSize(1);
      printCenter("$" + BTCUSDPrice, 0, 32);

      //Display 24hr. Percent Change
      double yesterdayPrice = historyDoc["bpi"]["2021-03-20"].as<double>();
      bool isUp = BTCUSDPrice.toDouble() > yesterdayPrice;
      double percentChange;
      String dayChangeString = "24hr. Change: ";
      if (isUp) {
        percentChange = ((BTCUSDPrice.toDouble() - yesterdayPrice) / yesterdayPrice) * 100;
      } else {
        percentChange = ((yesterdayPrice - BTCUSDPrice.toDouble()) / yesterdayPrice) * 100;
        dayChangeString = dayChangeString + "-";
      }
      display.setTextSize(1);
      dayChangeString = dayChangeString + percentChange + "%";
      printCenter(dayChangeString, 0, 55);

      display.display();
      http.end();
    }
    delay(1250);
  }
}

void printCenter(const String buf, int x, int y)
{
  int16_t x1, y1;
  uint16_t w, h;
  display.getTextBounds(buf, x, y, &x1, &y1, &w, &h); //calc width of new string
  display.setCursor((x - w / 2) + (128 / 2), y);
  display.print(buf);
}src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white">
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
