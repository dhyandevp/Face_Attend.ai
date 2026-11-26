import { describe, it, expect } from "vitest";
import {
  editions,
  benchmarks,
  plannedFeatures,
  developerEmail,
  developerWebsite,
  developerBioUrl,
} from "@/lib/product";
describe("Product rules", () => {
  it("exports developer contact and bio links", () => {
    expect(developerEmail).toBe("dhyandevp@proton.me");
    expect(developerWebsite).toBe("https://dhyandev.sbs");
    expect(developerBioUrl).toBe("https://link.dhyandev.sbs");
  });
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
});
