
import React from 'react';
import Card from '../ui/Card';
import { BarChart2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { AVATAR_MOCK_DATA } from '../../data/avatarMockData';

const COLORS = ['#6366F1', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'];

const AvatarAnalytics = () => {
  const analytics = AVATAR_MOCK_DATA.analytics;

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <BarChart2 className="w-5 h-5 theme-text-secondary" />
          <h3 className="text-lg font-semibold theme-text-primary">Análisis de Tópicos</h3>
        </div>
        <div className="h-48 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie data={analytics.top_topics} dataKey="percentage" nameKey="topic" cx="50%" cy="50%" innerRadius={40} outerRadius={60} fill="#8884d8">
                {analytics.top_topics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
                <Tooltip contentStyle={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--border-color)'
                }}/>
            </PieChart>
            </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
          {analytics.top_topics.map((topic, index) => (
            <div key={topic.topic} className="flex items-center">
              <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
              <span className="theme-text-secondary">{topic.topic}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default AvatarAnalytics;