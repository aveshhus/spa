import type {Metadata} from 'next';
import './globals.css';

const services=['Deep Tissue Massage','Swedish Massage','Aromatherapy Massage','Lomi Lomi Massage','Classic Hot Oil Massage','Thai Massage','Balinese Massage','Four-Hand Massage','Head, Foot & Shoulder Massage','Oil Massage','Dry Massage','Sports Massage','Scrub Massage'];
const siteUrl=process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/,'');
const business={
  '@context':'https://schema.org',
  '@type':'DaySpa',
  '@id':siteUrl?`${siteUrl}/#business`:undefined,
  name:'Pearl Royal Spa',
  description:'Day spa offering massage treatments and memberships in Anand Nagar, near Anand Plaza on University Road, Udaipur, Rajasthan.',
  url:siteUrl,
  logo:siteUrl?`${siteUrl}/icon.svg`:undefined,
  image:'https://images.unsplash.com/photo-1745327883508-b6cd32e5dde5?auto=format&fit=crop&w=1200&h=900&q=85',
  telephone:'+91 6376291507',
  contactPoint:{'@type':'ContactPoint',telephone:'+91 8302452881',contactType:'customer enquiries',areaServed:'IN',availableLanguage:['English','Hindi']},
  address:{'@type':'PostalAddress',streetAddress:'Anand Nagar, near Anand Plaza, University Road',addressLocality:'Udaipur',addressRegion:'Rajasthan',postalCode:'313001',addressCountry:'IN'},
  geo:{'@type':'GeoCoordinates',latitude:24.589123256060148,longitude:73.70997687582965},
  hasMap:'https://www.google.com/maps/search/?api=1&query=Pearl+Royal+Spa%2C+Udaipur',
  areaServed:{'@type':'City',name:'Udaipur'},
  hasOfferCatalog:{'@type':'OfferCatalog',name:'Massage therapies in Udaipur',itemListElement:services.map(name=>({'@type':'Offer',itemOffered:{'@type':'Service',name}}))},
};

export const metadata:Metadata={
  metadataBase:siteUrl?new URL(siteUrl):undefined,
  title:{default:'Pearl Royal Spa Udaipur | Massage & Spa Treatments',template:'%s | Pearl Royal Spa Udaipur'},
  description:'Book a massage at Pearl Royal Spa in Udaipur. Explore 13 massage treatments and spa memberships near Anand Plaza on University Road. Call or WhatsApp to enquire.',
  alternates:siteUrl?{canonical:'/'}:undefined,
  openGraph:{type:'website',locale:'en_IN',siteName:'Pearl Royal Spa',title:'Pearl Royal Spa Udaipur | Massage & Spa Treatments',description:'Explore massage treatments and spa memberships at Pearl Royal Spa, Anand Nagar near Anand Plaza, University Road, Udaipur.',...(siteUrl?{url:siteUrl,images:[{url:'https://images.unsplash.com/photo-1745327883508-b6cd32e5dde5?auto=format&fit=crop&w=1200&h=630&q=85',alt:'Relaxing spa setting at Pearl Royal Spa in Udaipur'}]}:{})},
  twitter:{card:'summary_large_image',title:'Pearl Royal Spa Udaipur | Massage & Spa Treatments',description:'Massage treatments and memberships near Anand Plaza on University Road, Udaipur.',...(siteUrl?{images:['https://images.unsplash.com/photo-1745327883508-b6cd32e5dde5?auto=format&fit=crop&w=1200&h=630&q=85']}:{})},
  robots:{index:true,follow:true,googleBot:{index:true,follow:true,'max-image-preview':'large','max-snippet':-1,'max-video-preview':-1}},
};

export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en-IN"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(business).replace(/</g,'\\u003c')}}/></body></html>}
