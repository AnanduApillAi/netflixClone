import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App/App'
import reportWebVitals from './reportWebVitals';
import ValuesContext from './contexts/ValuesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <ValuesContext>
  <App></App>
  </ValuesContext>
);

reportWebVitals();
