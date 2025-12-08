"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaTimes, FaArrowLeft } from "react-icons/fa";

// --- DATA ESTÁTICA CON RUTAS REALES ---

// 1. Matriz para "Todo": 9 fotos mezcladas (Cuadradas)
const mixedImages = [
  { src: "/images/fotos/piscina.jpg", category: "Piscina", alt: "Piscina principal" },
  { src: "/images/fotos/terraza1.jpg", category: "Terraza", alt: "Zona de terraza" },
  { src: "/images/fotos/exterior.jpeg", category: "Exterior", alt: "Jardines" },
  { src: "/images/fotos/piscina3.jpg", category: "Piscina", alt: "Vista piscina" },
  { src: "/images/fotos/atardecer.jpeg", category: "Exterior", alt: "Atardecer" },
  { src: "/images/fotos/quincho.jpg", category: "Terraza", alt: "Quincho equipado" },
  { src: "/images/fotos/piscina2.jpeg", category: "Piscina", alt: "Detalle agua" },
  { src: "/images/fotos/noche.jpg", category: "Exterior", alt: "Iluminación nocturna" },
  { src: "/images/fotos/exterior2.jpg", category: "Exterior", alt: "Entorno natural" },
];

// 2. Data por categorías
// Nota: 'Terraza' solo tiene 1 foto en tu carpeta, la repetimos para mantener el diseño 2x3 o la mostramos sola.
// He repetido algunas para llenar la grilla visualmente.
const categoryData = {
  Piscina: [
    { src: "/images/fotos/piscina.jpg", alt: "Piscina principal" },
    { src: "/images/fotos/piscina1.jpg", alt: "Vista lateral" },
    { src: "/images/fotos/piscina2.jpeg", alt: "Agua cristalina" },
    { src: "/images/fotos/piscina3.jpg", alt: "Zona de descanso" },
    { src: "/images/fotos/piscina4.jpeg", alt: "Piscina tarde" },
    { src: "/images/fotos/piscina.jpg", alt: "Vista general" }, // Repetida para completar 6
  ],
  Exterior: [
    { src: "/images/fotos/exterior.jpeg", alt: "Jardín principal" },
    { src: "/images/fotos/exterior1.jpg", alt: "Senderos" },
    { src: "/images/fotos/exterior2.jpg", alt: "Árboles" },
    { src: "/images/fotos/noche.jpg", alt: "Vista nocturna" },
    { src: "/images/fotos/atardecer.jpeg", alt: "Puesta de sol" },
    { src: "/images/fotos/exterior.jpeg", alt: "Entorno" }, // Repetida para completar 6
  ],
  Terraza: [
    { src: "/images/fotos/terraza.jpg", alt: "Espacio techado" },
    { src: "/images/fotos/terraza1.jpg", alt: "Mesas" },
    { src: "/images/fotos/terraza2.jpg", alt: "Espacio descanso" },
    { src: "/images/fotos/quincho.jpg", alt: "Quincho equipado" },
    { src: "/images/fotos/piscina3.jpg", alt: "Terraza y piscina" },
    { src: "/images/fotos/noche.jpg", alt: "Terraza de noche" },
  ],
};

const categories = ["Todo", "Piscina", "Exterior", "Terraza"];

// Definimos una interfaz simple para el estado de selección
interface SelectedImage {
  src: string;
  alt: string;
  category?: string;
}

export default function GaleriaPage() {
  const [activeCategory, setActiveCategory] = useState("Todo");
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);

  // Seleccionar array según categoría usando los datos estáticos
  const currentImages = activeCategory === "Todo" 
    ? mixedImages 
    : categoryData[activeCategory as keyof typeof categoryData] || [];

  return (
    <main className="bg-cream min-h-screen pb-24">
      
      {/* HEADER */}
      <section className="pt-36 pb-12 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-widest mb-4 text-dark">
          Nuestros Espacios
        </h1>
        <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
        <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
          Un recorrido visual por la tranquilidad y belleza de Casona Culiprán.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* CONTROLES */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-dark/70 font-bold hover:text-primary transition-colors uppercase text-xs tracking-widest border-b border-transparent hover:border-primary pb-1"
          >
            <FaArrowLeft /> Volver al Inicio
          </Link>

          {/* Filtros */}
          <div className="flex flex-wrap justify-center gap-2 bg-white/50 p-2 rounded-full border border-dark/5 shadow-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300
                  ${activeCategory === cat ? "bg-primary text-dark shadow-md" : "text-gray-500 hover:text-dark hover:bg-white"}
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* GRID SIMÉTRICO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentImages.map((img, idx) => (
            <div 
              key={idx} 
              onClick={() => setSelectedImage(img)}
              className={`
                relative group overflow-hidden rounded-2xl cursor-pointer bg-sand shadow-sm hover:shadow-lg transition-all duration-500
                ${activeCategory === "Todo" ? "aspect-square" : "aspect-[4/3]"}
              `}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                quality={90} // Aumentamos calidad para evitar borrosidad
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                // Ajustamos sizes para pedir imágenes más grandes en desktop
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
              />
              
              {/* Overlay Hover */}
              <div className="absolute inset-0 bg-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm px-6 py-2 rounded-full text-dark text-sm font-bold uppercase tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  Ver
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* LIGHTBOX */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-[9999] bg-[#151515]/95 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-6 right-6 text-white/60 hover:text-primary text-4xl transition-colors">
              <FaTimes />
            </button>
            <div className="relative w-full max-w-6xl max-h-[90vh] rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/10" onClick={(e) => e.stopPropagation()}>
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={1600}
                height={1200}
                quality={100} // Calidad máxima en modo pantalla completa
                className="w-full h-full object-contain max-h-[85vh]"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-center bg-gradient-to-t from-black/80 to-transparent">
                 <p className="text-white text-lg font-light tracking-wide">{selectedImage.alt}</p>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-24 flex justify-center">
           <Link 
              href="/reservas" 
              className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-dark transition-all duration-200 bg-primary font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary hover:scale-105 shadow-xl"
            >
              Cotizar Mi Evento
              <div className="absolute -inset-3 rounded-full bg-primary opacity-20 group-hover:opacity-40 blur-lg transition-opacity duration-200" />
            </Link>
        </div>

      </div>
    </main>
  );
}