(function(){
  var w=document.getElementById('navApps'), b=document.getElementById('navAppsBtn');
  if(!w||!b) return;
  function set(o){ w.classList.toggle('open',o); b.setAttribute('aria-expanded',o?'true':'false'); }
  b.addEventListener('click',function(e){ e.stopPropagation(); set(!w.classList.contains('open')); });
  document.addEventListener('click',function(e){ if(!w.contains(e.target)) set(false); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape'){ set(false); b.focus(); } });
})();
