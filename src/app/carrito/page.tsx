"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Minus, Plus, X, ArrowRight, ShoppingBag, Tag } from "lucide-react";

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

type CartItem = {
  id: string;
  name: string;
  sku: string;
  color: string;
  size: string;
  price: number;
  qty: number;
  image: string;
};

const INITIAL_ITEMS: CartItem[] = [
  {
    id: "1",
    name: "Polera básica 190 GSM",
    sku: "PLR-190",
    color: "Negro",
    size: "M",
    price: 9990,
    qty: 2,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "2",
    name: "Hoodie heavy oversize",
    sku: "HDY-HVY",
    color: "Arena",
    size: "L",
    price: 19990,
    qty: 1,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=300&q=80",
  },
];

function formatCLP(value: number) {
  return value.toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });
}

export default function CarritoPage() {
  const [items, setItems] = useState<CartItem[]>(INITIAL_ITEMS);
  const [promo, setPromo] = useState("");

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.qty, 0), [items]);
  const envio = subtotal > 0 && subtotal < 30000 ? 3990 : 0;
  const total = subtotal + envio;

  function updateQty(id: string, delta: number) {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
    );
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  if (items.length === 0) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center" style={{ backgroundColor: COLOR.paper, color: COLOR.ink }}>
        <ShoppingBag className="h-10 w-10" style={{ color: COLOR.muted }} />
        <h1 className="mt-5 text-2xl font-bold tracking-[-0.03em]" style={{ fontFamily: "var(--font-display)" }}>
          Tu carrito está vacío.
        </h1>
        <p className="mt-2 max-w-xs text-sm" style={{ color: COLOR.muted }}>
          Explora el catálogo y personaliza tu primera prenda.
        </p>
        <Link
          href="/catalogo"
          className="mt-6 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white"
          style={{ backgroundColor: COLOR.ink }}
        >
          Ver catálogo
          <ArrowRight className="h-4 w-4" />
        </Link>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: COLOR.paper, color: COLOR.ink }}>
      <section className="px-5 py-10 md:px-8 md:py-14">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold tracking-[-0.03em] md:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
            Tu carrito
          </h1>
          <p className="mt-1 text-sm" style={{ color: COLOR.muted }}>
            {items.length} {items.length === 1 ? "producto" : "productos"}
          </p>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
            {/* Lista de items */}
            <div className="divide-y border-y" style={{ borderColor: COLOR.line }}>
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 py-5">
                  <div className="h-24 w-20 shrink-0 overflow-hidden rounded-md border" style={{ borderColor: COLOR.line, backgroundColor: COLOR.panel }}>
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: COLOR.muted }}>
                          {item.sku}
                        </p>
                        <h3 className="mt-0.5 text-sm font-bold">{item.name}</h3>
                        <p className="mt-1 text-xs" style={{ color: COLOR.muted }}>
                          {item.color} · Talla {item.size}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-neutral-400 transition-colors hover:text-black"
                        aria-label="Quitar producto"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center rounded-full border" style={{ borderColor: COLOR.line }}>
                        <button onClick={() => updateQty(item.id, -1)} className="flex h-8 w-8 items-center justify-center" aria-label="Restar">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-semibold">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="flex h-8 w-8 items-center justify-center" aria-label="Sumar">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="text-sm font-bold">{formatCLP(item.price * item.qty)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumen */}
            <div className="h-fit rounded-md border p-6" style={{ borderColor: COLOR.line, backgroundColor: "#fff" }}>
              <div className="flex items-center gap-[3px]">
                <span className="h-[6px] w-[6px] rounded-full" style={{ backgroundColor: COLOR.cyan }} />
                <span className="h-[6px] w-[6px] rounded-full" style={{ backgroundColor: COLOR.magenta }} />
                <span className="h-[6px] w-[6px] rounded-full" style={{ backgroundColor: COLOR.yellow }} />
              </div>
              <h2 className="mt-3 text-sm font-bold uppercase tracking-wider">Resumen del pedido</h2>

              <div className="mt-5 flex items-center gap-2">
                <div className="flex flex-1 items-center gap-2 rounded-full border px-4 py-2.5" style={{ borderColor: COLOR.line }}>
                  <Tag className="h-3.5 w-3.5" style={{ color: COLOR.muted }} />
                  <input
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                    placeholder="Código de descuento"
                    className="w-full bg-transparent text-xs outline-none"
                  />
                </div>
                <button className="rounded-full border px-4 py-2.5 text-xs font-semibold" style={{ borderColor: COLOR.ink }}>
                  Aplicar
                </button>
              </div>

              <div className="mt-6 space-y-3 border-t pt-5 text-sm" style={{ borderColor: COLOR.line }}>
                <div className="flex justify-between">
                  <span style={{ color: COLOR.muted }}>Subtotal</span>
                  <span className="font-semibold">{formatCLP(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: COLOR.muted }}>Envío</span>
                  <span className="font-semibold">{envio === 0 ? "Gratis" : formatCLP(envio)}</span>
                </div>
                {envio > 0 && (
                  <p className="text-[11px]" style={{ color: COLOR.muted }}>
                    Envío gratis sobre {formatCLP(30000)}.
                  </p>
                )}
              </div>

              <div className="mt-4 flex justify-between border-t pt-4 text-base font-bold" style={{ borderColor: COLOR.line }}>
                <span>Total</span>
                <span>{formatCLP(total)}</span>
              </div>

              <Link
                href="/checkout"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: COLOR.ink }}
              >
                Ir a pagar
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/catalogo"
                className="mt-3 block text-center text-xs font-semibold"
                style={{ color: COLOR.muted }}
              >
                Seguir comprando
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}