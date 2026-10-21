# AI 基础设施日报 2026-10-22

> 生成时间: 2026-10-21 22:16 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

## AI基础设施生态报告：2026-10-22

### 1. 生态概览
当前的AI基础设施领域正处于向“智能体就绪（Agentic Readiness）”狂奔的阶段，所有主流项目都在重构自身，以应对复杂的多轮推理和工具调用工作流。虽然推理服务引擎（SGLang）和本地运行环境（llama.cpp/Ollama）在多模态和MoE支持上趋于一致，但由于近期架构的快速迭代，稳定性依然是主要挑战。LiteLLM的安全事件敲响了警钟：在快速演进的AI技术栈中，盲目采用供应链依赖项存在显著风险。

### 2. 活跃度对比
*注：数据源自2026-10-22摘要；特定Issue/PR数量为项目自行预估值。*

| 项目 | 报告问题 (活跃) | 近期PR/活跃重点 | 发布状态 |
| :--- | :--- | :--- | :--- |
| **SGLang** | ~8 (关键/高优先级) | 多节点 GB300, 智能体 PPD | 稳定 |
| **llama.cpp** | ~3 (回归问题) | 多模态, FP8/NVFP4 量化 | 活跃 (b11802) |
| **Ollama** | ~5 (解析/云服务) | 工具调用稳定性, Apple Silicon | 活跃 (v0.40.8) |
| **LiteLLM** | ~4 (安全/防护) | 代理加固, RCE 清理 | 补丁版本 (v1.106.2) |
| **Unsloth** | ~4 (稳定性) | VRAM卸载, DPO/GRPO 训练 | 稳定 |

### 3. 模型支持竞赛
对“下一代”推理和代码模型支持的竞速，是目前的主要差异化竞争点：
*   **领跑者 - llama.cpp：** 通过将 `SenseNova U1` 和 `Flint` 架构快速集成到核心 `ggml` 格式中，确立了基准，引领了其他运行环境的步伐。
*   **专业化 - Unsloth：** 在微调领域占据优势，集成了 `MOSS-Image` 并针对 `DeepSeek-V4.1-Flash` 的专家卸载进行了优化。
*   **集成化 - Ollama：** 扮演聚合器角色，通过其易用的运行框架，将 `Flint` 和 `Apple Foundation Models` 带给终端用户。
*   **掉队者 - vLLM：** 目前处于静默/更新失败状态，可能预示着内部架构正在进行重构或存在不稳定，导致其将当前的舆论焦点让位给了 SGLang。

### 4. 性能前沿
优化已不再仅仅关注“每秒Token数”，更在于内存效率和多节点吞吐量：
*   **KV缓存管理：** SGLang 凭借 **PPD (Prefill-on-Decode)** 处于领先地位，旨在处理多轮智能体流量，避免冗余的KV传输。
*   **量化：** `llama.cpp` 正积极将 **FP8/NVFP4** 引入核心，而 Unsloth 则通过将查找表卸载到磁盘/主机内存来解决 VRAM 占用过高的问题。
*   **特定硬件内核：** SGLang 优先考虑 **GB300 "megakernels"** 以降低主机端开销，而 `llama.cpp` 则专注于 **SYCL/Hexagon** 以适配多种硬件。

### 5. 层级定位
*   **服务引擎 (SGLang)：** 针对高并发生产环境、多节点部署和超大规模模型推理（DeepSeek-V4.1）的深度堆栈优化。
*   **本地运行环境 (llama.cpp / Ollama)：** 桥接原始硬件执行与开发者 UX。`llama.cpp` 提供核心 C++ 引擎；`Ollama` 提供 API 抽象层。
*   **网关 (LiteLLM)：** 控制平面。专注于安全性、供应商抽象、支出日志记录和跨租户缓存。
*   **微调 (Unsloth)：** 模型适配的加速层。专注于训练效率、VRAM 优化微调及低资源占用的架构适配。

### 6. 趋势信号
*   **智能体延迟：** 从简单的对话向多轮智能体循环的转变，正导致“上下文截断”和“思考过程”泄露。**建议：** 如果正在构建智能体，请优先考虑支持有状态 Token 缓存的基础设施（如 SGLang 的 HiCache/PPD）。
*   **供应链风险：** LiteLLM 的被入侵凸显了基础设施层“快速行动”的危险。**建议：** 审计 CI/CD 流水线，并对所有代理/网关层实施更严格的依赖项锁定。
*   **内存墙：** 我们正在触及消费级和企业级显卡的 VRAM 极限。**建议：** 基础设施团队应推进激进的 FP8/NVFP4 量化，并将嵌入表的主机端卸载研究作为即将到来的大型 MoE 部署的标准实践。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 动态摘要：2026-10-22

SGLang 开发生态系统目前高度聚焦于稳定先进的服务模式，包括 GB300 多节点部署以及使用 HiCache 的复杂智能体（Agentic）工作负载。当前的工程重点在于优化 DeepSeek-V4.1 的性能，并解决高并发环境下与 CUDA 相关的稳定性问题。

### 1. 今日亮点
*   **智能体与多轮对话聚焦：** 社区正在推动通过“PPD”（Prefill-on-Decode，解码时预填充）机制优化多轮智能体流量，旨在复用 RadixCache 中的 Token，从而避免代价高昂的“预填充到解码” KV 缓存传输 (#45416)。
*   **基础设施加固：** 持续致力于解决不稳定的 CI 基础设施和 CUDA 核心转储跟踪问题，并正在对 CPU 测试套件进行大规模清理，以缩短 PR 周转周期 (#45672, #42752)。

### 2. 发布与重大变更
*   *过去 24 小时内无报告。*

### 3. 新模型与硬件支持
*   **寒武纪 MLU 后端：** 已启动新路线图，旨在实现 SGLang 对寒武纪 MLU 硬件的支持 (#45615)。
*   **昇腾 W8A8 量化：** 已发起功能请求，旨在为昇腾 NPU 后端支持对称静态压缩张量（W8A8）(#45569)。
*   **AMD/MI355X 优化：** 正在积极跟踪 `gfx950` 硬件上 GatedDeltaNet 和 QSA（Query Sparse Attention）的性能 (#44304)。

### 4. 性能与优化
*   **MegaMoE 预填充：** 针对 BF16 MegaMoE 预填充切片提出优化方案，旨在通过调整 DeepGEMM 中的 `BLOCK_M` 启发式参数来降低首字延迟（TTFT）(#45637)。
*   **DeepSeek-V4.1 解码：** 引入 NVIDIA “megakernel” 插件以最小化解码图之间的主机端开销，旨在降低 GB300 系统上的延迟 (#45450)。
*   **MLA 捕获缩放：** 将预填充 CUDA 图捕获的默认值设为 `min(8192, chunked_prefill_size)`，以便在不造成过度内存膨胀的情况下更好地支持 MLA 工作负载 (#45565)。

### 5. 稳定性与回归问题
*   **严重：启动 OOM (GB300)：** 使用 `--tokenizer-worker-num 32` 和 `cuda_vmm` 的多节点部署在启动时会出现瞬时 OOM (#45354)。
*   **高：HiCache L3 故障：** 在 DSA 模型上使用 `O_DIRECT` 存储后端会导致静默失败，将 0 字节对象视为命中，从而导致输出损坏 (#45563)。
*   **高：调度器崩溃：** 存在一个回归问题：当队列为空时，使用 `--max-queued-requests 0` 会导致调度器崩溃 (#45510)。
*   **中：DeepSeek Thinking 泄露：** 当启用 `SGLANG_DEFAULT_THINKING=1` 时，对于缺乏特定推理参数的请求，思维链（Thinking）Token 会被错误地合并到 `content` 字段中 (#45614)。
*   **中：上下文截断：** 当未设置 `--context-length` 时，SGLang 会静默地从 HF 配置中推导上下文长度，这可能导致潜在的静默截断问题 (#45622)。

### 6. 对应用开发者的意义
*   **智能体延迟：** 如果您正在构建智能体工作流，请密切关注 [PPD (Prefill on Decode) RFC #45416](#45416)。该机制通过消除冗余的预填充步骤，可以显著降低多轮对话的轮间延迟。
*   **可靠性警告：** 如果您依赖 `Hicache`，请注意 `O_DIRECT` 数据损坏漏洞 (#45563)。在 DSA 索引器对齐修复方案部署之前，请避免在生产环境中使用。
*   **配置最佳实践：** 请在部署脚本中显式设置 `--context-length`。目前，由于内部日志记录限制，依赖默认配置可能会导致静默截断问题 (#45622)。
*   **模型调优：** 对于 DeepSeek-V4.1 用户，如果您启用了 `SGLANG_DEFAULT_THINKING`，请确保显式设置 `reasoning_effort` 请求头，以防止 API 响应中出现“思维内容泄露” (#45614)。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 摘要：2026-10-22

### 1. 今日亮点
核心框架继续在多模态和高级精度格式方面积极扩展，增加了对 **SenseNova U1** 的支持，并在多个后端实现了 **FP8/NVFP4** 量化缩放的显著进展。基础设施团队需关注 `llama-server` V1 消息 API 的关键更新，以及为实现更强大的工具使用（tool-use）集成而对 Jinja 模板引擎进行的持续改进。

### 2. 版本发布与重大变更
*   **b11802:** 修复了 Jinja 解析器中命名空间属性屏蔽的问题 ([#30941](https://github.com/ggml-org/llama.cpp/pull/30941))。
*   **b11801:** 增加了对 **SenseNova U1** 的支持（理解分支，U1.5-8B-MoT）([#28919](https://github.com/ggml-org/llama.cpp/pull/28919))。
*   **b11800:** 引入了用于 QSA 掩码评分的全新融合算子 ([#30640](https://github.com/ggml-org/llama.cpp/pull/30640))。
*   **b11799:** 针对 SYCL 后端的快速 Q8 反量化改进 ([#30775](https://github.com/ggml-org/llama.cpp/pull/30775))。

### 3. 新模型与硬件支持
*   **模型支持:** 增加了 `SenseNova U1` 和 `Flint` (FlintForCausalLM) 架构 ([#28919](https://github.com/ggml-org/llama.cpp/pull/28919), [#30928](https://github.com/ggml-org/llama.cpp/pull/30928))。
*   **硬件:**
    *   **OpenCL:** 增加了 `IM2COL_3D` 支持，以提升在旧硬件上的性能 ([#30895](https://github.com/ggml-org/llama.cpp/pull/30895))。
    *   **Hexagon:** 正在进行算子融合（Op Fusion）和 `BINARY_NX` 优化工作 ([#30843](https://github.com/ggml-org/llama.cpp/pull/30843))。

### 4. 性能与优化
*   **词汇表:** 显著优化了词汇表加载时间 ([#30679](https://github.com/ggml-org/llama.cpp/pull/30679))。
*   **GPU 卸载:** 优化了 `d2t` 放置策略，确保张量在 `set_rows` 操作期间保留在 GPU 上，从而减少显存抖动 ([#30912](https://github.com/ggml-org/llama.cpp/pull/30912))。
*   **SYCL:** 针对 Q4_K MMVQ 内核进行了宽行配对优化，专门针对 Intel BMG 架构 ([#30226](https://github.com/ggml-org/llama.cpp/pull/30226))。

### 5. 稳定性与回归
*   **回归 (高):** 用户报告称 #30449 更新后，由于锁定主机内存（pinned host buffer）的限制，MoE 模型的首字延迟（TTFT）出现了严重回归（从 10s 增加到 60s 以上）([Issue #30793](https://github.com/ggml-org/llama.cpp/issues/30793))。
*   **缺陷 (中):** 反分词（Detokenization）漏洞，导致特定的标点符号/缩写被剔除，影响了 Gemma 4 及类似模型 ([Issue #30905](https://github.com/ggml-org/llama.cpp/issues/30905))。修复方案已在 [#30940](https://github.com/ggml-org/llama.cpp/pull/30940) 中提出。
*   **缺陷 (低):** `llama-server` 在关闭序列中收到多个 SIGTERM 信号时存在死锁风险 ([Issue #29581](https://github.com/ggml-org/llama.cpp/issues/29581))。

### 6. 对应用开发者的意义
*   **工具/代理:** `llama-server` 中的 `/v1/messages` 端点现在可以正确转发采样参数，从而实现对代理输出更细粒度的控制 ([#30856](https://github.com/ggml-org/llama.cpp/pull/30856))。
*   **架构演进:** 随着 FP8/NVFP4 量化缩放的原生支持进入核心（`ggml`），预计未来几周显存效率将获得显著提升。如果您正在部署大型 MoE 模型，请注意最近关于锁定内存分配的更新，如果您的推理流水线依赖低延迟 TTFT，请务必留意。
*   **安全:** 请确保您的部署加强了对 `/tools` 端点的防护；目前有一个活跃的 PR ([#29834](https://github.com/ggml-org/llama.cpp/pull/29834)) 旨在解决允许外部站点触发主机级命令的 CORS/JSON 验证漏洞。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 基础设施摘要：2026-10-22

### 1. 今日要点
Ollama 近期重点修复了近期模型发布中出现的工具调用（tool-calling）回归问题，并改进了 OpenAI/Anthropic 兼容层中的流式传输错误处理机制。生态系统持续扩张，现已集成 Recursive 的 **Flint** 编程模型，并初步支持 Apple 原生的 **Foundation Models** 框架。

### 2. 发布与重大变更
*   **[v0.40.8](https://github.com/ollama/ollama/releases/tag/v0.40.8)：** 最新版本专注于稳定近期模型集成及服务端调度逻辑。

### 3. 新模型与硬件支持
*   **[Recursive Flint](https://ollama.com/library/flint)：** 增加对 Flint 编程模型的支持，该模型专为智能体（Agentic）编程工作流进行了优化。
*   **[Apple Foundation Models](https://github.com/ollama/ollama/pull/19184)：** 添加了 `apple-foundation-model` 运行程序，以利用 macOS（macOS 27+）上的原生端侧模型。
*   **[DFlash2 支持](https://github.com/ollama/ollama/pull/19149)：** MLX 后端现已支持用于草稿行（draft-row）候选选择的 DFlash2 架构。

### 4. 性能与优化
*   **并行请求调度：** PR [#17144](https://github.com/ollama/ollama/pull/17144) 旨在跟随上游 `llama.cpp` 的修复，重新启用 `qwen35` 和 `qwen35moe` 的并行请求支持，有望提升高并发环境下的吞吐量。
*   **逐出逻辑：** PR [#19190](https://github.com/ollama/ollama/pull/19190) 修复了一个调度 Bug，该 Bug 会导致 `keep_alive` 请求错误地取消挂起的模型逐出，从而在受限于 `OLLAMA_MAX_LOADED_MODELS` 时导致模型切换停滞。

### 5. 稳定性与回归问题
*   **工具调用解析（高优先级）：** 多项报告（[#17778](https://github.com/ollama/ollama/issues/17778), [#16383](https://github.com/ollama/ollama/issues/16383), [#19191](https://github.com/ollama/ollama/issues/19191)）显示，较新的模型（Qwen 3.6/3.8、Flint）因 JSON 格式漂移（例如浮点数字符串与整数混用）和严格校验机制，导致工具调用解析失败。针对副本校验的修复目前在 PR [#17813](https://github.com/ollama/ollama/pull/17813) 中。
*   **云服务可靠性（高优先级）：** 持续的报告（[#15453](https://github.com/ollama/ollama/issues/15453)）显示 Cloud Pro 模型存在 95% 的失败率，表明远程模型服务在基础设施侧仍存在问题。
*   **Windows Server 启动（中优先级）：** 问题 [#18061](https://github.com/ollama/ollama/issues/18061) 描述了 Windows 11 下桌面服务器静默失败的情况；针对控制台窗口抑制的修复（[#19080](https://github.com/ollama/ollama/pull/19080)）正在排队等待中。

### 6. 对应用开发者意味着什么
*   **智能体工作流：** 如果你正在构建智能体循环，由于 Ollama 解析器采用了严格的模式验证，请预见可能出现瞬时的 `500` 错误。在 PR [#17813](https://github.com/ollama/ollama/pull/17813) 合并之前，你可能需要实施自定义后处理，在模型输出到达 Ollama API 之前进行标准化处理。
*   **API 兼容性：** 如果使用 `/v1/messages` (Anthropic) 或 OpenAI 兼容端点，请注意，此前流式传输开始后发生的错误会被吞掉。PR [#19188](https://github.com/ollama/ollama/pull/19188) 和 [#19178](https://github.com/ollama/ollama/pull/19178) 旨在在带内显现这些错误，请务必更新你的错误处理逻辑以捕获这些事件。
*   **资源限制：** 如果你在高密度环境中使用 `OLLAMA_MAX_LOADED_MODELS=1`，请确保你的编排层已做好准备以应对 [#19190](https://github.com/ollama/ollama/pull/19190) 中即将到来的修复，从而防止请求停滞。

---

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 工程摘要：2026-10-22

### 1. 今日重点
LiteLLM 生态系统在移除包含凭证窃取负载的恶意 `1.107.0` 版本后，目前已完成重大安全修复。工程重点现已转向加固代理（proxy）基础设施，特别是针对不同服务商的响应缓存作用域和细粒度的请求超时管理。

### 2. 发布版本与破坏性变更
*   **发布系列 (v1.103.7 – v1.106.2)：** 为应对此次安全事件，官方紧急发布了多个版本，并确保所有 Docker 镜像均已通过主密钥进行 `cosign` 签名。**操作要求：** 请确保您运行的是 `v1.106.2` 或更高版本，并清除所有可能已拉取恶意 `1.107.0` 镜像的本地环境或容器。
    *   [验证 Docker 签名](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0)

### 3. 新模型与硬件支持
*   **Superbot 集成：** 新增 `superbot` 作为原生的 OpenAI 兼容服务商。
    *   [PR #47505](https://github.com/BerriAI/litellm/pull/47505)
*   **Foundry Local：** 使用 SDK 2.2.1 集成对 Foundry Local 服务商的支持。
    *   [PR #47713](https://github.com/BerriAI/litellm/pull/47713)

### 4. 性能与优化
*   **Rust 迁移：** LiteLLM Rust 核心的开发仍在持续推进，旨在实现低于 1ms 的网关开销。
    *   [Issue #31263](https://github.com/BerriAI/litellm/issues/31263)
*   **缓存作用域（Cache Scoping）：** 引入了 `cache_scope` 设置以防止跨租户缓存污染，支持按团队或 API key 进行隔离。
    *   [PR #47840](https://github.com/BerriAI/litellm/pull/47840)
*   **超时处理：** 改进了对非 OpenAI/Bedrock 服务商的细粒度 `httpx.Timeout` 支持，摒弃了单一的全局超时设置。
    *   [PR #47883](https://github.com/BerriAI/litellm/pull/47883)

### 5. 稳定性与回归问题
*   **[严重] 安全漏洞：** 已识别出恶意版本 `1.107.0` 并将其从 PyPI/Docker 中移除。该版本利用了 RCE 加载器。请立即审计可能缓存了该层的 CI/CD 流水线。
    *   [Issue #47826](https://github.com/BerriAI/litellm/issues/47826)
*   **[高] Presidio Guardrail 掩码：** `logging_only` 模式目前会遮蔽发送给客户端的响应内容，导致功能无法正常使用。
    *   [Issue #47605](https://github.com/BerriAI/litellm/issues/47605)
*   **[中] S3/SigV4 URL 变异：** `HTTPHandler` 的查询重解析导致预签名 URL 失效（引发图像输入的 403 错误）。
    *   [Issue #47837](https://github.com/BerriAI/litellm/issues/47837)
*   **[中] 消费日志：** 目前 `/v1beta/interactions` (Gemini) 的元数据记录功能失效。
    *   [Issue #47841](https://github.com/BerriAI/litellm/issues/47841)

### 6. 对应用开发者的影响
*   **安全态势：** 如果您使用自动依赖更新（如 Dependabot），请务必核实您的本地版本锁定是否意外引入了 `1.107.0`。请审计在部署过该版本的环境中使用的所有凭证。
*   **多租户缓存：** 如果您为多个团队运行共享的 LiteLLM 代理，必须更新并启用 `cache_scope`，以防范不同用户之间敏感数据的泄露。
*   **工具调用（Tool-Calling）可靠性：** 已提交多项针对流式工具调用和参数检查的修复（参见 [PR #46860](https://github.com/BerriAI/litellm/pull/46860) 和 [PR #46858](https://github.com/BerriAI/litellm/pull/46858)）。如果您的应用高度依赖复杂的智能体工作流，建议测试这些 PR 或等待下一个稳定版本发布，以避免因 JSON 格式错误导致工具执行失败。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 摘要：2026-10-22

Unsloth 生态系统当前的工作重心在于优化多模型服务场景下的显存（VRAM）管理，并强化针对最新一代大规模架构的训练流水线。主要的工程力量正致力于解决 macOS/Metal 平台上的稳定性问题，并完善 `FastDecisionModel` 的训练流程。

### 1. 今日重点
开发工作目前分为两个方向：一是关键的内存管理补丁——例如将仅查询（lookup-only）的嵌入表（embedding tables）迁移至宿主机内存或磁盘内存；二是扩展训练套件，加入 DPO、ORPO 和 GRPO。团队正协同努力稳定 `FastDecisionModel`（特别是 Gemma-3），并提升 Studio 在多 GPU 和多智能体编排方面的能力。

### 2. 发布与破坏性变更
*   **无。** 过去 24 小时内未发布正式版本标签。

### 3. 新模型与硬件支持
*   **MOSS-Image GGUF：** Studio 现在通过固定的 `stable-diffusion.cpp` 构建（master-982）支持 MOSS-Image 模型 [PR #14565](https://github.com/unslothai/unsloth/pull/14565)。
*   **MLX 优化：** 正在开发针对 MLX Per-Layer Embedding (PLE) 和专家卸载（expert offloading）的架构支持，旨在为 DeepSeek-V4.1-Flash 等模型提供助力 [PR #14326](https://github.com/unslothai/unsloth/pull/14326)。

### 4. 性能与优化
*   **显存卸载：** 一项重大的重构 PR [#14465](https://github.com/unslothai/unsloth/pull/14465) 将逐层嵌入（per-layer embeddings）和 Engram 查询表重新归类为宿主机/磁盘内存，从而缓解 Qwen3.8-Flash-Next 等模型在高负载下的显存压力。
*   **GGUF 加载：** 通过跳过不必要的全词汇表读取来优化 GGUF 初始化过程，显著加快了大词汇量模型的加载速度 [PR #14573](https://github.com/unslothai/unsloth/pull/14573)。
*   **扩散模型内存：** PR [#14549](https://github.com/unslothai/unsloth/pull/14549) 引入了逻辑，使得在不支持 fp8 GEMM 的硬件上运行时，fp8 权重能保持原生状态，避免了因强制解量化到 fp16/fp32 而导致宿主机内存激增的问题。

### 5. 稳定性与回归
*   **训练失败 (Gemma-3)：** `FastDecisionModel` (Clef head) 在 `float16` 后端（如 T4）上因梯度下溢导致训练失败；目前已提出通过调整缩放比例来修复的方案 [Issue #14439](https://github.com/unslothai/unsloth/issues/14439) / [PR #14569](https://github.com/unslothai/unsloth/pull/14569)。
*   **核心转储 (Core Dumps)：** 用户反馈在弹出模型时出现核心转储；针对日志详细程度的调查正在进行中 [Issue #14411](https://github.com/unslothai/unsloth/issues/14411)。
*   **Metal OOM：** 针对 Mac 硬件在执行 `--fit-target` 操作期间出现 Metal 显存溢出（OOM）问题的修复方案已提交 [PR #14431](https://github.com/unslothai/unsloth/pull/14431)。
*   **分布式启动：** 新的逐解码器层块编译（per-decoder-layer block compile）在分布式环境中触发了 `CheckpointError`；目前的临时解决方案是设置 `UNSLOTH_BLOCK_COMPILE=0` [Issue #14063](https://github.com/unslothai/unsloth/issues/14063)。

### 6. 对应用开发者意味着什么
*   **工作流集成：** 如果你正在构建集成了搜索功能的智能体，Studio 现已支持自定义 URL 查询（`/chat?q=<text>`），从而允许在浏览器中无缝集成“搜索引擎”功能 [PR #14570](https://github.com/unslothai/unsloth/pull/14570)。
*   **微调：** 预计新的基于偏好的训练目标（DPO/ORPO/GRPO）将很快上线 [PR #12601](https://github.com/unslothai/unsloth/pull/12601)，这将显著提升模型对智能体任务的控制力。
*   **资源规划：** 如果你是在资源受限的环境（仅 CPU 或显存较小）中进行部署，请密切关注关于显存底限调整的 PR [#13427](https://github.com/unslothai/unsloth/pull/13427)，这将支持更细粒度地将模型分布在多个 GPU 上。

</details>

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*