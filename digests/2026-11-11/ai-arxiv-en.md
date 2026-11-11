# ArXiv AI Research Digest 2026-11-11

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 papers | Generated: 2026-11-11 01:34 UTC

---

### 1. Today's Highlights
Current research is shifting focus from raw model scaling to the robustness, interpretability, and verifiable reliability of AI systems. A notable trend involves "agentic" governance, where new frameworks attempt to address deceptive behavior in LLMs and improve multi-agent coordination through rigorous benchmarking. Beyond language, there is a strong emphasis on integrating physics-based and domain-specific knowledge into generative models, with advancements in causal structure learning and scientific discovery architectures.

---

### 2. Key Papers

#### 🧠 Large Language Models
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [What the Loss Curve Misses: FP4 Pretraining Slows the Acquisition of Rare Facts](http://arxiv.org/abs/2611.12832v1) | Chang Lu, Mengjiao Zhang | Shows that low-precision (FP4) training leads to significantly slower acquisition of rare facts despite matching validation loss. This highlights a critical oversight in current efficiency-driven pretraining practices. |
| [KiteNorm: Variance Regularisation for Stable and Scalable Post-LN Transformers](http://arxiv.org/abs/2611.12729v1) | Leon A. Trochelmann et al. | Introduces a variance-based regularization technique to enable stable, deep Post-LN Transformers. It addresses the training instability that has historically limited the use of Post-LN architectures. |
| [Where Does Alignment Emerge and What Does It Mean?](http://arxiv.org/abs/2611.12869v1) | Julia Herbst et al. | Investigates the Platonic Representation Hypothesis to determine if vision and language models converge on shared spaces. It offers a critical perspective on whether alignment is an emergent property of scale. |

#### 🤖 Agents & Reasoning
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Mitigating Agentic Deception via Evaluation-Side Partially Observable Games](http://arxiv.org/abs/2611.12835v1) | Hanxiao Li et al. | Proposes a game-theoretic framework to identify and mitigate deceptive behaviors where agents manipulate outcomes for reward. This is vital for ensuring long-term safety as agents take on autonomous roles. |
| [WorkflowArena: Benchmarking Executable Workflow Orchestration](http://arxiv.org/abs/2611.12856v1) | Zheng Jiang et al. | Establishes a new benchmark for evaluating how LLM agents coordinate complex, multi-step workflows. It shifts evaluation from standalone performance to systemic orchestration capability. |
| [Agentic-OPD: Recovering Forgotten Agent Capabilities via On-Policy Distillation](http://arxiv.org/abs/2611.12799v1) | Tingcheng Bian et al. | Demonstrates that current RL-based LLM training discards valuable agentic capabilities during checkpoint selection. It introduces a distillation method to recover these "lost" skills. |

#### 🔧 Methods & Frameworks
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [PORT: Preference Optimization via Robust Token-Level Reweighting](http://arxiv.org/abs/2611.12763v1) | Ding Zhu et al. | Addresses the sensitivity of preference optimization to noisy annotations by introducing a token-level reweighting mechanism. This improves the robustness of model alignment against poor-quality human labels. |
| [Clique Constraints for Exact Causal Structure Learning](http://arxiv.org/abs/2611.12747v1) | Xiaoyu He et al. | Introduces clique constraints to optimize exact score-based causal structure learning. This significantly reduces the computational overhead of identifying causal relationships in high-dimensional data. |

#### 📊 Applications
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [How Well Does AI Peer Review Work? A Benchmark Built from 100 Planted Errors](http://arxiv.org/abs/2611.12820v1) | Paul Litvak | Tests frontier models on their ability to detect scientific errors planted in psychology papers. It provides a sobering reality check on the current reliability of AI-assisted peer review. |
| [CoilStellaration: A Dataset and Benchmark for Engineering-Aware Stellarator Coilset Generation](http://arxiv.org/abs/2611.12689v1) | Jan-Hendrik Ewers et al. | Provides a dataset for designing magnetic coils in fusion reactors, blending machine learning with physics constraints. It highlights the growing use of AI in high-stakes scientific engineering. |

---

### 3. Research Trend Signal
A clear pivot is occurring from "generative capabilities" toward "verifiable performance." Several papers (e.g., *Mitigating Agentic Deception*, *How Well Does AI Peer Review Work?*) explicitly focus on auditing and safety-testing models in real-world contexts where stakes are high. 

Technically, the "efficiency vs. performance" trade-off is being scrutinized with increasing granularity. The finding that FP4 pretraining compromises factual acquisition suggests that the industry may have hit a point of diminishing returns in aggressive quantization. Furthermore, the interest in "metacognitive" architectures (e.g., *Sage-Taiyi*) suggests a move toward agents that can monitor their own belief states and evidence gathering, departing from simple reactive Chain-of-Thought prompting. Finally, causality remains a persistent, critical theme, with researchers seeking better ways to enforce structure in models rather than relying solely on black-box pattern matching.

---

### 4. Worth Deep Reading
1. **[Mitigating Agentic Deception via Evaluation-Side Partially Observable Games](http://arxiv.org/abs/2611.12835v1)**: This is a foundational read for AI safety, moving beyond alignment through fine-tuning into game-theoretic auditing—a likely necessity for future autonomous systems.
2. **[What the Loss Curve Misses: FP4 Pretraining Slows the Acquisition of Rare Facts](http://arxiv.org/abs/2611.12832v1)**: Essential for practitioners building foundation models; it challenges the prevailing assumption that "if loss matches, the model is equivalent."
3. **[How Well Does AI Peer Review Work? A Benchmark Built from 100 Planted Errors](http://arxiv.org/abs/2611.12820v1)**: Offers a much-needed empirical reality check on the use of AI in academic and scientific gatekeeping, providing a methodology for measuring "hallucination-to-insight" ratios in expert tasks.

---
*This digest is auto-generated by [agents-radar](https://github.com/jinming1345/agents-radar).*