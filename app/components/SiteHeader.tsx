"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { href: "#perfil", label: "Perfil" },
  { href: "#trabajo", label: "Trabajo" },
  { href: "#contacto", label: "Contacto" },
];

// Cabecera de la portada: antes vivía sobre una foto a pantalla completa
// y usaba mix-blend-difference para no perder contraste con lo que hubiera
// debajo. El hero ya no es una foto a sangre completa (ahora es un óvalo
// sobre fondo papel, como el resto de secciones), así que un texto oscuro
// normal funciona en todo el recorrido de scroll sin necesitar el blend.
//
// En mobile los enlaces en línea no cabían bien junto al nombre, así que
// se sustituyen por un botón de hamburguesa que abre un panel a pantalla
// completa con los mismos enlaces. En desktop se mantiene la fila de
// enlaces de siempre.
export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="edge fixed inset-x-0 top-8 z-50 flex items-center justify-between py-4 label text-ink sm:top-12">
        <a href="#top" className="nav-link shrink-0 font-semibold" onClick={() => setOpen(false)}>
          <span className="sm:hidden">RPL</span>
          <span className="hidden sm:inline">Rafael Palacios López</span>
        </a>

        <nav className="hidden gap-8 sm:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link font-semibold">
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          className="relative z-50 flex h-6 w-7 flex-col items-end justify-center gap-1.5 sm:hidden"
        >
          <span
            className={`block h-px w-7 bg-ink transition-transform duration-300 ${
              open ? "translate-y-[3px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-5 bg-ink transition-opacity duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px w-7 bg-ink transition-transform duration-300 ${
              open ? "-translate-y-[3px] -rotate-45" : ""
            }`}
          />
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 bg-paper sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 + i * 0.05 }}
                className="font-black uppercase leading-none text-ink text-4xl"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
