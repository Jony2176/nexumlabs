import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import Card from '../ui/Card';
import Badge from '../ui/badge';
import { ActivityEvent } from '../../types';
import api from '../../services/api';
import CardSkeleton from '../ui/CardSkeleton';
import toast from 'react-hot-toast';

const RecentActivityTable: React.FC<{ orgId: string }> = ({ orgId }) => {
  const [events, setEvents] = useState<ActivityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.getClientRecentActivity(orgId, 20);
        setEvents(response.data);
      } catch (error) {
        console.error("Failed to fetch recent activity:", error);
        toast.error("No se pudo cargar la actividad reciente.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [orgId]);

  const getEventLabel = (eventType: string, module: string) => {
    const labels: { [key: string]: string } = {
      message_sent: 'Mensaje enviado',
      call_made: 'Llamada realizada',
      query_run: 'Consulta ejecutada',
      report_viewed: 'Reporte visualizado',
    };
    return labels[eventType] || eventType;
  };

  if (loading) return <CardSkeleton className="mt-8"/>;

  return (
    <Card className="p-6 mt-8">
      <h3 className="text-lg font-bold mb-4">Actividad Reciente</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha y Hora</TableHead>
            <TableHead>Módulo</TableHead>
            <TableHead>Evento</TableHead>
            <TableHead className="text-right">Cantidad</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <TableCell>
                {new Date(event.created_at).toLocaleString('es-AR', {
                  day: '2-digit',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </TableCell>
              <TableCell>
                <Badge variant="outline">{event.module}</Badge>
              </TableCell>
              <TableCell>{getEventLabel(event.event_type, event.module)}</TableCell>
              <TableCell className="text-right font-medium">{event.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default RecentActivityTable;
