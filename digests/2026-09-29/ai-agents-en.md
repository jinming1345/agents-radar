# OpenClaw Ecosystem Digest 2026-09-29

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-29 02:16 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest: 2026-09-29

## 1. Today's Overview
The OpenClaw project is currently experiencing a period of intense instability and heavy maintenance overhead following the recent `2026.9.x` release series. With 500 issues and 500 PRs updated in the last 24 hours, developer activity is at an all-time high, primarily focused on firefighting critical regressions, memory leaks, and crash-loop cycles. While the project is showing significant progress in refining agent-subsystem architecture and decoupling database maintenance from the main event loop, the high volume of P0/P1 issues indicates that recent releases have introduced severe performance degradation and stability regressions for power users.

## 2. Releases
*   **None.** No new releases were issued in the last 24 hours. The community is currently focused on stabilizing the `2026.9.6` build and preparing hotfixes for the `2026.9.7` target.

## 3. Project Progress
*   **Subagent & Session Refinement:** Several PRs advanced the architectural "desloping" of agent subsystems, including `#160662` (Subagent/CLI cleanup) and `#160893` (rejecting stale transcript writes).
*   **Infrastructure Decoupling:** Efforts to move heavy maintenance tasks off the Gateway thread are gaining momentum, notably in `#160858` (cron retention) and `#160203` (file-backed native subagent stop persistence).
*   **UI/UX Improvements:** The UI team advanced side-chat workflows in `#160747` (Ask in side chat stages selection comments) and `#151226` (theming support for plugin icons).

## 4. Community Hot Topics
*   **[#149538] Gateway Ready/Starvation Loop (22 comments):** Users are reporting a "ready but silent" state where the event loop starves, causing RSS to climb until OOM.
*   **[#157067] Windows Cron Environment Bug (17 comments):** High interest in cross-platform isolation issues where uncloneable proxies are leaking into worker tasks.
*   **[#97616] Zombie Process Accumulation (16 comments):** A persistent issue regarding unreaped hook/tool child processes that leads to long-term system degradation.
*   **[#40001] Data Loss in Write Tool (16 comments):** Frustration persists over the lack of append mode in the write tool, leading to silent overwrites of critical session logs.

## 5. Bugs & Stability
*   **Critical (P0) / UX Blockers:**
    *   **[#159514 / #159596 / #160548]** Multiple reports of the `prepared-model-catalog` worker leaking gigabytes of memory, leading to continuous crash-loops and disk-filling source captures.
    *   **[#157160 / #158095]** Gateway startup failures and state-lifecycle lease exhaustion preventing service activation.
*   **Regressions:**
    *   **[#157989]** Plugin source capture is causing severe SSD wear due to redundant SHA-256 hashing and file copying on every command.
    *   **[#154114]** `openclaw update` failures preventing users from moving between minor versions (2026.9.4 -> 2026.9.5).

## 6. Feature Requests & Roadmap Signals
*   **Official Databricks Integration:** Issue `#155633` signals a strong demand for enterprise model provider support.
*   **Memory/Embedding Onboarding:** Issue `#16670` advocates for making Memory configuration a mandatory step in the setup wizard, highlighting that current "invisible" onboarding is confusing users.
*   **Talk Mode Timeouts:** Issue `#46844` requests configurable idle timeouts for Voice Mode to prevent runaway token consumption.

## 7. User Feedback Summary
Users are reporting significant "version fatigue" due to recent update failures and performance regressions in `2026.9.5/6`. The primary pain points are:
*   **Resource Consumption:** Excessive memory usage and disk I/O are the most cited friction points.
*   **Reliability:** Automated updates and session recovery processes are frequently failing or hanging, requiring manual intervention.
*   **Communication:** Users are feeling the impact of "silent" state-lifecycle bugs where the agent appears running but stops processing, leading to data loss or missed tasks.

## 8. Backlog Watch
*   **[#40001] Write Tool Append Mode:** A long-standing (March 2026) P0 issue causing data loss that remains unaddressed despite clear community demand.
*   **[#16670] Onboarding Wizard:** A P2 issue labeled as "off-meta," yet it represents a critical UX hurdle for new users discovering the persistence/memory features of OpenClaw.

---

## Cross-Ecosystem Comparison

# Cross-Project Ecosystem Report: 2026-09-29

## 1. Ecosystem Overview
The open-source AI agent ecosystem is currently experiencing a period of intense "infrastructure maturity" following a phase of rapid feature expansion. Projects are transitioning from monolithic agent architectures to decoupled, daemon-led frameworks, with a heavy industry-wide focus on persistence, security (RBAC), and cross-platform reliability. While innovation remains high, the primary engineering constraint across the board is the stabilization of state-lifecycle management and resource-intensive background processes, as users transition from experimental to production-grade daily usage.

## 2. Activity Comparison

| Project | Recent Activity (Issues/PRs) | Releases (24h) | Health Score (Est. Stability) |
| :--- | :--- | :--- | :--- |
| **OpenClaw** | 1,000+ | None | Low (High Regressions) |
| **Hermes Agent** | 100 | None | Medium |
| **IronClaw** | Steady (Incremental) | None | High |
| **QwenPaw** | 27 | None | Medium-High |
| **ZeroClaw** | 100 | None | High (Security Focus) |

*Note: Health score derived from the ratio of feature development vs. critical bug/crash-loop remediation.*

## 3. OpenClaw's Position
*   **Advantages:** OpenClaw maintains the most sophisticated agent-subsystem architecture, leading in "sub-agent" complexity and advanced event-loop decoupling. 
*   **Technical Approach:** Unlike the more conservative IronClaw, OpenClaw aggressively pursues advanced architectural patterns (e.g., file-backed persistence), which currently contributes to its significant stability regressions.
*   **Community:** OpenClaw operates at a significantly larger scale than its peers; however, this results in "version fatigue," where the sheer volume of updates hampers, rather than aids, the user experience compared to the smaller, more targeted development cycle of IronClaw.

## 4. Shared Technical Focus Areas
*   **Self-Diagnostics & Audit:** Hermes Agent (#58344, #58805) and ZeroClaw are pioneering "agent self-reflection," where agents audit their own performance.
*   **Configuration Modernization:** Move toward centralized, RPC-based or registry-style configuration (ZeroClaw’s RPC parity, IronClaw’s Tsubasa registry) to replace manual user-side environment tuning.
*   **Resource/Lifecycle Management:** Almost all projects (OpenClaw, Hermes, QwenPaw) are struggling with "zombie" processes, file-lock contention during updates, and memory leaks in long-running sessions.

## 5. Differentiation Analysis
*   **OpenClaw/ZeroClaw:** Focused on **Infrastructure/Backend**—prioritizing daemon-level operations, security hardening, and high-performance event-loop management.
*   **Hermes/QwenPaw:** Focused on **UX/Frontend**—prioritizing desktop consistency, UI scaling, and addressing user-facing friction like chat-thread state bugs and media handling.
*   **IronClaw:** Focused on **Benchmarking/Quality**—positioning itself as the most reliable platform by prioritizing automated documentation and rigorous model-quality auditing.

## 6. Community Momentum & Maturity
*   **Rapid Iteration/Risk:** **OpenClaw** is in a "high-risk/high-reward" cycle, moving the fastest but suffering from severe instability that threatens user trust.
*   **Active Stabilization:** **Hermes Agent** and **ZeroClaw** are effectively managing a "stabilization sprint," focusing on security and CI-driven fixes without disrupting the core user base.
*   **Maturity/Stability:** **IronClaw** is the clear leader in maturity, exhibiting a controlled, CI-heavy workflow that prioritizes long-term system health over velocity.

## 7. Trend Signals
*   **"Invisible" Onboarding Failure:** There is a strong signal that advanced agent capabilities (like Memory and Embedding configuration) are becoming too complex for users. Projects are moving to force these into mandatory setup wizards.
*   **SaaS/Enterprise Gating:** A clear trend toward air-gapped support and module gating (ZeroClaw’s SaaS gating) suggests the market is shifting from "experimental hobbyist" to "enterprise/intranet deployment."
*   **Data Integrity as a Core Feature:** The "silent data loss" issues (e.g., OpenClaw’s write tool) have become the most significant inhibitors to growth, signaling that future development must prioritize idempotent/append-only storage patterns over destructive write operations.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest: 2026-09-29

## 1. Today's Overview
The Hermes Agent project shows high velocity today with 100 total updates across issues and PRs, indicating an intense focus on stabilization. The primary engineering narrative revolves around correcting regressions in the desktop update pipeline, managing cross-platform compatibility (particularly Windows and macOS signing), and fixing UI state-rendering bugs. Overall, the project remains highly active, with contributors aggressively addressing "sweeper" risks identified in previous cycles.

## 2. Releases
*   *None.* (No new releases recorded for this period.)

## 3. Project Progress
Today saw 11 closed PRs, with significant progress in refining core platform behavior:
*   **Model/CLI Routing:** PR [#79510](https://github.com/NousResearch/hermes-agent/pull/79510) resolved model-switching issues under `dashboard.turn_isolation`, ensuring downstream agents respect configuration changes.
*   **Lifecycle Management:** PR [#126960](https://github.com/NousResearch/hermes-agent/pull/126960) prevents new model turns from triggering on sessions where the user has explicitly requested a stop.
*   **API/Runs:** PR [#75707](https://github.com/NousResearch/hermes-agent/pull/75707) implemented recoverable pending approvals by ID, significantly improving client resilience during connection drops.
*   **General Cleanup:** Unused models (e.g., GPT-6 Terra) were purged from catalogs via PR [#119568](https://github.com/NousResearch/hermes-agent/pull/119568).

## 4. Community Hot Topics
*   **[#123801](https://github.com/NousResearch/hermes-agent/issues/123801) macOS Duplicate Replies (15 comments):** Users are reporting assistant replies rendering verbatim twice despite the database holding only one entry. This points to a client-side state/subscription management bug.
*   **[#88858](https://github.com/NousResearch/hermes-agent/issues/88858) MCP Trust Gate (10 comments):** A persistent friction point where `readOnlyHint` detection fails due to casing mismatches, causing the agent to over-prompt for trust on safe tools.
*   **[#77277](https://github.com/NousResearch/hermes-agent/issues/77277) Windows Update Loop (9 comments):** A high-frustration issue where the auto-updater triggers an infinite respawn loop, essentially bricking the desktop client's ability to update itself.

## 5. Bugs & Stability
*   **Critical (P0/P1):** Issue [#123824](https://github.com/NousResearch/hermes-agent/issues/123824) reports a dangerous bug where the "Delete File" tool deletes symlink targets.
*   **High (P2):** Extensive reports on Windows update failures ([#124807](https://github.com/NousResearch/hermes-agent/issues/124807), [#126470](https://github.com/NousResearch/hermes-agent/issues/126470)) due to file locks and environment variable inheritance.
*   **Stability:** Fixes are currently in-flight for macOS re-signing ([#127225](https://github.com/NousResearch/hermes-agent/pull/127225)) and Git identity issues in the review pane ([#127256](https://github.com/NousResearch/hermes-agent/pull/127256)).

## 6. Feature Requests & Roadmap Signals
*   **Self-Diagnostics:** PR [#58344](https://github.com/NousResearch/hermes-agent/pull/58344) (Session-Health) and [#58805](https://github.com/NousResearch/hermes-agent/pull/58805) (Tool-Audit) signal a move toward "agent self-reflection," where the system uses its own tools to audit its performance and historical reliability.
*   **Kanban Enhancements:** PR [#115081](https://github.com/NousResearch/hermes-agent/pull/115081) suggests a push toward better task visualization and runtime monitoring for desktop users.

## 7. User Feedback Summary
Users are generally satisfied with the breadth of tool capabilities but are hitting a "stability wall" during the update process. Desktop users on Windows and macOS report frequent "update-aborted" errors, suggesting the auto-updater needs better process-locking checks. There is also clear frustration with "silent" failures in tools like `todo_list` ([#126656](https://github.com/NousResearch/hermes-agent/issues/126656)), where users expect errors for malformed parameters but receive a false "success" state.

## 8. Backlog Watch
*   **[#7718](https://github.com/NousResearch/hermes-agent/issues/7718):** Hindsight plugin configuration/dependency issues remain open since April 2026. This is a recurring pain point for users attempting to utilize local embedded memory.
*   **[#82943](https://github.com/NousResearch/hermes-agent/issues/82943):** Issues with `config_changed` logic in the Hindsight plugin are causing repeated daemon restarts, needing attention to ensure the memory provider remains stable.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest – 2026-09-29

## 1. Today's Overview
IronClaw continues to maintain a steady cadence of incremental improvements, focusing heavily on automated documentation maintenance and systematic benchmarking. Recent activity is characterized by a balance of CI-driven infrastructure updates and targeted quality-of-life enhancements for the web interface. Project health remains stable, with active efforts in tracking model performance and streamlining provider configurations.

## 2. Releases
*None.* No new releases were identified for this reporting period.

## 3. Project Progress
*   **PR #5132 [CLOSED]:** Successfully merged a fix for the `webui-v2` routing logic. The update introduces robust handling for invalid `/chat/:threadId` routes and prevents race conditions when fetching thread lists, improving the overall reliability of the user session state.

## 4. Community Hot Topics
*   **Issue #8116 [Daily ironclaw failure taxonomy]:** ([Link](https://nearai.github.io/benchmarks/#/runs/ironclaw/officeqa/3ad548b5-51ce-4c71-9830-a0ae1885759d)) 
    *   *Analysis:* This highlights the ongoing commitment to model-quality auditing. The current focus on DeepSeek-V4-Flash performance in officeqa tasks suggests that the team is prioritizing LLM integration robustness.
*   **PR #6698 [docs: update OpenWiki wiki]:** ([Link](https://github.com/nearai/ironclaw/pull/6698))
    *   *Analysis:* This reflects the project's adherence to "change-management policy" for documentation. By keeping the prose layer synced with the codebase-memory graph, the project maintains high standards for internal developer knowledge.

## 5. Bugs & Stability
*   **Routing Issues (Fixed):** PR #5132 addressed potential crashes and UI inconsistencies related to deep-linked thread navigation in the web client. 
*   **Model Quality (Ongoing):** Issue #8116 identifies 31 non-pass tasks in the `officeqa` suite. While identified as "model-quality errors" rather than codebase bugs, this remains the primary area for stability oversight as the project integrates new models.

## 6. Feature Requests & Roadmap Signals
*   **Provider Configuration (Issue #8115):** The request to add a "Tsubasa" registry entry with a 32K context-budget path indicates a growing need for "pre-baked" provider configurations. Expect future updates to simplify the onboarding process for specific high-context models, moving away from manual endpoint/model entry.

## 7. User Feedback Summary
Current feedback indicates a focus on *usability* and *onboarding*. Users are requesting more automated configuration paths (as seen in the Tsubasa request), and developers are focused on ensuring the UI behaves predictably during network-induced latency in thread loading. Satisfaction appears high regarding the transparency of failure analysis (benchmarking).

## 8. Backlog Watch
*   **PR #6698 (Open since 2026-07-27):** While maintained by the `ironclaw-ci` bot, this documentation update has been open for two months. It serves as a reminder that manual human approval is the final bottleneck in the project's documentation workflow.
*   **PR #7988 (Open since 2026-08-29):** This codebase-memory graph refresh is a critical infrastructure task. Regular attention is needed to ensure these snapshots remain current with the latest `main` branch state to avoid stale agent knowledge.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

## QwenPaw Project Digest (2026-09-29)

### 1. Today's Overview
QwenPaw maintains high development velocity as we approach the end of September, with 27 total updates across issues and PRs in the last 24 hours. The focus is currently on stabilizing the desktop experience and resolving critical context-management bugs that have been causing session-wide failures. Overall project health remains robust, with a strong influx of first-time contributors helping to address technical debt in CLI performance and tool output handling.

### 2. Releases
*   **No new releases.** The project is currently tracking version `2.2.2b4` in the `main` branch.

### 3. Project Progress (Merged/Closed PRs)
*   **UI/UX Standardization:** [PR #8005](https://github.com/agentscope-ai/QwenPaw/pull/8005) and [PR #7956](https://github.com/agentscope-ai/QwenPaw/pull/7956) have unified the Console’s design language and enabled adjustable font scaling, addressing a major usability request.
*   **Context Management:** [PR #7965](https://github.com/agentscope-ai/QwenPaw/pull/7965) specifically addresses the issue where image-heavy sessions exhausted context windows by enabling reclamation of older media blocks.
*   **Stability:** [PR #7953](https://github.com/agentscope-ai/QwenPaw/pull/7953) improved error handling for asset imports, ensuring failures are actionable rather than silent.

### 4. Community Hot Topics
*   **Context Exhaustion ([Issue #7853](https://github.com/agentscope-ai/QwenPaw/issue/7853)):** With 8 comments, this was the primary focus of technical debate. Users reported that base64 image data bypassed pruning logic, rendering long sessions unusable. The community is actively validating the fix in PR #7965.
*   **Desktop UI Scaling ([Issue #7999](https://github.com/agentscope-ai/QwenPaw/issue/7999)):** A high-interest request for accessibility and high-DPI support, which triggered immediate developer action (see PR #8005).

### 5. Bugs & Stability
*   **[CRITICAL] Zombie Tasks ([Issue #7991](https://github.com/agentscope-ai/QwenPaw/issue/7991)):** The TaskTracker is reporting ghost tasks, leading to dashboard inaccuracies.
*   **[HIGH] Timeout on Large Skill Downloads ([Issue #8013](https://github.com/agentscope-ai/QwenPaw/issue/8013)):** A hard-coded 30s limit in the frontend prevents large skill (e.g., 80MB+) imports, causing UX frustration.
*   **[HIGH] Unsafe COM Execution ([Issue #8002](https://github.com/agentscope-ai/QwenPaw/issue/8002)):** Reported a security concern where the "auto" mode allows agents to force-close local Office applications when sandboxing is disabled.
*   **[MEDIUM] Telegram HTML Formatting ([Issue #8011](https://github.com/agentscope-ai/QwenPaw/issue/8011)):** Broken rendering for specific code blocks; a fix is currently under review in [PR #8012](https://github.com/agentscope-ai/QwenPaw/pull/8012).

### 6. Feature Requests & Roadmap Signals
*   **Self-Hosted Marketplace ([Issue #8015](https://github.com/agentscope-ai/QwenPaw/issue/8015)):** A significant request for intranet/air-gapped deployment support. Expect this to become a priority for enterprise/security-conscious users.
*   **Thinking Param Injection ([Issue #7990](https://github.com/agentscope-ai/QwenPaw/issue/7990)):** Users are pushing for deeper control over reasoning models (Aliyun Token Plan), suggesting a need for more flexible model catalog configurations.

### 7. User Feedback Summary
Users are generally satisfied with the speed of bug fixes, particularly regarding UI/UX refinements. However, there is growing frustration regarding the "brittleness" of long sessions, where a single large image or a hung background task can permanently break a chat thread. The shift toward more robust error reporting (as seen in [PR #8014](https://github.com/agentscope-ai/QwenPaw/pull/8014)) is well-received.

### 8. Backlog Watch
*   **[PR #7931](https://github.com/agentscope-ai/QwenPaw/pull/7931):** This PR implements durable SQLite transcript storage. Given its complexity and impact on core state management, it requires senior maintainer review to ensure there are no regressions in chat history performance.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest: 2026-09-29

## 1. Today's Overview
ZeroClaw is currently in a state of high-velocity development, focusing heavily on **v0.9.0 architectural parity** and **security hardening**. With 50 issues and 50 PRs updated in the last 24 hours, the project is maintaining a rapid cadence of feature delivery and bug remediation. The team is prioritizing the transition of gateway responsibilities into the core daemon, RPC-based config parity, and stringent RBAC/security auditing for agent-delegate loops.

## 2. Releases
*No new releases in the last 24 hours.*

## 3. Project Progress
*   **Observer Firehose Integration:** PR [#11131](https://github.com/zeroclaw-labs/zeroclaw/pull/11131) was merged, shifting the observer event broadcast hook from the gateway to the daemon, ensuring that ZeroCode and TUI clients receive real-time logs even when the gateway is inactive.
*   **Ongoing Refinements:** Development is heavily skewed toward closing "parity gaps," with massive PRs (size: XL) targeting RPC/HTTP consistency for cron, memory, and personality management.

## 4. Community Hot Topics
*   **[RFC #10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) (12 comments):** Discussion focused on streamlining the RFC process by removing mandatory discussion windows. The community is pushing for agility over rigid administrative gates.
*   **[Issue #5982](https://github.com/zeroclaw-labs/zeroclaw/issues/5982) (10 comments):** Ongoing work on per-sender RBAC for multi-tenant deployments. This is a critical security frontier for users looking to safely share agent deployments.
*   **[Issue #8832](https://github.com/zeroclaw-labs/zeroclaw/issues/8832) (9 comments):** Progress on a plugin-owned Kanban board, shifting it to a standard issue/PR path rather than an RFC-gated feature.

## 5. Bugs & Stability
The team is actively addressing several high-severity (S0/S1) regressions:
*   **[#11136](https://github.com/zeroclaw-labs/zeroclaw/issues/11136) (S0):** Concurrent file edits in parallel tools resulting in data loss. Fix in progress.
*   **[#11197](https://github.com/zeroclaw-labs/zeroclaw/issues/11197) (S0):** Security risk where session resumption ignores revoked admin grants.
*   **[#10121](https://github.com/zeroclaw-labs/zeroclaw/issues/10121) (S0):** Data loss during Code/ACP turns if the daemon lifecycle terminates early.
*   **[#11220](https://github.com/zeroclaw-labs/zeroclaw/pull/11220):** Security fix requiring explicit `tools:execute` authorization for SOPs over RPC.

## 6. Feature Requests & Roadmap Signals
*   **SaaS Tool Gating:** PR [#11221](https://github.com/zeroclaw-labs/zeroclaw/pull/11221) signals a move toward modularity, gating SaaS integrations behind opt-in features to reduce build bloat.
*   **Gateway Enrollment:** The roadmap clearly points toward a "Self-serve" future, evidenced by PR [#10592](https://github.com/zeroclaw-labs/zeroclaw/pull/10592) (`relay claim`), allowing for decentralized, link-based daemon pairing.

## 7. User Feedback Summary
Current user sentiment reflects frustration with **configuration migration issues** (e.g., [#11218](https://github.com/zeroclaw-labs/zeroclaw/pull/11218)) and **observability gaps** when operating outside of the standard gateway environment. Users are prioritizing stable, predictable configuration versions as the schema evolves toward V4.

## 8. Backlog Watch
*   **[Issue #7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432):** The tracking issue for v0.8.6 and v0.9.0 remains the primary source of truth. It is heavily utilized but requires constant synchronization as the scope of "Phase 3 gateway separation" continues to expand.
*   **[Issue #10814](https://github.com/zeroclaw-labs/zeroclaw/issues/10814):** Ongoing tracker for release efficiency; as the project grows in size (many XL PRs), the community and maintainers are increasingly sensitive to build-time and publication stability.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/jinming1345/agents-radar).*