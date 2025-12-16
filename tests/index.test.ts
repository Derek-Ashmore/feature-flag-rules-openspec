import { describe, it, expect } from "vitest";
import { placeholder } from "../src/index.js";

describe("Placeholder", () => {
  it("should have a placeholder function", () => {
    expect(placeholder).toBeDefined();
    expect(typeof placeholder).toBe("function");
  });
});

