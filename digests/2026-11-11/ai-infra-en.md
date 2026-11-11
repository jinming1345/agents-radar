# AI Infrastructure Digest 2026-11-11

> Generated: 2026-11-11 01:34 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

## Cross-Project Analysis: AI Infrastructure Digest (2026-11-11)

### 1. Ecosystem Overview
The AI infrastructure ecosystem is currently characterized by a massive push toward hardware-specific optimization for emerging accelerators (MI355X/MI450) and a shift from "raw speed" to "production reliability." Projects are pivoting to address the nuances of reasoning models and agentic workflows, with a heavy emphasis on mitigating memory management regressions and parser accuracy. The boundary between serving engines and application runtimes is blurring as projects like vLLM and SGLang incorporate sophisticated context-aware features to handle complex agentic tool-use scenarios.

### 2. Activity Comparison
*Note: Values reflect recent PR/Issue activity observed in the 2026-11-11 digest window.*

| Project | Recent PR Activity | Reported Stability Issues | Release Status |
| :--- | :--- | :--- | :--- |
| **vLLM** | High (AMD/Kernels) | High (Perf/Accuracy) | Stagnant |
| **SGLang** | High (Modularity/Kernels) | High (Decode/CI) | Stagnant |
| **llama.cpp** | High (Memory/Stability) | Medium (Spec. Decoding) | Frequent (b12250+) |
| **Ollama** | Moderate | Medium (MLX Leaks) | Stable (v0.40.17) |
| **LiteLLM** | Moderate | High (Streaming/Logic) | Stable |
| **Unsloth** | Moderate | Medium (Security/UI) | No new release |

### 3. Model Support Race
*   **The "Kimi/MiniMax" Expansion:** vLLM and Unsloth are leading the adoption of the latest Kimi (K3.1) and MiniMax (H3/M3.1) architectures.
*   **Specialized Reasoning/Decision Models:** Ollama is carving a niche in "Decision Models" (e.g., Liquid/Laya) and system-one architectures, moving beyond standard chat generation.
*   **Hardware Architecture parity:** While vLLM is aggressively tuning for AMD MI355X (gfx950), SGLang is aggressively targeting MI450 (gfx1250) and Ascend NPU, positioning them as the primary rivals for cross-platform enterprise scale.

### 4. Performance Frontier
The industry is moving away from generic optimization toward vertical-specific bottlenecks:
*   **KV Cache Management:** vLLM and llama.cpp are both wrestling with memory efficiency; vLLM is optimizing offloading/batching, while llama.cpp is fusing dequantization to reduce memory footprint.
*   **Reasoning-Optimized Serving:** SGLang and LiteLLM are struggling with the "Reasoning Tag" problem (e.g., `</think>` parsing), highlighting a new class of parser-related regressions that impact user-facing output.
*   **Kernel JIT:** SGLang is aggressively pruning static kernels in favor of JIT-compiled kernels, a strategy that offers better performance on variable hardware but has introduced CI instability.

### 5. Layer Positioning
*   **Inference Engines (vLLM, SGLang):** Focused on high-concurrency throughput, distributed serving, and custom CUDA/HIP kernels. They are the "heavy lifting" layer for multi-tenant production.
*   **Local Runtimes (llama.cpp, Ollama):** Prioritizing ease-of-use, cross-platform hardware support (Vulkan/SYCL), and agentic integration. They act as the primary interface for local AI and LLM-app prototyping.
*   **Gateways (LiteLLM):** Focused on observability, cost control, and model-agnostic routing. They serve as the orchestration layer that abstracts the complexity of the underlying model providers.
*   **Fine-tuning Frameworks (Unsloth):** Moving up the stack to integrate Studio-based UI for multimodal workflows, positioning itself as an end-to-end workbench for model customization.

### 6. Trend Signals
*   **The Parsing Fragility:** As models emit "Thinking" blocks, infrastructure is failing to handle these secondary streams gracefully. Developers should expect stricter parsing requirements and should avoid hardcoded delimiters.
*   **The "Alias-Hopping" Threat:** LiteLLM’s focus on resolving alias-specific quotas suggests that cost-management in large-scale deployments is shifting toward "identity-aware" billing that tracks models even after fallback/routing logic is applied.
*   **Hardware Divergence:** With AMD MI450 and Ascend NPU support emerging, hardware lock-in is decreasing. However, the performance regressions noted in the digest (vLLM on B300, SGLang on H20) indicate that **"Upgrade-before-Testing" is dangerous** in the current landscape; infrastructure teams must implement rigorous canary deployments for new engine versions.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

## vLLM Infrastructure Digest: 2026-11-11

### 1. Today's Highlights
Development activity is heavily focused on fine-tuning the **ROCm/AMD MI355X (gfx950)** software stack and addressing deep-stack performance regressions in high-concurrency environments. Major efforts are underway to unify the model loading pipelines across quantization formats and improve CI turnaround times for AMD hardware.

### 2. Releases & Breaking Changes
*   **No new releases** were cut in the last 24 hours.

### 3. New Model & Hardware Support
*   **Rubin VR200:** Support added to the Kimi-K3 and MiniMax-M3.1-Flash recipes ([PR #65400](https://github.com/vllm-project/vllm/pull/65400)).
*   **ROCm/MI355X Kernel:** Integration of `AiterFlyDSLMxfp8LinearKernel` for MXFP8 linear layers on gfx950, leveraging AITER’s tuned GEMM kernels ([PR #65479](https://github.com/vllm-project/vllm/pull/65479)).
*   **Transformers Backend:** Work has commenced to transition `Qwen2` to the unified Transformers modeling backend ([PR #66821](https://github.com/vllm-project/vllm/pull/66821)).

### 4. Performance & Optimization
*   **Speculative Decoding:** Added `num_speculative_tokens_under_prefill_load` config to dynamically shorten drafts during prefill-heavy phases, improving TTFT and E2EL without sacrificing TPOT ([PR #66226](https://github.com/vllm-project/vllm/pull/66226)).
*   **I/O Efficiency:** Introduced batched `O_DIRECT` reader (io_uring) for Qwen PLE disk offloading to replace buffered `preadv` calls ([PR #66464](https://github.com/vllm-project/vllm/pull/66464)).
*   **Vision Model Latency:** Addressing host-synchronization bottlenecks in `Dots3Note` vision tower; removing blocking `Tensor.to()` calls ([PR #66783](https://github.com/vllm-project/vllm/pull/66783)).
*   **KV Cache:** Performance investigation into redundant K/V cache view re-derivation in Triton/Eager backends ([Issue #64572](https://github.com/vllm-project/vllm/issues/64572)).

### 5. Stability & Regressions
*   **Critical Regression (Accuracy):** Qwen3.5-122B-A10B-FP8 showing GSM8K accuracy degradation at commit `0fae39a` ([Issue #65906](https://github.com/vllm-project/vllm/issues/65906)).
*   **Critical Regression (Performance):** DeepSeek-V4-Flash reports severe (27x) KV concurrency regression on B300 hardware ([Issue #51799](https://github.com/vllm-project/vllm/issues/51799)).
*   **System Stability:** `DFlash` acceptance issues identified at TP > 1 for MiMo-V2.6 models ([Issue #66387](https://github.com/vllm-project/vllm/issues/66387)).
*   **Runtime Crash:** `FlashInferMLASparseSM120Impl` is triggering engine crashes on GB10 (sm_121) due to missing `masked_mha_available` attribute ([Issue #51920](https://github.com/vllm-project/vllm/issues/51920)).

### 6. What This Means for Application Developers
*   **AMD Deployments:** If you are running MI355X/gfx950, prioritize testing with the latest main branch; new AITER-tuned kernels are being integrated to stabilize performance for MXFP8 workloads.
*   **Speculative Decoding:** If your application experiences high latency during periods of heavy prefill (e.g., long-context RAG), keep an eye on the upcoming `num_speculative_tokens_under_prefill_load` feature, which is designed to balance draft length against prefill overhead.
*   **Structured Output:** Be aware that xgrammar support for JSON schemas nested in `structural_tag` is being tightened; ensure your schemas are strictly compliant to avoid silent keyword dropping ([PR #58940](https://github.com/vllm-project/vllm/pull/58940)).

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest: 2026-11-11

### 1. Today's Highlights
The SGLang ecosystem is seeing a heavy push toward architectural modularity, with significant efforts to prune legacy dependencies like `triton_kernels` in favor of streamlined JIT-kernel compilation. Meanwhile, hardware-specific performance tuning remains the dominant theme, particularly for large-scale deployments on NVIDIA Hopper (SM90/SM103) and emerging support for AMD MI450 (gfx1250) accelerators.

### 2. Releases & Breaking Changes
* **No new releases** in the last 24h.
* **Deprecation Notice:** Ongoing effort to remove `triton_kernels` from the `sglang-kernel` wheel continues ([PR #49662](https://github.com/sgl-project/sglang/pull/49662)), following the JIT-kernel migration for MXFP4 MoE weights ([PR #49661](https://github.com/sgl-project/sglang/pull/49661)).

### 3. New Model & Hardware Support
* **AMD MI450 (gfx1250):** Initial work on optimized ring all-reduce and "2shot_push" kernels to address interconnect bottlenecks ([PR #49377](https://github.com/sgl-project/sglang/pull/49377)).
* **Ascend NPU:** New breakable prefill graph support for DeepSeek-V4 and Ascend-optimized MoE layers ([PR #49481](https://github.com/sgl-project/sglang/pull/49481)).
* **Diffusion:** Support for quantized checkpoints (FP8/NVFP4) in `DiffusionGemma` ([PR #49211](https://github.com/sgl-project/sglang/pull/49211)).

### 4. Performance & Optimization
* **Hopper/SM103:** Optimized residual gating for Joy Image Edit reduces kernel overhead significantly by retaining FP32 products ([PR #49391](https://github.com/sgl-project/sglang/pull/49391)).
* **Diffusion Tuning:** New kernel fusion for RMSNorm/residual epilogues in Ming's DiT ([PR #49456](https://github.com/sgl-project/sglang/pull/49456)) and timestep modulation reuse in Anima ([PR #49504](https://github.com/sgl-project/sglang/pull/49504)).
* **FlashInfer Autotuning:** Improved autotune logic to avoid zero-filled `input_ids`, ensuring more accurate expert routing profiling ([PR #49497](https://github.com/sgl-project/sglang/pull/49497)).

### 5. Stability & Regressions
* **[High] Decode Regression:** Users report a **33–45% per-step decode latency spike** on H20-3e (SM90) when upgrading from v0.5.22 to v0.5.23, linked to the `use_deep_select_decode` feature ([Issue #49336](https://github.com/sgl-project/sglang/issues/49336)).
* **[Medium] Reasoning Parser:** Bug found where literal `</think>` tags quoted within a model's CoT cause premature truncation of the reasoning content ([Issue #48791](https://github.com/sgl-project/sglang/issues/48791)).
* **[Medium] AMD All-Reduce:** Rank-divergent sums observed on RDNA3/4 (gfx12) during PCIe all-reduce operations due to relaxed start flags ([Issue #49657](https://github.com/sgl-project/sglang/issues/49657)).
* **[Medium] CI Stability:** B200 runners are hitting 60-minute timeouts on JIT kernel compilation following changes to shared headers ([Issue #49340](https://github.com/sgl-project/sglang/issues/49340)).

### 6. What This Means for Application Developers
* **Reasoning Models:** If your application relies on parsing specific `<think>` tags, be aware that models quoting these tags in their output may currently result in truncated content. A fix or workaround in your prompt/parsing logic may be required until [Issue #48791](https://github.com/sgl-project/sglang/issues/48791) is resolved.
* **Migration Alert:** If you are running high-concurrency workloads on H20/Hopper, **defer upgrading to v0.5.23** until the regression noted in [Issue #49336](https://github.com/sgl-project/sglang/issues/49336) is patched, as it significantly impacts per-step decode performance.
* **Extensibility:** The new public hooks for attention layers ([PR #49681](https://github.com/sgl-project/sglang/pull/49681)) make it easier to integrate custom model architectures (e.g., TorchTitan-based) into the SGLang serving stack without modifying internal core code.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest: 2026-11-11

### 1. Today's Highlights
The `llama.cpp` ecosystem saw significant focus on stabilizing GPU memory management, specifically addressing VMM pool reservation issues on NVIDIA hardware and refining compute buffer sharing across subcontexts in the `mtmd` (multi-modal) framework. Application developers should note improved robustness in JSON grammar generation and tool-use argument sanitization, enhancing the reliability of agentic workflows.

### 2. Releases & Breaking Changes
*   **Builds b12250–b12263:** A flurry of releases focused on stability and modularization.
    *   **Breaking/Refactor:** CUDA state logic (graphs/concurrent streams) has been extracted from `common.cuh` to `ggml-cuda.cu` to prevent redundant full-project recompilation during CUDA kernel tuning ([#32001](https://github.com/ggml-org/llama.cpp/pull/32001)).
    *   **Dependency:** `cpp-httplib` updated to v0.66.0 ([#32049](https://github.com/ggml-org/llama.cpp/pull/32049)).

### 3. New Model & Hardware Support
*   **Kimi K3.1 Vision:** Added support for the K3.1 vision model, including specific fixes for projector MLP and pre-processing ([#31980](https://github.com/ggml-org/llama.cpp/pull/31980)).
*   **Zonos3-Mini:** Initial support for the Zonos3-Mini TTS model added ([#32020](https://github.com/ggml-org/llama.cpp/pull/32020)).
*   **CANN/Ascend NPU:** Ongoing work to stabilize Flash Attention on Ascend NPUs by correctly passing attention masks to avoid NaN outputs ([#31590](https://github.com/ggml-org/llama.cpp/pull/31590)).

### 4. Performance & Optimization
*   **CUDA Memory Efficiency:** VMM pool reservation size halved to 8GB for combined-memory GPUs to mitigate OOM errors; includes auto-retry logic on reservation failure ([#30542](https://github.com/ggml-org/llama.cpp/pull/30542)).
*   **Fused KV Dequantization:** A pending PR aims to fuse `q8_0`/`q4_0` KV dequantization directly into `fattn-mma-f16` kernels, eliminating the need to materialize full f16 tensors in scratch memory ([#31802](https://github.com/ggml-org/llama.cpp/pull/31802)).
*   **Granite-Switch:** Optimization of adapter delta gating significantly improves decode latency (reported as 11.1x speedup in batch-1 scenarios) ([#32047](https://github.com/ggml-org/llama.cpp/pull/32047)).

### 5. Stability & Regressions
*   **Critical (Speculative Decoding):** Long-standing issue ([#9949](https://github.com/ggml-org/llama.cpp/issues/9949)) regarding segfaults during speculative decoding with 405B models remains open. 
*   **Memory/Resource (SYCL/Vulkan):** Users of dual-GPU setups (Intel Arc Pro B60/B70) continue to face stalling and TDR resets when utilizing high-memory MoE caches or specific `--split-mode` configurations ([#31510](https://github.com/ggml-org/llama.cpp/issues/31510), [#28778](https://github.com/ggml-org/llama.cpp/issues/28778)). 
*   **Correctness:** A bug in `json-schema` generation for `allOf` types producing empty grammars was identified and addressed ([#31834](https://github.com/ggml-org/llama.cpp/pull/31834)).

### 6. What This Means for Application Developers
*   **Agentic Reliability:** Tool-use calls now correctly escape control characters (e.g., `<LF>`), preventing invalid JSON being returned to clients during function calling ([#31937](https://github.com/ggml-org/llama.cpp/pull/31937)). Ensure you update to benefit from these sanitization improvements.
*   **Tooling:** A new `search_chats` tool has been introduced to the web UI, signaling an expansion of the built-in RAG capabilities for local interfaces ([#32051](https://github.com/ggml-org/llama.cpp/pull/32051)).
*   **Deployment:** If you are running `llama-server` on constrained hardware (e.g., integrated GPUs or consumer NVIDIA cards), the reduction in VMM pool size and the addition of improved memory handling for quantized KV caches will provide a much more stable inference environment.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Infrastructure Digest: 2026-11-11

### 1. Today's Highlights
Ollama continues to mature its agentic infrastructure, prioritizing flexible control over reasoning models and deep integration of speculative decoding metrics. Significant architectural progress was made in the MLX backend, specifically introducing concurrent generation and expanded support for advanced model architectures like Nemotron 3.5 Bolt.

### 2. Releases & Breaking Changes
*   **v0.40.17**: Released with improvements to the ChatGPT CLI restoration logic and refined thinking metadata integration for OpenCode settings. Notably, the Vulkan backend now defaults to `mmap` for integrated GPUs to improve memory efficiency ([#19583](https://github.com/ollama/ollama/pull/19583), [#19409](https://github.com/ollama/ollama/pull/19409)).

### 3. New Model & Hardware Support
*   **Nemotron 3.5 Bolt**: Added support for the 74B-A9B model, utilizing the DFlash runner with expert-specific quantization and mixed-precision stacking ([#19229](https://github.com/ollama/ollama/pull/19229)).
*   **Video Support**: MLX now supports video input (MP4/MOV) for models like LFM3-VL and Qwen3.5/3.6, with automatic capability detection ([#19348](https://github.com/ollama/ollama/pull/19348)).
*   **Upstream Bumps**: Updated to `llama.cpp` b12257 and latest MLX/MLX-C versions ([#19646](https://github.com/ollama/ollama/pull/19646), [#19647](https://github.com/ollama/ollama/pull/19647)).

### 4. Performance & Optimization
*   **Concurrent Generation (MLX)**: The MLX runner now supports `OLLAMA_NUM_PARALLEL` for concurrent request handling, sharing compute for projections while maintaining independent attention caches ([#19197](https://github.com/ollama/ollama/pull/19197)).
*   **Speculative Decoding Metrics**: New reporting for per-request acceptance rates and token drafting efficiency, providing better visibility into latency gains ([#19368](https://github.com/ollama/ollama/pull/19368)).
*   **Benchmarking Controls**: Added the ability to toggle speculative decoding (`draft_num_predict=0`) at the request level, allowing precise measurement of speedup overhead ([#19391](https://github.com/ollama/ollama/pull/19391)).

### 5. Stability & Regressions
*   **[High] MLX Memory Leaks**: Resolved an issue where KV-cache memory accumulated monotonically per-request, failing to release without a restart ([#17875](https://github.com/ollama/ollama/pull/17875)).
*   **[Medium] Windows/Vulkan Stability**: Ongoing reports of `ErrorOutOfDeviceMemory` or disconnects on high-end hardware (RTX 5090) and Intel Iris Xe during heavy tool-calling sessions ([#19439](https://github.com/ollama/ollama/issues/19439), [#18531](https://github.com/ollama/ollama/issues/18531)).
*   **[Low] Network/DNS**: Users behind DNS64/NAT64 are encountering issues pulling models from Hugging Face due to CDN address validation strictness ([#19345](https://github.com/ollama/ollama/issues/19345)).

### 6. What This Means for Application Developers
*   **Dynamic Thinking Controls**: You can now move away from hardcoding model names for reasoning support. Use the `/api/show` endpoint to check the `capabilities` array and `thinking` fields to dynamically enable/disable UI toggles for reasoning ([#19648](https://github.com/ollama/ollama/pull/19648)).
*   **OpenAI Compatibility**: Ollama now respects `max_completion_tokens` in Chat Completions, allowing for stricter budget control over model output ([#19168](https://github.com/ollama/ollama/pull/19168)).
*   **System One Models**: A new category of "Decision Models" (e.g., Liquid/Laya) is emerging for classification/scoring tasks without generation. Watch for emerging support for the `/v1/systemone` wire format ([#19639](https://github.com/ollama/ollama/issues/19639)).

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

## LiteLLM Technical Digest | 2026-11-11

### 1. Today's Highlights
LiteLLM is focusing on hardening the Proxy gateway for production-grade observability and multi-tenant reliability, with active work on database-backed scheduled maintenance and improved usage alerting. Infrastructure teams should note the critical efforts to align rate-limiting and quota enforcement across complex model alias transitions.

### 2. Releases & Breaking Changes
*   **Version Updates:** Several minor releases landed, ranging from `v1.103.11` to `v1.110.0-rc.1`. 
*   **Security:** All images are signed with `cosign` (Key: `e82a3c6`). Users are encouraged to switch to the `ghcr.io/berriai/litellm:lts` tag for stability. [Release Notes](https://github.com/BerriAI/litellm/releases)

### 3. New Model & Hardware Support
*   **Gemini Batch Processing:** New PR [#51032](https://github.com/BerriAI/litellm/pull/51032) adds support for file-backed batch jobs on the `/v1/batches` endpoint for Gemini, addressing current 400 errors in gateway orchestration.
*   **Claude Code Discovery:** Re-landed PR [#35455](https://github.com/BerriAI/litellm/pull/35455) enables Anthropic-native `/v1/models` discovery, facilitating seamless integration with Claude Code 2.1.126+ gateway workflows.

### 4. Performance & Optimization
*   **Rate-Limiting Logic:** PR [#51082](https://github.com/BerriAI/litellm/pull/51082) updates the v3 rate limiter to correctly settle tokens on the specific model group that serviced a request during a fallback scenario, preventing inaccurate usage attribution.
*   **Resource Cleanup:** PR [#50131](https://github.com/BerriAI/litellm/pull/50131) shifts spend-log cleanup from per-process timers to a centralized, database-backed scheduler, reducing redundant overhead across proxy replicas.
*   **Memory Regression Fix:** [Issue #50740](https://github.com/BerriAI/litellm/issues/50740) (Fixed) addressed a linear memory growth issue in proxy workers caused by unreleased Redis batch scopes.

### 5. Stability & Regressions
*   **Critical (High):** [Issue #50156](https://github.com/BerriAI/litellm/issues/50156) reports OpenRouter streaming emitting empty assistant choices without usage, disrupting downstream parsers.
*   **Critical (High):** [Issue #49795](https://github.com/BerriAI/litellm/issues/49795) notes that reasoning-only prefixes can erroneously trigger `sent_first_chunk`, causing mid-stream failures to lose their fallback capacity.
*   **Moderate:** [Issue #51029](https://github.com/BerriAI/litellm/issues/51029) reports OTel spans logging the requested model alias rather than the actual model generated, which may impact cost/performance analytics.
*   **Moderate:** PR [#50995](https://github.com/BerriAI/litellm/pull/50995) fixes false-positive logging warnings regarding `reasoning_effort` drops on Azure GPT-5 models.

### 6. What This Means for Application Developers
*   **Budgeting Integrity:** If your application relies on budget waivers or team-specific quotas, be aware of PR [#51058](https://github.com/BerriAI/litellm/pull/51058), which ensures quota enforcement uses the final resolved model alias, preventing "alias-hopping" to bypass cost controls.
*   **Anthropic/Bedrock Integrations:** Developers using Bedrock-hosted Claude models should review PR [#51092](https://github.com/BerriAI/litellm/pull/51092), which corrects `max_tokens` default behavior, preventing unexpected `finish_reason: "length"` cutoffs on long responses.
*   **Tooling/MCP:** Users of MCP tools should track [Issue #49359](https://github.com/BerriAI/litellm/issues/49359), as current failures in MCP tool execution drop the `is_error` flag, which may prevent agentic error-handling loops from triggering.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest: 2026-11-11

### 1. Today's Highlights
Unsloth development is heavily focused on expanding the capabilities of **Unsloth Studio**, particularly regarding multimodal image editing and refined integration with external inference providers. Infrastructure improvements for the Desktop application continue, with significant work toward stabilizing reverse proxy support and improving security for seeded administrative credentials.

### 2. Releases & Breaking Changes
*   **No new formal releases** in the last 24 hours.
*   **Breaking/Security Note:** PR [#17454](https://github.com/unslothai/unsloth/pull/17454) implements a fix to prevent sensitive admin password leakage in scenarios where Unsloth Desktop is served behind a reverse proxy.

### 3. New Model & Hardware Support
*   **MiniMax-H3-Image:** PR [#17453](https://github.com/unslothai/unsloth/pull/17453) adds support for the `MiniMax-H3-Image` model within Studio, enabling text-to-image generation and multi-reference image editing (1–16 images).
*   **SD.cpp Update:** PR [#17459](https://github.com/unslothai/unsloth/pull/17459) bumps the stable-diffusion.cpp prebuilt to master-982-0518b34-ueb0e729 to ensure compatibility with latest pipeline changes.

### 4. Performance & Optimization
*   **Context Management:** PR [#17457](https://github.com/unslothai/unsloth/pull/17457) introduces auto-compaction for long chats on Ollama connections, resolving issues where context length discrepancies between Studio and Ollama led to silent truncation of prompt history.
*   **Tool-Calling Optimization:** PR [#17426](https://github.com/unslothai/unsloth/pull/17426) optimizes `max_tokens` allocation for vLLM and SGLang backends, ensuring the `context_length_exceeded` error is avoided when combined prompt + tool tokens exceed the window limit.

### 5. Stability & Regressions
*   **Security (High):** [#17420](https://github.com/unslothai/unsloth/issues/17420) / [#17435](https://github.com/unslothai/unsloth/pull/17435): Desktop GUI returns 404 under custom reverse proxies; a fix is currently in PR.
*   **Tool Use (Medium):** [#17015](https://github.com/unslothai/unsloth/issues/17015): Reports repeated full-prompt processing during tool-use loops in Qwen3.8-27B GGUF.
*   **Tool/Thinking Block (Medium):** [#17455](https://github.com/unslothai/unsloth/pull/17455): Fixes a UI bug where a literal `</think>` tag persisted in chat history after tool calls, potentially polluting future context.
*   **CPU Parallelism (Medium):** [#17054](https://github.com/unslothai/unsloth/issues/17054): Pipeline parallel on CPU backend shows divergence in MoE router loss when gradient accumulation > 1.

### 6. What This Means for Application Developers
*   **Agent Builders:** If you are building agents that utilize tool calling with OpenAI-compatible endpoints, the fix in [#17455](https://github.com/unslothai/unsloth/pull/17455) is critical to prevent prompt contamination. Ensure you are aware that `max_tokens` calculation now accounts for tool-call overhead (PR [#17426](https://github.com/unslothai/unsloth/pull/17426)).
*   **Deployment Engineers:** If hosting Unsloth Desktop behind Cloudflare Tunnels or custom reverse proxies, you must review the security changes in [#17454](https://github.com/unslothai/unsloth/pull/17454) to ensure your reverse proxy configuration does not inadvertently expose administrative endpoints to external traffic.
*   **Frontend/Workflow Integrators:** Search capabilities in the Model Hub are being upgraded to be "capability-aware." If you are surfacing model lists via API, prepare for filtering models by tags like `audio`, `vision`, or `reasoning` (PR [#17452](https://github.com/unslothai/unsloth/pull/17452)).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/jinming1345/agents-radar).*