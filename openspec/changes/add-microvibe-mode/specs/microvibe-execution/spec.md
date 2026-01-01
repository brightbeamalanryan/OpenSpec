## ADDED Requirements

### Requirement: MicroVibe Mode Activation

The system SHALL support MicroVibe mode activation via flags on the apply command.

#### Scenario: Enable MicroVibe with full flag
- **WHEN** user runs `/openspec:apply <change-id> --microvibe`
- **THEN** the assistant enters incremental approval mode

#### Scenario: Enable MicroVibe with short flag
- **WHEN** user runs `/openspec:apply <change-id> --mv`
- **THEN** the assistant enters incremental approval mode

#### Scenario: Default behavior without flag
- **WHEN** user runs `/openspec:apply <change-id>` without MicroVibe flags
- **THEN** the assistant uses standard batch implementation

### Requirement: Granularity Levels

The system SHALL support configurable approval granularity.

#### Scenario: Function granularity (default)
- **WHEN** MicroVibe is enabled without `--granularity` flag
- **THEN** the assistant presents individual functions for approval

#### Scenario: Class granularity
- **WHEN** user specifies `--granularity=class`
- **THEN** the assistant presents entire classes for approval

#### Scenario: File granularity
- **WHEN** user specifies `--granularity=file`
- **THEN** the assistant presents entire files for approval

### Requirement: TDD Mode

The system SHALL support test-first development workflow.

#### Scenario: TDD mode enabled
- **WHEN** user specifies `--tdd` flag
- **THEN** the assistant presents tests before implementation for each unit

#### Scenario: TDD approval flow
- **WHEN** TDD mode is active
- **THEN** the flow is: Context -> Test -> Approve Test -> Implementation -> Approve Implementation

### Requirement: Context Block

The system SHALL present context information before each code unit.

#### Scenario: Context block structure
- **WHEN** presenting a code unit for approval
- **THEN** the assistant displays a Context block containing:
  - Function/class name and purpose
  - WHERE IT FITS: layer, module, file path
  - PATTERNS & PRINCIPLES: design patterns, principles followed
  - DEPENDENCIES: imports and their purpose
  - RELATIONSHIPS: what calls this, what this calls
  - DESIGN RATIONALE: why this approach, trade-offs
  - SPEC REFERENCE: which requirement this implements

#### Scenario: Context block formatting
- **WHEN** rendering a Context block
- **THEN** use ASCII box drawing characters for visual separation

### Requirement: Implementation Block

The system SHALL present implementation code in a structured block.

#### Scenario: New code implementation
- **WHEN** presenting new code for approval
- **THEN** display an Implementation block with file path and code

#### Scenario: Implementation block formatting
- **WHEN** rendering an Implementation block
- **THEN** use ASCII box drawing with "IMPLEMENTATION" header

### Requirement: Modification Block

The system SHALL present code modifications as diffs.

#### Scenario: Existing code modification
- **WHEN** modifying existing code
- **THEN** display a Modification block with unified diff format

#### Scenario: Modification block content
- **WHEN** rendering a Modification block
- **THEN** show file path, function name, and diff with context lines

### Requirement: Unit Test Block

The system SHALL present unit tests alongside implementations.

#### Scenario: Test block structure
- **WHEN** presenting a code unit for approval
- **THEN** display a Unit Test block with test file path and test code

#### Scenario: Test coverage
- **WHEN** generating tests for a unit
- **THEN** include tests for success cases, edge cases, and error conditions

### Requirement: Approval Prompt

The system SHALL present an approval prompt after each unit.

#### Scenario: Standard approval options
- **WHEN** presenting a unit for approval
- **THEN** show prompt: `Approve this function? [y]es / [n]o / [s]kip / [q]uit:`

#### Scenario: Approve action
- **WHEN** user enters `y`
- **THEN** write files, run tests, proceed to next unit

#### Scenario: Reject action
- **WHEN** user enters `n`
- **THEN** prompt for feedback and regenerate the unit

#### Scenario: Skip action
- **WHEN** user enters `s`
- **THEN** skip this unit, proceed to next, mark as pending

#### Scenario: Quit action
- **WHEN** user enters `q`
- **THEN** save progress to state file and exit session

### Requirement: Batch Approval

The system SHALL offer batch approval for trivial code.

#### Scenario: Batch grouping
- **WHEN** multiple trivial units are consecutive (getters, setters, type definitions)
- **THEN** group them into a batch with summary

#### Scenario: Batch view option
- **WHEN** presenting a batch
- **THEN** include `[v]iew full code` option before approval

#### Scenario: Batch approval prompt
- **WHEN** presenting a batch
- **THEN** show: `[v]iew full code | Approve batch? [y/n/s/q]:`

### Requirement: Session State Persistence

The system SHALL persist session state for resume capability.

#### Scenario: State file location
- **WHEN** MicroVibe session is active
- **THEN** state is stored at `openspec/changes/<id>/microvibe-state.json`

#### Scenario: State file schema
- **WHEN** persisting state
- **THEN** JSON includes: version, changeId, progress (currentTask, completedUnits, totalUnits)

#### Scenario: Session resume prompt
- **WHEN** starting MicroVibe on a change with existing state
- **THEN** prompt: "Previous session found. Resume from <unit> in task <task>? (y/n)"

#### Scenario: State cleanup on completion
- **WHEN** all units are approved and change is complete
- **THEN** remove the state file

### Requirement: Progress Tracking

The system SHALL track and display progress through the change.

#### Scenario: Progress indicator
- **WHEN** presenting each unit
- **THEN** show progress count (e.g., "3/12 units")

#### Scenario: Skipped units tracking
- **WHEN** units are skipped
- **THEN** state file tracks skipped units for later revisit
