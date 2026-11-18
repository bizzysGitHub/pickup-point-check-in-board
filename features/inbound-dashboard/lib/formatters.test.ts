import { describe, expect, test } from "bun:test";
import { formatElapsedDuration, waitColor } from "./formatters";

describe("formatElapsedDuration", () => {
  const checkedIn = "2026-01-01T10:00:00.000Z";
  const at = (seconds: number) => new Date(checkedIn).getTime() + seconds * 1000;

  test("formats seconds, minutes and hours as HH:MM:SS", () => {
    expect(formatElapsedDuration(checkedIn, at(0))).toBe("00:00:00");
    expect(formatElapsedDuration(checkedIn, at(59))).toBe("00:00:59");
    expect(formatElapsedDuration(checkedIn, at(61))).toBe("00:01:01");
    expect(formatElapsedDuration(checkedIn, at(3661))).toBe("01:01:01");
  });

  test("never goes negative if the clock is behind the check-in time", () => {
    expect(formatElapsedDuration(checkedIn, at(-30))).toBe("00:00:00");
  });
});

describe("waitColor", () => {
  test("uses the boundary values correctly", () => {
    expect(waitColor(0)).toBe("#70d94f");
    expect(waitColor(10)).toBe("#70d94f");
    expect(waitColor(11)).toBe("#ffc928");
    expect(waitColor(20)).toBe("#ffc928");
    expect(waitColor(21)).toBe("#45c1ff");
  });
});
