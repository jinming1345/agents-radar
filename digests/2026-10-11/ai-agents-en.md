# OpenClaw Ecosystem Digest 2026-10-11

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-10-11 01:13 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest - 2026-10-11

## 1. Today's Overview
The OpenClaw repository is experiencing an intense surge of maintenance activity, with 500 issues and 500 PRs updated within the last 24 hours. The project is currently navigating a period of high instability, characterized by significant regressions in gateway performance, SQLite database bloat, and cross-platform (Windows/macOS) update failures. Maintenance efforts are heavily focused on "pragmatic simplification"—a massive, ongoing refactoring campaign aimed at deduplicating worker lifecycle paths and migrating UI elements to Solid 2.

## 2. Releases
*   **v2026.10.1**: This release focuses on state and session robustness.
    *   **Highlights**: Improved cross-registry session preservation, remote workspace worker attachments, and embedding cache migrations.
    *   **Fixes**: Aligned continuation signatures and prevented queued cancellations/aliases from stalling active turns.

## 3. Project Progress
Refactoring is the dominant theme of today’s merged and active PRs, spearheaded by heavy maintainer activity:
*   **UI Modernization**: A series of large-scale PRs are migrating legacy Lit-based components (Plugins, Skills, Chat leaf elements, and Model settings) to **Solid 2** (e.g., [PR #168758](https://github.com/openclaw/openclaw/pull/168758), [PR #168762](https://github.com/openclaw/openclaw/pull/168762)).
*   **Gateway Performance**: [PR #168649](https://github.com/openclaw/openclaw/pull/168649) addresses health check stalls in large agent fleets, a critical fix for enterprise users.
*   **Lifecycle Cleanup**: Efforts are underway to simplify worker/environment bookkeeping to reduce redundant runtime overhead ([PR #168747](https://github.com/openclaw/openclaw/pull/168747)).

## 4. Community Hot Topics
*   **[Issue #143524](https://github.com/openclaw/openclaw/issues/143524)** (117 comments): A critical P0 bug where the Agent SQLite WAL grows to gigabytes, causing boot-time lockouts on Windows. Users are currently forced to perform manual `wal_checkpoint` resets.
*   **[Issue #149538](https://github.com/openclaw/openclaw/issues/149538)** (26 comments): A recently closed P0 issue regarding gateway event-loop starvation in large fleets. Despite closure, related performance work remains high-priority.

## 5. Bugs & Stability
Stability is currently the project's primary bottleneck.
*   **Critical (P0/Release Blockers)**:
    *   [Issue #168307](https://github.com/openclaw/openclaw/issues/168307): Windows gateway CPU grind and connection refusals following upgrades.
    *   [Issue #160959](https://github.com/openclaw/openclaw/issues/160959): Plugin capture triggers multi-minute event loop blocks during startup.
    *   [Issue #158390](https://github.com/openclaw/openclaw/issues/158390): Temp dir bloat in `plugin-captures` leading to disk exhaustion.
*   **Regression**: [Issue #162119](https://github.com/openclaw/openclaw/issues/162119) reports intermittent 403 Forbidden errors for Codex-backed conversations after model switches.

## 6. Feature Requests & Roadmap Signals
*   **Headless Browser**: A highly requested P3 feature to bundle a native Chromium instance for reliable web access ([Issue #53763](https://github.com/openclaw/openclaw/issues/53763)).
*   **Kubernetes Optimization**: Demand for improved Helm-based deployment docs is rising as enterprise fleet sizes grow ([Issue #91455](https://github.com/openclaw/openclaw/issues/91455)).
*   **Tiered Bootstrap**: A proposal to optimize token usage by tiering bootstrap file loading ([Issue #22438](https://github.com/openclaw/openclaw/issues/22438)) remains a pending product decision.

## 7. User Feedback Summary
Users are frustrated with "silent failures," particularly regarding message delivery in Telegram and Codex agents. The reliance on manual workarounds for routine upgrades (Doctor tool issues, hardlink namespace validation) and the high cost of token consumption for re-injecting bootstrap files are the most cited points of friction. Sentiment is polarized: users appreciate the agent's capability but are wary of the current "instability sprint."

## 8. Backlog Watch
*   **[Issue #40001](https://github.com/openclaw/openclaw/issues/40001)**: The `write` tool lacks an append mode, causing silent data loss in shared workspace files; this has been open since March 2026.
*   **[Issue #101929](https://github.com/openclaw/openclaw/issues/101929)**: The context-overflow estimator significantly over-counts tokens (2.3–2.6x), causing premature truncation. This remains a significant barrier for complex, long-running agent tasks.

---

## Cross-Ecosystem Comparison

# Cross-Project Ecosystem Report: 2026-10-11

## 1. Ecosystem Overview
The personal AI assistant and agentic framework ecosystem is currently in a "Hardening Phase," pivoting from rapid prototyping to enterprise-grade stability and architecture cleanup. Across all major projects, the primary engineering focus has shifted toward solving state management, gateway reliability, and long-context performance. While the ecosystem remains highly active, developers are increasingly prioritizing the mitigation of technical debt and critical infrastructure bugs over new feature delivery to address "session fatigue" and performance regressions.

## 2. Activity Comparison
| Project | Issues/PR Activity (24h) | Release Status | Health Score (1-10) |
| :--- | :--- | :--- | :--- |
| **OpenClaw** | ~1000 (Very High) | Recent (v2026.10.1) | 4 (Unstable) |
| **Hermes Agent**| ~100 (High) | Stagnant | 6 (Recovering) |
| **IronClaw** | ~1 (Very Low) | None | 3 (Neglected) |
| **QwenPaw** | ~34 (High) | Stagnant | 7 (Robust) |
| **ZeroClaw** | ~67 (High) | Stagnant | 6 (Hardening) |

*Note: Health score is a subjective estimate based on reported stability, PR velocity, and backlog management.*

## 3. OpenClaw’s Position
OpenClaw serves as the primary "Engine" of the ecosystem, operating at a scale and complexity level significantly higher than its peers.
*   **Advantages:** Its aggressive refactoring campaign (Solid 2 migration, worker lifecycle simplification) ensures long-term scalability that smaller projects lack.
*   **Technical Differences:** Unlike Hermes or ZeroClaw, which focus on session-owner architectures, OpenClaw is built to support massive, multi-tenant agent fleets, leading to more complex (and currently more fragile) SQLite/Gateway infrastructure.
*   **Community:** OpenClaw maintains the largest active contributor base, though it is currently suffering from "growth pains" that smaller, more specialized projects like QwenPaw are avoiding.

## 4. Shared Technical Focus Areas
*   **Gateway/Session Stability:** OpenClaw, Hermes, and ZeroClaw are all aggressively rewriting session-management logic to prevent event-loop starvation and state corruption.
*   **Cross-Platform Performance:** QwenPaw and OpenClaw are actively battling Windows-specific path and filesystem bottlenecks.
*   **Context/Budget Management:** Hermes and OpenClaw are receiving significant feedback regarding cost-accuracy and the failure of context-overflow estimators, pointing to a systemic issue in how LLM token counting is abstracted.

## 5. Differentiation Analysis
*   **Targeting:** **OpenClaw** targets enterprise fleet management; **QwenPaw** is focusing on consumer-facing UI/UX and console stability; **Hermes** is carving out a niche in high-level automation (Kanban/Pull Request workflows); **ZeroClaw** is prioritizing developer tooling and CI/CD-integrated runtime testing.
*   **Architecture:** OpenClaw uses a centralized "worker lifecycle" approach; Hermes is implementing the "One Gateway" session model; QwenPaw relies on a modular plugin-host architecture.

## 6. Community Momentum & Maturity
*   **Rapid Iteration:** OpenClaw and ZeroClaw are the current pace-setters for architectural evolution.
*   **Stability/Refinement:** QwenPaw stands out as the most mature in terms of current release-cycle stability, prioritizing specific user-reported bugs over major architectural shifts.
*   **Stagnation:** IronClaw appears to be losing developer mindshare, currently acting more as a legacy repository than an active development platform.

## 7. Trend Signals
*   **"Silent Failure" Intolerance:** Users are increasingly vocal about agents that fail silently (e.g., dropped messages, lost images, stalled workflows). Reliability is now being valued higher than raw capability.
*   **Configuration Friction:** There is a growing industry requirement for standardized, easy-to-configure "Provider Lists." Projects that fail to offer "plug-and-play" compatibility for OpenAI-compatible endpoints (e.g., IronClaw) are seeing immediate negative community impact.
*   **Multimodal Resilience:** The demand for image downscaling and robust vision-based interaction support (Hermes, ZeroClaw) confirms that agents are expected to handle complex media as a baseline, not a luxury feature.
*   **Lifecycle Management:** The industry is moving away from "persistent sessions" toward "resumable workflows," where state is frequently externalized to prevent database bloat and memory leaks.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest: 2026-10-11

### 1. Today's Overview
The Hermes Agent project is currently experiencing an intense period of high-velocity development and stabilization. With 100 total items updated across issues and PRs in the last 24 hours, the community is heavily focused on refining the "One Gateway" session architecture and addressing stability regressions in the desktop and CLI environments. While feature expansion continues—particularly in plugin catalog support and dashboard localization—the current priority is resolving session persistence and state corruption bugs to ensure reliable agent performance.

### 2. Releases
*No new releases identified for 2026-10-11.*

### 3. Project Progress
Today's PR activity centers on infrastructure hardening and cost-accuracy:
* **Cost Accuracy:** PR [#136380](https://github.com/NousResearch/hermes-agent/pull/136380) and [#109994](https://github.com/NousResearch/hermes-agent/pull/109994) address critical billing discrepancies by implementing correct long-context pricing for OpenAI, Anthropic, and OpenRouter routes.
* **Session Management:** PR [#136375](https://github.com/NousResearch/hermes-agent/pull/136375) provides a necessary fix to free up `max_concurrent_sessions` slots when a chat is archived.
* **Localization & Plugins:** PR [#130634](https://github.com/NousResearch/hermes-agent/pull/130634) introduces Simplified Chinese localization for the dashboard. Additionally, community-contributed tools for address parsing ([#136368](https://github.com/NousResearch/hermes-agent/pull/136368)), search ([#136369](https://github.com/NousResearch/hermes-agent/pull/136369)), and calendar integration ([#136370](https://github.com/NousResearch/hermes-agent/pull/136370)) have been submitted to the Plugin Catalog.

### 4. Community Hot Topics
* **[#131859](https://github.com/NousResearch/hermes-agent/issues/131859): API Pull Request Failure (24 comments)** – Users are struggling with `CreatePullRequest` permission errors. The volume of comments suggests this is impacting automated CI/CD workflows and developer-agent integration.
* **[#119070](https://github.com/NousResearch/hermes-agent/issues/119070): Kanban Dispatcher Stuck (15 comments)** – A deep-seated issue where retried rate-limited tasks remain blocked indefinitely. This indicates a potential logic flaw in the `check_respawn_guard` mechanism.
* **[#131055](https://github.com/NousResearch/hermes-agent/issues/131055): Linux Sandbox Poisoning (11 comments)** – A high-severity issue where secondary desktop launches cause a `SIGILL` loop. This is critical for Linux power users relying on deeplinks.

### 5. Bugs & Stability
* **High Severity (P0/P1):**
    * [#136216](https://github.com/NousResearch/hermes-agent/issues/136216): Images sent via API are lost upon session rebuild (critical for vision-based workflows).
    * [#131578](https://github.com/NousResearch/hermes-agent/issues/131578): Subagent completion stalling the primary chat route for 30 minutes.
    * [#136191](https://github.com/NousResearch/hermes-agent/pull/136191): Agent fails to persist interrupted partial replies; fix is currently in PR.
* **Medium Severity (P2):**
    * [#136350](https://github.com/NousResearch/hermes-agent/issues/136350): Compression threshold miscalculation (firing at 256k instead of 512k).
    * [#127260](https://github.com/NousResearch/hermes-agent/issues/127260): In-flight tool-call argument corruption during context compression.

### 6. Feature Requests & Roadmap Signals
* **Cross-Platform Continuity:** Issue [#79198](https://github.com/NousResearch/hermes-agent/issues/79198) remains a high-interest feature for config-driven session groups to unify memories across Discord, Telegram, and CLI.
* **Budget Controls:** Issue [#135039](https://github.com/NousResearch/hermes-agent/issues/135039) for `MEMORY.md` size budgeting is gaining traction, signaling a user demand for more granular control over long-term agent context costs.
* **"One Gateway" Transition:** PR [#106742](https://github.com/NousResearch/hermes-agent/pull/106742) is the massive underlying refactor that will likely define the next major version, aiming to centralize all surface interactions into a single session owner.

### 7. User Feedback Summary
Users are experiencing "session fatigue" due to bugs in state persistence and the inability to "close" sessions without deleting them (Issue [#75489](https://github.com/NousResearch/hermes-agent/issues/75489)). The recurring mention of context corruption and "stuck" kanban tasks suggests that while the agent is powerful, the current stability of the state management layer is causing frustration for users attempting long-running automation tasks.

### 8. Backlog Watch
* **[#59764](https://github.com/NousResearch/hermes-agent/issues/59764):** A long-standing (since July) issue regarding dispatch-contract mismatches between user profiles and kanban tasks. It is currently "silent" in its impact, meaning users lose functionality without clear error messaging.
* **[#24145](https://github.com/NousResearch/hermes-agent/pull/24145):** A feature request for `cron` toolset flags submitted in May; it remains open as the project focuses on core architectural stability.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest – 2026-10-11

### 1. Today's Overview
IronClaw activity remains extremely quiet as of October 11, 2026, with no new pull requests or releases recorded in the last 24 hours. Maintenance efforts are currently focused on clearing out legacy technical debt, as evidenced by the closure of a long-standing issue from earlier this year. Community engagement is low but reflects a critical need for better documentation and onboarding clarity regarding provider integration.

### 2. Releases
*No new releases were published in the last 24 hours.*

### 3. Project Progress
*   **Closed Issue:** [Issue #1047](https://github.com/nearai/ironclaw/issues/1047) was closed. This issue, originally opened in March 2026 regarding authentication failures with DeepSeek, appears to have been resolved or deemed obsolete by the reporter.

### 4. Community Hot Topics
*   **[Issue #8131: Is this a joke? (ironclaw onboard provider list)](https://github.com/nearai/ironclaw/issues/8131)**
    *   **Analysis:** This is the most active current topic, highlighting a potential discrepancy between the project's marketing/documentation and the actual out-of-the-box user experience. The user appears frustrated that the "more than twenty" supported providers advertised in the docs are not immediately accessible or clearly configured upon initialization. This points to a need for better "getting started" flows or clearer error messaging when configuring external APIs.

### 5. Bugs & Stability
*   **[Issue #8131](https://github.com/nearai/ironclaw/issues/8131) (Medium Severity):** While framed as a documentation/onboarding issue, it implies that users are encountering friction when attempting to connect to the advertised OpenAI-compatible endpoints. 
*   **Fix Status:** No PRs are currently addressing this user feedback.

### 6. Feature Requests & Roadmap Signals
There are no formal feature requests submitted today. However, based on the activity in #8131, the community is signaling a high priority for:
*   **Improved Provider Onboarding:** A streamlined interface or CLI command to verify and test "OpenAI-compatible" endpoint configurations.
*   **Documentation Audit:** Verification that the list of supported providers is accurate and reflects the current capabilities of the stable release.

### 7. User Feedback Summary
Current user sentiment reflects dissatisfaction with **onboarding friction**. Users are expecting a "plug-and-play" experience for the twenty-plus providers mentioned in the documentation but are finding that the setup process is either opaque or insufficient for third-party endpoints. The lack of documentation updates or community-facing response to these hurdles is a potential drag on adoption.

### 8. Backlog Watch
*   **[Issue #8131](https://github.com/nearai/ironclaw/issues/8131):** This issue requires urgent attention from maintainers to clarify whether the "twenty providers" claim is supported by current code or if the documentation requires immediate correction. Failure to address this risks the project being perceived as misleading by new users.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest (2026-10-11)

### 1. Today's Overview
QwenPaw shows high velocity and a strong focus on stability today, with 34 total items updated. The engineering team has aggressively addressed long-standing console interface bugs and file system management issues, with a significant number of PRs being merged to resolve user-reported crashes. The overall project health is robust, characterized by rapid response cycles to UI/UX regressions and a proactive approach to Windows-specific compatibility challenges.

### 2. Releases
*No new releases identified for this period.*

### 3. Project Progress
Today saw a significant cleanup of the codebase, with 11 PRs merged, primarily targeting console stability:
*   **Console Recovery:** PR [#8154](https://github.com/agentscope-ai/QwenPaw/pull/8154) was the highlight of the day, successfully patching major issues related to "lazy" page load failures and WebView2 cache staleness (addressing issues [#8120](https://github.com/agentscope-ai/QwenPaw/issue/8120), [#8094](https://github.com/agentscope-ai/QwenPaw/issue/8094), [#7815](https://github.com/agentscope-ai/QwenPaw/issue/7815), and [#7074](https://github.com/agentscope-ai/QwenPaw/issue/7074)).
*   **File Management:** PR [#8149](https://github.com/agentscope-ai/QwenPaw/pull/8149) improved directory refresh logic, ensuring expanded folders remain accurate.
*   **Model Compatibility:** PR [#8165](https://github.com/agentscope-ai/QwenPaw/pull/8165) enables better handling of OpenAI-compatible providers that send content only via terminal events, fixing silent session interruptions ([#8162](https://github.com/agentscope-ai/QwenPaw/issue/8162)).

### 4. Community Hot Topics
*   **[#8162] OpenAI Response API Stream Bug:** (7 comments) Users were hitting session crashes due to incomplete parsing of OpenAI-compatible streaming events. The issue was quickly diagnosed and addressed in PR [#8165](https://github.com/agentscope-ai/QwenPaw/pull/8165).
*   **[#8120] Persistent Page Loading Failures:** (5 comments) This was a pervasive issue across multiple user devices; the community pressure likely accelerated the comprehensive fix landed in PR [#8154](https://github.com/agentscope-ai/QwenPaw/pull/8154).

### 5. Bugs & Stability
*   **[Critical] [#8153] RCE via MCP Driver:** A major security report detailing a remote code execution vulnerability via the MCP Driver configuration interface. This represents the highest severity issue currently active.
*   **[High] [#8163] Windows Long Path Errors:** Windows users are experiencing `STORAGE_INTEGRITY_ERROR` and `CAS_CONFLICT` when using the `qwenpaw-creator` plugin due to path length limits. A fix PR [#8167](https://github.com/agentscope-ai/QwenPaw/pull/8167) is currently under review.
*   **[Medium] [#8172] Intermittent Silence in Console:** Some users report sessions ending abruptly without model output for specific agent types, currently under investigation.
*   **[Medium] [#8150] Inbound Feishu Image Loss:** Rich-text posts containing images in the Feishu channel are currently dropping media silently.

### 6. Feature Requests & Roadmap Signals
*   **HarmonyOS Support:** PR [#8164](https://github.com/agentscope-ai/QwenPaw/pull/8164) introduces a native HarmonyOS client, signaling an expansion of the ecosystem beyond standard desktop/mobile environments.
*   **Plugin Management:** PR [#7565](https://github.com/agentscope-ai/QwenPaw/pull/7565) for rollback-safe hot reloads suggests a roadmap focused on improving developer experience and plugin ecosystem resilience.

### 7. User Feedback Summary
Users are largely focused on "stability-first" improvements. The recent influx of bug fixes has been well-received, but there is lingering frustration regarding the "brittleness" of the console UI on Windows. Users are also highlighting the need for better error messaging—specifically, wanting more descriptive feedback than a generic "Page load failed" screen.

### 8. Backlog Watch
*   **[#7311] Missing Backend Module:** This issue regarding `_qwenpaw_remote_backend` preventing agent tools from functioning remains open since August. It is critical for users on `v2.1.1b2` and requires urgent resolution to restore basic tool functionality.
*   **[#8082] Heartbeat Documentation:** This request to clarify runtime semantics for heartbeats remains open. As users increasingly rely on long-running tasks, clear documentation is becoming a necessity to prevent configuration confusion.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest: 2026-10-11

## 1. Today's Overview
ZeroClaw is experiencing a high-velocity development cycle, characterized by intense efforts to stabilize the runtime and gateway architecture ahead of the v0.8.6 and v0.9.0 releases. With 67 total updates across issues and PRs in the last 24 hours, the project remains highly active, shifting focus toward robustness, rate-limit handling, and developer experience. The current technical landscape is dominated by hardening test fixtures for parallel execution and resolving complex state management bugs in messaging channels.

## 2. Releases
*No new releases were published in the last 24 hours.*

## 3. Project Progress
*   **ZeroCode Stability:** [#10801](https://github.com/zeroclaw-labs/zeroclaw/pull/10801) was merged, allowing ZeroCode sessions to resync after notification lag without force-canceling running turns, a significant win for UX stability.
*   **Plugin Infrastructure:** [#11356](https://github.com/zeroclaw-labs/zeroclaw/pull/11356) was merged to ensure robust recovery when a channel plugin instance encounters a trap, enhancing runtime resilience.
*   **Deployment Metrics:** [#11306](https://github.com/zeroclaw-labs/zeroclaw/pull/11306) successfully integrated binary footprint tracking into the CI pipeline, crucial for managing the 64 MiB release size cap.

## 4. Community Hot Topics
*   **[#9965](https://github.com/zeroclaw-labs/zeroclaw/issues/9965) (15 comments):** This tracking issue regarding hardening runtime-written test fixtures remains the most discussed technical debt item. The community interest reflects the project's shift toward high-concurrency reliability.
*   **[#9887](https://github.com/zeroclaw-labs/zeroclaw/issues/9887) (7 comments):** The demand for downscaling large images rather than rejecting them highlights a core user need for seamless multimodal agent interactions.

## 5. Bugs & Stability
*   **S1 - Workflow Blocked:**
    *   [#11608](https://github.com/zeroclaw-labs/zeroclaw/issues/11608) & [#11615](https://github.com/zeroclaw-labs/zeroclaw/issues/11615): Telegram channels are suffering from permanent listener stalls and flawed 429 retry logic. **Fix in progress:** [#11650](https://github.com/zeroclaw-labs/zeroclaw/pull/11650) and [#11651](https://github.com/zeroclaw-labs/zeroclaw/pull/11651).
    *   [#11614](https://github.com/zeroclaw-labs/zeroclaw/issues/11614): Critical memory leak in `map_key_sections` causing daemon growth.
    *   [#11648](https://github.com/zeroclaw-labs/zeroclaw/issues/11648): Web dashboard pairing UI is misaligned with the new 32-character security policy.
*   **S2 - Degraded Behavior:**
    *   [#11632](https://github.com/zeroclaw-labs/zeroclaw/issues/11632): GPU-intensive idle behavior in the Linux Tauri desktop app.

## 6. Feature Requests & Roadmap Signals
*   **Developer Tooling:** The effort to record "holding-crate" exceptions ([#11555](https://github.com/zeroclaw-labs/zeroclaw/pull/11555), [#11652](https://github.com/zeroclaw-labs/zeroclaw/pull/11652)) signals a structured approach to architectural boundaries, likely to be codified in the v0.8.6 release.
*   **Operational Clarity:** [#11620](https://github.com/zeroclaw-labs/zeroclaw/issues/11620) (message timestamps in ZeroCode) is a high-visibility, low-risk enhancement likely to be fast-tracked to improve debugging for users.

## 7. User Feedback Summary
Users are currently grappling with the friction between security hardening (e.g., stricter pairing codes) and UI/UX consistency. The "silent failure" of queued messages in ZeroCode ([#11618](https://github.com/zeroclaw-labs/zeroclaw/issues/11618)) and the dropping of tool calls in prose ([#10446](https://github.com/zeroclaw-labs/zeroclaw/pull/10446)) represent significant points of frustration that the team is actively prioritizing.

## 8. Backlog Watch
*   **[#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432):** The Phase 2/3 tracker is long-standing. It is the primary "source of truth" and requires continued monitoring as it tracks the gateway separation milestone for v0.9.0.
*   **[#10391](https://github.com/zeroclaw-labs/zeroclaw/pull/10391):** A massive, long-running PR regarding delegate workspace boundaries. Its complexity and size make it a high-risk integration that needs maintainer consensus to move forward.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/jinming1345/agents-radar).*