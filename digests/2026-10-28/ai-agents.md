# OpenClaw 生态日报 2026-10-28

> Issues: 156 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-10-28 01:32 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目摘要 (2026-10-28)

## 1. 今日概览
OpenClaw 目前处于高强度的稳定化阶段，工程活动量极大（24 小时内有 500 个 PR 更新）。项目组正集中精力解决 Windows 和 Linux 环境下的关键可靠性问题及“崩溃循环（crash-loop）”回归问题，并投入了大量精力改进 Gateway 重启逻辑和状态持久化。尽管功能开发仍在继续，但大量的 P0 和 P1 待处理议题表明，项目目前优先考虑削减技术债务和强化基础设施，以支持其近期推进的“长期支持（LTS）”版本目标。

## 2. 版本发布
*   **[v2026.10.10-beta.4](https://github.com/openclaw/openclaw/releases/tag/v2026.10.10-beta.4)：** 增强了自动化安全性，在定时跟进和 `next_check` 重置期间，保留了已授权操作员的权限。
*   **[v2026.10.8](https://github.com/openclaw/openclaw/releases/tag/v2026.10.8)：** 提高了更新后故障的恢复能力，确保 Doctor 运行失败时会重启 Gateway 而非停止运行；修复了孤立维护工作进程阻塞的问题。
*   **[v2026.9.35](https://github.com/openclaw/openclaw/releases/tag/v2026.9.35)：** 一个“长期支持（LTS）”版本，提供了关键的安全和性能补丁，旨在保障长期稳定性。

## 3. 项目进展
今日的开发工作集中在核心基础设施的优化上：
*   **安全修复：** [#186417](https://github.com/openclaw/openclaw/pull/186417) 关闭了一个安全漏洞，该漏洞导致 webhooks/join-introductions 错误地以高权限的 owner-only 工具身份运行。
*   **性能优化：** [#186421](https://github.com/openclaw/openclaw/pull/186421) 降低了会话列表发布时的 CPU/内存开销；[#186415](https://github.com/openclaw/openclaw/pull/186415) 优化了节点托管工作区中 Gateway 的重启时间。
*   **韧性提升：** [#186411](https://github.com/openclaw/openclaw/pull/186411) 修复了一个竞态条件，该条件曾导致更新清理程序在进行目的地验证时失败。

## 4. 社区热点讨论
*   **[#119720](https://github.com/openclaw/openclaw/issues/119720)：同步代理持久化阻塞了 Gateway 事件循环。** 这是目前最受关注的议题（25 条评论），反映出在核心数据层进行扩展时存在严重的架构摩擦。
*   **[#170956](https://github.com/openclaw/openclaw/issues/170956)：Windows 启动/更新可靠性。** 拥有 22 条评论，凸显了 Windows 用户群体面临的关键痛点，特别是涉及权限和插件关闭时机的问题。
*   **[#157325](https://github.com/openclaw/openclaw/issues/157325)：代理数据库资源卡死。** 用户反馈在 Windows 服务器部署中代理回复完全失效，这是目前影响用户体验的优先级最高的 Bug。

## 5. Bug 与稳定性
*   **关键问题 (P0/发布阻塞)：** 
    *   [#161921](https://github.com/openclaw/openclaw/issues/161921)：插件更新与 `doctor --fix` 之间的循环依赖。
    *   [#167406](https://github.com/openclaw/openclaw/issues/167406)：由于 Codex 插件导致的 Windows MSIX Gateway 事件循环饥饿。
    *   [#185819](https://github.com/openclaw/openclaw/issues/185819)：尽管授权成功，Windows Codex 入门流程仍告失败。
*   **回归问题：** 
    *   [#169797](https://github.com/openclaw/openclaw/issues/169797)：与 2026.9.4 版本相比，在单核 CPU 主机上的内存占用严重且启动速度显著回退（慢 2.5 倍至 5 倍）。

## 6. 功能请求与路线图信号
*   **无障碍访问：** [#9637](https://github.com/openclaw/openclaw/issues/9637)（以及对应的 PR [#185921](https://github.com/openclaw/openclaw/pull/185921)）提议为 TUI 添加屏幕阅读器模式，显示出近期对包容性的重视。
*   **移动端推理：** [#166970](https://github.com/openclaw/openclaw/issues/166970) 请求在 iPad/iPhone 上支持前台推理工作进程。
*   **技能治理：** [#150250](https://github.com/openclaw/openclaw/issues/150250) 关于“技能工坊（Skill Workshop）”功能，暗示了未来在可审计性和行为控制方面的工作计划。

## 7. 用户反馈总结
用户目前对 Windows 和 Debian 系统上“脆弱”的更新过程表示不满。用户对“技能工坊（Skill Workshop）”功能有明显的不满，称其为“致命瘟疫”，因为该功能会对代理行为进行未经审查的自动修改（[#184600](https://github.com/openclaw/openclaw/issues/184600)）。近期版本发布后，低端硬件或单核 CPU 设备上的性能表现也是当前的一大痛点。

## 8. 积压工作监视
*   **[#121232](https://github.com/openclaw/openclaw/issues/121232)：** 自 8 月份以来长期存在的 `memory-core` 排序器/应用器不一致问题。
*   **[#121572](https://github.com/openclaw/openclaw/issues/121572)：** 浏览器插件中的内存无限增长问题，已近三个月未解决。
*   **[#121823](https://github.com/openclaw/openclaw/issues/121823)：** “内存梦境推广（Memory Dreaming Promotion）”在原生文件系统上持续阻塞事件循环，尽管该阻塞问题十分关键，但仍未得到处理。

---

## 横向生态对比

### 生态系统概览：2026-10-28
开源 AI Agent 生态系统目前正处于“稳定化紧缩期”。在经历了一段激进的功能扩展期后，各大主流项目（OpenClaw、Hermes、QwenPaw、ZeroClaw）目前正转向加固核心架构，致力于解决持续存在的跨平台可靠性问题，并处理沉重的技术债。从“实验性 Agent 能力”向“可靠的桌面级软件”的转型，正在推动在网关管理、事件循环（event-loop）优化和稳健的本地持久化层方面的巨额投入。

### 活动对比

| 项目 | 活跃议题 | PR 活动 (24h) | 近期版本 | 健康评分 |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 高 (P0/P1) | 500+ (高) | v2026.10.10-beta.4 | 开发中 (不稳定) |
| **Hermes** | 17 | 50 | N/A | 稳健 |
| **QwenPaw** | 18 | 50 | v2.3.0-beta.1 | 稳健 |
| **ZeroClaw** | 高 (关键) | 42 | v0.8.7 | 成熟中 |
| **IronClaw** | 0 | 0 | N/A | 停滞 |

### OpenClaw 的定位
*   **优势：** OpenClaw 保持着生态系统中最激进的开发节奏，充当着事实上的“核心参考”。它对 LTS（长期稳定版）的推动标志着该项目已进入其他项目才刚刚开始考虑的成熟阶段。
*   **技术路线：** 与 Hermes 更偏向“Web 应用中心”的路径不同，OpenClaw 大力投入原生且资源密集型的架构，专注于网关级持久化和复杂的多线程 Agent 协作。
*   **社区规模：** OpenClaw 的社区影响力显著超过同行，这形成了一把“双刃剑”：既带来了快速创新，也因频繁的稳定性倒退而导致极高的信噪比。

### 共享技术焦点
*   **持久化数据扩展：** OpenClaw (#119720) 和 QwenPaw (#8443) 都受到因激进且未优化的数据库持久化所导致的“事件循环膨胀”问题的困扰。
*   **Windows 可靠性：** 所有活跃项目均报告了在 Windows 特定文件句柄锁定和更新生命周期方面遇到的阻碍。
*   **跨平台兼容性：** Hermes、QwenPaw 和 ZeroClaw 目前都在构建或完善“类原生”桌面体验（如 AppImages、.deb 或 PWA 风格的安装程序），以取代纯浏览器界面。

### 差异化分析
*   **OpenClaw：** 专注于基础设施密集型、接近企业级的 Agent 部署，持有一种“修复医生（Doctor-fix）”的心态。
*   **Hermes Agent：** “Web 即桌面”范式的首要领导者；最适合追求模拟本地应用性能且集成云端界面的用户。
*   **QwenPaw：** 明确针对开发者生产力和研究领域，重点在于可扩展的“PawApps”和模块化工具链。
*   **ZeroClaw：** 高度关注安全性、基于 Wasm 的运行时加固以及标准化溯源，定位于更注重安全或企业合规性的使用场景。

### 社区动力与成熟度
*   **高频迭代：** Hermes 和 QwenPaw 展示了最平衡的增长，正从 Beta 阶段迈向功能完备阶段，且问题积压情况可控。
*   **稳定中/高技术债：** OpenClaw 和 ZeroClaw 处于“紧缩”阶段。OpenClaw 激增的 500 个 PR 表明其在拼命纠正近期的稳定性倒退，而 ZeroClaw 则在有效地清理 CI/CD 和安全签名，以冲击 v0.9.0 里程碑。
*   **非活跃：** IronClaw 似乎已被有效搁置，这表明开发者兴趣正向更活跃的仓库聚拢。

### 趋势信号
1.  **“魔法”的终结：** 用户正日益拒绝“自动变异”的 Agent 行为（例如 OpenClaw 的“技能工坊（Skill Workshop）”所引发的抵触）。开发者现在更倾向于对自主 Agent 的演进进行可审计的手动控制。
2.  **基础设施作为护城河：** 竞争战场已从“模型智能”转移到“运行时可靠性”。谁先解决文件锁定和事件循环阻塞问题，谁就将赢得桌面安装市场。
3.  **本地优先的韧性：** 尽管向基于 Web 的 UI 转移，但对纯本地功能（离线推理、本地数据库访问）的需求依然强劲且持久，这表明“纯云端” Agent 无法满足专业工作流的可靠性要求。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目摘要：2026-10-28

## 1. 今日概览
Hermes Agent 项目持续处于高强度开发状态，过去 24 小时内活动显著激增，共产生 50 次 PR 更新和 17 个活跃议题。目前的首要任务明确聚焦于近期引入的 Web 网关界面 (#144648) 的稳定性提升与功能扩展。项目整体健康度良好，团队正积极推进跨平台（Linux/Android/Windows）的一致性，并持续优化桌面端与移动端 Web 用户的体验。

## 2. 发布版本
*过去 24 小时内没有发布新版本。*

## 3. 项目进展
*   **基础设施与 UX：** 正在开展重大工作，通过 Service Workers 和 Manifest 使仪表盘成为真正的“可安装”应用 (#145801)。
*   **桌面端增强：** 推动了性能优化，减少了隐藏终端行不必要的渲染工作 (#145757)。正在实现一项新的应用内浏览器功能，以便让用户留在 Agent 环境内，而非跳转至系统浏览器 (#145798)。
*   **插件管理：** 修复了在 Web 托管环境中阻碍插件检查的问题 (#145770)。
*   **Bug 修复：** 修复了一个竞态条件：启动器在等待锁定时可能错误地尝试使用已删除的文件 (#145753)；修复了授权 Header 的逻辑错误：配置的 Header 错误地覆盖了 SDK 默认值，而非进行正确的合并 (#145799)。

## 4. 社区热点
*   **[#144648] 追踪：Webapp 合并后的后续跟进：** 拥有 10 条评论，这是项目最重大转型的核心枢纽——浏览器托管的桌面端。随着生态系统向该界面靠拢，社区正在积极反馈各类打磨细节问题。
*   **[#143331] Windows 更新失败：** (7 条评论) 一个因 Windows 上残留 PID 文件导致更新失败的关键问题；尽管已关闭，但它凸显了 Windows 用户在当前更新生命周期中所遇到的阻碍。
*   **[#141854] 消息“需要设置”Bug：** (6 条评论) 用户对桌面端消息 UI 将功能正常的平台错误标记为“未配置”表示不满，这反映出需要更完善的平台级身份验证状态报告机制。

## 5. Bug 与稳定性
*   **关键/高优先级：** 
    *   **[#145063] 工具调用参数丢失：** Deepseek-v4.1-flash 用户反馈带有 `anyOf` 参数的工具出现参数缺失，可能导致 Agent 自主性受损。
    *   **[#145789] A2A 超时失败：** 当任务被标记为失败后，延迟到达的 A2A 回复会被丢弃，影响长时运行的 Agent 进程。
*   **中/低优先级：**
    *   **[#145183] Linux 半透明效果：** 设置行被隐藏，导致用户无法关闭窗口特效。
    *   **[#145296] Android 键盘：** 仪表盘终端出现按键丢失；已有一个 PR 修复待合并 (#145803)。
    *   **[#145791] Cron Job 泄露：** 在被抑制的 Cron 触发点生成了空会话。

## 6. 功能需求与路线图信号
*   **桌面端对齐：** 明确提出需提升触控与鼠标操作的一致性，特别是对长用户消息进行截断处理 (#145792)。
*   **A2A 扩展：** 改进 Agent 间通信，允许操作员定义自定义技能和文档 URL，而非仅仅使用通用的工具集描述 (#145790)。
*   **本地模型：** 近期的 PR 表明团队致力于支持最新的本地硬件趋势，集成 LiquidAI LFM3 1.7B 就是例证 (#145800)。

## 7. 用户反馈总结
用户普遍对新的 Webapp 功能充满热情，但也遇到了“首日”摩擦。常见的痛点包括 UI 不一致（Markdown 渲染、输入框截断）以及配置障碍（桌面应用无法正确识别已启用的平台）。整体情绪依然积极，因为团队正根据这些反馈进行快速迭代。

## 8. 积压任务观察
*   **[#19821] QQ Bot WebSocket “僵尸”状态：** 自 2026 年 5 月起开启。适配器未能检测到 TCP 连接的静默断开。这是一个长期存在的稳定性隐患，需要一套稳健的保活或重连策略。
*   **[#139418] GPT-6.1 Sol 一致性：** 自 10 月中旬以来针对特定模型会话的性能大幅下降报告未见进展；这可能暗示了长时推理任务的管理方式存在潜在问题。

---

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目简报 (2026-10-28)

### 1. 今日概览
QwenPaw 项目展现出极高的开发活跃度，过去 24 小时内有 50 个 PR 更新及 18 个活跃 Issue。团队目前正处于发布重要版本 (v2.3.0-beta.1) 与关键稳定性保障（针对桌面客户端及内存管理）的双重压力之下。总体而言，项目运行状况良好，社区贡献积极，且工作重心明确，正致力于提升跨平台使用体验。

### 2. 发布信息
*   **[v2.3.0-beta.1](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.3.0-beta.1)：** 本次测试版重点在于恢复 UI/UX 功能并提升开发者效率。
    *   **亮点：** 恢复控制台交互式 HTML 预览；增加通过凭据存储支持可选 Tavily API 密钥的功能。
    *   **迁移说明：** 由于这是侧重于稳定性的测试版本，建议用户升级后检查运行环境是否正常。

### 3. 项目进展
*   **桌面端与打包：** 跨平台支持取得重大进展，新增了 [Linux .deb 和 AppImage 支持](https://github.com/agentscope-ai/QwenPaw/pull/8444) 的 PR。
*   **UI/UX：** 开发者新增了 [快速添加模型按钮](https://github.com/agentscope-ai/QwenPaw/pull/8434)，以简化提供商配置流程。
*   **维护：** 推动了多项修复，改进了 Windows 安装程序的诊断信息，并确保桌面应用中嵌入式字体的内容安全策略 (CSP) 合规性。

### 4. 社区热点
*   **[#8443] 清理过期的 tool_result 数据块：** 关于数据库优化的重大讨论。由于 `history.db` 保留了冗余的 JSON 数据块，用户已触及存储上限。讨论指出系统性能与长期搜索回溯需求之间存在冲突。
*   **[#7874] 重构 SDK 和应用控制平面：** 一项雄心勃勃且长期的架构变革，旨在优化“PawApps”的任务编排、重试机制和权限管理。

### 5. Bug 与稳定性
*   **高优先级：**
    *   **[#8312](https://github.com/agentscope-ai/QwenPaw/issues/8312)：** 上下文控制失败，导致复杂任务中出现模型“Context Length Exceeded”错误。
    *   **[#8361](https://github.com/agentscope-ai/QwenPaw/issues/8361)：** `memory_search` 中的循环逻辑导致内部自动回溯无法生成稳定响应从而引发崩溃。（修复进行中：[#8457](https://github.com/agentscope-ai/QwenPaw/pull/8457)）。
*   **中优先级：**
    *   **[#8306](https://github.com/agentscope-ai/QwenPaw/issues/8306)：** 由长文件名触发的原子文件写入错误，导致在标准文件系统上生产环境失败。
    *   **[#8265](https://github.com/agentscope-ai/QwenPaw/issues/8265)：** 在发行版打过补丁的 Python 3.11 环境中，插件热安装存在问题。

### 6. 功能请求与路线图动向
*   **UX/无障碍：** 新增功能请求，希望 Web UI 能[更方便地访问未读推送消息](https://github.com/agentscope-ai/QwenPaw/issues/8459)。
*   **路线图预测：** 我们预计下一个稳定版本将包含新的“PawApp”控制平面 ([#7874](https://github.com/agentscope-ai/QwenPaw/pull/7874)) 以及针对工具结果数据保留问题的稳健解决方案 ([#8443](https://github.com/agentscope-ai/QwenPaw/pull/8443))，因为这些都是当前解决主要可扩展性瓶颈的关键。

### 7. 用户反馈总结
用户普遍对丰富的功能集（尤其是 Firecrawl 等搜索提供商的集成）感到满意。然而，对 Windows 桌面客户端的“脆弱性”仍有不满，特别是日志轮转问题和文件句柄锁定问题，这些问题阻碍了长周期后台任务的运行。

### 8. 待办事项观察
*   **[#7785] 实时语音聊天：** 这是一个巨大的功能集（XXXL 规模），自 9 月中旬起一直在开发中。需要更积极的评审，以防止其变得陈旧。
*   **[#7903] 社区集成：** 一项旨在连接多个 QwenPaw 实例的重大架构功能。目前仍处于“WIP”（进行中）状态，需要贡献者投入更多精力，以弥合从“实验性”到“集成化”之间的差距。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目摘要：2026-10-28

## 1. 今日概览
ZeroClaw 在发布 v0.8.7 后正处于高速发展阶段。开发活动十分频繁，目前有大量待处理的 PR（42 个），涵盖了关键安全/稳定性补丁以及长期的架构重构。项目整体状态健康，但随着 v0.9.0 里程碑的临近，在稳定 MCP 和运行时工具集方面仍面临巨大压力。

## 2. 版本发布
*   **[v0.8.7](https://github.com/zeroclaw-labs/zeroclaw)**：这是一次安全与维护更新，包含来自 19 位贡献者的 81 次提交。主要亮点包括：修复 Wasmtime 问题、更新 Rustls 证书验证以及刷新 `tokio` 依赖项。容器镜像也已重新构建。

## 3. 项目进展
*   **发布证明 (Release Attestation)**：[Issue #9101](https://github.com/zeroclaw-labs/zeroclaw/issues/9101) 已关闭，此前成功将三种零散的签名机制合并为一个精简流程，将发布资产数量从 53 个减少至 20 个。
*   **文档同步**：[PR #12019](https://github.com/zeroclaw-labs/zeroclaw/pull/12019) 已合并，将文档翻译版本锁定在 v0.8.7，以确保语言内容与新功能保持一致。

## 4. 社区热门话题
*   **[Issue #7432: Runtime, Dashboard, and Gateway Tracker](https://github.com/zeroclaw-labs/zeroclaw/issues/7432)**：该议题目前有 16 条评论，是 v0.9.0 路线图的核心讨论中心。社区目前正专注于确定剩余运行时缺口的验收标准。
*   **[Issue #9101: Release Attestation Consolidation](https://github.com/zeroclaw-labs/zeroclaw/issues/9101)**：尽管已关闭，但其下方的 11 条评论反映了在现代化 CI 流水线以处理复杂来源要求时的复杂性。

## 5. Bug 与稳定性
*   **S1 - 工作流阻塞**： 
    *   [Issue #12075](https://github.com/zeroclaw-labs/zeroclaw/issues/12075)：因规范化时的 `EPERM` 错误导致 Android shell 工具失败。**修复进行中**：[PR #12080](https://github.com/zeroclaw-labs/zeroclaw/pull/12080)。
    *   [Issue #10807](https://github.com/zeroclaw-labs/zeroclaw/issues/10807)：恢复失败后出现的 MCP 连接中毒 (poisoning)。**修复进行中**：[PR #12061](https://github.com/zeroclaw-labs/zeroclaw/pull/12061)。
*   **S2 - 功能降级**： 
    *   [Issue #11517](https://github.com/zeroclaw-labs/zeroclaw/issues/11517)：网页聊天在刷新后状态丢失。
    *   [Issue #12055](https://github.com/zeroclaw-labs/zeroclaw/issues/12055)：MCP HTTP 客户端连接池问题。
    *   [Issue #12072](https://github.com/zeroclaw-labs/zeroclaw/issues/12072)：OpenAI Codex 流式回退失败。**修复进行中**：[PR #12073](https://github.com/zeroclaw-labs/zeroclaw/pull/12073)。

## 6. 功能需求与路线图信号
*   **会话恢复 (Session Resumption)**：[Issue #12069](https://github.com/zeroclaw-labs/zeroclaw/issues/12069) 和 [PR #12071](https://github.com/zeroclaw-labs/zeroclaw/pull/12071) 请求增加 `/load-session` 命令，以改善 ZeroCode 中的用户导航。极有可能包含在 v0.9.0 中。
*   **专注工作区 (Focused Workspaces)**：[PR #11414](https://github.com/zeroclaw-labs/zeroclaw/pull/11414)（规模：XL）是一项重要的 UI/UX 改进，旨在增加“专注”工作区，表明项目正致力于提升生产力工具的体验。

## 7. 用户反馈总结
用户目前正深受工具调用层“脆弱性”的困扰（如 MCP 中毒、Android 上的 shell 错误以及连接池问题）。由于发布节奏过快（v0.8.6 到 v0.8.7），导致非英语语种的文档更新滞后，维护者目前正在处理此问题 ([Issue #12078](https://github.com/zeroclaw-labs/zeroclaw/issues/12078))。

## 8. 待办事项观察
*   **[PR #9745](https://github.com/zeroclaw-labs/zeroclaw/pull/9745)**：涉及知识图谱作用域的大规模架构变更。该 PR 自 8 月起就已开启，对安全路线图至关重要，目前需要维护者进行深入评审方可推进。
*   **[PR #11596](https://github.com/zeroclaw-labs/zeroclaw/pull/11596)**：支持原生 Claude Code 账号的持续开发工作；自 10 月初以来已出现较大版本偏差，需要与 `master` 分支进行同步。

</details>

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*