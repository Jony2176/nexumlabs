import React from 'react';

interface DashboardHeaderProps {
  orgName: string;
  plan: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ orgName, plan }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-text-primary">Panel de Control</h1>
      <p className="text-text-secondary mt-1">
        Bienvenido, {orgName}. Estás en el plan <span className="font-semibold text-primary">{plan}</span>.
      </p>
    </div>
  );
};

export default DashboardHeader;
