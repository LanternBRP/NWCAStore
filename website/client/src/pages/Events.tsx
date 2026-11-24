/**
 * Events — NWCA Full Events Page
 * Design: Dark navy, bold editorial, strong wrestling identity
 * Colors: Arena Black #0A0E1A / NWCA Navy #17214B / Championship Red #C41E3A / Chalk White #F8F6F1
 * Fonts: Bebas Neue (display) / Barlow Condensed (labels/nav) / Inter (body)
 *
 * Calendar: Month / Week / Agenda toggles + per-event .ics download
 */

import { useState } from "react";
import { useLocation } from "wouter";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import {
  ArrowRight, ChevronRight, ChevronLeft,
  MapPin, Calendar, ExternalLink, Users, Trophy, Download
} from "lucide-react";

// ─── Assets ───────────────────────────────────────────────────────────────────
const MAT_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663283983903/Hfy5MinW2PXVKLrBsPEmFG/rankings_mat_circle-Vuctk4mofk7G4SDFVrpWPQ.webp";

// ─── Event Data ───────────────────────────────────────────────────────────────
// Each event has a JS Date for calendar placement
interface CalEvent {
  id: string;
  type: string;
  typeColor: string;
  startDate: Date;
  endDate: Date;
  dateLabel: string;
  title: string;
  subtitle: string;
  location: string;
  venue: string;
  description: string;
  highlights: string[];
  url: string;
  registerUrl: string;
  img: string;
  featured: boolean;
  daysOut: number;
  status: string;
}

const EVENTS: CalEvent[] = [
  {
    id: "convention-2026",
    type: "Convention",
    typeColor: "#17214B",
    startDate: new Date(2026, 6, 31), // Jul 31
    endDate: new Date(2026, 7, 2),    // Aug 2
    dateLabel: "July 31 – Aug 2, 2026",
    title: "NWCA Annual Convention 2026",
    subtitle: "The Premier Gathering of Wrestling Coaches",
    location: "Baltimore, MD",
    venue: "Renaissance Baltimore Harborplace Hotel",
    description: "The NWCA Annual Convention brings together over 2,000 wrestling coaches from across the country for three days of professional development, networking, rule changes, and competition. The convention features keynote speakers, breakout sessions, the NWCA Awards Banquet, and the National Duals Championship.",
    highlights: ["2,000+ Coaches Attending", "Rule Change Meetings", "NWCA Awards Banquet", "Coaching Development Sessions", "Vendor Expo"],
    url: "http://www.nwcaconvention.com",
    registerUrl: "http://www.nwcaconvention.com",
    img: "/manus-storage/nwca_convention_2026_logo_da1b8bca.png",
    featured: true,
    daysOut: 18,
    status: "open",
  },
  {
    id: "scholastic-academy-ut",
    type: "Development",
    typeColor: "#1a6b3c",
    startDate: new Date(2026, 4, 2),  // May 2
    endDate: new Date(2026, 4, 2),
    dateLabel: "May 2, 2026",
    title: "Scholastic Leadership Academy",
    subtitle: "Presented by the United States Marine Corps — Monticello, UT",
    location: "Monticello, UT",
    venue: "Monticello High School",
    description: "The NWCA Scholastic Leadership Academy is a free, one-day workshop for high school and middle school wrestling coaches. Developed in partnership with Dr. Dan Gould of Michigan State University and the U.S. Marine Corps.",
    highlights: ["Free to Attend", "USMC Keynote Speaker", "12 Online Modules", "CEU Credits Available", "Small-Group Facilitation"],
    url: "https://nwcaonline.com/sports/2023/4/3/coaching-development-for-scholastic-coaches.aspx",
    registerUrl: "https://nwcaonline.com/sports/2023/4/3/coaching-development-for-scholastic-coaches.aspx",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663283983903/Hfy5MinW2PXVKLrBsPEmFG/nwca_coaching_sideline-4uwFYm9ohWGchbmuNTT8Mk.webp",
    featured: false,
    daysOut: 6,
    status: "open",
  },
  {
    id: "scholastic-academy-tx",
    type: "Development",
    typeColor: "#1a6b3c",
    startDate: new Date(2026, 4, 17), // May 17
    endDate: new Date(2026, 4, 17),
    dateLabel: "May 17, 2026",
    title: "Scholastic Leadership Academy",
    subtitle: "Presented by the United States Marine Corps — Cypress, TX",
    location: "Cypress, TX",
    venue: "Cypress Park High School",
    description: "The NWCA Scholastic Leadership Academy is a free, one-day workshop for high school and middle school wrestling coaches.",
    highlights: ["Free to Attend", "USMC Keynote Speaker", "CEU Credits Available", "Small-Group Facilitation"],
    url: "https://nwcaonline.com/sports/2023/4/3/coaching-development-for-scholastic-coaches.aspx",
    registerUrl: "https://nwcaonline.com/sports/2023/4/3/coaching-development-for-scholastic-coaches.aspx",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663283983903/Hfy5MinW2PXVKLrBsPEmFG/nwca_coaching_sideline-4uwFYm9ohWGchbmuNTT8Mk.webp",
    featured: false,
    daysOut: 21,
    status: "open",
  },
  {
    id: "scholastic-academy-co",
    type: "Development",
    typeColor: "#1a6b3c",
    startDate: new Date(2026, 5, 13), // Jun 13
    endDate: new Date(2026, 5, 13),
    dateLabel: "Jun 13, 2026",
    title: "Scholastic Leadership Academy",
    subtitle: "Presented by the United States Marine Corps — Colorado Springs, CO",
    location: "Colorado Springs, CO",
    venue: "Vista Ridge High School",
    description: "The NWCA Scholastic Leadership Academy is a free, one-day workshop for high school and middle school wrestling coaches.",
    highlights: ["Free to Attend", "USMC Keynote Speaker", "CEU Credits Available"],
    url: "https://nwcaonline.com/sports/2023/4/3/coaching-development-for-scholastic-coaches.aspx",
    registerUrl: "https://nwcaonline.com/sports/2023/4/3/coaching-development-for-scholastic-coaches.aspx",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663283983903/Hfy5MinW2PXVKLrBsPEmFG/nwca_coaching_sideline-4uwFYm9ohWGchbmuNTT8Mk.webp",
    featured: false,
    daysOut: 48,
    status: "open",
  },
  {
    id: "scholastic-academy-nd",
    type: "Development",
    typeColor: "#1a6b3c",
    startDate: new Date(2026, 6, 28), // Jul 28
    endDate: new Date(2026, 6, 28),
    dateLabel: "Jul 28, 2026",
    title: "Scholastic Leadership Academy",
    subtitle: "North Dakota State Convention — Mandan, ND",
    location: "Mandan, ND",
    venue: "TBD",
    description: "The NWCA Scholastic Leadership Academy at the North Dakota State Convention.",
    highlights: ["Free to Attend", "USMC Keynote Speaker", "CEU Credits Available"],
    url: "https://nwcaonline.com/sports/2023/4/3/coaching-development-for-scholastic-coaches.aspx",
    registerUrl: "https://nwcaonline.com/sports/2023/4/3/coaching-development-for-scholastic-coaches.aspx",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663283983903/Hfy5MinW2PXVKLrBsPEmFG/nwca_coaching_sideline-4uwFYm9ohWGchbmuNTT8Mk.webp",
    featured: false,
    daysOut: 93,
    status: "open",
  },
  {
    id: "asc-2026",
    type: "Competition",
    typeColor: "#C41E3A",
    startDate: new Date(2026, 10, 8), // Nov 8
    endDate: new Date(2026, 10, 8),
    dateLabel: "Nov 8, 2026",
    title: "NWCA All-Star Classic 2026",
    subtitle: "The Premier Dual Meet Event in College Wrestling",
    location: "State College, PA",
    venue: "Bryce Jordan Center, Penn State",
    description: "The NWCA All-Star Classic is the premier dual meet event in college wrestling, featuring the nation's top wrestlers competing in marquee individual bouts. Held annually at the Bryce Jordan Center at Penn State.",
    highlights: ["Top-Ranked Wrestlers", "National Broadcast", "Bryce Jordan Center", "Fan Experience Zone", "Alumni Weekend"],
    url: "https://nwcaonline.com/sports/asc",
    registerUrl: "https://nwcaonline.com/sports/asc",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663283983903/Hfy5MinW2PXVKLrBsPEmFG/nwca_men_wrestling-WjWzhv5r9eaGje2r3TTCeD.webp",
    featured: true,
    daysOut: 196,
    status: "open",
  },
  {
    id: "national-duals-2027",
    type: "Competition",
    typeColor: "#C41E3A",
    startDate: new Date(2027, 0, 15), // Jan 15
    endDate: new Date(2027, 0, 17),   // Jan 17
    dateLabel: "Jan 15–17, 2027",
    title: "National Duals Championship 2027",
    subtitle: "DI, DII, DIII, NAIA & NJCAA",
    location: "Baltimore, MD",
    venue: "Renaissance Baltimore Harborplace Hotel",
    description: "The NWCA National Duals Championship is the only event that crowns dual meet national champions across all five collegiate divisions — NCAA DI, DII, DIII, NAIA, and NJCAA — under one roof.",
    highlights: ["5 Divisions Compete", "National Championships", "All-Session Passes", "Live Streaming Available", "Convention Package Deals"],
    url: "https://nwcaonline.com/sports/natduals",
    registerUrl: "https://nwcaonline.com/sports/natduals",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663283983903/Hfy5MinW2PXVKLrBsPEmFG/nwca_men_wrestling-WjWzhv5r9eaGje2r3TTCeD.webp",
    featured: true,
    daysOut: 264,
    status: "open",
  },
];

const EVENT_TYPES = ["All", "Competition", "Convention", "Development"];
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Registration now begins in the NWCA purchase flow. The AMS determines final
// eligibility, member rate, capacity, and registration details after sign-in.
const eventCheckoutUrl = (eventId: string) => `/checkout?flow=event&event=${encodeURIComponent(eventId)}`;

// ─── ICS Download ─────────────────────────────────────────────────────────────
function formatICSDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}${m}${d}`;
}

function downloadICS(event: CalEvent) {
  const endDate = new Date(event.endDate);
  endDate.setDate(endDate.getDate() + 1); // all-day events end the next day in ICS

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//NWCA//NWCA Events//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.id}@nwca.cc`,
    `DTSTART;VALUE=DATE:${formatICSDate(event.startDate)}`,
    `DTEND;VALUE=DATE:${formatICSDate(endDate)}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, "\\n")}`,
    `LOCATION:${event.venue}\\, ${event.location}`,
    `URL:${event.url}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${event.id}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ─── Sub-components ────────────────────────────────────────────────────────────
function TypeBadge({ type, color }: { type: string; color: string }) {
  return (
    <span
      className="font-condensed font-700 text-[10px] tracking-widest uppercase text-white px-2 py-0.5 inline-block"
      style={{ backgroundColor: color }}
    >
      {type}
    </span>
  );
}

function DaysOutBadge({ days }: { days: number }) {
  if (days <= 7) return <span className="font-condensed font-700 text-[10px] tracking-widest uppercase text-white bg-[#C41E3A] px-2 py-0.5">THIS WEEK</span>;
  if (days <= 30) return <span className="font-condensed font-700 text-[10px] tracking-widest uppercase text-[#B8860B] bg-[#B8860B]/10 px-2 py-0.5">{days} DAYS OUT</span>;
  return <span className="font-condensed font-700 text-[10px] tracking-widest uppercase text-[#c8cdd6] bg-white/5 px-2 py-0.5">{days} DAYS OUT</span>;
}

// ─── Month Calendar View ───────────────────────────────────────────────────────
function MonthView({ events, calYear, calMonth, onPrev, onNext, onEventClick }: {
  events: CalEvent[];
  calYear: number;
  calMonth: number;
  onPrev: () => void;
  onNext: () => void;
  onEventClick: (e: CalEvent) => void;
}) {
  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  const getEventsForDay = (day: number) =>
    events.filter((e) => {
      const start = e.startDate;
      const end = e.endDate;
      const cell = new Date(calYear, calMonth, day);
      return cell >= new Date(start.getFullYear(), start.getMonth(), start.getDate()) &&
        cell <= new Date(end.getFullYear(), end.getMonth(), end.getDate());
    });

  const today = new Date();

  return (
    <div className="bg-[#141824] border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0A0E1A]">
        <button onClick={onPrev} className="p-2 text-[#c8cdd6] hover:text-white hover:bg-white/5 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="font-display text-2xl text-white tracking-wide">
          {MONTH_NAMES[calMonth]} <span className="text-[#F5C842]">{calYear}</span>
        </h3>
        <button onClick={onNext} className="p-2 text-[#c8cdd6] hover:text-white hover:bg-white/5 transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      {/* Day headers */}
      <div className="grid grid-cols-7 border-b border-white/10">
        {DAY_NAMES.map((d) => (
          <div key={d} className="py-2 text-center font-condensed font-700 text-[10px] tracking-widest uppercase text-[#c8cdd6]">{d}</div>
        ))}
      </div>
      {/* Cells */}
      <div className="grid grid-cols-7">
        {cells.map((day, i) => {
          const dayEvents = day ? getEventsForDay(day) : [];
          const isToday = day !== null &&
            today.getFullYear() === calYear &&
            today.getMonth() === calMonth &&
            today.getDate() === day;
          return (
            <div
              key={i}
              className={`min-h-[90px] p-1.5 border-b border-r border-white/5 ${day ? "hover:bg-white/3" : "opacity-30"} ${isToday ? "bg-[#17214B]/40" : ""}`}
            >
              {day && (
                <>
                  <div className={`text-right font-condensed font-700 text-xs mb-1 ${isToday ? "text-[#F5C842]" : "text-[#c8cdd6]"}`}>
                    {isToday ? (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#C41E3A] text-white text-[10px]">{day}</span>
                    ) : day}
                  </div>
                  <div className="space-y-0.5">
                    {dayEvents.slice(0, 3).map((e) => (
                      <button
                        key={e.id}
                        onClick={() => onEventClick(e)}
                        className="w-full text-left text-[9px] font-condensed font-700 tracking-wide uppercase px-1.5 py-0.5 truncate text-white transition-opacity hover:opacity-80"
                        style={{ backgroundColor: e.typeColor }}
                        title={e.title}
                      >
                        {e.title.replace("NWCA ", "").replace("Scholastic Leadership Academy", "SLA")}
                      </button>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="text-[9px] text-[#c8cdd6] px-1">+{dayEvents.length - 3} more</div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Week View ─────────────────────────────────────────────────────────────────
function WeekView({ events, weekStart, onPrev, onNext, onEventClick }: {
  events: CalEvent[];
  weekStart: Date;
  onPrev: () => void;
  onNext: () => void;
  onEventClick: (e: CalEvent) => void;
}) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return d;
  });

  const today = new Date();

  const getEventsForDay = (date: Date) =>
    events.filter((e) => {
      const cell = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const start = new Date(e.startDate.getFullYear(), e.startDate.getMonth(), e.startDate.getDate());
      const end = new Date(e.endDate.getFullYear(), e.endDate.getMonth(), e.endDate.getDate());
      return cell >= start && cell <= end;
    });

  const weekLabel = `${MONTH_NAMES[days[0].getMonth()].slice(0, 3)} ${days[0].getDate()} – ${MONTH_NAMES[days[6].getMonth()].slice(0, 3)} ${days[6].getDate()}, ${days[6].getFullYear()}`;

  return (
    <div className="bg-[#141824] border border-white/10 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0A0E1A]">
        <button onClick={onPrev} className="p-2 text-[#c8cdd6] hover:text-white hover:bg-white/5 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="font-display text-xl text-white tracking-wide">{weekLabel}</h3>
        <button onClick={onNext} className="p-2 text-[#c8cdd6] hover:text-white hover:bg-white/5 transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      <div className="grid grid-cols-7 border-b border-white/10">
        {days.map((d, i) => {
          const isToday = d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && d.getDate() === today.getDate();
          return (
            <div key={i} className={`py-3 text-center border-r border-white/5 last:border-0 ${isToday ? "bg-[#17214B]/40" : ""}`}>
              <div className="font-condensed font-700 text-[10px] tracking-widest uppercase text-[#c8cdd6]">{DAY_NAMES[d.getDay()]}</div>
              <div className={`font-display text-xl mt-0.5 ${isToday ? "text-[#F5C842]" : "text-white"}`}>{d.getDate()}</div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-7 min-h-[200px]">
        {days.map((d, i) => {
          const dayEvents = getEventsForDay(d);
          const isToday = d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && d.getDate() === today.getDate();
          return (
            <div key={i} className={`p-2 border-r border-white/5 last:border-0 space-y-1.5 ${isToday ? "bg-[#17214B]/20" : ""}`}>
              {dayEvents.map((e) => (
                <button
                  key={e.id}
                  onClick={() => onEventClick(e)}
                  className="w-full text-left text-[9px] font-condensed font-700 tracking-wide uppercase px-2 py-1.5 text-white hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: e.typeColor }}
                  title={e.title}
                >
                  <div className="truncate">{e.title.replace("NWCA ", "").replace("Scholastic Leadership Academy", "SLA")}</div>
                  <div className="text-white/70 font-400 normal-case tracking-normal text-[8px] truncate">{e.location}</div>
                </button>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Agenda View ───────────────────────────────────────────────────────────────
function AgendaView({ events, onEventClick }: {
  events: CalEvent[];
  onEventClick: (e: CalEvent) => void;
}) {
  const sorted = [...events].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

  // Group by month
  const groups: Record<string, CalEvent[]> = {};
  sorted.forEach((e) => {
    const key = `${MONTH_NAMES[e.startDate.getMonth()]} ${e.startDate.getFullYear()}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(e);
  });

  return (
    <div className="space-y-6">
      {Object.entries(groups).map(([month, evts]) => (
        <div key={month}>
          <div className="font-condensed font-700 text-[11px] tracking-widest uppercase text-[#F5C842] flex items-center gap-3 mb-3">
            <span className="w-6 h-px bg-[#C41E3A]" />
            {month}
          </div>
          <div className="space-y-2">
            {evts.map((e) => (
              <div
                key={e.id}
                className="group bg-[#141824] border border-white/8 hover:border-[#C41E3A]/30 transition-all duration-200 flex items-stretch overflow-hidden cursor-pointer"
                onClick={() => onEventClick(e)}
              >
                {/* Date block */}
                <div className="flex-shrink-0 w-16 flex flex-col items-center justify-center py-4 border-r border-white/8" style={{ backgroundColor: e.typeColor + "22" }}>
                  <div className="font-condensed font-700 text-[9px] tracking-widest uppercase" style={{ color: e.typeColor === "#C41E3A" ? "#F5C842" : "#a8d5b5" }}>
                    {MONTH_NAMES[e.startDate.getMonth()].slice(0, 3).toUpperCase()}
                  </div>
                  <div className="font-display text-2xl text-white leading-none">{e.startDate.getDate()}</div>
                </div>
                {/* Content */}
                <div className="flex-1 px-5 py-3 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <TypeBadge type={e.type} color={e.typeColor} />
                      {e.daysOut <= 30 && <DaysOutBadge days={e.daysOut} />}
                    </div>
                    <div className="font-condensed font-700 text-base text-white group-hover:text-[#F5C842] transition-colors truncate">{e.title}</div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#F5C842] flex-shrink-0" />
                      <span className="font-condensed text-[11px] text-[#c8cdd6] tracking-wide">{e.venue}, {e.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={(ev) => { ev.stopPropagation(); downloadICS(e); }}
                      className="flex items-center gap-1.5 font-condensed font-700 text-[10px] tracking-widest uppercase text-[#c8cdd6] hover:text-white border border-white/10 hover:border-white/30 px-3 py-1.5 transition-all"
                      title="Add to calendar"
                    >
                      <Download className="w-3 h-3" /> .ics
                    </button>
                    <a
                      href={eventCheckoutUrl(e.id)}
                      onClick={(ev) => ev.stopPropagation()}
                      className="flex items-center gap-1.5 font-condensed font-700 text-[10px] tracking-widest uppercase px-3 py-1.5 bg-[#C41E3A] text-white hover:bg-[#a01830] transition-colors"
                    >
                      Register <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Event Detail Modal ────────────────────────────────────────────────────────
function EventModal({ event, onClose }: { event: CalEvent; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-[#141824] border border-white/10 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0A0E1A] px-6 py-5 border-b border-white/10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TypeBadge type={event.type} color={event.typeColor} />
                <DaysOutBadge days={event.daysOut} />
              </div>
              <h3 className="font-display text-2xl text-white leading-tight">{event.title}</h3>
              <p className="font-condensed text-[#c8cdd6] text-sm tracking-wide mt-1">{event.subtitle}</p>
            </div>
            <button onClick={onClose} className="text-[#c8cdd6] hover:text-white text-2xl leading-none flex-shrink-0 mt-1">×</button>
          </div>
        </div>
        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <div className="flex items-center gap-2 text-[#F5C842]">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span className="font-condensed font-700 text-sm">{event.dateLabel}</span>
          </div>
          <div className="flex items-center gap-2 text-[#d0d5de]">
            <MapPin className="w-4 h-4 flex-shrink-0 text-[#F5C842]" />
            <span className="font-body text-sm">{event.venue}, {event.location}</span>
          </div>
          <p className="font-body text-sm text-[#c8cdd6] leading-relaxed">{event.description}</p>
          {event.highlights.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {event.highlights.map((h) => (
                <span key={h} className="font-condensed text-[10px] tracking-wide uppercase text-[#d0d5de] bg-white/5 px-2 py-1 border border-white/5">{h}</span>
              ))}
            </div>
          )}
        </div>
        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 flex flex-wrap gap-3">
          <button
            onClick={() => downloadICS(event)}
            className="flex items-center gap-2 font-condensed font-700 text-xs tracking-widest uppercase px-4 py-2.5 border border-white/20 text-white hover:border-white/50 transition-all"
          >
            <Download className="w-3.5 h-3.5" /> Add to My Calendar (.ics)
          </button>
          <a
            href={eventCheckoutUrl(event.id)}
            className="flex items-center gap-2 font-condensed font-700 text-xs tracking-widest uppercase px-4 py-2.5 bg-[#C41E3A] text-white hover:bg-[#a01830] transition-colors"
          >
            Register Now <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <a
            href={event.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 font-condensed font-700 text-xs tracking-widest uppercase text-[#d0d5de] hover:text-white transition-colors py-2.5"
          >
            Learn More <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Events() {
  const [activeType, setActiveType] = useState("All");
  const [calView, setCalView] = useState<"month" | "week" | "agenda">("month");
  const [calYear, setCalYear] = useState(2026);
  const [calMonth, setCalMonth] = useState(6); // July 2026 (0-indexed)
  const [weekStart, setWeekStart] = useState(() => {
    // Start week on the Monday of the current week containing Jul 7 2026
    const d = new Date(2026, 6, 6); // Jul 6 2026 (Mon)
    return d;
  });
  const [selectedEvent, setSelectedEvent] = useState<CalEvent | null>(null);
  const [, navigate] = useLocation();

  const filtered = activeType === "All" ? EVENTS : EVENTS.filter((e) => e.type === activeType);

  // Month navigation
  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
    else setCalMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
    else setCalMonth(m => m + 1);
  };

  // Week navigation
  const prevWeek = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() - 7);
    setWeekStart(d);
  };
  const nextWeek = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + 7);
    setWeekStart(d);
  };

  const featuredEvents = EVENTS.filter((e) => e.featured);

  return (
    <div className="min-h-screen bg-[#1c2333] text-[#F8F6F1] overflow-x-hidden">
      <NavBar />

      {/* ── HERO BANNER ─────────────────────────────────────────────── */}
      <div
        className="relative py-20 overflow-hidden"
        style={{ backgroundImage: `url(${MAT_BG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#0A0E1A]/80" />
        <div className="container relative z-10">
          <div className="flex items-center gap-2 font-condensed text-[11px] tracking-widest uppercase text-[#c8cdd6] mb-4">
            <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="hover:text-white transition-colors">Home</a>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#F5C842]">Events</span>
          </div>
          <div className="font-condensed font-700 text-[11px] tracking-widest uppercase text-[#F5C842] mb-2 flex items-center gap-2">
            <span className="inline-block w-8 h-px bg-[#C41E3A]" />
            NWCA Schedule
          </div>
          <h1 className="font-display text-6xl md:text-7xl text-white leading-none mb-4">
            UPCOMING <span className="text-[#F5C842]">EVENTS</span>
          </h1>
          <p className="font-body text-[#c8cdd6] max-w-xl text-base leading-relaxed">
            Conventions, championships, coaching academies, and more — the full NWCA event calendar for 2026–2027.
          </p>
        </div>
      </div>

      {/* ── QUICK STATS ─────────────────────────────────────────────── */}
      <div className="bg-[#141824] border-b border-white/5">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
            {[
              { icon: Calendar, label: "Events This Year", value: "7+" },
              { icon: Users, label: "Coaches Expected", value: "2,000+" },
              { icon: Trophy, label: "Championships", value: "5 Divisions" },
              { icon: MapPin, label: "Locations", value: "Nationwide" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 px-6 py-5">
                <Icon className="w-5 h-5 text-[#F5C842] flex-shrink-0" />
                <div>
                  <div className="font-display text-xl text-white">{value}</div>
                  <div className="font-condensed text-[10px] tracking-widest uppercase text-[#c8cdd6]">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CALENDAR SECTION ────────────────────────────────────────── */}
      <div className="container py-10">
        {/* Calendar header with view toggles + type filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="font-condensed font-700 text-[10px] tracking-widest uppercase text-[#F5C842] flex items-center gap-2 mb-1">
              <span className="w-6 h-px bg-[#C41E3A]" /> Event Calendar
            </div>
            <h2 className="font-display text-3xl text-white">NWCA SCHEDULE</h2>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {/* Type filter */}
            <div className="flex items-center gap-0 bg-[#0A0E1A] border border-white/10 overflow-hidden">
              {EVENT_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`font-condensed font-700 text-[10px] tracking-widest uppercase px-3 py-2 transition-all ${
                    activeType === type ? "bg-[#C41E3A] text-white" : "text-[#c8cdd6] hover:text-white"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            {/* View toggle */}
            <div className="flex items-center gap-0 bg-[#0A0E1A] border border-white/10 overflow-hidden">
              {(["month", "week", "agenda"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setCalView(v)}
                  className={`font-condensed font-700 text-[10px] tracking-widest uppercase px-4 py-2 transition-all capitalize ${
                    calView === v ? "bg-[#17214B] text-white" : "text-[#c8cdd6] hover:text-white"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calendar views */}
        {calView === "month" && (
          <MonthView
            events={filtered}
            calYear={calYear}
            calMonth={calMonth}
            onPrev={prevMonth}
            onNext={nextMonth}
            onEventClick={setSelectedEvent}
          />
        )}
        {calView === "week" && (
          <WeekView
            events={filtered}
            weekStart={weekStart}
            onPrev={prevWeek}
            onNext={nextWeek}
            onEventClick={setSelectedEvent}
          />
        )}
        {calView === "agenda" && (
          <AgendaView events={filtered} onEventClick={setSelectedEvent} />
        )}

        {/* Calendar legend */}
        <div className="flex items-center gap-5 mt-5 flex-wrap">
          <span className="font-condensed font-700 text-xs tracking-widest uppercase text-white">Legend:</span>
          {[
            { label: "Convention", color: "#17214B" },
            { label: "Development", color: "#1a6b3c" },
            { label: "Competition", color: "#C41E3A" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-2">
              <div className="w-4 h-4 flex-shrink-0 border border-white/20" style={{ backgroundColor: l.color }} />
              <span className="font-condensed font-700 text-xs tracking-widest uppercase text-white">{l.label}</span>
            </div>
          ))}
          <span className="font-body text-sm text-[#d0d5de] ml-1">Click any event to view details & download to your calendar</span>
        </div>
      </div>

      {/* ── SIGNATURE EVENTS ────────────────────────────────────────── */}
      <div className="container pb-12 space-y-8">
        <div className="font-condensed font-700 text-[10px] tracking-widest uppercase text-[#F5C842] flex items-center gap-2">
          <span className="w-6 h-px bg-[#C41E3A]" /> Signature Events
        </div>
        {featuredEvents.map((event) => (
          <div
            key={event.id}
            id={event.id}
            className="group grid grid-cols-1 lg:grid-cols-2 bg-[#222b3d] overflow-hidden border border-white/5 hover:border-[#C41E3A]/30 transition-all duration-300 hover:shadow-[0_0_40px_rgba(196,30,58,0.12)]"
          >
            <div className="relative overflow-hidden aspect-[16/9] lg:aspect-auto bg-[#17214B] flex items-center justify-center">
              {event.id === 'convention-2026' ? (
                <img src={event.img} alt={event.title} className="w-56 h-56 lg:w-72 lg:h-72 object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <>
                  <img src={event.img} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#222b3d]/80 hidden lg:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#222b3d] to-transparent lg:hidden" />
                </>
              )}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <TypeBadge type={event.type} color={event.typeColor} />
                <DaysOutBadge days={event.daysOut} />
              </div>
            </div>
            <div className="p-6 lg:p-8 flex flex-col justify-center">
              <div className="font-condensed font-700 text-[11px] tracking-widest uppercase text-[#F5C842] mb-2">{event.dateLabel}</div>
              <h3 className="font-display text-3xl md:text-4xl text-white leading-tight mb-1">{event.title}</h3>
              <p className="font-condensed text-[#c8cdd6] text-sm tracking-wide mb-4">{event.subtitle}</p>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-3.5 h-3.5 text-[#F5C842] flex-shrink-0" />
                <span className="font-body text-sm text-[#d0d5de]">{event.venue}, {event.location}</span>
              </div>
              <p className="font-body text-sm text-[#c8cdd6] leading-relaxed mb-5 line-clamp-3">{event.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {event.highlights.map((h) => (
                  <span key={h} className="font-condensed text-[10px] tracking-wide uppercase text-[#d0d5de] bg-white/5 px-2 py-1 border border-white/5">{h}</span>
                ))}
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href={eventCheckoutUrl(event.id)}
                  className="flex items-center gap-2 font-condensed font-700 text-sm tracking-widest uppercase px-5 py-2.5 bg-[#C41E3A] text-white hover:bg-[#a01830] transition-colors"
                >
                  Register Now <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => downloadICS(event)}
                  className="flex items-center gap-2 font-condensed font-700 text-sm tracking-widest uppercase px-4 py-2.5 border border-white/20 text-white hover:border-white/50 transition-all"
                >
                  <Download className="w-3.5 h-3.5" /> Add to Calendar
                </button>
                <a
                  href={event.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 font-condensed font-700 text-sm tracking-widest uppercase text-[#d0d5de] hover:text-white transition-colors"
                >
                  Learn More <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* Scholastic Academy schedule table */}
        {(activeType === "All" || activeType === "Development") && (
          <div id="schedule" className="bg-[#222b3d] border border-white/5">
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
              <div>
                <div className="font-condensed font-700 text-[10px] tracking-widest uppercase text-[#1a6b3c] mb-1">Full Schedule</div>
                <h3 className="font-display text-2xl text-white">SCHOLASTIC LEADERSHIP ACADEMY DATES</h3>
              </div>
              <a
                href="https://nwcaonline.com/sports/2023/4/3/coaching-development-for-scholastic-coaches.aspx"
                target="_blank"
                rel="noreferrer"
                className="hidden md:flex items-center gap-2 font-condensed font-700 text-xs tracking-widest uppercase text-white hover:text-white transition-colors"
              >
                Apply Today <ArrowRight className="w-3 h-3" />
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    {["#", "Date", "Time", "Location", "City", "State", ""].map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-condensed font-700 text-[10px] tracking-widest uppercase text-[#c8cdd6]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { num: "03", date: "May 2, 2026", time: "10:00 am – 2:00 pm", location: "Monticello HS", city: "Monticello", state: "UT", eventId: "scholastic-academy-ut" },
                    { num: "04", date: "May 17, 2026", time: "10:00 am – 2:00 pm", location: "Cypress Park HS", city: "Cypress", state: "TX", eventId: "scholastic-academy-tx" },
                    { num: "05", date: "Jun 13, 2026", time: "9:00 am – 1:00 pm", location: "Vista Ridge HS", city: "Colorado Springs", state: "CO", eventId: "scholastic-academy-co" },
                    { num: "06", date: "Jul 28, 2026", time: "8:00 am – 12:00 pm", location: "ND State Convention", city: "Mandan", state: "ND", eventId: "scholastic-academy-nd" },
                    { num: "07", date: "Jul 30, 2026", time: "4:00 pm – 8:00 pm", location: "Renaissance Baltimore", city: "Baltimore", state: "MD", eventId: "convention-2026" },
                  ].map((row) => {
                    const evt = EVENTS.find(e => e.id === row.eventId);
                    return (
                      <tr key={row.num} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                        <td className="px-4 py-3 font-condensed font-700 text-[#F5C842]">{row.num}</td>
                        <td className="px-4 py-3 font-body text-white whitespace-nowrap">{row.date}</td>
                        <td className="px-4 py-3 font-body text-[#c8cdd6] whitespace-nowrap">{row.time}</td>
                        <td className="px-4 py-3 font-body text-[#d0d5de]">{row.location}</td>
                        <td className="px-4 py-3 font-body text-[#d0d5de]">{row.city}</td>
                        <td className="px-4 py-3 font-condensed font-700 text-[#c8cdd6] uppercase">{row.state}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {evt && (
                              <button
                                onClick={() => downloadICS(evt)}
                                className="flex items-center gap-1 font-condensed font-700 text-[9px] tracking-widest uppercase text-[#c8cdd6] hover:text-white border border-white/10 hover:border-white/30 px-2 py-1 transition-all"
                                title="Add to calendar"
                              >
                                <Download className="w-2.5 h-2.5" /> .ics
                              </button>
                            )}
                            <a
                              href="https://nwcaonline.com/sports/2023/4/3/coaching-development-for-scholastic-coaches.aspx"
                              target="_blank"
                              rel="noreferrer"
                              className="font-condensed font-700 text-[10px] tracking-widest uppercase text-white hover:text-white transition-colors"
                            >
                              Apply →
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <p className="font-body text-xs text-[#c8cdd6] flex-1">
                Free to attend. Contact Jim Beichner at <a href="tel:7162892855" className="text-white hover:text-white">716-289-2855</a> or <a href="mailto:jbeichner@nwca.cc" className="text-white hover:text-white">jbeichner@nwca.cc</a> to bring an academy to your region.
              </p>
              <a
                href="https://nwcaonline.com/sports/2023/4/3/coaching-development-for-scholastic-coaches.aspx"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 font-condensed font-700 text-xs tracking-widest uppercase px-4 py-2 bg-[#C41E3A] text-white hover:bg-[#a01830] transition-colors flex-shrink-0"
              >
                Apply to the Academy <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* ── EVENT DETAIL MODAL ──────────────────────────────────────── */}
      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}

      <Footer />
    </div>
  );
}
