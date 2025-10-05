
import React from 'react';
import Card from '../ui/Card';
import { History } from 'lucide-react';
import { AVATAR_MOCK_DATA } from '../../data/avatarMockData';

const ConversationHistory = () => {
  const history = AVATAR_MOCK_DATA.conversation_history;

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <History className="w-5 h-5 theme-text-secondary" />
          <h3 className="text-lg font-semibold theme-text-primary">Historial de Conversaciones</h3>
        </div>
        <ul className="space-y-2">
          {history.map((item, index) => (
            <li key={index} className="flex justify-between items-center p-2 theme-bg-secondary rounded-md">
              <span className="text-sm theme-text-primary">{item.title}</span>
              <div className="flex items-center gap-4">
                <span className="text-xs theme-text-muted">{item.date}</span>
                <span className="text-xs theme-text-secondary">{item.duration}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default ConversationHistory;