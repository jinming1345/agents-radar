# AI 基础设施日报 2026-11-12

> 生成时间: 2026-11-12 01:38 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

### **AI 基础设施生态报告：2026-11-12**

#### **1. 生态概览**
当前的 AI 基础设施领域呈现出两条清晰的分叉路线：一是以多租户、高吞吐推理（vLLM, SGLang）为核心的极致性能优化；二是针对自主智能体（Autonomous Agents）的边缘/本地化部署（llama.cpp, Ollama, Unsloth）。硬件多元化进程正在加速，大量工程资源正投入到 NPU 架构（Ascend, AMD）的内核移植以及向 FP8/MXFP4 等统一量化格式的迁移中。与此同时，抽象层正在加厚，LiteLLM 已从简单的代理（proxy）转向复杂的企业级治理与可观测性，这标志着“生产级 AI”技术栈正趋于成熟。

#### **2. 活动对比**

| 项目 | Active Issue 数量 | PR 活跃度 | 发布状态 |
| :--- | :--- | :--- | :--- |
| **vLLM** | 极高 | 极高 | 追踪 v0.32.0-dev |
| **SGLang** | 高 | 高 | 追踪 v0.5.23 |
| **llama.cpp** | 中 | 极高 | 快速迭代 b12274-b12292 |
| **Ollama** | 中 | 中 | 无近期发布 |
| **LiteLLM** | 中等 | 高 | v1.108.6 (安全性) |
| **Unsloth** | 高 | 高 | v0.1.917-beta |

#### **3. 模型支持竞赛**
*   **前沿领跑者：** **SGLang** 在高端模型集成方面处于领先地位，特别是针对 Kimi-K3.1 和 Blackwell/SM12x 的部署。**vLLM** 正专注于 Qwen 系列及专用多语言 ASR 模型的深度集成。
*   **新兴标准：** **llama.cpp** 和 **Unsloth** 正在快速规范对最新“推理导向”模型（Qwen 3.8B/27B）和扩散模型（DiffusionGemma）的支持，其重点在于更广泛的硬件兼容性，而非纯粹的吞吐量。
*   **关键洞察：** 支持工作的重心已从单纯的“加载”模型转向“服务特定能力”——即 MoE 路由和投机采样（speculative decoding）验证。

#### **4. 性能前沿**
优化方向根据目标环境分为两类：
*   **推理引擎 (vLLM/SGLang)：** 重点在于**内存管理**（用于循环状态/KV-cache 的统一内存池）和**内核现代化**。行业正从定制化的内核库（如 Marlin）转向统一的抽象层（如 Humming，FlashAttention-3 独立轮子包）。
*   **本地运行时 (llama.cpp/Ollama)：** 优先级是**降低显存占用**，主要手段是通过原生 FP8 KV-cache 以及针对小批量投机采样的优化矩阵乘法内核；这是目前消费级/边缘硅片降低延迟的主要方案。
*   **分布式服务：** 在解决存算分离架构的同步 Bug 方面进展显著，表明多节点推理正逐渐成为标准需求，而非边缘场景。

#### **5. 层级定位**
*   **推理/服务引擎 (vLLM, SGLang)：** 面向数据中心，为高并发和高吞吐量而优化；目前在处理前缀缓存（prefix caching）和 MoE 路由等复杂功能相关的回归问题上存在挑战。
*   **本地运行时/边缘 (llama.cpp, Ollama, Unsloth)：** 专注于开发者体验和硬件民主化；目前优先考虑本地工具调用（tool-calling）和内存高效的上下文窗口管理等“智能体”能力。
*   **网关/治理 (LiteLLM)：** 处于抽象层，专注于安全性、预算控制和可观测性。它正向上层演进，以解决 LLM 运维中的“隐藏成本”问题。

#### **6. 趋势信号**
*   **“NPU 转型”：** 所有项目都在协同推进 NPU 支持。应用开发者应为未来做好准备：推理的瓶颈将不再受限于 GPU 的可用性，而是受限于 NPU 的内存及功耗管理策略。
*   **智能体的不稳定性：** “工具调用”相关的 Bug（JSON 解析、上下文长度管理）显著增加。随着智能体变得愈发复杂，基础设施表现出局限性——它们最初是为聊天（Chat，文本输入输出）构建的，现在难以维持结构化、多步骤智能体输出的可靠性。
*   **统一量化：** 行业正在向 FP8 和 8-bit 以下格式（MXFP）收敛，并将其作为生产推理的新标准。基础设施团队应优先选择支持这些原生格式的硬件，因为传统的 INT4/INT8 路径正逐渐沦为二等优化方案。
*   **建议：** 对于生产环境的应用开发者，**请锁定你的引擎版本**。当前内核级重构（如 Humming、FA3 解耦）的高频迭代，使得高上下文或多租户工作流出现性能回归和内存损坏的风险高于往常。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 工程摘要：2026-11-12

### 1. 今日重点
开发工作正高度集中于完善大规模部署基元，特别是关于 **KV-cache 卸载 (offloading)** 和 **分布式引擎同步** 的功能。目前投入了大量精力来稳定专用硬件路径（ROCm/NPU），并完成了量化内核从 Marlin 到统一的 "Humming" 架构的迁移工作。

### 2. 版本发布与重大变更
*   **过去 24 小时内无新版本发布**。用户目前主要追踪 v0.32.0-dev 的各个构建版本。

### 3. 新模型与硬件支持
*   **NVIDIA Nemotron 3.5 ASR Streaming：** 已收到对该 600M 多语言 ASR 模型提供支持的请求（[Issue #47455](https://github.com/vllm-project/vllm/issues/47455)）。
*   **Intel XPU/LoRA：** PR #62807 引入了对非量化 (BF16) MoE LoRA 适配器的支持，通过将其路由至 `XpuFusedMoe` 实现（[PR #62807](https://github.com/vllm-project/vllm/pull/62807)）。
*   **Ascend NPU：** 修复了异步 EPLB worker 初始化的问题，以确保 NPU 硬件上的设备索引正确（[PR #66376](https://github.com/vllm-project/vllm/pull/66376)）。

### 4. 性能与优化
*   **量化 (Humming)：** 一项主要的跟踪计划正在进行中，旨在以 "Humming" 取代传统的 Marlin 内核，从而为 Hopper 和 Blackwell 架构上的 FP8、MXFP4/6/8 和 INT4/8 格式提供统一覆盖（[Issue #65560](https://github.com/vllm-project/vllm/issues/65560)）。
*   **PTX 优化：** 采用 CUDA 13.4.0 的新指令 `ldmatrix.s8.s4`，以支持打包后的 INT4 到 INT8 加载时的实时符号扩展，旨在提升 W4A8 性能（[Issue #49529](https://github.com/vllm-project/vllm/issues/49529)）。
*   **推理性解码 (Speculative Decoding)：** 新 PR 在目标 logit 加载期间添加了 top-k/top-p 截断，以减少验证过程中的计算开销（[PR #66534](https://github.com/vllm-project/vllm/pull/66534)）。
*   **MoE 路由：** 引入了通用的融合门控接口，以统一 DeepSeek V4/V4.1 等模型的路由后端（[PR #65290](https://github.com/vllm-project/vllm/pull/65290)）。

### 5. 稳定性与回归
*   **高 (崩溃)：** 使用流水线并行 (PP=3) 的 Qwen3.8-27B (GDN 混合架构) 在使用前缀缓存 (prefix caching) 时会遭受非法内存访问 (Xid 31)（[Issue #63505](https://github.com/vllm-project/vllm/issues/63505)）。
*   **高 (崩溃)：** Qwen3.5 FP8 在 H200 上进行 CUDA 图捕获时，因非法内存访问导致崩溃（[Issue #49311](https://github.com/vllm-project/vllm/issues/49311)）。
*   **中 (正确性)：** 利用 `rank_pattern` 或 `alpha_pattern` 的 LoRA 适配器目前提供的缩放因子不正确（[Issue #59799](https://github.com/vllm-project/vllm/issues/59799)）。
*   **中 (性能)：** 增量去标记化 (Incremental detokenization) 在处理畸形的 UTF-8 时可能触发二次方复杂度，从而可能导致 API 服务器事件循环卡死（[Issue #63667](https://github.com/vllm-project/vllm/issues/63667)）。

### 6. 对应用开发者的影响
*   **运营风险：** 如果您正在运行带有前缀缓存或 H200 特定配置的 Qwen 系列模型，请监控日志中是否有“非法内存访问 (illegal memory access)”错误，因为这些是最新 dev 分支中存在的活跃回归向量。
*   **量化策略：** 如果您依赖自定义 MoE 模型，请注意从 Marlin 到 Humming 内核的迁移。随着基础设施向该统一内核库迁移，未来的更新可能会带来潜在的性能变化。
*   **分布式架构：** 对于那些基于 `NixlConnector` 或复杂解耦 (disaggregated) 设置进行构建的开发者，请密切关注关于 KV-offload 事件路径和引擎 ID 同步的公开 Issue——这些组件目前正在进行重构，以支持多节点环境下的可靠性。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 摘要：2026-11-12

### 今日亮点
SGLang 目前的开发重点在于稳定对 Kimi-K3.1 的支持，并完善针对 Blackwell (SM12x) 和 AMD 硬件的跨平台性能。内存管理方面正在进行重大的架构调整，新的“统一内存”（Unified Memory）路线图旨在实现 KV 池与循环状态缓存之间的资源动态共享。

### 发布与重大变更
*   **无：** 过去 24 小时内未发布任何新版本。用户目前主要针对 `v0.5.23` 版本进行问题追踪。

### 新模型与硬件支持
*   **Kimi-K3.1 支持：** 正在积极集成 `KimiK31ForConditionalGeneration`，包括支持带有解码上下文并行（decode context parallelism）、PD 分离（PD disaggregation）和 DFlash 推测解码的 DSA ([PR #48414](https://github.com/sgl-project/sglang/pull/48414))。
*   **昇腾（Ascend）NPU：** PR [#48420](https://github.com/sgl-project/sglang/pull/48420) 增加了在昇腾 NPU 上对 Kimi-K3.1 的支持，专门针对稀疏 DSA 注意力路径进行了适配。
*   **SM12x 优化：** 已开始初步工作，旨在将 FlashInfer cuTile NVFP4 MoE 作为 SM12x (RTX 50xx/Blackwell) 架构的默认运行器 ([Issue #49123](https://github.com/sgl-project/sglang/issues/49123))。

### 性能与优化
*   **Radix Cache：** 正在进行一项性能改进，旨在优化 Rust `TreeCore` 的驱逐机制；在遍历过程中保留完整的设备驱逐队列，以避免在高压场景下出现冗余的 O(N) 重建 ([PR #49974](https://github.com/sgl-project/sglang/pull/49974))。
*   **AMD 性能：**
    *   针对 MI355X (gfx950) 上的 Muse Spark 进行优化，涉及 FlyDSL 内核调优 ([PR #49704](https://github.com/sgl-project/sglang/pull/49704))。
    *   为 gfx942 新增融合 AR + RMSNorm + FP8 量化内核 ([PR #49884](https://github.com/sgl-project/sglang/pull/49884))。
*   **内核解耦：** 为提高发布灵活性，FlashAttention-3 正从 `sglang-kernel` 中移出，成为独立的 `sgl-fa3` wheel ([PR #49972](https://github.com/sgl-project/sglang/pull/49972))。

### 稳定性与回归
*   **[高优先级] 解码回归 (SM90)：** 用户报告在 DeepSeek-V4.1 上使用推测解码时，每步解码存在 33–45% 的性能下降 (v0.5.22 → v0.5.23)；此外，`use_deep_select_decode` 导致了意料之外的开销 ([Issue #49336](https://github.com/sgl-project/sglang/issues/49336))。
*   **[中优先级] 状态损坏：** GLM-5.3-Flash 在处理 1M token 请求后出现引擎状态损坏，导致 MTP 接受率降至 0 ([Issue #48964](https://github.com/sgl-project/sglang/issues/48964))。
*   **[中优先级] Token 泄露：** 在多 Tokenizer 模式下，由于重复的 `rid` 状态合并，发现存在潜在的跨客户端 Token 泄露问题 ([Issue #49903](https://github.com/sgl-project/sglang/issues/49903))。
*   **CI 不稳定性：** 正在持续解决测试不稳定和基础设施故障问题，目前通过自动化的监控工作流进行追踪 ([Issue #42752](https://github.com/sgl-project/sglang/issues/42752))。

### 对应用开发者的影响
*   **智能体（Agentic）工作负载：** 对“统一内存”的推进 ([Issue #49944](https://github.com/sgl-project/sglang/issues/49944)) 对于使用混合架构（如 Mamba/Linear Attention + KV cache）的智能体至关重要。开发者应密切关注，因为这最终将无需再手动调整循环状态与标准 KV 缓存之间的内存分配。
*   **稳定性警告：** 如果您在 Hopper (SM90) 上运行高并发推测解码，或正在使用 GLM-5.3-Flash，强烈建议将环境锁定在 `v0.5.22`，直到当前的回归问题（特别是 #49336 和 #48964）得到解决。
*   **多租户：** 如果您的应用在多租户环境中使用 SGLang 并涉及不同的 Tokenizer 或 MCP 会话，请注意目前正在调查中的会话/Token 状态复用问题 ([#49903](https://github.com/sgl-project/sglang/issues/49903), [#49901](https://github.com/sgl-project/sglang/issues/49901))。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 摘要：2026-11-12

### 1. 今日重点
本次更新的核心在于提升量化模型的高吞吐推理能力，特别是引入了 **FP8 KV-cache 支持** 以及针对投机采样（speculative decoding）优化的 CUDA 内核。基础设施稳定性依然是优先级事项，其中包含多项改进 `llama-server` 安全性的 PR，以及对 Web UI 进行模块化重构以提升可维护性。

### 2. 发布与重大变更
*   **版本 b12274 - b12292：** 快速迭代的一系列更新，重点在于后端加固以及多模态和投机采样工作流的功能对齐。
*   **重大/行为变更：** Web UI 已重构至 `ui/` 目录下并进行了内部模块化；下游集成应确保路径更新，以适配新的 `ui/apps/chat` 和 `ui/lib` 结构 (#32032, #32118)。

### 3. 新模型与硬件支持
*   **FP8 KV-Cache：** 增加了原生的 FP8 KV-cache 支持 (#28392)，可在长上下文推理期间显著降低显存占用。
*   **CUDA FP8：** CUDA 引入了初始的 OCP FP8 支持，为兼容硬件启用了 W8A16 量化路径 (#28413)。
*   **Adreno 支持：** 为 Adreno GPU 添加了分解式 Flash Attention (FA) 内核，以规避融合内核（fused kernels）的资源限制 (#32046)。

### 4. 性能与优化
*   **CUDA 投机采样：** 针对量化权重（2–24 列）优化了全新的矩阵乘法内核，专为投机采样中常见的小 Batch Size 设计，解决了草稿模型验证过程中的延迟问题 (#31533)。
*   **内存效率：** 新 PR 旨在通过避免初始化未使用的图元数据页来降低宿主内存开销，对于高上下文（64k+）工作负载有显著的节省潜力 (#32043)。
*   **Vulkan KV-Cache：** 利用 `coopmat2` 启发式算法启用了 Vulkan 的反量化 KV 优化，提升了支持设备上的性能 (#31526)。
*   **后端吞吐量：** 针对低行数 BF16 矩阵（例如 Qwen 系列的超投影层）的 CUDA 优化，提升了小 Batch Size 下的 SM 利用率 (#31959)。

### 5. 稳定性与回归
*   **投机采样（高优先级）：** 原始推理与投机采样在贪婪搜索输出上的差异仍然是一个待解决问题 (#25618)。
*   **Server/Router 内存（中优先级）：** 当前的路由实现未在模型拟合评估中计入草稿模型的内存需求，导致在多模型部署场景下可能出现 OOM (#31351)。
*   **HIP/ROCm 回归：** 受近期调度器变更影响，`gfx906` 硬件上的 MoE 提示词处理性能出现退化（约 15–50%） (#31599)。
*   **正确性：** 修复了 SYCL `CLAMP` 步长视图（strided view）支持 (#31784)，以及 ARM/M4 架构下 CPU F16 点积可能出现的溢出问题 (#31734)。

### 6. 对应用开发者的影响
*   **部署安全：** 在非本地环回地址运行 `llama-server` 的开发者，现在由于更严格的源站和 CORS 验证，必须通过 `--allow-unauthenticated-tools` 显式开启工具或 MCP 等功能 (#32113, #32115)。
*   **工具/智能体编排：** 使用 `x-tool-runtime` 时，请确保部署工作流与新的服务端覆盖逻辑一致，即 `--tools-runtime` 标志具有更高优先级 (#32119)。
*   **显存管理：** 随着 FP8 KV-cache 支持的引入，如果你的智能体需要极长的上下文窗口，建议测试 `FP8` 量化路径，这将显著降低每个 Token 的显存消耗基准。
*   **UI 集成：** 如果你嵌入了 `llama.cpp` 的 Web UI，请注意其已更名为“Llama Chat”并调整了文件结构，这将需要更新你的构建/部署流水线 (#32032)。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 基础设施摘要：2026-11-12

### 1. 今日亮点
本周期的工作重点集中在多请求推理优化和 VRAM 管理上。推测解码（speculative decoding）效率方面取得了显著进展，并解决了长期以来影响多模型服务场景的内存计数问题。

### 2. 发布与重大变更
*   **过去 24 小时内无新版本发布**。

### 3. 新模型与硬件支持
*   **Windows iGPU 内存管理：** PR [#19636](https://github.com/ollama/ollama/pull/19636) 针对 AMD Strix Halo iGPU 上的内存分配失败问题进行了修复，通过将模型权重保留在非固定主机内存（pinned host memory）之外，确保占用超过系统内存 50% 的模型能够正确初始化。

### 4. 性能与优化
*   **批量推测验证：** PR [#19663](https://github.com/ollama/ollama/pull/19663) 实现了在请求重叠期间持续进行推测性草稿生成。此前，在多请求生成过程中草稿生成会被禁用，这限制了 MTP 和 DFlash 模型的效用。
*   **推测解码指标：** PR [#19368](https://github.com/ollama/ollama/pull/19368) 增加了推测解码的可观测性，通过 API 和 `--verbose` 输出暴露已接受与已草拟的 Token 计数，允许开发者针对特定硬件调整草稿深度（draft-depth）。
*   **VRAM 计数修复：** PR [#19632](https://github.com/ollama/ollama/pull/19632) 修复了 GPU 分割和 VRAM 计数中的关键错误，解决了不正确的模型驱逐和跨 GPU 模型分布不合理的问题。
*   **Embedding 吞吐量：** PR [#18397](https://github.com/ollama/ollama/pull/18397) 通过启用之前被禁用的 HTTP 连接复用，旨在提高高频 `/api/embed` 工作负载的性能。

### 5. 稳定性与回归
*   **Vulkan/AMD 访问违例（严重）：** Issue [#18557](https://github.com/ollama/ollama/issue/18557) 仍然开启；用户报告在通过 Vulkan 加载 AMD RX 6800 XT 上的模型时会触发 `0xc0000005` (访问违例) 错误。
*   **macOS 更新循环（中等）：** Issue [#19472](https://github.com/ollama/ollama/issue/19472) 报告了 macOS 应用更新流程的故障，即应用尽管已处于目标版本，仍会反复提示“重启以更新”。
*   **工具调用解析器错误（中等）：** Issue [#19650](https://github.com/ollama/ollama/issue/19650) 指出了 `mimo-v2.6` 模型中的解析失败问题，其中 `<function>` 块内的 JSON 格式参数被错误地返回为空对象。

### 6. 对应用开发者的意义
*   **Claude Desktop 集成：** Ollama 正在正式确立其作为外部桌面应用本地网关的角色。PR [#19657](https://github.com/ollama/ollama/pull/19657) 将 Claude Desktop 网关迁移至标准的 Ollama 监听器，简化了本地代理的部署。
*   **改进的 Agent 上下文：** PR [#17058](https://github.com/ollama/ollama/pull/17058) 帮助启动器区分模型架构限制和服务限制，这对于在构建具有严格 Token 约束的 Agent 时防止出现“未知本地上下文（unknown local context）”警告至关重要。
*   **工具调用的脆弱性：** 如果您正在构建依赖特定工具调用解析（例如 `qwen3.5` 变体）的 Agent 工作流，请注意模型在直接将 JSON 注入标签而非遵循严格参数模式时可能会出现不一致的情况；请关注 [Issue #19650](https://github.com/ollama/ollama/issue/19650)。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 摘要：2026-11-12

### 1. 今日要点
LiteLLM 正重点关注可观测性与治理功能，推出了全新的告警框架，可直接在管理界面（Admin UI）监控性能和模型弃用情况。开发工作也正着力于加固企业级功能，包括 SCIM 错误处理以及优化预算重置逻辑，以防止任务重试期间的数据丢失。

### 2. 版本发布与重大变更
*   **v1.108.6 & v1.106.9：** 这些版本将安全性置于首位，强制要求通过 `cosign` 进行 Docker 镜像签名验证。建议用户使用 [commit `e82a3c6`](https://github.com/BerriAI/litellm/commit/e82a3c646908ba0a6ee0beddc4310d7a6cac4065) 中提供的公钥验证部署。

### 3. 新模型与硬件支持
*   **Gemini Decisions API：** 在模型目录中添加了对 `gemini-decision-1` 的支持，能够以每 100 万输入 token $0.10 的价格为此特定 API 模型进行成本跟踪 ([PR #51215](https://github.com/BerriAI/litellm/pull/51215))。
*   **GPT-5 系列：** 更新了路由逻辑，将 `chat-latest` 和 `gpt-chat-latest` 视为 `gpt-5` 系列模型，以确保正确处理推理投入（reasoning effort）和 token 限制 ([PR #51151](https://github.com/BerriAI/litellm/pull/51151))。

### 4. 性能与优化
*   **健康检查优化：** 更新了针对图像/视频生成的后台健康检查，以避免不必要的计费调用，防止空闲部署产生意外成本 ([PR #49244](https://github.com/BerriAI/litellm/pull/49244))。
*   **监控限制：** 默认启用性能监控，并采用新的分级结构：非企业级网关享有 5 个免费告警，企业实例则享有无限制告警 ([PR #51123](https://github.com/BerriAI/litellm/pull/51123))。

### 5. 稳定性与回归问题
*   **紧急 (LLM 翻译)：** `/v1/messages` 适配器存在持续问题，导致 DeepSeek-R1 等模型的 `reasoning_content` 编码错误，引发客户端流式传输失败 ([Issue #32357](https://github.com/BerriAI/litellm/issues/32357))。
*   **高危 (速率限制器)：** v3 Redis 速率限制中的一个 Bug 导致 TPM 计数器超期存留，从而导致密钥/团队过早出现 429 错误 ([Issue #49675](https://github.com/BerriAI/litellm/issues/49675))。
*   **高危 (MCP)：** v1.108.0 中的性能回归导致使用旧版 MCP SDK 通知协议的客户端在调用 `tools/list` 时出现 18–50 秒的阻塞 ([Issue #50065](https://github.com/BerriAI/litellm/issues/50065))。
*   **中危 (治理)：** 正在修复一个逻辑问题，确保预算重置时不会在任务重试期间丢弃已支出金额，防止财务跟踪出现缺失 ([PR #51143](https://github.com/BerriAI/litellm/pull/51143))。

### 6. 对应用开发者的影响
*   **企业集成：** 如果您正在通过 SCIM 管理用户/团队配置，请确保您的错误处理逻辑已适配符合 RFC 7644 标准的新错误架构 ([PR #51322](https://github.com/BerriAI/litellm/pull/51322))。
*   **工具调用 (Tool Calling)：** 如果您正在使用自定义提供程序（例如 `nano-gpt`），请注意旧版本会剔除新模型或未映射模型的工具定义；请确保更新至最新补丁以恢复函数调用功能 ([PR #48180](https://github.com/BerriAI/litellm/pull/48180))。
*   **智能体可观测性：** 资源详情页面（密钥、团队、模型）新增的“Activity”（活动）标签页大大简化了调试用量激增的过程，无需再查询外部监控工具 ([PR #50630](https://github.com/BerriAI/litellm/pull/50630))。

---

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

## Unsloth 基础设施简报：2026-11-12

### 1. 今日重点
Unsloth 生态系统目前正全力推进 **AMD NPU 集成**，包含一系列旨在提升 Unsloth Studio 内 NPU 模型管理、电源模式以及动态上下文缩放功能的 PR。与此同时，团队正在大力加固 Studio 的 UI/UX，重点优化会话处理的健壮性、改进模型加载反馈，并修复高参数模型导致的内存相关崩溃问题。

### 2. 发布与重大变更
*   **v0.1.917-beta**：引入了 **Dynamic v3.1 GGUFs** 并全面支持 **Qwen3.8-27B**。此版本包含对 Thinking UI 的结构性更新以及改进后的代码块渲染。 [发布详情](https://github.com/unslothai/unsloth)

### 3. 新模型与硬件支持
*   **AMD NPU (FastFlowLM/Lemonade)**：NPU 硬件支持取得重大进展。PR #17510、#17511、#17508 和 #17535 共同启用了电源管理、基于可用内存（而非固定的 8K token）的动态上下文大小调整，以及驻留 NPU 模型的实时集成监控。
*   **模型兼容性**： 
    *   [Issue #17552](https://github.com/unslothai/unsloth/issues/17552)：请求支持 **Kromoss-GGUF** (MOSS-Image 衍生版)。
    *   [PR #17563](https://github.com/unslothai/unsloth/pull/17563)：针对 **MiniMax-H3-Image** 下载的修复，专门解决了 <48GB 显存配置下的 FP8/INT8 精度和 OOM 问题。

### 4. 性能与优化
*   **动态内存缩放**：[PR #17511](https://github.com/unslothai/unsloth/pull/17511) 实现了 NPU 上下文窗口的自动缩放，预留 2 GiB 的冗余空间并使用动态分配来最大化可用 RAM——这是对静态 token 限制的一项关键改进。
*   **Prompt/工具效率**：[PR #17554](https://github.com/unslothai/unsloth/pull/17554) 和 [PR #17553](https://github.com/unslothai/unsloth/pull/17553) 优化了 Deep Research 和工具调用 Prompt 的长度，以适配后端上下文上限，防止长时任务期间出现“请求超出上下文”错误。

### 5. 稳定性与回归问题
*   **高优先级 (DiffusionGemma/UI 不匹配)**：[Issue #17558](https://github.com/unslothai/unsloth/issues/17558) 和 [PR #17566](https://github.com/unslothai/unsloth/pull/17566) 指出 DiffusionGemma 会忽略 UI 中选择的并行度/上下文设置，即便 UI 显示不同，仍默认使用 4096 tokens。**修复工作正在通过 #17566 进行中。**
*   **高优先级 (聊天会话损坏)**：[PR #17550](https://github.com/unslothai/unsloth/pull/17550) 增强了导入时受损会话文件的韧性，防止进程彻底崩溃。
*   **中优先级 (Docker 标签)**：[Issue #17470](https://github.com/unslothai/unsloth/issues/17470) 报告称 Unsloth Docker 标签目前是非确定性的/未对齐的，导致难以拉取特定的近期版本。

### 6. 对应用程序开发者的影响
*   **Agent 可靠性**：如果您正在使用 Unsloth Studio 运行自主智能体，**PR #17541** 至关重要；即使函数是通过 `map` 或 `threading` 间接调用，它也会强制要求用户明确批准破坏性文件系统操作（如 `os.remove`）。
*   **基础设施集成**：计划将 Unsloth 集成到 VS Code 的开发者应追踪 [Issue #10340](https://github.com/unslothai/unsloth/issues/10340)，该 Issue 旨在提供原生的 `vscode.lm` 提供程序支持。
*   **上下文管理**：请停止在自定义连接中硬编码最大 token 限制。项目正转向基于服务器通告的上下文窗口进行动态推理；请利用即将推出的 API 变更，让后端自动决定限制，以避免运行时错误（参考 [Issue #17444](https://github.com/unslothai/unsloth/issues/17444)）。

</details>

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*