/**
 * Board of Directors page
 * Design: Dark navy base, red accents, condensed display typography
 * Content migrated from nwcaonline.com legacy site — full board table
 */

import NavBar from "@/components/NavBar";
import { useState } from "react";

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
  return key ? POSITION_COLORS[key] : "bg-white/5 text-white/80";
}

export default function BoardOfDirectors() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Officer", "Divisional Representative", "Scholastic", "Affiliate Organizations", "At-Large"];

  const filtered = BOARD_MEMBERS.filter((m) => {
    const matchSearch =
      `${m.first} ${m.last}`.toLowerCase().includes(search.toLowerCase()) ||
      m.org.toLowerCase().includes(search.toLowerCase()) ||
      m.position.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "All" ||
      (filter === "Officer" && ["President", "President-Elect", "Secretary", "Treasurer"].includes(m.position)) ||
      (filter === "Divisional Representative" && m.position.startsWith("Divisional")) ||
      (filter === "Scholastic" && m.position.startsWith("Scholastic")) ||
      (filter === "Affiliate Organizations" && m.position === "Affiliate Organizations") ||
      (filter === "At-Large" && m.position === "At-Large");
    return matchSearch && matchFilter;
  });

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
            BOARD OF<br /><span className="text-white">DIRECTORS</span>
          </h1>
          <p className="text-white/80 text-lg max-w-xl">
            The leaders guiding the direction and strategic priorities of the National Wrestling Coaches Association.
          </p>
        </div>
      </section>

      {/* Stats */}
      <div className="bg-[#111827] border-y border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-wrap gap-8">
          <div>
            <div className="font-display text-3xl font-black text-white">{BOARD_MEMBERS.length}</div>
            <div className="font-condensed text-xs uppercase tracking-widest text-white/80">Board Members</div>
          </div>
          <div>
            <div className="font-display text-3xl font-black text-white">8</div>
            <div className="font-condensed text-xs uppercase tracking-widest text-white/80">Divisions Represented</div>
          </div>
          <div>
            <div className="font-display text-3xl font-black text-white">32+</div>
            <div className="font-condensed text-xs uppercase tracking-widest text-white/80">Institutions</div>
          </div>
        </div>
      </div>

      {/* Table */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`font-condensed text-xs uppercase tracking-wider px-3 py-1.5 border transition-colors ${
                filter === cat
                  ? "bg-[#C41E3A] border-[#C41E3A] text-white"
                  : "border-white/20 text-white/80 hover:border-white/40 hover:text-white/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by name, organization, or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md bg-white/5 border border-white/10 rounded-sm px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#C41E3A]/50"
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
              {filtered.map((m) => (
                <tr key={m.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                  <td className="py-3.5 pr-6 font-condensed text-xs text-white/30">{m.id}</td>
                  <td className="py-3.5 pr-6 font-medium text-white/90 whitespace-nowrap">{m.first} {m.last}</td>
                  <td className="py-3.5 pr-6 text-white/80 text-sm hidden md:table-cell">{m.org}</td>
                  <td className="py-3.5 pr-6 hidden lg:table-cell">
                    {m.email !== "—" ? (
                      <a href={`mailto:${m.email}`} className="text-white/40 hover:text-[#F5C842] text-xs transition-colors">{m.email}</a>
                    ) : (
                      <span className="text-white/20 text-xs">—</span>
                    )}
                  </td>
                  <td className="py-3.5">
                    <span className={`inline-block text-xs font-condensed font-600 uppercase tracking-wide px-2 py-0.5 rounded-sm ${positionBadge(m.position)}`}>
                      {m.position}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-white/30 text-sm">No results found</td>
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
