import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import toast from 'react-hot-toast';

interface SupportOptionProps {
  icon: React.ElementType;
  title: string;
  description: string;
  action: string;
}

const SupportOption: React.FC<SupportOptionProps> = ({ icon: Icon, title, description, action }) => {
  const handleClick = () => {
    toast.success(`La funcionalidad de "${title}" estará disponible próximamente.`);
  };

  return (
    <Card className="text-center p-6 flex flex-col items-center">
      <div className="p-4 bg-primary-100 dark:bg-primary-900/50 rounded-full mb-4">
        <Icon className="h-8 w-8 text-primary-500" />
      </div>
      <h3 className="text-xl font-semibold theme-text-primary">{title}</h3>
      <p className="theme-text-secondary mt-2 mb-4 flex-grow">{description}</p>
      <Button onClick={handleClick} className="w-full mt-auto">
        {action}
      </Button>
    </Card>
  );
};

export default SupportOption;
