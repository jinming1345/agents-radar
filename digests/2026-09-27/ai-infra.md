# AI 基础设施日报 2026-09-27

> 生成时间: 2026-09-27 00:50 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

### 基础设施生态分析：2026-09-27

#### 1. 生态概览
当前的 AI 基础设施领域正处于从“整合”向“专业化”转型的关键节点。高性能推理引擎的重心已从通用推理转向针对特定架构的深度优化（例如 MoE、投机采样和混合 KDA 模型）。工程团队一方面在应对下一代硬件（NVIDIA Blackwell GB10、AMD gfx950）的不稳定性，另一方面在强化工具调用（Tool-calling）逻辑，以支持各类自主智能体框架的爆发式增长。整个生态正在分化为：面向性能需求的生产环境后端，以及追求用户体验的本地开发运行时，而可靠的结构化输出/工具调用模式已成为制约发展的关键瓶颈。

#### 2. 活动对比
*注：统计数据为所提供 24 小时摘要中的大致快照。*

| 项目 | 开放问题 | 新提交 PR | 发布状态 |
| :--- | :--- | :--- | :--- |
| **vLLM** | 5 | 4 | 稳定（无发布） |
| **SGLang** | 4 | 7 | 稳定（无发布） |
| **llama.cpp** | 5 | 8 | 活跃 (b11199-b11205) |
| **Ollama** | 7 | 3 | 稳定（无发布） |
| **LiteLLM** | 3 | 5 | 稳定（无发布） |
| **Unsloth** | 4 | 5 | 稳定（无发布） |

#### 3. 模型支持竞赛
*   **vLLM：** 聚焦于 **MiniCPM-V 4.7** 以及与 Qwen 系列架构（3.5, 3.6, 3.8-Flash）的深度集成。
*   **SGLang：** 在 **DeepSeek-V4.1** 和 GLM-5.3-Flash 上处于领先地位，并专门针对 AMD (gfx950) 进行了优化。
*   **llama.cpp：** 保持了最广泛的硬件/模型兼容性，近期增加了对 **Nemotron 3** 和 **Ling 3.0 Flash VL** 的支持。
*   **Ollama/Unsloth：** 主要聚焦于“系统 1”（System 1）推理模型（*Kev, Laya*）和 Llama 3.2 Vision，旨在提升易用性，而非针对大规模集群的性能优化。

#### 4. 性能前沿
*   **内存效率：** 大量工作投入在 **KV Cache 管理**上。vLLM 正在研发解耦的 PP-prefill 技术；SGLang 正在统一滑动窗口与主机内存重分配；llama.cpp 正在改进分块矩阵乘法（Tiled MatMul）和分块机制，以最大限度降低 VRAM 占用。
*   **量化：** FP8 已成为 H100/B200 加速的行业标准，Unsloth 报告称其 block-FP8 内核可带来 4–15 倍的速度提升。
*   **内核优化：** 研发重心在于规避 F32/F16 转换带来的开销（如快速沃尔什-哈达玛变换、分块矩阵乘法）。
*   **分布式推理：** 解耦流水线并行（Disaggregated Pipeline Parallel, PP）是解决“计算集群拆分”延迟问题的核心目标。

#### 5. 层级定位
*   **推理引擎（vLLM, SGLang）：** “生产核心”。定位在高流量、多 GPU 的企业级场景；目前正受困于 Blackwell 架构及统一内存复杂性带来的死锁和 OOM 问题。
*   **本地运行时（llama.cpp, Ollama）：** “开发者边缘”。专注易用性、跨平台硬件支持（WebGPU, Hexagon, SYCL）以及开发体验（桌面端 UX）。
*   **网关/编排（LiteLLM）：** “流量控制器”。专注于安全性（防护栏）、成本管理（用量统计），并将不同模型的差异抽象化，以保证应用层的一致性。
*   **训练/微调（Unsloth）：** “微调实验室”。专注于缩短研究模型到部署之间的差距；正向集成 Studio 式 IDE 工作流转型。

#### 6. 趋势信号
*   **工具调用的脆弱性：** 各大项目（vLLM, Ollama, LiteLLM）均报告了工具调用解析/模式验证方面的关键 Bug。**建议：** 应用开发者应自行实现输出验证层（例如使用 Pydantic/Instructor），而非过度依赖原生引擎的流式输出。
*   **Blackwell 部署风险：** Blackwell (GB10) 生态极不稳定。若计划进行高密度部署，需注意长上下文会话带来的内存增长问题；在 2027 年初稳定性补丁发布前，应避免在关键生产环境中依赖统一内存特性。
*   **智能体的“省略”问题：** 自主智能体（如 Claude Code）在处理模型通过占位符省略文本时，文件编辑回归的风险日益增加。请对所有自动化文件系统操作进行校验和验证。
*   **智能体框架：** 向“系统 1”推理模型的转向表明，行业正从标准的对话补全转向“决策导向”的终端，Ollama 新提出的 `/systemone` API 即是证明。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 工程摘要：2026-09-27

### 1. 今日重点
核心工作依然聚焦于 V1 引擎的稳定性，特别是推测解码（speculative decoding）、前缀缓存（prefix caching）和 MoE 架构之间复杂的交互逻辑。目前正在大力推进针对流水线并行（PP）目标的解耦服务（disaggregated serving）流程优化，并致力于解决 NVIDIA Blackwell (GB10) 和 ROCm 环境中出现的特定平台回归问题。

### 2. 版本发布与重大变更
*   **无。** 过去 24 小时内未发布正式版本。

### 3. 新模型与硬件支持
*   **MiniCPM-V 4.7 支持：** 已提交 PR 以添加对即将发布的 MiniCPM-V 4.7 的支持，该模型采用基于画布的 3D M-RoPE，可提升视频/图像输入的空间推理能力 [#58674](https://github.com/vllm-project/vllm/pull/58674)。
*   **Blackwell (GB10) 基础设施：** 持续处理 aarch64 上原生 SM_121 支持缺失的问题，目前该问题影响 DGX Spark/Acer GN100 的部署 [#36821](https://github.com/vllm-project/vllm/issues/36821)。

### 4. 性能与优化
*   **KV 缓存效率：** 新的 PR [#58762](https://github.com/vllm-project/vllm/pull/58762) 实现了跨 KV 组重用 Mamba/GDN 元数据，对于 Qwen3.6-35B 等模型，有望减少约 30% 的 KV 缓存内存占用。
*   **解耦服务：** DSpark 的流水线并行（PP）预填充（prefill）支持取得进展，通过实现解耦节点间的 KV 传输，最小化了计算拆分集群中的延迟 [#56957](https://github.com/vllm-project/vllm/pull/56957)。
*   **主机内存管理：** 正在开发一个 PR，旨在“睡眠模式（Sleep Mode）”调用 `wake_up` 后可选择性地释放锁定的主机内存，从而防止模型状态转换后出现持久的内存泄漏 [#55206](https://github.com/vllm-project/vllm/pull/55206)。

### 5. 稳定性与回归
*   **V1 引擎死锁（高优先级）：** 持续调查 V1 核心死锁问题，该问题在并发负载下结合 FP8 量化、前缀缓存和 Qwen 3.5 架构时出现 [#37729](https://github.com/vllm-project/vllm/issues/37729)。
*   **Blackwell/统一内存挂起（高优先级）：** 有报告称，在 GB10 (SM121) 上，由于长预填充会话期间每个分块的 logit 缓冲区无限制增长，导致 Qwen4Exp QSA 索引器引起设备挂起/OOM [#56457](https://github.com/vllm-project/vllm/issues/56457)。
*   **ROCm/FP8 问题（中优先级）：** 多项报告指出，由于 Qwen3.8-Flash 等 FP8 优化模型中缺少权重缩放因子，导致在 ROCm/gfx942 (MI325X) 上加载失败 [#58688](https://github.com/vllm-project/vllm/issues/58688)。
*   **工具调用回归（中优先级）：** 出现间歇性问题：`llama3_json` 流式传输会丢失以 `{` 开头的辅助内容，且 DeepSeek-V3 工具解析器在 tokens 与流式增量对齐时会丢失调用 [#58824](https://github.com/vllm-project/vllm/issues/58824), [#48020](https://github.com/vllm-project/vllm/issues/48020)。

### 6. 对应用开发者的影响
*   **智能体框架：** 如果你正通过 vLLM 使用 Anthropic API (`/v1/messages`) 进行智能体工具开发（如 Claude Code），请留意正在进行的加固工作，旨在更可靠地处理大型、嵌套的 JSON 模式 [#58647](https://github.com/vllm-project/vllm/issues/58647)。
*   **工具调用一致性：** 最近的工具调用 bug 表明，在使用以频繁工具调用著称的 LLM 并开启 `stream=True` 时，务必在端侧进行稳健的验证；建议在解析器修复方案落地前，对最终输出结果与预期的 JSON 结构进行比对。
*   **部署规划：** 如果计划迁移至 NVIDIA Blackwell (GB10) 集群，请谨慎处理统一内存模型；确保在长时间预填充任务中监控 GPU 内存增长，以避免报告中提到的 OOM 挂起问题。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 摘要：2026-09-27

### 1. 今日重点
工作重心依然是确保 **DeepSeek-V4.1** 在各种环境下的稳定性，目前已加入了对 AMD (gfx950) 的支持。工程团队正集中精力优化多模态请求的调度逻辑，并完善投机采样（speculative decoding）的内存管理（特别是针对 GLM-5.3-Flash 等混合 KDA 模型）。

### 2. 版本发布与破坏性变更
*   **无。** 过去 24 小时内没有正式发布版本。

### 3. 新模型与硬件支持
*   **DeepSeek-V4.1 (AMD/MI350X)：** 合并 PR [#41308](https://github.com/sgl-project/sglang/pull/41308)，增加了使用 DSpark 在 `gfx950` 上部署 DeepSeek-V4.1-Flash 的支持。
*   **NVFP4 在线量化：** PR [#34302](https://github.com/sgl-project/sglang/pull/34302) 将 NVFP4 支持范围从 MoE 专家层扩展到了稠密线性层（dense linear layers），为 Blackwell 用户显著减少了内存占用。

### 4. 性能与优化
*   **统一内存与缓存：** 合并了多项用于统一缓存管理的 PR：
    *   [#41328](https://github.com/sgl-project/sglang/pull/41328) 清理了 LMCache 游标，并支持按实例选择后端。
    *   [#39478](https://github.com/sgl-project/sglang/pull/39478) 实现了统一内存主机池（host pool）在全缓存与滑动窗口缓存之间的再分配。
    *   [#41325](https://github.com/sgl-project/sglang/pull/41325) 为滑动窗口淘汰机制和投机批处理填充（speculative batch padding）引入了可扩展钩子。
*   **DeepEP-V2 优化：** PR [#37261](https://github.com/sgl-project/sglang/pull/37261) 为 DeepEP-V2 模型增加了更快的预填充（prefill）调度路径。

### 5. 稳定性与回归问题
*   **[高] 调度/解码失败：** 问题 [#41372](https://github.com/sgl-project/sglang/issue/41372) 反馈了一个严重 Bug：`Req.decoded_text` 未能正确写入，导致停止字符串（stop-string）回退和淘汰重初始化阶段出现死锁。
*   **[高] 多模态崩溃：** PR [#41376](https://github.com/sgl-project/sglang/pull/41376) 和 [#41375](https://github.com/sgl-project/sglang/pull/41375) 修复了在使用 `zmq_to_scheduler` 或 `mm_hashes` 处理 VLM tokens-in 请求时发生的崩溃问题，这些问题此前会导致 HTTP 500 错误。
*   **[中] 投机采样：** 问题 [#36889](https://github.com/sgl-project/sglang/issue/36889) 指出，混合模型的 DFLASH 由于状态槽竞争会静默限制并发，导致损失高达 75% 的潜在吞吐量。
*   **[中] OOM 崩溃：** 问题 [#41076](https://github.com/sgl-project/sglang/issue/41076) 反馈 DeepSeek-V4.1-Flash/DSPARK 存在工作区（workspace）分配无限制的问题，进而导致 TP 组 OOM。

### 6. 对应用开发者的影响
*   **VLM 流水线：** 如果您正在运行多模态流水线（特别是使用了 `zmq_to_scheduler` 或自定义 `mm_hashes`），请关注当前的 PR [#41376](https://github.com/sgl-project/sglang/pull/41376) 和 [#41375](https://github.com/sgl-project/sglang/pull/41375)，这些更新将带来关键的稳定性提升。
*   **生产环境监控：** 请注意 `fwd_occupancy` 指标的问题（[#40802](https://github.com/sgl-project/sglang/pull/40802)）；如果您在孤立的预填充片段中看到 `NaN` 值，请升级到最新补丁版本，该补丁修复了计量窗口（gauge windowing）问题。
*   **Kimi-K3 用户：** 如果在分块预填充（chunked prefill）过程中遇到间歇性的 `TypeError` 崩溃或 TP-rank 对齐问题，请密切关注 [#32569](https://github.com/sgl-project/sglang/issue/32569) 和 [#37393](https://github.com/sgl-project/sglang/issue/37393) 以获取上游修复方案。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

### **llama.cpp 摘要：2026-09-27**

#### **1. 今日要点**
工作重心依然在于稳定特殊架构支持，特别是 NVIDIA Nemotron 3 和高级量化例程。后端维护压力巨大，主要精力正转向提升 SYCL 和 Hexagon 的模块化程度，同时针对 server 模块中语法驱动生成（grammar-driven generation）的稳定性进行了关键修复。

#### **2. 发布与重大变更**
*   **版本更新：** 过去 24 小时内已推送 **b11199 至 b11205** 版本。
*   **重大变更：** **b11201** 版本回退了关于统一 KV cache 自动适配的 PR #28849；如果开发者在上下文管理中遇到性能回归（regression），请确保留意此回退状态。
*   **语法构建器修复 (#29497)：** 针对 `llama-server` 的关键修复，防止因格式错误的 JSON schema `minItems/maxItems` 请求导致的 OOM 崩溃。

#### **3. 新模型与硬件支持**
*   **Nemotron 3：** 在 `ssm_scan` 中增加了对状态大小 96 的支持 (#28717)。
*   **Ling 3.0 Flash VL：** 增加了对视觉-语言（Vision-Language）变体的支持 (#29151)，包括针对其特有推理标记行为的专用解析器 (#28682)。
*   **量化：** Hexagon 后端增加了对 Q4_K 和 Q6_K 的支持 (#28994)。WebGPU 的量化兼容性也得到了大幅提升（新增 Q1_0、Q5_0、Q5_1、Q3_K、Q5_K、Q6_K 和 MXFP4）(#29483)。

#### **4. 性能与优化**
*   **CUDA FWHT：** 快速沃尔什-哈达玛变换（Fast Walsh-Hadamard Transform）增加了对 F16 输入的支持，通过消除不必要的 F32 转换来降低开销 (#29096)。
*   **分块矩阵乘法（Tiled MatMul）：** 在 `ggml-cpu` 中实现了针对 K-quants 的 `tiled mul_mat`，旨在通过 16x16 微内核（microkernels）提高计算效率 (#27851，并修复了 #29504 中的 ODR 警告)。
*   **SYCL MMVQ：** IQ3_S 多列 MMVQ 优化的移植带来了显著加速（例如在特定 17408×5120 工作负载下约提升 2.71 倍）(#29500)。
*   **CUDA 分块（Chunking）：** 引入了 BF16/FP16 到 FP32 的转换分块处理，以降低初始化期间的峰值显存占用 (#29442)。

#### **5. 稳定性与回归**
*   **高优先级（显存/崩溃）：** 接到多起关于在双 Arc Pro B70 系统上使用 SYCL 版 `llama-server` 导致崩溃和驱动程序 TDR 重置的报告 (#27198, #28778)。
*   **正确性：** 目前正在调查 aarch64 上 Vulkan 的 `ARGSORT` 回归问题 (#29431)，以及 HIP/gfx1151 上针对门控 DeltaNet 架构的潜在推理损坏问题 (#27556)。
*   **常规稳定性：** 修复了 Windows server 构建中 `wake_fd` 的警告 (#29479)，并对无效的 UTF-8 token 边界进行了清理，以防止服务器解析错误 (#28724)。

#### **6. 对应用程序开发者的意义**
*   **可靠性：** 如果你构建的 Agent 工作流依赖于 GBNF/JSON schema，请更新至最新版本以规避 `minItems/maxItems` 的 OOM 漏洞 (#29497)。
*   **服务器一致性：** 针对 token 边界 UTF-8 清理的修复 (#28724) 应能减少在高 Temperature 或激进采样设置下出现的“解析错误（parse error）”异常。
*   **可观测性：** 对于通过 OAI 兼容 API 使用 `n > 1`（并行采样）的用户，PR #29496 确保了 `usage` 指标现在能准确汇总所有选项的结果，而不是仅报告第一个结果。
*   **后端灵活性：** 转向使用 SYCL 的 `ExternalProject` (#29506) 意味着在未来的构建中，你将能更自由地组合编译器版本，从而减少多 GPU CI/CD 流水线中常见的依赖地狱（dependency-hell）问题。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

### Ollama 基础设施摘要 | 2026-09-27

#### 1. 今日重点
今日的开发工作主要集中在稳定多个模型系列（Gemma4、Qwen3、GLM-4.7）的工具调用（tool-calling）解析器，以防止出现静默故障。同时，桌面客户端的交互体验（UX）改进也在推进中，重点关注窗口管理和系统托盘集成，旨在将 Ollama 打造为开发者更便捷的“快速助手”工具。

#### 2. 发布与重大变更
*   **过去 24 小时内无新版本发布**。
*   **API 敏感性**：`SillyTavern` 及类似客户端的用户反馈称，移除 `typical_p` 支持导致硬编码该参数的客户端出现严重错误 ([Issue #18542](https://github.com/ollama/ollama/issues/18542))。

#### 3. 新模型与硬件支持
*   **System 1 模型**：社区对 *Kev* 和 *Laya* 等“System 1”推理模型的支持呼声渐高 ([Issue #18594](https://github.com/ollama/ollama/issues/18594))。
*   **评分 API**：一项新的 PR 提议引入 `POST /v1/systemone` 以处理结构化决策，输出概率和预期得分 ([PR #18606](https://github.com/ollama/ollama/pull/18606))。
*   **Apple Silicon**：正在探索用于并发 MLX 推理的共享模型权重方案，以优化高内存负载下的性能 ([Issue #18669](https://github.com/ollama/ollama/issues/18669))。

#### 4. 性能与优化
*   **MLX 版本更新**：项目正更新至最新的 [MLX 上游](https://github.com/ml-explore/mlx/pull/18651)，以保持与 Apple Silicon 优化的同步 ([PR #18651](https://github.com/ollama/ollama/pull/18651))。
*   **基准测试**：正持续将 HumanEval 补丁提示词集成到对话流程中，以更好地模拟真实代码生成的性能表现 ([PR #17480](https://github.com/ollama/ollama/pull/17480))。

#### 5. 稳定性与回归
*   **紧急 (Ollama Cloud)**：Pro 用户反馈云端模型几乎全面失效（故障率 95%），这是目前影响最大的服务回归问题 ([Issue #15453](https://github.com/ollama/ollama/issues/15453))。
*   **高优先级 (工具解析)**：多个 Bug 正在影响 Agent 的可靠性：
    *   **Gemma4**：当键中包含空格或存在字符串数组时，工具调用会被静默丢弃 ([Issue #18390](https://github.com/ollama/ollama/issues/18390), [#18354](https://github.com/ollama/ollama/issues/18354))。相关修复正在通过 PR [#18664](https://github.com/ollama/ollama/pull/18664) 进行。
    *   **GLM-4.7**：解析器在字符串参数中遇到 `</tool_call>` 时会错误地终止工具调用 ([Issue #18659](https://github.com/ollama/ollama/issues/18659), [#18658](https://github.com/ollama/ollama/issues/18658))。相关修复正在通过 PR [#18663](https://github.com/ollama/ollama/pull/18663) 进行。
    *   **Qwen3**：报告显示大数值处理和 `think` 级别配置错误会导致工具解析问题 ([Issue #18632](https://github.com/ollama/ollama/issues/18632), [#18421](https://github.com/ollama/ollama/issues/18421))。

#### 6. 对应用开发者的影响
*   **Agent 脆弱性**：如果你的 Agent 依赖 Gemma4、Qwen3 或 GLM-4.7 进行结构化工具调用，可能会遇到间歇性解析错误。在当前 PR 合并前，应避免使用包含类似标签结构的复杂字符串参数。
*   **Anthropic 兼容性**：请注意，注入 `messages` 数组的系统角色消息目前会被提升到全局系统块，这可能会破坏 Claude Code 等应用的前缀缓存（prefix-caching）策略 ([Issue #18431](https://github.com/ollama/ollama/issues/18431))。
*   **桌面工作流**：客户端正在演进，以支持“置顶”和窄窗口模式，这将使其更适合作为 IDE 的侧边栏工具，从而更好地支持 Agentic 工作流 ([PR #18661](https://github.com/ollama/ollama/pull/18661))。

---

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

## LiteLLM 摘要：2026-09-27

### 1. 今日重点
过去 24 小时的重点在于强化 **Guardrail 安全性**并优化 **代理（proxy）性能**。关键 PR 旨在填补多模态安全性方面的漏洞（扫描 Bedrock 和 Azure 中的附件/文件），并对 Redis 支出计数器操作实施激进的批处理，以降低受控环境下的延迟。

### 2. 发布与重大变更
*   **过去 24 小时无新版本发布**。
*   **版本回退：** [#43385](https://github.com/BerriAI/litellm/pull/43385) 回退了近期候选版本（RC）中引入的“前 N 个（top-N）”密钥上限逻辑，以恢复使用仪表板中对所有长尾 API 密钥的完整可见性。

### 3. 新模型与硬件支持
*   **模型能力：** [#43390](https://github.com/BerriAI/litellm/pull/43390) 更新了成本映射，将 `fireworks_ai/minimax-m3` 正确分类为具备视觉能力，修复了此前因 LiteLLM 能力映射错误而引发的 400 系列错误。
*   **路由器增强：** [#43234](https://github.com/BerriAI/litellm/pull/43234) 为 Decision Model 自动路由器增加了对 Jev 和 Laya 的支持。

### 4. 性能与优化
*   **代理效率：** [#43369](https://github.com/BerriAI/litellm/pull/43369) 和 [#43367](https://github.com/BerriAI/litellm/pull/43367) 对 Redis 的使用进行了重大改进。通过将准入和请求后计费过程中的支出计数器操作进行批处理，代理将每个请求的 Redis 往返次数从约 22 次减少到单次批量操作，从而最大限度地减少了高流量部署下的开销。
*   **路由：** [#43232](https://github.com/BerriAI/litellm/pull/43232) 引入了 `cache_aware_routing`（需手动开启），允许路由器在选择最佳路由时考虑暖提示缓存（warm prompt caches）带来的成本节省。

### 5. 稳定性与回归问题
*   **Guardrail 泄漏（高优先级）：** [#42819](https://github.com/BerriAI/litellm/issues/42819) 报告称 `sse_keepalive_ping_interval_seconds` 会导致流式请求的 `max_parallel_requests` 插槽出现资源泄漏，从而导致持续的 429 错误。
*   **模式清理（中优先级）：** [#43157](https://github.com/BerriAI/litellm/issues/43157) 和 [#43325](https://github.com/BerriAI/litellm/issues/43325) 指出了工具模式转换中存在的持续问题，即 Anthropic 和 Gemini 的特定约束（枚举、模式、最大/最小值）被丢弃，这可能会导致复杂的工具调用代理失效。
*   **流式/响应 Bug：** [#43316](https://github.com/BerriAI/litellm/issues/43316) 指出了一个回归问题：支持工具调用的模型将叙述和工具调用作为独立的聊天选项（chat choices）返回，导致客户端丢失工具调用。

### 6. 对应用开发者的影响
*   **安全态势：** 如果您使用了 Guardrails，请密切关注即将推出的修复程序（[#43383](https://github.com/BerriAI/litellm/pull/43383), [#43350](https://github.com/BerriAI/litellm/pull/43350)）。现有的 Guardrails 此前忽略了非文本附件（PDF/图像）和特定端点（如 `/v1/responses`），这些可能会被利用。
*   **Claude Code 用户：** 如果您正在使用 Claude Code，Gemini 部署的可靠性将有所提升，因为 PR [#42735](https://github.com/BerriAI/litellm/pull/42735) 修复了发送至 Gemini 的 Anthropic 格式请求的令牌计数问题。
*   **成本管理：** 依赖预算限制的开发者请审查 PR [#43214](https://github.com/BerriAI/litellm/issues/43214)；目前 `max_budget=0` 被视为“无限制”而非强制拦截。修复程序正在处理中。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

### Unsloth Digest | 2026-09-27

#### 1. 今日要点
今日开发工作的重点在于“Unsloth Studio”UI/UX 的重大改进——包括全新的文件查看器和侧边栏重排功能——同时针对 FP8 训练和 VAE 解码进行了关键的性能修复。工程团队正在积极优化多 GPU 调度，并解决硬件特定回归问题（AMD/ROCm），以稳定平台近期向图像生成模型工作流的扩展。

#### 2. 发布与重大变更
*   **过去 24 小时内未发布稳定版本**。
*   **重大变更/主要 PR**：多个涉及 `codex-converged` 的 PR 表明 Studio 后端和 UI 组件正在进行大规模重构。建议拉取最新开发分支的开发者优先进行集成测试。

#### 3. 新模型与硬件支持
*   **Llama 3.2 Vision**：修复了一个关键问题，防止了图像前向传播过程中的 Flash-attention 冲突，具体解决了 `mllama` 架构中缺失 `is_causal` 属性的问题 [#12033](https://github.com/unslothai/unsloth/pull/12033)。
*   **Windows + WSL2 引擎**：一项新的实验性计划允许通过利用私有 WSL2 发行版在 Windows 上运行 vLLM 和 SGLang 引擎 [#12024](https://github.com/unslothai/unsloth/pull/12024)。
*   **GatedDeltaNet (Qwen 3.5)**：用户报告指出该混合架构在上下文并行支持和 FSDP2 分片方面存在当前的局限性 [#12051](https://github.com/unslothai/unsloth/issue/12051)。

#### 4. 性能与优化
*   **FP8 LoRA 训练**：针对块 FP8 检查点（如 DeepSeek 风格的 128x128 缩放）提交了重大的吞吐量提升方案，通过优化 `_w8a8_block_fp8_matmul` Triton 内核，在 H100 和 B200 等硬件上实现了 4–15 倍的加速 [#12027](https://github.com/unslothai/unsloth/pull/12027)。
*   **硬件轮询**：通过缓存和合并读取操作，解决了 `nvidia-smi` 调用带来的后端延迟问题，该问题此前在高密度多 GPU 主机上会导致显著的延迟（最高达 671s）[#11995](https://github.com/unslothai/unsloth/pull/11995)。
*   **VAE 解码**：针对 fp16 GPU（如 T4）上的 SDXL VAE 解码进行了优化，通过避免不必要的全 VAE 升位（upcasting）降低了开销 [#12036](https://github.com/unslothai/unsloth/pull/12036)。

#### 5. 稳定性与回归
*   **AMD/ROCm (高危)**：多份报告显示在 Windows ROCm 环境下进行 GGUF 导出时出现“invalid kernel file”错误，以及文本编码器加载失败的问题 [#11870](https://github.com/unslothai/unsloth/issue/11870), [#11638](https://github.com/unslothai/unsloth/issue/11638)。
*   **工具调用损坏 (中危)**：上下文省略机制出现回归，导致在使用 `edit_file` 工具时出现文件损坏；系统在省略文本时，有时会将占位符消息直接写入文件中 [#11839](https://github.com/unslothai/unsloth/issue/11839)。
*   **UI/内存卡顿 (中危)**：用户报告桌面应用存在严重的界面卡顿以及令牌限制执行问题（在 8192 限制下 `max_tokens` 被忽略）[#10769](https://github.com/unslothai/unsloth/issue/10769), [#12009](https://github.com/unslothai/unsloth/issue/12009)。

#### 6. 对应用开发者的影响
*   **智能体工作流**：如果您依赖 Unsloth 进行自动文件编辑（使用 `edit_file` 工具），请注意当前的省略 Bug；在 [#11839](https://github.com/unslothai/unsloth/issue/11839) 完全解决之前，请务必做好健壮的文件系统备份或验证校验和。
*   **Studio 集成**：即将推出的文件查看器和自定义侧边栏功能将极大地改变用户通过 LLM 界面管理文档的体验。预计未来几天库访问的 API 稳定性会有所调整 [#12001](https://github.com/unslothai/unsloth/pull/12001)。
*   **配置控制**：需要对 llama.cpp 参数进行精细控制的开发者可以期待即将推出的每个模型自定义 INI 支持，这将绕过 Studio 的自动重写逻辑 [#10783](https://github.com/unslothai/unsloth/pull/10783)。

</details>

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*