import React, { useState, useEffect } from 'react';

export const useExitIntent = (onExitIntent: () => void) => {
  useEffect(() => {
    const handleMouseOut = (e: MouseEvent) => {
      // Check if the mouse is leaving the top of the viewport
      if (e.clientY <= 0) {
        // Use sessionStorage to ensure the popup only shows once per session
        const hasShown = sessionStorage.getItem('exitIntentShown');
        if (!hasShown) {
          onExitIntent();
          sessionStorage.setItem('exitIntentShown', 'true');
        }
      }
    };

    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [onExitIntent]);
};