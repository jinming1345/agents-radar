# AI 基础设施日报 2026-11-03

> 生成时间: 2026-11-03 01:31 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

### AI基础设施生态报告：2026-11-03

#### 1. 生态系统概览
当前的AI基础设施格局正经历一场向“推理（Reasoning）”和“智能体（Agentic）”模型支持的高风险转型（例如 DeepSeek-V4.1、Reflection Beam）。基础设施项目的重点已从基础吞吐量转向在多样化且日益异构的硬件上实现确定性、多轮对话和工具调用的稳定性。随着 SGLang 和 LiteLLM 等平台向标准化的 gRPC/OpenAI 兼容模式收敛，集成工作正在加速，以缓解生态碎片化问题。

#### 2. 活动对比
*注：预估值基于当前项目热度及报告的 PR/Issue 处理速率。*

| 项目 | 预估 PR 速率 | 预估 Issue 速率 | 发布状态 |
| :--- | :--- | :--- | :--- |
| **vLLM** | 极高 | 高 | v0.33.0 (活跃) |
| **SGLang** | 高 | 中 | v0.5.23 (活跃) |
| **llama.cpp** | 高 | 高 | b12061 (活跃) |
| **Ollama** | 中 | 中 | 稳定版 (Staging) |
| **LiteLLM** | 高 | 高 | 稳定版 (Staging) |
| **Unsloth** | 中 | 中 | 维护中 |

#### 3. 模型支持竞赛
**vLLM** 和 **SGLang** 目前在重型 MoE 模型和高并发生产模型（DeepSeek-V4.1、Beam-1.0）领域处于领先地位，而 **llama.cpp** 则凭借其对新架构（Clover MoE、Pocket TTS）的敏捷适配，统治了“端侧/消费级硬件”市场。
*   **DeepSeek-V4.1/Flash：** vLLM 与 SGLang 的主要竞争高地。
*   **MoE 专门化：** llama.cpp 在 Clover MoE 集成上领先，而 SGLang 正在为 GB300 优化高并发路由专家（routed-expert）的缓存管理。
*   **新兴架构：** LFM3 (LiquidAI) 正成为 Unsloth 的目标，这体现了面向训练的基础设施与纯推理引擎之间的路线分歧。

#### 4. 性能前沿
*   **KV Cache 管理：** 在**隔离内存池**（vLLM 中的 `--draft-kv-pool`，SGLang 中的 `HiCache`）方面出现了重大创新，旨在防止推测解码和智能体多跳（multi-hop）工作负载中的资源竞争。
*   **架构专用内核：** 开发重心高度倾斜于 **NVIDIA Blackwell (SM120/121)** 和 **AMD (gfx950/MI350X)**，同时 SGLang 也在推动对 **NPU/昇腾（Ascend）** 的支持。
*   **推测解码（Speculative Decoding）：** 焦点已从“能否实现”转向“如何优化采样器”——特别是通过使用逆 CDF 循环和自适应推测逻辑，来避免在低接受率阶段造成的计算浪费。

#### 5. 层级定位
*   **推理引擎 (vLLM, SGLang)：** 作为高吞吐、集群规模的后端；专注于 gRPC 协议栈和针对 Blackwell 优化的内核。
*   **本地运行时 (llama.cpp, Ollama)：** 桥接硬件与操作系统级执行；专注于内存效率（Apple 上的 `vm_allocate`）和异构后端支持（Vulkan/SYCL）。
*   **网关 (LiteLLM)：** 编排层；专注于代理弹性、工具调用防护栏（guardrails），以及管理“推理块（reasoning block）”的流式传输复杂性。
*   **微调 (Unsloth)：** 开发者工具；专注于简化从训练到 GGUF 推理制品的转换流程。

#### 6. 趋势信号
*   **“思维链（Thinking）”块挑战：** 在文本生成前输出“思考”过程的推理模型（Claude/Gemini/DeepSeek）正在导致网关（LiteLLM）和引擎（vLLM）出现流式传输伪影。预计很快会出现大量“思维感知（Thought-aware）”响应解析标准。
*   **确定性危机：** 依赖 `temperature=0` 来获取结构化输出的开发者目前面临高风险回归问题。如果你的智能体循环需要比特级（bit-perfect）的输出一致性，请锁定引擎版本，直到当前的批处理不变性 Bug 在上游被修复。
*   **API 整合：** 行业正迅速向模型引擎的 `api.v1` gRPC 标准靠拢。基础设施团队应优先考虑支持此标准的平台，因为旧有的专有路径正被积极弃用，以实现更纯净的多设备调度。
*   **智能体延迟：** 从简单聊天向智能体工作流的转变，正促使“HiCache”和“上下文并行（Context Parallelism）”的需求增加，以避免在每一轮中重新计算共享系统提示词前缀带来的巨大性能损失。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 摘要：2026-11-03

### 1. 今日亮点
vLLM 生态目前正全力解决跨多种硬件（SM120/Blackwell、RDNA3 和 GB200）推理中的非确定性问题。开发重点在于稳定 `VLLM_BATCH_INVARIANT` 模式，并针对高端 NVIDIA 和 ROCm 基础设施上的最新一代 DeepSeek-V4.1-Flash 及 MoE 模型进行关键性能优化。

### 2. 版本发布与重大变更
* **v0.33.0**：正式版现已上线。包含重大的架构更新和广泛的模型支持。
    * [v0.33.0 发布](https://github.com/vllm-project/vllm/releases/tag/v0.33.0)

### 3. 新模型与硬件支持
* **模型新增**：
    * **Reflection Beam-1.0** (501B MoE)，支持 DFlash2 [#62074](https://github.com/vllm-project/vllm/pull/62074)。
    * **Yandex AliceAI-Foundation-80B-A3B** [#57963](https://github.com/vllm-project/vllm/pull/57963)。
    * **Recursive Flint** (40B MoE) [#62938](https://github.com/vllm-project/vllm/pull/62938)。
    * **Unlimited-OCR-2** (支持 DASH attention) [#64016](https://github.com/vllm-project/vllm/pull/64016)。
* **硬件/后端**：针对 NVIDIA Blackwell (SM120/121) 和 ROCm MI350X/gfx950 环境进行持续改进。

### 4. 性能与优化
* **投机采样 (Speculative Decoding)**：新增 PR，通过逆累积分布函数 (Inverse CDF) 实现融合马尔可夫采样循环，以加速 DSpark/DFlash 工作流 [#64442](https://github.com/vllm-project/vllm/pull/64442)。
* **内存/KV 管理**：引入 `--draft-kv-pool`，为草稿模型提供隔离的内存区域，减少资源争用 [#64611](https://github.com/vllm-project/vllm/pull/64611)。
* **效率**：新增用于单次多候选评分的 segment attention 布局（优化交叉编码器/重排序器） [#65268](https://github.com/vllm-project/vllm/pull/65268)。

### 5. 稳定性与回归问题
* **[高] DeepSeek-V4.1-Flash 在 SM120 上的问题**：用户反馈在使用 `--enforce-eager` 时解码吞吐量极低且 CUDA graph 损坏。这是 Blackwell 硬件的紧急优先级事项 [#56892](https://github.com/vllm-project/vllm/issues/56892)。
* **[高] 批次不变性 (Batch Invariance) 失效**：多份报告显示在 `temperature=0` 且启用 `VLLM_BATCH_INVARIANT=1` 时出现非确定性输出。受影响架构包括 Qwen3.8-Flash-Next [#54521](https://github.com/vllm-project/vllm/issues/54521) 和 DeepSeek-V4-Flash [#53257](https://github.com/vllm-project/vllm/issues/53257)。
* **[中] ROCm 引擎挂起**：在 MI350X 上使用 Muse Spark 时，`SimpleCPUOffloadConnector` 导致死锁（0 tok/s） [#65190](https://github.com/vllm-project/vllm/issues/65190)。
* **[中] FlashInfer 自动调优**：内核预热在缓存命中时存在竞态条件 [#65148](https://github.com/vllm-project/vllm/pull/65148)。

### 6. 对应用开发者的影响
* **确定性当前较为脆弱**：如果您的应用依赖于严格的输出一致性（例如结构化提取、Agent 推理循环），请注意 `VLLM_BATCH_INVARIANT=1` 在多个模型上正经历回归。在投入生产环境前，请务必彻底测试您的特定模型/硬件组合。
* **优化评分**：如果您正在构建进行大量交叉编码或重排序的搜索或 RAG 系统，新的 segment attention 布局 [#65268](https://github.com/vllm-project/vllm/pull/65268) 通过消除冗余的前缀编码，有望带来显著的吞吐量提升。
* **DeepSeek V4.1**：如果正在迁移到最新的 "Flash" 变体，请确保关注有关 Blackwell (SM120) 硬件上 CUDA graph 稳定性的公开问题，在修复补丁合入上游之前，您可能需要避免使用某些 eager 模式配置。

---

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 摘要：2026-11-03

### 1. 今日重点
SGLang 继续积极扩展其后端无关架构，在标准化基于 Rust 的路由器与处理器组件的 `api.v1` gRPC 契约方面取得了重大进展。生态系统目前正大力投入于 NPU (Ascend) 和 AMD (MI355X/gfx950) 的优化，同时也在推动改进推测解码（speculative decoding）逻辑，以提升混合负载的稳定性。

### 2. 发布与重大变更
*   **v0.5.23 发布：** 一个重要的维护里程碑，汇集了来自 257 位贡献者的 1,007 个 PR。[查看发布](https://github.com/sgl-project/sglang)
*   **API 整合：** RFC [#45816](https://github.com/sgl-project/sglang/issues/45816) 正在进行中，旨在将所有生成任务统一到共享的 Rust `api.v1.Generate` 模式下，并弃用旧的运行时路径。

### 3. 新模型与硬件支持
*   **模型新增：** 增加了对 **Muse Spark Open** (LLM/VLM) 和 **Beam-1.0** (LLM/VLM) 的支持。
*   **NPU/Ascend：** PR [#48030](https://github.com/sgl-project/sglang/pull/48030) 在 Ascend NPU 上启用了可中断的预填充（prefill）图；PR [#40825](https://github.com/sgl-project/sglang/pull/40825) 为 Kimi-K3 增加了解码上下文并行（DCP）支持。
*   **AMD (ROCm)：** PR [#47398](https://github.com/sgl-project/sglang/pull/47398) 为 `gfx1250` 上的 W4A8 模型引入了一种混合 MoE 策略（FlyDSL + Gluon）。

### 4. 性能与优化
*   **推测解码：** 正在积极推进“自适应推测解码”路线图 [#23705](https://github.com/sgl-project/sglang/issues/23705)，以防止在低接受率阶段出现计算浪费。
*   **MoE 效率：** 多项 PR ([#47552](https://github.com/sgl-project/sglang/pull/47552), [#47553](https://github.com/sgl-project/sglang/pull/47553)) 优化了路由专家缓存管理，跳过了非输出 rank 上冗余的设备缓冲区拷贝——这对 GB300 等内存受限的部署至关重要。
*   **HiCache：** PR [#45205](https://github.com/sgl-project/sglang/pull/45205) 为 AMD 上的 DSA DCP 模型启用了 HiCache，解决了高并发智能体负载期间的内存瓶颈。

### 5. 稳定性与回归
*   **[高] Mamba/KDA 内存 OOM：** 问题 [#47916](https://github.com/sgl-project/sglang/issues/47916) 报告在混合架构的并行接入突发负载下，`MambaPool` 会出现 OOM 错误。
*   **[中] MoE 路由回归：** 问题 [#47501](https://github.com/sgl-project/sglang/issues/47501) 指出，由于 FP8 内核路由开销，Qwen3.8-Flash-Next 在 GB200 上出现了 5% 的延迟回归。
*   **[低] 不稳定的测试：** CI 基础设施持续不稳定，特别是涉及 `/sglang-pr-babysit` 工作流的部分；追踪问题：[#42752](https://github.com/sgl-project/sglang/issues/42752)。

### 6. 对应用开发者意味着什么
*   **智能体（Agentic）负载：** 如果您的应用依赖高并发的智能体流程，请持续关注 `HiCache` 和 `DCP` (Decode Context Parallelism) 相关的 PR。这些功能目前正在进行优化，以防止在共享前缀被驱逐时出现过度的预填充重跑。
*   **部署迁移：** 向 `api.v1` 的过渡正在加速。构建自定义调度器的开发者应优先转向 Rust 服务器中定义的 gRPC `api.v1` 接口，以确保与未来引擎架构更新的兼容性（问题 [#38075](https://github.com/sgl-project/sglang/issues/38075)）。
*   **确定性：** 需要严格可复现输出的用户请注意问题 [#39597](https://github.com/sgl-project/sglang/issues/39597)，该问题指出在启用 FlashInfer 自动调优时，贪婪解码（greedy decoding）结果可能无法复现。

---

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 摘要：2026-11-03

### 1. 今日亮点
生态系统正大力推进对专用架构的支持，集成了 **Clover MoE** 和 **Pocket TTS**。基础设施方面，重点在于完善用于多序列工作负载的统一注意力掩码（unified attention masks），并针对近期出现的回归问题和内存管理问题对 Vulkan 和 SYCL 后端进行稳定性修复。

### 2. 发布与重大变更
* **Release b12061 – b12048**：一系列集中于后端强化和模型支持的发布。
* **API 清理**：上下文设置器的简化（`#29730`）已合并，旨在精简开发者与 llama 上下文的交互方式。
* **Apple 平台**：所有 Apple 平台现在默认使用 `vm_allocate` 进行内存管理，替代了 `posix_memalign`，以提高主机缓冲区（host-buffer）的稳定性（`#31437`）。

### 3. 新模型与硬件支持
* **Clover MoE**：增加了对纯 AR Clover MoE 模型的支持，包括 GGUF 转换和混合注意力辅助器（`#31306`）。
* **Pocket TTS**：增加了对 PocketTTS 语音的支持，无需语音克隆，直接利用预定义的 KV 状态（`#31429`）。
* **Nemotron 3.5 Transcribe**：正在集成 NVIDIA 最新的 SALM 模型，以支持离线多语言转录（`#31471`）。
* **Vulkan/SYCL**：持续致力于将 `TOP_K_MASK` 引入 Vulkan（`#31544`），并为 OpenCL 引入了初步的 `IQ4_XS` 支持（`#31339`）。

### 4. 性能与优化
* **注意力掩码**：通过 `llm_attn_mask` 和 `kv_rows` 改进了多序列处理的统一 KV 缓存（`#29510`）。
* **SYCL 吞吐量**：在 Intel Arc Pro B70s 上优化了 `ggml_sycl_comm_exchange`，张量提示词评估速度**提升了 19%**，且困惑度（perplexity）无任何衰减（`#30956`）。
* **MoE 缓存**：PR `#31233` 引入了用于 MoE 模型的混合 LRFU/MQ 缓存，据报告，与当前的 SLRU 实现相比，解码速度提升了 **6–7%**，VRAM 上传次数减少了 8%。
* **Gemma 4 优化**：针对 Gemma-4 (E2B/E4B) 发现了巨大的预填充（prefill）收益，通过跳过对 KV 缓存无贡献层的计算实现（`#31356`）。

### 5. 稳定性与回归
* **Vulkan 构建失败**：`#27512` 中引入的一个严重构建回归（与 OCP FP8 支持相关）导致在 Linux 上使用较新的 GCC/Clang 编译器时编译失败。**修复方案：** `#31454`。
* **SYCL/内存管理**：用户反馈在 Intel OneAPI 2026.2.0 上出现段错误（`#31064`），以及在 SYCL 上使用 `--cpu-moe` 时多 GPU 吞吐量崩溃（`#31510`）。
* **投机解码（Speculative Decoding）**：量化目标模型与 bf16 模型在贪婪采样输出上的偏差仍是高优先级调查事项（`#25618`）。

### 6. 对应用开发者的意义
* **智能体开发者**：改进后的 MoE 专家缓存逻辑（如果合并）将显著降低部署大规模 MoE 模型（如 Nemotron/Clover 系列）时的 VRAM 开销。
* **工具调用（Tool Calling）**：如果您正在使用 Qwen3-Coder 或 Nemotron 模型，请关注 PR `#30193`，该 PR 解决了 JSON 工具参数顺序强制执行的问题，这是智能体 LLM 流水线中的常见痛点。
* **转录流水线**：密切关注 `Nemotron 3.5 Transcribe` 的集成（`#31471`）；这很可能成为端侧智能体应用中云端语音转文字（STT）的高性能本地替代方案。
* **生产稳定性**：Apple Silicon 上转向 `vm_allocate` 以及 Vulkan 构建回归的修复对于 CI/CD 流水线至关重要。请确保您的构建环境已同步至最新提交，以避免这些特定硬件导致的“坑”。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

### Ollama 基础设施摘要：2026-11-03

#### 1. 今日重点
过去 24 小时的重点在于完善本地推理与新兴的“Ollama Cloud”生态系统之间的交互，同时对套接字通信和调度器逻辑等基础设施内部组件进行了关键改进。开发者提交的集成 PR 数量激增，这标志着 Ollama 作为“本地到云端”抽象层标准的地位在持续增强。

#### 2. 发布与重大变更
*   **无新发布**：过去 24 小时内无新版本发布。
*   **文档更新**：`ollama cp` 和 `ollama push` 命令现已正式写入 CLI 参考文档 ([PR #19466](https://github.com/ollama/ollama/pull/19466))。

#### 3. 新模型与硬件支持
*   **MiMo V2.6**：MiMo V2.6 模型家族的支持已提交测试 ([PR #19400](https://github.com/ollama/ollama/pull/19400))。
*   **Rockchip NPU**：社区对 RK3588/RK3576 NPU 支持的需求强烈 (18 👍) ([Issue #15393](https://github.com/ollama/ollama/issues/15393))。
*   **Vulkan**：用户反映 Intel/Windows 系统缺乏原生的 Vulkan 支持，导致了不必要的 CUDA 驱动臃肿 ([Issue #19474](https://github.com/ollama/ollama/issues/19474))。

#### 4. 性能与优化
*   **Unix Domain Sockets**：引入了一个重要的 PR，支持通过 `OLLAMA_HOST=unix:///path` 进行本地 IPC，从而减少纯本地部署场景下的 TCP/IP 开销 ([PR #19467](https://github.com/ollama/ollama/pull/19467))。
*   **调度器驱逐**：改进了驱逐逻辑，以更好地优先处理小型、空闲的运行实例，从而确保新请求能适配在 80% 的 VRAM 阈值内 ([PR #19449](https://github.com/ollama/ollama/pull/19449))。
*   **日志记录**：一个待处理的 PR 旨在过滤按请求生成的 `llama-server` 日志，避免在标准运行日志中出现“槽位记账 (slot bookkeeping)”相关的冗余信息 ([PR #17913](https://github.com/ollama/ollama/pull/19467))。

#### 5. 稳定性与回归问题
*   **VRAM 预测错误 (高优先级)**：`PredictServerVRAM` 中的一个 Bug 会导致针对 Qwen3.5 等混合架构（SSM/循环模型）模型时，对 KV 缓存需求的估算偏高 4-8 倍，从而引发激进且不必要的运行实例驱逐 ([Issue #19463](https://github.com/ollama/ollama/issues/19463))。
*   **混合注意力加载**：由于缺少层映射 (layer projections)，Qwen3.8-27B GGUF 目前无法初始化 ([Issue #19459](https://github.com/ollama/ollama/issues/19459))。
*   **Ollama Cloud 访问**：用户反馈付费 API 访问在支付成功后仍无法使用 ([Issue #19461](https://github.com/ollama/ollama/issues/19461))。

#### 6. 对应用开发者的意义
*   **架构策略**：如果您正在基于 Qwen3.5 或其他混合架构模型构建智能体工作流，在 VRAM 预测 Bug ([Issue #19463](https://github.com/ollama/ollama/issues/19463)) 修复之前，可能会遇到内存管理方面的冲突。
*   **云端集成**：代码库正积极向与远程模型的更紧密集成方向演进。如果您正在构建需要发现并展示模型而无需手动拉取的开发前端，请关注 [PR #19153](https://github.com/ollama/ollama/pull/19153)（云模型列表功能）。
*   **工具/智能体**：诸如 **Ultimate Assistant** 和 **DGC** 等新的社区工具正在集成 Ollama；如果您也在构建自己的工具，建议使用 `ollama ls --cloud` 发现模式，以保持与最新接口标准的一致性。
*   **OpenAI 兼容性**：项目正在加强其兼容层，包括计划使响应 ID 具有唯一性，以满足各种 SDK 的更严格要求 ([PR #19401](https://github.com/ollama/ollama/pull/19401))。

---

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 基础设施摘要 - 2026-11-03

### 1. 今日重点
今日工作重心在于稳定推理模型的过渡，并增强代理在高并发负载下的韧性。核心任务包括解决 Claude 和 Gemini 模型中“思考”（thinking）块流式传输的异常，以及通过改进用户 ID 校验和预算计数器同步来提高代理管理 API 的可靠性。

### 2. 版本发布与破坏性变更
*   **过去 24 小时无新版本发布**。
*   **破坏性变更说明：** PR [#41011](https://github.com/BerriAI/litellm/pull/41011) 对守卫（guardrails）引入了破坏性变更，现在强制在 `/v1/messages` 和 `/v1/responses` 端点上执行 `tool_permission` 检查，而此前仅对标准的聊天补全工具调用进行验证。

### 3. 新模型与硬件支持
*   **OpenAI Realtime：** 增加了对 OpenAI 新音频模型的初步支持，为 OpenAI 和 Azure 后端启用了实时翻译和流式转录功能（PR [#35600](https://github.com/BerriAI/litellm/pull/35600)）。
*   **Modelsell：** 现已作为原生支持的 OpenAI 兼容提供商加入（Issue [#34858](https://github.com/BerriAI/litellm/issues/34858)）。

### 4. 性能与优化
*   **支出计数器锁：** 修复了一个关键问题，即冷启动代理的高并发请求会因冗余的支出计算而触发大量的 422 错误；现已确保每个进程只初始化一次支出计数（PR [#47676](https://github.com/BerriAI/litellm/pull/47676)）。
*   **Token 计数效率：** 增加了管理灵活性，允许手动将分词器（tokenizer）映射到部署，使用户能够绕过昂贵且易出错的提供商端 Token 计数调用（PR [#47679](https://github.com/BerriAI/litellm/pull/47679)）。

### 5. 稳定性与回归问题
*   **推理流式传输（高严重性）：** 多份报告（#30765, #25214）证实，流式端点在从 `thinking` 块过渡到标准文本时会丢失第一个文本块，特别是影响 Claude 和 Bedrock 推理模型。
*   **工具/架构静默丢失（中严重性）：** 有报告指出，在使用 `input_schema` 对比 `parameters` 时，工具参数会被丢失（Issue [#35685](https://github.com/BerriAI/litellm/issues/35685)）；此外，当 `response_format` 为 JSON 时存在工具强制调用的错误（PR [#49696](https://github.com/BerriAI/litellm/pull/49696)）。
*   **Gemini 回退（已解决）：** 关于路由（Router）回退至 Gemini 时出现的“Corrupted thought signature”错误（Issue [#32140](https://github.com/BerriAI/litellm/issues/32140)），已通过 PR [#33471](https://github.com/BerriAI/litellm/pull/33471) 移除外部签名的方式解决。
*   **并发崩溃（中严重性）：** 解决了在高负载下因字典突变（mutation）导致的 `safe_deep_copy` 和 `safe_dumps` 崩溃问题（Issue [#34471](https://github.com/BerriAI/litellm/issues/34471)）。

### 6. 对应用开发者的影响
*   **智能体开发者：** 如果你正在构建使用 Anthropic 风格推理模型的智能体，请注意流式传输的不稳定性；建议实现防御性逻辑，以处理“思考”过程结束后的首个 Token 输出。
*   **代理运营商：** 如果你正在管理多个用户部署，请检查你的 `tool_permission` 配置。此前适用于 `/v1/chat/completions` 的现有守卫规则现在将应用于所有消息端点，这可能会导致遗留工具调用出现意外的 400 错误。
*   **Codex/LLM 开发工作流：** 团队正在显著扩大针对 Codex 风格自主智能体的端到端（E2E）测试覆盖范围（PR [#49386](https://github.com/BerriAI/litellm/pull/49386), [#49389](https://github.com/BerriAI/litellm/pull/49389)），这表明未来将进一步强化对长时间运行、文件编辑类智能体任务的支持。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 基础设施摘要：2026-11-03

### 1. 今日要点
Unsloth 开发周期的核心在于扩展 **Decision API** 生态系统，并强化 Studio 在复杂训练目标下的表现。目前的开发重点集中在完善 GRPO/DPO 工作流，并确保模型训练与部署产物之间实现更紧密的集成。

### 2. 发布与重大变更
*   **过去 24 小时内无新版本发布。**
*   **API 配置：** 已提出一项针对全局 Token 使用限制的启用机制 (#16486)，旨在为跨会话提供成本和硬件资源消耗限制。

### 3. 新模型与硬件支持
*   **LFM3 (1.7B) 支持：** 已发起功能请求以支持新的 LiquidAI LFM3 骨干网络，该网络以其极高的表达能力著称 (#15588)。
*   **AMD/ROCm 热修复：** 正在持续改进针对 RX 系列 GPU 的内核兼容性，特别是在混合设备配置下解决 `ROCm error: invalid kernel file` 崩溃问题 (#16513)。
*   **扩散模型 (Diffusion LLMs)：** 集成了 Inception 的 "Mercury" 扩散模型，可正确处理实时流式传输状态 (#16508)。

### 4. 性能与优化
*   **MLX 推理加速 (Speculative Decoding)：** 正在推进 PR #16441，旨在为复杂回复类型（工具调用、视频、受限语法和重度 LoRA 推理）启用推理加速。
*   **API 遥测：** Studio 现在通过在流式传输块中注入 llama-server 风格的计时元数据，为外部 API 提供商展示 tok/s 指标 (#16506)。
*   **启动延迟：** 提议的功能 (#16469) 将 ML 预热（硬件检测、量化预检查）设为可选，从而显著缩短不需要预热内核的用户的冷启动时间。

### 5. 稳定性与回归问题
*   **内存管理（高优先级）：** 报告显示桌面应用在使用后存在持续的内存泄漏（约 200-400MB），目前尚无明确的清理机制 (#14487)。
*   **Studio 推理冲突：** 识别到严重 bug：当一个模型正在生成时加载第二个模型会失败，原因是关于内存释放的错误报告不准确 (#16436)，以及运行中的任务会被静默取消 (#16479)。
*   **训练/数据集故障：** 改进了 Decision API 训练的错误报告 (#16498)，以避免在底层数据集无效时执行大规模模型下载 (19-55GB)。
*   **聊天模板：** 已提交针对 DeepSeek-V4.1 Flash (#15285) 和 Mistral Small 4 推理水平对齐 (#16502) 的修复程序。

### 6. 对应用程序开发者的意义
*   **推理模型 (GRPO)：** 如果你正在使用 Unsloth 构建基于 GRPO 的训练，请关注相关 PR 堆栈 (#12601, #12995, #13000)。框架正向基于 Python 的奖励脚本和沙盒执行方向转变，这将支持更复杂、非静态的奖励建模。
*   **Decision API：** 使用 Decision API 的开发者应注意，系统正趋向于更透明的消耗指标。通过自定义连接 (#16505) 请求 `timings` 和使用数据的能力正在增强，从而能够更好地监控智能体循环中的成本。
*   **微调生命周期：** 新的集成允许 Laya 微调模型直接从 GGUF 导出版本进行回复 (#16511)，简化了从训练到生产部署的路径。开发者应确保更新其导出流水线，以便在 llama.cpp 后端中使用这些 GGUF 产物。

</details>

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*