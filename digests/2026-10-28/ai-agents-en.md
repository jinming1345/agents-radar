# OpenClaw Ecosystem Digest 2026-10-28

> Issues: 156 | PRs: 500 | Projects covered: 5 | Generated: 2026-10-28 01:32 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest (2026-10-28)

## 1. Today's Overview
OpenClaw is currently in a state of high-intensity stabilization, characterized by a massive volume of engineering activity (500 PRs updated in 24 hours). The project is heavily focused on addressing critical reliability issues and "crash-loop" regressions across Windows and Linux environments, with significant efforts directed toward improving Gateway restart logic and state persistence. While feature development continues, the sheer number of open P0 and P1 issues suggests the project is prioritizing debt reduction and infrastructure hardening to support its recent "extended-stable" (LTS) push.

## 2. Releases
*   **[v2026.10.10-beta.4](https://github.com/openclaw/openclaw/releases/tag/v2026.10.10-beta.4):** Enhanced automation safety, preserving authenticated operator authority during scheduled follow-ups and `next_check` rearming.
*   **[v2026.10.8](https://github.com/openclaw/openclaw/releases/tag/v2026.10.8):** Improved resilience for post-update failures, ensuring Doctor failures restart the Gateway rather than halting it; fixed orphan maintenance worker blockages.
*   **[v2026.9.35](https://github.com/openclaw/openclaw/releases/tag/v2026.9.35):** An "extended-stable" (LTS) release providing critical security and performance patches for long-term stability.

## 3. Project Progress
Today's development is centered on refining core infrastructure:
*   **Security Fixes:** [#186417](https://github.com/openclaw/openclaw/pull/186417) closes a security vulnerability where webhooks/join-introductions were incorrectly running with elevated owner-only tools.
*   **Performance:** [#186421](https://github.com/openclaw/openclaw/pull/186421) reduces CPU/memory overhead in session-list publication; [#186415](https://github.com/openclaw/openclaw/pull/186415) optimizes Gateway restart times on node-backed workspaces.
*   **Resilience:** [#186411](https://github.com/openclaw/openclaw/pull/186411) fixes a race condition where update cleanup would fail its own destination verification.

## 4. Community Hot Topics
*   **[#119720](https://github.com/openclaw/openclaw/issues/119720): Synchronous agent persistence blocks the Gateway event loop.** This remains the top discussion item (25 comments), indicating significant architectural friction regarding scaling at the core data-layer level.
*   **[#170956](https://github.com/openclaw/openclaw/issues/170956): Windows startup/update reliability.** With 22 comments, this highlights a critical pain point for the Windows user base, specifically regarding permissions and plugin shutdown timing.
*   **[#157325](https://github.com/openclaw/openclaw/issues/157325): Stuck agent-DB resource.** Users are reporting total failure of agent replies on Windows server deployments, making this a top priority for UX-impacting bugs.

## 5. Bugs & Stability
*   **Critical (P0/Release Blockers):** 
    *   [#161921](https://github.com/openclaw/openclaw/issues/161921): Circular dependency between plugin updates and `doctor --fix`.
    *   [#167406](https://github.com/openclaw/openclaw/issues/167406): Windows MSIX Gateway event-loop starvation due to Codex plugin.
    *   [#185819](https://github.com/openclaw/openclaw/issues/185819): Windows Codex onboarding failure despite successful authorization.
*   **Regressions:** 
    *   [#169797](https://github.com/openclaw/openclaw/issues/169797): Severe memory usage and startup regression (2.5x–5x slower) on single-CPU hosts compared to 2026.9.4.

## 6. Feature Requests & Roadmap Signals
*   **Accessibility:** [#9637](https://github.com/openclaw/openclaw/issues/9637) (and corresponding PR [#185921](https://github.com/openclaw/openclaw/pull/185921)) to add a screen-reader mode for the TUI suggests an upcoming push for inclusivity.
*   **Mobile Inference:** [#166970](https://github.com/openclaw/openclaw/issues/166970) requesting foreground inference workers on iPad/iPhone.
*   **Skill Governance:** [#150250](https://github.com/openclaw/openclaw/issues/150250) regarding the "Skill Workshop" capability suggests future work on auditability and behavioral control.

## 7. User Feedback Summary
Users are currently expressing frustration regarding "brittle" update processes on Windows and Debian. There is a palpable dissatisfaction with the "Skill Workshop" feature, which users describe as a "deadly plague" due to unreviewed auto-mutations of agent behavior ([#184600](https://github.com/openclaw/openclaw/issues/184600)). Performance on lower-end/single-CPU hardware is currently a pain point following recent releases.

## 8. Backlog Watch
*   **[#121232](https://github.com/openclaw/openclaw/issues/121232):** Long-standing (August) issue regarding `memory-core` ranker/applier disagreement.
*   **[#121572](https://github.com/openclaw/openclaw/issues/121572):** Unbounded memory growth in the browser plugin; remains unaddressed for nearly three months.
*   **[#121823](https://github.com/openclaw/openclaw/issues/121823):** "Memory Dreaming Promotion" continues to park the event loop on native file systems, despite the critical nature of the blockage.

---

## Cross-Ecosystem Comparison

### Ecosystem Overview: 2026-10-28
The open-source AI agent ecosystem is currently undergoing a "stabilization crunch." Following a period of aggressive feature expansion, major projects (OpenClaw, Hermes, QwenPaw, ZeroClaw) are now pivoting toward hardening their core architectures, addressing persistent cross-platform reliability issues, and managing significant technical debt. The shift from "experimental agent capability" to "reliable desktop-class software" is driving heavy investment in gateway management, event-loop optimization, and robust local persistence layers.

### Activity Comparison

| Project | Active Issues | PR Activity (24h) | Recent Release | Health Score |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | High (P0/P1) | 500+ (High) | v2026.10.10-beta.4 | Developing (Unstable) |
| **Hermes** | 17 | 50 | N/A | Robust |
| **QwenPaw** | 18 | 50 | v2.3.0-beta.1 | Robust |
| **ZeroClaw** | High (Critical) | 42 | v0.8.7 | Maturing |
| **IronClaw** | 0 | 0 | N/A | Stagnant |

### OpenClaw's Position
*   **Advantages:** OpenClaw maintains the most aggressive development pace in the ecosystem, acting as the de-facto "core reference." Its push for an LTS (extended-stable) version signals a maturity phase that other projects are only just beginning to contemplate.
*   **Technical Approach:** Unlike the more "web-app centric" approach of Hermes, OpenClaw is heavily invested in native, resource-intensive architecture, focusing on gateway-level persistence and complex multi-threaded agent coordination.
*   **Community Size:** OpenClaw maintains a significantly larger community footprint than its peers, which creates a "double-edged sword" effect: rapid innovation but high noise-to-signal ratios regarding recurring stability regressions.

### Shared Technical Focus Areas
*   **Persistent Data Scaling:** OpenClaw (#119720) and QwenPaw (#8443) are both struggling with the "event-loop bloat" caused by aggressive, unoptimized database persistence.
*   **Windows Reliability:** All active projects are reporting friction with Windows-specific file-handle locking and update lifecycles.
*   **Cross-Platform Parity:** Hermes, QwenPaw, and ZeroClaw are all currently building or refining "native-like" desktop experiences (AppImages, .deb, or PWA-style installers) to replace browser-only interfaces.

### Differentiation Analysis
*   **OpenClaw:** Focuses on infrastructure-heavy, enterprise-adjacent agent deployment with a "Doctor-fix" mindset.
*   **Hermes Agent:** The primary leader in the "web-as-desktop" paradigm; best suited for users wanting a cloud-integrated interface that mimics local-app performance.
*   **QwenPaw:** Clearly targeting developer-productivity and research, with a focus on extensible "PawApps" and modular tool-chaining.
*   **ZeroClaw:** Highly focused on security, Wasm-based runtime hardening, and standardized provenance, positioning itself for more security-conscious or corporate-compliance use cases.

### Community Momentum & Maturity
*   **High Velocity (Iterating):** Hermes and QwenPaw show the most balanced growth, moving from beta to feature-complete stages with manageable issue backlogs.
*   **Stabilizing/High Debt:** OpenClaw and ZeroClaw are in a "crunch" phase. OpenClaw’s 500-PR surge suggests a desperate attempt to rectify recent stability regressions, while ZeroClaw is effectively cleaning up its CI/CD and security signatures to hit a v0.9.0 milestone.
*   **Inactive:** IronClaw appears effectively abandoned, suggesting a consolidation of developer interest toward the more active repositories.

### Trend Signals
1.  **The End of "Magic":** Users are increasingly rejecting "auto-mutating" agent behaviors (e.g., OpenClaw's "Skill Workshop" backlash). Developers now favor auditable, manual control over autonomous agent evolution.
2.  **Infrastructure as a Moat:** The battleground has shifted from "model intelligence" to "runtime reliability." The project that fixes file-locking and event-loop blocking first will win the desktop-install market.
3.  **Local-First Resilience:** Despite the move to web-based UI, there is a strong, persistent requirement for local-only functionality (offline inference, local database access), indicating that "pure-cloud" agents are failing the reliability requirements of professional workflows.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest: 2026-10-28

## 1. Today's Overview
The Hermes Agent project remains in a state of high-intensity development, with a significant surge in activity characterized by 50 PR updates and 17 active issues in the last 24 hours. The primary focus is clearly on the stabilization and feature expansion of the recently introduced web-based gateway interface (#144648). Project health is robust, with active efforts toward cross-platform parity (Linux/Android/Windows) and refining the user experience for desktop and mobile web users.

## 2. Releases
*No new releases were published in the last 24 hours.*

## 3. Project Progress
*   **Infrastructure & UX:** Major efforts are underway to make the dashboard a true "installable" app using service workers and manifests (#145801).
*   **Desktop Enhancements:** Performance optimizations were pushed to reduce redundant renderer work for hidden terminal rows (#145757). A new in-app browser feature is being implemented to keep users within the agent environment instead of jumping to system browsers (#145798).
*   **Plugin Management:** Resolved an issue blocking plugin inspection in the web-hosted environment (#145770).
*   **Bug Fixes:** Fixed a race condition where the launcher could incorrectly attempt to use a deleted file while waiting for a lock (#145753) and patched an authorization header logic error where configured headers were replacing SDK defaults instead of merging correctly (#145799).

## 4. Community Hot Topics
*   **[#144648] Tracking: Webapp Post-merge follow-ups:** With 10 comments, this is the central hub for the most significant shift in the project—the browser-hosted desktop. The community is actively reporting polish issues as the ecosystem converges on this interface.
*   **[#143331] Windows Update Failure:** (7 comments) A critical issue causing update failures due to stale PID files on Windows; while closed, it highlights the friction in the current update lifecycle for Windows users.
*   **[#141854] Messaging "Needs setup" bug:** (6 comments) Users are expressing frustration with the desktop messaging UI incorrectly flagging functional platforms as unconfigured, highlighting a need for better platform-scoped authentication status reporting.

## 5. Bugs & Stability
*   **Critical/High:** 
    *   **[#145063] Tool-call argument dropping:** Deepseek-v4.1-flash users are reporting missing arguments for tools with `anyOf` parameters, potentially breaking agent autonomy.
    *   **[#145789] A2A Timeout Failure:** An issue where late A2A replies are discarded after a task is marked failed, impacting long-running agent processes.
*   **Medium/Low:**
    *   **[#145183] Linux Translucency:** Settings row hidden, preventing users from disabling window effects.
    *   **[#145296] Android Keyboard:** Keystrokes dropped in dashboard terminal; a PR fix is already pending (#145803).
    *   **[#145791] Cron Job Leaks:** Empty sessions generated on suppressed cron ticks.

## 6. Feature Requests & Roadmap Signals
*   **Desktop Parity:** A clear push for parity between touch and mouse interfaces, specifically clamping long user messages (#145792).
*   **A2A Expansion:** Improving agent-to-agent communication by allowing operators to define custom skills and documentation URLs instead of generic toolset descriptions (#145790).
*   **Local Models:** Recent PRs indicate a commitment to supporting the latest local hardware trends, evidenced by the integration of LiquidAI LFM3 1.7B (#145800).

## 7. User Feedback Summary
Users are generally enthusiastic about the new webapp capability but are hitting "day-one" friction. Common pain points include UI inconsistencies (markdown rendering, input clamping) and configuration hurdles where the desktop app fails to detect correctly enabled platforms. The sentiment remains positive, as the team is rapidly iterating on these reports.

## 8. Backlog Watch
*   **[#19821] QQ Bot WebSocket "Zombie" State:** Open since May 2026. The adapter fails to detect silent drops in the TCP connection. This is a long-standing stability concern that needs a robust keep-alive or reconnection strategy.
*   **[#139418] GPT-6.1 Sol Coherence:** A significant performance degradation report for specific model sessions that hasn't seen movement since mid-October; indicates a potential issue with how long-running reasoning tasks are managed.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest (2026-10-28)

### 1. Today's Overview
The QwenPaw project shows high development velocity, with 50 PRs updated and 18 issues active within the last 24 hours. The team is currently balancing a significant release cycle (v2.3.0-beta.1) with critical stabilization efforts for the desktop client and memory management. Overall, project health is robust, characterized by active community contributions and a clear focus on maturing the cross-platform experience.

### 2. Releases
*   **[v2.3.0-beta.1](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.3.0-beta.1):** This beta release focuses on UI/UX restoration and developer productivity.
    *   **Highlights:** Restored interactive HTML previews in the console; added support for optional Tavily API keys via the credential store.
    *   **Migration Notes:** Users should verify their environment after upgrading as this is a beta release focused on stabilization.

### 3. Project Progress
*   **Desktop & Packaging:** Significant progress on cross-platform support with a new PR to add [Linux .deb and AppImage support](https://github.com/agentscope-ai/QwenPaw/pull/8444). 
*   **UI/UX:** Developers added a [Quick Add Model button](https://github.com/agentscope-ai/QwenPaw/pull/8434) to simplify provider configuration.
*   **Maintenance:** Several fixes were pushed to improve Windows installer diagnostics and Content Security Policy (CSP) compliance for embedded fonts in the desktop app.

### 4. Community Hot Topics
*   **[#8443] Aging out tool_result blocks:** A major discussion on database optimization. Users are hitting storage limits because `history.db` retains redundant JSON blocks, suggesting a conflict between system performance and long-term search recall.
*   **[#7874] Redesigning the SDK and App Control Plane:** An ambitious, long-running architectural change aimed at improving task orchestration, retries, and permission handling for "PawApps."

### 5. Bugs & Stability
*   **High Severity:**
    *   **[#8312](https://github.com/agentscope-ai/QwenPaw/issues/8312):** Context control failure leading to model "Context Length Exceeded" errors during complex tasks.
    *   **[#8361](https://github.com/agentscope-ai/QwenPaw/issues/8361):** Loop in `memory_search` causing crashes when internal automatic recall fails to produce a stable response. (Fix in progress: [#8457](https://github.com/agentscope-ai/QwenPaw/pull/8457)).
*   **Medium Severity:**
    *   **[#8306](https://github.com/agentscope-ai/QwenPaw/issues/8306):** Atomic file write errors triggered by long filenames, causing production failures on standard filesystems.
    *   **[#8265](https://github.com/agentscope-ai/QwenPaw/issues/8265):** Plugin hot-install issues on distro-patched Python 3.11 environments.

### 6. Feature Requests & Roadmap Signals
*   **UX/Accessibility:** A new request for [easier access to unread push messages](https://github.com/agentscope-ai/QwenPaw/issues/8459) in the web UI.
*   **Roadmap Prediction:** We expect the next stable release to include the new "PawApp" control plane ([#7874](https://github.com/agentscope-ai/QwenPaw/pull/7874)) and a robust solution for tool-result data retention ([#8443](https://github.com/agentscope-ai/QwenPaw/pull/8443)) as these address primary scalability bottlenecks.

### 7. User Feedback Summary
Users are generally satisfied with the breadth of features, particularly the integration of search providers like Firecrawl. However, frustration remains regarding the "brittleness" of the desktop client on Windows, specifically log rotation issues and file-handle locking, which hinder long-running background tasks.

### 8. Backlog Watch
*   **[#7785] Realtime Voice Chat:** A massive feature set (XXXL size) that has been under development since mid-September. It requires more active review to prevent it from becoming stale.
*   **[#7903] Community Integration:** A significant architectural feature intended to connect QwenPaw instances. It remains in a "WIP" state; increased contributor focus is needed to bridge the gap between "experimental" and "integrated."

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest: 2026-10-28

## 1. Today's Overview
ZeroClaw is currently in a high-velocity state following the release of v0.8.7. Development activity is intense, characterized by a massive volume of open PRs (42) and a mix of critical security/stability patching and long-term architectural refactoring. The project remains healthy but faces significant pressure to stabilize the MCP and runtime toolsets as it approaches the v0.9.0 milestone.

## 2. Releases
*   **[v0.8.7](https://github.com/zeroclaw-labs/zeroclaw)**: A security and maintenance update containing 81 commits from 19 contributors. Key highlights include patches for Wasmtime, updated Rustls certificate verification, and refreshed `tokio` dependencies. Container images have also been rebuilt.

## 3. Project Progress
*   **Release Attestation**: [Issue #9101](https://github.com/zeroclaw-labs/zeroclaw/issues/9101) was closed after successfully consolidating three disparate signing mechanisms into a single, streamlined process, reducing the number of release assets from 53 to 20.
*   **Documentation Alignment**: [PR #12019](https://github.com/zeroclaw-labs/zeroclaw/pull/12019) was merged, pinning documentation translations to the v0.8.7 release to ensure language parity with the new features.

## 4. Community Hot Topics
*   **[Issue #7432: Runtime, Dashboard, and Gateway Tracker](https://github.com/zeroclaw-labs/zeroclaw/issues/7432)**: With 16 comments, this remains the central hub for the v0.9.0 roadmap. The community is focused on defining acceptance criteria for the remaining runtime gaps.
*   **[Issue #9101: Release Attestation Consolidation](https://github.com/zeroclaw-labs/zeroclaw/issues/9101)**: While closed, its 11 comments reflect the complexity of modernizing CI pipelines to handle complex provenance requirements.

## 5. Bugs & Stability
*   **S1 - Workflow Blocked**: 
    *   [Issue #12075](https://github.com/zeroclaw-labs/zeroclaw/issues/12075): Android shell tool failures due to `EPERM` on canonicalization. **Fix in progress**: [PR #12080](https://github.com/zeroclaw-labs/zeroclaw/pull/12080).
    *   [Issue #10807](https://github.com/zeroclaw-labs/zeroclaw/issues/10807): MCP connection poisoning after recovery failure. **Fix in progress**: [PR #12061](https://github.com/zeroclaw-labs/zeroclaw/pull/12061).
*   **S2 - Degraded Behavior**: 
    *   [Issue #11517](https://github.com/zeroclaw-labs/zeroclaw/issues/11517): Web chat state loss on refresh.
    *   [Issue #12055](https://github.com/zeroclaw-labs/zeroclaw/issues/12055): MCP HTTP client connection pooling issues.
    *   [Issue #12072](https://github.com/zeroclaw-labs/zeroclaw/issues/12072): OpenAI Codex streaming fallback failure. **Fix in progress**: [PR #12073](https://github.com/zeroclaw-labs/zeroclaw/pull/12073).

## 6. Feature Requests & Roadmap Signals
*   **Session Resumption**: [Issue #12069](https://github.com/zeroclaw-labs/zeroclaw/issues/12069) and [PR #12071](https://github.com/zeroclaw-labs/zeroclaw/pull/12071) request a `/load-session` command to improve user navigation in ZeroCode. Likely to be included in v0.9.0.
*   **Focused Workspaces**: [PR #11414](https://github.com/zeroclaw-labs/zeroclaw/pull/11414) (Size: XL) is a significant UI/UX effort to add "Focused" workspaces, indicating a push toward better productivity tooling.

## 7. User Feedback Summary
Users are currently grappling with "brittleness" in the tool-calling layers (MCP poisoning, shell errors on Android, and connection pool issues). The rapid pace of releases (v0.8.6 to v0.8.7) has introduced minor documentation lag in non-English locales, which is already being addressed by the maintainers ([Issue #12078](https://github.com/zeroclaw-labs/zeroclaw/issues/12078)).

## 8. Backlog Watch
*   **[PR #9745](https://github.com/zeroclaw-labs/zeroclaw/pull/9745)**: A large-scale architectural change regarding knowledge graph scoping. This PR has been open since August and is critical for the security roadmap, currently needing significant maintainer review to proceed.
*   **[PR #11596](https://github.com/zeroclaw-labs/zeroclaw/pull/11596)**: Ongoing effort to support native Claude Code accounts; it has seen significant drift since early October and requires synchronization with the `master` branch.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/jinming1345/agents-radar).*