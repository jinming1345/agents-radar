# AI CLI Tools Community Digest 2026-09-22

> Generated: 2026-09-22 06:53 UTC | Tools covered: 7

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

## Cross-Tool Analysis: AI CLI Ecosystem (2026-09-22)

### 1. Ecosystem Overview
The AI CLI ecosystem has shifted from "proof of concept" to a phase of aggressive infrastructure hardening and architectural stabilization. Developers are increasingly moving away from basic chat-based LLM interactions toward complex agentic workflows, placing significant strain on local system resources, authentication middleware, and context-management logic. The primary challenge across all platforms is the "Compaction-Stability Paradox," where necessary efforts to prune context window bloat are frequently causing unintended state loss, data corruption, and agent amnesia.

### 2. Activity Comparison
*Note: Data reflects current open issue/PR trends based on the provided digest.*

| Tool | Hot Issues | Key PRs | Discussions | Release Status |
| :--- | :---: | :---: | :---: | :--- |
| **Claude Code** | 10 | 2 | N/A | Stable (No 24h update) |
| **OpenAI Codex** | 10 | 11 | 2 | High Activity (Alpha) |
| **Gemini CLI** | 10 | 10 | N/A | Active (Nightly) |
| **GitHub Copilot**| 10 | 2 | N/A | Active (v1.0.88) |
| **OpenCode** | 10 | 10 | N/A | Active (v1.18) |
| **Pi** | 10 | 10 | 1 | Active (v0.87) |
| **Qwen Code** | 10 | 10 | N/A | Active (v0.24) |

### 3. Shared Feature Directions
*   **Context Management & Compaction:** Claude Code, OpenCode, and Pi are all struggling with the side effects of context-compaction algorithms. Users across these platforms are demanding more transparency or manual control over how agent memory is pruned.
*   **Agent Determinism:** Qwen Code, Gemini, and OpenAI Codex are prioritizing "Workflow Hardening." The industry is moving toward separating complex "skills" (like code review) from the core LLM reasoning loop to ensure reproducible results.
*   **Terminal & UI Integration:** There is a convergence on TUI performance (Pi, Qwen, OpenCode, GitHub) as users transition from simple CLI tools to full "terminal-native" IDE replacements.

### 4. Differentiation Analysis
*   **Claude Code:** Focuses on the "Agent-as-a-Coworker" model, emphasizing native file system interaction and `CLAUDE.md` guardrails.
*   **OpenAI Codex:** Leads in rapid infrastructure iteration and enterprise-facing features like MITM proxy support and custom CA configurations.
*   **Gemini CLI:** Positions itself as a highly technical, security-conscious tool, with focus on AST-aware mapping and robust Agent-Client Protocols (ACP).
*   **Qwen Code:** Differentiates through its "Web Shell" architecture, attempting to bridge the gap between browser-based accessibility and terminal-based power.
*   **OpenCode:** Targets the local-model enthusiast, with a heavy emphasis on multi-provider support (Groq, Mistral, Together AI).

### 5. Community Momentum & Maturity
*   **Highest Iteration Speed:** **OpenAI Codex** and **Qwen Code** demonstrate the most aggressive release cycles, indicating high institutional backing and rapid development velocity.
*   **Most Mature/Stable:** **Claude Code** (despite current regressions) remains the benchmark for feature depth, though it is currently suffering from technical debt related to its compaction logic.
*   **Emerging Strength:** **Gemini CLI** displays a high level of technical rigor in its PRs, specifically around sandboxing and security, making it a favorite for enterprise or security-focused engineering teams.

### 6. Trend Signals
*   **The "Agentic Cost" Crisis:** Across all tools, token burn and "usage limit" transparency are the most prominent user complaints. Developers are pivoting to "sub-agenting" (using smaller models for routine tasks) to optimize performance.
*   **Authentication Fatigue:** The industry is hitting a wall with OAuth and agent-permission lifecycles. Users are demanding "Persistent Grant" models that don't require full process restarts when tokens expire.
*   **OS Disparity:** Windows and macOS desktop environments are becoming the "graveyard of stability." Cross-platform IPC (Inter-Process Communication) and sandbox regressions are the primary causes of negative user sentiment. Decision-makers should prioritize tools with "headless/SSH-first" workflows to avoid these GUI-layer bottlenecks.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

This report provides a technical analysis of the `anthropics/skills` ecosystem as of September 22, 2026. The community is currently transitioning from basic utility-focused skills toward high-complexity, specialized agentic workflows.

### 1. Top Skills Ranking (by Activity & Impact)
These contributions represent the most significant developmental efforts currently under review:

*   **[AWT (AI Watch Tester) (#822)](https://github.com/anthropics/skills/pull/822)**: A vision-enabled, browser-based E2E testing framework. It represents the gold standard for "zero-code" testing, allowing Claude to perform visual regression testing and browser interactions. Status: *Open*.
*   **[skill-creator (#1298, #1769)](https://github.com/anthropics/skills/pull/1298)**: Meta-tooling designed to standardize skill development. Current focus is on fixing trigger evaluation logic to prevent "false misses" and Windows-specific runtime failures. Status: *Open*.
*   **[proofcore-contract-auditor (#1771)](https://github.com/anthropics/skills/pull/1771)**: A specialized Web3 security skill for static analysis of Solidity/Rust smart contracts with cryptographic proof anchoring. Status: *Open*.
*   **[pyxel-retro-game-dev (#525)](https://github.com/anthropics/skills/pull/525)**: A development environment skill that enables Claude to perform headless input-driven runs and frame inspection for Python retro-gaming. Status: *Open*.
*   **[mcp-builder (#1742)](https://github.com/anthropics/skills/pull/1742)**: Infrastructure-level maintenance to support `mcp>=2.0` syntax, ensuring compatibility with evolving Model Context Protocol standards. Status: *Open*.

### 2. Community Demand Trends
Analysis of community issues indicates three primary areas of demand:
*   **Reliability & Governance:** Significant concern regarding "Trust Boundary Abuse" (#492)—users are wary of community-made skills being distributed under official namespaces. 
*   **Context Management:** Developers are hitting hard limits with "token-heavy" skills (#1487), leading to requests for more efficient, modular memory patterns like `compact-memory` (#1329).
*   **Enterprise Integration:** Strong demand for organizational-wide sharing mechanisms (#228) and integration with existing corporate silos (e.g., SharePoint Online #1175).

### 3. High-Potential Pending Skills
These PRs are active and address critical functional gaps in the current library:
*   **[blast-radius (#1776)](https://github.com/anthropics/skills/pull/1776)**: A risk-mitigation skill that forces a "safety checkpoint" for destructive database/bulk operations—a highly requested feature for enterprise reliability.
*   **[md2video-audio (#1703)](https://github.com/anthropics/skills/pull/1703)**: A generative media skill designed to automate the conversion of technical documentation into professional-grade presentation content.
*   **[testing-patterns (#723)](https://github.com/anthropics/skills/pull/723)**: A pedagogical/functional hybrid skill designed to standardize unit and React component testing practices within agent sessions.

### 4. Skills Ecosystem Insight
**Summary:** The community is pivoting away from simple text-generation helpers toward **robust, state-aware "Agent Governors"**—skills that prioritize safety gates, context efficiency, and strict reliability for enterprise-grade autonomous workflows.

---

# Claude Code Community Digest – 2026-09-22

## 1. Today's Highlights
The developer community is currently focused on critical stability issues, including severe memory leaks on macOS and persistent data loss concerns regarding session transcripts. Additionally, widespread user reports indicate a decline in model coherence across the Claude 4/5 series, with users noting repetitive "rhetorical tics" and failures to follow style instructions.

## 2. Releases
*No new releases in the last 24 hours.*

## 3. Hot Issues
1.  **[#77136](https://github.com/anthropics/claude-code/issues/77136): Model Degradation** – 437 thumbs-up; users report Claude 4.7-5.0 and Fable are becoming increasingly repetitive and struggling with basic prose instructions.
2.  **[#59248](https://github.com/anthropics/claude-code/issues/59248): Data Loss** – Silent cleanup processes are deleting workspace transcripts without warning, causing significant loss of historical context.
3.  **[#66020](https://github.com/anthropics/claude-code/issues/66020): Memory Leak** – Critical macOS kernel zone leak (`data.kalloc.1024`) leading to CLI crashes at ~20GB usage; high priority for power users.
4.  **[#6354](https://github.com/anthropics/claude-code/issues/6354): CLAUDE.md Amnesia** – Compaction logic continues to strip vital instructions from `CLAUDE.md`, effectively resetting project-specific guardrails.
5.  **[#33041](https://github.com/anthropics/claude-code/issues/33041): Remote Control Instability** – The `/remote-control` feature suffers from frequent, unprompted disconnections, hampering remote workflows.
6.  **[#92215](https://github.com/anthropics/claude-code/issues/92215): Claude Design MCP 403s** – Authentication flows for design-scoped tokens appear broken, with confusing error messages pointing to non-existent commands.
7.  **[#75759](https://github.com/anthropics/claude-code/issues/75759): Context Compaction Failure** – Mid-session compaction is causing the agent to "forget" actions performed earlier in the same active session on Windows/Bedrock.
8.  **[#95969](https://github.com/anthropics/claude-code/issues/95969): Bash Security Bypass** – Permission rules are "quote-blind," allowing shell operators inside quoted strings to bypass safety prompts.
9.  **[#95966](https://github.com/anthropics/claude-code/issues/95966): Scheduled Task Failures** – Desktop scheduled tasks are silently failing to trigger despite the host system being fully active.
10. **[#92601](https://github.com/anthropics/claude-code/issues/92601): Plugin Hook Loops** – Security-guidance hooks failing with `ENOENT` are causing infinite retry loops, flooding session logs.

## 4. Key PR Progress
*   **[#95423](https://github.com/anthropics/claude-code/pull/95423): Diff Tool Optimization** – Prevents unnecessary diff refetches when performing read-only shell commands, significantly reducing redundant I/O and latency.
*   **[#95932](https://github.com/anthropics/claude-code/pull/95932): GitHub Integration Support** – Standardizes issue reporting for GitHub connection problems on `claude.ai`, streamlining support intake.

## 5. Feature Request Trends
*   **Granular Control:** Increasing demand for per-task model selection within background chips ([#70610](https://github.com/anthropics/claude-code/issues/70610)).
*   **Network Management:** Requests for persistent grant permissions for private-network hosts within the browser pane ([#90305](https://github.com/anthropics/claude-code/issues/90305)).

## 6. Developer Pain Points
*   **Compaction Aggression:** The "Context Compaction" feature is widely cited as the root cause for lost state and project instruction amnesia across multiple OS platforms.
*   **Tool/Permission Frustrations:** Developers are finding existing permission models (especially regarding Bash) either too brittle or easily bypassed by clever shell quoting.
*   **Windows Ecosystem Lag:** Discrepancies between npm version checks and `winget` manifests are causing "Update Available" banners to persist incorrectly, and Windows-specific hangs are becoming a recurring theme.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest: 2026-09-22

## 1. Today's Highlights
Development activity today focused heavily on stabilizing the **GPT-6-Astra** and **GPT-5.6-Luna** deployment cycle, with significant infrastructure PRs landing to resolve auth, proxy routing, and agent lifecycle management. A wave of community reports highlights growing frustration with "at capacity" errors and unexpected token consumption, signaling that recent model performance optimizations are struggling to meet the demands of heavy, long-running agent workflows.

## 2. Releases
*   **rust-v0.157.0-alpha.1 – alpha.6**: A rapid succession of alpha releases focused on refining the CLI backend and preparing the codebase for the upcoming stability milestone, following the recent architectural cleanup of the `exec-server`.

## 3. Hot Issues
1.  [#13733](https://github.com/openai/codex/issues/13733): **Token Burn via Polling**: Background processes trigger full-history API calls. Critical for cost management. (42 comments)
2.  [#45119](https://github.com/openai/codex/issues/45119): **macOS Sandbox Failures**: `TIOCSTI` unbound variable issue on Apple Silicon. (23 comments)
3.  [#45317](https://github.com/openai/codex/issues/45317): **Chrome Auth Regression**: Browser integration failing due to rejection of API-key authentication. (15 comments)
4.  [#40067](https://github.com/openai/codex/issues/40067): **Usage Accounting Regression**: Plus users reporting "weekly usage drained" in hours. (10 comments)
5.  [#41466](https://github.com/openai/codex/issues/41466): **Safety Check Overreach**: Cybersecurity warnings triggering on routine OSS code reviews. (8 comments)
6.  [#19192](https://github.com/openai/codex/issues/19192): **Model Selector Broken**: Regression blocking model switching on new chats. (6 comments)
7.  [#47210](https://github.com/openai/codex/issues/47210): **"At Capacity" Loop**: IDE extension persistent outage for Pro users. (3 comments)
8.  [#46901](https://github.com/openai/codex/issues/46901): **Quota Exhaustion**: High-frequency complaints about rapid quota burn in CLI. (3 comments)
9.  [#46644](https://github.com/openai/codex/issues/46644): **Windows Desktop Crashes**: `chrome.dll` segmentation faults in the desktop app. (3 comments)
10. [#47177](https://github.com/openai/codex/issues/47177): **Model Visibility**: `GPT-5.6-Luna` missing from UI dropdown despite being usable via config. (2 comments)

## 4. Key PR Progress
*   [#47179](https://github.com/openai/codex/pull/47179): **Default Daemon Startup**: Promoted `daemon_auto_start` to stable; simplifies CLI lifecycle.
*   [#47178](https://github.com/openai/codex/pull/47178): **Fullscreen Transcript**: Defaulted to `true` for improved TUI readability.
*   [#47143](https://github.com/openai/codex/pull/47143): **Modularized Exec-Server**: Improved maintainability by extracting CLI startup logic.
*   [#47132](https://github.com/openai/codex/pull/47132): **MITM Proxy Support**: Added custom CA support for enterprise network environments.
*   [#47191](https://github.com/openai/codex/pull/47191): **Math Rendering**: Enhanced TUI support for aligned equations and LaTeX.
*   [#47170](https://github.com/openai/codex/pull/47170): **Gateway Login Control**: New auth status APIs for finer-grained control over browser-based OAuth.
*   [#47204](https://github.com/openai/codex/pull/47204): **Proxy Redirects**: Fixed route resolution for standalone web search.
*   [#47162](https://github.com/openai/codex/pull/47162): **Workspace Routing**: Ensured classifier requests respect thread-specific workspace bounds.
*   [#47155](https://github.com/openai/codex/pull/47155): **Stale Notification Fix**: Ignores thread-close events that arrive after a thread has already been resumed.
*   [#47212](https://github.com/openai/codex/pull/47212): **MCP Trace Preservation**: Ensures telemetry context persists across worker boundaries.

## 5. Hot Discussions
*   **Ideas**
    *   [#9200](https://github.com/openai/codex/discussions/9200): Remote control Codex daemon from mobile/external apps.
    *   [#40291](https://github.com/openai/codex/discussions/40291): Demand for a high-usage "fair use" unlimited individual tier.
*   **Show and Tell**
    *   [#47107](https://github.com/openai/codex/discussions/47107): "Sarge" — enforcing hard rules instead of advisory instructions.
    *   [#47057](https://github.com/openai/codex/discussions/47057): Using smaller models as sub-agents to slash token costs by 94%.
    *   [#47027](https://github.com/openai/codex/discussions/47027): Per-pane Codex status line for WezTerm users.

## 6. Feature Request Trends
*   **Agent Autonomy & Persistence**: Strong demand for persistent, event-driven background task execution that avoids repeated polling tokens.
*   **UX Transparency**: Users want auditable logs for agent instructions, tool capabilities, and performance metrics (e.g., [#47058](https://github.com/openai/codex/discussions/47058)).
*   **TUI/CLI Convergence**: Requests to parity features between CLI and Claude Code (e.g., `/recap`, fullscreen modes).

## 7. Developer Pain Points
*   **Cost Predictability**: Significant frustration with "black box" token usage and "usage limit reached" errors that don't align with observed dashboard metrics.
*   **Reliability Regressions**: Frequent breaking of core UI elements (model pickers, authentication) following rapid release cycles.
*   **Platform Fragility**: Windows and macOS desktop applications are struggling with stability (crashes and sandbox issues), leading to loss of trust in the desktop client's reliability for heavy workflows.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest | 2026-09-22

## 1. Today's Highlights
Development efforts remain heavily focused on improving agent stability and security, specifically addressing subagent hangs and environment-specific configuration errors. The core team is prioritizing the reliability of the Agent-Client Protocol (ACP) and hardening the tool execution pipeline to ensure atomic file operations.

## 2. Releases
*   **v0.62.0-nightly.20260922.gd5b3e3acc**: Includes critical fixes for proxy-agent esbuild interoperability and ensures `tool_call` updates are emitted before permission requests in ACP mode. [View Release](https://github.com/google-gemini/gemini-cli/pull/29401)

## 3. Hot Issues
1.  [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) **Subagent Recovery**: Incorrect reporting of "GOAL" success after hitting `MAX_TURNS`.
2.  [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) **Generalist Agent Hangs**: Critical bug causing indefinite hangs; users currently forced to disable sub-agents.
3.  [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) **Bash Affinity**: Enhancing agent capability to use native POSIX tools for safer codebase exploration.
4.  [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) **AST-Awareness**: Investigating AST-aware file mapping to reduce token noise and improve precision.
5.  [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) **Wayland Failure**: The browser subagent fails on Wayland displays; requires cross-platform UI resolution.
6.  [#26525](https://github.com/google-gemini/gemini-cli/issues/26525) **Auto Memory Redaction**: Security concern regarding secret leakage in Auto Memory logs.
7.  [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) **400 Tool Error**: Agents fail when scope exceeds 128 tools; highlights a need for smarter tool pruning.
8.  [#26522](https://github.com/google-gemini/gemini-cli/issues/26522) **Auto Memory Loops**: Inefficient retries on low-signal sessions causing unnecessary compute costs.
9.  [#21335](https://github.com/google-gemini/gemini-cli/issues/21335) **Persistent State**: The `/compress` command fails to persist summaries across session resumes.
10. [#20079](https://github.com/google-gemini/gemini-cli/issues/20079) **Symlink Recognition**: Subagents stored as symlinks in `~/.gemini/agents/` are ignored.

## 4. Key PR Progress
1.  [#29440](https://github.com/google-gemini/gemini-cli/pull/29440) **Web-Fetch**: Proper UTF-8 offset handling for citations in non-ASCII responses.
2.  [#29244](https://github.com/google-gemini/gemini-cli/pull/29244) **Atomic Writes**: Serializing same-path tool writes to prevent silent data loss during parallel execution.
3.  [#29336](https://github.com/google-gemini/gemini-cli/pull/29336) **Policy Security**: Hardening non-system policy directories against insecure write permissions.
4.  [#29332](https://github.com/google-gemini/gemini-cli/pull/29332) **Sandbox Guard**: Bound excessive sandbox expansion loops during tool execution.
5.  [#29328](https://github.com/google-gemini/gemini-cli/pull/29328) **A2A Security**: Preventing credential leakage in logs and properly honoring `LOG_LEVEL`.
6.  [#29327](https://github.com/google-gemini/gemini-cli/pull/29327) **SDK Options**: Ensuring `AgentShellOptions` (env/timeout) are correctly applied.
7.  [#29324](https://github.com/google-gemini/gemini-cli/pull/29324) **GitIgnore Fixes**: Correcting anchor patterns for nested `.gitignore` files.
8.  [#29330](https://github.com/google-gemini/gemini-cli/pull/29330) **Input Handling**: Addressing purity violations in message state updates.
9.  [#29329](https://github.com/google-gemini/gemini-cli/pull/29329) **Stdin Logic**: Preventing irreversible stdin destruction during stream truncation.
10. [#28422](https://github.com/google-gemini/gemini-cli/pull/28422) **Extension Integrity**: Improving robustness by resolving extension references to concrete commit SHAs.

## 5. Feature Request Trends
*   **Agent Self-Awareness**: A consistent demand for the CLI to "know its own mechanics," enabling better guidance on flags and hotkeys.
*   **Tooling Transparency**: Developers want shared subagent trajectories (via `/chat share`) and better visibility into agent decision-making.
*   **Task Management**: Experimentation with native file tools for tracking tasks instead of relying solely on LLM context.

## 6. Developer Pain Points
*   **Stability/Hangs**: The primary friction point is the "Generalist Agent" freezing, significantly disrupting development workflows.
*   **Context Bloat**: Developers are hitting token limits, driving the need for "Tactful Extraction" and smarter tool-limiting.
*   **Terminal/Shell UI**: Persistent issues with terminal resize flicker and shell mode interactions (e.g., leftover `@` symbols) impact the polish of the developer experience.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

## GitHub Copilot CLI Community Digest: 2026-09-22

### 1. Today's Highlights
The latest releases (v1.0.88-0/1) focus heavily on improving terminal integration, specifically introducing optional OSC 777 notifications for Ghostty and WezTerm users. Infrastructure hardening continues with better handling of managed-settings refreshes and sandboxed network denials for proxy tunnel failures.

### 2. Releases
*   **v1.0.88-1:** Fixed critical managed-settings refresh logic for `/allow-all` and improved sandboxing for network failures. [View Release](https://github.com/github/copilot-cli/releases/tag/v1.0.88-1)
*   **v1.0.88-0:** Added OSC 777 terminal notifications and enhanced MCP/plugin status visibility. [View Release](https://github.com/github/copilot-cli/releases/tag/v1.0.88-0)
*   **v1.0.87:** Introduced Auto routing tier defaults and improved chat editing workflows (Up-arrow to edit). [View Release](https://github.com/github/copilot-cli/releases/tag/v1.0.87)

### 3. Hot Issues
1.  **#4505:** [Resumed sessions failing](https://github.com/github/copilot-cli/issues/4505) due to stale connection IDs; impacts workflow continuity.
2.  **#4892:** [Memory/Process usage](https://github.com/github/copilot-cli/issues/4892) concerns regarding hourly re-enumeration of MCP servers.
3.  **#4844:** `--yolo` flag being [swallowed by pre-auth failures](https://github.com/github/copilot-cli/issues/4844), blocking dev productivity.
4.  **#4837:** Policy-driven [plugins failing to activate](https://github.com/github/copilot-cli/issues/4837) despite successful installation.
5.  **#1571:** [Context loss](https://github.com/github/copilot-cli/issues/1571) after session compaction events.
6.  **#4929:** [Auth token refresh failure](https://github.com/github/copilot-cli/issues/4929) requiring a full process restart to recover.
7.  **#4705:** [Queued prompts hanging](https://github.com/github/copilot-cli/issues/4705) when the session becomes idle.
8.  **#4924:** [Missing custom agents](https://github.com/github/copilot-cli/issues/4924) in new worktree sessions due to race conditions.
9.  **#3704:** [RTL text support](https://github.com/github/copilot-cli/issues/3704) (Hebrew/Arabic) remains a significant accessibility gap.
10. **#3385:** Legacy [WSL stability](https://github.com/github/copilot-cli/issues/3385) issues post-upgrade, highlighting environment-specific fragility.

### 4. Key PR Progress
*   **#4739:** [Docs: Terminal Notifications](https://github.com/github/copilot-cli/pull/4739) - Proposes a standardized approach for notification handling.
*   **#4770:** [WebSocket Opt-out](https://github.com/github/copilot-cli/pull/4770) - Documents an escape hatch for users experiencing transport-related 400 errors.

*(Note: Only two PRs were active in the provided data window.)*

### 5. Feature Request Trends
*   **Granular Control:** Increasing demand for repo-level and user-level override policies for tools and plugins (e.g., #1971, #2727).
*   **Workflow Flexibility:** Significant interest in session management, specifically "branching" sessions to preserve history (#1313).
*   **Configuration transparency:** Users want better support for standard Unix patterns, such as symlinking configuration files (#3264).

### 6. Developer Pain Points
*   **Authentication Fragility:** Users frequently report "lost" authentication states that require full application restarts to resolve.
*   **Session State:** Persistence issues (stale IDs after interruption, context loss after compaction) are the primary blockers for reliable long-term chat sessions.
*   **MCP Protocol churn:** Rapid updates to the MCP protocol are causing compatibility issues, particularly with dual-era/legacy SDK support (#4888, #4211).
*   **Environment Race Conditions:** New worktrees and rapid session startups often result in missing agents or stale configuration scans.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest: 2026-09-22

The OpenCode ecosystem is currently focused on stabilizing the v2 architecture while addressing high-impact regressions in the Desktop and TUI environments. Key activity today centered on resolving Windows IPC failures, refining MCP authorization flows, and improving the developer experience through new experimental evaluation APIs.

---

### Releases
*   **[v1.18.32](https://github.com/anomalyco/opencode/releases/tag/v1.18.32):** Includes critical fixes for Bedrock image attachment hoisting and Together AI streaming usage reporting. Community contributions added support for DeepSeek V4.1 Flash and Grok 4.7.

---

### Hot Issues
1.  **[#6231: Auto-discover models](https://github.com/anomalyco/opencode/issues/6231)** (57 comments): The top request for local provider usability; manual config is increasingly seen as a barrier to entry.
2.  **[#5374: Show tokens/sec](https://github.com/anomalyco/opencode/issues/5374)** (23 comments): Highly anticipated feature for benchmarking LLM performance across providers.
3.  **[#48958: UI usability concerns](https://github.com/anomalyco/opencode/issues/48958)** (9 comments): Users are reporting friction with the new v2 layout, specifically regarding workflow multitasking.
4.  **[#41358: Auto-compaction bugs](https://github.com/anomalyco/opencode/issues/41358)** (9 comments): Critical report of agents losing context/goals during auto-compaction sessions.
5.  **[#50153: Windows Desktop IPC failure](https://github.com/anomalyco/opencode/issues/50153)** (5 comments): Significant blocker preventing Windows users from using the file/image picker.
6.  **[#41696: Background server startup](https://github.com/anomalyco/opencode/issues/41696)** (7 comments): Reports of the v2 managed service hanging without clear error messaging.
7.  **[#50458: Bash tool data corruption](https://github.com/anomalyco/opencode/issues/50458)** (4 comments): Serious data integrity issue regarding multi-byte character handling on Windows.
8.  **[#49982: Plugin reload failures](https://github.com/anomalyco/opencode/issues/49982)** (4 comments): Config changes in the background service result in silent loss of custom agents.
9.  **[#50513: CLI model output readability](https://github.com/anomalyco/opencode/issues/50513)** (2 comments): Developer frustration with verbose JSON dumping for basic model listings.
10. **[#50502: Go endpoint 503 errors](https://github.com/anomalyco/opencode/issues/50502)** (2 comments): Reports of API availability discrepancies between `messages` and `chat/completions` endpoints.

---

### Key PR Progress
1.  **[#50506](https://github.com/anomalyco/opencode/pull/50506):** Adds an experimental, type-safe evaluation API for automated model testing.
2.  **[#50525](https://github.com/anomalyco/opencode/pull/50525):** Refines TUI themes, fixing contrast issues and adding official light mode support.
3.  **[#50519](https://github.com/anomalyco/opencode/pull/50519):** Fixes forced consent prompts during MCP OAuth logins to improve UX.
4.  **[#50522](https://github.com/anomalyco/opencode/pull/50522):** Formats `opencode models --verbose` into a readable table rather than raw JSON.
5.  **[#50333](https://github.com/anomalyco/opencode/pull/50333):** Resolves the Windows file-picker crash by fixing IPC payload schema handling.
6.  **[#50532](https://github.com/anomalyco/opencode/pull/50532):** Fixes TUI model search to prioritize relevance over release date.
7.  **[#49750](https://github.com/anomalyco/opencode/pull/49750):** Introduces `/btw` side-question panel for transient, one-shot agent interactions.
8.  **[#50524](https://github.com/anomalyco/opencode/pull/50524):** Improves TUI lifecycle by clearing session tabs during fresh starts.
9.  **[#49689](https://github.com/anomalyco/opencode/pull/49689):** Bumps Mistral SDK to fix breakage in streamed tool calls.
10. **[#50526](https://github.com/anomalyco/opencode/pull/50526):** Prevents accidental file attachment from simple `@mentions` in comments.

---

### Feature Request Trends
*   **Observability:** Strong desire for transparent token/second reporting and cleaner CLI/TUI model visibility.
*   **Local-First Experience:** Users are pushing for automated model discovery and easier management of local provider endpoints.
*   **Refinement of v2 UI:** A focus on accessibility (light mode, theme consistency) and restoring efficient, multi-tasking workflows lost in the recent transition.

---

### Developer Pain Points
*   **Windows Stability:** High incidence of IPC-related crashes and data pipe corruption in the v2 desktop/TUI environment.
*   **Authentication Fatigue:** Recurring issues with MCP OAuth token persistence and forced re-authentication prompts.
*   **Compaction Reliability:** Concern over the "black box" nature of context compaction, which can lead to silent context loss or agent confusion during long-running tasks.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest: 2026-09-22

## 1. Today's Highlights
The community is focused on stabilizing the 0.86.x release cycle, with significant fixes rolling out for Codex-related tool call leakage and RPC input handling. Developers are also improving the robustness of the TUI and agent harness, ensuring that `PI_OFFLINE` modes and compaction logic handle edge cases—like malformed headers and missing tool states—more gracefully.

## 2. Releases
*   **v0.87.0**: Introduces "Canonical session context" and new extension lifecycle hooks via `ContextEditEntry`, allowing for more granular control over model context without requiring a full history rewrite. [View Release](https://github.com/earendil-works/pi/blob/v0.87.0/packages/coding-agent/docs/session-format.md#contexteditentry)

## 3. Hot Issues
1.  [#7730](https://github.com/earendil-works/pi/issues/7730): High CPU usage on Mac OS; heavily debated (17 comments) as users correlate it to session length.
2.  [#8684](https://github.com/earendil-works/pi/issues/8684): `PI_OFFLINE` erroneously kills model discovery; users frustrated by undocumented side effects.
3.  [#9803](https://github.com/earendil-works/pi/issues/9803): Regression in RPC steer correlation; critical for extension developers relying on input handling.
4.  [#9571](https://github.com/earendil-works/pi/issues/9571): Tight loop retry bug on malformed 429 headers; impacts provider reliability.
5.  [#9602](https://github.com/earendil-works/pi/issues/9602): Compaction overflow issue where "thinking" messages break token limits.
6.  [#9549](https://github.com/earendil-works/pi/issues/9549): Fullscreen TUI performance bottleneck on Windows; causes 1-core saturation due to re-renders.
7.  [#9822](https://github.com/earendil-works/pi/issues/9822): Tool calls leaking as raw text; severe bug affecting `openai-codex` users.
8.  [#9255](https://github.com/earendil-works/pi/issues/9255): TUI rendering "storm" on long transcripts causing visual glitches.
9.  [#9674](https://github.com/earendil-works/pi/issues/9674): Empty content deltas causing issues with Mistral-conversations.
10. [#9784](https://github.com/earendil-works/pi/issues/9784): Meta-issue requesting support for vendor-specific response fields in the Extension API.

## 4. Key PR Progress
1.  [#9878](https://github.com/earendil-works/pi/pull/9878): Aligning Codex protocols for better cross-platform compatibility.
2.  [#9869](https://github.com/earendil-works/pi/pull/9869): Fixes Mistral stream parsing to prevent empty text block creation.
3.  [#9866](https://github.com/earendil-works/pi/pull/9866): Security/Reliability fix: validates persisted tool arguments before replay.
4.  [#9861](https://github.com/earendil-works/pi/pull/9861): Respects Google `429` retry-after headers, preventing aggressive backoff failure.
5.  [#9859](https://github.com/earendil-works/pi/pull/9859): Adds `Grok 4.7` support via xAI Responses.
6.  [#9851](https://github.com/earendil-works/pi/pull/9851): Cleans up Bedrock catalog by removing unsupported bare Anthropic model IDs.
7.  [#9846](https://github.com/earendil-works/pi/pull/9846): Ensures prompt/tool state persistence across context handlers.
8.  [#9842](https://github.com/earendil-works/pi/pull/9842): Fixes TUI visual shifting when scrollbars appear/disappear.
9.  [#9832](https://github.com/earendil-works/pi/pull/9832): Implements explicit disposition reporting for RPC inputs.
10. [#9841](https://github.com/earendil-works/pi/pull/9841): Enables bug report exports while offline.

## 5. Hot Discussions
**Show and Tell**
*   [#1558](https://github.com/earendil-works/pi/discussions/1558): Community member developed a custom "Pi Cursor Provider," receiving strong interest for integration into the official catalog.

## 6. Feature Request Trends
*   **API Openness**: Developers are pushing for access to vendor-specific response metadata (e.g., usage tokens, model-specific headers) via the Extension API.
*   **Provider Ecosystem**: Continuous requests to expand native support for local proxies (Ollama, LiteLLM) and specific reasoning models (Grok, Zai-GLM).
*   **Tool UX**: Improved validation and better schema-handling during tool replay and compaction sequences.

## 7. Developer Pain Points
*   **TUI Instability**: Frequent rendering bugs and performance issues on Windows/WezTerm for long session transcripts.
*   **Tooling "Poisoning"**: Recurrent issues where empty/malformed tool calls (or compaction errors) render sessions permanently unusable, leading to "400 error spirals."
*   **Observability**: Lack of clear correlation between client-sent RPC steer commands and internal queue state, making debugging complex agent interactions difficult.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest: 2026-09-22

## 1. Today's Highlights
Today's development is centered on hardening the **Managed Agent architecture** and stabilizing cross-platform deployments. Significant progress was made in the Web Shell, including improved navigation, workspace pinning, and critical fixes for remote session routing. The team is also prioritizing the transition of complex agent skills (such as `/review` and prompt guidance) onto the robust, deterministic workflow engine.

---

## 2. Releases
*   **v0.24.3**: Official release focusing on stability and refined shell result structures.
*   **v0.24.3-nightly.20260922**: Latest nightly incorporating the new monitor tool in system prompts and batched workspace handling.
*   **desktop-v0.24.3**: Desktop-specific update addressing session permission scoping and shared output modes.
*   **sdk-typescript-v0.1.14**: Synchronized SDK release bundling the latest CLI version (0.24.3).

---

## 3. Hot Issues
1.  [#11872](https://github.com/QwenLM/qwen-code/issues/11872) **Web Terminal PTY Error:** High-priority issue regarding macOS code signing blocking `node-pty`.
2.  [#7040](https://github.com/QwenLM/qwen-code/issues/7040) **Reliable Auto-Memory Recall:** Long-running RFC tracking the delivery of deterministic memory recall paths.
3.  [#12287](https://github.com/QwenLM/qwen-code/issues/12287) **Workflow Hardening:** Extracting retry-from-history logic to stabilize resume semantics.
4.  [#12449](https://github.com/QwenLM/qwen-code/issues/12449) **TUI Line Swallowing:** Regression in TUI rendering when terminal rows shrink.
5.  [#12380](https://github.com/QwenLM/qwen-code/issues/12380) **Managed Agent Architecture:** Proposal for a dual-path agent loop to decouple inference from environment provisioning.
6.  [#12381](https://github.com/QwenLM/qwen-code/issues/12381) **Session Creation Timeout:** Resilience issue where gateway timeouts lead to lost session IDs.
7.  [#12416](https://github.com/QwenLM/qwen-code/issues/12416) **Remote-SSH Bridge Failure:** Critical bug in v0.24.2 causing `BridgeChannelClosedError`.
8.  [#12417](https://github.com/QwenLM/qwen-code/issues/12417) **Tool Execution Sandbox:** Hardening Linux bubblewrap confinement for individual tools.
9.  [#12440](https://github.com/QwenLM/qwen-code/issues/12440) **Live Voice Session Routing:** Bug preventing voice sessions on single-workspace daemons.
10. [#11966](https://github.com/QwenLM/qwen-code/issues/11966) **Empty Tool Call Blocks:** UI regression in the Desktop app where tool arguments fail to render.

---

## 4. Key PR Progress
1.  [#12443](https://github.com/QwenLM/qwen-code/pull/12443) **Edit Diffs:** Restores diff rendering in the Web Shell transcript for better transparency before approval.
2.  [#12323](https://github.com/QwenLM/qwen-code/pull/12323) **Agent Prompt Guidance:** Offloads agent instructions to a bundled skill to reduce system prompt bloat.
3.  [#12447](https://github.com/QwenLM/qwen-code/pull/12447) **Runtime Attestation:** Foundation for a managed runtime attestation contract.
4.  [#12450](https://github.com/QwenLM/qwen-code/pull/12450) **TUI Rendering Fix:** Backports upstream Ink fix to prevent lines from disappearing during screen resizing.
5.  [#12438](https://github.com/QwenLM/qwen-code/pull/12438) **Java Runtime Broker:** Implements the core service for Java-based managed runtime brokering.
6.  [#12412](https://github.com/QwenLM/qwen-code/pull/12412) **Remote Workspace Navigation:** Adds a proxy route to browse remote folders without page reloads.
7.  [#12445](https://github.com/QwenLM/qwen-code/pull/12445) **JDBC Execution Persistence:** Enables durable tracking of tool executions for complex agents.
8.  [#12154](https://github.com/QwenLM/qwen-code/pull/12154) **Worktree Management:** Adds a dedicated Worktrees tab to the Git dialog in Web Shell.
9.  [#12353](https://github.com/QwenLM/qwen-code/pull/12353) **ACP Heap Enforcement:** Introduces opt-in memory limits for ACP children to improve resource management.
10. [#12452](https://github.com/QwenLM/qwen-code/pull/12452) **Workspace Pinning:** Persistent UI feature allowing users to prioritize workspaces in the sidebar.

---

## 5. Feature Request Trends
*   **Platform Flexibility:** Growing demand for browser-native Live Voice hosting (bypassing native app requirements).
*   **Workspace Management:** Heavy focus on sidebar UX, including workspace pinning and better management of "standalone" vs. "workspace-bound" sessions.
*   **Agent Determinism:** Strong trend toward moving complex skill logic (like `/review`) into the workflow engine to ensure predictable execution.

---

## 6. Developer Pain Points
*   **Packaging & OS Integration:** Ongoing friction with macOS code signing for PTYs and Windows release artifacts failing due to shell environment mismatches.
*   **Session Lifecycle:** Developers frequently report "Session not found" 404s when sessions move between workspace/standalone endpoints or when gateway timeouts occur.
*   **UI/UX Density:** Users are struggling with small UI fonts, empty tool-call rendering in the desktop app, and inconsistent sidebar behavior for standalone sessions.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/jinming1345/agents-radar).*