# Release Notes — NWCA LanternAMS Tenant Portal Extension

## 1.0.0 — September 29, 2026

### Added

- Separately packaged React tenant extension intended for Lantern portal-shell injection.
- Shadow DOM mount point that isolates NWCA UI styles from portal-level styles and protects the portal from extension CSS.
- Tenant-runtime branding for logo, primary color, secondary color, and tenant name.
- Manifest-controlled, capability-filtered routes for membership, renewal, donations, registration, gear, and payments.
- Lantern API adapter with host-session credentials, idempotency keys, abortable requests, bounded retry, and status-aware error handling.
- User-facing loading, empty, unauthorized, conflict, validation, server-error, and mutation states.
- Server-authorized hosted checkout handoffs for membership, renewal, donation, event registration, and products.
- Initial API and manifest tests plus a scoped-CSS verification script.

### Required platform integration

- Map the adapter paths in `src/api/lantern-api.ts` to the published Lantern OpenAPI `2026-09` contract.
- Provide `TenantPortalContext` from the authenticated portal shell.
- Ensure all server-side workflows enforce tenant isolation and capabilities.
- Confirm hosted checkout provider behavior and post-payment webhook/reconciliation flows.
- Register this manifest and build artifact as version `1.0.0` for the NWCA tenant.

### No migrations

This release contains no database schema or data migrations. It adds no backend source of truth, credential store, payment form, or independent authentication flow.
