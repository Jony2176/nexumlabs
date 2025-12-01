
import React, { useState, useEffect } from 'react';
import { getMyReferrals } from '../../../services/affiliateApi';
import { Referral, ReferralStatus, ReferralType } from '../../../types';
import Card from '../../../components/ui/Card';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import { formatCurrency, formatDate } from '../../../utils/formatters';
import toast from 'react-hot-toast';
import { Users } from 'lucide-react';

const statusStyles: { [key in ReferralStatus]: string } = {
  pending: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
  unpaid: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200',
  paid: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200',
  rejected: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200',
};

const typeStyles: { [key in ReferralType]: string } = {
    primer_mes: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200',
    recurrente: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200',
};

const ReferralsTable: React.FC<{ referrals: Referral[] }> = ({ referrals }) => {
    if (referrals.length === 0) {
        return (
            <div className="text-center py-16">
                <Users className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
                    Aún no has generado ningún referido.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    ¡Comparte tu enlace para empezar a ganar comisiones!
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <tr>
                        <th scope="col" className="px-6 py-4 font-bold text-gray-700 dark:text-gray-300">Cliente</th>
                        <th scope="col" className="px-6 py-4 font-bold text-gray-700 dark:text-gray-300">Plan</th>
                        <th scope="col" className="px-6 py-4 font-bold text-gray-700 dark:text-gray-300">Comisión</th>
                        <th scope="col" className="px-6 py-4 font-bold text-gray-700 dark:text-gray-300">Tipo</th>
                        <th scope="col" className="px-6 py-4 font-bold text-gray-700 dark:text-gray-300">Estado</th>
                        <th scope="col" className="px-6 py-4 font-bold text-gray-700 dark:text-gray-300">Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {referrals.map(ref => (
                        <tr key={ref.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{ref.customer_email_short}</td>
                            <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{ref.plan_contratado}</td>
                            <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{formatCurrency(ref.comision_calculada)}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full capitalize ${typeStyles[ref.tipo]}`}>
                                    {ref.tipo.replace('_', ' ')}
                                </span>
                            </td>
                             <td className="px-6 py-4">
                                <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full capitalize ${statusStyles[ref.estado]}`}>
                                    {ref.estado}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{formatDate(ref.fecha_creacion)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


const PortalReferralsPage: React.FC = () => {
    const [referrals, setReferrals] = useState<Referral[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadReferrals = async () => {
            setIsLoading(true);
            try {
                const data = await getMyReferrals();
                setReferrals(data);
            } catch (error) {
                console.error("Failed to fetch referrals:", error);
                toast.error("No se pudieron cargar tus referidos.");
            } finally {
                setIsLoading(false);
            }
        };
        loadReferrals();
    }, []);

    return (
        <div className="space-y-8 animate-slideIn">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    Mis Referidos
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Aquí puedes ver un historial de todos los clientes que has referido.
                </p>
            </div>
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                {isLoading ? (
                     <div className="flex justify-center items-center h-64">
                        <LoadingSpinner />
                    </div>
                ) : (
                    <ReferralsTable referrals={referrals} />
                )}
            </Card>
        </div>
    );
};

export default PortalReferralsPage;
