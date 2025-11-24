import React from 'react';
import Badge from '../ui/badge';
import { Copy } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../ui/Button';

interface AffiliateDashboardHeaderProps {
  name: string;
  code: string;
  tier: string;
}

const AffiliateDashboardHeader: React.FC<AffiliateDashboardHeaderProps> = ({ name, code, tier }) => {

  const handleCopyLink = () => {
    const link = `https://nexumlabs.ai/?ref=${code}`;
    navigator.clipboard.writeText(link);
    toast.success('Enlace de referido copiado!');
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-text-primary">Bienvenido, {name}</h1>
      <div className="flex flex-wrap items-center gap-4 mt-2">
        <p className="text-text-secondary">
          Tu código de afiliado: 
          <span className="ml-2 font-mono font-semibold text-primary">{code}</span>
        </p>
        <Badge variant="secondary">Tier: {tier}</Badge>
        <Button onClick={handleCopyLink} size="sm" variant="outline">
            <Copy className="h-4 w-4 mr-2"/>
            Copiar Link de Referido
        </Button>
      </div>
    </div>
  );
};

export default AffiliateDashboardHeader;
