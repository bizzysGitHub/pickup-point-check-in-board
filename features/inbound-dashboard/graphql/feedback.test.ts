import { describe, expect, test } from "bun:test";
import { graphql, print } from "graphql";
import { SUBMIT_FEEDBACK } from "./operations";
import { createMockSchema } from "./mockSchema";
import type { Feedback } from "../types";

function submit(
  store: Feedback[],
  input: { rating: number; comment: string },
) {
  return graphql({
    schema: createMockSchema(store),
    source: print(SUBMIT_FEEDBACK),
    variableValues: { input },
  });
}

describe("submitFeedback", () => {
  test("stores valid feedback and returns it", async () => {
    const store: Feedback[] = [];
    const result = await submit(store, { rating: 5, comment: "  Great!  " });

    expect(result.errors).toBeUndefined();
    expect(store).toHaveLength(1);
    expect(store[0]).toMatchObject({ rating: 5, comment: "Great!" });
  });

  test("accepts a comment with no star rating", async () => {
    const store: Feedback[] = [];
    const result = await submit(store, { rating: 0, comment: "Too slow" });

    expect(result.errors).toBeUndefined();
    expect(store).toHaveLength(1);
  });

  test.each([
    ["rating above 5", { rating: 6, comment: "hi" }],
    ["negative rating", { rating: -1, comment: "hi" }],
    ["empty rating and comment", { rating: 0, comment: "   " }],
    ["comment over the length limit", { rating: 3, comment: "x".repeat(601) }],
  ])("rejects %s without storing anything", async (_label, input) => {
    const store: Feedback[] = [];
    const result = await submit(store, input);

    expect(result.errors).toBeDefined();
    expect(store).toHaveLength(0);
  });
});
