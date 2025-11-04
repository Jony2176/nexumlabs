
import React from 'react';
// FIX: Changed to a named import as AffiliatesTable is not a default export.
import { AffiliatesTable } from '../../../components/affiliates/admin/AffiliatesTable';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { PlusCircle } from 'lucide-react';
// FIX: Imported store to provide necessary props to the AffiliatesTable component.
import { useAffiliateStore } from '../../../store/authStore';

const AffiliatesListPage: React.FC = () => {
  // FIX: Fetched affiliates from the store to pass to the table.
  const { affiliates } = useAffiliateStore();

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
        {/* FIX: Passed required props 'affiliates' and 'setAffiliates' to the component. */}
        <AffiliatesTable affiliates={affiliates} setAffiliates={(updatedAffiliates) => useAffiliateStore.setState({ affiliates: updatedAffiliates })} />
      </Card>
    </div>
  );
};

export default AffiliatesListPage;
