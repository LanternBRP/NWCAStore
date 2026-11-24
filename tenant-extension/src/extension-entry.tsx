import { useMemo, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import scopedCss from "./styles.css?inline";
import { createLanternApi } from "./api/lantern-api";
import { PortalShell } from "./components/portal-shell";
import { AccessUnavailableState } from "./components/ui-states";
import {
  DonationScreen, GearScreen, MembershipScreen, PaymentsScreen, RegistrationScreen, RenewalScreen,
} from "./screens/portal-screens";
import { manifest } from "./manifest";
import type { ExtensionRoute, PortalExtensionMountOptions } from "./types";

const STYLE_ATTRIBUTE = "data-nwca-tenant-extension-style";

type ExtensionHandle = { unmount(): void };

function allowedRoute(path: ExtensionRoute, capabilities: string[]) {
  const route = manifest.routes.find((candidate) => candidate.path === path);
  return Boolean(route && (!route.capability || capabilities.includes(route.capability)));
}

function firstAllowedRoute(capabilities: string[]): ExtensionRoute {
  const route = manifest.routes.find((candidate) => !candidate.capability || capabilities.includes(candidate.capability));
  return (route?.path ?? "/membership") as ExtensionRoute;
}

function ExtensionApp({ options }: { options: PortalExtensionMountOptions }) {
  const initial = options.initialPath && allowedRoute(options.initialPath, options.context.capabilities)
    ? options.initialPath
    : firstAllowedRoute(options.context.capabilities);
  const [activePath, setActivePath] = useState<ExtensionRoute>(initial);
  const api = useMemo(() => createLanternApi({ context: options.context, onUnauthorized: options.onUnauthorized }), [options.context, options.onUnauthorized]);
  const hasAvailableModule = manifest.routes.some((route) => !route.capability || options.context.capabilities.includes(route.capability));

  const navigate = (next: ExtensionRoute) => {
    if (!allowedRoute(next, options.context.capabilities)) return;
    setActivePath(next);
    options.onNavigate?.(next);
  };

  const screenProps = { api, context: options.context, config: options.config, onHostedCheckout: options.onHostedCheckout };
  const screen = activePath === "/renewal" ? <RenewalScreen {...screenProps} />
    : activePath === "/donations" ? <DonationScreen {...screenProps} />
      : activePath === "/registration" ? <RegistrationScreen {...screenProps} />
        : activePath === "/gear" ? <GearScreen {...screenProps} />
          : activePath === "/payments" ? <PaymentsScreen {...screenProps} />
            : <MembershipScreen {...screenProps} />;

  return <PortalShell context={options.context} activePath={activePath} onNavigate={navigate}>{hasAvailableModule ? screen : <AccessUnavailableState />}</PortalShell>;
}

/**
 * Mounts the extension in an isolated Shadow DOM boundary. The tenant portal can
 * inject this package into any page without allowing NWCA component CSS to alter
 * portal styles, and without allowing portal theme rules to alter this UI.
 */
export function mountNWCATenantExtension(hostElement: HTMLElement, options: PortalExtensionMountOptions): ExtensionHandle {
  const shadowRoot = hostElement.shadowRoot ?? hostElement.attachShadow({ mode: "open" });

  if (!shadowRoot.querySelector(`[${STYLE_ATTRIBUTE}]`)) {
    const style = document.createElement("style");
    style.setAttribute(STYLE_ATTRIBUTE, "true");
    style.textContent = scopedCss;
    shadowRoot.append(style);
  }

  const mountNode = document.createElement("div");
  mountNode.setAttribute("data-nwca-tenant-extension-root", "true");
  shadowRoot.append(mountNode);
  const root: Root = createRoot(mountNode);
  root.render(<ExtensionApp options={options} />);

  return {
    unmount() {
      root.unmount();
      mountNode.remove();
    },
  };
}

export { manifest } from "./manifest";
export { nwcaExtensionConfig } from "./nwca-config";
export type { PortalExtensionMountOptions, TenantPortalContext, TenantPortalExtensionConfig } from "./types";
