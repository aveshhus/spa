'use client';

import type {FormEvent} from 'react';
import {ArrowUpRight} from 'lucide-react';

const services=['Deep Tissue Massage','Swedish Massage','Aromatherapy Massage','Lomi Lomi Massage','Classic Hot Oil Massage','Thai Massage','Balinese Massage','Four-Hand Massage','Head, Foot & Shoulder Massage','Oil Massage','Dry Massage','Sports Massage','Scrub Massage'];

export default function ContactForm(){
  const submit=(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    const data=new FormData(event.currentTarget);
    const message=[
      'Hello Pearl Royal Spa, I would like to enquire about an appointment.',
      `Name: ${data.get('name')}`,
      `Phone: ${data.get('phone')}`,
      `Treatment: ${data.get('treatment')||'Please help me choose'}`,
      `Preferred day: ${data.get('day')||'Flexible'}`,
      `Message: ${data.get('message')||'None'}`,
    ].join('\n');
    window.open(`https://wa.me/916376291507?text=${encodeURIComponent(message)}`,'_blank','noopener,noreferrer');
  };
  return <form className="contact-form" onSubmit={submit} aria-labelledby="contact-form-title"><div className="contact-form-heading"><span className="contact-eyebrow">WE’LL BE IN TOUCH ON WHATSAPP</span><h2 id="contact-form-title">Send an <em>enquiry.</em></h2><p>Share a few details and your message will be ready to send to our team on WhatsApp.</p></div>
    <label>Your name<input name="name" placeholder="How should we address you?" autoComplete="name" required/></label>
    <label>Phone number<input name="phone" type="tel" placeholder="Your contact number" autoComplete="tel" required/></label>
    <label>Treatment of interest<select name="treatment" defaultValue=""><option value="">Help me choose</option>{services.map(service=><option key={service}>{service}</option>)}<option>Membership packages</option></select></label>
    <label>Preferred day<input name="day" type="date"/></label>
    <label className="contact-message-field">How can we help?<textarea name="message" rows={4} placeholder="Ask us about a treatment, membership or appointment…"/></label>
    <button type="submit" className="contact-submit">Continue in WhatsApp <ArrowUpRight size={15}/></button><span className="contact-form-note">WhatsApp opens with your enquiry ready for you to review and send.</span>
  </form>
}
