import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ItemList from './ItemList';

function LandingPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const uid = location.state && location.state.uid

  useEffect(() => {
    axios.get('http://localhost:5055/api/products/getallproducts')
      .then(response => {
        setProducts(response.data);
        setIsLoading(false);
        setError(null);
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
        setError('Error fetching product data. Please try again later.');
        setIsLoading(false);
      });
    setIsLoggedIn(localStorage.getItem('token'));
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    window.location.href = '/';
  }

  const moveToDashboard = () => {
    navigate('/dashboard', { state: { uid }});
  }

  return (
    <div>
      <h1>Welcome to the Landing Page</h1>
      {isLoggedIn ? <>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={moveToDashboard}>Dashboard</button></>
        : <Link to="/login"><button>Login</button></Link>}
      <Link to='/signup'><button>signup</button></Link>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ItemList products={products} isLoggedIn={isLoggedIn} userid={uid} />

      )}
    </div>
  );
}

export default LandingPage;
