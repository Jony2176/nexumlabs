import React from 'react';
import { Affiliate } from '../../../../types';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';
import { X, Mail, Phone, Calendar, CheckCircle, TrendingUp, DollarSign } from 'lucide-react';
import { formatCurrency, formatDate } from '../../../../utils/formatters';
import { useDualPrice } from '../../../../hooks/useDualPrice';

interface AffiliateDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  affiliate: Affiliate;
}

const DetailItem: React.FC<{ icon: React.ElementType, label: string, value: string | number | undefined }> = ({ icon: Icon, label, value }) => (
    <div className="flex items-center text-sm">
        <Icon className="h-4 w-4 text-gray-400 mr-3" />
        <span className="text-gray-500 dark:text-gray-400 w-32">{label}:</span>
        <span className="font-medium text-gray-800 dark:text-gray-200">{value || 'N/A'}</span>
    </div>
);

interface DualCurrencyStat {
    label: string;
    usdValue: number;
    icon: React.ElementType;
    colorClass: string;
}

const StatItem: React.FC<DualCurrencyStat> = ({ label, usdValue, icon: Icon, colorClass }) => {
    const { priceInfo, isLoading } = useDualPrice(usdValue);
    return (
        <div className="flex items-start">
            <div className={`mr-4 flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center ${colorClass.replace('text-', 'bg-').replace('dark:text-','dark:bg-')}/10`}>
                <Icon className={`h-6 w-6 ${colorClass}`} />
            </div>
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
                {isLoading || !priceInfo ? (
                    <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mt-1"></div>
                ) : (
                    <>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{priceInfo.formattedUSD}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">≈ {priceInfo.formattedARS}</p>
                    </>
                )}
            </div>
        </div>
    )
}

const AffiliateDetailsModal: React.FC<AffiliateDetailsModalProps> = ({ isOpen, onClose, affiliate }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <Card
        className="w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div className="flex items-center">
            <img src={affiliate.avatarUrl} alt={affiliate.nombre} className="h-12 w-12 rounded-full mr-4" />
            <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{affiliate.nombre}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">ID: {affiliate.id}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}><X className="h-5 w-5"/></Button>
        </div>
        
        <div className="p-6 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Info */}
                <div>
                    <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-3 border-b pb-2">Información de Contacto</h3>
                    <div className="space-y-3">
                        <DetailItem icon={Mail} label="Email" value={affiliate.user_email} />
                        <DetailItem icon={Calendar} label="Miembro desde" value={formatDate(affiliate.fecha_alta)} />
                        <DetailItem icon={CheckCircle} label="Aprobado el" value={affiliate.fecha_aprobacion ? formatDate(affiliate.fecha_aprobacion) : 'N/A'} />
                    </div>
                </div>

                {/* Rates */}
                 <div>
                    <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-3 border-b pb-2">Tasas y Configuración</h3>
                    <div className="space-y-3">
                        <DetailItem icon={TrendingUp} label="Tasa 1er Mes" value={`${affiliate.tasa_primer_mes}%`} />
                        <DetailItem icon={TrendingUp} label="Tasa Recurrente" value={`${affiliate.tasa_recurrente}%`} />
                        <DetailItem icon={Calendar} label="Días de Cookie" value={`${affiliate.cookie_days} días`} />
                    </div>
                </div>
            </div>

            {/* Performance Stats */}
            <div className="mt-8">
                 <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-4 border-b pb-2">Estadísticas de Rendimiento</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StatItem label="Revenue (Lifetime)" usdValue={affiliate.revenue.lifetime} icon={DollarSign} colorClass="text-green-500" />
                    <StatItem label="Comisión Total" usdValue={affiliate.commission.total} icon={DollarSign} colorClass="text-blue-500" />
                    <StatItem label="Comisión Pendiente" usdValue={affiliate.commission.pending} icon={DollarSign} colorClass="text-yellow-500" />
                 </div>
            </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 flex justify-end rounded-b-lg">
          <Button variant="outline" onClick={onClose}>Cerrar</Button>
        </div>
      </Card>
    </div>
  );
};

export default AffiliateDetailsModal;
