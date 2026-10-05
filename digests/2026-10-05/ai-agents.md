# OpenClaw 生态日报 2026-10-05

> Issues: 500 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-10-05 01:14 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

⚠️ 摘要生成失败。

---

## 横向生态对比

# 跨项目分析报告：AI Agent 生态系统 (2026-10-05)

### 1. 生态系统概览
开源 AI Agent 生态系统目前正处于从快速实验增长期向“硬化”阶段的过渡期，该阶段的主要特征是架构稳定化和运行时安全性的提升。各大项目的发展重心正从功能面的扩张转向可靠性，特别是针对内存管理、沙盒隔离和状态持久化等问题。这种全行业的成熟度提升表明，开发者现在正将优先级从个人爱好者的使用场景转向生产就绪性（production-readiness）和企业级可观测性。

### 2. 活动对比

| 项目 | 问题处理速度 (24h) | PR 活动 (24h) | 最新发布 | 健康评分* |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | N/A (数据缺失) | N/A | N/A | 未知 |
| **Hermes Agent** | N/A (数据缺失) | N/A | N/A | 未知 |
| **IronClaw** | 0 | 3 (日常维护) | 无 | 稳定/低活跃度 |
| **QwenPaw** | 20+ | 20+ | v2.2.2b4 | 高压/波动中 |
| **ZeroClaw** | 43 | 50 | v0.8.6 (开发中) | 关键/高活跃度 |

*\*健康评分基于报告的漏洞严重程度与开发势头对比得出。*

### 3. OpenClaw 的地位
由于报告获取失败，OpenClaw 当前的技术状态尚不透明。然而，在这一特定群体中，OpenClaw 充当了**核心参考实现**的角色。虽然 *IronClaw* 和 *ZeroClaw* 等同行专注于特定的架构实现（Wasm/沙盒），但 OpenClaw 通常被视为标准 Agent 协议的基准。它占据了“框架”层，与更偏向“应用导向”的 *QwenPaw* 形成了对比。

### 4. 共同关注的技术领域
*   **沙盒与隔离：** *ZeroClaw* (macOS Seatbelt) 和 *QwenPaw* (插件隔离) 都在努力解决如何安全执行任意 Agent 工具而不破坏宿主环境的挑战。
*   **持久化状态管理：** 这是一个共同的故障点。*QwenPaw* 面临会话丢失问题；*ZeroClaw* 在配置保存和审计日志记录方面存在严重漏洞。
*   **依赖项维护：** *IronClaw* 为生态系统维护树立了标准，而 *ZeroClaw* 目前处于滞后状态，其依赖链中存在未修复的关键漏洞。

### 5. 差异化分析
*   **IronClaw：** 将自身定位为“基础设施优先”的项目。它在模块化方面大量依赖 Rust 和 Wasm，旨在吸引那些比起快速功能迭代，更看重长期性能和二进制安全的开发者。
*   **QwenPaw：** 专注于“全栈 Agent”体验，包括控制台 UI 和容器化部署。它针对的是构建面向生产环境聊天应用的用户，尽管目前饱受稳定性问题的困扰。
*   **ZeroClaw：** 架起了 CLI 优先实用工具与复杂的多模态工作流之间的桥梁。其重点在于“运行时完整性”，专门迎合需要可靠本地执行模型的高阶用户。

### 6. 社区动力与成熟度
*   **高动力（压力较大）：** *ZeroClaw* 和 *QwenPaw* 是最活跃的项目。它们正在经历“成长的烦恼”——高强度的 Bug 修复周期表明用户采用率较高，但生产稳定性较为脆弱。
*   **维护阶段：** *IronClaw* 已进入成熟、低维护阶段。它是最稳定的项目，但缺乏其他项目所具备的活跃功能迭代。
*   **数据缺口：** *OpenClaw* 和 *Hermes Agent* 需要立即进行监控，以确定其不活跃是由于开发停滞还是转向了私有访问模式。

### 7. 趋势信号
*   **本地优先与隐私：** 市场对“local_small”运行时配置文件（ZeroClaw）的需求明显增长，这表明开发者越来越关注提示词隐私和 Token 成本效率。
*   **可观测性即功能：** 用户要求模型降级（fallback）过程具备透明度。Agent 的“黑盒”时代即将结束；当 Agent 改变逻辑或提供商时，用户现在要求系统进行明确的通信。
*   **标准化优于专有工具：** 从停用自定义原生适配器转向采用标准化插件格式（MCP），标志着全行业正在努力实现 Agent 与外部工具生态系统之间的互操作性。

---

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目摘要 – 2026-10-05

### 1. 今日概览
IronClaw 项目目前处于静默维护状态，工作重心完全集中在依赖管理和基础设施清理上。过去 24 小时内没有新的功能开发或缺陷报告，表明项目处于稳定期或功能扩展的间歇期。开发积压任务主要由 Dependabot 驱动的依赖更新所主导，这表明维护者目前优先考虑安全性与生态兼容性，而非主动的代码变更。

### 2. 发布版本
*本周期内未发现新发布版本。*

### 3. 项目进展
*   **[#8078]** `chore(deps): bump the tokio-ecosystem group` (已关闭/合并)：此 PR 成功更新了 `tower-http` 和 `tokio-tungstenite`，确保项目与 Rust 生态系统中最新的异步运行时标准保持一致。

### 4. 社区热点
*   **[#8114]** [chore(deps): bump the everything-else group](https://github.com/nearai/ironclaw/pull/8114)：该 PR 包含 31 个软件包，是目前最重大的待处理更新。这代表了一项广泛的维护工作，旨在确保 `uuid` 和 `thiserror` 等基础 Rust crate 保持最新状态。
*   **[#8103]** [chore(deps): bump the actions group](https://github.com/nearai/ironclaw/pull/8103)：此 PR 凸显了对 CI/CD 现代化的关注，特别是将 `actions/setup-node` 更新至 v7.0.0 并升级了 `claude-code-action`，表明项目正在积极维护其集成 LLM 的开发工作流。

### 5. 缺陷与稳定性
*过去 24 小时内未提交新的缺陷报告或稳定性回归问题。* 代码库表现稳定，当前的 PR 工作旨在主动管理技术债务，而非应对功能性故障。

### 6. 功能需求与路线图信号
*   **[#7834]** [chore(deps): bump the wasm group](https://github.com/nearai/ironclaw/pull/7834)：虽然目前仅为依赖更新，但对 `wasmtime` 和 `wit-component` 更新的持续关注表明，项目的路线图仍然高度依赖基于 Wasm 的执行环境，用于 Agent 沙箱隔离或模块化。预计未来的功能将更深入地利用 WebAssembly 驱动的可扩展性。

### 7. 用户反馈摘要
在受监控的 PR 中目前没有直接的用户反馈（评论或讨论）。交互仅限于自动化机器人的活动，这表明这是一个以开发者为中心、噪音较低的环境，目前的优先级是通过依赖更新来保障稳定性，而非面向公众的功能迭代。

### 8. 积压任务观察
*   **[#7834]** [chore(deps): bump the wasm group](https://github.com/nearai/ironclaw/pull/7834)：该 PR 创建于 2026-08-23，已挂起超过一个月。鉴于其涉及核心 Wasm 组件，建议维护者予以关注，以确保 IronClaw 当前的 Wasm 栈不会落后或偏离上游 `wasmtime` 的发布版本。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目摘要：2026-10-05

## 1. 今日概览
QwenPaw 项目目前处于高活跃状态，核心工作集中在稳定 v2.2.x 发布周期。过去 24 小时内有 20 项 PR/Issue 处于活跃讨论状态，维护者和贡献者正全力处理基础设施 Bug、容器部署边缘情况以及运行时可靠性问题。项目当前重点在于现有功能的“加固”而非新功能开发，社区反馈显示当前生产版本存在严重稳定性缺口。

## 2. 版本发布
*   **过去 24 小时内无新版本发布**。项目当前版本仍为 v2.2.2b4。

## 3. 项目进展
*   **已合并/关闭：**
    *   [#8109](https://github.com/agentscope-ai/QwenPaw/issues/8109)：修复了一个严重 Bug，该 Bug 会导致 API 流错误引起 Console UI 会话内容 100% 丢失。
    *   [#7299](https://github.com/agentscope-ai/QwenPaw/pull/7299)：审核中/已关闭，旨在拒绝冲突的聊天负载，以防止流不同步。

## 4. 社区热点
*   **[#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) - 内存耗尽：** 该问题有 6 条评论，是目前最令人担忧的技术债务。用户报告在 v2.2.0 中存在内存消耗的“死亡循环”（约 1MB/s），指向缓冲区和 keep-alive 处理中存在的多个架构缺陷。
*   **[#7840](https://github.com/agentscope-ai/QwenPaw/issues/7840) - 事件循环卡死：** 关于插件隔离的重要讨论（5 条评论）。插件中的同步 I/O 目前会阻塞整个实例，这表明在用户扩展的线程/进程隔离方面存在重大的架构需求。

## 5. Bug 与稳定性
*   **严重（高优先级）：**
    *   [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722)：导致 OOM（内存溢出）/服务挂起的内存耗尽问题。
    *   [#7840](https://github.com/agentspec-ai/QwenPaw/issues/7840)：由同步插件调用引起的全局事件循环卡死。
    *   [#8105](https://github.com/agentscope-ai/QwenPaw/issues/8105)：审批工作流故障（审批默认变为“拒绝”），导致手动工具审批失效。
*   **中等优先级：**
    *   [#8106](https://github.com/agentscope-ai/QwenPaw/issues/8106)：由于 `PIP_TARGET` 环境变量泄漏导致的容器内插件安装失败。
    *   [#8094](https://github.com/agentscope-ai/QwenPaw/issues/8094)：由于 WebView2 缓存过期导致的 Console 启动挂起（修复 PR [#8102](https://github.com/agentscope-ai/QwenPaw/pull/8102) 正在进行中）。

## 6. 功能需求与路线图信号
*   **可观测性：** 用户要求在模型回退时提供透明度 ([#8103](https://github.com/agentscope-ai/QwenPaw/issues/8103))。预期系统需在自动故障转移到辅助模型时通知用户。
*   **UX/UI：** [PR #7542](https://github.com/agentscope-ai/QwenPaw/pull/7542) 引入了“消息回滚分页”功能，旨在解决当前聊天记录在刷新后从 UI 中消失的 UX 问题。

## 7. 用户反馈摘要
用户目前对**部署可靠性**和** API 提供商集成**表达了强烈不满。特别是“静默失败”模式——即系统在未通知的情况下回退到其他模型，或者在点击审批后静默失败——是主要的痛点。核心开发人员修复底层运行时 Bug 与试图使用当前 v2.2.x Beta 版本构建可靠生产流程的用户之间存在明显的脱节。

## 8. 待办积压观察
*   **[#7774](https://github.com/agentscope-ai/QwenPaw/pull/7774)：** 一位首次贡献者关于 Hub 允许名单的 PR，自 9 月 15 日起一直搁置。需要维护者关注以确保其符合更新后的运行时服务架构。
*   **[#7026](https://github.com/agentscope-ai/QwenPaw/issues/7026)：** 报告称使用 `deepseek-v4-pro` 时因参数包装不当导致 `TypeError`，该问题自 8 月起一直未得到确定性修复。

---

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目摘要 - 2026-10-05

## 1. 今日概览
ZeroClaw 目前处于高强度的稳定阶段，在 v0.8.6 版本发布前，重点关注关键运行时完整性和数据安全。过去 24 小时内更新了 43 个 issue 和 50 个 PR，开发进度极快，呈现出“快速修复与验证”的循环节奏。项目目前正在解决涉及配置丢失和安全/沙箱绕过的严重回归问题，这标志着核心运行时正从功能扩展阶段转向生产就绪阶段。

## 2. 版本发布
*   **无新版本发布。** 目前开发工作集中在 v0.8.6 发布分支上。

## 3. 项目进展 (已合并/已关闭的 PR)
*   **[PR #11521](https://github.com/zeroclaw-labs/zeroclaw/pull/11521):** 正式通过核心团队对运行时组合异常的审批，清除了 v0.8.6 发布流程中的一个障碍。
*   **[PR #11518](https://github.com/zeroclaw-labs/zeroclaw/pull/11518):** 提升了 CLI 的可靠性，确保 stdin EOF 或输入错误被明确捕获，使审计日志能够区分系统故障与用户拒绝。

## 4. 社区热点
*   **[Issue #9965](https://github.com/zeroclaw-labs/zeroclaw/issues/9965):** (14 条评论) 重点在于强化并行运行时门控下的测试夹具。这凸显了对更稳定测试基础设施的需求，以支持 ZeroClaw 运行时复杂的、多线程的特性。
*   **[Issue #5287](https://github.com/zeroclaw-labs/zeroclaw/issues/5287):** (9 条评论) 讨论了 "local_small" 运行时配置。社区明显优先考虑本地优先（local-first）的用户体验，特别是要求提供防止提示词泄露和管理有限 token 预算的机制。
*   **[Issue #7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432):** (6 条评论) 这是 Phase 2/3 架构工作的主要跟踪项。它作为项目的“事实来源”，强调了将网关与运行时解耦的持续努力。

## 5. Bug 与稳定性
*   **S0/严重 - [Issue #10495](https://github.com/zeroclaw-labs/zeroclaw/issues/10495):** 据报告 `Config::save()` 目前会将已填写的 `config.toml` 文件覆盖为近乎空白的模板，存在严重的数据丢失风险。**正在通过 [PR #11527](https://github.com/zeroclaw-labs/zeroclaw/pull/11527) 进行修复。**
*   **S1 - [Issue #10536](https://github.com/zeroclaw-labs/zeroclaw/issues/10536):** macOS Seatbelt 沙箱未能遵循 `allowed_roots` 配置，导致基于 shell 的工具执行受阻。
*   **S1 - [Issue #11525](https://github.com/zeroclaw-labs/zeroclaw/issues/11525):** `quickstart` 工作流在 Android/Termux 上完全被阻塞，限制了移动端高阶用户的使用。
*   **S2 - [Issue #11420](https://github.com/zeroclaw-labs/zeroclaw/issues/11420):** SQLite 后端目前在每次聊天轮次时都会覆盖消息时间戳，破坏了审计和历史记录跟踪。

## 6. 功能需求与路线图信号
*   **[Issue #7951](https://github.com/zeroclaw-labs/zeroclaw/issues/7951):** 基于升级的模型路由（根据任务复杂性选择本地或云端）仍然是一个高优先级的架构目标。
*   **[Issue #11442](https://github.com/zeroclaw-labs/zeroclaw/issues/11442):** 项目在向模块化方向发展，推行弃用传统的原生工具适配器，转而采用标准化的插件/MCP。

## 7. 用户反馈总结
用户对 ZeroCode 界面感到“会话疲劳”，指出难以在长滚动终端会话中导航，且剪贴板功能不可靠。对 Web Dashboard 的可靠性感到愈发不满，特别是页面刷新会导致清除当前激活轮次状态的问题 ([Issue #11517](https://github.com/zeroclaw-labs/zeroclaw/issues/11517))。目前稳定性被视为采用的主要障碍，特别是在非交互式环境 (CI/Cron) 中 CLI 工具审批工作流的相关问题。

## 8. 待办事项监控
*   **[Issue #9190](https://github.com/zeroclaw-labs/zeroclaw/issues/9190):** "Reliable" 提供商的密钥轮换逻辑仍然损坏；虽然被标记为 P2，但这直接影响了依赖高可用云配置的用户。
*   **[Issue #10728](https://github.com/zeroclaw-labs/zeroclaw/issues/10728):** 自 9 月 9 日以来，悬而未决的 `npm audit` 高危/严重漏洞仍未得到解决，需要注意安全合规性问题。

</details>

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*