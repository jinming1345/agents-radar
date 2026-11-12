# OpenClaw 生态日报 2026-11-12

> Issues: 169 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-11-12 01:38 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目摘要 – 2026-11-12

## 1. 今日概览
随着 2026.11.x 发布周期的活动激增，OpenClaw 目前正处于高强度的稳定化阶段。过去 24 小时内，项目有 500 个 PR 和 169 个 Issue 得到更新。项目组目前正面临巨大压力，需处理与 Gateway 内存管理、子代理（subagent）生命周期可靠性以及 SQLite 性能相关的回归问题。工作的重心已从功能交付转向防御性工程，特别是在进程生命周期安全和特定环境下的安装失败问题上。

## 2. 发布版本
*   **v2026.11.5-beta.2**：亮点包括通过边界归档读取（bounded archive reads）和分页历史记录改进了大型会话历史的浏览体验（#188450, #188483, #188557）。macOS 应用程序也进行了修复，确保已保存的密钥在重启后得以保留。

## 3. 项目进展
目前的开发工作重点严重偏向“大规模修复 Bug”，而非开发新功能。
*   **已解决/正在进行的清理**：投入了大量精力修复代理内存泄漏和目录监视膨胀问题（例如 #197445，防止文件系统 I/O 阻塞 Gateway）。
*   **代理可靠性**：诸如 #197335 之类的 PR 旨在解决关键问题，即委托子代理任务因作用域关闭而导致无法返回结果；#197427 则确保最终交付物在代理 RPC 认领后保留恢复托管权。
*   **环境对等性**：团队正在清理捆绑的会议插件（#197439），并改进针对安装失败的 CLI 诊断输出（#197436）。

## 4. 社区热门话题
*   **[#160959] Gateway 在处理大型插件时阻塞**：（81 条评论）这仍然是最关键的性能回归问题。用户报告称在捕获大型依赖树时，事件循环会阻塞数分钟。目前该问题被归类为“钻石龙虾”（最高优先级/影响）。
*   **[#166634] SQLite 回收失败**：（28 条评论）尽管该问题已关闭，但讨论凸显了 Gateway 在意外进程终止后 SQLite 状态管理的脆弱性。
*   **[#181432] ARM64 上的高内存 RSS**：（13 条评论）这是 2026.10.5 版本的一个重大回归，导致内存使用量从 300MB 激增至约 1.9GB，从而在资源受限的设备上引发崩溃循环。

## 5. Bug 与稳定性
*   **[#181432] 高内存占用 (P1)**：影响 Linux ARM64；出现内存峰值和 SQLite 事务超时。
*   **[#196199] Native Codex Helper 回归 (P1)**：Native helper 无法恢复父代理，导致用户自 2026.10.10 版本以来实际上无法进行助手交互。
*   **[#197083] 安装后 Doctor 失败**：一个新问题，11.3 更新导致系统处于部分完成状态。
*   **[#196512] Matrix E2EE 数据丢失**：在 Matrix 帐户启动期间重新加载可能会损坏加密存储，需要进行复杂的恢复程序。

## 6. 功能请求与路线图信号
*   **操作员控制**：市场对受阻进程的细粒度管理需求很高，例如针对子代理运行的“Doctor”恢复功能（#170562）以及针对“活跃内存”（Active Memory）的可配置回溯上限（#181774）。
*   **可见性**：用户正推动增强对成本和性能的可观测性，特别是要求能够查看使用成本（#181148）并更有效地标记/过滤会话（#181160）。
*   **预测**：未来的版本很可能会优先考虑“自我修复”功能，这一点从对更好的恢复工具（Doctor/Repair 实用程序）的大量请求中可以看出。

## 7. 用户反馈总结
社区表达了对“更新疲劳”的挫败感——即每次发布都会增加 Gateway 的停机时间，以及对控制界面（Control UI）中“用户体验摩擦”的不满，重要的叙述/上下文信息往往被隐藏或错误地折叠。macOS 和 Linux ARM64 用户体验到的摩擦最大，特别是在内存限制和区分大小写的文件系统 Bug 方面。

## 8. 待办事项观察
*   **[#101929] 上下文溢出评估器**：自 2026 年 7 月以来的长期存在的问题，涉及将计费使用量多计算了 2.3-2.6 倍。它仍然是需要维护者审查的“银色贝类”（高优先级）事项。
*   **[#145690] 子代理终止竞态条件**：一个导致丢弃用户消息的 P1 级 Bug；严重影响复杂任务链的可靠性，需要就如何处理临时插件生命周期做出产品层面的决策。

---

## 横向生态对比

### 1. 生态系统概览
开源 AI Agent 生态系统目前正处于“稳定与加固”阶段，正从实验性的原型设计转向稳健的生产级架构。各个项目普遍面临着相同的根本性挑战：状态管理的可靠性、多平台环境的一致性，以及自主执行带来的安全隐患。行业内存在一个明显的趋势：将单体核心拆解为基于插件的系统（如 MCP、通道管理器），以提升扩展性和用户自定义 Agent 行为的能力。

### 2. 活动对比
| 项目 | 近期 Issue | 近期 PR | 发布状态 | 健康度评分* |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 169 | 500 | v2026.11.5-beta.2 | 高压/危急 |
| **Hermes Agent** | ~20 | 50 | 稳定（无更新） | 安全导向 |
| **QwenPaw** | ~15 | 30+ | v2.3.0 | 快速迭代 |
| **ZeroClaw** | 5 | 50+ | Pre-v0.9.0 | 高速/开发中 |
| **IronClaw** | 0 | 0 | 停滞 | 休眠 |

*\*健康度评分反映了当前的 Bug 密度、迭代速度及维护者响应情况。*

### 3. OpenClaw 的地位
OpenClaw 是行业内的“参考实现”，其庞大的 PR 数量（500）和用户群足以证明这一点。
*   **优势：** 无与伦比的功能集和社区驱动的生态系统；它是插件开发者的首要目标。
*   **技术差异：** 虽然其他项目（如 QwenPaw）刚刚开始转向插件架构，但 OpenClaw 目前正致力于解决转型过程中固有的稳定性债务。它依赖于复杂的状态存储（SQLite）和高阶 Agent 委派，这使其资源消耗较高，但功能也更强大。
*   **社区规模：** OpenClaw 在日常活跃度和 Issue 频率方面远超同行，实际上充当了整个生态系统的“金丝雀”。

### 4. 共同的技术关注点
*   **插件/通道可靠性：** OpenClaw、QwenPaw 和 Hermes 都面临着启动竞态条件和插件状态管理方面的困扰。
*   **跨平台一致性：** Linux/ARM64 的内存泄漏问题（OpenClaw）和 Windows/IoT 的“路径未找到”问题（QwenPaw）凸显了跨环境部署的脆弱性。
*   **安全与凭据管理：** Hermes（正在进行“安全马拉松”）和 OpenClaw（密钥保存修复）都在优先处理 Agent 运行期间防止凭据泄露的问题。

### 5. 差异化分析
*   **OpenClaw：** 专注于**高规模复杂性**，处理深度任务链和复杂的子 Agent 生命周期。
*   **Hermes Agent：** 定位为**安全加固工作区**，优先考虑企业级安全性和类似 Shell 的用户体验。
*   **QwenPaw：** 以**本地优先（Local-First）**为特色，利用 Piccolo 模型来降低对云端的依赖和运营成本。
*   **ZeroClaw：** 专注于**运行时性能和 CI/CD 严谨性**，目标群体是需要审计能力和低延迟传输（基于 SSH）的开发者。

### 6. 社区动力与成熟度
*   **稳定/加固：** **OpenClaw** 正处于修复回归问题的巨大压力之下；它是目前最“成熟”但由于规模庞大，也是最“脆弱”的项目。
*   **快速迭代：** **QwenPaw** 和 **ZeroClaw** 处于高速发展期。QwenPaw 正在成功地利用插件实现架构现代化，而 ZeroClaw 正在为 0.9.0 这一重大里程碑做准备。
*   **安全导向：** **Hermes** 已暂停功能发布以解决技术债务，将长期稳定性置于新功能之上。

### 7. 趋势信号
*   **工具 vs. Agent 逻辑：** 市场对用于修复 Agent 状态的“诊断/修复”工具（OpenClaw）有迫切需求，这表明“自愈”是自主 Agent 的下一个前沿领域。
*   **可观测性缺口：** 用户对“黑盒” Agent 的挫败感日益增加。对成本透明度、执行追踪以及更好的 stderr/日志呈现的需求，在各项目中普遍存在。
*   **本地控制：** 向本地模型（QwenPaw）迁移的趋势表明，开发者正在放弃纯 API 驱动的工作流，以尽量减少成本和上下文溢出的计费错误。
*   **标准化需求：** MCP 和插件架构的广泛采用表明，“全能型” Agent 正在式微，取而代之的是高度可组合、模块化的工具集。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目摘要：2026-11-12

## 1. 今日概览
Hermes Agent 项目目前处于高强度的安全修复阶段。正如维护者 `c2h5oh` 提交的一系列补丁所示，项目正在进行一场“安全马拉松”。尽管新功能开发（通过 Plugin Hackathon）依然活跃，但过去 24 小时的核心工作集中在修复与身份验证、凭据泄露及环境变量暴露相关的关键漏洞。总体项目开发速度较快，目前有 50 个活跃的 PR，这表明尽管存在技术债务和桌面 Shell 的稳定性问题，项目开发生态依然稳健。

## 2. 版本发布
*   过去 24 小时内**没有新的版本发布**。

## 3. 项目进展
*   **Rootless Podman 支持：** PR [#72946](https://github.com/NousResearch/hermes-agent/pull/72946) 已成功合并，解决了长期存在的 UID 映射问题，此前该问题导致 Linux 用户在容器化环境中遇到文件权限冲突。
*   **持续的安全加固：** 一套重要的安全补丁（PR [#153645](https://github.com/NousResearch/hermes-agent/pull/153645), [#153644](https://github.com/NousResearch/hermes-agent/pull/153644), [#153642](https://github.com/NousResearch/hermes-agent/pull/153642), [#153846](https://github.com/NousResearch/hermes-agent/pull/153846)）目前处于审核/合并流程中，旨在修复身份验证中继、凭据作用域限制以及递归文件解码绕过等关键漏洞。

## 4. 社区热门话题
*   **[[Bug]: 远程桌面更新报告失败 (#106592)](https://github.com/NousResearch/hermes-agent/issues/106592)：** 该问题目前已有 10 条评论，是讨论度最高的话题。用户对后端显示“更新成功”与桌面端显示“状态陈旧”的报错信息之间的不一致感到不满，这表明系统需要更好地同步 systemd 单元状态与桌面 UI。
*   **Plugin Hackathon：** 多个 PR（如 [#154183](https://github.com/NousResearch/hermes-agent/pull/154183), [#154185](https://github.com/NousResearch/hermes-agent/pull/154185)）代表了社区推动扩展插件目录的强烈意愿，包括“Rookery”（一款 DAW）和本地化语言包等创意工具，这标志着 Hermes 正从单一的 Agent 向全方位的“工作空间”转型。

## 5. 漏洞与稳定性
*   **关键（安全）：** “安全马拉松”中发现多个问题（PR [#153682](https://github.com/NousResearch/hermes-agent/pull/153682), [#153681](https://github.com/NousResearch/hermes-agent/pull/153681)），涉及未经授权的 API 密钥暴露和文件系统访问绕过。修复程序目前正等待最终合并。
*   **高（稳定性）：** 问题 [#148498](https://github.com/NousResearch/hermes-agent/issues/148498) 详细描述了 macOS 上的严重回归问题：由于运行时探测期间 `hermes --version` 检查过慢，应用会错误触发设置循环并退出。
*   **中：** 问题 [#149907](https://github.com/NousResearch/hermes-agent/issues/149907) 涉及 Windows/MSIX 构建中控制台窗口闪烁的问题；这对 Windows 高级用户来说是一个虽小但持续存在的困扰。

## 6. 功能请求与路线图信号
*   **交互式 UI：** PR [#154186](https://github.com/NousResearch/hermes-agent/pull/154186) 引入了“后续跟进建议（follow-up chips）”，表明界面正向着更具引导性的对话式 UI 体验发展。
*   **安全与合规：** PR [#153197](https://github.com/NousResearch/hermes-agent/pull/153197)（密钥补救）展示了企业级安全方面的路线图优先级，确保泄露的凭据能被自动检测并封禁。

## 7. 用户反馈总结
用户在安装和更新方面感受到了“可靠性疲劳”，尤其是在 Linux（systemd 单元问题）和 macOS（启动探测问题）上。虽然安全补丁广受欢迎，但 CLI 和桌面 UI 在状态同步上的脱节导致了明显的阻力。Plugin Hackathon 的热度表明底层的 Agent 引擎深得人心，但用户迫切希望看到一个更精致的“Shell”外壳体验。

## 8. 待办事项关注
*   **[#145375](https://github.com/NousResearch/hermes-agent/issues/145375)：** 关于 Linux `hermes update` 在 systemd 单元权限方面的故障，该问题自 10 月下旬起一直悬而未决且进展缓慢。这是自动化部署环境的潜在阻碍。
*   **[#152307](https://github.com/NousResearch/hermes-agent/issues/152307)：** “澄清卡片（clarify card）”过期 Bug 影响了多配置文件设置，该问题触及会话状态管理，需要进行架构层面的审视。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目摘要：2026-11-12

## 1. 今日概览
QwenPaw 在发布 v2.3.0 版本后目前处于高强度的稳定阶段。开发势头依然强劲，核心重点在于通过插件（通道、MCP 和模型管理）实现架构的模块化，并修复 Windows 和 Linux 平台上的特定回归问题。项目非常活跃，正从单一的核心架构向更解耦、可扩展的生态系统转型。

## 2. 版本发布
*   **v2.3.0：** 引入了 **Piccolo Local Decision Models**（4B、9B、27B），作为用于审查和上下文压缩的专用工具。
    *   **亮点：** 支持运行时更新以及从 Hugging Face/ModelScope 下载。
    *   **建议：** 在工具审查任务中，建议使用 BF16 或 Q8_0 精度以获得最佳性能。

## 3. 项目进展
*   **基础设施修复：** 合并了多个关键 PR 以解决特定环境的问题，包括 [PR #8680](https://github.com/agentscope-ai/QwenPaw/pull/8680)（Windows 上飞书导入超时）和 [PR #8675](https://github.com/agentscope-ai/QwenPaw/pull/8675)（原生库加载错误）。
*   **发布管理：** [PR #8542](https://github.com/agentscope-ai/QwenPaw/pull/8542) 完成了 v2.3.0 版本的文档编写。
*   **沙盒集成：** [PR #1972](https://github.com/agentscope-ai/QwenPaw/pull/1972) 已达成结论，结束了将 OpenSandbox 作为云端执行后端的长期集成工作。

## 4. 社区热点
*   **[Issue #8669](https://github.com/agentscope-ai/QwenPaw/issues/8669)：** “通道插件启动竞争”。用户反馈 Windows 上飞书插件出现致命连接错误。这凸显了在新的插件架构中，需要更健壮的重试/状态初始化逻辑。
*   **[Issue #8538](https://github.com/agentscope-ai/QwenPaw/issues/8538)：** 使用多个工作区时 Matrix 通道插件激活失败。这表明插件的 10 秒共享启动窗口可能存在潜在瓶颈。
*   **[PR #8648, #8647, #8649](https://github.com/agentscope-ai/QwenPaw/pull/8648)：** 这些关于本地模型管理（GPU/MLX/控制台控制）的堆叠 PR 引起了极大的关注，标志着社区正转向更细粒度的硬件控制。

## 5. Bug 与稳定性
*   **关键（回归）：** [Issue #8669](https://github.com/agentscope-ai/QwenPaw/issues/8669)（通道连接失败）和 [Issue #8682](https://github.com/agentscope-ai/QwenPaw/issues/8682)（Linux worker 因缺少环境变量崩溃）。这些问题影响了核心可用性。
*   **高优先级：** [Issue #8674](https://github.com/agentscope-ai/QwenPaw/issues/8674)（错误日志导致磁盘空间占用）。正通过 [PR #8678](https://github.com/agentscope-ai/QwenPaw/pull/8678) 进行部分修复。
*   **低优先级：** [Issue #8663](https://github.com/agentscope-ai/QwenPaw/issues/8663)（Safari UI Bug）。消息队列中的操作按钮无法正常渲染。

## 6. 功能请求与路线图信号
*   **插件优先架构：** 最近的 PR（[#8426](https://github.com/agentscope-ai/QwenPaw/pull/8426), [#8469](https://github.com/agentscope-ai/QwenPaw/pull/8469), [#8499](https://github.com/agentscope-ai/QwenPaw/pull/8499)）趋势强烈暗示，下一版本将把第三方 Agent、MCP 和本地模型管理完全移入插件层。
*   **流式传输功能：** 预计会有更多通道支持流式传输，[PR #8409](https://github.com/agentscope-ai/QwenPaw/pull/8409)（QQ C2C 流式传输）证明了这一点。

## 7. 用户反馈总结
*   **痛点：** Windows 和 Linux 用户在转向官方通道插件后遇到了安装障碍。对于运行集成部署的用户来说，错误转储文件导致的“系统临时目录”膨胀是一个特别令人沮丧的问题。
*   **满意度：** 本地 Piccolo 模型的引入受到好评，因为它提供了一种在不依赖云端的情况下进行低成本工具调用和上下文处理的途径。

## 8. 待办事项观察
*   **[Issue #8616](https://github.com/agentscope-ai/QwenPaw/issues/8616)：** Windows 11 IoT LTSC “路径未找到”错误。这是一个平台特定的边缘案例，目前尚未得到具体修复，尽管用户反馈 2.2.2 版本运行正常。
*   **[PR #8236](https://github.com/agentscope-ai/QwenPaw/pull/8236)：** Ollama 上下文窗口大小设置。此 PR 自 10 月中旬以来一直处于审查状态，对于依赖本地模型的用户来说至关重要。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目摘要：2026-11-12

## 1. 今日概览
ZeroClaw 项目目前正处于高速开发阶段，过去 24 小时内共有 57 项内容更新，预示着项目正全力向即将发布的 v0.9.0 版本迈进。开发重点主要集中在优化运行时稳定性、扩展跨平台 CI 支持以及增强代理间（agent-to-agent）通信框架。项目整体健康状况良好，维护者正积极处理复杂的架构任务，但不断涌入的错误报告表明，社区正在对近期新增的功能进行严格的压力测试。

## 2. 版本发布
*过去 24 小时内无新版本发布。*

## 3. 项目进展
今日合并/关闭了 4 项内容，主要集中在维护和安全方面：
*   **依赖安全：** 合并了 [PR #12392](https://github.com/zeroclaw-labs/zeroclaw/pull/12392)，通过升级 `rustix` 修复了一个关键安全漏洞（`RUSTSEC-2026-0486`）。
*   **文档：** [PR #12380](https://github.com/zeroclaw-labs/zeroclaw/pull/12380) 将文档翻译版本锁定至 v0.9.0 发布候选版。
*   **依赖管理：** [PR #12215](https://github.com/zeroclaw-labs/zeroclaw/pull/12215) 作为冗余更新被关闭，该更新已被后续的一系列依赖升级覆盖。

## 4. 社区热点
*   **[PR #11869](https://github.com/zeroclaw-labs/zeroclaw/pull/11869) - SSH 传输复用：** 这是一个超大型 PR，因其旨在通过允许任务独占 SSH 传输来优化代理资源使用而备受关注，这对长时运行的工作流至关重要。
*   **[PR #10391](https://github.com/zeroclaw-labs/zeroclaw/pull/10391) - 代理工作空间/策略绑定：** 这是一个复杂且由来已久的架构级 PR，始终是确保代理在不同轮次间行为稳定的核心关注点。

## 5. Bug 与稳定性
*   **[Issue #8794](https://github.com/zeroclaw-labs/zeroclaw/issue/8794) (S1 - 阻塞)：** 用户报告在工作中断时停止代理会清除工具调用上下文，导致“遗忘”之前步骤。这是当前影响工作流的关键问题。
*   **[Issue #12391](https://github.com/zeroclaw-labs/zeroclaw/issue/12391) (S2 - 性能降级)：** 在 Windows 高负载期间，`runtime-trace.jsonl` 中出现大面积数据缺失，影响了审计能力。
*   **[Issue #12390](https://github.com/zeroclaw-labs/zeroclaw/issue/12390) (S3 - 功能回归)：** `shell` 工具在非零退出时吞掉了 `stderr`，导致代理无法排查执行失败的原因。
*   **[Issue #12396](https://github.com/zeroclaw-labs/zeroclaw/issue/12396) (配置)：** 发现了一些在架构重构后失效的“废弃”配置项（`keep_recent`、`collapse_tool_results`）。

## 6. 功能需求与路线图信号
*   **XMPP/Prosody 支持：** [Issue #9814](https://github.com/zeroclaw-labs/zeroclaw/issue/9814) 显示出对自托管、低资源消耗聊天集成的明确需求。
*   **CI 扩展：** [Issue #7461](https://github.com/zeroclaw-labs/zeroclaw/issue/7461) 请求建立跨平台 CI 矩阵（Windows/macOS），标志着向更好的跨平台质量保证迈进。
*   **可观测性：** [Issue #12397](https://github.com/zeroclaw-labs/zeroclaw/issue/12397) 请求明确区分定时任务（cron-job）的执行成功与实际代理任务的最终结果。

## 7. 用户反馈总结
用户目前正在拓展 ZeroClaw 代理间通信能力的边界，对新的 `sessions_prompt` 和 `sessions_message` 工具表现出极高兴趣（见 [PR #12258](https://github.com/zeroclaw-labs/zeroclaw/pull/12258)）。用户对代理故障的“不透明性”反复表示不满，特别是在 stderr 被静默吞掉以及守护进程重启/停止期间出现的状态丢失问题。

## 8. 待办事项观察
*   **[Issue #7461](https://github.com/zeroclaw-labs/zeroclaw/issue/7461)：** 该 CI 扩展请求自 6 月创建以来，对于专业级部署稳定性至关重要，目前仍是高优先级但尚未解决的问题。
*   **[PR #10391](https://github.com/zeroclaw-labs/zeroclaw/pull/10391)：** 自 8 月起，该 PR 一直是一项巨大的工程；其最终合并预计将成为代理可靠性方面的一个重大里程碑。

</details>

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*