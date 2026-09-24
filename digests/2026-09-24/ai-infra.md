# AI 基础设施日报 2026-09-24

> 生成时间: 2026-09-24 00:52 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

## 基础设施生态报告：2026-09-24

### 1. 生态概览
AI 基础设施领域当前正处于“规模化整合”阶段，重心已从基础的模型支持转向优化复杂的、多轮 Agent 工作流和海量上下文推理。基础设施提供商正在努力解决有状态 Agent 会话和基于 MoE 架构固有的内存管理瓶颈。随着生产需求规模的扩大，分化已然明晰：服务引擎正强化其可观测性和可靠性，而训练与网关层则专注于成本核算和以开发者为中心的护栏机制。

### 2. 活动对比
*注：代表性数值基于活跃摘要元数据。*

| 项目 | 发布活动 | PR/Issue 活跃度 | 主要焦点 |
| :--- | :--- | :--- | :--- |
| **vLLM** | 维护中 | 极高 | 引擎强化、MoE 稳定性 |
| **SGLang** | 开发中 | 高 | Rust 前端、NPU 调度 |
| **llama.cpp** | v0.5.0 (稳定版) | 高 | 架构扩展、后端成熟度 |
| **Ollama** | rc1 (补丁) | 中等 | MLX 优化、CPU/GPU 性能 |
| **LiteLLM** | 维护中 | 高 | 计费精度、审计合规 |
| **Unsloth** | v0.1.815-beta | 高 | 多模态 Agent、AMD 支持 |

### 3. 模型支持竞赛
生态系统目前正陷入一场激烈的竞赛，旨在支持“推理”和“多模态”架构。
*   **领跑者：** **llama.cpp** 和 **Unsloth** 目前在架构广度上处于领先地位。llama.cpp 的 v0.5.0 是快速适配小众/长上下文模型（如 HRM-Text、MiMo-V2.6、Ling 3.0 VL）的黄金标准。
*   **专家级选手：** **vLLM** 和 **SGLang** 优先考虑针对高吞吐量 MoE 模型（如 DeepSeek-R1-MXFP4、Kimi-K3）的后端无关内核。
*   **硬件对等：** AMD (ROCm) 支持在所有项目中均已达到“一流”水平，且每个代码库都在积极解决遗留的 gfx950/RDNA3 稳定性问题。

### 4. 性能前沿
优化工作不再局限于基础的 Token 吞吐量，而是深入到了**编排和内核融合层**：
*   **KV Cache 管理：** vLLM 和 SGLang 均将 KV Cache 视为一种共享的、以会话为中心的资源，以实现多轮 Agent 的高吞吐量。
*   **内核融合：** “Aiter” 和 MoE 调度内核（SGLang/vLLM）的大量工作正在进行，以缓解低 Token 计数、高推理场景下的延迟。
*   **内存效率：** 量化（MXFP4, int8/W8A8）已成为大模型生产部署的强制要求，Unsloth 在原生 int8 线性层方面带来了显著提升。
*   **“吞吐量悬崖”：** 整个生态系统面临的一个共同难题是管理 100k+ 上下文窗口带来的巨大内存开销，这迫使开发者转向子分配调优（llama.cpp）和智能缓存调度。

### 5. 层级定位
*   **服务引擎 (vLLM, SGLang)：** 深度堆栈优化，聚焦于多租户、高吞吐量的生产环境。优先考虑调度、可观测性和分布式 KV Cache。
*   **本地运行时 (llama.cpp, Ollama)：** 硬件无关化。充当研究模型与通用硬件（NPU、本地 GPU）之间的“桥梁”。
*   **网关层 (LiteLLM)：** “控制平面”。专注于安全性、成本核算、护栏机制以及简化提供商抽象。
*   **训练/微调 (Unsloth)：** 以开发者为中心的性能工具。目前正在扩展至推理和 Agent “技能”管理，以提供端到端的本地开发闭环。

### 6. 趋势信号
*   **Agent 可靠性成为新指标：** 从“每秒 Token 数”向“成功调用工具执行率”的转变在 vLLM、SGLang 和 Ollama 的工具解析修复和解析器缓存改进中显而易见。
*   **运维可见性：** 生产团队正将重心从性能转向“可观测性优先”的指标（例如 vLLM 的准入拒绝追踪和 LiteLLM 的成本核算精度）。
*   **“推理”惩罚：** 随着模型向长思维链 (CoT) 转变，推理引擎正遭遇严重的 OOM 和性能衰退。开发者应预期“预算内推理” Token（Unsloth）将成为保持延迟在 SLA 范围内的标准控制参数。
*   **建议：** 如果您是为生产环境构建应用，**请优先选择 LiteLLM 进行审计，并使用 vLLM/SGLang 进行服务部署。** 对于在异构硬件上进行部署的用户，**llama.cpp v0.5.0** 目前是构建现代长上下文架构最稳定的基础。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

## vLLM 基础设施摘要：2026-09-24

### 1. 今日重点
今日的工作重点是完善 V1 引擎的功能，着重优化混合架构（GDN/Mamba）的支持，并解决大规模 MoE 部署中复杂的内存管理问题。开发人员正积极推进改进指标，并提升解耦/重强化学习（RL-heavy）推理流水线的稳定性。

### 2. 发布与重大变更
*   **过去 24 小时内无新版本发布**。
*   **文档提示：** 用户应关注 `vllm:admission_rejections_total` 指标（PR [#55812](https://github.com/vllm-project/vllm/pull/55812)），以排查因队列容量限制导致的 HTTP 503 错误。

### 3. 新模型与硬件支持
*   **ROCm/MI355X (gfx950)：** 用于 Sparse-MLA KV 缓存热缓冲的 **HiSparse** 初步支持已进入测试阶段（PR [#57602](https://github.com/vllm-project/vllm/pull/57602)）。
*   **Qwen3-Next/3.5：** 支持融合 QK-norm+RoPE+gate 的 Triton 内核（后端无关）正在向 ROCm 移植（PR [#51406](https://github.com/vllm-project/vllm/pull/51406)）。

### 4. 性能与优化
*   **Mamba/GDN 混合性能：** 针对分批次两阶段分组预填充（grouped prefill）执行，已提交了 7.58 倍的性能提升方案（PR [#55876](https://github.com/vllm-project/vllm/pull/55876)）。
*   **约束扩散（Constrained Diffusion）：** 新增了针对结构化输出生成的 `diffusion_constrained` 属性，据报告延迟降低约 25%（PR [#58216](https://github.com/vllm-project/vllm/pull/58216)）。
*   **推测解码（Speculative Decoding）：** 针对 MTP（多 Token 预测）融合多步解码优化了元数据处理，旨在减少即时重建（eager rebuilding）的开销（PR [#58463](https://github.com/vllm-project/vllm/pull/58463)）。

### 5. 稳定性与回归
*   **KV 缓存 OOM（高优先级）：** 在 ROCm 上运行的大型 MoE 模型（如 DeepSeek-R1-MXFP4）由于分析相关的内存保留导致 OOM；一项将缓存调整至实际可用内存大小的修复正在审查中（PR [#58483](https://github.com/vllm-project/vllm/pull/58483)）。
*   **GLM-5.3-Flash（中优先级）：** 有报告称在积累推理后出现长解码退化；正在调查中（Issue [#56868](https://github.com/vllm-project/vllm/issues/56868)）。
*   **V1 引擎调度器（中优先级）：** 有报告指出，当 `skipped_waiting` 请求达到 `max_num_seqs` 时，调度器会永久停止准入（Issue [#53130](https://github.com/vllm-project/vllm/issues/53130)）。
*   **回归跟踪：** 目前正通过 PR [#58318](https://github.com/vllm-project/vllm/pull/58318) 对主分支中的容错挂起问题进行二分查找。

### 6. 对应用开发者的意义
*   **智能体（Agentic）工作流：** 如果你正在构建有状态智能体，请密切关注关于[以会话为中心的 KV 缓存编排（Session-centric KV-cache orchestration）](https://github.com/vllm-project/vllm/issues/48501)的 RFC。项目正朝着将 KV 缓存作为跨集群多轮会话共享资源的方向发展。
*   **工具调用（Tool-Calling）：** 跟踪 Issue [#57571](https://github.com/vllm-project/vllm/issues/57571) 显示解析器缓存状态即将迎来改进。这将最终支持在重试流式传输数据块时保持工具调用 ID 的稳定性——这对生产级智能体的可靠性至关重要。
*   **监控：** 如果你正在运营生产环境的推理服务，PR [#55812](https://github.com/vllm-project/vllm/pull/55812) 中的新准入指标将提供极具价值的可见性，帮助你明确请求被丢弃的原因（例如区分队列深度溢出与 Token 限制拒绝）。

---

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 摘要：2026-09-24

### 1. 今日亮点
SGLang 的开发重点正集中在扩展对下一代推理架构（GLM-5.3、Kimi-K3）的模型支持，并优化 AMD 和 NPU 后端的 MoE 调度性能。目前正进行重大的基础设施升级，旨在将基于 Rust 的前端现代化为传输协议无关（transport-neutral）的架构，同时致力于将 KV cache 遥测技术与 vLLM 标准对齐。

### 2. 发布与重大变更
*   **无新版本：** 过去 24 小时内未发布新版本。
*   **基础设施：** 正投入大量精力开发 [基于 Rust 的传输无关前端核心 (#39385)](https://github.com/sgl-project/sglang/pull/39385)，以实现多协议支持的标准化。

### 3. 新模型与硬件支持
*   **NPU/Ascend：** [DeepEP 调度优化 (#40519)](https://github.com/sgl-project/sglang/pull/40519) 已启用，为 MiMo-V2.5 等模型的 MXFP8 低延迟路径提供支持。
*   **AMD/ROCm：** 针对 gfx950 (MI355X) 引入了 [MXFP4 融合 MoE 内核 (#40204)](https://github.com/sgl-project/sglang/pull/40204)，以解决低 token 数量解码批次中的 MoE 瓶颈。
*   **AMD/ROCm：** 为 MiniMax-M3 实现了 [fp8 格式的 Lightning-indexer K cache (#36549)](https://github.com/sgl-project/sglang/pull/36549)。

### 4. 性能与优化
*   **内核融合：** ROCm 用户迎来了 DSA 索引内核的重大整合，[将 Q/K 准备工作融合进单一 aiter 内核 (#34394)](https://github.com/sgl-project/sglang/pull/34394)。
*   **投机采样/预填充：** [DeepSeek 分块前缀预填充 (#40903)](https://github.com/sgl-project/sglang/issues/40903) 因内核间 LSE 基准不匹配，导致了精度回归问题。
*   **量化：** 为小批次 MoE 排序增加了 [融合 MXFP8 激活量化 (#36559)](https://github.com/sgl-project/sglang/pull/36559)，显著降低了启动开销。

### 5. 稳定性与回归
*   **高优先级（正确性）：** [DeepSeek 分块前缀预填充 (#40903)](https://github.com/sgl-project/sglang/issues/40903) 目前因混合精度 log-sum-exp 计算问题，出现静默精度丢失。
*   **高优先级（运行时）：** 据报告 [Kimi-K3/MegaMoE 回归 (#40751)](https://github.com/sgl-project/sglang/issues/40751) 导致与 DeepEP 路径相比出现严重的重复输出和精度下降。
*   **高优先级（回归）：** [TRTLLM_MHA 在 H200 上 (#40921)](https://github.com/sgl-project/sglang/issues/40921) 在预填充和解码同时使用时，会导致大模型（如 gpt-oss-120b）生成损坏的补全结果。
*   **稳定性：** [分层缓存 (HiCache) + 混合 Mamba (#40926)](https://github.com/sgl-project/sglang/issues/40926) 在 cudaHostRegister 失败时会触发未处理的 `TypeError`，导致整个实例崩溃，而非优雅报错。

### 6. 对应用开发者的影响
*   **工具调用：** 对 [Llama32Detector 的修复 (#35608)](https://github.com/sgl-project/sglang/pull/35608) 提高了工具调用解析器在输入以纯 JSON 开头时的鲁棒性。
*   **流式 API：** 新的 [缓冲区刷新 PR (#40993)](https://github.com/sgl-project/sglang/pull/40993) 确保了流式与非流式工具调用解析之间的一致性，防止在投机解码流中出现输出截断。
*   **语义评分：** 关于 `/v1/decisions` 的新 [RFC/PR (#40992)](https://github.com/sgl-project/sglang/pull/40992) 未来将允许 Agent 查询模型对选项的概率，而无需进行昂贵的全文生成解析。
*   **基准测试：** 增加了对 `--gsp-input-ids` ([#40900](https://github.com/sgl-project/sglang/pull/40900)) 的支持，允许使用原始 token ID 进行基准测试，跳过服务端分词步骤，从而实现更快、更纯净的吞吐量测试。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# Llama.cpp 摘要：2026-09-24

### 1. 今日焦点
**v0.5.0** 的发布标志着 `llama.cpp` 在稳定性方面迈出了重要一步，引入了更广泛的模型覆盖（HRM-Text/Mimir 1B、MiMo-V2.6、HunyuanOCR），并通过 `ggml` 0.25.0 提升了后端成熟度。与此同时，社区正专注于修复高性能推理中的回归问题，特别是针对 CUDA 稀疏 Flash Attention 和高上下文负载下 Vulkan 缓冲区管理的相关问题。

### 2. 发布与重大变更
*   **[v0.5.0](https://github.com/ggml-org/llama.cpp/releases/tag/v0.5.0)：** 重大里程碑版本。包含 `ggml` 0.25.0 后端改进、服务器的多地址 HTTP 绑定支持，以及对新架构的核心支持。
*   **版本控制：** 最近的构建版本 `b11146`–`b11149` 已完成 0.5.0 版本发布的过渡。

### 3. 新模型与硬件支持
*   **模型架构：** 增加了对 [HRM-Text (DFM Mimir 1B)](https://github.com/ggml-org/llama.cpp/pull/29333)、[MiMo-V2.6](https://github.com/ggml-org/llama.cpp/pull/29333)、HunyuanOCR 以及 [Gemma 4 DSpark draft backbones](https://github.com/ggml-org/llama.cpp/pull/29226) 的支持。
*   **多模态模型：** PR [#29151](https://github.com/ggml-org/llama.cpp/pull/29151) 引入了对 **Ling 3.0 VL**（124B 参数 MoE）的支持。
*   **硬件：** 正在进行的工作包括：为 Windows Arm64 启用 [Hexagon NPU 构建](https://github.com/ggml-org/llama.cpp/pull/29052)，以及通过 SYCL [#29107](https://github.com/ggml-org/llama.cpp/pull/29107) 为 Intel Arc Pro 实现持久布局优化。

### 4. 性能与优化
*   **Vulkan：** 发现 131k 上下文时存在严重的吞吐量断崖，缓解方案为设置 `GGML_VK_SUBALLOCATION_BLOCK_SIZE=4 GiB` [#27734](https://github.com/ggml-org/llama.cpp/issues/27734)。
*   **CUDA：** 开发人员正在调查最近提交的代码导致稀疏 Flash Attention 解码性能出现 [1.6 倍下降](https://github.com/ggml-org/llama.cpp/issues/29281) 的问题。
*   **量化：** 增加了 [PQ2_0 和 PTQ1_0 三元类型](https://github.com/ggml-org/llama.cpp/pull/29077)，以支持 Prism-ML 的 Bonsai 系列等先进量化模型格式。
*   **计算：** PR [#27952](https://github.com/ggml-org/llama.cpp/pull/27952) 为 AMD RDNA3/4 添加了 int8 `coopmat1` 矩阵乘法实现，专门针对 Strix Halo 等硬件上的高吞吐量提示词处理。

### 5. 稳定性与回归
*   **高严重性：** [稀疏 MoE 损坏](https://github.com/ggml-org/llama.cpp/issues/28448)：`ggml_gallocr` 在动态 MoE 路由期间会静默复用过时的分配计划，导致内存损坏。
*   **中严重性：** [服务器 Token 计数崩溃](https://github.com/ggml-org/llama.cpp/issues/29188)：存在一种竞态条件，如果请求在服务器处于休眠状态时到达，Token 计数路由会发生崩溃。修复方案见 [#29309](https://github.com/ggml-org/llama.cpp/pull/29309)。
*   **正确性：** [HIP/ROCm Logit 错误](https://github.com/ggml-org/llama.cpp/issues/28211)：长提示词（超过 `n_ubatch`）在 RDNA3 上会触发错误的 Logit 输出，可能影响生成质量。

### 6. 对应用开发者的意义
*   **服务器可靠性：** 如果你在生产环境中运行 `llama-server`，请务必拉取 `v0.5.0` 以修复 Token 计数崩溃并改进服务器唤醒逻辑。
*   **OpenAI 兼容性：** 服务器现已支持 `video_url` 内容类型和 `data:` 视频 URI [#27921](https://github.com/ggml-org/llama.cpp/pull/27921)，简化了多模态 Agent 的集成。
*   **运维调优：** 如果使用 Vulkan 处理长上下文 RAG 或大批量推理，**必须**调整 `GGML_VK_SUBALLOCATION_BLOCK_SIZE` 以避免严重的性能衰退。
*   **工具/门控：** 对于构建 Agent 工作流的开发者，请关注关于通过预填充 Logit 切片实现“快速工具门控（Fast Tool Gating）”的 PR [#29022](https://github.com/ggml-org/llama.cpp/issues/29022)，该技术有望显著降低工具使用调用的延迟。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 动态摘要：2026-09-24

### 1. 今日重点
目前的开发工作主要集中在稳定 **MLX 后端**，并解决推理性能方面的高优先级回归问题。团队正全力解决近期版本中引入的结构化输出失控问题，以及 GPU 加速环境下 CPU 占用率过高的问题。

### 2. 发布与重大变更
*   **[v0.34.4-rc1](https://github.com/ollama/ollama/pull/18438)：** 修复了服务端间歇性的“model not found”错误，并通过启用单次处理（single-pass processing）优化了“思考型”模型的结构化输出性能。

### 3. 新模型与硬件支持
*   **[ROCm v10 升级](https://github.com/ollama/ollama/pull/16446)：** 正在进行中的 PR，旨在将 Linux/Windows 构建版本迁移至 AMD ROCm v10，以提供更好的 HCL 和硬件抽象支持。
*   **MIMO v2.5/2.6：** 社区对集成 [Xiaomi's MIMO v2.5](https://github.com/ollama/ollama/issues/15887) 和 [2.6 Pro/Flash](https://github.com/ollama/ollama/issues/18616) 变体的呼声日益高涨，主要需求在于其百万 Token 的上下文处理能力。

### 4. 性能与优化
*   **[CPU 占用修复](https://github.com/ollama/ollama/pull/18613)：** 正在修复 [#17833](https://github.com/ollama/ollama/issues/17833) 中发现的回归问题，该问题导致 GPU 负载模型引起 50-80% 的 CPU 峰值。修复方案是在检测到 GPU 时向 `llama-server` 传递 `--poll 0` 参数，以防止不必要的轮询。
*   **[Embedding 吞吐量](https://github.com/ollama/ollama/pull/18610)：** 提议为 `/v1/embeddings` 绕过原生的 JSON 往返序列化，直接映射内部的 `api.EmbedResponse`，从而减少大批量处理时的序列化开销。

### 5. 稳定性与回归
*   **[高严重性 - MLX 结构化输出](https://github.com/ollama/ollama/issues/18567)：** MLX 引擎无法终止结构化生成，导致输出无限空白字符。**修复：** [PR #18569](https://github.com/ollama/ollama/pull/18569) 对语法空白字符进行上限限制以强制终止生成。
*   **[高严重性 - MLX 卡顿](https://github.com/ollama/ollama/issues/18505)：** 模型在持续的单槽负载下进行预填充（prefill）时会卡住。**缓解措施：** [PR #17834](https://github.com/ollama/ollama/pull/17834) 引入了改进的卡顿检测和进度报告功能。
*   **[回归 - glm-ocr](https://github.com/ollama/ollama/issues/18609)：** 0.34.x+ 版本导致出现“token repeat limit reached”错误；该问题与修复 EOT token 注册的 [PR #17195](https://github.com/ollama/ollama/pull/17195) 有关。
*   **[工具调用 Bug](https://github.com/ollama/ollama/issues/18605)：** Gemma 4 模型因 JSON 解析器中的参数冲突而丢弃复杂的工具调用；该问题在已关闭的 issue #18605 中进行过追踪。

### 6. 对应用程序开发者的影响
*   **Agent 工作流：** 如果你正在使用 `open-webui` 或自定义的工具调用 Agent 进行构建，请注意 Gemma 4 在工具解析以及通用工具调用完成方面目前存在的不稳定性。请密切关注 [Issue #12187](https://github.com/ollama/ollama/issues/12187) 获取更新。
*   **结构化输出：** 如果你的应用程序依赖于通过 MLX 实现的 JSON 模式，请**务必**更新至最新的修复版本（例如 [PR #18615](https://github.com/ollama/ollama/pull/18615)），因为当前版本可能会遇到无限生成循环。
*   **运维：** 如果你在 Windows 上管理高负载的 embedding 服务，请注意由禁用 keep-alive 头引起的环回端口耗尽 Bug ([Issue #18392](https://github.com/ollama/ollama/issues/18392))。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 基础设施摘要 | 2026-09-24

### 1. 今日摘要
LiteLLM 正处于一个重要的强化阶段，重点关注安全性和成本核算的精确度。主要工作包括收紧全局护栏（guardrail）覆盖的访问控制，并解决 Azure AI 和 OpenRouter 提供商的计费不准确问题。此外，团队正投入大量精力完善 CI/CD 流水线和模型成本映射（cost-map）覆盖范围，以确保在企业环境中能准确跟踪支出。

### 2. 发布与重大变更
*   **近期发布：** 推送了多个维护版本（v1.99.3 至 v1.104.0-dev.1）。
    *   [v1.104.0-dev.1](https://github.com/BerriAI/litellm/releases)
    *   *注意：* 所有版本继续通过 [cosign](https://docs.sigstore.dev/cosign/overview/) 执行强制性的 Docker 镜像验证，使用来自 [commit `0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) 的密钥。
*   **重大/安全变更：** [PR #42699](https://github.com/BerriAI/litellm/pull/42699) 对 `disable_global_guardrails` 标志进行了限制。今后仅代理管理员（proxy admins）可以覆盖全局护栏，从而关闭了非管理员用户/密钥潜在的安全绕过风险。

### 3. 新模型与硬件支持
*   **Vertex AI：** [PR #42837](https://github.com/BerriAI/litellm/pull/42837) 增加了对 Llama 3.3 70B (MaaS)、Veo 2/3、Virtual Try-On 和 2.5 TTS 模型的成本映射支持。
*   **OpenAI：** [PR #42834](https://github.com/BerriAI/litellm/pull/42834) 为包括 `chat-latest`、`codex` 和 `deep-research` 在内的 11 个最新模型添加了成本映射条目。
*   **Gemini：** [PR #42833](https://github.com/BerriAI/litellm/pull/42833) 集成了六个新预览别名模型和深度研究（deep research）模型的成本映射条目。

### 4. 性能与优化
*   **用量页面可扩展性：** [PR #42836](https://github.com/BerriAI/litellm/pull/42836) 通过启用专门的搜索 API（而非仅过滤前 N 个缓存结果），提升了 UI 搜索低支出密钥的能力。
*   **配置检查：** [PR #41705](https://github.com/BerriAI/litellm/pull/41705) 引入了 `--validate_config` 试运行标志，允许开发人员在代理启动前捕获配置错误（如 MCP 服务器定义问题）。

### 5. 稳定性与回归
*   **严重（计费/核算）：**
    *   [#39057](https://github.com/BerriAI/litellm/issues/39057) 报告了关于缓存命中（cached hits）支出核算语义的持续争议。
    *   [#36168](https://github.com/BerriAI/litellm/issues/36168)（流式用量）和 [#29145](https://github.com/BerriAI/litellm/issues/29145)（Bedrock 缓存）强调了令牌计费不准确的问题依然存在。
*   **高（稳定性）：**
    *   [#42757](https://github.com/BerriAI/litellm/issues/42757) 追踪了 `Router` 中的一个 Bug：延迟流（Gemini/Vertex）中的失败会绕过熔断器（circuit-breaker）的冷却时间。
    *   [#42477](https://github.com/BerriAI/litellm/issues/42477) 指出了 MCP 服务器 OAuth2 令牌交换失败的问题。
*   **已修复问题：** [PR #42829](https://github.com/BerriAI/litellm/pull/42829) 更正了 FLUX.2 基于像素的计费；[PR #42830](https://github.com/BerriAI/litellm/pull/42830) 确保了缓存响应日志中包含提供商标识。

### 6. 对应用开发者的影响
*   **审计合规性：** 如果您在受监管行业工作，请优先关注即将开展的防篡改审计追踪（tamper-evident audit trails）工作（[#29895](https://github.com/BerriAI/litellm/issues/29895)）。
*   **DevOps 工作流：** 请立即将 `litellm --validate_config` 集成到您的 CI 流水线中，以避免因 `config.yaml` 语法错误导致部署出现“崩溃重启循环”（crash-looping）。
*   **护栏安全性：** 请注意，在 [#41611](https://github.com/BerriAI/litellm/issues/41611) 和 [#41265](https://github.com/BerriAI/litellm/issues/41265) 得到解决之前，护栏可能无法稳定地检测到分散在 SSE 数据块中或隐藏在工具调用参数中的 PII（个人身份信息）或敏感模式。在处理高度敏感数据时，请勿将 LiteLLM 护栏视为深度包检测（DPI）的完整替代方案。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

## Unsloth 基础设施摘要：2026-09-24

### 1. 今日重点
Unsloth 通过集成 **Qwen-Image-2.1** 和一套以 Agent 为核心的工具，显著扩展了其多模态能力。开发进度持续保持高速，重点在于稳定 AMD/ROCm 工作流，并解决图像生成管线及推理模块中的性能瓶颈。

### 2. 发布与重大变更
*   **[v0.1.815-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.815-beta):** 引入对 Qwen-Image-2.1 的支持、自定义 Agent 技能，以及增强的对话项目管理功能。
*   **重要的 API/CLI 行为变化:** 
    *   `unsloth export` 现在默认强制执行 16-bit 导出，修复了此前错误地默认为 4-bit 的 Bug ([PR #11716](https://github.com/unslothai/unsloth/pull/11716))。
    *   `unsloth start --reasoning` 标志现在可以被底层引擎正确识别并遵循 ([PR #11718](https://github.com/unslothai/unsloth/pull/11718))。

### 3. 模型与硬件支持
*   **Qwen-Image-2.1:** 启用完全的本地支持，包括针对推理模块的原生集成 ([Release v0.1.815-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.815-beta))。
*   **AMD/ROCm 更新:** 积极致力于提升 AMD 的稳定性，包括处理 Windows 上的 ZLUDA 冲突 ([PR #11736](https://github.com/unslothai/unsloth/pull/11736))，并持续跟踪对 RDNA1 (`gfx1010`) 的支持进度 ([Issue #11614](https://github.com/unslothai/unsloth/issues/11614))。
*   **量化:** 为 NVIDIA 硬件上的原生 int8 线性层新增了可选的 `W8A8` 路径，基于 `torch._int_mm` 实现 ([PR #11712](https://github.com/unslothai/unsloth/pull/11712))。

### 4. 性能与优化
*   **推理速度:** 推理模块速度提升 2 倍 (从 30 FPS 提升至 60 FPS)。
*   **推理缓存:** 为图像模型新增了 `static` 步长缓存，通过预计算跳跃调度（skip schedules）来绕过 CUDA 图的开销 ([PR #11737](https://github.com/unslothai/unsloth/pull/11737))。
*   **算子优化:** 
    *   为 Qwen-Image-2.1 和其他前缀 KV 模型启用了 `First-Block-Cache` ([PR #11713](https://github.com/unslothai/unsloth/pull/11713))。
    *   在 AMD/ROCm 上禁用了 `cudnn.benchmark`，以防止在 VAE 解码期间出现 10-23 分钟的停顿或崩溃 ([PR #11732](https://github.com/unslothai/unsloth/pull/11732))。

### 5. 稳定性与回归问题
*   **高优先级:** 因 MIOpen 算子失败导致未处理的 C++ 异常，进而引发 AMD GPU 在图像生成期间崩溃。目前正着手修复，以实现更好的进程隔离 ([Issue #9130](https://github.com/unslothai/unsloth/issues/9130))。
*   **中优先级:** PEFT 模型上的 `save_pretrained_gguf` 会静默导出基础模型，而非合并后的 LoRA。部署微调权重时需谨慎 ([Issue #11698](https://github.com/unslothai/unsloth/issues/11698))。
*   **UX/UI Bug:** 
    *   修复了 VAE 解码报告过程中的 UI 卡死问题 ([PR #11740](https://github.com/unslothai/unsloth/pull/11740))。
    *   修复了 `gpt-oss` 在处理多字节字符回复时的文本编码问题（乱码） ([PR #11720](https://github.com/unslothai/unsloth/pull/11720))。

### 6. 对应用开发者的影响
*   **Agent 构建者:** 现在可以通过 `/v1/messages` 调用中的 `budget_tokens` 启用推理预算，从而更好地控制 Agent 的计算成本 ([PR #11724](https://github.com/unslothai/unsloth/pull/11724))。
*   **可观测性:** Studio 界面现在支持查看第三方 API 提供商（如 OpenAI、Anthropic 等）的 Token 使用量和缓存统计信息，缩小了与本地模型指标的差距 ([PR #11717](https://github.com/unslothai/unsloth/pull/11717))。
*   **工具支持:** 如果你正在构建自定义 Agent，请关注 [Skills Management](https://github.com/unslothai/unsloth/issues/11742) 功能。该功能旨在简化辅助函数的部署，无需手动配置基于文件的设置。

</details>

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*