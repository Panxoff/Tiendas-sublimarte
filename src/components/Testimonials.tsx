import { FaStar, FaGoogle, FaQuoteLeft } from "react-icons/fa";

export default function Testimonials() {
  const reviews = [
    {
      name: "Melissa Saavedra",
      date: "Hace un tiempo",
      stars: 5,
      text: "Muy hermosa y tranquilaa!! Bien equipada, una piscina enorme😍 lo recomiendo totalmente para disfrutar de un día en familia o para divertirse con amigosss.",
      initial: "M"
    },
    {
      name: "Javiera Adriana Carrasco",
      date: "Hace un tiempo",
      stars: 5,
      text: "Muy lindo el lugar, amplio y tal cual se ve en las fotos. La piscina estaba en excelente estado, el quincho grande y el lugar donde comer también muy amplio y seguro para los niños. Lo recomiendo al 100%.",
      initial: "J"
    },
    {
      name: "Catherine Roman",
      date: "Hace un tiempo",
      stars: 5,
      text: "Un lugar perfecto para compartir con amigos y/o familia. Celebre mi baby shower y estuvo perfecto, super comodo y los dueños muy atentos.",
      initial: "C"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Título de la Sección */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-dark uppercase tracking-wide flex items-center justify-center gap-3">
            <span className="text-primary text-4xl"><FaQuoteLeft /></span>
            Lo que dicen nuestros clientes
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4 text-gray-500 font-medium">
            <FaGoogle className="text-red-500" />
            <span>Basado en reseñas de Google</span>
          </div>
        </div>

        {/* Grid de Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div 
              key={index} 
              className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 flex flex-col"
            >
              {/* Cabecera de la Reseña */}
              <div className="flex items-center gap-4 mb-4">
                {/* Avatar con inicial */}
                <div className="w-12 h-12 bg-primary text-dark font-bold rounded-full flex items-center justify-center text-xl">
                  {review.initial}
                </div>
                <div>
                  <h4 className="font-bold text-dark text-sm uppercase">{review.name}</h4>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>
                <FaGoogle className="ml-auto text-gray-300 text-xl" />
              </div>

              {/* Estrellas */}
              <div className="flex gap-1 mb-4 text-yellow-400">
                {[...Array(review.stars)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              {/* Texto */}
              <p className="text-gray-600 text-sm leading-relaxed italic">
                "{review.text}"
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}