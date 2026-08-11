# ZK Loan tutorial — source of truth

This folder is the **single source of truth** for the ZK Loan tutorial published at
[docs.midnight.network → Tutorials → ZK Loan](https://docs.midnight.network/tutorials/zk-loan)
(repo: [`midnightntwrk/midnight-docs`](https://github.com/midnightntwrk/midnight-docs/tree/main/docs/tutorials/zk-loan)).

## How syncing works

When a change to any file in this folder lands on `main`, the
[`sync-tutorials` workflow](../.github/workflows/sync-tutorials.yml) automatically
opens (or updates) a pull request against `midnightntwrk/midnight-docs` that mirrors
this folder into `docs/docs/tutorials/zk-loan/`. Once that PR is reviewed and merged
on the docs side, the published tutorial updates.

```
edit tutorials/ here → PR merged to main → CI opens PR on midnight-docs → docs team merges → published
```

Practical consequences:

- **Edit the tutorial here, never in midnight-docs.** Direct edits to
  `docs/tutorials/zk-loan/` in the docs repo will be overwritten by the next sync.
- Deletions and renames propagate too (the sync uses `rsync --delete`).
- This `README.md` is excluded from the sync — it documents the setup for this repo
  and never appears in the docs.
- `_category_.yaml` (Docusaurus sidebar metadata) is **owned by midnight-docs** and
  is not part of this folder — the sync excludes it and leaves the docs-side copy
  untouched, since sidebar position/label depend on the other tutorials there.
- The sync PR reuses the branch `sync/zkloan-tutorial`, so rapid successive merges
  here update a single open docs PR rather than stacking new ones.
- The workflow needs the `DEVREL_DOCS_PR_TOKEN` secret (a token allowed to push
  branches and open PRs on `midnight-docs`) — the same secret used by other
  tutorial-syncing repos in the org.

## Files

| File | Published as |
| --- | --- |
| `index.mdx` | Tutorial landing page |
| `smart-contract.mdx` | Part 1 — the Compact smart contract |
| `cli.mdx` | Part 2 — the CLI |
| `attestation-api.mdx` | Part 3 — the attestation API |
