import { describe, expect, test } from "bun:test";
import { graphql, print } from "graphql";
import { mockDashboard } from "./data/mockDashboard";
import { GET_INBOUND_DASHBOARD } from "./graphql/operations";
import { createMockSchema } from "./graphql/mockSchema";

describe("inbound dashboard contract", () => {
  test("the local Apollo schema satisfies the production query shape", async () => {
    const result = await graphql({
      schema: createMockSchema(),
      source: print(GET_INBOUND_DASHBOARD),
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.inboundDashboard).toMatchObject({
      location: "Riverside Center",
      featuredGuestId: "guest-amanda",
    });
  });

  test("every guest progress value stays within UI-safe bounds", () => {
    for (const guest of mockDashboard.guests) {
      expect(guest.progressPercent).toBeGreaterThanOrEqual(0);
      expect(guest.progressPercent).toBeLessThanOrEqual(100);
      expect(guest.estimatedWaitMinutes).toBeGreaterThanOrEqual(0);
    }
  });

  test("the featured guest exists in the guest list", () => {
    const ids = mockDashboard.guests.map((guest) => guest.id);
    expect(ids).toContain(mockDashboard.featuredGuestId);
  });
});
