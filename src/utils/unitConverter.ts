export const CHOLESTEROL_CONVERSION = 38.64;
export const TRIGLYCERIDES_CONVERSION = 88.62;

export const mmolToMgdlCholesterol = (mmol: number): number => {
  return mmol * CHOLESTEROL_CONVERSION;
};

export const mgdlToMmolCholesterol = (mgdl: number): number => {
  return mgdl / CHOLESTEROL_CONVERSION;
};

export const mmolToMgdlTriglycerides = (mmol: number): number => {
  return mmol * TRIGLYCERIDES_CONVERSION;
};

export const mgdlToMmolTriglycerides = (mgdl: number): number => {
  return mgdl / TRIGLYCERIDES_CONVERSION;
};
