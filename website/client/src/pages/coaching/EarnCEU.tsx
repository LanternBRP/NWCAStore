/**
 * Earn CEU Credits Page
 * Design: Dark navy/charcoal base, NWCA red accents, Bebas Neue display, Barlow Condensed labels, Inter body
 * Note: Legacy page returned 404. Content built from NWCA convention context and general CEU info.
 */

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { ArrowRight, GraduationCap, CheckCircle, Calendar } from "lucide-react";

const CEU_WAYS = [
  { title: "NWCA Annual Convention", desc: "The NWCA Convention is the premier event for earning CEU credits. Attend clinics, workshops, and sessions across multiple days to accumulate credits toward your coaching certification." },
  { title: "NWCA Leadership Academies", desc: "Both the Scholastic and Collegiate Leadership Academies offer CEU credit opportunities. The Delaware Interscholastic Coaches Association has already secured CEU credits for participating teacher-coaches." },
  { title: "Online Modules", desc: "Complete online coaching development modules at your own pace. Each module takes approximately 15–20 minutes and covers topics from recruitment and retention to athlete well-being." },
  { title: "State Association Clinics", desc: "Many state high school wrestling coaches associations partner with NWCA to offer CEU-eligible workshops and clinics throughout the year." },
];

export default function EarnCEU() {
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
            <span className="text-[#c8cdd6] text-xs font-condensed tracking-widest uppercase">Earn CEU Credits</span>
          </div>
          <div className="max-w-3xl">
            <p className="font-condensed text-white text-sm tracking-[0.2em] uppercase mb-3">NWCA Coaching Development</p>
            <h1 className="font-display text-5xl md:text-7xl uppercase leading-none mb-6">
              Earn<br /><span className="text-white">CEU Credits</span>
            </h1>
            <p className="font-body text-lg text-[#c8cdd6] leading-relaxed max-w-2xl mb-8">
              The NWCA offers multiple pathways for coaches to earn Continuing Education Units (CEU) credits through conventions, leadership academies, online modules, and state association events.
            </p>
            <a
              href="https://nwcaonline.com"
              target="_blank"
              rel="noreferrer"
              className="font-condensed font-700 text-sm tracking-widest uppercase px-6 py-3 bg-[#C41E3A] text-white hover:bg-[#a01830] transition-colors inline-flex items-center gap-2"
            >
              View NWCA Convention <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Ways to Earn */}
      <section className="py-16 border-b border-white/10">
        <div className="container">
          <h2 className="font-display text-3xl md:text-4xl uppercase mb-2">Ways to Earn CEU Credits</h2>
          <p className="font-body text-[#c8cdd6] mb-10">Multiple pathways to meet your continuing education requirements as an NWCA member.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {CEU_WAYS.map(({ title, desc }) => (
              <div key={title} className="bg-[#1c2333] border border-white/10 p-6 hover:border-[#C41E3A]/40 transition-colors">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-condensed font-700 text-sm tracking-widest uppercase mb-2">{title}</h3>
                    <p className="font-body text-sm text-[#c8cdd6] leading-relaxed">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Convention CTA */}
      <section className="py-16 border-b border-white/10 bg-[#1c2333]">
        <div className="container">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="w-14 h-14 bg-[#C41E3A]/10 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-3xl uppercase mb-3">NWCA Annual Convention</h2>
              <p className="font-body text-[#c8cdd6] leading-relaxed mb-4">
                The NWCA Convention is the single best opportunity to earn CEU credits while connecting with the top coaching minds in the sport. Sessions cover technique, program management, athlete well-being, recruiting, and leadership.
              </p>
              <p className="font-body text-[#c8cdd6] leading-relaxed mb-6">
                Register at <strong className="text-white">nwcaconvention.com</strong> to secure your spot and begin earning credits toward your certification.
              </p>
              <a
                href="https://nwcaconvention.com"
                target="_blank"
                rel="noreferrer"
                className="font-condensed font-700 text-sm tracking-widest uppercase px-6 py-3 bg-[#C41E3A] text-white hover:bg-[#a01830] transition-colors inline-flex items-center gap-2"
              >
                Register at nwcaconvention.com <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CEU Info Note */}
      <section className="py-16 border-b border-white/10">
        <div className="container max-w-3xl">
          <div className="flex items-start gap-4 bg-[#1c2333] border border-[#C41E3A]/20 p-6">
            <GraduationCap className="w-6 h-6 text-white flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-condensed font-700 text-sm tracking-widest uppercase text-white mb-2">CMS Content Area</p>
              <p className="font-body text-sm text-[#c8cdd6] leading-relaxed">
                Detailed CEU credit requirements, approved course listings, and submission instructions will be managed through the NWCA content management system. Contact NWCA directly for current CEU requirements and approved course listings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container">
          <div className="bg-[#C41E3A] p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="font-display text-3xl uppercase mb-2">Questions About CEU Credits?</h2>
              <p className="font-body text-white/80">Contact NWCA for information about credit requirements and approved programs.</p>
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
