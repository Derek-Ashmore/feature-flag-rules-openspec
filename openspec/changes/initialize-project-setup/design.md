# Design: Project Initialization

## Context
This is a greenfield TypeScript project for a feature flag rules engine. We need to establish the development environment, build tooling, and CI/CD pipeline before implementing core functionality.

## Goals / Non-Goals

### Goals
- Fast development feedback (quick test runs, type checking)
- ESM module support (as specified in project.md)
- Strict TypeScript configuration for type safety
- Automated code quality checks (formatting, linting)
- Reliable CI/CD pipeline for pull request verification
- Minimal initial dependencies

### Non-Goals
- Production bundling optimization (can be added later)
- Complex monorepo setup
- Docker containerization (not needed for library)
- Deployment automation (library, not application)

## Decisions

### Decision: Use Vitest for Testing
**Rationale:**
- Native ESM support (matches project requirement)
- Fast execution with Vite's optimized test runner
- Built-in TypeScript support
- Modern API similar to Jest
- Good performance for unit tests

**Alternatives considered:**
- Jest: Requires additional configuration for ESM, slower startup
- Node.js test runner: Too minimal, lacks features we'll need

### Decision: Use TypeScript Compiler (tsc) for Build
**Rationale:**
- Simple and reliable for type checking and compilation
- No additional dependencies
- Sufficient for library distribution
- Can add esbuild later if bundling needed

**Alternatives considered:**
- esbuild: Faster but adds dependency, not needed initially
- SWC: Fast but adds dependency, tsc is sufficient

### Decision: Use npm as Package Manager
**Rationale:**
- Standard Node.js package manager (no additional setup required)
- Widely adopted and well-supported
- Native GitHub Actions caching support
- Sufficient for project needs

**Alternatives considered:**
- pnpm: Faster and more efficient, but requires lock file management
- yarn: Similar to npm but npm is more standard

### Decision: GitHub Actions for CI/CD
**Rationale:**
- Native GitHub integration
- Free for public repositories
- Easy to configure
- Good ecosystem of actions

**Alternatives considered:**
- CircleCI: Requires external service
- GitLab CI: Not using GitLab

## Risks / Trade-offs

### Risk: ESM Compatibility Issues
**Mitigation:** Test ESM imports early, use Vitest which has native ESM support

### Risk: Tool Version Conflicts
**Mitigation:** Pin dependency versions, use lock files (package-lock.json)

### Trade-off: Simplicity vs Features
**Decision:** Start simple (tsc), add complexity (esbuild) only when needed

## Migration Plan
N/A - This is initial setup, no migration required.

## Open Questions
- Should we include a pre-commit hook (husky) for local validation? (Defer to later change)
- Do we need a changelog tool? (Defer to later change)

