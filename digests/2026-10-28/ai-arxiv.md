# ArXiv AI 研究日报 2026-10-28

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-10-28 01:32 UTC

---

### ArXiv AI 研究摘要 (2026-10-28)

#### 1. 今日焦点
研究活动主要集中在“智能体系统”（Agentic Systems）及推理时动态优化上。主要突破包括：用于自我改进型智能体团队的高级技术、提高效率的自适应 KV 缓存，以及通过集成“反射式优化”（Reflective Optimization）循环来提升推理能力。此外，一个显著趋势是，通过强制执行可审计性和批次不变性（Batch Invariance），使 AI 系统在高风险环境（如软件保证和科学自动驾驶实验室）中变得更加可靠。

---

#### 2. 重点论文

**🧠 大语言模型**
| 论文 | 作者 | 摘要 |
| :--- | :--- | :--- |
| [DCKV: Learned Transform Coding of the Prompt KV Cache...](http://arxiv.org/abs/2610.36950v1) | Maximov E, et al. | 引入了一种可微分编解码器，用于压缩混合语言模型中的 KV 缓存。显著降低了长提示词重用时的内存开销。 |
| [Select-TTT: Query-Conditioned Selective Fast Weight Updates...](http://arxiv.org/abs/2610.36794v1) | Wu Y, et al. | 使模型能够将上下文内化为快速权重参数，而非依赖瞬态注意力。提高了已部署语言模型的适应性。 |
| [Balanced State Subspaces for Mamba-2 State Compression](http://arxiv.org/abs/2610.36617v1) | Shang T, et al. | 发现 Mamba-2 的状态能量集中在特定子空间中。这使得对循环状态的压缩更加高效。 |

**🤖 智能体与推理**
| 论文 | 作者 | 摘要 |
| :--- | :--- | :--- |
| [Evolving Agent Teams](http://arxiv.org/abs/2610.36848v1) | Cao S, et al. | 提出进化智能体团队以克服复杂编码任务（如 GPU 内核优化）中的局部最优问题。有效突破了智能体初始性能的上限。 |
| [When All Rollouts Fail: Policy-Compatible Joint Decoding...](http://arxiv.org/abs/2610.36849v1) | Wang Z, et al. | 解决了所有初始路径均不正确时 RLVR 的失效模式。通过联合解码，在困难推理问题上保持进展。 |
| [Batching the Reflective Optimization Loop...](http://arxiv.org/abs/2610.36774v1) | Zhang J, et al. | 并行化反射循环中智能体候选方案的评估。在不牺牲质量的前提下，大幅加快了迭代改进速度。 |

**🔧 方法与框架**
| 论文 | 作者 | 摘要 |
| :--- | :--- | :--- |
| [GUI-JEPA: Candidate-Conditioned JEPA Latents...](http://arxiv.org/abs/2610.36877v1) | Wang B, et al. | 使用 JEPA 潜在表征作为 GUI 智能体的快速策略，避免缓慢的文本解码。为移动端自动化提供了巨大的速度提升。 |
| [Robust LLM Data Selection via Content-Invariant Gradient Attribution](http://arxiv.org/abs/2610.36755v1) | Gu J, et al. | 通过过滤梯度噪声改进指令微调的数据选择，通过更好的训练数据筛选构建更稳健的模型。 |
| [God Does Not Play Dice: Enforcing Batch Invariance in Agentic Kernel Generation](http://arxiv.org/abs/2610.36623v1) | Bao Y, et al. | 强制智能体生成的 GPU 内核在不同批次大小下保持数值一致性。这对 AI 生成代码的工业级可靠部署至关重要。 |

**📊 应用**
| 论文 | 作者 | 摘要 |
| :--- | :--- | :--- |
| [RubricAtlas: Mining Type-Level Rubrics from Expert Reports...](http://arxiv.org/abs/2610.36878v1) | Wang D, et al. | 提取领域特定的评分标准来评估复杂的研究型智能体。超越了简单的事实核查，转向分析质量评估。 |
| [Making Self-Driving Laboratories Auditable...](http://arxiv.org/abs/2610.36761v1) | Zhang Z, et al. | 提供了一个统一的框架，用于控制和审计实验室机器人系统，实现了规划与经验反馈之间的闭环。 |

---

#### 3. 研究趋势信号
研究领域正从“以模型为中心”转向“以过程为中心”。我们不再假设单一的静态模型可以解决所有复杂任务。当前的重点转向了**资源高效推理**（如 DCKV、GUI-JEPA）、**迭代自我修正**（如 Evolving Agent Teams、Reflective Optimization）以及**结构一致性**（如 Batch Invariance）。一个显著的新兴趋势是对“难题”的聚焦：如何处理标准模型训练失效的场景——特别是在数学（奥数级证明验证）和复杂的底层代码生成方面。“可审计 AI”和“可靠性导向”架构的凸显，标志着行业进入了成熟期，重点已从能力探索转向智能体在科学和技术工作流中的部署就绪度。

---

#### 4. 深度阅读推荐

*   **[Evolving Agent Teams](http://arxiv.org/abs/2610.36848v1)**：对于从事编码智能体或基于 LLM 的软件工程的人员来说，这是必读内容。从个体智能体向进化团队的转变，是解决 GPU 内核优化等高复杂性领域的核心设计模式。
*   **[When All Rollouts Fail: Policy-Compatible Joint Decoding for Hard-Problem Reasoning](http://arxiv.org/abs/2610.36849v1)**：该论文解决了当前“带可验证奖励的强化学习”（RLVR）中的“学习断崖”问题，为在复杂多步任务中扩展推理能力提供了必要的技术方案。
*   **[God Does Not Play Dice: Enforcing Batch Invariance in Agentic Kernel Generation](http://arxiv.org/abs/2610.36623v1)**：这是一项关于 LLM 生成与系统工程交叉领域的优秀研究，强调了 AI 生成代码中的非确定性行为为何是工业应用的主要障碍。

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*