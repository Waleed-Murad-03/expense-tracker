# AGENTS.md

## Stack
- React + Vite (JavaScript)
- Vitest + React Testing Library (unit and component tests)
- Cypress (end-to-end tests)

## Folder layout
```
src/
  App.jsx          # holds all expense state
  App.css          # plain CSS
  components/      # one component per file
  utils/           # pure logic (validateExpense, calculateTotal)
cypress/e2e/       # Cypress specs
```

## Commands
- `npm install` - install dependencies
- `npm run dev` - start the dev server (http://localhost:5173)
- `npm run lint` - run ESLint
- `npm test` - run Vitest in watch mode
- `npx vitest run --coverage` - run tests once with coverage
- `npm run cy:open` - open Cypress
- `npm run cy:run` - run Cypress headless (dev server must be running)

## Conventions
- One component per file in `src/components/`. Pure logic goes in `src/utils/`.
- All expense state lives in `App`. Children get data and callbacks via props.
- Every component starts with a short comment explaining its props and state.
- Plain CSS only.
- Conventional Commits: `feat:`, `fix:`, `test:`, `docs:`, `chore:`, `refactor:`.

## Rules
- No new dependencies without asking first.
- Always work on a branch; never commit directly to `main`.
- Summarise your changes for the PR (What / Why / Review checklist).
