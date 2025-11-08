# Math Cards — Frontend (Next.js)

Overview
--------
This repository contains the frontend for Math Cards, built with Next.js (app router). The UI provides a place for learners to practice algebra-style questions where a backend generates equations and the frontend renders them as cards.

Project structure (high level)
------------------------------
- `app/` — Next.js app router pages, components and API folder (the original Next.js API route was backed up to `.bak` and the project is configured to proxy API calls to the external backend during development).
- `public/` — static assets.
- `styles/` — global styles and Tailwind configuration.
- `components/` — UI components (many Radix + Tailwind-based components).
- `package.json` — scripts and dependencies for running the front-end.

Key technologies and dependencies (inferred)
-----------------------------------------
- Next.js 16 (see `package.json`)
- React 19
- TypeScript (optional types present in the project)
- Tailwind CSS
- Various Radix UI primitives and additional UI libraries (e.g., Framer Motion, Sonner, Recharts)

Notable setup details
---------------------
- The project contains a `pnpm-lock.yaml` but `npm install` works as well. You may prefer `pnpm` if you have it installed.
- The codebase contains a `next.config.mjs` rewrite rule that proxies `/api/:path*` to `http://localhost:4000/api/:path*` during development. You can override the target by setting the `BACKEND_URL` environment variable when starting Next.js.

Requirements (suggested)
------------------------
- Node.js 18 or later (18+ recommended). Next.js 16 and React 19 typically run on Node 18/20.
- npm (v8+) or pnpm to install dependencies.
- A modern browser for development (Chrome/Edge/Firefox).

How to run (development) — Windows (cmd.exe)
-------------------------------------------
1. Open a terminal and change to the frontend directory:

```cmd
cd C:\Users\Valentina\Desktop\math-cards-auth\Frontend
```

2. Install dependencies (choose npm or pnpm):

```cmd
npm install
```

3. Start the Next.js dev server:

```cmd
npm run dev
```

4. Open http://localhost:3000

Environment variables
---------------------
- `BACKEND_URL` — (optional) if you want the frontend to proxy to a backend other than `http://localhost:4000`, set this variable before starting the frontend. Example:

```cmd
set BACKEND_URL=http://api.myhost.com
npm run dev
```

API integration details
-----------------------
- During development, API requests sent by the frontend to `/api/generate-equation` are rewritten to the backend at `http://localhost:4000/api/generate-equation`.
- The backend exposes a POST `/api/generate-equation` endpoint that expects JSON `{ level, operation }` and returns a generated equation object.

Testing the integration quickly
------------------------------
- Start the backend first (see `Backend/README.md`) then start the frontend. Open the app and trigger a generate action — it should call `/api/generate-equation` and receive an equation JSON.

Production notes
----------------
- For production builds use `npm run build` in the `Frontend` folder and deploy per Next.js recommendations.
- Ensure the frontend's API calls are pointed to the correct production backend URL (set `BACKEND_URL` or change fetch targets accordingly).

Contributing / Next steps
-------------------------
- Add unit tests for UI components and integration tests for API usage.
- Add E2E tests to verify end-to-end behaviour (Playwright or Cypress).
- Consider adding a small API client wrapper that reads `NEXT_PUBLIC_API_URL` for clearer URL management.

License
-------
MIT
