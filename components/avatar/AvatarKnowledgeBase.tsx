
import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { BookOpen, UploadCloud, FileText, CheckCircle, Loader } from 'lucide-react';
import { AVATAR_MOCK_DATA } from '../../data/avatarMockData';

const statusIcons = {
  active: <CheckCircle className="h-4 w-4 text-green-500" />,
  indexing: <Loader className="h-4 w-4 text-yellow-500 animate-spin" />,
};

const AvatarKnowledgeBase = () => {
  const knowledgeBase = AVATAR_MOCK_DATA.knowledge_base;

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-5 h-5 theme-text-secondary" />
            <h3 className="text-lg font-semibold theme-text-primary">Base de Conocimiento</h3>
        </div>
        <div className="space-y-2">
          {knowledgeBase.map((doc) => (
            <div key={doc.name} className="flex items-center justify-between p-2 theme-bg-secondary rounded-md">
              <div className="flex items-center gap-2 truncate">
                <FileText className="h-4 w-4 theme-text-secondary flex-shrink-0" />
                <span className="text-sm theme-text-primary truncate" title={doc.name}>{doc.name}</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs theme-text-muted">{doc.size}</span>
                {statusIcons[doc.status as keyof typeof statusIcons]}
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4">
          <UploadCloud className="h-4 w-4 mr-2" />
          Subir Documentos
        </Button>
      </div>
    </Card>
  );
};

export default AvatarKnowledgeBase;