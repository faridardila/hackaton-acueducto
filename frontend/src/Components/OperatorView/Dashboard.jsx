// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react'
import { BellIcon, ChartBarIcon, UserGroupIcon, UserPlusIcon } from '@heroicons/react/24/outline'
import Statistics from './Statistics.jsx'
import Forms from './Forms.jsx'
import neighborhoods from '../../data/neighborhoods'

/**
 * Tarjeta de estadística
 * @param {{title:string, value:string, icon?: any, bg?: string}} props
 */
function StatCard(props) {
    const { title, value, icon: Icon, bg = 'bg-white' } = props
    return (
        <div className={`rounded-lg p-4 ${bg} shadow-sm border`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500">{title}</p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
                </div>
                <div className="p-2 rounded-md bg-indigo-50">
                    {Icon ? <Icon className="h-6 w-6 text-indigo-600" aria-hidden="true" /> : null}
                </div>
            </div>
        </div>
    )
}

function Dashboard() {
    const mapRef = useRef(null)
    const [hovered, setHovered] = useState(null)
    const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 })
    const [selected, setSelected] = useState(null)
    const [helpOpen, setHelpOpen] = useState(false)
        const [route, setRoute] = useState(window.location.hash || '#inicio')

    const [comments, setComments] = useState({})
    const [commentDraft, setCommentDraft] = useState('')
    const [commentEditing, setCommentEditing] = useState(false)
    const [marked, setMarked] = useState({})
    const [neighborhoodMenuOpen, setNeighborhoodMenuOpen] = useState(false)
    const neighborhoodMenuRef = useRef(null)

        useEffect(() => {
            function onHash() { setRoute(window.location.hash || '#inicio') }
            window.addEventListener('hashchange', onHash)
            return () => window.removeEventListener('hashchange', onHash)
        }, [])

    useEffect(() => {
        try {
            const raw = localStorage.getItem('house_comments_v1')
            if (raw) setComments(JSON.parse(raw))
        } catch (err) {
            console.warn('Failed to load comments from localStorage', err)
        }
        try {
            const rawMarks = localStorage.getItem('house_marks_v1')
            if (rawMarks) setMarked(JSON.parse(rawMarks))
        } catch (err) {
            console.warn('Failed to load marks from localStorage', err)
        }
    }, [])

    // Close neighborhood popup on outside click
    useEffect(() => {
        function onDocClick(e) {
            if (!neighborhoodMenuRef.current) return
            if (!neighborhoodMenuRef.current.contains(e.target)) setNeighborhoodMenuOpen(false)
        }
        document.addEventListener('click', onDocClick)
        return () => document.removeEventListener('click', onDocClick)
    }, [])

    // When a house is selected, populate the draft with the stored comment (if any)
    useEffect(() => {
        if (selected) {
            setCommentDraft(comments[selected.id] || '')
        } else {
            setCommentDraft('')
        }
        // Close any open editor when selection changes
        setCommentEditing(false)
    }, [selected, comments])

    // neighborhoods are imported from shared data to keep the Dashboard and Statistics in sync
    const [selectedNeighborhoodId, setSelectedNeighborhoodId] = useState('san_miguel')
    const currentNeighborhood = neighborhoods.find(n => n.id === selectedNeighborhoodId) || neighborhoods[0]

    // Handlers
    function handleMouseMove(e, house) {
        const mapRect = mapRef.current?.getBoundingClientRect()
        if (!mapRect) return
        const x = Math.min(Math.max(e.clientX - mapRect.left, 20), mapRect.width - 20)
        const y = Math.max(e.clientY - mapRect.top - 10, 10)
        setHoverPos({ x, y })
        setHovered(house)
    }

    function handleMouseLeave() {
        setHovered(null)
    }

    function handleClick(house) {
        setSelected(house)
    }

    function saveComment() {
        if (!selected) return
        const trimmed = commentDraft.trim()
        const next = { ...comments }
        if (trimmed.length > 0) {
            next[selected.id] = commentDraft
        } else {
            delete next[selected.id]
        }
        setComments(next)
        setCommentEditing(false)
        try {
            localStorage.setItem('house_comments_v1', JSON.stringify(next))
        } catch (err) {
            console.warn('Failed to save comment', err)
        }
    }

    // Clear only the draft being edited (doesn't delete saved comment)
    function clearDraft() {
        setCommentDraft('')
    }

    // Delete saved comment for selected house
    function deleteComment() {
        if (!selected) return
        const next = { ...comments }
        delete next[selected.id]
        setComments(next)
        setCommentDraft('')
        setCommentEditing(false)
        try {
            localStorage.setItem('house_comments_v1', JSON.stringify(next))
        } catch (err) {
            console.warn('Failed to delete comment', err)
        }
    }

    function startCreate() {
        setCommentDraft('')
        setCommentEditing(true)
    }

    function startEdit() {
        setCommentEditing(true)
    }

    function cancelEdit() {
        // revert draft to saved value
        if (selected) setCommentDraft(comments[selected.id] || '')
        setCommentEditing(false)
    }

    function toggleMark() {
        if (!selected) return
        const next = { ...marked }
        if (next[selected.id]) delete next[selected.id]
        else next[selected.id] = true
        setMarked(next)
        try {
            localStorage.setItem('house_marks_v1', JSON.stringify(next))
        } catch (err) {
            console.warn('Failed to save marks', err)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
                            <main className="mx-auto max-w-7xl">
                                        { (route === '#inicio' || route === '') && (
                                            /* Neighborhood selector centered: single-line bar with down arrow and centered name */
                                            <div className="mb-3 flex justify-center">
                                                <div className="relative" ref={neighborhoodMenuRef}>
                                                    <button
                                                        onClick={() => setNeighborhoodMenuOpen((s) => !s)}
                                                        className="w-72 px-4 py-2 bg-white border border-gray-300 rounded-md flex items-center justify-center text-sm shadow-sm"
                                                        aria-expanded={neighborhoodMenuOpen}
                                                    >
                                                        <span className="absolute left-4 text-sm text-gray-600">Barrio</span>
                                                        <span className="mx-auto font-medium text-gray-800">{currentNeighborhood.name}</span>
                                                        <svg className="absolute right-3 w-4 h-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>

                                                    {neighborhoodMenuOpen ? (
                                                        <div className="absolute z-40 mt-2 w-72 bg-white border rounded-md shadow-lg">
                                                            {neighborhoods.map(n => (
                                                                <div
                                                                    key={n.id}
                                                                    onClick={() => { setSelectedNeighborhoodId(n.id); setSelected(null); setNeighborhoodMenuOpen(false); }}
                                                                    className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                                                >
                                                                    {n.name}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        ) }
                                {route === '#estadisticas' ? (
                                    <Statistics />
                                        ) : route === '#formularios' ? (
                                            <Forms />
                                ) : (
                            // default: interactive map
                            <section className="mt-6 rounded-lg bg-white p-4 shadow-sm border">
                                <div className="flex gap-6">
                                    <aside className="w-80 rounded border p-4 bg-gray-50 shadow-sm">
                                        <h3 className="text-sm font-semibold">Panel de detalles</h3>
                                        {!selected ? (
                                            <p className="mt-3 text-sm text-gray-600">Haga clic en una casa del mapa para ver la información completa.</p>
                                        ) : (
                                            <div className="mt-3 text-sm text-gray-800 space-y-2">
                                                <p><strong>Dirección:</strong> {selected.address}</p>
                                                <p><strong>Propietario:</strong> {selected.owner}</p>
                                                <p><strong>Número de familias:</strong> {selected.families}</p>
                                                <p><strong>ID:</strong> {selected.id}</p>
                                                <div className="space-y-3">
                                                    {/* Mark checkbox above the comment/editor */}
                                                    {selected ? (
                                                        <div className="flex items-center gap-3">
                                                            <label className="inline-flex items-center cursor-pointer">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={!!marked[selected.id]}
                                                                    onChange={() => toggleMark()}
                                                                    className="sr-only"
                                                                />
                                                                <span className={`w-5 h-5 rounded-sm flex items-center justify-center transition-colors ${marked[selected.id] ? 'bg-red-500 border-red-600' : 'bg-white border border-gray-300'}`}>
                                                                    {marked[selected.id] ? (
                                                                        <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414-1.414L8 11.172 4.707 7.879a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8z" clipRule="evenodd" /></svg>
                                                                    ) : null}
                                                                </span>
                                                                <span className="ml-2 text-sm font-medium text-gray-700">{marked[selected.id] ? 'Marcada' : 'Marcar casa'}</span>
                                                            </label>
                                                        </div>
                                                    ) : null}
                                                    {/* If editing mode is active, show the editor */}
                                                    {commentEditing ? (
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-600">Comentario</label>
                                                            <textarea
                                                                value={commentDraft}
                                                                onChange={(e) => setCommentDraft(e.target.value)}
                                                                rows={4}
                                                                className="w-full rounded border p-2 text-sm"
                                                            />

                                                            <div className="flex gap-2 mt-2">
                                                                <button
                                                                    onClick={saveComment}
                                                                    disabled={commentDraft.trim().length === 0}
                                                                    className={`inline-block px-3 py-1 text-sm rounded ${commentDraft.trim().length === 0 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-emerald-600 text-white'}`}
                                                                >
                                                                    Guardar
                                                                </button>

                                                                <button onClick={clearDraft} className="inline-block px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded">Limpiar</button>
                                                                <button onClick={cancelEdit} className="inline-block px-3 py-1 text-sm bg-yellow-500 text-white rounded">Cancelar</button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            {/* Not editing: show saved comment if exists, and action buttons */}
                                                            {comments[selected.id] ? (
                                                                <div className="space-y-2">
                                                                    <div className="text-sm text-gray-700">{comments[selected.id]}</div>
                                                                    <div className="flex gap-2">
                                                                        <button onClick={startEdit} className="inline-block px-3 py-1 text-sm bg-indigo-600 text-white rounded">Editar comentario</button>
                                                                        <button onClick={deleteComment} className="inline-block px-3 py-1 text-sm bg-red-600 text-white rounded">Eliminar comentario</button>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="flex gap-2">
                                                                    <button onClick={startCreate} className="inline-block px-3 py-1 text-sm bg-emerald-600 text-white rounded">Crear comentario</button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                                {/* Close button below the comment options; hidden while editing */}
                                                {!commentEditing ? (
                                                    <div className="mt-3">
                                                        <button onClick={() => setSelected(null)} className="w-full px-3 py-2 text-sm bg-indigo-600 text-white rounded">Cerrar</button>
                                                    </div>
                                                ) : null}
                                            </div>
                                        )}
                                    </aside>

                                    <div ref={mapRef} className="relative flex-1 rounded border overflow-hidden bg-white" style={{ minHeight: 520 }}>
                                        <svg viewBox="0 0 1000 600" className="w-full h-full block">
                                            <rect x="0" y="0" width="1000" height="600" fill="#f8fafc" />
                                            <polygon points={currentNeighborhood.boundary.points} fill="#16a34a" fillOpacity={0.08} stroke="#16a34a" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" opacity="0.95" />

                                            {houses.map((h) => {
                                                const isHovered = hovered?.id === h.id
                                                const isSelected = selected?.id === h.id
                                                return (
                                                    <g key={h.id}>
                                                        <polygon
                                                            points={h.points}
                                                            className={`cursor-pointer transition-all ${isSelected ? 'fill-emerald-400 stroke-emerald-700 stroke-2' : isHovered ? 'fill-emerald-300 stroke-emerald-600 stroke-1' : 'fill-white stroke-rose-300 stroke-1'}`}
                                                            onMouseMove={(e) => handleMouseMove(e, h)}
                                                            onMouseEnter={(e) => handleMouseMove(e, h)}
                                                            onMouseLeave={handleMouseLeave}
                                                            onClick={() => handleClick(h)}
                                                        />
                                                        {/** Render red marker circle at the first point corner if marked */}
                                                        {marked[h.id] ? (() => {
                                                            const first = h.points.split(' ')[0]
                                                            const [cx, cy] = first.split(',').map(Number)
                                                            // eslint-disable-next-line no-unused-vars
                                                            const rx = Math.max(6, 0)
                                                            return <circle cx={cx + 6} cy={cy + 6} r={6} fill="#dc2626" stroke="#991b1b" strokeWidth={1} />
                                                        })() : null}
                                                    </g>
                                                )
                                            })}
                                        </svg>

                                        {hovered ? (
                                            <div
                                                className="pointer-events-none absolute z-30 max-w-xs w-72 bg-white border shadow-lg rounded-lg text-sm text-gray-800"
                                                style={{ left: hoverPos.x, top: Math.max(hoverPos.y - 120, 8), transform: 'translateX(-50%)' }}
                                            >
                                                <div className="p-3">
                                                    <div className="text-xs text-gray-500">{hovered.address}</div>
                                                    <div className="mt-1 font-semibold">{hovered.owner}</div>
                                                    <div className="mt-1 text-gray-600">Número de familias: {hovered.families}</div>
                                                </div>
                                                <div style={{ position: 'absolute', left: '50%', bottom: -8, transform: 'translateX(-50%)' }}>
                                                    <svg width="20" height="8" viewBox="0 0 20 8">
                                                        <path d="M0 0 L10 8 L20 0" fill="#ffffff" stroke="#e5e7eb" />
                                                    </svg>
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </section>
                        )}
                    </main>

            {/* Floating help button (bottom-left) and manual popup */}
            <div>
                <button
                    onClick={() => setHelpOpen(true)}
                    aria-label="Ayuda"
                    className="fixed left-4 bottom-6 z-50 h-12 w-12 rounded-full bg-blue-500 text-white shadow-lg flex items-center justify-center hover:bg-indigo-700"
                >
                    <span className="text-lg font-bold">?</span>
                </button>

                {helpOpen ? (
                    <div className="fixed left-6 bottom-20 z-50 w-80 rounded-lg bg-white shadow-xl border">
                        <div className="flex items-center justify-between border-b px-4 py-2">
                            <strong className="text-sm">Manual de uso</strong>
                            <button onClick={() => setHelpOpen(false)} className="text-gray-500 hover:text-gray-700">Cerrar</button>
                        </div>
                        <div className="p-3 text-sm text-gray-700 space-y-2 max-h-72 overflow-auto">
                            <p><strong>1.</strong> Sobre el mapa, pase el cursor sobre una casa para ver información rápida.</p>
                            <p><strong>2.</strong> Haga click en una casa para abrir el panel izquierdo con la información completa.</p>
                            <p><strong>3.</strong> Use el panel izquierdo para ver/editar información (prototipo).</p>
                            <p><strong>4.</strong> Este es un prototipo: los datos son de prueba. Para mapas reales se integrará Leaflet/GeoJSON.</p>
                            <p><strong>Contacto:</strong> Equipo de desarrollo - soporte@example.com</p>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default Dashboard