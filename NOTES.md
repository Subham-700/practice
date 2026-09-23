# Notes

## Bugs I found

For each: what was wrong, **why** it was wrong, and how I fixed it.

### 1. Hydration mismatch in the page

**What was wrong:**
The page was calling `new Date().toLocaleTimeString()` directly inside the JSX to display the last updated time.

**Why it was wrong:**
The application is rendered on the server first and then hydrated on the client. The server and client could execute the date function at different times, resulting in different text. For example, the server could render `11:50:06 AM` while the client renders `11:50:08 AM`. This caused a React hydration warning and eventually caused the server-rendered HTML to be replaced with client-rendered content.

**How I fixed it:**
I moved the time into React state and initialized it with an empty string. I then set the current time inside a `useEffect`, which runs only after the component has mounted in the browser. I also render the timestamp only when the state contains a value.

---

### 2. Search and category filters were not working together

**What was wrong:**
The original filtering logic handled the category and search separately. When a category other than `all` was selected, it returned the category result immediately and did not apply the search condition.

**Why it was wrong:**
The acceptance criteria require search and category filtering to work together. Selecting a category should narrow the results, and entering a search term should narrow those results further.

**How I fixed it:**
I created separate conditions for the category and search matches and combined them using `&&`. I also normalized the search input using `trim()` and `toLowerCase()` so that the search is case-insensitive and extra spaces do not affect the result.

---

### 3. Product loading errors were not displayed

**What was wrong:**
The `useProducts` hook already exposed an `error` value, but the page did not render anything when the API request failed.

**Why it was wrong:**
If the API failed, the user could end up with no useful feedback about what happened. The acceptance criteria require both loading and error states to be handled gracefully.

**How I fixed it:**
I added an error state to the page using the existing `error` value from `useProducts`. A helpful error message is displayed when the request fails. I also made the product grid render only when the application is not loading and there is no error.

---

### 4. Product detail modal appeared and disappeared instantly

**What was wrong:**
The modal was conditionally rendered using `if (!product) return null`, so it was mounted and unmounted immediately without any transition.

**Why it was wrong:**
When React removes the modal from the component tree, there is no time for an exit animation to run. The assignment specifically requires a smooth open and close transition using Framer Motion.

**How I fixed it:**
I used `AnimatePresence` to detect when the modal is being removed and changed the modal and backdrop elements to `motion.div`. I added `initial`, `animate`, and `exit` states to create a fade and scale transition when opening and closing the modal.

---

## Features I completed

* Added a helpful error state when the product API request fails.
* Added a smooth Framer Motion animation for opening and closing the product detail modal.
* Fixed the hydration mismatch caused by generating the current time during render.
* Fixed search and category filtering so both filters work together.
* Made product search case-insensitive.
* Added trimming of the search input so unnecessary spaces do not affect search results.
* Kept the loading state visible while products are being fetched.
* Prevented the product grid from being displayed when the request is still loading or has failed.
* Kept the existing responsive Tailwind CSS product grid and product detail functionality.

## Decisions

* I used `useEffect` for the "last updated" timestamp instead of generating the time directly during render. This avoids server/client differences during hydration.
* I used `useMemo` for the derived categories and filtered products because these values depend on existing state and product data rather than needing their own state.
* I kept the existing product modal structure instead of introducing another modal or UI library. This keeps the implementation within the assignment requirements and minimizes unnecessary changes.
* I used `AnimatePresence` for the modal because it allows Framer Motion to run the exit animation before the modal is removed from the DOM.
* I kept the existing `Product` type instead of using `any`, since the API response has a known product structure.
* I used separate loading, error, and success rendering conditions so each API state has clear behavior.

## With more time

* Add a retry button to the error state so users can retry the API request without refreshing the page.
* Improve accessibility of the modal by supporting closing it with the Escape key and managing focus when the modal opens.
* Add a more complete empty state when the search or category filters return no products.
* Add more robust runtime validation for the API response instead of relying only on the TypeScript type assertion.
* Add tests for the filtering logic, loading state, error state, and modal behavior.
* Consider using a dedicated image component or optimized image handling if this were being prepared for a production Next.js application.
