/* Crea8Hub WhatsApp Link & QR Code Generator. Runs fully in the browser. */
(function(){
  'use strict';
  var $ = function(id){ return document.getElementById(id); };
  var KEY = 'c8h-wa-link-v1';

  // min/max = national number length (without country code). trunk = domestic prefix to strip.
  var COUNTRIES = [
    {iso:'NG', name:'Nigeria',        dial:'234', min:10, max:10, trunk:'0', start:/^[789]/, eg:'0803 123 4567'},
    {iso:'GH', name:'Ghana',          dial:'233', min:9,  max:9,  trunk:'0', eg:'024 123 4567'},
    {iso:'KE', name:'Kenya',          dial:'254', min:9,  max:9,  trunk:'0', eg:'0712 345678'},
    {iso:'ZA', name:'South Africa',   dial:'27',  min:9,  max:9,  trunk:'0', eg:'082 123 4567'},
    {iso:'GB', name:'United Kingdom', dial:'44',  min:10, max:10, trunk:'0', eg:'07700 900123'},
    {iso:'US', name:'United States',  dial:'1',   min:10, max:10, trunk:'',  eg:'(201) 555-0123'},
    {iso:'CA', name:'Canada',         dial:'1',   min:10, max:10, trunk:'',  eg:'(416) 555-0123'},
    {iso:'AE', name:'UAE',            dial:'971', min:8,  max:9,  trunk:'0', eg:'050 123 4567'},
    {iso:'CM', name:'Cameroon',       dial:'237', min:9,  max:9,  trunk:'',  eg:'6 71 23 45 67'},
    {iso:'BJ', name:'Benin',          dial:'229', min:8,  max:10, trunk:'',  eg:'01 90 01 12 34'},
    {iso:'TG', name:'Togo',           dial:'228', min:8,  max:8,  trunk:'',  eg:'90 11 22 33'},
    {iso:'CI', name:"Côte d'Ivoire",  dial:'225', min:10, max:10, trunk:'',  eg:'07 01 23 45 67'},
    {iso:'SN', name:'Senegal',        dial:'221', min:9,  max:9,  trunk:'',  eg:'77 123 45 67'},
    {iso:'RW', name:'Rwanda',         dial:'250', min:9,  max:9,  trunk:'0', eg:'078 123 4567'},
    {iso:'EG', name:'Egypt',          dial:'20',  min:10, max:10, trunk:'0', eg:'010 1234 5678'}
  ];
  var TEMPLATES = [
    ["I'd like to place an order", "Hi, I'd like to place an order."],
    ["Is this still available?", "Hi, is this still available?"],
    ["Book an appointment", "Hi, I'd like to book an appointment. What times do you have free?"],
    ["Question about pricing", "Hi, I have a question about pricing."],
    ["I saw your ad on Instagram", "Hi, I saw your ad on Instagram and I'd like to know more."]
  ];
  var COLOURS = {black:'#000000', green:'#3F7A08'};

  var el = {
    cc:$('cc'), phone:$('phone'), phoneField:$('phoneField'), fb:$('phoneFb'),
    tpls:$('tpls'), msg:$('msg'), count:$('msgCount'), addLink:$('addLink'), pageWrap:$('pageLinkWrap'), page:$('pageLink'),
    biz:$('biz'), out:$('linkOut'), copy:$('copyLink'), test:$('testLink'), share:$('shareLink'), copied:$('copied'),
    canvas:$('qr'), qrEmpty:$('qrEmpty'), labelOn:$('qrLabelOn'), label:$('qrLabel'), png:$('dlPng'), svg:$('dlSvg'),
    card:$('cardPreview'), print:$('printCard'), printBtn:$('printBtn'),
    snippet:$('snippet'), copySnip:$('copySnippet'), copied2:$('copied2'), preview:$('preview'), reset:$('resetBtn')
  };
  if(!el.cc || !el.phone) return;

  var state = {link:'', digits:'', valid:false, qr:null};

  /* ---------- setup ---------- */
  COUNTRIES.forEach(function(c){
    var o = document.createElement('option');
    o.value = c.iso; o.textContent = c.name + ' (+' + c.dial + ')';
    el.cc.appendChild(o);
  });
  TEMPLATES.forEach(function(t){
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'chipbtn'; b.textContent = t[0]; b.dataset.msg = t[1];
    b.setAttribute('aria-pressed','false');
    b.addEventListener('click', function(){ el.msg.value = t[1]; update(); el.msg.focus(); });
    el.tpls.appendChild(b);
  });

  function country(){ for(var i=0;i<COUNTRIES.length;i++) if(COUNTRIES[i].iso===el.cc.value) return COUNTRIES[i]; return COUNTRIES[0]; }

  /* ---------- phone normalising ---------- */
  // Returns {national, switchTo} where switchTo is an ISO code if the user typed another country's +code.
  function normalise(raw, c){
    var s = String(raw||'').replace(/\s/g,'');
    var d = s.replace(/\D/g,'');
    var switchTo = null;
    if(/^(\+|00)/.test(s)){
      if(s.charAt(0)!=='+') d = d.slice(2);
      if(d.indexOf(c.dial)!==0){
        var best = null;
        COUNTRIES.forEach(function(k){ if(d.indexOf(k.dial)===0 && (!best || k.dial.length>best.dial.length)) best = k; });
        if(!best) return {national:d, unknown:true, c:c};
        switchTo = best.iso; c = best;
      }
      d = d.slice(c.dial.length);
    } else if(d.indexOf(c.dial)===0){
      // country code typed without "+", e.g. 2348031234567 or 23408031234567
      var rest = d.length - c.dial.length;
      if(rest >= c.min && rest <= c.max + c.trunk.length) d = d.slice(c.dial.length);
    }
    // drop the domestic trunk prefix, e.g. 0803... or +234 (0)803...
    if(c.trunk && d.indexOf(c.trunk)===0) d = d.slice(c.trunk.length);
    return {national:d, switchTo:switchTo, c:c};
  }

  function check(){
    var c = country();
    var raw = el.phone.value;
    var r = normalise(raw, c);
    if(r.switchTo && r.c.dial !== c.dial){ el.cc.value = r.switchTo; c = r.c; el.phone.placeholder = c.eg; }
    var n = r.national || '';
    var msg = '', cls = '', valid = false;
    if(!raw.trim()){
      msg = 'Type your number the way you normally would, for example ' + c.eg + '. We\'ll format it for you.';
    } else if(r.unknown){
      msg = 'We don\'t recognise that country code. Pick your country from the list and type the number without it.'; cls = 'err';
    } else if(/[a-z]/i.test(raw)){
      msg = 'Use numbers only.'; cls = 'err';
    } else if(n.length < c.min){
      msg = 'Too short: ' + n.length + ' of ' + c.min + ' digits after +' + c.dial + '. Keep typing.'; cls = 'warn';
    } else if(n.length > c.max){
      msg = 'Too long: ' + c.name + ' numbers have ' + (c.min===c.max ? c.max : c.min + ' to ' + c.max) + ' digits after +' + c.dial + '. Check for an extra digit.'; cls = 'err';
    } else if(c.start && !c.start.test(n)){
      msg = c.name + ' mobile numbers start with 07, 08 or 09 (7, 8 or 9 after +' + c.dial + '). Check the number.'; cls = 'err';
    } else {
      valid = true; cls = 'ok';
      msg = 'Looks good: ' + pretty(c, n) + '. Make sure this number is on WhatsApp.';
    }
    el.fb.textContent = msg;
    el.fb.className = 'fb' + (cls ? ' ' + cls : '');
    el.phoneField.className = 'field' + (raw.trim() ? (valid ? ' good' : (cls==='warn' ? '' : ' bad')) : '');
    el.phone.setAttribute('aria-invalid', raw.trim() && !valid && cls!=='warn' ? 'true' : 'false');
    state.valid = valid;
    state.digits = valid ? c.dial + n : '';
    state.pretty = valid ? pretty(c, n) : '';
  }

  function pretty(c, n){
    var g;
    if(c.iso==='NG') g = [n.slice(0,3), n.slice(3,6), n.slice(6)];
    else if(c.dial==='1') g = [n.slice(0,3), n.slice(3,6), n.slice(6)];
    else if(n.length===9) g = [n.slice(0,2), n.slice(2,5), n.slice(5)];
    else if(n.length===10) g = [n.slice(0,3), n.slice(3,6), n.slice(6)];
    else g = [n.slice(0,2), n.slice(2,5), n.slice(5)];
    return '+' + c.dial + ' ' + g.filter(Boolean).join(' ');
  }

  /* ---------- message ---------- */
  function message(){
    var m = el.msg.value.replace(/\r\n/g,'\n').trim();
    if(el.addLink.checked){
      var p = el.page.value.trim();
      if(p){
        if(!/^[a-z][a-z0-9+.-]*:\/\//i.test(p)) p = 'https://' + p;
        m = m ? m + '\n' + p : p;
      }
    }
    return m;
  }

  /* ---------- QR ---------- */
  function makeQR(text){
    var qr = qrcode(0, 'M');
    qr.addData(text, 'Byte');
    qr.make();
    return qr;
  }
  function qrPath(qr){
    var n = qr.getModuleCount(), d = '';
    for(var r=0;r<n;r++){
      var c=0;
      while(c<n){
        if(qr.isDark(r,c)){ var s=c; while(c<n && qr.isDark(r,c)) c++; d += 'M'+s+' '+r+'h'+(c-s)+'v1h-'+(c-s)+'z'; }
        else c++;
      }
    }
    return d;
  }
  function colour(){ var r = document.querySelector('input[name="qrCol"]:checked'); return COLOURS[r ? r.value : 'black']; }
  function labelText(){ return el.labelOn.checked ? el.label.value.trim() : ''; }

  function drawCanvas(){
    var cv = el.canvas, qr = state.qr;
    if(!qr){ cv.hidden = true; el.qrEmpty.hidden = false; return; }
    var n = qr.getModuleCount(), quiet = 4, cell = Math.max(8, Math.ceil(640 / (n + quiet*2)));
    var size = cell * (n + quiet*2), lab = labelText(), labH = lab ? Math.round(size*0.13) : 0;
    cv.width = size; cv.height = size + labH;
    var x = cv.getContext('2d');
    x.fillStyle = '#ffffff'; x.fillRect(0,0,cv.width,cv.height);
    x.fillStyle = colour();
    for(var r=0;r<n;r++) for(var c=0;c<n;c++) if(qr.isDark(r,c)) x.fillRect((c+quiet)*cell,(r+quiet)*cell,cell,cell);
    if(lab){
      var fs = Math.round(size*0.055);
      x.font = '800 ' + fs + 'px Raleway, "Helvetica Neue", Arial, sans-serif';
      while(x.measureText(lab).width > size*0.9 && fs > 10){ fs--; x.font = '800 ' + fs + 'px Raleway, "Helvetica Neue", Arial, sans-serif'; }
      x.textAlign = 'center'; x.textBaseline = 'middle';
      x.fillText(lab, size/2, size - cell*1.2 + labH/2);
    }
    cv.hidden = false; el.qrEmpty.hidden = true;
  }

  function svgString(opts){
    opts = opts || {};
    var qr = state.qr, n = qr.getModuleCount(), q = 4, s = n + q*2;
    var lab = opts.noLabel ? '' : labelText(), labH = lab ? s*0.13 : 0;
    var h = s + labH;
    var out = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + s + ' ' + fmt(h) + '"' + (opts.size ? ' width="'+opts.size+'" height="'+fmt(opts.size*h/s)+'"' : '') + ' shape-rendering="crispEdges">' +
      '<rect width="' + s + '" height="' + fmt(h) + '" fill="#ffffff"/>' +
      '<path transform="translate(' + q + ' ' + q + ')" fill="' + (opts.colour || colour()) + '" d="' + qrPath(qr) + '"/>';
    if(lab){
      out += '<text x="' + fmt(s/2) + '" y="' + fmt(s - 1.2 + labH/2) + '" text-anchor="middle" dominant-baseline="middle" font-family="Raleway, Helvetica Neue, Arial, sans-serif" font-weight="800" font-size="' + fmt(s*0.055) + '" fill="' + colour() + '">' + esc(lab) + '</text>';
    }
    return out + '</svg>';
  }
  function fmt(v){ return String(Math.round(v*100)/100); }
  function esc(t){ return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

  function fileBase(){ return 'whatsapp-qr-' + (state.digits || 'code'); }
  function download(blob, name){
    var a = document.createElement('a');
    var url = URL.createObjectURL(blob);
    a.href = url; a.download = name; document.body.appendChild(a); a.click();
    setTimeout(function(){ URL.revokeObjectURL(url); a.remove(); }, 1500);
  }

  /* ---------- counter card ---------- */
  function renderCard(){
    var biz = el.biz.value.trim();
    var html = '<div style="width:100%"><div class="pc-bar"></div><div class="pc-biz">' + esc(biz || 'Your business') + '</div><div class="pc-cta">Chat with us on WhatsApp</div></div>';
    if(state.qr) html += '<div class="pc-qr">' + svgString({noLabel:true, colour:'#000000'}) + '</div>';
    else html += '<div class="pc-qr" style="aspect-ratio:1;border:1px dashed #ccc;border-radius:6px"></div>';
    html += '<div><div class="pc-num">' + esc(state.pretty || '+234 803 123 4567') + '</div><div class="pc-how">Open your phone camera, point it at the code and tap the link.</div></div>';
    el.card.innerHTML = html;
    el.print.innerHTML = html;
  }

  /* ---------- chat button snippet ---------- */
  var WA_PATH = 'M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2 7L3 29l6.4-2c2 1.1 4.3 1.7 6.6 1.7 7.2 0 13-5.7 13-12.8S23.2 3 16 3zm0 23.4c-2.1 0-4.1-.6-5.9-1.7l-.4-.3-3.8 1.2 1.2-3.7-.3-.4c-1.2-1.8-1.9-3.9-1.9-6.1C4.9 9.8 9.9 4.9 16 4.9s11.1 4.9 11.1 10.9S22.1 26.4 16 26.4zm6.1-8.1c-.3-.2-2-1-2.3-1.1-.3-.1-.5-.2-.8.2-.2.3-.9 1.1-1.1 1.3-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.7-1.7-1-.9-1.7-2-1.9-2.3-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6l-1.1-2.6c-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.3 1.4 3.5c.2.2 2.4 3.7 5.9 5.1.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 2-.8 2.3-1.6.3-.8.3-1.5.2-1.6-.1-.2-.3-.3-.7-.4z';
  function snippet(link){
    return '<!-- WhatsApp chat button -->\n' +
      '<a href="' + esc(link) + '" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp"\n' +
      '   style="position:fixed;right:20px;bottom:20px;z-index:9999;display:flex;align-items:center;gap:8px;' +
      'background:#25D366;color:#fff;border-radius:999px;padding:12px 18px 12px 14px;font:700 15px/1 Arial,sans-serif;' +
      'text-decoration:none;box-shadow:0 8px 24px rgba(0,0,0,.25)">\n' +
      '  <svg width="26" height="26" viewBox="0 0 32 32" fill="#fff" aria-hidden="true"><path d="' + WA_PATH + '"/></svg>\n' +
      '  <span>Chat with us</span>\n' +
      '</a>';
  }
  var lastPreview = '';
  function renderSnippet(){
    var link = state.link || 'https://wa.me/2348031234567';
    var code = snippet(link);
    el.snippet.value = state.link ? code : '<!-- Enter a valid number above to get your code -->';
    var doc = '<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{margin:0;font:13px Arial,sans-serif;background:#fff;color:#999;height:100vh}' +
      '.l{height:10px;border-radius:5px;background:#eee;margin:14px 16px}.l.s{width:45%}</style></head><body><div class="l"></div><div class="l s"></div><div class="l"></div><div class="l s"></div>' + code + '</body></html>';
    if(doc !== lastPreview){ el.preview.srcdoc = doc; lastPreview = doc; }
  }

  /* ---------- main update ---------- */
  function update(){
    check();
    var m = message();
    el.count.textContent = el.msg.value.length + ' / 1000';
    el.pageWrap.hidden = !el.addLink.checked;
    Array.prototype.forEach.call(el.tpls.children, function(b){ b.setAttribute('aria-pressed', el.msg.value.trim() === b.dataset.msg ? 'true' : 'false'); });

    if(state.valid){
      state.link = 'https://wa.me/' + state.digits + (m ? '?text=' + encodeURIComponent(m) : '');
      el.out.textContent = state.link; el.out.classList.remove('empty');
      el.test.href = state.link; el.test.removeAttribute('aria-disabled'); el.test.removeAttribute('tabindex');
      try { state.qr = makeQR(state.link); } catch(e){ state.qr = null; }
    } else {
      state.link = ''; state.qr = null;
      el.out.textContent = 'Enter a valid number to get your link.'; el.out.classList.add('empty');
      el.test.href = 'https://wa.me/'; el.test.setAttribute('aria-disabled','true'); el.test.setAttribute('tabindex','-1');
    }
    [el.copy, el.share, el.png, el.svg, el.printBtn, el.copySnip].forEach(function(b){ b.disabled = !state.link || (b===el.png||b===el.svg||b===el.printBtn) && !state.qr; });
    el.label.disabled = !el.labelOn.checked;
    drawCanvas();
    renderCard();
    renderSnippet();
    save();
  }

  /* ---------- storage ---------- */
  function save(){
    try {
      localStorage.setItem(KEY, JSON.stringify({
        cc:el.cc.value, phone:el.phone.value, msg:el.msg.value, addLink:el.addLink.checked, page:el.page.value,
        biz:el.biz.value, col:(document.querySelector('input[name="qrCol"]:checked')||{}).value, labelOn:el.labelOn.checked, label:el.label.value
      }));
    } catch(e){}
  }
  function load(){
    var d = null;
    try { d = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch(e){}
    if(!d) return;
    if(d.cc && COUNTRIES.some(function(c){ return c.iso===d.cc; })) el.cc.value = d.cc;
    if(typeof d.phone==='string') el.phone.value = d.phone;
    if(typeof d.msg==='string') el.msg.value = d.msg;
    el.addLink.checked = !!d.addLink;
    if(typeof d.page==='string') el.page.value = d.page;
    if(typeof d.biz==='string') el.biz.value = d.biz;
    if(d.col){ var r = document.querySelector('input[name="qrCol"][value="' + (d.col==='green'?'green':'black') + '"]'); if(r) r.checked = true; }
    if(typeof d.labelOn==='boolean') el.labelOn.checked = d.labelOn;
    if(typeof d.label==='string' && d.label) el.label.value = d.label;
  }

  /* ---------- copy ---------- */
  function copyText(text, status){
    function done(ok){
      status.textContent = ok ? 'Copied' : 'Press Ctrl+C to copy';
      clearTimeout(status._t); status._t = setTimeout(function(){ status.textContent = ''; }, 2500);
    }
    function fallback(){
      var t = document.createElement('textarea');
      t.value = text; t.setAttribute('readonly',''); t.style.position='fixed'; t.style.opacity='0';
      document.body.appendChild(t); t.select();
      var ok = false; try { ok = document.execCommand('copy'); } catch(e){}
      t.remove(); done(ok);
    }
    if(navigator.clipboard && window.isSecureContext){
      navigator.clipboard.writeText(text).then(function(){ done(true); }, fallback);
    } else fallback();
  }

  /* ---------- events ---------- */
  ['input','change'].forEach(function(ev){
    [el.phone, el.msg, el.page, el.biz, el.label, el.addLink, el.labelOn].forEach(function(i){ i.addEventListener(ev, update); });
  });
  el.cc.addEventListener('change', function(){
    // a manual country choice wins over a +code typed earlier: keep only the local part
    if(/^\s*(\+|00)/.test(el.phone.value)){ var r = normalise(el.phone.value, country()); if(r.c && r.c.dial !== country().dial) el.phone.value = r.national; }
    el.phone.placeholder = country().eg; update();
  });
  Array.prototype.forEach.call(document.querySelectorAll('input[name="qrCol"]'), function(r){ r.addEventListener('change', update); });
  el.phone.addEventListener('blur', function(){
    // tidy the field into a readable national format once it is valid
    if(state.valid){ var c = country(); var n = state.digits.slice(c.dial.length); var p = (c.trunk || '') + n;
      if(c.iso==='NG') p = p.slice(0,4)+' '+p.slice(4,7)+' '+p.slice(7);
      el.phone.value = p; save(); }
  });
  el.copy.addEventListener('click', function(){ if(state.link) copyText(state.link, el.copied); });
  el.copySnip.addEventListener('click', function(){ if(state.link) copyText(el.snippet.value, el.copied2); });
  el.test.addEventListener('click', function(e){ if(!state.link) e.preventDefault(); });
  el.share.addEventListener('click', function(){
    if(!state.link) return;
    var data = {title:'Chat with us on WhatsApp', text:(el.biz.value.trim() ? el.biz.value.trim() + ': ' : '') + 'Chat with us on WhatsApp', url:state.link};
    if(navigator.share){ navigator.share(data).catch(function(){}); }
    else { copyText(state.link, el.copied); el.copied.textContent = 'Sharing not supported here, so we copied the link'; }
  });
  el.png.addEventListener('click', function(){
    if(!state.qr) return;
    drawCanvas();
    if(el.canvas.toBlob) el.canvas.toBlob(function(b){ if(b) download(b, fileBase() + '.png'); }, 'image/png');
    else { var a=document.createElement('a'); a.href=el.canvas.toDataURL('image/png'); a.download=fileBase()+'.png'; a.click(); }
  });
  el.svg.addEventListener('click', function(){
    if(!state.qr) return;
    download(new Blob(['<?xml version="1.0" encoding="UTF-8"?>\n' + svgString({size:1024})], {type:'image/svg+xml'}), fileBase() + '.svg');
  });
  el.printBtn.addEventListener('click', function(){ if(state.qr){ renderCard(); window.print(); } });
  el.reset.addEventListener('click', function(){
    el.cc.value = 'NG'; el.phone.value = ''; el.msg.value = ''; el.addLink.checked = false; el.page.value = ''; el.biz.value = '';
    document.querySelector('input[name="qrCol"][value="black"]').checked = true;
    el.labelOn.checked = true; el.label.value = 'Scan to chat on WhatsApp';
    try { localStorage.removeItem(KEY); } catch(e){}
    update(); el.phone.focus();
  });

  el.cc.value = 'NG';
  load();
  el.phone.placeholder = country().eg;
  update();
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(drawCanvas);
  if(document.fonts && document.fonts.load) document.fonts.load('800 20px Raleway').then(drawCanvas, function(){});

  window.C8HWA = {normalise:function(raw, iso){ var c=COUNTRIES.filter(function(k){return k.iso===(iso||'NG');})[0]; return normalise(raw,c); }};
})();
