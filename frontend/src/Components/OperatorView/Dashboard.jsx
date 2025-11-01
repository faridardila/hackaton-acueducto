// @ts-nocheck
import React, { useState, useEffect } from 'react'
import MapView from './MapView.jsx'
import neighborhoods from '../../data/neighborhoods'
import Statistics from './Statistics.jsx'
import Forms from './Forms.jsx'

function Dashboard() {
  const [route, setRoute] = useState(window.location.hash || '#inicio')
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('san_miguel')
  const [selected, setSelected] = useState(null)
  const [comments, setComments] = useState({})
  const [commentDraft, setCommentDraft] = useState('')
  const [commentEditing, setCommentEditing] = useState(false)
  const [marked, setMarked] = useState({})
  const [helpOpen, setHelpOpen] = useState(false)

  // Escuchar cambios en el hash de URL (#inicio, #formularios, etc.)
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || '#inicio')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Cargar comentarios y marcas guardadas
  useEffect(() => {
    try {
      const rawComments = localStorage.getItem('house_comments_v1')
      const rawMarks = localStorage.getItem('house_marks_v1')
      if (rawComments) setComments(JSON.parse(rawComments))
      if (rawMarks) setMarked(JSON.parse(rawMarks))
    } catch (err) {
      console.warn('Error cargando datos locales', err)
    }
  }, [])

  useEffect(() => {
    if (selected) setCommentDraft(comments[selected.id] || '')
    else setCommentDraft('')
  }, [selected, comments])

  // Funciones de comentarios y marcas
  const saveComment = () => {
    if (!selected) return
    const trimmed = commentDraft.trim()
    const next = { ...comments }
    if (trimmed.length > 0) next[selected.id] = trimmed
    else delete next[selected.id]
    setComments(next)
    localStorage.setItem('house_comments_v1', JSON.stringify(next))
    setCommentEditing(false)
  }

  const toggleMark = () => {
    if (!selected) return
    const next = { ...marked }
    if (next[selected.id]) delete next[selected.id]
    else next[selected.id] = true
    setMarked(next)
    localStorage.setItem('house_marks_v1', JSON.stringify(next))
  }

  const currentNeighborhood = neighborhoods.find(
    (n) => n.id === selectedNeighborhood
  )

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <main className="mx-auto max-w-7xl">
        <div className="p-6 bg-white rounded shadow-sm border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">Panel Operativo</h2>
              <p className="text-sm text-gray-600 mt-1">
                Mapa interactivo y panel de detalles de predios (OpenStreetMap)
              </p>
            </div>
          </div>

          {route === '#estadisticas' ? (
            <Statistics />
          ) : route === '#formularios' ? (
            <Forms />
          ) : (
            <section className="mt-6 rounded-lg bg-white p-4 shadow-sm border">
              {/* Selector de barrio */}
              <div className="mb-3 flex justify-center">
                <div className="w-full max-w-md">
                  <select
                    value={selectedNeighborhood}
                    onChange={(e) => setSelectedNeighborhood(e.target.value)}
                    className="block w-full p-2 border rounded text-sm"
                  >
                    {neighborhoods.map((n) => (
                      <option key={n.id} value={n.id}>
                        {n.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-6">
                {/* Panel lateral */}
                <aside className="w-80 rounded border p-4 bg-gray-50 shadow-sm">
                  <h3 className="text-sm font-semibold">Panel de detalles</h3>
                  {!selected ? (
                    <p className="mt-3 text-sm text-gray-600">
                      Haz clic en una casa del mapa para ver su información.
                    </p>
                  ) : (
                    <div className="mt-3 text-sm text-gray-800 space-y-2">
                      <p>
                        <strong>Dirección:</strong> {selected.address}
                      </p>
                      <p>
                        <strong>Propietario:</strong> {selected.owner}
                      </p>
                      <p>
                        <strong>Familias:</strong> {selected.families}
                      </p>

                      <div className="space-y-3">
                        {/* Marcar casa */}
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={!!marked[selected.id]}
                            onChange={toggleMark}
                            className="sr-only"
                          />
                          <span
                            className={`w-5 h-5 rounded-sm flex items-center justify-center transition-colors ${
                              marked[selected.id]
                                ? 'bg-red-500 border-red-600'
                                : 'bg-white border border-gray-300'
                            }`}
                          >
                            {marked[selected.id] && (
                              <svg
                                className="w-4 h-4 text-white"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 00-1.414-1.414L8 11.172 4.707 7.879a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </span>
                          <span className="ml-2 text-sm font-medium text-gray-700">
                            {marked[selected.id] ? 'Marcada' : 'Marcar casa'}
                          </span>
                        </label>
                      </div>
                    </div>
                  )}
                </aside>

                {/* Mapa con Leaflet */}
                <div className="flex-1 rounded border overflow-hidden bg-white">
                  <MapView />
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  )
}

export default Dashboard
