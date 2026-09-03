"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, SlidersHorizontal } from "lucide-react";

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
   DATA — reemplazar por fetch al catálogo real más adelante
========================================================= */
type Product = {
  slug: string;
  name: string;
  category: "Poleras" | "Hoodies" | "Jockeys" | "Tote bags";
  sku: string;
  price: number;
  image: string;
};

const PRODUCTS: Product[] = [
  { slug: "polera-basica-190", name: "Polera básica 190 GSM", category: "Poleras", sku: "PLR-190", price: 9990, image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80" },
  { slug: "polera-oversize", name: "Polera oversize", category: "Poleras", sku: "PLR-OVZ", price: 11990, image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=700&q=80" },
  { slug: "hoodie-heavy", name: "Hoodie heavy oversize", category: "Hoodies", sku: "HDY-HVY", price: 19990, image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=700&q=80" },
  { slug: "hoodie-crop", name: "Hoodie crop", category: "Hoodies", sku: "HDY-CRP", price: 21990, image: "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?auto=format&fit=crop&w=700&q=80" },
  { slug: "jockey-drill", name: "Jockey drill 6 paneles", category: "Jockeys", sku: "JKY-DRL", price: 8990, image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=700&q=80" },
  { slug: "jockey-trucker", name: "Jockey trucker", category: "Jockeys", sku: "JKY-TRK", price: 9490, image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=700&q=80" },
  { slug: "tote-bag-lona", name: "Tote bag lona 280 GSM", category: "Tote bags", sku: "TTB-280", price: 6990, image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=700&q=80" },
  { slug: "tote-bag-mini", name: "Tote bag mini", category: "Tote bags", sku: "TTB-MNI", price: 5990, image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=700&q=80" },
];

const CATEGORIES = ["Todos", "Poleras", "Hoodies", "Jockeys", "Tote bags"] as const;

function formatCLP(value: number) {
  return value.toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/catalogo/${product.slug}`}
      className="group block overflow-hidden rounded-md border transition-colors"
      style={{ borderColor: COLOR.line, backgroundColor: "#fff" }}
    >
      <div className="relative aspect-[4/5] overflow-hidden" style={{ backgroundColor: COLOR.panel }}>
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div className="absolute left-3 top-3 flex items-center gap-[3px] rounded-full bg-white/90 px-2 py-1">
          <span className="h-[5px] w-[5px] rounded-full" style={{ backgroundColor: COLOR.cyan }} />
          <span className="h-[5px] w-[5px] rounded-full" style={{ backgroundColor: COLOR.magenta }} />
          <span className="h-[5px] w-[5px] rounded-full" style={{ backgroundColor: COLOR.yellow }} />
        </div>
        <div
          className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full opacity-0 shadow-md transition duration-300 group-hover:opacity-100"
          style={{ backgroundColor: COLOR.ink, color: COLOR.paper }}
        >
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>

      <div className="p-4">
        <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: COLOR.muted }}>
          {product.sku}
        </p>
        <h3 className="mt-1.5 text-base font-bold tracking-tight" style={{ color: COLOR.ink }}>
          {product.name}
        </h3>
        <div className="mt-3 flex items-center justify-between border-t pt-3" style={{ borderColor: COLOR.line }}>
          <span className="text-sm font-bold" style={{ color: COLOR.ink }}>
            {formatCLP(product.price)}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: COLOR.muted }}>
            {product.category}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function CatalogoPage() {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>("Todos");
  const [sort, setSort] = useState<"relevancia" | "precio-asc" | "precio-desc">("relevancia");

  const filtered = useMemo(() => {
    let list = PRODUCTS;
    if (activeCategory !== "Todos") {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (sort === "precio-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "precio-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [activeCategory, sort]);

  return (
    <main style={{ backgroundColor: COLOR.paper, color: COLOR.ink }}>
      {/* Encabezado */}
      <section className="border-b px-5 pb-10 pt-12 md:px-8 md:pb-14 md:pt-16" style={{ borderColor: COLOR.line }}>
        <div className="mx-auto max-w-7xl">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: COLOR.muted }}>
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLOR.magenta }} />
            Catálogo
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-[-0.04em] md:text-6xl" style={{ fontFamily: "var(--font-display)" }}>
            Elige tu prenda.
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed md:text-base" style={{ color: COLOR.muted }}>
            {PRODUCTS.length} productos listos para personalizar con tu diseño en estampado DTF.
          </p>
        </div>
      </section>

      {/* Filtros */}
      <section className="sticky top-16 z-30 border-b px-5 py-4 md:top-20 md:px-8" style={{ borderColor: COLOR.line, backgroundColor: COLOR.paper }}>
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const active = cat === activeCategory;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="rounded-full border px-4 py-2 text-xs font-semibold transition-colors"
                  style={{
                    borderColor: active ? COLOR.ink : COLOR.line,
                    backgroundColor: active ? COLOR.ink : "transparent",
                    color: active ? COLOR.paper : COLOR.ink,
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-3.5 w-3.5" style={{ color: COLOR.muted }} />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="rounded-full border bg-transparent px-3 py-2 text-xs font-medium outline-none"
              style={{ borderColor: COLOR.line, color: COLOR.ink }}
            >
              <option value="relevancia">Relevancia</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
            </select>
          </div>
        </div>
      </section>

      {/* Grid de productos */}
      <section className="px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          {filtered.length === 0 ? (
            <p className="py-20 text-center text-sm" style={{ color: COLOR.muted }}>
              No hay productos en esta categoría todavía.
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {filtered.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}