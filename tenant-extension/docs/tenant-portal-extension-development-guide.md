# Tenant Portal Extension Development Guide

## Purpose

This document defines how a tenant-specific frontend is built and connected to LanternAMS. It is intentionally independent of any particular AI coding tool, framework, hosting provider, or frontend generator.

The frontend team may use React, Vue, Svelte, Angular, Web Components, or another supported technology. The implementation must conform to the host contract and must treat LanternAMS APIs as the system of record.

The tenant frontend is an extension of LanternAMS, not a separate association-management backend.

## Product boundary

LanternAMS owns:

- Authentication and sessions
- Tenant selection and tenant isolation
- Roles, permissions, and capability decisions
- People, organizations, programs, affiliations, and memberships
- Registration and renewal rules
- Invoices, payment links, checkout sessions, payments, and receipts
- Charter and organization relationships
- Notifications and audit events
- Tenant branding and feature configuration

The tenant frontend owns:

- Page composition
- Navigation and information hierarchy
- Forms and client-side interaction
- Tenant-specific presentation and workflow guidance
- Local loading, empty, validation, and error states
- Optional tenant-specific reports or workflow screens that use approved APIs

The frontend must not become a second source of truth for business records, permissions, payments, or membership status.

## Supported integration models

The preferred initial model is a separately maintained frontend package or SPA rendered by the Lantern portal shell. The package can be deployed with the main web application or served as a separately versioned frontend route.

Other approved models are:

1. A shared package imported by the Lantern shell.
2. A separately deployed SPA routed under a Lantern tenant path.
3. A dynamically loaded remote module, such as Module Federation.
4. A Web Component adapter for teams using a different framework.

Iframe integration is not required and should not be used unless explicitly approved for a temporary migration or an untrusted third-party experience.

Regardless of packaging, the extension must implement the same host contract, use the same API contracts, and pass the same security and acceptance tests.

## Required host contract

The host provides a tenant portal context. The exact programming language and framework adapter may vary, but the context must expose equivalent capabilities:

```ts
type TenantPortalContext = {
  tenant: {
    id: string;
    key: string;
    name: string;
    timezone?: string;
  };
  user: {
    id: string;
    displayName: string;
    email?: string;
  };
  branding: {
    logoUrl?: string;
    primaryColor: string;
    secondaryColor: string;
    tenantName: string;
  };
  capabilities: string[];
  apiBaseUrl: string;
  navigation: NavigationItem[];
  signOut(): Promise<void>;
};
```

The extension must use the host context instead of reading tenant identity from an untrusted URL parameter, local storage value, or hard-coded tenant constant.

## Extension manifest

Every extension must publish a machine-readable manifest. The manifest can be JSON, TypeScript, or another agreed format, but it must contain equivalent information:

```json
{
  "id": "tenant-portal",
  "version": "1.0.0",
  "displayName": "Tenant Portal",
  "routes": [
    {
      "path": "/registration",
      "label": "Registration",
      "capability": "registrations:write"
    },
    {
      "path": "/members",
      "label": "Members",
      "capability": "parties:read"
    },
    {
      "path": "/payments",
      "label": "Payments",
      "capability": "payments:read"
    },
    {
      "path": "/charters",
      "label": "Charters",
      "capability": "organizations:manage"
    }
  ],
  "requiredApiContract": "2026-09",
  "supportedFeatures": [
    "registration",
    "membership",
    "payments",
    "members",
    "charters"
  ]
}
```

The host must be able to enable, disable, version, and roll back an extension per tenant.

## API and SDK requirements

The extension must call LanternAMS APIs through a small adapter or SDK. Direct database access is prohibited.

The adapter must support the following functional areas.

### Registration and renewal

- Load available membership types and plans.
- Display pricing and required information.
- Submit registration through the server workflow.
- Support promotion codes when enabled by the tenant.
- Redirect to provider-hosted checkout when payment is required.
- Display pending, paid, failed, cancelled, and expired states.
- Never mark a membership active based only on browser state.

### Memberships and entitlements

- Show current memberships and historical memberships where authorized.
- Show start date, expiration/renewal date, status, plan, and holder.
- Show benefits and entitlements returned by the server.
- Treat server status as authoritative; do not infer renewal dates in the browser.

### Member profiles

- Load the canonical person record through the portal context/API.
- Update only fields permitted by the API.
- Handle duplicate or ambiguous people by presenting the server-provided selection flow.
- Never use email address as the permanent identity key.

### Payments

- Load invoices and balances in the permitted portal scope.
- Start provider-hosted checkout through LanternAMS.
- Use idempotency keys for retryable actions.
- Show receipts and payment status from the API.
- Never collect or store card numbers, CVV, bank account numbers, or provider secrets.

### Team members and roster

- List team members within the selected organization/program scope.
- Show title and portal role.
- Invite, resend, remove, or change roles only when the server returns the corresponding capability.
- Preserve the final-owner rule enforced by the backend.

### Charters and organizations

- Show organizations, programs, affiliations, and charter relationships returned by the API.
- Allow edits only through approved organization/charter endpoints.
- Keep organization-level contacts separate from gendered or division-specific programs where the data model does so.

### Notifications

- Display server-created alerts and action URLs.
- Use server state for dismiss, resolve, or acknowledge actions.
- Do not fabricate data-quality, payment, or membership notifications locally.

## API client behavior

The API adapter must:

- Send authenticated requests using the host session mechanism.
- Preserve the current tenant context established by the host.
- Handle `401` by returning the user to the host login screen.
- Handle `403` as an authorization state, not as a generic server failure.
- Handle `409` as a conflict requiring user-visible resolution.
- Handle `422` as a validation response and display field-level errors.
- Handle `429` with bounded retry and user feedback.
- Handle `5xx` without exposing stack traces, SQL, provider credentials, or raw authorization errors.
- Include an idempotency key for mutations that can be retried.
- Cancel obsolete requests when navigating away from a screen.

## Authentication and authorization

The extension does not implement a second login system.

The host owns:

- Login, logout, password reset, verification, invitation acceptance, and session renewal.
- User-to-tenant resolution.
- Impersonation indicators and restrictions.
- Tenant and portal role assignment.

The extension receives effective capabilities from the host/API. It may hide unavailable controls for usability, but hiding a button is not authorization. Every mutation must be rejected by the backend when the capability is absent.

The frontend must not:

- Trust a client-supplied tenant ID.
- Treat a role name in local storage as authorization.
- Assume a user can access every program belonging to the tenant.
- Permit payment or roster actions solely because a screen is reachable.
- Expose impersonation tokens or original-user identifiers in URLs.

## Tenant branding and design system

The host supplies tenant branding at runtime. The extension must use the supplied values for:

- Logo
- Primary color
- Secondary color
- Tenant name
- Optional typography and density settings when provided

The extension must include accessible color fallbacks and must remain usable when no custom logo is configured.

Do not hard-code NWCA branding into reusable components. NWCA-specific copy, plans, divisions, and terminology must be configuration or tenant data.

## Navigation and capabilities

Navigation is declared by the extension manifest and filtered by effective capabilities. Recommended capability examples include:

- `registrations:read`
- `registrations:write`
- `members:read`
- `members:write`
- `memberships:read`
- `payments:read`
- `payments:write`
- `organizations:read`
- `organizations:manage`
- `programs:read`
- `roster:manage`
- `reports:read`

The extension must support a user who has only a subset of these capabilities. Screens should degrade gracefully rather than displaying unauthorized controls or empty pages with no explanation.

## Required screen states

Every screen must implement:

- Initial loading state
- Refreshing state
- Empty state
- Field validation state
- Unauthorized state
- Not-found state
- Conflict state
- Recoverable server error state
- Successful mutation confirmation

The UI must use professional SaaS language. It must not expose internal phrases such as “AI helper,” database errors, SQL errors, raw provider messages, or implementation terminology.

## Data and caching rules

- Cache only data that is safe for the current authenticated tenant and user scope.
- Clear tenant-scoped cache on tenant switch, logout, or impersonation change.
- Do not persist sensitive member or payment data in browser storage unless explicitly approved.
- Do not cache payment URLs beyond their provider-defined lifetime.
- Treat mutation responses as authoritative and refresh affected data after success.

## Accessibility and responsive behavior

The extension must support keyboard navigation, visible focus states, semantic labels, screen-reader-friendly status messages, and sufficient color contrast.

The required responsive targets are:

- Desktop staff/admin use
- Tablet member use
- Mobile member use

Tables must provide a usable small-screen alternative such as stacked cards or horizontal scrolling with preserved labels.

## Observability and auditability

The extension must provide a correlation ID or request ID in client logs where available. Logs must not contain passwords, payment credentials, full authentication tokens, or unnecessary personal data.

User-visible actions that change records must be traceable through the LanternAMS audit trail. The frontend should display a confirmation or resulting record state, not claim success before the API succeeds.

## Testing requirements

Every extension must include:

- API contract tests against the published Lantern OpenAPI contract.
- Tenant-scope tests proving a user cannot read another tenant's data.
- Capability tests for each protected route and mutation.
- Registration and payment happy-path tests.
- Payment retry/idempotency tests.
- Member profile and team-member invitation tests.
- Empty, loading, validation, unauthorized, conflict, and provider-error tests.
- Responsive and keyboard-accessibility checks.
- A production build test using the exact manifest consumed by the host.

The extension must be tested with at least:

1. A tenant administrator.
2. A tenant user with read-only access.
3. A member portal user.
4. A user with access to multiple programs or organizations.
5. A user with no access to a requested module.

## Deployment and versioning

Each release must have:

- A unique immutable version.
- A compatible API contract version.
- A release note describing migrations, new permissions, and changed workflows.
- A rollback target.
- A health/build artifact that the platform can validate before activation.

The platform must be able to activate an extension for one tenant without changing another tenant's active version.

Breaking API or permission changes require a new contract version and a migration plan. Frontend releases must not silently assume fields that are not in the declared contract.

## Recommended repository layout

The exact layout may differ, but the separation should be equivalent:

```text
tenant-portal-extension/
  src/
    api/
    auth/
    components/
    screens/
    routes/
    manifest.ts
    extension-entry.ts
  tests/
  public/
  package.json
  README.md
```

The API adapter, manifest, and extension entry point must be easy to locate and independently test.

## Acceptance criteria

An extension is ready for tenant activation when:

- It runs inside the Lantern tenant portal without a second login.
- It obtains tenant identity and branding from the host.
- It has no direct database or provider-secret access.
- Registration, membership, payment, member, roster, and charter workflows use approved Lantern APIs.
- Backend capabilities are enforced for every protected operation.
- Payment data is handled only through hosted provider flows.
- Tenant isolation tests pass.
- Loading, empty, error, unauthorized, and conflict states are implemented.
- The extension passes accessibility and responsive checks.
- Its manifest, API contract version, release notes, and rollback version are documented.
- Platform administrators can enable, disable, version, and roll back it for an individual tenant.

## Initial implementation recommendation

For the first NWCA tenant extension, build the existing tenant-facing experience as a separately maintained frontend package that is rendered by the Lantern portal shell. Use a thin framework adapter around the Lantern Portal SDK, keep tenant-specific screens in the extension package, and reuse Lantern's authenticated API and payment workflows.

Do not copy the database schema, recreate membership logic, embed payment forms, or build a parallel authentication service in the extension.
