# AI 基础设施日报 2026-10-28

> 生成时间: 2026-10-28 01:32 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# AI 基础设施生态分析 (2026-10-28)

### 1. 生态概览
目前的 AI 基础设施领域主要由“稳定与规模化”的需求所主导。核心工作重心正转向优化 Blackwell (SM120) 架构的推理栈，并致力于使推测解码（speculative decoding）流水线走向成熟。在底层内核性能调优（vLLM/SGLang）与高层应用集成（llama.cpp/LiteLLM）之间，出现了一条显著的鸿沟，后者正在激进地采用多模态、Agent（智能体）以及“具备推理意识（reasoning-aware）”的基元。随着模型参数规模和专家混合模型（MoE）复杂度的增加，整个生态正在将内存效率和多租户管理置于单纯的功能扩展之上。

### 2. 活跃度对比
*注：数值代表基于 24 小时活跃量的代表性数据。*

| 项目 | 活跃度 (PR/Issue) | 发布状态 | 主要重心 |
| :--- | :--- | :--- | :--- |
| **vLLM** | 极高 | 稳定（修复中） | Blackwell/ROCm 内核稳定性 |
| **SGLang** | 高 | 稳定（优化中） | PD-Disaggregation（预填充-解码分离）及 Hopper 优化 |
| **llama.cpp** | 高 | 活跃 (b11944) | LiquidAI LFM3 及推理效能（reasoning-effort） |
| **Ollama** | 中等 | RC (0.40.12) | Apple Silicon 及 Windows/CUDA 可靠性 |
| **LiteLLM** | 中等 | 快速 (v1.109.x) | 企业级成本追踪及 FIPS 合规性 |
| **Unsloth** | 低 | 停滞 | N/A |

### 3. 模型支持竞赛
*   **LiquidAI LFM3 (音频/Omni/VL/决策):** **llama.cpp** 和 **Ollama** 取得了决定性领先，确立了其作为新兴“全能（omni）”架构快速部署的首选目标地位。
*   **DeepSeek-V4.1-Flash:** 高吞吐服务部署的角逐点；**vLLM** 专注于低延迟内核确定性（MXFP8），而 **SGLang** 则在优化 block-FP8 的内存使用。
*   **企业级/垂直领域 (Kimi-K3, GLM-5.3, Nemotron):** **SGLang** 在 NPU（昇腾）和超大规模稠密模型的多节点优化方面保持领先；而 **LiteLLM** 则通过快速集成定价和遥测支持，推动了这些模型的商业化应用。

### 4. 性能前沿
优化工作目前分为两个方向：
*   **内核与硬件层面:** vLLM 和 SGLang 深入布局 **Hopper (SM90/SM120)** 和 **ROCm (gfx942/950)**。核心战术包括：通过 GPU 端网格生成（grid generation）消除 CPU 瓶颈、MXFP8/FP4 GEMM 内核定制化，以及 Gated DeltaNet (GDN) 内核的调优。
*   **系统与运行时层面:** llama.cpp 和 Ollama 优先考虑 **MoE 缓存策略**（例如 `ClassLRU`）和 **服务端内存管理**（动态卸载）。向“推理感知（reasoning-aware）”采样（按 Token 调整计算资源消耗）的转型，代表了管理 Agent 延迟的新前沿。

### 5. 层级定位
*   **推理引擎 (vLLM, SGLang):** 深层基础设施。聚焦硬件特定内核、批处理策略（PD-Disaggregation）及高并发生产部署。
*   **本地运行时 (llama.cpp, Ollama):** 端到云的灵活性。聚焦设备无关的可移植性、多模态集成（语音/视频）及对开发者友好的本地编排。
*   **网关/代理 (LiteLLM):** 编排层。聚焦成本追踪、安全性（FIPS 模式）、可观测性，以及为企业应用标准化异构模型 API。

### 6. 趋势信号
*   **推理效能（Reasoning Effort）即 API:** 服务端 API（llama.cpp）中可配置“思考”深度的出现，表明推理智能体很快将需要标准接口，以动态权衡延迟与准确性。
*   **PD-Disaggregation 成为默认:** 运维人员应将 Prefill-Decode 分离视为生产服务的行业新标准；旧配置方案正在 SGLang 和 vLLM 中被迅速弃用。
*   **多模态实时化:** 端到端音视频功能（LFM3）整合进本地运行时，标志着低延迟语音智能体正从研究课题转向标准基础设施支持。
*   **开发者提醒:** 请监控 `MooncakeStoreConnector` (vLLM) 和 `flashinfer` 的稳定性报告；量化内核中的内存损坏和静默精度下降，是目前生产部署中风险最高的问题。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 技术摘要 - 2026-10-28

### 1. 今日重点
开发工作的核心仍集中在针对 Blackwell (SM120) 和 ROCm (MI355X) 架构优化 **DeepSeek-V4.1-Flash** 的性能。目前的工程重点在于稳定 KV cache 连接器、修复混合模型（Gemma 3/4）的 LoRA 元数据绑定问题，以及完善 Attention 后端测试套件，以解决组件间的接口契约冲突。

### 2. 版本发布与重大变更
*   **过去24小时无新版本发布**。维护人员目前正在处理大量 PR，专注于稳定性提升和内核级性能调优。

### 3. 新模型与硬件支持
*   **GLM-5.3-Flash：** 正在进行性能调优，重点针对 ROCm `gfx942` 的稀疏索引器（sparse indexers）和预填充（prefill）内核进行优化（[#57406](https://github.com/vllm-project/vllm/issues/57406)，[#63910](https://github.com/vllm-project/vllm/pull/63910)）。
*   **NVIDIA Blackwell (SM120)：** 优先追踪 DeepSeek-V4.1-Flash 在 eager-mode（即刻模式）限制下解码吞吐量下降的问题（[#56892](https://github.com/vllm-project/vllm/issues/56892)）。
*   **ROCm (MI355X/gfx950)：** 正在为投机采样（speculative decoding）实现 draft-path fastpaths（[#63182](https://github.com/vllm-project/vllm/pull/63182)）。

### 4. 性能与优化
*   **DeepSeek-V4.1-Flash：** PR [#64147](https://github.com/vllm-project/vllm/pull/64147) 为 TP8 锁定了专门的低延迟 MXFP8 GEMM 策略，绕过自动调优（autotuning）以确保性能的确定性。
*   **ROCm Kernels：** 通过扩大 Triton 自动调优的搜索空间，优化了 `gfx942` 上 Gated DeltaNet (GDN) 的预填充内核（[#62909](https://github.com/vllm-project/vllm/pull/62909)）。
*   **基准测试：** 在合成 MoE 前向传递基准测试中引入了 `Zipf` 路由分布，以更好地模拟现实中专家负载倾斜的情况（[#64167](https://github.com/vllm-project/vllm/pull/64167)）。

### 5. 稳定性与回归
*   **KV Cache 损坏（高优先级）：** 报告显示 `MooncakeStoreConnector` 在 BHLNC 下由于步长/长度不匹配，导致 KV 数据静默损坏（[#64117](https://github.com/vllm-project/vllm/issues/64117)）。
*   **量化回归：** 在 Kimi-K3/MI355X 上使用 FP8 KV cache 会导致严重的精度下降（GSM8K 分数从 0.975 跌至 0.305）（[#64106](https://github.com/vllm-project/vllm/issues/64106)）。
*   **LoRA 元数据绑定：** 正在持续修复 LoRA + MRV2 在 eager 和 compile-only 执行路径下的快速预填充正确性问题（[#59067](https://github.com/vllm-project/vllm/pull/59067)，[#61162](https://github.com/vllm-project/vllm/pull/61162)）。
*   **FlashInfer/SM90：** 修复了针对非行连续（non-row-contiguous）激活值的 FP8 块缩放（block-scale）GEMM 计算结果错误的问题（[#64040](https://github.com/vllm-project/vllm/pull/64040)）。

### 6. 对应用开发者的影响
*   **稳定性警告：** 如果您正在运行带有 LoRA 的混合模型（Gemma 3/4），请密切关注 PR [#59067](https://github.com/vllm-project/vllm/pull/59067) 和 [#61162](https://github.com/vllm-project/vllm/pull/61162)；元数据绑定漏洞目前正在修复中。
*   **投机采样：** 依赖投机采样的用户需注意一个已知问题：MTP 投机吞吐量在特定的休眠/唤醒周期后会降至标准速率；修复工作正在进行中（[#52487](https://github.com/vllm-project/vllm/pull/52487)）。
*   **Rust 前端：** Rust 前端目前对于缺少 `tokenizer.json` 或使用嵌套词表结构（如 Qwen3-ASR）的模型存在限制（[#61057](https://github.com/vllm-project/vllm/issues/61057)）。在迁移到 Rust 前端之前，请务必核实您的模型配置。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

## SGLang 日报：2026-10-28

### 1. 今日要点
工作重心仍集中在稳定 Q4 路线图中的预填充-解码（Prefill-Decode, PD）分离方案，以及对 Kimi-K3 和 DeepSeek-V4 等超大规模模型的扩展性支持。目前的工程投入重点在于优化 NVIDIA Hopper (SM90/SM120) 的性能，特别是针对 block-FP8 解码和 MQA logit 的调优；同时，也在推进 AMD/ROCm 和 NPU (Ascend) 后端的对齐工作。

### 2. 发布与重大变更
*   **过去 24 小时内无新版本发布。**
*   **API/配置：** `server_arguments_undocumented.txt` 显示正在推动标准化 PD 分离（PD-disaggregation）标志位 [#46904](https://github.com/sgl-project/sglang/pull/46904)。
*   **配置：** `--api-key` 现已支持多密钥，允许通过逗号分隔多个凭据，以简化多租户管理 [#36666](https://github.com/sgl-project/sglang/pull/36666)。

### 3. 新模型与硬件支持
*   **Embedding 模型：** 增加了对 `nvidia/Nemotron-3-Embed-1B-BF16` 及其 NVFP4 变体的支持 [#45885](https://github.com/sgl-project/sglang/pull/45885)。
*   **AMD/ROCm：** 继续针对消费级 RDNA3/RDNA4 GPU (gfx1100/gfx1201) 进行适配，并跟进 MI355X/gfx950 的性能表现 [#30599](https://github.com/sgl-project/sglang/issue/30599), [#44304](https://github.com/sgl-project/sglang/issue/44304)。
*   **NPU (Ascend)：** 正在进行 Kimi-K3 在多节点 NPU 集群上的稳定性工作，以及 DeepSeek-V4 的 DSpark 紧凑模式适配 [#44967](https://github.com/sgl-project/sglang/pull/44967), [#38440](https://github.com/sgl-project/sglang/pull/38440)。

### 4. 性能与优化
*   **Hopper GEMM：** 针对 GLM-5.2 FP8 解码投影引入了全新的 W8A16 小规模 M GEMM 内核，相比默认的 W8A8 路径，单 Token 延迟降低了 **6.8%**，同时相比其他实现节省了约 8 GiB 显存 [#45862](https://github.com/sgl-project/sglang/pull/45862)。
*   **预填充（Prefill）优化：** 为 Hunyuan3D 增加了 GPU 端网格生成支持，消除了 CPU 到 GPU 的拷贝瓶颈 [#46905](https://github.com/sgl-project/sglang/pull/46905)。
*   **PD 分离：** 改进了等待前缀（waiting-prefix）的 LRU 逻辑，确保启动队列中的请求保持活跃，从而避免因缓存驱逐导致的非必要停顿 [#46812](https://github.com/sgl-project/sglang/pull/46812)。

### 5. 稳定性与回归问题
*   **高优先级（内存/挂起）：**
    *   **MUSA 后端：** 在使用 `fa3` 和 radix cache 命中时，由于调度器元数据计算错误，导致推测解码挂起 [#46508](https://github.com/sgl-project/sglang/issue/46508)。
    *   **内存访问：** 在 RTX 6000 (sm_120) 上运行 Qwen3.8-Flash-Next 且开启 EP2 并行时，报告存在非法内存访问 [#44291](https://github.com/sgl-project/sglang/issue/44291)。
*   **中优先级（正确性）：**
    *   **FlashInfer：** 在 SM90 上运行 Kimi-K3 时，`flashinfer_mxfp4` 错误地计算了 SwiGLU 而非 SiTU [#45755](https://github.com/sgl-project/sglang/issue/45755)。
    *   **推测解码：** `update_weights_from_disk` 缺乏选择器，导致在 DFLASH 中更新草稿模型时出现静默权重损坏 [#46806](https://github.com/sgl-project/sglang/issue/46806)。

### 6. 对应用开发者的影响
*   **多租户：** 如果你正在运行单个 SGLang 实例服务于多个客户/用户，现在可以通过逗号分隔的字符串传入多个 API Key，从而在无需部署多个实例的情况下提升安全性和监控能力 [#36666](https://github.com/sgl-project/sglang/pull/36666)。
*   **PD 分离：** 如果你在进行大规模部署，请密切关注后续关于 PD 分离标志位的文档更新。它正在成为“默认”运行模式；请对照最新文档检查你的 `ServerArgs`，确保没有使用过时且未记录的配置 [#46904](https://github.com/sgl-project/sglang/pull/46904)。
*   **部署稳定性：** 如果你正在使用推测解码（DSpark/EAGLE），建议谨慎更新至当前版本；目前有多个关于元数据处理和草稿模型内存访问的修复正在进行中，旨在解决挂起和静默错误问题 [#46618](https://github.com/sgl-project/sglang/pull/46618), [#46806](https://github.com/sgl-project/sglang/issue/46806)。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 摘要: 2026-10-28

### 1. 今日要点
过去 24 小时的重点在于 **LiquidAI LFM3 系列**模型的快速集成，包括音频、全模态（omni）及决策模型，同时为多模态实时对话增加了重要功能。基础设施工作已转向优化 MoE 缓存策略，并改进了用于动态模型卸载的服务端内存管理。

### 2. 发布与重大变更
*   **b11944:** 在聊天模板中引入推理努力等级（reasoning effort levels），允许通过服务器 API 精细控制模型的“思考”深度（从最低到最高）[#31271](https://github.com/ggml-org/llama.cpp/pull/31271)。
*   **Server Config:** 引入了新的 `--models-memory-max` 参数，以支持在内存达到阈值时自动卸载模型 [#21231](https://github.com/ggml-org/llama.cpp/pull/21231)。

### 3. 新模型与硬件支持
*   **LiquidAI LFM3:** 完全集成了 LFM3-Audio-2B、LFM3-Omni-2B、LFM3-1.7B、LFM3-VL-2B 以及 d1-2B 决策模型 [#31257](https://github.com/ggml-org/llama.cpp/pull/31257), [#31252](https://github.com/ggml-org/llama.cpp/pull/31252), [#31275](https://github.com/ggml-org/llama.cpp/pull/31275)。
*   **Multimodal:** 为 `mtmd` CLI 中的 LFM3 系列添加了视频输入支持 [#31283](https://github.com/ggml-org/llama.cpp/pull/31283)。
*   **Hexagon Backend:** 增加了对 `DSV4_HC_PRE` 和 `DSV4_HC_POST` 操作的支持，提升了移动端/嵌入式目标的性能 [#30953](https://github.com/ggml-org/llama.cpp/pull/30953)。

### 4. 性能与优化
*   **MoE Caching:** 一项基于混合 LRFU/MQ 思想的新型 `ClassLRU` 缓存方案在 QFN/GLM 模型上实现了 **6-7% 的解码吞吐量**提升，且缓存上传次数减少了 8% [#31233](https://github.com/ggml-org/llama.cpp/pull/31233)。
*   **Hexagon Sampling:** 优化了后端采样器的 `TOP_K` 内核，解决了 X2 Elite 性能分析中发现的一个显著瓶颈（此前占草稿批处理时间的 25-42%）[#31279](https://github.com/ggml-org/llama.cpp/pull/31279)。
*   **Testing:** 对测试套件中的 `save_models` 进行了重构，跳过了完整的上下文初始化，大幅加快了张量数据生成和模型保存的工作流 [#31145](https://github.com/ggml-org/llama.cpp/pull/31145)。

### 5. 稳定性与回归
*   **Memory/Safety (高):** 在 RPC 路径中发现并修复了一个 `ggml_nbytes()` 中的潜在整数溢出问题，该问题可能导致内存越界（OOB）访问 [#31217](https://github.com/ggml-org/llama.cpp/pull/31217)。
*   **Vulkan (中):** 在大上下文使用（约 50K+）期间，集成显卡（iGPU）上出现的 `vk::Queue::submit` 设备丢失错误，以及 `count_experts` 着色器中潜在的 GPU 挂起问题仍在调查中 [#26447](https://github.com/ggml-org/llama.cpp/issues/26447), [#31163](https://github.com/ggml-org/llama.cpp/issues/31163)。
*   **Speculative Decoding (中):** 收到关于在特定 Windows/CUDA 构建版本上使用 MTP (`--spec-type draft-mtp`) 时预填充（prefill）变慢的报告，目前正在追踪；建议用户在同步修复之前，避免在较旧的预编译二进制文件上使用 MTP [#31085](https://github.com/ggml-org/llama.cpp/issues/31085), [#28790](https://github.com/ggml-org/llama.cpp/issues/28790)。

### 6. 对应用开发者的意义
*   **Agentic Workflows:** 如果您正在构建“推理”智能体，请开始将您的 UI 控件映射到新的 `reasoning_effort` 等级，以优化响应时间和 Token 使用量。
*   **Voice/Omni-Apps:** `/v1/realtime` 的扩展以及对 LFM3 的 `mtmd` 支持，能够实现具有原生推理体验的高保真端到端语音和视频应用。
*   **Server Stability:** 如果在生产环境中运行多个模型，新的 `--models-memory-max` 标志是必须集成的功能，以防止在需要动态切换不同模型权重的环境中出现 OOM（内存溢出）导致的服务崩溃。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 动态摘要：2026-10-28

### 1. 今日亮点
开发工作主要集中在优化 Apple Silicon 的 **MLX 后端**，以及提升 **Windows/CUDA 在高负载下的稳定性**。目前正投入大量精力加固复杂智能体工作流中的多轮流式传输，包括修复模型下载中断问题以及优化 OpenAI 兼容 API 的错误处理机制。

### 2. 发布与重大变更
*   **过去 24 小时内无新版本发布。**
*   **注意：** `0.40.12-rc1` 仍为当前活动的测试分支。开发者需关注 `llama-server` 针对 LFM3 模型运行时要求的后续变更。

### 3. 新模型与硬件支持
*   **LFM3 架构：** 通过 [PR #19344](https://github.com/ollama/ollama/pull/19344) 集成了对 LiquidAI LFM3 模型的初步支持，包含针对 `llama.cpp` 同步的特定 GGUF 修复及文本转语音切换功能。
*   **Nemotron 3.5 Bolt 74B：** 对该大规模模型的支持正在进行中，通过 DFlash 运行器实现逐层专家配置和 LiLiCorr 推测解码 ([PR #19229](https://github.com/ollama/ollama/pull/19229))。
*   **Kolibri 1：** 已加入 MLX 后端支持列表 ([PR #18780](https://github.com/ollama/ollama/pull/18780))。

### 4. 性能与优化
*   **并行 MLX 执行：** [PR #19197](https://github.com/ollama/ollama/pull/19197) 引入了对 MLX 的并发生成支持，通过共享投影和前馈计算，提升多用户/多智能体环境下的延迟表现。
*   **心跳机制：** [PR #19331](https://github.com/ollama/ollama/pull/19331) 为桌面端 UI 实现了加载心跳检测，防止长提示词评估过程中的流超时问题。

### 5. 稳定性与回归问题
*   **[严重] CUDA 初始化失败：** 持续收到 RTX 5060 (Blackwell) 上出现 `shared object initialization failed` 的报告；正在进行修复，尝试通过预加载 CUDA 模块来重试服务器启动 ([PR #18978](https://github.com/ollama/ollama/pull/18978))。
*   **[高] 下载可恢复性：** 服务器重启会导致正在进行中的模型下载中断（表现为“文件未找到”或“摘要不匹配”），该回归问题正在 [PR #19339](https://github.com/ollama/ollama/pull/19339) 中修复。
*   **[中] macOS 上的 MLX Panic：** 多份报告（[#18885](https://github.com/ollama/ollama/issues/18885), [#19278](https://github.com/ollama/ollama/issues/19278)）称在 M 系列芯片上执行命令缓冲区时 `mlx runner` 发生崩溃；工程师正在排查内核级的 Metal 故障。
*   **[中] Windows 连接重置：** 用户报告在处理大批量提示词时出现连接重置问题 ([#19139](https://github.com/ollama/ollama/issues/19139))。

### 6. 对应用开发者的影响
*   **API 弹性：** 如果你正在使用 Ollama 作为 OpenAI 兼容网关构建智能体应用，请注意流式错误处理正在加强 ([PR #18953](https://github.com/ollama/ollama/pull/18953))。预计错误上报将更加可靠，避免流传输中途静默失败。
*   **多模态排序：** 若在使用 Gemma 4 或类似模型，请确保嵌入调用遵循特定的 token 交错规则；[PR #19334](https://github.com/ollama/ollama/pull/19334) 修复了媒体标记位置错误的问题。
*   **工具/开发者指令处理：** 正在进行优化以确保系统/开发者角色和工具调用在 API 重放及压缩场景中得以保留 ([PR #19199](https://github.com/ollama/ollama/pull/19199), [#19309](https://github.com/ollama/ollama/pull/19309))。请利用这些改进以获得更一致的“系统提示词”行为。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

### LiteLLM 基础设施摘要：2026-10-28

#### 1. 今日要点
LiteLLM 正在经历重大的版本周期转换，正从 1.108 系列转向 1.109，重点在于稳固企业级功能并提升成本追踪的精细度。近期的工作重点包括解决遥测回归问题（例如流式响应中缺失成本数据）、改进 Token 计数逻辑，以及引入了全新的安全启动控制项 `LITELLM_FIPS_MODE`。

#### 2. 版本发布与重大变更
*   **版本更新：** 从 [v1.106.5](https://github.com/BerriAI/litellm/releases/tag/v1.106.5) 到 v1.103.10 的发布反映了当前快速迭代的补丁节奏。
*   **发布节奏：** 主分支已进入 [v1.109.0](https://github.com/BerriAI/litellm/pull/48673) 的开发阶段；运维人员应做好 1.109.x 迁移的准备。
*   **管理后台 UI：** 必须重新构建 Admin UI 包，以便展示自上次稳定版本以来新增的功能（如新的聊天模型中心）[PR #48692](https://github.com/BerriAI/litellm/pull/48692)。

#### 3. 新模型与硬件支持
*   **Databricks/OpenJev：** 为 `databricks-openjev-qwen35-4b` 模型添加了定价配置，以确保准确的基于 DBU 的成本记录 [PR #48694](https://github.com/BerriAI/litellm/pull/48694)。
*   **搜索提供商：** 更新了 Tavily 搜索集成，以透传完整的响应包，包括此前被丢弃的 `raw_content` 和元数据 [PR #48684](https://github.com/BerriAI/litellm/pull/48684)。

#### 4. 性能与优化
*   **守卫（Guardrail）延迟：** 优化了流式处理路径，如果守卫仅关注请求提示词（prompt），则允许跳过针对每个分块（chunk）的响应检查，从而显著降低流式补全的开销 [PR #47735](https://github.com/BerriAI/litellm/pull/47735)。
*   **Token 计数：** 恢复了提示词 Token 计数的传统优先级，以防止用户同时提供 `messages` 和 `prompt` 字段时引发 `400 Bad Request` 错误 [PR #48693](https://github.com/BerriAI/litellm/pull/48693)。
*   **Redis 一致性：** 通过在代理工作进程之间共享会话层（session tier）绑定，提升了路由性能，减少了工具调用持续请求带来的冗余往返 [PR #48645](https://github.com/BerriAI/litellm/pull/48645)。

#### 5. 稳定性与回归
*   **安全（高危）：** 1.106.x 镜像中存在的 [eMudhra root CA](https://github.com/BerriAI/litellm/issues/47904) 证书问题仍需关注；建议用户检查各自的信任链。
*   **成本准确性（中危）：** 某次回归导致部分流式请求对定价表中未明确列出的模型报告为 `$0` 费用；现已修复，改为优先采信上游报告的 `usage.cost` [PR #48287](https://github.com/BerriAI/litellm/pull/48287)。
*   **合规性（中危）：** 引入了 `LITELLM_FIPS_MODE=true`，以强制执行符合 FIPS 标准的加密启动检查 [PR #48600](https://github.com/BerriAI/litellm/pull/48600)。

#### 6. 对应用程序开发者的影响
*   **可观测性：** 使用 Langfuse/OTEL 的开发者应通过 `LITELLM_OTEL_V2=true` 追踪新的元数据字段，以确保用户/组织标识在链路中被正确映射 [PR #42697](https://github.com/BerriAI/litellm/pull/42697)。
*   **透传自定义：** 现在可以通过发送 `x-litellm-operation-name` 请求头来标记追踪中的自定义操作，防止非聊天类的透传调用干扰聊天延迟指标 [PR #48675](https://github.com/BerriAI/litellm/pull/48675)。
*   **API 兼容性：** 如果您的 Agent 使用了 SAP 或 Anthropic 的工具调用，请务必更新到最新镜像，因为针对工具调用参数序列化和消息顺序的多个修复已合并 [PR #48696](https://github.com/BerriAI/litellm/pull/48696), [PR #45478](https://github.com/BerriAI/litellm/pull/45478)。

---

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

过去24小时无活动。

</details>

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*