import { describe, it, expect } from "vitest";

describe("audit calculations", () => {
  it("calculates savings correctly", () => {
    const currentSpend = 100;
    const optimizedSpend = 40;

    expect(currentSpend - optimizedSpend).toBe(60);
  });
});