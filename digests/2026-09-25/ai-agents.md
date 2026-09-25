# OpenClaw 生态日报 2026-09-25

> Issues: 500 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-09-25 00:46 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目摘要 (2026-09-25)

### 1. 今日概览
OpenClaw 目前正处于 2026.9.x 系列版本发布后的高强度稳定化阶段。开发活动极其活跃，过去 24 小时内有 500 个活跃 Issue 和 500 个活跃 PR 处于跟踪状态，显示出项目正在进入“红色警报”状态，旨在解决会话状态管理、网关崩溃及数据库锁死等方面的回归问题。尽管性能瓶颈和稳定性回归问题仍困扰着项目健康度，但维护团队正通过大规模重构和定向修复积极应对。

### 2. 发布版本
*   **过去 24 小时内无新版本发布。** 项目目前重心仍集中在当前稳定系列 (2026.9.6/7) 上。

### 3. 项目进展
今日开发工作以“去臃肿化”（重构冗余逻辑）和性能优化为主：
*   **性能优化：** PR [#157634](https://github.com/openclaw/openclaw/pull/157634) 引入了相关逻辑，以确保网关在进行密集的数据库/转录清理时保持响应。
*   **重构：** 目前正投入大量精力统一 Agent、工具及会话辅助程序（PR [#156541](https://github.com/openclaw/openclaw/pull/156541)、[#157505](https://github.com/openclaw/openclaw/pull/157505) 以及 [#157765](https://github.com/openclaw/openclaw/pull/157765)）。
*   **自动化：** CI 测试正在进行优化（PR [#157626](https://github.com/openclaw/openclaw/pull/157626)），以减少慢速集成测试带来的噪声干扰。

### 4. 社区热点
*   **[#144911](https://github.com/openclaw/openclaw/issues/144911) MCP 服务器崩溃 (30 条评论)：** 用户反馈 MCP 初始化超时导致 Gateway 进程整体故障。这是一个高关注度问题，需要一种稳健的监督策略来解决。
*   **[#155753](https://github.com/openclaw/openclaw/issues/155753) CPU 占用过高 (23 条评论)：** 模型目录中的无限重建循环导致 CPU 核心占满。很明显，当前的目录刷新逻辑在高会话负载下已无法正常运行。
*   **[#149538](https://github.com/openclaw/openclaw/issues/149538) 主网关挂起 (21 条评论)：** 报告称网关在达到“就绪”状态后无法处理任何请求，最终导致内存耗尽。

### 5. 缺陷与稳定性
稳定性是目前社区最关切的问题：
*   **P0 级严重程度（阻塞发布的缺陷）：** 
    *   [#157011](https://github.com/openclaw/openclaw/issues/157011) - 托管更新循环：由于栈溢出，2026.9.5 到 2026.9.6 的升级路径持续出现回滚。
    *   [#157234](https://github.com/openclaw/openclaw/issues/157234) - 因活跃 Agent 数据库租约导致的更新失败。
    *   [#157415](https://github.com/openclaw/openclaw/issues/157415) - `doctor --fix` 在外部插件上的回归问题。
*   **缓解措施：** 多个 PR（如 [#157661](https://github.com/openclaw/openclaw/pull/157661)、[#156633](https://github.com/openclaw/openclaw/pull/156633)）正积极针对这些安装和更新失败问题进行修复。

### 6. 功能需求与路线图信号
*   **原生 ARM64 Linux 支持：** 社区反复请求为 ARM64 提供官方的 `.deb` 和 AppImage 构建版本 ([#138279](https://github.com/openclaw/openclaw/issues/138279))。
*   **智能自动命名：** 提议使用低成本 LLM 片段来自动生成会话名称 ([#99583](https://github.com/openclaw/openclaw/issues/99583))。
*   **多提供商引导：** 用户希望在初始设置流程中就能配置多个模型 ([#81960](https://github.com/openclaw/openclaw/issues/81960))。

### 7. 用户反馈总结
当前用户情绪反映出对“更新不稳定性”的极大不满。稳定分支的用户在升级后频繁遭遇崩溃，特别是在涉及新的模型目录工作进程时。用户对近期功能的“潜力”表示高度认可，但目前 UX（用户体验）受到高资源消耗（RAM/CPU 峰值）以及网关重启期间会话连续性错误的严重影响。

### 8. 积压任务观察
*   **[#112423](https://github.com/openclaw/openclaw/issues/112423)：** 大规模 SQLite 转录清理阻塞了事件循环。该 Issue 自 7 月以来一直处于打开状态，仍是严重影响交互体验的性能“痛点”。
*   **[#98435](https://github.com/openclaw/openclaw/issues/98435)：** 重连时 MCP 回环传输失败。这代表了“弹性 Agent”体验中的一个关键缺失，且已在维护者审查队列中积压数月。

---

---

## 横向生态对比

本报告总结了截至2026年9月25日的个人AI Agent生态系统现状。

### 1. 生态系统概览
开源AI Agent生态系统目前处于“稳定期”，正从快速的功能实验向生产级可靠性过渡。在所有受监测的项目中，开发者们正优先关注架构的模块化、状态管理和安全性，这往往以牺牲新功能开发为代价。目前市场已达成明确共识，正转向MCP（Model Context Protocol）标准、多租户Agent支持，以及对本地主机执行环境实施稳健沙箱策略的必要性。

### 2. 活跃度对比

| 项目 | 活跃 Issue/PR | 近期发布状态 | 健康评分* |
| :--- | :--- | :--- | :--- |
| **OpenClaw** | 1000+ | 稳定 (2026.9.x) | 紧张 (回归问题多) |
| **Hermes** | 460+ (PRs) | v0.21.5 (补丁) | 恢复中 (侧重稳定性) |
| **IronClaw** | ~40 | v1.4.1-rc.2 | 稳定 (侧重成熟度) |
| **QwenPaw** | 50+ | 稳定 (2.2.x beta) | 增长中 (迭代速度快) |
| **ZeroClaw** | ~77 | Pre-0.9.0 | 高 (侧重架构) |

*\*健康评分是基于当前的回归率以及稳定性与增长速度对比得出的主观评估。*

### 3. OpenClaw的地位
OpenClaw作为生态系统的“重量级”核心参考实现，与同行相比，它展现出最高的开发者活跃度和用户流量，但讽刺的是，这也导致了最严重的稳定性回归问题。虽然其他项目（如IronClaw）优先进行受控且经过基准测试的发布，但OpenClaw的操作风险阈值更高。其技术路径依赖于中心化的网关与目录模型，目前正面临内存管理的瓶颈——这也是ZeroClaw等更小型、更模块化的项目正试图通过基于WASM的架构来规避的挑战。

### 4. 共同关注的技术领域
*   **更新稳健性：** 几乎所有项目（OpenClaw、Hermes、QwenPaw）目前都在应对安装/升级循环和文件锁定回归的问题，特别是在Windows平台上。
*   **安全性与准入控制：** ZeroClaw和Hermes正在引领推动更完善的“批准管理器（Approval Managers）”和凭据脱敏，反映出对企业级Agent执行安全的广泛担忧。
*   **状态管理：** 持久化（特别是会话连续性和上下文清理）是一个普遍的痛点，所有项目在为复杂的多轮Agent任务维持长期记忆方面都面临困难。

### 5. 差异化分析
*   **IronClaw（侧重“质量”）：** 通过透明的“失败分类学（failure taxonomy）”报告实现差异化；其目标群体是需要准确性而非单纯追求功能数量的高级用户和企业团队。
*   **ZeroClaw（侧重“模块化”）：** 正转向基于WASM的插件优先架构，以解决OpenClaw中出现的“单体臃肿”问题。
*   **QwenPaw（侧重“企业/多租户”）：** 优先考虑UI整合、移动端易用性以及用于协作工作流的多租户管理控制。

### 6. 社区动力与成熟度
*   **快速迭代：** QwenPaw和OpenClaw的社区流失率最高，这是用户群迅速扩张项目的典型特征。
*   **稳定与成熟：** IronClaw代表了最成熟的开发周期，倾向于缓慢且经过基准测试验证的更新。
*   **架构强化：** ZeroClaw是一个“开发者导向的项目”，专注于底层基础设施（WASM/安全/标准操作流程），而非面向消费者的华丽功能。

### 7. 趋势信号
*   **单体架构的消亡：** 向“一切皆插件”（ZeroClaw）和模块化辅助程序（OpenClaw）的转变表明，单进程的Agent架构已无法实现有效扩展。
*   **“本地沙箱”势在必行：** 随着Agent获得更广泛的文件系统和工具访问权限，各项目正转向强制性的主机级准入控制，以防止恶意Agent行为。
*   **配置演进：** 存在强烈的用户驱动需求，要求将敏感配置（OAuth、API密钥）从环境变量迁移到基于GUI的管理界面，从而降低非技术背景企业部署的门槛。
*   **基准测试即信任：** IronClaw在失败分类学上的成功表明，对于专业应用而言，开发者更看重“了解失败原因”而非“完美的性能表现”。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目摘要：2026-09-25

## 1. 今日概览
在发布 **v0.21.5** 版本后，Hermes Agent 项目目前处于高强度的稳定化阶段。开发工作重心大幅倾斜于修复 Desktop 和 Windows 环境中的关键回归问题，由于维护人员正忙于解决补丁发布后出现的问题，PR 提交量激增（有 50 个 PR 进行了更新）。项目整体健康状况聚焦于“夯实基础”，明确强调了可靠性、平台兼容性和会话管理。

## 2. 版本发布
*   **v0.21.5 (2026.09.24)：** 一个重大的补丁汇总版本，包含了自 v0.21.4 以来的约 460 个 PR。此版本优先保证 Docker、Hermes Cloud 和托管部署的稳定性。提醒用户：这是一个“稳定化”版本；完整文档尚在撰写中。

## 3. 项目进展
今日的开发工作主要集中在解决特定平台的稳定性问题，特别是 Windows 安装程序和 Docker 后端集成方面：
*   **更新鲁棒性：** PR [#121469](https://github.com/NousResearch/hermes-agent/pull/121469) 通过为 `node_modules` 实施重试机制，解决了 Windows 更新期间出现的 `ENOTEMPTY` 错误。
*   **Docker/环境：** PR [#121564](https://github.com/NousResearch/hermes-agent/pull/121564) 改进了 Windows 工作区挂载，确保即使在 `/workspace` 已被占用的情况下，工具也能正确映射路径。
*   **Electron 优化：** PR [#121377](https://github.com/NousResearch/hermes-agent/pull/121377) 通过强制使用正确的 ozone 平台标志来修复 Linux 上的 Wayland 支持，提升了原生性能。

## 4. 社区热点
*   **[#92760](https://github.com/NousResearch/hermes-agent/issues/92760)：Bot 模式缓慢/卡顿。** 该问题目前有 7 条评论，是社区公认的最紧迫 UX 问题。社区已确定其核心问题在于群聊中“轮询驱动”与“推送驱动”架构的不匹配。
*   **[#57812](https://github.com/NousResearch/hermes-agent/issues/57812)：macOS 网络兼容性。** 用户反馈尽管系统级工具运行正常，但 Hermes 无法连接到同一局域网下的远程 LLM，这表明 Agent 内部的 Python 环境需要具备更完善的代理/环境感知能力。

## 5. 缺陷与稳定性
项目目前正在处理大量 Windows 特有的回归问题：
*   **关键（高）：** [#121504](https://github.com/NousResearch/hermes-agent/issues/115104) 反馈内存提供者同步绕过了敏感信息脱敏机制，可能导致凭据泄露至外部内存服务。
*   **高（稳定性）：** [#121478](https://github.com/NousResearch/hermes-agent/pull/121478)（正在修复）针对一种竞争条件，即辅助配置文件错误地获取了主机网关的所有权。
*   **中（UX/稳定性）：** [#121532](https://github.com/NousResearch/hermes-agent/pull/121532) 引入了一种强制结算机制，用于解决在 LLM 部分响应后，“思考”加载动画无限期挂起的问题。

## 6. 功能请求与路线图信号
路线图目前处于“功能冻结”状态，以专注于修复缺陷，但最近的 PR 表明在定制化方面有所增长：
*   **Hades 主题：** PR [#71063](https://github.com/NousResearch/hermes-agent/pull/71063) 添加了一个冥界主题的 UI 皮肤，暗示维护者对 UI 组件的模块化持开放态度。
*   **ClinePass 集成：** PR [#90460](https://github.com/NousResearch/hermes-agent/pull/90460) 强调了一项战略举措，即为用户提供“精选模型”订阅，以简化非技术用户的入门流程。

## 7. 用户反馈总结
用户目前对以下问题表示不满：
*   **更新循环：** 一个反复出现的投诉是 `hermes update` 在 Windows 上经常失败，导致用户陷入锁定状态，需要手动删除文件才能修复（例如 [#87875](https://github.com/NousResearch/hermes-agent/issues/87875)）。
*   **静默失败：** TUI 和桌面 UI 经常无法告知连接失败的“具体原因”，只留给用户诸如“Socket rejected”或“IPC bridge unavailable”之类的通用错误提示。

## 8. 待办事项观察
*   **[#76483](https://github.com/NousResearch/hermes-agent/issues/76483)：** 看板通知配置文件不匹配。该问题自 8 月 2 日以来一直处于开启状态；它影响多配置文件用户，对于通过 CLI/Slack 管理任务的高级用户来说仍然是一个重大的困扰。
*   **[#121411](https://github.com/NousResearch/hermes-agent/pull/121411)：** 链接元数据字符编码。虽然修复程序正在处理中，但目前无法处理链接预览中非 UTF-8 字符的问题，影响了非英语用户的全球可用性。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目摘要 – 2026-09-25

### 1. 今日概览
随着 v1.4.1 稳定版发布临近，IronClaw 继续保持以维护为核心的稳健开发节奏。项目目前正在平衡基础设施自动化（特别是刷新代码库知识图谱）与基准测试套件中模型驱动故障的活跃调试工作。项目整体状态保持稳定，近期工作主要集中在优化 Google 集成的用户体验以及完善 CI 工作流。

### 2. 发布版本
*   **[ironclaw-v1.4.1-rc.2](https://github.com/nearai/ironclaw/releases/tag/ironclaw-v1.4.1-rc.2)** (2026-09-24)
    *   **变更：** 第二个候选版本，重点优化了 Google Workspace 集成。
    *   **关键修复：** 用户现在可以直接通过 Web UI 提供 OAuth 客户端凭据来激活 Google 扩展（Gmail/Calendar），消除了对环境变量的限制性依赖。

### 3. 项目进展
*   **基础设施建设中：** [PR #7988](https://github.com/nearai/ironclaw/pull/7988) 仍处于开放状态，代表了对代码库知识图谱的常规自动化更新。这反映了项目致力于确保智能体（agentic）记忆与代码库当前状态保持同步。过去 24 小时内未合并任何新功能。

### 4. 社区热点
*   **[Issue #8111: Daily ironclaw failure taxonomy](https://github.com/nearai/ironclaw/issues/8111)**：这是社区和开发人员关注的重点。它凸显了对于智能体在复杂基准测试中表现透明度的持续需求。分类分析显示，故障日益与模型质量限制有关（特别是 `deepseek-v4-flash` 在处理 OCR 数字化财税文档时表现吃力），而非代码库本身的 Bug。

### 5. Bug 与稳定性
*   **严重程度：中 (基准测试失败)**：[Issue #8111](https://github.com/nearai/ironclaw/issues/8111) 指出 `officeqa` 套件中有 38 个任务未通过。
    *   **评估：** 这些被归类为模型质量故障而非平台缺陷。虽然它们在传统意义上不属于“Bug”，但却是影响智能体可靠性的一道障碍。目前暂无直接修复的 PR，因为这需要进行模型优化或针对 OCR 密集型任务进行更好的提示词工程（Prompt Engineering）。

### 6. 功能需求与路线图信号
*   **路线图信号：** v1.4.1-rc.2 中允许基于 Web UI 配置 OAuth 的举措表明，路线图正战略性地向降低非技术用户在企业或团队环境中部署 IronClaw 的门槛转移。我们预计未来版本将继续把配置逻辑从服务器端环境变量迁移至图形界面（GUI）。

### 7. 用户反馈摘要
*   **痛点：** 主要的摩擦点仍然是对敏感 API 配置依赖环境变量，这增加了部署的复杂度。最新的 RC 版本已直接解决了这一问题。
*   **满意度：** 通过每日故障分类保持透明度是建立开发者信任和严格质量控制的积极信号，尽管用户显然期望智能体在与数字化文档格式交互时具备更高的准确性。

### 8. 待办事项关注
*   **[PR #7988](https://github.com/nearai/ironclaw/pull/7988)**：虽然这是一个自动化的 CI 任务，但自 8 月底（2026-08-29）以来一直处于开放状态。虽然可能在等待审核周期或特定触发条件，但建议维护者关注该任务，以确保“每日刷新”工作流按预期运行。

---

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目摘要：2026-09-25

## 1. 今日概览
QwenPaw 生态系统正处于高速开发周期中，过去 24 小时内共有 54 项更新。继 2.2.0 版本发布后，工作重点已显著转向**企业级就绪性与稳健的状态管理**。尽管社区参与度很高，但项目目前正面临上下文窗口管理和多租户 UI 稳定性方面的“成长阵痛”。大量的 Bug 反馈表明，项目需要进行一次稳定性冲刺，以巩固近期的架构变更。

## 2. 版本发布
*   过去 24 小时内**没有新版本发布**。目前的重点依然是 `2.2.x` 测试版系列。

## 3. 项目进度
近期的 PR 活动集中在 UI 整合以及修复近期侧边栏重构引入的回归问题：
*   **[#7972](https://github.com/agentscope-ai/QwenPaw/pull/7972)：** 默认会话列表分组方式由 `date` 改为 `source`，提升了高级用户的易用性。
*   **[#7971](https://github.com/agentscope-ai/QwenPaw/pull/7971)：** 通过限制执行开始检查，修复了工具调用生命周期查询中的竞态条件。
*   **[#7960](https://github.com/agentscope-ai/QwenPaw/pull/7960)：** 为卡顿的流式清理实现了 60 秒恢复期限，增强了提供程序的稳定性。
*   **[#5659](https://github.com/agentscope-ai/QwenPaw/pull/5659)：** 终于满足了长期以来的需求，允许在发送附件时无需附带文本。

## 4. 社区热点话题
*   **[#7318](https://github.com/agentscope-ai/QwenPaw/issue/7318)："QwenPaw Hub 的下一步是什么？" (32 条评论)：** 社区正在积极引导多租户版本的发展方向。用户优先考虑管理员管理的技能和精细化的访问控制。
*   **[#4474](https://github.com/agentscope-ai/QwenPaw/issue/4474)：支持 ChatGPT-5.5 (9 条评论)：** 凸显了用户对前沿模型兼容性的持续需求，即便厂商支持尚不稳定。
*   **[#7571](https://github.com/agentscope-ai/QwenPaw/issue/7571)：持久化/遗忘问题 (8 条评论)：** 一份关于智能体在处理复杂插件开发任务时“迷失方向”的关键报告，指出了长期上下文保留方面的缺陷。

## 5. Bug 与稳定性
*   **高优先级：**
    *   **[#7966](https://github.com/agentscope-ai/QwenPaw/issue/7966)：** 由于 `file://` 媒体 URL 被拒绝，导致切换提供程序后会话损坏。
    *   **[#7943](https://github.com/agentscope-ai/QwenPaw/issue/7943)：** 沙盒有可能锁定 Windows 上的驱动器根目录，造成严重系统级访问问题。
*   **中优先级：**
    *   **[#7968](https://github.com/agentscope-ai/QwenPaw/issue/7968)：** 控制台侧边栏回归，导致聊天组/文件夹管理功能失效。
    *   **[#7963](https://github.com/agentscope-ai/QwenPaw/issue/7963)：** Langfuse 追踪回归，导致无法捕获工具输出。
    *   *修复进度：* PR [#7973](https://github.com/agentscope-ai/QwenPaw/pull/7973)、[#7964](https://github.com/agentscope-ai/QwenPaw/pull/7964) 和 [#7962](https://github.com/agentscope-ai/QwenPaw/pull/7962) 正在针对这些特定回归进行修复。

## 6. 功能请求与路线图信号
*   **官方移动端 App：** [#7976](https://github.com/agentscope-ai/QwenPaw/issue/7976) 表明用户强烈希望拥有原生移动端体验，目前用户被迫使用“黑客手段”来随时随地访问服务。
*   **精细化控制：** [#7957](https://github.com/agentscope-ai/QwenPaw/issue/7957) 建议增加针对未用预设模型的“禁用/隐藏”功能，以迎合极简主义和企业用户的需求。

## 7. 用户反馈总结
用户对 `2.2.x` 分支的快速迭代印象深刻，特别是在 MCP 支持和插件灵活性方面。然而，对于“不稳定”的状态管理——尤其是 UI 侧边栏持久化、定时任务可靠性以及智能体在处理长且复杂的基于文件的任务时无法保持专注——感到日益沮丧。反馈表明，当前的工作重点应是**可靠性优先于新功能扩展**。

## 8. 待办事项关注
*   **[#7733](https://github.com/agentscope-ai/QwenPaw/issue/7733)：** 关于“智能体自主上下文管理”的功能请求依然至关重要。目前，上下文的清理完全基于阈值，导致智能体在执行任务中途丢失任务跟踪。解决此问题将极大提升助手的“智能”体验。

---

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目摘要：2026-09-25

## 1. 今日概览
ZeroClaw 正处于架构精炼的关键时期，重点关注稳定性和安全加固。过去 24 小时内，共有 27 个 Issue 和 50 个 PR 更新，开发活跃度保持在高位，核心工作集中在“Version 0.9.0”版本的准备、插件生态系统的转型以及安全策略的强制执行上。项目正从单体式设计转向更模块化、运行时组装的架构，并投入大量精力优化 CI/CD 效率，以应对日益增长的贡献者活动。

## 2. 发布版本
*过去 24 小时内无新版本发布。*

## 3. 项目进展
*   **网关可靠性：** PR [#10538](https://github.com/zeroclaw-labs/zeroclaw/pull/10538) 已合并，确保即使在客户端 WebSocket 断开的情况下，Agent 回合（agent turns）仍能继续处理，这是针对长时间运行任务的一项关键修复。
*   **SOP 执行修复：** PR [#11083](https://github.com/zeroclaw-labs/zeroclaw/pull/11083) 解决了由 Webhook 触发的标准操作程序（SOP）无法启动 Agent 步骤的问题。
*   **CI/CD 优化：** 合并了多个 PR（[#11063](https://github.com/zeroclaw-labs/zeroclaw/pull/11063), [#11069](https://github.com/zeroclaw-labs/zeroclaw/pull/11069), [#11070](https://github.com/zeroclaw-labs/zeroclaw/pull/11070), [#11064](https://github.com/zeroclaw-labs/zeroclaw/pull/11064)），旨在提高测试效率、减少不必要的重新编译并简化发布流水线。
*   **安全债务：** Issue [#9899](https://github.com/zeroclaw-labs/zeroclaw/issues/9899) 已关闭，成功解决了 `imbl` 和 `matrix-sdk` 建议的相关依赖冲突。

## 4. 社区热点
*   **[Tracker] Maintainer decision queue (#8692)](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)：** RFC 管理的核心枢纽。该议题有 15 条评论，仍是贡献者寻求项目方向明确性的主要关注点。
*   **[Tracker] Capability catalog and plugin migration (#6489)](https://github.com/zeroclaw-labs/zeroclaw/issues/6489)：** 社区对“万物皆插件（Everything is a plugin）”理念展现出极高兴趣。社区正在积极跟踪从单体功能向基于 WASM 的运行时模块的转型。
*   **[RFC] Host-scoped admission control (#10970)](https://github.com/zeroclaw-labs/zeroclaw/issues/10970)：** 表明社区对更好的多 Agent 资源管理需求日益增长，旨在防止宿主机上的“喧闹邻居（noisy neighbor）”现象。

## 5. 缺陷与稳定性
*   **[S0 - 严重] 无人值守 Agent 回合：** [#10968](https://github.com/zeroclaw-labs/zeroclaw/issues/10968) 报告称 Cron/Headless 模式下的 SOP 在运行时绕过了 `ApprovalManager`，导致安全策略失效，这是一个重大的安全疏漏。
*   **[S0 - 严重] Markdown 内存数据丢失：** [#10797](https://github.com/zeroclaw-labs/zeroclaw/issues/10797) 指出 `MarkdownMemory` 中存在竞争条件，并发的 `store()` 调用会导致数据损坏。
*   **[S1 - 阻塞] Windows 桌面进程：** [#11087](https://github.com/zeroclaw-labs/zeroclaw/issues/11087) 报告称应用在关闭窗口后无法正确终止，导致无法重启。
*   **[S2 - 降级] 文档同步：** [#11093](https://github.com/zeroclaw-labs/zeroclaw/issues/11093) 报告称稳定版文档推送忽略了根目录的 `llms.txt` 文件，导致 AI 上下文陈旧。

## 6. 功能需求与路线图信号
*   **更低成本的推理提供商：** [#11103](https://github.com/zeroclaw-labs/zeroclaw/issues/11103) 请求支持 Cheaper Inference 网关，反映了用户对更高性价比 LLM 路由方案的需求。
*   **Agent 间消息传递：** [#11027](https://github.com/zeroclaw-labs/zeroclaw/issues/11027) 提议通过 RFC 实现 Agent 之间直接共享发现结果，暗示了向更具自主性的多 Agent 蜂群架构发展的趋势。

## 7. 用户反馈总结
用户目前正饱受“强大功能带来的复杂 UX”之苦——随着平台日益复杂（例如多 Agent 设置、WASM 插件），手动配置和管理状态的摩擦力正在增加。用户对 Windows 上的“幽灵进程”以及管理插件权限的复杂性表示特别不满。

## 8. 待办事项监控
*   **[feat(security): canonical sandbox_policy (#7821)](https://github.com/zeroclaw-labs/zeroclaw/pull/7821)：** 一个自 6 月起就已打开的超大规模（XL）PR。这是实现统一安全强制执行的关键，但需要维护者投入大量精力才能最终合并。
*   **[feat(security): enforce authenticated principals (#10259)](https://github.com/zeroclaw-labs/zeroclaw/pull/10259)：** OIDC 集成的关键“第三阶段”里程碑。鉴于其复杂性和对 RPC 安全性的影响，它是目前最重要的“等待审核”瓶颈。

</details>

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*