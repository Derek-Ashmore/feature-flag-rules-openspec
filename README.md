# feature-flag-rules-openspec

Feature flag rules engine to illustrate spec-driven development using OpenSpec.

## Overview

This project demonstrates spec-driven development using the [OpenSpec](https://github.com/Fission-AI/OpenSpec) framework. All features are specified before implementation, ensuring clear requirements and testable behavior.

## OpenSpec Artifacts

| Type | Name | Path |
|------|------|------|
| **Project Definition** | Project Context | [`openspec/project.md`](openspec/project.md) |
| **Current Specification** | Feature Evaluation | [`openspec/specs/feature-evaluation/spec.md`](openspec/specs/feature-evaluation/spec.md) |
| **Current Specification** | Project Setup | [`openspec/specs/project-setup/spec.md`](openspec/specs/project-setup/spec.md) |
| **Archived Change Proposal** | Initialize Project Setup | [`openspec/changes/archive/2025-12-16-initialize-project-setup/`](openspec/changes/archive/2025-12-16-initialize-project-setup/) |
| **Archived Change Proposal** | Add Initial Implementation | [`openspec/changes/archive/2025-12-16-add-initial-implementation/`](openspec/changes/archive/2025-12-16-add-initial-implementation/) |
| **Archived Change Proposal** | Add Configuration File Support | [`openspec/changes/archive/2025-12-17-add-config-file-support/`](openspec/changes/archive/2025-12-17-add-config-file-support/) |

## OpenSpec Development Steps

This project was developed following the OpenSpec workflow. The steps below outline the progression from initialization through implementation, organized by git tags:

| Tag                                                                                                                                           | Phase      | Description                                                 |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ----------------------------------------------------------- |
| [`1_openspec_init`](https://github.com/your-org/feature-flag-rules-openspec/releases/tag/1_openspec_init)                                     | Init       | Initialize OpenSpec                                         |
| [`2_project_setup_proposal`](https://github.com/your-org/feature-flag-rules-openspec/releases/tag/2_project_setup_proposal)                   | Proposal   | Propose change to setup the project                         |
| [`3_project_setup_archive`](https://github.com/your-org/feature-flag-rules-openspec/releases/tag/3_project_setup_archive)                     | Apply + Archive | Implement and archive change to setup the project       |
| [`4_initial_implementation_proposal`](https://github.com/your-org/feature-flag-rules-openspec/releases/tag/4_initial_implementation_proposal) | Proposal   | Propose initial functionality with design and plan          |
| [`5_initial_implementation_archive`](https://github.com/your-org/feature-flag-rules-openspec/releases/tag/5_initial_implementation_archive)   | Apply + Archive | Implement initial functionality                         |
| [`6_config_file_proposal`](https://github.com/your-org/feature-flag-rules-openspec/releases/tag/6_config_file_proposal)                       | Proposal   | Propose configuration file enhancement with design and plan |
| [`7_config_file_archive`](https://github.com/your-org/feature-flag-rules-openspec/releases/tag/7_config_file_archive)                         | Apply + Archive | Implement configuration file enhancement                |

> Notes

I instructed the Cursor agent to make *all* changes. This includes:
* All OpenSpec specification and markdown documents. I described the proposals and changes I wanted made to them to the agent, who performed all creates and edits.
* All code and GitHub workflows were written by Cursor and made all changes when defects were found.



### OpenSpec Artifacts & Agent Instructions by Tag

For each tag, the tables below show **which OpenSpec artifacts were created or enhanced** and **which coding-agent instructions to use** to accomplish that work.

**Coding agent quick reference**

| Phase | Cursor command | When to use |
|-------|----------------|-------------|
| Init | `openspec init` (CLI) | Bootstrap `openspec/` structure and `project.md` |
| Proposal | **`/openspec-proposal`** | Create or update a change: `proposal.md`, `tasks.md`, optional `design.md`, spec deltas |
| Apply | **`/openspec-apply`** | Implement an approved change per `tasks.md` |
| Archive | **`/openspec-archive`** | Move completed change to `archive/` and refresh `specs/` |

Full command definitions live in `.cursor/commands/` (`openspec-proposal`, `openspec-apply`, `openspec-archive`). See `openspec/AGENTS.md` for detailed workflow and CLI usage.

---

#### `1_openspec_init` — Initialize OpenSpec

**Artifacts created**

| Path | Purpose |
|------|---------|
| `openspec/project.md` | Project context, conventions, domain, constraints |
| `openspec/AGENTS.md` | OpenSpec instructions for AI assistants (workflow, CLI, spec format) |
| `openspec/specs/` | Directory for current specifications |
| `openspec/changes/` | Directory for change proposals and archive |

**Agent instructions**

- Run `openspec init [path]` to scaffold the OpenSpec structure, or create the above manually.
- Ensure `openspec/project.md` captures tech stack, conventions, and domain; keep `openspec/AGENTS.md` aligned with [OpenSpec](https://github.com/Fission-AI/OpenSpec) workflow.

---

#### `2_project_setup_proposal` — Propose project setup

**Artifacts created**

| Path | Purpose |
|------|---------|
| `openspec/changes/initialize-project-setup/proposal.md` | Why, what changes, impact |
| `openspec/changes/initialize-project-setup/tasks.md` | Implementation checklist |
| `openspec/changes/initialize-project-setup/design.md` | Technical decisions (tooling, structure) |
| `openspec/changes/initialize-project-setup/specs/project-setup/spec.md` | Delta: ADDED requirements for project setup |

**Agent instructions**

- Use the **`/openspec-proposal`** Cursor command (or follow `openspec/AGENTS.md` Stage 1).
- Review `openspec/project.md`, `openspec list`, `openspec list --specs`.
- Choose change-id (e.g. `initialize-project-setup`), scaffold `proposal.md`, `tasks.md`, `design.md`, and `specs/project-setup/spec.md`.
- Use `## ADDED Requirements` and `#### Scenario:` per requirement. Run `openspec validate <change-id> --strict` before sharing.

---

#### `3_project_setup_archive` — Implement and archive project setup

**Artifacts created or enhanced**

| Path | Purpose |
|------|---------|
| Project root | `package.json`, `tsconfig.json`, Prettier, ESLint, Vitest, GitHub Actions, etc. |
| `openspec/changes/archive/YYYY-MM-DD-initialize-project-setup/` | Archived proposal, tasks, design, spec deltas |
| `openspec/specs/project-setup/spec.md` | Current project-setup spec (updated from delta) |

**Agent instructions**

1. Use **`/openspec-apply`** (or `openspec/AGENTS.md` Stage 2): read `proposal.md`, `design.md`, `tasks.md` in `openspec/changes/initialize-project-setup/`, implement tasks sequentially, mark tasks complete.
2. Use **`/openspec-archive`** (or Stage 3): run `openspec archive initialize-project-setup --yes` to move the change to `archive/` and update `specs/`. Then run `openspec validate --strict`.

---

#### `4_initial_implementation_proposal` — Propose initial feature evaluation

**Artifacts created**

| Path | Purpose |
|------|---------|
| `openspec/changes/add-initial-implementation/proposal.md` | Why, what changes, impact |
| `openspec/changes/add-initial-implementation/tasks.md` | Implementation checklist |
| `openspec/changes/add-initial-implementation/specs/feature-evaluation/spec.md` | Delta: ADDED requirements for feature evaluation |

**Agent instructions**

- Use **`/openspec-proposal`**. Omit `design.md` unless the change is cross-cutting or architecturally significant.
- Add `specs/feature-evaluation/spec.md` under the change; use `## ADDED Requirements` and scenarios. Validate with `openspec validate add-initial-implementation --strict`.

---

#### `5_initial_implementation_archive` — Implement and archive feature evaluation

**Artifacts created or enhanced**

| Path | Purpose |
|------|---------|
| `src/index.ts`, `tests/index.test.ts` | Core evaluation logic and tests |
| `openspec/changes/archive/YYYY-MM-DD-add-initial-implementation/` | Archived change |
| `openspec/specs/feature-evaluation/spec.md` | Current feature-evaluation spec |

**Agent instructions**

1. **`/openspec-apply`**: Implement `add-initial-implementation` per `tasks.md`; update task checkboxes when done.
2. **`/openspec-archive`**: Run `openspec archive add-initial-implementation --yes`, then `openspec validate --strict`.

---

#### `6_config_file_proposal` — Propose config file support

**Artifacts created**

| Path | Purpose |
|------|---------|
| `openspec/changes/add-config-file-support/proposal.md` | Why, what changes, impact |
| `openspec/changes/add-config-file-support/tasks.md` | Implementation checklist |
| `openspec/changes/add-config-file-support/specs/feature-evaluation/spec.md` | Delta: ADDED/MODIFIED requirements for file-based config |

**Agent instructions**

- Use **`/openspec-proposal`**. This change **modifies** existing `feature-evaluation`; add deltas under `changes/add-config-file-support/specs/feature-evaluation/spec.md` using `## ADDED` or `## MODIFIED Requirements` as needed.
- Validate with `openspec validate add-config-file-support --strict`.

---

#### `7_config_file_archive` — Implement and archive config file support

**Artifacts created or enhanced**

| Path | Purpose |
|------|---------|
| `src/index.ts` (and any new modules) | Config loading, YAML parsing, evaluation updates |
| `openspec/changes/archive/YYYY-MM-DD-add-config-file-support/` | Archived change |
| `openspec/specs/feature-evaluation/spec.md` | Updated spec including config file behavior |

**Agent instructions**

1. **`/openspec-apply`**: Implement `add-config-file-support` per `tasks.md`; complete and check off all tasks.
2. **`/openspec-archive`**: Run `openspec archive add-config-file-support --yes`, then `openspec validate --strict`.

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

- **Artifacts & agent instructions**: See [OpenSpec Artifacts & Agent Instructions by Tag](#openspec-artifacts--agent-instructions-by-tag) for what gets created at each tag and which Cursor commands to use.
- **Full workflow**: See `openspec/AGENTS.md` for detailed instructions and CLI reference.

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
