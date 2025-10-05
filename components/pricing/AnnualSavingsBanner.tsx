import React from 'react';

interface AnnualSavingsBannerProps {
  isAnnual: boolean;
}

const AnnualSavingsBanner: React.FC<AnnualSavingsBannerProps> = ({ isAnnual }) => {
  if (!isAnnual) return null;
  
  return (
    <div className="my-8 max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-4 rounded-lg text-center shadow-lg">
            <p className="text-lg font-bold">
                🎉 ¡Excelente elección! Con el plan anual ahorras 2 meses gratis.
            </p>
            <p className="text-sm mt-1 opacity-90">
                Pagas por 10 meses y obtienes 12 meses completos de servicio.
            </p>
        </div>
    </div>
  );
};

export default AnnualSavingsBanner;