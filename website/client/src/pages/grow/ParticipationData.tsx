/**
 * Participation Data — Grow the Sport sub-page
 * Design: Dark arena aesthetic, data-forward layout
 * Colors: Arena Black #0A0E1A / NWCA Navy #17214B / Championship Red #C41E3A
 */

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { TrendingUp, ArrowRight, ChevronRight, Users, Trophy, Globe } from "lucide-react";
import { useLocation } from "wouter";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663283983903/Hfy5MinW2PXVKLrBsPEmFG/nwca_hero_mat_overhead-ZjcC7ehC6HPqP9Gq57azF8.webp";

const HS_DATA = [
  { year: "2018–19", boys: 247441, girls: 22094, total: 269535 },
  { year: "2019–20", boys: 244984, girls: 24235, total: 269219 },
  { year: "2020–21", boys: 185000, girls: 18000, total: 203000 },
  { year: "2021–22", boys: 238000, girls: 26500, total: 264500 },
  { year: "2022–23", boys: 247000, girls: 30000, total: 277000 },
  { year: "2023–24", boys: 252000, girls: 38000, total: 290000 },
  { year: "2024–25", boys: 258000, girls: 45000, total: 303000 },
];

const COLLEGE_DATA = [
  { division: "NCAA D1 Men", programs: 79, athletes: 3200 },
  { division: "NCAA D2 Men", programs: 55, athletes: 1800 },
  { division: "NCAA D3 Men", programs: 100, athletes: 2800 },
  { division: "NCAA Women", programs: 115, athletes: 2900 },
  { division: "NAIA Men", programs: 62, athletes: 1500 },
  { division: "NAIA Women", programs: 48, athletes: 1100 },
  { division: "NJCAA Men", programs: 40, athletes: 900 },
  { division: "NJCAA Women", programs: 22, athletes: 480 },
];

const TOP_STATES_HS = [
  { state: "Pennsylvania", athletes: 28500, rank: 1 },
  { state: "Ohio", athletes: 24800, rank: 2 },
  { state: "New Jersey", athletes: 22100, rank: 3 },
  { state: "Iowa", athletes: 20400, rank: 4 },
  { state: "Illinois", athletes: 18700, rank: 5 },
  { state: "California", athletes: 17900, rank: 6 },
  { state: "Michigan", athletes: 16200, rank: 7 },
  { state: "Minnesota", athletes: 15800, rank: 8 },
  { state: "Texas", athletes: 14500, rank: 9 },
  { state: "Indiana", athletes: 13900, rank: 10 },
];

const maxAthletes = Math.max(...HS_DATA.map(d => d.total));

export default function ParticipationData() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white">
      <NavBar solid />

      {/* ── HERO ── */}
      <section className="relative h-[50vh] min-h-[360px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Wrestling mat" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-[#0A0E1A]/70 to-transparent" />
        </div>
        <div className="relative container pb-12">
          <div className="flex items-center gap-2 mb-3">
            <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} className="font-condensed text-xs tracking-widest uppercase text-[#c8cdd6] hover:text-white transition-colors">Home</a>
            <ChevronRight className="w-3 h-3 text-[#c8cdd6]" />
            <span className="font-condensed text-xs tracking-widest uppercase text-[#c8cdd6]">Grow the Sport</span>
            <ChevronRight className="w-3 h-3 text-[#c8cdd6]" />
            <span className="font-condensed text-xs tracking-widest uppercase text-white">Participation Data</span>
          </div>
          <div className="section-label mb-3">Grow the Sport</div>
          <h1 className="font-display text-6xl md:text-8xl text-white leading-none">
            PARTICIPATION <span className="text-white">DATA</span>
          </h1>
          <p className="font-body text-[#d0d5de] text-lg mt-4 max-w-2xl">
            Tracking the growth of wrestling participation at every level — high school, college, and beyond.
          </p>
        </div>
      </section>

      {/* ── KEY STATS ── */}
      <div className="bg-[#222b3d] border-y border-white/5 py-6">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { num: "303,000+", label: "HS Athletes (2024–25)" },
            { num: "47", label: "States Sanctioning Girls" },
            { num: "521", label: "College Programs" },
            { num: "+72%", label: "Girls HS Growth (5yr)" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl text-white">{s.num}</div>
              <div className="font-condensed text-xs tracking-widest uppercase text-[#c8cdd6] mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── HS PARTICIPATION CHART ── */}
      <section className="py-16 bg-[#0f1420]">
        <div className="container">
          <div className="mb-10">
            <div className="section-label mb-2">High School Trends</div>
            <h2 className="font-display text-4xl text-white">HS PARTICIPATION <span className="text-white">BY YEAR</span></h2>
            <p className="font-body text-sm text-[#c8cdd6] mt-2">Source: NFHS Participation Survey (2018–2025). 2020–21 impacted by COVID-19.</p>
          </div>

          {/* Bar chart */}
          <div className="bg-[#161d2e] border border-white/5 p-6">
            <div className="flex items-end gap-3 h-64 mb-4">
              {HS_DATA.map((d) => (
                <div key={d.year} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col gap-0.5 justify-end" style={{ height: `${(d.total / maxAthletes) * 220}px` }}>
                    <div
                      className="w-full bg-[#C41E3A]/30 border-t border-[#C41E3A]/50"
                      style={{ height: `${(d.girls / d.total) * 100}%`, minHeight: "4px" }}
                      title={`Girls: ${d.girls.toLocaleString()}`}
                    />
                    <div
                      className="w-full bg-[#17214B] border-t border-[#426DA9]/50"
                      style={{ height: `${(d.boys / d.total) * 100}%` }}
                      title={`Boys: ${d.boys.toLocaleString()}`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mb-4">
              {HS_DATA.map((d) => (
                <div key={d.year} className="flex-1 text-center">
                  <div className="font-mono text-[10px] text-[#c8cdd6] truncate">{d.year.replace("20", "").replace("–", "/")}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-6 pt-4 border-t border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#17214B] border border-[#426DA9]/50" />
                <span className="font-body text-xs text-[#c8cdd6]">Boys</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#C41E3A]/30 border border-[#C41E3A]/50" />
                <span className="font-body text-xs text-[#c8cdd6]">Girls</span>
              </div>
            </div>
          </div>

          {/* Data table */}
          <div className="mt-6 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="font-condensed text-xs tracking-widest uppercase text-[#c8cdd6] text-left py-3 pr-4">Year</th>
                  <th className="font-condensed text-xs tracking-widest uppercase text-[#c8cdd6] text-right py-3 px-4">Boys</th>
                  <th className="font-condensed text-xs tracking-widest uppercase text-white text-right py-3 px-4">Girls</th>
                  <th className="font-condensed text-xs tracking-widest uppercase text-[#c8cdd6] text-right py-3 pl-4">Total</th>
                </tr>
              </thead>
              <tbody>
                {HS_DATA.map((d, i) => (
                  <tr key={d.year} className={`border-b border-white/5 ${i === HS_DATA.length - 1 ? "bg-[#17214B]/20" : ""}`}>
                    <td className="font-mono text-sm text-white py-3 pr-4">{d.year}</td>
                    <td className="font-mono text-sm text-[#d0d5de] text-right py-3 px-4">{d.boys.toLocaleString()}</td>
                    <td className="font-mono text-sm text-white text-right py-3 px-4">{d.girls.toLocaleString()}</td>
                    <td className="font-mono text-sm text-white font-bold text-right py-3 pl-4">{d.total.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── COLLEGE PROGRAMS ── */}
      <section className="py-16 bg-[#0A0E1A]">
        <div className="container">
          <div className="mb-10">
            <div className="section-label mb-2">Collegiate Programs</div>
            <h2 className="font-display text-4xl text-white">COLLEGE <span className="text-white">PROGRAMS</span></h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="font-condensed text-xs tracking-widest uppercase text-[#c8cdd6] text-left py-3 pr-4">Division</th>
                  <th className="font-condensed text-xs tracking-widest uppercase text-[#c8cdd6] text-right py-3 px-4">Programs</th>
                  <th className="font-condensed text-xs tracking-widest uppercase text-[#c8cdd6] text-right py-3 pl-4">Athletes</th>
                </tr>
              </thead>
              <tbody>
                {COLLEGE_DATA.map((d) => (
                  <tr key={d.division} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="font-condensed font-700 text-sm text-white py-4 pr-4">{d.division}</td>
                    <td className="font-mono text-sm text-[#d0d5de] text-right py-4 px-4">{d.programs}</td>
                    <td className="font-mono text-sm text-white text-right py-4 pl-4">{d.athletes.toLocaleString()}</td>
                  </tr>
                ))}
                <tr className="border-t border-white/20 bg-[#17214B]/20">
                  <td className="font-condensed font-700 text-sm text-white py-4 pr-4">TOTAL</td>
                  <td className="font-mono text-sm font-bold text-white text-right py-4 px-4">{COLLEGE_DATA.reduce((a, d) => a + d.programs, 0)}</td>
                  <td className="font-mono text-sm font-bold text-white text-right py-4 pl-4">{COLLEGE_DATA.reduce((a, d) => a + d.athletes, 0).toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── TOP STATES ── */}
      <section className="py-16 bg-[#1c2333]">
        <div className="container">
          <div className="mb-10">
            <div className="section-label mb-2">State Rankings</div>
            <h2 className="font-display text-4xl text-white">TOP STATES BY <span className="text-white">HS PARTICIPATION</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {TOP_STATES_HS.map((s) => (
              <div key={s.state} className="bg-[#222b3d] border border-white/5 p-4 flex items-center gap-4">
                <span className="font-display text-3xl text-white w-10 text-center flex-shrink-0">{s.rank}</span>
                <div className="flex-1">
                  <div className="font-condensed font-700 text-base text-white">{s.state}</div>
                  <div className="w-full bg-[#0A0E1A] h-1.5 mt-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#C41E3A]"
                      style={{ width: `${(s.athletes / TOP_STATES_HS[0].athletes) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="font-mono text-sm text-[#d0d5de] flex-shrink-0">{s.athletes.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-[#C41E3A]">
        <div className="container text-center">
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4">HELP GROW THE <span className="text-[#17214B]">NUMBERS</span></h2>
          <p className="font-body text-white/80 text-lg max-w-xl mx-auto mb-8">
            Every new program adds to these numbers. Start a program in your community today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/grow/start-a-program" onClick={(e) => { e.preventDefault(); navigate("/grow/start-a-program"); }}
              className="inline-flex items-center gap-2 bg-white text-[#C41E3A] font-condensed font-700 text-sm tracking-widest uppercase px-8 py-4 hover:bg-white/90 transition-colors">
              Start a Program <ArrowRight className="w-4 h-4" />
            </a>
            <a href="/womens-wrestling" onClick={(e) => { e.preventDefault(); navigate("/womens-wrestling"); }}
              className="inline-flex items-center gap-2 border-2 border-white text-white font-condensed font-700 text-sm tracking-widest uppercase px-8 py-4 hover:bg-white/10 transition-colors">
              Women's Wrestling Data
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
