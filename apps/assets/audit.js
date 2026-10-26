/* Crea8Hub Brand Health Check. Vanilla JS, no dependencies. */
(function () {
  'use strict';

  var WA = 'https://wa.me/2348060599741?text=';
  var STORE = 'c8h-brand-health-v1';
  var ARCON = '<a href="https://www.crea8hub.com/apps/arcon-approval-guide/" target="_blank" rel="noopener">ARCON approval guide</a>';
  var CAL = '<a href="https://www.crea8hub.com/apps/campaign-calendar/" target="_blank" rel="noopener">campaign calendar</a>';
  var BUDGET = '<a href="https://www.crea8hub.com/apps/budget-calculator/" target="_blank" rel="noopener">ad budget calculator</a>';

  var AREAS = [
    { id: 'identity', name: 'Brand identity', short: 'Identity' },
    { id: 'social', name: 'Social media', short: 'Social' },
    { id: 'web', name: 'Website & search', short: 'Website' },
    { id: 'reviews', name: 'Reviews & reputation', short: 'Reviews' },
    { id: 'ads', name: 'Advertising & growth', short: 'Ads' }
  ];

  /* rank: lower = more basic, used to break ties when choosing priorities.
     Each option: [label, points, fix]. Options worth 3 points need no fix. */
  var QS = [
    { id: 'i1', area: 'identity', rank: 4, title: 'Make your brand look the same everywhere',
      q: 'Do your logo, colours and fonts look the same everywhere: social pages, signage, packaging, invoices and your WhatsApp profile?',
      o: [
        ['Yes, the same everywhere', 3],
        ['Mostly, with a few odd ones out', 2, 'List every place your brand appears, from your WhatsApp Business profile picture to receipts and delivery bags. Replace the odd ones out with your current logo and colours. Start with the ones customers see most.'],
        ['It varies a lot', 1, 'Pick one version of your logo, two or three colours and one or two fonts, and use only those from now on. Make simple templates in Canva for posts, flyers and price lists so nobody has to start from scratch.'],
        ['We don\'t have a proper logo yet', 0, 'Get a simple, professional logo with a set of colours and fonts. A clear logo that works small on a phone screen and on a shop sign matters more than a clever one. Then use it everywhere.']
      ] },
    { id: 'i2', area: 'identity', rank: 1, title: 'Write down your positioning',
      q: 'Can you say in one sentence who you serve and why they should choose you over others?',
      o: [
        ['Yes, it\'s written down and the team says it the same way', 3],
        ['I could, but it isn\'t written down', 2, 'Write it down: "We help [who] get [result] by [how], unlike [alternative]." Share it with your team and put it in your social bios, website header and WhatsApp Business description.'],
        ['Not clearly. We sell to anyone who will buy', 0, 'Choose the customers you serve best and the one reason they pick you, such as speed, price, quality or service. Write one sentence that says this and test it on five customers. A clear focus makes every advert and post easier to write.']
      ] },
    { id: 'i3', area: 'identity', rank: 9, title: 'Create simple brand guidelines',
      q: 'Do you have brand guidelines: a short guide to your logo, colours, fonts and tone of voice?',
      o: [
        ['Yes, and our staff and designers use it', 3],
        ['Yes, but nobody really uses it', 1, 'Cut your guidelines down to one or two pages and share them as a PDF with everyone who makes content, including freelancers and printers. Ask for new designs to be checked against it before they go out.'],
        ['No', 0, 'Make a one-page guide: logo versions, colour codes, fonts, photo style and three words for your tone of voice. Send it to every designer, printer and staff member who posts for you.']
      ] },

    { id: 's1', area: 'social', rank: 6, title: 'Post on a steady schedule',
      q: 'How often do you post on your main social media account?',
      o: [
        ['Three or more times a week, from a plan', 3],
        ['About once a week', 2, 'Move to a simple weekly plan with two or three post types that repeat, for example a product, a customer story and a tip. Batch-create a week of posts in one sitting and schedule them with Meta Business Suite.'],
        ['Now and then, when we remember', 1, 'Set a realistic minimum, such as two posts a week, and plan a month at a time. Build the plan around key dates in our ' + CAL + ' so you always have something timely to say.'],
        ['Rarely or not at all', 0, 'An empty or abandoned page can make buyers think you have closed. Post at least twice a week for the next month: your products, prices, location and how to order. Pin a post that explains how to buy from you.']
      ] },
    { id: 's2', area: 'social', rank: 3, title: 'Reply to messages faster',
      q: 'How quickly do you usually reply to comments and DMs?',
      o: [
        ['Within a few hours', 3],
        ['Within a day or two', 2, 'Aim to reply within a few hours during business hours. Set up quick replies in WhatsApp Business and Instagram for common questions such as price, delivery and location.'],
        ['Sometimes we miss them', 1, 'Make one person responsible for replies and check messages at set times each day. Use a WhatsApp Business greeting message and an away message so people know when they will hear back.'],
        ['We rarely reply', 0, 'Unanswered messages are lost sales. Start checking DMs and comments at least twice a day, set up WhatsApp Business auto-replies and quick replies, and add your opening hours to every profile.']
      ] },
    { id: 's3', area: 'social', rank: 10, title: 'Focus on the right platforms',
      q: 'Are you on the platforms your customers actually use?',
      o: [
        ['Yes, we chose them based on where our customers are', 3],
        ['Mostly, but some of our accounts are inactive', 1, 'Close or archive accounts you can\'t keep up, or add a pinned post pointing people to your active page. It\'s better to do two platforms well than five badly.'],
        ['Not sure which platforms matter for us', 0, 'Ask your last 20 customers where they found you and where they spend time online. Focus on the top one or two, and make sure your WhatsApp Business account is set up, since many buyers will want to chat before they pay.']
      ] },

    { id: 'w1', area: 'web', rank: 5, title: 'Fix your website for mobile',
      q: 'Do you have a website that loads fast and works well on a phone?',
      o: [
        ['Yes, it\'s fast and easy to use on a phone', 3],
        ['Yes, but it\'s slow or awkward on a phone', 1, 'Open your site on a mid-range phone using mobile data and time how long it takes. Compress large images, remove pop-ups and sliders that slow it down, and put your WhatsApp button and prices where people can see them straight away.'],
        ['Only a link-in-bio page or online store page', 1, 'A simple one-page website with your services, prices, location and a WhatsApp button builds trust and shows up on Google. Keep your store page, but link to it from your own domain.'],
        ['No website', 0, 'Start with a simple, fast website on your own domain name (.com.ng or .com): what you sell, who it\'s for, prices or a price range, reviews and a click-to-chat WhatsApp button. One good page is better than ten empty ones.']
      ] },
    { id: 'w2', area: 'web', rank: 0, title: 'Set up your Google Business Profile',
      q: 'Do you have a Google Business Profile with your correct address, opening hours, phone number and photos?',
      o: [
        ['Yes, complete and up to date', 3],
        ['Yes, but it\'s incomplete or out of date', 1, 'Log in to your Google Business Profile and fill in every field: category, hours, phone, WhatsApp link, website, products and at least 10 real photos. Post an update or offer once a month to keep it active.'],
        ['No, or not sure', 0, 'Claim or create your free Google Business Profile at google.com/business. Add your address or service area, hours, phone, website and real photos, then complete verification. This is how you appear on Google Maps when people search near you.']
      ] },
    { id: 'w3', area: 'web', rank: 2, title: 'Make it easy to find and contact you',
      q: 'If someone searches your business name on Google, can they find you and contact you, for example on WhatsApp, in one tap?',
      o: [
        ['Yes, we show up first and they can chat or call in one tap', 3],
        ['They find us, but our contact details are hard to find', 1, 'Add a click-to-chat link (wa.me/234...) and a tap-to-call number to your website header, Google profile and every social bio. Make sure the number is the same everywhere.'],
        ['They find old details, other businesses or nothing', 0, 'Search your name on Google and on Maps and note what\'s wrong. Fix your Google Business Profile, update old directory listings and social bios, and use the same name, phone and address everywhere.']
      ] },

    { id: 'r1', area: 'reviews', rank: 7, title: 'Get more customer reviews',
      q: 'Do you have recent reviews on Google or your social pages?',
      o: [
        ['Plenty, including some from the last three months', 3],
        ['A few', 2, 'Make asking for reviews part of every sale. Send a short WhatsApp message with your Google review link a day after delivery, while the customer is happy.'],
        ['One or two old ones', 1, 'Old reviews make buyers wonder if you\'re still trading. Message 20 recent happy customers with your Google review link and a polite request. Thank everyone who leaves one.'],
        ['None', 0, 'Get your Google review link from your Business Profile and send it to recent customers who were happy with you. Ask in person too. Aim for your first ten reviews this month.']
      ] },
    { id: 'r2', area: 'reviews', rank: 1.5, title: 'Respond to reviews and complaints within 24 hours',
      q: 'When a customer complains publicly, what usually happens?',
      o: [
        ['We reply politely within 24 hours and sort it out privately', 3],
        ['We reply, but it can take a few days', 2, 'Reply to every public review and complaint within 24 hours, even if it\'s just to say you\'re looking into it. Other buyers judge you by how you respond, not only by the complaint.'],
        ['We don\'t usually see them in time', 1, 'Turn on notifications for Google reviews and social mentions, and give one person the job of checking daily. Reply within 24 hours, apologise where it\'s fair, and move the detail to DM or a call.'],
        ['We ignore, delete or argue', 0, 'Write a simple complaints script: thank them, apologise for the experience, offer to fix it privately, and follow up. Reply within 24 hours. Never argue in public, because future customers are reading.']
      ] },
    { id: 'r3', area: 'reviews', rank: 8, title: 'Show your testimonials',
      q: 'Do you show testimonials or customer results where buyers can see them?',
      o: [
        ['Yes, on our website, social highlights and sales messages', 3],
        ['A few, but they\'re hard to find', 1, 'Put your best three testimonials on your homepage, pin a reviews post or Instagram highlight, and add a short "What customers say" message to your WhatsApp Business catalogue or quick replies.'],
        ['No', 0, 'Screenshot kind messages (with permission), collect short video clips from happy customers and share before-and-after results. Add them to a "Reviews" highlight and your website so new buyers see proof.']
      ] },

    { id: 'a1', area: 'ads', rank: 11, title: 'Run targeted ads with a set budget',
      q: 'Do you run paid ads aimed at a defined audience?',
      o: [
        ['Yes, targeted ads with a set budget and a clear goal', 3],
        ['We boost posts now and then', 1, 'Instead of boosting posts, set up campaigns in Meta Ads Manager with one goal, such as WhatsApp messages, and target by location and interest. Decide your monthly budget first with our ' + BUDGET + '.'],
        ['No paid advertising', 0, 'Start small: one campaign aimed at people in your delivery area, with a clear offer and a WhatsApp button. Set a monthly budget you can keep up for at least three months using our ' + BUDGET + '.']
      ] },
    { id: 'a2', area: 'ads', rank: 12, title: 'Track where your customers come from',
      q: 'Do you track results from your marketing, for example with Meta Pixel, Google Analytics, UTM links or by asking customers how they found you?',
      o: [
        ['Yes, and we review the numbers every month', 3],
        ['We have some tracking but rarely look at it', 1, 'Put a monthly date in your diary to check cost per enquiry and sales by channel. Stop or change anything that isn\'t bringing enquiries after a fair test.'],
        ['No tracking', 0, 'Install Google Analytics and the Meta Pixel on your website, use UTM links in your bios and ads, and ask every new customer "How did you hear about us?" Record the answers in a simple spreadsheet.']
      ] },
    { id: 'a3', area: 'ads', rank: 13, title: 'Get ARCON approval and plan campaigns ahead',
      q: 'Are your adverts approved by ARCON, and do you plan campaigns ahead with a calendar?',
      o: [
        ['Yes to both', 3],
        ['We get approval, but campaigns are last-minute', 2, 'Plan your main campaigns at least a quarter ahead so there\'s time for design, approval and media booking. Use the key dates in our ' + CAL + ' to build your plan.'],
        ['We plan ahead, but haven\'t dealt with ARCON approval', 1, 'In Nigeria most adverts, including social media posts and influencer content, need ARCON approval before they run. Read how it works in our ' + ARCON + ' and build approval time into your plan.'],
        ['Neither, or not sure', 0, 'Check which of your adverts need ARCON approval with our ' + ARCON + ', then plan the next three months of campaigns around the dates in our ' + CAL + '. Leave about two weeks for approval.']
      ] }
  ];

  var BANDS = [
    { min: 80, label: 'Thriving', cls: 'g4', color: '#84C226', text: 'Your brand is in strong shape. Keep it consistent and use the points below to stay ahead.' },
    { min: 60, label: 'Healthy', cls: 'g3', color: '#84C226', text: 'A solid brand with a few gaps. Fixing the priorities below will make your marketing work harder.' },
    { min: 40, label: 'Getting there', cls: 'g2', color: '#C3D92B', text: 'You have some good foundations, but there are clear gaps that may be costing you enquiries.' },
    { min: 0, label: 'Needs urgent care', cls: 'g1', color: '#e89a1c', text: 'Some important basics are missing. Start with the three fixes below. Most cost little or nothing.' }
  ];

  var $ = function (id) { return document.getElementById(id); };
  var intro = $('intro'), quiz = $('quiz'), tool = $('tool'), report = $('report');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var state = { i: 0, answers: {}, name: '', industry: '' };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  }
  function strip(html) { return html.replace(/<[^>]+>/g, ''); }
  function band(score) { for (var i = 0; i < BANDS.length; i++) if (score >= BANDS[i].min) return BANDS[i]; return BANDS[BANDS.length - 1]; }
  function areaName(id) { for (var i = 0; i < AREAS.length; i++) if (AREAS[i].id === id) return AREAS[i]; }

  function load() { try { return JSON.parse(localStorage.getItem(STORE) || 'null'); } catch (e) { return null; } }
  function save(data) { try { localStorage.setItem(STORE, JSON.stringify(data)); } catch (e) { /* storage blocked */ } }

  function scrollToTool(el) {
    var r = el.getBoundingClientRect();
    if (r.top < 70 || r.top > window.innerHeight * 0.6) {
      window.scrollTo({ top: window.pageYOffset + r.top - 84, behavior: reduce ? 'auto' : 'smooth' });
    }
  }

  /* ---------- intro ---------- */
  function showSaved() {
    var s = load(), box = $('saved');
    if (!s || !s.answers) { box.hidden = true; return; }
    var res = compute(s.answers);
    box.innerHTML = 'You have a saved result from ' + esc(s.date || 'earlier') + (s.name ? ' for ' + esc(s.name) : '') +
      ': <strong>' + res.score + '/100</strong>. <button type="button" class="link" id="viewSaved">View it</button>';
    box.hidden = false;
    $('viewSaved').addEventListener('click', function () {
      state.answers = s.answers; state.name = s.name || ''; state.industry = s.industry || '';
      $('bizName').value = state.name; $('industry').value = state.industry;
      showReport(false);
    });
  }

  intro.addEventListener('submit', function (e) {
    e.preventDefault();
    state.name = $('bizName').value.trim().slice(0, 60);
    state.industry = $('industry').value;
    state.i = 0;
    intro.hidden = true; quiz.hidden = false;
    document.body.classList.add('quiz-on');
    renderQ();
    scrollToTool(tool);
  });

  /* ---------- quiz ---------- */
  function renderQ() {
    var q = QS[state.i], a = areaName(q.area);
    var areaIdx = AREAS.indexOf(a) + 1;
    $('qArea').textContent = 'Area ' + areaIdx + ' of 5 · ' + a.name;
    $('qCount').textContent = 'Question ' + (state.i + 1) + ' of ' + QS.length;
    $('qText').textContent = q.q;
    $('pfill').style.width = (state.i / QS.length * 100) + '%';
    $('pbar').setAttribute('aria-valuenow', state.i);
    $('qErr').textContent = '';
    var html = '';
    q.o.forEach(function (o, k) {
      var checked = state.answers[q.id] === k;
      html += '<label class="choice' + (checked ? ' sel' : '') + '"><input type="radio" name="ans" value="' + k + '"' + (checked ? ' checked' : '') + '>' +
        '<span>' + esc(o[0]) + '</span><kbd aria-hidden="true">' + (k + 1) + '</kbd></label>';
    });
    $('choices').innerHTML = html;
    $('back').disabled = false;
    $('next').textContent = state.i === QS.length - 1 ? 'See my results' : 'Next';
    var first = $('choices').querySelector('input:checked') || $('choices').querySelector('input');
    if (first) { try { first.focus({ preventScroll: true }); } catch (e) { first.focus(); } }
  }

  $('choices').addEventListener('change', function (e) {
    if (e.target.name !== 'ans') return;
    state.answers[QS[state.i].id] = +e.target.value;
    $('qErr').textContent = '';
    Array.prototype.forEach.call($('choices').querySelectorAll('.choice'), function (l) {
      l.classList.toggle('sel', l.querySelector('input').checked);
    });
  });

  quiz.addEventListener('submit', function (e) {
    e.preventDefault();
    var q = QS[state.i];
    if (state.answers[q.id] === undefined) {
      $('qErr').textContent = 'Please choose an answer to continue.';
      var f = $('choices').querySelector('input'); if (f) f.focus();
      return;
    }
    if (state.i < QS.length - 1) { state.i++; renderQ(); scrollToTool(tool); }
    else { finish(); }
  });

  $('back').addEventListener('click', function () {
    if (state.i === 0) { quiz.hidden = true; intro.hidden = false; document.body.classList.remove('quiz-on'); $('introH').focus(); return; }
    state.i--; renderQ();
  });

  document.addEventListener('keydown', function (e) {
    if (quiz.hidden || e.ctrlKey || e.metaKey || e.altKey) return;
    var t = e.target.tagName;
    if (t === 'INPUT' && e.target.type === 'text' || t === 'SELECT' || t === 'TEXTAREA') return;
    var n = parseInt(e.key, 10);
    if (n >= 1 && n <= 4) {
      var inp = $('choices').querySelectorAll('input')[n - 1];
      if (inp) { inp.checked = true; inp.focus(); inp.dispatchEvent(new Event('change', { bubbles: true })); e.preventDefault(); }
    }
  });

  /* ---------- scoring ---------- */
  function compute(answers) {
    var total = 0, areas = {}, weak = [];
    AREAS.forEach(function (a) { areas[a.id] = 0; });
    QS.forEach(function (q) {
      var k = answers[q.id];
      if (k === undefined || !q.o[k]) k = q.o.length - 1;
      var o = q.o[k];
      total += o[1]; areas[q.area] += o[1];
      if (o[1] < 3) weak.push({ q: q, opt: o, gap: 3 - o[1] });
    });
    /* priority = size of gap x importance (basics weigh more) */
    weak.forEach(function (w) { w.pri = w.gap * (1 + (13 - w.q.rank) / 13); });
    weak.sort(function (x, y) { return y.pri - x.pri || x.q.rank - y.q.rank; });
    var areaList = AREAS.map(function (a) { return { a: a, score: Math.round(areas[a.id] / 9 * 100) }; });
    var sorted = areaList.slice().sort(function (x, y) { return x.score - y.score; });
    return { score: Math.round(total / (QS.length * 3) * 100), areas: areaList, weakest: sorted, weak: weak };
  }

  function finish() {
    var d = new Date();
    var date = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    save({ answers: state.answers, name: state.name, industry: state.industry, date: date });
    showReport(true);
  }

  /* ---------- report ---------- */
  function gaugeSVG(b) {
    return '<svg viewBox="0 0 240 150" role="img" aria-labelledby="gT"><title id="gT">Overall score ' + b.score + ' out of 100: ' + b.label + '</title>' +
      '<path d="M24 128 A96 96 0 0 1 216 128" fill="none" stroke="#ebe8e0" stroke-width="20" stroke-linecap="round"/>' +
      '<path class="arc" id="gArc" d="M24 128 A96 96 0 0 1 216 128" fill="none" stroke="' + b.color + '" stroke-width="20" stroke-linecap="round" pathLength="100" stroke-dasharray="0 100"/>' +
      '<text id="gNum" x="120" y="112" text-anchor="middle" style="font-family:Raleway,\'Helvetica Neue\',Arial,sans-serif;font-weight:800;font-size:52px" fill="#111">0</text>' +
      '<text x="120" y="138" text-anchor="middle" style="font-family:Lato,\'Helvetica Neue\',Arial,sans-serif;font-weight:700;font-size:13px;letter-spacing:1px" fill="#5b5b57">OUT OF 100</text></svg>';
  }

  function barColor(s) { return s >= 80 ? '#84C226' : s >= 60 ? '#9fcc3a' : s >= 40 ? '#C3D92B' : '#e89a1c'; }

  function showReport(fresh) {
    var res = compute(state.answers), b = band(res.score);
    b = { score: res.score, label: b.label, cls: b.cls, color: b.color, text: b.text };
    var who = state.name ? esc(state.name) : 'Your business';
    var saved = load();
    var date = (saved && saved.date) || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    var top = res.weak.slice(0, 3), rest = res.weak.slice(3);

    var h = '<div class="print-only"><strong>Crea8Hub · Brand Health Check</strong><span>crea8hub.com/apps/brand-health-check · ' + esc(date) + '</span></div>';
    h += '<div class="eyebrow"><span class="eyebrow-label">Your report</span></div>';
    h += '<h3 tabindex="-1" id="rTitle" style="margin-top:10px">' + who + ': brand health report</h3>';
    h += '<p class="r-meta">' + (state.industry ? esc(state.industry) + ' · ' : '') + esc(date) + '</p>';
    h += '<div class="r-head"><div class="gauge">' + gaugeSVG(b) + '</div><div class="r-sum">' +
      '<span class="grade ' + b.cls + '">' + b.label + '</span>' +
      '<p><strong>Overall score: ' + res.score + '/100.</strong> ' + b.text + '</p></div></div>';

    h += '<div class="r-sec"><h4>Score by area</h4><ul class="areas">';
    res.areas.forEach(function (x) {
      h += '<li><b>' + x.a.name + '</b><span class="abar" role="img" aria-label="' + x.a.name + ': ' + x.score + ' out of 100"><i data-w="' + x.score + '" style="background:' + barColor(x.score) + '"></i></span><span class="sc">' + x.score + '</span></li>';
    });
    h += '</ul></div>';

    h += '<div class="r-sec"><h4>Fix these first</h4>';
    if (!top.length) {
      h += '<p>You gave the strongest answer to every question. Keep doing what works, review your numbers monthly and take this check again in six months.</p>';
    } else {
      h += '<ol class="prio">';
      top.forEach(function (w, i) {
        h += '<li><span class="n">0' + (i + 1) + '</span><div><span class="tag">' + areaName(w.q.area).name + '</span><h5>' + w.q.title + '</h5><p>' + w.opt[2] + '</p>' +
          '<p class="ans">You answered: "' + esc(w.opt[0]) + '"</p></div></li>';
      });
      h += '</ol>';
    }
    if (rest.length) {
      h += '<details class="more"><summary>' + rest.length + ' more thing' + (rest.length > 1 ? 's' : '') + ' to improve</summary><ul>';
      rest.forEach(function (w) { h += '<li><strong>' + w.q.title + '.</strong> ' + w.opt[2] + '</li>'; });
      h += '</ul></details>';
    }
    h += '</div>';

    h += '<div class="r-actions no-print">' +
      '<a class="btn" id="waBtn" target="_blank" rel="noopener" href="' + waLink(res, b) + '">Get a free review call</a>' +
      '<button class="btn ghost" type="button" id="copyBtn">Copy my results</button>' +
      '<button class="btn ghost" type="button" id="printBtn">Print / save as PDF</button>' +
      '<button class="btn ghost" type="button" id="retakeBtn">Retake</button></div>' +
      '<p class="r-status no-print" id="rStatus" aria-live="polite"></p>' +
      '<p class="r-note">This is a self-assessment based on your answers. Your score is indicative, not a full audit.</p>';

    report.innerHTML = h;
    tool.hidden = true; report.hidden = false;
    document.body.classList.remove('quiz-on');
    document.body.classList.add('show-report');

    $('copyBtn').addEventListener('click', function () { copyText(summaryText(res, b, date)); });
    $('printBtn').addEventListener('click', function () {
      var m = report.querySelector('.more'); if (m) m.open = true;
      window.print();
    });
    $('retakeBtn').addEventListener('click', retake);

    scrollToTool(report);
    try { $('rTitle').focus({ preventScroll: true }); } catch (e) { $('rTitle').focus(); }
    animate(res.score);
  }

  function animate(score) {
    var arc = $('gArc'), num = $('gNum');
    var bars = report.querySelectorAll('.abar i');
    if (reduce) {
      arc.style.transition = 'none';
      arc.setAttribute('stroke-dasharray', score + ' 100');
      num.textContent = score;
      Array.prototype.forEach.call(bars, function (i) { i.style.transition = 'none'; i.style.width = i.getAttribute('data-w') + '%'; });
      return;
    }
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        arc.setAttribute('stroke-dasharray', score + ' 100');
        Array.prototype.forEach.call(bars, function (i) { i.style.width = i.getAttribute('data-w') + '%'; });
      });
    });
    var start = null, dur = 1200;
    function step(t) {
      if (!start) start = t;
      var p = Math.min(1, (t - start) / dur), e = 1 - Math.pow(1 - p, 3);
      num.textContent = Math.round(score * e);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function waLink(res, b) {
    var weakest = res.weakest.filter(function (x) { return x.score < 100; }).slice(0, 2).map(function (x) { return x.a.name + ' (' + x.score + ')'; });
    var msg = 'Hi Crea8Hub, I just took the Brand Health Check' + (state.name ? ' for ' + state.name : '') +
      (state.industry ? ' (' + state.industry + ')' : '') + '. I scored ' + res.score + '/100 (' + b.label + ').' +
      (weakest.length ? ' My weakest areas are ' + weakest.join(' and ') + '.' : '') +
      ' I\'d like a free review call.';
    return WA + encodeURIComponent(msg);
  }

  function summaryText(res, b, date) {
    var lines = [];
    lines.push('Brand Health Check' + (state.name ? ': ' + state.name : '') + ' (' + date + ')');
    if (state.industry) lines.push('Industry: ' + state.industry);
    lines.push('Overall score: ' + res.score + '/100 - ' + b.label);
    lines.push('');
    lines.push('Score by area:');
    res.areas.forEach(function (x) { lines.push('- ' + x.a.name + ': ' + x.score + '/100'); });
    var top = res.weak.slice(0, 3);
    if (top.length) {
      lines.push('');
      lines.push('Fix these first:');
      top.forEach(function (w, i) { lines.push((i + 1) + '. ' + w.q.title + ': ' + strip(w.opt[2])); });
    }
    lines.push('');
    lines.push('Take the check: https://www.crea8hub.com/apps/brand-health-check/');
    return lines.join('\n');
  }

  function copyText(txt) {
    var status = $('rStatus');
    function ok() { status.textContent = 'Results copied. You can paste them into a message or document.'; }
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = txt; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy') ? ok() : (status.textContent = 'Copy failed. Please select and copy the report manually.'); }
      catch (e) { status.textContent = 'Copy failed. Please select and copy the report manually.'; }
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(txt).then(ok, fallback); }
    else fallback();
  }

  function retake() {
    state.answers = {}; state.i = 0;
    report.hidden = true; report.innerHTML = '';
    document.body.classList.remove('show-report');
    tool.hidden = false; quiz.hidden = true; intro.hidden = false;
    showSaved();
    scrollToTool(tool);
    $('introH').focus({ preventScroll: true });
  }

  window.addEventListener('beforeprint', function () {
    var m = report.querySelector('.more'); if (m) m.open = true;
  });

  showSaved();

  /* testing hook */
  window.__brandHealth = { questions: QS, compute: compute };
})();
