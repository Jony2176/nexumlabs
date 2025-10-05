
import React, { useState } from 'react';
import Card from '../../ui/Card';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import toast from 'react-hot-toast';
import { Copy, QrCode } from 'lucide-react';

interface URLGeneratorProps {
    affiliateCode: string;
}

const URLGenerator: React.FC<URLGeneratorProps> = ({ affiliateCode }) => {
    const [campaign, setCampaign] = useState('');
    const baseUrl = 'https://nexumlabs.ai/';

    const generatedUrl = `${baseUrl}?ref=${affiliateCode}${campaign ? `&campaign=${campaign}` : ''}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedUrl);
        toast.success('¡URL copiada al portapapeles!');
    };

    return (
        <Card className="h-full">
            <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Generador de Enlaces</h3>
                <div className="space-y-4">
                    <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tu URL de Referido</p>
                        <div className="relative">
                             <input
                                type="text"
                                readOnly
                                value={generatedUrl}
                                className="bg-gray-100 border border-gray-300 text-gray-600 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-300"
                            />
                            <button onClick={handleCopy} className="absolute inset-y-0 right-0 flex items-center pr-3">
                                <Copy className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
                            </button>
                        </div>
                    </div>
                    
                    <Input
                        id="campaign"
                        label="Campaña (Opcional)"
                        type="text"
                        value={campaign}
                        onChange={(e) => setCampaign(e.target.value)}
                        placeholder="ej. facebook_ads, newsletter_julio"
                    />

                    <div className="flex space-x-2 pt-2">
                        <Button onClick={handleCopy} className="flex-1">
                            <Copy className="h-4 w-4 mr-2" />
                            Copiar
                        </Button>
                         <Button variant="outline" className="flex-1" disabled>
                            <QrCode className="h-4 w-4 mr-2" />
                            Generar QR
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default URLGenerator;
