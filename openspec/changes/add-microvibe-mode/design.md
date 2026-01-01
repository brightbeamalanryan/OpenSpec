## Context

MicroVibe changes how AI assistants execute the `/openspec:apply` command. Instead of implementing entire tasks at once, the assistant breaks work into approval units (functions, classes, or files) and presents each with context, implementation, and tests for user approval before writing files.

This is primarily an AI-assistant behavioral specification, not a CLI tool feature. The CLI's role is limited to:
1. Updating slash command templates to include MicroVibe instructions
2. Providing state file conventions for session persistence

## Goals / Non-Goals

**Goals:**
- Define clear output format for approval blocks (Context, Implementation, Test, Modification)
- Specify approval prompt semantics (y/n/s/q/v)
- Define state file schema for session resume
- Support three granularity levels with clear guidance
- Enable TDD workflow variant

**Non-Goals:**
- Building interactive CLI prompts (assistants handle this natively)
- Implementing code parsing/splitting (assistants handle this)
- Enforcing MicroVibe mode (optional enhancement, not default)

## Decisions

**Decision: Slash command template extension**
MicroVibe instructions will be added to the apply slash command body. When `--microvibe` is passed, the assistant follows the incremental workflow instead of the standard batch implementation.

*Alternatives considered:*
- Separate `/openspec:apply-microvibe` command: Rejected because it fragments the apply experience and duplicates content
- Runtime CLI flag that modifies behavior: Rejected because MicroVibe is AI behavior, not CLI behavior

**Decision: State file in change directory**
Session state lives at `openspec/changes/<id>/microvibe-state.json`. This keeps state co-located with the change and makes it easy to clean up.

*Alternatives considered:*
- Global state directory: Rejected because state is change-specific
- No persistence: Rejected because resume-after-interrupt is a key benefit

**Decision: ASCII box drawing for blocks**
Use ASCII box characters (`┌─┐│└─┘`) for visual separation. These render well in terminals and markdown.

*Alternatives considered:*
- Markdown code blocks: Less visually distinct
- Plain separators: Harder to scan

## Risks / Trade-offs

- **Risk:** Assistants may not consistently follow MicroVibe format
  - *Mitigation:* Clear, structured instructions with examples in the slash command body

- **Risk:** State file corruption could block resume
  - *Mitigation:* Simple JSON schema, assistants can regenerate state from filesystem

- **Trade-off:** MicroVibe is slower than batch implementation
  - *Acceptable:* Users opt in when they want control over speed

## Open Questions

None - the user's specification is comprehensive.
