// TargetCursor-inspired corner tracking, implemented without a framework.
export function initTargetCursor() {
 const fine=matchMedia('(hover:hover) and (pointer:fine)');
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');
 const ns='http://www.w3.org/2000/svg';
 const svg=document.createElementNS(ns,'svg');
 svg.classList.add('target-cursor');svg.setAttribute('aria-hidden','true');
 const group=document.createElementNS(ns,'g');svg.append(group);
 const paths=Array.from({length:4},()=>{const p=document.createElementNS(ns,'path');group.append(p);return p;});
 document.body.append(svg);
 let pointer={x:0,y:0},current={x:0,y:0,w:28,h:28},raf,visible=false,last=0;
 function hide(){visible=false;svg.style.visibility='hidden';document.documentElement.classList.remove('target-cursor-active');cancelAnimationFrame(raf);raf=null;}
 function frame(now){
  raf=null;if(!visible||document.hidden||!fine.matches||reduced.matches)return hide();
  const el=document.elementFromPoint(pointer.x,pointer.y);
  if(el?.closest('input,textarea,select,[contenteditable="true"],iframe'))return hide();
  const target=el?.closest('a[href],button:not(:disabled),summary,.cursor-target');
  let goal={x:pointer.x,y:pointer.y,w:28,h:28};
  if(target){const r=target.getBoundingClientRect();goal={x:r.x+r.width/2+(pointer.x-r.x-r.width/2)*.035,y:r.y+r.height/2+(pointer.y-r.y-r.height/2)*.035,w:r.width+12,h:r.height+12};}
  const dt=last?Math.min(.05,(now-last)/1000):.016;last=now;
  const follow=1-Math.exp(-dt/.045);
  for(const key of ['x','y','w','h'])current[key]+=(goal[key]-current[key])*follow;
  const {x,y,w,h}=current;const l=x-w/2,r=x+w/2,t=y-h/2,b=y+h/2,k=8;
  const d=[`M${l} ${t+k}V${t}H${l+k}`,`M${r-k} ${t}H${r}V${t+k}`,`M${r} ${b-k}V${b}H${r-k}`,`M${l+k} ${b}H${l}V${b-k}`];
  paths.forEach((path,i)=>path.setAttribute('d',d[i]));
  // Free cursor spins once every two seconds; targets stay square and steady.
  group.setAttribute('transform',target?'':`rotate(${(now%2000)/2000*360} ${x} ${y})`);
  svg.style.visibility='visible';document.documentElement.classList.add('target-cursor-active');
  raf=requestAnimationFrame(frame);
 }
 window.addEventListener('pointermove',event=>{
  if(event.pointerType!=='mouse'||!fine.matches||reduced.matches)return hide();
  pointer={x:event.clientX,y:event.clientY};
  if(!visible){current={...pointer,w:28,h:28};visible=true;last=0;}
  if(!raf)raf=requestAnimationFrame(frame);
 },{passive:true});
 document.documentElement.addEventListener('pointerleave',hide);
 window.addEventListener('blur',hide);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)hide();});
 document.addEventListener('keydown',event=>{if(event.key==='Tab'||event.key==='Escape')hide();});
 fine.addEventListener('change',hide);reduced.addEventListener('change',hide);
 document.addEventListener('pointerdown',()=>svg.classList.add('target-cursor--pressed'));
 document.addEventListener('pointerup',()=>svg.classList.remove('target-cursor--pressed'));
}
