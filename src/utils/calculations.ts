import { Gender, LipidData } from '../context/AppContext';
import {
  mmolToMgdlCholesterol,
  mmolToMgdlTriglycerides,
} from './unitConverter';

export const getLipidDataInMgdl = (
  data: LipidData,
  unit: 'mgdl' | 'mmol'
): LipidData => {
  if (unit === 'mgdl') {
    return data;
  }

  return {
    total: data.total !== null ? mmolToMgdlCholesterol(data.total) : null,
    ldl: data.ldl !== null ? mmolToMgdlCholesterol(data.ldl) : null,
    hdl: data.hdl !== null ? mmolToMgdlCholesterol(data.hdl) : null,
    triglycerides:
      data.triglycerides !== null
        ? mmolToMgdlTriglycerides(data.triglycerides)
        : null,
  };
};

export interface NormResult {
  value: number;
  isInNorm: boolean;
  isGood: boolean;
  isVeryGood: boolean;
}

export const checkTotalCholesterol = (value: number): NormResult => {
  const isInNorm = value < 190;
  return {
    value,
    isInNorm,
    isGood: isInNorm,
    isVeryGood: isInNorm && value < 170,
  };
};

export const checkLDL = (value: number): NormResult => {
  const isInNorm = value < 115;
  return {
    value,
    isInNorm,
    isGood: isInNorm,
    isVeryGood: isInNorm && value < 100,
  };
};

export const checkHDL = (value: number, gender: Gender): NormResult => {
  const threshold = gender === 'female' ? 45 : 40;
  const isInNorm = value > threshold;
  return {
    value,
    isInNorm,
    isGood: isInNorm,
    isVeryGood: isInNorm && value > (gender === 'female' ? 55 : 50),
  };
};

export const checkTriglycerides = (value: number): NormResult => {
  const isInNorm = value < 150;
  return {
    value,
    isInNorm,
    isGood: isInNorm,
    isVeryGood: isInNorm && value < 100,
  };
};

export const calculateTgHdlRatio = (
  triglycerides: number,
  hdl: number
): number => {
  if (hdl === 0) return Infinity;
  return triglycerides / hdl;
};

export const interpretTgHdlRatio = (ratio: number): {
  status: 'very-good' | 'good' | 'not-good';
  label: string;
} => {
  if (ratio < 1) {
    return { status: 'very-good', label: 'Bardzo dobrze' };
  }
  if (ratio <= 2) {
    return { status: 'good', label: 'Dobrze' };
  }
  return { status: 'not-good', label: 'Niedobrze' };
};

export const calculateResidualCholesterol = (
  total: number,
  ldl: number,
  hdl: number
): number => {
  return total - ldl - hdl;
};

export const interpretResidualCholesterol = (value: number): {
  status: 'very-good' | 'good' | 'not-good';
  label: string;
} => {
  if (value < 18) {
    return { status: 'very-good', label: 'Bardzo dobrze' };
  }
  if (value <= 25) {
    return { status: 'good', label: 'Dobrze' };
  }
  return { status: 'not-good', label: 'Niedobrze' };
};
