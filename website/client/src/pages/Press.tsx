/**
 * Press & Stories — NWCA News Hub
 * Design: Dark navy, editorial grid layout, CMS-ready placeholder content
 * Colors: Arena Black #0A0E1A / NWCA Navy #17214B / Championship Red #C41E3A / Chalk White #F8F6F1
 * Fonts: Bebas Neue (display) / Barlow Condensed (labels/nav) / Inter (body)
 * Layout: Featured hero article + category filter tabs + article grid + sidebar
 */

import { useState } from "react";
import { Link } from "wouter";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ArrowRight, Search, Clock, Tag, ChevronRight, ExternalLink } from "lucide-react";

// ─── Asset URLs ────────────────────────────────────────────────────────────────
const LOGO = "/manus-storage/NWCALogo_02601508.png";

// ─── Nav items (same as Home) ──────────────────────────────────────────────────


// ─── Categories ────────────────────────────────────────────────────────────────
const CATEGORIES = ["All", "Press Release", "Feature Story", "Women's Wrestling", "Rankings", "Coaching", "Grow the Sport", "Events"];

// ─── Article Data (CMS placeholder — replace with API call) ───────────────────
const ARTICLES = [
  {
    id: 1,
    slug: "nwca-2026-convention-dates",
    category: "Press Release",
    date: "Apr 18, 2026",
    readTime: "3 min read",
    title: "NWCA Announces 2026 Convention Dates and Keynote Speakers",
    excerpt: "The annual NWCA Convention will bring together over 2,000 wrestling coaches from across the country for three days of professional development, networking, and competition.",
    img: "/manus-storage/nwca_convention_2026_logo_332ce2cd.png",
    imgBg: "#0A1628",
    featured: true,
    author: "NWCA Staff",
  },
  {
    id: 2,
    slug: "record-47-states-girls-wrestling",
    category: "Women's Wrestling",
    date: "Apr 15, 2026",
    readTime: "4 min read",
    title: "Record 47 States Now Sanction Girls High School Wrestling",
    excerpt: "Women's wrestling continues its historic growth with three additional states officially sanctioning the sport this spring, bringing the total to an all-time high.",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663283983903/Hfy5MinW2PXVKLrBsPEmFG/nwca_women_wrestling-CvTd5t5jXpaak5d4UiEJg2.webp",
    featured: false,
    author: "NWCA Staff",
  },
  {
    id: 3,
    slug: "penn-state-d1-rankings",
    category: "Rankings",
    date: "Apr 12, 2026",
    readTime: "2 min read",
    title: "Penn State Holds Top Spot in Final D1 Dual Rankings",
    excerpt: "The Nittany Lions close out the season ranked No. 1 in the country for the third consecutive year, finishing with a perfect 19-0 dual record.",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663283983903/Hfy5MinW2PXVKLrBsPEmFG/nwca_men_wrestling-WjWzhv5r9eaGje2r3TTCeD.webp",
    featured: false,
    author: "NWCA Rankings Desk",
  },
  {
    id: 4,
    slug: "new-ceu-online-platform",
    category: "Coaching",
    date: "Apr 10, 2026",
    readTime: "5 min read",
    title: "NWCA Launches New Online CEU Platform for Scholastic Coaches",
    excerpt: "Coaches can now earn continuing education credits entirely online through the new NWCA Learning Management System, featuring 12 self-paced modules.",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663283983903/Hfy5MinW2PXVKLrBsPEmFG/nwca_coaching_sideline-4uwFYm9ohWGchbmuNTT8Mk.webp",
    featured: false,
    author: "NWCA Coaching Development",
  },
  {
    id: 5,
    slug: "wrestling-participation-record",
    category: "Grow the Sport",
    date: "Apr 7, 2026",
    readTime: "6 min read",
    title: "Wrestling Participation Hits All-Time High With 320,000 HS Athletes",
    excerpt: "New NWCA participation data shows wrestling at its highest enrollment numbers in the sport's history, driven largely by explosive growth in girls wrestling.",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663283983903/Hfy5MinW2PXVKLrBsPEmFG/nwca_hero_mat_overhead-ZjcC7ehC6HPqP9Gq57azF8.webp",
    featured: false,
    author: "NWCA Research",
  },
  {
    id: 6,
    slug: "all-star-classic-2026-preview",
    category: "Events",
    date: "Apr 4, 2026",
    readTime: "4 min read",
    title: "2026 NWCA All-Star Classic Preview: Matchups to Watch",
    excerpt: "With tickets on sale and the bracket taking shape, here's a look at the marquee bouts expected at this year's All-Star Classic in State College, PA.",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663283983903/Hfy5MinW2PXVKLrBsPEmFG/nwca_hero_action-eENn2pr8W8AJEig9Y5EhYy.webp",
    featured: false,
    author: "NWCA Staff",
  },
  {
    id: 7,
    slug: "scholastic-leadership-academy-usmc",
    category: "Feature Story",
    date: "Mar 28, 2026",
    readTime: "7 min read",
    title: "Inside the Scholastic Leadership Academy: How the USMC Partnership Is Changing Coaching",
    excerpt: "The NWCA's partnership with the United States Marine Corps is giving scholastic coaches a new playbook for recruiting, retention, and building championship culture.",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663283983903/Hfy5MinW2PXVKLrBsPEmFG/nwca_coaching_sideline-4uwFYm9ohWGchbmuNTT8Mk.webp",
    featured: false,
    author: "Jim Beichner",
  },
  {
    id: 8,
    slug: "iowa-women-wrestling-dynasty",
    category: "Feature Story",
    date: "Mar 22, 2026",
    readTime: "8 min read",
    title: "Building a Dynasty: How Iowa Became the Gold Standard in Women's Wrestling",
    excerpt: "A deep dive into the program, culture, and coaching philosophy that has made the Hawkeyes the dominant force in collegiate women's wrestling.",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663283983903/Hfy5MinW2PXVKLrBsPEmFG/nwca_women_wrestling-CvTd5t5jXpaak5d4UiEJg2.webp",
    featured: false,
    author: "NWCA Editorial",
  },
  {
    id: 9,
    slug: "national-duals-2026-recap",
    category: "Events",
    date: "Mar 15, 2026",
    readTime: "5 min read",
    title: "Nebraska-Kearney Claims DII Title at 2026 National Duals",
    excerpt: "The Lopers edged Central Oklahoma in a dramatic final to claim the DII crown, while Northern Iowa dominated in the DI bracket.",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663283983903/Hfy5MinW2PXVKLrBsPEmFG/nwca_men_wrestling-WjWzhv5r9eaGje2r3TTCeD.webp",
    featured: false,
    author: "NWCA Staff",
  },
];

// ─── Category color map ────────────────────────────────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
  "Press Release": "#17214B",
  "Feature Story": "#C41E3A",
  "Women's Wrestling": "#7B3FA0",
  "Rankings": "#1a6b3c",
  "Coaching": "#B8860B",
  "Grow the Sport": "#1a5c8a",
  "Events": "#C41E3A",
};

// ─── Sub-components ────────────────────────────────────────────────────────────
function CategoryBadge({ category }: { category: string }) {
  const bg = CATEGORY_COLORS[category] || "#17214B";
  return (
    <span
      className="font-condensed font-700 text-[10px] tracking-widest uppercase text-white px-2 py-0.5 inline-block"
      style={{ backgroundColor: bg }}
    >
      {category}
    </span>
  );
}

function ArticleCard({ article, large = false }: { article: typeof ARTICLES[0]; large?: boolean }) {
  const hasBg = (article as any).imgBg;
  return (
    <a
      href={`/news/${article.slug}`}
      className={`group block bg-[#222b3d] overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] hover:-translate-y-0.5 ${large ? "" : ""}`}
    >
      <div
        className={`relative overflow-hidden ${large ? "aspect-[16/9]" : "aspect-video"} flex items-center justify-center`}
        style={hasBg ? { backgroundColor: (article as any).imgBg } : {}}
      >
        <img
          src={article.img}
          alt={article.title}
          className={hasBg ? "w-auto h-full max-h-[90%] object-contain p-6" : "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"}
        />
        {!hasBg && <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />}
        <div className="absolute top-3 left-3">
          <CategoryBadge category={article.category} />
        </div>
      </div>
      <div className={`p-4 ${large ? "p-6" : ""}`}>
        <div className="flex items-center gap-3 mb-2">
          <span className="font-condensed text-[11px] text-[#c8cdd6] tracking-wide">{article.date}</span>
          <span className="w-1 h-1 rounded-full bg-[#6b7280]" />
          <span className="font-condensed text-[11px] text-[#c8cdd6] tracking-wide flex items-center gap-1">
            <Clock className="w-3 h-3" />{article.readTime}
          </span>
        </div>
        <h3 className={`font-display text-white leading-tight group-hover:text-[#F5C842] transition-colors ${large ? "text-2xl md:text-3xl mb-3" : "text-lg mb-2"}`}>
          {article.title}
        </h3>
        <p className={`font-body text-[#c8cdd6] leading-relaxed line-clamp-3 ${large ? "text-base" : "text-sm"}`}>
          {article.excerpt}
        </p>
        <div className="mt-3 flex items-center gap-1 font-condensed font-700 text-[11px] tracking-widest uppercase text-white group-hover:gap-2 transition-all">
          Read More <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </a>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Press() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
;

  const filtered = ARTICLES.filter((a) => {
    const matchCat = activeCategory === "All" || a.category === activeCategory;
    const matchSearch = searchQuery === "" || a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = ARTICLES.find((a) => a.featured);
  const gridArticles = filtered.filter((a) => !a.featured || activeCategory !== "All" || searchQuery !== "");
  const recentArticles = ARTICLES.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#1c2333] text-[#F8F6F1] overflow-x-hidden">
      <NavBar solid />

      {/* ── PAGE HEADER ─────────────────────────────────────────────── */}
      <div className="bg-[#141824] border-b border-white/5 py-10">
        <div className="container">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-condensed text-[11px] tracking-widest uppercase text-[#c8cdd6] mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#F5C842]">Press &amp; Stories</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="font-condensed font-700 text-[11px] tracking-widest uppercase text-[#F5C842] mb-2 flex items-center gap-2">
                <span className="inline-block w-8 h-px bg-[#C41E3A]" />
                NWCA News &amp; Media
              </div>
              <h1 className="font-display text-5xl md:text-6xl text-white leading-none">
                PRESS &amp; <span className="text-[#F5C842]">STORIES</span>
              </h1>
              <p className="font-body text-[#c8cdd6] mt-2 text-sm max-w-xl">
                The latest news, feature stories, press releases, and updates from the National Wrestling Coaches Association.
              </p>
            </div>
            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c8cdd6]" />
              <input
                type="text"
                placeholder="Search stories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#222b3d] border border-white/10 text-white placeholder-[#6b7280] font-body text-sm pl-9 pr-4 py-2.5 focus:outline-none focus:border-[#C41E3A] transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── CATEGORY FILTER TABS ────────────────────────────────────── */}
      <div className="bg-[#1c2333] border-b border-white/5 sticky top-[64px] z-40">
        <div className="container">
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 font-condensed font-700 text-xs tracking-widest uppercase px-4 py-4 border-b-2 transition-all duration-200 ${
                  activeCategory === cat
                    ? "border-[#C41E3A] text-white"
                    : "border-transparent text-[#c8cdd6] hover:text-white hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ────────────────────────────────────────────── */}
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left: Article feed */}
          <div className="lg:col-span-2 space-y-10">

            {/* Featured article (only when showing All with no search) */}
            {activeCategory === "All" && searchQuery === "" && featured && (
              <div>
                <div className="font-condensed font-700 text-[10px] tracking-widest uppercase text-[#F5C842] mb-3 flex items-center gap-2">
                  <span className="w-6 h-px bg-[#C41E3A]" /> Featured Story
                </div>
                <ArticleCard article={featured} large />
              </div>
            )}

            {/* Article count */}
            <div className="flex items-center justify-between">
              <span className="font-condensed text-[11px] tracking-widest uppercase text-[#c8cdd6]">
                {gridArticles.length} {gridArticles.length === 1 ? "story" : "stories"}
                {activeCategory !== "All" && ` in ${activeCategory}`}
                {searchQuery && ` matching "${searchQuery}"`}
              </span>
              {(activeCategory !== "All" || searchQuery) && (
                <button
                  onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                  className="font-condensed text-[11px] tracking-widest uppercase text-white hover:text-white transition-colors"
                >
                  Clear filters ×
                </button>
              )}
            </div>

            {/* Grid */}
            {gridArticles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {gridArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <div className="font-display text-3xl text-[#c8cdd6] mb-2">NO STORIES FOUND</div>
                <p className="font-body text-sm text-[#c8cdd6]">Try a different category or search term.</p>
              </div>
            )}

            {/* CMS note — visible in dev, remove when CMS is live */}
            <div className="border border-dashed border-white/10 rounded p-4 bg-[#222b3d]/50">
              <div className="font-condensed font-700 text-[10px] tracking-widest uppercase text-[#c8cdd6] mb-1">CMS Integration Point</div>
              <p className="font-body text-xs text-[#c8cdd6]">
                Articles above are placeholder content. When the CMS is connected, replace the <code className="text-white">ARTICLES</code> array with a fetch from your CMS API (e.g., <code className="text-white">GET /api/articles?category=&page=</code>). The filter tabs, search, and grid layout will work automatically.
              </p>
            </div>
          </div>

          {/* Right: Sidebar */}
          <aside className="space-y-8">

            {/* Recent stories */}
            <div>
              <div className="font-condensed font-700 text-[10px] tracking-widest uppercase text-[#F5C842] mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-[#C41E3A]" /> Recent Stories
              </div>
              <div className="space-y-0">
                {recentArticles.map((article, i) => (
                  <a
                    key={article.id}
                    href={`/news/${article.slug}`}
                    className="flex gap-3 py-3 border-b border-white/5 group hover:bg-white/3 -mx-2 px-2 transition-colors"
                  >
                    <div className="relative flex-shrink-0 w-16 aspect-video overflow-hidden bg-[#141824]">
                      <img src={article.img} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CategoryBadge category={article.category} />
                      <div className="font-display text-sm text-white leading-tight mt-1 line-clamp-2 group-hover:text-[#F5C842] transition-colors">
                        {article.title}
                      </div>
                      <div className="font-condensed text-[10px] text-[#c8cdd6] mt-1">{article.date}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Browse by category */}
            <div>
              <div className="font-condensed font-700 text-[10px] tracking-widest uppercase text-[#F5C842] mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-[#C41E3A]" /> Browse by Category
              </div>
              <div className="space-y-1">
                {CATEGORIES.filter((c) => c !== "All").map((cat) => {
                  const count = ARTICLES.filter((a) => a.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 text-left transition-all group ${activeCategory === cat ? "bg-[#C41E3A]/10 border-l-2 border-[#C41E3A]" : "border-l-2 border-transparent hover:border-white/20 hover:bg-white/3"}`}
                    >
                      <span className="font-condensed font-600 text-sm tracking-wide text-[#d0d5de] group-hover:text-white transition-colors">{cat}</span>
                      <span className="font-condensed text-[11px] text-[#c8cdd6] bg-white/5 px-2 py-0.5">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Press contact */}
            <div className="bg-[#222b3d] p-5 border-l-2 border-[#C41E3A]">
              <div className="font-condensed font-700 text-[10px] tracking-widest uppercase text-[#F5C842] mb-3">Media Inquiries</div>
              <p className="font-body text-sm text-[#c8cdd6] mb-3 leading-relaxed">
                For press releases, interview requests, or media credentials, contact the NWCA communications team.
              </p>
              <a
                href="mailto:technology@nwca.cc"
                className="flex items-center gap-2 font-condensed font-700 text-sm tracking-widest uppercase text-white hover:text-white transition-colors"
              >
                Contact Press Office <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Social follow */}
            <div>
              <div className="font-condensed font-700 text-[10px] tracking-widest uppercase text-[#F5C842] mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-[#C41E3A]" /> Follow NWCA
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: "YouTube", url: "https://www.youtube.com/@NWCAWrestling", color: "#FF0000" },
                  { name: "Instagram", url: "https://www.instagram.com/nwcawrestling", color: "#E1306C" },
                  { name: "Facebook", url: "https://www.facebook.com/NWCAWrestling", color: "#1877F2" },
                  { name: "X / Twitter", url: "https://twitter.com/NWCAWrestling", color: "#1DA1F2" },
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 bg-[#222b3d] hover:bg-white/5 border border-white/5 hover:border-white/15 font-condensed font-700 text-xs tracking-widest uppercase text-[#d0d5de] hover:text-[#C41E3A] transition-all"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ── FOOTER ──────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
