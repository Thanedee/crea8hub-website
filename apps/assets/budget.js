/* Crea8Hub Naira Ad Budget Calculator. Vanilla JS, works offline. */
(function () {
  'use strict';

  var WA = 'https://wa.me/2348060599741';
  var STORE = 'c8h-budget-v1';
  var VAT = 0.075;
  var FREQ = 2.5;
  var DEFAULTS = {
    budget: 500000, days: 14, rate: 1334, goal: 'leads', aud: 'lagos', bill: 'naira', fx: 2,
    auto: true, plats: { meta: true, google: true, tiktok: false, youtube: false },
    split: { meta: 60, google: 40, tiktok: 0, youtube: 0 }
  };

  var NAMES = { meta: 'Facebook & Instagram', google: 'Google Search', tiktok: 'TikTok', youtube: 'YouTube' };
  var ORDER = ['meta', 'google', 'tiktok', 'youtube'];

  /* Benchmarks in USD: [low, typical, high]. Rates in %. See "How we calculate". */
  var B = {
    meta:    { kind: 'cpm', cost: [0.8, 1.5, 3.0], ctr: [0.7, 1.2, 1.8], lead: [10, 22, 40], sale: [0.8, 2, 4], naira: true },
    google:  { kind: 'cpc', cost: [0.3, 0.66, 1.5], ctr: [3, 5, 8], lead: [3, 5, 8], sale: [1, 2, 4], naira: true },
    tiktok:  { kind: 'cpm', cost: [0.5, 1.2, 3.0], ctr: [0.4, 0.8, 1.5], lead: [4, 10, 20], sale: [0.3, 1, 2], naira: false },
    youtube: { kind: 'cpm', cost: [1.0, 3.0, 8.0], ctr: [0.1, 0.3, 0.6], lead: [2, 5, 10], sale: [0.3, 1, 2], naira: true }
  };
  /* Cost multipliers by goal (social CPM), YouTube CPM, and CTR multipliers by goal */
  var GOAL_CPM = { awareness: 0.6, traffic: 1.0, leads: 1.8, sales: 2.2 };
  var GOAL_YT = { awareness: 0.7, traffic: 1.0, leads: 1.3, sales: 1.5 };
  var GOAL_CTR = { awareness: 0.6, traffic: 1.25, leads: 1.0, sales: 1.0 };
  var AUD = { lagos: 1.15, cities: 1.05, national: 1.0 };
  var AUD_TXT = { lagos: 'Lagos only', cities: 'major cities', national: 'nationwide' };
  var AUTO = {
    awareness: { meta: 45, google: 10, tiktok: 30, youtube: 25 },
    traffic:   { meta: 45, google: 30, tiktok: 25, youtube: 10 },
    leads:     { meta: 55, google: 35, tiktok: 15, youtube: 5 },
    sales:     { meta: 50, google: 40, tiktok: 15, youtube: 5 }
  };
  var GOAL_TXT = {
    awareness: { res: 'people reached', one: 'Reach', cpr: 'Cost per 1,000 reached', wa: 'Awareness' },
    traffic: { res: 'clicks', one: 'Clicks', cpr: 'Cost per click', wa: 'Website traffic' },
    leads: { res: 'leads or WhatsApp chats', one: 'Leads or chats', cpr: 'Cost per lead', wa: 'Leads / WhatsApp chats' },
    sales: { res: 'sales', one: 'Sales', cpr: 'Cost per sale', wa: 'Online sales' }
  };

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var state = clone(DEFAULTS);
  var last = null;

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  /* ---------- formatting ---------- */
  function sig(n, s) {
    if (!isFinite(n) || n === 0) return 0;
    var d = Math.ceil(Math.log10(Math.abs(n)));
    var p = s - d;
    var m = Math.pow(10, p);
    return Math.round(n * m) / m;
  }
  function commas(n) { return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  function fmtN(n) {
    if (!isFinite(n)) return '0';
    if (n >= 1e6) return (sig(n, 3) / 1e6).toFixed(n >= 1e7 ? 1 : 2).replace(/\.?0+$/, '') + 'M';
    if (n >= 100) return commas(sig(n, 2));
    if (n >= 10) return commas(n);
    if (n >= 1) return (Math.round(n * 10) / 10).toString().replace(/\.0$/, '');
    return n > 0 ? '<1' : '0';
  }
  function fmtNaira(n) {
    if (!isFinite(n)) return '–';
    if (n >= 1000) return '₦' + commas(sig(n, 3));
    return '₦' + commas(n);
  }
  function fmtNairaExact(n) { return '₦' + commas(n); }
  function fmtUsd(n) { return '$' + (n >= 100 ? commas(n) : (Math.round(n * 100) / 100).toFixed(2)); }
  function range(a, b, f) {
    f = f || fmtN;
    var x = f(a), y = f(b);
    return x === y ? x : x + '–' + y;
  }
  function list(arr) {
    if (arr.length <= 1) return arr.join('');
    return arr.slice(0, -1).join(', ') + ' and ' + arr[arr.length - 1];
  }

  /* ---------- storage ---------- */
  function save() {
    try { localStorage.setItem(STORE, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }
  function load() {
    try {
      var raw = localStorage.getItem(STORE);
      if (!raw) return;
      var s = JSON.parse(raw);
      if (s && typeof s === 'object') {
        Object.keys(DEFAULTS).forEach(function (k) { if (s[k] !== undefined) state[k] = s[k]; });
        ORDER.forEach(function (p) {
          state.plats[p] = !!(s.plats && s.plats[p]);
          state.split[p] = Math.max(0, Math.min(100, Number(s.split && s.split[p]) || 0));
        });
        if (!ORDER.some(function (p) { return state.plats[p]; })) state.plats.meta = true;
      }
    } catch (e) { state = clone(DEFAULTS); }
  }

  /* ---------- split logic ---------- */
  function active() { return ORDER.filter(function (p) { return state.plats[p]; }); }

  function normalise(weights) {
    var act = active();
    var tot = act.reduce(function (s, p) { return s + (weights[p] || 0); }, 0);
    var out = {}, sum = 0;
    ORDER.forEach(function (p) { out[p] = 0; });
    if (!act.length) return out;
    act.forEach(function (p) {
      out[p] = tot > 0 ? Math.round((weights[p] || 0) / tot * 100) : Math.round(100 / act.length);
      sum += out[p];
    });
    // fix rounding on the largest share
    var big = act.reduce(function (a, b) { return out[a] >= out[b] ? a : b; });
    out[big] += 100 - sum;
    return out;
  }

  function autoSplit() { state.split = normalise(AUTO[state.goal]); }

  function moveSlider(p, v) {
    var act = active();
    v = Math.max(0, Math.min(100, v));
    if (act.length === 1) { state.split[p] = 100; return; }
    var others = act.filter(function (q) { return q !== p; });
    var rest = 100 - v;
    var otot = others.reduce(function (s, q) { return s + state.split[q]; }, 0);
    state.split[p] = v;
    var sum = 0;
    others.forEach(function (q, i) {
      var val = otot > 0 ? Math.round(state.split[q] / otot * rest) : Math.round(rest / others.length);
      if (i === others.length - 1) val = rest - sum;
      state.split[q] = Math.max(0, val);
      sum += state.split[q];
    });
  }

  /* ---------- maths ---------- */
  /* How far each benchmark can move the result, on a log scale.
     good = towards the strong-campaign edge, bad = towards the weak edge. */
  var K = 0.6;
  function spread(arr, higherIsBetter) {
    var lo = Math.log(arr[1] / arr[0]), hi = Math.log(arr[2] / arr[1]);
    return higherIsBetter ? { good: hi, bad: lo } : { good: lo, bad: hi };
  }
  /* [weak, typical, strong] for a value whose uncertainty comes from several independent factors */
  function band(typ, factors) {
    var g = 0, b = 0;
    factors.forEach(function (f) { g += f.good * f.good; b += f.bad * f.bad; });
    return [typ * Math.exp(-K * Math.sqrt(b)), typ, typ * Math.exp(K * Math.sqrt(g))];
  }

  function compute() {
    var s = state;
    var budget = Math.max(0, Number(s.budget) || 0);
    var days = Math.max(1, Math.round(Number(s.days) || 1));
    var rate = Math.max(1, Number(s.rate) || DEFAULTS.rate);
    var fxFee = Math.max(0, Math.min(50, Number(s.fx) || 0)) / 100;
    var goal = s.goal, aud = AUD[s.aud] || 1;
    var act = active();

    var res = { budget: budget, days: days, rate: rate, goal: goal, plats: [], vat: 0, fee: 0, spend: 0,
      impr: [0, 0, 0], reach: [0, 0, 0], clicks: [0, 0, 0], results: [0, 0, 0] };

    act.forEach(function (p) {
      var share = (s.split[p] || 0) / 100;
      var gross = budget * share;
      var feeRate = (s.bill === 'usd' || !B[p].naira) ? fxFee : 0;
      var afterFee = gross / (1 + feeRate);
      var spend = afterFee / (1 + VAT);
      var vat = afterFee - spend;
      var fee = gross - afterFee;
      var usd = spend / rate;
      var b = B[p];
      var row = { p: p, share: share, gross: gross, spend: spend, usd: usd, vat: vat, fee: fee,
        impr: [], reach: [], clicks: [], results: [], cpr: [] };

      var costMult = aud * (p === 'youtube' ? GOAL_YT[goal] : (b.kind === 'cpm' ? GOAL_CPM[goal] : 1));
      var convArr = goal === 'sales' ? b.sale : b.lead;
      var ctrMult = b.kind === 'cpm' ? GOAL_CTR[goal] : 1;

      // typical case
      var c = b.cost[1] * costMult, r = Math.min(b.ctr[1] * ctrMult, 20) / 100, impr, clicks;
      if (b.kind === 'cpc') { clicks = usd / c; impr = clicks / r; }
      else { impr = usd / c * 1000; clicks = impr * r; }
      var reach = impr / FREQ;
      var result = goal === 'awareness' ? reach : goal === 'traffic' ? clicks : clicks * convArr[1] / 100;

      // ranges: combine each factor's uncertainty (log scale, in quadrature)
      var fCost = spread(b.cost, false), fCtr = spread(b.ctr, true), fConv = spread(convArr, true);
      var fImpr = [fCost];
      var fClicks = b.kind === 'cpc' ? [fCost] : [fCost, fCtr];
      var fRes = goal === 'awareness' ? fImpr : goal === 'traffic' ? fClicks : fClicks.concat([fConv]);
      row.impr = band(impr, fImpr);
      row.reach = band(reach, fImpr);
      row.clicks = band(clicks, fClicks);
      row.results = band(result, fRes);
      row.cpr = row.results.map(function (v) {
        if (goal === 'awareness') return v > 0 ? spend / v * 1000 : Infinity;
        return v > 0 ? spend / v : Infinity;
      });
      for (var i = 0; i < 3; i++) {
        res.impr[i] += row.impr[i]; res.reach[i] += row.reach[i]; res.clicks[i] += row.clicks[i]; res.results[i] += row.results[i];
      }
      res.vat += vat; res.fee += fee; res.spend += spend;
      res.plats.push(row);
    });

    res.usd = res.spend / rate;
    res.daily = budget / days;
    res.cpr = [0, 1, 2].map(function (i) {
      if (goal === 'awareness') return res.reach[i] > 0 ? res.spend / res.reach[i] * 1000 : Infinity;
      return res.results[i] > 0 ? res.spend / res.results[i] : Infinity;
    });
    return res;
  }

  /* ---------- render ---------- */
  function summaryText(r) {
    var t = GOAL_TXT[r.goal];
    var names = r.plats.map(function (x) { return NAMES[x.p]; });
    var where = AUD_TXT[state.aud];
    var s = 'With ' + fmtNairaExact(r.budget) + ' over ' + r.days + ' day' + (r.days === 1 ? '' : 's') +
      ' on ' + list(names) + ' (' + where + '), you could reach about ' + range(r.reach[0], r.reach[2]) + ' people';
    if (r.goal === 'awareness') {
      s += ', at around ' + fmtNaira(r.cpr[1]) + ' per 1,000 people reached.';
    } else if (r.goal === 'traffic') {
      s += ' and get about ' + range(r.clicks[0], r.clicks[2]) + ' clicks to your website, at around ' + fmtNaira(r.cpr[1]) + ' per click.';
    } else {
      s += ' and get about ' + range(r.results[0], r.results[2]) + ' ' + t.res + ', at around ' + fmtNaira(r.cpr[1]) + ' each.';
    }
    s += ' That is about ' + fmtNaira(r.daily) + ' a day.';
    return s;
  }

  function kpi(k, v, small, hl) {
    return '<div class="kpi' + (hl ? ' hl' : '') + '"><span class="k">' + k + '</span><span class="v">' + v + '</span><small>' + small + '</small></div>';
  }

  function render() {
    var r = compute();
    last = r;
    var t = GOAL_TXT[r.goal];

    $('#summary').textContent = summaryText(r);

    var k = '';
    k += kpi('Ad spend', fmtNaira(r.spend), 'About ' + fmtUsd(r.usd) + ' after VAT and fees');
    k += kpi('Daily budget', fmtNaira(r.daily), 'Over ' + r.days + ' day' + (r.days === 1 ? '' : 's'));
    if (r.goal === 'awareness') {
      k += kpi('Impressions', fmtN(r.impr[1]), range(r.impr[0], r.impr[2]));
      k += kpi('Reach', fmtN(r.reach[1]), range(r.reach[0], r.reach[2]) + ' people', true);
      k += kpi('Clicks', fmtN(r.clicks[1]), range(r.clicks[0], r.clicks[2]));
    } else if (r.goal === 'traffic') {
      k += kpi('Impressions', fmtN(r.impr[1]), range(r.impr[0], r.impr[2]));
      k += kpi('Reach', fmtN(r.reach[1]), range(r.reach[0], r.reach[2]) + ' people');
      k += kpi('Clicks', fmtN(r.clicks[1]), range(r.clicks[0], r.clicks[2]), true);
    } else {
      k += kpi('Reach', fmtN(r.reach[1]), range(r.reach[0], r.reach[2]) + ' people');
      k += kpi('Clicks', fmtN(r.clicks[1]), range(r.clicks[0], r.clicks[2]));
      k += kpi(t.one, fmtN(r.results[1]), range(r.results[0], r.results[2]), true);
    }
    k += kpi(t.cpr, fmtNaira(r.cpr[1]), range(r.cpr[2], r.cpr[0], fmtNaira), true);
    $('#kpis').innerHTML = k;

    var b = '';
    b += '<li><span>Total budget</span><span>' + fmtNairaExact(r.budget) + '</span></li>';
    b += '<li class="neg"><span>VAT at 7.5%</span><span>– ' + fmtNairaExact(r.vat) + '</span></li>';
    if (r.fee > 0.5) b += '<li class="neg"><span>Card and FX fees on dollar billing</span><span>– ' + fmtNairaExact(r.fee) + '</span></li>';
    b += '<li class="tot"><span>Left for ads</span><span>' + fmtNairaExact(r.spend) + ' (' + fmtUsd(r.usd) + ')</span></li>';
    $('#breakdown').innerHTML = b;

    var bars = '';
    r.plats.forEach(function (x) {
      var pct = Math.round(x.share * 100);
      bars += '<div class="bar-row"><span>' + NAMES[x.p].replace('&', '&amp;') + '</span><span class="track"><i class="fill" style="width:' + pct + '%"></i></span><b>' + pct + '% · ' + fmtNaira(x.gross) + '</b></div>';
    });
    $('#bars').innerHTML = bars;

    var showRes = r.goal === 'leads' || r.goal === 'sales';
    $('#resHead').textContent = showRes ? (r.goal === 'sales' ? 'Sales' : 'Leads') : 'Reach';
    var rows = '';
    r.plats.forEach(function (x) {
      var resCol = showRes ? x.results : x.reach;
      rows += '<tr><td><strong>' + NAMES[x.p].replace('&', '&amp;') + '</strong><small>' + Math.round(x.share * 100) + '% of budget</small></td>' +
        '<td>' + fmtNaira(x.spend) + '<small>' + fmtUsd(x.usd) + '</small></td>' +
        '<td>' + fmtN(x.impr[1]) + '<small>' + range(x.impr[0], x.impr[2]) + '</small></td>' +
        '<td>' + fmtN(x.clicks[1]) + '<small>' + range(x.clicks[0], x.clicks[2]) + '</small></td>' +
        '<td>' + fmtN(resCol[1]) + '<small>' + range(resCol[0], resCol[2]) + '</small></td>' +
        '<td>' + fmtNaira(x.cpr[1]) + '<small>' + (r.goal === 'awareness' ? 'per 1,000 reached' : range(x.cpr[2], x.cpr[0], fmtNaira)) + '</small></td></tr>';
    });
    $('#ptbody').innerHTML = rows;

    // warnings
    var w = [];
    if (r.budget < 20000) w.push('This budget is very small. Most platforms need a few days of steady spend before they deliver well.');
    r.plats.forEach(function (x) {
      var dailyUsd = x.usd / r.days, dailyN = x.spend / r.days;
      if (x.p === 'tiktok' && x.share > 0 && dailyUsd < 20) w.push('TikTok asks for at least $20 a day per ad group. Your TikTok share is about ' + fmtUsd(dailyUsd) + ' a day. Raise it, shorten the campaign or drop TikTok.');
      if (x.p === 'meta' && x.share > 0 && dailyN < 2000) w.push('Your Facebook and Instagram share is under ₦2,000 a day, close to Meta\'s minimum. Results will be slow to build.');
      if ((x.p === 'google' || x.p === 'youtube') && x.share > 0 && dailyUsd < 3) w.push(NAMES[x.p] + ' gets less than $3 a day. That may only buy a handful of clicks each day.');
    });
    if (r.goal === 'awareness' && state.plats.google && state.split.google > 20) w.push('Google Search works best when people are already looking for you. For awareness, video and social platforms usually give more reach per naira.');
    $('#warn').innerHTML = w.map(function (x) { return '<li>' + x.replace('&', '&amp;') + '</li>'; }).join('');

    $('#waPlan').href = WA + '?text=' + encodeURIComponent(waText(r));
    syncUI();
    save();
  }

  function waText(r) {
    var t = GOAL_TXT[r.goal];
    var split = r.plats.map(function (x) { return NAMES[x.p] + ' ' + Math.round(x.share * 100) + '%'; }).join(', ');
    return 'Hi Crea8Hub, I used your ad budget calculator and would like a media plan.\n' +
      'Budget: ' + fmtNairaExact(r.budget) + ' over ' + r.days + ' days\n' +
      'Goal: ' + t.wa + '\n' +
      'Platforms: ' + split + '\n' +
      'Audience: ' + AUD_TXT[state.aud] + '\n' +
      'Estimate: reach ' + range(r.reach[0], r.reach[2]) + ', clicks ' + range(r.clicks[0], r.clicks[2]) +
      (r.goal === 'leads' || r.goal === 'sales' ? ', ' + t.res + ' ' + range(r.results[0], r.results[2]) : '') + '.';
  }

  function copyText(r) {
    var t = GOAL_TXT[r.goal];
    var lines = [
      'Naira Ad Budget Calculator (Crea8Hub) - estimate',
      summaryText(r),
      '',
      'Total budget: ' + fmtNairaExact(r.budget),
      'VAT (7.5%): ' + fmtNairaExact(r.vat),
      (r.fee > 0.5 ? 'Card/FX fees: ' + fmtNairaExact(r.fee) + '\n' : '') + 'Left for ads: ' + fmtNairaExact(r.spend) + ' (' + fmtUsd(r.usd) + ' at ₦' + commas(r.rate) + '/$)',
      'Daily budget: ' + fmtNaira(r.daily),
      'Impressions: ' + range(r.impr[0], r.impr[2]),
      'Reach: ' + range(r.reach[0], r.reach[2]),
      'Clicks: ' + range(r.clicks[0], r.clicks[2])
    ];
    if (r.goal === 'leads' || r.goal === 'sales') lines.push(t.one + ': ' + range(r.results[0], r.results[2]));
    lines.push(t.cpr + ': ' + range(r.cpr[2], r.cpr[0], fmtNaira));
    lines.push('');
    r.plats.forEach(function (x) {
      lines.push(NAMES[x.p] + ' (' + Math.round(x.share * 100) + '%): spend ' + fmtNaira(x.spend) + ', clicks ' + range(x.clicks[0], x.clicks[2]) + ', ' + t.cpr.toLowerCase() + ' ' + fmtNaira(x.cpr[1]));
    });
    lines.push('', 'Estimates only, not guarantees. https://www.crea8hub.com/apps/budget-calculator/');
    return lines.join('\n');
  }

  /* ---------- UI sync ---------- */
  function syncUI() {
    $$('#plats .plat').forEach(function (row) {
      var p = row.getAttribute('data-p');
      var on = !!state.plats[p];
      row.classList.toggle('off', !on);
      $('input[type=checkbox]', row).checked = on;
      var rg = $('input[type=range]', row);
      rg.value = on ? state.split[p] : 0;
      rg.disabled = !on;
      $('output', row).textContent = (on ? state.split[p] : 0) + '%';
    });
    $('#auto').checked = !!state.auto;
    $$('#budgetChips .chipbtn').forEach(function (b) {
      b.classList.toggle('on', Number(b.getAttribute('data-v')) === Number(state.budget));
    });
  }

  function fillForm() {
    $('#budget').value = commas(state.budget);
    $('#days').value = state.days;
    $('#rate').value = state.rate;
    $('#fx').value = state.fx;
    $$('input[name=goal]').forEach(function (i) { i.checked = i.value === state.goal; });
    $$('input[name=aud]').forEach(function (i) { i.checked = i.value === state.aud; });
    $$('input[name=bill]').forEach(function (i) { i.checked = i.value === state.bill; });
    syncUI();
  }

  function parseNaira(v) { var n = parseInt(String(v).replace(/[^\d]/g, ''), 10); return isFinite(n) ? n : 0; }

  function bind() {
    var budget = $('#budget');
    budget.addEventListener('input', function () { state.budget = parseNaira(budget.value); render(); });
    budget.addEventListener('blur', function () { budget.value = commas(state.budget); });
    $$('#budgetChips .chipbtn').forEach(function (b) {
      b.addEventListener('click', function () { state.budget = Number(b.getAttribute('data-v')); budget.value = commas(state.budget); render(); });
    });
    $('#days').addEventListener('input', function (e) { var v = parseInt(e.target.value, 10); if (v > 0) { state.days = Math.min(v, 365); render(); } });
    $('#days').addEventListener('blur', function (e) { e.target.value = state.days; });
    $('#rate').addEventListener('input', function (e) { var v = parseFloat(e.target.value); if (v > 0) { state.rate = v; render(); } });
    $('#rate').addEventListener('blur', function (e) { e.target.value = state.rate; });
    $('#fx').addEventListener('input', function (e) { var v = parseFloat(e.target.value); if (v >= 0) { state.fx = Math.min(v, 50); render(); } });
    $('#fx').addEventListener('blur', function (e) { e.target.value = state.fx; });

    $$('input[name=goal]').forEach(function (i) { i.addEventListener('change', function () { state.goal = i.value; if (state.auto) autoSplit(); render(); }); });
    $$('input[name=aud]').forEach(function (i) { i.addEventListener('change', function () { state.aud = i.value; render(); }); });
    $$('input[name=bill]').forEach(function (i) { i.addEventListener('change', function () { state.bill = i.value; render(); }); });

    $$('#plats .plat').forEach(function (row) {
      var p = row.getAttribute('data-p');
      var cb = $('input[type=checkbox]', row);
      var rg = $('input[type=range]', row);
      cb.addEventListener('change', function () {
        if (!cb.checked && active().length === 1) { cb.checked = true; return; }
        state.plats[p] = cb.checked;
        if (state.auto) autoSplit();
        else if (cb.checked) { state.split[p] = 0; moveSlider(p, Math.round(100 / active().length)); }
        else { state.split[p] = 0; state.split = normalise(state.split); }
        render();
      });
      rg.addEventListener('input', function () {
        state.auto = false;
        moveSlider(p, parseInt(rg.value, 10) || 0);
        render();
      });
    });
    $('#auto').addEventListener('change', function (e) { state.auto = e.target.checked; if (state.auto) autoSplit(); render(); });

    $('#resetBtn').addEventListener('click', function () {
      state = clone(DEFAULTS);
      try { localStorage.removeItem(STORE); } catch (e) { /* ignore */ }
      fillForm(); autoSplit(); render();
      flash('Reset to defaults');
    });
    $('#copyBtn').addEventListener('click', function () {
      var txt = copyText(last || compute());
      var done = function () { flash('Copied'); };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(txt).then(done, function () { fallbackCopy(txt) ? done() : flash('Copy failed'); });
      } else { fallbackCopy(txt) ? done() : flash('Copy failed'); }
    });
  }

  function fallbackCopy(txt) {
    var ta = document.createElement('textarea');
    ta.value = txt; ta.setAttribute('readonly', '');
    ta.style.position = 'fixed'; ta.style.top = '-1000px';
    document.body.appendChild(ta); ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  var flashT;
  function flash(msg) {
    var el = $('#copied'); el.textContent = msg;
    clearTimeout(flashT); flashT = setTimeout(function () { el.textContent = ''; }, 2500);
  }

  load();
  if (state.auto) autoSplit();
  fillForm();
  bind();
  render();

  window.__budget = { compute: compute, state: function () { return state; } };
})();
