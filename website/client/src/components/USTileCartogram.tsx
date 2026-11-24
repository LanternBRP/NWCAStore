/**
 * USTileCartogram — Standard US tile cartogram (equal-area grid)
 * Uses the conventional 7-row × 11-column layout (NPR/WaPo standard).
 * sanctioned = NWCA red #C41E3A, not sanctioned = navy #17214B
 *
 * Grid positions [row, col] — 0-indexed, 0=top-left
 */

const TILE = 44;
const GAP = 3;
const STEP = TILE + GAP;

// [row, col, abbr, fullName, sanctioned]
const STATES: [number, number, string, string, boolean][] = [
  // Row 0 — AK far left, ME far right
  [0,  0, "AK", "Alaska",          true],
  [0, 10, "ME", "Maine",           true],

  // Row 1 — Pacific NW → Great Lakes → New England
  [1,  0, "WA", "Washington",      true],
  [1,  1, "MT", "Montana",         true],
  [1,  2, "ND", "North Dakota",    true],
  [1,  3, "MN", "Minnesota",       true],
  [1,  4, "WI", "Wisconsin",       true],
  [1,  5, "MI", "Michigan",        true],
  [1,  8, "VT", "Vermont",         true],
  [1,  9, "NH", "New Hampshire",   true],

  // Row 2 — Pacific Coast → Midwest → Northeast
  [2,  0, "OR", "Oregon",          true],
  [2,  1, "ID", "Idaho",           true],
  [2,  2, "SD", "South Dakota",    true],
  [2,  3, "NE", "Nebraska",        true],
  [2,  4, "IA", "Iowa",            true],
  [2,  5, "IL", "Illinois",        true],
  [2,  6, "IN", "Indiana",         true],
  [2,  7, "OH", "Ohio",            true],
  [2,  8, "PA", "Pennsylvania",    true],
  [2,  9, "NY", "New York",        true],
  [2, 10, "MA", "Massachusetts",   true],

  // Row 3 — California → Plains → Mid-Atlantic
  [3,  0, "CA", "California",      true],
  [3,  1, "NV", "Nevada",          true],
  [3,  2, "WY", "Wyoming",         true],
  [3,  3, "CO", "Colorado",        true],
  [3,  4, "KS", "Kansas",          true],
  [3,  5, "MO", "Missouri",        true],
  [3,  6, "KY", "Kentucky",        true],
  [3,  7, "WV", "West Virginia",   true],
  [3,  8, "VA", "Virginia",        true],
  [3,  9, "MD", "Maryland",        true],
  [3, 10, "CT", "Connecticut",     true],

  // Row 4 — Southwest → South → Southeast coast
  [4,  1, "AZ", "Arizona",         true],
  [4,  2, "UT", "Utah",            true],
  [4,  3, "NM", "New Mexico",      true],
  [4,  4, "OK", "Oklahoma",        true],
  [4,  5, "AR", "Arkansas",        true],
  [4,  6, "TN", "Tennessee",       true],
  [4,  7, "NC", "North Carolina",  true],
  [4,  8, "SC", "South Carolina",  true],
  [4,  9, "NJ", "New Jersey",      true],
  [4, 10, "RI", "Rhode Island",    true],

  // Row 5 — Texas → Gulf South → Florida + DE
  [5,  3, "TX", "Texas",           true],
  [5,  4, "LA", "Louisiana",       false], // not sanctioned
  [5,  5, "MS", "Mississippi",     false], // not sanctioned
  [5,  6, "AL", "Alabama",         true],
  [5,  7, "GA", "Georgia",         true],
  [5,  8, "FL", "Florida",         true],
  [5,  9, "DE", "Delaware",        false], // not sanctioned

  // Row 6 — Hawaii
  [6,  0, "HI", "Hawaii",          true],
];

const COLS = 11;
const ROWS = 7;
const SVG_W = COLS * STEP - GAP;
const SVG_H = ROWS * STEP - GAP;

const SANCTIONED_FILL   = "#C41E3A";
const UNSANCTIONED_FILL = "#17214B";
const TEXT_COLOR        = "#ffffff";
const STROKE            = "#0A0E1A";

interface Props {
  className?: string;
}

export default function USTileCartogram({ className = "" }: Props) {
  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="w-full max-w-3xl mx-auto block"
        style={{ minWidth: 300 }}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="US tile cartogram — girls wrestling sanctioning by state"
        role="img"
      >
        {STATES.map(([row, col, abbr, fullName, sanctioned]) => {
          const x = col * STEP;
          const y = row * STEP;
          return (
            <g key={abbr}>
              <rect
                x={x}
                y={y}
                width={TILE}
                height={TILE}
                fill={sanctioned ? SANCTIONED_FILL : UNSANCTIONED_FILL}
                stroke={STROKE}
                strokeWidth={1.5}
                rx={2}
              >
                <title>{fullName} — {sanctioned ? "Sanctioned ✓" : "Not yet sanctioned"}</title>
              </rect>
              <text
                x={x + TILE / 2}
                y={y + TILE / 2 + 4}
                textAnchor="middle"
                fill={TEXT_COLOR}
                fontSize={abbr.length > 2 ? 8 : 11}
                fontFamily="'Barlow Condensed', 'Arial Narrow', sans-serif"
                fontWeight="700"
                letterSpacing="0.04em"
                style={{ userSelect: "none", pointerEvents: "none" }}
              >
                {abbr}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
