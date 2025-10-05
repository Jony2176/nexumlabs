
import React from 'react';
import Card from '../../components/ui/Card';

const AffiliatesAdminPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold theme-text-primary">Gestión de Afiliados</h1>
        <p className="theme-text-secondary mt-1">Administra el programa de afiliados de NEXUM.</p>
      </div>
      <Card>
        <div className="p-6 text-center">
            <h2 className="text-xl font-semibold theme-text-primary">Próximamente</h2>
            <p className="theme-text-secondary mt-2">
                Una tabla avanzada para gestionar afiliados y pagos estará disponible aquí.
            </p>
        </div>
      </Card>
    </div>
  );
};

export default AffiliatesAdminPage;
