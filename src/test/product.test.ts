import { describe, it, expect } from "vitest";
import { editions, contactSchema, benchmarks, plannedFeatures } from "@/lib/product";
describe("Product rules", () => {
  it("offers open source at zero forever", () => {
    expect(editions[0]?.price).toBe(0);
    expect(editions[0]?.period).toBe("forever");
  });
  it("prices Pro at 4999 rupees per year", () => {
    expect(editions[1]?.price).toBe(4999);
    expect(editions[1]?.period).toBe("year");
  });
  it("keeps enterprise custom priced", () => expect(editions[2]?.price).toBeNull());
  it("does not fabricate benchmarks", () => {
    expect(benchmarks.accuracy).toBeNull();
    expect(benchmarks.speed).toBeNull();
  });
  it("keeps unverified cloud sync planned", () => expect(plannedFeatures).toContain("Cloud sync"));
  it("rejects invalid emails", () =>
    expect(
      contactSchema.safeParse({ name: "Test", email: "invalid", message: "Hello" }).success,
    ).toBe(false));
  it("rejects spam honeypot", () =>
    expect(
      contactSchema.safeParse({
        name: "Test",
        email: "test@example.com",
        message: "Hello",
        website: "spam",
      }).success,
    ).toBe(false));
  it("accepts a legitimate inquiry", () =>
    expect(
      contactSchema.safeParse({ name: "Test", email: "test@example.com", message: "Hello" })
        .success,
    ).toBe(true));
});
