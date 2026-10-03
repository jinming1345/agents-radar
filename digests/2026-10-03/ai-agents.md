# OpenClaw 生态日报 2026-10-03

> Issues: 494 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-10-03 01:24 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目摘要 | 2026-10-03

## 1. 今日概览
OpenClaw 目前处于高强度的技术整合阶段。过去 24 小时内，共有 494 个活跃 Issue 和 500 个 PR 更新，开发节奏十分迅猛，重点在于对核心架构组件进行“去淤”（重构与去重）。项目组正在有效平衡 2026.9.x 系列的关键稳定性修复与大规模结构清理，以解决 Gateway 和代理生命周期管理中长期存在的技术债。

## 2. 版本发布
*   **v2026.8.35 (Extended-Stable/LTS):** 该版本作为当前的可靠性基准。它整合了 2026 年 8 月末的功能，并包含必要的安全补丁和性能修复。对于优先考虑稳定性而非 2026.9.x 测试版中快速迭代功能的开发者，建议使用此版本。

## 3. 项目进展
重构是今日 PR 的主旋律，核心在于统一内部逻辑：
*   **架构清理:** PR [#163919](https://github.com/openclaw/openclaw/pull/163919) 和 [#163892](https://github.com/openclaw/openclaw/pull/163892) 代表了大规模的“去淤”工作，分别删除了 Gateway 和 macOS 应用中数千行冗余代码。
*   **性能优化:** PR [#163605](https://github.com/openclaw/openclaw/pull/163605) 成功将异步转录读取任务移出 Gateway 主线程，这是防止事件循环卡顿的关键一步。
*   **CI/CD:** 通过 PR [#163905](https://github.com/openclaw/openclaw/pull/163905) 稳定了 CI 基础设施，锁定了 Bun 分支以确保测试环境的一致性。

## 4. 社区热点话题
*   **#116201 - 语音会话资源泄漏:** ([Link](https://github.com/openclaw/openclaw/issues/116201)) 拥有 59 条评论，是目前讨论最激烈的问题。用户对实时语音中无限制的状态保留感到担忧，指出需要更严格的所有权模型。
*   **#144911 - MCP 服务器超时崩溃:** ([Link](https://github.com/openclaw/openclaw/issues/144911)) 一个关键的崩溃循环 Bug，现已关闭。该问题凸显了社区对初始化超时期间脆弱的子进程清理路径的不满。

## 5. Bug 与稳定性
由于几个高影响的回归问题，稳定性依然是首要关注点：
*   **[P0] 崩溃循环:** Issue [#160521](https://github.com/openclaw/openclaw/issues/160521)（Gateway 状态数据库读取准入）和 [#161379](https://github.com/openclaw/openclaw/issues/161379)（模型目录刷新时的 CPU 绑定）表明 2026.9.6+ 版本中出现了严重的回归。
*   **[P1] 内存膨胀:** Issue [#160548](https://github.com/openclaw/openclaw/issues/160548) 报告 `prepared-model-catalog` 工作进程在 5 分钟内泄漏 1 GiB 内存，严重影响长期运行的实例。
*   **[P1] SSD 损耗:** Issue [#157989](https://github.com/openclaw/openclaw/issues/157989) 详述了插件过度复制/哈希的问题，存在硬件磨损风险；开发者需注意这是激进的插件运行时捕获所产生的副作用。

## 6. 功能需求与路线图预告
*   **代理级 Dreaming (Per-Agent Dreaming):** [#67413](https://github.com/openclaw/openclaw/issues/67413) 关注度持续上升。用户对全局定时任务（Cron jobs）导致的 “MemoryMax” 峰值感到困扰。
*   **路线图预测:** 未来的更新可能会引入更精细的后台任务（如 Dreaming、索引）资源控制，以防止当前积压任务中报告的 OOM 崩溃。

## 7. 用户反馈总结
用户普遍对代理生态系统的广度感到满意，但对“更新疲劳”和可靠性回归的抱怨日益增多。从年中发布版的稳定表现到当前 2026.9.x 的不稳定，给生产环境用户带来了摩擦，特别是在会话持久化和内存管理方面。

## 8. 待处理积压事项
*   **#114211 - Matrix 房间循环:** ([Link](https://github.com/openclaw/openclaw/issues/114211)) 一个自 7 月以来一直存在的复杂会话状态问题。涉及代理回复中的自持续循环，已被标记需维护者审查。
*   **#84037 - Codex 稳态 CPU 使用率:** ([Link](https://github.com/openclaw/openclaw/issues/84037)) 一个持续的性能问题，涉及辅助进程开销，仍需从产品层面决定如何管理 Codex 资源。

---

## 横向生态对比

## 跨项目分析报告：AI Agent 生态系统 (2026-10-03)

### 1. 生态概览
开源 AI Agent 生态目前处于“稳定性优先”阶段，正从快速实验性原型开发向严格的架构强化转型。各项目正集中精力解决状态持久化、内存管理以及跨网关通信等问题，以实现生产级的高可靠性。尽管开发速度依然极快，但社区对于“更新疲劳”以及结构稳定性优于功能堆砌的呼声日益高涨。

### 2. 活动对比

| 项目 | 活动中 Issue/PR | 近期活跃度 | 发布状态 | 健康评分* |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | ~994 | 积极 | v2026.8.35 (LTS) | 改善中 (通过重构) |
| **Hermes Agent** | ~100 | 高 | 近期无发布 | 混合 (侧重稳定性) |
| **QwenPaw** | ~100+ | 高 | 近期无发布 | 高 (侧重 UI) |
| **ZeroClaw** | 100 | 非常高 | v0.8.6 (待发布) | 强化中 |
| **IronClaw** | 0 | 休眠 | 无 | 停滞 |

*\*健康评分基于 PR/Issue 处理平衡度及报告的回归问题严重性，为定性评估。*

### 3. OpenClaw 的定位
OpenClaw 是目前生态系统中事实上的“重量级”参考架构。与其他项目相比，它管理着更大规模的技术债务，这既是其主要弱点，也是其规模的证明。虽然其他项目（如 QwenPaw/Hermes）专注于用户体验或容器化交互，但 OpenClaw 正优先进行核心的“去冗余”（deslopping）工作——这是项目走向成熟的必要阶段，使其区别于简单的单用户桌面助手，转而构建面向长周期、多 Agent 的企业级负载能力。

### 4. 共享技术关注点
*   **Agent 间 (A2A) 协议：** Hermes (#97681) 和 ZeroClaw (#11254) 均在制定跨实例与跨网关通信的标准。
*   **状态与内存可靠性：** 所有活跃项目面临的共性挑战是状态数据库的完整性（例如 OpenClaw 的会话泄漏、Hermes 的 `state.db` 损坏以及 QwenPaw 的 UI 分裂问题）。
*   **实时/语音接口：** OpenClaw 和 ZeroClaw 都在积极推进低延迟语音集成，标志着交互模式正从文本中心向多模态转型。

### 5. 差异化分析
*   **OpenClaw：** 专注于基础设施层性能、线程模型及重型持久化 Agent 生命周期管理。
*   **Hermes Agent：** 强调开发者工具链，特别是针对容器化环境以及 VS Code/CLI 的集成。
*   **QwenPaw：** UI/UX 优化的领先者，针对追求视觉反馈、易用性和直观对话管理的用户。
*   **ZeroClaw：** 定位为“企业强化版”，专注于身份管理、安全工具执行及细粒度的管理员控制。

### 6. 社区动力与成熟度
*   **快速迭代/不稳定：** **OpenClaw** 处于高风险、高回报的转型点。它是最活跃的项目，但也面临最明显的回归问题。
*   **成熟/强化中：** **ZeroClaw** 最具纪律性，明确聚焦于安全和身份访问控制，预示着向企业就绪迈进。
*   **用户体验导向：** **QwenPaw** 的界面正趋于成熟，注重移动端响应式设计和“细节优化”（papercut removal）。
*   **趋于稳定：** **Hermes Agent** 目前处于被动响应状态，主要精力在于处理缺陷报告而非功能扩展。

### 7. 趋势信号
*   **“Agent 漂移”（Agentic Drift）：** 用户当前的核心需求不再是“更多模型”，而是“更多控制”。无论是撤回消息（QwenPaw）、审计工具执行（ZeroClaw）还是人机协同审批（Hermes），用户都在要求为自主任务提供安全机制。
*   **硬件/系统感知：** 开发者开始将 Agent 视为系统进程而非简单的脚本，这反映在对 SSD 损耗、CPU 绑定和内存泄漏等问题的担忧上。
*   **去中心化趋同：** 对“Agent 间协作”的持续推动表明，下一代 Agent 将是多节点分布式网络，而非单一的本地绑定助手。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目摘要：2026-10-03

## 1. 今日概览
Hermes Agent 项目今日呈现出高速开发态势，过去 24 小时内共有 100 项 Issue 和 PR 获得更新。当前工作重点严重偏向稳定性，致力于推进社区贡献的合并，并解决 Windows 安装程序及会话状态管理中的回归问题。虽然今日未发布新版本，但大量涌入的错误报告（特别是关于容器化数据库损坏和桌面交互方面的问题）表明项目正处于稳定化阶段。

## 2. 版本发布
*过去 24 小时内无新版本发布。*

## 3. 项目进展
清理工作成效显著，今日共合并或关闭了 24 个 PR。主要改进包括：
* **会话持久化：** [#95822](https://github.com/NousResearch/hermes-agent/pull/95822) 已成功合入，确保流式助手响应在终端补全过程中保持持久。
* **看板修复：** [#131896](https://github.com/NousResearch/hermes-agent/pull/131896) 解决了看板订阅被错误地绑定到已废弃会话的问题。
* **工具防护栏：** [#131887](https://github.com/NousResearch/hermes-agent/pull/131887) 为内存工具添加了必要的验证，以防止畸形负载导致崩溃（关联 [#64291](https://github.com/NousResearch/hermes-agent/issue/64291)）。
* **生命周期管理：** [#95001](https://github.com/NousResearch/hermes-agent/pull/95001) 现在强制 Browser Use CLI 守护进程遵循闲置回收机制，防止僵尸进程产生。

## 4. 社区热点
*   **[#97681] 智能体间协作：** 此功能请求旨在使机器人能够在网关之间进行协作，目前已有 33 条评论，是关注度最高的话题。社区正积极讨论去中心化控制与无缝互操作性之间的权衡。
*   **[#123347] 网关死锁：** 目前正在调查群聊 worker 中的一个关键启动死锁问题，该问题凸显了 TUI/网关引导顺序中的痛点。

## 5. 缺陷与稳定性
*   **[#131851] 高优先级：** 报告指出在处理大数据集且容器异常关闭时，`state.db` 中的 FTS5 影子表 B-tree 出现严重损坏。
*   **[#128827] 中/高优先级：** Windows 更新期间反复出现“访问被拒绝”错误，原因是孤立进程占用了 `libcrypto` DLL 文件。
*   **[#131814] 中优先级：** 由于 Pydantic 对额外字段的校验过于严格，Vault 集成导致凭据被截断。
*   *注：* 今日已开启多个 PR（[#131881](https://github.com/NousResearch/hermes-agent/pull/131881), [#131906](https://github.com/NousResearch/hermes-agent/pull/131906)）专门针对上述稳定性缺陷。

## 6. 功能请求与路线图信号
*   **审批工作流：** [#131919](https://github.com/NousResearch/hermes-agent/pull/131919) 提出了一种受“Cowork”启发的安全机制，允许在无人值守的情况下运行，但在特定敏感全局匹配项（glob）上强制进行人工干预。
*   **UI/UX 优化：** [#91030](https://github.com/NousResearch/hermes-agent/issue/91030) 请求在桌面侧边栏中更清晰地分离项目（Projects）和会话（Sessions），以改善导航体验。

## 7. 用户反馈总结
用户目前对桌面应用程序的“隐形”故障感到沮丧（例如，不存在的配置文件的静默失败，并伴随晦涩的错误信息，详见 [#130166](https://github.com/NousResearch/hermes-agent/issue/130166)）。此外，聊天 UI 中反复出现的“重复渲染”问题虽然影响较小，但也影响了用户对助手体验的精致感观。

## 8. 待办事项观察
*   **[#111389](https://github.com/NousResearch/hermes-agent/issue/111389)：** 该对 `state.db` WAL 可靠性的重构对长期稳定性至关重要，但自 9 月中旬以来一直处于开放状态。随着数据损坏报告的增加，应将其优先纳入下一个里程碑。
*   **[#36763](https://github.com/NousResearch/hermes-agent/issue/36763)：** 一个长期存在的 UI 缺陷，导致 macOS Electron 环境下回复重复且消息顺序颠倒，目前仍未解决。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目摘要 (2026-10-03)

### 1. 今日概览
QwenPaw 目前处于高强度的开发周期中，重点在于 UI/UX 的深度打磨和关键后端优化。开发精力主要分配在修复控制台长期存在的“细枝末节”问题，以及解决与智能体稳定性、跨设备连接相关的复杂架构问题。项目整体健康度良好，大量已合并的改进清理了积压的功能需求，不过 V2.2.2.beta4 近期的稳定性报告显示，目前急需一个稳定性补丁。

### 2. 发布记录
*   过去 24 小时内**无新版本发布**。

### 3. 项目进展 (已合并/已关闭)
项目合并了一大批改进，主要集中在优化桌面端/控制台体验：
*   **UI/UX 增强：** 添加了聊天滚动锁定 ([#7356](https://github.com/agentscope-ai/QwenPaw/pull/7356))、工具调用可见性切换开关 ([#7357](https://github.com/agentscope-ai/QwenPaw/pull/7357))，并提升了游戏开发相关的文件语言支持 ([#7344](https://github.com/agentscope-ai/QwenPaw/pull/7344))。
*   **稳定性与配置：** 为桌面客户端启用了持久化窗口几何布局 ([#6877](https://github.com/agentscope-ai/QwenPaw/pull/6877)) 和针对不同媒体的内联容量设置 ([#7359](https://github.com/agentscope-ai/QwenPaw/pull/7359))。
*   **修复：** 解决了富文本聊天编辑器中输入光标可见性问题 ([#7347](https://github.com/agentscope-ai/QwenPaw/pull/7347))。

### 4. 社区热门话题
*   **[Issue #7997](https://github.com/agentscope-ai/QwenPaw/issues/7997)：** 支持消息撤回/编辑。（8 条评论）。*潜在需求：* 用户需要“有状态”的对话，以便在不开启新会话的情况下纠正 AI 错误或整理对话历史。
*   **[Issue #6281](https://github.com/agentscope-ai/QwenPaw/issues/6281)：** Web 控制台移动端适配。（6 条评论）。*潜在需求：* 可访问性，以及在离开桌面时监控长时间运行的智能体任务的需求。
*   **[Issue #2975](https://github.com/agentscope-ai/QwenPaw/issues/2975)：** 用户输入的 Markdown 渲染。（4 条评论）。*潜在需求：* UI 展示的一致性；用户期望输入框能支持与 AI 回复中相同的格式化效果。

### 5. Bug 与稳定性
*   **高优先级：** [Issue #8073](https://github.com/agentscope-ai/QwenPaw/issues/8073) 报告称，V2.2.2.beta4 版本在通过局域网 (LAN) 访问时无法进入对话页面。
*   **高优先级：** [Issue #8077](https://github.com/agentscope-ai/QwenPaw/issues/8077) 详细说明了影响 Qoder 中自定义模型和上下文计量器的三个缺陷。
*   **中优先级：** [Issue #8078](https://github.com/agentscope-ai/QwenPaw/issues/8078) 报告称跨会话消息会导致 UI 分裂，将单次对话拆分为多个页面。
*   **修复进行中：** PR [#8079](https://github.com/agentscope-ai/QwenPaw/pull/8079) 旨在解决配置重载超时问题，[#8084](https://github.com/agentscope-ai/QwenPaw/pull/8084) 旨在修复提示词截断期间的静默失败问题。

### 6. 功能需求与路线图信号
*   **去中心化智能：** [Issue #8080](https://github.com/agentscope-ai/QwenPaw/issues/8080) 请求实现跨实例智能体通信，这表明社区正在推动多节点/分布式部署。
*   **多模态扩展：** [Issue #8081](https://github.com/agentscope-ai/QwenPaw/issues/8081) / [PR #8083](https://github.com/agentscope-ai/QwenPaw/pull/8083) 提出的添加 `view_audio` 工具是一项高优先级任务，鉴于已有相关 PR，预计很快会合并。
*   **预计下一步重点：** 考虑到目前针对移动端侧边栏的大量工作 (PR #8086)，路线图目前正在优先提升移动端的响应式体验。

### 7. 用户反馈总结
用户普遍对该工具的深度表示满意，但正面临“复杂性壁垒”。反馈强调了对缺乏移动端监控智能体功能的不满，以及对更强大的对话历史管理（编辑/撤回）的渴望。近期 Beta 版本的更新引发了回归焦虑，用户报告了特定的局域网连接问题。

### 8. 积压任务观察
*   **[Issue #2975](https://github.com/agentscope-ai/QwenPaw/issues/2975)：** 输入框的 Markdown 渲染。该问题自 2026 年 4 月起一直悬而未决；虽然不是“关键性”中断，但对于高级用户来说，它仍然是一个频繁引起阻碍的点。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目摘要：2026-10-03

### 1. 今日概览
ZeroClaw 正处于高强度的开发周期中，过去 24 小时内共有 100 项内容（50 个 issue，50 个 PR）得到更新。项目目前高度聚焦于稳定 `v0.8.6` 版本，大量 PR 集中在安全性、身份验证及运行时稳健性方面。开发节奏异常迅猛，特别是在智能体工具执行、CLI/守护进程通信以及操作员用户体验（UX）领域，显示出项目正向企业级加固版本迈进。

### 2. 版本发布
*   **无。** 开发工作目前集中在 `v0.8.6` 版本的发布门槛上。

### 3. 项目进展
*   **PR 处理情况：** 虽然仅合并/关闭了 2 个 PR，但项目仍有大量处于积极评审阶段的大型（XL/L）PR。
*   **身份与安全：** `identity-access` 栈进展显著（#11265, #11264, #11313），旨在统一 CLI 和守护进程的授权机制。
*   **工具增强：** 提出了针对子进程的可选内存监控看门狗（#11456）以及工具协作式取消上下文（#11465）等新功能。
*   **可观测性：** 通过 PR #11414 引入了全新的“管理中心（Admin Hub）”以及针对 Web 网关的专注工作空间。

### 4. 社区热点
*   **[#8692] [Tracker]: RFC 维护者决策队列 (15 条评论):** 这仍然是设计和架构导向的核心枢纽。社区非常关注如何确保 RFC 和发布策略得到及时评审。
*   **[#11387] [Bug]: zerocode 启动目录回归 (5 条评论):** 社区高度关注如何恢复可预测的工作空间行为。这对于依赖 TUI 进行本地开发流程的用户至关重要。
*   **[#7943] [Feature]: 实时语音宿主通道 (5 条评论):** 在构建后端无关的语音接口方面存在重大的架构兴趣，表明用户希望超越基于文本的 LLM 交互。

### 5. Bug 与稳定性
*   **严重性 S1 (关键/阻塞):**
    *   [#11369] Docker 启动/数据库死锁: [已解决/已关闭] 修复了前一个补丁引入的数据目录锁定问题。
    *   [#10225] RPC 会话无法连接到通道支持的工具: 影响 ZeroCode 工作流；正在调查中。
    *   [#11418] 一键“复制”功能失效: 今日报告；这是一个影响 TUI 可用性的回归问题。
*   **严重性 S2 (性能降级):**
    *   [#11387] 工作空间 CWD 回归: 正通过 [#11219] 进行追踪。
    *   [#11336] 插件加载验证错误: 影响可扩展性。
    *   [#11333/11332] 技能评审/创建失败: 在非 CLI 通道中发现了学习循环的缺失。

### 6. 功能需求与路线图信号
*   **RAG 能力:** [#11235] 关于正式“知识语料库”文档检索系统的提案正获得越来越多的支持。
*   **A2A 协议:** [#11254] 关于跨领域 A2A crate 的 RFC，旨在标准化智能体间通信。
*   **预期:** 预计“管理中心”（#11414）和身份访问安全补丁将进入即将发布的稳定版本，因为它们属于高优先级的架构调整。

### 7. 用户反馈总结
当前的痛点集中在“高级用户”工作流（CLI、自定义插件）与 TUI/ZeroCode 体验之间的摩擦上。用户反馈称，通过 CLI 所做的配置并不总是能立即反映在守护进程中，从而造成了困惑。社区对在长时间运行的任务中获取子智能体和工具行为的透明度有着强烈且反复的诉求，这也体现在对可展开工具结果和活动监控的持续请求中。

### 8. 待办事项监控
*   **[#7468] 重命名 ZeroCode 中的非智能体别名:** 这是一项被暂时搁置的增强功能，但作为管理多个模型提供商的高级用户的刚需，它正不断被重新提起。
*   **[#9226] 评估工具集的内存播种:** 一项长期的测试基础设施需求，旨在提高沙箱环境中智能体评估的可靠性。
*   **[#7943] 实时语音宿主通道:** 需要架构上的批准，以最终确定 ZeroClaw 与外部音频提供商之间的契约。

</details>

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*