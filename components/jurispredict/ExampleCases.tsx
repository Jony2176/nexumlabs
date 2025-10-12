import React from 'react';
import Card from '../ui/Card';
import { JURISPREDICT_MOCK_DATA } from '../../data/jurispredictMockData';

const ExampleCases: React.FC = () => {
  const cases = JURISPREDICT_MOCK_DATA.example_cases;

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold theme-text-primary mb-4">Casos de Ejemplo</h3>
      <ul className="space-y-3">
        {cases.map(c => (
          <li key={c.id} className="flex justify-between items-center p-3 theme-bg-secondary rounded-lg">
            <span className="text-sm theme-text-primary">{c.title}</span>
            <span className={`text-xs px-2 py-1 rounded-full ${
              c.status === 'Completado' 
                ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300'
                : 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300'
            }`}>
              {c.status}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default ExampleCases;
