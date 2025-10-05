
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '../../utils/cn';

const categories = ['Todos', 'CRM Legal', 'Facturación', 'Comunicación', 'Storage'];

const IntegrationFilters: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              'px-4 py-2 text-sm font-medium rounded-full transition-colors',
              activeCategory === category
                ? 'bg-primary-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 theme-text-secondary hover:bg-gray-300 dark:hover:bg-gray-600'
            )}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="relative w-full md:w-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 theme-text-muted" />
        <input
          type="text"
          placeholder="Buscar integración..."
          className="w-full md:w-64 pl-10 pr-4 py-2 rounded-full"
        />
      </div>
    </div>
  );
};

export default IntegrationFilters;