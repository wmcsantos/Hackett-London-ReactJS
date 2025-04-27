import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { UserProvider } from './context/UserContext.tsx'
import './App.css';
import Header from './components/Header.tsx';
import Homepage from './components/Homepage.tsx';
import Products from './components/Products.tsx';
import ProductDetail from './components/ProductDetail.tsx';
import Login from './components/Login.tsx';
import Account from './components/Account.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import Orders from './components/Orders.tsx';
import { CartProvider } from './context/CartContext.tsx';

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
            <Header />
            <Routes>
              <Route path='/' element={<Homepage /> } />
              <Route path='/view-all/:category' element={<Products /> } />
              <Route path='/:category/:subcategory' element={<Products /> } />
              <Route path='/:productId' element={<ProductDetail /> } />
              <Route path='/login' element={
                <ProtectedRoute redirectIfAuthenticated={true}>
                  <Login /> 
                </ProtectedRoute>
              } />
              <Route path='/account' element={
                <ProtectedRoute>
                  <Account /> 
                </ProtectedRoute>
              } />
              <Route path='/orders' element={
                <ProtectedRoute>
                  <Orders /> 
                </ProtectedRoute>
              } />
            </Routes>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
