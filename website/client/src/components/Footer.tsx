/**
 * Footer — NWCA shared footer component
 * Design: Kinetic Wrestling Identity — dark arena aesthetic
 * Colors: Arena Black #060810 / Mid Navy #222b3d / Championship Red #C41E3A
 *
 * All links are wired to their proper destinations:
 *   - Internal routes  → wouter navigate()
 *   - External URLs    → target="_blank" rel="noreferrer"
 *   - Not-yet-built    → coming-soon toast (href=null)
 */

import { useLocation } from "wouter";
import { toast } from "sonner";

const LOGO = "/manus-storage/NWCALogo_7f28c347.png";

type FooterLink = {
  label: string;
  href: string | null;  // null = coming-soon toast
  external?: boolean;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Coaching",
    links: [
      { label: "Scholastic Leadership Academy", href: "https://nwcaonline.com/sports/2023/4/3/coaching-development-for-scholastic-coaches.aspx", external: true },
      { label: "Collegiate Leadership Academy", href: "https://nwcaonline.com/sports/2023/3/24/coaching-development-for-collegiate-coaches.aspx", external: true },
      { label: "CEU Credits",                   href: "https://nwcaonline.com/sports/2023/4/3/earn-ceu-credit.aspx", external: true },
      { label: "Courses Directory",             href: "https://nwcaonline.com/sports/2023/4/3/Coaching-Courses-and-Resources-Directory.aspx", external: true },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Rankings",       href: "/rankings" },
      { label: "Career Center",  href: "https://www.nwcaonline.com/career-center/", external: true },
      { label: "Annual Reports", href: "https://nwcaonline.com/sports/2023/3/23/nwca-financial-reports.aspx", external: true },
      { label: "Health & Safety", href: "https://www.nwcaonline.com/health-safety/", external: true },
      { label: "Grow the Sport", href: "/#grow-the-sport" },
    ],
  },
  {
    title: "Organization",
    links: [
      { label: "About NWCA",  href: "/about" },
      { label: "Membership",  href: "/join" },
      { label: "Convention",  href: "http://www.nwcaconvention.com", external: true },
      { label: "WIBN",        href: "https://www.wrestlersinbusiness.org", external: true },
      { label: "Contact Us",  href: "mailto:technology@nwca.cc" },
    ],
  },
];

// Annual reports scraped from nwcaonline.com/sports/2023/3/23/nwca-financial-reports.aspx
const ANNUAL_REPORTS = [
  { year: "2025", href: "https://nwcaonline.com/documents/2026/6/1/NWCA_Annual_Report_2025_-_v4.pdf" },
  { year: "2024", href: "https://nwcaonline.com/documents/2025/7/7/Annual_Report_2023-24.pdf" },
  { year: "2023", href: "https://nwcaonline.com/documents/2025/7/7/Annual_Report_2022-23.pdf" },
  { year: "2022", href: "https://nwcaonline.com/documents/2025/7/7/Annual_Report_2021-22.pdf" },
  { year: "2021", href: "https://nwcaonline.com/documents/2023/3/23/21_NWCA_AnnualReport.pdf" },
  { year: "2020", href: "https://nwcaonline.com/documents/2023/3/23/20_NWCA_AnnualReport.pdf" },
  { year: "2019", href: "https://nwcaonline.com/documents/2023/3/23/19_NWCA_AnnualReport.pdf" },
  { year: "2018", href: "https://nwcaonline.com/documents/2023/3/23/18_NWCA_AnnualReport.pdf" },
  { year: "2017", href: "https://nwcaonline.com/documents/2023/3/23/17_NWCA_AnnualReport.pdf" },
  { year: "2016", href: "https://nwcaonline.com/documents/2023/3/23/16_NWCA_AnnualReport.pdf" },
];

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/NWCAWrestling",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: "X / Twitter",
    url: "https://twitter.com/NWCAWrestling",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/nwcawrestling",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@NWCAWrestling",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [, navigate] = useLocation();

  const handleComingSoon = () =>
    toast.info("Feature coming soon", {
      description: "We're building this into the platform.",
    });

  const handleInternalLink = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (href.startsWith("/#")) {
      navigate("/");
      setTimeout(() => {
        const id = href.replace("/#", "");
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else if (href.includes("#")) {
      const [path, hash] = href.split("#");
      navigate(path || "/");
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      navigate(href);
    }
  };

  return (
    <footer className="bg-[#060810] border-t border-white/5 pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); navigate("/"); }}
              className="inline-block mb-5"
            >
              <img
                src={LOGO}
                alt="NWCA"
                className="h-24 w-auto"
                style={{ filter: "drop-shadow(0 0 8px rgba(196,30,58,0.3))" }}
              />
            </a>
            <p className="font-body text-sm text-[#c8cdd6] leading-relaxed max-w-xs mb-6">
              The National Wrestling Coaches Association — serving coaches, growing
              the sport, and advancing wrestling at every level since 1928.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.name}
                  className="w-8 h-8 bg-[#222b3d] border border-white/10 flex items-center justify-center text-[#c8cdd6] hover:text-white hover:border-[#C41E3A]/50 hover:bg-[#C41E3A]/10 transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <div className="font-condensed font-700 text-xs tracking-widest uppercase text-white mb-4">
                {col.title}
              </div>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.href === null ? (
                      <button
                        onClick={handleComingSoon}
                        className="font-body text-sm text-[#c8cdd6] hover:text-white transition-colors text-left"
                      >
                        {link.label}
                      </button>
                    ) : link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="font-body text-sm text-[#c8cdd6] hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : link.href.startsWith("mailto:") ? (
                      <a
                        href={link.href}
                        className="font-body text-sm text-[#c8cdd6] hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e) => handleInternalLink(link.href!, e)}
                        className="font-body text-sm text-[#c8cdd6] hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Annual Reports strip */}
        <div className="bg-[#0d1220] border border-white/5 p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="font-condensed font-700 text-xs tracking-widest uppercase text-white whitespace-nowrap flex-shrink-0">
              Annual Reports
            </div>
            <div className="flex flex-wrap gap-2">
              {ANNUAL_REPORTS.map((r) => (
                <a
                  key={r.year}
                  href={r.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono-data text-xs text-[#c8cdd6] border border-white/10 px-3 py-1 hover:border-[#C41E3A]/50 hover:text-white hover:bg-[#C41E3A]/10 transition-all"
                >
                  {r.year}
                </a>
              ))}
              <a
                href="https://nwcaonline.com/sports/2023/3/23/nwca-financial-reports.aspx"
                target="_blank"
                rel="noreferrer"
                className="font-condensed font-700 text-xs tracking-widest uppercase text-[#F5C842] border border-[#F5C842]/30 px-3 py-1 hover:bg-[#F5C842]/10 transition-all"
              >
                All Reports →
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-[#222b3d] border border-white/5 p-6 mb-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="font-display text-2xl text-white">STAY IN THE CIRCLE</div>
              <div className="font-body text-sm text-[#c8cdd6] mt-1">
                News, rankings, events, and coaching resources — direct to your inbox.
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                id="newsletter-email"
                placeholder="your@email.com"
                className="bg-[#1c2333] border border-white/10 text-white font-body text-sm px-4 py-2.5 flex-1 md:w-64 focus:outline-none focus:border-[#C41E3A]/50"
              />
              <button
                onClick={() => {
                  const emailEl = document.getElementById('newsletter-email') as HTMLInputElement;
                  const email = emailEl?.value?.trim();
                  if (email) {
                    window.location.href = `mailto:technology@nwca.cc?subject=Newsletter%20Subscription&body=Please%20add%20${encodeURIComponent(email)}%20to%20the%20NWCA%20newsletter.`;
                  } else {
                    emailEl?.focus();
                  }
                }}
                className="btn-primary text-xs py-2.5 px-5 whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
          <div className="font-body text-xs text-[#c8cdd6]">
            © 2026 National Wrestling Coaches Association. Founded 1928. All rights reserved.
          </div>
          <div className="flex items-center gap-1 font-body text-xs text-[#c8cdd6]">
            <span>Call: 717-653-8009</span>
            <span className="mx-2">·</span>
            <a href="mailto:technology@nwca.cc" className="hover:text-white transition-colors">
              technology@nwca.cc
            </a>
          </div>
          <div className="flex gap-4">
            <a
              href="https://nwcaonline.com/sports/2025/6/12/privacy-policy.aspx"
              target="_blank"
              rel="noreferrer"
              className="font-body text-xs text-[#c8cdd6] hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="https://nwcaonline.com/sports/2025/6/12/terms-of-use.aspx"
              target="_blank"
              rel="noreferrer"
              className="font-body text-xs text-[#c8cdd6] hover:text-white transition-colors"
            >
              Terms of Use
            </a>
            <a
              href="mailto:technology@nwca.cc?subject=Accessibility%20Inquiry"
              className="font-body text-xs text-[#c8cdd6] hover:text-white transition-colors"
            >
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
