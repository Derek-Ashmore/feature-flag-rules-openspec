## ADDED Requirements

### Requirement: Configuration File Support

The system SHALL support loading configuration from an external file that describes lists of userids, regions, and plans for feature evaluation.

#### Scenario: Configuration file loaded successfully

- **WHEN** a valid configuration file path is provided
- **THEN** the system loads and parses the configuration file
- **AND** the configuration is used for feature evaluation
- **AND** no errors are thrown

#### Scenario: Configuration file contains userids list

- **WHEN** a configuration file contains a list of userids
- **THEN** the system uses the userids list for feature evaluation
- **AND** rules can reference specific userids from the configuration

#### Scenario: Configuration file contains regions list

- **WHEN** a configuration file contains a list of regions
- **THEN** the system uses the regions list for feature evaluation
- **AND** rules can reference specific regions from the configuration

#### Scenario: Configuration file contains plans list

- **WHEN** a configuration file contains a list of plans
- **THEN** the system uses the plans list for feature evaluation
- **AND** rules can reference specific plans from the configuration

#### Scenario: Invalid configuration file format

- **WHEN** a configuration file has invalid format or structure
- **THEN** the system SHALL reject the configuration with a descriptive error message
- **AND** the error message indicates what is wrong with the configuration

#### Scenario: Configuration file not found

- **WHEN** a configuration file path is provided but the file does not exist
- **THEN** the system SHALL reject the configuration with a descriptive error message
- **AND** the error message indicates the file path that was not found

### Requirement: Dual Configuration Support

The system SHALL support both file-based configuration and programmatic configuration, maintaining backward compatibility with existing code.

#### Scenario: Programmatic configuration still works

- **WHEN** no configuration file is provided
- **THEN** the system uses programmatic/static configuration as before
- **AND** existing code continues to work without changes

#### Scenario: File-based configuration takes precedence

- **WHEN** both file-based and programmatic configuration are available
- **THEN** the system uses file-based configuration
- **OR** the system allows explicit selection of configuration source

## MODIFIED Requirements

### Requirement: Static Rule Configuration

The system SHALL use static, predefined rules for feature evaluation. Rules may be defined programmatically or loaded from a configuration file that describes lists of userids, regions, and plans.

#### Scenario: Rules are deterministic

- **WHEN** the same user context is evaluated multiple times
- **THEN** the system returns the same enabled features each time
- **AND** evaluation has no side effects

#### Scenario: Rules are statically defined

- **WHEN** feature evaluation is performed
- **THEN** rules are read from static configuration (programmatic or file-based)
- **AND** rules do not change during runtime
- **AND** configuration file is loaded once at initialization (not on every evaluation)
