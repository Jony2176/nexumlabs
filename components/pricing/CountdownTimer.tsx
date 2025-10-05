
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const TimeBlock: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <span className="text-3xl sm:text-4xl font-bold">{String(value).padStart(2, '0')}</span>
    <span className="text-xs sm:text-sm uppercase tracking-wider opacity-75">{label}</span>
  </div>
);

const CountdownTimer: React.FC = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date('2026-03-31T23:59:59') - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-xl shadow-lg my-8 text-center">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Clock className="w-6 h-6 animate-pulse" />
        <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide">¡Precios de Lanzamiento!</h2>
      </div>
      <p className="mb-6 opacity-90 text-sm sm:text-base">La oferta termina en:</p>
      <div className="flex justify-center items-center gap-4 sm:gap-8">
        <TimeBlock value={timeLeft.days} label="Días" />
        <span className="text-3xl font-bold">:</span>
        <TimeBlock value={timeLeft.hours} label="Horas" />
        <span className="text-3xl font-bold">:</span>
        <TimeBlock value={timeLeft.minutes} label="Minutos" />
        <span className="text-3xl font-bold">:</span>
        <TimeBlock value={timeLeft.seconds} label="Segundos" />
      </div>
    </div>
  );
};

export default CountdownTimer;
