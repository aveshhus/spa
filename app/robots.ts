import type {MetadataRoute} from 'next';
export const dynamic='force-static';
export default function robots():MetadataRoute.Robots{
  const site=process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/,'');
  return {rules:{userAgent:'*',allow:'/',disallow:'/studio'},...(site?{sitemap:`${site}/sitemap.xml`}:{})};
}
