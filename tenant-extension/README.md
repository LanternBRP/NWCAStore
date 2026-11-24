# NWCA LanternAMS Tenant Portal Extension

A separately maintained **React tenant extension** for NWCA member services. It is designed to be injected into the LanternAMS tenant portal shell and conforms to the supplied `tenant-portal-extension-development-guide.md`.

> This package is an extension of LanternAMS—not a second AMS, payment application, or authentication system. LanternAMS remains authoritative for tenant context, sessions, permissions, membership, registration, renewal, invoices, payment links, receipts, notifications, and audit events.

## What this package delivers

- A machine-readable extension manifest for API contract **`2026-09`**.
- Capability-filtered tenant routes for **Membership, Renewal, Donate, Registration, Gear, and Payments**.
- A host-context adapter that accepts the required Lantern tenant context at runtime.
- An approved API adapter with host-session credentials, idempotency keys for mutation requests, 401/403/409/422/429 handling, abortable requests, and safe user-facing errors.
- Responsive, accessible loading, empty, validation, conflict, unauthorized, and recoverable-error states.
- Provider-hosted checkout handoff only. The package does not collect card or bank details and does not contain provider secrets.
- NWCA copy and design configuration separated from the reusable extension components.
- A **Shadow DOM** mount boundary so NWCA design and CSS remain isolated from the Lantern portal theme.

## Required host contract

```ts
import {
  mountNWCATenantExtension,
  nwcaExtensionConfig,
  type TenantPortalContext,
} from "@nwca/lantern-tenant-portal-extension";

const context: TenantPortalContext = {
  tenant: { id, key, name, timezone },
  user: { id, displayName, email },
  branding: { logoUrl, primaryColor, secondaryColor, tenantName },
  capabilities,
  apiBaseUrl,
  navigation,
  signOut,
};
```

The host supplies this context from the authenticated Lantern session. **Do not construct it from a URL parameter, local storage, or a client-controlled tenant ID.**

## Injection example

```ts
import {
  mountNWCATenantExtension,
  nwcaExtensionConfig,
} from "@nwca/lantern-tenant-portal-extension";

const host = document.querySelector<HTMLElement>("#nwca-member-services");
if (!host) throw new Error("NWCA extension host element is missing");

const extension = mountNWCATenantExtension(host, {
  context: lanternPortalContext, // populated by Lantern's authenticated shell
  config: nwcaExtensionConfig,
  initialPath: "/membership",
  onNavigate(path) {
    // The portal shell owns browser routing.
    lanternRouter.navigate(`/tenant/nwca/member-services${path}`);
  },
  onHostedCheckout(checkoutUrl, referenceId) {
    // The platform may record UX telemetry, then navigate to the server-authorized URL.
    lanternRouter.navigateExternal(checkoutUrl, { referenceId });
  },
  onUnauthorized() {
    // The extension does not implement its own login screen.
    lanternAuth.returnToLogin();
  },
});

// Later, when the route/module is disposed:
extension.unmount();
```

## CSS and theme isolation

This package explicitly prevents tenant-extension and portal-theme CSS from leaking across the boundary:

1. `mountNWCATenantExtension()` attaches or reuses an **open Shadow DOM** on the supplied host element.
2. The extension stylesheet is imported using Vite `?inline` and inserted as a `<style>` tag **inside that shadow root**.
3. The stylesheet begins at `:host` and uses only `.lantern-*` selectors. It does not target `html`, `body`, `:root`, or portal-global selectors.
4. The extension sets its own font stack, colors, spacing, cards, controls, focus treatment, and CSS custom properties within the shadow boundary.
5. The runtime branding values supplied by Lantern (`logoUrl`, `primaryColor`, `secondaryColor`, and `tenantName`) are applied locally as `--tenant-primary` and `--tenant-secondary` on the extension root.
6. `npm run verify:scoped-css` fails if prohibited global selectors enter `src/styles.css`.

The portal may style the outer host element, but its standard selectors cannot style internal extension controls. Likewise, extension CSS cannot style the portal outside the Shadow DOM.

## NWCA configuration

NWCA-specific copy and donation presets live in `src/nwca-config.ts`. Reusable components do not hard-code NWCA logos, membership types, prices, divisions, events, or business logic. Those records must be obtained through approved Lantern APIs.

## API adapter mapping

`src/api/lantern-api.ts` centralizes the expected path mapping. The Lantern engineering team must replace/confirm each path against the published **2026-09 OpenAPI contract** before activation.

| Screen | Adapter operation | Expected server responsibility |
| --- | --- | --- |
| Membership | `getMembershipPlans`, `getCurrentMemberships`, `startMembershipRegistration` | Determine plans, terms, eligibility, price, and hosted payment handoff. |
| Renewal | `getCurrentMemberships`, `startRenewal` | Determine current term, renewal eligibility, and hosted payment handoff. |
| Donate | `startDonation` | Enforce frequency/amount rules and create provider-hosted checkout. |
| Registration | `getRegistrationEvents`, `startEventRegistration` | Determine eligibility, capacity, promotion codes, required fields, and checkout. |
| Gear | `getCommerceProducts`, `startProductCheckout` | Supply approved catalog and create Shopify/commerce hosted checkout. |
| Payments | `getInvoices` | Return invoices, balances, payment states, and receipt links. |

### API behavior included

- All calls use `credentials: "include"` to reuse the host session.
- The client does **not** send a tenant ID, membership status, price, permission, or provider secret.
- All mutation requests include an `Idempotency-Key`.
- `401` calls the host-provided login return callback.
- `403` displays a clear access state; it is not presented as a server failure.
- `409` displays a conflict/reload state.
- `422` is reserved for field-level server validation errors.
- `429` retries once with bounded `Retry-After` behavior.
- In-flight requests use `AbortController` and are cancelled when a screen unmounts.

## Checkout and security boundary

The extension starts a **server-authorized hosted checkout** by calling LanternAMS. The API returns only a `checkoutUrl` and an opaque `referenceId`. The host then navigates to that URL.

The extension never:

- Presents a second login or stores a token.
- Creates a separate member record or infers membership from browser state.
- Treats a browser return page as payment confirmation.
- Collects or stores card numbers, CVV, bank details, Stripe/Shopify secrets, or payment-provider credentials.
- Uses email as a permanent identity key.
- Reads or writes a database directly.

Payment confirmation, membership activation, renewal, registration confirmation, receipt generation, and entitlement updates are LanternAMS backend workflows and must be webhook/reconciliation driven.

## Local verification

```bash
pnpm install
pnpm run check
pnpm run verify:scoped-css
pnpm test
pnpm run build
```

The included tests cover manifest requirements, no client tenant ID in API requests, idempotency headers, and `401` host callback behavior. Before tenant activation, Lantern must additionally run the guide-required OpenAPI contract, tenant-isolation, capability, registration/payment, retry, member-profile, roster, responsive, keyboard-accessibility, and production-manifest tests.

## Release and rollback

- Current immutable extension version: **1.0.0**
- Required Lantern API contract: **2026-09**
- Manifest artifact: `MANIFEST.json`
- Build artifact: `dist/nwca-lantern-tenant-extension.js`
- Rollback target: the last extension version activated for the NWCA tenant in the Lantern extension registry.

The platform should enable/disable and roll back this extension per tenant without changing the active extension for any other tenant.
