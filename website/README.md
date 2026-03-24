# Documentation website

This folder contains the [Docusaurus](https://docusaurus.io) site for **react-native-storage-inspector**.

## Run locally

```bash
cd website
npm install
npm run start
```

If `npm install` fails with `ENOTEMPTY` or rename errors (e.g. after an interrupted install), remove `node_modules` and try again:

```bash
rm -rf node_modules
npm install
```

Open [http://localhost:3000](http://localhost:3000). The site will reload when you edit docs or config.

## Build

```bash
npm run build
```

Output is in `website/build/`. Deploy that folder to GitHub Pages, Vercel, Netlify, or any static host.

## Structure

- **`docs/`**:Markdown documentation (Introduction, Installation, Usage, API, etc.).
- **`src/pages/index.js`**:Home page (hero, features, demo placeholder).
- **`src/css/custom.css`**:Custom theme and demo placeholder styles.
- **`static/img/`**:Logo and assets.
- **`docusaurus.config.js`**:Site title, base URL, navbar, footer.
- **`sidebars.js`**:Doc sidebar order.

## Demo

The [Demo](/docs/demo) page and the home page include a **placeholder** for a live demo (e.g. embedded simulator, GIF, or link to Expo Snack). You can replace it with your own content.
