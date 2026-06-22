Welcome to Ice Ice Maybe's website repo! Isn't it completely over-engineered and couldn't it just be a simple HTML file?! Yes and if you'd like to make any improvements including a complete re-write please make a PR 🙏

[![Netlify Status](https://api.netlify.com/api/v1/badges/f3e33404-4690-460f-be93-c75f53e17b1f/deploy-status)](https://app.netlify.com/sites/incredible-cobbler-673daa/deploys)

Deployed on Netlify: [https://www.iceicemaybe.org](https://www.iceicemaybe.org)

Built with [Vite](https://vite.dev/), [React](https://react.dev/), [Chakra UI](https://chakra-ui.com/), and [React Router](https://reactrouter.com/).

## Getting started

Requires Node 18+ and npm.

```sh
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Pages

- `/` — the landing page.
- `/off-grid-ice-rig` — the Off-Grid Ice Rig field build manual (`src/pages/OffGridIceRig.jsx`).

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server with hot reload (also aliased as `npm start`). |
| `npm run build` | Build the production bundle to `build/`. |
| `npm run preview` | Serve the production build locally. |
| `npm test` | Run the test suite once (Vitest). `npm run test:watch` for watch mode. |
| `npm run lint` | Lint with ESLint. |
| `npm run format` | Format with Prettier. |

## Deployment

Netlify builds with `npm run build` and publishes `build/` (see `netlify.toml`). Client-side routes fall back to `index.html`.
