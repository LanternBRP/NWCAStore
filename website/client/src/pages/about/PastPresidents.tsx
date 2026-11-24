/**
 * Past Presidents page
 * Design: Dark navy base, red accents, condensed display typography
 * Content migrated from nwcaonline.com legacy site — full table from 1933 to present
 */

import NavBar from "@/components/NavBar";
import { useState } from "react";

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

export default function PastPresidents() {
  const [search, setSearch] = useState("");
  const filtered = PRESIDENTS.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.institution.toLowerCase().includes(search.toLowerCase()) ||
      p.years.includes(search)
  );

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <NavBar />
      <div className="pt-16" />

      {/* Hero */}
      <section
        className="relative py-20 overflow-hidden"
        style={{ background: "radial-gradient(ellipse at 30% 50%, #17214B 0%, #0d1117 70%)" }}
      >
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-0.5 bg-[#C41E3A]" />
            <span className="font-condensed text-xs tracking-[0.2em] text-white uppercase">About the NWCA</span>
          </div>
          <h1 className="font-display text-6xl md:text-7xl font-black uppercase leading-none mb-4">
            PAST<br /><span className="text-white">PRESIDENTS</span>
          </h1>
          <p className="text-white/80 text-lg max-w-xl">
            A complete record of NWCA Presidents from the organization's founding in 1933 through today.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-[#111827] border-y border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-wrap gap-8">
          <div>
            <div className="font-display text-3xl font-black text-white">90+</div>
            <div className="font-condensed text-xs uppercase tracking-widest text-white/80">Years of Leadership</div>
          </div>
          <div>
            <div className="font-display text-3xl font-black text-white">{PRESIDENTS.length}</div>
            <div className="font-condensed text-xs uppercase tracking-widest text-white/80">Presidents Served</div>
          </div>
          <div>
            <div className="font-display text-3xl font-black text-white">1933</div>
            <div className="font-condensed text-xs uppercase tracking-widest text-white/80">Founded</div>
          </div>
        </div>
      </div>

      {/* Table */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by name, institution, or year..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md bg-white/5 border border-white/10 rounded-sm px-4 py-2.5 text-sm text-white placeholder:text-white/50/30 focus:outline-none focus:border-[#C41E3A]/50"
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
              {filtered.map((p, i) => (
                <tr
                  key={i}
                  className={`border-b border-white/5 hover:bg-white/3 transition-colors ${p.current ? "bg-[#C41E3A]/5" : ""}`}
                >
                  <td className={`py-3.5 pr-8 font-condensed text-sm font-600 ${p.current ? "text-white" : "text-white/80"}`}>
                    {p.years}
                    {p.current && <span className="ml-2 text-[10px] bg-[#C41E3A] text-white px-1.5 py-0.5 rounded-sm uppercase tracking-wide">Current</span>}
                  </td>
                  <td className={`py-3.5 pr-8 font-medium ${p.current ? "text-white" : "text-white/80"}`}>{p.name}</td>
                  <td className="py-3.5 text-white/80 text-sm">{p.institution}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-12 text-center text-white/30 text-sm">No results found for "{search}"</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-white/40 text-sm">
        © 2026 National Wrestling Coaches Association
      </footer>
    </div>
  );
}
