import { Addon, PaymentMethod, Invoice } from '../types';
import { BrainCircuit, User } from 'lucide-react';

export const MOCK_ADDONS: Addon[] = [
  {
    id: 'jurispredict_ai',
    name: 'JurisPredict AI',
    description: 'Predicción legal con 87% de precisión.',
    price: 297,
    icon: BrainCircuit,
  },
  {
    id: 'elias_avatar_partner',
    name: 'Avatar Partner',
    description: 'Consultor virtual IA avanzado 24/7.',
    price: 497,
    icon: User,
  },
];

export const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'pm_1',
    type: 'card',
    brand: 'Visa',
    last4: '4242',
    expiryMonth: 12,
    expiryYear: 2027,
    isDefault: true,
  },
  {
    id: 'pm_2',
    type: 'card',
    brand: 'Mastercard',
    last4: '1234',
    expiryMonth: 8,
    expiryYear: 2025,
    isDefault: false,
  },
];

export const MOCK_INVOICES: Invoice[] = [
  { id: 'inv_1', date: '2025-09-01T10:00:00Z', period: 'Septiembre 2025', amount: 319, status: 'paid', pdfUrl: '#' },
  { id: 'inv_2', date: '2025-08-01T10:00:00Z', period: 'Agosto 2025', amount: 319, status: 'paid', pdfUrl: '#' },
  { id: 'inv_3', date: '2025-07-01T10:00:00Z', period: 'Julio 2025', amount: 297, status: 'paid', pdfUrl: '#' },
  { id: 'inv_4', date: '2025-06-01T10:00:00Z', period: 'Junio 2025', amount: 297, status: 'paid', pdfUrl: '#' },
];