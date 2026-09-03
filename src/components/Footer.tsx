import Link from "next/link";

/* =========================================================
   PALETA — definida localmente en este archivo
========================================================= */
const COLOR = {
  ink: "#1C1B18",
  paper: "#ECEDE7",
  muted: "#8A897F",
  line: "#3A3934",
  cyan: "#00AEEF",
  magenta: "#E6007E",
  yellow: "#FFC800",
};

const COLUMNS = [
  {
    title: "Tienda",
    links: [
      { label: "Catálogo completo", href: "/catalogo" },
      { label: "Poleras", href: "/catalogo?categoria=poleras" },
      { label: "Hoodies", href: "/catalogo?categoria=hoodies" },
      { label: "Jockeys", href: "/catalogo?categoria=jockeys" },
      { label: "Tote bags", href: "/catalogo?categoria=tote-bags" },
    ],
  },
  {
    title: "Ayuda",
    links: [
      { label: "Cómo funciona", href: "/#proceso" },
      { label: "Preguntas frecuentes", href: "/#faq" },
      { label: "Pedidos para empresas", href: "/#empresas" },
      { label: "Contacto", href: "/contacto" },
    ],
  },
  {
    title: "SublimArte",
    links: [
      { label: "Sobre nosotros", href: "/nosotros" },
      { label: "Términos y condiciones", href: "/terminos" },
      { label: "Política de envíos", href: "/envios" },
    ],
  },
];

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer style={{ backgroundColor: COLOR.ink, color: COLOR.paper }}>
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          {/* Marca */}
          <div className="max-w-xs">
            <div className="flex items-center gap-[3px]">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLOR.cyan }} />
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLOR.magenta }} />
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLOR.yellow }} />
            </div>
            <h3 className="mt-4 text-2xl font-bold tracking-[-0.03em]" style={{ fontFamily: "var(--font-display)" }}>
              SublimArte
            </h3>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: COLOR.muted }}>
              Estampado DTF a color completo, con fidelidad de imprenta y sin
              mínimos de pedido. Tu diseño, prensado en tela.
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:bg-white/5"
              style={{ borderColor: COLOR.line }}
              aria-label="Instagram"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
          </div>

          {/* Columnas de navegación */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: COLOR.muted }}>
                  {col.title}
                </p>
                <ul className="mt-4 flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm transition-opacity hover:opacity-70">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Barra inferior */}
        <div
          className="mt-14 flex flex-col items-start justify-between gap-4 border-t pt-6 text-xs md:flex-row md:items-center"
          style={{ borderColor: COLOR.line, color: COLOR.muted }}
        >
          <span>© {new Date().getFullYear()} SublimArte. Todos los derechos reservados.</span>
          <div className="flex items-center gap-3 font-mono uppercase tracking-widest text-[10px]">
            <span>Webpay</span>
            <span style={{ color: COLOR.line }}>·</span>
            <span>Transferencia</span>
            <span style={{ color: COLOR.line }}>·</span>
            <span>Mercado Pago</span>
          </div>
        </div>
      </div>
    </footer>
  );
}