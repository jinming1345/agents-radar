# AI 基础设施日报 2026-09-23

> 生成时间: 2026-09-23 00:54 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

## AI 基础设施生态系统报告：2026-09-23

### 1. 生态系统概览
当前的 AI 基础设施格局主要由向“智能体原生”（agentic-native）服务和极端硬件特定优化的高风险转型所定义。随着模型架构向复杂的混合专家模型（MoE）和多模态集成发展，基础设施项目正优先考虑 KV-Cache 持久化、计算与存储分离（PD）以及更紧密的硬件集成（SM100/Hopper/Blackwell）。重心已从通用的性能提升转向多轮、有状态智能体工作流中的细粒度稳定性，其中延迟抖动（latency jitter）和缓存失效（cache invalidation）是阻碍生产级部署的主要因素。

### 2. 活跃度对比
*注：活跃度指标是根据近期项目 PR/Issue 的处理速度估算的快照。*

| 项目 | 活跃 Issue (高优先级) | 活跃 PR | 发布状态 |
| :--- | :--- | :--- | :--- |
| **vLLM** | 3 | 高 | v0.30.0 (大版本) |
| **SGLang** | 2 | 高 | 稳定/开发版 |
| **llama.cpp** | 2 | 中等 | b11115 (补丁) |
| **Ollama** | 2 | 中等 | 稳定 (无) |
| **LiteLLM** | 2 | 高 | v1.102.0 (稳定) |
| **Unsloth** | 2 | 高 | v0.1.814-beta |

### 3. 模型支持竞赛
*   **DeepSeek-V4-Flash:** vLLM 凭借 SM100 架构集成和 MXFP8 缓存支持占据领先地位。
*   **Kimi-K3:** SGLang 和 vLLM 在 AMD/ROCm 上的性能表现难分伯仲，SGLang 正推动 MXFP4 量化支持。
*   **Gemma 4 / Qwen 3.8:** Ollama 依然是本地/视觉模型分发的主要载体，重点在于动态图像预算和 Apple Silicon (MLX) 效率。
*   **多模态/视频:** Unsloth 正积极定位为针对较新视频/扩散模型（Wan2.2, HunyuanVideo）使用 NVFP4 进行微调的领导者，有效地弥合了训练与推理之间的鸿沟。

### 4. 性能前沿
业界正集体摒弃“一刀切”的内核，转而采用：
*   **硬件特定融合（Hardware-Specific Fusions）:** vLLM 正转向可中断的 CUDA 图（breakable CUDA graphs）以处理批次不变性执行；llama.cpp 正在深入研究用于 Intel 架构的 SYCL/XMX GEMM 内核。
*   **KV-Cache 与内存:** SGLang 的“统一基数缓存”（Unified Radix Cache）和 vLLM 对会话亲和性（session-affinity）的关注，突显了业界向支持有状态智能体的**长上下文留存**转型的趋势。
*   **量化:** 向 **MXFP8 和 NVFP4** 转型已成为普遍趋势，Unsloth 领衔将 `compressed-tensors` 直接集成到生产训练流水线中。
*   **分布式服务:** SGLang 在计算与存储分离（PD）架构开发方面处于领先地位，尽管稳定性（例如 Triton 内核中的内存损坏问题）仍然是主要挑战。

### 5. 层级定位
*   **服务引擎 (vLLM, SGLang):** 专注于高吞吐、多用户企业环境。它们变得日益复杂，正转向管理集群级的内存池和分离的计算节点。
*   **本地运行时 (Ollama, llama.cpp):** 专注于终端用户的便携性和硬件抽象的易用性。它们强调兼容性（SYCL, Vulkan, MLX）而非单纯的多租户吞吐量。
*   **网关 (LiteLLM):** 用于多模型消费的抽象层。它正从简单的 API 路由转向基于 Rust 的诊断、计费和凭证管理，以降低开销。
*   **微调/混合 (Unsloth):** 一个新兴类别，将本地训练（QLoRA）与推理相结合，旨在满足开发者对专用/智能体模型进行快速迭代的需求。

### 6. 趋势信号
*   **“智能体税”（The "Agentic Tax”）:** 各项目已意识到“智能体工作流”（工具使用、多轮推理）本质上是脆弱的。开发者应关注从通用的聊天补全 API 向“状态感知”调度的转型（例如 vLLM 的 SessionAffinity 和 LiteLLM 的审计/成本日志）。
*   **Rust 在中间件中的崛起:** LiteLLM 将核心成本/逻辑函数迁移至 Rust，标志着基础设施项目正在触及纯 Python 控制平面的性能上限。
*   **硬件碎片化:** 同时致力于稳定 SM100 (vLLM)、RTX 50 系列 (Ollama) 和 RDNA3 (llama.cpp) 表明，硬件级软件工程已取代模型架构，成为基础设施栈中的主要差异化因素。
*   **开发者建议:** 如果你正在构建**高吞吐量**应用，请锁定 vLLM v0.30.0，但需密切关注“GLM-5.3”回归问题。如果你正在构建**智能体**，本地模型状态的稳定性（SGLang 的 LMCache，vLLM 的 SessionAffinity）目前比单纯的 Token 生成速度更为重要。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 技术摘要：2026-09-23

### 1. 今日重点
vLLM 生态系统目前仍高度专注于为 **DeepSeek-V4-Flash** 和 **GLM-5.3-Flash** 等近期旗舰模型提供深度的架构支持，同时投入大量工程资源解决 ROCm/MI355X 的性能瓶颈和智能体（Agentic）工作流中的回归问题。项目组正持续推动“批次不变性”（batch-invariant）执行，并通过引入融合算子（fused kernels）和优化的内存分析工具，旨在将高并发环境下的性能抖动降至最低。

### 2. 发布版本与破坏性变更
*   **v0.30.0 发布：** 这是一个重要的里程碑版本，包含超过 760 次提交，并引入了对 SM100 架构和 FlashMLA V4.1 的深度支持。[Release v0.30.0](https://github.com/vllm-project/vllm/releases/tag/v0.30.0)

### 3. 新模型与硬件支持
*   **DeepSeek-V4-Flash：** 在 SM100 架构上实现与 MXFP8 KV 缓存的完全集成。[PR #56893](https://github.com/vllm-project/vllm/pull/56893)
*   **MI355X (gfx950) 优化：** 新的专属单元测试组和性能追踪器已上线，用于稳固 Kimi-K3 和 DeepSeek-V4 在最新 AMD 硬件上的表现。[PR #58012](https://github.com/vllm-project/vllm/pull/58012), [PR #57149](https://github.com/vllm-project/vllm/issues/57149)
*   **DiffusionGemma：** 通过全新的单次采样算子（one-pass sampler kernel），持续为结构化输出场景提供支持。[PR #58226](https://github.com/vllm-project/vllm/pull/58226)

### 4. 性能与优化
*   **批次不变性矩阵乘法（Batch-Invariant Matmuls）：** 从 `torch.compile` 过渡到可中断的 CUDA Graphs，确保调优后的矩阵乘法配置在不同的运行时批次大小时保持稳定。[PR #57586](https://github.com/vllm-project/vllm/pull/57586)
*   **融合 AWQ 算子：** 针对 SM89 推出的全新 Triton 算子，允许执行解量化融合的 GEMM，从而绕过反量化 FP16 权重带来的开销。[PR #57047](https://github.com/vllm-project/vllm/pull/57047)
*   **MoE/专家吞吐量：** 针对 DeepSeek-V4 的优化 PR 允许在 Hopper 架构上实现无损的 MXFP4 到 block-FP8 的专家解量化，主要旨在提升预填充（prefill）速度。[PR #53709](https://github.com/vllm-project/vllm/pull/53709)

### 5. 稳定性与回归问题
*   **GLM-5.3-Flash 退化（高优先级）：** 用户反馈在智能体应用场景中出现了“词语乱码”式的重复标记循环及长解码退化问题。[Issue #56605](https://github.com/vllm-project/vllm/issues/56605), [Issue #56868](https://github.com/vllm-project/vllm/issues/56868)
*   **ROCm/MI300X KV 损坏（高优先级）：** 在使用远程预填充 KV 缓存的 PD 分离式服务（PD-disaggregated serving）中，运行 CUDA Graphs 时会导致输出结果退化。[Issue #57064](https://github.com/vllm-project/vllm/issues/57064)
*   **Mamba/GDN 前缀缓存：** 当定义了显式的 `--block-size` 时，混合模型在前缀缓存恢复阶段仍存在非法内存访问问题。[Issue #53142](https://github.com/vllm-project/vllm/issues/53142)

### 6. 对应用开发者的影响
*   **智能体工作流：** 如果你正在构建多轮智能体应用，请关注 [SessionAffinityScheduler PR #51384](https://github.com/vllm-project/vllm/pull/51384)。这对于在高并发环境下保持缓存预热状态的连续性至关重要。
*   **工具调用（Tool-Calling）：** 已建立一个用于流式工具调用“解析器状态缓存”的追踪 issue，旨在确保重试期间工具 ID 的稳定性——这是实现可靠智能体工具使用的主要痛点。[Issue #57571](https://github.com/vllm-project/vllm/issues/57571)
*   **配置规范：** 请注意，`torch.compile` 的哈希处理正转向“选择退出”（opt-out）模型。未来的更新将更加严格；请确保正确注册了你的自定义配置字段，以避免因缓存键未命中而导致的性能下降。[Issue #39479](https://github.com/vllm-project/vllm/issues/39479)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 动态摘要：2026-09-23

### 1. 今日重点
SGLang 的开发重点主要集中在完善解耦推理（PD）和强化学习（RL）支持，大量的 PR 旨在协调权重更新周期与内存池管理。核心团队正积极将 `miles` 分支的功能向上合并，改进组件间的通信，并稳定用于多节点环境的复杂投机解码流水线。

### 2. 发布与重大变更
*   **无新版本发布。**
*   **IPC 迁移：** 将 IPC 通信完全迁移至 `msgpack` 的工作正在进行中，开发者正致力于移除 `PickleWrapper` 后备机制，以提升序列化性能 ([#29465](https://github.com/sgl-project/sglang/issues/29465))。

### 3. 模型与硬件支持
*   **SenseNova-U1：** 旨在实现与官方 SenseNova-U1/U1.5 实现的功能和性能对齐的路线图正在积极开发中 ([#37742](https://github.com/sgl-project/sglang/issues/37742))。
*   **Kimi K3 (AMD/ROCm)：** 新增的 PR 支持在 ROCm/AMD 平台上部署 Quark 量化的 Kimi-K3 MXFP4 检查点 ([#40811](https://github.com/sgl-project/sglang/pull/40811))。
*   **昇腾 NPU：** NPU 栈正在升级至 CANN 9.1.0/Python 3.12，以提升硬件兼容性 ([#40524](https://github.com/sgl-project/sglang/pull/40524))。

### 4. 性能与优化
*   **统一 Radix Cache：** 大力推进 KV-cache 后端的统一，包括将 LMCache 集成到 `UnifiedRadixCache` 路径中，以实现 KV 块的持久化/恢复 ([#38652](https://github.com/sgl-project/sglang/pull/38652))。
*   **L1 优化：** 为 JIT 内核引入了保持占用率的 L1 预留机制，减少了 PDL 次级 worker 中大共享内存分区的开销 ([#40767](https://github.com/sgl-project/sglang/pull/40767))。
*   **MoE/MLA 效率：** 针对高性能 GLM-5.2 模型，正在进行 `flashinfer_megamoe` 和投机减量拆分（speculative reduction splitting）的相关工作 ([#40358](https://github.com/sgl-project/sglang/pull/40358))。

### 5. 稳定性与回归问题
*   **内存损坏（高危）：** 在 GLM-5.2 架构上结合使用 `flashinfer_megamoe` 和 EAGLE 投机解码时，Triton 融合 MoE 内核出现非法内存访问 ([#40623](https://github.com/sgl-project/sglang/issues/40623))。
*   **投机解码（中危）：** 在运行 DSA attention + EAGLE 的 PD 解耦解码实例中检测到 watchdog 超时和挂起问题 ([#33642](https://github.com/sgl-project/sglang/issues/33642))。
*   **逻辑/正确性（中危）：** 在 LongCat MoE 和 Nemotron MTP 中发现残差求和错误，导致残差被重复累加 ([#40799](https://github.com/sgl-project/sglang/pull/40799), [#40800](https://github.com/sgl-project/sglang/pull/40800))。修复程序目前处于 PR 阶段。
*   **CI 健康状况：** 在最新的流水线更新中报告了 2 个活跃故障和 5 个不稳定测试 ([#17050](https://github.com/sgl-project/sglang/issues/17050))。

### 6. 对应用开发者的影响
*   **RL 工作流：** 如果你正在使用 SGLang 构建用于实时模型更新的 RL Agent，请关注即将合并的用于稳定 `pause_generation` 和权重更新周期的 PR，目前这些环节存在潜在的死锁风险 ([#40779](https://github.com/sgl-project/sglang/pull/40779))。
*   **投机解码稳定性：** 依赖 EAGLE 投机解码的开发者在升级到最新的 nightly 构建版本时应保持谨慎，因为目前 MoE/MLA 流水线中的若干回归问题正在修复中。
*   **LMCache 集成：** 预计很快会有更灵活的 KV-cache 选项，LMCache 正被作为后端进行原生集成，以便在引擎重启时实现更好的缓存持久化。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 摘要：2026-09-23

### 1. 今日重点
本周期的核心工作集中于对 Intel/SYCL 后端的深度优化，以及增强 `llama-server` 请求调度逻辑的健壮性。通过专家权重缓存（expert weight caching）和算子融合（fused kernels），MoE 开销的降低取得了重大进展；同时，多地址绑定和队列管理的改进正在落地，以提升企业级服务器的可靠性。

### 2. 发布与重大变更
*   **b11115**：为 Q4_K/Q8_1 添加了 OpenCL 非 MoE dp4a 算子 (#29056)。
*   **b11114**：服务器现将所有模型加载请求通过任务队列进行路由，以防止在转换状态期间出现驱逐竞争问题 (#29217)。
*   **b11104**：`llama-server` 现支持绑定到多个网络接口，提升了多宿主环境下的部署灵活性 (#28690)。

### 3. 新模型与硬件支持
*   **SYCL/Intel**：针对 B70/Arc Pro 的优化工作正在积极进行，包括 `IQ3_S` 和 `IQ3_XXS` 重排序 (#29107) 以及分组 MoE XMX GEMM 集成 (#29245)。
*   **MUSA (MTT S5000)**：后端加固工作正在进行中，旨在摆脱旧版 S80 的临时补丁，并稳定算子支持 (#29193)。
*   **CUDA**：引入了分组专家 top-k 融合（grouped expert top-k fusion），以恢复 MoE 架构下的性能 (#29181)。

### 4. 性能与优化
*   **MoE 效率**：PR #27861 提出了一种 GPU 常驻的 LRU 缓存，用于卸载到主机的 MoE 专家权重，旨在减轻解码期间的系统 RAM 带宽瓶颈。
*   **算子融合**：基于 CUDA 的分组专家融合 (#29181) 和基于 SYCL 的 Q8_0 DMMV/MMVQ 宽加载（wide-loading，#29186）表明开发团队正集中精力最大化计算利用率。
*   **Flash Attention**：PR #29282 为 Hexagon/HVX 目标引入了直接映射 DMA 缓存，优化了相较于此前全相联缓存的掩码处理效率。

### 5. 稳定性与回归问题
*   **关键 (Server)**：Issue #29188 报告称，如果请求在服务器处于休眠/唤醒周期时到达，token 计算过程中会出现 `SIGSEGV`。
*   **高危 (Vulkan)**：Issue #28752 报告称，在最近更新后，RDNA3 架构上的提示词处理性能出现严重衰退。
*   **高危 (Evaluation)**：Issue #25618（投机解码发散问题）持续受到关注；证据表明，相比 bf16，量化目标 (Q4_K_M) 在贪婪采样时存在不匹配。
*   **修复**：正在持续修复 `llama-server` 的竞争条件 (#29120) 和媒体标记处理 (#29291) 问题。

### 6. 对应用开发者的意义
*   **可靠性**：如果您在负载均衡器后运行 `llama-server` 或使用自定义健康检查（例如 VictoriaMetrics），请注意潜在的抓取导致的挂起问题 (#29104)，并确保锁定在已修复队列竞争问题的最新构建版本。
*   **部署**：新增的多地址绑定功能 (#29217) 简化了需要将管理网络与推理网络分开的架构设计。
*   **模型兼容性**：MTP 模型中对修剪后草稿词表 (`d2t` 映射) 的支持正在落地 (#29290, #29143)；如果您正在利用侧车训练（sidecar-trained）的投机解码模型，请务必更新您的推理流水线。
*   **可观测性**：新增的 CI/测试标志 `--errors-only` (#29040) 是一个受欢迎的功能，有助于在自动化流水线部署中获得更整洁的日志。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 基础设施简报：2026-09-23

### 1. 今日重点
开发重点已大幅转向稳定 Gemma 4 视觉流水线，并优化针对 Qwen 3.8 的基于 MLX 的推理性能。macOS 应用程序正在进行重大的 UI/UX 改进，以解决系统级响应延迟问题；同时，用于模型可移植性的全新 CLI 工具（`export`/`import`）也正趋于生产就绪状态。

### 2. 发布与重大变更
*   **过去 24 小时内无新版本发布。**
*   **API/工具：** 一个正在处理中的 PR 旨在为工具参数实现完整的 JSON Schema 规范，以取代目前仅支持有限子集的情况 ([#18488](https://github.com/ollama/ollama/pull/18488))。

### 3. 新模型与硬件支持
*   **Gemma 4 Vision：** 实现了动态图像分辨率选择，支持可变分辨率预算（70, 140, 280, 560, 1120 tokens），而非硬编码的固定值 ([#18603](https://github.com/ollama/ollama/pull/18603))。
*   **容器支持：** 一个 PR 正处于活跃状态，旨在解决 Docker 容器中因缺失库而导致的 Nvidia Vulkan/MLX 加速失效问题 ([#18592](https://github.com/ollama/ollama/pull/18592))。

### 4. 性能与优化
*   **MLX 内核调优：** 通过利用门控增量（gated-delta）内核并优化 SwiGLU 操作，Qwen 3.8 的提示词处理速度显著提升（在 M5 Max 上约提升了 +19% TPS）([#18550](https://github.com/ollama/ollama/pull/18550))。
*   **Flash Attention：** 针对内存高效型 Qwen3.8 Flash Next 变体的研究仍在继续，重点在于平衡密集权重的 MXFP8 量化与关键投影路径的 BF16 精度 ([#18078](https://github.com/ollama/ollama/pull/18078))。

### 5. 稳定性与回归问题
*   **严重（UI 冻结）：** macOS 应用程序因使用同步 `osascript` 调用进行应用检测，导致系统级卡死。已提交一个修复补丁，改为直接查询进程列表 ([#18593](https://github.com/ollama/ollama/issues/18593), [#18601](https://github.com/ollama/ollama/pull/18601))。
*   **高（回归）：** RTX 50 系列（Blackwell）用户反馈 CUDA 发现失败，导致 VRAM 总量显示为 "0 B" ([#18581](https://github.com/ollama/ollama/issues/18581))。
*   **中（内存）：** 已发现清理后仍有孤立的 blob 文件残留在 `~/.ollama/models/blobs` 中，占用了大量磁盘空间 ([#18595](https://github.com/ollama/ollama/issues/18595))。
*   **中（结构化输出）：** 用户反馈通过 Homebrew 安装的 MLX 模型因缺少 `xgrammar` 库文件导致结构化输出功能异常 ([#18597](https://github.com/ollama/ollama/issues/18597))。

### 6. 对应用开发者的意义
*   **可移植性：** 请关注即将推出的 `ollama export` 和 `import` 命令 ([#18578](https://github.com/ollama/ollama/pull/18578))；这将简化离线/气隙（air-gapped）环境下的模型分发 CI/CD 流程。
*   **视觉工作流：** 如果您的应用程序依赖 Gemma 4 进行 OCR，待动态图像预算功能 ([#18603](https://github.com/ollama/ollama/pull/18603)) 合并后，预计准确率将大幅提升，因为它消除了此前因 280-token 硬编码限制导致的缩放问题。
*   **智能体搜索：** 如果您使用的是兼容 Anthropic 的 API，预计单次响应的网页搜索容量将从 3 条增加到 10 条 ([#18602](https://github.com/ollama/ollama/pull/18602))，这将改善基于 RAG 的智能体表现。
*   **可靠性：** 集成 `/v1/chat/completions` 端点的开发者请注意，`qwen3.8:27b` 等特定模型目前存在偶发性故障 ([#17790](https://github.com/ollama/ollama/issues/17790))，团队正在进一步调查中。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

## LiteLLM 工程摘要 | 2026-09-23

### 1. 今日要点
LiteLLM 正在进行重大的架构转型，将核心的诊断逻辑和成本计算逻辑从 Python 迁移至 Rust，以提升性能和一致性。维护团队正在大力推行 CI/CD 流水线自动化，将兼容性测试分流至云原生定时任务（cron jobs），并部署自动化的 PR 清理工作流，以应对社区源源不断的补丁提交。

### 2. 版本发布与破坏性变更
*   **[v1.102.0](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0):** 发布了通过 [cosign](https://docs.sigstore.dev/cosign/overview/) 增强的 Docker 镜像签名。请确保您的部署流水线验证这些签名，以维护供应链完整性。

### 3. 新模型与硬件支持
*   **供应商价格同步：** 更新了 [Fireworks AI (#42590)](https://github.com/BerriAI/litellm/pull/42590)、[Azure AI (#42594)](https://github.com/BerriAI/litellm/pull/42594) 和 [OpenRouter (#42592)](https://github.com/BerriAI/litellm/pull/42592) 的定价元数据，确保高吞吐量部署下的计费准确性。
*   **企业级密钥管理：** 增加了 [HashiCorp Vault 和 CyberArk Conjur (#42503)](https://github.com/BerriAI/litellm/pull/42503) 的集成路径，以规范化安全凭证处理。

### 4. 性能与优化
*   **Rust 迁移：** [#42616](https://github.com/BerriAI/litellm/pull/42616) 引入了 `litellm-logger` Rust crate，用于处理凭证脱敏和诊断处理，将这些繁重的工作从 Python 运行时中移除。
*   **Rust 计费扩展：** [#42620](https://github.com/BerriAI/litellm/pull/42620) 将基于 Rust 的独立成本计算范围扩大到图像、OCR、视频和 Gemini grounding 定价，减少了 Python 在计费计算上的开销。

### 5. 稳定性与回归问题
*   **[关键] 未经身份验证的指标 ([#24530](https://github.com/BerriAI/litellm/issue/24530))：** `/metrics` 端点默认未经身份验证，会泄露多租户的 PII。**操作：** 如果在生产环境中运行，请立即启用 `require_auth_for_metrics_endpoint: true`。
*   **[高危] 速率限制器逻辑 ([#34140](https://github.com/BerriAI/litellm/issue/34140))：** v3 速率限制器目前对“每个模型下的团队限额”进行了重复计算，导致在预期配置的 50% 处触发 429 错误。
*   **[中危] 预算强制执行 ([#39370](https://github.com/BerriAI/litellm/issue/39370))：** 预算重置作业中存在一个 Bug，导致在 `budget_duration=null` 但 `budget_reset_at` 值陈旧的行上，支出会被静默归零。正在通过 PR [#42629](https://github.com/BerriAI/litellm/pull/42629) 进行修复，以处理批量更新期间的 Postgres 绑定参数限制。

### 6. 对应用开发者的影响
*   **审计追踪合规性：** 如果您是在欧盟《AI 法案》（EU AI Act）要求下进行构建，请关注关于防篡改审计追踪的 [#29895](https://github.com/BerriAI/litellm/issue/29895)。
*   **流式传输注意事项：** 请注意，当使用 `model_name` 别名时，流式传输的使用量目前被记录为 `0` ([#42161](https://github.com/BerriAI/litellm/issue/42161))。在此补丁生效前，请核对您的计费仪表板。
*   **开发者体验：** 项目正在将 `devin-ai-integration` 标准化用于 PR 处理——随着团队简化 CI/CD 维护流程，预计向 `stable/1.102.x` 分支的补丁回传（backport）速度会加快。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 基础设施摘要：2026-09-23

### 1. 今日亮点
Unsloth 正持续积极扩展其多模态与智能体（Agentic）能力，不仅推出了 **Qwen-Image-2.1**，还在扩散模型与视频模型领域针对 **NVFP4**（NVIDIA FP4）模型支持投入了大量精力。开发工作正全力推进 **Unsloth Studio** 的成熟度，通过引入多模型服务（multi-model serving）与决策 API，旨在打造具有竞争力的本地生产级推理与微调平台。

### 2. 发布与重大变更
*   **v0.1.812-v0.1.814-beta:** 引入了对 Qwen-Image-2.1 的支持、自定义 Agent Skills，并优化了对话/项目管理功能。
*   **重大变更:** 使用 `transformers` v5 的用户遇到了 RoPE 初始化及缓冲区实例化（buffer materialization）相关问题（#11609, #11611）；目前正在进行补丁修复，以恢复对旧版远程代码模型（legacy remote-code models）的兼容性。

### 3. 新模型与硬件支持
*   **Qwen-Image-2.1:** 发布原生本地支持，并提供专门文档（[Guide](https://unsloth.ai/docs/models/qwen-image-2.1)）。
*   **NVIDIA FP4 (NVFP4):** 针对扩散/视频模型（如 Wan2.2, HunyuanVideo）的 NVFP4 后端合并了重要 PR，利用 FlashInfer 和 TorchAO 实现性能提升（#10730, #10729, #10731）。
*   **量化格式:** 新增支持将 `compressed-tensors` 打包的 INT4 检查点（checkpoints）加载至 bitsandbytes `Linear4bit` 格式，从而为 DeepSeek-V3/Kimi-K2.7 代码模型提供训练支持（#11537）。
*   **AMD RDNA1:** 针对 RX 5000 系列（`gfx101x`）开启专项适配工作，通过禁用在这些显卡上会导致失败的 Triton 缓冲区操作来实现训练支持（#11614, #11615）。

### 4. 性能与优化
*   **推理吞吐量:** 在近期 beta 版本更新中，推理模块（reasoning block）性能已从 30 FPS 提升至 60 FPS。
*   **Studio 扩散路径:** 针对 DiT（Diffusion Transformer）系列模型，优化了 VAE 解码编译及单次渲染的 GPU 时间预算（#10889）。
*   **多模型服务:** Unsloth Studio 现已支持并发加载多个模型，从而在不同推理任务间实现高效的资源共享（#11591）。

### 5. 稳定性与回归问题
*   **AMD/ROCm 关键问题:** 接到关于 RX 7900 XTX 在进行 QLoRA 训练时出现 VM 故障（VM faults）和 GPU 重置的高优先级报告（#11498）。
*   **沙盒安全:** 针对此前报告的 `code_execution` 工具沙盒逃逸漏洞，在收到关于主机级文件系统访问的报告后，目前正在进行修复处理（#5191）。
*   **API/UX 缺陷:** 用户反馈存在无法复制生成的 API 密钥（#11387）以及 Mac 平台 epoch 计数错误（#11602）的问题。
*   **显存（VRAM）管理:** 接到关于工作站级 GPU（如 W7900/W7500）显存持续空闲（模型循环移出内存）的问题报告（#7164）。

### 6. 这对应用开发者意味着什么
*   **智能体工作流:** 如果你正在构建智能体，通过本地 **Decision API**（经由 Laya, #11603）的引入，你可以将类型安全的概率评分直接集成到本地栈中，而无需外部依赖。
*   **模型管理:** 现在你可以同时在显存中驻留多个专用模型，从而显著降低在推理、视觉和代码任务之间切换时的应用冷启动延迟（#11591）。
*   **部署:** 使用 `compressed-tensors` 或 NVIDIA ModelOpt 检查点的开发者现在可以跳过自定义转换脚本，因为近期的 PR（#11537, #11592）已将这些格式直接集成到 Unsloth/Transformers 加载流程中。

---

</details>

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*