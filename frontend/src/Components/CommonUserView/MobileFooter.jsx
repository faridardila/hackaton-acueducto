import React from 'react'

export default function MobileFooter({ active = 'inicio', onNavigate }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-inner">
      <div className="max-w-2xl mx-auto px-4 py-2 flex justify-between items-center">
        <button
          onClick={() => onNavigate && onNavigate('referidos')}
          className={`flex-1 text-center py-2 ${active === 'referidos' ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>
          <div className="text-sm">Referidos</div>
        </button>
        <button
          onClick={() => onNavigate && onNavigate('inicio')}
          className={`flex-1 text-center py-2 ${active === 'inicio' ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>
          <div className="text-sm">Inicio</div>
        </button>
        <button
          onClick={() => onNavigate && onNavigate('cuenta')}
          className={`flex-1 text-center py-2 ${active === 'cuenta' ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>
          <div className="text-sm">Cuenta</div>
        </button>
      </div>
    </nav>
  )
}
