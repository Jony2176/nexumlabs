import React from 'react';
import Card from '../ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface TopAffiliatesTableProps {
    data: Array<{ id: string; name: string; active_referrals: number; balance_usd: number }>;
}

const TopAffiliatesTable: React.FC<TopAffiliatesTableProps> = ({ data }) => {
    return (
        <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">Top Afiliados</h3>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Afiliado</TableHead>
                        <TableHead className="text-center">Referidos Activos</TableHead>
                        <TableHead className="text-right">Balance</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map(affiliate => (
                        <TableRow key={affiliate.id}>
                            <TableCell className="font-medium">{affiliate.name}</TableCell>
                            <TableCell className="text-center">{affiliate.active_referrals}</TableCell>
                            <TableCell className="text-right">${affiliate.balance_usd.toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    )
}

export default TopAffiliatesTable;
