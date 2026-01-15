# MicroVibe: Take Control of AI Code Generation

![MicroVibe Infographic](../assets/MVibe-IGraphic.png)

## The Problem

I was building a tool using Claude Code, and even with OpenSpec keeping things structured, it was still generating more code than I could realistically oversee. Eventually I had to refactor an 11,000-line file to separate HTML rendering from API calls. It broke a lot.

That experience got me thinking: how do we combine the incredible speed of AI code generation with proper human oversight?

The answer is **MicroVibe**.

## What is MicroVibe?

MicroVibe is an execution mode for the OpenSpec framework that shifts the workflow from "generate all" to **generate, verify, approve, repeat**.

Instead of executing a full implementation plan at once, MicroVibe breaks work into atomic units (single functions by default). For each unit, you get:

1. **Context** - The AI explains where the code fits, the design pattern it follows, and its dependencies
2. **Implementation** - The actual code for that specific unit is generated
3. **Verification** - A corresponding unit test is generated alongside the code
4. **Approval** - You approve (`y`), reject (`n`), skip (`s`), or quit (`q`) before the AI proceeds

You stay in control. Tests aren't an afterthought. And you can quit mid-session and pick up exactly where you left off.

## Key Features

**Seamless Integration**
Activated via a simple flag on an existing command:
```bash
npx openspec apply --microvibe
# or
npx openspec apply --mv
```

**Granularity Control**
Choose the scope of generation to match your needs:
```bash
--granularity=function  # default - individual functions
--granularity=class     # entire classes
--granularity=file      # entire files
```

**TDD Mode**
Generate and approve tests before implementation code:
```bash
npx openspec apply --microvibe --tdd
```

**Session Persistence**
Progress is tracked in a state file (`microvibe-progress.json`), allowing you to quit and resume sessions without losing context.

## Getting Started

1. Clone the OpenSpec repo and switch to the `microvibe` branch:
   ```bash
   git clone https://github.com/brightbeamalanryan/OpenSpec
   cd OpenSpec
   git checkout microvibe
   ```

2. In your project, install OpenSpec from your local clone:
   ```bash
   mkdir my-project && cd my-project
   npm install -D file:///path/to/your/OpenSpec
   ```

3. Verify the installation:
   ```bash
   npx openspec --version
   ```
   You should see `0.17.3`

4. Initialise OpenSpec in your project:
   ```bash
   npx openspec init
   ```

5. If using Claude Code, add this to your `agents.md` or `claude.md`:
   > When using openspec, invoke it via npx.

6. Run MicroVibe on your next task:
   ```bash
   npx openspec apply --microvibe
   ```

## Why MicroVibe?

| Benefit | Description |
|---------|-------------|
| **Total Control** | Approve each unit individually before it's committed to your codebase |
| **Early Feedback** | Catch architectural and logical issues at the function level, not the feature level |
| **Educational Context** | The mandatory context block explains the "why" behind the code, not just the "what" |
| **Interruptible Workflow** | Quit and resume coding sessions without losing your place or context |
| **Flexible Granularity** | Start with fine-grained control and move to coarser approvals as you build trust in the AI |
| **Compaction Resilient** | Critical requirements survive AI context compaction during long sessions (v1.2+) |

## Licence

MIT
