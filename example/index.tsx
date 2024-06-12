// import 'react-app-polyfill/ie11';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { PixiToolkit } from '../src/index';


const appId = 'testApp';

const App = () => {
  React.useEffect(() => {

    const initRenderApp = () => {
        const canvasDom = document.getElementById(appId) as HTMLDivElement;
        const mainApp = new PixiToolkit.MainApp({
            domElement: canvasDom,
        });
        console.log(">>>mainApp", mainApp);
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
            background: '#444444',
            width: '100%',
            height: '90vh',
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
