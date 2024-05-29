import React from 'react';
import HeaderStef from './components/header.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nazionale from './components/nazionale.tsx';
import Regionale from './components/regionale.tsx';
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
