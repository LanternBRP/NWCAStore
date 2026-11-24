/**
 * Rankings Page — CMS-Ready
 * Design: Dark navy/charcoal editorial, NWCA red accents, Bebas Neue headers
 * Layout: Full-width hero + sticky division tab bar + rankings table per division
 * CMS Integration: Update rankingsData.ts — changes here reflect on both this page and the home page snippet.
 */
import { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trophy, Users, TrendingUp, ExternalLink, RefreshCw } from "lucide-react";
import { RANKINGS_DATA, type TeamRanking, type IndividualRanking, type DivisionData } from "@/lib/rankingsData";

// ─── Sub-components ──────────────────────────────────────────────────────────
function TrendBadge({ trend, amount }: { trend: TeamRanking["trend"]; amount?: number }) {
  if (trend === "new") return <span className="text-[10px] font-condensed font-700 tracking-widest uppercase text-[#B8860B] bg-[#B8860B]/10 px-1.5 py-0.5">NEW</span>;
  if (trend === "steady") return <span className="text-[#c8cdd6] text-sm">—</span>;
  const arrow = trend === "up" ? "▲" : "▼";
  const color = trend === "up" ? "text-emerald-400" : "text-red-400";
  return <span className={`font-mono text-xs ${color}`}>{arrow}{amount ?? ""}</span>;
}

export default function Rankings() {
  const [activeDivision, setActiveDivision] = useState("ncaa-d1-men");
  const [genderFilter, setGenderFilter] = useState<"all" | "men" | "women">("all");

  const division = RANKINGS_DATA.find((d) => d.id === activeDivision) ?? RANKINGS_DATA[0];

  const filteredDivisions = genderFilter === "all"
    ? RANKINGS_DATA
    : RANKINGS_DATA.filter((d) => d.gender === genderFilter);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <NavBar />

      {/* ── HERO ── */}
      <section className="relative pt-24 pb-10 bg-gradient-to-b from-[#17214B] to-[#0d1117] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-0.5 bg-[#C41E3A]" />
                <span className="text-[#F5C842] text-xs font-condensed tracking-widest uppercase">2025–26 Season</span>
              </div>
              <h1 className="font-bebas text-5xl md:text-7xl tracking-wider text-white leading-none">
                NWCA<br />
                <span className="text-[#F5C842]">RANKINGS</span>
              </h1>
              <p className="mt-3 text-white/80 font-dm text-sm max-w-lg">
                Official coaches polls across all divisions — NCAA D1, D2, D3, Women's, NAIA, and NJCAA. Updated weekly during the season.
              </p>
            </div>
            <div className="flex items-center gap-2 text-white/40 text-xs font-mono">
              <RefreshCw className="w-3 h-3" />
              <span>Last updated: {division.lastUpdated}</span>
            </div>
          </div>

          {/* Gender filter */}
          <div className="flex gap-2 mt-6">
            {(["all", "men", "women"] as const).map((g) => (
              <button
                key={g}
                onClick={() => {
                  setGenderFilter(g);
                  const first = RANKINGS_DATA.find((d) => g === "all" || d.gender === g);
                  if (first) setActiveDivision(first.id);
                }}
                className={`px-4 py-1.5 text-xs font-condensed tracking-widest uppercase transition-all ${
                  genderFilter === g
                    ? "bg-[#C41E3A] text-white"
                    : "bg-white/5 text-[#C41E3A]/80 hover:bg-white/10 hover:text-[#C41E3A]"
                }`}
              >
                {g === "all" ? "All Divisions" : g === "men" ? "Men's" : "Women's"}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIVISION TABS ── */}
      <div className="sticky top-[64px] z-40 bg-[#0d1117] border-b border-white/10 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-0 scrollbar-hide">
            {filteredDivisions.map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveDivision(d.id)}
                className={`flex-shrink-0 px-4 py-3.5 text-xs font-condensed tracking-widest uppercase border-b-2 transition-all whitespace-nowrap ${
                  activeDivision === d.id
                    ? "border-[#C41E3A] text-white bg-white/5"
                    : "border-transparent text-white/40 hover:text-white/85 hover:border-white/20"
                }`}
              >
                {d.shortLabel}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Division header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="font-bebas text-3xl md:text-4xl tracking-wider text-white">{division.label} Rankings</h2>
            <p className="text-white/80 text-sm font-dm mt-1">{division.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-white/20 text-white/80 text-xs font-mono">
              <Calendar className="w-3 h-3 mr-1" />
              {division.lastUpdated}
            </Badge>
            {division.sourceUrl && (
              <a
                href={division.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#F5C842] text-xs hover:underline"
              >
                Source <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* CMS note banner */}
        {division.cmsNote && (
          <div className="mb-6 px-4 py-3 bg-[#C41E3A]/10 border border-[#C41E3A]/30 text-white text-xs font-mono rounded-none">
            <span className="font-bold">CMS Integration Point:</span> {division.cmsNote}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Team Rankings Table */}
          <div className="lg:col-span-2">
            {division.teams.length > 0 ? (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="w-4 h-4 text-[#F5C842]" />
                  <h3 className="font-condensed text-sm tracking-widest uppercase text-white/85">Team Rankings</h3>
                </div>
                <div className="border border-white/10">
                  {/* Table header */}
                  <div className="grid grid-cols-12 bg-white/5 px-4 py-2 text-xs font-condensed tracking-widest uppercase text-[#C41E3A]/40">
                    <div className="col-span-1">Rank</div>
                    <div className="col-span-1">Trend</div>
                    <div className="col-span-7">Institution</div>
                    <div className="col-span-2 text-right">Points</div>
                    <div className="col-span-1 text-right">Last</div>
                  </div>
                  {/* Table rows */}
                  {division.teams.map((team, i) => (
                    <div
                      key={team.institution}
                      className={`grid grid-cols-12 px-4 py-3 border-t border-white/5 items-center transition-colors hover:bg-white/5 ${
                        team.rank <= 3 ? "bg-white/[0.02]" : ""
                      }`}
                    >
                      <div className="col-span-1">
                        <span className={`font-bebas text-lg ${
                          team.rank === 1 ? "text-[#F5C842]" :
                          team.rank <= 3 ? "text-white" : "text-white/80"
                        }`}>
                          {team.rank}
                        </span>
                      </div>
                      <div className="col-span-1">
                        <TrendBadge trend={team.trend} amount={team.trendAmount} />
                      </div>
                      <div className="col-span-7">
                        <span className={`font-dm text-sm ${team.rank <= 5 ? "text-white font-medium" : "text-white/85"}`}>
                          {team.institution}
                        </span>
                      </div>
                      <div className="col-span-2 text-right">
                        <span className="font-mono text-sm text-white/80">{team.points}</span>
                      </div>
                      <div className="col-span-1 text-right">
                        <span className="font-mono text-xs text-white/30">{team.lastRank ?? "—"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="border border-white/10 p-8 text-center">
                <Users className="w-8 h-8 text-white/20 mx-auto mb-3" />
                <p className="text-white/40 text-sm font-dm">
                  {division.id === "ncaa-women"
                    ? "NCAA Women's rankings use individual regional rankings by weight class, not a team poll. See the individual rankings panel."
                    : "Team rankings will be available here once connected to the CMS."}
                </p>
              </div>
            )}

            {/* Receiving Votes */}
            {division.receivingVotes.length > 0 && (
              <div className="mt-6">
                <h4 className="font-condensed text-xs tracking-widest uppercase text-white/40 mb-3">Receiving Votes</h4>
                <div className="flex flex-wrap gap-2">
                  {division.receivingVotes.map((v) => (
                    <span key={v} className="px-3 py-1 bg-white/5 border border-white/10 text-[#C41E3A]/80 text-xs font-dm">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar: Top-Ranked Individuals */}
          <div>
            {division.topRankedIndividuals.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-4 h-4 text-[#F5C842]" />
                  <h3 className="font-condensed text-sm tracking-widest uppercase text-white/85">
                    Top-Ranked Individuals
                  </h3>
                </div>
                <div className="border border-white/10">
                  <div className="grid grid-cols-3 bg-white/5 px-3 py-2 text-xs font-condensed tracking-widest uppercase text-[#C41E3A]/40">
                    <div>Wt.</div>
                    <div className="col-span-2">Wrestler</div>
                  </div>
                  {division.topRankedIndividuals.map((ind) => (
                    <div
                      key={ind.weightClass}
                      className="grid grid-cols-3 px-3 py-2.5 border-t border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <div className="font-bebas text-[#F5C842] text-base">{ind.weightClass}</div>
                      <div className="col-span-2">
                        <div className="text-white text-xs font-dm font-medium leading-tight">{ind.name}</div>
                        <div className="text-white/40 text-[10px] font-dm mt-0.5">{ind.school}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick nav to other divisions */}
            <div className="mt-6">
              <h4 className="font-condensed text-xs tracking-widest uppercase text-white/40 mb-3">Other Divisions</h4>
              <div className="flex flex-col gap-1">
                {RANKINGS_DATA.filter((d) => d.id !== activeDivision).map((d) => (
                  <button
                    key={d.id}
                    onClick={() => {
                      setActiveDivision(d.id);
                      setGenderFilter("all");
                    }}
                    className="text-left px-3 py-2 text-xs font-dm text-white/40 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <Footer />
    </div>
  );
}
