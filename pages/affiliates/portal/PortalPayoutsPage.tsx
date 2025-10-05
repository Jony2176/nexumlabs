
import React, { useState, useEffect } from 'react';
import { getMyPayouts } from '../../../services/affiliateApi';
import { Payout, PayoutStatus } from '../../../types';
import Card from '../../../components/ui/Card';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import { formatCurrency, formatDate } from '../../../utils/formatters';
import Button from '../../../components/ui/Button';
import { Download, CheckCircle, Clock } from 'lucide-react';

const statusInfo: { [key in PayoutStatus]: { text: string, icon: React.ElementType, className: string } } = {
  pending: { text: 'Pendiente', icon: Clock, className: 'text-yellow-500' },
  processing: { text: 'Procesando', icon: Clock, className: 'text-blue-500' },
  completed: { text: 'Completado', icon: CheckCircle, className: 'text-green-500' },
};

const PayoutsTable: React.FC<{ payouts: Payout[] }> = ({ payouts }) => {
    if (payouts.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-gray-500 dark:text-gray-400">Aún no has recibido ningún pago.</p>
                 <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Tus pagos aparecerán aquí una vez procesados.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Período</th>
                        <th scope="col" className="px-6 py-3">Monto Total</th>
                        <th scope="col" className="px-6 py-3">Método</th>
                        <th scope="col" className="px-6 py-3">Estado</th>
                        <th scope="col" className="px-6 py-3">Fecha de Pago</th>
                        <th scope="col" className="px-6 py-3">Comprobante</th>
                    </tr>
                </thead>
                <tbody>
                    {payouts.map(payout => {
                        const { icon: Icon, text, className } = statusInfo[payout.estado];
                        return (
                            <tr key={payout.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{payout.periodo}</td>
                                <td className="px-6 py-4 font-semibold text-secondary-600 dark:text-secondary-400">{formatCurrency(payout.total_comisiones)}</td>
                                <td className="px-6 py-4 capitalize">{payout.metodo.replace('_', ' ')}</td>
                                <td className="px-6 py-4">
                                    <span className={`flex items-center font-medium ${className}`}>
                                        <Icon className="h-4 w-4 mr-2" />
                                        {text}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{formatDate(payout.fecha_pago)}</td>
                                <td className="px-6 py-4">
                                    {payout.comprobante_url && payout.comprobante_url !== '#' ? (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => window.open(payout.comprobante_url, '_blank')}
                                        >
                                            <Download className="h-4 w-4 mr-2" />
                                            Descargar
                                        </Button>
                                    ) : (
                                        <span className="text-gray-400 dark:text-gray-500">N/A</span>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

const PortalPayoutsPage: React.FC = () => {
    const [payouts, setPayouts] = useState<Payout[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadPayouts = async () => {
            setIsLoading(true);
            try {
                const data = await getMyPayouts();
                setPayouts(data);
            } catch (error) {
                console.error("Failed to fetch payouts:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadPayouts();
    }, []);

    return (
        <div className="space-y-8 animate-slideIn">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Mis Pagos</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Consulta tu historial de comisiones pagadas.</p>
            </div>
            <Card>
                 {isLoading ? (
                     <div className="flex justify-center items-center h-64">
                        <LoadingSpinner />
                    </div>
                ) : (
                    <PayoutsTable payouts={payouts} />
                )}
            </Card>
        </div>
    );
};

export default PortalPayoutsPage;
