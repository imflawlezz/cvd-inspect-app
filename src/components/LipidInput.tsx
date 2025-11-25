import React from 'react';
import { IonItem, IonLabel, IonInput, IonNote } from '@ionic/react';
import './LipidInput.css';

interface LipidInputProps {
  label: string;
  value: number | null;
  unit: string;
  placeholder: string;
  error?: string;
  required?: boolean;
  onValueChange: (value: number | null) => void;
  'aria-label'?: string;
}

const LipidInput: React.FC<LipidInputProps> = ({
  label,
  value,
  unit,
  placeholder,
  error,
  required = false,
  onValueChange,
  'aria-label': ariaLabel,
}) => {
  const handleInputChange = (e: CustomEvent) => {
    const inputValue = e.detail.value;
    const numValue = inputValue === '' ? null : parseFloat(inputValue);
    
    if (numValue !== null && (isNaN(numValue) || numValue < 0)) {
      return;
    }
    
    onValueChange(numValue);
  };

  return (
    <div className="lipid-input-container">
      <IonItem className="lipid-input-item" lines="none">
        <IonLabel position="stacked" className="lipid-input-label">
          {label}
          {required && <span className="required-asterisk"> *</span>}
        </IonLabel>
        <IonInput
          type="number"
          value={value?.toString() || ''}
          placeholder={placeholder}
          onIonInput={handleInputChange}
          aria-label={ariaLabel || label}
          aria-required={required}
          aria-invalid={!!error}
          className="lipid-input-field"
        />
        <IonNote slot="helper" className="lipid-input-helper">
          Jednostka: {unit}
        </IonNote>
      </IonItem>
      {error && (
        <IonNote color="danger" className="lipid-input-error">
          {error}
        </IonNote>
      )}
    </div>
  );
};

export default LipidInput;
