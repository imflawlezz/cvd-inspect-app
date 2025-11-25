import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { AppProvider } from './context/AppContext';
import FormPage from './pages/FormPage';
import NormsReportPage from './pages/NormsReportPage';
import AdditionalIndicatorsPage from './pages/AdditionalIndicatorsPage';
import ProtectedRoute from './components/ProtectedRoute';

import '@ionic/react/css/core.css';

import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import '@ionic/react/css/palettes/dark.system.css';

import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <AppProvider>
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/">
            <FormPage />
          </Route>
          <Route exact path="/norms-report">
            <ProtectedRoute>
              <NormsReportPage />
            </ProtectedRoute>
          </Route>
          <Route exact path="/additional-indicators">
            <ProtectedRoute>
              <AdditionalIndicatorsPage />
            </ProtectedRoute>
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </AppProvider>
);

export default App;
