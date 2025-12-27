# feature-flag-rules-openspec

Feature flag rules engine to illustrate spec-driven development using OpenSpec.

## Overview

This project demonstrates spec-driven development using the [OpenSpec](https://github.com/Fission-AI/OpenSpec) framework. All features are specified before implementation, ensuring clear requirements and testable behavior.

## OpenSpec Development Steps

This project was developed following the OpenSpec workflow. The steps below outline the progression from initialization through implementation, organized by git tags:

| Tag | Description |
|-----|-------------|
| [`1_openspec_init`](https://github.com/your-org/feature-flag-rules-openspec/releases/tag/1_openspec_init) | Initialize OpenSpec |
| [`2_project_setup_proposal`](https://github.com/your-org/feature-flag-rules-openspec/releases/tag/2_project_setup_proposal) | Propose change to setup the project |
| [`3_project_setup_archive`](https://github.com/your-org/feature-flag-rules-openspec/releases/tag/3_project_setup_archive) | Implement and archive change to setup the project |
| [`4_initial_implementation_proposal`](https://github.com/your-org/feature-flag-rules-openspec/releases/tag/4_initial_implementation_proposal) | Propose initial functionality with design and plan |
| [`5_initial_implementation_archive`](https://github.com/your-org/feature-flag-rules-openspec/releases/tag/5_initial_implementation_archive) | Implement initial functionality |
| [`6_config_file_proposal`](https://github.com/your-org/feature-flag-rules-openspec/releases/tag/6_config_file_proposal) | Propose configuration file enhancement with design and plan |
| [`7_config_file_archive`](https://github.com/your-org/feature-flag-rules-openspec/releases/tag/7_config_file_archive) | Implement configuration file enhancement |

## Prerequisites

- Node.js 20 or higher
- npm 8 or higher

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Verify setup:**
   ```bash
   npm run type-check
   npm run lint
   npm run test
   ```

## Available Scripts

### Development

- `npm run build` - Compile TypeScript to JavaScript
- `npm run type-check` - Type check without emitting files
- `npm run clean` - Remove build artifacts

### Code Quality

- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint and fix auto-fixable issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Testing

- `npm run test` - Run tests once
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## Configuration File Support

The rules engine supports file-based configuration (YAML) alongside programmatic configuration. File-based configuration takes precedence when both sources are provided, but you can explicitly choose a source.

### YAML format

```yaml
userids:
  - user-special
regions:
  - eu
plans:
  - enterprise
```

Example with per-user region/plan combos (one document per user):

```yaml
# user-alpha: eu + enterprise
userids:
  - user-alpha
regions:
  - eu
plans:
  - enterprise
---
# user-beta: us + pro
userids:
  - user-beta
regions:
  - us
plans:
  - pro
---
# user-gamma: apac + starter
userids:
  - user-gamma
regions:
  - apac
plans:
  - starter
```

All fields are optional; when present they must be arrays of non-empty strings.

### Usage

```ts
import { evaluateFeatures } from "feature-flag-rules-openspec";

const result = evaluateFeatures(
  { userId: "user-special", region: "eu", plan: "enterprise" },
  { configFilePath: "./config.yaml" }
);
```

To force programmatic configuration when a file path is also provided, pass `configSource: "programmatic"`.

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
