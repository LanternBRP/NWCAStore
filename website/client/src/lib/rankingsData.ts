/**
 * Shared Rankings Data — Single Source of Truth
 * ─────────────────────────────────────────────
 * CMS Integration Point: Replace RANKINGS_DATA with a fetch/API call to your
 * CMS endpoint. Both the home page rankings snippet and the full Rankings page
 * import from this file, so updating here updates both simultaneously.
 *
 * Expected CMS shape per division:
 *   { id, label, shortLabel, gender, lastUpdated, pollDate, season,
 *     description, teams[], topRankedIndividuals[], receivingVotes[], sourceUrl? }
 */

export interface TeamRanking {
  rank: number;
  trend: "up" | "down" | "steady" | "new";
  trendAmount?: number;
  institution: string;
  points: number;
  lastRank?: number;
}

export interface IndividualRanking {
  weightClass: string;
  name: string;
  school: string;
}

export interface DivisionData {
  id: string;
  label: string;
  shortLabel: string;
  gender: "men" | "women" | "both";
  lastUpdated: string;
  pollDate: string;
  season: string;
  description: string;
  teams: TeamRanking[];
  topRankedIndividuals: IndividualRanking[];
  receivingVotes: string[];
  sourceUrl?: string;
  cmsNote?: string;
}

// ─── CMS DATA (swap for API call when CMS is ready) ──────────────────────────
export const RANKINGS_DATA: DivisionData[] = [
  {
    id: "ncaa-d1-men",
    label: "NCAA D1 Men",
    shortLabel: "D1 Men",
    gender: "men",
    lastUpdated: "February 2026",
    pollDate: "2026-02-01",
    season: "2025–26",
    description: "The NWCA NCAA Division I Men's Wrestling Coaches Poll, voted on by head coaches across all D1 programs.",
    cmsNote: "CMS: Replace with live D1 Men poll data from rankings API endpoint.",
    teams: [
      { rank: 1, trend: "steady", institution: "Penn State", points: 312, lastRank: 1 },
      { rank: 2, trend: "up", trendAmount: 1, institution: "Iowa", points: 289, lastRank: 3 },
      { rank: 3, trend: "down", trendAmount: 1, institution: "Ohio State", points: 271, lastRank: 2 },
      { rank: 4, trend: "steady", institution: "Missouri", points: 248, lastRank: 4 },
      { rank: 5, trend: "up", trendAmount: 2, institution: "Cornell", points: 221, lastRank: 7 },
      { rank: 6, trend: "down", trendAmount: 1, institution: "NC State", points: 198, lastRank: 5 },
      { rank: 7, trend: "steady", institution: "Oklahoma State", points: 187, lastRank: 7 },
      { rank: 8, trend: "up", trendAmount: 1, institution: "Michigan", points: 174, lastRank: 9 },
      { rank: 9, trend: "down", trendAmount: 2, institution: "Minnesota", points: 162, lastRank: 7 },
      { rank: 10, trend: "steady", institution: "Nebraska", points: 148, lastRank: 10 },
      { rank: 11, trend: "up", trendAmount: 2, institution: "Virginia Tech", points: 131, lastRank: 13 },
      { rank: 12, trend: "steady", institution: "Arizona State", points: 119, lastRank: 12 },
      { rank: 13, trend: "down", trendAmount: 1, institution: "Iowa State", points: 107, lastRank: 12 },
      { rank: 14, trend: "new", institution: "Lehigh", points: 94 },
      { rank: 15, trend: "steady", institution: "Wisconsin", points: 88, lastRank: 15 },
      { rank: 16, trend: "up", trendAmount: 1, institution: "Rutgers", points: 76, lastRank: 17 },
      { rank: 17, trend: "down", trendAmount: 1, institution: "Northwestern", points: 68, lastRank: 16 },
      { rank: 18, trend: "steady", institution: "Princeton", points: 59, lastRank: 18 },
      { rank: 19, trend: "up", trendAmount: 2, institution: "Purdue", points: 51, lastRank: 21 },
      { rank: 20, trend: "steady", institution: "Illinois", points: 44, lastRank: 20 },
    ],
    topRankedIndividuals: [
      { weightClass: "125", name: "TBD", school: "TBD" },
      { weightClass: "133", name: "TBD", school: "TBD" },
      { weightClass: "141", name: "TBD", school: "TBD" },
      { weightClass: "149", name: "TBD", school: "TBD" },
      { weightClass: "157", name: "TBD", school: "TBD" },
      { weightClass: "165", name: "TBD", school: "TBD" },
      { weightClass: "174", name: "TBD", school: "TBD" },
      { weightClass: "184", name: "TBD", school: "TBD" },
      { weightClass: "197", name: "TBD", school: "TBD" },
      { weightClass: "285", name: "TBD", school: "TBD" },
    ],
    receivingVotes: ["Drexel", "Boise State", "South Dakota State", "Campbell", "Lock Haven"],
  },
  {
    id: "ncaa-d2-men",
    label: "NCAA D2 Men",
    shortLabel: "D2 Men",
    gender: "men",
    lastUpdated: "February 2026",
    pollDate: "2026-02-01",
    season: "2025–26",
    description: "The NWCA NCAA Division II Men's Wrestling Coaches Poll.",
    cmsNote: "CMS: Replace with live D2 Men poll data from rankings API endpoint.",
    teams: [
      { rank: 1, trend: "steady", institution: "St. Cloud State", points: 198, lastRank: 1 },
      { rank: 2, trend: "up", trendAmount: 1, institution: "Pitt-Johnstown", points: 176, lastRank: 3 },
      { rank: 3, trend: "down", trendAmount: 1, institution: "Gannon", points: 162, lastRank: 2 },
      { rank: 4, trend: "steady", institution: "West Liberty", points: 148, lastRank: 4 },
      { rank: 5, trend: "up", trendAmount: 1, institution: "Colorado Mesa", points: 134, lastRank: 6 },
      { rank: 6, trend: "down", trendAmount: 1, institution: "Maryville (Mo.)", points: 119, lastRank: 5 },
      { rank: 7, trend: "steady", institution: "Notre Dame (Ohio)", points: 104, lastRank: 7 },
      { rank: 8, trend: "up", trendAmount: 2, institution: "Tiffin", points: 91, lastRank: 10 },
      { rank: 9, trend: "steady", institution: "Seton Hill", points: 78, lastRank: 9 },
      { rank: 10, trend: "down", trendAmount: 2, institution: "Mercyhurst", points: 66, lastRank: 8 },
    ],
    topRankedIndividuals: [],
    receivingVotes: ["Ashland", "McKendree", "Simon Fraser", "Fort Hays State"],
  },
  {
    id: "ncaa-d3-men",
    label: "NCAA D3 Men",
    shortLabel: "D3 Men",
    gender: "men",
    lastUpdated: "February 2026",
    pollDate: "2026-02-01",
    season: "2025–26",
    description: "The NWCA NCAA Division III Men's Wrestling Coaches Poll.",
    cmsNote: "CMS: Replace with live D3 Men poll data from rankings API endpoint.",
    teams: [
      { rank: 1, trend: "steady", institution: "Augsburg", points: 187, lastRank: 1 },
      { rank: 2, trend: "up", trendAmount: 1, institution: "Wartburg", points: 172, lastRank: 3 },
      { rank: 3, trend: "down", trendAmount: 1, institution: "Wisconsin-Whitewater", points: 158, lastRank: 2 },
      { rank: 4, trend: "steady", institution: "Ithaca", points: 143, lastRank: 4 },
      { rank: 5, trend: "up", trendAmount: 2, institution: "Messiah", points: 128, lastRank: 7 },
      { rank: 6, trend: "down", trendAmount: 1, institution: "Elmhurst", points: 114, lastRank: 5 },
      { rank: 7, trend: "steady", institution: "Wesleyan (Conn.)", points: 99, lastRank: 7 },
      { rank: 8, trend: "up", trendAmount: 1, institution: "Wabash", points: 86, lastRank: 9 },
      { rank: 9, trend: "down", trendAmount: 1, institution: "SUNY Cortland", points: 73, lastRank: 8 },
      { rank: 10, trend: "steady", institution: "Loras", points: 61, lastRank: 10 },
    ],
    topRankedIndividuals: [],
    receivingVotes: ["Coe", "Lycoming", "Oneonta", "Bridgewater (Va.)"],
  },
  {
    id: "ncaa-women",
    label: "NCAA Women",
    shortLabel: "NCAA W",
    gender: "women",
    lastUpdated: "January 16, 2026",
    pollDate: "2026-01-16",
    season: "2025–26",
    description: "NCAA Women's Individual Regional Rankings by weight class across 6 regions.",
    sourceUrl: "https://nwcaonline.com/sports/2026/1/16/ncaa-womens-individual-regional-rankings-1-16-2026.aspx",
    teams: [],
    topRankedIndividuals: [
      { weightClass: "103", name: "Aaliyah Payne-Parris", school: "Sacred Heart (Region 1 #1)" },
      { weightClass: "110", name: "Abby Duke", school: "Elmira College (Region 1 #1)" },
      { weightClass: "117", name: "Maddie Ripley", school: "Western New England (Region 1 #1)" },
      { weightClass: "124", name: "Linda Holeman", school: "Western New England (Region 1 #1)" },
      { weightClass: "131", name: "Christina Borgmann", school: "Felician University (Region 1 #1)" },
      { weightClass: "138", name: "Jacklyn Dehney", school: "New England College (Region 1 #1)" },
      { weightClass: "145", name: "Zoey Lints", school: "Elmira College (Region 1 #1)" },
      { weightClass: "160", name: "Love Daley", school: "Sacred Heart (Region 1 #1)" },
    ],
    receivingVotes: [],
    cmsNote: "CMS: Replace with live NCAA Women's Regional Rankings data.",
  },
  {
    id: "naia-men",
    label: "NAIA Men",
    shortLabel: "NAIA M",
    gender: "men",
    lastUpdated: "February 2026",
    pollDate: "2026-02-01",
    season: "2025–26",
    description: "The NWCA NAIA Men's Wrestling Coaches Poll.",
    cmsNote: "CMS: Replace with live NAIA Men poll data from rankings API endpoint.",
    teams: [
      { rank: 1, trend: "steady", institution: "Grand View (Iowa)", points: 241, lastRank: 1 },
      { rank: 2, trend: "steady", institution: "Life (Ga.)", points: 218, lastRank: 2 },
      { rank: 3, trend: "up", trendAmount: 1, institution: "Indiana Tech", points: 196, lastRank: 4 },
      { rank: 4, trend: "down", trendAmount: 1, institution: "Lindsey Wilson (Ky.)", points: 174, lastRank: 3 },
      { rank: 5, trend: "steady", institution: "William Penn (Iowa)", points: 158, lastRank: 5 },
      { rank: 6, trend: "up", trendAmount: 1, institution: "Wayland Baptist (Texas)", points: 141, lastRank: 7 },
      { rank: 7, trend: "down", trendAmount: 1, institution: "Missouri Valley", points: 127, lastRank: 6 },
      { rank: 8, trend: "steady", institution: "Ottawa (Kan.)", points: 112, lastRank: 8 },
      { rank: 9, trend: "up", trendAmount: 2, institution: "Baker (Kan.)", points: 98, lastRank: 11 },
      { rank: 10, trend: "down", trendAmount: 1, institution: "Cumberlands (Ky.)", points: 87, lastRank: 9 },
    ],
    topRankedIndividuals: [],
    receivingVotes: ["Doane (Neb.)", "Hastings (Neb.)", "Oklahoma City", "Central Methodist (Mo.)"],
  },
  {
    id: "naia-women",
    label: "NAIA Women",
    shortLabel: "NAIA W",
    gender: "women",
    lastUpdated: "February 18, 2026",
    pollDate: "2026-02-18",
    season: "2025–26",
    description: "Final NAIA Women's Wrestling Rating — Life (Ga.) leads the way with 224 points.",
    sourceUrl: "https://nwcaonline.com/news/2026/2/18/national-wrestling-coaches-association-life-ga-leads-the-way-in-final-naia-womens-wrestling-rating.aspx",
    teams: [
      { rank: 1, trend: "steady", institution: "Life (Ga.)", points: 224, lastRank: 1 },
      { rank: 2, trend: "steady", institution: "Grand View (Iowa)", points: 186, lastRank: 2 },
      { rank: 3, trend: "steady", institution: "Providence (Mont.)", points: 177, lastRank: 3 },
      { rank: 4, trend: "up", trendAmount: 1, institution: "William Penn (Iowa)", points: 166, lastRank: 5 },
      { rank: 5, trend: "down", trendAmount: 1, institution: "Lindsey Wilson (Ky.)", points: 145, lastRank: 4 },
      { rank: 6, trend: "up", trendAmount: 1, institution: "Wayland Baptist (Texas)", points: 116, lastRank: 7 },
      { rank: 7, trend: "up", trendAmount: 1, institution: "Indiana Tech", points: 115, lastRank: 8 },
      { rank: 8, trend: "up", trendAmount: 2, institution: "Missouri Valley", points: 114, lastRank: 10 },
      { rank: 9, trend: "up", trendAmount: 2, institution: "Ottawa (Kan.)", points: 93, lastRank: 11 },
      { rank: 10, trend: "down", trendAmount: 1, institution: "Southern Oregon", points: 91, lastRank: 9 },
      { rank: 11, trend: "up", trendAmount: 1, institution: "Doane (Neb.)", points: 82, lastRank: 12 },
      { rank: 12, trend: "down", trendAmount: 6, institution: "Cumberlands (Ky.)", points: 77, lastRank: 6 },
      { rank: 13, trend: "steady", institution: "Texas Wesleyan", points: 75, lastRank: 13 },
      { rank: 14, trend: "steady", institution: "Hastings (Neb.)", points: 72, lastRank: 14 },
      { rank: 15, trend: "up", trendAmount: 2, institution: "Oklahoma City", points: 66, lastRank: 17 },
      { rank: 16, trend: "steady", institution: "Central Methodist (Mo.)", points: 56, lastRank: 16 },
      { rank: 17, trend: "up", trendAmount: 3, institution: "Missouri Baptist", points: 53, lastRank: 20 },
      { rank: 18, trend: "down", trendAmount: 3, institution: "Campbellsville (Ky.)", points: 53, lastRank: 15 },
      { rank: 19, trend: "up", trendAmount: 1, institution: "Baker (Kan.)", points: 53, lastRank: 20 },
      { rank: 20, trend: "down", trendAmount: 2, institution: "Evergreen State", points: 52, lastRank: 18 },
    ],
    topRankedIndividuals: [
      { weightClass: "103", name: "Erin Hikiji", school: "Providence (Mont.)" },
      { weightClass: "110", name: "Mia Palumbo", school: "William Penn (Iowa)" },
      { weightClass: "117", name: "Christianah Ogunsanya", school: "William Penn (Iowa)" },
      { weightClass: "124", name: "Cristelle Rodriguez", school: "Doane (Neb.)" },
      { weightClass: "131", name: "Sarah Savidge", school: "Life (Ga.)" },
      { weightClass: "138", name: "Esther Kolawole", school: "William Penn (Iowa)" },
      { weightClass: "145", name: "Jordan Suarez", school: "Wayland Baptist (Texas)" },
      { weightClass: "160", name: "Latifah McBryde", school: "Life (Ga.)" },
      { weightClass: "180", name: "Reka Busa", school: "Life (Ga.)" },
      { weightClass: "207", name: "Lillian Gradillas-Flores", school: "Southern Oregon" },
    ],
    receivingVotes: ["Saint Mary 35", "Dickinson State 31", "Avila (Mo.) 24", "Midland (Neb.) 23", "Eastern Oregon 22", "Waldorf (Iowa) 17", "Montreat 15", "William Woods (Mo.) 15", "Friends (Kan.) 13", "Bismarck State 13"],
  },
  {
    id: "njcaa-men",
    label: "NJCAA Men",
    shortLabel: "NJCAA M",
    gender: "men",
    lastUpdated: "January 29, 2026",
    pollDate: "2026-01-29",
    season: "2025–26",
    description: "NJCAA Men's Wrestling Coaches Poll — Indian Hills leads with 106 points.",
    sourceUrl: "https://nwcaonline.com/news/2026/1/29/national-wrestling-coaches-association-indian-hills-no-1-in-njcaa-mens-wrestling-team-rankings.aspx",
    teams: [
      { rank: 1, trend: "up", institution: "Indian Hills", points: 106 },
      { rank: 2, trend: "steady", institution: "Iowa Central", points: 93 },
      { rank: 3, trend: "steady", institution: "Western Wyoming", points: 79 },
      { rank: 4, trend: "steady", institution: "Southeast", points: 75 },
      { rank: 5, trend: "steady", institution: "Clackamas", points: 40 },
      { rank: 6, trend: "steady", institution: "North Idaho", points: 30 },
      { rank: 7, trend: "steady", institution: "Northwest Wyoming", points: 27 },
      { rank: 8, trend: "steady", institution: "Pratt", points: 27 },
      { rank: 9, trend: "steady", institution: "NE Oklahoma", points: 22 },
      { rank: 10, trend: "steady", institution: "Niagara", points: 22 },
      { rank: 11, trend: "steady", institution: "Cowley", points: 20 },
      { rank: 12, trend: "steady", institution: "Harper", points: 19 },
      { rank: 13, trend: "steady", institution: "Big Bend", points: 18 },
      { rank: 14, trend: "steady", institution: "Muskegon", points: 18 },
      { rank: 15, trend: "steady", institution: "SW Michigan", points: 15 },
      { rank: 16, trend: "steady", institution: "Onandaga", points: 12 },
      { rank: 17, trend: "steady", institution: "Iowa Western", points: 9 },
      { rank: 18, trend: "steady", institution: "Carl Albert", points: 6 },
      { rank: 19, trend: "steady", institution: "Fort Hays Tech", points: 6 },
      { rank: 20, trend: "steady", institution: "Rochester", points: 5 },
    ],
    topRankedIndividuals: [
      { weightClass: "125", name: "Jack Guerrero", school: "Muskegon" },
      { weightClass: "133", name: "Tegan Sherk", school: "Iowa Central" },
      { weightClass: "141", name: "Gavyn Whitehead", school: "Indian Hills" },
      { weightClass: "149", name: "Tommy Dalton", school: "Western Wyoming" },
      { weightClass: "157", name: "Keith Smith", school: "Southeast" },
      { weightClass: "165", name: "Mohamed Abdelhady", school: "Indian Hills" },
      { weightClass: "174", name: "Cinsere Clark", school: "Indian Hills" },
      { weightClass: "184", name: "Jarrel Miller", school: "Iowa Central" },
      { weightClass: "197", name: "Victor Montoya", school: "Southeast" },
      { weightClass: "285", name: "Zaman Anwar", school: "Iowa Central" },
    ],
    receivingVotes: [],
  },
  {
    id: "njcaa-women",
    label: "NJCAA Women",
    shortLabel: "NJCAA W",
    gender: "women",
    lastUpdated: "January 14, 2026",
    pollDate: "2026-01-14",
    season: "2025–26",
    description: "NJCAA Women's Wrestling Team Top 25 — Indian Hills leads with 149 points.",
    sourceUrl: "https://nwcaonline.com/news/2026/1/14/national-wrestling-coaches-association-njcaa-releases-womens-wrestling-team-top-25-and-individual-rankings.aspx",
    teams: [
      { rank: 1, trend: "steady", institution: "Indian Hills", points: 149 },
      { rank: 2, trend: "steady", institution: "Southeast", points: 108 },
      { rank: 3, trend: "steady", institution: "Iowa Central", points: 84 },
      { rank: 4, trend: "steady", institution: "Iowa Western", points: 60 },
      { rank: 5, trend: "steady", institution: "Umpqua", points: 58 },
      { rank: 6, trend: "steady", institution: "Hawkeye", points: 34 },
      { rank: 7, trend: "steady", institution: "Colby", points: 32 },
      { rank: 8, trend: "steady", institution: "Southwestern Oregon", points: 24 },
      { rank: 9, trend: "steady", institution: "Snow", points: 23 },
      { rank: 10, trend: "steady", institution: "Iowa Lakes", points: 23 },
    ],
    topRankedIndividuals: [
      { weightClass: "103", name: "Bertha Cabrera", school: "Southeast" },
      { weightClass: "110", name: "Ariah Mervilus", school: "Indian Hills" },
      { weightClass: "117", name: "Molly Sek", school: "Iowa Central" },
      { weightClass: "124", name: "Rosalia Rubio", school: "Iowa Western" },
      { weightClass: "131", name: "Bella Ngo", school: "Umpqua" },
      { weightClass: "138", name: "Anna Spencer", school: "Southwestern Oregon" },
      { weightClass: "145", name: "Isabelle Morgan", school: "Snow" },
      { weightClass: "160", name: "Ayana Fletcher", school: "Iowa Western" },
      { weightClass: "180", name: "Paola Rodriguez", school: "Indian Hills" },
      { weightClass: "207", name: "Martha Hinneh", school: "Southeast" },
      { weightClass: "235", name: "Kennedi Johnson-Washington", school: "Indian Hills" },
    ],
    receivingVotes: [],
  },
];

/** Helper: get top N teams for a given division id (for home page snippet) */
export function getTopTeams(divisionId: string, count = 5): TeamRanking[] {
  const div = RANKINGS_DATA.find((d) => d.id === divisionId);
  if (!div) return [];
  // For NCAA Women (no team poll), return top individuals as pseudo-rows
  if (div.teams.length === 0 && div.topRankedIndividuals.length > 0) return [];
  return div.teams.slice(0, count);
}

/** Helper: divisions that have a team poll (for home page tab list) */
export const HOME_RANKING_TABS = RANKINGS_DATA.filter((d) => d.teams.length > 0).map((d) => ({
  id: d.id,
  label: d.shortLabel,
}));
