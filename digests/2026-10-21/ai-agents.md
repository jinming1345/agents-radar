# OpenClaw 生态日报 2026-10-21

> Issues: 83 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-10-21 02:44 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目摘要：2026-10-21

## 1. 今日概览
OpenClaw 正处于高速开发周期，近期围绕稳定性、UI 完善以及复杂的有限状态机边缘情况进行了大量工作。在过去 24 小时内，共有 83 个 Issue 得到更新，500 个 PR 处于活跃状态。受近期版本发布的影响，项目承受着巨大压力，尤其是在会话 SQLite 迁移和 Agent 运行时稳定性方面。维护者正集中精力修复 2026.10.x 系列中的回归问题，重点针对 Windows 和 Linux Gateway 的部署环境。

## 2. 版本发布
*过去 24 小时内没有发布新版本。*

## 3. 项目进展
*   **UI/UX 改进：** 大量精力投入到了“控制 UI”的优化中，包括对拒绝附件更好的处理（#178942, #178952）、加载状态指示器（#178939, #178951）以及子代理状态的视觉对齐（#178946）。
*   **Agent 生命周期：** 在精简“Claw”发布流程（#178925）以及修复因子代理完成而导致 `claude-cli` 会话重置的上下文丢失 Bug（#178955）方面取得了进展。
*   **搜索/路由：** 已启动通过 ClawRouter 直接集成 Tavily 搜索的开发工作（#178957）。
*   **清理工作：** 团队正在积极删除低价值测试，以降低 CI 开销（#178949, #178935, #178930）。

## 4. 社区热点
*   **#120385 (工具目录问题)：** 该议题有 18 条评论，是目前讨论最激烈的 Issue。它指出了代码模式工具目录中的关键摩擦点，特别是定时/cron 轮次中缺少 MCP 工具的问题。
*   **#172091 (SQLite WAL 争用)：** 该严重 Bug 有 13 条评论，涉及 Windows 上共享状态 WAL 检查点被永久阻塞，导致长效运行的网关出现影响服务的故障。
*   **#164972 (多代理团队故障)：** 10 条评论反映了在 `claude-cli` 运行时调试多代理协作的复杂性，故障通常会被掩盖为成功状态。

## 5. Bug 与稳定性
*   **严重 (P0/P1) 回归问题：**
    *   **#178960：** Windows 迁移因转录元数据不匹配而受阻。*目前尚无关联的修复 PR。*
    *   **#178937：** 2026.10.5 版本中的 Cron 心跳循环导致严重的系统资源耗尽。*尚无修复 PR。*
    *   **#178908：** 共享 OAuth 刷新导致数据库损坏/围栏（fencing）问题。*尚无修复 PR。*
    *   **#178804：** Codex 插件导致进程堆积（EAGAIN/PID 限制）。*尚无修复 PR。*
*   **已知正在修复的问题：**
    *   **#177956：** 正在修复转录准入冲突/回退链循环问题。
    *   **#177968：** 修复 `doctor` 在主目录跨越多个文件系统时出现的 `EXDEV` 错误。

## 6. 功能请求与路线图信号
*   **后量子安全：** #178844 提议通过 Montana 协议实现后量子 P2P 传输层，标志着项目正向更安全、去中心化的自主代理通信方向推进。
*   **自动化控制：** 关于细粒度 cron 过滤（#177342）和 Webhook 处理（#171273）的功能请求表明，用户正在推动 OpenClaw 从单纯的聊天助手转变为功能完善的自动化平台。
*   **预测：** 预计下一个版本将优先考虑“网关稳定性”，重点在于迁移补丁以及“cron 上下文”契约的规范化（#178933）。

## 7. 用户反馈摘要
用户目前反馈在以下方面存在显著摩擦：
*   **更新可靠性：** `doctor --fix` 和二进制更新过程频繁失败，导致 Linux/Windows 用户出现停机。
*   **UI 可发现性：** 用户认为 Web UI 缺乏进程信息，且会话加载状态令人困惑。
*   **迁移痛苦：** 从旧版本（2026.7.x）升级到近期 Beta 版本（2026.10.x）的用户频繁遇到数据库迁移阻塞，导致网关“不可用”。

## 8. 待办事项观察
*   **#158912：** 尽管是核心文档功能，但 `MEMORY.md` 注入失败的问题自 9 月以来一直存在。
*   **#156983：** 与 Cron 相关的消息丢失和会话回弹问题仍未解决，影响了稳定版用户。
*   **#146791：** iOS 推送通知注册失败，仍然是移动端稳定版用户的发布阻碍。

---

## 横向生态对比

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

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目摘要：2026-10-21

## 1. 今日概览
Hermes Agent 项目今日表现出极高的活跃度，共有 72 项内容（22 个 issue，50 个 PR）被更新或创建。开发重点目前高度倾向于稳固核心基础设施，重点关注会话持久化、内存管理以及跨平台网关的可靠性。尽管活动频繁，但积压的系统性 Bug（特别是关于输出截断和多配置文件的会话管理问题）表明，项目目前处于“稳定与加固”阶段，而非纯粹的功能驱动阶段。

## 2. 发布
*   **无。** 过去 24 小时内未发布任何新版本。

## 3. 项目进展
今日共有 8 个 PR 被合并或关闭，在优化 Agent 内部工具和安装可靠性方面取得了显著进展：
*   **内存清理：** 在内存管理逻辑上持续推进，特别优化了 Agent 如何管理其 2200 字符的 `MEMORY.md` 限制 (#69264, #140848)。
*   **凭据管理：** 改进了仪表板上跨配置文件的凭据轮换功能 (#142103)。
*   **安装可靠性：** 修复了 PM 迁移期间 `uv` 的隔离问题 (#124313)，并改进了桌面端到网关进程的冒烟测试 (#142322)。
*   **工具：** 在调度器中增加了对 `memory(action="read")` 的支持 (#11548)。

## 4. 社区热点
*   [#135039](https://github.com/NousResearch/hermes-agent/issues/135039) **内存预算：** 这是讨论最激烈的内容，共有 11 条评论。用户担心在每一轮对话中注入庞大的 `MEMORY.md`/`USER.md` 文件会带来延迟和成本问题，强调了设立“大小预算”以及区分全局事实与会话特定事实的必要性。
*   [#142036](https://github.com/NousResearch/hermes-agent/issues/142036) **网关日志：** 此 Bug 引起了很大困扰（8 条评论），因为网关重启会导致日志静默失败，使开发者在面对运行时问题时如同“盲人摸象”。
*   [#142037](https://github.com/NousResearch/hermes-agent/issues/142037) **UI 状态滞后：** 7 条评论指出，桌面端 UI 在切换后无法正确更新“模型标签”，影响了用户体验的清晰度。

## 5. Bug 与稳定性
*   **严重 (P2/系统性)：** Issue [#110126](https://github.com/NousResearch/hermes-agent/issues/110126) 指出了关于 DeepSeek V4 输出截断的系统性故障，目前已有超过 35 份相关报告。
*   **持久化 (P2)：** Issue [#142330](https://github.com/NousResearch/hermes-agent/issues/142330) 报告了一个 `RuntimeStoreError`，即 epoch 递增会使网关的写入功能失效，必须进行完整重启。
*   **连接性 (P2)：** Issue [#139662](https://github.com/NousResearch/hermes-agent/issues/139662) 报告称，网关重启后，桌面端无法恢复消息平台（Discord, Feishu, WeCom）的会话。
*   **回归问题：** PR [#142335](https://github.com/NousResearch/hermes-agent/pull/142335) 修复了当 CDP 端口更改时浏览器工具失效的问题，凸显了实时配置文件挂载的脆弱性。

## 6. 功能需求与路线图信号
*   **统一多配置文件控制：** 用户对全局命令行接口 (`--all-profiles`) 兴趣浓厚，旨在避免在各配置文件间进行重复的维护任务 (#142331)。
*   **高级计费：** 引入“使用窗口”计划支持，表明项目正准备对 Agent 资源进行更复杂的商业化或分级管理 (#142308)。
*   **桌面端入驻：** 市场需求强烈，希望在桌面 UI 内增加微信二维码入驻功能，以对齐现有的 CLI 能力 (#142323)。

## 7. 用户反馈总结
用户目前正经历“工具疲劳”和配置碎片化的问题。痛点集中在跨多个配置文件维护状态（凭据、历史记录和内存）的难度上。资深用户的 CLI 体验与桌面端 UI 体验之间存在明显割裂，用户反映两者行为不一致，特别是在会话可见性和模型切换方面。

## 8. 积压任务观察
*   [#89166](https://github.com/NousResearch/hermes-agent/issues/89166)：这是一个长期存在（自 8 月 18 日起）的问题，关于会话租约等待导致网关拥塞。对于在多个进程间共享会话的用户来说，这似乎是一个高影响力的性能瓶颈。
*   [#81281](https://github.com/NousResearch/hermes-agent/issues/81281)：一个复杂的沙箱/Docker 出站网络 Bug，自 8 月起一直未关闭，这可能阻碍了在强加固、无 Root 权限的 Docker 环境下运行的用户。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目摘要：2026-10-21

## 1. 今日概览
IronClaw 项目目前正处于一段专注期，重点在于解决其“Hosted MCP”（模型上下文协议）架构中的网络安全和本地连接限制问题。开发工作分为日常依赖维护和针对本地代理与托管环境交互方式的关键改进。项目目前保持健康活跃的状态，过去 24 小时内共有 12 项任务（PR 和 Issue）获得更新，标志着在提升本地代理自主权和可扩展性方面取得了稳步进展。

## 2. 发布版本
*本周期内未发布新版本。*

## 3. 项目进度
*   **依赖维护：** 团队清理了少量依赖更新积压，关闭了两个与 `dompurify` 和 `fast-uri` 相关的 PR（[#7386](https://github.com/nearai/ironclaw/pull/7386)、[#8048](https://github.com/nearai/ironclaw/pull/8048)）。
*   **基础设施：** 现有 7 个 PR 处于积极评审状态，主要涵盖自动依赖升级（Rust、Python/uv 以及 JS 包）以及一项针对 MCP 端点注册流程的重大架构改进。

## 4. 社区热点
*   **[#2077] market.near.ai 合约源码：** 这项长期存在的请求仍是开发者社区关注的焦点。用户正推动 `market.near.ai` 合约源码的透明化，以实现能够独立于 IronClaw 专有 HTTP API 进行链上交互的“主权代理”。
*   **[#8136] 提案：可选的 hosted-MCP Plazmi 扩展：** 一项新提案，建议为第三方配套工具使用声明式扩展界面。这凸显了社区希望摆脱厂商锁定逻辑，转向模块化、插件驱动架构的愿望。

## 5. Bug 与稳定性
*   **[#8146] Hosted MCP 端点注册（高优先级）：** 当前 `main` 分支的构建会拒绝所有 HTTP 和 IP 直连端点，实际上中断了本地 Connector 的注册。
    *   **修复状态：** PR [#8147](https://github.com/nearai/ironclaw/pull/8147) 已提交，旨在允许显式受信注册回环（127.0.0.1）端点，这是本地开发和私有凭证账户设置的必要变通方案。

## 6. 功能请求与路线图信号
*   **代理自主权（Agent Sovereignty）：** 代理向链上运行的趋势非常明显。预计接下来的路线图项目将集中在“代理原生认证（Agent-Native Auth）”上，从托管 HTTP API 转向直接的区块链交互原语。
*   **模块化可扩展性：** 关于 [Plazmi](https://plazmi.gg) 集成的提案（[#8136](https://github.com/nearai/ironclaw/issues/8136)）表明，该项目正趋向于“插件优先”模式，允许开发者在不修改核心基础设施的情况下扩展主机功能。

## 7. 用户反馈总结
用户目前对 Hosted MCP 安全模型的僵化表示不满。具体而言，本地开发者发现对 IP 直连端点的限制阻碍了他们测试和部署本地代理连接器。社区对“开放”和“本地优先”的开发体验有着强烈的渴望，希望能摆脱对中心化基础设施的依赖。

## 8. 积压任务跟踪
*   **[#2077](https://github.com/nearai/ironclaw/issues/2077) (Market 合约源码)：** 该议题自 2026 年 4 月以来一直处于开启状态。尽管从技术上讲这是一个较旧的请求，但它代表了项目承诺实现去中心化代理的核心支柱。目前正等待核心维护者就开源市场合约的可行性做出回应。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目摘要：2026-10-21

## 1. 今日概览
QwenPaw 项目在迈向 v2.3.0 周期时展现出极高的开发速度，过去 24 小时内共有 45 个 PR/Issue 更新。目前的工作重心在于系统稳定性——特别是解决桌面端工具的回归问题和特定平台的通道连接问题，并为大规模模块化重构做准备。项目整体健康状况良好，在推进长期架构改进的同时，保持了高质量的 Bug 修复进度。

## 2. 版本发布
*   **暂无新版本发布。** 项目目前处于 2.2.2-beta 发布轨道，开发重点已转向即将推出的 v2.3.0。

## 3. 项目进展
近期 PR 显示项目正致力于优化用户体验和平台可靠性：
*   **控制台 UI 修复：** [#8339](https://github.com/agentscope-ai/QwenPaw/pull/8339)（已合并）修复了对话列表滚动跳转问题，解决了用户界面的一大痛点。
*   **工具稳定性：** [#8346](https://github.com/agentscope-ai/QwenPaw/pull/8346)（已合并）修复了数据应用上传的打包错误，[#8215](https://github.com/agentscope-ai/QwenPaw/pull/8215)（已合并）解决了 LM Studio 在音频输入限制方面的兼容性问题。
*   **安全性：** [#8283](https://github.com/agentscope-ai/QwenPaw/pull/8283)（已合并）实现了由决策模型支持的工具审批模式，增强了 Agent 操作的安全性。

## 4. 社区热点讨论
*   **[#8071] 功能：面向插件的主题扩展：** 插件开发者要求除现有的简单颜色强调外，提供更深层的主题集成（语义标记重写）。这反映出第三方 QwenPaw 插件生态日益壮大，迫切需要与核心 UI 保持更好的美学一致性。
*   **[#8311] [插件/HarmonyOS] 标准化请求：** 关于统一 HarmonyOS 环境下 `window.QwenPaw` 契约的重要讨论。这表明该项目有志于成为移动端 AI Agent 的跨平台标准。

## 5. Bug 与稳定性
*   **关键级别：** [#8315](https://github.com/agentscope-ai/QwenPaw/issues/8315) - **飞书连接失败：** 代理注入问题导致飞书通道无法连接。对于依赖高代理环境的企业用户而言，这是一个高危 Bug。
*   **高优先级：** [#8320](https://github.com/agentscope-ai/QwenPaw/issues/8320) - **桌面端验证回归：** 由于 Windows 上的模块导入错误，`make-skill` 验证器失败。修复工作正在通过 [#8344](https://github.com/agentscope-ai/QwenPaw/pull/8344) 进行中。
*   **中优先级：** [#8340](https://github.com/agentscope-ai/QwenPaw/issues/8340) 和 [#8249](https://github.com/agentscope-ai/QwenPaw/issues/8249) - **定时任务 UI Bug：** 多份报告指出定时任务编辑器无法正确保存或出现卡顿，影响了任务自动化的可靠性。修复程序正在 [#8349](https://github.com/agentscope-ai/QwenPaw/pull/8349) 中等待处理。

## 6. 功能请求与路线图信号
*   **v2.3.0 轻量化：** 即将推出的 v2.3.0 版本明确旨在“使 QwenPaw 更轻量且更具可扩展性”([#8289](https://github.com/agentscope-ai/QwenPaw/issues/8289))。预计将对插件架构和内部内存管理进行重大重构。
*   **实时语音：** [#7785](https://github.com/agentscope-ai/QwenPaw/pull/7785) 仍是一项正在进行中的大型功能集成，这很可能成为下一个重要的功能里程碑。

## 7. 用户反馈总结
用户普遍赞赏快速的 Bug 修复节奏，但在企业级部署中遇到了一些“阻力”（如代理问题、特定环境下的安装失败）。用户对完善插件/主题文档的需求强烈，同时对于 `make-skill` CLI 的稳健性也提出了要求，这是目前桌面端技能开发者面临的主要痛点。

## 8. 积压工作监控
*   **[#7565](https://github.com/agentscope-ai/QwenPaw/pull/7565)：** 插件的干净卸载与热重载。该 PR 自 9 月 4 日起一直挂起，对于 v2.3.0 的模块化目标至关重要。维护者应优先审查此 PR，以解除可扩展性路线图上的障碍。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目摘要：2026-10-21

## 1. 今日概览
ZeroClaw 正处于架构加固和安全审计的集中攻关期。过去 24 小时内，项目活动主要集中在处理大量待处理议题（Issue）和拉取请求（PR，共计 65 个），重点在于修正作用域泄露、强制执行系统限制，以及提高守护进程-网关（daemon-gateway）生命周期的健壮性。项目运行状况总体稳定，但处于较大压力之下，团队重心已从功能扩展转向解决有关跨智能体内存隔离和安全边界的重大技术债务。

## 2. 发布记录
*   **无。** 过去 24 小时内没有发布新版本。开发工作仍专注于修复 `v0.8.x` 分支中发现的关键漏洞。

## 3. 项目进展
*   **状态更新：** 虽然有 50 个 PR 进行了更新，但仅有 1 个被合并/关闭，这表明维护者目前正处于繁重的审核周期，特别是在针对复杂的架构重构方面。
*   **安全合规：** PR [#11910](https://github.com/zeroclaw-labs/zeroclaw/pull/11910) 是一项关键举措，旨在强制执行系统提示词（system prompt）的大小预算，将原本的建议性限制改为“拒绝访问”式门禁，以防止上下文耗尽。
*   **网关可靠性：** PR [#11901](https://github.com/zeroclaw-labs/zeroclaw/pull/11901) 解决了守护进程重启后出现“僵尸”连接的问题，确保活跃的网关会话能够优雅地终止。

## 4. 社区热点
*   **安全与信任边界：** Issue [#11914](https://github.com/zeroclaw-labs/zeroclaw/issues/11914) (RFC: 基于主体的信任边界) 是目前最重要的讨论点。它将近期出现的泄露问题整合在一起，标志着项目正向更严格的内存和能力访问控制模型转型。
*   **内存隔离：** Issue [#11912](https://github.com/zeroclaw-labs/zeroclaw/issues/11912) 指出了一个漏洞，由于内存注入路径绕过问题，导致跨智能体内容泄露。对于多租户部署而言，这是一个高优先级的架构隐患。

## 5. 缺陷与稳定性
*   **S2 (降级行为)：** [#11912](https://github.com/zeroclaw-labs/zeroclaw/issues/11912) 内存召回绕过了单智能体的作用域限制；[#11896](https://github.com/zeroclaw-labs/zeroclaw/issues/11896) Embedder 故障导致内存召回操作阻塞整个智能体轮次。
*   **S3 (一般问题)：**
    *   [#11916](https://github.com/zeroclaw-labs/zeroclaw/issues/11916)：静默的 cron 结果错误地出现在网页聊天日志中。
    *   [#11904](https://github.com/zeroclaw-labs/zeroclaw/issues/11904)：cron 启动时的 SQLite 连接冲突。
    *   [#11902](https://github.com/zeroclaw-labs/zeroclaw/issues/11902)：JWKS 获取期间的 OIDC 令牌拒绝。
*   **修复进展：** PR [#11918](https://github.com/zeroclaw-labs/zeroclaw/pull/11918) 旨在修复 cron 结果冗余问题，而 [#11901](https://github.com/zeroclaw-labs/zeroclaw/pull/11901) 则致力于解决守护进程重启引发的连接泄露。

## 6. 功能需求与路线图信号
*   **UX/UI 优化：** 用户请求为“思考”框增加一个保持折叠状态的开关（[#11919](https://github.com/zeroclaw-labs/zeroclaw/issues/11919), PR [#11920](https://github.com/zeroclaw-labs/zeroclaw/pull/11920)）。鉴于已提交 PR，该功能很可能出现在下一个补丁版本中。
*   **工具扩展：** 社区成员持续贡献第三方提供程序，例如 Firecrawl 网络搜索工具 ([#11680](https://github.com/zeroclaw-labs/zeroclaw/pull/11680)) 和 Opper 模型提供程序 ([#11584](https://github.com/zeroclaw-labs/zeroclaw/pull/11584))。

## 7. 用户反馈摘要
*   **痛点：** 用户在守护进程状态切换过程中遇到困难（重启导致连接断开、数据目录初始化问题）。
*   **安全担忧：** 用户指出了 Telegram 机器人默认开放权限（[#11913](https://github.com/zeroclaw-labs/zeroclaw/issues/11913)）以及系统提示词预算强制执行缺失带来的重大安全隐患。
*   **开发者心态：** 社区展现出了强有力的合作意愿，致力于修复这些缺口，这一点从大量的贡献者报告的错误和提交的修复 PR 中可以得到印证。

## 8. 待办事项关注
*   [#11705](https://github.com/zeroclaw-labs/zeroclaw/issues/11705)：Plazmi MCP 演示提案。这是一个重要的教育性资源，但目前尚未获得足够关注。
*   [#11680](https://github.com/zeroclaw-labs/zeroclaw/pull/11680)：Firecrawl 提供程序集成。由于该功能被标记为 `risk:high`（高风险），因此在集成新的网页搜索工具前，需要维护者进行安全审查。

---

</details>