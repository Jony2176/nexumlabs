
import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface WaitlistCTAProps {
  product: string;
  message: string;
  price: string;
}

const WaitlistCTA: React.FC<WaitlistCTAProps> = ({ product, message, price }) => {
  return (
    <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8">
      <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
        <div>
          <h3 className="text-2xl font-bold">{message}</h3>
          <p className="opacity-80 mt-1">
            Precio de lanzamiento: {price}
          </p>
        </div>
        <Button className="bg-white text-purple-600 hover:bg-gray-200 flex-shrink-0">
          Unirme a la Beta
        </Button>
      </div>
    </Card>
  );
};

export default WaitlistCTA;