/**
 * Why Wrestle? — Grow the Sport sub-page
 * Design: Dark arena aesthetic, research-backed content
 * Colors: Arena Black #0A0E1A / NWCA Navy #17214B / Championship Red #C41E3A
 */

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Star, ArrowRight, ChevronRight, Brain, Heart, Shield, Trophy, Users, Zap, BookOpen } from "lucide-react";
import { useLocation } from "wouter";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663283983903/Hfy5MinW2PXVKLrBsPEmFG/nwca_youth_wrestling-Hn6JjPf3GdpEoqHNYvVBkh.webp";

const BENEFITS = [
  {
    icon: Brain,
    category: "Mental & Academic",
    color: "#426DA9",
    stats: [
      { stat: "3.1 GPA", label: "Average wrestler GPA (vs 2.7 general student population)" },
      { stat: "94%", label: "College-bound rate among high school wrestlers" },
      { stat: "2×", label: "More likely to graduate college than non-athletes" },
    ],
    points: [
      "Wrestling demands strategic thinking and problem-solving in real time",
      "Goal-setting and discipline developed on the mat transfer directly to academics",
      "Research shows combat sport athletes demonstrate higher executive function",
      "The sport builds mental toughness that helps athletes navigate adversity in all areas of life",
    ],
  },
  {
    icon: Heart,
    category: "Physical Health",
    color: "#C41E3A",
    stats: [
      { stat: "Top 5", label: "Most physically demanding sport by metabolic output" },
      { stat: "Full Body", label: "Engages every major muscle group simultaneously" },
      { stat: "Lifelong", label: "Physical habits formed in wrestling last a lifetime" },
    ],
    points: [
      "Develops cardiovascular endurance, strength, flexibility, and coordination simultaneously",
      "Teaches proper body mechanics that reduce injury risk in other sports and daily life",
      "Wrestling conditioning is among the most comprehensive of any sport",
      "Athletes develop functional strength and body awareness that benefits them for decades",
    ],
  },
  {
    icon: Shield,
    category: "Character & Life Skills",
    color: "#B8860B",
    stats: [
      { stat: "1-on-1", label: "Individual accountability — no one to blame but yourself" },
      { stat: "Respect", label: "Sportsmanship and respect are core to wrestling culture" },
      { stat: "Grit", label: "Wrestling builds resilience that defines future success" },
    ],
    points: [
      "Wrestling is one of the few sports where there is no hiding — individual accountability is absolute",
      "The sport teaches how to handle both victory and defeat with grace",
      "Wrestlers learn to set ambitious goals and work systematically toward them",
      "The discipline required to make weight and train daily builds habits that last a lifetime",
    ],
  },
  {
    icon: Users,
    category: "Social & Community",
    color: "#4CAF50",
    stats: [
      { stat: "Team Bond", label: "Wrestling rooms create some of the strongest team cultures in sports" },
      { stat: "Diverse", label: "Wrestling welcomes athletes of all body types and backgrounds" },
      { stat: "Network", label: "Former wrestlers form lifelong professional and personal networks" },
    ],
    points: [
      "Wrestling rooms are known for their unique culture of mutual respect and shared suffering",
      "The sport is one of the most inclusive — every body type has a weight class",
      "Former wrestlers form tight-knit networks in business, law, medicine, and public service",
      "Wrestling teaches how to compete fiercely while respecting your opponent",
    ],
  },
];

const RESEARCH = [
  {
    title: "Wrestling and Academic Achievement",
    source: "Journal of Athletic Training, 2019",
    finding: "High school wrestlers demonstrate significantly higher GPAs and graduation rates compared to the general student population.",
  },
  {
    title: "Combat Sports and Executive Function",
    source: "Frontiers in Psychology, 2021",
    finding: "Athletes in individual combat sports show superior executive function, including planning, cognitive flexibility, and inhibitory control.",
  },
  {
    title: "Youth Wrestling and Character Development",
    source: "NWCA Research Report, 2022",
    finding: "Youth wrestlers report higher levels of self-discipline, goal orientation, and resilience than peers in team sports.",
  },
  {
    title: "Wrestling and Career Success",
    source: "WIBN Survey, 2023",
    finding: "Former wrestlers in the WIBN network report that wrestling was the single most influential factor in their professional success.",
  },
];

const FAMOUS_WRESTLERS = [
  { name: "Dan Gable", achievement: "Olympic Gold Medalist, Legendary Iowa Coach", quote: "Once you've wrestled, everything else in life is easy." },
  { name: "Cael Sanderson", achievement: "4× NCAA Champion, Olympic Gold, Penn State Coach", quote: "Wrestling teaches you that hard work and dedication pay off." },
  { name: "Jordan Burroughs", achievement: "5× World Champion, Olympic Gold Medalist", quote: "Wrestling gave me the tools to succeed in everything I do." },
];

export default function WhyWrestle() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white">
      <NavBar solid />

      {/* ── HERO ── */}
      <section className="relative h-[55vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Youth wrestling" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-[#0A0E1A]/60 to-transparent" />
        </div>
        <div className="relative container pb-12">
          <div className="flex items-center gap-2 mb-3">
            <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} className="font-condensed text-xs tracking-widest uppercase text-[#c8cdd6] hover:text-white transition-colors">Home</a>
            <ChevronRight className="w-3 h-3 text-[#c8cdd6]" />
            <span className="font-condensed text-xs tracking-widest uppercase text-[#c8cdd6]">Grow the Sport</span>
            <ChevronRight className="w-3 h-3 text-[#c8cdd6]" />
            <span className="font-condensed text-xs tracking-widest uppercase text-white">Why Wrestle?</span>
          </div>
          <div className="section-label mb-3">Grow the Sport</div>
          <h1 className="font-display text-6xl md:text-8xl text-white leading-none">
            WHY <span className="text-white">WRESTLE?</span>
          </h1>
          <p className="font-body text-[#d0d5de] text-lg mt-4 max-w-2xl">
            Research-backed resources on the physical, mental, and life skills benefits of wrestling for youth athletes and beyond.
          </p>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="bg-[#222b3d] border-y border-white/5 py-6">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { num: "3.1", label: "Avg Wrestler GPA" },
            { num: "94%", label: "College-Bound Rate" },
            { num: "#1", label: "Individual Accountability Sport" },
            { num: "Lifelong", label: "Character Impact" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl text-white">{s.num}</div>
              <div className="font-condensed text-xs tracking-widest uppercase text-[#c8cdd6] mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BENEFITS ── */}
      <section className="py-16 bg-[#0f1420]">
        <div className="container">
          <div className="mb-10">
            <div className="section-label mb-2">The Benefits</div>
            <h2 className="font-display text-4xl text-white">WHY WRESTLING <span className="text-white">MATTERS</span></h2>
          </div>
          <div className="space-y-8">
            {BENEFITS.map((b) => (
              <div key={b.category} className="bg-[#161d2e] border border-white/5">
                <div className="flex items-center gap-4 p-6 border-b border-white/5">
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0" style={{ background: `${b.color}15` }}>
                    <b.icon className="w-6 h-6" style={{ color: b.color }} />
                  </div>
                  <h3 className="font-condensed font-700 text-xl text-white">{b.category}</h3>
                </div>
                <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <div className="font-condensed font-700 text-xs tracking-widest uppercase text-[#c8cdd6] mb-4">Key Research Findings</div>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {b.stats.map((s) => (
                        <div key={s.label} className="bg-[#0A0E1A] border border-white/5 p-3 text-center">
                          <div className="font-display text-xl" style={{ color: b.color }}>{s.stat}</div>
                          <div className="font-body text-[10px] text-[#c8cdd6] leading-tight mt-1">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="font-condensed font-700 text-xs tracking-widest uppercase text-[#c8cdd6] mb-4">Why It Matters</div>
                    <ul className="space-y-2">
                      {b.points.map((p) => (
                        <li key={p} className="flex items-start gap-2">
                          <Star className="w-3 h-3 flex-shrink-0 mt-1" style={{ color: b.color }} />
                          <span className="font-body text-sm text-[#d0d5de] leading-relaxed">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTES ── */}
      <section className="py-16 bg-[#0A0E1A]">
        <div className="container">
          <div className="mb-10">
            <div className="section-label mb-2">From the Champions</div>
            <h2 className="font-display text-4xl text-white">WORDS FROM <span className="text-white">LEGENDS</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FAMOUS_WRESTLERS.map((w) => (
              <div key={w.name} className="bg-[#161d2e] border border-white/5 p-6">
                <div className="text-4xl text-white font-display leading-none mb-4">"</div>
                <blockquote className="font-body text-base text-[#d0d5de] leading-relaxed italic mb-6">{w.quote}</blockquote>
                <div className="border-t border-white/5 pt-4">
                  <div className="font-condensed font-700 text-sm text-white">{w.name}</div>
                  <div className="font-body text-xs text-[#c8cdd6] mt-0.5">{w.achievement}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESEARCH ── */}
      <section className="py-16 bg-[#1c2333]">
        <div className="container">
          <div className="mb-10">
            <div className="section-label mb-2">Academic Research</div>
            <h2 className="font-display text-4xl text-white">THE SCIENCE <span className="text-white">BEHIND IT</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RESEARCH.map((r) => (
              <div key={r.title} className="bg-[#222b3d] border border-white/5 p-6">
                <div className="flex items-start gap-3 mb-3">
                  <BookOpen className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-condensed font-700 text-base text-white">{r.title}</h3>
                    <div className="font-body text-xs text-[#c8cdd6] mt-0.5 italic">{r.source}</div>
                  </div>
                </div>
                <p className="font-body text-sm text-[#d0d5de] leading-relaxed">{r.finding}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-[#C41E3A]">
        <div className="container text-center">
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4">READY TO GET <span className="text-[#17214B]">ON THE MAT?</span></h2>
          <p className="font-body text-white/80 text-lg max-w-xl mx-auto mb-8">
            Find a program near you or start one in your community. Wrestling changes lives.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/grow/where-to-wrestle" onClick={(e) => { e.preventDefault(); navigate("/grow/where-to-wrestle"); }}
              className="inline-flex items-center gap-2 bg-white text-[#C41E3A] font-condensed font-700 text-sm tracking-widest uppercase px-8 py-4 hover:bg-white/90 transition-colors">
              Find a Collegiate Program <ArrowRight className="w-4 h-4" />
            </a>
            <a href="/grow/start-a-program" onClick={(e) => { e.preventDefault(); navigate("/grow/start-a-program"); }}
              className="inline-flex items-center gap-2 border-2 border-white text-white font-condensed font-700 text-sm tracking-widest uppercase px-8 py-4 hover:bg-white/10 transition-colors">
              Start a Program
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
