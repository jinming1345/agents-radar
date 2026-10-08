# OpenClaw 生态日报 2026-10-08

> Issues: 500 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-10-08 02:15 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目摘要 - 2026-10-08

## 1. 今日概览
OpenClaw 目前处于高强度的开发阶段，过去 24 小时内活跃的 issue 和 pull request 更新量达到 500 次。项目当前重点是稳定 `2026.10.x` 发布系列，并将重心放在增强 Gateway 的健壮性上，以解决内存泄漏、子代理（subagent）编排中的竞态条件以及迁移失败等问题。总体而言，项目呈现出快速迭代的特征，但用户在升级过程中遇到了显著阻力，这表明未来版本需要更完善的验证机制。

## 2. 版本发布
*   **v2026.10.1-beta.2:** 
    *   **亮点：** 侧重于会话和内存持久化，包括在注册表变更期间保留使用状态，以及改进从远程工作空间进行 worker 挂载的交付。
    *   **修复：** 防止已排队的取消操作/对话别名阻塞当前轮次，并成功迁移嵌入缓存（embedding caches），确保代理的连续性。

## 3. 项目进展
*   **已合并/关闭的 PR：** 今日共关闭或合并了 141 个 PR，主要集中在版本稳定性修复上。
*   **关键进展：** 
    *   **CI/QA 强化：** PR [#166882](https://github.com/openclaw/openclaw/pull/166882) 将关键的发布验证测试工具修复向后移植到了 2026.10.1。
    *   **状态管理：** PR [#166860](https://github.com/openclaw/openclaw/pull/166860) 对唤醒（wake）和钩子（hook）数据库准入进行了序列化处理，以防止在代理数据库发现过程中出现确定性竞态条件。
    *   **可观测性：** PR [#166440](https://github.com/openclaw/openclaw/pull/166440) 引入了一个捕获 Gateway 主机屏幕的工具，解决了远程用户无法直观监控运行情况的问题。

## 4. 社区热点讨论
*   **Gateway 内存泄漏 ([#91588](https://github.com/openclaw/openclaw/issues/91588))：** 该问题拥有 37 条评论，是目前最关键的问题。Gateway 的 RSS 占用增长至 15.5GB，导致 OOM 崩溃。
*   **代理预算控制 ([#42475](https://github.com/openclaw/openclaw/issues/42475))：** 26 条评论强调了用户对设置“单代理成本上限”的强烈需求，以防止模型费用失控。
*   **Recall 保留 ([#150635](https://github.com/openclaw/openclaw/issues/150635))：** 19 条评论指出一个严重 Bug，即短期记忆会在每晚被清除，导致“深度梦境（dreaming deep）”阶段永远无法激活。

## 5. Bug 与稳定性
*   **紧急 (P0/崩溃循环)：**
    *   [#91588](https://github.com/openclaw/openclaw/issues/91588)：严重的 Gateway 内存泄漏（RSS 高达 15.5GB）。
    *   [#97616](https://github.com/openclaw/openclaw/issues/97616)：因泄露的钩子/工具子进程导致的僵尸进程堆积。
    *   [#160548](https://github.com/openclaw/openclaw/issues/160548)：`prepared-model-catalog.worker.js` 每 5 分钟泄露 1GB 内存。
*   **稳定性/回归：**
    *   [#142585](https://github.com/openclaw/openclaw/issues/142585)：Doctor 工具无法识别合法的旧版工作空间迁移。
    *   [#157812](https://github.com/openclaw/openclaw/issues/157812)：由于 `managed-service-preflight` 中的路径扩展问题，Windows 自动更新持续失败。

## 6. 功能请求与路线图信号
*   **无头浏览器工具 ([#53763](https://github.com/openclaw/openclaw/issues/53763))：** 用户希望拥有原生 Chromium 实例，以减少对脆弱的外部浏览器配置的依赖。
*   **细粒度可见性 ([#59149](https://github.com/openclaw/openclaw/issues/59149))：** 请求为 `agentToAgent` 和会话可见性提供针对单个代理的范围控制，而非仅限于全局设置。
*   **SQLite 对话记录 ([#79902](https://github.com/openclaw/openclaw/issues/79902))：** 需求建立一个以 SQLite 为后端的标准化对话记录接口，以便开发者能够在 OpenClaw 状态之上构建工具。

## 7. 用户反馈总结
用户普遍认可 OpenClaw 作为个人助手的强大功能，但对 `2026.9.x` 和 `2026.10.x` 开发周期的动荡感到沮丧。痛点主要集中在：
*   **升级焦虑：** 用户反馈在常规更新期间经常遇到“doctor-failed”错误和迁移中断。
*   **配置臃肿：** 管理多代理编排和冲突的 CLI 命令时难度较大。
*   **可靠性：** 频繁出现的“session-state”错误和子代理交付失败，导致用户对长期运行的自动化任务缺乏信任。

## 8. 积压任务观察
*   [#43367](https://github.com/openclaw/openclaw/issues/43367)：多代理编排不稳定（自 2026 年 3 月起开启）。
*   [#73537](https://github.com/openclaw/openclaw/issues/73537)：请求在发布版本上添加“生产就绪（production-readiness）”稳定性标签，帮助用户区分实验版和稳定版。
*   [#85461](https://github.com/openclaw/openclaw/issues/85461)：为图像生成服务提供商捕获使用元数据，目前因缺乏维护者优先级排序而停滞。

---

## 横向生态对比

### 跨项目对比报告：2026-10-08

#### 1. 生态概览
开源 AI Agent 生态系统目前处于一种“稳定化危机”状态。尽管各项目开发速度极快，但目前的主流趋势是从以往那种功能堆叠的实验性原型，向具备韧性、可长时间运行的 Agent 运行时进行艰难转型。内存管理、状态持久化和安全沙箱已成为公认的“三大”技术瓶颈，这标志着社区正从以模型为中心的开发范式，转向构建稳健的 Agent 编排基础设施。

#### 2. 活动对比

| 项目 | 活跃 Issue/PR | 今日发布 | 主要关注点 | 健康评分* |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 500+ | v2026.10.1-beta.2 | 网关加固 | 中（波动） |
| **Hermes Agent** | 100 | 无 | 会话/UI 一致性 | 中（维护中） |
| **IronClaw** | N/A | 无 | Embedding 工具链 | 高（稳定） |
| **QwenPaw** | 11 | 无 | 资源效率 | 中（活跃） |
| **ZeroClaw** | 96 | 无 | 沙箱/插件安全 | 高（加固中） |

*\*健康评分基于维护活动与报告的 P0/S0 回归问题的比率计算。*

#### 3. OpenClaw 的地位
OpenClaw 是该领域的**核心参考架构**，其庞大的 Issue 数量（500+）以及在定义子 Agent 编排模式中的作用证明了这一点。与专注于优化或特定 UI 界面的 IronClaw 或 QwenPaw 不同，OpenClaw 试图构建一个全面的网关。其主要优势在于它对“深度梦境”（召回保留）和 Agent 间通信的宏观愿景，但代价是极高的“升级焦虑”和内存波动，而这些问题是小型项目可以较好规避的。

#### 4. 共享技术重点
*   **内存与状态韧性：** OpenClaw ([#91588](https://github.com/openclaw/openclaw/issues/91588))、QwenPaw ([#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722)) 和 Hermes ([#132401](https://github.com/NousResearch/hermes-agent/issues/132401)) 都存在运行时内存耗尽或状态数据静默丢失的问题。
*   **基础设施沙箱化：** ZeroClaw 在安全边界方面处于领先地位，但 OpenClaw 中也出现了对原生工具执行（无头浏览器/终端）的类似需求。
*   **“幽灵成功”（Ghost Success）Bug：** 这是一个反复出现的模式，即 Agent 报告任务完成，实际上却存在部分失败。此类问题出现在 IronClaw ([#1993](https://github.com/nearai/ironclaw/issues/1993))、QwenPaw ([#8116](https://github.com/agentscope-ai/QwenPaw/issues/8116)) 和 ZeroClaw ([#11586](https://github.com/zeroclaw-labs/zeroclaw/issues/11586)) 中。

#### 5. 差异化分析
*   **OpenClaw：** 功能极其丰富的“一站式”平台，试图解决整个 Agent 生命周期问题。
*   **Hermes Agent：** 以用户为中心，专注于桌面端体验和多模型身份管理。
*   **IronClaw：** 性能导向，专注于通过基于 Embedding 的路由来降低工具调用延迟。
*   **ZeroClaw：** 安全优先，专注于企业级插件生命周期管理和严格的运行时隔离。
*   **QwenPaw：** 效率优先，优先考虑资源受限的环境（如 Tauri/桌面端）。

#### 6. 社区动力与成熟度
*   **快速迭代：** **OpenClaw** 在迭代速度上处于绝对领先地位，尽管牺牲了稳定性。它充当了新 Agent 模式的“试验田”。
*   **稳定/加固中：** **ZeroClaw** 和 **IronClaw** 展示了最高的成熟度。它们的开发重点在于消除边缘情况、提升安全性和架构重构，而非单纯的功能扩展。
*   **维护阶段：** **Hermes** 和 **QwenPaw** 目前正致力于清理技术债务，以确保其核心用户承诺的可行性。

#### 7. 趋势信号
*   **主动式工具选择：** 通过 Embedding 预选工具的趋势（IronClaw）表明，Agent 循环正朝着缩短“从触发到首次行动的时间”方向演进。
*   **部署顾虑：** 随着项目趋于成熟，“生产就绪”（production-readiness）标签已成为社区的关键诉求，这表明用户正试图将这些 Agent 部署在专业、非业余的场景中。
*   **对本地上下文的依赖：** 关于持久化状态的普遍问题表明，未来 Agent 领域的赢家将是那些能提供稳健的、基于数据库（SQLite）的持久层、且能在守护进程崩溃后恢复的方案——这是目前大多数顶级项目缺失或尚不完善的功能。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目摘要：2026-10-08

## 1. 今日概览
Hermes Agent 代码仓库目前的维护工作量较大，过去 24 小时内有 100 项内容（50 个 issue，50 个 PR）进行了更新。开发重点明显偏向于解决会话状态不一致、多配置身份泄露以及桌面端特定的渲染错误。尽管项目仍处于高度活跃状态，但目前的“清扫（sweeper）”标签表明团队正集中精力处理与安全边界和状态持久化相关的技术债务。

## 2. 版本发布
*2026-10-08 无新版本发布。*

## 3. 项目进展（已合并/已关闭）
*   **桌面 UI/UX：** 改进了 composer 透明度处理 ([#134852](https://github.com/NousResearch/hermes-agent/pull/134852))，并修复了模型切换过程中“回复失败”卡片闪烁的问题 ([#134847](https://github.com/NousResearch/hermes-agent/pull/134847))。
*   **安全性/稳定性：** 解决了 OAuth/MCP 身份验证循环故障 ([#134861](https://github.com/NousResearch/hermes-agent/pull/134861))，并修正了唤醒词功能的麦克风捕获约束 ([#134846](https://github.com/NousResearch/hermes-agent/pull/134846))。
*   **基础设施：** 修复了 Anthropic-wire 模型的 `opencode-go` 模型路由问题 ([#134863](https://github.com/NousResearch/hermes-agent/pull/134863))，并解决了仪表盘登录时的解压错误 ([#134462](https://github.com/NousResearch/hermes-agent/pull/134462))。

## 4. 社区热点
*   **[#127665](https://github.com/NousResearch/hermes-agent/issues/127665) (51 条评论)：** 针对桌面客户端重复助手回复的问题仍在调查中。用户反映尽管之前已发布补丁，但状态同步问题依然存在。
*   **[#59293](https://github.com/NousResearch/hermes-agent/issues/59293) (22 条评论)：** 关于 `hermes config set` CLI 命令绕过系统配置写保护的安全隐患，这可能导致代理（Agent）禁用安全层。
*   **[#132401](https://github.com/NousResearch/hermes-agent/issues/132401) (19 条评论)：** 关键数据丢失报告，24 小时空闲暂存清理程序（scratch pruner）会静默删除活跃的多日代理工作内容。

## 5. 错误与稳定性
*   **高严重性 (P0/P1)：**
    *   [#132401](https://github.com/NousResearch/hermes-agent/issues/132401)：自动暂存删除导致用户工作丢失。
    *   [#134858](https://github.com/NousResearch/hermes-agent/issues/134858)：调度程序层面的 cron 作业静默失败。
*   **中/低严重性：**
    *   [#134864](https://github.com/NousResearch/hermes-agent/issues/134864)：带有空格的 MoA 预设名称在模型选择器中被隐藏。*修复 PR 进行中：[#134868](https://github.com/NousResearch/hermes-agent/pull/134868)。*
    *   [#134822](https://github.com/NousResearch/hermes-agent/issues/134822)：默认文件上的日志噪声/误报配置警告。

## 6. 功能需求与路线图信号
*   **桌面端自定义：** 用户对自定义键盘快捷键（回车键用于换行与发送）有强烈需求 ([#49422](https://github.com/NousResearch/hermes-agent/issues/49422))。
*   **统一会话管理：** 大规模重构 PR [#106742](https://github.com/NousResearch/hermes-agent/pull/106742) 标志着向所有 Hermes 界面采用单一网关所有权模型的转变，这很可能是下个版本的重要架构变更。
*   **高级回退策略：** PR [#133676](https://github.com/NousResearch/hermes-agent/pull/133676) 提出了动态启发式模型回退方案，表明项目正朝着为免费层用户提供更具弹性、自动化的模型选择方向发展。

## 7. 用户反馈总结
用户目前反映在**会话连续性**和**数据完整性**方面存在阻碍。关于消息重复渲染和暂存文件“静默删除”的持续报告，表明用户对当前的状态持久化层缺乏信心。此外，用户对配置锁定以及跨不同界面（CLI vs. 桌面端）管理模型设置的难度感到不满。

## 8. 待办事项关注
*   **[#98078](https://github.com/NousResearch/hermes-agent/issues/98078)：** 关于自仓库变异保护（self-repo mutation guard）绕过的安全报告。这对代理自主性构成重大风险，需要针对 `terminal_tool` 安全边界进行强有力的修复。
*   **[#49422](https://github.com/NousResearch/hermes-agent/issues/49422)：** 关于键盘快捷键的长期 UX 需求。虽然标记为 P2，但这仍是高级用户经常提及的“生活质量（QoL）”问题。

---

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目摘要：2026-10-08

### 1. 今日概览
IronClaw 目前处于维护与优化阶段，重点在于提升智能体（agent）的可靠性及工具调用的效率。目前的开发工作集中在通过 Embedding（嵌入）进行工具选择的架构优化，以及常规的依赖项清理工作。尽管代码库在发布层面表现稳定，但一个关于状态持久化的遗留 Bug 持续影响着用户对智能体任务完成度的信任。

### 2. 发布版本
*2026-10-08 未发布新版本。*

### 3. 项目进展
*   **功能推进：** [PR #8119](https://github.com/nearai/ironclaw/pull/8119) 是当前进展的主要驱动力。该 PR 引入了基于 Embedding 的可选工具选择机制，允许 `loop-host` 在首次模型调用前主动识别所需工具。此举旨在消除 `tool_search` 的往返过程，从而降低延迟。
*   **依赖维护：** [PR #8128](https://github.com/nearai/ironclaw/pull/8128) 完成了一项安全与维护任务，将 E2E 测试套件中的 `urllib3` 版本更新至 2.8.0。

### 4. 社区热点
*   **[PR #8119](https://github.com/nearai/ironclaw/pull/8119)：基于 Embedding 的可选工具选择。** 这是目前进行中的最重要的架构调整。社区对此展现出的浓厚兴趣凸显了行业需求——即从通用的工具调用模式转向更智能、具备上下文感知能力的预选机制，以提升智能体的响应速度。
*   **[Issue #1993](https://github.com/nearai/ironclaw/issues/1993)：虚假完成报告。** 这仍然是目前最关键的痛点，因为它暴露出智能体内部状态追踪与外部执行结果之间存在脱节。

### 5. Bug 与稳定性
*   **[Issue #1993](https://github.com/nearai/ironclaw/issues/1993)（优先级：P2 / 中）：** 智能体在网络错误导致会话重新加载后，会错误地报告任务已完成。这表明状态机存在缺陷：在中断后若无法验证当前的执行状态，智能体似乎默认任务已经完成。目前尚未有修复该问题的相关 PR。

### 6. 功能需求与路线图信号
向基于 Embedding 的工具选择 ([PR #8119](https://github.com/nearai/ironclaw/pull/8119)) 的转型，标志着架构正向更“主动”的智能体方向演进。我们预计未来的路线图将重点关注通过优化模型开启对话前的上下文预加载方式，从而缩短智能体的“思考时间”。

### 7. 用户反馈摘要
目前的反馈显示用户对**状态持久化**问题非常敏感。用户频繁遭遇“幽灵成功”消息，即智能体在从网络不稳定（502 错误）中恢复时，默认进入“任务完成”状态，而不是正确恢复任务或验证执行结果。这削弱了用户对 IronClaw 智能体自主性的信任度。

### 8. 积压工作观察
*   **[Issue #1993](https://github.com/nearai/ironclaw/issues/1993)：** 该 Bug 创建于 2026 年 4 月，已存在六个月之久。鉴于该问题涉及核心智能体可靠性的缺失（对未执行的任务报告成功），维护者应优先处理，以确保智能体在聊天重启后的“记忆”能够准确反映现实世界的执行状态。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目摘要 (2026-10-08)

## 1. 今日概览
QwenPaw 仓库目前正处于以稳定性为中心的维护密集期。过去 24 小时内共有 6 个活跃议题（Issue）和 5 个合并请求（PR）更新，开发重心已明确转向解决资源耗尽、流（stream）可靠性以及提供商端的兼容性问题。项目整体运行状况良好且活跃，但堆积的错误报告显示，团队正致力于稳定 `v2.2.x` 版本分支。

## 2. 版本发布
*今日无新版本发布。*

## 3. 项目进展
*   **已合并/关闭的 PR：**
    *   [#7867](https://github.com/agentscope-ai/QwenPaw/pull/7867) (已合并)：实现了文件区域选项卡在激活时的重新验证功能，确保工作区视图准确反映当前文件状态，而非显示陈旧缓存。

## 4. 社区热点
*   **[Issue #7722](https://github.com/agentscope-ai/QwenPaw/issues/7722)：内存耗尽：** 这是目前最关键的技术讨论，7 条评论详细描述了托管运行时中存在的三路径内存泄漏问题。这是社区目前对于长期可靠性最关注的焦点。
*   **[Issue #1775](https://github.com/agentscope-ai/QwenPaw/issues/1775)：Codex 风格引导模式（Steer Mode）：** 该议题拥有 4 条评论，是社区对人机协作智能体控制功能的强烈需求，反映了用户希望在智能体执行过程中进行更细粒度干预的愿望。

## 5. 错误与稳定性
*   **严重（Critical）：** [Issue #7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) - 持续的内存耗尽（导致 OOM 或程序挂起）。
*   **高优先级（High）：** [Issue #8116](https://github.com/agentscope-ai/QwenPaw/issues/8116) - 消息队列持续存在问题，导致重复处理或“幽灵”会话冲突。
*   **中优先级（Medium）：** [Issue #8115](https://github.com/agentscope-ai/QwenPaw/issues/8115) - 桌面端控制台冷启动延迟（16-25秒）以及 Tauri 框架下的 WebView2 稳定性问题。
*   **中优先级（Medium）：** [Issue #8117](https://github.com/agentscope-ai/QwenPaw/issues/8117) - 无法从提供商 `max_tokens` 上下文拒绝中恢复。（注：[PR #8118](https://github.com/agentscope-ai/QwenPaw/pull/8118) 目前处于开启状态以解决此问题）。

## 6. 功能请求与路线图信号
*   **模型控制：** 用户请求增加“推理强度”设置，以防止模型（如 3.8 类模型）过度推理（[Issue #8114](https://github.com/agentscope-ai/QwenPaw/issues/8114)）。
*   **用户体验优化：** [PR #8119](https://github.com/agentscope-ai/QwenPaw/pull/8119) 显示 UI 正朝着更好地处理大文本输入的方向改进，表明开发焦点正转向专业/高阶用户工作流。

## 7. 用户反馈总结
用户目前认为系统存在“脆弱性”。反馈强调了 AI 能力与底层设施（消息队列和流管理）可靠性之间的脱节。虽然用户认可核心智能体编排功能，但目前的冷启动时长和内存管理问题可能会影响其在生产环境的应用。

## 8. 积压任务观察
*   **[Issue #1775](https://github.com/agentscope-ai/QwenPaw/issues/1775)：** 自 2026 年 3 月起挂起。该功能请求在社区中呼声很高，但一直缺乏具体的实施路径。
*   **[Issue #8116](https://github.com/agentscope-ai/QwenPaw/issues/8116)：** 报告者指出该消息队列问题已存在“半年之久”，这使其成为维护者急需优先处理的关键事项，以防用户流失。

---

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目摘要 - 2026-10-08

### 1. 今日概览
ZeroClaw 目前处于高强度的工程推进阶段，重点在于强化其插件架构和安全边界。在过去 24 小时内，共有 96 个活跃 Issue 和 PR 得到更新，项目整体保持着高速迭代，特别是围绕 `v0.8.6` 发布周期。开发重心显著偏向于解决复杂的安全相关 Bug 以及最终确定插件生命周期管理系统，这标志着项目正朝着更稳健、企业级的 Agent 运行时迈进。

### 2. 发布版本
*   **无。** 今日暂无新版本发布。

### 3. 项目进展
*   **[PR #11192](https://github.com/zeroclaw-labs/zeroclaw/pull/11192) (已关闭)：** 通过唯一的追踪 ID 隔离负载捕获测试，解决了运行时的测试抖动问题，提高了 CI 的稳定性。
*   **[PR #11232](https://github.com/zeroclaw-labs/zeroclaw/pull/11232) (已合并/关闭)：** 通过从基于路径名的解析切换到目录句柄，加强了插件安全性，防止了在负载接入期间可能出现的竞态条件。

### 4. 社区热点
*   **[Issue #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) (15 条评论)：** 维护者决策队列仍然是最活跃的追踪项。它作为架构变更的“瓶颈”，表明项目采取的是一种高效但高度集中的治理模式。
*   **[Issue #8424](https://github.com/zeroclaw-labs/zeroclaw/issues/8424) (13 条评论)：** 关于 `.zeroclawignore` 和工作区相对路径禁用模式的 RFC 引发了广泛讨论。用户显然优先考虑数据安全和工作区隔离，这预示着该特性将成为下个迭代的高优先级功能。

### 5. Bug 与稳定性
*   **紧急 (S0/S1)：** 
    *   **[Issue #11540](https://github.com/zeroclaw-labs/zeroclaw/issues/11540)：** Linux 下 Bubblewrap 沙箱检测失败；回退到安全性较低的应用层模式。
    *   **[Issue #11539 / #11538](https://github.com/zeroclaw-labs/zeroclaw/issues/11539)：** Firejail 沙箱集成目前无法使用（CLI 选项无效/目录错误），导致 Linux 下工作流受阻。
    *   **[Issue #11579](https://github.com/zeroclaw-labs/zeroclaw/issues/11579)：** 严重的数据迁移 Bug，`save_dirty` 会错误地标记架构版本，导致 Agent 在重启后消失。
*   **降级 (S2)：**
    *   **[Issue #11420](https://github.com/zeroclaw-labs/zeroclaw/issues/11420)：** SQLite 会话后端因在每次轮询时重写记录，导致消息级时间戳丢失。
    *   **[Issue #11554](https://github.com/zeroclaw-labs/zeroclaw/issues/11554)：** 路径标记图像重复发送，导致模型在历史记录中幻觉出“新”图像。

### 6. 功能需求与路线图信号
*   **插件生态：** 大量 PR ([#11262](https://github.com/zeroclaw-labs/zeroclaw/pull/11262), [#11261](https://github.com/zeroclaw-labs/zeroclaw/pull/11261)) 表明 **插件更新与验证替换** 已接近 `v0.8.6` 的完成阶段。
*   **身份认证：** 对 Roster 密码生命周期管理的推进 ([#11265](https://github.com/zeroclaw-labs/zeroclaw/pull/11265)) 表明 ZeroClaw 正在为多用户/托管环境部署做准备。
*   **提供商扩展：** 对 [Opper](https://github.com/zeroclaw-labs/zeroclaw/issues/11583) 的新类型化提供商支持，显示了不依赖特定提供商的基础设施正在持续增长。

### 7. 用户反馈总结
用户目前对沙箱故障（Firejail/Bubblewrap）的“不透明性”感到不满，这使得排查部署问题变得十分困难。此外，用户对会话持久性也存在挫败感；具体表现为轮询期间重新加载会导致提示词丢失，以及守护进程重启后，失败的会话仍显示为绿色/就绪状态的“幽灵”显示问题 ([#11586](https://github.com/zeroclaw-labs/zeroclaw/issues/11586))。

### 8. 待办事项观察
*   **[Issue #11585](https://github.com/zeroclaw-labs/zeroclaw/issues/11585)：** 运行时忽略成本限制覆盖的 Bug，强制要求进行完整的守护进程重启。这是一个高优先级的“工作流阻碍”，需要维护者立即关注，以防止生产环境中用户的流失。

</details>

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*