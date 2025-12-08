import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton"; // <--- IMPORTAMOS EL BOTÓN

// AQUÍ SE CAMBIA EL TÍTULO DE LA PESTAÑA
export const metadata: Metadata = {
  title: "Casona Culiprán - Eventos y Desconexión",
  description: "Arrienda nuestra hermosa parcela en Melipilla para tus eventos familiares, empresariales o colegios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="relative">
        <Navbar />
        {children}
        
        {/* BOTÓN FLOTANTE DE WHATSAPP */}
        <WhatsAppButton />
        
        <Footer />
      </body>
    </html>
  );
}