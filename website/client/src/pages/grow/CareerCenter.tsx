/**
 * Career Center — Grow the Sport sub-page
 * Design: Dark arena aesthetic, NWCA brand colors
 * Colors: Arena Black #0A0E1A / NWCA Navy #17214B / Championship Red #C41E3A
 */

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Briefcase, MapPin, Users, TrendingUp, ArrowRight, ChevronRight, ExternalLink, BookOpen, Award } from "lucide-react";
import { useLocation } from "wouter";
import { toast } from "sonner";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663283983903/Hfy5MinW2PXVKLrBsPEmFG/nwca_coaching_sideline-4uwFYm9ohWGchbmuNTT8Mk.webp";

const JOB_CATEGORIES = [
  { title: "Head Coach — NCAA D1", location: "Various Locations", type: "Full-Time", level: "Collegiate", posted: "New" },
  { title: "Assistant Coach — NCAA D2", location: "Midwest Region", type: "Full-Time", level: "Collegiate", posted: "3 days ago" },
  { title: "Head Coach — High School", location: "Pennsylvania", type: "Full-Time", level: "Scholastic", posted: "1 week ago" },
  { title: "Youth Wrestling Director", location: "Texas", type: "Full-Time", level: "Youth", posted: "1 week ago" },
  { title: "Volunteer Assistant — NCAA D3", location: "Northeast Region", type: "Volunteer", level: "Collegiate", posted: "2 weeks ago" },
  { title: "Head Coach — NAIA", location: "Southeast Region", type: "Full-Time", level: "Collegiate", posted: "2 weeks ago" },
];

const RESOURCES = [
  {
    icon: BookOpen,
    title: "Coaching Resume Guide",
    desc: "Templates and tips for building a competitive coaching resume that stands out to athletic directors.",
    label: "Download Guide",
    url: "https://nwcaonline.com/career-center/",
    external: true,
  },
  {
    icon: Users,
    title: "WIBN Professional Network",
    desc: "Connect with former wrestlers now leading in business, law, medicine, and industry through the Wrestlers in Business Network.",
    label: "Join WIBN",
    url: "https://www.wrestlersinbusiness.org",
    external: true,
  },
  {
    icon: Award,
    title: "Coaching Certification",
    desc: "Earn CEU credits and certifications that strengthen your coaching credentials and open new career doors.",
    label: "Earn CEUs",
    internal: "/coaching/ceu",
  },
  {
    icon: TrendingUp,
    title: "Salary & Benefits Guide",
    desc: "NWCA research on coaching compensation across NCAA, NAIA, NJCAA, and scholastic levels.",
    label: "View Research",
    url: "https://nwcaonline.com/career-center/",
    external: true,
  },
];

const LEVELS = [
  { level: "Youth", desc: "Club director, youth program coordinator, and recreational league positions.", salary: "$25K–$55K", growth: "High" },
  { level: "Scholastic", desc: "High school head coach, assistant coach, and athletic director roles.", salary: "$35K–$85K", growth: "Steady" },
  { level: "Collegiate (D3/NAIA/NJCAA)", desc: "Head and assistant coaching positions at smaller college programs.", salary: "$40K–$90K", growth: "Steady" },
  { level: "Collegiate (D1/D2)", desc: "Head and assistant coaching positions at major college programs.", salary: "$60K–$500K+", growth: "Competitive" },
];

export default function CareerCenter() {
  const [, navigate] = useLocation();
  const handleComingSoon = () => toast.info("Feature coming soon", { description: "We're building this into the platform." });

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white">
      <NavBar solid />

      {/* ── HERO ── */}
      <section className="relative h-[50vh] min-h-[360px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Coaching" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-[#0A0E1A]/70 to-transparent" />
        </div>
        <div className="relative container pb-12">
          <div className="flex items-center gap-2 mb-3">
            <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} className="font-condensed text-xs tracking-widest uppercase text-[#c8cdd6] hover:text-white transition-colors">Home</a>
            <ChevronRight className="w-3 h-3 text-[#c8cdd6]" />
            <span className="font-condensed text-xs tracking-widest uppercase text-[#c8cdd6]">Grow the Sport</span>
            <ChevronRight className="w-3 h-3 text-[#c8cdd6]" />
            <span className="font-condensed text-xs tracking-widest uppercase text-white">Career Center</span>
          </div>
          <div className="section-label mb-3">Grow the Sport</div>
          <h1 className="font-display text-6xl md:text-8xl text-white leading-none">
            CAREER <span className="text-white">CENTER</span>
          </h1>
          <p className="font-body text-[#d0d5de] text-lg mt-4 max-w-2xl">
            Coaching job listings, career development resources, and the professional network for wrestlers in business.
          </p>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="bg-[#222b3d] border-y border-white/5 py-6">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { num: "150+", label: "Active Job Listings" },
            { num: "6,000+", label: "NWCA Members" },
            { num: "5,000+", label: "WIBN Professionals" },
            { num: "400+", label: "College Programs Hiring" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl text-white">{s.num}</div>
              <div className="font-condensed text-xs tracking-widest uppercase text-[#c8cdd6] mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── JOB LISTINGS ── */}
      <section className="py-16 bg-[#0f1420]">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="section-label mb-2">Open Positions</div>
              <h2 className="font-display text-4xl text-white">COACHING <span className="text-white">JOBS</span></h2>
            </div>
            <a href="mailto:technology@nwca.cc" className="font-condensed font-700 text-xs tracking-widest uppercase text-white hover:text-white transition-colors flex items-center gap-1">
              Post a Job <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          <div className="space-y-2 mb-8">
            {JOB_CATEGORIES.map((job) => (
              <button
                key={job.title}
                onClick={() => window.open('https://nwcaonline.com/career-center/', '_blank')}
                className="w-full group bg-[#161d2e] border border-white/5 hover:border-[#C41E3A]/40 p-5 transition-all text-left flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#C41E3A]/10 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-condensed font-700 text-base text-white">{job.title}</div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 font-body text-xs text-[#c8cdd6]">
                        <MapPin className="w-3 h-3" /> {job.location}
                      </span>
                      <span className="font-condensed text-[10px] tracking-widest uppercase bg-[#17214B] text-[#d0d5de] px-2 py-0.5">{job.type}</span>
                      <span className="font-condensed text-[10px] tracking-widest uppercase bg-[#222b3d] text-[#c8cdd6] px-2 py-0.5">{job.level}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  {job.posted === "New" && (
                    <span className="font-condensed text-[10px] tracking-widest uppercase bg-[#C41E3A]/20 text-white px-2 py-0.5 border border-[#C41E3A]/30">NEW</span>
                  )}
                  <span className="font-body text-xs text-[#c8cdd6]">{job.posted !== "New" ? job.posted : ""}</span>
                  <ArrowRight className="w-4 h-4 text-[#c8cdd6] group-hover:text-[#F5C842] transition-colors" />
                </div>
              </button>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://nwcaonline.com/career-center/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-[#C41E3A]/50 text-white font-condensed font-700 text-sm tracking-widest uppercase px-8 py-4 transition-colors"
            >
              View All Job Listings <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── CAREER LEVELS ── */}
      <section className="py-16 bg-[#0A0E1A]">
        <div className="container">
          <div className="mb-10">
            <div className="section-label mb-2">Career Pathways</div>
            <h2 className="font-display text-4xl text-white">COACHING <span className="text-white">LEVELS</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LEVELS.map((l) => (
              <div key={l.level} className="bg-[#161d2e] border border-white/5 p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-condensed font-700 text-lg text-white">{l.level}</h3>
                  <span className={`font-condensed text-[10px] tracking-widest uppercase px-2 py-0.5 ${l.growth === "High" ? "bg-emerald-500/20 text-emerald-400" : l.growth === "Competitive" ? "bg-[#C41E3A]/20 text-white" : "bg-[#222b3d] text-[#c8cdd6]"}`}>
                    {l.growth} Demand
                  </span>
                </div>
                <p className="font-body text-sm text-[#c8cdd6] leading-relaxed mb-4">{l.desc}</p>
                <div className="border-t border-white/5 pt-4">
                  <span className="font-condensed text-xs tracking-widest uppercase text-[#c8cdd6]">Typical Range: </span>
                  <span className="font-display text-xl text-white">{l.salary}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESOURCES ── */}
      <section className="py-16 bg-[#1c2333]">
        <div className="container">
          <div className="mb-10">
            <div className="section-label mb-2">Career Resources</div>
            <h2 className="font-display text-4xl text-white">TOOLS FOR <span className="text-white">SUCCESS</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RESOURCES.map((r) => (
              <div
                key={r.title}
                className="group bg-[#222b3d] border border-white/5 hover:border-[#C41E3A]/40 p-6 transition-all"
              >
                <div className="w-10 h-10 bg-[#C41E3A]/10 flex items-center justify-center mb-4 group-hover:bg-[#C41E3A]/20 transition-colors">
                  <r.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-condensed font-700 text-base text-white mb-2">{r.title}</h3>
                <p className="font-body text-sm text-[#c8cdd6] leading-relaxed mb-4">{r.desc}</p>
                {r.external ? (
                  <a href={r.url} target="_blank" rel="noreferrer"
                    className="font-condensed font-700 text-xs tracking-widest uppercase text-white flex items-center gap-1 hover:gap-2 transition-all">
                    {r.label} <ExternalLink className="w-3 h-3" />
                  </a>
                ) : r.internal ? (
                  <a href={r.internal} onClick={(e) => { e.preventDefault(); navigate(r.internal!); }}
                    className="font-condensed font-700 text-xs tracking-widest uppercase text-white flex items-center gap-1 hover:gap-2 transition-all">
                    {r.label} <ArrowRight className="w-3 h-3" />
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-[#C41E3A]">
        <div className="container text-center">
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4">ADVANCE YOUR <span className="text-[#17214B]">CAREER</span></h2>
          <p className="font-body text-white/80 text-lg max-w-xl mx-auto mb-8">
            Join the NWCA and access the full job board, career resources, and professional network.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/join"
              className="inline-flex items-center gap-2 bg-white text-[#C41E3A] font-condensed font-700 text-sm tracking-widest uppercase px-8 py-4 hover:bg-white/90 transition-colors">
              Join NWCA <ArrowRight className="w-4 h-4" />
            </a>
            <a href="https://www.wrestlersinbusiness.org" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 border-2 border-white text-white font-condensed font-700 text-sm tracking-widest uppercase px-8 py-4 hover:bg-white/10 transition-colors">
              Explore WIBN <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
