# OpenClaw Ecosystem Digest 2026-09-28

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-28 01:10 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest - 2026-09-28

## 1. Today's Overview
The OpenClaw repository is experiencing extreme activity, with 1,000 combined issues and PRs updated in the last 24 hours. The project is currently in a state of high-intensity stabilization, characterized by a concentration of "P0/P1" stability issues and aggressive "deslopping" (refactoring) of the codebase. While the community is actively identifying critical regression and memory management bugs, the maintainers are pushing through massive refactoring efforts, particularly focused on plugin lifecycle, gateway startup, and platform-specific cleanup.

## 2. Releases
*No new releases were published in the last 24 hours.*

## 3. Project Progress
Refactoring and cleanup dominate the current pull request activity:
*   **Platform Refinement:** Several "deslopping" PRs are underway to consolidate duplicated logic across macOS, iOS, and channel plugins (e.g., [PR #159778](https://github.com/openclaw/openclaw/pull/159778), [PR #159998](https://github.com/openclaw/openclaw/pull/159998)).
*   **Test Stabilization:** Multiple PRs aim to harden the CI/CD pipeline against flaky tests (e.g., [PR #159992](https://github.com/openclaw/openclaw/pull/159992), [PR #160005](https://github.com/openclaw/openclaw/pull/160005)).
*   **Infrastructure:** Significant work is being done to ensure stable gateway restarts and state-lock handling (e.g., [PR #159347](https://github.com/openclaw/openclaw/pull/159347), [PR #159834](https://github.com/openclaw/openclaw/pull/159834)).

## 4. Community Hot Topics
*   **[#159356] Llama.cpp Manager Embedding Failures:** 25 comments; centers on memory pressure leading to OOM-correlated HTTP 500 errors. Users are noting the need for increased RAM (8GB+). [Link](https://github.com/openclaw/openclaw/issues/159356)
*   **[#97616] Zombie Process Leakage:** 16 comments; ongoing concern regarding un-reaped child processes from tools/hooks, degrading long-term runtime performance. [Link](https://github.com/openclaw/openclaw/issues/97616)
*   **[#157531] 2026.9.7 Fixes Tracker:** 15 comments; this is the central hub for coordinating critical P1 candidates for the next release. [Link](https://github.com/openclaw/openclaw/issues/157531)

## 5. Bugs & Stability
The project is dealing with several P0/P1 stability blockers:
*   **Critical Regressions:**
    *   [#159514](https://github.com/openclaw/openclaw/issues/159514): Memory leaks in the catalog worker (~8MB/request), leading to rapid heap exhaustion.
    *   [#157812](https://github.com/openclaw/openclaw/issues/157812): Recursive Windows update failures causing persistent service availability issues.
    *   [#126821](https://github.com/openclaw/openclaw/issues/126821): Recurrent SQLite corruption despite manual DB rebuilds.
*   **Crash Loops:**
    *   [#157160](https://github.com/openclaw/openclaw/issues/157160): Gateway crash-loops on startup migrations.
    *   [#158936](https://github.com/openclaw/openclaw/issues/158936): macOS watchdog killing slow-starting gateways.

## 6. Feature Requests & Roadmap Signals
*   **Operator Control:** A highly requested feature to allow operators to disable client-side file/image uploads to maintain security boundaries is underway in [PR #158567](https://github.com/openclaw/openclaw/pull/158567).
*   **UX Improvements:** Users are asking for better management of UI sidebar filters to reduce visual clutter ([PR #150605](https://github.com/openclaw/openclaw/pull/150605)).
*   **Prediction:** Expect the next release to prioritize "Gateway Recovery" and "Managed Service Stability" to address the high volume of reported start-up and update-related crash loops.

## 7. User Feedback Summary
*   **Dissatisfaction:** Significant frustration with the "Update/Repair" cycle, which currently appears to be fragile, often leaving users with a non-responsive gateway.
*   **Pain Points:** Production environments are reporting issues with "Database Locked" errors (see [#148307](https://github.com/openclaw/openclaw/issues/148307)) and excessive SSD wear due to redundant plugin capture behavior (see [#157989](https://github.com/openclaw/openclaw/issues/157989)).
*   **Performance:** Users on mobile (iOS/Android) continue to report high latency and UI lag when "Reasoning and Tool Activity" is enabled.

## 8. Backlog Watch
*   **[#55694]** An old, P1 issue regarding infinite loops in tool-call retries that cause message spam in chat threads remains open since March 2026. [Link](https://github.com/openclaw/openclaw/issues/55694)
*   **[#84110]** A regression in Codex prompt rewriting that impacts OpenAI cache efficiency has been open for several months and continues to affect power users. [Link](https://github.com/openclaw/openclaw/issues/84110)

---

## Cross-Ecosystem Comparison

### Cross-Project Comparison Report: 2026-09-28

#### 1. Ecosystem Overview
The open-source AI agent ecosystem is currently in a "stabilization-first" phase, shifting focus from rapid feature prototyping to the hardening of long-running autonomous workflows. Projects are universally grappling with the challenges of local memory persistence, multi-instance environment contention, and the "fragility" of agentic tool-use loops. The landscape is currently dominated by intense efforts to transition from experimental desktop wrappers to reliable, production-ready local gateways.

#### 2. Activity Comparison
| Project | Relative Activity | Release Status | Health/Stability Score* |
| :--- | :--- | :--- | :--- |
| **OpenClaw** | Extreme (1,000+ updates) | No (Stalled) | Low (P0/P1 Blockers) |
| **Hermes Agent** | Moderate (100 updates) | No | Moderate (Environment drift) |
| **IronClaw** | Low (Maintenance) | No | High (Mature) |
| **QwenPaw** | High (UI/Arch focus) | No | Moderate (Context Bloat) |
| **ZeroClaw** | High (Security focus) | No | Moderate (S0 Criticals) |

*\*Health score based on ratio of new feature development vs. critical bug/crash-loop management.*

#### 3. OpenClaw’s Position
OpenClaw serves as the current "reference implementation" for the ecosystem, evidenced by its massive issue volume. While it suffers from the most severe stability issues (memory leaks, database corruption), it attracts the highest volume of community contributors. Unlike IronClaw, which is optimizing for lean, stable infrastructure, OpenClaw is attempting to support a broad set of plugins and channels, leading to "slop" that the project is now aggressively refactoring. It is the highest-risk, highest-reward project for users needing deep integration features.

#### 4. Shared Technical Focus Areas
*   **Persistent Memory/State:** All projects (OpenClaw, QwenPaw, ZeroClaw) are prioritizing how agent contexts persist through restarts.
*   **Dependency/Environment Drift:** Hermes and OpenClaw are struggling specifically with Windows-based pathing and dependency resolution for local LLM runtimes (e.g., Llama.cpp).
*   **Intelligent Tool Dispatch:** Both IronClaw and OpenClaw are exploring ways to reduce "tool bloat" and latency, moving toward smarter, context-aware tool selection at the start of a prompt.

#### 5. Differentiation Analysis
*   **IronClaw** positions itself as the "Enterprise-Stable" choice, emphasizing minimal dependency footprint and Rust-native safety.
*   **ZeroClaw** is the clear "Security-First" leader, dealing with sophisticated S0-level permission leakage and principal-scope issues.
*   **QwenPaw** focuses on the "UX/UI layer," providing the most mature interface for end-users compared to the more backend-heavy OpenClaw or ZeroClaw.
*   **Hermes Agent** targets "autonomous workflow" users, focusing heavily on headless cron stability and multi-environment management.

#### 6. Community Momentum & Maturity
*   **High Momentum / Low Maturity:** OpenClaw and ZeroClaw. They are rapidly iterating but carry significant technical debt that disrupts user experience.
*   **Low Momentum / High Maturity:** IronClaw. It has effectively plateaued into a maintenance cycle, making it the most reliable for non-experimental deployments.
*   **High Momentum / Medium Maturity:** QwenPaw. Actively balancing UI refinement with core architecture improvements.

#### 7. Trend Signals
*   **From Tools to Memory Layers:** The transition in ZeroClaw (RFC #11053) suggests a industry-wide move to elevate Knowledge Graphs and Vector DBs from mere "tools" into first-class system memory components.
*   **The "Agent-Initiated" Lifecycle:** There is a clear shift away from manual user intervention for context management. Developers are increasingly demanding "agent-controlled" context compression and checkpointing to support long-running, autonomous cron-job agents.
*   **Security of Delegation:** As multi-agent setups become common, the "Principal Scope" problem (preventing sub-agents from accessing root-level tools/data) is emerging as a critical, non-negotiable requirement for 2027-ready systems.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest: 2026-09-28

## 1. Today's Overview
The Hermes Agent project is currently experiencing a high-intensity development cycle focused on stabilizing Windows installation paths and addressing deep-seated architectural bugs in session management and dependency environments. With 100 total updates across issues and PRs in the last 24 hours, the project remains highly active, though the community is currently strained by "environment drift" and installation friction. Maintainers are prioritizing reliability for cross-platform deployments, particularly for Windows and headless cron environments.

## 2. Releases
*No new releases identified for 2026-09-28.*

## 3. Project Progress
*   **Resolved Installation Hurdles:** PR [#125598](https://github.com/NousResearch/hermes-agent/pull/125598) successfully addresses the Windows 10/11 dependency unpacking failure by shifting to PortableGit, eliminating the reliance on problematic `bzip2`/`tar` calls.
*   **Desktop/UI Refinements:** PR [#125870](https://github.com/NousResearch/hermes-agent/pull/125870) implemented automated JS linting/fixing for the desktop client, contributing to codebase health.
*   **Infrastructure:** Work is underway to harden FIPS compliance in cryptographic hashing (PR [#125879](https://github.com/NousResearch/hermes-agent/pull/125879)) to ensure compatibility with restricted RHEL environments.

## 4. Community Hot Topics
*   **Windows Setup Blockers (Issue [#125657](https://github.com/NousResearch/hermes-agent/issue/125657)):** The most discussed issue (16 comments) centers on installation failures during Python dependency resolution. It represents a significant barrier to entry for Windows users.
*   **Linux Desktop Pathing (Issue [#122438](https://github.com/NousResearch/hermes-agent/issue/122438)):** Users are struggling with self-healing desktop launchers that fail to point to the correct managed virtual environment post-update, indicating a need for more robust environment discovery.
*   **Installation/Compatibility:** Issues [#125350](https://github.com/NousResearch/hermes-agent/issue/125350) and [#79087](https://github.com/NousResearch/hermes-agent/issue/79087) highlight that users are hitting "wall" scenarios where fresh installs or update probes consistently fail, necessitating a rethink of the bootstrapping process.

## 5. Bugs & Stability
*   **Critical (P0):** Issue [#125793](https://github.com/NousResearch/hermes-agent/issue/125793) reports a state-persistence bug where internal events flip system prompts after a gateway restart.
*   **High (P1):** Dependency activation issues continue to plague the system. Issue [#122555](https://github.com/NousResearch/hermes-agent/issue/122555) and [#124279](https://github.com/NousResearch/hermes-agent/issue/124279) detail how environments are incorrectly scoped, causing modules like `ruamel` to disappear for cron workers.
*   **Moderate (P2):** Browser subprocesses are failing to shut down cleanly (`browser_harness.daemon` leaks) as noted in [#121095](https://github.com/NousResearch/hermes-agent/issue/121095).

## 6. Feature Requests & Roadmap Signals
*   **Security-First Vaulting:** The documentation and feature PRs from user `kvnloo` ([#107700](https://github.com/NousResearch/hermes-agent/issue/107700), [#107704](https://github.com/NousResearch/hermes-agent/issue/107704)) signal a shift toward "broker-neutral" credential handling, moving away from hard-coded password manager integrations toward an identity-fill capability.
*   **Desktop Convenience:** High demand for persistent UX features such as global "Find" across chat/settings ([#46169](https://github.com/NousResearch/hermes-agent/issue/46169)) and improved scheduling controls.

## 7. User Feedback Summary
Current user sentiment reflects frustration with "fragile" installations. Windows users are particularly affected by environment-locking and path issues, while Linux users are grappling with desktop shortcut resolution. There is a clear divide between "standard" chat users and those using the agent for long-running autonomous tasks (as highlighted in [#123165](https://github.com/NousResearch/hermes-agent/issue/123165)), who feel their workflows are hampered by configuration rigidity.

## 8. Backlog Watch
*   **Architectural Consolidation:** PR [#106742](https://github.com/NousResearch/hermes-agent/pull/106742) is a massive, long-standing proposal to unify all surfaces (CLI, TUI, Desktop) under one gateway. This requires significant maintainer attention as it touches nearly every subsystem.
*   **Full-Text Search:** Issue [#51694](https://github.com/NousResearch/hermes-agent/issue/51694) regarding the limitation of `Cmd+K` search only to active sessions remains a frequent point of contention for power users.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

## IronClaw Project Digest - 2026-09-28

### 1. Today's Overview
The IronClaw project is currently in a maintenance-heavy phase, with development activity focused heavily on dependency management and infrastructure refinement. While there is a notable new proposal regarding agent intelligence, the majority of recent activity is driven by automated bots performing routine updates. Overall project health appears stable, with the maintainers prioritizing technical debt reduction and CI/CD consistency over new feature delivery.

### 2. Releases
*   **None.** No new releases were cut during this period.

### 3. Project Progress
*   **Dependency Management:** [PR #8104](https://github.com/nearai/ironclaw/pull/8104) was successfully merged, finalizing a set of 29 dependency updates to the core Rust toolchain, including critical components like `uuid` and `rust_decimal`.

### 4. Community Hot Topics
*   **[Issue #8113: Proposal - opt-in turn-0 tool selection](https://github.com/nearai/ironclaw/issues/8113)**: This is the primary point of interest. It suggests optimizing agent efficiency by using the initial user message to predict required tools via a hybrid BM25F + embedding approach. This indicates a community focus on reducing "tool bloat" and latency at the start of agent conversations.

### 5. Bugs & Stability
*   **Status:** No new bugs or regressions were reported in the last 24 hours. The focus remains on infrastructure stability via pending dependency PRs.

### 6. Feature Requests & Roadmap Signals
*   **Agent Intelligence:** The "turn-0 tool selection" proposal (Issue #8113) is a significant signal for the roadmap. Implementing this would suggest a move toward more intelligent, context-aware tool dispatching rather than exposing the full toolset to the LLM immediately upon initialization.
*   **Prediction:** Expect upcoming releases to prioritize "Discovery Bridges" as defined in the proposal, which would formalize how agents interact with the tool search index.

### 7. User Feedback Summary
*   **Developer Experience:** While there is no direct user dissatisfaction reported, the high volume of automated PRs (Dependabot) suggests a project that is kept strictly up-to-date with the broader Rust ecosystem, minimizing security risks for users.

### 8. Backlog Watch
*   **[PR #7834: Bump the wasm group](https://github.com/nearai/ironclaw/pull/7834)**: Open since August 23rd, this PR involves critical WASM tooling (`wasmtime`). It remains pending; its extended age suggests it may involve complex breaking changes or require significant testing before merge.
*   **[PR #7988: Refresh codebase knowledge graph](https://github.com/nearai/ironclaw/pull/7988)**: This CI-focused PR has been open since late August. Frequent refreshes of the codebase-memory are vital for agent accuracy; maintainers should verify if this is stalled due to pipeline errors or simply pending review.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest: 2026-09-28

## 1. Today's Overview
QwenPaw shows high developer activity today, characterized by a mix of immediate UI/UX refinements and deeper architectural challenges regarding context management. While no new releases were pushed, the community is actively addressing issues ranging from desktop multi-instance stability to granular UI customization. Project health remains strong, with a healthy ratio of bug reports to community-driven enhancement requests.

## 2. Releases
*   **No new releases** were issued in the last 24 hours.

## 3. Project Progress
*   **Files Panel Refresh (#7996):** Progress was made on resolving stale UI states in the Files panel. A PR is currently under review to ensure expanded directories refresh correctly without requiring a page reload.
*   **Tool Call Resiliency (#8001):** An active PR aims to improve runtime stability by ensuring timeout tool results remain recoverable, allowing models to process timeout explanations rather than crashing.
*   **UX Unification (#7956):** Ongoing work to unify console settings and transition fluidity across the platform.

## 4. Community Hot Topics
*   **Context Management (#7998 & #7994):** Users are heavily scrutinizing the automated context compression triggers. The community sentiment suggests that manual triggering is insufficient for high-volume automated workflows (cron tasks), with users requesting "agent-initiated" compression when thresholds are met.
*   **UI Customization (#7999):** High demand for accessibility features, specifically adjustable font sizes for the Desktop client, catering to both low-vision users and high-DPI display setups.

## 5. Bugs & Stability
*   **Critical (Desktop):** [Issue #8000](https://github.com/agentscope-ai/QwenPaw/issues/8000) - Desktop client lacks a single-instance guard on Windows, leading to termination of the background process when a second instance is launched.
*   **Medium (UI/UX):** [Issue #7995](https://github.com/agentscope-ai/QwenPaw/issues/7995) - Files panel refresh button fails to update expanded folders (Fix in progress via [PR #7996](https://github.com/agentscope-ai/QwenPaw/pull/7996)).
*   **Low (UI/Sync):** [Issue #7994](https://github.com/agentscope-ai/QwenPaw/issues/7994) - Context status indicators failing to update upon switching conversations.

## 6. Feature Requests & Roadmap Signals
*   **Lifecycle Management (#4525):** The request for "Agent self-managed context lifecycle" is a potential roadmap priority. As agents scale to long-running cron tasks, the degradation of instruction-following is becoming a blocking point. Expect future development to focus on "auto-checkpoint & reset" mechanisms.
*   **Granular Control (#7957):** A new request to toggle/disable unused pre-made models and channels suggests a shift toward a more modular, "lean" UI experience to reduce cognitive load.
*   **Conversation Control (#7997):** Support for message retraction and editing in the WebUI is a significant request for power users wanting to prune conversation history manually.

## 7. User Feedback Summary
Current user satisfaction is pressured by "Context Bloat." Users running long, multi-step agent workflows feel that the current automatic compression logic is too reactive and bound to manual input, leading to context-length exhaustion. Desktop users are also highlighting the need for basic accessibility and operational safety (like the single-instance lock).

## 8. Backlog Watch
*   [Issue #4525](https://github.com/agentscope-ai/QwenPaw/issues/4525): **High priority.** This issue has been open since May 2026 and concerns core agent intelligence degradation. It requires a maintainer-level design decision on how agents should manage their own checkpoints.
*   [PR #6874](https://github.com/agentscope-ai/QwenPaw/pull/6874): **Medium priority.** Stalled since August; this MCP tool-call timeout enhancement is critical for reliable agent execution and should be prioritized for review to clear the backlog.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest: 2026-09-28

## 1. Today's Overview
The ZeroClaw project maintains high velocity with 93 active items updated in the last 24 hours, focusing heavily on security hardening and stability within the `runtime` and `tool` subsystems. Development is currently dominated by critical security remediations (S0-ranked issues) regarding principal scope and environment persistence, alongside architectural pivots for memory management. The community remains active, with a significant push toward finalizing the v0.8.6 and v0.9.0 roadmap milestones.

## 2. Releases
*No new releases were published in the last 24 hours.*

## 3. Project Progress
*   **Resolved Issues:**
    *   [#11199](https://github.com/zeroclaw-labs/zeroclaw/issues/11199): Fixed a critical regression where resumed shell environments diverged from the initial admission state.
    *   [#10523](https://github.com/zeroclaw-labs/zeroclaw/issues/10523): Addressed invisible bootstrap file truncation issues caused by the `compact_context` setting.
    *   [#11036](https://github.com/zeroclaw-labs/zeroclaw/issues/11036): Resolved a 403 FreeTierError for OpenCode users on version 0.8.4.
    *   [#9323](https://github.com/zeroclaw-labs/zeroclaw/issues/9323): Accepted a proposal to define ownership of execution-tree iteration budgets.

## 4. Community Hot Topics
*   [#10407](https://github.com/zeroclaw-labs/zeroclaw/pull/10407) **(Persistent Session Attachments):** Continues to be a massive architectural undertaking; users need durable, SQLite-backed prompt attachments that survive daemon restarts.
*   [#7943](https://github.com/zeroclaw-labs/zeroclaw/issues/7943) **(Realtime Voice-Host):** Interest remains high for a backend-agnostic WebSocket voice client (Wyoming-aligned) to offload audio processing from the main agent brain.
*   [#10919](https://github.com/zeroclaw-labs/zeroclaw/issues/10919) **(CI/Tooling Synchronization):** High activity regarding flaky tests caused by inconsistent process-global runtime proxy states.

## 5. Bugs & Stability
*   **[S0 - Critical]** [#11136](https://github.com/zeroclaw-labs/zeroclaw/issues/11136): Concurrent `file_edit/file_write` calls result in silent data loss; maintainers are currently evaluating synchronization in `zeroclaw-tools`.
*   **[S0 - Critical]** [#11198](https://github.com/zeroclaw-labs/zeroclaw/issues/11198): Delegated memory tools are failing to respect principal scope, potentially leaking private data to sub-agents.
*   **[S0 - Critical]** [#11197](https://github.com/zeroclaw-labs/zeroclaw/issues/11197): Security regression where session resume restores forwarded environment variables even after administrator revocation.
*   **[S1 - Blocked]** [#11130](https://github.com/zeroclaw-labs/zeroclaw/issues/11130): DeepSeek DSML tool-call markup is not parsing, causing silent turn failures.

## 6. Feature Requests & Roadmap Signals
*   **Knowledge Graph (RFC):** [#11053](https://github.com/zeroclaw-labs/zeroclaw/issues/11053) proposes elevating the knowledge graph from a "tool" to a first-class "memory layer," indicating a shift toward deeper autonomous memory persistence.
*   **Discord Role Authorization:** [#9970](https://github.com/zeroclaw-labs/zeroclaw/issues/9970) is a highly requested security enhancement to allow Discord-channel access based on roles rather than raw user IDs.
*   **Predictive Release:** Expect v0.8.6 to focus on the stabilization of these security-hardened tools and the completion of the runtime delivery tracker [#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432).

## 7. User Feedback Summary
Users are reporting significant frustration with the fragility of the `runtime` state during interruptions (e.g., Ctrl+C on Windows [#9028](https://github.com/zeroclaw-labs/zeroclaw/issues/9028)). There is a clear demand for more predictable "undo/redo" and navigation in the ZeroCode composer [#10909](https://github.com/zeroclaw-labs/zeroclaw/issues/10909) and better diagnostic reporting when agent-browser probes fail [#10757](https://github.com/zeroclaw-labs/zeroclaw/issues/10757).

## 8. Backlog Watch
*   [#9158](https://github.com/zeroclaw-labs/zeroclaw/issues/9158): The request for Signal "Note to Self" processing has been in the parking lot since July; it is a prime candidate for community-led contribution.
*   [#11138](https://github.com/zeroclaw-labs/zeroclaw/issues/11138): Needs maintainer review on how bounded delegation should handle caller tool-level approvals—a critical bottleneck for safe multi-agent setups.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/jinming1345/agents-radar).*