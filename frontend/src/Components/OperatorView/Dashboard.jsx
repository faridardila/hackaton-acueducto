// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react'
import { BellIcon, ChartBarIcon, UserGroupIcon, UserPlusIcon } from '@heroicons/react/24/outline'
import Statistics from './Statistics.jsx'
import Forms from './Forms.jsx'

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

    const boundary = {
        points: '40,60 960,40 980,160 920,540 120,560 40,420'
    }

    const houses = [
        { id: 1, address: 'Calle 1 #10-01', owner: 'Luis Gómez', families: 3, points: '120,100 185,100 170,170 115,170' },
        { id: 2, address: 'Calle 2 #11-02', owner: 'María López', families: 4, points: '200,100 265,100 250,170 195,170' },
        { id: 3, address: 'Calle 3 #12-03', owner: 'Ana Ruiz', families: 2, points: '280,100 345,100 330,170 275,170' },
        { id: 4, address: 'Calle 4 #13-04', owner: 'Pedro Díaz', families: 5, points: '360,100 425,100 410,170 355,170' },
        { id: 5, address: 'Calle 5 #14-05', owner: 'Sandra Villa', families: 1, points: '440,100 505,100 490,170 435,170' },
        { id: 6, address: 'Calle 6 #15-06', owner: 'Jorge Salas', families: 6, points: '520,100 585,100 570,170 515,170' },

        { id: 7, address: 'Calle 7 #16-07', owner: 'Elena Mora', families: 2, points: '120,180 185,180 170,250 115,250' },
        { id: 8, address: 'Calle 8 #17-08', owner: 'Carlos Peña', families: 3, points: '200,180 265,180 250,250 195,250' },
        { id: 9, address: 'Calle 9 #18-09', owner: 'Lucía Castro', families: 4, points: '280,180 345,180 330,250 275,250' },
        { id: 10, address: 'Calle 10 #19-10', owner: 'Raúl Herrera', families: 2, points: '360,180 425,180 410,250 355,250' },
        { id: 11, address: 'Calle 11 #20-11', owner: 'Marta Ruiz', families: 3, points: '440,180 505,180 490,250 435,250' },
        { id: 12, address: 'Calle 12 #21-12', owner: 'Diego Prada', families: 5, points: '520,180 585,180 570,250 515,250' },

        { id: 13, address: 'Calle 13 #22-13', owner: 'Nadia Ortiz', families: 1, points: '120,260 185,260 170,330 115,330' },
        { id: 14, address: 'Calle 14 #23-14', owner: 'Iván Ríos', families: 2, points: '200,260 265,260 250,330 195,330' },
        { id: 15, address: 'Calle 15 #24-15', owner: 'Paula León', families: 4, points: '280,260 345,260 330,330 275,330' },
        { id: 16, address: 'Calle 16 #25-16', owner: 'Óscar P.', families: 3, points: '360,260 425,260 410,330 355,330' },
        { id: 17, address: 'Calle 17 #26-17', owner: 'Lina M.', families: 2, points: '440,260 505,260 490,330 435,330' },
        { id: 18, address: 'Calle 18 #27-18', owner: 'Roberto S.', families: 4, points: '520,260 585,260 570,330 515,330' },

        { id: 19, address: 'Calle 19 #28-19', owner: 'Diana V.', families: 2, points: '120,340 185,340 170,410 115,410' },
        { id: 20, address: 'Calle 20 #29-20', owner: 'Mauricio Q.', families: 3, points: '200,340 265,340 250,410 195,410' },
        { id: 21, address: 'Calle 21 #30-21', owner: 'Sofía R.', families: 2, points: '280,340 345,340 330,410 275,410' },
        { id: 22, address: 'Calle 22 #31-22', owner: 'Héctor U.', families: 1, points: '360,340 425,340 410,410 355,410' },

        { id: 23, address: 'Calle 23 #32-23', owner: 'Ivette Z.', families: 2, points: '710,400 805,400 780,510 680,510' },
        { id: 24, address: 'Calle 24 #33-24', owner: 'Camilo T.', families: 3, points: '830,400 920,400 900,500 800,510' },
    ]

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
                                            <polygon points={boundary.points} fill="#16a34a" fillOpacity={0.08} stroke="#16a34a" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" opacity="0.95" />

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
                                                            const r = Math.max(6, 0)
                                                            return <circle cx={cx + 6} cy={cy + 6} r={r} fill="#dc2626" stroke="#991b1b" strokeWidth={1} />
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
                    className="fixed left-4 bottom-6 z-50 h-12 w-12 rounded-full bg-indigo-600 text-white shadow-lg flex items-center justify-center hover:bg-indigo-700"
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