import { useEffect } from 'react';

const SITE_URL = 'https://www.iceicemaybe.org';
const SITE_NAME = 'Ice Ice Maybe';

const absoluteUrl = (path) => new URL(path, SITE_URL).href;

const upsertMeta = (attr, key, content) => {
  if (!content) return;
  let element = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const upsertCanonical = (href) => {
  let element = document.head.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
};

export const PageMeta = ({
  title,
  description,
  path = '/',
  image = '/IceIceMaybeImage.png',
  imageAlt = SITE_NAME,
  type = 'website',
}) => {
  useEffect(() => {
    const url = absoluteUrl(path);
    const imageUrl = absoluteUrl(image);

    document.title = title;
    upsertCanonical(url);
    upsertMeta('name', 'description', description);

    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', imageUrl);
    upsertMeta('property', 'og:image:alt', imageAlt);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', imageUrl);
    upsertMeta('name', 'twitter:image:alt', imageAlt);
  }, [description, image, imageAlt, path, title, type]);

  return null;
};
