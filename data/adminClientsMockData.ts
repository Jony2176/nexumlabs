import { ClientData } from '../types';

const randomDate = (start: Date, end: Date): string => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
};

const generateClients = (count: number): ClientData[] => {
  const clients: ClientData[] = [];
  const firstNames = ['Juan', 'Maria', 'Carlos', 'Ana', 'Luis', 'Laura', 'Roberto', 'Sofia', 'Miguel', 'Elena'];
  const lastNames = ['García', 'Martinez', 'Rodriguez', 'Fernandez', 'Lopez', 'Perez', 'Gonzalez', 'Sanchez', 'Romero', 'Torres'];
  const companies = [
    'Estudio Jurídico Norte', 'Legal & Co.', 'Abogados del Sur', 'Bufete Central', 'Consultores Legales',
    'Lex Veritas', 'Iuris Consultores', 'Poder Legal', 'Justicia & Ley', 'Defensa Total', 'Grupo Jurídico Integral',
    'Asesores Legales Argentinos', 'Estudio de la Cruz', 'Soluciones Legales BA', 'Lexnet Abogados', 'Estudio Integral Patagonico',
    'Derecho y Empresa', 'Consultorio Jurídico Cuyo', 'Legaltech Solutions', 'Firma Legal Innovadora'
  ];

  for (let i = 1; i <= count; i++) {
    const planIndex = Math.random();
    let plan: ClientData['plan'];
    if (planIndex < 0.4) plan = 'Lite';
    else if (planIndex < 0.8) plan = 'Pro';
    else plan = 'Professional';
    
    let mrr;
    switch(plan) {
        case 'Lite': mrr = 79; break;
        case 'Pro': mrr = 199; break;
        case 'Professional': mrr = 320; break;
        default: mrr = 199;
    }
    
    let estado: ClientData['estado'];
    if (i <= 5) { // First 5 are trial as requested
        estado = 'trial';
    } else if (Math.random() < 0.85) {
        estado = 'active';
    } else if (Math.random() < 0.95) {
        estado = 'cancelled';
    } else {
        estado = 'suspended';
    }

    clients.push({
      id: `cli_${i}`,
      empresa: `${companies[i % companies.length]}`,
      contacto: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
      logoUrl: `https://avatar.vercel.sh/${companies[i % companies.length].replace(/\s+/g, '')}.png?size=40`,
      plan,
      mrr,
      estado,
      consumoWhatsApp: { value: Math.floor(Math.random() * 1000), limit: 1000 },
      consumoLlamadas: { value: Math.floor(Math.random() * (plan === 'Lite' ? 100 : plan === 'Pro' ? 300 : 1000)), limit: (plan === 'Lite' ? 100 : plan === 'Pro' ? 300 : 1000) },
      healthScore: Math.random() > 0.3 ? Math.floor(Math.random() * 30) + 71 : Math.floor(Math.random() * 30) + 40,
      fechaInicio: randomDate(new Date(2023, 0, 1), new Date()),
      ultimoPago: {
        fecha: randomDate(new Date(2024, 7, 1), new Date(2024, 8, 5)), // Simulating last month
        estado: Math.random() > 0.95 ? 'failed' : 'paid'
      },
      cuit: `30-${Math.floor(Math.random() * 90000000) + 10000000}-9`,
      direccion: 'Av. Corrientes 123, CABA'
    });
  }
  return clients;
};

export const mockClients: ClientData[] = generateClients(25);