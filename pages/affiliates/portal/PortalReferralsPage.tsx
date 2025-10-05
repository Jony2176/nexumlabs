
import React, { useState, useEffect } from 'react';
import { getMyReferrals } from '../../../services/affiliateApi';
import { Referral, ReferralStatus, ReferralType } from '../../../types';
import Card from '../../../components/ui/Card';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import { formatCurrency, formatDate } from '../../../utils/formatters';

const statusStyles: { [key in ReferralStatus]: string } = {
  pending: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  unpaid: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  paid: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  rejected: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
};

const typeStyles: { [key in ReferralType]: string } = {
    primer_mes: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    recurrente: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
};

const ReferralsTable: React.FC<{ referrals: Referral[] }> = ({ referrals }) => {
    if (referrals.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-gray-500 dark:text-gray-400">Aún no has generado ningún referido.</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">¡Comparte tu enlace para empezar a ganar comisiones!</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Cliente</th>
                        <th scope="col" className="px-6 py-3">Plan</th>
                        <th scope="col" className="px-6 py-3">Comisión</th>
                        <th scope="col" className="px-6 py-3">Tipo</th>
                        <th scope="col" className="px-6 py-3">Estado</th>
                        <th scope="col" className="px-6 py-3">Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {referrals.map(ref => (
                        <tr key={ref.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{ref.customer_email_short}</td>
                            <td className="px-6 py-4">{ref.plan_contratado}</td>
                            <td className="px-6 py-4 font-semibold text-secondary-600 dark:text-secondary-400">{formatCurrency(ref.comision_calculada)}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${typeStyles[ref.tipo]}`}>
                                    {ref.tipo.replace('_', ' ')}
                                </span>
                            </td>
                             <td className="px-6 py-4">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${statusStyles[ref.estado]}`}>
                                    {ref.estado}
                                </span>
                            </td>
                            <td className="px-6 py-4">{formatDate(ref.fecha_creacion)}</td>
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
            } finally {
                setIsLoading(false);
            }
        };
        loadReferrals();
    }, []);

    return (
        <div className="space-y-8 animate-slideIn">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Mis Referidos</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Aquí puedes ver un historial de todos los clientes que has referido.</p>
            </div>
            <Card>
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
