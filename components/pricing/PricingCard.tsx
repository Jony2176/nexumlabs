
import React from 'react';
import { Plan } from '../../types';
import Button from '../ui/Button';
import { Check, X, Star } from 'lucide-react';
import { useDualPrice } from '../../hooks/useDualPrice';
import { cn } from '../../utils/cn';

interface PricingCardProps {
  plan: Plan;
  onSelect: (plan: Plan) => void;
  isAnnual: boolean;
  currency: 'USD' | 'ARS';
  isAvailable: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, onSelect, isAnnual, currency, isAvailable }) => {
  const { name, description, features, notIncluded, popular, enterprise, discount, badge } = plan;
  
  const priceToShow = isAnnual ? plan.price.annual : plan.price.monthly;
  const regularPriceToShow = plan.regularPrice ? (isAnnual ? plan.regularPrice.annual : plan.regularPrice.monthly) : null;
  
  const { priceInfo, isLoading } = useDualPrice(priceToShow);

  const getCTA = () => {
    if (!isAvailable) {
      return { text: 'Notificarme', disabled: true, variant: 'outline' as const };
    }
    if (enterprise) {
      return { text: 'Contactar Ventas', disabled: false, variant: 'outline' as const };
    }
    if (popular) {
        return { text: 'Comenzar Ahora', disabled: false, variant: 'default' as const };
    }
    return { text: 'Comenzar Prueba Gratis', disabled: false, variant: 'outline' as const };
  }

  const cta = getCTA();

  return (
    <div className={cn(
        'card-premium p-6 flex flex-col h-full relative',
        popular && 'border-2 border-yellow-400 scale-105 shadow-2xl shadow-yellow-500/10',
        !isAvailable && 'opacity-60 grayscale'
    )}>
      {/* Badge */}
      {badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className={cn(
            'px-4 py-1.5 text-xs font-bold rounded-full text-white shadow-lg animate-pulse flex items-center gap-1.5',
            popular ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black' : 'bg-gray-500'
          )}>
            {popular && <Star size={12} />}
            {badge}
          </span>
        </div>
      )}

      <div className="text-center pt-4">
        <h3 className="text-2xl font-bold text-text-primary">{name}</h3>
        <p className="text-text-secondary text-sm mt-1 h-10">{description}</p>
      </div>

      {/* Price */}
      <div className="my-6 text-center">
        {isLoading || !priceInfo ? (
            <div className="h-20 animate-pulse"><div className="h-12 w-32 mx-auto bg-gray-700 rounded-md"></div></div>
        ) : (
            <>
                {regularPriceToShow && discount && (
                    <div className="h-6 text-sm text-text-muted">
                        <span className="line-through">${isAnnual ? plan.regularPrice?.annual : plan.regularPrice?.monthly}</span>
                        <span className="ml-2 px-2 py-0.5 bg-green-500/20 text-green-300 text-xs font-bold rounded-full">{discount}% OFF</span>
                    </div>
                )}
                <div className="flex items-baseline justify-center gap-2 mt-1">
                    <span className={cn(
                      'font-bold text-text-primary',
                      currency === 'ARS' ? 'text-3xl' : 'text-4xl lg:text-5xl'
                    )}>
                        {currency === 'USD' ? priceInfo.formattedUSD : priceInfo.formattedARS}
                    </span>
                    <span className="text-text-secondary">/mes</span>
                </div>
                <p className="text-sm text-text-muted h-5 mt-1">
                     {currency === 'ARS' 
                        ? `~ ${priceInfo.formattedUSD} USD` 
                        : `~ ${priceInfo.formattedARS} ARS`}
                </p>
            </>
        )}
      </div>
      
      {/* Features */}
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-text-secondary text-sm">{feature}</span>
          </li>
        ))}
         {notIncluded?.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3 opacity-50">
            <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <span className="text-text-secondary text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button 
          onClick={() => onSelect(plan)} 
          className="w-full mt-auto"
          size="lg"
          variant={cta.variant}
          disabled={cta.disabled}
      >
        {cta.text}
      </Button>
    </div>
  );
};

export default PricingCard;
