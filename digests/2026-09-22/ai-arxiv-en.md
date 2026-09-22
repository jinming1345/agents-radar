# ArXiv AI Research Digest 2026-09-22

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 papers | Generated: 2026-09-22 06:53 UTC

---

### 1. Today's Highlights
Research on September 22, 2026, reflects a maturing field shifting away from "model scaling" toward "agentic reliability" and "long-term governance." A dominant theme is the recursive self-improvement of agent harnesses, where systems autonomously refine their own tooling, prompts, and memory to overcome deployment-specific bottlenecks. There is also a concerted effort to move beyond static end-to-end evaluation, with new benchmarks emerging for process-based assessment in computer-use agents and scientific reasoning. Finally, physical AI (robotics) is seeing a surge in "visuo-tactile" modeling, signaling a move toward more dexterous, embodied systems capable of reasoning through sensory contact rather than just vision.

---

### 2. Key Papers

#### 🧠 Large Language Models
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [LoRA-generating hypernetworks](http://arxiv.org/abs/2609.24979v1) | Augenstein, Ding, Lee et al. | Proposes hypernetworks to generate LoRA weights for on-device LLM personalization. This allows high-quality adaptation on resource-constrained mobile hardware. |
| [Pinocchio: Fast Uncertainty Estimates](http://arxiv.org/abs/2609.24881v1) | Hayes, Pal, Zhang et al. | Introduces a method for uncertainty estimation in black-box LLMs without requiring access to log-probabilities. This is critical for reliable, high-stakes decision-making in opaque production environments. |

#### 🤖 Agents & Reasoning
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Critical-State RL](http://arxiv.org/abs/2609.24985v1) | Chen, Zhao, Cen et al. | Diagnoses specific model calls during multi-turn tool use that contribute to failure. By isolating these, the authors enable more efficient training focused on actionable agentic interventions. |
| [RRSI: Regularized Recursive Self-Improvement](http://arxiv.org/abs/2609.24972v1) | Xia, Han, Wang et al. | Automates the iteration of agent harnesses (prompts, memory, tools) to optimize performance. It provides a structured way to evolve agents without human-in-the-loop manual tuning. |
| [Emergent Collusion](http://arxiv.org/abs/2609.24967v1) | Shi, Zhang, Yang | Investigates how long-horizon multi-agent interactions can lead to undesirable coordination patterns. Understanding these emergent behaviors is essential for the future safety of collaborative AI ecosystems. |

#### 🔧 Methods & Frameworks
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [onPanda: Efficient Annotation](http://arxiv.org/abs/2609.24983v1) | Yang, Liu, Jia et al. | Introduces a token-level correction tool for LLM alignment and trajectory data. It significantly lowers the friction for human annotators while improving the quality of agent feedback. |
| [OSWorld-Pro: Process-based Evaluation](http://arxiv.org/abs/2609.24890v1) | Wang, Zhang, Zhang et al. | Shifts evaluation for computer-use agents from final outcomes to intermediate process steps. This transparency helps debug exactly where agents fail in complex, multi-step tasks. |

#### 📊 Applications
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [DexTacWAM: Visuo-Tactile World-Action Model](http://arxiv.org/abs/2609.24976v1) | Yuan, Wang, Shao et al. | Combines video world models with tactile sensing for better dexterous robotic manipulation. It allows robots to understand contact dynamics that are invisible to standard vision-only systems. |
| [MedRSI: Recursive Self-Improvement for Medical Agents](http://arxiv.org/abs/2609.24838v1) | Wu, Zhu, Hu et al. | Applies self-evolution techniques to medical agents to allow them to learn from past clinical errors. This enables medical AI to adapt to specialized domain requirements post-deployment. |

---

### 3. Research Trend Signal
The research trend on September 22, 2026, marks a departure from "monolithic" model development. Two key signals emerge:
1. **The "Harness" as the Primary Compute Target**: The attention is shifting from the model backbone to the "harness"—the orchestration layer of tools, memory, and prompts. Papers like *RRSI* and *Harness-Zero* suggest that the future of agent performance lies in optimizing the system *around* the model, rather than just training the model itself.
2. **Process-Level Transparency**: There is a growing awareness that "end-result" evaluation is no longer sufficient for high-stakes agents. Whether in clinical coding (*Decomposing Error and Style*), computer use (*OSWorld-Pro*), or medical reasoning (*MedRSI*), researchers are demanding metrics that reveal the *how* and *why* of AI decision-making. We are entering an era of "inspectable agency," where the path taken by the AI is considered as vital as its ultimate output.

---

### 4. Worth Deep Reading
1. **[RRSI: Regularized Recursive Self-Improvement of Agent Harnesses](http://arxiv.org/abs/2609.24972v1)**: This is essential reading for understanding how to automate the "agent engineering" loop, which is likely the next major frontier in scaling agentic capabilities.
2. **[DexTacWAM: A Visuo-Tactile World-Action Model for Dexterous Manipulation](http://arxiv.org/abs/2609.24976v1)**: A foundational paper for robotics, demonstrating a successful integration of multi-modal sensory input (tactile + visual) for solving long-standing manipulation challenges.
3. **[Critical-State RL: Diagnosing Trainable States for Multi-Turn Tool Use](http://arxiv.org/abs/2609.24985v1)**: This provides a rigorous mathematical and empirical framework for the "credit assignment" problem in agentic trajectories, a critical step toward robust, error-correcting AI.

---
*This digest is auto-generated by [agents-radar](https://github.com/jinming1345/agents-radar).*