/**
 * Coaching Courses & Resources Directory Page
 * Design: Dark navy/charcoal base, NWCA red accents, Bebas Neue display, Barlow Condensed labels, Inter body
 * Content migrated from: nwcaonline.com/sports/2023/4/3/coaching-courses-resource-directory.aspx
 */

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { ArrowRight, BookOpen, BarChart2, FileText } from "lucide-react";

const RESOURCES = [
  {
    icon: BookOpen,
    title: "Collegiate Best Practices Academic Manual",
    desc: "The NWCA collaborated with academic officials at top colleges to create a comprehensive manual that serves as a resource for new coaches looking to develop systems to ensure academic success and veteran coaches hoping to find another competitive edge. This manual will help coaches ensure that their college wrestlers have the tools and systems to be successful undergraduate students.",
    tag: "Members Only",
  },
  {
    icon: BarChart2,
    title: "NWCA Marketing Resource Manual",
    desc: "Elite Level Sport Marketing (ELSM) partnered with the NCAA and NWCA to create a Marketing Manual resource that provides coaches with a step-by-step kit designed to help make their wrestling programs more relevant in their schools and communities.",
    tag: "Members Only",
  },
  {
    icon: FileText,
    title: "College Coaches Resource Manual",
    desc: "The NWCA, through a collaborative effort with many of the top college coaches in the nation, provides a resource notebook for college coaches. This manual is intended to serve as a 'standard code of operating procedure manual' for a college wrestling program. All of the information needed to execute an administrative task is organized neatly in a chapter format.",
    tag: "Members Only",
  },
];

export default function CoachingResources() {
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
            <span className="text-[#c8cdd6] text-xs font-condensed tracking-widest uppercase">Resources Directory</span>
          </div>
          <div className="max-w-3xl">
            <p className="font-condensed text-white text-sm tracking-[0.2em] uppercase mb-3">NWCA Coaching Development</p>
            <h1 className="font-display text-5xl md:text-7xl uppercase leading-none mb-6">
              Coaching Courses &<br /><span className="text-white">Resources Directory</span>
            </h1>
            <p className="font-body text-lg text-[#c8cdd6] leading-relaxed max-w-2xl">
              A curated collection of manuals, toolkits, and course materials developed in collaboration with top coaches and academic experts to help you build and sustain a stronger program.
            </p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 border-b border-white/10">
        <div className="container max-w-3xl">
          <p className="font-body text-[#c8cdd6] leading-relaxed mb-6">
            The NWCA, through a collaborative effort with internationally renowned coaching development expert, Dr. Dan Gould at Michigan State University, has constructed a gold standard leadership program to help college coaches accomplish the following: Strengthen their CEO skills, strengthen alignment of wrestling programs with educational values and insulate their programs from being discontinued.
          </p>
          <blockquote className="border-l-4 border-[#C41E3A] pl-6 mb-6">
            <p className="font-body text-white italic leading-relaxed mb-3">
              "The best wrestling minds in the country were in that room. I came back inspired from speakers from Lt. General Steele to Dan Gable and everyone in between, that room contained the battle lines of the profession. It was about the off the mat challenges we face, not about the technique we teach. The NWCA Leadership Academy is the 'Gold Standard' of being a coach today. When I began coaching the ability to connect with people like this all in one place did not exist."
            </p>
            <footer>
              <p className="font-condensed font-700 text-sm tracking-widest uppercase text-white">Jim Miller</p>
              <p className="font-body text-sm text-[#c8cdd6]">Former Head Coach, Wartburg College</p>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 border-b border-white/10 bg-[#1c2333]">
        <div className="container">
          <h2 className="font-display text-3xl md:text-4xl uppercase mb-2">Collegiate Coaching Resources</h2>
          <p className="font-body text-[#c8cdd6] mb-10">These resources are available to NWCA members. Log in or join to access the full library.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {RESOURCES.map(({ icon: Icon, title, desc, tag }) => (
              <div key={title} className="bg-[#0f1420] border border-white/10 p-6 hover:border-[#C41E3A]/40 transition-colors flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-[#C41E3A]/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-condensed text-xs tracking-widest uppercase text-white bg-[#C41E3A]/10 px-2 py-1">{tag}</span>
                </div>
                <h3 className="font-display text-xl uppercase mb-3 leading-tight">{title}</h3>
                <p className="font-body text-sm text-[#c8cdd6] leading-relaxed flex-1">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 border-b border-white/10">
        <div className="container max-w-3xl">
          <blockquote className="border-l-4 border-[#C41E3A] pl-8">
            <p className="font-body text-lg text-white leading-relaxed italic mb-6">
              "The Coaches Resource Manual is a great resource for coaches at any and all levels. I've used it to help me in building our intercollegiate team, club, promoting our events, running camps and essentially every other aspect of operating our program. I cannot recommend any other source of information more highly than this collection of knowledge."
            </p>
            <footer>
              <p className="font-condensed font-700 text-sm tracking-widest uppercase text-white">Rob Koll</p>
              <p className="font-body text-sm text-[#c8cdd6]">Head Coach, University of North Carolina</p>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container">
          <div className="bg-[#C41E3A] p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="font-display text-3xl uppercase mb-2">Access the Full Resource Library</h2>
              <p className="font-body text-white/80">NWCA membership unlocks all coaching manuals, toolkits, and course materials.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a
                href="https://nwcaonline.com"
                target="_blank"
                rel="noreferrer"
                className="font-condensed font-700 text-sm tracking-widest uppercase px-6 py-3 bg-white text-[#C41E3A] hover:bg-white/90 transition-colors flex items-center gap-2"
              >
                Join NWCA <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="tel:717-653-8009"
                className="font-condensed font-700 text-sm tracking-widest uppercase px-6 py-3 border border-white text-white hover:bg-white/10 transition-colors"
              >
                Call 717-653-8009
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
