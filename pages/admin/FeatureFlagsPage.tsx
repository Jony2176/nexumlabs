
import React, { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { ModuleConfig, ModuleId } from '../../config/featureFlags';
import FeatureBadge from '../../components/features/FeatureBadge';
import toast from 'react-hot-toast';
import { useFeatureFlagStore } from '../../store/featureFlagStore';
import ConfirmationModal from '../../components/ui/ConfirmationModal';

const FeatureFlagsPage: React.FC = () => {
    const { flags: storedFlags, setFlags, resetFlags } = useFeatureFlagStore();
    const [localFlags, setLocalFlags] = useState(storedFlags);
    const [isResetModalOpen, setIsResetModalOpen] = useState(false);

    useEffect(() => {
      setLocalFlags(storedFlags);
    }, [storedFlags]);

    const handleFlagChange = (id: ModuleId, key: keyof ModuleConfig, value: any) => {
        setLocalFlags(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                [key]: value
            }
        }));
    };

    const handleSave = () => {
        setFlags(localFlags);
        toast.promise(
            new Promise(resolve => setTimeout(resolve, 500)),
            {
                loading: 'Guardando configuración de flags...',
                success: '¡Configuración guardada con éxito!',
                error: 'No se pudo guardar la configuración.',
            }
        );
    };

    const handleReset = () => {
      resetFlags();
      toast.success('La configuración ha sido restaurada a los valores por defecto.');
      setIsResetModalOpen(false);
    }

    return (
        <>
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-text-primary">Panel de Control de Feature Flags</h1>
                        <p className="theme-text-secondary mt-1">Gestiona la visibilidad y el lanzamiento de módulos en tiempo real.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" onClick={() => setIsResetModalOpen(true)}>Restaurar por Defecto</Button>
                        <Button onClick={handleSave}>Guardar Cambios</Button>
                    </div>
                </div>

                <Card>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left theme-text-secondary">
                            <thead className="text-xs theme-text-secondary uppercase theme-bg-secondary">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Módulo</th>
                                    <th scope="col" className="px-6 py-3">Estado Base</th>
                                    <th scope="col" className="px-6 py-3">Fecha de Lanzamiento</th>
                                    <th scope="col" className="px-6 py-3">Fecha de Revelación</th>
                                    <th scope="col" className="px-6 py-3">Badge</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.values(localFlags).map((flag: ModuleConfig) => (
                                    <tr key={flag.id} className="theme-bg-card border-b theme-border">
                                        <td className="px-6 py-4 font-medium theme-text-primary">{flag.name}</td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={flag.status}
                                                onChange={(e) => handleFlagChange(flag.id, 'status', e.target.value)}
                                                className="bg-gray-700 border-gray-600 text-white rounded p-1 capitalize"
                                            >
                                                <option value="available">Available</option>
                                                <option value="waitlist">Waitlist</option>
                                                <option value="hidden">Hidden</option>
                                                <option value="secret">Secret</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4">
                                            <input
                                                type="date"
                                                value={flag.launchDate.split('T')[0]}
                                                onChange={(e) => handleFlagChange(flag.id, 'launchDate', `${e.target.value}T00:00:00Z`)}
                                                className="bg-gray-700 border-gray-600 text-white rounded p-1"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                             <input
                                                type="date"
                                                value={flag.revealDate ? flag.revealDate.split('T')[0] : ''}
                                                onChange={(e) => handleFlagChange(flag.id, 'revealDate', `${e.target.value}T00:00:00Z`)}
                                                className="bg-gray-700 border-gray-600 text-white rounded p-1"
                                                disabled={!flag.revealDate}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            {flag.badge && (
                                                <FeatureBadge status={flag.badge.type} text={flag.badge.text} animation={flag.badge.animation} />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
            <ConfirmationModal
                isOpen={isResetModalOpen}
                onClose={() => setIsResetModalOpen(false)}
                onConfirm={handleReset}
                title="Restaurar Configuración"
                confirmText="Sí, restaurar"
            >
                <p>¿Estás seguro de que quieres restaurar todos los feature flags a su estado original? Se perderán todos los cambios no guardados.</p>
            </ConfirmationModal>
        </>
    );
};

export default FeatureFlagsPage;