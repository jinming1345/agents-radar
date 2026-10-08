# AI Infrastructure Digest 2026-10-08

> Generated: 2026-10-08 02:15 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

## Cross-Project Infrastructure Analysis: 2026-10-08

### 1. Ecosystem Overview
The AI infrastructure ecosystem is currently entering a "post-architecture" maturity phase, where the primary focus has shifted from raw model support to the stabilization of complex features like Multi-Token Prediction (MTP), Speculative Decoding, and hybrid MoE serving. The industry is currently contending with significant stability regressions stemming from "feature bloat," particularly in prefix caching and hybrid-model scheduling on newer silicon (Blackwell/MI355X/RDNA4). Enterprise integration, specifically regarding OAuth/Identity and multi-tenant billing, is becoming a primary differentiator for gateway-level tools, while local runtimes are racing to bridge the gap between cloud-scale capabilities and consumer-hardware constraints.

### 2. Activity Comparison
*(Note: Values represent recent velocity trends across project activity logs provided for 2026-10-08.)*

| Project | Recent PR Volume | Issues Velocity | Release Status |
| :--- | :--- | :--- | :--- |
| **vLLM** | Very High | High (Critical Bugs) | Mature/Active |
| **SGLang** | High | High (Livelocks) | Stable |
| **llama.cpp** | High | Medium | Active (Frequent) |
| **Ollama** | Medium | High (Migration) | v0.40.1 (Hotfix) |
| **LiteLLM** | High | Medium | v1.106.0-dev |
| **Unsloth** | Medium | Medium | v0.1.904-beta |

### 3. Model Support Race
*   **vLLM:** Leading in heavy-duty enterprise support (Gemma4, Qwen3.8-2.4T-A95B), focusing on specialized kernels for AMD and Blackwell.
*   **SGLang:** Strongest in MoE/Reasoning model stabilization (DeepSeek-V4, GLM-5.3) and NPU integration (Kimi-K3).
*   **llama.cpp:** Dominates on "Omni" models (LiquidAI) and cross-platform flexibility (Qualcomm Hexagon, Metal/Apple Silicon).
*   **LiteLLM:** Best-in-class for enterprise decision/provider integration (M365 Copilot, gpt-6-luna).
*   **Unsloth:** The outlier focusing on "Decision Model" fine-tuning, shifting away from generic LLM training to task-specific binary/multi-class engines.

### 4. Performance Frontier
*   **Kernel-Level Optimizations:** vLLM and llama.cpp are aggressively tuning kernels for specific hardware (gfx950, SM120, Hexagon), specifically for FP8 and quantized math.
*   **Memory Management:** A shared focus on MoE efficiency; vLLM is optimizing input copies, while llama.cpp and Unsloth are implementing sophisticated RAM/VRAM caching strategies for MoE experts to avoid throughput drops.
*   **Speculative Decoding:** The "Accuracy vs. Latency" trade-off is the main battleground. Both vLLM and SGLang are struggling with accuracy regressions in complex speculative paths, suggesting that verification logic is not yet fully stable for production use.
*   **Gateway Overhead:** LiteLLM’s Rust rewrite remains the critical path for sub-1ms routing, while Ollama continues to fight "keep-alive" and connection-reuse overheads for local serving.

### 5. Layer Positioning
*   **Serving Engines (vLLM, SGLang):** Deep-stack infrastructure. Optimized for multi-tenant, high-throughput cloud environments; currently prioritizing scheduling and distributed communication (DBO, KDA/MLA).
*   **Local Runtimes (llama.cpp, Ollama):** Hardware-abstracted inference. Focused on ease-of-use and running massive models on memory-constrained hardware.
*   **Gateways (LiteLLM):** Orchestration layer. Focused on provider abstraction, security, compliance (FIPS), and identity management.
*   **Fine-Tuning/Studio (Unsloth):** Developer-tooling layer. Focused on democratizing training and specialized model deployment (Decision Models).

### 6. Trend Signals
*   **"Reasoning" Instability:** High-end models (GLM, DeepSeek) are exhibiting non-deterministic behavior in low-precision states (NVFP4). Developers should treat "Thinking" models as "beta" features in production.
*   **Agentic Compliance:** LiteLLM’s pivot to OAuth and Docker-signing indicates that the next phase of enterprise AI is not just about model quality, but about **identity-aware inference.**
*   **Hardware-First Development:** The fragmentation in kernels (gfx1201, SM120) means infrastructure teams must now maintain a hardware-specific matrix of versions. A "one-size-fits-all" container strategy is failing; observability for hardware-specific regressions is mandatory.
*   **Warning to Devs:** The v0.40.x migration cycle in the ecosystem (Ollama, vLLM) shows that breaking file-system and configuration schemas is common this quarter. Maintain locked dependencies; avoid upgrading core engines without rigorous regression testing for your specific model architecture.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Technical Digest: 2026-10-08

### 1. Today's Highlights
Today's activity centers on maturing support for next-generation architectures (SM12x/Blackwell, MI355X/gfx950) and hardening complex inference features like Multi-Token Prediction (MTP) and speculative decoding. Development is currently heavily focused on addressing stability regressions in hybrid architectures where prefix caching and quantization modes conflict.

### 2. Releases & Breaking Changes
*   **Releases:** No new releases in the last 24h.
*   **Breaking Changes:** None reported, though internal interfaces for `KVCacheConfigBuilder` ([#53558](https://github.com/vllm-project/vllm/pull/53558)) are seeing significant revision to allow platform-specific overrides.

### 3. New Model & Hardware Support
*   **Gemma4 Support:** Ongoing work to enable `Gemma4ForSequenceClassification` and non-vocab-sized output heads ([#43726](https://github.com/vllm-project/vllm/issues/43726)).
*   **AMD gfx950 (MI355X):** Continued performance optimization tracking for `Qwen3.8-2.4T-A95B` models ([#57149](https://github.com/vllm-project/vllm/issues/57149)).
*   **Kimi-K3/Cake Kernels:** Introduction of `VLLM_CAKE_ROUTES` for FlashInfer-based KDA and MLA decode optimization ([#60470](https://github.com/vllm-project/vllm/pull/60470)).

### 4. Performance & Optimization
*   **DeepSeek-V4 (ROCm):** Enabled dual-batch-overlap (DBO) for prefill compute/communication to improve utilization in data-parallel deployments ([#57773](https://github.com/vllm-project/vllm/pull/57773)).
*   **Qwen3.5 GDN GEMM:** New auto-tuned Triton kernels for H20 and SM120 achieve 1.67x–2.50x speedups over generic kernels for specific shapes ([#54182](https://github.com/vllm-project/vllm/pull/54182)).
*   **MoE Efficiency:** Humming architecture improvements to skip redundant input copies before w13 GEMM ([#59340](https://github.com/vllm-project/vllm/pull/59340)).
*   **Speculative Decoding:** New opt-in "reduced draft vocabulary" for MTP drafters (shared lm_head) shows potential for 25-29% decode speedups ([#58578](https://github.com/vllm-project/vllm/issues/58578)).

### 5. Stability & Regressions
*   **CRITICAL (Output Corruption):** v0.30/0.31 users report that `DFlash2/DSpark + prefix caching` triggers corrupted output on `Qwen3.8-27B` NVFP4 checkpoints after cache hits ([#60174](https://github.com/vllm-project/vllm/issues/60174)).
*   **HIGH (Memory Access):** Silent CUDA illegal-memory-access (exit 0) persists in hybrid GDN + MTP k=3 configurations on RTX 3090s, despite previous hardening efforts ([#53726](https://github.com/vllm-project/vllm/issues/53726)).
*   **MEDIUM (ROCm Regression):** RDNA4 (gfx1201) users report a 5–24% decode performance penalty since v0.28 due to incorrect selection of the `RowWiseTorchFP8ScaledMMLinearKernel` ([#57838](https://github.com/vllm-project/vllm/issues/57838)).
*   **MEDIUM (Speculative Decoding):** Acceptance rate drop to 0% for GLM-5.3-Flash on SM120 using the native `FLASHINFER_MLA_SPARSE_SM120` backend ([#59724](https://github.com/vllm-project/vllm/issues/59724)).

### 6. What This Means for Application Developers
*   **Agentic Workloads:** If your application relies heavily on prefix caching, monitor the stability issues with `DFlash2` and hybrid models ([#60174](https://github.com/vllm-project/vllm/issues/60174)). If you see corrupted responses, consider disabling prefix caching temporarily.
*   **Tool Calling:** A fix for tool-choice logic ([#55080](https://github.com/vllm-project/vllm/issues/55080)) and namespace function selection ([#56368](https://github.com/vllm-project/vllm/pull/56368)) is in progress; ensure your integration doesn't rely on the current "silent deletion" behavior.
*   **Logprobs:** Note that `rank` values in `logprob_token_ids` currently map to request list position rather than actual vocabulary rank ([#60357](https://github.com/vllm-project/vllm/issues/60357)). Adjust your downstream analytics accordingly.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest: 2026-10-08

### 1. Today's Highlights
Development activity is dominated by stabilizing high-end MoE/speculative decoding workflows and expanding support for specialized hardware (NPU/AMD). Key efforts focus on resolving scheduler livelocks in Hybrid-SWA models and addressing persistent accuracy regressions in speculative decoding configurations for flagship models like DeepSeek-V4 and GLM-5.3.

### 2. Releases & Breaking Changes
*   **No new releases** in the last 24 hours.

### 3. New Model & Hardware Support
*   **[NPU] Kimi-K3 DCP Support:** PR [#40825](https://github.com/sgl-project/sglang/pull/40825) introduces Decode Context Parallelism (DCP) for Kimi-K3 on Ascend NPUs, leveraging shared compact communication to reduce KV storage requirements.
*   **Cloudflare Clef Models:** PR [#42721](https://github.com/sgl-project/sglang/pull/42721) adds support for the `Clef` and `Clef-Flash` decision models to the `/v1/systemone` endpoint.
*   **AMD GFX95 Optimization:** PR [#41030](https://github.com/sgl-project/sglang/pull/41030) eliminates redundant FP8 scale relayout copies on AMD hardware, optimizing the decoding path for models like GLM-5.3.

### 4. Performance & Optimization
*   **Chat Prompt Encoding:** PR [#41259](https://github.com/sgl-project/sglang/pull/41259) parallelizes tokenizer encoding for long chat prompts, targeting significant reductions in TTFT (Time To First Token) for agentic workloads.
*   **Speculative Decoding:** PR [#28045](https://github.com/sgl-project/sglang/pull/28045) introduces a throughput-aware policy for adaptive speculative steps to better balance compute costs and latency.
*   **Diffusion Overlap Scheduling:** PR [#40756](https://github.com/sgl-project/sglang/pull/40756) removes the forced `disable_overlap_schedule` for dLLM models, allowing CPU-side batch preparation to overlap with GPU inference.
*   **Redundant Decode Prevention:** PR [#42720](https://github.com/sgl-project/sglang/pull/42720) ensures the scheduler avoids firing unnecessary terminal decodes once output budget limits are reached.

### 5. Stability & Regressions
*   **[Critical] Hybrid-SWA Scheduler Livelock:** Issue [#41579](https://github.com/sgl-project/sglang/issues/41579) reports a permanent admission livelock in hybrid Sliding Window Attention (SWA) models when the radix cache is enabled.
*   **[High] Speculative Accuracy Regression:** Issue [#32038](https://github.com/sgl-project/sglang/issues/32038) tracks a significant accuracy drop (AIME25 score 97.08 → 93.96) when using DSpark speculative decoding with DeepSeek-V4-Flash.
*   **[High] GLM-5.3 Reasoning Loops:** Issue [#41939](https://github.com/sgl-project/sglang/issues/41939) reports repetitive reasoning behavior in GLM-5.3-Flash NVFP4 on multi-node B200/B300 deployments.
*   **[High] MoE Expert Parallelism:** Issue [#40320](https://github.com/sgl-project/sglang/issues/40320) identifies that FlashInfer autotune caches are discarded every boot due to shape mismatches in EP>1 configurations, forcing expensive re-tuning on every startup.
*   **[Medium] CUDA Sync Bug:** PR [#43030](https://github.com/sgl-project/sglang/pull/43030) includes a necessary barrier fix in the MoE alignment kernel to prevent race conditions during expert ID searching.

### 6. What This Means for Application Developers
*   **TTFT Improvements:** If your application handles massive context (agentic chat histories), upcoming changes to tokenizer parallelization will directly improve your perceived latency.
*   **Deployment Stability:** If you are running deep-reasoning models (DeepSeek/GLM variants) with speculative decoding, be aware of reported accuracy regressions. Rigorous validation of outputs is recommended until the speculative verifier paths are stabilized.
*   **CI/Infrastructure:** Expect some volatility in build stability as the project team is currently trialing a new "babysitting" workflow for PRs (Issue [#42752](https://github.com/sgl-project/sglang/issues/42752)). If you rely on custom builds, monitor `main` branch health closely.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest: 2026-10-08

### 1. Today's Highlights
The focus for October 8, 2026, is heavily weighted toward high-end Mixture-of-Experts (MoE) optimizations and the integration of multimodal "Omni" models. Notable progress includes multi-GPU MoE caching to overcome memory constraints for massive models and aggressive kernel-level tuning for Metal and Hexagon architectures.

### 2. Releases & Breaking Changes
*   **Version Updates:** Releases `b11467` through `b11481` focus on incremental feature stability. No major breaking API changes were noted, though developers should monitor the transition of the MoE caching logic.

### 3. New Model & Hardware Support
*   **LiquidAI/d1-omni-600M:** Added support for the LiquidAI "Omni" decision model, enabling audio, image, and text inputs ([PR #30114](https://github.com/ggml-org/llama.cpp/pull/30114)).
*   **GLM5-Next (MTP):** Native support for GLM5-Next multi-token-prediction heads has been integrated to optimize speculative decoding paths ([PR #29928](https://github.com/ggml-org/llama.cpp/pull/29928)).
*   **Cohere2 Vision:** Added support for Cohere2 vision architecture, including fused linear layers for improved performance ([PR #30062](https://github.com/ggml-org/llama.cpp/pull/30062)).
*   **Hexagon/Mobile:** Active development on Qualcomm Hexagon continues with added support for tiled `Q4_K` and `Q6_K` tensors in `GET_ROWS` operations ([PR #30115](https://github.com/ggml-org/llama.cpp/pull/30115)).

### 4. Performance & Optimization
*   **MoE GPU Caching:** New GPU cache for MoE experts enables keeping experts in host memory while caching hot experts on VRAM ([PR #29887](https://github.com/ggml-org/llama.cpp/pull/29887)), with follow-up support for multi-GPU distribution ([PR #30112](https://github.com/ggml-org/llama.cpp/pull/30112)).
*   **Metal (Apple Silicon):** A new "few-row" MMA (Matrix Multiply-Accumulate) kernel improves throughput for diverse types, including `MXFP4`, `BF16`, and various `IQ` types ([PR #30065](https://github.com/ggml-org/llama.cpp/pull/30065)).
*   **Hexagon Speedups:** Manual unrolling of `Q6_K` dequantization resulted in significant latency improvements on mobile silicon ([PR #30121](https://github.com/ggml-org/llama.cpp/pull/30121)).

### 5. Stability & Regressions
*   **Audio Memory Exploit (High):** A potential DoS vulnerability where malicious audio headers could trigger excessive memory allocation was identified; fix is in progress ([PR #30130](https://github.com/ggml-org/llama.cpp/pull/30130)).
*   **MoE/NaN Handling (Medium):** A fix is pending for MoE selection where bias addition could introduce NaNs, leading to expert-selection divergence ([PR #29609](https://github.com/ggml-org/llama.cpp/pull/29609)).
*   **Vulkan/AMD Stability:** Users continue to report device-loss issues when using Flash Attention on certain AMD hardware architectures (e.g., `gfx1201`) ([Issue #29314](https://github.com/ggml-org/llama.cpp/issues/29314)).

### 6. What This Means for Application Developers
*   **Multimodal Pipelines:** With the addition of `d1-omni`, developers can now integrate vision and audio processing directly into their `llama.cpp` serving stack, reducing the need for separate pre-processing microservices.
*   **Scaling MoE Models:** If you are serving large MoE models (like Qwen-Flash-Next) on consumer hardware, the new **MoE GPU cache** significantly reduces the VRAM pressure, allowing for faster token generation by minimizing host-to-device memory copies.
*   **Speculative Decoding:** If using MTP (Multi-Token Prediction) models, be aware that there are known edge cases with "greedy selection" logic at temperature zero; ensure your `llama.cpp` build is updated to `b11472` to leverage the corrected sampling logic ([PR #29797](https://github.com/ggml-org/llama.cpp/pull/29797)).

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest: 2026-10-08

### 1. Today's Highlights
Ollama v0.40.1 has been released, focusing on critical fixes for the new GGUF migration logic and proxy support. Engineering efforts are currently dominated by stabilizing the `0.40.x` transition, specifically resolving symlink issues on Windows and addressing regressions in the MLX runner.

### 2. Releases & Breaking Changes
*   **v0.40.1:** Released to address post-migration stability.
    *   [PR #18829](https://github.com/ollama/ollama/pull/18829): Now proxies cloud usage and balance APIs.
    *   [PR #18826](https://github.com/ollama/ollama/pull/18826): Simplified CLI onboarding by removing the mandatory account step.
*   **Breaking Changes:** The v0.40.0 migration to the new engine has triggered file system issues for Windows users ([Issue #18847](https://github.com/ollama/ollama/issue/18847)) and duplicate tag registration ([Issue #18830](https://github.com/ollama/ollama/issue/18830)). A hotfix for Windows symlink handling is already merged in [PR #18852](https://github.com/ollama/ollama/pull/18852).

### 3. New Model & Hardware Support
*   **Requested Models:** Community interest is high for adding **MIMO v2.5** (million-token context) ([Issue #15887](https://github.com/ollama/ollama/issue/15887)) and a variety of high-performance cloud models like **Stepfun** and **Hy4** ([Issue #18850](https://github.com/ollama/ollama/issue/18850)).
*   **Encoding Updates:** [PR #18857](https://github.com/ollama/ollama/pull/18857) proposes adding Saina Helm encoding to support decision models that require specific output layer scoring.

### 4. Performance & Optimization
*   **MLX/Metal:** Efforts to optimize prefill latency are ongoing. [PR #18694](https://github.com/ollama/ollama/pull/16894) routes fast quantized matmuls on CUDA for newer architectures (compute 10.0+).
*   **Connection Reuse:** [PR #18397](https://github.com/ollama/ollama/pull/18397) aims to stop disabling keep-alives in the llama-server HTTP client, which should significantly reduce overhead for high-frequency `/api/embed` calls.

### 5. Stability & Regressions
*   **Critical - MLX Runner Panics:** Users are reporting regression-based crashes on macOS with `0.40.x` versions, including "Maximum threads" errors ([Issue #18846](https://github.com/ollama/ollama/issue/18846)) and crashes with `qwen3.6:35b-mlx` ([Issue #18856](https://github.com/ollama/ollama/issue/18856)).
*   **High - API 500 Errors:** Large tool-aware requests are triggering "unexpected end of JSON input" errors in the server response ([Issue #18840](https://github.com/ollama/ollama/issue/18840)). A fix for stream truncation detection is in progress in [PR #18849](https://github.com/ollama/ollama/pull/18849).
*   **High - Proxy/Network:** Models are failing to pull when behind HTTP proxies due to DNS/redirect issues ([Issue #18831](https://github.com/ollama/ollama/issue/18831)).

### 6. What This Means for Application Developers
*   **Avoid v0.40.0 for Production:** If you are running local inference, wait for a more stable point release; the migration in `0.40.0` has introduced significant regressions in Windows file handling and MLX performance.
*   **Tool Calling:** Be aware that the current `gemma4` renderer has a known bug where specific parameter names (`description`, `type`, etc.) are stripped from tool calls ([Issue #18468](https://github.com/ollama/ollama/issue/18468)). Avoid these names in your tool definitions for now.
*   **Agent Development:** If building agents that leverage long contexts (like Claude Code), ensure you are manually tuning context limits, as the default fallback behavior may trigger excessive re-compaction ([PR #18855](https://github.com/ollama/ollama/pull/18855)).

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

## LiteLLM Digest: 2026-10-08

### 1. Today's Highlights
LiteLLM is aggressively expanding its enterprise gateway capabilities, with a heavy focus on OAuth-based per-user credential management (Microsoft 365 Copilot and GitHub Copilot) and enhanced billing granularity. The project continues to make steady progress on its Rust-based rewrite, aiming to minimize gateway overhead, while simultaneously hardening production security through standardized Docker image signing and improved at-rest encryption protocols.

### 2. Releases & Breaking Changes
*   **Release Train:** A flurry of releases from `v1.100.5` through `v1.106.0-dev.1`. 
*   **Security:** All official Docker images are now signed with [cosign](https://docs.sigstore.dev/cosign/overview/) using the key introduced in [commit `0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0).
*   **Security Upgrade:** [PR #42934](https://github.com/BerriAI/litellm/pull/42934) proposes defaulting at-rest encryption to AES-256-GCM with HKDF v3, moving away from legacy PyNaCl (XSalsa20-Poly1305) to ensure FIPS compliance.

### 3. New Model & Hardware Support
*   **Microsoft 365 Copilot:** Added support for the Graph Copilot Chat API via OAuth token exchange ([PR #45158](https://github.com/BerriAI/litellm/pull/45158)).
*   **Decisions API:** Integrated OpenAI’s `gpt-6-luna` and Databricks `ai_decide` as formal Decisions providers ([PR #45214](https://github.com/BerriAI/litellm/pull/45214), [PR #45200](https://github.com/BerriAI/litellm/pull/45200)).

### 4. Performance & Optimization
*   **Rust Migration:** The [Rust Migration parent issue (#31263)](https://github.com/BerriAI/litellm/issues/31263) remains the primary long-term effort to drive sub-1ms gateway overhead.
*   **Billing Granularity:** New feature introduced to break down failed gateway requests by HTTP status code, allowing administrators to differentiate between client-side errors and provider failures ([PR #45244](https://github.com/BerriAI/litellm/pull/45244)).
*   **Context Cache Pricing:** Added billing support for explicit Vertex AI Gemini context cache storage ([PR #45019](https://github.com/BerriAI/litellm/pull/45019)).

### 5. Stability & Regressions
*   **Regression (High):** [Issue #43756](https://github.com/BerriAI/litellm/issues/43756) reports that DashScope models crash with `AttributeError` on the first turn of a conversation due to unset cache tokens.
*   **Regression (Med):** [Issue #44979](https://github.com/BerriAI/litellm/issues/44979) notes that Anthropic to OpenAI tool translation drops the `is_error` flag, potentially breaking error-handling flows in agentic loops.
*   **Regression (Med):** [Issue #31726](https://github.com/BerriAI/litellm/issues/31726) details a race condition in Realtime/Voice proxying where duplicate `response.create` calls cause "conversation_already_has_active_response" errors.

### 6. What This Means for Application Developers
*   **OAuth-Driven Apps:** If your application integrates with Microsoft or GitHub Copilot, you can now leverage LiteLLM to handle per-user token exchange, abstracting the complexity of managing OAuth flows for your end-users ([PR #45241](https://github.com/BerriAI/litellm/pull/45241)).
*   **Observability:** Developers using LiteLLM to trace agentic performance can now store end-user feedback (ratings/comments) directly in ClickHouse via the new `/lens/feedback` API ([PR #45171](https://github.com/BerriAI/litellm/pull/45171)).
*   **Budgeting:** If you are managing multi-tenant SaaS, note the pending feature request for monthly token-based quotas ([Issue #44555](https://github.com/BerriAI/litellm/issues/44555)), as current spend-based budget limits may be insufficient for high-variance model pricing.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

### Unsloth Digest: 2026-10-08

#### 1. Today's Highlights
Unsloth is pivoting toward agentic utility with the release of **Decision Model** support, enabling text and vision LLMs to function as high-accuracy (up to 80%) decision engines. Alongside this, the platform is doubling down on Studio stability and RAG performance, specifically optimizing MoE expert handling on systems where memory spillover occurs.

#### 2. Releases & Breaking Changes
*   **v0.1.904-beta**: Introduced native Decision Model training/exporting. Includes native ComfyUI model support and enhanced desktop browser functionality. ([Release Notes](https://github.com/unslothai/unsloth))
*   **Security Patch**: PR [#13001](https://github.com/unslothai/unsloth/pull/13001) implements mandatory user prompts before executing `np.load` (pickle) operations, hardening the Studio sandbox against malicious model artifacts.

#### 3. New Model & Hardware Support
*   **MoE Memory Optimization**: PR [#12951](https://github.com/unslothai/unsloth/pull/12951) introduces `--moe-cache-mib auto` to pin routed experts in RAM, significantly improving throughput for models spilling into system memory.
*   **Embedding Engines**: PR [#13006](https://github.com/unslothai/unsloth/pull/13006) optimizes `EmbeddingGemma` performance by defaulting to `llama-server` over CPU-bound `sentence-transformers`, increasing throughput from ~5 chunks/s to ~129 chunks/s.

#### 4. Performance & Optimization
*   **Micro-batching**: PR [#12950](https://github.com/unslothai/unsloth/pull/12950) raises `llama-server` micro-batch sizes to 2048 for MoE models, specifically targeting high-latency scenarios where expert weights are not fully resident in VRAM.

#### 5. Stability & Regressions
*   **High CPU Usage (Critical)**: Issue [#12942](https://github.com/unslothai/unsloth/issues/12942) reports the backend `python.exe` consuming 95% CPU at idle on Windows 11.
*   **Qwen3.6 Reasoning (High)**: PR [#12989](https://github.com/unslothai/unsloth/pull/12989) addresses a regression where "Thinking" controls were ignored, causing raw reasoning tags to leak into chat output.
*   **Tool-calling Persistence (Medium)**: PR [#12988](https://github.com/unslothai/unsloth/pull/12988) fixes an issue where Qwen3.5 models lost tool-call arguments during multi-step reasoning.
*   **Hardware Conflicts (Medium)**: PR [#12947](https://github.com/unslothai/unsloth/issues/12947) notes that `pip install unsloth[amd]` can inadvertently overwrite ROCm-compatible torch with CUDA-only versions.

#### 6. What This Means for Application Developers
*   **Building Decision Agents**: You can now fine-tune specific models for binary/multi-class decision tasks via the new Decision Model workflow, which significantly outperforms generic LLM prompting (30% vs 80% accuracy).
*   **RAG/Tooling Reliability**: If your agents rely on file manipulation, be aware of the new sandboxing updates (PR [#12992](https://github.com/unslothai/unsloth/pull/12992))—files are now moved to a hidden `.unsloth_attachments` folder, requiring updates to your path-parsing logic.
*   **MoE Deployment**: If you are hosting large MoE models on consumer hardware (e.g., M5 Max, consumer GPUs), ensure your deployment leverages the new `llama-server` flags to prevent catastrophic performance degradation when VRAM is exceeded.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/jinming1345/agents-radar).*