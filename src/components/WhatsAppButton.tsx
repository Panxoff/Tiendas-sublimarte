import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <a
      href="https://api.whatsapp.com/message/HZGR5NRB5WQNO1?autoload=1&app_absent=0&utm_source=ig"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-[9999] group" // z-index alto para estar sobre todo
      aria-label="Contactar por WhatsApp"
    >
      <div className="relative flex items-center justify-center">
        {/* Efecto de Onda (Ping) para llamar la atención sutilmente */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping duration-[2000ms]"></span>
        
        {/* Botón Principal */}
        <div className="relative bg-[#25D366] hover:bg-[#20b858] text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform group-hover:scale-110 flex items-center justify-center">
          <FaWhatsapp size={35} />
        </div>

        {/* Tooltip opcional (aparece al pasar el mouse) */}
        <div className="absolute left-full ml-4 bg-white text-dark text-xs font-bold px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          ¡Hablemos!
          {/* Triangulito del tooltip */}
          <div className="absolute top-1/2 right-full -mt-1 border-4 border-transparent border-r-white"></div>
        </div>
      </div>
    </a>
  );
}