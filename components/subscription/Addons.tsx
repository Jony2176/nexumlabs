import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Addon } from '../../types';
import * as mockApi from '../../services/mockApi';
import Card from '../ui/Card';
import AddonCard from './AddonCard';

const Addons: React.FC = () => {
  const [addons, setAddons] = useState<Addon[]>([]);
  const [activeAddons, setActiveAddons] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAddons = async () => {
      setIsLoading(true);
      try {
        const { data } = await mockApi.default.getAddons();
        setAddons(data);
      } catch (error) {
        toast.error('No se pudo cargar la lista de add-ons.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAddons();
  }, []);

  const handleToggleAddon = (addonId: string) => {
    setActiveAddons(prev =>
      prev.includes(addonId)
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
    toast.success(`Add-on ${activeAddons.includes(addonId) ? 'desactivado' : 'activado'}. El cambio se reflejará en tu próxima factura.`);
  };

  return (
    <Card>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-text-primary">Potencia tu Plan con Add-ons</h2>
        <p className="text-text-secondary mt-1 mb-6">Añade herramientas específicas a tu suscripción según tus necesidades.</p>
        
        {isLoading ? (
            <div className="space-y-4 animate-pulse">
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            </div>
        ) : (
            <div className="space-y-4">
                {addons.map(addon => (
                    <AddonCard
                        key={addon.id}
                        addon={addon}
                        isActive={activeAddons.includes(addon.id)}
                        onToggle={() => handleToggleAddon(addon.id)}
                    />
                ))}
            </div>
        )}
      </div>
    </Card>
  );
};

export default Addons;
