# OpenClaw 生态日报 2026-10-07

> Issues: 500 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-10-07 01:48 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目摘要：2026-10-07

## 1. 今日概览
自 2026.9.5 版本发布以来，OpenClaw 正处于一段极度不稳定的时期，其特征是大量的“P0/P1”级稳定性报告以及难以维持的性能表现。过去 24 小时内，代码仓库有 500 个问题和 500 个 PR 进行了更新，项目正处于一种快速、被动的维护状态。虽然开发者活跃度很高，主要集中在解决内存泄漏、启动挂起和迁移失败等问题，但项目的稳定性目前承受着巨大压力，特别是在网关初始化和插件生命周期管理方面。

## 2. 版本发布
*   **今日未发布新版本。** 项目目前主要集中在 2026.9.5 和 2026.9.6 版本的发布后修复工作。

## 3. 项目进度
今日工作重点在于关键的热修复，而非新功能的扩展：
*   **[#166360](https://github.com/openclaw/openclaw/issues/166360)：** 修复了 E2E 测试固件中因缺失 node-worker 能力而导致的回归问题，该问题曾引发 `main` 分支测试套件失败。
*   **[#166381](https://github.com/openclaw/openclaw/pull/166381)：** 增强了 Git 内容读取的日志记录，使运维人员能够区分工作负载阻塞和命令超时。
*   **[#166108](https://github.com/openclaw/openclaw/pull/166108)：** 解决了因临时 schema-owner 争用导致的启动中止问题。
*   **[#166104](https://github.com/openclaw/openclaw/pull/166104)：** 优化了在繁忙的 Bun 环境中的堆检查性能，以防止不必要的序列化停顿。

## 4. 社区热点
*   **[#44925](https://github.com/openclaw/openclaw/issues/44925)：** 子代理 (Subagent) 完成静默/丢失问题。这是讨论最激烈的问题（31 条评论），揭示了任务编排中的关键故障：子代理在没有重试或通知的情况下消失。
*   **[#149538](https://github.com/openclaw/openclaw/issues/149538)：** 网关健康探针资源耗尽。这是一个高严重性问题（24 条评论），600+ 个代理集群导致事件循环饥饿，进而导致“就绪”状态无法恢复。
*   **[#159662](https://github.com/openclaw/openclaw/issues/159662)：** `prepared-model-catalog.worker.js` 中的无界内存泄漏。用户报告无论工作负载如何，每小时内存增长达 4-5 GB，表明存在严重的底层架构泄漏。

## 5. Bug 与稳定性
项目目前正忙于处理几个 P0/P1 级的“用户体验发布阻碍”回归问题：
*   **[#152981](https://github.com/openclaw/openclaw/issues/152981) (P0)：** Sidecar 初始化时会出现约 17 分钟的启动挂起。
*   **[#155191](https://github.com/openclaw/openclaw/issues/155191) (P0)：** 2026.9.5 版本中出现大规模原生内存泄漏（每 30 秒 1 GiB）。
*   **[#159912](https://github.com/openclaw/openclaw/issues/159912) (P1)：** 后台内存回调保留了已停用的插件注册表，导致长期的索引失败。
*   **[#165617](https://github.com/openclaw/openclaw/issues/165617) (P0)：** 在 ZFS 挂载的共享存储（QNAP）上 FS-safe 文件移动失败，导致部分 NAS 用户无法正常更新，产品近乎“变砖”。

## 6. 功能需求与路线图信号
*   **[#56349](https://github.com/openclaw/openclaw/issues/56349)：** 为注重安全的用户实现不可绕过的出站策略强制执行。
*   **[#23451](https://github.com/openclaw/openclaw/issues/23451)：** 工具级确认门控。鉴于目前对可靠性和状态完整性的关注，人工验证步骤可能会在近期路线图中获得优先处理。
*   **[#70266](https://github.com/openclaw/openclaw/issues/70266)：** UI 需求：允许在“通话模式”中使用助手头像；严重程度较低，但用户对其美观度有较高兴趣。

## 7. 用户反馈总结
当前用户情绪普遍感到沮丧，主要原因是**更新失败**和**易出现回归的版本**。2026.9.5 版本中的“更新候选状态”循环是一个主要痛点，用户发现自己被困在带有损坏路径的旧版本上。反馈中有一个明显的反复主题：“静默故障”——任务、内存和凭据在没有有效日志或错误信号的情况下失败，迫使用户执行完全的手动重启或重置配置。

## 8. 待办事项监控
*   **[#153899](https://github.com/openclaw/openclaw/issues/153899)：** 网关排空时会等待完整的 `TimeoutStopSec` 时间，而不是干净地关闭。这是一个被称为“shellfish”等级的问题，持续困扰着服务器管理的部署。
*   **[#152804](https://github.com/openclaw/openclaw/issues/152804)：** 一个长期存在的回归问题：`minimax-portal` 在升级后丢失模型目录；维护者尚未提供永久修复方案。

---

## 横向生态对比

### 1. 生态系统概览
截至2026年10月，开源AI Agent生态系统的特点是陷入了“稳定性与迭代速度”的矛盾危机。尽管Agent工作流（推理控制、多智能体编排）方面的创新依然活跃，但各项目正面临底层基础设施成熟度的困扰，尤其是在持久化状态管理、跨平台更新以及内存安全性方面。目前的行业格局呈现出密集的反应式维护态势，这表明行业正从实验性原型阶段向生产级部署需求过渡。

### 2. 活跃度对比
| 项目 | 近期活跃度 | 发布状态 | 健康评分（预估） | 主要挑战 |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 1,000+ 总计 | 无新版本（侧重热修复） | 临界/低 | 内存泄漏与 P0 级回归问题 |
| **Hermes** | 100+ 总计 | 无新版本（PR积压严重） | 中等 | 更新机制失效 |
| **ZeroClaw** | 90+ 总计 | 无新版本（准备 v0.9.0） | 稳定 | 沙箱/安全加固 |
| **QwenPaw** | 极低 | 无新版本 | 稳定 | 功能对齐/用户体验优化 |
| **IronClaw** | 零 | N/A | 停滞 | 已废弃/不活跃 |

### 3. OpenClaw 的地位
OpenClaw 作为“高性能”参考实现，拥有最高的社区活跃度和最雄心勃勃（但也因此最不稳定）的功能集。与其他同类项目不同，它管理着大规模集群部署（600+ Agents），这使其暴露在较小项目尚未触及的架构瓶颈（如事件循环饥饿）之下。虽然它在原生能力上处于领先地位，但目前也最为“脆弱”，更多表现为一个面向高级用户的 Alpha 级平台，而非稳定的生产级实用工具。

### 4. 共同关注的技术领域
*   **更新鲁棒性：** **OpenClaw** 和 **Hermes** 在自更新过程中均会出现灾难性的失败（如 venv 损坏、安装环境崩溃），这表明整个行业迫切需要原子化、不可变的更新模式。
*   **推理/行为控制：** **QwenPaw** 和 **OpenClaw** 的用户都在要求提供“强度”或“预算”控制，这说明模型的自主性对于标准实用任务而言正变得过于激进。
*   **网关/守护进程可靠性：** **ZeroClaw**、**Hermes** 和 **OpenClaw** 都在优先考虑将网关状态与 UI 解耦，以防止重启期间的会话丢失。

### 5. 差异化分析
*   **OpenClaw：** 专注于大规模、高并发的集群编排；架构优先考虑原始吞吐量。
*   **Hermes：** 瞄准桌面端/本地集成，侧重于跨平台易用性和 UI/UX 舒适度（如群聊功能）。
*   **ZeroClaw：** 高度偏向安全和沙箱机制；是目前唯一在讨论向基于 Rust/WASM 前端进行根本性转型的项目。
*   **QwenPaw：** 一个更轻量、以模型为中心的集成层，相比全栈 Agent 自主性，它更关注适配器/提供商的兼容性。

### 6. 社区势头与成熟度
*   **快速迭代：** **OpenClaw** 在迭代速度上显然处于领先地位，尽管其势头目前受到“P0”级稳定性障碍的阻碍。
*   **架构加固：** **ZeroClaw** 在安全协议方面最为成熟，侧重于系统级集成（ACL、沙箱），而非功能上的快速臃肿。
*   **停滞/维护难题：** **Hermes** 正经历典型的“增长瓶颈”，代码贡献量超出了核心团队的审查和合并能力。

### 7. 趋势信号
*   **“Agent 疲劳”趋势：** 用户正积极抵制“黑盒”推理，要求提供 UI 控制项，以便调低 LLM 的“思考”时间和资源消耗。
*   **向持久化状态转移：** 将工作流绑定到特定修订版本的趋势（如 ZeroClaw #11547）表明，开发者正从“无状态聊天”转向“版本化自动化工作流”。
*   **基础设施优先的成熟度：** 各项目在原生内存和文件系统锁相关问题上的高频故障表明，生态系统正在触及高级运行时环境（Bun/Node）在核心 Agent 基础设施方面的极限；向更底层、内存安全的语言（如 Rust）转型似乎已不可避免。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目摘要：2026-10-07

## 1. 今日概览
Hermes Agent 项目正处于高强度运行期，桌面端及更新基础设施面临显著的维护压力。尽管开发进度保持强劲（过去 24 小时内有 50 个 Pull Request 和 50 个 Issue 得到更新），但项目目前正陷入评审流程瓶颈，且 Windows/macOS 更新工具反复出现稳定性回归问题。团队正在平衡关键 Bug 修复与长期功能开发（如原生移动端支持及浏览器托管的桌面渲染器），这反映了项目在当前操作“痛点”并存的情况下，正向着更广泛的可访问性转型。

## 2. 发布版本
*   **无。** 过去 24 小时内没有新版本发布。

## 3. 项目进展
*   **网关可靠性：** 合并了 PR [#54014](https://github.com/NousResearch/hermes-agent/pull/54014)，为网关启用了内存监控，以跟踪 RSS、GC 和线程计数。
*   **命令逻辑：** 合并了 PR [#134271](https://github.com/NousResearch/hermes-agent/pull/134271)，修复了 `/reasoning` 命令错误，确保其能像 `/model` 命令一样正确触发选择器。
*   **UI/UX 优化：** 关闭了 PR [#93007](https://github.com/NousResearch/hermes-agent/pull/93007) 和 [#97846](https://github.com/NousResearch/hermes-agent/pull/97846)，提升了未读会话计数的交互性，并在网关上启用了持久化群聊功能。

## 4. 社区热点
*   **[#122609] Skills Index 过期/降级：** (16 条评论) 关注 Skills Hub 的实时性。监控程序报告 `/docs/api/skills-index.json` 构建流程出现降级。
*   **[#134008] 评审流程瓶颈：** (11 条评论) 关于 PR 评审流程的严峻元问题。贡献者反馈高质量且已获批的代码陷入反馈循环而停滞，导致 PR 在合并前就面临过期的风险。
*   **[#125437] 桌面端更新“痛点集中区”：** (10 条评论) 关于更新失败导致 Windows/macOS 安装处于崩溃状态且无恢复路径的高优先级报告。这是目前用户不满的最大来源。

## 5. Bug 与稳定性
*   **关键 (P1)：**
    *   [#125437](https://github.com/NousResearch/hermes-agent/issues/125437): 桌面端更新导致 venv 处于损坏状态。
    *   [#134175](https://github.com/NousResearch/hermes-agent/issues/134175): Web 控制台类型检查失败导致构建阻塞。
    *   [#133992](https://github.com/NousResearch/hermes-agent/issues/133992): macOS 桌面端更新自我冲突（进程锁）。
*   **高优先级 (P2)：**
    *   [#108215](https://github.com/NousResearch/hermes-agent/issues/108215): macOS 守护进程重启导致 `computer_use` 功能失效。
    *   [#124972](https://github.com/NousResearch/hermes-agent/issues/124972): 桌面端 `state.db` 在 macOS 上预检查超时。
    *   [#134265](https://github.com/NousResearch/hermes-agent/issues/134265): macOS 上的 Matrix 插件回归问题。

*正在进行中的修复 PR：* PR [#133283](https://github.com/NousResearch/hermes-agent/pull/133283) 致力于提升 cron 存储的健壮性，[#134272](https://github.com/NousResearch/hermes-agent/pull/134272) 旨在解决 Windows Docker 路径问题。

## 6. 功能请求与路线图信号
*   **原生移动端：** [#11911](https://github.com/NousResearch/hermes-agent/issues/11911) 仍是高关注度项目（9 个回应），请求增加 iOS/Android 语音通话功能。
*   **会话分支：** [#32105](https://github.com/NousResearch/hermes-agent/issues/32105)，用于在历史消息的特定节点进行分支处理。
*   **浏览器托管桌面端：** PR [#93508](https://github.com/NousResearch/hermes-agent/pull/93508) 代表了向通过浏览器提供桌面渲染器这一重大方向的转变，对于需要在本地和远程环境切换的用户而言，这可能是未来的优先级项目。

## 7. 用户反馈总结
用户目前对**自动更新机制的可靠性**表示不满。根据“痛点挖掘”报告，用户在更新失败后被迫进行手动修复。此外，用户明确提出希望提高多智能体（C-suite）对话的可见性，目前委派任务在主界面中被隐藏，限制了智能体工作流的透明度。

## 8. 待办事项观察
*   **[#11911](https://github.com/NousResearch/hermes-agent/issues/11911)：** 长期以来的移动端支持请求；尽管社区兴趣浓厚，但核心团队尚未给出明确的“进行中”状态。
*   **[#86135](https://github.com/NousResearch/hermes-agent/issues/86135)：** 多配置文件/智能体委派中的可见性问题导致资深用户困惑，他们希望能查看完整的“C-suite”对话线程。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目摘要 (2026-10-07)

### 1. 今日概览
QwenPaw 保持着稳健的开发节奏，主要工作集中在基础设施稳定性和增强模型集成能力上。目前的开发活动主要表现为对现有 PR 的长期维护，以及针对用户对模型行为控制反馈的积极响应。总体而言，项目运行状况保持稳定，团队正致力于提升前端韧性并扩大对供应商的兼容性。

### 2. 发布记录
*今日暂无新版本发布。*

### 3. 项目进展
*今日无 PR 合并，但有两项重要贡献正在持续开发中：*
*   **[PR #8102](https://github.com/agentscope-ai/QwenPaw/pull/8102)：** 对控制台进行了一次关键的稳定性更新，引入了“启动看门狗”以处理入口区块加载失败（如缓存过期、网络超时）的情况。该功能将原本的无限加载挂起状态替换为用户友好的错误提示及自动重载逻辑。
*   **[PR #6823](https://github.com/agentscope-ai/QwenPaw/pull/6823)：** 对自定义 OpenAI 兼容供应商功能的增强，支持基于模型 ID 匹配自动应用能力模板（如多模态支持）。

### 4. 社区热点
*   **[Issue #8114](https://github.com/agentscope-ai/QwenPaw/issues/8114)：** 用户提议为 Qwen 3.8 系列等模型引入“推理强度”（思维控制）设置。
    *   **分析：** 这反映了一个增长趋势，即用户认为现代高推理负载模型在处理标准任务时可能存在“过度思考”的情况。对于以大模型为核心的智能体平台而言，实现推理预算或冗长程度的配置层正变得愈发重要。

### 5. Bug 与稳定性
*   **控制台启动稳定性：** 已通过 [PR #8102](https://github.com/agentscope-ai/QwenPaw/pull/8102) 解决。现有的资源加载失败导致“无限挂起”的问题是一个中等严重程度的易用性 Bug，会对用户在更新期间的首次使用体验产生负面影响。

### 6. 功能请求与路线图信号
*   **推理控制：** [Issue #8114](https://github.com/agentscope-ai/QwenPaw/issues/8114) 中的请求表明，项目路线图可能需要尽快纳入“模型行为设置”。我们预计未来的迭代将重点关注暴露相关参数，允许用户切换或限制新型、高度自主模型的推理深度。

### 7. 用户反馈总结
用户目前的关注点主要集中在以下两个领域：
1.  **UX 可靠性：** 希望在网络或缓存相关故障时，控制台能提供更透明且可恢复的体验。
2.  **模型控制：** 对近期模型过高的“思考”开销表示不满，这表明用户对更精细地控制智能体认知工作流存在需求。

### 8. 积压任务观察
*   **[PR #6823](https://github.com/agentscope-ai/QwenPaw/pull/6823)：** 该 PR 自 2026 年 8 月起即处于开启状态。由于它涉及一项核心实用功能（针对自定义供应商的自动能力映射），它是代码审查的重点对象，以确保使用私有或自定义部署模型的用户能够受益于最新的多模态功能。目前需要维护人员关注以推进其合并。

---

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

## ZeroClaw 项目摘要 - 2026-10-07

### 1. 今日概览
ZeroClaw 生态系统保持高度活跃，过去 24 小时内涉及 Issue 和 PR 的更新总量达 90 次。目前开发工作重心在于强化安全性（特别是 Windows 密钥文件保护），以及为即将发布的 v0.9.0 版本优化核心运行时/网关架构。尽管开发进度迅速，但项目目前正面临一些涉及沙箱和数据持久化的关键稳定性问题，需要审慎维护 v0.8.6 的交付路线图。

### 2. 发布版本
*过去 24 小时内没有发布新版本。*

### 3. 项目进展
*   **安全性与加固：** PR [#11451](https://github.com/zeroclaw-labs/zeroclaw/pull/11451) 已合并，成功为 Windows 密钥文件实施了受限 ACL，解决了高风险的安全漏洞。
*   **工件管理：** PR [#11509](https://github.com/zeroclaw-labs/zeroclaw/pull/11509) 已合并，规范了针对大型生成工件的交付方式，优先使用附件形式而非聊天内联显示，从而提高了消息稳定性。

### 4. 社区热点话题
*   **[#8132](https://github.com/zeroclaw-labs/zeroclaw/issues/8132): Web UI 架构迁移 (11 条评论)**
    *   **背景：** 关于是否移除 Node.js/Vite 并转而采用基于 Rust/WASM 的框架（Dioxus/Leptos/Yew）的持续讨论。这仍是一个高风险的架构调整。
*   **[#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432): 运行时与网关 v0.9.0 追踪器 (6 条评论)**
    *   **背景：** 作为 RFC #5574 的主要协调中心，这是下一个大版本发布的关键路径。
*   **[#11055](https://github.com/zeroclaw-labs/zeroclaw/issues/11055): 渠道工具 Bug (6 条评论)**
    *   **背景：** 一个高优先级问题，涉及渠道寻址工具在独立守护进程部署中失效的情况，影响了高级用户对核心功能的正常使用。

### 5. Bug 与稳定性
*   **严重 (S0/S1)：**
    *   [#11540](https://github.com/zeroclaw-labs/zeroclaw/issues/11540): Linux 上 `bubblewrap` 沙箱检测失败 (S0)。
    *   [#11539](https://github.com/zeroclaw-labs/zeroclaw/issues/11539) & [#11538](https://github.com/zeroclaw-labs/zeroclaw/issues/11538): Linux 上 `firejail` 沙箱回归问题 (S1)。
*   **重大 (S2)：**
    *   [#11481](https://github.com/zeroclaw-labs/zeroclaw/issues/11481): 终端断开连接后，ZeroCode CPU 占用飙升/内存泄漏。
    *   [#11585](https://github.com/zeroclaw-labs/zeroclaw/issues/11585): 费用限额覆盖需要完全重启守护进程，导致会话丢失。
    *   [#11554](https://github.com/zeroclaw-labs/zeroclaw/issues/11554): 聊天记录中的图像标记残留（鬼影）问题。

### 6. 功能请求与路线图信号
*   **Opper 支持：** 功能请求 [#11583](https://github.com/zeroclaw-labs/zeroclaw/issues/11583) 提议将 Opper 添加为类型化提供程序，这表明用户对兼容 OpenAI 网关的需求日益增长。
*   **工作流不可变性：** 功能请求 [#11547](https://github.com/zeroclaw-labs/zeroclaw/issues/11547) 主张将 SOP 运行绑定到特定修订版本，防止“在线”编辑破坏正在运行的 Agent 执行。

### 7. 用户反馈总结
用户反映在“第二天”操作中存在显著阻碍，特别是配置持久化和守护进程重启方面。无法在不重启的情况下清除费用限额（导致长会话受阻）以及重启后“画布”状态丢失是用户反馈最多的体验痛点。不过，贡献者们正通过 PR（如 [#11428](https://github.com/zeroclaw-labs/zeroclaw/pull/11428)，针对画布状态）积极解决这些问题。

### 8. 待办事项观察
*   **[#9887](https://github.com/zeroclaw-labs/zeroclaw/issues/9887): 多模态图像处理：** 处于“搁置”状态；用户对超出大小限制的文件被直接拒绝而非自动缩放表示不满。
*   **[#7891](https://github.com/zeroclaw-labs/zeroclaw/issues/7891): Signal 媒体附件：** 一项长期悬而未决的请求，这限制了高级用户使用 Signal 渠道的效用。

</details>

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*