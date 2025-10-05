import React from 'react'
import { ChartBarIcon, UserGroupIcon, UserPlusIcon } from '@heroicons/react/24/outline'

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
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <main className="mx-auto max-w-7xl">
        {/* Activity + summary */}
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

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <StatCard title="Usuarios activos" value="1,248" icon={UserGroupIcon} />
          <StatCard title="Tickets abiertos" value="24" icon={ChartBarIcon} />
          <StatCard title="Tiempo promedio" value="2h 14m" icon={ChartBarIcon} />
          <StatCard title="SLA cumplimiento" value="98%" icon={UserGroupIcon} />
          <StatCard title="CristoRey" value="100%" icon={UserPlusIcon} />
        </section>

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
