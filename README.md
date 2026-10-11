# UnityForge

A responsive Unity/C# learning website starter with:
- Unity beginner guides
- A six-part C# course roadmap
- Browser-based practice checks for three beginner exercises
- An AI tutor API endpoint that keeps the API key on the server

## Run locally
1. Install Node.js 18 or newer.
2. In this folder, run `npm install`
3. Set an API key in your terminal:
   - macOS/Linux: `export OPENAI_API_KEY="your-key"`
   - Windows PowerShell: `$env:OPENAI_API_KEY="your-key"`
4. Optional: set a model with `OPENAI_MODEL` (defaults to `gpt-4o-mini`).
5. Run `npm start`, then open http://localhost:3000

Without an API key, the guides and practice checks still work, but the AI endpoint shows a setup message.

## Make it public
Deploy this folder to a Node.js host such as Render, Railway, or a VPS:
- Build/install command: `npm install`
- Start command: `npm start`
- Add `OPENAI_API_KEY` as a private environment variable in the host dashboard.
- Add a usage limit/budget to your AI provider account, and consider rate limiting `/api/tutor` before sharing widely.
- Use the host's generated public URL or connect a domain.

You must create/own the hosting account and configure the secret yourself; this project cannot be published publicly without that account access.

## Important limits
The Code Lab runs simple pattern checks in the browser; it does not compile or execute arbitrary C#. It is meant for learning and feedback. The AI tutor needs a configured server key and internet access. Do not put the API key in `public/index.html`.
