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

  // Título optimizado
  title: "Arriendo de Parcela con Piscina en Melipilla | Casona Culiprán",
  description: "Disfruta de un día de campo inolvidable. Arriendo de parcela exclusiva con piscina, quincho y áreas verdes para eventos, matrimonios y paseos de curso en Melipilla.",
  
  keywords: [
    "arriendo parcela", 
    "parcela con piscina", 
    "arriendo parcela melipilla", 
    "centro de eventos melipilla", 
    "parcela para matrimonios", 
    "paseos de curso", 
    "casona culipran"
  ],

  // --- NUEVO: CONFIGURACIÓN DEL LOGO (FAVICON) ---
  icons: {
    icon: [
      { url: '/images/fotos/logo.png' },
      { url: '/images/fotos/logo.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/images/fotos/logo.png' }, // Para iPhone/iPad
    ],
  },

  openGraph: {
    title: "Casona Culiprán | Tu Evento en el Mejor Entorno Natural",
    description: "Parcela exclusiva en Melipilla con piscina, quincho y 5.600m² de parque. Ideal para familias y empresas.",
    url: "https://www.casonaculipran.cl",
    siteName: "Casona Culiprán",
    images: [
      {
        url: "/images/fotos/piscina.jpg", 
        width: 1200,
        height: 630,
        alt: "Piscina y Terraza Casona Culiprán",
      },
    ],
    locale: "es_CL",
    type: "website",
  },
  
  robots: {
    index: true,
    follow: true,
  },
  
  alternates: {
    canonical: "https://www.casonaculipran.cl",
  }
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#ebe0ca]">
      <Hero />
      <section id="about" className="scroll-mt-32">
        <AboutSection />
      </section>
      <section id="gallery" className="scroll-mt-32">
        <GalleryPreview />
      </section>
      <section id="reviews" className="scroll-mt-32">
        <Testimonials />
      </section>
      <section>
        <ContactSection />
      </section>
    </main>
  );
}