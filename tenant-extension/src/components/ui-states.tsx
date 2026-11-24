import type { ReactNode } from "react";
import { PortalApiError } from "../types";

export function LoadingState({ label = "Loading" }: { label?: string }) {
  return <div className="lantern-state" role="status" aria-live="polite"><span className="lantern-spinner" aria-hidden="true" />{label}…</div>;
}

export function EmptyState({ title, detail }: { title: string; detail: string }) {
  return <div className="lantern-state lantern-state--empty"><strong>{title}</strong><span>{detail}</span></div>;
}

export function AccessUnavailableState() {
  return <div className="lantern-state lantern-state--error" role="status"><strong>Member services are unavailable</strong><span>Your current portal access does not include any available NWCA member-services modules.</span></div>;
}

export function RequestError({ error, onRetry }: { error: unknown; onRetry: () => void }) {
  const apiError = error instanceof PortalApiError ? error : null;
  const copy = apiError?.status === 401
    ? "Your portal session has ended. Please return to the Lantern login screen."
    : apiError?.status === 403
      ? "You do not have access to this area."
      : apiError?.status === 404
        ? "This item is no longer available."
        : apiError?.status === 409
          ? "This record changed while you were working. Refresh and review the latest details."
          : "We could not load this information. Please try again.";

  return (
    <div className="lantern-state lantern-state--error" role="alert">
      <strong>{apiError?.status === 403 ? "Access unavailable" : "Something went wrong"}</strong>
      <span>{copy}</span>
      {apiError?.requestId && <small>Reference: {apiError.requestId}</small>}
      {apiError?.status !== 401 && <button type="button" className="lantern-button lantern-button--secondary" onClick={onRetry}>Try again</button>}
    </div>
  );
}

export function Notice({ tone = "info", children }: { tone?: "info" | "success" | "warning"; children: ReactNode }) {
  return <div className={`lantern-notice lantern-notice--${tone}`} role={tone === "warning" ? "alert" : "status"}>{children}</div>;
}
