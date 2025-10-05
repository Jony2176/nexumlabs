

import React from 'react';
// FIX: Changed import from 'react-router' to 'react-router-dom' for web compatibility.
import { useNavigate } from 'react-router-dom';
import { Eye, CheckCircle, DollarSign, Target, Award, User, Handshake, Video, Zap, ArrowRight } from 'lucide-react';
import StatsCard from '../../../components/dashboard/StatsCard';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import AffiliateWallet from '../../../components/affiliates/portal/AffiliateWallet';
import { useDualPrice } from '../../../hooks/useDualPrice';
// FIX: Added import for 'toast' to resolve 'Cannot find name' error.
import toast from 'react-hot-toast';

const mockNotifications = [
    { type: 'new_affiliate', icon: User, iconColor: 'text-blue-500', text: 'Nuevo afiliado registrado: Juan Perez.', time: 'hace 5 minutos', unread: true },
    { type: 'payment_processed', icon: Handshake, iconColor: 'text-green-500', text: 'El pago para Marketing Pro ha sido procesado.', time: 'hace 1 hora', unread: true },
    { 
        type: 'resource', 
        title: 'Guía de Inicio Rápido para Afiliados', 
        description: 'Todo lo que necesitas saber para empezar a ganar comisiones con NEXUM en menos de 10 minutos.',
        buttonText: 'Acceder al Recurso',
        tag: 'Guía PDF',
        link: '/portal/resources/quick-start-guide',
    },
    { type: 'payment_processed', icon: Handshake, iconColor: 'text-green-500', text: 'El pago para Consultor Legal MX ha sido procesado.', time: 'ayer', unread: false },
];

const mockResources = [
  {
    type: 'Video Tutorial',
    title: 'Maximizando tus Enlaces de Afiliado',
    description: 'Aprende a usar el generador de URLs y las campañas para rastrear tu rendimiento de forma efectiva.',
    icon: Video,
    link: '/portal/resources/maximizing-links'
  },
  {
    type: 'Estrategia',
    title: 'Estrategias de Marketing de Contenidos',
    description: 'Ideas y ejemplos sobre cómo promocionar NEXUM en tu blog, newsletter o redes sociales.',
    icon: Zap,
    link: '/portal/resources/content-strategies'
  }
];

const ResourceCard: React.FC<(typeof mockResources)[0]> = ({ icon: Icon, type, title, description, link }) => {
    const navigate = useNavigate();
    return (
        <Card className="flex flex-col p-6 hover:shadow-lg hover:border-primary-500/30 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
                 <div className="p-3 bg-primary-100 dark:bg-primary-900/50 rounded-lg">
                    <Icon className="h-6 w-6 text-primary-500" />
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full dark:bg-blue-900/50 dark:text-blue-300">
                    {type}
                </span>
            </div>
            <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
            </div>
            <Button 
                variant="outline" 
                className="mt-6 w-full"
                onClick={() => navigate(link)}
            >
                Acceder al Recurso
                <ArrowRight className="h-4 w-4 ml-2"/>
            </Button>
        </Card>
    );
};

const PortalDashboardPage: React.FC = () => {
    const stats = {
        visits: 1254,
        conversions: '45 (3.6%)',
        pending_commissions_usd: 875.50,
        next_payout_usd: 1230.00,
        ranking: '#5 de 127'
    };
    
    const navigate = useNavigate();

    const { priceInfo: pendingCommissionsPrice, isLoading: isPendingLoading } = useDualPrice(stats.pending_commissions_usd);
    const { priceInfo: nextPayoutPrice, isLoading: isNextPayoutLoading } = useDualPrice(stats.next_payout_usd);

    const unreadCount = mockNotifications.filter(n => n.unread).length;

    const renderPriceValue = (priceInfo: any, isLoading: boolean) => {
        if (isLoading || !priceInfo) {
            return <div className="h-16 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>;
        }
        return (
            <>
                <span className="block text-3xl leading-tight">{priceInfo.formattedUSD}</span>
                <span className="block text-lg font-normal theme-text-secondary leading-tight">(~{priceInfo.formattedARS})</span>
            </>
        );
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
                <p className="text-text-secondary mt-1">Bienvenido a tu portal de afiliados.</p>
            </div>
            
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                <StatsCard title="Visitas (Este Mes)" value={stats.visits.toString()} icon={<Eye />} change={12}/>
                <StatsCard title="Conversiones" value={stats.conversions} icon={<CheckCircle />} change={5}/>
                <StatsCard title="Comisiones Pendientes" value={renderPriceValue(pendingCommissionsPrice, isPendingLoading)} icon={<DollarSign />} change={-50}/>
                <StatsCard title="Próximo Pago Estimado" value={renderPriceValue(nextPayoutPrice, isNextPayoutLoading)} icon={<Target />} change={200}/>
                <StatsCard title="Ranking Actual" value={stats.ranking} icon={<Award />} change={2}/>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
                 {/* Columna de Wallet y Recursos */}
                <div className="xl:col-span-3 space-y-8">
                     <AffiliateWallet 
                        usdBalance={stats.pending_commissions_usd}
                    />
                    <div>
                        <h2 className="text-2xl font-bold text-text-primary mb-4">Recursos para Afiliados</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {mockResources.map((resource, index) => (
                                <ResourceCard key={index} {...resource} />
                            ))}
                        </div>
                    </div>
                </div>
                {/* Columna de Notificaciones */}
                <div className="xl:col-span-2">
                    <Card className="h-full flex flex-col">
                        <div className="p-4 border-b border-border-color flex justify-between items-center">
                            <h3 className="font-semibold text-text-primary">Notificaciones</h3>
                            {unreadCount > 0 && (
                                 <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full dark:bg-blue-900/50 dark:text-blue-300">{unreadCount} nuevas</span>
                            )}
                        </div>
                        <div className="flex-grow overflow-y-auto">
                           {mockNotifications.map((item, index) => (
                                <div key={index} className="p-4 border-b border-border-color last:border-b-0">
                                    {item.type === 'resource' ? (
                                        <div>
                                            <span className="text-xs font-bold uppercase text-primary-500">{item.tag}</span>
                                            <h4 className="font-semibold text-text-primary mt-1">{item.title}</h4>
                                            <p className="text-sm text-text-secondary mt-1">{item.description}</p>
                                            <Button size="sm" className="mt-3 w-full" onClick={() => navigate(item.link)}>
                                                {item.buttonText}
                                                <ArrowRight className="h-4 w-4 ml-2" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1">
                                                <item.icon className={`h-5 w-5 ${item.iconColor}`} />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm text-text-primary">{item.text}</p>
                                                <p className="text-xs text-text-muted mt-1">{item.time}</p>
                                            </div>
                                            {item.unread && <div className="w-2 h-2 rounded-full bg-blue-500 self-center flex-shrink-0"></div>}
                                        </div>
                                    )}
                                </div>
                           ))}
                        </div>
                        <div className="p-2 border-t border-border-color text-center">
                            {/* FIX: Replaced toast.info with the base toast function, as 'info' is not a standard method in react-hot-toast. */}
                            <button
                                onClick={() => toast('La página de notificaciones estará disponible próximamente.')}
                                className="text-sm text-primary-blue hover:underline"
                            >
                                Ver todas
                            </button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default PortalDashboardPage;