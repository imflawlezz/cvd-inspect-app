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
  checkTotalCholesterol,
  checkLDL,
  checkHDL,
  checkTriglycerides,
} from '../utils/calculations';
import ProgressBar from '../components/ProgressBar';
import './NormsReportPage.css';

const NormsReportPage: React.FC = () => {
  const history = useHistory();
  const { submittedData } = useApp();

  if (!submittedData) {
    return null;
  }

  const dataInMgdl = getLipidDataInMgdl(submittedData.lipidData, submittedData.unit);

  const totalResult = checkTotalCholesterol(dataInMgdl.total!);
  const ldlResult = checkLDL(dataInMgdl.ldl!);
  const hdlResult = checkHDL(dataInMgdl.hdl!, submittedData.gender);
  const triglyceridesResult = checkTriglycerides(dataInMgdl.triglycerides!);

  const getStatus = (
    result: typeof totalResult
  ): 'very-good' | 'good' | 'not-good' => {
    if (result.isVeryGood) return 'very-good';
    if (result.isGood) return 'good';
    return 'not-good';
  };

  const handleContinue = () => {
    history.push('/additional-indicators');
  };

  const handleBack = () => {
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Raport norm</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="report-container">
          <div className="report-header">
            <h1 className="page-title">Wyniki lipidogramu</h1>
            <p className="page-subtitle">
              Porównanie wyników z normami referencyjnymi
            </p>
          </div>

          <IonCard>
            <IonCardContent>
              <ProgressBar
                value={totalResult.value}
                maxValue={190}
                status={getStatus(totalResult)}
                label="Cholesterol całkowity"
                unit="mg/dl"
              />
              <div className="norm-info">
                Norma: &lt; 190 mg/dl
              </div>

              <ProgressBar
                value={ldlResult.value}
                maxValue={115}
                status={getStatus(ldlResult)}
                label="LDL"
                unit="mg/dl"
              />
              <div className="norm-info">
                Norma: &lt; 115 mg/dl
              </div>

              <ProgressBar
                value={hdlResult.value}
                maxValue={submittedData.gender === 'female' ? 55 : 50}
                status={getStatus(hdlResult)}
                label="HDL"
                unit="mg/dl"
                reverse={true}
              />
              <div className="norm-info">
                Norma: &gt; {submittedData.gender === 'female' ? '45' : '40'} mg/dl
              </div>

              <ProgressBar
                value={triglyceridesResult.value}
                maxValue={150}
                status={getStatus(triglyceridesResult)}
                label="Trójglicerydy"
                unit="mg/dl"
              />
              <div className="norm-info">
                Norma: &lt; 150 mg/dl
              </div>
            </IonCardContent>
          </IonCard>

          <div className="button-container">
            <IonButton
              expand="block"
              size="large"
              onClick={handleContinue}
              className="continue-button"
              aria-label="Przejdź do dodatkowych wskaźników"
            >
              Dalej
            </IonButton>
            <IonButton
              expand="block"
              fill="outline"
              size="large"
              onClick={handleBack}
              className="back-button"
              aria-label="Wróć i zmień dane"
            >
              Wróć i zmień dane
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NormsReportPage;
