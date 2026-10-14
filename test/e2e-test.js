// 考研数学二公式大全 · 端到端自测 v2（多页路由版）
const path = require('path');
const { chromium } = require(path.join(__dirname, 'node_modules', 'playwright-core'));

const BASE = 'http://127.0.0.1:8123/';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const SHOT_DIR = process.env.SHOT_DIR || __dirname;

function log(name, pass, detail) {
  console.log((pass ? 'PASS' : 'FAIL') + ' | ' + name + (detail ? ' | ' + detail : ''));
  return pass;
}

(async () => {
  const results = [];
  const browser = await chromium.launch({ headless: true, executablePath: EDGE });
  const context = await browser.newContext({
    viewport: { width: 402, height: 874 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    locale: 'zh-CN',
    permissions: ['clipboard-read', 'clipboard-write']
  });
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
  page.on('pageerror', (err) => pageErrors.push(String(err)));

  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 60000 });
  await page.addStyleTag({ content: 'html{scroll-behavior:auto !important}' });

  /* ---------- 首页 ---------- */
  const entryCount = await page.locator('.entry-card[data-go^="#/sec/"]').count();
  results.push(log('首页 13 个小节入口', entryCount === 13, 'actual=' + entryCount));
  const themeBtn = await page.locator('#themeBtn').count();
  results.push(log('已移除深浅色切换按钮', themeBtn === 0));
  const heroVisible = await page.locator('.hero-title').isVisible();
  results.push(log('首页 hero 显示', heroVisible));
  const overflowHome = await page.evaluate(() => ({
    sw: document.documentElement.scrollWidth, iw: window.innerWidth
  }));
  results.push(log('首页无横向溢出', overflowHome.sw <= overflowHome.iw + 1, JSON.stringify(overflowHome)));

  // 首页全局搜索 → 结果列表 → 跳转小节并定位
  await page.fill('#searchInput', '曲率');
  await page.waitForTimeout(300);
  const resultN = await page.locator('#globalResults .result-item').count();
  results.push(log('首页搜索“曲率”出结果列表', resultN >= 2, 'results=' + resultN));
  await page.locator('#globalResults .result-item').first().click();
  await page.waitForTimeout(700);
  const hash1 = await page.evaluate(() => location.hash);
  results.push(log('结果跳转到小节页', hash1.startsWith('#/sec/gs-dif'), hash1));
  const focused = await page.locator('.card.flash').count();
  results.push(log('目标卡片高亮定位', focused === 1));

  /* ---------- 小节页 ---------- */
  await page.goto(BASE + '#/sec/gs-lim', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.querySelectorAll('.card').length > 20, null, { timeout: 20000 });
  await page.waitForFunction(() => document.querySelectorAll('.formula-box .katex').length > 20, null, { timeout: 30000 });
  const secCards = await page.locator('#secCards .card').count();
  results.push(log('小节页（极限与连续）23 条', secCards === 23, 'actual=' + secCards));
  const errCount = await page.locator('.formula-err').count();
  results.push(log('本节公式全部渲染成功', errCount === 0, 'err=' + errCount));
  const pagerN = await page.locator('.pager-btn:not(.empty)').count();
  results.push(log('上一节/下一节可用', pagerN === 2, 'pager=' + pagerN));
  const backVisible = await page.locator('#navBack:visible').count();
  results.push(log('返回按钮显示', backVisible === 1));

  // 页内搜索过滤
  await page.fill('#searchInput', '洛必达');
  await page.waitForTimeout(300);
  const vis1 = await page.locator('.card:not(.hidden)').count();
  results.push(log('页内搜索过滤', vis1 === 1, 'visible=' + vis1));
  await page.click('#clearBtn');
  await page.waitForTimeout(250);
  const visAll = await page.locator('.card:not(.hidden)').count();
  results.push(log('清空恢复本节全部', visAll === 23, 'visible=' + visAll));

  // 吸顶与无溢出
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(300);
  const sticky = await page.evaluate(() => {
    const tb = document.getElementById('toolbar').getBoundingClientRect();
    return Math.round(tb.top);
  });
  results.push(log('小节页工具栏吸顶', sticky >= 40 && sticky <= 70, 'toolbarTop=' + sticky));
  const overflowSec = await page.evaluate(() => ({
    sw: document.documentElement.scrollWidth, iw: window.innerWidth
  }));
  results.push(log('小节页无横向溢出', overflowSec.sw <= overflowSec.iw + 1, JSON.stringify(overflowSec)));

  // 收藏（本节）
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);
  await page.locator('#card-gs-lim-3 .star-btn').click();
  await page.waitForTimeout(200);
  const favStore = await page.evaluate(() => JSON.parse(localStorage.getItem('ks2-favs') || '[]'));
  results.push(log('收藏写入 localStorage', favStore.includes('gs-lim-3'), JSON.stringify(favStore)));
  await page.click('#favChip');
  await page.waitForTimeout(250);
  const favVis = await page.locator('.card:not(.hidden)').count();
  results.push(log('仅看本节收藏：1 条', favVis === 1, 'visible=' + favVis));
  await page.click('#favChip');
  await page.waitForTimeout(200);

  // 复制 LaTeX
  await page.evaluate(() => {
    const el = document.querySelector('#card-gs-lim-3');
    window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 200);
  });
  await page.waitForTimeout(300);
  await page.locator('#card-gs-lim-3 [data-act="copy-tex"]').click();
  await page.waitForTimeout(350);
  const clip1 = await page.evaluate(() => navigator.clipboard.readText().catch(() => ''));
  results.push(log('复制 LaTeX 正确', clip1.includes('\\sin') && clip1.includes('\\lim'), clip1.slice(0, 50)));

  // 源码展开
  await page.locator('#card-gs-lim-3 [data-act="toggle-src"]').click();
  await page.waitForTimeout(150);
  const srcOpen = await page.locator('#card-gs-lim-3 .src-box.open').count();
  results.push(log('源码展开', srcOpen === 1));

  // 上一节跳转
  await page.locator('.pager-btn.prev').click();
  await page.waitForTimeout(500);
  const hash2 = await page.evaluate(() => location.hash);
  results.push(log('上一节跳转到函数', hash2 === '#/sec/gs-fun', hash2));
  const funCards = await page.locator('#secCards .card').count();
  results.push(log('函数节 6 条', funCards === 6, 'actual=' + funCards));

  // 返回首页
  await page.click('#navBack');
  await page.waitForTimeout(400);
  const hash3 = await page.evaluate(() => location.hash);
  results.push(log('返回首页', hash3 === '#/' || hash3 === '' || hash3 === '#', hash3));
  const homeAgain = await page.locator('.hero-title').count();
  results.push(log('首页视图恢复', homeAgain === 1));
  // 返回首页时保留了此前的搜索状态，先清空再进入收藏
  if (await page.locator('#clearBtn:visible').count()) {
    await page.click('#clearBtn');
    await page.waitForTimeout(250);
  }

  /* ---------- 收藏页 ---------- */
  await page.locator('.fav-entry .entry-card').click();
  await page.waitForTimeout(500);
  const hash4 = await page.evaluate(() => location.hash);
  results.push(log('进入收藏页', hash4 === '#/fav', hash4));
  const favCards = await page.locator('#favCards .card').count();
  results.push(log('收藏页显示 1 条', favCards === 1, 'actual=' + favCards));
  const secTag = await page.locator('#favCards .card-sec-tag').count();
  results.push(log('收藏卡片带所属小节', secTag === 1));
  await page.screenshot({ path: path.join(SHOT_DIR, 'shot-fav.png'), fullPage: false });

  // 取消收藏
  await page.locator('#favCards .star-btn').click();
  await page.waitForTimeout(400);
  const emptyShown = await page.locator('.empty-tip.show').count();
  results.push(log('取消收藏后空状态', emptyShown === 1));

  /* ---------- 深链 ---------- */
  await page.goto(BASE + '#/sec/xd-eig?f=xd-eig-10', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.querySelectorAll('.card.in').length > 0, null, { timeout: 15000 });
  await page.waitForTimeout(600);
  const deepFocus = await page.locator('#card-xd-eig-10.flash').count();
  results.push(log('深链定位到指定公式', deepFocus === 1));

  /* ---------- 截图 ---------- */
  await page.goto(BASE + '#/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(SHOT_DIR, 'shot-mobile-home.png'), fullPage: false });
  await page.goto(BASE + '#/sec/gs-dif', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.querySelectorAll('.formula-box .katex').length > 25, null, { timeout: 30000 });
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(SHOT_DIR, 'shot-mobile-section.png'), fullPage: false });
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(BASE + '#/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(SHOT_DIR, 'shot-desktop.png'), fullPage: false });

  /* ---------- 健康检查 ---------- */
  results.push(log('无页面 JS 异常', pageErrors.length === 0, pageErrors.slice(0, 3).join(' ; ')));
  const realConsoleErrors = consoleErrors.filter((e) => !/favicon/i.test(e));
  results.push(log('无控制台错误', realConsoleErrors.length === 0, realConsoleErrors.slice(0, 3).join(' ; ')));

  await browser.close();
  const fails = results.filter((r) => !r).length;
  console.log('----');
  console.log('TOTAL=' + results.length + ' FAILS=' + fails);
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error('FATAL', e); process.exit(2); });
