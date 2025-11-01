// frontend/src/data/neighborhoods.js

export default [
  {
    id: 'san_miguel',
    name: 'San Miguel de la Cañada',
    center: { lat: 4.58668, lng: -74.21182 },
    houses: [
      {
        id: 1,
        address: 'Cl 22A #9-62',
        owner: 'Luis Gómez',
        families: 3,
        polygon: [
          { lat: 4.58683, lng: -74.21190 },
          { lat: 4.58683, lng: -74.21173 },
          { lat: 4.58668, lng: -74.21173 },
          { lat: 4.58668, lng: -74.21190 },
        ],
      },
      {
        id: 2,
        address: 'Cl 22A #9-58',
        owner: 'María López',
        families: 4,
        polygon: [
          { lat: 4.58665, lng: -74.21210 },
          { lat: 4.58665, lng: -74.21195 },
          { lat: 4.58650, lng: -74.21195 },
          { lat: 4.58650, lng: -74.21210 },
        ],
      },
      {
        id: 3,
        address: 'Cl 22B #9-60',
        owner: 'Ana Ruiz',
        families: 2,
        polygon: [
          { lat: 4.58695, lng: -74.21170 },
          { lat: 4.58695, lng: -74.21155 },
          { lat: 4.58680, lng: -74.21155 },
          { lat: 4.58680, lng: -74.21170 },
        ],
      },
    ],
  },
]
