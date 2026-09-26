# OpenClaw Ecosystem Digest 2026-09-26

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-26 00:51 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest: 2026-09-26

## 1. Today's Overview
The OpenClaw project is currently in a high-intensity "stability sprint," with 500 active issues and 500 PRs updated within the last 24 hours. The community and maintainers are heavily focused on rectifying stability regressions introduced in the recent 2026.9.5/6 releases, specifically concerning memory leaks, update failures, and gateway performance. While development velocity is exceptionally high, the sheer volume of "UX-release-blocker" issues indicates a critical need for rigorous regression testing before the next stable release.

## 2. Releases
*   **No new releases.** Development is currently focused on the candidate fixes for 2026.9.7 (tracking: [#157531](https://github.com/openclaw/openclaw/issues/157531)).

## 3. Project Progress
*   **Performance Optimization:** Multiple PRs aim to reduce main-thread overhead, including [#158497](https://github.com/openclaw/openclaw/pull/158497) (optimizing concurrent session viewer presence) and [#158489](https://github.com/openclaw/openclaw/pull/158489) (improving responsiveness during long chat streams).
*   **Update Recovery:** Significant work is underway to fix the update failure loop, notably PR [#157972](https://github.com/openclaw/openclaw/pull/157972), which focuses on recovering stalled updates and preserving session data.
*   **Plugin/UI Stability:** PR [#155479](https://github.com/openclaw/openclaw/pull/155479) restores MS Teams SSO sign-in, while [#150549](https://github.com/openclaw/openclaw/pull/150549) unifies chat reply context in the UI.

## 4. Community Hot Topics
*   **[#153257](https://github.com/openclaw/openclaw/issues/153257) (34 comments):** Users are reporting catastrophic environment failure after upgrading to 2026.9.5. The community expresses high frustration regarding stability regression in "stable" releases.
*   **[#155753](https://github.com/openclaw/openclaw/issues/155753) (29 comments):** A critical performance bug causing sustained 100% CPU usage in the `model-catalog` worker. This is a major pain point for users with high-frequency model interactions.
*   **[#42475](https://github.com/openclaw/openclaw/issues/42475) (24 comments):** A persistent demand for per-agent cost budget enforcement, highlighting a growing need for enterprise-grade governance within OpenClaw.

## 5. Bugs & Stability
*   **P0 (Critical) Regressions:**
    *   **Memory Leaks:** [#157842](https://github.com/openclaw/openclaw/issues/157842) reports the `prepared-model-catalog` worker consuming ~77MB per turn, exceeding 512MB limits.
    *   **Update Loop:** [#156986](https://github.com/openclaw/openclaw/issues/156986) describes the updater hanging indefinitely in the candidate phase.
    *   **Deadlock:** [#138409](https://github.com/openclaw/openclaw/issues/138409) involves gateway deadlocks during plugin updates.
*   **Mitigation:** The team is actively pushing fixes to the gateway's event loop and SQLite coordinator responsiveness (e.g., [#158396](https://github.com/openclaw/openclaw/pull/158396)).

## 6. Feature Requests & Roadmap Signals
*   **Cost Management:** Per-agent budgets ([#42475](https://github.com/openclaw/openclaw/issues/42475)) and per-model usage logging ([#13219](https://github.com/openclaw/openclaw/issues/13219)) are the top requested features for operator control.
*   **System Diagnostics:** Better clarity for gateway diagnostics and self-hosted STT/TTS support are trending, suggesting the project is maturing toward more complex, self-managed deployments.

## 7. User Feedback Summary
Current user sentiment is strained by update fragility. Users are reporting that "stable" channel updates often result in multi-hour recovery sessions. However, the responsiveness of the project in managing PRs to mitigate these issues is high, and there is strong community engagement in identifying root causes for the recent regression-heavy releases.

## 8. Backlog Watch
*   **[#22438](https://github.com/openclaw/openclaw/issues/22438):** Tiered bootstrap file loading has been stalled since February. This is essential for power users managing large workspaces but lacks a product decision.
*   **[#67413](https://github.com/openclaw/openclaw/issues/67413):** Per-agent "dreaming" (background task) configuration is required to prevent OOM kills in high-density installations, yet remains in the backlog without a maintainer review.

---

## Cross-Ecosystem Comparison

### 1. Ecosystem Overview
The open-source AI agent ecosystem is currently transitioning from a period of rapid experimentation to one of rigorous stabilization and infrastructure hardening. Projects are heavily occupied with addressing "technical debt" resulting from accelerated feature shipping, particularly regarding memory management, environment isolation, and plugin architecture. There is a distinct, industry-wide trend toward maturing these platforms into persistent, enterprise-capable daemons, moving away from simple interactive chat-based UIs.

### 2. Activity Comparison

| Project | Active Issues/PRs (24h) | Recent Releases | Health/Stability Status |
| :--- | :--- | :--- | :--- |
| **OpenClaw** | ~1,000 | None | Critical/Regressive |
| **Hermes** | 100 | None | Stabilization/Patching |
| **IronClaw** | Low | None | Stable/Low Activity |
| **QwenPaw** | 25 | None | High Velocity/Iterative |
| **ZeroClaw** | 100 | None | Security Hardening |

### 3. OpenClaw’s Position
OpenClaw serves as the "heavyweight" reference implementation in the space, characterized by massive community engagement (500+ issues/PRs updated in 24 hours). 
*   **Advantages:** It boasts the most comprehensive feature set and the highest level of community scrutiny, making it the de-facto standard for complex, enterprise-grade agent deployments.
*   **Technical Approach:** Unlike the more modular or niche-focused peers, OpenClaw attempts to provide a "full-stack" agent platform, which contributes to its current struggle with memory leaks and update fragility.
*   **Comparison:** Its community size dwarfs others, but this has created a "stability bottleneck" where the sheer volume of PRs and issues is currently outpacing the maintainers' ability to ensure regression-free releases.

### 4. Shared Technical Focus Areas
*   **Runtime & Dependency Isolation:** Both **Hermes** and **ZeroClaw** are fighting "dependency hell" (Python venvs, PM runtimes, and symlink security), indicating that the broader ecosystem is struggling to handle local agent execution environments securely.
*   **Cost & Budget Governance:** **OpenClaw** and **QwenPaw** are both prioritizing per-agent/per-model cost controls, signaling that these tools are being deployed in high-frequency, budget-conscious environments.
*   **Context Management:** **QwenPaw** and **OpenClaw** are both wrestling with context compaction and history persistence, reflecting the challenge of maintaining long-term memory for agents without exceeding token limits or causing UI "data loss" perceptions.

### 5. Differentiation Analysis
*   **ZeroClaw (Security & Architecture):** Focuses heavily on OIDC, RPC-level principal authentication, and a plugin-centric (WASM) future. It is the most "security-first" and modular project.
*   **IronClaw (Niche Utility):** Stands out for its focus on "reasoning over time" and internal knowledge graph maintenance. It is less concerned with general-purpose UI and more focused on agent-logic primitives.
*   **QwenPaw (UX & Integration):** More focused on the UI/UX layer and external channel integration (QQ bot, etc.) compared to the backend-heavy focus of the others.
*   **Hermes (Developer Productivity):** Positions itself as the bridge between development workflows and agent capabilities, with strong focus on remote tooling and SSH/CLI integration.

### 6. Community Momentum & Maturity
*   **Rapid Iteration:** **OpenClaw** and **QwenPaw** remain the most rapidly iterating projects. While QwenPaw is successfully managing its growth, OpenClaw is currently struggling to maintain quality.
*   **Stabilizing/Hardening:** **ZeroClaw** and **Hermes** have moved past early-stage prototyping and are dedicating significant resources to security and architectural refactoring.
*   **Maintenance Phase:** **IronClaw** currently exhibits the characteristics of a mature, stable project with low-intensity, high-quality maintenance cycles rather than high-chaos feature building.

### 7. Trend Signals
*   **The "Daemonization" of Agents:** Users are demanding that these platforms run as persistent background services (daemons) with reliable uptime, moving away from session-based CLI interaction.
*   **Modularity over Monoliths:** The push toward WASM-based plugins (**ZeroClaw**) and runtime-installable modules signals that developers want to customize agent behavior without recompiling the core binary.
*   **Trust and Governance:** The demand for authentication, OIDC integration, and strict budget/cost enforcement is a clear signal that AI agents are entering professional and enterprise production environments where "unrestricted" access is a liability.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest: 2026-09-26

## 1. Today's Overview
The Hermes Agent project remains in a state of high-intensity maintenance, with 100 total items (issues and PRs) updated in the last 24 hours. Development focus is currently dominated by resolving stability regressions in the recently implemented PM (Package Manager) runtime and fine-tuning multi-profile security boundaries. The sheer volume of activity—specifically surrounding Windows environment isolation and cross-profile authentication—suggests that the project is in a stabilization phase following recent architectural shifts.

## 2. Releases
*No new releases identified today.*

## 3. Project Progress
Today saw a significant push to reconcile recent architectural regressions, particularly in the streaming and security subsystems:
*   **Streaming & TTS Fixes ([PR #121741](https://github.com/NousResearch/hermes-agent/pull/121741)):** Resolved four major issues, including restoring xAI streaming, preventing API key leakage in Gemini requests, and fixing audio recording deadlocks on macOS.
*   **Security & Auth Hardening ([PR #121508](https://github.com/NousResearch/hermes-agent/pull/121508)):** Tightened credential boundaries by preventing custom Codex-base credentials from leaking to official OpenAI endpoints.
*   **Gateway Stability ([PR #121360](https://github.com/NousResearch/hermes-agent/pull/121360)):** Closed a recurring `DeletedWalGenerationError` by properly managing state.db WAL-generation during service shutdown.
*   **Remote Tooling ([PR #122657](https://github.com/NousResearch/hermes-agent/pull/122657)):** Fixed SSH file path resolution to ensure operations occur on the remote host rather than the local Hermes host.

## 4. Community Hot Topics
*   **[Issue #122183](https://github.com/NousResearch/hermes-agent/issues/122183) (14 comments):** Critical Windows gateway crash. Users report that the new PM runtime improperly interacts with legacy venvs, causing `pydantic_core` ABI mismatches.
*   **[Issue #122656](https://github.com/NousResearch/hermes-agent/issues/122656) (7 comments):** A feedback loop in the Desktop app's updater logic is causing continuous backend restarts. This is a high-frustration item for power users on source/git installs.
*   **[Issue #73985](https://github.com/NousResearch/hermes-agent/issues/73985) (5 comments):** Though now marked closed, the multi-faceted failure of xAI streaming TTS highlighted a lack of robustness in network handshaking protocols.

## 5. Bugs & Stability
*   **[P1 - Critical] [Issue #122183](https://github.com/NousResearch/hermes-agent/issues/122183):** Windows PM runtime environment conflict. *Status: Open, High urgency.*
*   **[P1 - Critical] [Issue #122783](https://github.com/NousResearch/hermes-agent/issues/122783):** PM-managed installs failing to re-exec into the correct venv, leading to dependency-starved gateway execution. *Status: Open.*
*   **[P2 - High] [Issue #122490](https://github.com/NousResearch/hermes-agent/issues/122490):** Bot-to-bot DM failures due to missing `ruamel` dependencies in the delivery runner. *Status: Open.*

## 6. Feature Requests & Roadmap Signals
*   **[Issue #123165](https://github.com/NousResearch/hermes-agent/issues/123165):** A user requesting custom workflows for long-running non-chatbot tasks. This signals a shift toward users adopting Hermes as a persistent background daemon rather than just an interactive CLI.
*   **[Issue #88891](https://github.com/NousResearch/hermes-agent/issues/88891):** Demand for per-task model/reasoning overrides remains high (3 reactions), suggesting that users want more granular control over token consumption and reasoning depth during complex delegation tasks.

## 7. User Feedback Summary
Current user sentiment reflects frustration with installation/update reliability, specifically regarding the transition to the PM runtime. Users are reporting "endless loops" in the update process and broken dependencies for core features (like memory providers and matrix adapters). The community is highly active in troubleshooting, but the current state indicates a regression in "out-of-the-box" stability for Windows and source-based installations.

## 8. Backlog Watch
*   **[Issue #68680](https://github.com/NousResearch/hermes-agent/issues/68680):** A request for `pt-BR` locale support in documentation. While low-priority, it remains open since July, representing a gap in internationalizing the project’s technical outreach.
*   **[Issue #118381](https://github.com/NousResearch/hermes-agent/issues/118381):** MCP client initialization instructions are being discarded. This is an important oversight that limits the effectiveness of external MCP tool servers.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest: 2026-09-26

### 1. Today's Overview
The IronClaw project is maintaining a steady pace of internal maintenance and incremental feature refinement, though overall activity levels remain modest as of today. With no new issues reported or closed in the last 24 hours, the focus is currently split between infrastructure automation and expanding runtime capabilities. The project health appears stable, characterized by automated codebase housekeeping and focused improvements to the agent execution environment.

### 2. Releases
*No new releases identified for this period.*

### 3. Project Progress
There were no PRs merged or closed in the last 24 hours. Current activity is confined to two open PRs undergoing review:
*   **[PR #8108](https://github.com/nearai/ironclaw/pull/8108):** Advances the `builtin.time` functionality by adding a `shift` operation, allowing for flexible time calculations (seconds, minutes, hours, days, weeks) relative to timestamps.
*   **[PR #7988](https://github.com/nearai/ironclaw/pull/7988):** A routine CI maintenance task to refresh the project's codebase knowledge graph, ensuring the agent's internal memory snapshot remains synced with the current codebase.

### 4. Community Hot Topics
Activity is currently centered on these two PRs, though engagement is low (no comments or reactions yet):
*   **[PR #8108](https://github.com/nearai/ironclaw/pull/8108):** This is the most significant active item, indicating a need for more robust date-time manipulation within the agent's runtime environment, likely to support complex scheduling or temporal logic in autonomous agents.
*   **[PR #7988](https://github.com/nearai/ironclaw/pull/7988):** Highlights the project's reliance on automated codebase awareness, reinforcing the focus on "self-understanding" agents that require up-to-date memory snapshots to function effectively.

### 5. Bugs & Stability
*No new bugs or regressions were reported today.*

### 6. Feature Requests & Roadmap Signals
The introduction of `builtin.time` shifts in [PR #8108](https://github.com/nearai/ironclaw/pull/8108) signals a roadmap focus on enhancing the "reasoning over time" capabilities of IronClaw agents. Users or developers appear to be prioritizing the ability to perform more complex temporal arithmetic natively within the host runtime, which is a common requirement for agents performing long-running or recurring tasks.

### 7. User Feedback Summary
There is no direct user feedback or issue reporting in the last 24 hours to synthesize. The lack of open issues suggests that existing users are either satisfied with current stability or that the project is currently in a phase of quiet development by core contributors.

### 8. Backlog Watch
*   **[PR #7988 (Codebase Knowledge Graph Refresh)](https://github.com/nearai/ironclaw/pull/7988):** While this is a routine automated task, it has been open since August 29. Maintainers should prioritize merging this to ensure the "Codebase Memory" feature remains accurate for users relying on the latest snapshots.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest: 2026-09-26

## 1. Today's Overview
QwenPaw is experiencing a high-velocity development phase with 25 total items (12 Issues, 13 PRs) updated in the last 24 hours, indicating an active maintenance sprint. The project is currently focused on stabilizing core integrations (QQ bot, Gemini, Playwright) and improving the UI/UX of the Console. While there is a significant volume of open, non-merged PRs from first-time contributors, the engineering focus is clearly shifting toward addressing long-term stability issues like context management and session persistence.

## 2. Releases
*No new releases were published in the last 24 hours.*

## 3. Project Progress
While no PRs were merged in this period, active development is heavily focused on the following:
*   **Browser SDK Stability:** [PR #7987](https://github.com/agentscope-ai/QwenPaw/pull/7987) introduces support for custom Playwright arguments, specifically fixing issues with loading browser extensions.
*   **Search/Tool Safety:** [PR #7988](https://github.com/agentscope-ai/QwenPaw/pull/7988) addresses a critical security/stability flaw by adding binary filtering to `grep_search`.
*   **UI Improvements:** [PR #7989](https://github.com/agentscope-ai/QwenPaw/pull/7989) improves Markdown table rendering to ensure horizontal scrollbars remain reachable.
*   **Vendor Compatibility:** [PR #7982](https://github.com/agentscope-ai/QwenPaw/pull/7982) fixes a critical Gemini tool-calling bug related to `thought_signature`.

## 4. Community Hot Topics
*   **Context Compaction & Memory:** [Issue #7628](https://github.com/agentscope-ai/QwenPaw/issue/7628) (7 comments) remains a primary concern regarding budget management. Users are frustrated that context compaction logic does not accurately account for total token costs.
*   **History Persistence:** [Issue #7884](https://github.com/agentscope-ai/QwenPaw/issue/7884) (5 comments) highlights user dissatisfaction with how chat history appears to "disappear" after compaction, pointing to a need for better UI-level transparency regarding archived vs. live messages.

## 5. Bugs & Stability
*   **Critical:** [Issue #7980](https://github.com/agentscope-ai/QwenPaw/issue/7980) – `grep_search` is causing "doom loops" by parsing internal database files. *Fix status: [PR #7988](https://github.com/agentscope-ai/QwenPaw/pull/7988) is in progress.*
*   **High:** [Issue #7946](https://github.com/agentscope-ai/QwenPaw/issue/7946) – QQ bot gateway message replay causes duplicate processing. *Fix status: [PR #7983](https://github.com/agentscope-ai/QwenPaw/pull/7983) is pending.*
*   **Medium:** [Issue #7979](https://github.com/agentscope-ai/QwenPaw/issue/7979) – Misconfiguration of local `llama.cpp` model context windows due to reliance on cloud-based catalog defaults.
*   **Medium:** [Issue #7984](https://github.com/agentscope-ai/QwenPaw/issue/7984) – Playwright profile extension loading failures. *Fix status: [PR #7987](https://github.com/agentscope-ai/QwenPaw/pull/7987) is in progress.*

## 6. Feature Requests & Roadmap Signals
*   **Sidebar Enhancements:** [Issue #7978](https://github.com/agentscope-ai/QwenPaw/issue/7978) requests a "Recent Sessions" panel for cross-agent monitoring.
*   **Configurable UI:** [Issue #7957](https://github.com/agentscope-ai/QwenPaw/issue/7957) requests the ability to disable unused pre-made models and channels to reduce clutter.
*   **Model Configuration:** [Issue #7990](https://github.com/agentscope-ai/QwenPaw/issue/7990) requests an update to the model catalog to expose `thinking_param_style` for Aliyun models.

## 7. User Feedback Summary
Users are currently expressing "pain" regarding the transition between high-performance local agent use and UI-level limitations. Key complaints include:
*   The "disappearing" history after compaction makes users feel they are losing data.
*   The web console's handling of complex output (wide tables) is limiting productivity.
*   Advanced power users are finding the default "one-size-fits-all" settings for model windows and extension management to be overly restrictive.

## 8. Backlog Watch
*   [PR #7357](https://github.com/agentscope-ai/QwenPaw/pull/7357) (Tool visibility toggle) has been open since late August. This represents a highly requested UX feature that is currently lacking maintenance attention.
*   [PR #7359](https://github.com/agentscope-ai/QwenPaw/pull/7359) (Provider-level media capabilities) remains stalled, blocking better multimodal support for non-cloud providers.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest: 2026-09-26

## 1. Today's Overview
ZeroClaw activity remains high, with 100 total updates across issues and PRs in the last 24 hours. The project is currently in a "stabilization and security hardening" phase, characterized by intense efforts to integrate OIDC-based authentication and solidify runtime boundaries. Maintainer capacity is heavily focused on the core architecture, specifically moving toward a plugin-centric model and formalizing agent-to-agent communication.

## 2. Releases
*No new releases in the last 24 hours.*

## 3. Project Progress
Several significant PRs were merged, indicating a focus on cleanup and security alignment:
*   **[PR #11046](https://github.com/zeroclaw-labs/zeroclaw/pull/11046):** Fixed screenshot tool behavior by removing redundant base64 inlining, reducing message payload bloat.
*   **[PR #10259](https://github.com/zeroclaw-labs/zeroclaw/pull/10259):** Merged stage 3 of the security refactor, enforcing authenticated principals on RPC with native and peer credentials.
*   **[PR #11072](https://github.com/zeroclaw-labs/zeroclaw/pull/11072):** Fixed Nix flake packaging for better integration with host systems.
*   **[PR #10397](https://github.com/zeroclaw-labs/zeroclaw/pull/10397):** Improved MCP tool result formatting to ensure lossless text block delivery.

## 4. Community Hot Topics
*   **[Issue #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) (15 comments):** The maintainer decision queue continues to be the central coordination point for design RFCs, reflecting a need for more structured governance as the project grows.
*   **[Issue #8586](https://github.com/zeroclaw-labs/zeroclaw/issues/8586) (10 comments):** Discussion around centralizing webhook message dispatch suggests a push to standardize the message lifecycle across different channels.
*   **[Issue #6489](https://github.com/zeroclaw-labs/zeroclaw/issues/6489) (9 comments):** The ongoing debate about a unified capability catalog ("Everything is a plugin") remains a primary north-star for the project's architectural direction.

## 5. Bugs & Stability
*   **[Issue #11110](https://github.com/zeroclaw-labs/zeroclaw/issues/11110) [Severity: S0]:** Security risk involving retargetable symlinks in workspace confinement; currently in progress.
*   **[Issue #11108](https://github.com/zeroclaw-labs/zeroclaw/issues/11108) [Severity: S2]:** Bug where browser/search tools are incorrectly rewritten to shell commands, degrading agent capability.
*   **[Issue #11055](https://github.com/zeroclaw-labs/zeroclaw/issues/11055) [Severity: S1]:** Daemon failure to register channel-map factories, causing core tools (SOP, webhooks) to be unusable.

## 6. Feature Requests & Roadmap Signals
*   **[Issue #11103](https://github.com/zeroclaw-labs/zeroclaw/issues/11103):** Addition of "Cheaper Inference" as an OpenAI-compatible provider. This reflects a growing user desire for lower-cost LLM API alternatives.
*   **[Issue #8850](https://github.com/zeroclaw-labs/zeroclaw/issues/8850):** Transitioning compile-time features to runtime-installable WASM plugins is a major signal for the roadmap, aimed at making the binary more modular.

## 7. User Feedback Summary
Users are currently focused on two main pain points:
1.  **Tool Reliability:** Confusion/regressions in how agents choose tools (e.g., rewriting browser requests to shell) impacts perceived agent intelligence.
2.  **Deployment Friction:** Setup complexities with authentication and channel mapping (as seen in #11055) are creating hurdles for users trying to run robust daemon deployments.

## 8. Backlog Watch
*   **[Issue #8431](https://github.com/zeroclaw-labs/zeroclaw/issues/8431):** Ongoing tracker for audit/cleanup of temporary artifacts; currently in the "parking lot" and needing long-term resource allocation.
*   **[Issue #6864](https://github.com/zeroclaw-labs/zeroclaw/issues/6864):** Inverting the dependency layer between `zeroclaw-channels` and `zeroclaw-runtime` is a critical architecture task that remains partially in-progress.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/jinming1345/agents-radar).*