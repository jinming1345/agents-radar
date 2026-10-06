# OpenClaw Ecosystem Digest 2026-10-06

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-10-06 02:29 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest: 2026-10-06

## 1. Today's Overview
The OpenClaw repository is experiencing extremely high velocity, with 1,000 combined events (Issues/PRs) updated in the last 24 hours. Development is currently focused on an intensive "deslopping" and performance-refactoring phase, with heavy engineering effort aimed at offloading Gateway-thread overhead into isolated workers. While the project is shipping regular beta updates, the high volume of critical "P0" crash-loop and memory-leak reports suggests a period of significant instability in the current release cycle.

## 2. Releases
*   **[v2026.10.1-beta.1](https://github.com/openclaw/openclaw/releases/tag/v2026.10.1-beta.1):** This release focuses on state and session durability. Key improvements include preserving usage across registry changes, enabling remote workspace worker attachments, and migrating embedding caches. Importantly, this patch addresses session-stalling issues caused by queued cancellations and transcript alias alignment.

## 3. Project Progress
*   **Refactoring & Cleanup:** A major push to "deslop" the runtime and scripts is underway (e.g., [PR #165914](https://github.com/openclaw/openclaw/pull/165914), [PR #165908](https://github.com/openclaw/openclaw/pull/165908)) to remove redundant types and consolidate contracts.
*   **Gateway Performance:** Significant progress in moving bulk registry work off the main thread ([PR #165684](https://github.com/openclaw/openclaw/pull/165684)) and isolating transcript worker queues ([PR #165836](https://github.com/openclaw/openclaw/pull/165836)).
*   **Fixes:** Resolved issues involving interrupted restarts ([PR #165782](https://github.com/openclaw/openclaw/pull/165782)) and improved process exit error handling for Anthropic/Claude CLI ([PR #165769](https://github.com/openclaw/openclaw/pull/165769)).

## 4. Community Hot Topics
*   **[#143524](https://github.com/openclaw/openclaw/issues/143524) (108 comments):** A critical SQLite WAL bloat issue (up to 2.8GB) on Windows. Users are demanding a more robust auto-checkpointing strategy as it currently blocks Gateway startup.
*   **[#149361](https://github.com/openclaw/openclaw/issues/149361) (50 comments):** An umbrella issue tracking WebUI performance. The community is aggregating reproduction evidence, indicating that UI lag and stability remain a top-tier pain point.
*   **[#119720](https://github.com/openclaw/openclaw/issues/119720) (23 comments):** Focuses on Gateway event loop blocking caused by synchronous agent persistence, a recurring bottleneck during high-load scenarios.

## 5. Bugs & Stability
*   **P0 (Critical):**
    *   [#159662](https://github.com/openclaw/openclaw/issues/159662): Unbounded memory leak (~4-5 GB/h) in `prepared-model-catalog.worker.js`.
    *   [#161953](https://github.com/openclaw/openclaw/issues/161953): Windows-specific regression in session creation; resolved/closed in current cycle.
    *   [#164396](https://github.com/openclaw/openclaw/issues/164396): Connectivity failures on clean installs (v2026.9.8) for Windows 11/Node 22.
*   **Stability Trends:** Several reports ([#160548](https://github.com/openclaw/openclaw/issues/160548), [#159596](https://github.com/openclaw/openclaw/issues/159596)) highlight a "memory sawtooth" pattern where workers grow to heap limits, trigger pressure-based reclamation, and kill active turns, creating a cycle of service degradation.

## 6. Feature Requests & Roadmap Signals
*   **Package Management:** [PR #165906](https://github.com/openclaw/openclaw/pull/165906) will likely land soon, allowing operators to select exact package versions from the Gateway, a highly requested feature for stability in production environments.
*   **Android Support:** Ongoing interest in a chat-first Android mobile surface ([Issue #46058](https://github.com/openclaw/openclaw/issues/46058)); however, maintainers have yet to signal formal upstreaming.

## 7. User Feedback Summary
Users are frustrated by the frequency of "breaking" updates, particularly concerning update failures that leave the Gateway in an unverified state ([#157319](https://github.com/openclaw/openclaw/issues/157319)). The transition from stable to beta has introduced regression-heavy behavior in plugin handling and memory management, leading to significant friction for self-hosted instances.

## 8. Backlog Watch
*   **[#51441](https://github.com/openclaw/openclaw/issues/51441):** A long-standing request (March 2026) to expose the actual backend model name (e.g., GPT-5.4) rather than just the alias, which is crucial for troubleshooting LLM routing proxies like LiteLLM.
*   **[#77733](https://github.com/openclaw/openclaw/issues/77733):** A lingering regression regarding persona greeting triggers for bare `/new` commands, currently awaiting product/maintainer decision.

---

## Cross-Ecosystem Comparison

### **Cross-Project Comparison Report: Personal AI Agent Ecosystem**
**Date:** 2026-10-06

#### 1. Ecosystem Overview
The open-source AI agent landscape is currently defined by a "Stabilization Crunch," as projects move from prototype-heavy experimentation toward production-grade runtime robustness. A unified theme across the ecosystem is the transition from simple chat interfaces to complex, state-managed agentic workflows (SOPs, multi-agent supervision, and persistent tool orchestration). While innovation remains rapid, the developer experience is currently hampered by significant regressions related to local runtime management, sandbox security, and state persistence.

#### 2. Activity Comparison
| Project | Open Issues | Open PRs | Release Status | Health Score (1-10) |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | High | High | Beta (Active) | 4 |
| **Hermes Agent** | Moderate | Moderate | Stagnant | 6 |
| **IronClaw** | Low | Low | Stable (1.4.1) | 7 |
| **QwenPaw** | Moderate | Moderate | Development | 5 |
| **ZeroClaw** | Moderate | High | Experimental | 3 |

*Health score reflects current stability and bug-to-fix ratio.*

#### 3. OpenClaw's Position
OpenClaw serves as the ecosystem's "high-velocity reference" project. Its primary advantage is rapid feature iteration and advanced performance refactoring (e.g., thread offloading, worker isolation), positioning it as the most ambitious project in terms of raw capability. However, this comes at the cost of stability; it is currently the most "breaky" of the cohort, characterized by P0 memory leaks and severe regressions. While it dwarfs the others in raw community volume, it is currently in a "deslopping" phase to correct technical debt, whereas peers like IronClaw are prioritizing refined stability.

#### 4. Shared Technical Focus Areas
*   **Sandbox Security:** Multiple projects (QwenPaw, ZeroClaw) are struggling with OS-level sandbox failures (Firejail/Bubblewrap/COM automation), highlighting a shift toward more restrictive environment isolation.
*   **State Persistence & Recovery:** All projects are battling "stale state" or configuration corruption. IronClaw and OpenClaw are both actively refactoring how browser/daemon state synchronizes to ensure session continuity.
*   **Provider API Management:** The need for standardized routing and credential management (avoiding rate-limit ban-waves and managing provider-specific headers) is a recurring bottleneck across OpenClaw, QwenPaw, and Hermes.

#### 5. Differentiation Analysis
*   **OpenClaw:** Focuses on **runtime performance** and massive architectural scale. Target: Power users/Enterprise.
*   **Hermes Agent:** Focuses on **CLI/Update pipeline hardening** and multi-user profile management. Target: DevOps/System Integrators.
*   **IronClaw:** Focuses on **unified communication** (SMS/iMessage integration) and stable WebUI. Target: Productivity enthusiasts.
*   **QwenPaw:** Focuses on **tool/plugin interoperability** and agentic file management. Target: Researchers/Multi-agent developers.
*   **ZeroClaw:** Focuses on **SOP-driven workflows** and "local-first" privacy. Target: Security-conscious, advanced workflow designers.

#### 6. Community Momentum & Maturity
*   **High Velocity (Iterating):** OpenClaw and ZeroClaw are moving the fastest, introducing the most significant breaking changes. They carry higher risk but offer the bleeding edge of functionality.
*   **Stabilizing:** IronClaw remains the most mature and "production-ready," focusing on refinement over new feature bloat.
*   **Stalled/Maintenance:** Hermes Agent is currently in a maintenance lull, prioritizing bug fixes and technical debt over new feature deployment.

#### 7. Trend Signals
*   **The "SOP" Pivot:** Developers are moving beyond reactive chatting toward "Standard Operating Procedure" frameworks, where agents execute multi-step logic gates.
*   **Provider Transparency:** Users are aggressively demanding visibility into backend model routing (e.g., knowing if they are hitting GPT-5.4 vs. a proxy alias), signaling a shift toward trust and transparency in LLM routing.
*   **Local-First Resilience:** The recurring pain points regarding network-based UI synchronization suggest a trend toward local-only or offline-capable architectures for personal assistants to avoid "stale" or "lost" session data.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest: 2026-10-06

## 1. Today's Overview
The Hermes Agent project remains in a state of high-intensity maintenance, with 100 total updates (50 issues/50 PRs) recorded in the last 24 hours. Development is currently focused on hardening the `hermes update` pipeline and stabilizing session management across multiple platforms (Windows, Linux, and macOS). While no new releases occurred, the community is actively working on long-standing architectural gaps, particularly regarding Kanban orchestration and agent reliability.

## 2. Releases
*   *No new releases in the last 24 hours.*

## 3. Project Progress
*   **Updater Hardening:** A significant push to stabilize `hermes update` continues. PR #132361 and PR #132386 focus on creating crash-safe commit points for git/ZIP swaps, ensuring the update process is idempotent and resilient to interruptions.
*   **CLI & Plugin Discovery:** PR #133624 fixes an issue where standalone MCP probes failed to load enabled plugin secret sources, ensuring diagnostics reflect the actual runtime environment.
*   **Compression:** PR #133625 introduces an opt-in "warm handoff" for the context compressor, allowing the server to potentially reuse prompt caches during summarization.
*   **TUI/UX:** PR #133626 patches the desktop composer to preserve trailing spaces during slash command completions.

## 4. Community Hot Topics
*   **[#125727] Automated Nous integration blocked:** 26 comments. A complex merge conflict affecting core files (`agent_init.py`, `context_compressor.py`, etc.) is stalling the Nous-to-Enterkey transition. [View Issue](https://github.com/NousResearch/hermes-agent/issues/125727)
*   **[#40239] Portuguese (pt-BR) support:** 14 comments. Growing demand for desktop UI localization, despite the backend already supporting it. [View Issue](https://github.com/NousResearch/hermes-agent/issues/40239)
*   **[#35986] Kanban Orchestration Umbrella:** 7 comments. Ongoing discussion on multi-agent reliability, stale detection, and subagent supervision. [View Issue](https://github.com/NousResearch/hermes-agent/issues/35986)

## 5. Bugs & Stability
*   **Critical/High:** 
    *   **[#132817] Credential Cooldowns:** Users report a single `429` error benches credentials for days with no clear path to reset. [View Issue](https://github.com/NousResearch/hermes-agent/issues/132817)
    *   **[#131578] Gateway/Subagent Hangs:** Background processes are re-pinning chat routes, stalling conversations for up to 30 minutes. [View Issue](https://github.com/NousResearch/hermes-agent/issues/131578)
*   **Regression/Platform:** 
    *   **[#133622] Sudo/Auth:** `sudo` cannot authenticate in background processes due to `stdin` redirection issues. [View Issue](https://github.com/NousResearch/hermes-agent/issues/133622)
    *   **[#133608] Storage Leak:** Desktop composer images (screenshots/pastes) are never cleaned up, bloating user data directories. [View Issue](https://github.com/NousResearch/hermes-agent/issues/133608)

## 6. Feature Requests & Roadmap Signals
*   **Profile Management:** [#133623] Demand for built-in configuration for idle profile shutdown and `state.db` cleanup to replace manual GC scripts. [View Issue](https://github.com/NousResearch/hermes-agent/issues/133623)
*   **Context Pipeline:** [#35325] Pursuit of a "Five-Layer Context Pipeline" to match Claude Code's capabilities. [View Issue](https://github.com/NousResearch/hermes-agent/issues/35325)

## 7. User Feedback Summary
Users are finding success with the project’s multi-user/multi-profile architecture but are hitting "administrative" pain points. Common frustrations include the inability to easily recover from transient API rate limits, lack of automated cleanup for temporary session artifacts (logs, images, and stale build stamps), and friction when updating the software on Windows environments.

## 8. Backlog Watch
*   **[#35325] Five-Layer Context Pipeline:** Stalled since May 2026; requires architectural alignment to reach parity with competitors. [View Issue](https://github.com/NousResearch/hermes-agent/issues/35325)
*   **[#40239] I18n Portuguese:** Open since June 2026; high community interest but pending decision-making on UI translation workflows. [View Issue](https://github.com/NousResearch/hermes-agent/issues/40239)

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest – 2026-10-06

### 1. Today's Overview
IronClaw shows steady momentum today, characterized by a mix of infrastructure-focused debugging and expansion of communication capabilities. Activity is evenly split between stabilizing the user interface for self-hosted instances and integrating third-party messaging services. While no new releases were cut, the core team and community maintain a healthy cadence of maintenance and feature development, keeping the project's reliability and connectivity targets on track.

### 2. Releases
*   **None.** There were no new releases published in the last 24 hours. The current stable version remains 1.4.1.

### 3. Project Progress
*   **Merged/Closed PRs:** None.
*   **Ongoing Developments:** Progress is focused on the WebChat interface; PR [#8125](https://github.com/nearai/ironclaw/pull/8125) was introduced to address state-synchronization issues in backgrounded browser tabs, ensuring users receive real-time updates without manual refreshes.

### 4. Community Hot Topics
*   **Daily Failure Taxonomy ([#8126](https://github.com/nearai/ironclaw/issues/8126)):** This ongoing analytical thread highlights current performance bottlenecks, specifically involving `officeqa` benchmarks where `DeepSeek-V4-Flash` is experiencing recurring numeric errors. This suggests a strong push toward optimizing model navigation and reasoning precision within the agent framework.
*   **WebChat UX Concerns ([#8124](https://github.com/nearai/ironclaw/issues/8124)):** Users are reporting "stale" action statuses. This is a critical discussion point, as it highlights a potential gap in notification reliability for self-hosted, non-HTTPS environments, indicating a need for more robust event-handling that doesn't rely solely on modern browser push-notification standards.

### 5. Bugs & Stability
*   **Critical (Stale State):** [Issue #8124](https://github.com/nearai/ironclaw/issues/8124) details a failure to refresh run states and notification inboxes in backgrounded tabs, particularly on plain HTTP deployments.
    *   *Mitigation:* [PR #8125](https://github.com/nearai/ironclaw/pull/8125) is currently active and aims to resolve this by forcing state refetches on window focus.
*   **Moderate (Benchmark Failure):** [Issue #8126](https://github.com/nearai/ironclaw/issues/8126) notes 37 non-passing tests in the `officeqa` suite. While not a "crash," it indicates a decline in model reliability that requires model-parameter tuning or prompt refinement.

### 6. Feature Requests & Roadmap Signals
*   **Communication Expansion:** [PR #8127](https://github.com/nearai/ironclaw/pull/8127) proposes adding a **Sendblue iMessage and SMS extension**. This signals a strategic move toward making IronClaw a unified communication hub, allowing agents to interface directly with mobile messaging ecosystems. Given the maturity of the proposed implementation, it is highly likely to be merged in a near-future release.

### 7. User Feedback Summary
Current feedback centers on the friction of self-hosted deployments. Users operating outside of standard "localhost" or secure HTTPS environments are finding that the WebUI’s current architecture—which assumes modern browser support for background tasks—can lead to poor UX (stale data). There is clear demand for more graceful degradation or alternative synchronization methods for these specific infrastructure setups.

### 8. Backlog Watch
*   **Maintainer Attention Needed:** Both [Issue #8126](https://github.com/nearai/ironclaw/issues/8126) and [Issue #8124](https://github.com/nearai/ironclaw/issues/8124) are fresh but represent core functionality. The team should prioritize the review of [PR #8125](https://github.com/nearai/ironclaw/pull/8125) to prevent the "stale state" bug from persisting into the next development cycle.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest: 2026-10-06

## 1. Today's Overview
The QwenPaw repository is currently experiencing a high volume of activity, with 43 active issues and 25 PRs updated within the last 24 hours. The community focus is heavily centered on stability, addressing recurring 400-series errors when interacting with various LLM providers (OpenCode, DeepSeek, OpenAI) and fixing sandbox security regressions on Windows. Despite the lack of a new release today, the development team is actively triaging a backlog of bugs related to tool execution and frontend responsiveness, indicating a phase of intense stabilization for the v2.2.x series.

## 2. Releases
*   **None** (Current development remains on v2.2.x, with several beta builds circulating).

## 3. Project Progress
*   **Merged/Closed PRs:** 
    *   [PR #8113](https://github.com/agentscope-ai/QwenPaw/pull/8113): Migrated DingTalk channel logic into a standalone plugin architecture to improve maintainability and decouple core from vendor-specific SDKs.
    *   [PR #8104](https://github.com/agentscope-ai/QwenPaw/issues/8104): Addressed a session header requirement for the OpenCode API.

## 4. Community Hot Topics
*   [Issue #7599](https://github.com/agentscope-ai/QwenPaw/issues/7599): **MissingSessionID in OpenCode.** Users are struggling to connect to models due to strict new header requirements. This highlights a need for better documentation on provider-specific API changes.
*   [Issue #8022](https://github.com/agentscope-ai/QwenPaw/issues/8022): **Context Pollution.** AI-generated issue reports have identified that file/image processing artifacts are polluting conversation history, leading to recurring 400 errors.
*   [Issue #7991](https://github.com/agentscope-ai/QwenPaw/issues/7991): **TaskTracker Inconsistency.** Discrepancies between global task counts and chat-specific APIs are causing confusion regarding resource utilization.

## 5. Bugs & Stability
*   **High Severity (Security):** [Issue #8002](https://github.com/agentscope-ai/QwenPaw/issues/8002) & [PR #8048](https://github.com/agentscope-ai/QwenPaw/pull/8048). On Windows, the sandbox failure allows agents to trigger unintended Office COM automation. A fix is pending review to guard these calls.
*   **Medium Severity (Connectivity):** [Issue #8074](https://github.com/agentscope-ai/QwenPaw/issues/8074). OpenAI provider connection tests are failing for modern `gpt-6` models due to outdated token limit parameter matching. [PR #8090](https://github.com/agentscope-ai/QwenPaw/pull/8090) is currently addressing this.
*   **Low Severity (UI/UX):** [Issue #7948](https://github.com/agentscope-ai/QwenPaw/issues/7948). Web console design flaws are impeding user input, and [Issue #8094](https://github.com/agentscope-ai/QwenPaw/issues/8094) reports boot-up failures due to stale WebView2 caches.

## 6. Feature Requests & Roadmap Signals
*   **Observability:** [Issue #8103](https://github.com/agentscope-ai/QwenPaw/issues/8103) requests explicit notifications when the daemon performs silent model fallbacks—a critical transparency feature for power users.
*   **Tooling/UI:** [Issue #7731](https://github.com/agentscope-ai/QwenPaw/issues/7731) requesting a "Show Hidden Files" toggle in the Files panel, suggesting a move towards a more robust file-management environment.

## 7. User Feedback Summary
Users are generally frustrated with the "silent failure" modes, such as silent provider fallbacks and silent termination of tasks after UI timeouts. The reliance on AI-generated issue reporting ([Issue #8022](https://github.com/agentscope-ai/QwenPaw/issues/8022)) is a double-edged sword: it provides rich logs but occasionally introduces noise that makes manual issue tracking difficult for maintainers.

## 8. Backlog Watch
*   [PR #7307](https://github.com/agentscope-ai/QwenPaw/pull/7307): This large refactor to consolidate provider/model management has been open since late August. It is critical for streamlining the user onboarding process but likely requires significant review bandwidth.
*   [PR #7066](https://github.com/agentscope-ai/QwenPaw/pull/7066): OAuth2 refresh token persistence fix, also awaiting resolution since August. This is a potential blocker for long-term integration with platforms like XMind.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest: 2026-10-06

## 1. Today's Overview
ZeroClaw is experiencing a high-intensity development phase, characterized by significant architectural refactoring and urgent stability patches. With 24 active issues and 50 open PRs, the project is currently focused on hardening the runtime composition and stabilizing multi-modal interactions. The project remains in a "high-risk/high-reward" state, as core infrastructure like sandbox management and persistent config handling are undergoing major overhauls to address critical S0/S1 regressions.

## 2. Releases
*No new releases identified for 2026-10-06.*

## 3. Project Progress
*   **PRs Merged/Closed:**
    *   [#11294](https://github.com/zeroclaw-labs/zeroclaw/issues/11294): Resolved a flaky test in `parallel_runtime_test_gate.sh` involving race conditions during incarnation replacement.
    *   [#11482](https://github.com/zeroclaw-labs/zeroclaw/issues/11482): Addressed a UI responsiveness bug in `zerocode/tui` where log notifications were blocking critical chat updates.
    *   [#11533](https://github.com/zeroclaw-labs/zeroclaw/pull/11533): Improved test isolation for bootstrap warnings in parallel runtime tests.

## 4. Community Hot Topics
*   [#5287](https://github.com/zeroclaw-labs/zeroclaw/issue/5287) **[Feature]: Compact local runtime profile** (10 comments): Reflects strong community interest in "local-first" privacy and performance, specifically regarding the reduction of prompt bloat and prevention of instruction leakage.
*   [#10495](https://github.com/zeroclaw-labs/zeroclaw/issue/10495) **[Bug]: Config corruption** (6 comments): A critical S0 priority issue where `Config::save()` causes data loss by wiping user configurations. This is currently the most significant risk to user trust.
*   [#11418](https://github.com/zeroclaw-labs/zeroclaw/issue/11418) **[Bug]: Copy button in TUI** (4 comments): While lower in system risk, this impacts daily UX for power users and remains a point of friction.

## 5. Bugs & Stability
*   **[S0 - Critical] Config Corruption:** [#10495](https://github.com/zeroclaw-labs/zeroclaw/issue/10495) - `config.toml` being replaced by a near-empty file.
*   **[S0 - Critical] Sandbox Failures:** [#11540](https://github.com/zeroclaw-labs/zeroclaw/issue/11540) - `bubblewrap` fails detection on Linux.
*   **[S1 - High] Sandbox Tool Errors:** [#11539](https://github.com/zeroclaw-labs/zeroclaw/issue/11539) and [#11538](https://github.com/zeroclaw-labs/zeroclaw/issue/11538) - `Firejail` failures (invalid flags/directories) blocking shell tool execution.
*   **[S1 - High] Workflow Blockage:** [#11432](https://github.com/zeroclaw-labs/zeroclaw/issue/11432) - Daemon crashes leave sessions in a permanent "running" state.

## 6. Feature Requests & Roadmap Signals
The project is clearly pivoting toward a **"SOP (Standard Operating Procedure) Gateway"** model, as evidenced by a flurry of recent, iceboxed, or in-progress features:
*   [#11551](https://github.com/zeroclaw-labs/zeroclaw/issue/11551) through [#11546](https://github.com/zeroclaw-labs/zeroclaw/issue/11546): A comprehensive push for composable child-SOPs, persistent library groups, and explicit approval gates.
*   Expect these features to mature in the upcoming `v0.8.6` release cycle as they move from the "icebox" into active development.

## 7. User Feedback Summary
Users are currently grappling with the transition to the new "workspace split" architecture. The most vocal feedback concerns:
*   **Plugin Invisibility:** [#11519](https://github.com/zeroclaw-labs/zeroclaw/issue/11519) - The workspace split is causing previously installed plugins to become "lost" during recovery.
*   **Multimodal Friction:** Users are frustrated by strict image size limits and the lack of smart downscaling ([#9887](https://github.com/zeroclaw-labs/zeroclaw/issue/9887)), leading to unnecessary errors.

## 8. Backlog Watch
*   [#9420](https://github.com/zeroclaw-labs/zeroclaw/pull/9420): Support for Anthropic OAuth profiles. This has been pending since July and represents a major convenience improvement for professional users.
*   [#7891](https://github.com/zeroclaw-labs/zeroclaw/issue/7891): Signal media attachment support. A highly requested channel enhancement that is currently sitting in the "parking lot," though recent PR [#11556](https://github.com/zeroclaw-labs/zeroclaw/pull/11556) suggests movement is finally occurring.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/jinming1345/agents-radar).*