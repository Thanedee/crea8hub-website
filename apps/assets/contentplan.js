/* Crea8Hub 30-Day Content Plan Generator. Runs entirely in the browser. */
(function () {
  "use strict";
  var D = window.CP_DATA, RAW = window.CAL_EVENTS || [];
  var form = document.getElementById("cpForm");
  if (!D || !form) return;

  var KEY = "c8h-contentplan-v1";
  var WA = "https://wa.me/2348060599741?text=";
  var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  var PILLARS = { educate: "Educate", inspire: "Brand story", entertain: "Entertain", promote: "Promote", community: "Community", bts: "Behind the scenes", proof: "Social proof" };
  var P_ORDER = ["educate", "inspire", "entertain", "promote", "community", "bts", "proof"];
  var PLATS = { ig: "Instagram", fb: "Facebook", tt: "TikTok", x: "X", li: "LinkedIn", yt: "YouTube", wa: "WhatsApp Status" };
  var PLAT_ORDER = ["ig", "fb", "tt", "x", "li", "yt", "wa"];
  var FMTS = { reel: "Reel / short video", carousel: "Carousel", image: "Single image", story: "Story", live: "Live", poll: "Poll", text: "Text post / thread", doc: "LinkedIn document", status: "WhatsApp Status" };
  var FSHORT = { reel: "Reel", carousel: "Carousel", image: "Image", story: "Story", live: "Live", poll: "Poll", text: "Text", doc: "Document", status: "Status" };
  var GOALS = { awareness: "Awareness", engagement: "Engagement and community", leads: "Leads and WhatsApp enquiries", sales: "Sales" };
  var TONES = { friendly: "Friendly", professional: "Professional", playful: "Playful", premium: "Premium" };
  var TONE_TIPS = {
    friendly: "Write the way you'd talk to a regular customer: warm, simple and direct.",
    professional: "Clear and confident. Short sentences, no slang, and facts before feelings.",
    playful: "Light and quick. Use questions, local humour and trending formats, but keep it kind.",
    premium: "Calm and considered. Fewer words, strong visuals, and focus on detail and quality."
  };
  var SUPPORT = {
    ig: ["reel", "carousel", "image", "story", "live", "poll"],
    fb: ["reel", "carousel", "image", "story", "live", "poll", "text"],
    tt: ["reel", "carousel", "live"],
    x: ["text", "image", "poll", "reel"],
    li: ["text", "doc", "image", "poll", "reel", "live"],
    yt: ["reel", "live", "poll"],
    wa: ["status"]
  };
  var CHAIN = {
    reel: ["reel", "status", "carousel", "image", "text"],
    carousel: ["carousel", "doc", "image", "text", "reel", "status"],
    image: ["image", "carousel", "status", "reel", "text"],
    story: ["story", "status", "image", "reel", "text"],
    poll: ["poll", "story", "text", "carousel", "status", "reel"],
    live: ["live", "reel", "status", "text"],
    text: ["text", "carousel", "doc", "image", "reel", "status"],
    doc: ["doc", "carousel", "image", "text", "status"],
    status: ["status", "story", "image", "reel", "text"]
  };
  var CROSS = { reel: ["ig", "fb", "tt", "yt", "li", "x", "wa"], carousel: ["ig", "fb", "li", "tt"], image: ["ig", "fb", "x", "li", "wa"], story: ["ig", "fb", "wa"], poll: ["ig", "fb", "x", "li"], text: ["x", "li", "fb"], doc: ["li"], live: [], status: ["ig", "fb"] };
  var HINT = { r: "reel", c: "carousel", i: "image", s: "story", p: "poll", l: "live", t: "text" };
  var PWEIGHT = { ig: 3, tt: 3, fb: 2, li: 2, x: 2, yt: 1, wa: 1 };

  var WEIGHTS = {
    awareness: { educate: 24, inspire: 15, entertain: 24, promote: 8, community: 10, bts: 12, proof: 7 },
    engagement: { educate: 18, inspire: 10, entertain: 22, promote: 6, community: 25, bts: 13, proof: 6 },
    leads: { educate: 24, inspire: 8, entertain: 10, promote: 18, community: 14, bts: 10, proof: 16 },
    sales: { educate: 20, inspire: 8, entertain: 12, promote: 22, community: 10, bts: 10, proof: 18 }
  };
  var PTAG = { educate: "#DidYouKnow", inspire: "#OurStory", entertain: "#JustForFun", community: "#Community", bts: "#BehindTheScenes", proof: "#CustomerReviews" };
  var CTAS = {
    awareness: ["Follow us for more", "Share this with a friend", "Save this for later"],
    engagement: ["Comment below", "Tell us in the comments", "Tag a friend who needs this"],
    leads: ["Send us a WhatsApp", "Tap the link in bio to chat with us", "Send us a WhatsApp for a quick reply"],
    sales: ["Tap the link in bio to order", "Send us a WhatsApp to order", "Order via the link in bio"]
  };
  var EV_TAG = {
    "Black Friday": "#BlackFriday", "Cyber Monday": "#CyberMonday", "Detty December": "#DettyDecember", "Christmas Day": "#Christmas",
    "Boxing Day": "#BoxingDay", "New Year's Day": "#HappyNewYear", "New Year's Eve crossover": "#Crossover", "Valentine's Day": "#ValentinesDay",
    "Ramadan": "#Ramadan", "Eid-el-Fitr (Sallah)": "#EidMubarak", "Eid-el-Kabir (Sallah)": "#EidMubarak", "Eid-el-Maulud": "#EidElMaulud",
    "Singles' Day (11.11)": "#1111Sale", "International Fraud Awareness Week": "#FraudWeek", "Global Entrepreneurship Week": "#GEW",
    "International Women's Day": "#IWD", "International Men's Day": "#InternationalMensDay", "Mother's Day (Mothering Sunday)": "#MothersDay",
    "Father's Day": "#FathersDay", "Independence Day": "#NigeriaAt67", "Democracy Day": "#DemocracyDay", "Workers' Day": "#WorkersDay",
    "Children's Day": "#ChildrensDay", "Good Friday": "#GoodFriday", "Easter Sunday": "#Easter", "Easter Monday": "#Easter",
    "Lagos Fashion Week 2026": "#LagosFashionWeek", "Lagos Fashion Week 2027": "#LagosFashionWeek", "Carnival Calabar": "#CarnivalCalabar",
    "AFCON 2027": "#AFCON2027", "World Mental Health Day": "#WorldMentalHealthDay", "Customer Service Week": "#CustomerServiceWeek",
    "Breast Cancer Awareness Month": "#BreastCancerAwareness", "Cybersecurity Awareness Month": "#CybersecurityAwarenessMonth"
  };
  var GREET = {
    "Christmas Day": "Merry Christmas from {us}", "Boxing Day": "Happy Boxing Day, and thank you for this year",
    "New Year's Day": "Happy New Year from {us}", "Good Friday": "A peaceful Good Friday to everyone observing",
    "Easter Monday": "Happy Easter from {us}", "Eid-el-Fitr (Sallah)": "Barka da Sallah: Eid Mubarak from {us}",
    "Eid-el-Kabir (Sallah)": "Barka da Sallah: Eid Mubarak from {us}", "Eid-el-Maulud": "Peaceful Eid-el-Maulud greetings to all who are celebrating",
    "Workers' Day": "Happy Workers' Day to every worker keeping Nigeria moving", "Democracy Day": "Happy Democracy Day",
    "Independence Day": "Happy Independence Day, Nigeria"
  };
  var BIG = /^(Black Friday|Christmas Day|Valentine's Day|Eid-el-Fitr|Eid-el-Kabir|Mother's Day|Father's Day)/;
  var IND_RE = {
    fintech: /Fraud|Savings|Money|Entrepreneurship|MSME|Investor|Cybersecurity|Information Literacy/,
    retail: /Entrepreneurship|MSME|Environment|Fraud/,
    food: /Health Day|Environment|Water|NCDs|MSME/,
    beauty: /Breast Cancer|Environment|MSME/,
    health: /Health|AMR|Immunization|NCDs|Breast|Deaf|Water/,
    realestate: /Environment|Water|Entrepreneurship/,
    education: /Book|Science|Literacy|Money|Youth|Girl|Space|Deaf/,
    tech: /Cybersecurity|Science|Space|Entrepreneurship|Literacy|Fraud/,
    professional: /Entrepreneurship|MSME|Fraud|Investor|Literacy/,
    events: /Youth|Volunteer|Mental Health/,
    fmcg: /Environment|Water|Health Day|NCDs|Breastfeeding|MSME/,
    ngo: /Volunteer|Water|Girl|Environment|Health|Immunization|Deaf|Youth|Book|Literacy/
  };
  var GENERAL_RE = /Women's Day|Men's Day|Customer Service|Children's Day|World Mental Health Day|Youth Day/;
  var SCHOOL_RE = /school|mid-term|vacation/i;

  /* ---------- helpers ---------- */
  function $(id) { return document.getElementById(id); }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function parse(d) { var p = d.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function iso(dt) { return dt.getFullYear() + "-" + pad(dt.getMonth() + 1) + "-" + pad(dt.getDate()); }
  function addDays(dt, n) { var x = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()); x.setDate(x.getDate() + n); return x; }
  function diff(a, b) { return Math.round((b - a) / 864e5); }
  function fmtDay(d, long) { var dt = typeof d === "string" ? parse(d) : d; return (long ? DAYS[dt.getDay()] : DAYS[dt.getDay()].slice(0, 3)) + " " + dt.getDate() + " " + SHORT[dt.getMonth()]; }
  function fmtFull(d) { var dt = typeof d === "string" ? parse(d) : d; return dt.getDate() + " " + SHORT[dt.getMonth()] + " " + dt.getFullYear(); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  function lowerFirst(s) { return /^[A-Z][a-z]+\b/.test(s) && !/^(Super|Nollywood|Ramadan|Christmas|Easter|Sallah|Nigerian|Nigeria|Lagos|Black|WhatsApp|Japa)\b/.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s; }
  function hash(str) { var h = 1779033703 ^ str.length; for (var i = 0; i < str.length; i++) { h = Math.imul(h ^ str.charCodeAt(i), 3432918353); h = h << 13 | h >>> 19; } return h >>> 0; }
  function rngFrom(seed) { var a = seed >>> 0; return function () { a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function shuffle(arr, rnd) { var a = arr.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function pick(arr, rnd) { return arr[Math.floor(rnd() * arr.length)]; }
  function uid() { return "p" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function camelTag(s) { var t = "#" + s.replace(/\(.*?\)/g, "").replace(/[^A-Za-z0-9 ]+/g, "").split(/\s+/).map(cap).join(""); return t.length > 2 && t.length <= 26 ? t : ""; }
  function store(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) { /* storage blocked */ } }
  function load() { try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) { return null; } }

  var EVENTS = RAW.map(function (e) { var s = parse(e.start), en = e.end ? parse(e.end) : s; return { ev: e, s: s, e: en }; })
    .sort(function (a, b) { return a.s - b.s; });

  /* ---------- inputs ---------- */
  function defaultStart() { var t = new Date(); return iso(new Date(t.getFullYear(), t.getMonth() + 1, 1)); }
  function readInputs() {
    var plats = [].slice.call(form.querySelectorAll('input[name="plat"]:checked')).map(function (x) { return x.value; });
    var r = function (n) { var x = form.querySelector('input[name="' + n + '"]:checked'); return x ? x.value : ""; };
    return {
      biz: $("biz").value.trim(), ind: $("ind").value, goal: r("goal") || "leads", plats: plats,
      ppw: +(r("ppw") || 5), start: $("start").value || defaultStart(), tone: r("tone") || "friendly",
      products: $("products").value.trim(), offer: $("offer").value.trim()
    };
  }
  function writeInputs(v) {
    if (!v) return;
    $("biz").value = v.biz || ""; if (v.ind) $("ind").value = v.ind;
    $("products").value = v.products || ""; $("offer").value = v.offer || "";
    if (v.start) $("start").value = v.start;
    [["goal", v.goal], ["ppw", String(v.ppw)], ["tone", v.tone]].forEach(function (p) {
      var x = form.querySelector('input[name="' + p[0] + '"][value="' + p[1] + '"]'); if (x) x.checked = true;
    });
    if (v.plats) form.querySelectorAll('input[name="plat"]').forEach(function (x) { x.checked = v.plats.indexOf(x.value) > -1; });
  }

  /* ---------- key dates ---------- */
  function relevant(ev, ind) {
    if (ev.holiday || ev.type === "holiday" || ev.type === "religious" || ev.type === "civic") return true;
    if (ev.type === "commercial") return ind !== "ngo";
    if (ev.type === "season") {
      if (!SCHOOL_RE.test(ev.name)) return true;
      if (/^(education|food|retail|fmcg|events)$/.test(ind)) return true;
      return ind === "fintech" && /resume|Back-to-school/.test(ev.name);
    }
    if (ev.type === "cultural") return /^(beauty|events|food|retail|fmcg)$/.test(ind);
    if (ev.type === "sports") return /^(food|events|fmcg|retail|tech)$/.test(ind);
    if (ev.type === "awareness") return IND_RE[ind].test(ev.name) || GENERAL_RE.test(ev.name);
    return false;
  }

  function evTag(ev) { return EV_TAG[ev.name] || camelTag(ev.name); }

  function keyDates(S, E, inp, rnd, ctx) {
    var out = [], all = [], us = inp.biz || "all of us";
    var ramadan = EVENTS.filter(function (x) { return x.ev.name === "Ramadan"; });
    function inRamadan(d) { return ramadan.some(function (r) { return d >= r.s && d <= r.e; }); }
    ctx.inRamadan = inRamadan;
    var hoursDone = {};
    EVENTS.forEach(function (x) {
      var ev = x.ev, s = x.s, e = x.e;
      var inWin = e >= S && s <= E, ahead = s > E && diff(E, s) <= 14;
      if (!inWin && !ahead) return;
      var rel = relevant(ev, inp.ind);
      all.push({ name: ev.name, start: iso(s), end: iso(e), type: ev.type, est: !!ev.est, note: ev.note || "", rel: rel, ahead: ahead && !inWin, holiday: !!ev.holiday });
      if (!rel) return;
      var evIdeas = (ev.ideas || []).filter(function (t) { return !/^(Keep it|Stay neutral|Pause|Same approach|Reschedule|Check )/.test(t) && (/^(food|fmcg|retail)$/.test(inp.ind) || !/meal|food|delivery|recipe|lunch/i.test(t)); });
      if (!evIdeas.length) evIdeas = ev.ideas || [];
      var ideas = shuffle(evIdeas, rnd), ii = 0;
      function idea() { return ideas.length ? ideas[ii++ % ideas.length].replace(/\.$/, "") : ""; }
      var kd = { name: ev.name, type: ev.type, est: !!ev.est, note: ev.note || "", start: iso(s), end: iso(e) };
      var tag = evTag(ev);
      var ramNote = ev.type === "commercial" && inRamadan(s) ? " It falls during Ramadan this year, so keep the tone respectful." : "";
      function add(date, kind, o) {
        var m = o.desc.match(/^((?:Follow-up post|Plan-ahead teaser)\. )?Angle: ([^.]*)\.\s?/);
        if (m && o.title.toLowerCase().indexOf(m[2].toLowerCase()) > -1) {
          var rest = o.desc.slice(m[0].length);
          if (!rest) rest = { commercial: "Show what's on, the price in naira and how to order.", awareness: "Share one practical point people can use today.", cultural: "Join the conversation people are already having.", sports: "Join the conversation people are already having.", season: "Make it timely and useful for what people are doing this season.", religious: "Keep the tone warm and respectful." }[ev.type] || "";
          o.desc = (m[1] || "") + rest;
        }
        out.push({ date: iso(date), kind: kind, kd: kd, title: o.title, desc: o.desc, pillar: o.pillar, hint: o.hint, cta: o.cta || "", tags: o.tags || [tag], fixed: kind === "day" });
      }
      function pillarFor(t) { return { commercial: "promote", awareness: "educate", cultural: "entertain", sports: "entertain", season: "entertain", religious: "inspire", holiday: "inspire", civic: "community" }[t] || "educate"; }
      function angle(t) {
        var a = idea();
        var tail = {
          commercial: " Give prices in naira and say clearly when the offer ends." + (inp.offer ? " Tie it to your offer: " + inp.offer + "." : ""),
          awareness: " Make it useful and practical, not just a graphic with the day's name.",
          cultural: " Join the conversation people are already having.",
          sports: " Join the conversation people are already having.",
          religious: " Keep the tone warm and respectful.",
          season: "", holiday: ""
        }[t] || "";
        return { a: a, d: (a ? "Angle: " + a + "." : "") + tail + ramNote };
      }

      if (ahead && !inWin) {
        var g = angle(ev.type);
        add(addDays(s, -7) > E ? E : (addDays(s, -7) < S ? S : addDays(s, -7)), "ahead", {
          title: "Coming up: " + ev.name + " on " + fmtDay(s), desc: "Plan-ahead teaser. " + g.d, pillar: pillarFor(ev.type) === "promote" && inp.ind === "ngo" ? "community" : pillarFor(ev.type),
          hint: "s", cta: ev.type === "commercial" ? "Turn on post notifications so you don't miss it" : "Save the date"
        });
        return;
      }
      var first = s < S ? S : s, last = e > E ? E : e, ov = diff(first, last) + 1, dur = diff(s, e) + 1;
      var started = s >= S;

      if (ev.type === "civic") {
        add(first, "day", {
          title: ev.name + ": please vote, and stay safe", pillar: "community", hint: "i",
          desc: "Keep it neutral: no party colours, candidates or slogans. Encourage people to vote peacefully and look out for each other, and share any changes to opening hours or deliveries.",
          cta: "Share this with someone who's voting", tags: ["#NigeriaDecides" + s.getFullYear(), "#Vote"]
        });
        if (addDays(first, -1) >= S) add(addDays(first, -1), "hours", {
          title: "Our opening hours and deliveries on " + fmtDay(first), pillar: "community", hint: "s",
          desc: "Movement is usually restricted on election day. Tell customers what's open, what's paused and when normal service resumes.",
          cta: "Save this for later", tags: ["#Nigeria"]
        });
        ctx.civic[iso(first)] = true;
        return;
      }

      var isBig = BIG.test(ev.name) && inp.ind !== "ngo";
      if (ev.holiday) {
        var g2 = angle(ev.type);
        var gt = (GREET[ev.name] || "Happy " + ev.name + " from {us}").replace("{us}", us);
        add(first, "day", { title: gt, desc: "A warm greeting for everyone celebrating." + (g2.a ? " Angle: " + g2.a + "." : "") + (ev.type === "religious" ? " Keep it respectful and simple." : ""), pillar: "inspire", hint: "i", cta: "Share this with someone you're celebrating with" });
        if (isBig && addDays(s, -3) >= S) {
          var g3 = angle("commercial");
          add(addDays(s, -3), "teaser", { title: ev.name + ": " + lowerFirst(g3.a || "get ready"), desc: "Teaser, " + diff(addDays(s, -3), s) + " days before. " + g3.d.replace(/^Angle: [^.]*\.\s?/, "") + " Give an order-by date so deliveries arrive in time.", pillar: "promote", hint: "r" });
        }
        // opening hours: one post before the first of any back-to-back holidays
        var hd = addDays(first, -1);
        var covered = EVENTS.some(function (y) { return y.ev !== ev && y.ev.holiday && diff(y.s, s) > 0 && diff(y.s, s) <= 3 && hoursDone[iso(y.s)]; });
        if (!covered && hd >= S) {
          var names = [ev.name];
          EVENTS.forEach(function (y) { if (y.ev !== ev && y.ev.holiday && diff(s, y.s) > 0 && diff(s, y.s) <= 3) names.push(y.ev.name); });
          add(hd, "hours", { title: "Our opening hours over " + names.join(" and "), desc: "Tell customers when you're closed, when you're back and how to reach you in the meantime." + (ev.est ? " The date depends on the moon sighting, so confirm it the day before." : ""), pillar: "community", hint: "s", cta: "Save this for later", tags: [tag, "#OpeningHours"] });
          hoursDone[iso(s)] = true;
        }
        return;
      }

      if (isBig) {
        var gb = angle(ev.type);
        if (addDays(s, -3) >= S) {
          add(addDays(s, -3), "teaser", { title: "3 days to " + ev.name + ": " + lowerFirst(idea() || "get ready"), desc: "Teaser. Tell people what's coming and how to be first in line, such as joining your WhatsApp early-access list." + ramNote, pillar: "promote", hint: "s", cta: inp.goal === "sales" ? "Send us a WhatsApp to get early access" : "Turn on post notifications" });
        }
        add(first, "day", { title: ev.name + ": " + lowerFirst(gb.a), desc: gb.d, pillar: inp.ind === "ngo" ? "community" : "promote", hint: "r" });
        return;
      }

      var isRam = ev.name === "Ramadan";
      var n = 1;
      if (dur >= 20) n = ov >= 14 ? 3 : ov >= 7 ? 2 : 1;
      else if (dur >= 6 && ov >= 5 && IND_RE[inp.ind].test(ev.name)) n = 2;
      for (var k = 0; k < n; k++) {
        var at = addDays(first, n === 1 ? 0 : Math.round(k * (ov - 1) / (n === 2 ? 2 : 2.4)));
        if (isRam && k === 0) {
          add(at, "day", {
            title: "Ramadan Kareem to everyone observing",
            desc: "A short, respectful greeting. Share any changes to your opening hours or delivery times, and keep the tone calm through the month." + (inp.ind === "food" ? " Mention iftar orders and late delivery if you offer them." : ""),
            pillar: "inspire", hint: "i", cta: "Share with friends who are observing"
          });
          continue;
        }
        var ga = angle(ev.type), p = pillarFor(ev.type);
        if (p === "promote" && inp.ind === "ngo") p = "community";
        var lab = k === 0 ? (started ? ev.name : ev.name + " is on") : ev.name;
        add(at, k === 0 ? "day" : "season", { title: lab + ": " + lowerFirst(ga.a || "join in"), desc: (k > 0 ? "Follow-up post. " : "") + ga.d, pillar: p, hint: k === 1 ? "c" : (p === "educate" ? "c" : "r") });
      }
    });

    // keep one key-date post per day where possible: move teasers, hours, follow-ups and plan-ahead posts
    out.sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : (a.fixed ? -1 : 1); });
    var taken = {};
    out.filter(function (o) { return o.fixed; }).forEach(function (o) { taken[o.date] = (taken[o.date] || 0) + 1; });
    out.filter(function (o) { return !o.fixed; }).forEach(function (o) {
      var d0 = parse(o.date), evS = parse(o.kd.start);
      var sales = o.pillar === "promote";
      var bad = function (dd) { return taken[iso(dd)] || (sales && ctx.civic[iso(dd)]); };
      if (bad(d0)) {
        var tries = [-1, 1, -2, 2, -3, 3];
        for (var t = 0; t < tries.length; t++) {
          var c = addDays(d0, tries[t]);
          if (c < S || c > E) continue;
          if ((o.kind === "teaser" || o.kind === "hours") && c >= evS) continue;
          if (!bad(c)) { o.date = iso(c); break; }
        }
      }
      taken[o.date] = (taken[o.date] || 0) + 1;
    });
    // a sales post on an election day that couldn't move: soften it
    out.forEach(function (o) {
      if (ctx.civic[o.date] && o.pillar === "promote") { o.pillar = "community"; o.desc += " It's election day, so keep this low-key and skip the hard sell."; }
    });
    ctx.allKd = all;
    return out;
  }

  /* ---------- generator ---------- */
  function generate(inp, seed) {
    var rnd = rngFrom(hash(JSON.stringify([inp.ind, inp.goal, inp.plats, inp.ppw, inp.start, inp.tone, inp.products, inp.offer, inp.biz])) ^ seed);
    var S = parse(inp.start), E = addDays(S, 29);
    var I = D.industries[inp.ind];
    var ctx = { civic: {} };
    var keys = keyDates(S, E, inp, rnd, ctx);

    // regular posting slots
    var n = Math.round(inp.ppw * 30 / 7), slots = [];
    for (var i = 0; i < n; i++) slots.push(Math.min(29, Math.floor((i + 0.5) * 30 / n)));
    var used = {}; slots.forEach(function (d) { used[d] = (used[d] || 0) + 1; });
    var keyDay = {}; keys.forEach(function (k) { keyDay[diff(S, parse(k.date))] = true; });
    slots = slots.map(function (d) {
      if (!keyDay[d] || n > 30) return d;
      var tries = [1, -1, 2, -2];
      for (var t = 0; t < tries.length; t++) {
        var c = d + tries[t];
        if (c >= 0 && c <= 29 && !used[c] && !keyDay[c]) { used[d]--; used[c] = 1; return c; }
      }
      return d;
    }).sort(function (a, b) { return a - b; });

    // pillar counts
    var w = {}, tw = 0;
    P_ORDER.forEach(function (p) {
      var x = WEIGHTS[inp.goal][p];
      if (inp.tone === "playful" && p === "entertain") x *= 1.3;
      if (inp.tone === "premium") { if (p === "inspire") x *= 1.35; if (p === "entertain") x *= 0.75; }
      if (inp.tone === "professional") { if (p === "educate") x *= 1.2; if (p === "entertain") x *= 0.8; }
      w[p] = x; tw += x;
    });
    var counts = {}, rems = [], sum = 0;
    P_ORDER.forEach(function (p) { var e = n * w[p] / tw; counts[p] = Math.floor(e); sum += counts[p]; rems.push([p, e - counts[p]]); });
    rems.sort(function (a, b) { return b[1] - a[1]; });
    for (var r = 0; sum < n; r++) { counts[rems[r % rems.length][0]]++; sum++; }
    // never more than 30% hard sell across the whole plan
    var total = n + keys.length, keyPromo = keys.filter(function (k) { return k.pillar === "promote"; }).length;
    var maxPromo = Math.max(1, Math.floor(total * 0.3) - keyPromo);
    if (counts.promote > maxPromo) { var extra = counts.promote - maxPromo; counts.promote = maxPromo; counts[inp.goal === "sales" || inp.goal === "leads" ? "proof" : "educate"] += Math.ceil(extra / 2); counts.educate += Math.floor(extra / 2); }

    // order pillars: greedy, no back-to-back repeats
    var left = {}; P_ORDER.forEach(function (p) { left[p] = counts[p]; });
    var seq = [], prev = "";
    for (i = 0; i < n; i++) {
      var opts = P_ORDER.filter(function (p) { return left[p] > 0 && p !== prev; });
      if (!opts.length) opts = P_ORDER.filter(function (p) { return left[p] > 0; });
      opts = shuffle(opts, rnd).sort(function (a, b) { return left[b] - left[a]; });
      var ch = opts.length > 1 && rnd() < 0.35 ? opts[1] : opts[0];
      seq.push(ch); left[ch]--; prev = ch;
    }
    // no sales posts on election days: swap with a later or earlier slot
    slots.forEach(function (d, j) {
      if (!ctx.civic[iso(addDays(S, d))] || (seq[j] !== "promote" && seq[j] !== "proof")) return;
      for (var k = 1; k < n; k++) {
        var cand = [j + k, j - k];
        for (var c = 0; c < 2; c++) {
          var m = cand[c];
          if (m >= 0 && m < n && seq[m] !== "promote" && seq[m] !== "proof" && !ctx.civic[iso(addDays(S, slots[m]))]) { var t = seq[j]; seq[j] = seq[m]; seq[m] = t; return; }
        }
      }
    });

    // platform rotation
    var plats = inp.plats.length ? inp.plats : ["ig"];
    var primaries = plats.filter(function (p) { return p !== "wa"; });
    if (!primaries.length) primaries = ["wa"];
    var pw = 0; primaries.forEach(function (p) { pw += PWEIGHT[p]; });
    var platSeq = [];
    primaries.forEach(function (p) { var c = Math.round(n * PWEIGHT[p] / pw); for (var q = 0; q < c; q++) platSeq.push(p); });
    while (platSeq.length < n) platSeq.push(primaries[platSeq.length % primaries.length]);
    platSeq = shuffle(platSeq, rnd);
    for (i = 1; i < platSeq.length; i++) if (platSeq[i] === platSeq[i - 1]) { for (var z = i + 1; z < platSeq.length; z++) if (platSeq[z] !== platSeq[i]) { var tt = platSeq[i]; platSeq[i] = platSeq[z]; platSeq[z] = tt; break; } }

    // idea pools
    var pools = {};
    P_ORDER.forEach(function (p) { pools[p] = shuffle(I.ideas[p] || [], rnd).concat(shuffle(D.generic[p] || [], rnd)); });
    var offerPool = shuffle(D.offer.slice(0, 2), rnd).concat(D.offer.slice(2)), offerUsed = 0, promoN = 0;
    var products = inp.products ? inp.products.split(",").map(function (x) { return x.trim(); }).filter(Boolean) : [];
    var pIdx = Math.floor(rnd() * Math.max(1, products.length));
    var fill = mkFill(inp, I, products, function () { return pIdx++; });

    var maxLive = Math.max(1, Math.floor(n / 10)), lives = 0, lastF = [];
    var items = [];
    for (i = 0; i < n; i++) {
      var pil = seq[i], raw;
      if (pil === "promote" && inp.offer && offerUsed < offerPool.length && promoN++ % 2 === 0) raw = offerPool[offerUsed++];
      else raw = pools[pil].length ? pools[pil].shift() : pick(D.generic[pil], rnd);
      var parts = raw.split("|");
      var fmt = HINT[parts[2]] || "image", plat = platSeq[i];
      if (fmt === "live" && lives >= maxLive) fmt = "reel";
      if (SUPPORT[plat].indexOf(fmt) < 0) {
        var cands = plats.filter(function (p) { return SUPPORT[p].indexOf(fmt) > -1; });
        if (cands.length && rnd() < 0.6) plat = pick(cands, rnd); else fmt = adapt(fmt, plat);
      }
      if (lastF.length >= 2 && lastF[0] === fmt && lastF[1] === fmt) {
        var alt = ["carousel", "reel", "image", "text", "doc", "status"].filter(function (f) { return f !== fmt && SUPPORT[plat].indexOf(f) > -1; });
        if (alt.length) fmt = alt[0];
      }
      if (fmt === "live") lives++;
      lastF.unshift(fmt); lastF.length = Math.min(lastF.length, 2);
      var date = addDays(S, slots[i]);
      var desc = fill(parts[1]);
      if (pil === "promote" && ctx.inRamadan(date)) desc += " Ramadan is under way: post after iftar, around 7.30pm, and keep the tone calm.";
      items.push({
        id: uid(), date: iso(date), plat: plat, cross: crossFor(fmt, plat, plats), fmt: fmt, pillar: pil,
        title: cap(fill(parts[0])), desc: desc, cta: ctaFor(inp, pil, fmt, plat, rnd), tags: tagsFor(inp, I, pil, null, rnd).join(" "), kd: null
      });
    }

    // key-date posts
    keys.forEach(function (k) {
      var plat = primaries[0], fmt = HINT[k.hint] || "image";
      if (k.hint === "s" && plats.indexOf("wa") > -1 && plats.indexOf("ig") < 0 && plats.indexOf("fb") < 0) plat = "wa";
      else {
        var cands = plats.filter(function (p) { return SUPPORT[p].indexOf(fmt) > -1; });
        if (cands.length) plat = cands.indexOf("ig") > -1 ? "ig" : cands[0];
        else fmt = adapt(fmt, plat);
      }
      var kTags = k.tags.filter(Boolean).concat(tagsFor(inp, I, k.pillar, true, rnd)).filter(function (t, ix, a) { return a.indexOf(t) === ix; }).slice(0, 4);
      items.push({
        id: uid(), date: k.date, plat: plat, cross: crossFor(fmt, plat, plats), fmt: fmt, pillar: k.pillar,
        title: cap(k.title), desc: k.desc, cta: k.cta ? toneCta(k.cta, inp.tone, plat) : ctaFor(inp, k.pillar, fmt, plat, rnd), tags: kTags.join(" "),
        kd: { name: k.kd.name, type: k.kd.type, est: k.kd.est, note: k.kd.note, kind: k.kind, start: k.kd.start, end: k.kd.end }
      });
    });
    sortItems(items);
    return {
      v: 1, seed: seed, inputs: inp, start: iso(S), end: iso(E), items: items,
      kdAll: ctx.allKd, created: iso(new Date())
    };
  }

  function mkFill(inp, I, products, next) {
    return function (s) {
      return s.replace(/\{product(?:\/([^}]*))?\}/g, function (m, fb) {
        if (products.length) return products[next() % products.length];
        return fb || I.product;
      }).replace(/\{offer\}/g, inp.offer || "our current offer").replace(/\{business\}/g, inp.biz || "us");
    };
  }
  function adapt(fmt, plat) { var ch = CHAIN[fmt] || ["image"]; for (var i = 0; i < ch.length; i++) if (SUPPORT[plat].indexOf(ch[i]) > -1) return ch[i]; return SUPPORT[plat][0]; }
  function crossFor(fmt, plat, plats) { return (CROSS[fmt] || []).filter(function (p) { return p !== plat && plats.indexOf(p) > -1; }).slice(0, 3); }
  function toneCta(c, tone, plat) {
    if (tone === "professional" || tone === "premium") c = c.replace("Send us a WhatsApp", "Message us on WhatsApp").replace("Comment below", "Share your view in the comments");
    if (tone === "playful") c = c.replace("Comment below", "Drop your answer below").replace("Send us a WhatsApp", "Send us a quick WhatsApp");
    var where = { fb: "the link in the post", li: "the link in the comments", x: "the link in our bio", yt: "the link in the description" }[plat];
    if (plat === "wa") c = c.replace(/Tap the link in bio to/, "Reply to this status to").replace(/(via|in) the link in bio/, "by replying to this status");
    else if (where) c = c.replace(/the link in bio/, where);
    return c;
  }
  function ctaFor(inp, pil, fmt, plat, rnd) {
    var c;
    if (fmt === "poll") c = "Vote in the poll";
    else if (fmt === "live") c = "Set a reminder and join us live";
    else if (pil === "community") c = pick(["Comment below", "Tell us in the comments", "Tag a friend"], rnd);
    else if (pil === "educate") c = (inp.goal === "leads" || inp.goal === "sales") && rnd() < 0.34 ? pick(CTAS[inp.goal], rnd) : pick(["Save this for later", "Share this with someone who needs it"], rnd);
    else if (pil === "promote" || pil === "proof") c = inp.goal === "awareness" ? pick(["Tap the link in bio to learn more", "Follow us for more"], rnd) : inp.goal === "engagement" ? pick(["Send us a WhatsApp", "Tell us in the comments"], rnd) : pick(CTAS[inp.goal], rnd);
    else c = rnd() < 0.5 ? pick(CTAS[inp.goal], rnd) : pick(["Follow us for more", "Comment below"], rnd);
    return toneCta(c, inp.tone, plat);
  }
  function tagsFor(inp, I, pil, isKey, rnd) {
    var t = [];
    if (!isKey && PTAG[pil] && rnd() < 0.6) t.push(PTAG[pil]);
    var ind = shuffle(I.tags, rnd);
    t.push(ind[0], ind[1]);
    if (!isKey && rnd() < 0.5) t.push(ind[2]);
    if (rnd() < 0.5 && !t.some(function (x) { return /Lagos|Nigeria|Naija/.test(x); })) t.push(I.loc);
    if (inp.biz) { var b = camelTag(inp.biz); if (b) t.push(b); }
    return t.filter(function (x, i, a) { return x && a.indexOf(x) === i; }).slice(0, 5);
  }
  function sortItems(items) {
    items.sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : (b.kd ? 1 : 0) - (a.kd ? 1 : 0); });
  }

  /* ---------- state ---------- */
  var saved = load() || {};
  var plan = saved.plan || null, view = saved.view || "grid", undoSnap = null, seedN = saved.plan ? saved.plan.seed : 1;
  function persist() { store({ inputs: readInputs(), plan: plan, view: view }); }

  /* ---------- render ---------- */
  var out = $("planOut"), empty = $("planEmpty");
  function kindLabel(k) { return { day: "Key date", season: "Key date", teaser: "Teaser", hours: "Opening hours", ahead: "Plan ahead" }[k] || "Key date"; }
  function platLine(it) { return PLATS[it.plat] + (it.cross && it.cross.length ? " (also " + it.cross.map(function (p) { return PLATS[p]; }).join(", ") + ")" : ""); }
  function kdText(it) { if (!it.kd) return ""; return it.kd.name + " (" + kindLabel(it.kd.kind).toLowerCase() + ")" + (it.kd.est ? ", estimated date" : ""); }

  function render() {
    if (!plan) { out.hidden = true; empty.hidden = false; return; }
    out.hidden = false; empty.hidden = true;
    var inp = plan.inputs, S = parse(plan.start), E = parse(plan.end), items = plan.items;
    $("planTitle").textContent = (inp.biz ? inp.biz + ": " : "") + "30-day content plan";
    $("planMeta").textContent = fmtFull(S) + " to " + fmtFull(E) + " · " + D.industries[inp.ind].label + " · Goal: " + GOALS[inp.goal] + " · " + TONES[inp.tone] + " tone";
    $("toneTip").textContent = TONE_TIPS[inp.tone];

    // summary
    var kdNames = {}; items.forEach(function (it) { if (it.kd && it.kd.kind !== "ahead") kdNames[it.kd.name] = 1; });
    var nKd = Object.keys(kdNames).length;
    var regular = items.filter(function (it) { return !it.kd; }).length;
    $("sumPosts").textContent = items.length;
    $("sumPostsSub").textContent = regular + " regular + " + (items.length - regular) + " key-date";
    $("sumKd").textContent = nKd;
    $("sumWeek").textContent = (Math.round(items.length / 30 * 7 * 10) / 10).toString();
    $("sumPlat").textContent = inp.plats.length;
    var pc = {}; items.forEach(function (it) { pc[it.pillar] = (pc[it.pillar] || 0) + 1; });
    $("mixBar").innerHTML = P_ORDER.filter(function (p) { return pc[p]; }).map(function (p) {
      return '<span class="seg pl-' + p + '" style="width:' + (pc[p] / items.length * 100).toFixed(2) + '%" title="' + PILLARS[p] + ": " + pc[p] + '"></span>';
    }).join("");
    $("mixLegend").innerHTML = P_ORDER.filter(function (p) { return pc[p]; }).map(function (p) {
      return '<li><i class="sw pl-' + p + '"></i>' + PILLARS[p] + " <b>" + Math.round(pc[p] / items.length * 100) + "%</b></li>";
    }).join("");
    var fc = {}; items.forEach(function (it) { fc[it.fmt] = (fc[it.fmt] || 0) + 1; });
    $("fmtMix").innerHTML = Object.keys(fc).sort(function (a, b) { return fc[b] - fc[a]; }).map(function (f) { return '<li>' + esc(FSHORT[f]) + " <b>" + fc[f] + "</b></li>"; }).join("");

    // key dates panel
    var kdIn = (plan.kdAll || []).filter(function (k) { return k.rel; }), kdOut = (plan.kdAll || []).filter(function (k) { return !k.rel && !k.ahead; });
    $("kdList").innerHTML = kdIn.length ? kdIn.map(function (k) {
      var lab = k.start === k.end ? fmtDay(k.start) : fmtDay(k.start) + " to " + fmtDay(k.end);
      return '<li class="kd-item"><span class="kd-d">' + esc(lab) + "</span><b>" + esc(k.name) + "</b>" + (k.ahead ? '<span class="tag ahead">Plan ahead</span>' : "") + (k.est ? '<span class="tag est">Estimated date</span>' : "") + (k.type === "civic" ? '<span class="tag civic">Neutral, civic only</span>' : "") + "</li>";
    }).join("") : '<li class="kd-none">No key dates fall in this window for your industry. That\'s a good month to focus on your own content series.</li>';
    $("kdAlso").innerHTML = kdOut.length ? '<p class="also-h">Also in this window, less relevant to your industry:</p><ul>' + kdOut.map(function (k) {
      return '<li><span>' + esc(fmtDay(k.start)) + " · " + esc(k.name) + '</span> <button type="button" class="link" data-addkd="' + esc(k.name) + '" data-date="' + (parse(k.start) < S ? plan.start : k.start) + '">Add a post</button></li>';
    }).join("") + "</ul>" : "";
    var cov = parse("2026-10-24"), covEnd = parse("2027-12-31");
    $("kdCover").hidden = !(E < cov || S > covEnd);

    renderGrid(S, E, items);
    renderList(items);
    setView(view, true);
    var helpMsg = "Hi Crea8Hub, I've made a 30-day content plan" + (inp.biz ? " for " + inp.biz : "") + " (" + D.industries[inp.ind].label + ") for " + MONTHS[S.getMonth()] + " " + S.getFullYear() + ". My main goal is " + GOALS[inp.goal].toLowerCase() + ". I'd like help creating and running it.";
    $("helpLink").href = WA + encodeURIComponent(helpMsg);
  }

  function chip(it) {
    var lbl = fmtDay(it.date) + ". " + FSHORT[it.fmt] + " on " + PLATS[it.plat] + ", " + PILLARS[it.pillar] + (it.kd ? ", " + kindLabel(it.kd.kind) : "") + ": " + it.title + ". Open to view or edit.";
    return '<button type="button" class="pchip pl-' + it.pillar + (it.kd ? " kd" : "") + '" data-id="' + it.id + '" aria-label="' + esc(lbl) + '"><span class="f">' + esc(FSHORT[it.fmt]) + '</span><span class="t">' + esc(it.title) + "</span></button>";
  }

  function renderGrid(S, E, items) {
    var by = {}; items.forEach(function (it) { (by[it.date] = by[it.date] || []).push(it); });
    var evOn = {};
    (plan.kdAll || []).forEach(function (k) { if (k.ahead || !k.rel) return; var a = parse(k.start), b = parse(k.end); for (var d = a < S ? S : a; d <= b && d <= E; d = addDays(d, 1)) { (evOn[iso(d)] = evOn[iso(d)] || []).push(k.name); } });
    var g0 = addDays(S, -((S.getDay() + 6) % 7)), g1 = addDays(E, (7 - E.getDay()) % 7);
    var h = '<div class="cal-head" aria-hidden="true">' + ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(function (d) { return "<span>" + d + "</span>"; }).join("") + "</div><div class=\"cal-body\">";
    for (var d = g0; d <= g1; d = addDays(d, 1)) {
      var k = iso(d), inW = d >= S && d <= E;
      if (!inW) { h += '<div class="cell out" aria-hidden="true"></div>'; continue; }
      var first = d.getDate() === 1 || k === plan.start;
      var ev = evOn[k] || [];
      h += '<div class="cell' + (ev.length ? " has-ev" : "") + '" role="group" aria-label="' + esc(fmtDay(d, true)) + '"><div class="c-top"><span class="dn">' + d.getDate() + (first ? " <small>" + SHORT[d.getMonth()] + "</small>" : "") + "</span>" +
        '<button type="button" class="add" data-add="' + k + '" aria-label="Add a post on ' + esc(fmtDay(d, true)) + '">+</button></div>' +
        (ev.length ? '<span class="evn" title="' + esc(ev.join(", ")) + '">' + esc(ev[0]) + (ev.length > 1 ? " +" + (ev.length - 1) : "") + "</span>" : "") +
        (by[k] || []).map(chip).join("") + "</div>";
    }
    $("gridView").innerHTML = h + "</div>";
  }

  function renderList(items) {
    var by = {}, order = [];
    items.forEach(function (it) { if (!by[it.date]) { by[it.date] = []; order.push(it.date); } by[it.date].push(it); });
    $("listView").innerHTML = order.length ? order.map(function (d) {
      return '<section class="lday"><header><h4>' + esc(fmtDay(d, true)) + '</h4><button type="button" class="link no-print" data-add="' + d + '">Add a post</button></header>' +
        by[d].map(function (it) {
          return '<article class="post pl-' + it.pillar + '"><div class="post-tags"><span class="tag pt">' + PILLARS[it.pillar] + '</span><span class="tag ft">' + esc(FMTS[it.fmt]) + "</span>" +
            (it.kd ? '<span class="tag kdb">' + esc(kindLabel(it.kd.kind)) + ": " + esc(it.kd.name) + "</span>" : "") + (it.kd && it.kd.est ? '<span class="tag est">Estimated date</span>' : "") + "</div>" +
            "<h5>" + esc(it.title) + "</h5><p>" + esc(it.desc) + "</p>" +
            '<dl><dt>Platform</dt><dd>' + esc(platLine(it)) + "</dd><dt>Call to action</dt><dd>" + esc(it.cta) + "</dd>" + (it.tags ? "<dt>Hashtags</dt><dd>" + esc(it.tags) + "</dd>" : "") +
            (it.kd && it.kd.note ? "<dt>Note</dt><dd>" + esc(it.kd.note) + "</dd>" : "") + "</dl>" +
            '<div class="post-acts no-print"><button type="button" class="btn small dark" data-edit="' + it.id + '">Edit</button><button type="button" class="btn small ghost" data-del="' + it.id + '">Delete</button></div></article>';
        }).join("") + "</section>";
    }).join("") : '<p class="kd-none">This plan is empty. Use "Add a post" on the calendar to start again, or generate a new plan.</p>';
  }

  function setView(v, quiet) {
    view = v;
    $("gridView").hidden = v !== "grid"; $("listView").hidden = v !== "list";
    document.querySelectorAll("[data-view]").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-view") === v ? "true" : "false"); });
    if (!quiet) persist();
  }

  /* ---------- status + undo ---------- */
  var statusT;
  function status(msg, canUndo) {
    var el = $("planStatus");
    el.innerHTML = esc(msg) + (canUndo ? ' <button type="button" class="link" id="undoBtn">Undo</button>' : "");
    clearTimeout(statusT); statusT = setTimeout(function () { el.textContent = ""; }, 9000);
  }
  function snap() { undoSnap = JSON.parse(JSON.stringify(plan)); }

  /* ---------- dialog ---------- */
  var dlg = $("postDlg"), editing = null;
  function fillSelect(sel, map, keys) { sel.innerHTML = keys.map(function (k) { return '<option value="' + k + '">' + esc(map[k]) + "</option>"; }).join(""); }
  function openDlg(it, isNew) {
    editing = { it: it, isNew: isNew };
    var S = parse(plan.start), dates = [];
    for (var i = 0; i < 30; i++) { var d = addDays(S, i); dates.push(iso(d)); }
    var dm = {}; dates.forEach(function (d) { dm[d] = fmtDay(d, true); });
    fillSelect($("eDate"), dm, dates);
    var pl = plan.inputs.plats.length ? plan.inputs.plats : PLAT_ORDER;
    if (pl.indexOf(it.plat) < 0) pl = pl.concat([it.plat]);
    fillSelect($("ePlat"), PLATS, PLAT_ORDER.filter(function (p) { return pl.indexOf(p) > -1; }));
    fillSelect($("eFmt"), FMTS, Object.keys(FMTS));
    fillSelect($("ePil"), PILLARS, P_ORDER);
    $("eDate").value = it.date; $("ePlat").value = it.plat; $("eFmt").value = it.fmt; $("ePil").value = it.pillar;
    $("eTitle").value = it.title; $("eDesc").value = it.desc; $("eCta").value = it.cta; $("eTags").value = it.tags;
    $("dlgTitle").textContent = isNew ? "Add a post" : "Post details";
    $("eKd").innerHTML = it.kd ? '<span class="tag kdb">' + esc(kindLabel(it.kd.kind)) + ": " + esc(it.kd.name) + "</span>" + (it.kd.est ? ' <span class="tag est">Estimated date</span>' : "") + (it.kd.note ? '<p class="fine">' + esc(it.kd.note) + "</p>" : "") : "";
    $("eCross").textContent = it.cross && it.cross.length ? "Also post on: " + it.cross.map(function (p) { return PLATS[p]; }).join(", ") : "";
    $("eDel").hidden = !!isNew;
    $("eSuggest").hidden = !isNew;
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", "");
    $("eTitle").focus();
  }
  function closeDlg() { if (dlg.close) dlg.close(); else dlg.removeAttribute("open"); editing = null; }
  function suggestion(date, pil) {
    var inp = plan.inputs, I = D.industries[inp.ind], rnd = rngFrom(Date.now() & 0xffffffff);
    pil = pil || pick(P_ORDER, rnd);
    var usedT = {}; plan.items.forEach(function (x) { usedT[x.title] = 1; });
    var products = inp.products ? inp.products.split(",").map(function (x) { return x.trim(); }).filter(Boolean) : [];
    var fill = mkFill(inp, I, products, function () { return Math.floor(rnd() * 99); });
    var pool = shuffle((I.ideas[pil] || []).concat(D.generic[pil]), rnd), raw = pool[0];
    for (var i = 0; i < pool.length; i++) if (!usedT[cap(fill(pool[i].split("|")[0]))]) { raw = pool[i]; break; }
    var parts = raw.split("|"), plats = inp.plats.length ? inp.plats : ["ig"];
    var plat = plats.filter(function (p) { return p !== "wa"; })[0] || plats[0], fmt = adapt(HINT[parts[2]] || "image", plat);
    return { id: uid(), date: date, plat: plat, cross: crossFor(fmt, plat, plats), fmt: fmt, pillar: pil, title: cap(fill(parts[0])), desc: fill(parts[1]), cta: ctaFor(inp, pil, fmt, plat, rnd), tags: tagsFor(inp, I, pil, null, rnd).join(" "), kd: null };
  }
  function find(id) { for (var i = 0; i < plan.items.length; i++) if (plan.items[i].id === id) return i; return -1; }

  $("eSave").addEventListener("click", function () {
    if (!editing) return;
    var it = editing.it, title = $("eTitle").value.trim();
    if (!title) { $("eTitle").focus(); $("eErr").textContent = "Add a title or hook for this post."; return; }
    $("eErr").textContent = "";
    snap();
    var plats = plan.inputs.plats.length ? plan.inputs.plats : [$("ePlat").value];
    it.date = $("eDate").value; it.plat = $("ePlat").value; it.fmt = $("eFmt").value; it.pillar = $("ePil").value;
    if (SUPPORT[it.plat].indexOf(it.fmt) < 0) it.fmt = adapt(it.fmt, it.plat);
    it.cross = crossFor(it.fmt, it.plat, plats);
    it.title = title; it.desc = $("eDesc").value.trim(); it.cta = $("eCta").value.trim(); it.tags = $("eTags").value.trim(); it.edited = true;
    if (editing.isNew) plan.items.push(it);
    sortItems(plan.items);
    var wasNew = editing.isNew;
    closeDlg(); render(); persist();
    status(wasNew ? "Post added." : "Changes saved.", true);
  });
  $("eDel").addEventListener("click", function () { if (!editing) return; var i = find(editing.it.id); closeDlg(); if (i > -1) del(i); });
  $("eCancel").addEventListener("click", closeDlg);
  $("eSuggest").addEventListener("click", function () {
    var s = suggestion($("eDate").value, null);
    $("ePil").value = s.pillar; $("eFmt").value = s.fmt; $("ePlat").value = s.plat; $("eTitle").value = s.title; $("eDesc").value = s.desc; $("eCta").value = s.cta; $("eTags").value = s.tags;
  });
  dlg.addEventListener("close", function () { editing = null; });

  function del(i) {
    snap();
    var t = plan.items[i].title;
    plan.items.splice(i, 1); render(); persist();
    status('Deleted "' + (t.length > 40 ? t.slice(0, 40) + "…" : t) + '".', true);
  }

  /* ---------- exports ---------- */
  function fileName(ext) { return "content-plan-" + plan.start + (plan.inputs.biz ? "-" + plan.inputs.biz.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : "") + "." + ext; }
  function download(name, text, type) {
    var blob = new Blob([text], { type: type }), a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 800);
  }
  function csv() {
    var q = function (v) { return '"' + String(v == null ? "" : v).replace(/"/g, '""') + '"'; };
    var rows = [["Date", "Day", "Platform", "Format", "Pillar", "Title", "Caption starter", "CTA", "Hashtags", "Key date"]];
    plan.items.forEach(function (it) {
      var d = parse(it.date);
      rows.push([it.date, DAYS[d.getDay()], platLine(it), FMTS[it.fmt], PILLARS[it.pillar], it.title, it.desc, it.cta, it.tags, kdText(it)]);
    });
    return "\uFEFF" + rows.map(function (r) { return r.map(q).join(","); }).join("\r\n") + "\r\n";
  }
  function icsEsc(s) { return String(s).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n"); }
  function fold(line) {
    var out = [], cur = "", n = 0, lim = 75;
    for (var i = 0; i < line.length; i++) {
      var ch = line[i], c = line.charCodeAt(i);
      if (c >= 0xD800 && c <= 0xDBFF && i + 1 < line.length) { ch += line[++i]; }
      var b = unescape(encodeURIComponent(ch)).length;
      if (n + b > lim) { out.push(cur); cur = " "; n = 1; lim = 75; }
      cur += ch; n += b;
    }
    out.push(cur);
    return out.join("\r\n");
  }
  function ics() {
    var stamp = new Date(), st = stamp.getUTCFullYear() + pad(stamp.getUTCMonth() + 1) + pad(stamp.getUTCDate()) + "T" + pad(stamp.getUTCHours()) + pad(stamp.getUTCMinutes()) + "00Z";
    var ev = plan.items.map(function (it, i) {
      var d = parse(it.date), ymd = function (x) { return x.getFullYear() + pad(x.getMonth() + 1) + pad(x.getDate()); };
      var desc = it.desc + "\n\nPlatform: " + platLine(it) + "\nFormat: " + FMTS[it.fmt] + "\nPillar: " + PILLARS[it.pillar] + "\nCall to action: " + it.cta + (it.tags ? "\nHashtags: " + it.tags : "") + (it.kd ? "\nKey date: " + kdText(it) : "") + "\n\nMade with the Crea8Hub 30-Day Content Plan Generator: https://www.crea8hub.com/apps/content-plan-generator/";
      return ["BEGIN:VEVENT", "UID:" + it.date + "-" + i + "-" + it.id + "@crea8hub.com", "DTSTAMP:" + st, "DTSTART;VALUE=DATE:" + ymd(d), "DTEND;VALUE=DATE:" + ymd(addDays(d, 1)),
        fold("SUMMARY:" + icsEsc("[" + FSHORT[it.fmt] + " · " + PLATS[it.plat] + "] " + it.title)), fold("DESCRIPTION:" + icsEsc(desc)), "TRANSP:TRANSPARENT", "END:VEVENT"].join("\r\n");
    });
    return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Crea8Hub//30-Day Content Plan//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH", fold("X-WR-CALNAME:" + icsEsc((plan.inputs.biz ? plan.inputs.biz + " " : "") + "content plan"))].concat(ev).concat(["END:VCALENDAR"]).join("\r\n") + "\r\n";
  }
  function asText() {
    var inp = plan.inputs, by = {}, order = [];
    plan.items.forEach(function (it) { if (!by[it.date]) { by[it.date] = []; order.push(it.date); } by[it.date].push(it); });
    var t = $("planTitle").textContent + "\n" + $("planMeta").textContent + "\nTone: " + TONE_TIPS[inp.tone] + "\n";
    order.forEach(function (d) {
      t += "\n" + fmtDay(d, true) + "\n";
      by[d].forEach(function (it) {
        t += "- [" + FSHORT[it.fmt] + " · " + platLine(it) + "] " + PILLARS[it.pillar] + ": " + it.title + "\n  " + it.desc + "\n  CTA: " + it.cta + (it.tags ? "\n  " + it.tags : "") + (it.kd ? "\n  Key date: " + kdText(it) : "") + "\n";
      });
    });
    return t + "\nMade with the free Crea8Hub 30-Day Content Plan Generator: https://www.crea8hub.com/apps/content-plan-generator/\n";
  }
  function copyText(txt) {
    function fallback() {
      var ta = document.createElement("textarea"); ta.value = txt; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select(); var ok = false; try { ok = document.execCommand("copy"); } catch (e) { ok = false; } ta.remove(); return ok;
    }
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(txt).then(function () { return true; }, function () { return fallback(); });
    return Promise.resolve(fallback());
  }

  /* ---------- events ---------- */
  function validate(inp) {
    var err = "";
    if (!inp.ind) err = "Choose your industry so we can pick the right ideas.";
    else if (!inp.plats.length) err = "Choose at least one platform.";
    else if (!/^\d{4}-\d{2}-\d{2}$/.test(inp.start)) err = "Choose a start date.";
    $("formErr").textContent = err;
    if (err) { var f = !inp.ind ? $("ind") : !inp.plats.length ? form.querySelector('input[name="plat"]') : $("start"); f.focus(); }
    return !err;
  }
  function run(newSeed) {
    var inp = readInputs();
    if (!validate(inp)) return;
    if (plan) snap();
    if (newSeed) seedN = (seedN || 1) + 1 + Math.floor(Math.random() * 1000);
    plan = generate(inp, seedN || 1);
    render(); persist();
    $("shuffleBtn").hidden = false;
    status(newSeed ? "New mix of ideas ready." : "Your plan is ready: " + plan.items.length + " posts.", !!undoSnap);
    return true;
  }
  $("genBtn").addEventListener("click", function () { if (run(false)) $("planner-out").scrollIntoView({ behavior: "smooth", block: "start" }); });
  $("shuffleBtn").addEventListener("click", function () { run(true); });
  form.addEventListener("change", function () { persist(); $("formErr").textContent = ""; });
  form.addEventListener("input", function () { persist(); });
  form.addEventListener("submit", function (e) { e.preventDefault(); });

  document.addEventListener("click", function (e) {
    var t = e.target.closest("button,a"); if (!t) return;
    if (t.id === "undoBtn" && undoSnap) { plan = undoSnap; undoSnap = null; render(); persist(); status("Undone."); return; }
    if (t.hasAttribute("data-view")) { setView(t.getAttribute("data-view")); return; }
    if (t.hasAttribute("data-id") || t.hasAttribute("data-edit")) { var i = find(t.getAttribute("data-id") || t.getAttribute("data-edit")); if (i > -1) openDlg(plan.items[i], false); return; }
    if (t.hasAttribute("data-del")) { var j = find(t.getAttribute("data-del")); if (j > -1) del(j); return; }
    if (t.hasAttribute("data-addkd")) {
      var nm = t.getAttribute("data-addkd"), ev = RAW.filter(function (x) { return x.name === nm; })[0], s0 = suggestion(t.getAttribute("data-date"), "educate");
      if (ev) { s0.title = ev.name + ": " + lowerFirst((ev.ideas[0] || "").replace(/\.$/, "")); s0.desc = "Angle: " + (ev.ideas[1] || ev.ideas[0] || "") + "."; s0.tags = [evTag(ev)].concat(s0.tags.split(" ").slice(0, 2)).join(" "); s0.kd = { name: ev.name, type: ev.type, est: !!ev.est, note: ev.note || "", kind: "day", start: ev.start, end: ev.end || ev.start }; }
      openDlg(s0, true); return;
    }
    if (t.hasAttribute("data-add")) { openDlg(suggestion(t.getAttribute("data-add")), true); return; }
    if (!plan) return;
    if (t.id === "dlCsv") { download(fileName("csv"), csv(), "text/csv;charset=utf-8"); status("Spreadsheet downloaded."); }
    else if (t.id === "dlIcs") { download(fileName("ics"), ics(), "text/calendar;charset=utf-8"); status("Calendar file downloaded. Open it to add the posts to Google or Apple Calendar."); }
    else if (t.id === "printBtn") { var pv = view; setView("list", true); window.print(); setView(pv, true); }
    else if (t.id === "copyBtn") { copyText(asText()).then(function (ok) { status(ok ? "Plan copied as text." : "Couldn't copy. Try the spreadsheet download instead."); }); }
  });
  window.addEventListener("beforeprint", function () { $("listView").hidden = false; });
  window.addEventListener("afterprint", function () { setView(view, true); });

  /* ---------- init ---------- */
  writeInputs(saved.inputs);
  if (!$("start").value) $("start").value = defaultStart();
  if (plan && plan.items && plan.inputs) { $("shuffleBtn").hidden = false; render(); }
  else { plan = null; render(); }
})();
