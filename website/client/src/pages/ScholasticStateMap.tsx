/**
 * ScholasticStateMap.tsx
 * NWCA Scholastic State Profile Map
 * Interactive SVG US map with per-state wrestling data.
 * Data source: stateWrestlingData.ts — update numbers there each season.
 *
 * Design: NWCA brand — dark navy (#0A1628) bg, NWCA red (#C41E3A), gold (#F5C842)
 * Layout: full-width dark hero header + filter tabs + interactive SVG map + state detail panel
 */

import { useState, useRef } from "react";
import { STATE_DATA, STATE_MAP, SanctionStatus } from "@/data/stateWrestlingData";
import { STATE_PATHS } from "@/data/statePaths";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

type FilterMode = "all" | "girls-sanctioned" | "girls-champ" | "boys";

const FILTER_OPTIONS: { id: FilterMode; label: string }[] = [
  { id: "all",             label: "All States" },
  { id: "girls-sanctioned", label: "Girls Sanctioned" },
  { id: "girls-champ",    label: "Girls State Champ" },
  { id: "boys",           label: "Boys Participation" },
];

// Boys participation tiers — 5 discrete buckets coaches can understand at a glance
const BOYS_TIERS = [
  { max: 1000,  color: "#1e3a5f", label: "Under 1,000" },
  { max: 3000,  color: "#2d5a8e", label: "1,000 – 2,999" },
  { max: 6000,  color: "#7b1a2e", label: "3,000 – 5,999" },
  { max: 12000, color: "#a82030", label: "6,000 – 11,999" },
  { max: Infinity, color: "#C41E3A", label: "12,000+" },
];

function getBoysColor(participants: number): string {
  for (const tier of BOYS_TIERS) {
    if (participants < tier.max) return tier.color;
  }
  return BOYS_TIERS[BOYS_TIERS.length - 1].color;
}

function getStateColor(abbr: string, filter: FilterMode): string {
  const s = STATE_MAP[abbr];
  if (!s) return "#1e2d45";
  if (filter === "girls-sanctioned") {
    if (s.girlsSanctioned === "sanctioned") return "#C41E3A";
    if (s.girlsSanctioned === "emerging")   return "#4a6fa5";
    return "#2a3a52";
  }
  if (filter === "girls-champ") {
    return s.girlsStateChamp ? "#C41E3A" : "#2a3a52";
  }
  if (filter === "boys") {
    return getBoysColor(s.boysParticipants);
  }
  // "all" — color by girls sanctioned status
  if (s.girlsSanctioned === "sanctioned") return "#C41E3A";
  if (s.girlsSanctioned === "emerging")   return "#4a6fa5";
  return "#2a3a52";
}

// Small state label offsets — exact centroids calculated from real state path data
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

export default function ScholasticStateMap() {
  const [filter, setFilter] = useState<FilterMode>("all");
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  const selected = selectedState ? STATE_MAP[selectedState] : null;
  const hovered  = hoveredState  ? STATE_MAP[hoveredState]  : null;

  const totalBoys  = STATE_DATA.reduce((a, s) => a + s.boysParticipants, 0);
  const totalGirls = STATE_DATA.reduce((a, s) => a + s.girlsParticipants, 0);
  const sanctionedCount = STATE_DATA.filter(s => s.girlsSanctioned === "sanctioned").length;
  const champCount      = STATE_DATA.filter(s => s.girlsStateChamp).length;

  function handleMouseMove(e: React.MouseEvent<SVGSVGElement>) {
    const rect = svgRef.current?.getBoundingClientRect();
    if (rect) setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      <NavBar solid />
      {/* ── HERO HEADER ─────────────────────────────────────────────── */}
      <div className="bg-[#060e1a] border-b border-white/10 py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="section-label mb-3">Advocacy</div>
          <h1 className="font-display text-6xl md:text-7xl leading-none mb-4">
            SCHOLASTIC<br />
            <span style={{ color: "#F5C842" }}>STATE PROFILE</span><br />
            MAP
          </h1>
          <p className="text-white/60 max-w-xl text-base leading-relaxed mt-4">
            High school wrestling participation data for all 50 states and D.C.
            Source: NFHS Wrestling Participation Report 2023–24.
            Girls sanctioning status updated May 2025.
          </p>

          {/* Summary stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {[
              { label: "Total Boys Participants", value: totalBoys.toLocaleString() },
              { label: "Total Girls Participants", value: totalGirls.toLocaleString() },
              { label: "States w/ Girls Sanctioned", value: `${sanctionedCount}/51` },
              { label: "States w/ Girls State Champ", value: `${champCount}/51` },
            ].map((stat) => (
              <div key={stat.label} className="border border-white/10 bg-white/5 px-5 py-4">
                <div className="font-display text-3xl text-white">{stat.value}</div>
                <div className="font-condensed text-[10px] tracking-widest uppercase text-white/50 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FILTER TABS ─────────────────────────────────────────────── */}
      <div className="border-b border-white/10 bg-[#0d1e35]">
        <div className="max-w-7xl mx-auto px-6 flex gap-0 overflow-x-auto">
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setFilter(opt.id)}
              className={`font-condensed font-700 text-xs tracking-widest uppercase px-6 py-4 border-b-2 transition-all whitespace-nowrap ${
                filter === opt.id
                  ? "border-[#C41E3A] text-white"
                  : "border-transparent text-white/40 hover:text-white/70"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── MAP + DETAIL PANEL ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">
        {/* SVG Map */}
        <div className="flex-1 relative">
          <svg
            ref={svgRef}
            viewBox="0 0 960 600"
            className="w-full h-auto"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredState(null)}
          >
            {Object.entries(STATE_PATHS).map(([abbr, d]) => {
              const color = getStateColor(abbr, filter);
              const isHovered  = hoveredState  === abbr;
              const isSelected = selectedState === abbr;
              return (
                <g key={abbr}>
                  <path
                    d={d}
                    fill={isSelected ? "#F5C842" : isHovered ? "#e8253a" : color}
                    stroke="#0A1628"
                    strokeWidth={isSelected || isHovered ? 2 : 1}
                    className="cursor-pointer transition-all duration-150"
                    onMouseEnter={() => setHoveredState(abbr)}
                    onMouseLeave={() => setHoveredState(null)}
                    onClick={() => setSelectedState(abbr === selectedState ? null : abbr)}
                  />
                  {/* State label */}
                  {(() => {
                    const offset = LABEL_OFFSETS[abbr];
                    if (offset) {
                      return (
                        <text
                          x={offset[0]} y={offset[1]}
                          fontSize="7" fill="white" textAnchor="middle"
                          className="pointer-events-none select-none font-bold"
                          style={{ fontFamily: "sans-serif", fontWeight: 700 }}
                        >
                          {abbr}
                        </text>
                      );
                    }
                    // Calculate centroid from path bounding box
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
              <div className="font-condensed text-[10px] tracking-widest uppercase text-white/50">
                Boys: {hovered.boysParticipants.toLocaleString()} athletes
              </div>
              <div className="font-condensed text-[10px] tracking-widest uppercase text-white/50">
                Girls: {hovered.girlsParticipants.toLocaleString()} athletes
              </div>
              <div className={`font-condensed text-[10px] tracking-widest uppercase mt-1 ${
                hovered.girlsSanctioned === "sanctioned" ? "text-white" :
                hovered.girlsSanctioned === "emerging"   ? "text-[#4a6fa5]" : "text-white/30"
              }`}>
                Girls: {hovered.girlsSanctioned}
                {hovered.girlsStateChamp ? " · State Champ ✓" : ""}
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-4 px-2">
            {filter === "boys" ? (
              <>
                <div className="font-condensed text-[10px] tracking-widest uppercase text-white/40 w-full mb-1">Boys Athlete Count</div>
                {BOYS_TIERS.map((tier) => (
                  <div key={tier.label} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-sm" style={{ background: tier.color }} />
                    <span className="font-condensed text-[10px] tracking-widest uppercase text-white/60">{tier.label}</span>
                  </div>
                ))}
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#C41E3A]" />
                  <span className="font-condensed text-[10px] tracking-widest uppercase text-white/50">Sanctioned</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#4a6fa5]" />
                  <span className="font-condensed text-[10px] tracking-widest uppercase text-white/50">Emerging Sport</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#2a3a52]" />
                  <span className="font-condensed text-[10px] tracking-widest uppercase text-white/50">Unsanctioned</span>
                </div>
              </>
            )}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#F5C842]" />
              <span className="font-condensed text-[10px] tracking-widest uppercase text-white/50">Selected</span>
            </div>
          </div>
        </div>

        {/* State Detail Panel */}
        <div className="lg:w-80 shrink-0">
          {selected ? (
            <div className="bg-[#060e1a] border border-white/10 p-6">
              <button
                onClick={() => setSelectedState(null)}
                className="font-condensed text-[10px] tracking-widest uppercase text-white/40 hover:text-white mb-4 flex items-center gap-1"
              >
                ← Back
              </button>
              <div className="font-display text-4xl text-white leading-none mb-1">{selected.abbr}</div>
              <div className="font-condensed text-sm text-white/60 mb-6">{selected.name}</div>

              {/* Boys */}
              <div className="border-t border-white/10 pt-4 mb-4">
                <div className="font-condensed text-[10px] tracking-widest uppercase text-white/40 mb-3">Boys Wrestling</div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-condensed text-xs text-white/60">Participants</span>
                  <span className="font-display text-2xl text-white">{selected.boysParticipants.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="font-condensed text-xs text-white/60">Schools</span>
                  <span className="font-display text-xl text-white">{selected.boysSchools.toLocaleString()}</span>
                </div>
              </div>

              {/* Girls */}
              <div className="border-t border-white/10 pt-4 mb-4">
                <div className="font-condensed text-[10px] tracking-widest uppercase text-white/40 mb-3">Girls Wrestling</div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-condensed text-xs text-white/60">Participants</span>
                  <span className="font-display text-2xl text-white">{selected.girlsParticipants.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-end mb-3">
                  <span className="font-condensed text-xs text-white/60">Schools</span>
                  <span className="font-display text-xl text-white">{selected.girlsSchools.toLocaleString()}</span>
                </div>
                <div className={`inline-block font-condensed text-[10px] tracking-widest uppercase px-3 py-1 border ${
                  selected.girlsSanctioned === "sanctioned"
                    ? "border-[#C41E3A] text-white"
                    : selected.girlsSanctioned === "emerging"
                    ? "border-[#4a6fa5] text-[#4a6fa5]"
                    : "border-white/20 text-white/30"
                }`}>
                  {selected.girlsSanctioned}
                </div>
                {selected.girlsStateChamp && (
                  <div className="mt-2 font-condensed text-[10px] tracking-widest uppercase text-[#F5C842]">
                    ★ Sponsors Girls State Championship
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="border-t border-white/10 pt-4">
                <div className="font-condensed text-[10px] tracking-widest uppercase text-white/40 mb-2">Total</div>
                <div className="flex justify-between items-end">
                  <span className="font-condensed text-xs text-white/60">All Participants</span>
                  <span className="font-display text-2xl text-white">
                    {(selected.boysParticipants + selected.girlsParticipants).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#060e1a] border border-white/10 p-6">
              <div className="font-condensed text-[10px] tracking-widest uppercase text-white/40 mb-4">Click a state to view details</div>
              <div className="space-y-3">
                {STATE_DATA
                  .sort((a, b) => (b.boysParticipants + b.girlsParticipants) - (a.boysParticipants + a.girlsParticipants))
                  .slice(0, 10)
                  .map((s, i) => (
                    <button
                      key={s.abbr}
                      onClick={() => setSelectedState(s.abbr)}
                      className="w-full flex items-center gap-3 hover:bg-white/5 px-2 py-1.5 transition-colors text-left"
                    >
                      <span className="font-condensed text-[10px] text-white/30 w-4">{i + 1}</span>
                      <span className="font-condensed font-700 text-xs text-white flex-1">{s.name}</span>
                      <span className="font-display text-sm text-white/70">
                        {(s.boysParticipants + s.girlsParticipants).toLocaleString()}
                      </span>
                    </button>
                  ))}
              </div>
              <div className="mt-4 font-condensed text-[10px] text-white/30 tracking-wide">
                Top 10 states by total participants
              </div>
            </div>
          )}

          {/* Data source note */}
          <div className="mt-4 font-condensed text-[9px] tracking-widest uppercase text-white/20 px-1">
            Data: NFHS Wrestling Participation Report 2023–24 · Girls sanctioning: NWCA May 2025
          </div>
        </div>
      </div>

      {/* ── STATE TABLE ─────────────────────────────────────────────── */}
      {/* White card table for maximum readability */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
          {/* Table header */}
          <div className="grid grid-cols-7 px-4 py-3 bg-[#0A1628] border-b border-gray-200">
            {["State", "Boys Schools", "Boys Athletes", "Girls Schools", "Girls Athletes", "Girls Status", "State Champ"].map(h => (
              <div key={h} className="font-condensed text-[10px] tracking-widest uppercase text-white font-bold">{h}</div>
            ))}
          </div>
          {STATE_DATA
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((s, i) => (
              <button
                key={s.abbr}
                onClick={() => setSelectedState(s.abbr === selectedState ? null : s.abbr)}
                className={`w-full grid grid-cols-7 px-4 py-3 items-center text-left transition-colors border-b border-gray-100 last:border-0 ${
                  selectedState === s.abbr ? "bg-yellow-50 border-l-4 border-l-[#B8860B]" : i % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-50`}
              >
                <div className="font-condensed font-700 text-xs text-[#0A1628]">{s.name}</div>
                <div className="font-mono text-xs text-gray-600">{s.boysSchools}</div>
                <div className="font-mono text-xs text-gray-800 font-semibold">{s.boysParticipants.toLocaleString()}</div>
                <div className="font-mono text-xs text-gray-600">{s.girlsSchools || "—"}</div>
                <div className={`font-mono text-xs font-semibold ${s.girlsParticipants > 0 ? "text-white" : "text-gray-300"}`}>
                  {s.girlsParticipants > 0 ? s.girlsParticipants.toLocaleString() : "—"}
                </div>
                <div className={`font-condensed text-[9px] tracking-widest uppercase font-bold ${
                  s.girlsSanctioned === "sanctioned" ? "text-white" :
                  s.girlsSanctioned === "emerging"   ? "text-blue-600" : "text-gray-300"
                }`}>
                  {s.girlsSanctioned}
                </div>
                <div className={`font-condensed text-[10px] font-bold ${s.girlsStateChamp ? "text-[#B8860B]" : "text-gray-300"}`}>
                  {s.girlsStateChamp ? "★ Yes" : "—"}
                </div>
              </button>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
