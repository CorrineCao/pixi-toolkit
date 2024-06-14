// import 'react-app-polyfill/ie11';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { PixiToolkit } from '../src/index';
import CommonApp from '../src/mainApp/commonApp';


const appId = 'testApp';

const App = () => {
  React.useEffect(() => {

    const doAppInitFinish = (app: CommonApp) => {
      console.log(">>>app", app);
      app.getCommonApi()?.addUnitList("elements");
    }
    
    const initRenderApp = () => {
        const canvasDom = document.getElementById(appId) as HTMLDivElement;
        PixiToolkit.initApp({
            domElement: canvasDom,
            doAppInitFinish
        });
      };
      initRenderApp();
}, []);

  return (
    <div>
      <div
          id={appId}
          style={{
            padding: 0,
            margin: 0,
            background: '#191B24',
            width: '100vw',
            height: '100vh',
          }}
        />
    </div>
  );
};

const contanier = document.getElementById('root');
if(contanier) {
  const root = createRoot(contanier);
  root.render(<App />)
}
