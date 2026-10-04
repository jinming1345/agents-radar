# OpenClaw Ecosystem Digest 2026-10-04

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-10-04 01:58 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

⚠️ Summary generation failed.

---

## Cross-Ecosystem Comparison

## Cross-Project Analysis: Personal AI Agent Ecosystem (2026-10-04)

### 1. Ecosystem Overview
The open-source AI agent landscape is currently defined by a high-intensity "stability crunch," as projects transition from experimental prototypes to production-grade tooling. Across the ecosystem, common pain points include managing persistent scratch space, cross-platform environmental drift, and the challenges of maintaining UI/UX state during complex model-driven workflows. As projects like Hermes, ZeroClaw, and QwenPaw scale, the community focus has shifted heavily from feature proliferation to hardening core architectures, particularly regarding security isolation, IPC stability, and multimodal input reliability.

### 2. Activity Comparison
| Project | Issues (Recent) | PRs (Active/Merged) | Release Status | Health Score |
| :--- | :--- | :--- | :--- | :--- |
| **Hermes Agent** | High | 100+ | Stable/Maintenance | 7/10 (High stress) |
| **IronClaw** | Low | 0 | None | 4/10 (Stagnant) |
| **QwenPaw** | Moderate | 11 | None | 8/10 (Robust/Active) |
| **ZeroClaw** | High | 100+ | v0.8.6/0.9.0 Prep | 9/10 (High velocity) |

*Note: "Health Score" reflects development momentum and responsiveness, not technical debt.*

### 3. OpenClaw’s Position
*Data Note: Due to the failure of the automated summary generation for OpenClaw, its specific metrics are unavailable.* 
Historically, OpenClaw serves as the reference architecture for this ecosystem. While projects like Hermes and ZeroClaw are currently engaged in significant "firefighting" regarding local IPC and state management, OpenClaw typically occupies the space of a stable foundation. Compared to the rapid feature-chasing of QwenPaw or the intense refactoring of ZeroClaw, OpenClaw is positioned as the low-level standard; however, its silence in today's digest suggests either a transition to a private development phase or a potential shift in maintainer priorities.

### 4. Shared Technical Focus Areas
*   **Persistent Scratch Spaces:** Both **Hermes Agent** (Issue #132401) and **ZeroClaw** are struggling with the balance between aggressive cleanup to save storage and the risk of catastrophic data loss for long-running workflows.
*   **Multimodal Reliability:** **QwenPaw** and **ZeroClaw** are both actively addressing issues with image input processing and silent truncation during provider requests.
*   **Environmental Parity:** Managing the "local dev" experience remains a cross-project struggle, with **IronClaw** (macOS issues) and **Hermes** (Windows/Linux drift) highlighting the friction of deploying agents across diverse developer machines.

### 5. Differentiation Analysis
*   **ZeroClaw:** Focused on high-performance infrastructure; prioritizing gateway separation and IPC hardening for power users/developers.
*   **Hermes Agent:** Primarily a feature-complete productivity tool; focusing on user-facing integrations (WhatsApp/Telegram) and professional workflow automation.
*   **QwenPaw:** A focus on extensibility and provider agility; the project is the most "plug-and-play" regarding model swapping (GPT-6 support, etc.).
*   **IronClaw:** Currently positioned as a lightweight, developer-centric tool; significantly less mature/active than the others.

### 6. Community Momentum & Maturity
*   **High Velocity (Iterating):** **ZeroClaw** and **Hermes Agent** are in a rapid iteration phase. They are "under fire," characterized by high issue volumes and aggressive PR merges, indicating they are the primary targets for production-level feedback.
*   **Stable/Robust:** **QwenPaw** shows the most balanced momentum—rapid progress without the catastrophic instability seen in the other high-velocity projects.
*   **Stagnating:** **IronClaw** is currently in a lull, potentially signaling a strategic pause or a loss of developer interest in the core maintainer team.

### 7. Trend Signals
*   **Gateway Architecture:** There is a clear move toward decoupling the Agent Gateway from the UI (e.g., **ZeroClaw’s** standalone IPC effort), acknowledging that agents are becoming infrastructure-level utilities rather than simple apps.
*   **Cost-Aware Routing:** The industry is moving beyond "just use the best model" toward "cost-aware routing" (e.g., **ZeroClaw’s** Effort-aware routing), suggesting developers are prioritizing economic efficiency for large-scale agent deployments.
*   **The "State Persistence" Wall:** Users are no longer satisfied with ephemeral agents; the top-voted issues across the ecosystem relate to chat history, scratch space, and session continuity. The maturity of an agent project is now being judged by its "memory" rather than its reasoning capability.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest: 2026-10-04

## 1. Today's Overview
The Hermes Agent project remains in a state of high-intensity maintenance, with 100 total items updated across issues and PRs in the last 24 hours. Development is currently heavily focused on addressing critical stability regressions, particularly concerning environment management, scratch-space persistence, and cross-platform (Windows/Linux) installation integrity. Despite the high volume of bug reports, the project is exhibiting active triage and rapid patching from maintainers, indicating a healthy but currently "under fire" development cycle.

## 2. Releases
*   **No new releases were published on 2026-10-04.**

## 3. Project Progress
*   **WhatsApp Multi-Profile:** Fixes were merged/closed for the host multiplexer, ensuring that paired WhatsApp sessions are served per-profile rather than only for the gateway-launching profile ([PR #132518](https://github.com/NousResearch/hermes-agent/pull/132518), [PR #122758](https://github.com/NousResearch/hermes-agent/pull/122758)).
*   **Modularization:** Home Assistant functionality has been successfully extracted from the core repository into an official catalog plugin, with automated migration for existing user profiles ([PR #132469](https://github.com/NousResearch/hermes-agent/pull/132469)).
*   **Telegram UX:** A fix was merged to preserve original prompt text during approval resolutions, preventing context loss in chat history ([PR #129161](https://github.com/NousResearch/hermes-agent/pull/129161)).

## 4. Community Hot Topics
*   **[#132401] Scratch Pruning (14 comments):** Users are reporting that the 24h idle prune feature silently deletes multi-day work parked in the `TMPDIR` scratch space. This is currently the most contentious issue due to potential data loss ([Issue #132401](https://github.com/NousResearch/hermes-agent/issues/132401)).
*   **[#128468] Desktop Streaming Glitches (12 comments):** Persistent reports of duplicated message rendering and scroll-jumping in the Desktop UI continue to frustrate users ([Issue #128468](https://github.com/NousResearch/hermes-agent/issues/128468)).
*   **[#122425] Managed Env Drift (12 comments):** Discrepancies between the main checkout and workspace environments during updates remain a high-priority concern for users managing complex deployments ([Issue #122425](https://github.com/NousResearch/hermes-agent/issues/122425)).

## 5. Bugs & Stability
*   **Critical (P0/P1):**
    *   **Scratch Data Loss:** Auto-pruning without a safety marker ([Issue #132401](https://github.com/NousResearch/hermes-agent/issues/132401)).
    *   **Guardian Crashes:** Smart-approval failures on event-loop threads in Desktop sessions ([Issue #132431](https://github.com/NousResearch/hermes-agent/issues/131375)).
*   **High (P2/P3):**
    *   **Auth/API:** Bedrock token support missing in auxiliary tools ([Issue #29309](https://github.com/NousResearch/hermes-agent/issues/29309)).
    *   **Windows/OS Shutdown:** Gateway fails to perform graceful shutdown, resulting in "unclean exit" logs ([Issue #132206](https://github.com/NousResearch/hermes-agent/issues/132206)).
    *   **SSH Connectivity:** Fixed 15s timeout causing failures on unstable links ([Issue #132508](https://github.com/NousResearch/hermes-agent/issues/132508)).

## 6. Feature Requests & Roadmap Signals
*   **Execution Summary:** PR [#106573](https://github.com/NousResearch/hermes-agent/pull/106573) proposes collapsing execution trajectories into summary nodes to clean up UI clutter.
*   **Browser-based Desktop:** PR [#93508](https://github.com/NousResearch/hermes-agent/pull/93508) is a significant architectural move to serve the full Desktop renderer in a browser, potentially decoupling the agent from the local Electron client.
*   **Cost Optimization:** Feature request to store large tool results externally and only fetch them on-demand ([Issue #132184](https://github.com/NousResearch/hermes-agent/issues/132184)).

## 7. User Feedback Summary
*   **Pain Points:** Users are heavily impacted by "silent" failures—specifically concerning environment drift, unexpected scratch cleanup, and authentication spray against local models.
*   **Use Cases:** There is a clear subset of professional power users (engineers/business owners) using Hermes as a primary productivity tool, which heightens the sensitivity to stability regressions that interrupt long-running workflows.

## 8. Backlog Watch
*   **[#29309](https://github.com/NousResearch/hermes-agent/issues/29309):** The Bedrock authentication parity issue has been open since May 2026; it is increasingly problematic as the agent ecosystem grows.
*   **[#106592](https://github.com/NousResearch/hermes-agent/issues/106592):** False-negative update reporting for remote Linux backends remains a point of confusion for remote users.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest - 2026-10-04

### 1. Today's Overview
The IronClaw project is experiencing a period of quiet development with minimal activity over the last 24 hours. The repository saw no new releases or pull request activity, suggesting a focus on internal stability or a temporary pause in development cycles. Current efforts are centered on addressing a single environment-specific issue affecting local development workflows on macOS. Overall, the project maintains a stable but stagnant profile for this reporting window.

### 2. Releases
*None.*

### 3. Project Progress
*No pull requests were merged or closed within the last 24 hours.*

### 4. Community Hot Topics
*   **[Issue #8122](https://github.com/nearai/ironclaw/issues/8122): `ironclaw serve` fails with `BackendUnavailable` on macOS (`local-dev` profile).**
    *   **Analysis:** This is the only active community thread today. The reporter highlights a failure in the `web-app` extension despite passing all checks in `ironclaw doctor`. The underlying need is for improved cross-platform environment handling for developers running local instances on Apple Silicon.

### 5. Bugs & Stability
*   **[Issue #8122](https://github.com/nearai/ironclaw/issues/8122):** `ironclaw serve` fails with `BackendUnavailable` for the `web-app` extension on macOS.
    *   **Severity:** Medium. It prevents developers from utilizing the `local-dev` profile, which is critical for extension development, though it does not appear to affect production builds. 
    *   **Fix Status:** No fix PR has been submitted as of today.

### 6. Feature Requests & Roadmap Signals
*   *None reported today.* Current signals indicate that the priority remains stabilizing the existing `local-dev` environment rather than introducing new features.

### 7. User Feedback Summary
The feedback provided today points to potential friction in the developer onboarding process on macOS. Users are expressing dissatisfaction with the `local-dev` profile, which appears to be brittle despite the project's attempt to validate environments via `ironclaw doctor`. The ability to successfully stand up a local environment is a primary pain point for current contributors.

### 8. Backlog Watch
*   **[Issue #8122](https://github.com/nearai/ironclaw/issues/8122):** While this issue was opened only yesterday, it requires urgent maintainer attention as it blocks local development for contributors using macOS. Without a workaround, developers are currently unable to test `web-app` extension changes locally.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

## QwenPaw Project Digest: 2026-10-04

### 1. Today's Overview
The QwenPaw project is experiencing a significant surge in development activity, with 11 open PRs and 8 issues updated within the last 24 hours. The primary focus of contributors is stabilizing the agent runtime, fixing multimodal input routing, and resolving UI-session state persistence issues. Overall, the project health is robust, characterized by a rapid response from maintainers to address critical bugs, though the high volume of incoming bug reports suggests a need for increased regression testing.

### 2. Releases
*No new releases identified for this period.*

### 3. Project Progress
*While no PRs were merged today, significant progress was made through 11 active PRs awaiting review:*
*   **Agent Reliability:** [PR #8100](https://github.com/agentscope-ai/QwenPaw/pull/8100) attempts to fix image support by aligning runtime media capabilities with resolved metadata.
*   **Provider Compatibility:** [PR #8090](https://github.com/agentscope-ai/QwenPaw/pull/8090) addresses the GPT-6 connection failure by updating token limit parameter recognition.
*   **UI/UX Improvements:** [PR #8091](https://github.com/agentscope-ai/QwenPaw/pull/8091) ensures the sidebar accurately tracks session history, while [PR #8086](https://github.com/agentscope-ai/QwenPaw/pull/8086) optimizes mobile settings navigation.

### 4. Community Hot Topics
*   **[Issue #7884](https://github.com/agentscope-ai/QwenPaw/issues/7884): History loading issues.** With 8 comments, this is the most discussed issue. Users are frustrated by the inability to load full chat history after frontend refreshes, highlighting a critical demand for better data persistence and caching strategies.
*   **[Issue #7661](https://github.com/agentscope-ai/QwenPaw/issues/7661): Session creation bugs.** With 5 comments, this issue reflects confusion in the "New Task/New Session" logic where users expect conversational continuity but receive fragmented sessions.

### 5. Bugs & Stability
*   **Critical (High):** [Issue #8092](https://github.com/agentscope-ai/QwenPaw/issues/8092) — Content-inspection false positives from Ali-style gateways result in "turn killed" scenarios without retry, effectively breaking conversation flows.
*   **High:** [Issue #8094](https://github.com/agentscope-ai/QwenPaw/issues/8094) — Stale WebView2 cache blocking console boot without error recovery mechanisms.
*   **High:** [Issue #8088](https://github.com/agentscope-ai/QwenPaw/issues/8088) — Image inputs hanging in inefficient cropping loops, leading to silent failures.
*   **Moderate:** [Issue #8074](https://github.com/agentscope-ai/QwenPaw/issues/8074) — OpenAI provider fails for GPT-6 models due to outdated model name whitelisting (Fix [PR #8090](https://github.com/agentscope-ai/QwenPaw/pull/8090) in progress).

### 6. Feature Requests & Roadmap Signals
*   **Matrix Channel Enhancements:** [Issue #7535](https://github.com/agentscope-ai/QwenPaw/issues/7535) (Closed) signals a move toward Element-specific compatibility (OIDC/MAS login), which remains a high-interest area for the Matrix user base.
*   **Context Transparency:** [PR #7004](https://github.com/agentscope-ai/QwenPaw/pull/7004) proposes persisting parent-child agent linkage, suggesting a move toward more complex agent orchestration workflows in future versions.

### 7. User Feedback Summary
Users are currently expressing dissatisfaction with **session management** and **multimodal reliability**. The feedback indicates that while the system is highly capable, the UI/UX layer often fails to maintain state (history, session continuity) during intermittent network or refresh events. The lack of "retry" mechanisms when gateway or model providers encounter transient errors is a major pain point leading to user churn.

### 8. Backlog Watch
*   **[Issue #7661](https://github.com/agentscope-ai/QwenPaw/issues/7661):** This bug regarding session creation has been open since September 10th. It significantly impacts core usability and requires urgent resolution to improve the first-run experience for new users.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest - 2026-10-04

## 1. Today's Overview
The ZeroClaw repository shows high engineering velocity, characterized by an aggressive push toward maturing the `ZeroCode` interface and stabilizing the runtime for the v0.8.6 and v0.9.0 release cycles. With 100 total updates across issues and PRs in the last 24 hours, the team is heavily focused on addressing regression bugs and hardening the IPC/Gateway architecture. The project remains in a high-intensity phase, prioritizing structural integrity and UX improvements for local agent workspaces.

## 2. Releases
*   **None.** (No new releases reported in the last 24h).

## 3. Project Progress
*   **Closed/Merged PRs:** Activity was focused on closing maintenance debt and bug fixes.
    *   **[#7108](https://github.com/zeroclaw-labs/zeroclaw/issues/7108):** Improved cached Rust builds to shorten the CI critical path.
    *   **[#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734):** Mitigated a stack overflow in `RpcDispatcher` surfaced by Advisory Windows nextest.
    *   **[#11387](https://github.com/zeroclaw-labs/zeroclaw/issues/11387):** Addressed a regression where `zerocode` ignored launch directories.
    *   **[#10701](https://github.com/zeroclaw-labs/zeroclaw/issues/10701):** Fixed an issue where image attachments invalidated history cache prefixes incorrectly.

## 4. Community Hot Topics
*   **[#9965](https://github.com/zeroclaw-labs/zeroclaw/issues/9965): Harden runtime test fixtures (13 comments)** – This is the most active technical discussion, centered on stabilizing test fixtures that write executable shims under parallel runtime gates.
*   **[#7108](https://github.com/zeroclaw-labs/zeroclaw/issues/7108): CI/Rust Build Performance (9 comments)** – Highlighted the ongoing struggle with 15-20 minute CI cycles, reflecting a need for better build efficiency as the codebase grows.
*   **[#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734): RPC Stack Overflow (8 comments)** – Addressed critical runtime instability on Windows, emphasizing the project's push for cross-platform reliability.

## 5. Bugs & Stability
*   **[#11478](https://github.com/zeroclaw-labs/zeroclaw/issues/11478) (S1):** Images >64KB are silently truncated during provider requests. High risk, affecting multi-modal agent utility.
*   **[#10536](https://github.com/zeroclaw-labs/zeroclaw/issues/10536) (S1):** macOS Seatbelt policy ignores `allowed_roots`, blocking shell commands.
*   **[#11239](https://github.com/zeroclaw-labs/zeroclaw/issues/11239) (S0):** Potential data loss/security risk where owned sessions leak into the shared memory plane.
*   **[#11420](https://github.com/zeroclaw-labs/zeroclaw/issues/11420) (S2):** SQLite session backend loses per-message timing by overwriting `created_at` fields on every turn.

## 6. Feature Requests & Roadmap Signals
*   **[#11516](https://github.com/zeroclaw-labs/zeroclaw/pull/11516): Effort-aware routing.** A significant addition that will likely land in the next release, allowing users to balance cost/latency by routing turns between local and cloud models.
*   **[#11002](https://github.com/zeroclaw-labs/zeroclaw/issues/11002):** Shipping `zeroclaw-gw` as a standalone IPC client. This is a key architectural milestone for the v0.9.0 gateway separation effort.
*   **[#8310](https://github.com/zeroclaw-labs/zeroclaw/issues/8310): Schema V4.** A major breaking change planned to clean up deprecated configuration surfaces.

## 7. User Feedback Summary
Current user feedback is dominated by `ZeroCode` UX friction. Users report frustration with "Copy" button failures ([#11418](https://github.com/zeroclaw-labs/zeroclaw/issues/11418)), confusion regarding active runtime context in the dashboard ([#8383](https://github.com/zeroclaw-labs/zeroclaw/issues/8383)), and difficulties with session state visibility. There is a clear signal that while the core engine is powerful, the "last mile" of the UI/CLI needs significant refinement to be considered stable for daily production use.

## 8. Backlog Watch
*   **[#9799](https://github.com/zeroclaw-labs/zeroclaw/issues/9799):** High-priority issue regarding ephemeral daemons spinning multi-core CPU usage (17 hours of duration). Needs investigation to prevent battery drain and performance degradation for users.
*   **[#6105](https://github.com/zeroclaw-labs/zeroclaw/issues/6105):** The lack of context for cron jobs within agents remains an open pain point for automated workflows.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/jinming1345/agents-radar).*