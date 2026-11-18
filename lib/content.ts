export const services=[
 ['Wedding photography & films','The full story of a day that belongs to you.'],
 ['Wedding content creation','The in-between moments, ready to relive tomorrow.'],
 ['Couple reels','A moving portrait of the two of you.'],
 ['Pre-wedding stories','A portrait of your life together, before the celebration.'],
 ['Wedding decor','Space, light and all the details chosen with care.'],
 ['Events','The people, atmosphere and moments that bring a room alive.'],
 ['Automotive','Design, motion and the moment it becomes yours.'],
 ['Product photography','Considered studio and campaign imagery for objects with a point of view.'],
 ['Model portfolios','Portraits with presence, range and personality.'],
 ['Fashion & clothing','Editorial imagery shaped around the collection.'],
 ['Brand campaigns','A visual world for the ideas you want to put out.'],
 ['Social films','Short stories made to hold attention.'],
 ['Commercial photography','Clear, characterful imagery for businesses and people.']
] as const;
export const categories=['All','Weddings','Events','Automotive','Products','Fashion','Models','Brands','Decor'];
const spriteCells:Record<string,[number,number]>={Weddings:[0,0],Events:[2,1],Automotive:[2,0],Products:[3,1],Fashion:[1,0],Models:[0,2],Decor:[2,2],Brands:[1,2],'Couple reels':[3,2],Commercial:[3,0]};
const makeProject=(title:string,category:string,place:string,img:string,layout='landscape')=>{const[x,y]=spriteCells[category]||[3,3];return{title,category,place,img,layout,position:`sprite:${x}:${y}`,src:'/maison-frames-editorial-sheet.png'}};
export const projects=[
 makeProject('The last light','Weddings','Udaipur · Rajasthan','photo-1519741497674-611481863552','portrait'),
 makeProject('After the doors open','Events','New Delhi · India','photo-1511795409834-ef04bbd61622','landscape'),
 makeProject('In motion','Automotive','Mumbai · India','photo-1503376780353-7e6692767b70','portrait'),
 makeProject('Objects in good light','Products','Studio · New Delhi','photo-1542291026-7eec264c27ff','square'),
 makeProject('The shape of Sunday','Fashion','Mumbai · India','photo-1483985988355-763728e1935b','landscape'),
 makeProject('A study in presence','Models','Studio · New Delhi','photo-1534528741775-53994a69daeb','portrait'),
 makeProject('Room for colour','Decor','Jaipur · Rajasthan','photo-1464366400600-7168b8af9bc3','landscape'),
 makeProject('Made of mornings','Brands','Bengaluru · India','photo-1523726491678-bf852e717f6a','square'),
 makeProject('A little closer','Couple reels','Goa · India','photo-1511285560929-80b456fea0bc','portrait'),
 makeProject('The everyday, elevated','Commercial','Studio · New Delhi','photo-1490312278390-ab64016e0aa9','landscape')
];
export const worlds=[
 {name:'Weddings',subtitle:'The day, held close.',note:'From a first look to the last dance, we watch for the gestures between the grand moments: a steadying hand, a room exhaling, the people who made the day yours.',craft:'Documentary photographs · cinematic films · same-day stories',frame:'The pause before the room fills',src:projects[0].src,position:projects[0].position},
 {name:'Events',subtitle:'A room in motion.',note:'We move with the rhythm of a gathering, finding the faces, performances and atmosphere that make being there feel different from hearing about it.',craft:'Live coverage · event films · speaker portraits',frame:'The energy from inside the room',src:projects[1].src,position:projects[1].position},
 {name:'Automotive',subtitle:'Made to move.',note:'Sculpted lines meet changing light. We make space for the vehicle, the setting and the feeling of arrival, from a considered detail to the full reveal.',craft:'Delivery stories · launch films · motion-led content',frame:'Light, surface and a sense of arrival',src:projects[2].src,position:projects[2].position},
 {name:'Products',subtitle:'Objects with presence.',note:'Material, silhouette and the way light moves across a surface become the story. Every frame is built to make the details clear and the object memorable.',craft:'Studio stills · campaign imagery · product films',frame:'A closer study of form and light',src:projects[3].src,position:projects[3].position},
 {name:'Fashion',subtitle:'Cloth, character, movement.',note:'We bring collection, styling and location into one visual language, making editorial frames that let fabric move and personality come through.',craft:'Fashion editorials · collection campaigns · lookbooks',frame:'Movement shaped into a point of view',src:projects[4].src,position:projects[4].position},
 {name:'Models',subtitle:'Presence, without posing.',note:'A portrait session made to feel collaborative. We look for the expressions and shifts in energy that show range, character and a person at ease.',craft:'Portfolio sessions · portraits · test shoots',frame:'A portrait with room to breathe',src:projects[5].src,position:projects[5].position},
 {name:'Brands',subtitle:'A world people can enter.',note:'Starting with what makes a brand distinct, we create a visual world with a recognisable tone across campaign photography, moving image and social.',craft:'Brand campaigns · social films · visual direction',frame:'One idea, carried through the frame',src:projects[7].src,position:projects[7].position},
 {name:'Decor',subtitle:'Spaces with a sense of occasion.',note:'We follow the architecture, chosen details and changing light to show how a space feels before guests arrive and after the celebration begins.',craft:'Venue stories · design details · atmosphere',frame:'The setting, before and as it comes alive',src:projects[6].src,position:projects[6].position}
];
export const journal=[
 {title:'The light we keep',category:'Wedding stories',date:'October 12, 2025',excerpt:'A late monsoon afternoon, a courtyard full of jasmine, and two people who forgot the camera was there.',position:'sprite:0:0'},
 {title:'A slower way of seeing',category:'Behind the scenes',date:'September 04, 2025',excerpt:'On making room for the unscripted, and why the frames between the big moments often stay with us.',position:'sprite:1:3'},
 {title:'Colour, cloth, character',category:'Fashion & models',date:'August 18, 2025',excerpt:'A study in texture and movement from our recent independent fashion story.',position:'sprite:1:0'},
 {title:'An arrival in the last light',category:'Automotive',date:'July 02, 2025',excerpt:'Finding a visual language for a new car delivery, shaped by reflection, movement and the city at dusk.',position:'sprite:2:0'},
 {title:'Objects with a point of view',category:'Product campaigns',date:'June 14, 2025',excerpt:'How light, material and a restrained frame made room for a skincare range to speak.',position:'sprite:3:1'},
 {title:'The room before the room fills',category:'Events & celebrations',date:'May 27, 2025',excerpt:'A stage, a warm wash of light and the held breath just before an event begins.',position:'sprite:2:1'}
].map(p=>({...p,src:'/maison-frames-editorial-sheet.png'}));
export const photo=(id:string,w=1400)=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=88`;
