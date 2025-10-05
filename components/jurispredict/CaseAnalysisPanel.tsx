
import React from 'react';
import { Upload } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const CaseAnalysisPanel: React.FC = () => (
  <Card className="p-6 h-full">
    <h3 className="text-lg font-semibold theme-text-primary mb-4">Análisis de Caso</h3>
    
    <div className="border-2 border-dashed theme-border rounded-lg p-8 text-center">
      <Upload className="w-12 h-12 mx-auto theme-text-secondary mb-4" />
      <p className="theme-text-secondary mb-2">
        Arrastra documentos legales aquí
      </p>
      <p className="text-sm theme-text-muted">
        Formatos: PDF, DOC, TXT (máx. 10MB)
      </p>
      <Button className="mt-4 bg-purple-600 text-white hover:bg-purple-700">
        Seleccionar Archivos
      </Button>
    </div>

    <div className="mt-6 p-4 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-purple-800 dark:text-purple-200">Analizando caso...</span>
        <span className="text-sm font-semibold text-purple-600 dark:text-purple-300">78%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div className="bg-purple-600 h-2 rounded-full" style={{width: '78%'}}></div>
      </div>
    </div>
  </Card>
);

export default CaseAnalysisPanel;