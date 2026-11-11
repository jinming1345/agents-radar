# OpenClaw 生态日报 2026-11-11

> Issues: 99 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-11-11 01:34 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目摘要 - 2026-11-11

## 1. 今日概览
OpenClaw 仓库正处于紧张的维护与稳定性打磨阶段，过去 24 小时内处理了 99 个活跃议题更新和 500 个 PR 更新。开发工作主要集中在解决会话状态不一致、CLI/Gateway 同步问题，以及近期 Beta 版本中引入的回归问题。项目整体健康度目前处于“稳定模式”，包含了大量旨在改善用户体验摩擦（UX friction）和提升多提供商环境下可靠性的小型修复。

## 2. 版本发布
*   **[v2026.11.3](https://github.com/openclaw/openclaw/releases/tag/v2026.11.3)：** 聚焦于隐私与可靠性。引入了从聊天流中排除私有子代理（subagent）补全内容的机制 (#188490)，并改进了子任务取消逻辑，以确保任务能够平滑交接。
*   **[v2026.9.37](https://github.com/openclaw/openclaw/releases/tag/v2026.9.37)：** 一个仅针对“网关（Gateway）”的扩展稳定维护版本。它为尚未准备好升级至 2026.11.x 分支的旧版本安装提供了关键安全与性能修复的向后移植。

## 3. 项目进展
今日进展主要体现在针对 Web UI 和 Gateway 同步的快速迭代补丁上。已合并/关闭的关键事项包括：
*   **Memory Wiki：** [PR #196728](https://github.com/openclaw/openclaw/pull/196728) 修复了字面标题渲染问题。
*   **诊断与恢复：** [PR #196465](https://github.com/openclaw/openclaw/pull/196465) 改进了 doctor 工具探测 agent-dir 读取失败的能力。
*   **UI 稳定性：** 多个 PR（[#196464](https://github.com/openclaw/openclaw/pull/196464), [#196458](https://github.com/openclaw/openclaw/pull/196458)）修复了侧边栏和代理执行流程中的外观及状态清理问题。

## 4. 社区热点
*   **[#193962](https://github.com/openclaw/openclaw/issues/193962)：** SQLite 标头探测超时问题（26 条评论）。用户反馈在旧版本上更新失败，新的标头探测逻辑会导致 ETIMEDOUT 错误。
*   **[#123792](https://github.com/openclaw/openclaw/issues/123792)：** CLI 后端渲染重复问题（18 条评论）。这是一个持续存在的用户体验痛点，即助手回复同时显示实时块（live block）和聚合记录。
*   **[#154572](https://github.com/openclaw/openclaw/issues/154572)：** `SessionTranscriptWriterClaimReboundError`（16 条评论）。对于依赖 `claude-cli` 运行时的用户至关重要，凸显了会话切换机制的脆弱性。

## 5. Bug 与稳定性
*   **严重（P0/回归）：** 
    *   [#190563](https://github.com/openclaw/openclaw/issues/190563) - 无法恢复暂停的 Codex 聊天；提供商审查/线程不匹配。
    *   [#174681](https://github.com/openclaw/openclaw/issues/174681) - 插件准备工作导致 Gateway 长达数分钟的卡顿。
    *   [#196799](https://github.com/openclaw/openclaw/issues/196799) - Linux AppImage webkit 不兼容（导致控制 UI 被拒绝）。
*   **崩溃循环（Crash-loop）：** [#181120](https://github.com/openclaw/openclaw/issues/181120)（macOS Gateway 在 `MessagePort` 关闭时挂起）。
*   **状态：** 许多问题已贴上重现标签（`clawsweeper:source-repro`），但有几个 P0 级问题目前被标记为发布阻断（release-blockers），这预示着下一个稳定版本的发布可能会推迟。

## 6. 功能需求与路线图信号
*   **自动化：** [Issue #192009](https://github.com/openclaw/openclaw/issues/192009) 请求显式的跨提供商 cron 回退授权，表明对更稳健的生产自动化管理的需求。
*   **遥测：** [Issue #196279](https://github.com/openclaw/openclaw/issues/196279) 请求在诊断事件中加入 `sessionKey` 和 `agentId`，以帮助插件开发者跟踪使用情况。
*   **预测：** 预计未来的版本将优先考虑“自我修复”功能（如 `matrix doctor` 的增强）以及对 Git 共同作者身份更细粒度的控制。

## 7. 用户反馈总结
用户目前对“更新循环”（迁移失败）以及 Web UI/控制界面表现出的不一致性感到沮丧。有强烈信号表明，尽管核心代理逻辑功能强大，但其基础设施（Gateway 启动、SQLite 数据库管理和插件认证）在规模化使用时正变得脆弱，特别是对于那些运行多个持久会话或使用基于 CLI 后端的用户而言。

## 8. 待办事项观察
*   **[#112638](https://github.com/openclaw/openclaw/issues/112638)：** 自 2026 年 7 月以来一直存在的议题，关于会话维护未强制执行内存/磁盘限制。这对服务器的长期稳定性构成了重大风险，目前仍亟待产品决策。
*   **[#57278](https://github.com/openclaw/openclaw/issues/57278)：** Telegram 机器人照片归属/注入问题；这是一个自 3 月以来几乎没有进展的 UX 烦恼。

---

## 横向生态对比

# 跨项目分析：个人 AI Agent 生态系统 (2026-11-11)

### 1. 生态系统概览
开源 AI Agent 生态系统目前正处于从“功能探索”阶段向“企业级加固与可靠性”阶段的转型期。各项目都在努力平衡插件驱动的快速扩展性与代理（Agent）长期运行状态管理所需的稳定性。行业趋势非常明确：正朝着安全标准化（OIDC/PKCE）、提升可观测性以及治理复杂多供应商 Agent 运行时所固有的技术债务方向发展。

### 2. 活动对比
| 项目 | 近期活动 (PRs/Issues) | 发布状态 | 健康度/状态 |
| :--- | :--- | :--- | :--- |
| **OpenClaw** | 500 PRs / 99 Issues | v2026.11.3 (稳定版) | 稳定化模式 |
| **Hermes Agent** | 50 PRs / (活跃) | v0.23.1 (重大更新) | 高速迭代/扩张期 |
| **QwenPaw** | 38 PRs / 13 Issues | v2.3.0-beta.4 | Beta 压力期 |
| **ZeroClaw** | 50 PRs / (活跃) | Staging v0.9.0 | 成熟期 |
| **IronClaw** | 0 | 无 | 非活跃 |

### 3. OpenClaw 的地位
OpenClaw 充当了该生态系统的“旗手”，目前优先考虑可靠性而非功能迭代速度。
*   **优势：** 成熟、具备向后移植的稳定性（通过 v2026.9.37），以及强大的诊断工具（“doctor”功能）。
*   **技术方案：** 强调网关/CLI 同步和会话状态持久化，但这导致了架构上的高度脆弱性。
*   **社区规模：** 变更率远高于同行（500 PRs/天），表明其拥有最大的贡献者群体，且代码库可能最为复杂。

### 4. 共享技术重点
*   **插件/运行时隔离：** Hermes 和 QwenPaw 都在应对“进程隔离”问题——确保插件不会破坏核心网关状态或加密存储（例如：Hermes 的 Matrix E2EE 问题，QwenPaw 的通道竞态条件）。
*   **身份验证加固：** ZeroClaw 和 QwenPaw 都在向企业级认证（OIDC、PKCE、远程账号/密码登录）迁移，以支持非浏览器/服务器环境。
*   **可观测性：** OpenClaw、QwenPaw 和 ZeroClaw 的用户都要求更深入地了解“内部状态”，特别是关于积分消耗、推理模型参数（如 `thinking_param_style`）和任务进度方面。

### 5. 差异化分析
*   **OpenClaw：** 优先考虑多供应商管理和“自愈”基础设施。
*   **Hermes Agent：** “模块化扩展器”。专注于丰富的插件目录和黑客松驱动的创新。
*   **QwenPaw：** 专注于区域/本地模型支持（阿里云/本地 MLX）和桌面通道集成。
*   **ZeroClaw：** 专注于“企业级集成”和安全传输协议（XMPP/OMEMO）。

### 6. 社区动力与成熟度
*   **高速度（快速迭代）：** **Hermes Agent** 在创新和插件广度上处于领先地位，而 **QwenPaw** 正积极向 `v2.3.0` 的稳定性冲刺。
*   **稳定/成熟：** **OpenClaw** 已进入高维护的“稳定化模式”，这可能是由于其作为核心参考实现的定位所致。**ZeroClaw** 正处于关键转折点，从实验性版本转向标准化的 `0.9.x` 架构。
*   **停滞：** **IronClaw** 目前没有任何动态，暗示项目可能已被放弃或转入仅内部可见的路线图。

### 7. 趋势信号
1.  **Beta 疲劳：** 用户对“长期 Beta”循环表示不满，因为这会导致核心文件处理和安装流程出现回归（在 QwenPaw 和 OpenClaw 中可见）。
2.  **插件即平台：** 从硬编码功能向“插件注入回合”（Hermes）的转变证实，生态系统正在远离单体 Agent 构建，转向高度模块化、对贡献者友好的架构。
3.  **治理与透明度：** 对成本/预算监控以及对 AI 推理模型进行显式控制的需求正在上升，这表明这些工具正越来越多地部署在专业的、预算受限的环境中。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目摘要：2026-11-11

### 1. 今日概览
Hermes Agent 项目持续处于高速开发状态，插件生态系统活动频繁，核心网关（Gateway）的加固工作也在稳步推进。随着 50 个 PR 的更新以及一个重大版本（v0.23.1）的正式发布，维护者的重心明显分配在分布式智能体（Agent）操作的稳定性与 `plugin-catalog` 的快速扩展上。总体而言，项目运行状况良好，社区在插件黑客松中参与度极高，并在安全维护方面表现积极。

### 2. 发布版本
*   **[v0.23.1](https://github.com/nousresearch/hermes-agent/releases/tag/v0.23.1)：** 一个巨大的汇总版本，包含了自 v0.23.0 以来累积的约 618 个 PR。此版本稳定了 CLI、Microsoft Store 应用、Docker 镜像以及 Hermes Cloud。详细说明将推迟至即将发布的 v0.24.0 中提供。

### 3. 项目进度
今日的活动重点在于插件生态的扩展与性能优化：
*   **插件目录扩展：** 目录中新增了一批插件，包括 [Aftercare](https://github.com/nousresearch/hermes-agent/pull/152750)、[Teach-Back](https://github.com/nousresearch/hermes-agent/pull/152749) 和 [Atlas](https://github.com/nousresearch/hermes-agent/pull/152746)。
*   **UI/UX 性能：** [合并了 #129918](https://github.com/nousresearch/hermes-agent/pull/129918) 和 [#129928](https://github.com/nousresearch/hermes-agent/pull/129928)，通过推迟工具提示（tool-charm）轮询并暂停折叠停靠元素的后台定时器，显著提升了 TUI 的运行效率。
*   **黑客松热度：** 持续更新现有的黑客松参赛作品，例如 [Tablekeeper (v0.3.0)](https://github.com/nousresearch/hermes-agent/pull/152752)。

### 4. 社区热点
*   **[PR #146732](https://github.com/nousresearch/hermes-agent/pull/146732)：** *feat(plugins): session forks*。这是一项关键的架构变更，允许插件借用核心的后台模式。这反映了社区对于更原生化、高性能插件功能的强烈需求。
*   **[PR #148266](https://github.com/nousresearch/hermes-agent/pull/148266)：** *fix(gateway): plugin-injected turns*。专注于确保插件交互保持“干净”并及时将控制权交还给人类，从而解决自动循环中可能出现的可用性摩擦。

### 5. Bug 与稳定性
*   **[Issue #141208](https://github.com/nousresearch/hermes-agent/issues/141208) (P2)：** Matrix E2EE 冲突。在网关进程之外执行 `hermes send` 会损坏加密存储；对于依赖安全消息传输的用户来说影响严重。
*   **[Issue #101514](https://github.com/nousresearch/hermes-agent/issues/101514) (P2)：** 配置文件会话持久性。从存储状态恢复时，会话会丢失与配置文件模型的链接。
*   **[Issue #127187](https://github.com/nousresearch/hermes-agent/issues/127187) (P2)：** 定时任务（Cron job）可靠性。确认存在丢失可重试拒绝请求和重复执行的可能性。
*   **[已修复的安全问题 #90789](https://github.com/nousresearch/hermes-agent/issues/90789)：** 修复了一个背景终端命令可以绕过同意授权网关的漏洞。

### 6. 功能请求与路线图信号
目录中新增内容的高密度说明团队正在优先考虑**模块化扩展性**。
*   **路线图预测：** 预计 `ctx.fork_session` 及其他插件 API 的官方文档将在 v0.24.0 中趋于稳定，因为它们目前在开放的 PR 中仍被标记为实验性。
*   **新功能：** 商业智能工具 ([#151651](https://github.com/nousresearch/hermes-agent/pull/151651)) 和 PDF 表单审查 ([#153038](https://github.com/nousresearch/hermes-agent/pull/153038)) 的集成，展示了项目向“知识工作者”专用智能体转型的明确趋势。

### 7. 用户反馈总结
用户正在积极利用 Hermes 的扩展性，特别是在寻求能够提高透明度（“Why”插件）和验证性（“Aftercare”插件）的工具。尽管核心功能稳定，但处理复杂多进程设置（例如 Matrix 消息传递、CLI 工具执行）的用户正遭遇同步 Bug，这表明系统需要更严格的进程级隔离。

### 8. 待处理事项跟踪
*   **[Issue #101514](https://github.com/nousresearch/hermes-agent/issues/101514)：** 自 9 月以来一直悬而未决。鉴于基于配置文件的开发工作流是专业使用的核心，会话在恢复后丢失模型同步是一个重大的摩擦点，亟需修复。
*   **[Issue #141208](https://github.com/nousresearch/hermes-agent/issues/141208)：** 对安全模型构成风险；需要优先干预以防止用户数据库损坏。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目摘要：2026-11-11

## 1. 今日概览
截至 2026 年 11 月 11 日，QwenPaw 项目保持着极高的开发节奏和强劲的维护活力。当前的开发周期高度聚焦于稳定 `v2.3.0` beta 版本，过去 24 小时内共有 38 个 PR 和 13 个 issue 得到更新。社区和维护者正在积极修复桌面端插件、文件处理及身份验证方面的严重回归问题，这表明项目正处于迈向重大稳定版本发布前、压力与成效并存的关键阶段。

## 2. 版本发布
*   **[v2.3.0-beta.4](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.3.0-beta.4)**：
    *   **修复**：修正了更新期间插件依赖项无法保留的问题。
    *   **稳定性**：解决了因附加依赖项安装失败导致的频道启动中断问题。

## 3. 项目进展
*   **插件稳定性**：合并了 [PR #8653](https://github.com/agents-ai/QwenPaw/pull/8653) 和 [PR #8659](https://github.com/agents-ai/QwenPaw/pull/8659)，确保打包后的桌面端构建能正确识别运行时环境，并能从中断的插件安装过程中自动恢复。
*   **身份验证**：[PR #8664](https://github.com/agents-ai/QwenPaw/pull/8664) 增加了对远程/Docker 部署环境下账号密码登录的支持，以解决无法使用浏览器回调的问题。
*   **QQ 频道**：[PR #8319](https://github.com/agents-ai/QwenPaw/pull/8319) 通过支持 `GROUP_MESSAGE_CREATE` 网关事件，改进了消息处理能力。

## 4. 社区热点
*   **[Issue #7990](https://github.com/agents-ai/QwenPaw/issues/7990)**：用户要求为阿里云 Token Plan 模型明确声明 `thinking_param_style`。这凸显了在 UI 中更好地集成推理模型的迫切需求。
*   **[Issue #8650](https://github.com/agents-ai/QwenPaw/issues/8650)**：针对“思考 (Thinking)”块与工具调用卡片在视觉一致性上的 UI/UX 担忧。用户反映布局抖动会造成干扰。
*   **[PR #8178](https://github.com/agents-ai/QwenPaw/issues/8178)**：支持嵌套技能目录。随着项目规模扩大，这反映了用户对构建大型智能体生态组织架构的需求日益增长。

## 5. Bug 与稳定性
*   **高优先级**：[Issue #8655](https://github.com/agents-ai/QwenPaw/issues/8655) 报告称，在 `v2.3.0` beta 版本中附件路径被截断至驱动器根目录，导致图像加载失败。
*   **中优先级**：[Issue #8669](https://github.com/agents-ai/QwenPaw/issues/8669) 描述了桌面端启动时存在的竞争条件，导致频道插件报错 `CHANNEL_NOT_CONNECTED`。
*   **UI/UX**：[Issue #8663](https://github.com/agents-ai/QwenPaw/issues/8663) 指出消息队列操作按钮在 Safari 上失效，这表明可能存在跨浏览器兼容性回归。
*   **待修复**：[PR #8662](https://github.com/agents-ai/QwenPaw/pull/8662) 正在解决 [Issue #8661](https://github.com/agents-ai/QwenPaw/issues/8661) 关于聊天界面文件下载链接失效的问题。

## 6. 功能请求与路线图信号
*   **本地引擎控制**：[PRs #8648, #8647, #8649](https://github.com/agents-ai/QwenPaw/pull/8648) 表明即将扩展对原生本地模型的支持，特别是将托管的 MLX 和 llama.cpp GPU 控制功能引入控制台。
*   **插件生态**：[Issue #8656](https://github.com/agents-ai/QwenPaw/issues/8656) 请求官方支持 Mistral 提供商插件，这表明用户希望在标准集之外进一步丰富模型提供商的多样性。

## 7. 用户反馈总结
用户对 Bug 修复的速度总体满意，但由于 `2.3.0` 系列中出现的文件处理和插件启动回归问题，正经历一定的“beta 疲劳”。对企业级部署（远程认证、阿里云 Token Plan）更好的支持请求，体现了 QwenPaw 的应用场景正向专业化方向转变。

## 8. 待办事项关注
*   **[Issue #7990](https://github.com/agents-ai/QwenPaw/issues/7990)**：该问题自九月开启以来一直悬而未决，对于使用阿里云推理模型用户而言至关重要。
*   **[PR #8426](https://github.com/agents-ai/QwenPaw/pull/8426)**：这是一项将第三方智能体提取为插件的重大架构调整；其进展对于系统的模块化至关重要，但目前仍处于审查阶段。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目摘要 - 2026-11-11

## 1. 今日概览
ZeroClaw 目前处于高速开发阶段，工作重心围绕 v0.9.0 的发布周期展开。项目当前有 50 个活跃 PR，重点在于稳定运行时行为和完善文档，展现了极佳的维护状态。近期的动态表明，项目重点已从实验性功能扩展转向对核心智能体运行时（agent runtime）、安全策略以及面向用户的 Web 控制面板体验进行精炼。

## 2. 版本发布
*过去 24 小时内无新版本发布。*（注：PR [#12377](https://github.com/zeroclaw-labs/zeroclaw/pull/12377) 显示 v0.9.0 目前正处于发布暂存阶段）。

## 3. 项目进展
近期关闭的议题主要集中在技术债务和运行时稳定性方面：
*   **版本号升级：** 为 v0.9.0 发布准备工作空间 ([#12377](https://github.com/zeroclaw-labs/zeroclaw/pull/12377))。
*   **运行时修复：** 解决了心跳检测和模型路由探测中温度（temperature）硬编码的问题，该问题曾导致与部分 LLM 提供商不兼容 ([#12367](https://github.com/zeroclaw-labs/zeroclaw/pull/12367))。
*   **文档：** 完成了多项关于 OIDC 设备证书终止及 PKCE 实现的文档更新 ([#12332](https://github.com/zeroclaw-labs/zeroclaw/pull/12332), [#12340](https://github.com/zeroclaw-labs/zeroclaw/pull/12340))。

## 4. 社区热点
*注：由于未导出 PR 评论数量，活跃度基于 PR 复杂度和“needs-maintainer-review”状态进行推断。*
*   **[#11847](https://github.com/zeroclaw-labs/zeroclaw/pull/11847) (Native XMPP/OMEMO)：** 一项重大的架构优化。社区正密切关注该特性，以期获得安全、去中心化的消息传递支持。
*   **[#12269](https://github.com/zeroclaw-labs/zeroclaw/pull/12269) (Web Voice Controls)：** 用户对“配对设备语音设置”功能兴趣浓厚，该功能旨在使智能体交互更加自然且本地化。
*   **[#11869](https://github.com/zeroclaw-labs/zeroclaw/pull/11869) (SSH Transport Reuse)：** 表明用户对长时间运行的智能体任务的效率有强烈需求，持久连接管理对于此类任务至关重要。

## 5. 缺陷与稳定性
*   **S2 - 功能降级：** 心跳/模型路由温度硬编码 ([#12366](https://github.com/zeroclaw-labs/zeroclaw/issues/12366)) — **已修复** ([#12367](https://github.com/zeroclaw-labs/zeroclaw/pull/12367))。
*   **S2 - 功能降级：** 文档部署中的 SEO/规范化 URL 问题 ([#12325](https://github.com/zeroclaw-labs/zeroclaw/issues/12325)) — **已关闭**。
*   **S3 - 次要问题：** 各类文档索引和 404 行为问题 ([#12326](https://github.com/zeroclaw-labs/zeroclaw/issues/12326), [#12324](https://github.com/zeroclaw-labs/zeroclaw/issues/12324)) — **已关闭**。

## 6. 功能需求与路线图趋势
路线图明显倾向于**“企业级集成”**：
*   **控制面板透明度：** OpenRouter 余额报告等功能 ([#11845](https://github.com/zeroclaw-labs/zeroclaw/pull/11845)) 表明项目正在迎合那些需要对 API 使用进行严格预算控制的高级用户。
*   **安全加固：** 在 OIDC、PKCE 和密钥管理方面的持续投入，表明 0.9.x 版本正向更高的安全合规性迈进。

## 7. 用户反馈总结
当前反馈突出了**可观测性**方面的痛点。用户希望了解智能体的“内部状态”，特别是关于积分余额、任务进度以及语音/音频状态的信息。大量文档类 PR 的涌入表明，“ZeroCode”认证和连接流程的复杂性已达到必须通过手动更新文档来维持用户留存的程度。

## 8. 待办事项监控
*   **[#11847](https://github.com/zeroclaw-labs/zeroclaw/pull/11847)：** 一个自 10 月 19 日以来一直开启的高风险、超大型（XL）PR。由于其涉及范围广泛（TLS、XMPP、OMEMO），可能需要进行深入测试。
*   **[#11868](https://github.com/zeroclaw-labs/zeroclaw/pull/11868)：** 修复工具调用（tool-call）循环的核心智能体运行时逻辑。这对防止 API 无限循环至关重要，需要高优先级评审以确保 0.9.0 版本的稳定性。

</details>

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*