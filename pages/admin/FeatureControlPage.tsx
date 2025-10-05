

import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { FEATURE_FLAGS, ModuleConfig, ModuleId } from '../../config/featureFlags';
import { formatLaunchDate } from '../../utils/featureFlags';
import FeatureBadge from '../../components/features/FeatureBadge';

const FeatureControlPage: React.FC = () => {
    // In a real app, this state would be fetched from a backend and updated.
    const [flags, setFlags] = useState<typeof FEATURE_FLAGS>(FEATURE_FLAGS);
    const [forcedDate, setForcedDate] = useState('');

    const handleFlagChange = (id: ModuleId, key: keyof ModuleConfig, value: any) => {
        // This would trigger an API call to the backend.
        console.log(`Updating ${id}: set ${key} to ${value}`);
        setFlags(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                [key]: value
            }
        }));
    };

    const handleForceDate = () => {
        // This would typically set a cookie or header for the backend to interpret,
        // and update a global state for the frontend.
        alert(`Forzando la fecha a: ${forcedDate}. \nEn una app real, esto recargaría el estado de los flags.`);
        // To test, you would manually set VITE_FORCE_DATE and rebuild.
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold theme-text-primary">Panel de Control de Feature Flags</h1>
                <p className="theme-text-secondary mt-1">Gestiona la visibilidad y el lanzamiento de módulos.</p>
            </div>
            
            <Card>
                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4 theme-text-primary">Simulación de Fecha</h2>
                     <div className="flex gap-4 items-end">
                        <div className="flex-grow">
                            <label htmlFor="force-date" className="block text-sm font-medium mb-1">Forzar Fecha (YYYY-MM-DD)</label>
                            <input
                                id="force-date"
                                type="date"
                                value={forcedDate}
                                onChange={(e) => setForcedDate(e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <Button onClick={handleForceDate}>Aplicar</Button>
                    </div>
                    <p className="text-xs theme-text-muted mt-2">Nota: Esta es una simulación. Para un testing real, modifica la variable de entorno `VITE_FORCE_DATE`.</p>
                </div>
            </Card>

            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left theme-text-secondary">
                        <thead className="text-xs theme-text-secondary uppercase theme-bg-secondary">
                            <tr>
                                <th scope="col" className="px-6 py-3">Módulo</th>
                                <th scope="col" className="px-6 py-3">Estado Actual</th>
                                <th scope="col" className="px-6 py-3">Fecha de Lanzamiento</th>
                                <th scope="col" className="px-6 py-3">Fecha de Revelación</th>
                                <th scope="col" className="px-6 py-3">Badge</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* FIX: Added type annotation for 'flag' to resolve multiple property access errors. */}
                            {Object.values(flags).map((flag: ModuleConfig) => (
                                <tr key={flag.id} className="theme-bg-card border-b theme-border">
                                    <td className="px-6 py-4 font-medium theme-text-primary">{flag.name}</td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={flag.status}
                                            onChange={(e) => handleFlagChange(flag.id, 'status', e.target.value)}
                                            className="theme-bg-card border theme-border rounded p-1"
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
                                            className="theme-bg-card border theme-border rounded p-1"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                         <input
                                            type="date"
                                            value={flag.revealDate ? flag.revealDate.split('T')[0] : ''}
                                            onChange={(e) => handleFlagChange(flag.id, 'revealDate', `${e.target.value}T00:00:00Z`)}
                                            className="theme-bg-card border theme-border rounded p-1"
                                            disabled={!flag.revealDate}
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        {flag.badge && (
                                            <FeatureBadge status={flag.badge.type} text={flag.badge.text} />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default FeatureControlPage;