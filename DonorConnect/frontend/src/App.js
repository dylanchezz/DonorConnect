import React from 'react';
import SignupForm from './components/SignUp_Form.js';
import LoginForm from './components/loginForm.js';


function App() {
    return (
      <div className="App">
        <h1>BloodConnect</h1>
        <SignupForm />
        <hr />
      <LoginForm /> 
      </div>
    );
  }
  
export default App;
