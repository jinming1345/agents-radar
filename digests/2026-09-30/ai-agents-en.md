# OpenClaw Ecosystem Digest 2026-09-30

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-30 01:31 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest - 2026-09-30

## 1. Today's Overview
OpenClaw is currently in a state of high-intensity stabilization following the release of the `2026.9.6` version. Developer activity is exceptionally high, with 500 issues and 500 PRs updated within the last 24 hours, signaling a massive push to address critical stability regressions and memory management issues. The project is currently focused on "extended-stable" maintenance, prioritizing crash-loop fixes and infrastructure reliability for enterprise-scale gateway deployments.

## 2. Releases
*   **v2026.8.33:** An `extended-stable` (LTS equivalent) release.
    *   **Scope:** Includes August 2026 stable code, critical security patches, and updated model support.
    *   **Context:** This release is intended for users requiring high reliability, distinct from the faster-moving `2026.9.6` branch which is currently experiencing significant stability friction.

## 3. Project Progress
Recent PR activity demonstrates a focus on architectural "desloping"—removing redundant logic to improve performance and consistency.
*   **Provider Refactoring:** [PR #161471](https://github.com/openclaw/openclaw/pull/161471) continues the cleanup of provider plugins to standardize logic.
*   **Gateway Core Consolidation:** [PR #159999](https://github.com/openclaw/openclaw/pull/159999) achieved a massive cleanup, removing over 1,300 lines of code to reduce technical debt.
*   **Stability Patches:** Several fixes for worker life-cycles ([PR #160820](https://github.com/openclaw/openclaw/pull/160820)) and update validation ([PR #161450](https://github.com/openclaw/openclaw/pull/161450)) were initiated to ensure upgrades do not break existing installations.

## 4. Community Hot Topics
The community is currently vocal about infrastructure-level failures affecting reliability:
*   **[Issue #143524](https://github.com/openclaw/openclaw/issues/143524):** SQLite WAL growth (up to 2.8 GB) blocking gateway startup. This is the top-commented issue (94 comments), representing a critical P0 UX-blocker for Windows users.
*   **[Issue #119720](https://github.com/openclaw/openclaw/issues/119720):** Synchronous persistence blocking the event loop. Users are concerned about performance degradation as their history databases scale.
*   **[Issue #157531](https://github.com/openclaw/openclaw/issues/157531):** The official tracker for `2026.9.7` fixes; it is the central hub for coordinating the current emergency stabilization efforts.

## 5. Bugs & Stability
Stability is the primary concern for the current `2026.9.6` branch.
*   **Critical (P0):**
    *   [Issue #159662](https://github.com/openclaw/openclaw/issues/159662) & [Issue #160548](https://github.com/openclaw/openclaw/issues/160548): Unbounded memory leaks in the `prepared-model-catalog` worker thread.
    *   [Issue #157325](https://github.com/openclaw/openclaw/issues/157325): A "stuck" database resource causing universal failure across all agents until a full gateway restart.
*   **Regression:**
    *   [Issue #157989](https://github.com/openclaw/openclaw/issues/157989): Excessive disk writes (SSD wear) caused by redundant plugin re-capturing since version `2026.9.5`.

## 6. Feature Requests & Roadmap Signals
*   **Decision Models:** [Issue #156341](https://github.com/openclaw/openclaw/issues/156341) proposes an RFC for task-scoped decision models, indicating a move toward more granular control over AI reasoning steps.
*   **Onboarding:** [Issue #16670](https://github.com/openclaw/openclaw/issues/16670) remains a long-standing request to make embedding/memory configuration mandatory in the setup wizard, highlighting the complexity barrier for new users.

## 7. User Feedback Summary
Users are generally satisfied with OpenClaw's feature depth but are frustrated by the frequency of "crash-loop" regressions introduced in the last two minor releases. The sentiment suggests that while the "stable" core is powerful, the current plugin and worker-isolation layers are prone to memory pressure and resource contention. Users value the recent improvements to UI/Dashboarding but would trade them for a "boring," stable release.

## 8. Backlog Watch
*   **[Issue #16670](https://github.com/openclaw/openclaw/issues/16670):** Open since February 2026; requested UX improvement for Memory setup.
*   **[Issue #97616](https://github.com/openclaw/openclaw/issues/97616):** Zombie process accumulation from hooks/tools; reported in June 2026. This has significant implications for long-term server uptime and has not yet received a definitive fix.

---

## Cross-Ecosystem Comparison

### 1. Ecosystem Overview
The open-source AI agent ecosystem as of late September 2026 is currently undergoing a "stabilization crisis," shifting from a phase of rapid feature expansion to one of intense infrastructure hardening. Projects are uniformly grappling with memory management, state persistence, and cross-platform synchronization, reflecting the challenges of scaling agents from local experiments to production-grade deployments. The landscape is bifurcating between projects prioritizing "enterprise-hardened" stability (OpenClaw, ZeroClaw) and those focused on agile, user-facing agentic UX (IronClaw, Hermes).

### 2. Activity Comparison

| Project | Recent Items (Issues + PRs) | Release Status | Health Score (Est.) |
| :--- | :--- | :--- | :--- |
| **OpenClaw** | 1,000 | v2026.8.33 (LTS) | 7.5/10 (High stress) |
| **Hermes Agent** | 100 | None | 6.5/10 (Maintenance) |
| **IronClaw** | 7 (Active PRs) | v1.4.1 (Stable) | 9.0/10 (Growth) |
| **QwenPaw** | 47 | None | 7.0/10 (Refactoring) |
| **ZeroClaw** | 77 | None | 7.5/10 (Security focus) |

### 3. OpenClaw’s Position
OpenClaw serves as the "heavyweight" reference architecture of the ecosystem. Unlike the more specialized IronClaw or the consumer-focused Hermes, OpenClaw is built for scale, though this manifests as higher technical debt and significant regression friction. It holds the largest community footprint, acting as a trend-setter for stateful agent workflows, but it currently suffers from "feature-bloat" stability issues. Its core advantage is depth and maturity, but it is currently less agile than IronClaw, which has successfully balanced stability with clean, feature-driven releases.

### 4. Shared Technical Focus Areas
*   **Memory & Context Persistence:** Almost every project (OpenClaw, ZeroClaw, Hermes) is battling issues with session reaping, database growth, and context window management.
*   **Workflow Orchestration:** There is a collective shift toward formalizing "Decision Models" and "Task-scoped" reasoning, indicating a move away from simple chat-and-retrieve loops (OpenClaw, Hermes, IronClaw).
*   **Deployment Topologies:** A consensus is emerging around the need for distributed/remote worker pools to bypass single-host resource limitations (IronClaw, ZeroClaw).

### 5. Differentiation Analysis
*   **IronClaw:** Focuses on **Latency & UX**, targeting developers who prioritize performance (Turn-0 tool selection).
*   **ZeroClaw:** Focuses on **Security & Identity**, prioritizing OIDC, sandbox isolation, and schema-driven configurations.
*   **QwenPaw:** Focuses on **Integrations**, specifically bridging gaps with external providers (Telegram, Kimi, OpenAI) and cross-platform terminal utilities.
*   **Hermes:** Focuses on **Desktop-native reliability**, optimizing for Electron/browser-based interfaces and local environment synchronization.

### 6. Community Momentum & Maturity
*   **High Velocity (Growth):** **IronClaw** is currently the most balanced project, showing high momentum with stable, well-received releases.
*   **High Intensity (Stabilizing):** **OpenClaw** and **ZeroClaw** are in "emergency" maintenance modes. They are significantly larger, yet their progress is currently stalled by bug-fixing cycles and security hardening.
*   **Maintenance Mode:** **Hermes Agent** and **QwenPaw** are focusing on clearing backlogs and resolving platform-specific environmental regressions rather than structural evolution.

### 7. Trend Signals
*   **The "Boring" Premium:** User sentiment across the board (notably OpenClaw and Hermes) suggests a strong preference for stability and "boring" updates over new features.
*   **Standardization of Schema:** The industry is moving toward rigid configuration schemas (ZeroClaw's V4) to mitigate the "black box" configuration issues common in complex agent setups.
*   **Knowledge Graphs as First-Class Citizens:** Moving from RAG-based document retrieval to structured Knowledge Graph memories is the next major architectural frontier (ZeroClaw), likely to become an ecosystem-wide standard by Q1 2027.
*   **Deployment Maturity:** The transition from local-only agents to "Edge-Ready" or "Distributed" agent architectures is the primary roadmap differentiator for projects seeking enterprise adoption.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

## Hermes Agent Project Digest: 2026-09-30

### 1. Today's Overview
The Hermes Agent project is currently in a state of high-intensity maintenance, with 100 active items (50 issues and 50 PRs) updated within the last 24 hours. Development effort is heavily skewed toward stabilizing the **Desktop** component, particularly regarding Windows compatibility, installation reliability, and session lifecycle management. While the velocity of incoming bug reports remains significant, the project is showing a strong corrective response with a focused set of PRs targeting session state, update mechanisms, and crash recovery.

### 2. Releases
*   **None.** There were no new releases published in the last 24 hours.

### 3. Project Progress
Recent PRs are almost exclusively focused on hardening the desktop user experience:
*   **Session Lifecycle:** PR [#127011](https://github.com/NousResearch/hermes-agent/pull/127011) and [#124805](https://github.com/NousResearch/hermes-agent/pull/124805) address session metadata and synchronization issues, ensuring session rows are lazily enriched correctly and states are caught up from the store.
*   **Update Hardening:** A series of PRs ([#127290](https://github.com/NousResearch/hermes-agent/pull/127290), [#128301](https://github.com/NousResearch/hermes-agent/pull/128301), [#128612](https://github.com/NousResearch/hermes-agent/pull/128612), [#128553](https://github.com/NousResearch/hermes-agent/pull/128553)) have been opened to fix flaky desktop updates on Windows and POSIX, specifically preventing relaunch loops and handling installation failures more gracefully.
*   **UI/UX Improvements:** PR [#125983](https://github.com/NousResearch/hermes-agent/pull/125983) introduces respect for `display.busy_input_mode` for plain-text submits, and [#128755](https://github.com/NousResearch/hermes-agent/pull/128755) provides more accurate OpenRouter cost reporting.

### 4. Community Hot Topics
*   **[#84361](https://github.com/NousResearch/hermes-agent/issues/84361):** Dead file links in Desktop. Resolved via cleanup, highlighting ongoing issues with regex-based markdown parsing.
*   **[#95189](https://github.com/NousResearch/hermes-agent/issues/95189):** Critical Gateway instability on WSL2. Users are experiencing OOM errors driven by constant connection churn.
*   **[#69940](https://github.com/NousResearch/hermes-agent/issues/69940):** WebSocket disconnects (code 1012) every 17 minutes, causing orphaned sessions and data loss. This indicates a systemic issue with session reaping logic.
*   **[#103748](https://github.com/NousResearch/hermes-agent/issues/103748):** Feature request for an official mechanism to inject messages into live sessions, reflecting a demand for "manager-agent" orchestration workflows.

### 5. Bugs & Stability
*   **High Severity:**
    *   **[#124255](https://github.com/NousResearch/hermes-agent/issues/124255):** CPU burn/Overheating on laptops due to SwiftShader fallback. **Status:** Closed/Fixed.
    *   **[#95189](https://github.com/NousResearch/hermes-agent/issues/95189):** Gateway OOM on WSL2. **Status:** Open.
*   **Medium/Low Severity:**
    *   **[#128720](https://github.com/NousResearch/hermes-agent/issues/128720):** Slack slash-command regressions leading to prompt-pin flipping.
    *   **[#123347](https://github.com/NousResearch/hermes-agent/issues/123347):** `_DeadlockError` during Group Chat startup.
    *   **[#128697](https://github.com/NousResearch/hermes-agent/issues/128697):** Intermittent plugin publication failures.

### 6. Feature Requests & Roadmap Signals
*   **Advanced Authentication:** [#110759](https://github.com/NousResearch/hermes-agent/issues/110759) requests support for custom password managers (Proton Pass), indicating a need to move away from hardcoded credential backends.
*   **Decision Models:** [#119678](https://github.com/NousResearch/hermes-agent/issues/119678) requests support for OpenRouter's Decisions-API to handle auxiliary tasks like MCP approvals. This is likely to be prioritized for power users running multi-agent setups.

### 7. User Feedback Summary
Users are currently expressing frustration with **Desktop reliability**—specifically session persistence, slow loading on remote backends, and crashes on Windows. There is a clear dichotomy between the stability of the core CLI/Gateway and the fragility of the Electron-based Desktop wrapper. Users connecting to remote/VPS backends feel the most "pain" due to latency and unexpected session timeouts.

### 8. Backlog Watch
*   **[#71168](https://github.com/NousResearch/hermes-agent/issues/71168):** Session lists taking 5+ minutes to load after upgrades remains a significant user-friction point.
*   **[#63840](https://github.com/NousResearch/hermes-agent/issues/63840):** Auto-resuming stale content in new sessions; a long-standing regression that disrupts clean-start workflows.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest: 2026-09-30

## 1. Today's Overview
The IronClaw project is maintaining strong momentum following the successful release of version 1.4.1. Development activity is focused on improving agent latency through intelligent tool selection and enhancing user experience via CLI and Web UI refinements. With five active PRs and two significant architectural proposals under discussion, the project remains in a healthy, high-growth phase.

## 2. Releases
*   **[ironclaw-v1.4.1](https://github.com/nearai/ironclaw/releases/tag/ironclaw-v1.4.1) (2026-09-29):**
    *   **Highlights:** A stable promotion of the RC2 candidate. Includes a critical fix for Google OAuth activation (Gmail/Calendar) via the Web UI and a security update for the Wasmtime dependency.
    *   **Migration:** No breaking changes reported; standard update recommended for all operators.

## 3. Project Progress
*   **[PR #8120](https://github.com/nearai/ironclaw/pull/8120) (Merged):** Promoted `v1.4.1-rc.2` to stable status, finalizing the release cycle and updating lockfiles.
*   **UI/CLI Refinement:** Ongoing work includes fixing focus-stealing issues in the Web UI command palette ([PR #8117](https://github.com/nearai/ironclaw/pull/8117)) and improving configuration transparency in the CLI ([PR #8118](https://github.com/nearai/ironclaw/pull/8118)).
*   **Infrastructure:** Automated codebase memory refreshes continue via CI ([PR #7988](https://github.com/nearai/ironclaw/pull/7988)).

## 4. Community Hot Topics
*   **[Issue #7889 - Remote Edge Workers](https://github.com/nearai/ironclaw/issues/7889):** This RFC explores expanding the scheduler to support distributed worker pools. It reflects a growing user need to leverage underutilized hardware across multiple nodes, moving beyond the current single-host limitation.
*   **[Issue #8113 - Opt-in Turn-0 Tool Selection](https://github.com/nearai/ironclaw/issues/8113):** A high-impact proposal to reduce agent latency by ranking tools before the first model call. This aims to eliminate the "tool search" round trip, directly addressing efficiency concerns in agentic workflows.

## 5. Bugs & Stability
*   **Web UI Focus Regression:** A UX bug where closing the command palette caused the UI to lose focus on input fields is currently being addressed in [PR #8117](https://github.com/nearai/ironclaw/pull/8117). (Severity: Low)
*   **CLI Config Transparency:** Users reported difficulty identifying the effective boot profile in complex environments; [PR #8118](https://github.com/nearai/ironclaw/pull/8118) provides the fix by surfacing the active configuration path more clearly. (Severity: Low)

## 6. Feature Requests & Roadmap Signals
*   **Efficiency:** The "turn-0" tool selection ([PR #8119](https://github.com/nearai/ironclaw/pull/8119)) is likely to be a priority for the next minor release, given the performance benefits for agent responsiveness.
*   **Scalability:** Remote edge workers ([Issue #7889](https://github.com/nearai/ironclaw/issues/7889)) represent the next major architectural evolution for IronClaw, signaling a move toward enterprise-grade distributed deployments.

## 7. User Feedback Summary
Current feedback indicates high satisfaction with the reliability of core platform features. However, there is a clear demand for "quality of life" improvements in the CLI and Web UI, alongside a desire for more advanced deployment topologies (distributed/remote workers) to support more complex, resource-intensive agent tasks.

## 8. Backlog Watch
*   **[Issue #7889](https://github.com/nearai/ironclaw/issues/7889):** While active, this RFC is critical for the long-term scalability of the platform. Maintainers should prioritize a consensus on the implementation approach to move it from "RFC" to "Design Approved."

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest: 2026-09-30

## 1. Today's Overview
QwenPaw is experiencing a period of intense maintenance and stabilization activity, with 47 total items updated in the last 24 hours. Development effort is heavily focused on cross-platform reliability, performance optimizations for file handling, and resolving integration friction with external model providers. The high volume of PR activity relative to new issues suggests a maintainer team currently prioritizing technical debt and architectural robustness over new feature expansion.

## 2. Releases
*No new releases were published in the last 24 hours.*

## 3. Project Progress
The development team pushed several critical fixes, primarily addressing stability and environment-specific issues:
* **Terminal & PTY:** Resolved issues with high file descriptors preventing PTY operations (#8023) and fixed cross-platform pathing/sandbox cleanup bugs (#8026).
* **Desktop Stability:** Implemented fixes for NSIS solid compression issues (#8025) and improved timezone handling for the `qoder` subsystem (#8024).
* **Telegram Integration:** Completed a series of improvements by `j4Uq` regarding `/start` handshake consumption (#7773), command addressing in mention gates (#7765), and HTML markdown parsing for approval cards (#7718).

## 4. Community Hot Topics
*   **[#7991] TaskTracker Zombie Entries:** The most pressing issue (4 comments) concerns a discrepancy between the dashboard task count and the chat list API. Users are seeing inflated "running" status counts, highlighting a need for better synchronization between global state tracking and individual chat statuses.
*   **[#2359] Heartbeat/Cron Flow Control:** This long-standing request (3 comments) for `HEARTBEAT_OK` / `CRON_OK` tokens remains a point of interest. The community is looking for more granular control over model message-sending behaviors in automated contexts, similar to OpenClaw’s architecture.

## 5. Bugs & Stability
*   **High Severity:**
    *   [#8036] **OpenAI/Kimi Provider Failures:** Users report connection tests passing while actual generation fails, with UI error messages masking the underlying provider errors.
    *   [#8022] **Context Pollution:** A bug where `send_file_to_user` leaves empty assistant messages in history, triggering 400 errors across all models.
*   **Medium Severity:**
    *   [#8035] **Transcription Settings:** Switching transcription providers silently breaks functionality, and the UI fails to update the `transcription_model` configuration.
    *   [#8013] **Skill Download Timeout:** Massive skill pools (>80MB) trigger a 30s hard-coded UI timeout, though backend processing continues, leading to "ghost" installations. (Fix in progress: [#8027]).

## 6. Feature Requests & Roadmap Signals
*   **Offline/Intranet Support:** The community is pushing for configurable Skill/Plugin marketplace sources (#8015) to enable QwenPaw in air-gapped or self-hosted environments.
*   **UI Customization:** Demand for adjustable font sizes in the Desktop (Tauri) version (#7999) has been categorized as a `good first issue`, suggesting it may be slated for a near-term release to improve accessibility.

## 7. User Feedback Summary
Current user sentiment reflects frustration with "black box" failures—specifically in provider integrations (OpenAI/Kimi) and transcription settings—where the UI masks error details. Users are also struggling with the limitations of the desktop interface, specifically regarding accessibility (font scaling) and the lack of robust handling for large-scale file operations (skills management). 

## 8. Backlog Watch
*   **[#2359] HEARTBEAT_OK/CRON_OK:** Open since March 2026. This requires maintainer input to define the policy for automated content delivery, which is essential for advanced agentic automation.
*   **[#6252] Desktop Zoom Issues (Linux):** While acknowledged, the lack of Ctrl+Wheel zoom functionality on Linux remains a persistent annoyance for power users on Ubuntu/Arch environments.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest: 2026-09-30

## 1. Today's Overview
The ZeroClaw project is experiencing a period of intense technical consolidation, with high activity levels across 77 tracked items (27 issues, 50 PRs). The engineering focus has shifted heavily toward hardening the security architecture—specifically around OIDC integration, session ownership, and sandbox isolation—while simultaneously pushing for a major breaking transition to Configuration Schema V4. The codebase is currently undergoing a "spring cleaning" of deprecated SaaS integrations and inert config surfaces, signaling a move toward a more streamlined, core-focused runtime.

## 2. Releases
*   **No new releases were recorded for this period.**

## 3. Project Progress
*   **Context Limit Resolution:** [PR #11260](https://github.com/zeroclaw-labs/zeroclaw/pull/11260) was merged, resolving the critical bug where interactive agent sessions were incorrectly clamped to a 32k token fallback, finally allowing users to leverage full 131k context windows.
*   **Config Hardening:** Significant progress on the Schema V4 transition ([PR #11218](https://github.com/zeroclaw-labs/zeroclaw/pull/11218)), which aims to retire legacy keys and clean up the configuration surface.
*   **Plugin Infrastructure:** Development of the "Verified Plugin Update" flow ([PR #11262](https://github.com/zeroclaw-labs/zeroclaw/pull/11262)) and associated host-side admission logic ([PR #11261](https://github.com/zeroclaw-labs/zeroclaw/pull/11261)) is nearing completion, addressing the lack of an explicit update/rollback contract.

## 4. Community Hot Topics
*   **[Issue #8832](https://github.com/zeroclaw-labs/zeroclaw/issues/8832) - Plugin-owned Kanban board:** With 10 comments, this remains the most discussed feature request. Users are pushing for more autonomous agent-driven task management.
*   **[Issue #10068](https://github.com/zeroclaw-labs/zeroclaw/issues/10068) - 32k Token Cap:** (Closed) This was a primary pain point for power users until the recent patch; the community is highly sensitive to token management and runtime transparency.
*   **[Issue #6105](https://github.com/zeroclaw-labs/zeroclaw/issues/6105) - Cron/Agent Context:** Persistent interest in how agents maintain state across scheduled jobs.

## 5. Bugs & Stability
*   **S0 - Security/Data Loss (Critical):** 
    *   [#11197](https://github.com/zeroclaw-labs/zeroclaw/issues/11197): Session resume allows access after admin revocation.
    *   [#11198](https://github.com/zeroclaw-labs/zeroclaw/issues/11198): Delegated memory tools bypass principal scope.
    *   [#11239](https://github.com/zeroclaw-labs/zeroclaw/issues/11239): Owned sessions leaking to shared memory planes.
*   **S1/S2 - Workflow/Degraded:**
    *   [#11126](https://github.com/zeroclaw-labs/zeroclaw/issues/11126): Queued session ops failing to observe revocations.
    *   [#11233](https://github.com/zeroclaw-labs/zeroclaw/issues/11233): Incorrect validation reporting (Reported by DefuzeX-AI).
    *   [#11257](https://github.com/zeroclaw-labs/zeroclaw/issues/11257): WhatsApp Web media captions being dropped.

## 6. Feature Requests & Roadmap Signals
*   **Knowledge Graph as Memory:** [Issue #11053](https://github.com/zeroclaw-labs/zeroclaw/issues/11053) (RFC) proposes moving the knowledge graph from a "tool" to a "first-class memory layer," a major architecture pivot.
*   **Document Retrieval (RAG):** [Issue #11235](https://github.com/zeroclaw-labs/zeroclaw/issues/11235) proposes a standardized knowledge corpus for document-based RAG.
*   **Prediction:** Expect the next major version to feature a robust "Memory Layer" rework and the formalization of Schema V4.

## 7. User Feedback Summary
Users are generally appreciative of the rapid security patches but are frustrated by the current state of "hidden" failures (e.g., cron jobs losing context, media captions dropping in WhatsApp). There is a palpable demand for more reliable long-term memory and better observability into what an agent is "doing" behind the scenes, as evidenced by the influx of bug reports from external safety auditing tools.

## 8. Backlog Watch
*   **[Issue #7824](https://github.com/zeroclaw-labs/zeroclaw/issues/7824):** Proactive messaging for WeCom. This has been in the "icebox" for months; it represents a significant gap for enterprise users operating in Asian markets.
*   **[PR #9254](https://github.com/zeroclaw-labs/zeroclaw/pull/9254):** IBM Db2 session persistence. Currently deferred; likely needs a dedicated champion to move forward given the niche database requirement.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/jinming1345/agents-radar).*