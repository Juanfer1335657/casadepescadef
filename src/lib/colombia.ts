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

export const COLOMBIA_DEPARTMENTS: Department[] = [
  { id: 'AMAZONAS', name: 'Amazonas', cities: ['Leticia', 'Puerto Amazonas'], shipping: { servientrega: 35000, interrapidisimo: 30000, days: '6-7 días' } },
  { id: 'ANTIOQUIA', name: 'Antioquia', cities: ['Medellín', 'Bogotá', 'Cali', 'Barranquilla', 'Cartagena', 'Bucaramanga', 'Pereira', 'Manizales', 'Ibagué', 'Neiva', 'Armenia', 'Popayán', 'Pasto', 'Tunja', 'Villavicencio', 'Riohacha', 'Sincelejo', 'Valledupar', 'Montería', 'Quibdó', 'San Andrés'], shipping: { servientrega: 9500, interrapidisimo: 8000, days: '2-3 días' } },
  { id: 'ARAUCA', name: 'Arauca', cities: ['Arauca', 'Saravena', 'Tame'], shipping: { servientrega: 22000, interrapidisimo: 19000, days: '4-5 días' } },
  { id: 'ATLANTICO', name: 'Atlántico', cities: ['Barranquilla', 'Soledad', 'Malambo', 'Puerto Colombia'], shipping: { servientrega: 22000, interrapidisimo: 19000, days: '4-5 días' } },
  { id: 'BOLIVAR', name: 'Bolívar', cities: ['Cartagena', 'Sincelejo', 'Magangué', 'Turbaco'], shipping: { servientrega: 24000, interrapidisimo: 21000, days: '4-5 días' } },
  { id: 'BOYACA', name: 'Boyacá', cities: ['Tunja', 'Duitama', 'Sogamoso', 'Chiquinquirá'], shipping: { servientrega: 10000, interrapidisimo: 8500, days: '2 días' } },
  { id: 'CALDAS', name: 'Caldas', cities: ['Manizales', 'Pereira', 'Armenia', 'La Dorada', 'Chinchiná'], shipping: { servientrega: 5500, interrapidisimo: 4500, days: '1 día' } },
  { id: 'CAQUETA', name: 'Caquetá', cities: ['Florencia', 'San Vicente del Caguán', 'Putumayo'], shipping: { servientrega: 18000, interrapidisimo: 15000, days: '3-4 días' } },
  { id: 'CASANARE', name: 'Casanare', cities: ['Yopal', 'Aguazul', 'Villanueva'], shipping: { servientrega: 16000, interrapidisimo: 13000, days: '2-3 días' } },
  { id: 'CAUCA', name: 'Cauca', cities: ['Popayán', 'Santander de Quilichao', 'Patía'], shipping: { servientrega: 14000, interrapidisimo: 11000, days: '2-3 días' } },
  { id: 'CESAR', name: 'Cesar', cities: ['Valledupar', 'Aguachica', 'Bosconia'], shipping: { servientrega: 23000, interrapidisimo: 20000, days: '4-5 días' } },
  { id: 'CHOCO', name: 'Chocó', cities: ['Quibdó', 'Istmina', 'Condoto'], shipping: { servientrega: 22000, interrapidisimo: 19000, days: '4-5 días' } },
  { id: 'CUNDINAMARCA', name: 'Cundinamarca', cities: ['Bogotá', 'Zipaquirá', 'Facatativá', 'Girardot', 'Chía', 'Soacha'], shipping: { servientrega: 10000, interrapidisimo: 8500, days: '1-2 días' } },
  { id: 'GUAINIA', name: 'Guainía', cities: ['Inírida'], shipping: { servientrega: 35000, interrapidisimo: 30000, days: '6-7 días' } },
  { id: 'GUAVIARE', name: 'Guaviare', cities: ['San José del Guaviare'], shipping: { servientrega: 25000, interrapidisimo: 22000, days: '4-5 días' } },
  { id: 'HUILA', name: 'Huila', cities: ['Neiva', 'Pitalito', 'Garzón'], shipping: { servientrega: 12000, interrapidisimo: 10000, days: '2 días' } },
  { id: 'LA_GUAJIRA', name: 'La Guajira', cities: ['Riohacha', 'Maicao', 'Uribia'], shipping: { servientrega: 26000, interrapidisimo: 23000, days: '5-6 días' } },
  { id: 'MAGDALENA', name: 'Magdalena', cities: ['Santa Marta', 'Ciénaga', 'El Banco'], shipping: { servientrega: 24000, interrapidisimo: 21000, days: '4-5 días' } },
  { id: 'META', name: 'Meta', cities: ['Villavicencio', 'Granada', 'Puerto López'], shipping: { servientrega: 14000, interrapidisimo: 11000, days: '2-3 días' } },
  { id: 'NARIÑO', name: 'Nariño', cities: ['Pasto', 'Ipiales', 'Tumaco'], shipping: { servientrega: 16000, interrapidisimo: 13000, days: '3-4 días' } },
  { id: 'NORTE_SANTANDER', name: 'Norte de Santander', cities: ['Cúcuta', 'Ocaña', 'Pamplona'], shipping: { servientrega: 18000, interrapidisimo: 15000, days: '3-4 días' } },
  { id: 'PUTUMAYO', name: 'Putumayo', cities: ['Mocoa', 'Puerto Asís', 'Sibundoy'], shipping: { servientrega: 22000, interrapidisimo: 19000, days: '4-5 días' } },
  { id: 'QUINDIO', name: 'Quindío', cities: ['Armenia', 'Calarcá', 'Montenegro'], shipping: { servientrega: 6500, interrapidisimo: 5500, days: '1-2 días' } },
  { id: 'RISARALDA', name: 'Risaralda', cities: ['Pereira', 'Dosquebradas', 'Santa Rosa de Cabal'], shipping: { servientrega: 6500, interrapidisimo: 5500, days: '1-2 días' } },
  { id: 'SANTANDER', name: 'Santander', cities: ['Bucaramanga', 'Floridablanca', 'Girón', 'Barrancabermeja'], shipping: { servientrega: 15000, interrapidisimo: 12000, days: '2-3 días' } },
  { id: 'SUCRE', name: 'Sucre', cities: ['Sincelejo', 'Corozal', 'Sampués'], shipping: { servientrega: 22000, interrapidisimo: 19000, days: '4-5 días' } },
  { id: 'TOLIMA', name: 'Tolima', cities: ['Ibagué', 'Espinal', 'Melgar'], shipping: { servientrega: 8500, interrapidisimo: 7000, days: '2 días' } },
  { id: 'VALLE_CAUCA', name: 'Valle del Cauca', cities: ['Cali', 'Palmira', 'Buenaventura', 'Tuluá', 'Buga'], shipping: { servientrega: 14000, interrapidisimo: 12000, days: '3-4 días' } },
  { id: 'VAUPES', name: 'Vaupés', cities: ['Mitú'], shipping: { servientrega: 35000, interrapidisimo: 30000, days: '6-7 días' } },
  { id: 'VICHADA', name: 'Vichada', cities: ['Puerto Carreño'], shipping: { servientrega: 30000, interrapidisimo: 26000, days: '5-6 días' } },
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