import React from 'react';
import Button from '../ui/Button';
import { Download } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboardHeader: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold text-text-primary">Dashboard de Administración</h1>
            <p className="text-text-secondary mt-1">Visión general de la plataforma NEXUM.</p>
        </div>
        <div>
            <Button variant="outline" onClick={() => toast.success('Generando reporte...')}>
                <Download className="h-4 w-4 mr-2"/>
                Exportar Reporte
            </Button>
        </div>
    </div>
  );
};

export default AdminDashboardHeader;
