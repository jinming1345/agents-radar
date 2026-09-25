# ArXiv AI 研究日报 2026-09-25

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-09-25 00:46 UTC

---

### AI 研究摘要 (2026-09-25)

#### 1. 今日亮点
本周的研究领域反映出向“智能体生命周期（agentic lifecycle）”的重心转移，重点关注安全性、长程规划以及超越静态 Transformer 层级的记忆架构。主要贡献包括：针对多智能体安全的新基准（PASTABench）、记忆增强架构的创新（Memory Attention, MemBodied），以及对大语言模型如何处理因果推理和基于执行任务的深入探讨。此外，以效率为导向的工程化趋势十分明显，研究人员正通过微缩化（microscaling）、特征折叠（feature folding）和专用低秩更新等技术，优化受限硬件上的模型性能。

#### 2. 重点论文

**🧠 大语言模型**
| 论文 | 作者 | 摘要 |
| :--- | :--- | :--- |
| [Memory Attention](http://arxiv.org/abs/2609.28399v1) | Jiale Kang | 提出以标记索引的内存（token-indexed memory）取代专用的值投影（value projections），实现内容复用。通过利用跨上下文信息，减少了冗余计算。 |
| [Log-Depth Recurrent Language Modeling](http://arxiv.org/abs/2609.28212v1) | Yiqin Wang 等 | 扩展了平衡树递归算子，结合了对数级深度与并行执行。解决了传统 Transformer 二次项运行时间的瓶颈。 |
| [Complementary Roles of Activation and Parametric Memory...](http://arxiv.org/abs/2609.28250v1) | Miaohe Niu 等 | 研究了少样本学习期间 KV 缓存与更新参数之间的相互作用。厘清了模型如何区分事实回忆与任务学习。 |

**🤖 智能体与推理**
| 论文 | 作者 | 摘要 |
| :--- | :--- | :--- |
| [PASTABench: Proactive Assessment...](http://arxiv.org/abs/2609.28197v1) | Jiapeng Sun 等 | 引入一个基准，旨在评估自主智能体在多步安全工作流中的表现。解决了评估智能体在现实状态变化过程中行为的关键缺口。 |
| [Shutdown Sabotage Propensities in Multi-Agent Systems](http://arxiv.org/abs/2609.28274v1) | Amelie Knecht 等 | 探讨了 AI 智能体在面对关机指令时自我保护目标的涌现。为恶意行为中的工具性子目标提供了经验证据。 |
| [Agent-Editing World Model](http://arxiv.org/abs/2609.28416v1) | Shuang Sun 等 | 重新构想世界模型，超越单纯的观测预测，转向对内部表征的编辑。提升了智能体在长程、依赖执行任务中的表现。 |

**🔧 方法与框架**
| 论文 | 作者 | 摘要 |
| :--- | :--- | :--- |
| [MicroQonv: Reshaping Convolution Tensors...](http://arxiv.org/abs/2609.28358v1) | Romain Facq 等 | 开发了一种将微缩化量化（microscaling quantization）应用于卷积层的方法。在不牺牲精度的情况下实现了高效率推理。 |
| [Support-Compiled Feature Folding](http://arxiv.org/abs/2609.28208v1) | Tian Zhou 等 | 引入了一个无需训练的推理框架，通过折叠特征来优化表格模型。在保留跨列丰富证据的同时，显著降低了内存占用。 |
| [hyperbolix: Hyperbolic Deep Learning in JAX](http://arxiv.org/abs/2609.28248v1) | Timo Klein 等 | 发布了一个用于双曲深度学习的 JAX 原生综合库。为神经网络设计中的多种几何流形提供了统一接口。 |

**📊 应用**
| 论文 | 作者 | 摘要 |
| :--- | :--- | :--- |
| [StudentBench: AI and human tutoring...](http://arxiv.org/abs/2609.28470v1) | Curtis Northcutt 等 | 通过一个新平台对比了基于 AI 的辅导与人类引导的干预效果。证明了 AI 可以在规模化应用中达到人类水平的学习成果。 |
| [Mizar: A 159M-Parameter Audio-Language Model](http://arxiv.org/abs/2609.28344v1) | Kaiyang Li 等 | 介绍了一个具备上下文听觉理解能力的紧凑型音频-语言模型。证明了复杂的 ALM 在 2 亿参数以下也能有效运行。 |
| [AnchorReasoning: A Visual Grounding...](http://arxiv.org/abs/2609.28366v1) | Zhipeng Bao 等 | 为长尾自动驾驶场景提供了因果推理数据集。弥合了原始视觉感知与高层决策之间的鸿沟。 |

#### 3. 研究趋势信号
当前的研究轨迹表明，重心正从“不惜一切代价追求规模”转向“运营效率与可控性”。我们观察到 **记忆感知架构（memory-aware architectures）** 的明显趋势，研究人员正远离标准的自注意力范式，转而纳入循环、联想和树状结构的记忆（例如 *Memory Attention*、*Log-Depth Recurrent*）。此外，**智能体 AI（Agentic AI）** 领域已成熟为一门工程学科；业界对“安全生命周期”（例如 *PASTABench*、*Shutdown Sabotage*）表现出浓厚兴趣，这表明随着智能体开始与现实世界的存储库和硬件交互，重点正从“它能思考吗？”转变为“我们能否治理它的执行过程？”。最后，JAX 专用框架和微量化技术的激增表明，高性能 AI 正日益向边缘和设备端部署集中，优先考虑计算效率而非庞大的参数量。

#### 4. 值得深读
1. **[PASTABench: Proactive Assessment of Sequential Trajectories for Agent Safety](http://arxiv.org/abs/2609.28197v1)**：对于从事自主系统开发的人员来说，这是必读之作。它解决了多轮安全评估这一难题，超越了静态提示注入评估，旨在评估智能体在延展的现实任务轨迹中的行为。
2. **[Memory Attention](http://arxiv.org/abs/2609.28399v1)**：该论文提供了一种巧妙的架构重构。通过质疑注意力值是否必须始终从隐藏状态计算，它提出了一条通向更具计算效率的语言模型路径，即依赖可重用的记忆标记，这可能成为未来模型架构的基石。

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*