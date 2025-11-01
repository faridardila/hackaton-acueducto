// @ts-nocheck
import React, { useEffect, useState } from "react"
import { MapContainer, TileLayer, Polygon, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

const center = [4.58668, -74.21182] // 📍 San Miguel de la Cañada (centro aproximado)

function MapView() {
  const [buildings, setBuildings] = useState([])

  useEffect(() => {
    async function fetchBuildings() {
      try {
        // 🧭 Consulta Overpass API para obtener todos los edificios del barrio
        const query = `
          [out:json][timeout:50];
          (
            way["building"](4.5840,-74.2140,4.5890,-74.2095);
            relation["building"](4.5840,-74.2140,4.5890,-74.2095);
          );
          out geom;
        `

        const res = await fetch("https://overpass-api.de/api/interpreter", {
          method: "POST",
          body: query,
        })

        if (!res.ok) throw new Error("No se pudo obtener la información del mapa")

        const data = await res.json()

        // 🏘️ Convertir los resultados en polígonos de Leaflet
        const polygons = data.elements
          .filter((el) => (el.type === "way" || el.type === "relation") && el.geometry)
          .map((el) => ({
            id: el.id,
            coords: el.geometry.map((g) => [g.lat, g.lon]),
            tags: el.tags || {},
          }))

        setBuildings(polygons)
        console.log(`🏠 Se encontraron ${polygons.length} edificios o casas en el barrio.`)
      } catch (error) {
        console.error("Error cargando edificios de OpenStreetMap:", error)
      }
    }

    fetchBuildings()
  }, [])

  return (
    <MapContainer
      center={center}
      zoom={18}
      style={{ width: "100%", height: "520px", borderRadius: "0.5rem" }}
    >
      {/* 🗺️ Capa base OpenStreetMap */}
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      {/* 🏡 Polígonos de edificios y casas */}
      {buildings.map((b, i) => (
        <Polygon
          key={b.id || i}
          positions={b.coords}
          pathOptions={{
            color: "#2563eb",
            weight: 1,
            fillColor: "#3b82f6",
            fillOpacity: 0.45,
          }}
        >
          <Popup>
            <div className="text-sm">
              <p><strong>ID:</strong> {b.id}</p>
              <p><strong>Tipo:</strong> {b.tags.building || "Desconocido"}</p>
              {b.tags.name && <p><strong>Nombre:</strong> {b.tags.name}</p>}
            </div>
          </Popup>
        </Polygon>
      ))}
    </MapContainer>
  )
}

export default MapView
