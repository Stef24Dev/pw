import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals.js';
import 'bootstrap/dist/css/bootstrap.min.css';

//TODO cancellare o mui o bootstrap per il design
//TODO fare un footer magari, con le mie info, git oppure bo
//TODO gestire quando una chiamata api non riesce (se no non si caricano nemmeno le pagine) --> tipo modal

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
