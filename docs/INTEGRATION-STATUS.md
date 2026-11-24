# NWCA integration status and developer responsibilities

Prepared November 24, 2026. This package contains the existing public UI and the previously delivered tenant extension, not completed payment processing or a deployed AMS portal.

## Public website and commerce UI

The public site uses React 19, TypeScript, Vite, Tailwind CSS v4, Wouter, shadcn/Radix components, Lucide icons and Sonner. The theme is defined in `website/client/src/index.css`. Preserve NWCA navy, red and gold, the shield logo, and the Bebas Neue / Barlow Condensed / DM Sans typography. Use white text on dark backgrounds; gold accents/hover states and red icons remain intentional. The Join hero's NWCA wordmark was corrected to white, and the checkout account panel uses the official NWCA logo.

Membership tier selection, annual renewal/sign-in entry, donation amount/frequency selection, event selection and merchandise handoff are present in `website/client/src/pages/Checkout.tsx`. Join, Donate, Events and Shop route purchase intent into the public checkout UI. Account creation/login, membership activation, annual billing and event confirmation must be implemented with the AMS and payment integration service. The UI does not prove these operations work in production.

The public contract is `website/client/src/lib/commerceContract.ts`. Its configured operation is `POST {VITE_COMMERCE_API_URL}/v1/checkout-sessions` returning `checkoutUrl`, `provider` and `referenceId`. `VITE_AMS_LOGIN_URL` supplies the sign-in URL. These are frontend expectations that the developer must map to real server endpoints. Without those services configured, the UI explains the missing integration instead of charging a customer.

## Shopify: preserve the UI, replace the sample data/cart

`website/client/src/pages/Shop.tsx` is a custom headless-ready storefront, not a Shopify Liquid theme. It includes 12 representative products, filters, sorting, product modals, color/size controls and a cart drawer. Product prices, ratings/reviews, images, availability assumptions and shipping claims are sample content and require vendor approval before commercial launch.

The current Product model uses numeric sample IDs and independent color/size arrays. It is not a Shopify schema adapter. Build a real mapper for Shopify product and variant GIDs, selected options, currency-aware money, images, collections/product type, availability and any approved metafields. Resolve the exact selected size/color combination to a Shopify ProductVariant GID; disable invalid or sold-out combinations.

The current cart exists only in React component state. The checkout button navigates to `/checkout?flow=product` without transferring real cart lines, and the public checkout product branch is a handoff placeholder. Persist/resolve cart state and connect the actual Shopify Cart API before enabling purchase. Use `cartCreate`, `cartLinesAdd`, `cartLinesUpdate`, `cartLinesRemove` and the cart's authoritative costs. Request a fresh `checkoutUrl` at payment handoff. The obsolete `createCheckout` comment was corrected in the export; do not implement the retired Checkout API.

Standard headless Shopify hands payment to Shopify-hosted checkout. Browsing and cart can remain inside the NWCA site, but an embedded or same-NWCA-domain payment experience has not been implemented. Confirm the supported checkout-domain/branding arrangement with the vendor if the customer's address bar must remain on an NWCA domain. Do not substitute a custom Stripe merchandise payment flow without resolving Shopify order and fulfillment ownership.

Shopify owns merchandise catalog, inventory, pricing, tax, shipping, orders, payment and fulfillment. The AMS owns identity and member eligibility. Member-specific merchandise privileges must be authorized server-side, not inferred from browser state or email. Use verified order/payment webhook processing for any required AMS order-reference synchronization, not the checkout return URL as evidence.

## Stripe and AMS

The existing design recommends Stripe Checkout/Billing for membership, renewal, donation and event payments, separate from Shopify merchandise. The developer must implement session authentication, AMS intake/account linking, authoritative price/eligibility/capacity decisions, annual renewal policy, donation frequency, server-created payment sessions and verified webhook reconciliation. Annual membership and donation controls in the UI do not themselves create subscriptions.

The AMS must remain authoritative for immutable person/member IDs, membership terms, event registrations, community entitlements and access revocation. Account registration/login and purchase-intent sequencing need confirmation against the platform's actual API. Do not identify or merge member accounts solely by email. Do not activate access from a success query parameter.

Keep Stripe secret keys, Shopify Admin/private tokens, AMS credentials and webhook secrets on the integration server. Only public endpoints and deliberately public frontend configuration belong in `VITE_` values. Review CSRF/session/CORS controls, permitted redirect destinations, idempotency behavior, payment lifecycle and error handling before launch.

## Tenant extension boundaries

The separate `tenant-extension/` uses a Shadow DOM mount boundary and local styles, rather than importing the public site's global Tailwind stylesheet into Lantern's shell. Keep NWCA design tokens, fonts, overlays and resets inside that boundary so the platform theme and NWCA theme do not overwrite each other. Test inherited fonts/custom properties, focus, accessibility, responsive behavior and any future portalled dialogs in the real host.

The adapter proposes `/portal/commerce/products` and `/portal/commerce/checkout` along with membership/renewal/donation/event/payment endpoints. These are not confirmed deployed Lantern routes. The engineer must map them to approved OpenAPI operations and implement server-side tenant/session/capability enforcement. Frontend capability filtering is a presentation guard, not authorization.

Read `tenant-extension/README.md`, `ENGINEERING-CHECKLIST.md`, the supplied tenant guide, and `docs/TENANT-VALIDATION.md`. Original September build validation is historical, not evidence of a deployed tenant today. Host-stage integration and checkout end-to-end testing are still required.

## Media, maps and hosting outside Manus

All statically referenced `/manus-storage/...` media/data are inventoried in `ASSET-MANIFEST.json` and bundled outside the client source/public folders. The handoff Vite config serves them without Forge credentials and emits them in the build output. Preserve the `/manus-storage/` URL prefix when moving the files to your own storage/CDN, or update source references consistently.

`website/client/src/components/Map.tsx` still uses the existing Manus Maps proxy and public frontend credential configuration. No credential is included. The college program JSON can be packaged, but the interactive Google map itself will not initialize on an independent host without approved map runtime authorization. The public demo uses Manus's integration; do not assume copying its code or asset URLs grants authorization to another origin. Arrange a supported proxy/Maps loader with the platform team and preserve `ProgramFinderMap.tsx` marker/filter behavior.

Google Fonts, YouTube embeds/links, externally hosted sample product photos and links to NWCA legacy resources remain external dependencies. Approve production content and accessibility before go-live. Serve the Vite output over HTTP with an SPA fallback, not by double-clicking `index.html`.

## References already used in the implementation handoff

The full original architecture and customer-flow note is `website/COMMERCE-INTEGRATION-HANDOFF.md`. Shopify integration guidance was verified November 19, 2026:

- https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/cart/manage
- https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/cart/migrate-to-cart-api
- https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/getting-started

Those references are guidance, not proof of a connected Shopify store. Recheck provider versions and vendor settings as part of implementation.
