/**
 * DivisionPage — Shared template for all 12 NWCA division pages
 *
 * Design: Dark navy header with division identity, then tabbed content sections
 * for news, rankings, teams, results, and archive — all rendered inline on the
 * same page, division-specific data only.
 *
 * Color philosophy: Dark navy (#0A1628) hero, light gray (#F4F5F7) body,
 * gold (#F5C842) eyebrow labels, red (#C41E3A) primary CTAs.
 */

import { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

// ── Division data ──────────────────────────────────────────────────────────────
interface NewsItem {
  headline: string;
  url: string;
  date?: string;
}

interface TeamItem {
  name: string;
  conference?: string;
  url?: string;
}

interface ResultItem {
  event: string;
  date: string;
  url?: string;
  description?: string;
}

interface RankingEntry {
  rank: number;
  team: string;
  record?: string;
  points?: string;
}

interface ArchiveEntry {
  season: string;
  champion?: string;
  url?: string;
}

interface DivisionData {
  slug: string;
  title: string;
  shortName: string;
  gender: "men" | "women";
  description: string;
  legacyUrl: string;
  color: string;
  news: NewsItem[];
  teams: TeamItem[];
  rankings: RankingEntry[];
  results2425: ResultItem[];
  results2324: ResultItem[];
  archive: ArchiveEntry[];
  // Extra tabs for divisions that have them
  extraLinks?: { label: string; url: string }[];
}

const DIVISIONS: Record<string, DivisionData> = {
  "ncaa-d1-men": {
    slug: "ncaa-d1-men",
    title: "NCAA Division I Men",
    shortName: "NCAA D1 Men",
    gender: "men",
    description:
      "The premier level of collegiate wrestling in the United States. NCAA Division I programs represent the highest level of competition, scholarship opportunities, and national visibility for men's wrestling.",
    legacyUrl: "https://nwcaonline.com/sports/ncaa-division-1-men",
    color: "#1a3a6e",
    news: [
      { headline: "Pat Santoro to Step Away from Men's Wrestling Head Coaching Position; Brad Dillon Named Head Coach", url: "/news/pat-santoro-to-step-away-from-men-s-wrestling-head-coaching-position-brad-dillon-04-named-head-coach", date: "Jun 25, 2026" },
      { headline: "The Citadel Announces Tim McCall as Wrestling Head Coach", url: "/news/the-citadel-announces-tim-mccall-as-wrestling-head-coach", date: "May 26, 2026" },
      { headline: "Kevin Dresser Named ISU's Director of Men's Wrestling", url: "/news/kevin-dresser-named-isu-director-of-mens-wrestling", date: "Apr 16, 2026" },
      { headline: "NWCA Announces NCAA D1 Men's Team Scholar-Athlete Award Winners", url: "/news/nwca-announces-ncaa-d1-mens-team-scholar-athlete-award-winners", date: "Apr 6, 2026" },
    ],
    rankings: [
      { rank: 1, team: "Penn State", record: "18-0", points: "152.0" },
      { rank: 2, team: "Iowa", record: "16-1", points: "138.5" },
      { rank: 3, team: "Ohio State", record: "15-2", points: "121.0" },
      { rank: 4, team: "Cornell", record: "14-2", points: "108.5" },
      { rank: 5, team: "Missouri", record: "14-3", points: "97.0" },
      { rank: 6, team: "NC State", record: "13-3", points: "89.5" },
      { rank: 7, team: "Oklahoma State", record: "13-4", points: "82.0" },
      { rank: 8, team: "Michigan", record: "12-4", points: "74.5" },
      { rank: 9, team: "Arizona State", record: "12-5", points: "67.0" },
      { rank: 10, team: "Virginia Tech", record: "11-5", points: "61.5" },
    ],
    teams: [
      { name: "Penn State", conference: "Big Ten" },
      { name: "Iowa", conference: "Big Ten" },
      { name: "Ohio State", conference: "Big Ten" },
      { name: "Cornell", conference: "EIWA" },
      { name: "Missouri", conference: "Big 12" },
      { name: "NC State", conference: "ACC" },
      { name: "Oklahoma State", conference: "Big 12" },
      { name: "Michigan", conference: "Big Ten" },
      { name: "Arizona State", conference: "Pac-12" },
      { name: "Virginia Tech", conference: "ACC" },
      { name: "Lehigh", conference: "EIWA" },
      { name: "Princeton", conference: "EIWA" },
    ],
    results2425: [
      { event: "NCAA Division I Championships", date: "Mar 20–22, 2025", description: "Penn State wins team title for the 10th time", url: "https://nwcaonline.com/sports/2024/12/5/ncaa-d1-mens-2024-25-results.aspx" },
      { event: "NWCA National Duals", date: "Jan 17–18, 2025", description: "Team competition results", url: "https://nwcaonline.com/sports/2024/12/5/ncaa-d1-mens-2024-25-results.aspx" },
    ],
    results2324: [
      { event: "NCAA Division I Championships", date: "Mar 21–23, 2024", description: "Penn State wins team title", url: "https://nwcaonline.com/sports/2024/6/25/ncaa-d1-mens-2023-24-results.aspx" },
      { event: "NWCA National Duals", date: "Jan 19–20, 2024", description: "Team competition results", url: "https://nwcaonline.com/sports/2024/6/25/ncaa-d1-mens-2023-24-results.aspx" },
    ],
    archive: [
      { season: "2023–24", champion: "Penn State", url: "https://nwcaonline.com/sports/2023/11/9/ncaa-division-i-mens-archive.aspx" },
      { season: "2022–23", champion: "Penn State", url: "https://nwcaonline.com/sports/2023/11/9/ncaa-division-i-mens-archive.aspx" },
      { season: "2021–22", champion: "Penn State", url: "https://nwcaonline.com/sports/2023/11/9/ncaa-division-i-mens-archive.aspx" },
      { season: "2019–20", champion: "Iowa (cancelled — COVID)", url: "https://nwcaonline.com/sports/2023/11/9/ncaa-division-i-mens-archive.aspx" },
      { season: "2018–19", champion: "Penn State", url: "https://nwcaonline.com/sports/2023/11/9/ncaa-division-i-mens-archive.aspx" },
    ],
  },
  "ncaa-d2-men": {
    slug: "ncaa-d2-men",
    title: "NCAA Division II Men",
    shortName: "NCAA D2 Men",
    gender: "men",
    description:
      "NCAA Division II men's wrestling offers a strong balance of competitive athletics and academic achievement. Programs across the country compete for national championships while providing scholarship opportunities for student-athletes.",
    legacyUrl: "https://nwcaonline.com/sports/ncaa-division-2-men",
    color: "#1a3a6e",
    news: [
      { headline: "Coker Names Korenoski Head Wrestling Coach", url: "/news/coker-names-korenoski-head-wrestling-coach", date: "Jun 2, 2026" },
      { headline: "Breese Named Head Wrestling Coach at Slippery Rock", url: "/news/breese-named-head-wrestling-coach-at-slippery-rock", date: "Jun 2, 2026" },
      { headline: "Christian Komitas Named New Jamestown Men's Wrestling Head Coach", url: "/news/christian-komitas-named-new-jamestown-men-s-wrestling-head-coach", date: "May 11, 2026" },
      { headline: "Cal Poly Humboldt Names Anthony Mancini Head Men's Wrestling Coach", url: "/news/cal-poly-humboldt-names-anthony-mancini-head-men-s-wrestling-coach", date: "May 8, 2026" },
      { headline: "Drury Wrestling Names Walker Head Coach", url: "/news/drury-wrestling-names-walker-head-coach", date: "Apr 13, 2026" },
    ],
    rankings: [
      { rank: 1, team: "Colorado Mesa", points: "98.0" },
      { rank: 2, team: "Augustana (SD)", points: "87.5" },
      { rank: 3, team: "Notre Dame (OH)", points: "76.0" },
      { rank: 4, team: "Drury", points: "68.5" },
      { rank: 5, team: "Findlay", points: "61.0" },
    ],
    teams: [
      { name: "Colorado Mesa", conference: "RMAC" },
      { name: "Augustana (SD)", conference: "NSIC" },
      { name: "Notre Dame (OH)", conference: "G-MAC" },
      { name: "Drury", conference: "GLVC" },
      { name: "Findlay", conference: "G-MAC" },
      { name: "Slippery Rock", conference: "PSAC" },
    ],
    results2425: [
      { event: "NCAA Division II Championships", date: "Mar 2025", description: "Full results available on nwcaonline.com", url: "https://nwcaonline.com/sports/2024/12/5/ncaa-d2-mens-2024-25-results.aspx" },
    ],
    results2324: [
      { event: "NCAA Division II Championships", date: "Mar 2024", description: "Full results available on nwcaonline.com", url: "https://nwcaonline.com/sports/2024/6/25/ncaa-d2-mens-2023-24-results.aspx" },
    ],
    archive: [
      { season: "2023–24", url: "https://nwcaonline.com/sports/2023/4/6/ncaa-division-ii-archive.aspx" },
      { season: "2022–23", url: "https://nwcaonline.com/sports/2023/4/6/ncaa-division-ii-archive.aspx" },
      { season: "2021–22", url: "https://nwcaonline.com/sports/2023/4/6/ncaa-division-ii-archive.aspx" },
    ],
    extraLinks: [{ label: "Jim Koch D2 Hall of Fame", url: "https://nwcaonline.com/sports/2023/4/23/ncaa-division-ii-men-JKHOF.aspx" }],
  },
  "ncaa-d3-men": {
    slug: "ncaa-d3-men",
    title: "NCAA Division III Men",
    shortName: "NCAA D3 Men",
    gender: "men",
    description:
      "NCAA Division III men's wrestling emphasizes the student-athlete experience, with a focus on academic excellence and competitive athletics without athletic scholarships. D3 programs offer a rich wrestling tradition across hundreds of institutions.",
    legacyUrl: "https://nwcaonline.com/sports/ncaa-division-3-men",
    color: "#1a3a6e",
    news: [],
    rankings: [
      { rank: 1, team: "Messiah", points: "112.0" },
      { rank: 2, team: "Wartburg", points: "98.5" },
      { rank: 3, team: "Augsburg", points: "87.0" },
      { rank: 4, team: "Stevens Tech", points: "74.5" },
      { rank: 5, team: "Ithaca", points: "63.0" },
    ],
    teams: [
      { name: "Messiah", conference: "MAC" },
      { name: "Wartburg", conference: "ARC" },
      { name: "Augsburg", conference: "MIAC" },
      { name: "Stevens Tech", conference: "MAC" },
      { name: "Ithaca", conference: "Empire 8" },
    ],
    results2425: [
      { event: "NCAA Division III Championships", date: "Mar 2025", description: "Full results available on nwcaonline.com", url: "https://nwcaonline.com/sports/2024/12/5/ncaa-d3-mens-2024-25-results.aspx" },
    ],
    results2324: [
      { event: "NCAA Division III Championships", date: "Mar 2024", description: "Full results available on nwcaonline.com", url: "https://nwcaonline.com/sports/2024/6/25/ncaa-d3-mens-2023-24-results.aspx" },
    ],
    archive: [
      { season: "2023–24", url: "https://nwcaonline.com/sports/2023/11/9/ncaa-division-iii-mens-archive.aspx" },
      { season: "2022–23", url: "https://nwcaonline.com/sports/2023/11/9/ncaa-division-iii-mens-archive.aspx" },
    ],
  },
  "naia-men": {
    slug: "naia-men",
    title: "NAIA Men",
    shortName: "NAIA Men",
    gender: "men",
    description:
      "The National Association of Intercollegiate Athletics (NAIA) men's wrestling division provides competitive opportunities for student-athletes at smaller colleges and universities, with a strong tradition of championship competition.",
    legacyUrl: "https://nwcaonline.com/sports/naia-men",
    color: "#1a3a6e",
    news: [],
    rankings: [
      { rank: 1, team: "Grand View", points: "145.0" },
      { rank: 2, team: "Lindsey Wilson", points: "128.5" },
      { rank: 3, team: "Life", points: "112.0" },
      { rank: 4, team: "Embry-Riddle", points: "97.5" },
      { rank: 5, team: "Indiana Tech", points: "83.0" },
    ],
    teams: [
      { name: "Grand View", conference: "MCAC" },
      { name: "Lindsey Wilson", conference: "MSC" },
      { name: "Life", conference: "SAC" },
      { name: "Embry-Riddle", conference: "Sun Conference" },
      { name: "Indiana Tech", conference: "Wolverine-Hoosier" },
    ],
    results2425: [
      { event: "NAIA Championships", date: "Mar 2025", description: "Full results available on nwcaonline.com", url: "https://nwcaonline.com/sports/2024/12/5/naia-mens-2024-25-results.aspx" },
    ],
    results2324: [
      { event: "NAIA Championships", date: "Mar 2024", description: "Full results available on nwcaonline.com", url: "https://nwcaonline.com/sports/2024/6/25/naia-mens-2023-24-results.aspx" },
    ],
    archive: [
      { season: "2023–24", url: "https://nwcaonline.com/sports/2023/11/9/naia-mens-archive.aspx" },
      { season: "2022–23", url: "https://nwcaonline.com/sports/2023/11/9/naia-mens-archive.aspx" },
    ],
  },
  "njcaa-men": {
    slug: "njcaa-men",
    title: "NJCAA Men",
    shortName: "NJCAA Men",
    gender: "men",
    description:
      "The National Junior College Athletic Association (NJCAA) men's wrestling division serves two-year community and junior colleges, providing a competitive pathway and scholarship opportunities for student-athletes.",
    legacyUrl: "https://nwcaonline.com/sports/njcaa-men",
    color: "#1a3a6e",
    news: [
      { headline: "Northland Taps Storm Booe to Lead Men's Wrestling Program", url: "/news/northland-taps-storm-booe-to-lead-men-s-wrestling-program", date: "Jun 5, 2026" },
      { headline: "Northampton Names Former Lehigh University Standout as Wrestling Coach", url: "/news/northampton-names-former-lehigh-university-standout-as-wrestling-coach", date: "May 26, 2026" },
      { headline: "Fort Hays Tech Northwest Promotes Barrett Stickelman to Head Men's Wrestling Coach", url: "/news/fort-hays-tech-northwest-promotes-barrett-stickelman-to-head-men-s-wrestling-coach", date: "May 8, 2026" },
      { headline: "WVU Potomac State College Announces Hiring of First Head Men's Wrestling Coach", url: "/news/wvu-potomac-state-college-announces-hiring-of-first-head-men-s-wrestling-coach-in-program-history", date: "Apr 7, 2026" },
      { headline: "NWCA Announces NJCAA Men's Team Scholar-Athlete Award Winners", url: "/news/nwca-announces-njcaa-mens-team-scholar-athlete-award-winners", date: "Mar 20, 2026" },
    ],
    rankings: [
      { rank: 1, team: "Iowa Central", points: "98.0" },
      { rank: 2, team: "Ellsworth", points: "87.0" },
      { rank: 3, team: "Northampton", points: "76.5" },
      { rank: 4, team: "Northeastern Oklahoma A&M", points: "65.0" },
      { rank: 5, team: "Cowley College", points: "54.5" },
    ],
    teams: [
      { name: "Iowa Central", conference: "ICCAC" },
      { name: "Ellsworth", conference: "ICCAC" },
      { name: "Northampton", conference: "NJCAA" },
      { name: "Northeastern Oklahoma A&M", conference: "NJCAA" },
      { name: "Cowley College", conference: "KJCCC" },
    ],
    results2425: [
      { event: "NJCAA Championships", date: "Mar 2025", description: "Full results available on nwcaonline.com", url: "https://nwcaonline.com/sports/2024/12/5/njcaa-mens-2024-25-results.aspx" },
    ],
    results2324: [
      { event: "NJCAA Championships", date: "Mar 2024", description: "Full results available on nwcaonline.com", url: "https://nwcaonline.com/sports/2024/6/25/njcaa-mens-2023-24-results.aspx" },
    ],
    archive: [
      { season: "2023–24", url: "https://nwcaonline.com/sports/2023/11/9/njcaa-mens-archive.aspx" },
      { season: "2022–23", url: "https://nwcaonline.com/sports/2023/11/9/njcaa-mens-archive.aspx" },
    ],
  },
  "ncwa-men": {
    slug: "ncwa-men",
    title: "NCWA Men",
    shortName: "NCWA Men",
    gender: "men",
    description:
      "The National Collegiate Wrestling Association (NCWA) serves club wrestling programs at colleges and universities across the country, providing competitive opportunities for student-athletes outside the NCAA and NAIA framework.",
    legacyUrl: "https://nwcaonline.com/sports/ncwa-men",
    color: "#1a3a6e",
    news: [],
    rankings: [],
    teams: [
      { name: "View all NCWA teams", url: "https://ncwa.net/teams" },
    ],
    results2425: [],
    results2324: [],
    archive: [
      { season: "Archive", url: "https://nwcaonline.com/sports/2023/11/9/ncwa-mens-archive.aspx" },
    ],
    extraLinks: [{ label: "NCWA Official Site", url: "https://ncwa.net" }],
  },
  "cccaa-men": {
    slug: "cccaa-men",
    title: "CCCAA Men",
    shortName: "CCCAA Men",
    gender: "men",
    description:
      "The California Community College Athletic Association (CCCAA) men's wrestling division serves California's community college system, one of the largest community college athletic programs in the nation.",
    legacyUrl: "https://nwcaonline.com/sports/cccaa-men",
    color: "#1a3a6e",
    news: [],
    rankings: [],
    teams: [],
    results2425: [],
    results2324: [],
    archive: [],
  },
  "ncaa-women": {
    slug: "ncaa-women",
    title: "NCAA Women",
    shortName: "NCAA Women",
    gender: "women",
    description:
      "NCAA Women's wrestling is one of the fastest-growing sports in collegiate athletics. Programs at all three NCAA divisions are expanding rapidly, providing unprecedented opportunities for female student-athletes to compete at the highest level.",
    legacyUrl: "https://nwcaonline.com/sports/ncaa-women",
    color: "#8B1A3A",
    news: [],
    rankings: [
      { rank: 1, team: "McKendree", points: "132.0" },
      { rank: 2, team: "Campbellsville", points: "118.5" },
      { rank: 3, team: "King (TN)", points: "104.0" },
      { rank: 4, team: "Iowa", points: "91.5" },
      { rank: 5, team: "Presbyterian", points: "78.0" },
    ],
    teams: [
      { name: "McKendree", conference: "GLVC" },
      { name: "Campbellsville", conference: "MSC" },
      { name: "King (TN)", conference: "SAC" },
      { name: "Iowa", conference: "Big Ten" },
      { name: "Presbyterian", conference: "Big South" },
    ],
    results2425: [
      { event: "NCAA Women's Championships", date: "Mar 2025", description: "Full results available on nwcaonline.com", url: "https://nwcaonline.com/sports/2024/12/5/ncaa-womens-2024-25-results.aspx" },
    ],
    results2324: [
      { event: "NCAA Women's Championships", date: "Mar 2024", description: "Full results available on nwcaonline.com", url: "https://nwcaonline.com/sports/2024/6/25/ncaa-womens-2023-24-results.aspx" },
    ],
    archive: [
      { season: "2023–24", url: "https://nwcaonline.com/sports/2023/11/9/ncaa-womens-archive.aspx" },
      { season: "2022–23", url: "https://nwcaonline.com/sports/2023/11/9/ncaa-womens-archive.aspx" },
    ],
  },
  "naia-women": {
    slug: "naia-women",
    title: "NAIA Women",
    shortName: "NAIA Women",
    gender: "women",
    description:
      "NAIA Women's wrestling is a growing division offering competitive opportunities for female student-athletes at smaller colleges and universities. The division has seen rapid expansion as more programs add women's wrestling.",
    legacyUrl: "https://nwcaonline.com/sports/naia-women",
    color: "#8B1A3A",
    news: [
      { headline: "Montgomery & Randall Honored with 2026 Trailblazer Awards", url: "/news/2026-nwca-trailblazer-awards", date: "Jun 18, 2026" },
    ],
    rankings: [
      { rank: 1, team: "Grand View", points: "118.0" },
      { rank: 2, team: "Lindsey Wilson", points: "104.5" },
      { rank: 3, team: "Life", points: "91.0" },
      { rank: 4, team: "Indiana Tech", points: "78.5" },
      { rank: 5, team: "Wayland Baptist", points: "65.0" },
    ],
    teams: [
      { name: "Grand View", conference: "MCAC" },
      { name: "Lindsey Wilson", conference: "MSC" },
      { name: "Life", conference: "SAC" },
      { name: "Indiana Tech", conference: "Wolverine-Hoosier" },
      { name: "Wayland Baptist", conference: "Red River" },
    ],
    results2425: [],
    results2324: [],
    archive: [],
  },
  "njcaa-women": {
    slug: "njcaa-women",
    title: "NJCAA Women",
    shortName: "NJCAA Women",
    gender: "women",
    description:
      "NJCAA Women's wrestling provides competitive opportunities for female student-athletes at two-year community and junior colleges. The division is expanding rapidly as more schools add women's wrestling programs.",
    legacyUrl: "https://nwcaonline.com/sports/njcaa-women",
    color: "#8B1A3A",
    news: [
      { headline: "Big Bend Names Shannon Workinger Head Women's Wrestling Coach", url: "/news/big-bend-names-shannon-workinger-head-women-s-wrestling-coach", date: "Jun 19, 2026" },
      { headline: "Montgomery & Randall Honored with 2026 Trailblazer Awards", url: "/news/2026-nwca-trailblazer-awards", date: "Jun 18, 2026" },
      { headline: "Northampton Names Former Lehigh University Standout as Wrestling Coach", url: "/news/northampton-names-former-lehigh-university-standout-as-wrestling-coach", date: "May 26, 2026" },
      { headline: "SUNY Niagara to Start Women's Wrestling Program in 2026–27", url: "/news/suny-niagara-to-start-womens-wrestling-program-2026-27", date: "Apr 10, 2026" },
      { headline: "NWCA Announces NJCAA Women's Team Scholar-Athlete Award Winners", url: "/news/nwca-announces-njcaa-womens-team-scholar-athlete-award-winners", date: "Mar 20, 2026" },
    ],
    rankings: [
      { rank: 1, team: "Iowa Central", points: "88.0" },
      { rank: 2, team: "Ellsworth", points: "76.5" },
      { rank: 3, team: "Northampton", points: "65.0" },
      { rank: 4, team: "Cowley College", points: "54.5" },
      { rank: 5, team: "Cloud County", points: "44.0" },
    ],
    teams: [
      { name: "Iowa Central", conference: "ICCAC" },
      { name: "Ellsworth", conference: "ICCAC" },
      { name: "Northampton", conference: "NJCAA" },
      { name: "Cowley College", conference: "KJCCC" },
      { name: "Cloud County", conference: "KJCCC" },
    ],
    results2425: [
      { event: "NJCAA Women's Championships", date: "Mar 2025", description: "Full results available on nwcaonline.com", url: "https://nwcaonline.com/sports/2024/12/5/njcaa-womens-2024-25-results.aspx" },
    ],
    results2324: [
      { event: "NJCAA Women's Championships", date: "Mar 2024", description: "Full results available on nwcaonline.com", url: "https://nwcaonline.com/sports/2024/6/25/njcaa-womens-2023-24-results.aspx" },
    ],
    archive: [
      { season: "2023–24", url: "https://nwcaonline.com/sports/2023/11/9/njcaa-womens-archive.aspx" },
      { season: "2022–23", url: "https://nwcaonline.com/sports/2023/11/9/njcaa-womens-archive.aspx" },
    ],
  },
  "ncwa-women": {
    slug: "ncwa-women",
    title: "NCWA Women",
    shortName: "NCWA Women",
    gender: "women",
    description:
      "NCWA Women's wrestling serves club wrestling programs at colleges and universities, providing competitive opportunities for female student-athletes outside the NCAA and NAIA framework.",
    legacyUrl: "https://nwcaonline.com/sports/ncwa-women",
    color: "#8B1A3A",
    news: [],
    rankings: [],
    teams: [
      { name: "View all NCWA teams", url: "https://ncwa.net/teams" },
    ],
    results2425: [],
    results2324: [],
    archive: [
      { season: "Archive", url: "https://nwcaonline.com/sports/2023/11/9/ncwa-womens-archive.aspx" },
    ],
    extraLinks: [{ label: "NCWA Official Site", url: "https://ncwa.net" }],
  },
  "cccaa-women": {
    slug: "cccaa-women",
    title: "CCCAA Women",
    shortName: "CCCAA Women",
    gender: "women",
    description:
      "CCCAA Women's wrestling serves California's community college system, providing competitive opportunities for female student-athletes in one of the nation's largest community college athletic programs.",
    legacyUrl: "https://nwcaonline.com/sports/cccaa-women",
    color: "#8B1A3A",
    news: [],
    rankings: [],
    teams: [
      { name: "View all CCCAA teams", url: "https://nwcaonline.com/sports/2023/3/28/CCCAA_Womens-Teams.aspx" },
    ],
    results2425: [
      { event: "CCCAA Women's Championships 2025", date: "Mar 2025", description: "Full results available on nwcaonline.com", url: "https://nwcaonline.com/sports/2024/12/5/3c2a-womens-2024-25-results.aspx" },
    ],
    results2324: [],
    archive: [
      { season: "Archive", url: "https://nwcaonline.com/sports/2023/11/9/cccaa-womens-archive.aspx" },
    ],
  },
};

// ── Tab definitions ────────────────────────────────────────────────────────────
type TabId = "news" | "rankings" | "teams" | "results2425" | "results2324" | "archive";

const TABS: { id: TabId; label: string }[] = [
  { id: "news", label: "News & Stories" },
  { id: "rankings", label: "Rankings" },
  { id: "teams", label: "Teams" },
  { id: "results2425", label: "2024–25 Results" },
  { id: "results2324", label: "2023–24 Results" },
  { id: "archive", label: "Archive" },
];

// ── Page Component ─────────────────────────────────────────────────────────────
interface DivisionPageProps {
  slug: string;
}

export default function DivisionPage({ slug }: DivisionPageProps) {
  const division = DIVISIONS[slug];
  const [activeTab, setActiveTab] = useState<TabId>("news");

  if (!division) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
        <NavBar solid />
        <div className="text-center text-white">
          <h1 className="font-condensed font-900 text-4xl mb-4">Division Not Found</h1>
          <a href="/" className="text-white hover:underline">Return Home</a>
        </div>
      </div>
    );
  }

  const isWomen = division.gender === "women";
  const accentColor = isWomen ? "bg-[#C41E3A]" : "bg-[#F5C842]";

  return (
    <div className="min-h-screen bg-[#F4F5F7]">
      <NavBar solid />

      {/* ── Hero ── */}
      <section className="bg-[#0A1628] pt-16 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }}
        />
        <div className="max-w-6xl mx-auto px-6 relative">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-white/50 text-xs font-condensed tracking-widest uppercase">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <span>Division Sites</span>
            <span>/</span>
            <span className="text-[#F5C842]">{division.shortName}</span>
          </div>

          <div className="flex items-start justify-between gap-8 flex-wrap">
            <div>
              {/* Gender badge */}
              <div className="inline-flex items-center gap-2 mb-4">
                <div className={`w-1 h-6 ${accentColor}`} />
                <span className={`font-condensed font-700 text-xs tracking-[0.2em] uppercase ${isWomen ? "text-white" : "text-[#F5C842]"}`}>
                  {isWomen ? "Women's Division" : "Men's Division"}
                </span>
              </div>
              <h1 className="font-condensed font-900 text-5xl md:text-6xl text-white uppercase leading-none mb-4">
                {division.title}
              </h1>
              <p className="font-body text-[#c8cdd6] text-lg max-w-2xl leading-relaxed">
                {division.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tab Bar ── */}
      <section className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-none">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-5 py-4 font-condensed font-700 text-xs tracking-widest uppercase border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? `border-[#C41E3A] text-[#0A1628]`
                    : "border-transparent text-[#6b7280] hover:text-[#0A1628] hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
            {/* Extra links for divisions that have them (e.g. Hall of Fame, NCWA Official Site) */}
            {division.extraLinks?.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="flex-shrink-0 px-5 py-4 font-condensed font-700 text-xs tracking-widest uppercase border-b-2 border-transparent text-[#6b7280] hover:text-[#0A1628] hover:border-gray-300 transition-all whitespace-nowrap"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tab Content ── */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content */}
          <div className="lg:col-span-2">

            {/* NEWS & STORIES */}
            {activeTab === "news" && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-1 h-5 ${accentColor}`} />
                  <h2 className="font-condensed font-900 text-2xl text-[#0A1628] uppercase tracking-wide">
                    Latest News — {division.shortName}
                  </h2>
                </div>
                {division.news.length > 0 ? (
                  <div className="space-y-4">
                    {division.news.map((item, i) => (
                      <a
                        key={i}
                        href={item.url}
                        className="block bg-white p-5 shadow-sm hover:shadow-md border border-gray-100 hover:border-[#C41E3A]/30 transition-all group"
                      >
                        <div className="flex items-start gap-4">
                          <div className={`flex-shrink-0 w-1 self-stretch min-h-[2rem] ${accentColor} mt-1`} />
                          <div>
                            {item.date && (
                              <span className="font-condensed font-600 text-xs tracking-widest uppercase text-[#6b7280] mb-1 block">{item.date}</span>
                            )}
                            <h3 className="font-condensed font-700 text-base text-[#0A1628] group-hover:text-[#C41E3A] transition-colors leading-snug">
                              {item.headline}
                            </h3>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    message={`No recent news for ${division.title}. Check back soon.`}
                  />
                )}
              </div>
            )}

            {/* RANKINGS */}
            {activeTab === "rankings" && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-1 h-5 ${accentColor}`} />
                  <h2 className="font-condensed font-900 text-2xl text-[#0A1628] uppercase tracking-wide">
                    Rankings — {division.shortName}
                  </h2>
                </div>
                {division.rankings.length > 0 ? (
                  <div className="bg-white shadow-sm border border-gray-100 overflow-hidden">
                    <div className="grid grid-cols-12 px-5 py-3 bg-[#0A1628] text-white">
                      <div className="col-span-1 font-condensed text-[10px] tracking-widest uppercase">#</div>
                      <div className="col-span-7 font-condensed text-[10px] tracking-widest uppercase">Team</div>
                      <div className="col-span-2 font-condensed text-[10px] tracking-widest uppercase">Record</div>
                      <div className="col-span-2 font-condensed text-[10px] tracking-widest uppercase text-right">Pts</div>
                    </div>
                    {division.rankings.map((entry, i) => (
                      <div
                        key={i}
                        className={`grid grid-cols-12 px-5 py-3.5 border-b border-gray-100 last:border-0 items-center ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                      >
                        <div className="col-span-1 font-condensed font-700 text-sm text-[#0A1628]">{entry.rank}</div>
                        <div className="col-span-7 font-condensed font-700 text-sm text-[#0A1628]">{entry.team}</div>
                        <div className="col-span-2 font-body text-xs text-[#6b7280]">{entry.record || "—"}</div>
                        <div className="col-span-2 font-mono text-xs text-[#0A1628] font-semibold text-right">{entry.points || "—"}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    message={`Rankings for ${division.title} are not yet available. Check the full division page for the latest.`}
                  />
                )}
              </div>
            )}

            {/* TEAMS */}
            {activeTab === "teams" && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-1 h-5 ${accentColor}`} />
                  <h2 className="font-condensed font-900 text-2xl text-[#0A1628] uppercase tracking-wide">
                    Teams — {division.shortName}
                  </h2>
                </div>
                {division.teams.length > 0 ? (
                  <div className="bg-white shadow-sm border border-gray-100 overflow-hidden">
                    <div className="grid grid-cols-2 px-5 py-3 bg-[#0A1628] text-white">
                      <div className="font-condensed text-[10px] tracking-widest uppercase">Team</div>
                      <div className="font-condensed text-[10px] tracking-widest uppercase">Conference</div>
                    </div>
                    {division.teams.map((team, i) => (
                      <div
                        key={i}
                        className={`grid grid-cols-2 px-5 py-3.5 border-b border-gray-100 last:border-0 items-center ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                      >
                        <div className="font-condensed font-700 text-sm text-[#0A1628]">
                          {team.url ? (
                            <a href={team.url} target="_blank" rel="noreferrer" className="hover:text-[#C41E3A] transition-colors">
                              {team.name} ↗
                            </a>
                          ) : team.name}
                        </div>
                        <div className="font-body text-xs text-[#6b7280]">{team.conference || "—"}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    message={`Team listings for ${division.title} are maintained on the official NWCA division page.`}
                  />
                )}
              </div>
            )}

            {/* 2024–25 RESULTS */}
            {activeTab === "results2425" && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-1 h-5 ${accentColor}`} />
                  <h2 className="font-condensed font-900 text-2xl text-[#0A1628] uppercase tracking-wide">
                    2024–25 Results — {division.shortName}
                  </h2>
                </div>
                <ResultsList items={division.results2425} division={division} />
              </div>
            )}

            {/* 2023–24 RESULTS */}
            {activeTab === "results2324" && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-1 h-5 ${accentColor}`} />
                  <h2 className="font-condensed font-900 text-2xl text-[#0A1628] uppercase tracking-wide">
                    2023–24 Results — {division.shortName}
                  </h2>
                </div>
                <ResultsList items={division.results2324} division={division} />
              </div>
            )}

            {/* ARCHIVE */}
            {activeTab === "archive" && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-1 h-5 ${accentColor}`} />
                  <h2 className="font-condensed font-900 text-2xl text-[#0A1628] uppercase tracking-wide">
                    Archive — {division.shortName}
                  </h2>
                </div>
                {division.archive.length > 0 ? (
                  <div className="space-y-3">
                    {division.archive.map((entry, i) => (
                      <a
                        key={i}
                        href={entry.url || division.legacyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between bg-white p-5 shadow-sm border border-gray-100 hover:border-[#C41E3A]/30 hover:shadow-md transition-all group"
                      >
                        <div>
                          <div className="font-condensed font-700 text-base text-[#0A1628] group-hover:text-[#C41E3A] transition-colors">
                            {entry.season}
                          </div>
                          {entry.champion && (
                            <div className="font-body text-xs text-[#6b7280] mt-0.5">Champion: {entry.champion}</div>
                          )}
                        </div>
                        <span className="text-gray-300 group-hover:text-[#C41E3A] transition-colors text-sm">→</span>
                      </a>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    message={`Archive records for ${division.title} are available on the official NWCA division page.`}
                  />
                )}
              </div>
            )}

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/*
              ============================================================
              AD UNIT — SIDEBAR (300×250 + 300×600)
              To swap in a live ad:
                Option A – Image ad: replace the placeholder div with an
                           <a href="..."><img src="..." /></a> block.
                Option B – Ad network (Google AdSense, etc.): remove the
                           placeholder divs and paste your <ins> or <script>
                           tag(s) here.
              Standard IAB sizes used: 300×250 (medium rectangle)
                                       300×600 (half page)
              ============================================================
            */}

            {/* Ad Unit — 300×250 Medium Rectangle */}
            <div className="w-full" style={{ maxWidth: '100%' }}>
              <a href="#" target="_blank" rel="noreferrer sponsored" aria-label="Advertisement" className="block">
                <div
                  className="flex flex-col items-center justify-center bg-gray-100 border border-dashed border-gray-300 text-gray-400 select-none"
                  style={{ width: '100%', height: 250 }}
                >
                  <span className="font-condensed font-700 text-xs tracking-widest uppercase mb-1">Advertisement</span>
                  <span className="font-body text-[11px]">300 × 250</span>
                </div>
              </a>
            </div>

            {/* Ad Unit — 300×600 Half Page */}
            <div className="w-full" style={{ maxWidth: '100%' }}>
              <a href="#" target="_blank" rel="noreferrer sponsored" aria-label="Advertisement" className="block">
                <div
                  className="flex flex-col items-center justify-center bg-gray-100 border border-dashed border-gray-300 text-gray-400 select-none"
                  style={{ width: '100%', height: 600 }}
                >
                  <span className="font-condensed font-700 text-xs tracking-widest uppercase mb-1">Advertisement</span>
                  <span className="font-body text-[11px]">300 × 600</span>
                </div>
              </a>
            </div>

            {/* NWCA Membership CTA */}
            <div className="bg-[#0A1628] p-6 text-white">
              <div className="text-[#F5C842] font-condensed font-700 text-xs tracking-widest uppercase mb-3">NWCA Membership</div>
              <h3 className="font-condensed font-900 text-xl uppercase mb-3 leading-tight">Join the NWCA Today</h3>
              <p className="font-body text-white/70 text-sm mb-4 leading-relaxed">
                Access resources, professional development, and the community that supports coaches at every level.
              </p>
              <a
                href="/join"
                className="block w-full text-center py-2.5 bg-[#C41E3A] text-white font-condensed font-700 text-xs tracking-widest uppercase hover:bg-[#a01830] transition-colors"
              >
                Join Now →
              </a>
            </div>

            {/* Other Divisions */}
            <div className="bg-white p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-4 bg-[#F5C842]" />
                <h3 className="font-condensed font-700 text-sm tracking-widest uppercase text-[#0A1628]">Other Divisions</h3>
              </div>
              <div className="space-y-1">
                {[
                  { label: "NCAA D1 Men", slug: "ncaa-d1-men" },
                  { label: "NCAA D2 Men", slug: "ncaa-d2-men" },
                  { label: "NCAA D3 Men", slug: "ncaa-d3-men" },
                  { label: "NAIA Men", slug: "naia-men" },
                  { label: "NJCAA Men", slug: "njcaa-men" },
                  { label: "NCWA Men", slug: "ncwa-men" },
                  { label: "CCCAA Men", slug: "cccaa-men" },
                  { label: "NCAA Women", slug: "ncaa-women" },
                  { label: "NAIA Women", slug: "naia-women" },
                  { label: "NJCAA Women", slug: "njcaa-women" },
                  { label: "NCWA Women", slug: "ncwa-women" },
                  { label: "CCCAA Women", slug: "cccaa-women" },
                ]
                  .filter((d) => d.slug !== slug)
                  .map((d) => (
                    <a
                      key={d.slug}
                      href={`/divisions/${d.slug}`}
                      className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0 font-body text-sm text-[#17214B] hover:text-[#F5C842] transition-colors group"
                    >
                      <span>{d.label}</span>
                      <span className="text-gray-300 group-hover:text-[#F5C842] transition-colors">→</span>
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// ── Helper components ──────────────────────────────────────────────────────────

function EmptyState({ message }: { message: string }) {
  return (
    <div className="bg-white p-8 shadow-sm border border-gray-100 text-center">
      <p className="font-body text-[#6b7280]">{message}</p>
    </div>
  );
}

function ResultsList({ items, division }: { items: ResultItem[]; division: DivisionData }) {
  if (items.length === 0) {
    return (
      <EmptyState
        message={`Results for ${division.title} are available on the official NWCA division page.`}
      />
    );
  }
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="bg-white p-5 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-condensed font-700 text-base text-[#0A1628] mb-1">{item.event}</h3>
              <div className="font-condensed text-xs tracking-widest uppercase text-[#6b7280] mb-2">{item.date}</div>
              {item.description && (
                <p className="font-body text-sm text-[#4a5568]">{item.description}</p>
              )}
            </div>
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="flex-shrink-0 inline-flex items-center gap-1 font-condensed font-700 text-xs tracking-widest uppercase text-[#C41E3A] hover:underline"
              >
                View →
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
