# OpenClaw 生态日报 2026-10-27

> Issues: 85 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-10-27 01:38 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目摘要：2026-10-27

## 1. 今日概览
OpenClaw 目前正处于高强度的工程冲刺阶段，重点在于系统稳定性和性能优化。在过去 24 小时内，共有 500 个 PR 进行了更新，85 个 Issue 处于活跃状态。项目正承受着巨大的压力，尤其是来自 Windows 平台和高负载数据库环境下的“崩溃循环（crash-loop）”报告。社区正迅速行动以修复这些回归问题，重点在于“清理冗余代码（deslopping）”并优化资源消耗，以缓解用户体验（UX）层面的摩擦。

## 2. 发布记录
*无。*（当日未发布任何新版本）。

## 3. 项目进展
今天的活动主要集中在重构和性能调优，而非发布新功能。
*   **性能优化：** PR #185199 避免了短对话草稿中不必要的滚动条布局计算；PR #185293（关联 Issue #185289）解决了长流式回复导致 Gateway 挂起的关键性能瓶颈。
*   **基础设施清理：** 一项旨在移除低价值测试夹具（test fixtures）并整合整个代码库中重复断言的大规模工作正在进行中（例如 #185268, #185291, #185304）。
*   **Gateway 重构：** PR #185157 启动了一项大规模重构，旨在理清各通道（channels）与 web-ui 之间的所有权接口。

## 4. 社区热点话题
*   **[#170956] Windows 启动/关闭可靠性 (21 条评论)：** 最受关注的问题；用户反馈由于 `schtasks` 权限和插件关闭挂起导致重启和更新不可靠。这是影响 Windows 版本推广的关键阻碍。[查看 Issue](https://github.com/openclaw/openclaw/issues/170956)
*   **[#140010] 睡眠/唤醒 WebSocket 故障 (16 条评论)：** Windows 用户反馈在笔记本电脑唤醒后会出现 30-60 秒的连接停滞，这表明存在严重的事件循环拥塞。[查看 Issue](https://github.com/openclaw/openclaw/issues/140010)
*   **[#129314] 运行时上下文元数据泄漏 (15 条评论)：** 一个持续困扰用户的问题，内部脚手架消息（scaffolding messages）正泄漏到可见的聊天界面中。[查看 Issue](https://github.com/openclaw/openclaw/issues/129314)

## 5. 错误与稳定性
*   **P0 - 崩溃循环：**
    *   [#166634] 后期回收失败导致 Agent 进入永久性的 `UNAVAILABLE` 状态。[查看 Issue](https://github.com/openclaw/openclaw/issues/166634)
    *   [#142987] 在 Windows 上启动本地 `llama.cpp` 时 Gateway 被强制终止。[查看 Issue](https://github.com/openclaw/openclaw/issues/142987)
    *   [#184889] npm 更新失败可能导致 `node_modules/openclaw` 目录丢失，需要手动干预修复。[查看 Issue](https://github.com/openclaw/openclaw/issues/184889)
*   **P1 - 行为/会话错误：**
    *   [#185303] 权限泄漏：`claude-cli` 对话轮次意外地将工具调用权限传递给了下游 Agent。[查看 Issue](https://github.com/openclaw/openclaw/issues/185303)
    *   [#185286] Codex 终端推理重新排序了已检查点的工作，导致最终答案恢复失败。[查看 Issue](https://github.com/openclaw/openclaw/issues/185286)

## 6. 功能需求与路线图信号
*   **个人身份/隐私：** 用户呼吁完善隐私控制，例如在共享工作区中启用个人身份选择 ([#162164](https://github.com/openclaw/openclaw/issues/162164))，以及将侧边聊天（Side-chats）设为用户私有 ([#181215](https://github.com/openclaw/openclaw/issues/181215))。
*   **Android/移动端一致性：** 存在使 Android 端功能与浏览器端保持一致的需求，特别是针对聊天内提问和审批请求的功能 ([#175826](https://github.com/openclaw/openclaw/issues/175826))。

## 7. 用户反馈总结
当前用户情绪受近期更新带来的“UX 摩擦”影响严重。用户对长期存在的会话数据库（3.5GB+）导致的严重启动延迟和数据库压缩失败感到极度沮丧。2026.10.x 系列的过渡过程并不平稳，许多用户遇到的问题需要手动清理目录才能解决，这表明目前的升级/回滚机制尚不够稳健。

## 8. 待办事项关注
*   **[#67419] 上下文膨胀：** 一个长期存在的问题，即 20-30% 的 Token 窗口被重复注入的引导文件（bootstrap files）所占用。尽管关注度很高，但进展甚微。[查看 Issue](https://github.com/openclaw/openclaw/issues/67419)
*   **[#119294] MCP 2.0 迁移：** 跟踪向无状态 MCP 的转换。由于这是一个重大的架构转变，它仍然是需要产品级指导以确保项目长期健康的关键项。[查看 Issue](https://github.com/openclaw/openclaw/issues/119294)

---

## 横向生态对比

## 跨项目分析报告：AI Agent 生态系统
**日期：** 2026-10-27

### 1. 生态系统概览
开源 AI Agent 生态系统目前处于“成熟期”，正从实验性的功能堆砌转向对稳定性、安全性和性能优化的严苛要求。各项目正面临共同的核心挑战：如何在不导致本地数据库臃肿或内存管理故障的情况下，管理长生命周期、资源密集型的 Agent 会话。随着技术成熟，开发者们开始优先进行架构重构和身份验证加固，这标志着该领域正向企业级、多 Agent 生产就绪状态过渡。

### 2. 活跃度对比
| 项目 | 问题（近期） | PR 活跃度 | 发布状态 | 健康度评分* |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 85 | 500 (已更新) | 无新版本 | 中等 (倒退) |
| **Hermes Agent** | 24 | 50 | 稳定 (v0.22.5) | 稳定 (活跃) |
| **QwenPaw** | 高数量 | 63 | 无新版本 | 稳健 (迭代中) |
| **ZeroClaw** | 22 | 29 | v0.8.7/v0.9.0 准备中 | 高 (聚焦安全) |
| **IronClaw** | 0 | 0 | 不活跃 | 停滞 |

*\*健康度评分基于对 Bug 的响应速度及非破坏性变更的迭代速度。*

### 3. OpenClaw 的定位
*   **优势：** OpenClaw 拥有最大的用户群和最高的社区参与度，是该生态系统中事实上的参考实现。
*   **技术路线：** 与 QwenPaw 的模块化方案或 ZeroClaw 的安全优先策略不同，OpenClaw 目前处于大规模的“去臃肿化”阶段。它正受到遗留技术债务（引导文件、上下文膨胀）的困扰，而这些问题在其他小型项目中已被避免或通过架构设计绕过。
*   **对比：** 其社区规模优势显著，提供了巨大的测试场，但相较于精简的 Hermes 和 QwenPaw 项目，目前正遭受“功能过度堆砌导致的系统不稳定”。

### 4. 共同关注的技术领域
*   **“思考”与推理控制：** **QwenPaw** (#8439) 和 **ZeroClaw** (#12054) 的用户都在要求对模型原生推理（思考深度/thinking levels）进行细粒度控制。
*   **数据库/内存管理：** **OpenClaw**（会话数据库压缩）和 **QwenPaw**（向量索引重建/history.db）都因长期本地存储导致的性能下降而苦恼。
*   **Agent 编排：** **Hermes** 和 **OpenClaw** 都在积极重构子 Agent 的管理方式，以防止权限/工具调用泄露。

### 5. 差异化分析
*   **QwenPaw：** 专注于模块化和重 RAG、多模态工作流；目标群体是追求本地向量检索控制的“高级用户”。
*   **ZeroClaw：** 以对 OIDC/身份验证及安全/访问控制的极致追求作为特色；目标是企业级或多租户部署。
*   **Hermes Agent：** 定位为浏览器端 UI 与远程网关之间的“桥梁”；专注于跨平台可访问性（Wayland、Web-to-Desktop）。
*   **OpenClaw：** 充当“全能”平台，旨在提供全面的功能覆盖，尽管这带来了相应的稳定性风险。

### 6. 社区动力与成熟度
*   **高速度 (迭代中)：** **QwenPaw** 和 **OpenClaw** 的迭代速度最高。QwenPaw 目前更健康，其架构升级（PawApp 控制平面）进展顺利，且未出现大量灾难性的回退报告。
*   **稳定/加固中：** **ZeroClaw** 和 **Hermes** 处于加固阶段，在临近大版本发布（v0.9.0 / v0.22.x）时，优先考虑安全性和可靠性而非新功能开发。
*   **停滞：** **IronClaw** 近期没有任何活动，显示出动力丧失或项目已遭放弃的迹象。

### 7. 趋势信号
*   **“思考”税：** 开发者们逐渐意识到模型原生的推理并非“免费”，正推动引入架构级的调节旋钮（如 `thinking_level`）来管理 Token 消耗和延迟。
*   **平台身份：** 向原生浏览器端接口（Hermes/ZeroClaw）的转移表明，“Agent 终端”正在演变为功能完整的基于 Web 的仪表盘，减少了对纯 CLI 接口的依赖。
*   **安全债务：** 整个生态系统中带有安全标签的问题激增（尤其是在 **ZeroClaw** 中），表明生态系统已成熟到一定程度，“身份验证绕过”和“权限提升”已成为社区关注的合理问题——这是专业领域对 Agent 兴趣增加的标志。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目摘要：2026-10-27

### 1. 今日概览
Hermes Agent 项目目前处于高强度的开发状态，过去 24 小时内有 74 项 GitHub 记录（24 个 issue，50 个 PR）得到更新。目前的开发重点是强化近期发布的浏览器端 Desktop/Webapp 界面 (#144648)，并完善多智能体委派框架。虽然“今日新增”的大量 bug 反馈显示在发布稳定版本 (v0.22.5) 后系统出现了一定程度的不稳定性，但维护团队正通过针对性的热修复和跨进程通信补丁迅速响应。

### 2. 发布信息
*   **无新版本发布。** 当前稳定版本仍为 **v0.22.5**。

### 3. 项目进展
*   **Webapp 稳定性：** 合并了 PR #145106，解决了关于纯 HTTP 源、浏览器端剪贴板/加密支持以及弹出窗口处理的关键问题。PR #145107 在此基础上确保了弹出窗口拦截器能实时通知用户。
*   **工具与智能体编排：** 启动了多项旨在改善子智能体管理和看板工作流的功能 (#145316, #145317, #145319)，标志着项目正向更自主、团队化的智能体行为方向发展。
*   **平台优化：** 推送了修复程序以更好地管理飞书 (Feishu) websocket 兼容性 (#62565)，并防止 CLI/Desktop 界面中的项目重复创建 (#75981)。

### 4. 社区热门话题
*   [#139818] **远程后端会话恢复：** 拥有 22 条评论，这是目前争议最大的议题。用户反馈远程后端托管的桌面会话在重启后无法恢复。其复杂性在于跨隔离网关环境的会话状态序列化。
*   [#105758] **终端生命周期保护：** 拥有 15 条评论，该问题指出了一个痛点：终端的“安全”层错误地将正常的 Node.js CLI 工具识别为威胁，从而阻止了开发者的正常工作流。

### 5. Bug 与稳定性
*   **严重 (网关/认证)：** [#145315] 一项新报告指出，webhook `cron_job` 处理中存在死锁，在高并发下可能导致整个网关宕机。
*   **高优先级 (会话/认证)：** [#141878] 跨进程插件激活在登录受限的仪表盘上静默失败。
*   **高优先级 (回归)：** [#145261] v0.22.5 中的 Discord 群组会话遭遇大规模准入冲突（超过 2,600 次拒绝），表明多路复用/配置文件逻辑可能存在回归问题。
*   **高优先级 (工具链)：** [#145063] 使用 `anyOf` 逻辑的工具在解析模型调用参数时出现错误，导致参数丢失。

### 6. 功能请求与路线图信号
*   **Mattermost 线程支持：** PR #145312 提议为 Mattermost 增加“自由回复”模式，允许智能体在线程中回复而无需重新触发提及 (mention) 限制。
*   **Google Workspace 集成：** PR #145311 增加了对 `freebusy` 日历检查的支持，表明路线图将重点放在生产力和日程安排智能体上。
*   **插件元数据：** Issue #145313 指出需要一个集中的 Composio 工具包目录，以简化社区插件的凭证管理。

### 7. 用户反馈总结
用户目前对“全新安装”的摩擦成本（例如 #119529，仅搜索功能的后端默认执行提取任务）以及阻碍合法本地工具使用的进程隔离限制表示不满。向基于浏览器的 Desktop 应用转型带来了直接的 UI/UX 回归问题（剪贴板、弹窗、Wayland 上的托盘图标），但社区正积极参与并提交针对这些早期 bug 的修复。

### 8. 待办事项追踪
*   [#119805] **QQBot 网关：** 涉及网关重启后消息路由循环的持久性问题，自 9 月下旬开启以来进展缓慢。
*   [#31734] **系统预填消息：** 该 PR 目前处于“清理”状态，旨在修复如何为兼容 OpenAI 的网关折叠系统提示词。它自 2026 年 5 月开启，是使用严格模型提供商的用户的重大兼容性阻碍。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目摘要：2026-10-27

## 1. 今日概览
QwenPaw 展现出极高的开发活跃度，过去 24 小时内共有 63 个事项得到更新。目前的重心分为两部分：一是稳定桌面端体验（Linux/Tauri 改进），二是为生产级部署优化内存及嵌入（embedding）架构。项目整体健康状况良好，对 Bug 的响应速度极快，但大量涌入的技术问题表明，用户正推动该平台向更复杂、多模态及长周期的智能体（Agent）工作流方向演进。

## 2. 版本发布
*过去 24 小时内无新版本发布。*

## 3. 项目进展
近期的 PR 活动显示出明显的架构模块化与隔离趋势：
*   **性能与清理：** [#7923](https://github.com/agentscope-ai/QwenPaw/pull/7923) 已关闭，实现了工具结果块的保留策略，以防止 `history.db` 无限增长。
*   **API 弹性：** [#8165](https://github.com/agentscope-ai/QwenPaw/pull/8165)（关联 #8162）解决了与省略 delta 事件的 OpenAI 类提供商之间的流式传输兼容性问题。
*   **Bug 修复：** [#8062](https://github.com/agentscope-ai/QwenPaw/pull/8062) 为嵌入重索引失败提供了部分修复，确保在特定块超过 Token 限制时，仍能保留部分成功的结果。

## 4. 社区热点
*   **[#8040](https://github.com/agentscope-ai/QwenPaw/issue/8040) 嵌入重索引不完整：** 这是关于嵌入批处理中静默丢弃数据的关键问题，也是管理大型 RAG 知识库用户的首要痛点。
*   **[#8442](https://github.com/agentscope-ai/QwenPaw/issue/8442) Linux 桌面版对齐：** 社区对原生 `deb`/`AppImage` 支持有强烈需求，表明 Linux 高级用户群体正在增长。
*   **[#7874](https://github.com/agentscope-ai/QwenPaw/pull/7874) PawApp 控制平面：** 一个大规模的架构 PR，仍是未来 QwenPaw 插件/应用生态系统的核心焦点。

## 5. Bug 与稳定性
*   **高优先级：** [#8435](https://github.com/agentscope-ai/QwenPaw/issue/8435) - LLM 流由于速率限制器的信号量死锁而无限挂起。这导致在工具密集型对话中智能体无法正常工作。
*   **中优先级：** [#8417](https://github.com/agentscope-ai/QwenPaw/issue/8417) - 由于对“思考（thinking）”参数处理冲突，上下文压缩在某些模型（glm-5.3-flash）上失效，导致长期记忆损坏。
*   **中优先级：** [#8424](https://github.com/agentscope-ai/QwenPaw/issue/8424) - MCP 服务器协商失败。已通过 PR [#8445](https://github.com/agentscope-ai/QwenPaw/pull/8445) 修复。
*   **低优先级：** [#8415](https://github.com/agentscope-ai/QwenPaw/issue/8415) - `edit_file` 期间 CRLF 到 LF 的文件结尾转换，可能导致严格版本控制用户的格式问题。

## 6. 功能需求与路线图信号
*   **思考能力：** [#8439](https://github.com/agentscope-ai/QwenPaw/issue/8439) 请求对定时任务（cron jobs）的 "thinking_level" 进行精细化控制，预计将优先考虑用于 Token 管理。
*   **账号便捷性：** [#8437](https://github.com/agentscope-ai/QwenPaw/pull/8437) 提议支持本地 ChatGPT 订阅登录，这将显著降低非开发人员用户的准入门槛。
*   **SDK/生命周期：** [#8431](https://github.com/agentscope-ai/QwenPaw/pull/8431) 寻求模块化本地 Whisper 实现，倾向于“全插件”架构。

## 7. 用户反馈总结
用户普遍对 QwenPaw 的功能广度表示满意，但目前在“长生命周期”进程的稳定性上感到困扰。常见的抱怨包括内存数据库膨胀、异步工具循环中的间歇性挂起，以及处理特定 API 提供商兼容性（如流式事件和上下文压缩头部）时的困难。

## 8. 待办事项监控
*   **[#4946](https://github.com/agentscope-ai/QwenPaw/issue/4946)：** 这个关于插件导入失败导致 6 分钟以上启动阻塞的长期问题已被关闭，标志着系统响应能力的一次重大胜利。
*   **[#8178](https://github.com/agentscope-ai/QwenPaw/pull/8178)：** 支持嵌套/分类技能目录的 PR 正在等待审核；这是维护大量本地智能体库的用户强烈要求的需求。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目摘要 - 2026-10-27

### 1. 今日概览
ZeroClaw 目前处于高强度开发阶段，重点在于 v0.9.0 发布前的安全性、身份验证及核心智能体（Agent）运行时特性的稳定性保障。过去 24 小时内活动频繁，新增 22 个 Issue，活跃 PR 达 29 个，显示出项目在加强平台身份与访问控制系统方面的严谨推进。虽然项目架构能力正在飞速提升，但大量标记为“security”的 Bug 表明，当前正处于一个以审计驱动为核心的密集优化期。

### 2. 版本发布
*无。项目目前专注于 v0.8.7（Bug 修复）及即将到来的 v0.9.0（重大架构特性）。*

### 3. 项目进展
*   **身份验证与安全强化：** 仪表盘的 OIDC 集成开发进展迅速（[PR #11965](https://github.com/zeroclaw-labs/zeroclaw/pull/11965)），同时正在加固 RPC 调用，以确保有作用域限制的准则（principals）无法访问受限日志（[PR #11326](https://github.com/zeroclaw-labs/zeroclaw/pull/11326)）。
*   **运行时效率：** 已开启一个新的 PR 以实现延迟引导（deferred bootstrap）部分，允许对可寻址知识进行处理，从而避免在每轮交互中消耗上下文限制（[PR #12044](https://github.com/zeroclaw-labs/zeroclaw/pull/12044)）。
*   **修复：** 已识别并解决了关键的插件发现竞态条件问题，该问题曾导致加载不匹配的清单（manifests）（[PR #12040](https://github.com/zeroclaw-labs/zeroclaw/pull/12040)）。

### 4. 社区热门话题
*   **[PR #11847](https://github.com/zeroclaw-labs/zeroclaw/pull/11847)：** 引入原生的 Rust XMPP 支持是一项重要的架构补充，突显了用户对去中心化且兼容传统通信渠道的需求。
*   **[Issue #11013](https://github.com/zeroclaw-labs/zeroclaw/issues/11013)：** 这个用于统一文件输入与交付的追踪器持续受到关注，用户希望在各种智能体渠道中获得更稳健的文件处理能力。
*   **[Issue #12042](https://github.com/zeroclaw-labs/zeroclaw/issues/12042)：** 关于 *Hlido* 的独立评测（得分为 79/100）引起了社区注意，这预示着业界推动 AI 智能体框架客观第三方基准测试的呼声日益高涨。

### 5. Bug 与稳定性
项目面临一波安全相关的 Bug 报告激增，主要集中在身份验证绕过问题：
*   **高优先级：** [Issue #12053](https://github.com/zeroclaw-labs/zeroclaw/issues/12053)（仪表盘上未锁定的第三方脚本）和 [Issue #12050](https://github.com/zeroclaw-labs/zeroclaw/issues/12050)（通过 OIDC 回调产生的登录 CSRF）。
*   **中优先级：** [Issue #12045](https://github.com/zeroclaw-labs/zeroclaw/issues/12045)（缓冲前缺少响应体大小限制）和 [Issue #10921](https://github.com/zeroclaw-labs/zeroclaw/issues/10921)（Qdrant 时间限制召回遗漏结果）。
*   **低优先级：** [Issue #12021](https://github.com/zeroclaw-labs/zeroclaw/issues/12021)（Web 仪表盘 UI 高亮持久化问题）。

### 6. 功能需求与路线图信号
*   **重排序策略：** [Issue #12022](https://github.com/zeroclaw-labs/zeroclaw/issues/12022) 提议为内存添加可选的外部重排序阶段，预计将被需要复杂智能体检索高精度需求的用户采用。
*   **思考级别（Thinking Levels）：** [Issue #12054](https://github.com/zeroclaw-labs/zeroclaw/issues/12054) 请求按智能体控制 OpenAI 推理力度，显示出用户对模型原生“思考”能力进行细粒度控制的趋势。

### 7. 用户反馈总结
当前用户反馈强调了对不同 Git 提供商（Gitea/Forgejo 与 GitHub）功能对等性的渴望，以及在安全策略拦截智能体动作时更强透明度的需求。社区正积极指出配置设置与实际实现之间的偏差，敦促维护者对无效的配置键采取“要么实现，要么删除”的态度。

### 8. 待办事项观察
*   **[Issue #10781](https://github.com/zeroclaw-labs/zeroclaw/issues/10781)：** 清理无效配置键。该问题自 9 月起一直悬而未决，影响了用户对配置管理的信任。
*   **[Issue #10673](https://github.com/zeroclaw-labs/zeroclaw/issues/10673)：** 守护进程 RPC 路径上的持久化失败。这是一个自 9 月初以来一直存在的阻塞工作流的 Bug，需要紧急关注以确保守护进程的稳定运行。

</details>

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*