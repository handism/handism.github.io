## 2024-05-18 - [Fuse.js Performance]
**Learning:** For client-side search logic in `src/lib/client-search.ts`, the previous implementation searched the entire corpus and then manually sliced the result array using `.slice(0, 8)`. This forces Fuse.js to score and sort all items before trimming. Passing the limit natively as `{ limit: 8 }` avoids processing overhead for unnecessary results and reduces memory allocations.
**Action:** Use `{ limit: n }` directly in Fuse.js queries instead of `.slice()` to improve search performance.
