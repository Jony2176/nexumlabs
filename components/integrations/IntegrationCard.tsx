
import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface Integration {
  name: string;
  category: string;
  status: 'available' | 'connected' | 'coming_soon';
  logo: string;
}

interface IntegrationCardProps {
  integration: Integration;
}

const statusConfig = {
  available: { text: "Conectar", buttonVariant: "default" as const },
  connected: { text: "Conectado", buttonVariant: "secondary" as const },
  coming_soon: { text: "Próximamente", buttonVariant: "outline" as const },
};

const IntegrationCard: React.FC<IntegrationCardProps> = ({ integration }) => {
  const { text, buttonVariant } = statusConfig[integration.status];

  return (
    <Card className="p-6 flex flex-col">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="text-3xl">{integration.logo}</div>
          <div>
            <h3 className="font-semibold theme-text-primary">{integration.name}</h3>
            <p className="text-sm theme-text-secondary">{integration.category}</p>
          </div>
        </div>
        {integration.status === 'connected' && (
          <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 rounded-full">Activo</span>
        )}
      </div>
      <div className="flex-grow mt-4">
        {/* Placeholder for description */}
      </div>
      <Button className="w-full mt-4" variant={buttonVariant} disabled={integration.status !== 'available'}>
        {text}
      </Button>
    </Card>
  );
};

export default IntegrationCard;