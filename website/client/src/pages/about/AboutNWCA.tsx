/**
 * About the NWCA — Unified single page with 5 anchor sections
 * Design: Dark navy (#0d1117) base, red (#C41E3A) accents, condensed display typography
 *
 * Sections (each has an id for anchor navigation from the nav dropdown):
 *   #about-nwca      — About the NWCA (mission, vision, core competencies)
 *   #staff           — NWCA Staff directory
 *   #past-presidents — Past Presidents table (1933–present)
 *   #fundraising     — Fundraising Disclosure & Annual Reports
 *   #board           — Board of Directors table
 */

import { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Users, Target, TrendingUp, Heart, FileText, Download, ExternalLink, Phone, Mail } from "lucide-react";

// ── Staff Data ─────────────────────────────────────────────────────────────
const NWCA_STAFF = [
  { name: "Mike Moyer", title: "Executive Director / Chief of Staff", email: "mmoyer@nwca.cc", phone: "(717) 330-2123", ext: "102" },
  { name: "Clay Gable", title: "Chief Operating Officer", email: "cgable@nwca.cc" },
  { name: "Jackie Paquette", title: "Deputy Director / Girls & Women's Partnership Manager", email: "jpaquette@nwca.cc", phone: "(708) 642-0767", ext: "103" },
  { name: "Stephanie Berkheiser", title: "Office Manager", email: "sberkheiser@nwca.cc", phone: "(717) 330-4042", ext: "104" },
  { name: "Dan Weaver", title: "Director of External Operations", email: "dweaver@nwca.cc", phone: "(610) 781-0014", ext: "110" },
  { name: "Jim Beichner", title: "Director of Coaching Development", email: "jbeichner@nwca.cc", phone: "(716) 289-2855" },
  { name: "Danielle Deck", title: "Administrative Assistant", email: "ddeck@nwca.cc", phone: "(717) 824-0194", ext: "108" },
];

const NWCA_CONTRACTORS = [
  { name: "Nate Naasz", title: "Director of Communication & Marketing; State Chairman Coordinator", email: "nnaasz@nwca.cc", phone: "(785) 531-1966" },
  { name: "Dave Kemmy", title: "Collegiate Coaching Education & Program Coordinator", email: "dkemmy@nwca.cc", phone: "(401) 480-2066" },
  { name: "Jim Fallis", title: "Collegiate Leadership Group Facilitator", email: "jfallis@nwca.cc", phone: "(928) 856-0949" },
  { name: "Tom Fallis", title: "WIBN Chapter Coordinator", email: "tfallis@nwca.cc", phone: "(970) 301-9292" },
];

const WIBN_STAFF = [
  { name: "Scotti Sentes", title: "WIBN Executive Director", email: "ssentes@wrestlersinbusiness.org", phone: "(910) 985-0818", ext: "106" },
  { name: "Tom Fallis", title: "WIBN Chapter Coordinator", email: "tfallis@nwca.cc", phone: "(970) 301-9292" },
];

// Legacy alias so existing JSX still compiles
const STAFF = NWCA_STAFF;

// ── Past Presidents Data ───────────────────────────────────────────────────
const PRESIDENTS = [
  { years: "1933", name: "E.C. Gallagher", institution: "Oklahoma A&M" },
  { years: "1934–36", name: "William Sheridan", institution: "Lehigh" },
  { years: "1937", name: "Paul V. Keen", institution: "University of Oklahoma" },
  { years: "1938", name: "Charles Speidel", institution: "Penn State" },
  { years: "1939", name: "B.R. Patterson", institution: "Kansas State" },
  { years: "1940", name: "C.W. Mayser", institution: "Franklin & Marshall" },
  { years: "1941", name: "H.E. Kenney", institution: "University of Illinois" },
  { years: "1942", name: "James Reed", institution: "Princeton" },
  { years: "1943–46", name: "Fendley Collins", institution: "Michigan State" },
  { years: "1947", name: "Art Griffith", institution: "Oklahoma A&M" },
  { years: "1948", name: "H.E. Kenney", institution: "University of Illinois" },
  { years: "1949", name: "William Sheridan", institution: "Lehigh" },
  { years: "1950", name: "Julius F. Wagner", institution: "Colorado A&M" },
  { years: "1951", name: "Dave H. McCuskey", institution: "Iowa State Teachers College" },
  { years: "1952", name: "David C. Bartelma", institution: "University of Minnesota" },
  { years: "1953", name: "Claude Sharer", institution: "Case Technical College" },
  { years: "1954", name: "Ray Sparks", institution: "Springfield College" },
  { years: "1955", name: "Clifford Keen", institution: "University of Michigan" },
  { years: "1956", name: "Arnold Umbach", institution: "Auburn" },
  { years: "1957", name: "Charles Speidel", institution: "Penn State" },
  { years: "1958", name: "Ray Jenkins", institution: "University of Colorado" },
  { years: "1959", name: "Frank Finger", institution: "University of Virginia" },
  { years: "1960", name: "Harold Nichols", institution: "Iowa State" },
  { years: "1961", name: "John Hancock", institution: "Colorado State" },
  { years: "1962", name: "Robert Pickett", institution: "Harvard" },
  { years: "1963", name: "Wally Johnson", institution: "University of Minnesota" },
  { years: "1964", name: "Fritz Knorr", institution: "Kansas State" },
  { years: "1965", name: "Sam Barnes", institution: "University of North Carolina" },
  { years: "1966", name: "Dick Voliv", institution: "Rutgers" },
  { years: "1967", name: "Marv Hess", institution: "University of Utah" },
  { years: "1968", name: "Jim Wilkinson", institution: "Southern Illinois" },
  { years: "1969", name: "LeRoy Alitz", institution: "U.S. Military Academy" },
  { years: "1970", name: "Karl Kitt", institution: "U.S. Air Force Academy" },
  { years: "1971", name: "Grady Peninger", institution: "Michigan State" },
  { years: "1972", name: "Ed Peery", institution: "U.S. Naval Academy" },
  { years: "1973", name: "Fred Davis", institution: "Brigham Young University" },
  { years: "1974", name: "Bill Schmitt", institution: "Granite City HS, Ill." },
  { years: "1975", name: "John Johnston", institution: "Princeton" },
  { years: "1976", name: "Bill Nelson", institution: "University of Arizona" },
  { years: "1977", name: "Romito Macias", institution: "Mankato State University" },
  { years: "1978", name: "Clyde Whitman", institution: "East Stroudsburg State" },
  { years: "1979", name: "Bill Martell", institution: "University of California – Berkeley" },
  { years: "1980", name: "Chris Ford", institution: "Ohio State" },
  { years: "1981", name: "Gerald Leeman", institution: "Lehigh" },
  { years: "1982", name: "Bob Ericson", institution: "Diablo Valley JC, CA" },
  { years: "1983", name: "Charles Patton", institution: "North Iowa State" },
  { years: "1984–85", name: "Bob Carlson", institution: "Utah State" },
  { years: "1986–87", name: "Jim Howard", institution: "Oswego State" },
  { years: "1988–89", name: "Don Briggs", institution: "University of North Iowa" },
  { years: "1990–91", name: "Roger Sanders", institution: "Bloomsburg State College" },
  { years: "1992–93", name: "Jack Childs", institution: "Drexel University" },
  { years: "1994–96", name: "T.J. Kerr", institution: "Cal. State Bakersfield" },
  { years: "1997–99", name: "Rande Stottlemyer", institution: "University of Pittsburgh" },
  { years: "2000–02", name: "Roger Reina", institution: "University of Pennsylvania" },
  { years: "2002–04", name: "Jack Maughan", institution: "University of Northern Colorado" },
  { years: "2004–06", name: "Ron Beaschler", institution: "Ohio Northern University" },
  { years: "2006–08", name: "Ron Mirikitani", institution: "St. Louis – Meremec" },
  { years: "2008–10", name: "Jim Beichner", institution: "University of Buffalo" },
  { years: "2010–12", name: "Brian Smith", institution: "University of Missouri" },
  { years: "2012–14", name: "Rob Koll", institution: "Cornell" },
  { years: "2014–16", name: "Mark Cody", institution: "University of Oklahoma" },
  { years: "2016–18", name: "Tom Ryan", institution: "Ohio State" },
  { years: "2018–20", name: "Pat Popolizio", institution: "NC State" },
  { years: "2020–22", name: "Kevin Ward", institution: "Army–West Point" },
  { years: "2022–24", name: "Tony Ersland", institution: "Purdue University" },
  { years: "2024–26", name: "Troy Nickerson", institution: "University of Northern Colorado", current: true },
];

// ── Annual Reports Data ────────────────────────────────────────────────────
const REPORTS = [
  { year: "2021–22", label: "Annual Report 2021–22", url: "https://nwcaonline.com/documents/2025/7/7/Annual_Report_2021-22.pdf" },
  { year: "2020–21", label: "Annual Report 2020–21", url: "https://nwcaonline.com" },
  { year: "2019–20", label: "Annual Report 2019–20", url: "https://nwcaonline.com" },
];

// ── Board of Directors Data ────────────────────────────────────────────────
const BOARD_MEMBERS = [
  { id: "01", first: "Mark", last: "Bedics", email: "mbedics@ncaa.org", org: "National Collegiate Athletic Association", position: "Affiliate Organizations" },
  { id: "02", first: "Rich", last: "Bender", email: "rbender@usawrestling.org", org: "USA Wrestling", position: "Affiliate Organizations" },
  { id: "03", first: "Jason", last: "Bryant", email: "jason@bryantwrestling.com", org: "National Wrestling Media Association", position: "Affiliate Organizations" },
  { id: "04", first: "John", last: "Clark", email: "clarkj4@sacredheart.edu", org: "Sacred Heart University", position: "Divisional Representative – NCAA D1 Men" },
  { id: "05", first: "Cliff", last: "Cushard", email: "ccushard@adrian.edu", org: "Adrian College", position: "Divisional Representative – NCAA Women" },
  { id: "06", first: "Marcel", last: "de Bary Gagnon", email: "marcel@tasaconsulting.com", org: "Wrestlers in Business Network", position: "At-Large" },
  { id: "07", first: "Marques", last: "Gales", email: "galesm@scc.losrios.edu", org: "Sacramento City College", position: "Divisional Representative – 3C2A Men" },
  { id: "08", first: "Joe", last: "Geiger", email: "jgeiger528@aol.com", org: "National Wrestling Coaches Association", position: "Secretary" },
  { id: "09", first: "Erin", last: "Gerlich", email: "erin@ighsau.org", org: "Iowa State Girls Athletic Union", position: "Scholastic Girls Wrestling" },
  { id: "10", first: "Jim", last: "Giunta", email: "jim@ncwa.net", org: "National Collegiate Wrestling Association", position: "Affiliate Organizations" },
  { id: "11", first: "Dennis", last: "Hackworth", email: "dhackworth@rasorealty.com", org: "Wrestlers in Business Network", position: "At-Large" },
  { id: "12", first: "Mark", last: "Harris", email: "mark.harris@bcsemail.org", org: "Enka HS (NC)", position: "Scholastic Section 3&4" },
  { id: "13", first: "Mark", last: "Hawald", email: "mhawald@jcu.edu", org: "John Carroll University", position: "Divisional Representative – NCAA D3 Men" },
  { id: "14", first: "Elliot", last: "Hopkins", email: "ehopkins@nfhs.org", org: "National Federation of High School", position: "Affiliate Organizations" },
  { id: "15", first: "Jake", last: "Hunter", email: "jthunter600@gmail.com", org: "Wrestlers in Business Network", position: "At-Large" },
  { id: "16", first: "Dustin", last: "Kirk", email: "dkirk@cerritos.edu", org: "Cerritos College", position: "Divisional Representative – 3C2A Women" },
  { id: "17", first: "Mike", last: "McCormick", email: "mike.mccormick@caring4kids.com", org: "National Wrestling Officials Association", position: "Affiliate Organizations" },
  { id: "18", first: "Troy", last: "Nickerson", email: "troy.nickerson@unco.edu", org: "Northern Colorado", position: "President" },
  { id: "19", first: "Scott", last: "Owen", email: "s.owen@nmact.org", org: "New Mexico HS Activities Assoc.", position: "Scholastic Section 5&6" },
  { id: "20", first: "Thomas", last: "Pompei", email: "TAPompei@indianatech.edu", org: "Indiana Tech", position: "Divisional Representative – NAIA Men" },
  { id: "21", first: "Paul", last: "Rademacher", email: "PDRademacher@indianatech.edu", org: "Indiana Tech", position: "Divisional Representative – NAIA Women" },
  { id: "22", first: "Darrell", last: "Randall", email: "drandall@mhequipment.com", org: "National Wrestling Coaches Association", position: "Treasurer" },
  { id: "23", first: "Joe", last: "Renfro", email: "joe.renfro@neo.edu", org: "Northeastern Okla. A&M", position: "Divisional Representative – NJCAA Men" },
  { id: "24", first: "Jim", last: "Rudy", email: "jimmyrudy@gmail.com", org: "Wrestlers in Business Network", position: "At-Large" },
  { id: "25", first: "Joe", last: "Savino", email: "joe.savino@nm.com", org: "University of Indianapolis", position: "At-Large" },
  { id: "26", first: "Jon", last: "Sioredas", email: "jsioreda@calpoly.edu", org: "Cal Poly", position: "President-Elect" },
  { id: "27", first: "Lee Roy", last: "Smith", email: "lsmith@nwhof.org", org: "National Wrestling Hall of Fame", position: "Affiliate Organizations" },
  { id: "28", first: "Bryan", last: "Smith", email: "bdsmith@guhsdaz.org", org: "Moon Valley HS (AZ)", position: "Scholastic Section 7&8" },
  { id: "29", first: "Ross", last: "Taylor", email: "ross.taylor@snow.edu", org: "Snow College", position: "Divisional Representative – NJCAA Women" },
  { id: "30", first: "TBA", last: "TBA", email: "—", org: "—", position: "Divisional Representative – NCAA D2 Men" },
  { id: "31", first: "Rusty", last: "Wallace", email: "rwallace@ccaeducate.me", org: "Northern Lebanon HS (PA)", position: "Scholastic Section 1&2" },
  { id: "32", first: "Jason", last: "Warthan", email: "warthanjc@uindy.edu", org: "Indianapolis", position: "At-Large" },
];

const POSITION_COLORS: Record<string, string> = {
  "President": "bg-[#C41E3A]/20 text-white",
  "President-Elect": "bg-[#C41E3A]/10 text-white/80",
  "Secretary": "bg-blue-900/30 text-blue-300",
  "Treasurer": "bg-blue-900/30 text-blue-300",
};
function positionBadge(pos: string) {
  const key = Object.keys(POSITION_COLORS).find((k) => pos === k);
  return key ? POSITION_COLORS[key] : "bg-white/5 text-[#C41E3A]/80";
}

// ── Section Header Component ───────────────────────────────────────────────
function SectionHeader({ label, title, accent }: { label: string; title: string; accent?: string }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-3">
        <span className="w-8 h-0.5 bg-[#C41E3A]" />
        <span className="font-condensed text-xs tracking-[0.2em] text-[#F5C842] uppercase">{label}</span>
      </div>
      <h2 className="font-display text-5xl md:text-6xl font-black uppercase leading-none">
        {title}{accent && <><br /><span className="text-white">{accent}</span></>}
      </h2>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function AboutNWCA() {
  const [presidentSearch, setPresidentSearch] = useState("");
  const [boardSearch, setBoardSearch] = useState("");
  const [boardFilter, setBoardFilter] = useState("All");

  const boardCategories = ["All", "Officer", "Divisional Representative", "Scholastic", "Affiliate Organizations", "At-Large"];

  const filteredPresidents = PRESIDENTS.filter(
    (p) =>
      p.name.toLowerCase().includes(presidentSearch.toLowerCase()) ||
      p.institution.toLowerCase().includes(presidentSearch.toLowerCase()) ||
      p.years.includes(presidentSearch)
  );

  const filteredBoard = BOARD_MEMBERS.filter((m) => {
    const matchSearch =
      `${m.first} ${m.last}`.toLowerCase().includes(boardSearch.toLowerCase()) ||
      m.org.toLowerCase().includes(boardSearch.toLowerCase()) ||
      m.position.toLowerCase().includes(boardSearch.toLowerCase());
    const matchFilter =
      boardFilter === "All" ||
      (boardFilter === "Officer" && ["President", "President-Elect", "Secretary", "Treasurer"].includes(m.position)) ||
      (boardFilter === "Divisional Representative" && m.position.startsWith("Divisional")) ||
      (boardFilter === "Scholastic" && m.position.startsWith("Scholastic")) ||
      (boardFilter === "Affiliate Organizations" && m.position === "Affiliate Organizations") ||
      (boardFilter === "At-Large" && m.position === "At-Large");
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <NavBar solid />

      {/* ── Page Hero ── */}
      <section
        className="relative py-20 overflow-hidden"
        style={{ background: "radial-gradient(ellipse at 30% 50%, #17214B 0%, #0d1117 70%)" }}
      >
        <div className="absolute inset-0 opacity-4"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px)" }}
        />
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-0.5 bg-[#C41E3A]" />
            <span className="font-condensed text-xs tracking-[0.2em] text-[#F5C842] uppercase">National Wrestling Coaches Association</span>
          </div>
          <h1 className="font-display text-6xl md:text-8xl font-black uppercase leading-none mb-6">
            ABOUT THE<br /><span className="text-[#F5C842]">NWCA</span>
          </h1>
          <p className="text-white/85 text-lg max-w-2xl leading-relaxed">
            Advancing the sport of wrestling through coaching development, leadership, and long-term growth at every level since 1928.
          </p>
          {/* Quick-jump anchors */}
          <div className="flex flex-wrap gap-3 mt-8">
            {[
              { label: "About the NWCA", href: "#about-nwca" },
              { label: "NWCA Staff", href: "#staff" },
              { label: "Past Presidents", href: "#past-presidents" },
              { label: "Fundraising Disclosure", href: "#fundraising" },
              { label: "Board of Directors", href: "#board" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                }}
                className="font-condensed text-xs tracking-widest uppercase px-4 py-2 border border-white/20 text-white/80 hover:border-[#C41E3A] hover:text-[#F5C842] transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 1 — About the NWCA
      ══════════════════════════════════════════════════════════════════ */}
      <section id="about-nwca" className="py-20 max-w-6xl mx-auto px-6 scroll-mt-24">
        <SectionHeader label="Who We Are" title="ABOUT THE" accent="NWCA" />

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="border border-white/10 p-8 bg-white/2">
            <div className="flex items-center gap-3 mb-5">
              <Target className="w-5 h-5 text-[#F5C842]" />
              <h3 className="font-condensed text-xl font-700 tracking-wide uppercase">Mission Statement</h3>
            </div>
            <p className="text-white/80 leading-relaxed">
              The National Wrestling Coaches Association provides an educationally based wrestling experience through innovative coaching development, strategic expansion, and fostering student-wrestler success in careers and life.
            </p>
          </div>
          <div className="border border-white/10 p-8 bg-white/2">
            <div className="flex items-center gap-3 mb-5">
              <TrendingUp className="w-5 h-5 text-[#F5C842]" />
              <h3 className="font-condensed text-xl font-700 tracking-wide uppercase">Vision</h3>
            </div>
            <p className="text-white/80 leading-relaxed">
              Growing the sport through strong leadership, expanded opportunities, and sustainable program development nationwide.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Users, title: "Coaching Development", desc: "Providing education, leadership training, and tools to help coaches build impactful programs at every level of competition." },
            { icon: Heart, title: "Student-Wrestler Well-Being", desc: "Supporting environments that prioritize athlete development, safety, and life success beyond the mat." },
            { icon: TrendingUp, title: "Advocacy", desc: "Driving growth and protecting the future of wrestling through national advocacy efforts at the scholastic and collegiate levels." },
          ].map((item) => (
            <div key={item.title} className="group">
              <div className="w-12 h-12 bg-[#C41E3A]/10 border border-[#C41E3A]/20 flex items-center justify-center mb-5 group-hover:bg-[#C41E3A]/20 transition-colors">
                <item.icon className="w-5 h-5 text-[#F5C842]" />
              </div>
              <h3 className="font-condensed text-xl font-700 uppercase tracking-wide mb-3">{item.title}</h3>
              <p className="text-white/80 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="h-px bg-white/5 max-w-6xl mx-auto" />

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 2 — NWCA Staff
      ══════════════════════════════════════════════════════════════════ */}
      <section id="staff" className="py-20 bg-[#0a0f1a] scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader label="Our Team" title="NWCA" accent="STAFF" />

          {/* NWCA Staff */}
          <h3 className="font-condensed text-xs tracking-[0.2em] uppercase text-[#F5C842] mb-5">NWCA Staff</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {NWCA_STAFF.map((member) => (
              <div key={member.name} className="border border-white/25 p-6 bg-white/8 hover:border-[#C41E3A]/60 transition-colors group">
                <div className="w-10 h-10 bg-[#C41E3A]/10 border border-[#C41E3A]/20 flex items-center justify-center mb-4">
                  <Users className="w-4 h-4 text-[#F5C842]" />
                </div>
                <h3 className="font-condensed text-lg font-700 uppercase tracking-wide mb-1 group-hover:text-[#F5C842] transition-colors">{member.name}</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-3">{member.title}</p>
                <div className="space-y-1">
                  {member.email && (
                    <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-white/40 hover:text-[#F5C842] text-xs transition-colors">
                      <Mail className="w-3 h-3" />
                      <span>{member.email}</span>
                    </a>
                  )}
                  {member.phone && (
                    <div className="flex items-center gap-2 text-white/40 text-xs">
                      <Phone className="w-3 h-3" />
                      <a href={`tel:${member.phone.replace(/[^0-9]/g, "")}`} className="hover:text-[#F5C842] transition-colors">{member.phone}</a>
                      {(member as any).ext && <span className="text-white/25">Ext. {(member as any).ext}</span>}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* NWCA Contractors */}
          <h3 className="font-condensed text-xs tracking-[0.2em] uppercase text-[#F5C842] mb-5">NWCA Contractors</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {NWCA_CONTRACTORS.map((member) => (
              <div key={member.name} className="border border-white/25 p-6 bg-white/8 hover:border-white/40 transition-colors group">
                <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  <Users className="w-4 h-4 text-white/50" />
                </div>
                <h3 className="font-condensed text-lg font-700 uppercase tracking-wide mb-1 group-hover:text-[#F5C842] transition-colors">{member.name}</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-3">{member.title}</p>
                <div className="space-y-1">
                  {member.email && (
                    <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-white/40 hover:text-[#F5C842] text-xs transition-colors">
                      <Mail className="w-3 h-3" />
                      <span>{member.email}</span>
                    </a>
                  )}
                  {member.phone && (
                    <a href={`tel:${member.phone.replace(/[^0-9]/g, "")}`} className="flex items-center gap-2 text-white/40 hover:text-[#F5C842] text-xs transition-colors">
                      <Phone className="w-3 h-3" />
                      <span>{member.phone}</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* WIBN Staff */}
          <div className="h-px bg-white/10 mb-12" />
          <h3 className="font-condensed text-xs tracking-[0.2em] uppercase text-[#F5C842] mb-5">Wrestlers in Business Network (WIBN)</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {WIBN_STAFF.map((member) => (
              <div key={member.name} className="border border-[#1a5c2a]/70 p-6 bg-[#1a5c2a]/15 hover:border-[#1a5c2a] transition-colors group">
                <div className="w-10 h-10 bg-[#1a5c2a]/20 border border-[#1a5c2a]/30 flex items-center justify-center mb-4">
                  <Users className="w-4 h-4 text-[#4ade80]" />
                </div>
                <h3 className="font-condensed text-lg font-700 uppercase tracking-wide mb-1 group-hover:text-[#4ade80] transition-colors">{member.name}</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-3">{member.title}</p>
                <div className="space-y-1">
                  {member.email && (
                    <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-white/40 hover:text-[#4ade80] text-xs transition-colors">
                      <Mail className="w-3 h-3" />
                      <span>{member.email}</span>
                    </a>
                  )}
                  {member.phone && (
                    <div className="flex items-center gap-2 text-white/40 text-xs">
                      <Phone className="w-3 h-3" />
                      <a href={`tel:${member.phone.replace(/[^0-9]/g, "")}`} className="hover:text-[#4ade80] transition-colors">{member.phone}</a>
                      {(member as any).ext && <span className="text-white/25">Ext. {(member as any).ext}</span>}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="border border-dashed border-white/10 p-5 bg-white/1">
            <p className="text-white/40 text-sm">
              <span className="text-white/80 font-condensed font-600 uppercase tracking-wide">NWCA Office:</span>{" "}
              330 Hostetter Road, Manheim, PA 17545
              {" · "}
              <a href="tel:7176538009" className="hover:text-[#F5C842] transition-colors">(717) 653-8009</a>
            </p>
          </div>
        </div>
      </section>

      <div className="h-px bg-white/5 max-w-6xl mx-auto" />

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 3 — Past Presidents
      ══════════════════════════════════════════════════════════════════ */}
      <section id="past-presidents" className="py-20 max-w-6xl mx-auto px-6 scroll-mt-24">
        <SectionHeader label="Leadership History" title="PAST" accent="PRESIDENTS" />

        {/* Stats */}
        <div className="flex flex-wrap gap-10 mb-10 pb-10 border-b border-white/8">
          <div>
            <div className="font-display text-4xl font-black text-[#F5C842]">90+</div>
            <div className="font-condensed text-xs uppercase tracking-widest text-white/40 mt-1">Years of Leadership</div>
          </div>
          <div>
            <div className="font-display text-4xl font-black text-[#F5C842]">{PRESIDENTS.length}</div>
            <div className="font-condensed text-xs uppercase tracking-widest text-white/40 mt-1">Presidents Served</div>
          </div>
          <div>
            <div className="font-display text-4xl font-black text-[#F5C842]">1933</div>
            <div className="font-condensed text-xs uppercase tracking-widest text-white/40 mt-1">Founded</div>
          </div>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name, institution, or year…"
            value={presidentSearch}
            onChange={(e) => setPresidentSearch(e.target.value)}
            className="w-full max-w-md bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/50/30 focus:outline-none focus:border-[#C41E3A]/50"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left font-condensed text-xs uppercase tracking-widest text-white/40 pb-3 pr-8">Year(s)</th>
                <th className="text-left font-condensed text-xs uppercase tracking-widest text-white/40 pb-3 pr-8">Name</th>
                <th className="text-left font-condensed text-xs uppercase tracking-widest text-white/40 pb-3">Institution</th>
              </tr>
            </thead>
            <tbody>
              {filteredPresidents.map((p, i) => (
                <tr key={i} className={`border-b border-white/5 hover:bg-white/3 transition-colors ${p.current ? "bg-[#C41E3A]/5" : ""}`}>
                  <td className={`py-3 pr-8 font-condensed text-sm font-600 ${p.current ? "text-white" : "text-white/80"}`}>
                    {p.years}
                    {p.current && <span className="ml-2 text-[10px] bg-[#C41E3A] text-white px-1.5 py-0.5 uppercase tracking-wide">Current</span>}
                  </td>
                  <td className={`py-3 pr-8 font-medium ${p.current ? "text-white" : "text-white/80"}`}>{p.name}</td>
                  <td className="py-3 text-white/80 text-sm">{p.institution}</td>
                </tr>
              ))}
              {filteredPresidents.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-12 text-center text-white/30 text-sm">No results for "{presidentSearch}"</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <div className="h-px bg-white/5 max-w-6xl mx-auto" />

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 4 — Fundraising Disclosure
      ══════════════════════════════════════════════════════════════════ */}
      <section id="fundraising" className="py-20 bg-[#0a0f1a] scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeader label="Financial Transparency" title="FUNDRAISING" accent="DISCLOSURE" />

          <div className="border border-white/10 p-8 bg-white/2 mb-10">
            <h3 className="font-condensed text-xl font-700 uppercase tracking-wide mb-5">Disclosure Statement</h3>
            <p className="text-white/85 leading-relaxed mb-4">
              The National Wrestling Coaches Association (NWCA) is a 501(c)(6) nonprofit organization dedicated to advancing the sport of wrestling through coaching development, advocacy, and student-athlete support.
            </p>
            <p className="text-white/85 leading-relaxed mb-4">
              In compliance with applicable state and federal laws, the NWCA provides the following fundraising disclosure information. A copy of the official registration and financial information may be obtained from the appropriate state agency at no cost by calling the toll-free number within the state.
            </p>
            <p className="text-white/85 leading-relaxed">
              Registration does not imply endorsement, approval, or recommendation by the state. For questions regarding our financial reporting, please contact us directly.
            </p>
          </div>

          <h3 className="font-condensed text-xl font-700 uppercase tracking-wide mb-5 flex items-center gap-3">
            <span className="w-6 h-0.5 bg-[#C41E3A]" />
            Annual Reports
          </h3>
          <div className="space-y-3 mb-10">
            {REPORTS.map((r) => (
              <a
                key={r.year}
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-5 border border-white/10 bg-white/2 hover:border-[#C41E3A]/40 hover:bg-[#C41E3A]/5 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <FileText className="w-5 h-5 text-[#F5C842]" />
                  <div>
                    <div className="font-condensed font-700 uppercase tracking-wide group-hover:text-[#F5C842] transition-colors">{r.label}</div>
                    <div className="text-white/40 text-xs mt-0.5">PDF Document</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-white/40 group-hover:text-[#F5C842] transition-colors">
                  <Download className="w-4 h-4" />
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>
            ))}
          </div>

          <div className="border border-dashed border-[#C41E3A]/30 p-5 bg-[#C41E3A]/5">
            <p className="text-white/80 text-sm">
              <span className="text-white font-condensed font-600 uppercase tracking-wide">CMS Integration Point:</span>{" "}
              Annual report documents will be managed and updated through the CMS. New reports can be uploaded and linked here without code changes.
            </p>
          </div>
        </div>
      </section>

      <div className="h-px bg-white/5 max-w-6xl mx-auto" />

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 5 — Board of Directors
      ══════════════════════════════════════════════════════════════════ */}
      <section id="board" className="py-20 max-w-6xl mx-auto px-6 scroll-mt-24">
        <SectionHeader label="Governance" title="BOARD OF" accent="DIRECTORS" />

        {/* Stats */}
        <div className="flex flex-wrap gap-10 mb-10 pb-10 border-b border-white/8">
          <div>
            <div className="font-display text-4xl font-black text-[#F5C842]">{BOARD_MEMBERS.length}</div>
            <div className="font-condensed text-xs uppercase tracking-widest text-white/40 mt-1">Board Members</div>
          </div>
          <div>
            <div className="font-display text-4xl font-black text-[#F5C842]">8</div>
            <div className="font-condensed text-xs uppercase tracking-widest text-white/40 mt-1">Divisions Represented</div>
          </div>
          <div>
            <div className="font-display text-4xl font-black text-[#F5C842]">32+</div>
            <div className="font-condensed text-xs uppercase tracking-widest text-white/40 mt-1">Institutions</div>
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-5">
          {boardCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setBoardFilter(cat)}
              className={`font-condensed text-xs uppercase tracking-wider px-3 py-1.5 border transition-colors ${
                boardFilter === cat
                  ? "bg-[#C41E3A] border-[#C41E3A] text-white"
                  : "border-white/20 text-white/80 hover:border-white/40 hover:text-white/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name, organization, or role…"
            value={boardSearch}
            onChange={(e) => setBoardSearch(e.target.value)}
            className="w-full max-w-md bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/50/30 focus:outline-none focus:border-[#C41E3A]/50"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left font-condensed text-xs uppercase tracking-widest text-white/40 pb-3 pr-6 w-8">#</th>
                <th className="text-left font-condensed text-xs uppercase tracking-widest text-white/40 pb-3 pr-6">Name</th>
                <th className="text-left font-condensed text-xs uppercase tracking-widest text-white/40 pb-3 pr-6 hidden md:table-cell">Organization</th>
                <th className="text-left font-condensed text-xs uppercase tracking-widest text-white/40 pb-3 pr-6 hidden lg:table-cell">Email</th>
                <th className="text-left font-condensed text-xs uppercase tracking-widest text-white/40 pb-3">Position</th>
              </tr>
            </thead>
            <tbody>
              {filteredBoard.map((m) => (
                <tr key={m.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                  <td className="py-3 pr-6 font-condensed text-xs text-white/30">{m.id}</td>
                  <td className="py-3 pr-6 font-medium text-white/90 whitespace-nowrap">{m.first} {m.last}</td>
                  <td className="py-3 pr-6 text-white/80 text-sm hidden md:table-cell">{m.org}</td>
                  <td className="py-3 pr-6 hidden lg:table-cell">
                    {m.email !== "—" ? (
                      <a href={`mailto:${m.email}`} className="text-white/40 hover:text-[#F5C842] text-xs transition-colors">{m.email}</a>
                    ) : (
                      <span className="text-white/20 text-xs">—</span>
                    )}
                  </td>
                  <td className="py-3">
                    <span className={`inline-block text-xs font-condensed font-600 uppercase tracking-wide px-2 py-0.5 ${positionBadge(m.position)}`}>
                      {m.position}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredBoard.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-white/30 text-sm">No results found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Support CTA ── */}
      <section className="py-16 bg-[#C41E3A]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl font-black uppercase mb-4">Support the NWCA</h2>
          <p className="text-white/90 text-lg mb-8">
            Help us continue to grow wrestling through coaching education, advocacy, and student-athlete development nationwide.
          </p>
          <a
            href="https://nwcaonline.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-white text-[#C41E3A] font-condensed font-700 uppercase tracking-wider px-8 py-3 text-sm hover:bg-white/90 transition-colors"
          >
            Donate Now
          </a>
        </div>
      </section>
      {/* ── FOOTER ──────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
