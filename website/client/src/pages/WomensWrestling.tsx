/**
 * Women's Wrestling Page
 * Design: Bold, dark navy base with red accents — consistent with NWCA brand
 * Sections: Hero → Stats → Building the Future → Why It Matters → Facts & Resources → Uniform Guide → Sanctioning States → CTA
 * Content scraped from legacy NWCA site: nwcaonline.com/sports/2023/4/3/womens-wrestling-facts-resources.aspx
 */

import { useEffect } from "react";
import { Link } from "wouter";
import { ExternalLink, ChevronRight, Trophy, Users, MapPin, Star, BookOpen, Shield } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import GirlsSanctioningMap from "@/components/GirlsSanctioningMap";

const SANCTIONED_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas",
  "Kentucky","Maine","Maryland","Massachusetts","Michigan","Minnesota","Missouri",
  "Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York",
  "North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania",
  "Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah",
  "Virginia","Washington","West Virginia","Wisconsin","Wyoming"
];

const FACTS = [
  "Since 1994, the number of women who wrestle in high school has grown from 804 to more than 74,000, according to participation numbers released by the NFHS.",
  "In 2025, the NCAA announced that women's wrestling would become its 91st championship sport.",
  "In 2026, the NCAA announced that in 2027–28 Division III Women will host its own championship.",
  "In 2022, the NAIA adopted women's wrestling as its 28th championship sport.",
  "In 2020, the NJCAA announced it would recognize women's wrestling as an emerging sport.",
  "In 2020, the NWCA Multi-Divisional National Duals hosted separate NAIA and NCAA women's divisions for the first time.",
  "In 2019, the Women's Collegiate Wrestling Coalition announced the creation of the Cliff Keen National Collegiate Women's Wrestling Championships for NCAA teams, hosted by Adrian College on March 6–7, 2020.",
  "In 2019, the Committee on Women's Athletics recommended Emerging Sports status for women's wrestling to the NCAA.",
  "More than 150 colleges now sponsor a varsity women's wrestling program.",
  "Since 2004, women's wrestling has been a recognized Olympic sport.",
  "Women's high school wrestling participation numbers are higher than NCAA-sponsored sports such as crew, fencing, skiing, and rifle, as well as NCAA emerging sports such as rugby, sand volleyball, and equestrian.",
  "Since 2015, the NWCA has invited 100 coaches annually to take part in the NWCA CEO Academy for Women Coaches as part of the NWCA Traditional Leadership Academy.",
  "The NWCA has been instrumental in helping add women's wrestling as a new sport at a number of schools.",
];

const WHY_MATTERS = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "Rapid National Growth",
    body: "Participation continues to rise across the country, creating stronger pipelines from youth and high school wrestling into college competition and coaching leadership opportunities.",
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    title: "Championship Pathways",
    body: "Formal championship structures through the NCAA, NAIA, and other governing bodies are helping give women wrestlers greater visibility, legitimacy, and opportunity.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "NWCA Advocacy",
    body: "The NWCA has helped promote women's wrestling growth through leadership development, program support, and advocacy for expanded participation at schools nationwide.",
  },
];

export default function WomensWrestling() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f1420] text-white">
      <NavBar solid />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#0f1420] overflow-hidden">
        {/* Background gradient accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#C41E3A]/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#C41E3A]/5 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-[#C41E3A]" />
              <span className="font-condensed text-xs tracking-[0.2em] uppercase text-[#F5C842]">
                Growing Women's Wrestling
              </span>
            </div>

            <h1 className="font-condensed font-900 text-6xl lg:text-8xl uppercase leading-none tracking-tight mb-6">
              WOMEN'S<br />
              <span className="text-[#F5C842]">WRESTLING</span>
            </h1>

            <p className="text-[#c8cdd6] text-lg leading-relaxed max-w-2xl mb-8">
              The NWCA is committed to advancing women's wrestling at every level by supporting
              participation, leadership, opportunity, and long-term growth — from the grassroots
              to the college ranks.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#sanctioning-map"
                onClick={(e) => { e.preventDefault(); document.getElementById('sanctioning-map')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 bg-[#C41E3A] text-white font-condensed font-700 text-sm tracking-widest uppercase px-6 py-3 hover:bg-[#a01830] transition-colors"
              >
                <MapPin className="w-4 h-4" />
                Sanctioning Map
              </a>
              <a
                href="https://s3.us-east-2.amazonaws.com/sidearm.nextgen.sites/nwca.sidearmsports.com/documents/2024/5/7/NFHS_Athletic_Directors_Uniform_Guide_For_Girls_Wrestling.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-white/30 text-white font-condensed font-700 text-sm tracking-widest uppercase px-6 py-3 hover:border-[#C41E3A] hover:text-white transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                Uniform Guide
              </a>
            </div>
          </div>
        </div>

        {/* Bottom border */}
        <div className="h-[2px] bg-gradient-to-r from-[#C41E3A] via-[#C41E3A]/50 to-transparent" />
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
      <section className="bg-[#17214B] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/10">
            {[
              { value: "74,000+", label: "Girls Wrestling in High School" },
              { value: "150+", label: "Colleges Sponsoring Varsity Programs" },
              { value: "47", label: "States with Girls State Championships" },
              { value: "2004", label: "Olympic Recognition Began" },
            ].map((stat) => (
              <div key={stat.label} className="lg:px-8 first:pl-0 last:pr-0 text-center lg:text-left">
                <div className="font-condensed font-900 text-4xl lg:text-5xl text-[#F5C842] leading-none mb-2">
                  {stat.value}
                </div>
                <div className="font-condensed text-xs tracking-widest uppercase text-[#c8cdd6]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUILDING THE FUTURE ──────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-[#0f1420]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[2px] bg-[#C41E3A]" />
                <span className="font-condensed text-xs tracking-[0.2em] uppercase text-[#F5C842]">
                  The Future of the Sport
                </span>
              </div>
              <h2 className="font-condensed font-900 text-4xl lg:text-5xl uppercase leading-tight mb-6">
                Building the Future of Women's Wrestling
              </h2>
              <div className="space-y-4 text-[#c8cdd6] leading-relaxed">
                <p>
                  Women's wrestling is one of the fastest-growing sports at the scholastic and collegiate
                  levels. The NWCA has remained committed to helping create new opportunities for girls
                  and women to compete, lead, and thrive in wrestling.
                </p>
                <p>
                  The NCAA recently announced that women's wrestling will become its <strong className="text-white">91st championship sport</strong>,
                  with a combined Division I, II, and III championship beginning in March 2026. The NAIA
                  officially recognizes women's wrestling with a national championship, and the NJCAA has
                  also recognized women's wrestling as an emerging sport.
                </p>
                <p>
                  In 2027–28, Division III Women will host its own dedicated championship — marking
                  another milestone in the sport's historic ascent.
                </p>
              </div>
            </div>

            {/* Visual card stack */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#17214B] border border-white/10 p-6 flex flex-col gap-2">
                <Trophy className="w-8 h-8 text-[#F5C842] mb-2" />
                <div className="font-condensed font-700 text-white text-lg uppercase tracking-wide">NCAA Champion Sport</div>
                <p className="text-[#c8cdd6] text-sm">91st championship sport — combined DI, DII, DIII starting March 2026</p>
              </div>
              <div className="bg-[#17214B] border border-white/10 p-6 flex flex-col gap-2 mt-8">
                <Star className="w-8 h-8 text-[#F5C842] mb-2" />
                <div className="font-condensed font-700 text-white text-lg uppercase tracking-wide">NAIA Recognized</div>
                <p className="text-[#c8cdd6] text-sm">28th NAIA championship sport since 2022 — full national championship</p>
              </div>
              <div className="bg-[#17214B] border border-white/10 p-6 flex flex-col gap-2">
                <Users className="w-8 h-8 text-[#F5C842] mb-2" />
                <div className="font-condensed font-700 text-white text-lg uppercase tracking-wide">NJCAA Emerging</div>
                <p className="text-[#c8cdd6] text-sm">Recognized as an emerging sport by the NJCAA since 2020</p>
              </div>
              <div className="bg-[#17214B] border border-white/10 p-6 flex flex-col gap-2 mt-8">
                <Shield className="w-8 h-8 text-[#F5C842] mb-2" />
                <div className="font-condensed font-700 text-white text-lg uppercase tracking-wide">Olympic Sport</div>
                <p className="text-[#c8cdd6] text-sm">Recognized Olympic sport since 2004 — the highest stage in the world</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY IT MATTERS ───────────────────────────────────────────────── */}
      <section className="py-20 bg-[#17214B] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#C41E3A]" />
            <span className="font-condensed text-xs tracking-[0.2em] uppercase text-[#F5C842]">
              Why This Matters
            </span>
          </div>
          <h2 className="font-condensed font-900 text-4xl lg:text-5xl uppercase leading-tight mb-12">
            Why This Matters
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {WHY_MATTERS.map((item) => (
              <div key={item.title} className="bg-[#0f1420] border border-white/10 p-8">
                <div className="w-12 h-12 bg-[#C41E3A]/10 flex items-center justify-center text-[#F5C842] mb-6">
                  {item.icon}
                </div>
                <h3 className="font-condensed font-700 text-xl uppercase tracking-wide text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-[#c8cdd6] leading-relaxed text-sm">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FACTS & RESOURCES ────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-[#0f1420]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#C41E3A]" />
            <span className="font-condensed text-xs tracking-[0.2em] uppercase text-[#F5C842]">
              Facts & Resources
            </span>
          </div>
          <h2 className="font-condensed font-900 text-4xl lg:text-5xl uppercase leading-tight mb-12">
            Facts & Resources
          </h2>
          <div className="grid lg:grid-cols-2 gap-x-16 gap-y-0">
            {FACTS.map((fact, i) => (
              <div
                key={i}
                className="flex gap-4 py-5 border-b border-white/10 last:border-0"
              >
                <div className="flex-shrink-0 w-6 h-6 bg-[#C41E3A] flex items-center justify-center mt-0.5">
                  <ChevronRight className="w-3 h-3 text-white" />
                </div>
                <p className="text-[#c8cdd6] text-sm leading-relaxed">{fact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SANCTIONED STATES ────────────────────────────────────────────── */}
      <section id="sanctioning-map" className="py-20 bg-[#17214B] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#C41E3A]" />
            <span className="font-condensed text-xs tracking-[0.2em] uppercase text-[#F5C842]">
              Sanctioning
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end gap-6 mb-10">
            <h2 className="font-condensed font-900 text-4xl lg:text-5xl uppercase leading-tight">
              47 States with Official<br />Girls State Championships
            </h2>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#C41E3A] inline-block" />
                <span className="font-condensed text-xs text-white/80 tracking-wide">Sanctioned (47)</span>
              </span>
              <span className="mx-2 text-white/20">·</span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#0f1420] border border-white/20 inline-block" />
                <span className="font-condensed text-xs text-white/80 tracking-wide">Not yet sanctioned (3)</span>
              </span>
            </div>
          </div>

          {/* Girls Sanctioning Map — same map as /grow/state-map, locked to girls-sanctioned view */}
          <GirlsSanctioningMap className="mb-6" />

          <div className="flex flex-wrap gap-2">
            {SANCTIONED_STATES.map((state) => (
              <span
                key={state}
                className="bg-[#C41E3A]/15 border border-[#C41E3A]/30 font-condensed font-600 text-xs tracking-wide uppercase text-white px-3 py-1.5"
              >
                {state}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── UNIFORM GUIDE ────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#0f1420]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-[#C41E3A]" />
                <span className="font-condensed text-xs tracking-[0.2em] uppercase text-[#F5C842]">
                  Resources
                </span>
              </div>
              <h2 className="font-condensed font-900 text-4xl lg:text-5xl uppercase leading-tight mb-6">
                Practical Wrestling<br />Uniform Guide for Girls
              </h2>
              <p className="text-[#c8cdd6] leading-relaxed mb-8">
                The NWCA's practical guide covers everything coaches and athletes need to know
                about proper uniform requirements, fit, and compliance for girls' wrestling
                competitions at the scholastic and collegiate levels.
              </p>
              <a
                href="https://s3.us-east-2.amazonaws.com/sidearm.nextgen.sites/nwca.sidearmsports.com/documents/2024/5/7/NFHS_Athletic_Directors_Uniform_Guide_For_Girls_Wrestling.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#C41E3A] text-white font-condensed font-700 text-sm tracking-widest uppercase px-6 py-3 hover:bg-[#a01830] transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                View Uniform Guide
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Female College Programs vs. HS Participation Map", url: "https://nwcaonline.com/sports/2023/4/3/female-college-programs-vs-hs-participation-map.aspx" },
                { title: "Where to Wrestle Map", url: "https://nwcaonline.com/sports/2023/4/3/where-to-wrestle-map.aspx" },
                { title: "Starting a New Wrestling Program", url: "https://nwcaonline.com/sports/2023/4/3/starting-a-new-wrestling-program.aspx" },
                { title: "Why Wrestle? Research & Resources", url: "https://nwcaonline.com/sports/2023/4/3/why-wrestle.aspx" },
              ].map((res) => (
                <a
                  key={res.title}
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#17214B] border border-white/10 p-5 hover:border-[#C41E3A]/50 hover:bg-[#1c2a5e] transition-all group"
                >
                  <div className="font-condensed font-700 text-sm uppercase tracking-wide text-white group-hover:text-white transition-colors leading-tight mb-2">
                    {res.title}
                  </div>
                  <div className="flex items-center gap-1 text-[#F5C842] text-xs font-condensed">
                    View <ExternalLink className="w-3 h-3" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#C41E3A]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-condensed font-900 text-4xl lg:text-6xl uppercase text-white leading-tight mb-4">
            Help Support the Growth<br />of Women's Wrestling
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10">
            Stay connected to the latest developments, access NWCA resources, and help continue
            building stronger opportunities for girls and women across every level of wrestling.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-white text-[#C41E3A] font-condensed font-700 text-sm tracking-widest uppercase px-8 py-4 hover:bg-white/90 transition-colors"
            >
              Learn More About NWCA
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 border-2 border-white text-white font-condensed font-700 text-sm tracking-widest uppercase px-8 py-4 hover:bg-white/10 transition-colors"
            >
              Join or Renew Membership
            </Link>
          </div>
        </div>
      </section>
      {/* ── FOOTER ──────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
