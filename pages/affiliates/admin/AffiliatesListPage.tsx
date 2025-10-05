
import React from 'react';
import AffiliatesTable from '../../../components/affiliates/admin/AffiliatesTable';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { PlusCircle } from 'lucide-react';

const AffiliatesListPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Lista de Afiliados</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Busca, filtra y gestiona a todos los afiliados.</p>
        </div>
        <Button>
          <PlusCircle className="h-5 w-5 mr-2" />
          Añadir Nuevo Afiliado
        </Button>
      </div>
      <Card>
        <AffiliatesTable />
      </Card>
    </div>
  );
};

export default AffiliatesListPage;
