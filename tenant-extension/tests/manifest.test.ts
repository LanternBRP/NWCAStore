import { describe, expect, it } from "vitest";
import { manifest } from "../src/manifest";

describe("NWCA tenant extension manifest", () => {
  it("declares a stable release and Lantern API contract", () => {
    expect(manifest.id).toBe("nwca-tenant-portal");
    expect(manifest.version).toMatch(/^\d+\.\d+\.\d+$/);
    expect(manifest.requiredApiContract).toBe("2026-09");
  });

  it("declares every requested member-services route with a capability", () => {
    const paths = manifest.routes.map((route) => route.path);
    expect(paths).toEqual(expect.arrayContaining(["/membership", "/renewal", "/donations", "/registration", "/gear", "/payments"]));
    expect(manifest.routes.every((route) => Boolean(route.capability))).toBe(true);
  });
});
