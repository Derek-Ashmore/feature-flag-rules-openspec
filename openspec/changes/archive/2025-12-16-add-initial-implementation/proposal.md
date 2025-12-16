# Change: Add Initial Implementation

## Why

This library needs a core implementation to evaluate feature flags based on user context. The initial implementation will provide a simple, static rules engine that determines which features are enabled for a user based on their plan, region, and user ID. This establishes the foundation for the feature flag rules engine library.

## What Changes

- Add core feature evaluation capability that accepts user context (userId, region, plan)
- Implement static rule evaluation logic (e.g., Pro users get Feature X)
- Return enabled features as output
- Add TypeScript types for input context and output
- Implement public API function for feature evaluation
- Add unit tests for the core functionality

## Impact

- Affected specs: New capability `feature-evaluation` will be added
- Affected code: `src/index.ts` (main implementation), `tests/index.test.ts` (test coverage)
- New types and interfaces for user context and feature evaluation
