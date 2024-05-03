// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from "./components/auth/Login";
import './App.css';
import Signup from './components/auth/Signup';
import Dashboard from './components/Dashboard';

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<LandingPage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
