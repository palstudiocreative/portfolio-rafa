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
export default function SiteHeader() {
  return (
    <header className="edge fixed inset-x-0 top-8 z-50 flex items-center justify-between py-4 label text-ink sm:top-12">
      <a href="#top" className="nav-link shrink-0 font-semibold">
        <span className="sm:hidden">RPL</span>
        <span className="hidden sm:inline">Rafael Palacios López</span>
      </a>
      <nav className="flex gap-5 sm:gap-8">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="nav-link font-semibold">
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
