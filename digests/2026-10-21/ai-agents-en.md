# OpenClaw Ecosystem Digest 2026-10-21

> Issues: 83 | PRs: 500 | Projects covered: 5 | Generated: 2026-10-21 02:44 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest: 2026-10-21

## 1. Today's Overview
OpenClaw is experiencing a high-velocity development cycle, characterized by intense activity around stability, UI refinement, and complex state-machine edge cases. With 83 issues updated and 500 PRs in motion over the last 24 hours, the project is under significant strain from recent releases, specifically regarding session SQLite migrations and agent-runtime stability. Maintainers are heavily focused on correcting regressions in the 2026.10.x series, particularly on Windows and Linux Gateway deployments.

## 2. Releases
*No new releases were published in the last 24 hours.*

## 3. Project Progress
*   **UI/UX Improvements:** Significant effort was invested into polishing the "Control UI," including better handling of rejected attachments (#178942, #178952), loading state indicators (#178939, #178951), and visual alignment for subagent status (#178946).
*   **Agent Lifecycle:** Progress was made on streamlining the "Claw" publishing flow (#178925) and fixing context-loss bugs where `claude-cli` sessions were reset by subagent completions (#178955).
*   **Search/Router:** Development has begun on integrating Tavily search directly through ClawRouter (#178957).
*   **Cleanup:** The team is aggressively pruning low-value tests to reduce CI overhead (#178949, #178935, #178930).

## 4. Community Hot Topics
*   **#120385 (Tool Catalog Issues):** With 18 comments, this remains the most debated issue. It highlights critical friction in the code-mode tool catalog, specifically regarding missing MCP tools in scheduled/cron turns.
*   **#172091 (SQLite WAL Contention):** With 13 comments, this critical bug involving permanent blocking of shared-state WAL checkpoints on Windows is causing service-impacting failures for long-running gateways.
*   **#164972 (Multi-Agent Team Failures):** 10 comments reflect the complexity of debugging multi-agent coordination within the `claude-cli` runtime, where failures are often masked as successes.

## 5. Bugs & Stability
*   **Critical (P0/P1) Regressions:**
    *   **#178960:** Windows migration blocked by transcript metadata mismatches. *No fix PR currently linked.*
    *   **#178937:** Cron heartbeat loops causing severe system resource drain on 2026.10.5. *No fix PR.*
    *   **#178908:** Shared OAuth refresh leads to database corruption/fencing issues. *No fix PR.*
    *   **#178804:** Codex plugin causing process accumulation (EAGAIN/PID limits). *No fix PR.*
*   **Known Fixes In Progress:**
    *   **#177956:** Fix for transcript admission conflict/fallback chain loops is in progress.
    *   **#177968:** Patch to address `EXDEV` errors in `doctor` when home directories span multiple filesystems.

## 6. Feature Requests & Roadmap Signals
*   **Post-Quantum Security:** #178844 proposes a Post-Quantum P2P transport layer via Montana Protocol, signaling a push toward more secure, decentralized autonomous agent communication.
*   **Automation Control:** Feature requests for granular cron filtering (#177342) and webhook handling (#171273) suggest that users are pushing OpenClaw toward becoming a full-fledged automation platform rather than just a chat assistant.
*   **Prediction:** Expect the next release to prioritize "Gateway Stability," with a heavy focus on migration patches and the formalization of the "cron context" contract (#178933).

## 7. User Feedback Summary
Users are currently reporting significant friction with:
*   **Update Reliability:** Frequent failures in `doctor --fix` and binary update processes are causing downtime for Linux/Windows users.
*   **UI Discoverability:** Users find the lack of process information and confusing session loading states in the web UI frustrating.
*   **Migration Pain:** Users upgrading from older versions (2026.7.x) to recent beta releases (2026.10.x) are encountering frequent database migration blocks, leading to "unusable" gateways.

## 8. Backlog Watch
*   **#158912:** `MEMORY.md` injection failure persists since September, despite being a core documentation feature. 
*   **#156983:** Cron-related message loss and session rebound issues remain unresolved and impact stable users.
*   **#146791:** iOS push notification registration failures remain a release-blocker for stable mobile users.

---

## Cross-Ecosystem Comparison

### **1. Ecosystem Overview**
The open-source AI agent ecosystem as of October 2026 is shifting from experimental "chat-wrapper" functionality to complex, gateway-based automation platforms. Projects are currently struggling with the "hard problems" of agentic infrastructure: cross-platform session persistence, secure memory isolation, and database migration stability. While development velocity remains extremely high, the community is moving toward a mandatory "hardening" phase, prioritizing architectural security and multi-tenant reliability over simple feature expansion.

### **2. Activity Comparison**
| Project | Issues/PRs (24h) | Release Status | Health Score* |
| :--- | :--- | :--- | :--- |
| **OpenClaw** | 583 | Stable/Bottlenecked | 6/10 (High regression) |
| **Hermes** | 72 | Maintenance | 7/10 (Stable/Hardening) |
| **IronClaw** | 12 | Stable | 8/10 (Slow/Focused) |
| **QwenPaw** | 45 | v2.3.0 Prep | 8/10 (High velocity) |
| **ZeroClaw** | 65 | Hardening | 7/10 (Security focus) |
*\*Health Score is a subjective metric based on bug-to-feature ratio, PR-to-merge speed, and reported stability.*

### **3. OpenClaw’s Position**
OpenClaw acts as the "Reference Implementation" for the ecosystem, commanding the largest community activity (500+ PRs in motion). Its primary advantage is its comprehensive breadth, effectively positioning itself as a full-fledged automation platform. However, it suffers from "first-mover" technical debt; its reliance on complex SQLite migration logic and monolithic gateway architectures has made it the most prone to P0/P1 regression cycles compared to the more modular or focused approaches of QwenPaw or IronClaw.

### **4. Shared Technical Focus Areas**
*   **Security & Isolation:** Both **ZeroClaw** (principal-based trust) and **OpenClaw** (transcript metadata) are struggling with context-leakage and multi-agent security boundaries.
*   **Gateway Reliability:** **OpenClaw**, **Hermes**, and **ZeroClaw** all report systemic issues with daemon reloads, SQLite WAL contention, and connection "zombie" states.
*   **Standardization (MCP):** **IronClaw** and **QwenPaw** are driving the push toward standardized plugin interfaces and host/agent contracts (e.g., Plazmi, `window.QwenPaw`), signaling a move away from vendor-locked, monolithic codebases.

### **5. Differentiation Analysis**
*   **OpenClaw:** The "Generalist." Prioritizes deep integration (Tavily, Claude-cli) and complex automation workflows (cron/webhooks).
*   **Hermes Agent:** The "Memory-Centric" platform. Focused on managing persistent state across multiple user profiles and large-scale memory budgeting.
*   **IronClaw:** The "On-Chain/Sovereign" specialist. Focuses on decentralized agent-to-blockchain interactions and lightweight hosted MCP endpoints.
*   **QwenPaw:** The "Mobile/Cross-Platform" player. Leading the effort for mobile-first agent standardization (HarmonyOS) and UI-friendly skill development.
*   **ZeroClaw:** The "Security-First" architecture. Currently auditing and hardening internal state machines and memory recall mechanisms to prevent systemic leaks.

### **6. Community Momentum & Maturity**
*   **High-Velocity Iteration:** **QwenPaw** and **OpenClaw** are the most active; QwenPaw is successfully channeling this energy into a structured release cycle (v2.3.0), whereas OpenClaw is currently reactive, struggling with high-volume technical debt.
*   **Hardening/Maturation:** **Hermes** and **ZeroClaw** are the most mature regarding security and infrastructure concerns, choosing to sacrifice new features to resolve fundamental systemic bugs.
*   **Niche/Stable:** **IronClaw** operates at a lower volume but holds the most distinct roadmap, focusing on long-term decentralization rather than immediate UI/UX feature parity.

### **7. Trend Signals**
*   **From Assistant to Platform:** The decline of "chat" as the primary value prop. Users demand "Cron/Webhook/Automation" triggers, effectively turning agents into headless background processes.
*   **Security Debt:** The "Agent-Injection" vector is becoming a primary concern. Developers should anticipate mandatory, model-backed tool approval gates (e.g., QwenPaw #8283) becoming the industry standard.
*   **Modular Extensibility:** The push for "Plazmi" and generic MCP extensions suggests that "Native" agent features are being deprecated in favor of pluggable, third-party provider architectures. This will likely kill off proprietary integration strategies by Q3 2027.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest: 2026-10-21

## 1. Today's Overview
The Hermes Agent project shows high velocity today, with 72 total items (22 issues, 50 PRs) updated or created. Development focus is currently heavily tilted toward stabilizing core infrastructure, with significant attention on session persistence, memory management, and cross-platform gateway reliability. While activity is high, the backlog of systemic bugs—particularly regarding output truncation and multi-profile session management—indicates that the project is currently in a "stabilization and hardening" phase rather than a purely feature-driven one.

## 2. Releases
*   **None.** No new releases were cut in the last 24 hours.

## 3. Project Progress
Today saw 8 PRs merged or closed, with significant movement toward refining the agent's internal tools and installation reliability:
*   **Memory Hygiene:** Continued progress on memory curation logic, specifically addressing how the agent manages its 2200-character `MEMORY.md` limit (#69264, #140848).
*   **Credential Management:** Improvements to cross-profile credential rotation on the dashboard (#142103).
*   **Installer Reliability:** Fixes for `uv` isolation during PM migration (#124313) and improved desktop-to-gateway process smoke testing (#142322).
*   **Tooling:** Support added for `memory(action="read")` in the dispatcher (#11548).

## 4. Community Hot Topics
*   [#135039](https://github.com/NousResearch/hermes-agent/issues/135039) **Memory Budgeting:** With 11 comments, this is the most discussed item. Users are concerned about the latency and cost of injecting large `MEMORY.md`/`USER.md` files into every turn, highlighting a need for a "size budget" and better distinction between global vs. session-specific facts.
*   [#142036](https://github.com/NousResearch/hermes-agent/issues/142036) **Gateway Logging:** This bug is causing significant friction (8 comments) as gateway restarts lead to silent logging failures, effectively blinding developers to runtime issues.
*   [#142037](https://github.com/NousResearch/hermes-agent/issues/142037) **UI Stale States:** 7 comments regarding the Desktop UI failing to update the "model label" correctly after a switch, impacting UX clarity.

## 5. Bugs & Stability
*   **Critical (P2/Systemic):** Issue [#110126](https://github.com/NousResearch/hermes-agent/issues/110126) highlights a systemic failure class regarding DeepSeek V4 output truncation, with over 35 related reports.
*   **Persistence (P2):** Issue [#142330](https://github.com/NousResearch/hermes-agent/issues/142330) reports a `RuntimeStoreError` where epoch-bumping bricks a gateway's write capability, requiring a full restart.
*   **Connectivity (P2):** Issue [#139662](https://github.com/NousResearch/hermes-agent/issues/139662) reports that message platform sessions (Discord, Feishu, WeCom) become unresumable from the Desktop after a gateway restart.
*   **Regressions:** PR [#142335](https://github.com/NousResearch/hermes-agent/pull/142335) addresses a browser-tool failure when CDP ports change, highlighting the fragility of real-profile attachments.

## 6. Feature Requests & Roadmap Signals
*   **Unified Multi-Profile Control:** High interest in a global command interface (`--all-profiles`) to avoid repetitive maintenance tasks across profiles (#142331).
*   **Advanced Billing:** Introduction of "usage-window" plan support suggests the project is preparing for more complex monetization or tiering of agent resources (#142308).
*   **Desktop Onboarding:** Demand for Weixin/WeChat QR-code onboarding within the Desktop UI to mirror existing CLI capabilities (#142323).

## 7. User Feedback Summary
Users are experiencing "tool fatigue" and configuration fragmentation. The pain points center on the difficulty of maintaining state across multiple profiles (credentials, history, and memory). There is a clear divide between the power-user CLI experience and the Desktop UI, with users reporting inconsistent behavior between the two, particularly regarding session visibility and model switching.

## 8. Backlog Watch
*   [#89166](https://github.com/NousResearch/hermes-agent/issues/89166): A long-standing (since Aug 18) issue regarding session lease waiting flooding gateways. This appears to be a high-impact performance bottleneck for users sharing sessions across multiple processes.
*   [#81281](https://github.com/NousResearch/hermes-agent/issues/81281): A complex sandbox/Docker egress networking bug that remains open since August, likely hindering users on hardened, rootless Docker environments.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest: 2026-10-21

## 1. Today's Overview
The IronClaw project is currently experiencing a focused period of activity centered on resolving network security and local connectivity constraints within its "Hosted MCP" (Model Context Protocol) architecture. Development efforts are split between routine dependency maintenance and critical refinements to how local agents interact with hosted environments. The project remains in a healthy, active state, with 12 total items (PRs and issues) receiving updates in the last 24 hours, signaling steady progress toward improving local agent sovereignty and extensibility.

## 2. Releases
*No new releases identified for this period.*

## 3. Project Progress
*   **Dependency Maintenance:** The team cleared a small backlog of dependency updates, closing two PRs ([#7386](https://github.com/nearai/ironclaw/pull/7386), [#8048](https://github.com/nearai/ironclaw/pull/8048)) related to `dompurify` and `fast-uri`.
*   **Infrastructure:** Seven open PRs remain under active review, dominated by automated dependency bumps (Rust, Python/uv, and JS packages) and one significant architectural improvement to the MCP endpoint registration process.

## 4. Community Hot Topics
*   **[#2077] Contract source for market.near.ai:** This long-standing request remains a focal point for the developer community. Users are pushing for transparency regarding the `market.near.ai` contract source to enable "sovereign agents" that can perform on-chain interactions independently of IronClaw’s proprietary HTTP APIs.
*   **[#8136] Proposal: Optional hosted-MCP Plazmi extension:** A new request proposing the use of declarative extension surfaces for third-party companion tools. This highlights a community desire to move away from vendor-locked logic in favor of a modular, plugin-based architecture.

## 5. Bugs & Stability
*   **[#8146] Hosted MCP Endpoint Registration (High Severity):** Current `main` builds reject all HTTP and IP-literal endpoints, effectively breaking local Connector registration. 
    *   **Fix Status:** PR [#8147](https://github.com/nearai/ironclaw/pull/8147) has been submitted to allow explicit trusted enrollment of loopback (127.0.0.1) endpoints, which is a necessary workaround for local development and private credential-account setups.

## 6. Feature Requests & Roadmap Signals
*   **Agent Sovereignty:** The trend toward on-chain agent operation is clear. I anticipate upcoming roadmap items will likely focus on "Agent-Native Auth," moving beyond hosted HTTP APIs toward direct blockchain-interaction primitives.
*   **Modular Extensibility:** The proposal for [Plazmi](https://plazmi.gg) integration ([#8136](https://github.com/nearai/ironclaw/issues/8136)) suggests that the project is maturing toward a "plugin-first" model, allowing developers to extend host functionality without modifying core infrastructure.

## 7. User Feedback Summary
Users are currently expressing frustration with the rigidity of the Hosted MCP security model. Specifically, local developers find the restriction on IP-literal endpoints hindering their ability to test and deploy local agent connectors. There is a palpable desire for more "open" and "local-first" developer experiences, moving away from centralized infrastructure dependencies.

## 8. Backlog Watch
*   **[#2077](https://github.com/nearai/ironclaw/issues/2077) (Market Contract Source):** This issue has been open since April 2026. While technically an older request, it represents a core pillar of the project's promise of decentralized agency. It is currently awaiting a response from the core maintainers regarding the feasibility of open-sourcing the market contract.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest: 2026-10-21

## 1. Today's Overview
The QwenPaw project shows high development velocity heading into the v2.3.0 cycle, with 45 total PR/Issue updates in the last 24 hours. Current efforts are heavily focused on system stability—specifically addressing regression issues in Desktop tooling and platform-specific channel connectivity—and preparing for a major modularity refactor. Project health remains strong, with a healthy ratio of bug fixes being pushed alongside long-term architectural improvements.

## 2. Releases
*   **No new releases.** The project continues to operate on the 2.2.2-beta release track, with active work on the upcoming v2.3.0.

## 3. Project Progress
Recent PRs indicate a focus on refining the user experience and platform reliability:
*   **Console UI Fixes:** [#8339](https://github.com/agentscope-ai/QwenPaw/pull/8339) (merged) stabilized the conversation scroll-jump issue, resolving a major UI frustration.
*   **Tooling Resilience:** [#8346](https://github.com/agentscope-ai/QwenPaw/pull/8346) (merged) fixed packaging errors for data-app uploads, and [#8215](https://github.com/agentscope-ai/QwenPaw/pull/8215) (merged) addressed LM Studio compatibility regarding audio input limits.
*   **Security:** [#8283](https://github.com/agentscope-ai/QwenPaw/pull/8283) (merged) implemented a decision-model-backed tool approval mode, enhancing safety for agent operations.

## 4. Community Hot Topics
*   **[#8071] Feature: Plugin-facing theme extension:** Plugin developers are requesting deeper theme integration (semantic token overrides) beyond the current simple color accents. This reflects a growing ecosystem of third-party QwenPaw plugins requiring better aesthetic parity with the core UI.
*   **[#8311] [Plugins/HarmonyOS] Request for Standardization:** A significant discussion regarding unifying the `window.QwenPaw` contract for HarmonyOS. This signals the project's ambition to become a cross-platform standard for mobile AI agents.

## 5. Bugs & Stability
*   **Critical:** [#8315](https://github.com/agentscope-ai/QwenPaw/issues/8315) - **Feishu Connection Failure:** Proxy injection issues prevent the Feishu channel from connecting. This is a high-severity bug for enterprise users relying on proxy-heavy environments.
*   **High:** [#8320](https://github.com/agentscope-ai/QwenPaw/issues/8320) - **Desktop Validation Regression:** The `make-skill` validator fails due to module import errors on Windows. A fix is in progress via [#8344](https://github.com/agentscope-ai/QwenPaw/pull/8344).
*   **Medium:** [#8340](https://github.com/agentscope-ai/QwenPaw/issues/8340) & [#8249](https://github.com/agentscope-ai/QwenPaw/issues/8249) - **Cron Job UI bugs:** Several reports of cron job editors failing to save correctly or hanging, impacting task automation reliability. A fix is pending in [#8349](https://github.com/agentscope-ai/QwenPaw/pull/8349).

## 6. Feature Requests & Roadmap Signals
*   **v2.3.0 Lightness:** The upcoming v2.3.0 release is explicitly focused on "making QwenPaw lighter and more extensible" ([#8289](https://github.com/agentscope-ai/QwenPaw/issues/8289)). Expect major refactoring of plugin architectures and internal memory management.
*   **Realtime Voice:** [#7785](https://github.com/agentscope-ai/QwenPaw/pull/7785) remains an ongoing, large-scale feature integration that will likely define the next major functional milestone.

## 7. User Feedback Summary
Users are generally appreciative of the rapid bug-fixing pace but are encountering "friction" in enterprise-grade deployments (proxy issues, environment-specific install failures). There is high demand for better plugin/theme documentation and more robust validation for the `make-skill` CLI, which is currently a point of frustration for desktop-based skill developers.

## 8. Backlog Watch
*   **[#7565](https://github.com/agentscope-ai/QwenPaw/pull/7565):** Plugin clean unload/hot reload. This PR has been open since September 4th and is critical for the v2.3.0 modularity goal. Maintainers should prioritize reviewing this to unblock the extensibility roadmap.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest: 2026-10-21

## 1. Today's Overview
ZeroClaw is experiencing an intense period of architectural hardening and security auditing. Activity over the last 24 hours has been dominated by a high volume of open issues and PRs (65 combined), primarily focused on correcting scoping leaks, enforcing system limits, and improving the robustness of the daemon-gateway lifecycle. The project health appears stable but under pressure, as the team shifts from feature expansion to addressing significant technical debt regarding cross-agent memory isolation and security boundaries.

## 2. Releases
*   **None.** No new releases were cut in the last 24 hours. Development remains focused on fixing critical bugs identified in the `v0.8.x` branch.

## 3. Project Progress
*   **Status Update:** While 50 PRs were updated, only one was merged/closed, indicating that the maintainers are currently in a heavy review cycle, particularly for complex architectural refactors.
*   **Security Enforcement:** PR [#11910](https://github.com/zeroclaw-labs/zeroclaw/pull/11910) is a critical move to enforce the system prompt size budget, changing it from an advisory limit to a "fail-closed" gate to prevent context exhaustion.
*   **Gateway Reliability:** PR [#11901](https://github.com/zeroclaw-labs/zeroclaw/pull/11901) addresses the issue of "zombie" connections following daemon reloads, ensuring graceful drainage of active gateway sessions.

## 4. Community Hot Topics
*   **Security & Trust Boundaries:** Issue [#11914](https://github.com/zeroclaw-labs/zeroclaw/issues/11914) (RFC: principal-based trust boundaries) is the most critical discussion point. It serves as a unified umbrella for recent leakage issues, signaling a transition toward a more rigorous access-control model for memory and capabilities.
*   **Memory Isolation:** Issue [#11912](https://github.com/zeroclaw-labs/zeroclaw/issues/11912) highlights a vulnerability where cross-agent content leaks occur due to memory-injection path bypasses. This is a high-priority architectural concern for multi-tenant deployments.

## 5. Bugs & Stability
*   **S2 (Degraded Behavior):** [#11912](https://github.com/zeroclaw-labs/zeroclaw/issues/11912) Memory recall bypasses per-agent scoping; [#11896](https://github.com/zeroclaw-labs/zeroclaw/issues/11896) Embedder failures causing memory recall to hang the entire agent turn.
*   **S3 (Minor Issues):**
    *   [#11916](https://github.com/zeroclaw-labs/zeroclaw/issues/11916): Quiet cron results erroneously appearing in web chat logs.
    *   [#11904](https://github.com/zeroclaw-labs/zeroclaw/issues/11904): SQLite connection collision on cron startup.
    *   [#11902](https://github.com/zeroclaw-labs/zeroclaw/issues/11902): OIDC token rejection during JWKS fetches.
*   **Fixes in Progress:** PR [#11918](https://github.com/zeroclaw-labs/zeroclaw/pull/11918) targets the cron result spam, while [#11901](https://github.com/zeroclaw-labs/zeroclaw/pull/11901) addresses the daemon reload connection leaks.

## 6. Feature Requests & Roadmap Signals
*   **UX/UI Refinements:** User requested a toggle for the "Thinking" box to remain collapsed ([#11919](https://github.com/zeroclaw-labs/zeroclaw/issues/11919), PR [#11920](https://github.com/zeroclaw-labs/zeroclaw/pull/11920)). Given the immediate PR submission, this is likely to appear in the next patch release.
*   **Tooling Expansion:** Community members continue to contribute third-party providers, such as the Firecrawl web search tool ([#11680](https://github.com/zeroclaw-labs/zeroclaw/pull/11680)) and the Opper model provider ([#11584](https://github.com/zeroclaw-labs/zeroclaw/pull/11584)).

## 7. User Feedback Summary
*   **Pain Points:** Users are struggling with the transition between daemon states (reloads dropping connections, fresh data dir setup issues).
*   **Security Concerns:** Users are identifying significant security gaps regarding default-open permissions in Telegram bots ([#11913](https://github.com/zeroclaw-labs/zeroclaw/issues/11913)) and the lack of enforcement on system prompt budgets.
*   **Developer Sentiment:** There is a strong, collaborative push from the community to fix these gaps, evidenced by the high number of contributor-led bug reports and fixes.

## 8. Backlog Watch
*   [#11705](https://github.com/zeroclaw-labs/zeroclaw/issues/11705): Proposal for Plazmi MCP demonstration. This is an important educational asset that hasn't received significant traction yet.
*   [#11680](https://github.com/zeroclaw-labs/zeroclaw/pull/11680): Firecrawl provider integration. This needs a maintainer security review given the `risk:high` label applied to new web search tool integrations.

</details>