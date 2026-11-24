export type MembershipPlan = {
  id: string;
  name: string;
  description?: string;
  cadence?: string;
  displayPrice?: string;
  eligibilityText?: string;
};

export type MembershipRecord = {
  id: string;
  planName: string;
  status: "active" | "pending" | "expired" | "cancelled" | string;
  startDate?: string;
  renewalDate?: string;
  holder?: string;
  benefits?: string[];
};

export type RegistrationEvent = {
  id: string;
  title: string;
  detail?: string;
  registrationStatus?: "open" | "closed" | "waitlist" | string;
  memberPriceText?: string;
};

export type CommerceProduct = {
  id: string;
  name: string;
  description?: string;
  priceText?: string;
  imageUrl?: string;
  availabilityText?: string;
};

export type Invoice = {
  id: string;
  number?: string;
  description: string;
  status: "paid" | "open" | "past_due" | "void" | string;
  amountText?: string;
  dueDate?: string;
  receiptUrl?: string;
};

export type HostedCheckoutResult = {
  checkoutUrl: string;
  referenceId: string;
  status: "pending" | "created";
};

export type FieldValues = Record<string, string | number | boolean | null | undefined>;

export type LanternApi = {
  getMembershipPlans(signal?: AbortSignal): Promise<MembershipPlan[]>;
  getCurrentMemberships(signal?: AbortSignal): Promise<MembershipRecord[]>;
  startMembershipRegistration(input: { planId: string; promotionCode?: string }, signal?: AbortSignal): Promise<HostedCheckoutResult>;
  startRenewal(input: { membershipId: string }, signal?: AbortSignal): Promise<HostedCheckoutResult>;
  startDonation(input: { frequency: "one_time" | "monthly" | "annual"; amountCents: number }, signal?: AbortSignal): Promise<HostedCheckoutResult>;
  getRegistrationEvents(signal?: AbortSignal): Promise<RegistrationEvent[]>;
  startEventRegistration(input: { eventId: string; promotionCode?: string }, signal?: AbortSignal): Promise<HostedCheckoutResult>;
  getCommerceProducts(signal?: AbortSignal): Promise<CommerceProduct[]>;
  startProductCheckout(input: { productId: string; quantity: number }, signal?: AbortSignal): Promise<HostedCheckoutResult>;
  getInvoices(signal?: AbortSignal): Promise<Invoice[]>;
};
