import { Metadata } from "next";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import GalleryPreview from "@/components/GalleryPreview";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection"; 

// --- CONFIGURACIÓN SEO (METADATOS) ---
export const metadata: Metadata = {
  // URL Base para que las imágenes de redes sociales funcionen
  metadataBase: new URL("https://www.casonaculipran.cl"), 

  // Título que aparece en la pestaña del navegador y en Google (Azul)
  title: "Arriendo de Parcela con Piscina en Melipilla | Casona Culiprán",
  
  // Descripción que aparece debajo del título en Google
  description: "Disfruta de un día de campo inolvidable. Arriendo de parcela exclusiva con piscina, quincho y áreas verdes para eventos, matrimonios y paseos de curso en Melipilla.",
  
  // Palabras clave para buscadores
  keywords: [
    "arriendo parcela", 
    "parcela con piscina", 
    "arriendo parcela melipilla", 
    "centro de eventos melipilla", 
    "parcela para matrimonios", 
    "paseos de curso", 
    "casona culipran"
  ],

  // Configuración para cuando comparten tu link en WhatsApp, Facebook, etc.
  openGraph: {
    title: "Casona Culiprán | Tu Evento en el Mejor Entorno Natural",
    description: "Parcela exclusiva en Melipilla con piscina, quincho y 5.600m² de parque. Ideal para familias y empresas.",
    url: "https://www.casonaculipran.cl",
    siteName: "Casona Culiprán",
    images: [
      {
        url: "/images/Fotos JPG/Piscina Terraza.jpg", // Asegúrate de que esta imagen exista
        width: 1200,
        height: 630,
        alt: "Piscina y Terraza Casona Culiprán",
      },
    ],
    locale: "es_CL",
    type: "website",
  },
  
  // Permisos para los robots de Google
  robots: {
    index: true,
    follow: true,
  },
  
  // URL canónica para evitar contenido duplicado
  alternates: {
    canonical: "https://www.casonaculipran.cl",
  }
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#ebe0ca]">
      
      {/* 1. HERO (Portada Principal) */}
      <Hero />

      {/* 2. SOBRE NOSOTROS */}
      <section id="about" className="scroll-mt-32">
        <AboutSection />
      </section>

      {/* 3. GALERÍA PREVIA */}
      <section id="gallery" className="scroll-mt-32">
        <GalleryPreview />
      </section>

      {/* 4. RESEÑAS */}
      <section id="reviews" className="scroll-mt-32">
        <Testimonials />
      </section>

      {/* 5. SECCIÓN FINAL (CTA) */}
      <section>
        <ContactSection />
      </section>

    </main>
  );
}