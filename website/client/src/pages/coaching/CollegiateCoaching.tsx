/**
 * Collegiate Coaching Development Page
 * Design: Dark navy/charcoal base, NWCA red accents, Bebas Neue display, Barlow Condensed labels, Inter body
 * Content migrated from: nwcaonline.com/sports/2023/4/3/coaching-development-for-collegiate-coaches.aspx
 */

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { ArrowRight, Award, BookOpen, Users, TrendingUp } from "lucide-react";

const HIGHLIGHTS = [
  { icon: Award, value: "750+", label: "Full scholarships awarded since 2010" },
  { icon: Users, value: "280+", label: "New college programs added since 2001" },
  { icon: BookOpen, value: "Gold", label: "Standard NCACE-recognized program" },
  { icon: TrendingUp, value: "Free", label: "Marketing toolkit from Dr. Coyte Cooper" },
];

const ACADEMIES = [
  {
    title: "Collegiate Sportlife Wrestling Academy",
    desc: "A comprehensive leadership and program-building experience designed for coaches at all collegiate levels.",
    cta: "Register Now",
    href: "https://nwcaonline.com/sports/2023/4/3/coaching-development-for-collegiate-coaches.aspx",
  },
  {
    title: "Men's Collegiate CEO Leadership Academy",
    desc: "Developed by Dr. Dan Gould in collaboration with top leaders to strengthen CEO-level coaching skills for men's programs.",
    cta: "Register Now",
    href: "https://nwcaonline.com/sports/2023/4/3/coaching-development-for-collegiate-coaches.aspx",
  },
  {
    title: "Women's Collegiate CEO Leadership Academy",
    desc: "A dedicated leadership academy for coaches of women's wrestling programs, addressing the unique growth opportunities in the sport.",
    cta: "Register Now",
    href: "https://nwcaonline.com/sports/2023/4/3/coaching-development-for-collegiate-coaches.aspx",
  },
];

export default function CollegiateCoaching() {
  return (
    <div className="min-h-screen bg-[#0f1420] text-white">
      <NavBar solid />

      {/* Hero */}
      <section className="relative bg-[#0f1420] border-b border-white/10 pt-16 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C41E3A]/10 via-transparent to-transparent pointer-events-none" />
        <div className="container relative">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/" className="text-[#c8cdd6] hover:text-white text-xs font-condensed tracking-widest uppercase transition-colors">Home</Link>
            <span className="text-[#c8cdd6]">/</span>
            <span className="text-white text-xs font-condensed tracking-widest uppercase">Coaching</span>
            <span className="text-[#c8cdd6]">/</span>
            <span className="text-[#c8cdd6] text-xs font-condensed tracking-widest uppercase">Collegiate Coaches</span>
          </div>
          <div className="max-w-3xl">
            <p className="font-condensed text-white text-sm tracking-[0.2em] uppercase mb-3">NWCA Coaching Development</p>
            <h1 className="font-display text-5xl md:text-7xl uppercase leading-none mb-6">
              Collegiate Coaching<br /><span className="text-white">Development</span>
            </h1>
            <p className="font-body text-lg text-[#c8cdd6] leading-relaxed max-w-2xl mb-8">
              There has never been a more important time in intercollegiate athletics for coaches to possess CEO-level leadership skills. Coaches must now operate as communicators, fundraisers, marketers, and program builders.
            </p>
          </div>
        </div>
      </section>

      {/* NCACE Recognition Banner */}
      <section className="py-10 bg-[#1c2333] border-b border-white/10">
        <div className="container">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-12 h-12 bg-[#C41E3A]/10 flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-condensed font-700 text-sm tracking-widest uppercase text-white mb-1">National Recognition</p>
              <h2 className="font-display text-2xl uppercase mb-2">NWCA CEO Leadership Academy Earns NCACE Program Recognition</h2>
              <p className="font-body text-sm text-[#c8cdd6] leading-relaxed max-w-2xl">
                The United States Center for Coaching Excellence (USCCE) is pleased to announce that the National Wrestling Coaches Association CEO Leadership Academy has earned National Committee for the Accreditation of Coaching Education (NCACE) Program Recognition. This recognition highlights the NWCA's continued leadership in coach education and its commitment to preparing wrestling coaches with high-level leadership and program-building skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-[#C41E3A] border-b border-[#a01830]">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HIGHLIGHTS.map(({ value, label }) => (
              <div key={value} className="border-l-2 border-white/30 pl-4">
                <p className="font-display text-4xl text-white mb-1">{value}</p>
                <p className="font-body text-sm text-white/85 leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="py-16 border-b border-white/10">
        <div className="container max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl uppercase mb-6">Why This Matters</h2>
          <p className="font-body text-[#c8cdd6] leading-relaxed mb-4">
            There has never been a more important time in intercollegiate athletics for coaches to possess CEO-level leadership skills. Coaches must now operate as communicators, fundraisers, marketers, and program builders.
          </p>
          <p className="font-body text-[#c8cdd6] leading-relaxed mb-4">
            Wrestling programs must remain aligned with educational values, including eligibility, graduation rates, community engagement, and leadership development.
          </p>
          <p className="font-body text-[#c8cdd6] leading-relaxed">
            The NWCA remains committed to developing leaders who strengthen programs and advance the sport nationwide. Developed by Dr. Dan Gould in collaboration with top leaders, the CEO Leadership Academy is the gold standard for collegiate wrestling coach education.
          </p>
        </div>
      </section>

      {/* Academy Programs */}
      <section className="py-16 border-b border-white/10 bg-[#1c2333]">
        <div className="container">
          <h2 className="font-display text-3xl md:text-4xl uppercase mb-2">2026 Leadership Academies</h2>
          <p className="font-body text-[#c8cdd6] mb-10">Applications are now open. Click below to register for the academy that fits your program.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {ACADEMIES.map(({ title, desc, cta, href }) => (
              <div key={title} className="bg-[#0f1420] border border-white/10 p-6 hover:border-[#C41E3A]/40 transition-colors flex flex-col">
                <h3 className="font-display text-xl uppercase mb-3 leading-tight">{title}</h3>
                <p className="font-body text-sm text-[#c8cdd6] leading-relaxed mb-6 flex-1">{desc}</p>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-condensed font-700 text-sm tracking-widest uppercase px-5 py-2.5 bg-[#C41E3A] text-white hover:bg-[#a01830] transition-colors flex items-center gap-2 self-start"
                >
                  {cta} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container">
          <div className="bg-[#C41E3A] p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="font-display text-3xl uppercase mb-2">Questions? Contact NWCA</h2>
              <p className="font-body text-white/80">Reach out to learn more about collegiate coaching development programs.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a
                href="tel:717-653-8009"
                className="font-condensed font-700 text-sm tracking-widest uppercase px-6 py-3 bg-white text-[#C41E3A] hover:bg-white/90 transition-colors"
              >
                Call 717-653-8009
              </a>
              <a
                href="mailto:technology@nwca.cc"
                className="font-condensed font-700 text-sm tracking-widest uppercase px-6 py-3 border border-white text-white hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                Email NWCA <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* ── FOOTER ──────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
