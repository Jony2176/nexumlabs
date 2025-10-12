import React from 'react';
import Card from '../ui/Card';
import { AVATAR_MOCK_DATA } from '../../data/avatarMockData';

const AvatarPersonalityConfig = () => {
  const config = AVATAR_MOCK_DATA.personality_config;

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-semibold theme-text-primary mb-4">Personalidad del Avatar</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="theme-text-secondary">Nombre:</span>
            <span className="font-medium theme-text-primary">{config.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="theme-text-secondary">Persona:</span>
            <span className="font-medium theme-text-primary">{config.persona}</span>
          </div>
          <div className="flex justify-between">
            <span className="theme-text-secondary">Tono:</span>
            <span className="font-medium theme-text-primary">{config.tone}</span>
          </div>
           <div className="flex justify-between">
            <span className="theme-text-secondary">Idioma:</span>
            <span className="font-medium theme-text-primary">{config.language}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AvatarPersonalityConfig;
