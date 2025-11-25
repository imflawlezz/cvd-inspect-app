import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Gender = 'female' | 'male';
export type Unit = 'mgdl' | 'mmol';

export interface LipidData {
  total: number | null;
  ldl: number | null;
  hdl: number | null;
  triglycerides: number | null;
}

export interface AppState {
  gender: Gender | null;
  unit: Unit;
  lipidData: LipidData;
}

interface AppContextType {
  state: AppState;
  setGender: (gender: Gender) => void;
  setUnit: (unit: Unit) => void;
  setLipidData: (data: Partial<LipidData>) => void;
  resetData: () => void;
}

const initialState: AppState = {
  gender: null,
  unit: 'mgdl',
  lipidData: {
    total: null,
    ldl: null,
    hdl: null,
    triglycerides: null,
  },
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(initialState);

  const setGender = (gender: Gender) => {
    setState((prev) => ({ ...prev, gender }));
  };

  const setUnit = (unit: Unit) => {
    setState((prev) => ({ ...prev, unit }));
  };

  const setLipidData = (data: Partial<LipidData>) => {
    setState((prev) => ({
      ...prev,
      lipidData: { ...prev.lipidData, ...data },
    }));
  };

  const resetData = () => {
    setState(initialState);
  };

  return (
    <AppContext.Provider
      value={{
        state,
        setGender,
        setUnit,
        setLipidData,
        resetData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

