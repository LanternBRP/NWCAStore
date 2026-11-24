# Public website package validation

Checked November 24, 2026 on Node v22.23.4. These checks apply to the exported handoff package, not to live payment or AMS integrations.

- Fresh `pnpm install --frozen-lockfile`: completed before these checks.
- `pnpm run check`: passed with no TypeScript errors.
- `pnpm run build:handoff`: passed; static files and the optional static-serving Node bundle generated.
- All 38 packaged NWCA media/data assets match the inventory hashes and were emitted to `dist/public/manus-storage/`.
- Built HTTP server returned the SPA document for `/`, `/shop`, `/join`, `/checkout` and `/grow/where-to-wrestle`.
- NWCA logo served as valid PNG with `image/png` content type.
- Program-finder JSON delivered and parsed successfully.
- Validation build stripped inherited `VITE_` and `BUILT_IN_FORGE_` configuration from the subprocess environment and used no real account/payment credentials.

## Checks not claimed

No new live Stripe payment, Shopify order, AMS account/session, tenant entitlement or independent-host Google Maps authorization was tested. HTTP route checks validate SPA delivery, not every interaction or a browser rendering audit. Google Fonts, external sample product photos and YouTube remain internet dependencies. Read `INTEGRATION-STATUS.md` for the remaining work.

The original published NWCA project was not modified or redeployed. Source origin and export-only additions are documented in `SOURCE-PROVENANCE.json`.
