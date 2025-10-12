import React from 'react';
import { Bot, MessageSquare, Star, User, Zap, Clock } from 'lucide-react';
import MetricCard from '../../components/jurispredict/MetricCard';
import AvatarChatInterface from '../../components/avatar/AvatarChatInterface';
import AvatarPersonalityConfig from '../../components/avatar/AvatarPersonalityConfig';
import AvatarKnowledgeBase from '../../components/avatar/AvatarKnowledgeBase';
import ConversationHistory from '../../components/avatar/ConversationHistory';
import AvatarAnalytics from '../../components/avatar/AvatarAnalytics';
import { AVATAR_MOCK_DATA } from '../../data/avatarMockData';

const AvatarPartnerManagementPage: React.FC = () => {
  return (
      <div className="min-h-full theme-bg-secondary p-6 space-y-8">
        
        <div className="text-center space-y-6">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
            <Bot className="w-4 h-4 mr-2" />
            <span className="text-sm font-semibold">BETA DISPONIBLE - JUNIO 2026</span>
          </div>
          
          <div className="flex justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-b from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg">
              <User className="w-16 h-16 text-white" />
            </div>
          </div>
          
          <div>
            <h1 className="text-4xl font-bold theme-text-primary">
              ELIAS Avatar Partner
            </h1>
            <p className="text-xl theme-text-secondary">
              Tu Consultor Legal Virtual 24/7
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            icon={MessageSquare}
            title="Consultas Mes"
            value={AVATAR_MOCK_DATA.metrics.consultas_mes.toString()}
            change={`+${AVATAR_MOCK_DATA.metrics.consultas_change} vs mes anterior`}
            color="emerald"
          />
          <MetricCard 
            icon={Star}
            title="Satisfacción"
            value={`${AVATAR_MOCK_DATA.metrics.satisfaccion}/5`}
            change={`${AVATAR_MOCK_DATA.metrics.casos_resueltos_pct}% casos resueltos`}
            color="yellow"
          />
          <MetricCard 
            icon={Zap}
            title="Tiempo Respuesta"
            value={`< ${AVATAR_MOCK_DATA.metrics.tiempo_respuesta_seg} seg`}
            change="vs 2-4 hrs humano"
            color="blue"
          />
          <MetricCard 
            icon={Clock}
            title="Ahorro Semanal"
            value={`${AVATAR_MOCK_DATA.metrics.tiempo_ahorro_sem} hrs`}
            change={`Equivale a $${AVATAR_MOCK_DATA.metrics.roi_estimado.toLocaleString('es-AR')}/mes`}
            color="green"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2">
            <AvatarChatInterface />
          </div>
          
          <div className="space-y-6">
            <AvatarPersonalityConfig />
            <AvatarKnowledgeBase />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ConversationHistory />
          <AvatarAnalytics />
        </div>
      </div>
  );
};

export default AvatarPartnerManagementPage;
