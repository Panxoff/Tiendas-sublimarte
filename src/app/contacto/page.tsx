import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa";

export default function ContactoPage() {
  return (
    <main className="bg-white min-h-screen flex flex-col">
      
      {/* Cabecera (Mantenemos Dark para contraste inicial) */}
      <section className="bg-dark text-white py-20 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-widest mb-2">Contáctanos</h1>
        <p className="text-gray-300 text-lg font-light">Estamos listos para resolver tus dudas y planificar tu visita.</p>
      </section>

      <section className="container mx-auto px-4 py-20 flex-grow">
        
        {/* CONTENEDOR: Fondo Blanco + Sombra + Borde sutil para separar del fondo blanco */}
        <div className="grid grid-cols-1 lg:grid-cols-2 shadow-2xl rounded-[2rem] overflow-hidden bg-white max-w-6xl mx-auto border border-gray-100">
          
          {/* COLUMNA 1: Información (Fondo Blanco) */}
          <div className="p-10 md:p-14 flex flex-col justify-center bg-white">
            <h2 className="text-3xl font-bold text-dark mb-6 border-b-4 border-primary inline-block pb-2">
                Información de Contacto
            </h2>
            <p className="text-gray-600 mb-10 leading-relaxed text-lg">
              ¿Tienes dudas sobre nuestros programas o disponibilidad? 
              Escríbenos o llámanos directamente. ¡Te esperamos en Casona Culiprán!
            </p>

            <div className="space-y-8">
              {/* Ubicación */}
              <div className="flex items-start gap-4 group">
                <div className="bg-gray-50 group-hover:bg-primary transition-colors duration-300 text-dark p-4 rounded-full shrink-0 shadow-sm border border-gray-100">
                    <FaMapMarkerAlt size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-dark text-xl">Ubicación</h3>
                  <p className="text-gray-600 font-medium">Cam. Las Chilcas, Melipilla, RM.</p>
                </div>
              </div>

              {/* Teléfono */}
              <div className="flex items-start gap-4 group">
                <div className="bg-gray-50 group-hover:bg-primary transition-colors duration-300 text-dark p-4 rounded-full shrink-0 shadow-sm border border-gray-100">
                    <FaPhoneAlt size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-dark text-xl">Llámanos</h3>
                  <p className="text-gray-600 font-bold text-lg">+56 9 3068 0534</p>
                </div>
              </div>

              {/* Correo */}
              <div className="flex items-start gap-4 group">
                <div className="bg-gray-50 group-hover:bg-primary transition-colors duration-300 text-dark p-4 rounded-full shrink-0 shadow-sm border border-gray-100">
                    <FaEnvelope size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-dark text-xl">Correo</h3>
                  <a href="mailto:Fpolanco543@gmail.com" className="text-gray-600 font-medium hover:text-primary transition text-lg border-b border-transparent hover:border-primary">
                    reservascasonaculipran@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA 2: Mapa (Sin filtros, Ubicación Corregida) */}
          <div className="relative h-[500px] lg:h-auto w-full bg-gray-100">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3315.35809831226!2d-71.249016!3d-33.8030708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9663abbe51d67c8d%3A0x48d9cc5d78165ee!2sCasona%20Culipran!5e0!3m2!1ses!2scl!4v1763677775462!5m2!1ses!2scl" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full" // Quitamos grayscale
            ></iframe>
          </div>

        </div>
      </section>
    </main>
  );
}