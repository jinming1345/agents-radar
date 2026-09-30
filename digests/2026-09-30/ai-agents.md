# OpenClaw 生态日报 2026-09-30

> Issues: 500 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-09-30 01:31 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目摘要 - 2026-09-30

## 1. 今日概览
OpenClaw 在发布 `2026.9.6` 版本后，目前处于高强度的稳定性维护阶段。开发活跃度极高，过去 24 小时内处理了 500 个 Issue 和 500 个 PR，旨在集中解决关键的稳定性回退和内存管理问题。项目目前专注于“扩展稳定版（extended-stable）”的维护，优先修复崩溃循环（crash-loop）问题，并提升企业级网关部署的基础设施可靠性。

## 2. 版本发布
*   **v2026.8.33:** 一个 `extended-stable`（等同于 LTS）版本。
    *   **范围:** 包含 2026 年 8 月的稳定代码、关键安全补丁以及更新的模型支持。
    *   **背景:** 此版本专为需要高可靠性的用户设计，不同于目前正经历显著稳定性波动、迭代节奏较快的 `2026.9.6` 分支。

## 3. 项目进展
近期的 PR 活动表明开发重心在于架构“去冗（desloping）”——即移除冗余逻辑以提升性能和一致性。
*   **Provider 重构:** [PR #161471](https://github.com/openclaw/openclaw/pull/161471) 继续清理 provider 插件，以实现逻辑标准化。
*   **网关核心整合:** [PR #159999](https://github.com/openclaw/openclaw/pull/159999) 完成了大规模清理，移除了超过 1,300 行代码，有效降低了技术债务。
*   **稳定性补丁:** 针对工作流生命周期（[PR #160820](https://github.com/openclaw/openclaw/pull/160820)）和更新验证（[PR #161450](https://github.com/openclaw/openclaw/pull/161450)）启动了多项修复，以确保升级过程不会导致现有安装环境损坏。

## 4. 社区热点
社区目前对于影响可靠性的基础设施级故障呼声较高：
*   **[Issue #143524](https://github.com/openclaw/openclaw/issues/143524):** SQLite WAL 文件增长（高达 2.8 GB）导致网关无法启动。这是目前评论数最多（94 条评论）的 Issue，是阻碍 Windows 用户使用的关键 P0 级 UX 障碍。
*   **[Issue #119720](https://github.com/openclaw/openclaw/issues/119720):** 同步持久化操作阻塞了事件循环。用户对随着历史数据库规模扩大而引发的性能退化表示担忧。
*   **[Issue #157531](https://github.com/openclaw/openclaw/issues/157531):** `2026.9.7` 修复工作的官方追踪 Issue；这是协调当前紧急稳定性工作的核心枢纽。

## 5. Bug 与稳定性
稳定性是当前 `2026.9.6` 分支的首要关切。
*   **关键（P0）:**
    *   [Issue #159662](https://github.com/openclaw/openclaw/issues/159662) & [Issue #160548](https://github.com/openclaw/openclaw/issues/160548): `prepared-model-catalog` 工作线程存在内存泄漏。
    *   [Issue #157325](https://github.com/openclaw/openclaw/issues/157325): 数据库资源“卡死”，导致所有代理发生普遍性故障，必须重启网关才能恢复。
*   **回归问题:**
    *   [Issue #157989](https://github.com/openclaw/openclaw/issues/157989): 自 `2026.9.5` 版本起，由于冗余的插件重新捕获逻辑，导致磁盘写入过于频繁（造成 SSD 损耗）。

## 6. 功能需求与路线图信号
*   **决策模型:** [Issue #156341](https://github.com/openclaw/openclaw/issues/156341) 提议通过 RFC 实现任务级决策模型，这标志着向 AI 推理步骤的精细化控制迈进。
*   **入门引导:** [Issue #16670](https://github.com/openclaw/openclaw/issues/16670) 仍是一项长期存在的请求，即在安装向导中强制要求配置嵌入/内存设置，这凸显了新用户所面临的入门复杂性门槛。

## 7. 用户反馈总结
用户总体上对 OpenClaw 的功能深度感到满意，但对最近两个小版本中引入的频繁“崩溃循环”回归问题感到沮丧。用户反馈暗示，尽管“稳定”内核功能强大，但当前的插件和工作流隔离层容易受到内存压力和资源争用的影响。用户虽然认可近期 UI/Dashboard 的改进，但更愿意用这些改进换取一个“平平无奇但极其稳定”的版本。

## 8. 待办事项观察
*   **[Issue #16670](https://github.com/openclaw/openclaw/issues/16670):** 自 2026 年 2 月起开启；请求改善内存设置的用户体验。
*   **[Issue #97616](https://github.com/openclaw/openclaw/issues/97616):** Hooks/Tools 产生的僵尸进程积累问题；2026 年 6 月上报。这对服务器的长期在线时间有重大影响，目前尚未获得最终修复。

---

---

## 横向生态对比

### 1. 生态系统概览
截至2026年9月下旬，开源AI Agent生态系统正处于“稳定化危机”之中，正在从快速的功能扩展阶段转向紧张的基础设施强化阶段。各个项目都在统一应对内存管理、状态持久化和跨平台同步等难题，这些挑战反映了Agent从本地实验走向生产级部署过程中的困境。当前生态正在分化：一类是优先考虑“企业级加固”稳定性的项目（OpenClaw, ZeroClaw），另一类则是专注于敏捷且面向用户的Agent交互体验（UX）的项目（IronClaw, Hermes）。

### 2. 活动对比

| 项目 | 近期事项 (Issues + PRs) | 发布状态 | 健康评分 (预估) |
| :--- | :--- | :--- | :--- |
| **OpenClaw** | 1,000 | v2026.8.33 (LTS) | 7.5/10 (高压) |
| **Hermes Agent** | 100 | 无 | 6.5/10 (维护中) |
| **IronClaw** | 7 (活跃 PRs) | v1.4.1 (稳定) | 9.0/10 (增长中) |
| **QwenPaw** | 47 | 无 | 7.0/10 (重构中) |
| **ZeroClaw** | 77 | 无 | 7.5/10 (安全聚焦) |

### 3. OpenClaw的定位
OpenClaw是生态系统中的“重量级”参考架构。与更专业化的IronClaw或面向消费者的Hermes不同，OpenClaw专为规模化构建，但这也导致了更高的技术债务和显著的回归测试阻力。它拥有最大的社区基础，是状态化Agent工作流的趋势引领者，但目前正饱受“功能臃肿”带来的稳定性问题困扰。其核心优势在于深度和成熟度，但目前敏捷性不如IronClaw，后者成功平衡了稳定性与简洁、功能导向的发布节奏。

### 4. 共享技术重点
*   **内存与上下文持久化：** 几乎所有项目（OpenClaw, ZeroClaw, Hermes）都在与会话清理、数据库增长和上下文窗口管理等问题作斗争。
*   **工作流编排：** 业界正集体转向形式化的“决策模型”和“任务范围”推理，这标志着从简单的聊天-检索循环模式的演进（OpenClaw, Hermes, IronClaw）。
*   **部署拓扑：** 业界已达成共识，需要分布式/远程工作节点池来绕过单机资源限制（IronClaw, ZeroClaw）。

### 5. 差异化分析
*   **IronClaw：** 专注于**延迟与UX**，目标是那些优先考虑性能的开发者（Turn-0工具选择）。
*   **ZeroClaw：** 专注于**安全与身份**，优先考虑OIDC、沙盒隔离和模式驱动的配置。
*   **QwenPaw：** 专注于**集成**，专门弥合与外部提供商（Telegram, Kimi, OpenAI）的差距以及跨平台终端工具的适配。
*   **Hermes：** 专注于**桌面端原生可靠性**，针对Electron/浏览器界面和本地环境同步进行了优化。

### 6. 社区动力与成熟度
*   **高动力 (增长)：** **IronClaw** 目前是表现最均衡的项目，展现出强大的动能，且发布版本稳定、评价良好。
*   **高强度 (稳定中)：** **OpenClaw** 和 **ZeroClaw** 处于“紧急”维护模式。它们规模庞大，但进展目前因Bug修复周期和安全加固而受阻。
*   **维护模式：** **Hermes Agent** 和 **QwenPaw** 主要致力于清理待办事项和解决特定平台的环境回归问题，而非结构性演进。

### 7. 趋势信号
*   **“无聊”带来的溢价：** 全局用户情绪（特别是OpenClaw和Hermes的用户）显示，相比新功能，用户强烈偏好稳定性和“无聊”的更新。
*   **模式标准化：** 行业正转向严格的配置模式（ZeroClaw的V4版本），以减少复杂Agent设置中常见的“黑盒”配置问题。
*   **知识图谱作为一等公民：** 从基于RAG的文档检索转向结构化的知识图谱记忆，是下一个主要的架构前沿（ZeroClaw），预计到2027年第一季度将成为生态系统的通用标准。
*   **部署成熟度：** 从仅限本地的Agent向“边缘就绪”或“分布式”Agent架构转型，是寻求企业级采用的项目的核心路线图差异点。

---

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

## Hermes Agent 项目摘要：2026-09-30

### 1. 今日概览
Hermes Agent 项目目前处于高强度的维护状态，过去 24 小时内共有 100 项活动内容（50 个 issue 和 50 个 PR）得到更新。开发工作主要集中在稳定 **Desktop** 组件，重点针对 Windows 兼容性、安装可靠性和会话生命周期管理。尽管入站 Bug 报告的数量仍然很大，但项目正通过一系列针对会话状态、更新机制和崩溃恢复的 PR 做出强有力的修正响应。

### 2. 发布
*   **无。** 过去 24 小时内没有发布新版本。

### 3. 项目进展
近期的 PR 几乎全部集中在强化桌面端的用户体验：
*   **会话生命周期：** PR [#127011](https://github.com/NousResearch/hermes-agent/pull/127011) 和 [#124805](https://github.com/NousResearch/hermes-agent/pull/124805) 解决了会话元数据和同步问题，确保会话行能够被正确地按需扩充（lazily enriched），并从存储中实时捕获状态。
*   **更新增强：** 已提交一系列 PR（[#127290](https://github.com/NousResearch/hermes-agent/pull/127290), [#128301](https://github.com/NousResearch/hermes-agent/pull/128301), [#128612](https://github.com/NousResearch/hermes-agent/pull/128612), [#128553](https://github.com/NousResearch/hermes-agent/pull/128553)）以修复 Windows 和 POSIX 平台上不稳定的桌面更新问题，特别是防止重启循环并更优雅地处理安装失败。
*   **UI/UX 改进：** PR [#125983](https://github.com/NousResearch/hermes-agent/pull/125983) 引入了对纯文本提交时 `display.busy_input_mode` 的支持，[#128755](https://github.com/NousResearch/hermes-agent/pull/128755) 提供了更精确的 OpenRouter 成本报告。

### 4. 社区热点
*   **[#84361](https://github.com/NousResearch/hermes-agent/issues/84361)：** Desktop 中的失效文件链接。已通过清理解决，这也凸显了基于正则的 Markdown 解析所带来的持续性问题。
*   **[#95189](https://github.com/NousResearch/hermes-agent/issues/95189)：** WSL2 上关键 Gateway 的不稳定性。用户遇到了由持续连接流失（churn）导致的 OOM（内存溢出）错误。
*   **[#69940](https://github.com/NousResearch/hermes-agent/issues/69940)：** WebSocket 每 17 分钟断开连接（代码 1012），导致会话孤立和数据丢失。这表明会话回收逻辑存在系统性问题。
*   **[#103748](https://github.com/NousResearch/hermes-agent/issues/103748)：** 关于向活跃会话注入消息的官方机制的特性请求，反映了对“管理者-代理（manager-agent）”编排工作流的需求。

### 5. Bug 与稳定性
*   **高优先级：**
    *   **[#124255](https://github.com/NousResearch/hermes-agent/issues/124255)：** 由于 SwiftShader 后备导致的笔记本电脑 CPU 过热。**状态：** 已关闭/已修复。
    *   **[#95189](https://github.com/NousResearch/hermes-agent/issues/95189)：** WSL2 上 Gateway OOM 问题。**状态：** 进行中。
*   **中/低优先级：**
    *   **[#128720](https://github.com/NousResearch/hermes-agent/issues/128720)：** Slack 斜杠命令回归，导致提示词固定（prompt-pin）翻转。
    *   **[#123347](https://github.com/NousResearch/hermes-agent/issues/123347)：** 群聊启动期间的 `_DeadlockError`。
    *   **[#128697](https://github.com/NousResearch/hermes-agent/issues/128697)：** 间歇性的插件发布失败。

### 6. 特性请求与路线图信号
*   **高级认证：** [#110759](https://github.com/NousResearch/hermes-agent/issues/110759) 请求支持自定义密码管理器（Proton Pass），表明有摆脱硬编码凭据后端的必要性。
*   **决策模型：** [#119678](https://github.com/NousResearch/hermes-agent/issues/119678) 请求支持 OpenRouter 的 Decisions-API，以处理 MCP 批准等辅助任务。对于运行多代理设置的高级用户，这很可能会被优先考虑。

### 7. 用户反馈总结
用户目前对 **Desktop 可靠性**表示不满——特别是会话持久性、远程后端加载缓慢以及 Windows 上的崩溃问题。核心 CLI/Gateway 的稳定性与基于 Electron 的 Desktop 封装器的脆弱性之间存在明显的差异。连接到远程/VPS 后端的由于延迟和意外的会话超时，感受到的“痛苦”最为强烈。

### 8. 待办事项监控
*   **[#71168](https://github.com/NousResearch/hermes-agent/issues/71168)：** 升级后会话列表需要 5 分钟以上才能加载，这仍然是一个显著的用户体验摩擦点。
*   **[#63840](https://github.com/NousResearch/hermes-agent/issues/63840)：** 在新会话中自动恢复旧内容；这是一个长期存在的回归问题，干扰了从头开始的工作流。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目摘要：2026-09-30

## 1. 今日概览
IronClaw 项目在 1.4.1 版本成功发布后保持了强劲的发展势头。目前的开发重心集中在通过智能工具选择来优化智能体延迟，并通过改进 CLI 和 Web UI 来提升用户体验。随着 5 个活跃 PR 和 2 个重要架构提案的讨论推进，项目依然处于稳健且高速的增长阶段。

## 2. 版本发布
*   **[ironclaw-v1.4.1](https://github.com/nearai/ironclaw/releases/tag/ironclaw-v1.4.1) (2026-09-29):**
    *   **亮点：** 将 RC2 候选版本升级为稳定版。包含针对 Web UI 中 Google OAuth 激活（Gmail/Calendar）的关键修复，以及 Wasmtime 依赖项的安全更新。
    *   **迁移：** 未报告重大破坏性变更；建议所有运营商进行常规更新。

## 3. 项目进展
*   **[PR #8120](https://github.com/nearai/ironclaw/pull/8120) (已合并)：** 将 `v1.4.1-rc.2` 提升至稳定状态，完成发布周期并更新了 lockfiles。
*   **UI/CLI 优化：** 持续进行的工作包括修复 Web UI 命令面板中的焦点抢占问题（[PR #8117](https://github.com/nearai/ironclaw/pull/8117)），以及提高 CLI 配置的透明度（[PR #8118](https://github.com/nearai/ironclaw/pull/8118)）。
*   **基础设施：** 通过 CI 继续执行自动化代码库内存刷新（[PR #7988](https://github.com/nearai/ironclaw/pull/7988)）。

## 4. 社区热点
*   **[Issue #7889 - Remote Edge Workers](https://github.com/nearai/ironclaw/issues/7889)：** 此 RFC 探讨了扩展调度程序以支持分布式工作节点池。这反映了用户日益增长的需求，即利用跨多个节点的闲置硬件，从而突破当前单机部署的限制。
*   **[Issue #8113 - Opt-in Turn-0 Tool Selection](https://github.com/nearai/ironclaw/issues/8113)：** 一项旨在减少智能体延迟的高影响力提案，通过在首次模型调用前对工具进行排序来实现。此举旨在消除“工具搜索”往返开销，直接解决智能体工作流中的效率痛点。

## 5. Bug 与稳定性
*   **Web UI 焦点回归：** 一个 UX Bug，表现为关闭命令面板会导致 UI 丢失输入字段焦点，目前正在 [PR #8117](https://github.com/nearai/ironclaw/pull/8117) 中进行修复。（严重性：低）
*   **CLI 配置透明度：** 用户反馈在复杂环境中难以识别有效的启动配置文件；[PR #8118](https://github.com/nearai/ironclaw/pull/8118) 通过更清晰地显示当前活动的配置路径解决了该问题。（严重性：低）

## 6. 功能需求与路线图信号
*   **效率：** “turn-0” 工具选择（[PR #8119](https://github.com/nearai/ironclaw/pull/8119)）极有可能成为下一个小版本的优先级事项，鉴于其对智能体响应速度的性能提升。
*   **可扩展性：** 远程边缘工作节点（[Issue #7889](https://github.com/nearai/ironclaw/issues/7889)）代表了 IronClaw 的下一个主要架构演进，标志着项目正向企业级分布式部署迈进。

## 7. 用户反馈总结
目前的反馈显示，用户对平台核心功能的可靠性表示高度满意。然而，用户对 CLI 和 Web UI 的“易用性”改进有明确需求，同时也期望获得更先进的部署拓扑（分布式/远程工作节点）以支持更复杂、资源密集型的智能体任务。

## 8. 待办事项观察
*   **[Issue #7889](https://github.com/nearai/ironclaw/issues/7889)：** 尽管目前处于活跃讨论阶段，但该 RFC 对于平台的长期可扩展性至关重要。维护者应优先就实现方案达成共识，以将其从“RFC”阶段推进至“设计已批准”阶段。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目摘要：2026-09-30

## 1. 今日概览
QwenPaw 目前处于高强度的维护与稳定化阶段，过去 24 小时内共有 47 项内容获得更新。开发重点集中在跨平台可靠性、文件处理性能优化，以及解决与外部模型提供商的集成冲突上。PR 数量远高于新 Issue 数量，表明维护团队目前优先处理技术债务和架构稳健性，而非盲目扩充新功能。

## 2. 版本发布
*过去 24 小时内未发布新版本。*

## 3. 项目进展
开发团队提交了多项关键修复，主要针对稳定性和特定环境下的问题：
* **终端与 PTY：** 解决了导致 PTY 操作受阻的高文件描述符占用问题 (#8023)，并修复了跨平台路径/沙箱清理相关的 Bug (#8026)。
* **桌面端稳定性：** 实现了针对 NSIS 固实压缩问题的修复 (#8025)，并改进了 `qoder` 子系统的时区处理 (#8024)。
* **Telegram 集成：** 完成了由 `j4Uq` 提交的一系列改进，包括 `/start` 握手信息处理 (#7773)、提及 (mention) 门限中的命令寻址 (#7765) 以及审批卡片的 HTML Markdown 解析 (#7718)。

## 4. 社区热点话题
*   **[#7991] TaskTracker 僵尸条目：** 最受关注的问题（4 条评论），涉及仪表板任务计数与聊天列表 API 之间的不一致。用户观察到“运行中”状态计数虚高，反映出全局状态跟踪与单个聊天状态之间亟需更好的同步机制。
*   **[#2359] 心跳/定时任务流控制：** 这项长期存在的请求（3 条评论）要求增加 `HEARTBEAT_OK` / `CRON_OK` 令牌，目前仍备受关注。社区希望在自动化场景下，能像 OpenClaw 的架构那样，对模型发送消息的行为进行更细粒度的控制。

## 5. Bug 与稳定性
*   **高优先级：**
    *   [#8036] **OpenAI/Kimi 提供商故障：** 用户反馈连接测试通过但实际生成失败，且 UI 错误提示掩盖了底层的提供商报错。
    *   [#8022] **上下文污染：** 一个会导致 `send_file_to_user` 在历史记录中留下空助手消息的 Bug，该问题会触发所有模型的 400 报错。
*   **中优先级：**
    *   [#8035] **转录设置：** 切换转录提供商会静默导致功能失效，且 UI 未能正确更新 `transcription_model` 配置。
    *   [#8013] **技能下载超时：** 大规模技能包 (>80MB) 会触发 UI 层硬编码的 30 秒超时限制，尽管后端仍在处理，导致出现“幽灵”安装。（修复进行中：[#8027]）。

## 6. 功能请求与路线图信号
*   **离线/内网支持：** 社区正在推动可配置的技能/插件市场源 (#8015)，旨在使 QwenPaw 能够运行在物理隔离或私有化部署的环境中。
*   **UI 自定义：** 桌面端 (Tauri) 的字体缩放需求 (#7999) 已被标记为 `good first issue`，表明该项可能被列入近期发布计划，以提升可访问性。

## 7. 用户反馈总结
当前用户情绪反映了对“黑盒”式故障的挫败感——特别是在提供商集成 (OpenAI/Kimi) 和转录设置方面，UI 对错误细节的掩盖造成了困扰。用户同时也受限于桌面端的局限性，特别是在可访问性（字体缩放）以及缺乏对大规模文件操作（技能管理）的稳健支持方面。

## 8. 积压任务观察
*   **[#2359] HEARTBEAT_OK/CRON_OK：** 自 2026 年 3 月起悬而未决。这需要维护团队介入，定义自动化内容交付的策略，这对高级智能体自动化至关重要。
*   **[#6252] 桌面端缩放问题 (Linux)：** 虽然已被确认，但在 Linux 环境下缺失 Ctrl+滚轮缩放功能，仍然是 Ubuntu/Arch 用户面临的顽固痛点。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目摘要：2026-09-30

## 1. 今日概览
ZeroClaw 项目正处于技术整合的密集期，共有 77 个待处理项（27 个 Issue，50 个 PR），活跃度极高。工程重心已大幅转向加固安全架构——特别是围绕 OIDC 集成、会话所有权以及沙箱隔离机制——同时也在推动向 Configuration Schema V4 的重大破坏性升级。代码库目前正在进行“春季大扫除”，清理已弃用的 SaaS 集成和冗余配置面，旨在打造一个更精简、以核心功能为导向的运行时环境。

## 2. 版本发布
*   **本周期内无新版本发布。**

## 3. 项目进展
*   **上下文限制修复：** [PR #11260](https://github.com/zeroclaw-labs/zeroclaw/pull/11260) 已合并，修复了交互式智能体（Agent）会话被错误限制在 32k token 后备方案的重大 Bug，使用户终于能够利用完整的 131k 上下文窗口。
*   **配置加固：** Schema V4 迁移工作进展显著 ([PR #11218](https://github.com/zeroclaw-labs/zeroclaw/pull/11218))，旨在停用遗留配置键并清理配置表面。
*   **插件基础设施：** “已验证插件更新”流程 ([PR #11262](https://github.com/zeroclaw-labs/zeroclaw/pull/11262)) 及相关的宿主端准入逻辑 ([PR #11261](https://github.com/zeroclaw-labs/zeroclaw/pull/11261)) 已接近完成，解决了此前缺乏明确更新/回滚协议的问题。

## 4. 社区热门话题
*   **[Issue #8832](https://github.com/zeroclaw-labs/zeroclaw/issues/8832) - 插件支持 Kanban 看板：** 该 Issue 拥有 10 条评论，是目前讨论度最高的功能需求。用户呼吁实现更具自主性的 Agent 驱动的任务管理。
*   **[Issue #10068](https://github.com/zeroclaw-labs/zeroclaw/issues/10068) - 32k Token 上限：** （已关闭）在近期补丁发布前，这是高级用户的主要痛点；社区对 Token 管理和运行时透明度高度敏感。
*   **[Issue #6105](https://github.com/zeroclaw-labs/zeroclaw/issues/6105) - Cron/Agent 上下文：** 社区持续关注 Agent 如何在定时任务中保持状态。

## 5. Bug 与稳定性
*   **S0 - 安全/数据丢失（严重）：** 
    *   [#11197](https://github.com/zeroclaw-labs/zeroclaw/issues/11197)：管理员撤销权限后，会话仍可恢复并被访问。
    *   [#11198](https://github.com/zeroclaw-labs/zeroclaw/issues/11198)：代理内存工具绕过了主体作用域限制。
    *   [#11239](https://github.com/zeroclaw-labs/zeroclaw/issues/11239)：已拥有的会话泄露至共享内存层。
*   **S1/S2 - 工作流/功能降级：**
    *   [#11126](https://github.com/zeroclaw-labs/zeroclaw/issues/11126)：排队中的会话操作未能及时响应撤销指令。
    *   [#11233](https://github.com/zeroclaw-labs/zeroclaw/issues/11233)：验证报告错误（由 DefuzeX-AI 报告）。
    *   [#11257](https://github.com/zeroclaw-labs/zeroclaw/issues/11257)：WhatsApp Web 媒体说明文字丢失。

## 6. 功能需求与路线图信号
*   **知识图谱作为内存：** [Issue #11053](https://github.com/zeroclaw-labs/zeroclaw/issues/11053) (RFC) 提议将知识图谱从“工具”转变为“一等公民内存层”，这是一次重大的架构转向。
*   **文档检索 (RAG)：** [Issue #11235](https://github.com/zeroclaw-labs/zeroclaw/issues/11235) 提议为基于文档的 RAG 建立标准化的知识语料库。
*   **预测：** 预计下一个大版本将包含完善的“内存层”重构以及 Schema V4 的正式确立。

## 7. 用户反馈总结
用户普遍赞赏快速的安全补丁更新，但对当前存在的“隐蔽性”故障（如 Cron 任务丢失上下文、WhatsApp 媒体文字丢失）感到沮丧。正如外部安全审计工具涌入的大量 Bug 报告所反映的那样，用户对更可靠的长期记忆以及对 Agent 后台操作的更高可观测性有着强烈的需求。

## 8. 待办事项观察
*   **[Issue #7824](https://github.com/zeroclaw-labs/zeroclaw/issues/7824)：** 企业微信主动消息推送。该事项已在“冷藏库”中搁置数月；对于在亚洲市场运营的企业用户而言，这是一个显著的功能缺口。
*   **[PR #9254](https://github.com/zeroclaw-labs/zeroclaw/pull/9254)：** IBM Db2 会话持久化。目前已推迟；考虑到该数据库需求的特殊性，可能需要专门的项目负责人来推进此项工作。

</details>

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*