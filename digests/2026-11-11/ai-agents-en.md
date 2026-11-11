# OpenClaw Ecosystem Digest 2026-11-11

> Issues: 99 | PRs: 500 | Projects covered: 5 | Generated: 2026-11-11 01:34 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest - 2026-11-11

## 1. Today's Overview
The OpenClaw repository is experiencing a period of intense maintenance and stability refinement, with 99 active issue updates and 500 PR updates in the last 24 hours. Development effort is heavily concentrated on resolving session-state inconsistencies, CLI/Gateway synchronization, and regressions introduced in recent beta cycles. Overall project health remains focused on "stabilization mode," with a high volume of minor fixes aimed at UX friction and reliability in multi-provider environments.

## 2. Releases
*   **[v2026.11.3](https://github.com/openclaw/openclaw/releases/tag/v2026.11.3):** Focused on privacy and reliability. It introduces mechanisms to exclude private subagent completions from chat streams (#188490) and improves child-task cancellation logic to ensure clean handoffs.
*   **[v2026.9.37](https://github.com/openclaw/openclaw/releases/tag/v2026.9.37):** A "gateway-only" extended-stable maintenance release. It provides backported critical security and performance fixes for older installations that are not yet ready for the 2026.11.x branch.

## 3. Project Progress
Today’s progress is defined by rapid iterative patches for the Web UI and Gateway synchronization. Key merged/closed activity includes:
*   **Memory Wiki:** [PR #196728](https://github.com/openclaw/openclaw/pull/196728) fixed literal title rendering issues.
*   **Diagnostic & Recovery:** [PR #196465](https://github.com/openclaw/openclaw/pull/196465) improves the doctor's ability to surface agent-dir read failures.
*   **UI Stability:** Several PRs ([#196464](https://github.com/openclaw/openclaw/pull/196464), [#196458](https://github.com/openclaw/openclaw/pull/196458)) addressed cosmetic and state-cleanup issues in the sidebar and agent exec runs.

## 4. Community Hot Topics
*   **[#193962](https://github.com/openclaw/openclaw/issues/193962):** SQLite header-probe timeout issues (26 comments). Users are struggling with update failures on older versions where the new header-probe logic hits ETIMEDOUT.
*   **[#123792](https://github.com/openclaw/openclaw/issues/123792):** CLI backend rendering duplication (18 comments). A persistent UX friction point where assistant turns display both a live block and an aggregate record.
*   **[#154572](https://github.com/openclaw/openclaw/issues/154572):** `SessionTranscriptWriterClaimReboundError` (16 comments). Critical for users relying on `claude-cli` runtimes; highlights fragile session handoffs.

## 5. Bugs & Stability
*   **Critical (P0/Regression):** 
    *   [#190563](https://github.com/openclaw/openclaw/issues/190563) - Cannot resume paused Codex chat; provider review/thread mismatch.
    *   [#174681](https://github.com/openclaw/openclaw/issues/174681) - Plugin preparation causing minutes-long Gateway stalls.
    *   [#196799](https://github.com/openclaw/openclaw/issues/196799) - Linux AppImage webkit incompatibility (Control UI rejection).
*   **Crash-loop:** [#181120](https://github.com/openclaw/openclaw/issues/181120) (macOS Gateway hangs on `MessagePort` closure).
*   **Status:** Many of these have associated reproduction labels (`clawsweeper:source-repro`), but several P0 issues are currently flagged as release-blockers, suggesting a potential hold on the next stable release.

## 6. Feature Requests & Roadmap Signals
*   **Automation:** [Issue #192009](https://github.com/openclaw/openclaw/issues/192009) requests explicit cross-provider cron fallback authorization, signaling a need for more robust production automation management.
*   **Telemetry:** [Issue #196279](https://github.com/openclaw/openclaw/issues/196279) asks for `sessionKey` and `agentId` inclusion in diagnostic events to aid plugin developers in tracing usage.
*   **Predictions:** Expect future releases to prioritize "Self-Healing" features (e.g., `matrix doctor` enhancements) and enhanced granular control over Git co-authorship.

## 7. User Feedback Summary
Users are currently frustrated by "update loops" (failed migrations) and inconsistencies in the Web UI/Control surface. There is a strong signal that while the core agent logic is powerful, the infrastructure (Gateway startup, SQLite database management, and plugin auth) is becoming brittle at scale, especially for those running multiple persistent sessions or using CLI-based backends.

## 8. Backlog Watch
*   **[#112638](https://github.com/openclaw/openclaw/issues/112638):** Long-standing (July 2026) issue regarding session maintenance not enforcing memory/disk bounds. This represents a significant risk for long-term server stability and remains in need of a product decision.
*   **[#57278](https://github.com/openclaw/openclaw/issues/57278):** Telegram bot-photo attribution/hydration issues; a lingering UX annoyance that has seen little progress since March.

---

## Cross-Ecosystem Comparison

# Cross-Project Analysis: Personal AI Agent Ecosystem (2026-11-11)

### 1. Ecosystem Overview
The open-source AI agent ecosystem is currently transitioning from a phase of "feature exploration" to "enterprise hardening and reliability." Projects are struggling to balance rapid plugin-driven extensibility with the need for stable, long-running agent state management. There is a clear industry trend toward standardizing security (OIDC/PKCE), improving observability, and managing the technical debt inherent in complex, multi-provider agent runtimes.

### 2. Activity Comparison
| Project | Recent Activity (PRs/Issues) | Release Status | Health/Status |
| :--- | :--- | :--- | :--- |
| **OpenClaw** | 500 PRs / 99 Issues | v2026.11.3 (Stable) | Stabilization Mode |
| **Hermes Agent** | 50 PRs / (Active) | v0.23.1 (Major) | High-Velocity/Expansive |
| **QwenPaw** | 38 PRs / 13 Issues | v2.3.0-beta.4 | Beta Pressure |
| **ZeroClaw** | 50 PRs / (Active) | Staging v0.9.0 | Maturing |
| **IronClaw** | 0 | None | Inactive |

### 3. OpenClaw's Position
OpenClaw acts as the "Standard-Bearer" of the ecosystem, currently prioritizing reliability over feature velocity.
*   **Advantages:** Mature, backported stability (via v2026.9.37), and strong diagnostic tools ("doctor" features).
*   **Technical Approach:** Emphasizes gateway/CLI synchronization and session-state persistence, though this leads to high architectural brittleness.
*   **Community Scale:** Significantly higher churn than peers (500 PRs/day), suggesting it maintains the largest contributor base and potentially the most complex codebase.

### 4. Shared Technical Focus Areas
*   **Plugin/Runtime Isolation:** Hermes and QwenPaw are both struggling with the "process isolation" problem—ensuring plugins don't corrupt the core gateway state or crypto stores (e.g., Hermes Matrix E2EE issues, QwenPaw channel race conditions).
*   **Authentication Hardening:** Both ZeroClaw and QwenPaw are moving toward enterprise-grade auth (OIDC, PKCE, remote account/password logins) to support non-browser/server environments.
*   **Observability:** Users across OpenClaw, QwenPaw, and ZeroClaw are demanding better insight into "internal state," specifically regarding credit usage, reasoning model parameters (e.g., `thinking_param_style`), and task progress.

### 5. Differentiation Analysis
*   **OpenClaw:** Prioritizes multi-provider management and "self-healing" infrastructure.
*   **Hermes Agent:** The "Modular Extender." Focuses on a rich plugin catalog and hackathon-driven innovation.
*   **QwenPaw:** Focuses on regional/localized model support (Aliyun/local MLX) and desktop channel integration.
*   **ZeroClaw:** Focuses on "Enterprise-Ready Integration" and secure transport protocols (XMPP/OMEMO).

### 6. Community Momentum & Maturity
*   **High Velocity (Rapid Iteration):** **Hermes Agent** is leading on innovation and plugin breadth, while **QwenPaw** is aggressively pushing toward `v2.3.0` stability.
*   **Stabilizing/Maturing:** **OpenClaw** has entered a high-maintenance "stabilization mode," likely due to its role as a core reference implementation. **ZeroClaw** is at a critical inflection point, moving from experimental releases to a standardized `0.9.x` architecture.
*   **Stagnant:** **IronClaw** currently shows no movement, suggesting a potential project abandonment or transition to an internal-only roadmap.

### 7. Trend Signals
1.  **Beta Fatigue:** Users are showing signs of frustration with "perpetual beta" cycles that cause regression in core file handling and installation flows (seen in QwenPaw and OpenClaw).
2.  **Plugin-as-a-Platform:** The shift from hard-coded features to "plugin-injected turns" (Hermes) confirms that the ecosystem is moving away from monolithic agent builds toward a highly modular, contributor-friendly architecture.
3.  **Governance & Transparency:** There is rising demand for cost/budget monitoring and explicit control over AI reasoning models, signaling that these tools are increasingly being deployed in professional, budget-constrained environments.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest: 2026-11-11

### 1. Today's Overview
The Hermes Agent project remains in a state of high-velocity development, characterized by intense activity in the plugin ecosystem and ongoing hardening of the core gateway. With 50 PRs updated and a significant release (v0.23.1) freshly deployed, the maintainer focus is clearly split between stabilization of distributed agent operations and rapid expansion of the `plugin-catalog`. Overall project health is strong, showing robust community participation in the plugin hackathon and proactive security maintenance.

### 2. Releases
*   **[v0.23.1](https://github.com/nousresearch/hermes-agent/releases/tag/v0.23.1):** A massive rollup release containing approximately 618 PRs accumulated since v0.23.0. This release stabilizes the CLI, Microsoft Store app, Docker images, and Hermes Cloud. Detailed notes are deferred to the upcoming v0.24.0.

### 3. Project Progress
Activity today centered on the expansion of the plugin ecosystem and performance optimizations:
*   **Plugin Catalog Expansion:** A surge of new plugins added to the catalog, including [Aftercare](https://github.com/nousresearch/hermes-agent/pull/152750), [Teach-Back](https://github.com/nousresearch/hermes-agent/pull/152749), and [Atlas](https://github.com/nousresearch/hermes-agent/pull/152746).
*   **UI/UX Performance:** [Merged #129918](https://github.com/nousresearch/hermes-agent/pull/129918) and [#129928](https://github.com/nousresearch/hermes-agent/pull/129928) significantly improved TUI efficiency by deferring tool-charm polling and pausing background timers for collapsed dock elements.
*   **Hackathon Momentum:** Continued updates to existing hackathon entries, such as [Tablekeeper (v0.3.0)](https://github.com/nousresearch/hermes-agent/pull/152752).

### 4. Community Hot Topics
*   **[PR #146732](https://github.com/nousresearch/hermes-agent/pull/146732):** *feat(plugins): session forks*. This is a critical architectural shift allowing plugins to borrow core background patterns. It indicates a community need for more native-feeling, high-performance plugin capabilities.
*   **[PR #148266](https://github.com/nousresearch/hermes-agent/pull/148266):** *fix(gateway): plugin-injected turns*. Focuses on ensuring plugin interactions remain "clean" and yield control back to the human, addressing potential usability friction in autonomous loops.

### 5. Bugs & Stability
*   **[Issue #141208](https://github.com/nousresearch/hermes-agent/issues/141208) (P2):** Matrix E2EE conflict. Running `hermes send` outside the gateway process corrupts crypto stores; severe impact for users relying on secure messaging.
*   **[Issue #101514](https://github.com/nousresearch/hermes-agent/issues/101514) (P2):** Profile session persistence. Sessions lose their link to profile models upon resuming from stored state.
*   **[Issue #127187](https://github.com/nousresearch/hermes-agent/issues/127187) (P2):** Cron job reliability. Confirmed potential for lost retryable rejections and duplicate executions.
*   **[Resolved Security Issue #90789](https://github.com/nousresearch/hermes-agent/issues/90789):** Fixed a bypass where background terminal commands could avoid the consent gate.

### 6. Feature Requests & Roadmap Signals
The high volume of catalog additions suggests the team is prioritizing **modular extensibility**.
*   **Roadmap Prediction:** Expect official documentation for `ctx.fork_session` and other plugin APIs to stabilize in v0.24.0, as these are currently marked experimental in open PRs.
*   **New Capabilities:** Integration of business intelligence tools ([#151651](https://github.com/nousresearch/hermes-agent/pull/151651)) and PDF form review ([#153038](https://github.com/nousresearch/hermes-agent/pull/153038)) shows a clear pivot toward "knowledge worker" specialized agents.

### 7. User Feedback Summary
Users are actively leveraging the extensibility of Hermes, specifically seeking tools that improve transparency ("Why" plugin) and verification ("Aftercare" plugin). While the core is stable, users dealing with complex multi-process setups (e.g., Matrix messaging, CLI tool execution) are hitting synchronization bugs, suggesting a need for tighter process-level isolation.

### 8. Backlog Watch
*   **[Issue #101514](https://github.com/nousresearch/hermes-agent/issues/101514):** Open since September. Given that profile-driven workflows are central to professional use, the fact that sessions lose their model-sync after resume is a significant friction point needing a fix.
*   **[Issue #141208](https://github.com/nousresearch/hermes-agent/issues/141208):** Represents a risk to the security model; requires priority intervention to prevent corrupted user databases.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest: 2026-11-11

## 1. Today's Overview
QwenPaw shows high velocity and robust maintenance activity as of November 11, 2026. The development cycle is heavily focused on stabilizing the `v2.3.0` beta releases, with 38 PRs and 13 issues updated within the last 24 hours. The community and maintainers are actively addressing critical regressions in desktop channel plugins, file handling, and authentication, indicating a healthy but pressured development phase leading up to a major stable release.

## 2. Releases
*   **[v2.3.0-beta.4](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.3.0-beta.4)**:
    *   **Fixes**: Corrects plugin dependency preservation during updates.
    *   **Stability**: Resolves channel startup interruptions caused by additive dependency installation failures.

## 3. Project Progress
*   **Plugin Stability**: [PR #8653](https://github.com/agents-ai/QwenPaw/pull/8653) and [PR #8659](https://github.com/agents-ai/QwenPaw/pull/8659) were merged, ensuring that packaged desktop builds correctly identify runtime environments and recover from interrupted plugin installations.
*   **Authentication**: [PR #8664](https://github.com/agents-ai/QwenPaw/pull/8664) added support for account/password login for remote/Docker deployments where browser-based callbacks are unavailable.
*   **QQ Channel**: [PR #8319](https://github.com/agents-ai/QwenPaw/pull/8319) improves message handling by supporting `GROUP_MESSAGE_CREATE` gateway events.

## 4. Community Hot Topics
*   **[Issue #7990](https://github.com/agents-ai/QwenPaw/issues/7990)**: Users are requesting explicit declarations for `thinking_param_style` for Aliyun Token Plan models. This highlights a clear need for better integration of reasoning models within the UI.
*   **[Issue #8650](https://github.com/agents-ai/QwenPaw/issues/8650)**: UI/UX concern regarding the visual consistency of "Thinking" blocks vs. Tool call cards. Users find the layout jitter distracting.
*   **[PR #8178](https://github.com/agents-ai/QwenPaw/issues/8178)**: Support for nested skill directories. This reflects a growing demand for organizing larger agent ecosystems as the project scales.

## 5. Bugs & Stability
*   **High Severity**: [Issue #8655](https://github.com/agents-ai/QwenPaw/issues/8655) reports that attachment paths are being truncated to the drive root in `v2.3.0` betas, breaking image loading. 
*   **Medium Severity**: [Issue #8669](https://github.com/agents-ai/QwenPaw/issues/8669) describes a race condition on desktop startup where channel plugins fail with `CHANNEL_NOT_CONNECTED`.
*   **UI/UX**: [Issue #8663](https://github.com/agents-ai/QwenPaw/issues/8663) notes that message-queue action buttons are broken specifically on Safari, indicating a potential cross-browser compatibility regression.
*   **Fixes Pending**: [PR #8662](https://github.com/agents-ai/QwenPaw/pull/8662) addresses [Issue #8661](https://github.com/agents-ai/QwenPaw/issues/8661) regarding broken file download links in the chat interface.

## 6. Feature Requests & Roadmap Signals
*   **Local Engine Controls**: [PRs #8648, #8647, #8649](https://github.com/agents-ai/QwenPaw/pull/8648) indicate an upcoming expansion of native local model support, specifically bringing managed MLX and llama.cpp GPU controls into the Console.
*   **Plugin Ecosystem**: [Issue #8656](https://github.com/agents-ai/QwenPaw/issues/8656) requests official support for Mistral provider plugins, suggesting that users are looking to diversify the model providers available beyond the standard set.

## 7. User Feedback Summary
Users are generally satisfied with the speed of bug fixes but are experiencing "beta fatigue" due to regressions in file handling and plugin startup in the `2.3.0` series. The request for better support for enterprise-grade deployments (remote auth, Aliyun Token Plan) highlights a shift toward professional usage of QwenPaw.

## 8. Backlog Watch
*   **[Issue #7990](https://github.com/agents-ai/QwenPaw/issues/7990)**: Open since September, this is critical for users of Aliyun's reasoning models.
*   **[PR #8426](https://github.com/agents-ai/QwenPaw/pull/8426)**: A massive architectural undertaking to extract third-party agents into plugins; progress here is vital for modularity but remains under review.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest - 2026-11-11

## 1. Today's Overview
ZeroClaw is currently in a state of high-velocity development, centered around the release cycle for v0.9.0. With 50 active PRs and a focus on stabilizing runtime behaviors and documentation, the project demonstrates strong maintenance health. The recent activity suggests a shift from experimental feature expansion to refining the core agent runtime, security policies, and user-facing web dashboard experiences.

## 2. Releases
*No new releases in the last 24 hours.* (Note: PR [#12377](https://github.com/zeroclaw-labs/zeroclaw/pull/12377) indicates that v0.9.0 is currently in the release staging phase).

## 3. Project Progress
Recent closures focus on technical debt and runtime reliability:
*   **Version Bump:** Prepared the workspace for the v0.9.0 release ([#12377](https://github.com/zeroclaw-labs/zeroclaw/pull/12377)).
*   **Runtime Fixes:** Resolved hard-coded temperature issues in the heartbeat and model-routing probe that previously caused incompatibility with certain LLM providers ([#12367](https://github.com/zeroclaw-labs/zeroclaw/pull/12367)).
*   **Documentation:** Completed several documentation updates detailing OIDC device certificate termination and PKCE implementation ([#12332](https://github.com/zeroclaw-labs/zeroclaw/pull/12332), [#12340](https://github.com/zeroclaw-labs/zeroclaw/pull/12340)).

## 4. Community Hot Topics
*Note: As PR comment counts were not exported, activity is inferred by PR complexity and "needs-maintainer-review" status.*
*   **[#11847](https://github.com/zeroclaw-labs/zeroclaw/pull/11847) (Native XMPP/OMEMO):** A significant architectural addition. The community is watching this for secure, decentralized messaging support.
*   **[#12269](https://github.com/zeroclaw-labs/zeroclaw/pull/12269) (Web Voice Controls):** High interest in the "paired-device voice settings" feature, which aims to make agent interaction more natural and localized.
*   **[#11869](https://github.com/zeroclaw-labs/zeroclaw/pull/11869) (SSH Transport Reuse):** Indicates a strong demand for efficiency in long-running agent tasks where persistent connection management is critical.

## 5. Bugs & Stability
*   **S2 - Degraded Behavior:** Heartbeat/Model-routing temperature hard-coding ([#12366](https://github.com/zeroclaw-labs/zeroclaw/issues/12366)) — **FIXED** by [#12367](https://github.com/zeroclaw-labs/zeroclaw/pull/12367).
*   **S2 - Degraded Behavior:** SEO/Canonical URL issues in documentation deployment ([#12325](https://github.com/zeroclaw-labs/zeroclaw/issues/12325)) — **CLOSED**.
*   **S3 - Minor:** Various documentation indexing and 404 behavior issues ([#12326](https://github.com/zeroclaw-labs/zeroclaw/issues/12326), [#12324](https://github.com/zeroclaw-labs/zeroclaw/issues/12324)) — **CLOSED**.

## 6. Feature Requests & Roadmap Signals
The roadmap is clearly trending toward **"Enterprise-Ready Integration"**:
*   **Dashboard Transparency:** Features like OpenRouter balance reporting ([#11845](https://github.com/zeroclaw-labs/zeroclaw/pull/11845)) suggest the project is catering to power users who require strict budget control over API usage.
*   **Security hardening:** Continued work on OIDC, PKCE, and secret management indicates a move toward higher security compliance in version 0.9.x.

## 7. User Feedback Summary
Current activity highlights a pain point regarding **observability**. Users want to know more about the "internal state" of the agent, specifically regarding credit balances, task progress, and voice/audio status. The influx of documentation PRs suggests that the complexity of the "ZeroCode" auth and connection flows has reached a point where manual updates are essential for user retention.

## 8. Backlog Watch
*   **[#11847](https://github.com/zeroclaw-labs/zeroclaw/pull/11847):** A high-risk, XL-sized PR that has been open since October 19. It likely requires extensive testing due to its scope (TLS, XMPP, OMEMO).
*   **[#11868](https://github.com/zeroclaw-labs/zeroclaw/pull/11868):** Core agent runtime logic fixing tool-call loops. This is critical for preventing infinite API cycles and needs high-priority review to ensure stability in the 0.9.0 release.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/jinming1345/agents-radar).*