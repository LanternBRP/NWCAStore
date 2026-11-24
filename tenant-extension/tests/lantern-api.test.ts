import { afterEach, describe, expect, it, vi } from "vitest";
import { createLanternApi } from "../src/api/lantern-api";
import type { TenantPortalContext } from "../src/types";

const context: TenantPortalContext = {
  tenant: { id: "nwca-integration-test", key: "nwca", name: "NWCA" },
  user: { id: "user-1", displayName: "Test Member", email: "member@example.org" },
  branding: { primaryColor: "#17214B", secondaryColor: "#C41E3A", tenantName: "NWCA" },
  capabilities: ["memberships:read", "registrations:write", "payments:read", "payments:write"],
  apiBaseUrl: "https://lantern.example.test/api",
  navigation: [],
  signOut: vi.fn(async () => undefined),
};

afterEach(() => vi.restoreAllMocks());

describe("Lantern API adapter", () => {
  it("uses the host API base URL without passing a tenant id", async () => {
    const fetchMock = vi.fn<typeof fetch>();
    fetchMock.mockResolvedValue(new Response(JSON.stringify([]), { status: 200, headers: { "Content-Type": "application/json" } }));
    vi.stubGlobal("fetch", fetchMock);

    await createLanternApi({ context }).getMembershipPlans();

    expect(fetchMock).toHaveBeenCalledWith(
      "https://lantern.example.test/api/portal/membership-plans",
      expect.objectContaining({ credentials: "include" }),
    );
    const [requestUrl] = fetchMock.mock.calls[0] ?? [];
    expect(String(requestUrl)).not.toContain(context.tenant.id);
  });

  it("includes an idempotency key for hosted checkout mutations", async () => {
    const fetchMock = vi.fn<typeof fetch>();
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ checkoutUrl: "https://checkout.example.test/session", referenceId: "intent-1", status: "created" }), { status: 200, headers: { "Content-Type": "application/json" } }));
    vi.stubGlobal("fetch", fetchMock);

    await createLanternApi({ context }).startDonation({ frequency: "one_time", amountCents: 2500 });

    const [, request] = fetchMock.mock.calls[0] ?? [];
    if (!request) throw new Error("Expected a checkout request");
    expect(new Headers(request.headers).get("Idempotency-Key")).toBeTruthy();
  });

  it("hands 401 handling to the Lantern portal host", async () => {
    const onUnauthorized = vi.fn();
    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({ message: "Session expired" }), { status: 401, headers: { "Content-Type": "application/json" } })));

    await expect(createLanternApi({ context, onUnauthorized }).getInvoices()).rejects.toMatchObject({ status: 401 });
    expect(onUnauthorized).toHaveBeenCalledOnce();
  });
});
