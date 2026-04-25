# CoinBlast — moved

> ## ⚠ This repository has moved.
>
> CoinBlast (DEX + token launchpad) now lives in the SentrisCloud frontend monorepo:
>
> **[`sentriscloud/frontend`](https://github.com/Sentriscloud/frontend) → [`apps/coinblast/`](https://github.com/Sentriscloud/frontend/tree/main/apps/coinblast)**
>
> All future development, issues, and pull requests should go there.
> This repository is kept read-only for historical reference.

---

## Why the move

Per the SentrisCloud architecture decision (April 2026), all user-facing TypeScript apps consolidate into a single `pnpm` + Turborepo monorepo at `sentriscloud/frontend`. The `sentrix-labs` org is reserved for the protocol foundation; products live under the `sentriscloud` org.

## Where to find what was here

| Old path | New path |
| --- | --- |
| `sentrix-labs/coinblast` (root) | `sentriscloud/frontend/apps/coinblast/` |
| `src/` | same, under `apps/coinblast/src/` |
| `package.json` (`"name": "coinblast"`) | `apps/coinblast/package.json` (`"name": "@sentriscloud/coinblast"`) |
| Standalone `npm install` | Workspace-level: `pnpm install` at monorepo root |

Git history is preserved in the monorepo as a squashed migration commit.
