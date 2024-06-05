import React from 'react';
import HeaderStef from './components/Header.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nazionale from './components/Nazionale.tsx';
import Regionale from './components/Regionale.tsx';
import Home from './components/home.tsx';

export default function App() {
  return <>
    <Router>
      <HeaderStef />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/nazionale" element={<Nazionale/>}/>
        <Route path="/regionale" element={<Regionale/>}/>
      </Routes>
    </Router>
  </>
}
