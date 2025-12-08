import Link from "next/link";

export default function Hero() {
  return (
    <section 
      id="inicio"
      className="relative h-[60rem] bg-cover bg-center flex items-center"
      style={{ 
        backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/images/fotos/piscina.jpg')" 
      }} 
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl p-4 mt-20">
          <p className="text-primary text-2xl font-medium mb-4">¡Ven a disfrutar!</p>
          <h2 className="text-white text-4xl md:text-6xl font-medium leading-tight mb-8">
            Tu tarde perfecta empieza en Casona Culiprán.
          </h2>
          <Link href="/reservas" className="bg-primary text-dark font-semibold uppercase py-4 px-8 rounded-full hover:bg-white hover:text-primary transition inline-block">
            Agenda tu hora
          </Link>
        </div>
      </div>
    </section>
  );
}