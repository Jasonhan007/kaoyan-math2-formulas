/* =========================================================
 * 考研数学二公式大全 · 页面逻辑（多页路由版）
 * 路由：
 *   #/            首页（章节目录 + 全局搜索）
 *   #/sec/<id>    小节页（本节公式）
 *   #/fav         收藏页
 * 深链定位公式： #/sec/<id>?f=<公式id>
 * ========================================================= */
(function () {
  'use strict';

  var DB = window.FORMULA_DB;
  if (!DB || !DB.formulas || !DB.formulas.length) {
    document.getElementById('view').innerHTML =
      '<div class="empty-tip show">公式数据未加载，请检查 js/data-*.js 是否完整。</div>';
    return;
  }

  /* ---------- 工具 ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$($sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll($sel)); }
  function escHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var LS_FAV = 'ks2-favs';

  /* ---------- 索引 ---------- */
  var secMeta = {};
  var sectionOrder = [];
  DB.chapters.forEach(function (ch) {
    ch.sections.forEach(function (s) {
      secMeta[s.id] = { title: s.title, hint: s.hint || '', chapterTitle: ch.title, chapterId: ch.id };
      sectionOrder.push(s.id);
    });
  });

  var formulas = DB.formulas;
  var byId = {};
  var bySec = {};
  var searchBlob = {};
  formulas.forEach(function (f) {
    byId[f.id] = f;
    if (!bySec[f.sec]) bySec[f.sec] = [];
    bySec[f.sec].push(f);
    var sm = secMeta[f.sec] || { title: '', chapterTitle: '' };
    searchBlob[f.id] = [
      f.name, sm.title, sm.chapterTitle, f.tex, f.cond || '', f.warn || '',
      (f.tags || []).join(' ')
    ].join(' ').toLowerCase();
  });
  sectionOrder.forEach(function (id) { if (!bySec[id]) bySec[id] = []; });

  /* ---------- 收藏 ---------- */
  var favs = new Set();
  try {
    JSON.parse(localStorage.getItem(LS_FAV) || '[]').forEach(function (id) { if (byId[id]) favs.add(id); });
  } catch (e) { /* ignore */ }

  function saveFavs() {
    try { localStorage.setItem(LS_FAV, JSON.stringify(Array.from(favs))); } catch (e) { /* ignore */ }
  }

  /* ---------- 路由状态 ---------- */
  var route = { name: 'home', secId: null, focusId: null };
  var secFilter = { q: '', onlyFav: false };
  var homeQuery = '';

  function parseHash() {
    var h = (location.hash || '').replace(/^#\/?/, '');
    var qIndex = h.indexOf('?');
    var query = '';
    if (qIndex >= 0) {
      query = h.slice(qIndex + 1);
      h = h.slice(0, qIndex);
    }
    var focus = null;
    var m = /[?&]?f=([\w-]+)/.exec(query);
    if (m) focus = m[1];

    var parts = h.split('/').filter(Boolean);
    if (parts[0] === 'sec' && parts[1] && secMeta[parts[1]]) {
      return { name: 'sec', secId: parts[1], focusId: focus };
    }
    if (parts[0] === 'fav') return { name: 'fav', secId: null, focusId: focus };
    return { name: 'home', secId: null, focusId: null };
  }

  function go(hash) {
    if (location.hash === hash) render();
    else location.hash = hash;
  }

  /* ---------- 视图骨架 ---------- */
  var view = $('#view');
  var nav = $('#nav');
  var navBack = $('#navBack');
  var navTitle = $('#navTitle');
  var navCount = $('#navCount');
  var footer = $('#footer');

  function setNav(mode, title, count) {
    if (mode === 'home') {
      navBack.hidden = true;
      nav.classList.remove('always-title');
      navTitle.textContent = '考研数学二 · 公式大全';
      navTitle.style.textAlign = 'center';
    } else {
      navBack.hidden = false;
      nav.classList.add('always-title');
      navTitle.textContent = title;
      navTitle.style.textAlign = 'left';
    }
    navCount.textContent = count || '';
  }

  /* ---------- 卡片 ---------- */
  function formulaCardHTML(f, opts) {
    opts = opts || {};
    var fav = favs.has(f.id) ? ' on' : '';
    var verify = f.flag === 'verify'
      ? '<span class="flag-verify" title="范围以当年官方大纲为准">⚠ 待核验（大纲边缘）</span>' : '';
    var secTag = opts.showSec
      ? '<div class="card-sec-tag">' + escHtml(secMeta[f.sec].chapterTitle + ' · ' + secMeta[f.sec].title) + '</div>'
      : '';
    return '' +
      '<article class="card" id="card-' + f.id + '" data-id="' + f.id + '" data-sec="' + f.sec + '">' +
      secTag +
      '  <div class="card-head">' +
      '    <h4 class="card-name" data-name>' + escHtml(f.name) + '</h4>' +
      '    <button class="star-btn' + fav + '" data-act="fav" aria-label="收藏" aria-pressed="' + (fav ? 'true' : 'false') + '">' +
      '      <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor"><path d="m12 17.3-6.2 3.7 1.7-7L2 9.2l7.1-.6L12 2l2.9 6.6 7.1.6-5.5 4.8 1.7 7z"/></svg>' +
      '    </button>' +
      '  </div>' +
      '  <div class="formula-box"><div class="formula" data-tex></div></div>' +
      '  <div class="meta">' +
      (f.cond ? '<p class="meta-line"><span class="tag tag-cond">条件</span><span data-inline>' + escHtml(f.cond) + '</span></p>' : '') +
      (f.warn ? '<p class="meta-line"><span class="tag tag-warn">易错</span><span data-inline>' + escHtml(f.warn) + '</span></p>' : '') +
      verify +
      '  </div>' +
      '  <div class="card-actions">' +
      '    <button class="act-btn" data-act="copy-tex">复制 LaTeX</button>' +
      '    <button class="act-btn" data-act="copy-md">复制公式 ($$)</button>' +
      '    <button class="act-btn muted" data-act="toggle-src">源码</button>' +
      '  </div>' +
      '  <pre class="src-box" data-src></pre>' +
      '</article>';
  }

  function toolbarHTML(showFavChip) {
    return '' +
      '<div class="toolbar" id="toolbar">' +
      '  <div class="search-field">' +
      '    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20.5 20.5-4.2-4.2"/></svg>' +
      '    <input id="searchInput" type="search" placeholder="搜索公式或 LaTeX…" autocomplete="off" enterkeyhint="search" />' +
      '    <button class="clear-btn" id="clearBtn" aria-label="清空搜索" hidden>' +
      '      <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm3.5 12.1-1.4 1.4L12 13.4l-2.1 2.1-1.4-1.4L10.6 12 8.5 9.9l1.4-1.4L12 10.6l2.1-2.1 1.4 1.4L13.4 12l2.1 2.1z"/></svg>' +
      '    </button>' +
      '  </div>' +
      (showFavChip
        ? '  <button class="chip" id="favChip" aria-pressed="false" title="仅显示本节收藏">' +
          '    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="m12 17.3-6.2 3.7 1.7-7L2 9.2l7.1-.6L12 2l2.9 6.6 7.1.6-5.5 4.8 1.7 7z"/></svg>仅收藏' +
          '  </button>'
        : '') +
      '</div>';
  }

  /* ---------- 首页 ---------- */
  function renderHome() {
    var gsN = 0, xdN = 0, verifyN = 0;
    formulas.forEach(function (f) {
      if (f.sec.indexOf('gs-') === 0) gsN++;
      else if (f.sec.indexOf('xd-') === 0) xdN++;
      if (f.flag === 'verify') verifyN++;
    });

    var html = '' +
      '<section class="hero">' +
      '  <p class="hero-eyebrow">Kaoyan Math II · Formula Sheet</p>' +
      '  <h1 class="hero-title">考研数学二<br/>公式大全</h1>' +
      '  <p class="hero-sub">高等数学 × 线性代数 · 每页一个专题，附成立条件与易错提醒</p>' +
      '  <div class="hero-stats">' +
      '    <span class="stat-pill">共 <b>' + formulas.length + '</b> 条公式</span>' +
      '    <span class="stat-pill">高数 <b>' + gsN + '</b></span>' +
      '    <span class="stat-pill">线代 <b>' + xdN + '</b></span>' +
      '    <span class="stat-pill">待核验 <b>' + verifyN + '</b></span>' +
      '  </div>' +
      '</section>' +
      toolbarHTML(false) +
      '<div id="homeBody">';

    html += '<div class="fav-entry">' +
      '<button class="entry-card" data-go="#/fav">' +
      '  <div class="entry-main">' +
      '    <div class="entry-name"><span class="fav-ico">★</span>我的收藏</div>' +
      '    <div class="entry-hint">复习你标记过的公式</div>' +
      '  </div>' +
      '  <div class="entry-meta"><span class="entry-count" id="favEntryCount">' + favs.size + ' 条</span></div>' +
      '  <svg class="entry-arrow" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m9.5 5 7 7-7 7"/></svg>' +
      '</button></div>';

    DB.chapters.forEach(function (ch) {
      html += '<section class="home-section">' +
        '<div class="home-section-title"><span class="dot dot-' + ch.id + '"></span><h2>' + escHtml(ch.title) + '</h2></div>' +
        '<div class="entry-grid">';
      ch.sections.forEach(function (s) {
        html += '<button class="entry-card" data-go="#/sec/' + s.id + '">' +
          '<div class="entry-main">' +
          '  <div class="entry-name">' + escHtml(s.title) + '</div>' +
          '  <div class="entry-hint">' + escHtml(s.hint || '') + '</div>' +
          '</div>' +
          '<div class="entry-meta"><span class="entry-count">' + bySec[s.id].length + ' 条</span></div>' +
          '<svg class="entry-arrow" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m9.5 5 7 7-7 7"/></svg>' +
          '</button>';
      });
      html += '</div></section>';
    });

    html += '</div>';
    html += '<div id="globalResults" class="result-list" hidden></div>';
    view.innerHTML = html;
    setNav('home', '', formulas.length + ' 条');
    footer.classList.remove('hidden-page');
    bindToolbar(false);
    applyHomeSearch();
  }

  function applyHomeSearch() {
    var input = $('#searchInput');
    if (input) input.value = homeQuery;
    var clearBtn = $('#clearBtn');
    if (clearBtn) clearBtn.hidden = !homeQuery;
    var q = homeQuery.trim().toLowerCase();
    var resultsEl = $('#globalResults');
    var bodyEl = $('#homeBody');
    if (!resultsEl || !bodyEl) return;

    if (!q) {
      resultsEl.hidden = true;
      resultsEl.innerHTML = '';
      bodyEl.style.display = '';
      navCount.textContent = formulas.length + ' 条';
      return;
    }

    var hits = [];
    formulas.forEach(function (f) {
      if (searchBlob[f.id].indexOf(q) !== -1) hits.push(f);
    });

    bodyEl.style.display = 'none';
    resultsEl.hidden = false;
    navCount.textContent = hits.length + ' 条结果';

    if (!hits.length) {
      resultsEl.innerHTML = '<p class="empty-tip show">没有匹配的公式，试试别的关键词？</p>';
      return;
    }
    var html = '';
    hits.forEach(function (f) {
      var sm = secMeta[f.sec];
      var name = escHtml(f.name);
      var idx = f.name.toLowerCase().indexOf(q);
      if (idx !== -1) {
        name = escHtml(f.name.slice(0, idx)) + '<mark>' + escHtml(f.name.slice(idx, idx + q.length)) +
          '</mark>' + escHtml(f.name.slice(idx + q.length));
      }
      html += '<button class="result-item" data-go="#/sec/' + f.sec + '?f=' + f.id + '">' +
        '<div class="result-main">' +
        '  <div class="result-name">' + name + '</div>' +
        '  <div class="result-sub">' + escHtml(sm.chapterTitle + ' · ' + sm.title) + '</div>' +
        '</div>' +
        '<svg class="entry-arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m9.5 5 7 7-7 7"/></svg>' +
        '</button>';
    });
    resultsEl.innerHTML = html;
  }

  /* ---------- 小节页 ---------- */
  function renderSection(secId) {
    var sm = secMeta[secId];
    var list = bySec[secId] || [];
    var idx = sectionOrder.indexOf(secId);
    var prevId = idx > 0 ? sectionOrder[idx - 1] : null;
    var nextId = idx < sectionOrder.length - 1 ? sectionOrder[idx + 1] : null;
    var chapterClass = sm.chapterId === 'gs' ? 'gs' : 'xd';

    var html = '' +
      '<section class="sec-hero">' +
      '  <div class="sec-label ' + chapterClass + '">' +
      '    <span class="dot dot-' + sm.chapterId + '"></span>' + escHtml(sm.chapterTitle) +
      '  </div>' +
      '  <h1>' + escHtml(sm.title) + '</h1>' +
      (sm.hint ? '<p class="sec-hint">' + escHtml(sm.hint) + '</p>' : '') +
      '</section>' +
      toolbarHTML(true) +
      '<div class="cards" id="secCards">';
    list.forEach(function (f) { html += formulaCardHTML(f, {}); });
    html += '</div><p class="empty-tip" id="secEmpty">没有匹配的公式</p>';

    html += '<nav class="pager">' +
      pagerBtn(prevId, 'prev') +
      pagerBtn(nextId, 'next') +
      '</nav>';

    view.innerHTML = html;
    setNav('sec', sm.chapterTitle + ' · ' + sm.title, '共 ' + list.length + ' 条');
    footer.classList.add('hidden-page');
    secFilter = { q: '', onlyFav: false };
    bindToolbar(true);
    renderCardsIn(view);
    applySecFilter();
    revealCards();
  }

  function pagerBtn(secId, dir) {
    if (!secId) {
      return '<button class="pager-btn empty ' + dir + '" disabled><div class="pager-dir">' +
        (dir === 'prev' ? '上一节' : '下一节') + '</div><div class="pager-name">—</div></button>';
    }
    var sm = secMeta[secId];
    return '<button class="pager-btn ' + dir + '" data-go="#/sec/' + secId + '">' +
      '<div class="pager-dir">' + (dir === 'prev' ? '上一节' : '下一节') + '</div>' +
      '<div class="pager-name">' + escHtml(sm.title) + ' · ' + bySec[secId].length + ' 条</div>' +
      '</button>';
  }

  function applySecFilter() {
    var q = secFilter.q.trim().toLowerCase();
    var input = $('#searchInput');
    if (input) input.value = secFilter.q;
    var clearBtn = $('#clearBtn');
    if (clearBtn) clearBtn.hidden = !secFilter.q;
    var chip = $('#favChip');
    if (chip) chip.setAttribute('aria-pressed', secFilter.onlyFav ? 'true' : 'false');

    var visible = 0;
    var total = (bySec[route.secId] || []).length;
    $$('.card', view).forEach(function (card) {
      var id = card.dataset.id;
      var ok = true;
      if (secFilter.onlyFav && !favs.has(id)) ok = false;
      if (ok && q && searchBlob[id].indexOf(q) === -1) ok = false;
      card.classList.toggle('hidden', !ok);
      if (ok) visible++;
      highlightName(card, q);
    });
    var emptyEl = $('#secEmpty');
    if (emptyEl) emptyEl.classList.toggle('show', visible === 0);
    navCount.textContent = (q || secFilter.onlyFav) ? visible + ' / ' + total : '共 ' + total + ' 条';
  }

  function highlightName(card, q) {
    var el = $('[data-name]', card);
    if (!card._nameOrig) card._nameOrig = el.textContent;
    var text = card._nameOrig;
    if (!q) { el.textContent = text; return; }
    var idx = text.toLowerCase().indexOf(q);
    if (idx === -1) { el.textContent = text; return; }
    el.innerHTML = escHtml(text.slice(0, idx)) + '<mark>' + escHtml(text.slice(idx, idx + q.length)) +
      '</mark>' + escHtml(text.slice(idx + q.length));
  }

  /* ---------- 收藏页 ---------- */
  function renderFav() {
    var list = formulas.filter(function (f) { return favs.has(f.id); });
    var html = '' +
      '<section class="sec-hero">' +
      '  <div class="sec-label gs"><span class="dot dot-gs"></span>复习</div>' +
      '  <h1>我的收藏</h1>' +
      '  <p class="sec-hint">共 ' + list.length + ' 条 · 点击星标可取消收藏</p>' +
      '</section>';
    if (!list.length) {
      html += '<p class="empty-tip show" style="margin-top:30px">还没有收藏任何公式。<br/>在公式卡片右上角点 ★ 即可加入收藏。</p>';
    } else {
      html += '<div class="cards" id="favCards">';
      list.forEach(function (f) { html += formulaCardHTML(f, { showSec: true }); });
      html += '</div>';
    }
    view.innerHTML = html;
    setNav('fav', '我的收藏', list.length + ' 条');
    footer.classList.add('hidden-page');
    renderCardsIn(view);
    revealCards();
  }

  /* ---------- 渲染公式 ---------- */
  function renderCardsIn(root) {
    $$('.card', root).forEach(function (card) {
      var f = byId[card.dataset.id];
      var box = $('[data-tex]', card);
      try {
        katex.render(f.tex, box, { displayMode: true, throwOnError: true, strict: false });
      } catch (e) {
        box.className = 'formula-err';
        box.textContent = '公式渲染失败：' + (e && e.message ? e.message : e) + '\n' + f.tex;
      }
      $$('[data-inline]', card).forEach(function (el) {
        renderInlineMath(el, el.textContent);
      });
      var src = $('[data-src]', card);
      if (src) src.textContent = f.tex;
    });
  }

  function renderInlineMath(el, text) {
    var frag = document.createDocumentFragment();
    var re = /\$([^$]+)\$/g;
    var last = 0, m;
    while ((m = re.exec(text)) !== null) {
      if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
      var span = document.createElement('span');
      try { katex.render(m[1], span, { throwOnError: false, strict: false }); }
      catch (e) { span.textContent = m[1]; }
      frag.appendChild(span);
      last = m.index + m[0].length;
    }
    if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
    el.textContent = '';
    el.appendChild(frag);
  }

  function revealCards() {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.04 });
    $$('.card', view).forEach(function (c) { io.observe(c); });
  }

  function focusCard(id) {
    var card = document.getElementById('card-' + id);
    if (!card) return;
    card.classList.add('in');
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    card.classList.remove('flash');
    void card.offsetWidth;
    card.classList.add('flash');
  }

  /* ---------- 工具栏交互 ---------- */
  function bindToolbar(showFavChip) {
    var input = $('#searchInput');
    var debounce = null;
    if (input) {
      input.addEventListener('input', function () {
        var clearBtn = $('#clearBtn');
        if (clearBtn) clearBtn.hidden = !input.value;
        clearTimeout(debounce);
        debounce = setTimeout(function () {
          if (route.name === 'home') { homeQuery = input.value; applyHomeSearch(); }
          else if (route.name === 'sec') { secFilter.q = input.value; applySecFilter(); }
        }, 120);
      });
    }
    var clearBtn = $('#clearBtn');
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        input.value = '';
        clearBtn.hidden = true;
        if (route.name === 'home') { homeQuery = ''; applyHomeSearch(); }
        else if (route.name === 'sec') { secFilter.q = ''; applySecFilter(); }
        input.focus();
      });
    }
    var favChip = $('#favChip');
    if (favChip && showFavChip) {
      favChip.addEventListener('click', function () {
        secFilter.onlyFav = !secFilter.onlyFav;
        applySecFilter();
        if (secFilter.onlyFav && !(bySec[route.secId] || []).some(function (f) { return favs.has(f.id); })) {
          toast('本节还没有收藏的公式');
        }
      });
    }
  }

  /* ---------- 收藏切换 ---------- */
  function toggleFav(id, btn) {
    if (favs.has(id)) { favs.delete(id); btn.classList.remove('on'); btn.setAttribute('aria-pressed', 'false'); }
    else { favs.add(id); btn.classList.add('on'); btn.setAttribute('aria-pressed', 'true'); }
    btn.classList.remove('pop');
    void btn.offsetWidth;
    btn.classList.add('pop');
    saveFavs();
    var favEntryCount = $('#favEntryCount');
    if (favEntryCount) favEntryCount.textContent = favs.size + ' 条';
    if (route.name === 'sec' && secFilter.onlyFav) applySecFilter();
    if (route.name === 'fav') renderFav();
  }

  /* ---------- 复制 ---------- */
  function copyText(text, msg) {
    function done() { toast(msg || '已复制'); }
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); done(); }
      catch (e) { toast('复制失败，请手动选择源码'); }
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else fallback();
  }

  var toastTimer = null;
  function toast(msg) {
    var t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 1600);
  }

  /* ---------- 事件 ---------- */
  function bindGlobal() {
    view.addEventListener('click', function (e) {
      var goBtn = e.target.closest('[data-go]');
      if (goBtn) { go(goBtn.dataset.go); return; }

      var btn = e.target.closest('[data-act]');
      if (!btn) return;
      var card = btn.closest('.card');
      if (!card) return;
      var f = byId[card.dataset.id];
      var act = btn.dataset.act;
      if (act === 'fav') toggleFav(f.id, btn);
      else if (act === 'copy-tex') copyText(f.tex, '已复制 LaTeX');
      else if (act === 'copy-md') copyText('$$\n' + f.tex + '\n$$', '已复制公式');
      else if (act === 'toggle-src') {
        var src = $('[data-src]', card);
        src.classList.toggle('open');
        btn.textContent = src.classList.contains('open') ? '收起源码' : '源码';
      }
    });

    navBack.addEventListener('click', function () { go('#/'); });

    window.addEventListener('scroll', function () {
      if (route.name === 'home') {
        if (window.scrollY > 60) nav.classList.add('solid');
        else nav.classList.remove('solid');
      } else {
        nav.classList.add('solid');
      }
    }, { passive: true });
  }

  /* ---------- 渲染入口 ---------- */
  function render() {
    route = parseHash();
    window.scrollTo(0, 0);
    if (route.name === 'sec') {
      renderSection(route.secId);
      nav.classList.add('solid');
      if (route.focusId) {
        requestAnimationFrame(function () { focusCard(route.focusId); });
      }
    } else if (route.name === 'fav') {
      renderFav();
      nav.classList.add('solid');
    } else {
      renderHome();
      if (window.scrollY > 60) nav.classList.add('solid');
      else nav.classList.remove('solid');
    }
  }

  $('#footerMeta').textContent = '共 ' + formulas.length + ' 条公式 · KaTeX ' +
    (window.katex && katex.version ? katex.version : '') + ' · 数据：js/data-gaoshu.js / js/data-xiandai.js';

  bindGlobal();
  window.addEventListener('hashchange', render);
  render();
})();
