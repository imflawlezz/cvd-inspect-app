import { SubmittedData } from '../types';

export const isFormDataComplete = (submittedData: SubmittedData | null): boolean => {
  if (!submittedData) {
    return false;
  }

  const { total, ldl, hdl, triglycerides } = submittedData.lipidData;
  
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
