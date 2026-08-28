window.JHI=(function(){
  var LANG=(function(){
    try{
      var m=location.search.match(/[?&]lang=(en|zh)/);
      if(m){localStorage.setItem('jh_lang',m[1]);return m[1];}
      return localStorage.getItem('jh_lang')||'zh';
    }catch(e){return 'zh';}
  })();
  var EN=LANG==='en';
  function t(zh,en){return EN?en:zh;}
  function setLang(l){try{localStorage.setItem('jh_lang',l);}catch(e){}var u=location.pathname+location.search.replace(/([?&])lang=(en|zh)/,'$1').replace(/[?&]$/,'');location.href=u;}
  function mountToggle(bar){
    var b=document.createElement('span');
    b.className='langBtn';b.id='langBtn';
    b.textContent=EN?'中文':'EN';
    b.title=EN?'切换到中文':'Switch to English';
    b.onclick=function(){setLang(EN?'zh':'en');};
    bar.appendChild(b);
  }
  var TAG={'都市核心':'Urban core','天车':'SkyTrain','夜生活':'Nightlife','海滨':'Waterfront','高端':'Upscale','公寓':'Condos','公园':'Parks','海滩':'Beaches','文艺':'Artsy','瑜伽有机':'Yoga & organic','学区':'Schools','大学':'University','海景':'Ocean views','名校':'Top schools','豪宅':'Luxury homes','Canada Line':'Canada Line','重建新盘':'Redevelopment','多元烟火':'Diverse & lively','性价比':'Good value','大商场':'Big mall','便利':'Convenient','新城重建':'New town centre','年轻':'Young crowd','天车交汇':'SkyTrain hub','SFU':'SFU','美食':'Food scene','华语服务':'Chinese services','渔村':'Fishing village','家庭':'Family-friendly','独立屋':'Detached homes','安静':'Quiet','SeaBus':'SeaBus','自然':'Nature','森林':'Forest','顶级学区':'Top catchment','高增长':'High growth','商场':'Shopping','Evergreen线':'Evergreen Line','湾畔':'Inlet-side','精酿':'Craft beer','河畔':'Riverside','天车延线':'SkyTrain extension','新盘':'New builds','联排':'Townhomes','海滨小镇':'Seaside town','机场':'Airport','西海岸快线':'West Coast Express','山湖':'Mountains & lakes','度假':'Resort','温泉湖':'Hot springs','河景':'River views','历史':'Historic','多元':'Multicultural','新区':'New community','近天车':'Near SkyTrain'};
  var CTAG={'北岸 · 顶级学区':'North Shore · Top catchments','名校学区 · 含Downtown':'Top catchments · Incl. Downtown','天车沿线 · 进城快':'On SkyTrain · Quick downtown','大商场+天车 · 好学区':'Malls + SkyTrain · Good schools','亚洲美食 · 购物便利':'Asian food · Easy shopping','河景 · 天车 · 性价比':'River views · SkyTrain · Value','山海自然 · 家庭':'Mountains & sea · Family','公园多 · 性价比':'Parks · Good value','海边小镇 · 精酿':'Seaside town · Craft beer','高增长 · 价格友好':'High growth · Affordable','家庭新区 · 更实惠':'New family areas · Affordable','渡轮门户 · 家庭':'Ferry gateway · Family','河谷价格洼地':'Valley value pocket','WCE 通勤火车 · 山城':'West Coast Express · Hillside','河谷小城 · 近温泉':'Valley town · Near hot springs','海岸慢生活 · 渡轮':'Coastal slow living · Ferry','户外之都 · 1h进城':'Outdoor capital · 1h to city','世界级滑雪度假':'World-class ski resort'};
  function money(wan){var w=parseFloat((''+wan).replace(/[^0-9.]/g,''))||0;return EN?('$'+(w/100).toFixed(2)+'M'):('$'+Math.round(w)+'万');}
  function tag(s){return EN?(TAG[s]||s):s;}
  function tags(arr){return (arr||[]).map(tag);}
  function ctag(s){return EN?(CTAG[s]||s):s;}
  return {LANG:LANG,EN:EN,t:t,setLang:setLang,mountToggle:mountToggle,tag:tag,tags:tags,ctag:ctag,money:money};
})();
