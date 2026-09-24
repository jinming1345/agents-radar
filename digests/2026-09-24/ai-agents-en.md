# OpenClaw Ecosystem Digest 2026-09-24

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-24 00:52 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest - 2026-09-24

## 1. Today's Overview
OpenClaw is currently experiencing a period of intense instability following the release of v2026.9.6, characterized by high volumes of "crash-loop" reports and deployment blockers. Maintenance activity is exceptionally high, with 500 issues and 500 PRs updated in the last 24 hours alone, indicating a massive community effort to stabilize the gateway. The project is shifting focus toward emergency hotfixes for macOS, Windows service persistence, and addressing critical regression bugs from the recent v2026.9.4–9.5 cycle.

## 2. Releases
*   **v2026.9.6:** **CRITICAL WARNING.** This version has been withdrawn from the Sparkle feed due to a severe bug (#156861) that causes the macOS app to crash on launch. Users who updated are advised to downgrade to v2026.9.5. A hotfix (v2026.9.7) is currently in development.

## 3. Project Progress
*   **Maintenance & Cleanup:** Multiple PRs focused on "desloping" (reducing redundant logic) in core modules like `memory-core` (#156867) and `feishu` (#156832) to improve long-term stability.
*   **CI/CD Optimization:** Significant progress in streamlining security reviews and dependency management (#156857, #155743) to reduce build times and avoid redundant job triggers.
*   **Stability Enhancements:** PR #156881 is actively addressing the macOS crash-loop triggered by the v2026.9.6 update.

## 4. Community Hot Topics
*   **#91588 (Gateway Memory Leak):** [39 comments] The most critical ongoing infrastructure concern; persistent OOM crashes on gateway nodes.
*   **#126360 (AgentSelectionRequiredError):** [19 comments] High frustration regarding multi-agent ownership logic and RPC failures in the Control UI.
*   **#80319 (QA Tool Defaults):** [17 comments] Discussion on the architecture of Codex-native tools vs. OpenClaw dynamic tool parity.
*   **#148707 (Message Loss Regression):** [16 comments] Significant concern regarding turn displacement and loss of reply history in recent versions.

## 5. Bugs & Stability
*   **P0 (Release Blockers):**
    *   **#156861:** macOS app unlaunchable after v2026.9.6 update. [Fix in progress: #156881]
    *   **#152981:** Gateway startup hang (up to 17m) on Windows 11.
    *   **#146860:** Managed update handoff failures on Windows due to `InteractiveToken` issues.
*   **P1 (High Impact):**
    *   **#148707:** Message loss during displaced interactive turns.
    *   **#138272:** Realtime voice (Talk) drops on Android when tool-using turns are required.
    *   **#148650:** 401 auth failures in memory indexer subprocesses.

## 6. Feature Requests & Roadmap Signals
*   **#44309:** Request for one-way dispatch mode for agent-to-agent (A2A) handoffs to reduce noise.
*   **#71058:** Support for multiple Azure/Teams bots on a single gateway instance.
*   **#138279:** Demand for official Linux aarch64 (arm64) companion builds.
*   *Prediction:* Given the current focus on reliability, features will likely be deprioritized in the next version (v2026.9.7) in favor of the existing "clawsweeper" recovery effort.

## 7. User Feedback Summary
Users are currently dissatisfied with the update reliability, specifically citing broken automated upgrades on Linux and macOS. There is significant friction regarding "lost" work—specifically, message loss during turn displacement and memory indexer failures preventing effective long-term agent memory usage. The "clawsweeper" labels indicate a strong community sentiment that the project's stability needs to catch up to its rapid feature development.

## 8. Backlog Watch
*   **#40982 (CLI Watchdog):** Request to raise or remove the 3-minute no-output cap on long-running requests; remains a major limitation for power users.
*   **#51572 (Session-memory hooks):** Request for more granular triggers on session reset/prune to ensure better state management.
*   **#85030 (MCP tool injection):** A complex issue regarding subagent tool injection that requires product-level decisions and security review.

---

## Cross-Ecosystem Comparison

## Cross-Project Analysis: Personal AI Agent Ecosystem (2026-09-24)

### 1. Ecosystem Overview
The open-source AI agent ecosystem is currently transitioning from a "feature-first" growth phase to a "reliability-hardened" maturity phase. A common pattern across all projects is a significant surge in technical debt reduction, security auditing, and stabilization efforts, often triggered by user pushback against breaking releases. While the market remains fragmented, there is a clear convergence toward formalizing multi-tenant architectures, secure plugin runtimes (WASM), and robust state management for long-running agent sessions.

### 2. Activity Comparison

| Project | Recent Activity | Release Status | Primary Focus | Health Score |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | Extreme (500+ items) | Instability (Recall) | Recovery/Stability | Low (High Churn) |
| **Hermes** | Moderate (100 items) | None | Data Integrity | Moderate |
| **IronClaw** | Low | RC Pending | Security/Arch | High (Stable) |
| **QwenPaw** | High (61 items) | Mature (v2.2) | Enterprise Hub | High |
| **ZeroClaw** | High (50 PRs) | None | Runtime Security | Moderate |

*Health Score: Subjective assessment based on current release stability vs. maintenance backlog.*

### 3. OpenClaw’s Position
OpenClaw serves as the industry’s "high-velocity/high-risk" core reference. Unlike the more conservative **IronClaw**, OpenClaw aggressively adopts new features, which results in significant community engagement but exposes users to frequent regression cycles (e.g., the v2026.9.6 crash-loop). Its primary advantage remains its massive contributor base and feature-rich environment, though it currently lags behind **QwenPaw** in terms of predictable enterprise-grade deployment stability.

### 4. Shared Technical Focus Areas
*   **WASM/Security Hardening:** **ZeroClaw** and **IronClaw** are both standardizing on secure plugin execution (WASM) to isolate agent tools from host environments.
*   **State & Context Management:** Nearly all projects (**QwenPaw, OpenClaw, Hermes**) are struggling with context overflow and session persistence, specifically regarding "pruning" logic during long-running tasks.
*   **Multi-tenancy/Gateway Control:** The move toward hub-based/multi-tenant agent management is universal, with **QwenPaw** and **IronClaw** leading the architectural shift away from single-user local scripts.

### 5. Differentiation Analysis
*   **QwenPaw:** Focuses on **enterprise-readiness** and UI/UX consistency, positioning itself as a platform-level tool for teams.
*   **IronClaw:** Emphasizes **architectural purity and security**, targeting power users and devs building custom, hardened agent runtimes.
*   **OpenClaw/ZeroClaw:** Focus on **rapid integration** and broad ecosystem compatibility (WhatsApp, Feishu, Voice), favoring agent breadth over strict environment isolation.

### 6. Community Momentum & Maturity
*   **Rapidly Iterating (High Turbulence):** **OpenClaw** and **QwenPaw** are seeing the highest velocity. While QwenPaw is managing its scale through structured testing, OpenClaw is currently in "firefighting" mode.
*   **Stabilizing/Maturing:** **IronClaw** is the clear leader in technical maturity, having effectively cleared its backlog and shifted focus toward documentation and release engineering. **Hermes** is in the middle of a necessary pivot toward rigorous E2E testing to catch up with its own growth.

### 7. Trend Signals
*   **"Silent Failure" Intolerance:** Users are increasingly frustrated by agents that "ghost" or fail without actionable diagnostic logs. Future-facing projects must prioritize observability (logging, telemetry, health-checks).
*   **Approval Gateways:** There is a growing demand for "ApprovalManagers"—human-in-the-loop safeguards—as agents move from interactive chat to autonomous, background-process execution.
*   **Search Provider Orchestration:** The trend in **ZeroClaw** (search_routes) indicates that users want dynamic, multi-modal search—choosing specific providers based on the task rather than relying on a single static LLM interface.
*   **Development Value:** For AI agent developers, the priority is shifting away from building "new agent types" and toward building "stable agent foundations" (reliable state storage, secure plugin boundaries, and predictable configuration).

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest: 2026-09-24

### 1. Today's Overview
The Hermes Agent project remains highly active with 100 total updates across issues and PRs in the last 24 hours. Development is currently focused on stabilizing session state integrity and addressing long-standing friction in desktop localization and platform compatibility. While the project is moving quickly, the recent influx of P1/P2 bug reports regarding data integrity and CLI/Gateway connectivity indicates a critical need for rigorous regression testing in upcoming releases.

### 2. Releases
*   **None.** There were no new releases published in the last 24 hours.

### 3. Project Progress
*   **API Restoration:** [#120836](https://github.com/NousResearch/hermes-agent/issues/120836) restored the `GET /v1/skills` endpoint, fixing a regression that caused HTTP 500 errors.
*   **Data Integrity:** [#120821](https://github.com/NousResearch/hermes-agent/issues/120821) introduces atomic fencing for snapshot rewrites to prevent silent data corruption during compression/pruning passes.
*   **Webhook Improvements:** [#120825](https://github.com/NousResearch/hermes-agent/issues/120825) adds `mirror_to_session` functionality, allowing agents to contextually reference previous webhook deliveries.
*   **Localization Cleanup:** A significant effort to close duplicate/stale Spanish and German localization PRs occurred, consolidating efforts to streamline the desktop UI language support.

### 4. Community Hot Topics
*   [#59293](https://github.com/NousResearch/hermes-agent/issues/59293) (16 comments): High-priority security discussion regarding the CLI `config set` command bypassing the system-config write protection layer.
*   [#56004](https://github.com/NousResearch/hermes-agent/issues/56004) (14 comments): Discussion on "thinking" models losing reasoning capabilities when replayed across tool calls on OpenAI-compatible endpoints.
*   [#118029](https://github.com/NousResearch/hermes-agent/issues/118029) (10 comments): Proposal for a verified rollout control plane for managed SSH installations, highlighting enterprise security requirements.

### 5. Bugs & Stability
*   **CRITICAL (P1):** [#120582](https://github.com/NousResearch/hermes-agent/issues/120582) – Proactive prune/compression passes causing production data loss/file corruption. *Status: Investigation ongoing.*
*   **HIGH (P1):** [#120821](https://github.com/NousResearch/hermes-agent/issues/120821) – Fix PR submitted for compression-related atomicity issues.
*   **HIGH (P2):** [#120831](https://github.com/NousResearch/hermes-agent/issues/120831) – `GET /v1/skills` TypeError. *Status: Fix PR #120836 merged.*
*   **HIGH (P2):** [#120599](https://github.com/NousResearch/hermes-agent/issues/120599) – CLI failure on Arch Linux/fish shell after update.
*   **MODERATE (P2):** [#120334](https://github.com/NousResearch/hermes-agent/issues/120334) – Stale terminal heartbeats being promoted into active agent turns.

### 6. Feature Requests & Roadmap Signals
*   **Plugin Catalog:** Expansion of the ecosystem via [#119066](https://github.com/NousResearch/hermes-agent/issues/119066), which aims to add the "DeskRPG" gateway plugin.
*   **Profile Management:** Continued pressure for better configuration synchronization across profiles ([#78314](https://github.com/NousResearch/hermes-agent/issues/78314)).
*   **Roadmap:** The recent influx of E2E testing PRs ([#120326](https://github.com/NousResearch/hermes-agent/issues/120326)) suggests a near-term focus on hardening existing features over new feature rollouts.

### 7. User Feedback Summary
Users are currently expressing frustration regarding:
*   **Desktop Stability:** Frequent crashes on Windows, particularly related to locale-specific encoding errors and cold-start timeouts.
*   **Regression Anxiety:** Users are reporting that updates frequently break existing environments (CLI, gateway), leading to "exits 1" after update cycles.
*   **Localization Gaps:** Continued demand for complete German/Spanish desktop support, though this is currently being addressed through PR consolidation.

### 8. Backlog Watch
*   [#66025](https://github.com/NousResearch/hermes-agent/issues/66025): Feature request for memory context freshness in long-running desktop sessions. This has been open since July and remains a point of friction for long-form agent usage.
*   [#48303](https://github.com/NousResearch/hermes-agent/issues/48303): Discord DM contact resolution bug; continues to cause issues for users relying on platform-specific messaging triggers.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest – 2026-09-24

### 1. Today's Overview
The IronClaw project remains in a stabilization and documentation phase as of September 24, 2026. Activity is focused on release engineering and clarifying core architectural concepts rather than implementing new agent capabilities. With two active pull requests and no new issues, the project is maintaining a steady, low-velocity maintenance cadence aimed at security compliance and developer clarity.

### 2. Releases
*None.* The project is currently preparing for version 1.4.1.

### 3. Project Progress
*   **PR #8110 ([chore(release): cut 1.4.1-rc.2](https://github.com/nearai/ironclaw/pull/8110)):** This PR advances the release candidate lifecycle. Key technical improvements include a critical update to the lockfile, incorporating `wasmtime 47.0.4` and `rustls 0.23.45` to address security advisories, ensuring the upcoming release meets modern dependency standards.
*   **PR #8109 ([docs(skills): clarify scoped virtual skill roots](https://github.com/nearai/ironclaw/pull/8109)):** This documentation update formalizes the transition away from legacy host-directory discovery. It clarifies the implementation of scoped virtual skill roots (`/skills`, `/system/skills`, and `/tenant-shared/skills`), which is vital for users managing multi-tenant agent environments.

### 4. Community Hot Topics
*   **[PR #8109](https://github.com/nearai/ironclaw/pull/8109):** While comment-free at present, this is a significant "hot" PR because it signals a shift in how developers should architect their skill-base. The community's underlying need here is a clearer mental model for how the system handles trust and discovery in containerized or virtualized agent setups.

### 5. Bugs & Stability
*   **Security Patching:** The release candidate process ([PR #8110](https://github.com/nearai/ironclaw/pull/8110)) implicitly addresses stability via dependency updates. By bumping `wasmtime` and `rustls`, the team is proactively mitigating risks associated with the underlying runtime and network encryption layers. No active runtime bugs or regression reports were filed today.

### 6. Feature Requests & Roadmap Signals
The move to formalize "scoped virtual skill roots" in [PR #8109](https://github.com/nearai/ironclaw/pull/8109) suggests the roadmap is prioritizing security and multi-tenancy. Expect the next minor version to deprecate legacy disk-based skill imports, shifting users toward the new `/system/skills` structure.

### 7. User Feedback Summary
There is no direct user feedback activity today. However, the documentation efforts in PR #8109 suggest that previous users likely struggled with the ambiguity of how host-directories interacted with the runtime, indicating a need for better onboarding resources for developers building custom skills.

### 8. Backlog Watch
The project currently has a clean slate with zero open issues. All active engineering effort is concentrated within the two open PRs, indicating that the maintainers are successfully burning down the technical debt and documentation gaps before finalizing the 1.4.1 release.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest: 2026-09-24

### 1. Today's Overview
QwenPaw maintains a high-intensity development velocity, with 61 combined issues and PRs updated in the last 24 hours. The project is currently pivoting toward enterprise readiness following the release of QwenPaw Hub (v2.2.0), with significant focus on improving UI/UX consistency, robust error handling in streaming providers, and stabilizing the backend control plane. Overall project health is strong, characterized by a rapid response rate to bugs and a structured approach to technical debt reduction.

### 2. Releases
*   **No new releases** were issued in the last 24 hours.

### 3. Project Progress
*   **Console UI/UX Refinement:** [PR #7940](https://github.com/agentscope-ai/QwenPaw/pull/7940) refined sidebar interactions, implementing a compact, navigation-focused UI.
*   **Dependency Management:** [PR #7927](https://github.com/agentscope-ai/QwenPaw/pull/7927) replaced `html2text` with MIT-licensed `markdownify` to optimize web-fetching workflows.
*   **Stability & Testing:** [PR #7941](https://github.com/agentscope-ai/QwenPaw/pull/7941) executed a major unit-test sprint, adding 2,720 cases and increasing codebase coverage to 73.79%.
*   **Error Handling:** [PR #7952](https://github.com/agentscope-ai/QwenPaw/pull/7952) and [PR #7563](https://github.com/agentscope-ai/QwenPaw/pull/7563) improved granularity for authentication failures and error reporting in the chat interface.

### 4. Community Hot Topics
*   **[#7318](https://github.com/agentscope-ai/QwenPaw/issue/7318) - QwenPaw Hub Strategy (32 comments):** The community is actively discussing the roadmap for the multi-tenant edition. The high engagement confirms a shift in the user base from individual power users to team leads looking for managed skill/access controls.
*   **[#7628](https://github.com/agentscope-ai/QwenPaw/issue/7628) - Context Compaction Issues (8 comments):** Users are struggling with context compaction triggering prematurely or incorrectly, highlighting the friction between long-context model usage and resource management.
*   **[#7853](https://github.com/agentscope-ai/QwenPaw/issue/7853) - Image Data Accumulation (8 comments):** A critical technical bottleneck where base64 image data bypasses truncation, leading to context window overflow.

### 5. Bugs & Stability
*   **[#7853](https://github.com/agentscope-ai/QwenPaw/issue/7853) [High]:** `ToolResultPruner` fails to prune base64 image blobs, causing session-wide context overflow.
*   **[#7715](https://github.com/agentsical-ai/QwenPaw/issue/7715) [Medium]:** Daily Paper plugin fails silently when network/proxy issues occur, providing no actionable diagnostic info.
*   **[#7948](https://github.com/agentscope-ai/QwenPaw/issue/7948) [Medium]:** Poor web console design is actively breaking user input, indicating a regression in frontend usability.
*   **[#7534](https://github.com/agentscope-ai/QwenPaw/issue/7534) [High]:** Feishu channel session "ghosting" where the queue consumer stalls silently, rendering the bot unresponsive until a full process restart.

### 6. Feature Requests & Roadmap Signals
*   **A2A Protocol (Agent-to-Agent):** [Issue #7484](https://github.com/agentscope-ai/QwenPaw/issue/7484) shows strong interest in a native A2A protocol. Given the current focus on Hub and control planes, this is a likely candidate for a post-2.3 roadmap.
*   **Autonomous Context Management:** [Issue #7733](https://github.com/agentscope-ai/QwenPaw/issue/7733) suggests giving agents more agency over context eviction—a high-value feature for complex, long-running research agents.

### 7. User Feedback Summary
Users are generally satisfied with the speed of bug fixes but are hitting friction with the **"QwenPaw Hub" migration** and **complex console interactions**. There is a recurring theme of "Silent Failures" (e.g., [#7715](https://github.com/agentscope-ai/QwenPaw/issue/7715), [#7534](https://github.com/agentscope-ai/QwenPaw/issue/7534)), where the system stops functioning without clear logs, suggesting a need for better health-check monitoring and user-facing notifications.

### 8. Backlog Watch
*   **[#2710](https://github.com/agentscope-ai/QwenPaw/issue/2710):** A long-standing bug regarding local task completion notifications, closed recently after months of inactivity; requires monitoring to ensure the fix is actually effective.
*   **[#1010](https://github.com/agentscope-ai/QwenPaw/issue/1010):** Multi-LLM model configuration was recently closed, reflecting the team's shift toward more modular provider architectures.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest - 2026-09-24

### 1. Today's Overview
The ZeroClaw project is currently in a state of high-intensity maintenance, characterized by a massive influx of PR activity (50 open PRs updated in 24h) and a critical focus on runtime security and channel reliability. The community and core maintainers are working through a significant "technical debt" phase, specifically targeting security gaps in headless agent execution and channel-tool connectivity. Development momentum is strong, with a clear pivot toward hardening core infrastructure before the next release cycle.

### 2. Releases
*None.* (No new releases for the current period).

### 3. Project Progress
*   **PR Activity:** While 50 PRs were updated, 3 were merged/closed, indicating a rigorous review process.
*   **Hardening:** Development continues on hardening the `file_download` tool against SSRF [#10070](https://github.com/zeroclaw-labs/zeroclaw/pull/10070) and blocking dangerous shell commands even when they appear in allowlists [#11061](https://github.com/zeroclaw-labs/zeroclaw/pull/11061).
*   **Security:** JordanTheJet is spearheading efforts to ensure WASM plugins are verified at install time rather than runtime [#10746](https://github.com/zeroclaw-labs/zeroclaw/pull/10746).

### 4. Community Hot Topics
*   **WhatsApp Integration Challenges:** Several threads center on the WhatsApp Web channel. Users are requesting better handling of Markdown formatting [#11052](https://github.com/zeroclaw-labs/zeroclaw/issue/11052) and pacing of native polls [#11050](https://github.com/zeroclaw-labs/zeroclaw/issue/11050). The community is actively debating the user experience of voice-note round trips, suggesting a need for more polished multimodal interactions.
*   **Agent Autonomy vs. Control:** High engagement on [#10968](https://github.com/zeroclaw-labs/zeroclaw/issue/10968) (Unattended agent turns skipping ApprovalManagers) underscores a core architectural tension: users want "set-and-forget" automation (cron/headless) but are increasingly worried about silent security bypasses.

### 5. Bugs & Stability
*   **Critical (S0/S1):** 
    *   [#10968](https://github.com/zeroclaw-labs/zeroclaw/issue/10968): Security risk where unattended agents run without approval managers.
    *   [#10797](https://github.com/zeroclaw-labs/zeroclaw/issue/10797): Data loss in Markdown memory backend during concurrent `store()` calls.
*   **High Priority (S2):**
    *   [#10985](https://github.com/zeroclaw-labs/zeroclaw/issue/10985) & [#11055](https://github.com/zeroclaw-labs/zeroclaw/issue/11055): Dashboard-started turns failing to connect to channels due to missing factory registrations.
    *   [#11059](https://github.com/zeroclaw-labs/zeroclaw/issue/11059): WhatsApp Web ignoring `force_voice` parameters.
*   *Fix Status:* PRs like [#10599](https://github.com/zeroclaw-labs/zeroclaw/pull/10599) and [#10986](https://github.com/zeroclaw-labs/zeroclaw/pull/10986) show active work to resolve these channel and runtime stability issues.

### 6. Feature Requests & Roadmap Signals
*   **Antigravity CLI Support:** [#11075](https://github.com/zeroclaw-labs/zeroclaw/issue/11075) / [#11076](https://github.com/zeroclaw-labs/zeroclaw/pull/11076) indicates a swift transition to support Google’s `agy` tool, replacing the now-defunct `gemini_cli`.
*   **Provider Flexibility:** [#11074](https://github.com/zeroclaw-labs/zeroclaw/issue/11074) proposes "search_routes," which would allow agents to dynamically select search providers based on the query type (e.g., primary sources vs. corroboration).

### 7. User Feedback Summary
Users are finding the "Quickstart" experience needs more validation, as noted in [#10511](https://github.com/zeroclaw-labs/zeroclaw/pull/10511), where configuration was persisting without actually verifying credentials. There is clear frustration with the reliability of "headles" automation; the daemon currently fails to pass context (like approval managers or channel maps) to background tasks, leading to silent failures that developers find difficult to debug.

### 8. Backlog Watch
*   [#10814](https://github.com/zeroclaw-labs/zeroclaw/issue/10814): The "Release efficiency and repeatable publication" tracker is a long-standing initiative that is critical for the project's ability to ship the fixes currently trapped in the massive PR backlog.
*   [#10133](https://github.com/zeroclaw-labs/zeroclaw/pull/10133): Refactoring efforts to make operational paths panic-free remain in the backlog, representing an important step toward professionalizing the runtime's reliability.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/jinming1345/agents-radar).*