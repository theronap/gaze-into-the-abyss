@AGENTS.md

## TODO: Restore Random Gag Order

Gag cycling is temporarily **linear** for testing. Before shipping, revert to random:

1. In `app/page.tsx`: change `useState<Gag>(() => gags[0])` back to `useState<Gag>(() => getRandomGag())`, change `next()` to call `getRandomGag(current.id)`, and restore import to `getRandomGag` (drop `gags, getNextGag`).
2. In `lib/gag-registry.ts`: delete the `getNextGag` export and its TODO comment.
