# OpenClaw 生态日报 2026-11-02

> Issues: 167 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-11-02 01:28 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

## OpenClaw 项目摘要：2026-11-02

### 1. 今日概览
OpenClaw 目前处于高强度维护状态，表现为大量的 PR 活动（24 小时内更新 500 次），旨在解决架构稳定性和 UI 响应能力问题。项目目前正深陷严重的“崩溃循环”和“消息丢失”回归问题，特别是在 Linux 和 Windows 网关部署中。尽管开发进度很快，但 P1 级问题的积压表明，在近期发布更新后，核心平台正承受巨大压力。

### 2. 发布
*   **无。** 过去 24 小时内未发布任何新版本。

### 3. 项目进展
今日的进展集中于 UI 标准化和 CI/测试可靠性：
*   **UI/UX：** 大力推进分段控件标准化，并确保在移动设备/小视窗设备上的可读性（例如 [PR #190406](https://github.com/openclaw/openclaw/pull/190406)，[PR #190768](https://github.com/openclaw/openclaw/pull/190768)）。
*   **基础设施：** 改进 Android 和 Matrix 测试套件，以防止 CI 任务挂起（[PR #190762](https://github.com/openclaw/openclaw/pull/190762)，[PR #190760](https://github.com/openclaw/openclaw/pull/190760)）。
*   **性能：** 重构内存核心索引资格评分（index eligibility scoring），以减少重新计算的开销（[PR #190764](https://github.com/openclaw/openclaw/pull/190764)）。

### 4. 社区热点
*   **[Issue #144502](https://github.com/openclaw/openclaw/issues/144502)：** WhatsApp TTS 音频无法使用。用户在使用 48kHz 音频标签时遇到困难，凸显了在 Baileys/WA 传输层中进行更好编解码器处理的需求。
*   **[Issue #143632](https://github.com/openclaw/openclaw/issues/143632)：** iMessage 幽灵消息重复。这表明会话上下文信封（session context envelopes）的去重逻辑存在严重缺陷。
*   **[Issue #187900](https://github.com/openclaw/openclaw/issues/187900)：** `openclaw doctor` 在 Linux 上挂起。这是一个高优先级的可用性问题，阻碍了 Linux 主机上的故障恢复尝试。

### 5. Bug 与稳定性
*   **关键（P0/P1）：**
    *   [Issue #188424](https://github.com/openclaw/openclaw/issues/188424)：Gateway 2026.10.8 在 systemd 下无法识别自身 PID；导致持续重启循环。
    *   [Issue #156895](https://github.com/openclaw/openclaw/issues/156895)：自动化任务在 macOS 上静默失败。
    *   [Issue #152965](https://github.com/openclaw/openclaw/issues/152965)：插件热重载（hot-reloading）无意中处置了所有通道插件，导致活动流中断。
*   **状态：** 其中许多 Bug 目前缺乏专门的修复 PR，亟需维护者进行分类处理。

### 6. 功能请求与路线图信号
*   **终端生产力：** 将高级功能引入 CLI 的势头明显，[PR #188210](https://github.com/openclaw/openclaw/pull/188210) 即是一例，它为终端增加了转录搜索功能。
*   **工作流：** [Issue #150250](https://github.com/openclaw/openclaw/issues/150250)（技能工作坊）仍然是长期程序化学习的关键路线图项目，但目前因稳定性工作而被搁置。

### 7. 用户反馈总结
用户对“开发者中心工具”与“稳定的生产网关性能”之间的差距表示不满。一个反复出现的主题是故障发生时缺乏透明度（例如 Windows 上的静默退出，或模型回退链失败且没有日志）。移动端/响应式布局的改进受到好评，但这不足以抵消近期导致部分用户服务彻底中断的“墓碑会话（tombstoned session）”错误的影响。

### 8. 积压任务观察
*   **[Issue #90074](https://github.com/openclaw/openclaw/issues/90074)：** OpenAI 图像生成路由——自 2026 年 6 月起挂起。这仍是一个被评为“钻石龙虾（diamond lobster）”级的问题，表明关于 OAuth/API-key 优先级的深度架构冲突尚未得到解决。
*   **[Issue #165824](https://github.com/openclaw/openclaw/pull/165824)：** Matrix 消息突发问题。尽管该问题影响日常聊天可用性，但已等待维护者审查近一个月。

---

---

## 横向生态对比

### 跨项目分析：个人 AI Agent 生态系统
**日期：** 2026-11-02

#### 1. 生态系统概况
开源 AI Agent 生态系统目前正处于从“实验性聊天界面”向“生产级网关服务”转型的阶段。开发活动高度集中于解决架构瓶颈——特别是会话持久性、多平台网关稳定性和异步任务管理。尽管开发速度依然很快，但频繁出现的“崩溃循环”和“资源耗尽”问题表明，该领域在从业余原型向可靠的长运行守护进程（daemon）部署过渡的过程中正面临困境。

#### 2. 活动对比
| 项目 | 问题数 | PR (最近) | 发布状态 | 健康度评分* |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 500+ (总计) | 500 (24h) | 无 | 🟡 压力巨大 |
| **Hermes Agent**| 14 (活跃) | 50 (24h) | 无 | 🟢 恢复中 |
| **IronClaw** | 0 (新增) | 5 (自动) | 无 | 🔴 停滞 |
| **QwenPaw** | 5 (新增) | 19 (开放) | 无 | 🟡 迭代中 |
| **ZeroClaw** | 10 (活跃) | 47 (最近) | 无 | 🟢 扩展中 |

*\*健康度评分基于维护者的响应速度和代码迭代势头。*

#### 3. OpenClaw 的定位
OpenClaw 是该生态系统的“参考架构”，其庞大的 PR 数量和广泛的传输支持（WhatsApp, iMessage, Matrix）证明了这一点。与同类项目相比，它在跨协议集成方面最具雄心，但这也以极端的稳定性为代价。当 Hermes Agent 专注于特定的代理模式时，OpenClaw 试图提供一套“全栈解决方案”，使其成为功能最丰富但目前部署起来最脆弱的选择。

#### 4. 共享技术重点领域
*   **网关可靠性：** 所有项目（OpenClaw, Hermes, QwenPaw, ZeroClaw）都在努力解决“死锁”状态和网关重启循环问题。
*   **Agent 代理机制：** Hermes (PR #147745) 和 OpenClaw (Issue #150250) 正在优先处理后台任务管理和子代理协调。
*   **MCP 集成：** 通过 Model Context Protocol 标准化工具调用已成为一种反复出现的模式（QwenPaw #8424, ZeroClaw #12176）。

#### 5. 差异化分析
*   **侧重点：** **Hermes Agent** 优先考虑企业级可靠性和“脑链（brainchain）”模块化。**QwenPaw** 的目标人群是高级用户和 NAS 自托管用户。**ZeroClaw** 专注于高性能基础设施（Rust/守护进程架构）和文件系统持久性。
*   **目标：** **QwenPaw** 倾向于本地优先/私有硬件；**OpenClaw** 正在为普及化的跨平台通信进行优化；**IronClaw** 由于不活跃，目前定位不明。

#### 6. 社区动力与成熟度
*   **高活跃度（活跃）：** **ZeroClaw** 和 **Hermes Agent** 展示了最健康的开发周期，维护者积极合并修复并处理架构债务。
*   **高流失率（压力巨大）：** **OpenClaw** 和 **QwenPaw** 正在经历严重的社区摩擦，用户报告了显著的 UX 回退。
*   **维护债务：** **IronClaw** 似乎已进入“僵尸”状态，背负着沉重的依赖债务，且没有任何人工主导的 PR 活动。

#### 7. 趋势信号
*   **“代理（Agentic）”转变：** 生态系统正从响应式的 LLM 包装器转向主动编排器，这需要**持久的会话管理**和**类似 cron 的自动化调度**。
*   **开发者挫败感：** 用户对“静默失败”越来越敏感（例如 QwenPaw 的数据丢失和 OpenClaw 的静默退出）。这表明该行业正在进入一个**可观测性和日志记录**成为核心竞争要求的阶段。
*   **可移植性的限制：** 在受限环境（NAS、移动端浏览器）中部署 Agent 是一个巨大的增长领域，但当前的堆栈内存占用过大，或者假定环境为标准 Linux，导致在非标准部署场景下出现系统性崩溃。

---

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目摘要：2026-11-02

## 1. 今日概览
Hermes Agent 项目今日开发势头强劲，主要集中于稳定异步委托和网关会话管理。共有 50 个 PR 更新和 14 个活跃 Issue，维护团队（以 `teknium1` 为核心）正全力进行“抢救性”开发，致力于合并关于消息投递和会话准入的长期修复。当前的开发重心已明确转向解决任务“卡顿”状态以及提升多配置网关的可靠性。

## 2. 发布版本
*2026-11-02 无新增发布版本。*

## 3. 项目进展
项目正在清理堆积的复杂架构性修复。主要进展包括：
* **委托可靠性：** PR [#147745](https://github.com/NousResearch/hermes-agent/pull/147745) 确保 `/bg` 任务能够正确等待子代理（subagent）的结果，防止出现“pending”死锁。
* **桌面端/网关 UX：** 投入大量精力简化桌面端连接远程网关的流程 (PR [#147711](https://github.com/NousResearch/hermes-agent/pull/147711))，并优化了 SSH 网关的资源使用 (PR [#147741](https://github.com/NousResearch/hermes-agent/pull/147741))。
* **平台集成：** 增强了 Signal 重连的鲁棒性 (PR [#147750](https://github.com/NousResearch/hermes-agent/pull/147750))，并改进了 WhatsApp 的提及（mention）检测逻辑 (PR [#147749](https://github.com/NousResearch/hermes-agent/pull/147749))。

## 4. 社区热点
* **[#139135](https://github.com/NousResearch/hermes-agent/issue/139135) - Discord 异步委托失败：** 该 Issue 包含 14 条评论，凸显了 Discord 线程处理子任务完成时的关键故障，成为当前网关修复浪潮中的典型案例。
* **[#147745](https://github.com/NousResearch/hermes-agent/pull/147745) - /bg 任务联接：** 该 PR 是当前开发叙事的核心，旨在为受损的后台代理交互闭环扫清障碍。

## 5. Bug 与稳定性
稳定性是目前的首要关切，重点处理了一系列“admission_conflict”和“pending delivery”相关的 Bug：
* **严重 (回归)：** [#144563](https://github.com/NousResearch/hermes-agent/issue/144563) 报告称异步委托的完成状态会丢失，直到重启整个网关。PR [#147748](https://github.com/NousResearch/hermes-agent/pull/147748) 被指定为修复方案。
* **高 (操作性)：** [#147747](https://github.com/NousResearch/hermes-agent/issue/147747) 报告定时任务无法正确加载配置文件环境，导致自动化代理静默失败。
* **高 (安装)：** [#147744](https://github.com/NousResearch/hermes-agent/issue/147744) 显示在新的 Linux 安装环境下 Python 路径解析失败，导致代理完全无法启动。
* **中 (UI)：** [#147719](https://github.com/NousResearch/hermes-agent/issue/147719) 指出在 Windows TUI 环境下，路径自动补全功能遇到设备路径时会触发 `ValueError`。

## 6. 功能需求与路线图信号
* **JSON 优先工作流：** PR [#147370](https://github.com/NousResearch/hermes-agent/pull/147370) 旨在将 JSON 输出设为默认值，释放出增强定时任务和外部程序集成可读性的信号。
* **可扩展性：** PR [#147755](https://github.com/NousResearch/hermes-agent/pull/147755) 引入了 `brainchain`，这是一项用于自动化成本/质量可控的前沿模型委托的可选技能，预示着向模块化、“按效果付费”的代理架构转型。

## 7. 用户反馈总结
用户目前对“幽灵”状态感到沮丧——表现为任务看起来卡住、自动化上下文中的配置（如 `.env` 文件）加载失败，以及看板显示不存在的“待办”项。用户对在多配置和多网关环境下获得更可预测的行为有着强烈需求。转向“抢救”旧的、停滞的 Issue 是一个积极信号，表明维护者正在倾听这些痛点。

## 8. 待办事项观察
* **[#76362](https://github.com/NousResearch/hermes-agent/issue/76362) (SimpleX 图片丢失)：** 一个老旧 Issue（2026 年 8 月），涉及 SimpleX 的多媒体处理问题。尽管对基本的多模态交互有影响，但一直未受到足够重视。
* **[#132800](https://github.com/NousResearch/hermes-agent/issue/132800) (YAML 解析)：** 一个持续存在的配置问题，ID 格式化导致无效的 JSON/浮点数，造成手动编辑 YAML 文件的用户在配置管理时发生故障。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

## IronClaw 项目摘要：2026-11-02

### 1. 今日概览
IronClaw 项目目前处于“仅维护”阶段，过去 24 小时内未出现任何新问题或由开发人员发起的拉取请求（Pull Request）。仓库活动完全由 Dependabot 进行的自动化依赖管理所主导。目前没有正在进行的特性开发或 Bug 修复分类工作，这表明核心团队可能正专注于内部事务，或者项目目前处于稳定状态，只需极少的干预。

### 2. 发布
*无。* 本期间没有发布任何新版本。

### 3. 项目进展
*无。* 今日没有任何 PR 被合并或关闭。当前所有处于活跃状态的 PR 均为自动化依赖更新，尚未经过维护者的审核或合并。

### 4. 社区热点
目前社区互动极少。所有活跃的 PR 均由 `dependabot[bot]` 管理，且目前缺乏评论或社区反馈：
*   [PR #8160](https://github.com/nearai/ironclaw/pull/8160)： “Everything-else” 组依赖更新（43 个包）。
*   [PR #8159](https://github.com/nearai/ironclaw/pull/8159)： GitHub Actions 依赖更新。
*   [PR #8141](https://github.com/nearai/ironclaw/pull/8141)： Tokio 生态系统更新。
*   [PR #7834](https://github.com/nearai/ironclaw/pull/7834)： 与 Wasm 相关的依赖更新。
*   [PR #8140](https://github.com/nearai/ironclaw/pull/8140)： Serde_json 序列化更新。

**分析：** 这些 PR 缺乏讨论——其中一些自 2026 年 8 月起就已打开（如 #7834）——表明存在大量未被优先处理的维护债务。

### 5. Bug 与稳定性
今日未报告任何新的 Bug 或稳定性问题。现有的稳定性状况保持不变，维护工作目前处于停滞状态。

### 6. 特性需求与路线图信号
今日没有提交新的特性需求。鉴于近期没有针对新功能的拉取请求，目前无法预测下一个版本的发布路线图。

### 7. 用户反馈摘要
过去 24 小时内没有记录到任何用户反馈或讨论。该项目在公开社区讨论方面的活跃度目前较低。

### 8. 积压工作监控
最紧迫且需要维护者关注的项目是那些停滞的依赖更新：
*   [PR #7834 (Wasm updates)](https://github.com/nearai/ironclaw/pull/7834)：自 2026 年 8 月 23 日开启。这是一个“Size: L”级的更新，涉及核心 WebAssembly 组件（`wasmtime`、`wit-parser`），可能存在集成风险，需要人工审查才能安全合并。
*   [PR #8141 和 #8140](https://github.com/nearai/ironclaw/pull/8141)：自 10 月中旬开启，这些针对 `tokio` 和 `serde_json` 的更新对安全性和性能至关重要，但仍未得到处理，可能导致项目基础版本略显过时。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目摘要 (2026-11-02)

## 1. 今日概览
QwenPaw 今日开发者活跃度高，共有 19 个 PR 处于活跃迭代状态，另有 5 个新增的问题报告。当前的开发重点在于稳定受限环境（如 NAS 沙盒）下的部署，以及优化 MCP (Model Context Protocol) 的握手逻辑。虽然项目产出依然高效，但近期关于 UI 卡顿以及最新测试版 (v2.3.0b2) 出现回归问题的报告表明，在下一次稳定版发布前，有必要进行一轮稳定性冲刺。

## 2. 版本发布
*   **无新版本发布。** (当前稳定版: v2.2.2.post1；测试版: v2.3.0b2)。

## 3. 项目进展
*   **已合并/关闭：** 仅关闭了 1 个 PR——[PR #8033](https://github.com/agentscope-ai/QwenPaw/pull/8033)，该改动修复了 Tauri 桌面应用在启动新实例时会误杀现有实例的问题。
*   **进展中：** 系统集成方面取得了显著进展，包括改进了用于审批的桌面通知功能 ([PR #8504](https://github.com/agentscope-ai/QwenPaw/pull/8504))，以及针对配置文件更稳健的跨平台路径处理 ([PR #8525](https://github.com/agentscope-ai/QwenPaw/pull/8525))。

## 4. 社区热点
*   **MCP 协议兼容性 ([Issue #8424](https://github.com/agentscope-ai/QwenPaw/issues/8424))：** 该问题关注度最高（5 条评论）。用户反馈旧版 MCP 服务器被错误地识别为现代服务器，导致连接失败。社区正密切追踪作为解决方案的 [PR #8445](https://github.com/agentscope-ai/QwenPaw/pull/8445)。
*   **特定环境下的崩溃 ([Issue #8515](https://github.com/agentscope-ai/QwenPaw/issues/8515))：** 在专用硬件 (fnOS) 上部署的用户因依赖管理器中的文件系统权限逻辑而遭遇严重崩溃。这是目前私有化部署用户面临的关键痛点。

## 5. Bug 与稳定性
*   **严重 (崩溃)：** [Issue #8515](https://github.com/agentscope-ai/QwenPaw/issues/8515) - 由于 `pwd.getpwuid` 对家目录的假设，应用在受限环境中无法启动。**修复中：** [PR #8525](https://github.com/agentscope-ai/QwenPaw/pull/8525) 和 [PR #8527](https://github.com/agentscope-ai/QwenPaw/pull/8527)。
*   **高危 (数据丢失)：** [Issue #8500](https://github.com/agentscope-ai/QwenPaw/issues/8500) - "Auto-Dream" 功能在不通知用户的情况下悄悄丢弃内存数据，导致用户误以为操作“成功”，实则丢失了整整一天的进度。
*   **中等 (UX 回归)：** [Issue #8521](https://github.com/agentscope-ai/QwenPaw/issues/8521) - 反馈指出 v2.2.2.post1 版本中存在回复内容缺失、剪贴板功能失效 (Ctrl+C) 以及整体 UI 延迟的问题。

## 6. 功能需求与路线图信号
*   **任务调度/自动化 ([Issue #8523](https://github.com/agentscope-ai/QwenPaw/issues/8523))：** 社区对任务调度程序的需求明确，希望代理能够执行每日重复的工作流。这标志着项目正从被动的聊天助手向主动的代理编排器转型。
*   **嵌套技能文件夹 ([PR #8178](https://github.com/agentscope-ai/QwenPaw/pull/8178))：** 预计将改善拥有大量技能库的深度用户的使用体验，提升组织效率。

## 7. 用户反馈总结
用户对最新的 UI/UX 变动表示不满，特别指出当前版本相比旧版本显得“迟钝”。社区强烈要求增加一个“经典 UI”切换选项。此外，剪贴板问题（需要多次按下才能生效）引起了广泛困扰。在 NAS 和容器化环境中的部署阻碍，依然是资深用户面临的主要障碍。

## 8. 待办事项监控
*   **[Issue #8231](https://github.com/agentscope-ai/QwenPaw/pull/8231)：** 一个关于第三方插件更新的中等规模修复，自 10 月中旬起一直处于挂起状态。
*   **[Issue #8367](https://github.com/agentscope-ai/QwenPaw/pull/8367)：** 一项重大功能增加（关键词/代理式搜索），自 10 月下旬起一直处于评审阶段；该功能对于提升长期记忆检索能力备受期待。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目摘要：2026-11-02

## 1. 今日概览
ZeroClaw 保持着高速开发节奏，近期共有 57 项活动（10 个议题，47 个 PR）。目前的重心高度集中在统一文件管理系统（RFC #9488）的“第二阶段”实施，以及守护进程安全与运行时资源架构的稳定性。项目整体健康度良好，涵盖了重大的架构改革（对等代理持久化）以及针对工具可靠性和安装完整性的精细修复。

## 2. 发布版本
*过去 24 小时内无新版本发布。*

## 3. 项目进展
*   **文档与工具：** 推送了多项文档更新，以使项目上下文与 AI 代理标准保持一致（例如 #12084）。
*   **安全与运行时：** 提交了一项重要修复，修正了 macOS Seatbelt 正则表达式导致用户点文件（dotfiles）访问受阻的问题（#12150）。
*   **通道稳定性：** 对附件处理进行了改进，特别是限制了 WebP 到 PNG 的解码，以防止资源耗尽（#12180）。
*   **重构优化：** 发起了 PR #12179，用于清理 `deliver_file` 工具提示，移除了此前导致模型输出混乱的冲突指令。

## 4. 社区热点议题
*   **#10430: Gemini Speech-to-Speech Broker：** 这是一个长期存在的 PR，仍是架构层面的重点，代表了实时语音模型的集成。它标志着守护进程正转向成为多模态、低延迟音频交互的核心中介。
*   **#11589: Cost Limit Overrides：** 这是一个高风险、高回报的 PR，允许操作员在会话中途覆盖成本限制。这解决了当前“硬性”限制导致必须重启守护进程这一主要痛点。
*   **#11698: Prompt Cache Stability：** 该 PR 解决了人格文件渲染不稳定的问题，目前该问题会导致提示词缓存失效，并增加每次会话的 API token 开销。

## 5. Bug 与稳定性
*   **[严重] #12173: Lark Channel Panic：** 在 Markdown 分块处理过程中，当字节预算落在多字节字符中间时会发生 panic。**严重程度：S2/S3 (功能性)。**
*   **[高危] #12176: MCP Tool List Ordering：** HashMap 中非确定性的工具列表排序导致系统提示词发生变化，从而导致提示词缓存失效。**严重程度：S2 (性能)。**
*   **[中等] #12175: Misleading UI Copy：** 人格编辑器的文案误导性地指出通道配置更改无需重新加载守护进程。**严重程度：S3 (用户体验)。**
*   **[已解决] #12154：** 安装程序错误地显示了构建提交哈希而非语义版本号。（状态：已关闭/已修复）。

## 6. 功能请求与路线图信号
*   **统一文件管理：** 追踪议题 #11013 和新建的 #12181（基于 Web 的文档上传管理）证实，下一个重大版本将优先考虑集中式的文件摄入与交付系统。
*   **守护进程会话配额：** RFC #12130 和 #12132 表明，系统正推动针对不同传输类型（CLI/TUI/ACP）实现更精细的资源分配控制，这暗示了对多用户或多接口环境管理的需求提升。

## 7. 用户反馈总结
当前的痛点集中在**安装透明度**（版本报告错误）和 **UI/UX 脱节**（人格编辑器中的误导性文案）。用户还反馈称，Zerocode 中当前静态的会话管理模式（会话关闭/消失）是巨大的生产力障碍，开发人员目前正通过 PR #11727 着手解决该问题。

## 8. 待办事项观察
*   **#9597 (Make peer-agent turns durable)：** 自 7 月以来一直处于开放状态的高风险架构议题。虽然这对可靠的代理间通信至关重要，但由于其对核心运行时循环的影响，目前仍在进行中且需要大量评审。
*   **#10430 (Gemini Speech-to-Speech)：** 鉴于其规模（XL）以及实时音频中介的复杂性，这仍是一个重要的“搁置”项目，需要维护人员协调一致才能完成。

---

</details>

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*