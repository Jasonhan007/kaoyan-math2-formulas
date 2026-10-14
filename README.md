# 考研数学二公式大全

**在线访问**：https://jasonhan007.github.io/kaoyan-math2-formulas-v2/ · **仓库**：https://github.com/Jasonhan007/kaoyan-math2-formulas-v2 （旧地址 https://jasonhan007.github.io/kaoyan-math2-formulas/ 仍可用）

覆盖**高等数学**与**线性代数**的公式速查网页，共 **205 条**公式。采用**多页结构**：首页为章节目录，每个小节独立一页，另有收藏页，避免单页过长。每条公式包含名称、LaTeX、成立条件与易错提醒；支持搜索、收藏、复制 LaTeX / `$$` 与源码查看。界面参考 Apple iOS 风格（玻璃拟态卡片、吸顶栏），已按 iPhone 18 Pro 逻辑分辨率（402×874）适配，并提供桌面端双列布局。

## 快速开始

```powershell
# 在项目根目录执行
python -m http.server 8123 --bind 127.0.0.1
# 浏览器访问 http://127.0.0.1:8123/
```

直接双击 `index.html` 也可使用（剪贴板在 `http://127.0.0.1` 下体验最好）。

## 页面结构（多页路由）

| 路由 | 页面 | 内容 |
| --- | --- | --- |
| `#/` | 首页 | 统计 + 全局搜索 + 我的收藏入口 + 13 个小节目录 |
| `#/sec/<小节id>` | 小节页 | 该节全部公式（6～30 条/页）、页内搜索、仅看收藏、上一节/下一节 |
| `#/fav` | 收藏页 | 所有收藏的公式（标注所属章节） |

深链示例：`#/sec/gs-dif?f=gs-dif-27` 直接定位并高亮某条公式。

小节 id：`gs-fun` 函数 · `gs-lim` 极限与连续 · `gs-dif` 一元微分 · `gs-int` 一元积分 · `gs-mvd` 多元微分 · `gs-dbl` 二重积分 · `gs-ode` 微分方程 · `xd-det` 行列式 · `xd-mat` 矩阵 · `xd-vec` 向量 · `xd-eq` 线性方程组 · `xd-eig` 特征值 · `xd-quad` 二次型

## 目录结构

```
kaoyan-math2-formulas/
├── index.html              # 页面壳（路由视图容器）
├── css/styles.css          # 全部样式（固定浅色 iOS 风格）
├── js/data-gaoshu.js       # 高等数学公式数据（129 条）
├── js/data-xiandai.js      # 线性代数公式数据（76 条）
├── js/app.js               # 路由 / 渲染 / 搜索 / 收藏 / 复制
├── vendor/katex/katex/     # KaTeX 0.16.11（本地，无需联网）
├── scripts/validate.js     # 公式 LaTeX 严格校验（Node）
├── scripts/check-strings.js / fix-strings.js   # 数据文件字符串辅助工具
├── test/e2e-test.js        # Playwright 端到端测试（30 项断言）
└── test/shot-*.png         # 测试截图
```

**数据与样式分离**：修改或扩充公式只需编辑 `js/data-gaoshu.js` / `js/data-xiandai.js`（字段说明见文件头注释：`id / sec / name / tex / cond / warn / tags / flag`）。含 LaTeX 的字符串请一律用 `` String.raw`...` `` 包裹。

## 功能

- 首页全局搜索：匹配名称、标签、LaTeX、条件/易错与章节，结果显示列表，点击直达公式并高亮
- 小节页内搜索：过滤当前页公式，命中高亮
- 收藏：卡片星标，`localStorage` 持久化；首页入口 + 独立收藏页；小节页支持"仅收藏"
- 复制：纯 LaTeX 或 `$$...$$`，带 Toast；源码展开查看
- 导航：返回键、上一节/下一节、深链定位
- 长公式横向滚动，矩阵/多行 `aligned` 不截断
- 固定浅色主题（已按要求移除深浅色切换）

## 考试范围与内容依据

**范围（数学二）**：高等数学（函数、极限与连续、一元微分、一元积分、多元微分、二重积分、微分方程）+ 线性代数（行列式、矩阵、向量、线性方程组、特征值与特征向量、二次型）。

**明确不含**：无穷级数、三重积分、曲线/曲面积分、空间解析几何、方向导数与梯度、概率统计。

**依据来源**：

1. 教育部教育考试院《全国硕士研究生招生考试数学考试大纲》（数二）
2. 大纲结构核对：[2025 考研数学（二）考试大纲原文（中公教育转载）](https://www.offcn.com/kaoyan/2024/0923/273451.html)
3. 公式细节：同济《高等数学》（第七版）、《线性代数》（第六版）及通行辅导讲义

> 请以报考当年官方大纲为最终依据。

## 待核验条目（共 3 条，页面已标 ⚠）

| 编号 | 内容 | 说明 |
| --- | --- | --- |
| `gs-int-30` | 变力做功 $W=\int_a^b F(x)\,dx$ | 定积分"简单物理应用"范围各年表述略有出入 |
| `gs-dbl-10` | 二重积分求质量与形心 | 几何应用（体积）确定考；形心建议以大纲为准 |
| `gs-ode-7` | 全微分方程 | 教材常见、大纲未逐字点名，低频考点 |

## 数学正确性核验

1. 205 条公式按教材标准结论逐条整理，条件与易错写入 `cond` / `warn`。
2. `node scripts/validate.js js/data-gaoshu.js js/data-xiandai.js`
   → 展示公式 205/205、行内公式 569/569 全部通过 KaTeX 严格解析。
3. Playwright 端到端（402×874）：**30/30 通过**，覆盖首页目录、全局搜索跳转定位、小节页过滤/收藏/复制/源码、上一节下一节、返回、收藏页增删、深链、无横向溢出、吸顶、无 JS/控制台错误。截图见 `test/shot-mobile-home.png`、`shot-mobile-section.png`、`shot-fav.png`、`shot-desktop.png`。
4. 复跑：启动 8123 端口本地服务器后 `node test/e2e-test.js`（需 `playwright-core` + 系统 Edge）。

## 已知限制

- 收录以高频核心结论为原则，能力型要求（如"建立函数关系"）无法用单条公式覆盖。
- 行内公式过长时条件/易错行可横向滑动。

## 许可与用途

KaTeX 遵循 MIT 许可。公式内容为教学整理，供个人备考复习使用。
