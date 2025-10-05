import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Invoice } from '../../types';
import * as mockApi from '../../services/mockApi';
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
        const { data } = await mockApi.default.getInvoices();
        setInvoices(data);
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
          <div className="space-y-2 animate-pulse">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-color">
                <th className="text-left font-medium text-text-secondary pb-2">Fecha</th>
                <th className="text-right font-medium text-text-secondary pb-2">Monto</th>
                <th className="text-right font-medium text-text-secondary pb-2"></th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(invoice => (
                <tr key={invoice.id} className="border-b border-border-color last:border-b-0">
                  <td className="py-3 text-text-secondary">{formatDate(invoice.date)}</td>
                  <td className="py-3 text-right font-medium text-text-primary">${invoice.amount.toFixed(2)}</td>
                  <td className="py-3 text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDownloadInvoice(invoice)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Card>
  );
};

export default InvoiceHistory;
