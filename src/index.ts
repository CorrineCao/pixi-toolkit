import MainApp from './mainApp';

const initApp = (options: { domElement: HTMLElement; doAppInitFinish: (app: MainApp) => void; } ) => {
  new MainApp(options);
}

export const PixiToolkit = {
  initApp
};