import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Definimos las calidades permitidas:
    // 75: Por defecto
    // 90: Lo usaste en la grilla
    // 100: Lo usaste en el lightbox (pantalla completa)
    qualities: [75, 90, 100],
  },
};

export default nextConfig;