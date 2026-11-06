# OpenClaw 生态日报 2026-11-06

> Issues: 135 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-11-06 01:31 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目摘要 - 2026-11-06

## 1. 今日概览
OpenClaw 项目正处于密集的维护与稳定性强化阶段，过去 24 小时内处理了 500 个 PR 和 135 个 Issue 的更新，增长显著。项目组目前正致力于平衡 v2026.11.1 版本的发布与大量涌现的回归问题及 UI 摩擦点，特别是针对 Windows 性能和 SQLite 工作进程稳定性方面的问题。尽管变动频繁，但活跃 PR 的数量表明，开发周期的重心在于打磨现有功能，而非单纯地扩展新特性。

## 2. 发布版本
*   **v2026.11.1：** 一个侧重于安全性和可靠性的稳定性版本。
    *   **Mac 安全性：** 增强了配置安全性；保存失败时不再覆盖密钥，Tailscale 修改操作现可保留网关认证信息 (#187734, #187664)。
    *   **可靠性：** 优化了通道回复（Telegram、Discord、webhooks）的投递机制。

## 3. 项目进展
今日开发重心主要集中在 UI/UX 响应速度与性能优化上：
*   **性能：** PR #193861 减少了主线程的样式开销，PR #193851 通过合并调色板应用逻辑，优化了 Control UI 的重载速度。
*   **CI/CD：** 正在着手精简冗余的测试用例（PR #193870, #193834）。
*   **UI 润色：** 修复了进度标记 (#193864) 和链接菜单间距 (#193848) 问题，以保持视觉一致性。

## 4. 社区热门话题
*   **[#170956] Windows 启动可靠性：** (29 条评论) 当前首要问题仍是 Windows 上关于插件关闭和 schtasks 权限导致的“崩溃循环”。用户深受可靠性问题困扰，称其为“阻碍 UX 的发布问题”。
*   **[#177094] Control UI Webchat：** (12 条评论) 讨论了 UI 渲染问题，即系统通知会挤占助手回复的位置。这表明用户对聊天记录的完整性非常敏感。
*   **[#193871] 流式 Markdown 修复：** (最新高活跃 PR) 解决了网关事件循环中因处理旧版工具调用括号不当而导致的重大性能瓶颈。

## 5. Bug 与稳定性
*   **[P0/关键] 回归 [#191847]：** 大规模会话会导致 512MB 的 SQLite 工作进程崩溃 (ERR_WORKER_OUT_OF_MEMORY)。*状态：开启，暂无修复。*
*   **[P0/关键] 回归 [#190563]：** 由于提供商/线程不匹配，用户无法恢复已暂停的 Codex 聊天。*状态：开启。*
*   **[P1/崩溃循环] [#193262]：** 当通过 Windows 驱动器进行绑定挂载时，Docker 启动失败。*状态：开启。*
*   **[稳定性修复] PR #193859：** 解决了 macOS fork-mount 开销问题，该问题是导致 APFS 上网关启动缓慢的主要原因之一。

## 6. 特性请求与路线图信号
*   **CJK FTS 索引 (PR #193815)：** 对下一版本具有高度潜力，它支持对中日文的双字符查询进行有效的 FTS5 搜索，这对国际用户来说是一个关键缺失。
*   **模板预览 (PR #193778)：** 用户请求在不离开当前上下文的情况下查看推荐模板，这表明用户倾向于更加“流畅”的 UI 体验。

## 7. 用户反馈总结
当前用户情绪反映出对“停滞”流程和“UX 摩擦”的挫败感。用户反馈尤为集中的点：
*   **原生 OS 集成：** Windows 文件系统权限和 macOS 挂载点问题仍是重复出现的主题。
*   **数据丢失焦虑：** 如 [#193659]（Rabbit R1 照片在历史记录中丢失）和 [#182246]（队列丢失问题）等问题，强调了用户需要明确“消息为何失败”的反馈，而不是默默丢弃。

## 8. 待办事项追踪
*   **[#164620] 插件目录源：** 关于禁用硬编码 `clawhub.ai` 插件源的开放请求。该问题已搁置一月，对于注重安全/隐私的用户群体而言是一个潜在需求。
*   **[#150029] 可配置的检查链接：** 长期存在的请求，即允许用户切换自动化检查链接。该项目前仍为“P3”，但因其在整洁聊天线程中的实用性而受到高度关注。

---

## 横向生态对比

### 1. 生态概览
截至 2026 年 11 月，开源 AI Agent 生态正处于从“概念炒作”向“生产就绪”过渡的阶段，各大项目正从激进的实验转向严谨的稳定化建设。项目架构正告别松散的模块化设计，转而采用统一的、具备状态保护功能的网关，以解决会话完整性和安全边界等关键问题。尽管功能扩展仍在持续，但当前的主流趋势是加固基础设施，以确保 Agent 在处理敏感信息、企业级任务或长期个人任务时具有足够的可靠性。

### 2. 活跃度对比

| 项目 | 活跃 PR/Issues (24h) | 最新版本 | 健康状态 |
| :--- | :--- | :--- | :--- |
| **OpenClaw** | 635 | v2026.11.1 | 高流转 / 稳定中 |
| **Hermes Agent** | 63 | v0.23.0 | 高频演进 / Beta |
| **QwenPaw** | 47 | 无 (Beta) | 维护阶段 |
| **ZeroClaw** | 50 | 无 | 安全加固中 |
| **IronClaw** | 0 | 无 | 不活跃 |

### 3. OpenClaw 的地位
OpenClaw 是该领域内“重量级”的参考实现，其 PR 处理量远超同类项目。其核心优势在于极其广泛的生态采纳率，这迫使其必须直面那些小型项目尚未遇到的边界情况（例如 Windows 文件系统/权限相关的 Bug）。与当前正在对核心架构进行重构的 Hermes 或 ZeroClaw 不同，OpenClaw 在进行深度性能优化的同时，仍致力于保持与庞大插件生态系统的兼容性。

### 4. 共同技术焦点
*   **统一网关：** Hermes（向统一网关过渡）和 QwenPaw（运行时配置/ACP 统一）正在向单进程入口点靠拢，旨在取代碎片化的执行模型。
*   **内存与状态完整性：** 几乎所有项目（OpenClaw、QwenPaw、ZeroClaw）都在优先考虑“仅追加（Append-only）”或持久化存储方案，以消除用户对数据丢失的焦虑。
*   **安全边界：** ZeroClaw 近期的关键安全补丁以及 OpenClaw 在密钥处理方面的改进，反映了社区的一个共识：若要赋予 Agent “操作员权限”，必须实施严格的访问控制。

### 5. 差异化分析
*   **Hermes Agent：** 定位为“一体化”Agent 运行时；高度专注于开发者体验及复杂的本地环境编排。
*   **ZeroClaw：** “安全至上”的选择；采用 Rust 原生栈，侧重于可审计性和严格的主体所有权。
*   **QwenPaw：** 侧重于“创造者/UI”层面；倾向于面向用户的特性，如重排序器（Rerankers）和可视化 Agent 管理，目标群体为高级用户/产消者（Prosumer）。
*   **OpenClaw：** “通用型”平台；优先考虑生态/插件多样性以及广泛的操作系统兼容性。

### 6. 社区动力与成熟度
*   **高动力/不稳定：** **Hermes Agent** 在 v0.23.0 发布后正经历“发布冲击”；它是目前演进速度最快，但同时也是最脆弱的项目。
*   **高成熟度/稳定中：** **ZeroClaw** 在开发周期上表现出高度成熟，优先考虑安全审计和基于 RFC 的决策流程，而非实验性功能。
*   **维护阶段：** **OpenClaw** 和 **QwenPaw** 目前处于“修补 Bug”模式，重心在于 UI/UX 的打磨以及清理在早期快速扩张期积累的技术债务。

### 7. 趋势信号
*   **“可靠性之墙”：** 开发者们意识到，“Agent 的承诺”目前正撞上一堵无声故障的墙。用户要求了解任务失败的具体原因（例如 OpenClaw 的历史记录丢失、QwenPaw 的嵌入重索引失败等）。
*   **Rust 迁移：** 业界出现向“Rust 原生”技术栈迁移的明显动力（在 ZeroClaw 的讨论中可见），以实现持久化后台 Agent 所需的性能。
*   **Windows 对齐：** 2026 年的一个重大趋势是在 Windows 上实现 Unix 风格的可靠性；各活跃项目中文件系统/路径问题的普遍存在，表明这是本地 AI Agent 走向主流桌面应用的主要障碍。
*   **数据主权：** 转向本地 SQLite 存储、远离易变的内存快照，表明“本地优先”的数据安全性已成为社区不可妥协的需求。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目摘要：2026-11-06

### 1. 今日概览
继 11 月 5 日发布重大版本 v0.23.0 "Hearth" 之后，Hermes Agent 项目目前处于高强度的“发布后”稳定期。开发节奏依然极快，仅过去 24 小时内就有 50 个合并请求（PR）和 13 个议题（Issue）得到处理。目前的工程重点是稳定全新的统一网关（Unified Gateway）架构，该架构在会话管理、配置环境处理以及特定平台的桌面集成方面引发了复杂的回归问题。

### 2. 版本发布
*   **v0.23.0 ("The Hearth Release")：** 一个巨大的里程碑，涉及约 10,000 次提交和 666 名贡献者。此次发布的核心是架构整合，最显著的变化是统一网关运行时（unified gateway runtime）。此项变更强制所有本地交互（CLI、Desktop、API、cron）均通过单个网关进程进行路由，旨在提升一致性，但也引入了大量与状态相关的 Bug。

### 3. 项目进展
*   **[PR #149786](https://github.com/NousResearch/hermes-agent/pull/149786)：** CI 优化，合并了较小的运行器任务，显著降低了运维开销。
*   **[PR #149630](https://github.com/NousResearch/hermes-agent/pull/149630)：** 改进了智能体文件编辑的 UX，将 `/undo` 命令直接链接到相关的编辑前文件快照。
*   **[PR #132414](https://github.com/NousResearch/hermes-agent/pull/132414)：** 修复了 Kanban 工作程序回收过程中的浏览器守护进程资源泄露问题。
*   **[PR #140901](https://github.com/NousResearch/hermes-agent/pull/140901)：** 修复了 API 幂等性逻辑，确保 `tool_choice` 成为重试标识的一部分，防止缓存会话中出现陈旧响应。

### 4. 社区热点
*   **[Issue #134889](https://github.com/NousResearch/hermes-agent/issue/134889) (227 条评论)：** 关于统一网关迁移的中心跟踪枢纽。高评论量表明社区正深度参与“一体化”进程模型的调试，特别是关于本地会话如何与网关接口对接的问题。
*   **[Issue #143547](https://github.com/NousResearch/hermes-agent/issue/143547) (50 条评论)：** 网关统一化的直接后续，跟踪记录了 cron 任务、机器人以及 UI 元素与新架构交互时出现的未解决边界情况。

### 5. Bug 与稳定性
*   **关键/回归：** **[Issue #149784](https://github.com/NousResearch/hermes-agent/issue/149784)** — 经过 90 天的清理周期后，桌面会话变得无法恢复（`admission_conflict`）。这对长期用户而言是一个高严重性问题。
*   **高严重性：** **[Issue #149776](https://github.com/NousResearch/hermes-agent/issue/149776)** — 符号链接的配置主目录（常用于加密卷）在 v0.23 中丢失标识并无法重新打开，导致 `permission_denied` 错误。
*   **中等严重性：** **[Issue #149779](https://github.com/NousResearch/hermes-agent/issue/149779)** — 跨配置唤醒词使状态引脚（state pins）保持激活，导致新会话在错误的智能体配置中打开。
*   **Bug 修复：** **[Issue #149787](https://github.com/NousResearch/hermes-agent/issue/149787)** 中关闭了针对 `no_agent` cron 会话问题的修复，标志着对发布日 Bug 的快速响应。

### 6. 功能请求与路线图信号
*   **跨机器协作：** **[Issue #97681](https://github.com/NousResearch/hermes-agent/issue/97681)** 仍然是一项核心架构目标：实现跨不同机器和所有者的智能体交互。
*   **插件生态系统：** 持续扩展插件目录是优先事项，最近的 PR 中增加了 [Eye of Hermes](https://github.com/NousResearch/hermes-agent/pull/149691) 和 [Hermes-phone](https://github.com/NousResearch/hermes-agent/pull/149263)。
*   **CI/CD 成熟度：** 对 `emit_waterfall` 中间件的关注（**[PR #85370](https://github.com/NousResearch/hermes-agent/pull/85370)**）表明项目正朝着更稳健的生产级工具执行流水线方向发展。

### 7. 用户反馈总结
用户总体上对 v0.23 的规模印象深刻，但目前的反馈主要被“v0.23 冲击”所主导。主要的摩擦点在于向统一网关的过渡；拥有复杂设置（如符号链接配置、跨机器同步）的资深用户目前正面临 `permission_denied` 和 `admission_conflict` 的阻碍。项目目前正有效地利用 GitHub Issues 作为实时调试仪表板，保持了极高的透明度。

### 8. 待办事项观察
*   **[Issue #96906](https://github.com/NousResearch/hermes-agent/issue/96906)：** 一项关于“委派关闭”（为后台任务保留终端响应）的提案自 8 月以来一直处于挂起状态。由于目前正处于网关稳定期，该议题被搁置，等待维护者确定优先级。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目摘要 (2026-11-06)

## 1. 今日概览
QwenPaw 目前处于高强度维护阶段，伴随着大量的 Bug 修复和重大的架构重构。在过去 24 小时内，共有 47 项更新（14 个 Issue，33 个 PR），开发者活跃度极高，重点在于稳定 v2.3.x 开发周期。项目组目前正在平衡关键的稳定性修复（特别是内存管理和插件生命周期相关问题）与会话存储及配置管理的大规模重构。

## 2. 版本发布
*   **无新版本发布。** 当前稳定版/测试版状态仍为 v2.2.2.post1 / v2.3.0b3。

## 3. 项目进展（已合并/关闭）
*   **重构/清理：** 合并了多个旨在解决技术债的 PR，包括合并访问控制工作空间 ([PR #6788](https://github.com/agentscope-ai/QwenPaw/pull/6788)) 以及隔离同步钩子以保护 `asyncio` 事件循环 ([PR #7842](https://github.com/agentscope-ai/QwenPaw/pull/7842))。
*   **Bug 修复：** 
    *   修复了代码模式中因位置参数命名冲突导致的 `TypeError` ([Issue #8581](https://github.com/agentscope-ai/QwenPaw/issue/8581))。
    *   解决了新任务工作空间选择无法持久化的问题 ([Issue #8555](https://github.com/agentscope-ai/QwenPaw/issue/8555))。
    *   解决了 Matrix 通道中由于历史状态迁移问题导致的潜在启动失败 ([PR #8558](https://github.com/agentscope-ai/QwenPaw/pull/8558))。

## 4. 社区热点
*   **[Issue #8040](https://github.com/agentscope-ai/QwenPaw/issue/8040) (Embedding 重索引)：** 由于在处理 CJK 字符批处理时存在静默数据丢失，这仍然是关注度最高的问题。用户对 UI 显示成功但底层分片处理失败的情况表示不满。
*   **[PR #8532](https://github.com/agentscope-ai/QwenPaw/pull/8532) (追加式存储)：** 这是一个关键的架构转型，旨在用持久化的 SQLite 历史记录替换可变的会话快照，直接解决长期的稳定性和恢复问题。
*   **[PR #8586](https://github.com/agentscope-ai/QwenPaw/pull/8586) (运行时配置)：** 一次重大重构，统一了 ACP 和原生执行设置，标志着项目正朝着更具预测性的复杂智能体配置状态迈进。

## 5. Bug 与稳定性
*   **严重 (Critical)：** [Issue #8592](https://github.com/agentscope-ai/QwenPaw/issue/8592) (Creator 评审轮次失败) - 一个严重的阻断问题，由于缺少视觉参考 ID，评审轮次变得永久无法读取。
*   **高危 (High)：** [Issue #8580](https://github.com/agentscope-ai/QwenPaw/issue/8580) (内存标签索引) - 用户因 503 错误无法读取生成的内存标签，导致长期检索功能失效。
*   **中等 (Medium)：** [Issue #8585](https://github.com/agentscope-ai/QwenPaw/issue/8585) (Windows 路径问题) - 扩展长度路径的规范化破坏了 SQLite 的只读 URI 访问，导致 Windows 上历史记录回溯失败。
*   **轻微 (Minor)：** [Issue #8590](https://github.com/agentscope-ai/QwenPaw/issue/8590) (UI 路由) - 插件设置页面目前会破坏侧边栏的导航状态。

## 6. 功能需求与路线图信号
*   **分页功能：** 用户强烈要求在“所有聊天”中增加分页 ([Issue #3570](https://github.com/agentscope-ai/QwenPaw/issue/3570))，以提升高负载聊天环境下的性能。
*   **Creator UI 增强：** 用户要求提供更精致的 Creator 界面 ([Issue #8591](https://github.com/agentscope-ai/QwenPaw/issue/8591))，特别是呼吁改善视觉提示（按钮与背景的区分）以及优化模型管理。
*   **可拖拽 UI：** [PR #8594](https://github.com/agentscope-ai/QwenPaw/pull/8594) 引入了会话列的可拖拽宽度调整功能，这是一个备受期待的 UX 改进。

## 7. 用户反馈总结
用户总体上对丰富的功能集（如 Creator、Rerankers）感到满意，但随着生态系统的增长，他们正在遇到“Beta 级”的不稳定性。最突出的挫败感源于后端处理数据与前端状态之间的一致性问题（例如：重索引报告、聊天记录和配置持久化）。

## 8. 待办事项追踪
*   **[Issue #3570](https://github.com/agentscope-ai/QwenPaw/issue/3570)：** 仍需明确会话列表分页的实现路径。
*   **[Issue #8040](https://github.com/agentscope-ai/QwenPaw/issue/8040)：** 这是一个重大的数据完整性问题，需要紧急维护投入，以确保 Embedding 重索引的可靠性。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目摘要 - 2026-11-06

### 1. 今日概览
ZeroClaw 目前处于高强度的稳定化阶段，重点在于加固安全边界并解决架构债务，为 v0.9.0 版本的发布做准备。开发活动非常活跃，过去 24 小时内共有 50 个 PR 更新，标志着项目正全力攻克关键安全漏洞并完善文档。项目整体健康状况良好，主要表现为维护者主导的安全审计工作持续进行，以及通过新增通道集成实现了智能体生态的稳步扩张。

### 2. 发布情况
*过去 24 小时内无新版本发布。* 项目正积极推进 **v0.9.0** 版本，这也是今日合并的多个高优先级安全补丁的主要目标。

### 3. 项目进展
*   **安全加固：** 合并了 **[PR #12232](https://github.com/zeroclaw-labs/zeroclaw/pull/12232)**，这是一项关键修复，防止非管理员主体访问仅限操作员权限的工具（例如 SOP 执行、cron 和对等消息传递）。
*   **CI/CD 维护：** 合并了 **[PR #12253](https://github.com/zeroclaw-labs/zeroclaw/pull/12253)** 以处理 `pin-utils` 的维护建议，保持依赖树的整洁。
*   **目标模式（Goal Mode）基础：** **[PR #11878](https://github.com/zeroclaw-labs/zeroclaw/pull/11878)** 持续推进，为“目标模式”奠定了基础，这是自主任务生命周期管理中即将到来的重大架构转型。
*   **生态扩张：** **[PR #12230](https://github.com/zeroclaw-labs/zeroclaw/pull/12230)** 引入了原生的 Zulip 通道，增强了 ZeroClaw 的多平台通信能力。

### 4. 社区热点
*   **[Issue #10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526) (16 条评论)：** 一项关于仅追加会话历史和确定性状态回放的已受理 RFC。高互动量表明，这是 ZeroClaw 智能体内存模型长期可靠性的基石功能。
*   **[Issue #8132](https://github.com/zeroclaw-labs/zeroclaw/issues/8132) (13 条评论)：** 关于将 React/Vite 替换为 Rust/Wasm 框架（Dioxus/Leptos/Yew）的持续讨论。这反映了社区对纯 Rust 原生技术栈和更好构建性能的追求。

### 5. Bug 与稳定性
*   **安全 (S0 - 严重)：** 识别并解决了多个关于主体所有权绕过的漏洞。**[Issue #11127](https://github.com/zeroclaw-labs/zeroclaw/issues/11127)**、**[Issue #11123](https://github.com/zeroclaw-labs/zeroclaw/issues/11123)**、**[Issue #12051](https://github.com/zeroclaw-labs/zeroclaw/issues/12051)** 以及 **[Issue #12046](https://github.com/zeroclaw-labs/zeroclaw/issues/12046)** 均在 **[PR #12232](https://github.com/zeroclaw-labs/zeroclaw/pull/12232)** 修复后关闭。
*   **运行时 (S2 - 功能降级)：** **[Issue #9572](https://github.com/zeroclaw-labs/zeroclaw/issues/9572)** 报告 WebSocket 会话可能导致 Tokio 工作线程栈溢出；该问题仍未解决，属于高风险项。
*   **工具 (S2 - 功能降级)：** **[Issue #10926](https://github.com/zeroclaw-labs/zeroclaw/issues/10926)** 指出了 Matrix `send_via` 中的一个 Bug，即身份标识被错误地视为聊天室目的地。

### 6. 功能请求与路线图信号
*   **托管文件上传：** **[Issue #12181](https://github.com/zeroclaw-labs/zeroclaw/issues/12181)** 提出了在 Web 仪表盘中原生支持文档附件的请求，这很可能是 Web UI 下一迭代的重点。
*   **开发者生产力：** 改善 CLI 体验方面有显著进展，特别是 **[PR #11935](https://github.com/zeroclaw-labs/zeroclaw/pull/11935)**，它增加了从终端查看 cron 运行输出的可见性。

### 7. 用户反馈总结
用户目前关注的焦点在于“生产就绪度”。修复安全策略漏洞的举措表明，操作员正将 ZeroClaw 视为处理敏感自动化任务的平台，在这些任务中身份边界至关重要。功能开发速度与默认安全配置的严格需求之间存在明显的张力。

### 8. 待办事项观察
*   **[Issue #9779](https://github.com/zeroclaw-labs/zeroclaw/issues/9779)：** 由于 `sops_dir` 配置静默错误导致 SOP 子系统加载失败。这是一个自 8 月起就一直悬而未决的高风险易用性 Bug，需要专门的补丁来防止这种让操作员感到挫败的“静默失败”。

</details>

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*