# OpenClaw 生态日报 2026-10-19

> Issues: 228 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-10-19 04:26 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目摘要 - 2026-10-19

## 1. 今日概览
OpenClaw 生态系统正经历大规模重构与稳定性加固阶段，活跃度极高（24小时内更新了228个issue和500个PR）。目前的重心主要集中在解决 Gateway 在 SQLite/状态管理方面的长期技术债务、优化内存占用，以及收紧 Agent 浏览器自动化的安全边界。尽管代码变更节奏很快，但项目正面临严重的稳定性回退，特别是在 Windows 和 macOS 的多 Agent 部署环境下，这表明架构近期在内部更新的压力下出现了一些疲态。

## 2. 版本发布
*   **v2026.10.5:** 引入了强大的“自愈”更新机制，可跨不同文件系统、pnpm 12 以及提权/登录 Shell 环境持久化。该版本特别解决了过期的切换租约（handoff leases）和包激活日志问题，确保安装过程不会停留在未完成状态。

## 3. 项目进展
*   **重构:** 目前正全力整合运行时所有权。PR [#176878](https://github.com/openclaw/openclaw/pull/176878) 和 [#176907](https://github.com/openclaw/openclaw/pull/176907) 旨在移除重复的运行时机制和未使用的私有选项，以精简核心代码库。
*   **性能:** PR [#176909](https://github.com/openclaw/openclaw/pull/176909) 引入了一种在升级期间复用“完全关闭完整性证明”（clean-close integrity proofs）的机制，防止不必要的数据库重新扫描。
*   **UI/UX:** 对 Web UI 进行了大幅清理，包括将侧边栏区域管理迁移至 refs ([#176727](https://github.com/openclaw/openclaw/pull/176727))，以及简化事件展示 ([#176719](https://github.com/openclaw/openclaw/pull/176719))。

## 4. 社区热门话题
*   **Gateway RSS 失控:** Issue [#154812](https://github.com/openclaw/openclaw/issue/154812) (13条评论) 反馈了 Gateway 在 V8 堆内存之外存在严重的内存泄漏，导致频繁触发 OOM 崩溃。这是自托管生产环境用户高度关注的问题。
*   **WhatsApp TTS 失败:** Issue [#144502](https://github.com/openclaw/openclaw/issue/144502) (13条评论) 指出 WhatsApp 音频处理（48kHz/Lavf 标签）存在反复出现的问题，影响了基本的通信功能。
*   **会话上下文膨胀:** Issue [#67419](https://github.com/openclaw/openclaw/issue/67419) (13条评论) 记录了因重复注入引导文件（bootstrap files）导致的 20-30% Token 浪费，这持续引发高级用户的诟病。

## 5. Bug 与稳定性
*   **严重 (P0/P1) 回退:**
    *   [#166894](https://github.com/openclaw/openclaw/issue/166894): Windows 下 Gateway 重启挂起长达 2 小时。
    *   [#161378](https://github.com/openclaw/openclaw/issue/161378): 用户反馈在 Windows 2026.9.x 版本上出现严重的锁失败问题，部分用户被迫回退到 2026.7.35 LTS 版本。
    *   [#143334](https://github.com/openclaw/openclaw/issue/143334): 子 Agent 完成情况丢失，导致整个会话资源枯竭。
*   **正在修复:** PR [#176833](https://github.com/openclaw/openclaw/pull/176833) 正在解决一个已知问题：SQLite 分词器变更导致启动时 FTS 索引被隔离。

## 6. 功能需求与路线图信号
*   **安全与合规:** 用户正呼吁更细粒度的控制，例如针对 Swarm Agent 的“有界启动契约” ([#156632](https://github.com/openclaw/openclaw/issue/156632)) 以及可配置的纯文本终止触发器 ([#164870](https://github.com/openclaw/openclaw/issue/164870))。
*   **预测:** 预计“凭据切换” ([#174599](https://github.com/openclaw/openclaw/pull/174599)) 功能将很快稳定，该功能旨在将客户端凭据与主 Gateway 数据库实现更好的隔离。

## 7. 用户反馈总结
当前用户情绪参差不齐。虽然开发速度令人印象深刻，但长期的高级用户正经历“升级疲劳”。近期 Issue 的共同点在于：新功能触发了基础领域（SQLite 存储、启动可靠性）的回退，导致社区呼吁进行更长周期的稳定性维护。

## 8. 待办事项监控
*   **[#77886](https://github.com/openclaw/openclaw/issue/77886):** 需要一套经所有者批准的保护性配置变更流程。该 Issue 自 2026 年 5 月起悬而未决，仍是实现“Agent 自主性”安全的关键路径。
*   **[#137366](https://github.com/openclaw/openclaw/issue/137366):** 内存搜索性能下降。随着索引规模扩大，该问题正成为长上下文 Agent 的瓶颈。

---

## 横向生态对比

# 跨项目分析：个人 AI Agent 生态系统 (2026-10-19)

### 1. 生态系统概览
开源 AI Agent 生态系统目前正处于从“功能扩展”阶段向“稳定性与可观测性”阶段的转型期。在所有受监控的项目中，趋势非常明确：重心正转向强化核心运行时环境、管理内存占用，以及解决早期快速开发所遗留的技术债。开发者正日益关注跨平台可靠性、安全的 Agent 间 (A2A) 通信协议，以及提升终端用户对自主决策循环的透明度。

### 2. 活动对比
| 项目 | 活跃 Issue/PR (24小时) | 最近发布 | 健康度评分 |
| :--- | :--- | :--- | :--- |
| **OpenClaw** | ~728 (极高) | v2026.10.5 | 压力过大 |
| **Hermes Agent**| ~57 (高) | 无 | 稳定/高压状态 |
| **IronClaw** | ~38 (中等) | 无 | 稳定 |
| **QwenPaw** | ~36 (中等) | v2.2.2 | 恢复中 |
| **ZeroClaw** | ~50 (高) | v0.8.6 | 增长中 |

*健康度评分基于维护工作量与稳定性报告的比率得出。*

### 3. OpenClaw 的定位
OpenClaw 在该群体中扮演着“超级扩展器”的角色。其技术路线强调深度的网关级集成和复杂的状态管理，这促成了其极高的功能迭代速度。尽管这使其成为企业级或高阶用户多 Agent 部署中最稳健的平台，但目前也承受着最高的稳定性风险。其代码库的活跃度显著高于其他项目，虽然确立了其“重量级”选手的地位，但也带来了“升级疲劳”以及 Windows/macOS 平台碎片化的问题。

### 4. 共同关注的技术领域
*   **网关/运行时稳定性：** **OpenClaw** 和 **Hermes** 目前都在应对“RSS 失控”和内存管理问题，这表明当前一代的 Agent 网关在长上下文、多 Agent 环境中正触及内存上限。
*   **通信桥接集成：** **IronClaw** (Sendblue)、**QwenPaw** (钉钉/飞书) 以及 **ZeroClaw** (XMPP) 都在优先考虑“通用连接性”——即通过扩展将 Agent 从 Web 聊天界面接入到成熟的即时通讯协议中。
*   **错误可视化：** **Hermes**、**QwenPaw** 和 **ZeroClaw** 的一个共同趋势是致力于解决“静默失败”模式，目前 LLM Token 限制或网络中断常导致工作丢失且 UI 层面缺乏反馈。

### 5. 差异化分析
*   **OpenClaw：** 专注于基础设施沉重的自托管模式；优先考虑 Agent 浏览器自动化和复杂的状态持久化。
*   **Hermes Agent：** 定位为面向研究、模块化的 Agent 混合 (MoA) 工作流工具集。
*   **IronClaw：** 强调 Rust 原生性能，以及极简、依赖稳定的基础设施。
*   **QwenPaw：** 瞄准用户友好的跨平台渠道通信（钉钉/飞书）；最适合本地化专业团队使用。
*   **ZeroClaw：** 专注于“零代码”仪表盘和基于 WASM 的插件扩展性，优先考虑插件创建的易用性，而非原始核心的复杂性。

### 6. 社区动力与成熟度
*   **快速迭代：** **OpenClaw** 和 **ZeroClaw** 在迭代速度上领先。OpenClaw 正处于“硬重构”阶段，而 ZeroClaw 处于“v0.8 功能爆发”阶段。
*   **稳定/维护期：** **IronClaw** 代表了最成熟、最安静的生态系统，专注于安全性和依赖关系治理，而非激进的功能迭代。
*   **停滞/积压：** **Hermes** 和 **QwenPaw** 目前正在应对高额技术债，长期悬而未决的 PR（QwenPaw 的“顾问模式”、Hermes 的“ACP 会话整合”）表明在保持核心系统正常运行的同时，合并复杂功能存在困难。

### 7. 趋势信号
*   **向本地化协议转移：** 对 XMPP/Prosody (ZeroClaw) 和直接基于 API 的消息传递 (Sendblue/IronClaw) 的浓厚兴趣表明，高阶用户正在从依赖专有平台的聊天包装器，转向安全、自托管的消息传递管道。
*   **执行过程中的控制：** 向 `/steer` 指令 (QwenPaw) 和边界约束 (OpenClaw) 的转变，标志着行业正将标准统一为“人在回路”的引导，而非完全的“一次性授权”式自主。
*   **财务可观测性：** 随着付费 LLM Token 的兴起，开发者现已将“成本追踪”和“使用透明度”作为核心功能构建到 Agent 网关中（例如 OpenRouter 余额、服务商报告的成本），这标志着开源 Agent 商业化进程的成熟。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目摘要：2026-10-19

## 1. 今日概览
Hermes Agent 项目目前处于高强度的维护阶段，PR 活动频繁（共有 50 个活跃 PR），且每天都有持续的错误报告（今日新增 7 个）。由高产贡献者 *kouyichi* 领导的开发团队正专注于稳定网关架构、完善会话状态管理，并解决桌面端和 CLI 组件中的边界情况故障。总体运行状况虽然稳定，但面临压力，许多 PR 目前正在接受关于会话状态安全性和性能优化的审核。

## 2. 发布记录
*2026-10-19 无新版本发布。*

## 3. 项目进展
*   **PR 活动：** 开发工作仍主要集中在“以修复为主”的重构上。值得关注的进展包括：
    *   **网关性能：** PR [#139798](https://github.com/NousResearch/hermes-agent/pull/139798) 通过优化内存管理来避免频繁的全量垃圾回收，从而降低网关延迟。
    *   **计费/结算：** PR [#141384](https://github.com/NousResearch/hermes-agent/pull/141384) 引入了对服务商报告成本的精确跟踪，不再依赖哨兵费率假设。
    *   **网关可靠性：** PR [#140081](https://github.com/NousResearch/hermes-agent/pull/140081) 和 PR [#140481](https://github.com/NousResearch/hermes-agent/pull/140481) 分别解决了启动阶段和繁忙路径消息处理过程中的稳定性问题。

## 4. 社区热点
*   **Issue [#140915](https://github.com/NousResearch/hermes-agent/issues/140915)：桌面端听写功能失效。** 这是目前讨论最活跃的主题（6 条评论）。用户对于远程门控连接上 STT 静默失败的情况感到沮丧，因为这会触发未经优化的回退到 blob 上传机制。
*   **PR [#82016](https://github.com/NousResearch/hermes-agent/pull/82016)：ACP 会话整合。** 这是一个长期存在的、高影响力的 PR，旨在改进 Agent 处理后台任务完成的方式，避免冗余的用户提示。

## 5. 错误与稳定性
*   **高优先级：**
    *   [#141370](https://github.com/NousResearch/hermes-agent/issues/141370)：由于沙盒/命名空间限制，`use_real_profile` 在现代 Ubuntu/AppArmor 系统上出现故障。
    *   [#141380](https://github.com/NousResearch/hermes-agent/issues/141380)：身份验证循环回归问题，后台 Agent 向系统频繁发送失败的 OAuth 刷新请求，导致错误量激增。
*   **中优先级：**
    *   [#141378](https://github.com/NousResearch/hermes-agent/issues/141378)："Buzz" 读取器遗漏了一个重要的串行读取器修复，导致消息碎片化。
    *   [#139645](https://github.com/NousResearch/hermes-agent/issues/139645)：桌面端听写出现间歇性的静默失败，且 UI 无反馈。

## 6. 功能请求与路线图信号
*   **MoA (Mixture of Agents) 优化：** Issue [#141381](https://github.com/NousResearch/hermes-agent/issues/141381) 提议允许参考顾问（reference advisors）查看执行 Agent 的系统提示词，以减少幻觉和定位错误。随着 MoA 的普及，这可能会被优先处理。

## 7. 用户反馈总结
用户正经历“隐形”故障——特别是在桌面听写和工具注册方面——系统会回退到不太理想的方法，或者在没有通知用户的情况下直接丢弃数据。社区日益认为，网关的日常维护和平台集成（如 macOS Matrix 适配器，[#131425](https://github.com/NousResearch/hermes-agent/issues/131425)）需要更强大的错误处理机制，以防止出现“静默降级”。

## 8. 待办事项观察
*   **[#131425](https://github.com/NousResearch/hermes-agent/issues/131425)：** macOS Matrix 适配器问题自 10 月 2 日起一直处于开启状态。由于它阻碍了 Mac 上的多配置文件使用，这对高级用户来说是一个重大障碍。
*   **[#82016](https://github.com/NousResearch/hermes-agent/pull/82016)：** 作为一项复杂的会话状态修复，该 PR 自 8 月起就已开启，需要最终验证以确保它不会破坏现有的状态持久化。

---

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目摘要 – 2026-10-19

## 1. 今日概览
IronClaw 代码仓库目前处于重要的依赖维护阶段。过去 24 小时内，Dependabot 提交了大量的自动化 PR。开发工作的重心集中在基础设施稳定性以及扩展智能体生态系统（特别是消息传递功能）上。项目整体健康状况保持稳定，维护任务有效地清理了积压的依赖更新流程。

## 2. 版本发布
*本周期无新增发布。*

## 3. 项目进度
过去 24 小时的主要工作集中在维护方面，旨在处理技术债务并确保生态系统的一致性：
*   **[PR #8134](https://github.com/nearai/ironclaw/pull/8134):** 已关闭（已合并） – 更新了“everything-else”组，涵盖了 34 项依赖更新，包括 `thiserror` 和 `uuid`。
*   **[PR #8132](https://github.com/nearai/ironclaw/pull/8132):** 已关闭（已合并） – 更新了 `tokio` 生态组，确保最新的性能和稳定性补丁已整合至运行时中。

## 4. 社区热点
最重要的进展是引入了一个新的集成渠道：
*   **[PR #8127](https://github.com/nearai/ironclaw/pull/8127):** 该功能请求引入了 **Sendblue 扩展**，允许 IronClaw 智能体直接与 iMessage 和 SMS 进行交互。这代表了一项战略性举措，旨在将智能体从孤立的聊天环境转向个人通讯管道，反映了对“通用”智能体连接性的日益增长的需求。

## 5. Bug 与稳定性
*   **[Issue #8025](https://github.com/nearai/ironclaw/issues/8025):** [已关闭] 报告了一个因特殊字符处理不当导致输出错误的问题。尽管该问题已关闭，但报告者指出它可能源于最近的编码更改。用户应留意最近依赖更新后的输入字段行为，以确保文本序列化方面没有出现回归问题。

## 6. 功能请求与路线图信号
*   **Sendblue 集成:** 如 **[PR #8127](https://github.com/nearai/ironclaw/pull/8127)** 所述，项目路线图正明显向原生移动端和传统消息支持方向倾斜。预计该功能将很快合并，并可能作为未来 SMS/消息插件的蓝图。

## 7. 用户反馈总结
当前的反馈集中在开发者体验和生态系统维护上。用户主要关注代码库是否能与 Rust 生态系统（`tokio`、`serde_json` 等）保持同步。最近关于特殊字符的 Bug 报告表明，虽然智能体的逻辑在不断演进，但随着新功能的加入，底层的清理层（data sanitization）仍需持续关注。

## 8. 积压任务跟踪
*   **[PR #7834](https://github.com/nearai/ironclaw/pull/7834):** 该 PR 更新了 `wasm` 依赖组（`wasmtime`、`wit-parser`），自 2026 年 8 月 23 日起一直处于打开状态。考虑到其规模（"L"）和中等风险系数，它很可能被保留至重大发布周期中，以确保与 WebAssembly 主机运行时的兼容性。这是长期项目稳定性的一项关键事项，需要维护人员优先处理。

---

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目摘要 (2026-10-19)

### 1. 今日概览
2026-10-19 当日 QwenPaw 开发活跃度极高，Issue 和 Pull Request 合计产生 36 次事件，显示出 v2.2.2 版本发布后的高强度开发周期。项目目前专注于稳定渠道通信、改进 Web 控制台 UI 以及解决特定环境（Windows/Linux）下的 Bug。总体项目健康状况良好，但针对 v2.2.2 的 Bug 报告激增，表明有必要发布快速补丁版本以解决回归问题。

### 2. 发布记录
*过去 24 小时内无新版本发布。* 社区用户目前主要停留在 v2.2.2 版本。

### 3. 项目进展
*   **已合并/关闭的 PR：**
    *   [#8300](https://github.com/agentscope-ai/QwenPaw/issues/8300)：修复了提交消息后聊天输入框无法清除的 UI Bug。
    *   [#8269](https://github.com/agentscope-ai/QwenPaw/issues/8269)：解决了 Windows 系统下影响 ZIP 文件解压的字符编码问题。
    *   [#8282](https://github.com/agentscope-ai/QwenPaw/pull/8282)：修复了控制台内重复阈值的可见性和可编辑性问题。

### 4. 社区热点话题
*   [#8278](https://github.com/agentscope-ai/QwenPaw/issues/8278) (6 条评论)：**钉钉渠道降级**。用户反馈当回复内容超过 3500 字符时，会自动降级为纯文本，导致 Markdown 和 GFM 表格无法正常渲染。这是一个高优先级的 UX 问题。
*   [#6601](https://github.com/agentscope-ai/QwenPaw/issues/6601) (6 条评论)：**空响应处理**。长期关注的问题：模型在达到 Token 上限时未报错，导致长对话中出现“静默失败”。

### 5. Bug 与稳定性
*   **关键（紧急）：**
    *   [#8315](https://github.com/agentscope-ai/QwenPaw/issues/8315)：由于 `NO_PROXY` 配置冲突导致的飞书连接失败。
    *   [#8313](https://github.com/agentscope-ai/QwenPaw/issues/8313)：由于事件规范不匹配（`GROUP_MESSAGE_CREATE` 与 `GROUP_AT_MESSAGE_CREATE`），导致 QQ 群消息被丢弃。*修复方案在 [#8319](https://github.com/agentscope-ai/QwenPaw/pull/8319) 中待定。*
*   **高优先级：**
    *   [#8312](https://github.com/agentscope-ai/QwenPaw/issues/8312)：上下文控制失效导致任务中断。
    *   [#8265](https://github.com/agentscope-ai/QwenPaw/issues/8265)：特定 Python 3.11 发行版上的插件热安装失败。

### 6. 功能需求与路线图信号
*   **智能体控制：** [#8318](https://github.com/agentscope-ai/QwenPaw/pull/8318) 引入了 `/steer` 命令，允许用户在执行过程中提供指导——这对长时间运行的智能体而言是重要的 UX 改进。
*   **模型/集成：** [#8314](https://github.com/agentscope-ai/QwenPaw/pull/8314) 旨在添加官方 DeepSeek Search 提供商，反映了对更高质量、有源可溯的网页搜索结果的需求。
*   **移动端：** [#8311](https://github.com/agentscope-ai/QwenPaw/issues/8311) 显示出对标准化鸿蒙 (HarmonyOS) 插件架构的兴趣，表明项目正向移动优先的智能体执行方向推进。

### 7. 用户反馈总结
用户普遍对 v2.2.2 的功能广度表示满意，但反馈新 UI 的模型切换流程存在显著摩擦（点击次数过多，缺乏“收藏”功能），且“内存/重排序 (Memory/Reranker)”配置的健壮性有待提升。用户明确需求在 LLM 上下文或 API Token 达到上限时，提供更透明的错误报告。

### 8. 待办事项关注
*   [#7569](https://github.com/agentscope-ai/QwenPaw/pull/7569)：**顾问模式 (Advisor Mode)**。这是一个自 9 月起就已开启的超大规模 (XXXL) 功能。由于其复杂性，目前正拖累核心 PR 队列的进度。
*   [#7827](https://github.com/agentscope-ai/QwenPaw/issues/7827)：**MCP 商店连接性**。连接 DashScope MCP 商店时持续出现的 503/500 错误尚未解决，这影响了依赖外部工具库的用户。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目摘要 - 2026-10-19

## 1. 今日概览
ZeroClaw 在稳定其 v0.8.x 架构的过程中展现出极高的迭代速度。过去 24 小时内共有 50 个合并请求（PR）更新，并发布了重大更新版本（v0.8.6）。当前项目重点在于扩展插件生态系统及提升运行时可观测性。开发势头强劲，涵盖了基础设施重构（WASM 插件、A2A 协议）以及面向用户的特性添加（OpenRouter 集成、XMPP 支持）。

## 2. 版本发布
### [v0.8.6](https://github.com/zeroclaw-labs/zeroclaw)
*   **规模：** 一次大规模更新，包含 573 次提交，共有 74 位贡献者参与。
*   **关键亮点：** 
    *   **WASM 插件宿主：** 在所有 64 位 CLI 归档文件中实现原生集成。
    *   **插件注册表：** 专门为此版本推出了渠道和工具包。
    *   **所有权：** 转换了身份和运行时管理机制，以更好地适配新的插件架构。

## 3. 项目进展
*   **A2A 协议提取：** [PR #11712](https://github.com/zeroclaw-labs/zeroclaw/pull/11712) 开始将 A2A 协议集中化到一个专用的 `zeroclaw-a2a` crate 中，旨在简化线路模型和协议处理逻辑。
*   **会话改进：** [PR #10407](https://github.com/zeroclaw-labs/zeroclaw/pull/10407) 引入了持久化会话提示词挂载，使得聊天状态在重启后具备更好的持久性。
*   **运行时修复：** [PR #11407](https://github.com/zeroclaw-labs/zeroclaw/pull/11407)（已合并）解决了 ZeroCode UI 中的延迟问题，确保实时会话更新在高负载下能迅速呈现。
*   **可观测性：** [Issue #10950](https://github.com/zeroclaw-labs/zeroclaw/issue/10950) 已关闭，修复了运行时忽略 `cost.warn_at_percent` 配置的 Bug。

## 4. 社区热点话题
*   **[Issue #11418](https://github.com/zeroclaw-labs/zeroclaw/issue/11418): "Copy" 一键复制功能失效。**（7 条评论）。用户反馈 UI 剪贴板操作无法使用，目前已阻塞工作流。
*   **[Issue #9814](https://github.com/zeroclaw-labs/zeroclaw/issue/9814): 原生 XMPP / Prosody 渠道。**（3 条评论）。家庭实验室（Home-lab）爱好者正在推动 XMPP 支持，以补充现有的 Matrix/Discord 集成，这体现了用户对自托管、轻量级通信协议的偏好趋势。

## 5. Bug 与稳定性
*   **剪贴板故障 (S1 - Blocked)：** [Issue #11418](https://github.com/zeroclaw-labs/zeroclaw/issue/11418)。UI 层面的 Bug 导致文本无法复制，目前状态为处理中。
*   **macOS 插件权限：** [Issue #11829](https://github.com/zeroclaw-labs/zeroclaw/issue/11829)。目前正在调查已签名/公证的 macOS 构建版本是否能正确支持 WASM 插件 JIT；这是桌面版发布稳定性的潜在阻塞点。

## 6. 功能请求与路线图信号
*   **XMPP 集成：** [PR #11847](https://github.com/zeroclaw-labs/zeroclaw/pull/11847) 显示该功能已在积极开发中，极有可能在 v0.8.7 中落地。
*   **OpenRouter 余额报告：** [PR #11845](https://github.com/zeroclaw-labs/zeroclaw/pull/11845) 和 [#11846](https://github.com/zeroclaw-labs/zeroclaw/pull/11846) 表明团队正快速推进改进，旨在为使用 OpenRouter 的高级用户提供更佳的财务可观测性。
*   **内存监控：** [PR #11456](https://github.com/zeroclaw-labs/zeroclaw/pull/11456) 针对子进程内存限制的方案，反映了路线图重点在于加固 Agent 运行时，防止工具执行失控。

## 7. 用户反馈总结
用户主要关注 "ZeroCode"（TUI/仪表盘体验）和资源管理。用户对扩展性（插件/渠道）表示认可，但对配置透明度（UI 空状态显示）和基础 UI 功能（复制按钮）感到不满。“告知我为何发生”的需求正驱动着近期仪表盘可见性的多项改进。

## 8. 待办事项关注
*   **[Issue #8383](https://github.com/zeroclaw-labs/zeroclaw/issue/8383): 仪表盘中的活跃运行时上下文。** 虽然该 Issue 最近已关闭，但它自 6 月起便一直在待办事项中，这突显出“可观测性”特性往往让位于核心运行时稳定性。维护者应继续监控类似的“UX 上下文”请求，以防守护进程能力与 UI 透明度之间出现脱节。

</details>