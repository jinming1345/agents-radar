# OpenClaw Ecosystem Digest 2026-10-02

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-10-02 01:48 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest: 2026-10-02

## 1. Today's Overview
OpenClaw is currently under significant stress, characterized by a massive volume of open issues (278 active) and PRs (291 open) as the project grapples with stability regressions following the 2026.9.x release cycle. The codebase is currently experiencing critical "crash-loop" patterns, memory leaks in core workers, and database I/O pressure on Windows and Linux platforms. While maintainers are actively merging hotfixes, the high velocity of new bug reports suggests that the project is in a period of intense "firefighting" to restore platform reliability.

## 2. Releases
*   **v2026.8.34**: An `extended-stable` (LTS equivalent) release. This version consolidates fixes through late August 2026, including critical security patches, reliability improvements, and expanded model support. Users currently experiencing instability in the 2026.9.x series are strongly advised to revert to this stable baseline.

## 3. Project Progress
*   **PR #163074**: A critical patch backporting stability fixes (Windows, performance, and memory) that were missed in the 2026.9.8 release branch.
*   **PR #163032**: Merged a fix addressing the loss of delegation tools in completion turns during retries.
*   **Refactoring & Cleanup**: Ongoing efforts to reduce codebase bloat, specifically retiring pre-agent session migration logic ([PR #163160](https://github.com/openclaw/openclaw/pull/163160)) and deslopping browser vocabulary in the WebUI ([PR #163161](https://github.com/openclaw/openclaw/pull/163161)).

## 4. Community Hot Topics
*   **[Issue #143524](https://github.com/openclaw/openclaw/issues/143524)** (103 comments): A severe SQLite WAL bloat issue on Windows where files grow to multiple GBs, causing gateway startup failures. 
*   **[Issue #153257](https://github.com/openclaw/openclaw/issues/153257)** (40 comments): User report detailing an 8-hour failure recovery session following the 2026.9.5 upgrade.
*   **[Issue #149538](https://github.com/openclaw/openclaw/issues/149538)** (23 comments): Reports of gateway `/health` probe timeouts and event loop starvation in large (600+ agent) fleets.

## 5. Bugs & Stability
*   **P0 - Critical**:
    *   **Memory Leaks**: `prepared-model-catalog.worker.js` is leaking 4-5 GB/h ([Issue #159662](https://github.com/openclaw/openclaw/issues/159662)).
    *   **Windows Regressions**: Multiple reports of `DataCloneError` and `Session creation` failures on recent builds ([Issue #161953](https://github.com/openclaw/openclaw/issues/161953), [Issue #161828](https://github.com/openclaw/openclaw/issues/161828)).
    *   **Startup Wall-time**: Plugin count is causing gateway boot times to exceed the 120s budget ([Issue #155859](https://github.com/openclaw/openclaw/issues/155859)).
*   **P1 - Significant**:
    *   **Zombie Processes**: Unreaped hook/tool child processes are causing runtime degradation ([Issue #97616](https://github.com/openclaw/openclaw/issues/97616)).

## 6. Feature Requests & Roadmap Signals
*   **Security Controls**: High community demand for a denylist mode in `exec-approvals` to complement the existing allowlist ([Issue #6615](https://github.com/openclaw/openclaw/issues/6615), [Issue #71097](https://github.com/openclaw/openclaw/issues/71097)).
*   **Auditability**: Users are requesting an audit log for agent memory changes to improve transparency and security forensics ([Issue #20935](https://github.com/openclaw/openclaw/issues/20935)).

## 7. User Feedback Summary
The community is currently experiencing significant "upgrade fatigue." Frequent regressions in core session-state management and database handling are causing users to spend excessive time on disaster recovery rather than agent development. There is a strong sentiment that the project needs to shift priority from new features to hardening core database and IPC (Inter-Process Communication) stability.

## 8. Backlog Watch
*   **[Issue #114612](https://github.com/openclaw/openclaw/issues/114612)**: Unbounded growth of SQLite tables in `memory-core`. This has been open since July and remains a primary driver of disk-full issues on long-running gateways.
*   **[Issue #85030](https://github.com/openclaw/openclaw/issues/85030)**: MCP tool injection failures for subagents. This is a complex bug affecting core extensibility and has high community interest (6+ reactions).

---

## Cross-Ecosystem Comparison

This report summarizes the state of the personal AI agent ecosystem as of October 2, 2026.

### 1. Ecosystem Overview
The open-source AI agent ecosystem is currently transitioning from a "feature-expansion" phase to a "stability-hardening" phase, with nearly all major projects struggling to balance rapid iteration with technical debt. The sector is characterized by high volatility, where architectural shifts toward unified runtimes and agent-delegation frameworks are creating frequent, non-trivial regressions. Users are increasingly signaling "update fatigue," prioritizing core reliability and data integrity over the addition of new, complex orchestration models.

### 2. Activity Comparison
| Project | Open Issues | Open PRs | Release Status (24h) | Health Score |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 278 | 291 | v2026.8.34 (Stable) | Critical (Firefighting) |
| **Hermes Agent**| ~100+ | High | None | Improving (Stable) |
| **IronClaw** | N/A | Low | None | Stable (Languishing) |
| **QwenPaw** | Active | Active | None | Strong (Iterating) |
| **ZeroClaw** | 88+ | High | None | High-Intensity/Volatile |

### 3. OpenClaw’s Position
*   **Advantages:** As the "core reference" implementation, OpenClaw possesses the most mature feature set and the largest footprint for enterprise or large-fleet agent management.
*   **Technical Approach:** It is uniquely plagued by state-persistence and I/O bottlenecks (SQLite WAL bloat), suggesting it manages more complex long-term memory states than its peers.
*   **Community Size:** Significant, yet currently adversarial; the volume of open PRs (291) indicates a project struggling with maintainer bandwidth and PR-merge throughput.

### 4. Shared Technical Focus Areas
*   **Session Persistence & Recovery:** All projects (OpenClaw, Hermes, ZeroClaw) are currently battling data corruption or loss in their session-state management.
*   **Security & Privilege Scoping:** A major push toward "Principal-scope" security and preventing privilege escalation during agent-to-agent delegation is evident in ZeroClaw and OpenClaw.
*   **Developer Experience (DevEx):** There is a universal struggle with "lockfile" and dependency management (Hermes' `uv.lock` issues, QwenPaw's CJK/media formatting, IronClaw's workspace-seeding).

### 5. Differentiation Analysis
*   **Target Users:** OpenClaw targets fleet management (600+ agents); QwenPaw is leaning into "Advisor/Worker" multi-agent orchestration; IronClaw focuses on "processless" authentication (IdentyClaw); Hermes focuses on the Desktop/UI experience.
*   **Architecture:** ZeroClaw is moving toward a highly unified, hardened runtime, whereas QwenPaw is prioritizing cross-model compatibility (DeepSeek/OpenAI/GPT-6).

### 6. Community Momentum & Maturity
*   **Rapid Iteration:** **QwenPaw** and **ZeroClaw** are the most active; they are successfully merging features, though ZeroClaw risks stability for velocity.
*   **Stabilization:** **OpenClaw** is currently in a state of mandatory stabilization. It is no longer innovating; it is retreating to an LTS baseline (`v2026.8.34`) to survive.
*   **Stagnation:** **IronClaw** shows signs of slower momentum; the lack of recent releases or merged PRs suggests either a maturing architectural phase or a loss of developer activity.

### 7. Trend Signals
*   **From "Agent" to "Orchestrator":** Projects are moving beyond single-agent setups to dual-model "Advisor/Worker" architectures (QwenPaw).
*   **Human-in-the-loop (HITL):** A clear trend toward standardized `ask_user_question` tools across the board indicates that autonomous agents are hitting the "trust barrier" and require manual validation to proceed.
*   **The "Database Bottleneck":** The prevalence of SQLite and session-management bugs across the ecosystem suggests that the "memory" component of agents is currently the single greatest point of failure in modern agentic stacks. Developers should prioritize robust, transactional persistence layers over novel LLM-integrated features.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest: 2026-10-02

## 1. Today's Overview
The Hermes Agent project remains in a high-intensity development phase, with 100 total items (issues and PRs) updated in the last 24 hours. Activity is heavily focused on stabilizing the Desktop experience, fixing regressions in gateway/CLI migration flows, and addressing cross-platform compatibility issues, particularly on Windows. The project health shows high throughput from core maintainers, though the large volume of open, active issues suggests significant ongoing technical debt related to session management and state persistence.

## 2. Releases
*No new releases identified for 2026-10-02.*

## 3. Project Progress
Today saw a flurry of rapid-response PRs focusing on stability and security:
* **MCP Compliance:** [#131078](https://github.com/NousResearch/hermes-agent/pull/131078) introduces official MCP conformance testing to CI, fixing three identified protocol defects.
* **Gateway Stability:** [#131071](https://github.com/NousResearch/hermes-agent/pull/131071) improves restart handling by correctly identifying scoped cron jobs, preventing unnecessary 30-minute hangs.
* **Security & Hardening:** [#131074](https://github.com/NousResearch/hermes-agent/pull/131074) tightens file permissions on backup archives to 0600, preventing sensitive leakage.
* **Desktop UX:** [#131072](https://github.com/NousResearch/hermes-agent/pull/131072) adds an opt-in feature for displaying agent names in session tabs.

## 4. Community Hot Topics
* **[#97681](https://github.com/NousResearch/hermes-agent/issue/97681) Let Bots collaborate across gateways (30 comments):** Remains the primary long-term architectural focus. It is currently blocked by the "unified gateway runtime" transition (#106742).
* **[#127647](https://github.com/NousResearch/hermes-agent/issue/127647) Desktop Resource Burn Tracker (26 comments):** High interest in reducing idle CPU/GPU/Memory consumption; serves as a vital diagnostic hub for performance tuning.
* **[#127665](https://github.com/NousResearch/hermes-agent/issue/127665) Desktop Rendering Double-Replies (21 comments):** A persistent UI/state sync bug causing visible artifacts, indicating friction between the frontend overlay and the `state.db` backend.

## 5. Bugs & Stability
* **High Priority (P1):**
    * [#122529](https://github.com/NousResearch/hermes-agent/issue/122529): Cron external workers missing `PYTHONPATH` for `ruamel`.
    * [#130987](https://github.com/NousResearch/hermes-agent/issue/130987): Gateway restart wait blocking for long-running cron jobs. *Fix in progress via #131071.*
* **Medium Priority (P2/Regressions):**
    * [#127313](https://github.com/NousResearch/hermes-agent/issue/127313): Right-click menu hijacking in the Desktop pane.
    * [#131055](https://github.com/NousResearch/hermes-agent/issue/131055): Linux desktop sandbox poisoning on multi-instance launch. *Fix in progress via #131067.*
    * [#129751](https://github.com/NousResearch/hermes-agent/issue/129751): `pm/uv.lock` version mismatch causing tool update failures.

## 6. Feature Requests & Roadmap Signals
* **Agent Personalization:** [#129686](https://github.com/NousResearch/hermes-agent/issue/129686) requests support for new decision-making models (e.g., Jev, nimble).
* **Desktop UI:** [#119120](https://github.com/NousResearch/hermes-agent/issue/119120) for granular Windows tray/minimize behavior.
* **Reliability:** [#13603](https://github.com/NousResearch/hermes-agent/issue/13603) remains a critical feature request for a robust auto-rollback mechanism during updates, which would significantly improve user trust.

## 7. User Feedback Summary
Users are experiencing "update fatigue" and technical frustration due to `pm` (package manager) and `uv` lockfile inconsistencies. Stability on Windows and macOS is currently inconsistent, with several reports of "Access Denied" or timeout errors during routine installs. The community values the rapid bug-fix cycle but is clearly struggling with the complexity of the current multi-stage migration and runtime setup.

## 8. Backlog Watch
* **[#13603](https://github.com/NousResearch/hermes-agent/issue/13603):** Feature request for rollback/auto-rollback. Open since April 2026; high criticality for safe updates.
* **[#61990](https://github.com/NousResearch/hermes-agent/issue/61990):** Truncation of email delivery output. While closed, this highlights a long-standing desire for better handling of large agent outputs.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest: 2026-10-02

## 1. Today's Overview
IronClaw maintains steady development velocity with a focus on enhancing agent persistence and infrastructure reliability. Current activity is balanced between long-term architectural improvements, such as encrypted browser session management, and routine operational maintenance like codebase knowledge graph updates. While the project remains in an active state, the high number of benchmark failures noted in recent taxonomy reports suggests that the engineering team is prioritizing stability and debugging alongside new feature implementation.

## 2. Releases
*None.* No new releases were published in the last 24 hours.

## 3. Project Progress
There were no merged or closed PRs in the last 24 hours. Development continues on existing open PRs:
*   **[PR #7988](https://github.com/nearai/ironclaw/pull/7988)**: An automated CI task by `ironclaw-ci[bot]` to refresh the codebase knowledge graph, ensuring agents are bootstrapped with the most current project context.

## 4. Community Hot Topics
*   **[Issue #8121: Daily ironclaw failure taxonomy](https://github.com/nearai/ironclaw/issues/8121)**: This is a critical tracking issue for the project’s health. It highlights a recurring defect in "workspace-seeding" within the `clawbench` suite. This indicates that while the project has high-quality benchmarking, infrastructure instability is currently causing noise in automated testing.
*   **[PR #7499: feat(identyclaw)](https://github.com/nearai/ironclaw/pull/7499)**: A large (XL) architectural PR attempting to integrate "IdentyClaw Passport" via a host-mediated seam. This addresses a significant need: enabling agents to perform authentication without requiring a full browser extension or external shell dependencies.

## 5. Bugs & Stability
*   **Severity: High** - **[Issue #8121](https://github.com/nearai/ironclaw/issues/8121)** reports 128 non-passing tests in the `clawbench` suite. The primary culprit appears to be a "broken-workspace-seeding" defect. There is no active fix PR linked to this specific issue at this time.

## 6. Feature Requests & Roadmap Signals
*   **[Issue #2358: BrowserProfileStore trait](https://github.com/nearai/ironclaw/issues/2358)**: This is a high-priority feature request aimed at allowing agents to persist browser sessions (cookies/IndexedDB) across runs. Given the age of the issue (April 2026) and its status as a "workspace" requirement, this is likely a high-priority architectural target for upcoming releases to improve the "human-like" experience of persistent agents.

## 7. User Feedback Summary
While direct user feedback is limited, the ongoing work on **[PR #7499](https://github.com/nearai/ironclaw/pull/7499)** signals a clear pain point: the friction of authenticating "processless" agents. Practitioners are requesting lighter-weight methods for identity management, moving away from heavy shell-based or extension-based dependencies.

## 8. Backlog Watch
*   **[Issue #2358](https://github.com/nearai/ironclaw/issues/2358)**: This issue has been open since April 2026. As it deals with security (encrypted tarball persistence of sensitive tokens), it represents a significant technical hurdle for agent reliability that requires maintainer intervention to move from design to implementation.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest (2026-10-02)

## 1. Today's Overview
QwenPaw shows high velocity, with 16 total updates (7 issues, 9 PRs) in the last 24 hours, signaling a very active development phase. The focus has shifted toward refining provider-specific compatibility (DeepSeek/OpenAI), bolstering security (path sanitization), and enhancing the developer experience for console extensions. Overall project health is strong, though there is a clear trend of "growing pains" regarding model provider integration complexities.

## 2. Releases
*No new releases in the last 24 hours.*

## 3. Project Progress
*   **Media/Formatter Logic:** PR [#8069](https://github.com/agentscope-ai/QwenPaw/pull/8069) and [#8066](https://github.com/agentscope-ai/QwenPaw/pull/8066) were submitted (with #8069 being closed/superseded) to resolve formatting errors when sending non-image media (PDFs/audio) to DeepSeek and handling zero-byte media blocks.
*   **CJK Rendering:** PR [#8068](https://github.com/agentscope-ai/QwenPaw/pull/8068) was closed/reviewed to address Markdown bolding issues with CJK punctuation, demonstrating a proactive approach to UI polish for non-English users.

## 4. Community Hot Topics
*   **[#6274] Human-in-the-Loop Feature:** An enhancement proposal for an `ask_user_question` tool. This is the most popular active item, reflecting a growing need for agents to handle high-risk or ambiguous tasks by consulting users before acting.
*   **[#8076] Reload/Lifecycle Management:** Discusses the "stuck" background task problem when reloading agents, where cleanup timeouts can last up to 24 hours. The community is highlighting the need for more robust async lifecycle management.

## 5. Bugs & Stability
*   **Critical:** [Issue #8064](https://github.com/agentscope-ai/QwenPaw/issues/8064) (DeepSeek provider session crash) - PDF uploads trigger a 400 error that breaks the entire session. *Status: Open.*
*   **High:** [Issue #8074](https://github.com/agentscope-ai/QwenPaw/issues/8074) (OpenAI provider) - Incompatibility with `gpt-6` family models due to restrictive whitelisting. *Status: Open.*
*   **Medium:** [Issue #8073](https://github.com/agentscope-ai/QwenPaw/issues/8073) (Regression) - Users report inability to access the conversation page in V2.2.2.beta4 when accessing via LAN, suggesting a potential regression in network/proxy handling.

## 6. Feature Requests & Roadmap Signals
*   **Advisor Mode:** PR [#7569](https://github.com/agentscope-ai/QwenPaw/pull/7569) is a significant "size/XXXL" addition that would introduce a dual-model paradigm (Advisor/Worker). This signals a transition toward more complex, multi-agent orchestrations.
*   **Plugin UX:** [Issue #8071](https://github.com/agentscope-ai/QwenPaw/issues/8071) asks for a semantic token override layer, suggesting that the ecosystem of third-party plugins is maturing and requiring deeper console integration.

## 7. User Feedback Summary
Current user sentiment is dominated by integration friction. While users are excited about the platform's capabilities, they are experiencing stability issues when updating to beta versions (specifically LAN access in V2.2.2.beta4) and encountering rigid provider-specific constraints that haven't kept pace with newer model releases (like the GPT-6 issue).

## 8. Backlog Watch
*   **[PR #7569] Advisor Mode:** Despite its size and impact, it has been open since September 5th without reaching a merge state. Its complexity warrants a high-level review from maintainers to ensure it aligns with the core architectural roadmap.
*   **[Issue #6274] Human-in-the-Loop:** This feature is vital for "agent agency" and has been pending since July. It remains a key candidate for the next major feature cycle to bridge the gap between autonomous execution and user control.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest - 2026-10-02

## 1. Today's Overview
The ZeroClaw repository is experiencing a surge in high-intensity engineering activity, characterized by 88 combined active issues and PRs in the last 24 hours. The project is currently in a "stabilization and security hardening" phase, with a heavy focus on formalizing the agent runtime, patching critical principal-scope vulnerabilities, and finalizing plugin infrastructure for the upcoming v0.8.6 and v0.9.0 releases. Development velocity is exceptionally high, with several large-scale architectural refactors currently moving through the review pipeline.

## 2. Releases
*   **No new releases.** (Note: Development is heavily targeting v0.8.6 and v0.9.0).

## 3. Project Progress
While zero PRs were merged today, the following advanced significantly:
*   **Gateway & Core Integration:** Massive progress on gateway capabilities, with PRs [#11381](https://github.com/zeroclaw-labs/zeroclaw/pull/11381), [#11382](https://github.com/zeroclaw-labs/zeroclaw/pull/11382), and [#11417](https://github.com/zeroclaw-labs/zeroclaw/pull/11417) working to unify session management, logging, and configuration under the core runtime.
*   **Security & Ownership:** A series of large PRs ([#11411](https://github.com/zeroclaw-labs/zeroclaw/pull/11411), [#11410](https://github.com/zeroclaw-labs/zeroclaw/pull/11410), [#11409](https://github.com/zeroclaw-labs/zeroclaw/pull/11408)) from contributor *Aarlington* focus on enforcing private run ownership and preventing privilege escalation in agentic delegation.
*   **Tooling Inventory:** Significant progress on formalizing the tool registry, including binary size measurement scripts ([#11306](https://github.com/zeroclaw-labs/zeroclaw/pull/11306)) and tier-based tool inventory management ([#11308](https://github.com/zeroclaw-labs/zeroclaw/pull/11308)).

## 4. Community Hot Topics
*   **[#9600] [Tracker]: Session-persistence contract ownership:** (16 comments) – The project’s most debated topic remains the chaotic state of session-persistence, with four independent workstreams currently conflicting.
*   **[#9799] [Bug]: Daemon CPU Spin:** (5 comments) – Concerns regarding a 140-177% CPU usage issue in long-lived ephemeral daemons remain high-priority.
*   **[#10066, #10495, #11198]:** A cluster of P0/S0 severity bugs (data loss and privilege scope issues) are drawing significant developer focus due to the risks they pose to current adopters.

## 5. Bugs & Stability
*   **S0 - Critical Data Loss:** [#10495](https://github.com/zeroclaw-labs/zeroclaw/issues/10495) (Config save truncates files) and [#11198](https://github.com/zeroclaw-labs/zeroclaw/issues/11198) (Delegated memory tool privilege leaks) are the highest priority items requiring immediate resolution.
*   **S1 - Workflow Blocked:** [#11369](https://github.com/zeroclaw-labs/zeroclaw/issues/11369) (Docker startup failure) and [#11418](https://github.com/zeroclaw-labs/zeroclaw/issues/11418) (UI clipboard functionality failure) are impacting developer experience today.
*   **Regression:** [#11387](https://github.com/zeroclaw-labs/zeroclaw/issues/11387) confirms a regression regarding launch directory behavior that previously surfaced in #10609.

## 6. Feature Requests & Roadmap Signals
*   **Model Router:** The community continues to push for a `llama.cpp` model router ([#7539](https://github.com/zeroclaw-labs/zeroclaw/issues/7539)) to facilitate faster switching between local models.
*   **IdP-less Auth:** Development of a local username/password `AuthProvider` ([#8076](https://github.com/zeroclaw-labs/zeroclaw/issues/8076)) is planned to support easier deployments.
*   **Plugin Rollback:** The addition of verified plugin updates with failure rollbacks ([#10995](https://github.com/zeroclaw-labs/zeroclaw/issues/10995)) is slated for the v0.8.6 cycle.

## 7. User Feedback Summary
*   **Pain Points:** Users are struggling with the transition of the config/daemon storage architecture, specifically regarding data directory locking and configuration file integrity.
*   **Observation:** There is frustration regarding "inert" config keys ([#10781](https://github.com/zeroclaw-labs/zeroclaw/issues/10781)) that give users a false sense of control over memory/history usage.
*   **Sentiment:** While technical sentiment remains high regarding the platform's potential, the frequency of S0/S1 regressions has reached a point where stability is the primary community concern.

## 8. Backlog Watch
*   **[#7539](https://github.com/zeroclaw-labs/zeroclaw/issues/7539): Llama.cpp model router.** An older feature request (June 2026) that is currently marked as "icebox" despite sustained user interest.
*   **[#9394](https://github.com/zeroclaw-labs/zeroclaw/issues/9394): Pairing dashboard.** An audited bug involving unread config fields and non-expiring pairing codes that has been pending for over two months.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/jinming1345/agents-radar).*