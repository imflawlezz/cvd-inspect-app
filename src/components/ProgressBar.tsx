import React from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
  value: number | null;
  maxValue: number;
  status: 'very-good' | 'good' | 'not-good';
  label: string;
  unit: string;
  reverse?: boolean;
  'aria-label'?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  maxValue,
  status,
  label,
  unit,
  reverse = false,
  'aria-label': ariaLabel,
}) => {
  if (value === null || isNaN(value)) {
    return (
      <div className="progress-bar-container" aria-label={ariaLabel || label}>
        <div className="progress-bar-header">
          <div className="progress-bar-label">
            <span className="label-text">{label}</span>
          </div>
          <div className="progress-bar-value">—</div>
        </div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: '0%' }} />
        </div>
      </div>
    );
  }

  let percentage: number;
  let exceedsMax = false;
  
  if (reverse) {
    if (value >= maxValue) {
      percentage = 100;
    } else {
      percentage = (value / maxValue) * 100;
    }
  } else {
    percentage = Math.min((value / maxValue) * 100, 100);
    exceedsMax = value > maxValue;
  }

  const getStatusColor = () => {
    switch (status) {
      case 'very-good':
        return 'var(--ion-color-success)';
      case 'good':
        return 'var(--ion-color-warning)';
      case 'not-good':
        return 'var(--ion-color-danger)';
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'very-good':
        return 'Bardzo dobrze';
      case 'good':
        return 'W normie';
      case 'not-good':
        return 'Poza normą';
    }
  };

  return (
    <div className="progress-bar-container" aria-label={ariaLabel || `${label}: ${value} ${unit}`}>
      <div className="progress-bar-header">
        <div className="progress-bar-label">
          <span className="label-text">{label}</span>
          <span className="label-status" style={{ color: getStatusColor() }}>
            {getStatusLabel()}
          </span>
        </div>
        <div className="progress-bar-value">
          {value.toFixed(1)} {unit}
          {exceedsMax && <span className="exceeds-indicator">!</span>}
        </div>
      </div>
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{
            width: `${percentage}%`,
            backgroundColor: getStatusColor(),
          }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={maxValue}
          aria-label={`${label}: ${value} ${unit}`}
        />
      </div>
      {exceedsMax && (
        <div className="progress-bar-note" style={{ color: getStatusColor() }}>
          Wartość przekracza normę o {(value - maxValue).toFixed(1)} {unit}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;

