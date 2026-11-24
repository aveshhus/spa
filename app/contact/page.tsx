import type {Metadata} from 'next';
import Link from 'next/link';
import {ArrowLeft, ArrowUpRight, Clock3, MapPin, MessageCircle, Phone} from 'lucide-react';
import ContactForm from './contact-form';

const siteUrl=process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/,'');
const assetPath=(path:string)=>`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
const mapUrl='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3628.0021140679833!2d73.70997687582965!3d24.589123256060148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967e5909d4691a5%3A0x5388c56987b774b0!2sPearl%20Royal%20Spa!5e0!3m2!1sen!2sin!4v1794998533396!5m2!1sen!2sin';

export const metadata:Metadata={
  title:{absolute:'Contact Pearl Royal Spa Udaipur | Call & Directions'},
  description:'Contact Pearl Royal Spa in Anand Nagar, Udaipur to ask about massage treatments or memberships. Call, WhatsApp, get directions or send an appointment enquiry.',
  alternates:siteUrl?{canonical:'/contact'}:undefined,
  openGraph:{type:'website',locale:'en_IN',siteName:'Pearl Royal Spa',title:'Contact Pearl Royal Spa in Udaipur',description:'Call, WhatsApp or find Pearl Royal Spa near Anand Plaza on University Road, Udaipur.',...(siteUrl?{url:`${siteUrl}/contact`}:{})},
};

export default function ContactPage(){return <main className="pearl-contact-page">
  <div className="contact-topline"><Link href="/" className="contact-back"><ArrowLeft size={14}/> Back to Pearl Royal Spa</Link><span>UDAIPUR · RAJASTHAN</span></div>
  <header className="contact-nav"><Link className="contact-brand" href="/" aria-label="Pearl Royal Spa home"><img src={assetPath('/icon.svg')} alt=""/><span>PEARL<small>R O Y A L&nbsp; S P A</small></span></Link><nav aria-label="Contact page navigation"><Link href="/#treatments">Treatments</Link><Link href="/#membership">Memberships</Link><a className="contact-nav-cta" href="tel:+916376291507"><Phone size={14}/> Call the spa</a></nav></header>
  <section className="contact-hero"><span className="contact-eyebrow">A LITTLE HELP IS A MESSAGE AWAY</span><h1>Let’s find your<br/><em>moment of calm.</em></h1><p>Ask us about a treatment, membership or appointment at Pearl Royal Spa in Udaipur. Call, WhatsApp or send an enquiry and our team will help with the next step.</p></section>
  <section className="contact-main" aria-label="Pearl Royal Spa contact details and appointment form">
    <div className="contact-info-column"><span className="contact-eyebrow">PEARL ROYAL SPA · UDAIPUR</span><h2>We’re here<br/>when you’re <em>ready.</em></h2><p>Find us in Anand Nagar, near Anand Plaza on University Road. We welcome questions about all 13 massage treatments and our spa memberships.</p>
      <a className="contact-detail-card" href="tel:+916376291507"><span className="contact-detail-icon"><Phone size={17}/></span><span><small>CALL OUR TEAM</small><b>+91 63762 91507</b></span><ArrowUpRight size={15}/></a>
      <a className="contact-detail-card" href="tel:+918302452881"><span className="contact-detail-icon"><Phone size={17}/></span><span><small>ALTERNATE NUMBER</small><b>+91 83024 52881</b></span><ArrowUpRight size={15}/></a>
      <a className="contact-detail-card" href="https://wa.me/916376291507?text=Hello%20Pearl%20Royal%20Spa%2C%20I%20would%20like%20to%20enquire%20about%20an%20appointment." target="_blank" rel="noreferrer"><span className="contact-detail-icon"><MessageCircle size={17}/></span><span><small>MESSAGE ON WHATSAPP</small><b>Chat with the spa</b></span><ArrowUpRight size={15}/></a>
      <div className="contact-address"><MapPin size={17}/><div><small>VISIT US</small><address>Anand Nagar, near Anand Plaza,<br/>University Road, Udaipur,<br/>Rajasthan 313001, India</address><a href="https://maps.google.com/?q=Pearl+Royal+Spa%2C+Udaipur" target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={13}/></a></div></div>
      <div className="contact-hours"><Clock3 size={15}/><span>Appointment hours can vary. Call or WhatsApp to check availability before visiting.</span></div>
    </div>
    <ContactForm/>
  </section>
  <section className="contact-map-section"><div className="contact-map-copy"><span className="contact-eyebrow">NEAR ANAND PLAZA · UNIVERSITY ROAD</span><h2>A calmer corner<br/>of <em>Udaipur.</em></h2><p>Use the map to plan your visit to Pearl Royal Spa in Anand Nagar.</p></div><div className="contact-map"><iframe src={mapUrl} title="Google Map showing Pearl Royal Spa in Anand Nagar near Anand Plaza, University Road, Udaipur" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/><a href="https://maps.google.com/?q=Pearl+Royal+Spa%2C+Udaipur" target="_blank" rel="noreferrer">OPEN IN GOOGLE MAPS <ArrowUpRight size={13}/></a></div></section>
  <footer className="contact-footer"><Link className="contact-brand" href="/"><img src={assetPath('/icon.svg')} alt=""/><span>PEARL<small>R O Y A L&nbsp; S P A</small></span></Link><span>STILLNESS, BEAUTIFULLY KEPT.</span><Link href="/">Return to the spa <ArrowUpRight size={14}/></Link></footer>
  <div className="contact-floating"><a href="tel:+916376291507" aria-label="Call Pearl Royal Spa"><Phone size={17}/></a><a href="https://wa.me/916376291507?text=Hello%20Pearl%20Royal%20Spa%2C%20I%20would%20like%20to%20enquire%20about%20an%20appointment." target="_blank" rel="noreferrer" aria-label="Message Pearl Royal Spa on WhatsApp"><MessageCircle size={17}/></a></div>
</main>}
