# OpenClaw Ecosystem Digest 2026-11-03

> Issues: 81 | PRs: 500 | Projects covered: 5 | Generated: 2026-11-03 01:31 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest: 2026-11-03

## 1. Today's Overview
OpenClaw is experiencing a period of intense maintenance and stability-focused development, with 581 total updates across issues and PRs in the last 24 hours. The project is currently prioritizing "fix-shape-clear" initiatives to address regressions in session state and database integrity. Despite the high volume of incoming bug reports, the core team and community contributors are actively iterating on diagnostic tooling and memory management to stabilize the recent 2026.10.x releases.

## 2. Releases
*No new releases identified for 2026-11-03.*

## 3. Project Progress
*   **Resolved Bugs:** PR #191573 introduced custom SVG icons for side-chat panels, improving UI navigation for plugin authors. PR #191585 resolved a long-standing issue where captioned media blocks in Feishu failed to deliver when block streaming was disabled.
*   **Performance Improvements:** PR #191586 and #191583 added granular stage attribution for memory recall and worktree provisioning, providing operators with deeper visibility into startup bottlenecks.
*   **Infrastructure:** PR #190890 improved the efficiency of Telegram polling workers, reducing memory footprint and startup time.

## 4. Community Hot Topics
*   **#166634:** [Late reclamation commit checkpoint failure](https://github.com/openclaw/openclaw/issues/166634) (22 comments) – A critical P0 issue causing permanent agent unavailability after crash recovery. This is currently a primary blocker for session reliability.
*   **#178359:** [Doctor --fix hangs on macOS](https://github.com/openclaw/openclaw/issues/178359) (21 comments) – Users report that diagnostic repair tools idle indefinitely, preventing recovery from database corruption.
*   **#187900:** [Doctor hangs on Linux](https://github.com/openclaw/openclaw/issues/187900) (20 comments) – A parity issue to the macOS hang, indicating a platform-agnostic failure in the diagnostic toolchain.

## 5. Bugs & Stability
*   **P0 (Critical):** [#166634](https://github.com/openclaw/openclaw/issues/166634) Agent unavailability post-crash. [#191449](https://github.com/openclaw/openclaw/issues/191449) iOS app "Connecting" freeze (no fix PR).
*   **P1 (High):** [#185578](https://github.com/openclaw/openclaw/issues/185578) Gateway V8 heap memory leak (~25 MiB/h). [#190806](https://github.com/openclaw/openclaw/issues/189806) macOS Gateway memory bloat (~0.5 GB/day).
*   **Ongoing Fixes:** Multiple PRs (e.g., [#191547](https://github.com/openclaw/openclaw/pull/191547)) are targeting the finalizer and update-repair flows to ensure database integrity during migrations.

## 6. Feature Requests & Roadmap Signals
*   **Automation Budgeting:** [#179292](https://github.com/openclaw/openclaw/issues/179292) Users are requesting per-surface token cost attribution and hard budget enforcement to prevent runaway agent costs.
*   **Deferred Completion:** [#112372](https://github.com/openclaw/openclaw/issues/112372) A proposed "wakeOnReply" mode to improve efficiency for complex multi-agent workflows.
*   **Prediction:** Expect "Budget/Quota" management to move to the front of the roadmap as the ecosystem of paid-skill plugins grows (e.g., [#191008](https://github.com/openclaw/openclaw/issues/191008)).

## 7. User Feedback Summary
Users are currently expressing frustration with "Invisible" failures, where the `doctor` command fails to provide feedback or hangs, leaving them unable to resolve database or network permission issues (#191429). There is strong demand for more transparent diagnostics and improved UX for the native mobile apps, specifically regarding table rendering (#191076) and chat transcript persistence.

## 8. Backlog Watch
*   **#112313:** [Dead-lettered outbound delivery queues](https://github.com/openclaw/openclaw/issues/112313) – This has been open since July and represents a significant "diamond lobster" (high difficulty) issue where failed messages are never cleared or retried, causing permanent data/queue clutter.
*   **#89210:** [WhatsApp watchdog tuning](https://github.com/openclaw/openclaw/issues/89210) – Despite being closed, the request for exposed tuning parameters remains a frequent point of contention for enterprise users running WhatsApp channels.

---

## Cross-Ecosystem Comparison

## Cross-Project Ecosystem Report: 2026-11-03

### 1. Ecosystem Overview
The open-source AI agent ecosystem is currently transitioning from an "experimental feature" phase to a "production-grade reliability" phase. Projects are overwhelmingly focused on stabilizing session persistence, memory management, and cross-platform integrations (Telegram/Slack/Matrix). While high-velocity development continues, the primary bottleneck for adoption across the board has shifted from "model capability" to "operational stability"—specifically regarding database integrity, memory leaks, and diagnostic tool maturity.

### 2. Activity Comparison
| Project | Issues (Recent) | PRs (Recent) | Release Status | Health Score* |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 581+ (Total) | High (Active) | Stable (Fix focus) | Medium (Critical P0s) |
| **Hermes Agent** | 11 | 50 | v0.22.6 (Recent) | High |
| **IronClaw** | 0 | Automated only | None | Stable (Maintenance) |
| **QwenPaw** | 11 | 46 | v2.3.0-beta.2 | High |
| **ZeroClaw** | 10 | 50 | None | Medium |

*\*Score based on contributor activity vs. backlog severity.*

### 3. OpenClaw’s Position
*   **Advantages:** OpenClaw maintains the most comprehensive diagnostic tooling (e.g., `doctor` command) and has a massive, highly engaged community that identifies edge-case regressions quickly. 
*   **Technical Approach:** Unlike the lightweight, automated maintenance of IronClaw, OpenClaw is deeply invested in custom UI components (SVG side-panels) and complex database migration logic, prioritizing feature parity with enterprise messaging platforms.
*   **Community:** Largest in the cohort, but currently facing a "success penalty" where the volume of incoming bug reports is challenging the core team's ability to maintain high-velocity progress without stability trade-offs.

### 4. Shared Technical Focus Areas
*   **Memory & Resource Management:** Almost every project (OpenClaw, QwenPaw, ZeroClaw) is battling memory leaks or "poisoned" conversation state during long-running sessions. 
*   **Platform-Agnostic Messaging:** Strong, concurrent demand for better Slack/Telegram/Matrix integration with features like "quiet modes" (Hermes, OpenClaw, ZeroClaw).
*   **Diagnostic Transparency:** All projects are struggling with the "silent failure" problem, where the system fails to report why a tool or connection failed, driving user frustration.

### 5. Differentiation Analysis
*   **Hermes Agent:** Positioned as the "modern integrator," focusing on MCP (Model Context Protocol) and flexible plugin architecture for professional environments.
*   **QwenPaw:** Differentiated by its "Desktop Polish" focus, aiming to provide a seamless console UI experience (e.g., settings indexing, media previews).
*   **ZeroClaw:** Highly focused on the "Advanced Agent" architecture, emphasizing RAG capabilities (Qdrant/Hybrid recall) and sub-agent isolation.
*   **IronClaw:** The "minimalist/stable" choice, opting for zero-feature flux in favor of strict dependency hygiene and security.

### 6. Community Momentum & Maturity
*   **High Momentum (Rapid Iteration):** **Hermes Agent** and **QwenPaw** show the healthiest balance, releasing stable updates while actively addressing bugs. **ZeroClaw** is iterating rapidly but is hampered by architectural complexity.
*   **Stabilizing/Maintenance:** **OpenClaw** is in a critical maintenance "sprint" to clear technical debt. **IronClaw** has reached a state of "automated maturity," where human overhead is minimal.

### 7. Trend Signals
*   **Agent Budgeting:** We are seeing the rise of "Token Budgeting" and "Hard Cost Attribution" as a core requirement for any serious agent framework, as users move from prototyping to production billing.
*   **Reasoning Model Alignment:** Projects are rushing to support "Thinking" models (e.g., Claude Mythos, OpenAI reasoning), requiring architectural shifts in how conversation "envelopes" are parsed and stored.
*   **The "Agent-as-a-Colleague" Shift:** The demand for features like "allow_silence" and better integration with professional tools like Slack/Telegram suggests agents are no longer just for personal experimentation but are being integrated into daily professional workflows. Developers should prioritize UX in "noisy" environments.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest: 2026-11-03

## 1. Today's Overview
The Hermes Agent project remains in a state of high-velocity development, evidenced by a significant surge of 50 PR updates and 11 issue updates within the last 24 hours. The focus is squarely on stabilization following the v0.22.6 release, alongside a push for deeper platform integration (Telegram, Slack) and desktop UX improvements. Overall project health is strong, with active community contributions and a clear roadmap, though recent releases have surfaced minor regression risks regarding TLS configurations.

## 2. Releases
*   **[v0.22.6](https://github.com/NousResearch/hermes-agent/releases/tag/v0.22.6):** A major roll-up patch integrating ~776 PRs since v0.22.5. This release stabilizes the CLI, Microsoft Store app, Docker, and Hermes Cloud interfaces. No major breaking changes were cited, but users should prepare for a significant codebase jump.

## 3. Project Progress
*   **Merged/Closed Work:**
    *   **[#148127](https://github.com/NousResearch/hermes-agent/pull/148127):** Fixed Anthropic "Claude Mythos" integration by correctly identifying it as a mandatory-thinking model, preventing HTTP 400 errors.
    *   **[#148197](https://github.com/NousResearch/hermes-agent/pull/148197):** Added necessary extension hooks for `model_picker` to allow for better plugin-based model payload transformation.
    *   **[#148198](https://github.com/NousResearch/hermes-agent/pull/148198):** Added `correlation_id` to tool-hook payloads, enabling significantly improved state correlation for complex plugin architectures.

## 4. Community Hot Topics
*   **[#148239](https://github.com/NousResearch/hermes-agent/pull/148239):** (I18n) Active movement on Italian localization, reflecting the project's push for broader accessibility.
*   **[#148240](https://github.com/NousResearch/hermes-agent/pull/148240):** (MCP/Skills) High interest in loading manifest-verified remote skills; represents a shift toward more modular, agentic capabilities.
*   **[#148153](https://github.com/NousResearch/hermes-agent/pull/148153):** (UX) Extensive discussion on the new "Simplified agent mode" sidebar, indicating a strong desire for more streamlined desktop workflows.

## 5. Bugs & Stability
*   **[#148241](https://github.com/NousResearch/hermes-agent/issue/148241) [High]:** Regression in v0.22.6 where `SSL_CERT_FILE` is ignored. Users behind TLS-intercepting proxies are seeing connection failures.
*   **[#148235](https://github.com/NousResearch/hermes-agent/issue/148235) [Medium]:** Buzz plugin authentication error; NIP-94 attachment downloads fail due to missing credentials, causing false negatives in agent media processing.
*   **[#148237](https://github.com/NousResearch/hermes-agent/issue/148237) [Medium]:** Test suite instability; the `live_system_guard` wedges during teardown if `psutil` is missing, impacting developer CI cycles.
*   **[#148008](https://github.com/NousResearch/hermes-agent/issue/148008) [Medium]:** MOA (Mixture of Agents) functionality reported as non-functional via the web dashboard.

## 6. Feature Requests & Roadmap Signals
*   **[#148236](https://github.com/NousResearch/hermes-agent/issue/148236):** Telegram support for agent-facing inline buttons, targeting sophisticated bot interactions (e.g., "Friendigi" style).
*   **[#148233](https://github.com/NousResearch/hermes-agent/pull/148233):** Platform-wide `allow_silence` setting, allowing for cleaner integration into noisy group chats without per-room configuration.
*   **[#148232](https://github.com/NousResearch/hermes-agent/pull/148232):** Real-time terminal output streaming for agents, a high-usability feature that will likely be standard in the next release.

## 7. User Feedback Summary
Users are generally satisfied with the breadth of the v0.22.6 release but are encountering "first-day" friction. The most common pain points are related to environment-specific configurations (SSL, Kanban/Cron workers) and UI state management in the Desktop client (e.g., file pane synchronization). The demand for better "quiet" modes in messaging platforms (Slack/Telegram) suggests the agent is being deployed into more professional/integrated environments.

## 8. Backlog Watch
*   **[#6533](https://github.com/NousResearch/hermes-agent/issues/6533):** A long-standing bug where Slack gateway platform notes become inaccurate when MCP tools are active. It is negatively affecting UX with false "no API access" refusals.
*   **[#85999](https://github.com/NousResearch/hermes-agent/pull/85999):** Stale Files pane synchronization. While a fix is in progress, this has been an outstanding annoyance for users managing multiple concurrent chat sessions.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest – 2026-11-03

### 1. Today's Overview
The IronClaw project is currently in a maintenance-heavy phase with zero new feature development or bug reporting activity recorded in the last 24 hours. Development focus is entirely centered on dependency hygiene, specifically updating security and performance-related Rust libraries. The repository shows high stability, with all recent activity driven by automated bots rather than manual contributor interaction.

### 2. Releases
*None*

### 3. Project Progress
*   **Dependency Management:** The project is actively cycling through dependency updates. While older pull requests (#8151 and #8152) bumping `rustls` to v0.23.45 were closed, the project is already transitioning to the latest patch level (v0.23.46) via newer open PRs.

### 4. Community Hot Topics
There are currently no active discussions, community-driven issues, or non-automated pull requests. The repository is effectively in a "quiet" state regarding human-to-human collaboration at this time.

### 5. Bugs & Stability
*   **Status:** No new bugs or regressions have been reported in the last 24 hours.
*   **Security/Stability Maintenance:** Automated maintenance is occurring to keep the `rustls` library up to date (PR #8165 and PR #8166). These updates are routine but critical for maintaining the network security posture of the IronClaw agents.

### 6. Feature Requests & Roadmap Signals
There are no new feature requests or roadmap signals in the current data window. The lack of open issues suggests the current feature set is either considered complete by the maintainers or that the community is currently focused on internal stability rather than outward expansion.

### 7. User Feedback Summary
No user feedback or sentiment data is currently available. The reliance on automated dependency bots suggests a "set-and-forget" approach to maintenance for the current version.

### 8. Backlog Watch
*   **Priority:** No critical backlog items identified. 
*   **Note:** The open dependency PRs (#8165 and #8166) are the only actionable items currently in the system. Once these are merged, the backlog of pending activity will be cleared until the next dependency cycle.

***

*Data Source: [github.com/nearai/ironclaw](https://github.com/nearai/ironclaw)*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest: 2026-11-03

## 1. Today's Overview
QwenPaw shows high velocity and significant stability-focused activity as the team pushes toward the v2.3.0 release cycle. With 46 PR updates and 11 issue updates in the last 24 hours, developers are aggressively clearing technical debt, particularly regarding Windows compatibility and plugin management. The project health remains strong, characterized by active maintenance and a clear transition from experimental beta testing to refining core user experience and reliability.

## 2. Releases
*   **[v2.3.0-beta.2](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.3.0-beta.2):** This update focuses on console usability, specifically refining agent skill selection and improving the visual feedback of media previews. It includes minor fixes to browser usability, signaling a focus on the desktop UI polish.

## 3. Project Progress
*   **Console UI Improvements:** PR [#8545](https://github.com/agentscope-ai/QwenPaw/pull/8545) successfully repaired settings search and indexing, ensuring users can locate configuration fields more effectively.
*   **Plugin Management:** PR [#8231](https://github.com/agentscope-ai/QwenPaw/pull/8231) resolved the issue where third-party plugins were excluded from the "Update All" functionality by persisting install provenance.
*   **Migration/Sync Logic:** PR [#8541](https://github.com/agentscope-ai/QwenPaw/pull/8541) optimized startup sequences by skipping redundant migrations, addressing user concerns regarding slow startup synchronization.
*   **Defaults:** PR [#8536](https://github.com/agentscope-ai/QwenPaw/pull/8536) standardized the default web search provider to `AnySearch`.

## 4. Community Hot Topics
*   **[#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715):** The "Daily Paper" silence failure remains a key point of discussion. Users are frustrated by misleading error messages when external endpoints (Arxiv) are unreachable.
*   **[#7222](https://github.com/agentscope-ai/QwenPaw/issues/7222):** A critical memory leak resulting in 20GB+ RAM consumption over 2 days. This highlights a need for better resource management in long-running backend processes.
*   **[#7903](https://github.com/agentscope-ai/QwenPaw/pull/7903):** The push for an embedded community feed. There is clear community interest in integrating social/knowledge sharing directly into the workflow, though it remains a large, complex architectural task.

## 5. Bugs & Stability
*   **[High] [#8549](https://github.com/agentscope-ai/QwenPaw/issues/8549):** Model configuration write-path fails to validate bounds (thinking budget/input length), causing silent provider crashes after restart. *Fix in progress:* [#8550](https://github.com/agentscope-ai/QwenPaw/pull/8550).
*   **[Medium] [#8500](https://github.com/agentscope-ai/QwenPaw/issues/8500):** Auto-Dream memory loss. The system reports success even when data parsing fails, leading to permanent loss of memory checkpoints.
*   **[Medium] [#8547](https://github.com/agentscope-ai/QwenPaw/issues/8547):** Regression on Windows where bundled inspiration examples fail to open.

## 6. Feature Requests & Roadmap Signals
*   **Advanced Memory Control:** PR [#7719](https://github.com/agentscope-ai/QwenPaw/pull/7719) suggests allowing specific models for memory writing to reduce costs. Given the current focus on efficiency, this is a likely candidate for upcoming versions.
*   **QQ Channel Streaming:** PR [#8409](https://github.com/agentscope-ai/QwenPaw/pull/8409) is actively pushing for better support of modern messaging platforms, indicating the project is widening its reach into social bot integrations.

## 7. User Feedback Summary
Users are currently satisfied with the rapid pace of bug fixes, particularly regarding UI navigation. However, there is persistent friction regarding **Windows environment reliability**—specifically with file encoding (GBK/CP936 support) and pathing. Users managing high-volume, long-running agent sessions are increasingly concerned about memory footprints and startup delays during synchronization.

## 8. Backlog Watch
*   **[#8178](https://github.com/agentscope-ai/QwenPaw/pull/8178):** Supporting nested skill directories. This is an important organizational feature for power users that has been open since October 11th.
*   **[#8234](https://github.com/agentscope-ai/QwenPaw/pull/8234):** Encoding issues (GBK/CP936) in tool file reading. This is a crucial fix for the Chinese-speaking user base that needs immediate review.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest - 2026-11-03

## 1. Today's Overview
ZeroClaw is currently experiencing a high-intensity development cycle, primarily focused on refining the web interface, strengthening security boundaries for agent delegation, and resolving critical regressions in conversation state management. With 50 active PRs and 10 new issues opened in the last 24 hours, the project demonstrates robust velocity but is encountering stability challenges related to its complex multi-provider architecture. Maintenance efforts are heavily skewed toward hardening the gateway and web-socket reliability to ensure a seamless end-user experience.

## 2. Releases
*No new releases were published in the last 24 hours.*

## 3. Project Progress
The following PRs were closed or merged, marking progress in stability and architecture:
* **[#12196](https://github.com/zeroclaw-labs/zeroclaw/issues/12196)**: Resolved a security job failure caused by an outdated dependency (`pulldown-cmark 0.13.5`), ensuring CI pipeline health.
* **[#11297](https://github.com/zeroclaw-labs/zeroclaw/pull/11297)**: Fixed runtime logic to correctly honor `keep_tool_context_turns`, improving memory management for AI tool interactions.
* **[#11174](https://github.com/zeroclaw-labs/zeroclaw/pull/11174)**: Merged capability-taking constructors, a significant architectural refactor that provides finer-grained control over agent turn entry points.
* **[#12185](https://github.com/zeroclaw-labs/zeroclaw/pull/12185)**: Performed a broad update of the `rust-all` dependency group (36 updates), maintaining the project's modern tech stack.

## 4. Community Hot Topics
* **[#10407](https://github.com/zeroclaw-labs/zeroclaw/pull/10407) (Persistent Session Prompt Attachments):** This massive PR remains a focal point for the contributor community, aiming to improve how long-lived sessions manage state and user context.
* **[#12059](https://github.com/zeroclaw-labs/zeroclaw/pull/12059) (OpenAI Thinking Runtime):** High interest in aligning ZeroClaw’s internal runtime profiles with modern "reasoning" models from providers like OpenAI.
* **[#11266](https://github.com/zeroclaw-labs/zeroclaw/pull/11266) (Security: Private Memory):** Critical work on ensuring subagents and pipelines maintain strict data isolation, currently under review as a high-priority architectural change.

## 5. Bugs & Stability
* **[#12187](https://github.com/zeroclaw-labs/zeroclaw/issues/12187) [S1 - Blocked]:** Serious regression where cached tool turns poison conversation envelopes, potentially breaking interactions with strict providers.
* **[#10926](https://github.com/zeroclaw-labs/zeroclaw/issues/10926) [S2 - Degraded]:** Bug in `send_via` where Matrix identities are incorrectly resolved as room destinations.
* **[#12194](https://github.com/zeroclaw-labs/zeroclaw/issues/12194) [S2 - Degraded]:** Silent fallback to an incorrect 32k context window for unknown models, causing unexpected prompt failures.
* **[#12203](https://github.com/zeroclaw-labs/zeroclaw/issues/12203) [S3 - Minor]:** `web_search_tool` silently compiling out without warning when features are missing; a fix PR [#12204](https://github.com/zeroclaw-labs/zeroclaw/pull/12204) is already in progress.

## 6. Feature Requests & Roadmap Signals
* **[#12181](https://github.com/zeroclaw-labs/zeroclaw/issues/12181):** Managed document uploads for the web dashboard. This is identified as a Phase 2 Web slice and is likely to be prioritized for the next milestone.
* **[#12191](https://github.com/zeroclaw-labs/zeroclaw/issues/12191):** Hybrid (dense + BM25) recall for Qdrant, suggesting a move toward more sophisticated RAG (Retrieval-Augmented Generation) capabilities.
* **[#12184](https://github.com/zeroclaw-labs/zeroclaw/pull/12184):** One-tap Matrix approval reactions, indicating a drive toward better integration with existing messaging platforms.

## 7. User Feedback Summary
Current user friction is centered on the web experience, specifically regarding reload persistence and mobile responsiveness. The reported issues (e.g., [#12208](https://github.com/zeroclaw-labs/zeroclaw/pull/12208), [#12206](https://github.com/zeroclaw-labs/zeroclaw/pull/12206)) indicate that users are actively testing the platform on mobile browsers and encountering challenges with session state after page refreshes.

## 8. Backlog Watch
* **[#11584](https://github.com/zeroclaw-labs/zeroclaw/pull/11584):** The addition of the "Opper" model provider has been stalled (needs author action). 
* **[#11847](https://github.com/zeroclaw-labs/zeroclaw/pull/11847):** The complex implementation of native XMPP support requires further maintainer review to merge into the stable branch.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/jinming1345/agents-radar).*