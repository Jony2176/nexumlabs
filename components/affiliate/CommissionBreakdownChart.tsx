import React from 'react';
import Card from '../ui/Card';

const CommissionBreakdownChart: React.FC<{ affiliateId: string }> = ({ affiliateId }) => {
  // This component is a placeholder as per the prompt.
  // In a real implementation, it would fetch data and render a chart (e.g., Pie or Donut chart).
  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold mb-4">Desglose de Comisiones</h3>
      <div className="flex items-center justify-center h-full text-gray-500">
        <p>Gráfico de desglose de comisiones próximamente.</p>
      </div>
    </Card>
  );
};

export default CommissionBreakdownChart;
