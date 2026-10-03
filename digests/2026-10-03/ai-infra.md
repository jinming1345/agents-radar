# AI 基础设施日报 2026-10-03

> 生成时间: 2026-10-03 01:24 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

### 1. 生态系统概览
截至 2026 年 10 月 3 日，AI 基础设施生态系统目前以服务端推理的“Blackwell 化”为主导，各厂商正争相稳定 SM120/Hopper 后端，并针对高并发推理工作负载进行优化。我们正见证向“推理对齐（reasoning-parity）”的重大迈进，标准推理引擎现在必须适配思考令牌（thinking-token）预算、复杂的工具调用工作流以及多模型编排。稳定性已成为主要瓶颈，KV 缓存管理和工具使用解析方面的严重回归问题正在影响各个领域的生产级部署。

### 2. 活动对比 (快照：2026-10-03)
*注：统计数据反映了根据所提供日志得出的当前活跃开发压力。*

| 项目 | 活跃 Issue/PR | 主要关注点 | 发布状态 |
| :--- | :--- | :--- | :--- |
| **vLLM** | 高 (50+) | Blackwell/ROCm 稳定性与内核 | 稳定 (无新版) |
| **SGLang** | 高 (40+) | DeepSeek/GLM-5.3 与内存管理 | 稳定 (无新版) |
| **llama.cpp** | 中高 (30+) | Apple Silicon 与服务端 UI | 新版 b11345–b11364 |
| **Ollama** | 中 (20+) | 工具调用解析与 Windows 基础设施 | 稳定 (无新版) |
| **LiteLLM** | 中 (15+) | 可观测性与安全加固 | v1.105.0-dev.2 |
| **Unsloth** | 中 (20+) | Studio/桌面端与工具调用逻辑 | 稳定 (无新版) |

### 3. 模型支持竞赛
*   **GLM-5.x/5.3：** 企业级高性能部署的明显领跑者。vLLM 和 SGLang 正在积极竞争，旨在为这些模型提供稳定的推理支持；SGLang 目前在架构规划方面领先，而 vLLM 则专注于内核优化。
*   **DeepSeek-V4：** SGLang 是 DeepSeek-V4-Pro 优化的主要驱动力，侧重于多头分块（mHC）和内存效率。
*   **决策模型：** llama.cpp 和 Unsloth 正在扩大对实验性“决策”及智能体模型（Laya, Granite 4.x）的支持，标志着架构正从纯对话向推理优先转变。

### 4. 性能前沿
优化工作目前呈分叉趋势：
*   **内核/硬件层 (vLLM, SGLang, llama.cpp)：** 向预编译内核 (`vllm download-kernels`) 和基于 Triton 的 Attention 后端迁移，以规避较新的 Blackwell (SM120) 硬件上的 CUDA 图不稳定问题。
*   **内存/调度 (vLLM, SGLang, Unsloth)：** 专注于 MoE 专家卸载（offloading）、基数缓存（radix cache）管理，并通过快照和持久化内核缓存来降低“冷启动”延迟。
*   **量化 (llama.cpp)：** 针对异构硬件（Qualcomm Hexagon, SYCL, Vulkan）持续改进低位量化（Q2_K/Q3_K/IQ3）。

### 5. 层级定位
*   **服务引擎 (vLLM, SGLang)：** 深度栈、高并发基础设施，针对多租户、企业级吞吐量进行了优化。专注于内存效率和特定硬件的内核优化。
*   **本地运行时 (llama.cpp, Ollama)：** 硬件无关，高度强调可移植性（Apple Silicon, Windows, Mobile, Vulkan）。定位于“自带模型”的本地应用程序工作流。
*   **网关/编排 (LiteLLM)：** “控制平面”层。专注于安全（RBAC/默认拒绝策略）、可观测性和提供商抽象。
*   **微调/桌面端 (Unsloth)：** “开发循环”层。专注于降低微调门槛，并为模型测试提供一体化的本地开发环境。

### 6. 趋势信号
*   **“思考”税：** 推理引擎被迫修改其 Rust/gRPC API 以处理思考令牌预算。预计“推理感知”将成为基础设施提供商的标准需求。
*   **工具调用的脆弱性：** Ollama、Unsloth 和 SGLang 中反复出现的一个主题是并行工具调用和 JSON 结构化输出的不稳定性。基础设施开发者在未来两个季度内应将这些功能视为“alpha 阶段”特性。
*   **安全转向：** LiteLLM 对向量数据库采用“默认拒绝”策略，标志着行业正从“原型优先”的安全理念转向正式的企业治理。
*   **开发者建议：** 除非准备好切换到基于 Triton 的内核，否则避免在 SM120/Blackwell 硬件上升级到 nightly 版本，因为原生 CUDA 图支持目前处于高变动期，且频繁出现“DeviceLost”回归问题。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 基础设施摘要：2026-10-03

### 1. 今日要点
工作重心已大幅转向稳定 Blackwell (SM120) 和 ROCm (gfx950) 后端，重点解决 KV 缓存和投机采样（speculative decoding）方面的回归问题。服务基础设施的一个重要里程碑是引入了 `vllm download-kernels`，以避免启动时的 JIT 编译延迟，这对 Hopper/Blackwell 部署尤为重要。

### 2. 发布与重大变更
*   **过去 24 小时内无新版本发布**。

### 3. 新模型与硬件支持
*   **GLM-5.x/ModelOpt:** PR [#59833](https://github.com/vllm-project/vllm/pull/59833) 增加了对将 ModelOpt NVFP4 MLA 投影加载到 `fused_qkv_a_proj` 的支持，填补了高性能 GLM 部署的空白。
*   **ROCm/gfx950:** PR [#59333](https://github.com/vllm-project/vllm/pull/59333) 改进了 `AiterExperts` 对填充（padding）逻辑的覆盖，这对 MI355X 的性能至关重要。

### 4. 性能与优化
*   **预编译内核:** PR [#58765](https://github.com/vllm-project/vllm/pull/58765) 引入了 `vllm download-kernels` 以安装预编译的 FlashInfer 内核，显著缩短了现代 NVIDIA 架构的冷启动时间。
*   **优先级指标:** PR [#58078](https://github.com/vllm-project/vllm/pull/58078) 启用了优先级感知指标，允许运维人员在使用 `--scheduling-policy priority` 标志时，按请求层级追踪延迟和吞吐量。
*   **内存效率:** PR [#59160](https://github.com/vllm-project/vllm/pull/59160) 和 [#59523](https://github.com/vllm-project/vllm/pull/59523) 实现了在 `sleep()` 模式下卸载 CUDA 图池（CUDA graph pools），为 MoE 部署回收了大量内存。

### 5. 稳定性与回归问题
*   **投机采样 (高):** 多份报告 ([#59642](https://github.com/vllm-project/vllm/issues/59642), [#59724](https://github.com/vllm-project/vllm/issues/59724)) 指出在 SM120/nightly 构建版上，Qwen3.8 和 GLM-5.3 模型的 MTP 接受率为 0%。
*   **KV 缓存正确性 (高):** PR [#59504](https://github.com/vllm-project/vllm/pull/59504) 修复了一个严重的竞态条件，该问题会导致分配器清零操作覆盖异步 KV 加载。
*   **ROCm/GLM 回归 (中):** 问题 [#59413](https://github.com/vllm-project/vllm/issues/59413) 报告在 ROCm nightly 版本中，低并发下 GLM-5.3-Flash 会输出乱码。
*   **快照/CRIU (中):** PR [#59699](https://github.com/vllm-project/vllm/pull/59699) 修复了一个故障：InfiniBand 状态导致 H200 系统上无法捕获 TP1 快照。

### 6. 对应用开发者的影响
*   **提升可观测性:** 如果您正在为不同的客户群使用分层调度，现在可以通过 PR [#58078](https://github.com/vllm-project/vllm/pull/58078) 中的新指标，按优先级桶（priority bucket）监控 SLA 表现。
*   **推理/思考模型:** PR [#59836](https://github.com/vllm-project/vllm/pull/59836) 增加了通过 Rust gRPC API 携带“思考 Token”预算的支持，确保自定义前端（如 Dynamo）能够与 vLLM 的原生推理功能保持一致。
*   **部署工作流:** 请在 CI/CD 流水线中采用 `vllm download-kernels`，以确保冷启动性能的一致性和高效性，特别是在 Blackwell 硬件上扩展推理节点时。

---

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 摘要：2026-10-03

### 1. 今日重点
工作重心依然是稳定 DeepSeek-V4/GLM-5.3 的集成栈，目前正集中力量解决内存管理问题，以及在新型 SM120 (Blackwell/RTX PRO) 硬件上出现的 Attention 后端崩溃问题。架构方面的重点在于统一流式会话的 Radix Cache 管理，并优化解耦服务路径（disaggregated serving path），以提升高并发预填充（prefill）阶段的请求摄入效率。

### 2. 发布与重大变更
*   **过去 24 小时内无新版本发布**。
*   **迁移说明**：使用流式会话的用户请注意 **[PR #42295](https://github.com/sgl-project/sglang/pull/42295)**，该 PR 要求所有流式会话必须使用 `UnifiedRadixCache`；未经校验的树状缓存（tree caches）现在将被拒绝。

### 3. 新模型与硬件支持
*   **DeepSeek-V4**：优化性能和 mHC（多头分块）支持的路线图正在稳步推进，详情请见 **[Issue #42170](https://github.com/sgl-project/sglang/issue/42170)**。
*   **AMD RDNA/Strix Halo**：正在进行相关工作，旨在通过 Triton 内核在 gfx1151 GPU 上启用 Quark MXFP4 MoE 检查点 (**[PR #41389](https://github.com/sgl-project/sglang/pull/41389)**)。

### 4. 性能与优化
*   **内存效率**：正在为 DSA 模型实施 K-Pool 索引的 256 token 逻辑页面大小，以防止在长序列长度下出现“大海捞针”（needle-in-a-haystack）准确率下降的问题 (**[PR #42178](https://github.com/sgl-project/sglang/pull/42178)**)。
*   **DSpark 扩展**：正在优化验证宽度逻辑，以减少批处理大小（batch size）> 64 时的开销 (**[PR #42281](https://github.com/sgl-project/sglang/pull/42281)**)。
*   **调度**：正在修复解耦预填充实例的摄入流，确保请求处理不会被挂起的前向传递（forward pass）所阻塞 (**[PR #42035](https://github.com/sgl-project/sglang/pull/42035)**)。

### 5. 稳定性与回归
*   **严重（崩溃）**：`fa4` Attention 后端在 SM120 架构 (RTX PRO 6000) 上运行 GLM-5.3-Flash 时，在 CUDA 图捕获阶段会发生崩溃；目前建议的绕过方案是使用 Triton (**[Issue #42012](https://github.com/sgl-project/sglang/issue/42012)**)。
*   **高（性能）**：受近期提交的影响，DeepSeek-V4-Pro 解码在 GB300 硬件上的吞吐量出现了约 5% 的回归 (**[Issue #42074](https://github.com/sgl-project/sglang/issue/42074)**)。
*   **中（内存/逻辑）**：由于 FP8 分页注意力（paged attention）与行分块规划器（row-chunk planner）之间的冲突，DeepSeek-V4 模型出现内存开销回归（约 3.3–3.8 GiB）(**[Issue #42146](https://github.com/sgl-project/sglang/issue/42146)**)。
*   **中（正确性）**：`Glm47MoeDetector` 中的一个 Bug 导致在提供 `response_format` 时工具调用无法正常工作，从而引发模型产生幻觉 JSON 回答 (**[Issue #42269](https://github.com/sgl-project/sglang/issue/42269)**)。

### 6. 对应用开发者的影响
*   **工具/智能体**：如果您正在使用 GLM-4/5 模型构建智能体工作流，请注意结构化输出和工具调用一致性可能会出现间歇性失败。请密切关注 **[Issue #42269](https://github.com/sgl-project/sglang/issue/42269)**，在补丁合并之前，请尽量避免混用 `response_format` 和 `tools`。
*   **基础设施**：将请求 Token 化和模板渲染从主 HTTP 事件循环中移出的工作 (**[PR #39716](https://github.com/sgl-project/sglang/pull/39716)**) 将显著改善高流量应用的响应速度，因为这可以防止提示词（prompt）处理阻塞健康检查和流式响应。
*   **部署**：在 Blackwell/SM120 硬件上部署的开发者应优先选择基于 Triton 的 Attention 后端，以避免 `fa4` 当前存在的稳定性问题。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 摘要：2026-10-03

### 1. 今日重点
2026 年 10 月 3 日的工作重点在于通过高性能 Metal Flash Attention 内核扩展 Apple Silicon 的推理能力，并持续稳定实验性的投机解码（MTP）。此外，服务器端 UI 的现代化改造也是一大核心，目前有多个 PR 正在进行中，旨在改进模型管理和配置工作流。

### 2. 发布与重大变更
*   **版本 b11345–b11364**：发布了多个版本，主要增加了对新决策模型架构的支持，并进行了内核优化。
*   **API 更新**：引入了一个新的 `/v1/systemone` API 端点，用于支持 Laya、Julia-1 和 Lev 架构的高级模型集成 ([#29818](https://github.com/ggml-org/llama.cpp/pull/29818))。

### 3. 新模型与硬件支持
*   **Apple Silicon (Metal)**：添加了新的张量 API Flash Attention 内核，支持 F16 KV 缓存，并针对特定头维度（DK=DV=512, DK=576, DV=512）以及 Attention Sinks/ALiBi 进行了优化 ([#29570](https://github.com/ggml-org/llama.cpp/pull/29570))。
*   **Hexagon (Qualcomm)**：增加了对 Q2_K 和 Q3_K 量化类型的支持，并更新了 HTP skel 安装 ([#29717](https://github.com/ggml-org/llama.cpp/pull/29717), [#29828](https://github.com/ggml-org/llama.cpp/pull/29828))。
*   **OpenVINO**：更新至 2026.4.1 版本，提高了 MoE 架构的性能并扩展了算子支持 ([#29852](https://github.com/ggml-org/llama.cpp/pull/29852))。

### 4. 性能与优化
*   **CUDA**：提交了新的 PR，通过分段基数排序（segmented radix sort）优化多行 `TOP_K` 路径，以取代繁重的 CUB 内核启动 ([#29883](https://github.com/ggml-org/llama.cpp/pull/29883))。
*   **Vulkan**：正在针对 Intel Arc B70 和 Nvidia RTX 4060 TI 测试使用子组缩减（subgroup reductions）的 RMS Norm 优化 ([#29882](https://github.com/ggml-org/llama.cpp/pull/29882))。
*   **SYCL**：持续致力于加速 GLM MLA 预填充（prefill），并改进 IQ3 量化的内存重排序 ([#29107](https://github.com/ggml-org/llama.cpp/pull/29107), [#29171](https://github.com/ggml-org/llama.cpp/pull/29171))。

### 5. 稳定性与回归问题
*   **投机解码 (MTP) 问题**：持续收到多份关于在多 GPU 环境及特定硬件后端使用 `draft-mtp` 时出现不稳定和性能下降的报告 ([#27428](https://github.com/ggml-org/llama.cpp/issues/27428), [#27306](https://github.com/ggml-org/llama.cpp/issues/27306))。
*   **Vulkan 内存/设备错误**：仍有一些关于 AMD 硬件上出现 "DeviceLost" 错误以及移动端 Adreno 驱动程序上内存访问问题的未解决议题 ([#25207](https://github.com/ggml-org/llama.cpp/issues/25207), [#29786](https://github.com/ggml-org/llama.cpp/issues/29786))。
*   **工具调用 (Tool Calling)**：报告称 Gemma 4 模型在多行流式传输/解析期间存在间歇性不稳定的情况 ([#29655](https://github.com/ggml-org/llama.cpp/issues/29655))。

### 6. 对应用开发者的意义
*   **UI/UX 改进**：如果您正在使用集成的 `llama-server`，请关注即将推出的“模型管理器（Models Manager）”和配置面板相关的 PR。这些改进将简化模型热切换和提供商管理 ([#29583](https://github.com/ggml-org/llama.cpp/pull/29583))。
*   **稳定性警告**：如果您的生产环境依赖 `draft-mtp` 进行低延迟生成，请务必谨慎。性能高度依赖于后端硬件（尤其是 AMD/Vulkan），当前版本可能会出现预填充停顿或内存访问违规。
*   **资源管理**：一个新的用于卸载 MoE 专家的 GPU 常驻 LRU 缓存正在审核中。在不久的将来，这对在受限内存配置下扩展 MoE 模型至关重要 ([#27861](https://github.com/ggml-org/llama.cpp/pull/27861))。

---

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 基础设施摘要：2026-10-03

### 1. 今日要点
本周期的工作重心主要在于：稳定 OpenAI 兼容端点的工具调用模式，并优化 Apple Silicon 的 MLX 后端。目前投入了大量精力来解决 Windows 安装程序签名回归问题，以及各种 LLM 架构中工具调用解析的严重错误。

### 2. 发布与重大变更
*   过去 24 小时内**无新版本发布**。
*   **即将到来的 Windows 问题：** v0.35.1 Windows 安装程序因 `HashMismatch` 导致 Authenticode 验证失败，这可能会给基于 Windows 的基础设施部署带来阻碍 [#18765](https://github.com/ollama/ollama/issues/18765)。

### 3. 新模型与硬件支持
*   **Granite 架构：** MLX 后端增加了对 `GraniteForCausalLM` 的实验性支持，支持在本地使用 IBM 最新的 Granite 4.1/4.2 模型 [#17972](https://github.com/ollama/ollama/pull/17972)。
*   **Vulkan/Intel iGPU：** 报告称 Vulkan 后端无法在 Windows 上检测到 Intel UHD (0x4626) 显卡；目前正在调查中 [#18672](https://github.com/ollama/ollama/issues/18672)。
*   **双运行时请求：** 功能需求：允许同时下载/配置 ROCm 和 CUDA 运行时，以支持异构 GPU 环境（例如 AMD + NVIDIA 系统） [#18545](https://github.com/ollama/ollama/issues/18545)。

### 4. 性能与优化
*   **MLX 内存管理：** 报告显示，MLX 引擎在推理完成后约 2 秒会激进地清除权重（page out），导致后续请求因重新加载权重而产生高延迟 [#18744](https://github.com/ollama/ollama/issues/18744)。
*   **MLX/M4 Pro 效率：** 用户反映，与之前的版本相比，M4 Pro 芯片上的 GPU 利用率未达最优，暗示 MLX 运行逻辑可能存在回归问题 [#18754](https://github.com/ollama/ollama/issues/18754)。
*   **并行化限制：** 调度程序目前强制将某些架构（如 `qwen35`）的 `numParallel` 设置为 `1`，即使已显式配置 `OLLAMA_NUM_PARALLEL`，这限制了高吞吐量的服务能力 [#18750](https://github.com/ollama/ollama/issues/18750)。

### 5. 稳定性与回归
*   **严重（工具调用）：** 并行工具的结果目前是按消息位置而非 `tool_call_id` 进行关联的，导致数据映射错误。修复 PR 正在进行中 [#18762](https://github.com/ollama/ollama/issues/18762], [#18763](https://github.com/ollama/ollama/pull/18763)。
*   **高（解析）：** 在多个解析器（`DeepSeek3`, `Cogito`, `LFM2`）中，工具调用标签在流式传输的数据块边界处丢失/截断，导致 Agent 工作流中断 [#18681](https://github.com/ollama/ollama/issues/18681)。保存部分标签的 PR 正在活跃开发中 [#18759](https://github.com/ollama/ollama/pull/18759)。
*   **中（云服务）：** 报告称 Ollama Cloud Pro 的故障率极高（95%+），表明托管模型可能出现服务级中断 [#15453](https://github.com/ollama/ollama/issues/15453)。

### 6. 对应用开发者的影响
*   **对于 Agent 构建者：** 如果您的应用程序依赖 OpenAI 兼容 API 进行并行函数调用，**请务必谨慎**。目前的关联逻辑非常脆弱；请关注 PR [#18763](https://github.com/ollama/ollama/pull/18763) 的修复情况，以确保工具结果不会被错误地归属。
*   **对于流式集成：** 流式解析器问题 [#18681](https://github.com/ollama/ollama/issues/18681) 意味着基于 LLM 的 Agent 可能会因网络数据包大小或 Token 生成的抖动而间歇性地解析工具调用失败。在解析器缓冲区逻辑得到修复之前，请在端侧实现稳健的验证。
*   **对于存储/运维：** 请注意 `ollama create --quantize` 会在 `blobs/` 目录中留下大量未引用的 blobs，这可能导致 CI/CD 运行器或本地开发环境出现磁盘空间迅速耗尽的问题 [#18416](https://github.com/ollama/ollama/issues/18416)。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

### LiteLLM 工程摘要：2026-10-03

#### 1. 今日重点
开发工作重心在于增强代理（proxy）的可观测性流水线，并收紧对向量存储访问的安全控制。目前的主要工作包括加固 Anthropic 提供商的集成，以及提升在不同后端提供商之间进行流式请求重试的可靠性。

#### 2. 版本发布与破坏性变更
*   **[v1.105.0-dev.2](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0):** 发布了更新，通过 `cosign` 实现了 Docker 签名，以确保供应链的完整性。

#### 3. 新模型与硬件支持
*   **新提供商：** 新增了对 **[CoralBricks](https://github.com/BerriAI/litellm/pull/35957)**、**[Reka](https://github.com/BerriAI/litellm/pull/44278)** 和 **[QuickSilver Pro](https://github.com/BerriAI/litellm/pull/44303)** 的原生支持，将其作为 JSON 配置的 OpenAI 兼容提供商，从而支持原生的成本追踪。
*   **提供商定价更新：** 同步了 Amazon Nova 2 Pro 的定价，以反映当前的阶梯费率（[PR #44302](https://github.com/BerriAI/litellm/pull/44302)）。

#### 4. 性能与优化
*   **链路追踪：** 优化了 OpenTelemetry (OTEL) 的 span 命名，通过在 Postgres 操作中标记特定的表名，减少了追踪日志中的歧义（[PR #44240](https://github.com/BerriAI/litellm/pull/44240)）。
*   **Agent 效率：** 优化了提示词缓存（prompt-cache）的资格检查逻辑，避免对完整对话进行分词，从而降低了请求分类期间的 CPU 开销（[PR #44221](https://github.com/BerriAI/litellm/pull/44221)）。
*   **CI 改进：** 对隔离的安全测试套件进行了并行化处理，减少了集成测试期间的资源竞争（[PR #44146](https://github.com/BerriAI/litellm/pull/44146)）。

#### 5. 稳定性与回归问题
*   **关键 - 向量存储安全：** 引入了一个可选的 `vector_store_deny_by_default` 标志，旨在防止缺乏特定权限的密钥对向量存储进行无限制访问（[PR #44244](https://github.com/BerriAI/litellm/pull/44244)）。
*   **高 - Redis/代理关闭：** 设置 `REDIS_CLUSTER_NODES` 可能导致代理关闭失败，目前正在调查中（[Issue #31206](https://github.com/BerriAI/litellm/issues/31206)）。
*   **中 - 流式可靠性：** 修复了 Databricks/OpenAI 兼容端点的问题，确保在第一个分片（chunk）发送前中断的流能够通过路由器正确重试（[PR #44276](https://github.com/BerriAI/litellm/pull/44276)）。
*   **中 - Anthropic 逻辑：** 修正了 Claude Sonnet 5.5 的推理工作负载（reasoning-effort）映射问题，此前 `disabled` 的思考模式被错误地丢弃，现已修正为映射至 `between_tools`（[PR #44299](https://github.com/BerriAI/litellm/pull/44299)）。

#### 6. 对应用开发者的影响
*   **身份认证与治理：** 如果您的基础设施使用了 LiteLLM 的向量存储代理功能，请准备好迁移至“默认拒绝”（deny-by-default）模式，以确保最小权限访问。
*   **可观测性：** 如果您使用 ClickHouse 存储追踪数据，请注意近期出现的 OTLP 事件解码问题（[Issue #44274](https://github.com/BerriAI/litellm/issues/44274)）可能会导致部分事件属性丢失。
*   **成本管理：** 请确保您的计费系统已适配 Reka 和 CoralBricks 的新增专有支持，若通过通用的 `openai/` 路径路由这些流量，可能会导致成本追踪不一致。
*   **SDK 使用：** 在使用 Azure 部署时，请确保您的客户端配置通过更新后的缓存参数正确处理了 `max_retries`，以避免使用不符合当前重试约束的缓存客户端（[PR #44204](https://github.com/BerriAI/litellm/pull/44204)）。

---

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 基础设施摘要：2026-10-03

### 1. 今日重点
Unsloth 的开发周期目前由 **Unsloth Studio/Desktop** 生态系统的快速迭代所主导，重点在于修复工具使用（tool-use）逻辑和模型状态保存。工程重心集中在稳定多模型服务，并通过严格的配置锁定，确保在不同服务器实例间生成输出的一致性。

### 2. 发布与重大变更
*   **过去 24 小时内无新版本发布**；但 `main` 分支的开发势头强劲，针对工具使用可靠性和 JSONL 导出完整性进行了大量的 PR 活动。

### 3. 新模型与硬件支持
*   **Laya 决策模型：** PR [#12585](https://github.com/unslothai/unsloth/pull/12585) 引入了对 `laya` 决策模型系列的微调与服务支持，此前该系列仅限于标准对话工作流。
*   **多模型服务：** PR [#10876](https://github.com/unslothai/unsloth/pull/10876) 正在开发中，旨在通过管理独立的 `llama-server` 后端，使 Studio 能够同时将多个 GGUF 模型驻留在内存中。

### 4. 性能与优化
*   **Inductor 确定性：** PR [#12588](https://github.com/unslothai/unsloth/pull/12588) 通过关闭 `dynamic_scale_rblock`，解决了分布式 Studio 服务器中图像生成（FLUX.1-schnell）的不确定性问题，确保跨节点输出的一致性。
*   **延迟/吞吐量回退：** Issue [#12468](https://github.com/unslothai/unsloth/issues/12468) 指出，自最近的 `b10715` 更新以来，Tensor-split 模式出现了显著的 **~2.4 倍性能下降**（从 115 t/s 降至 48 t/s），这可能与 `max_cuda_graphs` 的调整有关。

### 5. 稳定性与回归问题
*   **OOM 与显存效率：** Issue [#4504](https://github.com/unslothai/unsloth/issues/4504) 仍然是一个关键的阻塞问题，有报告称在微调大型模型时，显存使用量异常，导致了内存溢出（OOM）。
*   **工具使用/状态完整性：** 
    *   PR [#12573](https://github.com/unslothai/unsloth/pull/12573) 修复了 `openclaw` 中一个 8,192 token 的硬性限制 Bug，该 Bug 会导致推理/工具调用被过早截断。
    *   PR [#12574](https://github.com/unslothai/unsloth/pull/12574) 解决了一个关键的上下文窗口回归问题，即在 safetensors/MLX 模型中，后续查询会导致早期轮次的工具调用丢失。
*   **API 开销：** Issue [#12364](https://github.com/unslothai/unsloth/issues/12364) 确认本地 OpenAI 兼容端点存在约 1.2 秒的固定延迟开销，这对短文本/高频工作负载影响显著。

### 6. 对应用开发者的影响
*   **工作流集成：** 如果您正在构建依赖工具使用的 Agent，请更新您的环境以跟踪最新的 PR（特别是 #12574 和 #12578）。当前的修复解决了工具调用如何被掩码（mask）和保存的问题，这对多轮 Agent 推理至关重要。
*   **部署稳定性：** 如果您在生产环境（例如使用 OpenAI 兼容 API）运行 Unsloth，请注意约 1 秒的基准延迟开销。如果可能，请避免频繁的短时请求，因为该开销目前是固定的。
*   **确定性工作负载：** 如果您的应用程序需要跨集群实现位级一致性（例如图像生成或特定的评估指标），请务必结合 PR #12588 中有关 `dynamic_scale_rblock` 的配置更改，以避免节点间的差异。

---

</details>

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*