import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import ShoppingList from './components/ShoppingList';
import CartPage from './components/CartPage';
import NavBar from './components/NavBar';
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import {AuthProvider} from "./components/AuthContext";
import {HandleDB} from "./components/HandleDB";
import About from "./components/About";
import Statistics  from "./components/Statistics";
import AdministratorExtension from "./components/AdministratorExtension";
import Feedbacks from "./components/Feedbacks";

function App(){
  return (
      <AuthProvider>
          <BrowserRouter>
              <NavBar />
              <HandleDB/>
              <Routes>
                  <Route path="/" element={<LoginForm/>} />
                  <Route path="/shop" element={<ShoppingList/>}/>
                  <Route path="/cart" element={<CartPage/>}/>
                  <Route path="/about" element={<About/>}/>
                  <Route path="/login" element={<LoginForm/>} />
                  <Route path="/registration" element={<RegistrationForm/>} />
                  <Route path="/statistics" element={<Statistics/>} />
                  <Route path="/administrator" element={<AdministratorExtension/>} />
                  <Route path="/feedbacks" element={<Feedbacks/>} />
              </Routes>
          </BrowserRouter>
      </AuthProvider>
  )
}

export default App;