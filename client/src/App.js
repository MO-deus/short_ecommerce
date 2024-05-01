// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from "./components/auth/Login";
import UserProfile from './components/Userprofile';
import './App.css';
import Signup from './components/auth/Signup';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<LandingPage />} isLoggedIn={isLoggedIn} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path='/profile' element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
