# OpenClaw 生态日报 2026-11-05

> Issues: 93 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-11-05 01:29 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目摘要 – 2026-11-05

## 1. 今日概览
OpenClaw 目前正处于高强度的维护与稳定性攻坚阶段。项目当前有 93 个活跃议题，过去 24 小时内处理了 500 个拉取请求，正面临着修复近期版本中引入的回归问题的压力。虽然“Knowledge Scribes”（知识书吏）和 PostgreSQL 后端状态存储的引入展示了良好的功能开发势头，但核心 Gateway 运行时在高并发负载下的内存管理和稳定性方面表现堪忧。

## 2. 版本发布
*   **[v2026.11.5-beta.1](https://github.com/openclaw/openclaw/releases/tag/v2026.11.5-beta.1):** 
    *   **亮点：** 引入 **Knowledge Scribes**，用于实现一等公民级别的知识捕获及跨 Agent 工作流持久化。
    *   **架构：** 为数据平面增加了 **PostgreSQL 后端状态** 选项，为现有的以 SQLite 为中心的架构提供了替代方案。

## 3. 项目进展
*   **CI/CD 优化：** 重点关注 CI 流水线效率，特别是跳过未变更的 Markdown 测试 ([#193105](https://github.com/openclaw/openclaw/pull/193105))，以及优化 Vitest 转换缓存键的准备工作 ([#193107](https://github.com/openclaw/openclaw/pull/193107))。
*   **UI/UX 改进：** 推进了团队侧边栏中置顶 Agent 的居中显示 ([#193101](https://github.com/openclaw/openclaw/pull/193101))，并修复了关于复制标签的回归测试失败问题 ([#193096](https://github.com/openclaw/openclaw/pull/193096))。
*   **问题修复：** 解决了插件初始化目录冲突 ([#193100](https://github.com/openclaw/openclaw/pull/193100))，并更正了 A2A 路由逻辑 ([#193102](https://github.com/openclaw/openclaw/pull/193102))。

## 4. 社区热点议题
*   **[#160959](https://github.com/openclaw/openclaw/issues/160959): 大插件导致 Gateway 阻塞数分钟 (70 条评论)。** 这是目前最关键的性能瓶颈，意味着拥有大型依赖树的用户无法有效使用 Gateway。
*   **[#177656](https://github.com/openclaw/openclaw/issues/177656): 原生主机执行完整性准入错误 (28 条评论)。** 对 2026.10.5 版本用户而言属于高危问题，指向了共享状态处理中的系统性故障。
*   **[#150635](https://github.com/openclaw/openclaw/issues/150635): Dreaming 深层阶段内存管理 (24 条评论)。** 用户担心短期记忆上限 512 条的限制正在严重阻碍 Agent 的知识升华能力，导致“dreaming”阶段停滞。

## 5. 漏洞与稳定性
*   **紧急 (P0/P1):**
    *   [#160959](https://github.com/openclaw/openclaw/issues/160959): 大型插件依赖树导致启动阻塞。
    *   [#193028](https://github.com/openclaw/openclaw/issues/193028): Linux 上 session 读取后出现 5.5 GiB RSS 的 OOM kill。
    *   [#191847](https://github.com/openclaw/openclaw/issues/191847): 由于 session 体积过大导致 SQLite worker 内存溢出 (OOM)。
*   **高优先级 (回归/认证):**
    *   [#161921](https://github.com/openclaw/openclaw/issues/161921): 插件更新与 `doctor --fix` 之间的循环依赖。
    *   [#190307](https://github.com/openclaw/openclaw/issues/190307): 重启后 Agent 卡在“降级”(degraded) 状态。

## 6. 功能需求与路线图信号
*   **Cua Spaces 支持：** 用户请求通过 WorkerProvider 插件契约集成 Cua Spaces ([#187774](https://github.com/openclaw/openclaw/issues/187774))。
*   **Agent 反馈解读：** 推动对反应触发式 Agent 回合（例如通过表情符号轮询）的原生支持，无需自定义补丁 ([#17840](https://github.com/openclaw/openclaw/issues/17840))。
*   **自动化透明度：** 社区对在控制 UI 中实时观察运行中的命令自动化提出了更高需求 ([#186888](https://github.com/openclaw/openclaw/pull/186888))。

## 7. 用户反馈摘要
用户目前对近期小版本升级（特别是 2026.10.x 系列）后的不稳定性感到沮丧。主要抱怨集中在“准入错误”、V8 堆外内存增长，以及 Agent 在没有明确日志的情况下停止输出数据或变得无响应的“静默”故障。社区强烈呼吁将稳定性修复更好地向旧版稳定分支进行回溯。

## 8. 待办事项观察
*   [#17840](https://github.com/openclaw/openclaw/issues/17840): 关于反应触发式回合的功能请求自 2026 年 2 月起一直挂起，需要明确的产品决策。
*   [#139586](https://github.com/openclaw/openclaw/issues/139586): 将自动化管理扩展到原生 macOS/Talk 的相关议题依然处于停滞状态，需维护者审查后方可推进。

---

## 横向生态对比

# 跨项目生态报告：AI Agent 与个人助理（2026-11-05）

### 1. 生态概览
开源 AI Agent 生态目前正处于“稳定与安全”阶段，重心已从功能的快速扩张转移到企业级及多租户生产环境的严苛要求上。虽然 **OpenClaw** 和 **ZeroClaw** 等项目正深陷内存扩展与安全性方面的架构难题，但 **Hermes Agent** 和 **QwenPaw** 则专注于用户体验（UX）、跨平台兼容性以及模块化扩展。整个生态正在脱离实验性的小众工具，转向需要精密编排与内存管理的稳健、状态持久化系统。

### 2. 活跃度对比

| 项目 | 活跃 Issue/PR | 近期活跃度 | 发布状态 | 健康评分* |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | ~593 | 极高 | v2026.11.5-beta | 临界（不稳定） |
| **Hermes Agent** | ~70 | 高 | 无 | 高（迭代中） |
| **QwenPaw** | ~59 | 高 | v2.3.0b2 (稳定) | 中（打磨中） |
| **ZeroClaw** | ~50+ | 高 | v0.9.0 (预发布) | 高（侧重安全） |
| **IronClaw** | 0 | 可忽略 | 无 | 稳定（静默期） |

*\*健康评分基于当前回归频率和维护者响应速度的定性评估。*

### 3. OpenClaw 的地位
OpenClaw 仍然是生态中的“重量级”参考架构，拥有最高的贡献者活跃度，但也背负着最沉重的技术债。
*   **优势：** 它提供了功能最丰富的环境，包括先进的“知识书写器（Knowledge Scribes）”和基于 PostgreSQL 的状态存储。
*   **差异化：** 与专注于插件 UX 和 CLI 流程的 Hermes 或 QwenPaw 不同，OpenClaw 优先考虑复杂的跨 Agent 工作流持久化。
*   **规模：** 它是唯一一个处理“企业级”更新量（每日 500+ 次更新）的项目，但该体量目前也带来了高频率的回归风险以及竞品已基本规避的内存溢出（OOM）稳定性问题。

### 4. 共同的技术关注点
*   **确定性会话管理：** **QwenPaw** (#8532) 和 **ZeroClaw** (RFC #10526) 均在转向追加式（append-only）会话历史/状态重放，以修复长对话中的数据损坏问题。
*   **内存隔离：** 防止跨 Agent 内存泄漏或“会话中毒”对于 **ZeroClaw** (PR #11266) 和 **OpenClaw** (Issue #150635) 至关重要。
*   **基于 SQL 的状态存储：** 从平面文件/本地 SQLite 向更健壮的数据库（PostgreSQL）迁移，已成为大规模部署的明确需求（**OpenClaw**，**QwenPaw**）。

### 5. 差异化分析
*   **ZeroClaw（安全专家）：** 专注于身份验证、主体感知（principal-aware）的工具执行以及多租户仪表盘隔离。
*   **Hermes Agent（极客 CLI）：** 专注于“家庭实验室（homelab）”式设置、类 Vim 的高效交互，以及通过第三方插件实现快速自定义。
*   **QwenPaw（企业适配器）：** 专注于现实业务的通讯集成（钉钉、Matrix）以及平台无关性（NAS/Windows）的可靠性。
*   **IronClaw（极简主义）：** 作为稳定、低维护的实用工具，更倾向于作为底层基础库或依赖项，而非独立的 Agent 平台。

### 6. 社区动力与成熟度
*   **快速迭代：** **OpenClaw** 和 **ZeroClaw** 是当前生态的引擎；它们的进展设定了企业就绪度与安全性的基准。
*   **趋于稳定：** **QwenPaw** 和 **Hermes Agent** 处于“打磨”阶段，致力于改善开发者体验并处理特定的运行时边缘情况，而非对核心架构进行大改。
*   **静默期：** **IronClaw** 目前处于停滞状态，表明该项目要么已达到自然终点，要么正在等待重大更新。

### 7. 趋势信号
*   **从聊天转向自动化：** 对“命令自动化实时观察”（OpenClaw）和“反应触发式 Agent 轮次”的需求，标志着重心正从聊天机器人向能够在操作系统环境中自主运行的*主动式 Agent* 转移。
*   **“企业级鸿沟”：** 用户正试图将 Agent 从单用户 CLI 环境迁移至多用户、Web 可访问的设置中，这引发了巨大的摩擦。这代表了这些项目下一个增长前沿。
*   **“静默失败”的挫败感：** 开发者和用户都已厌倦了“内部错误”和通用的日志信息。社区正在要求可观测性——他们想知道 Agent 拒绝提示词或卡死的原因，而不仅仅是知道它失败了。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目摘要：2026-11-05

## 1. 今日概览
Hermes Agent 项目目前非常活跃，过去 24 小时内共有 70 个活跃议题（Issues）和合并请求（PR）得到更新。当前的开发重点在于强化网关（Gateway）、提升 Desktop 和 TUI 界面的用户体验（UX），以及解决涉及模型切换和身份验证的关键集成错误。整体项目迭代速度较快，主要表现为对回归报告的迅速响应，以及社区贡献插件的持续涌入。

## 2. 版本发布
*无。*

## 3. 项目进展
*   **Agent 逻辑优化：** PR [#148826](https://github.com/nousresearch/hermes-agent/pull/148826) 针对 Anthropic 拒绝请求导致的“会话中毒”问题引入了关键修复，允许用户通过新的 `/drop` 命令恢复会话。
*   **插件生态增长：** 社区持续扩展功能，新提交了 [EventForge](https://github.com/nousresearch/hermes-agent/pull/149194) 和专业的 [Fashion Design 工作区](https://github.com/nousresearch/hermes-agent/pull/149193) 插件。
*   **Vim 集成：** 通过添加 Space-leader 快捷键 (PR [#148813](https://github.com/nousresearch/hermes-agent/pull/148813)) 和优化多行编写器（composer）行为 (PR [#148814](https://github.com/nousresearch/hermes-agent/pull/148814))，提升了 CLI 的可用性。

## 4. 社区热点
*   **Reflection Beam 模型切换：** PR [#149192](https://github.com/nousresearch/hermes-agent/pull/149192) 解决了在切换模型时反复出现的 HTTP 400 错误，这表明用户正积极测试高级推理模型，并遇到了状态同步方面的障碍。
*   **生产环境加固：** 议题 [#148843](https://github.com/nousresearch/hermes-agent/issues/148843) 指出，在多配置文件的家庭实验室（homelab）环境中，高级用户倾向于自行打包“生产补丁系列”以提升稳定性，这预示着项目需要为复杂部署场景提供更强大的上游支持。

## 5. Bug 与稳定性
*   **高优先级：**
    *   [#149107](https://github.com/nousresearch/hermes-agent/issues/149107)：JSON schema 解析崩溃，导致系统静默回退到次优模型。
    *   [#148852](https://github.com/nousresearch/hermes-agent/issues/148852)：Azure/APIM 身份验证标头传递不一致，导致诊断和元数据探测失败。
*   **中优先级：**
    *   [#147387](https://github.com/nousresearch/hermes-agent/issues/147387)：使用令牌模式（token-mode）的 Desktop 用户在受限仪表板环境中遭遇 WebSocket 拒绝。
    *   [#148849](https://github.com/nousresearch/hermes-agent/issues/148849)：元数据探测错误地继承了系统代理设置，导致请求超时。

## 6. 功能需求与路线图信号
*   **自动重试：** 用户请求增加一项功能：当聊天轮次因临时限额而失败时，在限额重置后自动重试 ([#148836](https://github.com/nousresearch/hermes-agent/issues/148836))。
*   **本地化维护：** 随着俄语词典和 UI 翻译层的引入 ([#148842](https://github.com/nousresearch/hermes-agent/issues/148842))，路线图可能需要正式制定一套工作流，以管理针对快速增长的插件目录的社区翻译工作。

## 7. 用户反馈总结
用户普遍对该工具的多功能性表示满意，但在复杂环境中遇到了一些“摩擦”。主要痛点包括：
*   **UX 缺陷：** Desktop 用户对无法编辑已排队的提示词（prompts）以及嵌套文件夹中缺乏 Git 更改的视觉反馈感到不满。
*   **配置复杂性：** 网关偶尔会将自身的默认配置标记为错误，“Skills Hub”中搜索与安装的一致性也让 CLI 用户感到困惑。

## 8. 待办事项关注
*   [#148853](https://github.com/nousresearch/hermes-agent/issues/148853)：Liveness-watchdog 强制退出失败。这是一个关键的稳定性问题，可能导致生产环境中留下僵尸进程；需要立即处理。
*   [#148835](https://github.com/nousresearch/hermes-agent/issues/148835)：关于使用受损 SSL 证书的 Git for Windows 依赖项的安全隐患。应优先在下一个补丁周期中解决。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目摘要 – 2026-11-05

### 1. 今日概览
IronClaw 项目目前处于低活跃状态，过去 24 小时内没有新的 Issue、发布或合并的 Pull Request。主要的开发工作仍集中在常规的依赖维护上，这体现在仅有的一个自动化 Pull Request 中。项目整体进展缓慢，显示该项目目前处于稳定期，或是功能开发的暂时停滞期。

### 2. 发布
*无。*

### 3. 项目进展
*过去 24 小时内没有合并或关闭任何 Pull Request。*

### 4. 社区热点
目前没有活跃的讨论、Issue 或高参与度的 Pull Request。社区互动极少，表明目前没有迫切的用户关注点或紧急的开发争议。

### 5. Bug 与稳定性
过去 24 小时内未提交任何新的 Bug 报告或与稳定性相关的问题。项目保持稳定状态，没有需要立即处理的活跃回归问题（Regression）。

### 6. 功能需求与路线图信号
未提交新的功能需求。目前的路线图似乎侧重于技术债务和依赖管理，而非功能扩展。根据当前趋势，未来的更新可能会继续侧重于基础设施维护和库更新（例如待处理的 `zip` crate 版本升级），而非重大的用户体验或智能体能力改进。

### 7. 用户反馈总结
暂无新的用户反馈。社区的沉寂表明，IronClaw 的当前版本满足了基础使用需求，且未引发明显的 Bug 或技术支持请求。

### 8. 待办事项监控
项目待办列表目前没有未解决的 Issue 或长期无人问津的事项。当前唯一一个待处理的 PR 是常规的依赖更新：
*   [#8168](https://github.com/nearai/ironclaw/pull/8168): [dependencies, rust] chore(deps): bump zip from 8.6.0 to 9.0.5. 
    *   *状态：* 打开；等待维护者审核。这是一项标准维护任务，旨在与最新的 `zip-rs` 版本保持一致。

---

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目摘要：2026-11-05

## 1. 今日概览
QwenPaw 项目展现出极高的开发活跃度，过去 24 小时内有 50 个 PR 处于活跃审核状态，并处理了 9 个 issue。社区当前的工作重点在于稳定跨平台部署（Windows/NAS）以及针对 v2.3.0b2 发布周期完善内存与工具调用能力。尽管大量的开放 PR 表明维护团队正处于高负载状态，但项目目前仍处于“打磨”阶段，而非重大功能冻结期，主要目标是提升复杂运行环境下的稳定性。

## 2. 发布记录
*   **无新版本发布**：过去 24 小时内未记录新版本。目前的稳定测试版本仍为 `v2.3.0b2`。

## 3. 项目进展
*   **桌面端与更新**：合并了 PR [#8575](https://github.com/agentscope-ai/QwenPaw/pull/8575)，限制自动更新仅针对稳定版本，防止用户误触拉取不稳定的预发布版本。
*   **Matrix 插件**：合并了 PR [#8559](https://github.com/agentsleigh-ai/QwenPaw/pull/8559)，默认打包 E2EE 依赖，简化了安全消息传输的配置过程。
*   **内存插件**：关于 [OpenViking 内存插件](https://github.com/agentscope-ai/QwenPaw/pull/7613) 的长期工作已完成并合并，进一步扩展了项目的内存后端选项。

## 4. 社区热点话题
*   **[Issue #8278](https://github.com/agentscope-ai/QwenPaw/issues/8278)：** 钉钉消息降级问题。用户对长消息（>3500 字符）回退为纯文本导致 Markdown 表格格式失效感到不满。这凸显了企业级渠道迫切需要一套健壮的“消息分段”或“分次发送”机制。
*   **[PR #8532](https://github.com/agentscope-ai/QwenPaw/pull/8532)：** 添加仅追加（append-only）会话存储。这是一项关键的架构调整，旨在通过摒弃可变快照，转而使用 SQLite 支持的历史记录，从而更可靠地处理长对话。

## 5. 缺陷与稳定性
*   **高优先级（严重）：** [Issue #8565](https://github.com/agentscope-ai/QwenPaw/issues/8565) - Hub Local 运行时在 Windows 上因 AppContainer 和架构检测问题无法启动。
*   **高优先级（阻塞）：** [Issue #8581](https://github.com/agentscope-ai/QwenPaw/issues/8581) - `code` 模式下工具调用失败。任何参数名为 `name` 的工具都会因位置参数和关键字参数冲突而崩溃。目前已找到简单的修复方案（仅使用位置参数），但尚未合并。
*   **中优先级：** [Issue #8579](https://github.com/agentscope-ai/QwenPaw/issues/8579) - 禁用服务提供商后，残留的代理配置会导致令人困惑的“Provider is disabled”错误，且缺乏清晰的用户反馈。

## 6. 功能需求与路线图信号
*   **通知优化：** [Issue #8460](https://github.com/agentscope-ai/QwenPaw/issues/8460)（已关闭/功能）显示出对获取待审批事项的操作系统级推送通知的需求。
*   **资源管理：** [PR #8574](https://github.com/agentscope-ai/QwenPaw/pull/8574) 为 shell 命令引入了可选的内存限制，标志着项目正向更安全、沙盒化的代理执行环境转变。

## 7. 用户反馈总结
用户目前正在特殊环境（如 fnOS NAS、Windows 本地 hub）中不断探索 QwenPaw 的边界。反馈表明，尽管系统功能强大，但“隐藏”的逻辑——例如静默的消息降级，或更改服务提供商后残留的模型配置——导致了糟糕的用户体验。用户期望能获得更详尽的错误提示，以解释函数失败的根本原因，而非仅仅收到通用的“内部错误”提示。

## 8. 待处理任务 (Backlog Watch)
*   **[PR #8291](https://github.com/agentscope-ai/QwenPaw/pull/8291)：** 关于 ReMe 重排序 API 密钥的首次贡献者修复；该 PR 自 10 月起一直挂起，属于“低垂的果实”，合并该 PR 有助于鼓励新贡献者。
*   **[PR #8234](https://github.com/agentscope-ai/QwenPaw/pull/8234)：** 编码修复（GBK/CP936 支持）。鉴于 QwenPaw 在中国拥有庞大的用户群，针对旧版文件读取的修复至关重要，需要加快审核进度以防止本地文件处理过程中的数据丢失。

---

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目摘要：2026-11-05

## 1. 今日概览
ZeroClaw 目前正处于高强度的系统稳定和安全加固阶段，开发团队正全力冲刺 **v0.9.0** 版本发布。开发活动极其活跃，过去 24 小时内更新了 50 个 PR，工作重点几乎完全集中在多租户安全、会话隔离和管理权限控制上。尽管功能开发仍在继续，但项目的核心动力已转向确保多用户仪表板访问和子代理（subagent）委派不会损害内部内存或会话隐私。

## 2. 版本发布
*   **无新版本发布。**（注：v0.9.0 是当前绝大多数高优先级 PR 的主要发布目标）。

## 3. 项目进展
今天的贡献聚焦于填补长期存在的安全漏洞并实施稳健的身份管理：
*   [PR #12213](https://github.com/zeroclaw-labs/zeroclaw/pull/12213) (已合并)：修复了一个关键问题，即 `gateway.pairing_dashboard` 设置被忽略，最终实现了配对码的正常过期功能。
*   [PR #11266](https://github.com/zeroclaw-labs/zeroclaw/pull/11266) (已合并)：解决了架构上的一个重大缺陷，即 `spawn_subagent` 和流水线可能导致父级内存泄露给子级；子代理现在被严格限定在作用域内。
*   [PR #11220](https://github.com/zeroclaw-labs/zeroclaw/pull/11220) (已合并)：强制要求执行 SOP（标准作业程序）需具备管理员权限，这是安全企业部署的一个关键里程碑。
*   [PR #11230](https://github.com/zeroclaw-labs/zeroclaw/pull/11230) (已合并)：将敏感的会话数据工具限制为仅限管理员主体使用。

## 4. 社区热点
*   **[RFC #10526](https://github.com/zeroclaw-labs/zeroclaw/issue/10526)：** 仅追加（Append-only）会话历史。该 RFC 已被采纳并关闭，标志着未来向确定性状态重放（deterministic state replay）的重大架构转型。
*   **[PR #11986](https://github.com/zeroclaw-labs/zeroclaw/pull/11986)：** 作用域仪表板聊天。这是一个超大型（XL）PR，代表了允许非管理员用户通过 Web 仪表板与代理交互的最后一块拼图。

## 5. Bug 与稳定性
*   **[Issue #12239](https://github.com/zeroclaw-labs/zeroclaw/issue/12239) (S0 - 安全)：** 所有者会话触及共享内存平面。*状态：已通过 PR #11266 修复。*
*   **[Issue #12235](https://github.com/zeroclaw-labs/zeroclaw/issue/12235) (S2 - 功能降级)：** 委派代理忽略 `native_tools`。*状态：开放。*
*   **[Issue #12228](https://github.com/zeroclaw-labs/zeroclaw/issue/12228) (S2 - 功能降级)：** Cron 更新命令显示成功但实际未能重新分配代理。*状态：开放。*
*   **[Issue #12227](https://github.com/zeroclaw-labs/zeroclaw/issue/12227) (S2 - 功能降级)：** Shell 批准触发机制在处理模型生成的参数时表现不一致。*状态：开放。*
*   **[Issue #12236](https://github.com/zeroclaw-labs/zeroclaw/issue/12236) (S3 - 轻微)：** CI 测试运行时缓存的 HTTP 客户端冲突。*状态：开放。*

## 6. 功能请求与路线图信号
*   **Zulip 频道支持：** [Issue #6437](https://github.com/zeroclaw-labs/zeroclaw/issue/6437) 目前处于“暂存区”。这是自托管运维人员强烈要求的一项功能，很可能在 v0.9.0 的安全工作稳定后被优先处理。
*   **非管理员仪表板聊天：** [Issue #11984](https://github.com/zeroclaw-labs/zeroclaw/issue/11984) 正在跟踪当前正在进行的安全 PR 的用户侧需求；极有可能在 v0.9.0 中进入稳定发布。

## 7. 用户反馈摘要
当前的用户情绪反映出对“企业级就绪”的关注。用户报告的问题主要集中在从单用户 CLI 设置迁移到多用户 Web 界面环境时的摩擦。对细粒度访问控制的需求十分明显，关于主体感知工具执行和 OIDC 验证的大量安全修复即是明证。

## 8. 待办事项关注
*   **[PR #11805](https://github.com/zeroclaw-labs/zeroclaw/pull/11805)：** Windows 命名管道服务器验证。自 10 月中旬以来一直等待维护人员审查/重构；这是实现强力 Windows 支持的阻塞项。
*   **[PR #9746](https://github.com/zeroclaw-labs/zeroclaw/pull/9746)：** 按代理的所有权范围界定。这是一个 XL 规模的 PR，尽管对安全至关重要，但仍处于开放状态——它代表了在隔离每个代理的 Discord/Telegram 数据方面还有大量未完成的工作。

</details>

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*