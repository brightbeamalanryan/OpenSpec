export type SlashCommandId = 'proposal' | 'apply' | 'archive';

const baseGuardrails = `**Guardrails**
- Favor straightforward, minimal implementations first and add complexity only when it is requested or clearly required.
- Keep changes tightly scoped to the requested outcome.
- Refer to \`openspec/AGENTS.md\` (located inside the \`openspec/\` directory—run \`ls openspec\` or \`openspec update\` if you don't see it) if you need additional OpenSpec conventions or clarifications.`;

const proposalGuardrails = `${baseGuardrails}\n- Identify any vague or ambiguous details and ask the necessary follow-up questions before editing files.
- Do not write any code during the proposal stage. Only create design documents (proposal.md, tasks.md, design.md, and spec deltas). Implementation happens in the apply stage after approval.`;

const proposalSteps = `**Steps**
1. Review \`openspec/project.md\`, run \`openspec list\` and \`openspec list --specs\`, and inspect related code or docs (e.g., via \`rg\`/\`ls\`) to ground the proposal in current behaviour; note any gaps that require clarification.
2. Choose a unique verb-led \`change-id\` and scaffold \`proposal.md\`, \`tasks.md\`, and \`design.md\` (when needed) under \`openspec/changes/<id>/\`.
3. Map the change into concrete capabilities or requirements, breaking multi-scope efforts into distinct spec deltas with clear relationships and sequencing.
4. Capture architectural reasoning in \`design.md\` when the solution spans multiple systems, introduces new patterns, or demands trade-off discussion before committing to specs.
5. Draft spec deltas in \`changes/<id>/specs/<capability>/spec.md\` (one folder per capability) using \`## ADDED|MODIFIED|REMOVED Requirements\` with at least one \`#### Scenario:\` per requirement and cross-reference related capabilities when relevant.
6. Draft \`tasks.md\` as an ordered list of small, verifiable work items that deliver user-visible progress, include validation (tests, tooling), and highlight dependencies or parallelizable work.
7. Validate with \`openspec validate <id> --strict\` and resolve every issue before sharing the proposal.`;


const proposalReferences = `**Reference**
- Use \`openspec show <id> --json --deltas-only\` or \`openspec show <spec> --type spec\` to inspect details when validation fails.
- Search existing requirements with \`rg -n "Requirement:|Scenario:" openspec/specs\` before writing new ones.
- Explore the codebase with \`rg <keyword>\`, \`ls\`, or direct file reads so proposals align with current implementation realities.`;

const applySteps = `**Steps**
Track these steps as TODOs and complete them one by one.
1. Read \`changes/<id>/proposal.md\`, \`design.md\` (if present), and \`tasks.md\` to confirm scope and acceptance criteria.
2. Work through tasks sequentially, keeping edits minimal and focused on the requested change.
3. Confirm completion before updating statuses—make sure every item in \`tasks.md\` is finished.
4. Update the checklist after all work is done so each task is marked \`- [x]\` and reflects reality.
5. Reference \`openspec list\` or \`openspec show <item>\` when additional context is required.`;

const applyReferences = `**Reference**
- Use \`openspec show <id> --json --deltas-only\` if you need additional context from the proposal while implementing.`;

const applyMicroVibe = `**MicroVibe Mode** (v1.1)

IMPORTANT: If the command arguments include \`--mv\` or \`--microvibe\`, you MUST use MicroVibe mode instead of standard batch implementation. Check the arguments first.

MicroVibe is an incremental execution mode that delivers code unit-by-unit with explicit approval gates.

**Flags**
| Flag | Short | Description |
|------|-------|-------------|
| \`--microvibe\` | \`--mv\` | Enable MicroVibe mode |
| \`--granularity=<level>\` | | Approval unit: \`function\` (default), \`class\`, or \`file\` |
| \`--tdd\` | | Test-first: generate tests before implementation |

**When MicroVibe is enabled, follow this workflow:**

1. **Check for existing session**: If \`openspec/changes/<id>/microvibe-state.json\` exists, prompt: "Previous session found. Resume from <unit> in task <task>? (y/n)"

2. **For each code unit**, present these blocks in order:

   **Context Block** - Explain where this unit fits:
   \`\`\`
   ┌─ CONTEXT ──────────────────────────────────────────────┐
   │ <name> - <brief purpose>                               │
   │                                                        │
   │ WHERE IT FITS                                          │
   │ • Layer: <infrastructure|domain|application|ui>       │
   │ • Module: <module name>                                │
   │ • File: <file path>                                    │
   │                                                        │
   │ PATTERNS & PRINCIPLES                                  │
   │ • Pattern: <design pattern if applicable>              │
   │ • Follows: <principles: SRP, DRY, etc.>                │
   │                                                        │
   │ DEPENDENCIES                                           │
   │ • Imports: <key imports and why>                       │
   │                                                        │
   │ RELATIONSHIPS                                          │
   │ • Called by: <callers>                                 │
   │ • Calls: <callees>                                     │
   │                                                        │
   │ DESIGN RATIONALE                                       │
   │ • Why this approach: <reasoning>                       │
   │ • Trade-offs: <what was considered>                    │
   │                                                        │
   │ SPEC REFERENCE                                         │
   │ • Implements: <requirement ID from spec>               │
   └────────────────────────────────────────────────────────┘
   \`\`\`

   **Implementation Block** - For new code:
   \`\`\`
   ┌─ IMPLEMENTATION ──────────────────────────────────────┐
   │ // <file path>                                        │
   │                                                       │
   │ <code here>                                           │
   └───────────────────────────────────────────────────────┘
   \`\`\`

   **Modification Block** - For changes to existing code:
   \`\`\`
   ┌─ MODIFICATION ────────────────────────────────────────┐
   │ <file path> - <function name>                         │
   │                                                       │
   │ @@ -<line>,<count> +<line>,<count> @@                 │
   │  <context line>                                       │
   │ -<removed line>                                       │
   │ +<added line>                                         │
   │  <context line>                                       │
   └───────────────────────────────────────────────────────┘
   \`\`\`

   **Unit Test Block**:
   \`\`\`
   ┌─ UNIT TEST ───────────────────────────────────────────┐
   │ // <test file path>                                   │
   │                                                       │
   │ <test code here>                                      │
   └───────────────────────────────────────────────────────┘
   \`\`\`

3. **Approval Prompt**: After presenting blocks, show:
   \`Approve this <unit type>? [y]es / [n]o / [s]kip / [q]uit: _\`

   | Input | Action |
   |-------|--------|
   | \`y\` | Write files, run tests, proceed to next unit |
   | \`n\` | Ask for feedback, regenerate the unit |
   | \`s\` | Skip for now (mark pending), proceed to next |
   | \`q\` | Save progress to state file, exit session |

4. **Batch Approval**: For trivial code (getters, setters, type definitions), group into batches:
   \`\`\`
   ┌─ BATCH: <description> (<count> items) ─────────────────┐
   │ <brief explanation>                                    │
   │                                                        │
   │ • <item 1>                                             │
   │ • <item 2>                                             │
   │ • ...                                                  │
   │                                                        │
   │ [v]iew full code | Approve batch? [y/n/s/q]: _         │
   └────────────────────────────────────────────────────────┘
   \`\`\`
   Press \`v\` to see full implementations before deciding.

5. **TDD Mode** (\`--tdd\` flag): Present tests before implementation:
   - Show Context block
   - Show Unit Test block → get approval
   - Show Implementation block → get approval

6. **State Persistence**: Save progress to \`openspec/changes/<id>/microvibe-state.json\`:
   \`\`\`json
   {
     "version": "1.0",
     "changeId": "<id>",
     "progress": {
       "currentTask": "<task number>",
       "completedUnits": <count>,
       "totalUnits": <count>,
       "skippedUnits": ["<unit1>", "<unit2>"]
     }
   }
   \`\`\`

7. **Progress Display**: Show progress count with each unit (e.g., "3/12 units").

8. **Completion**: When all units are approved, remove the state file.`

const archiveSteps = `**Steps**
1. Determine the change ID to archive:
   - If this prompt already includes a specific change ID (for example inside a \`<ChangeId>\` block populated by slash-command arguments), use that value after trimming whitespace.
   - If the conversation references a change loosely (for example by title or summary), run \`openspec list\` to surface likely IDs, share the relevant candidates, and confirm which one the user intends.
   - Otherwise, review the conversation, run \`openspec list\`, and ask the user which change to archive; wait for a confirmed change ID before proceeding.
   - If you still cannot identify a single change ID, stop and tell the user you cannot archive anything yet.
2. Validate the change ID by running \`openspec list\` (or \`openspec show <id>\`) and stop if the change is missing, already archived, or otherwise not ready to archive.
3. Run \`openspec archive <id> --yes\` so the CLI moves the change and applies spec updates without prompts (use \`--skip-specs\` only for tooling-only work).
4. Review the command output to confirm the target specs were updated and the change landed in \`changes/archive/\`.
5. Validate with \`openspec validate --strict\` and inspect with \`openspec show <id>\` if anything looks off.`;

const archiveReferences = `**Reference**
- Use \`openspec list\` to confirm change IDs before archiving.
- Inspect refreshed specs with \`openspec list --specs\` and address any validation issues before handing off.`;

export const slashCommandBodies: Record<SlashCommandId, string> = {
  proposal: [proposalGuardrails, proposalSteps, proposalReferences].join('\n\n'),
  apply: [baseGuardrails, applySteps, applyReferences, applyMicroVibe].join('\n\n'),
  archive: [baseGuardrails, archiveSteps, archiveReferences].join('\n\n')
};

export function getSlashCommandBody(id: SlashCommandId): string {
  return slashCommandBodies[id];
}
