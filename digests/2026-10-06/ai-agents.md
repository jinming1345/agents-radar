# OpenClaw 生态日报 2026-10-06

> Issues: 500 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-10-06 02:29 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目摘要：2026-10-06

## 1. 今日概览
OpenClaw 仓库目前正处于极高的活跃度，过去 24 小时内处理了 1,000 个合并事件（Issues/PRs）。开发重点目前集中在密集的“去臃肿（deslopping）”与性能重构阶段，工程团队正致力于将 Gateway 线程的开销卸载到独立的 worker 中。尽管项目在持续发布 beta 更新，但高频的“P0”级崩溃循环和内存泄漏报告表明，当前的发布周期处于显著的不稳定期。

## 2. 版本发布
*   **[v2026.10.1-beta.1](https://github.com/openclaw/openclaw/releases/tag/v2026.10.1-beta.1)：** 本次发布专注于状态和会话的持久性。关键改进包括：在注册表变更后保持使用状态、启用远程工作区 worker 挂载、以及迁移嵌入缓存。重要的是，此补丁修复了由排队取消和副本别名对齐导致的会话挂起问题。

## 3. 项目进展
*   **重构与清理：** 正在进行大规模的运行时和脚本“去臃肿”工作（例如 [PR #165914](https://github.com/openclaw/openclaw/pull/165914)，[PR #165908](https://github.com/openclaw/openclaw/pull/165908)），以移除冗余类型并整合契约。
*   **Gateway 性能：** 在将大量的注册表工作从主线程移出 ([PR #165684](https://github.com/openclaw/openclaw/pull/165684)) 以及隔离副本 worker 队列 ([PR #165836](https://github.com/openclaw/openclaw/pull/165836)) 方面取得了重大进展。
*   **修复：** 解决了涉及中断重启的问题 ([PR #165782](https://github.com/openclaw/openclaw/pull/165782))，并改进了 Anthropic/Claude CLI 的进程退出错误处理 ([PR #165769](https://github.com/openclaw/openclaw/pull/165769))。

## 4. 社区热点
*   **[#143524](https://github.com/openclaw/openclaw/issues/143524) (108 条评论)：** Windows 上的一个严重 SQLite WAL 文件膨胀问题（高达 2.8GB）。用户呼吁采用更稳健的自动检查点（auto-checkpointing）策略，因为目前它会阻塞 Gateway 启动。
*   **[#149361](https://github.com/openclaw/openclaw/issues/149361) (50 条评论)：** 一个追踪 WebUI 性能的总览 issue。社区正在汇总复现证据，表明 UI 延迟和稳定性依然是顶级的痛点。
*   **[#119720](https://github.com/openclaw/openclaw/issues/119720) (23 条评论)：** 关注因同步代理持久化导致的 Gateway 事件循环阻塞，这是高负载场景下反复出现的瓶颈。

## 5. Bug 与稳定性
*   **P0 (关键)：**
    *   [#159662](https://github.com/openclaw/openclaw/issues/159662)：`prepared-model-catalog.worker.js` 中存在无限制的内存泄漏（约 4-5 GB/h）。
    *   [#161953](https://github.com/openclaw/openclaw/issues/161953)：Windows 平台特有的会话创建回归问题；已在当前周期解决并关闭。
    *   [#164396](https://github.com/openclaw/openclaw/issues/164396)：Windows 11/Node 22 下全新安装 (v2026.9.8) 时的连接失败问题。
*   **稳定性趋势：** 多份报告 ([#160548](https://github.com/openclaw/openclaw/issues/160548), [#159596](https://github.com/openclaw/openclaw/issues/159596)) 指出了一种“内存锯齿”模式：worker 的堆内存增长至极限，触发基于内存压力的回收机制，导致活跃任务被杀掉，进而产生服务降级的恶性循环。

## 6. 功能需求与路线图信号
*   **包管理：** [PR #165906](https://github.com/openclaw/openclaw/pull/165906) 预计很快会合并，允许运维人员从 Gateway 选择确切的包版本，这是生产环境稳定性所迫切需要的功能。
*   **Android 支持：** 社区对以聊天为先的 Android 移动端界面持续关注 ([Issue #46058](https://github.com/openclaw/openclaw/issues/46058))；但维护者尚未发出正式的合并信号。

## 7. 用户反馈总结
用户对“破坏性”更新的频率感到不满，特别是那些导致 Gateway 处于未验证状态的更新失败问题 ([#157319](https://github.com/openclaw/openclaw/issues/157319))。从稳定版向 beta 版的过渡导致插件处理和内存管理出现了严重的回归行为，给自托管实例带来了巨大的阻碍。

## 8. 待办事项关注
*   **[#51441](https://github.com/openclaw/openclaw/issues/51441)：** 一个自 2026 年 3 月以来的长期需求，要求公开实际的后端模型名称（例如 GPT-5.4）而不是仅显示别名，这对排查 LiteLLM 等 LLM 路由代理至关重要。
*   **[#77733](https://github.com/openclaw/openclaw/issues/77733)：** 一个关于纯 `/new` 命令的人物问候语触发器的遗留回归问题，目前正在等待产品经理/维护者的决策。

---

## 横向生态对比

### **跨项目对比报告：个人 AI 智能体生态系统**
**日期：** 2026-10-06

#### 1. 生态系统概览
开源 AI 智能体领域目前正处于“稳定化阵痛期”，各项目正从重原型的实验阶段向生产级的运行时稳健性转型。整个生态系统的一个共性主题是从简单的聊天界面转向复杂的、状态管理的智能体工作流（SOP、多智能体监管以及持久化工具编排）。尽管创新步伐依然迅猛，但开发体验目前受到了本地运行时管理、沙箱安全以及状态持久化等方面严重回归问题的困扰。

#### 2. 活动对比
| 项目 | 未解决 Issue | 未处理 PR | 发布状态 | 健康度评分 (1-10) |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 高 | 高 | Beta (活跃) | 4 |
| **Hermes Agent** | 中 | 中 | 停滞 | 6 |
| **IronClaw** | 低 | 低 | 稳定 (1.4.1) | 7 |
| **QwenPaw** | 中 | 中 | 开发中 | 5 |
| **ZeroClaw** | 中 | 高 | 实验性 | 3 |

*健康度评分反映了当前稳定性及 Bug 修复比率。*

#### 3. OpenClaw 的定位
OpenClaw 是生态系统中的“高频参考”项目。其主要优势在于快速的功能迭代和先进的性能重构（如线程卸载、Worker 隔离），使其在原始能力方面成为最具野心的项目。然而，这是以牺牲稳定性为代价的；它是目前同期项目中“最容易崩溃”的，其特征是 P0 级内存泄漏和严重的回归问题。虽然其社区规模远超其他项目，但它目前正处于“去冗余”阶段以修复技术债，而像 IronClaw 这样的同行则优先考虑完善稳定性。

#### 4. 共享技术关注点
*   **沙箱安全：** 多个项目（QwenPaw、ZeroClaw）正在应对操作系统级的沙箱故障（Firejail/Bubblewrap/COM 自动化），这凸显了向更严格的环境隔离转变的趋势。
*   **状态持久化与恢复：** 所有项目都在解决“过时状态”或配置损坏的问题。IronClaw 和 OpenClaw 都在积极重构浏览器/守护进程状态的同步方式，以确保会话的连续性。
*   **服务商 API 管理：** 对标准化路由和凭证管理的需求（避免触发速率限制封禁并管理各服务商的特定头部信息）是 OpenClaw、QwenPaw 和 Hermes 共同面临的瓶颈。

#### 5. 差异化分析
*   **OpenClaw：** 专注于**运行时性能**和大规模架构扩展。目标用户：高级用户/企业。
*   **Hermes Agent：** 专注于 **CLI/更新流水线加固**和多用户配置文件管理。目标用户：DevOps/系统集成商。
*   **IronClaw：** 专注于**统一通信**（SMS/iMessage 集成）和稳定的 WebUI。目标用户：效率提升爱好者。
*   **QwenPaw：** 专注于**工具/插件互操作性**和智能体文件管理。目标用户：研究人员/多智能体开发者。
*   **ZeroClaw：** 专注于 **SOP 驱动的工作流**和“本地优先”隐私。目标用户：关注安全的进阶工作流设计师。

#### 6. 社区动力与成熟度
*   **高频迭代中：** OpenClaw 和 ZeroClaw 发展最快，引入了最重大的破坏性变更。它们风险更高，但处于功能的最前沿。
*   **趋于稳定：** IronClaw 依然是最成熟且“生产就绪”的，侧重于优化而非无谓的功能堆砌。
*   **停滞/维护中：** Hermes Agent 目前处于维护间歇期，优先修复 Bug 和处理技术债，而非部署新功能。

#### 7. 趋势信号
*   **“SOP”转向：** 开发者们正超越被动的聊天模式，转向“标准作业程序”框架，即智能体执行多步逻辑门控。
*   **服务商透明度：** 用户正强烈要求后端模型路由的可见性（例如，明确自己是在调用 GPT-5.4 还是代理别名），这预示着 LLM 路由正向着信任与透明的方向发展。
*   **本地优先的韧性：** 针对基于网络的 UI 同步所带来的反复痛点，暗示了个人助理向纯本地或离线可用架构发展的趋势，旨在避免会话数据“陈旧”或“丢失”。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目摘要：2026-10-06

## 1. 今日概览
Hermes Agent 项目目前处于高强度的维护状态，过去 24 小时内记录了 100 次总更新（50 个 issue / 50 个 PR）。开发重心集中在强化 `hermes update` 流水线，以及稳定多平台（Windows、Linux 和 macOS）上的会话管理。尽管期间没有发布新版本，但社区正积极处理长期存在的架构缺口，特别是关于 Kanban 编排和代理可靠性方面的问题。

## 2. 发布记录
*   *过去 24 小时内无新版本发布。*

## 3. 项目进展
*   **更新程序加固：** 为稳定 `hermes update` 进行了大量改进。PR #132361 和 PR #132386 专注于为 git/ZIP 交换过程创建崩溃安全（crash-safe）的提交点，确保更新过程具备幂等性且能从中断中恢复。
*   **CLI 与插件发现：** PR #133624 修复了一个问题，即独立的 MCP 探测器无法加载已启用的插件密钥源，确保诊断结果能真实反映运行环境。
*   **压缩：** PR #133625 为上下文压缩器引入了可选的“热切换”（warm handoff），允许服务器在总结过程中潜在地重用 prompt 缓存。
*   **TUI/UX：** PR #133626 修补了桌面编译器（desktop composer），以保留斜杠命令补全时的尾随空格。

## 4. 社区热点
*   **[#125727] 自动化 Nous 集成受阻：** 26 条评论。一个影响核心文件（`agent_init.py`、`context_compressor.py` 等）的复杂合并冲突导致 Nous 到 Enterkey 的迁移陷入停滞。[查看 Issue](https://github.com/NousResearch/hermes-agent/issues/125727)
*   **[#40239] 葡萄牙语 (pt-BR) 支持：** 14 条评论。尽管后端已支持，但桌面 UI 本地化的需求日益增长。[查看 Issue](https://github.com/NousResearch/hermes-agent/issues/40239)
*   **[#35986] Kanban 编排：** 7 条评论。关于多代理可靠性、过期检测和子代理监管的持续讨论。[查看 Issue](https://github.com/NousResearch/hermes-agent/issues/35986)

## 5. Bug 与稳定性
*   **关键/高优先级：** 
    *   **[#132817] 凭据冷却：** 用户反馈单次 `429` 错误会导致凭据被封禁数天，且缺乏明确的重置途径。[查看 Issue](https://github.com/NousResearch/hermes-agent/issues/132817)
    *   **[#131578] 网关/子代理挂起：** 后台进程正在重新绑定聊天路由，导致对话卡顿长达 30 分钟。[查看 Issue](https://github.com/NousResearch/hermes-agent/issues/131578)
*   **回归/平台：** 
    *   **[#133622] Sudo/身份验证：** 由于 `stdin` 重定向问题，`sudo` 无法在后台进程中进行身份验证。[查看 Issue](https://github.com/NousResearch/hermes-agent/issues/133622)
    *   **[#133608] 存储泄漏：** 桌面编译器中的图像（截图/粘贴内容）从未被清理，导致用户数据目录空间膨胀。[查看 Issue](https://github.com/NousResearch/hermes-agent/issues/133608)

## 6. 功能请求与路线图信号
*   **配置文件管理：** [#133623] 需求：内置空闲配置文件关闭和 `state.db` 清理功能，以取代手动 GC 脚本。[查看 Issue](https://github.com/NousResearch/hermes-agent/issues/133623)
*   **上下文流水线：** [#35325] 追求“五层上下文流水线”，以匹配 Claude Code 的功能水平。[查看 Issue](https://github.com/NousResearch/hermes-agent/issues/35325)

## 7. 用户反馈摘要
用户对项目多用户/多配置文件的架构持肯定态度，但也遇到了一些“管理”上的痛点。常见的挫折包括：难以从瞬态 API 速率限制中轻松恢复、缺乏对临时会话制品（日志、图像和过期构建戳）的自动清理，以及在 Windows 环境下更新软件时存在阻力。

## 8. 待办事项监控
*   **[#35325] 五层上下文流水线：** 自 2026 年 5 月起停滞；需要架构调整以达到与竞争对手同等水平。[查看 Issue](https://github.com/NousResearch/hermes-agent/issues/35325)
*   **[#40239] I18n 葡萄牙语：** 自 2026 年 6 月起开放；社区兴趣高涨，但 UI 翻译工作流的决策尚未落地。[查看 Issue](https://github.com/NousResearch/hermes-agent/issues/40239)

---

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目日报 – 2026-10-06

### 1. 今日概览
IronClaw 今日发展势头稳健，主要聚焦于基础设施调试及通信能力扩展。工作进度均匀分布在优化自托管实例的用户界面（UI）以及集成第三方消息服务上。虽然今日未发布新版本，但核心团队与社区保持着良好的维护和功能开发节奏，确保项目在可靠性与连接性目标上稳步前行。

### 2. 版本发布
*   **无。** 过去 24 小时内未发布新版本。当前稳定版本仍为 1.4.1。

### 3. 项目进展
*   **合并/关闭的 PR：** 无。
*   **正在进行的工作：** 开发重点集中在 WebChat 界面；已提交 PR [#8125](https://github.com/nearai/ironclaw/pull/8125) 以解决浏览器标签页在后台运行时的状态同步问题，确保用户无需手动刷新即可获取实时更新。

### 4. 社区热点
*   **每日故障分类 ([#8126](https://github.com/nearai/ironclaw/issues/8126))：** 该持续分析主题强调了当前的性能瓶颈，特别是涉及 `officeqa` 基准测试时，`DeepSeek-V4-Flash` 模型出现反复的数值错误。这表明后续需重点优化代理框架（agent framework）内的模型导航与推理精度。
*   **WebChat 用户体验担忧 ([#8124](https://github.com/nearai/ironclaw/issues/8124))：** 用户反馈动作状态显示“过时”。这是一个关键的讨论点，因为它暴露了在自托管且非 HTTPS 环境下通知可靠性存在的缺口，表明需要一种不单纯依赖现代浏览器推送通知标准的、更健壮的事件处理机制。

### 5. Bug 与稳定性
*   **关键（状态陈旧）：** [Issue #8124](https://github.com/nearai/ironclaw/issues/8124) 详细说明了在后台标签页中无法刷新运行状态和通知收件箱的问题，特别是在普通的 HTTP 部署环境下。
    *   *缓解措施：* [PR #8125](https://github.com/nearai/ironclaw/pull/8125) 目前正在进行中，旨在通过在窗口获取焦点时强制刷新状态来解决此问题。
*   **中度（基准测试失败）：** [Issue #8126](https://github.com/nearai/ironclaw/issues/8126) 指出 `officeqa` 测试套件中有 37 个测试未通过。虽然不属于“崩溃”，但这表明模型可靠性有所下降，需要对模型参数进行调整或优化提示词（prompt）。

### 6. 功能需求与路线图信号
*   **通信扩展：** [PR #8127](https://github.com/nearai/ironclaw/pull/8127) 提议添加 **Sendblue iMessage 与短信扩展**。这标志着 IronClaw 正向着统一通信中心迈进，使代理程序能够直接与移动消息生态系统交互。鉴于拟议实现的成熟度，极有可能在近期的版本中被合并。

### 7. 用户反馈摘要
目前的反馈集中在自托管部署的障碍上。在标准“localhost”或安全 HTTPS 环境之外运行的用户发现，WebUI 的现有架构（假设现代浏览器支持后台任务）会导致较差的用户体验（数据陈旧）。目前对于这些特定的基础设施设置，存在对更优雅的降级方案或替代同步方法的明确需求。

### 8. 待办事项关注
*   **需维护者关注：** [Issue #8126](https://github.com/nearai/ironclaw/issues/8126) 和 [Issue #8124](https://github.com/nearai/ironclaw/issues/8124) 均为近期提出，但涉及核心功能。团队应优先审查 [PR #8125](https://github.com/nearai/ironclaw/pull/8125)，以防止“状态陈旧” Bug 延续到下一个开发周期。

---

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目摘要：2026-10-06

## 1. 今日概览
QwenPaw 仓库目前正处于高活跃度状态，过去 24 小时内共有 43 个活跃 Issue 和 25 个 PR 得到更新。社区焦点主要集中在稳定性上，重点在于解决与各类 LLM 提供商（OpenCode, DeepSeek, OpenAI）交互时反复出现的 400 系列错误，以及修复 Windows 平台上的沙箱安全回归问题。尽管今日没有发布新版本，但开发团队正忙于梳理与工具执行和前端响应相关的积压 Bug，这标志着 v2.2.x 系列正处于高强度的稳定阶段。

## 2. 版本发布
*   **无**（当前开发工作仍基于 v2.2.x，目前有多个 Beta 构建版本正在流传）。

## 3. 项目进展
*   **已合并/关闭的 PR：**
    *   [PR #8113](https://github.com/agentscope-ai/QwenPaw/pull/8113)：将钉钉（DingTalk）通道逻辑迁移至独立的插件架构中，以提高可维护性并实现核心代码与特定厂商 SDK 的解耦。
    *   [PR #8104](https://github.com/agentscope-ai/QwenPaw/issues/8104)：针对 OpenCode API 新增了会话请求头（session header）要求。

## 4. 社区热点话题
*   [Issue #7599](https://github.com/agentscope-ai/QwenPaw/issues/7599)：**OpenCode 中的 MissingSessionID 问题。** 由于新的请求头要求较为严格，用户在连接模型时遇到困难。这凸显了针对特定提供商 API 变更完善文档的必要性。
*   [Issue #8022](https://github.com/agentscope-ai/QwenPaw/issues/8022)：**上下文污染（Context Pollution）。** AI 生成的问题报告显示，文件/图像处理产生的冗余信息正在污染对话历史，从而导致反复出现 400 错误。
*   [Issue #7991](https://github.com/agentscope-ai/QwenPaw/issues/7991)：**TaskTracker 不一致问题。** 全局任务统计与聊天特定 API 之间存在偏差，导致用户对资源利用情况产生困惑。

## 5. Bug 与稳定性
*   **高优先级（安全）：** [Issue #8002](https://github.com/agentscope-ai/QwenPaw/issues/8002) & [PR #8048](https://github.com/agentscope-ai/QwenPaw/pull/8048)。在 Windows 平台上，沙箱失效可能导致 Agent 触发意外的 Office COM 自动化操作。目前修复方案正在等待审核，以限制此类调用。
*   **中优先级（连通性）：** [Issue #8074](https://github.com/agentscope-ai/QwenPaw/issues/8074)。由于过时的令牌限制参数匹配，OpenAI 提供商的连接测试在针对现代 `gpt-6` 模型时失败。目前 [PR #8090](https://github.com/agentscope-ai/QwenPaw/pull/8090) 正在处理该问题。
*   **低优先级（UI/UX）：** [Issue #7948](https://github.com/agentscope-ai/QwenPaw/issues/7948)。Web 控制台设计缺陷阻碍了用户输入，[Issue #8094](https://github.com/agentscope-ai/QwenPaw/issues/8094) 则报告了由于 WebView2 缓存过期导致的启动失败。

## 6. 功能请求与路线图信号
*   **可观测性：** [Issue #8103](https://github.com/agentscope-ai/QwenPaw/issues/8103) 请求在守护进程执行静默模型回退（silent model fallbacks）时提供明确通知——这对高级用户而言是一项关键的透明度功能。
*   **工具/UI：** [Issue #7731](https://github.com/agentscope-ai/QwenPaw/issues/7731) 请求在文件面板增加“显示隐藏文件”开关，这表明项目正朝着更完善的文件管理环境迈进。

## 7. 用户反馈总结
用户普遍对“静默失败”模式感到沮丧，例如静默的模型回退以及 UI 超时后的静默任务终止。对 AI 生成的 Issue 报告（[Issue #8022](https://github.com/agentscope-ai/QwenPaw/issues/8022)）的依赖是一把双刃剑：它提供了丰富的日志，但偶尔也会引入干扰项，使得维护人员的手动问题跟踪变得困难。

## 8. 积压工作监控
*   [PR #7307](https://github.com/agentscope-ai/QwenPaw/pull/7307)：这是一项整合提供商/模型管理的大型重构，自 8 月底开启以来一直处于挂起状态。这对简化用户上手流程至关重要，但可能需要大量的审核资源。
*   [PR #7066](https://github.com/agentscope-ai/QwenPaw/pull/7066)：关于 OAuth2 刷新令牌持久化的修复，同样自 8 月起等待解决。这是长期集成如 XMind 等平台的一个潜在阻塞点。

---

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目摘要：2026-10-06

## 1. 今日概览
ZeroClaw 正处于高强度开发阶段，主要特征是大规模架构重构和紧急稳定性修复。目前项目有 24 个活跃议题和 50 个待处理 PR，重点工作在于强化运行时组合并稳定多模态交互。项目目前处于“高风险/高回报”状态，核心基础设施（如沙箱管理和持久化配置处理）正在进行重大整改，以解决严重的 S0/S1 级回归问题。

## 2. 发布版本
*2026-10-06 无新版本发布。*

## 3. 项目进展
*   **已合并/关闭的 PR：**
    *   [#11294](https://github.com/zeroclaw-labs/zeroclaw/issues/11294)：解决了 `parallel_runtime_test_gate.sh` 中因实例替换竞争条件导致的测试不稳定问题。
    *   [#11482](https://github.com/zeroclaw-labs/zeroclaw/issues/11482)：修复了 `zerocode/tui` 中的 UI 响应性 Bug，此前日志通知会阻塞关键的聊天更新。
    *   [#11533](https://github.com/zeroclaw-labs/zeroclaw/pull/11533)：改进了并行运行时测试中引导程序警告的测试隔离性。

## 4. 社区热点
*   [#5287](https://github.com/zeroclaw-labs/zeroclaw/issue/5287) **[功能]：紧凑型本地运行时配置** (10 条评论)：反映了社区对“本地优先”隐私和性能的强烈关注，特别是关于减少提示词冗余和防止指令泄露的需求。
*   [#10495](https://github.com/zeroclaw-labs/zeroclaw/issue/10495) **[Bug]：配置损坏** (6 条评论)：这是一个 S0 级关键优先级议题，`Config::save()` 会清空用户配置导致数据丢失。这是目前对用户信任度影响最大的风险点。
*   [#11418](https://github.com/zeroclaw-labs/zeroclaw/issue/11418) **[Bug]：TUI 中的复制按钮** (4 条评论)：虽然系统风险较低，但影响了高级用户的日常 UX，仍是一个摩擦点。

## 5. Bug 与稳定性
*   **[S0 - 严重] 配置损坏：** [#10495](https://github.com/zeroclaw-labs/zeroclaw/issue/10495) - `config.toml` 被近乎空白的文件替换。
*   **[S0 - 严重] 沙箱故障：** [#11540](https://github.com/zeroclaw-labs/zeroclaw/issue/11540) - Linux 环境下 `bubblewrap` 检测失败。
*   **[S1 - 高危] 沙箱工具错误：** [#11539](https://github.com/zeroclaw-labs/zeroclaw/issue/11539) 和 [#11538](https://github.com/zeroclaw-labs/zeroclaw/issue/11538) - `Firejail` 失败（无效的标志/目录），阻塞了 Shell 工具的执行。
*   **[S1 - 高危] 工作流阻塞：** [#11432](https://github.com/zeroclaw-labs/zeroclaw/issue/11432) - 守护进程崩溃导致会话永久处于“运行中”状态。

## 6. 功能请求与路线图信号
项目正明显转向 **“SOP (标准作业程序) 网关”** 模型，最近一批被搁置或正在进行的功能足以证明这一点：
*   [#11551](https://github.com/zeroclaw-labs/zeroclaw/issue/11551) 至 [#11546](https://github.com/zeroclaw-labs/zeroclaw/issue/11546)：全面推进可组合的子 SOP、持久化库分组以及显式审批网关。
*   随着这些功能从“搁置区”转入活跃开发，预计它们将在即将到来的 `v0.8.6` 发布周期中成熟。

## 7. 用户反馈总结
用户目前正在适应新的“工作区拆分 (workspace split)”架构，最主要的反馈集中在：
*   **插件不可见：** [#11519](https://github.com/zeroclaw-labs/zeroclaw/issue/11519) - 工作区拆分导致之前安装的插件在恢复过程中“丢失”。
*   **多模态摩擦：** 用户对严格的图像大小限制和缺乏智能缩减功能感到沮丧 ([#9887](https://github.com/zeroclaw-labs/zeroclaw/issue/9887))，这导致了不必要的错误。

## 8. 待办事项观察
*   [#9420](https://github.com/zeroclaw-labs/zeroclaw/pull/9420)：支持 Anthropic OAuth 配置。该功能自 7 月起一直处于待处理状态，是专业用户的一项重大便利性改进。
*   [#7891](https://github.com/zeroclaw-labs/zeroclaw/issue/7891)：信号媒体附件支持。这是一项呼声很高的频道增强功能，目前处于“暂存区”，不过最近的 PR [#11556](https://github.com/zeroclaw-labs/zeroclaw/pull/11556) 表明该事项终于有了进展。

</details>

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*