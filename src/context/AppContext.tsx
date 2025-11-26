import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  Gender,
  Unit,
  LipidData,
  FormState,
  SubmittedData,
  AppState,
} from '../types';

const initialFormState: FormState = {
  gender: null,
  unit: 'mgdl',
  lipidData: {
    total: null,
    ldl: null,
    hdl: null,
    triglycerides: null,
  },
};

const initialState: AppState = {
  formState: initialFormState,
  submittedData: null,
};

interface AppContextType {
  state: AppState;
  formState: FormState;
  submittedData: SubmittedData | null;
  setGender: (gender: Gender) => void;
  setUnit: (unit: Unit) => void;
  setLipidData: (data: Partial<LipidData>) => void;
  submitForm: () => void;
  resetData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(initialState);

  const setGender = (gender: Gender) => {
    setState((prev) => ({
      ...prev,
      formState: { ...prev.formState, gender },
    }));
  };

  const setUnit = (unit: Unit) => {
    setState((prev) => ({
      ...prev,
      formState: { ...prev.formState, unit },
    }));
  };

  const setLipidData = (data: Partial<LipidData>) => {
    setState((prev) => ({
      ...prev,
      formState: {
        ...prev.formState,
        lipidData: { ...prev.formState.lipidData, ...data },
      },
    }));
  };

  const submitForm = () => {
    setState((prev) => {
      const { formState } = prev;
      if (!formState.gender) {
        return prev;
      }

      // Validate that all required fields are filled
      const { total, ldl, hdl, triglycerides } = formState.lipidData;
      if (
        total === null ||
        total <= 0 ||
        ldl === null ||
        ldl <= 0 ||
        hdl === null ||
        hdl <= 0 ||
        triglycerides === null ||
        triglycerides <= 0
      ) {
        return prev;
      }

      // Create submitted data snapshot
      const submittedData: SubmittedData = {
        gender: formState.gender,
        unit: formState.unit,
        lipidData: {
          total,
          ldl,
          hdl,
          triglycerides,
        },
      };

      return {
        ...prev,
        submittedData,
      };
    });
  };

  const resetData = () => {
    setState(initialState);
  };

  return (
    <AppContext.Provider
      value={{
        state,
        formState: state.formState,
        submittedData: state.submittedData,
        setGender,
        setUnit,
        setLipidData,
        submitForm,
        resetData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};



