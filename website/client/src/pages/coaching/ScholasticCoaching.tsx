/**
 * Scholastic Coaching Development / Leadership Academy Page
 * Design: Dark navy/charcoal base, NWCA red accents, Bebas Neue display, Barlow Condensed labels, Inter body
 * Content migrated from: nwcaonline.com/sports/2023/4/3/coaching-development-for-scholastic-coaches.aspx
 */

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { ArrowRight, MapPin, Clock, Calendar, Users, TrendingDown, AlertTriangle } from "lucide-react";

const UPCOMING_WORKSHOPS = [
  { id: "01", date: "March 6, 2026", time: "4:00 pm – 8:00 pm", location: "Colony HS", city: "Palmer", state: "AK", address: "9550 E Bogard Road" },
  { id: "02", date: "April 11, 2026", time: "9:00 am – 1:00 pm", location: "McHenry High School", city: "McHenry", state: "IL", address: "4724 W Crystal Lake Road" },
  { id: "03", date: "May 2, 2026", time: "10:00 am – 2:00 pm", location: "Monticello High School", city: "Monticello", state: "UT", address: "148 S 200 W" },
  { id: "04", date: "May 17, 2026", time: "10:00 am – 2:00 pm", location: "Cypress Park High School", city: "Cypress", state: "TX", address: "West Green Blvd" },
  { id: "05", date: "June 13, 2026", time: "9:00 am – 1:00 pm", location: "Vista Ridge HS", city: "Colorado Springs", state: "CO", address: "6888 Black Forest Road" },
  { id: "06", date: "July 28, 2026", time: "8:00 am – 12:00 pm", location: "North Dakota State Convention", city: "Mandan", state: "ND", address: "TBD" },
  { id: "07", date: "July 30, 2026", time: "4:00 pm – 8:00 pm", location: "Renaissance Baltimore Harborplace Hotel", city: "Baltimore", state: "MD", address: "202 E Pratt Street" },
];

const VITAL_STATS = [
  { value: "30,000", label: "Decline in HS boys participation since 2011", icon: TrendingDown },
  { value: "37→23", label: "Average roster size shrunk from 37 to 23 athletes", icon: Users },
  { value: "29%", label: "Of high school dual meets now end in forfeits", icon: AlertTriangle },
  { value: "Growing", label: "Girls wrestling sees explosive growth nationwide", icon: ArrowRight },
];

const HOSTING_MODELS = [
  {
    title: "State Rules Interpretation Meetings",
    desc: "Piggybacking on a mandatory State High School Athletic Association rules interpretation meeting can be highly effective. Arizona, Alabama, and Delaware have successfully used this model.",
  },
  {
    title: "State Coaches Association Clinics",
    desc: "Another proven model is partnering with a state high school wrestling coaches association clinic and holding the workshop the day before the multi-day clinic begins.",
  },
  {
    title: "Board-Led Recruitment",
    desc: "In several successful examples, each coaches association board member took responsibility for recruiting 4 to 5 coaches into the academy.",
  },
  {
    title: "CEU Opportunities",
    desc: "The Delaware Interscholastic Coaches Association secured CEU credits for participating teacher-coaches. NWCA encourages other associations to explore similar opportunities.",
  },
];

export default function ScholasticCoaching() {
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
            <span className="text-[#c8cdd6] text-xs font-condensed tracking-widest uppercase">Scholastic Coaches</span>
          </div>
          <div className="max-w-3xl">
            <p className="font-condensed text-white text-sm tracking-[0.2em] uppercase mb-3">Presented by The United States Marine Corps</p>
            <h1 className="font-display text-5xl md:text-7xl uppercase leading-none mb-6">
              NWCA Scholastic<br /><span className="text-white">Leadership Academy</span>
            </h1>
            <p className="font-body text-lg text-[#c8cdd6] leading-relaxed max-w-2xl mb-8">
              Developing stronger coaches, stronger programs, and stronger participation in scholastic wrestling.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/coaching/scholastic/apply"
                className="font-condensed font-700 text-sm tracking-widest uppercase px-6 py-3 bg-[#C41E3A] text-white hover:bg-[#a01830] transition-colors flex items-center gap-2"
              >
                Register <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="tel:716-289-2855"
                className="font-condensed font-700 text-sm tracking-widest uppercase px-6 py-3 border border-white/30 text-white hover:border-white transition-colors"
              >
                Call 716-289-2855
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Vital Signs */}
      <section className="py-12 bg-[#C41E3A] border-b border-[#a01830]">
        <div className="container">
          <p className="font-condensed text-white/85 text-xs tracking-[0.2em] uppercase mb-6">Wrestling Vital Signs — The Need Has Never Been Greater</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VITAL_STATS.map(({ value, label }) => (
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
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-display text-3xl md:text-4xl uppercase mb-6">Why This Matters</h2>
              <p className="font-body text-[#c8cdd6] leading-relaxed mb-4">
                The NWCA, in collaboration with internationally renowned coaching development expert Dr. Dan Gould of Michigan State University, has built a gold standard leadership program for scholastic wrestling coaches.
              </p>
              <p className="font-body text-[#c8cdd6] leading-relaxed mb-4">
                The academy is designed to strengthen CEO-level coaching skills, improve alignment with educational values, and substantially increase wrestler recruitment and retention at the scholastic level.
              </p>
              <p className="font-body text-[#c8cdd6] leading-relaxed mb-4">
                The need for this training has never been greater. Participation challenges, shrinking roster sizes, and forfeits continue to affect the scholastic landscape, even as girls wrestling continues to grow rapidly across the country.
              </p>
              <p className="font-body text-white font-semibold">
                The goal is practical and achievable. If each high school coach recruits just three additional students, the impact can be significant.
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-[#1c2333] border border-white/10 p-6">
                <h3 className="font-condensed font-700 text-sm tracking-widest uppercase text-white mb-3">Online Modules & Workbook</h3>
                <p className="font-body text-sm text-[#c8cdd6] leading-relaxed">Coaches complete a workbook while progressing through 12 online modules (15–20 min each) covering recruitment and retention, working with parents, promoting girls wrestling, safety, and more.</p>
              </div>
              <div className="bg-[#1c2333] border border-white/10 p-6">
                <h3 className="font-condensed font-700 text-sm tracking-widest uppercase text-white mb-3">In-Person Workshop</h3>
                <p className="font-body text-sm text-[#c8cdd6] leading-relaxed">After completing the workbook, coaches attend an in-person workshop. Sessions run 4 to 6 hours, with 6 hours preferred when possible.</p>
              </div>
              <div className="bg-[#1c2333] border border-white/10 p-6">
                <h3 className="font-condensed font-700 text-sm tracking-widest uppercase text-white mb-3">Marine Corps Recruiting Mindset</h3>
                <p className="font-body text-sm text-[#c8cdd6] leading-relaxed">A Marine Corps keynote speaker helps coaches learn proven recruiting strategies that can be adapted to scholastic wrestling. Following the academy, coaches are encouraged to invite a Marine officer into their practice room.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Workshops */}
      <section className="py-16 border-b border-white/10 bg-[#1c2333]">
        <div className="container">
          <h2 className="font-display text-3xl md:text-4xl uppercase mb-2">Registration</h2>
          <p className="font-body text-[#c8cdd6] mb-8">Applications and nominations for upcoming academies are now open. Head coaches, assistant coaches, and aspiring scholastic leaders are encouraged to apply.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="font-condensed text-xs tracking-widest uppercase text-[#c8cdd6] text-left py-3 pr-6">#</th>
                  <th className="font-condensed text-xs tracking-widest uppercase text-[#c8cdd6] text-left py-3 pr-6">Date</th>
                  <th className="font-condensed text-xs tracking-widest uppercase text-[#c8cdd6] text-left py-3 pr-6">Time</th>
                  <th className="font-condensed text-xs tracking-widest uppercase text-[#c8cdd6] text-left py-3 pr-6">Location</th>
                  <th className="font-condensed text-xs tracking-widest uppercase text-[#c8cdd6] text-left py-3 pr-6">City, State</th>
                  <th className="font-condensed text-xs tracking-widest uppercase text-[#c8cdd6] text-left py-3"></th>
                </tr>
              </thead>
              <tbody>
                {UPCOMING_WORKSHOPS.map((w) => (
                  <tr key={w.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 pr-6 font-condensed text-white font-700">{w.id}</td>
                    <td className="py-4 pr-6 font-body text-white">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-[#c8cdd6] flex-shrink-0" />
                        {w.date}
                      </div>
                    </td>
                    <td className="py-4 pr-6 font-body text-[#c8cdd6]">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#c8cdd6] flex-shrink-0" />
                        {w.time}
                      </div>
                    </td>
                    <td className="py-4 pr-6 font-body text-white">{w.location}</td>
                    <td className="py-4 pr-6 font-body text-[#c8cdd6]">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#c8cdd6] flex-shrink-0" />
                        {w.city}, {w.state}
                      </div>
                    </td>
                    <td className="py-4">
                      <a
                        href="/coaching/scholastic/apply"
                        className="font-condensed text-xs tracking-widest uppercase text-white hover:text-white transition-colors"
                      >
                        Register →
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section className="py-16 border-b border-white/10">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl uppercase mb-6">How to Apply</h2>
              <h3 className="font-condensed font-700 text-sm tracking-widest uppercase text-white mb-4">Who Should Apply</h3>
              <ul className="space-y-3 mb-8">
                {[
                  "Active coaches who are current members of the NWCA",
                  "High school and middle school head and assistant coaches",
                  "Head coaches who want to bring assistant coaches and others from their local community",
                  "Club coaches who aspire to become middle school or high school coaches",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-[#C41E3A] rounded-full mt-2 flex-shrink-0" />
                    <span className="font-body text-[#c8cdd6] text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <h3 className="font-condensed font-700 text-sm tracking-widest uppercase text-white mb-4">Participation Expectations</h3>
              <p className="font-body text-[#c8cdd6] text-sm leading-relaxed mb-3">
                Must be an NWCA Member. NWCA does need a commitment from at least 50 coaches to attend the in-person workshop in order to satisfy sponsor support.
              </p>
              <p className="font-body text-[#c8cdd6] text-sm leading-relaxed">
                Each online module takes approximately 15 to 20 minutes, and there are 12 total modules. All participants should complete the 360 evaluation and online modules before attending the in-person academy.
              </p>
            </div>
            <div>
              <h3 className="font-display text-2xl uppercase mb-6">What the Workshop Experience Looks Like</h3>
              <p className="font-body text-[#c8cdd6] leading-relaxed mb-4">
                The academy workshop is built around small-group and large-group facilitation. Coaches are typically placed in groups of 4 to 5 alongside a seasoned veteran coach who facilitates discussion at each table.
              </p>
              <p className="font-body text-[#c8cdd6] leading-relaxed mb-8">
                A lead facilitator then guides all participants through a series of thought-provoking discussions designed to establish best practices that can substantially increase participation and retention of wrestlers. The result is a practical and collaborative setting where coaches can exchange ideas that work.
              </p>
              <h3 className="font-condensed font-700 text-sm tracking-widest uppercase text-white mb-4">Hosting Models That Have Proven Most Effective</h3>
              <div className="space-y-4">
                {HOSTING_MODELS.map(({ title, desc }) => (
                  <div key={title} className="border-l-2 border-[#C41E3A]/40 pl-4">
                    <p className="font-condensed font-700 text-sm tracking-wide uppercase text-white mb-1">{title}</p>
                    <p className="font-body text-sm text-[#c8cdd6] leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container">
          <div className="bg-[#C41E3A] p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="font-display text-3xl uppercase mb-2">Ready to Get Involved?</h2>
              <p className="font-body text-white/80">Academies are filling quickly. Contact NWCA Coaching Development Director Jim Beichner.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a
                href="/coaching/scholastic/apply"
                className="font-condensed font-700 text-sm tracking-widest uppercase px-6 py-3 bg-white text-[#C41E3A] hover:bg-white/90 transition-colors flex items-center gap-2"
              >
                Email Jim Beichner <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="tel:716-289-2855"
                className="font-condensed font-700 text-sm tracking-widest uppercase px-6 py-3 border border-white text-white hover:bg-white/10 transition-colors"
              >
                Call 716-289-2855
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
