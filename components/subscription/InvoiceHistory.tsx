
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Invoice } from '../../types';
import api from '../../services/api';
import { formatDate, formatCurrency } from '../../utils/formatters';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Download, CheckCircle } from 'lucide-react';

const InvoiceHistory: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      setIsLoading(true);
      try {
        const userInvoices = await api.getPayments();
        setInvoices(userInvoices);
      } catch (error) {
        toast.error('No se pudo cargar el historial de facturas.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  const handleDownloadInvoice = (invoice: Invoice) => {
    toast.loading('Generando factura...');
    
    const invoiceHtml = `
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="UTF-8">
          <title>Factura ${invoice.id}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; margin: 2rem; color: #333; }
            .container { max-width: 800px; margin: auto; padding: 2rem; border: 1px solid #eee; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
            .header { text-align: center; margin-bottom: 2rem; border-bottom: 1px solid #eee; padding-bottom: 1rem; }
            .details { margin-bottom: 2rem; }
            .details p { margin: 0.5rem 0; }
            .items { width: 100%; border-collapse: collapse; }
            .items th, .items td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            .items th { background-color: #f8f8f8; }
            .total { text-align: right; margin-top: 1.5rem; font-size: 1.2rem; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Factura</h1>
              <h2>NEXUM Labs</h2>
            </div>
            <div class="details">
              <p><strong>Factura ID:</strong> ${invoice.id}</p>
              <p><strong>Fecha de Emisión:</strong> ${formatDate(invoice.date)}</p>
              <p><strong>Período de Servicio:</strong> ${invoice.period}</p>
            </div>
            <table class="items">
              <thead>
                <tr>
                  <th>Descripción</th>
                  <th>Monto</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Suscripción NEXUM Platform - Plan ${invoice.period}</td>
                  <td>${formatCurrency(invoice.amount, 'USD')}</td>
                </tr>
              </tbody>
            </table>
            <div class="total">
              <p>Total a Pagar: ${formatCurrency(invoice.amount, 'USD')}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    try {
        const blob = new Blob([invoiceHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `factura-nexum-${invoice.id}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.dismiss();
        toast.success('Descarga iniciada.');
    } catch (error) {
        toast.dismiss();
        toast.error('No se pudo generar la descarga.');
    }
  };


  return (
    <Card>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Historial de Facturas</h2>

        {isLoading ? (
          <div className="space-y-3 animate-pulse">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          </div>
        ) : invoices.length === 0 ? (
          <p className="text-sm text-center text-text-secondary py-4">No hay facturas disponibles.</p>
        ) : (
          <ul className="space-y-3">
            {invoices.map(invoice => (
              <li key={invoice.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium text-text-primary">{invoice.period}</p>
                    <p className="text-xs text-text-muted">{formatDate(invoice.date)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-2 sm:mt-0 w-full sm:w-auto">
                  <p className="font-semibold text-text-primary flex-grow text-left sm:text-right">{formatCurrency(invoice.amount)}</p>
                  <Button
                    onClick={() => handleDownloadInvoice(invoice)}
                    variant="ghost"
                    size="sm"
                    className="flex-shrink-0"
                  >
                    <Download className="h-4 w-4 mr-2" /> Descargar
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
};

export default InvoiceHistory;
