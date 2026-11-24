/**
 * Where to Wrestle — NWCA Interactive Program Finder
 * Design: Dark arena aesthetic, NWCA brand colors
 * Colors: Arena Black #0A0E1A / NWCA Navy #17214B / Championship Red #C41E3A
 */

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { MapPin, Globe, ArrowRight, Users, Trophy, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";
import { ProgramFinderMap } from "@/components/ProgramFinderMap";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663283983903/Hfy5MinW2PXVKLrBsPEmFG/nwca_hero_mat_overhead-ZjcC7ehC6HPqP9Gq57azF8.webp";

const PROGRAM_TYPES = [
  {
    type: "Youth Clubs",
    icon: Users,
    desc: "Community-based wrestling clubs for ages 5–14. Learn fundamentals in a fun, safe environment.",
    count: "2,400+",
    label: "clubs nationwide",
  },
  {
    type: "High School Programs",
    icon: Trophy,
    desc: "Varsity and JV wrestling programs at public and private high schools across all 50 states.",
    count: "11,000+",
    label: "HS programs",
  },
  {
    type: "College Programs",
    icon: Globe,
    desc: "NCAA, NAIA, and NJCAA programs offering scholarships and competitive wrestling at the collegiate level.",
    count: "500+",
    label: "college programs",
  },
  {
    type: "Adult & Masters",
    icon: MapPin,
    desc: "Clubs and tournaments for adult wrestlers at all skill levels, including Masters divisions (30+).",
    count: "500+",
    label: "adult programs",
  },
];

const RESOURCES = [
  {
    title: "USA Wrestling Club Finder",
    desc: "Official USA Wrestling database of registered clubs and programs by state and zip code.",
    url: "https://www.teamusa.org/USA-Wrestling",
    label: "Search Clubs",
  },
  {
    title: "NFHS Wrestling",
    desc: "National Federation of State High School Associations — find your state's athletic association and local programs.",
    url: "https://www.nfhs.org/activities-sports/wrestling/",
    label: "Find HS Programs",
  },
  {
    title: "NCAA Wrestling",
    desc: "Search all NCAA Division I, II, and III wrestling programs by state, division, and scholarship availability.",
    url: "https://www.ncaa.org/sports/wrestling",
    label: "Search Colleges",
  },
  {
    title: "NAIA Wrestling",
    desc: "NAIA member schools offering wrestling programs, many with scholarship opportunities.",
    url: "https://www.naia.org/sports/wrestling",
    label: "View NAIA Schools",
  },
];

export default function WhereToWrestle() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white">
      <NavBar solid />

      {/* ── HERO ── */}
      <section className="relative h-[40vh] min-h-[280px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Wrestling mat" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-[#0A0E1A]/70 to-transparent" />
        </div>
        <div className="relative container pb-10">
          <div className="flex items-center gap-2 mb-3">
            <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} className="font-condensed text-xs tracking-widest uppercase text-[#c8cdd6] hover:text-white transition-colors">Home</a>
            <ChevronRight className="w-3 h-3 text-[#c8cdd6]" />
            <span className="font-condensed text-xs tracking-widest uppercase text-white">Where to Wrestle</span>
          </div>
          <div className="section-label mb-3">Find Programs Near You</div>
          <h1 className="font-display text-5xl md:text-7xl text-white leading-none">
            WHERE TO <span className="text-white">WRESTLE</span>
          </h1>
          <p className="font-body text-[#d0d5de] text-base mt-3 max-w-xl">
            500 college wrestling programs across the United States — filter by division, search by school or location, and click any pin for full program details.
          </p>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="bg-[#222b3d] border-y border-white/5 py-5">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { num: "500", label: "College Programs" },
            { num: "14", label: "Divisions" },
            { num: "50", label: "States" },
            { num: "100%", label: "Live NWCA Data" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl text-white">{s.num}</div>
              <div className="font-condensed text-xs tracking-widest uppercase text-[#c8cdd6] mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── INTERACTIVE MAP ── */}
      <section className="bg-[#0f1420]">
        <div className="container py-8">
          <div className="mb-5">
            <div className="section-label mb-2">Interactive Map</div>
            <h2 className="font-display text-3xl md:text-4xl text-white">
              COLLEGE PROGRAM <span className="text-white">FINDER</span>
            </h2>
            <p className="font-body text-[#c8cdd6] text-sm mt-1">
              Click any pin to view program details. Use filters to narrow by division. Search by school name, city, or state.
            </p>
          </div>
        </div>
        <div style={{ minHeight: "680px" }} className="flex flex-col">
          <ProgramFinderMap className="flex-1 w-full" />
        </div>
      </section>

      {/* ── PROGRAM TYPES ── */}
      <section className="py-16 bg-[#0A0E1A]">
        <div className="container">
          <div className="mb-10">
            <div className="section-label mb-2">Program Types</div>
            <h2 className="font-display text-4xl text-white">FIND YOUR <span className="text-white">LEVEL</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROGRAM_TYPES.map((p) => (
              <div key={p.type} className="bg-[#161d2e] border border-white/5 p-6 hover:border-white/20 transition-all">
                <div className="w-10 h-10 bg-[#C41E3A]/10 flex items-center justify-center mb-4">
                  <p.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-condensed font-700 text-base text-white mb-2">{p.type}</h3>
                <p className="font-body text-sm text-[#c8cdd6] leading-relaxed mb-4">{p.desc}</p>
                <div className="border-t border-white/5 pt-4">
                  <span className="font-display text-2xl text-white">{p.count}</span>
                  <span className="font-condensed text-xs tracking-widest uppercase text-[#c8cdd6] ml-2">{p.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXTERNAL RESOURCES ── */}
      <section className="py-16 bg-[#1c2333]">
        <div className="container">
          <div className="mb-10">
            <div className="section-label mb-2">Official Resources</div>
            <h2 className="font-display text-4xl text-white">FIND PROGRAMS <span className="text-white">BY LEVEL</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RESOURCES.map((r) => (
              <a
                key={r.title}
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="group bg-[#161d2e] border border-white/5 hover:border-[#C41E3A]/40 p-6 transition-all flex items-start gap-4"
              >
                <div className="w-10 h-10 bg-[#C41E3A]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C41E3A]/20 transition-colors">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-condensed font-700 text-base text-white mb-1">{r.title}</h3>
                  <p className="font-body text-sm text-[#c8cdd6] leading-relaxed mb-3">{r.desc}</p>
                  <span className="font-condensed font-700 text-xs tracking-widest uppercase text-white flex items-center gap-1 group-hover:gap-2 transition-all">
                    {r.label} <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-[#C41E3A]">
        <div className="container text-center">
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4">READY TO START <span className="text-[#17214B]">WRESTLING?</span></h2>
          <p className="font-body text-white/80 text-lg max-w-xl mx-auto mb-8">
            Whether you're a first-time athlete or returning to the mat, there's a program for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/grow/start-a-program"
              onClick={(e) => { e.preventDefault(); navigate("/grow/start-a-program"); }}
              className="inline-flex items-center gap-2 bg-white text-[#C41E3A] font-condensed font-700 text-sm tracking-widest uppercase px-8 py-4 hover:bg-white/90 transition-colors"
            >
              Start a Program <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/grow/why-wrestle"
              onClick={(e) => { e.preventDefault(); navigate("/grow/why-wrestle"); }}
              className="inline-flex items-center gap-2 border-2 border-white text-white font-condensed font-700 text-sm tracking-widest uppercase px-8 py-4 hover:bg-white/10 transition-colors"
            >
              Why Wrestle?
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
