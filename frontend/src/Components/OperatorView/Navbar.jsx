"use client"
import { useState } from "react"
import { Bars3Icon, BellIcon } from "@heroicons/react/24/outline"

function Navbar() {
  const [active, setActive] = useState("inicio")

  const links = [
    { name: "Inicio", href: "#inicio", key: "inicio" },
    { name: "Estadísticas", href: "#estadisticas", key: "estadisticas" },
    { name: "Formularios", href: "#formularios", key: "formularios" },
  ]

  return (
    <nav className="relative bg-blue-500 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-24 items-center justify-between">
          <div className="flex items-center">
            {/* Botón móvil */}
            <button className="sm:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white">
              <span className="sr-only">Abrir menú</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Logo */}
            <div className="flex shrink-0 items-center">
              <a href="/" className="flex items-center">
                <img
                  alt="logo de rana"
                  src="/src/assets/logo_rana.svg"
                  className="h-20 w-auto"
                /></a>
            </div>

            {/* Links */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {links.map(link => (
                  <a
                    key={link.key}
                    href={link.href}
                    onClick={() => setActive(link.key)}
                    className={`rounded-md px-3 py-2 text-sm font-medium ${active === link.key
                        ? "bg-gray-950/50 text-white"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                      }`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Iconos derecha */}
          <div className="flex items-center">

            <div className="ml-3">
              <img
                alt="Usuario"
                src="/src/assets/aquanova_logo 1.png"
                className="h-20 w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
