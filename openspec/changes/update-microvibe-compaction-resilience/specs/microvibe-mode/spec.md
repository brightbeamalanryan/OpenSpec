## Purpose

MicroVibe is an incremental execution mode for AI coding assistants that delivers code unit-by-unit with explicit approval gates, enabling fine-grained control and educational context during implementation.

## ADDED Requirements

### Requirement: Compaction-Resilient Critical Requirements

MicroVibe instructions SHALL include a Critical Requirements section that summarizes non-negotiable behaviors in a concise format designed to survive AI context compaction.

#### Scenario: Critical Requirements survive compaction
- **WHEN** an AI assistant's context window compacts during a long MicroVibe session
- **THEN** the Critical Requirements section SHALL reinforce the four pillars of MicroVibe behavior
- **AND** the assistant SHALL continue to provide Context Blocks with design rationale

#### Scenario: Four pillars are documented
- **WHEN** the Critical Requirements section is rendered
- **THEN** it SHALL include:
  - **MicroVibe Core Concept**: Incremental execution with explicit approval gates
  - **Granularity**: Function/class/file unit selection based on flags
  - **Context Block**: Mandatory design rationale (WHERE IT FITS, PATTERNS, DEPENDENCIES, RELATIONSHIPS, DESIGN RATIONALE, SPEC REFERENCE)
  - **Iterative Evolution**: Stop-and-wait after each unit, incorporate user feedback, never batch multiple units

### Requirement: Context Block Mandatory Status

The Context Block SHALL be treated as a MANDATORY component of every MicroVibe unit presentation, not optional formatting guidance.

#### Scenario: Context Block always present
- **WHEN** presenting a code unit in MicroVibe mode
- **THEN** the Context Block MUST appear before the Implementation/Modification block
- **AND** the Context Block MUST include design rationale explaining WHY this approach was chosen

#### Scenario: Missing Context Block is a violation
- **WHEN** an assistant presents code without a Context Block in MicroVibe mode
- **THEN** this SHALL be considered non-compliant with MicroVibe requirements
