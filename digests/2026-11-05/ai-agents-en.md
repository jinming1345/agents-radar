# OpenClaw Ecosystem Digest 2026-11-05

> Issues: 93 | PRs: 500 | Projects covered: 5 | Generated: 2026-11-05 01:29 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest – 2026-11-05

## 1. Today's Overview
OpenClaw is currently in a state of high-intensity maintenance and stabilization. With 93 active issues and a significant volume of 500 pull requests updated in the last 24 hours, the project is under pressure to resolve regressions introduced in recent releases. While the introduction of "Knowledge Scribes" and PostgreSQL-backed state signals healthy feature development, the core Gateway runtime is struggling with memory management and stability issues under high-concurrency workloads.

## 2. Releases
*   **[v2026.11.5-beta.1](https://github.com/openclaw/openclaw/releases/tag/v2026.11.5-beta.1):** 
    *   **Highlights:** Introduces **Knowledge Scribes** for first-class knowledge capture and cross-agent workflow persistence.
    *   **Architecture:** Adds a new **PostgreSQL-backed state** option for the data plane, providing an alternative to the existing SQLite-centric architecture.

## 3. Project Progress
*   **CI/CD Optimization:** Significant focus on CI pipeline efficiency, specifically skipping unchanged Markdown tests ([#193105](https://github.com/openclaw/openclaw/pull/193105)) and optimizing Vitest transform cache key preparation ([#193107](https://github.com/openclaw/openclaw/pull/193107)).
*   **UI/UX Refinement:** Progress on centering pinned agents in the Team sidebar ([#193101](https://github.com/openclaw/openclaw/pull/193101)) and addressing regression test failures regarding copy labels ([#193096](https://github.com/openclaw/openclaw/pull/193096)).
*   **Fixes:** Resolved issues with plugin initialization directory conflicts ([#193100](https://github.com/openclaw/openclaw/pull/193100)) and corrected logic for A2A routing ([#193102](https://github.com/openclaw/openclaw/pull/193102)).

## 4. Community Hot Topics
*   **[#160959](https://github.com/openclaw/openclaw/issues/160959): Gateway blocks for minutes on large plugins (70 comments).** This remains the most critical performance bottleneck, indicating that users with large dependency trees are unable to utilize the Gateway effectively.
*   **[#177656](https://github.com/openclaw/openclaw/issues/177656): Native host exec integrity admission errors (28 comments).** A high-severity issue for users on 2026.10.5, pointing to systemic failures in shared-state handling.
*   **[#150635](https://github.com/openclaw/openclaw/issues/150635): Dreaming deep phase memory management (24 comments).** Users are concerned that the 512-entry cap on short-term recall is actively breaking the agent's ability to promote knowledge, effectively stalling "dreaming" phases.

## 5. Bugs & Stability
*   **Critical (P0/P1):**
    *   [#160959](https://github.com/openclaw/openclaw/issues/160959): Startup block on large plugin dependency trees.
    *   [#193028](https://github.com/openclaw/openclaw/issues/193028): OOM kill on Linux at 5.5 GiB RSS after session reads.
    *   [#191847](https://github.com/openclaw/openclaw/issues/191847): SQLite worker OOM due to large session size.
*   **High (Regression/Auth):**
    *   [#161921](https://github.com/openclaw/openclaw/issues/161921): Circular dependency between plugin updates and `doctor --fix`.
    *   [#190307](https://github.com/openclaw/openclaw/issues/190307): Agents stuck in "degraded" state after restart.

## 6. Feature Requests & Roadmap Signals
*   **Cua Spaces Support:** Users are requesting integration with Cua Spaces via the WorkerProvider plugin contract ([#187774](https://github.com/openclaw/openclaw/issues/187774)).
*   **Agent Feedback Interpretation:** A push for native support for reaction-triggered agent turns (e.g., polling via emojis) without custom patching ([#17840](https://github.com/openclaw/openclaw/issues/17840)).
*   **Automation Transparency:** Increasing demand for live observation of running command automations in the Control UI ([#186888](https://github.com/openclaw/openclaw/pull/186888)).

## 7. User Feedback Summary
Users are currently frustrated by the instability following recent minor version upgrades (particularly the 2026.10.x series). The most vocal complaints center on "admission errors," memory growth outside the V8 heap, and "silent" failures where agents simply stop outputting data or become unresponsive without clear logs. There is a high request for better backporting of stability fixes to older stable branches.

## 8. Backlog Watch
*   [#17840](https://github.com/openclaw/openclaw/issues/17840): Feature request for reaction-triggered turns has been open since February 2026; requires a definitive product decision.
*   [#139586](https://github.com/openclaw/openclaw/issues/139586): Extending automation management to native macOS/Talk remains stale and needs maintainer review to proceed.

---

## Cross-Ecosystem Comparison

# Cross-Project Ecosystem Report: AI Agents & Personal Assistants (2026-11-05)

### 1. Ecosystem Overview
The open-source AI agent landscape is currently undergoing a "stabilization and security" phase, shifting focus from rapid feature expansion to the rigorous requirements of enterprise and multi-tenant production environments. While projects like **OpenClaw** and **ZeroClaw** are grappling with the architectural challenges of scaling memory and security, **Hermes Agent** and **QwenPaw** are concentrating on UX, cross-platform compatibility, and modular extensibility. The ecosystem is moving away from experimental hobbyist tools toward robust, state-persistent systems that require sophisticated orchestration and memory management.

### 2. Activity Comparison

| Project | Active Issues/PRs | Recent Activity | Release Status | Health Score* |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | ~593 | Extremely High | v2026.11.5-beta | Critical (Instability) |
| **Hermes Agent** | ~70 | High | None | High (Iterative) |
| **QwenPaw** | ~59 | High | v2.3.0b2 (Stable) | Moderate (Polishing) |
| **ZeroClaw** | ~50+ | High | v0.9.0 (Pre-release) | High (Security Focus) |
| **IronClaw** | 0 | Negligible | None | Stable (Lull) |

*\*Health Score is a subjective assessment based on current regression frequency and maintainer responsiveness.*

### 3. OpenClaw’s Position
OpenClaw remains the "heavyweight" reference architecture of the ecosystem, commanding the highest contributor activity but also suffering from the most significant technical debt.
*   **Advantages:** It provides the most feature-rich environment, including advanced "Knowledge Scribes" and PostgreSQL-backed state.
*   **Differentiation:** Unlike Hermes or QwenPaw, which focus on plugin UX and CLI flow, OpenClaw prioritizes complex, cross-agent workflow persistence. 
*   **Scale:** It is the only project managing issues at an "enterprise-scale" volume (500+ updates/day), though this volume currently correlates with high regression rates and OOM (Out of Memory) stability concerns that competitors have largely avoided.

### 4. Shared Technical Focus Areas
*   **Deterministic Session Management:** Both **QwenPaw** (#8532) and **ZeroClaw** (RFC #10526) are moving toward append-only session histories/state replay to fix corruption in long-running conversations.
*   **Memory Isolation:** Preventing cross-agent memory leakage or "session poisoning" is critical for **ZeroClaw** (PR #11266) and **OpenClaw** (Issue #150635).
*   **SQL-Backed State:** A clear migration away from flat files/SQLite-local to more robust databases (PostgreSQL) is emerging as a requirement for larger deployments (**OpenClaw**, **QwenPaw**).

### 5. Differentiation Analysis
*   **ZeroClaw (The Security Specialist):** Focuses exclusively on identity, principal-aware tool execution, and multi-tenant dashboard isolation.
*   **Hermes Agent (The Power-User CLI):** Focuses on "homelab" style setups, Vim-like efficiency, and rapid customization via third-party plugins.
*   **QwenPaw (The Enterprise Adaptor):** Focuses on real-world business messaging integration (DingTalk, Matrix) and platform-agnostic (NAS/Windows) reliability.
*   **IronClaw (The Minimalist):** Functions as a stable, low-maintenance utility, likely serving as a foundational library or dependency rather than a standalone agent platform.

### 6. Community Momentum & Maturity
*   **Rapidly Iterating:** **OpenClaw** and **ZeroClaw** are the current engines of the ecosystem; their progress sets the standard for enterprise-readiness and security.
*   **Stabilizing:** **QwenPaw** and **Hermes Agent** are in a "polishing" phase, refining the developer experience and handling specific runtime edge cases rather than overhauling core architectures.
*   **Lull:** **IronClaw** is currently stagnant, suggesting it has either reached a natural conclusion or is awaiting a major project refresh.

### 7. Trend Signals
*   **From Chat to Automation:** The demand for "Live observation of command automations" (OpenClaw) and "Reaction-triggered agent turns" signals a pivot from chatbots to *active agents* that function autonomously within OS environments.
*   **The "Enterprise Gap":** Users are attempting to move agents from single-user CLI environments to multi-user, web-accessible setups, causing significant friction. This represents the next growth frontier for these projects.
*   **"Silent Failure" Frustration:** Developers and users alike are tired of "internal errors" and generic logs. The community is demanding observability—they want to know *why* an agent rejected a prompt or stalled, rather than just knowing that it failed.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest: 2026-11-05

## 1. Today's Overview
The Hermes Agent project remains highly active with 70 combined active issues and PRs updated within the last 24 hours. Development is currently focused on hardening the gateway, improving UX for the Desktop and TUI interfaces, and addressing critical integration bugs involving model switching and authentication. Overall project velocity is high, characterized by a rapid response to regression reports and a steady stream of community-contributed plugins.

## 2. Releases
*None.*

## 3. Project Progress
*   **Refinement of Agent Logic:** PR [#148826](https://github.com/nousresearch/hermes-agent/pull/148826) introduced a critical fix for Anthropic refusal "session poisoning," allowing users to recover sessions via a new `/drop` command.
*   **Plugin Ecosystem Growth:** The community continues to expand functionality with new catalog submissions for [EventForge](https://github.com/nousresearch/hermes-agent/pull/149194) and a specialized [Fashion Design workspace](https://github.com/nousresearch/hermes-agent/pull/149193).
*   **Vim Integration:** CLI usability was enhanced with the addition of Space-leader shortcuts (PR [#148813](https://github.com/nousresearch/hermes-agent/pull/148813)) and improved multi-line composer behavior (PR [#148814](https://github.com/nousresearch/hermes-agent/pull/148814)).

## 4. Community Hot Topics
*   **Reflection Beam Model Switching:** PR [#149192](https://github.com/nousresearch/hermes-agent/pull/149192) addresses a recurring HTTP 400 error when switching models, indicating users are actively testing advanced reasoning models and running into state-synchronization hurdles.
*   **Hardening Production Environments:** Issue [#148843](https://github.com/nousresearch/hermes-agent/issues/148843) highlights a trend where power users in multi-profile homelab environments are bundling their own "production patch series" to address stability, signaling a need for more robust upstream support for complex setups.

## 5. Bugs & Stability
*   **High Severity:**
    *   [#149107](https://github.com/nousresearch/hermes-agent/issues/149107): A JSON schema parsing crash leads to silent fallback to suboptimal models.
    *   [#148852](https://github.com/nousresearch/hermes-agent/issues/148852): Inconsistent Azure/APIM authentication header propagation causing failures in diagnostic and metadata probes.
*   **Medium Severity:**
    *   [#147387](https://github.com/nousresearch/hermes-agent/issues/147387): WebSocket rejection in gated dashboard environments for Desktop users using token-mode.
    *   [#148849](https://github.com/nousresearch/hermes-agent/issues/148849): Metadata probes incorrectly inheriting system proxy settings, causing timeouts.

## 6. Feature Requests & Roadmap Signals
*   **Automatic Retry:** Users are requesting a feature to automatically retry chat turns that failed due to temporary quota limits once the limit resets ([#148836](https://github.com/nousresearch/hermes-agent/issues/148836)).
*   **Localization Maintenance:** With the introduction of the Russian dictionary and UI translation layers ([#148842](https://github.com/nousresearch/hermes-agent/issues/148842)), the roadmap will likely need to formalize a workflow for managing community translations for rapidly growing catalogs.

## 7. User Feedback Summary
Users are generally satisfied with the tool's versatility but are hitting "friction" in complex environments. Key pain points include:
*   **UX Gaps:** Desktop users are frustrated by the inability to edit queued prompts and the lack of visual feedback for Git changes in nested folders.
*   **Configuration Complexity:** The Gateway is occasionally flagging its own default configurations as errors, and the "Skills Hub" search/install consistency is causing confusion for CLI users.

## 8. Backlog Watch
*   [#148853](https://github.com/nousresearch/hermes-agent/issues/148853): Liveness-watchdog hard-exit failures. This is a critical stability issue that could leave zombie processes running in production environments; it requires immediate attention.
*   [#148835](https://github.com/nousresearch/hermes-agent/issues/148835): Security concern regarding pinned Git for Windows dependencies using compromised SSL certificates. This should be prioritized for the next patch cycle.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest – 2026-11-05

### 1. Today's Overview
The IronClaw project is currently in a state of low activity, with no new issues, releases, or merged pull requests reported within the last 24 hours. The primary development focus remains on routine dependency maintenance, as evidenced by a single automated pull request. Overall project velocity is quiet, suggesting a stable period or a temporary lull in active feature development as of this date.

### 2. Releases
*None.*

### 3. Project Progress
*No pull requests were merged or closed within the last 24 hours.*

### 4. Community Hot Topics
There are currently no active discussions, issues, or high-engagement pull requests. Community interaction is minimal, indicating a lack of pressing user concerns or urgent development debates at this time.

### 5. Bugs & Stability
There were no new bug reports or stability-related issues submitted in the last 24 hours. The project remains in a steady state, with no active regressions requiring immediate attention.

### 6. Feature Requests & Roadmap Signals
No new feature requests have been submitted. The current roadmap appears to be focused on technical debt and dependency management rather than new functional expansion. Based on current trends, future updates will likely continue to focus on infrastructure maintenance and library updates (such as the pending `zip` crate bump) rather than major UX or agent-capability changes.

### 7. User Feedback Summary
There is no fresh user feedback available to report. The silence from the community suggests that the current build of IronClaw is serving its base use case without triggering immediate bugs or requests for support.

### 8. Backlog Watch
The project backlog currently contains no open issues or long-unanswered items. The single outstanding PR is a routine dependency update:
*   [#8168](https://github.com/nearai/ironclaw/pull/8168): [dependencies, rust] chore(deps): bump zip from 8.6.0 to 9.0.5. 
    *   *Status:* Open; Awaiting maintainer review. This is a standard maintenance task to align with the latest `zip-rs` version.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest: 2026-11-05

## 1. Today's Overview
The QwenPaw project shows high development velocity with 50 PRs under active review and 9 issues touched in the last 24 hours. The community is heavily focused on stabilizing cross-platform deployments (Windows/NAS) and refining memory/tool-use capabilities for the v2.3.0b2 release cycle. While the high volume of open PRs suggests a busy maintainer team, the project remains in an active "polishing" phase rather than a major feature-freeze, targeting stability in complex runtime environments.

## 2. Releases
*   **No new releases** recorded in the last 24 hours. Current stable testing remains on `v2.3.0b2`.

## 3. Project Progress
*   **Desktop & Updates:** PR [#8575](https://github.com/agentscope-ai/QwenPaw/pull/8575) was merged to restrict auto-updates to stable versions, preventing users from accidentally pulling unstable pre-releases.
*   **Matrix Plugin:** PR [#8559](https://github.com/agentsleigh-ai/QwenPaw/pull/8559) was merged to bundle E2EE dependencies by default, simplifying the setup process for secure messaging.
*   **Memory Plugins:** Long-standing work on the [OpenViking memory plugin](https://github.com/agentscope-ai/QwenPaw/pull/7613) has concluded with a merge, expanding the project's memory backend options.

## 4. Community Hot Topics
*   **[Issue #8278](https://github.com/agentscope-ai/QwenPaw/issues/8278):** DingTalk message degradation. Users are frustrated that long messages (>3500 chars) revert to plain text, breaking Markdown tables. This highlights a clear need for a robust "message chunking" or "split-send" mechanism for enterprise channels.
*   **[PR #8532](https://github.com/agentscope-ai/QwenPaw/pull/8532):** Add append-only session storage. This is a critical architectural shift to handle long-running conversations more reliably by moving away from mutable snapshots to a SQLite-backed history.

## 5. Bugs & Stability
*   **High Severity (Critical):** [Issue #8565](https://github.com/agentscope-ai/QwenPaw/issues/8565) - Hub Local runtime fails to start on Windows due to AppContainer and architecture detection issues. 
*   **High Severity (Blocking):** [Issue #8581](https://github.com/agentscope-ai/QwenPaw/issues/8581) - `code` mode tool-calling failure. Any tool with a parameter named `name` crashes due to a collision between positional and keyword arguments. A simple fix (positional-only parameters) is identified but not yet merged.
*   **Moderate Severity:** [Issue #8579](https://github.com/agentscope-ai/QwenPaw/issues/8579) - Disabling a provider leaves stale agent configs, causing cryptic "Provider is disabled" errors without clear user feedback.

## 6. Feature Requests & Roadmap Signals
*   **Improved Notifications:** [Issue #8460](https://github.com/agentscope-ai/QwenPaw/issues/8460) (Closed/Feature) indicates demand for OS-level push notifications for pending approvals.
*   **Resource Management:** [PR #8574](https://github.com/agentscope-ai/QwenPaw/pull/8574) introduces optional memory limits for shell commands, signaling a shift toward more secure, sandboxed execution environments for agents.

## 7. User Feedback Summary
Users are currently pushing the boundaries of QwenPaw in specialized environments (e.g., fnOS NAS, Windows local hub). The feedback indicates that while the system is powerful, the "hidden" logic—such as silent message degradation or stale model configs after provider changes—creates a poor user experience. Users desire better error messaging that explains *why* a function failed rather than receiving generic "Internal Error" notices.

## 8. Backlog Watch
*   **[PR #8291](https://github.com/agentscope-ai/QwenPaw/pull/8291):** A first-time contributor fix regarding ReMe reranker API keys; this has been pending since October and is a "low hanging fruit" that would encourage new contributors.
*   **[PR #8234](https://github.com/agentscope-ai/QwenPaw/pull/8234):** Encoding fix (GBK/CP936 support). Given that QwenPaw has a significant user base in China, this fix for legacy file reading is critical and needs expedited review to prevent data loss in local file processing.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest: 2026-11-05

## 1. Today's Overview
ZeroClaw is currently in a state of high-intensity stabilization and security hardening as the team pushes toward the **v0.9.0** release. Activity is extremely high, with 50 PRs updated in the last 24 hours, focusing almost exclusively on multi-tenant security, session isolation, and administrative access control. While feature development continues, the primary project momentum is directed at ensuring that multi-user dashboard access and subagent delegation do not compromise internal memory or session privacy.

## 2. Releases
*   **No new releases.** (Note: v0.9.0 is the active release target for the majority of current high-priority PRs).

## 3. Project Progress
Today’s contributions focus on closing long-standing security gaps and implementing robust identity management:
*   [PR #12213](https://github.com/zeroclaw-labs/zeroclaw/pull/12213) (Merged): Fixed a critical issue where `gateway.pairing_dashboard` settings were ignored, finally enabling proper pairing code expiration.
*   [PR #11266](https://github.com/zeroclaw-labs/zeroclaw/pull/11266) (Merged): Resolved a major architectural flaw where `spawn_subagent` and pipelines could leak parent memory to children; subagents are now strictly scoped.
*   [PR #11220](https://github.com/zeroclaw-labs/zeroclaw/pull/11220) (Merged): Enforced administrator authority for SOP (Standard Operating Procedure) execution, a key milestone for secure enterprise deployments.
*   [PR #11230](https://github.com/zeroclaw-labs/zeroclaw/pull/11230) (Merged): Restricted sensitive session-data tools to administrator principals only.

## 4. Community Hot Topics
*   **[RFC #10526](https://github.com/zeroclaw-labs/zeroclaw/issue/10526):** Append-only session history. This was closed as accepted, signaling a major upcoming architectural shift toward deterministic state replay. 
*   **[PR #11986](https://github.com/zeroclaw-labs/zeroclaw/pull/11986):** Scoped dashboard chat. This is a massive "XL" PR that represents the final puzzle piece for allowing non-admin users to interact with agents via the web dashboard.

## 5. Bugs & Stability
*   **[Issue #12239](https://github.com/zeroclaw-labs/zeroclaw/issue/12239) (S0 - Security):** Owned sessions reaching shared memory plane. *Status: Fixed via PR #11266.*
*   **[Issue #12235](https://github.com/zeroclaw-labs/zeroclaw/issue/12235) (S2 - Degraded):** Delegated agents ignoring `native_tools`. *Status: Open.*
*   **[Issue #12228](https://github.com/zeroclaw-labs/zeroclaw/issue/12228) (S2 - Degraded):** Cron update command reports success but fails to actually reassign agents. *Status: Open.*
*   **[Issue #12227](https://github.com/zeroclaw-labs/zeroclaw/issue/12227) (S2 - Degraded):** Shell approval inconsistently triggers based on model-written arguments. *Status: Open.*
*   **[Issue #12236](https://github.com/zeroclaw-labs/zeroclaw/issue/12236) (S3 - Minor):** Cached HTTP client collisions in CI test runtimes. *Status: Open.*

## 6. Feature Requests & Roadmap Signals
*   **Zulip Channel Support:** [Issue #6437](https://github.com/zeroclaw-labs/zeroclaw/issue/6437) is currently in the "parking-lot." It is a highly requested feature for self-hosted operators, likely to be prioritized after v0.9.0 security work settles.
*   **Non-Admin Dashboard Chat:** [Issue #11984](https://github.com/zeroclaw-labs/zeroclaw/issue/11984) is tracking the user-facing side of the security PRs currently in progress; it is highly likely to reach stable release in v0.9.0.

## 7. User Feedback Summary
Current user sentiment reflects a focus on "enterprise-readiness." Users are reporting issues specifically related to the friction of moving from single-user CLI setups to multi-user, web-interfaced environments. There is a clear demand for granular access control, as evidenced by the high volume of security fixes regarding principal-aware tool execution and OIDC verification.

## 8. Backlog Watch
*   **[PR #11805](https://github.com/zeroclaw-labs/zeroclaw/pull/11805):** Windows named-pipe server verification. This has been awaiting maintainer review/rebasing since mid-October; it is a blocker for robust Windows adoption.
*   **[PR #9746](https://github.com/zeroclaw-labs/zeroclaw/pull/9746):** Per-agent ownership scoping. An "XL" PR that remains open despite its critical nature for security—it represents significant unfinished work in isolating Discord/Telegram data per agent.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/jinming1345/agents-radar).*