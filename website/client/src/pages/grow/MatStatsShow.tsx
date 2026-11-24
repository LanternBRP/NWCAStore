/**
 * The Mat Stats Show — Grow the Sport sub-page
 * Design: Dark arena aesthetic, podcast/media layout
 * Colors: Arena Black #0A0E1A / NWCA Navy #17214B / Championship Red #C41E3A
 */

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Mic, Play, ArrowRight, ChevronRight, ExternalLink, Clock, Calendar } from "lucide-react";
import { useLocation } from "wouter";
import { toast } from "sonner";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663283983903/Hfy5MinW2PXVKLrBsPEmFG/nwca_hero_action-eENn2pr8W8AJEig9Y5EhYy.webp";

const EPISODES = [
  {
    ep: "EP. 142",
    title: "2025–26 Season Preview: Rankings, Storylines & Contenders",
    desc: "NWCA staff breaks down the upcoming season, top-ranked teams, and the biggest storylines to watch across all divisions.",
    date: "Oct 14, 2025",
    duration: "58 min",
    category: "Rankings",
  },
  {
    ep: "EP. 141",
    title: "Women's Wrestling at the Olympics: What It Means for the Sport",
    desc: "A deep dive into the impact of women's wrestling's continued Olympic presence and what it means for college program growth.",
    date: "Oct 7, 2025",
    duration: "52 min",
    category: "Women's Wrestling",
  },
  {
    ep: "EP. 140",
    title: "NWCA Convention 2025 Recap: Key Takeaways for Coaches",
    desc: "Highlights from the annual NWCA Convention including coaching clinics, CEU sessions, and the All-Star Classic.",
    date: "Sep 30, 2025",
    duration: "44 min",
    category: "Convention",
  },
  {
    ep: "EP. 139",
    title: "Building a Winning Culture: Lessons from Elite Programs",
    desc: "Coaches from top-ranked programs share their philosophies on culture, recruiting, and sustaining excellence.",
    date: "Sep 23, 2025",
    duration: "61 min",
    category: "Coaching",
  },
  {
    ep: "EP. 138",
    title: "Title IX at 50: Wrestling's Path Forward",
    desc: "An honest conversation about wrestling's relationship with Title IX and the opportunities ahead for program growth.",
    date: "Sep 16, 2025",
    duration: "49 min",
    category: "Grow the Sport",
  },
  {
    ep: "EP. 137",
    title: "Recruiting in the Transfer Portal Era",
    desc: "How the transfer portal has changed collegiate wrestling recruiting and what coaches need to know to adapt.",
    date: "Sep 9, 2025",
    duration: "55 min",
    category: "Coaching",
  },
];

const PLATFORMS = [
  { name: "Spotify", url: "https://open.spotify.com/show/nwca-mat-stats", color: "#1DB954" },
  { name: "Apple Podcasts", url: "https://podcasts.apple.com/us/podcast/mat-stats", color: "#FC3C44" },
  { name: "YouTube", url: "https://www.youtube.com/@NWCAWrestling", color: "#FF0000" },
  { name: "Amazon Music", url: "https://music.amazon.com/podcasts/mat-stats", color: "#00A8E0" },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Rankings": "bg-[#17214B] text-[#d0d5de]",
  "Women's Wrestling": "bg-[#C41E3A]/20 text-white",
  "Convention": "bg-[#B8860B]/20 text-[#B8860B]",
  "Coaching": "bg-emerald-500/20 text-emerald-400",
  "Grow the Sport": "bg-purple-500/20 text-purple-400",
};

export default function MatStatsShow() {
  const [, navigate] = useLocation();
  const handleComingSoon = () => toast.info("Feature coming soon", { description: "We're building this into the platform." });

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white">
      <NavBar solid />

      {/* ── HERO ── */}
      <section className="relative h-[50vh] min-h-[360px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Wrestling" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-[#0A0E1A]/70 to-transparent" />
        </div>
        <div className="relative container pb-12">
          <div className="flex items-center gap-2 mb-3">
            <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} className="font-condensed text-xs tracking-widest uppercase text-[#c8cdd6] hover:text-white transition-colors">Home</a>
            <ChevronRight className="w-3 h-3 text-[#c8cdd6]" />
            <span className="font-condensed text-xs tracking-widest uppercase text-[#c8cdd6]">Grow the Sport</span>
            <ChevronRight className="w-3 h-3 text-[#c8cdd6]" />
            <span className="font-condensed text-xs tracking-widest uppercase text-white">The Mat Stats Show</span>
          </div>
          <div className="section-label mb-3">NWCA Podcast</div>
          <h1 className="font-display text-6xl md:text-8xl text-white leading-none">
            THE MAT STATS <span className="text-white">SHOW</span>
          </h1>
          <p className="font-body text-[#d0d5de] text-lg mt-4 max-w-2xl">
            The official NWCA podcast covering rankings, coaching insights, and everything happening in the wrestling world.
          </p>
        </div>
      </section>

      {/* ── SUBSCRIBE BAR ── */}
      <div className="bg-[#222b3d] border-y border-white/5 py-5">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-condensed font-700 text-sm tracking-widest uppercase text-white">Listen & Subscribe</div>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            {PLATFORMS.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="font-condensed font-700 text-xs tracking-widest uppercase bg-[#161d2e] border border-white/10 hover:border-white/30 px-4 py-2 transition-colors flex items-center gap-2"
              >
                <ExternalLink className="w-3 h-3" style={{ color: p.color }} />
                {p.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURED EPISODE ── */}
      <section className="py-16 bg-[#0f1420]">
        <div className="container">
          <div className="mb-8">
            <div className="section-label mb-2">Latest Episode</div>
            <h2 className="font-display text-4xl text-white">MOST RECENT <span className="text-white">EPISODE</span></h2>
          </div>
          <div className="bg-[#161d2e] border border-white/5 p-8 flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-48 flex-shrink-0">
              <div className="aspect-square bg-[#17214B] border border-white/10 flex items-center justify-center relative">
                <Mic className="w-16 h-16 text-white" />
                <div className="absolute bottom-3 right-3 font-condensed font-700 text-xs tracking-widest uppercase text-white bg-[#0A0E1A] px-2 py-0.5 border border-[#C41E3A]/30">
                  {EPISODES[0].ep}
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className={`font-condensed text-[10px] tracking-widest uppercase px-2 py-0.5 ${CATEGORY_COLORS[EPISODES[0].category] || "bg-[#222b3d] text-[#c8cdd6]"}`}>
                  {EPISODES[0].category}
                </span>
                <span className="flex items-center gap-1 font-body text-xs text-[#c8cdd6]">
                  <Calendar className="w-3 h-3" /> {EPISODES[0].date}
                </span>
                <span className="flex items-center gap-1 font-body text-xs text-[#c8cdd6]">
                  <Clock className="w-3 h-3" /> {EPISODES[0].duration}
                </span>
              </div>
              <h3 className="font-condensed font-700 text-2xl text-white mb-3">{EPISODES[0].title}</h3>
              <p className="font-body text-[#d0d5de] leading-relaxed mb-6">{EPISODES[0].desc}</p>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.youtube.com/@NWCAWrestling"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-[#C41E3A] hover:bg-[#a01830] text-white font-condensed font-700 text-sm tracking-widest uppercase px-6 py-3 transition-colors"
                >
                  <Play className="w-4 h-4" /> Play Episode
                </a>
                <a href="https://www.youtube.com/@NWCAWrestling" target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-condensed font-700 text-sm tracking-widest uppercase px-6 py-3 transition-colors">
                  Watch on YouTube <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EPISODE LIST ── */}
      <section className="py-16 bg-[#0A0E1A]">
        <div className="container">
          <div className="mb-8">
            <div className="section-label mb-2">All Episodes</div>
            <h2 className="font-display text-4xl text-white">RECENT <span className="text-white">EPISODES</span></h2>
          </div>
          <div className="space-y-2">
            {EPISODES.slice(1).map((ep) => (
              <button
                key={ep.ep}
                onClick={() => window.open('https://www.youtube.com/@NWCAWrestling', '_blank')}
                className="w-full group bg-[#161d2e] border border-white/5 hover:border-[#C41E3A]/40 p-5 transition-all text-left flex items-start gap-4"
              >
                <div className="w-10 h-10 bg-[#C41E3A]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C41E3A]/20 transition-colors">
                  <Play className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <span className="font-condensed font-700 text-xs tracking-widest uppercase text-white">{ep.ep}</span>
                    <span className={`font-condensed text-[10px] tracking-widest uppercase px-2 py-0.5 ${CATEGORY_COLORS[ep.category] || "bg-[#222b3d] text-[#c8cdd6]"}`}>
                      {ep.category}
                    </span>
                  </div>
                  <div className="font-condensed font-700 text-base text-white mb-1">{ep.title}</div>
                  <div className="font-body text-xs text-[#c8cdd6] line-clamp-1">{ep.desc}</div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="font-body text-xs text-[#c8cdd6]">{ep.date}</div>
                  <div className="flex items-center gap-1 font-body text-xs text-[#c8cdd6] mt-1 justify-end">
                    <Clock className="w-3 h-3" /> {ep.duration}
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-6 text-center">
            <a href="https://www.youtube.com/@NWCAWrestling" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-[#C41E3A]/50 text-white font-condensed font-700 text-sm tracking-widest uppercase px-8 py-4 transition-colors">
              Browse All Episodes <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── ABOUT THE SHOW ── */}
      <section className="py-16 bg-[#1c2333]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-label mb-3">About the Show</div>
              <h2 className="font-display text-4xl text-white mb-6">WRESTLING'S <span className="text-white">VOICE</span></h2>
              <p className="font-body text-[#d0d5de] leading-relaxed mb-4">
                The Mat Stats Show is the official podcast of the National Wrestling Coaches Association. Each week, NWCA staff and guests break down the latest rankings, discuss coaching strategies, and explore the stories shaping the sport.
              </p>
              <p className="font-body text-[#d0d5de] leading-relaxed mb-6">
                From Division I powerhouses to youth development, from women's wrestling growth to the business of coaching — if it matters to the wrestling community, we cover it.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { num: "142+", label: "Episodes" },
                  { num: "50K+", label: "Monthly Listeners" },
                  { num: "4.8★", label: "Avg Rating" },
                ].map((s) => (
                  <div key={s.label} className="bg-[#222b3d] border border-white/5 p-4 text-center">
                    <div className="font-display text-2xl text-white">{s.num}</div>
                    <div className="font-condensed text-[10px] tracking-widest uppercase text-[#c8cdd6] mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#0A0E1A] border border-white/5 p-8 text-center">
              <Mic className="w-20 h-20 text-white mx-auto mb-6" />
              <div className="font-display text-3xl text-white mb-3">SUBSCRIBE NOW</div>
              <p className="font-body text-sm text-[#c8cdd6] mb-6">Never miss an episode. Available on all major podcast platforms.</p>
              <div className="grid grid-cols-2 gap-3">
                {PLATFORMS.map((p) => (
                  <a key={p.name} href={p.url} target="_blank" rel="noreferrer"
                    className="font-condensed font-700 text-xs tracking-widest uppercase bg-[#161d2e] border border-white/10 hover:border-white/30 px-4 py-3 transition-colors flex items-center justify-center gap-2">
                    <ExternalLink className="w-3 h-3" style={{ color: p.color }} />
                    {p.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
