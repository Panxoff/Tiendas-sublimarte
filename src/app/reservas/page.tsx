import Image from "next/image";
import BookingWidget from "@/components/BookingWidget";
import { 
  FaUsers, FaClock, FaPaw, 
  FaSwimmingPool, FaUtensils, FaTree, 
  FaUmbrellaBeach, FaTable, FaGlassMartiniAlt, 
  FaToilet, FaAirbnb 
} from "react-icons/fa";

export default function ReservasPage() {
  return (
    <main className="min-h-screen font-sans">
      
      {/* 1. HERO CON IMAGEN DE FONDO */}
      <section className="relative pt-40 pb-28 text-center px-4 rounded-b-[3rem] overflow-hidden">
        <div className="absolute inset-0 z-0">
           <Image
              src="/images/fotos/atardecer.jpeg"
              alt="Casona al atardecer"
              fill
              className="object-cover filter brightness-[0.5] blur-[3px] scale-105"
              priority
           />
           <div className="absolute inset-0 bg-black/20 mix-blend-overlay"></div>
        </div>
        <div className="relative z-10">
            <span className="inline-block mb-6 text-white/90 font-bold tracking-widest uppercase text-xs bg-dark/30 px-4 py-1 rounded-full backdrop-blur-md border border-white/10">
              Temporada 2024-2025
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 uppercase tracking-widest drop-shadow-lg">
              Tu Evento en Casona culipran
            </h1>
            <div className="w-20 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
            <p className="text-xl md:text-2xl text-gray-100 font-light max-w-3xl mx-auto drop-shadow-md leading-relaxed">
              Un espacio exclusivo diseñado para conectar con la naturaleza, celebrar la vida y disfrutar en familia.
            </p>
        </div>
      </section>

      {/* 2. SECCIÓN PROGRAMA */}
      <section id="programa" className="py-24 bg-white scroll-mt-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-widest uppercase text-sm">Nuestras Instalaciones</span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mt-2">Todo lo que incluye tu arriendo</h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-6 rounded-full"></div>
          </div>

          {/* GRILLA DE CARACTERÍSTICAS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start gap-4 p-5 rounded-2xl hover:bg-cream/50 transition-all duration-300 group">
              <div className="bg-cream p-4 rounded-full text-dark shrink-0 group-hover:bg-primary group-hover:text-dark transition-colors">
                <FaSwimmingPool size={22} />
              </div>
              <div>
                <h3 className="font-bold text-dark text-lg">Piscina Exclusiva</h3>
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">16x6 metros con profundidad máxima de 2m para disfrutar.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-2xl hover:bg-cream/50 transition-all duration-300 group">
              <div className="bg-cream p-4 rounded-full text-dark shrink-0 group-hover:bg-primary group-hover:text-dark transition-colors">
                <FaUmbrellaBeach size={22} />
              </div>
              <div>
                <h3 className="font-bold text-dark text-lg">Zona de Relax</h3>
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">Reposeras disponibles para tomar el sol cómodamente.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-2xl hover:bg-cream/50 transition-all duration-300 group">
              <div className="bg-cream p-4 rounded-full text-dark shrink-0 group-hover:bg-primary group-hover:text-dark transition-colors">
                <FaUtensils size={22} />
              </div>
              <div>
                <h3 className="font-bold text-dark text-lg">Quincho Full</h3>
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">Parrilla amplia y lavaplatos integrado para tus asados.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-2xl hover:bg-cream/50 transition-all duration-300 group">
              <div className="bg-cream p-4 rounded-full text-dark shrink-0 group-hover:bg-primary group-hover:text-dark transition-colors">
                <FaTable size={22} />
              </div>
              <div>
                <h3 className="font-bold text-dark text-lg">Terraza Techada</h3>
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">Espacio amplio con sombra, mesones y bancas.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-2xl hover:bg-cream/50 transition-all duration-300 group">
              <div className="bg-cream p-4 rounded-full text-dark shrink-0 group-hover:bg-primary group-hover:text-dark transition-colors">
                <FaGlassMartiniAlt size={22} />
              </div>
              <div>
                <h3 className="font-bold text-dark text-lg">Equipamiento Frío</h3>
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">Congelador y Minibar a tu completa disposición.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-2xl hover:bg-cream/50 transition-all duration-300 group">
              <div className="bg-cream p-4 rounded-full text-dark shrink-0 group-hover:bg-primary group-hover:text-dark transition-colors">
                <FaTree size={22} />
              </div>
              <div>
                <h3 className="font-bold text-dark text-lg">Áreas Verdes</h3>
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">5.600 mts² de naturaleza y Mesa de Ping Pong.</p>
              </div>
            </div>
             <div className="flex items-start gap-4 p-5 rounded-2xl hover:bg-cream/50 transition-all duration-300 group">
              <div className="bg-cream p-4 rounded-full text-dark shrink-0 group-hover:bg-primary group-hover:text-dark transition-colors">
                <FaToilet size={22} />
              </div>
              <div>
                <h3 className="font-bold text-dark text-lg">Baños Equipados</h3>
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">6 wc de mujeres y 2 wc de hombres + 2 urinarios.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-2xl hover:bg-cream/50 transition-all duration-300 group">
              <div className="bg-cream p-4 rounded-full text-dark shrink-0 group-hover:bg-primary group-hover:text-dark transition-colors">
                <FaUtensils size={22} />
              </div>
              <div>
                <h3 className="font-bold text-dark text-lg">Cocina Opcional</h3>
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">Se puede facilitar cocina en caso de ser necesario.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-green-50/50 hover:bg-green-100/50 transition-all duration-300 border border-green-100/50 group">
              <div className="bg-green-100 p-4 rounded-full text-green-700 shrink-0 group-hover:bg-green-200 transition-colors">
                <FaPaw size={22} />
              </div>
              <div>
                <h3 className="font-bold text-green-900 text-lg">Pet Friendly</h3>
                <p className="text-green-800/80 text-sm mt-2 leading-relaxed">Tus mascotas son bienvenidas (Sin ingreso a piscina).</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-cream/50 transition-colors col-span-1 md:col-span-2 lg:col-span-3 border-t border-gray-100 mt-8 pt-10 justify-center">
                <div className="flex items-center gap-3 bg-[#ebe0ca]/50 px-8 py-4 rounded-full shadow-sm">
                    <FaClock className="text-dark text-xl" />
                    <span className="font-bold text-dark text-lg">Horario del recinto: 10:00 hrs a 20:00 hrs</span>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECCIÓN PRECIOS (ACTUALIZADA: 2 TARJETAS) */}
      <section id="precios" className="py-24 bg-[#FAF3E0] scroll-mt-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

        <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-dark uppercase tracking-wide">Opciones de Reserva</h2>
                <p className="text-gray-600 mt-4 text-lg">Elige entre pasar el día con nosotros o alojarte.</p>
            </div>

            {/* GRID DE 2 TARJETAS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                
                {/* TARJETA 1: ARRIENDO DIARIO (Izquierda) */}
                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-dark/5 border border-white/50 overflow-hidden relative transform transition-all hover:-translate-y-2 duration-300 flex flex-col">
                    
                    <div className="absolute top-0 right-0 bg-primary text-dark text-xs font-bold px-6 py-3 rounded-bl-2xl uppercase tracking-wider shadow-sm">
                        Por el día
                    </div>

                    <div className="p-10 md:p-14 text-center flex-grow flex flex-col justify-between">
                        <div>
                            <h3 className="text-gray-400 text-xs uppercase tracking-[0.25em] font-bold mb-6">Arriendo Diario</h3>
                            
                            <div className="flex justify-center items-center gap-1 mb-8 h-[60px]">
                                <span className="text-5xl font-bold text-dark/90 tracking-tight">$150.000</span>
                            </div>
                            
                            <div className="flex flex-col gap-5 items-center justify-center mb-12">
                                <div className="flex items-center gap-3 bg-cream px-6 py-3 rounded-full">
                                    <FaUsers className="text-dark/70 text-xl" />
                                    <span className="text-dark font-bold text-lg">Hasta 25 Personas</span>
                                </div>
                                <div className="text-gray-500 text-base">
                                    Persona adicional: <strong className="text-dark font-bold">$7.000 c/u</strong>
                                </div>
                            </div>
                        </div>

                        <a href="#agendar" className="block w-full bg-dark text-white font-bold py-5 rounded-2xl hover:bg-gray-900 transition-all shadow-md hover:shadow-lg uppercase text-sm tracking-[0.2em]">
                            Consultar Disponibilidad
                        </a>
                    </div>
                </div>

                {/* TARJETA 2: AIRBNB (Derecha) */}
                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-dark/5 border border-white/50 overflow-hidden relative transform transition-all hover:-translate-y-2 duration-300 flex flex-col">
                    
                    <div className="absolute top-0 right-0 bg-[#FF5A5F] text-white text-xs font-bold px-6 py-3 rounded-bl-2xl uppercase tracking-wider shadow-sm">
                        Estadía
                    </div>

                    <div className="p-10 md:p-14 text-center flex-grow flex flex-col justify-between">
                        <div>
                            <h3 className="text-gray-400 text-xs uppercase tracking-[0.25em] font-bold mb-6">Alojamiento</h3>
                            
                            {/* Sin precio fijo, texto de llamada */}
                            <div className="flex justify-center items-center gap-1 mb-8 h-[60px]">
                                <span className="text-3xl font-bold text-dark/90 tracking-tight">Cotizar Estadía</span>
                            </div>
                            
                            <div className="flex flex-col gap-5 items-center justify-center mb-12">
                                <div className="flex items-center gap-3 bg-cream px-6 py-3 rounded-full">
                                    <FaUsers className="text-dark/70 text-xl" />
                                    <span className="text-dark font-bold text-lg">Hospedaje Exclusivo</span>
                                </div>
                                <div className="text-gray-500 text-base px-4 leading-relaxed">
                                    ¿Buscas quedarte varias noches? Revisa disponibilidad y precios directamente en nuestra plataforma.
                                </div>
                            </div>
                        </div>

                        <a 
                            href="https://www.airbnb.cl/rooms/1411230218446296432?search_mode=regular_search&adults=1&check_in=2025-12-14&check_out=2025-12-19&children=0&infants=0&pets=0&source_impression_id=p3_1763678548_P38IC9pzR1GXAQly&previous_page_section_name=1000&federated_search_id=36073bb0-b812-42cd-827f-c97d91b5662d" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full bg-dark text-white font-bold py-5 rounded-2xl hover:bg-[#FF5A5F] transition-all duration-300 shadow-md hover:shadow-lg uppercase text-sm tracking-[0.2em] flex items-center justify-center gap-3"
                        >
                            <FaAirbnb size={24} />
                            Ver en Airbnb
                        </a>
                    </div>
                </div>

            </div>
        </div>
      </section>

      {/* 4. SECCIÓN AGENDA */}
      <section id="agendar" className="py-24 bg-white scroll-mt-24">
        <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
                <span className="bg-[#ebe0ca] text-dark px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest">Agenda Web</span>
                <h2 className="text-4xl font-bold text-dark mt-6 mb-6">
                    Reserva tu Fecha (Por el día)
                </h2>
                <p className="text-gray-600 text-xl max-w-xl mx-auto font-light leading-relaxed">
                    Selecciona un día disponible en <strong className="text-primary">azul</strong> para solicitar tu evento por el día.
                </p>
            </div>
            <BookingWidget />
        </div>
      </section>

    </main>
  );
}