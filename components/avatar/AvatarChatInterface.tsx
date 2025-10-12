import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send } from 'lucide-react';
import Card from '../ui/Card';
import { AVATAR_MOCK_DATA } from '../../data/avatarMockData';

const AvatarChatInterface = () => {
  const [messages, setMessages] = useState(AVATAR_MOCK_DATA.initial_messages);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  return (
    <Card className="h-[500px] flex flex-col">
      <div className="p-4 border-b theme-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold theme-text-primary">ELIAS Avatar</h3>
            <p className="text-sm text-green-500">● Online</p>
          </div>
        </div>
      </div>
      
      <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-4 py-2 rounded-lg ${
              message.type === 'user' 
                ? 'bg-emerald-500 text-white' 
                : 'theme-bg-secondary'
            }`}>
              <p className="text-sm">{message.text}</p>
              <p className="text-xs opacity-70 mt-1 text-right">{message.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t theme-border">
        <div className="flex space-x-2">
          <input 
            type="text"
            placeholder="Pregúntame sobre derecho argentino..."
            className="flex-1 px-3 py-2 border theme-border rounded-lg theme-bg-secondary"
          />
          <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Card>
  );
};

export default AvatarChatInterface;
