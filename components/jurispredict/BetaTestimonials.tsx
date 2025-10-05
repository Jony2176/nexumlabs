
import React from 'react';
import Card from '../ui/Card';
import { JURISPREDICT_MOCK_DATA } from '../../data/jurispredictMockData';

const BetaTestimonials: React.FC = () => {
  const testimonials = JURISPREDICT_MOCK_DATA.beta_testimonials;
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold theme-text-primary mb-4">Testimonios Beta</h3>
      <div className="space-y-4">
        {testimonials.map(t => (
          <blockquote key={t.name} className="p-4 theme-bg-secondary rounded-lg">
            <p className="text-sm theme-text-secondary">"{t.quote}"</p>
            <footer className="mt-2 text-xs text-right theme-text-primary font-semibold">
              - {t.name}, <cite className="theme-text-muted not-italic">{t.firm}</cite>
            </footer>
          </blockquote>
        ))}
      </div>
    </Card>
  );
};

export default BetaTestimonials;