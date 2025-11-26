import { LipidData, Gender } from '../types';

export interface ValidationError {
  field: keyof LipidData | 'gender';
  message: string;
}

export const validateForm = (
  gender: Gender | null,
  lipidData: LipidData
): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!gender) {
    errors.push({ field: 'gender', message: 'Proszę wybrać płeć' });
  }

  if (lipidData.total === null || lipidData.total <= 0) {
    errors.push({
      field: 'total',
      message: 'Cholesterol całkowity jest wymagany',
    });
  }

  if (lipidData.ldl === null || lipidData.ldl <= 0) {
    errors.push({ field: 'ldl', message: 'LDL jest wymagany' });
  }

  if (lipidData.hdl === null || lipidData.hdl <= 0) {
    errors.push({ field: 'hdl', message: 'HDL jest wymagany' });
  }

  if (lipidData.triglycerides === null || lipidData.triglycerides <= 0) {
    errors.push({
      field: 'triglycerides',
      message: 'Trójglicerydy są wymagane',
    });
  }

  return errors;
};
