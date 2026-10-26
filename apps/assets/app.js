(function () {
  "use strict";
  var EVENTS = (window.CAL_EVENTS || []).slice();
  var TYPES = {
    holiday: "Public holiday",
    religious: "Religious",
    commercial: "Shopping & commercial",
    cultural: "Culture & entertainment",
    awareness: "Awareness day",
    sports: "Sports",
    season: "Season",
    civic: "Elections"
  };
  var MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var WA = "https://wa.me/2348060599741?text=";

  function parse(d) { var p = d.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function iso(dt) { return dt.getFullYear() + "-" + pad(dt.getMonth() + 1) + "-" + pad(dt.getDate()); }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function addDays(dt, n) { var x = new Date(dt); x.setDate(x.getDate() + n); return x; }
  function fmt(dt, withDay) { return (withDay ? DAYS[dt.getDay()].slice(0, 3) + " " : "") + dt.getDate() + " " + SHORT[dt.getMonth()] + " " + dt.getFullYear(); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function today() { var t = new Date(); return new Date(t.getFullYear(), t.getMonth(), t.getDate()); }

  EVENTS.forEach(function (e, i) {
    e._i = i;
    e._s = parse(e.start);
    e._e = e.end ? parse(e.end) : e._s;
    e._plan = addDays(e._s, -(e.lead || 21));
  });
  EVENTS.sort(function (a, b) { return a._s - b._s || a.name.localeCompare(b.name); });

  var state = { type: "all", q: "" };
  var listEl = document.getElementById("months");
  var glanceEl = document.getElementById("glance");
  var upEl = document.getElementById("upcoming");
  var countEl = document.getElementById("resultCount");

  function matches(e) {
    if (state.type === "holiday" && !e.holiday) return false;
    if (state.type !== "all" && state.type !== "holiday" && e.type !== state.type) return false;
    if (state.q) {
      var hay = (e.name + " " + (e.ideas || []).join(" ") + " " + (TYPES[e.type] || "")).toLowerCase();
      if (hay.indexOf(state.q) === -1) return false;
    }
    return true;
  }

  function dateLabel(e) {
    if (e.end && e.end !== e.start) {
      var sameMonth = e._s.getMonth() === e._e.getMonth();
      return sameMonth ? e._s.getDate() + "–" + e._e.getDate() + " " + SHORT[e._s.getMonth()]
        : e._s.getDate() + " " + SHORT[e._s.getMonth()] + " – " + e._e.getDate() + " " + SHORT[e._e.getMonth()];
    }
    return DAYS[e._s.getDay()] + ", " + e._s.getDate() + " " + SHORT[e._s.getMonth()];
  }

  function card(e) {
    var t = today();
    var past = e._e < t;
    var chips = '<span class="chip t-' + e.type + '">' + esc(TYPES[e.type] || e.type) + "</span>";
    if (e.holiday && e.type !== "holiday") chips += '<span class="chip t-holiday">Public holiday</span>';
    if (e.est) chips += '<span class="chip est" title="Date depends on moon sighting or an official announcement">Estimated date</span>';
    var ideas = (e.ideas || []).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("");
    var planTxt = e._plan < t && !past ? "Planning window open now" : "Start planning by " + fmt(e._plan, false);
    return '<article class="ev' + (past ? " past" : "") + '" id="ev-' + e._i + '">' +
      '<div class="ev-date"><span class="d">' + e._s.getDate() + '</span><span class="m">' + SHORT[e._s.getMonth()] + "</span></div>" +
      '<div class="ev-body">' +
      '<p class="when">' + esc(dateLabel(e)) + "</p>" +
      "<h3>" + esc(e.name) + "</h3>" +
      '<div class="chips">' + chips + "</div>" +
      (e.note ? '<p class="note">' + esc(e.note) + "</p>" : "") +
      (ideas ? '<details class="ideas"' + (past ? "" : " open") + '><summary>Content ideas</summary><ul>' + ideas + "</ul></details>" : "") +
      '<div class="ev-foot"><span class="plan">' + (past ? "This date has passed" : esc(planTxt)) + "</span>" +
      '<span class="acts"><button class="link" data-ics="' + e._i + '">Add to calendar</button>' +
      '<a class="link" target="_blank" rel="noopener" href="' + WA + encodeURIComponent("Hi Crea8Hub, I'd like help planning a campaign for " + e.name + " (" + fmt(e._s, false) + ").") + '">Plan this with us</a></span></div>' +
      "</div></article>";
  }

  function render() {
    var shown = EVENTS.filter(matches);
    countEl.textContent = shown.length + (shown.length === 1 ? " date" : " dates");
    var groups = {}, order = [];
    shown.forEach(function (e) {
      var k = e._s.getFullYear() + "-" + pad(e._s.getMonth() + 1);
      if (!groups[k]) { groups[k] = []; order.push(k); }
      groups[k].push(e);
    });
    if (!order.length) {
      listEl.innerHTML = '<p class="empty">No dates match that filter. Try another category or clear the search.</p>';
    } else {
      listEl.innerHTML = order.map(function (k) {
        var y = +k.slice(0, 4), m = +k.slice(5) - 1;
        return '<section class="month" id="m-' + k + '"><header><h2>' + MONTHS[m] + ' <span>' + y + "</span></h2>" +
          '<span class="cnt">' + groups[k].length + (groups[k].length === 1 ? " date" : " dates") + "</span></header>" +
          '<div class="evs">' + groups[k].map(card).join("") + "</div></section>";
      }).join("");
    }
    renderGlance();
  }

  function monthKeys() {
    var first = EVENTS[0]._s, last = EVENTS[EVENTS.length - 1]._s, keys = [];
    var d = new Date(first.getFullYear(), first.getMonth(), 1);
    while (d <= last) { keys.push(d.getFullYear() + "-" + pad(d.getMonth() + 1)); d.setMonth(d.getMonth() + 1); }
    return keys;
  }

  function renderGlance() {
    var tk = today(); var cur = tk.getFullYear() + "-" + pad(tk.getMonth() + 1);
    glanceEl.innerHTML = monthKeys().map(function (k) {
      var y = +k.slice(0, 4), m = +k.slice(5) - 1;
      var evs = EVENTS.filter(function (e) { return e._s.getFullYear() === y && e._s.getMonth() === m && matches(e); });
      var hol = evs.filter(function (e) { return e.holiday; }).length;
      var dots = evs.slice(0, 8).map(function (e) { return '<i class="dot t-' + e.type + '"></i>'; }).join("");
      return '<a class="gm' + (k === cur ? " now" : "") + (evs.length ? "" : " none") + '" href="#m-' + k + '">' +
        '<span class="gm-m">' + SHORT[m] + ' <small>' + String(y).slice(2) + "</small></span>" +
        '<span class="gm-n">' + evs.length + "</span>" +
        '<span class="gm-dots">' + dots + "</span>" +
        (hol ? '<span class="gm-h">' + hol + " holiday" + (hol > 1 ? "s" : "") + "</span>" : '<span class="gm-h">&nbsp;</span>') +
        "</a>";
    }).join("");
  }

  function renderUpcoming() {
    var t = today();
    var next = EVENTS.filter(function (e) { return e._e >= t; }).slice(0, 4);
    upEl.innerHTML = next.map(function (e) {
      var days = Math.round((e._s - t) / 864e5);
      var when = days <= 0 ? "Happening now" : days === 1 ? "Tomorrow" : "In " + days + " days";
      return '<a class="up" href="#ev-' + e._i + '"><span class="up-when">' + when + "</span>" +
        "<strong>" + esc(e.name) + "</strong><span class=\"up-date\">" + esc(fmt(e._s, true)) + (e.est ? " (estimated)" : "") + "</span></a>";
    }).join("");
  }

  // .ics export
  function icsEsc(s) { return String(s).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n"); }
  function ymd(dt) { return dt.getFullYear() + pad(dt.getMonth() + 1) + pad(dt.getDate()); }
  function vevent(e) {
    var desc = (TYPES[e.type] || "") + (e.est ? " (estimated date)" : "") + "\n" +
      (e.ideas || []).map(function (x) { return "- " + x; }).join("\n") +
      "\n\nFrom the Nigeria Campaign Calendar by Crea8Hub: https://www.crea8hub.com/apps/campaign-calendar/";
    return ["BEGIN:VEVENT",
      "UID:" + e.start + "-" + e.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "@crea8hub.com",
      "DTSTAMP:" + ymd(new Date()) + "T000000Z",
      "DTSTART;VALUE=DATE:" + ymd(e._s),
      "DTEND;VALUE=DATE:" + ymd(addDays(e._e, 1)),
      "SUMMARY:" + icsEsc(e.name),
      "DESCRIPTION:" + icsEsc(desc),
      "END:VEVENT"].join("\r\n");
  }
  function download(name, events) {
    var body = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Crea8Hub//Nigeria Campaign Calendar//EN", "CALSCALE:GREGORIAN",
      "X-WR-CALNAME:Nigeria Campaign Calendar (Crea8Hub)"].concat(events.map(vevent)).concat(["END:VCALENDAR"]).join("\r\n");
    var blob = new Blob([body], { type: "text/calendar;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  document.addEventListener("click", function (ev) {
    var b = ev.target.closest("[data-ics]");
    if (b) { var e = EVENTS.filter(function (x) { return x._i === +b.getAttribute("data-ics"); })[0]; download(e.name.replace(/[^\w]+/g, "-") + ".ics", [e]); return; }
    var all = ev.target.closest("[data-ics-all]");
    if (all) { ev.preventDefault(); var sel = EVENTS.filter(matches); download("nigeria-campaign-calendar.ics", sel.length ? sel : EVENTS); }
  });

  document.querySelectorAll(".filters button").forEach(function (b) {
    b.addEventListener("click", function () {
      document.querySelectorAll(".filters button").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
      b.setAttribute("aria-pressed", "true");
      state.type = b.getAttribute("data-type");
      render();
    });
  });
  var q = document.getElementById("q");
  q.addEventListener("input", function () { state.q = q.value.trim().toLowerCase(); render(); });

  document.getElementById("evCount").textContent = EVENTS.length;
  document.getElementById("monCount").textContent = monthKeys().length;
  var src = window.CAL_SOURCES || [];
  if (src.length) document.getElementById("sources").innerHTML = "<strong>Sources:</strong> " + src.map(function (x) { return '<a href="' + x[1] + '" target="_blank" rel="noopener">' + esc(x[0]) + "</a>"; }).join(" · ");
  renderUpcoming();
  render();
})();
