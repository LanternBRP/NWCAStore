/**
 * Start a Program — Grow the Sport sub-page
 * Design: Dark arena aesthetic, NWCA brand colors
 * Colors: Arena Black #0A0E1A / NWCA Navy #17214B / Championship Red #C41E3A
 */

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Globe, CheckCircle, ArrowRight, ChevronRight, Users, BookOpen, Phone, Mail, FileText, Shield, Zap } from "lucide-react";
import { useLocation } from "wouter";
import { toast } from "sonner";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663283983903/Hfy5MinW2PXVKLrBsPEmFG/nwca_men_wrestling-WjWzhv5r9eaGje2r3TTCeD.webp";

const PROGRAM_LEVELS = [
  {
    level: "Youth Club",
    icon: Users,
    steps: [
      "Connect with USA Wrestling to register as an official club",
      "Secure a practice facility (school gym, community center, or recreation center)",
      "Recruit a certified head coach (USA Wrestling certification required)",
      "Register athletes with USA Wrestling for insurance coverage",
      "Schedule your first practice and begin recruiting youth wrestlers",
      "Join a local wrestling league or association for competition opportunities",
    ],
    resources: ["USA Wrestling Club Registration", "NWCA Youth Development Guide", "Coaching Certification Info"],
    timeline: "4–8 weeks",
    cost: "$500–$2,000 startup",
  },
  {
    level: "High School Program",
    icon: Shield,
    steps: [
      "Present a proposal to your school's athletic director and administration",
      "Demonstrate community interest (petition, parent meetings, student sign-ups)",
      "Identify a qualified head coach (state teaching/coaching certification required)",
      "Secure budget approval for equipment, uniforms, and travel",
      "Register with your state's high school athletic association (NFHS member)",
      "Schedule dual meets and tournament participation for the first season",
    ],
    resources: ["NFHS Wrestling Resources", "State Athletic Association Contacts", "NWCA Scholastic Coaching Guide"],
    timeline: "3–12 months",
    cost: "$5,000–$20,000 first year",
  },
  {
    level: "Collegiate Program",
    icon: Globe,
    steps: [
      "Build institutional support — athletic director, president, and board buy-in",
      "Conduct a feasibility study: budget, roster size, Title IX compliance, facilities",
      "Determine NCAA/NAIA/NJCAA membership and division level",
      "Hire a head coach with collegiate experience and recruiting network",
      "Develop a multi-year budget plan including scholarships and travel",
      "Contact NWCA for guidance, resources, and connection to existing programs",
    ],
    resources: ["NCAA Sport Sponsorship Guide", "NAIA Membership Info", "NWCA Collegiate Program Toolkit"],
    timeline: "1–3 years",
    cost: "$150,000–$1M+ annually",
  },
];

const SUCCESS_STORIES = [
  {
    school: "University of Maryland Eastern Shore",
    level: "NCAA D1",
    year: "2022",
    quote: "The NWCA provided invaluable guidance throughout our program launch. Their resources and connections made the process significantly smoother.",
    contact: "Athletic Director",
  },
  {
    school: "Eastside High School, NJ",
    level: "Scholastic",
    year: "2021",
    quote: "We went from zero wrestlers to a 30-person roster in our first year. The step-by-step guides from NWCA were essential.",
    contact: "Head Coach",
  },
  {
    school: "Riverside Wrestling Club, CA",
    level: "Youth",
    year: "2023",
    quote: "Starting a youth club seemed overwhelming until we found the NWCA resources. Now we have 45 kids on the mat every week.",
    contact: "Club Director",
  },
];

export default function StartAProgram() {
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
            <span className="font-condensed text-xs tracking-widest uppercase text-white">Start a Program</span>
          </div>
          <div className="section-label mb-3">Grow the Sport</div>
          <h1 className="font-display text-6xl md:text-8xl text-white leading-none">
            START A <span className="text-white">PROGRAM</span>
          </h1>
          <p className="font-body text-[#d0d5de] text-lg mt-4 max-w-2xl">
            Step-by-step guides for launching a new wrestling program at the youth, scholastic, or collegiate level.
          </p>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="bg-[#222b3d] border-y border-white/5 py-6">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { num: "50+", label: "New Programs / Year" },
            { num: "47", label: "States Sanctioning Girls" },
            { num: "400+", label: "College Programs" },
            { num: "11,000+", label: "HS Programs" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl text-white">{s.num}</div>
              <div className="font-condensed text-xs tracking-widest uppercase text-[#c8cdd6] mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── INTRO ── */}
      <section className="py-16 bg-[#0f1420]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-label mb-3">Why Start a Program?</div>
              <h2 className="font-display text-4xl text-white mb-6">WRESTLING CHANGES <span className="text-white">LIVES</span></h2>
              <p className="font-body text-[#d0d5de] leading-relaxed mb-4">
                Wrestling is one of the most character-building sports in the world. It teaches discipline, resilience, work ethic, and respect — values that translate to every area of life.
              </p>
              <p className="font-body text-[#d0d5de] leading-relaxed mb-6">
                The NWCA is committed to growing the sport at every level. Whether you're launching a youth club, adding wrestling to your school's athletic program, or building a collegiate team from scratch, we have the resources and expertise to help you succeed.
              </p>
              <div className="space-y-3">
                {["NWCA provides free consultation for new programs", "Access to coaching resources and curriculum", "Connection to existing programs for mentorship", "Guidance on Title IX compliance and funding"].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <span className="font-body text-sm text-[#d0d5de]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Zap, title: "Fast Launch", desc: "Youth clubs can be operational in as little as 4 weeks with the right resources." },
                { icon: Users, title: "Community Impact", desc: "Wrestling programs become community anchors, building culture and pride." },
                { icon: BookOpen, title: "Full Support", desc: "NWCA provides guides, templates, and direct consultation at no cost." },
                { icon: Globe, title: "Growing Sport", desc: "Wrestling participation is at an all-time high — now is the time to start." },
              ].map((item) => (
                <div key={item.title} className="bg-[#161d2e] border border-white/5 p-5">
                  <item.icon className="w-6 h-6 text-white mb-3" />
                  <div className="font-condensed font-700 text-sm text-white mb-1">{item.title}</div>
                  <div className="font-body text-xs text-[#c8cdd6] leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STEP-BY-STEP GUIDES ── */}
      <section className="py-16 bg-[#0A0E1A]">
        <div className="container">
          <div className="mb-10">
            <div className="section-label mb-2">Step-by-Step Guides</div>
            <h2 className="font-display text-4xl text-white">LAUNCH YOUR <span className="text-white">PROGRAM</span></h2>
          </div>
          <div className="space-y-6">
            {PROGRAM_LEVELS.map((p) => (
              <div key={p.level} className="bg-[#161d2e] border border-white/5">
                <div className="flex items-center gap-4 p-6 border-b border-white/5">
                  <div className="w-12 h-12 bg-[#C41E3A]/10 flex items-center justify-center flex-shrink-0">
                    <p.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-condensed font-700 text-xl text-white">{p.level}</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="font-body text-xs text-[#c8cdd6]">Timeline: <span className="text-[#d0d5de]">{p.timeline}</span></span>
                      <span className="font-body text-xs text-[#c8cdd6]">Est. Cost: <span className="text-[#d0d5de]">{p.cost}</span></span>
                    </div>
                  </div>
                </div>
                <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="font-condensed font-700 text-xs tracking-widest uppercase text-[#c8cdd6] mb-4">Steps to Launch</div>
                    <ol className="space-y-3">
                      {p.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="font-display text-lg text-white leading-none flex-shrink-0 w-6">{i + 1}</span>
                          <span className="font-body text-sm text-[#d0d5de] leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div>
                    <div className="font-condensed font-700 text-xs tracking-widest uppercase text-[#c8cdd6] mb-4">Key Resources</div>
                    <ul className="space-y-2">
                      {p.resources.map((r) => (
                        <li key={r} className="flex items-start gap-2">
                          <FileText className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                          <a href="https://nwcaonline.com/sports/2023/4/3/coaching-resources.aspx" target="_blank" rel="noreferrer" className="font-body text-sm text-[#d0d5de] hover:text-white transition-colors text-left">{r}</a>
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

      {/* ── SUCCESS STORIES ── */}
      <section className="py-16 bg-[#1c2333]">
        <div className="container">
          <div className="mb-10">
            <div className="section-label mb-2">Success Stories</div>
            <h2 className="font-display text-4xl text-white">PROGRAMS THAT <span className="text-white">LAUNCHED</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SUCCESS_STORIES.map((s) => (
              <div key={s.school} className="bg-[#222b3d] border border-white/5 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-condensed text-[10px] tracking-widest uppercase bg-[#C41E3A]/20 text-white px-2 py-0.5 border border-[#C41E3A]/30">{s.level}</span>
                  <span className="font-condensed text-[10px] tracking-widest uppercase text-[#c8cdd6]">{s.year}</span>
                </div>
                <blockquote className="font-body text-sm text-[#d0d5de] leading-relaxed italic mb-4">"{s.quote}"</blockquote>
                <div className="border-t border-white/5 pt-4">
                  <div className="font-condensed font-700 text-sm text-white">{s.school}</div>
                  <div className="font-body text-xs text-[#c8cdd6]">{s.contact}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="py-16 bg-[#0f1420]">
        <div className="container">
          <div className="bg-[#17214B] border border-white/10 p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="section-label mb-3">Get Help Starting</div>
              <h2 className="font-display text-4xl text-white mb-4">CONTACT <span className="text-white">NWCA</span></h2>
              <p className="font-body text-[#d0d5de] leading-relaxed mb-6">
                The NWCA offers free consultation for schools, clubs, and institutions looking to start a wrestling program. Our staff has helped launch dozens of programs at every level.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-white" />
                  <span className="font-body text-sm text-[#d0d5de]">717-653-8009</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-white" />
                  <a href="mailto:technology@nwca.cc" className="font-body text-sm text-[#d0d5de] hover:text-white transition-colors">technology@nwca.cc</a>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <a href="mailto:technology@nwca.cc?subject=Program%20Launch%20Consultation%20Request"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#C41E3A] hover:bg-[#a01830] text-white font-condensed font-700 text-sm tracking-widest uppercase px-8 py-4 transition-colors">
                Request a Consultation <ArrowRight className="w-4 h-4" />
              </a>
              <a href="mailto:technology@nwca.cc?subject=Program%20Starter%20Kit%20Request"
                className="w-full inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-condensed font-700 text-sm tracking-widest uppercase px-8 py-4 transition-colors">
                Download Program Starter Kit <FileText className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
