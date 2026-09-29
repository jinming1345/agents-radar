# AI 基础设施日报 2026-09-29

> 生成时间: 2026-09-29 02:16 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

这份分析总结了截至 2026 年 9 月 29 日的基础设施格局，旨在追踪向智能体工作流（Agentic Workflows）、“决策模型”（Decision Model）架构以及硬件特定内核优化的快速演进。

### 1. 生态概览
目前 AI 基础设施生态正极度专注于从“聊天优化型”后端向“智能体原生”架构转型，后者优先考虑结构化决策和计算解耦。各大项目正积极采用多节点同步、专用的“决策模型”API 以及高级量化技术（MXFP4/8），以在严格的显存（VRAM）限制下满足长上下文的需求。行业正在走向双轨制架构：一是稳健的高吞吐量服务端引擎（vLLM, SGLang），二是日益成熟的本地/边缘运行时（Ollama, Unsloth, llama.cpp）。

### 2. 活动对比
*注：代表性数值基于提供的摘要活动。*

| 项目 | 功能/PR 强度 | 稳定性问题（开放/高） | 发布势头 |
| :--- | :--- | :--- | :--- |
| **vLLM** | 极高（核心架构） | 高（KV 损坏） | 稳定（主分支） |
| **SGLang** | 高（Dist-KVCache） | 高（服务器崩溃） | 无（活跃开发） |
| **llama.cpp** | 高（Batch API） | 中（服务器/挂起） | 高（每日构建） |
| **Ollama** | 中等（System One） | 高（计费/CUDA） | 活跃（v0.35.0） |
| **LiteLLM** | 中等（运维/代理） | 高（数据库/模式） | 活跃（v1.104.0） |
| **Unsloth** | 高（工具/Studio） | 中（停滞） | 活跃（测试版） |

### 3. 模型支持竞赛
*   **DeepSeek-V4.1：** vLLM 和 SGLang 处于胶着状态，两者均优先针对此架构进行深度内核优化（MLA/稀疏索引）。
*   **GLM-5.3：** SGLang 目前在针对该模型的优化（基于 Triton 的稀疏注意力机制）上处于领先地位，而 vLLM 则负责分片/扩展。
*   **决策模型：** Unsloth 和 Ollama 在“决策模型”（Laya/System One）方面处于领跑地位，推动生态系统从纯生成式文本转向程序化的输出路由。
*   **多模态/音频：** llama.cpp 在广度上保持领先，增加了对音频专用架构（GraniteSpeech, Parakeet）和复杂内容数组的支持。

### 4. 性能前沿
*   **KV Cache：** 前沿已转向**解耦服务**（vLLM 和 SGLang 中的渲染/生成/去渲染流水线）以及**分布式 KV Cache**，以支持智能体内存。
*   **内核融合（Kernel Fusion）：** 优化正在从通用的 Torch/Triton 路径转向硬件特定的微内核（例如 AMD `gfx950` MFMA 路径，NV `SM100` 融合门）。
*   **量化：** `MXFP4` 和 `FP8` 现已成为生产负载的标准要求，开发者的关注点从“能不能运行”转向了在这些精度格式下“如何防止位等同漂移（bit-identical drift）”。
*   **CPU/卸载：** 一个关键趋势是将推测解码（MTP）的草稿模型卸载到 CPU 上（llama.cpp），以在消费级显存（8-12GB）上运行超大模型。

### 5. 层级定位
*   **服务引擎（vLLM, SGLang）：** 深层基础设施，专注于吞吐量、内存分片和多节点编排。
*   **本地运行时（Ollama, Unsloth, llama.cpp）：** 专注于用户体验（UX）、开发速度，并将大模型性能带到消费级硬件（Apple Silicon、混合 GPU 环境）上。
*   **网关/代理（LiteLLM）：** 多模型/多租户企业的抽象层，专注于成本归因、护栏（Guardrails）以及统一不同服务商的架构模式。
*   **训练/微调（Unsloth）：** 底层优化，专注于微调架构的高效内存训练。

### 6. 趋势信号
*   **“System One”转向：** Ollama 和 Unsloth 向“决策模型”的转变表明，开发者应将智能体逻辑（路由、评分、分流）从聊天补全流水线中剥离，移至结构化的程序化 API 端点，以减少 Token 浪费和延迟。
*   **基础设施脆弱性：** 解耦服务领域的快速创新引入了关键的稳定性风险。开发者应实现**“中间件代理层”**（输入验证/模式清理），以防止畸形请求触发类似 SGLang 引擎的全服务器拒绝服务（DoS）。
*   **可观测性瓶颈：** 性能指标（如 `/metrics` 抓取器）目前正导致生产停滞；基础设施团队必须转向非阻塞式可观测性模式。
*   **强化工具链：** 随着智能体系统进入企业级生产，预计“模式/护栏”验证将成为顶级优先事项，LiteLLM 正在引领关于成本归因和安全护栏的重点关注。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 技术摘要: 2026-09-29

### 1. 今日重点
目前的开发重心集中在 NVIDIA 和 AMD 平台上 **DeepSeek-V4.1** 的支持扩展上，并在稀疏索引和 MLA（多头潜在注意力）算子优化方面取得了重大进展。与此同时，核心团队正在将**解耦服务架构**（Render/Generate/Derender）正式化，并解决 KV 缓存管理及推测解码流水线中的关键稳定性问题。

### 2. 发布与重大变更
*   **无。** 过去 24 小时内无正式版本发布；开发工作持续在 `main` 分支进行。

### 3. 新模型与硬件支持
*   **DeepSeek-V4.1 (AMD/ROCm):** 针对 `gfx950` (MI355X) 上 DeepSeek-V4.1 的重要启用工作。
    *   [PR #58671](https://github.com/vllm-project/vllm/pull/58671): 为 aiter MQA-logits 算子实现 Paged MXFP4 稀疏索引器。
    *   [PR #57523](https://github.com/vllm-project/vllm/pull/57523): MXFP8 KV 缓存记录读取支持。
    *   [PR #57463](https://github.com/vllm-project/vllm/pull/57463): ROCm 上 `nvfp4_ds_mla` 压缩 KV 缓存支持。
*   **GLM-5.3 性能:** [PR #54951](https://github.com/vllm-project/vllm/pull/54951) 为长上下文索引器预填充（prefill）引入了行分片（row-sharding），优化了 TP 组间的稀疏索引器性能。

### 4. 性能与优化
*   **解耦服务 (P/D):** [PR #52162](https://github.com/vllm-project/vllm/pull/52162) 通过在各 Rank 间对仅解码（decode-only）请求进行分片，提升了 PCP (Prefill/Compute/Predict) 的效率，消除了此前在每个 Rank 上重复执行冗余计算的情况。
*   **多模态推理:** [PR #58122](https://github.com/vllm-project/vllm/pull/58122) 为 LLaVA 编码器（固定分辨率）增加了 CUDA graph 支持，减少了视觉密集型工作负载的启动开销。
*   **工具:** [PR #59019](https://github.com/vllm-project/vllm/pull/59019) 引入了元设备（meta-device）算子分析器，允许开发者在无需实际分配 GPU 显存的情况下捕获模型执行流（形状、数据类型、算子顺序）。

### 5. 稳定性与回归
*   **KV 缓存损坏（高危）:** [Issue #53912](https://github.com/vllm-project/vllm/issues/53912) 反馈在使用前缀缓存 + MTP 的混合 Mamba/GDN 模型时，会出现持续的输出损坏。
*   **推测解码崩溃:** [PR #58165](https://github.com/vllm-project/vllm/pull/58165) 修复了 FlashInfer 预热期间因 `mxfp8`/`fp4` 算子使用错误的桶舍入（bucket rounding）导致的引擎崩溃循环。
*   **容错性:** [PR #56430](https://github.com/vllm-project/vllm/pull/56430) 修复了在解耦 P/D 架构下 Worker 故障时发生的 KV 块内存泄漏问题。
*   **一致性问题:** [Issue #58636](https://github.com/vllm-project/vllm/issues/58636) 指出 GLM-5.x 稀疏索引器由于副本 Key 范数的 Rank 相关自动调优，可能在不同运行间产生非确定性的结果。

### 6. 对应用开发者的影响
*   **智能体/多步应用:** 关于 **可编程 KV 缓存** ([RFC #57103](https://github.com/vllm-project/vllm/issues/57103)) 的持续工作表明，系统正转向允许更好地控制 KV 的保留和存放。这将最终允许智能体更高效地管理长期对话历史，而无需清除整个缓存。
*   **解耦服务:** Render/Generate/Derender 端点的成熟（见 [RFC #42729](https://github.com/vllm-project/vllm/issues/42729) 和 [RFC #56851](https://github.com/vllm-project/vllm/issues/56851)）表明，大规模生产环境很快将依赖这些专用端点，以便在不同的硬件层级上更好地控制 Token 化和输出格式。
*   **鲁棒性:** 如果您正在运行混合 MoE 或量化密集型模型（如 FP8/INT4），请谨慎使用 `main` 分支；目前有多个关于算子自动调优和特定精度模型加载的问题正在紧急修复中。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

## SGLang 摘要：2026-09-29

### 1. 今日要点
开发重点依然高度集中在面向大规模智能体（agentic）工作负载的基础设施扩展上，分布式 KV cache 管理和上下文并行（CP）优化方面进展显著。工程团队目前的工作重心主要分为两部分：一是稳定对下一代硬件（SM100、gfx950）的支持，二是加强分布式预填充/解码（prefill/decode）流水线，以解决同步和状态跨度（state-stride）不匹配的问题。

### 2. 发布与重大变更
*   **无**（过去 24 小时内无发布）。

### 3. 新模型与硬件支持
*   **平头哥 PPU：** 已启动对平头哥 ZW810/810E/890P 系列的一流支持路线图 [#37519](https://github.com/sgl-project/sglang/issues/37519)。
*   **AMD gfx950：** 持续推进 GLM-5.3-Flash 的适配，包括 FP8 和 MXFP4 量化支持 [#39273](https://github.com/sgl-project/sglang/pull/39273)。
*   **ROCm MI30X：** 为 MI300X/MI325X (gfx942) 目标添加了用于每日测试的 CI 集成 [#41605](https://github.com/sgl-project/sglang/pull/41605)。

### 4. 性能与优化
*   **KV Cache 分片（Sharding）：** 针对 MTP 和 DSA 索引器的池级分片工作取得持续进展，旨在支持高并发智能体流程 [#40929](https://github.com/sgl-project/sglang/pull/40929), [#40925](https://github.com/sgl-project/sglang/pull/40925)。
*   **稀疏注意力（Sparse Attention）：** 引入基于 Triton 的 gfx950 平台 GLM-5.3 稀疏注意力实现，以替代性能不佳的 TileLang 路径 [#41615](https://github.com/sgl-project/sglang/pull/41615)。
*   **上下文并行（Context Parallelism）：** 作为路线图中的活跃项目，正在扩展对 MHA/GQA 后端（FlashInfer/TRT-LLM）的 CP 支持 [#21788](https://github.com/sgl-project/sglang/issues/21788)。

### 5. 稳定性与回归问题
*   **[严重] GLM-5.3-Flash-NVFP4 精度：** 用户反馈在 SM100 硬件上与先前版本相比出现比特级一致性偏差；怀疑与近期 KDA 融合门（fusion gate）的变更有关 [#41609](https://github.com/sgl-project/sglang/issues/41609)。
*   **[高] 非法请求导致服务器崩溃：** 多份报告指出，格式错误的 `/generate` 请求（字段类型错误）可能导致整个服务器崩溃 [#41466](https://github.com/sgl-project/sglang/issues/41466), [#41467](https://github.com/sgl-project/sglang/issues/41467)。
*   **[中] PD 解耦（Disaggregation）：** 已提交针对潜在状态跨度不匹配的修复，该问题可能导致跨节点 KV 传输损坏 [#41607](https://github.com/sgl-project/sglang/pull/41607)。
*   **[中] 启动死锁：** 工作进程启动失败时现会触发 SIGQUIT 信号发送至 PID 1；已识别出父进程监控中存在的潜在边界情况 [#41539](https://github.com/sgl-project/sglang/issues/41539)。

### 6. 对应用开发者的影响
*   **健壮性担忧：** 若您的应用直接向用户暴露端点，请务必极其谨慎；当前的服务器验证机制较为脆弱，单个格式错误的请求可能导致拒绝服务（DoS）状况。请确保在请求到达 SGLang 引擎之前，有代理层对输入类型进行校验。
*   **智能体工作负载：** 如果您正在构建高吞吐量的智能体系统，请密切关注 [Distributed KVCache Roadmap](https://github.com/sgl-project/sglang/issues/21846)。当前的基础设施在现有 PD 解耦/HiCache 组合下已触及扩展极限，架构调整迫在眉睫。
*   **模型精度：** 在高端 NVIDIA (SM100) 或 AMD (gfx950) 硬件上使用的用户，若升级至当前的每日构建版，请务必验证输出的一致性，特别是针对 GLM-5.3 模型，因为内核融合路径目前存在回归风险。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 摘要：2026-09-29

### 1. 今日亮点
项目持续推进批处理（batch processing）的现代化改造，已将推测解码（speculative）和多模态（mtmd）逻辑大规模迁移至全新的 `llama_batch_ext` API。多模态能力也在 `/v1/embeddings` 端点中进一步扩展，现已支持针对 Qwen3-VL 等模型使用类型化内容数组（typed content arrays）。

### 2. 发布与重大变更
*   **b11242–b11232：** 发布了一系列更新，重点在于稳定 `batch_ext` 迁移，并修复了 GCC 15/特定编译器下的溢出问题。
*   **API 迁移：** 项目正在积极将 `server`、`speculative` 和 `mtmd` 模块迁移至 `llama_batch_ext` (#29385)。维护下游分支的开发者应优先适配此新的批处理 API，旧的 `llama_batch` 方法已被标记为弃用。

### 3. 新模型与硬件支持
*   **GraniteSpeech5：** PR #29446 引入了对 `GraniteSpeech5ForCTC` 的支持，这是一种仅编码器（encoder-only）、非自回归架构。
*   **音频/多模态：** 持续改进语音模型，包括为 Parakeet、LFM2-Audio 和 Gemma 4 音频编码器增加了左侧填充（left-padding）支持 (#29567)。
*   **CPU/x86：** x86 平台现已为非向量倍数（non-vector-multiple）的头维度启用了分块 Flash Attention，包括针对掩码操作的 AVX2 支持 (#29423)。

### 4. 性能与优化
*   **Vulkan 调优：** PR #29476 对 Intel GPU 上的 Gated Delta Net (GDN) 内核进行了显著的性能修复，据报告在 RTX 3090 基准测试中性能提升约 6%。
*   **推测解码卸载：** PR #29620（进行中）提议通过 `--cpu-mtp` 将 MTP 草稿模型（drafter）的执行卸载到 CPU，这对尝试运行高参数 MoE 模型且显存受限（8-12GB 显卡）的系统来说是一项关键功能。
*   **CUDA/ROCm：** 为 CDNA2 (gfx90a) 硬件上的 DeepSeek-V3.2/V4 指数索引器提供了新的矩阵核心 (MFMA) 路径 (#29050)。

### 5. 稳定性与回归问题
*   **Vulkan 解码性能下降：** Intel Arc A770 用户报告长时间运行的服务器存在不稳定性（运行 7-8 小时后仅返回 EOS），可能与栅栏（fence）管理有关 (#29526)。
*   **服务器挂起：** 问题 #29104 指出了一个严重 Bug，即 `/metrics` 端点的抓取工具（如 VictoriaMetrics）会导致 `llama-server` 静默停止处理请求。
*   **推测解码不匹配：** 多个报告 (#27408, #28158) 指出，在将多模态输入与草稿模型结合使用时，KV 缓存中存在持续的“空洞”问题，导致 HTTP 500 错误。

### 6. 对应用开发者的影响
*   **多模态集成：** 如果您正在构建具备视觉能力的智能体，`/v1/embeddings` 端点对类型化内容数组的支持，能够让您在处理不同架构（如 Qwen3-VL）的多模态输入时保持更高的一致性。
*   **可观测性：** 使用 `/metrics` 的开发者需注意在高频率抓取下可能出现的吞吐量停滞风险；建议在 #29104 解决前，考虑缓存指标数据或降低抓取间隔。
*   **部署策略：** 如果您在消费级硬件上运行推测解码 (MTP)，请关注 `--cpu-mtp` PR (#29620) 的进展。这很可能成为在小显存显卡上处理草稿模型 1GB+ 额外显存开销的标准方案。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 摘要：2026-09-29

### 1. 今日重点
Ollama 正式引入了 **System One** 支持，这是一项重大的架构调整，通过全新的 `/v1/systemone` API 实现了结构化的“决策模型”。此版本超越了生成式文本，允许进行分类、打分和路由等程序化输出，目前相关的详细文档和 MLX 后端集成工作正在推进中。

### 2. 发布版本与破坏性变更
*   **发布版本 v0.35.0：** 引入了用于决策模型交互的 `System One` API。
    *   [API Documentation](https://github.com/ollama/ollama/pull/18702)
    *   [Decision Model API Reference](https://typesafe.ai)
*   **API 行为变更：** 请用户注意，`/v1/chat/completions` 现在在省略参数时会强制执行 `top_p: 1.0`，这可能会覆盖 `Modelfile` 配置中自定义的 `PARAMETER top_p` 设置 ([Issue #18690](https://github.com/ollama/ollama/issues/18690))。

### 3. 新模型与硬件支持
*   **架构支持：** 针对 MLX 运行器中 `GraniteForCausalLM`（IBM Granite 4.x 模型）的 PR 正在审核中 ([PR #17972](https://github.com/ollama/ollama/pull/17972))。
*   **模型请求：** 社区已发起对 **K2 Horizon** 系列（0.9B–36B MoE/MoVA）支持的请求 ([Issue #18698](https://github.com/ollama/ollama/issues/18698))。

### 4. 性能与优化
*   **Flash Attention：** 最近的清理工作 (PR #13448) 现已支持在不触发 CPU 回退的情况下，为兼容的模型（文本、视觉、嵌入）自动启用 Flash Attention。
*   **内存管理：** 
    *   改进了多图模型（例如视觉编码器 + 文本模型）的图内存分配方式，使其利用最大图大小而非累计分配 ([PR #13244](https://github.com/ollama/ollama/pull/13244))。
    *   优化了 MLX 内存报告，现已包含 KV 缓存和计算图开销，从而提供更准确的 VRAM 利用率视图 ([PR #14382](https://github.com/ollama/ollama/pull/14382))。

### 5. 稳定性与回归问题
*   **严重 [计费]：** Stripe 计费流程中存在一个严重错误，导致用户无法修改订阅或访问服务 ([Issue #18683](https://github.com/ollama/ollama/issues/18683))。
*   **高危 [CUDA]：** 据报告，在 RTX 5090 上运行 Cohere MoE 架构时会出现 `MUL_MAT` 非法内存访问错误 ([Issue #18642](https://github.com/ollama/ollama/issues/18642))。
*   **中危 [容器/性能]：** `n_threads` 默认值目前会忽略 cgroup v2 的 CPU 配额，导致在受限环境中吞吐量下降约 45 倍 ([Issue #17916](https://github.com/ollama/ollama/issues/17916))。
*   **中危 [VRAM]：** `llama-server` 运行器目前忽略了 `OLLAMA_GPU_OVERHEAD`，导致无法为大模型部署手动预留 VRAM ([Issue #18679](https://github.com/ollama/ollama/issues/18679))。

### 6. 对应用开发者的意义
*   **采用 System One：** 如果你的技术栈涉及智能体路由、工单分类或内容审核，请考虑将这些任务从标准的聊天补全迁移到 `/v1/systemone` 端点。它提供结构化的 JSON 响应（分数/概率），消除了对聊天输出进行复杂的正则表达式解析的必要性。
*   **注意聊天截断：** 依赖工具循环的开发者应留意即将到来的修复补丁，以防止在上下文窗口截断期间丢失“最近的一条用户消息” ([PR #18697](https://github.com/ollama/ollama/pull/18697), [PR #17894](https://github.com/ollama/ollama/pull/17894))。
*   **部署提示：** 如果在 Docker/Kubernetes 中运行 Ollama，请监控 CPU 节流问题 ([#17916](https://github.com/ollama/ollama/issues/17916))。在修复补丁合并之前，可能需要显式设置 `OLLAMA_NUM_THREADS` 以防止工作线程饱和。

---

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

## LiteLLM 工程摘要 | 2026-09-29

### 1. 今日重点
LiteLLM 正全力推进企业级管理功能，重点在于提高 AWS Bedrock Mantle 的成本归因准确性及增强防护栏（Guardrail）的安全性。目前的开发工作核心在于稳定复杂的租户间路由，同时围绕 Azure PTU 共享和 MCP 工具安全性进行了大量 PR 更新。

### 2. 发布与重大变更
*   **发布**: 推出了 `v1.104.0-rc.1` 和 `v1.103.0` 版本。所有镜像均通过 `cosign` 进行加密签名（提交 `0112e53`）。
*   **基础设施变更**: PR [#43654](https://github.com/BerriAI/litellm/pull/43654) 重构了 Bedrock Mantle 的成本跟踪逻辑，通过运行时行记录直接计算，避免价格偏差。此外，PR [#43655](https://github.com/BerriAI/litellm/pull/43655) 更新了模式生成器以适配这些新的嵌套成本映射字段。

### 3. 新模型与硬件支持
*   **服务商集成**: PR [#38925](https://github.com/BerriAI/litellm/pull/38925) 增加了对 `llmman` 作为 OpenAI 兼容服务商的支持。
*   **实时支持**: 大量针对多模态/实时会话的工作，包括 PR [#43621](https://github.com/BerriAI/litellm/pull/43621)（OpenAI Live `/v1/live/sessions` 支持）和 PR [#40579](https://github.com/BerriAI/litellm/pull/40579)（DashScope 实时 WebSocket）。
*   **Bedrock**: PR [#43647](https://github.com/BerriAI/litellm/pull/43647) 为 Claude Opus/Sonnet 5.5 增加了特定的成本映射行。

### 4. 性能与优化
*   **代理效率**: PR [#43656](https://github.com/BerriAI/litellm/pull/43656) 优化了消费日志（spend log）的查找逻辑，通过限制键名解析至最旧/最新行，防止了高流量场景下 5 秒超时的发生。
*   **防护栏超时**: PR [#43648](https://github.com/BerriAI/litellm/pull/43648) 为所有防护栏检查引入了实时时钟（wall-clock）超时机制，防止服务商挂起导致代理请求被阻塞长达 600 秒。
*   **批处理**: PR [#43632](https://github.com/BerriAI/litellm/pull/43632) 对批处理文件记录和下载循环设置了严格上限，以保障代理稳定性。

### 5. 稳定性与回归问题
*   **关键（模式/逻辑）**: [Issue #43157](https://github.com/BerriAI/litellm/issues/43157) 反馈 `sanitize_input_schema_for_anthropic` 会丢失根节点的 `$ref` 和 `anyOf` 约束，导致基于 Pydantic 的复杂工具模式解析失败。
*   **高优先级（数据库）**: [Issue #41548](https://github.com/BerriAI/litellm/issues/41548) 指出，由于并发索引创建的限制，数据库迁移脚本 `20260831120001` 在分区后的 `LiteLLM_SpendLogs` 表上执行失败。
*   **中优先级（工具调用）**: [Issue #43155](https://github.com/BerriAI/litellm/issues/43155) 指出 `_handle_invalid_parallel_tool_calls` 中存在一个“差一错误”（off-by-one error），导致解析多工具调用消息时出现错误。

### 6. 对应用开发者的影响
*   **针对 Agent 构建者**: 如果你的工具依赖复杂的 `Union` 模式，由于目前存在的清理逻辑 bug ([#43157](https://github.com/BerriAI/litellm/issues/43157))，可能会在 Anthropic 模型上遇到验证问题。
*   **针对多租户平台**: 新的 `ptu_shares` 功能 ([#43043](https://github.com/BerriAI/litellm/pull/43043)) 允许各团队更有效地利用 Azure PTU，从而取代手动进行 TPM 换算。
*   **针对注重安全的运维人员**: 请确保更新你的防护栏配置，利用新的全局超时功能 ([#43648](https://github.com/BerriAI/litellm/pull/43648))，以避免 LLM 流水线中出现连锁式故障。
*   **可见性**: 一个新的 [模型排行榜页面](https://github.com/BerriAI/litellm/pull/43649) 正在开发中，它将简化你对基础设施内模型使用情况的审计。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

## Unsloth 摘要 | 2026-09-29

### 1. 今日亮点
Unsloth 发布了 **v0.1.900-beta** 版本，显著扩展了其生态系统。此次更新引入了对 **决策模型**（例如 Laya）的原生支持，并添加了一个用于文档和媒体处理的统一库。工程重点已大幅转向解决 Unsloth Studio/桌面环境中的稳定性问题，特别是针对复杂的硬件配置（NVIDIA/AMD 混合配置）导致的 Bug 以及推理瓶颈进行了修复。

### 2. 发布与重大变更
*   **[v0.1.900-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.900-beta)：** 重大更新，集成了 Laya 决策模型、全新的“技能编辑器（Skills Editor）”以及统一的文档/媒体库。
    *   *注意：* Apple Silicon 用户将获得全库范围内的性能优化。

### 3. 新模型与硬件支持
*   **决策模型：** 支持在本地运行/部署 Laya 类模型。([PR #12224](https://github.com/unslothai/unsloth/pull/12224))
*   **Idefics3：** 正在追踪对 Granite Docling VLM 架构原生支持的功能请求 ([Issue #4079](https://github.com/unslothai/unsloth/issues/4079))。
*   **混合硬件处理：** 正在进行相关工作，以支持同时使用 NVIDIA 和 AMD GPU 来分担工作负载（例如：在 NVIDIA 上进行图像生成，在 AMD 上进行训练/聊天）。([Issue #12248](https://github.com/unslothai/unsloth/issues/12248))

### 4. 性能与优化
*   **Laya 加速：** 通过 Marker-only Head 优化和 CUDA Graphs 改进了决策 API 的性能，无需使用 `torch.compile`。([PR #12224](https://github.com/unslothai/unsloth/pull/12224))
*   **图像生成效率：** 新增的自动内存规划（auto-memory planning）用于卸载激活值（activations），确保 16GB 显卡能处理高分辨率 Qwen-VL 生成任务，且不会导致显存频繁交换（thrashing）。([PR #12043](https://github.com/unslothai/unsloth/pull/12043))
*   **Apple Silicon：** PR #12256 为 MLX 上的决策 API 带来了 fp16 策略支持，降低了 Apple 硬件的内存占用。([PR #12256](https://github.com/unslothai/unsloth/pull/12256))

### 5. 稳定性与回归
*   **工具调用卡死（高）：** 正在解决一个导致在终端/Python 工具调用期间进入“运行中”状态时挂起的持续性 Bug，以防止并发锁问题。([PR #12234](https://github.com/unslothai/unsloth/pull/12234))
*   **杀毒软件误报（中）：** 持续收到 Bitdefender 和 Windows Defender 将 Unsloth 安装程序标记为威胁的报告；开发人员正在实施更稳健的修复验证消息。([Issue #12140](https://github.com/unslothai/unsloth/issues/12140), [PR #11432](https://github.com/unslothai/unsloth/pull/11432))
*   **GGUF 视觉回归（中）：** 涉及图像的聊天偶尔会触发“Invalid base64”错误，导致整个聊天会话被阻塞。([PR #12236](https://github.com/unslothai/unsloth/pull/12236))
*   **训练索引错误：** Gemma 4 31B 在多 GPU 分布式训练时，由于张量设备不匹配而失败；修复程序待发布。([PR #12233](https://github.com/unslothai/unsloth/pull/12233))

### 6. 对应用开发者的意义
*   **决策智能体：** 随着 Laya API 集成到 MCP（Model Context Protocol）菜单中，开发者可以轻松地将决策智能体挂载到现有的聊天工作流中。
*   **边缘/桌面端可移植性：** 全新的模型扫描文件夹支持 ([PR #12254](https://github.com/unslothai/unsloth/pull/12254)) 通过优先使用本地缓存命中而非重新下载 Hugging Face repo-id，使本地模型管理更具可预测性。
*   **工具可靠性：** 如果您正在使用 Unsloth Studio 构建智能体工作流，请注意正在处理的 `Max Tool Call Duration`（最大工具调用时长）；请确保您的工具具有稳健的超时设置，以避免阻塞 Studio 后端。

---

</details>

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*