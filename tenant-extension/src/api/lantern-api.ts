import type { TenantPortalContext } from "../types";
import { PortalApiError } from "../types";
import type {
  CommerceProduct, HostedCheckoutResult, Invoice, LanternApi, MembershipPlan, MembershipRecord, RegistrationEvent,
} from "./contracts";

type ApiClientOptions = {
  context: TenantPortalContext;
  onUnauthorized?: () => void;
};

function idempotencyKey() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  const bytes = new Uint8Array(16);
  globalThis.crypto?.getRandomValues(bytes);
  return `portal-${Array.from(bytes, (value) => value.toString(16).padStart(2, "0")).join("")}`;
}

function getErrorMessage(payload: unknown, fallback: string) {
  if (payload && typeof payload === "object" && "message" in payload && typeof payload.message === "string") {
    return payload.message;
  }
  return fallback;
}

async function waitForRetry(response: Response, signal?: AbortSignal) {
  const retryAfter = Number(response.headers.get("Retry-After") ?? "1");
  const milliseconds = Math.min(Math.max(retryAfter, 1), 5) * 1000;
  await new Promise<void>((resolve, reject) => {
    const timer = globalThis.setTimeout(resolve, milliseconds);
    signal?.addEventListener("abort", () => {
      globalThis.clearTimeout(timer);
      reject(new DOMException("Request aborted", "AbortError"));
    }, { once: true });
  });
}

/**
 * Thin adapter over the LanternAMS authenticated API. Endpoint paths are kept in
 * one file so the platform team can map them to the published OpenAPI contract.
 * No tenant id, role, price, payment provider secret, or membership status is
 * supplied by the browser.
 */
export function createLanternApi({ context, onUnauthorized }: ApiClientOptions): LanternApi {
  const baseUrl = context.apiBaseUrl.replace(/\/$/, "");

  async function request<T>(path: string, init: RequestInit = {}, retry429 = true): Promise<T> {
    const headers = new Headers(init.headers);
    headers.set("Accept", "application/json");
    if (init.method && init.method !== "GET") {
      headers.set("Content-Type", "application/json");
      headers.set("Idempotency-Key", idempotencyKey());
    }

    const response = await fetch(`${baseUrl}${path}`, {
      ...init,
      headers,
      credentials: "include",
    });

    if (response.status === 429 && retry429) {
      await waitForRetry(response, init.signal ?? undefined);
      return request<T>(path, init, false);
    }

    if (response.ok) {
      return response.json() as Promise<T>;
    }

    const payload = await response.json().catch(() => null) as unknown;
    const requestId = response.headers.get("X-Request-Id") ?? undefined;
    const fieldErrors = payload && typeof payload === "object" && "fieldErrors" in payload
      ? (payload as { fieldErrors?: Record<string, string> }).fieldErrors
      : undefined;

    if (response.status === 401) onUnauthorized?.();

    throw new PortalApiError({
      status: response.status,
      requestId,
      fieldErrors,
      message: getErrorMessage(payload, response.status === 403 ? "You do not have access to this action." : "We could not complete that request. Please try again."),
    });
  }

  return {
    getMembershipPlans: (signal) => request<MembershipPlan[]>("/portal/membership-plans", { signal }),
    getCurrentMemberships: (signal) => request<MembershipRecord[]>("/portal/memberships/current", { signal }),
    startMembershipRegistration: (input, signal) => request<HostedCheckoutResult>("/portal/registration/membership", { method: "POST", body: JSON.stringify(input), signal }),
    startRenewal: (input, signal) => request<HostedCheckoutResult>("/portal/memberships/renew", { method: "POST", body: JSON.stringify(input), signal }),
    startDonation: (input, signal) => request<HostedCheckoutResult>("/portal/donations/checkout", { method: "POST", body: JSON.stringify(input), signal }),
    getRegistrationEvents: (signal) => request<RegistrationEvent[]>("/portal/registrations/events", { signal }),
    startEventRegistration: (input, signal) => request<HostedCheckoutResult>("/portal/registrations", { method: "POST", body: JSON.stringify(input), signal }),
    getCommerceProducts: (signal) => request<CommerceProduct[]>("/portal/commerce/products", { signal }),
    startProductCheckout: (input, signal) => request<HostedCheckoutResult>("/portal/commerce/checkout", { method: "POST", body: JSON.stringify(input), signal }),
    getInvoices: (signal) => request<Invoice[]>("/portal/payments/invoices", { signal }),
  };
}
