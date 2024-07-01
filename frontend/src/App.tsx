import React from 'react';
import HeaderStef from './components/Header.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nazionale from './components/Nazionale.tsx';
import Regionale from './components/Regionale.tsx';
import Home from './components/home.tsx';
import FooterStef from './components/Footer.tsx';

export default function App() {
  return <>
    <Router>
      <div className='app'>
      <HeaderStef />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/nazionale" element={<Nazionale/>}/>
        <Route path="/regionale" element={<Regionale/>}/>
      </Routes>
      <FooterStef />
      </div>
    </Router>
  </>
}
