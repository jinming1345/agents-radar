# AI CLI Tools Community Digest 2026-11-05

> Generated: 2026-11-05 01:29 UTC | Tools covered: 7

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

### AI CLI Tools Ecosystem Report: 2026-11-05

#### 1. Ecosystem Overview
The AI CLI ecosystem has matured from "experimentation" to "operational stability," with developers now demanding production-grade reliability, secure credential management, and platform-native integration. Current development is characterized by a "GC Death Spiral"—a common trend where sophisticated agentic features lead to memory leaks, sandbox instability, and high-frequency context bloat. Projects are shifting focus toward formalizing state machine architectures to replace brittle legacy code, signaling a move toward enterprise-hardened AI development workflows.

#### 2. Activity Comparison
*Note: Values are estimated based on active high-visibility issue/PR counts identified in the digest.*

| Tool | Active Hot Issues | Active PRs | Discussions | Release Status |
| :--- | :---: | :---: | :---: | :--- |
| **Claude Code** | 10 | 2 | N/A | No recent release |
| **OpenAI Codex** | 10 | 18 | 3 | v0.168.0-alpha |
| **Gemini CLI** | 10 | 10 | N/A | v0.68.0-preview |
| **Copilot CLI** | 10 | 1 | N/A | v1.0.106-9 |
| **OpenCode** | 10 | 10 | N/A | No recent release |
| **Pi** | 10 | 10 | 1 | No recent release |
| **Qwen Code** | 8 | 10 | N/A | v0.26.7 |

#### 3. Shared Feature Directions
*   **Agentic Transparency:** Across **Qwen Code, Copilot, and OpenCode**, there is a strong demand to surface "hidden" agent logic, such as sub-session delegation and task planning, into the primary user interface.
*   **Standardized Environments:** The "Sandboxing/Security" requirement is universal. **Claude Code, Copilot, and Pi** are all facing pressure to provide official, hardened sandbox configurations (specifically Docker-based) to move away from local process spawning.
*   **Terminal Integration:** Adoption of modern standards like OSC 7501 (**Copilot CLI**) and state-machine-driven SSH/Terminal management (**OpenCode, Pi**) is becoming the baseline expectation for terminal-native UX.

#### 4. Differentiation Analysis
*   **OpenCode:** Distinguishing itself through a strict transition to **state-machine architecture**, aiming to solve the "zombie state" issue prevalent in terminal-based AI tools.
*   **OpenAI Codex:** Focusing on a heavy-client desktop experience (Windows-first), with an aggressive automated `copyberry` bot strategy for PR management.
*   **Claude Code:** Maintaining an "open-platform" feel, struggling with cross-platform identity verification (Android/Linux sandbox) rather than just pure code features.
*   **Qwen Code:** Unique focus on "Enterprise/Platform integration," specifically with bot ecosystems (QQ/GitHub) and tenant-level resource management.

#### 5. Community Momentum & Maturity
*   **High Iteration:** **OpenAI Codex** and **Qwen Code** exhibit the highest velocity of PR activity and automated internal engineering. They are aggressively shipping infrastructure fixes to stabilize their core backends.
*   **Stable but Strained:** **Claude Code** and **Copilot CLI** show the most "community friction." These tools have wider adoption, leading to more complaints regarding authentication stability, regression in system prompt adherence, and "Papercut" issues.
*   **Under-the-Hood Innovation:** **OpenCode** is the most interesting project to watch for technical decision-makers; their move toward formalizing session states via state machines addresses the fundamental reliability flaws found in competitors.

#### 6. Trend Signals
*   **From "Magic" to "Predictability":** Developers are rejecting "black-box" agents. The trend is toward explicit control—if an agent is executing a task, the user expects to see the status, pause the process, and audit the credentials used.
*   **The "Context Wall":** Token usage and model context limits have triggered a shift toward **AST-aware file reading** and surgical code edits rather than full-context injections.
*   **Platform Fragility:** The "Windows Desktop vs. Terminal" divide is the primary source of churn. Tools that rely on complex local auth/permissions (MSIX, Android Play Integrity) are losing user trust compared to tools with cleaner, platform-agnostic CLI footprints.
*   **Infrastructure over Features:** The next two quarters will likely see a slowdown in "agent capability" features in favor of "resilience features" (background task management, secure secret storage, and memory leak mitigation).

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

### Claude Code Skills Community Report (As of 2026-11-05)

The `anthropics/skills` repository has transitioned from an experimental sandbox to a critical infrastructure layer for the Claude Code agent. The current development focus is heavily weighted toward **robustness, tool-chain security, and reliability** rather than just raw feature expansion.

---

### 1. Top Skills Ranking (by Discussion & Activity)

| Skill | Functionality | Status | URL |
| :--- | :--- | :--- | :--- |
| **mcp-builder** | Bridges `mcp>=2.0` updates with custom HTTP headers/streamable clients. | [Open](https://github.com/anthropics/skills/pull/1742) | [#1742](https://github.com/anthropics/skills/pull/1742) |
| **skill-creator** | Core utility for developing new skills; currently undergoing stabilization (Windows/runtime fixes). | [Open](https://github.com/anthropics/skills/pull/1298) | [#1298](https://github.com/anthropics/skills/pull/1298) |
| **webapp-testing** | Automates server spawning/testing; currently being hardened against command injection. | [Open](https://github.com/anthropics/skills/pull/1980) | [#1980](https://github.com/anthropics/skills/pull/1980) |
| **docx-tools** | Automates LibreOffice integration and revision management for document processing. | [Open](https://github.com/anthropics/skills/pull/1792) | [#1792](https://github.com/anthropics/skills/pull/1792) |
| **pyxel** | Enables retro game development, debugging, and direct frame-state verification. | [Open](https://github.com/anthropics/skills/pull/525) | [#525](https://github.com/anthropics/skills/pull/525) |
| **xlsx-recalc** | Advanced spreadsheet logic for handling external references and worksheet-level naming. | [Open](https://github.com/anthropics/skills/pull/2019) | [#2019](https://github.com/anthropics/skills/pull/2019) |

---

### 2. Community Demand Trends
Analysis of community issues indicates three primary drivers for upcoming Skill development:

*   **Trust & Governance:** The most pressing issue is **namespace impersonation** ([Issue #492](https://github.com/anthropics/skills/issues/492)). Users are demanding clear distinctions between "Official Anthropic" and "Community" skills to prevent trust boundary abuse.
*   **Organizational Utility:** There is significant demand for **org-wide skill sharing** ([Issue #228](https://github.com/anthropics/skills/issues/228)). Currently, manual file distribution is a bottleneck for teams trying to standardize agent workflows.
*   **Evaluation & Quality Control:** Users are pushing for "Quality Gate" skills ([Issue #1385](https://github.com/anthropics/skills/issues/1385)) that implement formal verification, adversarial reviews, and pre-task calibration before an agent executes a final command.

---

### 3. High-Potential Pending Skills
These active PRs represent imminent capabilities that bridge the gap between simple automation and complex agentic tasks:

*   **[proofcore-contract-auditor](https://github.com/anthropics/skills/pull/1771):** Adds automated smart contract analysis for Solidity/Rust with cryptographic audit anchoring.
*   **[notion-spec-to-implementation](https://github.com/anthropics/skills/pull/1245):** A project management skill that parses product specs directly into actionable tasks for Claude.
*   **[md2video-audio](https://github.com/anthropics/skills/pull/1703):** Leverages automated tooling to convert Markdown documentation into professional video presentations with voiceover.

---

### 4. Skills Ecosystem Insight
**The community’s core demand is a shift toward "Production-Grade" reliability—moving beyond prototyping to implement hardened security, standardized distribution, and formalized quality control for agent-driven workflows.**

---

# Claude Code Community Digest: 2026-11-05

## Today's Highlights
The community is currently focused on critical performance and reliability regressions affecting long-running sessions, including reports of high CPU/memory consumption following device sleep states. There is also significant frustration regarding model behavior, specifically regarding adherence to system prompt rules (`CLAUDE.md`) and persistent authentication issues across platforms.

## Releases
*No new releases in the last 24 hours.*

## Hot Issues
1.  **[#66010] GMail MCP URL Tracking:** A long-standing privacy concern regarding GMail MCP rewriting URLs with tracking parameters. [Link](https://github.com/anthropics/claude-code/issues/66010)
2.  **[#96326] Japanese Rule Adherence:** High-interest issue where the model drifts into English despite strict `CLAUDE.md` instructions. [Link](https://github.com/anthropics/claude-code/issues/96326)
3.  **[#105770] Android Auth Failure:** Rooted device users are blocked by Google Play Integrity verification errors. [Link](https://github.com/anthropics/claude-code/issues/105770)
4.  **[#87741] X11 Paste Bug:** Linux users report double-pasting in JetBrains terminals due to X11 PRIMARY selection conflicts. [Link](https://github.com/anthropics/claude-code/issues/87741)
5.  **[#73582] Credential Security:** Growing demand to move API keys from plaintext files to secure OS-level secret stores. [Link](https://github.com/anthropics/claude-code/issues/73582)
6.  **[#106338] Rule Neglect:** Reports that Claude has ceased following safety/style rules in `CLAUDE.md` over the last week. [Link](https://github.com/anthropics/claude-code/issues/106338)
7.  **[#106402] Idle Compaction Collision:** Bug where idle cleanup tasks interrupt active background agents. [Link](https://github.com/anthropics/claude-code/issues/106402)
8.  **[#101946] Linux Sandbox Seccomp:** Security sandbox failures on Ubuntu 26.04 due to `setgroups` permission errors. [Link](https://github.com/anthropics/claude-code/issues/101946)
9.  **[#99728] Sandbox File Litter:** The sandbox is creating redundant `.claude/.cc-writes/` directories in nested subfolders. [Link](https://github.com/anthropics/claude-code/issues/99728)
10. **[#107354] Memory Leak/Hang:** Significant performance regression where sessions hang after macOS sleep, leading to massive RAM consumption. [Link](https://github.com/anthropics/claude-code/issues/107354)

## Key PR Progress
1.  **[#37084] GitHub API Reliability:** Introduction of a centralized `githubRequest` utility with retry, timeout, and rate-limit handling. [Link](https://github.com/anthropics/claude-code/PR/37084)
2.  **[#95698] Plugin Hook Security:** Fixes for plugin shell hooks to use quoted paths, preventing execution errors in specific environments. [Link](https://github.com/anthropics/claude-code/PR/95698)

## Feature Request Trends
*   **Enhanced Security:** Strong push for OS-native secret management and hardened sandbox configurations.
*   **Extended Language/Region Support:** Increasing requests for better voice dictation support for non-English languages (e.g., Hebrew).
*   **Project Management:** Interest in cross-project communication and better CLI-based identity management for "cowork" features.
*   **MCP Robustness:** Better error handling and diagnostic feedback when MCP servers fail to list tools or authenticate.

## Developer Pain Points
*   **Model "Drift":** Developers are losing trust in prompt-adherence, specifically when system-level constraints (`CLAUDE.md`) are ignored after session persistence.
*   **Environment Stability:** Recurring issues with Linux sandbox configurations and macOS sleep-mode performance are causing "GC Death Spirals" and system instability.
*   **Plugin UX:** The "Plugins updated" banner is causing UI fatigue due to re-triggering on every refresh, and plugin installation cards are failing to render in desktop environments.
*   **Authentication Fragility:** Windows/MSIX stealth updates are frequently invalidating local device keys, causing broken auth states.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

## OpenAI Codex Community Digest: 2026-11-05

### Today's Highlights
The community is currently focused on stabilizing the Windows desktop experience, which continues to face significant friction regarding permission policies and UI regression. Simultaneously, automated tooling updates have accelerated, with the `copyberry` bot landing a flurry of PRs to improve subagent management, sandbox security, and cloud client integration.

### Releases
*   **rust-v0.168.0-alpha.2 / v0.168.0-alpha.1**: Latest alpha iterations focusing on internal CLI stability.
*   **rust-v0.167.0-alpha.5 / v0.167.0-alpha.3.1**: Incremental updates for the rust-based backend infrastructure.

### Hot Issues
1.  **[#59060](https://github.com/openai/codex/issues/59060)**: A high-severity report of a server-side "reboot" instruction causing catastrophic systemd and container destruction. Community reaction is alarmed (337 👍).
2.  **[#42739](https://github.com/openai/codex/issues/42739)**: Desktop app update causing project sidebar to appear empty. Affects workflow continuity.
3.  **[#54841](https://github.com/openai/codex/issues/54841)**: Work mode blocks messages in BYOK (Bring Your Own Key) mode when computer tools are active.
4.  **[#58258](https://github.com/openai/codex/issues/58258)**: Windows preflight stalls on PPTX attachments; indicates issues with office integration.
5.  **[#48700](https://github.com/openai/codex/issues/48700)**: Chat/Work toggle disappearance on Windows desktop, forcing users into the more restricted "Work" experience.
6.  **[#53053](https://github.com/openai/codex/issues/53053)**: Computer-use tool fails to identify Chrome URL on Windows, blocking web-based automation.
7.  **[#42484](https://github.com/openai/codex/issues/42484)**: Memory leak/UI freeze in `cua_node` consuming ~59GB of RAM. Critical performance bug.
8.  **[#47344](https://github.com/openai/codex/issues/47344)**: Prompt send button remains greyed out despite 0% usage.
9.  **[#59301](https://github.com/openai/codex/issues/59301)**: Severe typing lag in macOS dot conversations.
10. **[#59487](https://github.com/openai/codex/issues/59487)**: Sudden, unexplained exhaustion of weekly quota (20% to 0% in 10 minutes).

### Key PR Progress
*   **[#59535](https://github.com/openai/codex/pull/59535)**: Added opt-in Unicode canonical matching to execution policy rules.
*   **[#59531](https://github.com/openai/codex/pull/59531)**: Enables rendering of host-owned V2 subagent rosters in the environment context.
*   **[#59530](https://github.com/openai/codex/pull/59530)**: Strengthens security by resolving workspace permissions at the sandbox launch boundary.
*   **[#59527](https://github.com/openai/codex/pull/59527)**: Improves TUI usability by making side conversation panes resizable.
*   **[#59524](https://github.com/openai/codex/pull/59524)**: Fixes cloud message lifecycle notifications to improve sync between backend and client.
*   **[#59520](https://github.com/openai/codex/pull/59520)**: Optimizes local secrets cache by populating it after atomic writes.
*   **[#59518](https://github.com/openai/codex/pull/59518)**: Enhances stability by validating UI trees at decode time.
*   **[#59514](https://github.com/openai/codex/pull/59514)**: Added paginated cloud thread discovery.
*   **[#59507](https://github.com/openai/codex/pull/59507)**: Tightens memory consolidation security by binding permissions to the memory root.
*   **[#59493](https://github.com/openai/codex/pull/59493)**: Added a native cloud backend to the app-server client.

### Hot Discussions
*   **Show and Tell**: 
    *   [#58359](https://github.com/openai/codex/discussions/58359): `cct` tool for Windows taskbar to track rate limits.
    *   [#59338](https://github.com/openai/codex/discussions/59338): `Conduit` for cross-device Codex access.
    *   [#56337](https://github.com/openai/codex/discussions/56337): `Dude Toldya` for managing persistent agent corrections.
*   **Q&A**: 
    *   [#52835](https://github.com/openai/codex/discussions/52835): Advice for building business apps with Codex as a non-developer.
    *   [#58235](https://github.com/openai/codex/discussions/58235): Architecture concerns regarding a potential Rust-to-TypeScript rewrite.
    *   [#56932](https://github.com/openai/codex/discussions/56932): Discussion on monitoring usage limits outside the TUI.

### Feature Request Trends
*   **Transparency & Monitoring**: Clearer, non-interactive ways to track quota usage and rate limits.
*   **Persistence**: Requests for persistent session states across GitHub PRs and cross-platform migrations.
*   **Enterprise/DevOps Security**: Greater control over credential storage and explicit, non-overridable authorization identities for subagents.

### Developer Pain Points
*   **Windows Stability**: A high frequency of "Papercuts" (UI freezes, missing toggles, path errors) on Windows desktop builds.
*   **Erratic Quotas**: Developers reporting rapid, unexplained consumption of weekly usage limits.
*   **Documentation Gaps**: Confusion over the internal execution event format and the contract for `turn/moderationMetadata`.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest | 2026-11-05

## Today's Highlights
The Gemini CLI development cycle remains heavily focused on agentic stability and improving the integration of the Model Context Protocol (MCP). Recent updates prioritize core reliability, including fixes for file watchers on macOS, environment variable collisions, and enhanced error reporting in headless CLI modes.

## Releases
*   **v0.68.0-preview.0 / v0.67.0**: Recent releases have focused on stabilizing the codebase and refining documentation regarding scope and tool limitations. These builds incorporate continuous integration improvements and automated changelog generation to ensure transparency for the latest nightly features. [See PR #30146](https://github.com/google-gemini/gemini-cli/pull/30146), [See PR #30145](https://github.com/google-gemini/gemini-cli/pull/30145).

## Hot Issues
1.  **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) Subagent False Positives**: Subagents report "success" upon reaching `MAX_TURNS` even when no work is done; high-priority fix needed to prevent silent failures.
2.  **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) Bash Affinity**: Effort to allow agents to leverage native POSIX tools directly, reducing the reliance on custom wrappers.
3.  **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) Generalist Agent Hangs**: A major blocker where deferring to subagents causes indefinite hangs; community has 8+ upvotes on this.
4.  **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) AST-Aware Mapping**: Investigating AST-based file reads to reduce context bloat and improve agentic accuracy.
5.  **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) Agent Skill Discovery**: Anecdotal reports that agents fail to trigger custom skills/subagents unless explicitly prompted.
6.  **[#22267](https://github.com/google-gemini/gemini-cli/issues/22267) Browser Agent Config**: Browser agent currently ignores `settings.json` overrides, frustrating users relying on persistent sessions.
7.  **[#22186](https://github.com/google-gemini/gemini-cli/issues/22186) Output Hook Crashes**: A critical bug where `get-shit-done` summary hooks cause the CLI to crash.
8.  **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246) Tool Limit 400 Error**: The agent hits 400-level API errors when exposing too many tools; requires smarter tool-pruning logic.
9.  **[#23571](https://github.com/google-gemini/gemini-cli/issues/23571) Temp Script Sprawl**: The model tends to litter the filesystem with temporary scripts; users are requesting better workspace cleanup.
10. **[#22741](https://github.com/google-gemini/gemini-cli/issues/22741) Backgroundable Agents**: Feature request for Ctrl+B support to background long-running subagent tasks.

## Key PR Progress
1.  **[#30135](https://github.com/google-gemini/gemini-cli/pull/30135) Stats Heatmap**: Added `/stats heatmap` to visualize daily token usage in the terminal.
2.  **[#30143](https://github.com/google-gemini/gemini-cli/pull/30143) macOS Watcher Fix**: Resolves startup crashes related to strict macOS sandbox policies.
3.  **[#30148](https://github.com/google-gemini/gemini-cli/pull/30148) ACP Hooks**: Ensures `SessionStart` and `Notification` hooks fire correctly in MCP/ACP mode.
4.  **[#30134](https://github.com/google-gemini/gemini-cli/pull/30134) ACP Error Reporting**: Improves visibility when prompts are blocked by hooks in MCP environments.
5.  **[#30144](https://github.com/google-gemini/gemini-cli/pull/30144) Stderr Flushing**: Ensures warning/log output is flushed in real-time during ACP sessions.
6.  **[#30137](https://github.com/google-gemini/gemini-cli/pull/30137) Model Validation**: Adds strict validation for the `/model` command to prevent arbitrary string injection.
7.  **[#30136](https://github.com/google-gemini/gemini-cli/pull/30136) Literal $ Preservation**: Fixes bug where environment variable placeholders corrupted literal `$` characters.
8.  **[#30124](https://github.com/google-gemini/gemini-cli/pull/30124) Path Normalization**: Fixes `tildeifyPath` logic to prevent corruption of path strings sharing name prefixes.
9.  **[#30009](https://github.com/google-gemini/gemini-cli/pull/30009) OSS Publishing**: Configures new Google OSS Exit Gate workflows for npm package distribution.
10. **[#30117](https://github.com/google-gemini/gemini-cli/pull/30117) Error Normalization**: Centralizes error handling for headless CLI operations to provide clearer feedback.

## Feature Request Trends
*   **Context Efficiency**: A strong push toward Abstract Syntax Tree (AST) tools to make file interactions more surgical and less token-intensive.
*   **Agent Autonomy/Awareness**: Requests to make agents "self-aware" of their own capabilities (flags, hotkeys) and better at managing their own task trackers without context rot.
*   **Resilience**: High interest in "backgrounding" long-running subagents and improving recovery from locked state/browser sessions.

## Developer Pain Points
*   **"Context Bloat"**: Users are increasingly struggling with high token usage caused by large file reads and excessive tool definitions.
*   **Reliability vs. Features**: Significant frustration regarding agent "hanging" during subagent tasks and the failure of agents to proactively use custom skills.
*   **Workspace Hygiene**: Developers are tired of cleaning up temporary script files generated by agents across their repositories.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

## GitHub Copilot CLI Community Digest: 2026-11-05

### 1. Today's Highlights
The Copilot CLI continues to evolve with rapid releases aimed at refining local model experiences and improving the reliability of enterprise-managed policies. Developers are currently focused on troubleshooting intermittent connectivity and policy-refresh issues that have surfaced in recent versions, alongside a growing interest in deeper terminal integration through protocol standards like OSC 7501.

### 2. Releases
*   **[v1.0.106-9](https://github.com/github/copilot-cli/releases/tag/v1.0.106-9):** Improved precision in line-count reporting for `apply_patch` and introduced better configuration validation to prevent `settings.json` from being ignored due to type mismatches.
*   **[v1.0.106-8](https://github.com/github/copilot-cli/releases/tag/v1.0.106-8):** Streamlined Windows local model development by automating `llama.cpp` installation and adding progress bars; includes improved visibility for repository memory scope and better error logging for agents.

### 3. Hot Issues
1.  [#4438](https://github.com/github/copilot-cli/issues/4438) - **Model Invocation:** Skills with `disable-model-invocation: true` are unreachable, impacting custom workflow configurations.
2.  [#5112](https://github.com/github/copilot-cli/issues/5112) - **Terminal Integration:** High community interest (17 👍) in supporting OSC 7501 to report agent state to modern terminals.
3.  [#5356](https://github.com/github/copilot-cli/issues/5356) - **Performance:** Reports of intermittent multi-minute stalls on Windows during interactive turns.
4.  [#5346](https://github.com/github/copilot-cli/issues/5346) - **Enterprise Regression:** Sudden 422 errors on managed settings endpoints affecting enterprise deployments.
5.  [#5151](https://github.com/github/copilot-cli/issues/5151) - **Context Limits:** Models failing before the first prompt due to ballooning tool definition sizes (~260K tokens).
6.  [#5342](https://github.com/github/copilot-cli/issues/5342) - **Managed Settings:** Persistent "model: Expected string, received object" errors blocking enterprise users.
7.  [#5323](https://github.com/github/copilot-cli/issues/5323) - **Git Pollution:** Feature request to stop creating `refs/agents/` checkpoints in user repositories to keep git history clean.
8.  [#5236](https://github.com/github/copilot-cli/issues/5236) - **Authentication:** Entra broker token cache remaining empty on Windows, causing repeated sign-in prompts.
9.  [#5354](https://github.com/github/copilot-cli/issues/5354) - **Fusion Models:** ACP fails to advertise Fusion availability compared to the interactive TUI.
10. [#5320](https://github.com/github/copilot-cli/issues/5320) - **Ecosystem Growth:** Requests for OSC 7501 support to integrate with specialized terminals like the Herdr app.

### 4. Key PR Progress
*   [#5186](https://github.com/github/copilot-cli/pull/5186) - **Maintenance:** Update to `feature_request.yml` to streamline the incoming request workflow.

### 5. Feature Request Trends
*   **Terminal Native Status:** A strong push for standard-based integration (OSC 7501) to allow external terminal applications to "see" and manage Copilot session states.
*   **Cleanliness:** Developers want cleaner repository integration (avoiding persistent `refs/agents` commits) and better control over telemetry and local file system usage.
*   **Enterprise Reliability:** A demand for more transparent error messaging for "Managed Account Policy" failures, which currently appear as generic, recurring blockers.

### 6. Developer Pain Points
*   **Enterprise Instability:** Frequent, silent, or confusing failures regarding managed settings and policy refreshing are the leading cause of friction for corporate users.
*   **State Management:** The transition between "Plan" and "Implementation" modes with Fusion models is occasionally hanging, and session resumption logic is causing confusion when IDs aren't explicitly provided.
*   **Sandboxing:** Strict environment policies on both macOS (Gradle) and Windows (sandbox enforcement) are creating "false positive" blocks where legitimate development tools are denied access despite correct configuration.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

## OpenCode Community Digest: 2026-11-05

### Today's Highlights
The OpenCode engineering team has launched an aggressive effort to move fragmented GUI and core logic into **explicit state machines**, significantly improving reliability across terminal sessions, SSH connections, and file browsers. Meanwhile, the community is grappling with widespread "Free tier" access issues, prompting a high-traffic central tracking issue that remains the primary focus of user discourse.

### Releases
*No new releases in the last 24 hours.*

### Hot Issues
1. **[#59387](https://github.com/anomalyco/opencode/issues/59387) Free Tier Limit Errors:** The central hub for users reporting false "Usage limit reached" flags. With 282 comments, this is currently the highest friction point in the ecosystem.
2. **[#61775](https://github.com/anomalyco/opencode/issues/61775) Session Warming Efficiency:** Confirmed that current "warming" logic for LLM sessions is actually cost-inefficient for providers like OpenAI and Gemini.
3. **[#61829](https://github.com/anomalyco/opencode/issues/61829) Claude-Agent Authentication:** Users report a critical failure where authenticated Claude Code sessions are rejected on macOS desktop clients.
4. **[#61845](https://github.com/anomalyco/opencode/issues/61845) Gemini-4-Argon 403 Errors:** A specific outage for the Argon model on Go plans, while other Go models remain functional.
5. **[#61858](https://github.com/anomalyco/opencode/issues/61858) Terminal Theme Alpha:** GUI bug where the terminal fails to render transparency due to alpha channel stripping in `ghostty-web`.
6. **[#61529](https://github.com/anomalyco/opencode/issues/61529) PowerShell Exit Codes:** A persistent Windows issue where PowerShell 5.1 clamps exit codes, causing false success/failure reports in the shell tool.
7. **[#28030](https://github.com/anomalyco/opencode/issues/28030) Project Deletion:** Successfully closed; users can now delete projects from the Desktop application.
8. **[#61125](https://github.com/anomalyco/opencode/issues/61125) Workspace Data Loss:** A worrying report of disappearing workspaces during "Stop" actions.
9. **[#61123](https://github.com/anomalyco/opencode/issues/61123) Model Transparency:** A request to expose default model settings via a `/models` command or similar UI affordance.
10. **[#61535](https://github.com/anomalyco/opencode/issues/61535) Version Update Loop:** Users on the latest version are incorrectly prompted to upgrade to access free models.

### Key PR Progress
1. **[#61865](https://github.com/anomalyco/opencode/pull/61865) & [#61834](https://github.com/anomalyco/opencode/pull/61834) Scheduled Shell Commands:** Major feature allowing agents to run non-interactive cron-like shell jobs independent of active user sessions.
2. **[#61856](https://github.com/anomalyco/opencode/pull/61856) Resumable Code Mode:** Introduces the ability to serialize/suspend a Code Mode run and resume it in a new process, improving resilience for long-running tasks.
3. **[#61863](https://github.com/anomalyco/opencode/pull/61863) State-Machine SSH:** Moves SSH connection logic into explicit state machines to prevent hangs during connection attempts.
4. **[#61847](https://github.com/anomalyco/opencode/pull/61847) Terminal Persistence:** Fixes a bug where terminals remained "disconnected" even after the underlying server restarted and re-adopted them.
5. **[#61860](https://github.com/anomalyco/opencode/pull/61860) Terminal Transparency Fix:** The companion fix to the alpha-channel stripping issue identified in #61858.
6. **[#61850](https://github.com/anomalyco/opencode/pull/61850) File Link Error Handling:** Adds robust state management for failed file opens, providing users with "Failed to load" feedback instead of hanging.
7. **[#61857](https://github.com/anomalyco/opencode/pull/61857) Browser Cookie Management:** Fixes a UI bug where failed site cookie reads rendered the popover useless, now allowing for retries.
8. **[#61852](https://github.com/anomalyco/opencode/pull/61852) Terminal Focus Logic:** Ensures that new terminal windows and tab renames respect user input without being hijacked by background server events.
9. **[#61314](https://github.com/anomalyco/opencode/pull/61314) Git Integration Fix:** Solves the issue where `git init` on an existing folder prevented the project from being indexed correctly.
10. **[#61864](https://github.com/anomalyco/opencode/pull/61864) Windows Git Bash Fix:** Normalizes `PWD` paths in Git Bash on Windows to prevent `chdir` failures during project initialization.

### Feature Request Trends
*   **Automation:** High demand for persistent, background-running agents (schedules/cron jobs).
*   **Transparency:** Users want more visibility into model selection, default settings, and system state (why a browser pane is unsupported, etc.).
*   **GUI Reliability:** Significant movement toward eliminating "unstable state" bugs through the adoption of strict state machine architecture in the frontend.

### Developer Pain Points
*   **Free-Tier Friction:** The most recurring frustration remains the erratic behavior of usage limit enforcement.
*   **State Fragility:** Developers frequently encounter "zombie" states (disconnected terminals, failed SSH links, and ghosted workspace data) that require app restarts.
*   **Environment Differences:** Significant overhead in handling platform-specific shell quirks, particularly regarding Windows (PowerShell/Git Bash) and macOS authentication paths.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest: 2026-11-05

This digest covers the high-velocity activity within the `earendil-works/pi` repository over the last 24 hours, characterized by a major sweep of bug fixes in the coding agent and significant improvements to model integration stability.

---

### 1. Today's Highlights
The core development team has executed a massive cleanup of the coding agent, addressing critical memory leaks and data integrity issues in file processing and tool execution. Additionally, the project is rapidly aligning its AI provider interfaces to accommodate updated branding and compatibility requirements for platforms like QwenCloud.

### 2. Releases
*No new releases in the last 24 hours.*

### 3. Hot Issues
*   **[#7730](https://github.com/earendil-works/pi/issues/7730) - High CPU on Mac OS:** Long-running sessions are causing extreme CPU spikes; remains a significant performance concern.
*   **[#10256](https://github.com/earendil-works/pi/issues/10256) - TUI Terminal Leak:** Terminal color queries are polluting the prompt, and unintended editor spawning persists on Windows.
*   **[#10628](https://github.com/earendil-works/pi/issues/10628) - OSC 52/Tmux conflict:** Fullscreen TUI copy-on-select is being swallowed by tmux, breaking clipboard integration.
*   **[#11584](https://github.com/earendil-works/pi/issues/11584) - TUI Overlay visibility:** Overlays fail to render over terminal images, creating UI "holes."
*   **[#11773](https://github.com/earendil-works/pi/issues/11773) - Branding/Gateway Updates:** Critical P0 request to align Token Plan branding with new QwenCloud endpoints.
*   **[#11808](https://github.com/earendil-works/pi/issues/11808) - SIGILL Crashes:** Mysterious illegal instruction faults reported in Worker threads during headless tasks.
*   **[#11809](https://github.com/earendil-works/pi/issues/11809) - Termux Freezes:** Path lookup tools are spawning processes on the main thread, leading to freezes on mobile/Android environments.
*   **[#11814](https://github.com/earendil-works/pi/issues/11814) - Windows Self-Update Crash:** Startup failure due to incorrect shell spawning (`/bin/sh`) during updates.
*   **[#11815](https://github.com/earendil-works/pi/issues/11815) - Skill Parsing:** Incorrect handling of spaces in skill commands breaks `disable-model-invocation` filters.
*   **[#11802](https://github.com/earendil-works/pi/issues/11802) - TUI Input Corruption:** Raw escape sequences leaking into the composer, often leading to a non-responsive session.

### 4. Key PR Progress
*   **[#11812](https://github.com/earendil-works/pi/pull/11812):** Prevents OAuth token loss during RPC exits by ensuring refresh saves complete.
*   **[#11751](https://github.com/earendil-works/pi/pull/11751):** Robust line-ending handling in the `edit` tool.
*   **[#11811](https://github.com/earendil-works/pi/pull/11811):** Fixes `read`/`edit` tools to handle non-UTF-8 and UTF-16 files without corruption.
*   **[#11813](https://github.com/earendil-works/pi/pull/11813):** Improves bash tool reporting to capture exit codes even after timeouts.
*   **[#11750](https://github.com/earendil-works/pi/pull/11750):** Critical performance fix: streams files in `read` instead of loading full content into memory.
*   **[#11810](https://github.com/earendil-works/pi/pull/11810):** Ensures the Model Selector selection persists after background catalog refreshes.
*   **[#11696](https://github.com/earendil-works/pi/pull/11696):** Adds experimental session replication/sync via `pi-durable`.
*   **[#11800](https://github.com/earendil-works/pi/pull/11800):** Updates Ant Ling model support and purges deprecated API formats.
*   **[#9441](https://github.com/earendil-works/pi/pull/9441):** Cleans up cursor marker leaks in TUI rendering paths.
*   **[#9350](https://github.com/earendil-works/pi/pull/9350):** Fork-free executable lookup to prevent deadlocks in multi-threaded environments.

### 5. Hot Discussions
*   **Q&A:** [#11404](https://github.com/earendil-works/pi/discussions/11404) - Community questioning the origin of unofficial Docker sandbox images for the Pi coding agent.

### 6. Feature Request Trends
*   **Sandboxing:** Increased interest in standardized, official Docker-based environments for safe agent code execution.
*   **Compatibility:** Strong demand for "compat flags" (e.g., `requiresNonNullAssistantContent`, `supportsPromptCacheKey`) to support diverse LLM gateways and proxies.
*   **UI/UX:** Better display-name handling in model selectors and improved persistence of user interface states.

### 7. Developer Pain Points
*   **File Handling:** Repeated struggles with UTF-16/non-UTF-8 file encoding and memory overflow when reading large files.
*   **Headless Reliability:** Frustration with tool timeouts, process spawning deadlocks on mobile, and unexpected crashes (SIGILL) in non-interactive environments.
*   **Tooling Integrity:** Persistent issues with "leaked" terminal markers and raw escape sequences cluttering the TUI, which ruins the user experience in modern terminals like Ghostty and tmux.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest: 2026-11-05

## 1. Today's Highlights
The Qwen Code ecosystem is currently focused on optimizing the `managed-agent` performance, with multiple PRs targeting narrowed locks and improved indexing for activation leases. Additionally, the team is aggressively hardening CI/CD pipelines to prevent cache poisoning across Linux unit-test shards, ensuring more reliable build stability.

## 2. Releases
*   **v0.26.7**: General maintenance release. Includes a new operator-scoped `model.catalogRefresh` setting and the ability to disable background catalog updates via `privacy.usageStatisticsEnabled: false`.

## 3. Hot Issues
1.  [#16355](https://github.com/QwenLM/qwen-code/issues/16355): **High priority:** The web-shell is polling all trusted workspaces every 5s even when idle; significant performance impact.
2.  [#16346](https://github.com/QwenLM/qwen-code/issues/16346): Managed Agent CI failure in `ClassSizeRatchetTest` indicates regression in production class size limits.
3.  [#16353](https://github.com/QwenLM/qwen-code/issues/16353): Escalation for PR #15904 (QQ bot messaging); needs community reviews to unblock.
4.  [#16208](https://github.com/QwenLM/qwen-code/issues/16208): Stalled PR #15635 for QQ channel delivery; requires maintainer intervention.
5.  [#16348](https://github.com/QwenLM/qwen-code/issues/16348): Request to expose sub-session delegation within the "Plan & tasks" UI.
6.  [#14724](https://github.com/QwenLM/qwen-code/issues/14724): Ongoing instability in the "Managed Agent" CI gate.
7.  [#12714](https://github.com/QwenLM/qwen-code/issues/12714): Persistent main-branch CI failures impacting deployment confidence.
8.  [#15251](https://github.com/QwenLM/qwen-code/issues/15251): Fleet Shepherd dashboard logs confirm zero-sync behavior during recent ticks.

## 4. Key PR Progress
1.  [#16336](https://github.com/QwenLM/qwen-code/pull/16336): Adds specific indexing for `is_activation_record` in the Session journal to speed up lease lookups.
2.  [#16350](https://github.com/QwenLM/qwen-code/pull/16350): Implements isolated, ephemeral corepack homes for Linux test shards to fix cache pollution.
3.  [#16354](https://github.com/QwenLM/qwen-code/pull/16354): Removes tenant-wide `runtime_placement` guards for standard tool publication to reduce contention.
4.  [#16105](https://github.com/QwenLM/qwen-code/pull/16105): Adds `--conversations-dir` support to CLI/daemon to allow custom storage roots.
5.  [#16287](https://github.com/QwenLM/qwen-code/pull/16287): Optimizes writer grant renewals by skipping unnecessary steps if a valid lease is already in-flight.
6.  [#15904](https://github.com/QwenLM/qwen-code/pull/15904): Adds opt-in `forwardBotMessages` for QQ bots to allow agent-bot interaction.
7.  [#16352](https://github.com/QwenLM/qwen-code/pull/16352): Strengthens security by masking passwords in upgrade commands and enforcing strict URL parsing.
8.  [#16327](https://github.com/QwenLM/qwen-code/pull/16327): Refines locking strategies for queue dispatch and workspace session creation.
9.  [#13969](https://github.com/QwenLM/qwen-code/pull/13969): Introduces `FileChanged` notifications for local, non-managed sessions.
10. [#16333](https://github.com/QwenLM/qwen-code/pull/16333): Improves GitHub channel resilience by keeping notifications unread during transient API failures.

## 5. Feature Request Trends
*   **Granular Control:** Increasing demand for custom directories (conversations, plugins) and tighter privacy controls (catalog refresh settings).
*   **Visibility:** Strong interest in surfacing "behind-the-scenes" agent logic (sub-session delegation) into the UI/Cockpit.
*   **Agent Interoperability:** Continued pressure to integrate external bot ecosystems (QQ, GitHub) more deeply into the agentic workflow.

## 6. Developer Pain Points
*   **CI Flakiness:** Repeated issues with shared cache states across test shards, leading to false negatives and developer fatigue.
*   **Performance Overhead:** Concern regarding background polling of workspaces during idle states, consuming unnecessary system/tenant resources.
*   **Merge Bottlenecks:** A recurring frustration with PRs being "merge-ready" but blocked by secondary approval requirements, leading to manual escalation requests.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/jinming1345/agents-radar).*