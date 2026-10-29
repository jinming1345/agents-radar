# AI 基础设施日报 2026-10-29

> 生成时间: 2026-10-29 01:16 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

### 1. 生态概况
截至 2026 年 10 月，AI 基础设施生态的特征是向**原生多模态敏捷性**（LiquidAI LFM3、Vision/Omni 支持）的快速转型，以及长上下文 MoE 部署架构的成熟。各个项目正积极从追求实验性功能转向“稳定性优先”的工程实践，表现为 vLLM 的 MRV2 和 SGLang 的预填充-解码（PD）分离优化等第二代架构的推出。硬件抽象层的跨栈竞争愈演愈烈，Intel XPU 和 AMD ROCm 的支持能力已达到与传统 NVIDIA 工作流相当的水平。

### 2. 活动对比
*注：统计数据反映了截至 2026-10-29 的活跃/近期趋势。*

| 项目 | 发布活跃度 | PR/Issue 数量 | 主要开发重点 |
| :--- | :--- | :--- | :--- |
| **vLLM** | 成熟/稳定 | 极高 | MRV2 架构，MoE 优化 |
| **SGLang** | 实验性 | 高 | HiCache 稳定性，PD 分离 |
| **llama.cpp** | 里程碑 (v0.8.0) | 高 | 多模态，MoE 专家缓存 |
| **Ollama** | 迭代/测试版 | 中等 | MLX 集成，跨平台 UX |
| **LiteLLM** | 稳定 | 中等 | 成本管理，迁移至 Rust 目录 |
| **Unsloth** | 测试版 | 高 | Ulysses 上下文并行，Studio UX |

### 3. 模型支持竞赛
*   **LiquidAI LFM3：** `llama.cpp` 在 v0.8.0 版本中领先，提供了全面的原生支持；`Ollama` 紧随其后，通过基于 MLX 的多模态集成快速跟进。
*   **DeepSeek (V4/V4.1)：** 依然是全行业的“压力测试”模型，vLLM、SGLang 和 `llama.cpp` 都在同步调试与提示词缓存及稀疏预填充相关的复杂内存/损坏问题。
*   **架构覆盖：** `Unsloth` 在长上下文领域表现出极强的进攻性，将“Ulysses”上下文并行注意力机制扩展到多种新模型（Gemma 4、MiniMax、Kimi），有效地缩短了训练框架与高上下文推理之间的鸿沟。

### 4. 性能前沿
*   **KV 缓存与内存：** 业界已超越基础的 PagedAttention。目前的重点在于 **HiCache** 优化（SGLang）、MoE 专家缓存（llama.cpp）以及流水线并行微批处理（vLLM）。
*   **内核创新：** 优化不再仅仅局限于 CUDA，我们看到了在 `Dynamic4bitLinearKernel`（Arm）、XPU 专用内核，以及 RoPE/Attention 与量化融合方面的大量投入。
*   **网关开销：** `LiteLLM` 通过迁移至 Rust 以实现亚毫秒级的路由开销，引领“无感”基础设施的发展，这标志着网关延迟正成为一项竞争优势。

### 5. 层级定位
*   **服务引擎 (vLLM, SGLang)：** 专注于高吞吐量多租户、复杂的 MoE 调度以及用于大规模生产的解耦架构。
*   **本地运行时 (llama.cpp, Ollama)：** 优先考虑最终用户体验、多模态可移植性（实时语音/视觉）以及硬件无关的执行环境（Apple Silicon、移动端、CPU）。
*   **网关层 (LiteLLM)：** 专注于成本管理、安全性和代理工作流的统一提供商编排。
*   **微调/上下文框架 (Unsloth)：** 将训练效率与高上下文推理相结合，实质上降低了创建可在生产引擎上高效运行的定制化长上下文模型的门槛。

### 6. 趋势信号
*   **“思考” Token 危机：** 使用思维链（Chain-of-Thought）的代理模型（如 Mistral、Qwen3）正在冲垮现有的服务引擎。**建议：** 在生产环境中依赖复杂的推理模型之前，开发者必须监控 `thinking_token_budget` 逻辑。
*   **缓存不稳定性：** 一个反复出现的主题是重用缓存前缀时导致的输出损坏（在多个框架的 DeepSeek V4.1 中均有记录）。**建议：** 在确认特定框架补丁生效之前，对于关键任务请禁用提示词缓存/前缀重用。
*   **基础设施的 Rust 化：** 核心组件（LiteLLM 定价、潜在的未来内核）向 Rust 的转移表明，一个成熟的生态系统已不再满足于 Python 层带来的延迟开销。
*   **Windows/桌面端作为一等公民：** Ollama 和 Unsloth 都在积极强化 Windows 体验，这标志着本地“边缘 AI”正变得与数据中心云服务同等重要。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 技术摘要：2026-10-29

### 1. 今日重点
开发重点已大幅转向稳定 **Model Runner V2 (MRV2)** 架构，多个 PR 提出了先进的流水线并行 (PP) 优化方案，例如阶段局部 CUDA 图（stage-local CUDA graphs）和 DBO（基于草稿的优化）微批处理。与此同时，社区正在积极解决特定生产工作负载中的稳定性问题，重点针对稀疏/MLA 架构中的 KV 缓存分层和投机解码正确性。

### 2. 发布与重大变更
*   **过去 24 小时内无新版本发布**。
*   **迁移说明：** 依赖 `vllm[b12x]` 的用户请注意，v0.32.0 在使用分块预填充（chunked prefill）时会出现引擎核心启动崩溃；请务必根据 PR/Issue [#62984](https://github.com/vllm-project/vllm/issues/62984) 验证 attention-backend 的配置。

### 3. 新模型与硬件支持
*   **Unlimited-OCR-2：** 增加了对 Unlimited-OCR-2 模型的原生支持，采用 DASH 稀疏注意力机制和页面感知（page-aware）RoPE ([#64016](https://github.com/vllm-project/vllm/pull/64016))。
*   **Arm CPU：** 为 Arm CPU 启用了 W4A16 压缩张量推理，使用了 `Dynamic4bitLinearKernel` 和 KleidiAI 算子 ([#63832](https://github.com/vllm-project/vllm/pull/63832))。
*   **Intel XPU：** XPU 平台现已启用流式输入端到端（E2E）测试，标志着 V1 引擎在非 NVIDIA 硬件上的成熟度进一步提升 ([#64285](https://github.com/vllm-project/vllm/pull/64285))。

### 4. 性能与优化
*   **ROCm/Kimi-K3：** 一个重要的 PR ([#64031](https://github.com/vllm-project/vllm/pull/64031)) 为 ROCm 上的 Kimi-K3 引入了分片 DSpark 马尔可夫采样，通过在 TP 秩（TP ranks）之间分配 LM head，实现单次启动即可完成完整的草稿 Token 验证。
*   **Intel XPU：** 针对 XPU 的全新 `multimodal_rotary_embedding` 内核取代了通用的 Triton 路径，据报告**吞吐量提升约 13%** ([#59938](https://github.com/vllm-project/vllm/pull/59938))。
*   **MRV2/流水线并行：** 为阶段局部全 CUDA 图捕获和 DBO 有界微批选择提出的新特性，旨在优化长预填充的 MoE 部署 ([#64354](https://github.com/vllm-project/vllm/pull/64354), [#64353](https://github.com/vllm-project/vllm/pull/64353))。

### 5. 稳定性与回归
*   **关键（正确性）：** MI355X 上的 Kimi-K3 在使用 `--kv-cache-dtype fp8` 时出现静默精度下降（GSM8K 分数从 0.975 跌至 0.305）([#64106](https://github.com/vllm-project/vllm/issues/64106))。
*   **关键（正确性）：** NVFP4 量化由于未初始化的 swizzled 块缩放（block-scales）导致产生 NaN logit；修复 PR 正在进行中 ([#63382](https://github.com/vllm-project/vllm/pull/63382))。
*   **高（稳定性）：** P2P KV 卸载（NIXL）在对等节点故障时未能实现快速失败，可能导致分布式设置中出现僵尸引擎 ([#63602](https://github.com/vllm-project/vllm/issues/63602))。
*   **中（正确性）：** `modules_to_save: null` 的 LoRA 适配器或涉及非包装层（non-wrapped layers）的操作会导致崩溃或静默输出错误；修复 PR 已合并 ([#63489](https://github.com/vllm-project/vllm/pull/63489), [#63286](https://github.com/vllm-project/vllm/pull/63286))。

### 6. 对应用开发者的影响
*   **智能体工作流：** 如果您正在构建工具调用模型（例如 Mistral），请注意使用特定 `[THINK]` Token 的模型时，`thinking_token_budget` 逻辑目前失效；请关注 [#64309](https://github.com/vllm-project/vllm/issues/64309)。
*   **量化：** 在上述回归/精度问题解决之前，请避免在 Kimi 或 GLM-5.3 的生产工作负载中使用 NVFP4 或 FP8 KV 缓存设置。
*   **多模态流水线：** 基于 UUID 的媒体缓存查找正在标准化。如果您的应用程序处理大量图像/文档，预计很快会有更稳健的去重机制 ([#55616](https://github.com/vllm-project/vllm/pull/55616))。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

### SGLang 摘要：2026-10-29

#### 1. 今日重点
目前的核心任务仍是稳定 **Prefill-Decode (PD) 分离**架构，同时将大量精力转向优化 `HiCache` 的性能和可观测性。基础设施工程方面，目前的重点在于解决不稳定的 CI 测试，以及处理在高负载下因特定缓存淘汰策略导致的性能回退问题。

#### 2. 发布与重大变更
*   **无。** 过去 24 小时内未进行正式版本发布。

#### 3. 新模型与硬件支持
*   **Radeon 支持：** 正在开展一项重要的跟踪工作，旨在正式将 SGLang 扩展至 **AMD 消费级 Radeon (RDNA3/RDNA4)** 显卡，从而超越目前仅针对数据中心级 Instinct 硬件的重心 (#30599)。
*   **摩尔线程 (Moore Threads)：** 继续推进对 **摩尔线程 (MUSA)** GPU 的原生支持 (#16565)。
*   **MiMo-V2.5：** 针对 MiMo-V2.5 架构的优化工作，重点解决 8-GPU 节点上 DP-attention 配置的问题 (#37059)。

#### 4. 性能与优化
*   **HiCache 淘汰策略：** 发现 `write_back` 淘汰策略存在回退，因在缓存遍历过程中产生阻塞行为，导致 `eviction_duration_seconds` 增加了约 500 倍 (#46952)。目前正在修复，改为每次遍历仅等待一次，而非对每个受害对象进行等待 (#46930)。
*   **可观测性：** 用于调度计时的新遥测数据正在迁移至更高效的 `msgspec` 类型格式，以减少 Token 生成过程中的开销 (#47166)。
*   **DeepSeek-V4：** 继续排查 DeepSeek-V4 在 SM120 硬件 (RTX Pro 6000) 上的预填充性能问题，其吞吐量远低于报告的 vLLM/Marlin 基准测试（约 2-7K vs 12.5K tok/s）(#33422)。
*   **内核优化：** 多项 PR 重点关注量化与注意力机制的算子融合（例如 FA3 查询量化 + RoPE #35142），以及将 NCCL EP 作为低延迟 MoE 后端纳入架构 (#41353)。

#### 5. 稳定性与回归
*   **OOM 崩溃：** 在 DSPARK 期间，不受限制的 `SparsePrefillWorkspace` 分配导致 DeepSeek-V4.1 模型出现整个 TP 组崩溃的情况 (#41076)。
*   **推理卡死：** GLM-5.3 模型在持续的 FP8 推理过程中，当 KV 缓存达到容量上限时会出现卡死 (#45781)。
*   **权重更新 Bug：** 存在一个逻辑错误，即 `update_weights_from_disk` 缺少选择器，导致目标权重会被静默加载到 DFLASH 草稿模型中 (#46806)。
*   **CI 基础设施：** 正在持续缓解 PR 测试环境中的测试不稳定问题，这已成为制约项目开发速度的主要瓶颈 (#42752)。

#### 6. 对应用开发者的影响
*   **缓存策略选择：** 如果你正在使用 `HiCache`，请注意切换到 `write_back` 可能会引起明显的调度器停顿。对于延迟敏感的生产环境负载，建议目前仍使用默认的 `write_through`，直至淘汰逻辑得到优化 (#46952)。
*   **API 稳定性：** 如果你正在构建自定义编排器或 sidecar，请密切关注从 `runtime.v1` 到更稳健的 `api.v1` gRPC 协议的迁移 (#38075)。
*   **Tokenizer 可靠性：** 请留意 Tokenizer 配置处理方面的潜在回退，特别是关于 `revision` 参数的问题——目前在某些加载流程中，用户指定的版本号会被忽略 (#47125)。

---

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

### **llama.cpp 动态汇总：2026-10-29**

#### **1. 今日亮点**
本项目迎来 **v0.8.0** 重大里程碑版本，引入了 LiquidAI LFM3 模型家族，并显著扩展了服务器的实时多模态处理能力。开发重心已转向完善 MoE 专家缓存生态系统，并致力于稳定多后端张量运算，以解决长期存在的内存和批处理回归问题。

#### **2. 发布与重大变更**
*   **[v0.8.0](https://github.com/ggml-org/llama.cpp/releases/tag/v0.8.0):** 里程碑版本，增加了对 LFM3（文本、视觉、音频、全能）的支持，并引入了用于实时音频流的新服务器端点 (`/v1/realtime`、`/tts`)。
*   **[PR #31300](https://github.com/ggml-org/llama.cpp/pull/31300):** 移除了 DeepSeek V4.1 的简易批处理分割路径，现强制要求使用原生序列分割，以防止计算图重构和状态损坏。

#### **3. 新模型与硬件支持**
*   **架构:** 增加了对 LiquidAI LFM3 模型家族的支持。
*   **后端增强:**
    *   **Hexagon:** 增加了 `conv2d` 支持，并通过基于分块的 HVX 并行化优化了 IM2COL ([#30995](https://github.com/ggml-org/llama.cpp/pull/30995), [#31050](https://github.com/ggml-org/llama.cpp/pull/31050))。
    *   **OpenCL:** 为 Adreno GPU 实现了分块 Q4_K GEMM 内核 ([#30412](https://github.com/ggml-org/llama.cpp/pull/30412))。
    *   **CPU:** 集成了用于 `gemm_q6_K` 和 `ggml_gemv_q8_0` 内核的 SVE (256-bit) 实现 ([#27472](https://github.com/ggml-org/llama.cpp/pull/27472), [#30585](https://github.com/ggml-org/llama.cpp/pull/30585))。

#### **4. 性能与优化**
*   **批处理张量 API:** 正在进行大规模重构，以引入统一的批处理张量拷贝/获取 API，取代陈旧的 2D 方法，从而提升多后端效率 ([#30881](https://github.com/ggml-org/llama.cpp/pull/30881))。针对该 API 的 CUDA 专属优化已进入测试阶段 ([#30986](https://github.com/ggml-org/llama.cpp/pull/30986))。
*   **MoE 缓存:** 正在推进混合 CPU/GPU MoE 专家执行的相关工作，以降低缓存缺失带来的延迟，其中包括用于 CPU 卸载份额的自动调优脚本 ([#31286](https://github.com/ggml-org/llama.cpp/pull/31286))。
*   **量化:** 通过预计算中点值，加快了 IQ4 量化的创建速度 ([#31201](https://github.com/ggml-org/llama.cpp/pull/31201))。

#### **5. 稳定性与回归**
*   **[关键] DeepSeek V4.1 数据损坏:** 有报告称在重用带有 N-gram 历史记录的缓存提示词前缀时，会出现单 token 输出损坏的问题 ([#30944](https://github.com/ggml-org/llama.cpp/issues/30944))。
*   **[高优先级] CUDA Graphs:** 在 RTX 5090 硬件上出现 GPU 通道挂起 (Xid 8) 的报告；目前主要临时解决方案仍为 `GGML_CUDA_DISABLE_GRAPHS=1` ([#27330](https://github.com/ggml-org/llama.cpp/issues/27330))。
*   **[中优先级] SYCL 回归:** 在 Intel 硬件的新版本构建中，观察到提示词处理性能出现显著下降（约 35%）([#31262](https://github.com/ggml-org/llama.cpp/issues/31262))。
*   **[修复]** 修复了控制向量加载和 M-RoPE 位置循环中的越界写入问题 ([#31336](https://github.com/ggml-org/llama.cpp/pull/31336))。

#### **6. 对应用开发者意味着什么**
*   **多模态 Agent:** `llama-server` 中新增的 `/v1/realtime` 和 `/tts` 端点显著降低了集成低延迟语音到语音 (voice-to-voice) Agent 的门槛。
*   **部署稳定性:** 如果您正在部署 DeepSeek-V4 模型，请注意当前的缓存策略尚不稳定；在问题 [#30944](https://github.com/ggml-org/llama.cpp/issues/30944) 解决之前，请务必对提示词前缀重用进行严格测试。
*   **内存管理:** 使用 `llama-server` 的开发者请密切关注即将合并的 PR [#26130](https://github.com/ggml-org/llama.cpp/pull/26130)，该 PR 将通过 `/metrics` 和 `/memory` 接口暴露单设备内存指标——强烈建议生产环境启用以进行可观测性监控。

---

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 基础设施摘要：2026-10-29

### 1. 今日重点
本周期的工作重点是深度集成基于 MLX 的多模态能力，包括对视频输入的初步支持以及为 MLX 运行器实现原生 Windows 执行支持。同时，工程团队正在修复上游 `llama.cpp` 的回归问题，并优化 CI 稳定性，以解决近期出现的构建死锁情况。

### 2. 发布与重大变更
*   **[v0.40.13-rc1](https://github.com/ollama/ollama/compare/v0.40.12...v0.40.13-rc1)：** 包含针对 LFM3 的 GGUF 修复、llama-server 语音集成，并将 `llama.cpp` 版本升级至 `b11963` ([PR #19360](https://github.com/ollama/ollama/pull/19360))。

### 3. 新模型与硬件支持
*   **MLX 多模态：** [PR #19348](https://github.com/ollama/ollama/pull/19348) 通过现有的图像字段，为 LFM3-VL、LFM3-Omni 和 Qwen3 系列模型引入了视频输入支持（MP4/MOV）。
*   **MLX 跨平台：** [PR #19366](https://github.com/ollama/ollama/pull/19366) 目前正处于评审阶段，旨在将 MLX 运行器引入 Windows，在现有的 Metal/CUDA 实现之外增加一个 CPU 后端。
*   **视觉检测：** [PR #19328](https://github.com/ollama/ollama/pull/19328) 改进了投影仪（projector）能力报告，确保模型仅在投影仪明确为图像/视觉编码器时才声明支持 `vision`，从而防止音频类模型（如 Voxtral Mini）出现配置错误。

### 4. 性能与优化
*   **投机采样指标：** [PR #19368](https://github.com/ollama/ollama/pull/19368) 引入了针对每个请求的投机采样遥测，在 `--verbose` 模式和 API 响应中提供草稿 token 与接受 token 的计数，不再仅仅依赖容易产生误导的“接受率”报告。

### 5. 稳定性与回归
*   **MLX/Apple Silicon（高）：** 用户报告称，由于隐含的 MLX 要求，在拉取 `lfm3` 模型时会出现运行时错误 ([Issue #19343](https://github.com/ollama/ollama/issues/19343), [#19369](https://github.com/ollama/ollama/issues/19369))。
*   **Vulkan/AMD（中）：** 正在调查在 RADV 驱动程序上启用提示词缓存时，第二次请求生成吞吐量下降约 30 倍的问题 ([Issue #19201](https://github.com/ollama/ollama/issues/19201))。
*   **Mac/Metal 回归：** 合并了一个临时补丁 ([PR #19372](https://github.com/ollama/ollama/pull/19372))，以修复影响旧版本 macOS 的 `unary` 库编译崩溃问题。
*   **工具调用：** 若在工具调用之前已生成内容，`qwen3.8:27b-mlx` 无法正确发出工具调用 ([Issue #19353](https://github.com/ollama/ollama/issues/19353))。

### 6. 对应用程序开发者的影响
*   **智能体状态管理：** [PR #19349](https://github.com/ollama/ollama/pull/19349) 修复了一个系统提示词在模型加载间错误残留的 bug；依赖 `/set system` 的开发者应关注此修复，以确保上下文干净。
*   **OpenAI API 兼容性：** [PR #19192](https://github.com/ollama/ollama/pull/19192) 旨在重发聊天历史记录时保留智能体消息中的可读推理过程和图像，减少多轮智能体工作流中的数据丢失。
*   **Modelfile 韧性：** [PR #19363](https://github.com/ollama/ollama/pull/19363) 正在解决包含 `"""` 的复杂系统/模板值会导致 `Modelfile` 解析器崩溃的问题。在修复方案落地前，请确保您的自动化配置脚本考虑到这些转义限制。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 工程摘要：2026-10-29

### 1. 今日重点
目前的开发工作主要集中在两个方面：确保流式响应计费的准确性，以及向基于 Rust 的模型成本管理目录迁移。项目组正在积极修复 Anthropic/OpenAI 兼容层中出现的边缘情况回归问题，并优化复杂性路由（complexity router）针对智能体（Agent）工作流的分类逻辑。

### 2. 发布与重大变更
*   **v1.109.0-dev.1**：最新开发版本；通过 `cosign` 更新了安全签名。 ([Release](https://github.com/BerriAI/litellm/releases/tag/v1.109.0-dev.1))
*   **v1.106.6 & v1.105.7**：稳定版本，重点增强了 Docker 镜像验证的健壮性。 ([Release 1.106.6](https://github.com/BerriAI/litellm/releases/tag/v1.106.6))
*   **重大变更提醒**：PR [#48466](https://github.com/BerriAI/litellm/pull/48466) 调整了错误处理机制，现在 `/v1/messages` 路由上的身份验证/预算失败将返回原生的 Anthropic 格式封装，这可能会影响那些预期收到标准 OpenAI 风格响应的客户端错误处理逻辑。

### 3. 新模型与硬件支持
*   **Amazon OpenSearch**：增加了对 k-NN 向量搜索的支持，允许管理员注册索引，并通过 LiteLLM 的向量存储接口直接实现 RAG 工作流。 ([PR #47759](https://github.com/BerriAI/litellm/pull/47759))
*   **OpenAI Realtime**：PR [#35600](https://github.com/BerriAI/litellm/pull/35600) 增加了对最新 OpenAI 音频模型的支持，包括流式转录的计费和翻译功能。

### 4. 性能与优化
*   **Rust 目录迁移**：将 `litellm.model_cost` 加载迁移至基于 Rust 的目录机制，以确保更高效的价格刷新并降低系统开销。 ([PR #48854](https://github.com/BerriAI/litellm/pull/48854))
*   **日志开销**：显著降低了 `--detailed_debug` 模式下的日志冗长程度；此前在每一层代理都会转储完整的请求体，导致了过度的 I/O。 ([PR #48973](https://github.com/BerriAI/litellm/pull/48973))
*   **Rust 迁移**：旨在实现亚毫秒级（sub-1ms）开销 AI 网关的开发工作正在进行中。 ([Issue #31263](https://github.com/BerriAI/litellm/issues/31263))

### 5. 稳定性与回归
*   **计费（紧急）**：已部署针对流式使用量帧（stream usage frames）的修复；确保 `usage.cost` 反映的是代理的计算结果，而非上游提供商不一致的数值。 ([PR #48955](https://github.com/BerriAI/litellm/pull/48955))
*   **Prisma 二进制文件**：收到关于受限企业网络环境下下载失败的持续反馈。 ([Issue #33167](https://github.com/BerriAI/litellm/issues/33167))
*   **密钥限制**：修复了一个回归问题，该问题导致 API 密钥配置的限制超过了其所属团队的配额上限。 ([PR #40998](https://github.com/BerriAI/litellm/pull/40998))
*   **Azure/Cohere Embeddings**：修复了未定价的 Cohere v2 embed 中继被错误记录为 $0/零 Token 交易的问题。 ([PR #48978](https://github.com/BerriAI/litellm/pull/48978))

### 6. 对应用开发者的影响
*   **智能体可观测性**：如果使用 `classification_mode: every_request`，请注意 PR [#48922](https://github.com/BerriAI/litellm/pull/48922) 更新了智能体循环的分类方式，现在已包含工具调用上下文。这防止了在复杂推理任务中过早回退到“廉价层级（cheap tier）”。
*   **MCP 集成**：已提交针对传统委托服务器的修复，以恢复对依赖旧版 MCP 身份验证模式的生产环境的支持。 ([PR #48939](https://github.com/BerriAI/litellm/pull/48939))
*   **缓存策略**：在使用 OpenAI 提示词缓存（prompt caching）时，请确保客户端集成在将 LiteLLM 生成的响应 ID 传给 API 之前先对其进行解包（unwrap），因为过长的封装 ID 会被 OpenAI 的验证器拒绝。 ([PR #48816](https://github.com/BerriAI/litellm/pull/48816))

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

### Unsloth 摘要：2026-10-29

#### 1. 今日重点
Unsloth 生态系统目前正专注于一项大规模内部攻坚，旨在将“Ulysses”上下文并行注意力机制标准化，适配一系列高端架构（DeepSeek、MiniMax、Kimi、Gemma 4）。与此同时，开发团队正在加固 Unsloth Studio 环境，优先提升 GGUF 模型加载的优雅失败处理能力，并修复 Windows 和 macOS 上关键的资源管理问题。

#### 2. 发布与重大变更
*   **v0.1.912-beta:** 发布，包含万圣节主题 UI 元素、优化了启动时间，并改进了微调任务的多 GPU 兼容性。[查看发布](https://github.com/unslothai/unsloth/releases/tag/v0.1.912-beta)
*   **弃用通知:** PR [#13753](https://github.com/unslothai/unsloth/pull/13753) 宣布弃用 `whisper.cpp`，转而支持原生的基于 Transformers 的 Whisper 推理，以简化技术栈。

#### 3. 新模型与硬件支持
*   **Ulysses 并行化:** 大幅扩展了上下文并行支持范围：
    *   **DeepSeek V2/V3/V4** (MLA/Sink attention) [PR #15882](https://github.com/unslothai/unsloth/pull/15882)
    *   **MiniMax M1/M2** [PR #15881](https://github.com/unslothai/unsloth/pull/15881)
    *   **Kimi-Linear** (KDA + MLA) [PR #15880](https://github.com/unslothai/unsloth/pull/15880)
    *   **Gemma 4** (文本模型) [PR #15883](https://github.com/unslothai/unsloth/pull/15883)
*   **硬件:** 社区正在积极推进对 **Intel Arc B580 (XPU)** 的支持 [Issue #15583](https://github.com/unslothai/unsloth/issues/15583)。

#### 4. 性能与优化
*   **内存管理:** PR [#15843](https://github.com/unslothai/unsloth/pull/15843) 限制了“Auto”上下文模式在 Mac 上过度占用全部 VRAM 窗口的行为，该问题此前曾导致 Llama 3.2 1B 等小型模型的内存分配效率低下。
*   **初始化:** 对 GGUF 加载逻辑进行了改进，减少了对 Hugging Face 的查询频率，从而降低了在本地缓存模型之间切换时的延迟 [PR #15844](https://github.com/unslothai/unsloth/pull/15844)。
*   **准入控制:** 优化了 `LlamaAdmissionQueue` 的逻辑，通过监听状态变化而非轮询间隔来唤醒，从而实现更快的驻留槽位恢复 [PR #15885](https://github.com/unslothai/unsloth/pull/15885)。

#### 5. 稳定性与回归问题
*   **严重 (Windows):** Unsloth Studio 被发现会在训练期间向回收站中大量写入 `*.db-wal` / `*.db-shm` 文件；已在最新补丁中修复 [Issue #15552](https://github.com/unslothai/unsloth/issues/15552)。
*   **高:** 此前 GGUF 模型崩溃或停止时，Studio 仍会将其报告为“已加载”；新 PR 确保系统能检测到此类崩溃并重启服务器 [PR #15847](https://github.com/unslothai/unsloth/pull/15847)。
*   **中:** `UNSLOTH_FORCE_FLOAT32=1` 设置会导致 Gemma 3 在 bfloat16 数据类型下崩溃；修复正在进行中 [PR #15879](https://github.com/unslothai/unsloth/pull/15879)。
*   **中:** Claude CLI 计费头信息意外破坏了提示词缓存（prompt caching）；修复即将发布 [PR #15845](https://github.com/unslothai/unsloth/pull/15845)。

#### 6. 对应用开发者的影响
*   **推理稳定性:** 如果您正在使用 Unsloth Studio 进行生产级服务，请务必更新至最新的 Beta 版本，因为新增的 PR 显著增强了推理工作进程的健壮性（自动重启和更优的上下文管理）。
*   **智能体工作流:** 如果您正在构建依赖长上下文模型的智能体，请关注 Ulysses 并行注意力相关的 PR，这极有可能为您自定义流水线中的 DeepSeek 和 Kimi 等模型带来显著的性能提升。
*   **部署:** 对于自动化基础设施，请注意从 `whisper.cpp` 迁移至 Transformers 意味着，如果您依赖旧有的 `whisper_cpp` 模型键，则需要核查您的依赖项。

</details>

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*