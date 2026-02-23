<h1 align="center">
  <img src="https://github.com/VirreT/BioLearn-AI/blob/main/assets/icon-popup.png" alt="Logo" width="128" height="128"> BioLearn-AI
</h1>

Learn biology with AI-powered examples, an embeddable website, and a small server/extension toolkit. This repository contains the UI, server helpers, and a browser-extension-style interface to experiment with interactive learning tools.

---

## Features

- Clean, single-file website interface in `website/` for demos and interactive lessons.
- Small Node.js helper server under `Server/MAIN/` for AI-backed responses.
- A lightweight extension-like UI in `extension/` for quick popup interactions.
- Assets and animations for a friendly learning experience.

## Repository structure

- `assets/` — icons and images used across the project.
- `extension/` — popup UI, extension stylesheet and scripts.
- `Server/MAIN/` — Node.js server, `server.js` and `package.json` to run local API helpers.
- `website/` — demo pages, front-end scripts and styles.

## Quick start

Prerequisites:

- Node.js (v14+ recommended)

### Run the simple helper server

1. Open a terminal at `Server/MAIN/`.
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the same folder and add your API key (if required by your setup):

```env
OPENAI_API_KEY="YOUR_KEY_HERE"
```

4. Start the server:

```bash
node server.js
```

The server provides example endpoints used by the website and extension UI.

### Open the demo website

You can open `localhost:8080` directly in your browser for a lightweight demo, or serve it from a static host.

### Try the extension UI

The `extension/` folder contains a popup and supporting scripts — load it into a Chromium-based browser as an unpacked extension for quick testing.

## License

This project includes a `LICENSE` file in the repository root — please check it for license details.