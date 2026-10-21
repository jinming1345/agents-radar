# OpenClaw Ecosystem Digest 2026-10-21

> Issues: 93 | PRs: 500 | Projects covered: 5 | Generated: 2026-10-21 01:22 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest: 2026-10-21

## 1. Today's Overview
OpenClaw is currently in a state of high-intensity maintenance and rapid UI modernization. With 93 active issues and 500 PRs updated in the last 24 hours, the project is balancing critical backend stability concerns—specifically memory management and SQLite concurrency—against a significant push to overhaul the mobile/web-UI responsiveness. Development velocity remains extremely high, though the volume of open PRs (292) suggests the maintainer bottleneck is tightening, particularly around complex architectural decisions.

## 2. Releases
*No new releases in the last 24 hours.*

## 3. Project Progress
Today's activity focused heavily on the **Web UI modernization suite**, with a massive wave of PRs (many from contributor `vyctorbrzezowski`) aimed at feature parity between desktop and mobile. 
*   **UI/UX Improvements:** Significant progress on mobile-responsive details panels, automation inventory views ([#176490](https://github.com/openclaw/openclaw/pull/176490)), and cross-viewport remote desktop controls ([#176552](https://github.com/openclaw/openclaw/pull/176552)).
*   **Infrastructure:** Test suite cleanup continues with redundant test removals ([#178853](https://github.com/openclaw/openclaw/pull/178853)) and optimization of CI/CD performance for iOS builds ([#178891](https://github.com/openclaw/openclaw/pull/178891)).

## 4. Community Hot Topics
*   **[#91588](https://github.com/openclaw/openclaw/issues/91588) (41 comments):** A critical Gateway memory leak (350MB to 15.5GB) remains the most discussed issue. Users are reporting OOM crashes, making this the highest-priority stability blocker.
*   **[#120385](https://github.com/openclaw/openclaw/issues/120385) (18 comments):** Confusion persists regarding missing MCP tools in scheduled/cron turns. It highlights a critical visibility gap in agent task execution.
*   **[#172091](https://github.com/openclaw/openclaw/issues/172091) (13 comments):** A SQLite WAL checkpoint deadlock caused by orphaned worker threads is causing significant operational pain, particularly on Windows deployments.

## 5. Bugs & Stability
*   **Critical (P0/P1):**
    *   **Gateway Memory Leak [#91588](https://github.com/openclaw/openclaw/issues/91588):** High severity; requires urgent memory profiling of the `launchd-handoff` cycle.
    *   **Late Reclamation Failure [#166634](https://github.com/openclaw/openclaw/issues/166634):** SQLite checkpoint expiration leaves agents in a permanent `UNAVAILABLE` state post-crash.
    *   **Codex Subagent Assignment Bloat [#172837](https://github.com/openclaw/openclaw/issues/172837):** A leak in the `nativeSubagentAssignments` logic is causing state bloat.
*   **High Severity (P2):**
    *   **Windows Performance Regression [#171831](https://github.com/openclaw/openclaw/issues/171831):** Startup times have ballooned from 55s to 320s, indicating a potential regression in the event loop/plugin registration.

## 6. Feature Requests & Roadmap Signals
*   **Post-Quantum Security:** A proactive request for a P2P channel adapter ([#178844](https://github.com/openclaw/openclaw/issues/178844)) signals interest in hardening OpenClaw against emerging security threats.
*   **Native Identity:** Continued demand for better management of personal identity vs. shared owners in macOS/iOS ([#162164](https://github.com/openclaw/openclaw/issues/162164)).
*   **UI Parity:** Expect the next release to feature a significantly more capable "Mobile Session Details" view, as evidenced by the large batch of UI features currently under review.

## 7. User Feedback Summary
Users are experiencing "tooling fatigue," particularly with the CLI toolchain. Pain points include:
*   **Frustration with `doctor --fix`:** Long execution times and lack of progress bars make the repair process feel like a "black hole."
*   **Silent Failures:** The browser snapshot tool fails silently with a 0 exit code, causing workflow disruptions.
*   **UI Friction:** The mobile experience is currently fragmented, though current development activity suggests a massive UX improvement is imminent.

## 8. Backlog Watch
*   **[#116164](https://github.com/openclaw/openclaw/issues/116164):** The Signal plugin module-state assertion is stale and lacks a fix, affecting users on beta versions.
*   **[#164690](https://github.com/openclaw/openclaw/issues/164690):** Duplicate MCP server spawning is creating massive memory overhead (~144MB/child). This is a known issue that requires a deeper architectural fix than simple patches.
*   **[#147935](https://github.com/openclaw/openclaw/issues/147935):** The "MAPLE" lifecycle contract for long-running agents is a high-level proposal needing urgent product triage to prevent agent divergence in complex multi-agent topologies.

---

## Cross-Ecosystem Comparison

⚠️ Comparative analysis generation failed.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest: 2026-10-21

## 1. Today's Overview
The Hermes Agent repository experienced high intensity today, with 63 total items updated (13 issues, 50 PRs). Development focus is currently heavily skewed toward stability and hardware-specific optimizations, particularly for Windows and high-memory AMD hardware. The project maintains a strong momentum in community contributions, specifically regarding plugin catalog growth and robust handling of local terminal processes.

## 2. Releases
*   **No new releases today.**

## 3. Project Progress
*   **Terminal Stability:** The critical bug causing empty terminal output when file descriptors exceed `FD_SETSIZE` was resolved via PR [#142125](https://github.com/NousResearch/hermes-agent/pull/142125).
*   **Kanban Refinement:** PR [#142310](https://github.com/NousResearch/hermes-agent/pull/142310) removed unsupported retry promises from task notifications to ensure clearer communication with users.
*   **Market/Safety Plugins:** The plugin catalog saw expansion with the addition of `greyridge-token-safety` ([#141825](https://github.com/NousResearch/hermes-agent/pull/141825)) and pending entries for market data and keyless inference.
*   **SSE Resilience:** PR [#32431](https://github.com/NousResearch/hermes-agent/pull/32431) significantly improved API server robustness by enabling `Last-Event-ID` replay for SSE events.

## 4. Community Hot Topics
*   **[Issue #94928](https://github.com/NousResearch/hermes-agent/issues/94928):** Terminal pipe fd limitations. With 8 comments, this was the primary focus of technical discussion until the fix was verified and closed today.
*   **[Issue #142301](https://github.com/NousResearch/hermes-agent/issues/142301):** Race condition in `reclaim_task`. This highlights a high-priority concern regarding task duplication in distributed environments.
*   **[Issue #140507](https://github.com/NousResearch/hermes-agent/issues/140507):** Windows local-model execution on AMD Strix Halo. High interest from hardware enthusiasts looking to leverage unified 128GB RAM pools.

## 5. Bugs & Stability
*   **Critical (High):** [Issue #141448](https://github.com/NousResearch/hermes-agent/issues/141448) reports the package manager (PM) incorrectly garbage collecting dependencies while they are in active use by live processes.
*   **High (Urgent):** [Issue #142307](https://github.com/NousResearch/hermes-agent/issues/142307) points to a security vulnerability where pinned `certifi` versions continue to trust compromised eMudhra CA intermediates.
*   **Medium:** [Issue #142288](https://github.com/NousResearch/hermes-agent/issues/142288) reports native vision images being dropped from context after a single turn on gateway platforms.

## 6. Feature Requests & Roadmap Signals
*   **Configuration Overrides:** PR [#139409](https://github.com/NousResearch/hermes-agent/pull/139409) proposes a Linux-style `config.d` directory for overrides, which would likely simplify deployments for power users.
*   **Usage-Window Plans:** PR [#142308](https://github.com/NousResearch/hermes-agent/pull/142308) adds support for usage-based allowance tracking, signaling a move toward more flexible billing models for enterprise or heavy-usage users.
*   **Kanban Evolution:** [Issue #142305](https://github.com/NousResearch/hermes-agent/issues/142305) suggests that human feedback in Kanban tasks should trigger specific re-runs of the same task, reflecting a desire for a more iterative, stateful agent loop.

## 7. User Feedback Summary
Users are currently expressing frustration with "hidden" failure states, such as CLI tools losing output silently due to FD limits or the Desktop app failing to release session leases when switching hosts ([Issue #142311](https://github.com/NousResearch/hermes-agent/issues/142311)). However, the rapid response to the terminal bug and the proactive addition of local-model memory fixes for Windows indicate a high level of responsiveness from the maintainers.

## 8. Backlog Watch
*   **[Issue #86413](https://github.com/NousResearch/hermes-agent/issues/86413):** A significant architectural question regarding filesystem namespaces for terminal backends has been open since August. It remains in a "needs-decision" state and represents a potential blocker for unified platform behavior.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest – 2026-10-21

## 1. Today's Overview
The IronClaw project is seeing highly focused activity around Model Context Protocol (MCP) extensibility and secure local environment integration. Development efforts are currently prioritized on resolving network policy hurdles that prevent local MCP servers from utilizing hosted-MCP registration features. While dependency maintenance remains consistent through automated bot activity, the core architectural discussions suggest the community is pushing for deeper local sovereignty and "bring-your-own-extension" capabilities.

## 2. Releases
*No new releases were reported for this period.*

## 3. Project Progress
*   **Dependency Hygiene:** Maintenance PRs (#8151, #8152, #8149, #8150, #8148, #8145) were opened to address security and version updates across the Rust, JavaScript, and Python stacks.
*   **Archived Maintenance:** PRs #7386 and #8048 were closed, cleaning up outdated dependency updates in favor of newer upstream versions.

## 4. Community Hot Topics
*   **[#8146] Hosted MCP: Loopback Endpoint Enrollment:** Users are hitting a roadblock where current network security policies reject local IP literals. This is critical for users trying to integrate local MCP connectors with hosted credential flows.
*   **[#8136] Proposal: Plazmi extension:** A new request for declarative auth and egress surfaces to support external extensions (specifically Plazmi) without cluttering the host core.
*   **[#2077] Market Contract Source:** An ongoing discussion regarding the need for on-chain contract visibility for `market.near.ai` to support sovereign, key-holding agents.

## 5. Bugs & Stability
*   **Critical (Networking/Policy):** [Issue #8146](https://github.com/nearai/ironclaw/issues/8146) highlights a regression or design limitation where the system rejects 127.0.0.1 loopback endpoints. 
    *   *Remediation:* [PR #8147](https://github.com/nearai/ironclaw/pull/8147) provides an explicit enrollment mechanism for trusted loopback endpoints, directly addressing this stability gap.

## 6. Feature Requests & Roadmap Signals
*   **Native Local MCP Support:** The combination of #8146 and #8147 strongly suggests that "local-first" MCP integration will be a high-priority feature in the upcoming version.
*   **Extension Sovereignty:** The request for declarative auth surfaces (#8136) signals a move toward a more modular architecture, allowing third-party extensions to manage their own egress and auth without requiring vendor logic in the IronClaw host.

## 7. User Feedback Summary
Users are expressing friction regarding the "hosted-first" design of the agent infrastructure. Specifically, developers building sovereign agents want to move away from HTTP-API-only dependencies and toward direct on-chain interaction (#2077). There is a clear demand for more "local-friendly" configurations that allow agents to operate on loopback networks without being blocked by strict enterprise-style host policies.

## 8. Backlog Watch
*   **[#2077] Contract source for market.near.ai:** Open since April 2026. This is a high-level request regarding the open-source nature of the market infrastructure. It remains a point of contention for developers building autonomous, key-holding agents who want to bypass centralized API infrastructure. *Maintainer attention is needed to clarify if/when the contract code will be open-sourced.*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest: 2026-10-21

## 1. Today's Overview
The QwenPaw ecosystem shows high development velocity, with 48 total GitHub events (15 issues, 33 PRs) processed in the last 24 hours. The project is currently deep in a cycle of architectural refinement, focusing on making the platform "lighter and more extensible" (Issue #8289) while addressing stability issues in desktop and channel-specific integrations. Developer activity is concentrated on enhancing the plugin system and ensuring reliability during model-fallback transitions, suggesting a shift toward enterprise-grade stability and modularity.

## 2. Releases
*   **None.** No new releases published in the last 24 hours.

## 3. Project Progress
Several critical fixes and enhancements were merged to stabilize the user experience:
*   **[#8339] Console Stability:** Merged a fix for scroll-position jumping in long conversations, addressing a common visual annoyance in the web UI.
*   **[#8215] LM Studio Integration:** Resolved an issue where audio-file delivery caused agent sessions to wedge due to modality-limit rejections from local model servers.
*   **[#8343] DingTalk Reliability:** Addressed a silent-failure bug where long-running sessions would result in dropped replies when webhooks expired.
*   **[#8200] Search Capability:** Integrated Firecrawl as a new `web_search` provider, expanding the platform's research capabilities.

## 4. Community Hot Topics
*   **[#8071] Plugin-facing Theme Extension:** A highly anticipated feature request for a semantic token override layer. Users want to allow plugins to exert more control over UI aesthetics without cluttering the primary codebase.
*   **[#7874] PawApp Redesign:** A massive architectural PR redesigning the SDK and control plane to create a unified host contract for plugins. This is the primary driver for future extensibility.
*   **[#8187] Channel Decoupling:** Continued debate and development on extracting channels into isolated sub-processes to improve fault tolerance.

## 5. Bugs & Stability
*   **[#8320] Critical (Desktop):** The `make-skill` validator fails in v2.2.2 because the `qwenpaw` module cannot be imported in bundled environments. A fix is pending in PR #8344.
*   **[#8315] High (Connectivity):** Feishu channel fails with `426 Upgrade Required` when standard system proxy variables are set without specific `NO_PROXY` exceptions.
*   **[#8340] Medium (UI):** Users report an inability to close the edit popup for scheduled (Cron) tasks, forcing a browser refresh.
*   **[#8329] Medium (Telegram):** Quoted messages in Telegram are silently ignored, preventing the agent from understanding context in threaded replies.

## 6. Feature Requests & Roadmap Signals
*   **Modularity (#8289):** The roadmap points toward a v2.3.0 release focused on a "lighter and more modular" architecture. Expect further PRs revolving around plugin refactoring.
*   **Real-time Voice (#7785):** Significant progress on adding realtime voice chat, which will likely be a flagship feature for upcoming beta cycles.
*   **Evaluation Leaderboard (#8253):** Community-driven effort to add a `/evaluation/` page for transparency in model performance.

## 7. User Feedback Summary
*   **Pain Points:** Users are struggling with the "silent failure" of messages when agents exceed token or timeout limits (notably in DingTalk and Telegram channels).
*   **Usability:** There is a strong demand for more "plugin-first" UI integration, allowing third-party tools to look and feel native to the console.
*   **DevOps:** The requirement for better subpath support behind reverse proxies (#8177) highlights the increasing use of QwenPaw in corporate/multi-service environments.

## 8. Backlog Watch
*   **[#7565] Plugin Unloading:** This complex, long-running PR is essential for the requested "hot-reload" features. As the project pushes for v2.3.0 modularity, this will require urgent maintainer review to ensure plugin stability.
*   **[#8124] Fallback logic:** An important fix for routing content-inspection errors to the fallback model chain. Currently, these errors kill the entire turn, negatively impacting user trust in the "model-fallback" feature.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest: 2026-10-21

## 1. Today's Overview
ZeroClaw is experiencing an intense period of architectural hardening and security-focused refactoring, evidenced by 69 combined active issues and PRs in the last 24 hours. The development focus has shifted toward formalizing trust boundaries, enforcing resource budgets, and resolving concurrency edge cases in the daemon runtime. While feature development (e.g., new providers and MCP integrations) continues, the current trend prioritizes system stability and security audit compliance over new user-facing functionality.

## 2. Releases
*   **None.** There were no new releases in the last 24 hours.

## 3. Project Progress
*   **Merged/Closed:** Only 1 PR was finalized today. The project remains in a heavy-development phase where most architectural changes are currently held in a draft or review state.
*   **Feature Advancement:** Significant work is underway on the "Goal Mode" V1 proposal (#11880) and transport-neutral policy contracts, alongside documentation efforts for local Sem MCP repository lookups (#11915).

## 4. Community Hot Topics
*   **[RFC] Principal-based trust boundaries (#11914):** This is the most critical architectural discussion. It addresses how content, memory, and capabilities are scoped, aiming to fix cross-agent leaks and system prompt budget overflows.
*   **[Bug] Cron & Gateway events (#11918):** Following user reports (#11916, #11917), this PR is the primary focus for stabilizing how cron outputs and session messages are surfaced to the web UI, indicating a community push for better dashboard responsiveness.

## 5. Bugs & Stability
*   **Critical (S2/S3) issues reported today:**
    *   **#11916:** "Quiet" cron results erroneously appearing in web chats (Fix PR #11918).
    *   **#11917:** Web dashboard fails to receive live events until the first manual reply (Impacts real-time UX).
    *   **#11912:** Memory recall bypasses per-agent scoping, causing potential cross-agent data leaks (High security risk).
    *   **#11904:** Race condition in cron database initialization when multiple connections attempt to switch to WAL mode.
    *   **#11899:** Daemon reload fails to correctly terminate existing gateway connections.

## 6. Feature Requests & Roadmap Signals
*   **Resource Budgeting:** There is a strong signal toward implementing "hard" limits rather than advisory ones, specifically for system prompts (#11910).
*   **Provider Expansion:** Addition of Firecrawl for web search (#11680) and Opper for model hosting (#11584) suggests a strategy of diversifying AI infrastructure support.
*   **Prediction:** The v0.8.7 release is likely to prioritize the security patches (specifically #11906, #11910) and the stabilization of the cron/gateway event loop.

## 7. User Feedback Summary
Current user sentiment reflects frustration with "leaky" abstractions, particularly regarding concurrency and session persistence. Users are reporting that channel interruptions lead to lost tool results (#11909) and that authentication providers sometimes fail in a "closed" state during background JWKS fetches (#11902). There is a palpable demand for more robust, "production-grade" error handling in the gateway.

## 8. Backlog Watch
*   **#10997 & #10998:** These relate to plugin installation and core tool sets for v0.8.7. They have been blocked since late September; maintainers need to address the dependency/binary-size constraints to move these toward delivery.
*   **#11332:** An S2 bug concerning the failure of skill review/creation loops in non-CLI channels has remained open since Oct 1st, representing a significant gap in the agent's autonomous learning capability.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/jinming1345/agents-radar).*