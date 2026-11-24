# NWCA developer handoff

Prepared November 24, 2026 for the NWCA developer and LanternBRP™ team. This is a complete source delivery for manual import into `https://github.com/LanternBRP/NWCAStore.git`; it is not a Git push, a running AMS backend, or a live Shopify connector.

## What to open

`website/` contains the full public NWCA React/TypeScript site: navigation, organization and coaching pages, division tabs, events/calendar, maps, membership/donation interfaces, shop UI and unified checkout contract. It preserves the existing NWCA visual design. The source checkpoint is recorded in `SOURCE-PROVENANCE.json`.

`tenant-extension/` contains the separate NWCA tenant-injectable library, including source, manifest, built JavaScript, TypeScript declarations, tests and integration documentation. It belongs inside Lantern's authenticated portal shell. It is not a replacement for the public website and is not a standalone AMS application.

`docs/` contains integration notes, packaged-asset inventory, and validation results. Read `docs/INTEGRATION-STATUS.md` before treating a UI flow as a live purchase flow. Read `tenant-extension/README.md` before mounting the library.

## Run the public UI locally

Use Node.js 22 LTS and pnpm 10.4.1, matching the source package's declared package manager. From the extracted bundle:

```sh
cd website
pnpm install --frozen-lockfile
pnpm run check
pnpm run dev:handoff
```

Open `http://localhost:3000`. For a production build and local preview:

```sh
pnpm run build:handoff
pnpm run preview:handoff
```

Open `http://localhost:4173`. Deploy `website/dist/public/` to a static host with an SPA fallback to `index.html` for application routes, after configuring the required services. The included Express server is only a static-file/SPA host; it is not a payment or AMS backend. `pnpm start` can serve a built website from Node when desired.

The new `*:handoff` scripts use `vite.handoff.config.ts`, which removes reliance on Manus runtime/debug/storage infrastructure for local asset delivery. The original `vite.config.ts` and scripts remain as provenance, but should not be used for the independent handoff preview. An unconfigured analytics script was removed in this export only. The shop header's obsolete Checkout API instruction was corrected to the Cart API. No published site source was changed.

Referenced Manus media/data assets are included under `website/assets/manus-storage/`, outside `client/public` and `client/src`. The portable Vite config serves those paths locally and copies them into the static production output. Google Fonts, YouTube and representative externally hosted product photos still require internet access. Maps need separate approved runtime authorization, as documented in `docs/INTEGRATION-STATUS.md`.

## Install the tenant extension

From `tenant-extension/`, use the installation, library build, and mount instructions in its README. The host supplies tenant/user context, capabilities, API base URL, navigation and checkout handling. React and ReactDOM are external peer dependencies of the built extension. Mounting the JS alone does not create an AMS server or authenticate a user.

## Import into the developer's Git repository

Use your own authorized GitHub account. Do not initialize Git in the bundle and force-push it over the repository. Preserve the current repository and use a new branch:

```sh
git clone https://github.com/LanternBRP/NWCAStore.git
cd NWCAStore
git switch -c handoff/nwca-source-2026-11-24
```

Copy the bundle's `website/`, `tenant-extension/`, `docs/`, `README-START-HERE.md` and `SOURCE-PROVENANCE.json` into the repository. Keep these folders initially so the public site and tenant library are distinct. Inspect existing repository instructions before deciding whether to merge either app into a different layout.

```sh
git status --short
git add website tenant-extension docs README-START-HERE.md SOURCE-PROVENANCE.json
git diff --cached --stat
# Review the staged source and ensure no credentials or local .env files were added.
git commit -m "Add NWCA public UI and tenant extension handoff"
git push -u origin handoff/nwca-source-2026-11-24
```

Review through the team's normal pull-request process. Do not force-push or replace `main`. Do not stage `node_modules`, local environment files or the prebuilt `dist` output generated on your computer unless your repository deliberately tracks built artifacts. The extension's included `dist` is a delivery artifact; it can be omitted from Git if the team's build pipeline regenerates it.

## Customer-facing build

The public design-review address last checked November 23, 2026 is:

https://nwcastore-hfy5minw.manus.space/

This is the public NWCA website, not a deployed LanternAMS tenant portal. Payment and account integrations remain implementation work. Nothing in this package grants AMS benefits based solely on a browser redirect.
