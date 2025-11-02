
import React from 'react';
import { useSettingsStore } from '../../store/settingsStore';
import { EXTERNAL_ASSETS } from '../../config/assets.config';
import { cn } from '../../utils/cn';

interface LogoProps {
  className?: string;
  'aria-label'?: string;
  variant?: 'default' | 'white' | 'icon';
}

const Logo: React.FC<LogoProps> = ({ className, variant = 'default', ...props }) => {
  const { 
    logoUrl, // org-specific, takes precedence
    globalLogoUrl, 
    globalLogoSize, 
    useRetinaLogo, 
    retinaLogoUrl 
  } = useSettingsStore();

  const finalLogo = logoUrl || globalLogoUrl || (EXTERNAL_ASSETS.logos[variant] || EXTERNAL_ASSETS.logos.default);
  // Retina logo is a global setting, so it only applies if we are NOT using an org-specific logo.
  const finalRetinaLogo = !logoUrl && useRetinaLogo && retinaLogoUrl ? retinaLogoUrl : undefined;

  return (
    <img
      src={finalLogo}
      srcSet={finalRetinaLogo ? `${finalRetinaLogo} 2x` : undefined}
      className={cn("h-auto object-contain", className)}
      style={{ '--logo-base-width': `${globalLogoSize || 150}px` } as React.CSSProperties}
      alt={props['aria-label'] || "Nexum Platform Logo"}
    />
  );
};

export default Logo;