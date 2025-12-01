
import React, { useState, useEffect } from 'react';
import { getMyPayouts } from '../../../services/affiliateApi';
import { Payout, PayoutStatus } from '../../../types';
import Card from '../../../components/ui/Card';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import { formatCurrency, formatDate } from '../../../utils/formatters';
import Button from '../../../components/ui/Button';
import { Download, CheckCircle, Clock, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';

const statusInfo: { [key in PayoutStatus]: { text: string, icon: React.ElementType, className: string } } = {
  pending: { text: 'Pendiente', icon: Clock, className: 'text-yellow-700 bg-yellow-100 dark:bg-yellow-900/50 dark:text-yellow-200' },
  processing: { text: 'Procesando', icon: Clock, className: 'text-blue-700 bg-blue-100 dark:bg-blue-900/50 dark:text-blue-200' },
  completed: { text: 'Completado', icon: CheckCircle, className: 'text-green-700 bg-green-100 dark:bg-green-900/50 dark:text-green-200' },
};

const PayoutsTable: React.FC<{ payouts: Payout[] }> = ({ payouts }) => {
    if (payouts.length === 0) {
        return (
            <div className="text-center py-16">
                <DollarSign className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-300 text-lg font-medium">Aún no has recibido ningún pago.</p>
                 <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Tus pagos aparecerán aquí una vez procesados.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-300">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900/50 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                    <tr>
                        <th scope="col" className="px-6 py-4 font-bold">Período</th>
                        <th scope="col" className="px-6 py-4 font-bold">Monto Total</th>
                        <th scope="col" className="px-6 py-4 font-bold">Método</th>
                        <th scope="col" className="px-6 py-4 font-bold">Estado</th>
                        <th scope="col" className="px-6 py-4 font-bold">Fecha de Pago</th>
                        <th scope="col" className="px-6 py-4 font-bold">Comprobante</th>
                    </tr>
                </thead>
                <tbody>
                    {payouts.map(payout => {
                        const { icon: Icon, text, className } = statusInfo[payout.estado];
                        return (
                            <tr key={payout.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{payout.periodo}</td>
                                <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{formatCurrency(payout.total_comisiones)}</td>
                                <td className="px-6 py-4 capitalize text-gray-600 dark:text-gray-300">{payout.metodo.replace('_', ' ')}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center font-medium px-2.5 py-0.5 rounded-full text-xs ${className}`}>
                                        <Icon className="h-3.5 w-3.5 mr-1.5" />
                                        {text}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{formatDate(payout.fecha_pago)}</td>
                                <td className="px-6 py-4">
                                    {payout.comprobante_url && payout.comprobante_url !== '#' ? (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => window.open(payout.comprobante_url, '_blank')}
                                            className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                        >
                                            <Download className="h-4 w-4 mr-2" />
                                            Descargar
                                        </Button>
                                    ) : (
                                        <span className="text-gray-400 dark:text-gray-500 italic">N/A</span>
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
                toast.error("No se pudieron cargar tus pagos.");
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
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
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
