// import 'react-app-polyfill/ie11';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
// import { Thing } from '../.';


// console.log(">>>>Thing:", Thing);

const App = () => {
  return (
    <div>
     test
    </div>
  );
};

const contanier = document.getElementById('root');
if(contanier) {
  const root = createRoot(contanier);
  root.render(<App />)
}
