# AI Infrastructure Digest 2026-10-28

> Generated: 2026-10-28 01:32 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# AI Infrastructure Ecosystem Analysis (2026-10-28)

### 1. Ecosystem Overview
The AI infrastructure landscape is currently dominated by a "stabilization and scale" mandate, with primary efforts shifting toward optimizing the inference stack for Blackwell (SM120) architectures and maturing speculative decoding pipelines. A significant divergence is emerging between low-level kernel performance tuning (vLLM/SGLang) and high-level application integration (llama.cpp/LiteLLM), the latter of which is aggressively adopting multi-modal, agentic, and "reasoning-aware" primitives. As model sizes and expert-moe complexities grow, the ecosystem is prioritizing memory efficiency and multi-tenant management over raw feature expansion.

### 2. Activity Comparison
*Note: Representative values based on 24h activity volume.*

| Project | Activity Volume (PR/Issues) | Release Status | Primary Focus |
| :--- | :--- | :--- | :--- |
| **vLLM** | Extreme | Stable (Patching) | Blackwell/ROCm kernel stability |
| **SGLang** | High | Stable (Refining) | PD-Disaggregation & Hopper optimizations |
| **llama.cpp** | High | Active (b11944) | LiquidAI LFM3 & reasoning-effort |
| **Ollama** | Moderate | RC (0.40.12) | Apple Silicon & Windows/CUDA reliability |
| **LiteLLM** | Moderate | Rapid (v1.109.x) | Enterprise cost-tracking & FIPS compliance |
| **Unsloth** | Low | Dormant | N/A |

### 3. Model Support Race
*   **LiquidAI LFM3 (Audio/Omni/VL/Decision):** Won decisively by **llama.cpp** and **Ollama**, establishing them as the primary targets for rapid deployment of emerging "omni" architectures.
*   **DeepSeek-V4.1-Flash:** A battleground for high-throughput serving; **vLLM** is focusing on low-latency kernel determinism (MXFP8), while **SGLang** is optimizing block-FP8 memory usage.
*   **Enterprise/Niche (Kimi-K3, GLM-5.3, Nemotron):** **SGLang** is leading in NPU (Ascend) and multi-node optimization for massive dense models, whereas **LiteLLM** is rapidly integrating pricing/telemetry support to enable commercial usage of these models.

### 4. Performance Frontier
Optimization efforts are currently bifurcated:
*   **Kernel & Hardware Level:** vLLM and SGLang are deeply invested in **Hopper (SM90/SM120)** and **ROCm (gfx942/950)**. Key tactics include GPU-side grid generation to eliminate CPU bottlenecks, MXFP8/FP4 GEMM kernel specialization, and tuning of Gated DeltaNet (GDN) kernels.
*   **System & Runtime Level:** llama.cpp and Ollama are prioritizing **MoE caching strategies** (e.g., `ClassLRU`) and **server-side memory management** (dynamic unloading). The move toward "reasoning-aware" sampling (adjusting compute effort per token) represents a new frontier in managing agentic latency.

### 5. Layer Positioning
*   **Serving Engines (vLLM, SGLang):** Deep-stack infrastructure. Focus on hardware-specific kernels, batching strategies (PD-disaggregation), and high-concurrency production deployments.
*   **Local Runtimes (llama.cpp, Ollama):** Edge-to-server flexibility. Focus on device-agnostic portability, multimodal integration (voice/video), and developer-friendly local orchestration.
*   **Gateway/Proxy (LiteLLM):** Orchestration layer. Focus on cost tracking, security (FIPS mode), observability, and normalizing heterogeneous model APIs for enterprise applications.

### 6. Trend Signals
*   **Reasoning Effort as an API:** The emergence of configurable "thinking" depth in server APIs (llama.cpp) suggests that reasoning agents will soon require standard interfaces to tune latency vs. accuracy on-the-fly.
*   **PD-Disaggregation as Default:** Operators should treat Prefill-Decode disaggregation as the new standard for production serving; legacy configurations are being deprecated rapidly in SGLang and vLLM.
*   **Multimodal Real-time:** The integration of end-to-end audio/video capabilities (LFM3) into local runtimes signals that low-latency voice agents are moving from research to standard infrastructure support.
*   **Developer Watch:** Monitor the `MooncakeStoreConnector` (vLLM) and `flashinfer` stability reports; memory corruption and silent accuracy degradation in quantized kernels are the highest risks for production deployments today.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Technical Digest - 2026-10-28

### 1. Today's Highlights
Development focus remains heavily centered on optimizing **DeepSeek-V4.1-Flash** performance for Blackwell (SM120) and ROCm (MI355X) architectures. Major engineering effort is currently directed toward stabilizing KV cache connectors, correcting LoRA metadata binding for hybrid models (Gemma 3/4), and refining attention backend test suites to address inter-component contract bugs.

### 2. Releases & Breaking Changes
*   **No new releases** in the last 24h. Maintainers are currently processing a high volume of PRs focused on stability and kernel-level performance tuning.

### 3. New Model & Hardware Support
*   **GLM-5.3-Flash:** Active performance tuning underway, specifically targeting ROCm `gfx942` optimizations for sparse indexers and prefill kernels ([#57406](https://github.com/vllm-project/vllm/issues/57406), [#63910](https://github.com/vllm-project/vllm/pull/63910)).
*   **NVIDIA Blackwell (SM120):** Priority tracking for decode throughput regressions in DeepSeek-V4.1-Flash under eager-mode constraints ([#56892](https://github.com/vllm-project/vllm/issues/56892)).
*   **ROCm (MI355X/gfx950):** Implementing draft-path fastpaths for speculative decoding ([#63182](https://github.com/vllm-project/vllm/pull/63182)).

### 4. Performance & Optimization
*   **DeepSeek-V4.1-Flash:** PR [#64147](https://github.com/vllm-project/vllm/pull/64147) pins specialized low-latency MXFP8 GEMM tactics for TP8, bypassing autotuning to ensure deterministic performance.
*   **ROCm Kernels:** Optimization of Gated DeltaNet (GDN) prefill kernels on `gfx942` by expanding the Triton autotune search space ([#62909](https://github.com/vllm-project/vllm/pull/62909)).
*   **Benchmarking:** Addition of `Zipf` routing distribution for synthetic MoE forward-pass benchmarks to better simulate real-world skewed expert workloads ([#64167](https://github.com/vllm-project/vllm/pull/64167)).

### 5. Stability & Regressions
*   **KV Cache Corruption (High Severity):** `MooncakeStoreConnector` reported silently corrupting KV data under BHLNC due to stride/length mismatch ([#64117](https://github.com/vllm-project/vllm/issues/64117)).
*   **Quantization Regression:** FP8 KV cache usage on Kimi-K3/MI355X causes massive accuracy degradation (GSM8K score drop from 0.975 to 0.305) ([#64106](https://github.com/vllm-project/vllm/issues/64106)).
*   **LoRA Metadata Binding:** Ongoing fixes for LoRA + MRV2 fast-prefill correctness issues across both eager and compile-only execution paths ([#59067](https://github.com/vllm-project/vllm/pull/59067), [#61162](https://github.com/vllm-project/vllm/pull/61162)).
*   **FlashInfer/SM90:** Fixed incorrect results in FP8 block-scale GEMM for non-row-contiguous activations ([#64040](https://github.com/vllm-project/vllm/pull/64040)).

### 6. What This Means for Application Developers
*   **Stability Warning:** If you are running hybrid models (Gemma 3/4) with LoRA, please monitor PRs [#59067](https://github.com/vllm-project/vllm/pull/59067) and [#61162](https://github.com/vllm-project/vllm/pull/61162); metadata binding bugs are currently being patched.
*   **Speculative Decoding:** Users relying on speculative decoding should be aware of a known issue where MTP speculative throughput drops to standard rates after specific sleep/wake cycles; a fix is in progress ([#52487](https://github.com/vllm-project/vllm/pull/52487)).
*   **Rust Frontend:** The Rust frontend currently has limitations with models lacking `tokenizer.json` or utilizing nested vocabulary structures (e.g., Qwen3-ASR) ([#61057](https://github.com/vllm-project/vllm/issues/61057)). Verify your model configuration before migrating to the Rust frontend.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

## SGLang Digest: 2026-10-28

### 1. Today's Highlights
The focus remains heavily on stabilizing Q4 roadmap items for Prefill-Decode (PD) disaggregation and scaling support for massive models like Kimi-K3 and DeepSeek-V4. Significant engineering effort is currently directed toward refining NVIDIA Hopper (SM90/SM120) performance, specifically optimizing block-FP8 decodes and MQA logits, while simultaneously maturing the AMD/ROCm and NPU (Ascend) backend parity.

### 2. Releases & Breaking Changes
*   **No new releases** were cut in the last 24 hours.
*   **API/Config:** `server_arguments_undocumented.txt` shows a push to standardize PD-disaggregation flags [#46904](https://github.com/sgl-project/sglang/pull/46904).
*   **Configuration:** Multi-key support for `--api-key` is now available, allowing comma-separated credentials to simplify multi-tenant management [#36666](https://github.com/sgl-project/sglang/pull/36666).

### 3. New Model & Hardware Support
*   **Embedding Models:** Added support for `nvidia/Nemotron-3-Embed-1B-BF16` and the NVFP4 variant [#45885](https://github.com/sgl-project/sglang/pull/45885).
*   **AMD/ROCm:** Continued enablement for consumer RDNA3/RDNA4 GPUs (gfx1100/gfx1201) and performance tracking for MI355X/gfx950 [#30599](https://github.com/sgl-project/sglang/issue/30599), [#44304](https://github.com/sgl-project/sglang/issue/44304).
*   **NPU (Ascend):** Ongoing work to stabilize Kimi-K3 on multi-node NPU clusters and DSpark compact mode for DeepSeek-V4 [#44967](https://github.com/sgl-project/sglang/pull/44967), [#38440](https://github.com/sgl-project/sglang/pull/38440).

### 4. Performance & Optimization
*   **Hopper GEMM:** A new W8A16 small-M GEMM kernel for GLM-5.2 FP8 decode projections achieved a **6.8% latency reduction** per token compared to default W8A8 paths, while saving ~8 GiB of VRAM compared to alternative implementations [#45862](https://github.com/sgl-project/sglang/pull/45862).
*   **Prefill Optimization:** Added support for GPU-side grid generation in Hunyuan3D to eliminate CPU-to-GPU copy bottlenecks [#46905](https://github.com/sgl-project/sglang/pull/46905).
*   **PD Disaggregation:** Improvements to the waiting-prefix LRU logic ensure requests in the bootstrap queue remain warm, preventing unnecessary eviction-induced stalls [#46812](https://github.com/sgl-project/sglang/pull/46812).

### 5. Stability & Regressions
*   **High Severity (Memory/Hang):**
    *   **MUSA Backend:** Speculative decoding hangs when using `fa3` and radix cache hits due to scheduler metadata computation errors [#46508](https://github.com/sgl-project/sglang/issue/46508).
    *   **Memory Access:** Reports of illegal memory access on RTX 6000 (sm_120) when running Qwen3.8-Flash-Next with EP2 parallelism [#44291](https://github.com/sgl-project/sglang/issue/44291).
*   **Medium Severity (Correctness):**
    *   **FlashInfer:** `flashinfer_mxfp4` is incorrectly computing SwiGLU instead of SiTU for Kimi-K3 on SM90 [#45755](https://github.com/sgl-project/sglang/issue/45755).
    *   **Speculative Decoding:** `update_weights_from_disk` lacks a selector, causing silent weight corruption when updating draft models in DFLASH [#46806](https://github.com/sgl-project/sglang/issue/46806).

### 6. What This Means for Application Developers
*   **Multi-tenancy:** If you are running a single SGLang instance serving multiple clients/users, you can now pass multiple API keys via comma-separated strings to improve security and monitoring without deploying multiple instances [#36666](https://github.com/sgl-project/sglang/pull/36666).
*   **PD-Disaggregation:** If you are deploying at scale, closely monitor the upcoming documentation for PD-disaggregation flags. It is becoming the "default" operating mode; verify your `ServerArgs` against the latest documentation to ensure you aren't using legacy, undocumented configurations [#46904](https://github.com/sgl-project/sglang/pull/46904).
*   **Deployment Stability:** If you are using speculative decoding (DSpark/EAGLE), stay on current versions with caution; several fixes related to metadata handling and memory access in draft models are currently in-flight to resolve hangs and silent errors [#46618](https://github.com/sgl-project/sglang/pull/46618), [#46806](https://github.com/sgl-project/sglang/issue/46806).

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest: 2026-10-28

### 1. Today's Highlights
The focus of the last 24 hours has been the rapid integration of the **LiquidAI LFM3 family**, including audio, omni, and decision models, alongside major feature additions for multimodal real-time conversations. Infrastructure work has pivoted toward optimizing MoE caching strategies and refining server-side memory management for dynamic model unloading.

### 2. Releases & Breaking Changes
*   **b11944:** Exposes reasoning effort levels to the chat template, allowing finer control over model "thinking" depths (minimal to max) via the server API [#31271](https://github.com/ggml-org/llama.cpp/pull/31271).
*   **Server Config:** New `--models-memory-max` parameter introduced to support dynamic unloading of models when memory thresholds are breached [#21231](https://github.com/ggml-org/llama.cpp/pull/21231).

### 3. New Model & Hardware Support
*   **LiquidAI LFM3:** Full integration for LFM3-Audio-2B, LFM3-Omni-2B, LFM3-1.7B, LFM3-VL-2B, and the d1-2B decision models [#31257](https://github.com/ggml-org/llama.cpp/pull/31257), [#31252](https://github.com/ggml-org/llama.cpp/pull/31252), [#31275](https://github.com/ggml-org/llama.cpp/pull/31275).
*   **Multimodal:** Added video input support for the LFM3 family in the `mtmd` CLI [#31283](https://github.com/ggml-org/llama.cpp/pull/31283).
*   **Hexagon Backend:** Added support for `DSV4_HC_PRE` and `DSV4_HC_POST` ops, improving performance on mobile/embedded targets [#30953](https://github.com/ggml-org/llama.cpp/pull/30953).

### 4. Performance & Optimization
*   **MoE Caching:** A new hybrid LRFU/MQ-inspired `ClassLRU` cache proposal shows **+6-7% decode throughput** gains on QFN/GLM models with 8% fewer cache uploads [#31233](https://github.com/ggml-org/llama.cpp/pull/31233).
*   **Hexagon Sampling:** Optimized `TOP_K` kernel for the backend sampler, addressing a significant bottleneck identified in X2 Elite profiling (formerly consuming 25-42% of draft batch time) [#31279](https://github.com/ggml-org/llama.cpp/pull/31279).
*   **Testing:** Refactored `save_models` in the test suite to bypass full context initialization, drastically accelerating tensor data generation and model-saving workflows [#31145](https://github.com/ggml-org/llama.cpp/pull/31145).

### 5. Stability & Regressions
*   **Memory/Safety (High):** A potential integer overflow in `ggml_nbytes()` that could lead to OOB memory access in the RPC path has been identified and patched [#31217](https://github.com/ggml-org/llama.cpp/pull/31217).
*   **Vulkan (Medium):** Ongoing issues with `vk::Queue::submit` device lost errors on iGPUs during large context usage (~50K+) and potential GPU hangs in `count_experts` shaders remain under investigation [#26447](https://github.com/ggml-org/llama.cpp/issues/26447), [#31163](https://github.com/ggml-org/llama.cpp/issues/31163).
*   **Speculative Decoding (Medium):** Reports of prefill slowdowns with MTP (`--spec-type draft-mtp`) on specific Windows/CUDA builds are being tracked; users are advised to avoid MTP on older prebuilt binaries until the sync is restored [#31085](https://github.com/ggml-org/llama.cpp/issues/31085), [#28790](https://github.com/ggml-org/llama.cpp/issues/28790).

### 6. What This Means for Application Developers
*   **Agentic Workflows:** If you are building "Reasoning" agents, start mapping your UI controls to the new `reasoning_effort` levels to optimize response times and token usage.
*   **Voice/Omni-Apps:** The extension of `/v1/realtime` and `mtmd` support for LFM3 enables high-fidelity, end-to-end voice and video applications with a native-feeling inference loop.
*   **Server Stability:** If running multiple models in production, the new `--models-memory-max` flag is a mandatory integration to prevent OOM kills in environments where you need to cycle through different model weights dynamically.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest: 2026-10-28

### 1. Today's Highlights
Development activity is heavily focused on refining the **MLX backend** for Apple Silicon and addressing **Windows/CUDA stability** under load. Significant effort is being directed toward robustifying multi-turn streaming for complex agentic workflows, including fixes for interrupted model downloads and OpenAI-compatible API error handling.

### 2. Releases & Breaking Changes
*   **No new releases** were tagged in the last 24 hours. 
*   **Note:** Version `0.40.12-rc1` remains the active testing branch. Developers should be aware of incoming changes to `llama-server` runtime requirements for LFM3 models.

### 3. New Model & Hardware Support
*   **LFM3 Architectures:** Initial support for LiquidAI's LFM3 models is being integrated via [PR #19344](https://github.com/ollama/ollama/pull/19344), which includes specific GGUF fixes and text-to-speech toggles for `llama.cpp` synchronization.
*   **Nemotron 3.5 Bolt 74B:** New support for this large-scale model is in progress, featuring per-layer expert configuration and LiLiCorr speculative decoding via the DFlash runner ([PR #19229](https://github.com/ollama/ollama/pull/19229)).
*   **Kolibri 1:** Added to the MLX backend support list ([PR #18780](https://github.com/ollama/ollama/pull/18780)).

### 4. Performance & Optimization
*   **Parallel MLX Execution:** [PR #19197](https://github.com/ollama/ollama/pull/19197) introduces concurrent generation support for MLX, allowing shared projection and feed-forward compute for better latency in multi-user/multi-agent environments.
*   **Heartbeat Mechanism:** [PR #19331](https://github.com/ollama/ollama/pull/19331) implements a loading heartbeat for the desktop UI to prevent stream timeouts during long prompt evaluations.

### 5. Stability & Regressions
*   **[Critical] CUDA Initialization Failures:** Reports of `shared object initialization failed` on RTX 5060 (Blackwell) continue; a fix is in progress to retry server startup with eager CUDA module loading ([PR #18978](https://github.com/ollama/ollama/pull/18978)).
*   **[High] Download Resumability:** A regression where server restarts break ongoing model pulls (resulting in "file not found" or "digest mismatch") is being addressed in [PR #19339](https://github.com/ollama/ollama/pull/19339).
*   **[Medium] MLX Panic on macOS:** Multiple reports ([#18885](https://github.com/ollama/ollama/issues/18885), [#19278](https://github.com/ollama/ollama/issues/19278)) of `mlx runner` panics during command buffer execution on M-series chips; engineers are investigating kernel-level Metal failures.
*   **[Medium] Windows Connection Resets:** Users are reporting connection resets on large prompt batches ([#19139](https://github.com/ollama/ollama/issues/19139)).

### 6. What This Means for Application Developers
*   **API Resilience:** If you are building agentic apps using Ollama as an OpenAI-compatible gateway, be aware that streaming error handling is being hardened ([PR #18953](https://github.com/ollama/ollama/pull/18953)). Expect more reliable reporting of errors that occur mid-stream rather than silent failures.
*   **Multimodal Ordering:** If working with Gemma 4 or similar models, ensure your embedding calls respect specific token interleaving; a fix for incorrect media marker positioning was submitted in [PR #19334](https://github.com/ollama/ollama/pull/19334).
*   **Tool/Developer Instruction Handling:** Improvements are landing to ensure system/developer roles and tool calls are preserved across API replays and compaction scenarios ([PR #19199](https://github.com/ollama/ollama/pull/19199), [#19309](https://github.com/ollama/ollama/pull/19309)). Use these for more consistent "System Prompt" behavior.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

### LiteLLM Infrastructure Digest: 2026-10-28

#### 1. Today's Highlights
LiteLLM is undergoing a significant version cycle shift, moving from the 1.108 line to 1.109, with a focus on stabilizing Enterprise features and improving cost-tracking granularity. Recent activity emphasizes addressing telemetry regressions, such as missing cost data for streaming responses and refinements to token counting logic, alongside a new security-focused `LITELLM_FIPS_MODE` startup gate.

#### 2. Releases & Breaking Changes
*   **Version Updates:** Releases [v1.106.5](https://github.com/BerriAI/litellm/releases/tag/v1.106.5) through v1.103.10 reflect the current rapid-patch cadence.
*   **Release Cadence:** Main branch has moved to [v1.109.0](https://github.com/BerriAI/litellm/pull/48673) development; operators should prepare for 1.109.x migration.
*   **Admin UI:** A mandatory rebuild of the Admin UI bundle is required to expose features (like the new chat model hub) added since the last stable build [PR #48692](https://github.com/BerriAI/litellm/pull/48692).

#### 3. New Model & Hardware Support
*   **Databricks/OpenJev:** Added pricing configuration for the `databricks-openjev-qwen35-4b` model to ensure accurate DBU-based cost logging [PR #48694](https://github.com/BerriAI/litellm/pull/48694).
*   **Search Providers:** Updated Tavily search integration to pass through full response envelopes, including `raw_content` and metadata, which were previously discarded [PR #48684](https://github.com/BerriAI/litellm/pull/48684).

#### 4. Performance & Optimization
*   **Guardrail Latency:** Optimization to the streaming path allows guardrails to skip per-chunk response inspection if the guardrail only concerns the request prompt, significantly reducing overhead for streaming completions [PR #47735](https://github.com/BerriAI/litellm/pull/47735).
*   **Token Counting:** Restored legacy precedence for prompt token counting to prevent `400 Bad Request` errors when users provide both `messages` and `prompt` fields [PR #48693](https://github.com/BerriAI/litellm/pull/48693).
*   **Redis Coherence:** Improved router performance by sharing session tier pins across proxy workers, reducing redundant round-trips for tool-use continuations [PR #48645](https://github.com/BerriAI/litellm/pull/48645).

#### 5. Stability & Regressions
*   **Security (High):** An ongoing issue with [eMudhra root CA](https://github.com/BerriAI/litellm/issues/47904) certificates in 1.106.x images remains a point of concern; users are advised to verify their trust chains.
*   **Cost Accuracy (Medium):** A regression caused some streaming requests to report `$0` spend for models not explicitly priced in the map; fix introduced to honor `usage.cost` reported by upstreams [PR #48287](https://github.com/BerriAI/litellm/pull/48287).
*   **Compliance (Medium):** Introduction of `LITELLM_FIPS_MODE=true` to enforce FIPS-compliant cryptographic startup checks [PR #48600](https://github.com/BerriAI/litellm/pull/48600).

#### 6. What This Means for Application Developers
*   **Observability:** Developers using Langfuse/OTEL should track the new metadata fields via `LITELLM_OTEL_V2=true` to ensure user/org identity is correctly mapped in traces [PR #42697](https://github.com/BerriAI/litellm/pull/42697).
*   **Pass-through Customization:** You can now label custom operations in your traces by sending the `x-litellm-operation-name` header, preventing non-chat pass-through calls from skewing your chat latency metrics [PR #48675](https://github.com/BerriAI/litellm/pull/48675).
*   **API Compatibility:** If your agent uses SAP or Anthropic tooling, ensure you are pulling the latest images, as several fixes for tool-call argument serialization and message ordering have been merged [PR #48696](https://github.com/BerriAI/litellm/pull/48696), [PR #45478](https://github.com/BerriAI/litellm/pull/45478).

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

No activity in the last 24 hours.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/jinming1345/agents-radar).*