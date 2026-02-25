'use client';

import React, { createContext, useContext } from 'react';
import { useGSAPAnimations } from '@/hooks';

interface GSAPAnimationsContextValue {
  refreshScrollTrigger: () => void;
  resetAnimations: () => void;
}

const GSAPAnimationsContext = createContext<GSAPAnimationsContextValue | undefined>(undefined);

interface GSAPAnimationsProviderProps {
  children: React.ReactNode;
}

export const GSAPAnimationsProvider: React.FC<GSAPAnimationsProviderProps> = ({ children }) => {
  const { refreshScrollTrigger, resetAnimations } = useGSAPAnimations();

  const value: GSAPAnimationsContextValue = {
    refreshScrollTrigger,
    resetAnimations,
  };

  return (
    <GSAPAnimationsContext.Provider value={value}>
      {children}
    </GSAPAnimationsContext.Provider>
  );
};

export const useGSAPAnimationsContext = (): GSAPAnimationsContextValue => {
  const context = useContext(GSAPAnimationsContext);
  
  if (!context) {
    throw new Error('useGSAPAnimationsContext must be used within a GSAPAnimationsProvider');
  }
  
  return context;
};
