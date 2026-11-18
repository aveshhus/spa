import type {MetadataRoute} from 'next';
export default function sitemap():MetadataRoute.Sitemap{
  const site=process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/,'');
  return site?[
    {url:site+'/',changeFrequency:'monthly',priority:1},
    {url:site+'/contact',changeFrequency:'yearly',priority:.7},
  ]:[];
}
