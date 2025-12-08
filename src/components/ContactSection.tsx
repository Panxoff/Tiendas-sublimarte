import Link from "next/link";
import { FaEnvelope, FaCalendarCheck } from "react-icons/fa";

export default function ContactSection() {
  return (
    <section className="py-24 bg-white border-t border-gray-50"> 
      <div className="container mx-auto px-4 text-center">
        
        <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6">
          ¿Listo para vivir la experiencia?
        </h2>
        
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Ya sea un evento corporativo, un matrimonio o un día de campo familiar, 
          tenemos el espacio ideal para ti. Revisa nuestros planes detallados.
        </p>
        
        <div className="flex justify-center">
          {/* BOTÓN ÚNICO Y DESTACADO */}
          <Link 
            href="/reservas"
            className="group relative inline-flex items-center justify-center gap-3 bg-primary text-dark font-bold text-lg px-10 py-4 rounded-full hover:brightness-105 transition-all shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
          >
            <FaCalendarCheck className="text-xl" />
            <span>Cotizar mi Evento</span>
            
            {/* Efecto de brillo sutil al pasar el mouse */}
            <div className="absolute inset-0 rounded-full bg-white/20 group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
          </Link>
        </div>

      </div>
    </section>
  );
}