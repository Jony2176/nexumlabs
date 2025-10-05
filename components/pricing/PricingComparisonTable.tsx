import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { PRICING_PLANS } from '../../constants';
import { Plan } from '../../types';
import { cn } from '../../utils/cn';
import Button from '../ui/Button';

const allFeatures = [
    { category: 'General', feature: 'Usuarios administradores', key: 'usuarios' },
    { category: 'General', feature: 'Storage', key: 'storage' },
    { category: 'ELIAS WhatsApp', feature: 'Conversaciones/mes', key: 'conversaciones' },
    { category: 'ELIAS WhatsApp', feature: 'SMS recordatorios/mes', key: 'sms' },
    { category: 'ELIAS Llamadas', feature: 'Minutos llamadas IA/mes', key: 'minutos' },
    { category: 'ELIAS Llamadas', feature: 'Recepción telefónica 24/7', key: 'recepcion' },
    { category: 'Dashboard', feature: 'Dashboard analytics', key: 'dashboard' },
    { category: 'Dashboard', feature: 'Dashboard Premium incluido', key: 'dashboard_premium' },
    { category: 'Enterprise', feature: 'JurisPredict AI incluido', key: 'jurispredict' },
    { category: 'Enterprise', feature: 'Avatar Partner incluido', key: 'avatar' },
    { category: 'Soporte', feature: 'Tipo de Soporte', key: 'soporte' },
];

const getFeatureValue = (plan: Plan, featureKey: string): string | boolean => {
    const features = plan.features.join(' ').toLowerCase();
    switch (featureKey) {
        case 'usuarios': return features.match(/(\d+|ilimitados) (usuario|usuarios)/)?.[1] || '1';
        case 'storage': return features.match(/storage: (.*?gb|ilimitado)/)?.[1] || false;
        case 'conversaciones': return features.match(/(\d+,?\d*|ilimitadas) conversaciones/)?.[1] || false;
        case 'sms': return features.match(/(\d+|ilimitados) sms/)?.[1] || false;
        case 'minutos': return features.match(/(\d+,?\d*|ilimitadas) minutos/)?.[1] || false;
        case 'recepcion': return features.includes('recepción telefónica') ? true : false;
        case 'dashboard': return features.match(/dashboard analytics (básico|avanzado)/)?.[1] || false;
        case 'dashboard_premium': return features.includes('dashboard premium') ? true : false;
        case 'jurispredict': return features.includes('jurispredict ai') ? true : false;
        case 'avatar': return features.includes('avatar partner') ? true : false;
        case 'soporte': 
            if (features.includes('telefónico')) return 'Telefónico';
            if (features.includes('prioritario')) return 'Prioritario';
            return 'Email';
        default: return false;
    }
}

const PricingComparisonTable: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    if (!isOpen) {
        return (
            <div className="text-center py-8">
                <Button variant="outline" onClick={() => setIsOpen(true)}>Ver comparación completa de planes</Button>
            </div>
        )
    }

    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-12">Comparación Detallada</h2>
                <div className="overflow-x-auto card-premium p-4">
                    <table className="w-full min-w-[1200px]">
                        <thead>
                            <tr>
                                <th className="p-4 text-left text-xl font-bold">Características</th>
                                {PRICING_PLANS.map(plan => (
                                    <th key={plan.id} className={cn("p-4 text-center", plan.popular && "bg-nexum-primary/10 rounded-t-lg")}>
                                        <p className="font-bold text-lg">{plan.name}</p>
                                        <p className="text-sm text-text-secondary">${plan.price.monthly}/mes</p>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {allFeatures.map(({ category, feature, key }, index) => (
                                <tr key={feature} className="border-t border-border-color">
                                    <td className="p-4 font-semibold">{feature}</td>
                                    {PRICING_PLANS.map(plan => {
                                        const value = getFeatureValue(plan, key);
                                        return (
                                            <td key={plan.id} className={cn("p-4 text-center text-sm", plan.popular && "bg-nexum-primary/10")}>
                                                {typeof value === 'boolean' ? (
                                                    value ? <Check className="mx-auto text-green-500" /> : <X className="mx-auto text-red-500 opacity-50" />
                                                ) : value ? (
                                                    <span className="capitalize">{value}</span>
                                                ) : (
                                                    <X className="mx-auto text-red-500 opacity-50" />
                                                )}
                                            </td>
                                        )
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                 <div className="text-center pt-8">
                    <Button variant="outline" onClick={() => setIsOpen(false)}>Ocultar comparación</Button>
                </div>
            </div>
        </section>
    );
};

export default PricingComparisonTable;