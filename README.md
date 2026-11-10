# 🌌 Akshay Krishna Ks — Interactive Cosmic Developer Portfolio

A futuristic, award-winning-style creative developer portfolio built with **React**, **TypeScript**, **Tailwind CSS**, and **Canvas animations**.

Inspired by cosmic orbital mechanics and minimal dot-matrix typography.

---

## ⚡ Quick Start

### 1. Start Development Server
```bash
npm run dev
```
Open **[http://localhost:3456](http://localhost:3456)** in your browser.

> **Note on Windows PowerShell:** If `npm` is not found, either:
> - Prefix commands: `C:\Users\admin\tools\node\npm.cmd run dev`
> - Or add Node to your permanent User PATH:
>   ```powershell
>   [System.Environment]::SetEnvironmentVariable("PATH", $env:PATH + ";C:\Users\admin\tools\node", [System.EnvironmentVariableTarget]::User)
>   ```

### 2. Build for Production
```bash
npm run build
```
Creates an optimized, minified production bundle in `/dist`.

### 3. Preview Production Build
```bash
npm run preview
```

---

## 🎨 How to Edit Content

**All personal info, skills, projects, and contact channels are configured in one central file:**

📁 **[`src/data/portfolioData.ts`](src/data/portfolioData.ts)**

Open this file and replace the `EDITABLE PLACEHOLDER` values:

```typescript
export const portfolioData = {
  personal: {
    name: 'Akshay Krishna Ks',
    title: 'Computer Science and Artificial Intelligence Student',
    institution: 'Thejus Engineering College',
    location: 'Thrissur, Kerala, India',
    email: 'akshay.krishna.placeholder@example.com', // ← REPLACE WITH YOUR REAL EMAIL
    github: 'https://github.com/your-username',       // ← REPLACE
    linkedin: 'https://linkedin.com/in/your-profile', // ← REPLACE
    twitter: 'https://x.com/your-handle',            // ← REPLACE
    // ...
  },
  skills: [
    // Add/remove real technologies you know
  ],
  projects: [
    // Replace placeholder experiments with real projects
  ],
};
```

Any change to `portfolioData.ts` immediately updates the entire site via Vite HMR.

---

## 🏗️ Architecture & Features

| Feature | Implementation | Description |
|---|---|---|
| **Page Loader** | [`PageLoader.tsx`](src/components/PageLoader.tsx) | Cinematic 2.2s countdown with 5 concentric counter-rotating orbital rings and live status text |
| **Dot-Matrix Hero** | [`PixelNameAnimation.tsx`](src/components/PixelNameAnimation.tsx) | Pure Canvas physics simulation — letters are drawn as tiny square particles that scatter away from the cursor and bounce back with spring damping |
| **Cosmic Background** | [`CosmicBackground.tsx`](src/components/CosmicBackground.tsx) | Parallax starfield, nebula gradient glows, and 5 glowing orbital rings with satellite dots |
| **Custom Cursor** | [`CustomCursor.tsx`](src/components/CustomCursor.tsx) | Smooth lerp-interpolated neon pink ring with trailing dot (automatically disabled on touch devices) |
| **Magnetic Buttons** | [`MagneticButton.tsx`](src/components/MagneticButton.tsx) | Micro-interactive buttons that smoothly attract toward the cursor on hover |
| **Scroll Progress** | [`ScrollProgress.tsx`](src/components/ScrollProgress.tsx) | Cosmic gradient bar tracking reading progress across the page |
| **Project Preview** | [`ProjectsSection.tsx`](src/components/ProjectsSection.tsx) | Large editorial list; hovering any row reveals a smooth cursor-following card preview; clicking opens modal |
| **Project Modal** | [`ProjectModal.tsx`](src/components/ProjectModal.tsx) | Detailed view with gradient banner, full specs, tags, and escape/backdrop dismiss |
| **Contact Transmission** | [`ContactSection.tsx`](src/components/ContactSection.tsx) | One-click email copy, interactive form with `canvas-confetti` celebration on submit |

---

## 🎨 Design System & Colors

- **Deep Space:** `#080914`
- **Midnight Navy:** `#11102F`
- **Soft Light:** `#F0EDFF`
- **Neon Pink:** `#FF83B4` (Accent 1)
- **Electric Violet:** `#BD65FF` (Accent 2)
- **Neon Mint:** `#54E6AB` (Accent 3)
- **Cosmic Orange:** `#FFB66D` (Accent 4)

**Fonts loaded via Google Fonts:**
- `Silkscreen` — Pixel typography
- `Space Grotesk` — Display headings
- `JetBrains Mono` — Code snippets, telemetry
- `Plus Jakarta Sans` — Reading / body text

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)
1. Push this repository to GitHub
2. Import repo at [vercel.com/new](https://vercel.com/new)
3. Framework Preset: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Click **Deploy**

### Deploy to Netlify
1. Connect repo at [app.netlify.com](https://app.netlify.com)
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Click **Deploy Site**

---

Designed & Built for **Akshay Krishna Ks** — Computer Science & AI, Thejus Engineering College.
