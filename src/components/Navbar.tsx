"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";

/* =========================================================
   PALETA — definida localmente en este archivo
========================================================= */
const COLOR = {
  paper: "#ECEDE7",
  ink: "#1C1B18",
  muted: "#6B6A63",
  line: "#C7C9BD",
  cyan: "#00AEEF",
  magenta: "#E6007E",
  yellow: "#FFC800",
};

const NAV_LINKS = [
  { label: "Catálogo", href: "/catalogo" },
  { label: "Cómo funciona", href: "/#proceso" },
  { label: "Empresas", href: "/#empresas" },
  { label: "Preguntas", href: "/#faq" },
];

function CmykMark() {
  return (
    <span className="inline-flex items-center gap-[3px]">
      <span className="h-[6px] w-[6px] rounded-full" style={{ backgroundColor: COLOR.cyan }} />
      <span className="h-[6px] w-[6px] rounded-full" style={{ backgroundColor: COLOR.magenta }} />
      <span className="h-[6px] w-[6px] rounded-full" style={{ backgroundColor: COLOR.yellow }} />
    </span>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const cartCount = 0; // TODO: conectar a estado real del carrito

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{ backgroundColor: COLOR.paper, borderColor: COLOR.line }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <CmykMark />
          <span
            className="text-lg font-bold tracking-[-0.03em] md:text-xl"
            style={{ color: COLOR.ink, fontFamily: "var(--font-display)" }}
          >
            SublimArte
          </span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium transition-opacity hover:opacity-60"
              style={{ color: COLOR.ink }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Acciones */}
        <div className="flex items-center gap-3">
          <Link
            href="/carrito"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:bg-white"
            style={{ borderColor: COLOR.line, color: COLOR.ink }}
            aria-label="Carrito"
          >
            <ShoppingBag className="h-4 w-4" />
            {cartCount > 0 && (
              <span
                className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white"
                style={{ backgroundColor: COLOR.magenta }}
              >
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            href="/pedido"
            className="hidden items-center rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-90 md:inline-flex"
            style={{ backgroundColor: COLOR.ink }}
          >
            Cotizar pedido
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-full border md:hidden"
            style={{ borderColor: COLOR.line, color: COLOR.ink }}
            aria-label="Abrir menú"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Nav mobile */}
      {open && (
        <div
          className="border-t px-5 py-5 md:hidden"
          style={{ borderColor: COLOR.line, backgroundColor: COLOR.paper }}
        >
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium"
                style={{ color: COLOR.ink }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/pedido"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-white"
              style={{ backgroundColor: COLOR.ink }}
            >
              Cotizar pedido
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}