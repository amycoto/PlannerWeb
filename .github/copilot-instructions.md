# Copilot / AI agent instructions for PlannerWeb (study-tracker)

These notes are focused and actionable so an AI coding agent can be immediately productive in this repo.

1) Big-picture architecture
- Frontend-only React + TypeScript app built with Vite. App entry: `src/main.tsx` -> `src/App.tsx`.
- UI is composed of lightweight presentational Views in `src/views/*` and controller modules in `src/controllers/*` that mediate between Views and Models. Example: `TodayView.tsx` receives `sessions` and callbacks as props; `SessionController` provides the domain actions.
- Domain models live in `src/models/*`. Persistent storage is centralized in `src/models/StorageService.ts` (reads/writes structured data to `localStorage`). `SessionModel.ts` and `SettingsModel.ts` expose types and CRUD-style functions.

2) Data flows & patterns
- Flow for UI updates: View -> Controller -> Model -> StorageService -> Model -> View. Controllers should be thin orchestration layers (see comments in `src/controllers/*.ts`).
- Types are exported from the model files (e.g. `Session`, `SessionData` in `src/models/SessionModel.ts`) — use these for props and controller signatures.
- Date/time conventions: `SessionData.date` annotated as ISO or `YYYY-MM-DD`; `startTime` uses `HH:mm`. Keep this formatting when reading/writing sessions.

3) Key files to reference when implementing features
- `src/models/StorageService.ts` — single place for `readData()`, `writeData()`, and `clearData()` operations.
- `src/models/SessionModel.ts` — session interfaces and CRUD stubs (create/update/delete/get by date/week).
- `src/controllers/SessionController.ts` — orchestration methods that Views should call (create/edit/delete/mark complete, load for today/week).
- `src/views/TodayView.tsx` and `src/views/NavigationView.tsx` — examples of prop-driven functional components and navigation/tab conventions.

4) Dev / build / lint workflows (what to run)
- Start dev server with hot reload: `npm run dev` (runs `vite`).
- Build for production: `npm run build` (runs `tsc -b && vite build` — note TypeScript project build happens first).
- Preview production build: `npm run preview`.
- Linting: `npm run lint` (uses ESLint; lints whole repo).

5) Project conventions and intent (concrete, discoverable rules)
- Controllers are modules under `src/controllers` and should not contain view-layer code; they orchestrate model changes and return data to the view.
- Models expose both types and functions (e.g. `export interface Session` and `export const SessionModel`); prefer importing types from the model files for prop typing.
- Persisted shape: `StorageService` exposes a structured object (see `StoredData` interface). Read/write via those helpers rather than direct `localStorage` calls.
- Views are pure/react components that receive data and callback props; they do not call `localStorage` directly.

6) Concrete examples (copy/paste friendly)
- Read sessions for today in a controller (pattern):
  - `const data = StorageService.readData(); const sessions = SessionModel.getSessionsByDate(today);`
- Implementing `createSession` (pattern):
  - Read stored object via `StorageService.readData()`
  - Create a `Session` with `id: Date.now().toString()` and `completed: false`
  - Push into `sessions` and `StorageService.writeData(updated)`
  - Return the created session (models currently declare this shape).

7) Things an agent should NOT assume
- There are no automated tests or CI config files in the repo — do not assume test runners or GitHub Actions are present.
- Controllers and models currently throw `Not implemented`; they are intentionally stubs. Use the method comments (preconditions / postconditions) as authoritative guidance for behavior.

8) External dependencies and environment
- Project uses: `vite`, `react`, `react-dom`, `tailwindcss` (see `package.json`). Development tooling: `typescript`, `eslint`.
- Node / shell: standard `npm` scripts are provided; prefer `npm run dev` for development.

9) Good first tasks for AI contributions
- Implement `SessionModel` CRUD using `StorageService` (follow the StoredData shape).
- Implement `SessionController.loadSessionsForToday()` and hook it to `TodayView` rendering.
- Implement `SettingsModel` and `SettingsController.toggleReminders()` using `StorageService`.

10) When editing files
- Keep imports relative and use existing types exported from `src/models/*`.
- Keep changes minimal and consistent with current code style (functional components, named exports).

If any of the above areas are unclear or you want the instructions to include concrete code snippets for a specific method (for example `SessionModel.createSession`), tell me which method and I'll add an exact implementation and tests.
