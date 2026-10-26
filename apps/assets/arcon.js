(function () {
  "use strict";
  // ---------- checker ----------
  var form = document.getElementById("chk");
  var out = document.getElementById("result");
  var WHERE = { digital: "online or social media", influencer: "an influencer post", tv: "TV or cinema", radio: "radio", print: "print or outdoor", pack: "packaging" };
  var FEE = {
    digital: "about ₦20,000 standard, or ₦100,000 to ₦250,000 to fast-track (reported)",
    influencer: "about ₦20,000 standard, or ₦100,000 to ₦250,000 to fast-track (reported)",
    tv: "₦35,000 standard, or ₦250,000 to ₦600,000 to fast-track",
    radio: "₦35,000 standard, or ₦250,000 to ₦600,000 to fast-track",
    print: "₦35,000 standard, or ₦250,000 to ₦600,000 to fast-track",
    pack: "₦35,000 standard (confirm with ARCON for packaging)"
  };

  function val(name) { var el = form.querySelector('input[name="' + name + '"]:checked'); return el ? el.value : ""; }
  function flags() { return Array.prototype.map.call(form.querySelectorAll('input[name="flag"]:checked'), function (x) { return x.value; }); }

  function update() {
    var kind = val("kind"), where = val("where"), f = flags(), items = [], verdict, cls = "yes";
    if (kind === "exempt") {
      verdict = "Probably not needed";
      cls = "no";
      items.push("ARCON's vetting guidelines exempt job vacancies, public notices, financial statements, obituaries and in-memoriam notices.");
      items.push("If it also promotes a product, service or offer, it becomes an advert and needs approval.");
    } else if (kind === "psa") {
      verdict = "Check with ARCON";
      cls = "no";
      items.push("ARCON has said goodwill messages and public service announcements are exempt.");
      items.push("If your logo, product or an offer is the focus, treat it as an advert and get approval.");
    } else {
      verdict = "Yes, get approval first";
      items.push("Get ARCON approval before your advert runs on " + WHERE[where] + ".");
      items.push("Apply through a registered advertising practitioner, who signs Form 001.");
      items.push("Budget " + FEE[where] + ". Plan for about two weeks.");
      if (where === "influencer") items.push("Get the creator's script or draft approved before it's posted, and label it as paid.");
      if (where === "tv") items.push("Submit the script or storyboard before you shoot, then the final cut.");
      if (where === "radio") items.push("Submit the script first, then the finished jingle.");
      if (kind === "political") items.push("Political adverts need approval on every medium. Media houses have been told to reject them without it.");
      if (kind === "promo") items.push("Promotions and giveaways need separate verification, and higher fees are reported (about ₦1,000,000).");
    }
    if (cls === "yes") {
      if (f.indexOf("nafdac") > -1) items.push("Get NAFDAC approval first and include the certificate.");
      if (f.indexOf("alcohol") > -1) items.push("Alcohol: radio only between 6am and 8pm, TV between 6am and 10pm.");
      if (f.indexOf("finance") > -1) items.push("Financial services: expect checks from the CBN, SEC or NAICOM. Have proof for rates and returns.");
      if (f.indexOf("betting") > -1) items.push("Betting and lottery: involve the National Lottery Regulatory Commission. Reported fee about ₦1,000,000.");
      if (f.indexOf("foreign") > -1) items.push("Foreign models, voices or production are banned by default. You'll need a variation with reasons, and surcharges of ₦2.5m to ₦3m are reported.");
      if (f.indexOf("uniform") > -1) items.push("Police or military uniforms need clearance from those services.");
      if (f.indexOf("ai") > -1) items.push("Get written consent from anyone whose face or voice appears, including AI versions.");
      if (f.indexOf("sme") > -1) items.push("Use the SME window with a SMEDAN or NASME attestation letter (reported fee ₦20,000).");
    }
    out.innerHTML = '<p class="verdict ' + cls + '">' + verdict + "</p><ul>" + items.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>" +
      '<p class="small">Based on public information as of October 2026. Confirm with ARCON before you rely on it.</p>' +
      '<p style="margin-top:16px"><a class="btn small" target="_blank" rel="noopener" href="https://wa.me/2348060599741?text=' +
      encodeURIComponent("Hi Crea8Hub, I need help with ARCON approval for an advert on " + (WHERE[where] || "") + ".") + '">Ask us about this</a></p>';
  }
  form.addEventListener("change", update);
  update();

  // ---------- checklist ----------
  var KEY = "crea8hub-arcon-checklist";
  var boxes = document.querySelectorAll("#cl input[type=checkbox]");
  var saved = {};
  try { saved = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { saved = {}; }
  var tips = ["Start with the advert itself.", "Good start. Keep going.", "Halfway there.", "Nearly ready to submit.", "All done. You're ready to submit."];
  function progress() {
    var done = 0;
    boxes.forEach(function (b) { if (b.checked) done++; });
    var pct = Math.round(done / boxes.length * 100);
    document.getElementById("pct").textContent = pct + "%";
    document.getElementById("barFill").style.width = pct + "%";
    var tip = done === boxes.length ? tips[4] : done === 0 ? tips[0] : pct >= 75 ? tips[3] : pct >= 45 ? tips[2] : tips[1];
    document.getElementById("pctText").textContent = done + " of " + boxes.length + " done. " + tip;
  }
  boxes.forEach(function (b) {
    b.checked = !!saved[b.getAttribute("data-k")];
    b.addEventListener("change", function () {
      saved[b.getAttribute("data-k")] = b.checked;
      try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch (e) {}
      progress();
    });
  });
  document.getElementById("reset").addEventListener("click", function () {
    boxes.forEach(function (b) { b.checked = false; });
    saved = {};
    try { localStorage.removeItem(KEY); } catch (e) {}
    progress();
  });
  progress();
})();
