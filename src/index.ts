import fs from "node:fs";
import { parse } from "yaml";

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

export interface FeatureConfiguration {
  /** Optional list of user IDs that rules can target */
  userids?: string[];
  /** Optional list of regions that rules can target */
  regions?: string[];
  /** Optional list of plans that rules can target */
  plans?: string[];
}

export interface EvaluationOptions {
  /**
   * Path to a YAML configuration file describing userids, regions, and plans.
   * When provided, file-based configuration is preferred by default.
   */
  configFilePath?: string;
  /**
   * Programmatic configuration to use when no file is provided or when explicitly
   * selected via `configSource`.
   */
  configuration?: FeatureConfiguration;
  /**
   * Select which configuration source to use when both are available.
   * Defaults to `file` if a file path is provided.
   */
  configSource?: "file" | "programmatic";
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

function validateConfigurationList(
  value: unknown,
  field: "userids" | "regions" | "plans",
  source: "file" | "programmatic"
): string[] | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (!Array.isArray(value)) {
    throw new Error(
      `Configuration field "${field}" from ${source} must be an array of strings`
    );
  }

  const cleaned = value.map((entry) => {
    if (typeof entry !== "string") {
      throw new Error(
        `Configuration field "${field}" from ${source} must be an array of strings`
      );
    }

    const trimmed = entry.trim();

    if (trimmed === "") {
      throw new Error(
        `Configuration field "${field}" from ${source} must not contain empty strings`
      );
    }

    return trimmed;
  });

  return cleaned;
}

function validateConfigurationShape(
  configuration: unknown,
  source: "file" | "programmatic"
): FeatureConfiguration {
  if (typeof configuration !== "object" || configuration === null) {
    throw new Error(`Configuration from ${source} must be an object`);
  }

  const cfg = configuration as Record<string, unknown>;

  const userids = validateConfigurationList(cfg.userids, "userids", source);
  const regions = validateConfigurationList(cfg.regions, "regions", source);
  const plans = validateConfigurationList(cfg.plans, "plans", source);

  return { userids, regions, plans };
}

/**
 * Loads configuration from a YAML file and validates its structure.
 * Throws descriptive errors for missing files or invalid content.
 */
export function loadConfigurationFromFile(
  configFilePath: string
): FeatureConfiguration {
  if (configFilePath.trim() === "") {
    throw new Error("Configuration file path must be provided");
  }

  if (!fs.existsSync(configFilePath)) {
    throw new Error(`Configuration file not found at path: ${configFilePath}`);
  }

  const raw = fs.readFileSync(configFilePath, "utf8");
  let parsed: unknown;

  try {
    parsed = parse(raw);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Invalid configuration file format: ${message}`);
  }

  return validateConfigurationShape(parsed, "file");
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

function buildRules(configuration?: FeatureConfiguration): FeatureRule[] {
  const userIdSet = new Set(configuration?.userids ?? []);
  const regionSet = new Set(configuration?.regions ?? []);
  const planSet = new Set(configuration?.plans ?? []);

  const planMatches = (context: UserContext, plan: string): boolean =>
    context.plan === plan && (planSet.size === 0 || planSet.has(context.plan));

  const regionMatches = (context: UserContext): boolean => {
    if (regionSet.size > 0) {
      return regionSet.has(context.region);
    }

    return context.region === "us" || context.region === "eu";
  };

  const rules: FeatureRule[] = [
    // Pro plan features
    {
      featureId: "advanced-analytics",
      rule: (context) => planMatches(context, "pro"),
    },
    {
      featureId: "priority-support",
      rule: (context) => planMatches(context, "pro"),
    },
    {
      featureId: "api-access",
      rule: (context) => planMatches(context, "pro"),
    },
    // Basic plan features
    {
      featureId: "basic-dashboard",
      rule: (context) =>
        (context.plan === "basic" || context.plan === "pro") &&
        (planSet.size === 0 || planSet.has(context.plan)),
    },
    {
      featureId: "email-support",
      rule: (context) =>
        (context.plan === "basic" || context.plan === "pro") &&
        (planSet.size === 0 || planSet.has(context.plan)),
    },
    // Region-specific features (example)
    {
      featureId: "region-specific-feature",
      rule: (context) => regionMatches(context),
    },
  ];

  if (userIdSet.size > 0) {
    rules.push({
      featureId: "user-targeted-feature",
      rule: (context) => userIdSet.has(context.userId),
    });
  }

  if (regionSet.size > 0) {
    rules.push({
      featureId: "region-targeted-feature",
      rule: (context) => regionSet.has(context.region),
    });
  }

  if (planSet.size > 0) {
    rules.push({
      featureId: "plan-targeted-feature",
      rule: (context) => planSet.has(context.plan),
    });
  }

  return rules;
}

function resolveConfiguration(
  options?: EvaluationOptions
): FeatureConfiguration | undefined {
  if (!options) {
    return undefined;
  }

  const shouldUseFile =
    options.configSource !== "programmatic" && options.configFilePath;

  if (shouldUseFile) {
    return loadConfigurationFromFile(options.configFilePath!);
  }

  if (options.configuration) {
    return validateConfigurationShape(options.configuration, "programmatic");
  }

  return undefined;
}

/**
 * Evaluates static rules to determine which features are enabled for a given user context.
 *
 * @param context - User context containing userId, region, and plan
 * @param options - Optional configuration source (file or programmatic)
 * @returns Feature evaluation result with enabled feature identifiers
 * @throws Error if user context or configuration is invalid
 *
 * @example
 * ```ts
 * const result = evaluateFeatures(
 *   {
 *     userId: "user123",
 *     region: "us",
 *     plan: "pro",
 *   },
 *   { configFilePath: "./feature-config.yaml" }
 * );
 * // Returns enabled features using configuration from the YAML file
 * ```
 */
export function evaluateFeatures(
  context: unknown,
  options?: EvaluationOptions
): FeatureEvaluationResult {
  validateUserContext(context);

  const configuration = resolveConfiguration(options);
  const rules = buildRules(configuration);

  const enabledFeatures: string[] = [];

  for (const { featureId, rule } of rules) {
    if (rule(context)) {
      enabledFeatures.push(featureId);
    }
  }

  return { enabledFeatures };
}
