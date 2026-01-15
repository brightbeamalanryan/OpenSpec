# Change: Add Critical Requirements section to MicroVibe for compaction resilience

## Why

When AI context windows compact during long sessions, MicroVibe's detailed formatting instructions (especially the Context Block with design rationale) get summarized out while the "core loop" survives. Users lose the educational reasoning that makes MicroVibe valuable—they still get code-by-code approval, but without understanding *why* each piece exists.

## What Changes

- Add a **Critical Requirements** section at the end of MicroVibe instructions that summarizes non-negotiable behaviors
- This section acts as a "compaction firewall"—concise enough to survive summarization while reinforcing essential concepts:
  1. **MicroVibe Core Concept**: Incremental execution with explicit approval gates
  2. **Granularity**: Function/class/file unit selection
  3. **Context Block**: The educational reasoning (WHERE IT FITS, DESIGN RATIONALE, etc.)
  4. **Iterative Evolution**: Stop-and-wait, never batch, incorporate feedback

## Impact

- Affected code: `src/core/templates/slash-command-templates.ts` (applyMicroVibe constant)
- No spec changes required—this is a behavioral refinement to existing functionality
- No breaking changes
