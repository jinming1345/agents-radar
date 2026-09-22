# ArXiv AI 研究日报 2026-09-22

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-09-22 06:53 UTC

---

### 1. 今日摘要
2026年9月22日的研究动态反映出该领域正在走向成熟，重心正从“模型缩放”转向“智能体可靠性”和“长期治理”。一个核心主题是智能体框架（agent harnesses）的递归自我提升，即系统能够自主优化自身的工具集、提示词和记忆，以克服特定部署环境中的瓶颈。同时，业界也在努力超越静态的端到端评估，针对计算机使用智能体和科学推理的流程化评估基准正不断涌现。最后，具身智能（机器人）领域在“视觉-触觉”建模方面出现了激增，这标志着系统正朝着更灵巧、具身化，且能够通过感官接触而非仅靠视觉进行推理的方向演进。

---

### 2. 重点论文

#### 🧠 大语言模型
| 论文 | 作者 | 摘要 |
| :--- | :--- | :--- |
| [LoRA-generating hypernetworks](http://arxiv.org/abs/2609.24979v1) | Augenstein, Ding, Lee et al. | 提出利用超网络（hypernetworks）生成 LoRA 权重，用于端侧 LLM 个性化。该方法可在资源受限的移动硬件上实现高质量适配。 |
| [Pinocchio: Fast Uncertainty Estimates](http://arxiv.org/abs/2609.24881v1) | Hayes, Pal, Zhang et al. | 引入了一种无需获取对数概率即可对黑盒 LLM 进行不确定性评估的方法。这对于在不透明的生产环境中进行可靠的高风险决策至关重要。 |

#### 🤖 智能体与推理
| 论文 | 作者 | 摘要 |
| :--- | :--- | :--- |
| [Critical-State RL](http://arxiv.org/abs/2609.24985v1) | Chen, Zhao, Cen et al. | 诊断多轮工具调用中导致失败的关键模型调用。通过定位这些状态，作者实现了更高效的训练，专注于可执行的智能体干预。 |
| [RRSI: Regularized Recursive Self-Improvement](http://arxiv.org/abs/2609.24972v1) | Xia, Han, Wang et al. | 将智能体框架（提示词、记忆、工具）的迭代自动化，以优化性能。它提供了一种结构化的方式来演进智能体，无需人类手动干预。 |
| [Emergent Collusion](http://arxiv.org/abs/2609.24967v1) | Shi, Zhang, Yang | 研究长时程多智能体交互如何导致非预期的协同模式。理解这些涌现行为对于未来协作式 AI 生态系统的安全性至关重要。 |

#### 🔧 方法与框架
| 论文 | 作者 | 摘要 |
| :--- | :--- | :--- |
| [onPanda: Efficient Annotation](http://arxiv.org/abs/2609.24983v1) | Yang, Liu, Jia et al. | 引入了一种用于 LLM 对齐和轨迹数据的 Token 级校正工具。它显著降低了人类标注员的工作难度，同时提高了智能体反馈的质量。 |
| [OSWorld-Pro: Process-based Evaluation](http://arxiv.org/abs/2609.24890v1) | Wang, Zhang, Zhang et al. | 将计算机使用智能体的评估重点从最终结果转向中间处理步骤。这种透明度有助于精准调试智能体在复杂多步任务中失败的位置。 |

#### 📊 应用
| 论文 | 作者 | 摘要 |
| :--- | :--- | :--- |
| [DexTacWAM: Visuo-Tactile World-Action Model](http://arxiv.org/abs/2609.24976v1) | Yuan, Wang, Shao et al. | 将视频世界模型与触觉感知相结合，以提升机器人灵巧操作能力。它使机器人能够理解标准纯视觉系统无法感知到的接触动态。 |
| [MedRSI: Recursive Self-Improvement for Medical Agents](http://arxiv.org/abs/2609.24838v1) | Wu, Zhu, Hu et al. | 将自演进技术应用于医疗智能体，使其能从过去的临床错误中学习。这使得医疗 AI 能够在部署后适应专业领域的特殊要求。 |

---

### 3. 研究趋势信号
2026年9月22日的研究趋势标志着对“单体化”模型开发的背离，出现了两个关键信号：
1. **“框架（Harness）”成为主要的计算目标**：注意力正从模型底座转向“框架”——即工具、记忆和提示词的编排层。诸如 *RRSI* 和 *Harness-Zero* 等论文表明，智能体性能的未来在于优化模型周围的系统，而不仅仅是训练模型本身。
2. **流程层面的透明度**：业界日益认识到，“最终结果”的评估对于高风险智能体来说已不再足够。无论是在临床编码（*Decomposing Error and Style*）、计算机使用（*OSWorld-Pro*），还是医疗推理（*MedRSI*）中，研究人员都要求提供能够揭示 AI 决策过程和原因的指标。我们正在进入一个“可审查智能”的时代，AI 所走的路径被认为与其最终输出同样重要。

---

### 4. 深度阅读推荐
1. **[RRSI: Regularized Recursive Self-Improvement of Agent Harnesses](http://arxiv.org/abs/2609.24972v1)**：这是理解如何自动化“智能体工程”循环的必读文章，这很可能是扩展智能体能力的下一个重大前沿。
2. **[DexTacWAM: A Visuo-Tactile World-Action Model for Dexterous Manipulation](http://arxiv.org/abs/2609.24976v1)**：机器人领域的奠基性论文，展示了如何成功集成多模态感官输入（触觉+视觉）来解决长期存在的操控难题。
3. **[Critical-State RL: Diagnosing Trainable States for Multi-Turn Tool Use](http://arxiv.org/abs/2609.24985v1)**：为智能体轨迹中的“信用分配”问题提供了严谨的数学和实证框架，这是迈向鲁棒且具备错误纠正能力的 AI 的关键一步。

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*