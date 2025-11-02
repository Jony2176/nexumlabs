

import React from 'react';
import Card from '../components/ui/Card';

const ClientsPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Clientes</h1>
        <p className="theme-text-secondary mt-1">Gestiona los suscriptores de tu plataforma.</p>
      </div>
      <Card>
        <div className="p-6 text-center">
            <h2 className="text-xl font-semibold theme-text-primary">Próximamente</h2>
            <p className="theme-text-secondary mt-2">
                La gestión de clientes estará disponible en una futura actualización.
            </p>
        </div>
      </Card>
    </div>
  );
};

export default ClientsPage;