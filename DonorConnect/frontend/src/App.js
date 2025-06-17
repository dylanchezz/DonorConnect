// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupForm from './components/SignUp_Form';
import LoginForm from './components/loginForm';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>BloodConnect</h1>
        <Routes>
          <Route path="/" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
