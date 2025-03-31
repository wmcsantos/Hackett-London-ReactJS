import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import Header from './components/Header.tsx';
import Homepage from './components/Homepage.tsx';
import Products from './components/Products.tsx';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Homepage /> } />
        <Route path='/view-all/:category' element={<Products /> } />
        <Route path='/:category/:subcategory' element={<Products /> } />
      </Routes>
    </Router>
  );
}

export default App;
