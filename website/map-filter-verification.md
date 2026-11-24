# Where to Wrestle Map Filter Verification

Initial page load confirmed on 2026-08-14:

| Check | Result |
|---|---|
| Interactive map | Loaded successfully with Google Maps controls visible. |
| Initial result state | Toolbar displays `500 programs · All divisions`. |
| Legend controls | Fourteen program-division buttons render below the map. |
| Legend intent | Each division control exposes an accessible label stating `Show only [division] programs`. |

## Interaction Results

| Interaction | Observed Result |
|---|---|
| Select `Division I Men` | The toolbar changed from `500 programs · All divisions` to `47 programs · 1 division`, and the map showed only Division I Men's program markers. |
| Select `Division I Men` again | The toolbar returned to `500 programs · All divisions`, and all marker categories returned to the map. |

The legend now fulfills the requested behavior: a single division selection isolates that division's programs; a repeat selection restores the all-divisions map. The expanded Filters panel continues to support multi-division combinations.
