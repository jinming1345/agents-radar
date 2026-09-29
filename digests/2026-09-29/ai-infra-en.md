# AI Infrastructure Digest 2026-09-29

> Generated: 2026-09-29 02:16 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

This analysis synthesizes the infrastructure landscape as of September 29, 2026, tracking the rapid transition toward agentic workflows, "Decision Model" architectures, and hardware-specific kernel optimization.

### 1. Ecosystem Overview
The AI infrastructure ecosystem is currently hyper-focused on transitioning from "chat-optimized" backends to "agentic-native" architectures that prioritize structured decision-making and disaggregated compute. Major projects are aggressively adopting multi-node synchronization, specialized "Decision Model" APIs, and advanced quantization (MXFP4/8) to reconcile long-context requirements with strict VRAM limitations. The industry is moving toward a bifurcated stack: robust, high-throughput server-side engines (vLLM, SGLang) and increasingly sophisticated local/edge runtimes (Ollama, Unsloth, llama.cpp).

### 2. Activity Comparison
*Note: Representative values based on the provided digest activity.*

| Project | Feature/PR Intensity | Stability Issues (Open/High) | Release Momentum |
| :--- | :--- | :--- | :--- |
| **vLLM** | Extreme (Core Arch) | High (KV Corruption) | Stable (Main branch) |
| **SGLang** | High (Dist-KVCache) | High (Server Crashes) | None (Active dev) |
| **llama.cpp** | High (Batch API) | Medium (Server/Hang) | High (Daily builds) |
| **Ollama** | Moderate (System One) | High (Billing/CUDA) | Active (v0.35.0) |
| **LiteLLM** | Moderate (Ops/Proxy) | High (DB/Schema) | Active (v1.104.0) |
| **Unsloth** | High (Tooling/Studio) | Medium (Stalls) | Active (Beta) |

### 3. Model Support Race
*   **DeepSeek-V4.1:** vLLM and SGLang are in a dead heat, both prioritizing deep kernel optimization (MLA/Sparse Indexing) for this architecture.
*   **GLM-5.3:** SGLang is currently leading on optimization for this model (Triton-based sparse attention), while vLLM handles sharding/scaling.
*   **Decision Models:** Unsloth and Ollama are leading the charge in "Decision Models" (Laya/System One), pivoting the ecosystem toward programmatic output routing over pure generative text.
*   **Multimodal/Audio:** llama.cpp remains the leader in breadth, adding support for audio-specific architectures (GraniteSpeech, Parakeet) and complex content arrays.

### 4. Performance Frontier
*   **KV Cache:** The frontier has shifted to **Disaggregated Serving** (Render/Generate/Derender pipelines in vLLM and SGLang) and **Distributed KV Cache** to support agentic memory.
*   **Kernel Fusion:** Optimization is moving away from generic Torch/Triton paths toward hardware-specific micro-kernels (e.g., AMD `gfx950` MFMA paths, NV `SM100` fusion gates).
*   **Quantization:** `MXFP4` and `FP8` are now standard requirements for production workloads, with developers shifting focus from "can we run this?" to "how do we prevent bit-identical drift?" in these precision formats.
*   **CPU/Offloading:** A critical trend is the offloading of speculative decoding (MTP) drafters to the CPU (llama.cpp) to accommodate massive models on consumer-grade VRAM (8-12GB).

### 5. Layer Positioning
*   **Serving Engines (vLLM, SGLang):** Deep infrastructure focused on throughput, memory sharding, and multi-node orchestration.
*   **Local Runtimes (Ollama, Unsloth, llama.cpp):** Focused on UX, developer velocity, and bringing large model performance to consumer hardware (Apple Silicon, mixed GPU rigs).
*   **Gateways/Proxy (LiteLLM):** The abstraction layer for multi-model/multi-tenant enterprises, focused on cost-attribution, guardrails, and unifying diverse provider schemas.
*   **Training/Fine-Tuning (Unsloth):** Lower-level optimization focused on memory-efficient training for fine-tuning architectures.

### 6. Trend Signals
*   **The "System One" Pivot:** The shift in Ollama and Unsloth toward "Decision Models" indicates that developers should move agentic logic (routing, scoring, triage) out of chat-completion pipelines and into structured, programmatic API endpoints to reduce token waste and latency.
*   **Infrastructure Fragility:** Rapid innovation in disaggregated serving is introducing critical stability risks. Developers should implement a **"Middleware Proxy Layer"** (input validation/schema sanitization) to prevent malformed requests from triggering server-wide DoS in engines like SGLang.
*   **Observability Bottlenecks:** Performance metrics (like `/metrics` scrapers) are currently causing production stalls; infrastructure teams must move to non-blocking observability patterns.
*   **Hardened Tooling:** Expect "Schema/Guardrail" validation to become a top-tier priority as agentic systems move into enterprise production, with LiteLLM leading the focus on cost-attribution and security guardrails.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Technical Digest: 2026-09-29

### 1. Today's Highlights
Development efforts are currently heavily focused on scaling **DeepSeek-V4.1** support across both NVIDIA and AMD platforms, with major progress in optimizing sparse indexing and MLA (Multi-Head Latent Attention) kernels. Simultaneously, the core team is formalizing the **disaggregated serving architecture** (Render/Generate/Derender) and addressing critical stability issues in KV-cache management and spec-decoding pipelines.

### 2. Releases & Breaking Changes
*   **None.** No formal releases in the last 24h; development remains on the `main` branch.

### 3. New Model & Hardware Support
*   **DeepSeek-V4.1 (AMD/ROCm):** Significant enablement work for DeepSeek-V4.1 on `gfx950` (MI355X).
    *   [PR #58671](https://github.com/vllm-project/vllm/pull/58671): Paged MXFP4 sparse indexer for the aiter MQA-logits kernel.
    *   [PR #57523](https://github.com/vllm-project/vllm/pull/57523): MXFP8 KV cache record reading.
    *   [PR #57463](https://github.com/vllm-project/vllm/pull/57463): Support for `nvfp4_ds_mla` compressed KV cache on ROCm.
*   **GLM-5.3 Performance:** [PR #54951](https://github.com/vllm-project/vllm/pull/54951) introduces row-sharding for long-context indexer prefill, optimizing sparse indexer performance across TP ranks.

### 4. Performance & Optimization
*   **Disaggregated Serving (P/D):** [PR #52162](https://github.com/vllm-project/vllm/pull/52162) improves PCP (Prefill/Compute/Predict) efficiency by sharding decode-only requests across ranks, eliminating redundant computations previously replicated on every rank.
*   **Multimodal Inference:** [PR #58122](https://github.com/vllm-project/vllm/pull/58122) adds CUDA graph support for LLaVA encoders (fixed-resolution), reducing launch overhead for vision-heavy workloads.
*   **Tooling:** [PR #59019](https://github.com/vllm-project/vllm/pull/59019) introduces a meta-device operator profiler, allowing developers to capture model execution flows (shapes, dtypes, op ordering) without requiring actual GPU memory allocation.

### 5. Stability & Regressions
*   **KV Cache Corruption (High Severity):** [Issue #53912](https://github.com/vllm-project/vllm/issues/53912) reports persistent output corruption on hybrid Mamba/GDN models when using prefix caching + MTP.
*   **Speculative Decoding Crashes:** [PR #58165](https://github.com/vllm-project/vllm/pull/58165) provides a fix for an engine crash-loop during FlashInfer warmup caused by incorrect bucket rounding when using `mxfp8`/`fp4` kernels.
*   **Fault Tolerance:** [PR #56430](https://github.com/vllm-project/vllm/pull/56430) addresses a KV-block leak occurring during worker failure in disaggregated P/D setups.
*   **Consistency Issues:** [Issue #58636](https://github.com/vllm-project/vllm/issues/58636) identifies that GLM-5.x sparse indexers may produce non-deterministic results between runs due to rank-dependent autotuning of replicated key norms.

### 6. What This Means for Application Developers
*   **Agentic/Multi-step Apps:** The ongoing work on the **Programmable KV Cache** ([RFC #57103](https://github.com/vllm-project/vllm/issues/57103)) indicates a shift toward allowing better control over KV retention and placement, which will eventually allow agents to manage long-term conversation history more efficiently without clearing the entire cache.
*   **Disaggregated Serving:** The maturation of the Render/Generate/Derender endpoints (as seen in [RFC #42729](https://github.com/vllm-project/vllm/issues/42729) and [RFC #56851](https://github.com/vllm-project/vllm/issues/56851)) suggests that high-scale production environments will soon rely on these specialized endpoints for better control over tokenization and output formatting across separate hardware tiers.
*   **Robustness:** If you are running hybrid MoE or quantization-heavy models (e.g., FP8/INT4), proceed with caution on `main`; several issues regarding kernel autotuning and precision-specific model loading are currently being actively patched.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

## SGLang Digest: 2026-09-29

### 1. Today's Highlights
Development focus remains heavily pinned on scaling infrastructure for large-scale agentic workloads, with significant activity surrounding distributed KV cache management and context parallelism (CP) optimizations. Engineering efforts are currently split between stabilizing support for next-gen hardware (SM100, gfx950) and hardening the distributed prefill/decode pipeline against synchronization and state-stride mismatches.

### 2. Releases & Breaking Changes
*   **None** (No releases in the last 24h).

### 3. New Model & Hardware Support
*   **T-Head PPU:** Roadmap initiated for first-class support of the T-Head ZW810/810E/890P series [#37519](https://github.com/sgl-project/sglang/issues/37519).
*   **AMD gfx950:** Ongoing enabling for GLM-5.3-Flash, including FP8 and MXFP4 quantization support [#39273](https://github.com/sgl-project/sglang/pull/39273).
*   **ROCm MI30X:** CI integration added for nightly testing on MI300X/MI325X (gfx942) targets [#41605](https://github.com/sgl-project/sglang/pull/41605).

### 4. Performance & Optimization
*   **KV Cache Sharding:** Continued progress on pool-level sharding for MTP and DSA indexers to support high-concurrency agentic flows [#40929](https://github.com/sgl-project/sglang/pull/40929), [#40925](https://github.com/sgl-project/sglang/pull/40925).
*   **Sparse Attention:** Introducing Triton-based sparse attention for GLM-5.3 on gfx950 to replace suboptimal TileLang paths [#41615](https://github.com/sgl-project/sglang/pull/41615).
*   **Context Parallelism:** active roadmap item to expand CP support for MHA/GQA backends (FlashInfer/TRT-LLM) [#21788](https://github.com/sgl-project/sglang/issues/21788).

### 5. Stability & Regressions
*   **[Critical] GLM-5.3-Flash-NVFP4 Accuracy:** Users reporting bit-identical drift on SM100 hardware compared to previous versions; suspected relation to recent KDA fusion gate changes [#41609](https://github.com/sgl-project/sglang/issues/41609).
*   **[High] Server Crash on Invalid Request:** Multiple reports indicate that malformed `/generate` requests (incorrectly typed fields) can force a server-wide crash [#41466](https://github.com/sgl-project/sglang/issues/41466), [#41467](https://github.com/sgl-project/sglang/issues/41467).
*   **[Medium] PD Disaggregation:** Fix submitted for potential state-stride mismatches that could lead to corrupted cross-node KV transfers [#41607](https://github.com/sgl-project/sglang/pull/41607).
*   **[Medium] Startup Deadlock:** Worker process failing during startup now triggers a SIGQUIT to PID 1; potential edge cases identified in parent-process monitoring [#41539](https://github.com/sgl-project/sglang/issues/41539).

### 6. What This Means for Application Developers
*   **Robustness Concerns:** If your application exposes an endpoint directly to users, exercise extreme caution; current server validation is fragile and single malformed requests can induce a DoS condition. Ensure you have a proxy layer validating input types before they reach the SGLang engine.
*   **Agentic Workloads:** If you are building high-volume agentic systems, monitor the [Distributed KVCache Roadmap](https://github.com/sgl-project/sglang/issues/21846). The current infrastructure is hitting scaling limits with existing PD disaggregation/HiCache combinations; architectural shifts are imminent.
*   **Model Accuracy:** Users on high-end NVIDIA (SM100) or AMD (gfx950) hardware should verify output consistency if upgrading to current nightlies, particularly for GLM-5.3 models, due to ongoing regression concerns in kernel fusion paths.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest: 2026-09-29

### 1. Today's Highlights
The project continues its rapid modernization of batch processing, with significant migrations of speculative and multimodal (mtmd) logic to the new `llama_batch_ext` API. Multimodal capabilities are also expanding in the `/v1/embeddings` endpoint, now supporting typed content arrays for models like Qwen3-VL.

### 2. Releases & Breaking Changes
*   **b11242–b11232:** A flurry of releases focused on stabilizing the `batch_ext` migration and addressing GCC 15/compiler-specific overflow issues.
*   **API Migration:** The project is aggressively transitioning `server`, `speculative`, and `mtmd` modules to `llama_batch_ext` (#29385). Developers maintaining downstream forks should prioritize aligning with this new batching API as the older `llama_batch` methods are marked for deprecation.

### 3. New Model & Hardware Support
*   **GraniteSpeech5:** PR #29446 introduces support for `GraniteSpeech5ForCTC`, an encoder-only, non-autoregressive architecture.
*   **Audio/Multimodal:** Continued improvements for speech models, including left-padding support for Parakeet, LFM2-Audio, and Gemma 4 audio encoders (#29567).
*   **CPU/x86:** Tiled Flash Attention is now enabled for non-vector-multiple head dimensions on x86, including AVX2 support for masked operations (#29423).

### 4. Performance & Optimization
*   **Vulkan Tuning:** PR #29476 provides significant performance fixes for Gated Delta Net (GDN) kernels on Intel GPUs, reporting a ~6% improvement on RTX 3090 benchmarks.
*   **Speculative Offloading:** PR #29620 (in progress) proposes `--cpu-mtp` to offload MTP drafter execution to the CPU, a critical feature for VRAM-constrained systems (8-12GB cards) attempting to run high-parameter MoE models.
*   **CUDA/ROCm:** New matrix-core (MFMA) path for DeepSeek-V3.2/V4 lightning indexers on CDNA2 (gfx90a) hardware (#29050).

### 5. Stability & Regressions
*   **Vulkan Decode Degradation:** Intel Arc A770 users report long-running server instability (EOS-only replies after 7-8 hours), possibly related to fence management (#29526).
*   **Server Hangs:** Issue #29104 highlights an critical bug where the `/metrics` endpoint scraper (e.g., VictoriaMetrics) causes the `llama-server` to silently halt processing.
*   **Speculative Mismatch:** Multiple reports (#27408, #28158) highlight persistent issues with "holes" in KV caches when combining multimodal inputs with draft models, leading to HTTP 500 errors.

### 6. What This Means for Application Developers
*   **Multimodal Integration:** If you are building vision-enabled agents, the support for typed content arrays in the `/v1/embeddings` endpoint allows for more consistent handling of multimodal inputs across different architectures (e.g., Qwen3-VL).
*   **Observability:** Developers using `/metrics` should be aware of potential throughput stalling under high scrape frequency; consider caching metrics or reducing scrape intervals until #29104 is resolved.
*   **Deployment Strategy:** If you are running speculative decoding (MTP) on consumer hardware, watch the progress of the `--cpu-mtp` PR (#29620). This will likely become the standard way to handle the 1GB+ VRAM overhead of drafter models on smaller cards.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest: 2026-09-29

### 1. Today's Highlights
Ollama has officially introduced **System One** support, a major architectural shift enabling structured "decision models" via the new `/v1/systemone` API. This release moves beyond generative text, allowing for programmatic outputs like classification, scoring, and routing, with robust documentation and MLX-backend integration already underway.

### 2. Releases & Breaking Changes
*   **Release v0.35.0:** Introduces the `System One` API for decision-based model interactions.
    *   [API Documentation](https://github.com/ollama/ollama/pull/18702)
    *   [Decision Model API Reference](https://typesafe.ai)
*   **API Behavior:** Users should note that `/v1/chat/completions` now strictly enforces `top_p: 1.0` when omitted, which may override custom `PARAMETER top_p` settings in `Modelfile` configurations ([Issue #18690](https://github.com/ollama/ollama/issues/18690)).

### 3. New Model & Hardware Support
*   **Architecture Support:** PR pending for `GraniteForCausalLM` (IBM Granite 4.x models) in the MLX runner ([PR #17972](https://github.com/ollama/ollama/pull/17972)).
*   **Requested Models:** Community request for **K2 Horizon** family support (0.9B–36B MoE/MoVA) ([Issue #18698](https://github.com/ollama/ollama/issues/18698)).

### 4. Performance & Optimization
*   **Flash Attention:** Recent cleanup (PR #13448) now automatically enables flash attention for supported models (text, vision, embedding) if it does not trigger a CPU fallback.
*   **Memory Management:** 
    *   Improved graph memory allocation for multi-graph models (e.g., vision encoders + text models) to utilize max graph size rather than cumulative allocation ([PR #13244](https://github.com/ollama/ollama/pull/13244)).
    *   Refined MLX memory reporting to include KV cache and compute graph overhead, providing a more accurate VRAM utilization view ([PR #14382](https://github.com/ollama/ollama/pull/14382)).

### 5. Stability & Regressions
*   **CRITICAL [Billing]:** A severe bug in the Stripe billing flow is preventing users from modifying subscriptions or accessing services ([Issue #18683](https://github.com/ollama/ollama/issues/18683)).
*   **HIGH [CUDA]:** `MUL_MAT` illegal memory access errors reported on RTX 5090s when running Cohere MoE architectures ([Issue #18642](https://github.com/ollama/ollama/issues/18642)).
*   **MEDIUM [Container/Performance]:** `n_threads` defaults currently ignore cgroup v2 CPU quotas, causing ~45x throughput collapse in constrained environments ([Issue #17916](https://github.com/ollama/ollama/issues/17916)).
*   **MEDIUM [VRAM]:** `OLLAMA_GPU_OVERHEAD` is being ignored by the `llama-server` runner, preventing manual VRAM reservation for large model placement ([Issue #18679](https://github.com/ollama/ollama/issues/18679)).

### 6. What This Means for Application Developers
*   **Adopting System One:** If your stack involves agentic routing, ticket triage, or content moderation, consider moving these tasks from standard chat completions to the `/v1/systemone` endpoint. It provides structured JSON responses (scores/probabilities) that eliminate the need for brittle regex parsing of chat output.
*   **Chat Truncation Awareness:** Developers relying on tool loops should be aware of incoming fixes to prevent the loss of the "most recent user message" during context window truncation ([PR #18697](https://github.com/ollama/ollama/pull/18697), [PR #17894](https://github.com/ollama/ollama/pull/17894)).
*   **Deployment Note:** If running Ollama in Docker/Kubernetes, monitor the CPU throttling issue ([#17916](https://github.com/ollama/ollama/issues/17916)). Until a fix is merged, explicitly setting `OLLAMA_NUM_THREADS` may be required to prevent worker thread saturation.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

## LiteLLM Engineering Digest | 2026-09-29

### 1. Today's Highlights
LiteLLM is undergoing a major push toward enterprise-grade management, focusing on cost attribution accuracy for AWS Bedrock Mantle and improved guardrail safety. Development is heavily centered on stabilizing complex multi-tenant routing, with significant PR activity surrounding Azure PTU sharing and refined MCP tool security.

### 2. Releases & Breaking Changes
*   **Releases**: `v1.104.0-rc.1` and `v1.103.0` were pushed. All images remain cryptographically signed via `cosign` (commit `0112e53`).
*   **Infrastructure Changes**: PR [#43654](https://github.com/BerriAI/litellm/pull/43654) refactors Bedrock Mantle cost tracking to derive entries from runtime rows, preventing price drift. Relatedly, PR [#43655](https://github.com/BerriAI/litellm/pull/43655) updates the schema generator to accommodate these new nested cost map fields.

### 3. New Model & Hardware Support
*   **Provider Integration**: PR [#38925](https://github.com/BerriAI/litellm/pull/38925) adds support for `llmman` as an OpenAI-compatible provider.
*   **Realtime Support**: Significant work on multimodal/live sessions, including PR [#43621](https://github.com/BerriAI/litellm/pull/43621) (OpenAI Live `/v1/live/sessions` support) and PR [#40579](https://github.com/BerriAI/litellm/pull/40579) (DashScope realtime WebSocket).
*   **Bedrock**: PR [#43647](https://github.com/BerriAI/litellm/pull/43647) adds specific cost map rows for Claude Opus/Sonnet 5.5.

### 4. Performance & Optimization
*   **Proxy Efficiency**: PR [#43656](https://github.com/BerriAI/litellm/pull/43656) optimizes spend log lookups by restricting key name resolution to the oldest/newest rows, preventing 5s timeouts for high-traffic keys.
*   **Guardrail Timeouts**: PR [#43648](https://github.com/BerriAI/litellm/pull/43648) introduces a wall-clock timeout for all guardrail checks to prevent hung providers from blocking proxy requests for up to 600s.
*   **Batch Processing**: PR [#43632](https://github.com/BerriAI/litellm/pull/43632) introduces strict caps on batch file records and download loops to protect proxy stability.

### 5. Stability & Regressions
*   **Critical (Schema/Logic)**: [Issue #43157](https://github.com/BerriAI/litellm/issues/43157) reports that `sanitize_input_schema_for_anthropic` drops root-level `$ref` and `anyOf` constraints, breaking complex Pydantic-based tool schemas.
*   **High (Database)**: [Issue #41548](https://github.com/BerriAI/litellm/issues/41548) indicates that database migration `20260831120001` fails on partitioned `LiteLLM_SpendLogs` tables due to concurrent index creation limitations.
*   **Medium (Tool Calls)**: [Issue #43155](https://github.com/BerriAI/litellm/issues/43155) identifies an off-by-one error in `_handle_invalid_parallel_tool_calls` that incorrectly parses multi-tool messages.

### 6. What This Means for Application Developers
*   **For Agent Builders**: If you rely on complex `Union` schemas for tools, you may encounter validation issues with Anthropic models due to the ongoing sanitization bug ([#43157](https://github.com/BerriAI/litellm/issues/43157)).
*   **For Multi-Tenant Platforms**: The new `ptu_shares` feature ([#43043](https://github.com/BerriAI/litellm/pull/43043)) allows for better utilization of Azure PTUs across teams, replacing manual TPM conversion.
*   **For Security-Conscious Ops**: Ensure your guardrail configurations are updated to leverage the new global timeout ([#43648](https://github.com/BerriAI/litellm/pull/43648)) to avoid cascading failures in your LLM pipeline.
*   **Visibility**: A new [Model Leaderboard Page](https://github.com/BerriAI/litellm/pull/43649) is in development, which will simplify auditing model usage across your infrastructure.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

## Unsloth Digest | 2026-09-29

### 1. Today's Highlights
Unsloth has significantly expanded its ecosystem with the release of **v0.1.900-beta**, introducing native support for **Decision Models** (e.g., Laya) and a unified library for document and media handling. The engineering focus has shifted heavily toward resolving stability issues in the Unsloth Studio/Desktop environment, specifically addressing complex hardware configuration bugs (mixed NVIDIA/AMD setups) and inference bottlenecks.

### 2. Releases & Breaking Changes
*   **[v0.1.900-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.900-beta):** Major update featuring Laya Decision Model integration, a new "Skills Editor," and a unified document/media library. 
    *   *Note:* Apple Silicon users receive specific library-wide optimizations.

### 3. New Model & Hardware Support
*   **Decision Models:** Native support for running/serving Laya-style models locally. ([PR #12224](https://github.com/unslothai/unsloth/pull/12224))
*   **Idefics3:** Feature request tracking for native support of Granite Docling VLM architectures ([Issue #4079](https://github.com/unslothai/unsloth/issues/4079)).
*   **Mixed Hardware Handling:** Ongoing work to allow concurrent use of NVIDIA and AMD GPUs for split workloads (e.g., image generation on NVIDIA, training/chat on AMD). ([Issue #12248](https://github.com/unslothai/unsloth/issues/12248))

### 4. Performance & Optimization
*   **Laya Acceleration:** Decision API performance improved via marker-only head optimizations and CUDA graphs, bypassing the need for `torch.compile`. ([PR #12224](https://github.com/unslothai/unsloth/pull/12224))
*   **Image Generation Efficiency:** New auto-memory planning for offloading activations ensures 16GB cards can handle high-res Qwen-VL generation without VRAM thrashing. ([PR #12043](https://github.com/unslothai/unsloth/pull/12043))
*   **Apple Silicon:** PR #12256 brings fp16 policy support to the Decision API on MLX, reducing memory footprint for Apple hardware. ([PR #12256](https://github.com/unslothai/unsloth/pull/12256))

### 5. Stability & Regressions
*   **Tool Call Stalls (High):** A persistent bug causing "Running" state hang-ups during terminal/Python tool calls is being addressed to prevent concurrency locks. ([PR #12234](https://github.com/unslothai/unsloth/pull/12234))
*   **Antivirus False Positives (Medium):** Continued reports of Bitdefender and Windows Defender flagging the Unsloth installer; developers are implementing more robust repair verification messages. ([Issue #12140](https://github.com/unslothai/unsloth/issues/12140), [PR #11432](https://github.com/unslothai/unsloth/pull/11432))
*   **GGUF Vision Regression (Medium):** Chats involving images are occasionally triggering "Invalid base64" errors, causing chat-wide blocking. ([PR #12236](https://github.com/unslothai/unsloth/pull/12236))
*   **Training Indicies Error:** Gemma 4 31B fails when split across multiple GPUs due to device-mismatch in tensors; fix pending. ([PR #12233](https://github.com/unslothai/unsloth/pull/12233))

### 6. What This Means for Application Developers
*   **Decision-Making Agents:** With the Laya API now integrated into the MCP (Model Context Protocol) menu, developers can easily hook decision-making agents into existing chat workflows.
*   **Edge/Desktop Portability:** The new model scan-folder support ([PR #12254](https://github.com/unslothai/unsloth/pull/12254)) makes local model management more predictable by prioritizing local cache hits over re-downloading Hugging Face repo-ids.
*   **Tool Reliability:** If you are building agentic workflows using Unsloth Studio, be aware of the ongoing `Max Tool Call Duration` handling; ensure your tools have robust timeouts to avoid blocking the Studio backend.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/jinming1345/agents-radar).*