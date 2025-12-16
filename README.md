# feature-flag-rules-openspec

Feature flag rules engine to illustrate spec-driven development using OpenSpec.

## Overview

This project demonstrates spec-driven development using the [OpenSpec](https://github.com/Fission-AI/OpenSpec) framework. All features are specified before implementation, ensuring clear requirements and testable behavior.

## Prerequisites

- Node.js 20 or higher
- pnpm 8 or higher

## Setup

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Verify setup:**
   ```bash
   pnpm run type-check
   pnpm run lint
   pnpm run test
   ```

## Available Scripts

### Development

- `pnpm run build` - Compile TypeScript to JavaScript
- `pnpm run type-check` - Type check without emitting files
- `pnpm run clean` - Remove build artifacts

### Code Quality

- `pnpm run lint` - Run ESLint
- `pnpm run lint:fix` - Run ESLint and fix auto-fixable issues
- `pnpm run format` - Format code with Prettier
- `pnpm run format:check` - Check code formatting

### Testing

- `pnpm run test` - Run tests once
- `pnpm run test:watch` - Run tests in watch mode
- `pnpm run test:coverage` - Run tests with coverage report

## Project Structure

```
.
├── src/              # Source code
├── tests/            # Test files
├── dist/             # Compiled output (generated)
├── openspec/         # OpenSpec specifications and changes
│   ├── specs/        # Current specifications
│   └── changes/      # Active change proposals
└── .github/          # GitHub Actions workflows
```

## Development Workflow

This project uses OpenSpec for spec-driven development:

1. **Create a change proposal** - Define what you want to build
2. **Review and refine specs** - Ensure requirements are clear
3. **Implement the change** - Write code that satisfies the specs
4. **Archive the change** - Move completed changes to archive

See `openspec/AGENTS.md` for detailed workflow instructions.

## Contributing

1. Create an OpenSpec change proposal for your feature
2. Get approval on the proposal
3. Implement according to the specification
4. Ensure all tests pass and code quality checks succeed
5. Submit a pull request

The CI/CD workflow will automatically verify:

- Code formatting (Prettier)
- Linting (ESLint)
- Type checking (TypeScript)
- Tests (Vitest)

## License

MIT
