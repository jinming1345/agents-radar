# AI 基础设施日报 2026-10-11

> 生成时间: 2026-10-11 01:13 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

本报告综述了截至 **2026-10-11** 的 AI 基础设施生态系统现状。

### 1. 生态系统概览
基础设施领域目前正经历向**模型原生优化（model-native optimization）**的深度转型，重点已从通用内核转向针对混合架构（MoE、投机解码和决策模型）的特定支持。优先级呈现出明显的分化：vLLM 和 SGLang 正在高吞吐量企业级推理领域争夺主导地位，而 `llama.cpp` 和 Ollama 则巩固了其作为本地与边缘运行环境标准的地位。与此同时，LiteLLM 正在成长为关键的治理层，用于管理“决策模型（Decision model）”工作流日益增加的复杂性。

### 2. 活动对比
*注：统计数据基于截至 2026-10-11 的 24 小时窗口期。*

| 项目 | 最近发布 | PR 活动 | 主要稳定性担忧 |
| :--- | :--- | :--- | :--- |
| **vLLM** | 无 | 高 | 批处理不变性 / CUDA graph 挂起 |
| **SGLang** | 无 | 高 | VMM 内存泄漏 / CUDA graph 崩溃 |
| **llama.cpp** | b11550-b11552 | 中等 | 服务器状态损坏 / Vulkan 回退 |
| **Ollama** | 无 | 中等 | MLX 运行器恐慌 / 工具调用解析 |
| **LiteLLM** | v1.104.3 (rc) | 高 | 鉴权对齐 / 预算准确性 |
| **Unsloth** | 无 | 高 | 推理性能下降 / 内核不匹配 |

### 3. 模型支持竞速
当前生态系统主要锚定三大目标：**DeepSeek-V4.1**、**Qwen3.8** 以及新兴的 **决策模型（Decision Models）**（如 Microsoft Decision 1）。
*   **领先者：** **vLLM 与 llama.cpp** 在支持先进的 MoE 和混合架构方面旗鼓相当。vLLM 在硬件特定加速（Blackwell/MI355X）方面领先，而 llama.cpp 在跨平台/边缘硬件支持（SYCL/Vulkan/OpenCL）方面领跑。
*   **落后者：** **Ollama** 依然依赖 `llama.cpp` 上游的迁移，在实现新型架构时通常会有 24-48 小时的滞后。

### 4. 性能前沿
优化工作因部署目标的不同而呈现高度碎片化：
*   **分布式推理 (vLLM/SGLang)：** 重点在于**投机解码（Speculative Decoding）**（DSpark/Eagle）和 **KV Cache 内存管理**（HiCache）。大量的工程人力正投入到“批处理不变性（Batch Invariance）”上，以确保 Agent 工作流输出的确定性。
*   **内核/设备 (llama.cpp/Unsloth)：** 重点集中在**量化注意力内核（quantized attention kernels）**（MoE 的 Flash-Attention 变体）和内存回收（基于 mmap 的缩减）上。
*   **性能回退趋势：** 高吞吐框架普遍面临 `torch.compile` 和 CUDA graph 捕获脆弱的问题，这对许多用户而言，目前反而导致性能波动而非提升。

### 5. 层级定位
*   **推理引擎 (vLLM, SGLang)：** 专为多租户、高吞吐量的云环境设计。它们功能最为丰富，但在负载下的非确定性问题上仍面临挑战。
*   **本地运行环境 (llama.cpp, Ollama)：** 致力于最大化消费级/工作站硬件的利用率，并简化本地开发者的“模型即服务”体验。
*   **网关 (LiteLLM)：** 作为抽象层，将应用程序与模型提供商的细节解耦。当前重点在于成本治理和标准化的工具调用。
*   **训练/微调 (Unsloth)：** 定位为高效、低显存占用的参数高效微调（PEFT），目前正在平衡“快速迭代”与“推理性能回退”之间的矛盾。

### 6. 趋势信号
*   **“决策”时代：** 专用决策模型（Microsoft, system-one）的兴起正迫使所有项目更新其架构方案，这预示着模型正从单纯的文本生成向专门用于工具编排的方向转变。
*   **确定性作为首要任务：** 构建 Agent 工作流的开发者正要求 `temperature=0` 的可靠性。行业正从“足够快”转向“持续正确”，vLLM 的 `VLLM_BATCH_INVARIANT` 就是这一趋势的典型案例。
*   **开发者关注列表：** 
    *   **Agent 构建者：** 请密切关注 Ollama 中的 `model/parsers` 相关 PR 以及 Unsloth 中的工具调用去重修复，以避免 Agent 循环故障。
    *   **基础设施负责人：** 如果你的结构化数据提取工作流需要严格的输出确定性，在当前的批处理不变性补丁稳定之前，请避免升级到推理引擎目前的 `v0.31` 版本。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 技术摘要：2026-10-11

本摘要总结了 vLLM 项目的当前进展，重点关注 2026-10-11 窗口期在性能调优、架构支持及稳定性方面的最新动态。

### 1. 今日重点
今日的工作重心在于针对大规模部署的关键稳定性与性能优化，特别是针对 DeepSeek-V4.1 和 Blackwell (SM100) 硬件上的混合推测解码（hybrid speculative decoding）架构。目前正在开展重要工作，以确保 `VLLM_BATCH_INVARIANT` 在各种内核和 all-reduce 操作中的正确性，从而保证生产级推理中输出的确定性。

### 2. 发布与重大变更
*   **过去 24 小时内无新版本发布**。用户目前正处于 v0.31.0 发布后的过渡期，重点在于解决推测解码和前缀缓存（prefix caching）中报告的回归问题。

### 3. 新模型与硬件支持
*   **Blackwell (SM100/10.3) 支持：** 持续致力于稳定 NVIDIA Blackwell GPU 的内核支持，包括修复内核端的测试回归（[\#59910](https://github.com/vllm-project/vllm/pull/59910)）以及为稀疏 MLA 解码启用 `FLASH_ATTN_MLA_SPARSE_FA4`（[\#55866](https://github.com/vllm-project/vllm/pull/55866)）。
*   **Gemma4 分类任务：** 正在追踪 `Gemma4ForSequenceClassification` 对非词汇表大小输出头的支持请求（[\#43726](https://github.com/vllm-project/vllm/issues/43726)）。

### 4. 性能与优化
*   **DeepSeek-V4.1 效率：** 在解码索引器中引入了长度感知的候选块选择，以防止对全宽 logits 缓冲区进行不必要的评分（[\#61039](https://github.com/vllm-project/vllm/pull/61039)）。
*   **GDN 优化：** 在门控增量网络（Gated Delta Net, GDN）层的预填充（prefill）阶段，减少了主机端 PyTorch 算子的调用，旨在改善混合预填充/解码步骤中的延迟（[\#61034](https://github.com/vllm-project/vllm/pull/61034)）。
*   **MI355X/gfx950 优化：** 持续推进 AMD MI355X 上 Qwen3.8 Flash-Next 和 Qwen3.8-2.4T-A95B 模型的性能优化路径（[\#57149](https://github.com/vllm-project/vllm/issues/57149), [\#59575](https://github.com/vllm-project/vllm/issues/59575)）。

### 5. 稳定性与回归
*   **非确定性输出：** 接到关于 DeepSeek-V4 在 `temperature=0` 时出现非确定性行为以及常规批处理不变性（batch invariance）回归的高严重性报告（[\#53257](https://github.com/vllm-project/vllm/issues/53257)）。目前有多个 PR 正在针对这些关键路径进行修复（[\#61036](https://github.com/vllm-project/vllm/pull/61036), [\#61035](https://github.com/vllm-project/vllm/pull/61035)）。
*   **前缀缓存损坏：** 在 Qwen3.8-27B 上使用 DFlash2/DSpark 配合前缀缓存时，报告了输出损坏问题（[\#60174](https://github.com/vllm-project/vllm/issues/60174)）。
*   **CUDA Graph 挂起：** 正在调查 Intel Arc B70 GPU 在执行 `torch.xpu.graphs.replay()` 时可能出现的挂起现象（[\#54698](https://github.com/vllm-project/vllm/issues/54698)）。

### 6. 对应用开发者的意义
*   **确定性工作负载：** 如果您的应用依赖于高确定性（例如结构化提取、智能体工具调用），请在批处理不变性相关的 PR（[#61035](https://github.com/vllm-project/vllm/pull/61035), [#61036](https://github.com/vllm-project/vllm/pull/61036)）合并并稳定之前，谨慎使用 vLLM v0.30.0–0.31.0 版本。
*   **池化/嵌入（Pooling/Embeddings）：** 如果您使用了 `/pooling` 端点，请监控 [\#60947](https://github.com/vllm-project/vllm/issues/60947)，因为当前版本可能会意外禁用这些任务的前缀缓存，从而导致 RAG 重型应用的延迟增加。
*   **推测解码：** 使用草稿头（Eagle, MTP, DFlash）部署模型的用户应注意，推测解码可能会干扰前缀缓存命中，从而在提示词密集的负载下增加计算成本。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 基础设施摘要：2026-10-11

### 1. 今日重点
开发工作继续专注于强化 **DSpark（投机采样）** 以及通过 `torch.compile` 微调来优化 **基于扩散模型（Diffusion-based model）的服务**。当前工作的一大部分涉及解决多 GPU (TP8) 配置下 CUDA graph 捕获的可靠性问题，并优化 `HiCache` 和调度器逻辑，以防止分布式环境中的状态不一致。

### 2. 发布与重大变更
*   **过去 24 小时内无新版本发布**。
*   **重大/行为变更说明**：现在，使用 `float32` 配合 `flashinfer` 注意力机制的用户将会触发快速失败（fail-fast），此前该行为会导致引擎启动序列中出现未处理的 `KeyError` 崩溃 ([PR #43628](https://github.com/sgl-project/sglang/pull/43628))。

### 3. 新模型与硬件支持
*   **AMD (gfx950/MI355X)**：为 `DeepSeek-V4.1-Flash` 引入了可选的单解码（mono-decode）FFN 路径，可通过 `SGLANG_ROCM_MONO_DECODE=1` 启用 ([PR #43497](https://github.com/sgl-project/sglang/pull/43497))。
*   **扩散模型**：针对 `SANA-Video 2.0` 的集成工作正在进行中，包括对可中断 CUDA graph 的支持 ([PR #41501](https://github.com/sgl-project/sglang/pull/41501))。

### 4. 性能与优化
*   **Diffusion `torch.compile`**：投入大量精力修复性能回退问题，即 `torch.compile` 运行速度慢于即时执行（eager execution）的情况（例如 Cosmos3, Qwen-Image-2.1）。工作包括维持完整图（whole-graph）的完整性并绕过 `inductor` 缓存问题 ([PR #43586](https://github.com/sgl-project/sglang/pull/43586), [PR #43601](https://github.com/sgl-project/sglang/pull/43601))。
*   **KV Cache**：在 CUDA 上增加了对 `TileLang FP8 KV cache` 的支持，以提高内存效率 ([PR #42957](https://github.com/sgl-project/sglang/pull/42957))。
*   **调度器**：将等待前缀（waiting-prefix）刷新机制从基于墙上时间（wall time）调整为基于前向传播次数（forward count），以防止跨节点的 LRU 不一致 ([PR #43512](https://github.com/sgl-project/sglang/pull/43512))。

### 5. 稳定性与回归问题
*   **[高] CUDA VMM 内存泄漏**：在 `waiting_queue` 中被中止的多模态请求未能释放 VMM 传输切片，导致内存泄漏 ([Issue #43402](https://github.com/sgl-project/sglang/issues/43402))。
*   **[中] Qwen3.8-27B 准确性**：用户反馈在近期版本中，W4A16 服务的质量相比 vLLM 出现了显著下降 ([Issue #42917](https://github.com/sgl-project/sglang/issues/42917))。
*   **[中] 确定性推理**：`enable-deterministic-inference` 无法确保像 `granite-4.0-h` 这样的混合 Mamba2 模型的批处理不变性 ([Issue #43413](https://github.com/sgl-project/sglang/issues/43413))。
*   **[已修复] 预填充（Prefill）准入**：修复了一个 Bug，该 Bug 会导致 `ignore_eos=True` 的请求计算出错误的 token 比例，从而在 Qwen3-32B 上导致潜在的过早 OOM ([PR #43564](https://github.com/sgl-project/sglang/pull/43564))。

### 6. 对应用开发者的影响
*   **如果您正在服务扩散模型**：请注意，`torch.compile` 目前正处于高频变动期。如果您发现相比即时模式性能有所下降，请检查图中断日志（`TORCH_LOGS=graph_breaks`），团队目前正在积极清理这些问题。
*   **如果您在运行高吞吐生产环境**：请留意 `HiCache` 和调度器的修复。如果您在不同节点间遇到不一致的驱逐或“状态分歧”行为，请更新版本以获取统一基数缓存（unified radix cache）中关于基于单调时间刷新机制的修复 ([PR #43512](https://github.com/sgl-project/sglang/pull/43512))。
*   **多模态用户**：请谨慎处理海量的多模态请求；如果您的应用程序频繁中止请求（例如激进的客户端超时），您可能会触发 [Issue #43402](https://github.com/sgl-project/sglang/issues/43402) 中提到的 VMM 内存泄漏。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

### llama.cpp 文摘：2026-10-11

#### 1. 今日要点
工作重心依然是提升 `llama-server` 在高并发负载下的稳定性，并扩展对现代 MoE 和 Flash-Attention 架构的支持。关键进展包括对 OpenCL 和 Vulkan 后端的重大改进，以及针对多请求场景下服务器状态管理的修复。

#### 2. 发布与重大变更
*   **b11552：** 修复了在提示词缓存（prompt cache）操作期间，繁忙槽位（busy slots）被错误更新的竞态条件。 [PR #30295](https://github.com/ggml-org/llama.cpp/pull/30295)
*   **b11551：** 正式支持 MiniCPM-V 4.7，包括扩展的 Mrope 时间支持。 [PR #29416](https://github.com/ggml-org/llama.cpp/pull/29416)
*   **b11550：** 禁用了 s390x 的 z17 编译器目标，以防止在不支持的环境中构建失败。 [PR #30297](https://github.com/ggml-org/llama.cpp/pull/30297)

#### 3. 模型与硬件支持
*   **MiniCPM-V 4.7：** 通过 `b11551` 引入了完整的运行时支持。
*   **DeepSeek V4.1：** 针对 `DeepseekV41ForCausalLM` 架构的高级运行时和转换支持目前正在审核中。 [PR #28696](https://github.com/ggml-org/llama.cpp/pull/28696)
*   **OpenCL：** 为 MoE 操作增加了新的内核（`q4_k_q8_1_dp4a` 和 `q6_k_q8_1_dp4a`）。 [PR #30187](https://github.com/ggml-org/llama.cpp/pull/30187)
*   **SYCL：** 实现了权重重排的 MXFP4 MoE 解码加速。 [PR #29809](https://github.com/ggml-org/llama.cpp/pull/29809)

#### 4. 性能与优化
*   **内存效率：** 一个待合并的 PR (#24156) 引入了 `--reclaim-mmap-source` 参数，通过丢弃休眠的 mmap 页，可在模型加载时减少约 35-38% 的 RSS 占用。 [PR #24156](https://github.com/ggml-org/llama.cpp/pull/24156)
*   **OpenCL/FA：** 改进了 Flash-Attention 内核，支持 `dk=512` 和 `dk=64` 配置，防止了 Gemma-4 和 GPT-OSS 在处理时出现不必要的 CPU 回退。 [PR #30266](https://github.com/ggml-org/llama.cpp/pull/30266)
*   **流水线并行（Pipeline Parallelism）：** 实验性地支持将 MoE 专家模型保留在主机内存（RAM）中，以缓解 VRAM 限制。 [PR #29963](https://github.com/ggml-org/llama.cpp/pull/29963)

#### 5. 稳定性与回归问题
*   **服务器严重 Bug：** [#30091](https://github.com/ggml-org/llama.cpp/issues/30091) 在长上下文对话中（HIP/Windows），`llama-server` 出现 "Bad allocation" 错误。
*   **Vulkan 回归：** [#30039](https://github.com/ggml-org/llama.cpp/issues/30039) 在 RDNA1 (gfx1010) 硬件上观察到约 45% 的提示词处理性能下降。
*   **推理错误：** [#27148](https://github.com/ggml-org/llama.cpp/issues/27148) 在高负载下，基于 RAM 的缓存可能会将不相关的对话内容恢复到新槽位中。
*   **投机采样（Speculative Decoding）：** 基于 MTP 的投机采样（Qwen 3.8 Flash）在启动时会出现断言失败或崩溃。 [Issue #29811](https://github.com/ggml-org/llama.cpp/issues/29811)

#### 6. 对应用开发者的影响
*   **服务器并发：** 如果您运行的是多用户环境，请升级至 **b11552** 以防止提示词缓存损坏。
*   **内存受限的部署：** 请密切关注 PR #24156；如果该 PR 被合并，它将成为在不牺牲精度的情况下降低推理节点内存占用的最有效手段。
*   **可观测性：** 请注意 `llama-server` REST API 和 `libllama` 的文档目前正在积极修订中；如果您正在构建自定义封装库，请跟踪 [Issue #9291](https://github.com/ggml-org/llama.cpp/issues/9291) 以了解最新的接口变更。

---

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 基础设施摘要：2026-10-11

### 1. 今日重点
开发工作目前高度集中在优化模型服务器后端，特别是 `llama.cpp` 的集成以及对工具调用 (tool-calling) 模式的稳健处理。目前正进行一项重大的架构调整，旨在统一决策模型的处理方式，将逻辑从 Ollama 自定义的评分器 (scorer) 中剥离，转而利用 `llama.cpp` 的原生支持。

### 2. 发布与重大变更
*   **过去 24 小时内无新版本发布**。
*   **重大变更/用户体验提示**：PR [#18915](https://github.com/ollama/ollama/pull/18915) 建议精简 `/api/tags` 和 `ollama list` 的输出，不再在显示名称中包含 `:latest` 后缀。这可能会影响那些依赖完整标签字符串的下游脚本。

### 3. 新模型与硬件支持
*   **K2 Horizon 系列**：社区请求支持 MBZUAI 的 K2 Horizon 模型（从 0.9B 到 36B MoE）。见 [#18698](https://github.com/ollama/ollama/issues/18698)。
*   **KailA 架构**：提议在 `llama.cpp` 兼容层中添加 `kail` 架构支持，以解决“未知模型架构”报错。见 [#18922](https://github.com/ollama/ollama/issues/18922)。
*   **决策模型**：PR [#18917](https://github.com/ollama/ollama/pull/18917) 将 `llama.cpp` 更新至 `b11521`，实现了对 `/v1/systemone` 和 EmbeddingGemma 2 的原生支持。

### 4. 性能与优化
*   **工具调用效率**：多个 PR 旨在稳定工具调用解析，包括针对 `qwen3.5` 刷新部分标签 ([#18872](https://github.com/ollama/ollama/pull/18872)) 以及维护 Cogito 工具调用部分标签的状态 ([#18759](https://github.com/ollama/ollama/pull/18759))。
*   **OpenAI 兼容性**：PR [#18914](https://github.com/ollama/ollama/pull/18914) 改进了 `/v1/completions` 的流式传输，以匹配 OpenAI 的网络传输格式，重点修复了时间戳偏移问题。

### 5. 稳定性与回归问题
*   **关键（MLX 运行器）**：0.40.x 版本出现的回归问题，导致 `mlx` 运行器在运行 `qwen3.6:35b` 时崩溃 ([#18856](https://github.com/ollama/ollama/issues/18856))，并在 `gemma4` 上出现通用故障 ([#18885](https://github.com/ollama/ollama/issues/18885))。
*   **高优先级（模型加载）**：用户报告在运行 `rnj-1` 时，由于 `GGML_ASSERT(hparams.is_swa_any())` 导致 `llama-server` 终止 ([#18924](https://github.com/ollama/ollama/issues/18924))，以及 `Gemma4Assistant` 上下文初始化错误 ([#18898](https://github.com/ollama/ollama/issues/18898))。
*   **中优先级（工具/API）**：有报告称在流式工具使用循环中出现 Qwen3.8 API 错误 (500) ([#17778](https://github.com/ollama/ollama/issues/17778))，以及 Qwen3.5 4B 返回“仅思考”的空响应 ([#18916](https://github.com/ollama/ollama/issues/18916))。
*   **基础设施**：报告称 FreeBSD 15.1 由于 `disk_unix.go` 中的类型不匹配导致构建失败 ([#18835](https://github.com/ollama/ollama/issues/18835))。

### 6. 对应用程序开发者的意义
*   **工具可靠性**：如果您正在使用 Qwen 或 Cogito 模型构建 Agent 工作流，请密切关注当前的 `model/parsers` 相关 PR。当前的解析器逻辑正在进行积极的强化，以防止原始部分标签“泄漏”到助手的回复内容中。
*   **OpenAI 合规性**：如果您的应用程序依赖于严格的 OpenAI API 规范合规性（例如流式补全），PR [#18914](https://github.com/ollama/ollama/pull/18914) 完成后，预计一致性将得到提升。
*   **迁移警示**：请注意，0.40.x 引入的新版“本地兼容 GGUF 迁移”功能导致部分用户出现重复的模型标签和可见性问题 ([#18830](https://github.com/ollama/ollama/issues/18830), [#18921](https://github.com/ollama/ollama/issues/18921))。如果您通过 CLI 管理大型模型库，请务必在推向生产环境前使用 0.40.2+ 版本对部署脚本进行测试。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

### LiteLLM 工程摘要：2026-10-11

#### 1. 今日重点
开发重心已大幅转向“Decision”模型工作流的标准化，并投入大量精力进行向后移植（backporting），以确保 `1.104.x` 和 `1.105.0-rc` 版本的稳定性。与此同时，团队正通过引入细粒度的安全中间件来全面加固代理层，并修复了无状态代理部署中遥测（telemetry）和认证协调（auth-reconciliation）方面长期存在的问题。

#### 2. 发布与重大变更
*   **版本更新：** 积极将 Decision 模型功能及 Jev 后续优化移植至 `1.104.3` 和 `rc/1.105.0` ([PR #45905](https://github.com/BerriAI/litellm/pull/45905), [PR #45906](https://github.com/BerriAI/litellm/pull/45906))。
*   **重大变更：** 
    *   `xAI` 批处理任务处理方式变更：结果文件现以批处理 ID 命名，且处理过程不再进行冗余的 API 查询 ([PR #45559](https://github.com/BerriAI/litellm/pull/45559))。
    *   提升错误代码一致性：部分 500 级错误现已重映射为更符合供应商规范的 4xx 响应 ([PR #45537](https://github.com/BerriAI/litellm/pull/45537))。

#### 3. 新模型与硬件支持
*   **Microsoft Decision 1：** 通过 Azure/Foundry 增加了对 Microsoft Decision 1 模型支持 ([Issue #45807](https://github.com/BerriAI/litellm/issue/45807))。
*   **MiniMax 与 Tencent：** MiniMax ([PR #45896](https://github.com/BerriAI/litellm/pull/45896)) 和 Tencent ([PR #45899](https://github.com/BerriAI/litellm/pull/45899)) 的原生 `Messages` API 支持已合并至主分支。

#### 4. 性能与优化
*   **安全中间件：** 引入可选的 `fastapi-guard` 安全中间件，在进入认证逻辑之前提供请求层过滤（IP 限流、CIDR 黑名单、UA 过滤） ([PR #45873](https://github.com/BerriAI/litellm/pull/45873))。
*   **Decisions 计费：** 优化了 `/v1/decisions` 和 `/v1/systemone` 的成本追踪，防止在使用共享模型成本映射时与 chat-completions 产生双重计费 ([PR #45904](https://github.com/BerriAI/litellm/pull/45904))。

#### 5. 稳定性与回归
*   **紧急 (预算/认证)：** 
    *   在无数据库情况下，`custom_auth_run_common_checks: true` 会导致预算协调在成功时报错 ([Issue #45895](https://github.com/BerriAI/litellm/issue/45895))。
    *   `cost-based-routing` 策略在同步方法中，即使在仅有一个健康部署的情况下也会导致 `RouterRateLimitError` ([Issue #45718](https://github.com/BerriAI/litellm/issue/45718))。
*   **高优先级 (代理/遥测)：**
    *   如果客户端提前终止连接，流式调用的 `OpenTelemetry` 回调会失败 ([Issue #45736](https://github.com/BerriAI/litellm/issue/45736))。
    *   Router 的 `.acompletion` 未能触发 `CustomLogger` 钩子 ([Issue #8842](https://github.com/BerriAI/litellm/issue/8842))。
*   **中优先级 (逻辑)：**
    *   修复了 MCP 网关凭据泄露到防护栏（guardrail）请求头中的问题 ([PR #45897](https://github.com/BerriAI/litellm/pull/45897))。
    *   修复了流式响应中 Mistral 引用块被截断的问题 ([PR #45818](https://github.com/BerriAI/litellm/pull/45818))。

#### 6. 对应用开发者的影响
*   **遥测可靠性：** 如果您依赖 OTel 进行计费或审计，请注意流式调用中的“提前退出”行为；如果应用程序停止读取流，您的 Span 数据可能会不完整。
*   **安全态势：** 基础设施团队应考虑使用新的 `fastapi-guard` 中间件作为“预认证”层，在昂贵的认证或 LLM 供应商调用发生前，保护代理免受大流量攻击。
*   **依赖管理：** 该项目持续锁定 `openai < 3.0.0` ([Issue #40317](https://github.com/BerriAI/litellm/issue/40317))，这可能会在现代 LLM 技术栈中导致依赖解析冲突。请相应地规划您的环境构建。

---

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

### **Unsloth 基础设施摘要 | 2026-10-11**

#### **1. 今日重点**
Unsloth 生态系统目前专注于稳定 Unsloth Studio 的 UI/UX 以及优化多 GPU 推理行为。一项大规模的文档清理计划正在进行中，通过 PR 移除了代码库中超过 60% 的遗留注释，以提高可维护性；工程团队的工作重心则在于解决近期版本引入的推理延迟退化问题。

#### **2. 发布与重大变更**
*   **过去 24 小时内无新版本发布。**
*   **维护：** 一项大型清理 PR（#12966, #12967, #12968, #12969）正在进行中，旨在从 Studio 后端和 CLI 工具中删除超过 10 万行注释/文档字符串，以精简代码库审计流程。

#### **3. 新模型与硬件支持**
*   **Qwen3-TTS 支持：** 已收到请求（#3951），正积极跟进集成以支持微调。
*   **Intel GPU 文档：** 正在进行标准化 Intel GPU 在 Unsloth Studio 中安装配置的工作（#12836）。

#### **4. 性能与优化**
*   **推理延迟：** 针对自 `b10715-mix-86bd2d3` 版本以来在 `--split-mode tensor` 配置中观察到的显著性能下降（慢约 2.9 倍）进行调查。潜在原因是 `max_cuda_graphs = 64` 的配置变更（#12468）。
*   **Studio 响应速度：** PR #13255 解决了长上下文聊天界面中的严重卡顿问题，专门针对渲染大代码块、LaTeX 和展开的思维链（thinking）部分时的 UI 性能进行了优化。
*   **Attention Masks：** PR #13256 为 Llama 和 Qwen3 缓存注意力路径增加了对填充掩码（padding masks）的支持，以确保左填充（left-padded）提示词生成时的输出一致性。

#### **5. 稳定性与回归**
*   **[严重] 高 CPU 空闲占用：** 用户反馈在 v0.1.903-beta 版本中，`python.exe` 在空闲状态下所有核心占用率均高达 95%（#12942）。
*   **[高] DoRA/LoRA 内核不匹配：** 发现一个 Bug，导致融合的 LoRA 内核错误处理活动的 DoRA 适配器，从而引发静默的训练/输出损坏。修复方案：PR #13254。
*   **[中] 上下文管理：** 由于模型重载期间 KV 插槽保存逻辑效率低下，长上下文聊天会话正在经历完整的预填充（prefill）重新运行（#9037）。
*   **[中] Padding Masking：** 等待修复（#13154），以防止 `LlamaModel_fast_forward` 在无标签训练前向传播过程中丢弃 2D 注意力掩码。

#### **6. 对应用开发者的影响**
*   **针对 Agent 构建者：** 如果您正在构建工具调用（tool-calling）Agent，请注意后端工具调用去重机制可能干扰合法的多次调用序列这一已知问题（#10379）。此外，PR #13251 即将开放外部模型的工具设置，从而更好地控制编排循环。
*   **针对多 GPU/部署工程师：** 如果您依赖 `tensor-split` 性能，在 `max_cuda_graphs` 回归问题（#12468）解决前，请避免升级到最新的内部版本。请持续关注 PR #10770，该 PR 旨在使手动多 GPU 层放置更加明确，并防止静默回退到非最优的分片模式。
*   **针对 Studio/桌面端集成方：** 如果您正在部署或封装 Unsloth Studio，UI 中新增的“推荐（Recommended）”中心过滤器（#13240）将改变模型列表的展示方式——默认显示经精选的由供应商支持的模型。

</details>

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*