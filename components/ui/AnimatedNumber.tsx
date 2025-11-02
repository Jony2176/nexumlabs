import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { formatARS } from '../../utils/formatters';

const AnimatedNumber = ({ value, prefix = "", suffix = "", isCurrency = false }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, latest => {
    const roundedValue = Math.round(latest);
    return isCurrency ? formatARS(roundedValue, { showCurrency: false }) : roundedValue;
  });

  useEffect(() => {
    const controls = animate(count, value, { 
        duration: 2,
        ease: [0.4, 0, 0.2, 1] 
    });
    return controls.stop;
  }, [value, count]);

  return (
    <>
      {isCurrency && '$'}
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </>
  );
};

export default AnimatedNumber;