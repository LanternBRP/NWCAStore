# NWCA Tenant Extension — Lantern Engineering Checklist

## Before integration

- [ ] Confirm the published Lantern OpenAPI contract version is `2026-09` or update the manifest and adapter together.
- [ ] Map every route in `src/api/lantern-api.ts` to approved Lantern endpoints.
- [ ] Confirm the authenticated portal shell supplies the complete `TenantPortalContext`.
- [ ] Confirm checkout response shape: `{ checkoutUrl, referenceId, status }`.
- [ ] Confirm the host redirects `401` to Lantern login and owns logout/session renewal.
- [ ] Confirm the tenant extension registry supports version `1.0.0`, per-tenant enablement, and rollback.

## Security and tenancy

- [ ] Verify the backend derives tenant identity from the host session—not client parameters.
- [ ] Verify every protected read/mutation checks capabilities and program/organization scope.
- [ ] Verify tenant-isolation tests fail on cross-tenant record access.
- [ ] Verify mutations are idempotent for retry using the request idempotency key.
- [ ] Verify hosted checkout URLs are server-created and never cached beyond provider lifetime.
- [ ] Verify Stripe/Shopify/payment secrets never appear in the bundle, browser storage, source maps, logs, or client network payloads.

## UI boundary and acceptance

- [ ] Mount through `mountNWCATenantExtension()` inside a portal-owned host element.
- [ ] Run `pnpm run verify:scoped-css`; it must pass before building.
- [ ] Confirm portal global CSS does not style controls within the extension Shadow DOM.
- [ ] Confirm extension CSS does not alter portal navigation, typography, form controls, or layout outside the host element.
- [ ] Test desktop, tablet, mobile, keyboard navigation, visible focus, screen-reader status, empty states, and error states.
- [ ] Test as tenant administrator, read-only tenant user, member user, multi-program user, and unauthorized user.

## Activation

- [ ] Build and validate the exact artifact in `dist/`.
- [ ] Register `MANIFEST.json` with the Lantern extension registry.
- [ ] Enable version `1.0.0` only for the NWCA tenant.
- [ ] Complete a payment/registration test with provider test mode and webhook confirmation.
- [ ] Record the prior active NWCA extension version as the rollback target.
