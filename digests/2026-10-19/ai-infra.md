# AI 基础设施日报 2026-10-19

> 生成时间: 2026-10-19 04:26 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

## AI 基础设施生态分析 (2026-10-19)

### 1. 生态概览
AI 基础设施领域目前处于“超专业化”状态，在高并发生产环境服务（vLLM, SGLang）与便捷的本地/边缘运行环境（Ollama, llama.cpp）之间呈现出明显的二元分化。我们观察到全行业正推动向“原生性能”转型——逻辑实现从解释型 Python 转为 Rust 桥接和模型专用的自定义 CUDA 内核。优先级已从基础的模型兼容性转向通过复杂的内存管理（KV 缓存）实现 GPU 利用率最大化，并通过内核融合（Kernel Fusion）减少开销。

### 2. 活动对比
*注：活动指标基于所提供的 24 小时窗口摘要估算。*

| 项目 | PR 活动 | 问题/缺陷 | 发布状态 |
| :--- | :--- | :--- | :--- |
| **vLLM** | 极高 | 高 (关键回归) | v0.32.0 (稳定版) |
| **SGLang** | 高 | 高 (内存/损坏) | v0.5.22 (稳定版) |
| **llama.cpp** | 中 | 中 (回归) | 频繁 (b117xx) |
| **Ollama** | 中 | 高 (稳定性/OOM) | N/A (维护中) |
| **LiteLLM** | 高 | 中 (侧重安全) | v1.107.0-rc.1 |
| **Unsloth** | 中 | 中 (内存) | N/A |

### 3. 模型支持竞赛
“每周一模型”的集成竞赛主要由 **vLLM** 和 **SGLang** 主导，它们专注于 DeepSeek-V4.1、Kimi-K3 和 GLM-5.x 等旗舰架构。
*   **vLLM：** 在硬件专用内核优化（MI355X, SM120）方面处于领先地位。
*   **SGLang：** 在 MoE 和 Multi-Head Chunked (mHC) 模型的深层架构融合方面保持优势。
*   **llama.cpp：** 在异构硬件支持（Hexagon NPU, Intel Arc/Battlemage, ARM64）方面保持领先，优先考虑跨设备可用性而非绝对吞吐量。
*   **Ollama：** 优先考虑“编程助手（Coding Agents）”的易用性以及对具有视觉能力的新检查点（checkpoints）的快速集成。

### 4. 性能前沿
*   **内核融合 (Kernel Fusions)：** vLLM 和 SGLang 正趋同于 RMSNorm 和 MoE 融合，以最小化内核启动开销。
*   **KV 缓存管理：** 该领域正向“可编程/可管理 KV 缓存”（vLLM/Unsloth）方向发展。管理并发请求间的上下文，现已成为智能体（agentic）应用的首要瓶颈。
*   **量化：** 向 FP8 和专用线性内核（Marlin）的投入巨大，vLLM 正在标准化加载“树外（out-of-tree）”块缩放（block-scaled）内核的能力。
*   **语言转型：** **LiteLLM** 正在引领其请求处理桥接层从 Python 到 Rust 的大规模转型，旨在降低网关层的毫秒级延迟。

### 5. 层级定位
*   **服务引擎 (vLLM, SGLang)：** “重量级选手”。专注于极限吞吐量、多 GPU 编排，以及企业级部署的低延迟服务。
*   **本地运行时 (Ollama, llama.cpp)：** “多面手”。专注于硬件多样性（NPU/CPU/GPU）和开发者可访问性。
*   **网关层 (LiteLLM)：** “协调器”。将自身定位为多模型路由、成本追踪和安全的标准，目前正转向 Rust 以实现性能对齐。
*   **训练/微调 (Unsloth)：** “效率层”。专注于减少训练内存占用，并通过内核级优化来优化中小型模型的执行。

### 6. 趋势信号
*   **“思考”税：** 具有“思考”能力（如 Qwen3-Coder, OLMo-Think）的模型正在给现有的流式解析器造成压力。开发者必须转向更具防御性、支持标记（tag-aware）的解析逻辑。
*   **安全加固：** 基础设施项目（特别是 LiteLLM）正在迅速实施供应链安全措施（Docker 签名）并修复进程级的信息泄露。
*   **智能体状态管理：** `/v1/systemone` (vLLM) 和“可编程 KV 缓存”的兴起表明，业界正在为维护长生命周期、复杂状态的智能体做准备，这需要引擎层对会话持久性的支持。
*   **行动建议：** 应用开发者应优先考虑**成本和内存的可观测性**（LiteLLM/SGLang），并摆脱传统的 wheel 锁定，因为生态系统正向轻量级、无扩展（extension-free）的二进制文件（Unsloth）发展。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 摘要：2026-10-19

### 1. 今日亮点
随着 **v0.32.0** 的发布，vLLM 生态系统正朝着结构化标准化的方向迈进，引入了通过 `/v1/systemone` 端点进行结构化状态管理的原生支持。与此同时，工程重点已大幅转向针对特定模型性能的“专用解码（Specialized Decodes）”，并通过新的 RFC 和实现 PR，致力于为 MI355X 和 Blackwell (SM120) 架构优化内核。

### 2. 发布与重大变更
*   **v0.32.0 已发布：** 此重大版本更新包含 814 个提交，并引入了 `POST /v1/systemone` 端点以管理结构化状态（choice, noul, score）。详见 [v0.32.0](https://github.com/vllm-project/vllm/releases/tag/v0.32.0)。

### 3. 新模型与硬件支持
*   **Kimi-K3 在 MI355X 上运行：** 已为 ROCm (gfx950) 添加了可选择的专用解码支持，以提升 AMD 硬件上的性能 [PR #60683](https://github.com/vllm-project/vllm/pull/60683)。
*   **FP8 内核注册：** 新增了对树外（out-of-tree）块缩放 FP8 线性内核的注册支持，允许更轻松地集成自定义量化格式 [PR #62026](https://github.com/vllm-project/vllm/pull/62026)。
*   **NVIDIA Nemotron 3.5 ASR：** 已开启功能请求，以支持 600M 参数的多语言流式 ASR 模型 [Issue #47455](https://github.com/vllm-project/vllm/issues/47455)。

### 4. 性能与优化
*   **协作式 Top-K 内核：** `cooperative_topk` 的吞吐量工作取得重大进展，优化了行长度处理以避免冗余的 TMA 流传输，并为 SM100 GPU 启用了 BF16 Logit 读取 [PR #62171](https://github.com/vllm-project/vllm/pull/62171), [PR #62172](https://github.com/vllm-project/vllm/pull/62172)。
*   **GLM/DeepSeek MoE 融合：** 实现了一种新的融合算子，将 GLM-5.x/DeepSeek-V3.2 MoE 的最终步骤（finalize steps）合并入 RMSNorm all-reduce 中，以降低内核开销 [PR #62174](https://github.com/vllm-project/vllm/pull/62174)。
*   **位运算不变性（BI）：** 新的工作确保了 DeepSeek-V4.1-Flash 在复杂的 CUDA 图配置下保持位运算不变 [PR #62365](https://github.com/vllm-project/vllm/pull/62365)。

### 5. 稳定性与回归
*   **严重：Qwen4Exp 崩溃：** 用户报告称 Qwen3.8-Flash-Next 在 v0.32.0 上跨越 262,144 token 边界时会触发 CUDA 非法内存访问 [Issue #62383](https://github.com/vllm-project/vllm/issues/62383)。
*   **高危：KV 串扰：** DeepSeek-V4.1-Flash 部署中的自动前缀缓存（Automatic prefix caching）导致了跨请求的上下文污染。建议：在问题解决前，请使用 `--no-enable-prefix-caching` 运行 [Issue #61160](https://github.com/vllm-project/vllm/issues/61160)。
*   **中危：DeepSeek-V4.1 FlashInfer 内核：** SM120 硬件上缺少 page_block_size=32 的解码内核实例化，导致模型无法正常执行 [Issue #59203](https://github.com/vllm-project/vllm/issues/59203)。

### 6. 对应用开发者的影响
*   **智能体服务（Agentic Serving）：** 新的“可编程 KV 缓存” RFC ([Issue #57103](https://github.com/vllm-project/vllm/issues/57103)) 标志着 vLLM 正转向更好地支持智能体工作负载，即在引擎层面处理会话生命周期管理。
*   **结构化输出：** 如果您正在构建需要严格模式强制执行的 LLM 应用，请查看 v0.32.0 中的 `/v1/systemone` 端点。此外，PR [#49461](https://github.com/vllm-project/vllm/pull/49461) 为语法编译增加了更安全的边界限制，这将提高容器化环境中的稳定性。
*   **性能稳定性：** 对于大规模生产环境，请注意目前向“专用解码” ([Issue #60904](https://github.com/vllm-project/vllm/issues/60904)) 的转变。如果您的工作负载对延迟敏感，请关注模型特定的解码内核，它们正逐渐成为 NVIDIA 和 AMD 硬件上旗舰模型的标准。

---

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 摘要：2026-10-19

### 1. 今日亮点
该项目继续针对 DeepSeek-V4.1 进行激进优化，重点在于改进预填充（prefill）CUDA 图重放以及 MoE 路由逻辑。基础设施团队正在解决关键的稳定性问题，包括语法缓存中的内存泄漏和 CI 运行程序资源耗尽，同时继续为 Blackwell (B200/GB300) 硬件推出扩展的 LoRA 运行时堆栈。

### 2. 发布与重大变更
*   **v0.5.22 发布：** 此版本为重大更新，包含来自 245 位贡献者的 950 个 PR。用户应审阅近期在调度和重叠（overlap）逻辑上的变更，因为该版本已发现若干高优先级稳定性问题。[v0.5.22 发布说明](https://github.com/sgl-project/sglang/releases/tag/v0.5.22)

### 3. 新模型与硬件支持
*   **模型支持：** 新增了 **Clef / Clef Flash** (LLM/VLM) 和 **PPLX-Decider v1/v1.1** 的使用手册。[Clef 使用手册](https://docs.sglang.io/cookbook/autoregressive/Cloudflare/clef)
*   **硬件：** 通过 Marlin 内核，正在积极开发针对 Blackwell 架构 (B200/GB300) 的 NVFP4 支持 ([PR #42888](https://github.com/sgl-project/sglang/pull/42888))。
*   **架构：** 继续针对 DeepSeek-V4.1 进行优化，包括 mHC (Multi-Head Chunked) 优化 ([Issue #42170](https://github.com/sgl-project/sglang/issues/42170))。

### 4. 性能与优化
*   **DeepSeek-V4.1：** 在任意上下文长度下实现可中断的预填充 CUDA 图重放，以防止急切执行（eager execution）([PR #43733](https://github.com/sgl-project/sglang/pull/43733))，并优化了滑动窗口注意力（SWA）缓存复用 ([PR #43009](https://github.com/sgl-project/sglang/pull/43009))。
*   **内存效率：** 语法编译现已使用有界的 LRU 缓存，防止在处理每个请求的唯一 JSON Schema 时耗尽主机内存 ([PR #45087](https://github.com/sgl-project/sglang/pull/45087))。
*   **内核并行化：** 改进了 mHC 模型的小批量后处理，解决了在 CTA 计数较低场景下的利用率不足问题 ([PR #44906](https://github.com/sgl-project/sglang/pull/44906))。

### 5. 稳定性与回归
*   **内存泄漏（高危）：** 在使用动态 JSON Schema 时，无界的编译语法缓存可能导致 RSS 大幅增长 ([Issue #45077](https://github.com/sgl-project/sglang/issues/45077))。目前已有修复方案 ([PR #45087](https://github.com/sgl-project/sglang/pull/45087))。
*   **输出损坏（高危）：** 有报告称，当启用重叠调度器时，NGRAM 推测解码和 FP8 块量化检查点 (SM86) 会出现错误的 token ([Issue #44997](https://github.com/sgl-project/sglang/issues/44997), [Issue #45000](https://github.com/sgl-project/sglang/issues/45000))。
*   **安全性（中危）：** 在 `sgl-model-gateway` 中发现授权绕过漏洞，数据平面密钥被错误地接受用于网格 HA 管理路由 ([Issue #45006](https://github.com/sgl-project/sglang/issues/45006))。

### 6. 对应用开发者的影响
*   **Agent 框架：** 如果你正在动态生成复杂的 JSON Schema，请务必跟踪语法编译带来的内存影响；建议升级至最新提交版本，以利用新的 LRU 缓存边界。
*   **推测解码：** 使用 `speculative_algorithm="NGRAM"` 的用户应保持谨慎，因为现有报告表明，在 v0.5.22 中与重叠调度结合使用时，可能会出现正确性问题。
*   **思考模型（Thinking Models）：** 新的灵活性允许将“思考预算”（thinking budget）与 `--enable-strict-thinking` 解耦，使开发者能够在不强制执行严格的工具调用/EOS 限制的情况下实施严格的思考上限 ([PR #45084](https://github.com/sgl-project/sglang/pull/45084))。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 摘要: 2026-10-19

### 1. 今日要点
工作重心持续聚焦于跨异构后端优化 Flash Attention (FA)，针对 Hexagon NPU 和 Intel Arc/Battlemage GPU 进行了显著改进。在基础设施方面，项目正通过新增的模型特定端点扩展 OpenAPI 合规性，并借助全新的直接磁盘读取行读取器（direct-to-disk row reader）增强内存高效的数据加载能力。

### 2. 发布与重大变更
*   **构建版本 b11718–b11723：** 一系列针对后端稳定性和内核融合（kernel fusion）的快速更新。
    *   [b11723](https://github.com/ggml-org/llama.cpp/releases/tag/b11723): Hexagon FA 改进。
    *   [b11722](https://github.com/ggml-org/llama.cpp/releases/tag/b11722): Hexagon 多流支持。
    *   [b11721](https://github.com/ggml-org/llama.cpp/releases/tag/b11721): CUDA Qwen4exp 融合。
    *   [b11720](https://github.com/ggml-org/llama.cpp/releases/tag/b11720): CPU、CUDA、Vulkan 和 WebGPU 上对非连续 `SUM` 的支持。

### 3. 新增模型与硬件支持
*   **GLM-5.3 Next：** 增加了对 `-sm tensor` 架构的支持 [#30499](https://github.com/ggml-org/llama.cpp/pull/30499)。
*   **量化扩展：** 新的 `IQ_K` 系列（IQ2–IQ6）量化类型正在移植中，以支持跨后端的先进压缩技术 [#30715](https://github.com/ggml-org/llama.cpp/pull/30715)。
*   **Windows ARM64：** 补充了 Windows ARM 架构下缺失的 CPU 后端变体 [#30766](https://github.com/ggml-org/llama.cpp/pull/30766)。

### 4. 性能与优化
*   **Hexagon NPU：** 通过调整 HMX/HVX 交叉阈值并实现掩码块跳过（masked block skipping），改进了 SWA 模型（如 Gemma-4）的 FA 性能 [#30731](https://github.com/ggml-org/llama.cpp/pull/30731)。
*   **SYCL/Intel Arc：** 在 Arc Pro B70 上针对 Q8 反量化大幅提升了提示词评估速度，带宽达到约 636 GB/s [#30775](https://github.com/ggml-org/llama.cpp/pull/30775)。
*   **CUDA：** 通过利用 lane-packed 行，优化了小 K 操作的 NVFP4 MMVQ 路径 [#30788](https://github.com/ggml-org/llama.cpp/pull/30788)。
*   **Vulkan：** 正在进行根据设备能力动态推导 FA 切片形状（tile shapes）的工作，以解决 Battlemage (BMG) 架构上性能不佳的问题 [#30351](https://github.com/ggml-org/llama.cpp/pull/30351)。

### 5. 稳定性与回归问题
*   **MTP/推测解码（高）：** 多份报告指出 Gemma 4 在使用 MTP 时会出现崩溃，且量化目标中可能存在 Logit 偏差。
    *   [#30698](https://github.com/ggml-org/llama.cpp/issues/30698): Gemma 4 启动时的回归问题。
    *   [#25618](https://github.com/ggml-org/llama.cpp/issues/25618): 使用量化模型进行贪婪采样时的输出偏差。
*   **后端稳定性（中）：** 
    *   [#28353](https://github.com/ggml-org/llama.cpp/issues/28353): Vulkan 多 GPU 回归导致服务器挂起。
    *   [#28676](https://github.com/ggml-org/llama.cpp/issues/28676): Windows 上 HIP/ROCm 多 GPU 环境下的数据损坏。
    *   调度程序哈希集耗尽（高并发推测解码崩溃的主要原因）的修复方案目前正在处理中 [#28972](https://github.com/ggml-org/llama.cpp/pull/28972)。

### 6. 对应用开发者意味着什么
*   **API 标准化：** 随着 `GET /v1/models/{model}` [#30789](https://github.com/ggml-org/llama.cpp/pull/30789) 的加入，您的编排层现在可以更可靠地查询特定模型的元数据，使 `llama-server` 进一步向 OpenAI API 完全兼容迈进。
*   **内存管理：** 新的 `-lzm direct` (延迟加载) 模式允许直接从磁盘流式传输大型模型嵌入，而非将所有内容预先映射到内存中。强烈建议在内存受限的环境，或同时服务多个大型模型的系统中使用该模式 [#30772](https://github.com/ggml-org/llama.cpp/pull/30772)。
*   **风险评估：** 如果您正在运行高性能推测解码或 MoE 架构，请警惕近期 Windows/HIP 和 Intel SYCL 后端上的构建回归。请确保您的 CI 流水线在部署前专门针对您的生产环境模型量化版本验证过 `b117xx` 构建。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

## Ollama 基础设施摘要：2026-10-19

### 1. 今日重点
今天的开发工作主要集中在完善 **MLX runner**，并扩展 `ollama launch` 生态系统以支持第三方编码助手（coding agents）。工程团队目前的工作重心主要分为两部分：修复 ROCm/CUDA 后端的一系列关键稳定性问题，以及改进对模型架构元数据的健壮性处理，特别是针对较新的 Qwen 3.5 和支持视觉能力的检查点（checkpoints）。

### 2. 发布与重大变更
*   **过去 24 小时内无新版本发布。**
*   **API 文档：** 已提交一项 PR ([#19117](https://github.com/ollama/ollama/pull/19117))，旨在将指向 `docs.ollama.com/api` 参考手册的链接标准化，标志着 Ollama 正从旧的基于 Markdown 的文档体系过渡。

### 3. 新模型与硬件支持
*   **编码助手集成：** 为 [Mux](https://github.com/jchristn/Mux) ([#19125](https://github.com/ollama/ollama/pull/19125)) 和 [Talos](https://talos-agent.ch) ([#18093](https://github.com/ollama/ollama/pull/18093)) 提交的 PR 旨在将其加入 `ollama launch` 命令，从而简化“助手-模型”的配置流程。
*   **MLX 架构灵活性：** 多个 PR ([#19133](https://github.com/ollama/ollama/pull/19133), [#19130](https://github.com/ollama/ollama/pull/19130)) 允许使用那些配置中仅提供 `model_type` 而非正式 `architectures` 列表的 MLX 检查点。
*   **瑞芯微 (Rockchip) NPU：** 社区对于通过现有开源项目如 `rkllama` ([#15393](https://github.com/ollama/ollama/issues/15393)) 官方支持瑞芯微 NPU (RK3588/RK3576) 的呼声依然很高。

### 4. 性能与优化
*   **MLX 内核调度：** PR [#19131](https://github.com/ollama/ollama/pull/19131) 在 Metal 上启用了适用于 float16 的融合线性注意力核（fused linear-attention kernels），专门针对 Qwen 3.5 和 Qwen4 架构提升性能。
*   **YaRN 缩放：** 针对 Qwen3 运行时的修复 ([#19134](https://github.com/ollama/ollama/pull/19134)) 确保了 YaRN rope 缩放被正确应用，防止模型默认回退到普通 RoPE，从而保证在长序列长度下的准确性。
*   **分布式推理：** 基于 RPC 的分布式推理 ([#4643](https://github.com/ollama/ollama/issues/4643), [#10844](https://github.com/ollama/ollama/pull/10844)) 正在持续推进，旨在实现模型在多台机器间的跨节点扩展。

### 5. 稳定性与回归
*   **[关键] CUDA/Blackwell 稳定性：** 用户报告在 RTX 5060 Ti GPU 上加载 flash-attention 内核时会出现 "shared object initialization failed" 错误 ([#19122](https://github.com/ollama/ollama/issues/19122))。
*   **[高] ROCm 回归：** Ollama 0.35.1 在 RDNA1 (gfx1010) 硬件上会因 `GGML_ASSERT(max_blocks_per_sm > 0)` 错误而崩溃 ([#19075](https://github.com/ollama/ollama/issues/19075))。
*   **[高] Jetson 推理回归：** v0.40.5 在 Jetson Orin Nano 上表现出显著的性能回归，包括 OOM/NvMap 错误以及严重的性能下降（对比 v0.35.1，速度降至 2 tok/s）([#19115](https://github.com/ollama/ollama/issues/19115))。
*   **[中] 云端点可靠性：** 有报告称即便持有有效的 Pro 订阅，`Ollama Cloud` 端点仍会出现无响应或返回 429 错误的情况 ([#19111](https://github.com/ollama/ollama/issues/19111))。

### 6. 这对应用开发者意味着什么
*   **提示词缓存不一致：** 请注意，工具模式架构中键顺序的不一致（例如在 `qwen3-coder:30b` 中）可能导致“缓存未命中”，从而在生产环境中降低延迟 ([#18430](https://github.com/ollama/ollama/issues/18430))。
*   **流式处理逻辑：** 如果你正在为支持“思考”（thinking）标签的模型（如 Qwen3/OLMo-Think）构建 UI，请确保你的解析器能够妥善处理分块（chunk-splitting）。目前在工具调用后出现 `\n` 位置错误及块被丢弃的问题表明，流式解析器必须对部分 JSON/标签边界采取高度防御性的处理策略 ([#19107](https://github.com/ollama/ollama/issues/19107), [#19109](https://github.com/ollama/ollama/issues/19109))。
*   **随机种子精度：** 使用 API 时请避免使用大于 2^53 的种子（seed），因为内部在将 `options` 转换为 float64 时会导致静默冲突，使得不同的种子产生完全相同的输出 ([#19078](https://github.com/ollama/ollama/issues/19078))。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 动态摘要 | 2026-10-19

### 1. 今日要点
工程重点已大幅转向扩展基于 Rust 的原生推理桥，将主流服务商（Azure、xAI、Fireworks、Databricks）的接入支持移植到 Rust，以降低 Python 的性能开销。同时，针对代理（proxy）的费用跟踪稳定性进行了关键修复，并处理了 Helm 部署中的安全漏洞以及进程级的凭据泄露问题。

### 2. 发布与重大变更
*   **v1.107.0-rc.1 & v1.106.0:** 两个版本均强制要求通过 `cosign` 进行 Docker 镜像签名验证，使用在提交 `0112e53` 中建立的安全密钥。 ([v1.107.0-rc.1](https://github.com/BerriAI/litellm/releases/tag/v1.107.0-rc.1), [v1.106.0](https://github.com/BerriAI/litellm/releases/tag/v1.106.0))

### 3. 新模型与硬件支持
*   **DeepSeek 集成:** 在成本映射表中添加了 `together_ai/deepseek-ai/DeepSeek-V4.1-Flash-1017`。 ([PR #47291](https://github.com/BerriAI/litellm/pull/47291))
*   **Azure 容器定价:** 根据 Azure 最新定价，将代码解释器会话成本更新为 `$0.033`。 ([PR #47292](https://github.com/BerriAI/litellm/pull/47292))

### 4. 性能与优化
*   **原生 Rust 桥扩展:** 正大力推进将 `Responses` 逻辑移至 Rust，已完成对以下服务商的 URL、认证和请求标准化规则的移植：
    *   [Azure OpenAI](https://github.com/BerriAI/litellm/pull/46584)
    *   [xAI & Hosted vLLM](https://github.com/BerriAI/litellm/pull/46586)
    *   [Fireworks AI](https://github.com/BerriAI/litellm/pull/46588)
    *   [Databricks GPT](https://github.com/BerriAI/litellm/pull/46590)
    *   [Bedrock Mantle](https://github.com/BerriAI/litellm/pull/46595)
*   **Rust 流式传输:** 初步实现了对原生 `Responses` 调用流式传输的支持，允许 Rust 将字节直接流回 Python 调用方，且不会中断日志记录或钩子函数（hooks）。 ([PR #46697](https://github.com/BerriAI/litellm/pull/46697))

### 5. 稳定性与回归
*   **安全性 (高):** 代理启动时会将 `DATABASE_URL`（包含密码）泄露到 `/proc/<pid>/cmdline` 中，导致在命令行参数中可见。 ([Issue #47273](https://github.com/BerriAI/litellm/Issue/47273))
*   **安全性 (中):** Helm chart 默认以 root 权限运行 pod 且安全上下文（security context）为空；需要手动进行加固。 ([Issue #40822](https://github.com/BerriAI/litellm/Issue/40822))
*   **正确性 (高):** 费用计数器在并发冷启动时，由于非原子的 `INCRBYFLOAT` 操作导致费用翻倍。目前正通过使用 `SET NX` 来初始化计数器以解决此问题。 ([PR #47245](https://github.com/BerriAI/litellm/pull/47245))
*   **稳定性 (中):** 在未正确配置 MCP 处理程序的情况下调用工具时，`main.py` 会出现 `ModuleNotFoundError: No module named 'mcp'`。 ([Issue #46045](https://github.com/BerriAI/litellm/Issue/46045))

### 6. 对应用开发者的影响
*   **需进行安全审计:** 如果您通过 Helm 部署 LiteLLM 代理，请立即检查您的 `securityContext` 定义，确保程序并非以 root 用户运行。如果您处于多租户节点上，请注意 [#47273](https://github.com/BerriAI/litellm/Issue/47273) 中提到的进程级密码泄露风险。
*   **费用监控:** 如果您在高并发环境中使用 `spend_tracking` 功能，请在 PR [#47245](https://github.com/BerriAI/litellm/pull/47245) 合并前保持谨慎，以避免因竞态条件导致的扣费溢出。
*   **Rust 迁移:** 将服务商快速移植到 Rust 原生桥有望提升高吞吐量应用的延迟表现，但在一致性测试工具 ([PR #46567](https://github.com/BerriAI/litellm/pull/46567)) 完全集成之前，参数过滤规则可能会存在细微差异。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 基础设施摘要：2026-10-19

### 1. 今日亮点
今日的基础设施工作重点在于整合模型执行效率，在 KV 缓存抢占和 Windows ARM64 跨架构支持方面取得了重大进展。团队正在积极精简预构建 wheel 包的体积，以优化启动包大小并提升所有平台上的冷启动性能。

### 2. 发布与重大变更
*   **无正式发布**：过去 24 小时内未发布正式版本。
*   **安全更新**：PR [#14186](https://github.com/unslothai/unsloth/pull/14186) 升级了 `rustls` 和 `quinn-proto` 依赖项，以缓解最近的 RustSec 漏洞预警。

### 3. 新模型与硬件支持
*   **Windows ARM64 沙箱**：PR [#14176](https://github.com/unslothai/unsloth/pull/14176) 在 ARM64 PC 上启用了 Windows 沙箱 (MXC)，解决了 [#13656](https://github.com/unslothai/unsloth/issues/13656) 中报告的兼容性问题。
*   **FLUX.3 Image Klein**：已添加到 Studio 模型选择器中，并提供了优化的 Fast FP8 默认设置 ([#14184](https://github.com/unslothai/unsloth/pull/14184))。

### 4. 性能与优化
*   **KV 抢占**：PR [#10301](https://github.com/unslothai/unsloth/pull/10301) 引入了一种统一的 KV 抢占机制，由 `llama-server` 管理缓存停放，从而实现多个并行聊天会话高效共享资源。
*   **内核路由**：偏好损失和 RL 损失函数（ORPO、CPO、KTO、DPO）现在被路由到 `unsloth-zoo` 融合线性内核，避开了 `tokens x vocab` 的 logit 构建过程，从而节省内存 ([#14185](https://github.com/unslothai/unsloth/pull/14185))。
*   **Wheel 优化**：PR [#14142](https://github.com/unslothai/unsloth/pull/14142) 通过移除不必要的符号和 SASS/PTX 制品，减小了 `causal-conv1d`、`mamba-ssm` 和 `flash-attn` wheel 包的二进制体积；针对混合模型，通过无扩展名的 mamba wheel 进一步进行了优化 ([#14160](https://github.com/unslothai/unsloth/pull/14160))。

### 5. 稳定性与回归
*   **高优先级（内存）**：[#14120](https://github.com/unslothai/unsloth/issues/14120) 报告称，在 macOS M4 Max (64GB) 上运行多个大型 GGUF 模型超过统一内存容量时，会导致宿主机系统崩溃。
*   **高优先级（AMD/ROCm）**：近期更新后，AMD 硬件上的不稳定性报告持续增加（例如 [#14085](https://github.com/unslothai/unsloth/issues/14085), [#14052](https://github.com/unslothai/unsloth/issues/14052)），主要涉及 ROCm 绑定和音频运行时安装问题。
*   **UI/UX 回归**：用户反馈出现聊天输入框消失 ([#13604](https://github.com/unslothai/unsloth/issues/13604)) 以及进度条显示不一致 ([#14061](https://github.com/unslothai/unsloth/issues/14061)) 的问题，均在更新后发现。

### 6. 对应用开发者意味着什么
*   **智能体可移植性**：开发者现在可以通过 UI 使用新的 Skill 导入/导出功能（ZIP 格式），在本地实例之间迁移复杂的智能体行为 ([#14181](https://github.com/unslothai/unsloth/pull/14181))。
*   **资源管理**：如果您正在运行多个并发聊天会话，请密切关注 PR [#10301](https://github.com/unslothai/unsloth/pull/10301) 中即将推出的 KV 抢占功能；这对于在受限 GPU 硬件上维持高吞吐量至关重要。
*   **架构演进**：请注意，团队正在向针对 Mamba-2 混合模型的“无扩展名 (extension-free)”wheel 使用方式过渡。请确保您的 CI/CD 流水线没有严格锁定旧版臃肿的 wheel 包，因为这些包可能会在未来被更优化的 `unsloth-zoo` 版本所取代。

</details>