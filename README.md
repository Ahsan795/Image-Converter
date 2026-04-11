# Free File Converter

A Next.js web app for converting images and documents directly in the browser — no signup, no server uploads.

## Project Structure

```
file-converter/
├── app/                        # Next.js App Router
│   ├── layout.js               # Root layout with metadata
│   ├── page.js                 # Main page (tabs, features section)
│   └── globals.css             # Global styles (converted from style.css)
├── components/
│   ├── ImageConverter.js       # Image upload + conversion logic (React)
│   └── DocumentConverter.js    # Document upload + conversion logic (React)
├── index.html                  # Original HTML file
├── style.css                   # Original CSS file
├── script.js                   # Original JS file
├── file-converter.html         # Original standalone HTML version
├── next.config.js
├── package.json
└── jsconfig.json
```

## Getting Started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- **Image Converter**: Convert PNG, JPG, JPEG, WebP, BMP, GIF files to JPG, JPEG, PNG, WebP, or BMP
- **Document Converter**: Convert TXT → PDF or TXT, with DOCX support note
- **100% client-side**: All processing happens in the browser — files never leave your device
- **Drag & drop**: Drag files onto the upload area or click to browse
- **Multi-file**: Convert multiple files at once with progress tracking

## Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- React 18
- [jsPDF](https://github.com/parallax/jsPDF) for PDF generation
- Plain CSS (no Tailwind or UI library needed)
