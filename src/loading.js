// Percentage reflects completed essential resource groups, never a fake timer.
export function initLoading(preference) {
 const loader=document.querySelector('.arrival');
 if(!loader)return;
 if(preference.matches){loader.remove();return;}
 const start=performance.now(),hero=document.querySelector('.hero-surface');
 const progress=loader.querySelector('.arrival__progress'),number=loader.querySelector('.arrival__percent');
 let closed=false,target=0,shown=0,raf,readyTimer;
 const finished=new Set();
 loader.hidden=false;
 const observer=new MutationObserver(checkHero);
 observer.observe(hero,{attributes:true,attributeFilter:['data-media-state']});
 const timeout=setTimeout(()=>dismiss(),1800);
 function dismiss(immediate=false){
  if(closed)return;closed=true;
  observer.disconnect();clearTimeout(timeout);clearTimeout(readyTimer);cancelAnimationFrame(raf);
  document.removeEventListener('focusin',focus);document.removeEventListener('keydown',key);preference.removeEventListener('change',changed);
  if(immediate||preference.matches){loader.remove();return;}
  loader.classList.add('arrival--leaving');loader.setAttribute('aria-hidden','true');
  setTimeout(()=>loader.remove(),420);
 }
 function tick(){
  shown+=(target-shown)*.18;
  if(Math.abs(target-shown)<.3)shown=target;
  number.textContent=Math.round(shown);
  if(shown<target)raf=requestAnimationFrame(tick);else raf=null;
 }
 function done(name){
  if(closed||finished.has(name))return;
  finished.add(name);target=Math.round(finished.size/3*100);
  progress.setAttribute('aria-valuenow',target);
  if(!raf)raf=requestAnimationFrame(tick);
  if(finished.size===3)readyTimer=setTimeout(()=>dismiss(),Math.max(280,1000-(performance.now()-start)));
 }
 function checkHero(){if(['ready','error'].includes(hero.dataset.mediaState))done('hero');}
 function focus(event){if(!loader.contains(event.target))dismiss(true);}
 function key(event){if(event.key==='Escape')dismiss(true);}
 function changed(){if(preference.matches)dismiss(true);}
 document.addEventListener('focusin',focus);document.addEventListener('keydown',key);preference.addEventListener('change',changed);
 document.fonts.ready.then(()=>done('fonts'));
 const logo=loader.querySelector('img');
 if(logo.complete)done('logo');else{logo.addEventListener('load',()=>done('logo'),{once:true});logo.addEventListener('error',()=>done('logo'),{once:true});}
 checkHero();
}
