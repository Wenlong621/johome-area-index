window.JHU=(function(){
  var PROTO='https://wenlong621.github.io/johome-ai-prototype/';
  function histKey(k){return 'jh_hist_'+k;}
  function histGet(k){try{var a=JSON.parse(localStorage.getItem(histKey(k))||'[]');return (a instanceof Array)?a:[];}catch(e){return [];}}
  function histPush(k,n,c){try{var a=histGet(k).filter(function(x){return x&&x.n!==n;});a.unshift({n:n,c:c||''});localStorage.setItem(histKey(k),JSON.stringify(a.slice(0,10)));localStorage.removeItem(histKey(k)+'_x');}catch(e){}}
  function histClear(k){try{localStorage.removeItem(histKey(k));localStorage.setItem(histKey(k)+'_x','1');}catch(e){}}
  function histCleared(k){try{return localStorage.getItem(histKey(k)+'_x')==='1';}catch(e){return false;}}
  function open(kind,name,city){histPush(kind,name,city);var u=PROTO+'?open='+encodeURIComponent(kind+':'+name+(city?(':'+city):''));window.open(u,'_blank');}
  function param(k){var m=location.search.match(new RegExp('[?&]'+k+'=([^&]+)'));return m?decodeURIComponent(m[1].replace(/\+/g,' ')):'';}
  function primList(){var seen={},r=[],k;for(k in JH.ZONES){var p=JH.ZONES[k].prim;if(!seen[p]){seen[p]=1;r.push(p);}}return r;}
  function zonesOfCity(c){var r=[],k;for(k in JH.ZONES){if(!c||c==='全部'||JH.ZONES[k].prim===c)r.push(k);}return r;}
  function cityImg(c){return (JH.CX[c]||JH.CX._def||{}).img||'';}
  function esc(s){return (''+s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');}
  function img(src,h){return src?'<img src="'+esc(src)+'" referrerpolicy="no-referrer" loading="lazy" onerror="this.remove()"'+(h?' style="height:'+h+'px"':'')+'/>':'';}
  var HOTC=['Burnaby','Richmond','Vancouver West','Surrey','Coquitlam','West Vancouver'];
  var HOTZ=['Metrotown','Brentwood','Downtown','Kitsilano','Surrey Central','Coquitlam Centre','Kerrisdale / Dunbar','Richmond Centre (Brighouse)'];
  function hotNbs(){return HOTZ.filter(function(z){return JH.ZONES[z];}).map(function(z){return JH.ZONES[z].nbs[0];});}
  var T=window.JHI.t;
  var KLAB={city:T('城市','cities'),zone:T('生活圈','lifestyle zones'),nb:T('社区','neighbourhoods')};
  function bindChips(el){Array.prototype.forEach.call(el.querySelectorAll('.nchip[data-n]'),function(c){c.onclick=function(){open(c.getAttribute('data-k'),c.getAttribute('data-n'),c.getAttribute('data-c'));};});}
  function chipRow(title,extra,items){
    return '<div class="nrow"><div class="nlab">'+title+extra+'</div><div class="nchips">'+items.map(function(it){
      return '<span class="nchip" data-k="'+it.k+'" data-n="'+esc(it.n)+'" data-c="'+esc(it.c||'')+'">'+it.n+'</span>';
    }).join('')+'</div></div>';
  }
  function hotItems(kind){
    if(kind==='city')return HOTC.filter(function(n){return JH.CITYCARD[n];}).map(function(n){return {k:'city',n:n};});
    if(kind==='zone')return HOTZ.filter(function(z){return JH.ZONES[z];}).map(function(z){return {k:'zone',n:z};});
    return HOTZ.filter(function(z){return JH.ZONES[z];}).map(function(z){var p=JH.ZONES[z].nbs[0];return {k:'nb',n:p[0],c:p[1]};});
  }
  function hotNames(el,kind,hidden){
    if(hidden){el.innerHTML='';el.style.display='none';return;}
    el.style.display='block';
    el.innerHTML=chipRow(T('热门'+KLAB[kind],'Popular '+KLAB[kind]),'',hotItems(kind));
    bindChips(el);
  }
  function histRow(el,kind,hidden,onChange){
    var a=histGet(kind);
    if(hidden){el.innerHTML='';el.style.display='none';return;}
    el.style.display='block';
    if(!a.length&&histCleared(kind)){el.innerHTML='';el.style.display='none';return;}
    if(!a.length){el.innerHTML='<div class="nrow"><div class="nlab">'+T('历史搜索','Recently viewed')+'</div><div class="hint">'+T('你点开过的'+KLAB[kind]+'会记录在这里，方便下次快速回到','The '+KLAB[kind]+' you open show up here for quick access')+'</div></div>';return;}
    el.innerHTML=chipRow(T('历史搜索','Recently viewed'),'<span class="nclr" id="histClr">'+T('清除','Clear')+'</span>',a.map(function(x){return {k:kind,n:x.n,c:x.c};}));
    bindChips(el);
    var b=el.querySelector('#histClr');if(b)b.onclick=function(){histClear(kind);if(onChange)onChange();};
  }
  function bigCard(o){
    return '<div class="bcard" data-k="'+o.k+'" data-n="'+esc(o.n)+'" data-c="'+esc(o.c||'')+'">'
      +(o.img?'<div class="bg" style="background-image:url('+esc(o.img)+')"></div>':'')
      +'<div class="cb"><div class="nm">'+o.n+'</div>'
      +(o.sub?'<div class="sub2">'+o.sub+'</div>':'')
      +'<div class="kind">'+o.kind+'</div>'
      +(o.tg?'<div class="tg">'+o.tg+'</div>':'')
      +'<div class="mets"><div class="met"><div class="v">'+o.m1v+'</div><div class="l">'+o.m1l+'</div></div>'
      +'<div class="met"><div class="v">'+o.m2v+'</div><div class="l">'+o.m2l+'</div></div></div>'
      +'<div class="gain">'+T('近一年','Past 12 mo')+' <b>'+o.gain+'</b></div></div></div>';
  }
  function mountSticky(){
    var h=document.querySelector('.hdr'),s=document.getElementById('stick');
    if(!h||!s)return;
    function set(){s.style.top=Math.round(h.getBoundingClientRect().height)+'px';}
    set();window.addEventListener('resize',set);setTimeout(set,300);
  }
  function bindCards(el){Array.prototype.forEach.call(el.querySelectorAll('.bcard[data-n]'),function(c){c.onclick=function(){open(c.getAttribute('data-k'),c.getAttribute('data-n'),c.getAttribute('data-c'));};});}
  return {PROTO:PROTO,open:open,param:param,primList:primList,zonesOfCity:zonesOfCity,cityImg:cityImg,bigCard:bigCard,bindCards:bindCards,mountSticky:mountSticky,esc:esc,img:img,HOTC:HOTC,HOTZ:HOTZ,hotNbs:hotNbs,hotNames:hotNames,histRow:histRow,histGet:histGet,histPush:histPush,histClear:histClear};
})();
