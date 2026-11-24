import type { CSSProperties, ReactNode } from "react";
import { manifest } from "../manifest";
import type { ExtensionRoute, TenantPortalContext } from "../types";

type Props = {
  context: TenantPortalContext;
  activePath: ExtensionRoute;
  onNavigate: (path: ExtensionRoute) => void;
  children: ReactNode;
};

function isAllowed(capabilities: string[], required?: string) {
  return !required || capabilities.includes(required);
}

export function PortalShell({ context, activePath, onNavigate, children }: Props) {
  const visibleRoutes = manifest.routes.filter((route) => isAllowed(context.capabilities, route.capability));
  const logoFallback = context.branding.tenantName.slice(0, 2).toUpperCase();

  return (
    <section
      className="lantern-extension"
      style={{
        "--tenant-primary": context.branding.primaryColor || "#17214B",
        "--tenant-secondary": context.branding.secondaryColor || "#C41E3A",
      } as CSSProperties}
      aria-label={`${context.branding.tenantName} member services`}
    >
      <header className="lantern-header">
        <div className="lantern-brand">
          {context.branding.logoUrl ? <img src={context.branding.logoUrl} alt={`${context.branding.tenantName} logo`} /> : <span className="lantern-logo-fallback" aria-label={context.branding.tenantName}>{logoFallback}</span>}
          <div><span className="lantern-eyebrow">Member portal</span><strong>{context.branding.tenantName}</strong></div>
        </div>
        <div className="lantern-user"><span>Signed in as</span><strong>{context.user.displayName}</strong></div>
      </header>
      <nav className="lantern-nav" aria-label="Member services">
        {visibleRoutes.map((route) => (
          <button
            key={route.path}
            type="button"
            aria-current={activePath === route.path ? "page" : undefined}
            className={activePath === route.path ? "is-active" : undefined}
            onClick={() => onNavigate(route.path as ExtensionRoute)}
          >
            {route.label}
          </button>
        ))}
      </nav>
      <main className="lantern-content">{children}</main>
    </section>
  );
}
