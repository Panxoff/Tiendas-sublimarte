import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Reemplaza esto con tu dominio real cuando lo tengas, ej: https://www.casonaculipran.cl
  const baseUrl = 'https://www.casonaculipran.cl'; 

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/reservas`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Si tienes más páginas (como galería), agrégalas aquí
  ];
}