import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShoppingList from './components/ShoppingList';
import CartPage from './components/CartPage';
import NavBar from './components/NavBar';
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import { AuthProvider } from "./components/AuthContext";
import { HandleDB } from "./components/HandleDB";
import About from "./components/About";
import Statistics from "./components/Statistics";
import AdministratorExtension from "./components/AdministratorExtension";
import Feedbacks from "./components/Feedbacks";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-100 text-slate-900">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            Skip to main content
          </a>
          <NavBar />
          <HandleDB />
          <main
            id="main-content"
            tabIndex={-1}
            className="max-w-6xl mx-auto px-4 py-6 focus:outline-none"
          >
            <Routes>
              <Route path="/" element={<LoginForm />} />
              <Route path="/shop" element={<ShoppingList />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/registration" element={<RegistrationForm />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/administrator" element={<AdministratorExtension />} />
              <Route path="/feedbacks" element={<Feedbacks />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;