import React from 'react'

export default function MobileCard({
  title = 'Selecciona tu predio',
  subtitle = '',
  image,
  onPreview,
  onUpdateData,
  onLineCall,
  onPQRS,
}) {
  return (
    <div className="p-4 bg-white rounded-md shadow-sm border">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        <div className="text-sm text-gray-400"> </div>
      </div>

      <div className="relative border-4 border-sky-100 rounded-md overflow-hidden mb-3">
        {/* small preview pill */}
        <button
          onClick={onPreview}
          className="absolute right-3 top-3 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-sm shadow-sm"
        >
          Vista previa
        </button>

        {/* Image placeholder: if image prop passed, show it; otherwise simple svg box */}
        {image ? (
          <img src={image} alt="map preview" className="w-full h-48 object-cover" />
        ) : (
          <div className="w-full h-48 bg-sky-50 flex items-center justify-center text-sky-400">
            <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="120" height="80" rx="6" fill="#eef6fb" />
              <path d="M8 60 L40 32 L68 60 L110 20" stroke="#7dd3fc" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <button onClick={onUpdateData} className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium">
          Actualizar mis datos
        </button>
        <button onClick={onLineCall} className="w-full bg-sky-200 text-sky-800 py-2 rounded-lg font-medium">
          Línea de atención
        </button>
        <button onClick={onPQRS} className="w-full bg-sky-200 text-sky-800 py-2 rounded-lg font-medium">
          Registra tu PQRS
        </button>
      </div>
    </div>
  )
}
