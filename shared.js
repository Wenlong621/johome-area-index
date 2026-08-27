window.JHU=(function(){
  var PROTO='https://wenlong621.github.io/johome-ai-prototype/';
  function open(kind,name,city){var u=PROTO+'?open='+encodeURIComponent(kind+':'+name+(city?(':'+city):''));window.open(u,'_blank');}
  function param(k){var m=location.search.match(new RegExp('[?&]'+k+'=([^&]+)'));return m?decodeURIComponent(m[1].replace(/\+/g,' ')):'';}
  function primList(){var seen={},r=[],k;for(k in JH.ZONES){var p=JH.ZONES[k].prim;if(!seen[p]){seen[p]=1;r.push(p);}}return r;}
  function zonesOfCity(c){var r=[],k;for(k in JH.ZONES){if(!c||c==='全部'||JH.ZONES[k].prim===c)r.push(k);}return r;}
  function cityImg(c){return (JH.CX[c]||JH.CX._def||{}).img||'';}
  function esc(s){return (''+s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');}
  function img(src,h){return src?'<img src="'+esc(src)+'" referrerpolicy="no-referrer" loading="lazy" onerror="this.remove()"'+(h?' style="height:'+h+'px"':'')+'/>':'';}
  return {PROTO:PROTO,open:open,param:param,primList:primList,zonesOfCity:zonesOfCity,cityImg:cityImg,esc:esc,img:img};
})();
