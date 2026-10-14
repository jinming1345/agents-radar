# OpenClaw Ecosystem Digest 2026-10-14

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-10-14 01:22 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest – 2026-10-14

### 1. Today's Overview
OpenClaw is currently experiencing an intense period of high-velocity stabilization and maintenance. With 500 issues and 500 pull requests updated in the last 24 hours, the project is under significant strain from regression reports following recent releases. Development focus is currently split between critical "ux-release-blocker" stability fixes and long-standing architectural concerns regarding memory management and database performance. The project health remains high in terms of contributor engagement, though the volume of open regressions indicates a challenging period for the release branch.

### 2. Releases
*   **[v2026.10.5-beta.3](https://github.com/openclaw/openclaw/tree/v2026.10.5-beta.3):** Focuses on "durable install" stability. It ensures `pnpm` installs retain Gateway services on Windows and improves service account handling. macOS now supports protected Bun services.
*   **[v2026.10.3](https://docs.openclaw.ai/releases/2026.10.3):** A broad maintenance release containing 90 commits and improvements from 99 contributors.

### 3. Project Progress
Today's development is heavily weighted toward patching regressions introduced in recent beta cycles:
*   **Auth & Lifecycle:** PR [#171510](https://github.com/openclaw/openclaw/pull/171510) migrates inference and logout SQLite operations into dedicated auth workers to prevent Gateway thread blocking.
*   **CI & Backporting:** Several PRs, such as [#171497](https://github.com/openclaw/openclaw/pull/171497) and [#171491](https://github.com/openclaw/openclaw/pull/171491), are focused on backporting critical fixes (Doctor cleanup and Composer state assertions) to the `release/2026.10.5` branch to minimize disruption for stable-channel users.
*   **UX Enhancements:** PR [#171530](https://github.com/openclaw/openclaw/pull/171530) successfully reduced input lag in the "New Session" composer, a common pain point for users with large model catalogs.

### 4. Community Hot Topics
*   **[Issue #148707](https://github.com/openclaw/openclaw/issues/148707):** (19 comments) A high-priority regression where replies are lost due to "active tool authority snapshot" errors. Users are expressing concern over reliability in multi-turn sessions.
*   **[Issue #97616](https://github.com/openclaw/openclaw/issues/97616):** (19 comments) Though closed, this was a major thread regarding zombie child process accumulation, highlighting frustration with system resource management.
*   **[PR #168703](https://github.com/openclaw/openclaw/pull/168703):** (Active discussion) Focuses on simplifying configuration help, reflecting a community push for better discoverability and reduced technical jargon.

### 5. Bugs & Stability
Stability is currently at a critical juncture with several P0/P1 items impacting user workflows:
*   **Regression (P0):** [Issue #166894](https://github.com/openclaw/openclaw/issues/166894) reports Gateway restart hangs of 30+ minutes on Windows.
*   **Regression (P0):** [Issue #160060](https://github.com/openclaw/openclaw/issues/160060) describes a "silent death" of the Gateway 54 minutes after standby thaw on Windows, with no logs or crash dumps.
*   **Performance (P1):** [Issue #163029](https://github.com/openclaw/openclaw/issues/163029) details 40–70s main-thread stalls due to external plugin reloading, persisting despite previous fix attempts.

### 6. Feature Requests & Roadmap Signals
*   **Muse Integration:** PR [#171526](https://github.com/openclaw/openclaw/pull/171526) aims to bring native "Muse Code" sign-in into the Model Setup screen, suggesting an effort to streamline enterprise/subscription logins.
*   **Policy Management:** [Issue #91676](https://github.com/openclaw/openclaw/issues/91676) continues to track the demand for allowing sandboxed agents to utilize `skill_workshop` tools.

### 7. User Feedback Summary
Users are currently experiencing "update fatigue." Recurring themes include:
*   **Update Failures:** Several reports ([#156112](https://github.com/openclaw/openclaw/issues/156112), [#170331](https://github.com/openclaw/openclaw/issues/170331)) highlight that `openclaw update` often fails while manual `npm install -g` succeeds, indicating a fragile auto-update mechanism.
*   **Resource Management:** Significant concern exists regarding disk growth due to un-GC'd `plugin-captures` ([#158390](https://github.com/openclaw/openclaw/issues/158390)) and unbounded SQLite tables ([#114612](https://github.com/openclaw/openclaw/issues/114612)).

### 8. Backlog Watch
*   **[Issue #114612](https://github.com/openclaw/openclaw/issues/114612):** This critical memory-core issue regarding unbounded SQLite growth remains open and un-fixed, posing a long-term risk for server-side deployments.
*   **[Issue #125308](https://github.com/openclaw/openclaw/issues/125308):** Long-running session bloat continues to need a comprehensive compaction solution; current fixes address the symptoms, but not the root cause of transcript-byte fusion.

---

## Cross-Ecosystem Comparison

# Ecosystem Cross-Project Analysis: 2026-10-14

### 1. Ecosystem Overview
The open-source AI agent ecosystem is currently transitioning from "experimental prototype" to "enterprise-grade infrastructure," evidenced by a collective struggle with state persistence, resource management, and complex dependency handling. Projects are increasingly moving away from simple chat-wrappers toward sophisticated multi-agent orchestration, gateway services, and modular plugin architectures. While user engagement is high, the entire sector is currently grappling with significant "update fatigue" and technical debt related to session history management and system resource leakage.

### 2. Activity Comparison
| Project | Recent Updates (Issues/PRs) | Release Status | Health Score (Est.) |
| :--- | :--- | :--- | :--- |
| **OpenClaw** | ~1000 (Very High) | Beta/Maintenance | Strained (High Regressions) |
| **Hermes Agent** | ~100 (High) | Stable/Maintenance | Robust (Corrective) |
| **IronClaw** | ~2 (Low) | Stable/Static | Very High (Steady) |
| **QwenPaw** | ~62 (High) | Beta/Active | Improving (Hardening) |
| **ZeroClaw** | ~74 (High) | Pre-release (v0.8.6) | Volatile (High Iteration) |

### 3. OpenClaw’s Position
OpenClaw operates as the "heavyweight" reference implementation. 
*   **Advantages:** It possesses the largest contributor base and feature set, making it the de facto hub for enterprise-level agent features (e.g., Muse integration).
*   **Approach:** Unlike the modular, lightweight approach of IronClaw, OpenClaw attempts to solve everything in the core gateway, leading to significant "update fatigue" and registry-level performance issues (SQLite bloating).
*   **Comparison:** Its community is significantly larger than its peers, which creates a "too-big-to-fail" dynamic where high-velocity patching is required daily to prevent massive user disruption.

### 4. Shared Technical Focus Areas
*   **Session Management & Data Integrity:** Both **OpenClaw** and **ZeroClaw** are struggling with database-level persistence (SQLite) and session state corruption. 
*   **Agent Observability & Cost Tracking:** **ZeroClaw** (cost ingestion) and **QwenPaw** (Langfuse observations) highlight a sector-wide move toward rigorous, enterprise-compliant telemetry.
*   **Container/Gateway Isolation:** **Hermes Agent** and **QwenPaw** are both actively hardening the boundary between host environments and agent runtimes to prevent path-traversal and privilege issues.

### 5. Differentiation Analysis
*   **IronClaw** differentiates by being "infrastructure-light"—focusing on a declarative extension architecture that minimizes core repository bloat.
*   **Hermes Agent** leans into "Docker-first" professional workflows, prioritizing container interop and cron-based task scheduling over UI/UX surface area.
*   **QwenPaw** is the "frontend-focused" competitor, heavily investing in the Agent Console Platform (ACP) to provide a user-friendly, browser-based management layer for complex agents.
*   **OpenClaw/ZeroClaw** compete in the "comprehensive gateway" space, providing all-in-one solutions that are feature-rich but currently suffer from configuration complexity.

### 6. Community Momentum & Maturity
*   **High Momentum (Straining):** OpenClaw and ZeroClaw. Both are iterating aggressively toward major releases, resulting in a high volume of P0/P1 regression bugs that test the patience of their user bases.
*   **Stable & Maturing:** IronClaw and Hermes Agent. These projects have reached a "steady state," prioritizing long-term architectural stability over rapid, breaking feature additions.
*   **Rapid Iteration:** QwenPaw is currently in a "make or break" hardening phase, focusing on performance bottlenecks that previously prevented professional adoption.

### 7. Trend Signals
*   **The "Agent-to-Enterprise" Pivot:** Developers are demanding professional-grade features: reverse-proxy support, custom marketplaces, and granular sub-agent model routing.
*   **Resource Sensitivity:** The rise of issues regarding "unbounded SQLite growth" and "memory-leak hangs" indicates that agents are moving from short, ephemeral tasks to long-running, continuous agent loops.
*   **Configuration-as-a-Barrier:** There is a clear trend toward abstracting CLI configuration into visual dashboards (ZeroClaw/OpenClaw). The "CLI-only" era is ending; projects that do not provide intuitive, low-friction configuration UI are seeing user pushback.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest: 2026-10-14

## 1. Today's Overview
The Hermes Agent project is seeing high-intensity development activity, with 100 total updates across issues and PRs in the last 24 hours. The focus has shifted heavily toward stabilizing the Docker/Remote backend experience, addressing performance regressions in cron multiplexing, and resolving critical auth-related bugs. Project health appears robust, with active PRs covering both complex backend architectural fixes and granular UI/UX refinements.

## 2. Releases
*No new releases identified for 2026-10-14.*

## 3. Project Progress
Development today was largely corrective and focused on performance tuning:
*   **Cron/Performance:** PR [#138122](https://github.com/NousResearch/hermes-agent/pull/138122) addresses the multiplex cron ticker issue by resolving profile routes once per cycle, mitigating high CPU usage.
*   **Agent/Docker:** PRs [#138120](https://github.com/NousResearch/hermes-agent/pull/138120) and [#138124](https://github.com/NousResearch/hermes-agent/pull/138124) resolve issues where the agent was misinterpreting container-absolute paths as host paths, ensuring better directory navigation in Docker environments.
*   **Reliability:** PR [#138128](https://github.com/NousResearch/hermes-agent/pull/138128) improves robust fallback logic by re-probing Codex quotas before attempting to bench exhausted candidates.

## 4. Community Hot Topics
*   **[#131859] Cannot open a pull request via API** (38 comments): An ongoing issue regarding authentication failures with the `gh` CLI. It remains the most discussed issue, signaling a potential friction point for contributors trying to submit PRs via API.
*   **[#5320] Raise/auto-scale memory_char_limit defaults** (13 comments): Users are pushing for larger memory defaults to prevent context truncation during long sessions, indicating a trend toward more complex/extended agent tasks.
*   **[#80222] Per-call model and reasoning_effort overrides on delegate_task** (8 comments): A significant architectural feature request to allow fine-grained control over sub-agent behavior.

## 5. Bugs & Stability
*   **[P1] [#138039] Over-cap checkpoint store flattens projects:** A critical regression causing silent loss of snapshots. Fix needed urgently.
*   **[P2] [#138105] Cron ticker starvation:** Multiplexed cron jobs are starving the Discord heartbeat due to inefficient config re-parsing. Fix pending in [#138122](https://github.com/NousResearch/hermes-agent/pull/138122).
*   **[P2] [#138044] Multiplexed gateway ignores terminal scope:** Commands are running on the host instead of the container, posing a potential security/isolation risk.
*   **[P2] [#138108] Matrix/eM Client decryption failure:** A specific interop issue where Base64 padding errors prevent message delivery.

## 6. Feature Requests & Roadmap Signals
*   **Voice-Only Auto-Replies:** PR [#138126](https://github.com/NousResearch/hermes-agent/pull/138126) suggests an increasing interest in "voice-first" agent interactions.
*   **Public Speech Streaming:** PR [#138127](https://github.com/NousResearch/hermes-agent/pull/138127) indicates the platform is preparing for real-time auditory feedback for streaming responses, likely for desktop/dashboard users.

## 7. User Feedback Summary
Users are currently struggling with the "friction of complex setups." Specifically, the disconnect between local and Dockerized environments (file paths, permissions) and the overhead of managing multiple profiles on a single gateway are top pain points. The community is generally satisfied with the tool's power but increasingly vocal about the "small" configuration limits (memory/compression) that block professional-grade workflows.

## 8. Backlog Watch
*   **[#134394] Dependency Security Advisories:** Open security advisories for PyJWT, httpx2, and others ([URL](https://github.com/NousResearch/hermes-agent/issues/134394)). This requires urgent maintainer attention to update dependencies to safe versions.
*   **[#133212] subagent_lifecycle v1.1:** A complex feature request for plugin orchestrators that has been stalled without a clear decision from the maintainers ([URL](https://github.com/NousResearch/hermes-agent/issues/133212)).

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest: 2026-10-14

### Today's Overview
The IronClaw repository is experiencing a period of quiet, low-velocity maintenance, consistent with a steady-state development phase. Activity in the last 24 hours has been limited to a single architectural proposal and a routine dependency update, indicating that there is no immediate pressure from urgent bug fixes or major feature releases. The project maintains a focus on extensibility, with the community looking to leverage existing internal interfaces for third-party integrations rather than requesting core engine changes.

### Releases
*No new releases were published in the last 24 hours.*

### Project Progress
*   **PR #8137 (chore):** A routine dependency update for `brace-expansion` within the internal documentation directory. This indicates that the repository’s tooling and documentation ecosystem remain active, even when core logic development is paused.

### Community Hot Topics
*   **[Issue #8136](https://github.com/nearai/ironclaw/issues/8136): Proposal for optional hosted-MCP Plazmi extension.**
    *   **Analysis:** This is the most significant item of the day. The user is proposing to utilize IronClaw’s existing "Reborn" extension framework—specifically its declarative metadata and auth seams—to integrate a third-party service (Plazmi). This signals that the community is successfully adopting IronClaw's design pattern of keeping vendor-specific logic outside the host codebase, favoring modular, external extension surfaces.

### Bugs & Stability
*   **Status:** No new bugs, crashes, or regressions were reported in the last 24 hours. The project’s stability appears currently unaffected by the minor documentation-related updates pending.

### Feature Requests & Roadmap Signals
*   **Roadmap Signal:** The request in **[Issue #8136](https://github.com/nearai/ironclaw/issues/8136)** suggests that the "hosted-MCP metadata" feature is effectively acting as the project's primary hook for the agent ecosystem. If this proposal is accepted, we can expect to see more "companion" type extensions appearing in the community that rely on this declarative auth/egress pattern.

### User Feedback Summary
There is no direct user feedback regarding performance or stability reported today. However, the proposal in Issue #8136 implies a positive sentiment regarding the project's current extensibility architecture; users clearly feel empowered to build atop IronClaw without modifying the core, which reflects positively on the current API design.

### Backlog Watch
*   **Maintenance Note:** The backlog currently appears to be in a stable state. With only one open issue and one open PR, the project does not show signs of significant technical debt or a backlog of "stale" issues. The maintainers appear to be effectively managing the flow of incoming proposals.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest: 2026-10-14

### 1. Today's Overview
QwenPaw is currently experiencing a high-velocity development cycle, characterized by intense efforts to stabilize the frontend console and improve plugin architecture. With 62 total PR and Issue updates in the last 24 hours, the project shows strong maintenance engagement, particularly in addressing performance bottlenecks and deployment limitations. The community is focused on refining the "ACP" (Agent Console Platform) experience, addressing long-standing timeout issues, and hardening the system against resource-intensive tasks.

### 2. Releases
*   **No new releases were published in the last 24h.** The project remains on version 2.2.1/2.2.2-beta branch tracking.

### 3. Project Progress
*   **Core & Architecture:** PR [#8128](https://github.com/agentscope-ai/QwenPaw/pull/8128) successfully moved the "Hub" to the plugin system, enabling custom marketplaces.
*   **Performance:** PR [#8212](https://github.com/agentscope-ai/QwenPaw/pull/8212) resolved a critical async generator memory leak/hang during tool completion, while [#8221](https://github.com/agentscope-ai/QwenPaw/pull/8221) optimized polling frequency to prevent frontend request accumulation.
*   **Observability:** PR [#7964](https://github.com/agentscope-ai/QwenPaw/pull/7964) (under review) addresses a long-standing issue where Langfuse tool observations failed to record actual output data.
*   **Dependency Management:** Updated `agentscope` core dependency to `2.0.10` via [#8220](https://github.com/agentscope-ai/QwenPaw/pull/8220).

### 4. Community Hot Topics
*   **Frontend UX Overhaul:** The new "UI/UX Foundation" PR [#8217](https://github.com/agentscope-ai/QwenPaw/pull/8217) is generating significant interest, addressing lazy loading errors and standardizing page shells. 
*   **Plugin Autonomy:** Issue [#8071](https://github.com/agentscope-ai/QwenPaw/issues/8071) regarding "Plugin-facing theme extension points" highlights a demand for developers to have deeper control over the visual presentation of their agents.
*   **Cloud Accessibility:** Issue [#8232](https://github.com/agentscope-ai/QwenPaw/issues/8232) introduces a community-driven effort to host 100 free cloud computers for users, reflecting a desire to lower the entry barrier for QwenPaw.

### 5. Bugs & Stability
*   **[Critical] Persistent Hangs:** Issue [#8228](https://github.com/agentscope-ai/QwenPaw/issues/8228) reports that base64-encoded tool outputs (images/files) are blowing up chat history sizes (>10MB), causing consistent 30s timeouts. **Fix in progress:** PR [#8229](https://github.com/agentscope-ai/QwenPaw/pull/8229) attempts to truncate these outputs.
*   **[High] ACP Plugin Failure:** Issue [#8222](https://github.com/agentscope-ai/QwenPaw/issues/8222) notes that installed plugins never load in `qwenpaw acp` mode, rendering many tools inaccessible.
*   **[Medium] Windows Cleanup:** Issue [#8206](https://github.com/agentscope-ai/QwenPaw/issues/8206) identifies a file-locking bug on Windows where `qwenpaw-creator` log files prevent project deletion.
*   **[Medium] Cron Instability:** Issue [#8225](https://github.com/agentscope-ai/QwenPaw/issues/8225) reports that "zero-downtime" hot reloads are unintentionally cancelling active cron tasks.

### 6. Feature Requests & Roadmap Signals
*   **Python Code Mode:** PR [#8224](https://github.com/agentscope-ai/QwenPaw/pull/8224) introduces an experimental mode for native Python tool orchestration, signaling a shift toward more powerful code-execution agents.
*   **Deployment Flexibility:** Users are requesting better reverse-proxy support (Issue [#8177](https://github.com/agentscope-ai/QwenPaw/issues/8177)) and custom marketplace sources (Issue [#8015](https://github.com/agentscope-ai/QwenPaw/issues/8015)), indicating a trend toward enterprise/intranet-ready deployments.

### 7. User Feedback Summary
Users are generally satisfied with the speed of bug fixes but are hitting "wall" issues in deployment. The primary pain points are **frontend performance** (snapping back, timeouts on large histories) and **plugin management** (install/update reliability). The community is actively using PRs to fill functional gaps, indicating a highly participatory but currently strained ecosystem.

### 8. Backlog Watch
*   **[Long-term] Background Task Notifications:** Issue [#7056](https://github.com/agentscope-ai/QwenPaw/issues/7056) (Created 2026-08-15) remains open, seeking an event-driven mechanism for background tasks rather than current polling methods. This is a critical architectural requirement for enterprise-grade usage.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest: 2026-10-14

### 1. Today's Overview
ZeroClaw is currently in a state of high-intensity stabilization and feature iteration, with significant activity across its runtime, gateway, and plugin infrastructure. Development focus is currently split between finalizing the v0.8.6 plugin release and addressing architectural regressions in session state persistence and cost tracking. With 74 items updated in the last 24 hours, the project maintains a high velocity, though the influx of bug reports suggests that recent changes to the gateway and agent-prompting logic require immediate polish.

### 2. Releases
*   **No new releases** were published in the last 24 hours. The project is actively working toward **v0.8.6** and **v0.9.0** as outlined in [Tracker #7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432).

### 3. Project Progress
*   **Merged/Closed:** [PR #11435](https://github.com/zeroclaw-labs/zeroclaw/pull/11435) was closed, resolving a critical issue where rejected headless SOP (Standard Operating Procedure) runs remained in a "Running" state, incorrectly consuming concurrency limits.
*   **Feature Advancements:** Active development continues on the WASM plugin host ([PR #11347](https://github.com/zeroclaw-labs/zeroclaw/pull/11347)) and quickstart tool plugin activation ([PR #11309](https://github.com/zeroclaw-labs/zeroclaw/pull/11309)), signaling a major push for the v0.8.6 plugin ecosystem.

### 4. Community Hot Topics
*   **[Issue #11420](https://github.com/zeroclaw-labs/zeroclaw/issues/11420) (8 comments):** A high-priority bug regarding SQLite session backend rewrites is causing loss of historical per-message timing. This is currently the most discussed item, highlighting a need for more granular transcript management.
*   **[Issue #7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432) (6 comments):** The central tracking issue for v0.8.6 and v0.9.0 architectural delivery remains a focal point for the maintainer team as they coordinate the complex transition of gateway separation.

### 5. Bugs & Stability
*   **Critical Regressions:**
    *   [Issue #11420](https://github.com/zeroclaw-labs/zeroclaw/issues/11420): SQLite timestamps being overwritten on every turn. **Fix in progress:** [PR #11676](https://github.com/zeroclaw-labs/zeroclaw/pull/11676).
    *   [Issue #11606](https://github.com/zeroclaw-labs/zeroclaw/issues/11606): `model_routing_config` is accidentally wiping out entire agent configurations during `upsert_agent` calls. 
*   **Observability/Cost:**
    *   [Issue #11204](https://github.com/zeroclaw-labs/zeroclaw/issues/11204): OpenRouter cost ingestion failure ($0.00 reports).
    *   [Issue #11613](https://github.com/zeroclaw-labs/zeroclaw/issues/11613): Under-counting tokens due to discarded reasoning tokens in OpenAI-compatible providers.
*   **Performance:** A suite of issues ([#11696](https://github.com/zeroclaw-labs/zeroclaw/issues/11696), [#11703](https://github.com/zeroclaw-labs/zeroclaw/issues/11703), [#11704](https://github.com/zeroclaw-labs/zeroclaw/issues/11704)) highlights that frequent system prompt rebuilding is causing excessive prompt cache busts, impacting both cost and latency.

### 6. Feature Requests & Roadmap Signals
*   **Advanced Routing:** [PR #11577](https://github.com/zeroclaw-labs/zeroclaw/pull/11577) proposes enabling subagents to run on specific model routes, providing more granular control over agent capabilities.
*   **Configuration Improvements:** [PR #11419](https://github.com/zeroclaw-labs/zeroclaw/pull/11419) aims to make secret key/value maps editable directly through the dashboard/Zerocode, removing CLI-only friction.
*   **New Integrations:** [PR #11721](https://github.com/zeroclaw-labs/zeroclaw/pull/11721) adds the "Standard Compute" model provider family.

### 7. User Feedback Summary
Users are currently facing "noisy" data and configuration fragility. The primary pain points are:
*   **Configuration Anxiety:** Users fear using `model_routing_config` due to the risk of destructive field wipes.
*   **Observability Gaps:** Inaccurate cost tracking and confusing timestamp/date formatting in the dashboard are causing users to distrust the platform's reporting features.
*   **Session Management:** Truncation logic ([Issue #11711](https://github.com/zeroclaw-labs/zeroclaw/issues/11711)) and session rewriting behaviors are causing data loss that frustrates those relying on long-term conversation context.

### 8. Backlog Watch
*   **[Issue #10261](https://github.com/zeroclaw-labs/zeroclaw/issues/10261):** A task to improve filesystem dispatch-loop delivery regression testing remains open since August. It is critical for hardening delivery guarantees but has seen minimal movement.
*   **[Issue #11207](https://github.com/zeroclaw-labs/zeroclaw/issues/11207):** A community request for documentation on Tsubasa custom-provider setups is pending maintainer acknowledgment on scope.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/jinming1345/agents-radar).*