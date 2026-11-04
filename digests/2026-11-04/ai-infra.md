# AI 基础设施日报 2026-11-04

> 生成时间: 2026-11-04 01:12 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

### 1. 生态概览
截至 2026 年 11 月，AI 基础设施领域的特征在于：业界正迫切寻求解耦服务架构的稳定性，并向“智能体原生”（agent-native）原语过渡。各大项目正围绕统一 API（兼容 OpenAI）进行整合，并日益聚焦于 Blackwell (SM100/120) 和 ROCm (gfx950) 等专用硬件。关注点已从原始吞吐量基准测试转移到预防生产环境中的复杂边缘情况故障，例如跨请求上下文泄漏（cross-request context leakage）和智能体工作流停滞。

### 2. 活动对比
*注：代表性数值基于当前报告的工程投入强度。*

| 项目 | 活动议题 (今日) | PR 强度 (今日) | 发布状态 |
| :--- | :--- | :--- | :--- |
| **vLLM** | 高 (关键 Bug) | 极高 | 稳定 (无新版本) |
| **SGLang** | 高 (稳定性/CI) | 高 | 稳定 (无新版本) |
| **llama.cpp** | 中 | 高 | **已更新 (b12088)** |
| **Ollama** | 中 | 高 | **已更新 (v0.40.15-rc0)** |
| **LiteLLM** | 中 | 高 | 稳定 (无新版本) |
| **Unsloth** | 高 (UX/Beta) | 高 | **已更新 (v0.1.914-beta)** |

### 3. 模型支持竞赛
*   **DeepSeek-V4/V4.1：** 当前衡量“生产就绪度”的基准，是 vLLM 和 SGLang 的核心关注点。
*   **多模态与 TTS：** `llama.cpp` 在“万能模型”领域占据领先地位，集成了 Nemotron-3.5、GLM-5.3 以及 TTS 模型 (`drama-3`, `chatterbox`)。
*   **特定硬件领跑者：**
    *   **vLLM** 在 Blackwell/Rubin 优化以及 MXFP4/8 量化方面领先。
    *   **Unsloth** 在易用微调（NF4/FP8 LoRA）及上下文并行（Generic Ulysses）的普及化方面占据主导地位。
    *   **Ollama/LiteLLM** 扮演“整合者”角色，优先支持新兴的云原生和本地模型（MiMo V2.6, Workers AI）。

### 4. 性能前沿
*   **KV-Cache 与解耦：** vLLM 和 SGLang 正在全力解决“解耦状态”（disaggregated state）难题。优先级在于缓解上下文污染并管理异步 KV 加载，以扩展预填充/解码（PD）部署。
*   **量化：** 向 **MXFP4/8 和 FP8** 演进的趋势已十分明确。vLLM 正在推动从 CUTLASS 向 FlashInfer 的迁移，以榨取 Blackwell 的每一分算力；Unsloth 则在为内存受限的微调优化 FP8 LoRA。
*   **内核效率：** 重点正转向针对 ROCm 的形状特定 Tile 配置，以及通过映射主机内存 (`llama.cpp`) 优化批处理张量读取。

### 5. 层级定位
*   **服务引擎 (vLLM, SGLang)：** 聚焦于超大规模吞吐量和解耦调度；目前正处于“稳定性加固”阶段，以修复生产级的泄漏和内存损坏问题。
*   **本地运行时 (llama.cpp, Ollama)：** 相当于“瑞士军刀”。它们连接了高端研究架构与消费级硬件，并越来越多地采用 NCCL 和多节点支持等企业级特性。
*   **网关 (LiteLLM)：** 作为抽象层，它们正在演进以管理治理功能（MCP 集成、支出记录、断路器），而非仅仅处理原始推理吞吐量。
*   **训练/微调 (Unsloth)：** 正在迈向“流水线编排”。通过引入 Flows，它们正从简单的训练器转变为基于节点的 MLOps 平台。

### 6. 趋势信号
*   **智能体不稳定：** 工具调用失败模式（截断的 JSON、`max_tokens` 限制导致的 500 错误）现已成为基础设施层面的顶级难题。开发者应优先选择支持显式 token 预计算和健壮模式校验的后端。
*   **解耦陷阱：** 虽然 PD（预填充-解码）是行业扩展标准，但目前的实现尚显脆弱。**开发者警示：** 如果您正在运行生产级的解耦服务，请准备好禁用“前缀缓存”（prefix caching）等功能，直到 vLLM/SGLang 解决持续存在的跨请求污染问题。
*   **标准化：** 行业正趋向于将 **OpenAI SDK v3** 和 **MCP (Model Context Protocol)** 作为默认接口。如果您的基础设施栈尚未兼容这些标准，您正在积累技术债。
*   **成本感知智能体：** 对 `latest_turn` 日志记录和 token 计数端点的推动表明了市场转向：生产级智能体的全量日志记录成本过高，基础设施必须进行调整以提供“预算合规”的可观测性。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 技术摘要：2026-11-04

### 1. 今日要点
今日的开发工作重点在于稳定 **KV-connector 基础设施**，并针对大规模 MoE 模型优化 **Blackwell (SM100/SM120) 和 ROCm (gfx950)** 的性能。工程团队目前正致力于解决存算分离部署中的关键跨请求污染问题，并对 V1 调度器的异步 KV 加载机制进行扩容适配。

### 2. 发布与重大变更
*   **无。** 过去 24 小时内没有正式的 vLLM 版本发布。

### 3. 新模型与硬件支持
*   **Blackwell (SM100/SM120) MoE：** 追踪问题 [#65447](https://github.com/vllm-project/vllm/issues/65447) 提议将 W4A4 MXFP4 MoE 内核从 CUTLASS 迁移至 **FlashInfer**，以与现有的 NVFP4 实现保持一致。
*   **Rubin (SM10.7) 量化：** PR [#62759](https://github.com/vllm-project/vllm/pull/62759) 引入了 `lut_b_moe` 支持，使得在 Rubin 硬件上能够实现原生的 MXFP8 激活量化。
*   **Hadamard 量化：** PR [#65398](https://github.com/vllm-project/vllm/pull/65398) 添加了用于在线量化的 `mxfp4_hadamard32_moe`，为 Humming 硬件扩展了 MoE 支持。

### 4. 性能与优化
*   **GB300 专用解码：** PR [#64077](https://github.com/vllm-project/vllm/pull/64077) 实现了一个优化的 Muse Spark Open 解码路径，旨在为 GB300 上的单流负载带来 **1.5 倍的吞吐量提升**。
*   **Blackwell MoE 内核：** PR [#61511](https://github.com/vllm-project/vllm/pull/61511) 优化了 B200 的 `scaled_fp4_experts_quant`，解决了按行专家搜索（per-row expert search）过程中的瓶颈问题。
*   **ROCm 重调优：** PR [#65530](https://github.com/vllm-project/vllm/pull/65530) 通过引入特定形状的 tile 配置，为 `gfx950` 上的 MiniMax-M3.1 优化了 `RocmDotScaledMxfp8LinearKernel`。
*   **KV-Load 调度：** PR [#61725](https://github.com/vllm-project/vllm/pull/61725) 引入了 `max_async_kv_loads_per_step`，以防止存算分离（P/D）部署中的队列饱和。

### 5. 稳定性与回归
*   **严重：跨请求污染：** 问题 [#61160](https://github.com/vllm-project/vllm/issues/61160) 报告称，在使用自动前缀缓存（automatic prefix caching）的 NIXL 存算分离部署中，出现了请求间的内容泄漏。*规避方案：* 使用 `--no-enable-prefix-caching`。
*   **高：DeepSeek-V4.1 块大小：** 问题 [#59203](https://github.com/vllm-project/vllm/issues/59203) 追踪了 Blackwell RTX 6000 服务器上初始化块大小（64/128）失败的问题。
*   **高：机密计算：** 问题 [#57224](https://github.com/vllm-project/vllm/issues/57224) 指出，在 TDX/机密计算模式下，由于主机内存的过时 UVA 视图，H100 会产生无效的乱码输出。
*   **中：ROCm Kimi-K3 DBO：** 问题 [#65106](https://github.com/vllm-project/vllm/issues/65106) 报告称，在使用 8x MI355X 上的 DBO 时，由于 MoE 工作区（workspace）过小，导致 Worker 崩溃。

### 6. 对应用开发者的影响
*   **优先考虑稳定性而非前缀缓存：** 如果您正在运行 DeepSeek 或类似架构的生产级存算分离服务，请检查是否受到 [#61160](https://github.com/vllm-project/vllm/issues/61160) 报告的跨请求上下文污染影响。目前，禁用前缀缓存是唯一推荐的安全措施。
*   **智能体（Agentic）负载停滞：** 如果您在运行智能体负载时遇到无法解释的停滞或“挂起”，请检查您的 KV 传输配置。诸如 [#65519](https://github.com/vllm-project/vllm/pull/65519) 和 [#65398](https://github.com/vllm-project/vllm/pull/65398) 等 PR 表明，拷贝描述符限制和调度器瓶颈是当前高负载环境下的优化热点。
*   **KV Cache 效率：** 如果您正在部署混合模型，请关注 PR [#63347](https://github.com/vllm-project/vllm/pull/63347)；该 PR 通过更好地利用填充后的全注意力 KV 块（padded full-attention KV blocks），有望带来显著的内存效率提升（例如 Gemma-4-26B 性能提升 +15.8%）。

---

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

## SGLang 摘要：2026-11-04

### 1. 今日要点
工作重心仍集中于稳定 **Prefill-Decode (PD) 分离架构**，并将其扩展至 DeepSeek-V4 等新兴模型架构。基础设施建设已转向通过 `api.v1.Generate` 实现统一的 API 覆盖，并致力于减少因 NVIDIA 硬件上持续出现不稳定的 CI 测试而导致的“人工运维”开销。

### 2. 发布与重大变更
*   **过去 24 小时无新版本发布**。
*   **API 迁移**：团队正积极推动将生成逻辑统一至 Rust 服务的 `api.v1.Generate` 模式下。开发者应关注 Issue [#45816](https://github.com/sgl-project/sglang/issues/45816)，以了解后续对 `sgl-processor` 和 `sgl-router` 产生影响的迁移计划。

### 3. 新模型与硬件支持
*   **Intel XPU**：支持 Paged Experts（LES + SSD 卸载）的 RFC 正在进行中，旨在实现单 GPU MoE 卸载 ([#46520](https://github.com/sgl-project/sglang/issues/46520))。
*   **AMD/ROCm**：正在针对 `gfx950` / MI355X 上的 Qwen3.8-Flash-Next 进行积极优化 ([#44304](https://github.com/sgl-project/sglang/issues/44304))。
*   **NPU (昇腾)**：致力于在分离架构中提升 DeepSeek-V4 长上下文负载的测试对等性 ([#48160](https://github.com/sgl-project/sglang/pull/48160))。

### 4. 性能与优化
*   **PD 分离路线图**：第四季度路线图确认 PD 是 SGLang 的核心扩展策略，重点在于实现其与 HiCache、投机解码以及各种并行策略的交叉兼容 ([#43699](https://github.com/sgl-project/sglang/issues/43699))。
*   **内核分析**：正在调查 Blackwell (SM120) 硬件上 DeepSeek-V4 预填充（Prefill）性能严重不足的问题，目前吞吐量约为 2-7K tok/s，而其他后端报告的吞吐量约为 12.5K ([#33422](https://github.com/sgl-project/sglang/issues/33422))。
*   **Hopper (SM90)**：持续对 GLM-5.3-Flash 进行性能调优 ([#45373](https://github.com/sgl-project/sglang/issues/45373))。

### 5. 稳定性与回归
*   **严重 (高)**：Cuda Coredump Tracker 仍处于活跃状态，以排查引擎层反复出现的故障 ([#26340](https://github.com/sgl-project/sglang/issues/26340))。
*   **回归 (中)**：在 5090 GPU 上运行的 CI 任务显示，Wan VAE 解码的延迟出现了 2-10 倍的峰值，影响了扩散模型的性能指标 ([#48196](https://github.com/sgl-project/sglang/issues/48196))。
*   **投机解码 (中)**：发现了一个 bug，由于输入保护机制过于严格，`chain_speculative_sampling_triton` 会错误地拒绝概率略高于 1.0 阈值的草稿 ([#42568](https://github.com/sgl-project/sglang/issues/42568))。

### 6. 对应用程序开发者的意义
*   **多轮智能体 (Multi-turn Agents)**：如果您正在构建智能体工作流，请务必注意会话亲和性（session affinity）至关重要。SGLang 的 `RadixAttention` 非常高效，但它要求同一会话的连续轮次落在同一个 GPU 实例上，以绕过预填充开销 ([#34513](https://github.com/sgl-project/sglang/issues/34513))。
*   **工具调用 (Tool Calling)**：如果您在 Qwen 或其他模型中遇到 XML 格式的响应，请确保您的后端已配置为 OpenAI 标准格式，因为默认解析器可能需要显式的配置覆盖 ([#31763](https://github.com/sgl-project/sglang/issues/31763))。
*   **稳定性**：如果您正在使用投机解码 (EAGLE/MTP)，请密切关注您的部署情况；对于 V100 等特定 GPU 架构，内核级的 OOB 崩溃或 NCCL 中止问题仍有上报 ([#37936](https://github.com/sgl-project/sglang/issues/37936))。

---

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 摘要：2026-11-04

### 1. 今日亮点
该项目继续积极扩展对多模态和专用架构的支持，引入了 NVFP4 LFM3 支持以及 Nemotron 3.5 Transcribe 能力。基础设施层面的成熟度是当前的重点，标志性进展包括集成 NCCL 以实现多节点张量并行，以及针对复杂投机采样（speculative decoding）工作流的内存管理持续优化。

### 2. 发布与重大变更
*   **b12088:** 启用 NVFP4 LFM3 GGUF 模型支持 [PR #31608](https://github.com/ggml-org/llama.cpp/pull/31608)。
*   **b12079:** 添加了用于多节点张量并行的 NCCL 后端，为跨进程集合通信操作提供了标准化的接口 [PR #28967](https://github.com/ggml-org/llama.cpp/pull/28967)。
*   **b12078:** 对 GGUF 分片合并实施了更严格的验证；现在会拒绝不匹配的分片以防止损坏 [PR #31579](https://github.com/ggml-org/llama.cpp/pull/31579)。

### 3. 新模型与硬件支持
*   **Nemotron 3.5 Transcribe:** 添加了完整支持，包括针对草稿模型和 BF16 要求的特定转换处理 [PR #31471](https://github.com/ggml-org/llama.cpp/pull/31471)。
*   **GLM-5.3:** 添加了对 "next sm" 张量架构的支持，包括特定的 MLA 头部分割逻辑 [PR #30499](https://github.com/ggml-org/llama.cpp/pull/30499)。
*   **TTS 模型:** 目前正在积极将 `drama-3` 和 `chatterbox` TTS 模型集成到 `mtmd` 框架中 [PR #31613](https://github.com/ggml-org/llama.cpp/pull/31613), [PR #30993](https://github.com/ggml-org/llama.cpp/pull/30993)。

### 4. 性能与优化
*   **SYCL 后端:** 合并了 `ggml_sycl_comm_exchange` 的改进，在 Intel Arc Pro B70s 上使用 `-sm tensor` 配置时，提示词评估速度（t/s）提升了 **~19%** [PR #30956](https://github.com/ggml-org/llama.cpp/pull/30956)。
*   **CUDA:** 通过收集到映射的主机内存优化了批量张量读取 [PR #31391](https://github.com/ggml-org/llama.cpp/pull/31391)，并添加了有序 4 列 GDN 实现，以修复 MTP 模型中的解码回归问题 [PR #31630](https://github.com/ggml-org/llama.cpp/pull/31630)。
*   **CPU:** 通过寄存器提升和循环展开对 `ggml_vec_dot_tq1_0_q8_K_generic` 进行了微优化，使该内核速度提升了 **1.86 倍** [PR #31628](https://github.com/ggml-org/llama.cpp/pull/31628)。

### 5. 稳定性与回归
*   **服务器稳定性:** 已识别出一个严重 Bug，即无效的工具模式（tool schemas）会导致 `llama-server` 在调用 `/v1/realtime` 时崩溃；目前正在进行修复 PR，改为返回错误事件 [Issue #31626](https://github.com/ggml-org/llama.cpp/issue/31626), [PR #31632](https://github.com/ggml-org/llama.cpp/pull/31632)。
*   **投机采样:** 关于在使用量化目标（如 Q4_K_M）进行贪婪采样时输出发散的问题，目前仍在积极讨论中 [Issue #25618](https://github.com/ggml-org/llama.cpp/issue/25618)。
*   **后端断言:** 有报告指出在使用 `DFlash2` 并配合 `--split-mode tensor` 时会出现 `GGML_ASSERT` 崩溃，归因于图分配失败 [Issue #28777](https://github.com/ggml-org/llama.cpp/issue/28777)。

### 6. 对应用开发者的影响
*   **多节点扩展:** 计划进行大规模分布式推理的开发者应评估新的 NCCL 实现，它取代了之前基于 rpc 的集合通信方法。
*   **工具/智能体稳定性:** 如果你正在使用 `/v1/realtime` 构建智能体系统，请注意模式（schemas）验证目前是一个潜在的崩溃触发点。确保你的后端已更新以包含即将推出的错误处理 PR。
*   **多模态流水线:** 随着 `mtmd`（多模态）支持的快速扩展，如果你的应用依赖于特定的 Qwen3-VL 或 Nemotron 提示词模板，请确保跟踪最新的 `llama.cpp` 构建，因为格式规范正在被严格化。

---

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

## Ollama 基础设施摘要：2026-11-04

### 1. 今日重点
本周期的工作重点在于强化 GGUF 拉取路径，并解决 API/工具调用（Tool-calling）栈中的关键稳定性问题。核心工程进展包括：转向更稳健的并行 blob 校验，以及修复在工具调用执行截断时的边缘情况错误。

### 2. 发布与重大变更
*   **v0.40.15-rc0：** 在 Linux 上引入进程内（in-process）CUDA 库加载，以提升环境一致性 [PR #19433](https://github.com/ollama/ollama/pull/19433)。
*   **v0.40.14：** 主要修复了 Claude Code token 限制覆盖问题，并修正了 `/api/chat` 中搜索响应的解压错误 [Release Details](https://github.com/ollama/ollama/compare/v0)。

### 3. 新模型与硬件支持
*   **MiMo V2.6：** 增加了对 MiMo V2.6 模型系列的原生支持 [PR #19400](https://github.com/ollama/ollama/pull/19400)。
*   **MLX 视频/能力：** 通过 MLX 为 Qwen3-VL/LFM3-Omni 提供的视频输入支持进展顺利 [PR #19348](https://github.com/ollama/ollama/pull/19348)。
*   **AutoTrust：** 针对 AutoTrust 文本和视觉模型的 MLX 集成正在开发中 [PR #19399](https://github.com/ollama/ollama/pull/19399)。

### 4. 性能与优化
*   **拉取延迟：** GGUF 拉取路径的重大优化正在进行中；该优化将 blob 哈希校验调整至并行下载阶段进行，消除了目前下载完成后冗余的磁盘扫描步骤 [PR #19505](https://github.com/ollama/ollama/pull/19505), [Issue #19504](https://github.com/ollama/ollama/issues/19504)。
*   **Tokenization：** 新增 `/api/tokenize` 和 `/api/detokenize` 接口，允许开发者在无需加载完整模型的情况下计算 token 数量 [PR #19498](https://github.com/ollama/ollama/pull/19498)。
*   **MLX 并发：** 继续开发为 MLX 启用 `OLLAMA_NUM_PARALLEL` 的功能，以支持跨请求共享前馈计算 [PR #19197](https://github.com/ollama/ollama/pull/19197)。

### 5. 稳定性与回归
*   **工具调用（高优先级）：** 已识别出一个导致截断的工具调用返回 HTTP 500 的问题；正在修复中，当模型触发 `num_predict` 上限时，将忽略格式错误的 JSON 片段 [Issue #19493](https://github.com/ollama/ollama/issues/19493), [PR #19494](https://github.com/ollama/ollama/pull/19494)。
*   **API 认证错误（中优先级）：** `Client.stream()` 在响应体非 JSON 格式时，目前会丢失 `401` 授权详细信息 [Issue #19489](https://github.com/ollama/ollama/issues/19489), [PR #19491](https://github.com/ollama/ollama/pull/19491)。
*   **构建回归（中优先级）：** Windows 用户在使用 `cmake -G Ninja` 构建时会遇到安装损坏问题，导致嵌套的 `llama-server` 无法正确构建；正在修复中 [Issue #19495](https://github.com/ollama/ollama/issues/19495), [PR #19496](https://github.com/ollama/ollama/pull/19496)。

### 6. 对应用开发者的影响
*   **可靠的 Token 计算：** 您现在可以通过新增的 `/api/tokenize` 接口以编程方式验证 token 数量，无需加载本地模型权重，这非常适合 RAG 流水线中的预先预算计算。
*   **智能体稳定性：** 如果您正在构建使用工具调用的智能体工作流，请注意：目前达到 `max_tokens` 限制可能会因 JSON 不完整而导致 500 错误。请密切关注 [PR #19494](https://github.com/ollama/ollama/pull/19494)，该 PR 即将修复此问题，以便优雅地处理截断的工具输出。
*   **生产环境监控：** 如果您正在监控日志，请注意 `HumanNumber` 格式化程序存在舍入问题，可能会导致显示困惑（例如显示 "1000K" 而非 "1M"）——在修复补丁发布前，请确保您的仪表盘逻辑能够处理这些边缘情况 [PR #19500](https://github.com/ollama/ollama/pull/19500)。

---

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 基础设施摘要：2026-11-04

### 1. 今日重点
本周期重点在于 **MCP (Model Context Protocol) 集成**，一系列 PR 正在推动强制执行模型提供商原生的工具权限，并实现 MCP 服务器注册与网关执行的解耦。同时，团队正在强化代理稳定性，在内存高效的费用日志记录以及 Redis 断路器恢复的稳健处理方面取得了重大进展。

### 2. 发布与重大变更
*   **过去 24 小时内无新版本发布。**
*   **即将到来的重大变更 (PR 中)：**
    *   [#47762](https://github.com/BerriAI/litellm/pull/47762)：向 **OpenAI SDK v3** 的迁移正在进行中，需要更新 `uv.lock` 和 Docker 基础镜像。
    *   [#46424](https://github.com/BerriAI/litellm/pull/46424)：针对响应 ID 验证的关键加固；代理现在将严格拒绝非网关生成的 `resp_` ID，以防止潜在的跨密钥请求欺骗。
    *   [#46730](https://github.com/BerriAI/litellm/pull/46730)：实现对 `Retry-After` 响应头的更严格遵守，并改进了重试的指数退避/抖动逻辑。

### 3. 新模型与硬件支持
*   **Cloudflare Workers AI：** [已合并] 增加了对原生 Workers AI 图像生成 ([#35055](https://github.com/BerriAI/litellm/issues/35055)) 以及音频/转录工作流 ([#35056](https://github.com/BerriAI/litellm/issues/35056)) 的支持。

### 4. 性能与优化
*   **日志占用空间缩减：** [PR #49544](https://github.com/BerriAI/litellm/pull/49544) 引入了可选的 `latest_turn` 费用日志模式，为那些在每次请求中都传输完整对话历史的无状态 Agent 显著减少了数据库膨胀。
*   **CI/CD 效率：** [PR #49984](https://github.com/BerriAI/litellm/pull/49984) 通过停用 `quiet_stack` 锁优化了 E2E 测试套件，允许并行执行此前会限制 CI 运行能力的测试。

### 5. 稳定性与回归问题
*   **Redis 断路器 (高优先级)：** [Issue #49884](https://github.com/BerriAI/litellm/issues/49884) 反馈称，在 Redis 发生故障转移（例如出现 READONLY 错误）后，断路器会无限期卡在 `HALF_OPEN` 状态，导致请求被永久拒绝。
*   **配置/启动回归：** [Issue #49813](https://github.com/BerriAI/litellm/issues/49813) 指出，如果宿主机操作系统缺少 `tzdata`，代理在使用特定时区（如 `Asia/Calcutta`）时会启动崩溃。
*   **Bedrock/Anthropic 不兼容：** [Issue #49969](https://github.com/BerriAI/litellm/issues/49969) 发现一个回归问题：当切换到非 Anthropic 模型（如 GLM 5.3）时，Bedrock 会重新注入 Anthropic 特有的推理签名，从而导致 400 Bad Request 错误。
*   **内部服务器错误：** [Issue #35860](https://github.com/BerriAI/litellm/issues/35860) 指出，目前缺少 API 密钥会返回 500 状态码，这会触发不必要的重试，而非快速失败。

### 6. 这对应用开发者意味着什么
*   **MCP 安全性：** 如果你依赖 MCP 工具，请关注新的注册管理机制 ([#49891](https://github.com/BerriAI/litellm/pull/49891))。LiteLLM 正向一种模型转型，即工具权限严格绑定到团队/密钥；请确保你的工具定义已更新为使用这些新的注册 ID。
*   **无状态 Agent：** 如果你使用的 Agent 在 LiteLLM 之外维护上下文（例如 LangGraph 或自定义编码 Agent），请在相关 PR 合并后尽快切换到新的 `latest_turn` 费用日志模式，以大幅降低存储成本。
*   **Prompt 缓存：** 使用 `vertex_ai/claude-sonnet-5` 的开发者需注意，在跨全局端点时可能会出现间歇性的缓存命中失败 ([Issue #35908](https://github.com/BerriAI/litellm/issues/35908))；如果遇到意料之外的延迟峰值，请核实你的缓存头部信息。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

## Unsloth 基础设施简报：2026-11-04

### 1. 今日亮点
Unsloth v0.1.914-beta 现已上线，为 Unsloth Studio 引入了全新的“Glass”主题及增强的 UI 自定义功能。在基础设施方面，团队正在积极扩展 **Flows**（基于节点的流水线编排），并推进核心性能基元，包括 FP8 LoRA 优化和通用 Ulysses 上下文并行处理。

### 2. 发布与重大变更
*   **[v0.1.914-beta](https://github.com/unslothai/unsloth)：** 新增 Glass 主题、扩展了多 GPU 训练选项，并引入了初步的 CPU 训练支持。
*   **Studio API：** 用户反馈称，`UnloadRequest` 现在强制要求设置 `force_cancel_active=True` 才能停止活跃的生成任务，以确保更安全的资源卸载 ([#16479](https://github.com/unslothai/unsloth/pull/16479))。

### 3. 新模型与硬件支持
*   **FSDP2 与 MoE：** 新增对将堆叠式 MoE 专家作为本地分片加载的支持，专门解决了与 Nemotron-H 检查点的兼容性问题 ([#16560](https://github.com/unslothai/unsloth/pull/16560))。
*   **NF4 扩展：** 融合式 NF4 解码现已支持 Mistral、Qwen2 和 Qwen3 架构，可通过 `UNSLOTH_DECODE_FUSED_NF4=1` 启用 ([#16066](https://github.com/unslothai/unsloth/pull/16066))。
*   **VRAM 工具：** 提议引入一个新的、解耦的 Python 包用于显存 (VRAM) 估算，允许在不加载完整 Studio 训练堆栈的情况下进行外部集成 ([#16563](https://github.com/unslothai/unsloth/pull/16563))。

### 4. 性能与优化
*   **FP8 LoRA：** 正在实现针对冻结 16-bit 基座模型的 LoRA 显式 FP8 前向传播和输入梯度 GEMM ([#16423](https://github.com/unslothai/unsloth/pull/16423))。
*   **上下文并行：** 引入了“通用 Ulysses”，支持在任何 Hugging Face 注意力模型上实现上下文并行，而无需侵入式的训练器补丁 ([#16558](https://github.com/unslothai/unsloth/pull/16558))。
*   **编译优化：** 块编译 (Block compilation) 现在可以在检查点重计算中复用前向图，解决了视觉/音频模型训练期间关键的 `CheckpointError` 崩溃问题 ([#16596](https://github.com/unslothai/unsloth/pull/16596))。

### 5. 稳定性与回归问题
*   **UI 性能（高）：** 多名用户报告桌面应用存在 UI 延迟，特别是在长时间对话期间 ([#16603](https://github.com/unslothai/unsloth/pull/16603))。
*   **安装/更新问题（中）：** 使用 macOS (MLX) 和 Windows 11 的用户反馈无法完成 v0.1.914-beta 的更新 ([#16561](https://github.com/unslothai/unsloth/pull/16561), [#16573](https://github.com/unslothai/unsloth/pull/16573))。
*   **Vulkan/AMD（中）：** 老旧硬件（RX 5700 XT）上的 Vulkan 加速问题仍在处理中 ([#16395](https://github.com/unslothai/unsloth/pull/16395))。
*   **回归修复：** PR [#16604](https://github.com/unslothai/unsloth/pull/16604) 优化了 `adapter_config.json` 的访问方式，避免了推理工作进程初始化期间多余的 I/O 操作。

### 6. 对应用程序开发者的意义
*   **对于流水线构建者：** 将“数据配方” (Data Recipes) 集成到 Flows 画布中 ([#15604](https://github.com/unslothai/unsloth/pull/15604)) 表明，Unsloth 正朝着用于微调流水线的低代码 DAG 方法演进。如果你需要自动化的评估/训练循环，请开始测试 Flows 节点编辑器。
*   **对于 API 集成者：** 如果你正在围绕 Unsloth Studio 构建包装器，请注意 Studio 对 `chat_template_kwargs` 的过滤器目前较为严格（会丢弃自定义键，例如 `verification`）。在 [#16545](https://github.com/unslothai/unsloth/pull/16545) 等 PR 解决之前，请确保你的逻辑不依赖于透传参数。
*   **成本管理：** 如果你正在构建多租户或对成本敏感的智能体应用，请关注提议中的“全局 Token 使用限制” (Global Token Usage Guardrail) ([#16486](https://github.com/unslothai/unsloth/pull/16486))，这对生产环境的 API 成本控制至关重要。

</details>

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*