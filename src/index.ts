/**
 * Feature Flag Rules Engine
 *
 * Evaluates feature flags based on user context using static rules.
 */

/**
 * User context for feature evaluation
 */
export interface UserContext {
  /** Unique identifier for the user */
  userId: string;
  /** Geographic region of the user */
  region: string;
  /** Subscription plan of the user (e.g., "basic", "pro") */
  plan: string;
}

/**
 * Result of feature evaluation containing enabled feature identifiers
 */
export interface FeatureEvaluationResult {
  /** Array of enabled feature identifiers */
  enabledFeatures: string[];
}

/**
 * Validates that a user context contains all required fields
 */
function validateUserContext(context: unknown): asserts context is UserContext {
  if (typeof context !== "object" || context === null) {
    throw new Error("User context must be an object");
  }

  const ctx = context as Record<string, unknown>;

  if (typeof ctx.userId !== "string" || ctx.userId.trim() === "") {
    throw new Error("User context must have a non-empty userId (string)");
  }

  if (typeof ctx.region !== "string" || ctx.region.trim() === "") {
    throw new Error("User context must have a non-empty region (string)");
  }

  if (typeof ctx.plan !== "string" || ctx.plan.trim() === "") {
    throw new Error("User context must have a non-empty plan (string)");
  }
}

/**
 * Static rule definitions for feature evaluation
 * Rules are deterministic and do not change during runtime
 */
type Rule = (context: UserContext) => boolean;

interface FeatureRule {
  featureId: string;
  rule: Rule;
}

const staticRules: FeatureRule[] = [
  // Pro plan features
  {
    featureId: "advanced-analytics",
    rule: (context) => context.plan === "pro",
  },
  {
    featureId: "priority-support",
    rule: (context) => context.plan === "pro",
  },
  {
    featureId: "api-access",
    rule: (context) => context.plan === "pro",
  },
  // Basic plan features
  {
    featureId: "basic-dashboard",
    rule: (context) => context.plan === "basic" || context.plan === "pro",
  },
  {
    featureId: "email-support",
    rule: (context) => context.plan === "basic" || context.plan === "pro",
  },
  // Region-specific features (example)
  {
    featureId: "region-specific-feature",
    rule: (context) => context.region === "us" || context.region === "eu",
  },
];

/**
 * Evaluates static rules to determine which features are enabled for a given user context.
 *
 * @param context - User context containing userId, region, and plan
 * @returns Feature evaluation result with enabled feature identifiers
 * @throws Error if user context is invalid or missing required fields
 *
 * @example
 * ```ts
 * const result = evaluateFeatures({
 *   userId: "user123",
 *   region: "us",
 *   plan: "pro"
 * });
 * // Returns: { enabledFeatures: ["advanced-analytics", "priority-support", "api-access", "basic-dashboard", "email-support", "region-specific-feature"] }
 * ```
 */
export function evaluateFeatures(context: unknown): FeatureEvaluationResult {
  validateUserContext(context);

  const enabledFeatures: string[] = [];

  for (const { featureId, rule } of staticRules) {
    if (rule(context)) {
      enabledFeatures.push(featureId);
    }
  }

  return { enabledFeatures };
}
