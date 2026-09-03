"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight, Minus, Plus, Upload, Truck, RefreshCcw, ShieldCheck } from "lucide-react";

/* =========================================================
   PALETA — definida localmente en este archivo
========================================================= */
const COLOR = {
  paper: "#ECEDE7",
  panel: "#E1E3D9",
  ink: "#1C1B18",
  muted: "#6B6A63",
  line: "#C7C9BD",
  cyan: "#00AEEF",
  magenta: "#E6007E",
  yellow: "#FFC800",
};

/* =========================================================
   DATA — reemplazar por fetch al producto real (params.slug)
========================================================= */
const PRODUCT = {
  name: "Polera básica 190 GSM",
  sku: "PLR-190",
  category: "Poleras",
  price: 9990,
  description:
    "Algodón peinado de alta calidad, ideal para estampados grandes y colores intensos. Corte unisex con caída recta, pensado para que tu diseño DTF luzca con la máxima definición.",
  images: [
    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80",
  ],
  colors: [
    { name: "Blanco", hex: "#F5F5F0" },
    { name: "Negro", hex: "#1C1B18" },
    { name: "Arena", hex: "#D8CFBE" },
  ],
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
};

const RELATED = [
  { slug: "polera-oversize", name: "Polera oversize", price: 11990, image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=500&q=80" },
  { slug: "hoodie-heavy", name: "Hoodie heavy oversize", price: 19990, image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=500&q=80" },
  { slug: "jockey-drill", name: "Jockey drill 6 paneles", price: 8990, image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=500&q=80" },
];

function formatCLP(value: number) {
  return value.toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });
}

export default function ProductoPage({
  params,
}: {
  params: { producto: string };
}) {
  // TODO: reemplazar PRODUCT (mock) por un fetch real usando params.producto
  // ej: const data = await getProductoPorSlug(params.producto)
  const [activeImage, setActiveImage] = useState(0);
  const [color, setColor] = useState(PRODUCT.colors[0].name);
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [fileName, setFileName] = useState<string | null>(null);
  const [openInfo, setOpenInfo] = useState<string | null>("detalle");

  return (
    <main style={{ backgroundColor: COLOR.paper, color: COLOR.ink }}>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-5 pt-6 md:px-8">
        <div className="flex items-center gap-1.5 text-xs" style={{ color: COLOR.muted }}>
          <Link href="/" className="hover:opacity-70">Inicio</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/catalogo" className="hover:opacity-70">Catálogo</Link>
          <ChevronRight className="h-3 w-3" />
          <span style={{ color: COLOR.ink }}>{PRODUCT.name}</span>
        </div>
      </div>

      {/* Detalle principal */}
      <section className="px-5 py-8 md:px-8 md:py-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          {/* Galería */}
          <div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-md border" style={{ borderColor: COLOR.line, backgroundColor: COLOR.panel }}>
              <img src={PRODUCT.images[activeImage]} alt={PRODUCT.name} className="h-full w-full object-cover" />
              <div className="absolute left-4 top-4 flex items-center gap-[3px] rounded-full bg-white/90 px-2.5 py-1.5">
                <span className="h-[6px] w-[6px] rounded-full" style={{ backgroundColor: COLOR.cyan }} />
                <span className="h-[6px] w-[6px] rounded-full" style={{ backgroundColor: COLOR.magenta }} />
                <span className="h-[6px] w-[6px] rounded-full" style={{ backgroundColor: COLOR.yellow }} />
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {PRODUCT.images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(i)}
                  className="aspect-square overflow-hidden rounded-md border transition-colors"
                  style={{ borderColor: activeImage === i ? COLOR.ink : COLOR.line }}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info y compra */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: COLOR.muted }}>
              {PRODUCT.sku} · {PRODUCT.category}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-[-0.03em] md:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
              {PRODUCT.name}
            </h1>
            <p className="mt-3 text-2xl font-bold">{formatCLP(PRODUCT.price)}</p>
            <p className="mt-5 max-w-md text-sm leading-relaxed" style={{ color: COLOR.muted }}>
              {PRODUCT.description}
            </p>

            {/* Color */}
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-wider">Color: <span style={{ color: COLOR.muted }}>{color}</span></p>
              <div className="mt-3 flex gap-2.5">
                {PRODUCT.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.name)}
                    className="h-9 w-9 rounded-full border-2 transition-transform"
                    style={{
                      backgroundColor: c.hex,
                      borderColor: color === c.name ? COLOR.magenta : "transparent",
                      boxShadow: `0 0 0 1px ${COLOR.line}`,
                    }}
                    aria-label={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Talla */}
            <div className="mt-7">
              <p className="text-xs font-semibold uppercase tracking-wider">Talla</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {PRODUCT.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className="flex h-10 w-12 items-center justify-center rounded-md border text-sm font-semibold transition-colors"
                    style={{
                      borderColor: size === s ? COLOR.ink : COLOR.line,
                      backgroundColor: size === s ? COLOR.ink : "transparent",
                      color: size === s ? COLOR.paper : COLOR.ink,
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Subir diseño */}
            <div className="mt-7">
              <p className="text-xs font-semibold uppercase tracking-wider">Tu diseño</p>
              <label
                className="mt-3 flex cursor-pointer items-center gap-3 rounded-md border border-dashed px-4 py-4 text-sm transition-colors hover:bg-white/50"
                style={{ borderColor: COLOR.line }}
              >
                <Upload className="h-4 w-4 shrink-0" style={{ color: COLOR.muted }} />
                <span style={{ color: fileName ? COLOR.ink : COLOR.muted }}>
                  {fileName ?? "Sube tu archivo PNG, JPG o PDF"}
                </span>
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg,.pdf"
                  className="hidden"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
                />
              </label>
            </div>

            {/* Cantidad + CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-full border" style={{ borderColor: COLOR.line }}>
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-11 w-11 items-center justify-center"
                  aria-label="Restar"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-semibold">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="flex h-11 w-11 items-center justify-center"
                  aria-label="Sumar"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              <button
                className="inline-flex flex-1 items-center justify-center rounded-full px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: COLOR.ink }}
              >
                Agregar al carrito — {formatCLP(PRODUCT.price * qty)}
              </button>
            </div>
            {!size && (
              <p className="mt-2 text-[11px]" style={{ color: COLOR.magenta }}>
                Selecciona una talla para continuar.
              </p>
            )}

            {/* Garantías */}
            <div className="mt-8 grid grid-cols-3 gap-3 border-t pt-6" style={{ borderColor: COLOR.line }}>
              {[
                { icon: Truck, label: "Envío a todo Chile" },
                { icon: RefreshCcw, label: "Cambios en 7 días" },
                { icon: ShieldCheck, label: "Impresión garantizada" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-start gap-2">
                  <item.icon className="h-4 w-4" style={{ color: COLOR.muted }} />
                  <span className="text-[11px] leading-tight" style={{ color: COLOR.muted }}>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Acordeón info */}
            <div className="mt-8 divide-y border-t border-b" style={{ borderColor: COLOR.line }}>
              {[
                { id: "detalle", title: "Detalle del producto", body: "Tela 100% algodón peinado, 190 GSM, corte unisex, costuras reforzadas." },
                { id: "cuidado", title: "Cuidado de la prenda", body: "Lavar con agua fría, del revés. No usar secadora ni planchar sobre el estampado." },
                { id: "envio", title: "Envío y tiempos de producción", body: "Producción 2-4 días hábiles. Envío 1-3 días en Santiago, 3-7 en regiones." },
              ].map((item) => (
                <div key={item.id}>
                  <button
                    onClick={() => setOpenInfo(openInfo === item.id ? null : item.id)}
                    className="flex w-full items-center justify-between py-4 text-left text-sm font-semibold"
                  >
                    {item.title}
                    <Plus className={`h-3.5 w-3.5 transition-transform ${openInfo === item.id ? "rotate-45" : ""}`} />
                  </button>
                  {openInfo === item.id && (
                    <p className="pb-4 text-sm leading-relaxed" style={{ color: COLOR.muted }}>{item.body}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Relacionados */}
      <section className="border-t px-5 py-14 md:px-8 md:py-20" style={{ borderColor: COLOR.line }}>
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold tracking-[-0.03em] md:text-3xl" style={{ fontFamily: "var(--font-display)" }}>
            También te puede interesar
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {RELATED.map((p) => (
              <Link
                key={p.slug}
                href={`/catalogo/${p.slug}`}
                className="group block overflow-hidden rounded-md border"
                style={{ borderColor: COLOR.line, backgroundColor: "#fff" }}
              >
                <div className="aspect-[4/5] overflow-hidden" style={{ backgroundColor: COLOR.panel }}>
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold">{p.name}</h3>
                  <p className="mt-1 text-sm font-semibold" style={{ color: COLOR.muted }}>{formatCLP(p.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}