
import { ClientData } from '../types';

export const mockClients: ClientData[] = [
  {
    id: 'org_2025_007',
    empresa: 'Abogados & Partners',
    contacto: 'Socio Principal',
    logoUrl: 'https://ui-avatars.com/api/?name=Abogados+Partners&background=random',
    plan: 'Enterprise',
    mrr: 499,
    estado: 'active',
    consumoWhatsApp: { value: 45600, limit: 50000 }, // Enterprise limit
    consumoLlamadas: { value: 2340, limit: 5000 }, // Enterprise limit
    healthScore: 98,
    fechaInicio: '2025-01-15T10:00:00Z',
    ultimoPago: {
      fecha: '2025-11-15T10:00:00Z',
      estado: 'paid'
    },
    cuit: '30-77777777-9',
    direccion: 'Puerto Madero, CABA'
  },
  {
    id: 'org_2025_004',
    empresa: 'Consultores Legales SA',
    contacto: 'Fernando Silva',
    logoUrl: 'https://ui-avatars.com/api/?name=Consultores+Legales&background=random',
    plan: 'Business',
    mrr: 419,
    estado: 'active',
    consumoWhatsApp: { value: 18900, limit: 20000 }, // Business limit
    consumoLlamadas: { value: 890, limit: 2500 },
    healthScore: 85,
    fechaInicio: '2025-03-10T10:00:00Z',
    ultimoPago: {
      fecha: '2025-11-28T10:00:00Z', // Próximo pago
      estado: 'pending'
    },
    cuit: '30-66666666-5',
    direccion: 'Microcentro, CABA'
  },
  {
    id: 'org_demo_2025',
    empresa: 'Estudio Jurídico Demo',
    contacto: 'Admin Demo',
    logoUrl: 'https://ui-avatars.com/api/?name=Estudio+Demo&background=random',
    plan: 'Professional',
    mrr: 319,
    estado: 'active',
    consumoWhatsApp: { value: 2450, limit: 5000 }, // Professional limit
    consumoLlamadas: { value: 340, limit: 1000 },
    healthScore: 92,
    fechaInicio: '2025-01-01T10:00:00Z',
    ultimoPago: {
      fecha: '2025-11-01T10:00:00Z',
      estado: 'paid'
    },
    cuit: '30-11111111-1',
    direccion: 'Av. Libertador 1000, CABA'
  },
  {
    id: 'org_2025_005',
    empresa: 'Estudio Fernández',
    contacto: 'Gabriela Fernández',
    logoUrl: 'https://ui-avatars.com/api/?name=Estudio+Fernandez&background=random',
    plan: 'Pro',
    mrr: 219,
    estado: 'active',
    consumoWhatsApp: { value: 7234, limit: 10000 },
    consumoLlamadas: { value: 412, limit: 300 },
    healthScore: 78,
    fechaInicio: '2025-06-15T10:00:00Z',
    ultimoPago: {
      fecha: '2025-11-10T10:00:00Z',
      estado: 'paid'
    },
    cuit: '27-55555555-4',
    direccion: 'La Plata, PBA'
  },
  {
    id: 'org_2025_002',
    empresa: 'Bufete Legal González',
    contacto: 'Juan González',
    logoUrl: 'https://ui-avatars.com/api/?name=Bufete+Gonzalez&background=random',
    plan: 'Pro',
    mrr: 219,
    estado: 'active',
    consumoWhatsApp: { value: 5620, limit: 10000 },
    consumoLlamadas: { value: 278, limit: 300 },
    healthScore: 88,
    fechaInicio: '2025-04-20T10:00:00Z',
    ultimoPago: {
      fecha: '2025-11-20T10:00:00Z', // Próximo pago
      estado: 'pending'
    },
    cuit: '20-33333333-3',
    direccion: 'Córdoba Capital'
  },
  {
    id: 'org_2025_001',
    empresa: 'Estudio Martínez & Asociados',
    contacto: 'Carlos Martínez',
    logoUrl: 'https://ui-avatars.com/api/?name=Estudio+Martinez&background=random',
    plan: 'Start',
    mrr: 139,
    estado: 'active',
    consumoWhatsApp: { value: 890, limit: 5000 },
    consumoLlamadas: { value: 45, limit: 0 },
    healthScore: 95,
    fechaInicio: '2025-02-15T10:00:00Z',
    ultimoPago: {
      fecha: '2025-11-05T10:00:00Z',
      estado: 'paid'
    },
    cuit: '20-22222222-2',
    direccion: 'Rosario, Santa Fe'
  },
  {
    id: 'org_2025_006',
    empresa: 'Asesoría Legal Ramírez',
    contacto: 'Miguel Ramírez',
    logoUrl: 'https://ui-avatars.com/api/?name=Asesoria+Ramirez&background=random',
    plan: 'Start',
    mrr: 139,
    estado: 'trial',
    consumoWhatsApp: { value: 320, limit: 1000 },
    consumoLlamadas: { value: 15, limit: 50 },
    healthScore: 65,
    fechaInicio: '2025-11-15T10:00:00Z',
    ultimoPago: {
      fecha: '2025-11-30T10:00:00Z', // Fin de trial
      estado: 'pending'
    },
    cuit: '20-66666666-6',
    direccion: 'Mendoza Capital'
  },
  {
    id: 'org_2025_003',
    empresa: 'Abogados López SRL',
    contacto: 'Roberto López',
    logoUrl: 'https://ui-avatars.com/api/?name=Abogados+Lopez&background=random',
    plan: 'Lite',
    mrr: 79,
    estado: 'trial',
    consumoWhatsApp: { value: 150, limit: 500 },
    consumoLlamadas: { value: 0, limit: 0 },
    healthScore: 60,
    fechaInicio: '2025-11-10T10:00:00Z',
    ultimoPago: {
      fecha: '2025-11-25T10:00:00Z', // Fin de trial
      estado: 'pending'
    },
    cuit: '30-44444444-4',
    direccion: 'Mar del Plata, PBA'
  }
];
