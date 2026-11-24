/**
 * NWCA commerce contract
 *
 * This browser-side contract deliberately contains no payment secrets and never
 * collects card data. The production API creates the appropriate hosted checkout:
 * - Stripe Checkout for membership, renewal, donation, and event purchases.
 * - Shopify Cart / Checkout for merchandise purchases.
 *
 * The AMS remains the system of record for people, organizations, membership
 * status, renewal eligibility, entitlements, and community access.
 */

export type PurchaseKind = "membership" | "renewal" | "donation" | "event" | "product";
export type DonationFrequency = "one_time" | "monthly" | "annual";

export interface CustomerDraft {
  firstName: string;
  lastName: string;
  email: string;
  organization?: string;
}

export interface CheckoutRequest {
  kind: PurchaseKind;
  customer: CustomerDraft;
  membershipPlanId?: string;
  donation?: {
    amountCents: number;
    frequency: DonationFrequency;
  };
  event?: {
    eventId: string;
    passId: string;
  };
  product?: {
    variantId: string;
    quantity: number;
  }[];
  returnUrl: string;
  cancelUrl: string;
}

export interface CheckoutResponse {
  checkoutUrl: string;
  provider: "stripe" | "shopify";
  referenceId: string;
}

/**
 * Expected server endpoint:
 * POST ${VITE_COMMERCE_API_URL}/v1/checkout-sessions
 *
 * The server authenticates the account/AMS session, resolves prices from its own
 * catalog, and returns a hosted checkout URL. It must never trust client-supplied
 * price values and must verify Stripe / Shopify webhooks before activation.
 */
export async function createHostedCheckout(request: CheckoutRequest): Promise<CheckoutResponse> {
  const baseUrl = import.meta.env.VITE_COMMERCE_API_URL as string | undefined;

  if (!baseUrl) {
    throw new Error("Commerce API is not configured. Set VITE_COMMERCE_API_URL to enable live checkout.");
  }

  const response = await fetch(`${baseUrl.replace(/\/$/, "")}/v1/checkout-sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const detail = await response.json().catch(() => null) as { message?: string } | null;
    throw new Error(detail?.message || "Unable to start secure checkout.");
  }

  const payload = await response.json() as CheckoutResponse;
  if (!payload.checkoutUrl || !payload.provider || !payload.referenceId) {
    throw new Error("The commerce API returned an incomplete checkout response.");
  }

  return payload;
}

export function getAmsLoginUrl(returnUrl: string) {
  const loginBase = import.meta.env.VITE_AMS_LOGIN_URL as string | undefined;
  if (!loginBase) return null;

  const url = new URL(loginBase);
  url.searchParams.set("return_to", returnUrl);
  return url.toString();
}
