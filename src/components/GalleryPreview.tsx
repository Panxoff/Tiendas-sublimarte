"use client";

import Link from "next/link";
import Image from "next/image";

export default function GalleryPreview() {
  // Lista manual con las rutas exactas de tu carpeta 'public/images/fotos'
  const previewImages = [
    { 
      src: "/images/fotos/piscina.jpg", 
      alt: "Piscina y Terraza",
      category: "Piscina"
    },
    { 
      src: "/images/fotos/quincho.jpg", 
      alt: "Quincho equipado",
      category: "Terraza"
    },
    { 
      src: "/images/fotos/exterior.jpeg", 
      alt: "Amplios Jardines",
      category: "Exterior"
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-cream">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-dark mb-10">Nuestros Espacios</h2>

        {/* Grid de 3 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previewImages.map((img, index) => (
            <div key={index} className="relative h-64 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 group">
              <Image 
                src={img.src} 
                alt={img.alt} 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              {/* Etiqueta al pasar el mouse */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-end justify-center pb-4">
                <span className="text-white font-bold uppercase tracking-wider text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  {img.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        <Link 
          href="/galeria" 
          className="mt-12 inline-block text-primary font-bold uppercase border-b-2 border-primary pb-1 hover:opacity-80 hover:text-dark transition"
        >
          Ver galería completa →
        </Link>
      </div>
    </section>
  );
}