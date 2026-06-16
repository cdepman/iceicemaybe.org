import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const routePages = [
  {
    outputPath: 'build/off-grid-ice-rig/index.html',
    title: 'Off-Grid Ice Rig Build Manual | Ice Ice Maybe',
    description:
      'Open-source field manual for building an off-grid ice rig with a reservoir, pump, plumbing fittings, and portable ice maker.',
    canonical: 'https://www.iceicemaybe.org/off-grid-ice-rig',
    type: 'article',
    image: 'https://www.iceicemaybe.org/off-grid-ice-rig/og-image.jpg',
    imageAlt:
      'Off-grid ice rig with reservoir, pump, plumbing, and portable ice maker',
  },
];

const replaceTag = (html, regex, tag) => {
  if (regex.test(html)) return html.replace(regex, tag);
  return html.replace('</head>', `    ${tag}\n  </head>`);
};

const setMetaName = (html, name, content) =>
  replaceTag(
    html,
    new RegExp(`<meta\\s+name="${name}"[\\s\\S]*?>`),
    `<meta name="${name}" content="${content}" />`
  );

const setMetaProperty = (html, property, content) =>
  replaceTag(
    html,
    new RegExp(`<meta\\s+property="${property}"[\\s\\S]*?>`),
    `<meta property="${property}" content="${content}" />`
  );

const setCanonical = (html, href) =>
  replaceTag(
    html,
    /<link\s+rel="canonical"[\s\S]*?>/,
    `<link rel="canonical" href="${href}" />`
  );

const applyRouteMeta = (html, page) => {
  let next = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${page.title}</title>`);
  next = setCanonical(next, page.canonical);
  next = setMetaName(next, 'description', page.description);
  next = setMetaProperty(next, 'og:title', page.title);
  next = setMetaProperty(next, 'og:description', page.description);
  next = setMetaProperty(next, 'og:type', page.type);
  next = setMetaProperty(next, 'og:url', page.canonical);
  next = setMetaProperty(next, 'og:image', page.image);
  next = setMetaProperty(next, 'og:image:alt', page.imageAlt);
  next = setMetaName(next, 'twitter:title', page.title);
  next = setMetaName(next, 'twitter:description', page.description);
  next = setMetaName(next, 'twitter:image', page.image);
  next = setMetaName(next, 'twitter:image:alt', page.imageAlt);
  return next;
};

const indexHtml = await readFile('build/index.html', 'utf8');

await Promise.all(
  routePages.map(async (page) => {
    const output = applyRouteMeta(indexHtml, page);
    const outputPath = join(process.cwd(), page.outputPath);
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, output);
  })
);
