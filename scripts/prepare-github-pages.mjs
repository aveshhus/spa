import {cp, mkdir, rm, writeFile} from 'node:fs/promises';
import {join} from 'node:path';

const root=process.cwd();
const target=join(root,'.github-pages-source');
await rm(target,{recursive:true,force:true});
await mkdir(join(target,'app','contact'),{recursive:true});
await mkdir(join(target,'public'),{recursive:true});

for(const file of ['page.tsx','layout.tsx','globals.css','pearl.css','icon.svg']){
  const from=file==='icon.svg'?join(root,'app',file):join(root,'app',file);
  const to=file==='icon.svg'?join(target,'app',file):join(target,'app',file);
  await cp(from,to);
}
await cp(join(root,'app','contact','page.tsx'),join(target,'app','contact','page.tsx'));
await cp(join(root,'app','contact','contact-form.tsx'),join(target,'app','contact','contact-form.tsx'));
await writeFile(join(target,'package.json'),JSON.stringify({name:'pearl-royal-spa-pages',private:true},null,2)+'\n');
await writeFile(join(target,'package-lock.json'),JSON.stringify({name:'pearl-royal-spa-pages',lockfileVersion:3,requires:true,packages:{'':{name:'pearl-royal-spa-pages',version:'1.0.0',dependencies:{}}}},null,2)+'\n');
await writeFile(join(target,'next.config.mjs'),`const nextConfig={output:'export',trailingSlash:true,basePath:process.env.NEXT_PUBLIC_BASE_PATH||'',outputFileTracingRoot:process.cwd(),images:{unoptimized:true}};\nexport default nextConfig;\n`);
console.log('Prepared the homepage and contact page for static GitHub Pages export.');
