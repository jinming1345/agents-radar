# AI Infrastructure Digest 2026-09-30

> Generated: 2026-09-30 01:31 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

## AI Infrastructure Ecosystem Report: 2026-09-30

### 1. Ecosystem Overview
The infrastructure landscape is currently undergoing a shift toward stabilizing "System One" reasoning architectures and hybrid model types (Mamba/GDN). Engineering efforts are split between hardening high-concurrency inference engines for production stability and democratizing fine-tuning workflows via refined desktop-to-server integration. A recurring theme across all major projects is the mitigation of "silent corruption" and memory management bugs that have emerged alongside the complexity of next-gen hardware architectures (SM100/B200/Strix Halo).

### 2. Activity Comparison
*Note: Counts reflect active development velocity as of 2026-09-30.*

| Project | Active Issues/PRs | Recent Releases | Primary Focus |
| :--- | :--- | :--- | :--- |
| **vLLM** | High | None (Main branch) | RL/Observability & Hybrid Correctness |
| **SGLang** | Medium-High | None (Main branch) | CI Stability & AMD/ROCm Refinement |
| **llama.cpp** | High | b11260-b11269 | Backend Hardening (Vulkan/Hexagon) |
| **Ollama** | Medium | v0.35.1-rc0 | System One Architecture & Backend Stability |
| **LiteLLM** | High | v1.104.0-rc.2 | Identity/Agent Security & Observability |
| **Unsloth** | Medium | None (Main branch) | Studio UI & Context Parallelism |

### 3. Model Support Race
*   **Specialized Architectures:** `llama.cpp` is leading the support for non-autoregressive/CTC-based architectures (GraniteSpeech5) and low-bit quantization (Bonsai 8B).
*   **Hybrid Models:** `vLLM` and `SGLang` are in a tight race to stabilize Mamba/GDN architectures, with both currently struggling with prefix-cache and TTFT regressions.
*   **Reasoning/Decision Models:** `Ollama` is emerging as the leader in "System One" integration, standardizing API-level decision-making tasks, while others focus on general-purpose causal LLMs like DeepSeek-V4.1 and Qwen3.8-Flash.

### 4. Performance Frontier
Optimization efforts are heavily fragmented by the target use case:
*   **KV Cache & Memory:** `vLLM` and `SGLang` are prioritizing dynamic memory dispatch and state-cache reconstruction. `SGLang` specifically is tackling integer overflows in state-cache kernels for massive batches.
*   **Quantization:** `llama.cpp` remains the pioneer in ultra-low-bit formats (Q1/Q2), while `Unsloth` and `vLLM` focus on maintaining throughput for FP8/Marlin kernels.
*   **Distributed Serving:** A high-priority battleground. `SGLang` is fighting tensor corruption in TP+PP operations, while `vLLM` is refining ZMQ-based state snapshots for cluster resilience.

### 5. Layer Positioning
*   **Serving Engines (vLLM, SGLang):** Focused on massive throughput, multi-node scaling, and complex speculative decoding.
*   **Local Runtime (llama.cpp, Ollama):** Focused on hardware abstraction (Vulkan/Hexagon/Metal) and edge/desktop accessibility.
*   **Gateway (LiteLLM):** Focused on the API/Application boundary—specifically auth (Entra/OIDC), budget management, and observability (Langfuse/OTEL).
*   **Training/Fine-tuning (Unsloth):** Focused on lowering the barrier to entry for SFT and LoRA via Studio UIs and optimized gradient checkpointing.

### 6. Trend Signals
*   **"System One" Logic:** Inference engines are evolving from mere text-generators to decision-making agents. Developers should prepare for models that expose `CAPABILITY` declarations and internal reasoning budgets.
*   **Agentic Reliability:** The "Tool-Call" lifecycle is becoming the primary source of instability. Developers must adopt robust validation for streaming tool-call deltas, as parsing failures and truncated outputs are currently the most common failure modes across all frameworks.
*   **Hardening over Feature-Add:** A noticeable "stabilization wave" is hitting the industry. After the rapid expansion of Q1/Q2 2026, teams have paused feature velocity to address high-severity memory corruption and device-lost errors.
*   **Developer Recommendation:** For production deployments, prioritize **vLLM** or **SGLang** for throughput, but ensure your CI/CD pipelines include rigorous health checks—current main branches contain high-severity regressions that are likely to cause intermittent production downtime.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Engineering Digest: 2026-09-30

### 1. Today's Highlights
Today's activity centers on maturing the RL-aligned training infrastructure, with new dev endpoints for weight synchronization and observability being introduced. Additionally, there is a strong focus on resolving correctness issues in complex hybrid architectures (Mamba/GDN) and MoE routing under high-concurrency speculative decoding scenarios.

### 2. Releases & Breaking Changes
*   **No new releases** in the last 24h.
*   **Action Required:** Users of LoRA adapters should be aware of a pending fix (PR [#59286](https://github.com/vllm-project/vllm/pull/59286)) that prevents registering LoRA adapters using the same name as the base model, which previously caused request interception and duplicate model listings in `/v1/models`.

### 3. New Model & Hardware Support
*   **MiniMax-M3:** Optimization for FP8 dot product operations in the Triton indexer is underway to enhance performance on SM89/SM90/SM100/SM120 architectures ([PR #59331](https://github.com/vllm-project/vllm/pull/59331)).
*   **Qwen3.8-Flash-Next:** Fused kernel work is ongoing to integrate QK-norm, RoPE, and gate operations into the pre-indexer launch for improved efficiency ([PR #57097](https://github.com/vllm-project/vllm/pull/57097)).

### 4. Performance & Optimization
*   **MoE Dynamic Dispatch:** A move toward selecting DeepEP v2 layouts per forward pass rather than at initialization is in progress to prevent worst-case memory allocations when CUDA graphs are enabled ([PR #59337](https://github.com/vllm-project/vllm/pull/59337)).
*   **KVEvents:** Added support for ZMQ-based state snapshots, allowing routers to reconstruct cache indexes post-restart or after sequence gaps ([PR #57789](https://github.com/vllm-project/vllm/pull/57789)).

### 5. Stability & Regressions
*   **GLM-5.3-Flash Instability (High):** Multiple reports of illegal memory access and output degeneration continue for GLM-5.3 variants, particularly with TP4+EP/MTP enabled on B200 and H20 hardware ([Issue #56868](https://github.com/vllm-project/vllm/issues/56868), [Issue #59115](https://github.com/vllm-project/vllm/issues/59115)). 
*   **Prefix Caching Corruptions (Medium):** Hybrid Mamba/GDN models are experiencing prefix-cache hits that fail to reach required depths when using MTP speculative decoding. A fix is pending ([PR #52244](https://github.com/vllm-project/vllm/pull/52244)).
*   **Attention Kernel Bug (Medium):** CUDA graph capture leaves uninitialized values in the KV cache block 0, causing potential softmax mask failures ([PR #57158](https://github.com/vllm-project/vllm/pull/57158)).

### 6. What This Means for Application Developers
*   **Agentic Frameworks:** If you are building agentic loops (e.g., using Anthropic's `tool_use`), watch for PR [#47598](https://github.com/vllm-project/vllm/pull/47598), which corrects the mapping of tool calls to ensure clients correctly execute functions rather than treating them as standard assistant turns.
*   **RL & Weight Sync:** Infrastructure teams managing RL fine-tuning should monitor the new `/weight_checker` endpoint ([PR #51350](https://github.com/vllm-project/vllm/pull/51350)) and the enhanced sleep/wake API metrics ([PR #52864](https://github.com/vllm-project/vllm/pull/52864)), which provide critical observability into long-running weight-update operations.
*   **Tooling Reliability:** The parser for `kimi_k2` has seen reports of empty tool call deltas during streaming under load ([Issue #54701](https://github.com/vllm-project/vllm/issues/54701)); ensure your application layer includes robust validation for streaming tool-call completion.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest: 2026-09-30

### 1. Today's Highlights
The SGLang ecosystem remains focused on stabilizing support for next-gen architectures and hybrid model types (Mamba/Gated Delta Networks) while addressing critical correctness issues in high-concurrency environments. Infrastructure teams are heavily prioritizing CI stability and upstreaming specialized "miles" branch features to `main`. Significant effort is currently directed toward refining AMD/ROCm kernel performance and fixing state-cache management for complex reasoning models.

### 2. Releases & Breaking Changes
*   **No new releases** were cut in the last 24 hours; development is active on the `main` branch with a focus on resolving technical debt and PR readiness for the AITER upgrade cycle ([#21302](https://github.com/sgl-project/sglang/issues/21302)).

### 3. New Model & Hardware Support
*   **AMD/ROCm Optimizations:** Work is underway to lay out Quark weights to accelerate ROCm decoding ([#41794](https://github.com/sgl-project/sglang/pull/41794)) and enable opt-in radix-select top-p pivot kernels ([#41534](https://github.com/sgl-project/sglang/pull/41534)).
*   **MUSA (Moore Threads):** The roadmap continues for first-class support for MUSA GPUs, currently tracking TorchDynamo graph-break issues ([#16565](https://github.com/sgl-project/sglang/issues/16565), [#39054](https://github.com/sgl-project/sglang/issues/39054)).

### 4. Performance & Optimization
*   **Fusion & Quantization:** A new PR targets the fusion of Flux3 rowwise FP8 quantization with Triton ([#41671](https://github.com/sgl-project/sglang/pull/41671)) and QSA KV preparation/sparse block expansion ([#40972](https://github.com/sgl-project/sglang/pull/40972)).
*   **Memory Efficiency:** Addressed integer overflow in `merge_state_v2` kernels for large-batch/long-sequence workloads ([#29720](https://github.com/sgl-project/sglang/pull/29720)).

### 5. Stability & Regressions
*   **Critical Correctness (High Severity):** 
    *   **Data Corruption:** Reported silent corruption of non-TP-replicated tensors during PP+TP all-gather operations ([#30015](https://github.com/sgl-project/sglang/issues/30015)).
    *   **Logic Drift:** Observed logprob drift in `GLM-5.3-Flash-NVFP4` on SM100 hardware ([#41609](https://github.com/sgl-project/sglang/issues/41609)).
    *   **Cache Management:** Reported double-free bug in Radix tree when using `--strip-thinking-cache` with request retractions ([#41617](https://github.com/sgl-project/sglang/issues/41617)).
*   **Known Regressions:** Hybrid Mamba/GDN models are experiencing TTFT inflation (up to 4.7x) when using `--enable-linear-replayssm` due to forced buffer disabling ([#37834](https://github.com/sgl-project/sglang/issues/37834)).

### 6. What This Means for Application Developers
*   **Reasoning Models:** If you are deploying models with internal chain-of-thought (reasoning), exercise caution with the `--strip-thinking-cache` flag; a known bug can cause KV cache double-frees in the current main branch.
*   **Multi-Node Deployments:** If running TP/PP across multiple nodes, monitor for potential tensor corruption issues; verify the status of fix [#30015](https://github.com/sgl-project/sglang/issues/30015) before upgrading production clusters.
*   **Mamba/Hybrid Models:** If you observe latency spikes in your hybrid model inference, check if your configuration is inadvertently triggering the linear-replay state caching limitation, which is currently impacting TTFT.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest: 2026-09-30

This digest covers the latest developments in `llama.cpp` infrastructure, focusing on backend stabilization, cross-platform performance tuning, and emerging model architectures.

### 1. Today's Highlights
Development has prioritized stabilizing the **Vulkan and Hexagon backends** via targeted kernel optimizations and bug fixes for recent GPU architectures (Adreno 750, Intel Arc). Additionally, the project is rapidly expanding its support for hybrid and non-autoregressive architectures, including initial handling for CTC-based models and refined support for PLaMo-2/3 tokenization.

### 2. Releases & Breaking Changes
*   **Build Versions:** Builds `b11260` through `b11269` were released. 
*   **GGML Constraint:** `b11261` now explicitly requires input tensors to be `GGML_OP_NONE` for certain operations, potentially impacting custom backend implementations that relied on loose tensor validation [#29647](https://github.com/ggml-org/llama.cpp/pull/29647).
*   **C++ ODR Compliance:** Fixes were landed to strictly enforce `GGML_COMMON_DECL_CPP` to prevent One Definition Rule violations across components [#29504](https://github.com/ggml-org/llama.cpp/pull/29504).

### 3. New Model & Hardware Support
*   **GraniteSpeech5:** Initial support for `GraniteSpeech5ForCTC` added, marking a shift toward supporting non-autoregressive (encoder-only) architectures [#29446](https://github.com/ggml-org/llama.cpp/pull/29446).
*   **Hexagon Backend:** Expanded F16 activation support (SILU, GELU, GEGLU, SWIGLU) for Snapdragon HTP backends to improve accuracy and parity with CPU/CUDA implementations [#29209](https://github.com/ggml-org/llama.cpp/pull/29209).
*   **Quantization:** Experimental Q1/Q2 quantization formats have been introduced to support ultra-low-bit architectures like Bonsai 8B [#29185](https://github.com/ggml-org/llama.cpp/pull/29185).

### 4. Performance & Optimization
*   **Vulkan Tuning:** Significant work on Intel performance and MoE-aware matmul tile selection. Shader tuning for GDN kernels and better alignment for F32 loads (2-aligned) aim to reduce throughput cliffs on MoE workloads [#29476](https://github.com/ggml-org/llama.cpp/pull/29476), [#29254](https://github.com/ggml-org/llama.cpp/pull/29254), [#29182](https://github.com/ggml-org/llama.cpp/pull/29182).
*   **Metal Optimization:** Fusion optimizations for MoE, SSM_CONV, and RMS_NORM paths were merged to accelerate gated delta network execution [#28948](https://github.com/ggml-org/llama.cpp/pull/28948).
*   **CPU/AVX512:** Optimized AVX512-FP16 dot product accumulation by shifting to F32, improving precision and stability [#29545](https://github.com/ggml-org/llama.cpp/pull/29545).

### 5. Stability & Regressions
*   **Vulkan/AMD:** Critical reports of "ErrorDeviceLost" on Radeon AI Pro and throughput degradation on Strix Halo platforms under batched decoding load [#29623](https://github.com/ggml-org/llama.cpp/issues/29623), [#25356](https://github.com/ggml-org/llama.cpp/issues/25356).
*   **Intel Arc:** A long-running degradation bug causing empty EOS replies after ~8 hours on the Vulkan backend is under investigation [#29526](https://github.com/ggml-org/llama.cpp/issues/29526).
*   **CUDA Regression:** Performance regressions observed on Blackwell architectures compared to `b10655` are currently being tracked [#29341](https://github.com/ggml-org/llama.cpp/issues/29341).

### 6. What This Means for Application Developers
*   **Tool Calling/Streaming:** For developers building agents, be aware of ongoing instability in multi-line streaming and tool-calling outputs for Gemma-4 models; monitor [#29655](https://github.com/ggml-org/llama.cpp/issues/29655).
*   **Server Configuration:** If using the web UI router mode, a bug in `ui_settings` handling may cause default generation parameters to fail until manual reset; expect a patch in upcoming builds [#29668](https://github.com/ggml-org/llama.cpp/pull/29668).
*   **Production Deployment:** If you are running `llama-server` in long-lived production environments, specifically on Intel Arc/Vulkan, consider implementing automated service restarts or health checks to mitigate the identified ~8-hour decode degradation.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

### Ollama Infrastructure Digest: 2026-09-30

#### 1. Today's Highlights
The focus has shifted heavily toward "System One" architectures, introducing explicit capability signaling and standardized API definitions for decision-making models. Concurrently, the engineering team is aggressively hardening the MLX and CUDA backends against scheduling regressions and state-wedging issues that have plagued long-context inference.

#### 2. Releases & Breaking Changes
*   **v0.35.1-rc0 released:** Includes a significant update to `llama.cpp` (b11232) and MLX version alignment. [View Release](https://github.com/ollama/ollama/pull/18652)
*   **API/Config:** New support for **System One** model declarations via `Modelfile` and `create` requests, requiring explicit `CAPABILITY` definitions to govern scheduling. [PR #18708](https://github.com/ollama/ollama/pull/18708)

#### 3. New Model & Hardware Support
*   **MLX Granite Support:** PR [#17972](https://github.com/ollama/ollama/pull/17972) adds `GraniteForCausalLM` architecture support to the MLX runner.
*   **System One Native Integration:** MLX backend receives native integration for "System One" decision models, enabling local scoring and logical branching workflows. [PR #18701](https://github.com/ollama/ollama/pull/18701)

#### 4. Performance & Optimization
*   **Context Strategy Documentation:** FAQ updated to clarify that default context window sizing is now dynamic (4k/32k/256k) based on detected VRAM tiers. [PR #18710](https://github.com/ollama/ollama/pull/18710)
*   **Offline Portability:** New `import`/`export` commands for model blobs are under review, aimed at simplifying air-gapped environment migrations. [PR #18578](https://github.com/ollama/ollama/pull/18578)

#### 5. Stability & Regressions
*   **MLX Stall (High):** Models using `nvfp4` quantization intermittently hang during prefill under single-slot sustained load. [Issue #18505](https://github.com/ollama/ollama/issues/18505)
*   **CUDA Model Wedging (High):** Linux CUDA users report the `llama-server` process wedges on full-cache hits, causing subsequent requests to hang indefinitely until model unload. [Issue #18685](https://github.com/ollama/ollama/issues/18685)
*   **Tool-Call Parser (Medium):** `qwen3coder` exhibits deterministic parsing failures with long file-write operations, leaking error strings to the client. [Issue #18563](https://github.com/ollama/ollama/issues/18563)
*   **macOS GUI Hangs:** Chat processing fails silently after 60s for long-context requests on M4 hardware. [Issue #18368](https://github.com/ollama/ollama/issues/18368)

#### 6. What This Means for Application Developers
*   **Agent Reliability:** Developers building coding agents should watch PRs [#17563](https://github.com/ollama/ollama/pull/17563) through [#17566](https://github.com/ollama/ollama/pull/17566), which address critical tool-call truncation and reasoning-budget management. These fixes are essential for preventing "infinite thinking" loops that currently drain context windows.
*   **System One Integration:** If you are building orchestration layers, familiarize yourself with the [System One API docs](https://github.com/ollama/ollama/pull/18702). It provides a structured interface for "Decision" tasks (yes/no, scoring), allowing you to move logic out of the model generation prompt and into the inference engine.
*   **RAG/Tooling:** Be aware that the `dir2mcp` integration [PR #18705](https://github.com/ollama/ollama/pull/18705) suggests a move toward standardized MCP (Model Context Protocol) knowledge servers, which may simplify future cross-tool compatibility.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

### **LiteLLM Digest: 2026-09-30**

#### **1. Today’s Highlights**
Today’s activity focuses on hardening the proxy’s agent and identity architecture, with significant updates to Entra/OIDC authentication and managed agent permissions. A series of critical fixes have also landed to address proxy-wide regressions in observability (OTEL/Langfuse), pagination error handling, and session token security.

#### **2. Releases & Breaking Changes**
*   **Version Bumps:** Releases `v1.100.4` through `v1.104.0-rc.2` have been pushed in quick succession, with a pending jump to `1.105.0` in the current main branch ([PR #43789](https://github.com/BerriAI/litellm/pull/43789)). 
*   **Security Update:** [PR #43790](https://github.com/BerriAI/litellm/pull/43790) implements a breaking change for session tokens; UI and CLI tokens now utilize isolated AES-GCM contexts to prevent cross-contamination and header formatting issues that previously triggered 401 errors.
*   **Verification:** All official Docker images remain signed via `cosign` (Key: [commit `0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0)).

#### **3. New Model & Hardware Support**
*   **Anthropic Bedrock Converse:** Work is underway to support beta headers for output configurations ([PR #43778](https://github.com/BerriAI/litellm/pull/43778)) and regional Bedrock aliases to ensure compatibility with GovCloud and other specialized endpoints ([PR #43785](https://github.com/BerriAI/litellm/pull/43785)).

#### **4. Performance & Optimization**
*   **Auth Refresh Latency:** [PR #43776](https://github.com/BerriAI/litellm/pull/43776) significantly improves latency by moving auth management refreshes into a Redis pipeline, reducing serial round-trips from 16 to a single batch call.
*   **OTEL Ingest Efficiency:** A new `excluded_services` flag allows developers to filter out redundant Redis/Postgres spans from tenant-specific OTel destinations, preventing ingestion bloat ([PR #43278](https://github.com/BerriAI/litellm/pull/43787)).

#### **5. Stability & Regressions**
*   **Critical - Error Handling:** [PR #43787](https://github.com/BerriAI/litellm/pull/43787) corrects a major issue where validation failures (missing params, bad pagination) were returning `500 Internal Server Errors` instead of `400 Bad Request`.
*   **High - Observability:** [PR #42708](https://github.com/BerriAI/litellm/pull/42708) addresses a data integrity bug where the `langfuse_otel` integration was misallocating end-user IDs to `session.id`, breaking analytics.
*   **Medium - Agent Infrastructure:** [PR #43791](https://github.com/BerriAI/litellm/pull/43791) fixes a "duplicate response" bug in Realtime/VAD workflows where the proxy incorrectly injected a `response.create` call after suppressed guardrail events.
*   **Medium - Logic/Data:** Ongoing investigations into concurrency issues with spend caches ([Issue #43491](https://github.com/BerriAI/litellm/pull/43491)) and incorrect reasoning token billing for Google Gemini models ([Issue #43575](https://github.com/BerriAI/litellm/pull/43575)).

#### **6. What This Means for Application Developers**
*   **Unified Auth:** If you manage agent-based infrastructure, monitor [PR #43722](https://github.com/BerriAI/litellm/pull/43722) for the integration of Entra identities, which will soon provide a standard for authenticated, bounded gateway access.
*   **Observability:** Developers using Langfuse should prepare for a shift in how user IDs are tracked; ensure your pipelines are ready for the fix in `user.id` mapping.
*   **Developer Experience:** The fix for 500-level error codes on client input means you can now rely on HTTP status codes to programmatically handle request validation errors without triggering internal incident alerts.
*   **Tooling/Agents:** A key improvement for MCP-based workflows is the ability to expose `tool.description` and `inputSchema` to pre-call hooks ([PR #41162](https://github.com/BerriAI/litellm/pull/41162)), enabling more granular security guardrails on tool usage.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest: 2026-09-30

### 1. Today's Highlights
Today's activity is heavily focused on refining the **Unsloth Studio desktop experience** and hardening fine-tuning workflows for high-end models. Core contributors are actively addressing stability for multi-vendor (NVIDIA/AMD) GPU environments and improving the robustness of the inference stack for models like DeepSeek-V4.1 and Qwen.

### 2. Releases & Breaking Changes
*   **No new releases in the last 24h.** 
*   **Dev Note:** Maintainers are actively re-basing for context parallelism support; users tracking `main` should expect frequent breaking changes in training config interfaces.

### 3. New Model & Hardware Support
*   **DeepSeek-V4.1:** Added support for non-reentrant gradient checkpointing, essential for stable training on Flash-optimized versions ([PR #12318](https://github.com/unslothai/unsloth/pull/12318)).
*   **AMD/Mixed Environments:** Significant work in addressing resource allocation on hybrid NVIDIA+AMD setups. The system is being tuned to prevent the "Automatic" backend from defaulting to sub-optimal compute stacks ([PR #12246](https://github.com/unslothai/unsloth/pull/12246)).

### 4. Performance & Optimization
*   **Context Parallelism:** Work continues on integrating SDPA ring attention for SFT, enabling linear scaling of context window limits relative to GPU count ([PR #4257](https://github.com/unslothai/unsloth/pull/4257)).
*   **Marlin Inference:** New PR submitted to fix packed INT4 inference crashes on vLLM 0.29 by rebuilding `marlin_gemm` calls from op schemas ([PR #12320](https://github.com/unslothai/unsloth/pull/12320)).
*   **BatchNorm Fix:** Implementation to keep frozen BatchNorm stats fixed during LoRA training to prevent unintended weight shifts in the base model backbone ([PR #12319](https://github.com/unslothai/unsloth/pull/12319)).

### 5. Stability & Regressions
*   **Training Interruption (High Severity):** Desktop app updates currently terminate training runs without warning or prompting to save progress. Fix in progress ([PR #12313](https://github.com/unslothai/unsloth/pull/12313)).
*   **Token Truncation:** `unsloth start pi` and `dsh` agents are currently hard-capped at 8,192 tokens regardless of the actual model context window. Fix pending ([PR #12315](https://github.com/unslothai/unsloth/pull/12315)).
*   **Linux Tooling:** Gradle builds in the Studio sandbox are failing due to missing `java.security` configuration paths in the environment ([Issue #12260](https://github.com/unslothai/unsloth/issues/12260) / [PR #12294](https://github.com/unslothai/unsloth/pull/12294)).

### 6. What This Means for Application Developers
*   **Agent Builders:** If you are using Unsloth's MCP tool-calling agents, be aware that transparent image backgrounds (PNG/WebP) are currently rendering as black when passed to GGUF vision models; ensure your pre-processing pipeline flattens to solid white/opaque backgrounds to avoid poor inference quality ([PR #12310](https://github.com/unslothai/unsloth/pull/12310)).
*   **Fine-Tuning:** If you are building automated pipelines, beware of the default behavior where the Studio app may kill training on auto-update. Ensure you have manual checkpoint frequency set explicitly higher than 0 to mitigate potential loss of progress.
*   **Chat Templates:** If you are migrating to newer models (Llama 3.1, Gemma 4), watch for incorrect role mapping (e.g., "human" vs "user" tags) when using standard ShareGPT formats; update your `get_chat_template` logic to match the model’s specific schema ([PR #12314](https://github.com/unslothai/unsloth/pull/12314)).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/jinming1345/agents-radar).*