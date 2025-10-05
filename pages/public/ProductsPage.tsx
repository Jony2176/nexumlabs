
import React from 'react';
import { useModules, MergedModule } from '../../hooks/useModules';
import ModuleCardPremium from '../../components/dashboard/ModuleCardPremium';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import ModuleVisibility from '../../components/features/ModuleVisibility';

const ProductsPage: React.FC = () => {
    const { mergedModules, isLoading } = useModules();
    const navigate = useNavigate();

    const handleModuleAction = (module: MergedModule) => {
        // In public page, all actions lead to registration or contact
        if (!module.isActive) {
          navigate('/register');
          return;
        }
        
        const productPath = module.id.replace('elias_', '').replace('_premium', '');
        navigate(`/productos/${productPath}`);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="py-16">
            <div className="max-w-6xl mx-auto px-6 space-y-12">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-text-primary">Nuestros Productos</h1>
                    <p className="text-text-secondary mt-2 max-w-2xl mx-auto">
                        Herramientas de IA diseñadas para cada aspecto de tu estudio jurídico, desde la captación de clientes hasta la gestión de casos.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {mergedModules.map((module, index) => (
                        <ModuleVisibility key={module.id} moduleId={module.id}>
                            <ModuleCardPremium
                                module={module}
                                onAction={() => handleModuleAction(module)}
                                index={index}
                            />
                        </ModuleVisibility>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
