# AI CLI Tools Community Digest 2026-09-25

> Generated: 2026-09-25 00:46 UTC | Tools covered: 7

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Pi](https://github.com/earendil-works/pi)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## Cross-Tool Comparison

### AI CLI Tools Ecosystem: Cross-Tool Comparison Report (2026-09-25)

#### 1. Ecosystem Overview
The AI CLI ecosystem is currently transitioning from an "experimental phase" to a "stabilization phase," characterized by architectural hardening and a focus on enterprise-grade reliability. Developers are moving away from monolithic, browser-integrated agents toward daemonized, process-isolated architectures to combat frequent memory leaks and resource contention. While these tools have achieved impressive utility, persistent "wedged" sessions and environment-specific instability (particularly on Windows) currently pose the largest barriers to mainstream developer adoption.

#### 2. Activity Comparison
*Note: Counts represent high-interest/active items reported in the digests.*

| Tool | Hot Issues | Key PRs | Discussions | Release Status |
| :--- | :---: | :---: | :---: | :--- |
| **Claude Code** | 10 | 5 | N/A | Active (v2.1.282) |
| **OpenAI Codex** | 10 | 10 | 3 | Active (v0.158) |
| **Gemini CLI** | 10 | 10 | N/A | Active (v0.62) |
| **Copilot CLI** | 10 | 1 | N/A | Active (v1.0.89) |
| **OpenCode** | 10 | 10 | N/A | Stagnant (No new) |
| **Pi** | 10 | 10 | N/A | Stagnant (No new) |
| **Qwen Code** | 10 | 10 | N/A | Active (v0.24.5) |

#### 3. Shared Feature Directions
*   **Agentic Guardrails:** Almost all communities (Claude, Gemini, OpenCode, Pi) are prioritizing safety mechanisms, specifically permission-gated shell operations and automatic redaction of sensitive data in logs.
*   **Telemetry & Observability:** A clear push for OTLP (OpenTelemetry) standards to debug agent behavior, notably in Pi (`pi-otel`) and Claude Code.
*   **Architecture Decoupling:** There is a widespread movement to offload heavy agent logic from Electron/TypeScript UI loops into hardened, language-native backends (e.g., Qwen’s Java daemon, OpenAI’s Rust core).
*   **State Transparency:** Developers across all platforms are demanding clearer "memory" visibility (why the agent made a change, what state is loaded).

#### 4. Differentiation Analysis
*   **Claude Code** is positioning itself as the "ergonomic" leader, prioritizing terminal readability and developer autonomy through fine-grained config options.
*   **OpenAI Codex** is the most aggressively "enterprise-focused," with heavy investment in Pro/Max tier modularity, resource management (transparent huge pages), and rigid sandbox authorization.
*   **Qwen Code** stands out for its structural shift toward a Managed Agent architecture, focusing on long-term sustainability rather than quick UI patches.
*   **Gemini CLI** is betting heavily on AST-aware code processing, attempting to move beyond raw text-based shell interactions to improve task precision.

#### 5. Community Momentum & Maturity
*   **High Velocity/Iteration:** **OpenAI Codex** and **Gemini CLI** exhibit the most aggressive development cycles, evidenced by a high volume of complex PRs focusing on infrastructure rather than just features.
*   **Maturity/Stability Focus:** **Claude Code** maintains the most stable interface, but its community is reaching a "frustration ceiling" due to safety filter over-sensitivity.
*   **Stagnation Risk:** **OpenCode** and **Pi** show signs of developer burnout or slowed momentum, with no recent releases and high friction surrounding the automated closing of issues, which may signal a waning community trust.

#### 6. Trend Signals
*   **The "System One" Pattern:** The demand for a "superfast" lightweight model to handle routing/classification before triggering a full-context LLM is becoming a standard feature request (Qwen, Gemini).
*   **Resource Management as a Feature:** As these tools mature, "memory footprint" is becoming a critical KPI. Users are no longer just asking for "smarter" code; they are demanding "leaner" agents that don't trigger OOM (Out of Memory) loops on standard dev machines.
*   **Authentication/Policy Friction:** As enterprise adoption grows, CLI tools are clashing with existing IT policies (AppLocker, Managed Proxy). Developers are increasingly requesting "permission-gated" overrides, signaling that these tools must become better "corporate citizens" to be used in secure environments.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

### Claude Code Skills: Community Highlights Report (as of 2026-09-25)

This report analyzes the `anthropics/skills` repository to identify key development trends, community pain points, and emerging toolsets within the Claude Code ecosystem.

---

### 1. Top Skills Ranking (by Activity & Impact)
These skills represent the most significant development efforts currently impacting the ecosystem:

*   **[skill-creator](https://github.com/anthropics/skills/pull/1298)**: Currently undergoing critical repairs to isolate trigger evaluations. Developers are focusing on cross-platform reliability (Windows) and ensuring runtime failures don't lead to false-positive triggers.
*   **[mcp-builder](https://github.com/anthropics/skills/pull/1742)**: An essential maintenance effort ensuring compatibility with `mcp>=2.0.0`. It addresses critical issues with streamable client imports and custom header configuration.
*   **[docx-skills](https://github.com/anthropics/skills/pull/1792)**: A highly active set of PRs focused on stability, fixing document corruption caused by `w:id` collisions and ensuring proper error handling for `soffice` timeouts.
*   **[AWT (AI Watch Tester)](https://github.com/anthropics/skills/pull/822)**: An E2E testing skill gaining momentum; it integrates vision and browser control for zero-code test generation.
*   **[pyxel-skill](https://github.com/anthropics/skills/pull/525)**: A specialized skill for retro game development, enabling headless input-driven runs and direct frame inspection for automated testing.
*   **[document-typography](https://github.com/anthropics/skills/pull/514)**: A quality-control skill designed to enforce professional standards in AI-generated documents (e.g., preventing orphans, widows, and alignment issues).

---

### 2. Community Demand Trends
Analysis of Issues reveals the following priority areas for the developer community:

*   **Security & Namespace Integrity:** There is significant concern regarding trust boundaries (Issue [#492](https://github.com/anthropics/skills/issues/492)). Users are calling for clearer distinction between official Anthropic-maintained skills and community-contributed code to prevent impersonation.
*   **Workflow Efficiency & Scaling:** High demand exists for native organization-wide skill sharing (Issue [#228](https://github.com/anthropics/skills/issues/228)) to move away from manual `.skill` file distribution.
*   **Eval Infrastructure:** Many contributors are struggling with "silent failures" where skills are created but never triggered, leading to calls for better testing harnesses (Issue [#556](https://github.com/anthropics/skills/issues/556)) and more reliable evaluation metrics for agent performance.
*   **Agent Governance:** Interest is growing in "meta-skills" that provide safety patterns, such as threat detection, audit trails, and output quality gates (Issue [#1385](https://github.com/anthropics/skills/issues/1385)).

---

### 3. High-Potential Pending Skills
These active PRs show significant innovation and are strong candidates for wider adoption once merged:

*   **[proofcore-contract-auditor](https://github.com/anthropics/skills/pull/1771)**: Bridges AI agent capability with Web3 by automating Solidity/Rust static analysis and anchoring audit proofs on the TON Blockchain.
*   **[md2video-audio](https://github.com/anthropics/skills/pull/1703)**: A novel, zero-cost utility that compiles Markdown directly into professional-grade MP4s with human-like voiceovers.
*   **[blast-radius](https://github.com/anthropics/skills/pull/1776)**: A risk-mitigation skill that provides an automated checklist before performing destructive database or bulk-write operations.

---

### 4. Skills Ecosystem Insight
The community’s most concentrated demand is currently shifting from **functional breadth** (adding new tools) to **operational stability and reliability** (fixing trigger logic, improving context window management, and establishing secure, professional-grade quality gates).

---

# Claude Code Community Digest: 2026-09-25

### 1. Today's Highlights
The release of **v2.1.282** focuses on terminal ergonomics and transparency, introducing `maxProseWidth` and clearer telemetry documentation. Meanwhile, the community is currently grappling with a surge of reports regarding GitHub integration failures and strict content filtering, particularly affecting power users and remote Cowork sessions.

### 2. Releases
*   **v2.1.282:** Introduces `maxProseWidth` for improved readability in wide terminals. Added a startup notice and `/status` updates to provide better visibility into project-specific telemetry settings.

### 3. Hot Issues
1.  **[#82056] Memory Index Ambiguity:** Users need to distinguish between loaded/truncated/missing auto-memory segments to trust the context provided by `MEMORY.md`.
2.  **[#76248] Git Proxy Regressions:** A major blocker; GitHub pushes fail in Cowork sessions, even with valid PATs, suggesting a rollout issue with `CCR_TEST_GITPROXY`.
3.  **[#41836] MCP Session Isolation:** Persistent request for session/conversation identifiers to enable stateful MCP servers.
4.  **[#90018] Prompt Cache Invalidation:** The `totalTokensReminder` is inadvertently triggering prompt-cache floor resets, hurting performance in long-running loops.
5.  **[#96118] Safety Filter Over-sensitivity:** Users report legitimate developer workflows being flagged by Opus 5.5 safeguards under `reasoning_extraction`.
6.  **[#78160] Password/Login Blocks:** Developers are requesting a permission-gated opt-in to allow Claude to interact with auth forms in local test environments.
7.  **[#95930] Phantom Diff Rendering:** Changing branches or rebasing causes Claude to falsely report file changes as new edits in the chat, confusing user history.
8.  **[#95813] Sandbox Exclusion Failure:** Commands defined in `sandbox.excludedCommands` are still being sandboxed, breaking specific dev workflows.
9.  **[#96187] Cowork/Desktop Sync Errors:** Cloud-synced sessions are causing file attribution and consistency issues, with edits applying to local copies incorrectly.
10. **[#96913] Linux/Cinnamon UI Freezes:** A critical stability issue where custom title bar menus cause the desktop app to hang on X11.

### 4. Key PR Progress
*All listed PRs were merged/closed as part of the v2.1.28x development cycle:*
*   **[#96364] Read Paginated AGENTS.md:** Fixes issue where auto-pagination caused repeated loading of nested files.
*   **[#96363] Git Color Sanitization:** Forces `--no-color` on `git diff` to prevent ANSI escape codes from corrupting diff bodies.
*   **[#96487] Enhanced Telemetry:** Standardizes version reporting from the engine to ensure accurate build data in logs.
*   **[#95423] Read-Only Shell Optimization:** Prevents redundant diff refetches when performing read-only shell commands (e.g., `ls`, `cat`).
*   **[#96570] Hook Optimization:** Improves how `command.run` hooks are matched for faster startup responsiveness.

### 5. Feature Request Trends
*   **Integration Robustness:** Users are consistently requesting better error handling and "re-connect" triggers for GitHub OAuth and Git proxying.
*   **Developer Autonomy:** Growing demand for "permission-gated" overrides for security features (passwords, specific sandboxed commands).
*   **UI Parity:** Feature parity requests between Desktop (Windows/Linux) and the macOS/Web clients (e.g., "Reply" popups).

### 6. Developer Pain Points
*   **"Cowork" Instability:** High frustration regarding GitHub connectivity and file consistency when working in cloud-synced sessions.
*   **Safety Filter Friction:** Developers feel the content classifier is becoming "knee-jerk," blocking legitimate day-to-day coding tasks rather than just malicious ones.
*   **State Transparency:** Significant confusion regarding "phantom edits" and memory loading states; developers want to see *what* Claude sees and *why* it is reporting specific changes.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest: 2026-09-25

## 1. Today's Highlights
The Codex ecosystem is currently undergoing a intense stabilization phase, primarily focused on resolving critical regressions in the Windows desktop application following recent updates. Concurrently, the core development team is aggressively modularizing the platform, introducing "Pro Max" tier support and fine-tuning resource management through transparent huge pages and improved sandbox authorization logic.

## 2. Releases
*   **rust-v0.158.0-alpha.7 through alpha.11**: A rapid succession of alpha releases indicates active iteration on the Rust core, likely addressing performance bottlenecks and sandbox stability.
*   **rust-v0.157.0-alpha.11.1**: Maintenance release for the previous branch.

## 3. Hot Issues
1.  [#20214](https://github.com/openai/codex/issues/20214): **Windows Performance Stuttering**: Persistent high-interest bug (87 👍) regarding freezes on Windows 11.
2.  [#3141](https://github.com/openai/codex/issues/3141): **GPU Sandbox Access**: Long-standing request (62 👍) to enable NVIDIA GPU utilization within Linux sandboxes.
3.  [#47511](https://github.com/openai/codex/issues/47511): **Missing Git Controls**: Regression report; users are frustrated by the removal of visible Commit/Push buttons in the UI (27 👍).
4.  [#44736](https://github.com/openai/codex/issues/44736): **Windows Startup Lock**: Critical bug where project prewarming locks local mirrors, interfering with dev workflows.
5.  [#46114](https://github.com/openai/codex/issues/46114): **Elevated Sandbox Failures**: Recent regression breaking session initialization for administrative users.
6.  [#47868](https://github.com/openai/codex/issues/47868): **Node.js EPERM Errors**: Sandbox restrictions currently blocking necessary child-process spawning on Windows.
7.  [#46690](https://github.com/openai/codex/issues/46690): **Renderer Memory Leak**: Serious report of 4–7 GB memory spikes on the latest Windows build.
8.  [#47972](https://github.com/openai/codex/issues/47972): **Missing Model Support**: GPT-6 variants are absent from the Desktop picker despite being available elsewhere.
9.  [#33266](https://github.com/openai/codex/issues/33266): **MCP Cache Invalidation**: Bug causing stale tool listings when using `list_changed` notifications.
10. [#15807](https://github.com/openai/codex/issues/15807): **VS Code Multi-Window**: Ongoing limitation preventing users from spawning multiple Codex agents effectively.

## 4. Key PR Progress
*   [#47971](https://github.com/openai/codex/pull/47971): Adds support for "Pro Max" plan and updates UI labeling.
*   [#47967](https://github.com/openai/codex/pull/47967): Surfaces "Flex capacity" failures as explicit errors.
*   [#47962](https://github.com/openai/codex/pull/47962): Optimizes performance by requesting transparent huge pages for Cargo/Bazel builds.
*   [#47957](https://github.com/openai/codex/pull/47957): Implements message budget constraints for tool-call observations to prevent overrun.
*   [#47956](https://github.com/openai/codex/pull/47956): Enables file references in image edit requests.
*   [#47954](https://github.com/openai/codex/pull/47954): Improves UI by moving startup tips into the transcript, cleaning up the composer area.
*   [#47947](https://github.com/openai/codex/pull/47947): Expands root authorization context (from 8 to 16 messages).
*   [#47946](https://github.com/openai/codex/pull/47946): Adds in-memory message boards for ephemeral sessions.
*   [#47936](https://github.com/openai/codex/pull/47936): Makes MCP/Code Mode input schema budgets configurable.
*   [#47939](https://github.com/openai/codex/pull/47939): Decouples plugin identities from MCP contributions to improve architecture.

## 5. Hot Discussions
**Ideas**
*   [#47058](https://github.com/openai/codex/discussions/47058): Proposing transparent auditing for agent capabilities and instructions.
*   [#47938](https://github.com/openai/codex/discussions/47938): Requesting biometric/PIN locks for individual private projects.

**Show and Tell**
*   [#47730](https://github.com/openai/codex/discussions/47730): Introduction of `ghfs`, a tool for mounting GitHub issues as read-only files.
*   [#47782](https://github.com/openai/codex/discussions/47782): Presentation of "Vestige," an MCP-based memory system for coding agents.

**Q&A / General**
*   [#47965](https://github.com/openai/codex/discussions/47965): User report regarding three weeks of performance degradation and quota depletion.

## 6. Feature Request Trends
*   **Developer Transparency**: Strong push for better visibility into agent instructions, capability loads, and audit logs.
*   **Project Security**: Requests for granular locking mechanisms (PINs/biometrics) for specific projects.
*   **UX Streamlining**: High demand for restoring traditional Git controls and reducing UI clutter, alongside better session management in multi-window environments.

## 7. Developer Pain Points
*   **Windows Instability**: High-frequency reports of memory leaks, UI hangs, and sandbox permission errors are currently hindering Windows developers.
*   **Regressive UX Changes**: Users are particularly sensitive to UI changes that hide essential workflows (e.g., git buttons, usage metrics).
*   **Resource/Quota Frustration**: Confusion regarding "5-hour" usage windows and excessive consumption by agents during simple tasks.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

### Gemini CLI Community Digest: 2026-09-25

#### 1. Today's Highlights
The Gemini CLI development team is heavily focused on stability, with a flurry of PRs addressing file contention, race conditions, and session management. Significant effort is being directed toward refining agent reliability, specifically addressing "hanging" states and optimizing sub-agent behavior for complex coding tasks.

#### 2. Releases
*   **[v0.62.0-nightly.20260924.g8e70c862f](https://github.com/google-gemini/gemini-cli/pull/29462):** Adds checks for VS Code integration test presence and introduces a helpful progress indicator for users during connection recovery, improving overall UX during network instability.

#### 3. Hot Issues
*   [#22323](https://github.com/google-gemini/gemini-cli/issues/22323): Subagent recovery logic incorrectly reports "GOAL" success when hitting turn limits.
*   [#19873](https://github.com/google-gemini/gemini-cli/issues/19873): Large effort to leverage native bash affinity for better tool chaining and security.
*   [#21409](https://github.com/google-gemini/gemini-cli/issues/21409): Generalist agent hangs during simple tasks; high community frustration (8 thumbs up).
*   [#22745](https://github.com/google-gemini/gemini-cli/issues/22745): EPIC for AST-aware file processing to reduce token noise and improve precision.
*   [#21968](https://github.com/google-gemini/gemini-cli/issues/21968): User reports that Gemini fails to utilize custom skills and subagents autonomously.
*   [#26525](https://github.com/google-gemini/gemini-cli/issues/26525): Security concern regarding deterministic redaction of transcripts in Auto Memory.
*   [#22267](https://github.com/google-gemini/gemini-cli/issues/22267): Browser agent ignores `settings.json` overrides, specifically for `maxTurns`.
*   [#21983](https://github.com/google-gemini/gemini-cli/issues/21983): Browser subagent compatibility issues specifically on Wayland.
*   [#24246](https://github.com/google-gemini/gemini-cli/issues/24246): 400 errors when tool count exceeds 128, highlighting a need for smarter tool scoping.
*   [#22672](https://github.com/google-gemini/gemini-cli/issues/22672): Need for guardrails against destructive agent commands (e.g., `git reset --force`).

#### 4. Key PR Progress
*   [#29494](https://github.com/google-gemini/gemini-cli/pull/29494): Serializes file tool actions to prevent lost-update race conditions.
*   [#29448](https://github.com/google-gemini/gemini-cli/pull/29448): Resolves infinite auth loops on Windows/WSL and headless environments.
*   [#29451](https://github.com/google-gemini/gemini-cli/pull/29451): Bounds tool output sizes to prevent memory bloat in long-running sessions.
*   [#29482](https://github.com/google-gemini/gemini-cli/pull/29482): Introduces a "Decision Gate" to quickly route requests, potentially speeding up response times.
*   [#29487](https://github.com/google-gemini/gemini-cli/pull/29487): Fixes TUI input issues by correctly managing `stdin` flow.
*   [#29446](https://github.com/google-gemini/gemini-cli/pull/29446): Distinguishes missing MCP configs from malformed JSON to prevent silent failures.
*   [#29492](https://github.com/google-gemini/gemini-cli/pull/29492): Secures sandbox builds by avoiding shell interpolation.
*   [#29476](https://github.com/google-gemini/gemini-cli/pull/29476): Resolves UI hang on Enter keypress in integrated terminals.
*   [#29490](https://github.com/google-gemini/gemini-cli/pull/29490): Prevents duplicate tool responses when resuming sessions.
*   [#29489](https://github.com/google-gemini/gemini-cli/pull/29489): Optimizes model usage by preventing Flash-Lite models from inheriting High thinking budgets.

#### 5. Feature Request Trends
*   **Intelligent Tool/Agent Scaling:** Requests for smarter tool scope management (to avoid 400 errors) and better autonomous use of sub-agents/skills.
*   **AST-Awareness:** Moving beyond raw text/shell interactions toward semantic code understanding to improve task precision.
*   **Agent Guardrails:** Increasing interest in safety features, such as preventing destructive shell operations and better secret redaction in logs.

#### 6. Developer Pain Points
*   **Session Reliability:** Frequent complaints about agents hanging during sub-agent handoffs or when hitting configuration limits.
*   **Environment Fragility:** High sensitivity to terminal types (Wayland) and shell environments, leading to configuration and authorization loops.
*   **Memory/Resource Management:** Large agent loops are causing memory growth, leading to a push for output bounding and improved task tracking (moving away from "in-context" history).

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest: 2026-09-25

### 1. Today's Highlights
The community is currently focused on critical stability issues, specifically recurring memory exhaustion (OOM) errors affecting long-running CLI sessions and unresolved authentication persistence. Despite these challenges, recent releases have improved local session management and OAuth scope handling for MCP servers, indicating a push toward tighter integration with enterprise identity and complex workspace environments.

---

### 2. Releases
*   **v1.0.89-3:** Fixed a bug where custom answers in Ask-user forms were leaking across questions.
*   **v1.0.89-2:** 
    *   **Added:** MCP OAuth clients now properly respect configured `oauthScopes`.
    *   **Added:** New UX interaction: `Esc Esc` in an empty input now reverts a pending prompt that the model has not yet begun answering.
    *   **Improved:** Enhanced handling for sandboxed commands on supported Windows environments.

---

### 3. Hot Issues
1.  **[#4742](https://github.com/github/copilot-cli/issues/4742):** Users are unable to spawn multiple "Local" sessions within the same project. (11 comments, 5 👍)
2.  **[#4699](https://github.com/github/copilot-cli/issues/4699):** Severe V8 heap memory issues during long `--resume` sessions; crash dumps are cluttering the CWD. (6 comments, 7 👍)
3.  **[#4725](https://github.com/github/copilot-cli/issues/4725):** Linux users reporting frequent JavaScript heap OOM crashes every few minutes. (6 comments, 1 👍)
4.  **[#4851](https://github.com/github/copilot-cli/issues/4851):** Azure MCP registry validation fails with `BrokenPipe`, causing overnight regressions for enterprise users. (2 comments, 6 👍)
5.  **[#4780](https://github.com/github/copilot-cli/issues/4780):** Session compaction triggers OOM loops, rendering previously active sessions permanently unresumable. (2 comments, 3 👍)
6.  **[#4522](https://github.com/github/copilot-cli/issues/4522):** CLI forces sandbox usage in v1.0.81 even when explicitly disabled via configuration. (3 comments, 7 👍)
7.  **[#4663](https://github.com/github/copilot-cli/issues/4663):** Failed compaction requests lead to an "infinite retry" loop, causing unbounded billing and memory growth. (2 comments, 0 👍)
8.  **[#4905](https://github.com/github/copilot-cli/issues/4905):** Desktop app sessions die shortly after spawn due to "credential registration" errors, breaking the MCP catalog. (5 comments, 4 👍)
9.  **[#4929](https://github.com/github/copilot-cli/issues/4929):** Long-running processes lose auth tokens without recovery, forcing a full CLI restart to continue work. (5 comments, 0 👍)
10. **[#3534](https://github.com/github/copilot-cli/issues/3534):** WSL2 (ARM64) users report clipboard failures due to incorrect `cmd.exe` quoting in the helper path. (7 comments, 5 👍)

---

### 4. Key PR Progress
*   **[#4948](https://github.com/github/copilot-cli/pull/4948):** Updates `actions/github-script` dependency to v9.0.0 to maintain security and compatibility with GitHub Action runners.

---

### 6. Feature Request Trends
*   **Session Management:** Strong desire for a `/fork` command to handle "side-quest" queries without losing the primary session context ([#2058](https://github.com/github/copilot-cli/issues/2058)).
*   **Navigation:** Demand for a searchable history/timeline, similar to `tmux` selection mode ([#2170](https://github.com/github/copilot-cli/issues/2170)).
*   **Performance:** Move toward "sparse checkout" approaches for plugin installations to avoid full repository cloning ([#2399](https://github.com/github/copilot-cli/issues/2399)).

---

### 7. Developer Pain Points
*   **Memory Instability:** The most recurring theme is V8 heap exhaustion and "OOM loops" during compaction or long sessions, which effectively kills developer productivity.
*   **Authentication Fragility:** Users report that credential handling (specifically in the desktop app and via long-running CLI processes) is prone to silent failures that do not recover without manual intervention.
*   **Enterprise/Policy Conflicts:** Managed policies (Sandboxing, AppLocker/ConstrainedLanguage, MCP registries) are frequently cited as "brittle," where local developer overrides are ignored or system-level restrictions cause spurious errors.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest: 2026-09-25

### 1. Today's Highlights
The OpenCode ecosystem is currently focused on stabilizing the v2 architecture, with significant activity around improving model context management and fixing rendering crashes in the TUI. Developers are actively addressing configuration schema mismatches and refining permission handling for MCP tools to ensure more robust session workflows.

### 2. Releases
*No new releases in the last 24 hours.*

### 3. Hot Issues
*   **[#49057] Muse Spark 1.3 Restricted Access:** Users report being blocked from Muse Spark 1.3 via OpenCode Zen with no clear appeal path, causing significant friction for free-tier users.
*   **[#43748] V2 Config Schema Mismatch:** The published `config.json` schema rejects valid v2 fields, breaking IntelliSense and automated validation for developers.
*   **[#50843] GitLab Duo Workflow Failures:** Self-managed GitLab instances face authentication and context-loading issues with the current Duo integration.
*   **[#48743] MCP Cold-Start Bottleneck:** Users running 14+ local MCP servers report mass failures at session start; a warm-up/pre-spawn mechanism is requested to handle concurrency.
*   **[#50091] Usage Quota Reset Bug:** The free usage quota is failing to reset, locking users out of the system despite expected refresh windows.
*   **[#51087] TodoWrite TUI Crash:** Non-English locales (e.g., Thai) are causing renderer errors in the session timeline when `TodoWrite` tool calls are triggered.
*   **[#40066] Permission Check Deadlock:** Bash tool calls triggering external-directory permission checks can freeze the desktop app entirely.
*   **[#50168] UI Zoom Reset:** The desktop app fails to persist user-selected zoom levels across application restarts.
*   **[#50633] CLI Service Orphaned:** On Windows, the background `opencode-cli.exe` service fails to shut down with the UI, leading to stale configuration states.
*   **[#51223] Hidden Permission Asks:** Permission requests from MCP tools inside Code Mode are failing to render in the TUI, causing the agent to hang indefinitely.

### 4. Key PR Progress
*   **[#51245] Cache Poisoning Fix:** Bypasses the gray-matter content cache to prevent silent dropping of skills with invalid YAML.
*   **[#51242] Test Infrastructure:** Vendors `test262` test suites to stabilize the interpreter's behavior against standard JS globals.
*   **[#51240] Browser Visibility Fix:** Ensures the in-app browser view remains visible even when overlaid by menus or popovers.
*   **[#51235] Compaction Tuning:** Triggers auto-compaction at 85% of the input window, preventing excessive overhead for models with smaller context.
*   **[#51021] Context-Aware Output Limits:** Dynamically adjusts model output limits to fit the available context window.
*   **[#51237] Title Generation Optimization:** Routes session title generation to utility models (like `gpt-4o-mini`) to reduce costs and improve efficiency.
*   **[#50837] Operator Behavior:** Corrects how the interpreter handles `valueOf` and `toString` conversions for custom objects.
*   **[#51210] Watcher Stability:** Adds error handling for `fs.watch` to prevent TUI crashes on OS-level limit errors (ENOSPC).
*   **[#50619] Plugin Lifecycle:** Restores `plugin.awaitActivation` to ensure correct provider discovery before catalog loading.
*   **[#44725] Env Var Restoration:** Re-enables `OPENCODE_DISABLE_CLAUDE_CODE` to respect privacy/config preferences in v2.

### 5. Hot Discussions
*No separate discussion data provided.*

### 6. Feature Request Trends
*   **Model Control:** A strong push for granular "Hybrid" mode selection to toggle between local (Ollama) and cloud providers (Issue [#51244]).
*   **Agentic Safety:** Requests for pre-execution tool hooks and native OpenTelemetry support to audit agent actions (Issue [#51230]).
*   **TUI Polish:** Demand for collapsible reasoning bubbles and tool outputs to clean up the interface during long reasoning chains (Issue [#51229]).
*   **Extensibility:** Better plugin integration, specifically for custom provider icons (Issue [#51233]) and event publishing (Issue [#50984]).

### 7. Developer Pain Points
*   **Silent Failures:** Multiple reports of operations (skills parsing, command execution) failing without logging or user warnings.
*   **Permission Fatigue:** The current permission-gate architecture is blocking parallel tool execution and causing UI deadlocks.
*   **V1 Migration:** Issues with `project_id` handling are causing legacy session history to vanish for non-git directories.
*   **Resource Management:** Developers are struggling with background CLI processes that do not sync or shut down correctly alongside the main desktop application.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest: 2026-09-25

### Today's Highlights
The Pi ecosystem is seeing a surge in stabilization efforts, specifically focusing on TUI rendering integrity and provider-specific edge cases. A significant push towards OpenTelemetry integration is underway with the introduction of the `pi-otel` package, while critical fixes for tool-call handling and model-specific context management have been prioritized.

---

### Releases
*   **None** within the last 24 hours.

---

### Hot Issues
1.  **#10008: Process management concerns** – Users expressed frustration regarding the automated closing of bug reports (#9566), highlighting a perceived lack of developer engagement.
2.  **#9361: Windows shell resolution** – Non-deterministic `shellPath` resolution in the TUI is causing unexpected fallbacks to WSL bash, impacting local dev environments.
3.  **#9674: Mistral conversation deltas** – Zero-length deltas are causing text block issues, impacting the stability of Mistral-based workflows.
4.  **#9566: Model configuration defaults** – Users report that `models.json` settings are being overridden by hardcoded 128k context defaults, causing cost/limit mismatches.
5.  **#9508: Provider compatibility** – Pi is sending proprietary OpenAI-specific request fields to generic providers, resulting in 400/422 rejection errors.
6.  **#9255: TUI render storms** – Long transcripts trigger a "redraw storm" in `TuiMainScreen` when the thinking tail exceeds the viewport, causing UI jitter.
7.  **#9512: Compaction limits** – GPT-6 Astra reasoning steps are hitting hard token caps during context compaction, leaving summaries incomplete.
8.  **#8643: Bedrock content nesting** – OpenAI models on Bedrock require hoisting of tool-result images, a known friction point for multi-modal support.
9.  **#10025: Session teardown crashes** – A new regression in 0.87.1 causes extensions to crash during session replacement due to missing API references.
10. **#9997: Shutdown hangs** – Unresolved `session_shutdown` handlers are freezing the TUI, forcing users to kill the process manually.

---

### Key PR Progress
1.  **#10020:** Merged fix for #8896, adding UI controls to toggle hidden `CustomMessage` entries in HTML exports.
2.  **#10009:** Added `pi-otel`, a new dependency-light OTLP/HTTP exporter package for telemetry.
3.  **#9995:** Fixed a regression where tool results were dropped if an agent run was aborted mid-parallel execution.
4.  **#9988:** Coerced `read` renderer inputs to integers to prevent string concatenation bugs in file-view UI.
5.  **#9993:** Expanded the Google Vertex AI provider to include Anthropic Claude models (Opus, Sonnet, Haiku).
6.  **#9957:** Improved Kitty image rendering by refining aspect-ratio distortion handling.
7.  **#10021:** Introduced syntax highlighting for heredocs and inline scripts in bash tool calls.
8.  **#10016:** Addressed a race condition where queued follow-up messages were lost when an agent run was aborted.
9.  **#9714:** Ongoing work to support Azure Foundry deployments, specifically for Chat Completions.
10. **#8398:** Merged extensive TUI refactor to support dynamic theme styling and color values.

---

### Feature Request Trends
*   **Telemetry/Observability:** High interest in standardizing logs and spans via OTLP (#10006, #10009).
*   **Provider Extensibility:** Strong push to move away from OpenAI-centric request structures to support a wider array of generic and "Foundry-style" providers.
*   **Agent Control:** Demand for more granular control over agent lifecycle events and state serialization, specifically for local agent orchestration (#10001).

---

### Developer Pain Points
*   **"Auto-close" Fatigue:** Users feel that bug reports are being closed by bots without adequate human triage, leading to community friction.
*   **Fragile UI/TUI:** Recurring issues with "render storms" and clipboard/image handling on specific terminal emulators (e.g., X11/Wezterm) remain a persistent source of friction.
*   **Environment Inconsistency:** Windows users are consistently hitting path resolution and shell integration bugs, making cross-platform parity difficult for contributors.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest | 2026-09-25

## 1. Today's Highlights
The Qwen Code ecosystem is currently focused on stabilizing the transition to the new **Managed Agent architecture** and addressing critical stability bugs within the Windows and CLI environments. Recent activity centers on decoupling session-management logic and hardening the daemon’s interaction with VS Code and local system resources.

## 2. Releases
* **v0.24.5 / Desktop v0.24.5:** Includes general stability improvements, specifically preserving diagnostic data for session creation failures.
* **SDK TypeScript v0.1.15:** Bundles CLI v0.24.5; updates align SDK behavior with recent core daemon changes.

## 3. Hot Issues
1. **[#11303] Windows ConPTY Leaks:** Users report massive memory consumption (~2.8 GB) due to unreleased `conhost.exe` processes in the VS Code extension.
2. **[#12380] Managed Agent Architecture:** A major proposal to define a dual-path agent system with durable session ownership and independent tool environments.
3. **[#11500] TUI React Crashes:** The interactive terminal is suffering from recursive React update loops (#185) during complex multi-agent workflows.
4. **[#11872] macOS PTY Errors:** Web Terminal fails due to packaging issues with `@lydell/node-pty` and macOS code signing conflicts.
5. **[#11119] Background Shell Silent Failure:** Output and notifications are dropped during session runtime recycling, causing "zombie" sessions.
6. **[#8596] Desktop App Deprecation:** Community push to formally deprecate the aging Electron app in favor of the Tauri-based `desktop-shell`.
7. **[#12416] Remote-SSH EPIPE Errors:** Users report connection bridging failures in v0.24.2 that do not occur in standalone mode.
8. **[#12381] Session Create Gateway Timeouts:** Proposes a recovery mechanism for session IDs lost during HTTP intermediary timeouts.
9. **[#12589] System One Decision Gate:** Feature request for a "superfast" lightweight model to handle trivial classification tasks before triggering the full System Two LLM.
10. **[#12628] Multi-Root Workspace Support:** The daemon currently binds only to the primary folder; users need support for VS Code multi-root workspaces.

## 4. Key PR Progress
1. **[#12653] Desktop Renaming:** Formalizing the shift from `desktop-shell` to `packages/desktop`.
2. **[#12358] Managed Agent Stack:** Introduces the foundational Java control plane and standalone Spring-based harness.
3. **[#12621] Claude Thinking Preservation:** Ensures signed thinking blocks and trailing whitespace are maintained for Opus/Fable models.
4. **[#12183] Managed Extensions:** Adds `--managed-extensions` support for cleaner, deployment-managed plugin discovery.
5. **[#12666] Linux Clipboard Feedback:** Fixes silent failures when `wl-paste`/`xclip` tools are present but encounter execution errors.
6. **[#12649] ARM64 Prebuilds:** Pins `node-pty-linux-arm64` and adds fatal gates to prevent unbuildable releases.
7. **[#12626] Live Chat UX:** Improves session transitions by allowing fallbacks to plain drafts when starting "New tasks."
8. **[#12562] MCP Robustness:** Fixes JSON-RPC `-32601` handling to prevent tools from incorrectly marking servers as "Disconnected."
9. **[#11794] Stateless Language Enforcement:** Ensures generated code respects `general.outputLanguage` settings.
10. **[#12636] Sidebar Deletion:** Enables users to delete the currently active session directly from the UI.

## 5. Feature Request Trends
* **Agent Efficiency:** High interest in "System One" decision gates to save tokens and latency (#12589).
* **Workspace Flexibility:** Strong demand for multi-root workspace support to handle complex development environments (#12628).
* **Architecture Modernization:** A clear trend toward moving logic out of Electron/TS loops into a hardened, managed backend (daemon/Java).

## 6. Developer Pain Points
* **Silent Failures:** Multiple reports of silent failures (Clipboard, TUI crashes, Shell drops) make debugging difficult for power users.
* **Session Lifecycle:** The current daemon-based session management struggles with connectivity timeouts and unexpected recycles, leading to "wedged" sessions.
* **Environment Sensitivity:** Packaging issues (PTY prebuilds) and OS-specific bugs (Windows ConPTY, macOS signing) remain the primary inhibitors for stable integration.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/jinming1345/agents-radar).*