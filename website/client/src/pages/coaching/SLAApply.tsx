/**
 * NWCA Scholastic Leadership Academy — Registration Form
 * Design: Dark navy base, NWCA red accents, Bebas Neue display, Inter body
 * Submission: mailto jbeichner@nwca.cc with all form data pre-filled
 * Fields sourced from the official NWCA Microsoft Forms SLA registration
 *
 * GATING: Q1 asks NWCA membership. Non-members are blocked before the form.
 */

import { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { ArrowRight, ArrowLeft, CheckCircle, ChevronDown, XCircle } from "lucide-react";

const WORKSHOPS = [
  "01 — March 6, 2026 · Colony HS · Palmer, AK (4:00 pm – 8:00 pm)",
  "02 — April 11, 2026 · McHenry High School · McHenry, IL (9:00 am – 1:00 pm)",
  "03 — May 2, 2026 · Monticello High School · Monticello, UT (10:00 am – 2:00 pm)",
  "04 — May 17, 2026 · Cypress Park High School · Cypress, TX (10:00 am – 2:00 pm)",
  "05 — June 13, 2026 · Vista Ridge HS · Colorado Springs, CO (9:00 am – 1:00 pm)",
  "06 — July 28, 2026 · North Dakota State Convention · Mandan, ND (8:00 am – 12:00 pm)",
  "07 — July 30, 2026 · Renaissance Baltimore Harborplace Hotel · Baltimore, MD (4:00 pm – 8:00 pm)",
];

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
  "New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio",
  "Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
  "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia",
  "Wisconsin","Wyoming",
];

const ROLES = [
  "High School - Head Coach",
  "High School - Assistant Coach",
  "Middle School - Head Coach",
  "Middle School - Assistant Coach",
  "Youth Coach",
];

type FormData = {
  // Step 1 — Academy Selection
  workshop: string;
  // Step 2 — Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
  // Step 3 — Coaching Background
  yearsCoached: string;
  roles: string[];
  genders: string[];
  // Step 4 — School Info
  schoolName: string;
  schoolCity: string;
  additionalInfo: string;
};

const EMPTY: FormData = {
  workshop: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  state: "",
  yearsCoached: "",
  roles: [],
  genders: [],
  schoolName: "",
  schoolCity: "",
  additionalInfo: "",
};

const STEPS = [
  "Academy Selection",
  "Personal Information",
  "Coaching Background",
  "School Information",
];

export default function SLAApply() {
  // Gating state — null = not answered, "yes" = member, "no" = non-member
  const [memberStatus, setMemberStatus] = useState<"yes" | "no" | null>(null);
  const [memberAnswer, setMemberAnswer] = useState<string>("");

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const set = (field: keyof FormData, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const toggleArray = (field: "roles" | "genders", value: string) => {
    setForm((prev) => {
      const arr = prev[field] as string[];
      return {
        ...prev,
        [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateStep = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (step === 0 && !form.workshop) e.workshop = "Please select an academy workshop.";
    if (step === 1) {
      if (!form.firstName.trim()) e.firstName = "First name is required.";
      if (!form.lastName.trim()) e.lastName = "Last name is required.";
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "A valid email is required.";
      if (!form.phone.trim()) e.phone = "Cell phone number is required.";
      if (!form.state) e.state = "Please select your state.";
    }
    if (step === 2) {
      if (!form.yearsCoached.trim()) e.yearsCoached = "Please enter years coached.";
      if (form.roles.length === 0) e.roles = "Please select at least one role.";
      if (form.genders.length === 0) e.genders = "Please select at least one gender coached.";
    }
    if (step === 3) {
      if (!form.schoolName.trim()) e.schoolName = "School name is required.";
      if (!form.schoolCity.trim()) e.schoolCity = "School city is required.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validateStep()) setStep((s) => s + 1); };
  const back = () => setStep((s) => s - 1);

  const handleSubmit = () => {
    if (!validateStep()) return;

    const subject = encodeURIComponent(`SLA Registration — ${form.firstName} ${form.lastName}`);
    const body = encodeURIComponent(
      `NWCA SCHOLASTIC LEADERSHIP ACADEMY REGISTRATION\n` +
      `================================================\n\n` +
      `NWCA MEMBER: Yes\n\n` +
      `ACADEMY SELECTED:\n${form.workshop}\n\n` +
      `PERSONAL INFORMATION:\n` +
      `Name: ${form.firstName} ${form.lastName}\n` +
      `Email: ${form.email}\n` +
      `Cell Phone: ${form.phone}\n` +
      `State: ${form.state}\n\n` +
      `COACHING BACKGROUND:\n` +
      `Years Coached: ${form.yearsCoached}\n` +
      `Role(s): ${form.roles.join(", ")}\n` +
      `Gender(s) Coached: ${form.genders.join(", ")}\n\n` +
      `SCHOOL INFORMATION:\n` +
      `School Name: ${form.schoolName}\n` +
      `School City: ${form.schoolCity}\n\n` +
      (form.additionalInfo ? `ADDITIONAL INFORMATION:\n${form.additionalInfo}\n\n` : "") +
      `================================================\n` +
      `Submitted via NWCA website`
    );

    window.location.href = `mailto:jbeichner@nwca.cc?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const inputClass = (field: keyof FormData) =>
    `w-full bg-[#0f1420] border ${errors[field] ? "border-red-500" : "border-white/20"} text-white px-4 py-3 font-body text-sm placeholder-[#6b7280] focus:outline-none focus:border-[#C41E3A] transition-colors`;

  const selectClass = (field: keyof FormData) =>
    `w-full bg-[#0f1420] border ${errors[field] ? "border-red-500" : "border-white/20"} text-white px-4 py-3 font-body text-sm focus:outline-none focus:border-[#C41E3A] transition-colors appearance-none cursor-pointer`;

  return (
    <div className="min-h-screen bg-[#0f1420] text-white">
      <NavBar solid />

      {/* Hero */}
      <section className="bg-[#0f1420] border-b border-white/10 pt-16 pb-12">
        <div className="container">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/" className="text-[#c8cdd6] hover:text-white text-xs font-condensed tracking-widest uppercase transition-colors">Home</Link>
            <span className="text-[#c8cdd6]">/</span>
            <Link href="/coaching/scholastic" className="text-[#c8cdd6] hover:text-white text-xs font-condensed tracking-widest uppercase transition-colors">Scholastic Academy</Link>
            <span className="text-[#c8cdd6]">/</span>
            <span className="text-white text-xs font-condensed tracking-widest uppercase">Register</span>
          </div>
          <p className="font-condensed text-white text-sm tracking-[0.2em] uppercase mb-2">Presented by The United States Marine Corps</p>
          <h1 className="font-display text-4xl md:text-6xl uppercase leading-none mb-3">
            Registration
          </h1>
          <p className="font-body text-[#c8cdd6] text-sm max-w-xl">
            The survey will take approximately 4 minutes to complete. Applications are reviewed by NWCA Coaching Development Director Jim Beichner.
          </p>
        </div>
      </section>

      {submitted ? (
        /* Success State */
        <section className="py-24">
          <div className="container max-w-2xl text-center">
            <CheckCircle className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="font-display text-4xl uppercase mb-4">Registration Submitted</h2>
            <p className="font-body text-[#c8cdd6] leading-relaxed mb-2">
              Your email client has opened with your registration pre-filled and addressed to Jim Beichner at <span className="text-white">jbeichner@nwca.cc</span>.
            </p>
            <p className="font-body text-[#c8cdd6] leading-relaxed mb-8">
              Please send the email to complete your registration. If your email client did not open, you can email Jim directly at <a href="mailto:jbeichner@nwca.cc" className="text-white hover:underline">jbeichner@nwca.cc</a> or call <a href="tel:716-289-2855" className="text-white hover:underline">716-289-2855</a>.
            </p>
            <Link href="/coaching/scholastic" className="inline-flex items-center gap-2 font-condensed font-700 text-sm tracking-widest uppercase px-6 py-3 bg-[#C41E3A] text-white hover:bg-[#a01830] transition-colors">
              Back to SLA Page <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      ) : memberStatus === "no" ? (
        /* ── BLOCKED: Not a member ── */
        <section className="py-24">
          <div className="container max-w-2xl text-center">
            <XCircle className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="font-display text-4xl uppercase mb-4">NWCA Membership Required</h2>
            <p className="font-body text-[#c8cdd6] leading-relaxed mb-6">
              Registration for the Scholastic Leadership Academy is open to <strong className="text-white">current NWCA members only</strong>. Please join or renew your membership to proceed.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://content.nwcaonline.com/membership/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-condensed font-700 text-sm tracking-widest uppercase px-6 py-3 bg-[#C41E3A] text-white hover:bg-[#a01830] transition-colors"
              >
                Join NWCA <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => { setMemberStatus(null); setMemberAnswer(""); }}
                className="inline-flex items-center gap-2 font-condensed font-700 text-sm tracking-widest uppercase px-6 py-3 border border-white/30 text-white hover:border-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Go Back
              </button>
            </div>
          </div>
        </section>

      ) : memberStatus === null ? (
        /* ── GATING QUESTION: Q1 — NWCA Membership ── */
        <section className="py-16">
          <div className="container max-w-2xl">
            <div className="bg-[#C41E3A]/10 border border-[#C41E3A]/30 px-5 py-3 mb-8">
              <p className="font-body text-sm text-[#c8cdd6]">
                The NWCA Scholastic Leadership Academy is proudly sponsored by the <span className="text-white font-semibold">United States Marine Corps</span>. Must be an NWCA Member.
              </p>
            </div>

            <div>
              <label className="block font-condensed font-700 text-sm tracking-wide text-white mb-4">
                1. Are you a current NWCA member? <span className="text-white">*</span>
              </label>
              <div className="space-y-3 mb-8">
                {["Yes", "No"].map((opt) => (
                  <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                    <div
                      className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center transition-colors ${
                        memberAnswer === opt ? "bg-[#C41E3A] border-[#C41E3A]" : "border-white/30 group-hover:border-[#C41E3A]/50"
                      }`}
                      onClick={() => setMemberAnswer(opt)}
                    >
                      {memberAnswer === opt && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <span
                      className="font-body text-sm text-[#d1d5db] group-hover:text-white transition-colors"
                      onClick={() => setMemberAnswer(opt)}
                    >{opt}</span>
                  </label>
                ))}
              </div>
              {!memberAnswer && (
                <p className="text-[#c8cdd6] text-xs font-body mb-4">Please select an answer to continue.</p>
              )}
              <button
                disabled={!memberAnswer}
                onClick={() => setMemberStatus(memberAnswer === "Yes" ? "yes" : "no")}
                className="flex items-center gap-2 font-condensed font-700 text-sm tracking-widest uppercase px-6 py-3 bg-[#C41E3A] text-white hover:bg-[#a01830] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

      ) : (
        /* ── MAIN FORM (member confirmed) ── */
        <section className="py-12">
          <div className="container max-w-2xl">

            {/* Progress Bar */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-3">
                {STEPS.map((label, i) => (
                  <div key={label} className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-condensed font-700 flex-shrink-0 transition-colors ${
                      i < step ? "bg-[#C41E3A] text-white" : i === step ? "bg-[#C41E3A] text-white ring-2 ring-[#C41E3A]/30" : "bg-white/10 text-[#c8cdd6]"
                    }`}>{i < step ? "✓" : i + 1}</div>
                    {i < STEPS.length - 1 && (
                      <div className={`h-px flex-1 w-8 md:w-16 transition-colors ${i < step ? "bg-[#C41E3A]" : "bg-white/10"}`} />
                    )}
                  </div>
                ))}
              </div>
              <p className="font-condensed text-white text-xs tracking-widest uppercase">
                Step {step + 1} of {STEPS.length} — {STEPS[step]}
              </p>
            </div>

            {/* Sponsor note */}
            <div className="bg-[#C41E3A]/10 border border-[#C41E3A]/30 px-5 py-3 mb-8">
              <p className="font-body text-sm text-[#c8cdd6]">
                The NWCA Scholastic Leadership Academy is proudly sponsored by the <span className="text-white font-semibold">United States Marine Corps</span>.
              </p>
            </div>

            <div className="space-y-8">

              {/* ── STEP 0: Academy Selection ── */}
              {step === 0 && (
                <div>
                  <label className="block font-condensed font-700 text-sm tracking-wide text-white mb-2">
                    2. Please select the CEO Scholastic Leadership Academy you plan on attending. <span className="text-white">*</span>
                  </label>
                  <div className="relative">
                    <select
                      className={selectClass("workshop")}
                      value={form.workshop}
                      onChange={(e) => set("workshop", e.target.value)}
                    >
                      <option value="">Select your answer</option>
                      {WORKSHOPS.map((w) => (
                        <option key={w} value={w}>{w}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c8cdd6] pointer-events-none" />
                  </div>
                  {errors.workshop && <p className="text-red-400 text-xs mt-1">{errors.workshop}</p>}
                </div>
              )}

              {/* ── STEP 1: Personal Info ── */}
              {step === 1 && (
                <>
                  <div>
                    <label className="block font-condensed font-700 text-sm tracking-wide text-white mb-2">
                      3. First Name <span className="text-white">*</span>
                    </label>
                    <input
                      type="text"
                      className={inputClass("firstName")}
                      placeholder="Enter your answer"
                      value={form.firstName}
                      onChange={(e) => set("firstName", e.target.value)}
                    />
                    {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block font-condensed font-700 text-sm tracking-wide text-white mb-2">
                      4. Last Name <span className="text-white">*</span>
                    </label>
                    <input
                      type="text"
                      className={inputClass("lastName")}
                      placeholder="Enter your answer"
                      value={form.lastName}
                      onChange={(e) => set("lastName", e.target.value)}
                    />
                    {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
                  </div>

                  <div>
                    <label className="block font-condensed font-700 text-sm tracking-wide text-white mb-2">
                      5. Email Address <span className="text-white">*</span>
                    </label>
                    <input
                      type="email"
                      className={inputClass("email")}
                      placeholder="Enter your answer"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block font-condensed font-700 text-sm tracking-wide text-white mb-2">
                      6. Cell Phone # <span className="text-white">*</span>
                    </label>
                    <input
                      type="tel"
                      className={inputClass("phone")}
                      placeholder="Enter your answer"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                    />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block font-condensed font-700 text-sm tracking-wide text-white mb-2">
                      7. State <span className="text-white">*</span>
                    </label>
                    <div className="relative">
                      <select
                        className={selectClass("state")}
                        value={form.state}
                        onChange={(e) => set("state", e.target.value)}
                      >
                        <option value="">Select your answer</option>
                        {US_STATES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c8cdd6] pointer-events-none" />
                    </div>
                    {errors.state && <p className="text-red-400 text-xs mt-1">{errors.state}</p>}
                  </div>
                </>
              )}

              {/* ── STEP 2: Coaching Background ── */}
              {step === 2 && (
                <>
                  <div>
                    <label className="block font-condensed font-700 text-sm tracking-wide text-white mb-2">
                      8. # of Years Coached <span className="text-white">*</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      className={inputClass("yearsCoached")}
                      placeholder="Enter your answer"
                      value={form.yearsCoached}
                      onChange={(e) => set("yearsCoached", e.target.value)}
                    />
                    {errors.yearsCoached && <p className="text-red-400 text-xs mt-1">{errors.yearsCoached}</p>}
                  </div>

                  <div>
                    <label className="block font-condensed font-700 text-sm tracking-wide text-white mb-3">
                      9. Role (select all that apply) <span className="text-white">*</span>
                    </label>
                    <div className="space-y-3">
                      {ROLES.map((role) => (
                        <label key={role} className="flex items-center gap-3 cursor-pointer group">
                          <div
                            className={`w-5 h-5 border flex-shrink-0 flex items-center justify-center transition-colors ${
                              form.roles.includes(role) ? "bg-[#C41E3A] border-[#C41E3A]" : "border-white/30 group-hover:border-[#C41E3A]/50"
                            }`}
                            onClick={() => toggleArray("roles", role)}
                          >
                            {form.roles.includes(role) && <span className="text-white text-xs">✓</span>}
                          </div>
                          <span
                            className="font-body text-sm text-[#d1d5db] group-hover:text-white transition-colors"
                            onClick={() => toggleArray("roles", role)}
                          >{role}</span>
                        </label>
                      ))}
                    </div>
                    {errors.roles && <p className="text-red-400 text-xs mt-2">{errors.roles}</p>}
                  </div>

                  <div>
                    <label className="block font-condensed font-700 text-sm tracking-wide text-white mb-3">
                      10. Genders coached <span className="text-white">*</span>
                    </label>
                    <div className="space-y-3">
                      {["Male", "Female"].map((g) => (
                        <label key={g} className="flex items-center gap-3 cursor-pointer group">
                          <div
                            className={`w-5 h-5 border flex-shrink-0 flex items-center justify-center transition-colors ${
                              form.genders.includes(g) ? "bg-[#C41E3A] border-[#C41E3A]" : "border-white/30 group-hover:border-[#C41E3A]/50"
                            }`}
                            onClick={() => toggleArray("genders", g)}
                          >
                            {form.genders.includes(g) && <span className="text-white text-xs">✓</span>}
                          </div>
                          <span
                            className="font-body text-sm text-[#d1d5db] group-hover:text-white transition-colors"
                            onClick={() => toggleArray("genders", g)}
                          >{g}</span>
                        </label>
                      ))}
                    </div>
                    {errors.genders && <p className="text-red-400 text-xs mt-2">{errors.genders}</p>}
                  </div>
                </>
              )}

              {/* ── STEP 3: School Info ── */}
              {step === 3 && (
                <>
                  <div>
                    <label className="block font-condensed font-700 text-sm tracking-wide text-white mb-2">
                      11. School / Program Name <span className="text-white">*</span>
                    </label>
                    <input
                      type="text"
                      className={inputClass("schoolName")}
                      placeholder="Enter your answer"
                      value={form.schoolName}
                      onChange={(e) => set("schoolName", e.target.value)}
                    />
                    {errors.schoolName && <p className="text-red-400 text-xs mt-1">{errors.schoolName}</p>}
                  </div>

                  <div>
                    <label className="block font-condensed font-700 text-sm tracking-wide text-white mb-2">
                      12. School City <span className="text-white">*</span>
                    </label>
                    <input
                      type="text"
                      className={inputClass("schoolCity")}
                      placeholder="Enter your answer"
                      value={form.schoolCity}
                      onChange={(e) => set("schoolCity", e.target.value)}
                    />
                    {errors.schoolCity && <p className="text-red-400 text-xs mt-1">{errors.schoolCity}</p>}
                  </div>

                  <div>
                    <label className="block font-condensed font-700 text-sm tracking-wide text-white mb-2">
                      13. Additional information (optional)
                    </label>
                    <textarea
                      rows={4}
                      className="w-full bg-[#0f1420] border border-white/20 text-white px-4 py-3 font-body text-sm placeholder-[#6b7280] focus:outline-none focus:border-[#C41E3A] transition-colors resize-none"
                      placeholder="Any additional information you'd like to share..."
                      value={form.additionalInfo}
                      onChange={(e) => set("additionalInfo", e.target.value)}
                    />
                  </div>
                </>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                {step > 0 ? (
                  <button
                    onClick={back}
                    className="flex items-center gap-2 font-condensed font-700 text-sm tracking-widest uppercase px-5 py-3 border border-white/30 text-white hover:border-white transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                ) : (
                  <div />
                )}

                {step < STEPS.length - 1 ? (
                  <button
                    onClick={next}
                    className="flex items-center gap-2 font-condensed font-700 text-sm tracking-widest uppercase px-6 py-3 bg-[#C41E3A] text-white hover:bg-[#a01830] transition-colors"
                  >
                    Next <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="flex items-center gap-2 font-condensed font-700 text-sm tracking-widest uppercase px-6 py-3 bg-[#C41E3A] text-white hover:bg-[#a01830] transition-colors"
                  >
                    Submit Registration <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              <p className="text-xs text-[#c8cdd6] font-body">
                Your registration will be sent directly to NWCA Coaching Development Director Jim Beichner at <span className="text-white">jbeichner@nwca.cc</span>.
              </p>

            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
