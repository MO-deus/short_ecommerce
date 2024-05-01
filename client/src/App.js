// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import UserProfile from './components/Userprofile';
import './App.css';
import SignupPage from './components/SignupPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<LandingPage />} isLoggedIn={isLoggedIn} />
          <Route path='/login' element={<LoginPage />} setIsLoggedIn={setIsLoggedIn} />
          <Route path='signup' element={<SignupPage />} />
          <Route path='/profile' element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
