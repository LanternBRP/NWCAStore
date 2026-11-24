/**
 * Donate — NWCA Giving Page
 * Design: Dark arena aesthetic, NWCA brand colors
 * Colors: Arena Black #0A0E1A / NWCA Navy #17214B / Championship Red #C41E3A / Chalk White #F8F6F1
 * Layout: Hero → Impact stats → Why Give → Giving tiers → How funds are used → CTA
 */

import { useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowRight, Heart, Trophy, Users, BookOpen, Shield, Star, Zap } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const IMPACT_STATS = [
  { value: "98", label: "Years Serving Wrestling Coaches" },
  { value: "11,000+", label: "Member Coaches Supported" },
  { value: "150+", label: "College Programs Grown" },
  { value: "47", label: "States with Girls State Championships" },
];

const GIVING_TIERS = [
  {
    name: "Supporter",
    amount: "$25",
    description: "Help fund coaching resources and educational materials for coaches at every level.",
    perks: [
      "Recognition in NWCA annual report",
      "NWCA e-newsletter subscription",
    ],
    highlight: false,
  },
  {
    name: "Advocate",
    amount: "$100",
    description: "Support advocacy efforts that protect and grow wrestling programs across the country.",
    perks: [
      "All Supporter benefits",
      "NWCA digital resource library access",
      "Exclusive donor updates",
    ],
    highlight: false,
  },
  {
    name: "Champion",
    amount: "$500",
    description: "Make a meaningful impact on coaching development programs and women's wrestling growth initiatives.",
    perks: [
      "All Advocate benefits",
      "Named recognition on NWCA website",
      "Convention discount",
      "Personal thank-you from NWCA leadership",
    ],
    highlight: true,
  },
  {
    name: "Legacy",
    amount: "$1,000+",
    description: "Leave a lasting mark on the sport. Legacy donors directly fund scholarships, new programs, and long-term advocacy.",
    perks: [
      "All Champion benefits",
      "Legacy Wall recognition",
      "Invitation to NWCA Leadership Dinner",
      "Dedicated acknowledgment at Convention",
    ],
    highlight: false,
  },
];

const FUND_USES = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Coaching Education",
    body: "Developing and distributing resources, certifications, and professional development programs for coaches at every level — youth, scholastic, and collegiate.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Women's Wrestling Growth",
    body: "Funding outreach, sanctioning support, and program development to accelerate the growth of girls' and women's wrestling nationwide.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Advocacy & Legislation",
    body: "Protecting wrestling programs from cuts, advocating for Title IX equity, and representing coaches' interests at the state and national level.",
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    title: "Championships & Events",
    body: "Supporting the National Duals, All-Star Classic, and Convention — events that bring the wrestling coaching community together each year.",
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Athlete Well-Being",
    body: "Funding research and resources around weight management, skin health, mental wellness, and safe sport practices for student-athletes.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Program Expansion",
    body: "Helping schools start new wrestling programs, providing toolkits, mentorship, and direct support to coaches building programs from the ground up.",
  },
];

export default function Donate() {
  const [, navigate] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f1420] text-white">
      <NavBar solid />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#0f1420] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C41E3A]/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#C41E3A]/5 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-[#F5C842]" />
              <span className="font-condensed text-xs tracking-[0.2em] uppercase text-[#F5C842]">
                Support the Mission
              </span>
            </div>

            <h1 className="font-condensed font-900 text-6xl lg:text-8xl uppercase leading-none tracking-tight mb-6">
              INVEST IN<br />
              <span className="text-[#F5C842]">WRESTLING.</span>
            </h1>

            <p className="text-[#d0d5de] text-xl leading-relaxed max-w-2xl mb-8">
              The NWCA has been the voice of wrestling coaches for nearly a century. Your gift
              funds coaching education, program growth, athlete well-being, and the advocacy
              that keeps wrestling alive in schools across America.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/checkout?flow=donation")}
                className="inline-flex items-center gap-2 bg-[#C41E3A] text-white font-condensed font-700 text-sm tracking-widest uppercase px-8 py-4 hover:bg-[#a01830] transition-colors"
              >
                <Heart className="w-4 h-4" />
                Donate Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="h-[2px] bg-gradient-to-r from-[#C41E3A] via-[#C41E3A]/50 to-transparent" />
      </section>

      {/* ── IMPACT STATS ─────────────────────────────────────────────────── */}
      <section className="bg-[#C41E3A]">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/20">
            {IMPACT_STATS.map((stat) => (
              <div key={stat.label} className="lg:px-8 first:pl-0 last:pr-0 text-center lg:text-left">
                <div className="font-condensed font-900 text-4xl lg:text-5xl text-white leading-none mb-2">
                  {stat.value}
                </div>
                <div className="font-condensed text-xs tracking-widest uppercase text-white/85">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY GIVE ─────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-[#0f1420]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[2px] bg-[#F5C842]" />
                <span className="font-condensed text-xs tracking-[0.2em] uppercase text-[#F5C842]">
                  Why Your Gift Matters
                </span>
              </div>
              <h2 className="font-condensed font-900 text-4xl lg:text-5xl uppercase leading-tight mb-6">
                Wrestling Coaches<br />Change Lives.
              </h2>
              <div className="space-y-4 text-[#c8cdd6] leading-relaxed">
                <p>
                  Wrestling teaches discipline, resilience, and accountability — qualities that
                  shape not just athletes, but citizens. The coaches who deliver those lessons
                  deserve a strong professional organization behind them.
                </p>
                <p>
                  The NWCA is a <strong className="text-white">501(c)(6) nonprofit</strong> funded
                  by membership dues, event revenue, and the generosity of donors who believe in
                  the sport. Every dollar you give goes directly toward programs that support
                  coaches, grow participation, and protect wrestling's place in American schools.
                </p>
                <p>
                  From the first youth club to the NCAA championship mat — your gift makes the
                  entire pipeline possible.
                </p>
              </div>
            </div>

            {/* Pull quote */}
            <div className="bg-[#17214B] border-l-4 border-[#C41E3A] p-10">
              <blockquote className="font-condensed font-700 text-2xl lg:text-3xl uppercase leading-tight text-white mb-6">
                "The NWCA exists to make sure every coach has the tools, the voice, and the
                community to do their job at the highest level."
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-8 h-[2px] bg-[#F5C842]" />
                <span className="font-condensed text-xs tracking-widest uppercase text-white">
                  NWCA Leadership
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GIVING TIERS ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#F4F5F7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#F5C842]" />
            <span className="font-condensed text-xs tracking-[0.2em] uppercase text-[#F5C842]">
              Ways to Give
            </span>
          </div>
          <h2 className="font-condensed font-900 text-4xl lg:text-5xl uppercase leading-tight text-[#17214B] mb-12">
            Choose Your Impact Level
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {GIVING_TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 ${
                  tier.highlight
                    ? "bg-[#17214B] text-white border-2 border-[#C41E3A]"
                    : "bg-white text-[#17214B] border border-gray-200"
                }`}
              >
                {tier.highlight && (
                  <div className="bg-[#C41E3A] text-white font-condensed font-700 text-[10px] tracking-widest uppercase text-center py-1.5">
                    Most Impactful
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <div className={`font-condensed font-700 text-xs tracking-widest uppercase mb-2 ${tier.highlight ? "text-white" : "text-white"}`}>
                    {tier.name}
                  </div>
                  <div className={`font-condensed font-900 text-5xl leading-none mb-4 ${tier.highlight ? "text-white" : "text-[#17214B]"}`}>
                    {tier.amount}
                  </div>
                  <p className={`text-sm leading-relaxed mb-6 flex-1 ${tier.highlight ? "text-[#d0d5de]" : "text-[#c8cdd6]"}`}>
                    {tier.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C41E3A] mt-1.5 flex-shrink-0" />
                        <span className={`text-xs leading-relaxed ${tier.highlight ? "text-[#c8cdd6]" : "text-[#c8cdd6]"}`}>
                          {perk}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => navigate("/checkout?flow=donation")}
                    className={`inline-flex items-center justify-center gap-2 font-condensed font-700 text-xs tracking-widest uppercase px-4 py-3 transition-colors ${
                      tier.highlight
                        ? "bg-[#C41E3A] text-white hover:bg-[#a01830]"
                        : "border border-[#17214B] text-[#17214B] hover:bg-[#17214B] hover:text-white"
                    }`}
                  >
                    Give {tier.amount} <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[#c8cdd6] text-sm text-center mt-8">
            Prefer a custom amount? Click any button above — the donation portal accepts any gift size.
          </p>
        </div>
      </section>

      {/* ── HOW FUNDS ARE USED ───────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-[#0f1420]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#F5C842]" />
            <span className="font-condensed text-xs tracking-[0.2em] uppercase text-[#F5C842]">
              Where Your Money Goes
            </span>
          </div>
          <h2 className="font-condensed font-900 text-4xl lg:text-5xl uppercase leading-tight mb-12">
            How Every Dollar<br />Is Put to Work
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FUND_USES.map((item) => (
              <div key={item.title} className="bg-[#17214B] border border-white/10 p-8 hover:border-[#C41E3A]/40 transition-colors">
                <div className="w-12 h-12 bg-[#C41E3A]/10 flex items-center justify-center text-[#F5C842] mb-6">
                  {item.icon}
                </div>
                <h3 className="font-condensed font-700 text-lg uppercase tracking-wide text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-[#c8cdd6] leading-relaxed text-sm">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#C41E3A]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-white/50" />
            <span className="font-condensed text-xs tracking-[0.2em] uppercase text-white/85">
              Make Your Gift Today
            </span>
            <div className="w-8 h-[2px] bg-white/50" />
          </div>
          <h2 className="font-condensed font-900 text-4xl lg:text-6xl uppercase leading-tight text-white mb-6">
            Stand Behind<br />Every Coach.
          </h2>
          <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Your donation goes directly to work — supporting the coaches who build character,
            develop athletes, and grow the sport of wrestling at every level.
          </p>
          <button
            onClick={() => navigate("/checkout?flow=donation")}
            className="inline-flex items-center gap-3 bg-white text-[#C41E3A] font-condensed font-700 text-sm tracking-widest uppercase px-10 py-4 hover:bg-[#f0f0f0] transition-colors"
          >
            <Heart className="w-4 h-4" />
            Donate Now
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
