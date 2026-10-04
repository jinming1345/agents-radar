# OpenClaw 生态日报 2026-10-04

> Issues: 500 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-10-04 01:58 UTC

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

## 跨项目分析：个人 AI Agent 生态系统 (2026-10-04)

### 1. 生态系统概览
开源 AI Agent 领域目前正处于“稳定性紧缩”的高压期，各项目正从实验性原型转向生产级工具。纵观整个生态，共同的痛点包括：持久化暂存空间（scratch space）管理、跨平台环境差异（drift），以及在复杂模型驱动的工作流中维持 UI/UX 状态的挑战。随着 Hermes、ZeroClaw 和 QwenPaw 等项目的规模化发展，社区焦点已从功能激增转向加固核心架构，特别是在安全隔离、IPC 稳定性以及多模态输入可靠性方面。

### 2. 活动对比
| 项目 | 问题数（近期） | PR 数（活跃/已合并） | 发布状态 | 健康评分 |
| :--- | :--- | :--- | :--- | :--- |
| **Hermes Agent** | 高 | 100+ | 稳定/维护中 | 7/10 (压力较大) |
| **IronClaw** | 低 | 0 | 无 | 4/10 (停滞) |
| **QwenPaw** | 中等 | 11 | 无 | 8/10 (稳健/活跃) |
| **ZeroClaw** | 高 | 100+ | v0.8.6/0.9.0 筹备中 | 9/10 (高迭代速度) |

*注：“健康评分”反映了开发势头和响应能力，而非技术债务。*

### 3. OpenClaw 的地位
*数据说明：由于 OpenClaw 的自动化摘要生成失败，其具体指标无法获取。* 
从历史来看，OpenClaw 一直是该生态系统的参考架构。虽然 Hermes 和 ZeroClaw 等项目目前正忙于解决本地 IPC 和状态管理方面的“救火”工作，但 OpenClaw 通常作为稳定的基础存在。与 QwenPaw 的快速功能追赶或 ZeroClaw 的深度重构相比，OpenClaw 定位为底层标准；然而，它在今日摘要中的缺席，表明该项目可能已转入私有开发阶段，或者维护者的优先级发生了转移。

### 4. 共享技术关注领域
*   **持久化暂存空间：** **Hermes Agent** (Issue #132401) 和 **ZeroClaw** 都在努力平衡“为节省存储空间而进行的积极清理”与“长流程工作流可能导致灾难性数据丢失”之间的矛盾。
*   **多模态可靠性：** **QwenPaw** 和 **ZeroClaw** 均在积极解决图像输入处理以及在请求提供商 API 时出现的静默截断问题。
*   **环境一致性：** 管理“本地开发”体验依然是各项目面临的共同难题，**IronClaw** (macOS 问题) 和 **Hermes** (Windows/Linux 差异) 凸显了在不同开发者机器上部署 Agent 的摩擦成本。

### 5. 差异化分析
*   **ZeroClaw：** 专注于高性能基础设施；优先考虑网关分离和 IPC 加固，面向资深用户/开发者。
*   **Hermes Agent：** 主要定位为功能完备的生产力工具；专注于面向用户的集成（WhatsApp/Telegram）和专业工作流自动化。
*   **QwenPaw：** 侧重于可扩展性和模型提供商的灵活性；该项目在模型切换（如支持 GPT-6 等）方面最符合“开箱即用”的标准。
*   **IronClaw：** 目前定位为轻量级、开发者导向的工具；成熟度/活跃度显著低于其他项目。

### 6. 社区势头与成熟度
*   **高速度（迭代中）：** **ZeroClaw** 和 **Hermes Agent** 处于快速迭代期。它们正处于“高压一线”，特征是大量的问题反馈和激进的 PR 合并，表明它们是生产级反馈的主要目标。
*   **稳定/稳健：** **QwenPaw** 显示出最均衡的发展势头——在保持快速进展的同时，没有出现其他高速度项目中常见的灾难性不稳定。
*   **停滞：** **IronClaw** 目前处于低谷期，可能预示着战略性暂停，或核心维护团队的开发者兴趣流失。

### 7. 趋势信号
*   **网关架构：** 从 Agent 网关与 UI 解耦的趋势非常明显（例如 **ZeroClaw** 的独立 IPC 工作），这表明 Agent 正在成为基础设施级的工具，而非简单的应用程序。
*   **成本感知路由：** 行业正在超越“只选最强模型”的阶段，转向“成本感知路由”（例如 **ZeroClaw** 的“努力程度感知路由”），这表明开发者正优先考虑大规模 Agent 部署的经济效率。
*   **“状态持久化”之墙：** 用户不再满足于短暂的 Agent；生态系统中投票最高的问题大多与聊天记录、暂存空间和会话连续性有关。一个 Agent 项目的成熟度现在更多取决于其“记忆力”，而非推理能力。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest: 2026-10-04

## 1. Today's Overview
The Hermes Agent project remains in a state of high-intensity maintenance, with 100 total items updated across issues and PRs in the last 24 hours. Development is currently heavily focused on addressing critical stability regressions, particularly concerning environment management, scratch-space persistence, and cross-platform (Windows/Linux) installation integrity. Despite the high volume of bug reports, the project is exhibiting active triage and rapid patching from maintainers, indicating a healthy but currently "under fire" development cycle.

## 2. Releases
*   **No new releases were published on 2026-10-04.**

## 3. Project Progress
*   **WhatsApp Multi-Profile:** Fixes were merged/closed for the host multiplexer, ensuring that paired WhatsApp sessions are served per-profile rather than only for the gateway-launching profile ([PR #132518](https://github.com/NousResearch/hermes-agent/pull/132518), [PR #122758](https://github.com/NousResearch/hermes-agent/pull/122758)).
*   **Modularization:** Home Assistant functionality has been successfully extracted from the core repository into an official catalog plugin, with automated migration for existing user profiles ([PR #132469](https://github.com/NousResearch/hermes-agent/pull/132469)).
*   **Telegram UX:** A fix was merged to preserve original prompt text during approval resolutions, preventing context loss in chat history ([PR #129161](https://github.com/NousResearch/hermes-agent/pull/129161)).

## 4. Community Hot Topics
*   **[#132401] Scratch Pruning (14 comments):** Users are reporting that the 24h idle prune feature silently deletes multi-day work parked in the `TMPDIR` scratch space. This is currently the most contentious issue due to potential data loss ([Issue #132401](https://github.com/NousResearch/hermes-agent/issues/132401)).
*   **[#128468] Desktop Streaming Glitches (12 comments):** Persistent reports of duplicated message rendering and scroll-jumping in the Desktop UI continue to frustrate users ([Issue #128468](https://github.com/NousResearch/hermes-agent/issues/128468)).
*   **[#122425] Managed Env Drift (12 comments):** Discrepancies between the main checkout and workspace environments during updates remain a high-priority concern for users managing complex deployments ([Issue #122425](https://github.com/NousResearch/hermes-agent/issues/122425)).

## 5. Bugs & Stability
*   **Critical (P0/P1):**
    *   **Scratch Data Loss:** Auto-pruning without a safety marker ([Issue #132401](https://github.com/NousResearch/hermes-agent/issues/132401)).
    *   **Guardian Crashes:** Smart-approval failures on event-loop threads in Desktop sessions ([Issue #132431](https://github.com/NousResearch/hermes-agent/issues/131375)).
*   **High (P2/P3):**
    *   **Auth/API:** Bedrock token support missing in auxiliary tools ([Issue #29309](https://github.com/NousResearch/hermes-agent/issues/29309)).
    *   **Windows/OS Shutdown:** Gateway fails to perform graceful shutdown, resulting in "unclean exit" logs ([Issue #132206](https://github.com/NousResearch/hermes-agent/issues/132206)).
    *   **SSH Connectivity:** Fixed 15s timeout causing failures on unstable links ([Issue #132508](https://github.com/NousResearch/hermes-agent/issues/132508)).

## 6. Feature Requests & Roadmap Signals
*   **Execution Summary:** PR [#106573](https://github.com/NousResearch/hermes-agent/pull/106573) proposes collapsing execution trajectories into summary nodes to clean up UI clutter.
*   **Browser-based Desktop:** PR [#93508](https://github.com/NousResearch/hermes-agent/pull/93508) is a significant architectural move to serve the full Desktop renderer in a browser, potentially decoupling the agent from the local Electron client.
*   **Cost Optimization:** Feature request to store large tool results externally and only fetch them on-demand ([Issue #132184](https://github.com/NousResearch/hermes-agent/issues/132184)).

## 7. User Feedback Summary
*   **Pain Points:** Users are heavily impacted by "silent" failures—specifically concerning environment drift, unexpected scratch cleanup, and authentication spray against local models.
*   **Use Cases:** There is a clear subset of professional power users (engineers/business owners) using Hermes as a primary productivity tool, which heightens the sensitivity to stability regressions that interrupt long-running workflows.

## 8. Backlog Watch
*   **[#29309](https://github.com/NousResearch/hermes-agent/issues/29309):** The Bedrock authentication parity issue has been open since May 2026; it is increasingly problematic as the agent ecosystem grows.
*   **[#106592](https://github.com/NousResearch/hermes-agent/issues/106592):** False-negative update reporting for remote Linux backends remains a point of confusion for remote users.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目摘要 - 2026-10-04

### 1. 今日概览
IronClaw 项目目前处于平稳开发阶段，过去 24 小时内活动较少。代码库没有新的发布或合并请求（Pull Request）活动，这表明团队目前正专注于内部稳定性，或是开发周期进入了暂时的停滞期。当前的工作重点在于修复一个影响 macOS 本地开发工作流的环境特定问题。总体而言，在本报告周期内，项目状态保持稳定但进展缓慢。

### 2. 发布版本
*无。*

### 3. 项目进展
*过去 24 小时内没有合并或关闭任何 Pull Request。*

### 4. 社区热点
*   **[Issue #8122](https://github.com/nearai/ironclaw/issues/8122): `ironclaw serve` 在 macOS (`local-dev` 配置) 上报 `BackendUnavailable` 错误。**
    *   **分析：** 这是今日唯一的活跃社区讨论。报告者指出，尽管 `ironclaw doctor` 的所有检查项均已通过，但 `web-app` 扩展程序仍启动失败。其根本需求是为在 Apple Silicon 上运行本地实例的开发者改进跨平台环境处理能力。

### 5. Bug 与稳定性
*   **[Issue #8122](https://github.com/nearai/ironclaw/issues/8122):** `ironclaw serve` 在 macOS 上针对 `web-app` 扩展程序报 `BackendUnavailable` 错误。
    *   **严重程度：** 中等。该问题阻碍了开发者使用对扩展开发至关重要的 `local-dev` 配置，但似乎不影响生产环境构建。
    *   **修复状态：** 截至今日尚未提交修复的 PR。

### 6. 功能需求与路线图信号
*   *今日无报告。* 当前信号显示，首要任务仍是稳定现有的 `local-dev` 环境，而非引入新功能。

### 7. 用户反馈摘要
今日收到的反馈表明，macOS 上的开发者入职流程可能存在阻碍。用户对 `local-dev` 配置表示不满，尽管项目尝试通过 `ironclaw doctor` 来验证环境，但该配置似乎仍十分脆弱。能否成功搭建本地开发环境是当前贡献者的主要痛点。

### 8. 待办事项跟踪
*   **[Issue #8122](https://github.com/nearai/ironclaw/issues/8122):** 虽然该问题是昨天才提出的，但需要维护者予以紧急关注，因为它阻塞了使用 macOS 的贡献者的本地开发工作。在没有临时解决方案的情况下，开发者目前无法在本地测试 `web-app` 扩展的变更。

---

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

## QwenPaw 项目摘要：2026-10-04

### 1. 今日概览
QwenPaw 项目开发活动显著激增，过去 24 小时内有 11 个 PR 处于开启状态，8 个 Issue 得到更新。贡献者的工作重心主要集中在：稳定 Agent 运行时、修复多模态输入路由，以及解决 UI 会话状态持久化问题。总体而言，项目健康状况良好，维护者对关键 Bug 的响应十分迅速，但高频次涌入的 Bug 报告表明，项目亟需加强回归测试。

### 2. 版本发布
*本周期内未发现新版本发布。*

### 3. 项目进展
*虽然今日没有合并任何 PR，但通过 11 个待审核的活跃 PR 取得了重大进展：*
*   **Agent 可靠性：** [PR #8100](https://github.com/agentscope-ai/QwenPaw/pull/8100) 旨在通过将运行时媒体能力与已解析的元数据对齐，来修复图像支持问题。
*   **服务提供商兼容性：** [PR #8090](https://github.com/agentscope-ai/QwenPaw/pull/8090) 通过更新 Token 限制参数的识别方式，解决了 GPT-6 连接失败的问题。
*   **UI/UX 改进：** [PR #8091](https://github.com/agentscope-ai/QwenPaw/pull/8091) 确保侧边栏能准确跟踪会话历史，而 [PR #8086](https://github.com/agentscope-ai/QwenPaw/pull/8086) 则优化了移动端设置的导航体验。

### 4. 社区热点话题
*   **[Issue #7884](https://github.com/agentscope-ai/QwenPaw/issues/7884)：历史记录加载问题。** 该 Issue 拥有 8 条评论，是目前讨论最热的话题。用户对前端刷新后无法加载完整聊天记录感到困扰，这突显了对更好的数据持久化和缓存策略的迫切需求。
*   **[Issue #7661](https://github.com/agentscope-ai/QwenPaw/issues/7661)：会话创建 Bug。** 该 Issue 拥有 5 条评论，反映了“新建任务/新建会话”逻辑中的混乱，用户期望保持对话的连续性，但实际得到的却是碎片化的会话。

### 5. Bug 与稳定性
*   **关键 (High)：** [Issue #8092](https://github.com/agentscope-ai/QwenPaw/issues/8092) — 来自阿里系网关的内容审查误报导致“对话被终止 (turn killed)”且没有重试机制，直接中断了对话流程。
*   **高 (High)：** [Issue #8094](https://github.com/agentscope-ai/QwenPaw/issues/8094) — 过期的 WebView2 缓存阻塞了控制台启动，且缺乏错误恢复机制。
*   **高 (High)：** [Issue #8088](https://github.com/agentscope-ai/QwenPaw/issues/8088) — 图像输入陷入低效的裁剪循环，导致静默失败。
*   **中 (Moderate)：** [Issue #8074](https://github.com/agentscope-ai/QwenPaw/issues/8074) — 由于模型名称白名单过时，OpenAI 提供商无法支持 GPT-6 模型（[PR #8090](https://github.com/agentscope-ai/QwenPaw/pull/8090) 正在修复中）。

### 6. 功能请求与路线图信号
*   **Matrix 频道增强：** [Issue #7535](https://github.com/agentscope-ai/QwenPaw/issues/7535)（已关闭）预示着项目正向 Element 特定兼容性（OIDC/MAS 登录）靠拢，这在 Matrix 用户群中仍是高关注领域。
*   **上下文透明度：** [PR #7004](https://github.com/agentscope-ai/QwenPaw/pull/7004) 提议持久化存储父子 Agent 的关联关系，暗示未来版本将向更复杂的 Agent 编排工作流演进。

### 7. 用户反馈总结
用户目前对**会话管理**和**多模态可靠性**表示不满。反馈指出，尽管系统能力强大，但 UI/UX 层在网络波动或页面刷新时经常无法维持状态（历史记录、会话连续性）。当网关或模型提供商遇到瞬时错误时，缺乏“重试”机制是一个核心痛点，导致用户流失。

### 8. 待办事项关注
*   **[Issue #7661](https://github.com/agentscope-ai/QwenPaw/issues/7661)：** 这个关于会话创建的 Bug 自 9 月 10 日起就已开启。它严重影响了核心可用性，需要紧急解决以提升新用户的首次使用体验。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目简报 - 2026-10-04

## 1. 今日概览
ZeroClaw 仓库目前保持着高强度的工程开发节奏，重点在于推动 `ZeroCode` 接口的成熟化，并为 v0.8.6 和 v0.9.0 发布周期稳定运行环境。过去 24 小时内，Issue 和 PR 总计更新了 100 次，团队的核心精力集中于修复回归漏洞以及强化 IPC/Gateway 架构。项目目前处于高强度冲刺阶段，优先保障本地智能体工作空间的结构完整性与用户体验提升。

## 2. 发布记录
*   **无。**（过去 24 小时内无新版本发布）。

## 3. 项目进展
*   **已关闭/已合并的 PR：** 工作重点在于偿还维护技术债和修复 Bug。
    *   **[#7108](https://github.com/zeroclaw-labs/zeroclaw/issues/7108)：** 优化了缓存 Rust 构建，缩短了 CI 关键路径的耗时。
    *   **[#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734)：** 缓解了在 Windows 上使用 nextest 测试时出现的 `RpcDispatcher` 栈溢出问题。
    *   **[#11387](https://github.com/zeroclaw-labs/zeroclaw/issues/11387)：** 修复了 `zerocode` 忽略启动目录的回归问题。
    *   **[#10701](https://github.com/zeroclaw-labs/zeroclaw/issues/10701)：** 修复了图像附件错误导致历史缓存前缀失效的问题。

## 4. 社区热点
*   **[#9965](https://github.com/zeroclaw-labs/zeroclaw/issues/9965)：强化运行时测试夹具 (13 条评论)** – 这是目前技术讨论最活跃的话题，核心在于稳定并行运行时门限下写入可执行 shim 文件的测试夹具。
*   **[#7108](https://github.com/zeroclaw-labs/zeroclaw/issues/7108)：CI/Rust 构建性能 (9 条评论)** – 强调了目前 CI 周期长达 15-20 分钟的困境，反映出随代码库增长提升构建效率的迫切需求。
*   **[#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734)：RPC 栈溢出 (8 条评论)** – 针对 Windows 上关键的运行时不稳定问题，强调了项目对跨平台可靠性的追求。

## 5. Bug 与稳定性
*   **[#11478](https://github.com/zeroclaw-labs/zeroclaw/issues/11478) (S1)：** 超过 64KB 的图像在请求提供商时会被静默截断。风险级别高，影响多模态智能体的使用。
*   **[#10536](https://github.com/zeroclaw-labs/zeroclaw/issues/10536) (S1)：** macOS 的 Seatbelt 策略忽略了 `allowed_roots`，导致 Shell 命令被阻止。
*   **[#11239](https://github.com/zeroclaw-labs/zeroclaw/issues/11239) (S0)：** 潜在的数据丢失/安全风险，属于个人的会话信息可能泄露到共享内存区域。
*   **[#11420](https://github.com/zeroclaw-labs/zeroclaw/issues/11420) (S2)：** SQLite 会话后端在每次交互时都会重写 `created_at` 字段，导致单条消息的计时丢失。

## 6. 功能需求与路线图信号
*   **[#11516](https://github.com/zeroclaw-labs/zeroclaw/pull/11516)：基于算力成本的路由。** 这是一项重大改进，预计将在下个版本发布，允许用户通过在本地和云端模型之间分配请求来平衡成本与延迟。
*   **[#11002](https://github.com/zeroclaw-labs/zeroclaw/issues/11002)：** 将 `zeroclaw-gw` 作为独立 IPC 客户端发布。这是 v0.9.0 网关分离工作的关键架构里程碑。
*   **[#8310](https://github.com/zeroclaw-labs/zeroclaw/issues/8310)：Schema V4。** 计划中的重大破坏性变更，旨在清理弃用的配置项。

## 7. 用户反馈总结
当前用户反馈主要集中在 `ZeroCode` 的体验痛点上。用户报告了“复制”按钮失效的问题 ([#11418](https://github.com/zeroclaw-labs/zeroclaw/issues/11418))、仪表盘中对活动运行时上下文的困惑 ([#8383](https://github.com/zeroclaw-labs/zeroclaw/issues/8383))，以及会话状态可见性方面的困难。这传递出一个清晰的信号：尽管核心引擎功能强大，但 UI/CLI 的“最后一公里”仍需显著打磨，才能达到日常生产环境使用的稳定标准。

## 8. 待办事项观察
*   **[#9799](https://github.com/zeroclaw-labs/zeroclaw/issues/9799)：** 高优先级议题，涉及瞬态守护进程导致的多核 CPU 持续高占用（持续 17 小时）。需要深入调查以防止电池消耗和用户性能下降。
*   **[#6105](https://github.com/zeroclaw-labs/zeroclaw/issues/6105)：** 智能体内部缺乏 cron 任务的上下文支持，这仍然是自动化工作流中的一个遗留痛点。

</details>

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*