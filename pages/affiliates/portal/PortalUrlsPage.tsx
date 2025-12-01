
import React from 'react';
import URLGenerator from '../../../components/affiliates/portal/URLGenerator';
import Card from '../../../components/ui/Card';
import { Lightbulb } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';


const PortalUrlsPage: React.FC = () => {
    const { user } = useAuthStore();
    // Use a slice of the user ID as a mock affiliate code if available
    const affiliateCode = user?.id.slice(0, 8).toUpperCase() || 'AFFILIATE123';

    return (
        <div className="space-y-8 animate-slideIn">
            <div>
                <h1 className="text-3xl font-bold text-text-primary">URLs y Enlaces de Referido</h1>
                <p className="text-text-secondary mt-1">Genera y gestiona tus enlaces de marketing de afiliados.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <URLGenerator affiliateCode={affiliateCode} />
                </div>
                <div className="lg:col-span-2">
                    <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                <Lightbulb className="h-6 w-6 text-yellow-500 mr-3"/>
                                <h3 className="text-lg font-semibold text-text-primary">Mejores Prácticas</h3>
                            </div>
                            <ul className="space-y-4 text-text-secondary text-sm">
                                <li className="flex items-start">
                                    <span className="font-bold mr-2 text-primary-500">1.</span>
                                    <span>
                                        <strong className="text-text-primary">Usa Campañas:</strong> Siempre utiliza el campo "Campaña" para rastrear de dónde vienen tus clics (ej. `facebook_post`, `blog_review`, `email_signature`).
                                    </span>
                                </li>
                                <li className="flex items-start">
                                     <span className="font-bold mr-2 text-primary-500">2.</span>
                                    <span>
                                        <strong className="text-text-primary">Acorta tus Enlaces:</strong> Usa servicios como Bitly o TinyURL para hacer tus enlaces más amigables y compartibles en redes sociales.
                                    </span>
                                </li>
                                 <li className="flex items-start">
                                     <span className="font-bold mr-2 text-primary-500">3.</span>
                                    <span>
                                        <strong className="text-text-primary">Ofrece Valor:</strong> No te limites a compartir el enlace. Explica los beneficios de NEXUM y por qué lo recomiendas. El contenido de calidad genera más conversiones.
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span className="font-bold mr-2 text-primary-500">4.</span>
                                    <span>
                                        <strong className="text-text-primary">Sé Transparente:</strong> Informa a tu audiencia que estás utilizando un enlace de afiliado. La honestidad construye confianza.
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PortalUrlsPage;
