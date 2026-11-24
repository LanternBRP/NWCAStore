/**
 * NWCA Scholastic State Wrestling Data
 * Source: NFHS Wrestling Participation Report 2023-24
 * Sanctioning status: NWCA H.S. Girls Sanctioning Map (updated May 2025)
 *
 * To update: edit the values below. Fields:
 *   boysSchools    — number of schools with boys wrestling
 *   boysParticipants — boys participant count
 *   girlsSchools   — number of schools with girls wrestling
 *   girlsParticipants — girls participant count
 *   girlsSanctioned — "sanctioned" | "emerging" | "unsanctioned"
 *   girlsStateChamp — does the state sponsor a girls state championship?
 */

export type SanctionStatus = "sanctioned" | "emerging" | "unsanctioned";

export interface StateData {
  abbr: string;
  name: string;
  boysSchools: number;
  boysParticipants: number;
  girlsSchools: number;
  girlsParticipants: number;
  girlsSanctioned: SanctionStatus;
  girlsStateChamp: boolean;
}

export const STATE_DATA: StateData[] = [
  { abbr: "AL", name: "Alabama",        boysSchools: 168, boysParticipants: 5393,  girlsSchools: 105, girlsParticipants: 636,  girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "AK", name: "Alaska",         boysSchools: 85,  boysParticipants: 1100,  girlsSchools: 42,  girlsParticipants: 208,  girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "AZ", name: "Arizona",        boysSchools: 212, boysParticipants: 6185,  girlsSchools: 200, girlsParticipants: 1522, girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "AR", name: "Arkansas",       boysSchools: 75,  boysParticipants: 1809,  girlsSchools: 58,  girlsParticipants: 583,  girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "CA", name: "California",     boysSchools: 881, boysParticipants: 26327, girlsSchools: 815, girlsParticipants: 7921, girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "CO", name: "Colorado",       boysSchools: 233, boysParticipants: 6067,  girlsSchools: 118, girlsParticipants: 1114, girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "CT", name: "Connecticut",    boysSchools: 139, boysParticipants: 2595,  girlsSchools: 0,   girlsParticipants: 231,  girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "DE", name: "Delaware",       boysSchools: 48,  boysParticipants: 966,   girlsSchools: 0,   girlsParticipants: 55,   girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "DC", name: "Dist. of Columbia", boysSchools: 16, boysParticipants: 228, girlsSchools: 4,   girlsParticipants: 24,   girlsSanctioned: "sanctioned",   girlsStateChamp: false },
  { abbr: "FL", name: "Florida",        boysSchools: 417, boysParticipants: 9066,  girlsSchools: 309, girlsParticipants: 1778, girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "GA", name: "Georgia",        boysSchools: 352, boysParticipants: 9142,  girlsSchools: 265, girlsParticipants: 1560, girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "HI", name: "Hawaii",         boysSchools: 55,  boysParticipants: 1266,  girlsSchools: 52,  girlsParticipants: 542,  girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "ID", name: "Idaho",          boysSchools: 108, boysParticipants: 3055,  girlsSchools: 94,  girlsParticipants: 715,  girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "IL", name: "Illinois",       boysSchools: 440, boysParticipants: 13254, girlsSchools: 367, girlsParticipants: 2093, girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "IN", name: "Indiana",        boysSchools: 315, boysParticipants: 7820,  girlsSchools: 178, girlsParticipants: 1207, girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "IA", name: "Iowa",           boysSchools: 283, boysParticipants: 6952,  girlsSchools: 204, girlsParticipants: 2935, girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "KS", name: "Kansas",         boysSchools: 229, boysParticipants: 5132,  girlsSchools: 214, girlsParticipants: 2366, girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "KY", name: "Kentucky",       boysSchools: 135, boysParticipants: 3000,  girlsSchools: 102, girlsParticipants: 992,  girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "LA", name: "Louisiana",      boysSchools: 100, boysParticipants: 2559,  girlsSchools: 12,  girlsParticipants: 15,   girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "ME", name: "Maine",          boysSchools: 63,  boysParticipants: 875,   girlsSchools: 43,  girlsParticipants: 131,  girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "MD", name: "Maryland",       boysSchools: 180, boysParticipants: 5297,  girlsSchools: 152, girlsParticipants: 769,  girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "MA", name: "Massachusetts",  boysSchools: 228, boysParticipants: 4948,  girlsSchools: 0,   girlsParticipants: 347,  girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "MI", name: "Michigan",       boysSchools: 479, boysParticipants: 10598, girlsSchools: 337, girlsParticipants: 1216, girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "MN", name: "Minnesota",      boysSchools: 349, boysParticipants: 7418,  girlsSchools: 0,   girlsParticipants: 1004, girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "MS", name: "Mississippi",    boysSchools: 20,  boysParticipants: 711,   girlsSchools: 20,  girlsParticipants: 80,   girlsSanctioned: "unsanctioned", girlsStateChamp: false },
  { abbr: "MO", name: "Missouri",       boysSchools: 262, boysParticipants: 8014,  girlsSchools: 236, girlsParticipants: 2639, girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "MT", name: "Montana",        boysSchools: 116, boysParticipants: 1643,  girlsSchools: 96,  girlsParticipants: 581,  girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "NE", name: "Nebraska",       boysSchools: 266, boysParticipants: 4995,  girlsSchools: 206, girlsParticipants: 1704, girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "NV", name: "Nevada",         boysSchools: 78,  boysParticipants: 2132,  girlsSchools: 71,  girlsParticipants: 408,  girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "NH", name: "New Hampshire",  boysSchools: 47,  boysParticipants: 923,   girlsSchools: 0,   girlsParticipants: 82,   girlsSanctioned: "emerging",     girlsStateChamp: false },
  { abbr: "NJ", name: "New Jersey",     boysSchools: 308, boysParticipants: 11579, girlsSchools: 0,   girlsParticipants: 1669, girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "NM", name: "New Mexico",     boysSchools: 65,  boysParticipants: 1728,  girlsSchools: 65,  girlsParticipants: 654,  girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "NY", name: "New York",       boysSchools: 508, boysParticipants: 11565, girlsSchools: 104, girlsParticipants: 1259, girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "NC", name: "North Carolina", boysSchools: 342, boysParticipants: 9885,  girlsSchools: 248, girlsParticipants: 1432, girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "ND", name: "North Dakota",   boysSchools: 108, boysParticipants: 1121,  girlsSchools: 108, girlsParticipants: 373,  girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "OH", name: "Ohio",           boysSchools: 621, boysParticipants: 12420, girlsSchools: 365, girlsParticipants: 4380, girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "OK", name: "Oklahoma",       boysSchools: 176, boysParticipants: 5709,  girlsSchools: 153, girlsParticipants: 1519, girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "OR", name: "Oregon",         boysSchools: 205, boysParticipants: 5455,  girlsSchools: 190, girlsParticipants: 1528, girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "PA", name: "Pennsylvania",   boysSchools: 481, boysParticipants: 12025, girlsSchools: 214, girlsParticipants: 2140, girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "RI", name: "Rhode Island",   boysSchools: 36,  boysParticipants: 1132,  girlsSchools: 0,   girlsParticipants: 93,   girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "SC", name: "South Carolina", boysSchools: 57,  boysParticipants: 5928,  girlsSchools: 2,   girlsParticipants: 30,   girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "SD", name: "South Dakota",   boysSchools: 117, boysParticipants: 1352,  girlsSchools: 74,  girlsParticipants: 323,  girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "TN", name: "Tennessee",      boysSchools: 191, boysParticipants: 5093,  girlsSchools: 138, girlsParticipants: 932,  girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "TX", name: "Texas",          boysSchools: 394, boysParticipants: 16639, girlsSchools: 389, girlsParticipants: 6436, girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "UT", name: "Utah",           boysSchools: 105, boysParticipants: 3932,  girlsSchools: 105, girlsParticipants: 1425, girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "VT", name: "Vermont",        boysSchools: 11,  boysParticipants: 80,    girlsSchools: 6,   girlsParticipants: 13,   girlsSanctioned: "emerging",     girlsStateChamp: false },
  { abbr: "VA", name: "Virginia",       boysSchools: 280, boysParticipants: 7637,  girlsSchools: 181, girlsParticipants: 669,  girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "WA", name: "Washington",     boysSchools: 281, boysParticipants: 8876,  girlsSchools: 263, girlsParticipants: 2830, girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "WV", name: "West Virginia",  boysSchools: 92,  boysParticipants: 2074,  girlsSchools: 0,   girlsParticipants: 0,    girlsSanctioned: "sanctioned",   girlsStateChamp: false },
  { abbr: "WI", name: "Wisconsin",      boysSchools: 340, boysParticipants: 6861,  girlsSchools: 184, girlsParticipants: 682,  girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
  { abbr: "WY", name: "Wyoming",        boysSchools: 52,  boysParticipants: 1313,  girlsSchools: 49,  girlsParticipants: 412,  girlsSanctioned: "sanctioned",   girlsStateChamp: true  },
];

export const STATE_MAP = Object.fromEntries(STATE_DATA.map((s) => [s.abbr, s]));
