/**
 * GirlsSanctioningMap — Reuses the exact same SVG map and data from ScholasticStateMap
 * locked to "girls-sanctioned" view: red = sanctioned, blue = emerging, dark = unsanctioned.
 */

import { useState, useRef } from "react";
import { STATE_MAP } from "@/data/stateWrestlingData";
import { STATE_PATHS } from "@/data/statePaths";

// Small state label offsets — exact centroids from ScholasticStateMap
const LABEL_OFFSETS: Record<string, [number, number]> = {
  CT: [799.6, 136.6],
  DE: [771.5, 184.2],
  DC: [751.0, 196.4],
  MD: [756.4, 197.0],
  MA: [822.8, 121.1],
  NH: [802.8, 88.4],
  NJ: [777.7, 168.3],
  RI: [816.9, 129.7],
  VT: [790.0, 88.9],
};

function getColor(abbr: string): string {
  const s = STATE_MAP[abbr];
  if (!s) return "#1e2d45";
  if (s.girlsSanctioned === "sanctioned") return "#C41E3A";
  if (s.girlsSanctioned === "emerging")   return "#4a6fa5";
  return "#2a3a52";
}

interface Props {
  className?: string;
}

export default function GirlsSanctioningMap({ className = "" }: Props) {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  const hovered = hoveredState ? STATE_MAP[hoveredState] : null;

  function handleMouseMove(e: React.MouseEvent<SVGSVGElement>) {
    const rect = svgRef.current?.getBoundingClientRect();
    if (rect) setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <div className={`relative ${className}`}>
      <svg
        ref={svgRef}
        viewBox="0 0 960 600"
        className="w-full h-auto"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredState(null)}
        aria-label="US map showing girls wrestling sanctioning by state"
        role="img"
      >
        {Object.entries(STATE_PATHS).map(([abbr, d]) => {
          const isHovered = hoveredState === abbr;
          const color = getColor(abbr);
          return (
            <g key={abbr}>
              <path
                d={d}
                fill={isHovered ? "#e8253a" : color}
                stroke="#0A1628"
                strokeWidth={isHovered ? 2 : 1}
                className="cursor-pointer transition-all duration-150"
                onMouseEnter={() => setHoveredState(abbr)}
                onMouseLeave={() => setHoveredState(null)}
              />
              {(() => {
                const offset = LABEL_OFFSETS[abbr];
                if (offset) {
                  return (
                    <text
                      x={offset[0]} y={offset[1]}
                      fontSize="7" fill="white" textAnchor="middle"
                      className="pointer-events-none select-none"
                      style={{ fontFamily: "sans-serif", fontWeight: 700 }}
                    >
                      {abbr}
                    </text>
                  );
                }
                const coords = d.match(/[\d.]+\s+[\d.]+/g) || [];
                if (coords.length === 0) return null;
                const pts = coords.map(c => c.split(/\s+/).map(Number) as [number, number]);
                const cx = pts.reduce((s, p) => s + p[0], 0) / pts.length;
                const cy = pts.reduce((s, p) => s + p[1], 0) / pts.length;
                return (
                  <text
                    x={cx} y={cy + 3}
                    fontSize="8" fill="white" textAnchor="middle"
                    className="pointer-events-none select-none"
                    style={{ fontFamily: "sans-serif", fontWeight: 700 }}
                  >
                    {abbr}
                  </text>
                );
              })()}
            </g>
          );
        })}
      </svg>

      {/* Hover tooltip */}
      {hovered && (
        <div
          className="absolute pointer-events-none z-20 bg-[#060e1a] border border-white/20 px-4 py-3 shadow-xl"
          style={{ left: Math.min(tooltipPos.x + 12, 700), top: Math.max(tooltipPos.y - 60, 0) }}
        >
          <div className="font-display text-sm text-white mb-1">{hovered.name}</div>
          <div className={`font-condensed text-[10px] tracking-widest uppercase mt-1 ${
            hovered.girlsSanctioned === "sanctioned" ? "text-white" :
            hovered.girlsSanctioned === "emerging"   ? "text-[#4a6fa5]" : "text-white/30"
          }`}>
            {hovered.girlsSanctioned === "sanctioned" ? "Sanctioned ✓" :
             hovered.girlsSanctioned === "emerging"   ? "Emerging Sport" : "Not yet sanctioned"}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 px-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#C41E3A]" />
          <span className="font-condensed text-[10px] tracking-widest uppercase text-white/50">Sanctioned (47)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#4a6fa5]" />
          <span className="font-condensed text-[10px] tracking-widest uppercase text-white/50">Emerging Sport</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#2a3a52]" />
          <span className="font-condensed text-[10px] tracking-widest uppercase text-white/50">Not yet sanctioned</span>
        </div>
      </div>
    </div>
  );
}
