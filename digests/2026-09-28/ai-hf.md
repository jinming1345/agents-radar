# Hugging Face 热门模型周报 2026-09-28

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-09-28 01:10 UTC

---

### Hugging Face 热门模型摘要 (2026-09-28)

#### 1. 今日亮点
AI 生态系统目前由 **Qwen** 架构主导，该架构已成为高级多模态视觉模型和高效图像生成工作流的骨干。我们观察到一种显著的“GGUF 优先”发布趋势，即由社区驱动的量化技术使得 *Qwen3.8-27B* 等重型模型能够在消费级硬件上运行。此外，正如 *Laya* 系列和 *GLiNER* 衍生模型的高活跃度所证明的那样，业界正转向专门的决策和分类模型。

---

#### 2. 热门模型

##### 🧠 语言模型 (LLMs)
| 模型 | 作者 | 点赞数 | 下载量 | 摘要 |
| :--- | :--- | ---: | ---: | :--- |
| [Xing4.0-29B-A4B](https://huggingface.co/XingChen-AGI/Xing4.0-29B-A4B) | XingChen-AGI | 1,782 | 45,028 | 一款针对对话式 AI 优化的 29B 参数模型。因其在强大的推理能力与易于实现的推理需求之间取得了平衡而备受关注。 |
| [Hemmingway-1](https://huggingface.co/Altworld/Hemmingway-1) | Altworld | 738 | 5,904 | 该模型利用 Qwen3.8 文本架构实现高保真创意写作。其受欢迎程度源于对叙事细微差别和结构化散文的专注。 |
| [AliceAI-Foundation-80B-A3B-Base](https://huggingface.co/yandex/AliceAI-Foundation-80B-A3B-Base) | yandex | 349 | 3,456 | Yandex 推出的 80B 参数基座模型。对于寻求多样化、可进行自定义编码训练的基座权重的研究人员来说，该模型正获得越来越多的关注。 |

##### 🎨 多模态与生成
| 模型 | 作者 | 点赞数 | 下载量 | 摘要 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 16,427 | 6,727,629 | 一款强大的图文到文本模型，目前处于社区偏好的领先地位。其巨大的下载量凸显了它作为多模态推理行业标准的地位。 |
| [LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 5,332 | 1,601,089 | 一款尖端的图生视频模型，可实现复杂的时序一致性。由于创意产业中 AI 视频合成工具的快速增长，该模型热度极高。 |
| [DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 3,811 | 651,078 | 一款针对高速推理优化的多模态闪电模型。因能在生产环境中提供快速、准确的图文理解而备受推崇。 |

##### 🔧 专用模型
| 模型 | 作者 | 点赞数 | 下载量 | 摘要 |
| :--- | :--- | ---: | ---: | :--- |
| [laya](https://huggingface.co/convaiinnovations/laya) | convaiinnovations | 4,095 | 0 | 一款独特的系统一（System One）分类模型，专为校准决策而设计。它是目前点赞数最高的模型，表明市场对可靠 AI 决策引擎的强烈需求。 |
| [Audio8-ASR-Infinite](https://huggingface.co/Edge0/Audio8-ASR-Infinite) | Edge0 | 1,061 | 19,434 | 一款专为无限流音频转录而构建的专用 ASR 模型。其热门状态得益于在实时长语音处理任务中的表现。 |
| [GLiNER2.5-Decide](https://huggingface.co/fastino/GLiNER2.5-Decide) | fastino | 208 | 19,757 | GLiNER 架构的进化版，针对特定意图和 Token 分类进行了调优。受到构建自定义实体提取流水线的开发者的青睐。 |

##### 📦 微调与量化版本
| 模型 | 作者 | 点赞数 | 下载量 | 摘要 |
| :--- | :--- | ---: | ---: | :--- |
| [Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) | prism-ml | 2,190 | 3,343,748 | 一款 2-bit 三进制量化模型，在标准硬件上实现了惊人的性能。对于显存受限但仍想运行大参数模型用户而言，这是首选。 |
| [Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 1,778 | 1,608,439 | 该 GGUF 版本针对混合精度部署优化了流行的 Qwen3.8 模型。因其在保持高质量的同时显著降低了内存开销，下载量巨大。 |

---

#### 3. 生态信号
当前的生态系统由“量化革命”定义。基座模型发布（以 Qwen 和 DeepSeek 为首）与社区驱动的使其更易用化的努力之间存在明显差异。我们正看到业界从标准的 4-bit 量化转向更奇特的量化方法，例如 *Bonsai* 系列中发现的 2-bit 三进制量化。

此外，“Qwen-Image”生态系统已成为一种标准化的底层架构，成千上万的用户通过 ComfyUI 与其交互。GGUF 变体的高下载量表明，对于许多开发者而言，本地、离线和边缘部署的使用量目前已超过了基于 API 的使用。尽管专有模型在高端基准测试讨论中占据主导地位，但开源权重生态系统正在积极填补专门化、高性能和高效本地推理的空白，这证明了易用性是 2026 年底 AI 采用的主要驱动力。

---

#### 4. 值得探索
*   **[laya](https://huggingface.co/convaiinnovations/laya)：** 对于任何对“系统一”AI 感兴趣的人来说都值得研究——即从生成式聊天机器人向可靠、经过校准的决策代理的转变。
*   **[LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)：** 对于那些追踪视频生成和时序稳定性方面最新技术进展的人来说，这是一次重要的探索。
*   **[Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf)：** 一个极佳的范例，展示了极限量化技术如何让日常用户硬件也能运行高参数推理模型。

---
*本日报由 [agents-radar](https://github.com/jinming1345/agents-radar) 自动生成。*