# AI 基础设施日报 2026-10-05

> 生成时间: 2026-10-05 01:14 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

## AI 基础设施生态系统报告：2026-10-05

### 1. 生态系统概览
AI 基础设施生态系统目前正从原始吞吐量优化转向“生命周期感知型”推理及资源受限下的灵活性。各项目正积极攻克两个主要瓶颈：长上下文/多专家推理带来的高内存成本（vLLM, llama.cpp），以及复杂智能体/工具调用循环的不稳定性（LiteLLM, Ollama）。目前存在一个统一趋势：将空闲模型状态卸载并增强多模态集成，这反映了业界推动大规模智能体架构在主流或分布式硬件上实现可行性的更广泛诉求。

### 2. 活动对比
*注：数值基于今日摘要的代表性统计。*

| 项目 | PR 数量 (活跃) | 已知问题 | 发布状态 |
| :--- | :--- | :--- | :--- |
| **vLLM** | 5+ (主要) | 3 (高/中) | 无 (稳定) |
| **SGLang** | N/A | 1 (系统) | N/A |
| **llama.cpp** | 8+ | 4 (回归) | 进行中 (b11390+) |
| **Ollama** | 5+ | 4 (关键) | 无 |
| **LiteLLM** | 4+ | 4 (中) | v1.105.0-rc.1 |
| **Unsloth** | 7+ | 4 (中/高) | 无 |

### 3. 模型支持竞赛
当前的竞争重心在于架构上的专业化，而非通用的规模化：
*   **Qwen4Exp/3.8/3-TTS：** 占据主导地位，vLLM、Ollama 和 Unsloth 均优先支持这些变体。vLLM 在企业级部署支持（FP8、投影融合）方面保持优势。
*   **视觉语言模型 (VLM)：** llama.cpp 通过混合批处理（PaliGemma 风格）在架构无关的 VLM 支持上处于领先地位，而 Unsloth 则专注于 Qwen-Image-2.1 的视觉伪影清理。
*   **专用格式：** llama.cpp 继续在量化创新方面领跑（全新的 `PTQ1_0` 1.75-bit 格式），保持其作为硬件无关基准测试工具的地位。

### 4. 性能前沿
优化工作已分化为三个不同的支柱：
*   **KV-Cache 与内存：** vLLM 押注于“睡眠模式 (Sleep Mode)”和解耦 KV 连接器，以最大限度地减少空闲时的内存占用。llama.cpp 正在追求管道并行化以及针对 MoE 模型的从宿主机到 GPU 的流式传输。
*   **内核/计算：** Unsloth 在 CUDA 图效率（全步骤记录）方面处于领先，而 vLLM 则在推动针对特定 NVIDIA SM10x 架构的定制投影融合。
*   **网关/可观测性：** LiteLLM 正在将计算密集型的可观测性任务（追踪处理）转移到服务端，以解决客户端瓶颈，这标志着向更稳健的生产级监控的转变。

### 5. 层级定位
*   **推理引擎 (vLLM, SGLang)：** 专注于高并发、大规模多用户效率，并通过解耦架构降低“冷”空闲成本。
*   **本地运行时 (llama.cpp, Ollama)：** 专注于易用性、硬件无关执行（Vulkan/SYCL/Metal），以及针对本地/边缘设备的内存管理优化。
*   **网关 (LiteLLM)：** 专注于厂商抽象、代理层安全性以及企业智能体工作流的统一可观测性。
*   **微调/优化 (Unsloth)：** 专注于开发者视角的训练速度、PEFT 集成，以及简化从“训练”到“推理”在消费级硬件上的路径。

### 6. 趋势信号
*   **智能体不稳定性：** 在所有项目中，“工具调用”和“多步对话循环”是当前的崩溃点。开发者应优先考虑那些明确提及“历史截断 (History Truncation)”和“JSON Schema 校验”修复的项目。
*   **运营节约：** 基础设施正转向“类 Serverless”的扩缩容模式，即模型在空闲时被逐出或分页至宿主机内存。这很快将成为爆发式智能体应用的标准预期。
*   **“工具化”融合：** LiteLLM 和 Unsloth 都在积极采用标准协议（MCP、Anthropic API 适配器），这表明基础设施项目正将重心从“原始推理”转向“智能体生态兼容性”。
*   **警告：** 依赖 Qwen 系列模型或 AMD 硬件的部署需谨慎；目前两者在各大主流引擎中均表现出较高的回归波动性。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

## vLLM 基础设施摘要：2026-10-05

### 1. 今日重点
今日开发重点主要集中在**休眠模式（sleep mode）生命周期管理**和**存算分离 KV-cache 连接器（NIXL/Mooncake）**，旨在减少大规模部署中的空闲内存占用。与此同时，工程团队正在解决混合 KV-cache 架构中的关键竞态条件，并完善对 Qwen4Exp 的支持，包括性能关键的投影融合（projection fusions）。

### 2. 发布与重大变更
*   过去 24 小时内**无新版本发布**。

### 3. 新模型与硬件支持
*   **Qwen4Exp 架构：** 继续扩展对 Qwen4Exp 系列的支持，包括修复 8.9 之前算力配置（compute capabilities）下 FP8 QSA KV-cache 的读取问题（[PR #59943](https://github.com/vllm-project/vllm/pull/59943)），以及改进对 Intel/AutoRound INC 检查点的支持（[PR #59990](https://github.com/vllm-project/vllm/pull/59990)）。
*   **稀疏 MLA 后端：** 为 SM10x 架构的 `FLASHINFER_MLA_SPARSE` 增加了对 `nvfp4_ds_mla` 的支持，与标准 FP8 缓存相比，令牌容量提升约 1.6 倍（[PR #59342](https://github.com/vllm-project/vllm/pull/59342)）。

### 4. 性能与优化
*   **投影融合（Projection Fusion）：** 针对 Qwen4Exp 提出了一项重大性能优化，将 QSA QKVG 和索引器 Q/K 投影合并为单个 GEMM 操作，并为 SM103 和 SM100 提供了专用内核（[PR #59533](https://github.com/vllm-project/vllm/pull/59533)）。
*   **准入控制（Admission Control）：** 合并了一项修复程序，通过确保在预检阶段强制执行 `--max-num-queued-reqs` 来防止请求突发绕过队列限制，避免在渲染前出现资源耗尽（[PR #58478](https://github.com/vllm-project/vllm/pull/58478)）。

### 5. 稳定性与回归
*   **KV-Connector 竞态条件（高）：** 正在处理混合模型中 MoRIIO RDMA 读取与 GPU 注意力页面清零之间的竞态问题（[PR #59164](https://github.com/vllm-project/vllm/pull/59164)）。
*   **休眠模式/暂停死锁（中）：** 多个 PR 修复了在异步 KV 加载过程中触发 `pause` 或 `sleep` 模式时导致的崩溃和 HTTP 500 错误（[PR #59993](https://github.com/vllm-project/vllm/pull/59993), [PR #59994](https://github.com/vllm-project/vllm/pull/59994)）。
*   **工具调用（中）：** 发现了一个 Bug，即在截断流中工具调用参数未正常终止；目前正在修复，以确保 JSON 闭合标签被正确处理（[PR #59620](https://github.com/vllm-project/vllm/pull/59620)）。

### 6. 这对应用开发者意味着什么
*   **基础设施效率：** 如果您运行的集群存在空闲时间，请关注“Sleep Mode”和“KV Connector”相关 PR 的进展。这些功能很快将允许您的部署在不丢失一致性的前提下，将空闲模型状态卸载到 CPU 或二级存储中，从而显著降低突发性 Agent 工作负载的运营成本。
*   **Agent 可靠性：** 对于使用 Anthropic API 端点（`/v1/messages`）进行 Agent 循环（例如 Claude Code）的开发者，目前正在进行加固工作，以增强入口点对大型嵌套 JSON 工具模式的兼容性。预计在即将发布的版本中，复杂多工具调用的稳定性将得到提升（[Issue #58647](https://github.com/vllm-project/vllm/issues/58647)）。
*   **模型兼容性：** 如果您正在迁移至最新的 Qwen4Exp 变体，请核实您的检查点格式（AutoRound vs. Native）和硬件（Compute Capability 8.9+），因为早期的集成在 KV-cache 精度和嵌入方法上仍存在一些边界情况。

---

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

### **llama.cpp 摘要：2026-10-05**

#### **1. 今日重点**
开发工作主要集中在优化 **Mixture-of-Experts (MoE)** 架构的效率以及提升批处理的灵活性。核心更新包括：集成混合 embedding/原始 token 批处理，以及实现存储在主机内存（Host Memory）中 MoE 专家的 GPU 端缓存，这将显著降低运行超大规模模型所需的 VRAM。

#### **2. 发布与重大变更**
*   **近期构建：** `b11390`–`b11401` 持续迭代中。
*   **重大变更：** 用户需注意，最近的路由器模式日志更新 (#29895) 修改了子命令输出的格式。开发者需确保其日志解析器能够处理这些自包含的颜色序列。

#### **3. 新模型与硬件支持**
*   **混合批处理：** 现已支持在单个批次中混合使用 `embd` 和原始 token (#29622)，为 PaliGemma 等将提示词视为非因果关系的架构提供支持。
*   **量化：** 一种新的 `PTQ1_0` 格式（128-block 三元量化，1.75 bit/weight）目前正在审核中 (#29672)，可为大规模部署提供高效率压缩。
*   **Hexagon：** 通过 `ssm-conv` 更新和基于 VTCM 的转置操作 (#29971)，持续改进 Hexagon 后端。

#### **4. 性能与优化**
*   **MoE 流水线并行：** 引入了通过 LRU 缓存将 MoE 专家从主机 RAM 流式传输到 GPU 的新架构 (#29887)，以及流水线并行支持 (#29963)，旨在使更大规模的模型能够在受限硬件上运行。
*   **CUDA/FlashAttention：** 正在尝试启用全块（whole-tile）调度 (#29435)，以提升在较新 NVIDIA 架构上的预填充（prefill）效率。
*   **Vulkan/CPU：** 优化了 `tinyBLAS` 以实现 x86 上 BF16/FP16/FP32 K-tails 的向量化 (#29806)，并将 Vulkan FWHT 内核扩展至 8192 宽度块 (#29772)。

#### **5. 稳定性与回归**
*   **严重回归：**
    *   **Vulkan 预填充：** 在 MoE 感知切片选择变更后，RDNA4 (RX 9070 XT) 上的性能出现约 12% 的回归 (#29892)。针对相关 Intel 平台回归的修复正在测试中 (#29936)。
    *   **内存故障：** 在 CUDA MoE MMQ 中发现针对大 `n_expert` 配置的越界（OOB）内存访问问题 (#29941, #29847)。
*   **已知漏洞：**
    *   **推测解码：** 在 `-np N`（多槽）模式下的异步拷贝竞争条件持续导致草稿命中率崩溃 (#27572)。
    *   **Vulkan/RPC：** 加载特定量化模型时仍存在主机 RAM 高占用（约 50GB）的问题，限制了在低内存节点上的可行性 (#29932)。

#### **6. 对应用开发者的影响**
*   **基础设施效率：** 如果你正在部署大规模 MoE 模型，请密切关注即将推出的“针对主机内存专家的 GPU 缓存” (#29887)。这将允许你在中端 VRAM 配置上运行参数规模更大的模型。
*   **视觉与多模态：** 向混合 embedding/原始 token 批处理的过渡 (#29622, #29969) 简化了在 `llama-server` 生态中集成视觉-语言模型（如 PaliGemma 类架构）的过程。
*   **监控：** 如果你使用 `/models` 或 `/slots` 终端节点，请注意正在添加的额外元数据（包括 `type` 标签）(#29944)。如果你使用严格的响应模式校验，请确保你的监控逻辑对这些新字段具有韧性。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 基础设施摘要：2026-10-05

### 1. 今日要点
工作重心仍在于提升 LLM 推理后端的稳定性，特别是解决 Qwen 架构中复杂的工具使用循环（tool-use loops）问题，并改进 Apple Silicon MLX 的内存管理。基础设施开发人员正在全力推进网络稳健性（代理支持）以及完善预发布版本的更新生命周期。

### 2. 发布与重大变更
*   **无。** 过去 24 小时内未标记任何正式版本发布。

### 3. 新模型与硬件支持
*   **Intel SYCL 后端：** [#18333](https://github.com/ollama/ollama/pull/18333) 已关闭（合并），通过 oneAPI/SYCL 流水线引入了对 Intel 独立显卡（如 Arc B70）的原生支持。
*   **Kolibri 1 支持：** 已提交针对 MLX 引擎的 Kolibri 1 模型族支持（[#18780](https://github.com/ollama/ollama/pull/18780)）。
*   **功能请求：** 社区成员要求正式支持 MBZUAI K2-Horizon 架构（[#18698](https://github.com/ollama/ollama/pull/18698)）。

### 4. 性能与优化
*   **MLX 内存管理：** 识别出 macOS 27 上权重加载延迟的关键问题；权重目前在请求完成后约 2 秒被释放到分页内存中，导致后续请求出现明显的冷启动惩罚（[#18744](https://github.com/ollama/ollama/pull/18744)）。
*   **Embedding 效率：** 一个正在进行中的 PR 旨在消除 `/v1/embeddings` 端点冗余的 JSON 序列化/反序列化操作，这将减少高并发 Embedding 工作负载的开销（[#18610](https://github.com/ollama/ollama/pull/18610)）。
*   **并行请求解阻：** 正在进行相关工作以允许 `qwen35` 模型支持 `numParallel > 1`，利用近期上游 `llama.cpp` 的稳定性修复（[#17144](https://github.com/ollama/ollama/pull/17144)）。

### 5. 稳定性与回归
*   **严重（聊天/工具循环）：** Qwen 3.8 模型在工具使用循环期间报告 `500` 错误，特别是在聊天记录超过上下文限制导致消息截断不当时会失败（[#17778](https://github.com/ollama/ollama/pull/17778)）。相关的 PR（[#18697](https://github.com/ollama/ollama/pull/18697)）旨在保护最新的用户消息不被截断。
*   **回归（Vulkan/AMD）：** 使用 AMD Radeon 780M 的用户反馈，自 0.32.10 版本以来在进行大模型推理时会出现设备丢失错误（[#17748](https://github.com/ollama/ollama/pull/17748)）。
*   **分词错误：** 由于解码器问题，`lfm2:24b` 模型在遇到没有前导空格的 "python" 一词时会静默丢弃该单词（[#18785](https://github.com/ollama/ollama/pull/18785)）。
*   **输入验证：** `/api/generate` 端点当前接受包含尾随非 JSON 数据的格式错误请求，这可能导致客户端应用程序出现注入或解析漏洞（[#18775](https://github.com/ollama/ollama/pull/18775)）。

### 6. 对应用程序开发者的影响
*   **智能体工作流：** 如果你正在使用基于 Qwen 的模型构建多步智能体，请预料到长时间运行的工具循环可能不稳定。请监控你的历史记录长度，并在 [#18697](https://github.com/ollama/ollama/pull/18697) 合并前考虑手动实现截断逻辑。
*   **网络代理：** 如果你的部署位于企业防火墙之后，请关注 [#18730](https://github.com/ollama/ollama/pull/18730) 到 [#18733](https://github.com/ollama/ollama/pull/18733) 这些 PR，它们旨在标准化 HTTP 代理支持——这是企业级 OCI/容器化部署中常见的痛点。
*   **Apple Silicon：** 在 Mac 上运行重负载推理任务的开发者应注意 MLX 引擎中“两秒释放”的行为；如果你在请求之间有空闲时间，第一个推理步骤通常会出现性能下降，因为权重会被重新分页加载到活动内存中。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

## LiteLLM 技术摘要 | 2026-10-05

### 1. 今日重点
LiteLLM 基础设施工程团队今日的工作重心在于稳定代理（proxy）的并发性能及 auth-registry 的表现，此前 v1.101.0 版本引入了全局锁。目前正在全力推进“Lens”可观测性的优化，通过在服务端执行追踪记录（traces）和运行绘图（run-plotting），从而消除浏览器端的加载瓶颈。

### 2. 发布与重大变更
*   **发布 v1.105.0-rc.1:** 引入了通过 `cosign` 强制执行 Docker 镜像签名，以确保供应链安全。[验证说明](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0)。

### 3. 模型与硬件支持更新
*   **成本映射更新:** 同步了 `deepseek-v4-flash` 的 OpenRouter 模型定价，包括更新了缓存读取和 token 成本参数。[PR #44533](https://github.com/BerriAI/litellm/pull/44533)。
*   **Azure Realtime:** 更新了 `gpt-realtime-2.1` 和 `gpt-realtime-2.1-mini` 的退役时间表，延后至 2027-06-25。[PR #44526](https://github.com/BerriAI/litellm/pull/44526)。

### 4. 性能与优化
*   **Proxy Auth Registry:** 修复了一个关键性能瓶颈，即全局 `asyncio.Lock()` 在注册表加载时缺乏超时设置，导致请求可能出现卡顿。[修复 PR #44530](https://github.com/BerriAI/litellm/pull/44530) (修复 [Issue #44047](https://github.com/BerriAI/litellm/issues/44047))。
*   **可观测性:** 引入了针对 Agent 运行记录的服务端搜索和绘图计算，将逻辑从浏览器端迁移至服务端，从而高效处理海量追踪数据。[PR #44532](https://github.com/BerriAI/litellm/pull/44532)。

### 5. 稳定性与回归问题
*   **[高危] Auth/凭证泄漏:** 存在一个问题，即针对 Anthropic 模型的第三方 `api_base` 配置可能会错误地转发客户端的 Claude OAuth token，而非代理配置的 `api_key`。[Issue #4172](https://github.com/BerriAI/litellm/issues/4172)。
*   **[中危] 连接管理:** 据报告，代理 (Prisma) 在低流量情况下未能关闭空闲连接，导致 PGBouncer 出现资源耗尽问题。[Issue #41420](https://github.com/BerriAI/litellm/issues/41420)。
*   **[中危] Vertex AI 数据丢失:** 据报告，`vertex_ai/agent_engine` 会在返回 HTTP 200 的同时静默丢弃非文本内容（图像/文件），导致模型输出“虽自信但错误”的结果。[Issue #44336](https://github.com/BerriAI/litellm/issues/44336)。
*   **[中危] 推理模型适配:** Anthropic `/v1/messages` 适配器对流式推理模型（例如通过 vLLM 运行的 DeepSeek-R1）编码错误，导致部分 SDK 接收到空内容。[Issue #32357](https://github.com/BerriAI/litellm/issues/32357)。

### 6. 对应用开发者的影响
*   **如果您使用推理模型:** 请注意，在使用兼容 Anthropic 的 SDK 对接 vLLM 后端时，可能会出现内容为空的状态；相关适配器逻辑目前正在审查中 ([Issue #32357](https://github.com/BerriAI/litellm/issues/32357))。
*   **可观测性扩展:** 如果您的团队依赖 Lens 控制台进行 Agent 运行故障排查，请关注即将推出的服务端处理功能，它将显著提升长耗时任务调查中的 UI 响应速度。
*   **合规/守卫机制:** 如果您正在使用守卫机制（如 Presidio）以满足 GDPR 或《欧盟人工智能法案》的合规要求，请注意复杂的列表式配置当前可能会错误地报告“不合规（NON-COMPLIANT）”状态。[Issue #32206](https://github.com/BerriAI/litellm/issues/32206)。

---

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 日报：2026-10-05

### 1. 今日亮点
开发工作主要集中在 Studio/Desktop 的优化上，特别是针对视觉语言模型的低显存推理以及卸载（offloading）机制的改进。关键 PR 引入了“全步”（whole-step）CUDA 图记录功能，以减少卸载模型的开销，并修复了 Qwen-Image-2.1 中的视觉伪影（拼接线）问题。

### 2. 发布与重大变更
*   **过去 24 小时无官方正式发布**。
*   **API 重命名**：`block_swap_layers` 参数已重命名为 `offload_layers`，以更准确地反映其功能（从内存流式传输层）。[PR #12705](https://github.com/unslothai/unsloth/pull/12705)

### 3. 新模型与硬件支持
*   **Qwen3-TTS**：增加了对 Qwen3-TTS 架构的快速微调支持，包括自回归语音合成器和代码预测器。[PR #12646](https://github.com/unslothai/unsloth/pull/12646)
*   **ROCm 优化**：为 ROCm (gfx1151) 实现了 FLUX 的融合 RoPE，使 FLUX.2-klein 的速度提升了 8%。[PR #12701](https://github.com/unslothai/unsloth/pull/12701)
*   **PEFT 集成**：增加了 `MiCA` 作为 `init_lora_weights` 的可选参数。[PR #6879](https://github.com/unslothai/unsloth/pull/12705)

### 4. 性能与优化
*   **卸载图优化**：正在进行一项重大优化，即在模型卸载期间记录全步 CUDA 图，这将为 L4 GPU 上的 FLUX.1 带来约 10% 的速度提升。[PR #12707](https://github.com/unslothai/unsloth/pull/12707)
*   **视觉伪影修复**：为 Qwen-Image-2.1 提出了无缝 VAE 拼接方案，以解决在 12GB/16GB 显存配置下的横向/纵向条纹问题。[PR #12696](https://github.com/unslothai/unsloth/pull/12696)
*   **API 并发**：正在实现可配置的 API 推理限制 (`UNSLOTH_API_MAX_CONCURRENCY`) 以管理请求队列。[PR #5482](https://github.com/unslothai/unsloth/pull/5482)

### 5. 稳定性与回归问题
*   **张量分割回归（高）**：用户报告称，自 **b10715** 版本以来，多 GPU 配置（如双 RTX 5070 Ti）下张量分割模式的性能下降了约 2.9 倍。[Issue #12468](https://github.com/unslothai/unsloth/issues/12468)
*   **Vulkan OOM（高）**：AMD Radeon 780M 用户报告在 Studio 进行 GGUF 推理时出现 `ErrorOutOfDeviceMemory` 错误。[Issue #12695](https://github.com/unslothai/unsloth/issues/12695)
*   **Studio 日期注入（中）**：发现一个 Bug，系统会自动将 `[Current date: ...]` 不适当地注入到用户消息中，影响了模型的角色扮演表现。正在修复中。[PR #12699](https://github.com/unslothai/unsloth/pull/12699)
*   **Desktop/包问题**：关于 ARM64 构建目标的困惑仍然存在，部分用户收到的 macOS 版本而非 Linux 版本。[Issue #12680](https://github.com/unslothai/unsloth/issues/12680)

### 6. 对应用开发者的意义
*   **卸载机制的成熟**：将 `block_swap` 重命名为 `offload_layers` 以及引入全步 CUDA 图，表明 Unsloth 正在加强对消费级硬件上大模型推理的支持。如果您正在部署大型扩散模型，请关注向“全步”图的过渡，因为它直接影响单步延迟。
*   **工具可发现性**：如果您正在构建自定义 Agent，请注意 Unsloth 正在通过 MCP (Model Context Protocol) 开放扩散模型训练和基于 API 的训练功能。请查阅 [PR #12644](https://github.com/unslothai/unsloth/pull/12644) 以获取集成机会。
*   **Anthropic 工具**：连接 Anthropic 以运行 Studio 工具（包括 MCP 和基于文件的聊天）的功能即将上线，这将实现与 Anthropic 原生工作流更好的互操作性。[PR #12497](https://github.com/unslothai/unsloth/pull/12497)

---

</details>

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*