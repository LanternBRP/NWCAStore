# NWCA tenant extension — November 24, 2026 validation

**Result:** Source handoff prepared; local checks pass when the underlying tools are invoked without pnpm’s shared-modules auto-install check. **Not approved for live tenant activation or real payments.** No authenticated host, published OpenAPI specification, provider test environment, or backend source was supplied or contacted.

## Delivered source and provenance

The package is at `../tenant-extension/` within `NWCA-Developer-Handoff-2026-11-24`. It was restored from `/home/ubuntu/NWCA-Lantern-Tenant-Extension.zip`, whose archive root is `nwca-tenant-portal-extension/`. That root was mapped directly to the handoff’s `tenant-extension/` directory, without an extra nested project directory.

The extraction checked archive paths for absolute paths, traversal, unexpected roots, and symlink entries. The exclusion policy covered `node_modules`, `.git`, log directories/files, environment files, credential configuration, and private-key/container files. No matching entries needed exclusion in this archive. All **45 archived files** are present and byte-identical after validation, including source, two test files, supplied documentation, configuration, the JavaScript bundle and source map, and declaration files/maps under `dist/types/`. The supplied partial restore contained no differing or additional files. No dependencies, symlinks, logs, or generated lockfiles remain in the tenant output.

No source, design, API, manifest, version, or original documentation was changed. The package remains `@nwca/lantern-tenant-portal-extension` **1.0.0**, declaring API contract **2026-09**. Repository paths and package identifiers are unchanged. Current handoff prose uses **LanternBRP™** where that brand is named; historical package materials retain their original LanternAMS terminology.

`tenant-extension/BUILD-VALIDATION.md` remains the original **September 29, 2026** record, not a November validation result. Validation temporarily generated declarations and a fresh bundle, then restored the complete original `dist/` from the archive. Consequently, the delivered distribution is the historical artifact, not a replacement November release.

### Integrity identifiers (SHA-256)

| Artifact | SHA-256 |
| --- | --- |
| Original ZIP | `24330ef3f62df4e714e369d858908025104aa9ec533ca885f8a9f368e56fe6fb` |
| Delivered `dist/nwca-lantern-tenant-extension.js` | `f85565080ecf18466724194f22354b0ced7de2edaa678c237c3a4db5b33137a3` |
| Delivered JavaScript source map | `5cff1e460e7e95b605de4f695333abe27ce08dd756263c90ffac3db219dabb38` |
| Historical `BUILD-VALIDATION.md` | `c0e1e65b6e1da67b954764effab41e3f28fd5d269b87e0bf5eedc9deb833168a` |

## Checks actually run on November 24

Validation used a temporary `tenant-extension/node_modules` symlink to the existing `/home/ubuntu/nwca-store/node_modules`. It was removed in cleanup. No dependency installation or dependency repair was performed.

| Command/check | November 24 result |
| --- | --- |
| `pnpm run check`, `pnpm run verify:scoped-css`, `pnpm test`, `pnpm run build:types`, `pnpm run build` | Each exited 1 **before its intended tool ran**, due to pnpm’s shared-symlink safety check described below. |
| `npm run check` → `tsc --noEmit` | **Passed**, exit 0, no TypeScript errors. Existing configuration is strict, with `skipLibCheck: true`. |
| `npm run verify:scoped-css` | **Passed**, exit 0: `Scoped CSS verification passed.` |
| `npm test` → `vitest run` | **Passed**, exit 0: **2 files / 5 tests**. |
| `npm run build:types` | **Passed**, exit 0; declarations generated. |
| `node /home/ubuntu/nwca-store/node_modules/vite/bin/vite.js build` | **Passed**, exit 0; 18 modules transformed; bundle 43.64 kB, gzip 11.34 kB, source map 77.99 kB. This directly ran the final stage of the unchanged build script after its CSS/declaration stages passed separately. |
| TypeScript/JSON manifest data comparison | **Passed**: `src/manifest.ts` and `MANIFEST.json` contain identical manifest data. This does not validate an actual host registry. |
| Archive/file byte comparison after build cleanup | **Passed**: 45 files, no mismatches and no additional tenant files. |
| Final excluded-path and symlink inventory | **Passed**: no `node_modules`, `.git`, environment/private-key/log files, or symlinks in the delivered tenant package. |
| Targeted secret-pattern scan across package text, bundle, and maps | No private-key blocks or Stripe, AWS, GitHub, or Shopify token patterns matched. This is a limited pattern scan, **not a comprehensive security audit**. |
| Offline mocked 429 retry diagnostics | Confirmed the two existing retry defects below. No network requests were made. |

The exact pnpm failure was:

```text
[ERR_PNPM_UNSAFE_MODULES_DIR] Refusing to remove the modules directory at
"/home/ubuntu/nwca-store/node_modules" because its resolved target is not a
strict subdirectory of the project root at
"/home/ubuntu/NWCA-Developer-Handoff-2026-11-24/tenant-extension".
[ERROR] Command failed with exit code 1: pnpm install
```

pnpm attempted its dependency-status auto-install path; it refused the symlink target. This was **not a TypeScript/source failure**. Validation switched to npm script invocation and direct Vite execution, without disabling the safety guard, modifying the shared dependency tree, or changing `package.json`. The unchanged aggregate `pnpm run build` itself did **not** pass in this symlink environment.

The five supplied tests check release/contract metadata, presence of the six capability-bearing routes, host API URL/no client tenant ID in that request URL, presence of a mutation idempotency header, and the 401 host callback. They are mocked unit tests, not tenant-isolation, payment, route-permission, browser, or published-contract acceptance tests.

## Dependency portability

No `pnpm-lock.yaml`, `package-lock.json`, or other dependency lockfile is included in either the original archive or the restored package. Thus there is **no lockfile format/version to report**, and a fresh install resolves mutable caret ranges rather than reproducing a pinned dependency graph. `package.json` also declares no `packageManager` or Node `engines` constraint. Do not copy a lockfile from the unrelated storefront as proof of extension reproducibility.

The environment actually used was **Node 22.23.4**, **npm 10.9.9**, and **pnpm 11.25.0**:

| Dependency | Declared version | Existing version used |
| --- | --- | --- |
| TypeScript | `^5.6.3` | `5.6.3` |
| Vite | `^7.0.0` | `7.1.9` |
| `@vitejs/plugin-react` | `^5.0.0` | `5.0.4` |
| Vitest | `^2.0.0` | `2.1.9` |
| React / React DOM (peers) | `^19.0.0` | `19.2.1` / `19.2.1` |
| `@types/react` / `@types/react-dom` | `^19.0.0` | `19.2.1` / `19.2.1` |

The installed Vite and React plugin require Node `^20.19.0 || >=22.12.0`; the validation Node satisfies that requirement. A future resolution may have different requirements. The receiving developer should choose a supported Node/package-manager baseline, perform an isolated clean install, commit an extension-specific lockfile, and rerun the checks before claiming portable/reproducible builds. A clean install was **not tested here**.

This is an ESM React library, not a standalone HTML site. The host must resolve the React/React DOM imports and use a compatible React 19 runtime. `private: true` prevents normal registry publication. The package’s `files` whitelist is distribution-oriented (`dist`, README, release notes, manifest): an npm tarball is **not a substitute for this full source handoff**, which also preserves `src`, tests, configs, and the supplied guide.

## Retained NWCA theme and asset reliance

NWCA navy **`#17214B`** and red **`#C41E3A`**, cards, spacing, rounded controls, responsive table treatment, focus styling, and reduced-motion rule are retained unchanged. `PortalShell` applies authenticated host branding as local CSS custom properties and takes the tenant name/logo from `context.branding`; empty colors fall back to those NWCA values. Host administrators should retain the approved NWCA palette and check contrast if overriding it.

The mount function injects CSS into an **open Shadow DOM**. Manual review confirmed that styling is inserted inside that boundary; there are some bare element selectors such as `input:focus-visible`, but they are inside the shadow stylesheet, not injected globally. The verification script is a limited text-pattern check, not a selector parser or runtime proof of isolation. No browser-based visual, accessibility, inherited-style, or CSS-leak check was performed.

No logos, product images, or font files are bundled. The stylesheet has no `@import`, `@font-face`, or `url()` dependency. It names **Inter**, then system sans-serif fallbacks; matching Inter typography depends on the host/browser providing that font. A logo is supplied by `context.branding.logoUrl` with an initials fallback when absent; product images come from API `imageUrl` values. The host must provide reachable, approved asset URLs and appropriate image/font CSP permissions. A broken supplied logo URL has no custom error fallback. The host also needs CSP permission for the injected shadow `<style>` and inline branding style; the library has no nonce option.

## Concrete unresolved integration issues

These findings are preserved for the receiving developer, not silently repaired:

1. **API mappings and payloads are unconfirmed.** All ten paths in `src/api/lantern-api.ts` are expected mappings, not evidence of functioning endpoints. Review membership plans/current records, membership registration/renewal, donations, event list/registration, commerce list/checkout, and invoices against the actual OpenAPI **2026-09** contract. Responses are trusted via TypeScript casts, not runtime schema validation; successful responses are assumed to contain JSON. No API base URL, live records, or provider configuration is bundled.

2. **Mutation idempotency is not stable across retries.** `request()` creates a new `Idempotency-Key` on every invocation, including its recursive 429 retry. An offline mock returning 429 then 200 produced two requests with **different keys**. The existing unit test only checks that a key exists. Manual repeat attempts also create new keys. This requires an approved implementation change and retry tests before payment/registration activation.

3. **HTTP-date `Retry-After` is not supported.** The adapter calls `Number()` on the header; an offline mock with an HTTP-date produced **`NaN` milliseconds**, instead of the intended bounded delay. Numeric `1` produced 1000 ms. There is only one automatic retry, and no dedicated rate-limit feedback during the wait. Validate malformed/date headers and abort behavior as well as numeric headers.

4. **Mutation cancellation and field-level errors are incomplete.** Read loaders use `AbortController`, but checkout actions in `portal-screens.tsx` do not pass an abort signal to mutation calls. They can finish and hand off checkout after leaving the originating screen. `PortalApiError.fieldErrors` is captured but not rendered beside form fields; mutation 422 responses show generic guidance, and mutation 409/429/provider failures are collapsed into a generic checkout error. Dedicated successful-mutation/refreshing states are not implemented for every screen.

5. **Hosted checkout is only a handoff.** Checkout/receipt URLs are accepted from API data without a client origin/protocol allowlist; absent a callback, checkout uses `window.location.assign()`. The host/backend must enforce trusted HTTPS destinations, expiry, CSRF/session protection, server tenant scope/capabilities, idempotency, and provider reconciliation. The extension does not implement webhook confirmation, membership activation, paid registration confirmation, payment-return polling, or invoice payment initiation. The Payments screen lists invoices/status/receipts only. Do not describe real payments as ready.

6. **Route and context synchronization is one-way.** The returned handle exposes only `unmount()`, not `update()` or host-controlled route synchronization. `initialPath` initializes internal state, and `onNavigate` reports internal changes outward. The host must define remount behavior for browser back/forward, tenant/user/capability changes, logout, and impersonation. Renewal’s route is gated by `registrations:write` but reads current memberships; registration similarly reads events under its write gate. Validate actual backend read/write capability combinations. Button hiding is not authorization.

7. **The supplied guide covers more than this package implements.** Member profile editing/identity resolution, historical membership endpoints, roster invitations/roles/final-owner behavior, charters/organizations, and notifications are absent from this extension. Either formally assign those workflows to native host modules or scope them out with platform approval; their guide acceptance requirements are not satisfied by these five tests. `context.navigation`, `signOut`, configured `renderLogo`, and `supportEmail` are not consumed by the current UI. Some reusable-screen/access copy still hard-codes NWCA, contrary to the guide’s configuration preference; no refactor was made in this preservation handoff.

8. **Activation and full acceptance remain unverified.** No actual registry enable/disable/rollback, authenticated cross-tenant test, backend capability enforcement, OpenAPI contract test, provider test-mode payment/webhook, desktop/tablet/mobile inspection, keyboard/screen-reader test, or production-host manifest consumption was performed. Static hooks and a passing library build are not proof of those behaviors.

## Suggested host integration sequence

1. Keep this preserved handoff as the baseline. Establish a supported dependency environment and lockfile, then rerun TypeScript, CSS, unit tests, declarations, and the unchanged build script in a normal local dependency installation. Any approved fixes should become a separately versioned release rather than silently replacing immutable `1.0.0`.
2. Confirm the manifest’s contract version and every adapter path, request/response shape, authorization requirement, error contract, and checkout/waitlist/non-payment outcome against the published specification. Resolve the retry, cancellation, and validation-display defects before checkout activation.
3. Supply `TenantPortalContext` exclusively from the authenticated LanternBRP™ portal shell: tenant/user, effective capabilities, NWCA branding, approved API base URL, navigation, and sign-out. Confirm cookie, CORS, CSRF, HTTPS, asset, and style CSP requirements with the platform owner.
4. Import `mountNWCATenantExtension`, `nwcaExtensionConfig`, and the manifest through the host bundler. Mount inside a dedicated host element, provide host-owned routing/checkout/401 callbacks, dispose with `unmount()`, and explicitly handle route/context changes. Do not manufacture tenant identity from query strings or browser storage.
5. Run the supplied guide’s acceptance matrix using administrator, read-only, member, multi-program, and unauthorized users. Include cross-tenant denial, missing capabilities, state/error cases, retries with stable idempotency, cancelled navigation, provider test-mode checkout/webhook reconciliation, and responsive/keyboard/screen-reader/CSS-boundary checks.
6. Only after platform sign-off, register the exact manifest and validated immutable artifact for **NWCA only**, document which host modules satisfy excluded guide workflows, record the prior active version as rollback target, and verify per-tenant enable/disable/rollback. No public site or tenant registry was changed during this task.

All work was local to the source handoff; no MCP/browser tools were used, no website was altered, and nothing was uploaded.
