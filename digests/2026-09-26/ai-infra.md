# AI 基础设施日报 2026-09-26

> 生成时间: 2026-09-26 00:51 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

本报告总结了截至 **2026-09-26** 的 AI 基础设施生态系统状况。

### 1. 生态概览
当前基础设施格局的定义在于：一方面，NVIDIA Hopper/Blackwell 与 AMD ROCm/MI355X 之间在架构对齐方面竞争激烈；另一方面，整个行业正向“智能化”服务结构性转型。各项目正逐渐摒弃单体 Python 实现，转而采用基于 Rust 的内存和缓存管理。市场正趋于成熟，逐步走向稳定、多租户的生产环境，并将重点放在解决投机采样（Speculative Decoding）和复杂工具调用流程中长期存在的问题。

### 2. 活跃度对比
*注：预估数据基于 2026-09-26 的活跃 PR/Issue 队列统计。*

| 项目 | 活跃 Issues | 活跃 PRs | 发布状态 |
| :--- | :--- | :--- | :--- |
| **vLLM** | 高 (~44k) | 极高 (~58k) | 稳定 / 修补中 |
| **SGLang** | 中 (~41k) | 中 (~41k) | 架构转型中 |
| **llama.cpp** | 高 (~29k) | 高 (~29k) | 维护中 |
| **Ollama** | 高 (~18k) | 中 (~18k) | v0.40.0-rc0 |
| **LiteLLM** | 中 (~43k) | 中 (~43k) | 安全补丁 |
| **Unsloth** | 高 (~11k) | 高 (~11k) | 实验性 |

### 3. 模型支持竞赛
当前业界对 **DeepSeek-V4.1** 痴迷不已，**vLLM** 和 **SGLang** 围绕内核融合（重点针对 Hopper/SM100）展开了功能对齐竞赛。
*   **vLLM：** 在 DeepSeek-V4.1 优化方面处于领先地位，特别是在 O-projection 和 wkv projection 的处理上。
*   **SGLang：** 在 MoE 内核调优和统一 Radix 缓存性能方面表现最强。
*   **llama.cpp：** 通过支持 **GraniteSpeech** 和 **K2 Horizon** 等“长尾”及非自回归架构，展现出差异化优势。
*   **Ollama：** 优先支持 Apple Silicon 的原生 **MLX**，以最大化消费级设备的性能。

### 4. 性能前沿
优化工作因项目目标不同而呈现碎片化：
*   **内核/计算：** vLLM 和 SGLang 专注于“融合整合”（减少内核调用）以及针对 DeepSeek-V4.1 的专用命名空间。
*   **内存管理：** 整个行业正掀起一场向 **Rust 编写的树形核心（tree cores）** 迁移的浪潮，旨在利用 Radix 缓存规避 Python 的 GIL 和内存管理开销。
*   **并行计算：** “统一 KV 缓存”是当前的稳定性前沿。`llama.cpp` 和 `vLLM` 在多租户/并行（`-np > 1`）场景下，仍面临内存损坏和响应溢出（response bleeding）的挑战。
*   **量化：** Unsloth 和 llama.cpp 在位宽优化（MXFP4/k-quants）方面处于领先地位，旨在助力 RTX 4090/5090 等消费级硬件实现推理。

### 5. 层级定位
*   **推理引擎 (vLLM, SGLang)：** 为数据中心集成设计的高吞吐、多租户服务后端。
*   **本地运行时 (llama.cpp, Ollama)：** 专注于可移植性（CPU/Vulkan/Metal）和开发者的易用性；填补本地开发与边缘部署之间的鸿沟。
*   **网关 (LiteLLM)：** 抽象层；目前专注于供应商中立的成本映射和安全（提供商密钥的静态加密）。
*   **训练/微调 (Unsloth)：** 为效率而设计的优化训练原语，目前正在构建桥梁，以便将 vLLM/SGLang 作为服务后端。

### 6. 趋势信号
*   **“智能体优先”解析：** 各项目正将重心转向结构化输出（XGrammar, Inkling, Lark）。开发者应预见工具调用将变得更加严格；避免依赖“松散”的 JSON 生成。
*   **基础设施“Rust 化”：** 性能关键组件（缓存、前端）正被用 Rust 重写。如果你正在构建自定义基础设施，请密切关注项目的迁移路线图，以避免技术债务。
*   **存算分离服务 (P/D)：** 随着 P/D（Prefill/Decode，预填充/解码）架构成为主流，“数据一致性”（跨 rank 的 KV 块同步）成为首要稳定性风险。预计 `Mooncake` 及类似的 KV 连接器实现将持续震荡。
*   **建议：** 如果你正在运行生产环境的智能体，请在未来 72 小时内**暂停更新**核心服务引擎（vLLM/SGLang），直到当前出现的 logprobs 和 KV 缓存对齐方面的回归问题得到修复。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 技术摘要：2026-09-26

### 1. 今日重点
目前的开发重心集中在优化 **Speculative Decoding (MRV2)** 和 **DeepSeek-V4.1** 的推理性能上，同时致力于修复解耦服务环境（P/D）中的高并发 Bug。工程团队正投入大量精力为新硬件（SM100/GB200）优化 Triton 内核，并加固近期引入的 Rust 前端。

### 2. 发布与重大变更
*   **过去24小时无新版本发布**。
*   **注意：** Rust 前端（`VLLM_USE_RUST_FRONTEND=1`）目前仍处于实验阶段，功能尚未与 Python 服务器对齐；用户可通过 [#44280](https://github.com/vllm-project/vllm/issues/44280) 追踪进展。

### 3. 新模型与硬件支持
*   **DeepSeek-V4.1：** 针对 SM100/SM103 架构进行性能优化，包括针对 O-projection 和 wkv projection 的特定内核融合（[#58634](https://github.com/vllm-project/vllm/pull/58634), [#58678](https://github.com/vllm-project/vllm/pull/58678)）。
*   **ROCm/MI355X：** 针对 `gfx950` 芯片上 `Qwen3.8-2.4T-A95B` 的性能优化计划正在进行中（[#57149](https://github.com/vllm-project/vllm/issues/57149)）。

### 4. 性能与优化
*   **内核融合：** 通过将 7 个内核合并为一个，实现了 Mamba 块表（block-table）对齐 6 倍的性能提升（[#58737](https://github.com/vllm-project/vllm/pull/58737)）。
*   **投机采样（Speculative Decoding）：**
    *   通过优化元数据构建，主机调度延迟降低了约 11us/步（[#58732](https://github.com/vllm-project/vllm/pull/58732)）。
    *   自适应验证（DSpark）在特定 GLM-5.2 基准测试中显示请求吞吐量提高了约 179%（0.83 -> 2.32 req/s）（[#52992](https://github.com/vllm-project/vllm/pull/52992)）。
*   **JIT 预热：** 提交了新的 PR 以覆盖稀疏 top-k 和 DFlash Triton 特化，防止推理过程中出现 JIT 导致的卡顿（[#58559](https://github.com/vllm-project/vllm/pull/58559)）。

### 5. 稳定性与回归
*   **投机采样/MRV2（高优先级）：**
    *   [#58485](https://github.com/vllm-project/vllm/issues/58485)：思考预算（Thinking budget）损坏导致推理失败。
    *   [#58784](https://github.com/vllm-project/vllm/pull/58784)：MRV2 尝试验证不存在的草稿槽（Fix PR 已开启）。
*   **工具调用（中优先级）：**
    *   [#55152](https://github.com/vllm-project/vllm/issues/55152)：`llguidance` 后端中的结构标签拒绝导致 `tool_choice` 逻辑中断。
    *   [#58792](https://github.com/vllm-project/vllm/pull/58792)：Inkling 工具名称泄露到流式输出中（Fix PR 已开启）。
*   **调度/流式传输（中优先级）：**
    *   [#57447](https://github.com/vllm-project/vllm/pull/57447)：Logprobs 在流式续传过程中未被正确保留（Fix PR 已开启）。

### 6. 对应用开发者的影响
*   **解耦服务（P/D）：** 如果您正在运行复杂的跨节点配置，请留意正在修复的 Mooncake/KV-connector 块对齐问题（[#55097](https://github.com/vllm-project/vllm/pull/55097)）。此处的各项数据完整性正在积极加固中。
*   **工具调用/智能体：** 若使用 `tool_choice` 或复杂的流式格式，请谨慎对待最新的稳定版本，因为推理和工具调用的解析器逻辑目前正处于高频变动期（尤其是涉及 `inkling` 和 `qwen3` 解析器的部分）。
*   **基础设施：** 请确保您的监控能够区分 [#43400](https://github.com/vllm-project/vllm/issues/43400) 中提到的“KV 缓存预留池”与“活跃 KV 缓存”；vLLM 的预分配策略通常会导致较高的内存占用，这是正常现象而非内存泄漏。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 摘要：2026-09-26

### 1. 今日重点
工作重心仍在于确保 DeepSeek-V4.1 架构在不同后端下的稳定性。工程团队投入了大量精力将算子操作迁移至专门的 `dsv4` 命名空间，以提升模块化程度和 JIT 性能。基础设施维护力度进一步加大，正在强化 CI 环境，并转向采用基于 Rust 的 TreeCore 以实现统一的 radix cache 管理。

### 2. 发布与重大变更
*   **无正式发布**：过去 24 小时内无正式版本发布。
*   **默认迁移**：目前正在进行一项重大的架构调整，将 **Rust TreeCore** 设为 radix caching 的默认实现；PR [#39627](https://github.com/sgl-project/sglang/pull/39627) 对 Python 和 Rust 的行为进行了同步，以确保现有部署的平滑过渡。

### 3. 模型与硬件支持
*   **DeepSeek-V4.1 (AMD/ROCm)**：AMD 支持取得实质性进展，包括实现了 FP4 索引器、压缩器和路由器算子 ([#41019](https://github.com/sgl-project/sglang/pull/41019))。
*   **Gemma 3/4**：针对 Gemma3n 的性能优化工作持续进行，重点在于优化共享 KV 注意力机制（shared-KV attention）以降低内存开销 ([#41295](https://github.com/sgl-project/sglang/pull/41295))。
*   **XGrammar**：PR [#39380](https://github.com/sgl-project/sglang/pull/39380) 增加了对 Lark 语法的支持，扩展了项目的结构化输出能力。

### 4. 性能与优化
*   **DeepSeek-V4.1 算子融合**：针对 Hopper 架构的新融合算子（包括 ratio-2 decode pooling 和 RMSNorm）旨在简化计算边界 ([#41294](https://github.com/sgl-project/sglang/pull/41294))。
*   **MoE 算子调优**：针对消费级硬件（如 RTX 4090）上的 MXFP4 MoE 运行器进行了优化，通过在 `triton_kernels` 中固定 `num_warps` 来解决严重的吞吐量不足问题 ([#41292](https://github.com/sgl-project/sglang/pull/41292))。
*   **通用优化**：在 DeepSeek 和 GLM-5.x 系列之间共享 CuTe DSL AR (All-Reduce) 融合核心，以确保一致的高性能扩展性 ([#37196](https://github.com/sgl-project/sglang/pull/37196))。

### 5. 稳定性与回归问题
*   **[严重] HiCache/混合模型**：`attach_hybrid_pool_to_unified_cache` 中的一个 Bug 会导致辅助主机池（secondary host pools）因无法处理 `cudaHostRegister` 失败而引发整个实例崩溃 ([#40926](https://github.com/sgl-project/sglang/issues/40926))。
*   **[高危] Logprob 泄露**：`process_batch_result_prefill` 中的一个 Bug 导致在批量成员被撤回或完成时，提示词的 logprobs 被错误地返回给其他请求 ([#36938](https://github.com/sgl-project/sglang/issues/36938))。
*   **[中等] Apple Silicon**：由于 `mps` 设备内存容量报告错误，导致 `mem_fraction_static` 默认设置为过于激进的数值，从而引发 OOM 问题 ([#39675](https://github.com/sgl-project/sglang/issues/39675))。
*   **[中等] 内存放大**：多模态张量视图正在触发严重的 pickle 内存放大（518倍），这很可能是由于引用处理不当导致的 ([#33388](https://github.com/sgl-project/sglang/issues/33388))。

### 6. 对应用开发者的影响
*   **延迟/吞吐量**：如果您正在高端 NVIDIA (Hopper) 或消费级硬件上运行 DeepSeek-V4.1 或 Gemma 变体，请密切关注后续更新，当前的算子级融合正带来显著的效率提升。
*   **稳定性**：如果您使用了混合 Mamba/SSM 架构或 `HiCache`，请注意目前存在的 `cudaHostRegister` 稳定性问题；建议在 [#40926](https://github.com/sgl-project/sglang/issues/40926) 的修复合并之前，验证您的环境稳定性。
*   **工具链**：如果您的智能体工作流依赖于特定的语法格式，即将通过 XGrammar 支持的 Lark 语法将简化复杂模式约束的集成。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

### Llama.cpp 摘要：2026-09-26

#### 1. 今日重点
开发工作继续聚焦于强化多租户推理，特别是解决并行负载下 KV-cache 和计算缓冲区（compute-buffer）的稳定性问题。基础设施建设方面，重点投入于 Intel (SYCL/Vulkan) 和 Apple Silicon (Metal) 平台的针对性优化，同时扩展对 GraniteSpeech 和 K2 Horizon 等新兴模型架构的支持。

#### 2. 发布与重大变更
*   **b11192 & b11191**: 维护性更新，包括将 `cpp-httplib` 更新至 v0.58.0 [#29407](https://github.com/ggml-org/llama.cpp/pull/29407)，以及规范化 Windows 平台的路径处理逻辑 [#29432](https://github.com/ggml-org/llama.cpp/pull/29432)。

#### 3. 新模型与硬件支持
*   **GraniteSpeech**: 增加了对 `GraniteSpeech5ForCTC`（非自回归、仅编码器架构）的支持 [#29446](https://github.com/ggml-org/llama.cpp/pull/29446)。
*   **K2 Horizon**: 社区正积极推动 K2 Horizon 模型家族（0.9B–36B）的集成 [#29424](https://github.com/ggml-org/llama.cpp/pull/29424)。
*   **Hexagon/Vulkan**: 持续优化 Hexagon 平台的软件除法检查工具 [#29449](https://github.com/ggml-org/llama.cpp/pull/29449)，并提升了 Intel 架构下的 Vulkan 预填充（prefill）性能 [#29357](https://github.com/ggml-org/llama.cpp/pull/29357)。

#### 4. 性能与优化
*   **Metal 优化**: 通过将索引迁移至共享内存，提升了稀疏 Flash Attention (FA) 的性能 [#29377](https://github.com/ggml-org/llama.cpp/pull/29377)。
*   **CPU VNNI**: 为 k-quants 实现了一种新的分块（tiled）`mul_mat`，通过降低量化解包开销，有望在 CPU 上带来 3–7 倍的性能提升 [#27851](https://github.com/ggml-org/llama.cpp/pull/27851)。
*   **MoE 卸载**: 正在开发常驻 GPU 的 MoE 专家权重 LRU 缓存，以减轻解码过程中主机内存（host-RAM）的带宽瓶颈 [#27861](https://github.com/ggml-org/llama.cpp/pull/27861)。
*   **CUDA VRAM**: 针对 BF16/FP16 到 FP32 的转换引入了新的分块策略，以降低显存峰值占用 [#29442](https://github.com/ggml-org/llama.cpp/pull/29442)。

#### 5. 稳定性与回归
*   **统一 KV-Cache 问题 (高优先级)**: 持续收到关于 HIP/ROCm 平台在并行/多租户场景下（`-np > 1`）出现回复内容串扰（bleeding）和提示词处理性能下降的报告 [#25992](https://github.com/ggml-org/llama.cpp/issues/25992), [#28495](https://github.com/ggml-org/llama.cpp/issues/28495)。
*   **Vulkan 编译**: 修复了旧版本 `glslc` 对协作矩阵支持的回归问题 [#29409](https://github.com/ggml-org/llama.cpp/pull/29409)。
*   **服务器端点**: 改进了嵌入（embedding）请求的错误处理，防止出现内部 500 错误 [#29060](https://github.com/ggml-org/llama.cpp/pull/29060)。

#### 6. 对应用开发者的影响
*   **多租户可靠性**: 如果您正在生产环境中使用并行槽（`-np`）部署 `llama-server`，请注意当前统一 KV-cache 内核的不稳定性。在针对 `kv-unified` 的最新修复/调整得到充分验证之前，请密切关注日志中有关提示词处理性能下降或响应内容拼接错误的迹象。
*   **API 改进**: 基于服务器 API 构建工具的开发者可以期待针对非法请求提供更清晰的错误状态；将客户端错误转换为 400 状态码将简化与标准 API 网关的集成。
*   **量化策略**: 如果您在 CUDA 上受到显存限制，可以尝试新的转换分块标志 (`GGML_CUDA_CUBLAS_CONVERT_CHUNK_SIZE`)，以牺牲少量性能为代价改善模型的显存适配。

---

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

### Ollama Infrastructure Digest | 2026-09-26

#### 1. Today's Highlights
Ollama is aggressively pivoting toward native MLX performance on Apple Silicon, with v0.40.0-rc0 now defaulting to the MLX runtime for supported architectures. Simultaneously, development is heavily focused on hardening the OpenAI-compatible API and addressing agentic-flow regressions that have disrupted recent production deployments.

#### 2. Releases & Breaking Changes
*   **v0.40.0-rc0**: Introduces [default MLX runtime](https://github.com/ollama/ollama/pull/18651) execution for Apple Silicon.
*   **API/Tooling**: A critical regression was identified in OpenAI-compatible response IDs ([#18655](https://github.com/ollama/ollama/issue/18655)), which used a tiny `rand.Intn(999)` space, causing collisions in downstream proxies (e.g., LiteLLM). A fix using [UUIDs is currently in progress](https://github.com/ollama/ollama/pull/18656).

#### 3. New Model & Hardware Support
*   **Intel SYCL/oneAPI**: Significant progress on the [Intel GPU backend](https://github.com/ollama/ollama/pull/17621) via `ggml-sycl`. This aims to support Arc/Battlemage architectures as an opt-in build target.
*   **Blackwell Support**: Users report [CUDA discovery failures](https://github.com/ollama/ollama/issue/18581) on NVIDIA RTX 50-series (Blackwell) cards; the engine currently detects 0B VRAM, forcing CPU fallback.
*   **Architecture Parity**: PR [#18657](https://github.com/ollama/ollama/pull/18657) is porting custom Metal kernels (mamba2, depthwise_conv) to CUDA, addressing performance parity gaps between Apple Silicon and NVIDIA backends.

#### 4. Performance & Optimization
*   **MLX Memory Management**: Ongoing work to refine the 8 GiB MLX prefix cache budget ([#18131](https://github.com/ollama/ollama/issue/18131)), which is currently causing heavy swap usage on 32 GB RAM devices during long-context agent workflows.
*   **Throughput Benchmarking**: PR [#17480](https://github.com/ollama/ollama/pull/17480) aims to replace synthetic benchmarks with `HumanEval` patches to better simulate code-generation throughput and speculative drafting performance.

#### 5. Stability & Regressions
*   **[High Severity] Silent Stream Drops**: macOS app users report [silent chat failures](https://github.com/ollama/ollama/issue/18368) after 60 seconds due to prefill latency. A [fix for keeping the stream alive](https://github.com/ollama/ollama/pull/18654) is pending.
*   **[Medium Severity] Vision/Image Discard**: `deepseek-v4.1-flash` is [silently discarding image inputs](https://github.com/ollama/ollama/issue/18637) while reporting vision capabilities.
*   **[Medium Severity] CUDA Crashes**: Reports of `CUDA illegal memory access` during prompt evaluation on [RTX 5090 hardware](https://github.com/ollama/ollama/issue/18642) using Cohere MoE architectures.

#### 6. What This Means for Application Developers
*   **Tool-Calling Reliability**: If your agent architecture relies on `tool` roles, be aware of ongoing issues regarding strict parser compliance ([#18509](https://github.com/ollama/ollama/issue/18509), [#18649](https://github.com/ollama/ollama/issue/18649)). Ensure your backend can handle subtle trailing tokens or noise that current parsers may reject.
*   **Constraint Bypassing**: The `/v1/chat/completions` endpoint is reportedly [ignoring `max_tokens`](https://github.com/ollama/ollama/issue/18575); verify output length limits explicitly in your logic until a patch is merged.
*   **Monitoring**: If your observability stack uses response IDs for tracing, expect collision issues if you are currently using the OpenAI-compatible endpoint—switch to custom logging until the UUID patch ([#18656](https://github.com/ollama/ollama/pull/18656)) is deployed.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

## LiteLLM 摘要：2026-09-26

### 1. 今日重点
今天 LiteLLM 基础设施的重点在于安全性加固和成本映射（cost-map）的准确性。重要的 PR 主要针对静态敏感凭证的加密以及 HTTP 客户端管理的整合。社区正积极处理下游集成问题，特别是关于 Langfuse SDK v4 的迁移以及 Gemini/Bedrock 流式传输可靠性的改进。

### 2. 发布与重大变更
* **版本：** 发布了 `v1.104.0-dev.2`、`v1.100.3`、`v1.99.4` 和 `v1.98.1` 版本。所有产物均使用标准的 `cosign` 密钥进行签名（[Commit 0112e53](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0)）。
* **安全性加固：** [PR #43255](https://github.com/BerriAI/litellm/pull/43255) 引入了针对 Guardrail 供应商密钥、嵌套 `litellm_params`（如 bearer tokens）以及 `router_settings`（Redis 密码）的静态加密功能，解决了 Postgres 中潜在的明文泄露风险。

### 3. 新模型与硬件支持
* **Sail 提供商：** [PR #42840](https://github.com/BerriAI/litellm/pull/42840) 增加了对 `sail/<model>` 的全面支持，将 `metadata.completion_window` 映射到服务层级。
* **OpenRouter 模型：** [PR #43248](https://github.com/BerriAI/litellm/pull/43248) 将 `openrouter/typesafe/jev-router` 加入了成本映射表。
* **决策模型（Decision Models）：** [PR #43234](https://github.com/BerriAI/litellm/pull/43234) 增加了在决策模型路由配置下对 Jev 和 Laya 的支持。

### 4. 性能与优化
* **HTTP 客户端整合：** [PR #43245](https://github.com/BerriAI/litellm/pull/43245) 重构了 HTTP 基础设施，使用统一的 `HttpClientPool`，确保 SSL、超时和代理配置在所有提供商中能够一致地应用。
* **速率限制强制执行：** [PR #43251](https://github.com/BerriAI/litellm/pull/43251) 增加了 `fail_closed_rate_limit_enforcement`，以防止在 Redis 无法连接时出现跨副本的速率限制耗尽问题。

### 5. 稳定性与回归问题
* **[严重] 路由器回退（Router Fallback）：** [Issue #43165](https://github.com/BerriAI/litellm/issues/43165) 报告称，非流式回退在成功时返回 `null` 响应体，导致无法传递实际的补全内容。
* **[高] Redis/SSL：** [Issue #34614](https://github.com/BerriAI/litellm/issues/34614) 确认了 `v1.93.0+` 中的一个回归问题，由于意外的 `ssl_check_hostname` 关键字参数，导致 Redis 缓存失效。
* **[高] Helm/依赖项：** [Issue #26169](https://github.com/BerriAI/litellm/issues/26169) 指出 Helm Chart 中过时的 Redis/Postgres 依赖项正在导致启动回归。
* **[中] 成本映射修正：** [PR #43253](https://github.com/BerriAI/litellm/pull/43253) 和 [PR #43254](https://github.com/BerriAI/litellm/pull/43254) 分别修正了 `fireworks_ai/deepseek-v4p1-flash` 和 `azure_ai/MAI-Image-2.5-Flash` 过时的定价信息。

### 6. 对应用开发者的影响
* **Langfuse 用户：** 如果您正在迁移至 Langfuse SDK v4，请确保关注 OpenTelemetry 数据摄取更新的进展，因为 LiteLLM 目前正在重新调整其针对 v4 路径的元数据映射（[Issue #33383](https://github.com/BerriAI/litellm/issues/33383)）。
* **安全审计：** 如果您运行多租户代理（multi-tenant proxy），请对照 [PR #43255](https://github.com/BerriAI/litellm/pull/43255) 中的静态加密新特性检查您的数据库存储策略，以确保符合您的合规性要求。
* **Gemini/Claude 集成：** 对于依赖 `/v1/messages/count_tokens` 进行 Gemini 调用统计的开发者，请注意 [PR #42735](https://github.com/BerriAI/litellm/pull/42735)，该 PR 引入了一种回退机制，以防止上游 Token 计数失败时出现 500 错误。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

## Unsloth Digest: 2026-09-26

### 1. 今日重点
今天的开发工作主要集中在完善 **Unsloth Studio** 的 UI 体验，以及解决 **AMD (ROCm) 硬件**上严重的推理/训练不稳定问题。多项高优先级 PR 正在处理 GPU 显存规划、特定模型内核重编译延迟，以及集成 **vLLM 和 SGLang** 等替代推理引擎的工作。

### 2. 发布与重大变更
*   **过去 24 小时内无新版本发布。**
*   **依赖项说明：** TRL 支持上限已提升至 `1.13.0` ([PR #11137](https://github.com/unslothai/unsloth/pull/11137))，对于严格锁定旧版 TRL 的用户，可能需要更新依赖项。

### 3. 模型与硬件支持
*   **推理引擎：** 对可选的 **vLLM 和 SGLang** 后端的支持正在进行中，旨在实现多 GPU 服务、提升量化效果及增强视觉模型能力 ([PR #11491](https://github.com/unslothai/unsloth/pull/11491))。
*   **ModelScope 集成：** 用户现在可以将 ModelScope 设置为模型源，这对于 Hugging Face 访问受限或被封锁的地区非常有用 ([PR #11761](https://github.com/unslothai/unsloth/pull/11761))。

### 4. 性能与优化
*   **减少重编译：** 新的 PR 解决了因 `Qwen-Image-2.1` ([PR #11842](https://github.com/unslothai/unsloth/pull/11842)) 和 `MiniMax-H3` ([PR #11880](https://github.com/unslothai/unsloth/pull/11880)) 在图像/视频生成期间动态形状重编译导致的显著停顿（15–50秒）问题。
*   **显存规划：** 图像显存规划器已更新，现在根据加载的 dtype 大小而非磁盘缓存大小进行规划，从而避免了在 24GB 及以上显存卡上的不必要卸载 ([PR #11922](https://github.com/unslothai/unsloth/pull/11922))。
*   **cuDNN 缓存利用率：** 对图像/视频去噪强制执行单线程渲染，以确保更好地重用 `cudnn.benchmark` 和 SDPA 缓存 ([PR #11843](https://github.com/unslothai/unsloth/pull/11843))。
*   **基准测试页面：** 一个用于扫测投机采样（speculative decoding）、KV 缓存和 RAM 卸载设置的新 UI 功能正在开发中 ([PR #11808](https://github.com/unslothai/unsloth/pull/11808))。

### 5. 稳定性与回归问题
*   **AMD/ROCm 不稳定（高优先级）：** 在 RX 7900 XTX 和 Strix Halo 平台上，有大量关于训练挂起、`hipErrorLaunchFailure` 和 VM 错误的报告。问题包括将模型错误加载到系统内存 ([Issue #7449](https://github.com/unslothai/unsloth/issues/7449), [#9549](https://github.com/unslothai/unsloth/issues/9549)) 以及反量化内核中的流处理差异 ([Issue #10563](https://github.com/unslothai/unsloth/issues/10563))。
*   **GGUF 行为异常：** 用户反映 `save_pretrained_gguf` 在导出时未合并 LoRA 适配器，而是静默导出了基础模型 ([Issue #11698](https://github.com/unslothai/unsloth/issues/11698))。
*   **训练形状错误：** 由于 `bitsandbytes.py` 中的兼容性补丁，Qwen3.8-27B bnb-4bit 在第一次前向传播时会崩溃 ([Issue #9867](https://github.com/unslothai/unsloth/issues/9867))。

### 6. 对应用开发者的影响
*   **AMD 工作负载：** 如果您正在基于 AMD 硬件构建，请注意当前版本存在不稳定性。建议优先根据明确记录的特定 ROCm 版本进行测试；目前不要假设训练能在 RDNA1/RDNA2/RDNA3 架构之间通用 ([Issue #11614](https://github.com/unslothai/unsloth/issues/11614))。
*   **生产环境服务：** 即将推出的 vLLM/SGLang 集成将显著提升 Unsloth Studio 在高吞吐服务场景下的生产就绪度；请关注 [PR #11491](https://github.com/unslothai/unsloth/pull/11491) 的合并发布。
*   **Studio 自定义：** 依赖 Unsloth Studio UI 的应用开发者现在可以期待模型选择器和项目管理方面更一致的表现，因为最近的 UI 重构已优化了拖拽和工具提示功能 ([PR #11986](https://github.com/unslothai/unsloth/pull/11986))。

</details>

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*