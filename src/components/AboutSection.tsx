import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        
        {/* Texto Original Restaurado */}
        <div className="w-full md:w-1/2">
          <h2 className="text-primary font-bold uppercase tracking-widest mb-2">Nuestra Historia</h2>
          <h3 className="text-4xl font-bold text-dark mb-6">Más que una parcela, un lugar para desconectar</h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            En Casona Culiprán, nos dedicamos a ofrecer un refugio natural cerca de la ciudad. 
            Nacimos con la idea de brindar un espacio exclusivo donde familias y empresas puedan 
            disfrutar de la privacidad y la naturaleza sin preocupaciones.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Contamos con amplias áreas verdes, piscina y quincho totalmente equipado para hacer 
            de tu evento un día inolvidable.
          </p>
        </div>

        {/* Imagen decorativa */}
        <div className="w-full md:w-1/2 relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl group">
           <Image 
             src="/images/fotos/atardecer.jpeg"
             alt="Casona Culiprán al atardecer" 
             fill 
             className="object-cover transition-transform duration-700 group-hover:scale-105" 
             sizes="(max-width: 768px) 100vw, 50vw"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

      </div>
    </section>
  );
}