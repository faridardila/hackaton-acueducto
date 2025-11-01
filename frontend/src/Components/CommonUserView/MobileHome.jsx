import React, { useState } from 'react'
import MobileFooter from './MobileFooter'
import neighborhoods from '../../data/neighborhoods'

export default function MobileHome() {
  const [active, setActive] = useState('cuenta')
  const [saved, setSaved] = useState(false)
  const [mapSelectOpen, setMapSelectOpen] = useState(false)

  // Referidos state
  const [referralLink] = useState('https://www.shorten.com/asjJK1DI')
  const [referralCode] = useState('ASJJK1DI')
  const [referralCount, setReferralCount] = useState(2)
  // Inicio (forms & XP) state
  const [expPoints, setExpPoints] = useState(120)
  const [forms, setForms] = useState([
    {
      id: 'f1',
      title: 'Formulario de Satisfacción',
      description: 'Responde 3 preguntas sobre el servicio',
      completed: false,
      uploaded: false,
      reward: 10,
      fields: ['¿Cómo califica el servicio?', '¿Hubo cortes recientes?', 'Comentarios adicionales']
    },
    {
      id: 'f2',
      title: 'Encuesta de Agua',
      description: 'Reporta su percepción del agua en tu zona',
      completed: false,
      uploaded: false,
      reward: 15,
      fields: ['¿Color del agua?', '¿Olor presente?', 'Presión del agua', 'Comentarios']
    },
  ])
  const [formModalOpen, setFormModalOpen] = useState(false)
  const [activeFormId, setActiveFormId] = useState(null)
  const [formResponses, setFormResponses] = useState({}) // { formId: { field0: value, ... , progress: number }}

  const [location, setLocation] = useState('')
  const [selectedPredio, setSelectedPredio] = useState(null)
  const [nombres, setNombres] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [idType, setIdType] = useState('Cédula de Ciudadanía')
  const [idNumber, setIdNumber] = useState('')
  const [errors, setErrors] = useState({})

  function validateBogotaAddress(addr) {
    if (!addr || typeof addr !== 'string') return false
    const hasHash = addr.includes('#')
    const hasDash = addr.includes('-')
    if (!hasHash || !hasDash) return false
    const re = /^([A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9\s\.]{1,})#\s*\d+\s*-\s*\d+$/i
    return re.test(addr.replace(/\s+/g, ' '))
  }

  function handleUpdate() {
    const errs = {}
    if (!validateBogotaAddress(location)) errs.location = 'La dirección no tiene el formato válido (ej: KR 12 #15-32)'
    if (!nombres) errs.nombres = 'Ingrese nombres'
    if (!apellidos) errs.apellidos = 'Ingrese apellidos'
    const allowed = ['Cédula de Ciudadanía', 'Tarjeta de Identidad', 'Registro Civil', 'Pasaporte']
    if (!allowed.includes(idType)) errs.idType = 'Tipo de identificación no permitido'
    if (!idNumber) errs.idNumber = 'Ingrese número de identificación'
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setErrors({})
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  function openMapSelector() {
    setMapSelectOpen(true)
  }

  function closeMapSelector() {
    setMapSelectOpen(false)
  }

  function handleSelectPredio(house) {
    setSelectedPredio(house)
    setMapSelectOpen(false)
  }

  function handleNavigate(tab) {
    setActive(tab)
  }

  async function copyReferral() {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(referralLink)
      } else {
        const ta = document.createElement('textarea')
        ta.value = referralLink
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
      }
      alert('Enlace de referido copiado al portapapeles')
    } catch (e) {
      console.error(e)
      alert('No se pudo copiar. Seleccione y copie manualmente.')
    }
  }

  function shareTo(platform) {
    const url = encodeURIComponent(referralLink)
    const text = encodeURIComponent('Únete a la comunidad y gana recompensas!')
    let shareUrl = ''
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
        break
      case 'x':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`
        break
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${text}%20${url}`
        break
      case 'instagram':
        // Instagram does not support web share URL to prefill posts; open Instagram and fallback to copying
        shareUrl = 'https://www.instagram.com/'
        break
      default:
        shareUrl = ''
    }
    if (navigator.share) {
      // prefer native share on mobile
      navigator.share({ title: 'Comparte y gana', text: 'Únete a la comunidad', url: referralLink }).catch(() => {
        if (shareUrl) window.open(shareUrl, '_blank')
      })
    } else if (shareUrl) {
      window.open(shareUrl, '_blank')
    }
  }

  function handleFieldChange(formId, fieldIndex, value) {
    setFormResponses((prev) => {
      const curr = prev[formId] || { progress: 0 }
      const next = { ...curr, [`field${fieldIndex}`]: value }
      // recalc progress
      const form = forms.find((f) => f.id === formId)
      const total = form ? form.fields.length : 1
      let filled = 0
      for (let i = 0; i < total; i++) {
        if (next[`field${i}`] && String(next[`field${i}`]).trim() !== '') filled++
      }
      next.progress = Math.round((filled / total) * 100)
      return { ...prev, [formId]: next }
    })
  }

  function acceptFormFromModal() {
    if (!activeFormId) return
    const f = forms.find((x) => x.id === activeFormId)
    const resp = formResponses[activeFormId] || { progress: 0 }
    if ((resp.progress || 0) < 100) {
      alert('Complete todos los campos antes de aceptar (100%)')
      return
    }
    // mark form completed
    setForms((prev) => prev.map((p) => (p.id === f.id ? { ...p, completed: true } : p)))
    setFormModalOpen(false)
    setActiveFormId(null)
    alert('Formulario marcado como completado. Ahora puede pulsar "Subir" para sumar XP.')
  }

  function closeFormModal() {
    setFormModalOpen(false)
    setActiveFormId(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-2xl mx-auto px-4 pt-6">
        {/* Referidos screen */}
        {active === 'referidos' ? (
          <div className="p-4 bg-white rounded shadow">
            <h3 className="font-semibold mb-3 text-center">Comparte y ten más oportunidades de ganar</h3>

            <div className="flex flex-col items-center">
              {/* QR placeholder - simple SVG that looks like a QR */}
              <div className="bg-white p-4 rounded shadow mb-3">
                {/* QR generated from referralLink - deterministic, looks like a real QR */}
                {(() => {
                  // build a QR-like matrix deterministically from the referral link
                  const modules = 25
                  const cell = 8
                  const padding = 8
                  // simple string hash (FNV-1a like)
                  function hashString(s) {
                    let h = 2166136261 >>> 0
                    for (let i = 0; i < s.length; i++) {
                      h ^= s.charCodeAt(i)
                      h = Math.imul(h, 16777619) >>> 0
                    }
                    return h
                  }

                  function seededRandom(seed) {
                    let state = seed >>> 0
                    return function () {
                      state = Math.imul(state ^ (state << 13), 0x5bd1e995) >>> 0
                      return (state >>> 0) / 0xffffffff
                    }
                  }

                  function makeMatrix(text) {
                    const seed = hashString(text)
                    const rnd = seededRandom(seed)
                    // start with false matrix
                    const m = Array.from({ length: modules }).map(() => Array(modules).fill(false))

                    // place finder patterns (7x7) like a QR
                    function placeFinder(x0, y0) {
                      for (let y = -3; y <= 3; y++) {
                        for (let x = -3; x <= 3; x++) {
                          const ax = x0 + x
                          const ay = y0 + y
                          if (ax < 0 || ay < 0 || ax >= modules || ay >= modules) continue
                          const dist = Math.max(Math.abs(x), Math.abs(y))
                          m[ay][ax] = dist !== 2
                        }
                      }
                    }

                    placeFinder(3, 3)
                    placeFinder(modules - 4, 3)
                    placeFinder(3, modules - 4)

                    // fill rest using pseudo-random bits, leave finder areas intact
                    for (let y = 0; y < modules; y++) {
                      for (let x = 0; x < modules; x++) {
                        // skip if already set by finder
                        if (m[y][x]) continue
                        // create some structure: make vertical stripes and randomness
                        const r = rnd()
                        m[y][x] = r > 0.6
                      }
                    }

                    // add quiet zone (set border to false)
                    for (let i = 0; i < 2; i++) {
                      for (let j = 0; j < modules; j++) {
                        m[i][j] = false
                        m[modules - 1 - i][j] = false
                        m[j][i] = false
                        m[j][modules - 1 - i] = false
                      }
                    }

                    return m
                  }

                  const matrix = makeMatrix(referralLink)
                  const size = modules * cell + padding * 2

                  return (
                    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
                      <rect width={size} height={size} fill="#ffffff" rx="6" />
                      <g transform={`translate(${padding}, ${padding})`}>
                        {matrix.map((row, y) =>
                          row.map((v, x) =>
                            v ? (
                              <rect key={`r-${x}-${y}`} x={x * cell} y={y * cell} width={cell} height={cell} fill="#111827" />
                            ) : null
                          )
                        )}
                      </g>
                    </svg>
                  )
                })()}
              </div>

              <div className="w-full mb-3">
                <div className="flex items-center space-x-2">
                  <input readOnly value={referralLink} className="flex-1 rounded-l-md border px-3 py-2 text-sm" />
                  <button onClick={copyReferral} className="px-3 py-2 bg-blue-600 text-white rounded-r-md">Copiar</button>
                  <button onClick={() => shareTo()} className="ml-2 px-3 py-2 bg-blue-600 text-white rounded-md">Compartir</button>
                </div>
              </div>

              <div className="text-sm text-center text-gray-600 mb-4">o comparte el siguiente link con la comunidad, para aumentar las probabilidades de ganar.</div>

              <div className="text-center mb-6">
                <div className="text-sm text-gray-600">Número de referidos:</div>
                <div className="text-3xl font-bold">{referralCount}</div>
              </div>

              <div className="w-full grid grid-cols-4 gap-3">
                <button onClick={() => shareTo('facebook')} className="py-2 px-2 bg-blue-700 text-white rounded flex items-center justify-center">Facebook</button>
                <button onClick={() => shareTo('x')} className="py-2 px-2 bg-slate-800 text-white rounded flex items-center justify-center">X</button>
                <button onClick={() => shareTo('whatsapp')} className="py-2 px-2 bg-green-500 text-white rounded flex items-center justify-center">WhatsApp</button>
                <button onClick={() => shareTo('instagram')} className="py-2 px-2 bg-pink-500 text-white rounded flex items-center justify-center">Instagram</button>
              </div>
            </div>
          </div>
        ) : active === 'inicio' ? (
          /* Inicio screen: forms panel + PQRS/support */
          <div className="space-y-4">
            <div className="p-4 bg-white rounded shadow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">Formularios publicados</div>
                  <div className="text-xl font-semibold">{forms.length}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Experiencia</div>
                  <div className="text-xl font-bold text-emerald-600">{expPoints} XP</div>
                </div>
              </div>

              <div className="mt-3 space-y-2">
                {forms.map((f) => {
                  const resp = formResponses[f.id] || { progress: 0 }
                  const pct = Math.round(resp.progress || 0)
                  return (
                    <div key={f.id} className="border rounded p-3">
                      <div className="flex items-start">
                        <div className="w-16 h-16 mr-3 flex-shrink-0 flex items-center justify-center bg-sky-50 rounded">
                          {/* simple friendly SVG per form */}
                          {f.id === 'f1' ? (
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="20" height="18" rx="2" stroke="#0369a1" strokeWidth="1.2" fill="#e6f6ff" /><path d="M7 8h10M7 12h6" stroke="#0369a1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          ) : (
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="8" r="3" stroke="#0ea5a4" strokeWidth="1.2" fill="#e6fffb" /><path d="M4 20c2-3 6-5 8-5s6 2 8 5" stroke="#0ea5a4" strokeWidth="1.2" strokeLinecap="round"/></svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className={`font-medium ${f.completed ? 'line-through text-gray-400' : ''}`}>{f.title}</div>
                          <div className="text-sm text-gray-600">{f.description}</div>

                          <div className="mt-2">
                            <div className="w-full bg-gray-200 rounded h-3 overflow-hidden">
                              <div className="h-3 bg-emerald-500" style={{ width: `${pct}%` }} />
                            </div>
                            <div className="text-xs text-gray-500 mt-1">Progreso: {pct}%</div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div>
                          <button
                            onClick={() => {
                              // open the form modal
                              setActiveFormId(f.id)
                              // initialize responses if needed
                              setFormResponses((prev) => {
                                if (prev[f.id]) return prev
                                const initial = { progress: 0 }
                                f.fields.forEach((_, i) => (initial[`field${i}`] = ''))
                                return { ...prev, [f.id]: initial }
                              })
                              setFormModalOpen(true)
                            }}
                            className="px-3 py-2 bg-blue-600 text-white rounded">
                            Aceptar
                          </button>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              // upload only allowed when form completed and not yet uploaded
                              if (!f.completed) {
                                alert('Completa el formulario al 100% antes de subir')
                                return
                              }
                              if (f.uploaded) {
                                alert('Formulario ya subido')
                                return
                              }
                              // mark uploaded and add XP
                              setForms((prev) => prev.map((p) => (p.id === f.id ? { ...p, uploaded: true } : p)))
                              setExpPoints((s) => s + (f.reward || 10))
                              alert('Formulario subido. XP añadida')
                            }}
                            className={`px-3 py-2 rounded ${f.completed && !f.uploaded ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                            Subir
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="p-3 bg-white rounded shadow">
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium">Atención al usuario</div>
                <div className="text-sm text-gray-500">Soporte y PQRS</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => window.open('https://www.acueducto.com.co/wps/portal/EAB2/Home/atencion-al-usuario/tramites-y-servicios/peticion_queja_reclamo_y_sugerencias-pqrs/pqr', '_blank')} className="px-3 py-2 bg-yellow-500 text-white rounded">Registrar PQRS</button>
                <button onClick={() => window.open('https://www.acueducto.com.co/wps/portal/EAB2/Home/atencion-al-usuario', '_blank')} className="px-3 py-2 bg-sky-600 text-white rounded">Ir a Atención</button>
              </div>
            </div>
          </div>
        ) : (
          /* Cuenta form (unchanged) */
          <div className="p-4 bg-white rounded shadow">
            <h3 className="font-semibold mb-3">Actualización de datos</h3>

            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">Dirección (formato Bogotá)</label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className={`mt-1 w-full rounded-md bg-white border px-3 py-2 ${errors.location ? 'border-red-400' : ''}`}
                  placeholder="KR 12 #15-32"
                />
                {errors.location && <div className="text-sm text-red-600 mt-1">{errors.location}</div>}
              </div>

              <div>
                <label className="text-sm text-gray-600">Ubicación del predio en el mapa de polígonos</label>
                <div className="flex items-center space-x-2 mt-2">
                  <button
                    onClick={openMapSelector}
                    disabled={!validateBogotaAddress(location)}
                    className={`px-3 py-2 rounded ${validateBogotaAddress(location) ? 'bg-emerald-50 text-emerald-800' : 'bg-gray-100 text-gray-400'}`}>
                    Seleccionar en mapa
                  </button>
                  <div className="text-sm text-gray-600">{selectedPredio ? selectedPredio.address : 'Ningún predio seleccionado'}</div>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600">Nombres</label>
                <input value={nombres} onChange={(e) => setNombres(e.target.value)} className={`mt-1 w-full rounded-md bg-sky-100 border px-3 py-2 ${errors.nombres ? 'border-red-400' : ''}`} />
                {errors.nombres && <div className="text-sm text-red-600 mt-1">{errors.nombres}</div>}
              </div>

              <div>
                <label className="text-sm text-gray-600">Apellidos</label>
                <input value={apellidos} onChange={(e) => setApellidos(e.target.value)} className={`mt-1 w-full rounded-md bg-sky-100 border px-3 py-2 ${errors.apellidos ? 'border-red-400' : ''}`} />
                {errors.apellidos && <div className="text-sm text-red-600 mt-1">{errors.apellidos}</div>}
              </div>

              <div>
                <label className="text-sm text-gray-600">Tipo de identificación</label>
                <select value={idType} onChange={(e) => setIdType(e.target.value)} className={`mt-1 w-full rounded-md bg-sky-100 border px-3 py-2 ${errors.idType ? 'border-red-400' : ''}`}>
                  <option>Cédula de Ciudadanía</option>
                  <option>Tarjeta de Identidad</option>
                  <option>Registro Civil</option>
                  <option>Pasaporte</option>
                </select>
                {errors.idType && <div className="text-sm text-red-600 mt-1">{errors.idType}</div>}
              </div>

              <div>
                <label className="text-sm text-gray-600">Número de identificación</label>
                <input value={idNumber} onChange={(e) => setIdNumber(e.target.value)} className={`mt-1 w-full rounded-md bg-white border px-3 py-2 ${errors.idNumber ? 'border-red-400' : ''}`} />
                {errors.idNumber && <div className="text-sm text-red-600 mt-1">{errors.idNumber}</div>}
              </div>

              <div className="mt-3">
                <button onClick={handleUpdate} className="w-full bg-blue-600 text-white py-2 rounded-lg">Guardar actualización</button>
              </div>
            </div>

            {saved && <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded">Tus datos fueron actualizados correctamente.</div>}
          </div>
        )}
      </div>

      <MobileFooter active={active} onNavigate={handleNavigate} />

      {/* Map selector modal for choosing a predio polygon */}
      {mapSelectOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-11/12 max-w-3xl bg-white rounded-md p-4 overflow-auto">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Selecciona el predio en el mapa</h3>
              <button onClick={closeMapSelector} className="text-gray-600">Cerrar</button>
            </div>

            <div className="border rounded overflow-hidden">
              <svg viewBox="0 0 1000 600" className="w-full h-96 bg-white">
                {/* Neighborhood boundaries */}
                {neighborhoods.map((nb, i) => (
                  <polygon key={nb.id} points={nb.boundary.points} fill={i % 2 === 0 ? '#f0f9ff' : '#f8fafc'} stroke="#bae6fd" strokeWidth="2" />
                ))}

                {/* Houses as small polygons - clickable */}
                {neighborhoods.flatMap((nb) => nb.houses.map((h) => (
                  <polygon
                    key={`h-${h.id}`}
                    points={h.points}
                    fill={selectedPredio && selectedPredio.id === h.id ? '#60a5fa' : '#93c5fd'}
                    stroke={selectedPredio && selectedPredio.id === h.id ? '#1e3a8a' : '#0284c7'}
                    strokeWidth={selectedPredio && selectedPredio.id === h.id ? 2.5 : 1}
                    className="cursor-pointer"
                    onClick={() => handleSelectPredio({ ...h, neighborhood: nb.id })}
                  />
                )))}
              </svg>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="text-sm text-gray-700">Seleccionado: {selectedPredio ? selectedPredio.address : 'Ninguno'}</div>
              <div>
                <button onClick={closeMapSelector} className="mr-2 px-3 py-2 rounded bg-gray-100">Cancelar</button>
                <button
                  onClick={() => {
                    if (selectedPredio) {
                      setMapSelectOpen(false)
                    } else {
                      alert('Por favor selecciona un predio en el mapa')
                    }
                  }}
                  className="px-3 py-2 rounded bg-blue-600 text-white"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form modal for completing a form */}
      {formModalOpen && activeFormId && (() => {
        const form = forms.find((f) => f.id === activeFormId)
        const resp = formResponses[activeFormId] || { progress: 0 }
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="w-11/12 max-w-lg bg-white rounded-md p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">{form.title}</h3>
                <button onClick={closeFormModal} className="text-gray-600">Cerrar</button>
              </div>

              <div className="space-y-3">
                <div className="text-sm text-gray-600">{form.description}</div>
                {form.fields.map((label, i) => (
                  <div key={i}>
                    <label className="text-xs text-gray-500">{label}</label>
                    <input value={resp[`field${i}`] || ''} onChange={(e) => handleFieldChange(form.id, i, e.target.value)} className="mt-1 w-full rounded border px-3 py-2" />
                  </div>
                ))}

                <div>
                  <div className="w-full bg-gray-200 rounded h-3 overflow-hidden">
                    <div className="h-3 bg-emerald-500" style={{ width: `${resp.progress || 0}%` }} />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Progreso: {resp.progress || 0}%</div>
                </div>

                <div className="flex justify-end space-x-2">
                  <button onClick={closeFormModal} className="px-3 py-2 rounded bg-gray-200">Guardar</button>
                  <button onClick={acceptFormFromModal} className="px-3 py-2 rounded bg-blue-600 text-white">Aceptar</button>
                </div>
              </div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}
