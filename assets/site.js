(function(){
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function cleanUrl(){ if(location.hash){ try{history.replaceState(null,'',location.pathname+location.search);}catch(e){} } }
  function scrollToId(id){
    var t=id?document.getElementById(id):null;
    if(!t||id==='topo'){ window.scrollTo({top:0,behavior:reduce?'auto':'smooth'}); return; }
    var y=t.getBoundingClientRect().top+window.pageYOffset-90;
    window.scrollTo({top:y,behavior:reduce?'auto':'smooth'});
  }
  // links to sections on this page: scroll without adding #section to the address
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(e){ e.preventDefault(); scrollToId(a.getAttribute('href').slice(1)); cleanUrl(); });
  });
  // arriving from another page with /#section: scroll there, then clean the address
  if(location.hash){
    var id=location.hash.slice(1);
    window.addEventListener('load',function(){ setTimeout(function(){ scrollToId(id); cleanUrl(); },60); });
  }
  // soft light that follows the pointer on cards
  document.querySelectorAll('.card').forEach(function(c){
    c.addEventListener('pointermove',function(e){ var r=c.getBoundingClientRect(); c.style.setProperty('--mx',(e.clientX-r.left)+'px'); c.style.setProperty('--my',(e.clientY-r.top)+'px'); });
  });
})();
