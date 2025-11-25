import { AppState } from '../context/AppContext';

export const isFormDataComplete = (state: AppState): boolean => {
  if (!state.gender) {
    return false;
  }

  const { total, ldl, hdl, triglycerides } = state.lipidData;
  
  return (
    total !== null &&
    total > 0 &&
    ldl !== null &&
    ldl > 0 &&
    hdl !== null &&
    hdl > 0 &&
    triglycerides !== null &&
    triglycerides > 0
  );
};
