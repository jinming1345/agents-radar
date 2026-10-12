# AI 基础设施日报 2026-10-12

> 生成时间: 2026-10-12 01:44 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

### 1. 生态系统概览
2026-10-12 的 AI 基础设施生态反映出从“第一代”大模型服务向复杂、多模型及以智能体（Agent）为核心的架构转型。工程重心已积极转向在 Blackwell 级硬件上稳定运行高推理能力模型（DeepSeek/Gemma 4）和多模态扩散模型。我们正看到向混合推理服务的结构性转变：推理引擎不仅需处理高并发的标准化自回归任务，还必须处理专门的工具调用或推理“思考” token（think tokens），这要求进行深度内核层级的集成。

### 2. 活动对比
*注：预估数据基于所提供摘要中报告的活跃 PR/Issue 遥测数据。*

| 项目 | 近期 PR 活动 | 稳定性问题 | 发布状态 |
| :--- | :--- | :--- | :--- | :--- |
| **vLLM** | 极高 | 高 (死锁/OOM) | v0.31.x (活跃) |
| **SGLang** | 高 | 中 (SparsePrefill) | 稳定 (无新版本) |
| **llama.cpp** | 高 | 高 (Vulkan/RPC) | b1155x (小版本更新) |
| **Ollamac** | 中等 | 高 (Agentic/Tools) | 稳定 |
| **LiteLLM** | 中等 | 高 (支出追踪) | v1.106.x (RC/稳定) |
| **Unsloth** | 中等 | 中 (检查点保存) | 稳定 |

### 3. 模型支持竞速
当前的竞速由从纯 LLM 向 **推理模型 (d1/R1)** 和 **Diffusion-LM** 架构的转型所定义。
*   **领跑者：** **llama.cpp** 和 **Unsloth** 在架构广度上领先，llama.cpp 增加了对 Ouro/ByteDance 循环模型的实验性支持，而 Unsloth 则率先推出了用于文本扩散模型（LLaDA/SDAR）的统一 `DiffusionTrainer`。
*   **专精选手：** **SGLang** 和 **vLLM** 在 Blackwell 硬件上针对 **DeepSeek-V4.1-Flash** 的性能战中处于胶着状态，SGLang 目前在针对此类 MoE 部署的 PCIe 拓扑优化上表现出微弱优势。

### 4. 性能前沿
*   **KV Cache：** 向“实际池化字节”分配而非悲观填充的转变至关重要，vLLM 的重构即是明证。SGLang 正通过支持打包 KV 传输（DCP1-to-DCP-N）推动分布式服务。
*   **内核融合：** 优化方向正从标准 Attention 内核转向融合 MoE 内核（DeepSeek）和 Gated Delta Net (GDN) 快照。
*   **分布式/并行：** vLLM 和 llama.cpp 正致力于解决多节点/RPC 分片（特别是针对 DeepSeek-R1-671B）中的不稳定性问题。
*   **内存效率：** Unsloth 和 SGLang 正在引入支持多租户、感知抢占的 KV Cache，以在不发生 OOM 的前提下处理高并发请求。

### 5. 层级定位
*   **推理引擎 (vLLM, SGLang)：** 专注于吞吐量、内核调度和硬件特定（Blackwell）的性能优化。它们充当了“计算基板”的角色。
*   **本地运行时 (llama.cpp, Ollama)：** 定位为通用性和边缘性能；它们优先考虑硬件抽象（OpenCL/SYCL/Metal）以及开发者集成的易用性。
*   **网关 (LiteLLM)：** 专注于业务逻辑抽象——包括支出追踪、可观测性以及跨多供应商后端的工具调用路由。
*   **训练/微调 (Unsloth)：** 专注于“工作室”体验——在降低量化和 LoRA 微调门槛的同时，打通从训练到推理的工作流。

### 6. 趋势信号
*   **推理“思考税”：** 推理模型带来了新的基础设施痛点——特别是“预算管理”（决定何时终止响应）和“解析器脆弱性”。应用开发者应预料到，随着这些模型达到内部 token 预算上限，会出现非确定性的延迟峰值。
*   **工具调用韧性：** 在所有项目（vLLM, Ollama, Unsloth）中，对标准化工具调用解析的关注度极高。行业正远离定制化提示词（bespoke prompts），转向原生的工具调用后端。
*   **硬件分化：** “Blackwell 税”是真实存在的。优化已不再具备普适性；现在选择推理引擎需要对特定硬件进行深度评估（例如：仅 PCIe 与 NVLink 集群，或 SM120 架构的区别）。
*   **Rust 的转向：** 基础设施组件正迅速从 Python 转向 Rust（例如：LiteLLM，vLLM 的前端），以回收在基于 Python 钩子的“连续机”（continuation machine）中损失的延迟开销。

---

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 技术摘要：2026-10-12

### 1. 今日重点
vLLM 生态系统目前正致力于清理技术债务，并解决高级推理功能中复杂的交互 Bug，其中最显著的进展是移除了旧版的 “cascade attention” 机制。与此同时，社区正积极解决影响高端 Blackwell (SM120) 和 H200 部署的内存分配回归问题以及同步死锁问题。

### 2. 发布与重大变更
*   **功能移除：** [PR #61126](https://github.com/vllm-project/vllm/pull/61126) 彻底移除了 “Cascade Attention”，包括所有相关的内核、配置标志和调度器代码。依赖此可选功能的用户应立即计划进行迁移。

### 3. 新模型与硬件支持
*   **ZEDA-GLM-4.7-Flash-Dynamic：** [PR #57274](https://github.com/vllm-project/vllm/pull/57274) 增加了对该模型的支持，该模型在路由逻辑中引入了 “Zero-Compute Experts” (ZCE)。
*   **Intel XPU：** [PR #60980](https://github.com/vllm-project/vllm/pull/60980) 将 UMD (User Mode Driver) 升级至 26.35 版本，以确保与最新的 Intel GPU 堆栈兼容。

### 4. 性能与优化
*   **ROCm DeepSeek 优化：** [PR #61004](https://github.com/vllm-project/vllm/pull/61004) 引入了一个可选标志 (`VLLM_ROCM_AITER_MEGA_MOE_FUSE_SHARED_EXPERTS`)，用于将共享专家（shared experts）融合到 AITER MegaMoEV2 中，从而减少多 GPU 设置下的开销。
*   **KV Cache 大小调整：** [PR #60996](https://github.com/vllm-project/vllm/pull/60996) 优化了 DeepSeek-V4.1 的 KV Cache 内存效率，根据实际池化字节数而非悲观的层填充来调整打包组大小，减少了不必要的内存分配。
*   **代码库清理：** [PR #60721](https://github.com/vllm-project/vllm/pull/60721) 精简了 `csrc` 结构，合并了冗余头文件并删除了未引用的代码，旨在简化未来的内核开发。

### 5. 稳定性与回归
*   **严重 - CUDA Graph 死锁：** [Issue #60845](https://github.com/vllm-project/vllm/issues/60845) 报告在张量并行下使用全分片 LoRA 适配器服务 MoE 模型时出现间歇性死锁。
*   **高危 - OOM 回归 (Gemma 4)：** [Issue #61045](https://github.com/vllm-project/vllm/issues/61045) 指出 Gemma 4 存在 OOM 回归，编码器 CUDA Graph 捕获分配了过多的内存（4096-token 上下文中高达 38.5 GiB）。
*   **高危 - KV Cache 损坏：** [Issue #60174](https://github.com/vllm-project/vllm/issues/60174) 证实了在 Blackwell (SM120) GPU 上使用前缀缓存（prefix caching）时，Qwen3.8-27B 的输出会出现损坏。
*   **中危 - 流水线并行启动：** [PR #60569](https://github.com/vllm-project/vllm/pull/60569) 修复了 DeepSeek-V4 部署中因部分 PP 阶段不存在 KV Cache 层而导致的 `StopIteration` 崩溃问题。
*   **中危 - Rust 前端解析：** [PR #61128](https://github.com/vllm-project/vllm/pull/61128) 修复了 Omni/ASR 模型启动失败的问题，此前 Rust 前端无法定位 `thinker_config`。

### 6. 对应用开发者的影响
*   **工具调用（Tool Calling）：** 如果你在 Hermes 类模型中使用 `tool_choice="required"`，请查看 [PR #60770](https://github.com/vllm-project/vllm/pull/60770)；该 PR 确保了换行符分隔的并行工具调用能够被正确解析。
*   **流式处理逻辑：** 在流式响应中遇到 `logprobs` 缺失的开发者请注意，[PR #60962](https://github.com/vllm-project/vllm/pull/60962) 修复了流式解析器 derender 路径中的差异。
*   **部署提醒：** 如果在 Blackwell 硬件上运行，请注意目前前缀缓存和 CUDA Graph 捕获方面存在的问题。建议在将 v0.31.x 推送到生产环境之前，对具体的模型系列进行全面测试。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 摘要：2026-10-12

### 1. 今日重点
SGLang 社区目前正全力投入于提升 **DeepSeek-V4.1-Flash** 在 **Blackwell (SM120) 硬件**上的性能稳定性，特别是仅使用 PCIe 的配置环境。目前正在进行重要的架构优化，以解决稀疏预填充（sparse-prefill）工作空间中的内存溢出（OOM）问题，并改进 MoE 模型的内核调度；同时，扩散模型（diffusion）服务栈也获得了一系列关键修复，涉及检查点兼容性和潜在空间（latent）打包等方面。

### 2. 发布与重大变更
*   **无。** 过去 24 小时内没有正式发布版本。

### 3. 新模型与硬件支持
*   **DeepSeek-V4.1-Flash：** 现已成为首要优化目标。现场报告（#40877）确认在 **8× RTX PRO 6000 (Blackwell)** 且仅使用 PCIe 的拓扑结构上已实现成功生产部署，但需注意后端选择（针对特定的混合扩展操作，目前 Triton 比 FA4 更受推荐 #42012）。
*   **NPU/昇腾（Ascend）优化：** 改进了 `torch.compile` 下 Qwen3-ASR 融合内核的编译安全性（#38843），确保在训练和部署工作流中 NPU 执行路径的完整性。

### 4. 性能与优化
*   **Blackwell (SM120) MoE/索引器：** B12X FlashInfer NVFP4 MoE 集成工作持续推进（#33709）。
*   **DeepSeek-V4/DSpark：** 将 HIP FP4 索引器的静态 2 GiB Logits 内存块改为**自适应工作空间**，在防止过度预留内存的同时保持了 OOM 防护（#38086）。
*   **PD/MORI 传输：** 启用了打包的 DCP1-to-DCP-N KV 传输（#38317），显著降低了解耦预填充-解码（disaggregated prefill-decode）转换过程中的 RDMA 描述符开销。
*   **内核融合：** 将 `q_rope_store` 合并至 `fused_q_norm_rope` 中，并持续优化 mHC (DeepSeek-V4.1)（#42170）。

### 5. 稳定性与回归问题
*   **高严重性（OOM/崩溃）：**
    *   **SparsePrefill OOM：** DeepSeek-V4.1 + DSPARK 在高并发预填充期间遇到无界工作空间分配导致的崩溃（#41076）。
    *   **统一缓存失效：** 驱逐带有 MAMBA (hybrid-KDA) 组件的模型会导致节点被剪枝而非主机分层，从而导致后续请求产生缓存缺失（#33713）。
    *   **调度器崩溃：** 非 RGB 图像（RGBA/灰度图）会导致 Gemma-4 视觉塔崩溃，触发调度器重启并丢弃所有进行中的请求（#26751）。
*   **正确性/Bug：**
    *   **扩散模型 Latents：** 修复了 `FluxAdapter` 在非补丁整除（non-patch-divisible）潜在尺寸下的崩溃，以及 `ref_latents`/ControlNet 参数丢失的问题（#43489, #43488）。
    *   **投机采样（Speculative Decoding）：** 修复了由于 CDF 边界采样误差导致零概率草稿 Token 被接受的 Bug（#35788）。
    *   **采样：** 解决了聊天补全中用户配置的 `top_k` 值被忽略且错误地默认为 `-1` 的问题（#39201）。

### 6. 对应用开发者的影响
*   **Blackwell 部署：** 如果您在 RTX PRO 6000 或 B200 上进行部署，请密切监控 Attention 后端的配置。如果 `fa4` 在 CUDA 图捕获过程中崩溃，请切换至 `triton`（#42012）。
*   **视觉流水线：** 请注意，当前视觉塔部署不支持非 RGB 图像（RGBA/灰度图）；传入此类图像会导致引擎完全崩溃（#26751）。
*   **解耦服务：** 如果运行大规模解耦设置，新的打包 KV 传输支持（#38317）为 DCP1-to-DCP-N 转换提供了更高的效率——请确保您的基础设施支持所需的 RDMA/网络路径。
*   **可观测性：** 您现在可以通过 `--otlp-service-name` 设置自定义的 `service.name`，以防止多个部署集群合并为一个遥测身份（#35730）。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 技术摘要：2026-10-12

### 1. 今日要点
该项目在多模态和循环状态架构（Recurrent State Architectures）方面持续快速扩展，同时对 OpenCL 和 SYCL 后端进行了重大改进。主要工作集中在稳定对基于 Qwen 的多模态变体的支持，并提升 `llama-server` 组件的资源效率。

### 2. 发布与重大变更
*   **构建版本 b11553–b11559：** 这一系列点版本更新主要集中于后端强化和架构支持。未发现重大的 API 破坏性变更，但建议用户关注新增的 `GGML_RPC_DEBUG` 详细级别，以便调试分布式部署。

### 3. 新模型与硬件支持
*   **Prism Bonsai 2 (27B)：** 增加了对该架构的运行时支持，包括对 Hadamard 张量的特定处理 ([PR #29600](https://github.com/ggml-org/llama.cpp/pull/29600))。
*   **SenseNova U1：** 增加了对文本生成文本（text-to-text）和图像生成文本（image-to-text）的初步支持 ([PR #28919](https://github.com/ggml-org/llama.cpp/pull/28919))。
*   **H2O-Lightning-4B：** 针对该决策导向模型的集成工作正在进行中，目标是实现与 `llama-server` 的直接兼容 ([PR #30361](https://github.com/ggml-org/llama.cpp/pull/30361))。
*   **Ouro：** 对字节跳动（ByteDance）的循环语言模型架构的实验性支持 ([PR #29823](https://github.com/ggml-org/llama.cpp/pull/29823))。

### 4. 性能与优化
*   **OpenCL GDN 优化：** 大量工作已合并或正在进行中，旨在通过在循环缓存（recurrent cache）中直接执行状态快照（state snapshots）来优化门控增量网络（Gated Delta Net, GDN）推理，从而减少不必要的内存拷贝 ([PR #30359](https://github.com/ggml-org/llama.cpp/pull/30359), [#30360](https://github.com/ggml-org/llama.cpp/pull/30360))。
*   **SYCL 后端：** 添加了 `set_tensor_2d` 以防止在张量拆分加载期间出现逐行开销，显著加速了权重初始化 ([PR #30358](https://github.com/ggml-org/llama.cpp/pull/30358))。
*   **CPU：** 修复了一个回归问题，该问题导致支持 AVX2 的 CPU 无法使用 F16C 指令 ([Commit b11555](https://github.com/ggml-org/llama.cpp/commit/b11555))。

### 5. 稳定性与回归问题
*   **Vulkan 回归（高优先级）：** 使用 RDNA1 (gfx1010) 的用户报告称，与之前的 v0.6.0 版本相比，提示词处理性能下降了约 45% ([Issue #30039](https://github.com/ggml-org/llama.cpp/issues/30039))。
*   **内存/崩溃（中优先级）：** 在 Windows/HIP 后端上运行 `llama-server` 时，有关于长对话中出现“bad allocation”的报告 ([Issue #30091](https://github.com/ggml-org/llama.cpp/issues/30091))。
*   **RPC（中优先级）：** 在多节点 NVIDIA DGX Spark 设置中，通过 RPC 进行大型 MoE 模型 (DeepSeek-R1-671B) 分片时，预热阶段会出现崩溃 ([Issue #30052](https://github.com/ggml-org/llama.cpp/issues/30052))。

### 6. 对应用开发者的意义
*   **服务可观测性：** 引入了新的 `ggml_backend_sched_realloc_callback`，允许开发者实时检测并记录计算图的重分配情况，这对于监控高负载下的推理稳定性至关重要 ([PR #30329](https://github.com/ggml-org/llama.cpp/pull/30329))。
*   **Logit Gating（Logit 门控）：** 新的 `logit_gate` 功能支持在无需进行完整自回归解码的情况下，进行单遍预填充（prefill）概率分布分析——非常适合高性能分类或路由 Agent ([PR #30265](https://github.com/ggml-org/llama.cpp/pull/30265))。
*   **嵌入优化：** 针对仅嵌入（embedding-only）模型的上下文内存管理修复，将显著降低使用 `llama-server` 提供语义搜索或 RAG 后端服务的用户的 VRAM 占用 ([PR #30339](https://github.com/ggml-org/llama.cpp/pull/30339))。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 基础设施摘要：2026-10-12

## 1. 今日重点
目前的开发工作重点在于强化工具调用（tool-calling）逻辑，并稳定高推理模型（Gemma 4、Qwen 3.x）的推理性能。核心工作包括：提升 Runner 的持久性、解决长上下文智能体（agentic）会话中的解析失败问题，以及修复 Windows/NTFS 文件系统的持续性故障。

## 2. 发布与重大变更
*   **过去 24 小时内无新版本发布。**
*   **重大变更说明：** PR [#18917](https://github.com/ollama/ollama/pull/18917) 将 `llama.cpp` 更新至 **b11521**。该更新将决策模型处理逻辑迁移至 `llama.cpp` 原生路径，弃用了此前 Ollama 专用的“Clef”补丁及自定义评分逻辑。

## 3. 新模型与硬件支持
*   **决策模型：** 通过 [#18917](https://github.com/ollama/ollama/pull/18917) 的 `llama.cpp` 更新，新增了对 `d1-3B` 和 `d1-omni-600M` 的原生支持。
*   **EmbeddingGemma 2：** 新增对 EmbeddingGemma 2 架构的原生支持 [#18917](https://github.com/ollama/ollama/pull/18917)。
*   **硬件瓶颈：** 在 M2 Max 硬件上运行大头（large-head）模型（Qwen 3.8/Gemma 4）时报告出现 panic，原因是 MLX SDPA 后端中存在线程组（threadgroup）分配限制 [#18940](https://github.com/ollama/ollama/pull/18940)。

## 4. 性能与优化
*   **VRAM 记账修复：** 识别出多 GPU 环境下 VRAM 记账存在重大偏差，表现为发现的设备名称与 Runner 日志名称冲突 [#18349](https://github.com/ollama/ollama/issues/18349)。
*   **推理复用：** PR [#18947](https://github.com/ollama/ollama/pull/18947) 引入了已验证的 Manifest 冷查找机制。如果摘要匹配，系统可在不同 API 端点（generate、chat、embed）间复用已加载的 Runner。
*   **混合架构并行：** PR [#18939](https://github.com/ollama/ollama/pull/18939) 提议引入 `OLLAMA_PARALLEL_HYBRID`，旨在为 `qwen35moe` 及其他此前被锁定在单一槽位（slot）的混合模型启用多槽位执行。

## 5. 稳定性与回归问题
*   **[紧急] 智能体工具解析：** 针对多起工具调用失败（幻觉、缺失闭合标签以及 Go API 中的数值精度丢失）的报告，目前正通过一系列解析器强化 PR（例如 [#18941](https://github.com/ollama/ollama/pull/18941), [#18942](https://github.com/ollama/ollama/issues/18942)）进行修复。
*   **[高] Windows/NTFS 路径：** 当 `OLLAMA_MODELS` 指向挂载点或连接点（junction）时，模型目前不可见。修复方案在 PR [#18949](https://github.com/ollama/ollama/pull/18949) 中待处理。
*   **[中] 推理预算：** 当前 `think` 预算的实现存在导致响应在单词中间被截断的风险；目前的工作旨在强制其在自然边界处终止 [#18212](https://github.com/ollama/ollama/pull/18212)。

## 6. 对应用开发者的影响
*   **精度警告：** 如果您的智能体依赖工具调用中的精确数值参数，请注意目前的 Go 客户端可能会遇到精度丢失/舍入问题。请关注 [#18942](https://github.com/ollama/ollama/issues/18942) 以获取即将发布的补丁。
*   **智能体可靠性：** 如果您正在构建“长时间运行”的智能体（如编码助手），请注意当模型达到上下文或预算限制时，当前的解析器可能不够健壮。用户 `mann1x` 提交的一系列 PR（如 [#17566](https://github.com/ollama/ollama/pull/17566), [#17565](https://github.com/ollama/ollama/pull/17565)）旨在专门提升这些智能体对模型侧流终止错误的恢复能力。
*   **Ollama Cloud/API：** 请谨慎使用 Qwen 模型的 `reasoning_effort: "xhigh"`，目前的 API 标准化逻辑会导致 500 错误 [#18943](https://github.com/ollama/ollama/issues/18943)。

---

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 摘要：2026-10-12

### 1. 今日重点
工程团队目前专注于一项重大的架构转型，将核心原生推理逻辑迁移至基于 Rust 的桥接层，以改进钩子（hook）执行和请求短路机制。与此同时，团队正在着手修正近期版本中出现的遥测和支出追踪漏洞，重点解决 `no-log` 请求意外中断内部记账的问题。

### 2. 发布与重大变更
*   **发布：** v1.106.0-rc.1, v1.105.0, v1.104.3。
*   **安全性：** 所有版本均使用长期基础设施密钥通过 `cosign` 签名 ([commit `0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0))。
*   **迁移说明：** `rust_bridge` 正在经历重大重构；原生 Rust 异常不再触发通用的 `RustBridgeDeclined` 错误，而是抛出 `NotImplementedError` 以提升调试能力 ([PR #45986](https://github.com/BerriAI/litellm/pull/45986))。

### 3. 新模型与硬件支持
*   **新增提供商：** 增加了对 `ai&` (aiand) 提供商的支持，涵盖 Chat Completions 和 Responses API ([PR #38958](https://github.com/BerriAI/litellm/pull/38958))。
*   **HuggingFace/TEI：** 修复了 TEI 重排序（rerank）部署的定价逻辑，此前该逻辑默认为 $0 计费 ([PR #45990](https://github.com/BerriAI/litellm/pull/45990))。

### 4. 性能与优化
*   **Rust/Python 桥接：** 进行了大规模重构，将宿主调用（host calls）和 Python 钩子迁移至调用方任务的异步执行中，消除了此前“延续机器”（continuation machine）带来的开销 ([PR #45962](https://github.com/BerriAI/litellm/pull/45962))。
*   **原生短路机制：** 原生 `Messages` 调用现在可以在请求阶段直接响应，无需触达提供商，从而显著降低了缓存任务或内部工具调用任务的延迟 ([PR #45982](https://github.com/BerriAI/litellm/pull/45982))。

### 5. 稳定性与回归测试
*   **支出追踪 (高优先级)：** `no-log: true` 请求未能将支出记录在 `LiteLLM_SpendLogs` 表中，且未能释放预算预留，导致配额卡死。修复方案正在 [PR #44514](https://github.com/BerriAI/litellm/pull/44514) 和 [PR #45907](https://github.com/BerriAI/litellm/pull/45907) 中等待合并。
*   **MCP Gateway (中优先级)：** 在标准 SDK 安装且未配置 MCP 工具时，网关会崩溃，该问题由 [PR #42568](https://github.com/BerriAI/litellm/pull/42568) 引起。已提交修复 [PR #45961](https://github.com/BerriAI/litellm/pull/45961)。
*   **LLM 翻译：** 有多项报告指出 `A2AConfig` ([Issue #45944](https://github.com/BerriAI/litellm/issues/45944)) 和 Gemini 提供商默认设置 ([Issue #45333](https://github.com/BerriAI/litellm/issues/45333)) 会静默丢弃配置参数（如 temperature, max_tokens）。

### 6. 对应用开发者的影响
*   **路由逻辑：** 如果您正在使用 `session-affinity`，预计不久将获得更好的负载分配效果；PR [#45889](https://github.com/BerriAI/litellm/pull/45889) 引入了新逻辑，允许绑定的会话在主目标饱和时切换至空闲的部署。
*   **智能体框架：** 如果您依赖 `CustomLogger` 或 `async_pre_request_hook`，请注意转向原生 Rust 调用会导致这些钩子被跳过。开发者应关注 [PR #45968](https://github.com/BerriAI/litellm/pull/45968) 和 [PR #45977](https://github.com/BerriAI/litellm/pull/45977) 的集成情况，这些 PR 明确恢复了原生推理路径下的钩子支持。
*   **可观测性：** 使用 OpenTelemetry 的开发者应注意流式调用中的一个回归问题：若流提前终止，将缺失追踪跨度（spans） ([Issue #45736](https://github.com/BerriAI/litellm/issues/45736))。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 文摘：2026-10-12

### 1. 今日要点
Unsloth 今日的工作重点集中在扩展 **Text-Diffusion LM 支持**（例如 LLaDA、LLaDA-MoE、DiffusionGemma）以及优化针对复杂本地工作流的 **Studio UI/UX**。核心架构更新包括对 DDP 梯度同步的关键性修复，以及改进多租户 KV 缓存管理以防止会话死锁。

### 2. 发布与重大变更
*   **过去 24 小时内无新版本发布**。
*   **重大/行为变更说明：** Studio 用户需留意即将推出的 tool-call 解析变更 (#13279) 以及 Windows 绝对路径处理的调整 (#13347)，这些变更可能会影响现有的部署脚本。

### 3. 新模型与硬件支持
*   **Diffusion LM 扩展：** Studio 现在通过更新后的 `DiffusionTrainer` 原生支持全系列文本扩散模型（LLaDA、LLaDA-MoE、Dream、Nemotron-Labs-Diffusion、SDAR、DiffusionGemma）的训练与对话 (#13342, #13341)。
*   **Intel Arc/Core Ultra：** OpenVINO 集成进展顺利，现已支持模型转换、推荐以及基于 sidecar 的聊天工作流 (#12168)。
*   **DeepSeek-OCR：** 基础设施正在更新，以解决导致这些模型无法在 Studio 中加载的依赖项问题 (`addict`, `easydict`) (#13310)。

### 4. 性能与优化
*   **DDP 效率：** 引入了可选择开启的标志 `UNSLOTH_DDP_BATCHED_GRAD_COPY=1`，利用 `torch 2.13` 的原生批量梯度复制功能，从而提升分布式训练性能 (#13350)。
*   **Mac 性能：** Studio 现在可以正确识别 Apple Silicon 缺乏 SMT（同步多线程）的特性，强制 `sd.cpp` 使用物理性能核心，而不是默认使用半容量线程 (#13349)。
*   **KV 缓存管理：** PR #13031 引入了一种统一的 KV 缓存机制，允许并行聊天会话共享一个具备抢占感知能力的内存池，从而避免资源竞争。

### 5. 稳定性与回归问题
*   **Q-GaLore 检查点（高优先级）：** 存在一个关键 Bug，即 `step()` 在保存前会将量化权重替换为占位符，导致无法进行有效的全量微调。修复工作正在进行中 (#13276)。
*   **适配器加载（中优先级）：** LoRA-GA 适配器由于在保存时未参考原始基础模型进行相对路径处理，导致无法正确重新加载。修复工作正在进行中 (#13322)。
*   **Studio 死锁（高优先级）：** Studio 中长期存在的 sqlite3 资源耗尽问题在近期补丁中已基本得到解决，但用户仍需持续关注线程阻塞情况 (#9008)。

### 6. 对应用开发者意味着什么
*   **构建 Agent：** 如果你正在构建使用工具的 Agent，请注意未来的 Studio 更新将修改 Gemma 4 在处理 tool-call 时的标量类型方式——请确保你的类型强制转换逻辑对字符串/数字的模糊性具有鲁棒性 (#13279)。
*   **多用户 Studio 部署：** 向统一 KV 缓存 (#13031) 的转变表明，你未来基于 Studio 的推理 API 将支持更高的并发用户数，而不会线性增加 VRAM 的消耗。
*   **Diffusion-LM 应用：** 针对“文本生成图像/扩散模型”工作流的开发者现在可以利用统一的 `DiffusionTrainer` 路径，简化将 LLaDA 和 SDAR 等不同架构集成到单个流水线中的过程 (#13342)。

***

*数据来源：[github.com/unslothai/unsloth](https://github.com/unslothai/unsloth)*

</details>

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*