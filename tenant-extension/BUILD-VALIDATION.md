# Build validation — NWCA LanternAMS Tenant Extension

**Validated:** September 29, 2026

## Completed checks

| Check | Result |
| --- | --- |
| TypeScript strict type check | Passed with no errors |
| Scoped-CSS verification | Passed; no `html`, `body`, or `:root` global selectors in extension stylesheet |
| Automated tests | Passed: 2 test files / 5 tests |
| Library build | Passed |
| Declaration output | Generated under `dist/types/` |
| Secret scan | Passed; no payment/provider secret-like values in source or built JavaScript |

## Build artifact

- `dist/nwca-lantern-tenant-extension.js`
- `dist/nwca-lantern-tenant-extension.js.map`
- `dist/types/extension-entry.d.ts` and related declaration files

## Automated test coverage included

- Manifest contains a semantic immutable version, required Lantern API contract, and requested member-service routes with capabilities.
- API reads use the host-provided API base URL without placing a tenant ID in the client request path.
- Hosted checkout mutations send an `Idempotency-Key`.
- `401` responses invoke the host-managed unauthorized/login callback.

## Remaining platform acceptance testing

The Lantern team must run the guide-required integration testing against its published OpenAPI contract and authenticated portal shell before tenant activation: tenant isolation, server capability enforcement, registration/payment workflows, provider webhook/reconciliation behavior, profile/team/charter workflows in the native Lantern modules, responsive/keyboard accessibility, and per-tenant rollback.
