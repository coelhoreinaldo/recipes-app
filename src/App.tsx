import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';

function App() {
  return (
    <Routes>
      <Route path="/meals" element={ <Meals /> } />
      <Route path="/" element={ <Login /> } />
    </Routes>
  );
}

export default App;
