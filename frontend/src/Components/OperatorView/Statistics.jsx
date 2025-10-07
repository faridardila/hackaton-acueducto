import React, { useState, useEffect } from 'react'
import { ChartBarIcon, UserGroupIcon, UserPlusIcon } from '@heroicons/react/24/outline'
import neighborhoods from '../../data/neighborhoods'

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

export default function Statistics() {
  const [tab, setTab] = useState('predios')

  // neighborhoods are imported from shared data so selectors reflect the map

  const [selectedNeighborhood, setSelectedNeighborhood] = useState('')
  const [selectedPredio, setSelectedPredio] = useState('')

  const allPredios = neighborhoods.flatMap(n => n.houses.map(h => ({ ...h, neighborhoodId: n.id })))

  // Derived stats
  const generalStats = {
    totalPredios: allPredios.length,
    totalFamilies: allPredios.reduce((s, p) => s + (p.families || 0), 0),
    avgFamilies: Math.round(allPredios.reduce((s, p) => s + (p.families || 0), 0) / Math.max(allPredios.length, 1) * 10) / 10,
  }

  const neighborhoodObj = neighborhoods.find(n => n.id === selectedNeighborhood)
  const neighborhoodStats = neighborhoodObj ? {
    predios: neighborhoodObj.houses.length,
    families: neighborhoodObj.houses.reduce((s, p) => s + (p.families || 0), 0),
    avgFamilies: Math.round(neighborhoodObj.houses.reduce((s, p) => s + (p.families || 0), 0) / Math.max(neighborhoodObj.houses.length, 1) * 10) / 10,
  } : null

  const predioObj = allPredios.find(p => String(p.id) === String(selectedPredio))
  // selections for predio-level yearly charts
  const [selectedPredioYearIdx, setSelectedPredioYearIdx] = useState(null)
  const [selectedPredioUnitsIdx, setSelectedPredioUnitsIdx] = useState(null)
  useEffect(() => {
    setSelectedPredioYearIdx(null)
    setSelectedPredioUnitsIdx(null)
  }, [selectedPredio])

    function PredioPreview({ points = '' }) {
    if (!points) return <div className="rounded bg-gray-50 p-4 text-sm text-gray-600">Sin geometría</div>
    return (
      <svg viewBox="0 0 1000 600" className="w-full h-48 bg-white border rounded">
        <polygon points={points} fill="#60a5fa33" stroke="#3b82f6" strokeWidth={2} />
      </svg>
    )
  }

  // Sample datasets for the example charts
  const prediosMonthly = [12, 18, 9, 24, 30, 22, 28, 35, 26, 18, 14, 20]
  const prediosDistribution = [45, 30, 15, 10] // e.g., categories by property type

  const monthsLabels = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
  const distributionCategories = ['Comercio','Arriendo','Vivienda','Otro']
  // Incident categories relevant to the acueducto for predio-level analysis
  const incidentTypes = ['Fuga','Baja presión','Lectura','Mantenimiento','Otro']
  // Year labels for predio-level yearly charts (last 5 years)
  const yearsLabels = ['2021','2022','2023','2024','2025']

  const [selectedMonthIdx, setSelectedMonthIdx] = useState(null)
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(null)

  // --- Formularios state & sample data ---
  const [selectedFormsDayIdx, setSelectedFormsDayIdx] = useState(null)
  const [selectedFormErrorIdx, setSelectedFormErrorIdx] = useState(null)

  const formsList = [
    { id: 'registro_pf', name: 'Registro - primera fase' },
    { id: 'registro_sf', name: 'Registro - segunda fase' },
    { id: 'actualizacion_v1', name: 'Actualización de datos - primera versión' },
  ]
  const [selectedFormId, setSelectedFormId] = useState('')
  const [selectedFormQ1Idx, setSelectedFormQ1Idx] = useState(null)
  const [selectedFormQ2Idx, setSelectedFormQ2Idx] = useState(null)

  // deterministic sample generators for form responses (prototype)
  function generateFormResponsesQ1(formId, predioId) {
    // Question: cantidad de familias — return distribution across bins ['1','2','3-4','5+']
    const idx = formsList.findIndex(f => f.id === formId)
    const n = idx >= 0 ? idx + 1 : 1
    const p = allPredios.find(x => String(x.id) === String(predioId))
    const families = p ? Math.max(1, (p.families || 1)) : 1
    // base counts emphasize the bin matching the predio's families
    const bins = [5 + n, 3 + Math.floor(n / 2), 2 + Math.floor(n / 3), 1 + (n % 2)]
    const targetIdx = families === 1 ? 0 : families === 2 ? 1 : families <= 4 ? 2 : 3
    // boost the target bin so distribution reflects predio
    bins[targetIdx] += families * 2
    return bins
  }
  function generateFormResponsesQ2(formId, predioId) {
    // Question: tipo de predio — categories ['Vivienda','Comercio','Mixto','Otro']
    const categories = ['Vivienda','Comercio','Mixto','Otro']
    const idx = formsList.findIndex(f => f.id === formId)
    const n = idx >= 0 ? idx + 1 : 1
    const p = allPredios.find(x => String(x.id) === String(predioId))
    // deterministic assignment based on predio id or families
    let tieBreaker = 0
    if (p) tieBreaker = Number(String(p.id).replace(/\D/g, '')) || (p.families || 1)
    const base = categories.map((c, i) => 3 + ((n + i + tieBreaker) % 5))
    // ensure at least one category is dominant
    const dominant = tieBreaker % categories.length
    base[dominant] += 5
    return base
  }

  const formsPerDay = [5, 8, 12, 10, 14, 9, 7]
  const formErrors = [0, 1, 0, 2, 1, 0, 0]

  // Neighborhood-level derived series (when a neighborhood is selected)
  const neighborhoodMonthly = neighborhoodObj ? (() => {
    // Scale the global monthly series proportionally to the neighborhood size (simple heuristic)
    const totalPredios = allPredios.length || 1
    const factor = neighborhoodObj.houses.length / totalPredios
    return prediosMonthly.map(v => Math.max(0, Math.round(v * factor)))
  })() : null

  const neighborhoodDistribution = neighborhoodObj ? (() => {
    // Simple distribution: assign each house in the neighborhood a category in round-robin
    const cats = distributionCategories.length
    const counts = new Array(cats).fill(0)
    neighborhoodObj.houses.forEach((h, idx) => {
      counts[idx % cats] += 1
    })
    return counts
  })() : null

  const [selectedNeighborhoodMonthIdx, setSelectedNeighborhoodMonthIdx] = useState(null)
  const [selectedNeighborhoodCategoryIdx, setSelectedNeighborhoodCategoryIdx] = useState(null)

  // Tiny inline bar chart with labels and click handlers (no deps)
  function SimpleBarChart({ data = [], width = 400, height = 120, color = '#6366f1', labels = [], onBarClick, selectedIndex = null }) {
    const paddingTop = 8
    const labelHeight = 20
    const chartHeight = height - labelHeight - 8
    const max = Math.max(...data, 1)
    const barWidth = width / data.length
    return (
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="block">
        {data.map((v, i) => {
          const h = (v / max) * (chartHeight - 10)
          const x = i * barWidth + 4
          const y = paddingTop + (chartHeight - h - 4)
          const isSelected = selectedIndex === i
          return (
            <g key={i} className="cursor-pointer" onClick={() => onBarClick && onBarClick(i)}>
              <rect x={x} y={y} width={barWidth - 8} height={h} fill={isSelected ? '#f97316' : color} rx={3} />
              {/* label under the bar */}
              {labels[i] ? (
                <text x={x + (barWidth - 8) / 2} y={height - 4} fontSize={10} fill="#374151" textAnchor="middle">{labels[i]}</text>
              ) : null}
            </g>
          )
        })}
      </svg>
    )
  }

  function SimpleLineChart({ data = [], width = 400, height = 100, stroke = '#ef4444', onPointClick, selectedIndex = null }) {
    // Support negative and positive values by mapping range [min..max] to chart height
    const minVal = Math.min(...data, 0)
    const maxVal = Math.max(...data, 0)
    const range = Math.max(1, maxVal - minVal)
    const stepX = data.length > 1 ? width / (data.length - 1) : width
    const points = data.map((v, i) => `${i * stepX},${height - ((v - minVal) / range) * (height - 16) - 8}`).join(' ')
    return (
  <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="block">
        {/* zero baseline */}
        {minVal < 0 && maxVal > 0 ? (
          (() => {
            const zeroY = height - ((0 - minVal) / range) * (height - 16) - 8
            return <line x1={0} y1={zeroY} x2={width} y2={zeroY} stroke="#e5e7eb" strokeWidth={1} />
          })()
        ) : null}
        <polyline fill="none" stroke={stroke} strokeWidth={2} points={points} strokeLinecap="round" strokeLinejoin="round" />
        {data.map((v, i) => {
          const cx = i * stepX
          const cy = height - ((v - minVal) / range) * (height - 16) - 8
          const isSelected = selectedIndex === i
          return (
            <g key={i} className="cursor-pointer" onClick={() => onPointClick && onPointClick(i)}>
              <circle cx={cx} cy={cy} r={isSelected ? 6 : 4} fill={isSelected ? '#f97316' : stroke} />
            </g>
          )
        })}
      </svg>
    )
  }

  // Deterministic sample generators for predio-level data (prototype)
  function generatePredioUpdatesPerYear(id) {
    // Synthetic: number of updates/changes recorded per year for the predio (last 5 years)
    const n = Number(String(id).replace(/\D/g, '')) || 0
    return yearsLabels.map((y, i) => {
      // base between 0..4, with slight trend depending on id
      const base = ((n + i * 2) % 5)
      // introduce a small upward or downward trend based on id parity
      const trend = (n % 2 === 0) ? i : -i
      return Math.max(0, base + Math.round(trend * 0.6))
    })
  }

  function generatePredioUnitsChangePerYear(id) {
    // Synthetic: year-over-year change in housing units for the predio
    // Always positive integers (>=1). Typical values 1-2, occasional 3.
    const n = Number(String(id).replace(/\D/g, '')) || 0
    return yearsLabels.map((y, i) => {
      // base 1..3
      let v = ((n + i) % 3) + 1 // 1..3
      // bias to mostly 1-2: if modulo condition not met, cap to 2
      if (((n + i) % 7) !== 0 && v > 2) v = 2
      return v
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <main className="mx-auto max-w-7xl">
        <div className="p-6 bg-white rounded shadow-sm border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">Estadísticas</h2>
              <p className="text-sm text-gray-600 mt-1">Visión general y análisis por barrio y por predio</p>
            </div>
          </div>
        {/* Tabs */}
        <div className="mb-4 flex items-center gap-4">
          <button
            onClick={() => setTab('predios')}
            className={`px-3 py-1 rounded-lg ${tab === 'predios' ? 'bg-blue-600 text-white' : 'bg-white border'}`}
          >
            Estadísticas - Predios
          </button>
          <button
            onClick={() => setTab('formularios')}
            className={`px-3 py-1 rounded-lg ${tab === 'formularios' ? 'bg-blue-600 text-white' : 'bg-white border'}`}
          >
            Estadísticas - Formularios
          </button>
        </div>

        {tab === 'predios' ? (
          <>
            {/* General stats + graphs */}
            <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="p-4 border rounded bg-white">
                <h4 className="text-xs text-gray-600">Estadísticas generales</h4>
                <div className="mt-2 text-sm text-gray-800">
                  <div>Total predios: <strong>{generalStats.totalPredios}</strong></div>
                  <div>Total familias: <strong>{generalStats.totalFamilies}</strong></div>
                  <div>Promedio familias/predio: <strong>{generalStats.avgFamilies}</strong></div>
                </div>
              </div>

              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded bg-white p-3 border">
                  <p className="text-xs text-gray-500">Predios registrados (mensual)</p>
                  <SimpleBarChart
                    data={prediosMonthly}
                    width={360}
                    height={120}
                    color="#10b981"
                    labels={monthsLabels}
                    selectedIndex={selectedMonthIdx}
                    onBarClick={(i) => setSelectedMonthIdx(i)}
                  />
                  {selectedMonthIdx !== null ? (
                    <div className="mt-2 text-sm text-gray-700">Mes seleccionado: <strong>{monthsLabels[selectedMonthIdx]}</strong> — Cantidad: <strong>{prediosMonthly[selectedMonthIdx]}</strong></div>
                  ) : null}
                </div>
                <div className="rounded bg-white p-3 border">
                  <p className="text-xs text-gray-500">Distribución por tipo</p>
                  <SimpleBarChart
                    data={prediosDistribution}
                    width={360}
                    height={120}
                    color="#6366f1"
                    labels={distributionCategories}
                    selectedIndex={selectedCategoryIdx}
                    onBarClick={(i) => setSelectedCategoryIdx(i)}
                  />
                  {selectedCategoryIdx !== null ? (
                    <div className="mt-2 text-sm text-gray-700">Categoría: <strong>{distributionCategories[selectedCategoryIdx]}</strong> — Cantidad: <strong>{prediosDistribution[selectedCategoryIdx]}</strong></div>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Neighborhood selector */}
            <div className="mb-4">
              <label className="text-xs text-gray-600">Seleccionar barrio</label>
              <select className="w-full mt-1 p-2 border rounded" value={selectedNeighborhood} onChange={(e) => { setSelectedNeighborhood(e.target.value); setSelectedPredio('') }}>
                <option value="">-- Todos los barrios --</option>
                {neighborhoods.map(n => <option key={n.id} value={n.id}>{n.name}</option>)}
              </select>
            </div>

            {/* Neighborhood stats + chart */}
            <div className="mb-4 rounded bg-white p-4 border">
              <h4 className="text-sm font-medium text-gray-700">Estadísticas por barrio</h4>
              {neighborhoodStats ? (
                <div className="mt-2 text-sm text-gray-800">
                  <div>Predios: <strong>{neighborhoodStats.predios}</strong></div>
                  <div>Familias: <strong>{neighborhoodStats.families}</strong></div>
                  <div>Promedio familias/predio: <strong>{neighborhoodStats.avgFamilies}</strong></div>
                  <div className="mt-3 grid grid-cols-1 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Predios registrados (mensual) — Barrio</p>
                      {neighborhoodMonthly ? (
                        <>
                          <SimpleBarChart
                            data={neighborhoodMonthly}
                            width={720}
                            height={120}
                            color="#10b981"
                            labels={monthsLabels}
                            selectedIndex={selectedNeighborhoodMonthIdx}
                            onBarClick={(i) => setSelectedNeighborhoodMonthIdx(i)}
                          />
                          {selectedNeighborhoodMonthIdx !== null ? (
                            <div className="mt-2 text-sm text-gray-700">Mes seleccionado: <strong>{monthsLabels[selectedNeighborhoodMonthIdx]}</strong> — Cantidad: <strong>{neighborhoodMonthly[selectedNeighborhoodMonthIdx]}</strong></div>
                          ) : null}
                        </>
                      ) : (
                        <div className="text-sm text-gray-600">No hay datos de tiempo para este barrio.</div>
                      )}
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Distribución por tipo — Barrio</p>
                      {neighborhoodDistribution ? (
                        <>
                          <SimpleBarChart
                            data={neighborhoodDistribution}
                            width={720}
                            height={120}
                            color="#f59e0b"
                            labels={distributionCategories}
                            selectedIndex={selectedNeighborhoodCategoryIdx}
                            onBarClick={(i) => setSelectedNeighborhoodCategoryIdx(i)}
                          />
                          {selectedNeighborhoodCategoryIdx !== null ? (
                            <div className="mt-2 text-sm text-gray-700">Categoría: <strong>{distributionCategories[selectedNeighborhoodCategoryIdx]}</strong> — Cantidad: <strong>{neighborhoodDistribution[selectedNeighborhoodCategoryIdx]}</strong></div>
                          ) : null}
                        </>
                      ) : (
                        <div className="text-sm text-gray-600">No hay datos de distribución para este barrio.</div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-2 text-sm text-gray-600">Seleccione un barrio para ver estadísticas específicas.</div>
              )}
            </div>

            {/* Predio selector */}
            <div className="mb-4">
              <label className="text-xs text-gray-600">Seleccionar predio</label>
              <select className="w-full mt-1 p-2 border rounded" value={selectedPredio} onChange={(e) => setSelectedPredio(e.target.value)}>
                <option value="">-- Ninguno --</option>
                {allPredios.filter(p => !selectedNeighborhood || p.neighborhoodId === selectedNeighborhood).map(p => (
                  <option key={p.id} value={p.id}>{`${p.address} (${p.neighborhoodId})`}</option>
                ))}
              </select>
            </div>

            {/* Predio stats and preview + small chart */}
            <div className="mb-6 rounded bg-white p-4 border">
              <h4 className="text-sm font-medium text-gray-700">Estadísticas por predio</h4>
                  {predioObj ? (
                <div className="mt-2 grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="md:col-span-1">
                    <div className="text-sm text-gray-800">Dirección: <strong>{predioObj.address}</strong></div>
                    <div className="text-sm text-gray-800">Propietario: <strong>{predioObj.owner}</strong></div>
                    <div className="text-sm text-gray-800">Familias: <strong>{predioObj.families}</strong></div>
                    <div className="text-sm text-gray-800">ID: <strong>{predioObj.id}</strong></div>
                  </div>
                  <div className="md:col-span-4">
                    <PredioPreview points={predioObj.points} />
                    <div className="mt-3 grid grid-cols-2 gap-4">
                      <div className="rounded bg-white p-3 border">
                        <p className="text-xs text-gray-500">Actualizaciones por año (últimos 5 años)</p>
                        {predioObj ? (
                          (() => {
                            const updates = generatePredioUpdatesPerYear(predioObj.id)
                            return (
                              <>
                                <SimpleBarChart data={updates} width={300} height={96} color="#2563eb" labels={yearsLabels} selectedIndex={selectedPredioYearIdx} onBarClick={(i) => setSelectedPredioYearIdx(i)} />
                                {selectedPredioYearIdx !== null ? (
                                  <div className="mt-2 text-sm text-gray-700">Año: <strong>{yearsLabels[selectedPredioYearIdx]}</strong> — Actualizaciones: <strong>{updates[selectedPredioYearIdx]}</strong></div>
                                ) : null}
                              </>
                            )
                          })()
                        ) : null}
                      </div>

                      <div className="rounded bg-white p-3 border">
                        <p className="text-xs text-gray-500">Cambio de unidades habitacionales por año</p>
                        {predioObj ? (
                          (() => {
                            const unitsChange = generatePredioUnitsChangePerYear(predioObj.id)
                            return (
                              <>
                                <SimpleLineChart data={unitsChange} width={300} height={96} stroke="#ef4444" onPointClick={(i) => setSelectedPredioUnitsIdx(i)} selectedIndex={selectedPredioUnitsIdx} />
                                {selectedPredioUnitsIdx !== null ? (
                                  <div className="mt-2 text-sm text-gray-700">Año: <strong>{yearsLabels[selectedPredioUnitsIdx]}</strong> — Cambio en unidades: <strong>{unitsChange[selectedPredioUnitsIdx]}</strong></div>
                                ) : (
                                  <div className="mt-2 text-sm text-gray-700">Haz click en un punto para ver el cambio en unidades ese año.</div>
                                )}
                              </>
                            )
                          })()
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-2 text-sm text-gray-600">Seleccione un predio para ver sus características y geometría.</div>
              )}
            </div>
            {/* Activity/summary removed as requested */}
          </>
        ) : (
          /* Formularios tab */
          <section className="rounded-lg bg-white p-4 shadow-sm border">
            <h2 className="text-sm font-medium text-gray-700 mb-3">Estadísticas de Formularios</h2>

            {/* General stats - two interactive charts */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded bg-white p-3 border">
                <p className="text-xs text-gray-500">Subidas por día (última semana)</p>
                <SimpleLineChart data={formsPerDay} width={720} height={120} stroke="#2563eb" selectedIndex={selectedFormsDayIdx} onPointClick={(i) => setSelectedFormsDayIdx(i)} />
                {selectedFormsDayIdx !== null ? (
                  <div className="mt-2 text-sm text-gray-700">Día seleccionado: <strong>{selectedFormsDayIdx + 1}</strong> — Subidas: <strong>{formsPerDay[selectedFormsDayIdx]}</strong></div>
                ) : null}
              </div>

              <div className="rounded bg-white p-3 border">
                <p className="text-xs text-gray-500">Errores por día (última semana)</p>
                <SimpleBarChart data={formErrors} width={360} height={120} color="#ef4444" selectedIndex={selectedFormErrorIdx} onBarClick={(i) => setSelectedFormErrorIdx(i)} labels={['Lun','Mar','Mié','Jue','Vie','Sáb','Dom']} />
                {selectedFormErrorIdx !== null ? (
                  <div className="mt-2 text-sm text-gray-700">Día: <strong>{['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'][selectedFormErrorIdx]}</strong> — Errores: <strong>{formErrors[selectedFormErrorIdx]}</strong></div>
                ) : null}
              </div>
            </div>

            {/* Form selector */}
            <div className="mt-6">
              <label className="text-xs text-gray-600">Seleccionar formulario</label>
              <select className="w-full mt-1 p-2 border rounded" value={selectedFormId} onChange={(e) => { setSelectedFormId(e.target.value); setSelectedFormQ1Idx(null); setSelectedFormQ2Idx(null); }}>
                <option value="">-- Ninguno --</option>
                {formsList.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
              </select>
            </div>

            {/* Per-form statistics */}
            <div className="mt-4">
              {selectedFormId ? (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Estadísticas del formulario: <span className="font-semibold">{formsList.find(x => x.id === selectedFormId)?.name}</span></h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded bg-white p-3 border">
                      <p className="text-xs text-gray-500">Cantidad de unidades habitacionales (por predio)</p>
                      {(() => {
                        const q1 = generateFormResponsesQ1(selectedFormId, selectedPredio)
                        const labels = ['1','2','3-4','5+']
                        return (
                          <>
                            <SimpleBarChart data={q1} width={360} height={120} color="#06b6d4" labels={labels} selectedIndex={selectedFormQ1Idx} onBarClick={(i) => setSelectedFormQ1Idx(i)} />
                            {selectedFormQ1Idx !== null ? (
                              <div className="mt-2 text-sm text-gray-700">Bin: <strong>{labels[selectedFormQ1Idx]}</strong> — Respuestas: <strong>{q1[selectedFormQ1Idx]}</strong></div>
                            ) : null}
                          </>
                        )
                      })()}
                    </div>

                    <div className="rounded bg-white p-3 border">
                      <p className="text-xs text-gray-500">Tipo de predio</p>
                      {(() => {
                        const q2 = generateFormResponsesQ2(selectedFormId, selectedPredio)
                        const labels = ['Vivienda','Comercio','Mixto','Otro']
                        return (
                          <>
                            <SimpleBarChart data={q2} width={360} height={120} color="#f59e0b" labels={labels} selectedIndex={selectedFormQ2Idx} onBarClick={(i) => setSelectedFormQ2Idx(i)} />
                            {selectedFormQ2Idx !== null ? (
                              <div className="mt-2 text-sm text-gray-700">Categoría: <strong>{labels[selectedFormQ2Idx]}</strong> — Respuestas: <strong>{q2[selectedFormQ2Idx]}</strong></div>
                            ) : null}
                          </>
                        )
                      })()}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded bg-white p-4 border text-sm text-gray-600">Seleccione un formulario para ver estadísticas específicas.</div>
              )}
            </div>
          </section>
        )}
          </div>
      </main>
    </div>
  )
}
