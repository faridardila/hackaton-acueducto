import React from 'react'
import { HomeIcon, UsersIcon, UserIcon } from '@heroicons/react/24/solid'

export default function MobileFooter({ active = 'inicio', onNavigate }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-inner">
      <div className="max-w-2xl mx-auto px-4 py-2 flex justify-between items-center">
        <button
          onClick={() => onNavigate && onNavigate('referidos')}
          className={`flex-1 text-center py-2`}> 
          <UsersIcon className={`mx-auto h-10 w-10 ${active === 'referidos' ? 'text-blue-500' : 'text-gray-400'}`} aria-hidden="true" />
          <span className="sr-only">Referidos</span>
        </button>

        <button
          onClick={() => onNavigate && onNavigate('inicio')}
          className={`flex-1 text-center py-2`}>
          <HomeIcon className={`mx-auto h-10 w-10 ${active === 'inicio' ? 'text-blue-500' : 'text-gray-400'}`} aria-hidden="true" />
          <span className="sr-only">Inicio</span>
        </button>

        <button
          onClick={() => onNavigate && onNavigate('cuenta')}
          className={`flex-1 text-center py-2`}>
          <UserIcon className={`mx-auto h-10 w-10 ${active === 'cuenta' ? 'text-blue-500' : 'text-gray-400'}`} aria-hidden="true" />
          <span className="sr-only">Cuenta</span>
        </button>
      </div>
    </nav>
  )
}
