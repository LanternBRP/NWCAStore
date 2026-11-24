# Package contents

This package is a tenant-injectable replacement for the earlier standalone NWCA commerce UI handoff.

- `src/extension-entry.tsx` — Shadow DOM mount function and extension entry point.
- `src/manifest.ts` and `MANIFEST.json` — manifest required by the Lantern portal host.
- `src/api/` — authenticated Lantern API adapter and data contracts.
- `src/components/` and `src/screens/` — capability-aware member-services UI.
- `src/styles.css` — isolated extension stylesheet, inserted only inside the mount Shadow DOM.
- `src/nwca-config.ts` — NWCA-specific copy and presentation configuration.
- `tests/` — initial manifest and API-adapter tests.
- `README.md` — host integration and CSS-isolation guidance.
- `ENGINEERING-CHECKLIST.md` — activation and acceptance checklist.
- `RELEASE-NOTES.md` — release behavior and required platform work.

No credentials, live product catalog, card form, database code, payment secrets, or independent login flow are included.
