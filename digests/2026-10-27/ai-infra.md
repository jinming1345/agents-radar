# AI 基础设施日报 2026-10-27

> 生成时间: 2026-10-27 01:38 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

### AI 基础设施生态报告：2026-10-27

#### 1. 生态概览
AI 基础设施领域目前正围绕“Flash”和“Next”模型架构进行快速整合，从单纯的推理吞吐量向内存高效的智能体（Agentic）工作流转移。领先项目正优先开发解耦的 KV-cache 机制、模块化流水线并行（Pipeline Parallelism）以及针对下一代芯片（Blackwell、Hexagon NPU）的硬件特定内核优化。随着复杂性增加，各项目正从实验性功能转向加固 API、标准化配置，并解决持久内存管理中的回归问题。

#### 2. 活动对比
*注：问题/PR 数量基于各项目源的每日活跃开发速度估算。*

| 项目 | 估算开启的问题/Bug | 估算每日 PR | 发布状态 |
| :--- | :--- | :--- | :--- |
| **vLLM** | 高（稳定性/P2P） | 极高 | 稳定（24小时内无发布） |
| **SGLang** | 中（推测解码） | 高 | 稳定（24小时内无发布） |
| **llama.cpp** | 中（硬件/Vulkan） | 高 | 活跃 (b11905-b11913) |
| **Ollama** | 中（稳定性） | 中 | 活跃 (v0.40.12-rc0) |
| **LiteLLM** | 低（代理加固） | 低 | 稳定（24小时内无发布） |
| **Unsloth** | 中（内存/Studio） | 中 | 活跃 (v0.1.911-beta) |

#### 3. 模型支持竞赛
*   **DeepSeek-V4.1：** 主要战场。**SGLang** 正在推动深度集成和内核重构；**vLLM** 正在修复 API 级 Bug；**llama.cpp** 则在处理边缘情况下的数据损坏问题。
*   **GLM-5.3-Flash：** 重点合作领域。**vLLM** 和 **SGLang** 在优化 KDA/稀疏 MLA 架构和 FP8 模式方面展开了平齐竞赛。
*   **下一代架构：**
    *   **MiniMax-M3.1-Flash：** 通过 **Unsloth** 获得早期独家支持。
    *   **Laguna：** 通过 **llama.cpp** 获得早期支持。
    *   **DFlash2：** 通过 **Ollama** 获得新集成。
*   **赢家：** **vLLM** 依然是企业级模型支持的标杆，但 **SGLang** 在针对最新 Blackwell/SM120 架构的性能关键型优化方面处于领先地位。

#### 4. 性能前沿
优化工作在不同目标层级上严重分化：
*   **KV-Cache 与内存：** 业界已转向“可编程/可重用”的 KV-Cache 模式（**vLLM**），旨在将生命周期管理与引擎核心解耦。
*   **内核与硬件：** 大量投入集中在**子组归约（Subgroup Reductions）**和 **NPU/Hexagon** 优化（**llama.cpp**），以及针对 MoE 架构的 **FP8/W4A16** 路由（**SGLang/vLLM**）。
*   **分布式服务：** 正向可插拔流水线并行（PP）基础设施大幅转型，旨在打破对 `torch.distributed` 世界大小（world-size）的刚性依赖。

#### 5. 层级定位
*   **服务引擎（vLLM, SGLang）：** 深度集成、面向生产的高吞吐引擎。目前在 MoE 路由效率和弹性部署方面展开竞争。
*   **本地运行时（llama.cpp, Ollama）：** 侧重于可移植性和硬件无关执行（Vulkan、Hexagon、MLX）。正在迅速缩小消费级硬件与服务器级性能之间的差距。
*   **网关（LiteLLM）：** 企业级控制的抽象层。优先考虑模式强制执行、成本监控准确性以及对 MCP/工具链连接的管理。
*   **微调（Unsloth）：** 专注于工作室级 UI 中的高效训练/适配及多模态工具调用集成。

#### 6. 趋势信号
*   **智能体压缩（Agentic Compaction）：** 持久、长上下文智能体会话的兴起，迫使推理引擎实现“压缩”逻辑。开发者应关注这些引擎如何管理状态恢复，以避免昂贵的重新预填充（re-prefills）。
*   **工具调用不稳定：** 多个项目（SGLang、Ollama、vLLM）在工具调用解析和 JSON 列表截断方面表现不佳。预计下一周期将出现一波“解析稳定性”升级。
*   **企业级加固：** LiteLLM 将 MCP/代理功能移出“实验性”命名空间，标志着生态系统趋于成熟，稳定性和 API 版本控制正变得与纯吞吐量同等重要。
*   **开发者建议：** 如果是构建生产环境应用，请避免在推测解码或 MoE 量化模块上使用“latest”标签。当前对内存管理的关注表明，在部署策略中优先考虑应对“内存泄漏”和“状态损坏”是未来的关键。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 简报：2026-10-27

### 1. 今日亮点
开发工作主要集中在 **流水线并行 (PP) 模块化** 和 **存算分离式 KV-cache 基础设施** 上，多个 PR 引入了可插拔的传输机制，以支持进程外弹性 PP 阶段。与此同时，针对 **GLM-5.3-Flash** 和 **Qwen3.8-Flash-Next** 模型系列的性能调优活动激增，重点在于优化 MoE 路由和 KV-cache 索引器工作流。

### 2. 版本发布与破坏性变更
*   **过去 24 小时无新版本发布**。
*   **配置说明**：可插拔 PP (#63818) 的开发引入了新的 CLI 参数（例如 `--pp-group-cls`、`--pipeline-stage-idx`），最终将使流水线阶段与固定的 `torch.distributed` 世界大小解耦。

### 3. 新模型与硬件支持
*   **GLM-5.3-Flash**：针对混合 KDA/Sparse-MLA 架构的深度优化正在进行中 (#57406, #60991, #63072)。
*   **Qwen3.8-Flash-Next**：扩展了对 ROCm 和 CPU 后端的支持 (#61529, #57294)。
*   **Decision 3.0**：增加了对 `vllm-sr/d3-turbo` (27B) 及前缀双向注意力机制的支持 (#62584)。

### 4. 性能与优化
*   **KV-Cache 效率**：提出的“可编程 KV Cache” (#57103) 引入了一种与提供商无关的生命周期管理抽象，而全新的“可重用 KV 压缩层” (#59538) 旨在将标准压缩工作流（如 Mooncake/KVServe）集成到引擎中。
*   **内核工作**：
    *   **ROCm/QSA**：为 Qwen4Exp 启用 FP8 KV 和索引器缓存支持 (#61529)。
    *   **GLM-5.3**：PR #63072 通过消除因冗余分块索引重新计算而导致的 GPU→CPU 同步，优化了预填充（prefill）性能。
*   **Rust 前端**：性能改进包括在禁用文本输出的 gRPC 请求中跳过反标记化（detokenization）处理 (#63789)。

### 5. 稳定性与回归
*   **高严重性 (P2P 故障)**：P2P KV 卸载层在对等节点故障时无法实现“快速失败”，导致在存算分离部署中可能出现挂起 (#63602)。
*   **正确性 (GLM-5.3)**：在 GLM-5.3 上结合使用 `HiSparse` 和 NIXL 会导致长序列解码时出现全 NaN 的 logit 崩溃 (#63811)。
*   **回归 (Model Runner V2)**：由于近期变更中引入了过于严格的 `--mamba-block-size` 要求，混合 Mamba/GDN 目标配置校验失败 (#63844)。
*   **Bug (API)**：logprob 计算中的一个 `IndexError` 导致 DeepSeek V4.1 模型在 `/v1/chat/completions` 接口出现偶发性 500 错误 (#63751)。

### 6. 这对应用开发者意味着什么
*   **Agent 服务**：如果你正在构建需要高吞吐内存管理的 Agent 系统，请密切关注 **可编程 KV Cache** (#57103)；它最终将允许你根据特定的 Agent 会话生命周期定义自定义的保留策略。
*   **工具调用 (Tool Calling)**：Rust 前端工具调用的修复工作正在进行中 (#63584)，该问题目前在无法解析特定解析器时会返回 500 错误。
*   **DeepSeek 集成**：如果你正在运行 DeepSeek-V4.1，请注意当前在处理波斯语文本（半角空格）以及 Hopper 架构上块级 FP8 MoE 激活时存在的问题——在迁移到最新的 `main` 分支前，请务必先测试你的具体硬件配置。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

## SGLang 摘要：2026-10-27

### 1. 今日要点
目前的开发重点主要集中在 DeepSeek-V4.1 的深度优化以及 Blackwell (SM120/121) 架构高性能内核的稳定性构建上。工程师们正在积极解决投机采样（speculative decoding）中的关键稳定性问题，并修复多模态工具调用（tool-calling）工作流中跨 Worker 同步的 Bug。

### 2. 发布与重大变更
*   **过去 24 小时无更新。**

### 3. 新模型与硬件支持
*   **DeepSeek-V4.1：** 相关的集成工作正在 [#42170](https://github.com/sgl-project/sglang/issues/42170) 中跟踪，包括针对 Multi-Head Chunked (mHC) 注意力机制的具体重构。
*   **GLM-5.3-Flash (SM120/Blackwell)：** 该模型的资质认证与修复跟踪正在进行中，主要针对 W4A16 路由专家（routed experts）、FP8 KV 以及视觉/MTP 支持 [#37813](https://github.com/sgl-project/sglang/issues/37813)。
*   **NPU/Ascend 950：** 通过 PR [#39947](https://github.com/sgl-project/sglang/pull/39947) 正在推进 Ascend 950 上对 DeepSeek-V4 "DSpark" 投机采样的支持。

### 4. 性能与优化
*   **引擎恢复：** Weight Cache Daemon 第一阶段（针对权重的按 Rank CUDA IPC）持续受到高度关注 [#33522](https://github.com/sgl-project/sglang/issues/33522)，Qwen3-235B FP8 的加载时间已从约 300 秒提升至 1 秒以内。
*   **GLM-5.3-Flash：** 提议为 BF16 KDA 投影引入一种新的可选 FP8 模式以提升性能 [#46426](https://github.com/sgl-project/sglang/pull/46426)。
*   **AMD/ROCm Qwen3.8：** 多项 PR 旨在通过 AITER 融合内核提升 `gfx950` 上的 QSA 解码和验证性能 [#41880](https://github.com/sgl-project/sglang/pull/41880), [#45196](https://github.com/sgl-project/sglang/pull/45196)。
*   **NaN 验证：** 一项新 PR 通过将 NaN 验证融合进单个 Triton 只读内核中，旨在降低延迟开销 [#43720](https://github.com/sgl-project/sglang/pull/43720)。

### 5. 稳定性与回归
*   **投机采样崩溃（高危）：** 一个关键 Bug 导致在使用投机采样且遇到首个非贪婪请求时，服务器发生全网 `SIGKILL`，这主要与 pip 安装环境下的 FlashInfer JIT 失败有关 [#43412](https://github.com/sgl-project/sglang/issues/43412)。
*   **量化/模块不匹配（中危）：** 多份报告证实，混合精度 NVFP4 检查点在加载时因 `is_layer_excluded` 中的正则表达式/命名失败 [#36596](https://github.com/sgl-project/sglang/issues/36596) 以及 EP>1 的 MoE 模型中的规模切片（scale-slicing）问题 [#36597](https://github.com/sgl-project/sglang/issues/36597) 而崩溃。
*   **工具调用解析器（中危）：** 据报道，`MiMoDetector` 在工具调用工作流中会静默丢弃文本或将字符串转换为 `None` [#46566](https://github.com/sgl-project/sglang/issues/46566)。
*   **动态 LoRA（中危）：** 由于缺乏跨 Worker 同步，当使用超过一个分词器（tokenizer）Worker 时，动态加载功能实际上已损坏 [#31084](https://github.com/sgl-project/sglang/issues/31084)。

### 6. 对应用开发者的影响
*   **多模态/Agent 稳定性：** 如果您正在使用工具调用功能，请注意 `MiMoDetector` 可能存在的静默输出损坏问题 [#46566](https://github.com/sgl-project/sglang/issues/46566)。
*   **部署谨慎：** 如果您的环境需要采样（temp > 0），请避免在生产环境中启用投机采样，因为目前这会触发服务器崩溃 [#43412](https://github.com/sgl-project/sglang/issues/43412)。
*   **量化注意事项：** 如果您正在 MoE 架构（DeepSeek/Qwen 变体）上部署量化（NVFP4）模型，请确保您的模型配置显式处理了层排除和规模切片逻辑，因为最近的更新表明这些代码路径中存在重大 Bug。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 摘要：2026-10-27

### 1. 今日亮点
过去 24 小时的重点在于架构精简与后端性能优化，具体聚焦于 Hexagon NPU 的性能提升以及基于 Vulkan 的 Flash Attention 改进。关键的结构性调整包括将 `no_alloc` 从 `llama_hparams` 中移除，并以结构体（structs）替换张量输出参数，这标志着简化图构建器（graph builder）接口的持续努力。

### 2. 发布与重大变更
*   **版本：** `b11905` – `b11913`
*   **API/重构：** 
    *   [#31141](https://github.com/ggml-org/llama.cpp/pull/31141): 从 `llama_hparams` 中移除了 `no_alloc` 字段。
    *   [#31142](https://github.com/ggml-org/llama.cpp/pull/31142): 使用显式输出结构体替换了 `ggml_tensor**` 输出参数，简化了图构建器的逻辑。

### 3. 新模型与硬件支持
*   **Laguna:** [#31147](https://github.com/ggml-org/llama.cpp/pull/31147) 增加了对 Laguna 模型架构的支持，包括 MoE amax 重缩放，以解决在大型预填充（prefill）微批处理期间 Metal 后端的溢出问题。
*   **Hexagon:** [#31221](https://github.com/ggml-org/llama.cpp/pull/31221) 引入了 `GGML_HEXAGON_VTCM_SIZE`，允许手动配置 Hexagon VTCM 容量。

### 4. 性能与优化
*   **Hexagon:** [#31169](https://github.com/ggml-org/llama.cpp/pull/31169) 为 `MUL_MAT_ID` 落地了跳行优化，通过向量化行清零提升了执行速度。
*   **Vulkan:** 
    *   [#29882](https://github.com/ggml-org/llama.cpp/pull/29882) 使用子组规约（subgroup reductions）优化了 RMS Norm，显著提升了性能，并为 AMD 显卡提供了快速路径（fast path）。
    *   [#30738](https://github.com/ggml-org/llama.cpp/pull/30738) (草案) 提议为 Flash Attention 中的 Q4_0 KV 缓存提供一种“反量化+转置”的快速路径，特别针对较旧的 GCN1 硬件（FirePro D700）。
*   **CPU:** [#31179](https://github.com/ggml-org/llama.cpp/pull/31179) 将 `concat` 内核统一为单一的高效行处理实现，适用于所有数据类型。
*   **量化:** [#31201](https://github.com/ggml-org/llama.cpp/pull/31201) (进行中) 提议通过预计算中间点来实现 IQ4 量化的位等效加速，从而避免运行时的二分查找。

### 5. 稳定性与回归
*   **Vulkan (高):** [#31189](https://github.com/ggml-org/llama.cpp/issues/31189) 报告在使用合并张量时 `qwen4exp` 出现断言失败。
*   **Vulkan (中):** [#30944](https://github.com/ggml-org/llama.cpp/issues/30944) 指出当通过 Engram 复用缓存的提示词前缀时，`DeepSeek-V4.1-Flash` 会出现输出损坏。
*   **SYCL (中):** [#29183](https://github.com/ggml-org/llama.cpp/issues/29183) 追踪在 Intel Arc Pro B70 硬件上长提示词使用 DeltaNet 内核时出现的“token soup”问题。
*   **通用 (中):** [#28778](https://github.com/ggml-org/llama.cpp/issues/28778) 报告在双 GPU 设置下加载草稿模型进行推测时出现驱动 TDR 重置。

### 6. 对应用开发者的影响
*   **一致性：** 如果您是基于 `server` 或 `cli` 模块进行开发，若集成了 `llama_hparams` 或旧版 `ggml_tensor**` 模式，请注意代码可能会中断；建议迁移到新的基于结构体的输出方式。
*   **智能体工作流：** 关于提示词恢复重试的 [#30997](https://github.com/ggml-org/llama.cpp/pull/30997) 相关工作对共享统一 KV 缓存的高并发智能体至关重要，因为它防止了对提示词不必要的重复处理。
*   **基础设施：** 对于部署在专用硬件（移动端/NPU/Vulkan）的开发者，对子组规约和内存平铺（memory tiling）的关注表明，非 CUDA 后端目前的“开箱即用”性能正在迅速缩小与优化后的 Metal/CUDA 路径之间的差距。预计在下一个小版本中，AMD 和 Intel 独立 GPU 栈的稳定性将有所提升。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 基础设施摘要：2026-10-27

### 1. 今日重点
开发工作目前主要集中在 v2 API 变更后 `OpenCode` 启动体验的稳定性优化，以及针对智能体（Agentic）工作流的长上下文压缩逻辑改进。与此同时，Apple Silicon 后端通过核心 MLX 版本升级获得了重大进展，提升了 Gemma 和 Flint 架构的提示词（Prompt）处理速度。

### 2. 发布与重大变更
*   **v0.40.12-rc0:** 已发布，更新了 MLX 视觉处理并增加了对 DFlash2 的支持 ([PR #19247](https://github.com/ollama/ollama/pull/19247), [PR #19149](https://github.com/ollama/ollama/pull/19149))。
*   **OpenCode v2 集成:** 由于 OpenCode v2 移除了基础命令中的 `--model` 参数，导致 `ollama launch` 出现明显阻碍。相关修复正在处理中 ([PR #19310](https://github.com/ollama/ollama/pull/19310), [PR #19298](https://github.com/ollama/ollama/pull/19298))。

### 3. 新模型与硬件支持
*   **DFlash2:** MLX 后端增加了对 DFlash2 块架构的初始支持 ([PR #19149](https://github.com/ollama/ollama/pull/19149))。
*   **YaRN 缩放:** 改进了 Qwen3/3.5 模型的 RoPE 缩放支持，通过 YaRN 频率实现对扩展上下文窗口的处理 ([PR #19231](https://github.com/ollama/ollama/pull/19231))。

### 4. 性能与优化
*   **MLX 提速:** `mlx` 和 `mlx-c` 的版本升级为 Gemma、Flint 和 Laguna 模型提供了优化的提示词处理能力 ([PR #19291](https://github.com/ollama/ollama/pull/19291))。
*   **Llama.cpp 更新:** 主机后端已更新至 `b11901` ([PR #19311](https://github.com/ollama/ollama/pull/19311))。

### 5. 稳定性与回归问题
*   **Vulkan/RADV 吞吐量 (高):** 有报告称启用主机内存提示词缓存后，第二次请求的生成速度会下降约 30 倍 ([Issue #19201](https://github.com/ollama/ollama/issues/19201))。
*   **Metal 崩溃 (高):** 用户报告在 macOS Metal 上执行复杂推理（如 XML 分析）时，出现间歇性的 500 错误和崩溃 ([Issue #19278](https://github.com/ollama/ollama/issues/19278), [Issue #19293](https://github.com/ollama/ollama/issues/19293))。
*   **工具/解析器问题 (中):** 正在修复 Gemma4 中未闭合的工具调用 JSON 列表 ([PR #19274](https://github.com/ollama/ollama/pull/19274))，以及在处理未知函数时保留工具调用内容的问题 ([PR #19240](https://github.com/ollama/ollama/pull/19240))。

### 6. 对应用开发者的影响
*   **智能体压缩:** 如果你正在构建长期运行的智能体，请关注 PR [#19304](https://github.com/ollama/ollama/pull/19304) 和 [#19309](https://github.com/ollama/ollama/pull/19309)。这些 PR 解决了“压缩”阶段的关键状态保留问题，特别是关于图像省略警告和达到上下文上限时的工具调用持久性问题。
*   **部署配置:** 对于依赖 `ollama launch opencode` 的自动化工作流，预计会出现重大变更。迁移到 v2 API 需要从根命令中移除 `--model` 标志；请参考 PR [#19310](https://github.com/ollama/ollama/pull/19310) 获取标准实现模式。
*   **集成可见性:** **Turno** 和 **NeuronDump** 等新的社区集成正在扩展本地 LLM 生态系统。管理本地模型库的开发者应注意，`ollama show` 现在可以显示 `renderer` 和 `parser` 配置，从而更好地检查自定义 Modelfile 的兼容性。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

## LiteLLM 工程摘要 | 2026-10-27

### 1. 今日重点
今天的开发工作重心在于加强 Proxy 基础设施，对数据库生命周期管理进行了重大重构，并移除了 MCP 等核心功能的“实验性”（experimental）标签。此外，团队正在收紧架构变更和成本跟踪方面的保护机制，以提升企业级部署的稳定性。

### 2. 发布与重大变更
*   **无新发布**：过去 24 小时内无新版本发布。
*   **重构提醒**：MCP 服务器和客户端已从 `_experimental` 命名空间迁移至 `litellm/proxy/mcp_server` 和 `litellm/mcp_client` ([PR #48513](https://github.com/BerriAI/litellm/pull/48513))。虽然保留了弃用的兼容垫片（shim），但用户应尽快规划更新导入路径。
*   **管理后台（Admin UI）**：Admin UI 资源包已从 `_experimental` 迁移至 `litellm/proxy/ui/out/` ([PR #48512](https://github.com/BerriAI/litellm/pull/48512))。

### 3. 新模型与硬件支持
*   **DashScope Realtime**：PR [#40579](https://github.com/BerriAI/litellm/pull/40579) 引入了对 DashScope 实时模型的 WebSocket 支持，将该平台专有的传输格式桥接到 LiteLLM/OpenAI 标准。

### 4. 性能与优化
*   **速率限制器效率**：针对 Redis 操作提出了一项重大性能优化。路由器现在仅会向确实存在活跃限制的范围（scopes）写入令牌计数器，从而减少标准请求中不必要的 Redis I/O ([PR #47521](https://github.com/BerriAI/litellm/pull/47521))。
*   **配额管理**：配额准入中关于“共享媒体测量”的新逻辑正在审核中，旨在防止跨不同模型类型对多模态请求进行重复计数 ([PR #48099](https://github.com/BerriAI/litellm/pull/48099))。

### 5. 稳定性与回归问题
*   **高优先级（回归）**：发现了一个冷支出计数器（cold spend counter）错误，并发请求会导致支出计算出现倍增效应，从而导致过早触发 422 "Budget Exceeded" 错误。修复工作正在进行中 ([PR #47676](https://github.com/BerriAI/litellm/pull/47676))。
*   **回归（Proxy）**：近期对 `GZipBufferedResponseMiddleware` (v1.105.0) 的更改导致流式 SSE 响应头被拦截直到第一个分块到达，这破坏了某些 MCP 流式端点。修复状态：[已关闭/已合并](https://github.com/BerriAI/litellm/pull/46659)。
*   **Bug（超时）**：解决了当上游在接收到第一个字节后保持静默时，`request_timeout` 无法触发的持久性问题 ([Issue #38358](https://github.com/BerriAI/litellm/issues/38358))。

### 6. 对应用开发者的影响
*   **成本准确性**：如果您依赖上游提供商提供的 `usage.cost`，LiteLLM 正在确保这些成本能在每一条路径（流式和非流式）上被计费。请确保您的成本监控已针对此变更做好准备 ([PR #48287](https://github.com/BerriAI/litellm/pull/48287))。
*   **可靠性**：如果您正在使用数据库运行 LiteLLM，请期待 [PR #48506](https://github.com/BerriAI/litellm/pull/48506) 重构后的服务生命周期更加清晰，该重构统一了数据库关闭的所有权，以防止重新部署期间出现连接泄露。
*   **Anthropic 工具支持**：如果您启用了 Anthropic 模型的“扩展思考”（extended thinking）功能，请注意，手动操作上下文清除编辑会导致重试期间出现 400 错误；在 [PR #48514](https://github.com/BerriAI/litellm/pull/48514) 实现之前，请避免对 `thinking` 参数进行自定义手动编辑。

---

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

## Unsloth 基础设施摘要：2026-10-27

### 1. 今日亮点
Unsloth 发布了 **v0.1.911-beta** 版本，持续加大在多模态推理领域的投入。该版本引入了定时任务执行功能，并新增了对 MiniMax-M3.1-Flash 模型架构的支持。目前的开发重心主要集中在提升“Studio”后端的稳定性，特别是优化原生缓存写入期间的显存（VRAM）回收，并解决混合 GPU 环境下复杂的内存锁定（memory-pinning）回归问题。

### 2. 版本发布与重大变更
*   **[v0.1.911-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.911-beta)**：引入了本地/API 模型的定时提示词（prompt）执行功能、对 FLUX-3 编辑的支持，并在 Mac 平台上实现了显著的性能提升。

### 3. 新模型与硬件支持
*   **MiniMax-M3.1-Flash**: 增加了对 M3.1-Flash 架构的支持。注意：用户反馈称，即便开启了全层卸载（full layer offloading），Apple Silicon 上仍会出现 NVFP4 CPU 回退问题（[Issue #15409](https://github.com/unslothai/unsloth/issues/15409)）。
*   **混合硬件**: 在运行 Nvidia/AMD 混合显卡的 Linux 系统上，AMD GPU 的检测失败报告有所增加（[Issue #15444](https://github.com/unslothai/unsloth/issues/15444)）。

### 4. 性能与优化
*   **显存回收**: PR [#15461](https://github.com/unslothai/unsloth/pull/15461) 引入了一种在原生缓存写入期间的实时权重读取机制，防止张量在卸载时占用不必要的内存。
*   **Diffusion 与量化**: PR [#15456](https://github.com/unslothai/unsloth/pull/15456) 修复了一个回归问题，即编译后的 W8A8 线性层内存峰值超过了即时（eager）模式的峰值；该修复确保了与即时模式性能的一致性。
*   **注意力算子（Attention Kernels）**: PR [#15410](https://github.com/unslothai/unsloth/pull/15410) 确保了路由至 xformers 的打包 fp32 行在 sm_100+ 硬件（如 B200）上保持一致的输出类型，防止了意外的向下转型。

### 5. 稳定性与回归问题
*   **高严重性（内存泄漏/崩溃）**: 
    *   [Issue #14487](https://github.com/unslothai/unsloth/issues/14487)：桌面应用程序存在累积内存泄漏报告（每次使用约 200-400MB）。
    *   [Issue #15260](https://github.com/unslothai/unsloth/issues/15260)：因 AT-SPI 冲突，导致 Linux (KDE Plasma) 环境下 WebKitWebProcess 出现 SIGABRT 崩溃。
*   **中严重性（正确性）**: 
    *   [Issue #15285](https://github.com/unslothai/unsloth/issues/15285)：DeepSeek V4.1 Flash 聊天模板问题，图像标记导致对话历史记录中断。
    *   [Issue #15417](https://github.com/unslothai/unsloth/issues/15417)：Anthropic API 透传在上下文溢出时未能触发自动压缩，导致返回 400 错误。
*   **修复进展**: PR [#15457](https://github.com/unslothai/unsloth/pull/15457) 解决了 FIFO 公平性测试中的竞态条件，PR [#15454](https://github.com/unslothai/unsloth/pull/15454) 修复了 CI/测试套件的回归问题。

### 6. 对应用开发者的影响
*   **智能体可靠性**: 如果你正在使用浏览器工具构建智能体，请注意当前的实现仅支持基于视口的截图（[Issue #15448](https://github.com/unslothai/unsloth/issues/15448)），且无法访问内部 Studio 上下文之外的用户已打开标签页（[Issue #15447](https://github.com/unslothai/unsloth/issues/15447)）。
*   **API 稳定性**: 在部署微调模型时，请确保应用程序逻辑显式通过 ID 处理模型加载，因为在向最新 Studio 版本过渡的过程中，如果注册表查找失败，“按名称聊天（chat-by-name）”逻辑可能会错误地回退到基准模型（[PR #15449](https://github.com/unslothai/unsloth/pull/15449)）。
*   **资源管理**: 在自动化环境中运行 Unsloth Studio 的开发者，需考虑到新的 Node.js 24.22.1 版本锁定要求（[PR #15423](https://github.com/unslothai/unsloth/pull/15423)）。

</details>

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*