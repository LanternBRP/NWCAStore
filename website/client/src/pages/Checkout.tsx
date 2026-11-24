import { FormEvent, useMemo, useState } from "react";
import { useLocation } from "wouter";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import {
  ArrowRight, CalendarDays, CheckCircle2, Heart, LockKeyhole,
  RefreshCw, ShoppingBag, ShieldCheck, UserRound, UsersRound
} from "lucide-react";
import {
  createHostedCheckout, getAmsLoginUrl, type DonationFrequency, type PurchaseKind,
} from "@/lib/commerceContract";

type MembershipPlan = {
  id: string;
  title: string;
  audience: string;
  description: string;
};

const MEMBERSHIP_PLANS: MembershipPlan[] = [
  { id: "collegiate", title: "Collegiate Coach", audience: "NCAA · NAIA · NJCAA · NCWA", description: "For college and university coaches." },
  { id: "scholastic", title: "Scholastic Coach", audience: "Middle School · High School", description: "For coaches growing the next generation." },
  { id: "youth", title: "Youth Coach", audience: "Elementary · Club · Youth Programs", description: "For youth, club, and elementary coaches." },
  { id: "retired", title: "Retired Coach", audience: "Emeritus · Mentor", description: "For coaches staying active in the community." },
  { id: "officials", title: "Referees & Officials", audience: "All Levels", description: "For wrestling officials and referees." },
  { id: "fan", title: "Fan / Parent", audience: "Supporters · Families", description: "For the supporters advancing wrestling." },
];

const EVENTS = [
  { id: "convention-2026", passId: "full-registration", title: "NWCA Annual Convention 2026", detail: "July 31–August 2 · Baltimore, MD" },
  { id: "national-duals-2027", passId: "all-session", title: "National Duals Championship 2027", detail: "January 15–17 · Baltimore, MD" },
];

const DONATION_FREQUENCIES: [DonationFrequency, string][] = [
  ["one_time", "One time"],
  ["monthly", "Monthly"],
  ["annual", "Annual"],
];

const FLOW_TABS: { id: PurchaseKind; label: string; icon: typeof UsersRound }[] = [
  { id: "membership", label: "Membership", icon: UsersRound },
  { id: "renewal", label: "Annual renewal", icon: RefreshCw },
  { id: "donation", label: "Donate", icon: Heart },
  { id: "event", label: "Event", icon: CalendarDays },
  { id: "product", label: "Gear", icon: ShoppingBag },
];

function flowFromQuery(): PurchaseKind {
  const flow = new URLSearchParams(window.location.search).get("flow");
  return FLOW_TABS.some((tab) => tab.id === flow) ? flow as PurchaseKind : "membership";
}

function planFromQuery() {
  const planId = new URLSearchParams(window.location.search).get("plan");
  return MEMBERSHIP_PLANS.some((plan) => plan.id === planId) ? planId as string : "collegiate";
}

function eventFromQuery() {
  const eventId = new URLSearchParams(window.location.search).get("event");
  return EVENTS.some((event) => event.id === eventId) ? eventId as string : EVENTS[0].id;
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="font-condensed font-700 text-[11px] tracking-widest uppercase text-[#17214B]">{children}</label>;
}

function TextInput({ value, onChange, placeholder, type = "text", required = false }: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <input
      required={required}
      value={value}
      type={type}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="mt-1.5 w-full border border-[#17214B]/20 bg-white px-3.5 py-3 font-body text-sm text-[#17214B] outline-none transition-colors placeholder:text-[#6b7280] focus:border-[#C41E3A] focus:ring-2 focus:ring-[#C41E3A]/10"
    />
  );
}

export default function Checkout() {
  const [, navigate] = useLocation();
  const [flow, setFlow] = useState<PurchaseKind>(flowFromQuery);
  const [membershipPlanId, setMembershipPlanId] = useState(planFromQuery);
  const [eventId, setEventId] = useState(eventFromQuery);
  const [frequency, setFrequency] = useState<DonationFrequency>("one_time");
  const [amount, setAmount] = useState("100");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const selectedPlan = MEMBERSHIP_PLANS.find((plan) => plan.id === membershipPlanId) ?? MEMBERSHIP_PLANS[0];
  const selectedEvent = EVENTS.find((event) => event.id === eventId) ?? EVENTS[0];
  const loginUrl = useMemo(() => getAmsLoginUrl(window.location.href), []);
  const hasProfile = Boolean(firstName.trim() && lastName.trim() && /^\S+@\S+\.\S+$/.test(email));
  const donationAmountCents = Math.round(Number(amount) * 100);
  const requiresProfile = flow !== "renewal";
  const canContinue = flow === "product" || (!requiresProfile || hasProfile) && (flow !== "donation" || donationAmountCents >= 100);

  const selectFlow = (next: PurchaseKind) => {
    setFlow(next);
    setMessage(null);
    const query = new URLSearchParams(window.location.search);
    query.set("flow", next);
    navigate(`/checkout?${query.toString()}`);
  };

  const handleAmsLogin = () => {
    if (loginUrl) {
      window.location.assign(loginUrl);
      return;
    }
    setMessage("AMS login will be enabled after VITE_AMS_LOGIN_URL is configured by the implementation team.");
  };

  const handleCheckout = async (event: FormEvent) => {
    event.preventDefault();
    setMessage(null);

    if (!canContinue) {
      setMessage(flow === "donation" ? "Enter a donation of at least $1.00 to continue." : "Complete the required contact details to continue.");
      return;
    }

    setLoading(true);
    try {
      const origin = window.location.origin;
      const response = await createHostedCheckout({
        kind: flow,
        customer: { firstName, lastName, email, organization: organization || undefined },
        membershipPlanId: flow === "membership" ? membershipPlanId : undefined,
        donation: flow === "donation" ? { amountCents: donationAmountCents, frequency } : undefined,
        event: flow === "event" ? { eventId: selectedEvent.id, passId: selectedEvent.passId } : undefined,
        // Shopify variants are passed by the Shop cart once that live data source is connected.
        product: flow === "product" ? [] : undefined,
        returnUrl: `${origin}/checkout?status=success&reference={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${origin}/checkout?status=cancelled`,
      });
      window.location.assign(response.checkoutUrl);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to start secure checkout.");
    } finally {
      setLoading(false);
    }
  };

  const status = new URLSearchParams(window.location.search).get("status");

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#17214B]">
      <NavBar solid />

      <main>
        <section className="relative overflow-hidden bg-[#0A1628] pt-28 pb-12 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(196,30,58,0.35),transparent_32%),linear-gradient(120deg,#0A1628,#17214B)]" />
          <div className="relative container">
            <div className="flex items-center gap-2 font-condensed text-[11px] tracking-[0.18em] uppercase text-[#F5C842]">
              <span className="h-px w-7 bg-[#F5C842]" /> Secure services
            </div>
            <div className="mt-4 grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <h1 className="font-display text-5xl leading-none md:text-7xl">MEMBERSHIP <span className="text-[#F5C842]">STARTS HERE.</span></h1>
                <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-white/75 md:text-lg">
                  Join or renew first, then manage event registrations, gifts, and official gear with one trusted NWCA account.
                </p>
              </div>
              <div className="flex items-center gap-2 border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/85">
                <LockKeyhole className="h-4 w-4 text-[#F5C842]" /> Hosted, PCI-compliant checkout
              </div>
            </div>
          </div>
        </section>

        {status === "success" && (
          <div className="bg-[#e9f8ec] border-y border-[#25813d]/20">
            <div className="container flex items-center gap-3 py-4 text-[#175c2a] font-body text-sm"><CheckCircle2 className="w-5 h-5" /> Payment received. The AMS will confirm account access, enrollment, or membership activation.</div>
          </div>
        )}
        {status === "cancelled" && (
          <div className="bg-[#fff7e6] border-y border-[#b8860b]/20"><div className="container py-4 text-sm font-body text-[#725000]">Checkout was cancelled. Your selections have not been submitted.</div></div>
        )}

        <section className="border-b border-[#17214B]/10 bg-white">
          <div className="container py-4">
            <ol className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
              {[
                ["1", "Choose membership", "Select your role or renew an existing membership."],
                ["2", "Secure payment", "Checkout is hosted by Stripe or Shopify—not stored on NWCA."],
                ["3", "Account access", "The AMS activates benefits and registration eligibility."],
              ].map(([number, title, body]) => (
                <li key={number} className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#C41E3A] font-condensed font-700 text-white">{number}</span>
                  <span><strong className="font-condensed tracking-wide uppercase text-[#17214B]">{title}</strong><span className="mt-0.5 block font-body text-xs leading-relaxed text-[#596579]">{body}</span></span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="container py-10 md:py-14">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div>
              <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
                {FLOW_TABS.map((tab) => {
                  const Icon = tab.icon;
                  const active = flow === tab.id;
                  return <button key={tab.id} onClick={() => selectFlow(tab.id)} className={`flex shrink-0 items-center gap-2 border px-4 py-3 font-condensed text-[11px] font-700 tracking-widest uppercase transition-colors ${active ? "border-[#C41E3A] bg-[#C41E3A] text-white" : "border-[#17214B]/15 bg-white text-[#17214B] hover:border-[#17214B]/40"}`}><Icon className="h-3.5 w-3.5" />{tab.label}</button>;
                })}
              </div>

              <form onSubmit={handleCheckout} className="border border-[#17214B]/10 bg-white shadow-sm">
                <div className="border-b border-[#17214B]/10 px-6 py-5 md:px-8">
                  <p className="font-condensed text-[11px] font-700 tracking-[0.18em] uppercase text-[#C41E3A]">{flow === "membership" ? "New membership" : flow === "renewal" ? "Annual renewal" : flow === "donation" ? "Make a gift" : flow === "event" ? "Event registration" : "Official NWCA gear"}</p>
                  <h2 className="mt-1 font-display text-3xl text-[#17214B]">{flow === "membership" ? "Choose your coaching role" : flow === "renewal" ? "Renew with your NWCA account" : flow === "donation" ? "Choose your contribution" : flow === "event" ? "Select your registration" : "Continue from your gear cart"}</h2>
                </div>

                <div className="space-y-7 p-6 md:p-8">
                  {flow === "membership" && (
                    <div className="grid gap-3 md:grid-cols-2">
                      {MEMBERSHIP_PLANS.map((plan) => (
                        <button type="button" key={plan.id} onClick={() => setMembershipPlanId(plan.id)} className={`text-left border p-4 transition-all ${membershipPlanId === plan.id ? "border-[#C41E3A] bg-[#fff5f6] shadow-[inset_4px_0_0_#C41E3A]" : "border-[#17214B]/15 hover:border-[#17214B]/35"}`}>
                          <span className="block font-condensed text-base font-700 uppercase tracking-wide text-[#17214B]">{plan.title}</span>
                          <span className="mt-1 block font-condensed text-[10px] font-700 uppercase tracking-widest text-[#C41E3A]">{plan.audience}</span>
                          <span className="mt-2 block font-body text-sm leading-relaxed text-[#596579]">{plan.description}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {flow === "renewal" && (
                    <div className="border-l-4 border-[#C41E3A] bg-[#fff5f6] p-5">
                      <div className="flex gap-3"><UserRound className="mt-0.5 h-5 w-5 text-[#C41E3A]" /><div><h3 className="font-condensed text-lg font-700 uppercase tracking-wide">Sign in to see your renewal</h3><p className="mt-1 font-body text-sm leading-relaxed text-[#596579]">Your account determines eligibility, membership type, renewal date, and member pricing. This prevents duplicate records and preserves your current benefits.</p></div></div>
                      <button type="button" onClick={handleAmsLogin} className="mt-4 inline-flex items-center gap-2 bg-[#17214B] px-4 py-2.5 font-condensed text-xs font-700 tracking-widest uppercase text-white hover:bg-[#0A1628]">Sign in to renew <ArrowRight className="h-3.5 w-3.5" /></button>
                    </div>
                  )}

                  {flow === "donation" && (
                    <div className="space-y-5">
                      <div><FieldLabel>Giving frequency</FieldLabel><div className="mt-2 flex flex-wrap gap-2">{DONATION_FREQUENCIES.map(([value, label]) => <button key={value} type="button" onClick={() => setFrequency(value)} className={`border px-4 py-2.5 font-condensed text-xs font-700 tracking-widest uppercase ${frequency === value ? "border-[#C41E3A] bg-[#C41E3A] text-white" : "border-[#17214B]/20 text-[#17214B] hover:border-[#17214B]/40"}`}>{label}</button>)}</div></div>
                      <div><FieldLabel>Gift amount</FieldLabel><div className="mt-2 flex flex-wrap gap-2">{[25, 100, 500, 1000].map((value) => <button key={value} type="button" onClick={() => setAmount(String(value))} className={`border px-4 py-2.5 font-condensed text-xs font-700 tracking-widest uppercase ${Number(amount) === value ? "border-[#C41E3A] bg-[#C41E3A] text-white" : "border-[#17214B]/20 text-[#17214B] hover:border-[#17214B]/40"}`}>${value}</button>)}</div><div className="mt-3 max-w-[190px]"><TextInput value={amount} onChange={setAmount} placeholder="Custom amount" type="number" /></div></div>
                    </div>
                  )}

                  {flow === "event" && (
                    <div className="space-y-3">
                      {EVENTS.map((event) => <button key={event.id} type="button" onClick={() => setEventId(event.id)} className={`flex w-full items-center justify-between gap-4 border p-4 text-left ${eventId === event.id ? "border-[#C41E3A] bg-[#fff5f6]" : "border-[#17214B]/15 hover:border-[#17214B]/35"}`}><span><span className="block font-condensed text-base font-700 uppercase tracking-wide">{event.title}</span><span className="mt-1 block font-body text-sm text-[#596579]">{event.detail}</span></span>{eventId === event.id && <CheckCircle2 className="h-5 w-5 shrink-0 text-[#C41E3A]" />}</button>)}
                      <p className="font-body text-xs leading-relaxed text-[#596579]">The AMS applies member rates and eligibility after account sign-in. Capacity, discounts, and badge details are confirmed after payment succeeds.</p>
                    </div>
                  )}

                  {flow === "product" && (
                    <div className="border-l-4 border-[#F5C842] bg-[#fffaf0] p-5"><div className="flex gap-3"><ShoppingBag className="mt-0.5 h-5 w-5 text-[#b8860b]" /><div><h3 className="font-condensed text-lg font-700 uppercase tracking-wide">Merchandise checkout is Shopify-powered</h3><p className="mt-1 font-body text-sm leading-relaxed text-[#596579]">When live variants are connected, the gear cart passes variant IDs and quantities to Shopify Cart API. Shopify returns the hosted checkout URL; fulfillment, tax, shipping, and inventory stay with the merchandise vendor.</p><button type="button" onClick={() => navigate("/shop")} className="mt-4 inline-flex items-center gap-2 bg-[#17214B] px-4 py-2.5 font-condensed text-xs font-700 tracking-widest uppercase text-white hover:bg-[#0A1628]">Return to gear store <ArrowRight className="h-3.5 w-3.5" /></button></div></div></div>
                  )}

                  {flow !== "renewal" && flow !== "product" && (
                    <div className="border-t border-[#17214B]/10 pt-6">
                      <div className="mb-4 flex items-center justify-between gap-4"><div><h3 className="font-condensed text-lg font-700 uppercase tracking-wide">Account details</h3><p className="mt-0.5 font-body text-sm text-[#596579]">Already a member? Sign in first so your existing record is used.</p></div><button type="button" onClick={handleAmsLogin} className="shrink-0 font-condensed text-[11px] font-700 tracking-widest uppercase text-[#C41E3A] hover:text-[#8d1127]">Sign in</button></div>
                      <div className="grid gap-4 sm:grid-cols-2"><div><FieldLabel>First name</FieldLabel><TextInput required value={firstName} onChange={setFirstName} placeholder="First name" /></div><div><FieldLabel>Last name</FieldLabel><TextInput required value={lastName} onChange={setLastName} placeholder="Last name" /></div><div><FieldLabel>Email</FieldLabel><TextInput required type="email" value={email} onChange={setEmail} placeholder="you@example.com" /></div><div><FieldLabel>Organization <span className="normal-case tracking-normal text-[#6b7280]">(optional)</span></FieldLabel><TextInput value={organization} onChange={setOrganization} placeholder="School, club, or organization" /></div></div>
                    </div>
                  )}
                </div>

                {message && <div role="alert" className="mx-6 mb-2 border border-[#C41E3A]/25 bg-[#fff5f6] px-4 py-3 font-body text-sm text-[#8d1127] md:mx-8">{message}</div>}
                <div className="flex flex-col-reverse gap-3 border-t border-[#17214B]/10 bg-[#F8F9FA] px-6 py-5 sm:flex-row sm:items-center sm:justify-between md:px-8">
                  <span className="flex items-center gap-2 font-body text-xs text-[#596579]"><ShieldCheck className="h-4 w-4 text-[#25813d]" /> No card details are collected on this site.</span>
                  {flow !== "product" && <button disabled={loading} className="inline-flex items-center justify-center gap-2 bg-[#C41E3A] px-6 py-3.5 font-condensed text-sm font-700 tracking-widest uppercase text-white transition-colors hover:bg-[#a01830] disabled:cursor-wait disabled:opacity-60">{loading ? "Opening secure checkout…" : flow === "membership" ? "Continue to payment" : flow === "renewal" ? "Renew membership" : flow === "donation" ? "Donate securely" : "Register securely"}<ArrowRight className="h-4 w-4" /></button>}
                </div>
              </form>
            </div>

            <aside className="space-y-5 lg:sticky lg:top-6">
              <div className="bg-[#17214B] p-6 text-white shadow-sm">
                <div className="flex items-center gap-2 text-[#F5C842]"><img src="/manus-storage/NWCALogo_02601508.png" alt="NWCA" className="h-7 w-auto object-contain" /><span className="font-condensed text-xs font-700 tracking-widest uppercase">Your NWCA account</span></div>
                <h3 className="mt-3 font-display text-3xl">ONE RECORD.<br /><span className="text-[#F5C842]">EVERY BENEFIT.</span></h3>
                <ul className="mt-5 space-y-3 font-body text-sm leading-relaxed text-white/75"><li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#F5C842]" />Membership and annual renewal status</li><li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#F5C842]" />Member pricing and event eligibility</li><li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#F5C842]" />Community and coaching-resource access</li></ul>
              </div>
              <div className="border border-[#17214B]/10 bg-white p-6"><h3 className="font-condensed text-base font-700 uppercase tracking-wide">Selected request</h3><dl className="mt-4 space-y-3 font-body text-sm"><div className="flex justify-between gap-3"><dt className="text-[#596579]">Service</dt><dd className="text-right font-medium text-[#17214B]">{flow === "membership" ? selectedPlan.title : flow === "renewal" ? "Annual renewal" : flow === "donation" ? `${frequency === "one_time" ? "One-time" : frequency} donation` : flow === "event" ? selectedEvent.title : "Official NWCA gear"}</dd></div>{flow === "donation" && <div className="flex justify-between gap-3"><dt className="text-[#596579]">Amount</dt><dd className="font-medium text-[#17214B]">${Number(amount || 0).toFixed(2)}</dd></div>}<div className="flex justify-between gap-3"><dt className="text-[#596579]">Payment provider</dt><dd className="font-medium text-[#17214B]">{flow === "product" ? "Shopify" : "Stripe Checkout"}</dd></div></dl></div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
