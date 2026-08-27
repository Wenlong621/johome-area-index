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
  function hotRow(el,self,onToggle,active){
    var L=[['city','🔥 热门城市','cities.html?hot=1'],['nb','🔥 热门社区','communities.html?hot=1'],['zone','🔥 热门生活圈','zones.html?hot=1']];
    el.innerHTML=L.map(function(x){
      if(x[0]===self)return '<span class="chip fire'+(active?' on':'')+'" id="hotSelf">'+x[1]+'</span>';
      return '<a class="chip fire" href="'+x[2]+'">'+x[1]+'</a>';
    }).join('');
    document.getElementById('hotSelf').onclick=onToggle;
  }
  return {PROTO:PROTO,open:open,param:param,primList:primList,zonesOfCity:zonesOfCity,cityImg:cityImg,esc:esc,img:img,HOTC:HOTC,HOTZ:HOTZ,hotNbs:hotNbs,hotRow:hotRow};
})();
