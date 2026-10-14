/* =========================================================
 * 考研数学二公式大全 · 高等数学公式数据
 * 数据与页面样式分离：修改/扩充公式只需编辑本文件。
 * 字段说明：
 *   id    唯一编号
 *   sec   所属小节 id（须在章节表中存在）
 *   name  公式名称
 *   tex   LaTeX 展示公式（KaTeX displayMode 渲染）
 *   cond  成立条件（可选，支持 $...$ 行内公式）
 *   warn  易错提醒（可选，支持 $...$ 行内公式）
 *   tags  搜索关键词（可选）
 *   flag  'verify' 表示范围/表述待对照当年官方大纲核验
 * ========================================================= */
(function () {
  const DB = (window.FORMULA_DB = window.FORMULA_DB || { chapters: [], formulas: [] });

  DB.chapters.push({
    id: 'gs',
    title: '高等数学',
    sections: [
      { id: 'gs-fun', title: '函数', hint: '概念、性质与反函数' },
      { id: 'gs-lim', title: '极限与连续', hint: '两大重要极限 · 等价无穷小 · 介值定理' },
      { id: 'gs-dif', title: '一元函数微分学', hint: '中值定理 · 单调极值 · 曲率' },
      { id: 'gs-int', title: '一元函数积分学', hint: '换元分部 · 反常积分 · 定积分应用' },
      { id: 'gs-mvd', title: '多元函数微分学', hint: '偏导全微分 · 隐函数 · 极值' },
      { id: 'gs-dbl', title: '二重积分', hint: '直角/极坐标 · 对称性' },
      { id: 'gs-ode', title: '微分方程', hint: '一阶方程 · 降阶 · 二阶常系数' }
    ]
  });

  DB.formulas.push(
    /* ================= §1 函数 ================= */
    {
      id: 'gs-fun-1', sec: 'gs-fun', name: '反函数一阶导数',
      tex: String.raw`f'(x)=\frac{1}{\varphi'(y)},\quad x=\varphi(y)\ \text{为}\ y=f(x)\ \text{的反函数}`,
      cond: String.raw`设 $y=f(x)$ 在 $x_0$ 的某邻域内连续、严格单调，且 $\varphi'(y_0)\neq 0$；反函数与直接函数图形关于直线 $y=x$ 对称。`,
      warn: String.raw`导数是倒数关系，但自变量不同：$f'(x)=1/\varphi'(y)$ 中右边用 $y=y(x)$ 代入。`,
      tags: ['反函数', '导数']
    },
    {
      id: 'gs-fun-2', sec: 'gs-fun', name: '反函数二阶导数',
      tex: String.raw`f''(x)=-\frac{\varphi''(y)}{[\varphi'(y)]^{3}}`,
      cond: String.raw`$\varphi(y)$ 二阶可导且 $\varphi'(y)\neq 0$。`,
      warn: String.raw`负号与三次方容易漏掉。`,
      tags: ['反函数', '高阶导数']
    },
    {
      id: 'gs-fun-3', sec: 'gs-fun', name: '函数奇偶性的运算',
      tex: String.raw`\begin{aligned}
&\text{奇}\pm\text{奇}=\text{奇},\ \ \text{偶}\pm\text{偶}=\text{偶},\\
&\text{奇}\times\text{奇}=\text{偶},\ \ \text{偶}\times\text{偶}=\text{偶},\ \ \text{奇}\times\text{偶}=\text{奇},\\
&f\ \text{为奇}\Rightarrow f(0)=0\ (\text{若}\ 0\in D_f),\ \ f\ \text{奇}\Rightarrow f'\ \text{偶},\ f\ \text{偶}\Rightarrow f'\ \text{奇}
\end{aligned}`,
      cond: '运算对象均在同一定义域上；奇偶性讨论的前提是定义域关于原点对称。',
      warn: String.raw`奇函数若在 $x=0$ 有定义，则必过原点；奇函数的导函数是偶函数。`,
      tags: ['奇偶性', '单调性', '周期性']
    },
    {
      id: 'gs-fun-4', sec: 'gs-fun', name: '周期函数的定积分性质',
      tex: String.raw`\int_a^{a+T}f(x)\,dx=\int_0^{T}f(x)\,dx,\qquad \int_0^{nT}f(x)\,dx=n\int_0^{T}f(x)\,dx`,
      cond: String.raw`$f(x)$ 以 $T$ 为周期且在相应区间上可积。`,
      warn: String.raw`与区间起点无关，只与长度为一个周期有关；配凑区间端点是常用技巧。`,
      tags: ['周期性', '定积分']
    },
    {
      id: 'gs-fun-5', sec: 'gs-fun', name: '复合函数的定义域',
      tex: String.raw`y=f(g(x)):\quad D=\{x\mid x\in D_g,\ g(x)\in D_f\}`,
      cond: '先由内层函数值域与外层定义域相容确定。',
      warn: '求复合函数定义域时不要漏掉内层函数自身的定义域限制。',
      tags: ['复合函数', '定义域']
    },
    {
      id: 'gs-fun-6', sec: 'gs-fun', name: '幂指函数的一般形式',
      tex: String.raw`y=u(x)^{v(x)}=e^{v(x)\ln u(x)},\qquad u(x)>0`,
      cond: String.raw`$u(x)>0$ 时对数有意义；求导用对数求导法（见一元微分学）。`,
      warn: String.raw`幂指函数既不是单纯幂函数也不是指数函数，不能直接套 $(u^v)'=vu^{v-1}u'$。`,
      tags: ['幂指函数', '对数求导']
    },

    /* ================= §2 极限与连续 ================= */
    {
      id: 'gs-lim-1', sec: 'gs-lim', name: '极限的四则运算法则',
      tex: String.raw`\lim f(x)=A,\ \lim g(x)=B\ \Rightarrow\
\lim[f\pm g]=A\pm B,\ \lim(fg)=AB,\ \lim\frac{f}{g}=\frac{A}{B}\ (B\neq 0)`,
      cond: '各极限必须都存在（商的情形还要求分母极限非零）。',
      warn: String.raw`$\lim f$、$\lim g$ 不存在时四则运算法则失效，需用等价代换、夹逼或拆项。`,
      tags: ['极限', '四则运算']
    },
    {
      id: 'gs-lim-2', sec: 'gs-lim', name: '极限存在的充要条件',
      tex: String.raw`\lim_{x\to x_0}f(x)=A\iff \lim_{x\to x_0^-}f(x)=\lim_{x\to x_0^+}f(x)=A`,
      cond: '讨论分段点、绝对值、取整函数的极限时使用。',
      warn: '两侧极限都存在但不相等时极限不存在（此时是跳跃间断点）。',
      tags: ['左右极限', '极限存在']
    },
    {
      id: 'gs-lim-3', sec: 'gs-lim', name: '第一重要极限',
      tex: String.raw`\lim_{u\to 0}\frac{\sin u}{u}=1`,
      cond: String.raw`整体 $u\to 0$（$u$ 可为任意趋于 0 的表达式）。`,
      warn: String.raw`$u$ 必须整体趋于 0；如 $\sin 2x\sim 2x$（$x\to0$），分子分母要同时替换为同阶形式。`,
      tags: ['重要极限', '三角']
    },
    {
      id: 'gs-lim-4', sec: 'gs-lim', name: '第二重要极限',
      tex: String.raw`\lim_{x\to\infty}\left(1+\frac{1}{x}\right)^{x}=e,\qquad \lim_{u\to 0}(1+u)^{\frac{1}{u}}=e`,
      cond: String.raw`两种形式等价：$1^\infty$ 型未定式专用。`,
      warn: String.raw`底数必须是 $1+\text{无穷小}$，指数必须与该无穷小构成倒数关系，否则先取对数化简。`,
      tags: ['重要极限', 'e']
    },
    {
      id: 'gs-lim-5', sec: 'gs-lim', name: '常用等价无穷小（基本）',
      tex: String.raw`\begin{aligned}
&\sin x\sim x,\ \arcsin x\sim x,\ \tan x\sim x,\ \arctan x\sim x,\\
&\ln(1+x)\sim x,\ e^{x}-1\sim x,\ a^{x}-1\sim x\ln a\ (a>0,a\neq1),\\
&1-\cos x\sim \frac{x^{2}}{2},\ (1+x)^{\alpha}-1\sim \alpha x
\end{aligned}`,
      cond: String.raw`均在 $x\to 0$ 时成立；$(1+x)^\alpha-1\sim\alpha x$ 要求 $1+x>0$。`,
      warn: String.raw`记忆要点：$\sin$ 与 $\tan$ 同阶；$1-\cos$ 是二阶；$\ln(1+x)$、$e^x-1$ 与 $x$ 同阶。`,
      tags: ['等价无穷小', '无穷小比较']
    },
    {
      id: 'gs-lim-6', sec: 'gs-lim', name: '常用等价无穷小（高阶）',
      tex: String.raw`\begin{aligned}
&x-\sin x\sim \frac{x^{3}}{6},\quad \tan x-x\sim \frac{x^{3}}{3},\\
&\arctan x-x\sim -\frac{x^{3}}{3},\quad \ln(1+x)-x\sim -\frac{x^{2}}{2},\\
&e^{x}-1-x\sim \frac{x^{2}}{2},\quad x-\ln(1+x)\sim \frac{x^{2}}{2}
\end{aligned}`,
      cond: String.raw`均在 $x\to 0$ 时成立。`,
      warn: String.raw`分母已是 $x^2$、$x^3$ 阶时要用这一组；注意 $\ln(1+x)-x$ 是负的二阶。`,
      tags: ['等价无穷小', '泰勒', '高阶']
    },
    {
      id: 'gs-lim-7', sec: 'gs-lim', name: '等价无穷小的替换原则',
      tex: String.raw`\lim \frac{f_1\cdot g}{h_1\cdot k}=\lim \frac{f_2\cdot g}{h_2\cdot k}
\quad\text{若}\ f_1\sim f_2,\ h_1\sim h_2`,
      cond: '乘除因子可以整体替换；加减项中替换必须保证相消后精度仍足够。',
      warn: String.raw`经典反例：$\lim_{x\to0}\dfrac{\tan x-\sin x}{x^3}=\dfrac12$，若把 $\tan x$、$\sin x$ 同时换成 $x$ 会得 0。加减法用泰勒展开最稳妥。`,
      tags: ['等价无穷小', '易错']
    },
    {
      id: 'gs-lim-8', sec: 'gs-lim', name: '无穷小的运算性质',
      tex: String.raw`\begin{aligned}
&\text{有限个无穷小之和、积仍为无穷小};\\
&\text{有界量}\times\text{无穷小}=\text{无穷小};\\
&\text{无穷小}\times\text{无穷小}=\text{更高阶无穷小}
\end{aligned}`,
      cond: '同一极限过程中。',
      warn: '“有界×无穷小”常用于处理含振荡因子的极限，不能直接套用四则运算法则。',
      tags: ['无穷小', '有界']
    },
    {
      id: 'gs-lim-9', sec: 'gs-lim', name: '洛必达法则',
      tex: String.raw`\lim\frac{f(x)}{g(x)}\overset{\frac{0}{0}\text{或}\frac{\infty}{\infty}}{=}\lim\frac{f'(x)}{g'(x)}
\quad(\text{若右端极限存在或为}\ \infty)`,
      cond: String.raw`① $\lim f$、$\lim g$ 为 $\frac00$ 或 $\frac\infty\infty$ 型；② $f',g'$ 在去心邻域内存在；③ 右端极限存在（或为 $\infty$）。`,
      warn: String.raw`不是 $\frac00$、$\frac\infty\infty$ 型不能直接用；用完要检查右端极限是否真的存在。`,
      tags: ['洛必达', '未定式']
    },
    {
      id: 'gs-lim-10', sec: 'gs-lim', name: '常用极限结论（速查）',
      tex: String.raw`\begin{aligned}
&\lim_{x\to0}\frac{(1+x)^{\alpha}-1}{x}=\alpha;\qquad
\lim_{n\to\infty}\sqrt[n]{a}=1\ (a>0);\qquad \lim_{n\to\infty}\sqrt[n]{n}=1;\\
&\lim_{n\to\infty}\frac{a^{n}}{n!}=0\ (a>0);\qquad
\lim_{x\to+\infty}\frac{x^{k}}{e^{\lambda x}}=0\ (k>0,\lambda>0);\\
&\lim_{x\to0^{+}}x^{k}\ln x=0\ (k>0);\qquad
\lim_{x\to0}\frac{\ln(1+x)}{x}=1,\ \lim_{x\to0}\frac{e^{x}-1}{x}=1
\end{aligned}`,
      tags: ['极限', '常用结论']
    },
    {
      id: 'gs-lim-11', sec: 'gs-lim', name: '泰勒公式（皮亚诺余项）',
      tex: String.raw`f(x)=f(x_0)+f'(x_0)(x-x_0)+\cdots+\frac{f^{(n)}(x_0)}{n!}(x-x_0)^{n}+o\!\left((x-x_0)^{n}\right)`,
      cond: String.raw`$f(x)$ 在 $x_0$ 处有 $n$ 阶导数；求极限时展到与分母同阶为止。`,
      warn: String.raw`展开阶数不足会算错极限；余项写 $o((x-x_0)^n)$。`,
      tags: ['泰勒', '展开']
    },
    {
      id: 'gs-lim-12', sec: 'gs-lim', name: '常用麦克劳林展开（一）',
      tex: String.raw`\begin{aligned}
e^{x}&=1+x+\frac{x^{2}}{2!}+\frac{x^{3}}{3!}+o(x^{3});\\
\sin x&=x-\frac{x^{3}}{3!}+\frac{x^{5}}{5!}+o(x^{5});\\
\cos x&=1-\frac{x^{2}}{2!}+\frac{x^{4}}{4!}+o(x^{4});\\
\arctan x&=x-\frac{x^{3}}{3}+o(x^{3})
\end{aligned}`,
      cond: String.raw`均在 $x\to 0$ 时成立。`,
      tags: ['泰勒', '展开', '麦克劳林']
    },
    {
      id: 'gs-lim-13', sec: 'gs-lim', name: '常用麦克劳林展开（二）',
      tex: String.raw`\begin{aligned}
\ln(1+x)&=x-\frac{x^{2}}{2}+\frac{x^{3}}{3}+o(x^{3});\\
(1+x)^{\alpha}&=1+\alpha x+\frac{\alpha(\alpha-1)}{2!}x^{2}+o(x^{2});\\
\tan x&=x+\frac{x^{3}}{3}+o(x^{3})
\end{aligned}`,
      cond: String.raw`均在 $x\to 0$ 时成立；$\ln(1+x)$ 要求 $x>-1$。`,
      tags: ['泰勒', '展开', '麦克劳林']
    },
    {
      id: 'gs-lim-14', sec: 'gs-lim', name: '夹逼准则',
      tex: String.raw`g(x)\le f(x)\le h(x),\quad \lim g(x)=\lim h(x)=A\ \Rightarrow\ \lim f(x)=A`,
      cond: String.raw`在 $x_0$ 的某去心邻域（或 $n\to\infty$ 的某项之后）成立。`,
      warn: '数列型常用“最大项、最小项”放缩。',
      tags: ['夹逼', '准则']
    },
    {
      id: 'gs-lim-15', sec: 'gs-lim', name: '单调有界准则',
      tex: String.raw`\text{数列}\ \{x_n\}\ \text{单调有界}\ \Rightarrow\ \{x_n\}\ \text{收敛}`,
      cond: '递推数列：先证单调（差法、商法或函数单调性），再证有界。',
      warn: '该准则只能证明存在；求极限还需对递推式两边取极限解方程。',
      tags: ['单调有界', '准则', '递推数列']
    },
    {
      id: 'gs-lim-16', sec: 'gs-lim', name: '无穷小的比较',
      tex: String.raw`\lim\frac{\beta}{\alpha}=
\begin{cases}
0, & \beta\ \text{是}\ \alpha\ \text{的高阶无穷小}\ (\beta=o(\alpha));\\
c\neq0, & \beta\ \text{与}\ \alpha\ \text{同阶};\\
1, & \beta\ \text{与}\ \alpha\ \text{等价}\ (\beta\sim\alpha)
\end{cases}`,
      cond: String.raw`同一极限过程中 $\alpha\to0$ 且 $\alpha\neq0$。`,
      tags: ['无穷小比较', '高阶', '等价']
    },
    {
      id: 'gs-lim-17', sec: 'gs-lim', name: '极限与无穷小的关系',
      tex: String.raw`\lim f(x)=A\iff f(x)=A+\alpha(x),\quad \alpha(x)\to0`,
      cond: String.raw`同一极限过程；常用于“已知极限求 $f$ 中待定参数”。`,
      tags: ['极限', '无穷小']
    },
    {
      id: 'gs-lim-18', sec: 'gs-lim', name: '函数连续的定义',
      tex: String.raw`\lim_{x\to x_0}f(x)=f(x_0)
\iff \lim_{x\to x_0^-}f(x)=\lim_{x\to x_0^+}f(x)=f(x_0)`,
      cond: String.raw`三要素：$f(x_0)$ 有定义、极限存在、两者相等。`,
      warn: '缺一即间断；分段函数在分界点处必须用左右极限与函数值比较。',
      tags: ['连续', '间断点']
    },
    {
      id: 'gs-lim-19', sec: 'gs-lim', name: '间断点的分类',
      tex: String.raw`\begin{aligned}
&\text{第一类：左右极限均存在}\Rightarrow
\begin{cases}
\text{可去：极限存在且等于 }f(x_0)\ \text{或 }f(x_0)\ \text{无定义}\\
\text{跳跃：}\ f(x_0^+)\neq f(x_0^-)
\end{cases}\\
&\text{第二类：左右极限至少一个不存在（无穷型、振荡型等）}
\end{aligned}`,
      cond: String.raw`判定时先分别求 $x_0$ 处左右极限。`,
      warn: String.raw`$x\to x_0$ 处极限为 $\infty$ 属于第二类间断点（无穷间断点），不是第一类。`,
      tags: ['间断点', '跳跃', '可去']
    },
    {
      id: 'gs-lim-20', sec: 'gs-lim', name: '初等函数的连续性',
      tex: String.raw`\text{一切初等函数在其}\ \textbf{定义区间}\ \text{内连续}`,
      cond: '“定义区间”是包含在定义域内的区间。',
      warn: String.raw`不是“定义域内”连续：如 $f(x)=\dfrac1x$ 在 $x=0$ 无定义，只在 $(-\infty,0)$、$(0,+\infty)$ 内连续。`,
      tags: ['连续', '初等函数']
    },
    {
      id: 'gs-lim-21', sec: 'gs-lim', name: '复合函数的极限',
      tex: String.raw`\lim_{x\to x_0}g(x)=u_0,\quad f\ \text{在}\ u_0\ \text{连续}\ \Rightarrow\ \lim_{x\to x_0}f(g(x))=f(u_0)`,
      cond: String.raw`$f$ 连续是关键条件（可把极限“穿透”进去）。`,
      warn: String.raw`$f$ 不连续时不能交换极限与函数运算的顺序。`,
      tags: ['连续', '复合', '极限']
    },
    {
      id: 'gs-lim-22', sec: 'gs-lim', name: '闭区间上连续函数的性质',
      tex: String.raw`\begin{aligned}
&\text{最值定理：}\ f\in C[a,b]\Rightarrow \exists\,\xi_1,\xi_2:\ f(\xi_1)=\min,\ f(\xi_2)=\max;\\
&\text{介值定理：}\ f\in C[a,b],\ \text{介于}\ f(a),f(b)\ \text{之间的任一数}\ \eta\Rightarrow\exists\,\xi:\ f(\xi)=\eta;\\
&\text{零点定理：}\ f\in C[a,b],\ f(a)f(b)<0\Rightarrow\exists\,\xi\in(a,b):\ f(\xi)=0
\end{aligned}`,
      cond: '必须在闭区间上连续（端点处也连续）。',
      warn: String.raw`零点定理只保证 $(a,b)$ 内至少一个零点，不唯一；开区间上连续不保证取到最值。`,
      tags: ['介值定理', '零点定理', '最值']
    },
    {
      id: 'gs-lim-23', sec: 'gs-lim', name: '连续函数的四则运算',
      tex: String.raw`f,g\ \text{在}\ x_0\ \text{连续}\Rightarrow f\pm g,\ fg,\ \frac{f}{g}\ (g(x_0)\neq0)\ \text{在}\ x_0\ \text{连续}`,
      tags: ['连续', '四则运算']
    },

    /* ================= §3 一元函数微分学 ================= */
    {
      id: 'gs-dif-1', sec: 'gs-dif', name: '导数的定义',
      tex: String.raw`f'(x_0)=\lim_{\Delta x\to0}\frac{f(x_0+\Delta x)-f(x_0)}{\Delta x}
=\lim_{x\to x_0}\frac{f(x)-f(x_0)}{x-x_0}`,
      cond: String.raw`该极限存在才称 $f$ 在 $x_0$ 可导；定义式常用于分段点、抽象函数求导。`,
      warn: '分段函数分界点必须用定义求导，不能直接套求导公式。',
      tags: ['导数', '定义']
    },
    {
      id: 'gs-dif-2', sec: 'gs-dif', name: '单侧导数与可导',
      tex: String.raw`f'(x_0)\ \text{存在}\iff f'_{-}(x_0)=f'_{+}(x_0)`,
      cond: '左右导数分别按定义计算。',
      warn: '绝对值函数、取整函数在转折点处常用左右导数讨论。',
      tags: ['单侧导数', '可导']
    },
    {
      id: 'gs-dif-3', sec: 'gs-dif', name: '可导与连续的关系',
      tex: String.raw`\text{可导}\Rightarrow\text{连续},\qquad \text{连续}\nRightarrow\text{可导}`,
      cond: '同一点处。',
      warn: String.raw`逆命题不成立：$y=|x|$ 在 $x=0$ 连续但不可导；“可导必连续，连续不一定可导”。`,
      tags: ['可导', '连续', '易错']
    },
    {
      id: 'gs-dif-4', sec: 'gs-dif', name: '基本导数公式（幂、指、对）',
      tex: String.raw`\begin{aligned}
&(x^{\mu})'=\mu x^{\mu-1};\qquad (e^{x})'=e^{x};\qquad (a^{x})'=a^{x}\ln a;\\
&(\ln x)'=\frac1x;\qquad (\log_{a}x)'=\frac{1}{x\ln a};\qquad (\sqrt{x})'=\frac{1}{2\sqrt{x}}
\end{aligned}`,
      cond: String.raw`$\mu$ 为常数，$a>0$ 且 $a\neq1$，对数真数为正。`,
      warn: String.raw`$\mu$ 为负数、分数时同样适用 $(x^\mu)'=\mu x^{\mu-1}$，如 $(1/x)'=-1/x^2$。`,
      tags: ['导数公式', '幂函数']
    },
    {
      id: 'gs-dif-5', sec: 'gs-dif', name: '基本导数公式（三角、反三角）',
      tex: String.raw`\begin{aligned}
&(\sin x)'=\cos x;\quad (\cos x)'=-\sin x;\quad (\tan x)'=\sec^{2}x;\quad (\cot x)'=-\csc^{2}x;\\
&(\sec x)'=\sec x\tan x;\quad (\csc x)'=-\csc x\cot x;\\
&(\arcsin x)'=\frac{1}{\sqrt{1-x^{2}}};\quad (\arccos x)'=-\frac{1}{\sqrt{1-x^{2}}};\quad (\arctan x)'=\frac{1}{1+x^{2}}
\end{aligned}`,
      cond: String.raw`$\arcsin x,\arccos x$ 要求 $|x|<1$（端点处为单侧导数）。`,
      tags: ['导数公式', '三角', '反三角']
    },
    {
      id: 'gs-dif-6', sec: 'gs-dif', name: '导数的四则运算法则',
      tex: String.raw`\begin{aligned}
&(f\pm g)'=f'\pm g';\qquad (Cf)'=Cf';\\
&(fg)'=f'g+fg';\qquad \left(\frac{f}{g}\right)'=\frac{f'g-fg'}{g^{2}}
\end{aligned}`,
      cond: String.raw`$f,g$ 在同一点可导；商式要求 $g\neq0$。`,
      warn: String.raw`乘积求导是“求导一项+不求导一项”之和，$(fg)'\neq f'g'$。`,
      tags: ['四则运算', '乘积求导']
    },
    {
      id: 'gs-dif-7', sec: 'gs-dif', name: '复合函数求导（链式法则）',
      tex: String.raw`\frac{dy}{dx}=\frac{dy}{du}\cdot\frac{du}{dx}=f'(u)\,\varphi'(x),\qquad y=f(u),\ u=\varphi(x)`,
      cond: '内外层函数在相应点可导。',
      warn: '对中间变量求导后必须再乘内层导数；多层复合逐层相乘，漏乘是高频错误。',
      tags: ['链式法则', '复合函数']
    },
    {
      id: 'gs-dif-8', sec: 'gs-dif', name: '隐函数求导',
      tex: String.raw`F(x,y)=0\ \Rightarrow\ \frac{dy}{dx}=-\frac{F_x(x,y)}{F_y(x,y)}
\quad(F_y\neq0)`,
      cond: String.raw`$F$ 具有连续偏导数且 $F_y\neq0$；或对方程两边直接关于 $x$ 求导，把 $y$ 视为 $x$ 的函数。`,
      warn: String.raw`结果中允许保留 $x,y$；求 $y'(x_0)$ 时先由方程解出对应的 $y_0$ 再代入。`,
      tags: ['隐函数', '求导']
    },
    {
      id: 'gs-dif-9', sec: 'gs-dif', name: '参数方程求导',
      tex: String.raw`\begin{aligned}
&\frac{dy}{dx}=\frac{\dot y(t)}{\dot x(t)};\\
&\frac{d^{2}y}{dx^{2}}=\frac{\dot x(t)\,\ddot y(t)-\dot y(t)\,\ddot x(t)}{[\dot x(t)]^{3}}
\end{aligned}`,
      cond: String.raw`$x=x(t),y=y(t)$ 可导且 $\dot x(t)\neq0$。`,
      warn: String.raw`二阶导不是 $\ddot y/\ddot x$；分母是 $\dot x^{3}$，分子符号容易写反。`,
      tags: ['参数方程', '二阶导']
    },
    {
      id: 'gs-dif-10', sec: 'gs-dif', name: '对数求导法（幂指函数）',
      tex: String.raw`y=u^{v}\ \Rightarrow\ y'=y\left(\frac{v'u}{u}+v\,\frac{u'}{u}\right)
=u^{v}\left(v'\ln u+\frac{vu'}{u}\right)`,
      cond: String.raw`$u(x)>0$；也适用于多个因子连乘连除的求导。`,
      warn: '幂指函数不能只按幂函数或只按指数函数求导。',
      tags: ['对数求导', '幂指函数']
    },
    {
      id: 'gs-dif-11', sec: 'gs-dif', name: '高阶导数——莱布尼茨公式',
      tex: String.raw`(uv)^{(n)}=\sum_{k=0}^{n}\binom{n}{k}u^{(n-k)}v^{(k)}`,
      cond: String.raw`$u,v$ 均 $n$ 阶可导；适用于“多项式×一般函数”型（多项式部分若干阶后为 0）。`,
      tags: ['高阶导数', '莱布尼茨']
    },
    {
      id: 'gs-dif-12', sec: 'gs-dif', name: '常用高阶导数公式',
      tex: String.raw`\begin{aligned}
&(\sin x)^{(n)}=\sin\!\left(x+\frac{n\pi}{2}\right);\qquad
(\cos x)^{(n)}=\cos\!\left(x+\frac{n\pi}{2}\right);\\
&(e^{ax})^{(n)}=a^{n}e^{ax};\qquad
[\ln(1+x)]^{(n)}=\frac{(-1)^{n-1}(n-1)!}{(1+x)^{n}};\\
&\left(\frac{1}{x+a}\right)^{(n)}=\frac{(-1)^{n}\,n!}{(x+a)^{n+1}}
\end{aligned}`,
      tags: ['高阶导数', 'n阶导']
    },
    {
      id: 'gs-dif-13', sec: 'gs-dif', name: '微分的定义',
      tex: String.raw`dy=f'(x_0)\,dx,\qquad \Delta y=f'(x_0)\Delta x+o(\Delta x)`,
      cond: String.raw`$f$ 在 $x_0$ 可导与可微等价；一元函数“可导、可微、微分存在”三者等价。`,
      warn: String.raw`微分是线性主部，$\Delta y\approx dy$ 仅当 $|\Delta x|$ 较小时误差才小。`,
      tags: ['微分', '可微']
    },
    {
      id: 'gs-dif-14', sec: 'gs-dif', name: '一阶微分形式的不变性',
      tex: String.raw`dy=f'(u)\,du\quad\text{（}\ u\ \text{无论为自变量还是中间变量，形式相同）}`,
      cond: '复合函数微分；可用于不区分中间变量的微分运算与隐函数微分。',
      tags: ['微分形式不变性']
    },
    {
      id: 'gs-dif-15', sec: 'gs-dif', name: '微分近似计算',
      tex: String.raw`f(x_0+\Delta x)\approx f(x_0)+f'(x_0)\Delta x,\qquad \Delta y\approx dy`,
      cond: String.raw`$|\Delta x|$ 充分小且 $f'(x_0)$ 存在。`,
      tags: ['近似计算', '微分']
    },
    {
      id: 'gs-dif-16', sec: 'gs-dif', name: '罗尔定理',
      tex: String.raw`f\in C[a,b],\ f\ \text{在}\ (a,b)\ \text{可导},\ f(a)=f(b)\ \Rightarrow\ \exists\,\xi\in(a,b):f'(\xi)=0`,
      cond: '三个条件缺一不可（闭区间连续、开区间可导、端点值相等）。',
      warn: '证明题中常先构造辅助函数，使它满足罗尔定理条件。',
      tags: ['罗尔定理', '中值定理']
    },
    {
      id: 'gs-dif-17', sec: 'gs-dif', name: '拉格朗日中值定理',
      tex: String.raw`f\in C[a,b],\ f\ \text{在}\ (a,b)\ \text{可导}\ \Rightarrow\ \exists\,\xi\in(a,b):
f(b)-f(a)=f'(\xi)(b-a)`,
      cond: '闭区间连续、开区间可导。',
      warn: String.raw`推论：若 $f'\equiv0$ 于某区间，则 $f\equiv C$（常数）。“导数为 0”与“极值点”不是一回事。`,
      tags: ['拉格朗日', '中值定理']
    },
    {
      id: 'gs-dif-18', sec: 'gs-dif', name: '柯西中值定理',
      tex: String.raw`\frac{f(b)-f(a)}{g(b)-g(a)}=\frac{f'(\xi)}{g'(\xi)},\qquad \xi\in(a,b)`,
      cond: String.raw`$f,g$ 在 $[a,b]$ 连续、$(a,b)$ 可导，且 $g'\neq0$、$g(b)\neq g(a)$。`,
      warn: '洛必达法则可由柯西中值定理证明；分母的条件不能省。',
      tags: ['柯西中值定理']
    },
    {
      id: 'gs-dif-19', sec: 'gs-dif', name: '泰勒中值定理（拉格朗日余项）',
      tex: String.raw`f(x)=\sum_{k=0}^{n}\frac{f^{(k)}(x_0)}{k!}(x-x_0)^{k}
+\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-x_0)^{n+1},\quad \xi\ \text{介于}\ x_0,x\ \text{之间}`,
      cond: String.raw`$f$ 在 $x_0$ 处有 $n+1$ 阶导数；用于证明不等式与估计误差。`,
      tags: ['泰勒定理', '中值定理', '余项']
    },
    {
      id: 'gs-dif-20', sec: 'gs-dif', name: '函数单调性的判定',
      tex: String.raw`f'(x)>0\ \Rightarrow\ f\ \text{单调增加};\qquad f'(x)<0\ \Rightarrow\ f\ \text{单调减少}
\quad(x\in I)`,
      cond: String.raw`区间内导数恒正/恒负；$f'(x_0)=0$ 的孤立点不影响单调性（如 $y=x^3$）。`,
      warn: String.raw`使 $f'(x)=0$ 的点与不可导点是可能的分界点，列表讨论时不要遗漏。`,
      tags: ['单调性', '导数应用']
    },
    {
      id: 'gs-dif-21', sec: 'gs-dif', name: '极值的第一充分条件',
      tex: String.raw`f'(x)\ \text{在}\ x_0\ \text{两侧变号}\Rightarrow x_0\ \text{为极值点}:
\begin{cases}
+\to-: \text{极大}\\
-\to+: \text{极小}
\end{cases}`,
      cond: String.raw`$f$ 在 $x_0$ 连续，$f'(x)$ 在 $x_0$ 两侧存在且变号。`,
      warn: String.raw`仅 $f'(x_0)=0$ 不足以断定极值（$y=x^3$ 在 0 处），必须看两侧符号。`,
      tags: ['极值', '第一充分条件']
    },
    {
      id: 'gs-dif-22', sec: 'gs-dif', name: '极值的第二充分条件',
      tex: String.raw`f'(x_0)=0,\ f''(x_0)\neq0\Rightarrow
\begin{cases}
f''(x_0)>0: x_0\ \text{为极小值点}\\
f''(x_0)<0: x_0\ \text{为极大值点}
\end{cases}`,
      cond: String.raw`$f''$ 在 $x_0$ 处存在。`,
      warn: String.raw`$f''(x_0)=0$ 时该法失效，改用第一充分条件或定义判定。`,
      tags: ['极值', '第二充分条件']
    },
    {
      id: 'gs-dif-23', sec: 'gs-dif', name: '闭区间上最值的求法',
      tex: String.raw`\max/\min_{[a,b]}f=\max\Big\{f(\text{驻点}),\ f(\text{不可导点}),\ f(a),\ f(b)\Big\}`,
      cond: String.raw`$f$ 在 $[a,b]$ 连续（考题多为分段可导或初等函数）。`,
      warn: '端点值一定要比较；应用题还要注意“驻点唯一时即最值”的论证。',
      tags: ['最值', '闭区间']
    },
    {
      id: 'gs-dif-24', sec: 'gs-dif', name: '曲线的凹凸性与拐点',
      tex: String.raw`f''(x)>0\ \text{（凹/下凸）};\quad f''(x)<0\ \text{（凸/上凸）};\quad f''(x_0)=0\ \text{且两侧变号}\Rightarrow\text{拐点}`,
      cond: String.raw`$f$ 在区间内二阶可导；拐点是曲线上的点 $(x_0,f(x_0))$。`,
      warn: String.raw`凹凸性定义在区间上，拐点必须写坐标点；仅 $f''(x_0)=0$ 不一定是拐点（如 $y=x^4$ 在 0 处）。`,
      tags: ['凹凸性', '拐点']
    },
    {
      id: 'gs-dif-25', sec: 'gs-dif', name: '曲线的渐近线',
      tex: String.raw`\begin{aligned}
&\text{水平：}\ \lim_{x\to\pm\infty}f(x)=A\ \Rightarrow\ y=A;\\
&\text{垂直：}\ \lim_{x\to x_0}f(x)=\infty\ \Rightarrow\ x=x_0\ (\text{常在无定义点处找});\\
&\text{斜：}\ k=\lim_{x\to\infty}\frac{f(x)}{x},\quad b=\lim_{x\to\infty}\big(f(x)-kx\big)\ \Rightarrow\ y=kx+b
\end{aligned}`,
      cond: '斜渐近线要求两极限均存在。',
      warn: String.raw`同一方向上水平与斜渐近线至多一条；求 $k$、$b$ 时必须取完整极限。`,
      tags: ['渐近线', '水平', '垂直', '斜']
    },
    {
      id: 'gs-dif-26', sec: 'gs-dif', name: '切线与法线方程',
      tex: String.raw`\begin{aligned}
&\text{切线：}\ y-y_0=f'(x_0)(x-x_0);\\
&\text{法线：}\ y-y_0=-\frac{1}{f'(x_0)}(x-x_0)\quad(f'(x_0)\neq0)
\end{aligned}`,
      cond: String.raw`$f$ 在 $x_0$ 可导；法线与切线垂直。`,
      warn: String.raw`$f'(x_0)=0$ 时切线为 $y=y_0$，法线为 $x=x_0$。`,
      tags: ['切线', '法线']
    },
    {
      id: 'gs-dif-27', sec: 'gs-dif', name: '曲率与曲率半径（直角坐标）',
      tex: String.raw`K=\frac{|y''|}{\left(1+y'^{2}\right)^{3/2}},\qquad \rho=\frac{1}{K}=\frac{\left(1+y'^{2}\right)^{3/2}}{|y''|}`,
      cond: String.raw`$y=y(x)$ 二阶可导且 $y''\neq0$（否则曲率为 0、半径无穷大）。`,
      warn: String.raw`分母是 $3/2$ 次方；分子带绝对值保证 $K\ge0$。`,
      tags: ['曲率', '曲率半径']
    },
    {
      id: 'gs-dif-28', sec: 'gs-dif', name: '曲率（参数方程形式）',
      tex: String.raw`K=\frac{|\dot x\,\ddot y-\dot y\,\ddot x|}{\left(\dot x^{2}+\dot y^{2}\right)^{3/2}}`,
      cond: String.raw`$x=x(t),y=y(t)$ 二阶可导，且 $(\dot x,\dot y)\neq(0,0)$。`,
      tags: ['曲率', '参数方程']
    },
    {
      id: 'gs-dif-29', sec: 'gs-dif', name: '驻点与极值点的关系',
      tex: String.raw`f\ \text{在}\ x_0\ \text{可导且取极值}\Rightarrow f'(x_0)=0;\qquad
f'(x_0)=0\ nRightarrow x_0\ \text{为极值点}`,
      cond: '费马引理：可导极值点处导数为 0。',
      warn: String.raw`极值点还可能出现在不可导点（如 $y=|x|$ 在 0 处取极小但不可导）。`,
      tags: ['驻点', '极值', '费马引理', '易错']
    },

    /* ================= §4 一元函数积分学 ================= */
    {
      id: 'gs-int-1', sec: 'gs-int', name: '不定积分的基本性质',
      tex: String.raw`\left(\int f(x)\,dx\right)'=f(x),\qquad \int f'(x)\,dx=f(x)+C,\qquad \int [af+bg]\,dx=a\int f\,dx+b\int g\,dx`,
      cond: String.raw`等式两端均指“任意一个原函数”意义下成立，别忘常数 $C$。`,
      warn: '不定积分结果求导应还原被积函数，可用求导验证。',
      tags: ['不定积分', '性质']
    },
    {
      id: 'gs-int-2', sec: 'gs-int', name: '基本积分表（幂、指、对）',
      tex: String.raw`\begin{aligned}
&\int x^{\mu}\,dx=\frac{x^{\mu+1}}{\mu+1}+C\ (\mu\neq-1);\qquad
\int\frac{dx}{x}=\ln|x|+C;\\
&\int e^{x}\,dx=e^{x}+C;\qquad
\int a^{x}\,dx=\frac{a^{x}}{\ln a}+C\ (a>0,a\neq1)
\end{aligned}`,
      cond: String.raw`$\mu$ 为常数且 $\mu\neq-1$；$\int dx/x$ 的结果带绝对值。`,
      warn: String.raw`$\int\frac1x\,dx=\ln|x|+C$ 中绝对值不能省（负数区间也成立）。`,
      tags: ['积分表', '幂函数']
    },
    {
      id: 'gs-int-3', sec: 'gs-int', name: '基本积分表（三角、反三角）',
      tex: String.raw`\begin{aligned}
&\int\sin x\,dx=-\cos x+C;\quad \int\cos x\,dx=\sin x+C;\quad
\int\sec^{2}x\,dx=\tan x+C;\\
&\int\csc^{2}x\,dx=-\cot x+C;\quad \int\sec x\tan x\,dx=\sec x+C;\\
&\int\frac{dx}{1+x^{2}}=\arctan x+C;\quad \int\frac{dx}{\sqrt{1-x^{2}}}=\arcsin x+C
\end{aligned}`,
      tags: ['积分表', '三角', '反三角']
    },
    {
      id: 'gs-int-4', sec: 'gs-int', name: '第一类换元法（凑微分）',
      tex: String.raw`\int f(\varphi(x))\varphi'(x)\,dx\overset{u=\varphi(x)}{=}\int f(u)\,du=F(u)+C`,
      cond: String.raw`常用凑法：$\int f(ax+b)\,dx=\frac1a F(ax+b)$；$\int f(x^{n})x^{n-1}dx=\frac1n\int f(x^{n})d(x^{n})$；$\int f(e^{x})e^{x}dx=\int f(e^{x})d(e^{x})$；$\int\frac{f(\ln x)}{x}dx=\int f(\ln x)\,d(\ln x)$。`,
      warn: String.raw`凑微分要“凑全套”：换元后 $dx$ 也要相应换成 $du$，常数因子容易漏。`,
      tags: ['换元积分', '凑微分']
    },
    {
      id: 'gs-int-5', sec: 'gs-int', name: '第二类换元法（三角代换）',
      tex: String.raw`\begin{aligned}
&\sqrt{a^{2}-x^{2}}\ \Rightarrow\ x=a\sin t\ \left(-\frac{\pi}{2}\le t\le\frac{\pi}{2}\right);\\
&\sqrt{a^{2}+x^{2}}\ \Rightarrow\ x=a\tan t;\qquad
\sqrt{x^{2}-a^{2}}\ \Rightarrow\ x=a\sec t
\end{aligned}`,
      cond: '代换须单调可导；换元后积分限要么同步换，要么最后回代原变量。',
      warn: '定积分用换元时，积分上下限一定要跟着换，这样可不再回代。',
      tags: ['换元积分', '三角代换']
    },
    {
      id: 'gs-int-6', sec: 'gs-int', name: '分部积分法',
      tex: String.raw`\int u\,dv=uv-\int v\,du,\qquad
\int_a^b u\,dv=\big.uv\big|_a^b-\int_a^b v\,du`,
      cond: String.raw`选取 $u$ 的优先次序：“反对幂指三”（反三角、对数、幂、指数、三角）。`,
      warn: String.raw`$\int x\sin x\,dx$ 这类“幂×三角/指数”必用分部；循环型（如 $\int e^{x}\sin x\,dx$）需解方程得出。`,
      tags: ['分部积分']
    },
    {
      id: 'gs-int-7', sec: 'gs-int', name: '常用积分公式（补充）',
      tex: String.raw`\begin{aligned}
&\int\frac{dx}{x^{2}+a^{2}}=\frac{1}{a}\arctan\frac{x}{a}+C;\qquad
\int\frac{dx}{x^{2}-a^{2}}=\frac{1}{2a}\ln\left|\frac{x-a}{x+a}\right|+C;\\
&\int\frac{dx}{\sqrt{a^{2}-x^{2}}}=\arcsin\frac{x}{a}+C;\qquad
\int\frac{dx}{\sqrt{x^{2}\pm a^{2}}}=\ln\left|x+\sqrt{x^{2}\pm a^{2}}\right|+C;\\
&\int\tan x\,dx=-\ln|\cos x|+C;\qquad
\int\sec x\,dx=\ln|\sec x+\tan x|+C
\end{aligned}`,
      cond: String.raw`各式含参量 $a>0$；$\sqrt{x^{2}-a^{2}}$ 要求 $|x|>a$。`,
      tags: ['积分公式', '有理函数']
    },
    {
      id: 'gs-int-8', sec: 'gs-int', name: '有理函数积分的一般步骤',
      tex: String.raw`\frac{P(x)}{Q(x)}\ \xrightarrow{\text{多项式除法}}\ \text{多项式}+\frac{R(x)}{Q(x)}
\ \xrightarrow{\text{部分分式}}\ \sum\frac{A_i}{(x-a)^{k}}+\sum\frac{Bx+C}{(x^{2}+px+q)^{m}}`,
      cond: '真分式（分子次数低于分母）才拆部分分式；不可约二次因式对应待定分子为一次式。',
      warn: '分母先试根分解；拆分后用待定系数或赋值法求常数。',
      tags: ['有理函数', '部分分式']
    },
    {
      id: 'gs-int-9', sec: 'gs-int', name: '三角有理式积分技巧',
      tex: String.raw`\sin^{2}x=\frac{1-\cos2x}{2},\quad \cos^{2}x=\frac{1+\cos2x}{2},\qquad
t=\tan\frac{x}{2}\ \Rightarrow\ \sin x=\frac{2t}{1+t^{2}},\ \cos x=\frac{1-t^{2}}{1+t^{2}}`,
      cond: String.raw`含 $\sin x,\cos x$ 的有理式均可用万能代换 $t=\tan\frac x2$ 化为 $t$ 的有理函数积分。`,
      warn: '优先用降幂、倍角与凑微分；万能代换是兜底手段，计算量大。',
      tags: ['三角积分', '万能代换', '降幂']
    },
    {
      id: 'gs-int-10', sec: 'gs-int', name: '牛顿—莱布尼茨公式',
      tex: String.raw`\int_a^b f(x)\,dx=F(b)-F(a),\qquad F'(x)=f(x)`,
      cond: String.raw`$f$ 在 $[a,b]$ 上连续（$F$ 为它的一个原函数）。`,
      warn: '被积函数含绝对值、分段点时必须分段积分，不能直接代端点。',
      tags: ['牛顿莱布尼茨', '定积分']
    },
    {
      id: 'gs-int-11', sec: 'gs-int', name: '变上限积分求导',
      tex: String.raw`\frac{d}{dx}\int_a^{x}f(t)\,dt=f(x)\qquad(f\ \text{连续})`,
      cond: String.raw`上限为 $x$、下限为常数、被积函数仅含 $t$ 时直接用。`,
      warn: String.raw`被积函数含 $x$ 时要先换元提出 $x$（如 $\int_a^x f(xt)\,dt$）或用含参求导，不能直接把 $t$ 换成 $x$。`,
      tags: ['变限积分', '求导']
    },
    {
      id: 'gs-int-12', sec: 'gs-int', name: '变限积分求导（上下限为函数）',
      tex: String.raw`\frac{d}{dx}\int_{\alpha(x)}^{\beta(x)}f(t)\,dt=f(\beta(x))\,\beta'(x)-f(\alpha(x))\,\alpha'(x)`,
      cond: String.raw`$f$ 连续，$\alpha(x),\beta(x)$ 可导。`,
      warn: '上下限分别求导后与端点函数值相乘，顺序是“上正下负”。',
      tags: ['变限积分', '求导']
    },
    {
      id: 'gs-int-13', sec: 'gs-int', name: '定积分的线性与区间可加性',
      tex: String.raw`\int_a^b[af+bg]\,dx=a\int_a^b f\,dx+b\int_a^b g\,dx,\qquad
\int_a^b f\,dx=\int_a^c f\,dx+\int_c^b f\,dx`,
      cond: String.raw`区间 $c$ 可在 $[a,b]$ 之外，公式仍成立（此时定积分按定义可负向）。`,
      tags: ['定积分', '性质']
    },
    {
      id: 'gs-int-14', sec: 'gs-int', name: '定积分的保号性与绝对值不等式',
      tex: String.raw`f(x)\ge0\Rightarrow\int_a^b f\,dx\ge0;\qquad
\left|\int_a^b f\,dx\right|\le\int_a^b|f(x)|\,dx\ (a<b)`,
      cond: String.raw`$f$ 可积；严格不等需 $f$ 不恒为 0 且连续。`,
      warn: String.raw`由 $f\le g$ 可得 $\int f\le\int g$，但由 $\int f\le\int g$ 不能反推 $f\le g$。`,
      tags: ['保号性', '不等式']
    },
    {
      id: 'gs-int-15', sec: 'gs-int', name: '估值定理与积分中值定理',
      tex: String.raw`\begin{aligned}
&\text{估值：}\ m(b-a)\le\int_a^b f(x)\,dx\le M(b-a),\quad m\le f\le M;\\
&\text{中值定理：}\ \int_a^b f(x)\,dx=f(\xi)(b-a),\quad \xi\in[a,b]\ (f\ \text{连续})
\end{aligned}`,
      cond: String.raw`$f$ 在 $[a,b]$ 可积（中值定理要求连续）。`,
      warn: String.raw`积分中值定理的 $\xi$ 在闭区间 $[a,b]$；微分中值定理的 $\xi$ 在开区间。`,
      tags: ['估值定理', '积分中值定理']
    },
    {
      id: 'gs-int-16', sec: 'gs-int', name: '奇偶性在定积分中的应用',
      tex: String.raw`\int_{-a}^{a}f(x)\,dx=
\begin{cases}
2\displaystyle\int_0^{a}f(x)\,dx, & f\ \text{为偶函数}\\[6pt]
0, & f\ \text{为奇函数}
\end{cases}\qquad(a>0)`,
      cond: '积分区间必须关于原点对称。',
      warn: String.raw`对称区间上先看奇偶性再化简；非奇非偶可拆 $[-a,0]+[0,a]$ 后凑配。`,
      tags: ['奇偶性', '对称区间']
    },
    {
      id: 'gs-int-17', sec: 'gs-int', name: '定积分的换元公式',
      tex: String.raw`x=\varphi(t):\quad \int_a^b f(x)\,dx=\int_\alpha^\beta f(\varphi(t))\,\varphi'(t)\,dt,\quad \varphi(\alpha)=a,\ \varphi(\beta)=b`,
      cond: String.raw`$\varphi$ 在 $[\alpha,\beta]$ 上连续可导，值域覆盖 $[a,b]$（或其相应段）。`,
      warn: '换元必换限；换元后不必回代，这是定积分换元与不定积分的最大区别。',
      tags: ['换元积分', '定积分']
    },
    {
      id: 'gs-int-18', sec: 'gs-int', name: '华里士（Wallis）公式',
      tex: String.raw`\int_0^{\frac{\pi}{2}}\sin^{n}x\,dx=\int_0^{\frac{\pi}{2}}\cos^{n}x\,dx=
\begin{cases}
\frac{n-1}{n}\cdot\frac{n-3}{n-2}\cdots\frac{2}{3}, & n\ \text{为奇数}\\[4pt]
\frac{n-1}{n}\cdot\frac{n-3}{n-2}\cdots\frac{1}{2}\cdot\frac{\pi}{2}, & n\ \text{为偶数}
\end{cases}`,
      cond: String.raw`仅适用于 $[0,\pi/2]$ 上 $\sin^n$、$\cos^n$；可用对称性推广到 $[0,\pi]$（$\int_0^\pi\sin^n=2\int_0^{\pi/2}\sin^n$）。`,
      warn: '奇偶判断口诀：奇减到 1、偶减到 2，奇乘 1、偶乘 π/2。',
      tags: ['华里士', 'Wallis', '定积分技巧']
    },
    {
      id: 'gs-int-19', sec: 'gs-int', name: '反常积分的定义（无穷限）',
      tex: String.raw`\int_a^{+\infty}f(x)\,dx=\lim_{b\to+\infty}\int_a^b f(x)\,dx\quad(\text{极限存在称收敛})`,
      cond: '先算定积分再取极限；极限不存在则发散。',
      warn: String.raw`不能把 $\int_a^{+\infty}$ 直接代成“$F(+\infty)-F(a)$”而不讨论极限是否存在。`,
      tags: ['反常积分', '无穷限']
    },
    {
      id: 'gs-int-20', sec: 'gs-int', name: '反常积分的定义（瑕积分）',
      tex: String.raw`\int_a^{b}f(x)\,dx=\lim_{\varepsilon\to0^{+}}\int_{a+\varepsilon}^{b}f(x)\,dx\quad(a\ \text{为瑕点})`,
      cond: String.raw`$f$ 在 $a$ 的右邻域内无界；瑕点也可能在上限或区间内部，需分段处理。`,
      warn: '无界点的定积分不能直接用牛顿—莱布尼茨公式代入瑕点值。',
      tags: ['反常积分', '瑕积分']
    },
    {
      id: 'gs-int-21', sec: 'gs-int', name: 'p-积分的敛散性',
      tex: String.raw`\int_a^{+\infty}\frac{dx}{x^{p}}\ (a>0):\ \begin{cases}p>1\ \text{收敛}\\ p\le1\ \text{发散}\end{cases};\qquad
\int_0^{a}\frac{dx}{x^{p}}:\ \begin{cases}p<1\ \text{收敛}\\ p\ge1\ \text{发散}\end{cases}`,
      cond: '第二个是瑕点在 0 的瑕积分；两个结论是判敛的比较基准。',
      tags: ['p-积分', '敛散性', '反常积分']
    },
    {
      id: 'gs-int-22', sec: 'gs-int', name: '反常积分比较判别法（极限形式）',
      tex: String.raw`f,g\ge0,\quad \lim\frac{f(x)}{g(x)}=l:
\begin{cases}
0<l<+\infty: \text{同敛散}\\
l=0:\ \int g\ \text{收敛}\Rightarrow\int f\ \text{收敛}\\
l=+\infty:\ \int f\ \text{发散}\Rightarrow\int g\ \text{发散}
\end{cases}`,
      cond: '同一反常积分（同为无穷限或同为瑕积分）上比较；等价无穷小思想可用于判敛。',
      warn: '比较判别法只适用于非负被积函数；一般函数可先取绝对值讨论绝对收敛。',
      tags: ['比较判别法', '敛散性']
    },
    {
      id: 'gs-int-23', sec: 'gs-int', name: '定积分应用——元素法（微元法）',
      tex: String.raw`Q=\int_a^b u(x)\,dx:\quad \text{分割}\to\text{取微元}\ dQ=u(x)\,dx\to\text{积分}`,
      cond: String.raw`在 $[x,x+dx]$ 上把非均匀量近似看作均匀，再积分求和。`,
      warn: String.raw`微元的选取要与所求量同阶（如弧长微元用 $\sqrt{1+y'^2}\,dx$，不能用 $dx$ 近似）。`,
      tags: ['元素法', '微元法', '应用']
    },
    {
      id: 'gs-int-24', sec: 'gs-int', name: '平面图形的面积（直角坐标）',
      tex: String.raw`A=\int_a^b|f(x)-g(x)|\,dx`,
      cond: String.raw`两曲线 $y=f(x)$、$y=g(x)$ 在 $[a,b]$ 上相交围成；上下关系明确时去掉绝对值。`,
      warn: '先画图定上下与交点，再定限；上下位置颠倒会得到负值。',
      tags: ['面积', '定积分应用']
    },
    {
      id: 'gs-int-25', sec: 'gs-int', name: '平面图形的面积（极坐标）',
      tex: String.raw`A=\frac{1}{2}\int_\alpha^\beta\left|\varphi_2^{2}(\theta)-\varphi_1^{2}(\theta)\right|\,d\theta
\quad\left(\text{仅一条时}\ A=\frac12\int_\alpha^\beta r^{2}(\theta)\,d\theta\right)`,
      cond: String.raw`射线从 $\theta=\alpha$ 扫到 $\beta$，两曲线 $r=\varphi_1,\varphi_2$ 为内外边界。`,
      tags: ['面积', '极坐标']
    },
    {
      id: 'gs-int-26', sec: 'gs-int', name: '旋转体的体积',
      tex: String.raw`\begin{aligned}
&V_x=\pi\int_a^b y^{2}(x)\,dx &&(\text{绕}\ x\ \text{轴});\\
&V=\pi\int_a^b\big[R^{2}(x)-r^{2}(x)\big]\,dx &&(\text{垫片法});\\
&V_y=2\pi\int_a^b x\,|y(x)|\,dx &&(\text{绕}\ y\ \text{轴，壳法})
\end{aligned}`,
      cond: String.raw`已知平行截面面积时 $V=\int_a^b A(x)\,dx$（通用）；绕 $y$ 轴优先考虑壳法可避免解反函数。`,
      warn: '绕不同轴旋转公式不同；“垫片内外半径”必须沿积分变量方向判断。',
      tags: ['旋转体体积', '定积分应用']
    },
    {
      id: 'gs-int-27', sec: 'gs-int', name: '平面曲线的弧长',
      tex: String.raw`\begin{aligned}
&s=\int_a^b\sqrt{1+y'^{2}}\,dx;\\
&s=\int_\alpha^\beta\sqrt{\dot x^{2}(t)+\dot y^{2}(t)}\,dt;\\
&s=\int_\alpha^\beta\sqrt{r^{2}(\theta)+r'^{2}(\theta)}\,d\theta
\end{aligned}`,
      cond: String.raw`各公式要求相应导数连续；弧长元素 $ds$ 是三种坐标下的统一形式。`,
      warn: '弧长被积函数恒为正，结果与参数方向无关，不存在符号问题。',
      tags: ['弧长', '定积分应用']
    },
    {
      id: 'gs-int-28', sec: 'gs-int', name: '旋转体的侧面积',
      tex: String.raw`S=2\pi\int_a^b|y|\,\sqrt{1+y'^{2}}\,dx\ (\text{绕}\ x\ \text{轴}),\qquad
S=2\pi\int_c^d|x|\,\sqrt{1+x'^{2}}\,dy\ (\text{绕}\ y\ \text{轴})`,
      cond: String.raw`参数形式：$S=2\pi\int |y(t)|\sqrt{\dot x^{2}+\dot y^{2}}\,dt$（绕 $x$ 轴）。`,
      warn: String.raw`侧面积是“周长×弧长微元”的累积，与体积公式结构不同，别混用 $\pi y^2$。`,
      tags: ['侧面积', '旋转体']
    },
    {
      id: 'gs-int-29', sec: 'gs-int', name: '函数的平均值',
      tex: String.raw`\bar f=\frac{1}{b-a}\int_a^b f(x)\,dx`,
      cond: String.raw`$f$ 在 $[a,b]$ 上可积；由积分中值定理 $\bar f=f(\xi)$（$f$ 连续时）。`,
      tags: ['平均值']
    },
    {
      id: 'gs-int-30', sec: 'gs-int', name: '变力做功（定积分的物理应用）',
      tex: String.raw`W=\int_a^b F(x)\,dx`,
      cond: String.raw`力 $F(x)$ 沿直线方向连续变化；曲线运动/变力需按微元分解。`,
      warn: String.raw`先建立坐标系把 $F(x)$ 表出，再定限。`,
      flag: 'verify',
      tags: ['功', '物理应用']
    },

    /* ================= §5 多元函数微分学 ================= */
    {
      id: 'gs-mvd-1', sec: 'gs-mvd', name: '二元函数极限（与一元的区别）',
      tex: String.raw`\lim_{(x,y)\to(x_0,y_0)}f(x,y)=A
\iff \text{沿任意路径趋于}(x_0,y_0)\ \text{时极限均为}\ A`,
      cond: '必须与路径无关；常用反证：沿两条不同路径得不同极限则不存在。',
      warn: '一元的夹逼、洛必达不能直接照搬到二元；累次极限相等也推不出二重极限。',
      tags: ['二元极限', '极限']
    },
    {
      id: 'gs-mvd-2', sec: 'gs-mvd', name: '偏导数的定义',
      tex: String.raw`f_x(x_0,y_0)=\lim_{\Delta x\to0}\frac{f(x_0+\Delta x,y_0)-f(x_0,y_0)}{\Delta x}`,
      cond: String.raw`对 $x$ 求偏导时把 $y$ 视为常数 $y_0$；分段函数在分界点用定义。`,
      warn: String.raw`偏导数 $f_x(x_0,y_0)$ 是一个数；$f_x(x,y)$ 才是函数。`,
      tags: ['偏导数', '定义']
    },
    {
      id: 'gs-mvd-3', sec: 'gs-mvd', name: '偏导数的计算',
      tex: String.raw`z=f(x,y):\quad \frac{\partial z}{\partial x}\ \text{视}\ y\ \text{为常数求导},\quad \frac{\partial z}{\partial y}\ \text{视}\ x\ \text{为常数求导}`,
      cond: '复合、隐函数情形用链式法则与隐函数求导。',
      warn: String.raw`求 $f_x(x_0,y_0)$ 应先求出 $f_x(x,y)$ 再代入，或在偏导定义中把 $y_0$ 当常数。`,
      tags: ['偏导数', '计算']
    },
    {
      id: 'gs-mvd-4', sec: 'gs-mvd', name: '全微分的定义',
      tex: String.raw`\Delta z=A\Delta x+B\Delta y+o(\rho)\ \Leftrightarrow\ dz=A\,dx+B\,dy
\quad(A=f_x,\ B=f_y,\ \rho=\sqrt{\Delta x^{2}+\Delta y^{2}})`,
      cond: String.raw`$z=f(x,y)$ 在 $(x_0,y_0)$ 可微时 $A,B$ 就是该点偏导数。`,
      warn: '可微必连续、必可偏导；反之不成立。',
      tags: ['全微分', '可微']
    },
    {
      id: 'gs-mvd-5', sec: 'gs-mvd', name: '可微的判别方法',
      tex: String.raw`\lim_{\rho\to0}\frac{\Delta z-f_x(x_0,y_0)\Delta x-f_y(x_0,y_0)\Delta y}{\rho}=0
\ \Rightarrow\ \text{可微}`,
      cond: String.raw`先验证偏导存在，再验该极限为 0；这是（可微判定的）充要条件形式。`,
      warn: String.raw`偏导数存在只是必要条件：如 $f(x,y)=\dfrac{xy}{\sqrt{x^{2}+y^{2}}}$（补 $f(0,0)=0$）在原点偏导均为 0 但不可微。`,
      tags: ['可微', '判别', '易错']
    },
    {
      id: 'gs-mvd-6', sec: 'gs-mvd', name: '连续、偏导、可微的关系',
      tex: String.raw`\text{偏导连续}\Rightarrow\text{可微}\Rightarrow
\begin{cases}\text{连续}\\ \text{偏导存在}\end{cases}
\quad(\text{箭头均不可逆})`,
      cond: '“偏导数连续 ⇒ 可微”是常用的充分条件。',
      warn: String.raw`连续与偏导存在互不蕴含：$f=|x|+|y|$ 在原点连续但偏导不存在。`,
      tags: ['可微', '连续', '偏导', '关系']
    },
    {
      id: 'gs-mvd-7', sec: 'gs-mvd', name: '多元复合函数求导（链式法则）',
      tex: String.raw`\begin{aligned}
z=f(u,v),\ u=u(x,y),\ v=v(x,y):\quad
&\frac{\partial z}{\partial x}=\frac{\partial f}{\partial u}\frac{\partial u}{\partial x}+\frac{\partial f}{\partial v}\frac{\partial v}{\partial x};\\
&\frac{\partial z}{\partial y}=\frac{\partial f}{\partial u}\frac{\partial u}{\partial y}+\frac{\partial f}{\partial v}\frac{\partial v}{\partial y}
\end{aligned}`,
      cond: String.raw`中间变量可微；$f$ 对中间变量的偏导仍为多元函数，要继续复合。`,
      warn: String.raw`漏项是高频错误：有几条“中间变量到 $x$ 的路径”就加几项。`,
      tags: ['链式法则', '复合函数', '偏导']
    },
    {
      id: 'gs-mvd-8', sec: 'gs-mvd', name: '全微分形式的不变性（多元）',
      tex: String.raw`dz=\frac{\partial f}{\partial u}du+\frac{\partial f}{\partial v}dv\quad(\text{无论}\ u,v\ \text{是自变量还是中间变量})`,
      cond: '可用于多元复合、隐函数的微分运算与求偏导。',
      tags: ['全微分', '形式不变性']
    },
    {
      id: 'gs-mvd-9', sec: 'gs-mvd', name: '二元隐函数求导',
      tex: String.raw`F(x,y,z)=0:\quad
\frac{\partial z}{\partial x}=-\frac{F_x}{F_z},\qquad
\frac{\partial z}{\partial y}=-\frac{F_y}{F_z}\qquad(F_z\neq0)`,
      cond: String.raw`$F$ 具有连续偏导数且 $F_z\neq0$；也可对方程两边分别对 $x,y$ 求偏导（$z$ 视为 $x,y$ 的函数）。`,
      warn: String.raw`负号与下标顺序别记反：对 $x$ 求导用 $-F_x/F_z$。`,
      tags: ['隐函数', '偏导']
    },
    {
      id: 'gs-mvd-10', sec: 'gs-mvd', name: '一元隐函数（多元方程）',
      tex: String.raw`F(x,y)=0:\quad \frac{dy}{dx}=-\frac{F_x}{F_y}\qquad(F_y\neq0)`,
      cond: String.raw`$F$ 具有连续偏导数且 $F_y\neq0$。`,
      tags: ['隐函数', '导数']
    },
    {
      id: 'gs-mvd-11', sec: 'gs-mvd', name: '多元函数的极值必要条件',
      tex: String.raw`z=f(x,y)\ \text{在}\ (x_0,y_0)\ \text{取极值且偏导存在}\Rightarrow
f_x(x_0,y_0)=f_y(x_0,y_0)=0`,
      cond: String.raw`驻点定义为 $(f_x,f_y)=(0,0)$ 的点；偏导不存在的点也可能取极值。`,
      warn: String.raw`驻点不一定是极值点（如 $z=x^{2}-y^{2}$ 在原点是鞍点）。`,
      tags: ['极值', '驻点']
    },
    {
      id: 'gs-mvd-12', sec: 'gs-mvd', name: '二元极值的充分条件',
      tex: String.raw`A=f_{xx},\ B=f_{xy},\ C=f_{yy},\ \Delta=AC-B^{2}\ \text{在驻点处}:
\begin{cases}
\Delta>0,\ A>0:\ \text{极小值点}\\
\Delta>0,\ A<0:\ \text{极大值点}\\
\Delta<0:\ \text{鞍点（非极值）}\\
\Delta=0:\ \text{判别法失效}
\end{cases}`,
      cond: String.raw`$f$ 在驻点某邻域内有二阶连续偏导数。`,
      warn: String.raw`三个二阶偏导都要算；$\Delta=0$ 时须回用极值定义判定。`,
      tags: ['极值', '充分条件', '判别']
    },
    {
      id: 'gs-mvd-13', sec: 'gs-mvd', name: '条件极值——拉格朗日乘数法',
      tex: String.raw`L(x,y,\lambda)=f(x,y)+\lambda\,\varphi(x,y),\qquad
\begin{cases}
L_x=f_x+\lambda\varphi_x=0\\
L_y=f_y+\lambda\varphi_y=0\\
L_\lambda=\varphi(x,y)=0
\end{cases}`,
      cond: String.raw`求 $z=f(x,y)$ 在条件 $\varphi(x,y)=0$ 下的极值；多条件时加多个乘子。`,
      warn: String.raw`最后要把候选点的函数值算出来比较，才能得最值；乘子 $\lambda$ 通常不必单独解出。`,
      tags: ['条件极值', '拉格朗日']
    },
    {
      id: 'gs-mvd-14', sec: 'gs-mvd', name: '有界闭区域上最值的求法',
      tex: String.raw`M,m=\max/\min\Big\{f(\text{内部驻点}),\ \max/\min_{\text{边界}}f\Big\}`,
      cond: String.raw`$D$ 为有界闭区域、$f$ 连续；边界上的最值通常化为一元函数（或再用一次条件极值）。`,
      warn: '实际应用题的步骤：建目标函数→找驻点→比较→下结论（唯一驻点且题意有最值时可直接判定）。',
      tags: ['最值', '闭区域']
    },

    /* ================= §6 二重积分 ================= */
    {
      id: 'gs-dbl-1', sec: 'gs-dbl', name: '二重积分的定义与性质（线性、可加）',
      tex: String.raw`\iint_D[\alpha f+\beta g]\,d\sigma=\alpha\iint_D f\,d\sigma+\beta\iint_D g\,d\sigma,\qquad
\iint_D f\,d\sigma=\iint_{D_1}f\,d\sigma+\iint_{D_2}f\,d\sigma`,
      cond: String.raw`$D=D_1\cup D_2$（$D_1,D_2$ 除边界外不重叠）；$f$ 在 $D$ 上可积。`,
      tags: ['二重积分', '性质']
    },
    {
      id: 'gs-dbl-2', sec: 'gs-dbl', name: '二重积分的保号性与中值定理',
      tex: String.raw`\begin{aligned}
&f\ge0\Rightarrow\iint_D f\,d\sigma\ge0;\qquad
\left|\iint_D f\,d\sigma\right|\le\iint_D|f|\,d\sigma;\\
&m\sigma\le\iint_D f\,d\sigma\le M\sigma\quad(\sigma\ \text{为}\ D\ \text{面积});\\
&\iint_D f\,d\sigma=f(\xi,\eta)\,\sigma\quad(f\ \text{连续},\ (\xi,\eta)\in D)
\end{aligned}`,
      tags: ['二重积分', '保号性', '中值定理']
    },
    {
      id: 'gs-dbl-3', sec: 'gs-dbl', name: '直角坐标下的累次积分（X 型区域）',
      tex: String.raw`D=\{(x,y)\mid a\le x\le b,\ \varphi_1(x)\le y\le\varphi_2(x)\}:\quad
\iint_D f\,dxdy=\int_a^b dx\int_{\varphi_1(x)}^{\varphi_2(x)}f(x,y)\,dy`,
      cond: String.raw`先 $y$ 后 $x$：$y$ 的上下限是 $x$ 的函数，$x$ 为常数限。`,
      warn: String.raw`定限顺序与不等式组方向一致；内层积分的被积函数是 $x$ 的函数后才能对外层积分。`,
      tags: ['累次积分', 'X型']
    },
    {
      id: 'gs-dbl-4', sec: 'gs-dbl', name: '直角坐标下的累次积分（Y 型区域）',
      tex: String.raw`D=\{(x,y)\mid c\le y\le d,\ \psi_1(y)\le x\le\psi_2(y)\}:\quad
\iint_D f\,dxdy=\int_c^{d} dy\int_{\psi_1(y)}^{\psi_2(y)}f(x,y)\,dx`,
      cond: String.raw`先 $x$ 后 $y$：$x$ 的上下限是 $y$ 的函数，$y$ 为常数限。`,
      warn: '当区域既不是纯 X 型也不是纯 Y 型时，需要分割区域后分块积分。',
      tags: ['累次积分', 'Y型']
    },
    {
      id: 'gs-dbl-5', sec: 'gs-dbl', name: '交换积分次序',
      tex: String.raw`\int_a^b dx\int_{\varphi_1(x)}^{\varphi_2(x)}f(x,y)\,dy
=\int_c^d dy\int_{\psi_1(y)}^{\psi_2(y)}f(x,y)\,dx`,
      cond: String.raw`必须先画出积分区域 $D$，由不等式组重新定限，不能只交换上下限。`,
      warn: '“直接把两个积分限对调”是错误做法；区域不变、只是换了描述方式。',
      tags: ['交换积分次序']
    },
    {
      id: 'gs-dbl-6', sec: 'gs-dbl', name: '极坐标变换',
      tex: String.raw`x=r\cos\theta,\ y=r\sin\theta,\ dxdy=r\,dr\,d\theta,\qquad
\iint_D f(x,y)\,dxdy=\iint_{D'}f(r\cos\theta,r\sin\theta)\,r\,dr\,d\theta`,
      cond: String.raw`适用：区域为圆/环/扇形或边界用极坐标简洁；被积函数含 $x^{2}+y^{2}$、$\dfrac yx$ 等。`,
      warn: String.raw`面积元中的因子 $r$ 千万不能漏；$r$ 的范围从原点（或内边界）向外扫。`,
      tags: ['极坐标', '二重积分']
    },
    {
      id: 'gs-dbl-7', sec: 'gs-dbl', name: '普通对称性（奇偶对称）',
      tex: String.raw`D\ \text{关于}\ x\ \text{轴对称}:\quad
\iint_D f\,d\sigma=
\begin{cases}
0, & f(x,-y)=-f(x,y)\\
2\displaystyle\iint_{D\cap\{y\ge0\}}f\,d\sigma, & f(x,-y)=f(x,y)
\end{cases}`,
      cond: String.raw`关于 $y$ 轴对称时对 $x$ 用同样规则（$f(-x,y)$）；关于原点对称：奇函数为 0、偶函数为 2 倍。`,
      warn: '必须“区域对称 + 被积函数奇偶”两者同时满足才能用。',
      tags: ['对称性', '奇偶', '二重积分']
    },
    {
      id: 'gs-dbl-8', sec: 'gs-dbl', name: '轮换对称性',
      tex: String.raw`D\ \text{关于直线}\ y=x\ \text{对称}\ \Rightarrow\
\iint_D f(x,y)\,dxdy=\iint_D f(y,x)\,dxdy`,
      cond: String.raw`典型区域：$x^{2}+y^{2}\le R^{2}$、$0\le x,y\le1$ 的方域、$\max$/$\min$ 型边界等。`,
      warn: String.raw`常用技巧：$\iint_D f(x,y)=\dfrac12\iint_D[f(x,y)+f(y,x)]\,d\sigma$，可化简被积函数。`,
      tags: ['轮换对称', '二重积分']
    },
    {
      id: 'gs-dbl-9', sec: 'gs-dbl', name: '二重积分的几何应用',
      tex: String.raw`V=\iint_D f(x,y)\,d\sigma\quad(f\ge0\ \text{为曲顶柱体高度},\ D\ \text{为底})`,
      cond: String.raw`$D$ 上两曲面之间的体积 $V=\iint_D[f_{\text{上}}-f_{\text{下}}]\,d\sigma$。`,
      tags: ['体积', '几何应用']
    },
    {
      id: 'gs-dbl-10', sec: 'gs-dbl', name: '二重积分的物理应用（质量与形心）',
      tex: String.raw`M=\iint_D\rho(x,y)\,d\sigma;\qquad
\bar x=\frac{1}{M}\iint_D x\rho\,d\sigma,\quad \bar y=\frac{1}{M}\iint_D y\rho\,d\sigma`,
      cond: String.raw`$\rho$ 为面密度；均匀薄片（$\rho$ 为常数）时即形心坐标。`,
      warn: '利用对称性可直接判断形心位置（如均匀圆片形心在圆心）。',
      flag: 'verify',
      tags: ['质量', '形心', '物理应用']
    },
    {
      id: 'gs-dbl-11', sec: 'gs-dbl', name: '二重积分计算步骤',
      tex: String.raw`\text{画区域}\to\text{选坐标系}\to\text{定限（不等式组）}\to\text{化累次积分}\to\text{计算}`,
      cond: String.raw`被积函数形如 $f(x^{2}+y^{2})$ 或区域为圆域时优先极坐标。`,
      warn: '定限务必与区域不等式组一一对应；对称性要在积分前先用，能省一半计算。',
      tags: ['计算步骤', '二重积分']
    },

    /* ================= §7 微分方程 ================= */
    {
      id: 'gs-ode-1', sec: 'gs-ode', name: '微分方程的基本概念',
      tex: String.raw`\text{阶}=\text{方程中出现的最高阶导数的阶数};\quad
\text{通解}=\text{含独立常数个数}=\text{阶数的解}`,
      cond: '初始条件用于确定通解中的常数，得到特解。',
      warn: '“解”与“通解”不同：不含任意常数的是特解；验证解时要代回原方程。',
      tags: ['基本概念', '通解', '特解']
    },
    {
      id: 'gs-ode-2', sec: 'gs-ode', name: '可分离变量的方程',
      tex: String.raw`y'=f(x)g(y)\ \Rightarrow\ \int\frac{dy}{g(y)}=\int f(x)\,dx\quad(g(y)\neq0)`,
      cond: String.raw`分离后两边各自积分；$g(y)=0$ 的常数解（若有）可能在分离时丢失，需单独补回。`,
      warn: String.raw`丢解常见于两边同除以含 $y$ 的因子，最后记得检验 $g(y)=0$ 是否为解。`,
      tags: ['可分离变量', '一阶']
    },
    {
      id: 'gs-ode-3', sec: 'gs-ode', name: '齐次方程',
      tex: String.raw`y'=f\!\left(\frac{y}{x}\right):\quad
\text{令}\ u=\frac{y}{x},\ y=xu\ \Rightarrow\ u+x\frac{du}{dx}=f(u)\ \Rightarrow\ \int\frac{du}{f(u)-u}=\int\frac{dx}{x}`,
      cond: String.raw`$f(u)-u\neq0$ 时可分离；$f(u)=u$ 的特解单独讨论。`,
      tags: ['齐次方程', '一阶', '变量代换']
    },
    {
      id: 'gs-ode-4', sec: 'gs-ode', name: '可化为齐次的方程',
      tex: String.raw`y'=\frac{a_1x+b_1y+c_1}{a_2x+b_2y+c_2}:
\begin{cases}
\begin{vmatrix}a_1&b_1\\a_2&b_2\end{vmatrix}\neq0:\ \text{解}\ \begin{cases}a_1h+b_1k+c_1=0\\a_2h+b_2k+c_2=0\end{cases},\ \text{令}\ x=X+h,\ y=Y+k\\[8pt]
\begin{vmatrix}a_1&b_1\\a_2&b_2\end{vmatrix}=0:\ \text{令}\ u=a_1x+b_1y\ \text{化为可分离}
\end{cases}`,
      cond: '行列式非零时平移消去常数项；为零时两直线平行，作整体代换。',
      warn: String.raw`第一种情形解出 $(h,k)$ 后整个方程关于 $X,Y$ 变为齐次；第二种直接化为可分离变量。`,
      tags: ['可化齐次', '变量代换']
    },
    {
      id: 'gs-ode-5', sec: 'gs-ode', name: '一阶线性微分方程（齐次与非齐次）',
      tex: String.raw`\begin{aligned}
&y'+P(x)y=0\ \Rightarrow\ y=Ce^{-\int P(x)\,dx};\\
&y'+P(x)y=Q(x)\ \Rightarrow\ y=e^{-\int P(x)\,dx}\left[\int Q(x)\,e^{\int P(x)\,dx}\,dx+C\right]
\end{aligned}`,
      cond: String.raw`标准形式是 $y'+P(x)y=Q(x)$（$y'$ 系数为 1）；$P,Q$ 在相应区间上连续。`,
      warn: String.raw`公式里的 $\int P\,dx$ 只需一个原函数（不带 $C$）；套公式前先把方程化为标准形式。`,
      tags: ['一阶线性', '常数变易']
    },
    {
      id: 'gs-ode-6', sec: 'gs-ode', name: '伯努利方程',
      tex: String.raw`y'+P(x)y=Q(x)y^{n}\ (n\neq0,1):\quad
\text{令}\ z=y^{1-n}\ \Rightarrow\ z'+(1-n)P(x)z=(1-n)Q(x)`,
      cond: String.raw`两边同除 $y^{n}$ 后换元化为一阶线性。`,
      warn: String.raw`$n=0$ 或 $1$ 时已是线性方程，不必换元。`,
      tags: ['伯努利', '变量代换']
    },
    {
      id: 'gs-ode-7', sec: 'gs-ode', name: '全微分方程',
      tex: String.raw`P(x,y)\,dx+Q(x,y)\,dy=0,\quad
\frac{\partial P}{\partial y}=\frac{\partial Q}{\partial x}\ \Rightarrow\ u_x=P,\ u_y=Q\ \Rightarrow\ u(x,y)=C`,
      cond: String.raw`判定条件为 $P_y\equiv Q_x$（单连通区域上）；$u$ 可用偏积分法求出。`,
      warn: String.raw`若 $P_y\neq Q_x$ 则不是全微分方程，需另寻积分因子（大纲一般不要求）。`,
      flag: 'verify',
      tags: ['全微分方程', '恰当方程']
    },
    {
      id: 'gs-ode-8', sec: 'gs-ode', name: '可降阶：y 的 n 阶导数型',
      tex: String.raw`y^{(n)}=f(x)\ \Rightarrow\ y=\int\left[\int\cdots\left(\int f(x)\,dx\right)\cdots\right]dx
\quad(n\ \text{次积分})`,
      cond: '逐次积分，每次积分产生一个任意常数。',
      tags: ['降阶', '高阶']
    },
    {
      id: 'gs-ode-9', sec: 'gs-ode', name: '可降阶：y\'\'=f(x,y\') 型',
      tex: String.raw`y''=f(x,y'):\quad \text{令}\ p=y',\ y''=\frac{dp}{dx}\ \Rightarrow\ \frac{dp}{dx}=f(x,p)\ \text{（一阶方程）}`,
      cond: String.raw`解出 $p=p(x,C_1)$ 后再积分 $y=\int p\,dx$。`,
      warn: String.raw`此型缺 $y$，令 $p=y'$ 对 $x$ 求导；下一型缺 $x$，要改用 $y''=p\dfrac{dp}{dy}$。`,
      tags: ['降阶', '缺y']
    },
    {
      id: 'gs-ode-10', sec: 'gs-ode', name: '可降阶：y\'\'=f(y,y\') 型',
      tex: String.raw`y''=f(y,y'):\quad \text{令}\ p=y',\ y''=p\frac{dp}{dy}\ \Rightarrow\ p\frac{dp}{dy}=f(y,p)\ \text{（以}\ y\ \text{为自变量）}`,
      cond: String.raw`解出 $p=p(y,C_1)$ 后再由 $dy/dx=p$ 分离变量积分。`,
      warn: String.raw`关键是 $y''=p\,dp/dy$ 而非 $dp/dx$；两种降阶的换元目的不同。`,
      tags: ['降阶', '缺x']
    },
    {
      id: 'gs-ode-11', sec: 'gs-ode', name: '线性方程解的结构（齐次）',
      tex: String.raw`y''+p(x)y'+q(x)y=0:\quad
y=C_1y_1(x)+C_2y_2(x)\quad(y_1,y_2\ \text{线性无关})`,
      cond: String.raw`$y_1,y_2$ 线性无关（$\dfrac{y_2}{y_1}\not\equiv$ 常数）时构成二阶齐次方程的通解。`,
      warn: '两个解的比为常数时线性相关，不能直接组合成通解。',
      tags: ['解的结构', '齐次', '线性无关']
    },
    {
      id: 'gs-ode-12', sec: 'gs-ode', name: '线性方程解的结构（非齐次与叠加）',
      tex: String.raw`\begin{aligned}
&\text{非齐次通解}=\text{对应齐次通解}+ \text{一个特解}:\quad y=Y+C_1y_1+C_2y_2;\\
&f=f_1+f_2\ \Rightarrow\ y^*=y_1^*+y_2^*\ (\text{叠加原理})
\end{aligned}`,
      cond: '自由项可拆分时对每项分别求特解再相加。',
      warn: '写通解时齐次部分的任意常数不能省，特解不带任意常数。',
      tags: ['解的结构', '非齐次', '叠加']
    },
    {
      id: 'gs-ode-13', sec: 'gs-ode', name: '二阶常系数齐次线性方程的通解',
      tex: String.raw`y''+py'+qy=0,\quad r^{2}+pr+q=0:
\begin{cases}
\Delta>0:\ r_1\neq r_2\ \text{（实根）} & y=C_1e^{r_1x}+C_2e^{r_2x}\\
\Delta=0:\ r_1=r_2=r & y=(C_1+C_2x)e^{rx}\\
\Delta<0:\ r=\alpha\pm\beta i & y=e^{\alpha x}(C_1\cos\beta x+C_2\sin\beta x)
\end{cases}`,
      cond: String.raw`特征方程由 $y=e^{rx}$ 代入得到；$p,q$ 为常数。`,
      warn: String.raw`重根时必须有 $x$ 因子；复根时虚部 $\beta$ 进入三角函数。`,
      tags: ['特征方程', '常系数', '通解']
    },
    {
      id: 'gs-ode-14', sec: 'gs-ode', name: 'n 阶常系数齐次线性方程',
      tex: String.raw`y^{(n)}+p_1y^{(n-1)}+\cdots+p_{n-1}y'+p_ny=0
\ \Rightarrow\ r^{n}+p_1r^{n-1}+\cdots+p_n=0`,
      cond: String.raw`特征根与通解项的对应：$k$ 重实根 $r$ 贡献 $(C_1+\cdots+C_kx^{k-1})e^{rx}$；共轭复根 $\alpha\pm\beta i$（$k$ 重）贡献 $e^{\alpha x}$ 乘 $(\cos,\sin)$ 的 $k$ 次多项式组合。`,
      tags: ['特征方程', 'n阶']
    },
    {
      id: 'gs-ode-15', sec: 'gs-ode', name: '二阶常系数非齐次特解（形式一）',
      tex: String.raw`f(x)=P_m(x)e^{\lambda x}\ \Rightarrow\
y^*=x^{k}Q_m(x)e^{\lambda x},\quad
k=\begin{cases}
0, & \lambda\ \text{不是特征根}\\
1, & \lambda\ \text{是单特征根}\\
2, & \lambda\ \text{是二重特征根}
\end{cases}`,
      cond: String.raw`$Q_m(x)$ 是与 $P_m(x)$ 同次的待定多项式（系数用待定系数法求）；$k$ 按 $\lambda$ 作为特征根的重数取（二阶方程 $k\le2$）。`,
      warn: String.raw`先判断 $\lambda$ 是否为特征根再设特解形式，直接设 $Q_m e^{\lambda x}$ 会漏 $x^k$ 因子。`,
      tags: ['特解', '待定系数', '非齐次']
    },
    {
      id: 'gs-ode-16', sec: 'gs-ode', name: '二阶常系数非齐次特解（形式二）',
      tex: String.raw`f(x)=e^{\lambda x}\big[P_l(x)\cos\omega x+P_n(x)\sin\omega x\big]\ \Rightarrow\
y^*=x^{k}e^{\lambda x}\big[R_m(x)\cos\omega x+S_m(x)\sin\omega x\big]`,
      cond: String.raw`$m=\max\{l,n\}$；$k$ 为 $\lambda\pm\omega i$ 作为特征根的重数（二阶时取 0 或 1）。$R_m,S_m$ 为待定的 $m$ 次多项式。`,
      warn: String.raw`三角项与多项式相乘的整体都要设为同次待定多项式；$\cos$ 与 $\sin$ 必须同时出现（除非 $f$ 本身只有一项时也按此通式设）。`,
      tags: ['特解', '待定系数', '三角']
    }
  );
})();
