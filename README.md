# archery-contracts

Shared TypeScript type contracts for the VSK Archery Club system — the single source of truth for the backend, public front-end, and admin dashboard.

Ships `.ts` source directly (consumers run TypeScript via tsx / Vite, no build step).

```ts
import type { Article, Archer, ClubEvent, Sponsor, Achievement } from 'archery-contracts';
```

Consumed via `github:axlothecook/archery-contracts` (currently `file:` locally until pushed).
