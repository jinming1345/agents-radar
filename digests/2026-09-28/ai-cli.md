# AI CLI 工具社区动态日报 2026-09-28

> 生成时间: 2026-09-28 01:10 UTC | 覆盖工具: 7 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Pi](https://github.com/earendil-works/pi)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

## AI CLI 生态系统分析 (2026-09-28)

### 1. 生态系统概览
AI CLI 生态系统当前正处于从“早期实用工具”向“生产级智能体框架”转型的阶段。所有主流工具都在应对一系列共同挑战：稳定长期运行的智能体回话、管理模型上下文协议 (MCP) 集成的开销，以及解决“Windows 对等性”回归问题。随着市场的成熟，竞争的差异化优势正从单纯的模型调用转向稳健的状态管理、安全加固的工具执行，以及跨重启的会话持久性。

### 2. 活动对比
*注：统计数据基于每日摘要中观察到的已报告开放问题和近期 PR 活动。*

| 工具 | 热点问题 | 关键 PR | 讨论 | 发布状态 |
| :--- | :--- | :--- | :--- | :--- |
| **Claude Code** | 10 | 1 | N/A | 无新版本 |
| **OpenAI Codex** | 10 | 10 | 3 | 高频 (Alpha) |
| **Gemini CLI** | 10 | 10 | N/A | 无新版本 |
| **Copilot CLI** | 10 | 1 | N/A | v1.0.89-5 |
| **OpenCode** | 10 | 10 | N/A | 无新版本 |
| **Pi** | 10 | 3 | 2 | 无新版本 |
| **Qwen Code** | 10 | 10 | N/A | 无新版本 |

---

### 3. 共同的功能方向
*   **细粒度权限控制：** 几乎所有工具（Claude, Copilot, Gemini）都面临对“安全模式”或白名单工具执行的强烈需求，正从“全有或全无”的访问权限转向更精细的管理。
*   **会话持久性：** 用户对“僵尸”进程和身份验证令牌过期感到厌倦。Qwen, Codex 和 Claude 都在转向“持久化”或“可恢复”的会话，以确保持续性，即使在主机重启或网络中断后也能恢复。
*   **上下文优化：** 为应对 Token 膨胀和延迟，业界普遍推动采用“外科手术式”的代码提取（基于 AST 感知读取），而非“消防栓式”的文件全量读取。
*   **基础设施对等性：** 强烈需求弥合“本地优先”的 CLI 性能与“托管”（云端/守护进程）一致性之间的鸿沟。

---

### 4. 差异化分析
*   **Codex (OpenAI)：** 重度聚焦于**基于守护进程的架构**和 TUI 性能。它是产品化程度最高的工具，试图弥合 CLI 与完整 IDE/桌面应用之间的鸿沟。
*   **Gemini CLI：** 安全领域的领跑者。它是唯一明确优先处理内核/智能体级别路径遍历修复和密钥脱敏的团队。
*   **OpenCode：** 聚焦于 **v2 核心迁移**，优先考虑结构稳定性而非新功能，并侧重于无头 (headless)/CI/CD 部署。
*   **Pi：** 目前作为实验性的“创新中心”，侧重于本地 LLM 集成 (`llama.cpp`) 和基于扩展的通知系统。
*   **Qwen Code：** 架构上最“企业就绪”，拥有清晰的托管智能体交付和多进程容错路线图。

---

### 5. 社区势头与成熟度
*   **最成熟：** **OpenAI Codex** 和 **Qwen Code** 在架构成熟度上明显处于更高层面，专注于阶段性开发和多进程稳定性，而不仅仅是 UI 修补。
*   **最不稳定：** **Claude Code** 和 **OpenCode** 在合并重大功能后似乎陷入了“稳定性危机”，其用户群报告的高回归率就是证明。
*   **高参与度：** **Copilot CLI** 保持了与企业期望的高度社区一致性，而 **Gemini CLI** 则正在经历最严苛的开发者主导的安全审查。

---

### 6. 趋势信号
*   **“智能体操作系统 (Agentic OS)”模式：** 工具正从简单的 CLI 包装器转向“代理 (broker)”系统（例如 Qwen 的 ACP-bridge，Codex 的 `app-server`）。守护进程化的 AI 智能体正成为新的行业标准。
*   **BYOK (自带密钥/模型) 压力：** 用户对供应商模型锁定 (Vendor Lock-in) 的抵触情绪日益增强。忽视本地/BYOK 模型配置的工具（如 Copilot 和 Claude）正面临显著的阻力。
*   **推理模型膨胀：** 向“思考型”模型（如新一代重推理 LLM）的转变正在破坏现有的 UI/UX 模式；“压缩”逻辑是目前各家面临的首要技术债务。
*   **Windows 作为“二等公民”：** 几乎所有项目中普遍存在的“Mac/Linux 可用但在 Windows 上报错”现象表明，AI 的跨平台 CLI 开发在路径处理和 Shell 衍生逻辑上依然表现脆弱。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

### Claude Code Skills 社区报告（数据截止至 2026-09-28）

Claude Code `anthropics/skills` 仓库已从简单的示例集合转型为一个复杂的开发生态系统。目前的活动重点在于严谨的工具链改进、跨平台稳定性（Windows/Linux）以及针对特定领域的高级自动化。

---

### 1. 热门技能排行
这些技能代表了最活跃的开发方向，旨在扩展 Claude 的操作范围。

*   **[skill-creator](https://github.com/anthropics/skills/pull/1298)** (Open)：用于构建和测试新技能的关键工具。开发者目前正在完善评估测试框架，以解决触发评估不准确的问题，并提升对 Windows 的跨平台支持。
*   **[mcp-builder](https://github.com/anthropics/skills/pull/1742)** (Open)：集成模型上下文协议 (MCP) 服务器的核心工具。目前的重点是更新导入模式以支持 `mcp>=2.0.0`，并实现自定义标头配置。
*   **[proofcore-contract-auditor](https://github.com/anthropics/skills/pull/1771)** (Open)：一种高级 Web3 技能。它对 Solidity/Rust 合约执行自动静态分析，并将安全证明锚定到 TON 区块链上。
*   **[md2video-audio](https://github.com/anthropics/skills/pull/1703)** (Open)：一种零成本自动化技能，可将 Markdown 文档编译为具有 AI 生成配音的专业级 MP4 演示文稿。
*   **[AWT (AI Watch Tester)](https://github.com/anthropics/skills/pull/822)** (Open)：一项高影响力技能，使 Claude 能够执行基于视觉的、零代码的端到端 (E2E) 浏览器测试。
*   **[docx-manager](https://github.com/anthropics/skills/pull/1792)** (Open)：对 DOCX 处理的稳健改进，专注于 LibreOffice 集成、超时错误报告，以及在输出前验证修订记录是否已被清除。

---

### 2. 社区需求趋势
社区正从“如何编写技能”转向“如何确保技能的安全性、高效性和可扩展性”。

*   **稳健性与可观测性：** 对更好的评估框架有强烈需求。用户正困扰于“静默失败”问题，即技能错误触发或消耗过多 Token（例如关于 Token 耗尽的 [Issue #1487](https://github.com/anthropics/skills/issues/1487)）。
*   **企业治理：** 对信任边界有重大关切（例如 [Issue #492](https://github.com/anthropics/skills/issues/492)）。用户希望实现安全、跨组织的共享，而不是手动分发文件。
*   **智能体质量门禁：** 推动多步骤验证，如对抗性审查和任务前校准（例如 [Issue #1385](https://github.com/anthropics/skills/issues/1385)），这表明行业正朝着生产级智能体工作流迈进。

---

### 3. 高潜力待定技能
以下 PR 正处于活跃开发/审查阶段，预示着这些功能可能很快趋于稳定并落地：

*   **[blast-radius](https://github.com/anthropics/skills/pull/1776)：** 针对高风险、大规模破坏性操作（如删除行或撤销访问权限）的智能清单工具，弥合了查询正确性与现实世界影响之间的鸿沟。
*   **[compact-memory](https://github.com/anthropics/skills/issues/1329)：** 一项关于使用符号表示法高效存储智能体状态的提案，旨在直接解决长会话中上下文窗口饱和的问题。
*   **[scnet-hpc](https://github.com/anthropics/skills/pull/1615)：** 增加了通过 Slurm/SSH 工作流在高性能计算 (HPC) 集群上操作的专业级支持。

---

### 4. 技能生态洞察
**社区最集中的需求在于“生产就绪性”——从实验性自动化转向经过验证、安全且资源高效的技能，这些技能必须严格遵守 Token 限制和跨平台技术约束。**

---

# Claude Code 社区摘要：2026-09-28

## 今日要点
社区当前主要关注近期更新后出现的一系列稳定性回归问题，特别是影响 Windows 桌面端体验以及 MCP (Model Context Protocol) 工具集成的问题。用户反馈在会话管理和权限控制方面遇到了显著阻碍，这凸显了提升 `cowork` 和 `bash` 工具子系统稳健性的必要性。

## 发布记录
*过去 24 小时内无新版本发布。*

## 热点问题
1. **[#76694] Cowork：“选择文件夹”功能缺失：** 用户反馈了一个严重的回归问题，文件夹选择上下文菜单被替换为仅上传界面，导致无法进行项目初始化。（35 条评论，28 👍）
2. **[#89398] 斜杠命令选择器输入错误：** Windows 端的一个 UI 故障，除非 "/" 是输入的第一个字符，否则命令面板无法打开，尽管命令本身可以成功执行。（15 条评论，7 👍）
3. **[#93482] Cowork：过期文件写入：** 一个高严重性的数据丢失问题，`device_commit_files` 报告成功，但磁盘上的内容却滞后于最后一次提交。（14 条评论）
4. **[#92007] 模型故障：** `/model opusplan` 命令对长期依赖此模型用户抛出 "Unsupported model" 错误。（7 条评论，12 👍）
5. **[#94675] 安全/提示词注入：** Hook 无法区分用户输入的字符和系统/代理注入的消息，从而形成了一个重大的安全隐患。（3 条评论）
6. **[#93967] 认证/OAuth 403 错误：** 一个 Windows 平台特有的重复性认证失败问题（"missing user:profile scope"），导致用户无法登录 CLI。（3 条评论）
7. **[#89938] 会话“失聪”：** 长时间运行会话中的一个关键缺陷，会导致网桥指针失效，显示主机为“已连接”但所有工作线程均无法运行。（3 条评论）
8. **[#97409] Bash 反斜杠回归：** Windows 用户发现命令中的反斜杠被减半，导致路径处理和脚本执行失败。（1 条评论）
9. **[#97058] 桌面会话容量：** 已结束的线程未能释放槽位，导致进程上限被占满，从而无法开启新的项目会话。（1 条评论）
10. **[#93845] WSL2 沙箱故障：** 一个持续存在的问题，即 `bwrap` 在处理 Windows 挂载路径上的符号链接拒绝访问时失败。（1 条评论）

## 关键 PR 进展
*   **[#97688] 安全默认采集器更新：** 引入了一项更改，确保组织级别的安全默认设置不会被插件级别的日志重写所绕过，从而保证遥测数据的完整性。

## 功能请求趋势
*   **真彩色支持：** 用户对扩展 `/color` 命令以支持现代 24 位终端环境的兴趣浓厚（Issue #74447）。
*   **细粒度权限控制：** 用户呼吁针对已列入白名单的 MCP 工具及其与持久化会话的交互，提供更具可预测性的行为控制。

## 开发者痛点
*   **Windows 环境对齐：** 存在明显的“在 macOS/Linux 上运行正常但在 Windows 上崩溃”的趋势，特别是在 Bash 路径处理、认证范围和桌面 UI 回归方面。
*   **会话生命周期管理：** 频繁出现的“僵尸”会话和进程上限耗尽报告表明，CLI/桌面端应用在任务完成后清理资源方面仍面临困难。
*   **回归敏感度：** 近期的更新（特别是 Cowork/Chat 合并和 MCP 协议更新）引发了多次回归，社区呼吁对核心工具接口进行更严格的测试。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区摘要：2026-09-28

## 1. 今日重点
社区目前正经历一波因近期桌面应用更新导致的稳定性倒退，Windows 和 Linux 用户受影响尤为严重。工程团队正全力聚焦于稳定 `app-server` 守护进程，并通过一系列 PR（拉取请求）着力解决 shell 集成、沙盒配置以及 TUI（终端用户界面）性能问题。

## 2. 版本发布
过去 24 小时内进行了高频发布，重点在于针对 Rust 组件的增量 alpha 版本稳定性优化：
*   **v0.159.0-alpha.11 / .10 / .9 / .8 / .7:** 针对 `rust-v0.159.0` 分支的快速迭代。
*   **v0.158.0-alpha.15.3:** 针对之前 alpha 流的稳定性补丁。

## 3. 热门问题
*   [#48074](https://github.com/openai/codex/issues/48074) **Windows 终端闪烁：** 高影响度 Bug，Codex 守护进程会导致控制台反复闪烁；74 个点赞。
*   [#48189](https://github.com/openai/codex/issues/48189) **Linux 任务挂起：** 26.924.20706 版本回归问题，导致任务挂起；42 个点赞。
*   [#48422](https://github.com/openai/codex/issues/48422) **Shell 进程闪烁：** 另一个关于执行 Shell 命令时出现可见控制台窗口的报告；17 个点赞。
*   [#48554](https://github.com/openai/codex/issues/48554) **Linux SIGCHLD 处理程序：** 已确认 Linux 进程回收失败的技术根本原因；12 个点赞。
*   [#42739](https://github.com/openai/codex/issues/42739) **项目消失：** UI Bug，应用更新后本地项目丢失。
*   [#48333](https://github.com/openai/codex/issues/48333) **Windows 启动转圈：** 应用程序在启动时卡住，直到强制结束 `codex.exe` 守护进程。
*   [#48463](https://github.com/openai/codex/issues/48463) **引导超时：** Windows 用户在更新后卡在加载界面。
*   [#48356](https://github.com/openai/codex/issues/48356) **Git 查询干扰：** 普通文本消息触发了不必要的后台 Git 查询。
*   [#40147](https://github.com/openai/codex/issues/40147) **路径损坏：** 智能体迁移逻辑错误地将 `.claude/` 路径重命名为 `.Codex/`。
*   [#46848](https://github.com/openai/codex/issues/46848) **语音模式失效：** Windows 上导致语音模式初始化失败的连接问题。

## 4. 关键 PR 进展
*   [#48829](https://github.com/openai/codex/pull/48829) **沙盒就绪性：** 增加对 Windows 沙盒配置的轮询，以避免超时。
*   [#48812](https://github.com/openai/codex/pull/48812) **历史记录预热：** 为空闲线程引入 `prewarm_with_history` 以降低延迟。
*   [#48799](https://github.com/openai/codex/pull/48799) **Windows 终端修复：** 启用 SGR 鼠标报告，以解决输入转换问题。
*   [#48796](https://github.com/openai/codex/pull/48796) **结构化错误：** 增加 Guardian 模式中断路器中断的可见性。
*   [#48805](https://github.com/openai/codex/pull/48805) **UX 优化：** 允许在模态框处于活动状态时滚动转录内容。
*   [#48772](https://github.com/openai/codex/pull/48772) **Socket 修复：** 改进针对长符号链接路径的 Unix socket 连接处理。
*   [#564](https://github.com/openai/codex/pull/564) **监视模式（Watch Mode）：** 长期以来的需求，通过 `// CODEX: <instruction>` 注释触发 Codex。
*   [#48827](https://github.com/openai/codex/pull/48827) **TUI 可访问性：** 为转录链接添加手型指针光标支持。
*   [#48819](https://github.com/openai/codex/pull/48819) **可观测性：** 为工具/技能上下文指标添加了明确的直方图分桶。
*   [#48761](https://github.com/openai/codex/pull/48761) **终端 UX：** 在紧凑模式下启用“隐藏行数”可视化。

## 5. 热门讨论
**想法**
*   [#46658](https://github.com/openai/codex/discussions/46658) 作为共享系统对模型和推理算力进行自适应分配。
*   [#26397](https://github.com/openai/codex/discussions/26397) 关于 Codex 和 Claude Code 之间项目上下文重复的摩擦点。

**问答**
*   [#48032](https://github.com/openai/codex/discussions/48032) 请求在 Windows 本地项目中实现持续的 Google Drive 集成。
*   [#48512](https://github.com/openai/codex/discussions/48512) 关于如何使用自定义部署的 OpenAI 模型运行 Codex 的指南。

**展示与分享**
*   [#48529](https://github.com/openai/codex/discussions/48529) "Jev Social"：一款基于浏览器的社交媒体研究工具。
*   [#48733](https://github.com/openai/codex/discussions/48733) "Codex Monitor"：一个用于在 Windows 上跟踪配额和状态的置顶小部件。

## 6. 功能需求趋势
*   **上下文管理：** 改善不同 AI 工具和云平台（如 Google Drive）之间项目上下文的同步。
*   **TUI 优化：** 请求对任务可见性进行更细粒度的控制，例如删除冗余的“当前（current）”徽章以及更好的滚动处理。
*   **运维透明度：** 用户希望更清晰地了解 Token 的消耗原因（使用限额担忧），并为守护进程后台任务提供清晰的状态监控。

## 7. 开发者痛点
*   **进程生成/UI 干扰：** Windows 上频繁的终端闪烁和后台进程（与 `app-server` 钩子和 Git 集成有关）仍然是最令人烦恼的问题。
*   **更新不稳定：** 最新桌面版本（26.924.x）中的回归周期导致 Linux 和 Windows 高级用户频繁回滚版本。
*   **守护进程僵化：** 共享的 `app-server` 守护进程架构导致应用容易进入“卡死”状态，需要手动终止进程才能解决。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

## Gemini CLI 社区摘要 (2026-09-28)

### 1. 今日重点
过去 24 小时内，开发者关注点已大幅转向安全加固与稳定性，涌现出一批修复路径遍历、密钥泄露及 API 请求处理的关键 PR。与此同时，社区反馈了大量关于子智能体（subagent）行为异常和智能体挂起的问题，这表明提升智能体可靠性已成为当前的重中之重。

### 2. 发布版本
*无*

### 3. 热门议题
1. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) - 通用智能体挂起：** 社区对此抱怨强烈（8 个点赞），智能体在执行诸如创建文件夹之类的简单任务时会挂起。
2. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) - 子智能体恢复 bug：** 智能体在达到轮次限制后仍报告“GOAL”成功，掩盖了实际失败。
3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) - Bash 亲和性：** 一项大规模架构提案，旨在更好地利用原生 bash POSIX 工具进行代码探索。
4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) - AST 感知工具：** 评估基于 AST 的文件读取对减少 token 臃肿和导航错误的影响。
5. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) - 自动内存安全：** 急需对持久化内存日志中的敏感信息进行确定性屏蔽。
6. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) - Wayland 浏览器支持：** 浏览器子智能体在 Wayland 系统上运行失败。
7. **[#22267](https://github.com/google-gemini/gemini-cli/issues/22267) - settings.json 被绕过：** 浏览器智能体无法正确遵循用户定义配置覆盖的 bug。
8. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246) - 工具限制 400 错误：** 当作用域内注册的工具过多时，智能体会崩溃。
9. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) - 技能利用率不足：** 用户反馈除非强制调用，否则模型会忽略自定义子智能体。
10. **[#22672](https://github.com/google-gemini/gemini-cli/issues/22672) - 破坏性行为：** 关于智能体执行 `git reset --force` 等激进命令的担忧。

### 4. 关键 PR 进展
1. **[#29521](https://github.com/google-gemini/gemini-cli/pull/29521) - 检查点容器化：** 防止旧版检查点路径中路径遍历的关键安全修复。
2. **[#29522](https://github.com/google-gemini/gemini-cli/pull/29522) - Glob 工具验证：** 防止 glob 模式解析到预期搜索根目录之外。
3. **[#29523](https://github.com/google-gemini/gemini-cli/pull/29523) - 检查器环境加固：** 从第三方检查器二进制文件中移除密钥并限制输出。
4. **[#29527](https://github.com/google-gemini/gemini-cli/pull/29527) - API 400 错误修复：** 确保请求历史记录不以模型轮次结尾，修复流式传输/回退问题。
5. **[#29528](https://github.com/google-gemini/gemini-cli/pull/29528) - 无头模式信任传播：** 修复了无头模式下文件夹信任无法正确同步的“大脑分裂”状态。
6. **[#29404](https://github.com/google-gemini/gemini-cli/pull/29404) - 模型发现：** 添加 `gemini models list -o json` 以便更好地进行程序化集成。
7. **[#29411](https://github.com/google-gemini/gemini-cli/pull/29411) - 恢复逻辑：** 改进 `--resume`，使其定位到最近活跃的会话，而非仅仅是最新创建的会话。
8. **[#29525](https://github.com/google-gemini/gemini-cli/pull/29525) - 工作区信任：** 防止工作区信任衍生自不受信任的智能体设置。
9. **[#29294](https://github.com/google-gemini/gemini-cli/pull/29294) - 终端 UI：** 修复了由并发渲染/键入导致的闪烁问题。
10. **[#29407](https://github.com/google-gemini/gemini-cli/pull/29407) - 序列化修复：** 更正 JSON 导出中循环引用的处理。

### 5. 功能需求趋势
*   **智能体自我治理：** 对智能体通过解释自身标志、快捷键和最佳实践来实现“自我引导”的需求日益增长。
*   **Token 效率：** 持续推动从“全量式”文件读取转向“精准/手术式”代码提取（AST 感知）。
*   **任务透明度：** 请求通过共享命令（`/chat share`）提高子智能体轨迹的可见性。

### 6. 开发者痛点
*   **终端稳定性：** 在高输出会话期间实现“无闪烁”操作仍是提升用户体验的持续需求。
*   **静默失败：** “通用智能体挂起”和“子智能体虽失败但报告成功”的问题表明，智能体执行循环中亟需更好的健康检查/超时监控。
*   **配置漂移：** 难以确保 `settings.json` 的覆盖设置能在所有子智能体（浏览器/通用）中统一生效。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区摘要 | 2026-09-28

## 1. 今日重点
最新版本 (v1.0.89-5) 改进了交互式用户体验，优化了输入处理，并引入了对 Claude Code 风格规则文件的支持，标志着跨工具配置趋于统一的趋势。开发重心依然高度聚焦于稳定性，目前针对认证持久性、桌面环境会话管理以及 AI 工具权限细粒度控制的反馈有所增加。

## 2. 版本发布
**v1.0.89-5**
*   **UX 改进：** 在 `ask_user` 和引导输入中左键单击现在可以正确放置光标。
*   **配置：** 增加了对 `.claude/rules` 作为自定义指令的支持，便于迁移基于规则的智能体行为。
*   **UI/UX：** 侧边栏会话现在为未读对话增加了“蓝点”指示器，优化了工作流管理。

## 3. 热门问题
1.  **[#1973](https://github.com/github/copilot-cli/issues/1973)**: *功能请求：工具白名单。* 用户希望在不开启破坏性工具或触发持续手动审批的情况下，允许执行安全操作（如 `git status`）。(29 👍)
2.  **[#1857](https://github.com/github/copilot-cli/issues/1857)**: *取消排队消息。* 用户对于在智能体忙碌或压缩状态下无法取消已排队命令感到不满。(29 👍)
3.  **[#3709](https://github.com/github/copilot-cli/issues/3709)**: *BYOK/本地模型切换。* `/model` 选择器目前会忽略本地托管/BYOK 模型，限制了智能体的灵活性。(33 👍)
4.  **[#4929](https://github.com/github/copilot-cli/issues/4929)**: *认证令牌刷新失败。* 一个严重 bug，导致长时间运行的进程丢失认证且无法在不完全重启的情况下恢复。
5.  **[#4905](https://github.com/github/copilot-cli/issues/4905)**: *桌面端会话过期。* “凭据注册”错误导致长寿命会话中的 MCP 目录过期。
6.  **[#2627](https://github.com/github/copilot-cli/issues/2627)**: *可配置系统提示词。* 高额的 Token 开销（约 20k Token）占用了大量上下文窗口；用户希望精简指令。(21 👍)
7.  **[#1613](https://github.com/github/copilot-cli/issues/1613)**: *Git 工作树管理。* 用户希望 CLI 能够原生创建/销毁工作树，以进行隔离的任务执行。(38 👍)
8.  **[#179](https://github.com/github/copilot-cli/issues/179)**: *全局工具配置。* 用户强烈需求一个全局配置文件来管理权限，以对标竞争工具。(43 👍)
9.  **[#4924](https://github.com/github/copilot-cli/issues/4924)**: *自定义智能体发现。* 工作树会话中的竞态条件导致扫描器遗漏了 `.github/agents` 中的自定义智能体。
10. **[#4950](https://github.com/github/copilot-cli/issues/4950)**: *BYOK 的贪婪采样。* CLI 强制使用 `temperature: 0`，这降低了推理模型的效果。

## 4. 关键 PR 进展
*   **[#3817](https://github.com/github/copilot-cli/pull/3817)**: *kCreate "#"*. 与密钥创建/处理相关的微小贡献。

## 5. 功能请求趋势
*   **智能体自主性与安全：** 从“全有或全无”的工具权限向细粒度白名单和基于配置的安全策略转变。
*   **上下文优化：** 用户强烈要求“精简”系统提示词，并改进内存压缩机制，以避免丢失当前任务的上下文。
*   **BYOK/模型中立：** 用户越来越多地使用本地/自定义模型，对模型选择器的“封闭性”及强制采样参数感到挫败。

## 6. 开发者痛点
*   **“会话疲劳”：** 频繁反馈认证令牌过期、MCP 服务器崩溃/重连、长运行进程状态陈旧，导致用户被迫重复重启 CLI。
*   **上下文管理：** 用户在“压缩”进程上遇到困难，偶尔会导致当前任务的指令或上下文丢失。
*   **Git 工作流摩擦：** 缺乏与工作树的深度集成；从 CLI 启动 VS Code 时存在意外的环境变量泄露（如 `GIT_CONFIG_VALUE`）。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区摘要：2026-09-28

## 今日重点
社区目前致力于 v2 核心运行的稳定性，重点关注 MCP 服务器的内存管理，并修复桌面应用中跨窗口持久化的问题。虽然过去 24 小时内没有发布新版本，但维护者正在积极处理积压的自动化清理 PR，以提升核心可靠性。

---

## 版本发布
*过去 24 小时内无发布。*

---

## 热门议题
1. **[#13984](https://github.com/anomalyco/opencode/issues/13984)**: **CLI 剪贴板失效。** 这是一个长期存在且关注度极高的问题（64 条评论，32 个 👍），用户无法将内容粘贴到 CLI，尽管 UI 显示成功。
2. **[#32157](https://github.com/anomalyco/opencode/issues/32157)**: **提示词交付控制。** 高需求功能请求（84 个 👍），要求对传入的用户提示词区分 `queue`、`steer` 和 `break` 语义。
3. **[#51003](https://github.com/anomalyco/opencode/issues/51003)**: **MCP 内存泄漏。** 报告指出全局 stdio 服务器会为每个目录生成一次，导致多目录工作流用户的内存被大量耗尽。
4. **[#37495](https://github.com/anomalyco/opencode/issues/37495)**: **SQLite WAL 文件膨胀。** 一个严重的性能 Bug，多个并发连接阻止了 WAL 检查点，导致磁盘空间占用达到 10-15GB。
5. **[#49027](https://github.com/anomalyco/opencode/issues/49027)**: **配置透传错误。** 代理配置字段被原样转发给上游提供商，导致 `invalid_request_error` 响应。
6. **[#51723](https://github.com/anomalyco/opencode/issues/51723)**: **链接解析 Bug。** 桌面应用将包含斜杠的代码片段（如 `write/edit`）误认为是文件路径，从而触发“文件未找到”错误。
7. **[#51689](https://github.com/anomalyco/opencode/issues/51689)**: **"Go" 订阅验证。** 多份报告称，有效的 OpenCode Go 订阅在桌面应用中验证失败或无法访问模型。
8. **[#32825](https://github.com/anomalyco/opencode/issues/32825)**: **配置目录冲突。** `OPENCODE_CONFIG_DIR` 在 v2 中错误地覆盖了全局设置，而非作为扩展存在。
9. **[#50260](https://github.com/anomalyco/opencode/issues/50260)**: **孤立的数据库行。** 会话删除无法清理 v2 之前的遗留数据行，导致数据库随时间推移而臃肿。
10. **[#51748](https://github.com/anomalyco/opencode/issues/51748)**: **窗口权限覆盖。** 打开多个桌面窗口会导致权限处理程序被覆盖，进而导致会话访问被拒绝。

---

## 关键 PR 进展
1. **[#51743](https://github.com/anomalyco/opencode/pull/51743)**: 修复过大的 MCP stdio 数据帧问题，且不会断开连接。
2. **[#51741](https://github.com/anomalyco/opencode/pull/51741)**: 处理返回空内容的提供商所产生的 "length" 完成原因。
3. **[#46912](https://github.com/anomalyco/opencode/pull/46912)**: 通过确保在进程退出前刷新 stdout 来防止 CLI 内容截断。
4. **[#51736](https://github.com/anomalyco/opencode/pull/51736)**: 为 `opencode web` 添加 `--no-open` 标志，用于无头/CI/服务器端部署。
5. **[#50221](https://github.com/anomalyco/opencode/pull/50221)**: 更新 nixpkgs 以支持 Bun 1.4。
6. **[#45759](https://github.com/anomalyco/opencode/pull/45759)**: 允许 Console 模型在启动网络故障后恢复，提升韧性。
7. **[#45676](https://github.com/anomalyco/opencode/pull/45676)**: 为 Termux（移动端/Android 环境）添加通知支持。
8. **[#45608](https://github.com/anomalyco/opencode/pull/45608)**: 将 v2 包入口解析功能反向移植到 v1 桌面 Node 运行时。
9. **[#45598](https://github.com/anomalyco/opencode/pull/45598)**: 集中化管理窗口权限处理程序，以防止跨窗口干扰。
10. **[#45578](https://github.com/anomalyco/opencode/pull/45578)**: 将 LLM 请求与较新的 GPT-5 `max_completion_tokens` API 要求进行同步。

---

## 功能请求趋势
*   **工作流控制**：对提示词注入的细粒度控制（`queue` 对比 `steer`）以及抑制启动开销的能力（例如 `OPENCODE_DISABLE_INSTALL`）。
*   **桌面可用性**：与浏览器功能保持一致，例如“重新打开关闭的标签页”和 Mermaid 图表预览。
*   **开发者体验**：无头模式操作支持，以及为 CLI 子命令提供更好的错误反馈。

---

## 开发者痛点
*   **基础设施可靠性**：关于 API 密钥验证（特别是针对 OpenCode Go）以及 v2 相比 v1 表现不一致的高频抱怨。
*   **资源管理**：关于内存消耗（MCP 服务器生成）和磁盘空间（SQLite WAL 文件膨胀）的严重困扰。
*   **集成稳定性**：对配置目录路径的困惑，以及混合使用 v1/v2 配置时出现的意外崩溃。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi 社区摘要：2026-09-28

### 1. 今日焦点
过去 24 小时内，Pi 生态系统中的调试活动激增，重点主要集中在会话初始化和上下文管理中的性能回退问题。此外，提升 Pi 能力的关注度也大幅提升，其中一个重要的 PR 引入了“Codemode”和 MCP 支持，旨在提升智能体（Agentic）的互操作性。

### 2. 发布版本
*过去 24 小时内无新版本发布。*

### 3. 热门问题
1. **[#10105](https://github.com/earendil-works/pi/issues/10105)**：严重的性能回退，扩展程序重载导致会话创建时间从 4 秒激增至 280 秒以上。
2. **[#10104](https://github.com/earendil-works/pi/issues/10104)**：与上述问题相关，会话创建延迟随时间累积，表明存在内存泄漏或生命周期管理效率低下。
3. **[#10033](https://github.com/earendil-works/pi/issues/10033)**：推理模型的自动压缩失败；摘要提示词中包含完整的思维链（Thinking blocks）导致上下文窗口溢出。
4. **[#9010](https://github.com/earendil-works/pi/issues/9010)**：由于缺乏子代理/工作进程隔离，压缩期间出现内存峰值；历史记录在主进程中被重复复制。
5. **[#9974](https://github.com/earendil-works/pi/issues/9974)**：使用 `llama.cpp` 后端时出现工具调用损坏；SSE 流处理程序错误地解析了原始数据。
6. **[#8810](https://github.com/earendil-works/pi/issues/8810)**：新会话在使用扩展程序注册的提供程序时，偶尔会忽略用户配置的 `defaultProvider` 设置。
7. **[#10095](https://github.com/earendil-works/pi/issues/10095)**：可观测性缺失；通过 `modelRegistry` 进行的内部 LLM 调用绕过了标准生命周期事件，导致遥测失效。
8. **[#10031](https://github.com/earendil-works/pi/issues/10031)**：界面卡死；当用户使用 `<esc>` 中断操作时，Pi 会卡在 "Working..." 状态。
9. **[#7739](https://github.com/earendil-works/pi/issues/7739)**：性能目标设定；正式确立启动延迟预算，以与 `jcode` 竞争。
10. **[#10097](https://github.com/earendil-works/pi/issues/10097)**：循环行为；用户报告在使用本地 `llama.cpp` 实例时，会出现持续且重复发送消息的问题。

### 4. 关键 PR 进展
1. **[#10040](https://github.com/earendil-works/pi/pull/10040)**：重大的架构更新，为智能体添加了“Codemode”和模型上下文协议 (MCP) 支持。
2. **[#8572](https://github.com/earendil-works/pi/pull/8572)**：持续跟进对 Amazon Bedrock "Mantle" API 接口的支持，以适配更新的模型。
3. **[#10100](https://github.com/earendil-works/pi/pull/10100)**：[已修复] 正确保留了来自 Claude/OpenRouter 的推理签名增量（deltas），防止思维痕迹丢失。
4. **[#10099](https://github.com/earendil-works/pi/pull/10099)**：[已关闭] 学生提交的 Git 实验（社区增长指标）。

### 5. 热门讨论
*   **展示与分享 (Show and Tell)**
    *   **[#10107](https://github.com/earendil-works/pi/discussions/10107)**：`omp-ntfy` 扩展发布，支持为 Pi 的长时间运行任务向移动端发送零配置推送通知。
    *   **[#10098](https://github.com/earendil-works/pi/discussions/10098)**：用户分享的关于 `/new` 聊天模型持久化及通过压缩处理 413 错误的修复方案。
*   **问答 (Q&A)**
    *   **[#3373](https://github.com/earendil-works/pi/discussions/3373)**：关于社区推荐插件和扩展的长期讨论帖。

### 6. 功能需求趋势
*   **可观测性与调试：** 用户强烈要求提高工具渲染错误的可见性，并提供透明的 LLM 调用日志。
*   **自定义配置：** 越来越多的请求要求允许用户自定义 UI 状态的文本/颜色（例如“操作已中止”）。
*   **凭据/鉴权管理：** 推动扩展程序以编程方式实现 API-key 的持久化，而非依赖手动编辑文件。

### 7. 开发者痛点
*   **扩展程序臃肿：** 拥有大量插件的开发者正遭遇严重的启动延迟，表明扩展加载机制需要引入懒加载或缓存机制。
*   **上下文管理：** 推理模型目前“话太多”，导致上下文窗口被思维块填满，使得自动压缩功能失效。
*   **进程隔离：** 目前针对资源密集型任务（如压缩）缺乏工作进程隔离，导致内存峰值和界面阻塞问题。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区摘要 (2026-09-28)

## 1. 今日重点
社区焦点仍高度集中于 **Managed Agent 架构**（Stage D/F/H 实现），并在持久化会话生命周期管理及多进程容错方面取得了重大进展。开发者们同时也正优先处理关键的安全加固工作，特别是解决模型配置中的凭据泄露问题以及与代理（Proxy）相关的安装障碍。

## 2. 发布记录
*过去 24 小时内无新版本发布。*

## 3. 热门问题
1.  **[#12380] Proposal: Managed Agent dual-path architecture**: 用于追踪 Agent 交付阶段的主议题，对于理解会话/工作空间绑定的未来架构至关重要。
2.  **[#12737] feat(acp-bridge): Hosted Legacy/Managed engines**: 支持主机同时运行两种引擎类型。
3.  **[#12826] Webview crash (CodeMirror update race)**: 关键 Bug，在 SSH 远程环境中使用 `@file` 引用时会导致崩溃。
4.  **[#12856] Security: Credential leakage in model selectors**: 重大安全隐患，包含用户信息的 `baseUrl` 会在设置中被明文输出。
5.  **[#12793] feat(managed-agent): Stage D public API contract**: 规范化了会话查询和事件重放的交互层。
6.  **[#12835] Skill tool injection bug**: 配置错误导致被排除的工具仍会被注入到系统提示词（System Prompt）中。
7.  **[#12874] UI: Right-side panel toggle failure**: macOS 上的回归问题，侧边栏在打开后无法关闭，体验欠佳。
8.  **[#12859] Runtime Broker: fastjson2 decimal persistence**: 数据完整性问题，影响 `BigDecimal` 值的读写。
9.  **[#12829] fix(cua-sdk): Proxy configuration**: 修复了长期存在的问题，即原生载荷下载无法遵循系统代理设置。
10. **[#12878] Ollama 400 error (Zero-argument tools)**: 为适配 Ollama 对工具 JSON Schema 的严格要求而进行的兼容性修复。

## 4. 关键 PR 进展
1.  **[#12839] W0e terminal recovery fences**: 添加了逻辑以处理运行时日志（Journal）的权威性丢失，防止状态损坏。
2.  **[#12582] Remote runtimes (Qwen, Codex, Claude)**: 对 A2A 层进行了重大扩展，支持通过注册令牌进行远程执行。
3.  **[#12107] perf(core): Parallel extension loading**: 在保持依赖顺序的前提下提升启动性能。
4.  **[#12848] Hosted foreground Shell turns**: 在私有 Hosted 工作空间循环中启用交互式 Shell 命令。
5.  **[#12881] Session lifecycle durability (Stage D4)**: 为会话实现稳健的归档/删除操作。
6.  **[#12585] ACP transcript replay**: 增强守护进程 UI，允许重放嵌入式文本资源。
7.  **[#12855] Stage H records & Task List**: 集中化管理会话任务的权限控制。
8.  **[#12183] Managed extensions directory**: 通过基于目录的扩展发现机制简化部署。
9.  **[#12873] FG6a Hosted Broker reply-loss gates**: 为 Broker 中的连接丢失/回复丢失增加弹性测试。
10. **[#12862] Scrub credential egress**: 安全补丁，防止敏感的 `userinfo` 字符串通过设置泄露。

## 5. 功能需求趋势
*   **Agent 弹性与持久化**: 主要推动力是实现“可恢复”的 Agent 状态，确保在重启、主机重启动或网络中断时不会丢失当前工作（Issues #12766, #12670）。
*   **基础设施对齐**: 将“Hosted”（服务端/云端）Agent 的行为与本地 CLI 执行的性能和可靠性对齐。
*   **UI 优化**: 请求改进上下文管理，例如支持将选定的消息文本直接引用到提示词编辑器中 (#12682)。

## 6. 开发者痛点
*   **配置安全**: 用户正在为模型 `baseUrl` 设置中无意暴露凭据的问题而困扰。
*   **安装/更新稳定性**: “陈旧”的状态文件和无法感知代理的下载程序持续导致“更新卡住”循环，尤其是在 Windows 和 macOS 上。
*   **调试可见性**: 开发者发现很难追踪某些 Agent 为何运行，或者难以明确具体的工具注入情况，导致 CLI 调试过程异常复杂。

</details>

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*