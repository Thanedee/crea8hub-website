/* Crea8Hub social media image sizes + resizer. Runs entirely in the browser: images are never uploaded. */
(function(){
  'use strict';
  var SIZES = window.C8_SIZES || [], PLATS = window.C8_PLATFORMS || [];
  var PNAME = {}; PLATS.forEach(function(p){ PNAME[p[0]] = p[1]; });
  var BY_ID = {}; SIZES.forEach(function(s){ BY_ID[s.id] = s; });
  function $(s, r){ return (r || document).querySelector(s); }
  function el(tag, attrs, html){
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs){ if (k === 'class') e.className = attrs[k]; else if (k === 'text') e.textContent = attrs[k]; else e.setAttribute(k, attrs[k]); }
    if (html != null) e.innerHTML = html;
    return e;
  }
  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  function px(s){ return s.w + ' x ' + s.h; }
  function pxNice(s){ return s.w.toLocaleString('en-GB') + ' &times; ' + s.h.toLocaleString('en-GB'); }
  function store(k, v){ try { if (v === undefined) return JSON.parse(localStorage.getItem('c8sizes:' + k)); localStorage.setItem('c8sizes:' + k, JSON.stringify(v)); } catch (e) { return null; } }
  function clamp(v, a, b){ return v < a ? a : v > b ? b : v; }

  function copyText(t, btn){
    function done(ok){
      if (!btn) return;
      var old = btn.getAttribute('data-label') || btn.textContent;
      btn.setAttribute('data-label', old);
      btn.textContent = ok ? 'Copied' : 'Press Ctrl+C';
      btn.classList.add('ok');
      setTimeout(function(){ btn.textContent = old; btn.classList.remove('ok'); }, 1600);
    }
    if (navigator.clipboard && window.isSecureContext){
      navigator.clipboard.writeText(t).then(function(){ done(true); }, function(){ fallback(); });
    } else fallback();
    function fallback(){
      var ta = el('textarea'); ta.value = t; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      var ok = false; try { ok = document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta); done(ok);
    }
  }

  /* ---------------- size guide ---------------- */
  var guide = $('#sizeCards'), filt = $('#platFilters'), search = $('#sizeSearch'), countEl = $('#sizeCount');
  var curPlat = 'all';
  function ratioBox(s){
    var M = 64, r = s.w / s.h, w = r >= 1 ? M : Math.max(M * r, 12), h = r >= 1 ? Math.max(M / r, 8) : M;
    return '<span class="rbox" aria-hidden="true"><i style="width:' + w.toFixed(1) + 'px;height:' + h.toFixed(1) + 'px"></i></span>';
  }
  function buildGuide(){
    if (!guide) return;
    var frag = document.createDocumentFragment();
    SIZES.forEach(function(s){
      var c = el('article', {'class':'scard', 'data-p':s.p, 'data-q':(s.n + ' ' + PNAME[s.p] + ' ' + s.w + 'x' + s.h + ' ' + s.w + ' ' + s.h + ' ' + s.r + ' ' + s.t).toLowerCase()});
      c.innerHTML = ratioBox(s) +
        '<div class="sc-body"><span class="sc-plat">' + esc(PNAME[s.p]) + (s.o ? '' : ' <span class="tag" title="No official figure published; based on 2026 guides">Guide</span>') + '</span>' +
        '<h3>' + esc(s.n) + '</h3>' +
        '<p class="sc-px"><b>' + pxNice(s) + '</b> px <span>' + esc(s.r) + '</span></p>' +
        '<p class="sc-t">' + esc(s.t) + '</p>' +
        '<div class="sc-act"><button type="button" class="chipbtn dk" data-copy="' + px(s) + '" aria-label="Copy size ' + px(s) + ' for ' + esc(s.n) + '">Copy size</button>' +
        '<button type="button" class="chipbtn dk" data-use="' + s.id + '" aria-label="Resize an image to ' + esc(s.n) + '">Resize to this</button></div></div>';
      frag.appendChild(c);
    });
    guide.appendChild(frag);
    guide.addEventListener('click', function(e){
      var b = e.target.closest('button'); if (!b) return;
      if (b.hasAttribute('data-copy')) copyText(b.getAttribute('data-copy'), b);
      if (b.hasAttribute('data-use')){ addOutput(b.getAttribute('data-use')); var r = $('#resizer'); if (r) r.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'}); }
    });
    // filters
    var all = [['all','All']].concat(PLATS);
    all.forEach(function(p){
      var n = p[0] === 'all' ? SIZES.length : SIZES.filter(function(s){ return s.p === p[0]; }).length;
      var b = el('button', {type:'button', 'data-p':p[0], 'aria-pressed': p[0] === 'all' ? 'true' : 'false'}, esc(p[0] === 'google' ? 'Google Ads' : p[1]) + ' <span>' + n + '</span>');
      filt.appendChild(b);
    });
    filt.addEventListener('click', function(e){
      var b = e.target.closest('button'); if (!b) return;
      curPlat = b.getAttribute('data-p');
      [].forEach.call(filt.querySelectorAll('button'), function(x){ x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      applyFilter();
    });
    search.addEventListener('input', applyFilter);
    applyFilter();
    // table
    var tb = $('#sizeTable tbody');
    if (tb){
      var rows = '';
      SIZES.forEach(function(s){
        rows += '<tr><td>' + esc(PNAME[s.p]) + '</td><td>' + esc(s.n) + '</td><td class="nw"><b>' + pxNice(s) + '</b></td><td class="nw">' + esc(s.r) + '</td><td>' + (s.o ? 'Official' : 'Guides') + '</td></tr>';
      });
      tb.innerHTML = rows;
    }
    var pb = $('#printTable');
    if (pb) pb.addEventListener('click', function(){
      document.body.classList.add('print-table');
      window.print();
      setTimeout(function(){ document.body.classList.remove('print-table'); }, 600);
    });
    window.addEventListener('afterprint', function(){ document.body.classList.remove('print-table'); });
  }
  function applyFilter(){
    var q = (search.value || '').trim().toLowerCase().replace(/\s*[x×]\s*/g, 'x');
    var words = q ? q.split(/\s+/) : [], n = 0;
    [].forEach.call(guide.children, function(c){
      var ok = (curPlat === 'all' || c.getAttribute('data-p') === curPlat);
      if (ok && words.length){ var d = c.getAttribute('data-q'); ok = words.every(function(w){ return d.indexOf(w) > -1; }); }
      c.hidden = !ok; if (ok) n++;
    });
    countEl.textContent = n + (n === 1 ? ' size' : ' sizes');
    var none = $('#sizeNone'); if (none) none.hidden = n > 0;
  }

  /* ---------------- resizer ---------------- */
  var MAX_FULL = 5000, MAX_PREV = 1400;
  var src = null, prev = null, blurFull = null, blurPrev = null, srcName = 'image';
  var outsEl = $('#outputs'), status = $('#rzStatus');
  var DEF_IDS = SIZES.filter(function(s){ return s.def; }).map(function(s){ return s.id; });
  var CHIP_IDS = ['ig-portrait','ig-story','ig-square','yt-thumb','li-landscape','ig-34','pin','x-header','li-banner','fb-cover','yt-banner','rda-square','gd-300x250'];
  var BG = {white:'#ffffff', black:'#000000', green:'#84C226'};
  var settings = store('settings') || {};
  var S = {mode: settings.mode || 'fill', bg: settings.bg || 'blur', fmt: settings.fmt || 'jpg', fx: .5, fy: .5};
  var outs = [];

  function say(t){ if (status) status.textContent = t; }
  function sizeObj(id){
    if (BY_ID[id]) return BY_ID[id];
    var m = /^custom-(\d+)x(\d+)$/.exec(id);
    if (m) return {id:id, p:'custom', n:'Custom size', w:+m[1], h:+m[2], r:ratioOf(+m[1], +m[2]), o:1, t:''};
    return null;
  }
  function ratioOf(w, h){ function g(a, b){ return b ? g(b, a % b) : a; } var d = g(w, h), a = w / d, b = h / d; return (a > 50 || b > 50) ? (w / h).toFixed(2) + ':1' : a + ':' + b; }
  function newOut(id){ return {id:id, s:sizeObj(id), mode:S.mode, bg:S.bg, fx:S.fx, fy:S.fy, safe:true}; }
  function saveSel(){ store('outs', outs.map(function(o){ return o.id; })); store('settings', {mode:S.mode, bg:S.bg, fmt:S.fmt}); }

  function addOutput(id){
    if (!sizeObj(id)) return;
    for (var i = 0; i < outs.length; i++) if (outs[i].id === id){ flash(outs[i]); return; }
    var o = newOut(id); outs.push(o); buildCard(o); syncChips(); saveSel(); render(o);
    say(o.s.n + ' added.');
  }
  function removeOutput(id){
    outs = outs.filter(function(o){ if (o.id === id && o.card) o.card.remove(); return o.id !== id; });
    syncChips(); saveSel(); updateEmpty();
  }
  function flash(o){ if (!o.card) return; o.card.classList.remove('flash'); void o.card.offsetWidth; o.card.classList.add('flash'); }
  function syncChips(){
    [].forEach.call(document.querySelectorAll('#rzChips input'), function(c){ c.checked = outs.some(function(o){ return o.id === c.value; }); });
    var n = $('#outCount'); if (n) n.textContent = outs.length;
    updateEmpty();
  }
  function updateEmpty(){
    var e = $('#outEmpty'); if (e) e.hidden = outs.length > 0;
    var b = $('#dlAll'); if (b) b.disabled = !src || !outs.length;
  }

  /* drawing */
  function hq(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh){
    // step down by halves for big reductions so edges stay smooth
    var cur = img, cx = sx, cy = sy, cw = sw, ch = sh, tmp = [];
    while (cw > dw * 2.2 && ch > dh * 2.2){
      var nw = Math.max(1, Math.round(cw / 2)), nh = Math.max(1, Math.round(ch / 2));
      var c = document.createElement('canvas'); c.width = nw; c.height = nh;
      var x = c.getContext('2d'); x.imageSmoothingEnabled = true; x.imageSmoothingQuality = 'high';
      x.drawImage(cur, cx, cy, cw, ch, 0, 0, nw, nh);
      tmp.push(c); cur = c; cx = 0; cy = 0; cw = nw; ch = nh;
    }
    ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(cur, cx, cy, cw, ch, dx, dy, dw, dh);
    tmp.forEach(function(c){ c.width = c.height = 0; });
  }
  function cropRect(o, img){
    var iw = img.width, ih = img.height, W = o.s.w, H = o.s.h;
    var s = Math.max(W / iw, H / ih), cw = W / s, ch = H / s;
    var sx = clamp(o.fx * iw - cw / 2, 0, iw - cw), sy = clamp(o.fy * ih - ch / 2, 0, ih - ch);
    return {sx:sx, sy:sy, cw:cw, ch:ch, iw:iw, ih:ih};
  }
  function makeBlur(img){
    var r = 24 / Math.max(img.width, img.height);
    var a = document.createElement('canvas'); a.width = Math.max(2, Math.round(img.width * r)); a.height = Math.max(2, Math.round(img.height * r));
    var ax = a.getContext('2d'); ax.imageSmoothingQuality = 'high'; ax.drawImage(img, 0, 0, a.width, a.height);
    var b = document.createElement('canvas'); b.width = a.width * 4; b.height = a.height * 4;
    var bx = b.getContext('2d'); bx.imageSmoothingEnabled = true; bx.imageSmoothingQuality = 'high'; bx.drawImage(a, 0, 0, b.width, b.height);
    return b;
  }
  function paint(ctx, W, H, o, img, blur, opaque){
    ctx.clearRect(0, 0, W, H);
    if (opaque || o.mode === 'fit'){ ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H); }
    if (o.mode === 'fill'){
      var c = cropRect(o, img), k = W / o.s.w;
      hq(ctx, img, c.sx, c.sy, c.cw, c.ch, 0, 0, W, H);
      return;
    }
    if (o.bg === 'blur' && blur){
      var s2 = Math.max(W / blur.width, H / blur.height), bw = blur.width * s2, bh = blur.height * s2;
      ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(blur, (W - bw) / 2, (H - bh) / 2, bw, bh);
      ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(0, 0, W, H);
    } else { ctx.fillStyle = BG[o.bg] || '#ffffff'; ctx.fillRect(0, 0, W, H); }
    var s = Math.min(W / img.width, H / img.height), dw = img.width * s, dh = img.height * s;
    hq(ctx, img, 0, 0, img.width, img.height, (W - dw) / 2, (H - dh) / 2, dw, dh);
  }

  /* cards */
  function overlaySVG(o){
    var s = o.s, W = s.w, H = s.h, ov = s.ov, g = '';
    if (ov === 'story'){
      var t = Math.round(H * .14), b = Math.round(H * .20);
      g = '<rect x="0" y="0" width="' + W + '" height="' + t + '" fill="rgba(0,0,0,.45)"/><rect x="0" y="' + (H - b) + '" width="' + W + '" height="' + b + '" fill="rgba(0,0,0,.45)"/>' +
          '<line x1="0" y1="' + t + '" x2="' + W + '" y2="' + t + '" stroke="#C3D92B" stroke-width="' + W / 200 + '" stroke-dasharray="' + W / 60 + '"/><line x1="0" y1="' + (H - b) + '" x2="' + W + '" y2="' + (H - b) + '" stroke="#C3D92B" stroke-width="' + W / 200 + '" stroke-dasharray="' + W / 60 + '"/>' +
          '<text x="' + W / 2 + '" y="' + t * .62 + '" text-anchor="middle" font-size="' + W / 18 + '" fill="#fff" font-family="Lato,Arial,sans-serif" font-weight="700">Profile and close (approx.)</text>' +
          '<text x="' + W / 2 + '" y="' + (H - b * .45) + '" text-anchor="middle" font-size="' + W / 18 + '" fill="#fff" font-family="Lato,Arial,sans-serif" font-weight="700">Reply bar and captions (approx.)</text>';
    } else if (ov === 'circle'){
      g = '<path fill-rule="evenodd" fill="rgba(0,0,0,.45)" d="M0 0H' + W + 'V' + H + 'H0Z M' + W / 2 + ' 0 A' + W / 2 + ' ' + H / 2 + ' 0 1 0 ' + W / 2 + ' ' + H + ' A' + W / 2 + ' ' + H / 2 + ' 0 1 0 ' + W / 2 + ' 0Z"/>';
    } else if (ov === 'ytb'){
      var sw = W * 1546 / 2560, sh = H * 423 / 1440, tw = W * 1855 / 2560;
      g = '<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="rgba(0,0,0,.25)"/>' +
          '<rect x="' + (W - tw) / 2 + '" y="' + (H - sh) / 2 + '" width="' + tw + '" height="' + sh + '" fill="none" stroke="#fff" stroke-width="' + W / 300 + '" stroke-dasharray="' + W / 80 + '"/>' +
          '<rect x="' + (W - sw) / 2 + '" y="' + (H - sh) / 2 + '" width="' + sw + '" height="' + sh + '" fill="rgba(132,194,38,.25)" stroke="#C3D92B" stroke-width="' + W / 250 + '"/>' +
          '<text x="' + W / 2 + '" y="' + ((H - sh) / 2 - W / 80) + '" text-anchor="middle" font-size="' + W / 26 + '" fill="#fff" font-family="Lato,Arial,sans-serif" font-weight="700">Safe area on all devices</text>';
    }
    return g ? '<svg class="ov" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none" aria-hidden="true">' + g + '</svg>' : '';
  }
  function buildCard(o){
    var s = o.s, uid = 'o-' + o.id;
    var c = el('article', {'class':'ocard', 'data-id':o.id});
    var hasOv = !!s.ov;
    c.innerHTML =
      '<div class="oc-head"><div><h3>' + esc(s.n) + '</h3><p>' + pxNice(s) + ' px &middot; ' + esc(s.r) + '</p></div>' +
      '<button type="button" class="oc-x" aria-label="Remove ' + esc(s.n) + '">&times;</button></div>' +
      '<div class="stage"><div class="pv" tabindex="0" role="img" aria-label="Preview of ' + esc(s.n) + '. Drag or use arrow keys to move the crop.">' +
      '<canvas width="2" height="2"></canvas>' + (hasOv ? overlaySVG(o) : '') + '<span class="fp" aria-hidden="true"></span></div></div>' +
      '<div class="oc-ctl">' +
        '<div class="seg" role="group" aria-label="Crop mode"><button type="button" data-mode="fill">Fill</button><button type="button" data-mode="fit">Fit</button></div>' +
        '<label class="bgsel"><span class="sr-only">Background for Fit</span><select data-bg>' +
          '<option value="blur">Blurred photo</option><option value="white">White</option><option value="black">Black</option><option value="green">Brand green</option></select></label>' +
        (hasOv ? '<label class="ovtog"><input type="checkbox" data-safe checked> <span>Safe zone</span></label>' : '') +
      '</div>' +
      '<p class="oc-hint"></p>' +
      '<div class="oc-dl"><button type="button" class="btn small" data-dl disabled>Download</button><button type="button" class="linkbtn" data-all>Use this crop point for all</button><span class="oc-size" aria-live="polite"></span></div>';
    o.card = c; o.pv = $('.pv', c); o.cv = $('canvas', c); o.fp = $('.fp', c); o.ov = $('.ov', c);
    outsEl.appendChild(c);
    $('.oc-x', c).addEventListener('click', function(){ removeOutput(o.id); });
    [].forEach.call(c.querySelectorAll('[data-mode]'), function(b){ b.addEventListener('click', function(){ o.mode = b.getAttribute('data-mode'); render(o); }); });
    var sel = $('[data-bg]', c); sel.value = o.bg; sel.addEventListener('change', function(){ o.bg = sel.value; render(o); });
    var sf = $('[data-safe]', c); if (sf) sf.addEventListener('change', function(){ o.safe = sf.checked; render(o); });
    $('[data-dl]', c).addEventListener('click', function(){ downloadOne(o); });
    $('[data-all]', c).addEventListener('click', function(){
      S.fx = o.fx; S.fy = o.fy;
      outs.forEach(function(x){ x.fx = o.fx; x.fy = o.fy; render(x); });
      say('Crop point copied to every size.');
    });
    bindDrag(o);
    updateEmpty();
  }

  function render(o){
    if (!o.card) return;
    var c = o.card, s = o.s;
    [].forEach.call(c.querySelectorAll('[data-mode]'), function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-mode') === o.mode ? 'true' : 'false'); });
    $('.bgsel', c).hidden = o.mode !== 'fit';
    if (o.ov) o.ov.style.display = o.safe ? '' : 'none';
    $('.oc-hint', c).textContent = !src ? 'Add an image to see the preview.' : o.mode === 'fill' ? 'Fill crops to the exact shape. Drag the picture, or tap where the subject is.' : 'Fit shows the whole picture with a background behind it.';
    $('[data-dl]', c).disabled = !src;
    c.classList.toggle('fit', o.mode === 'fit');
    if (!src){ layout(o); o.cv.width = 2; o.cv.height = 2; o.fp.hidden = true; return; }
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var bw = layout(o);
    var cw = Math.max(40, Math.round(bw * dpr)), ch = Math.max(20, Math.round(cw * s.h / s.w));
    if (o.cv.width !== cw || o.cv.height !== ch){ o.cv.width = cw; o.cv.height = ch; }
    var tmp = {s:{w:cw, h:ch}, mode:o.mode, bg:o.bg, fx:o.fx, fy:o.fy};
    paint(o.cv.getContext('2d'), cw, ch, tmp, prev, blurPrev, false);
    if (o.mode === 'fill'){
      var r = cropRect(o, prev);
      o.fp.hidden = false;
      o.fp.style.left = clamp((o.fx * r.iw - r.sx) / r.cw * 100, 0, 100) + '%';
      o.fp.style.top = clamp((o.fy * r.ih - r.sy) / r.ch * 100, 0, 100) + '%';
    } else o.fp.hidden = true;
  }
  function renderAll(){ outs.forEach(render); }
  function layout(o){
    // size the preview box to the output shape, capped in height so tall formats stay compact
    var st = o.pv.parentNode, avail = Math.max(60, (st.clientWidth || 280) - 20), maxH = 320;
    var w = Math.min(avail, maxH * o.s.w / o.s.h), h = w * o.s.h / o.s.w;
    o.pv.style.width = w.toFixed(1) + 'px'; o.pv.style.height = h.toFixed(1) + 'px';
    return w;
  }

  function bindDrag(o){
    var pv = o.pv, start = null;
    function lim(){
      // keep the focus point inside the range that actually moves the crop
      var r = cropRect(o, prev), hx = r.cw / r.iw / 2, hy = r.ch / r.ih / 2;
      o.fx = clamp(o.fx, hx, 1 - hx); o.fy = clamp(o.fy, hy, 1 - hy);
      return r;
    }
    pv.addEventListener('pointerdown', function(e){
      if (!src || o.mode !== 'fill') return;
      lim();
      start = {x:e.clientX, y:e.clientY, fx:o.fx, fy:o.fy, moved:false, r:cropRect(o, prev), b:pv.getBoundingClientRect()};
      try { pv.setPointerCapture(e.pointerId); } catch (er) {}
      e.preventDefault();
    });
    pv.addEventListener('pointermove', function(e){
      if (!start) return;
      var dx = e.clientX - start.x, dy = e.clientY - start.y;
      if (!start.moved && Math.abs(dx) + Math.abs(dy) < 5) return;
      start.moved = true; pv.classList.add('dragging');
      o.fx = start.fx - dx / start.b.width * (start.r.cw / start.r.iw);
      o.fy = start.fy - dy / start.b.height * (start.r.ch / start.r.ih);
      lim(); render(o);
    });
    function end(e){
      if (!start) return;
      if (!start.moved){
        var r = start.r, b = start.b;
        o.fx = (r.sx + (e.clientX - b.left) / b.width * r.cw) / r.iw;
        o.fy = (r.sy + (e.clientY - b.top) / b.height * r.ch) / r.ih;
        lim(); render(o);
      }
      pv.classList.remove('dragging'); start = null;
    }
    pv.addEventListener('pointerup', end);
    pv.addEventListener('pointercancel', function(){ pv.classList.remove('dragging'); start = null; });
    pv.addEventListener('keydown', function(e){
      if (!src || o.mode !== 'fill') return;
      var k = {ArrowLeft:[-1,0], ArrowRight:[1,0], ArrowUp:[0,-1], ArrowDown:[0,1]}[e.key];
      if (!k) return;
      e.preventDefault();
      var st = e.shiftKey ? .1 : .02;
      lim(); o.fx += k[0] * st; o.fy += k[1] * st; lim(); render(o);
    });
  }

  /* loading */
  function toCanvas(img, max){
    var w = img.width, h = img.height, r = Math.min(1, max / Math.max(w, h));
    var c = document.createElement('canvas'); c.width = Math.max(1, Math.round(w * r)); c.height = Math.max(1, Math.round(h * r));
    hq(c.getContext('2d'), img, 0, 0, w, h, 0, 0, c.width, c.height);
    return c;
  }
  function decode(file){
    if (window.createImageBitmap){
      return createImageBitmap(file, {imageOrientation:'from-image'}).catch(function(){ return createImageBitmap(file); }).catch(function(){ return viaImg(file); });
    }
    return viaImg(file);
  }
  function viaImg(file){
    return new Promise(function(res, rej){
      var u = URL.createObjectURL(file), im = new Image();
      im.onload = function(){ res(im); setTimeout(function(){ URL.revokeObjectURL(u); }, 1000); };
      im.onerror = function(){ URL.revokeObjectURL(u); rej(new Error('decode')); };
      im.src = u;
    });
  }
  function isHeic(f){ return /hei[cf]$/i.test(f.name || '') || /hei[cf]/i.test(f.type || ''); }
  function loadFile(f){
    if (!f) return;
    if (f.type && !/^image\//.test(f.type) && !isHeic(f)){ say('That file is not an image. Choose a JPG, PNG or WebP.'); return; }
    say('Opening ' + (f.name || 'image') + '…');
    decode(f).then(function(img){
      useImage(img, (f.name || 'image').replace(/\.[^.]+$/, ''), f.size);
    }, function(){
      say(isHeic(f) ? 'This browser cannot open HEIC photos. On iPhone, share the photo as a JPG first, or set Settings > Camera > Formats to Most Compatible. Safari on a Mac usually opens HEIC.' : 'Sorry, this image could not be opened. Try saving it as a JPG or PNG first.');
    });
  }
  function useImage(img, name, bytes){
    var w = img.width, h = img.height;
    if (src && src.close) try { src.close(); } catch (e) {}
    [src, prev, blurFull, blurPrev].forEach(function(c){ if (c && c.getContext) { c.width = c.height = 0; } });
    src = Math.max(w, h) > MAX_FULL ? toCanvas(img, MAX_FULL) : img;
    prev = toCanvas(src, MAX_PREV);
    if (src !== img && img.close) try { img.close(); } catch (e) {}
    blurFull = makeBlur(prev); blurPrev = blurFull;
    srcName = (name || 'image').replace(/[^a-z0-9_-]+/gi, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'image';
    var info = $('#srcInfo');
    if (info) info.innerHTML = '<b>' + esc(name || 'Image') + '</b> &middot; ' + w.toLocaleString('en-GB') + ' &times; ' + h.toLocaleString('en-GB') + ' px' + (bytes ? ' &middot; ' + fmtBytes(bytes) : '') + (src !== img ? ' <span>(scaled to ' + src.width + ' &times; ' + src.height + ' for speed)</span>' : '');
    $('#drop').classList.add('has');
    S.fx = .5; S.fy = .5;
    outs.forEach(function(o){ o.fx = .5; o.fy = .5; });
    renderAll(); updateEmpty();
    var small = outs.filter(function(o){ return o.s.w > w * 1.05 || o.s.h > h * 1.05; });
    say('Image ready. ' + outs.length + ' sizes previewed.' + (small.length ? ' Your image is smaller than ' + small.length + ' of the sizes, so those will be scaled up and may look soft.' : ''));
  }
  function fmtBytes(b){ return b > 1048576 ? (b / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB'; }

  function sampleImage(){
    var c = document.createElement('canvas'); c.width = 3000; c.height = 2000;
    var x = c.getContext('2d'), g = x.createLinearGradient(0, 0, 0, 2000);
    g.addColorStop(0, '#C3D92B'); g.addColorStop(.6, '#84C226'); g.addColorStop(1, '#3d6b00');
    x.fillStyle = g; x.fillRect(0, 0, 3000, 2000);
    x.fillStyle = '#F1EFE9'; x.beginPath(); x.arc(1900, 760, 330, 0, Math.PI * 2); x.fill();
    x.fillStyle = '#111'; x.beginPath(); x.moveTo(0, 1500); x.quadraticCurveTo(700, 1050, 1500, 1450); x.quadraticCurveTo(2300, 1850, 3000, 1300); x.lineTo(3000, 2000); x.lineTo(0, 2000); x.fill();
    x.fillStyle = '#000'; x.font = '800 150px Raleway, Arial, sans-serif'; x.fillText('SAMPLE', 160, 300);
    x.font = '700 70px Lato, Arial, sans-serif'; x.fillText('3000 x 2000 px', 165, 400);
    useImage(c, 'crea8hub-sample', 0);
  }

  /* export */
  var exportCv = null;
  function exportBlob(o){
    return new Promise(function(res, rej){
      var W = o.s.w, H = o.s.h;
      exportCv = exportCv || document.createElement('canvas');
      exportCv.width = W; exportCv.height = H;
      var jpg = S.fmt === 'jpg';
      paint(exportCv.getContext('2d'), W, H, o, src, blurFull, jpg);
      exportCv.toBlob(function(b){ b ? res(b) : rej(new Error('export')); }, jpg ? 'image/jpeg' : 'image/png', jpg ? .9 : undefined);
    });
  }
  function fileName(o){ return srcName + '-' + (o.s.p === 'custom' ? 'custom' : o.id) + '-' + o.s.w + 'x' + o.s.h + '.' + (S.fmt === 'jpg' ? 'jpg' : 'png'); }
  function save(blob, name){
    var u = URL.createObjectURL(blob), a = el('a', {href:u, download:name});
    a.style.display = 'none'; document.body.appendChild(a); a.click();
    setTimeout(function(){ URL.revokeObjectURL(u); a.remove(); }, 4000);
  }
  function noteSize(o, b){
    var n = $('.oc-size', o.card); if (!n) return;
    var over = o.s.kb && b.size > o.s.kb * 1024;
    n.innerHTML = fmtBytes(b.size) + (over ? ' <em>over the ' + fmtBytes(o.s.kb * 1024) + ' limit: try JPG or a simpler image</em>' : '');
  }
  function downloadOne(o){
    if (!src) return;
    say('Saving ' + o.s.n + '…');
    exportBlob(o).then(function(b){ noteSize(o, b); save(b, fileName(o)); say(o.s.n + ' saved as ' + fileName(o) + '.'); }, function(){ say('Sorry, that size could not be saved. Your device may be low on memory.'); });
  }
  function downloadAll(){
    if (!src || !outs.length) return;
    var btn = $('#dlAll'); btn.disabled = true;
    var files = {}, list = outs.slice(), i = 0, zip = window.fflate && window.fflate.zipSync;
    function next(){
      if (i >= list.length){
        if (zip){
          try {
            var data = zip(files, {level:0});
            save(new Blob([data], {type:'application/zip'}), srcName + '-crea8hub-sizes.zip');
            say('Saved ' + list.length + ' images in one zip file.');
          } catch (e) { say('Could not build the zip. Download the sizes one by one instead.'); }
        } else say('Saved ' + list.length + ' images.');
        btn.disabled = false; return;
      }
      var o = list[i++];
      say('Preparing ' + i + ' of ' + list.length + ': ' + o.s.n + '…');
      exportBlob(o).then(function(b){
        noteSize(o, b);
        if (zip) return b.arrayBuffer().then(function(ab){ files[fileName(o)] = [new Uint8Array(ab), {level:0}]; });
        save(b, fileName(o));
        return new Promise(function(r){ setTimeout(r, 400); });
      }).then(function(){ setTimeout(next, 30); }, function(){ say('Stopped: ' + o.s.n + ' could not be saved.'); btn.disabled = false; });
    }
    next();
  }

  function initResizer(){
    if (!outsEl) return;
    // chips
    var chips = $('#rzChips');
    CHIP_IDS.forEach(function(id){
      var s = BY_ID[id]; if (!s) return;
      var l = el('label', {'class':'opt'});
      l.innerHTML = '<input type="checkbox" value="' + id + '"><span>' + esc(shortName(s)) + ' <small>' + s.w + '&times;' + s.h + '</small></span>';
      chips.appendChild(l);
    });
    chips.addEventListener('change', function(e){
      var c = e.target; if (!c.value) return;
      if (c.checked) addOutput(c.value); else removeOutput(c.value);
    });
    // more sizes select
    var more = $('#rzMore');
    PLATS.forEach(function(p){
      var og = el('optgroup', {label: p[0] === 'google' ? 'Google' : p[1]});
      SIZES.filter(function(s){ return s.p === p[0]; }).forEach(function(s){ og.appendChild(el('option', {value:s.id, text:s.n + ' (' + s.w + ' x ' + s.h + ')'})); });
      more.appendChild(og);
    });
    more.addEventListener('change', function(){ if (more.value){ addOutput(more.value); more.value = ''; } });
    $('#rzCustom').addEventListener('submit', function(e){
      e.preventDefault();
      var w = parseInt($('#cw').value, 10), h = parseInt($('#ch').value, 10);
      if (!(w >= 16 && h >= 16 && w <= 8000 && h <= 8000)){ say('Enter a width and height between 16 and 8,000 pixels.'); return; }
      addOutput('custom-' + w + 'x' + h);
    });
    // global settings
    function bindRadio(name, key){
      [].forEach.call(document.querySelectorAll('input[name="' + name + '"]'), function(r){
        r.checked = r.value === S[key];
        r.addEventListener('change', function(){
          if (!r.checked) return;
          S[key] = r.value; saveSel();
          if (key === 'mode' || key === 'bg'){ outs.forEach(function(o){ o[key] = r.value; var sl = $('[data-bg]', o.card); if (sl) sl.value = o.bg; render(o); }); }
        });
      });
    }
    bindRadio('gmode', 'mode'); bindRadio('gbg', 'bg'); bindRadio('gfmt', 'fmt');
    // file input + drop + paste
    var inp = $('#file'), drop = $('#drop');
    inp.addEventListener('change', function(){ loadFile(inp.files && inp.files[0]); inp.value = ''; });
    ['dragenter','dragover'].forEach(function(ev){ drop.addEventListener(ev, function(e){ e.preventDefault(); drop.classList.add('over'); }); });
    ['dragleave','drop'].forEach(function(ev){ drop.addEventListener(ev, function(e){ e.preventDefault(); drop.classList.remove('over'); }); });
    drop.addEventListener('drop', function(e){ var f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]; loadFile(f); });
    document.addEventListener('paste', function(e){
      var it = e.clipboardData && e.clipboardData.files && e.clipboardData.files[0];
      if (it && /^image\//.test(it.type)) loadFile(it);
    });
    $('#sample').addEventListener('click', sampleImage);
    $('#dlAll').addEventListener('click', downloadAll);
    // initial outputs
    var saved = store('outs');
    var ids = (saved && saved.length ? saved : DEF_IDS).filter(sizeObj);
    ids.forEach(function(id){ var o = newOut(id); outs.push(o); buildCard(o); });
    syncChips(); renderAll();
    var rt; window.addEventListener('resize', function(){ clearTimeout(rt); rt = setTimeout(renderAll, 150); });
  }
  function shortName(s){
    return ({'ig-portrait':'Instagram portrait','ig-story':'Story / Reel','ig-square':'Square post','yt-thumb':'YouTube thumbnail','li-landscape':'LinkedIn / Facebook landscape',
      'ig-34':'Instagram 3:4','pin':'Pinterest pin','x-header':'X header','li-banner':'LinkedIn banner','fb-cover':'Facebook cover','yt-banner':'YouTube banner','rda-square':'Google Ads square','gd-300x250':'Display 300x250'})[s.id] || s.n;
  }

  /* sources */
  function buildSources(){
    var ol = $('#sizeSources'); if (!ol) return;
    (window.C8_SOURCES || []).forEach(function(s){
      var li = el('li'); li.appendChild(el('a', {href:s[1], target:'_blank', rel:'noopener', text:s[0]})); ol.appendChild(li);
    });
  }

  var st = $('#statSizes'); if (st) st.textContent = SIZES.length;
  buildGuide(); buildSources(); initResizer();
  window.C8Sizes = {add:addOutput, outputs:function(){ return outs; }};
})();
