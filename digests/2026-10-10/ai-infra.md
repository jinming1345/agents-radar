# AI 基础设施日报 2026-10-10

> 生成时间: 2026-10-10 01:54 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

### 基础设施生态系统分析：2026-10-10

#### 1. 生态系统概况
AI 基础设施领域目前正处于“整合与强化”阶段，重心正从实验性的功能迭代转向严谨的生产级稳定性。各个项目正在优先支持复杂的推理密集型模型（DeepSeek-V4.1、现代 MoE 架构），同时应对 Blackwell (SM120) 等下一代硬件带来的稳定性挑战。高吞吐量的服务端引擎与模块化、以开发者为中心的运行时之间界限日益清晰，业界正共同推动工具调用（tool calling）和结构化推理 API 的标准化。

#### 2. 活跃度对比
*注：代表性数值基于 24 小时内记录的活跃 PR/Issue 总量。*

| 项目 | 活跃 PRs/Issues | 发布状态 | 主要重心 |
| :--- | :--- | :--- | :--- |
| **vLLM** | 高 | 稳定 | Blackwell/SM120, Decisions API |
| **SGLang** | 中高 | 稳定 | DSpark/TP8, 确定性推理 |
| **llama.cpp** | 高 | 维护中 | 多模态/MoE, Intel SYCL, 效率 |
| **Ollama** | 中 | 维护中 | 高并发吞吐量, GC 压力 |
| **LiteLLM** | 高 | 开发/活跃 | 单体化迁移, 网关稳定性 |
| **Unsloth** | 中 | 稳定 | 微调精炼, Studio 强化 |

#### 3. 模型支持竞赛
目前的竞争焦点在于**原生推理和多模态效率**：
*   **DeepSeek-V4.1-Flash：** vLLM 和 SGLang 在此领域领先，其中 vLLM 专注于解耦 P/D 内核，而 SGLang 则致力于加固 DSpark/TP8 的服务路径。
*   **现代架构：** `llama.cpp` 在小众/本地架构的灵活性上占据领先地位，已支持 **ModernBERT** 和 **Inkling**。
*   **多模态/嵌入（Embeddings）：** Ollama 正在积极整合面向 Apple Silicon (MLX) 的多模态嵌入流水线；LiteLLM 则在扩展针对专业提取/压缩模型的提供商级路由。

#### 4. 性能前沿
优化工作已分化为两条截然不同的路径：
*   **内核/计算层：** vLLM 和 `llama.cpp` 正在推动内存访问模式的底层改进（Triton TD API、logits 缓冲区缩减）以及特定于内核的 MoE 驻留逻辑，以优化企业级硬件的 VRAM 利用率。
*   **调度/服务层：** SGLang 和 vLLM 在“重叠（overlap）”前沿占据主导地位——通过实现 Dual-Batch-Overlap (DBO) 和 diffusion-LLM (dLLM) 调度，以隐藏分布式架构中的通信延迟。LiteLLM 则通过转向“单体（monolith）”部署模型来解决架构瓶颈，从而降低网关开销。

#### 5. 层级定位
*   **服务引擎 (vLLM, SGLang)：** 高并发、多 GPU 生产环境服务的“黄金标准”。专注于内核级性能以及 LLM/MoE 模型的高级调度。
*   **本地运行时 (llama.cpp, Ollama)：** 异构部署的“瑞士军刀”。专注于可移植性（SYCL, Vulkan, MLX）并最大限度地减少消费级硬件的内存/资源开销。
*   **网关 (LiteLLM)：** “控制平面”。对于跨不同推理提供商实现抽象、故障转移和统一可观测性至关重要。
*   **训练/微调 (Unsloth)：** “桥梁”。连接底层硬件与模型应用，通过优化内核专注于易用性和快速迭代。

#### 6. 趋势信号
*   **API 标准化：** vLLM 新推出的 **"Decisions API"** 表明行业正从脆弱的基于提示词的解析，转向形式化的智能体推理（基于谓词/选择/得分的响应）。
*   **“单体化”转型：** LiteLLM 转向单一共享镜像和 Helm Chart，证实了现代 DevOps 环境正通过牺牲分布式网关设置的复杂性，来换取部署的简洁性。
*   **硬件碎片化：** 开发者正面临 "SM120/Blackwell" 的不稳定以及 "Strix Halo" 混合 GPU 调度的困扰。如果你正在构建基础设施，**硬件特定的自动调优**已不再是加分项，而是保障生产环境正常运行的核心要求。
*   **给应用开发者的建议：** 如果你正在构建智能体，请密切关注向 **Decisions API** (vLLM) 的迁移；这将成为工具使用完整性的行业标准。确保你的嵌入密集型工作流与 `llama.cpp` 即将推出的内存缩减更新保持同步，以优化集群密度。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 技术摘要：2026-10-10

### 1. 今日重点
开发工作目前高度集中于稳固对 **Blackwell (SM120)** 硬件的支持，并解决 **DeepSeek-V4.1-Flash** 在存算分离（Disaggregated P/D）环境中的集成问题。此外，生态系统正在扩展其 API 接口，在用于结构化推理和智能体（Agentic）工作流的全新 **OpenAI 兼容 Decisions API** 方面取得了显著进展。

### 2. 发布与重大变更
*   过去 24 小时内**无新版本发布**。
*   **注意：** 使用每日构建版（nightly builds）的用户请密切关注 [PR #60762](https://github.com/vllm-project/vllm/pull/60762)，该 PR 修复了 SM120 稀疏后端中关键的块大小（block-size）协商失败问题。

### 3. 新模型与硬件支持
*   **Decisions API：** 用于 OpenAI Decisions API 的初始 MVP 正在积极审核中 ([PR #60465](https://github.com/vllm-project/vllm/pull/60465))，引入了对谓词（predicate）、选择（choice）和基于分数（score-based）的响应支持。
*   **Winnow 策略：** “Winnow” 读取策略的支持正在集成到 Decisions API 中 ([PR #60713](https://github.com/vllm-project/vllm/pull/60713))。
*   **ROCm/MI355X：** DeepSeek-V4.1-Flash 单解码内核正通过 `VLLM_ROCM_MONO_DECODE` 进行积极优化 ([PR #60397](https://github.com/vllm-project/vllm/pull/60397))。

### 4. 性能与优化
*   **双批次重叠 (DBO)：** 已在 ROCm 上的 DeepSeek-V4 中启用，允许在数据并行设置中实现预填充计算与通信的重叠 ([PR #57773](https://github.com/vllm-project/vllm/pull/57773))。
*   **Triton 内核：** 正在持续推进将 vLLM Triton 内核迁移至结构化的 `tl.make_tensor_descriptor` (TD) API，以实现内存访问模式的现代化 ([Issue #42545](https://github.com/vllm-project/vllm/issue/42545))。
*   **MoE 效率：** 已提交关于专家级（Expert-granular）MoE 常驻性的 RFC，旨在利用各专家的负载统计信息来驱动智能的 UVA 卸载 ([Issue #57838](https://github.com/vllm-project/vllm/issue/57838))。

### 5. 稳定性与回归
*   **SM120/Blackwell (严重)：** 多份报告指出在 RTX PRO 6000/B300 硬件上存在解码吞吐量下降和挂起问题。具体而言，当缺少 JIT 缓存时，`FlashInfer` 自动选择会崩溃 ([Issue #60262](https://github.com/vllm-project/vllm/issue/60262))，且 32 块大小（32-block sizes）缺少稀疏 MLA 内核 ([Issue #59203](https://github.com/vllm-project/vllm/issue/59203))。
*   **存算分离 P/D (高)：** 在使用 `vllm-router` 时，发现 NIXL 握手回环（默认指向 `localhost`）以及指标抓取存在问题 ([PR #59583](https://github.com/vllm-project/vllm/pull/59583), [PR #59587](https://github.com/vllm-project/vllm/pull/59587))。
*   **投机采样 (中)：** MTP (Multi-Token Prediction) 投机采样导致 JSON 结构化输出响应中的 schema 失效 ([Issue #60830](https://github.com/vllm-project/vllm/issue/60830))。

### 6. 对应用开发者的影响
*   **迁移至 Decisions API：** 如果您的应用依赖于复杂的智能体推理，请密切关注 [Decisions API](https://github.com/vllm-project/vllm/pull/60465) 的进展。它很快将成为处理结构化多选和评分输出的本地标准，从而减少对脆弱的自定义解析逻辑的依赖。
*   **Blackwell 硬件警示：** 如果在 Blackwell (SM120) 节点上部署，请对当前的每日构建版本保持谨慎。目前 `block_size=64` 与 DeepSeek 模型的现有稀疏 MLA 内核之间存在已知的不兼容问题；请确保您的配置符合 [PR #60762](https://github.com/vllm-project/vllm/pull/60762) 中追踪的受支持块大小。
*   **存算分离架构：** 如果使用 `vllm-router` 进行生产/存算分离 (P/D) 服务，您必须显式设置 `VLLM_NIXL_SIDE_CHANNEL_HOST` 以确保节点间通信正常，否则默认的 `localhost` 会导致静默握手失败。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 摘要：2026-10-10

### 1. 今日重点
SGLang 生态系统目前正专注于增强 `DeepSeek-V4-Pro-DSpark` 服务路径的稳定性，已针对 CUDA Graph 捕获和 TP8 同步稳定性完成了多项关键修复。与此同时，项目正在加速推进 `dLLM` (扩散模型 LLM) 的支持，并提升确定性推理模式的可靠性。随着引擎向复杂的混合模型架构扩展，这些工作仍是当前的首要任务。

### 2. 发布与重大变更
*   **过去 24 小时内无新版本发布。**

### 3. 模型与硬件支持
*   **DeepSeek V4.1：** 优化与特性对齐工作正在进行中，包括预填充上下文并行（prefill context parallelism，#43465）以及 MegaMoE/DP 注意力机制兼容性（#43228）的进展。
*   **AMD/ROCm：** 正在积极开发对 `HiCache` 的支持，并针对基数淘汰策略（radix eviction policies）进行 NPU 端到端冒烟测试（#39938）。
*   **NVFP4 支持：** 通过 FlashInfer 增强了对 `compressed-tensors` W4A4 NVFP4 检查点的自动调优支持（#43464）。

### 4. 性能与优化
*   **重叠调度（Overlap Scheduling）：** 针对 FDFO（快速扩散流操作，Fast Diffusion-Flow Operation）模型的 `dLLM` 重叠调度工作持续取得进展（#40756）。
*   **内核效率：** 提议开展相关工作，以消除 `HiSparse` 实时备份（eager backups）中主机-设备同步的瓶颈（#41446）。
*   **内存管理：** 优化了针对解耦预填充（disaggregated prefill）服务器的 KV 大小设置，特别是在使用完整预填充 CUDA graphs 时，防止了不必要的实时激活预留占用（#43435）。

### 5. 稳定性与回归问题
*   **[高] DSpark CUDA Graph 错误：** 已解决在 TP8/SM120 架构上进行 CUDA Graph 捕获时出现的多项非法内存访问问题（#33134, #33356, #31023），重点优化了跨 TP 规划的一致性和元数据约定的稳健性（#32432）。
*   **[中] 确定性推理卡死：** 在 `deterministic-inference` 中出现的一项回归问题，即小于对齐边界（4096 tokens）的预填充块会导致引擎停滞，目前已有待处理的修复方案（#43444）。
*   **[中] 调度器崩溃：** 正在排查引擎错误处理中的若干 Bug，包括初始化期间的 `KeyError: torch.float32`（#43162）以及 Mamba 缓存分配期间的 `AssertionError`（#43204）。
*   **[低] 多模态传输泄漏：** 报告了内存泄漏问题，即当 `--mm-feature-transport cuda_vmm` 模式下的多模态请求被中止时，未能触发资源池回收（#43402）。

### 6. 对应用开发者的影响
*   **可靠性：** 如果您在生产环境中运行 `DeepSeek-V4-Pro` 或其他重度依赖 TP8 的模型高并发负载，请确保关注 `main` 分支中落地的增强修复，这些修复解决了非确定性的 `SIGSEGV` 和非法内存访问错误。
*   **确定性工作流：** 依赖 `--enable-deterministic-inference` 进行验证或测试的开发者请保持谨慎，因为当前版本在分块（chunking）和重复惩罚（repetition penalties）方面存在已知 Bug（#43061, #43055）。
*   **工具调用（Tool Calling）：** 修复了工具 Schema 中处理可空字符串参数的问题（#43389），提升了与基于严格 JSON-schema 的 Agent 框架的兼容性。
*   **路线图关注：** `dLLM` 路线图（#39499）表明 SGLang 正成为服务扩散模型/LLM 组合栈的一流选择；如果您的应用需要联合文本/图像生成，预计很快将获得对这些统一流水线的成熟支持。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 摘要：2026-10-10

### 1. 今日重点
开发工作继续优先考虑多模态（Multi-Modal）和混合专家模型（MoE）的优化，重点针对较新的 Blackwell 和 Intel XMX 架构进行内核效率提升。目前正集中精力减少大规模词汇量嵌入模型在主机端的内存开销，并致力于在异构硬件上实现投机采样（speculative decoding）工作流的稳定性。

### 2. 发布与重大变更
*   **b11530–b11539：** 一系列专注于计算图稳定性和后端同步的维护版本。
    *   **API 重构：** 重构了 `chat` API ([#30210](https://github.com/ggml-org/llama.cpp/pull/30210))。
    *   **供应商补丁：** 应用了上游 JSON 补丁，修复了深度嵌套结构相关的问题 ([#30253](https://github.com/ggml-org/llama.cpp/pull/30253))。

### 3. 新模型与硬件支持
*   **ModernBERT：** 为基于编码器（encoder-based）的架构增加了精确的 GELU 激活映射支持 ([#30108](https://github.com/ggml-org/llama.cpp/pull/30108))。
*   **Intel SYCL：** 为 BMG GPU 增加了优化的 `Q4_K` MMVQ 行配对支持 ([#30226](https://github.com/ggml-org/llama.cpp/pull/30226)) 以及新的 MoE 内核 ([#30187](https://github.com/ggml-org/llama.cpp/pull/30187))。
*   **Inkling 架构：** 增加了对 TML Inkling 模型的初步支持，包括 Flash Attention 分带内核更新 ([#25731](https://github.com/ggml-org/llama.cpp/pull/25731))。

### 4. 性能与优化
*   **Logits 缓冲区缩减：** 新的 PR 完全跳过了嵌入/重排序模型（embedding/reranking models）的 Logits 缓冲区分配；对于 BGE-M3 等高词汇量模型，每个线程可节省约 1 MiB RAM ([#30255](https://github.com/ggml-org/llama.cpp/pull/30255))。
*   **CUDA 效率：** 移除了 `SSM_SCAN` 操作后冗余的内存拷贝 ([#29807](https://github.com/ggml-org/llama.cpp/pull/29807))。
*   **RMS Norm：** Vulkan 后端现在利用子组归约（subgroup reductions）来提升 Intel B70 和 Nvidia 40 系列显卡的性能 ([#29882](https://github.com/ggml-org/llama.cpp/pull/29882))。
*   **CUDA MoE：** 修复了 `mul_mat_id` 中重复计算专家 ID 的问题，此前该问题导致偏移量计算错误 ([#30262](https://github.com/ggml-org/llama.cpp/pull/30262))。

### 5. 稳定性与回归
*   **高优先级（OOM/崩溃）：** 
    *   持续收到关于 `llama-server` 在长上下文对话中崩溃的报告（可能是 OOM 或错误分配）([#30091](https://github.com/ggml-org/llama.cpp/issues/30091))。
    *   在开启 DSpark 投机采样的情况下，DeepSeek V4 Flash 出现 VRAM 泄漏；每个周期内存都会持续增长 ([#27155](https://github.com/ggml-org/llama.cpp/issues/27155))。
*   **中优先级：**
    *   正确性回归：在量化目标（Q4_K_M）上，贪婪投机采样与非投机采样的结果产生偏差 ([#25618](https://github.com/ggml-org/llama.cpp/issues/25618))。
    *   在多 GPU（3 卡及以上）配置下，针对 Qwen 下一代架构发现 CUDA 计算缓冲区大小相关的问题 ([#27953](https://github.com/ggml-org/llama.cpp/issues/27953))。

### 6. 对应用开发者的意义
*   **资源效率：** 如果你正在运行重度依赖嵌入的流水线，请关注即将推出的跳过 Logits 缓冲区的支持；这将显著降低推理节点的内存占用。
*   **混合批处理能力：** 新的 `llama_model_supports_mixed_batch()` 辅助函数现已可用。请使用它以编程方式检测当前加载的模型是否支持交错处理 token 和 embedding——这对于构建统一的智能体（agent）架构至关重要 ([#30233](https://github.com/ggml-org/llama.cpp/pull/30233))。
*   **容器部署：** 一项待处理的修复将确保 llama.cpp 正确遵守 cgroup 的 CPU 配额，从而防止在受限环境中因不必要的线程过度预订（oversubscription）导致的严重性能下降 ([#30263](https://github.com/ggml-org/llama.cpp/pull/30263))。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 摘要：2026-10-10

### 1. 今日重点
v0.40.x 版本发布后，开发工作目前主要集中在性能调优和稳定性提升上。工程重点已转向改进后台任务管理，具体表现为禁用自动模型迁移，以提高高并发吞吐量并减少资源争用。

### 2. 发布与重大变更
*   **迁移回滚：** PR [#18908](https://github.com/ollama/ollama/pull/18908) 暂时移除了后台模型兼容性迁移。此变更旨在解决关于垃圾回收（GC）压力过大和请求开销的问题，尤其是在高频嵌入（embedding）任务场景下。
*   **自动升级：** 用户已提出要求，希望为 v0.40.2 中引入的自动模型升级功能提供关闭选项，以防止磁盘空间耗尽 ([#18909](https://github.com/ollama/ollama/issues/18909))。

### 3. 新模型与硬件支持
*   **多模态嵌入：** PR [#18820](https://github.com/ollama/ollama/pull/18820) 在 MLX 运行器上增加了对 `EmbeddingGemma2Model` 的支持，从而为富媒体输入实现了多模态嵌入工作流。
*   **Kolibri 1：** MLX 后端已初步支持 Kolibri 1 架构 ([#18780](https://github.com/ollama/ollama/pull/18780))。

### 4. 性能与优化
*   **工具调用解析：** PR [#18906](https://github.com/ollama/ollama/pull/18906) 修复了一个关键 Bug：由于 rune-start 字节迭代处理不当，导致工具参数中的非 ASCII 字符（例如在 `olmo3` 中）出现乱码。
*   **依赖安全：** 针对 `seroval` 的安全补丁 (CVE-2026-104846) 目前正在审核中，以加强依赖树的安全性 ([#18907](https://github.com/ollama/ollama/pull/18907))。

### 5. 稳定性与回归问题
*   **MLX 运行器崩溃（高优先级）：** 多份报告 ([#18856](https://github.com/ollama/ollama/issues/18856), [#18885](https://github.com/ollama/ollama/issues/18885)) 指出 v0.40.x 存在回归问题，导致在运行 `qwen3.6` 和 `gemma4` 等特定量化模型时，Apple Silicon (M4/M6) 芯片出现崩溃。
*   **Windows/CUDA 回退（高优先级）：** 在自动更新过程中，`ggml-cuda.dll` 被留作临时文件，导致引擎静默回退到 CPU 模式的问题 ([#18712](https://github.com/ollama/ollama/issues/18712))。
*   **Vulkan 回归（中优先级）：** AMD Radeon 780M 用户反馈，自 v0.32.10 起，在使用 Vulkan 后端的模型上出现 `DeviceLost` 错误 ([#17748](https://github.com/ollama/ollama/issues/17748))。
*   **内存管理（中优先级）：** 高规格硬件 (M4/128GB) 在运行 128B+ 参数模型时，出现严重的内存压力和延迟增加 ([#18770](https://github.com/ollama/ollama/issues/18770))。

### 6. 对应用开发者意味着什么
*   **嵌入吞吐量：** 如果您正在构建高并发搜索或 RAG 系统，请务必关注 PR [#18908](https://github.com/ollama/ollama/pull/18908) 的进展。禁用后台迁移将显著降低高频嵌入爆发期间的 p99 延迟。
*   **OpenAI 兼容性：** 请注意，`/v1/chat/completions` 端点目前存在一个已知的 Bug，即 `max_tokens` 和 Modelfile 的约束会被忽略 ([#18575](https://github.com/ollama/ollama/issues/18575))。此外，该端点未能捕获 DeepSeek 模型的 `reasoning_content` ([#18534](https://github.com/ollama/ollama/issues/18534))，这可能会导致重推理代理（reasoning-heavy agents）运行中断。
*   **工具调用：** 预计后续将改进工具历史记录的处理；PR [#18911](https://github.com/ollama/ollama/pull/18911) 即将允许对聊天历史中的自定义工具调用进行更稳健的处理，从而促进复杂的智能代理工作流。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

### LiteLLM 基础设施摘要：2026-10-10

#### 1. 今日重点
LiteLLM 目前高度关注生产稳定性与架构简化，主要 PR 致力于通过单一 Docker 镜像和整合后的 Helm chart 来统一部署模式。开发工作进展迅速，重点包括基于 Rust 的性能优化以及扩展供应商级别的回退（fallback）配置。

#### 2. 发布与重大变更
*   **v1.106.0-dev.3:** 最新开发版本；包含通过 `cosign` 进行的关键 Docker 镜像签名，以确保供应链完整性 [Commit `0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0)。
*   **单体架构迁移:** 重大 PR [#43358](https://github.com/BerriAI/litellm/pull/43358) 和 [#43330](https://github.com/BerriAI/litellm/pull/43330) 正向统一的“单体（monolith）”部署模型推进，将弃用拆分的 gateway/backend/UI 工作负载，转而采用单一共享镜像和 Helm chart。

#### 3. 新模型与硬件支持
*   **ScaleDown 集成:** 增加了对 ScaleDown 作为聊天提供商的支持，包括原生端点路由，以及针对其压缩和提取模型的定价映射 [PR #44168](https://github.com/BerriAI/litellm/pull/44168), [#44167](https://github.com/BerriAI/litellm/pull/44167)。

#### 4. 性能与优化
*   **Rust 迁移:** 父跟踪议题 [#31263](https://github.com/BerriAI/litellm/issues/31263) 继续追踪将网关开销降至 1ms 以下的目标。
*   **Bedrock 优化:** [#45696](https://github.com/BerriAI/litellm/pull/45696) 专注于对 Bedrock `Invoke` 主体进行底层优化，并对 SSE 头部进行标准化，以提升流处理效率。

#### 5. 稳定性与回归
*   **Databricks Schema 回归 [已修复]:** 多个 PR ([#45658](https://github.com/BerriAI/litellm/pull/45658), [#45632](https://github.com/BerriAI/litellm/pull/45632)) 解决了一个关键问题：由于继承自 Anthropic 配置的 `$ref` 指针重写错误，导致 Databricks `json_schema` 请求失败。
*   **Vertex AI/Claude 批处理 [关键]:** [#45715](https://github.com/BerriAI/litellm/pull/45715) 修复了在 Vertex AI 上创建 Claude 批处理时出现的 404 错误，该错误源于请求被错误地格式化为 Gemini 负载。
*   **依赖项膨胀:** [#45379](https://github.com/BerriAI/litellm/issues/45379) 报告称，在转录处理程序中 `import soundfile` 会导致未安装完整 `proxy` 额外依赖的用户流式传输中断。

#### 6. 对应用开发者的影响
*   **配置管理:** 如果您正在管理自己的基础设施，请准备迁移至新的统一 `ghcr.io/berriai/litellm` 镜像和整合后的 Helm chart 结构，因为对旧版拆分工作负载的支持即将被淘汰。
*   **回退可靠性:** 一项新的全提供商回退功能正在开发中 [#45714](https://github.com/BerriAI/litellm/pull/45714)。这将允许开发者定义从 `openai/*` 到 `anthropic/*` 的回退，从而简化高可用 Agent 工作流的复杂路由逻辑。
*   **防护栏/遥测:** 正在添加新的遥测管理 UI 页面 [#45494](https://github.com/BerriAI/litellm/pull/45494)，且防护栏（guardrail）配置正变得更加细粒度，特别是将日志记录方向（输入 vs 输出）与策略失败处理解耦 [#45709](https://github.com/BerriAI/litellm/pull/45709)。

---

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 技术摘要：2026-10-10

### 1. 今日重点
今天的开发工作重心主要在于强化 **Unsloth Studio** 环境，并优化多 GPU / 异构硬件的编排能力。工程团队的工作主要分为两部分：一是关键的供应链安全加固（安装程序哈希校验及请求体限制），二是修复 RAG 和 Studio 接口流程中存在的边缘索引与内存问题。

### 2. 发布与重大变更
*   **过去 24 小时内无新版本发布**。
*   **需要采取的行动：** PR [#13192](https://github.com/unslothai/unsloth/pull/13192) 为所有 `/api` 路由引入了更严格的请求体限制（body-capping）；依赖大尺寸自定义有效载荷（payload）进行 API 请求的开发者需核实请求大小，以避免被截断。

### 3. 新模型与硬件支持
*   **Qwen-Image-2.1-Turbo：** PR [#13159](https://github.com/unslothai/unsloth/pull/13159) 增加了对 8 步蒸馏变体的支持，包括专用的采样调度和量化默认值。
*   **Intel XPU/Arc：** PR [#13193](https://github.com/unslothai/unsloth/pull/13193) 更新了 `install.sh`，在仅配备 Intel GPU 的 Linux 系统上，可自动检测并部署经过 Intel XPU 优化的 PyTorch。
*   **异构 GPU 选择：** PR [#13196](https://github.com/unslothai/unsloth/pull/13196) 优化了针对 AMD ROCm 主机的逻辑，在自动选择时优先使用独立显卡而非 APU，以防止在混合架构系统（如 Strix Halo）上出现显存不足导致的训练崩溃。

### 4. 性能与优化
*   **算子精度：** PR [#13121](https://github.com/unslothai/unsloth/pull/13121) 将 RoPE 和归一化算子中的行偏移量（row offsets）迁移至 `int64`。此举解决了大上下文操作中潜在的溢出错误，测试时通常需要约 5.5 GiB 的空闲显存。
*   **全参数微调修复：** PR [#13171](https://github.com/unslothai/unsloth/pull/13171) 修复了全参数微调中 `embedding_learning_rate` 被忽略的 Bug，确保非 LoRA 运行模式下的参数分组正确。

### 5. 稳定性与回归
*   **Jetson 崩溃（高严重性）：** PR [#13191](https://github.com/unslothai/unsloth/pull/13191) 修复了一个回归问题，该问题由系统 JetPack CUDA 与 venv 中 pip 安装的 CUDA 之间 `LD_LIBRARY_PATH` 的冲突引起，导致 Jetson 上的 Studio 部署失败。
*   **内存/索引（中严重性）：** 多项 PR 解决了 RAG 的不稳定性问题：
    *   PR [#13145](https://github.com/unslothai/unsloth/pull/13145)：解决了针对错误文件类型导致的无限索引循环问题。
    *   PR [#13188](https://github.com/unslothai/unsloth/pull/13188)：在 Apple Silicon 上限制了 Qwen-Image-2.1 的注意力层，以防止在原生 2048x2048 分辨率下出现 OOM/NaN 错误。
*   **通用问题：** 一系列积压问题（[#4504](https://github.com/unslothai/unsloth/issues/4504), [#3921](https://github.com/unslothai/unsloth/issues/3921)）仍集中在高端企业级硬件（RTX PRO6000, H100）的 VRAM 开销和非法内存访问上；这些问题表明在 Triton 算子兼容性和内存扩展性方面仍存在持续挑战。

### 6. 对应用开发者的影响
*   **RAG 的稳健性：** 如果您的应用依赖“文档对话”（Chat with Files）功能，后续更新将显著改进对办公格式（PDF, DOCX, RTF）的文档解析，并修复与无限索引循环及 HTML 表格解析相关的关键稳定性问题（[#13081](https://github.com/unslothai/unsloth/pull/13081), [#13186](https://github.com/unslothai/unsloth/pull/13186)）。
*   **Studio 可移植性：** 面向本地部署的开发者应关注硬件自动检测的改进（AMD 与 Intel XPU）。如果您是在 Jetson 模块上进行部署，待 [#13191](https://github.com/unslothai/unsloth/pull/13191) 合并后，后端服务器进程的可靠性将得到提升。
*   **模型精度：** 针对全参数微调中 `embedding_learning_rate` 的修复意味着，如果您之前在全参数更新中观察到收敛效果不佳，请务必在更新后重新验证您的训练流程。

</details>

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*