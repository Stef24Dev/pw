import React from 'react';
import HeaderStef from './components/header.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nazionale from './components/nazionale.tsx';
import Regionale from './components/regionale.tsx';
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
