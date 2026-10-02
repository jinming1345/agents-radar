# AI 基础设施日报 2026-10-02

> 生成时间: 2026-10-02 01:48 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

### AI 基础设施生态报告：2026-10-02

#### 1. 生态概览
AI 基础设施领域目前正处于全力适配“Blackwell”(SM120/121) 硬件与推理型模型架构日趋成熟的竞速中。项目重心已从单纯的吞吐量转向 Agent（智能体）的可靠性，重点关注工具调用优化、结构化输出解析以及对架构级“SystemOne”（系统一）决策的支持。由于行业正经历向复杂 FP8/MXFP4 量化转换，加之专用决策模型与通用大语言模型（LLM）在架构上的分歧，系统稳定性问题依然严峻。

#### 2. 活跃度对比
| 项目 | 主要方向 | 发布状态 (过去24小时) | 活跃强度 |
| :--- | :--- | :--- | :--- |
| **vLLM** | 高吞吐量服务 | 无（加固阶段） | 极高（关键 Bug 修复） |
| **SGLang** | ROCm/AMD 与多模态 | v0.5.21 (已发布) | 高（稳定性/后端） |
| **llama.cpp** | 本地与边缘运行时 | b11321–b11332 | 高（功能扩展） |
| **Ollama** | 消费/企业级易用性 | 无 | 中（Bug 修复） |
| **LiteLLM** | 网关/代理 | v1.103.2 (安全补丁) | 中（稳定性/合规性） |
| **Unsloth** | 训练/微调 | v0.1.902-beta | 高（内核优化） |

#### 3. 模型支持竞速
竞赛目前分化为高参数推理模型与“决策/SystemOne”架构两类：
*   **DeepSeek-V4.1-Flash:** vLLM 和 SGLang 处于领先地位，其中 vLLM 专注于 Blackwell 硬件稳定性，SGLang 则在完善相关 cookbook 集成。
*   **SystemOne 模型 (Laya, Julia-1, Clef):** `llama.cpp` 和 Ollama 明显领先，已率先交付了专用的 `/v1/systemone` API 支持及能力标记功能。
*   **多模态/VLM:** SGLang (GigaChat 3.5) 和 Unsloth (Qwen-Image-2.1) 在视觉语言处理及针对图像密集型工作负载的融合内核支持方面进展最为显著。

#### 4. 性能前沿
优化策略根据部署目标呈现出双重路径：
*   **数据中心 (vLLM/SGLang):** 大力投入 **KV-Cache 效率**（运行中前缀载入共享）与 **内核融合**（QK-norm + RoPE，以及针对 AMD MI355X 的逐 token FP8 量化）。
*   **本地/边缘 (llama.cpp/Unsloth):** 专注于 **量化创新**（1.75-bit PTQ1_0）与 **显存管理**（块交换至主机内存），旨在受限的消费级硬件上部署更大规模的模型。
*   **Agent 延迟:** vLLM 引入 `ngram_hint` 以“猜测”工具调用结构，标志着朝智能推测解码方向的演进。

#### 5. 层级定位
*   **服务引擎 (vLLM/SGLang):** 聚焦于大规模并行化、Blackwell 专属硬件 Bug 处理，以及降低嵌套 JSON/工具调用流式传输的开销。
*   **本地运行时 (llama.cpp/Ollama):** 致力于让决策模型的推理平民化，并确保跨平台（Vulkan/CUDA/CPU）的稳定性。
*   **网关 (LiteLLM):** 专注于治理、预算管理及标准化的代理交互（MCP 合规、消费日志索引）。
*   **训练/微调 (Unsloth):** 通过融合内核与兼容 GGUF 的检查点管理，弥合训练效率与本地推理之间的鸿沟。

#### 6. 趋势信号
*   **“SystemOne”分叉:** 我们看到为通用聊天而构建的模型与为“决策”而构建的模型之间出现了硬性分裂。基础设施正在转向对这些模型进行过滤/标记，以防 API 不匹配。
*   **工具调用瓶颈:** Agent 循环正给现有的解析器带来压力。预计“模式感知（Schema-aware）”推理将迎来大规模投入（如 vLLM 的 `ngram_hint` 和 LiteLLM 对 MCP 的遵从）。
*   **Blackwell 不稳定性:** 所有主流服务引擎（vLLM, SGLang, Ollama）的一个共同主题是 NVIDIA 新一代 Blackwell 硬件的稳定性不足。建议开发者在未来 7-10 天内，避免在 SM120/GB10 集群上进行“激进型”生产部署。
*   **代理治理:** 随着 LiteLLM 推动强制性的 `cosign` 验证与更严格的预算索引，基础设施层正逐渐演变为 AI 资源的企业级守门人。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 技术摘要：2026-10-02

### 1. 今日重点
今日开发工作的重点在于持续完善 **DeepSeek-V4.1-Flash** 的支持，针对 SM120/GB10 (Blackwell) 架构修复了多项关键问题，重点解决了 CUDA graph 和 KV-cache 损坏的错误。此外，官方发起了一项关于实施 **“Fast-Track” 合并流程** 的 RFC，旨在加速模型优化类 PR 的集成，标志着社区在加速高性能内核整合方面迈出了新的一步。

### 2. 发布与重大变更
*   **过去 24 小时内无正式版本发布**。
*   **API/使用建议：** 开发动态显示，针对 `/v1/messages` 端点（Anthropic API）的强化工作正在进行中，旨在适配类似 Claude Code 的智能体循环（agentic loops），这些场景对工具调用（tool-calling）架构施加了巨大的压力 (#58647)。

### 3. 新模型与硬件支持
*   **DeepSeek-V4.1-Flash：** 持续进行针对 Blackwell (SM120/SM121) 平台的稳定性优化。PR #59689 和 #58560 修复了 SM12x/GB10 硬件上压缩器环（compressor ring）中出现的空块中毒（null-block poisoning）问题。
*   **Qwen3.5/Next：** 通过融合 QK-norm + RoPE + gate 的 Triton 内核增强了对 ROCm 的支持 (#51406)。
*   **Intel XPU：** 在启用 DeepSeek-V4 FP8 的稀疏解码（Sparse Decode）图捕获方面取得进展 (#59159)，并解决了 Arc B70 上 MTP 推测解码的对齐性问题 (#56917)。

### 4. 性能与优化
*   **内核融合：** 新的移植工作致力于融合 `attn_res` 和 `add_rmsnorm_quant_kernel`，以优化现代模型架构的吞吐量 (#52968)。
*   **推测解码：** 引入 `ngram_hint` 以直接从对话模板语法中草拟工具调用，解决了智能体推理中的主要瓶颈——在工具调用结构中，标准的 n-gram 方法往往会失效 (#59712)。
*   **SM12x 优化：** 优化了 Qwen4Exp 的 skinny decode GEMM，解决了引擎错误回退到传统 SM80 cuBLAS 内核而导致的性能回退问题 (#59632)。
*   **KV-Connector：** 实现了共享的进行中（in-flight）外部前缀 KV 加载，允许多个请求附加到单一的 KV 获取操作，而不是创建冗余的 GPU 分配 (#57418)。

### 5. 稳定性与回归
*   **关键（DeepSeek-V4.1/SM120）：** 据报告在 SM120 上解码吞吐量极低且出现 CUDA graph 故障；Blackwell 部署环境需立即关注 (#56892)。
*   **高优先级（FlashInfer/MTP）：** 在 NVIDIA GB10/SM121 上，使用 GQA=16 的模型进行推测解码时会导致非法内存访问崩溃 (#37754)。
*   **中优先级（正确性）：** Rust GLM 解析器会剔除工具调用参数前后的空格，这破坏了对空格敏感的代码生成 (#59654)。修复 PR：#59654。
*   **中优先级（一致性）：** FlashInfer 自动调优配置缓存未能在非零 rank 上命中，可能导致多 GPU 节点上的引擎启动死锁 (#57423)。

### 6. 对应用开发者意味着什么
*   **智能体框架：** 如果你正通过 vLLM 使用 Anthropic API (`/v1/messages`) 构建工具，预计未来几天会有更高的稳定性，维护者们正致力于加固解析器，以应对类似 Claude Code 等高级智能体所需的高度复杂的嵌套 JSON 架构。
*   **工具调用：** 即将推出的推测解码 `ngram_hint` 功能将显著改善重度依赖工具调用的智能体的延迟，因为它允许模型“猜”出结构化的工具调用，而无需针对这些块回退到缓慢的自回归生成 (#59712)。
*   **部署：** 使用 Blackwell (GB10/SM120) 的用户建议保留在 `main` 分支或拉取最新的 nightly 版本，因为针对 DeepSeek-V4.1-Flash 的重大 “day-zero” 修复正在每日合并。如果在这些架构上运行，请避免使用 v0.28.0 稳定版，直到发布点版本（point release）更新。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

### SGLang 摘要：2026-10-02

#### 1. 今日要点
SGLang 生态系统正大力推进 **AMD ROCm 优化**以及 **HiSparse/HiCache 内存管理**，主要的 PR 活动集中在 MI350X/MI300 的稳定性及功能对齐上。与此同时，核心团队正持续排查复杂的 CUDA coredump 跟踪问题 (#26340)，并修复新兴架构（SM120/Blackwell）上的混合注意力（hybrid attention）及 KV-caching 相关漏洞。

#### 2. 版本发布与破坏性变更
*   **v0.5.21 已发布：** 包含常规维护和稳定性改进。详见 [v0.5.21 发布说明](https://github.com/sgl-project/sglang/releases/tag/v0.5.21)。

#### 3. 新模型与硬件支持
*   **DeepSeek-V4.1 Flash：** 增加了完整的 LLM/VLM cookbook 支持 ([链接](https://docs.sglang.io/cookbook/autoregressive/DeepSeek/DeepSeek-V4_1))。
*   **GigaChat 3.5：** 已初始化 LLM 和 VLM 配置的支持 ([链接](https://docs.sglang.io/cookbook/autoregressive/GigaChat/GigaChat_3_5))。
*   **Yue2 支持：** 已提交模型集成相关的初始 PR #42106。

#### 4. 性能与优化
*   **AMD/ROCm 融合算子：** PR #34502 引入了将每个 token 的 FP8 激活量化融合进 RMSNorm 的实现，以支持 per-channel 动态量化，目标硬件为 gfx95 (MI355X)。
*   **HiSparse 优化：** 来自 `salexspb` 的大量 PR (#42168, #41781, #41780, #40784, #40783) 重点在于通过逻辑 KV 池来限制解码请求、恢复投机验证（speculative verification），以及对 ROCm 上的 batching planner 前缀扫描进行优化。
*   **融合内核（Fused Kernels）：** PR #42169 在 ROCm 上实现了用于 HiCache 页面移动的 batched-memcpy，以绕过默认内核路径中的性能瓶颈。

#### 5. 稳定性与回归
*   **高优先级（硬件崩溃）：**
    *   #42162：MiMo-V2.6 在 SM90 (H200) 上崩溃，原因是为打包的 MXFP4 expert 选择了错误的 MoE 运行器。
    *   #42166：在 MI350X 节点的高负载/长上下文场景下，MiniMax-M3 出现多次崩溃（修复中）。
    *   #42012：GLM-5.3-Flash 在 SM120 (RTX PRO 6000) 上执行 CUDA 图捕获时崩溃；目前仅 `triton` 后端是稳定路径。
*   **正确性/逻辑问题：**
    *   #42138：DeepSeek-V4.1 检测器漏洞，导致基于正则表达式的流式传输丢失调用或错误归因参数。
    *   #41351：在重复分支评分期间，混合 GDN Radix-cache 中可能存在 selected-logprob 漂移。
*   **CI 基础设施：** #26340 继续跟踪关键的 CUDA coredump；#17050 显示仍有 1 个持续报错的 CI 测试。

#### 6. 对应用开发者的影响
*   **可靠性提示：** 如果您在 SM120（例如 RTX 6000 Ada）或 H200 集群上运行深度推理模型（DeepSeek-V4, GLM-5.3），请预见 CUDA 图可能存在的不稳定性。在混合扩展 reshape 漏洞修补之前，请尽可能使用 `triton` 后端。
*   **流式传输与工具：** 如果您的 Agent 流水线严重依赖工具调用流式传输或 `<think>` 标签解析，请注意 #42143 和 #42140；今日报告了多起影响参数提取的漏洞。
*   **量化：** 如果您正在 AMD (MI350X/MI300) 上对 MXFP4/FP8 模型进行基准测试，请确保拉取最新的 main 分支，因为 HiSparse/HiCache 堆栈正在进行积极更新，以解决内存池大小分配和 ROCm 特有的复制开销问题。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

### llama.cpp 基础设施摘要：2026-10-02

#### 1. 今日亮点
`llama.cpp` 生态系统正迅速转向“SystemOne”决策架构，并新增了对 `Laya`、`Julia-1` 和 `Clef` 等决策模型的实验性支持。后端开发继续专注于优化 MTP（多 Token 预测）性能，并针对高级模型架构完善 CUDA/Vulkan 内核的稳定性。

#### 2. 发布与重大变更
*   **构建版本 b11321–b11332：** 此系列发布主要侧重于稳定性和后端特定的优化。目前未报告 API 重大变更，但运行自定义 `gguf-dump` 流水线的用户请注意：元数据字段名称现已进行清理，以防止终端转义序列注入 ([PR #29016](https://github.com/ggml-org/llama.cpp/pull/29016))。

#### 3. 新模型与硬件支持
*   **SystemOne 决策模型：** 通过全新的 `/v1/systemone` API，初步支持了包括 `Laya`、`Julia-1`、`Lev`、`OpenJev` 和 `Clef` 在内的决策模型 ([PR #29818](https://github.com/ggml-org/llama.cpp/pull/29818), [PR #29831](https://github.com/ggml-org/llama.cpp/pull/29831))。
*   **Qwen4Exp/MTP：** 为 Qwen3.8-Flash-Next 完成了 NextN 草稿头（draft heads）的全面集成 ([PR #29761](https://github.com/ggml-org/llama.cpp/pull/29761))。
*   **PTQ1_0 量化：** 引入了用于高效推理的新型 1.75-bit 三元量化格式（128-block）([PR #29672](https://github.com/ggml-org/llama.cpp/pull/29672))。
*   **AOCL-BLAS：** 针对 AMD 优化 CPU 库（AMD Optimized CPU Libraries）的官方文档和构建支持 ([Issue #29640](https://github.com/ggml-org/llama.cpp/issues/29640))。

#### 4. 性能与优化
*   **CUDA 一元算子：** 实现了对 `F16`、`F32` 和 `BF16` 任意 4D 跨度（strided）及非连续张量的支持，从而解锁了复杂模型结构的性能提升 ([PR #29781](https://github.com/ggml-org/llama.cpp/pull/29781))。
*   **图重放（Graph Replay）：** 通过在稳定图重放后避免冗余的预热，改善了 CUDA 的稳定性，主要针对统一 KV 解码负载 ([PR #29768](https://github.com/ggml-org/llama.cpp/pull/29768))。
*   **内存效率：** 更新了 `llama-mmap`，通过 direct-io 避免了冗余的全尺寸张量复制 ([Issue #29749](https://github.com/ggml-org/llama.cpp/issues/29749))。
*   **稀疏 Flash Attention：** 在 Vulkan 中为量化 K/V 缓存启用了稀疏 Flash Attention，解决了 DeepSeek/Qwen Flash 架构的一个主要瓶颈 ([PR #29639](https://github.com/ggml-org/llama.cpp/pull/29639))。

#### 5. 稳定性与回归
*   **严重 (Vulkan/Adreno)：** 针对 `-ngl >= 1` 的负载，在 Qualcomm Adreno 专有驱动程序上发生的硬崩溃（SIGABRT）问题仍在积极调查中 ([Issue #29786](https://github.com/ggml-org/llama.cpp/issues/29786))。
*   **中等 (CUDA/MTP)：** 持续追踪 CUDA 相比 Vulkan 在 MTP 草稿接受率上的回归报告；对于 draft-mtp 用户而言，性能差距显著 ([Issue #26750](https://github.com/ggml-org/llama.cpp/issues/26750))。
*   **中等 (CPU/F16)：** 由于 F16 累加器不匹配，CPU 上的 Flash Attention 在特定的单块（one-chunk）场景下会出现 `inf/NaN` 溢出 ([Issue #29774](https://github.com/ggml-org/llama.cpp/issues/29774))。

#### 6. 对应用开发者的影响
*   **智能体（Agentic）工作流：** 如果你正在构建“System 2”或推理智能体，新的 `/v1/systemone` API 允许你将决策逻辑卸载到专用模型，而无需对基础 LLM 进行微调。
*   **部署安全：** 请确保你的基础设施谨慎解析 GGUF 元数据。最近的 `gguf-dump` 安全补丁强调，元数据键应被视为不可信输入。
*   **硬件兼容性：** 如果你在消费级 AMD iGPU（Vulkan）或 Qualcomm 移动芯片（Adreno）上进行部署，在 `fattn` 和 `vkCreateComputePipelines` 中的稳定性回归得到解决之前，请谨慎使用当前的 master 构建版本。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 基础设施摘要 - 2026-10-02

### 今日重点
目前的开发工作聚焦于优化“System One”模型能力——区分决策模型与通用推理模型——并解决影响企业级部署的高优先级网络/代理问题。此外，团队正集中精力处理近期 `llama-server` 后端出现的 CPU 占用率回退问题。

### 发布与重大变更
*   **无。** 过去 24 小时内无正式版本发布。
*   **API 调整：** [#18737](https://github.com/ollama/ollama/pull/18737) 修改了模型元数据报告；“仅决策 (decision-only)”模型现在将返回专门的特性标志，以防止它们被错误地显示在通用聊天/工具界面中。

### 新模型与硬件支持
*   **System One 支持：** 正在推进基于 MLX 的“System One”架构支持，以增强专门的推理工作流 [#18701](https://github.com/ollama/ollama/pull/18701)。
*   **Clef 支持：** 通过 `llama-server` 集成增加了对 Clef 的支持 [#18741](https://github.com/ollama/ollama/pull/18741)。

### 性能与优化
*   **CPU 回退修复：** PR [#18613](https://github.com/ollama/ollama/pull/18613) 解决了严重的性能回退问题，即 `llama-server` 在 GPU 加速生成期间会通过向底层后端传递 `--poll 0` 而导致 CPU 使用率飙升（10–20+ 核心）。
*   **容器资源限制：** 关于 `n_threads` 忽略 cgroup v2 CPU 配额的问题 [#17916](https://github.com/ollama/ollama/pull/17916) 仍然处于激活状态，该问题会导致资源受限环境下的吞吐量崩溃。

### 稳定性与回归
*   **严重 - 代理/网络：** 近期变更 (v0.35.0) 引入了一个回归，导致模型拉取在获取 R2 托管的 blob 时绕过 `HTTPS_PROXY` 设置 [#18729](https://github.com/ollama/ollama/issues/18729)。目前正通过 PR [#18733](https://github.com/ollama/ollama/pull/18733)、[#18730](https://github.com/ollama/ollama/pull/18730) 和 [#18731](https://github.com/ollama/ollama/pull/18731) 进行修复。
*   **高优先级 - 硬件/驱动：** NVIDIA RTX 50 系列 (Blackwell) 用户在 Windows 上遇到 VRAM 发现失败（报告为 0B），导致被迫回退到 CPU 模式 [#18581](https://github.com/ollama/ollama/issues/18581)。
*   **高优先级 - CUDA/架构：** 用户报告在 RTX 5090 硬件上使用 Cohere MoE 模型时，Windows 环境下会出现 `MUL_MAT` 非法内存访问崩溃 [#18642](https://github.com/ollama/ollama/issues/18642)。
*   **中优先级 - 安全漏洞：** 一份公开报告详细列出了 Go 二进制文件中的总计 36 个漏洞，包括 1 个严重 (CRITICAL) 和 11 个高危 (HIGH) CVE [#16033](https://github.com/ollama/ollama/issues/16033)。

### 这对应用程序开发者意味着什么
*   **代理要求：** 如果您的基础设施依赖正向代理进行出口流量控制，**请避免升级到 0.35.0**，直到代理绕过修复 ([#18729](https://github.com/ollama/ollama/issues/18729)) 被合并并验证。
*   **JSON Schema 完整性：** 如果您的应用发送复杂的结构化提示词，请关注 PR [#18721](https://github.com/ollama/ollama/pull/18721)，该 PR 解决了一个问题，即 `encoding/json` 会无意中按字母顺序排列属性键，这可能会破坏特定模型的 Schema 要求。
*   **工具集成：** 基于 Ollama API 构建的开发者应注意即将到来的能力发现变更，特别是关于“仅决策”模型与“通用”模型的区别，以确保为您的最终用户提供正确的 UI 过滤。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

## LiteLLM 工程摘要：2026-10-02

### 1. 今日重点
今天的开发重点主要集中在加强 **MCP (Model Context Protocol) 集成**以及优化面向高并发部署的代理级可靠性。我们在确保 MCP 工具的传统兼容性、解决 `SpendLogs` 迁移中持续存在的索引瓶颈方面取得了显著进展，同时针对流式处理防护栏（Guardrail）的一致性及企业级预算管理进行了紧急修复。

### 2. 发布与重大变更
*   **v1.103.2 & v1.101.4**: 发布版本，强制要求使用 `0112e53` 中引入的密钥进行 `cosign` Docker 镜像验证。请确保更新 CD 流水线，以便根据此密钥验证镜像签名。[发布说明](https://github.com/BerriAI/litellm)

### 3. 新模型与硬件支持
*   **Vertex AI/Gemini Live**: 正在开展通过 `bidiGenerateContent` API 支持 **Gemini Live Avatar** (`avatar_config`) 的功能开发，旨在实现实时、口型同步的虚拟形象流式传输。[Issue #43166](https://github.com/BerriAI/litellm/issues/43166)
*   **Reasoning Effort**: 已提交 PR 以移除 `gpt-6.1-sol` 不支持的 `reasoning_effort` 参数，确保与更新的 OpenAI 兼容推理后端保持一致。[PR #43935](https://github.com/BerriAI/litellm/pull/43935)

### 4. 性能与优化
*   **数据库索引**: 现在在代理启动/迁移过程中创建繁重的 `SpendLogs` 索引变为**可选项**。用户可通过将 `LITELLM_BUILD_SPEND_LOGS_INDEXES` 设置为 false，防止在大分区上执行阻塞性的 DDL 操作。[PR #44124](https://github.com/BerriAI/litellm/pull/44124)
*   **流式回退**: 新增流式中间回退延续功能（opt-in），确保当流式请求失败时，部分上下文会被传递给回退模型，从而降低长时运行的智能体（agentic）流的错误率。[PR #41127](https://github.com/BerriAI/litellm/pull/41127)

### 5. 稳定性与回归
*   **严重 (防护栏)**: 客户端在流式传输过程中断开连接会绕过调用后的防护栏扫描。目前正在修复，以确保扫描完成或进行适当记录，从而维护支出和安全审计跟踪。[PR #43839](https://github.com/BerriAI/litellm/pull/43839)
*   **高 (数据完整性)**: 已发现一个 Bug，导致 `SpendLogs` 中的工具负载和 logprobs 被错误遮盖，从而导致向上传输的请求中注入 `REDACTED_BY_LITELM` 值，引发重放问题。修复正在进行中。[PR #44075](https://github.com/BerriAI/litellm/pull/44075)
*   **高 (预算管理)**: 存在一个竞态条件，导致在批量写入程序刷新支出统计前的 60 秒空闲时间内，超过 `max_budget` 的虚拟密钥仍会被准入。[Issue #43732](https://github.com/BerriAI/litellm/issues/43732)
*   **中 (MCP)**: 部分用户的 UI 中 `Stdio` MCP 服务仍然不可用，工具无法填充。[Issue #15560](https://github.com/BerriAI/litellm/issues/15560)

### 6. 对应用开发者的影响
*   **迁移安全**: 如果您在大型 PostgreSQL 实例上运行 LiteLLM，**请务必在验证 `SpendLogs` 迁移策略后再升级到最新版本**。新的可选索引标志对于避免部署期间长时间的表锁至关重要。
*   **智能体可靠性**: 如果正在构建工具密集型智能体，请关注正在进行的 MCP 一致性 PR ([PR #43395](https://github.com/BerriAI/litellm/pull/43395))。迈向 181 项基准一致性测试将显著提高工具调用场景的稳定性。
*   **预算管理**: 使用聚合共享钱包的开发者应密切关注即将推出的**预算耗尽时自动回退至经济型模型**的功能，这将成为生产成本控制架构的一项重大转变。[Issue #43652](https://github.com/BerriAI/litellm/issues/43652)

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 摘要：2026-10-02

### 1. 今日亮点
Unsloth 继续在多模态推理性能优化方面发力，重点针对 Qwen-Image-2.1 推出了全新的融合 int8 内核及更智能的检查点（checkpoint）管理。开发团队目前正专注于增强 Studio 与第三方推理引擎（vLLM/SGLang）集成的稳定性，并改进 GGUF 模型在本地离线环境下的功能表现。

### 2. 发布与重大变更
*   **[v0.1.902-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.902-beta)：** 为 Unsloth Desktop 引入了全新的命令面板（Command Palette），支持更快捷的导航及可共享的运行配置。
*   **重大/行为变更：** 每个 Agent 的采样和推理标志（如 `--temperature`）现在严格应用于特定的 Agent 会话，而非整个服务器实例，从而避免了多用户环境下的配置泄露（[PR #12493](https://github.com/unslothai/unsloth/pull/12493)）。

### 3. 新模型与硬件支持
*   **推理引擎：** Studio 中作为可选（非默认）引擎对 **vLLM** 和 **SGLang** 的支持已进入 PR 阶段，允许进行多 GPU 服务部署并提升了对 VLM/视觉模型的兼容性（[PR #11491](https://github.com/unslothai/unsloth/pull/11491), [PR #12024](https://github.com/unslothai/unsloth/pull/12024)）。
*   **MLX 后端：** MLX 后端新增了针对 `fused_moe_routed_experts` 的融合推理作用域，旨在加速 Metal 设备上如 Qwen 等稀疏 MoE 模型（[PR #12422](https://github.com/unslothai/unsloth/pull/12422)）。

### 4. 性能与优化
*   **Qwen-Image-2.1 融合：** 全新的融合 int8 GEMM（带有反量化尾部处理）在 L4/A100 硬件上实现了**每步 14-17% 的加速**（[PR #12448](https://github.com/unslothai/unsloth/pull/12448)）。
*   **显存效率：** 新增的 "Block Swap"（块交换）实现允许将解码器层卸载到固定的主机 RAM 中，使在显存受限的显卡上训练稠密模型成为可能（[PR #11832](https://github.com/unslothai/unsloth/pull/11832)）。
*   **GGUF 优化：** 针对低内存场景（8GB-12GB VRAM）改进了检查点使用方式，当利用缓存的 int8 检查点处理卸载的 GGUF 模型时，Qwen-Image-2.1 的推理速度提升约 2 倍（[PR #12455](https://github.com/unslothai/unsloth/pull/12455)）。
*   **编译：** `fast_rms_layernorm` 和 `fast_rope_embedding` 现已支持 `torch.compile`，消除了 Llama 解码器层中的图中断问题（[PR #12171](https://github.com/unslothai/unsloth/pull/12171)）。

### 5. 稳定性与回归
*   **紧急 (AMD/ROCm)：** 在 RX 7900 XTX (Linux) 上进行 QLoRA 训练会导致 AMDGPU VM 故障和系统重置；该问题仍在调查中（[Issue #11498](https://github.com/unslothai/unsloth/issues/11498)）。
*   **高优先级 (延迟)：** 用户反馈在本地兼容 OpenAI 的 API 端点上，针对短文本工作负载存在固定的约 1.2s 延迟开销（[Issue #12364](https://github.com/unslothai/unsloth/issues/12364)）。
*   **中优先级 (Bug)：** 据反馈，近期 `b10715` 构建版本后，张量拆分（Tensor split）模式的推理性能出现回归，速度变慢达 2.9 倍（[Issue #12468](https://github.com/unslothai/unsloth/issues/12468)）。
*   **修复：** 
    *   离线 GGUF 发现逻辑现在遵循本地缓存，不再因网络请求而阻塞（[PR #12451](https://github.com/unslothai/unsloth/pull/12451)）。
    *   修正了针对特定 GGUF 模型变体的 1-D 范数反量化问题（[PR #12449](https://github.com/unslothai/unsloth/pull/12449)）。

### 6. 对应用开发者意味着什么
*   **Agent 隔离：** 如果您将 Unsloth 作为多个 AI Agent 的后端，请务必升级以确保模型参数按进程正确限定作用域，从而防止应用程序中不同任务执行器之间的“设置漂移”。
*   **离线韧性：** 构建“本地优先”或离线桌面应用的开发者应测试新的离线 GGUF 加载逻辑，以确保在无法连接 Hugging Face 时模型发现过程不会挂起。
*   **硬件扩展：** 随着 `block_swap_layers` 的引入，只要拥有足够的系统 RAM 作为显存溢出空间，您现在可以在普通本地硬件上切实地支持更大规模的模型。

</details>

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*