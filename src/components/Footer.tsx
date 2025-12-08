import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaFacebookF, FaAirbnb, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#ebe0ca] pt-10 pb-6 text-dark border-t border-dark/5 font-sans">
      <div className="container mx-auto px-4">
        
        {/* PARTE SUPERIOR: 3 Columnas (Contacto - Logo - Redes) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-8">
          
          {/* 1. CONTACTO (Izquierda) */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3 order-2 md:order-1">
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-1">Contacto</h4>
            
            {/* Ubicación */}
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <FaMapMarkerAlt className="text-primary" />
              <span>Cam. Las Chilcas, Melipilla</span>
            </div>
            
            {/* Teléfono */}
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <FaPhoneAlt className="text-primary" />
              <span>+56 9 3068 0534</span>
            </div>

            {/* Correo Principal */}
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <FaEnvelope className="text-primary" />
              <a href="mailto:reservascasonaculipran@gmail.com" className="hover:text-primary transition-colors">
                reservascasonaculipran@gmail.com
              </a>
            </div>
          </div>

          {/* 2. LOGO (Centro) */}
          <div className="flex justify-center order-1 md:order-2">
            <Link href="/">
              <Image 
                src="/images/fotos/logo.png" 
                alt="Casona Culiprán" 
                width={180} 
                height={180} 
                className="h-24 w-auto object-contain hover:scale-105 transition-transform duration-300" 
              />
            </Link>
          </div>

          {/* 3. REDES SOCIALES (Derecha) */}
          <div className="flex flex-col items-center md:items-end gap-3 order-3">
            <span className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-1">Síguenos</span>
            <div className="flex gap-3">
              
              {/* INSTAGRAM */}
              <a 
                href="https://www.instagram.com/casonaculipran/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white p-3 rounded-full text-dark hover:bg-primary hover:text-dark transition shadow-sm transform hover:-translate-y-1"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>

              {/* FACEBOOK */}
              <a 
                href="https://www.facebook.com/people/Arriendo-Parcela-con-Piscina-Melipilla/61578386309264/#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white p-3 rounded-full text-dark hover:bg-blue-600 hover:text-white transition shadow-sm transform hover:-translate-y-1"
                aria-label="Facebook"
              >
                <FaFacebookF size={18} />
              </a>

              {/* AIRBNB */}
              <a 
                href="https://www.airbnb.cl/rooms/1411230218446296432?search_mode=regular_search&adults=1&check_in=2025-12-14&check_out=2025-12-19&children=0&infants=0&pets=0&source_impression_id=p3_1763678548_P38IC9pzR1GXAQly&previous_page_section_name=1000&federated_search_id=36073bb0-b812-42cd-827f-c97d91b5662d" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white p-3 rounded-full text-dark hover:bg-[#FF5A5F] hover:text-white transition shadow-sm transform hover:-translate-y-1"
                aria-label="Airbnb"
              >
                <FaAirbnb size={18} />
              </a>

            </div>
          </div>
        </div>

        {/* PARTE INFERIOR */}
        <div className="flex flex-col items-center w-full">
            
            {/* Línea divisoria y contenido inferior */}
            <div className="border-t border-dark/10 pt-6 flex flex-col lg:flex-row justify-between items-center gap-4 text-center lg:text-left w-full">
            
            {/* Copyright */}
            <p className="text-xs text-gray-500 font-medium w-full lg:w-1/2 lg:text-left">
                &copy; {new Date().getFullYear()} Casona Culiprán. Todos los derechos reservados.
            </p>

            {/* Dev Credit + Mensaje Hecho con Amor */}
            <div className="flex flex-col items-center lg:items-end w-full lg:w-1/2 space-y-1">
                
                <p className="text-xs text-gray-400 flex items-center gap-1">
                    Hecho con amor para eventos inolvidables <span className="text-red-500 animate-pulse">❤</span>
                </p>

                {/* CAMBIO: Se aumentó el tamaño de text-[10px] a text-xs para igualar */}
                <p className="text-xs text-gray-400 font-normal"> 
                Dev: Francisco Polanco
                </p>
                
                {/* CAMBIO: Se aumentó el tamaño de text-[10px] a text-xs y el icono a size={12} */}
                <a href="mailto:Fpolanco543@gmail.com" className="text-xs text-gray-400 hover:text-primary transition-colors flex items-center gap-1">
                    <FaEnvelope size={12} /> Fpolanco543@gmail.com
                </a>
            </div>
            
            </div>
        </div>

      </div>
    </footer>
  );
}