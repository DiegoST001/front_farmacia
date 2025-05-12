import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Asegúrate de que este archivo exista
import App from './App';  // Importa el componente App correctamente
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Si quieres empezar a medir el rendimiento de tu app, pasa una función
// para registrar los resultados (por ejemplo: reportWebVitals(console.log))
// o envíalo a un endpoint de análisis. Aprende más: https://bit.ly/CRA-vitals
reportWebVitals();
