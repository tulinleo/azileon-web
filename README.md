# Azileon website

React 19 + Vite + TypeScript + Tailwind v4, routed with react-router, deployed on Vercel (`vercel.json` rewrites every path to `index.html`).

- `/` — `src/pages/Home.tsx`: Hero (with the "Our products" 3D showcase), TrustStrip, Solutions, AI, Process, Projects
  carousel, Team, Contact.
- `/solutions/:slug` — `src/pages/SolutionPage.tsx`: one template for the five product lines (parcel-lockers,
  payment-terminals, smart-vending, websites, solar), driven by `src/data/solutions.ts`; the showcase is focused on that
  product. Texts are the `sol*` keys in `src/i18n.tsx`.
- `/projects` — `src/pages/ProjectsPage.tsx`: hardware cases and the web portfolio (`src/data/*Projects.ts`). The first web
  entry is Azileon's own product page, the AI battery dispatcher landing (`BATTERY_DISPATCHER_URL` in `src/data/solutions.ts`;
  update it when the page moves to a subdomain).

The 3D showcase (`src/components/ProductShowcase.tsx` + `src/scene/`) is the Claude Design scene ported to three.js/TypeScript,
fixed camera, loaded lazily and only on md screens and up. Design spec and plan of the current layout:
`docs/superpowers/specs/2026-09-24-solutions-redesign-design.md`.

## Template notes

This project was started from the React + TypeScript + Vite template; the notes below are the template's.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
