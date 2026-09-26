# OpenClaw 生态日报 2026-09-26

> Issues: 500 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-09-26 00:51 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目摘要：2026-09-26

## 1. 今日概览
OpenClaw 项目目前处于高强度的“稳定性冲刺”阶段，过去 24 小时内有 500 个活跃议题和 500 个 PR 进行了更新。社区和维护者正集中精力修复 2026.9.5/6 版本中引入的稳定性回归问题，特别是内存泄漏、更新失败和网关性能等方面。虽然开发进度非常快，但大量“UX 发布阻塞”议题表明，在下一次稳定版发布前，进行严格的回归测试已迫在眉睫。

## 2. 版本发布
*   **无新版本发布。** 目前开发重心在于 2026.9.7 版本的候选修复（跟踪：[#157531](https://github.com/openclaw/openclaw/issues/157531)）。

## 3. 项目进展
*   **性能优化：** 多个 PR 旨在降低主线程开销，包括 [#158497](https://github.com/openclaw/openclaw/pull/158497)（优化并发会话查看器的呈现）和 [#158489](https://github.com/openclaw/openclaw/pull/158489)（改善长聊天流期间的响应速度）。
*   **更新恢复：** 正在加紧修复更新失败循环问题，特别是 PR [#157972](https://github.com/openclaw/openclaw/pull/157972)，该 PR 重点在于恢复挂起的更新并保留会话数据。
*   **插件/UI 稳定性：** PR [#155479](https://github.com/openclaw/openclaw/pull/155479) 恢复了 MS Teams SSO 登录功能，而 [#150549](https://github.com/openclaw/openclaw/pull/150549) 统一了 UI 中的聊天回复上下文。

## 4. 社区热点
*   **[#153257](https://github.com/openclaw/openclaw/issues/153257) (34 条评论)：** 用户反馈在升级到 2026.9.5 后出现灾难性的环境故障。社区对“稳定版”发布中出现的稳定性倒退表示极度不满。
*   **[#155753](https://github.com/openclaw/openclaw/issues/155753) (29 条评论)：** 一个关键的性能 Bug 导致 `model-catalog` 工作进程持续占用 100% CPU。这对于高频模型交互的用户来说是一个主要痛点。
*   **[#42475](https://github.com/openclaw/openclaw/issues/42475) (24 条评论)：** 持续存在对按代理（per-agent）执行成本预算的要求，凸显了在 OpenClaw 中建立企业级治理的需求日益增长。

## 5. Bug 与稳定性
*   **P0 (紧急) 回归问题：**
    *   **内存泄漏：** [#157842](https://github.com/openclaw/openclaw/issues/157842) 反馈 `prepared-model-catalog` 工作进程每轮消耗约 77MB 内存，超出了 512MB 的限制。
    *   **更新循环：** [#156986](https://github.com/openclaw/openclaw/issues/156986) 描述了更新程序在候选阶段无限挂起的问题。
    *   **死锁：** [#138409](https://github.com/openclaw/openclaw/issues/138409) 涉及插件更新期间的网关死锁。
*   **缓解措施：** 团队正在积极推动针对网关事件循环和 SQLite 协调器响应速度的修复（例如 [#158396](https://github.com/openclaw/openclaw/pull/158396)）。

## 6. 功能请求与路线图信号
*   **成本管理：** 按代理设置预算 ([#42475](https://github.com/openclaw/openclaw/issues/42475)) 和按模型记录使用情况 ([#13219](https://github.com/openclaw/openclaw/issues/13219)) 是运维控制方面最受关注的功能需求。
*   **系统诊断：** 更清晰的网关诊断信息以及对自托管 STT/TTS 的支持需求呈上升趋势，表明项目正趋向于更复杂、更偏向自我管理的部署场景。

## 7. 用户反馈总结
当前用户情绪受更新脆弱性的影响较为紧张。用户反馈称，“稳定”频道的更新往往会导致长达数小时的恢复工作。不过，项目组在处理缓解这些问题的 PR 方面响应迅速，且社区在识别近期回归频发的版本根源方面表现出很高的参与度。

## 8. 积压工作监视
*   **[#22438](https://github.com/openclaw/openclaw/issues/22438)：** 分层引导文件加载功能自 2 月以来一直停滞不前。这对管理大型工作空间的高级用户至关重要，但目前缺乏产品决策。
*   **[#67413](https://github.com/openclaw/openclaw/issues/67413)：** 为防止高密度安装环境下的 OOM（内存溢出）终止，需要配置按代理的“做梦”（后台任务）设置，但该项仍处于积压状态，尚未经维护者评审。

---

## 横向生态对比

### 1. 生态系统概览
开源 AI Agent 生态系统目前正处于从快速实验期向严格稳定性建设与基础设施强化期的转型过程中。各项目正集中精力处理因功能快速发布而积累的“技术债”，特别是在内存管理、环境隔离和插件架构方面。整个行业呈现出一个显著趋势：各平台正逐渐从简单的交互式聊天 UI，转型为具备持久化能力、可满足企业级需求的守护进程（Daemon）。

### 2. 活动对比

| 项目 | 活跃 Issue/PR (24h) | 近期发布 | 健康/稳定状态 |
| :--- | :--- | :--- | :--- |
| **OpenClaw** | ~1,000 | 无 | 严峻/功能退化 |
| **Hermes** | 100 | 无 | 趋于稳定/补丁修复 |
| **IronClaw** | 低 | 无 | 稳定/活跃度低 |
| **QwenPaw** | 25 | 无 | 高频迭代 |
| **ZeroClaw** | 100 | 无 | 安全强化 |

### 3. OpenClaw 的地位
OpenClaw 是该领域“重量级”的参考实现，以其庞大的社区参与度（24小时内更新超过 500 个 Issue/PR）为特征。
*   **优势：** 它拥有最全面的功能集和最高程度的社区审查，使其成为复杂企业级 Agent 部署的事实标准。
*   **技术路径：** 与其他模块化或聚焦细分领域的项目不同，OpenClaw 致力于提供一个“全栈” Agent 平台，这也导致了其目前在内存泄漏和版本更新脆弱性方面面临挑战。
*   **对比：** 其社区规模远超其他项目，但这同时也造成了“稳定性瓶颈”，即海量的 PR 和 Issue 积压，超出了维护者确保版本无回归的能力范围。

### 4. 共同关注的技术领域
*   **运行时与依赖隔离：** **Hermes** 和 **ZeroClaw** 都在与“依赖地狱”（Python venv、PM 运行时及符号链接安全性）作斗争，这表明整个生态在如何安全地处理本地 Agent 执行环境方面仍面临困难。
*   **成本与预算治理：** **OpenClaw** 和 **QwenPaw** 都在优先考虑单 Agent/单模型的成本控制，这预示着这些工具正被部署在对预算敏感的高频运行环境中。
*   **上下文管理：** **QwenPaw** 和 **OpenClaw** 都在探索上下文压缩和历史记录持久化，这反映了如何在不超出 Token 限制或导致用户感知到 UI“数据丢失”的前提下，维持 Agent 长期记忆的挑战。

### 5. 差异化分析
*   **ZeroClaw (安全与架构)：** 重点关注 OIDC、RPC 级主体认证以及以插件（WASM）为中心的未来。它是目前最“安全至上”且最具模块化特征的项目。
*   **IronClaw (细分实用性)：** 因专注于“长时间推理”和内部知识图谱维护而脱颖而出。它对通用 UI 的关注较少，更偏向于 Agent 逻辑原语的开发。
*   **QwenPaw (UX 与集成)：** 与其他侧重后端的项目相比，更注重 UI/UX 层及外部渠道集成（如 QQ 机器人等）。
*   **Hermes (开发效率)：** 将自身定位为开发工作流与 Agent 能力之间的桥梁，高度聚焦于远程工具链及 SSH/CLI 集成。

### 6. 社区势头与成熟度
*   **快速迭代：** **OpenClaw** 和 **QwenPaw** 依然是迭代速度最快的项目。尽管 QwenPaw 成功把控了成长节奏，但 OpenClaw 目前在维持质量方面显得吃力。
*   **稳定/强化期：** **ZeroClaw** 和 **Hermes** 已走出早期原型阶段，正在投入大量资源进行安全加固和架构重构。
*   **维护期：** **IronClaw** 目前表现出成熟、稳定项目的特征，以低强度、高质量的维护周期运行，而非进行剧烈的特性开发。

### 7. 趋势信号
*   **Agent 的“守护进程化”：** 用户正要求这些平台作为可靠的后台服务（Daemon）运行，以保证正常运行时间，摆脱基于会话的 CLI 交互模式。
*   **模块化取代单体：** 向基于 WASM 的插件（**ZeroClaw**）和运行时可安装模块的转型，表明开发者希望在不重新编译核心二进制文件的情况下自定义 Agent 行为。
*   **信任与治理：** 对身份验证、OIDC 集成以及严格的预算/成本强制执行的需求，明确信号表明 AI Agent 正在进入专业的企业生产环境，而“不受限制”的访问权限正成为一种风险。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目摘要：2026-09-26

## 1. 今日概览
Hermes Agent 项目目前处于高强度的维护状态，过去 24 小时内共有 100 项内容（Issue 和 PR）进行了更新。开发重心目前主要集中在解决近期实现的 PM (Package Manager) 运行时中的稳定性回归问题，以及微调多配置文件的安全边界。大量的活动——特别是围绕 Windows 环境隔离和跨配置文件身份验证方面——表明项目在近期架构调整后正处于稳定阶段。

## 2. 版本发布
*今日未发现新版本发布。*

## 3. 项目进展
今天在修正近期架构回归问题方面取得了显著进展，特别是在流式传输和安全子系统中：
*   **流式传输与 TTS 修复 ([PR #121741](https://github.com/NousResearch/hermes-agent/pull/121741))：** 解决了四个重大问题，包括恢复 xAI 流式传输、防止 Gemini 请求中的 API 密钥泄漏，以及修复 macOS 上的音频录制死锁。
*   **安全与身份验证加固 ([PR #121508](https://github.com/NousResearch/hermes-agent/pull/121508))：** 通过防止自定义 Codex-base 凭证泄漏到官方 OpenAI 端点，收紧了凭证边界。
*   **网关稳定性 ([PR #121360](https://github.com/NousResearch/hermes-agent/pull/121360))：** 通过在服务关闭时正确管理 state.db 的 WAL 生成，关闭了一个反复出现的 `DeletedWalGenerationError`。
*   **远程工具 ([PR #122657](https://github.com/NousResearch/hermes-agent/pull/122657))：** 修复了 SSH 文件路径解析问题，确保操作在远程主机而非本地 Hermes 主机上执行。

## 4. 社区热点
*   **[Issue #122183](https://github.com/NousResearch/hermes-agent/issues/122183) (14 条评论)：** Windows 网关严重崩溃。用户报告称新的 PM 运行时与旧版 venv 交互不当，导致 `pydantic_core` ABI 不匹配。
*   **[Issue #122656](https://github.com/NousResearch/hermes-agent/issues/122656) (7 条评论)：** 桌面应用更新逻辑中的反馈循环导致后端持续重启。这对使用源码/git 安装的高级用户来说是一个极度令人沮丧的问题。
*   **[Issue #73985](https://github.com/NousResearch/hermes-agent/issues/73985) (5 条评论)：** 尽管现已标记为关闭，但 xAI 流式 TTS 的多方面故障凸显了网络握手协议稳健性的不足。

## 5. 漏洞与稳定性
*   **[P1 - 关键] [Issue #122183](https://github.com/NousResearch/hermes-agent/issues/122183)：** Windows PM 运行时环境冲突。*状态：开启，高优先级。*
*   **[P1 - 关键] [Issue #122783](https://github.com/NousResearch/hermes-agent/issues/122783)：** PM 管理的安装包无法正确重新执行进入对应的 venv，导致网关执行时依赖项缺失。*状态：开启。*
*   **[P2 - 高] [Issue #122490](https://github.com/NousResearch/hermes-agent/issues/122490)：** 由于分发运行程序中缺少 `ruamel` 依赖，导致机器人与机器人之间的私信（DM）失败。*状态：开启。*

## 6. 功能请求与路线图信号
*   **[Issue #123165](https://github.com/NousResearch/hermes-agent/issues/123165)：** 用户请求为长时间运行的非聊天机器人任务提供自定义工作流。这标志着用户开始将 Hermes 作为持久化的后台守护进程使用，而不仅仅是一个交互式 CLI。
*   **[Issue #88891](https://github.com/NousResearch/hermes-agent/issues/88891)：** 对单任务模型/推理覆盖（override）的需求依然很高（3 个反馈），这表明用户希望在执行复杂的委派任务时，对 Token 消耗和推理深度有更细粒度的控制。

## 7. 用户反馈总结
当前用户情绪反映出对安装/更新可靠性的不满，特别是在向 PM 运行时过渡的过程中。用户报告更新过程中存在“无限循环”，且核心功能（如内存提供程序和 matrix 适配器）的依赖项损坏。社区在故障排除方面非常活跃，但当前状态表明 Windows 和基于源码的安装在“开箱即用”的稳定性方面出现了倒退。

## 8. 待办事项观察
*   **[Issue #68680](https://github.com/NousResearch/hermes-agent/issues/68680)：** 关于文档支持 `pt-BR` 语种的请求。虽然优先级较低，但该 Issue 自 7 月以来一直处于开启状态，代表了项目在技术推广国际化方面的缺失。
*   **[Issue #118381](https://github.com/NousResearch/hermes-agent/issues/118381)：** MCP 客户端初始化指令被丢弃。这是一个重要的疏忽，限制了外部 MCP 工具服务器的有效性。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目摘要：2026-09-26

### 1. 今日概览
IronClaw 项目目前处于稳步的内部维护和增量功能优化阶段，尽管今日整体活跃度维持在较低水平。过去 24 小时内没有报告或关闭任何新问题，工作重点目前集中在基础设施自动化和扩展运行时能力上。项目整体状态表现稳定，特征在于自动化的代码库清理以及对智能体执行环境的有针对性改进。

### 2. 发布
*本周期内未发现新版本发布。*

### 3. 项目进展
过去 24 小时内没有 PR 被合并或关闭。目前的活动仅限于两个处于审查阶段的开放 PR：
*   **[PR #8108](https://github.com/nearai/ironclaw/pull/8108)：** 推进了 `builtin.time` 功能，增加了 `shift` 操作，支持相对于时间戳的灵活时间计算（秒、分钟、小时、天、周）。
*   **[PR #7988](https://github.com/nearai/ironclaw/pull/7988)：** 一项例行的 CI 维护任务，旨在更新项目的代码库知识图谱，确保智能体的内部内存快照与当前代码库保持同步。

### 4. 社区热点
目前的活动集中在这两个 PR 上，但参与度较低（尚未有评论或反馈）：
*   **[PR #8108](https://github.com/nearai/ironclaw/pull/8108)：** 这是目前最重要的活跃事项，表明智能体运行时环境对更强大的日期时间处理能力有需求，这可能是为了支持自主智能体中复杂的调度或时间逻辑。
*   **[PR #7988](https://github.com/nearai/ironclaw/pull/7988)：** 凸显了该项目对自动化代码库感知的依赖，强化了对“自我理解”智能体的关注，即智能体需要最新的内存快照才能有效运行。

### 5. Bug 与稳定性
*今日未报告任何新的 Bug 或回归问题。*

### 6. 功能需求与路线图信号
[PR #8108](https://github.com/nearai/ironclaw/pull/8108) 中引入的 `builtin.time` 位移功能表明，路线图的重点在于增强 IronClaw 智能体的“时间推理”能力。用户或开发者似乎正在优先考虑在宿主运行时内原生执行复杂时间算术的需求，这是执行长时间运行或周期性任务的智能体的常见需求。

### 7. 用户反馈总结
过去 24 小时内没有可供综合分析的直接用户反馈或问题报告。目前没有开放的问题，这表明现有用户对当前的稳定性感到满意，或者项目正处于核心贡献者默默开发的阶段。

### 8. 待办事项关注
*   **[PR #7988 (代码库知识图谱更新)](https://github.com/nearai/ironclaw/pull/7988)：** 虽然这是一项例行的自动化任务，但该 PR 自 8 月 29 日以来一直处于开启状态。维护者应优先合并此任务，以确保对于依赖最新快照的用户来说，“代码库内存”功能保持准确。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目摘要：2026-09-26

## 1. 今日概览
QwenPaw 正处于高速开发阶段，过去 24 小时内共有 25 项内容（12 个 Issue，13 个 PR）进行了更新，显示出项目正处于活跃的维护冲刺期。目前项目重点在于稳定核心集成功能（QQ 机器人、Gemini、Playwright）并优化控制台（Console）的 UI/UX。尽管有大量来自首次贡献者的未合并 PR，但工程重心已明显转向解决上下文管理和会话持久化等长期稳定性问题。

## 2. 版本发布
*过去 24 小时内没有发布新版本。*

## 3. 项目进展
虽然在此期间没有合并 PR，但开发工作主要集中在以下方面：
*   **浏览器 SDK 稳定性：** [PR #7987](https://github.com/agentscope-ai/QwenPaw/pull/7987) 引入了对自定义 Playwright 参数的支持，专门修复了加载浏览器扩展时遇到的问题。
*   **搜索/工具安全性：** [PR #7988](https://github.com/agentscope-ai/QwenPaw/pull/7988) 通过为 `grep_search` 添加二进制过滤，解决了关键的安全/稳定性缺陷。
*   **UI 改进：** [PR #7989](https://github.com/agentscope-ai/QwenPaw/pull/7989) 优化了 Markdown 表格渲染，确保水平滚动条始终可见。
*   **厂商兼容性：** [PR #7982](https://github.com/agentscope-ai/QwenPaw/pull/7982) 修复了一个与 `thought_signature` 相关的 Gemini 工具调用关键 Bug。

## 4. 社区热点
*   **上下文压缩与内存：** [Issue #7628](https://github.com/agentscope-ai/QwenPaw/issue/7628)（7 条评论）仍然是关于预算管理的头号关注点。用户对上下文压缩逻辑无法准确计算总 Token 成本表示不满。
*   **历史记录持久化：** [Issue #7884](https://github.com/agentscope-ai/QwenPaw/issue/7884)（5 条评论）反映了用户对聊天记录在压缩后“消失”的不满，指出需要在 UI 层面提高已归档消息与实时消息之间的透明度。

## 5. Bug 与稳定性
*   **关键问题：** [Issue #7980](https://github.com/agentscope-ai/QwenPaw/issue/7980) – `grep_search` 在解析内部数据库文件时导致“死循环”。*修复状态：[PR #7988](https://github.com/agentscope-ai/QwenPaw/pull/7988) 进行中。*
*   **高优先级：** [Issue #7946](https://github.com/agentscope-ai/QwenPaw/issue/7946) – QQ 机器人网关消息重放导致重复处理。*修复状态：[PR #7983](https://github.com/agentscope-ai/QwenPaw/pull/7983) 待处理。*
*   **中优先级：** [Issue #7979](https://github.com/agentscope-ai/QwenPaw/issue/7979) – 本地 `llama.cpp` 模型上下文窗口配置错误，原因是对云端目录默认值的过度依赖。
*   **中优先级：** [Issue #7984](https://github.com/agentscope-ai/QwenPaw/issue/7984) – Playwright 配置文件扩展加载失败。*修复状态：[PR #7987](https://github.com/agentscope-ai/QwenPaw/pull/7987) 进行中。*

## 6. 功能需求与路线图信号
*   **侧边栏增强：** [Issue #7978](https://github.com/agentscope-ai/QwenPaw/issue/7978) 请求添加一个用于跨 Agent 监控的“最近会话”面板。
*   **可配置 UI：** [Issue #7957](https://github.com/agentscope-ai/QwenPaw/issue/7957) 请求支持禁用未使用的预置模型和通道，以减少界面冗余。
*   **模型配置：** [Issue #7990](https://github.com/agentscope-ai/QwenPaw/issue/7990) 请求更新模型目录，以暴露阿里云模型的 `thinking_param_style` 参数。

## 7. 用户反馈总结
用户目前对高性能本地 Agent 使用体验与 UI 层面的限制之间的落差感到“痛苦”。主要投诉包括：
*   压缩后“消失”的历史记录让用户感到数据丢失。
*   Web 控制台处理复杂输出（如宽表格）的方式限制了生产力。
*   高级用户认为针对模型窗口和扩展管理的默认“一刀切”设置过于受限。

## 8. 积压工作观察
*   [PR #7357](https://github.com/agentscope-ai/QwenPaw/pull/7357)（工具可见性切换）自 8 月下旬以来一直处于开启状态。这是一个备受期待的 UX 功能，但目前缺乏维护关注。
*   [PR #7359](https://github.com/agentscope-ai/QwenPaw/pull/7359)（厂商级媒体能力）仍然停滞不前，阻碍了对非云端供应商更好的多模态支持。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目简报：2026-09-26

## 1. 今日概览
ZeroClaw 的活跃度依然很高，过去 24 小时内 Issue 和 PR 总计有 100 次更新。项目目前处于“稳定与安全加固”阶段，重点在于整合基于 OIDC 的身份验证并加固运行时边界。维护者的精力主要集中在核心架构上，特别是向插件中心化模型转型，以及规范化智能体（Agent）之间的通信。

## 2. 版本发布
*过去 24 小时内无新版本发布。*

## 3. 项目进展
多个重要 PR 已合并，表明项目正聚焦于清理工作与安全对齐：
*   **[PR #11046](https://github.com/zeroclaw-labs/zeroclaw/pull/11046):** 移除了冗余的 base64 内联，修复了截图工具的行为，减少了消息负载冗余。
*   **[PR #10259](https://github.com/zeroclaw-labs/zeroclaw/pull/10259):** 合并了安全重构的第三阶段，通过原生凭据和对等凭据在 RPC 上强制执行已认证的主体（Authenticated principals）。
*   **[PR #11072](https://github.com/zeroclaw-labs/zeroclaw/pull/11072):** 修复了 Nix flake 打包，以实现与宿主系统更好的集成。
*   **[PR #10397](https://github.com/zeroclaw-labs/zeroclaw/pull/10397):** 改进了 MCP 工具的结果格式化，确保文本块传输的无损性。

## 4. 社区热点
*   **[Issue #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) (15 条评论):** 维护者决策队列继续作为设计 RFC 的核心协调点，反映了随着项目规模扩大，治理结构化的迫切需求。
*   **[Issue #8586](https://github.com/zeroclaw-labs/zeroclaw/issues/8586) (10 条评论):** 关于统一 Webhook 消息分发的讨论表明，社区正在推动标准化跨渠道的消息生命周期。
*   **[Issue #6489](https://github.com/zeroclaw-labs/zeroclaw/issues/6489) (9 条评论):** 关于统一功能目录（“一切皆插件”）的持续争论，仍是项目架构方向的主要北极星指标。

## 5. Bug 与稳定性
*   **[Issue #11110](https://github.com/zeroclaw-labs/zeroclaw/issues/11110) [严重程度: S0]:** 工作区隔离中涉及可重定向符号链接的安全风险；目前正在处理中。
*   **[Issue #11108](https://github.com/zeroclaw-labs/zeroclaw/issues/11108) [严重程度: S2]:** 浏览器/搜索工具被错误地重写为 shell 命令的 Bug，导致智能体能力下降。
*   **[Issue #11055](https://github.com/zeroclaw-labs/zeroclaw/issues/11055) [严重程度: S1]:** 守护进程无法注册 channel-map 工厂，导致核心工具（SOP、webhooks）不可用。

## 6. 功能需求与路线图信号
*   **[Issue #11103](https://github.com/zeroclaw-labs/zeroclaw/issues/11103):** 增加“Cheaper Inference”作为 OpenAI 兼容提供商。这反映了用户对低成本 LLM API 替代方案日益增长的需求。
*   **[Issue #8850](https://github.com/zeroclaw-labs/zeroclaw/issues/8850):** 将编译时特性转换为运行时可安装的 WASM 插件，这是路线图的一个重要信号，旨在提高二进制文件的模块化程度。

## 7. 用户反馈总结
用户目前主要关注两个痛点：
1.  **工具可靠性：** 智能体选择工具时的困惑/回归（例如将浏览器请求重写为 shell 命令）影响了对智能体智力的感知。
2.  **部署摩擦：** 身份验证和通道映射相关的设置复杂性（如 #111055 所示），给尝试运行稳健守护进程部署的用户制造了障碍。

## 8. 待办事项追踪
*   **[Issue #8431](https://github.com/zeroclaw-labs/zeroclaw/issues/8431):** 持续追踪临时制品的审计/清理工作；目前处于“暂存区”，需要长期资源分配。
*   **[Issue #6864](https://github.com/zeroclaw-labs/zeroclaw/issues/6864):** 倒置 `zeroclaw-channels` 和 `zeroclaw-runtime` 之间的依赖层，这是一项关键的架构任务，目前仍在部分进行中。

</details>

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*