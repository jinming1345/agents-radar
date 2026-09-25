# AI 基础设施日报 2026-09-25

> 生成时间: 2026-09-25 00:46 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

## 跨项目基础设施分析：2026-09-25

### 1. 生态概览
AI 基础设施生态目前正处于架构加固的快速发展期，重心已从“让模型跑起来”转向“优化生产级可靠性与复杂的智能体（agentic）工作流”。我们观察到，混合模型架构（Mamba/线性注意力机制 + Transformer）正成为关键的技术交汇点，并通过网关实现模型治理的制度化。随着前沿模型（DeepSeek-V4、Qwen3-Flash）参数量达到巨大规模，工程侧的重点日益向内存高效的 KV 缓存管理以及缓解投机采样（speculative decoding）中的非确定性回归转移。

### 2. 活动对比
*注：代表性数值基于 24 小时活动与快照数据。*

| 项目 | 预估 PRs/Issues (24h) | 发布状态 | 主要关注点 |
| :--- | :--- | :--- | :--- |
| **vLLM** | 高 (50+) | v1 稳定性 | 流水线并行与 `v1` 过渡 |
| **SGLang** | 中 (30+) | 未发布 | FFN/MoE 流水线执行逻辑 |
| **llama.cpp** | 中 (25+) | 同步 0.25.3 | Metal/NPU 内核优化 |
| **Ollama** | 低-中 (15+) | 未发布 | MLX 改进与智能体内存 |
| **LiteLLM** | 中 (20+) | 未发布 | 企业级治理与预算管理 |
| **Unsloth** | 低 (15+) | 未发布 | Studio 推理与 AMD 硬件支持 |

### 3. 模型支持竞赛
*   **DeepSeek-V4.1/Qwen3-Flash：** vLLM 在集成工作中处于领先地位，特别是在 Blackwell (SM120) 和 MI355X 的部署方面。
*   **混合模型 (Mamba/线性注意力机制)：** SGLang 目前处于领先地位，为基数缓存（radix-cache）兼容性和混合架构谓词提供了顶级支持。
*   **硬件特定：**
    *   **AMD (ROCm)：** SGLang 通过针对 Gated DeltaNet 层设计的专用后端（FlyDSL），性能显著超越竞品。
    *   **Apple Silicon：** Ollama 依然是本地基于 MLX 推理的绝对领先者，尽管 Unsloth 正在积极构建工具，将 Studio 桥接到外部服务引擎。

### 4. 性能前沿
优化工作目前因每月的“推理瓶颈”而高度碎片化：
*   **KV 缓存管理：** vLLM 正在通过异构 KV 缓存管理突破边界，并探索 INT8 量化以超越当前的 FP8 限制。
*   **批处理与解码：** SGLang 正在精简 FFN 执行流水线，以最大限度地减少冗余同步。同时，llama.cpp 正在标准化 `llama_batch_ext` 以实现投机采样的现代化。
*   **内核融合：** 在“窄 GEMM”路径（vLLM）和 RMS_NORM+SCALE 融合（llama.cpp）方面进行了大量工作，以应对预填充（prefill）性能衰退。
*   **分布式服务：** vLLM 的 DSpark（解耦服务）依然是目前针对大规模前沿模型实现计算与内存解耦的最复杂方案。

### 5. 层级定位
*   **推理引擎 (vLLM, SGLang)：** 专注于高吞吐量、多租户并发，并提供高级调度和量化支持。
*   **本地运行时 (llama.cpp, Ollama)：** 优先考虑硬件可移植性（Metal、Vulkan、NPU）及开发者集成的便捷性。
*   **网关 (LiteLLM)：** 聚焦于“应用-提供商”接口，强调成本核算、预算执行及跨提供商标准化。
*   **训练/微调 (Unsloth)：** 通过向其微调 Studio 堆栈添加推理功能（vLLM/SGLang 后端），架起从训练到生产的桥梁。

### 6. 趋势信号
*   **“智能体税（Agentic Tax）”：** 各项目已开始意识到工具调用带来的开销。Ollama 观察到与工具调用相关的内存泄漏，而 vLLM 正专注于“解析器状态缓存（parser state caching）”以稳定智能体推理链。**观察点：** 从“全提示词重渲染”到“增量聊天提示词处理”的转型，将成为对话式智能体下一个主要的延迟杀手。
*   **基础设施治理：** LiteLLM 生态系统中对“防篡改审计追踪”和“团队级预算警报”的关注，表明基础设施的成熟度终于赶上了企业合规要求。
*   **稳定性警告：** 投机采样目前处于“红色预警”状态。在 vLLM 和 llama.cpp 中，涉及输出退化和状态损坏的回归问题频繁出现。生产团队在 `v1` 和 `batch_ext` 迁移稳定之前，应暂缓将关键生产集群升级至最新版本。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 工程快报：2026-09-25

### 1. 今日要点
开发重心已大幅转向 `v1` 架构的稳定性建设，重点聚焦于解耦服务（DSpark）和异构 KV 缓存管理。目前正全力解决在 DeepSeek-V4.1 和 Qwen3-Flash 等前沿模型中，复杂的流水线并行（Pipeline-Parallel）及投机采样（Speculative Decoding）负载下出现的竞态条件和状态损坏问题。

### 2. 发布与重大变更
*   **过去 24 小时内无新版本发布。**
*   *开发者须知：* 向 `v1` 的过渡正在加速；旧模型架构（如 `Phi4Flash`）的支持现已限制在 `v1` 路径下（#23957）。

### 3. 新模型与硬件支持
*   **MI355X/gfx950：** 启动了 Qwen3.8-2.4T-A95B 使用 MXFP4 量化的性能优化路线图（#57149）。
*   **Blackwell (SM120) 覆盖：** 正通过集成 DeepGEMM，持续补齐消费级 Blackwell GPU（RTX 50/GB10）上 DeepSeek-V4-Flash 的内核缺口（#41063, #58495）。
*   **INT8 KV 缓存：** 社区已开设跟踪议题，旨在推动超越当前仅支持 FP8 的 KV 缓存量化方案（#33480）。

### 4. 性能与优化
*   **Batch-Invariant Matmuls：** 扩展了针对 `sm120` 架构的调优配置，以支持 TP>1 场景，从而解决高端工作站上的性能回退问题（#58495）。
*   **Mamba2 优化：** 通过移除 Python 端的 GPU<->CPU 同步来精简 SSM 状态保存，预计将降低基于 Mamba 的混合模型的预填充（prefill）延迟（#49371）。
*   **ROCm 内核调优：** 多个 PR 致力于减少 skinny GEMM 路径中的连续内存拷贝（#58566），并加强 AITER/CK 后端的 MoE 调度稳定性（#58393）。
*   **KV Connector：** 通过对块 ID 重叠的混合布局进行 KV 填充去重，提升了性能（#57884）。

### 5. 稳定性与回归
*   **高优先级（投机采样/MTP）：** 多份报告指出在并发环境下，特别是在涉及混合 Mamba/Attention 模型时，会出现输出退化和“Failed to advance FSM”错误（#56868, #49694, #55506）。
    *   *修复进展：* PR #58042（Mamba 尾部块丢弃修复）和 PR #55506（Mamba 投机采样索引修正）旨在解决这些稳定性问题。
*   **中优先级（DeepSeek MoE）：** `DeepSeek-V4.1-Flash` 在 H20 GPU 上当 `max_num_seqs > 256` 时触发 CUDA 非法内存访问（#56389）。
*   **中优先级（流水线并行）：** `AsyncScheduler` 中发现回归问题，导致输出占位符下溢（#57562）。

### 6. 对应用开发者的影响
*   **智能体工作流：** 如果你正在构建工具调用智能体，请关注目前正在进行的 `streaming chat derender` 和解析器状态缓存工作。这很快将允许在重试期间实现更稳定的工具调用 ID，并支持复杂的推理链提取（#57571）。
*   **部署稳定性：** 如果你正在服务混合架构（Mamba + Attention）或使用流水线并行，请谨慎对待 v0.29.0+ 版本；目前 MTP/投机采样中的回归问题会导致非确定性的 Token 循环。在生产集群升级前，建议等待 #55506/58042 的后续补丁。
*   **运维控制：** PR #55018 引入了用于开发路由的“实时调度旋钮”（live scheduler knobs）；虽然目前标记为内部/开发使用，但这预示着未来可以在不重启进程的情况下调整 Token 配额和并发上限。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 动态摘要: 2026-09-25

### 1. 今日要点
今日的工程重点在于对 MoE/FFN 执行流水线进行大规模重构，特别是优化了模型层间 FFN all-reduce 操作的延迟执行与融合机制，从而提升架构效率。此外，在支持混合注意力模型（Mamba/线性注意力）以及针对 NextN/MTP 模型的高级草稿生成策略方面，基础设施建设也取得了重大进展。

### 2. 发布与重大变更
*   **无。**（过去 24 小时内无正式发布版本）。

### 3. 新增模型与硬件支持
*   **AMD ROCm 增强：** 新增 **FlyDSL GDN prefill 后端**，旨在提升 Gated DeltaNet 层（如 Qwen3.5-397B）的性能，在预填充（prefill）基准测试中吞吐量提升约 40% [#39595](https://github.com/sgl-project/sglang/pull/39595)。
*   **混合模型架构：** 新增支持通过谓词（predicates）将线性注意力模型注册到 radix-cache 中，从而更好地兼容混合 Mamba 架构 [#41165](https://github.com/sgl-project/sglang/pull/41165)。
*   **XGrammar：** 更新支持通过 XGrammar 0.2.7 使用 **Lark 语法** [#39380](https://github.com/sgl-project/sglang/pull/39380)。

### 4. 性能与优化
*   **FFN 执行流水线：** 一系列 PR（以 [#41200](https://github.com/sgl-project/sglang/pull/41200) 到 [#41193](https://github.com/sgl-project/sglang/pull/41193) 为首）正在规范化 "FFN Exit" 逻辑。这确保了 all-reduce 操作仅在必要时执行，减少了 GLM5-Next 和 Qwen3.5 等模型中冗余的同步开销。
*   **AMD Padded Decode：** 解决了 Triton 后端中 decode CUDA-graph 的填充槽（padded slots）在处理高上下文生成时占用大量延迟的问题 [#41151](https://github.com/sgl-project/sglang/pull/41151)。
*   **采样效率：** 对采样掩码（sampling masks）进行了流式处理，改为按每个请求的数组进行传递，从而减少了在执行复杂的 top-p/top-k 采样时的开销 [#40986](https://github.com/sgl-project/sglang/pull/40986)。

### 5. 稳定性与回归问题
*   **Diffusion Serving (高)：** 用户反馈在使用 `--tp-size 2` 提供 Qwen-Image-2.1 服务时，图像会出现密集的彩色（chroma）噪点/斑点伪影。该问题在 TP1 时不会出现 [#41192](https://github.com/sgl-project/sglang/issues/41192)。
*   **AMD Attention (中)：** `aiter` 统一注意力机制中出现回归，导致 Gemma 2/3 的生成任务出现“跑偏”（基准测试退化），原因是该后端目前在 ROCm 上拒绝处理滑动窗口层 [#41152](https://github.com/sgl-project/sglang/issues/41152)。
*   **采样逻辑 (中)：** 在重叠调度程序（overlap scheduler）下，惩罚项应用（频率/重复惩罚）存在偏差（off-by-one），即在开启 `overlap` 时使用了过期的历史记录 [#41124](https://github.com/sgl-project/sglang/issues/41124)。
*   **DFlash Draft Layout (中)：** `DFLASH` 草稿检查点中的一个 bug 导致由于未验证的隐式块布局规范而产生静默的位置偏移 [#40144](https://github.com/sgl-project/sglang/issues/40144)。

### 6. 对应用开发者的影响
*   **可靠性：** 如果您正在运行高吞吐推理（特别是多轮对话），请注意当使用默认的重叠调度程序时，惩罚项计算中存在的“历史记录过期”bug [#41124](https://github.com/sgl-project/sglang/issues/41124)。
*   **API 使用：** 您现在可以在结构化生成任务中使用 Lark 风格的语法，通过 XGrammar 更轻松地定义复杂的 JSON schema 或工具调用语法 [#39380](https://github.com/sgl-project/sglang/pull/39380)。
*   **面向未来：** 开发团队正致力于实现“增量聊天提示词处理（incremental chat-prompt processing）” [#41148](https://github.com/sgl-project/sglang/issues/41148)，这将允许复用已分词的聊天历史记录，而无需在每一轮都重新渲染完整提示词——请密切关注此功能，它将大幅降低对话智能体的响应延迟。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

## llama.cpp 摘要：2026-09-25

### 1. 今日要点
`llama.cpp` 生态系统今日重点致力于内核优化（尤其是针对 Apple Metal 和 Intel 硬件），并对图执行（graph execution）进行了关键性修复。向 `llama_batch_ext` 的过渡仍在继续，旨在实现推理栈中批处理与投机采样处理方式的现代化。

### 2. 发布与重大变更
*   **GGML 同步 ([#29396](https://github.com/ggml-org/llama.cpp/pull/29396))：** 更新至 `ggml` 版本 `0.25.3`，包含对 `ggml_graph_nbytes` 的稳定性修复。
*   **批处理 API：** 正在进行向 `llama_batch_ext` 的迁移工作 ([#29385](https://github.com/ggml-org/llama.cpp/pull/29385))，最终将统一服务端和投机采样模块的批处理交互方式。

### 3. 新模型与硬件支持
*   **Hexagon NPU：** Windows Arm64 支持持续成熟，增加了 CI 支持 ([#29052](https://github.com/ggml-org/llama.cpp/pull/29052)) 并改进了动态量化器 ([#29395](https://github.com/ggml-org/llama.cpp/pull/29395))。
*   **Intel/Vulkan：** 正在开发新的 Intel 专用 Flash Attention (FA) 预填充（prefill）内核 ([#29357](https://github.com/ggml-org/llama.cpp/pull/29357))。
*   **CUDA：** 增加了针对 `CONV_2D_DW` 的 F16 内核支持 ([#29064](https://github.com/ggml-org/llama.cpp/pull/29064))。

### 4. 性能与优化
*   **Metal FA：** 通过在共享内存中缓存索引，优化了稀疏 Flash Attention ([#29377](https://github.com/ggml-org/llama.cpp/pull/29377))。
*   **CUDA Fusion：** 新的 PR 提议融合 `RMS_NORM` + `SCALE`，以解决近期预填充性能下降的问题 ([#29393](https://github.com/ggml-org/llama.cpp/pull/29393))。
*   **CPU：** 正在测试通过利用 VNNI 的分块（tiled）内核来提升 CPU `mul_mat` 3-7 倍的速度 ([#27851](https://github.com/ggml-org/llama.cpp/pull/27851))。
*   **Vulkan：** 增加了描述符集（descriptor set）重用，以最大限度地减少重复图记录过程中的 GPU 开销 ([#29280](https://github.com/ggml-org/llama.cpp/pull/29280))。

### 5. 稳定性与回归
*   **关键 (Server)：** 用户反馈当 VictoriaMetrics 抓取指标时，服务器会静默停止处理 ([#29104](https://github.com/ggml-org/llama.cpp/issues/29104))。
*   **高 (Eval)：** 量化目标上的投机采样分歧仍然是贪婪采样准确性的首要关注点 ([#25618](https://github.com/ggml-org/llama.cpp/issues/25618))。
*   **中 (Performance)：** 发现 b11047 版本后 CUDA 稀疏 FA 解码性能下降了约 1.6 倍；目前正在调查中 ([#29281](https://github.com/ggml-org/llama.cpp/issues/29281))。
*   **修复：** Metal 图捕获现在可以正确处理空图，防止冗余重置 ([#29390](https://github.com/ggml-org/llama.cpp/pull/29390))。

### 6. 对应用开发者的影响
*   **智能体工作流 (Agentic Workflows)：** 如果您依赖复杂的提示词结构（如音频/视频/图像标记），请注意杂乱的媒体标记可能会破坏分词；目前正在审查一项修复措施，以提高服务器对此类人工制品的容错性 ([#29291](https://github.com/ggml-org/llama.cpp/pull/29291))。
*   **Embedding API：** 使用 `llama-server` 嵌入（embedding）端点的开发者应更新错误处理逻辑，以适配针对无效请求返回的 HTTP 400 响应，从而提高与标准 OAI 风格客户端的兼容性 ([#29060](https://github.com/ggml-org/llama.cpp/pull/29060))。
*   **KV Cache 策略：** 在部署高上下文模型时，请注意，如果配置不当，4-bit KV 缓存的 `fattn` 内核可能会静默回退到较慢的 CPU 路径；请检查 `GGML_CUDA_FA_ALL_QUANTS` 标志以确保 GPU 加速性能 ([#28633](https://github.com/ggml-org/llama.cpp/issues/28633))。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 摘要：2026-09-25

### 1. 今日重点
开发工作目前高度集中于优化 Apple Silicon 上的 MLX 推理，重点解决请求挂起、工具调用过程中的内存泄漏以及 MoE 专家权重加载等关键问题。与此同时，该平台正在扩大其功能范围，以纳入“系统 1”（System 1）推理模型，并深化与智能体记忆框架的集成。

### 2. 发布与重大变更
*   **过去 24 小时内无新版本发布**。
*   **API/配置**：`typical_p` 参数已被正式弃用，并从强制报错改为输出警告日志 ([PR #18627](https://github.com/ollama/ollama/pull/18627))。

### 3. 新模型与硬件支持
*   **架构支持**：正在推进使 MLX 后端支持 `GraniteForCausalLM`（4.1/4.2 版本模型）的 PR ([PR #17972](https://github.com/ollama/ollama/pull/17972))。
*   **Windows-on-Arm**：正在进行一项优化，旨在将 CPU 构建基准从 `armv8-a` 提升并引入适当的点积和矩阵指令，从而显著提升 ARM Windows 设备上的推理速度 ([PR #17654](https://github.com/ollama/ollama/pull/17654))。
*   **MoE 支持**：正在修复一个问题，通过修正 MLX 运行器中非融合专家权重的加载方式，以支持 Gemma 4 MoE 布局 ([PR #18631](https://github.com/ollama/ollama/pull/18631))。

### 4. 性能与优化
*   **Windows 显存（VRAM）检测**：一个严重的回归问题导致 NVIDIA Blackwell (RTX 50-Series) 显卡无法被识别，强制回退至 CPU 推理 ([Issue #18581](https://github.com/ollama/ollama/issues/18581))。
*   **设置 UI**：PR [#18598](https://github.com/ollama/ollama/pull/18598) 通过在设置菜单初始化时推迟模型发现过程，提升了桌面应用的响应速度。
*   **网络搜索**：Anthropic 及标准响应的单次请求网络搜索限制已从 3 次增加到 10 次 ([PR #18602](https://github.com/ollama/ollama/pull/18602))。

### 5. 稳定性与回归问题
*   **MLX 请求挂起 (高)**：用户反馈在单槽位持续负载下，请求会在预填充阶段无限期挂起 ([Issue #18505](https://github.com/ollama/ollama/issues/18505))。
*   **内存泄漏 (中)**：MLX 运行器在每次工具调用请求中会泄漏约 0.43 GiB 内存，这可能导致 32GB 及以上内存系统的显存或统一内存迅速耗尽 ([Issue #18620](https://github.com/ollama/ollama/issues/18620))。
*   **推理回归 (中)**：性能回归 (0.31.2) 导致 `gemma4:31b` 等视觉模型的显存计算错误，造成每秒 Token 数（TPS）下降约 7 倍 ([Issue #17099](https://github.com/ollama/ollama/issues/17099))。
*   **工具调用解析器 (低)**：Gemma 4 响应中包含空格的对象键会导致解析器静默丢弃整个工具调用 ([Issue #18390](https://github.com/ollama/ollama/issues/18390))。

### 6. 对应用开发者的影响
*   **工具/智能体稳定性**：如果您正在 macOS/MLX 上构建智能体工作流，请注意每次工具调用周期 0.43 GiB 的内存泄漏问题。建议考虑定期重启 Ollama 运行器或监控进程的内存占用情况。
*   **系统 1（System 1）推理**：对“系统 1”模型（如 `Kev` 和 `Laya`）的支持正成为趋势 ([Issue #18594](https://github.com/ollama/ollama/issues/18594))。用于结构化决策的新端点 `POST /v1/systemone` 正处于开发中，这将简化本地智能体逻辑的集成 ([PR #18606](https://github.com/ollama/ollama/pull/18606))。
*   **API 健壮性**：请确保您的错误处理逻辑已更新；关于 `401`（认证）和 `403`（云访问）状态码的文档正在规范化，以帮助您更好地处理 API 故障 ([PR #18092](https://github.com/ollama/ollama/pull/18092))。

---

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

## LiteLLM 基础设施摘要 | 2026-09-25

### 1. 今日重点
开发重点已大幅转向企业级治理及特定供应商的边缘场景，一系列 PR 集中处理了预算管理、成本核算准确性以及 Vertex AI/Anthropic 集成的稳定性。主要更新包括：用于团队级预算预警的新管理控制项、使用日志保留设置的改进，以及针对多轮模型转换逻辑的关键修复。

### 2. 发布与重大变更
*   **过去 24 小时内无新版本发布。** 最新版本自上次部署以来保持稳定，但目前有大量上游 PR 正在排队等待合并。

### 3. 新模型与硬件支持
*   **Sail 供应商：** 增加了对 Sail 作为 OpenAI 兼容供应商的正式支持，并支持完成窗口（completion-window）分层定价 (#42840)。
*   **DeepSeek V4.1：** 为 `deepseek-v4p1-flash-us` 增加了美国区域专用的成本映射行 (#43097)。
*   **Gemini 定价同步：** 更新了 `gemini/nano-banana-pro-preview` 和 `gemini/gemini-3.1-flash-live-preview` 的成本映射，以与最新的 API 定价保持一致 (#43091)。

### 4. 性能与优化
*   **服务层（Service Tier）元数据：** PR #42870 确保 `service_tier` 在流式传输数据块和最终支出记录中均被正确持久化，防止成本报告中的数据丢失。
*   **Prometheus 指标：** PR #30082 通过修复 `/metrics` 端点上的 307 重定向问题，解决了此前导致采集器（scraper）集成停滞的指标丢失问题。

### 5. 稳定性与回归
*   **预算执行失败：** [紧急] 问题 #26672 报告称预算执行功能目前在 v1.82.3 中被绕过。依赖硬性上限的用户需审计当前的代理部署情况。
*   **Vertex/Gemma 集成：** PR #43079 和 #43075 解决了 Vertex Model Garden Gemma 部署因参数广播错误及容器级错误对象未处理而导致的失败问题。
*   **流式护栏：** 问题 #41611 强调了一个潜在的安全隐患：分布在不同 SSE 数据块中的敏感数据可能会绕过逐块过滤检查。
*   **Anthropic 工具：** 问题 #31279 报告称，当代理与兼容 OpenAI 的推理后端配合使用时，由于 `thinking_block` 重放错误，`/v1/messages` 适配器会导致重复循环。

### 6. 对应用程序开发者的影响
*   **预算治理：** 新 PR（#42665, #39221）引入了团队成员预算百分比的电子邮件预警，以及标签消费日志的保留清理机制。这对于降低大规模多租户部署中的噪声至关重要。
*   **审计合规：** 对于受欧盟《人工智能法案》（EU AI Act）等法规约束的用户，请查阅 #29895，了解关于调用后回执中间件（post-call receipt middleware）的内容，以获取防篡改的审计追踪记录。
*   **成本准确性：** 如果您的应用程序使用 Anthropic 提示词缓存或流式传输，请注意已知的影响流式响应中 Token 归属的问题（#39088, #36168）。在这些补丁稳定之前，请务必根据原始供应商账单核对您的成本报告。
*   **UI/可观测性：** 增加了流量来源和模型支出视图（#43096），这将显著提升在部署层级调试自动路由行为和成本分配的能力。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 基础设施摘要 | 2026-09-25

### 1. 今日重点
Unsloth 生态系统目前正专注于完善 **Studio 的推理能力**，在添加 **vLLM 和 SGLang** 的选择性支持方面取得了重大进展 (#11491)。与此同时，开发人员正致力于弥补 **AMD 硬件支持**（RDNA1/ROCm）的差距，并优化图像模型的 VAE 解码路径，以提高长期运行任务的稳定性和性能。

### 2. 发布与重大变更
*   **过去 24 小时内无新版本发布**。
*   **基础设施说明：** 开发人员正转向使用 Trusted Publishing 发布 PyPI wheels (#6297)，这将通过 GitHub Actions 根据 `install.sh` 中的版本号变更实现自动化发布。

### 3. 新模型与硬件支持
*   **AMD Ryzen AI (NPU) 支持：** 新的 PR 实现了通过 Lemonade 和 FastFlowLM 在 XDNA 2 架构（Strix Halo/Point）上进行聊天，支持 Windows 和 Linux (#11743)。
*   **Kimi-K3 集成：** 针对 `moonshotai/Kimi-K3` 的高级支持正在开发中，重点在于实时解量化打包的 MXFP4 专家模型 (#11750)。
*   **FlashInfer NVFP4：** 针对分层策略和内核调度后端（kernel dispatch backends）的 PR 进展顺利，旨在为 DiT 模型带来高性能的 NVFP4 推理，且无需更改 Torch 版本 (#10730, #10731, #11730)。

### 4. 性能与优化
*   **Studio Diffusion 缓存：** 优化 PR 阻止了热启动期间不必要的编译缓存包重写，并绑定了磁盘使用量 (#11874)。
*   **推理请求扫描：** 改进了逻辑，防止在快速请求时对模型文件夹进行冗余的 17 秒扫描，显著降低了自动切换模型时的延迟 (#11872)。
*   **图像精度：** 视频自动精度逻辑现在会保留常驻 GPU 的 `bf16` DiT 模型（如果显存空间充足），从而防止导致精度下降的不必要 INT8 量化 (#11831)。
*   **基准测试工具：** 新的 PR 为 Studio 引入了一个专门的基准测试页面，用于测试推测解码（speculative decoding）、KV 缓存和 RAM 卸载设置 (#11808)。

### 5. 稳定性与回归问题
*   **严重 (AMD/Windows)：** 锁定在 `torch 2.10.0+rocm7.13.0` 的旧虚拟环境会导致 `_grouped_mm` 出现访问冲突，从而在执行 `import unsloth` 时立即崩溃 (#11814)。
*   **高优先级：** AMD/Windows 用户在导出 GGUF 时报告出现 `hipErrorInvalidKernelFile`，这是由于安装程序尝试将模型拆分到不兼容的集成显卡（iGPU）上所致 (#11870)。
*   **中优先级：** Qwen-Image-2.1 集成问题依然存在，包括重复下载（“Required assets” 与 GGUF 冲突）以及在旧版 AMD 显卡上 VAE 解码挂起/崩溃的问题 (#11637, #11636, #11840)。
*   **低优先级：** 在桌面端/Studio 环境中报告了在 60 FPS 下“思考”文本渲染出现 UI 卡顿的问题 (#11778)。

### 6. 这对应用开发者意味着什么
*   **引擎灵活性：** 如果您正在构建高吞吐量的智能体，即将到来的 **vLLM 和 SGLang 集成** (#11491) 将为多 GPU 推理和高级量化提供重要途径，且无需重新构建整个 Studio 技术栈。
*   **部署可靠性：** 使用 Unsloth Studio 进行 RAG 或文档索引的开发者需要注意，嵌入模型（embedding models）目前默认使用 CPU；在 GPU 切换开关暴露之前，用户目前必须寻找手动变通方案 (#11768)。
*   **约束感知：** 在构建自动化工作流时，请注意工具调用省略（tool-call elision）在内存压力下可能导致文件损坏 (#11839)。请确保您的智能体逻辑能够处理当前的上下文限制错误消息。

</details>

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*