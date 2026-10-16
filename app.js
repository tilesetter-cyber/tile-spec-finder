const $=id=>document.getElementById(id);
if($('tile'))Promise.all([fetch('data.json').then(r=>r.json()),fetch('results.json').then(r=>r.json())]).then(([D,R])=>{
[['tile','tiles'],['sub','substrates'],['loc','locations']].forEach(([id,k])=>{$(id).innerHTML=Object.entries(D[k]).map(([v,o])=>`<option value="${v}">${o.n}</option>`).join('');$(id).onchange=go});
const q=new URLSearchParams(location.search);['tile','sub','loc'].forEach(k=>q.get(k)&&($(k).value=q.get(k)));
function go(){const k=`${$('tile').value}-${$('sub').value}-${$('loc').value}`;$('out').innerHTML=R[k];history.replaceState(null,'',`?tile=${$('tile').value}&sub=${$('sub').value}&loc=${$('loc').value}`)}go()});

// GoatCounter: track Amazon outbound clicks (non-blocking)
document.addEventListener('click',function(e){
  try{
    var a=e.target&&e.target.closest?e.target.closest('a[href]'):null;
    if(!a||!/(^|\.)amazon\.com$/i.test(a.hostname))return;
    if(!window.goatcounter||!window.goatcounter.count)return;
    var t=(a.textContent||'').trim();
    var slug=t.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,80)||'link';
    window.goatcounter.count({path:'amazon-click/'+slug,title:t,event:true});
  }catch(err){}
},true);
