## Copilot / AI Agent Instructions — Esmeralda-Site

Purpose: Give AI coding agents immediate, actionable knowledge to be productive in this repository. Keep answers concise and reference exact files/paths when suggesting edits.

- **Big picture**
  - Frontend: Next.js (App Router) app under `src/app/` with server-first components. Routes and layouts live in `src/app/*` (example: `layout.tsx`, `page.tsx`, `[slug]/page.tsx`).
  - Components: UI primitives and shared components under `src/components/` and `src/components/ui/` (e.g. `ProjectCard.tsx`, `ui/button.tsx`, `ui/card.tsx`).
  - Data: Sanity CMS integration. Sanity schemas and queries in `sanity/` and `sanity/queries/`. Helper client code is in `src/lib/` (check `client.ts` / `image.ts`).
  - Backend (optional): Workspace contains backend tools/tasks (Laravel tasks in VSCode tasks). If you modify backend, confirm `backend/` context and run PHP tasks from workspace.

- **Key files to read before changing behavior**
  - `src/app/layout.tsx` — global layout + providers (theme, metadata patterns).
  - `src/components/ProjectCard.tsx` — image parsing and external links (Sanity image refs are handled here).
  - `src/lib/client.ts` and `src/lib/image.ts` — Sanity client and image helpers (use these for url building).
  - `sanity/queries/*` and `sanity/schemaTypes/*` — canonical data shapes.
  - `eslint.config.mjs`, `tsconfig.json` — linting / TS rules to respect.

- **Conventions & patterns** (do not invent different patterns without explicit review)
  - TypeScript: prefer explicit interfaces in `src/types/` or `src/lib/` if adding shared types.
  - Components: small, focused components; shared visual primitives live in `src/components/ui/`.
  - Image handling: prefer Sanity `urlFor(...)` builder (see `src/lib/image.ts`) instead of manual `asset._ref` parsing. If you must parse, add robust guards for non-string shapes.
  - Routing: adopt Next App Router patterns — server components by default; add `'use client'` only when necessary (hooks, browser-only code).
  - CSS: global styles in `src/globals.css`; prefer utility classes already used across components.

- **Developer workflows / commands** (run from workspace root)
  - Install dependencies: `npm install` (frontend). Workspace task also runs `composer install` for backend when needed.
  - Dev (frontend): `npm run dev` (or use the VSCode task `⚡ Next.js: Dev Server`).
  - Build (frontend): `npm run build` (task: `⚡ Next.js: Build Production`).
  - Lint/format: `npx eslint . --fix && npx prettier --write .` (there is a task `🔍 Code Quality: ESLint + Prettier`).
  - Laravel (backend): tasks exist in VSCode tasks (see workspace tasks for `php artisan` commands).

- **Testing & safety checks before PRs**
  - Run ESLint and TypeScript checks (`npx tsc --noEmit`).
  - When changing Sanity data shapes, update `sanity/queries` and `schemaTypes` and include a sample payload for reviewers.
  - For image-related fixes, include an example `project.mainImage` shape in the PR description (string url, `{ url }`, or Sanity asset object).

- **Integration points & external dependencies**
  - Sanity requires env vars: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`. Use `src/lib/client.ts` and `src/lib/image.ts` to centralize changes.
  - The project expects Next.js App Router. Prefer `fetch()` calls in server components or use `useSWR`/client hooks only when necessary.

- **Deploy notes (Hostinger)**
  - Build on Hostinger: ensure Node.js runtime is configured; set the environment variables in Hostinger control panel. Run `npm run build` and then `npm start` (or `next start`) to serve.
  - If using static export, confirm that dynamic Sanity-driven pages are supported or implement a fallback; otherwise prefer Node hosting with `next start`.

- **When to escalate / what to ask the repo owner**
  - If you change data contracts: ask for a representative JSON example of the CMS payload used in production.
  - If you alter global styles or theme provider: ask whether dark-mode + theme-provider behavior must be preserved (check `src/components/theme-provider.tsx`).

Keep changes minimal and consistent with existing patterns. After modifying, run lint + type checks and include sample payloads for data-shape changes. Ask for clarification if a change affects `sanity/*` or `src/lib/*` helpers.

---
If you'd like, I can now (1) create a short PR template to require example payloads for data-shape changes, or (2) add a GitHub Action that runs lint + types on PRs. Which do you prefer?
