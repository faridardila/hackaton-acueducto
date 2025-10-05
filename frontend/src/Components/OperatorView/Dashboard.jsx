// @ts-nocheck
import React, { useState, useRef } from 'react'
import { BellIcon, ChartBarIcon, UserGroupIcon, UserPlusIcon } from '@heroicons/react/24/outline'

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
    // Vista estática de una dashboard para la vista de operador (tema claro, sin navbar)

    const mapRef = useRef(null)
    const [hovered, setHovered] = useState(null)
    const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 })
    const [selected, setSelected] = useState(null)

    // Sample data: 15 polygon 'houses' with mock info and svg points (viewBox 0 0 1000 600)
    // Neighborhood boundary (single polygon) and houses inside it.
    const boundary = {
        points: '40,60 960,40 980,160 920,540 120,560 40,420'
    }

    // Make houses 1..22 trapezoids similar to refs and filled
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
        // Position tooltip above cursor, clamped inside container
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

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
            {/* Main grid */}
            <main className="mx-auto max-w-7xl">

                {/* Content area: gráfico + tabla */}
                <section className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2 rounded-lg bg-white p-4 shadow-sm border">
                        <h2 className="text-sm font-medium text-gray-700">Actividad reciente</h2>
                        <div className="mt-4 h-56 rounded-md bg-gray-50 flex items-center justify-center text-gray-500">Gráfico (placeholder)</div>
                        <p className="mt-2 text-xs text-gray-500">Aquí puede ir un gráfico real (Chart.js, Recharts, etc.)</p>
                    </div>

                    <div className="rounded-lg bg-white  p-4 shadow-sm border">
                        <h2 className="text-sm font-medium text-gray-700">Resumen rápido</h2>
                        <ul className="mt-3 space-y-2 text-sm text-gray-700">
                            <li className="flex justify-between"><span>Incidencias hoy</span><span className="font-semibold">8</span></li>
                            <li className="flex justify-between"><span>Operadores online</span><span className="font-semibold">5</span></li>
                            <li className="flex justify-between"><span>Promedio respuesta</span><span className="font-semibold">12m</span></li>
                        </ul>
                    </div>
                </section>
                
                {/* Stat cards */}
                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                    <StatCard title="Usuarios activos" value="1,248" icon={UserGroupIcon} />
                    <StatCard title="Tickets abiertos" value="24" icon={ChartBarIcon} />
                    <StatCard title="Tiempo promedio" value="2h 14m" icon={ChartBarIcon} />
                    <StatCard title="SLA cumplimiento" value="98%" icon={UserGroupIcon} />
                    <StatCard title="CristoRey" value="100%" icon={UserPlusIcon} />

                </section>

                

                {/* Interactive map area + detail panel */}
                <section className="mt-6 rounded-lg bg-white p-4 shadow-sm border">
                    <h2 className="text-sm font-medium text-gray-700 mb-3">Visualización de zonas</h2>
                    <div className="flex gap-6">
                        {/* Left panel: details when polygon clicked */}
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
                                    <button onClick={() => setSelected(null)} className="mt-2 inline-block px-3 py-1 text-sm bg-indigo-600 text-white rounded">Cerrar</button>
                                </div>
                            )}
                        </aside>

                        {/* Map area */}
                        <div ref={mapRef} className="relative flex-1 rounded border overflow-hidden bg-white" style={{ minHeight: 420 }}>
                            {/* Top-floating label removed as requested */}

                            {/* SVG map (polygons) */}
                            <svg viewBox="0 0 1000 600" className="w-full h-full block">
                                {/* background */}
                                <rect x="0" y="0" width="1000" height="600" fill="#f8fafc" />

                                {/* neighborhood boundary (green stroke). Now with a subtle fill so a background image can be seen through it. */}
                                {/* To add a satellite/background image: insert an <image href="/path/to/image.jpg" x="0" y="0" width="1000" height="600" preserveAspectRatio="xMidYMid slice" /> above this polygon. */}
                                <polygon points={boundary.points} fill="#16a34a" fillOpacity={0.08} stroke="#16a34a" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" opacity="0.95" />

                                {houses.map((h) => {
                                    const isHovered = hovered?.id === h.id
                                    const isSelected = selected?.id === h.id
                                    return (
                                        <g key={h.id}>
                                            <polygon
                                                points={h.points}
                                                // filled polygons: default white fill, subtle stroke. Hover/selected use solid green fills.
                                                className={`cursor-pointer transition-all ${isSelected ? 'fill-emerald-400 stroke-emerald-700 stroke-2' : isHovered ? 'fill-emerald-300 stroke-emerald-600 stroke-1' : 'fill-white stroke-rose-300 stroke-1'}`}
                                                onMouseMove={(e) => handleMouseMove(e, h)}
                                                onMouseEnter={(e) => handleMouseMove(e, h)}
                                                onMouseLeave={handleMouseLeave}
                                                onClick={() => handleClick(h)}
                                            />
                                        </g>
                                    )
                                })}
                            </svg>

                            {/* Floating tooltip shown on hover (top positioned) */}
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
                                    {/* tail */}
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

                {/* Tabla de ejemplo */}
                <section className="mt-6 rounded-lg bg-white p-4 shadow-sm border">
                    <h2 className="text-sm font-medium text-gray-700 mb-3">Últimas órdenes</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm">
                            <thead className="text-xs text-gray-500 uppercase">
                                <tr>
                                    <th className="px-3 py-2">ID</th>
                                    <th className="px-3 py-2">Cliente</th>
                                    <th className="px-3 py-2">Estado</th>
                                    <th className="px-3 py-2">Tiempo</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 text-gray-700">
                                <tr>
                                    <td className="px-3 py-2">#1001</td>
                                    <td className="px-3 py-2">María Pérez</td>
                                    <td className="px-3 py-2 text-emerald-600">Completado</td>
                                    <td className="px-3 py-2">10:12</td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">#1002</td>
                                    <td className="px-3 py-2">Jorge López</td>
                                    <td className="px-3 py-2 text-amber-600">En progreso</td>
                                    <td className="px-3 py-2">11:05</td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">#1003</td>
                                    <td className="px-3 py-2">Empresa XYZ</td>
                                    <td className="px-3 py-2 text-red-600">Pendiente</td>
                                    <td className="px-3 py-2">—</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Dashboard