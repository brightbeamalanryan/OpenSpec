## 1. Slash Command Template Updates

- [x] 1.1 Add MicroVibe mode documentation to apply command body in `src/core/templates/slash-command-templates.ts`
- [x] 1.2 Include flag definitions (`--microvibe`, `--mv`, `--granularity`, `--tdd`)
- [x] 1.3 Add Context block format specification with all required sections
- [x] 1.4 Add Implementation, Modification, and Unit Test block format specifications
- [x] 1.5 Add approval prompt options and their behaviors
- [x] 1.6 Add batch approval documentation for trivial code
- [x] 1.7 Add state file schema and resume behavior documentation
- [x] 1.8 Add explicit stop-and-wait behavior after each approval prompt
- [x] 1.9 Require one unit per response and file writes only after approval
- [x] 1.10 Treat non-code artifacts as approval units and clarify ordering guidance

## 2. Testing and Validation

- [x] 2.1 Run `pnpm run build` to verify template changes compile
- [x] 2.2 Run existing tests to ensure no regressions
- [x] 2.3 Manually verify updated slash command content via `openspec update` in a test project
