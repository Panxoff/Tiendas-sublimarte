// src/app/page.tsx
"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Sparkles,
  Upload,
  Shirt,
  Truck,
  Building2,
} from "lucide-react";

/* =========================================================
   COMPONENTES AUXILIARES (SVG)
========================================================= */

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

/* =========================================================
   DATA
========================================================= */

const products = [
  {
    name: "Poleras",
    subtitle: "Premium · 190 GSM",
    description:
      "Algodón peinado de alta calidad para estampados grandes, colores intensos y diseños personalizados.",
    price: "Desde $9.990",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Hoodies",
    subtitle: "Heavy · Oversize",
    description:
      "Prendas gruesas y cómodas pensadas para diseños protagonistas y looks streetwear.",
    price: "Desde $19.990",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Jockeys",
    subtitle: "Drill · 6 paneles",
    description:
      "Estructura firme y frontal ideal para logos, ilustraciones y diseños de alto contraste.",
    price: "Desde $8.990",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Tote Bags",
    subtitle: "Lona · 280 GSM",
    description:
      "Resistentes y versátiles. Una alternativa perfecta para marcas, eventos y uso diario.",
    price: "Desde $6.990",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Sube",
    description: "Envíanos tu diseño en PNG, JPG o PDF.",
    icon: Upload,
  },
  {
    number: "02",
    title: "Elige",
    description: "Selecciona la prenda, tamaño y cantidad.",
    icon: Shirt,
  },
  {
    number: "03",
    title: "Estampamos",
    description: "Imprimimos y prensamos tu diseño en DTF.",
    icon: Sparkles,
  },
  {
    number: "04",
    title: "Recibe",
    description: "Retira o recibe tu pedido donde estés.",
    icon: Truck,
  },
];

const benefits = [
  "Pedidos desde 1 unidad",
  "Colores intensos y alta definición",
  "Sin costo por cantidad de colores",
  "Envíos a Santiago y regiones",
];

const faqs = [
  {
    question: "¿Puedo pedir una sola polera?",
    answer:
      "Sí. Trabajamos desde 1 unidad, por lo que puedes personalizar una sola prenda sin necesidad de cumplir mínimos.",
  },
  {
    question: "¿Qué formato debe tener mi diseño?",
    answer:
      "Idealmente PNG con fondo transparente y buena resolución (300 DPI). También podemos revisar otros formatos antes de producir.",
  },
  {
    question: "¿Puedo estampar fotografías?",
    answer:
      "Sí. La impresión DTF permite trabajar diseños complejos, ilustraciones, fotografías y degradados con precisión fotográfica.",
  },
  {
    question: "¿Realizan pedidos para empresas?",
    answer:
      "Sí. Trabajamos pedidos mayoristas para marcas, empresas, eventos corporativos y merchandising.",
  },
];

/* =========================================================
   SUB-COMPONENTES
========================================================= */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">
      <span className="h-2 w-2 rounded-full bg-[#C8FF00]" />
      {children}
    </span>
  );
}

function ProductCard({ product }: { product: (typeof products)[number] }) {
  return (
    <Link
      href="/catalogo"
      className="group block overflow-hidden rounded-xl border border-black/10 bg-white transition duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-xl"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#E9E7E1]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />

        <div className="absolute left-4 top-4 rounded-full bg-[#C8FF00] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-black">
          DTF
        </div>

        <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black opacity-0 shadow-lg transition duration-300 group-hover:opacity-100">
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>

      <div className="p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
          {product.subtitle}
        </p>

        <h3 className="mt-2 text-xl font-bold tracking-tight text-[#111111]">
          {product.name}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-neutral-500">
          {product.description}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-4">
          <span className="text-sm font-bold text-[#111111]">{product.price}</span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#111111]">
            Ver producto →
          </span>
        </div>
      </div>
    </Link>
  );
}

/* =========================================================
   PÁGINA PRINCIPAL
========================================================= */

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#F7F5F0] text-[#111111]">
      {/* ================= HERO ================= */}
      <section className="relative px-5 pb-20 pt-12 md:px-8 md:pb-28 md:pt-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="max-w-xl">
            <SectionLabel>Estampado DTF personalizado</SectionLabel>

            <h1 className="mt-6 text-[clamp(3.2rem,7vw,7rem)] font-black leading-[0.88] tracking-[-0.07em]">
              TU DISEÑO.
              <br />
              TU PRENDA.
              <br />
              <span className="text-[#C8FF00] [text-shadow:2px_2px_0_#111111]">
                TU ESTILO.
              </span>
            </h1>

            <p className="mt-8 max-w-lg text-base leading-relaxed text-neutral-600 md:text-lg">
              Convertimos tus ideas en prendas reales. Estampado DTF de alta
              definición para poleras, hoodies, jockeys y tote bags sin mínimos.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/pedido"
                className="group inline-flex items-center gap-3 rounded-full bg-black px-7 py-4 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#C8FF00] hover:text-black"
              >
                Cotizar mi pedido
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/catalogo"
                className="inline-flex items-center rounded-full border border-black/20 bg-transparent px-7 py-4 text-xs font-bold uppercase tracking-wider transition hover:border-black hover:bg-white"
              >
                Ver catálogo
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {benefits.slice(0, 3).map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-2 text-[11px] font-medium text-neutral-500"
                >
                  <Check className="h-3.5 w-3.5 text-black" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>

          {/* HERO IMAGE BANNER */}
          <div className="relative">
            <div className="absolute -right-6 -top-6 z-10 hidden h-28 w-28 rotate-6 items-center justify-center rounded-full bg-[#C8FF00] text-center shadow-lg md:flex">
              <span className="text-[11px] font-black uppercase leading-tight text-black">
                Desde
                <br />
                1 unidad
              </span>
            </div>

            <div className="relative aspect-[4/4.5] overflow-hidden rounded-2xl bg-[#DAD8D1] shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80"
                alt="Prenda personalizada con estampado DTF"
                className="h-full w-full object-cover"
              />

              <div className="absolute bottom-5 left-5 rounded-lg bg-black px-4 py-3 text-white">
                <div className="font-mono text-[9px] uppercase tracking-widest text-[#C8FF00]">
                  PRINT / 001
                </div>
                <div className="mt-1 text-xs font-bold">
                  Hecho para destacar.
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-5 hidden rounded-lg border border-black/10 bg-white p-4 shadow-xl md:block">
              <div className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">
                DTF
              </div>
              <div className="mt-1 text-sm font-bold text-black">
                Alta definición
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MARQUEE / CINTA ================= */}
      <section className="overflow-hidden bg-black py-4 text-white">
        <div className="flex min-w-max items-center gap-8 whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex items-center gap-8">
              <span className="text-xs font-black uppercase tracking-[0.2em]">
                CUSTOM DTF
              </span>
              <span className="text-[#C8FF00]">✦</span>
              <span className="text-xs font-black uppercase tracking-[0.2em]">
                DESDE 1 UNIDAD
              </span>
              <span className="text-[#C8FF00]">✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CATÁLOGO ================= */}
      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <SectionLabel>Catálogo</SectionLabel>
              <h2 className="mt-4 max-w-2xl text-4xl font-black tracking-[-0.04em] md:text-6xl">
                ELIGE TU PRENDA.
              </h2>
            </div>

            <Link
              href="/catalogo"
              className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
            >
              Ver catálogo completo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= GALERÍA DE TRABAJOS ================= */}
      <section
        id="trabajos"
        className="bg-black px-5 py-20 text-white md:px-8 md:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <SectionLabel>Trabajos realizados</SectionLabel>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-6xl">
                HECHO PARA
                <br />
                DESTACAR.
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-white/50">
              Muestras reales de estampados producidos en nuestro taller.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-12">
            <div className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-neutral-800 md:col-span-5">
              <img
                src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80"
                alt="Polera personalizada"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#C8FF00]">
                  WORK / 001
                </span>
                <p className="mt-1 text-sm font-bold">Polera personalizada</p>
              </div>
            </div>

            <div className="group relative aspect-square overflow-hidden rounded-xl bg-neutral-800 md:col-span-4">
              <img
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80"
                alt="Streetwear Hoodie"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#C8FF00]">
                  WORK / 002
                </span>
                <p className="mt-1 text-sm font-bold">Streetwear</p>
              </div>
            </div>

            <div className="group relative aspect-square overflow-hidden rounded-xl bg-neutral-800 md:col-span-3">
              <img
                src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80"
                alt="Jockey Diseño Personalizado"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#C8FF00]">
                  WORK / 003
                </span>
                <p className="mt-1 text-sm font-bold">Diseño personalizado</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROCESO ================= */}
      <section
        id="proceso"
        className="border-b border-black/10 px-5 py-20 md:px-8 md:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Proceso</SectionLabel>

          <div className="mt-4 grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <h2 className="text-4xl font-black tracking-[-0.04em] md:text-6xl">
                DEL ARCHIVO
                <br />
                A LA PRENDA.
              </h2>

              <p className="mt-6 max-w-md text-sm leading-relaxed text-neutral-500">
                Queremos que personalizar una prenda sea simple. Envías el archivo
                y nosotros controlamos la presión y temperatura para un prensado óptimo.
              </p>

              <Link
                href="/pedido"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#C8FF00] hover:text-black"
              >
                Comenzar pedido
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid border-l border-black/10">
              {processSteps.map((step) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.number}
                    className="group grid grid-cols-[60px_1fr_auto] items-center gap-5 border-b border-black/10 px-5 py-7 transition hover:bg-white md:px-8"
                  >
                    <span className="font-mono text-xs text-neutral-400">
                      {step.number}
                    </span>

                    <div>
                      <h3 className="text-xl font-black tracking-tight">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm text-neutral-500">
                        {step.description}
                      </p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 transition group-hover:border-black group-hover:bg-[#C8FF00]">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA INTERMEDIO ================= */}
      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-2xl bg-[#C8FF00] p-8 md:p-16">
            <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-black px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-white">
                  <Upload className="h-3 w-3" />
                  Print ready
                </div>

                <h2 className="mt-6 max-w-3xl text-5xl font-black leading-[0.9] tracking-[-0.05em] md:text-7xl">
                  ¿YA TIENES
                  <br />
                  TU DISEÑO?
                </h2>

                <p className="mt-6 max-w-lg text-sm leading-relaxed text-black/70 md:text-base">
                  Súbelo, elige tu prenda y cotiza en segundos. Nosotros nos encargamos
                  del control de color y prensado.
                </p>
              </div>

              <div className="flex lg:justify-end">
                <Link
                  href="/pedido"
                  className="group inline-flex items-center gap-3 rounded-full bg-black px-7 py-4 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-white hover:text-black"
                >
                  Subir mi diseño
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VENTAJAS / CALIDAD ================= */}
      <section className="bg-white px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionLabel>Calidad DTF</SectionLabel>

            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-6xl">
              ESTAMPADOS QUE
              <br />
              SE SIENTEN BIEN.
            </h2>

            <p className="mt-6 max-w-lg text-sm leading-relaxed text-neutral-500 md:text-base">
              Colores vivos con base blanca de alta opacidad para telas oscuras,
              definición milimétrica en textos pequeños y resistencia al lavado constante.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                title: "Colores vivos",
                description: "Alta intensidad y excelente reproducción en RGB y CMYK.",
              },
              {
                title: "Alta definición",
                description: "Trazos finos, degradados y fotografías sin pixelación.",
              },
              {
                title: "Tacto suave",
                description: "Poliamida de microesferas con flexibilidad sobre la tela.",
              },
              {
                title: "Sin mínimos",
                description: "Personaliza desde una sola prenda con precio transparente.",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="rounded-xl border border-black/10 bg-[#F7F5F0] p-6"
              >
                <div className="font-mono text-[10px] text-neutral-400">
                  0{index + 1}
                </div>
                <h3 className="mt-8 text-lg font-black">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PEDIDOS MAYORISTAS / EMPRESAS ================= */}
      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-2xl bg-[#111111] text-white">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 md:p-14">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C8FF00] text-black">
                  <Building2 className="h-5 w-5" />
                </div>

                <h2 className="mt-8 text-4xl font-black tracking-[-0.04em] md:text-5xl">
                  ¿NECESITAS
                  <br />
                  MUCHAS PRENDAS?
                </h2>

                <p className="mt-5 max-w-md text-sm leading-relaxed text-white/50">
                  Trabajamos pedidos para marcas de ropa, empresas, eventos masivos,
                  equipos deportivos y merchandising con tarifas escalonadas.
                </p>

                <Link
                  href="/pedido"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-[#C8FF00]"
                >
                  Cotizar pedido grande
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="relative min-h-[300px] bg-neutral-900">
                <img
                  src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80"
                  alt="Pedidos personalizados para empresas"
                  className="absolute inset-0 h-full w-full object-cover opacity-70"
                />
                <div className="absolute bottom-6 right-6 rounded-lg bg-[#C8FF00] px-4 py-3 text-black">
                  <div className="font-mono text-[9px] uppercase tracking-widest">
                    CUSTOM
                  </div>
                  <div className="mt-1 text-xs font-black">
                    BUSINESS / 001
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section
        id="faq"
        className="border-t border-black/10 px-5 py-20 md:px-8 md:py-28"
      >
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <SectionLabel>Preguntas frecuentes</SectionLabel>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-5xl">
              ANTES DE PEDIR.
            </h2>
          </div>

          <div className="mt-12 divide-y divide-black/10 border-y border-black/10">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-base font-bold md:text-lg">
                  {faq.question}
                  <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-4 max-w-2xl pr-10 text-sm leading-relaxed text-neutral-500">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="bg-[#C8FF00] px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.25em]">
            DTF STUDIO / 001
          </div>

          <h2 className="mt-6 text-5xl font-black leading-[0.9] tracking-[-0.06em] md:text-8xl">
            HAGAMOS
            <br />
            UNA PRENDA.
          </h2>

          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-black/60 md:text-base">
            Tu diseño merece convertirse en algo real.
          </p>

          <Link
            href="/pedido"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-black px-8 py-4 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-white hover:text-black"
          >
            Comenzar pedido
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}