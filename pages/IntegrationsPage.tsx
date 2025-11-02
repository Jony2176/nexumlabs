import React from 'react';
import IntegrationFilters from '../components/integrations/IntegrationFilters';
import IntegrationCard from '../components/integrations/IntegrationCard';

const IntegrationsPage: React.FC = () => {
  const integrations = [
    { name: "Lexis Nexis", category: "CRM Legal", status: "available" as const, logo: "⚖️" },
    { name: "Thomson Reuters", category: "CRM Legal", status: "available" as const, logo: "📚" },
    { name: "Westlaw", category: "CRM Legal", status: "coming_soon" as const, logo: "🏛️" },
    { name: "AFIP Argentina", category: "Facturación", status: "connected" as const, logo: "🏦" },
    { name: "Contabilium", category: "Facturación", status: "available" as const, logo: "💰" },
    { name: "Slack", category: "Comunicación", status: "connected" as const, logo: "💬" },
    { name: "Microsoft Teams", category: "Comunicación", status: "available" as const, logo: "👥" },
    { name: "Mailchimp", category: "Email Marketing", status: "available" as const, logo: "📧" },
    { name: "Google Drive", category: "Storage", status: "connected" as const, logo: "☁️" },
    { name: "Dropbox Business", category: "Storage", status: "available" as const, logo: "📁" },
    { name: "OneDrive", category: "Storage", status: "available" as const, logo: "🗂️" }
  ];

  return (
      <div className="min-h-full theme-bg-secondary p-6">
        <div className="mx-auto space-y-8">
          
          <div>
            <h1 className="text-3xl font-bold theme-text-primary">
              Integraciones
            </h1>
            <p className="theme-text-secondary mt-2">
              Conecta NEXUM con tus herramientas favoritas para potenciar tu flujo de trabajo.
            </p>
          </div>

          <IntegrationFilters />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((integration, index) => (
              <IntegrationCard key={index} integration={integration} />
            ))}
          </div>
        </div>
      </div>
  );
};

export default IntegrationsPage;