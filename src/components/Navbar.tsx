"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // --- 1. ENLACES ---
  
  const homeLinks = [
    { name: "Sobre Nosotros", href: "/#about" },
    { name: "Galería", href: "/#gallery" },
    { name: "Reseñas", href: "/#reviews" },
    { name: "Contacto", href: "/contacto" },
    { name: "Reservar", href: "/reservas", isButton: true },
  ];

  // RESERVAS: Actualizado con Galería y nuevo orden
  const bookingLinks = [
    { name: "Inicio", href: "/" },
    { name: "Programa", href: "/reservas#programa" },
    { name: "Precios", href: "/reservas#precios" },
    { name: "Galería", href: "/galeria" }, // <--- NUEVA OPCIÓN
    { name: "Contacto", href: "/contacto" },
    { name: "Agendar", href: "/reservas#agendar", isButton: true },
  ];

  const contactLinks = [
    { name: "Inicio", href: "/" },
    { name: "Reservar", href: "/reservas", isButton: true },
  ];

  const galleryLinks = [
    { name: "Inicio", href: "/" },
    { name: "Contacto", href: "/contacto" },
    { name: "Reservar", href: "/reservas", isButton: true },
  ];

  // --- 2. SELECCIÓN DE ENLACES ---
  let currentLinks = homeLinks;
  if (pathname === "/reservas") currentLinks = bookingLinks;
  if (pathname === "/contacto") currentLinks = contactLinks;
  if (pathname === "/galeria") currentLinks = galleryLinks;

  // --- 3. LÓGICA DE SCROLL ---
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false); 

    if (href.includes("#")) {
      const targetId = href.split("#")[1];
      const targetElement = document.getElementById(targetId);
      const isSamePage = pathname === href.split("#")[0] || (pathname === "/" && href.startsWith("/#"));

      if (targetElement && isSamePage) {
        e.preventDefault(); 
        const headerOffset = 110; 
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  };

  return (
    <header className="bg-[#ebe0ca] sticky top-0 z-50 shadow-md font-sans transition-all">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center py-1">
          
          <Link href="/" className="-ml-4 flex items-center group">
            <Image
              src="/images/fotos/logo.png"
              alt="Casona Culipran"
              width={300}
              height={300}
              className="h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </Link>

          <button className="md:hidden text-dark text-3xl focus:outline-none p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>

          <div className={`${isOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row absolute md:relative top-full left-0 w-full md:w-auto bg-[#ebe0ca] md:bg-transparent items-center gap-1 md:gap-8 p-6 md:p-0 shadow-lg md:shadow-none transition-all border-t md:border-none border-gray-200`}>
            <ul className="flex flex-col md:flex-row gap-4 md:gap-8 text-center w-full md:w-auto items-center">
              {currentLinks.map((link) => {
                if (link.isButton) {
                    return (
                        <li key={link.name}>
                            <Link
                              href={link.href}
                              onClick={(e) => handleNavClick(e, link.href)}
                              className="bg-primary text-dark font-bold text-sm uppercase px-6 py-3 rounded-full hover:brightness-105 transition transform hover:scale-105 shadow-md inline-block"
                            >
                              {link.name}
                            </Link>
                        </li>
                    );
                }
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-sm font-bold uppercase tracking-wider text-gray-600 hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}