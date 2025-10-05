import React from 'react';
import { Addon } from '../../types';
import { useDualPrice } from '../../hooks/useDualPrice';
import Button from '../ui/Button';

interface AddonCardProps {
  addon: Addon;
  isActive: boolean;
  onToggle: () => void;
}

const AddonCard: React.FC<AddonCardProps> = ({ addon, isActive, onToggle }) => {
  const { priceInfo, isLoading } = useDualPrice(addon.price);
  const Icon = addon.icon;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-border-color">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary-100 dark:bg-primary-900/50 rounded-lg">
          <Icon className="h-6 w-6 text-primary-500 dark:text-primary-400" />
        </div>
        <div>
          <h3 className="font-semibold text-text-primary">{addon.name}</h3>
          <p className="text-sm text-text-secondary">{addon.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-4 sm:mt-0">
        <div className="text-right">
          {isLoading || !priceInfo ? (
            <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
          ) : (
            <>
              <p className="font-semibold text-text-primary">{priceInfo.formattedUSD}/mes</p>
              <p className="text-xs text-text-muted">≈ {priceInfo.formattedARS}</p>
            </>
          )}
        </div>
        <Button
          onClick={onToggle}
          variant={isActive ? 'destructive' : 'secondary'}
          size="sm"
          className="w-28"
        >
          {isActive ? 'Quitar' : 'Agregar'}
        </Button>
      </div>
    </div>
  );
};

export default AddonCard;
