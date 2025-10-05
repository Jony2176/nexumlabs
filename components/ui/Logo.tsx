import React from 'react';
import { EXTERNAL_ASSETS } from '../../config/assets.config';

interface LogoProps {
  className?: string;
  'aria-label'?: string;
}

const Logo: React.FC<LogoProps> = ({ className, ...props }) => {
  return (
    <img
      src={EXTERNAL_ASSETS.logos.default}
      className={className}
      alt={props['aria-label'] || "Nexum Platform Logo"}
    />
  );
};

export default Logo;