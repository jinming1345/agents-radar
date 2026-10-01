# OpenClaw Ecosystem Digest 2026-10-01

> Issues: 490 | PRs: 500 | Projects covered: 5 | Generated: 2026-10-01 01:32 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest – 2026-10-01

## 1. Today's Overview
The OpenClaw project is currently experiencing a period of intense instability following the recent `2026.9.x` release cycle. With 490 active issues and 500 pull requests updated in the last 24 hours, the development team is in a "firefighting" mode, prioritizing memory leaks, database contention, and critical Gateway crash loops. While developer velocity remains high—specifically around CI automation and build-time optimization—the project's stability for production users is currently suboptimal, with multiple P0 "UX release blockers" requiring immediate attention.

## 2. Releases
*   **v2026.9.7:** The latest release focuses on hotfixing persistent stability issues. Migration notes indicate a schema version change (17→18), and users are advised to check logs for `gateway-server-close` failures and SQLite WAL growth issues. [Release Details](https://docs.openclaw.ai/rel)

## 3. Project Progress
*   **Performance & Build Optimization:** Multiple PRs (e.g., [#162251](https://github.com/openclaw/openclaw/pull/162251), [#162225](https://github.com/openclaw/openclaw/pull/162225)) were opened to move localization and protocol model generation to build-time, reducing runtime overhead.
*   **Infrastructure:** Significant effort is being directed toward cleanup automation, specifically regarding package backups ([#162246](https://github.com/openclaw/openclaw/pull/162246)) and SQLite WAL state handling ([#162258](https://github.com/openclaw/openclaw/pull/162258)).
*   **Bug Resolution:** PR [#162233](https://github.com/openclaw/openclaw/pull/162233) addresses macOS cloud worker self-rejection under CPU pressure, a key pain point for developers.

## 4. Community Hot Topics
*   **[#143524] Agent SQLite WAL growth:** (98 comments) A P0 critical issue where database logs grow to 2.8GB, blocking gateway startup. This remains the most discussed performance bottleneck. [Link](https://github.com/openclaw/openclaw/issues/143524)
*   **[#153257] Post-upgrade failure recovery:** (40 comments) Highlights significant user frustration following the 2026.9.5 update, citing 8-hour recovery windows. [Link](https://github.com/openclaw/openclaw/issues/153257)
*   **[#44925] Subagent silence:** (30 comments) A long-standing "diamond lobster" rated issue regarding silent message loss in subagent orchestration. [Link](https://github.com/openclaw/openclaw/issues/44925)

## 5. Bugs & Stability
*   **P0 - Critical Crashes:**
    *   **Memory Leaks:** `prepared-model-catalog.worker.js` is causing runaway memory consumption (leaking 4-5GB/hr) ([#159662](https://github.com/openclaw/openclaw/issues/159662)).
    *   **Gateway Loops:** Shutdown failures and startup rejections due to "Worker environment inventory" errors are blocking stability ([#158126](https://github.com/openclaw/openclaw/issues/158126), [#160521](https://github.com/openclaw/openclaw/issues/160521)).
*   **Regression Alert:** Several users report that `2026.9.6` introduced `DataCloneError` on Windows cron jobs ([#161654](https://github.com/openclaw/openclaw/issues/161654)) and CPU pinning due to model catalog refresh loops ([#161379](https://github.com/openclaw/openclaw/issues/161379)).

## 6. Feature Requests & Roadmap Signals
*   **Spending Control:** There is sustained interest in per-agent daily spending limits to prevent runaway cloud costs ([#121729](https://github.com/openclaw/openclaw/issues/121729)).
*   **Monitoring:** Future versions are likely to include more granular Prometheus exporter metrics for provider usage windows, currently tracked in [#141276](https://github.com/openclaw/openclaw/pull/141276).

## 7. User Feedback Summary
Current user sentiment is strained. High-power users (managing fleet-scale gateways) are reporting that the transition to the most recent minor versions has necessitated manual, multi-hour interventions. The primary friction points are **environment-state fragility** (the "stuck DB" scenario) and **opaque failure modes** where agents fail to reply without providing actionable error logs.

## 8. Backlog Watch
*   **[#70903] Billing Cooldowns:** An important issue where billing errors lock providers for hours, even after the user has topped up credit. It remains stale despite being a UX release blocker. [Link](https://github.com/openclaw/openclaw/issues/70903)
*   **[#118785] QA Proofs:** Tracking primary QA proof for containers and external SDKs; lacks recent updates from maintainers. [Link](https://github.com/openclaw/openclaw/issues/118785)

---

## Cross-Ecosystem Comparison

### Cross-Project Analysis: Personal AI Agent Ecosystem (2026-10-01)

#### 1. Ecosystem Overview
The open-source AI agent ecosystem is currently in a "maturation-through-stress" phase, moving away from rapid prototyping toward architectural hardening and security-boundary enforcement. Most projects are grappling with the complexities of managing state in multi-agent orchestrations, specifically regarding local database growth and inter-process communication (IPC). As developer attention shifts from basic LLM integration to production-grade reliability, the primary friction points have migrated to environment-state fragility and cross-platform installation stability.

#### 2. Activity Comparison
| Project | Active Issues/PRs | Status | Health Score* |
| :--- | :--- | :--- | :--- |
| **OpenClaw** | ~990 | Critical (Firefighting) | 4/10 |
| **Hermes Agent** | ~100 | High Velocity | 8/10 |
| **IronClaw** | < 5 | Maintenance/Stagnant | 6/10 |
| **QwenPaw** | ~60 | Stabilizing | 7/10 |
| **ZeroClaw** | ~100 | Rapid Development | 8/10 |

*\*Health Score based on stability, PR-to-issue ratio, and backlog momentum.*

#### 3. OpenClaw’s Position
*   **Advantages:** OpenClaw maintains the most extensive feature set for fleet-scale management and complex subagent orchestration, making it the primary choice for enterprise or "power-user" deployments.
*   **Technical Differences:** Unlike the modular or TUI-focused peers, OpenClaw operates as a heavier gateway-server architecture, which currently exposes it to significant database (SQLite WAL) bottlenecks.
*   **Community:** By far the largest footprint, evidenced by the high volume of daily issues; however, this scale has turned into a liability, leading to a "diamond lobster" effect where critical bugs languish due to sheer issue volume.

#### 4. Shared Technical Focus Areas
*   **Database/Memory Management:** OpenClaw (WAL growth) and QwenPaw (embedding reindexing/token limits) share the challenge of managing runaway state data in local environments.
*   **Security Scoping:** Both ZeroClaw (principal-scoped boundaries) and Hermes Agent (terminal snapshots/sensitive env vars) are prioritizing robust security boundaries to prevent environment-level exposure.
*   **Desktop/CLI Parity:** A near-universal pain point is the "configuration drift" between CLI, Desktop, and Gateway, with Hermes Agent and QwenPaw both implementing specific fixes to unify these states.

#### 5. Differentiation Analysis
*   **OpenClaw (Enterprise/Scale):** Focused on fleet gateways and high-concurrency usage; currently struggling with performance debt.
*   **Hermes Agent (Desktop/UX):** Focused on the "assistant" experience, with heavy investment in TUI, UI polish, and voice interaction.
*   **QwenPaw (RAG/Orchestration):** Differentiated by its "ReMe" memory subsystem and support for multi-model ("Advisor/Worker") topologies.
*   **ZeroClaw (Security/Architecture):** Positioning itself as the high-trust, multi-tenant agent platform with a strict focus on v0.9.0 architectural separation.

#### 6. Community Momentum & Maturity
*   **Rapidly Iterating:** **ZeroClaw** and **Hermes Agent** exhibit the most productive, healthy momentum. They are successfully converting issues into merged PRs with high throughput.
*   **Stabilizing:** **QwenPaw** is in a calculated "beta-polishing" phase, using v2.2.2 as a milestone to resolve long-standing UX and stability debt.
*   **Stagnant/Maintenance:** **IronClaw** has effectively dropped off the radar for active development, suggesting that the project is either feature-complete or has lost its primary contributor base.

#### 7. Trend Signals
*   **The "Agentic Budget" Era:** There is clear demand (OpenClaw, QwenPaw) for cost-control mechanisms—users are no longer willing to run "black box" agents without granular, per-agent spending limits and token-usage monitoring.
*   **Doom Loop Fatigue:** Users are increasingly wary of autonomous agents entering infinite logic loops. The industry is responding with requests for "doom loop detection" and better human-in-the-loop interruption triggers.
*   **Local Data Risk:** As agents gain deeper access to host OS files (PowerPoint, terminal envs), security is becoming a primary selling point. Developers should prioritize "sandbox-off" protections and memory scrubbing in their roadmaps to retain user trust.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

## Hermes Agent Project Digest: 2026-10-01

### 1. Today's Overview
The Hermes Agent project remains in a state of high-velocity development, with 100 combined issues and PRs updated in the last 24 hours. The primary focus is currently on stabilizing the Desktop client and refining agent-tool interactions, with a clear trend toward hardening security boundaries and session state management. Overall project health is strong, characterized by active community participation and rapid PR-to-issue resolution cycles, though the high volume of incoming bug reports suggests increasing strain from the project's widening platform support.

### 2. Releases
*No new releases were published on 2026-10-01.*

### 3. Project Progress
Today’s merged PRs focused on resolving session inconsistencies and improving configuration accuracy:
* **[#118598](https://github.com/NousResearch/hermes-agent/pull/118598)**: Corrected gateway platform configuration precedence, ensuring `platforms.<plat>.extra` correctly overrides top-level blocks.
* **[#129741](https://github.com/NousResearch/hermes-agent/pull/129741)**: Resolved a critical session state bug where transcript refreshes caused duplicate message rendering.
* **[#129254](https://github.com/NousResearch/hermes-agent/pull/129254)**: Addressed a P1 silent failure in the Cron agent-mode worker.
* **[#129813](https://github.com/NousResearch/hermes-agent/pull/129813)**: (Closed via PR #129848) Enabled user-configurable URL scheme allowlisting for external apps like Obsidian and VS Code.

### 4. Community Hot Topics
* **[#109552](https://github.com/NousResearch/hermes-agent/issue/109552) (18 comments):** A community-driven label audit. The discussion emphasizes that labels are retrieval hints, not final dispositions, cautioning against the automated "bot-driven" cleanup of issues.
* **[#46260](https://github.com/NousResearch/hermes-agent/issue/46260) (17 comments):** Investigation into persistent Windows installer failures (exit code 1). This highlights ongoing challenges with cross-platform desktop distribution.
* **[#62336](https://github.com/NousResearch/hermes-agent/issue/62336) (9 comments):** A high-priority security concern regarding terminal snapshots capturing sensitive environment variables to disk. This is currently tracked as a significant security-boundary risk.

### 5. Bugs & Stability
* **Critical/High Severity:**
    * **[#62336](https://github.com/NousResearch/hermes-agent/issue/62336):** Terminal credential exposure (Security).
    * **[#129731](https://github.com/NousResearch/hermes-agent/issue/129731):** Desktop agent session duplicate rendering.
    * **[#129757](https://github.com/NousResearch/hermes-agent/issue/129757):** Desktop preview pane regression (fails to load HTTP URLs).
* **Fixes in progress:**
    * **[#129846](https://github.com/NousResearch/hermes-agent/pull/129846):** Defers barge-in interruption until voice confirmation, reducing UI frustration.
    * **[#129844](https://github.com/NousResearch/hermes-agent/pull/129844):** Unifies terminal environment configuration to prevent drifting settings between CLI and Gateway.

### 6. Feature Requests & Roadmap Signals
* **Mobile Expansion:** There is significant interest in native mobile clients ([#129292](https://github.com/NousResearch/hermes-agent/issue/129292)), as users demand a "real-time assistant" experience rather than just a terminal interface.
* **Doom Loop Detection:** User interest in agent-mode "Doom Loop" detection ([#512](https://github.com/NousResearch/hermes-agent/issue/512)) suggests a need for more robust, autonomous error handling during tool-use phases.
* **TUI Polish:** Continued refinement of the TUI "attention budget" ([#99773](https://github.com/NousResearch/hermes-agent/issue/99773)) indicates the team is prioritizing UX for power users.

### 7. User Feedback Summary
Users are generally satisfied with the tool's power but are reporting friction in three key areas:
1. **Desktop UX:** Navigation and tab management (e.g., wake words triggering the wrong chat window).
2. **Installation Reliability:** Particularly on Windows and complex Nix environments.
3. **Configuration Drift:** Users find it difficult to manage settings when CLI, Gateway, and Desktop components maintain inconsistent local configurations.

### 8. Backlog Watch
* **[#512](https://github.com/NousResearch/hermes-agent/issue/512):** "Doom Loop Detection" has been open since March 2026. This feature represents a significant leap in agent reliability but currently lacks a maintainer-assigned path to implementation.
* **[#70732](https://github.com/NousResearch/hermes-agent/issue/70732):** While partially addressed, the persistence of hardcoded English strings in messaging platforms remains a hurdle for internationalization, despite community offers to provide translations.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest – 2026-10-01

### 1. Today's Overview
The IronClaw project is currently in a state of low-intensity maintenance as of October 1, 2026. Activity is focused exclusively on automated infrastructure housekeeping rather than new feature development or bug fixing. With no active issues and only a single lingering automated PR, the project appears stable but currently inactive regarding community-driven contributions.

### 2. Releases
*No new releases have been published.*

### 3. Project Progress
*No PRs were merged or closed today.* 
The codebase remains in a holding pattern, with no functional changes introduced within the last 24 hours.

### 4. Community Hot Topics
There are currently no active discussions, issues, or PRs with high community engagement. The lack of open issues suggests that either the project has reached a high level of maturity or that current developer interest in the repository is minimal.

### 5. Bugs & Stability
*No bugs or regressions were reported today.*
The system appears stable, with no incoming reports of crashes or performance degradation.

### 6. Feature Requests & Roadmap Signals
There are no new feature requests logged today. The only ongoing work is related to [PR #7988](https://github.com/nearai/ironclaw/pull/7988), which automates the refresh of the codebase knowledge graph. This indicates a focus on maintaining the project's internal agentic memory structures rather than end-user facing capabilities.

### 7. User Feedback Summary
There is no recent user feedback to analyze. The absence of opened issues suggests that existing users are either satisfied with the current state or that the project has transitioned into a "maintenance-only" lifecycle phase.

### 8. Backlog Watch
*   **[PR #7988: chore(agents): refresh codebase knowledge graph](https://github.com/nearai/ironclaw/pull/7988)**
    *   **Status:** Open since 2026-08-29.
    *   **Observation:** This PR has been pending for over a month. While it is an automated task, the delay in merging suggests that either maintainer oversight is low or the automated verification process is currently blocked. This is the only active item in the repository and requires a manual review to finalize the knowledge graph update.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

## QwenPaw Project Digest: 2026-10-01

### 1. Today's Overview
QwenPaw shows high velocity on the final day of September, characterized by an intense focus on stability patches and refinements to its RAG (ReMe) and agent orchestration subsystems. With 19 active issues and 41 PRs updated in the last 24 hours, the project is maintaining an aggressive development pace, particularly around beta testing for v2.2.2. The high volume of open PRs compared to merged ones suggests that the team is currently in a "stabilization phase," prioritizing rigorous verification of edge-case bugs before full release.

### 2. Releases
*   **[v2.2.2-beta.4](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.2-beta.4)**: This beta release focuses on UI/UX polish and internal dependency management.
    *   **Key Changes**: Added a reranker UI configuration panel for the `ReMeLightMemoryCard` and bumped the core version to 2.2.2b4.
    *   **Performance**: Improved console performance through the modularization of chat dependencies.

### 3. Project Progress
Today saw 11 PRs merged or closed, primarily focused on fixing temporal and memory handling logic:
*   **[#8049](https://github.com/agentscope-ai/QwenPaw/pull/8049)**: Resolved a critical issue where chat transcript timestamps shifted due to incorrect DST/UTC offset freezing.
*   **[#8062](https://github.com/agentscope-ai/QwenPaw/pull/8062)**: Implemented a partial fix for embedding reindexing, ensuring that individual chunk failures don't cause the entire batch process to fail.
*   **[#8060](https://github.com/agentscope-ai/QwenPaw/pull/8060)**: Fixed context token under-reporting for Anthropic providers by correctly tracking cached input tokens.

### 4. Community Hot Topics
*   **[#7569 - Advisor Mode](https://github.com/agentscope-ai/QwenPaw/pull/7569)**: The community remains highly interested in this "Size/XXXL" PR. Users are keen on the ability to pair a high-power "Advisor" model with a cost-effective "Worker" agent, reflecting a strong demand for cost-optimized multi-agent reasoning.
*   **[#8040 - Embedding Reindex Failure](https://github.com/agentscope-ai/QwenPaw/issues/8040)**: This issue is sparking technical discussion regarding how RAG subsystems handle token-limit overflows, highlighting a pain point for users with large knowledge bases.

### 5. Bugs & Stability
The project is currently grappling with several high-impact bugs identified today:
*   **[#8042](https://github.com/agentscope-ai/QwenPaw/issues/8042) (High)**: Tool-generated files are auto-fed back into models that don't support file formats, causing internal errors. 
*   **[#8064](https://github.com/agentscope-ai/QwenPaw/issues/8064) (High)**: DeepSeek integration currently suffers from a session-breaking bug where sending a PDF results in subsequent 400 errors.
*   **[#8002](https://github.com/agentscope-ai/QwenPaw/issues/8002) (Medium)**: Sandbox-off configurations on Windows allow agents to accidentally close host applications (like PowerPoint), posing a risk to user data.

### 6. Feature Requests & Roadmap Signals
*   **[#7945](https://github.com/agentscope-ai/QwenPaw/issues/7945)**: Users are requesting better filtering for "@ALL" mentions in IM integrations (Feishu/DingTalk) to prevent unnecessary agent triggers.
*   **[#7997](https://github.com/agents-cope-ai/QwenPaw/issues/7997)**: Significant demand for message editing and retraction in the WebUI to help maintain "clean" conversation contexts for downstream agents.
*   *Prediction*: Expect the next minor version to include refined "Loop Modes" and enhanced control over background task notifications as indicated by PR [#8063](https://github.com/agentscope-ai/QwenPaw/pull/8063).

### 7. User Feedback Summary
Current user sentiment highlights a friction point between the power of the tool (complex agent orchestration) and the reliability of its UI/Runtime. Users are frustrated by "silent failures" in background tasks and timeouts when dealing with large local data (e.g., skill pool imports). The shift toward more robust error feedback—seen in the recent flurry of PRs—is highly welcomed by the community.

### 8. Backlog Watch
*   **[#5861](https://github.com/agentscope-ai/QwenPaw/pull/5861)**: A long-standing issue regarding macOS login-shell PATH resolution. This has been under review since July and continues to hinder users trying to use local shell-based tools from the desktop app. 
*   **[#5170](https://github.com/agentscope-ai/QwenPaw/pull/5170)**: An important performance enhancement for agent-list loading that has been pending since June; it is a prime candidate for a refresh by the core maintainers.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest - 2026-10-01

## 1. Today's Overview
ZeroClaw is currently in a high-intensity development sprint, characterized by an exceptionally high volume of activity (50 active issues and 50 active PRs in the last 24 hours). The project is aggressively hardening its security posture and architecture in preparation for the v0.9.0 release. Development is heavily focused on multi-tenancy, principal-scoped security boundaries, and decoupling the gateway from the core runtime.

## 2. Releases
*   **No new releases** were issued in the last 24 hours. The project remains focused on stabilizing the upcoming v0.9.0 release.

## 3. Project Progress
Work today focused on refining infrastructure and security protocols:
*   **CI/CD Hardening:** PR [#11293](https://github.com/zeroclaw-labs/zeroclaw/pull/11293) was merged to fix stale metadata checks in PR risk reports, ensuring CI stability.
*   **ZeroCode Fixes:** PR [#11290](https://github.com/zeroclaw-labs/zeroclaw/pull/11290) was merged, ensuring that chat context additions now correctly preserve undo history.
*   **Documentation:** PR [#11284](https://github.com/zeroclaw-labs/zeroclaw/pull/11284) updated plugin documentation to clarify name-conflict resolution and build guidance.

## 4. Community Hot Topics
*   **[Tracker]: Maintainer decision queue (#8692):** With 15 comments, this tracker remains the central hub for architectural RFCs and design coordination. It reflects a need for structured decision-making as the codebase scales.
*   **[Feature]: Per-sender RBAC (#5982):** With 11 comments, this is the primary bottleneck for multi-tenant deployment support, indicating high demand for granular access control in enterprise environments.
*   **RFC: PR review evidence (#10366):** Closed after 10 comments, this established new, expedited protocols for PR reviews, showing a concerted effort to increase developer velocity.

## 5. Bugs & Stability
The project is currently prioritizing S0/S1 security and workflow-blocking issues:
*   **Critical (S0) Security Risks:** Active work is ongoing to address systemic scoping failures, including per-agent attribution for knowledge graphs ([#9647](https://github.com/zeroclaw-labs/zeroclaw/issues/9647)), session tool ownership ([#9646](https://github.com/zeroclaw-labs/zeroclaw/issues/9646)), and principal scope bypasses ([#11198](https://github.com/zeroclaw-labs/zeroclaw/issues/11198)).
*   **Workflow Blockers (S1):** 
    *   [#11237](https://github.com/zeroclaw-labs/zeroclaw/issues/11237): Config editor failing to write declarative cron schedules.
    *   [#11294](https://github.com/zeroclaw-labs/zeroclaw/issues/11294): Flaky tests in the parallel runtime daemon causing CI instability.
*   **Recent Fixes:** Several test-related PRs (e.g., [#11321](https://github.com/zeroclaw-labs/zeroclaw/pull/11321), [#11312](https://github.com/zeroclaw-labs/zeroclaw/pull/11312)) are actively addressing environment-specific flakes on macOS.

## 6. Feature Requests & Roadmap Signals
*   **Roadmap Focus (v0.9.0):** The primary focus is clearly defined by Tracker [#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432), which encompasses Phase 3 gateway separation.
*   **Plugin Ecosystem:** Feature [#10995](https://github.com/zeroclaw-labs/zeroclaw/issues/10995) (verified plugin updates) and [#11003](https://github.com/zeroclaw-labs/zeroclaw/issues/11003) (plugin webhooks) indicate the roadmap is moving toward a more robust, stable plugin management system.
*   **Knowledge Retrieval:** RFC [#11235](https://github.com/zeroclaw-labs/zeroclaw/issues/11235) for a "Knowledge corpus" suggests a high-priority push toward standardized RAG (Retrieval-Augmented Generation) capabilities.

## 7. User Feedback Summary
*   **Developer Experience:** Users report friction with "blind" tool failures (e.g., [#11215](https://github.com/zeroclaw-labs/zeroclaw/issues/11215) regarding provider compatibility) and flaky test suites.
*   **Functional Gaps:** Users have identified inconsistencies in channel handling, such as WhatsApp failing to process images ([#10975](https://github.com/zeroclaw-labs/zeroclaw/issues/10975)), which are currently being addressed via pending features ([#11255](https://github.com/zeroclaw-labs/zeroclaw/issues/11255)).

## 8. Backlog Watch
*   **[#8907](https://github.com/zeroclaw-labs/zeroclaw/issues/8907):** The Zerocode unified plugin/capability catalog pane has been in a "blocked" status, awaiting integration with updated RPC/catalog APIs.
*   **[#11001](https://github.com/zeroclaw-labs/zeroclaw/issues/11001):** The completion of local IPC coverage for the external gateway remains a key, high-risk dependency for the v0.9.0 release that requires maintainer progression.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/jinming1345/agents-radar).*