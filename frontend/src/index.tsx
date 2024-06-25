import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);

reportWebVitals();
