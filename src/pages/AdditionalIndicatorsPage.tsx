import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardContent,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  getLipidDataInMgdl,
  calculateTgHdlRatio,
  interpretTgHdlRatio,
  calculateResidualCholesterol,
  interpretResidualCholesterol,
} from '../utils/calculations';
import ProgressBar from '../components/ProgressBar';
import './AdditionalIndicatorsPage.css';

const AdditionalIndicatorsPage: React.FC = () => {
  const history = useHistory();
  const { submittedData } = useApp();

  if (!submittedData) {
    return null;
  }

  const dataInMgdl = getLipidDataInMgdl(submittedData.lipidData, submittedData.unit);

  const tgHdlRatio = calculateTgHdlRatio(
    dataInMgdl.triglycerides!,
    dataInMgdl.hdl!
  );
  const tgHdlInterpretation = interpretTgHdlRatio(tgHdlRatio);

  const residualCholesterol = calculateResidualCholesterol(
    dataInMgdl.total!,
    dataInMgdl.ldl!,
    dataInMgdl.hdl!
  );
  const residualInterpretation = interpretResidualCholesterol(
    residualCholesterol
  );

  const handleBack = () => {
    history.push('/');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Dodatkowe wskaźniki</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="indicators-container">
          <div className="indicators-header">
            <h1 className="page-title">Dodatkowe wskaźniki</h1>
            <p className="page-subtitle">
              Zaawansowane wskaźniki oceny ryzyka sercowo-naczyniowego
            </p>
          </div>

          <IonCard>
            <IonCardContent>
              <ProgressBar
                value={tgHdlRatio}
                maxValue={2}
                status={tgHdlInterpretation.status}
                label="TG/HDL"
                unit=""
              />
              <div className="interpretation-info">
                <h3>Interpretacja:</h3>
                <ul>
                  <li>
                    <strong>&lt; 1:</strong> Bardzo dobrze
                  </li>
                  <li>
                    <strong>1-2:</strong> Dobrze
                  </li>
                  <li>
                    <strong>&gt; 2:</strong> Niedobrze
                  </li>
                </ul>
              </div>
              <div className="calculation-info">
                <strong>Obliczenie:</strong> {dataInMgdl.triglycerides!.toFixed(1)} ÷{' '}
                {dataInMgdl.hdl!.toFixed(1)} = {tgHdlRatio.toFixed(2)}
              </div>
              <ProgressBar
                value={residualCholesterol}
                maxValue={25}
                status={residualInterpretation.status}
                label="Cholesterol resztkowy"
                unit="mg/dl"
              />
              <div className="interpretation-info">
                <h3>Interpretacja:</h3>
                <ul>
                  <li>
                    <strong>&lt; 18 mg/dl:</strong> Bardzo dobrze
                  </li>
                  <li>
                    <strong>18-25 mg/dl:</strong> Dobrze
                  </li>
                  <li>
                    <strong>&gt; 25 mg/dl:</strong> Niedobrze
                  </li>
                </ul>
              </div>
              <div className="calculation-info">
                <strong>Obliczenie:</strong> {dataInMgdl.total!.toFixed(1)} -{' '}
                {dataInMgdl.ldl!.toFixed(1)} - {dataInMgdl.hdl!.toFixed(1)} ={' '}
                {residualCholesterol.toFixed(1)} mg/dl
              </div>
            </IonCardContent>
          </IonCard>

          <div className="button-container">
            <IonButton
              expand="block"
              size="large"
              onClick={handleBack}
              className="back-button"
              aria-label="Wróć do formularza i zmień dane"
            >
              Wróć i zmień dane
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AdditionalIndicatorsPage;
