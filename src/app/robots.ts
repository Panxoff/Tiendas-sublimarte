import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin', // Opcional: le decimos a Google que no mire la parte administrativa
    },
    sitemap: 'https://www.casonaculipran.cl/sitemap.xml', // Ajusta con tu dominio
  };
}