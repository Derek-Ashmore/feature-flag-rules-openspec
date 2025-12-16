# Change: Add Configuration File Support

## Why

Currently, the library uses hardcoded static rules defined in code. To improve flexibility and maintainability, the library should support loading configuration from an external file that describes lists of userids, regions, and plans. This allows users to configure feature flag rules without modifying source code, enabling easier deployment and configuration management.

## What Changes

- Add support for loading configuration from a file (YAML format)
- Configuration file SHALL describe lists of userids, regions, and plans
- Library SHALL support both file-based configuration and programmatic configuration
- Configuration file format SHALL be validated with descriptive errors
- **BREAKING**: None - this is an additive change that maintains backward compatibility

## Impact

- Affected specs: `feature-evaluation`
- Affected code: `src/index.ts` (may need refactoring to support config loading)
- New files: Configuration file format/schema, configuration loader utilities