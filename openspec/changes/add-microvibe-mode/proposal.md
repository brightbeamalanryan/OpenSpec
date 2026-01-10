## Why

Traditional AI coding workflows generate large chunks of code that developers review after the fact. This creates cognitive overload, makes it hard to catch misunderstandings early, and disconnects test creation from implementation. MicroVibe is an incremental execution mode that delivers code unit-by-unit with explicit approval gates, giving developers fine-grained control over AI-generated code. To be useful, the assistant must stop after each unit and wait for explicit user approval before proceeding.

## What Changes

- Add `--microvibe` (`--mv`) flag to the `/openspec:apply` slash command
- Add `--granularity` flag with levels: `function` (default), `class`, `file`
- Add `--tdd` flag for test-first workflow
- Introduce structured output blocks: Context, Implementation, Unit Test, Modification (diffs)
- Enforce single-unit responses with explicit stop-and-wait behavior after each approval prompt
- Require file writes only after approval, then resume with the next unit on the next user turn
- Treat non-code artifacts (config files, project scaffolding) as first-class units in the sequence
- Add batch approval for trivial code (getters, setters, type definitions)
- Add session state persistence (`microvibe-state.json`) for interrupt/resume
- Define approval prompt options: `y`es, `n`o (feedback), `s`kip, `q`uit, `v`iew (batch)

## Impact

- Affected specs: New `microvibe-execution` capability
- Affected code: `src/core/templates/slash-command-templates.ts` (apply command body)
- Dependencies: Builds on existing artifact-graph and instruction-loader capabilities
- No CLI command changes required (MicroVibe is AI-assistant behavior, not CLI tooling)
