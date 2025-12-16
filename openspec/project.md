# Project Context

## Purpose

A feature flag rules engine library that evaluates conditions and determines feature flag states. This project serves as an illustration of spec-driven development using OpenSpec, demonstrating how to build software with specifications-first methodology.

**Core Goals:**

- Provide a flexible, performant rules engine for feature flag evaluation
- Support complex conditional logic (user attributes, environment, time-based rules, etc.)
- Serve as a reference implementation for OpenSpec workflow
- Maintain clear separation between specification and implementation

## Tech Stack

- **Language**: TypeScript (primary)
- **Runtime**: Node.js (ESM modules)
- **Testing**: Jest or Vitest (TBD)
- **Build Tool**: TBD (tsc, esbuild, or similar)
- **Package Manager**: npm or pnpm (TBD)

**Note**: Tech stack decisions will be made through OpenSpec change proposals as the project evolves.

## Project Conventions

### Code Style

- **Formatting**: Prefer Prettier with standard configuration
- **Linting**: ESLint with TypeScript rules
- **Naming**:
  - Functions/variables: `camelCase`
  - Classes/types: `PascalCase`
  - Constants: `UPPER_SNAKE_CASE`
  - Files: `kebab-case.ts` for modules, `PascalCase.ts` for classes/components
- **Imports**: Use ES modules (`import`/`export`)
- **Type Safety**: Strict TypeScript mode enabled
- **Comments**: Prefer self-documenting code; add JSDoc for public APIs

### Architecture Patterns

- **Modular Design**: Separate concerns into focused modules
- **Functional Approach**: Prefer pure functions where possible
- **Immutable Data**: Avoid mutating input data; return new objects
- **Error Handling**: Use Result types or throw descriptive errors
- **Validation**: Validate inputs at boundaries (public API entry points)
- **Spec-Driven**: All features must have OpenSpec specifications before implementation

**Key Principles:**

- Keep functions small and focused (single responsibility)
- Prefer composition over inheritance
- Design for testability (dependency injection, pure functions)
- Performance matters but clarity first

### Testing Strategy

- **Unit Tests**: Required for all public APIs and core logic
- **Test Coverage**: Aim for >80% coverage on critical paths
- **Test Structure**: Arrange-Act-Assert pattern
- **Test Files**: Co-locate with source (`*.test.ts` or `*.spec.ts`)
- **Integration Tests**: For complex rule evaluation scenarios
- **Property-Based Testing**: Consider for rule engine logic validation

**Testing Requirements:**

- Every requirement in specs must have corresponding tests
- Tests should validate scenarios defined in OpenSpec
- Use descriptive test names that match spec scenarios

### Git Workflow

- **Branching**: Main branch for production-ready code
- **Commits**: Conventional Commits format
  - `feat(scope): description` - New features
  - `fix(scope): description` - Bug fixes
  - `docs(scope): description` - Documentation
  - `refactor(scope): description` - Code refactoring
  - `test(scope): description` - Test additions/changes
  - `chore(scope): description` - Build/tooling changes
- **OpenSpec Integration**:
  - Create change proposals before starting work
  - Archive changes after implementation and deployment
  - Reference change IDs in commit messages when applicable

## Domain Context

### Feature Flags

Feature flags (feature toggles) are a software development technique that allows code to be turned on/off without deploying new code. This project focuses on the **rules engine** that evaluates conditions to determine flag states.

### Rules Engine Concepts

- **Rule**: A condition that evaluates to true/false
- **Rule Set**: Collection of rules that determine feature flag state
- **Evaluation Context**: Input data (user attributes, environment, etc.) used for rule evaluation
- **Flag State**: Final result (enabled/disabled) after rule evaluation

### Common Rule Types (to be specified)

- User attribute matching (e.g., `user.role === "admin"`)
- Percentage rollouts (e.g., `userId % 100 < 25`)
- Time-based rules (e.g., `date >= "2024-01-01"`)
- Environment-based (e.g., `env === "production"`)
- Complex boolean logic (AND, OR, NOT combinations)

**Note**: Specific rule types and syntax will be defined through OpenSpec change proposals.

## Important Constraints

- **Performance**: Rule evaluation must be fast (target: <1ms per evaluation)
- **Deterministic**: Same inputs must always produce same outputs
- **No Side Effects**: Rule evaluation must be pure (no I/O, no mutations)
- **Type Safety**: Full TypeScript coverage, no `any` types in public APIs
- **Spec-Driven**: No implementation without OpenSpec specification
- **Backward Compatibility**: Breaking changes require OpenSpec change proposals with migration plans

## External Dependencies

- **None currently** - This is a greenfield project

**Future Considerations:**

- May integrate with feature flag management services (LaunchDarkly, Split.io, etc.)
- May require date/time libraries for time-based rules
- May need expression parsing libraries for complex rule syntax

**Dependency Policy:**

- Prefer minimal dependencies
- Evaluate necessity through OpenSpec change proposals
- Document rationale for external dependencies in design.md
