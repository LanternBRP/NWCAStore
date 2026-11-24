import type { TenantPortalExtensionConfig } from "./types";

/**
 * NWCA-specific copy belongs in this configuration file, not reusable components.
 * Membership plans, prices, event availability, and entitlement status come from
 * LanternAMS at runtime and are never hard-coded here.
 */
export const nwcaExtensionConfig: TenantPortalExtensionConfig = {
  id: "nwca-tenant-portal",
  version: "1.0.0",
  apiContractVersion: "2026-09",
  copy: {
    membershipHeading: "Membership services",
    membershipIntro: "Review available membership options and start a secure LanternAMS registration workflow.",
    donationHeading: "Support wrestling",
    registrationHeading: "Registration",
    paymentsHeading: "Invoices and receipts",
    supportEmail: "membership@nwcaonline.com",
  },
  donationPresets: [25, 100, 500, 1000],
  features: { promotionCodes: true },
};
