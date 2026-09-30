# ArXiv AI Research Digest 2026-09-30

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 papers | Generated: 2026-09-30 01:31 UTC

---

### 1. Today's Highlights
The research landscape as of September 30, 2026, is dominated by the maturation of reinforcement learning (RL) techniques for language model post-training, specifically targeting the inefficiencies and instabilities in Group-Relative Policy Optimization (GRPO). There is a distinct shift toward "agentic" reliability, with multiple papers focusing on neuro-symbolic execution, long-context reasoning, and safety auditing for LLM-based agents. Furthermore, we observe significant activity in specialized deployment techniques, such as edge-native language models and hardware-efficient communication protocols, signaling a move toward real-world, embodied, and resource-constrained intelligence.

---

### 2. Key Papers

#### 🧠 Large Language Models
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [ER-JEPA](http://arxiv.org/abs/2609.36952v1) | Jingnan Pu et al. | Introduces experience replay to Joint-Embedding Predictive Architectures to improve abstract semantic learning. This addresses the limitations of standard token-level generation in capturing complex world knowledge. |
| [Controlled Decoding Attacks](http://arxiv.org/abs/2609.36956v1) | Jesson Wang et al. | Demonstrates that black-box LLM safety can be bypassed by manipulating next-token probabilities during generation. This highlights a critical vulnerability in models that only provide output text without access to underlying logits. |
| [STAR-GRPO](http://arxiv.org/abs/2609.36900v1) | Wan Tian et al. | Proposes canonical anchoring to prevent reward hacking in group-relative optimization. This enhances training stability by mitigating the model's tendency to exploit brittle proxy objectives. |

#### 🤖 Agents & Reasoning
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Neuro-Symbolic Computer Use](http://arxiv.org/abs/2609.36927v1) | Hyewon Suh et al. | Introduces a neuro-symbolic framework for recurring computer tasks to avoid costly, unreliable replanning. It enables efficient and reliable execution by learning reusable policies. |
| [PrecogUI](http://arxiv.org/abs/2609.36923v1) | Bin Kang et al. | Develops a pre-cognitive architecture for GUI agents that uses simulation to handle long-horizon, dynamic tasks. This proactive approach significantly reduces cascading failures compared to traditional reactive agents. |
| [CoEM](http://arxiv.org/abs/2609.36935v1) | Jingguang Li et al. | Introduces "Commit-on-Evidence Memory" to maintain reasoning performance over extremely long contexts. It solves the performance degradation issues typical of chunk-based processing in LLMs. |

#### 🔧 Methods & Frameworks
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [VStress](http://arxiv.org/abs/2609.36958v1) | Miaobo Hu et al. | Presents a correlation-aware auditing policy for repeated verifier calls to optimize budget allocation. It ensures that only verifiers providing conditional marginal information are queried, increasing computational efficiency. |
| [Purlin](http://arxiv.org/abs/2609.36954v1) | Osayamen Jonathan Aimuyo et al. | Decouples orchestration from the datapath in collective communication for distributed inference. This separation allows communication protocols to evolve independently of specific hardware or workloads. |

#### 📊 Applications
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [VLALight](http://arxiv.org/abs/2609.36934v1) | Pan Zhang et al. | Implements a Vision-Language-Action model for traffic signal control using visual traffic observations. It moves beyond manually engineered state representations to enable more adaptive urban mobility. |
| [IronLLM](http://arxiv.org/abs/2609.36860v1) | Changdi Yang et al. | Delivers a 654M-parameter model optimized for on-device inference via shared-KV multi-token prediction. It is designed to provide real-time intelligence for resource-constrained embodied robots. |

---

### 3. Research Trend Signal
The field is transitioning from general-purpose LLM scaling toward **optimization of the agentic lifecycle**. We see two primary vectors: **Policy Stability and Efficiency**, where researchers are tackling the "staleness cliff" (the point where sampling distributions diverge from current policy updates in RL) and developing sophisticated ways to reuse memory (KV cache compaction, neuro-symbolic execution). 

Simultaneously, there is a surge in **safety-critical auditing**. Instead of just post-hoc testing, new frameworks like *VStress* and *SKILLLITE* focus on creating "auditable" agent pathways. The integration of vision-language models into physical domains (traffic, aerial manipulation, GUI control) confirms that "embodiment" is no longer just a robotics niche but a central challenge for language model architecture. Finally, the focus on *black-box attacks* and *gradient-based jailbreak detection* suggests that as models become more integrated into critical infrastructure, the focus is shifting from "making models smarter" to "making model interactions observable and controllable."

---

### 4. Worth Deep Reading

1. **[IronLLM: Forging Compact Edge-Native Language Models...](http://arxiv.org/abs/2609.36860v1)**: Essential for understanding the current frontier of "Small Language Models" (SLMs) and how multi-token prediction techniques are being used to circumvent the memory bottlenecks of edge devices.
2. **[Neuro-Symbolic Computer Use: Learning Reusable Policies...](http://arxiv.org/abs/2609.36927v1)**: This paper is a breakthrough in moving AI agents from one-off tasks to persistent, recurring workflows, bridging the gap between flexible LLM reasoning and rigid, symbolic execution.
3. **[Cool the Sampler, Not the Learner: Sampling Temperature Moves the Staleness Cliff...](http://arxiv.org/abs/2609.36953v1)**: A must-read for practitioners in RLHF/GRPO, as it provides a clean, empirical explanation of why RL performance often collapses in production and offers a simple, actionable tuning lever.

---
*This digest is auto-generated by [agents-radar](https://github.com/jinming1345/agents-radar).*