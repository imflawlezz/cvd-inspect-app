import React from 'react';
import { IonToggle, IonLabel } from '@ionic/react';
import './UnitToggle.css';

interface UnitToggleProps {
  unit: 'mgdl' | 'mmol';
  onUnitChange: (unit: 'mgdl' | 'mmol') => void;
  'aria-label'?: string;
}

const UnitToggle: React.FC<UnitToggleProps> = ({
  unit,
  onUnitChange,
  'aria-label': ariaLabel,
}) => {
  const handleToggle = (checked: boolean) => {
    onUnitChange(checked ? 'mmol' : 'mgdl');
  };

  return (
    <div className="unit-toggle-container" aria-label={ariaLabel || 'Przełącz jednostki'}>
      <IonLabel className="unit-label unit-label-left" color={unit === 'mgdl' ? 'primary' : 'medium'}>
        mg/dl
      </IonLabel>
      <IonToggle
        checked={unit === 'mmol'}
        onIonChange={(e) => handleToggle(e.detail.checked)}
        aria-label="Przełącz między mg/dl a mmol/l"
      />
      <IonLabel className="unit-label unit-label-right" color={unit === 'mmol' ? 'primary' : 'medium'}>
        mmol/l
      </IonLabel>
    </div>
  );
};

export default UnitToggle;
