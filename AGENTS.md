# Repository Guidelines

## Project Structure & Module Organization
- `src/` contains the React application source. Entry points are `src/index.js` and `src/App.js`.
- `src/Collection.jsx` renders the sidebar and the active collection grid. Treat it as the collection registry.
- `src/SimpleForm/` contains each input animation variant as a standalone component.
- Styles live in `src/index.css` (global base + animations) and `src/App.css` (legacy CRA styles; keep minimal or remove if unused).
- Static assets are in `public/`.
- Tests are colocated in `src/` (for example `src/App.test.js`) with setup in `src/setupTests.js`.

## Component Management (Add / Update Variants)
- Each variant lives in its own file under `src/SimpleForm/` and exports a default React component.
- Add new variants by:
  1. Creating `src/SimpleForm/<VariantName>.jsx`.
  2. Importing it in `src/Collection.jsx`.
  3. Adding it to the `collections` registry with a stable `id` (kebab-case) and display `name`.
- Keep `collections` IDs stable for future deep-linking or tests.
- Keep variant components self-contained: local state, effects, and layout are inside the variant. Shared animations live in `src/index.css`.

## Naming & File Conventions
- Components: PascalCase file + export name (`IgniteCore.jsx`, `BioFluidClay.jsx`).
- Collections and IDs: kebab-case (`ignite-core`, `bio-fluid-clay`).
- Local variables: camelCase (`activeCollection`, `isTyping`).
- CSS classes: prefer Tailwind utility strings; custom animation classes in `src/index.css` use kebab-case (`ignite-pop`, `clay-ripple-1`).

## Styling & Animation Guidelines
- Favor Tailwind for layout/typography/spacing. Only add custom CSS for keyframes or non-trivial effects.
- Keep animation names unique by theme prefix (`ignite-*`, `clay-*`, `console-*`).
- Prefer `className` arrays joined with `.join(' ')` for conditional variants.

## State & Effects Patterns
- Keep UI phases explicit (`idle | working | success`).
- Guard effects with early returns and cleanup timeouts.
- Avoid cross-component shared state in this app; variants should be isolated.

## Build, Test, and Development Commands
- `npm start`: Run the app locally with Create React App on `http://localhost:3000`.
- `npm run build`: Generate a production build into `build/`.
- `npm test`: Launch Jest in watch mode.
- `npm run clean`: Remove macOS metadata files (`._*`) from the repo tree.
- `npm run eject`: One-way CRA eject. Avoid unless you need full config control.

## Testing Guidelines
- Test framework: Jest + React Testing Library (`@testing-library/*`) with `jest-dom` matchers.
- Name tests `*.test.js` and colocate them near the component they cover.
- Keep tests focused on user-visible behavior; avoid snapshot-only tests.

## Commit & Pull Request Guidelines
- Prefer concise, imperative commit summaries (example: `add neon signal variant`).
- PRs should include: a brief summary, testing notes (`npm test` or `not run`), and screenshots/GIFs for UI changes.

## Configuration Tips
- Tailwind is available; update `tailwind.config.js` when adding new content paths or theme tokens.
- CRA manages build tooling via `react-scripts`; avoid customizing build steps unless necessary.

## Repo Hygiene
- Do not commit macOS metadata files (`._*`). Run `npm run clean` before PRs if needed.
