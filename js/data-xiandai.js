/* =========================================================
 * 考研数学二公式大全 · 线性代数公式数据
 * 字段说明同 data-gaoshu.js；含 LaTeX/撇号的字符串一律用 String.raw
 * ========================================================= */
(function () {
  const DB = (window.FORMULA_DB = window.FORMULA_DB || { chapters: [], formulas: [] });

  DB.chapters.push({
    id: 'xd',
    title: '线性代数',
    sections: [
      { id: 'xd-det', title: '行列式', hint: '展开 · 范德蒙德 · 克莱默' },
      { id: 'xd-mat', title: '矩阵', hint: '逆 · 伴随 · 初等变换 · 秩' },
      { id: 'xd-vec', title: '向量', hint: '相关无关 · 极大无关组 · 正交化' },
      { id: 'xd-eq', title: '线性方程组', hint: '解的判定 · 基础解系' },
      { id: 'xd-eig', title: '特征值与特征向量', hint: '对角化 · 实对称正交化' },
      { id: 'xd-quad', title: '二次型', hint: '标准形 · 惯性定理 · 正定' }
    ]
  });

  DB.formulas.push(
    /* ================= §1 行列式 ================= */
    {
      id: 'xd-det-1', sec: 'xd-det', name: '二、三阶行列式（对角线法则）',
      tex: String.raw`\begin{aligned}
\begin{vmatrix}a&b\\c&d\end{vmatrix}&=ad-bc;\\
\begin{vmatrix}a&b&c\\d&e&f\\g&h&i\end{vmatrix}&=aei+bfg+cdh-ceg-bdi-afh
\end{aligned}`,
      cond: '对角线法则只适用于二、三阶行列式。',
      warn: '四阶及以上严禁用对角线法则，应化三角形或按行（列）展开。',
      tags: ['对角线法则', '二阶', '三阶']
    },
    {
      id: 'xd-det-2', sec: 'xd-det', name: 'n 阶行列式的定义（逆序数）',
      tex: String.raw`|A|=\sum_{j_1j_2\cdots j_n}(-1)^{t(j_1j_2\cdots j_n)}a_{1j_1}a_{2j_2}\cdots a_{nj_n}`,
      cond: String.raw`求和取遍 $1,2,\ldots,n$ 的全排列；$t$ 为逆序数，$(-1)^t$ 为符号。`,
      warn: '定义用于理论分析；实际计算用性质与展开，不必逐项展开。',
      tags: ['定义', '逆序数']
    },
    {
      id: 'xd-det-3', sec: 'xd-det', name: '行列式的基本性质',
      tex: String.raw`\begin{aligned}
&|A^{T}|=|A|;\quad \text{互换两行（列）变号};\quad
\text{某行（列）公因子可提出};\\
&\text{某行（列）乘 }k\text{ 加到另一行（列），值不变};\quad
\text{两行（列）成比例，值为 }0;\\
&\text{分行（列）可加性}:\ \begin{vmatrix}\boldsymbol{\alpha}+\boldsymbol{\beta}&\cdots\end{vmatrix}
=\begin{vmatrix}\boldsymbol{\alpha}&\cdots\end{vmatrix}+\begin{vmatrix}\boldsymbol{\beta}&\cdots\end{vmatrix}
\end{aligned}`,
      cond: '以上是对行叙述的，对列同样成立。',
      warn: '“某行乘 k 加到另一行”值不变，是化三角形的主要工具；“某行乘 k”才是变号/提因子。',
      tags: ['性质', '行变换']
    },
    {
      id: 'xd-det-4', sec: 'xd-det', name: '行列式按行（列）展开',
      tex: String.raw`|A|=\sum_{k=1}^{n}a_{ik}A_{ik}\ (\text{按第}\ i\ \text{行}),\qquad
|A|=\sum_{k=1}^{n}a_{k j}A_{kj}\ (\text{按第}\ j\ \text{列})`,
      cond: String.raw`$A_{ij}=(-1)^{i+j}M_{ij}$ 为代数余子式，$M_{ij}$ 为余子式。`,
      warn: String.raw`另一行（列）的代数余子式与本行元素相乘之和为 0：$\sum_k a_{ik}A_{jk}=0\ (i\neq j)$。`,
      tags: ['展开', '代数余子式']
    },
    {
      id: 'xd-det-5', sec: 'xd-det', name: '代数余子式的重要特点',
      tex: String.raw`A_{ij}\ \text{只与第}\ i\ \text{行（或第}\ j\ \text{列）以外的元素有关，与}\ a_{ij}\ \text{本身无关}`,
      cond: '常用于按行展开时先算余子式再乘元素。',
      warn: '计算某元素的代数余子式时，可以随便替换该元素的值而不影响结果。',
      tags: ['代数余子式', '余子式']
    },
    {
      id: 'xd-det-6', sec: 'xd-det', name: '范德蒙德行列式',
      tex: String.raw`\begin{vmatrix}
1&1&\cdots&1\\
x_1&x_2&\cdots&x_n\\
x_1^{2}&x_2^{2}&\cdots&x_n^{2}\\
\vdots&\vdots&&\vdots\\
x_1^{n-1}&x_2^{n-1}&\cdots&x_n^{n-1}
\end{vmatrix}
=\prod_{1\le j<i\le n}(x_i-x_j)`,
      cond: String.raw`各列第一行为 1、往下按 $x_i$ 的幂次递增；结果为所有 $(x_i-x_j)$（$i>j$）之积。`,
      warn: String.raw`若出现 $x_i=x_j$ 则行列式为 0（两列相同）；注意幂次排列方向，反向时差一个符号。`,
      tags: ['范德蒙德']
    },
    {
      id: 'xd-det-7', sec: 'xd-det', name: '行列式的乘法与数乘',
      tex: String.raw`|AB|=|A||B|,\qquad |A^{m}|=|A|^{m},\qquad |kA|=k^{n}|A|\ (n\ \text{阶})`,
      cond: String.raw`$A,B$ 为同阶方阵；$kA$ 是每个元素都乘 $k$。`,
      warn: String.raw`$|kA|=k^{n}|A|$ 不是 $k|A|$，这是高频错误。`,
      tags: ['乘积', '数乘', '易错']
    },
    {
      id: 'xd-det-8', sec: 'xd-det', name: '行列式与逆、伴随的关系',
      tex: String.raw`|A^{-1}|=\frac{1}{|A|},\qquad |A^{*}|=|A|^{n-1},\qquad |A^{T}|=|A|`,
      cond: String.raw`$A$ 可逆时 $|A|\neq0$；$A^*$ 为伴随矩阵（$n\ge2$）。`,
      warn: String.raw`$|A^*|=|A|^{n-1}$ 中指数是 $n-1$，当 $|A|=0$ 时该式仍成立。`,
      tags: ['逆', '伴随', '转置']
    },
    {
      id: 'xd-det-9', sec: 'xd-det', name: '分块行列式',
      tex: String.raw`\begin{vmatrix}A&O\\O&B\end{vmatrix}=|A||B|,\qquad
\begin{vmatrix}A&C\\O&B\end{vmatrix}=|A||B|,\qquad
\begin{vmatrix}O&A\\B&O\end{vmatrix}=(-1)^{mn}|A||B|`,
      cond: String.raw`$A$ 为 $m$ 阶、$B$ 为 $n$ 阶方阵；副对角分块时的符号为 $(-1)^{mn}$。`,
      warn: String.raw`副对角分块不要忘记符号因子；副对角分块不可直接等于 $|A||B|$。`,
      tags: ['分块行列式']
    },
    {
      id: 'xd-det-10', sec: 'xd-det', name: '上（下）三角行列式',
      tex: String.raw`\begin{vmatrix}
a_{11}&*&&\\
&\ddots&*\\
&&a_{nn}
\end{vmatrix}=a_{11}a_{22}\cdots a_{nn}`,
      cond: '上/下三角行列式等于主对角线元素之积；这是化行列式的常用目标。',
      tags: ['三角行列式']
    },
    {
      id: 'xd-det-11', sec: 'xd-det', name: '克莱默法则',
      tex: String.raw`A\boldsymbol{x}=\boldsymbol{b},\ |A|\neq0\ \Rightarrow\
x_j=\frac{D_j}{D}\ (j=1,\ldots,n)`,
      cond: String.raw`$D=|A|$，$D_j$ 为把 $A$ 的第 $j$ 列换成 $\boldsymbol b$ 后的行列式；仅适用于方程个数=未知数个数且 $|A|\neq0$。`,
      warn: String.raw`理论意义大于计算价值：$n$ 大时计算量巨大，实际解方程用高斯消元。`,
      tags: ['克莱默法则']
    },
    {
      id: 'xd-det-12', sec: 'xd-det', name: '行列式计算常用技巧',
      tex: String.raw`\text{化三角形}\ /\ \text{按零多的行（列）展开}\ /\ \text{递推法}\ /\ \text{拆分法}\ /\ \text{加边法}`,
      cond: '有公因子先提；有成比例先用性质化 0；某行（列）1 多时考虑展开或加边。',
      warn: '交换行会变号，计算时要记录交换次数以定最终符号。',
      tags: ['计算技巧']
    },

    /* ================= §2 矩阵 ================= */
    {
      id: 'xd-mat-1', sec: 'xd-mat', name: '矩阵乘法的定义与运算律',
      tex: String.raw`C=AB:\quad c_{ij}=\sum_{k=1}^{s}a_{ik}b_{kj};\qquad
(AB)C=A(BC),\quad A(B+C)=AB+AC`,
      cond: String.raw`$A$ 为 $m\times s$、$B$ 为 $s\times n$ 时 $AB$ 才有意义（$A$ 的列数=$B$ 的行数）。`,
      warn: String.raw`矩阵乘法一般不满足交换律：$AB\neq BA$；消去律也不成立（$AB=AC\nRightarrow B=C$）。`,
      tags: ['乘法', '运算律']
    },
    {
      id: 'xd-mat-2', sec: 'xd-mat', name: '转置的运算性质',
      tex: String.raw`(A+B)^{T}=A^{T}+B^{T},\quad (kA)^{T}=kA^{T},\quad (AB)^{T}=B^{T}A^{T},\quad (A^{T})^{T}=A`,
      cond: '乘积转置要反序。',
      tags: ['转置']
    },
    {
      id: 'xd-mat-3', sec: 'xd-mat', name: '逆矩阵的运算性质',
      tex: String.raw`\begin{aligned}
&(AB)^{-1}=B^{-1}A^{-1},\qquad (A^{k})^{-1}=(A^{-1})^{k},\\
&(A^{T})^{-1}=(A^{-1})^{T},\qquad (kA)^{-1}=\frac{1}{k}A^{-1}\ (k\neq0)
\end{aligned}`,
      cond: String.raw`式中矩阵均可逆；乘积可逆时每个因子都可逆。`,
      warn: String.raw`乘积求逆反序，与转置相同；$(A+B)^{-1}\neq A^{-1}+B^{-1}$。`,
      tags: ['逆矩阵', '运算性质']
    },
    {
      id: 'xd-mat-4', sec: 'xd-mat', name: '方阵可逆的充要条件',
      tex: String.raw`A\ \text{可逆}\iff
\begin{cases}
|A|\neq0\\
r(A)=n\ (\text{满秩})\\
A\boldsymbol{x}=\boldsymbol{0}\ \text{只有零解}\\
A\boldsymbol{x}=\boldsymbol{b}\ \text{对任意}\ \boldsymbol{b}\ \text{有唯一解}\\
A\ \text{可表示为有限个初等矩阵之积}\\
A\ \text{的行（列）向量组线性无关}
\end{cases}`,
      cond: '以上任意一条都可作判可逆的入口。',
      warn: String.raw`抽象矩阵判可逆优先想行列式与秩；$AB=E$（同阶方阵）即 $A,B$ 互逆。`,
      tags: ['可逆', '充要条件']
    },
    {
      id: 'xd-mat-5', sec: 'xd-mat', name: '伴随矩阵的定义',
      tex: String.raw`A^{*}=\begin{pmatrix}
A_{11}&A_{21}&\cdots&A_{n1}\\
A_{12}&A_{22}&\cdots&A_{n2}\\
\vdots&\vdots&&\vdots\\
A_{1n}&A_{2n}&\cdots&A_{nn}
\end{pmatrix}`,
      cond: String.raw`$A_{ij}$ 为 $a_{ij}$ 的代数余子式；注意伴随是“余子式矩阵的转置”。`,
      warn: '定义里已经转置过了，不要再转置一次；二阶时主对角换位、副对角变号。',
      tags: ['伴随矩阵', '定义']
    },
    {
      id: 'xd-mat-6', sec: 'xd-mat', name: '伴随矩阵的核心公式',
      tex: String.raw`\begin{aligned}
&AA^{*}=A^{*}A=|A|E;\\
&A^{-1}=\frac{A^{*}}{|A|}\ (|A|\neq0);\qquad (A^{*})^{*}=|A|^{n-2}A;\\
&(AB)^{*}=B^{*}A^{*};\qquad (kA)^{*}=k^{n-1}A^{*};\qquad |A^{*}|=|A|^{n-1}
\end{aligned}`,
      cond: String.raw`$A$ 为 $n$ 阶方阵，$n\ge2$；各式均在相应有意义时成立。`,
      warn: String.raw`凡带 $A^*$ 的题先写 $AA^*=|A|E$；$(AB)^*$ 反序与求逆、转置一致。`,
      tags: ['伴随矩阵', '核心公式']
    },
    {
      id: 'xd-mat-7', sec: 'xd-mat', name: '伴随矩阵的秩',
      tex: String.raw`r(A^{*})=\begin{cases}
n, & r(A)=n\ (|A|\neq0)\\
1, & r(A)=n-1\\
0, & r(A)<n-1
\end{cases}\quad(n\ge2)`,
      cond: String.raw`$n\ge2$；$r(A)=n-1$ 时 $A^*\neq O$ 但 $AA^*=|A|E=O$，故秩为 1。`,
      warn: String.raw`$r(A)=n-1$ 是“伴随秩为 1”而非 0，这一步最易错。`,
      tags: ['伴随矩阵', '秩']
    },
    {
      id: 'xd-mat-8', sec: 'xd-mat', name: '求逆公式（低阶与伴随法）',
      tex: String.raw`\begin{pmatrix}a&b\\c&d\end{pmatrix}^{-1}
=\frac{1}{ad-bc}\begin{pmatrix}d&-b\\-c&a\end{pmatrix},\qquad
A^{-1}=\frac{A^{*}}{|A|}\ (|A|\neq0)`,
      cond: String.raw`二阶公式要求 $ad-bc\neq0$；伴随法适合 $n\le3$ 或理论推导。`,
      warn: '二阶求逆口诀“主对角换位、副对角变号，再除以行列式”。',
      tags: ['求逆', '二阶', '伴随']
    },
    {
      id: 'xd-mat-9', sec: 'xd-mat', name: '初等行变换求逆（广义 Gauss-Jordan）',
      tex: String.raw`(A\mid E)\ \xrightarrow{\text{初等行变换}}\ (E\mid A^{-1})`,
      cond: String.raw`$A$ 可逆；对增广矩阵只作行变换，不能混入列变换。`,
      warn: String.raw`若变换过程中 $A$ 侧出现全零行，则 $A$ 不可逆，变换失败。`,
      tags: ['求逆', '初等行变换']
    },
    {
      id: 'xd-mat-10', sec: 'xd-mat', name: '分块求逆',
      tex: String.raw`\begin{pmatrix}A&O\\O&B\end{pmatrix}^{-1}
=\begin{pmatrix}A^{-1}&O\\O&B^{-1}\end{pmatrix},\qquad
\begin{pmatrix}A&C\\O&B\end{pmatrix}^{-1}
=\begin{pmatrix}A^{-1}&-A^{-1}CB^{-1}\\O&B^{-1}\end{pmatrix}`,
      cond: String.raw`$A,B$ 均可逆；第二个公式中 $A,B$ 可为不同阶方阵。`,
      warn: String.raw`副对角分块求逆要交换位置：$\begin{pmatrix}O&A\\B&O\end{pmatrix}^{-1}=\begin{pmatrix}O&B^{-1}\\A^{-1}&O\end{pmatrix}$。`,
      tags: ['分块', '求逆']
    },
    {
      id: 'xd-mat-11', sec: 'xd-mat', name: '三种初等矩阵及其逆',
      tex: String.raw`E_{ij}^{-1}=E_{ij},\qquad E_i(c)^{-1}=E_i(c^{-1}),\qquad E_{ij}(c)^{-1}=E_{ij}(-c)`,
      cond: String.raw`$E_{ij}$ 交换 $i,j$ 行（列）；$E_i(c)$ 第 $i$ 行乘 $c$（$c\neq0$）；$E_{ij}(c)$ 第 $j$ 行乘 $c$ 加到第 $i$ 行。`,
      warn: '交换型与倍加型的逆是自身或反号；倍乘型的逆是倒数。',
      tags: ['初等矩阵', '求逆']
    },
    {
      id: 'xd-mat-12', sec: 'xd-mat', name: '初等矩阵与初等变换的关系',
      tex: String.raw`\text{左乘初等矩阵}\Leftrightarrow\text{作相应的行变换};\qquad
\text{右乘初等矩阵}\Leftrightarrow\text{作相应的列变换}`,
      cond: String.raw`$A\ \text{可逆}\iff A=P_1P_2\cdots P_s\ (\text{初等矩阵之积})\iff PAQ=E\ (\text{某}\ P,Q)$.`,
      warn: String.raw`解方程 $AX=B$ 时对 $(A\mid B)$ 作行变换同时作用于两边，这就是“左乘”的含义。`,
      tags: ['初等矩阵', '行变换', '列变换']
    },
    {
      id: 'xd-mat-13', sec: 'xd-mat', name: '矩阵方程的解法',
      tex: String.raw`AX=B\Rightarrow X=A^{-1}B;\qquad
XA=B\Rightarrow X=BA^{-1};\qquad
AXB=C\Rightarrow X=A^{-1}CB^{-1}`,
      cond: String.raw`$A,B$ 可逆；注意左右位置：$A^{-1}$ 只能左乘，$B^{-1}$ 只能右乘。`,
      warn: '系数在左就左乘逆、在右就右乘逆，顺序不能颠倒。',
      tags: ['矩阵方程']
    },
    {
      id: 'xd-mat-14', sec: 'xd-mat', name: '对称矩阵与反对称矩阵',
      tex: String.raw`A^{T}=A\ (\text{对称});\qquad A^{T}=-A\ (\text{反对称});\qquad
A=\frac{A+A^{T}}{2}+\frac{A-A^{T}}{2}`,
      cond: String.raw`反对称矩阵主对角元全为 0；任意方阵可唯一分解为对称+反对称。`,
      warn: String.raw`实对称矩阵是特征值、二次型理论的核心对象；两个对称矩阵之积不一定对称（$AB=BA$ 时才对称）。`,
      tags: ['对称', '反对称']
    },
    {
      id: 'xd-mat-15', sec: 'xd-mat', name: '正交矩阵',
      tex: String.raw`Q^{T}Q=QQ^{T}=E\ \Leftrightarrow\ Q^{-1}=Q^{T}\ \Rightarrow\ |Q|=\pm1`,
      cond: String.raw`$Q$ 的行（列）向量组均为标准正交向量组。`,
      warn: String.raw`正交矩阵的列向量两两正交且单位化，这一条常用于验证/构造 $Q$。`,
      tags: ['正交矩阵']
    },
    {
      id: 'xd-mat-16', sec: 'xd-mat', name: '矩阵多项式展开（注意交换律）',
      tex: String.raw`(A+B)^{2}=A^{2}+AB+BA+B^{2},\qquad
(A+B)(A-B)=A^{2}-AB+BA-B^{2}`,
      cond: String.raw`仅当 $AB=BA$ 时才能写成 $A^2+2AB+B^2$、$A^2-B^2$ 等“数式”形状。`,
      warn: String.raw`线代中矩阵一般不交换，展开时 $AB$ 与 $BA$ 必须分开保留。`,
      tags: ['多项式', '交换律', '易错']
    },
    {
      id: 'xd-mat-17', sec: 'xd-mat', name: '矩阵乘积为零时的秩',
      tex: String.raw`AB=O\ \Rightarrow\ r(A)+r(B)\le n`,
      cond: String.raw`$A$ 为 $m\times n$、$B$ 为 $n\times s$；结论由 $B$ 的列向量是 $Ax=0$ 的解得到。`,
      warn: String.raw`$AB=O$ 推不出 $A=O$ 或 $B=O$；只能得到秩的不等式。`,
      tags: ['乘积为零', '秩不等式']
    },
    {
      id: 'xd-mat-18', sec: 'xd-mat', name: '矩阵秩的基本性质',
      tex: String.raw`\begin{aligned}
&0\le r(A_{m\times n})\le\min\{m,n\},\qquad r(A^{T})=r(A),\qquad r(kA)=r(A)\ (k\neq0);\\
&r(A+B)\le r(A)+r(B),\qquad r(AB)\le\min\{r(A),r(B)\};\\
&P,Q\ \text{可逆}\Rightarrow r(PAQ)=r(A),\qquad r(AA^{T})=r(A^{T}A)=r(A)\ (\text{实矩阵})
\end{aligned}`,
      cond: String.raw`$P,Q$ 为可逆方阵时称为“乘可逆矩阵不改变秩”。`,
      tags: ['秩', '不等式']
    },
    {
      id: 'xd-mat-19', sec: 'xd-mat', name: '矩阵等价',
      tex: String.raw`A,B\ \text{同型}\ \Rightarrow\ A\sim B\iff r(A)=r(B)\iff PAQ=B\ (P,Q\ \text{可逆})`,
      cond: '等价只看秩；与相似、合同是不同概念。',
      warn: '同型矩阵等价 ⟺ 秩相同；方阵相似/合同都蕴含等价，反之不然。',
      tags: ['等价']
    },

    /* ================= §3 向量 ================= */
    {
      id: 'xd-vec-1', sec: 'xd-vec', name: '线性表示与线性组合',
      tex: String.raw`\boldsymbol\beta=k_1\boldsymbol\alpha_1+\cdots+k_s\boldsymbol\alpha_s
\ \Rightarrow\ \boldsymbol\beta\ \text{可由}\ \boldsymbol\alpha_1,\ldots,\boldsymbol\alpha_s\ \text{线性表示}`,
      cond: String.raw`系数 $k_1,\ldots,k_s$ 为任意常数；零向量可由任意向量组线性表示。`,
      tags: ['线性表示', '组合']
    },
    {
      id: 'xd-vec-2', sec: 'xd-vec', name: '线性相关与线性无关的定义',
      tex: String.raw`\begin{aligned}
&\text{相关}:\ \exists\ \text{不全为零的}\ k_1,\ldots,k_s:\ k_1\boldsymbol\alpha_1+\cdots+k_s\boldsymbol\alpha_s=\boldsymbol0;\\
&\text{无关}:\ k_1\boldsymbol\alpha_1+\cdots+k_s\boldsymbol\alpha_s=\boldsymbol0\ \text{仅当}\ k_1=\cdots=k_s=0
\end{aligned}`,
      cond: '定义针对同一向量组；比较时注意向量维数与个数。',
      warn: String.raw`含零向量的向量组必相关；只有一个向量时：$\boldsymbol\alpha=\boldsymbol0$ 相关、$\boldsymbol\alpha\neq\boldsymbol0$ 无关。`,
      tags: ['线性相关', '线性无关', '定义']
    },
    {
      id: 'xd-vec-3', sec: 'xd-vec', name: '线性相关的等价说法',
      tex: String.raw`\boldsymbol\alpha_1,\ldots,\boldsymbol\alpha_s\ \text{相关}\iff
\begin{cases}
\text{其中至少一个向量可由其余向量线性表示}\\
\exists\,j:\ \boldsymbol\alpha_j\ \text{可由}\ \boldsymbol\alpha_1,\ldots,\boldsymbol\alpha_{j-1}\ \text{表示（某向量“多余”）}
\end{cases}`,
      cond: '“相关”即“有多余的向量”；“无关”即“个个独立、无冗余”。',
      tags: ['线性相关', '等价说法']
    },
    {
      id: 'xd-vec-4', sec: 'xd-vec', name: '向量组相关性的行列式判别',
      tex: String.raw`n\ \text{个}\ n\ \text{维向量}\ \boldsymbol\alpha_1,\ldots,\boldsymbol\alpha_n:
\quad
\begin{vmatrix}\boldsymbol\alpha_1&\cdots&\boldsymbol\alpha_n\end{vmatrix}
\begin{cases}=0:\ \text{相关}\\ \neq0:\ \text{无关}\end{cases}`,
      cond: String.raw`仅适用于“个数=维数”的方阵情形；把向量按列排成 $A$ 判 $|A|$。`,
      warn: String.raw`非方阵时行列式用不上，改用秩：$r<n$ 相关、$r=n$ 无关（把向量按列拼成矩阵）。`,
      tags: ['行列式判别', '方阵']
    },
    {
      id: 'xd-vec-5', sec: 'xd-vec', name: '向量个数与维数的关系',
      tex: String.raw`s\ \text{个}\ n\ \text{维向量}:\quad s>n\ \Rightarrow\ \text{必相关};\qquad s=n\ \text{且}\ |A|\neq0\ \Rightarrow\ \text{无关}`,
      cond: String.raw`$s$ 个 $n$ 维列向量拼成 $m\times s$ 型矩阵 $A$ 时用 $r(A)$ 判定更通用。`,
      warn: '“个数 > 维数必相关”是快捷结论；维数相同但非方阵时只能靠秩。',
      tags: ['维数', '个数']
    },
    {
      id: 'xd-vec-6', sec: 'xd-vec', name: '相关性与齐次方程组的关系',
      tex: String.raw`A=[\boldsymbol\alpha_1,\ldots,\boldsymbol\alpha_s]:\quad
A\boldsymbol{x}=\boldsymbol0\ \text{有非零解}\iff\boldsymbol\alpha_1,\ldots,\boldsymbol\alpha_s\ \text{线性相关}`,
      cond: String.raw`$A$ 的列向量即 $\boldsymbol\alpha_i$；$r(A)<s$ 时有非零解。`,
      warn: String.raw`相关系数向量 $x$ 就是齐次方程组的非零解，这是向量与方程组之间的桥梁。`,
      tags: ['齐次方程组', '相关性']
    },
    {
      id: 'xd-vec-7', sec: 'xd-vec', name: '线性表示与秩的关系',
      tex: String.raw`\boldsymbol\beta\ \text{可由}\ \boldsymbol\alpha_1,\ldots,\boldsymbol\alpha_s\ \text{表示}
\iff r(\boldsymbol\alpha_1,\ldots,\boldsymbol\alpha_s)
=r(\boldsymbol\alpha_1,\ldots,\boldsymbol\alpha_s,\boldsymbol\beta)`,
      cond: String.raw`表示法唯一 $\iff \boldsymbol\alpha_1,\ldots,\boldsymbol\alpha_s$ 无关。`,
      warn: String.raw`“可表示”不改变秩；把 $\boldsymbol\beta$ 拼进去后秩若增大则不可表示。`,
      tags: ['线性表示', '秩']
    },
    {
      id: 'xd-vec-8', sec: 'xd-vec', name: '向量组的秩与极大线性无关组',
      tex: String.raw`r(\boldsymbol\alpha_1,\ldots,\boldsymbol\alpha_s)=\text{极大线性无关组所含向量个数}
=\text{向量组的秩}`,
      cond: '极大无关组一般不唯一，但个数唯一；其余向量均可由它线性表示。',
      warn: '求极大无关组：按列拼矩阵→行变换化阶梯→阶梯列对应的原向量即为一组极大无关组。',
      tags: ['极大无关组', '秩']
    },
    {
      id: 'xd-vec-9', sec: 'xd-vec', name: '向量组等价',
      tex: String.raw`(\mathrm I)\ \text{与}\ (\mathrm{II})\ \text{等价}\iff
\text{双方可互相线性表示}\iff
r(\mathrm I)=r(\mathrm{II})=r\big((\mathrm I),(\mathrm{II})\big)`,
      cond: '等价是“互相表示”；只单向可表示不一定等价。',
      warn: '两向量组等价必秩相等，但秩相等的两个向量组未必等价（维数可以不同）。',
      tags: ['等价', '向量组']
    },
    {
      id: 'xd-vec-10', sec: 'xd-vec', name: '无关组被表示时的个数限制',
      tex: String.raw`(\mathrm I)\ \text{无关},\ (\mathrm I)\ \text{可由}\ (\mathrm{II})\ \text{线性表示}
\ \Rightarrow\ r(\mathrm I)\le r(\mathrm{II}),\ \text{且}\ |\mathrm I|\le|\mathrm{II}|\ \text{在}\ (\mathrm{II})\ \text{无关时成立}`,
      cond: String.raw`常用推论：若 $(\mathrm I)$ 可由 $(\mathrm{II})$ 表示且 $(\mathrm I)$ 无关，则 $|\mathrm I|\le r(\mathrm{II})$。`,
      warn: '证明题高频：“无关组的向量个数不超过相关组的秩”是维数/个数比较的来源。',
      tags: ['个数限制', '证明']
    },
    {
      id: 'xd-vec-11', sec: 'xd-vec', name: '内积与长度',
      tex: String.raw`(\boldsymbol\alpha,\boldsymbol\beta)=\sum_{i=1}^{n}a_ib_i=\boldsymbol\alpha^{T}\boldsymbol\beta,\qquad
\|\boldsymbol\alpha\|=\sqrt{(\boldsymbol\alpha,\boldsymbol\alpha)}`,
      cond: '内积满足交换律、线性性、正定性。',
      warn: String.raw`长度为 0 当且仅当零向量；单位化 $\boldsymbol\alpha^{0}=\boldsymbol\alpha/\|\boldsymbol\alpha\|$。`,
      tags: ['内积', '长度', '范数']
    },
    {
      id: 'xd-vec-12', sec: 'xd-vec', name: '夹角与正交',
      tex: String.raw`\cos\theta=\frac{(\boldsymbol\alpha,\boldsymbol\beta)}{\|\boldsymbol\alpha\|\,\|\boldsymbol\beta\|};\qquad
\boldsymbol\alpha\perp\boldsymbol\beta\iff(\boldsymbol\alpha,\boldsymbol\beta)=0`,
      cond: String.raw`$\boldsymbol\alpha,\boldsymbol\beta$ 均非零向量；零向量与任何向量内积为 0。`,
      tags: ['夹角', '正交']
    },
    {
      id: 'xd-vec-13', sec: 'xd-vec', name: '施密特正交化',
      tex: String.raw`\begin{aligned}
&\boldsymbol\beta_1=\boldsymbol\alpha_1;\\
&\boldsymbol\beta_2=\boldsymbol\alpha_2-\frac{(\boldsymbol\alpha_2,\boldsymbol\beta_1)}{(\boldsymbol\beta_1,\boldsymbol\beta_1)}\boldsymbol\beta_1;\\
&\boldsymbol\beta_3=\boldsymbol\alpha_3-\frac{(\boldsymbol\alpha_3,\boldsymbol\beta_1)}{(\boldsymbol\beta_1,\boldsymbol\beta_1)}\boldsymbol\beta_1
-\frac{(\boldsymbol\alpha_3,\boldsymbol\beta_2)}{(\boldsymbol\beta_2,\boldsymbol\beta_2)}\boldsymbol\beta_2
\end{aligned}`,
      cond: String.raw`输入 $\boldsymbol\alpha_i$ 线性无关；正交化后再单位化即得标准正交基。`,
      warn: String.raw`施密特只改变向量的“方向组合”不改变张成空间；投影系数分母是 $(\boldsymbol\beta_j,\boldsymbol\beta_j)$。`,
      tags: ['施密特', '正交化']
    },
    {
      id: 'xd-vec-14', sec: 'xd-vec', name: '标准正交向量组的判定',
      tex: String.raw`Q=[\boldsymbol q_1,\ldots,\boldsymbol q_n]\ \text{为正交矩阵}\iff
(\boldsymbol q_i,\boldsymbol q_j)=\delta_{ij}=\begin{cases}1,&i=j\\0,&i\neq j\end{cases}`,
      cond: '即列向量两两正交且均为单位向量。',
      tags: ['标准正交', '判定']
    },

    /* ================= §4 线性方程组 ================= */
    {
      id: 'xd-eq-1', sec: 'xd-eq', name: '齐次方程组有非零解的条件',
      tex: String.raw`A_{m\times n}\boldsymbol x=\boldsymbol0\ \text{有非零解}
\iff r(A)<n\ (\text{未知数个数});
\quad A\ \text{为方阵}\iff|A|=0`,
      cond: String.raw`$n$ 为未知量个数（列数）。`,
      warn: '齐次方程组必有零解；“有非零解”等价于“系数矩阵不满秩”。',
      tags: ['齐次', '非零解']
    },
    {
      id: 'xd-eq-2', sec: 'xd-eq', name: '基础解系与解的结构（齐次）',
      tex: String.raw`A\boldsymbol x=\boldsymbol0:\quad
\text{解空间维数}=n-r(A),\quad
\boldsymbol x=k_1\boldsymbol\xi_1+\cdots+k_{n-r}\boldsymbol\xi_{n-r}`,
      cond: String.raw`$\boldsymbol\xi_1,\ldots,\boldsymbol\xi_{n-r}$ 为一个基础解系（解集的极大无关组）。`,
      warn: String.raw`基础解系含 $n-r(A)$ 个向量，不能多也不能少；写通解时 $k_i$ 为任意常数。`,
      tags: ['基础解系', '齐次通解']
    },
    {
      id: 'xd-eq-3', sec: 'xd-eq', name: '非齐次方程组解的判定',
      tex: String.raw`A\boldsymbol x=\boldsymbol b:
\begin{cases}
r(A)\neq r(A\mid\boldsymbol b):\ \text{无解}\\
r(A)=r(A\mid\boldsymbol b)=n:\ \text{唯一解}\\
r(A)=r(A\mid\boldsymbol b)<n:\ \text{无穷多解}
\end{cases}`,
      cond: String.raw`$(A\mid\boldsymbol b)$ 为增广矩阵；$n$ 为未知数个数。`,
      warn: String.raw`先比 $r(A)$ 与 $r(A\mid b)$（判有无解），再与 $n$ 比（判唯一还是无穷）。`,
      tags: ['非齐次', '解的判定']
    },
    {
      id: 'xd-eq-4', sec: 'xd-eq', name: '非齐次方程组解的结构',
      tex: String.raw`\boldsymbol x=\boldsymbol\eta^*+k_1\boldsymbol\xi_1+\cdots+k_{n-r}\boldsymbol\xi_{n-r}
\quad(\text{特解}+\text{对应齐次通解})`,
      cond: String.raw`$\boldsymbol\eta^*$ 为 $A\boldsymbol x=\boldsymbol b$ 的任一特解；$\boldsymbol\xi_i$ 为 $A\boldsymbol x=\boldsymbol0$ 的基础解系。`,
      warn: '两个非齐次解之差是对应齐次方程组的解；齐次解加非齐次特解仍为非齐次解。',
      tags: ['解的结构', '特解']
    },
    {
      id: 'xd-eq-5', sec: 'xd-eq', name: '解的性质（可直接用于抽象题）',
      tex: String.raw`\begin{aligned}
&A\boldsymbol\xi_1=0,\ A\boldsymbol\xi_2=0\ \Rightarrow\ A(k_1\boldsymbol\xi_1+k_2\boldsymbol\xi_2)=0;\\
&A\boldsymbol\eta_1=\boldsymbol b,\ A\boldsymbol\eta_2=\boldsymbol b\ \Rightarrow\ A(\boldsymbol\eta_1-\boldsymbol\eta_2)=0;\\
&A\boldsymbol\eta=\boldsymbol b,\ A\boldsymbol\xi=0\ \Rightarrow\ A(\boldsymbol\eta+k\boldsymbol\xi)=\boldsymbol b
\end{aligned}`,
      tags: ['解的性质', '抽象']
    },
    {
      id: 'xd-eq-6', sec: 'xd-eq', name: '求解线性方程组的步骤',
      tex: String.raw`\text{写增广矩阵}\to\text{只用行变换化阶梯形}\to\text{读}\ r(A),r(A|b)\to\text{回代或写通解}`,
      cond: String.raw`阶梯形中非零行个数即秩；自由变量取 $n-r$ 个。`,
      warn: '不能对增广矩阵作列变换；自由变量赋值时每次只让一个为 1、其余为 0，保证所得齐次解线性无关。',
      tags: ['求解步骤', '高斯消元']
    },
    {
      id: 'xd-eq-7', sec: 'xd-eq', name: '解的个数与参数讨论要点',
      tex: String.raw`\text{含参方程组：}\quad
\begin{cases}
r(A\mid b)>r(A): \text{无解（参数取何值时出现全零行而}b\text{列非零）}\\
r(A)=r(A\mid b)<n: \text{无穷多解}\\
r(A)=r(A\mid b)=n: \text{唯一解}
\end{cases}`,
      cond: String.raw`对含参数行列式：$|A|\neq0$ 先得唯一解，再讨论 $|A|=0$ 的其余情形（不要漏解）。`,
      warn: String.raw`$|A|=0$ 只是“可能无穷多解或无解”，必须再用 $r(A\mid b)$ 区分。`,
      tags: ['参数', '讨论']
    },

    /* ================= §5 特征值与特征向量 ================= */
    {
      id: 'xd-eig-1', sec: 'xd-eig', name: '特征值与特征向量的定义',
      tex: String.raw`A\boldsymbol\xi=\lambda\boldsymbol\xi,\qquad \boldsymbol\xi\neq\boldsymbol0`,
      cond: String.raw`$\lambda$ 为特征值，$\boldsymbol\xi$ 为属于 $\lambda$ 的特征向量（非零！）。`,
      warn: '特征向量一定非零；同一特征值的特征向量有无穷多个（含任意非零倍）。',
      tags: ['定义', '特征值', '特征向量']
    },
    {
      id: 'xd-eig-2', sec: 'xd-eig', name: '特征方程',
      tex: String.raw`|\lambda E-A|=0\quad(\text{特征方程}),\qquad
|\lambda E-A|\ \text{为特征多项式}`,
      cond: String.raw`$A$ 为 $n$ 阶方阵时 $|\lambda E-A|$ 是 $\lambda$ 的 $n$ 次多项式，恰有 $n$ 个特征值（含重根、复根）。`,
      warn: String.raw`写 $|\lambda E-A|$ 而非 $|A-\lambda E|$（两者差 $(-1)^n$，展开时常数项符号易错）。`,
      tags: ['特征方程', '特征多项式']
    },
    {
      id: 'xd-eig-3', sec: 'xd-eig', name: '特征向量的求法',
      tex: String.raw`\lambda_0\ \text{已求出}:\quad
(\lambda_0E-A)\boldsymbol x=\boldsymbol0\ \text{的非零解即属于}\ \lambda_0\ \text{的特征向量}`,
      cond: String.raw`$\lambda_0$ 为 $k$ 重特征值时，该齐次方程组解空间维数（几何重数）$1\le k_0\le k$。`,
      warn: '忘记写“非零”是常见失分点；求出的基础解系要说明它们都是特征向量（任意非零组合）。',
      tags: ['求法', '特征向量']
    },
    {
      id: 'xd-eig-4', sec: 'xd-eig', name: '特征值的性质（和与积）',
      tex: String.raw`\sum_{i=1}^{n}\lambda_i=\operatorname{tr}(A)=\sum_{i=1}^{n}a_{ii},\qquad
\prod_{i=1}^{n}\lambda_i=|A|`,
      cond: String.raw`$\lambda_i$ 按重数计；由此 $|A|=0\iff$ 至少一个特征值为 0。`,
      warn: '抽象矩阵题常靠“迹=特征值之和”“行列式=特征值之积”快速求值。',
      tags: ['迹', '行列式', '特征值']
    },
    {
      id: 'xd-eig-5', sec: 'xd-eig', name: '矩阵多项式的特征值',
      tex: String.raw`\lambda\ \text{是}\ A\ \text{的特征值}\Rightarrow
f(\lambda)\ \text{是}\ f(A)\ \text{的特征值},\
\boldsymbol\xi\ \text{仍为对应特征向量}`,
      cond: String.raw`特例：$A^{k}$ 的特征值为 $\lambda^{k}$；$A^{-1}$（可逆时）为 $\dfrac1\lambda$；$A+cE$ 为 $\lambda+c$。`,
      warn: String.raw`同一特征向量 $\boldsymbol\xi$ 同时是 $f(A)$ 的特征向量，这条在抽象题中极其常用。`,
      tags: ['多项式', '特征值']
    },
    {
      id: 'xd-eig-6', sec: 'xd-eig', name: '矩阵可逆与特征值',
      tex: String.raw`A\ \text{可逆}\iff\lambda_i\neq0\ (i=1,\ldots,n)\iff|A|\neq0`,
      cond: '0 是特征值 ⟺ 行列式为 0 ⟺ 不可逆。',
      warn: String.raw`属于特征值 0 的特征向量恰为 $Ax=0$ 的非零解，其个数方向维数为 $n-r(A)$。`,
      tags: ['可逆', '零特征值']
    },
    {
      id: 'xd-eig-7', sec: 'xd-eig', name: '相似矩阵的定义与不变量',
      tex: String.raw`P^{-1}AP=B\ \Rightarrow\
|A|=|B|,\ \operatorname{tr}(A)=\operatorname{tr}(B),\ |\lambda E-A|=|\lambda E-B|,\ r(A)=r(B)`,
      cond: String.raw`$P$ 可逆；$A,B$ 有相同的特征多项式（从而相同特征值）。`,
      warn: String.raw`相似必同特征值，但同特征值不一定相似（如 $\begin{pmatrix}0&1\\0&0\end{pmatrix}$ 与零矩阵）。`,
      tags: ['相似', '不变量']
    },
    {
      id: 'xd-eig-8', sec: 'xd-eig', name: '矩阵可对角化的条件',
      tex: String.raw`A\sim\Lambda\iff
\begin{cases}
A\ \text{有}\ n\ \text{个线性无关的特征向量}\\
\text{每个特征值的几何重数}=\text{代数重数（重根时）}
\end{cases}`,
      cond: String.raw`$n$ 阶方阵；$\Lambda=\operatorname{diag}(\lambda_1,\ldots,\lambda_n)$。`,
      warn: String.raw`有 $n$ 个不同特征值必可对角化；反之不真（重根但几何重数足够时也可对角化，如单位矩阵）。`,
      tags: ['对角化', '条件']
    },
    {
      id: 'xd-eig-9', sec: 'xd-eig', name: '对角化的步骤',
      tex: String.raw`|\lambda E-A|=0\ \text{求}\ \lambda_i\ \to\
(\lambda_iE-A)x=0\ \text{求}\ \boldsymbol\xi\ \to\
P=[\boldsymbol\xi_1,\ldots,\boldsymbol\xi_n],\quad P^{-1}AP=\Lambda`,
      cond: String.raw`$P$ 的列与 $\Lambda$ 的对角元顺序一致；$P$ 必须可逆（列无关）。`,
      warn: String.raw`特征向量顺序与对角阵必须配套；求 $P^{-1}$ 时用初等行变换法更快。`,
      tags: ['对角化', '步骤']
    },
    {
      id: 'xd-eig-10', sec: 'xd-eig', name: '实对称矩阵的特殊性质',
      tex: String.raw`A^{T}=A\ \text{（实）}\Rightarrow
\begin{cases}
\text{特征值全为实数}\\
\text{不同特征值对应的特征向量正交}\\
\text{必可正交相似对角化}:\ Q^{T}AQ=\Lambda\ (Q\ \text{正交})
\end{cases}`,
      cond: String.raw`$Q$ 的列为单位正交的特征向量。`,
      warn: String.raw`同一特征值的重根特征向量要先施密特正交化再单位化，才能拼成正交矩阵 $Q$。`,
      tags: ['实对称', '正交对角化']
    },
    {
      id: 'xd-eig-11', sec: 'xd-eig', name: '正交对角化的计算流程',
      tex: String.raw`\text{求特征值}\to\text{解方程组得特征子空间基}\to\text{施密特正交化}\to\text{单位化}\to Q=[\boldsymbol q_1,\ldots,\boldsymbol q_n]`,
      cond: '用于化二次型为标准形（正交变换）。',
      warn: '只对“同一特征值的多个特征向量”正交化；不同特征值的已天然正交。',
      tags: ['正交对角化', '流程']
    },
    {
      id: 'xd-eig-12', sec: 'xd-eig', name: '由特征值反求矩阵',
      tex: String.raw`A=P\Lambda P^{-1},\qquad
A^{k}=P\Lambda^{k}P^{-1}=P\operatorname{diag}(\lambda_1^{k},\ldots,\lambda_n^{k})P^{-1}`,
      cond: String.raw`$A$ 可对角化（实对称时总可用正交 $Q$）；$P$ 为特征向量拼成的矩阵。`,
      warn: String.raw`求 $A^k$ 不必连乘，对角化后只须对角元取 $k$ 次幂。`,
      tags: ['反求矩阵', '矩阵幂']
    },
    {
      id: 'xd-eig-13', sec: 'xd-eig', name: '几何重数与秩',
      tex: String.raw`\dim V_{\lambda_0}=n-r(\lambda_0E-A)\quad(\text{特征子空间维数}=\text{几何重数})`,
      cond: String.raw`几何重数 $\le$ 代数重数；可对角化时对每个 $\lambda$ 取等号。`,
      warn: String.raw`判可对角化时逐个特征值检查 $r(\lambda E-A)$ 是否等于“重数的补”。`,
      tags: ['几何重数', '秩']
    },

    /* ================= §6 二次型 ================= */
    {
      id: 'xd-quad-1', sec: 'xd-quad', name: '二次型及其矩阵表示',
      tex: String.raw`f(x_1,\ldots,x_n)=\sum_{i,j=1}^{n}a_{ij}x_ix_j=\boldsymbol x^{T}A\boldsymbol x,\qquad A^{T}=A`,
      cond: String.raw`$A$ 为对称矩阵；交叉项 $2b_{ij}x_ix_j$ 平分到 $a_{ij}=a_{ji}=b_{ij}$。`,
      warn: String.raw`写矩阵时交叉项系数要除以 2 分到对称位置，且必须取对称矩阵（$A$ 不对称时用 $\frac{A+A^T}{2}$）。`,
      tags: ['二次型', '矩阵表示']
    },
    {
      id: 'xd-quad-2', sec: 'xd-quad', name: '标准形与可逆线性变换',
      tex: String.raw`\boldsymbol x=C\boldsymbol y\ (C\ \text{可逆}):\quad
f=\boldsymbol x^{T}A\boldsymbol x=\boldsymbol y^{T}(C^{T}AC)\boldsymbol y=\boldsymbol y^{T}B\boldsymbol y`,
      cond: String.raw`$B=C^TAC$ 与 $A$ 合同；$r(B)=r(A)$；只含平方项的形为标准形。`,
      warn: '可逆变换不改变二次型的秩；一般的“线性变换”若不可逆可能降秩。',
      tags: ['标准形', '可逆变换']
    },
    {
      id: 'xd-quad-3', sec: 'xd-quad', name: '惯性定理',
      tex: String.raw`f\ \text{的标准形中正系数个数}\ p\ \text{与负系数个数}\ q\ \text{在任意可逆变换下不变}`,
      cond: String.raw`$p$ 称正惯性指数，$q$ 称负惯性指数，$p+q=r\ (\text{秩})$。`,
      warn: String.raw`不同方法得到的标准形系数可能不同，但 $p,q$（以及秩）一定相同。`,
      tags: ['惯性定理', '惯性指数']
    },
    {
      id: 'xd-quad-4', sec: 'xd-quad', name: '化标准形的两种方法',
      tex: String.raw`\begin{aligned}
&\text{正交变换法}:\ Q^{T}AQ=\Lambda,\ \text{标准形系数}=\text{特征值};\\
&\text{配方法（拉格朗日）}:\ \text{配方后令新变量为一次式，解出可逆变换}
\end{aligned}`,
      cond: '正交变换保持几何形状（长度/角度），配方法计算常更快但变换不保正交。',
      warn: '配方法每一步都要写出新旧变量关系，确保变换可逆。',
      tags: ['正交变换', '配方法']
    },
    {
      id: 'xd-quad-5', sec: 'xd-quad', name: '矩阵合同的定义与判定',
      tex: String.raw`C^{T}AC=B\ \Rightarrow\ A\ \text{与}\ B\ \text{合同};
\quad
A,B\ \text{实对称}\ \text{合同}\iff
\begin{cases}r(A)=r(B)\\ p_A=p_B\end{cases}`,
      cond: String.raw`$C$ 可逆；实对称矩阵合同当且仅当秩与正惯性指数都相同。`,
      warn: '合同看秩与正惯性指数；相似看特征值——两者判据不同，别混用。',
      tags: ['合同', '判定']
    },
    {
      id: 'xd-quad-6', sec: 'xd-quad', name: '正定二次型与正定矩阵',
      tex: String.raw`f=\boldsymbol x^{T}A\boldsymbol x>0\quad\forall\,\boldsymbol x\neq\boldsymbol0
\ \Leftrightarrow\ A\ \text{正定}`,
      cond: String.raw`$A$ 为实对称矩阵；等价于 $p=n$（正惯性指数=阶数）。`,
      tags: ['正定', '定义']
    },
    {
      id: 'xd-quad-7', sec: 'xd-quad', name: '正定的充要条件（判别法）',
      tex: String.raw`A\ \text{正定}\iff
\begin{cases}
\text{各阶顺序主子式全大于 }0\\
\text{特征值全大于 }0\\
p=n\ (\text{负惯性指数 }0)\\
A\ \text{与}\ E\ \text{合同（存在可逆}\ C\ \text{使}\ C^{T}AC=E)\\
\exists\ \text{可逆}\ C:\ A=C^{T}C
\end{cases}`,
      cond: '顺序主子式法（霍尔维茨）是最常用的计算判别法。',
      warn: String.raw`只需检验全部顺序主子式 $>0$，不是检验全部主子式。`,
      tags: ['正定', '顺序主子式', '判别']
    },
    {
      id: 'xd-quad-8', sec: 'xd-quad', name: '负定的判别',
      tex: String.raw`A\ \text{负定}\iff\text{特征值全小于 }0\iff
\text{奇数阶顺序主子式}<0,\ \text{偶数阶顺序主子式}>0`,
      cond: String.raw`等价于 $-A$ 正定，或 $p=0$。`,
      warn: '负定的顺序主子式是“正负交替”，与正定“全正”不同。',
      tags: ['负定', '判别']
    },
    {
      id: 'xd-quad-9', sec: 'xd-quad', name: '正定的必要条件（快速排除）',
      tex: String.raw`A\ \text{正定}\ \Rightarrow\ a_{ii}>0\ (i=1,\ldots,n),\qquad |A|>0`,
      cond: '用于选择题快速排除：对角元出现非正数即非正定。',
      warn: String.raw`对角元全正只是必要条件，不是充分条件（如 $\begin{pmatrix}1&2\\2&1\end{pmatrix}$）。`,
      tags: ['正定', '必要条件', '易错']
    },
    {
      id: 'xd-quad-10', sec: 'xd-quad', name: '等价、相似、合同的区分',
      tex: String.raw`\begin{aligned}
&\text{等价}:\ PAQ=B\ (P,Q\ \text{可逆})\ \Longleftrightarrow\ r(A)=r(B);\\
&\text{相似}:\ P^{-1}AP=B\ \Longleftrightarrow\ \text{特征值等不变量相同（更强）};\\
&\text{合同}:\ P^{T}AP=B\ \Longleftrightarrow\ \text{秩与正惯性指数相同（对实对称）}
\end{aligned}`,
      cond: '三者都保持“秩”；相似与合同之间没有必然推出关系。',
      warn: '选择题中先分清问的是相似还是合同：相似用特征值，合同用惯性指数。',
      tags: ['等价', '相似', '合同', '易错']
    },
    {
      id: 'xd-quad-11', sec: 'xd-quad', name: '二次型的规范形',
      tex: String.raw`f\ \text{（可逆变换下）}\ \to\ y_1^{2}+\cdots+y_p^{2}-y_{p+1}^{2}-\cdots-y_{p+q}^{2}
\quad(\text{规范形})`,
      cond: String.raw`规范形由 $p,q$ 唯一确定；正定 ⇔ 规范形为 $\sum y_i^{2}$（$p=n$）。`,
      tags: ['规范形']
    }
  );
})();
