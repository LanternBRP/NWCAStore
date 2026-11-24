import { useCallback, useEffect, useState, type ReactNode } from "react";
import type { CommerceProduct, LanternApi, MembershipPlan, MembershipRecord, RegistrationEvent, Invoice } from "../api/contracts";
import type { PortalExtensionMountOptions, TenantPortalExtensionConfig } from "../types";
import { PortalApiError } from "../types";
import { EmptyState, LoadingState, Notice, RequestError } from "../components/ui-states";

type ScreenProps = Pick<PortalExtensionMountOptions, "context" | "config" | "onHostedCheckout"> & { api: LanternApi };

type AsyncResult<T> = { loading: boolean; data: T | null; error: unknown | null; reload: () => void };

function useApiList<T>(loader: (signal: AbortSignal) => Promise<T>): AsyncResult<T> {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<Omit<AsyncResult<T>, "reload">>({ loading: true, data: null, error: null });

  useEffect(() => {
    const controller = new AbortController();
    setState({ loading: true, data: null, error: null });
    loader(controller.signal)
      .then((data) => setState({ loading: false, data, error: null }))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setState({ loading: false, data: null, error });
      });
    return () => controller.abort();
  }, [attempt, loader]);

  return { ...state, reload: () => setAttempt((value) => value + 1) };
}

function startCheckout(result: { checkoutUrl: string; referenceId: string }, onHostedCheckout?: (url: string, referenceId: string) => void) {
  if (onHostedCheckout) {
    onHostedCheckout(result.checkoutUrl, result.referenceId);
    return;
  }
  window.location.assign(result.checkoutUrl);
}

function MutationButton({ children, onClick, disabled }: { children: ReactNode; onClick: () => Promise<void>; disabled?: boolean }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async () => {
    setPending(true);
    setError(null);
    try { await onClick(); }
    catch (cause) {
      const apiError = cause instanceof PortalApiError ? cause : null;
      setError(apiError?.status === 403 ? "You do not have permission to complete this action." : apiError?.status === 422 ? "Please review the information and try again." : "We could not start secure checkout. Please try again.");
    } finally { setPending(false); }
  };

  return <div className="lantern-mutation"><button type="button" className="lantern-button" disabled={pending || disabled} onClick={execute}>{pending ? "Preparing secure checkout…" : children}</button>{error && <span role="alert" className="lantern-field-error">{error}</span>}</div>;
}

function PageHeading({ eyebrow, title, detail }: { eyebrow: string; title: string; detail: string }) {
  return <div className="lantern-page-heading"><span className="lantern-eyebrow">{eyebrow}</span><h1>{title}</h1><p>{detail}</p></div>;
}

export function MembershipScreen({ api, config, context, onHostedCheckout }: ScreenProps) {
  const canRegister = context.capabilities.includes("registrations:write");
  const plans = useApiList<MembershipPlan[]>(useCallback((signal) => canRegister ? api.getMembershipPlans(signal) : Promise.resolve([]), [api, canRegister]));
  const memberships = useApiList<MembershipRecord[]>(useCallback((signal) => api.getCurrentMemberships(signal), [api]));
  const [promotionCode, setPromotionCode] = useState("");

  return <>
    <PageHeading eyebrow="Membership" title={config.copy.membershipHeading} detail={config.copy.membershipIntro} />
    <section className="lantern-section" aria-labelledby="current-memberships"><h2 id="current-memberships">Current memberships</h2>
      {memberships.loading ? <LoadingState label="Loading memberships" /> : memberships.error ? <RequestError error={memberships.error} onRetry={memberships.reload} /> : memberships.data?.length ? <div className="lantern-card-grid">{memberships.data.map((membership) => <MembershipCard key={membership.id} membership={membership} />)}</div> : <EmptyState title="No active membership on this account" detail="Available membership options are shown below when your portal access allows registration." />}
    </section>
    <section className="lantern-section" aria-labelledby="membership-options"><h2 id="membership-options">Available membership options</h2>
      {!canRegister ? <Notice tone="info">Your current portal access allows membership review but not membership registration.</Notice> : <>{config.features?.promotionCodes && <label className="lantern-promo-field" htmlFor="membership-promotion-code"><span>Promotion code (optional)</span><input id="membership-promotion-code" value={promotionCode} onChange={(event) => setPromotionCode(event.target.value)} autoComplete="off" /></label>}{plans.loading ? <LoadingState label="Loading membership options" /> : plans.error ? <RequestError error={plans.error} onRetry={plans.reload} /> : plans.data?.length ? <div className="lantern-card-grid">{plans.data.map((plan) => <article className="lantern-card" key={plan.id}><div><h3>{plan.name}</h3>{plan.cadence && <span className="lantern-meta">{plan.cadence}</span>}<p>{plan.description || "Details are supplied by LanternAMS."}</p>{plan.eligibilityText && <small>{plan.eligibilityText}</small>}</div><div className="lantern-card-footer"><strong>{plan.displayPrice || "Price shown in checkout"}</strong><MutationButton onClick={async () => startCheckout(await api.startMembershipRegistration({ planId: plan.id, promotionCode: promotionCode.trim() || undefined }), onHostedCheckout)}>Start membership</MutationButton></div></article>)}</div> : <EmptyState title="No membership options available" detail="Contact support if you believe a plan should be available to you." />}</>}
    </section>
  </>;
}

function MembershipCard({ membership }: { membership: MembershipRecord }) {
  return <article className="lantern-card lantern-card--status"><div><span className={`lantern-status lantern-status--${membership.status}`}>{membership.status}</span><h3>{membership.planName}</h3><p>{membership.holder || "Membership holder"}</p></div><dl>{membership.startDate && <div><dt>Started</dt><dd>{membership.startDate}</dd></div>}{membership.renewalDate && <div><dt>Renewal</dt><dd>{membership.renewalDate}</dd></div>}</dl>{membership.benefits?.length ? <ul>{membership.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul> : null}</article>;
}

export function RenewalScreen({ api, config, onHostedCheckout }: ScreenProps) {
  const memberships = useApiList<MembershipRecord[]>(useCallback((signal) => api.getCurrentMemberships(signal), [api]));
  return <><PageHeading eyebrow="Membership renewal" title="Renew your membership" detail="LanternAMS confirms your eligibility, renewal date, and any member-specific terms before secure checkout." />
    <section className="lantern-section">{memberships.loading ? <LoadingState label="Loading renewal options" /> : memberships.error ? <RequestError error={memberships.error} onRetry={memberships.reload} /> : memberships.data?.length ? <div className="lantern-card-grid">{memberships.data.map((membership) => <article className="lantern-card" key={membership.id}><div><h3>{membership.planName}</h3><p>Current status: <strong>{membership.status}</strong></p><p>{membership.renewalDate ? `Renewal date: ${membership.renewalDate}` : "Renewal timing is confirmed by LanternAMS."}</p></div><MutationButton disabled={membership.status !== "active" && membership.status !== "expired"} onClick={async () => startCheckout(await api.startRenewal({ membershipId: membership.id }), onHostedCheckout)}>Continue to renewal</MutationButton></article>)}</div> : <EmptyState title="No membership is available for renewal" detail="Your account has no renewable membership record in the current portal scope." />}</section>
  </>;
}

export function DonationScreen({ api, config, onHostedCheckout }: ScreenProps) {
  const [frequency, setFrequency] = useState<"one_time" | "monthly" | "annual">("one_time");
  const [amount, setAmount] = useState(String(config.donationPresets[1] ?? 100));
  const validAmount = Number(amount) >= 1;

  return <><PageHeading eyebrow="Giving" title={config.copy.donationHeading} detail="Choose a giving frequency and amount. Payment is handled through a LanternAMS provider-hosted checkout." />
    <section className="lantern-section lantern-form-section"><div className="lantern-form-group"><span className="lantern-label">Giving frequency</span><div className="lantern-segmented">{(["one_time", "monthly", "annual"] as const).map((value) => <button type="button" key={value} className={frequency === value ? "is-active" : ""} onClick={() => setFrequency(value)}>{value === "one_time" ? "One time" : value}</button>)}</div></div><div className="lantern-form-group"><span className="lantern-label">Gift amount</span><div className="lantern-presets">{config.donationPresets.map((preset) => <button type="button" key={preset} className={Number(amount) === preset ? "is-active" : ""} onClick={() => setAmount(String(preset))}>${preset}</button>)}</div><label htmlFor="donation-amount" className="lantern-label">Custom amount (USD)</label><input id="donation-amount" inputMode="decimal" type="number" min="1" step="1" value={amount} onChange={(event) => setAmount(event.target.value)} />{!validAmount && <span className="lantern-field-error">Enter an amount of at least $1.00.</span>}</div><MutationButton disabled={!validAmount} onClick={async () => startCheckout(await api.startDonation({ frequency, amountCents: Math.round(Number(amount) * 100) }), onHostedCheckout)}>Continue to secure checkout</MutationButton></section>
  </>;
}

export function RegistrationScreen({ api, config, onHostedCheckout }: ScreenProps) {
  const events = useApiList<RegistrationEvent[]>(useCallback((signal) => api.getRegistrationEvents(signal), [api]));
  const [promotionCode, setPromotionCode] = useState("");
  return <><PageHeading eyebrow="Events" title={config.copy.registrationHeading} detail="Registration eligibility, member pricing, capacity, and required information are all supplied by LanternAMS." />
    <section className="lantern-section">{config.features?.promotionCodes && <label className="lantern-promo-field" htmlFor="registration-promotion-code"><span>Promotion code (optional)</span><input id="registration-promotion-code" value={promotionCode} onChange={(event) => setPromotionCode(event.target.value)} autoComplete="off" /></label>}{events.loading ? <LoadingState label="Loading registrations" /> : events.error ? <RequestError error={events.error} onRetry={events.reload} /> : events.data?.length ? <div className="lantern-card-grid">{events.data.map((event) => <article className="lantern-card" key={event.id}><div><span className={`lantern-status lantern-status--${event.registrationStatus || "open"}`}>{event.registrationStatus || "open"}</span><h3>{event.title}</h3><p>{event.detail || "Event details are provided by LanternAMS."}</p>{event.memberPriceText && <strong>{event.memberPriceText}</strong>}</div><MutationButton disabled={event.registrationStatus === "closed"} onClick={async () => startCheckout(await api.startEventRegistration({ eventId: event.id, promotionCode: promotionCode.trim() || undefined }), onHostedCheckout)}>{event.registrationStatus === "waitlist" ? "Join waitlist" : "Start registration"}</MutationButton></article>)}</div> : <EmptyState title="No registrations are currently available" detail="New events will appear here when they are published to the portal." />}</section>
  </>;
}

export function GearScreen({ api, onHostedCheckout }: ScreenProps) {
  const products = useApiList<CommerceProduct[]>(useCallback((signal) => api.getCommerceProducts(signal), [api]));
  return <><PageHeading eyebrow="Official gear" title="NWCA gear" detail="Catalog availability, pricing, cart, tax, shipping, and checkout are supplied through LanternAMS's approved commerce integration." />
    <section className="lantern-section">{products.loading ? <LoadingState label="Loading gear" /> : products.error ? <RequestError error={products.error} onRetry={products.reload} /> : products.data?.length ? <div className="lantern-card-grid">{products.data.map((product) => <article className="lantern-card" key={product.id}>{product.imageUrl && <img className="lantern-product-image" src={product.imageUrl} alt="" />}<div><h3>{product.name}</h3><p>{product.description || "Product details are supplied by the approved commerce integration."}</p>{product.availabilityText && <small>{product.availabilityText}</small>}</div><div className="lantern-card-footer"><strong>{product.priceText || "Price shown in checkout"}</strong><MutationButton onClick={async () => startCheckout(await api.startProductCheckout({ productId: product.id, quantity: 1 }), onHostedCheckout)}>Buy now</MutationButton></div></article>)}</div> : <EmptyState title="No gear is currently available" detail="Check back when the tenant commerce catalog publishes available items." />}</section>
  </>;
}

export function PaymentsScreen({ api, config }: ScreenProps) {
  const invoices = useApiList<Invoice[]>(useCallback((signal) => api.getInvoices(signal), [api]));
  return <><PageHeading eyebrow="Payments" title={config.copy.paymentsHeading} detail="Balances, payment status, and receipts are supplied directly by LanternAMS." />
    <section className="lantern-section">{invoices.loading ? <LoadingState label="Loading invoices" /> : invoices.error ? <RequestError error={invoices.error} onRetry={invoices.reload} /> : invoices.data?.length ? <div className="lantern-table-wrap"><table className="lantern-table"><thead><tr><th>Invoice</th><th>Status</th><th>Due date</th><th>Amount</th><th>Receipt</th></tr></thead><tbody>{invoices.data.map((invoice) => <tr key={invoice.id}><td data-label="Invoice"><strong>{invoice.number || invoice.id}</strong><span>{invoice.description}</span></td><td data-label="Status"><span className={`lantern-status lantern-status--${invoice.status}`}>{invoice.status}</span></td><td data-label="Due date">{invoice.dueDate || "—"}</td><td data-label="Amount">{invoice.amountText || "—"}</td><td data-label="Receipt">{invoice.receiptUrl ? <a href={invoice.receiptUrl}>View receipt</a> : "—"}</td></tr>)}</tbody></table></div> : <EmptyState title="No invoices or receipts yet" detail="Your payment history will appear here when it is available in LanternAMS." />}</section>
  </>;
}
