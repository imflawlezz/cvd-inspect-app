import React from 'react';
import { IonItem, IonLabel, IonSelect, IonSelectOption, IonNote } from '@ionic/react';
import { Gender } from '../context/AppContext';
import './GenderSelector.css';

interface GenderSelectorProps {
  value: Gender | null;
  error?: string;
  required?: boolean;
  onValueChange: (value: Gender | null) => void;
  'aria-label'?: string;
}

const GenderSelector: React.FC<GenderSelectorProps> = ({
  value,
  error,
  required = false,
  onValueChange,
  'aria-label': ariaLabel,
}) => {
  const handleChange = (e: CustomEvent) => {
    onValueChange(e.detail.value || null);
  };

  return (
    <div className="gender-selector-container">
      <IonItem className="gender-selector-item" lines="none">
        <IonLabel position="stacked" className="gender-selector-label">
          Płeć
          {required && <span className="required-asterisk"> *</span>}
        </IonLabel>
        <IonSelect
          value={value}
          placeholder="Wybierz płeć"
          onIonChange={handleChange}
          aria-label={ariaLabel || 'Wybierz płeć'}
          aria-required={required}
          aria-invalid={!!error}
        >
          <IonSelectOption value="female">Kobieta</IonSelectOption>
          <IonSelectOption value="male">Mężczyzna</IonSelectOption>
        </IonSelect>
      </IonItem>
      {error && (
        <IonNote color="danger" className="gender-selector-error">
          {error}
        </IonNote>
      )}
    </div>
  );
};

export default GenderSelector;
