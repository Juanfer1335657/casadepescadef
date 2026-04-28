export interface Department {
  id: string;
  name: string;
  cities: string[];
  shipping: {
    servientrega: number;
    interrapidisimo: number;
    days: string;
  };
}

// Envíos calculados desde Villavicencio (Meta)
export const COLOMBIA_DEPARTMENTS: Department[] = [
  { id: 'META', name: 'Meta', cities: ['Villavicencio', 'Granada', 'Puerto López', 'Acacías', 'San Martín', 'Puerto Gaitán', 'Mesetas', 'Leiva', 'Mapiripán', 'Campoalegre', 'Cubarral', 'San Juan de Arama', 'Vistahermosa', 'La Macarena', 'Puerto Concordia', 'Cabuyaro'], shipping: { servientrega: 5000, interrapidisimo: 4000, days: '1 día' } },
  { id: 'CUNDINAMARCA', name: 'Cundinamarca', cities: ['Bogotá', 'Zipaquirá', 'Facatativá', 'Girardot', 'Chía', 'Soacha', 'Funza', 'Madrid', 'Cajicá', 'Tocancipá', 'Sopó', 'La Calera', 'Choachí', 'Ubalá', 'Guasca', 'Guatavita', 'Nemocón', 'Suesca', 'Carmen de Carupa', 'Cáchira', 'San Cayetano', 'Uttica', 'Vergara', 'Ricaurte', 'Agua de Dios', 'Nimaima', 'Paratebueno', 'Manta', 'Pullopó'], shipping: { servientrega: 8000, interrapidisimo: 6500, days: '1-2 días' } },
  { id: 'BOYACA', name: 'Boyacá', cities: ['Tunja', 'Duitama', 'Sogamoso', 'Chiquinquirá', 'Paipa', 'Moniquirá', 'Sora', 'Cómbita', 'Tota', 'Susacón', 'San Miguel de Sema', 'Ráquira', 'Tibasosa', 'Sotaquirá', 'Nobsa', 'Cerinza', 'Betéitiva', 'Gacán', 'Paz de Río', 'Políticar', 'San Eduardo', 'Chivatá'], shipping: { servientrega: 9000, interrapidisimo: 7500, days: '1-2 días' } },
  { id: 'HUILA', name: 'Huila', cities: ['Neiva', 'Pitalito', 'Garzón', 'La Plata', 'Campoalegre', 'Teruel', 'Baraya', 'Yaguará', 'Iquira', 'Colombia', 'Santa María', 'Suaza', 'Palestina', 'Opet', 'Timar', 'San Ambrosio', 'El Agrado', 'Altamira', 'Becerrán'], shipping: { servientrega: 10000, interrapidisimo: 8500, days: '1-2 días' } },
  { id: 'CASANARE', name: 'Casanare', cities: ['Yopal', 'Aguazul', 'Villanueva', 'Tauramena', 'Maní', 'Monterrey', 'Pore', 'Trinidad', 'San Luis de Palenque', 'Nunchía', 'Sácama', 'Chámeza', 'Salinas', 'Caráchal', 'Recetor', 'San Andrés', 'La Esperanza', 'Macaguan'], shipping: { servientrega: 10000, interrapidisimo: 8500, days: '1-2 días' } },
  { id: 'TOLIMA', name: 'Tolima', cities: ['Ibagué', 'Espinal', 'Melgar', 'Honda', 'Lérida', 'Armero', 'Mariquita', 'Purificación', 'Natagaima', 'Ortega', 'Chaparral', 'Coyaima', 'Santa Isabel', 'Venadillo', 'Saldaña', 'Anzoátegui', 'Valle de San Juan', 'Santo Domingo', 'Córdoba', 'Rovira', 'Carmen de Apicalá', 'Icononzo', 'Flandes', 'Girardot', 'Hernandarias'], shipping: { servientrega: 11000, interrapidisimo: 9000, days: '2 días' } },
  { id: 'ANTIOQUIA', name: 'Antioquia', cities: ['Medellín', 'Bogotá', 'Cali', 'Barranquilla', 'Cartagena', 'Bucaramanga', 'Pereira', 'Manizales', 'Ibagué', 'Neiva', 'Armenia', 'Pasto', 'Tunja', 'Villavicencio', 'Riohacha', 'Sincelejo', 'Valledupar', 'Montería', 'Quibdó', 'San Andrés'], shipping: { servientrega: 12000, interrapidisimo: 10000, days: '2-3 días' } },
  { id: 'CALDAS', name: 'Caldas', cities: ['Manizales', 'Pereira', 'Armenia', 'La Dorada', 'Chinchiná', 'Neira', 'Filadelfia', 'Pensilvania', 'Samaná', 'Marulanda', 'Risaralda', 'Belalcázar', 'Supía', 'Marmato', 'Aranzazu', 'Neira'], shipping: { servientrega: 12000, interrapidisimo: 10000, days: '2-3 días' } },
  { id: 'QUINDIO', name: 'Quindío', cities: ['Armenia', 'Calarcá', 'Montenegro', 'Pijao', 'Filandia', 'Salento', 'Quimbaya', 'Circasia', 'Granada', 'Córdoba', 'Genova', 'Barragán'], shipping: { servientrega: 12000, interrapidisimo: 10000, days: '2-3 días' } },
  { id: 'RISARALDA', name: 'Risaralda', cities: ['Pereira', 'Dosquebradas', 'Santa Rosa de Cabal', 'La Virginia', 'Marsella', 'Quinchía', 'Belén de Umbría', 'Apía', 'Santuario', 'Mistrató', 'Balboa'], shipping: { servientrega: 12000, interrapidisimo: 10000, days: '2-3 días' } },
  { id: 'SANTANDER', name: 'Santander', cities: ['Bucaramanga', 'Floridablanca', 'Girón', 'Barrancabermeja', 'Piedecuesta', 'San Gil', 'Barichara', 'Zapatoca', 'Sucre', ' Vélez', 'Socorro', 'Ocamonte', 'Mogotes', 'Aratatoca', 'Jordán', 'Chima'], shipping: { servientrega: 14000, interrapidisimo: 11500, days: '2-3 días' } },
  { id: 'NORTE_SANTANDER', name: 'Norte de Santander', cities: ['Cúcuta', 'Ocaña', 'Pamplona', 'Villa del Rosario', 'Los Patios', 'El Zulia', 'Saravena', 'Tame', 'Abrego', 'Convención', 'Teorama', 'El Carmen', 'La Playa', 'Bochalema', 'Chinacota', 'Arboledas', 'Gramalote'], shipping: { servientrega: 16000, interrapidisimo: 13000, days: '3-4 días' } },
  { id: 'VALLE_CAUCA', name: 'Valle del Cauca', cities: ['Cali', 'Palmira', 'Buenaventura', 'Tuluá', 'Buga', 'Cartago', 'Tulúa', 'Sevilla', 'La Unión', 'Ansermanuevo', 'Alcalá', 'Argelia', 'Bolívar', 'Caicedonia', 'Dagua', 'El Águila', 'El Cairo', 'Guacarí', 'Jamundí', 'La Victoria', 'Obando', 'Pradera', 'Restrepo', 'Riofrío', 'San Pedro', 'Trujillo', 'Ulloa', 'Versalles', 'Yumbo', 'Zarzal'], shipping: { servientrega: 16000, interrapidisimo: 13000, days: '3-4 días' } },
  { id: 'CAUCA', name: 'Cauca', cities: ['Popayán', 'Santander de Quilichao', 'Patía', 'El Tambo', 'Piendamó', 'Cajibío', 'Bolívar', 'Buenos Aires', 'Caldono', 'Corinto', 'Inzá', 'La Sierra', 'La Vega', 'Morales', 'Páez', 'Pito', 'Rosas', 'San Sebastián', 'Santa Rosa', 'Sotará', ' Suárez', 'Timbío', 'Timbiquí', 'Toribío', 'Totoro'], shipping: { servientrega: 18000, interrapidisimo: 15000, days: '3-4 días' } },
  { id: 'NARIÑO', name: 'Nariño', cities: ['Pasto', 'Ipiales', 'Tumaco', 'Pastos', 'Barbacoas', 'Cumbitara', 'El Charco', 'El Rosario', 'Francisco Pizarro', 'Iles', 'Imués', 'Leiva', 'Liná', 'Magüí', 'Mallama', 'Mosquera', 'Olaya Herrera', 'Ospina', 'Providencia', 'Puelapí', 'Roberto Payán', 'Samaná', 'San Bernardo', 'San José de Albán', 'San Pablo', 'Sandoná', 'Santa Cruz', 'Sapuyés', 'Túquerres', 'Yacuanquer'], shipping: { servientrega: 28000, interrapidisimo: 24000, days: '5-6 días' } },
  { id: 'CAQUETA', name: 'Caquetá', cities: ['Florencia', 'San Vicente del Caguán', 'Putumayo'], shipping: { servientrega: 18000, interrapidisimo: 15000, days: '3-4 días' } },
  { id: 'PUTUMAYO', name: 'Putumayo', cities: ['Mocoa', 'Puerto Asís', 'Sibundoy'], shipping: { servientrega: 20000, interrapidisimo: 17000, days: '4-5 días' } },
  { id: 'GUAVIARE', name: 'Guaviare', cities: ['San José del Guaviare'], shipping: { servientrega: 22000, interrapidisimo: 18000, days: '4-5 días' } },
  { id: 'VAUPES', name: 'Vaupés', cities: ['Mitú'], shipping: { servientrega: 35000, interrapidisimo: 30000, days: '6-7 días' } },
  { id: 'GUAINIA', name: 'Guainía', cities: ['Inírida'], shipping: { servientrega: 35000, interrapidisimo: 30000, days: '6-7 días' } },
  { id: 'VICHADA', name: 'Vichada', cities: ['Puerto Carreño'], shipping: { servientrega: 28000, interrapidisimo: 24000, days: '5-6 días' } },
  { id: 'AMAZONAS', name: 'Amazonas', cities: ['Leticia', 'Puerto Amazonas'], shipping: { servientrega: 35000, interrapidisimo: 30000, days: '6-7 días' } },
  { id: 'ARAUCA', name: 'Arauca', cities: ['Arauca', 'Saravena', 'Tame'], shipping: { servientrega: 20000, interrapidisimo: 17000, days: '4-5 días' } },
  { id: 'ATLANTICO', name: 'Atlántico', cities: ['Barranquilla', 'Soledad', 'Malambo', 'Puerto Colombia'], shipping: { servientrega: 20000, interrapidisimo: 17000, days: '4-5 días' } },
  { id: 'BOLIVAR', name: 'Bolívar', cities: ['Cartagena', 'Sincelejo', 'Magangué', 'Turbaco'], shipping: { servientrega: 22000, interrapidisimo: 18000, days: '4-5 días' } },
  { id: 'CESAR', name: 'Cesar', cities: ['Valledupar', 'Aguachica', 'Bosconia'], shipping: { servientrega: 20000, interrapidisimo: 17000, days: '4-5 días' } },
  { id: 'CHOCO', name: 'Chocó', cities: ['Quibdó', 'Istmina', 'Condoto'], shipping: { servientrega: 22000, interrapidisimo: 18000, days: '4-5 días' } },
  { id: 'LA_GUAJIRA', name: 'La Guajira', cities: ['Riohacha', 'Maicao', 'Uribia'], shipping: { servientrega: 24000, interrapidisimo: 20000, days: '5-6 días' } },
  { id: 'MAGDALENA', name: 'Magdalena', cities: ['Santa Marta', 'Ciénaga', 'El Banco'], shipping: { servientrega: 22000, interrapidisimo: 18000, days: '4-5 días' } },
  { id: 'SUCRE', name: 'Sucre', cities: ['Sincelejo', 'Corozal', 'Sampués'], shipping: { servientrega: 20000, interrapidisimo: 17000, days: '4-5 días' } },
];

export function getCheapestShipping(departmentId: string): { price: number; carrier: string; days: string } | null {
  const dept = COLOMBIA_DEPARTMENTS.find(d => d.id === departmentId);
  if (!dept) return null;
  
  if (dept.shipping.interrapidisimo < dept.shipping.servientrega) {
    return { price: dept.shipping.interrapidisimo, carrier: 'Interrapidisimo', days: dept.shipping.days };
  }
  return { price: dept.shipping.servientrega, carrier: 'Servientrega', days: dept.shipping.days };
}

export function validateAddress(address: string): boolean {
  const patterns = [
    /^Cra\s*\d+/i,
    /^Calle\s*\d+/i,
    /^Av\.?\s*\d+/i,
    /^Transversal\s*\d+/i,
    /^Diagonal\s*\d+/i,
    /^Cra\s*\d+\s*#\d+-\d+/i,
    /^Calle\s*\d+\s*#\d+-\d+/i,
  ];
  return patterns.some(p => p.test(address.trim()));
}

export function formatCOP(amount: number): string {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(amount);
}