/**
 * Join NWCA — Membership Page
 * Design: Dark arena aesthetic, NWCA brand colors
 * Colors: Arena Black #0A0E1A / NWCA Navy #17214B / Championship Red #C41E3A
 * Layout: Hero → Why Join stats → Membership tier cards → Benefits grid → FAQ → CTA
 */

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useLocation } from "wouter";
import {
  ChevronRight, ArrowRight, Users, BookOpen, Trophy, Shield,
  Star, CheckCircle, Globe, Zap, Award, Heart
} from "lucide-react";

const MEMBERSHIP_TIERS = [
  {
    id: "collegiate",
    title: "Collegiate Coach",
    subtitle: "NCAA · NAIA · NJCAA · NCWA",
    icon: Trophy,
    highlight: true,
    description:
      "For coaches leading wrestling programs at the college and university level. Access the full suite of NWCA resources, advocacy tools, and professional development programs designed for the collegiate coaching environment.",
    benefits: [
      "Full access to NWCA coaching resources",
      "Convention registration discounts",
      "CEU credit opportunities",
      "Coaching Development Academy access",
      "NWCA community & networking",
      "Advocacy representation at the national level",
    ],
    productId: "collegiate",
  },
  {
    id: "scholastic",
    title: "Scholastic Coach",
    subtitle: "Middle School · High School",
    icon: BookOpen,
    highlight: false,
    description:
      "Designed for middle and high school wrestling coaches committed to guiding the next generation of athletes. Access exclusive updates, news, and resources tailored to coaching at the scholastic level.",
    benefits: [
      "Scholastic Leadership Academy access",
      "Coaching development resources",
      "Convention discounts",
      "CEU credit opportunities",
      "NWCA community & networking",
      "Health & safety resources",
    ],
    productId: "1a9b9fe0-f9d5-ec11-a7b5-002248042391",
  },
  {
    id: "youth",
    title: "Youth Coach",
    subtitle: "Elementary · Club · Youth Programs",
    icon: Star,
    highlight: false,
    description:
      "Curated for dedicated coaches who lead and mentor elementary and middle school wrestlers in their formative years. Expand your coaching knowledge and positively influence young athletes.",
    benefits: [
      "Youth coaching development resources",
      "NWCA community & networking",
      "Convention discounts",
      "Health & safety resources",
      "Program development tools",
      "Access to NWCA publications",
    ],
    productId: "861f3f76-fad5-ec11-a7b5-002248042391",
  },
  {
    id: "retired",
    title: "Retired Coach",
    subtitle: "Emeritus · Mentor",
    icon: Award,
    highlight: false,
    description:
      "Tailored for seasoned wrestling coaches seeking to stay connected with the sport and contribute to its growth. Stay engaged, share your expertise, and continue making a meaningful impact.",
    benefits: [
      "Stay connected with the wrestling community",
      "Mentorship opportunities",
      "Convention discounts",
      "Access to NWCA publications",
      "NWCA community & networking",
      "Legacy recognition programs",
    ],
    productId: "50088b21-fad5-ec11-a7b5-002248042391",
  },
  {
    id: "officials",
    title: "Referees & Officials",
    subtitle: "All Levels",
    icon: Shield,
    highlight: false,
    description:
      "Wrestling referees and officials will greatly benefit from the resources and tools a NWCA membership offers. Keep up with all the latest news and receive the best opportunities the sport has to offer.",
    benefits: [
      "Rules updates & officiating resources",
      "NWCA community & networking",
      "Convention discounts",
      "Health & safety resources",
      "Access to NWCA publications",
      "Professional development tools",
    ],
    productId: "56898804-bec4-ec11-a7b6-000d3a59128e",
  },
  {
    id: "fan",
    title: "Fan / Parent",
    subtitle: "Supporters · Families",
    icon: Heart,
    highlight: false,
    description:
      "Tailored for passionate wrestling fans and supportive parents who want to stay informed about the sport's future and discover ways to actively participate in the wrestling community.",
    benefits: [
      "Exclusive updates & news",
      "NWCA community access",
      "Convention discounts",
      "Wrestling resources & publications",
      "Ways to get involved",
      "Support the sport you love",
    ],
    productId: "3bc73847-f8d5-ec11-a7b5-002248042391",
  },
];

const MEMBER_BENEFITS = [
  {
    icon: BookOpen,
    title: "Coaching Development",
    desc: "Access to NWCA academies, CEU credits, and professional development programs at every level.",
  },
  {
    icon: Globe,
    title: "National Advocacy",
    desc: "NWCA represents your interests at the NCAA, NFHS, and legislative levels to protect and grow the sport.",
  },
  {
    icon: Users,
    title: "Community & Network",
    desc: "Connect with thousands of coaches nationwide through the NWCA community and annual convention.",
  },
  {
    icon: Trophy,
    title: "Convention Access",
    desc: "Discounted registration to the NWCA Annual Convention — the sport's premier coaching event.",
  },
  {
    icon: Zap,
    title: "Resources & Tools",
    desc: "Health & safety guides, weight management tools, publications, and coaching resources.",
  },
  {
    icon: Shield,
    title: "Student-Wrestler Well-Being",
    desc: "Access to NWCA's health initiatives, skin safety programs, and athlete well-being resources.",
  },
];

const FAQS = [
  {
    q: "How do I purchase a membership?",
    a: "Click any 'Join Now' button on this page to be taken to the NWCA secure membership portal. You'll need to create or log in to your NWCA account to complete the purchase.",
  },
  {
    q: "How long does a membership last?",
    a: "NWCA memberships are annual. You'll receive renewal reminders before your membership expires.",
  },
  {
    q: "Can I renew an existing membership?",
    a: "Yes — log in to your NWCA account at the membership portal to renew. Your member benefits continue uninterrupted upon renewal.",
  },
  {
    q: "What if I coach at multiple levels?",
    a: "Choose the membership tier that best matches your primary coaching role. Contact NWCA at technology@nwca.cc if you have questions about which tier is right for you.",
  },
  {
    q: "Is there a discount for the convention?",
    a: "Yes — all NWCA members receive discounted registration for the NWCA Annual Convention. The discount amount varies by membership tier.",
  },
];

export default function Join() {
  const [, navigate] = useLocation();
  const openCheckout = (flow: "membership" | "renewal", plan?: string) => {
    const query = new URLSearchParams({ flow });
    if (plan) query.set("plan", plan);
    navigate(`/checkout?${query.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white">
      <NavBar solid />

      {/* ── HERO ── */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#17214B] via-[#0A0E1A] to-[#0A0E1A]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C41E3A]/5 rounded-full blur-3xl" />
        <div className="relative container">
          <div className="flex items-center gap-2 mb-6">
            <button onClick={() => navigate("/")} className="font-condensed text-xs tracking-widest uppercase text-[#c8cdd6] hover:text-white transition-colors">Home</button>
            <ChevronRight className="w-3 h-3 text-[#c8cdd6]" />
            <span className="font-condensed text-xs tracking-widest uppercase text-white">Join NWCA</span>
          </div>
          <div className="max-w-3xl">
            <div className="section-label mb-4">Membership</div>
            <h1 className="font-display text-6xl md:text-8xl text-white leading-none mb-6">
              JOIN THE <span className="text-white">NWCA</span>
            </h1>
            <p className="font-body text-[#d0d5de] text-xl leading-relaxed mb-8 max-w-2xl">
              The National Wrestling Coaches Association is the professional organization for wrestling coaches at every level — from youth clubs to the collegiate ranks. Membership gives you access to the resources, community, and advocacy that help you coach better and grow the sport.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => openCheckout("membership")}
                className="inline-flex items-center gap-2 bg-[#C41E3A] text-white font-condensed font-700 text-sm tracking-widest uppercase px-8 py-4 hover:bg-[#a01830] transition-colors"
              >
                Join Now <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => openCheckout("renewal")}
                className="inline-flex items-center gap-2 border border-white/20 text-white font-condensed font-700 text-sm tracking-widest uppercase px-8 py-4 hover:border-[#C41E3A] hover:text-white transition-colors"
              >
                Renew Membership
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="bg-[#C41E3A] py-6">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { num: "98", label: "Years of Excellence" },
            { num: "11,000+", label: "Member Coaches" },
            { num: "6", label: "Membership Types" },
            { num: "1", label: "Voice for Wrestling" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl text-white">{s.num}</div>
              <div className="font-condensed text-xs tracking-widest uppercase text-white/85 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MEMBERSHIP TIERS ── */}
      <section className="py-20 bg-[#0A0E1A]">
        <div className="container">
          <div className="mb-12">
            <div className="section-label mb-3">Choose Your Membership</div>
            <h2 className="font-display text-5xl text-white">
              FIND YOUR <span className="text-white">TIER</span>
            </h2>
            <p className="font-body text-[#c8cdd6] mt-3 max-w-xl">
              Select the membership that matches your role in the sport. All memberships provide access to the NWCA community, resources, and advocacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {MEMBERSHIP_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`relative flex flex-col border transition-all duration-300 hover:shadow-[0_0_40px_rgba(196,30,58,0.15)] ${
                  tier.highlight
                    ? "bg-[#C41E3A] border-[#C41E3A]"
                    : "bg-[#161d2e] border-white/5 hover:border-[#C41E3A]/40"
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-6">
                    <span className="bg-white text-[#C41E3A] font-condensed font-700 text-[10px] tracking-widest uppercase px-3 py-1">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="p-6 flex-1">
                  <div className={`w-12 h-12 flex items-center justify-center mb-4 ${tier.highlight ? "bg-white/20" : "bg-[#C41E3A]/10"}`}>
                    <tier.icon className={`w-6 h-6 ${tier.highlight ? "text-white" : "text-white"}`} />
                  </div>
                  <h3 className={`font-display text-2xl mb-1 ${tier.highlight ? "text-white" : "text-white"}`}>
                    {tier.title}
                  </h3>
                  <p className={`font-condensed text-xs tracking-widest uppercase mb-4 ${tier.highlight ? "text-white/85" : "text-[#c8cdd6]"}`}>
                    {tier.subtitle}
                  </p>
                  <p className={`font-body text-sm leading-relaxed mb-6 ${tier.highlight ? "text-white/80" : "text-[#c8cdd6]"}`}>
                    {tier.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {tier.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${tier.highlight ? "text-white" : "text-white"}`} />
                        <span className={`font-body text-sm ${tier.highlight ? "text-white/80" : "text-[#c8cdd6]"}`}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 pt-0">
                  <button
                    onClick={() => openCheckout("membership", tier.id)}
                    className={`w-full inline-flex items-center justify-center gap-2 font-condensed font-700 text-sm tracking-widest uppercase px-6 py-3 transition-colors ${
                      tier.highlight
                        ? "bg-white text-[#C41E3A] hover:bg-white/90"
                        : "bg-[#C41E3A] text-white hover:bg-[#a01830]"
                    }`}
                  >
                    Join Now <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEMBER BENEFITS ── */}
      <section className="py-20 bg-[#1c2333]">
        <div className="container">
          <div className="mb-12">
            <div className="section-label mb-3">Why Join</div>
            <h2 className="font-display text-5xl text-white">
              MEMBER <span className="text-white">BENEFITS</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {MEMBER_BENEFITS.map((b) => (
              <div key={b.title} className="bg-[#161d2e] border border-white/5 p-6 hover:border-white/20 transition-all">
                <div className="w-10 h-10 bg-[#C41E3A]/10 flex items-center justify-center mb-4">
                  <b.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-condensed font-700 text-base text-white mb-2">{b.title}</h3>
                <p className="font-body text-sm text-[#c8cdd6] leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-[#0A0E1A]">
        <div className="container max-w-3xl">
          <div className="mb-12">
            <div className="section-label mb-3">Questions</div>
            <h2 className="font-display text-5xl text-white">
              MEMBERSHIP <span className="text-white">FAQ</span>
            </h2>
          </div>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-white/10 p-6 hover:border-white/20 transition-all">
                <h3 className="font-condensed font-700 text-base text-white mb-2">{faq.q}</h3>
                <p className="font-body text-sm text-[#c8cdd6] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 p-6 bg-[#17214B] border border-white/10">
            <p className="font-body text-sm text-[#c8cdd6]">
              Have more questions? Contact the NWCA membership team at{" "}
              <a href="mailto:technology@nwca.cc" className="text-white hover:underline">
                technology@nwca.cc
              </a>{" "}
              or call <a href="tel:7176538009" className="text-white hover:underline">717-653-8009</a>.
            </p>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-20 bg-[#C41E3A]">
        <div className="container text-center">
          <h2 className="font-display text-5xl md:text-6xl text-white mb-4">
            READY TO <span className="text-[#17214B]">JOIN?</span>
          </h2>
          <p className="font-body text-white/80 text-lg max-w-xl mx-auto mb-8">
            Become part of the national community of wrestling coaches. Your membership supports the sport at every level.
          </p>
          <button
            onClick={() => openCheckout("membership")}
            className="inline-flex items-center gap-2 bg-white text-[#C41E3A] font-condensed font-700 text-sm tracking-widest uppercase px-10 py-4 hover:bg-white/90 transition-colors"
          >
            Join the NWCA Today <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
