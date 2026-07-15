# archery types

TypeScript types that are either a string-union or an object type. This repo is the single source of truth of the types used across all archery club repos except dashboard (has its own local types) and deploy repo (no typescript).

## Example of import
```ts
import type { Article, Archer, ClubEvent, Sponsor, Achievement } from 'archery-contracts';
```

## How is it imported
In [backend repo](https://github.com/axlothecook/Archery-club-backend) and [frontend repo](https://github.com/axlothecook/Archery-club-front-end) it's imported as a local dependency
```bash
file:../Archery-contracts
```
while the CI/CD pipeline checks it out as a sibling folder at build time.

## Why this repo exists
The public site's frontend and the backend both use the data shape, so since they need to agree on the data shape that passes between them, it made sense to package it in one common repo.

## A weakness with dashboard repo
The dashboard repo uses hand-written types instead of the shared ones since it was built separately, even though ideally it should use the same types package. Since dashboard frontend communicates with the same backend as public archery site does, the dashboard types can silently drift from what the backend actually sends.
