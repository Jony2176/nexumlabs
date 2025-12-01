
import React from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { Download } from 'lucide-react';
import { EXTERNAL_ASSETS } from '../../../config/assets.config';

const mockCreatives = [
    {
        id: 'banner_728x90',
        title: 'Leaderboard Banner',
        dimensions: '728x90',
        imageUrl: 'https://placehold.co/728x90/1E293B/FFFFFF?text=NEXUM%20Platform&font=sans',
        downloadUrl: '#'
    },
    {
        id: 'banner_300x250',
        title: 'Medium Rectangle Banner',
        dimensions: '300x250',
        imageUrl: 'https://placehold.co/300x250/1E293B/FFFFFF?text=NEXUM%20Platform&font=sans',
        downloadUrl: '#'
    },
     {
        id: 'banner_160x600',
        title: 'Wide Skyscraper',
        dimensions: '160x600',
        imageUrl: 'https://placehold.co/160x600/1E293B/FFFFFF?text=NEXUM%20Platform&font=sans',
        downloadUrl: '#'
    },
    {
        id: 'logo_color',
        title: 'Logo a Color',
        dimensions: 'PNG',
        imageUrl: EXTERNAL_ASSETS.logos.default,
        downloadUrl: EXTERNAL_ASSETS.logos.default,
        isLogo: true,
    },
     {
        id: 'logo_white',
        title: 'Logo para Fondos Oscuros',
        dimensions: 'PNG',
        imageUrl: EXTERNAL_ASSETS.logos.default,
        downloadUrl: EXTERNAL_ASSETS.logos.default,
        isLogo: true,
        invertLogo: true,
    },
];

type CreativeCardProps = (typeof mockCreatives)[0];

const CreativeCard: React.FC<CreativeCardProps> = ({ title, dimensions, imageUrl, downloadUrl, isLogo, invertLogo }) => {
    
    // Use darker backgrounds for image containers in dark mode for better contrast with white logos/text
    const imageContainerClasses = `flex items-center justify-center h-48 rounded-t-xl p-4 ${isLogo ? 'bg-gray-200 dark:bg-gray-900' : 'bg-gray-100 dark:bg-gray-950'}`;
    const imageClasses = `max-h-full max-w-full object-contain ${invertLogo ? 'dark:invert' : ''}`

    return (
        <Card className="flex flex-col hover:shadow-lg hover:border-primary-500/30 transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className={imageContainerClasses}>
                 <img src={imageUrl} alt={title} className={imageClasses} />
            </div>
            <div className="p-4 flex-grow flex flex-col">
                <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{dimensions}</p>
                <Button 
                    size="sm"
                    variant="secondary"
                    className="mt-auto bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                    onClick={() => window.open(downloadUrl, '_blank')}
                    disabled={downloadUrl === '#'}
                >
                    <Download className="h-4 w-4 mr-2"/>
                    Descargar
                </Button>
            </div>
        </Card>
    );
};


const PortalCreativesPage: React.FC = () => {
    return (
        <div className="space-y-8 animate-slideIn">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Material Promocional</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Utiliza estos recursos para promocionar NEXUM en tu sitio web o redes sociales.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mockCreatives.map(creative => (
                    <CreativeCard key={creative.id} {...creative} />
                ))}
            </div>
        </div>
    );
};

export default PortalCreativesPage;
