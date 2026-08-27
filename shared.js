window.JHU=(function(){
  var PROTO='https://wenlong621.github.io/johome-ai-prototype/';
  function open(kind,name,city){var u=PROTO+'?open='+encodeURIComponent(kind+':'+name+(city?(':'+city):''));window.open(u,'_blank');}
  function param(k){var m=location.search.match(new RegExp('[?&]'+k+'=([^&]+)'));return m?decodeURIComponent(m[1].replace(/\+/g,' ')):'';}
  function primList(){var seen={},r=[],k;for(k in JH.ZONES){var p=JH.ZONES[k].prim;if(!seen[p]){seen[p]=1;r.push(p);}}return r;}
  function zonesOfCity(c){var r=[],k;for(k in JH.ZONES){if(!c||c==='全部'||JH.ZONES[k].prim===c)r.push(k);}return r;}
  function cityImg(c){return (JH.CX[c]||JH.CX._def||{}).img||'';}
  function esc(s){return (''+s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');}
  function img(src,h){return src?'<img src="'+esc(src)+'" referrerpolicy="no-referrer" loading="lazy" onerror="this.remove()"'+(h?' style="height:'+h+'px"':'')+'/>':'';}
  var HOTC=['Burnaby','Richmond','Vancouver West','Surrey','Coquitlam','West Vancouver'];
  var HOTZ=['Metrotown','Brentwood','Downtown','Kitsilano','Surrey Central','Coquitlam Centre','Kerrisdale / Dunbar','Richmond Centre (Brighouse)'];
  function hotNbs(){return HOTZ.filter(function(z){return JH.ZONES[z];}).map(function(z){return JH.ZONES[z].nbs[0];});}
  function hotStrip(el,kind,hidden){
    if(hidden){el.innerHTML='';el.style.display='none';return;}
    el.className='';el.style.display='block';
    var t,items;
    if(kind==='city'){t='🔥 热门城市';items=HOTC.map(function(n){var a=JH.CITYCARD[n];return {k:'city',n:n,sub:a[1],img:cityImg(n),v:a[2],g:a[4]};});}
    else if(kind==='zone'){t='🔥 热门生活圈';items=HOTZ.filter(function(z){return JH.ZONES[z];}).map(function(z){var s=JH.ZSTATS[z],al=(JH.ZONES[z].alias||'').split('/')[0];return {k:'zone',n:z,sub:(al!==z?al+' · ':'')+JH.ZONES[z].nbs.length+' 个社区',img:cityImg(JH.ZONES[z].prim),v:'$'+s.med+'万',g:'+'+s.gain+'%'};});}
    else{t='🔥 热门社区';items=HOTZ.filter(function(z){return JH.ZONES[z];}).map(function(z){var p=JH.ZONES[z].nbs[0];return {k:'nb',n:p[0],c:p[1],sub:p[1],img:cityImg(JH.ZONES[z].prim),v:'$'+p[2]+'万',g:'+'+p[3]+'%'};});}
    el.innerHTML='<div class="sec" style="margin:2px 2px 8px">'+t+'</div><div class="hstrip">'+items.map(function(it){
      return '<div class="card hcard" data-k="'+it.k+'" data-n="'+esc(it.n)+'" data-c="'+esc(it.c||'')+'">'+img(it.img,58)+'<div class="cb"><div class="nm">'+it.n+'</div><div class="al">'+it.sub+'</div><div class="stats"><span class="v" style="font-size:12px">'+it.v+'</span><span class="g" style="font-size:10px">'+it.g+'</span></div></div></div>';
    }).join('')+'</div>';
    Array.prototype.forEach.call(el.querySelectorAll('.hcard'),function(c){c.onclick=function(){open(c.getAttribute('data-k'),c.getAttribute('data-n'),c.getAttribute('data-c'));};});
  }
  return {PROTO:PROTO,open:open,param:param,primList:primList,zonesOfCity:zonesOfCity,cityImg:cityImg,esc:esc,img:img,HOTC:HOTC,HOTZ:HOTZ,hotNbs:hotNbs,hotStrip:hotStrip};
})();
