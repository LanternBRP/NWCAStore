import type { ReactNode } from "react";

/**
 * Required Lantern host context. Tenant identity is supplied by the portal shell
 * and is never read from the URL, local storage, or a hard-coded tenant value.
 */
export type TenantPortalContext = {
  tenant: {
    id: string;
    key: string;
    name: string;
    timezone?: string;
  };
  user: {
    id: string;
    displayName: string;
    email?: string;
  };
  branding: {
    logoUrl?: string;
    primaryColor: string;
    secondaryColor: string;
    tenantName: string;
  };
  capabilities: string[];
  apiBaseUrl: string;
  navigation: NavigationItem[];
  signOut(): Promise<void>;
};

export type NavigationItem = {
  path: string;
  label: string;
  capability?: string;
};

export type ExtensionRoute =
  | "/membership"
  | "/renewal"
  | "/donations"
  | "/registration"
  | "/gear"
  | "/payments";

export type TenantPortalExtensionConfig = {
  id: string;
  version: string;
  apiContractVersion: string;
  copy: {
    membershipHeading: string;
    membershipIntro: string;
    donationHeading: string;
    registrationHeading: string;
    paymentsHeading: string;
    supportEmail?: string;
  };
  donationPresets: number[];
  features?: {
    promotionCodes?: boolean;
  };
  renderLogo?: (context: TenantPortalContext) => ReactNode;
};

export type PortalExtensionMountOptions = {
  context: TenantPortalContext;
  config: TenantPortalExtensionConfig;
  initialPath?: ExtensionRoute;
  /** Receives extension route changes; the Lantern portal shell owns browser routing. */
  onNavigate?: (path: ExtensionRoute) => void;
  /** Allows the Lantern shell to control provider-hosted checkout navigation. */
  onHostedCheckout?: (checkoutUrl: string, referenceId: string) => void;
  /** Host callback for a 401. The extension never presents a separate login experience. */
  onUnauthorized?: () => void;
};

export type ApiProblem = {
  status: number;
  message: string;
  requestId?: string;
  fieldErrors?: Record<string, string>;
};

export class PortalApiError extends Error implements ApiProblem {
  status: number;
  requestId?: string;
  fieldErrors?: Record<string, string>;

  constructor(problem: ApiProblem) {
    super(problem.message);
    this.name = "PortalApiError";
    this.status = problem.status;
    this.requestId = problem.requestId;
    this.fieldErrors = problem.fieldErrors;
  }
}
