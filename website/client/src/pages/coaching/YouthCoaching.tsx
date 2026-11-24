/**
 * Youth Coaching Development Page
 * Design: Dark navy/charcoal base, NWCA red accents, Bebas Neue display, Barlow Condensed labels, Inter body
 * Content migrated from: nwcaonline.com/sports/2023/4/3/coaching-development-for-youth-coaches.aspx
 */

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { ArrowRight, Users, Target, TrendingUp, Shield, Heart, Star } from "lucide-react";

const FOCUS_AREAS = [
  { icon: Shield, label: "Safety & Athlete Well-Being", desc: "Age-appropriate training with a focus on physical and emotional safety." },
  { icon: Target, label: "Age-Appropriate Practice Design", desc: "Structured sessions that match the developmental stage of young wrestlers." },
  { icon: Users, label: "Parent Engagement", desc: "Strategies to build trust, communicate effectively, and involve families." },
  { icon: TrendingUp, label: "Recruitment & Retention", desc: "Proven methods to grow participation and keep athletes coming back." },
  { icon: Heart, label: "Team Culture & Cohesion", desc: "Build a program identity that athletes are proud to be part of." },
  { icon: Star, label: "Long-Term Wrestler Development", desc: "A development-first mindset that prioritizes growth over wins." },
];

export default function YouthCoaching() {
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
            <span className="text-[#c8cdd6] text-xs font-condensed tracking-widest uppercase">Youth Development</span>
          </div>
          <div className="max-w-3xl">
            <p className="font-condensed text-white text-sm tracking-[0.2em] uppercase mb-3">NWCA Coaching Development</p>
            <h1 className="font-display text-5xl md:text-7xl uppercase leading-none mb-6">
              Youth Coaching<br /><span className="text-white">Development</span>
            </h1>
            <p className="font-body text-lg text-[#c8cdd6] leading-relaxed max-w-2xl">
              Building stronger youth programs by equipping coaches with the tools, strategies, and leadership resources needed to create a better experience for every wrestler.
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 border-b border-white/10">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-display text-3xl md:text-4xl uppercase mb-6">Why Youth Coaching Matters</h2>
              <p className="font-body text-[#c8cdd6] leading-relaxed mb-4">
                There is nobody that plays a more important role in the future growth of youth wrestling than coaches. This is why the NWCA has made the decision to invest so heavily in coaching development.
              </p>
              <p className="font-body text-[#c8cdd6] leading-relaxed mb-4">
                Many of our nation's top high school wrestling teams maintain a strong alignment with their youth wrestling clubs in coaching philosophy, technique, and program culture. A strong alignment among the various age group levels creates better continuity, stronger team cohesion, and improved retention as students progress through the program.
              </p>
              <p className="font-body text-[#c8cdd6] leading-relaxed">
                The NWCA has developed a comprehensive set of coaching development resources to help youth level wrestling coaches provide a terrific educationally based athletic experience for each student.
              </p>
            </div>
            <div className="bg-[#1c2333] border border-white/10 p-8">
              <h3 className="font-display text-2xl uppercase mb-6 text-white">The Athlete Experience Comes First</h3>
              <p className="font-body text-[#c8cdd6] leading-relaxed mb-4">
                Today, students have plenty of opportunities to play other sports and participate in other activities. While a coach may think the greatest opponent is the cross-town rival, it could very well be all of the other options competing for a young athlete's time and attention.
              </p>
              <p className="font-body text-[#c8cdd6] leading-relaxed mb-4">
                That is why it is imperative that wrestling coaches provide an exceptional athlete experience. The focus of a youth program should be on skill development and on creating an environment that is fun, rewarding, and meaningful for each student.
              </p>
              <p className="font-body text-white font-semibold">
                The success of a youth program should not be measured by wins and losses alone — it should be measured by how each wrestler improves, develops, and grows throughout the season.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Focus Areas */}
      <section className="py-16 border-b border-white/10">
        <div className="container">
          <h2 className="font-display text-3xl md:text-4xl uppercase mb-2">What NWCA Youth Coaching Resources Support</h2>
          <p className="font-body text-[#c8cdd6] mb-10">A comprehensive framework covering every dimension of youth program leadership.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FOCUS_AREAS.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="bg-[#1c2333] border border-white/10 p-6 hover:border-[#C41E3A]/40 transition-colors group">
                <div className="w-10 h-10 bg-[#C41E3A]/10 flex items-center justify-center mb-4 group-hover:bg-[#C41E3A]/20 transition-colors">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-condensed font-700 text-sm tracking-widest uppercase mb-2">{label}</h3>
                <p className="font-body text-sm text-[#c8cdd6] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Mindset */}
      <section className="py-16 border-b border-white/10">
        <div className="container max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl uppercase mb-6">A Development Mindset for Young Wrestlers</h2>
          <p className="font-body text-[#c8cdd6] leading-relaxed mb-4">
            Simply stated, it is very difficult to predict just how successful youth level wrestlers may become as they get older because they develop physically, emotionally, and socially at different rates.
          </p>
          <p className="font-body text-[#c8cdd6] leading-relaxed mb-4">
            With this in mind, coaches need to be thoughtful about how and when they introduce young students to competition, particularly in a combative sport like wrestling. A sound educational approach helps ensure that students develop confidence, learn the right lessons, and stay connected to the sport.
          </p>
          <p className="font-body text-[#c8cdd6] leading-relaxed">
            The NWCA Board of Directors is confident that you and your coaching staff will find these resources very useful in your efforts to improve the way you recruit and retain wrestlers while strengthening your commitment to providing a sound educationally based wrestling experience for each student.
          </p>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 border-b border-white/10 bg-[#1c2333]">
        <div className="container max-w-3xl">
          <blockquote className="border-l-4 border-[#C41E3A] pl-8">
            <p className="font-body text-lg text-white leading-relaxed italic mb-6">
              "The NWCA provides great coaching development resources for me as a coach and leader of our youth organization. I have used some outstanding ideas from some of the best minds in our sport. It has helped me look deeper at my coaching goals, developing our core values, and putting together an overall plan for our organization. The Youth Coaching Manual in particular is something I use on a consistent basis and it has helped me look deeper into why I coach and the purpose of our program."
            </p>
            <footer>
              <p className="font-condensed font-700 text-sm tracking-widest uppercase text-white">Pat McNamara</p>
              <p className="font-body text-sm text-[#c8cdd6]">Head Coach, Edwardsville Wrestling Club</p>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container">
          <div className="bg-[#C41E3A] p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="font-display text-3xl uppercase mb-2">Support the Next Generation of Wrestlers</h2>
              <p className="font-body text-white/80">Explore NWCA youth coaching development resources and build a stronger program.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a
                href="tel:717-653-8009"
                className="font-condensed font-700 text-sm tracking-widest uppercase px-6 py-3 bg-white text-[#C41E3A] hover:bg-white/90 transition-colors flex items-center gap-2"
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
