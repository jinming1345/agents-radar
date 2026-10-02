# OpenClaw 生态日报 2026-10-02

> Issues: 500 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-10-02 01:48 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目摘要：2026-10-02

## 1. 今日概览
OpenClaw 目前正承受巨大压力。随着项目在 2026.9.x 发布周期后出现稳定性回归，积压的问题（278 个活跃问题）和 PR（291 个待处理）数量激增。代码库目前面临严重的“崩溃循环”模式、核心工作进程内存泄漏，以及 Windows 和 Linux 平台上的数据库 I/O 压力。尽管维护人员正在积极合并热修复程序，但新 Bug 报告的高频出现表明，项目正处于恢复平台可靠性的“救火”阶段。

## 2. 版本发布
*   **v2026.8.34**：一个 `extended-stable`（等同于 LTS）版本。该版本整合了 2026 年 8 月底之前的所有修复，包括关键安全补丁、可靠性改进和扩展的模型支持。强烈建议目前在 2026.9.x 系列中遇到不稳定问题的用户回退到此稳定基准版本。

## 3. 项目进展
*   **PR #163074**：一个关键补丁，用于回传 2026.9.8 发布分支中遗漏的稳定性修复（涉及 Windows、性能和内存）。
*   **PR #163032**：合并了一项修复，解决了重试过程中补全回合（completion turns）中委托工具丢失的问题。
*   **重构与清理**：正在持续减少代码库冗余，特别是弃用预代理会话迁移逻辑（[PR #163160](https://github.com/openclaw/openclaw/pull/163160)）以及清理 WebUI 中的冗余浏览器词汇（[PR #163161](https://github.com/openclaw/openclaw/pull/163161)）。

## 4. 社区热点
*   **[Issue #143524](https://github.com/openclaw/openclaw/issues/143524)**（103 条评论）：Windows 上严重的 SQLite WAL 膨胀问题，文件增长至数 GB，导致网关启动失败。
*   **[Issue #153257](https://github.com/openclaw/openclaw/issues/153257)**（40 条评论）：用户报告称在升级至 2026.9.5 后经历了长达 8 小时的故障恢复。
*   **[Issue #149538](https://github.com/openclaw/openclaw/issues/149538)**（23 条评论）：在大规模（600+ 代理）集群中，网关 `/health` 探针超时和事件循环饥饿的报告。

## 5. Bug 与稳定性
*   **P0 - 紧急**：
    *   **内存泄漏**：`prepared-model-catalog.worker.js` 每小时泄漏 4-5 GB 内存（[Issue #159662](https://github.com/openclaw/openclaw/issues/159662)）。
    *   **Windows 回归**：近期版本中多次出现 `DataCloneError` 和 `Session creation` 失败的报告（[Issue #161953](https://github.com/openclaw/openclaw/issues/161953), [Issue #161828](https://github.com/openclaw/openclaw/issues/161828)）。
    *   **启动耗时**：插件数量导致网关启动时间超过 120 秒的限制（[Issue #155859](https://github.com/openclaw/openclaw/issues/155859)）。
*   **P1 - 重要**：
    *   **僵尸进程**：未回收的 Hook/Tool 子进程导致运行时性能下降（[Issue #97616](https://github.com/openclaw/openclaw/issues/97616)）。

## 6. 功能需求与路线图信号
*   **安全控制**：社区强烈要求在 `exec-approvals` 中增加黑名单模式，以补充现有的白名单机制（[Issue #6615](https://github.com/openclaw/openclaw/issues/6615), [Issue #71097](https://github.com/openclaw/openclaw/issues/71097)）。
*   **可审计性**：用户请求为代理内存变更提供审计日志，以提高透明度和安全取证能力（[Issue #20935](https://github.com/openclaw/openclaw/issues/20935)）。

## 7. 用户反馈总结
社区目前普遍感到“升级疲劳”。核心会话状态管理和数据库处理方面的频繁回归，导致用户花费大量时间在灾难恢复上，而非代理开发。社区强烈呼吁将项目重心从新功能转向加固数据库和 IPC（进程间通信）的稳定性。

## 8. 积压工作监控
*   **[Issue #114612](https://github.com/openclaw/openclaw/issues/114612)**：`memory-core` 中 SQLite 表的无限制增长。此问题自 7 月起一直存在，是导致长时间运行的网关出现磁盘写满问题的主要原因。
*   **[Issue #85030](https://github.com/openclaw/openclaw/issues/85030)**：子代理的 MCP 工具注入失败。这是一个复杂的 Bug，影响了核心扩展性，且受到社区高度关注（6+ 个互动）。

---

## 横向生态对比

本报告汇总了截至 2026 年 10 月 2 日的个人 AI Agent 生态系统现状。

### 1. 生态系统概况
开源 AI Agent 生态系统目前正从“功能扩张”阶段过渡到“稳定性强化”阶段。几乎所有主流项目都在努力平衡快速迭代与技术债务。该领域呈现出高波动性，向统一运行时和 Agent 代理框架的架构转型频繁导致非微小的回归问题。用户正日益表现出“更新疲劳”，比起添加复杂的新编排模型，用户更优先考虑核心可靠性和数据完整性。

### 2. 活动对比
| 项目 | 待处理问题 (Open Issues) | 待处理 PR | 发布状态 (24h) | 健康评分 |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 278 | 291 | v2026.8.34 (稳定版) | 临界 (处于救火状态) |
| **Hermes Agent**| ~100+ | 高 | 无 | 改善中 (稳定) |
| **IronClaw** | N/A | 低 | 无 | 稳定 (停滞) |
| **QwenPaw** | 活跃 | 活跃 | 无 | 强劲 (迭代中) |
| **ZeroClaw** | 88+ | 高 | 无 | 高强度/波动 |

### 3. OpenClaw 的定位
*   **优势：** 作为“核心参考”实现，OpenClaw 拥有最成熟的功能集，在企业级或大规模 Agent 集群管理方面覆盖最广。
*   **技术路线：** 独特地受到状态持久化和 I/O 瓶颈（SQLite WAL 文件臃肿）的困扰，这表明它比同行管理着更复杂的长期记忆状态。
*   **社区规模：** 规模巨大，但目前处于对抗状态；大量的待处理 PR (291) 表明该项目在维护者带宽和 PR 合并吞吐量方面陷入困境。

### 4. 共享技术重点领域
*   **会话持久化与恢复：** 所有项目（OpenClaw、Hermes、ZeroClaw）目前都在解决会话状态管理中的数据损坏或丢失问题。
*   **安全与权限范围：** ZeroClaw 和 OpenClaw 明显在推动“主体范围 (Principal-scope)”安全机制，并防止 Agent 间委派过程中的权限提升。
*   **开发者体验 (DevEx)：** 在“锁文件 (lockfile)”和依赖管理方面普遍存在困难（Hermes 的 `uv.lock` 问题、QwenPaw 的 CJK/媒体格式问题、IronClaw 的工作区植入问题）。

### 5. 差异化分析
*   **目标用户：** OpenClaw 面向集群管理（600+ 个 Agent）；QwenPaw 倾向于“顾问/执行者 (Advisor/Worker)”的多 Agent 编排；IronClaw 专注于“无进程 (processless)”认证 (IdentyClaw)；Hermes 专注于桌面/UI 体验。
*   **架构：** ZeroClaw 正转向高度统一、强化的运行时，而 QwenPaw 则优先考虑跨模型兼容性（DeepSeek/OpenAI/GPT-6）。

### 6. 社区动力与成熟度
*   **快速迭代：** **QwenPaw** 和 **ZeroClaw** 最为活跃；它们在成功合并功能，但 ZeroClaw 为了追求速度而牺牲了稳定性。
*   **稳定性：** **OpenClaw** 目前处于强制稳定状态。它不再进行创新，而是退守到 LTS 基线 (`v2026.8.34`) 以维持生存。
*   **停滞：** **IronClaw** 显示出动力放缓的迹象；近期缺乏发布或合并的 PR 表明该项目要么处于架构成熟期，要么开发者活跃度有所流失。

### 7. 趋势信号
*   **从“Agent”到“编排器 (Orchestrator)”：** 项目正超越单 Agent 设置，转向双模型“顾问/执行者”架构 (QwenPaw)。
*   **人在回路 (HITL)：** 整个生态系统中出现了一种向标准化 `ask_user_question` 工具的明确趋势，表明自主 Agent 正触碰“信任壁垒”，需要人工验证才能继续执行。
*   **“数据库瓶颈”：** SQLite 和会话管理 Bug 在整个生态系统中的普遍性表明，Agent 的“记忆”组件是当前现代 Agent 栈中单一最大的故障点。开发者应优先考虑健壮的事务性持久化层，而不是新颖的 LLM 集成功能。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目摘要：2026-10-02

## 1. 今日概览
Hermes Agent 项目目前处于高强度的开发阶段，过去 24 小时内共有 100 项内容（问题与 PR）得到更新。开发重心主要集中在：稳定 Desktop 体验、修复网关/CLI 迁移流程中的回归问题，以及解决跨平台兼容性问题（尤其是 Windows 环境）。项目健康度显示核心维护者产出极高，但大量开放且活跃的问题表明，在会话管理和状态持久化方面仍存在严重的遗留技术债务。

## 2. 版本发布
*2026-10-02 未监测到新版本发布。*

## 3. 项目进展
今日涌现了一批针对稳定性和安全性的快速响应 PR：
* **MCP 合规性：** [#131078](https://github.com/NousResearch/hermes-agent/pull/131078) 在 CI 中引入了官方 MCP 一致性测试，修复了三个已识别的协议缺陷。
* **网关稳定性：** [#131071](https://github.com/NousResearch/hermes-agent/pull/131071) 通过正确识别作用域内的 cron 任务，优化了重启处理逻辑，防止了不必要的 30 分钟挂起。
* **安全加固：** [#131074](https://github.com/NousResearch/hermes-agent/pull/131074) 将备份归档文件的权限收紧至 0600，以防止敏感信息泄露。
* **Desktop 用户体验：** [#131072](https://github.com/NousResearch/hermes-agent/pull/131072) 添加了一项可选功能，支持在会话标签页中显示代理名称。

## 4. 社区热门话题
* **[#97681](https://github.com/NousResearch/hermes-agent/issue/97681) 让 Bot 跨网关协作 (30 条评论)：** 仍然是主要的长期架构重心。目前受限于“统一网关运行时”过渡任务 (#106742)。
* **[#127647](https://github.com/NousResearch/hermes-agent/issue/127647) Desktop 资源消耗追踪器 (26 条评论)：** 社区对降低闲置 CPU/GPU/内存占用关注度很高；该议题已成为性能调优的关键诊断中心。
* **[#127665](https://github.com/NousResearch/hermes-agent/issue/127665) Desktop 渲染双重回复 (21 条评论)：** 一个持续存在的 UI/状态同步 bug，会导致明显的显示异常，反映出前端覆盖层与 `state.db` 后端之间存在冲突。

## 5. Bug 与稳定性
* **高优先级 (P1)：**
    * [#122529](https://github.com/NousResearch/hermes-agent/issue/122529)：Cron 外部工作进程缺失 `ruamel` 的 `PYTHONPATH`。
    * [#130987](https://github.com/NousResearch/hermes-agent/issue/130987)：网关重启等待阻塞长耗时 cron 任务。*修复进行中：#131071。*
* **中优先级 (P2/回归问题)：**
    * [#127313](https://github.com/NousResearch/hermes-agent/issue/127313)：Desktop 面板中的右键菜单劫持问题。
    * [#131055](https://github.com/NousResearch/hermes-agent/issue/131055)：多实例启动时 Linux 桌面沙箱中毒。*修复进行中：#131067。*
    * [#129751](https://github.com/NousResearch/hermes-agent/issue/129751)：`pm/uv.lock` 版本不匹配导致工具更新失败。

## 6. 功能需求与路线图信号
* **代理个性化：** [#129686](https://github.com/NousResearch/hermes-agent/issue/129686) 请求支持新的决策模型（如 Jev、nimble）。
* **Desktop UI：** [#119120](https://github.com/NousResearch/hermes-agent/issue/119120) 请求支持更细粒度的 Windows 托盘/最小化行为控制。
* **可靠性：** [#13603](https://github.com/NousResearch/hermes-agent/issue/13603) 仍然是一项关键的功能请求，旨在实现更新过程中的稳健自动回滚机制，这将显著提升用户信任度。

## 7. 用户反馈摘要
用户正经历“更新疲劳”，并因 `pm`（包管理器）和 `uv` 锁文件不一致而感到技术困扰。Windows 和 macOS 上的稳定性目前波动较大，多份报告提到在常规安装期间出现“访问被拒绝”或超时错误。社区认可快速的 Bug 修复周期，但显然对当前多阶段迁移和运行时配置的复杂性感到吃力。

## 8. 待办事项观察
* **[#13603](https://github.com/NousResearch/hermes-agent/issue/13603)：** 关于回滚/自动回滚的功能请求。自 2026 年 4 月开启；对于安全更新具有极高的优先级。
* **[#61990](https://github.com/NousResearch/hermes-agent/issue/61990)：** 邮件发送输出截断问题。虽然已关闭，但这凸显了用户长期以来对处理大型代理输出的需求。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目摘要：2026-10-02

## 1. 今日概览
IronClaw 保持着稳定的开发进度，重点在于增强智能体（Agent）的持久性和基础设施的可靠性。目前的工作重心平衡于长期架构改进（如加密浏览器会话管理）与日常运维（如代码库知识图谱更新）之间。虽然项目处于活跃状态，但近期分类报告中显示的基准测试失败数量较多，表明工程团队在实现新功能的同时，正优先处理系统稳定性和调试工作。

## 2. 版本发布
*无。* 过去 24 小时内没有发布新版本。

## 3. 项目进展
过去 24 小时内没有合并或关闭的 PR。现有开放 PR 的开发工作仍在进行中：
*   **[PR #7988](https://github.com/nearai/ironclaw/pull/7988)**：由 `ironclaw-ci[bot]` 执行的自动化 CI 任务，用于刷新代码库知识图谱，确保智能体在引导时能够获取最新的项目上下文。

## 4. 社区热点
*   **[Issue #8121: Daily ironclaw failure taxonomy](https://github.com/nearai/ironclaw/issues/8121)**：这是跟踪项目健康状况的关键议题。它指出了 `clawbench` 套件中“工作区播种”（workspace-seeding）存在的重复缺陷。这表明尽管该项目拥有高质量的基准测试，但基础设施的不稳定性目前正在干扰自动化测试。
*   **[PR #7499: feat(identyclaw)](https://github.com/nearai/ironclaw/pull/7499)**：这是一个大型（XL）架构 PR，旨在通过主机中介接口集成“IdentyClaw Passport”。它解决了一个重要需求：使智能体能够在无需完整浏览器插件或外部 shell 依赖的情况下执行身份验证。

## 5. Bug 与稳定性
*   **严重性：高** - **[Issue #8121](https://github.com/nearai/ironclaw/issues/8121)** 报告在 `clawbench` 套件中有 128 个测试未通过。罪魁祸首似乎是“broken-workspace-seeding”缺陷。目前尚未有针对此问题的修复 PR。

## 6. 功能需求与路线图信号
*   **[Issue #2358: BrowserProfileStore trait](https://github.com/nearai/ironclaw/issues/2358)**：这是一项高优先级的功能需求，旨在允许智能体跨运行持久化浏览器会话（Cookie/IndexedDB）。考虑到该议题的提出时间（2026 年 4 月）及其作为“工作区”要求的地位，这很可能是未来版本中一个高优先级的架构目标，旨在提升持久化智能体的“类人”体验。

## 7. 用户反馈摘要
虽然直接的用户反馈有限，但围绕 **[PR #7499](https://github.com/nearai/ironclaw/pull/7499)** 的持续工作反映了一个明显的痛点：无进程（processless）智能体身份验证的摩擦力过大。从业者正要求更轻量级的身份管理方法，以摆脱对重型 shell 或基于插件的依赖。

## 8. 待办事项监控
*   **[Issue #2358](https://github.com/nearai/ironclaw/issues/2358)**：该议题自 2026 年 4 月起一直处于开放状态。由于它涉及安全问题（敏感令牌的加密 tarball 持久化），它代表了智能体可靠性方面的一个重大技术障碍，需要维护者介入才能从设计转向实现。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目摘要 (2026-10-02)

## 1. 今日概览
QwenPaw 展现出极高的开发活跃度，过去 24 小时内共有 16 次更新（7 个 issue，9 个 PR），标志着项目处于非常活跃的开发阶段。当前的开发重心已转向优化特定提供商（DeepSeek/OpenAI）的兼容性、强化安全性（路径清理）以及提升控制台扩展的开发者体验。总体而言，项目运行状况良好，但针对模型提供商集成复杂性方面的“成长阵痛”趋势较为明显。

## 2. 发布记录
*过去 24 小时内无新版本发布。*

## 3. 项目进展
*   **媒体/格式化逻辑：** 提交了 PR [#8069](https://github.com/agentscope-ai/QwenPaw/pull/8069) 和 [#8066](https://github.com/agentscope-ai/QwenPaw/pull/8066)（其中 #8069 已关闭/被取代），旨在解决向 DeepSeek 发送非图像媒体（PDF/音频）时的格式错误，以及处理零字节媒体块的问题。
*   **CJK 渲染：** PR [#8068](https://github.com/agentscope-ai/QwenPaw/pull/8068) 已关闭/完成评审，解决了 CJK 标点符号导致的 Markdown 加粗问题，展现了团队在提升非英语用户界面体验方面的积极态度。

## 4. 社区热点
*   **[#6274] 人机交互（Human-in-the-Loop）功能：** 关于 `ask_user_question` 工具的增强提案。这是目前最热门的讨论项，反映出用户对于代理（Agent）在执行高风险或模棱两可的任务前，通过咨询用户来做出决策的需求日益增长。
*   **[#8076] 重载/生命周期管理：** 讨论了重载 Agent 时出现的后台任务“卡死”问题，即清理超时可能长达 24 小时。社区强调了对更稳健的异步生命周期管理的需求。

## 5. Bug 与稳定性
*   **严重（Critical）：** [Issue #8064](https://github.com/agentscope-ai/QwenPaw/issues/8064) (DeepSeek 提供商会话崩溃) - 上传 PDF 会触发 400 错误，导致整个会话中断。*状态：打开。*
*   **高（High）：** [Issue #8074](https://github.com/agentscope-ai/QwenPaw/issues/8074) (OpenAI 提供商) - 由于限制性的白名单策略，导致无法兼容 `gpt-6` 系列模型。*状态：打开。*
*   **中（Medium）：** [Issue #8073](https://github.com/agentscope-ai/QwenPaw/issues/8073) (回归问题) - 用户反馈在 V2.2.2.beta4 版本中通过局域网访问时无法进入对话页面，暗示网络/代理处理方面可能存在回归。

## 6. 功能请求与路线图信号
*   **顾问模式（Advisor Mode）：** PR [#7569](https://github.com/agentscope-ai/QwenPaw/pull/7569) 是一项规模宏大（XXXL）的补充，将引入双模型范式（顾问/执行者）。这标志着项目正向更复杂的多 Agent 编排转型。
*   **插件 UX：** [Issue #8071](https://github.com/agentscope-ai/QwenPaw/issues/8071) 请求增加一个语义 Token 覆盖层，这表明第三方插件生态系统正在成熟，并要求更深入的控制台集成。

## 7. 用户反馈摘要
当前用户的情绪主要受集成摩擦的影响。尽管用户对平台的功能感到兴奋，但在更新 Beta 版本时（特别是 V2.2.2.beta4 的局域网访问问题）遇到了稳定性问题，同时还面临着未能跟上模型发布速度的僵化提供商约束（如 GPT-6 问题）。

## 8. 待办事项追踪
*   **[PR #7569] 顾问模式：** 尽管规模和影响巨大，该 PR 自 9 月 5 日开启以来尚未合并。其复杂性需要维护人员进行高层级审查，以确保其符合核心架构路线图。
*   **[Issue #6274] 人机交互：** 该功能对于“代理自主性”至关重要，且已搁置自 7 月以来。它仍然是下一个主要功能周期的关键候选项目，旨在弥合自动执行与用户控制之间的鸿沟。

---

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目摘要 - 2026-10-02

## 1. 今日概览
ZeroClaw 代码库正处于高强度工程开发的激增期，过去 24 小时内活跃的 issue 和 PR 总数达到 88 个。项目目前处于“稳定与安全加固”阶段，重点在于规范化 Agent 运行时、修补关键的主体范围（principal-scope）漏洞，并为即将到来的 v0.8.6 和 v0.9.0 版本最终确定插件基础设施。开发节奏极快，多项大型架构重构正在审核流程中推进。

## 2. 版本发布
*   **无新版本发布。**（注：开发工作正全力冲刺 v0.8.6 和 v0.9.0）。

## 3. 项目进展
虽然今天没有合并 PR，但在以下方面取得了重大进展：
*   **网关与核心集成：** 网关功能进展迅速，PR [#11381](https://github.com/zeroclaw-labs/zeroclaw/pull/11381)、[#11382](https://github.com/zeroclaw-labs/zeroclaw/pull/11382) 和 [#11417](https://github.com/zeroclaw-labs/zeroclaw/pull/11417) 致力于将会话管理、日志记录和配置统一集成到核心运行时中。
*   **安全与所有权：** 来自贡献者 *Aarlington* 的一系列大型 PR（[#11411](https://github.com/zeroclaw-labs/zeroclaw/pull/11411)、[#11410](https://github.com/zeroclaw-labs/zeroclaw/pull/11410)、[#11409](https://github.com/zeroclaw-labs/zeroclaw/pull/11408)）专注于强制执行私有运行所有权，并防止 Agent 委托过程中的权限提升。
*   **工具清单：** 工具注册表的规范化工作进展显著，包括二进制文件大小度量脚本（[#11306](https://github.com/zeroclaw-labs/zeroclaw/pull/11306)）和基于分级的工具清单管理（[#11308](https://github.com/zeroclaw-labs/zeroclaw/pull/11308)）。

## 4. 社区热点话题
*   **[#9600] [Tracker]: 会话持久化协议所有权：** (16 条评论) – 项目中争议最大的话题依然是会话持久化混乱的状态，目前四个独立的工作流存在冲突。
*   **[#9799] [Bug]: 守护进程 CPU 飙升：** (5 条评论) – 关于长期运行的临时守护进程 CPU 使用率达到 140-177% 的问题仍是高优先级关注点。
*   **[#10066, #10495, #11198]：** 一组 P0/S0 级别的严重 Bug（数据丢失和权限范围问题）正引起开发者的重点关注，因为它们对当前用户构成了严重威胁。

## 5. Bug 与稳定性
*   **S0 - 关键数据丢失：** [#10495](https://github.com/zeroclaw-labs/zeroclaw/issues/10495)（配置保存导致文件截断）和 [#11198](https://github.com/zeroclaw-labs/zeroclaw/issues/11198)（委托内存工具权限泄漏）是需要立即解决的最优先级事项。
*   **S1 - 工作流受阻：** [#11369](https://github.com/zeroclaw-labs/zeroclaw/issues/11369)（Docker 启动失败）和 [#11418](https://github.com/zeroclaw-labs/zeroclaw/issues/11418)（UI 剪贴板功能失效）正在影响今天的开发体验。
*   **回归问题：** [#11387](https://github.com/zeroclaw-labs/zeroclaw/issues/11387) 证实了一个关于启动目录行为的回归问题，该问题此前曾在 #10609 中出现过。

## 6. 功能需求与路线图信号
*   **模型路由 (Model Router)：** 社区持续呼吁引入 `llama.cpp` 模型路由（[#7539](https://github.com/zeroclaw-labs/zeroclaw/issues/7539)），以实现本地模型间的快速切换。
*   **无需 IdP 的认证：** 已计划开发本地用户名/密码 `AuthProvider`（[#8076](https://github.com/zeroclaw-labs/zeroclaw/issues/8076)），以支持更简便的部署。
*   **插件回滚：** 已验证的插件更新及失败回滚机制（[#10995](https://github.com/zeroclaw-labs/zeroclaw/issues/10995)）计划在 v0.8.6 周期内完成。

## 7. 用户反馈总结
*   **痛点：** 用户在配置/守护进程存储架构的迁移过程中遇到困难，特别是涉及数据目录锁定和配置文件完整性方面的问题。
*   **观察：** 用户对“无效”配置键（[#10781](https://github.com/zeroclaw-labs/zeroclaw/issues/10781)）感到沮丧，因为这些键让用户误以为自己能够控制内存/历史记录的使用。
*   **情绪：** 虽然社区对该平台的潜力评价依然很高，但 S0/S1 级回归问题的频率已使得稳定性成为社区的首要关切。

## 8. 待办事项监控
*   **[#7539](https://github.com/zeroclaw-labs/zeroclaw/issues/7539): Llama.cpp 模型路由。** 这是一个较早的功能需求（2026 年 6 月），尽管用户持续关注，但目前仍被标记为“搁置（icebox）”。
*   **[#9394](https://github.com/zeroclaw-labs/zeroclaw/issues/9394): 配对仪表板。** 这是一个已审计的 Bug，涉及未读取的配置字段和永不过期的配对码，已挂起超过两个月。

</details>

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*