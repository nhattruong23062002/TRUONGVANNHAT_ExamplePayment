import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import CreditCardPage from './pages/createCardPage'; 
import HomePage from './pages/homePage'; 

function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/credit-card" element={<CreditCardPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
