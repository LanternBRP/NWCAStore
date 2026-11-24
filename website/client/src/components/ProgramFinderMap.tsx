/**
 * ProgramFinderMap — NWCA Interactive Program Finder
 *
 * Design: NWCA dark navy/red palette, condensed typography
 * Data: 500 real college wrestling programs from NWCA API (cached JSON)
 * Features:
 *   - Google Maps with custom colored pins per division
 *   - Division filter sidebar (checkboxes, color-coded)
 *   - Quick-filter legend: selecting one division isolates its map markers
 *   - Search by school name, city, or state
 *   - Clickable info popups: school, address, coach, email, website
 *   - "Locate me" button to zoom to user's state
 */

/// <reference types="@types/google.maps" />

import { useEffect, useRef, useState, useCallback } from "react";
import { MapView } from "@/components/Map";
import { Search, X, Filter, MapPin, ExternalLink, Mail, ChevronDown, ChevronUp } from "lucide-react";

// ── Division color map (matches NWCA's own color scheme) ─────────────────────
const DIVISION_COLORS: Record<string, string> = {
  "CCCAA Men":       "#f1c232",
  "CCCAA Women":     "#c27ba0",
  "Division I Men":  "#fff900",
  "Division I Women":"#e69138",
  "Division II Men": "#ffffff",
  "Division II Women":"#6aa84f",
  "Division III Men":"#bcbcbc",
  "Division III Women":"#6fa8dc",
  "NAIA Men":        "#0000CC",
  "NAIA Women":      "#ea9999",
  "NCWA Men":        "#cc0000",
  "NCWA Women":      "#ff00e0",
  "NJCAA Men":       "#8e7cc3",
  "NJCAA Women":     "#274e13",
};

// Group divisions for the filter panel
const DIVISION_GROUPS = [
  {
    label: "NCAA",
    divs: ["Division I Men","Division I Women","Division II Men","Division II Women","Division III Men","Division III Women"],
  },
  {
    label: "NAIA",
    divs: ["NAIA Men","NAIA Women"],
  },
  {
    label: "NJCAA",
    divs: ["NJCAA Men","NJCAA Women"],
  },
  {
    label: "NCWA",
    divs: ["NCWA Men","NCWA Women"],
  },
  {
    label: "CCCAA",
    divs: ["CCCAA Men","CCCAA Women"],
  },
];

interface Program {
  name: string;
  lat: number;
  lng: number;
  address: string;
  city: string;
  state: string;
  coach: string;
  email: string;
  division: string;
  website: string;
  conference: string;
}

interface ProgramFinderMapProps {
  className?: string;
}

export function ProgramFinderMap({ className }: ProgramFinderMapProps) {
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<Map<string, google.maps.marker.AdvancedMarkerElement>>(new Map());
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [enabledDivisions, setEnabledDivisions] = useState<Set<string>>(
    new Set(Object.keys(DIVISION_COLORS))
  );
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [matchCount, setMatchCount] = useState(0);

  // ── Load program data ───────────────────────────────────────────────────────
  useEffect(() => {
    fetch("/manus-storage/nwca_programs_c171ef8a.json")
      .then((r) => r.json())
      .then((data: Program[]) => {
        setPrograms(data);
        setMatchCount(data.length);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // ── Create SVG pin for a division ──────────────────────────────────────────
  const createPin = useCallback((division: string) => {
    const color = DIVISION_COLORS[division] || "#C41E3A";
    const el = document.createElement("div");
    el.innerHTML = `<svg width="22" height="30" viewBox="0 0 22 30" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 0C4.925 0 0 4.925 0 11c0 8.25 11 19 11 19s11-10.75 11-19C22 4.925 17.075 0 11 0z"
        fill="${color}" stroke="#1c2333" stroke-width="1.5"/>
      <circle cx="11" cy="11" r="4" fill="#1c2333" opacity="0.5"/>
    </svg>`;
    el.style.cursor = "pointer";
    el.style.transform = "translate(-50%, -100%)";
    return el;
  }, []);

  // ── Render / update markers when map or data changes ───────────────────────
  const renderMarkers = useCallback(() => {
    if (!mapRef.current || programs.length === 0) return;

    const query = searchQuery.toLowerCase().trim();

    // Remove all existing markers
    markersRef.current.forEach((m) => { (m as any).map = null; });
    markersRef.current.clear();

    let count = 0;
    programs.forEach((prog) => {
      if (!enabledDivisions.has(prog.division)) return;
      if (query) {
        const haystack = `${prog.name} ${prog.city} ${prog.state} ${prog.address} ${prog.conference}`.toLowerCase();
        if (!haystack.includes(query)) return;
      }
      if (!prog.lat || !prog.lng) return;

      count++;
      const pinEl = createPin(prog.division);
      const marker = new google.maps.marker.AdvancedMarkerElement({
        map: mapRef.current!,
        position: { lat: prog.lat, lng: prog.lng },
        title: prog.name,
        content: pinEl,
      });

      marker.addListener("click", () => {
        setSelectedProgram(prog);
        mapRef.current?.panTo({ lat: prog.lat, lng: prog.lng });
        if (window.innerWidth < 768) {
          mapRef.current?.setZoom(10);
        }
      });

      markersRef.current.set(prog.name, marker);
    });

    setMatchCount(count);
  }, [programs, enabledDivisions, searchQuery, createPin]);

  useEffect(() => {
    renderMarkers();
  }, [renderMarkers]);

  // ── Toggle a single division ────────────────────────────────────────────────
  const toggleDivision = (div: string) => {
    setEnabledDivisions((prev) => {
      const next = new Set(prev);
      if (next.has(div)) next.delete(div);
      else next.add(div);
      return next;
    });
  };

  // ── Toggle an entire group ──────────────────────────────────────────────────
  const toggleGroup = (divs: string[]) => {
    const allOn = divs.every((d) => enabledDivisions.has(d));
    setEnabledDivisions((prev) => {
      const next = new Set(prev);
      if (allOn) divs.forEach((d) => next.delete(d));
      else divs.forEach((d) => next.add(d));
      return next;
    });
  };

  // ── Select all / none ───────────────────────────────────────────────────────
  const selectAll = () => setEnabledDivisions(new Set(Object.keys(DIVISION_COLORS)));
  const selectNone = () => setEnabledDivisions(new Set());

  // ── Quick-select one division from the legend ───────────────────────────────
  // The map begins with all divisions visible. Clicking a legend item must do
  // more than hide that division: it isolates that item so the visual change is
  // clear and the map shows only the requested program type. Clicking the same
  // isolated item again restores the all-divisions view. The expanded Filters
  // panel remains available for multi-division combinations.
  const selectOnlyDivision = (division: string) => {
    setEnabledDivisions((prev) => {
      const isAlreadyIsolated = prev.size === 1 && prev.has(division);
      return isAlreadyIsolated
        ? new Set(Object.keys(DIVISION_COLORS))
        : new Set([division]);
    });
    setSelectedProgram((prev) => (prev?.division === division ? prev : null));
  };

  // ── Geocode search to zoom map ──────────────────────────────────────────────
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mapRef.current || !searchQuery.trim()) return;
    // If it looks like a state or city, geocode and zoom
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: searchQuery + ", USA" }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        mapRef.current?.fitBounds(results[0].geometry.viewport);
      }
    });
  };

  const allDivs = Object.keys(DIVISION_COLORS);

  return (
    <div className={`flex flex-col ${className}`}>
      {/* ── Toolbar ──────────────────────────────────────────────────────── */}
      <div className="bg-[#141c2e] border-b border-white/10 px-4 py-3 flex flex-wrap items-center gap-3">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="flex-1 min-w-[200px] max-w-sm relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Search school, city, or state…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/8 border border-white/15 text-[#C41E3A] placeholder-white/35 text-sm pl-9 pr-8 py-2 focus:outline-none focus:border-[#C41E3A]/60 transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </form>

        {/* Filter toggle */}
        <button
          onClick={() => setFiltersOpen((v) => !v)}
          className="flex items-center gap-2 font-condensed font-700 text-xs tracking-widest uppercase px-3 py-2 border border-white/20 text-white/85 hover:border-[#C41E3A] hover:text-white transition-colors"
        >
          <Filter className="w-3.5 h-3.5" />
          Filters
          {filtersOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>

        {/* Match count */}
        <div className="ml-auto font-condensed text-xs text-white/40 tracking-wide whitespace-nowrap">
          {loading
            ? "Loading…"
            : enabledDivisions.size === allDivs.length
              ? `${matchCount} programs · All divisions`
              : `${matchCount} programs · ${enabledDivisions.size} division${enabledDivisions.size === 1 ? "" : "s"}`}
        </div>
      </div>

      {/* ── Filter panel ─────────────────────────────────────────────────── */}
      {filtersOpen && (
        <div className="bg-[#141c2e] border-b border-white/10 px-4 py-4">
          <div className="flex items-center gap-4 mb-3">
            <span className="font-condensed font-700 text-xs tracking-widest uppercase text-white/80">Division Filters</span>
            <button onClick={selectAll} className="font-condensed text-xs text-white hover:underline tracking-wide">All</button>
            <button onClick={selectNone} className="font-condensed text-xs text-white/40 hover:text-white tracking-wide">None</button>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {DIVISION_GROUPS.map((group) => (
              <div key={group.label}>
                <button
                  onClick={() => toggleGroup(group.divs)}
                  className="font-condensed font-700 text-[10px] tracking-widest uppercase text-white/80 hover:text-white mb-1.5 block"
                >
                  {group.label}
                </button>
                <div className="flex flex-col gap-1">
                  {group.divs.map((div) => {
                    const color = DIVISION_COLORS[div] || "#C41E3A";
                    const on = enabledDivisions.has(div);
                    return (
                      <label key={div} className="flex items-center gap-2 cursor-pointer group">
                        <span
                          onClick={() => toggleDivision(div)}
                          className={`w-3 h-3 rounded-sm flex-shrink-0 border transition-opacity ${on ? "opacity-100" : "opacity-30"}`}
                          style={{ backgroundColor: color, borderColor: color }}
                        />
                        <span
                          onClick={() => toggleDivision(div)}
                          className={`font-body text-xs transition-colors ${on ? "text-white/80" : "text-white/30"} group-hover:text-white`}
                        >
                          {div}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Map + info panel ─────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row flex-1 min-h-0">
        {/* Map */}
        <div className="flex-1 relative" style={{ minHeight: "500px" }}>
          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#1c2333]/80">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-[#C41E3A] border-t-transparent rounded-full animate-spin" />
                <span className="font-condensed text-xs tracking-widest uppercase text-white/80">Loading Programs…</span>
              </div>
            </div>
          )}
          <MapView
            className="w-full h-full"
            initialCenter={{ lat: 39.5, lng: -98.35 }}
            initialZoom={4}
            onMapReady={(map) => {
              mapRef.current = map;
              // Style the map dark
              map.setOptions({
                styles: [
                  { elementType: "geometry", stylers: [{ color: "#1c2333" }] },
                  { elementType: "labels.text.stroke", stylers: [{ color: "#1c2333" }] },
                  { elementType: "labels.text.fill", stylers: [{ color: "#8892a4" }] },
                  { featureType: "road", elementType: "geometry", stylers: [{ color: "#2d3a52" }] },
                  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#6b7a99" }] },
                  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0a1628" }] },
                  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#3d5a80" }] },
                  { featureType: "administrative.country", elementType: "geometry.stroke", stylers: [{ color: "#4a5568" }] },
                  { featureType: "administrative.province", elementType: "geometry.stroke", stylers: [{ color: "#3a4a6b" }] },
                  { featureType: "poi", stylers: [{ visibility: "off" }] },
                  { featureType: "transit", stylers: [{ visibility: "off" }] },
                ],
              });
              renderMarkers();
            }}
          />
        </div>

        {/* Info panel */}
        {selectedProgram && (
          <div className="w-full md:w-72 bg-[#141c2e] border-l border-white/10 flex flex-col overflow-y-auto">
            <div className="flex items-start justify-between p-4 border-b border-white/10">
              <div>
                <div
                  className="inline-block text-[10px] font-condensed font-700 tracking-widest uppercase px-2 py-0.5 mb-2"
                  style={{
                    backgroundColor: (DIVISION_COLORS[selectedProgram.division] || "#C41E3A") + "22",
                    color: DIVISION_COLORS[selectedProgram.division] || "#C41E3A",
                    border: `1px solid ${DIVISION_COLORS[selectedProgram.division] || "#C41E3A"}44`,
                  }}
                >
                  {selectedProgram.division}
                </div>
                <h3 className="font-condensed font-700 text-base text-white leading-tight">
                  {selectedProgram.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProgram(null)}
                className="text-white/30 hover:text-white ml-2 flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-3 text-sm">
              {selectedProgram.address && (
                <div className="flex gap-2">
                  <MapPin className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white/80 whitespace-pre-line leading-snug">{selectedProgram.address}</span>
                </div>
              )}
              {selectedProgram.coach && (
                <div>
                  <div className="font-condensed text-[10px] tracking-widest uppercase text-white/30 mb-0.5">Head Coach</div>
                  <div className="text-white/80">{selectedProgram.coach}</div>
                </div>
              )}
              {selectedProgram.email && (
                <div className="flex gap-2">
                  <Mail className="w-4 h-4 text-white/30 flex-shrink-0 mt-0.5" />
                  <a
                    href={`mailto:${selectedProgram.email}`}
                    className="text-white hover:underline break-all"
                  >
                    {selectedProgram.email}
                  </a>
                </div>
              )}
              {selectedProgram.conference && (
                <div>
                  <div className="font-condensed text-[10px] tracking-widest uppercase text-white/30 mb-0.5">Conference</div>
                  <div className="text-white/80">{selectedProgram.conference}</div>
                </div>
              )}
              {selectedProgram.website && (
                <a
                  href={selectedProgram.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 mt-2 font-condensed font-700 text-xs tracking-widest uppercase px-3 py-2 bg-[#C41E3A] text-white hover:bg-[#a01830] transition-colors w-full justify-center"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Program Website
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── Legend bar ───────────────────────────────────────────────────── */}
      <div className="bg-[#141c2e] border-t border-white/10 px-4 py-2 flex flex-wrap gap-x-4 gap-y-1.5">
        {allDivs.map((div) => (
          <button
            key={div}
            type="button"
            onClick={() => selectOnlyDivision(div)}
            aria-pressed={enabledDivisions.size === 1 && enabledDivisions.has(div)}
            title={`Show only ${div} programs`}
            className={`flex items-center gap-1.5 transition-opacity hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5C842] ${enabledDivisions.has(div) ? "opacity-100" : "opacity-30"}`}
          >
            <span
              className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
              style={{ backgroundColor: DIVISION_COLORS[div] }}
            />
            <span className="font-body text-[10px] text-white/80 whitespace-nowrap">{div}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
