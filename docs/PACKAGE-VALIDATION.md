# Delivery checks

Prepared November 24, 2026. The website passed a fresh lockfile installation, TypeScript check, independent production build and local HTTP/asset-delivery tests. The preserved tenant extension passed underlying type, scoped-CSS, declaration, library-build and five mocked unit checks; its exact test-environment limitations and unresolved defects are in TENANT-VALIDATION.md.

The archive contains source, configuration, NWCA media/data, built delivery artifacts and documentation. It excludes dependencies, Git internals, actual environment files, Manus credential configuration and logs. A targeted credential-pattern scan passed, but this is not a comprehensive security audit. No payment/account provider credentials are included. The copied public environment example contains empty values only.

The historical tenant dist files remain byte-identical to the September source delivery. The website build was generated without inherited VITE_/Forge keys. No code was pushed to Git, no main branch overwritten, and the published site was not changed.

Run `python3 scripts/verify-package.py` at the extracted bundle root before editing/building to compare delivered file hashes. New node_modules files from installation do not participate in the manifest. Builds may legitimately change delivered dist files afterward.
