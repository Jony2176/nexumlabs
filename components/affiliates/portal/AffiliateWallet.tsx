import React from 'react';
import { useDualPrice } from '../../../hooks/useDualPrice';
import Button from '../../ui/Button';
import { Wallet, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AffiliateWalletProps {
  usdBalance: number;
}

const AffiliateWallet: React.FC<AffiliateWalletProps> = ({ usdBalance }) => {
  const { priceInfo, isLoading } = useDualPrice(usdBalance);

  return (
    <div className="theme-bg-card border theme-border rounded-lg p-6 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold theme-text-primary">Mi Billetera</h2>
          <p className="text-sm theme-text-secondary">Balance de comisiones</p>
        </div>
        <div className="p-3 bg-primary-100 dark:bg-primary-900/50 rounded-lg">
            <Wallet className="h-6 w-6 text-primary-500" />
        </div>
      </div>
      
      {isLoading || !priceInfo ? (
         <div className="animate-pulse">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      ) : (
        <div>
            <p className="text-4xl font-bold theme-text-primary">{priceInfo.formattedARS}</p>
            <p className="text-lg theme-text-secondary">{priceInfo.formattedUSD}</p>
        </div>
      )}
      
      <Button asChild className="w-full mt-6">
        <Link to="/portal/wallet">
            Gestionar Billetera
            <ArrowRight className="h-4 w-4 ml-2" />
        </Link>
      </Button>
    </div>
  );
};

export default AffiliateWallet;