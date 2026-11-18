'use client';
import {useCallback,useEffect,useMemo,useRef,useState} from 'react';
import {AnimatePresence,motion,useReducedMotion} from 'framer-motion';
import {X,ArrowLeft,ArrowRight,ArrowUpRight} from 'lucide-react';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {categories,projects as demo} from '@/lib/content';
import {ArtImage,ProjectImageTransition} from '@/components/creative-experience';

type Project={title:string;category:string;location?:string;place?:string;src:string;position?:string;imageUrls?:string[];videoUrl?:string;description?:string;layout?:string};
const categoryAliases:Record<string,string[]>={
 'Weddings':['weddings','wedding','wedding photography & films','wedding content creation'],
 'Couple reels':['couple reels','pre-wedding stories'],
 'Events':['events','event'], 'Automotive':['automotive','cars','car delivery'],
 'Products':['products','product','product photography'], 'Fashion':['fashion','clothing','fashion & clothing'],
 'Models':['models','model','model portfolios','portraits'], 'Brands':['brands','brand','brand campaigns'],
 'Decor':['decor','wedding decor','venues']
};
const canonical=(value:string)=>Object.entries(categoryAliases).find(([,aliases])=>aliases.includes(value.trim().toLowerCase()))?.[0]||value.trim().toLowerCase();
const sameCategory=(category:string,filter:string)=>filter==='All'||filter==='All work'||canonical(category)===canonical(filter);
const editorialNotes:Record<string,string>={
 Weddings:'A day told through its quiet gestures, the people around it, and the feeling that stays after the music ends.',
 Events:'The room before it fills, the moment it lifts, and the faces that give the gathering its own pulse.',
 Automotive:'A considered study of form, reflection and movement, photographed around the moment of arrival.',
 Products:'Material, light and small design decisions brought forward in a frame made to hold attention.',
 Fashion:'An editorial portrait of the collection, shaped by movement, texture and the character of the people wearing it.',
 Models:'A relaxed portrait session with space for expression, range and a point of view to come through.',
 Brands:'Campaign images that carry one clear visual idea across place, product and people.',
 Decor:'A venue seen through its architecture, considered details and changing atmosphere.'
};

export function SelectedWorkExperience({source}:{source?:Project[]}){
 const projects:Project[]=useMemo(()=>source?.length?source:demo,[source]);
 const reduce=useReducedMotion();
 const[index,setIndex]=useState(0);
 const[active,setActive]=useState<Project|null>(null);
 const[hovered,setHovered]=useState(false);
 const stageRef=useRef<HTMLDivElement>(null),cueRef=useRef<HTMLSpanElement>(null),touchStart=useRef<number|null>(null),skipClick=useRef(false);
 const project=projects[index]||projects[0];
 const projectCategory=canonical(project.category);
 const note=project.description||editorialNotes[projectCategory]||'A distinct visual story, shaped around its people, place and purpose.';
 const move=useCallback((step:number)=>setIndex(current=>(current+step+projects.length)%projects.length),[projects.length]);
 useEffect(()=>{const handleKeys=(event:KeyboardEvent)=>{if(active){if(event.key==='Escape')setActive(null);return}if(event.key==='ArrowRight')move(1);if(event.key==='ArrowLeft')move(-1)};window.addEventListener('keydown',handleKeys);return()=>window.removeEventListener('keydown',handleKeys)},[active,move]);
 const handlePointerMove=(event:React.PointerEvent<HTMLDivElement>)=>{if(event.pointerType!=='mouse')return;const bounds=stageRef.current?.getBoundingClientRect();if(!bounds)return;cueRef.current?.style.setProperty('--cue-x',(event.clientX-bounds.left)+'px');cueRef.current?.style.setProperty('--cue-y',(event.clientY-bounds.top)+'px')};
 const handleTouchEnd=(event:React.PointerEvent<HTMLDivElement>)=>{if(touchStart.current===null)return;const distance=event.clientX-touchStart.current;touchStart.current=null;if(Math.abs(distance)>55){skipClick.current=true;move(distance<0?1:-1);window.setTimeout(()=>{skipClick.current=false},0)}};
 return <div className="selected-work-experience" data-active={index}>
  <div className="selected-work-stage" ref={stageRef} onPointerEnter={()=>setHovered(true)} onPointerLeave={()=>setHovered(false)} onPointerMove={handlePointerMove} onPointerDown={event=>{if(event.pointerType==='touch')touchStart.current=event.clientX}} onPointerUp={handleTouchEnd} onPointerCancel={()=>{touchStart.current=null}}>
   <AnimatePresence initial={false} mode="sync"><motion.button key={project.title} className="selected-work-scene" onClick={()=>{if(skipClick.current){skipClick.current=false;return}setActive(project)}} aria-label={'Open '+project.title+' project'} initial={reduce?false:{clipPath:'inset(0 100% 0 0)',scale:1.045}} animate={{clipPath:'inset(0)',scale:1}} exit={reduce?{opacity:0}:{clipPath:'inset(0 0 0 100%)',scale:1.025}} transition={{duration:reduce?0:.85,ease:[.22,.72,.2,1]}}><ArtImage src={project.imageUrls?.[0]||project.src} position={project.imageUrls?.[0]?undefined:project.position} alt={project.title} loading="eager" fetchPriority="high"/></motion.button></AnimatePresence>
   <div className="selected-work-scrim" aria-hidden="true"/>
   <div className="selected-work-frame" aria-hidden="true"><i/><i/><i/><i/></div>
   <div className="selected-work-stage-top"><span><i/> FRAME {String(index+1).padStart(2,'0')} <b>/ {String(projects.length).padStart(2,'0')}</b></span><span>{project.category} <i>·</i> {project.location||project.place||'Studio / On location'}</span></div>
   <div className="selected-work-stage-copy"><AnimatePresence mode="wait" initial={false}><motion.div key={project.title} className="selected-work-caption" initial={reduce?false:{y:18,clipPath:'inset(0 0 100% 0)'}} animate={{y:0,clipPath:'inset(0)'}} exit={reduce?{opacity:0}:{y:-12,clipPath:'inset(0 0 100% 0)'}} transition={{duration:reduce?0:.4,ease:[.22,.72,.2,1]}}><span className="selected-work-category">{project.category} <i>—</i> {project.location||project.place||'Studio / On location'}</span><h3>{project.title}</h3></motion.div></AnimatePresence><button className="selected-work-open" onClick={()=>setActive(project)}>View this story <ArrowUpRight size={15}/></button></div>
   <button className="selected-work-step selected-work-prev" aria-label="Previous project" onClick={()=>move(-1)}><ArrowLeft size={17}/></button><button className="selected-work-step selected-work-next" aria-label="Next project" onClick={()=>move(1)}><ArrowRight size={17}/></button>
   <AnimatePresence>{hovered&&!reduce&&<motion.span ref={cueRef} className="selected-work-cue" initial={{opacity:0,scale:.75}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.8}} transition={{duration:.18}}>View story <ArrowUpRight size={13}/></motion.span>}</AnimatePresence>
   <div className="selected-work-progress" aria-label={'Project '+(index+1)+' of '+projects.length}>{projects.map((item,i)=><span key={item.title} className={i===index?'is-active':''}><i style={{transform:`scaleX(${i===index?1:0})`}}/></span>)}</div>
  </div>
  <div className="selected-work-rail-head"><span>Selected frames / {String(projects.length).padStart(2,'0')}</span><span>Choose a story <ArrowRight size={12}/></span></div>
  <div className="selected-work-rail" role="group" aria-label="Select a portfolio project">{projects.map((item,i)=><motion.button layout={!reduce} key={item.title} className={'selected-work-thumb'+(i===index?' is-active':'')} onClick={()=>setIndex(i)} aria-pressed={i===index}><span className="selected-work-thumb-image"><ArtImage src={item.src} position={item.position} alt="" loading="lazy"/></span><span className="selected-work-thumb-meta"><span>{String(i+1).padStart(2,'0')} <i>/</i> {item.category}</span><strong>{item.title}</strong></span></motion.button>)}</div>
  <div className="selected-work-note"><div><span className="eyebrow">In the frame · {project.category}</span><AnimatePresence mode="wait" initial={false}><motion.p key={project.title} initial={reduce?false:{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={reduce?{opacity:0}:{opacity:0,y:-8}} transition={{duration:reduce?0:.28}}>{note}</motion.p></AnimatePresence></div><div className="selected-work-position"><span>{String(index+1).padStart(2,'0')}</span><i>/</i><span>{String(projects.length).padStart(2,'0')}</span></div></div>
  <AnimatePresence>{active&&<motion.div className="lightbox" initial={reduce?false:{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduce?0:.25}} onClick={()=>setActive(null)} role="dialog" aria-modal="true" aria-label={`${active.title} project`}><button aria-label="Close project viewer" className="close" onClick={()=>setActive(null)}><X/></button>{active.videoUrl?<video src={active.videoUrl} controls autoPlay className="video"/>:<div className="lightbox-photo"><ArtImage src={active.imageUrls?.[0]||active.src} position={active.imageUrls?.[0]?undefined:active.position} alt={active.title}/></div>}<div className="lightbox-copy"><span className="eyebrow">{active.category} · {active.location||active.place}</span><h2>{active.title}</h2>{(active.description||editorialNotes[canonical(active.category)])&&<p>{active.description||editorialNotes[canonical(active.category)]}</p>}</div></motion.div>}</AnimatePresence>
 </div>
}

export function AnimatedProjectGallery({source,showFilters=true,featured=false}:{source?:Project[];showFilters?:boolean;featured?:boolean}){
 const itemsSource:Project[]=source?.length?source:demo;
 const reduce=useReducedMotion();
 const[filter,setFilter]=useState('All');
 const[active,setActive]=useState<Project|null>(null);
 const items=useMemo(()=>itemsSource.filter(p=>sameCategory(p.category,filter)),[itemsSource,filter]);
 useEffect(()=>{ScrollTrigger.refresh();const timer=window.setTimeout(()=>ScrollTrigger.refresh(),650);return()=>window.clearTimeout(timer)},[items]);
 useEffect(()=>{if(!active)return;const closeOnEscape=(event:KeyboardEvent)=>{if(event.key==='Escape')setActive(null)};window.addEventListener('keydown',closeOnEscape);return()=>window.removeEventListener('keydown',closeOnEscape)},[active]);
 return <>
  {showFilters&&<div className="filters" role="group" aria-label="Filter projects by category">{categories.map(c=><button key={c} onClick={()=>setFilter(c)} className={filter===c?'active':''} aria-pressed={filter===c}>{c==='All work'?'All':c}</button>)}</div>}
  <motion.div layout={!reduce} className={`work-grid ${featured?'work-grid-featured':''}`}>
   <AnimatePresence mode="popLayout">{items.map((p,i)=><motion.button layout={!reduce} key={p.title} className={`project ${featured?`featured-${i+1}`:''}`} onClick={()=>setActive(p)} initial={reduce?false:{opacity:0,y:24,clipPath:'inset(8% 0 0)'}} animate={{opacity:1,y:0,clipPath:'inset(0% 0 0)'}} exit={reduce?{opacity:0}:{opacity:0,y:12}} transition={{duration:reduce?0:.55,ease:[.22,.7,.25,1]}} style={{textAlign:'left',border:0,background:'none',color:'inherit',padding:0,cursor:'pointer'}}><ProjectImageTransition src={p.src} alt={p.title} videoUrl={p.videoUrl} position={p.position}/><span className="project-meta"><span className="project-title">{p.title}</span><span className="project-category">{p.category} <i>·</i> {p.location||p.place}</span></span></motion.button>)}</AnimatePresence>
  </motion.div>
  <AnimatePresence>{active&&<motion.div className="lightbox" initial={reduce?false:{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduce?0:.25}} onClick={()=>setActive(null)} role="dialog" aria-modal="true" aria-label={`${active.title} project`}><button aria-label="Close project viewer" className="close" onClick={()=>setActive(null)}><X/></button>{active.videoUrl?<video src={active.videoUrl} controls autoPlay className="video"/>:<div className="lightbox-photo"><ArtImage src={active.imageUrls?.[0]||active.src} position={active.imageUrls?.[0]?undefined:active.position} alt={active.title}/></div>}<div className="lightbox-copy"><span className="eyebrow">{active.category} · {active.location||active.place}</span><h2>{active.title}</h2>{active.description&&<p>{active.description}</p>}</div></motion.div>}</AnimatePresence>
 </>
}
export const WorkGrid=AnimatedProjectGallery;
