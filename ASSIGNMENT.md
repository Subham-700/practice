# Frontend Assignment — Junior (Product Explorer)

Welcome, and thanks for taking the time. Please read this whole file before you start.

- **Level:** ~1 year experience
- **Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion
- **Time budget:** 3–4 hours. Don't burn a weekend — we care about how you work, not polish.
- **Data source:** the free, no-auth API `https://fakestoreapi.com/products` (already wired in).

---

## 1. Setup

Requirements: Node **18.17+**.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Scripts available:

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run typecheck` | TypeScript check (`tsc --noEmit`) |
| `npm run lint` | Next.js lint |

---

## 2. The situation

This app **runs, but it is intentionally incomplete and contains several deliberate bugs.**
It compiles and starts fine — so a green `npm run build` proves nothing here. The problems
are in how it *behaves*.

Your job has two parts:

### Part A — Find and fix the bugs

There are **several deliberate bugs** (we're not telling you how many). They are spread
across four areas:

- **data-fetching** (how products are loaded),
- **TypeScript typing**,
- **rendering** (something React complains about), and
- **the search / category filter logic**.

Some are visible in the UI. For others, **keep your browser's Network tab and Console open** —
that's where the clues are. Fix them properly; don't just paper over the symptom.

### Part B — Complete the two unfinished features

Both are marked in the code with a `TODO(candidate)` comment:

1. **Render the error state** — file: **`src/app/page.tsx`**.
   The data hook (`src/hooks/useProducts.ts`) already returns an `error` value, but nothing
   displays it. Show a helpful error message in the UI when the request fails.
   *(Tip: to test this path, point the fetch URL at a bad address temporarily, then restore it.)*

2. **Animate the modal** — file: **`src/components/ProductModal.tsx`**.
   The product detail modal currently appears and disappears instantly. Add a smooth
   open/close transition using Framer Motion (think `AnimatePresence`).

> To confirm the two TODOs exist before you start, run:
> `grep -rn "TODO(candidate)" src/`

---

## 3. What "done" looks like (acceptance criteria)

When you're finished, the app should:

1. **Product grid** — responsive: 1 column on mobile, 2 on small screens, 3 on desktop. Tailwind only.
2. **Search + category filter** — search by title and filter by category, working **together**,
   and the search should be **case-insensitive**.
3. **Detail view** — clicking a product opens a modal with its full details.
4. **Animation** — at least one meaningful Framer Motion transition. (The grid already animates;
   the modal transition is yours to add in Part B.)
5. **Loading _and_ error states** — both handled gracefully, no blank screen and no crash.

---

## 4. Ground rules

- **No `any`.** If you reach for `any`, we'll assume you couldn't type it. Type it properly.
- **No component/UI libraries** (no MUI, Chakra, shadcn, etc.). Tailwind + your own components only.
- **No AI assistants** (ChatGPT, Copilot, Claude, Cursor, etc.). Docs, Google, Stack Overflow are fine.
  There's a live follow-up (section 6) — so understand everything you submit.
- Keep dependencies minimal; be ready to justify anything you add.
- **Work inside this codebase.** Do not rebuild from scratch or restructure for its own sake.

---

## 5. What to submit

1. **A working app** that meets the acceptance criteria.
2. **The bugs fixed** — properly.
3. **A filled-in `NOTES.md`** (template is in the repo root):
   - each bug you found: what was wrong, **why** it was wrong, and how you fixed it;
   - any decision where you chose between options, and why;
   - what you'd improve with more time.
4. **Real git history** — commit as you go, with meaningful messages. A single "final commit"
   tells us nothing; we read the history.

Submit as a git repository (a link, or a zip that includes the `.git` folder).

---

## 6. Follow-up (please read)

After you submit, we'll do a **~30 minute live call**. You'll share your screen and:

- walk us through one part of your code, and
- add one small feature **live — no AI, no pre-written snippets.**

The live extension is the real test. A strong submission you can't navigate or extend live is
exactly the signal we watch for. So: **understand everything you submit.**

---

## 7. How you'll be scored

| Area | What we're looking for |
|---|---|
| Debugging | Did you find the seeded bugs and explain **why**, not just patch symptoms? |
| Correctness | Do search + filter compose correctly? Do loading and error states actually work? |
| TypeScript | Proper types, no `any`, sensible interfaces for the API shape. |
| React fundamentals | Correct hooks usage, keys, no needless re-renders, clean state. |
| Animation | Intentional and smooth; doesn't break when the list filters or re-renders. |
| Communication | Is `NOTES.md` clear? Do your commits tell a story? |

Polish and extra features are nice but secondary. **Solid fundamentals + clear reasoning beats a
flashy half-broken app every time.** Good luck.
