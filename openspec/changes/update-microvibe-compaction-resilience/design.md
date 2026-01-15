## Context

MicroVibe instructions are embedded in the `/openspec:apply` slash command body. During long AI sessions, context compaction summarizes earlier content to fit the context window. The detailed Context Block format (lines 56-84 in the current implementation) gets compressed out because it appears as "example formatting" rather than a mandatory requirement.

Users report that after compaction:
- Core behavior survives (code → approval prompt → wait)
- Context Block with design rationale disappears
- Educational value of MicroVibe is lost

## Goals / Non-Goals

**Goals:**
- Ensure MicroVibe's core concepts survive context compaction
- Reinforce the Context Block as mandatory, not optional formatting
- Keep the Critical Requirements section concise (~15-20 lines) so it survives summarization
- Cover all four pillars: concept, granularity, context, iterative evolution

**Non-Goals:**
- Restructuring the entire MicroVibe instruction set
- Adding new features to MicroVibe
- Changing the visual format of blocks

## Decisions

**Decision: Add Critical Requirements section at the END of instructions**
Placing it at the end ensures it's read last (recency bias in attention) and serves as a summary/reinforcement. During compaction, summaries often preserve end-of-section content better than middle content.

*Alternatives considered:*
- Moving Context Block to the top: Rejected—disrupts the natural workflow order
- Duplicating Context Block requirements: Rejected—adds bloat without guarantee of survival
- Using ALL CAPS throughout: Rejected—creates noise, reduces signal

**Decision: Use "CRITICAL" and "MUST" language**
Strong normative language signals to both the AI and summarization that these requirements are non-negotiable.

**Decision: Four-pillar structure**
Organizing around concept/granularity/context/evolution creates a memorable mental model that's easier to retain during compression than a flat list of rules.

## Risks / Trade-offs

- **Risk:** Additional text increases overall instruction length
  - *Mitigation:* Keep Critical Requirements to ~15-20 lines; net addition is minimal

- **Trade-off:** Some redundancy with earlier detailed instructions
  - *Acceptable:* Redundancy is the point—it's a deliberate backup for compaction scenarios

## Open Questions

None.
