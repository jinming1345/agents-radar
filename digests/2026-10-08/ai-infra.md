# AI 基础设施日报 2026-10-08

> 生成时间: 2026-10-08 02:15 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

## 跨项目基础设施分析：2026-10-08

### 1. 生态概览
AI 基础设施生态目前正步入“后架构”成熟期，核心焦点已从基础模型支持转移到复杂功能的稳定性上，例如多令牌预测 (MTP)、投机采样 (Speculative Decoding) 以及混合专家模型 (MoE) 服务。行业目前正应对因“功能臃肿”导致的显著稳定性倒退，特别是在较新芯片（Blackwell/MI355X/RDNA4）上的前缀缓存 (Prefix Caching) 和混合模型调度方面。企业级集成（尤其是 OAuth/身份验证和多租户计费）正成为网关级工具的主要差异化竞争点，而本地运行时则在努力缩短云端规模能力与消费级硬件限制之间的差距。

### 2. 活动对比
*(注：数值代表 2026-10-08 提供项目活动日志中的近期活跃趋势。)*

| 项目 | 近期 PR 数量 | 问题处理速度 | 发布状态 |
| :--- | :--- | :--- | :--- |
| **vLLM** | 极高 | 高（关键错误） | 成熟/活跃 |
| **SGLang** | 高 | 高（活锁） | 稳定 |
| **llama.cpp** | 高 | 中 | 活跃（频繁） |
| **Ollama** | 中 | 高（迁移） | v0.40.1 (Hotfix) |
| **LiteLLM** | 高 | 中 | v1.106.0-dev |
| **Unsloth** | 中 | 中 | v0.1.904-beta |

### 3. 模型支持竞赛
*   **vLLM：** 在重型企业级支持（Gemma4, Qwen3.8-2.4T-A95B）方面处于领先地位，专注于 AMD 和 Blackwell 的专用内核优化。
*   **SGLang：** 在 MoE/推理模型稳定性（DeepSeek-V4, GLM-5.3）和 NPU 集成（Kimi-K3）方面表现最强。
*   **llama.cpp：** 在“Omni”模型（LiquidAI）和跨平台灵活性（Qualcomm Hexagon, Metal/Apple Silicon）方面占据主导地位。
*   **LiteLLM：** 在企业级决策/供应商集成（M365 Copilot, gpt-6-luna）方面表现同类最佳。
*   **Unsloth：** 异类选手，专注于“决策模型”微调，正在从通用 LLM 训练转向特定任务的二元/多分类引擎。

### 4. 性能前沿
*   **内核级优化：** vLLM 和 llama.cpp 正针对特定硬件（gfx950, SM120, Hexagon）积极调优内核，特别是在 FP8 和量化数学运算方面。
*   **内存管理：** 共同关注 MoE 效率；vLLM 正在优化输入拷贝，而 llama.cpp 和 Unsloth 正在为 MoE 专家实现精细的 RAM/VRAM 缓存策略，以避免吞吐量下降。
*   **投机采样：** “准确度与延迟”的权衡是主要战场。vLLM 和 SGLang 在复杂投机路径上的准确度退化问题上均面临挑战，这表明验证逻辑目前尚未在生产环境中完全稳定。
*   **网关开销：** LiteLLM 的 Rust 重写版本仍然是实现亚毫秒级路由的关键路径，而 Ollama 则持续应对本地服务中的“保持连接 (keep-alive)”和连接复用开销问题。

### 5. 层级定位
*   **服务引擎 (vLLM, SGLang)：** 深度堆栈基础设施。针对多租户、高吞吐量的云环境进行优化；目前优先考虑调度和分布式通信（DBO, KDA/MLA）。
*   **本地运行时 (llama.cpp, Ollama)：** 硬件抽象推理。专注于易用性，以及在内存受限的硬件上运行大规模模型。
*   **网关 (LiteLLM)：** 编排层。专注于供应商抽象、安全性、合规性（FIPS）和身份管理。
*   **微调/工作台 (Unsloth)：** 开发者工具层。专注于训练民主化和专用模型部署（决策模型）。

### 6. 趋势信号
*   **“推理”不稳定性：** 高端模型（GLM, DeepSeek）在低精度状态（NVFP4）下表现出非确定性行为。开发人员应将“思考”类模型在生产中视为“测试版”功能。
*   **智能体合规性：** LiteLLM 向 OAuth 和 Docker 签名转型，表明企业 AI 的下一阶段不仅关乎模型质量，还关乎**身份感知推理**。
*   **硬件优先开发：** 内核碎片化（gfx1201, SM120）意味着基础设施团队现在必须维护一套与硬件绑定的版本矩阵。“一刀切”的容器策略正在失效；针对特定硬件故障的监控与可观测性已成为强制要求。
*   **给开发者的警告：** 生态系统中 v0.40.x 的迁移周期（Ollama, vLLM）表明，本季度文件系统和配置架构的破坏性更新较为常见。请锁定依赖版本；在未对特定模型架构进行严格回归测试之前，切勿升级核心引擎。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 技术摘要：2026-10-08

### 1. 今日重点
今日的工作重心在于完善对下一代架构（SM12x/Blackwell, MI355X/gfx950）的支持，并强化多令牌预测（MTP）和投机采样等复杂推理功能。目前的开发重点主要集中在解决混合架构中前缀缓存（prefix caching）与量化模式冲突导致的稳定性回归问题。

### 2. 发布与重大变更
*   **发布：** 过去 24 小时内无新版本发布。
*   **重大变更：** 暂无报告。不过，`KVCacheConfigBuilder` ([#53558](https://github.com/vllm-project/vllm/pull/53558)) 的内部接口正在进行重大修订，以支持平台特定的覆盖配置。

### 3. 新模型与硬件支持
*   **Gemma4 支持：** 正在进行 `Gemma4ForSequenceClassification` 以及非词表大小输出头（non-vocab-sized output heads）的相关支持工作 ([#43726](https://github.com/vllm-project/vllm/issues/43726))。
*   **AMD gfx950 (MI355X)：** 持续追踪 `Qwen3.8-2.4T-A95B` 模型的性能优化 ([#57149](https://github.com/vllm-project/vllm/issues/57149))。
*   **Kimi-K3/Cake 内核：** 引入 `VLLM_CAKE_ROUTES`，用于基于 FlashInfer 的 KDA 和 MLA 解码优化 ([#60470](https://github.com/vllm-project/vllm/pull/60470))。

### 4. 性能与优化
*   **DeepSeek-V4 (ROCm)：** 为预填充（prefill）计算/通信启用了双批次重叠（DBO），以提高数据并行部署中的利用率 ([#57773](https://github.com/vllm-project/vllm/pull/57773))。
*   **Qwen3.5 GDN GEMM：** 针对 H20 和 SM120 推出的全新自动调优 Triton 内核，在特定形状下比通用内核实现了 1.67 倍至 2.50 倍的速度提升 ([#54182](https://github.com/vllm-project/vllm/pull/54182))。
*   **MoE 效率：** Humming 架构优化，旨在跳过 w13 GEMM 之前多余的输入拷贝操作 ([#59340](https://github.com/vllm-project/vllm/pull/59340))。
*   **投机采样：** 为 MTP 草稿模型引入了可选的“简化草稿词表”（共享 lm_head），显示出 25-29% 的解码加速潜力 ([#58578](https://github.com/vllm-project/vllm/issues/58578))。

### 5. 稳定性与回归
*   **严重 (输出损坏)：** v0.30/0.31 用户报告称，在 `Qwen3.8-27B` NVFP4 检查点上，`DFlash2/DSpark + prefix caching` 在缓存命中后会导致输出损坏 ([#60174](https://github.com/vllm-project/vllm/issues/60174))。
*   **高危 (内存访问)：** 尽管此前进行了加固，但在 RTX 3090 上使用混合 GDN + MTP k=3 配置时，仍存在 CUDA 非法内存访问（导致进程退出，代码 0）的问题 ([#53726](https://github.com/vllm-project/vllm/issues/53726))。
*   **中危 (ROCm 回归)：** RDNA4 (gfx1201) 用户报告自 v0.28 起解码性能下降 5–24%，原因为错误地选择了 `RowWiseTorchFP8ScaledMMLinearKernel` ([#57838](https://github.com/vllm-project/vllm/issues/57838))。
*   **中危 (投机采样)：** 在 SM120 上使用原生 `FLASHINFER_MLA_SPARSE_SM120` 后端时，GLM-5.3-Flash 的命中率降至 0% ([#59724](https://github.com/vllm-project/vllm/issues/59724))。

### 6. 对应用开发者的影响
*   **智能体工作负载：** 如果您的应用高度依赖前缀缓存，请密切关注 `DFlash2` 和混合模型相关的稳定性问题 ([#60174](https://github.com/vllm-project/vllm/issues/60174))。如果发现响应损坏，请考虑暂时禁用前缀缓存。
*   **工具调用 (Tool Calling)：** 针对工具选择逻辑 ([#55080](https://github.com/vllm-project/vllm/issues/55080)) 和命名空间函数选择 ([#56368](https://github.com/vllm-project/vllm/pull/56368)) 的修复工作正在进行中；请确保您的集成逻辑不依赖当前的“静默删除”行为。
*   **Logprobs：** 请注意，`logprob_token_ids` 中的 `rank` 值目前映射的是请求列表中的位置，而非实际的词表排名 ([#60357](https://github.com/vllm-project/vllm/issues/60357))。请据此调整您的下游分析逻辑。

---

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 文摘：2026-10-08

### 1. 今日重点
目前的开发重心在于稳定高端 MoE/投机采样（speculative decoding）工作流，并扩展对专用硬件（NPU/AMD）的支持。核心工作聚焦于解决 Hybrid-SWA 模型中的调度器活锁问题，以及修复 DeepSeek-V4 和 GLM-5.3 等旗舰模型在投机采样配置下出现的持续性精度回归问题。

### 2. 发布与重大变更
*   过去 24 小时内**无新发布**。

### 3. 新模型与硬件支持
*   **[NPU] Kimi-K3 DCP 支持：** PR [#40825](https://github.com/sgl-project/sglang/pull/40825) 为昇腾（Ascend）NPU 上的 Kimi-K3 引入了解码上下文并行（DCP），利用共享压缩通信来降低 KV 存储需求。
*   **Cloudflare Clef 模型：** PR [#42721](https://github.com/sgl-project/sglang/pull/42721) 在 `/v1/systemone` 端点增加了对 `Clef` 和 `Clef-Flash` 决策模型的支持。
*   **AMD GFX95 优化：** PR [#41030](https://github.com/sgl-project/sglang/pull/41030) 移除了 AMD 硬件上冗余的 FP8 scale 重排副本，优化了 GLM-5.3 等模型的解码路径。

### 4. 性能与优化
*   **聊天提示词编码：** PR [#41259](https://github.com/sgl-project/sglang/pull/41259) 对长聊天提示词的 Tokenizer 编码过程进行了并行化处理，旨在显著降低 Agent 业务负载下的 TTFT（首字延迟）。
*   **投机采样：** PR [#28045](https://github.com/sgl-project/sglang/pull/28045) 引入了一种感知吞吐量的自适应投机步长策略，以更好地平衡计算成本与延迟。
*   **Diffusion 重叠调度：** PR [#40756](https://github.com/sgl-project/sglang/pull/40756) 移除了针对 dLLM 模型强制设置的 `disable_overlap_schedule`，允许 CPU 端的 Batch 准备工作与 GPU 推理过程重叠进行。
*   **防止冗余解码：** PR [#42720](https://github.com/sgl-project/sglang/pull/42720) 确保调度器在达到输出预算限制后，不会触发不必要的终止解码操作。

### 5. 稳定性与回归
*   **[严重] Hybrid-SWA 调度器活锁：** Issue [#41579](https://github.com/sgl-project/sglang/issues/41579) 报告称，在开启 radix cache 的情况下，混合滑动窗口注意力（SWA）模型会出现永久性的准入活锁。
*   **[高] 投机采样精度回归：** Issue [#32038](https://github.com/sgl-project/sglang/issues/32038) 跟踪了一个精度大幅下降的问题（使用 DSpark 投机采样配合 DeepSeek-V4-Flash 时，AIME25 得分从 97.08 降至 93.96）。
*   **[高] GLM-5.3 推理循环：** Issue [#41939](https://github.com/sgl-project/sglang/issues/41939) 报告在多节点 B200/B300 部署环境下，GLM-5.3-Flash NVFP4 出现重复推理行为。
*   **[高] MoE 专家并行：** Issue [#40320](https://github.com/sgl-project/sglang/issues/40320) 指出，由于 EP>1 配置下的形状不匹配，FlashInfer 的自动调优缓存每次启动时都会被丢弃，导致每次重启都必须进行昂贵的重新调优。
*   **[中] CUDA 同步 Bug：** PR [#43030](https://github.com/sgl-project/sglang/pull/43030) 在 MoE 对齐内核中加入了一个必要的屏障修复，以防止专家 ID 搜索期间出现竞态条件。

### 6. 对应用开发者的影响
*   **TTFT 提升：** 如果您的应用处理大量上下文（如 Agent 聊天记录），即将到来的 Tokenizer 并行化改进将直接改善您的感知延迟。
*   **部署稳定性：** 如果您正在运行带有投机采样的高级推理模型（DeepSeek/GLM 变体），请注意上述的精度回归报告。在投机验证路径稳定之前，建议对输出进行严格验证。
*   **CI/基础设施：** 由于项目组目前正在试行一种针对 PR 的全新“看护”工作流（Issue [#42752](https://github.com/sgl-project/sglang/issues/42752)），构建稳定性可能会出现波动。如果您依赖自定义构建，请密切关注 `main` 分支的健康状况。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 日报：2026-10-08

### 1. 今日亮点
2026年10月8日的重点工作主要集中在高端混合专家模型（MoE）优化以及多模态“Omni”模型的集成上。值得关注的进展包括：用于解决超大规模模型内存限制的多 GPU MoE 缓存技术，以及针对 Metal 和 Hexagon 架构的内核级深度调优。

### 2. 发布与重大变更
*   **版本更新：** `b11467` 至 `b11481` 版本主要专注于提升功能的稳定性。目前未发现重大的 API 破坏性变更，但开发者应持续关注 MoE 缓存逻辑的迁移过程。

### 3. 新模型与硬件支持
*   **LiquidAI/d1-omni-600M：** 增加了对 LiquidAI "Omni" 决策模型的支持，使其能够处理音频、图像和文本输入 ([PR #30114](https://github.com/ggml-org/llama.cpp/pull/30114))。
*   **GLM5-Next (MTP)：** 集成了 GLM5-Next 多 token 预测头（multi-token-prediction heads）的原生支持，以优化推测解码路径 ([PR #29928](https://github.com/ggml-org/llama.cpp/pull/29928))。
*   **Cohere2 Vision：** 增加了对 Cohere2 视觉架构的支持，包括用于提升性能的融合线性层 ([PR #30062](https://github.com/ggml-org/llama.cpp/pull/30062))。
*   **Hexagon/Mobile：** 持续推进 Qualcomm Hexagon 开发，增加了对 `GET_ROWS` 操作中平铺（tiled）`Q4_K` 和 `Q6_K` 张量的支持 ([PR #30115](https://github.com/ggml-org/llama.cpp/pull/30115))。

### 4. 性能与优化
*   **MoE GPU 缓存：** 新的 MoE 专家 GPU 缓存允许将专家模型保留在宿主内存中，同时在显存中缓存“热”专家 ([PR #29887](https://github.com/ggml-org/llama.cpp/pull/29887))，并跟进了多 GPU 分布式支持 ([PR #30112](https://github.com/ggml-org/llama.cpp/pull/30112))。
*   **Metal (Apple Silicon)：** 新的“少行（few-row）” MMA（矩阵乘累加）内核提升了包括 `MXFP4`、`BF16` 以及多种 `IQ` 类型在内的数据类型的吞吐量 ([PR #30065](https://github.com/ggml-org/llama.cpp/pull/30065))。
*   **Hexagon 加速：** 对 `Q6_K` 反量化进行手动循环展开，显著改善了移动端芯片上的延迟表现 ([PR #30121](https://github.com/ggml-org/llama.cpp/pull/30121))。

### 5. 稳定性与回归测试
*   **音频内存漏洞 (高危)：** 识别出一个潜在的拒绝服务（DoS）漏洞，恶意音频头文件可能触发过度内存分配；修复工作正在进行中 ([PR #30130](https://github.com/ggml-org/llama.cpp/pull/30130))。
*   **MoE/NaN 处理 (中危)：** 正在修复 MoE 选择过程中的一个问题，即偏置项相加可能引入 NaN，导致专家选择发生偏离 ([PR #29609](https://github.com/ggml-org/llama.cpp/pull/29609))。
*   **Vulkan/AMD 稳定性：** 用户反馈称在某些 AMD 硬件架构（如 `gfx1201`）上使用 Flash Attention 时，仍存在设备丢失（device-loss）的问题 ([Issue #29314](https://github.com/ggml-org/llama.cpp/issues/29314))。

### 6. 对应用开发者的影响
*   **多模态流水线：** 随着 `d1-omni` 的加入，开发者现在可以将视觉和音频处理直接集成到 `llama.cpp` 服务栈中，减少对独立预处理微服务的需求。
*   **扩展 MoE 模型：** 如果您正在消费级硬件上部署大型 MoE 模型（如 Qwen-Flash-Next），新的 **MoE GPU 缓存** 能显著降低显存压力，通过减少宿主到设备的内存拷贝，从而加快 token 生成速度。
*   **推测解码：** 如果使用 MTP（多 token 预测）模型，请注意在温度（temperature）为 0 时，“贪婪选择”逻辑存在已知边缘情况；请确保将 `llama.cpp` 构建版本更新至 `b11472`，以利用已修正的采样逻辑 ([PR #29797](https://github.com/ggml-org/llama.cpp/pull/29797))。

---

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 动态摘要：2026-10-08

### 1. 今日要点
Ollama v0.40.1 已发布，重点修复了新的 GGUF 迁移逻辑及代理支持中的关键问题。目前的工程重心在于确保 `0.40.x` 版本过渡的稳定性，特别是解决 Windows 上的符号链接问题以及 MLX 运行环境的性能回退。

### 2. 发布与重大变更
*   **v0.40.1：** 发布旨在解决迁移后的稳定性问题。
    *   [PR #18829](https://github.com/ollama/ollama/pull/18829)：现已支持云端使用量和余额 API 的代理转发。
    *   [PR #18826](https://github.com/ollama/ollama/pull/18826)：简化了 CLI 入门流程，移除了强制账户登录步骤。
*   **重大变更：** v0.40.0 迁移至新引擎后，导致 Windows 用户出现文件系统问题（[Issue #18847](https://github.com/ollama/ollama/issue/18847)）以及重复标签注册问题（[Issue #18830](https://github.com/ollama/ollama/issue/18830)）。针对 Windows 符号链接处理的修复程序已合并至 [PR #18852](https://github.com/ollama/ollama/pull/18852)。

### 3. 新模型与硬件支持
*   **模型需求：** 社区对添加 **MIMO v2.5**（百万级上下文）([Issue #15887](https://github.com/ollama/ollama/issue/15887)) 以及 **Stepfun** 和 **Hy4** 等各种高性能云端模型的需求高涨 ([Issue #18850](https://github.com/ollama/ollama/issue/18850))。
*   **编码更新：** [PR #18857](https://github.com/ollama/ollama/pull/18857) 提议添加 Saina Helm 编码，以支持需要特定输出层评分的决策模型。

### 4. 性能与优化
*   **MLX/Metal：** 优化预填充（prefill）延迟的工作正在进行中。[PR #18694](https://github.com/ollama/ollama/pull/16894) 针对更新架构（计算能力 10.0+）的 CUDA 平台优化了快速量化矩阵乘法。
*   **连接重用：** [PR #18397](https://github.com/ollama/ollama/pull/18397) 旨在停止在 llama-server HTTP 客户端中禁用 keep-alive，这将显著降低高频 `/api/embed` 调用产生的开销。

### 5. 稳定性与回归问题
*   **紧急 - MLX 运行环境崩溃：** 用户反馈在 macOS 上使用 `0.40.x` 版本时出现回归崩溃，包括“Maximum threads”错误 ([Issue #18846](https://github.com/ollama/ollama/issue/18846)) 以及使用 `qwen3.6:35b-mlx` 时导致的崩溃 ([Issue #18856](https://github.com/ollama/ollama/issue/18856))。
*   **严重 - API 500 错误：** 大规模工具调用请求在服务器响应中触发了“unexpected end of JSON input”错误 ([Issue #18840](https://github.com/ollama/ollama/issue/18840))。针对流截断检测的修复程序正在 [PR #18849](https://github.com/ollama/ollama/pull/18849) 中进行。
*   **严重 - 代理/网络：** 由于 DNS/重定向问题，模型在 HTTP 代理环境下拉取失败 ([Issue #18831](https://github.com/ollama/ollama/issue/18831))。

### 6. 对应用程序开发者的影响
*   **生产环境请规避 v0.40.0：** 如果您正在运行本地推理，请等待更稳定的后续版本；`0.40.0` 中的迁移导致了 Windows 文件处理和 MLX 性能方面的显著回退。
*   **工具调用（Tool Calling）：** 请注意，当前的 `gemma4` 渲染器存在已知 Bug，会导致特定参数名称（如 `description`、`type` 等）在工具调用中被剔除 ([Issue #18468](https://github.com/ollama/ollama/issue/18468))。目前请避免在您的工具定义中使用这些名称。
*   **智能体开发：** 如果您正在构建利用长上下文的智能体（如 Claude Code），请务必手动调节上下文限制，因为默认的回退行为可能会触发过度的重新压缩（re-compaction）([PR #18855](https://github.com/ollama/ollama/pull/18855))。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

## LiteLLM 摘要：2026-10-08

### 1. 今日亮点
LiteLLM 正积极扩展其企业级网关功能，重点聚焦于基于 OAuth 的用户级凭据管理（Microsoft 365 Copilot 和 GitHub Copilot）以及增强的计费细粒度。该项目在基于 Rust 的重构工作上持续稳步推进，旨在最大限度地降低网关开销；同时，通过标准化的 Docker 镜像签名和改进的静态加密协议，进一步强化了生产环境的安全性。

### 2. 版本发布与破坏性变更
*   **发布流水线：** 从 `v1.100.5` 到 `v1.106.0-dev.1` 的一系列更新。
*   **安全性：** 所有官方 Docker 镜像现已通过 [cosign](https://docs.sigstore.dev/cosign/overview/) 进行签名，签名密钥引入自 [commit `0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0)。
*   **安全升级：** [PR #42934](https://github.com/BerriAI/litellm/pull/42934) 提议将默认静态加密算法更改为 AES-256-GCM 配合 HKDF v3，以取代传统的 PyNaCl (XSalsa20-Poly1305)，从而确保符合 FIPS 标准。

### 3. 新模型与硬件支持
*   **Microsoft 365 Copilot：** 通过 OAuth 令牌交换增加了对 Graph Copilot Chat API 的支持 ([PR #45158](https://github.com/BerriAI/litellm/pull/45158))。
*   **Decisions API：** 将 OpenAI 的 `gpt-6-luna` 和 Databricks 的 `ai_decide` 集成为正式的 Decisions 提供商 ([PR #45214](https://github.com/BerriAI/litellm/pull/45214), [PR #45200](https://github.com/BerriAI/litellm/pull/45200))。

### 4. 性能与优化
*   **Rust 迁移：** [Rust 迁移父任务 (#31263)](https://github.com/BerriAI/litellm/issues/31263) 仍然是实现亚毫秒级网关开销的首要长期工作。
*   **计费细粒度：** 引入新功能，可根据 HTTP 状态码拆分失败的网关请求，使管理员能够区分客户端错误和提供商故障 ([PR #45244](https://github.com/BerriAI/litellm/pull/45244))。
*   **上下文缓存定价：** 增加了对 Vertex AI Gemini 上下文缓存存储的计费支持 ([PR #45019](https://github.com/BerriAI/litellm/pull/45019))。

### 5. 稳定性与回归问题
*   **回归（高）：** [Issue #43756](https://github.com/BerriAI/litellm/issues/43756) 报告称 DashScope 模型在对话的第一轮因未设置缓存令牌而触发 `AttributeError` 崩溃。
*   **回归（中）：** [Issue #44979](https://github.com/BerriAI/litellm/issues/44979) 指出 Anthropic 到 OpenAI 的工具转换会丢失 `is_error` 标志，可能破坏 Agent 循环中的错误处理流程。
*   **回归（中）：** [Issue #31726](https://github.com/BerriAI/litellm/issues/31726) 详细描述了 Realtime/Voice 代理中的竞态条件，重复的 `response.create` 调用会导致 "conversation_already_has_active_response" 错误。

### 6. 对应用开发者的影响
*   **OAuth 驱动的应用程序：** 如果您的应用程序集成了 Microsoft 或 GitHub Copilot，现在可以利用 LiteLLM 处理用户级令牌交换，从而无需管理终端用户的 OAuth 流程细节 ([PR #45241](https://github.com/BerriAI/litellm/pull/45241))。
*   **可观测性：** 使用 LiteLLM 追踪 Agent 性能的开发者，现在可以通过新的 `/lens/feedback` API 将终端用户反馈（评分/评论）直接存储到 ClickHouse 中 ([PR #45171](https://github.com/BerriAI/litellm/pull/45171))。
*   **预算管理：** 如果您正在管理多租户 SaaS，请关注待处理的基于月度令牌限额的功能需求 ([Issue #44555](https://github.com/BerriAI/litellm/issues/44555))，因为目前的基于支出的预算限制对于价格波动大的模型可能不够用。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

### Unsloth 摘要：2026-10-08

#### 1. 今日亮点
Unsloth 正通过发布 **Decision Model** 支持向智能体（agentic）效能转型，使文本和视觉 LLM 能够作为高精度（高达 80%）的决策引擎发挥作用。与此同时，平台正加倍提升 Studio 的稳定性与 RAG 性能，特别针对内存溢出系统上的 MoE 专家处理进行了优化。

#### 2. 版本发布与重大变更
*   **v0.1.904-beta**: 引入了原生的决策模型训练/导出功能。包含对 ComfyUI 模型的原生支持以及增强的桌面浏览器功能。（[发布说明](https://github.com/unslothai/unsloth)）
*   **安全补丁**: PR [#13001](https://github.com/unslothai/unsloth/pull/13001) 实现了在执行 `np.load` (pickle) 操作前强制弹出用户提示，旨在增强 Studio 沙箱对恶意模型制品的防御能力。

#### 3. 新模型与硬件支持
*   **MoE 内存优化**: PR [#12951](https://github.com/unslothai/unsloth/pull/12951) 引入了 `--moe-cache-mib auto`，可将路由专家权重锁定在 RAM 中，显著提高了模型溢出至系统内存时的吞吐量。
*   **嵌入引擎**: PR [#13006](https://github.com/unslothai/unsloth/pull/13006) 优化了 `EmbeddingGemma` 的性能，默认从受限于 CPU 的 `sentence-transformers` 切换为 `llama-server`，将吞吐量从约 5 chunks/s 提升至约 129 chunks/s。

#### 4. 性能与优化
*   **微批处理（Micro-batching）**: PR [#12950](https://github.com/unslothai/unsloth/pull/12950) 将 MoE 模型的 `llama-server` 微批大小提高至 2048，专门针对专家权重未完全驻留于 VRAM 的高延迟场景。

#### 5. 稳定性与回归问题
*   **高 CPU 占用（严重）**: Issue [#12942](https://github.com/unslothai/unsloth/issues/12942) 报告在 Windows 11 下，后台 `python.exe` 在空闲状态下占用高达 95% 的 CPU。
*   **Qwen3.6 推理（高）**: PR [#12989](https://github.com/unslothai/unsloth/pull/12989) 修复了一个回归问题：该问题导致“思考”控制被忽略，使得原始推理标签泄露到聊天输出中。
*   **工具调用持久性（中）**: PR [#12988](https://github.com/unslothai/unsloth/pull/12988) 修复了 Qwen3.5 模型在多步推理过程中丢失工具调用参数的问题。
*   **硬件冲突（中）**: PR [#12947](https://github.com/unslothai/unsloth/issues/12947) 指出 `pip install unsloth[amd]` 可能会无意中将 ROCm 兼容的 torch 覆盖为仅支持 CUDA 的版本。

#### 6. 对应用开发者意味着什么
*   **构建决策智能体**: 你现在可以通过全新的 Decision Model 工作流为二分类/多分类决策任务微调特定模型，其性能远超通用 LLM 提示词（从 30% 提升至 80% 的准确率）。
*   **RAG/工具可靠性**: 如果你的智能体依赖文件操作，请注意新的沙箱更新（PR [#12992](https://github.com/unslothai/unsloth/pull/12992)）——文件现在被移动到隐藏的 `.unsloth_attachments` 文件夹中，你需要更新相应的路径解析逻辑。
*   **MoE 部署**: 如果你正在消费级硬件（如 M5 Max、消费级 GPU）上托管大型 MoE 模型，请确保你的部署利用了新的 `llama-server` 标志，以防止在 VRAM 超出时出现灾难性的性能下降。

---

</details>

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*