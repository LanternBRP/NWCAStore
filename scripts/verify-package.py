#!/usr/bin/env python3
"""Verify the delivered files before install/build changes them."""
import hashlib
import json
from pathlib import Path
import sys

root = Path(__file__).resolve().parents[1]
manifest = root / 'PACKAGE-CHECKSUMS.json'
if not manifest.exists():
    raise SystemExit('PACKAGE-CHECKSUMS.json is missing; use the complete extracted delivery.')
entries = json.loads(manifest.read_text())
failures = []
for entry in entries:
    file = root / entry['path']
    if not file.is_file():
        failures.append(f"Missing: {entry['path']}")
    elif hashlib.sha256(file.read_bytes()).hexdigest() != entry['sha256']:
        failures.append(f"Changed: {entry['path']}")
if failures:
    print('\n'.join(failures))
    sys.exit(1)
print(f'PASS: {len(entries)} packaged files match their delivery SHA-256 checksums.')
