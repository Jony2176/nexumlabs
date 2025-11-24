import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import Card from '../ui/Card';
import Badge from '../ui/badge';
import Button from '../ui/Button';
import { Users } from 'lucide-react';
import api from '../../services/api';
import { ReferralData } from '../../types';
import CardSkeleton from '../ui/CardSkeleton';
import toast from 'react-hot-toast';

const ReferralsTable: React.FC<{ affiliateId: string }> = ({ affiliateId }) => {
  const [referrals, setReferrals] = useState<ReferralData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.getAffiliateReferrals(affiliateId);
        setReferrals(response.data);
      } catch (error) {
        console.error("Failed to fetch referrals:", error);
        toast.error("No se pudieron cargar los referidos.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [affiliateId]);

  const getStatusBadge = (status: 'trial' | 'active' | 'cancelled') => {
    const variants = {
      trial: { variant: 'warning', label: 'En Trial' },
      active: { variant: 'success', label: 'Activo' },
      cancelled: { variant: 'destructive', label: 'Cancelado' },
    } as const;
    return <Badge variant={variants[status].variant}>{variants[status].label}</Badge>;
  };
  
  if(loading) return <CardSkeleton className="mt-8" />;

  return (
    <Card className="p-6 mt-8">
      <h3 className="text-lg font-bold mb-4">Mis Referidos</h3>
      {referrals.length === 0 ? (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Aún no tienes referidos activos</p>
          <Button className="mt-4" variant="outline">
            Copiar Link de Referido
          </Button>
        </div>
      ) : (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Organización</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Comisión Mensual</TableHead>
            <TableHead className="text-right">Total Pagado</TableHead>
            <TableHead>Fecha Conversión</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {referrals.map((referral) => (
            <TableRow key={referral.org_id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <TableCell className="font-medium">{referral.org_name}</TableCell>
              <TableCell>
                <Badge variant="outline">{referral.plan_id}</Badge>
              </TableCell>
              <TableCell>{getStatusBadge(referral.status)}</TableCell>
              <TableCell className="text-right font-medium text-green-600">
                ${referral.monthly_commission_usd.toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                ${referral.total_commission_paid.toFixed(2)}
              </TableCell>
              <TableCell>
                {new Date(referral.conversion_date).toLocaleDateString('es-AR')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      )}
    </Card>
  );
};

export default ReferralsTable;
