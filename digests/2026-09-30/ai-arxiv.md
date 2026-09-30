# ArXiv AI 研究日报 2026-09-30

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-09-30 01:31 UTC

---

### 1. 今日摘要
截至 2026 年 9 月 30 日，研究领域主要被语言模型后训练中强化学习（RL）技术的成熟化所主导，重点针对组相对策略优化（GRPO）中的效率低下和不稳定问题。研究重心出现向“智能体（Agentic）”可靠性的明显偏移，多篇论文聚焦于神经符号执行、长上下文推理以及基于 LLM 智能体的安全审计。此外，我们观察到在专业化部署技术方面有显著进展，例如边缘原生语言模型和硬件高效通信协议，这标志着领域正向真实世界、具身智能及资源受限场景下的智能迈进。

---

### 2. 重点论文

#### 🧠 大语言模型
| 论文 | 作者 | 摘要 |
| :--- | :--- | :--- |
| [ER-JEPA](http://arxiv.org/abs/2609.36952v1) | Jingnan Pu 等 | 将经验回放（Experience Replay）引入联合嵌入预测架构（JEPA），以改进抽象语义学习。这解决了标准 Token 级生成在捕捉复杂世界知识方面的局限性。 |
| [Controlled Decoding Attacks](http://arxiv.org/abs/2609.36956v1) | Jesson Wang 等 | 证明了通过操纵生成过程中的下一个 Token 概率，可以绕过黑盒 LLM 的安全性。这凸显了仅提供输出文本而无法访问底层 Logits 的模型所面临的关键漏洞。 |
| [STAR-GRPO](http://arxiv.org/abs/2609.36900v1) | Wan Tian 等 | 提出了规范锚定（Canonical Anchoring）以防止组相对优化中的奖励作弊（Reward Hacking）。通过减轻模型利用脆弱代理目标（Proxy Objectives）的倾向，增强了训练稳定性。 |

#### 🤖 智能体与推理
| 论文 | 作者 | 摘要 |
| :--- | :--- | :--- |
| [Neuro-Symbolic Computer Use](http://arxiv.org/abs/2609.36927v1) | Hyewon Suh 等 | 针对循环性计算机任务引入了一种神经符号框架，以避免代价高昂且不可靠的重规划。它通过学习可重用的策略实现了高效、可靠的执行。 |
| [PrecogUI](http://arxiv.org/abs/2609.36923v1) | Bin Kang 等 | 为 GUI 智能体开发了一种前认知架构，利用仿真来处理长跨度动态任务。与传统的反应式智能体相比，这种主动式方法显著减少了连锁故障。 |
| [CoEM](http://arxiv.org/abs/2609.36935v1) | Jingguang Li 等 | 引入“证据提交内存（Commit-on-Evidence Memory）”以在超长上下文中维持推理性能。它解决了 LLM 中典型的基于分块处理（Chunk-based processing）时的性能退化问题。 |

#### 🔧 方法与框架
| 论文 | 作者 | 摘要 |
| :--- | :--- | :--- |
| [VStress](http://arxiv.org/abs/2609.36958v1) | Miaobo Hu 等 | 提出了一种针对重复验证器调用的相关性感知审计策略，以优化预算分配。它确保仅查询提供条件边缘信息的验证器，从而提高了计算效率。 |
| [Purlin](http://arxiv.org/abs/2609.36954v1) | Osayamen Jonathan Aimuyo 等 | 在分布式推理的集合通信中将编排与数据路径解耦。这种分离使得通信协议能够独立于特定硬件或工作负载进行演进。 |

#### 📊 应用
| 论文 | 作者 | 摘要 |
| :--- | :--- | :--- |
| [VLALight](http://arxiv.org/abs/2609.36934v1) | Pan Zhang 等 | 实现了一种用于交通信号控制的视觉-语言-动作（Vision-Language-Action）模型，利用视觉交通观测进行决策。它超越了人工设计的状态表示，实现了更具自适应性的城市交通管理。 |
| [IronLLM](http://arxiv.org/abs/2609.36860v1) | Changdi Yang 等 | 提供了一个 6.54 亿参数的模型，通过共享 KV 的多 Token 预测实现端侧推理优化。该模型旨在为资源受限的具身机器人提供实时智能。 |

---

### 3. 研究趋势信号
该领域正从通用 LLM 规模化转向**智能体生命周期的优化**。我们观察到两个主要向量：**策略稳定性与效率**，研究人员正在攻克“停滞悬崖（Staleness Cliff，即强化学习中采样分布偏离当前策略更新的节点）”，并开发复杂的内存重用方法（如 KV Cache 压缩、神经符号执行）。

与此同时，**安全关键型审计**也在激增。不仅是事后测试，像 *VStress* 和 *SKILLLITE* 这样的新框架正专注于构建“可审计”的智能体路径。视觉-语言模型向物理领域（交通、空中操纵、GUI 控制）的整合确认了“具身（Embodiment）”不再仅仅是机器人领域的小众方向，而是语言模型架构面临的核心挑战。最后，针对*黑盒攻击*和*基于梯度的越狱检测*的关注表明，随着模型日益融入关键基础设施，重点已从“让模型更聪明”转变为“让模型交互可观察且可控”。

---

### 4. 深度阅读推荐

1. **[IronLLM: Forging Compact Edge-Native Language Models...](http://arxiv.org/abs/2609.36860v1)**：理解“小语言模型（SLMs）”当前前沿的必备资料，展示了如何利用多 Token 预测技术绕过边缘设备的内存瓶颈。
2. **[Neuro-Symbolic Computer Use: Learning Reusable Policies...](http://arxiv.org/abs/2609.36927v1)**：这是推动 AI 智能体从一次性任务转向持久、循环工作流的突破性论文，弥合了灵活的 LLM 推理与刚性符号执行之间的鸿沟。
3. **[Cool the Sampler, Not the Learner: Sampling Temperature Moves the Staleness Cliff...](http://arxiv.org/abs/2609.36953v1)**：RLHF/GRPO 从业者的必读之作，它简洁地从实证角度解释了 RL 性能在生产环境中崩溃的原因，并提供了一个简单、可操作的调优手段。

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*