# OpenClaw Ecosystem Digest 2026-11-06

> Issues: 135 | PRs: 500 | Projects covered: 5 | Generated: 2026-11-06 01:31 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest - 2026-11-06

## 1. Today's Overview
The OpenClaw project is experiencing a period of intense maintenance and stabilization, evidenced by a massive surge of 500 PRs and 135 issues updated in the last 24 hours. The project is currently balancing the release of v2026.11.1 with a high volume of reported regressions and UI friction points, particularly concerning Windows performance and SQLite worker stability. Despite the high churn, the volume of active PRs suggests a robust development cycle focused on refining existing capabilities rather than purely new feature expansion.

## 2. Releases
*   **v2026.11.1:** A stabilization release focusing on security and reliability.
    *   **Mac Security:** Enhanced config safety; failed saves no longer overwrite secrets, and Tailscale modifications preserve Gateway authentication (#187734, #187664).
    *   **Reliability:** Improved delivery of channel replies (Telegram, Discord, webhooks).

## 3. Project Progress
Development today was largely focused on UI/UX responsiveness and performance optimization:
*   **Performance:** PR #193861 reduces main-thread style overhead, and PR #193851 optimizes Control UI reload speed by consolidating palette application.
*   **CI/CD:** Efforts are underway to reduce test bloat (PR #193870, #193834).
*   **UI Polish:** Fixes for progress markers (#193864) and link menu spacing (#193848) were addressed to maintain visual consistency.

## 4. Community Hot Topics
*   **[#170956] Windows Startup Reliability:** (29 comments) The top issue remains the "crash-loop" on Windows regarding plugin shutdowns and schtasks permissions. Users are clearly struggling with reliability, calling this an "ux-release-blocker."
*   **[#177094] Control UI Webchat:** (12 comments) Discusses UI rendering issues where system notices displace assistant replies. This indicates high user sensitivity to chat transcript integrity.
*   **[#193871] Streaming Markdown Fix:** (Newest high-activity PR) Addresses a significant performance bottleneck in the Gateway event loop caused by improper handling of legacy tool-call brackets.

## 5. Bugs & Stability
*   **[P0/Critical] Regression [#191847]:** A large session is killing the 512MB SQLite worker (ERR_WORKER_OUT_OF_MEMORY). *Status: Open, no fix yet.*
*   **[P0/Critical] Regression [#190563]:** Users cannot resume paused Codex chats due to a provider/thread mismatch. *Status: Open.*
*   **[P1/Crash-loop] [#193262]:** Docker startup failing when bind-mounted from Windows drives. *Status: Open.*
*   **[Stability Fix] PR #193859:** Addresses macOS fork-mount overhead, which is a major contributor to slow Gateway boots on APFS.

## 6. Feature Requests & Roadmap Signals
*   **CJK FTS Indexing (PR #193815):** High potential for the next version, as this enables meaningful FTS5 searches for two-character Chinese/Japanese queries, a critical gap for international users.
*   **Template Previews (PR #193778):** Users are asking for ways to inspect recommended templates without leaving their current context, suggesting a move toward a more "fluid" UI experience.

## 7. User Feedback Summary
Current user sentiment reflects frustration with "stalled" processes and "UX friction." Users are particularly vocal about:
*   **Native OS Integration:** Problems with Windows filesystem permissions and macOS mount points remain recurring themes.
*   **Data Loss Anxiety:** Issues like [#193659] (Rabbit R1 photos missing from history) and [#182246] (Queue drop issues) underscore a need for better visibility into *why* a message fails, rather than just silent abandonment.

## 8. Backlog Watch
*   **[#164620] Plugin Catalog Feed:** An open request to disable the hardcoded `clawhub.ai` plugin feed. This has sat for a month and is a likely candidate for a security/privacy-conscious user base.
*   **[#150029] Configurable Inspect Links:** A long-standing request to allow users to toggle automation inspect links. This remains a "P3" item but is highly commented on regarding its usefulness in clean chat threads.

---

## Cross-Ecosystem Comparison

### 1. Ecosystem Overview
The open-source AI agent ecosystem as of November 2026 is defined by a "post-hype, pre-production" transition, where projects are shifting from rapid experimentation to rigorous stabilization. Projects are moving away from modular, loose architectures toward unified, state-protected gateways to solve critical issues like session integrity and security boundaries. While feature expansion continues, the dominant trend is the hardening of infrastructure to make agents reliable enough for sensitive, enterprise, or long-term personal tasks.

### 2. Activity Comparison

| Project | Active PRs/Issues (24h) | Recent Release | Health Status |
| :--- | :--- | :--- | :--- |
| **OpenClaw** | 635 | v2026.11.1 | High Churn / Stabilizing |
| **Hermes Agent** | 63 | v0.23.0 | High Velocity / Beta |
| **QwenPaw** | 47 | None (Beta) | Maintenance Phase |
| **ZeroClaw** | 50 | None | Security Hardening |
| **IronClaw** | 0 | None | Inactive |

### 3. OpenClaw’s Position
OpenClaw operates as the "heavyweight" reference implementation in this space, handling significantly higher PR volumes than its peers. Its primary advantage is its massive, ecosystem-wide adoption which forces it to confront edge cases (Windows filesystem/permission bugs) that smaller projects have yet to encounter. Unlike Hermes or ZeroClaw, which are currently refactoring their core architectures, OpenClaw is attempting to maintain compatibility with a vast plugin ecosystem while simultaneously performing deep-level performance optimizations.

### 4. Shared Technical Focus Areas
*   **Unified Gateways:** Hermes (Unified Gateway transition) and QwenPaw (Runtime Config/ACP unification) are converging on a single-process entry point to replace scattered execution models.
*   **Memory & State Integrity:** Almost all projects (OpenClaw, QwenPaw, ZeroClaw) are prioritizing "Append-only" or durable storage solutions to prevent the data-loss anxiety expressed by their user bases.
*   **Security Boundaries:** ZeroClaw’s recent critical security patches and OpenClaw’s secret handling improvements reflect a collective realization that agents need strict access control if they are to be given "operator authority."

### 5. Differentiation Analysis
*   **Hermes Agent:** Positioned as an "All-in-One" agentic runtime; heavily focused on developer experience and complex local environment orchestration.
*   **ZeroClaw:** The "Security-First" option; utilizes a Rust-native stack with a focus on auditability and strict principal ownership.
*   **QwenPaw:** Focuses on the "Creator/UI" aspect; leans into user-facing features like Rerankers and visual agent management, targeting the power-user/prosumer segment.
*   **OpenClaw:** The "General Purpose" platform; prioritizes ecosystem/plugin diversity and broad OS compatibility.

### 6. Community Momentum & Maturity
*   **High Momentum/Unstable:** **Hermes Agent** is currently experiencing "Release Shock" post-v0.23.0; it is the most rapidly evolving but currently the most fragile.
*   **High Maturity/Stabilizing:** **ZeroClaw** shows high maturity in its development cycle, prioritizing security audits and RFC-based decision-making over experimental features.
*   **Maintenance Phase:** **OpenClaw** and **QwenPaw** are effectively in "bug-squashing" mode, focusing on UI/UX polish and fixing technical debt that accumulated during their initial rapid growth phases.

### 7. Trend Signals
*   **The "Reliability Wall":** Developers are realizing that the "agentic promise" is currently hitting a wall of silent failures. Users are demanding visibility into why tasks fail (e.g., OpenClaw’s history dropping, QwenPaw’s embedding re-index failures).
*   **Rust Migration:** There is a distinct push toward "Rust-native" stacks (noted in ZeroClaw discussions) to achieve the performance required for persistent background agents.
*   **Windows Parity:** A major trend for 2026 is the struggle to achieve Unix-like reliability on Windows; the prevalence of filesystem/pathing issues across all active projects suggests this is the primary hurdle for mainstream desktop adoption of local AI agents.
*   **Data Sovereignty:** The focus on local SQLite storage and away from mutable, volatile snapshots suggests that "local-first" data safety is now a non-negotiable requirement for the community.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest: 2026-11-06

### 1. Today's Overview
The Hermes Agent project is currently in a high-intensity "post-release" stabilization phase following the major v0.23.0 "Hearth" release on November 5th. Development velocity remains extremely high, with 50 pull requests and 13 issues receiving attention in the last 24 hours alone. The primary engineering focus is stabilizing the new Unified Gateway architecture, which has introduced complex regressions in session management, profile handling, and platform-specific desktop integrations.

### 2. Releases
*   **v0.23.0 ("The Hearth Release"):** A massive milestone involving ~10,000 commits and 666 contributors. The release centers on architectural consolidation, most notably the unified gateway runtime. This change forces all local interactions (CLI, Desktop, API, cron) to route through a single gateway process, aiming for consistency but introducing significant surface area for state-related bugs.

### 3. Project Progress
*   **[PR #149786](https://github.com/NousResearch/hermes-agent/pull/149786):** CI optimization to merge smaller runner jobs, significantly reducing operational overhead.
*   **[PR #149630](https://github.com/NousResearch/hermes-agent/pull/149630):** Improved UX for agentic file editing by linking `/undo` commands directly to the relevant pre-edit file snapshots.
*   **[PR #132414](https://github.com/NousResearch/hermes-agent/pull/132414):** Fixed browser daemon resource leaks during Kanban worker reclamation.
*   **[PR #140901](https://github.com/NousResearch/hermes-agent/pull/140901):** Fixed API idempotency logic to ensure `tool_choice` is part of the retry identity, preventing stale responses in cached sessions.

### 4. Community Hot Topics
*   **[Issue #134889](https://github.com/NousResearch/hermes-agent/issue/134889) (227 comments):** The central tracking hub for the Unified Gateway transition. The high comment volume indicates that the community is deeply engaged in debugging the "all-in-one" process model, specifically regarding how local sessions interface with the gateway.
*   **[Issue #143547](https://github.com/NousResearch/hermes-agent/issue/143547) (50 comments):** A direct follow-up to the Gateway unification, tracking unresolved edge cases for cron jobs, bots, and UI elements interacting with the new architecture.

### 5. Bugs & Stability
*   **Critical/Regression:** **[Issue #149784](https://github.com/NousResearch/hermes-agent/issue/149784)** — Desktop sessions are becoming unrecoverable (`admission_conflict`) following 90-day pruning cycles. This is a high-severity issue for long-term users.
*   **High Severity:** **[Issue #149776](https://github.com/NousResearch/hermes-agent/issue/149776)** — Symlinked profile homes (often used for encrypted volumes) are losing identity and failing to reopen in v0.23, leading to `permission_denied` errors.
*   **Moderate Severity:** **[Issue #149779](https://github.com/NousResearch/hermes-agent/issue/149779)** — Cross-profile wake words leave state pins active, causing new sessions to open in the wrong agent profile.
*   **Bug Fixes:** A fix for the `no_agent` cron session issue was closed in **[Issue #149787](https://github.com/NousResearch/hermes-agent/issue/149787)**, signaling rapid turnaround on release-day bugs.

### 6. Feature Requests & Roadmap Signals
*   **Cross-Machine Collaboration:** **[Issue #97681](https://github.com/NousResearch/hermes-agent/issue/97681)** remains a core architectural goal: enabling agent interaction across distinct machines and owners.
*   **Plugin Ecosystem:** Continued expansion of the plugin catalog is a priority, with recent PRs adding [Eye of Hermes](https://github.com/NousResearch/hermes-agent/pull/149691) and [Hermes-phone](https://github.com/NousResearch/hermes-agent/pull/149263).
*   **CI/CD Maturity:** The focus on `emit_waterfall` middleware (**[PR #85370](https://github.com/NousResearch/hermes-agent/pull/85370)**) suggests a move toward more robust, production-grade tool execution pipelines.

### 7. User Feedback Summary
Users are generally impressed by the scope of v0.23, but current feedback is dominated by "v0.23 shock." The primary friction point is the transition to the unified gateway; power users with complex setups (symlinked profiles, cross-machine sync) are currently facing "permission_denied" and "admission_conflict" hurdles. The project is effectively using GitHub Issues as a live debugging dashboard, maintaining high transparency.

### 8. Backlog Watch
*   **[Issue #96906](https://github.com/NousResearch/hermes-agent/issue/96906):** A "delegation closeout" proposal (holding terminal responses for background tasks) has been pending since August. It is currently stalled, awaiting maintainer prioritization amidst the gateway stabilization work.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest (2026-11-06)

## 1. Today's Overview
QwenPaw is currently experiencing a high-intensity maintenance phase, characterized by a flurry of bug fixes and significant architectural refactoring. With 47 total items updated in the last 24 hours (14 issues, 33 PRs), developer activity is robust and focused on stabilizing the v2.3.x development cycle. The project is currently balancing critical stability fixes—particularly regarding memory management and plugin lifecycle—with large-scale refactors of session storage and configuration management.

## 2. Releases
*   **No new releases.** Current stable/beta status remains at v2.2.2.post1 / v2.3.0b3.

## 3. Project Progress (Merged/Closed)
*   **Refactoring/Cleanup:** Several PRs were merged to address technical debt, including the consolidation of access control workspaces ([PR #6788](https://github.com/agentscope-ai/QwenPaw/pull/6788)) and the isolation of synchronous hooks to protect the `asyncio` event loop ([PR #7842](https://github.com/agentscope-ai/QwenPaw/pull/7842)).
*   **Bug Resolution:** 
    *   Fixed a `TypeError` in code mode caused by parameter naming conflicts with positional arguments ([Issue #8581](https://github.com/agentscope-ai/QwenPaw/issue/8581)).
    *   Resolved an issue where workspace selection for new tasks failed to persist ([Issue #8555](https://github.com/agentscope-ai/QwenPaw/issue/8555)).
    *   Addressed potential startup failures in Matrix channels due to legacy state migration issues ([PR #8558](https://github.com/agentscope-ai/QwenPaw/pull/8558)).

## 4. Community Hot Topics
*   **[Issue #8040](https://github.com/agentscope-ai/QwenPaw/issue/8040) (Embedding Reindex):** Remains a top concern due to silent data loss during batch processing of CJK characters. Users are frustrated that the UI reports success despite underlying chunk failures.
*   **[PR #8532](https://github.com/agentscope-ai/QwenPaw/pull/8532) (Append-only Storage):** This is a critical architectural pivot. It aims to replace mutable session snapshots with durable SQLite history, directly addressing long-term stability and recovery issues.
*   **[PR #8586](https://github.com/agentscope-ai/QwenPaw/pull/8586) (Runtime Config):** A major refactor unifying ACP and native execution settings, signaling a move toward more predictable configuration state for complex agent setups.

## 5. Bugs & Stability
*   **Critical:** [Issue #8592](https://github.com/agentscope-ai/QwenPaw/issue/8592) (Creator Review Round failure) - A hard-blocker where review rounds become permanently indecipherable due to missing visual reference IDs.
*   **High:** [Issue #8580](https://github.com/agentscope-ai/QwenPaw/issue/8580) (Memory Tag Index) - Users are unable to read generated memory tags due to a 503 error, breaking long-term retrieval features.
*   **Medium:** [Issue #8585](https://github.com/agentscope-ai/QwenPaw/issue/8585) (Windows Pathing) - Canonicalization of extended-length paths is breaking SQLite read-only URI access, causing history recall failures on Windows.
*   **Minor:** [Issue #8590](https://github.com/agentscope-ai/QwenPaw/issue/8590) (UI Routing) - Plugin settings pages are currently breaking the sidebar navigation state.

## 6. Feature Requests & Roadmap Signals
*   **Pagination:** Strong user demand for pagination in "All Chats" ([Issue #3570](https://github.com/agentscope-ai/QwenPaw/issue/3570)) to improve performance in high-volume chat environments.
*   **Creator UI Enhancements:** Users are requesting a more polished Creator interface ([Issue #8591](https://github.com/agentscope-ai/QwenPaw/issue/8591)), specifically calling for better visual cues (buttons vs. backgrounds) and improved model management.
*   **Draggable UI:** [PR #8594](https://github.com/agentscope-ai/QwenPaw/pull/8594) introduces draggable width handles for the conversation column, a highly anticipated UX improvement.

## 7. User Feedback Summary
Users are generally satisfied with the breadth of features (e.g., Creator, Rerankers) but are encountering "beta-grade" instability as the ecosystem grows. The most prominent frustration is the inconsistency between the backend-processed data and the frontend state (e.g., reindexing reports, chat history, and configuration persistence). 

## 8. Backlog Watch
*   **[Issue #3570](https://github.com/agentscope-ai/QwenPaw/issue/3570):** Still awaiting a clear path to implementation regarding session list pagination.
*   **[Issue #8040](https://github.com/agentscope-ai/QwenPaw/issue/8040):** Significant data integrity issue that requires urgent maintenance attention to ensure reliable embedding re-indexing.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest - 2026-11-06

### 1. Today's Overview
ZeroClaw is currently in a high-intensity stabilization phase, heavily focused on hardening security boundaries and addressing architectural debt ahead of the v0.9.0 release. Development activity is intense, with 50 PRs updated in the last 24 hours, signaling a rigorous push to resolve critical security vulnerabilities and documentation gaps. The project exhibits strong health, characterized by active maintainer-led security audits and a steady expansion of the agent ecosystem through new channel integrations.

### 2. Releases
*No new releases in the last 24 hours.* The project is actively working toward **v0.9.0**, which is currently the primary target for several high-priority security patches merged today.

### 3. Project Progress
*   **Security Hardening:** Merged **[PR #12232](https://github.com/zeroclaw-labs/zeroclaw/pull/12232)**, a critical fix that prevents non-admin principals from accessing tools that should be reserved for operator authority (e.g., SOP execution, cron, and peer messaging).
*   **CI/CD Maintenance:** Merged **[PR #12253](https://github.com/zeroclaw-labs/zeroclaw/pull/12253)** to handle a `pin-utils` maintenance advisory, keeping the dependency tree clean.
*   **Goal Mode Foundation:** **[PR #11878](https://github.com/zeroclaw-labs/zeroclaw/pull/11878)** continues to progress, laying the foundation for "Goal Mode," a significant upcoming architectural shift for autonomous task lifecycle management.
*   **Ecosystem Expansion:** **[PR #12230](https://github.com/zeroclaw-labs/zeroclaw/pull/12230)** introduces a native Zulip channel, enhancing ZeroClaw’s multi-platform communication capabilities.

### 4. Community Hot Topics
*   **[Issue #10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526) (16 comments):** An accepted RFC regarding append-only session history and deterministic state replay. The high engagement suggests this is a cornerstone feature for the long-term reliability of ZeroClaw's agent memory model.
*   **[Issue #8132](https://github.com/zeroclaw-labs/zeroclaw/issues/8132) (13 comments):** Ongoing discussion about replacing React/Vite with a Rust/Wasm framework (Dioxus/Leptos/Yew). This reflects the community's desire for a purely Rust-native stack and better build performance.

### 5. Bugs & Stability
*   **Security (S0 - Critical):** Multiple vulnerabilities were identified and addressed concerning principal-ownership bypasses. **[Issue #11127](https://github.com/zeroclaw-labs/zeroclaw/issues/11127)**, **[Issue #11123](https://github.com/zeroclaw-labs/zeroclaw/issues/11123)**, **[Issue #12051](https://github.com/zeroclaw-labs/zeroclaw/issues/12051)**, and **[Issue #12046](https://github.com/zeroclaw-labs/zeroclaw/issues/12046)** were all closed following the fix in **[PR #12232](https://github.com/zeroclaw-labs/zeroclaw/pull/12232)**.
*   **Runtime (S2 - Degraded):** **[Issue #9572](https://github.com/zeroclaw-labs/zeroclaw/issues/9572)** reports that WebSocket turns can overflow the Tokio worker stack; this remains an open, high-risk item.
*   **Tooling (S2 - Degraded):** **[Issue #10926](https://github.com/zeroclaw-labs/zeroclaw/issues/10926)** highlights a bug in Matrix `send_via` where identities are incorrectly treated as room destinations.

### 6. Feature Requests & Roadmap Signals
*   **Managed File Uploads:** **[Issue #12181](https://github.com/zeroclaw-labs/zeroclaw/issues/12181)** introduces requests for native document attachments in the web dashboard, likely a priority for the next iteration of the Web UI.
*   **Developer Productivity:** Significant movement in improving CLI experience, notably **[PR #11935](https://github.com/zeroclaw-labs/zeroclaw/pull/11935)**, which adds visibility into cron run outputs from the terminal.

### 7. User Feedback Summary
Users are currently focused on "Production Readiness." The push to fix security policy gaps indicates that operators are treating ZeroClaw as a platform for sensitive, automated tasks where identity boundaries are critical. There is a clear tension between feature velocity and the need for strict, safe-by-default configurations.

### 8. Backlog Watch
*   **[Issue #9779](https://github.com/zeroclaw-labs/zeroclaw/issues/9779):** The SOP subsystem failing to load due to silent `sops_dir` configuration errors. This is a high-risk usability bug that has been open since August and needs a dedicated patch to prevent "silent failures" that frustrate operators.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/jinming1345/agents-radar).*