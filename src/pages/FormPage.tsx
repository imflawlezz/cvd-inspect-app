import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useApp, Gender } from '../context/AppContext';
import { validateForm } from '../utils/validation';
import {
  mgdlToMmolCholesterol,
  mmolToMgdlCholesterol,
  mgdlToMmolTriglycerides,
  mmolToMgdlTriglycerides,
} from '../utils/unitConverter';
import UnitToggle from '../components/UnitToggle';
import LipidInput from '../components/LipidInput';
import GenderSelector from '../components/GenderSelector';
import './FormPage.css';

const FormPage: React.FC = () => {
  const history = useHistory();
  const { state, setGender, setUnit, setLipidData } = useApp();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const clearError = (field: string) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const handleGenderChange = (value: Gender | null) => {
    if (value) {
      setGender(value);
      clearError('gender');
    }
  };

  const handleUnitChange = (newUnit: 'mgdl' | 'mmol') => {
    const oldUnit = state.unit;
    const { lipidData } = state;

    const hasData = Object.values(lipidData).some((val) => val !== null);
    if (!hasData) {
      setUnit(newUnit);
      return;
    }

    const convertedData: Partial<typeof lipidData> = {};

    if (oldUnit === 'mgdl' && newUnit === 'mmol') {
      if (lipidData.total !== null) {
        convertedData.total = mgdlToMmolCholesterol(lipidData.total);
      }
      if (lipidData.ldl !== null) {
        convertedData.ldl = mgdlToMmolCholesterol(lipidData.ldl);
      }
      if (lipidData.hdl !== null) {
        convertedData.hdl = mgdlToMmolCholesterol(lipidData.hdl);
      }
      if (lipidData.triglycerides !== null) {
        convertedData.triglycerides = mgdlToMmolTriglycerides(lipidData.triglycerides);
      }
    } else if (oldUnit === 'mmol' && newUnit === 'mgdl') {
      if (lipidData.total !== null) {
        convertedData.total = mmolToMgdlCholesterol(lipidData.total);
      }
      if (lipidData.ldl !== null) {
        convertedData.ldl = mmolToMgdlCholesterol(lipidData.ldl);
      }
      if (lipidData.hdl !== null) {
        convertedData.hdl = mmolToMgdlCholesterol(lipidData.hdl);
      }
      if (lipidData.triglycerides !== null) {
        convertedData.triglycerides = mmolToMgdlTriglycerides(lipidData.triglycerides);
      }
    }

    setLipidData(convertedData);
    setUnit(newUnit);
  };

  const handleLipidChange = (field: keyof typeof state.lipidData, value: number | null) => {
    setLipidData({ [field]: value });
    clearError(field);
  };

  const handleSubmit = () => {
    const validationErrors = validateForm(state.gender, state.lipidData);
    if (validationErrors.length > 0) {
      const errorMap: Record<string, string> = {};
      validationErrors.forEach((error) => {
        errorMap[error.field] = error.message;
      });
      setErrors(errorMap);
      return;
    }

    history.push('/norms-report');
  };

  const unitLabel = state.unit === 'mgdl' ? 'mg/dl' : 'mmol/l';

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>CVD Inspect</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="form-page-container">
          <div className="form-header">
            <h1 className="page-title">Ocena ryzyka CVD</h1>
            <p className="page-subtitle">
              Wprowadź dane z lipidogramu, aby ocenić ryzyko chorób
              sercowo-naczyniowych
            </p>
          </div>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Dane podstawowe</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <GenderSelector
                value={state.gender}
                error={errors.gender}
                required
                onValueChange={handleGenderChange}
              />
            </IonCardContent>
            <IonCardHeader>
              <IonCardTitle>Jednostki pomiaru</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <UnitToggle unit={state.unit} onUnitChange={handleUnitChange} />
            </IonCardContent>
            <IonCardHeader>
              <IonCardTitle>Wyniki lipidogramu</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <LipidInput
                label="Cholesterol całkowity (Total)"
                value={state.lipidData.total}
                unit={unitLabel}
                placeholder={`0.0 ${unitLabel}`}
                error={errors.total}
                required
                onValueChange={(value) => handleLipidChange('total', value)}
              />

              <LipidInput
                label="LDL"
                value={state.lipidData.ldl}
                unit={unitLabel}
                placeholder={`0.0 ${unitLabel}`}
                error={errors.ldl}
                required
                onValueChange={(value) => handleLipidChange('ldl', value)}
              />

              <LipidInput
                label="HDL"
                value={state.lipidData.hdl}
                unit={unitLabel}
                placeholder={`0.0 ${unitLabel}`}
                error={errors.hdl}
                required
                onValueChange={(value) => handleLipidChange('hdl', value)}
              />

              <LipidInput
                label="Trójglicerydy (TG)"
                value={state.lipidData.triglycerides}
                unit={unitLabel}
                placeholder={`0.0 ${unitLabel}`}
                error={errors.triglycerides}
                required
                onValueChange={(value) => handleLipidChange('triglycerides', value)}
              />
            </IonCardContent>
          </IonCard>

          <div className="button-container">
            <IonButton
              expand="block"
              size="large"
              onClick={handleSubmit}
              className="submit-button"
              aria-label="Przejdź do raportu norm"
            >
              Sprawdź normy
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default FormPage;
