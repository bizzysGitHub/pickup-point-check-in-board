import { describe, expect, test } from "bun:test";
import { getSpecialistProfile } from "./specialistProfile";
import type { Specialist } from "../types";

const specialist: Specialist = {
  id: "specialist-maya",
  name: "Maya R.",
  initials: "MR",
  availability: "READY",
  currentGuest: null,
};

describe("getSpecialistProfile", () => {
  test("is deterministic for the same specialist", () => {
    expect(getSpecialistProfile(specialist, 0)).toEqual(
      getSpecialistProfile(specialist, 0),
    );
  });

  test("keeps the rating within 4.6 to 4.9", () => {
    const { rating } = getSpecialistProfile(specialist, 0);
    expect(rating).toBeGreaterThanOrEqual(4.6);
    expect(rating).toBeLessThanOrEqual(4.9);
  });

  test("alternates the role title by position", () => {
    expect(getSpecialistProfile(specialist, 0).role).toBe("Senior Specialist");
    expect(getSpecialistProfile(specialist, 1).role).toBe("Specialist");
  });

  test("counts an active guest in customers today", () => {
    const busy = { ...specialist, currentGuest: "Chris J." };
    expect(getSpecialistProfile(busy, 0).customersToday).toBe(
      getSpecialistProfile(specialist, 0).customersToday + 1,
    );
  });
});
