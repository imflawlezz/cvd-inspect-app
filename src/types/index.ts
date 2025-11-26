export type Gender = 'female' | 'male';
export type Unit = 'mgdl' | 'mmol';

export interface LipidData {
  total: number | null;
  ldl: number | null;
  hdl: number | null;
  triglycerides: number | null;
}

export interface FormState {
  gender: Gender | null;
  unit: Unit;
  lipidData: LipidData;
}

export interface SubmittedData {
  gender: Gender;
  unit: Unit;
  lipidData: LipidData;
}

export interface AppState {
  formState: FormState;
  submittedData: SubmittedData | null;
}

