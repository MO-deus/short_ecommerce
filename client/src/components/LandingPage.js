// components/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = ({ isLoggedIn }) => {
  return (
    <div>
      <h1>Welcome to the Landing Page</h1>
      {isLoggedIn ? (
        <Link to="/profile">Go to Profile</Link>
      ) : (
        <Link to="/login">Login</Link>
      )}
      <input type="text" placeholder="Search Items" />
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        <li>Item 4</li>
        <li>Item 5</li>
      </ul>
    </div>
  );
}

export default LandingPage;
