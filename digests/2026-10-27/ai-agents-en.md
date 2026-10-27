# OpenClaw Ecosystem Digest 2026-10-27

> Issues: 85 | PRs: 500 | Projects covered: 5 | Generated: 2026-10-27 01:38 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest: 2026-10-27

## 1. Today's Overview
OpenClaw is currently experiencing an intense period of high-velocity engineering focused on stabilization and performance optimization. With 500 PRs updated and 85 issues seeing activity in the last 24 hours, the project is under significant strain from "crash-loop" reports, particularly on Windows and in high-load database environments. The community is working rapidly to address these regressions, with a clear emphasis on "deslopping" the codebase and optimizing resource consumption to alleviate UX friction.

## 2. Releases
*None.* (No new releases were published on this date).

## 3. Project Progress
Today's activity was dominated by refactoring and performance tuning rather than new feature launches. 
*   **Performance Optimization:** PR #185199 avoids unnecessary scrollbar layout calculations in short chat drafts, and PR #185293 (linked to issue #185289) resolves a critical performance bottleneck where long streamed replies caused the Gateway to hang.
*   **Infrastructure Cleanup:** A major initiative to remove low-value test fixtures and consolidate repeated assertions across the codebase is underway (e.g., #185268, #185291, #185304).
*   **Gateway Refactoring:** PR #185157 initiates a large-scale refactor to clean up ownership surfaces across channels and the web-ui.

## 4. Community Hot Topics
*   **[#170956] Windows Startup/Shutdown Reliability (21 comments):** The most discussed issue; users report unreliable restarts and updates due to `schtasks` permissions and plugin shutdown hangs. This is a critical blocker for Windows adoption. [View Issue](https://github.com/openclaw/openclaw/issues/170956)
*   **[#140010] Sleep/Resume WebSocket Failure (16 comments):** Windows users report 30–60s connection stalls after waking laptops, indicating deep event-loop congestion. [View Issue](https://github.com/openclaw/openclaw/issues/140010)
*   **[#129314] Runtime Context Metadata Leaks (15 comments):** An ongoing frustration where internal scaffolding messages are leaking into the visible chat interface. [View Issue](https://github.com/openclaw/openclaw/issues/129314)

## 5. Bugs & Stability
*   **P0 - Crash Loops:**
    *   [#166634] Late reclamation failure leaves agents in a permanent `UNAVAILABLE` state. [View Issue](https://github.com/openclaw/openclaw/issues/166634)
    *   [#142987] Gateway hard-killed on Windows when spawning local `llama.cpp`. [View Issue](https://github.com/openclaw/openclaw/issues/142987)
    *   [#184889] Failed npm updates can result in a missing `node_modules/openclaw` directory, requiring manual intervention. [View Issue](https://github.com/openclaw/openclaw/issues/184889)
*   **P1 - Behavioral/Session Bugs:**
    *   [#185303] Authority leakage: `claude-cli` turns are accidentally passing tool-call authority to downstream agents. [View Issue](https://github.com/openclaw/openclaw/issues/185303)
    *   [#185286] Codex terminal reasoning reorders checkpointed work, causing final-answer recovery failure. [View Issue](https://github.com/openclaw/openclaw/issues/185286)

## 6. Feature Requests & Roadmap Signals
*   **Personal Identity/Privacy:** Users are pushing for refined privacy controls, such as opt-in personal identity in shared workspaces ([#162164](https://github.com/openclaw/openclaw/issues/162164)) and making Side-chats private per-user ([#181215](https://github.com/openclaw/openclaw/issues/181215)).
*   **Android/Mobile parity:** Requests exist to match browser functionality on Android, specifically for in-chat questions and approval requests ([#175826](https://github.com/openclaw/openclaw/issues/175826)).

## 7. User Feedback Summary
Current user sentiment is heavily impacted by the "UX-friction" caused by recent updates. Users are experiencing significant frustration with long-lived session databases (3.5GB+) causing massive startup delays and database compaction failures. The transition to the 2026.10.x series has been rocky, with many users encountering issues that require manual directory cleanup, suggesting that the current upgrade/rollback mechanism is not sufficiently robust.

## 8. Backlog Watch
*   **[#67419] Context Bloat:** A long-standing issue regarding 20-30% of token window usage being consumed by re-injected bootstrap files. This has seen little movement despite high interest. [View Issue](https://github.com/openclaw/openclaw/issues/67419)
*   **[#119294] MCP 2.0 Migration:** Tracking the transition to stateless MCP. As this is a major architectural shift, it remains a critical item needing product-level guidance for long-term project health. [View Issue](https://github.com/openclaw/openclaw/issues/119294)

---

## Cross-Ecosystem Comparison

## Cross-Project Analysis Report: AI Agent Ecosystem
**Date:** 2026-10-27

### 1. Ecosystem Overview
The open-source AI agent ecosystem is currently in a "maturation phase," shifting away from experimental feature-stuffing toward rigorous stability, security, and performance optimization. Projects are grappling with the same fundamental challenge: managing long-lived, resource-intensive agent sessions without succumbing to local database bloat or memory management failures. As the technology matures, developers are prioritizing architectural refactoring and authentication hardening, signaling a transition toward enterprise-grade, multi-agent production readiness.

### 2. Activity Comparison
| Project | Issues (Recent) | PR Activity | Release Status | Health Score* |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 85 | 500 (Updated) | No new releases | Moderate (Regressive) |
| **Hermes Agent** | 24 | 50 | Stable (v0.22.5) | Stable (Active) |
| **QwenPaw** | High Volume | 63 | No new releases | Robust (Iterative) |
| **ZeroClaw** | 22 | 29 | v0.8.7/v0.9.0 prep | High (Security-focused) |
| **IronClaw** | 0 | 0 | Inactive | Stalled |

*\*Health score based on responsiveness to bugs and velocity of non-breaking changes.*

### 3. OpenClaw’s Position
*   **Advantages:** OpenClaw maintains the largest footprint and highest community engagement, acting as the de-facto reference implementation for the ecosystem.
*   **Technical Approach:** Unlike the modular approach of QwenPaw or the security-first posture of ZeroClaw, OpenClaw is currently in a massive "deslopping" phase. It is struggling with legacy technical debt (bootstrap files, context bloat) that smaller projects have either avoided or architected around.
*   **Comparison:** Its community size is vastly superior, providing a massive testing ground, yet it currently suffers from "feature-bloat-induced instability" compared to the leaner Hermes and QwenPaw projects.

### 4. Shared Technical Focus Areas
*   **"Thinking" & Reasoning Control:** Users across **QwenPaw** (#8439) and **ZeroClaw** (#12054) are demanding granular control over model-native reasoning (thinking levels).
*   **Database/Memory Management:** **OpenClaw** (session DB compaction) and **QwenPaw** (embedding reindexing/history.db) are both struggling with performance degradation from long-lived local storage.
*   **Agent Orchestration:** **Hermes** and **OpenClaw** are both actively refactoring how sub-agents are managed to prevent authority/tool-call leakage.

### 5. Differentiation Analysis
*   **QwenPaw:** Focuses on modularity and RAG-heavy, multi-modal workflows; targets "power users" looking for local embedding control.
*   **ZeroClaw:** Distinguishes itself through an uncompromising focus on OIDC/Identity and security/access control; targets enterprise-like or multi-tenant deployments.
*   **Hermes Agent:** Positioned as the "bridge" between browser-hosted UI and remote gateways; focuses on cross-platform accessibility (Wayland, Web-to-Desktop).
*   **OpenClaw:** Acts as the "everything" platform, aiming for comprehensive coverage despite the resulting stability risks.

### 6. Community Momentum & Maturity
*   **High Velocity (Iterative):** **QwenPaw** and **OpenClaw** represent the highest velocity. QwenPaw is currently healthier, with architectural progress (PawApp Control Plane) moving forward without as many catastrophic regression reports.
*   **Stabilizing/Hardening:** **ZeroClaw** and **Hermes** are in a hardening phase, prioritizing security and reliability over new feature sets as they approach major version releases (v0.9.0 / v0.22.x).
*   **Stalled:** **IronClaw** shows zero recent activity, suggesting a loss of momentum or project abandonment.

### 7. Trend Signals
*   **The "Thinking" Tax:** Developers are realizing that model-native reasoning is not "free" and are pushing for architectural knobs (like `thinking_level`) to manage token consumption and latency.
*   **Platform Identity:** The shift toward native browser-side interfaces (Hermes/ZeroClaw) suggests that the "agent terminal" is evolving into a full web-based dashboard, reducing reliance on CLI-only interfaces.
*   **Security Debt:** The surge in security-tagged issues across the board (especially in **ZeroClaw**) indicates that the ecosystem is finally maturing to a point where "auth bypass" and "privilege escalation" are becoming valid community concerns—a sign of increased professional interest in these agents.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest: 2026-10-27

### 1. Today's Overview
The Hermes Agent project remains in a state of high operational intensity, with 74 active GitHub items (24 issues, 50 PRs) updated in the last 24 hours. Development is currently focused on hardening the recently shipped browser-hosted Desktop/Webapp interface (#144648) and refining multi-agent delegation frameworks. While the sheer volume of "today-only" bug reports indicates some instability following recent stable releases (v0.22.5), the maintainer team is responding rapidly with targeted hotfixes and cross-process communication patches.

### 2. Releases
*   **No new releases.** Current stable version remains **v0.22.5**.

### 3. Project Progress
*   **Webapp Stabilization:** PR #145106 was merged, resolving critical issues regarding plain-HTTP origins, browser-side clipboard/crypto support, and pop-out window handling. PR #145107 builds on this to ensure pop-out blockers are reported to users in real-time.
*   **Tooling & Agent Orchestration:** Several features were initiated to improve subagent management and Kanban workflows (#145316, #145317, #145319), signaling a push toward more autonomous, team-oriented agent behavior.
*   **Platform Refinement:** Fixes were pushed to better manage Feishu websocket compatibility (#62565) and to prevent project duplication in CLI/Desktop interfaces (#75981).

### 4. Community Hot Topics
*   [#139818] **Remote-backend session resumption:** With 22 comments, this remains the most contentious issue. Users report that desktop sessions hosted on remote backends cannot be resumed after a restart. The complexity lies in session state serialization across isolated gateway environments.
*   [#105758] **Terminal Lifecycle Guard:** With 15 comments, this issue highlights a friction point where the "security" layer for the terminal incorrectly identifies benign Node.js CLI tools as threats, blocking legitimate developer workflows.

### 5. Bugs & Stability
*   **Critical (Gateway/Auth):** [#145315] A new report identifies a deadlock in webhook `cron_job` processing that can bring down the entire gateway under high concurrency.
*   **High (Sessions/Auth):** [#141878] Cross-process plugin activation fails silently on login-gated dashboards.
*   **High (Regression):** [#145261] Discord group sessions in v0.22.5 are suffering from massive admission conflicts (2,600+ refusals), indicating a potential regression in the multiplexing/profile logic.
*   **High (Tooling):** [#145063] Model tool-calling parameters are being misparsed for tools using `anyOf` logic, causing argument drops.

### 6. Feature Requests & Roadmap Signals
*   **Mattermost Threading:** PR #145312 proposes "Free Response" mode for Mattermost, allowing agents to respond in threads without re-triggering mention gates.
*   **Google Workspace Integration:** PR #145311 adds support for `freebusy` calendar checks, suggesting a roadmap focus on productivity and scheduling agents.
*   **Plugin Metadata:** Issue #145313 highlights a need for a centralized Composio toolkit catalog to simplify credential management for community plugins.

### 7. User Feedback Summary
Users are currently expressing frustration with **"fresh install" friction** (e.g., #119529, where search-only backends default to extraction tasks) and **process isolation constraints** that block valid local tools. The transition to the browser-based Desktop app has introduced immediate UI/UX regressions (clipboard, pop-ups, tray icons on Wayland), though the community is actively participating in submitting fixes for these early-stage bugs.

### 8. Backlog Watch
*   [#119805] **QQBot Gateway:** A persistent issue involving message routing loops after gateway restarts has been open since late September with minimal resolution progress.
*   [#31734] **System Prefill Messages:** This PR remains a "sweeper" of sorts, attempting to fix how system prompts are folded for OpenAI-compatible gateways. It has been open since May 2026 and represents a significant compatibility blocker for users of stricter model providers.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest: 2026-10-27

## 1. Today's Overview
QwenPaw shows high developer velocity, with 63 total items updated in the last 24 hours. The focus is currently split between stabilizing the desktop experience (Linux/Tauri improvements) and refining the memory/embedding architecture for production-scale deployments. The project health is robust, characterized by a rapid response rate to bugs, though the high volume of incoming technical issues suggests that users are pushing the platform toward more complex, multi-modal, and long-running agent workflows.

## 2. Releases
*No new releases in the last 24 hours.*

## 3. Project Progress
Recent PR activity demonstrates a strong move toward isolation and architectural modularity:
*   **Performance & Cleanup:** [#7923](https://github.com/agentscope-ai/QwenPaw/pull/7923) was closed, implementing a retention policy for tool result blocks to prevent unbounded growth of `history.db`.
*   **API Resilience:** [#8165](https://github.com/agentscope-ai/QwenPaw/pull/8165) (related to #8162) addresses streaming compatibility with OpenAI-like providers that omit delta events.
*   **Bug Resolution:** [#8062](https://github.com/agentscope-ai/QwenPaw/pull/8062) provides a partial fix for embedding reindexing failures, ensuring partial successes are preserved when specific chunks exceed token limits.

## 4. Community Hot Topics
*   **[#8040](https://github.com/agentscope-ai/QwenPaw/issue/8040) Embedding Reindex Incomplete:** Highly critical issue regarding silent data dropping in embedding batches. This is the top pain point for users managing large RAG knowledge bases.
*   **[#8442](https://github.com/agentscope-ai/QwenPaw/issue/8442) Linux Desktop Parity:** High community interest in native `deb`/`AppImage` support, signaling a growing Linux-based power-user demographic.
*   **[#7874](https://github.com/agentscope-ai/QwenPaw/pull/7874) PawApp Control Plane:** A massive architectural PR that remains a focal point for the future of the QwenPaw plugin/app ecosystem.

## 5. Bugs & Stability
*   **High Severity:** [#8435](https://github.com/agentscope-ai/QwenPaw/issue/8435) - LLM stream hangs indefinitely due to rate-limiter semaphore deadlock. This renders the agent non-functional during tool-heavy conversations.
*   **Medium Severity:** [#8417](https://github.com/agentscope-ai/QwenPaw/issue/8417) - Context compression fails on certain models (glm-5.3-flash) due to conflicting "thinking" parameter handling, breaking long-term memory.
*   **Medium Severity:** [#8424](https://github.com/agentscope-ai/QwenPaw/issue/8424) - MCP server negotiation failure. Fixed by PR [#8445](https://github.com/agentscope-ai/QwenPaw/pull/8445).
*   **Minor Severity:** [#8415](https://github.com/agentscope-ai/QwenPaw/issue/8415) - CRLF to LF file ending conversion during `edit_file`, potentially causing formatting issues for strict version control users.

## 6. Feature Requests & Roadmap Signals
*   **Thinking Capabilities:** [#8439](https://github.com/agentscope-ai/QwenPaw/issue/8439) requests granular control over "thinking_level" for cron jobs, likely to be prioritized for token management.
*   **Account Convenience:** [#8437](https://github.com/agentscope-ai/QwenPaw/pull/8437) proposes local ChatGPT subscription sign-in, which would significantly lower the barrier to entry for non-developer users.
*   **SDK/Lifecycle:** [#8431](https://github.com/agentscope-ai/QwenPaw/pull/8431) seeks to modularize the local Whisper implementation, favoring an "all-plugin" architecture.

## 7. User Feedback Summary
Users are generally satisfied with QwenPaw’s breadth of features but are currently struggling with the stability of "long-lived" processes. Common complaints include memory database bloat, intermittent hangs in asynchronous tool loops, and difficulties with specialized API provider compatibility (e.g., streaming events and context compression headers).

## 8. Backlog Watch
*   **[#4946](https://github.com/agentscope-ai/QwenPaw/issue/4946):** This long-standing issue regarding 6+ minute startup blocks due to plugin import failures has been closed, marking a significant win for system responsiveness.
*   **[#8178](https://github.com/agentscope-ai/QwenPaw/pull/8178):** Supporting nested/categorized skill directories is waiting for review; this is highly requested by users who maintain extensive local agent libraries.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest - 2026-10-27

### 1. Today's Overview
ZeroClaw is currently in a state of high-intensity development, with a significant focus on stabilizing security, authentication, and core agent runtime features ahead of the v0.9.0 release. The past 24 hours have seen a heavy volume of activity, with 22 new issues and 29 active PRs, indicating a rigorous push toward hardening the platform’s identity and access control systems. While the project is rapidly advancing its architectural capabilities, the sheer volume of "security" tagged bugs suggests a period of intense audit-driven refinement.

### 2. Releases
*None. The project is currently focused on v0.8.7 (bug fixes) and the upcoming v0.9.0 (major architectural features).*

### 3. Project Progress
*   **Auth & Identity Hardening:** Development is progressing rapidly on OIDC integration for the dashboard ([PR #11965](https://github.com/zeroclaw-labs/zeroclaw/pull/11965)) and securing RPC calls to ensure scoped principals cannot access restricted logs ([PR #11326](https://github.com/zeroclaw-labs/zeroclaw/pull/11326)).
*   **Runtime Efficiency:** A new PR has been opened to implement deferred bootstrap sections, allowing for addressable knowledge that doesn't consume context limits per-turn ([PR #12044](https://github.com/zeroclaw-labs/zeroclaw/pull/12044)).
*   **Fixes:** A critical plugin discovery race condition where mismatched manifests were loaded has been identified and addressed ([PR #12040](https://github.com/zeroclaw-labs/zeroclaw/pull/12040)).

### 4. Community Hot Topics
*   **[PR #11847](https://github.com/zeroclaw-labs/zeroclaw/pull/11847):** The introduction of native Rust XMPP support remains a significant architectural addition, highlighting a user need for decentralized, legacy-compatible communication channels.
*   **[Issue #11013](https://github.com/zeroclaw-labs/zeroclaw/issues/11013):** This tracker for unified file intake and delivery continues to be a focal point, as users desire more robust handling of files across various agent channels.
*   **[Issue #12042](https://github.com/zeroclaw-labs/zeroclaw/issues/12042):** The independent review on *Hlido* (scoring 79/100) has drawn community attention, signaling a push for objective, third-party benchmarks for AI agent frameworks.

### 5. Bugs & Stability
The project faces a surge of security-related bug reports, primarily centered on authentication bypasses:
*   **High Severity:** [Issue #12053](https://github.com/zeroclaw-labs/zeroclaw/issues/12053) (Unpinned third-party script on dashboard) and [Issue #12050](https://github.com/zeroclaw-labs/zeroclaw/issues/12050) (Login CSRF via OIDC callback).
*   **Medium Severity:** [Issue #12045](https://github.com/zeroclaw-labs/zeroclaw/issues/12045) (Lack of response body size limits before buffering) and [Issue #10921](https://github.com/zeroclaw-labs/zeroclaw/issues/10921) (Qdrant time-bounded recall omitting results).
*   **Minor:** [Issue #12021](https://github.com/zeroclaw-labs/zeroclaw/issues/12021) (UI highlight persistence in web dashboard).

### 6. Feature Requests & Roadmap Signals
*   **Reranking Strategy:** [Issue #12022](https://github.com/zeroclaw-labs/zeroclaw/issues/12022) proposes an opt-in external rerank stage for memory, likely to be adopted for users requiring higher precision in complex agentic retrieval.
*   **Thinking Levels:** [Issue #12054](https://github.com/zeroclaw-labs/zeroclaw/issues/12054) requests per-agent control over OpenAI reasoning efforts, signaling a trend toward finer-grained control over model-native "thinking" capabilities.

### 7. User Feedback Summary
Current user feedback emphasizes a desire for feature parity across git providers (Gitea/Forgejo vs. GitHub) and more transparency when security policies block agent actions. The community is actively pointing out discrepancies between configuration settings and their actual implementation, urging maintainers to either "implement or remove" inert config keys.

### 8. Backlog Watch
*   **[Issue #10781](https://github.com/zeroclaw-labs/zeroclaw/issues/10781):** Cleanup of inert configuration keys. This has been outstanding since September and impacts user trust in configuration management.
*   **[Issue #10673](https://github.com/zeroclaw-labs/zeroclaw/issues/10673):** Persistence failures on daemon RPC paths. This is a workflow-blocking bug that has been open since early September and requires urgent attention to ensure stable daemon operations.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/jinming1345/agents-radar).*