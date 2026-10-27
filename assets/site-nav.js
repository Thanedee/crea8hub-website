(function () {
  var nav = document.querySelector('.sn');
  if (!nav) return;
  var toggle = nav.querySelector('.sn-toggle');
  var dds = nav.querySelectorAll('.sn-dd');
  function closeAll(except) {
    dds.forEach(function (d) {
      if (d !== except) { d.classList.remove('open'); d.querySelector('button').setAttribute('aria-expanded', 'false'); }
    });
  }
  dds.forEach(function (d) {
    var b = d.querySelector('button');
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      var o = !d.classList.contains('open');
      closeAll(d);
      d.classList.toggle('open', o);
      b.setAttribute('aria-expanded', o ? 'true' : 'false');
    });
  });
  function setMenu(o) {
    nav.classList.toggle('menu-open', o);
    toggle.setAttribute('aria-expanded', o ? 'true' : 'false');
    document.documentElement.style.overflow = o ? 'hidden' : '';
  }
  toggle.addEventListener('click', function () { setMenu(!nav.classList.contains('menu-open')); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) { setMenu(false); closeAll(); } });
  document.addEventListener('click', function (e) { if (!nav.contains(e.target)) closeAll(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeAll(); setMenu(false); } });
  window.addEventListener('resize', function () { if (window.innerWidth > 960) setMenu(false); });
})();
