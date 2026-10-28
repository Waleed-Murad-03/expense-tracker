# Prompt Library

Reusable prompts for working with the coding agent (Claude Code) on this project.
Fill in the `{{placeholders}}` before using a template.

---

## 1. New feature

```
Context: {{what exists now - relevant files, components, state}}
Goal: {{the feature to build, in one or two sentences}}
Constraints:
- Follow AGENTS.md.
- Only touch these files: {{list}}
- No new dependencies.
Acceptance criteria:
- {{checkable behaviour 1}}
- {{checkable behaviour 2}}
Examples:
- {{input}} -> {{expected result}}

Start by giving me a short plan. Do not write any code until I approve the plan.
```

## 2. Bug fix

```
Bug: {{what happens}}
Expected: {{what should happen}}
Steps to reproduce:
1. {{step}}
2. {{step}}
Relevant files: {{list}}

Explain the root cause first, then propose the smallest fix.
Do not change unrelated code. Wait for my approval before editing.
```

## 3. Refactor

```
Refactor {{file or component}} to {{goal, e.g. extract a helper / simplify state}}.
Behaviour must not change: all existing tests must still pass.
No new dependencies. Show me the plan first, then the diff.
```

## 4. Generate tests

```
Write {{unit / component / Cypress}} tests for {{feature}} in {{test file path}}.
Cover:
- {{case 1}}
- {{case 2}}
Use Vitest + React Testing Library (or Cypress for E2E).
Select elements by data-cy attributes or accessible roles, not CSS classes.
Each test must fail if the feature is broken - no tests that always pass.
Do not change any source files.
```

## 5. Review diff

```
Review the current changes (git diff) as a strict code reviewer.
Check:
- Does it match the request and the acceptance criteria?
- Does it follow AGENTS.md (one component per file, state in App)?
- Any bugs, edge cases or unnecessary changes?
- Any new dependencies?
List problems in order of importance. Do not edit any files.
```

## 6. Commit message

```
Write a Conventional Commit message for the staged changes (git diff --staged).
Format: <type>: <short summary under 60 chars>
Types: feat, fix, test, docs, chore, refactor.
Add a short body only if the change needs explaining.
```

---

## Five-part prompt: "Add expense" feature

**Context**
This is a React app scaffolded with Vite (JavaScript, no TypeScript). `src/App.jsx` still contains the Vite starter content. There are no expense components yet. Rules for this repo are in AGENTS.md.

**Goal**
Create an `ExpenseForm` component that lets the user enter a title, an amount and a category, and add the expense. Validation logic must live in a separate pure function so it can be unit tested.

**Constraints**

- Create `src/components/ExpenseForm.jsx` (one component per file).
- Create `src/utils/validateExpense.js` exporting `validateExpense({ title, amount })`. It returns an error message string if the input is invalid, or `null` if it is valid.
- The expenses array lives in `App` state. `ExpenseForm` receives an `onAdd` prop and calls it with the new expense; it does not store the list itself.
- Categories: Food, Travel, Bills, Other. Default selection: Food.
- Add these `data-cy` attributes: `title`, `amount`, `category`, `add-expense`, `error`.
- No new dependencies. Do not modify any files other than the two new ones and `src/App.jsx`.

**Acceptance criteria** (each one must be checkable by a test)

1. Entering title "Lunch", amount "250", category "Food" and clicking Add calls `onAdd` once with `{ title: "Lunch", amount: 250, category: "Food" }` (amount is a number, not a string).
2. After a successful add, the title and amount inputs are cleared.
3. An empty title, or a title of only spaces, does not call `onAdd` and shows an error in `[data-cy="error"]`.
4. A non-numeric amount such as "abc" does not call `onAdd` and shows an error.
5. An amount of 0 or a negative amount such as "-5" does not call `onAdd` and shows an error.
6. `validateExpense` returns `null` for `{ title: "Lunch", amount: "250" }` and returns a non-empty string for each invalid case above.

**Examples**

- Title "Lunch", amount "250", Food → `onAdd({ title: "Lunch", amount: 250, category: "Food" })`
- Title "", amount "100" → error "Title is required", `onAdd` not called
- Title "Taxi", amount "abc" → error "Amount must be a number", `onAdd` not called
- Title "Taxi", amount "0" → error "Amount must be greater than 0", `onAdd` not called
