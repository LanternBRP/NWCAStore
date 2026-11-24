/**
 * NavBar — NWCA Global Navigation (Revised per client feedback June 2026)
 *
 * Single row layout:
 *   Logo (left) | About | Coaching Development | Calendar | Rankings | Division Sites | Where to Wrestle
 *   Far right: Join | Shop | Donate | Search
 *
 * No secondary row. No cart icon. No marketing scroll.
 */

import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "wouter";
import { ChevronDown, Menu, X, Search } from "lucide-react";
import { toast } from "sonner";

const LOGO = "/manus-storage/NWCALogo_7f28c347.png";

interface SubItem {
  label: string;
  url?: string;
}
interface SubGroup {
  heading: string;
  items: SubItem[];
}
interface NavItem {
  label: string;
  items: SubItem[];
  groups?: SubGroup[];
  url?: string;
}

// ── Primary nav items (left of utilities) ─────────────────────────────────
const PRIMARY_NAV: NavItem[] = [
  {
    label: "About",
    url: "/about",
    items: [
      { label: "About the NWCA", url: "/about#about-nwca" },
      { label: "NWCA Staff", url: "/about#staff" },
      { label: "Past Presidents", url: "/about#past-presidents" },
      { label: "NWCA Board of Directors", url: "/about#board" },
      { label: "Fundraising Disclosure", url: "/about#fundraising" },
    ],
  },
  {
    label: "Coaching Development",
    items: [
      { label: "Scholastic Coaches", url: "/coaching/scholastic" },
      { label: "Collegiate Coaches", url: "/coaching/collegiate" },
      { label: "Earn CEU Credits", url: "/coaching/ceu" },
      { label: "Coaching Courses & Resources", url: "/coaching/resources" },
    ],
  },
  {
    label: "Calendar",
    url: "/events",
    items: [
      { label: "NWCA Convention", url: "/events#convention-2026" },
      { label: "All-Star Classic", url: "/events#asc-2026" },
      { label: "National Duals", url: "/events#national-duals-2027" },
    ],
  },
  {
    label: "Rankings",
    url: "/rankings",
    items: [
      { label: "NCAA D1 Men", url: "/rankings" },
      { label: "NCAA D2 Men", url: "/rankings" },
      { label: "NCAA D3 Men", url: "/rankings" },
      { label: "NCAA Women", url: "/rankings" },
      { label: "NAIA Men", url: "/rankings" },
      { label: "NAIA Women", url: "/rankings" },
      { label: "NJCAA Men", url: "/rankings" },
      { label: "NJCAA Women", url: "/rankings" },
    ],
  },
  {
    label: "Division Sites",
    items: [],
    groups: [
      {
        heading: "Men's Divisions",
        items: [
          { label: "NCAA D1 Men", url: "/divisions/ncaa-d1-men" },
          { label: "NCAA D2 Men", url: "/divisions/ncaa-d2-men" },
          { label: "NCAA D3 Men", url: "/divisions/ncaa-d3-men" },
          { label: "NAIA Men", url: "/divisions/naia-men" },
          { label: "NJCAA Men", url: "/divisions/njcaa-men" },
          { label: "NCWA Men", url: "/divisions/ncwa-men" },
          { label: "CCCAA Men", url: "/divisions/cccaa-men" },
        ],
      },
      {
        heading: "Women's Divisions",
        items: [
          { label: "NCAA Women", url: "/divisions/ncaa-women" },
          { label: "NAIA Women", url: "/divisions/naia-women" },
          { label: "NJCAA Women", url: "/divisions/njcaa-women" },
          { label: "NCWA Women", url: "/divisions/ncwa-women" },
          { label: "CCCAA Women", url: "/divisions/cccaa-women" },
        ],
      },
    ],
  },
  {
    label: "Where to Wrestle",
    url: "/grow/where-to-wrestle",
    items: [
      { label: "Find a Collegiate Program", url: "/grow/where-to-wrestle" },
      { label: "Start a Program", url: "/grow/start-a-program" },
      { label: "Grow the Sport", url: "/grow/state-map" },
    ],
  },
];

interface NavBarProps {
  solid?: boolean;
}

export default function NavBar({ solid = false }: NavBarProps) {
  const [location, navigate] = useLocation();
  const [scrolled, setScrolled] = useState(solid);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const handleComingSoon = () =>
    toast.info("Feature coming soon", { description: "We're building this into the platform." });

  useEffect(() => {
    if (solid) return;
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  useEffect(() => {
    const onOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const handleNavClick = (url: string) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    if (url.includes("#") && url.startsWith("/")) {
      const [path, hash] = url.split("#");
      if (location === path) {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(path);
        setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" }), 350);
      }
    } else if (url.startsWith("/")) {
      navigate(url);
    } else if (url.startsWith("#")) {
      if (location === "/") {
        document.querySelector(url)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => document.querySelector(url)?.scrollIntoView({ behavior: "smooth" }), 300);
      }
    } else {
      window.open(url, "_blank", "noreferrer");
    }
  };

  const toggleDropdown = (label: string) =>
    setActiveDropdown((prev) => (prev === label ? null : label));

  // ── Dropdown nav button ────────────────────────────────────────────────
  const NavBtn = ({ item, align = "left" }: { item: NavItem; align?: "left" | "right" }) => {
    const isActive =
      item.url && item.url.startsWith("/") && !item.url.includes("#") && location === item.url;
    const isOpen = activeDropdown === item.label;

    return (
      <div className="relative">
        <button
          className={`flex items-center gap-1 py-1 font-condensed font-700 text-[15px] tracking-widest uppercase transition-colors whitespace-nowrap ${
            isActive ? "text-white" : "text-white hover:text-[#F5C842]"
          }`}
          onClick={() => {
            if (item.items?.length || item.groups?.length) {
              toggleDropdown(item.label);
            } else if (item.url) {
              handleNavClick(item.url);
            }
          }}
        >
          {item.label}
          {(item.items?.length > 0 || (item.groups?.length ?? 0) > 0) && (
            <ChevronDown className={`w-3 h-3 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          )}
        </button>

        {isOpen && (
          <div
            className={`absolute top-full mt-1 bg-white border border-[#17214B]/10 shadow-2xl z-[60] py-2 ${
              align === "right" ? "right-0" : "left-0"
            } ${
              item.groups ? "w-[480px]" : "w-60"
            }`}
          >
            {item.groups ? (
              // Two-column mega-dropdown for grouped items (Division Sites)
              <div className="grid grid-cols-2 gap-0">
                {item.groups.map((group) => (
                  <div key={group.heading}>
                    <div className="px-4 py-2 font-condensed font-700 text-[11px] tracking-widest uppercase text-[#17214B] border-b border-[#17214B]/10">
                      {group.heading}
                    </div>
                    {group.items.map((sub) => (
                      <button
                        key={sub.label}
                        onClick={() => {
                          if (sub.url) {
                            if (sub.url.startsWith("/")) {
                              handleNavClick(sub.url);
                            } else {
                              window.open(sub.url, "_blank", "noreferrer");
                            }
                            setActiveDropdown(null);
                          } else {
                            handleComingSoon();
                            setActiveDropdown(null);
                          }
                        }}
                        className="w-full text-left block px-4 py-2 font-condensed font-600 text-sm tracking-wide text-[#17214B] hover:text-[#F5C842] hover:bg-[#C41E3A]/8 hover:pl-5 transition-all border-b border-[#17214B]/5 last:border-0"
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              // Standard single-column dropdown
              <>
                {item.url && item.url.startsWith("/") && !item.url.includes("#") && (
                  <button
                    onClick={() => handleNavClick(item.url!)}
                    className="w-full text-left block px-4 py-2.5 font-condensed font-700 text-sm tracking-wide text-[#C41E3A] hover:bg-[#17214B]/8 hover:pl-5 transition-all border-b border-[#17214B]/10"
                  >
                    → View All {item.label}
                  </button>
                )}
                {item.items.map((sub) => (
                  <button
                    key={sub.label}
                    onClick={() => {
                      if (sub.url) {
                        if (sub.url.startsWith("/") || sub.url.includes("#")) {
                          handleNavClick(sub.url);
                        } else {
                          window.open(sub.url, "_blank", "noreferrer");
                          setActiveDropdown(null);
                        }
                      } else {
                        handleComingSoon();
                        setActiveDropdown(null);
                      }
                    }}
                    className="w-full text-left block px-4 py-2.5 font-condensed font-600 text-sm tracking-wide text-[#17214B] hover:text-[#F5C842] hover:bg-[#C41E3A]/8 hover:pl-5 transition-all"
                  >
                    {sub.label}
                  </button>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Spacer — single-row nav */}
      <div className="h-[88px]" />

      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[55] transition-all duration-300 ${
          scrolled || solid
            ? "bg-[#1c2333]/97 backdrop-blur-xl shadow-md"
            : "bg-[#1c2333]/92 backdrop-blur-lg"
        }`}
      >
        {/* ── Red top accent line ── */}
        <div className="h-[4px] bg-[#C41E3A]" />

        {/* ══════════════════════════════════════════════════════════════
            SINGLE ROW — Logo left | Nav items | Join/Shop/Donate/Search right
        ══════════════════════════════════════════════════════════════ */}
        <div className="max-w-[1400px] mx-auto px-6">
          <div className={`hidden lg:flex items-center gap-6 transition-all duration-300 ${scrolled ? "h-[68px]" : "h-[84px]"}`}>

            {/* ── Logo ── */}
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); handleNavClick("/"); }}
              className="flex items-center flex-shrink-0 mr-4"
            >
              <img
                src={LOGO}
                alt="NWCA"
                className={`w-auto drop-shadow-lg transition-all duration-300 ${scrolled ? "h-16" : "h-20"}`}
              />
            </a>

            {/* ── Primary nav items ── */}
            <div className="flex items-center gap-5 flex-1">
              {PRIMARY_NAV.map((item) => (
                <NavBtn key={item.label} item={item} align="left" />
              ))}
            </div>

            {/* ── Far-right utilities: Join | Shop | Donate | Search ── */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <a
                href="/join"
                className="font-condensed font-700 text-[13px] tracking-widest uppercase px-4 py-2 bg-[#C41E3A] text-white hover:bg-[#a01830] transition-colors whitespace-nowrap"
              >
                Join
              </a>
              <a
                href="/shop"
                onClick={(e) => { e.preventDefault(); handleNavClick("/shop"); }}
                className="font-condensed font-700 text-[13px] tracking-widest uppercase px-4 py-2 border border-white/20 text-white hover:border-[#C41E3A] hover:text-[#F5C842] transition-colors whitespace-nowrap"
              >
                Shop
              </a>
              <a
                href="/donate"
                onClick={(e) => { e.preventDefault(); handleNavClick("/donate"); }}
                className="font-condensed font-700 text-[13px] tracking-widest uppercase px-4 py-2 border border-white/20 text-white hover:border-[#C41E3A] hover:text-[#F5C842] transition-colors whitespace-nowrap"
              >
                Donate
              </a>
              <button
                onClick={handleComingSoon}
                className="flex items-center justify-center w-8 h-8 text-white/80 hover:text-[#F5C842] transition-colors ml-1"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ── Mobile row ── */}
          <div className="lg:hidden flex items-center justify-between h-[72px]">
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); handleNavClick("/"); }}
              className="flex items-center"
            >
              <img src={LOGO} alt="NWCA" className="h-14 w-auto" />
            </a>
            <button
              className="flex items-center justify-center w-10 h-10 text-white/85 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            Mobile menu
        ══════════════════════════════════════════════════════════════ */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#1a2236] border-t border-white/10 max-h-[80vh] overflow-y-auto">
            {PRIMARY_NAV.map((item) => (
              <div key={item.label} className="border-b border-white/5">
                <button
                  className="w-full flex items-center justify-between px-4 py-3 font-condensed font-700 text-sm tracking-widest uppercase text-[#d0d5de] hover:text-white transition-colors"
                  onClick={() => {
                    if ((item.items?.length > 0 || item.groups?.length)) {
                      toggleDropdown(item.label);
                    } else if (item.url) {
                      handleNavClick(item.url);
                    }
                  }}
                >
                  {item.label}
                  {(item.items?.length > 0 || item.groups?.length) && (
                    <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.label ? "rotate-180" : ""}`} />
                  )}
                </button>
                {activeDropdown === item.label && (
                  <div className="pb-2">
                    {item.groups ? (
                      // Grouped mobile layout (Division Sites)
                      item.groups.map((group) => (
                        <div key={group.heading}>
                          <div className="px-6 pt-3 pb-1 font-condensed font-700 text-[10px] tracking-widest uppercase text-[#F5C842]">
                            {group.heading}
                          </div>
                          {group.items.map((sub) => (
                            <button
                              key={sub.label}
                              onClick={() => {
                                if (sub.url) {
                                  window.open(sub.url, "_blank", "noreferrer");
                                  setMobileMenuOpen(false);
                                } else {
                                  handleComingSoon();
                                  setMobileMenuOpen(false);
                                }
                              }}
                              className="w-full text-left block px-8 py-2 font-body text-sm text-[#c8cdd6] hover:text-white"
                            >
                              {sub.label}
                            </button>
                          ))}
                        </div>
                      ))
                    ) : (
                      // Standard flat list
                      item.items.map((sub) => (
                        <button
                          key={sub.label}
                          onClick={() => {
                            if (sub.url) {
                              if (sub.url.startsWith("/") || sub.url.includes("#")) {
                                handleNavClick(sub.url);
                              } else {
                                window.open(sub.url, "_blank", "noreferrer");
                                setMobileMenuOpen(false);
                              }
                            } else {
                              handleComingSoon();
                              setMobileMenuOpen(false);
                            }
                          }}
                          className="w-full text-left block px-6 py-2 font-body text-sm text-[#c8cdd6] hover:text-white"
                        >
                          {sub.label}
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))}
            <div className="p-4 flex flex-col gap-2">
              <a
                href="/join"
                className="block w-full text-center font-condensed font-700 text-xs tracking-widest uppercase px-4 py-3 bg-[#C41E3A] text-white hover:bg-[#a01830] transition-colors"
              >
                Join the NWCA
              </a>
              <a
                href="/shop"
                onClick={(e) => { e.preventDefault(); handleNavClick("/shop"); }}
                className="block w-full text-center font-condensed font-700 text-xs tracking-widest uppercase px-4 py-3 border border-white/20 text-white hover:border-[#C41E3A] transition-colors"
              >
                Shop
              </a>
              <a
                href="/donate"
                onClick={(e) => { e.preventDefault(); handleNavClick("/donate"); }}
                className="block w-full text-center font-condensed font-700 text-xs tracking-widest uppercase px-4 py-3 border border-white/20 text-white hover:border-[#C41E3A] transition-colors"
              >
                Donate
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
