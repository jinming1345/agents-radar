# OpenClaw Ecosystem Digest 2026-11-12

> Issues: 169 | PRs: 500 | Projects covered: 5 | Generated: 2026-11-12 01:38 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest – 2026-11-12

## 1. Today's Overview
OpenClaw is currently in a state of high-intensity stabilization following a surge of activity in the 2026.11.x release cycle. With 500 PRs and 169 issues updated in the last 24 hours, the project is under significant pressure to address regressions related to Gateway memory management, subagent lifecycle reliability, and SQLite performance. The focus has shifted from feature delivery to defensive engineering, particularly around process lifecycle safety and environment-specific installation failures.

## 2. Releases
*   **v2026.11.5-beta.2**: Highlights include improved browsing for large conversation histories through bounded archive reads and paged history (#188450, #188483, #188557). The macOS application has also received a fix ensuring saved secrets are preserved across restarts.

## 3. Project Progress
The current development effort is heavily weighted toward "bug-fixing at scale" rather than new capabilities.
*   **Resolved/Active Cleanup**: Significant effort is going into fixing agent memory leaks and directory-watching bloat (e.g., #197445, preventing filesystem I/O from blocking the Gateway).
*   **Agent Reliability**: PRs like #197335 aim to solve critical issues where delegated subagent tasks fail to return results due to scope closure, and #197427 ensures final delivery retains recovery custody after agent RPC claims.
*   **Environment Parity**: The team is cleaning up bundled meeting plugins (#197439) and improving CLI diagnostic output for failed installations (#197436).

## 4. Community Hot Topics
*   **[#160959] Gateway blocking on large plugins**: (81 comments) This remains the most critical performance regression. Users report the event loop blocks for minutes when capturing large dependency trees. It is currently categorized as a "diamond lobster" (highest priority/impact) issue.
*   **[#166634] SQLite reclamation failure**: (28 comments) Despite being closed, the discussion highlights the fragility of the Gateway's SQLite state management after unexpected process termination.
*   **[#181432] High Memory RSS on ARM64**: (13 comments) A major regression from 2026.10.5 causing memory usage to spike from 300MB to ~1.9GB, leading to crash loops on resource-constrained devices.

## 5. Bugs & Stability
*   **[#181432] High Memory (P1)**: Impacting Linux ARM64; memory spikes and SQLite transaction timeouts.
*   **[#196199] Native Codex Helper Regressions (P1)**: Native helpers are failing to resume parent agents, essentially locking users out of their assistant interactions since version 2026.10.10.
*   **[#197083] Post-install Doctor Failure**: A new issue where the 11.3 update leaves the system in a partially finalized state.
*   **[#196512] Matrix E2EE Data Loss**: Reloading during Matrix account startup can corrupt crypto stores, necessitating complex recovery procedures.

## 6. Feature Requests & Roadmap Signals
*   **Operator Control**: There is high demand for granular management of stranded processes, such as the "Doctor" recovery for subagent runs (#170562) and configurable recall ceilings for "Active Memory" (#181774).
*   **Visibility**: Users are pushing for more observability into cost and performance, specifically requesting the ability to view usage costs (#181148) and label/filter sessions more effectively (#181160).
*   **Prediction**: Future versions will likely prioritize "Self-Healing" features, as evidenced by the volume of requests for better recovery tools (Doctor/Repair utilities).

## 7. User Feedback Summary
The community is expressing frustration regarding "update fatigue"—where Gateway downtimes increase with every release—and "UX friction" in the Control UI, where essential narration/context is often hidden or incorrectly folded. Users on macOS and Linux ARM64 are experiencing the most friction, particularly with memory limits and case-sensitive filesystem bugs.

## 8. Backlog Watch
*   **[#101929] Context-overflow estimator**: Long-standing issue (July 2026) regarding over-counting billed usage by 2.3-2.6x. It remains a "silver shellfish" priority needing maintainer review.
*   **[#145690] Subagent termination race conditions**: A P1 bug causing dropped user messages; significantly impacts the reliability of complex task chaining and requires a product-level decision on how to handle ephemeral plugin lifetimes.

---

## Cross-Ecosystem Comparison

### 1. Ecosystem Overview
The open-source AI agent ecosystem is currently in a "stabilization and hardening" phase, shifting from experimental prototyping to robust, production-ready architectures. Projects are broadly grappling with the same fundamental challenges: state management reliability, multi-platform environment parity, and the security implications of autonomous execution. There is a clear industry trend toward modularizing monolithic cores into plugin-based systems (MCP, channel managers) to facilitate better extensibility and user-defined agent behavior.

### 2. Activity Comparison
| Project | Recent Issues | Recent PRs | Release Status | Health Score* |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 169 | 500 | v2026.11.5-beta.2 | High Pressure/Critical |
| **Hermes Agent** | ~20 | 50 | Stable (No new) | Security-Focused |
| **QwenPaw** | ~15 | 30+ | v2.3.0 | Rapidly Iterating |
| **ZeroClaw** | 5 | 50+ | Pre-v0.9.0 | High-Velocity/Dev |
| **IronClaw** | 0 | 0 | Stagnant | Dormant |

*\*Health score reflects current bug density, velocity, and maintainer responsiveness.*

### 3. OpenClaw’s Position
OpenClaw serves as the "reference implementation" for the industry, evidenced by its massive PR volume (500) and user base. 
*   **Advantages:** Unmatched feature set and community-driven ecosystem; it is the primary target for plugin developers.
*   **Technical Differences:** While others like QwenPaw are just now moving to plugin architectures, OpenClaw is currently fighting the stability debts inherent in that transition. It relies on complex state-storage (SQLite) and high-level agent delegation, making it more resource-heavy but powerful.
*   **Community Size:** OpenClaw dwarfs peers in terms of daily activity and issue frequency, effectively acting as the "canary in the coal mine" for the broader ecosystem.

### 4. Shared Technical Focus Areas
*   **Plugin/Channel Reliability:** OpenClaw, QwenPaw, and Hermes are all struggling with startup race conditions and plugin-state management.
*   **Cross-Platform Parity:** Linux/ARM64 memory leaks (OpenClaw) and Windows/IoT "Path not found" issues (QwenPaw) highlight the fragility of cross-environment deployments.
*   **Security & Credential Management:** Hermes (active "Security Marathon") and OpenClaw (secret preservation fixes) are prioritizing the prevention of credential leakage during agent runtime.

### 5. Differentiation Analysis
*   **OpenClaw:** Focuses on **High-Scale Complexity**, handling deep task chaining and complex subagent lifetimes.
*   **Hermes Agent:** Positioned as a **Security-Hardened Workspace**, prioritizing enterprise-grade safety and shell-like UX.
*   **QwenPaw:** Differentiated by its **Local-First approach**, utilizing Piccolo models to reduce cloud reliance and operational costs.
*   **ZeroClaw:** Focused on **Runtime Performance and CI/CD rigor**, targeting developers who need auditability and low-latency transport (SSH-based).

### 6. Community Momentum & Maturity
*   **Stabilizing/Hardening:** **OpenClaw** is under intense pressure to fix regressions; it is currently the most "mature" but also the most "brittle" due to its scale.
*   **Rapidly Iterating:** **QwenPaw** and **ZeroClaw** are in a high-velocity phase. QwenPaw is successfully modernizing its architecture with plugins, while ZeroClaw is preparing for its significant 0.9.0 milestone.
*   **Security Focused:** **Hermes** has paused feature releases to address technical debt, prioritizing long-term stability over new capabilities.

### 7. Trend Signals
*   **Tooling vs. Agentic Logic:** The market is demanding "Doctor/Repair" utilities (OpenClaw) to fix agent state, indicating that "Self-Healing" is the next frontier for autonomous agents.
*   **Observability Gap:** Users are increasingly frustrated by "black-box" agents. Demand for cost transparency, execution tracing, and better stderr/log surfacing is universal across the projects.
*   **Local Control:** The migration toward local models (QwenPaw) suggests that developers are moving away from purely API-driven workflows to minimize costs and context-overflow billing errors.
*   **Standardization Needs:** The widespread adoption of MCP and plugin-based architectures suggests that the "all-in-one" agent is dying in favor of highly composable, modular tool-sets.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest: 2026-11-12

## 1. Today's Overview
The Hermes Agent project is currently in a state of high-intensity security remediation, with a significant "Security Marathon" underway as evidenced by a wave of patches from maintainer `c2h5oh`. While development on new features (via the Plugin Hackathon) remains active, the primary focus for the last 24 hours has been closing critical vulnerabilities related to authentication, credential leakage, and environment variable exposure. Overall project velocity is high, with 50 active PRs, indicating a robust development ecosystem despite the reported technical debt and stability challenges in the desktop shell.

## 2. Releases
*   **No new releases** were recorded in the last 24 hours.

## 3. Project Progress
*   **Rootless Podman Support:** PR [#72946](https://github.com/NousResearch/hermes-agent/pull/72946) was successfully merged, resolving long-standing UID mapping issues that previously caused file permission conflicts for Linux users running containerized environments.
*   **Ongoing Security Hardening:** A substantial suite of security patches (PRs [#153645](https://github.com/NousResearch/hermes-agent/pull/153645), [#153644](https://github.com/NousResearch/hermes-agent/pull/153644), [#153642](https://github.com/NousResearch/hermes-agent/pull/153642), [#153846](https://github.com/NousResearch/hermes-agent/pull/153846)) is currently in the review/merge pipeline, targeting critical vulnerabilities in authentication relay, credential scoping, and recursive file-decoding bypasses.

## 4. Community Hot Topics
*   **[Bug]: Remote Desktop update reports failure (#106592)](https://github.com/NousResearch/hermes-agent/issues/106592):** With 10 comments, this remains the most debated issue. Users are frustrated by the discrepancy between "successful" backend updates and the desktop's "stale state" error messages, which indicates a need for better synchronization between systemd unit status and the desktop UI.
*   **Plugin Hackathon:** Several PRs (e.g., [#154183](https://github.com/NousResearch/hermes-agent/pull/154183), [#154185](https://github.com/NousResearch/hermes-agent/pull/154185)) represent a strong community push to expand the plugin catalog with creative tools like "Rookery" (a DAW) and localized language packs, signaling a shift toward making Hermes a comprehensive "workspace" rather than just an agent.

## 5. Bugs & Stability
*   **Critical (Security):** Multiple issues identified in the "Security Marathon" (PRs [#153682](https://github.com/NousResearch/hermes-agent/pull/153682), [#153681](https://github.com/NousResearch/hermes-agent/pull/153681)) involving unauthorized API key exposure and file system access bypasses. Fixes are currently awaiting final merge.
*   **High (Stability):** Issue [#148498](https://github.com/NousResearch/hermes-agent/issues/148498) details a severe regression on macOS where the app incorrectly triggers a setup loop and quits due to slow `hermes --version` checks during runtime probes.
*   **Medium:** Issue [#149907](https://github.com/NousResearch/hermes-agent/issues/149907) regarding console windows flashing on Windows/MSIX builds; this appears to be a minor but persistent quality-of-life irritation for Windows power users.

## 6. Feature Requests & Roadmap Signals
*   **Interactive UI:** PR [#154186](https://github.com/NousResearch/hermes-agent/pull/154186) introduces "follow-up chips," suggesting a move toward a more guided, conversational UI experience.
*   **Safety & Compliance:** PR [#153197](https://github.com/NousResearch/hermes-agent/pull/153197) (Secret Remediation) shows a roadmap priority toward enterprise-grade security, ensuring that leaked credentials are automatically detected and blocked.

## 7. User Feedback Summary
Users are experiencing "reliability fatigue" regarding installation and updates, particularly on Linux (systemd unit issues) and macOS (startup probes). While the security patches are welcome, there is clear friction when the CLI and Desktop UI do not communicate state effectively. The enthusiasm for the Plugin Hackathon suggests that the underlying Agent engine is highly valued, but users are eager for a more polished "shell" experience.

## 8. Backlog Watch
*   **[#145375](https://github.com/NousResearch/hermes-agent/issues/145375):** Linux `hermes update` failures regarding systemd unit privileges have been open since late October with minimal movement. This is a potential blocker for automated deployment environments.
*   **[#152307](https://github.com/NousResearch/hermes-agent/issues/152307):** The "clarify card" expiration bug is impacting multi-profile setups; this requires architectural attention as it touches on session state management.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest: 2026-11-12

## 1. Today's Overview
QwenPaw is currently in a high-intensity stabilization phase following the release of v2.3.0. Development momentum remains strong, with a significant focus on modularizing the architecture via plugins (channel, MCP, and model management) and fixing platform-specific regressions on Windows and Linux. The project is highly active, transitioning from a core-monolithic structure toward a more decoupled, extensible ecosystem.

## 2. Releases
*   **v2.3.0:** Introduced **Piccolo Local Decision Models** (4B, 9B, 27B) as dedicated tools for review and context compaction.
    *   **Highlights:** Supports runtime updates and downloads from Hugging Face/ModelScope.
    *   **Recommendation:** BF16 or Q8_0 precision is suggested for optimal performance in tool review tasks.

## 3. Project Progress
*   **Infrastructure Fixes:** Several critical PRs were merged to address environment-specific issues, including [PR #8680](https://github.com/agentscope-ai/QwenPaw/pull/8680) (Feishu import timeout on Windows) and [PR #8675](https://github.com/agentscope-ai/QwenPaw/pull/8675) (native library loading errors).
*   **Release Management:** [PR #8542](https://github.com/agentscope-ai/QwenPaw/pull/8542) finalized documentation for the v2.3.0 release.
*   **Sandbox Integration:** [PR #1972](https://github.com/agentscope-ai/QwenPaw/pull/1972) reached a conclusion, closing the long-standing effort to integrate OpenSandbox as a cloud-based execution backend.

## 4. Community Hot Topics
*   **[Issue #8669](https://github.com/agentscope-ai/QwenPaw/issues/8669):** "Channel plugin startup race." Users are reporting fatal connection errors for the Feishu plugin on Windows. This highlights a need for more robust retry/state-initialization logic in the new plugin architecture.
*   **[Issue #8538](https://github.com/agentscope-ai/QwenPaw/issues/8538):** Matrix channel plugin activation failure when using multiple workspaces. This indicates a potential bottleneck in the 10-second shared startup window for plugins.
*   **[PR #8648, #8647, #8649](https://github.com/agentscope-ai/QwenPaw/pull/8648):** These stacked PRs for local model management (GPU/MLX/Console controls) are generating significant interest, signaling a community shift toward more fine-grained hardware control.

## 5. Bugs & Stability
*   **Critical (Regression):** [Issue #8669](https://github.com/agentscope-ai/QwenPaw/issues/8669) (Channel connection failure) and [Issue #8682](https://github.com/agentscope-ai/QwenPaw/issues/8682) (Linux worker crashes due to missing environment variables). These affect core usability.
*   **High:** [Issue #8674](https://github.com/agentscope-ai/QwenPaw/issues/8674) (Disk space consumption by error logs). A partial fix is underway via [PR #8678](https://github.com/agentscope-ai/QwenPaw/pull/8678).
*   **Low:** [Issue #8663](https://github.com/agentscope-ai/QwenPaw/issues/8663) (Safari UI bug). Action buttons in the message queue are failing to render.

## 6. Feature Requests & Roadmap Signals
*   **Plugin-First Architecture:** The trend in recent PRs ([#8426](https://github.com/agentscope-ai/QwenPaw/pull/8426), [#8469](https://github.com/agentscope-ai/QwenPaw/pull/8469), [#8499](https://github.com/agentscope-ai/QwenPaw/pull/8499)) strongly suggests that the next version will move third-party agents, MCP, and local model management entirely into the plugin layer.
*   **Streaming Features:** Expect improved streaming support for more channels, as evidenced by [PR #8409](https://github.com/agentscope-ai/QwenPaw/pull/8409) (QQ C2C streaming).

## 7. User Feedback Summary
*   **Pain Points:** Windows and Linux users are encountering installation hurdles after the move to official channel plugins. The "System Temp Directory" bloat from error dumps is a specific point of frustration for users running integrated deployments.
*   **Satisfaction:** The introduction of local Piccolo models is well-received, as it provides a path for cost-effective tool-use and context handling without cloud dependency.

## 8. Backlog Watch
*   **[Issue #8616](https://github.com/agentscope-ai/QwenPaw/issues/8616):** Windows 11 IoT LTSC "Path not found" error. This is a platform-specific edge case that has yet to receive a concrete fix, despite the user reporting that 2.2.2 works perfectly.
*   **[PR #8236](https://github.com/agentscope-ai/QwenPaw/pull/8236):** Ollama context window sizing. This PR has been under review since mid-October and is critical for users relying on local models.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest: 2026-11-12

## 1. Today's Overview
The ZeroClaw project is currently experiencing a high-velocity development phase with 57 total items updated in the last 24 hours, signaling a strong push toward the upcoming v0.9.0 release. Development is heavily focused on refining runtime stability, expanding cross-platform CI support, and enhancing the agent-to-agent communication framework. Project health appears robust, with active maintainer engagement on complex architectural tasks, though the influx of bug reports suggests that recent feature additions are being rigorously stress-tested by the community.

## 2. Releases
*No new releases in the last 24 hours.*

## 3. Project Progress
Today saw 4 items merged/closed, focused on maintenance and security:
*   **Dependency Security:** [PR #12392](https://github.com/zeroclaw-labs/zeroclaw/pull/12392) merged to address a critical security advisory (`RUSTSEC-2026-0486`) by bumping `rustix`.
*   **Documentation:** [PR #12380](https://github.com/zeroclaw-labs/zeroclaw/pull/12380) pinned documentation translations to the v0.9.0 release candidate.
*   **Dependency Management:** [PR #12215](https://github.com/zeroclaw-labs/zeroclaw/pull/12215) closed as a redundant update following the latest batch of dependency bumps.

## 4. Community Hot Topics
*   **[PR #11869](https://github.com/zeroclaw-labs/zeroclaw/pull/11869) - SSH Transport Reuse:** This XL-sized PR is generating significant traction as it seeks to optimize agent resource usage by allowing task-owned SSH transports, crucial for long-running workflows.
*   **[PR #10391](https://github.com/zeroclaw-labs/zeroclaw/pull/10391) - Delegate Workspace/Policy Binding:** A complex, long-standing architectural PR that remains a focal point for ensuring stable agent behavior across turn boundaries.

## 5. Bugs & Stability
*   **[Issue #8794](https://github.com/zeroclaw-labs/zeroclaw/issue/8794) (S1 - Blocked):** Users report that stopping an agent mid-work erases tool call context, effectively "forgetting" steps. This is a critical workflow blocker.
*   **[Issue #12391](https://github.com/zeroclaw-labs/zeroclaw/issue/12391) (S2 - Degraded):** Large gaps appearing in `runtime-trace.jsonl` during high-load periods on Windows, impacting auditability.
*   **[Issue #12390](https://github.com/zeroclaw-labs/zeroclaw/issue/12390) (S3 - Feature Regression):** The `shell` tool is swallowing `stderr` on non-zero exits, preventing agents from troubleshooting execution failures.
*   **[Issue #12396](https://github.com/zeroclaw-labs/zeroclaw/issue/12396) (Configuration):** Discovery of "dead" config knobs (`keep_recent`, `collapse_tool_results`) that no longer function following architecture refactors.

## 6. Feature Requests & Roadmap Signals
*   **XMPP/Prosody Support:** [Issue #9814](https://github.com/zeroclaw-labs/zeroclaw/issue/9814) shows clear demand for self-hosted, low-resource chat integration.
*   **CI Expansion:** [Issue #7461](https://github.com/zeroclaw-labs/zeroclaw/issue/7461) requests a platform matrix (Windows/macOS) for CI, signaling a move toward better cross-platform quality assurance.
*   **Observability:** [Issue #12397](https://github.com/zeroclaw-labs/zeroclaw/issue/12397) requests a clear distinction between cron-job execution success and actual agent task outcomes.

## 7. User Feedback Summary
Users are currently pushing the boundaries of ZeroClaw's inter-agent communication capabilities, with high interest in the new `sessions_prompt` and `sessions_message` tools (see [PR #12258](https://github.com/zeroclaw-labs/zeroclaw/pull/12258)). There is recurring frustration regarding the "opaqueness" of agent failures—specifically around silent stderr swallowing and state loss during daemon restarts or stops.

## 8. Backlog Watch
*   **[Issue #7461](https://github.com/zeroclaw-labs/zeroclaw/issue/7461):** Created in June, this CI expansion request is critical for professional-grade deployment stability and remains high priority but unresolved.
*   **[PR #10391](https://github.com/zeroclaw-labs/zeroclaw/pull/10391):** Since August, this PR has been a massive undertaking; its eventual merger is expected to be a major milestone for agent reliability.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/jinming1345/agents-radar).*