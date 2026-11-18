'use client';

import {useCallback,useEffect,useLayoutEffect,useMemo,useRef,useState} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {ArrowDown,ArrowRight,ArrowUpRight,Lightbulb,Compass,PenTool,Camera,Send} from 'lucide-react';
import {AnimatePresence,motion,useMotionValue,useReducedMotion,useSpring} from 'framer-motion';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useGSAP} from '@gsap/react';
import {worlds as fallbackWorlds,projects as fallbackProjects} from '@/lib/content';

gsap.registerPlugin(ScrollTrigger,useGSAP);

type Slide={label:string;src?:string;videoUrl?:string;position?:string};
const defaultSlides:Slide[]=[
 {label:'Wedding celebration',src:'/maison-frames-hero.png'},
 {label:'Fashion & model photography',src:'/maison-frames-editorial-sheet.png',position:'sprite:1:0'},
 {label:'Luxury car delivery',src:'/maison-frames-editorial-sheet.png',position:'sprite:2:0'},
 {label:'Product commercial',src:'/maison-frames-editorial-sheet.png',position:'sprite:3:1'},
 {label:'Event production',src:'/maison-frames-editorial-sheet.png',position:'sprite:2:1'}
];

export function ArtImage({src,alt,position,className,loading='lazy',fetchPriority}:{src:string;alt:string;position?:string;className?:string;loading?:'eager'|'lazy';fetchPriority?:'high'|'low'|'auto'}){
 const ref=useRef<HTMLImageElement>(null);const spriteRef=useRef<HTMLSpanElement>(null);
 const match=position?.match(/^sprite:(\d):(\d)$/);
 useLayoutEffect(()=>{if(!match)return;const tile=spriteRef.current,host=tile?.parentElement;if(!tile||!host)return;const update=()=>{const box=host.getBoundingClientRect();if(!box.width||!box.height)return;const scale=Math.max(box.width/362,box.height/256),imageWidth=1448*scale,imageHeight=1024*scale,cropX=Math.max(0,(362*scale-box.width)/2),cropY=Math.max(0,(256*scale-box.height)/2),left=-Number(match[1])*362*scale-cropX,top=-Number(match[2])*256*scale-cropY;tile.style.backgroundSize=`${imageWidth/box.width*100}% ${imageHeight/box.height*100}%`;tile.style.backgroundPosition=`${imageWidth===box.width?0:left/(box.width-imageWidth)*100}% ${imageHeight===box.height?0:top/(box.height-imageHeight)*100}%`};update();const observer=new ResizeObserver(update);observer.observe(host);return()=>observer.disconnect()},[match?.[0]]);
 if(match)return <span ref={spriteRef} className={`art-sprite${className?` ${className}`:''}`} role={alt?'img':undefined} aria-label={alt||undefined} aria-hidden={alt?undefined:true} style={{backgroundImage:`url(${src})`,backgroundSize:'400% 400%',backgroundPosition:`${Number(match[1])*100/3}% ${Number(match[2])*100/3}%`}}/>;
 return <img ref={ref} className={className} src={src} alt={alt} loading={loading} fetchPriority={fetchPriority} style={{objectPosition:position||'center'}}/>;
}

export function ScrollProgressIndicator(){const ref=useRef<HTMLDivElement>(null);useGSAP(()=>{gsap.set(ref.current,{scaleX:0,transformOrigin:'left center'});gsap.to(ref.current,{scaleX:1,ease:'none',scrollTrigger:{trigger:document.documentElement,start:'top top',end:'bottom bottom',scrub:.2}})});return <div ref={ref} className="scroll-progress" aria-hidden="true"/>}
export const ScrollProgress=ScrollProgressIndicator;

export function ScrollReveal({children,className='',as='div',delay=0,direction='up'}:{children:React.ReactNode;className?:string;as?:'div'|'section'|'p';delay?:number;direction?:'up'|'left'|'right'}){const ref=useRef<HTMLElement>(null);useGSAP(()=>{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const el=ref.current;if(!el)return;const from=direction==='left'?{x:-28}:direction==='right'?{x:28}:{y:30};gsap.fromTo(el,{autoAlpha:0,...from},{autoAlpha:1,x:0,y:0,duration:.9,delay,ease:'power3.out',clearProps:'transform,opacity,visibility',scrollTrigger:{trigger:el,start:'top 88%',once:true}})},{scope:ref});const Tag=as as any;return <Tag ref={ref} className={className}>{children}</Tag>}

export function MagneticButton({href,children,className=''}:{href:string;children:React.ReactNode;className?:string}){const reduce=useReducedMotion();const px=useMotionValue(0),py=useMotionValue(0);const x=useSpring(px,{stiffness:180,damping:18}),y=useSpring(py,{stiffness:180,damping:18});const Anchor:any=href.startsWith('#')?'a':Link;return <motion.div className="magnetic-wrap" style={{x:reduce?0:x,y:reduce?0:y}} onPointerMove={e=>{if(reduce||!window.matchMedia('(pointer:fine)').matches)return;const r=e.currentTarget.getBoundingClientRect();px.set((e.clientX-r.left-r.width/2)*.12);py.set((e.clientY-r.top-r.height/2)*.15)}} onPointerLeave={()=>{px.set(0);py.set(0)}}><Anchor href={href} className={className}>{children}</Anchor></motion.div>}

export function CinematicHeroReveal({settingsSlides=[],headline,description}:{settingsSlides?:Slide[];headline?:string;description?:string}){
 const slides=useMemo(()=>settingsSlides.filter(s=>s.src||s.videoUrl).length?settingsSlides.filter(s=>s.src||s.videoUrl):defaultSlides,[settingsSlides]);
 const headingLines=useMemo(()=>{if(!headline?.trim())return null;const explicit=headline.split(/\n+/).map(line=>line.trim()).filter(Boolean);if(explicit.length>1)return explicit;const words=explicit[0].split(/\s+/),mid=Math.ceil(words.length/2);return[words.slice(0,mid).join(' '),words.slice(mid).join(' ')].filter(Boolean)},[headline]);
 const root=useRef<HTMLElement>(null),indexRef=useRef(0);const [index,setIndex]=useState(0);const reduced=useReducedMotion();
 useGSAP(()=>{
  const scenes=gsap.utils.toArray<HTMLElement>('.cinema-scene',root.current);if(!scenes.length)return;
  if(reduced){gsap.set(scenes,{autoAlpha:0});gsap.set(scenes[index],{autoAlpha:1});indexRef.current=index;return}
  gsap.set(scenes,{autoAlpha:0,scale:1.04,clipPath:'inset(0 0 0 100%)'});
  gsap.set(scenes[0],{autoAlpha:1,scale:1,clipPath:'inset(0 0 0 0)'});
  if(index===0){gsap.fromTo('.hero-kicker',{autoAlpha:0,y:14},{autoAlpha:1,y:0,duration:.7,delay:.18,ease:'power2.out'});gsap.fromTo('.cinema-heading span',{yPercent:115},{yPercent:0,duration:1,stagger:.16,delay:.25,ease:'power4.out',clearProps:'transform'});gsap.fromTo(['.cinema-support','.hero-actions','.hero-script'],{autoAlpha:0,y:15},{autoAlpha:1,y:0,duration:.8,stagger:.12,delay:.65,ease:'power3.out'});}
  if(indexRef.current!==index){const old=scenes[indexRef.current],next=scenes[index];const tl=gsap.timeline();tl.set(next,{autoAlpha:1,scale:1.04,clipPath:'inset(0 0 0 100%)'}).to(old,{clipPath:'inset(0 100% 0 0)',scale:1.015,duration:1.15,ease:'power2.inOut'},0).to(old,{autoAlpha:0,duration:.18},.92).to(next,{clipPath:'inset(0 0% 0 0)',scale:1,duration:1.25,ease:'power3.inOut'},.12);}
  gsap.to(scenes,{yPercent:7,ease:'none',scrollTrigger:{trigger:root.current,start:'top top',end:'bottom top',scrub:.5}});
  gsap.to('.hero-script',{x:14,y:-25,ease:'none',scrollTrigger:{trigger:root.current,start:'top top',end:'bottom top',scrub:.7}});
  indexRef.current=index;ScrollTrigger.refresh();
 },{scope:root,dependencies:[index,reduced],revertOnUpdate:true});
 useEffect(()=>{if(reduced||slides.length<2)return;const timer=window.setInterval(()=>setIndex(i=>(i+1)%slides.length),6200);return()=>window.clearInterval(timer)},[reduced,slides.length]);
 useEffect(()=>{const videos=root.current?.querySelectorAll('video');if(!videos)return;videos.forEach((video,i)=>{if(i===index&&!reduced)video.play().catch(()=>{});else video.pause()})},[index,reduced]);
 const change=useCallback(()=>setIndex(i=>(i+1)%slides.length),[slides.length]);
 return <section ref={root} className="hero hero-cinema">
  {slides.map((scene,i)=><div className="cinema-scene" key={`${scene.label}-${i}`} role="img" aria-label={scene.label} style={scene.src&&!scene.position?.startsWith('sprite:')?{backgroundImage:`url(${scene.src})`}:{}}>{scene.position?.startsWith('sprite:')&&scene.src&&<ArtImage src={scene.src} alt="" position={scene.position} loading={i===0?'eager':'lazy'}/>}{scene.videoUrl&&<video src={scene.videoUrl} poster={scene.src} autoPlay muted loop playsInline preload={i===0?'metadata':'none'}/>}</div>)}
  <div className="cinema-shade"/><div className="hero-film-grain"/>
  <div className="hero-copy"><div className="hero-kicker"><span className="rule"/> Maison Frames · Creative production <span className="rule"/></div><h1 className="cinema-heading">{headingLines?headingLines.map((line,i)=><span key={i}>{line}</span>):<><span>WE CREATE</span><span>VISUAL <i>STORIES.</i></span></>}</h1><p className="cinema-support">{description||'Photography, films and creative production for people, brands, celebrations and everything worth remembering.'}</p><div className="hero-actions"><MagneticButton href="/work" className="button light">Explore our work <ArrowUpRight size={14}/></MagneticButton><MagneticButton href="#contact" className="text-link light-link">Start a project <ArrowRight size={15}/></MagneticButton></div><div className="hero-script">Beyond the ordinary.</div></div>
  <div className="hero-bottom"><span>Weddings · Events · Brands · People</span><span className="scene-label"><span className="scene-pulse"/>{slides[index]?.label}</span><span className="hero-count">{String(index+1).padStart(2,'0')} <i>/</i> {String(slides.length).padStart(2,'0')}</span><button className="hero-next" onClick={change} aria-label="Show next hero scene"><ArrowRight size={15}/></button></div><a className="scroll-prompt" href="#introduction"><span>Scroll to discover</span><ArrowDown size={13}/></a>
 </section>
}
export const CinematicHero=CinematicHeroReveal;

export function SplitTextReveal({lines,className=''}:{lines:string[];className?:string}){const ref=useRef<HTMLHeadingElement>(null);useGSAP(()=>{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const words=gsap.utils.toArray<HTMLElement>('.split-word',ref.current);gsap.fromTo(words,{yPercent:115,autoAlpha:.25},{yPercent:0,autoAlpha:1,duration:.8,stagger:.055,ease:'power3.out',clearProps:'transform,opacity,visibility',scrollTrigger:{trigger:ref.current,start:'top 82%',once:true}})},{scope:ref});return <h2 ref={ref} className={`split-heading ${className}`} aria-label={lines.join(' ')}>{lines.map((line,i)=><span className="split-line" key={i} aria-hidden="true">{line.split(' ').map((word,j)=><span className="split-word" key={`${word}-${j}`}>{word}{j<line.split(' ').length-1?'\u00a0':''}</span>)}</span>)}</h2>}

export function WordByWordReveal({text,className=''}:{text:string;className?:string}){const ref=useRef<HTMLHeadingElement>(null);const words=text.split(' ');useGSAP(()=>{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;gsap.fromTo('.word-reveal-item',{yPercent:120,autoAlpha:.2},{yPercent:0,autoAlpha:1,duration:.75,stagger:.065,ease:'power3.out',clearProps:'transform,opacity,visibility',scrollTrigger:{trigger:ref.current,start:'top 82%',once:true}})},{scope:ref});return <h2 ref={ref} className={`word-reveal ${className}`} aria-label={text}>{words.map((word,i)=><span className="word-reveal-mask" aria-hidden="true" key={`${word}-${i}`}><span className="word-reveal-item">{word}</span>{i<words.length-1?' ':''}</span>)}</h2>}

export function ImageClipReveal({src,alt,className='',position='center',priority=false}:{src:string;alt:string;className?:string;position?:string;priority?:boolean}){const ref=useRef<HTMLDivElement>(null);useGSAP(()=>{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const image=ref.current?.querySelector('img,.art-sprite'),wipe=ref.current?.querySelector('.mask-wipe');if(!image||!wipe)return;gsap.fromTo(image,{scale:1.11},{scale:1,duration:1.45,ease:'power3.out',clearProps:'transform',scrollTrigger:{trigger:ref.current,start:'top 88%',once:true}});gsap.fromTo(wipe,{clipPath:'inset(0 0 0 0)'},{clipPath:'inset(0 0 100% 0)',duration:1.1,delay:.08,ease:'power3.inOut',scrollTrigger:{trigger:ref.current,start:'top 88%',once:true}})},{scope:ref});return <div ref={ref} className={`mask-frame ${className}`}><ArtImage src={src} alt={alt} position={position} loading={priority?'eager':'lazy'} fetchPriority={priority?'high':undefined}/><span className="mask-wipe" aria-hidden="true"/></div>}
export const ImageMaskReveal=ImageClipReveal;

export function ProjectImageTransition({src,alt,videoUrl,position}:{src:string;alt:string;videoUrl?:string;position?:string}){const ref=useRef<HTMLSpanElement>(null),video=useRef<HTMLVideoElement>(null);const[hovered,setHovered]=useState(false);useGSAP(()=>{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const img=ref.current?.querySelector('img,.art-sprite');if(!img)return;gsap.fromTo(img,{clipPath:'inset(0 0 100% 0)',scale:1.06},{clipPath:'inset(0 0 0% 0)',scale:1,duration:1.1,ease:'power3.out',clearProps:'clip-path,transform',scrollTrigger:{trigger:ref.current,start:'top 92%',once:true}})},{scope:ref});useEffect(()=>{if(!video.current)return;if(hovered&&window.matchMedia('(pointer:fine)').matches){video.current.play().catch(()=>{})}else{video.current.pause();video.current.currentTime=0}},[hovered]);return <span ref={ref} className="project-image" onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}><ArtImage loading="lazy" src={src} alt={alt} position={position}/>{videoUrl&&<video ref={video} className="project-hover-video" src={videoUrl} muted loop playsInline preload="none"/>}<span className="project-open"><ArrowUpRight size={17}/></span></span>}

export function ParallaxImage({src,alt,className='',position}:{src:string;alt:string;className?:string;position?:string}){const ref=useRef<HTMLDivElement>(null);useGSAP(()=>{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const img=ref.current?.querySelector('img,.art-sprite');if(!img)return;gsap.fromTo(img,{yPercent:-8},{yPercent:8,ease:'none',scrollTrigger:{trigger:ref.current,start:'top bottom',end:'bottom top',scrub:.5}})},{scope:ref});return <div ref={ref} className={`parallax-frame ${className}`}><ArtImage src={src} alt={alt} position={position} loading="lazy"/></div>}

export type World={name:string;subtitle:string;note:string;craft:string;frame:string;src:string;position?:string;href?:string};
export function PinnedStorySection({items=fallbackWorlds}:{items?:World[]}){
 const root=useRef<HTMLElement>(null);const safeItems=items.slice(0,8);
 useGSAP(()=>{
  const mm=gsap.matchMedia();
  mm.add('(min-width: 761px) and (prefers-reduced-motion: no-preference)',()=>{
   const panels=gsap.utils.toArray<HTMLElement>('.chapter-copy',root.current);
   const images=gsap.utils.toArray<HTMLElement>('.chapter-image',root.current);
   const layers=images.map(image=>image.querySelector<HTMLElement>('img,.art-sprite')).filter(Boolean) as HTMLElement[];
   const imageLabels=images.map(image=>gsap.utils.toArray<HTMLElement>('.chapter-image-index,.chapter-image-reticle,figcaption',image));
   const progress=gsap.utils.toArray<HTMLElement>('.chapter-progress-fill',root.current);
   const marks=gsap.utils.toArray<HTMLElement>('.chapter-mark',root.current);
   const revealLines=panels.map(panel=>gsap.utils.toArray<HTMLElement>('.chapter-reveal',panel));
   gsap.set(panels,{autoAlpha:0});gsap.set(panels[0],{autoAlpha:1});
   gsap.set(images,{autoAlpha:0,clipPath:'inset(0 0 0 0)'});gsap.set(images[0],{autoAlpha:1});
   gsap.set(layers,{scale:1.14,xPercent:2,yPercent:-1});gsap.set(layers[0],{scale:1.025,xPercent:0,yPercent:0});
   gsap.set(imageLabels.flat(),{autoAlpha:0,y:8});gsap.set(imageLabels[0],{autoAlpha:1,y:0});
   gsap.set(revealLines.flat(),{autoAlpha:0,y:22,clipPath:'inset(0 0 100% 0)'});
   gsap.fromTo(revealLines[0],{autoAlpha:0,y:22,clipPath:'inset(0 0 100% 0)'},{autoAlpha:1,y:0,clipPath:'inset(0)',duration:.76,stagger:.09,ease:'power3.out',clearProps:'all',scrollTrigger:{trigger:root.current,start:'top 76%',once:true}});
   gsap.set(progress,{scaleX:0,transformOrigin:'left center'});gsap.set(progress[0],{scaleX:1});
   const tones=['#513229','#42332d','#49372d','#51402e','#3f342e','#443a31','#513229','#48352d'];let lastTone=0;
   const tl=gsap.timeline({scrollTrigger:{trigger:root.current,pin:'.pinned-story-inner',pinSpacing:true,start:'top top',end:'+='+safeItems.length*112+'%',scrub:.72,anticipatePin:1,invalidateOnRefresh:true,onUpdate(self){const active=Math.min(safeItems.length-1,Math.floor(self.progress*(safeItems.length-1)+.5));root.current?.setAttribute('data-active',String(active));marks.forEach((mark,index)=>mark.classList.toggle('is-active',index===active));const counter=root.current?.querySelector('.chapter-progress-current');if(counter)counter.textContent=String(active+1).padStart(2,'0');if(active!==lastTone&&root.current){gsap.to(root.current,{backgroundColor:tones[active],duration:.45,ease:'none',overwrite:true});lastTone=active;}}}});
   for(let i=1;i<safeItems.length;i++){
    const at=i-1;
    tl.to(images[i-1],{clipPath:'inset(0 100% 0 0)',autoAlpha:.2,duration:.82,ease:'power2.inOut'},at)
      .to(layers[i-1],{scale:1.15,xPercent:3,yPercent:-2,duration:.82,ease:'power2.inOut'},at)
      .fromTo(images[i],{autoAlpha:0,clipPath:'inset(0 0 0 100%)'},{autoAlpha:1,clipPath:'inset(0)',duration:.9,ease:'power3.inOut'},at+.08)
      .fromTo(layers[i],{scale:1.15,xPercent:-2,yPercent:2},{scale:1,xPercent:0,yPercent:0,duration:1,ease:'power3.out'},at+.08)
      .to(revealLines[i-1],{autoAlpha:0,y:-18,clipPath:'inset(0 0 100% 0)',duration:.23,stagger:.025,ease:'power2.in'},at)
      .to(imageLabels[i-1],{autoAlpha:0,y:-6,duration:.18,stagger:.025,ease:'power2.in'},at)
      .set(panels[i],{autoAlpha:1},at+.24)
      .fromTo(revealLines[i],{autoAlpha:0,y:25,clipPath:'inset(0 0 100% 0)'},{autoAlpha:1,y:0,clipPath:'inset(0)',duration:.42,stagger:.065,ease:'power3.out'},at+.27)
      .fromTo(imageLabels[i],{autoAlpha:0,y:9},{autoAlpha:1,y:0,duration:.28,stagger:.04,ease:'power3.out'},at+.34)
      .to(panels[i-1],{autoAlpha:0,duration:.05},at+.6)
      .to(progress[i-1],{scaleX:0,duration:.38,ease:'power2.inOut'},at+.05)
      .to(progress[i],{scaleX:1,duration:.44,ease:'power2.out'},at+.2);
   }
   return()=>{tl.scrollTrigger?.kill();tl.kill()};
  });
  return()=>mm.revert();
 },{scope:root,dependencies:[safeItems.length]});
 const linkTo=(item:World)=>item.href||('/services/'+item.name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''));
 return <section id="creative-universe" ref={root} className="pinned-story" data-active="0">
  <div className="pinned-story-inner">
   <div className="pinned-story-heading"><ScrollReveal className="eyebrow">03 / Our creative universe</ScrollReveal><div className="chapter-overline"><span className="chapter-progress-current">01</span><span className="chapter-total"> / 08</span><span className="chapter-overline-rule"/><span>Scroll to move through the studio</span><span className="chapter-scroll-arrow">↓</span></div></div>
   <div className="pinned-story-stage">
    <div className="pinned-story-copy">{safeItems.map((item,i)=><article className="chapter-copy" key={item.name} aria-live="polite">
     <div className="chapter-kicker chapter-reveal"><span className="chapter-index">{String(i+1).padStart(2,'0')} <i>/ {String(safeItems.length).padStart(2,'0')}</i></span><span className="chapter-kicker-rule"/><span>Creative world</span></div>
     <h2 className="chapter-reveal"><span className="chapter-title-main">{item.name}</span><em>{item.subtitle}</em></h2>
     <p className="chapter-note chapter-reveal">{item.note}</p>
     <div className="chapter-craft chapter-reveal"><span>In the frame</span><span className="chapter-craft-rule"/><strong>{item.craft}</strong></div>
     <Link href={linkTo(item)} className="text-link chapter-link chapter-reveal">Explore {item.name} <ArrowUpRight size={14}/></Link>
    </article>)}</div>
    <div className="pinned-story-media">{safeItems.map((item,i)=><figure className="chapter-image" key={item.name+'-image'}>
     <ArtImage src={item.src} alt={item.name+' — '+item.frame} loading={i===0?'eager':'lazy'} position={item.position}/>
     <span className="chapter-image-wash" aria-hidden="true"/><span className="chapter-image-film" aria-hidden="true"/>
     <span className="chapter-image-index"><b>{String(i+1).padStart(2,'0')}</b><i> / 08</i></span>
     <span className="chapter-image-reticle" aria-hidden="true"><i/><i/><i/><i/></span>
     <figcaption><span>Field note <i>—</i> {String(i+1).padStart(2,'0')}</span><strong>{item.frame}</strong></figcaption>
    </figure>)}</div>
   </div>
   <div className="chapter-progress" aria-label="Story chapter progress">{safeItems.map((item,i)=><span className={'chapter-mark '+(i===0?'is-active':'')} key={item.name} aria-label={item.name}><i className="chapter-progress-fill"/></span>)}</div>
   <div className="chapter-footer-note"><span>One studio, many points of view.</span><span>People · objects · places · stories</span></div>
  </div>
  <div className="mobile-story-list">{safeItems.map((item,i)=><article className="mobile-story-card" key={'mobile-'+item.name}>
   <div className="mobile-story-image"><ArtImage src={item.src} alt={item.name+' — '+item.frame} loading="lazy" position={item.position}/><span>{String(i+1).padStart(2,'0')} <i>/ 08</i></span><span className="mobile-story-frame">{item.frame}</span></div>
   <div className="mobile-story-copy"><div className="eyebrow">Creative world · {String(i+1).padStart(2,'0')}</div><h3>{item.name}<em>{item.subtitle}</em></h3><p>{item.note}</p><div className="mobile-story-craft"><span>In the frame</span><strong>{item.craft}</strong></div><Link className="text-link" href={linkTo(item)}>Explore {item.name} <ArrowUpRight size={14}/></Link></div>
  </article>)}</div>
 </section>
}


export function HorizontalScrollGallery({items}:{items?:{title:string;note:string;src:string;position?:string}[]}){
 const reduced=useReducedMotion();
 const IconList=[Lightbulb,Compass,PenTool,Camera,Send];
 const fallback=[
  {title:'Imagine',subhead:'Start with what matters.',note:'We listen for the feeling, purpose and people behind your brief, then find the question that gives the whole story direction.',src:fallbackProjects[7].src,position:'sprite:0:3'},
  {title:'Conceptualize',subhead:'Give the idea a point of view.',note:'Together we shape the visual language: references, mood, location and the small details that make the work unmistakably yours.',src:fallbackProjects[7].src,position:'sprite:1:2'},
  {title:'Create',subhead:'Build the world around it.',note:'We bring the right crew, craft and production plan together so every decision on set serves one clear creative idea.',src:fallbackProjects[9].src,position:'sprite:3:3'},
  {title:'Capture',subhead:'Leave room for the real moment.',note:'With a considered plan in place, we stay attentive and adaptable—making photographs and films with energy, intention and feeling.',src:fallbackProjects[2].src,position:'sprite:1:3'},
  {title:'Deliver',subhead:'Make the story ready to live with.',note:'We edit, refine and prepare each final frame for the places it needs to go, then hand it back with care and clarity.',src:fallbackProjects[7].src,position:'sprite:3:1'}
 ];
 const data=items?.length?items.map(item=>({...item,subhead:fallback.find(step=>step.title===item.title)?.subhead||'A considered step in the story.',note:fallback.find(step=>step.title===item.title)?.note||item.note})):fallback;
 return <section className="process-section"><div className="process-viewport"><header className="process-heading"><div><div className="eyebrow">06 / The creative process</div><SplitTextReveal lines={['Ideas become','experiences.']} /><p className="process-intro">A thoughtful process gives every good story room to become its best version.</p></div><span>01 — {String(data.length).padStart(2,'0')} <i>·</i> The journey</span></header>
  <div className="process-track">{data.map((item,i)=>{const Icon=IconList[i%IconList.length];return <motion.article className="process-step" key={`${item.title}-${i}`} initial={reduced?false:{opacity:0,y:32}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.35}} transition={{duration:reduced?0:.7,delay:reduced?0:i*.08,ease:[.22,.72,.2,1]}}>
   <div className="process-step-node"><span className="process-step-icon"><motion.span initial={reduced?false:{scale:.55,rotate:-24,opacity:.3}} whileInView={{scale:1,rotate:0,opacity:1}} viewport={{once:true,amount:.6}} transition={{type:'spring',stiffness:190,damping:15,delay:reduced?0:i*.08+.08}} whileHover={reduced?undefined:{rotate:12,scale:1.13}}><Icon size={24} strokeWidth={1.45}/></motion.span><i aria-hidden="true"/></span><span className="process-step-number">STEP {String(i+1).padStart(2,'0')}</span></div>
   {i<data.length-1&&<motion.span className="process-connector-segment" initial={reduced?false:{scaleX:0}} whileInView={{scaleX:1}} viewport={{once:true,amount:.55}} transition={{duration:reduced?0:.9,delay:reduced?0:i*.08+.2,ease:[.22,.72,.2,1]}} aria-hidden="true"><i/></motion.span>}
   <div className="process-step-copy"><span className="process-step-kicker">THE {String(i+1).padStart(2,'0')} / {String(data.length).padStart(2,'0')} MOMENT</span><h3>{item.title}</h3><h4>{item.subhead}</h4><p>{item.note}</p></div><span className="process-step-aside">{['LISTEN','DEFINE','MAKE','NOTICE','REFINE'][i%5]} <ArrowUpRight size={13}/></span>
  </motion.article>})}</div>
  <div className="process-bottomline"><span>One clear idea. Carefully carried through.</span><span>MAISON FRAMES <i>·</i> PHOTOGRAPHY / FILM / PRODUCTION</span></div>
 </div></section>
}

export function StaggeredGridReveal({children,className=''}:{children:React.ReactNode;className?:string}){const ref=useRef<HTMLDivElement>(null);useGSAP(()=>{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const children=gsap.utils.toArray<HTMLElement>('[data-stagger-child]',ref.current);gsap.fromTo(children,{autoAlpha:.45,y:46,clipPath:'inset(0 0 100% 0)'},{autoAlpha:1,y:0,clipPath:'inset(0)',duration:1,stagger:.1,ease:'power3.inOut',clearProps:'transform,opacity,visibility,clip-path',scrollTrigger:{trigger:ref.current,start:'top 82%',once:true}})},{scope:ref});return <div ref={ref} className={className}>{children}</div>}

export function ServiceWorldMosaic({items}:{items:{name:string;description:string;category:string;src:string;href:string;position?:string}[]}){return <StaggeredGridReveal className="service-mosaic">{items.map((item,i)=><div data-stagger-child className={'service-world service-world-'+(i+1)} key={item.name+'-'+i} onPointerMove={event=>{if(event.pointerType!=='mouse')return;const bounds=event.currentTarget.getBoundingClientRect();event.currentTarget.style.setProperty('--image-shift-x',(((event.clientX-bounds.left)/bounds.width-.5)*10)+'px');event.currentTarget.style.setProperty('--image-shift-y',(((event.clientY-bounds.top)/bounds.height-.5)*10)+'px')}} onPointerLeave={event=>{event.currentTarget.style.setProperty('--image-shift-x','0px');event.currentTarget.style.setProperty('--image-shift-y','0px')}}><Link href={item.href} className="service-world-link" aria-label={item.name+': '+item.description}><span className="service-world-image"><ArtImage src={item.src} alt={item.name+' visual story'} position={item.position} loading={i<3?'eager':'lazy'} fetchPriority={i===0?'high':undefined}/></span><span className="service-world-grain" aria-hidden="true"/><span className="service-world-index" aria-hidden="true">{String(i+1).padStart(2,'0')}</span><span className="service-world-corners" aria-hidden="true"><i/><i/><i/><i/></span><span className="service-world-copy"><span className="service-world-no">{String(i+1).padStart(2,'0')} <i>/</i> {item.category}</span><span className="service-world-title">{item.name}</span><span className="service-world-description">{item.description}</span><span className="service-world-arrow"><ArrowUpRight size={18}/></span></span><span className="service-world-rail" aria-hidden="true"/></Link></div>)}</StaggeredGridReveal>}

export function BehindTheFrame(){return <section className="behind-section"><div className="wrap behind-layout"><div className="behind-images"><ImageClipReveal src={fallbackProjects[7].src} position="sprite:1:3" alt="Camera crew filming on location" className="behind-camera"/><ParallaxImage src={fallbackProjects[7].src} position="sprite:3:3" alt="Creative team collaborating on a campaign" className="behind-detail"/><span className="behind-stamp">Made by people<br/>who care about the frame.</span></div><div className="behind-copy"><ScrollReveal className="eyebrow">07 / Behind the frame · People before pixels</ScrollReveal><WordByWordReveal text="Considered from first idea to final frame."/><p>Every production starts with listening. We shape a point of view, build the right crew around it, then stay curious on set. The craft lives in the choices you feel but may never see: the light, the timing, the detail left in.</p><div className="process-list"><div><span>01</span><strong>Listen closely</strong><small>Purpose, people, place.</small></div><div><span>02</span><strong>Make with intent</strong><small>Art direction through final cut.</small></div><div><span>03</span><strong>Give the story back</strong><small>Images made to be lived with.</small></div></div><MagneticButton href="/services" className="text-link">How we work <ArrowRight size={14}/></MagneticButton></div></div></section>}

export function PageTransition({children}:{children:React.ReactNode}){const pathname=usePathname();const root=useRef<HTMLDivElement>(null),curtain=useRef<HTMLDivElement>(null),lastPath=useRef(pathname);useGSAP(()=>{const content=root.current?.firstElementChild;if(!content)return;const changed=lastPath.current!==pathname;lastPath.current=pathname;if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;if(changed&&curtain.current){gsap.set(curtain.current,{scaleY:1,transformOrigin:'top'});gsap.to(curtain.current,{scaleY:0,duration:.78,ease:'power4.inOut',clearProps:'transform'});}gsap.fromTo(content,{autoAlpha:0,y:changed?8:12},{autoAlpha:1,y:0,duration:changed ? .72 : .6,ease:'power3.out',clearProps:'all'});},{scope:root,dependencies:[pathname],revertOnUpdate:true});return <><div ref={curtain} className="page-transition-curtain" aria-hidden="true"/><div ref={root} className="page-transition-content">{children}</div></>}
export const SmoothPageTransition=PageTransition;

export function CustomCursor(){const reduce=useReducedMotion();const x=useMotionValue(-100),y=useMotionValue(-100);const springX=useSpring(x,{stiffness:350,damping:32}),springY=useSpring(y,{stiffness:350,damping:32});useEffect(()=>{if(reduce||!window.matchMedia('(pointer:fine)').matches)return;const move=(e:PointerEvent)=>{x.set(e.clientX);y.set(e.clientY)};window.addEventListener('pointermove',move,{passive:true});return()=>window.removeEventListener('pointermove',move)},[reduce,x,y]);if(reduce)return null;return <motion.div className="custom-cursor" style={{x:springX,y:springY}} aria-hidden="true"><span/></motion.div>}
