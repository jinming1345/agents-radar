# OpenClaw Ecosystem Digest 2026-09-23

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-23 00:54 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest: 2026-09-23

## 1. Today's Overview
OpenClaw is currently experiencing a high-intensity period of maintenance, characterized by significant churn in both issue reporting and PR activity. With 500 active issues and 500 active PRs updated in the last 24 hours, the project is under heavy load, primarily driven by critical stability regressions (P0/P1) following the recent `2026.9.x` release series. The core infrastructure—specifically the Gateway—is facing notable scaling and memory management challenges, with maintainer efforts currently focused on stabilizing service lifecycle and database contention.

## 2. Releases
*   **No new releases were published on 2026-09-23.** The project remains focused on stabilizing the `2026.9.5` build and managing update-path conflicts.

## 3. Project Progress
*   **Performance & Contention:** Several critical PRs are in progress to improve system responsiveness under high load, including optimizations for SQLite database contention during maintenance tasks (`#156031`) and ensuring session writes remain responsive during archive cleanup (`#156014`).
*   **Reliability Improvements:** Developers are addressing edge cases in infrastructure and CI, such as ensuring correct `process.exitCode` logging (`#134869`) and refactoring test fixtures to prevent inter-test lifecycle contention (`#156037`, `#156044`).
*   **Plugin & Model Logic:** Work is ongoing to improve the reliability of tool usage tracking (`#155430`, `#148682`) and ensure that provider discovery behaves correctly when environmental secrets are detected (`#156048`).

## 4. Community Hot Topics
*   **[#91588] Critical Gateway Memory Leak:** (34 comments) The top issue remains a massive memory leak where RSS grows from 350MB to 15.5GB. Users are reporting OOM crashes, making this a top priority for maintainers.
*   **[#44925] Subagent Completion Loss:** (29 comments) Users are struggling with silent task failures where subagent results are dropped without retry, indicating a fragility in orchestrating complex agent flows.
*   **[#119720] Gateway Event Loop Blocking:** (22 comments) A complex issue where transcript maintenance blocks the primary event loop, highlighting performance bottlenecks when handling large session histories.

## 5. Bugs & Stability
*   **Severity P0/P1 (High Priority):**
    *   **[#155764] Update Blockers:** Users are reporting that `2026.9.5` updates are blocked by `retained_plugin_source_conflict` errors.
    *   **[#154381] Updater Timeout:** The updater is failing to recognize fixes in newer versions due to hardcoded 300s validation limits, preventing repair.
    *   **[#115642] Billing Cooldowns:** A 5-hour hardcoded cooldown for billing errors is preventing automated recovery, requiring manual intervention.
    *   **[#97616] Zombie Processes:** Persistent leakage of child processes (hooks/tools) leading to system-level degradation.

## 6. Feature Requests & Roadmap Signals
*   **Headless Browser integration (#53763):** Strong interest in a native headless Chromium tool to bypass fragile third-party web access APIs.
*   **Maintenance Windows (#120244):** A proposed RFC to add a scheduled cron maintenance window to defer non-critical background tasks, potentially addressing the event-loop contention issues observed by power users.
*   **Dynamic Model Discovery (#10687):** A long-standing request for better handling of fast-moving provider catalogs like OpenRouter.

## 7. User Feedback Summary
Current user sentiment reflects frustration with the stability of the latest `2026.9.x` series. The primary pain points are:
*   **Update Friction:** Manual interventions are frequently required to finalize updates or recover from failed migrations.
*   **Resource Management:** Users operating on constrained hardware (Raspberry Pi/Containers) are reporting severe CPU/Memory overheads that were not present in previous versions.
*   **Platform Integration:** Reliable message delivery (Telegram/iMessage) is a pain point, with users reporting silent loss of outbound messages during transient network failures.

## 8. Backlog Watch
*   **[#79902] SQLite Transcript Seams:** This P3 request for better database-first runtime accessibility remains stale but is crucial for users trying to build custom analytics on top of OpenClaw state.
*   **[#125764] Telegram Network Failures:** A critical P1 bug where network hiccups result in permanent message loss with no retry logic, which has been open since August 18 and lacks a concrete fix PR.
*   **[#10687] Model Discovery:** While P3, this issue is critical for users moving beyond standard provider lists and continues to collect "thumbs up" (4) and comments, signaling it should be prioritized for the next roadmap cycle.

---

## Cross-Ecosystem Comparison

## Cross-Project Analysis: Personal AI Agent Ecosystem (2026-09-23)

### 1. Ecosystem Overview
The open-source AI agent landscape as of September 2026 is currently in a "stabilization-first" phase, shifting focus from rapid feature prototyping to infrastructure reliability and long-running process management. While developer interest remains extremely high, projects are universally grappling with the challenges of state management, cross-gateway coordination, and the inherent fragility of long-lived LLM-orchestrated task flows. The ecosystem is moving away from simple "chat-with-bot" interfaces toward complex, multi-modal, and multi-agent system (MAS) architectures.

### 2. Activity Comparison
| Project | Active Items (Issues/PRs) | Releases (24h) | Health Score* |
| :--- | :--- | :--- | :--- |
| **OpenClaw** | 1,000 | None | Critical (High Load/Stability) |
| **Hermes Agent** | 100 | None | Stable (Refining v0.21) |
| **IronClaw** | 3 (PRs only) | None | Stable (Polishing) |
| **QwenPaw** | 85 | None | Active (Iterative) |
| **ZeroClaw** | 83 | None | Active (Architectural Pivot) |

*\*Health score based on current ratio of P0/P1 stability issues vs. feature velocity.*

### 3. OpenClaw's Position
*   **Advantages vs. Peers:** OpenClaw maintains the most robust feature set for power users, including sophisticated tool usage tracking and deep integration depth.
*   **Technical Approach:** Unlike the lightweight approach of IronClaw, OpenClaw utilizes a "Gateway" architecture that functions as a heavy-duty backend, leading to significant memory/performance trade-offs.
*   **Community Size:** OpenClaw has the largest and most vocal community, though it is currently suffering from "success-at-scale" pain, with massive issue volume overwhelming maintainer bandwidth compared to the more focused, stable development of Hermes or IronClaw.

### 4. Shared Technical Focus Areas
*   **Reliability & Monitoring:** All projects (specifically OpenClaw, QwenPaw, and ZeroClaw) are struggling with "silent failures" where agent tasks drop without feedback.
*   **Multi-Model/Gateway Management:** A universal demand for cleaner abstractions for switching models mid-flow (QwenPaw) and managing multi-node gateways (Hermes, ZeroClaw).
*   **Infrastructure Hardening:** A trend toward formalizing "Admission Control" and "Maintenance Windows" to prevent resource starvation in high-density agent environments.

### 5. Differentiation Analysis
*   **OpenClaw:** Targeted at power users and high-complexity workflows; prioritizes "all-in-one" extensibility.
*   **Hermes Agent:** Focuses on the Desktop/TUI experience with a move toward a single-host unified backend.
*   **IronClaw:** Emphasizes professionalization, i18n, and UI/UX polish; significantly more stable than the Claws.
*   **QwenPaw:** Balances agility with deep model-provider integrations; currently the most responsive to "model fallback" and cost-management needs.
*   **ZeroClaw:** Architecturally the most advanced, focusing on peer-to-peer agent communication and secure multi-agent coordination.

### 6. Community Momentum & Maturity
*   **High Iteration:** **QwenPaw** and **ZeroClaw** are currently in a high-innovation phase, aggressively iterating on RFCs and architectural changes to capture power-user workflows.
*   **Stabilizing:** **Hermes** and **IronClaw** have successfully transitioned into a "maintenance & polish" mode. Their focus on accessibility and localization indicates they are preparing for wider, non-technical adoption.
*   **High Risk:** **OpenClaw** is at a inflection point; its massive backlog suggests it needs a major architectural refactor or a period of strict "no new features" to prevent total project burnout.

### 7. Trend Signals
*   **Model Agnosticism:** The shift toward "Model Fallback Chains" (QwenPaw) indicates that developers no longer trust a single LLM provider for mission-critical reliability.
*   **Agent Interoperability:** The interest in standardized `.well-known` discovery URIs (ZeroClaw) points to the beginnings of an agent-to-agent web protocol.
*   **Human-in-the-Loop (HITL) Primitives:** As agent autonomy grows, projects are realizing that unified, reliable approval gates are a prerequisite for production-grade, long-running agent deployments.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest: 2026-09-23

### 1. Today's Overview
The Hermes Agent project remains in a state of high-intensity development and stabilization, with 100 active items updated in the last 24 hours. The community focus has shifted toward addressing technical debt in the new multi-gateway architecture, refining cross-platform compatibility, and resolving issues stemming from the recent transition to a unified "single host" backend. While feature velocity is high, the project is currently navigating a period of stabilization as it irons out regressions introduced in recent v0.21.x releases.

### 2. Releases
*   **No new releases today.** (The project is currently stabilizing on v0.21.4).

### 3. Project Progress
*   **#119690:** A critical fix for `reasoning_effort` propagation was merged to ensure bare named providers in `config.yaml` correctly resolve their profiles, preventing settings from being silently dropped.
*   **#119693:** Resolved an issue (#119663) where terminal streams were incorrectly discarded as "mid-stream drops" when superseded by newer write attempts.
*   **#57691:** Cleaned up command-line interface collisions where `/compact` and `/compress` aliases caused duplicate command registration in TUI/Desktop.
*   **#119651:** Addressed gateway multiplexing bugs to improve stability for users running multiple gateways.

### 4. Community Hot Topics
*   **[#97681] Cross-Gateway Collaboration (30 comments):** Remains the primary architectural focal point. Users are pushing for the ability to coordinate bots across different hardware (laptop, server, VPS) without needing the Desktop client active.
*   **[#26689] Accessibility for Screen Readers (15 comments):** Highly active feature request for blind VoiceOver users, highlighting a gap in Hermes's current UI/UX for non-visual workflows.
*   **[#11941] HTML Email Support (14 comments):** Growing demand for rich text/Markdown rendering in scheduled reports delivered via email.

### 5. Bugs & Stability
*   **#100573 (High):** Recurring `SIGTRAP` crash in Electron main process on Linux (Arch/Wayland). This is a critical stability issue for desktop users.
*   **#119411 (Medium):** Profile-picker regression in v0.21.4; changing model settings writes to the primary profile rather than the selected one.
*   **#118671 / #70108 (Medium):** Persistent renderer-layer bugs causing duplicate message bubbles in the Desktop app chat feed.
*   **#62336 (Security/High):** Sensitive environment variables (including credentials) are being persisted to disk in terminal snapshots.

### 6. Feature Requests & Roadmap Signals
*   **#102637 / #102638:** Impending features to allow "Group Chat" management via the CLI/Discord relay, rather than being trapped in the Desktop "Bots" pane.
*   **#93508:** Implementation of a browser-hosted version of the Desktop renderer, which would significantly expand the reach of the Hermes UI to web-based workflows.

### 7. User Feedback Summary
*   **Pain Points:** Users are struggling with the transition to the "single host backend" (v0.21.4), specifically noting that updating processes can lead to `ImportError` crashes (#88371) and broken profile configs.
*   **Use Cases:** There is heavy usage of the "Agent" mode for automated task management, with users reporting frustrations when "long-running" tasks are interrupted or rate-limited without sufficient feedback.
*   **Language Support:** The request for Korean UI support (#33512) and the addition of Indonesian documentation (#92192) suggest a push for better non-English localization.

### 8. Backlog Watch
*   **#84207:** A silent-failure issue where interrupted tool calls result in zero feedback, leaving users in the dark as to whether a task was aborted or simply crashed. This has seen little attention despite its high impact on user trust.
*   **#119070:** A logic flaw in the Kanban dispatcher that "parks" tasks in a `blocker_auth` state indefinitely if they hit a rate limit once, requiring manual intervention to unstick.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest: 2026-09-23

### 1. Today's Overview
The IronClaw project shows steady, focused development activity, characterized by a clean issue backlog and a burst of activity in the WebUI and host-runtime modules. With three active PRs currently under review and zero new issues opened, the project appears to be in a stable state of refinement rather than experimental flux. Development efforts are currently concentrated on improving internationalization, browser-native input handling, and expanding the capabilities of the host-runtime environment.

### 2. Releases
*No new releases were published on 2026-09-23.*

### 3. Project Progress
*No PRs were merged or closed within the last 24 hours.* Development is ongoing for the following items:
*   **[PR #8108](https://github.com/nearai/ironclaw/pull/8108):** Implementation of a `shift` operation in `builtin.time`. This enhances the agent's internal time-manipulation logic by allowing signed time-delta applications (seconds, days, weeks) to either provided inputs or the current timestamp.
*   **[PR #8107](https://github.com/nearai/ironclaw/pull/8107):** Expansion of the project's localization suite by adding Italian (`it`) support, fulfilling a request from [#7855](https://github.com/nearai/ironclaw/issues/7855). This PR ensures full translation coverage by incorporating the complete English key union.

### 4. Community Hot Topics
*   **[PR #8092 (WebUI IME Composition)](https://github.com/nearai/ironclaw/pull/8092):** This PR is currently the most significant for user experience, addressing how the chat composer handles native IME composition. By preventing the application from interfering with input during character composition (essential for languages like Japanese/Chinese), this PR addresses a critical UX friction point for non-English speakers.

### 5. Bugs & Stability
*   **Minor UX Bug:** The current behavior of the chat composer interfering with IME composition (addressed in [PR #8092](https://github.com/nearai/ironclaw/pull/8092)) represents a stability issue for international users. The proposed fix introduces granular control over `keyCode 229` events and Safari-specific composition logic, effectively mitigating a regression risk in input handling.

### 6. Feature Requests & Roadmap Signals
*   **Expanded Time-Handling:** The `builtin.time` enhancement ([PR #8108](https://github.com/nearai/ironclaw/pull/8108)) suggests a roadmap trend toward more sophisticated agentic scheduling and time-aware task execution.
*   **Global Accessibility:** With the addition of Italian, the project is clearly signaling a push for broader international adoption, likely indicating that the core UI is reaching a level of maturity where localization is becoming a priority.

### 7. User Feedback Summary
Current activity indicates that users are moving beyond core functional requests toward quality-of-life improvements. The focus on IME composition and localization implies a growing, diverse user base that is prioritizing the professionalization and "polishing" of the IronClaw interface for daily production use.

### 8. Backlog Watch
*   **[PR #8092](https://github.com/nearai/ironclaw/pull/8092):** While active, this PR has been open since September 10th. Given that it addresses input stability—a fundamental requirement for any chat-based AI—it should be prioritized for review and merge to ensure all users can interact with the chat composer reliably regardless of their system language.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest: 2026-09-23

## 1. Today's Overview
QwenPaw shows high velocity, with 85 total updates (37 issues, 48 PRs) in the last 24 hours, indicating a period of intense stabilization and refinement post-v2.2 release. Development focus is currently split between hardening the console experience, improving model provider resilience, and addressing long-standing UX friction in file management and task orchestration. The project appears healthy but is under pressure from complex concurrency bugs and environment-specific deployment challenges.

## 2. Releases
*   **No new releases today.** Development is currently concentrated on stabilizing features for an upcoming v2.2.2 (see PR [#7928](https://github.com/agentscope-ai/QwenPaw/pull/7928)).

## 3. Project Progress
*   **Task Management & Stability:** Merged fixes for `qwenpaw-pet` plugin approval errors ([#7933](https://github.com/agentscope-ai/QwenPaw/pull/7933)) and resolved issues in the test suite that blocked Windows-based CI/CD workflows ([#7938](https://github.com/agentscope-ai/QwenPaw/pull/7938)).
*   **Provider Resilience:** Advanced work on handling API gateway interruptions ([#7934](https://github.com/agentscope-ai/QwenPaw/pull/7934)) and improving model request structures to prevent 400 errors with specific providers like Volcengine.
*   **Infrastructure:** Significant progress in unit testing coverage (+3.28pp), ensuring higher reliability for core components ([#7941](https://github.com/agentscope-ai/QwenPaw/pull/7941)).

## 4. Community Hot Topics
*   **[Issue #6318](https://github.com/agentscope-ai/QwenPaw/issue/6318):** Discussion on flexible model assignment per conversation. *Need:* Users want to override global agent model settings for specific tasks to optimize cost/performance.
*   **[Issue #7567](https://github.com/agentscope-ai/QwenPaw/issue/7567):** Concurrency issues where "Stopped" tasks continue executing. *Need:* Better state synchronization between the UI and backend task runners.
*   **[Issue #4036](https://github.com/agentscope-ai/QwenPaw/issue/4036):** UX friction in model configuration. *Need:* Simplified onboarding and management for API providers to reduce setup time.

## 5. Bugs & Stability
*   **[Critical] Server Hangs:** [Issue #7721](https://github.com/agentscope-ai/QwenPaw/issue/7721) reports that the file browser can freeze the entire server when processing large repositories.
*   **[High] Task Concurrency:** [Issue #7935](https://github.com/agentscope-ai/QwenPaw/issue/7935) describes a critical failure where an `APITimeoutError` leads to a permanent state of failure, requiring a process restart.
*   **[Medium] Serialization Bugs:** [Issue #7883](https://github.com/agentscope-ai/QwenPaw/issue/7883) continues to track issues with tool-returned PDF serialization causing 400 errors with DeepSeek.
*   **[Medium] State Inconsistency:** [Issue #7890](https://github.com/agentscope-ai/QwenPaw/issue/7890) reports that "zero-downtime" reloads discard active runtime hooks, causing unexpected behavior.

## 6. Feature Requests & Roadmap Signals
*   **UI/UX Modernization:** Users are pushing for a more flexible interface, including moving historical chat lists to the side ([#7739](https://github.com/agentscope-ai/QwenPaw/issue/7739)) and a more modular "skin gateway" system ([#7287](https://github.com/agentscope-ai/QwenPaw/issue/7287)).
*   **Model Fallback:** There is a clear mandate for "Model Fallback Chains" ([#4882](https://github.com/agentscope-ai/QwenPaw/issue/4882), [#5572](https://github.com/agentscope-ai/QwenPaw/issue/5572)) to prevent long-running tasks from dying due to singular provider failures. Expect this in the near-term roadmap.

## 7. User Feedback Summary
*   **Pain Points:** Users feel the "Model Management" process is overly cumbersome (too many clicks). Developers/Power users struggle with the lack of transparency in background sub-agent tasks and the inability to easily cancel them.
*   **Sentiment:** Generally high interest, but frustration is mounting regarding the reliability of the "Stop Task" button and the sensitivity of the workspace file watcher.

## 8. Backlog Watch
*   **[Issue #5856](https://github.com/agentscope-ai/QwenPaw/issue/5856):** Tool call structures being stripped during context compaction. This is a subtle bug that could lead to widespread issues for agents relying on tool usage; it requires urgent architect-level review.
*   **[PR #3819](https://github.com/agentscope-ai/QwenPaw/pull/3819):** A long-running proposal to replace the auto-discovery model list with a browsable UI. It has been pending since April 2026; its closure would resolve the primary UX complaint (#4036).

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest - 2026-09-23

## 1. Today's Overview
The ZeroClaw project maintains high velocity, with 83 total items (issues and PRs) updated in the last 24 hours, reflecting a project in an intense period of architectural refinement and stability hardening. Development is heavily focused on channel-specific capabilities (WhatsApp Web), security auditing, and improving agent-to-agent communication. Overall project health remains robust, though the high volume of "high risk" labeled RFCs suggests a significant pivot toward hardening core runtime primitives for multi-agent environments.

## 2. Releases
*   **No new releases were observed during this period.**

## 3. Project Progress
Development continues to focus on refining the provider-transport layer and channel stability.
*   **Documentation:** Adopted the "replacement-first" integration policy officially via [PR #11042](https://github.com/zeroclaw-labs/zeroclaw/pull/11042), ensuring future feature-gate migrations have a citable governance standard.
*   **Security:** [PR #11038](https://github.com/zeroclaw-labs/zeroclaw/pull/11038) was closed, addressing a CI blockage regarding an upstream double-free vulnerability (`imbl-sized-chunks`).
*   **Resolved Bugs:** Several regressions in WhatsApp Web image handling and provider transport logic were addressed, significantly improving the robustness of multi-modal agent turns.

## 4. Community Hot Topics
The community is currently heavily focused on architectural RFCs aimed at scaling agent operations:
*   [Issue #4853](https://github.com/zeroclaw-labs/zeroclaw/issues/4853) (8 comments): Standardizing `.well-known` URIs for agent-skill discovery. This indicates a push toward interoperability between disparate agent ecosystems.
*   [Issue #10970](https://github.com/zeroclaw-labs/zeroclaw/issues/10970) (5 comments): RFC for host-scoped admission control. The community is clearly concerned about resource starvation when running high-density agent clusters on single machines.
*   [Issue #10930](https://github.com/zeroclaw-labs/zeroclaw/issues/10930) (5 comments): RFC for a single durable primitive for human-in-the-loop interactions, aiming to unify fragmented approval gates across the codebase.

## 5. Bugs & Stability
Several critical issues were identified regarding stability and security:
*   **S0 - Data Loss/Security Risk:** [Issue #11058](https://github.com/zeroclaw-labs/zeroclaw/issues/11058) reports that high-risk commands can bypass the `block_high_risk_commands` sandbox if named in `allowed_commands`.
*   **S1 - Workflow Blocked:** [Issue #10225](https://github.com/zeroclaw-labs/zeroclaw/issues/10225) notes that ZeroCode RPC sessions are failing to reach configured channels.
*   **S2 - Degraded Behavior:** [Issue #11055](https://github.com/zeroclaw-labs/zeroclaw/issues/11055) identifies that the daemon fails to register the channel-map factory, rendering channel-addressed tools unusable in many deployments.

## 6. Feature Requests & Roadmap Signals
The roadmap is shifting toward complex, multi-agent coordination and memory management:
*   **Knowledge Graphs:** [Issue #11053](https://github.com/zeroclaw-labs/zeroclaw/issues/11053) proposes elevating the Knowledge Graph to a first-class memory layer rather than a tool-gated lookup.
*   **Agent-to-Agent Messaging:** [Issue #11027](https://github.com/zeroclaw-labs/zeroclaw/issues/11027) introduces the requirement for peer-to-peer messaging with receiver discretion, indicating a desire to break away from strictly centralized controller-agent architectures.

## 7. User Feedback Summary
Current user sentiment points to frustration with "silent failures." Users are reporting that cron jobs ([Issue #10594](https://github.com/zeroclaw-labs/zeroclaw/issues/10594)) and audit logging ([Issue #9391](https://github.com/zeroclaw-labs/zeroclaw/issues/9391)) often fail to provide feedback or records when they do not execute, making it difficult to debug production-grade agent deployments.

## 8. Backlog Watch
*   [Issue #9392](https://github.com/zeroclaw-labs/zeroclaw/issues/9392) (LINE channel security audit): This P1 security issue remains in-progress; its resolution is critical as it involves bypasses of allowlists and pairing handshakes.
*   [PR #10172](https://github.com/zeroclaw-labs/zeroclaw/pull/10172): A large (XL) PR aimed at preserving provider profile semantics; this has been open since August and represents a major hurdle for consistent multi-model configuration.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/jinming1345/agents-radar).*