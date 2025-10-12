import React from 'react';
import Card from '../ui/Card';

const AIModelConfig: React.FC = () => (
  <Card className="p-6">
    <h3 className="text-lg font-semibold theme-text-primary mb-4">Configuración del Modelo</h3>
    <div className="space-y-4 text-sm">
      <div className="flex justify-between">
        <span className="theme-text-secondary">Modelo:</span>
        <span className="font-medium theme-text-primary">JP-v2.1-ARG</span>
      </div>
      <div className="flex justify-between">
        <span className="theme-text-secondary">Jurisdicción:</span>
        <span className="font-medium theme-text-primary">CABA</span>
      </div>
      <div className="flex justify-between">
        <span className="theme-text-secondary">Fuero:</span>
        <span className="font-medium theme-text-primary">Laboral</span>
      </div>
    </div>
  </Card>
);

export default AIModelConfig;
