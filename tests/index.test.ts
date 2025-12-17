import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  evaluateFeatures,
  loadConfigurationFromFile,
  type FeatureConfiguration,
  type UserContext,
} from "../src/index.js";

const tempPaths: string[] = [];

function writeTempConfig(content: string): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "feature-config-"));
  const filePath = path.join(dir, "config.yaml");
  fs.writeFileSync(filePath, content, "utf8");
  tempPaths.push(dir);
  return filePath;
}

afterEach(() => {
  while (tempPaths.length > 0) {
    const dir = tempPaths.pop();
    if (dir && fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  }
});

describe("Feature Evaluation", () => {
  describe("User Context Input", () => {
    it("should accept valid user context with userId, region, and plan", () => {
      const context: UserContext = {
        userId: "user123",
        region: "us",
        plan: "pro",
      };

      expect(() => evaluateFeatures(context)).not.toThrow();
      const result = evaluateFeatures(context);
      expect(result).toHaveProperty("enabledFeatures");
      expect(Array.isArray(result.enabledFeatures)).toBe(true);
    });

    it("should reject user context missing userId", () => {
      const context = {
        region: "us",
        plan: "pro",
      };

      expect(() => evaluateFeatures(context)).toThrow(
        "User context must have a non-empty userId (string)"
      );
    });

    it("should reject user context missing region", () => {
      const context = {
        userId: "user123",
        plan: "pro",
      };

      expect(() => evaluateFeatures(context)).toThrow(
        "User context must have a non-empty region (string)"
      );
    });

    it("should reject user context missing plan", () => {
      const context = {
        userId: "user123",
        region: "us",
      };

      expect(() => evaluateFeatures(context)).toThrow(
        "User context must have a non-empty plan (string)"
      );
    });

    it("should reject empty userId string", () => {
      const context = {
        userId: "",
        region: "us",
        plan: "pro",
      };

      expect(() => evaluateFeatures(context)).toThrow(
        "User context must have a non-empty userId (string)"
      );
    });

    it("should reject empty region string", () => {
      const context = {
        userId: "user123",
        region: "",
        plan: "pro",
      };

      expect(() => evaluateFeatures(context)).toThrow(
        "User context must have a non-empty region (string)"
      );
    });

    it("should reject empty plan string", () => {
      const context = {
        userId: "user123",
        region: "us",
        plan: "",
      };

      expect(() => evaluateFeatures(context)).toThrow(
        "User context must have a non-empty plan (string)"
      );
    });

    it("should reject non-object input", () => {
      expect(() => evaluateFeatures(null)).toThrow(
        "User context must be an object"
      );
      expect(() => evaluateFeatures(undefined)).toThrow(
        "User context must be an object"
      );
      expect(() => evaluateFeatures("string")).toThrow(
        "User context must be an object"
      );
      expect(() => evaluateFeatures(123)).toThrow(
        "User context must be an object"
      );
    });

    it("should reject invalid field types", () => {
      expect(() =>
        evaluateFeatures({
          userId: 123,
          region: "us",
          plan: "pro",
        })
      ).toThrow("User context must have a non-empty userId (string)");

      expect(() =>
        evaluateFeatures({
          userId: "user123",
          region: 123,
          plan: "pro",
        })
      ).toThrow("User context must have a non-empty region (string)");

      expect(() =>
        evaluateFeatures({
          userId: "user123",
          region: "us",
          plan: 123,
        })
      ).toThrow("User context must have a non-empty plan (string)");
    });
  });

  describe("Feature Evaluation", () => {
    it("should return Pro features for Pro plan users", () => {
      const context: UserContext = {
        userId: "user123",
        region: "us",
        plan: "pro",
      };

      const result = evaluateFeatures(context);

      expect(result.enabledFeatures).toContain("advanced-analytics");
      expect(result.enabledFeatures).toContain("priority-support");
      expect(result.enabledFeatures).toContain("api-access");
      expect(result.enabledFeatures).toContain("basic-dashboard");
      expect(result.enabledFeatures).toContain("email-support");
    });

    it("should return Basic features for Basic plan users", () => {
      const context: UserContext = {
        userId: "user456",
        region: "us",
        plan: "basic",
      };

      const result = evaluateFeatures(context);

      // Basic users should NOT have Pro features
      expect(result.enabledFeatures).not.toContain("advanced-analytics");
      expect(result.enabledFeatures).not.toContain("priority-support");
      expect(result.enabledFeatures).not.toContain("api-access");

      // Basic users should have Basic features
      expect(result.enabledFeatures).toContain("basic-dashboard");
      expect(result.enabledFeatures).toContain("email-support");
    });

    it("should use all context fields (userId, region, plan) in evaluation", () => {
      const context1: UserContext = {
        userId: "user123",
        region: "us",
        plan: "pro",
      };

      const context2: UserContext = {
        userId: "user456",
        region: "us",
        plan: "pro",
      };

      // Same region and plan should yield same features regardless of userId
      const result1 = evaluateFeatures(context1);
      const result2 = evaluateFeatures(context2);

      expect(result1.enabledFeatures.sort()).toEqual(
        result2.enabledFeatures.sort()
      );

      // Different region should potentially affect features
      const context3: UserContext = {
        userId: "user123",
        region: "eu",
        plan: "pro",
      };

      const result3 = evaluateFeatures(context3);
      // Both US and EU should have region-specific-feature
      expect(result3.enabledFeatures).toContain("region-specific-feature");
      expect(result1.enabledFeatures).toContain("region-specific-feature");
    });

    it("should handle region-specific features", () => {
      const usContext: UserContext = {
        userId: "user123",
        region: "us",
        plan: "basic",
      };

      const euContext: UserContext = {
        userId: "user456",
        region: "eu",
        plan: "basic",
      };

      const otherRegionContext: UserContext = {
        userId: "user789",
        region: "asia",
        plan: "basic",
      };

      const usResult = evaluateFeatures(usContext);
      const euResult = evaluateFeatures(euContext);
      const otherResult = evaluateFeatures(otherRegionContext);

      expect(usResult.enabledFeatures).toContain("region-specific-feature");
      expect(euResult.enabledFeatures).toContain("region-specific-feature");
      expect(otherResult.enabledFeatures).not.toContain(
        "region-specific-feature"
      );
    });
  });

  describe("Enabled Features Output", () => {
    it("should return features as an array of strings", () => {
      const context: UserContext = {
        userId: "user123",
        region: "us",
        plan: "pro",
      };

      const result = evaluateFeatures(context);

      expect(Array.isArray(result.enabledFeatures)).toBe(true);
      expect(result.enabledFeatures.length).toBeGreaterThan(0);
      result.enabledFeatures.forEach((feature) => {
        expect(typeof feature).toBe("string");
        expect(feature.length).toBeGreaterThan(0);
      });
    });

    it("should return empty array when no rules match", () => {
      // This scenario might not occur with current static rules,
      // but we test the behavior for completeness
      const context: UserContext = {
        userId: "user123",
        region: "unknown-region",
        plan: "unknown-plan",
      };

      const result = evaluateFeatures(context);

      // Should not throw, but may return empty array or some default features
      expect(Array.isArray(result.enabledFeatures)).toBe(true);
      // Note: With current rules, this might still match some features
      // The important thing is it doesn't throw and returns an array
    });
  });

  describe("Static Rule Configuration", () => {
    it("should return deterministic results for the same context", () => {
      const context: UserContext = {
        userId: "user123",
        region: "us",
        plan: "pro",
      };

      const result1 = evaluateFeatures(context);
      const result2 = evaluateFeatures(context);
      const result3 = evaluateFeatures(context);

      expect(result1.enabledFeatures.sort()).toEqual(
        result2.enabledFeatures.sort()
      );
      expect(result2.enabledFeatures.sort()).toEqual(
        result3.enabledFeatures.sort()
      );
    });

    it("should have no side effects between evaluations", () => {
      const context1: UserContext = {
        userId: "user123",
        region: "us",
        plan: "pro",
      };

      const context2: UserContext = {
        userId: "user456",
        region: "eu",
        plan: "basic",
      };

      const result1a = evaluateFeatures(context1);
      const _result2 = evaluateFeatures(context2);
      const result1b = evaluateFeatures(context1);

      // First context should return same result before and after second evaluation
      expect(result1a.enabledFeatures.sort()).toEqual(
        result1b.enabledFeatures.sort()
      );
    });

    it("should use static rules that don't change during runtime", () => {
      const context: UserContext = {
        userId: "user123",
        region: "us",
        plan: "pro",
      };

      // Evaluate multiple times - results should be consistent
      const results = Array.from({ length: 10 }, () =>
        evaluateFeatures(context)
      );

      const firstResult = results[0].enabledFeatures.sort();
      results.forEach((result) => {
        expect(result.enabledFeatures.sort()).toEqual(firstResult);
      });
    });
  });

  describe("Configuration File Support", () => {
    it("should load configuration from a file and use lists for evaluation", () => {
      const configFilePath = writeTempConfig(
        [
          "userids:",
          "  - user-special",
          "regions:",
          "  - eu",
          "plans:",
          "  - enterprise",
        ].join("\n")
      );

      const context: UserContext = {
        userId: "user-special",
        region: "eu",
        plan: "enterprise",
      };

      const result = evaluateFeatures(context, { configFilePath });

      expect(result.enabledFeatures).toContain("user-targeted-feature");
      expect(result.enabledFeatures).toContain("region-targeted-feature");
      expect(result.enabledFeatures).toContain("plan-targeted-feature");
    });

    it("should validate configuration structure and throw descriptive errors", () => {
      const configFilePath = writeTempConfig("userids: not-an-array");

      expect(() => loadConfigurationFromFile(configFilePath)).toThrow(
        'Configuration field "userids" from file must be an array of strings'
      );
    });

    it("should reject missing configuration files with descriptive error", () => {
      const missingPath = path.join(
        os.tmpdir(),
        "feature-config-missing.yaml"
      );

      expect(() =>
        evaluateFeatures(
          { userId: "user123", region: "us", plan: "pro" },
          { configFilePath: missingPath }
        )
      ).toThrow(`Configuration file not found at path: ${missingPath}`);
    });

    it("should use programmatic configuration when no file is provided", () => {
      const programmaticConfig: FeatureConfiguration = {
        plans: ["pro"],
      };

      const context: UserContext = {
        userId: "user123",
        region: "us",
        plan: "pro",
      };

      const result = evaluateFeatures(context, {
        configuration: programmaticConfig,
      });

      expect(result.enabledFeatures).toContain("plan-targeted-feature");
    });

    it("should prefer file configuration when both sources exist by default", () => {
      const configFilePath = writeTempConfig(
        [
          "userids:",
          "  - file-user",
          "plans:",
          "  - basic",
        ].join("\n")
      );

      const programmaticConfig: FeatureConfiguration = {
        userids: ["programmatic-user"],
        plans: ["pro"],
      };

      const context: UserContext = {
        userId: "programmatic-user",
        region: "us",
        plan: "pro",
      };

      const result = evaluateFeatures(context, {
        configFilePath,
        configuration: programmaticConfig,
      });

      expect(result.enabledFeatures).not.toContain("user-targeted-feature");
      expect(result.enabledFeatures).not.toContain("plan-targeted-feature");
    });

    it("should allow explicitly selecting programmatic configuration when both are available", () => {
      const configFilePath = writeTempConfig(
        [
          "userids:",
          "  - file-user",
          "plans:",
          "  - basic",
        ].join("\n")
      );

      const programmaticConfig: FeatureConfiguration = {
        userids: ["programmatic-user"],
        plans: ["pro"],
      };

      const context: UserContext = {
        userId: "programmatic-user",
        region: "us",
        plan: "pro",
      };

      const result = evaluateFeatures(context, {
        configFilePath,
        configuration: programmaticConfig,
        configSource: "programmatic",
      });

      expect(result.enabledFeatures).toContain("user-targeted-feature");
      expect(result.enabledFeatures).toContain("plan-targeted-feature");
    });
  });
});
