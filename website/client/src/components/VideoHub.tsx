/**
 * VideoHub — Unified NWCA video section with category filter tabs
 * Design: Dark navy with red/blue mat arc backgrounds, featured player + thumbnail rail
 */
import { useState } from "react";
import { ArrowRight } from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────
interface VideoItem {
  id: string;
  videoId: string;
  title: string;
  subtitle: string;
  label: string;
  labelColor: string;
  category: "all-star" | "national-duals";
  featured?: boolean;
}

// ─── Data ───────────────────────────────────────────────────────────────────
const VIDEOS: VideoItem[] = [
  {
    id: "echemendia-mendez",
    videoId: "YiXNb-qeTNg",
    title: "Echemendia vs Mendez",
    subtitle: "133 lbs · 2025 All-Star Classic",
    label: "MARQUEE BOUT",
    labelColor: "#C41E3A",
    category: "all-star",
    featured: true,
  },
  {
    id: "asc-2025-replay",
    videoId: "NpSQ0dHFBNY",
    title: "2025 All-Star Classic",
    subtitle: "Full Broadcast",
    label: "2025 REPLAY",
    labelColor: "#17214B",
    category: "all-star",
  },
  {
    id: "asc-2024-replay",
    videoId: "KSgLA5sTonk",
    title: "2024 All-Star Classic",
    subtitle: "Full Broadcast",
    label: "2024 REPLAY",
    labelColor: "#17214B",
    category: "all-star",
  },
  {
    id: "asc-2023-replay",
    videoId: "fy11howbXPI",
    title: "2023 All-Star Classic",
    subtitle: "Full Broadcast",
    label: "2023 REPLAY",
    labelColor: "#17214B",
    category: "all-star",
  },
  {
    id: "asc-2024-highlights",
    videoId: "H-_1KARvThk",
    title: "Scrambles & Flurries",
    subtitle: "2024 Highlights",
    label: "2024 HIGHLIGHTS",
    labelColor: "#C41E3A",
    category: "all-star",
  },
  {
    id: "nd-2025-di",
    videoId: "y1qR5GRHWOs",
    title: "Northern Iowa vs South Dakota State",
    subtitle: "2025 DI National Duals Finals",
    label: "2025 DI FINALS",
    labelColor: "#17214B",
    category: "national-duals",
  },
  {
    id: "nd-2026-dii",
    videoId: "OIHC0umSvtg",
    title: "Nebraska-Kearney vs Central Oklahoma",
    subtitle: "2026 DII National Duals Finals",
    label: "2026 DII FINALS",
    labelColor: "#C41E3A",
    category: "national-duals",
  },
];

// ─── YouTubeFacade (inline to keep component self-contained) ─────────────────
function Facade({
  videoId,
  title,
  label,
  labelColor,
}: {
  videoId: string;
  title: string;
  label?: string;
  labelColor?: string;
}) {
  const [active, setActive] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

  if (active) {
    return (
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      className="relative w-full h-full group/play cursor-pointer bg-black"
      onClick={() => setActive(true)}
      aria-label={`Play ${title}`}
    >
      <img
        src={thumb}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover/play:scale-105"
        onError={(e) => {
          (e.target as HTMLImageElement).src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
        }}
      />
      <div className="absolute inset-0 bg-black/30 group-hover/play:bg-black/10 transition-colors duration-300" />
      {label && (
        <div
          className="absolute top-2 left-2 font-condensed font-700 text-[10px] tracking-widest uppercase text-white px-2 py-0.5"
          style={{ backgroundColor: labelColor || "#C41E3A" }}
        >
          {label}
        </div>
      )}
      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-[#C41E3A] flex items-center justify-center shadow-lg shadow-black/60 group-hover/play:scale-110 transition-transform duration-200">
          <svg className="w-6 h-6 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
type FilterTab = "all" | "all-star" | "national-duals";

const TABS: { id: FilterTab; label: string }[] = [
  { id: "all", label: "All Videos" },
  { id: "all-star", label: "All-Star Classic" },
  { id: "national-duals", label: "National Duals" },
];

export default function VideoHub() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [activeVideoId, setActiveVideoId] = useState<string>(VIDEOS[0].id);

  const filtered = activeTab === "all" ? VIDEOS : VIDEOS.filter((v) => v.category === activeTab);
  const activeVideo = filtered.find((v) => v.id === activeVideoId) ?? filtered[0];

  // When tab changes, reset to first video in that filter
  const handleTabChange = (tab: FilterTab) => {
    setActiveTab(tab);
    const first = tab === "all" ? VIDEOS[0] : VIDEOS.find((v) => v.category === tab);
    if (first) setActiveVideoId(first.id);
  };

  const bgUrl = "https://d2xsxph8kpxj0f.cloudfront.net/310519663283983903/Hfy5MinW2PXVKLrBsPEmFG/rankings_mat_circle-Vuctk4mofk7G4SDFVrpWPQ.webp";

  return (
    <section
      className="py-20 relative overflow-hidden transition-all duration-700"
      style={{ backgroundImage: `url(${bgUrl})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 z-0" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="font-condensed font-700 text-[11px] tracking-widest uppercase text-white mb-2 flex items-center gap-2">
            <span className="inline-block w-8 h-px bg-[#C41E3A]" />
            NWCA Video Hub
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-white leading-none mb-6">
            WATCH &amp; <span className="text-[#F5C842]">REPLAY</span>
          </h2>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 border-b border-white/10 pb-0">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`font-condensed font-700 text-xs tracking-widest uppercase px-5 py-3 border-b-2 transition-all duration-200 ${
                  activeTab === tab.id
                    ? "border-[#C41E3A] text-white"
                    : "border-transparent text-[#c8cdd6] hover:text-white hover:border-white/30"
                }`}
              >
                {tab.label}
              </button>
            ))}
            <span className="ml-auto font-condensed text-[11px] text-[#c8cdd6] tracking-wide pb-3">
              {filtered.length} video{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Main layout: featured player left, thumbnail rail right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Featured player — 3 cols */}
          <div className="lg:col-span-3">
            <div className="relative">
              <div className="absolute -inset-[2px] bg-gradient-to-br from-[#C41E3A] to-[#17214B] opacity-60" />
              <div className="relative aspect-video bg-black overflow-hidden shadow-2xl">
                <Facade
                  videoId={activeVideo.videoId}
                  title={activeVideo.title}
                  label={activeVideo.label}
                  labelColor={activeVideo.labelColor}
                />
              </div>
            </div>
            <div className="mt-4">
              <div className="font-condensed font-600 text-[10px] tracking-widest uppercase text-[#c8cdd6] mb-1">
                {activeVideo.subtitle}
              </div>
              <h3 className="font-display text-2xl text-white leading-tight">{activeVideo.title}</h3>
            </div>
          </div>

          {/* Thumbnail rail — 2 cols, scrollable */}
          <div className="lg:col-span-2 flex flex-col max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20">
            {filtered.map((video, index) => {
              const isActive = video.id === activeVideo.id;
              return (
                <div key={video.id}>
                  {index > 0 && (
                    <div className="mx-3 border-t border-white/10" />
                  )}
                  <button
                    onClick={() => setActiveVideoId(video.id)}
                    className={`w-full flex gap-4 items-start text-left px-3 py-4 transition-all duration-200 ${
                      isActive
                        ? "bg-white/8 border-l-2 border-l-[#C41E3A]"
                        : "border-l-2 border-l-transparent hover:bg-white/5 hover:border-l-white/30"
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="relative flex-shrink-0 w-36 aspect-video bg-black overflow-hidden shadow-md">
                      <img
                        src={`https://i.ytimg.com/vi/${video.videoId}/mqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      {isActive && (
                        <div className="absolute inset-0 bg-[#C41E3A]/30 flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      )}
                      <div
                        className="absolute top-1 left-1 font-condensed text-[8px] tracking-widest uppercase text-white px-1.5 py-0.5"
                        style={{ backgroundColor: video.labelColor }}
                      >
                        {video.label}
                      </div>
                    </div>
                    {/* Meta */}
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="font-display text-sm text-white leading-snug line-clamp-2 mb-1.5">{video.title}</div>
                      <div className="font-condensed text-[11px] text-[#c8cdd6] uppercase tracking-wide">{video.subtitle}</div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA row */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 border-t border-white/10 pt-6">
          <div className="flex-1">
            <div className="font-condensed font-700 text-xs tracking-widest uppercase text-[#F5C842] mb-1">Next Event</div>
            <div className="font-display text-xl text-white leading-none">2026 NWCA ALL-STAR CLASSIC</div>
            <div className="font-body text-xs text-[#c8cdd6] mt-0.5">Nov 8, 2026 · State College, PA</div>
          </div>
          <a
            href="https://www.youtube.com/@NWCAWrestling"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 font-condensed font-700 text-sm tracking-widest uppercase text-white hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            All Videos on YouTube
          </a>
          <a
            href="/events"
            className="flex items-center gap-2 font-condensed font-700 text-sm tracking-widest uppercase px-5 py-2.5 bg-[#C41E3A] text-white hover:bg-[#a01830] transition-colors shadow-md"
          >
            Register 2026 <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
