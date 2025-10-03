import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline'

function Navbar() {
  // Componente puramente presentacional: vista estática (sin lógica)
  return (
    <nav className="relative bg-blue-400 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center">
            {/* Botón móvil (vista) */}
            <button className="sm:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white">
              <span className="sr-only">Abrir menú</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="flex shrink-0 items-center ml-3">
              <img
                alt="Logo"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </div>

            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-950/50 text-white rounded-md px-3 py-2 text-sm font-medium">Dashboard</a>
                <a href="#" className="text-gray-300 hover:bg-white/5 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Proyectos</a>
                <a href="#" className="text-gray-300 hover:bg-white/5 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Equipo</a>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <button type="button" className="relative rounded-full p-1 text-gray-400 hover:text-white">
              <span className="sr-only">Ver notificaciones</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="ml-3">
              <img
                alt="Usuario"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="h-8 w-8 rounded-full bg-gray-800 outline outline-white/10"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
