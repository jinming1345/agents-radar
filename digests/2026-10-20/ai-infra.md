# AI 基础设施日报 2026-10-20

> 生成时间: 2026-10-20 01:27 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# AI 基础设施生态报告：2026-10-20

### 1. 生态系统概览
AI 基础设施生态系统目前处于“整合与扩展”阶段，其主要特征是致力于稳定大规模 MoE 架构和多模态集成。各项目正在超越简单的推理服务，着力解决长周期智能体（Agentic）会话的复杂需求，包括有状态的 KV Cache 管理和分布式 P2P 边缘部署。硬件与软件协同设计的趋势愈发明显，针对 GB200、昇腾（Ascend）NPU 以及移动/边缘平台的专用内核正逐渐成为行业标配。

### 2. 活动对比
*注：代表性数值基于当前报告的摘要活动统计。*

| 项目 | 发布状态 | 活跃 Issue | 重要 PR 活动 |
| :--- | :--- | :--- | :--- |
| **vLLM** | 稳定 (v0.29.x) | 高 (死锁/回归) | 关键 (KV 卸载/内核) |
| **SGLang** | v0.5.22 | 高 (投机采样崩溃) | 高 (MoE 融合/内核) |
| **llama.cpp** | b11748 | 中等 (RPC/多节点) | 稳定 (后端/MTMD) |
| **Ollamac** | 维护中 | 高 (Windows/云) | 中等 (Apple Silicon/云) |
| **LiteLLM** | 维护中 | 中等 (计费) | 聚焦 (OIDC/Rust) |
| **Unsloth** | v0.1.909-beta | 低 (分布式) | 激进 (FSDP2/GRPO) |

### 3. 模型支持竞赛
*   **DeepSeek-V4.1：** 目前行业公认的标杆。**vLLM** 和 **SGLang** 均已更新架构定义，**Unsloth** 则支持了本地训练/微调（552B 参数）。**llama.cpp** 在针对该架构的多 worker RPC 输出方面表现吃力。
*   **多模态：** **llama.cpp** 在 Qwen-VL 和 LFM2-VL 的 MTMD（多模态）切片及精度优化方面处于领先地位，而 **vLLM** 则专注于有界内存（bounded-memory）的视频会话。
*   **创新：** **Unsloth** 在消费级/小型集群硬件上实现超大规模（552B）模型微调方面表现独树一帜，有效地将前沿级模型的训练平民化。

### 4. 性能前沿
优化工作主要根据用例分为两类：
*   **KV Cache 管理：** **vLLM** 优先考虑 CPU 卸载和 LRU 策略，以防止长周期智能体会话中的 Cache 抖动。
*   **内核融合：** **SGLang** 正积极推进 MoE 内核融合（特别是针对 Qwen MoE），而 **Unsloth** 则在分布式微调的梯度重计算优化方面不断突破极限。
*   **量化：** **vLLM** 正在推动面向 ROCm/AMD 平台的 MXFP4 支持，这表明其正致力于拓宽对 NVIDIA H100/GB200 以外硬件的生态支持。

### 5. 层级定位
*   **推理引擎（vLLM, SGLang）：** 专注于高吞吐、高并发的生产部署。它们是架构中的“重型主力”，但目前在投机采样（Speculative Decoding）和复杂的多节点状态管理稳定性上遇到挑战。
*   **本地运行时（llama.cpp, Ollama）：** 优先考虑可访问性和硬件可移植性。其重心已转向 P2P 连接和对多样化后端（SYCL, OpenCL, Hexagon）的支持。
*   **网关（LiteLLM）：** 抽象层。目前重心在于运营稳定性（OIDC/Azure 认证缓存）和成本追踪准确性——这对生产环境编排至关重要。
*   **微调（Unsloth）：** 专用优化层。通过专注于内核级别的内存缩减，弥补了超大规模参数量与可用显存之间的差距。

### 6. 趋势信号
*   **智能体延迟：** 行业正转向“有界内存”和“有状态”推理，承认 LLM 已不再仅仅是完成引擎，而是长周期的自主处理流程。
*   **“上下文悬崖”：** 多个项目（llama.cpp/vLLM）报告在长上下文（>80k tokens）下性能下降，表明 KV Cache 管理仍是扩展 RAG 和智能体工作流的主要瓶颈。
*   **工具可靠性：** 在整个生态（SGLang, Ollama, LiteLLM）中，关于工具调用/JSON Schema 逻辑失败的报告屡见不鲜。**决策者应将“原生工具调用”视为实验性功能**，并务必将客户端验证作为强制性的安全层。
*   **多云弹性：** 云发现功能（`ollama ls --cloud`）与 P2P 服务器连接的集成表明，基础设施的下一次演进将是流动的、潜在的分布式环境，而非静态的数据中心集群。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 工程摘要：2026-10-20

### 1. 今日要点
vLLM 生态系统目前正致力于稳定下一代架构（GB200/SM121）下的高并发负载，并完善 Model Runner V2 (MRV2) 的集成。主要进展包括：针对长时代理会话的 KV 缓存管理取得了显著进展，并正在解决近期推测解码内核中引入的性能回归问题。

### 2. 发布与重大变更
*   **过去 24 小时内无新版本发布**。
*   **注意**：正在使用 `vllm preload` 的用户请监控内存占用情况，PR [#62583](https://github.com/vllm-project/vllm/pull/62583) 指出内存报告存在偏差，可能导致缓存预热期间出现 OOM 错误。

### 3. 新模型与硬件支持
*   **ROCm**：PR [#60413](https://github.com/vllm-project/vllm/pull/60413) 为 RDNA3/3.5 引入了可选择开启的 W4A8 MXFP4 GEMV 内核，旨在提高解码效率。
*   **ROCm MLA**：PR [#62447](https://github.com/vllm-project/vllm/pull/62447) 为 gfx950 架构增加了 `VLLM_ROCM_MLA_PREFILL_FLYDSL_FP8` 支持。
*   **模型迁移**：PR [#60823](https://github.com/vllm-project/vllm/pull/60823) 继续将库内集成的模型配置迁移至上游 `transformers` 5.16.1，包括对更新后的 DeepSeek-V4/4.1 架构的支持。

### 4. 性能与优化
*   **DiffusionGemma**：PR [#62581](https://github.com/vllm-project/vllm/pull/62581) 引入了画布打包（canvas packing）与交换机制，在高负载下对于短请求可实现高达 **10 倍的延迟改善**。
*   **KV Offload**：PR [#62444](https://github.com/vllm-project/vllm/pull/62444) 为 `SimpleCPUOffload` 实现了改进的 LRU 策略，防止频繁访问的 GPU 前缀缓存命中项被过早驱逐。
*   **Top-K 内核**：正在调查 `_topk_topp_kernel` 中的回归问题（Issue [#61998](https://github.com/vllm-project/vllm/issues/61998)），该问题导致内核在 MiMo-V2.6 等大模型上因高斯枢轴（Gaussian pivot）计算错误而回退到全词表搜索。

### 5. 稳定性与回归
*   **[严重] 死锁**：Issue [#37729](https://github.com/vllm-project/vllm/issues/37729) 报告了 V1 引擎核心在 FP8 + 前缀缓存 + Qwen3.5 负载并存的情况下出现死锁。
*   **[高] 性能回归**：Issue [#59770](https://github.com/vllm-project/vllm/issues/59770) 指出，自 v0.29.0 版本以来，DGX Spark (GB10) 上的**解码速度下降了 16%**；目前状态为开启，调查仍在进行中。
*   **[中] 推测解码**：Issue [#61806](https://github.com/vllm-project/vllm/issues/61806) 报告称在使用带有 DP 的自适应验证时草稿 token 计数偏高；PR [#61807](https://github.com/vllm-project/vllm/pull/61807) 提供了修复方案。
*   **[中] 多模态**：Issue [#62123](https://github.com/vllm-project/vllm/issues/62123) 确认 `/pause` 会因为错误地清除 SHM 多模态缓存而触发致命的 `ValueError`。

### 6. 对应用开发者的影响
*   **RAG/Agent 负载**：如果您大量使用前缀缓存，PR [#62444](https://github.com/vllm-project/vllm/pull/62444) 中的修复至关重要，它可以防止 CPU 卸载缓存频繁挤出高频 Prompt。
*   **工具调用/结构化输出**：利用 `json_schema` 约束的用户请密切关注 PR 动态，目前有关于语法位掩码分段（grammar bitmask staging）的性能回归报告（Issue [#62442](https://github.com/vllm-project/vllm/issues/62442)）。
*   **视频理解**：如果您正在构建长时流式数据摄入流水线，RFC [#51948](https://github.com/vllm-project/vllm/issues/51948) 关于受限内存视频会话的讨论是一个关键话题，因为目前对长时间有状态视频推理的支持尚有限。

---

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

## SGLang 摘要：2026-10-20

### 1. 今日亮点
SGLang v0.5.22 已发布，该版本重点致力于稳定复杂的投机采样（speculative decoding）工作流，并优化了 MoE 架构的内核性能。项目组目前正积极解决 CI 环境的不稳定性及高并发下的正确性问题，同时也在同步扩展对下一代硬件及统一 KV Cache 方案的支持。

### 2. 发布与重大变更
*   **v0.5.22:** 最新稳定版本。详见 [release details](https://github.com/sgl-project/sglang/releases/tag/v0.5.22)。

### 3. 新模型与硬件支持
*   **Clef / Clef Flash:** 增加了对该 LLM/VLM 架构的支持。[Cookbook](https://docs.sglang.io/cookbook/autoregressive/Cloudflare/clef)
*   **PPLX-Decider v1 / v1.1:** 增加了对新型 LLM/VLM 决策模型的支持。[Cookbook](https://docs.sglang.io/cookbook/a)
*   **Ascend NPU:** 持续优化跨代设备适配及 HiCache 在昇腾平台上的集成（[Issue #35709](https://github.com/sgl-project/sglang/issues/35709), [Issue #35620](https://github.com/sgl-project/sglang/issues/35620)）。

### 4. 性能与优化
*   **DeepSeek-V4.1:** PR [#45275](https://github.com/sgl-project/sglang/pull/45275) 通过消除编码器重放折叠（encoder-replay folding）过程中阻塞的主机同步操作，提升了延迟表现。
*   **MoE Kernel Fusion:** PR [#40057](https://github.com/sgl-project/sglang/pull/40057) 实现了 Qwen MoE 模型单次调用的共享专家门控融合（fused shared-expert gating），显著降低了开销。
*   **Triton Kernel Upgrades:** PR [#29639](https://github.com/sgl-project/sglang/pull/29639) 将 Attention 内核迁移至 Triton 张量描述符，以进行硬件快速路径优化。
*   **Intel XPU:** 针对 DeepSeek V4 的优化现已包含 block-fp8 权重的直接反量化及优化的元数据内核（[PR #40616](https://github.com/sgl-project/sglang/pull/40616), [PR #40614](https://github.com/sgl-project/sglang/pull/40614)）。

### 5. 稳定性与回归问题
*   **CI Infrastructure:** 针对大范围 CI 不稳定问题的优先级跟踪仍在进行中（[Issue #42752](https://github.com/sgl-project/sglang/issues/42752)）。
*   **Speculative Decoding Crashes:** 用户反馈在使用 speculative-use-block-verification 时，EAGLE/MTP 存在严重问题，导致非法内存访问或 PP 中继失败（[Issue #45159](https://github.com/sgl-project/sglang/issues/45159), [Issue #45162](https://github.com/sgl-project/sglang/issues/45162)）。
*   **Output Corruption:** 一个已知问题：`SGLANG_MORI_NUM_MAX_DISPATCH_TOKENS_PER_RANK` 在 MoE 后端会导致隐性的语义损坏，目前尚未修复（[Issue #27194](https://github.com/sgl-project/sglang/issues/27194)）。
*   **Server Hangs:** 已收到关于 `pause_generation` 序列触发服务器全局挂起的 Bug 报告（[Issue #44835](https://github.com/sgl-project/sglang/issues/44835)）。

### 6. 对应用开发者的影响
*   **Tool-Calling Reliability:** 使用 `qwen3_coder` 的开发者需注意当前存在的结构性问题：由于流式检测或标签触发机制错误，可能导致 JSON 参数格式不正确（[Issue #45235](https://github.com/sgl-project/sglang/issues/45235), [Issue #45226](https://github.com/sgl-project/sglang/issues/45226)）。如使用这些版本，请确保在客户端进行稳健的 JSON 校验。
*   **Multi-Modal Inputs:** API 错误处理已收紧；请确保您的集成逻辑能够处理 400 系列状态码，而非将错误的媒体输入统一视为通用的 500 错误（[Issue #40897](https://github.com/sgl-project/sglang/issues/40897)）。
*   **Consistency:** top-k/top-p 过滤的采样路径正在被统一（[PR #41916](https://github.com/sgl-project/sglang/pull/41916)）；如果您之前注意到不同请求类型间存在非确定性行为，此修复应能稳定您的输出分布。

---

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 摘要: 2026-10-20

### 1. 今日要点
开发工作重点在于稳定多模态（MTMD）架构，特别是对 Qwen-VL 图像处理进行了优化，以使其与参考实现保持一致。服务器基础设施也在持续演进，增加了对实验性 P2P 连接的支持，同时 SYCL 和 OpenCL 的底层后端优化也提升了对量化张量（quantized tensors）的专项计算支持。

### 2. 发布与重大变更
*   **构建：** 近期的发布（b11732–b11748）包括了一些微小的稳定性补丁和功能集成。
*   **服务器实验性 P2P：** [#28277](https://github.com/ggml-org/llama.cpp/pull/28277) 引入了 `--connect` 参数，用于实现对本地网络之外的 `llama-server` 实例进行实验性 P2P 访问。

### 3. 新模型与硬件支持
*   **HybridDNA：** 增加了对 Carbon-14B HybridDNA 分词器（tokenizer）的支持，包括自定义标记（tagging）和 N-padded 尾部 token 处理 [#30825](https://github.com/ggml-org/llama.cpp/pull/30825)。
*   **OpenCL 增强：** 扩展了 OpenCL 后端，以支持 `i32` get_rows 以及 `i32/f32` 拷贝转换 [#30756](https://github.com/ggml-org/llama.cpp/pull/30756)。
*   **协作式 GEMM：** 为 OpenCL 后端增加了适用于 `q4_0`、`q4_k` 和 `q6_k` 的协作式（cooperative-k）dp4a GEMM 内核 [#30741](https://github.com/ggml-org/llama.cpp/pull/30741)。
*   **Hexagon v85：** 通过 `ggml_hexagon_init` 增加了对 Hexagon v85 硬件的初步支持 [#30842](https://github.com/ggml-org/llama.cpp/pull/30842)。

### 4. 性能与优化
*   **MTMD 瓦片处理（Tiling）：** 在将 LFM2-VL 的瓦片处理和布局与 transformers 参考实现对齐方面取得了进展 [#30261](https://github.com/ggml-org/llama.cpp/pull/30261), [#30840](https://github.com/ggml-org/llama.cpp/pull/30840)。
*   **SYCL 重排序修复：** 解决了在重排序量化权重上使用 `get_rows` 时存在的性能和正确性问题 [#30430](https://github.com/ggml-org/llama.cpp/pull/30430)。
*   **Qwen-VL 缩放：** 修正了图像缩放逻辑，使其符合 transformer 的预期，从而避免了潜在的图像伪影 [#30736](https://github.com/ggml-org/llama.cpp/pull/30736)。

### 5. 稳定性与回归问题
*   **关键（RPC/多节点）：** 报告指出，在使用多 worker RPC 设置时，DeepSeek V4 输出会出现退化 [#30794](https://github.com/ggml-org/llama.cpp/issues/30794)。
*   **高优先级（Vulkan）：** 用户报告在 Vulkan 后端（RX 6900 XT）加载模型时，设置 `--moe-cache-mib` 会导致崩溃 [#30697](https://github.com/ggml-org/llama.cpp/issues/30697)。
*   **高优先级（HIP/ROCm）：** 在 ROCm 6.3.4 上观察到关于 `group_mask_warp_inplace` 的编译错误 [#30755](https://github.com/ggml-org/llama.cpp/issues/30755)。
*   **高优先级（吞吐量）：** Qwen3.8-27B 出现“解码断崖”现象，即在上下文长度超过 80K tokens 时，吞吐量显著下降 [#27623](https://github.com/ggml-org/llama.cpp/issues/27623)。

### 6. 对应用程序开发者的影响
*   **P2P 部署：** `--connect` 的引入表明 `llama.cpp` 正朝着更简便的远程/云边部署方向发展，但维护者强调目前该功能处于**实验性**阶段。在确认稳定性之前，请勿在生产环境中使用。
*   **多模态精度：** 集成 Qwen-VL 或 LFM2-VL 模型的开发者应注意，最近关于图像缩放和瓦片处理的改动意味着模型推理行为可能与上周的版本略有不同，请务必验证视觉模型的输出结果。
*   **约束检查：** 如果你正在构建高上下文智能体（>80k），请留意当前 master 分支上报告的性能下降问题；在部署新模型版本之前，请务必针对特定的硬件后端进行本地测试。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

### Ollama 基础设施简报：2026-10-20

#### 1. 今日重点
开发工作继续聚焦于完善云模型集成，提升 Apple Silicon 上 MLX 运行时的稳定性，并解决 Windows/ROCm 环境中的回归问题。值得关注的进展包括：优化云模型发现流程的 PR，以及修复 OpenAI 兼容 API 中关键的工具调用逻辑问题。

#### 2. 发布与重大变更
*   **过去 24 小时内无新版本发布。**
*   **API/工具：** 正在修复逻辑错误，该错误导致内容数组为空的 `assistant` 消息会错误地将工具调用合并到历史记录中 ([PR #19152](https://github.com/ollama/ollama/pull/19152))。

#### 3. 新模型与硬件支持
*   **MLX/Apple Silicon：** 正在实现对 **DFlash2** 的支持，引入了块局部动态卷积 ([PR #19149](https://github.com/ollama/ollama/pull/19149))。
*   **YaRN RoPE 缩放：** 修复了 MLX Qwen3 运行时，确保 YaRN RoPE 缩放被正确应用，防止了 Prism ML 的 Bonsai 等模型出现 RoPE 行为异常 ([PR #19134](https://github.com/ollama/ollama/pull/19134)，解决了 [#19129](https://github.com/ollama/ollama/issues/19129))。

#### 4. 性能与优化
*   **Llama.cpp 更新：** 更新至版本 `b11738`，以引入上游最新的性能改进与兼容性补丁 ([PR #19143](https://github.com/ollama/ollama/pull/19143))。
*   **云集成：** 新增 `ollama ls --cloud` 命令，允许开发者无需轮询本地守护进程即可发现可用的云模型 ([PR #19153](https://github.com/ollama/ollama/pull/19153))。
*   **MoE 预取：** 一项来自社区的功能请求（本地 MoE PCIe 预取器）宣称通过缓解 VRAM 到 RAM 的溢出停顿，可实现 **+46% tok/s 的性能提升** ([Issue #19136](https://github.com/ollama/ollama/issues/19136))。

#### 5. 稳定性与回归
*   **高优先级 (Cloud API)：** 有报告称 `deepseek-v4.1-flash` 在处理大负载时会返回乱码文本及 HTTP 413 错误，尽管其并未超出上下文限制 ([Issue #19156](https://github.com/ollama/ollama/issues/19156), [#19155](https://github.com/ollama/ollama/issues/19155))。
*   **高优先级 (Windows)：** Windows 11 上持续出现服务器静默崩溃的报告，以及 NVIDIA 硬件上大提示词引发的连接重置问题 ([Issue #18061](https://github.com/ollama/ollama/issues/18061), [#19139](https://github.com/ollama/ollama/issues/19139))。
*   **中优先级 (ROCm)：** 在使用 ROCm 7.2 后端的 Radeon Pro W5700 (gfx1010) 上报告了 `GGML_ASSERT` 崩溃 ([Issue #19075](https://github.com/ollama/ollama/issues/19075))。
*   **中优先级 (MLX)：** 由于权重重塑错误，Qwen 3.5 视觉模型在 MLX 运行时中出现了通道交换问题 ([Issue #19127](https://github.com/ollama/ollama/issues/19127))。

#### 6. 对应用开发者的影响
*   **智能体编排：** 构建 Agent 工作流的开发者需注意，原生的 `/api/chat` 端点存在一个 Bug，导致工具定义在到达模型前被剥离 ([Issue #19040](https://github.com/ollama/ollama/issues/19040))。请暂时使用 `/v1` 路由作为临时解决方案。
*   **云/远程扩展：** 如果你正在使用 Ollama 作为云模型的网关，请做好应对大代码请求时出现间歇性 413 错误及上游连接重置的准备。
*   **状态管理：** 在单次会话中切换模型时请谨慎；`keep_context` 功能目前容易出现 UI/运行时状态不同步，导致节点故障 ([Issue #19137](https://github.com/ollama/ollama/issues/19137))。

---

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 摘要：2026-10-20

### 1. 今日重点
今日工作重心在于完善原生 Rust 实现，并确保代理（Proxy）在高并发负载下的稳定性。目前正在全力解决 OIDC 凭证交换瓶颈，并修复长期存在的令牌计费及护栏（Guardrail）执行时序问题。

### 2. 发布与重大变更
*   **过去 24 小时内无新版本发布。**
*   **重大变更 ([PR #44349](https://github.com/BerriAI/litellm/pull/44349))：** 流式重构修复可能会影响那些预期在重建文本补全中获得特定 `finish_reason` 或 `usage` 对象格式的下游消费者。
*   **重大变更 ([PR #34889](https://github.com/BerriAI/litellm/pull/34889))：** GitHub Copilot 集成现在要求 GHE 用户配置 `GITHUB_COPILOT_API_BASE`；此前通过 URL/文件配置 key 的方法已被弃用。

### 3. 新模型与硬件支持
*   **Hopper 推理：** 增加了对 Hopper 后端的原生支持 ([PR #47465](https://github.com/BerriAI/litellm/pull/47465))。包括 Gemma 4 和 DeepSeek V4.1 Flash 的定价与配置。
*   **Pi Harness：** 将 `pi` 模型支持集成至 `litellm.agent()`，支持通过 AI Gateway 进行路由 ([PR #45467](https://github.com/BerriAI/litellm/pull/47467))。

### 4. 性能与优化
*   **Azure 令牌管理：** 一项关键修复 ([PR #47417](https://github.com/BerriAI/litellm/pull/47417)) 将 Entra OIDC 令牌获取操作移出事件循环（Event Loop），并实现了基于突发的缓存机制，以防止在高流量冷启动期间出现代理整体阻塞。
*   **护栏执行：** PR [#47467](https://github.com/BerriAI/litellm/pull/47467) 通过将正则表达式匹配绑定到执行截止时间并释放 GIL，提升了护栏的响应速度，减少了延迟抖动。
*   **遥测一致性：** PR [#47468](https://github.com/BerriAI/litellm/pull/47468) 通过 `trace_id` 哈希标准化了 Arize 采样，确保分布式代理 Pod 之间的日志记录保持一致。

### 5. 稳定性与回归问题
*   **内存饱和 ([Issue #27954](https://github.com/BerriAI/litellm/Issue/27954))：** 代理 Pod 在负载下长期存在的高内存占用问题仍是目前的首要稳定性隐忧。
*   **预算/计费 Bug：** 
    *   [Issue #47396](https://github.com/BerriAI/litellm/Issue/47396)：对于 Anthropic 工具选择请求，预算预留错误地使用了 `max_input_tokens` 而非实际使用的 Token 数。
    *   [Issue #45422](https://github.com/BerriAI/litellm/Issue/45422)：GitHub BYOK 的 Token 消耗报告出现异常（显示为零）。
*   **Vertex AI 修复：** 正在进行一项修复 ([PR #47466](https://github.com/BerriAI/litellm/pull/47466))，以正确将区域加成系数应用于批量成本计算，确保非全局端点的账单准确。

### 6. 对应用开发者的影响
*   **基础设施可靠性：** 若您的代理配置了 Azure/Entra 身份验证，请务必监控近期令牌获取重构 ([PR #47417](https://github.com/BerriAI/litellm/pull/47417)) 带来的延迟改善情况。
*   **成本监控：** 若您使用 Vertex AI 或 GitHub BYOK，请注意上述 Bug 可能导致当前的 Token 及成本日志不准确；若计费准确性至关重要，请优先审计相关日志。
*   **Agent 开发：** 若您正在使用 `litellm.agent()` 构建应用，新的 `Pi` 集成和结构化原生响应处理 ([PR #46573](https://github.com/BerriAI/litellm/pull/46573)) 提升了跨模型的统一性。但请务必测试您的工具使用工作流，以排查新模式映射逻辑可能带来的副作用。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 摘要：2026-10-20

### 1. 今日亮点
Unsloth 已进入大规模功能扩展阶段，重头戏是集成了 **DeepSeek-V4.1** 和 **FLUX.3**。开发重点主要集中在训练基础设施上——具体包括引入 DPO、ORPO 和 GRPO 目标函数，以及通过全新的原生 FSDP2 实现来支持高级多 GPU 训练。

### 2. 发布与重大变更
*   **v0.1.909-beta**：正式支持 DeepSeek-V4.1-Flash-1017 和 FLUX.3。包含多 GPU FSDP2 alpha 版本以及用于智能体的“一键式” MCP 设置。 [发布说明](https://github.com/unslothai/unsloth)

### 3. 新模型与硬件支持
*   **DeepSeek-V4.1-Flash-1017**：552B 参数模型（16B 激活参数）现可在本地运行；在 1-bit 量化下需要约 125GB 显存。 [发布说明](https://github.com/unslothai/unsloth)
*   **FLUX.3 Image Klein**：已集成，用于本地图像生成和多模态工作流。 [发布说明](https://github.com/unslothai/unsloth)

### 4. 性能与优化
工程团队正积极进行内核级优化，以降低内存开销和延迟：
*   **原生 FSDP2 (#14273)**：新增封装器，支持对 LoRA、QLoRA 和全参数微调进行逐块 (per block) `fully_shard`。 [PR #14273](https://github.com/unslothai/unsloth/pull/14273)
*   **交叉熵效率 (#14295)**：针对 `label == -100` 的 token 加入提前退出逻辑，跳过 logit 加载和 `exp` 计算，从而防止 NaN/Inf 污染并节省计算周期。 [PR #14295](https://github.com/unslothai/unsloth/pull/14295)
*   **梯度重计算优化 (#14103)**：在梯度检查点重计算中跳过 `down_proj`，因为它在反向传播图中是冗余的。 [PR #14103](https://github.com/unslothai/unsloth/pull/14103)
*   **SDPA Packing (#14296, #14219)**：就地 (in-place) 掩码操作并减少 `torch.cat` 调用；针对 RTX 40 系列硬件进行了内存效率优化。 [PR #14296](https://github.com/unslothai/unsloth/pull/14296), [PR #14219](https://github.com/unslothai/unsloth/pull/14219)

### 5. 稳定性与回归问题
*   **高优先级：分布式训练 (#14063)**：块编译 (Block compile) 会导致分布式运行中的检查点重计算中断，抛出 `CheckpointError`。*临时方案：* 使用 `UNSLOTH_BLOCK_COMPILE=0`。 [Issue #14063](https://github.com/unslothai/unsloth/issues/14063)
*   **中优先级：模型库 (Model Hub) (#14221)**：模型库过滤功能的回归，导致 UI 显示异常。 [Issue #14221](https://github.com/unslothai/unsloth/issues/14221)
*   **中优先级：桌面应用/浏览器 (#14055, #13629)**：macOS 上存在多个 UI 问题（滚动条/输入响应延迟）。 [Issue #14055](https://github.com/unslothai/unsloth/issues/14055), [Issue #13629](https://github.com/unslothai/unsloth/issues/13629)

### 6. 这对应用开发者意味着什么
*   **智能体开发**：随着 **MCP (Model Context Protocol)** 的集成和资源读取支持 ([PR #14243](https://github.com/unslothai/unsloth/pull/14243))，Unsloth Studio 正演变为一流的智能体 IDE。开发者现在可以构建与本地资源原生交互的智能体。
*   **高级训练**：引入了带有 `REWARD.md` 库的 GRPO ([PR #12601](https://github.com/unslothai/unsloth/pull/12601))，允许在无需外部训练基础设施的情况下进行更复杂的偏好对齐微调。
*   **企业/规模化应用**：运行多 GPU 设置的开发者应关注新的 `UNSLOTH_FSDP2=1` 标志，以有效处理更大的模型分片，但前提是需要通过禁用块编译来规避当前的分布式训练 bug。

</details>

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*