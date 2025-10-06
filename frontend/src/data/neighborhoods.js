// Shared neighborhoods sample data used by Dashboard and Statistics
const neighborhoods = [
    {
        id: 'san_miguel',
        name: 'San Miguel de La Cañada',
        boundary: { points: '40,60 960,40 980,160 920,540 120,560 40,420' },
        houses: [
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
    },
    {
        id: 'las_flores',
        name: 'Barrio Las Flores',
        boundary: { points: '60,40 940,30 970,140 900,520 140,540 60,380' },
        houses: [
            { id: 101, address: 'Av. Flor #1', owner: 'Ana P.', families: 2, points: '130,120 190,120 175,180 120,180' },
            { id: 102, address: 'Av. Flor #2', owner: 'Roberto M.', families: 3, points: '210,120 270,120 255,180 200,180' },
            { id: 103, address: 'Av. Flor #3', owner: 'Lucía B.', families: 1, points: '290,120 350,120 335,180 280,180' },
            { id: 104, address: 'Av. Flor #4', owner: 'Carlos V.', families: 4, points: '370,120 430,120 415,180 360,180' },
        ]
    }
]

export default neighborhoods
