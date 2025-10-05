import React from 'react';
import Card from '../components/ui/Card';
import { Zap } from 'lucide-react';

const ComingSoonPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full animate-scaleIn">
      <Card className="max-w-md text-center p-8">
        <Zap className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
        <h1 className="text-2xl font-bold theme-text-primary">Página en Construcción</h1>
        <p className="theme-text-secondary mt-2">
          Esta sección estará disponible próximamente. Estamos trabajando para traerte nuevas funcionalidades.
        </p>
      </Card>
    </div>
  );
};

export default ComingSoonPage;
