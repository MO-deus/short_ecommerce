import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState('');
  const [error, setError] = useState(null);
  const location = useLocation();
  const userid = location.state && location.state.uid

  useEffect(() => {
    // Fetch product data from API
    axios.get('http://localhost:5055/api/products/getallproducts')
      .then(response => {
        // Set product data in state
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
    // handle logout logic
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    window.location.href = '/';
}

  const handleAddToFavorites = (productId) => {
    console.log(productId);
    axios.patch(`http://localhost:5055/api/users/addfavorite/${userid}`, { item : productId })
      .then(response => {
        // Update favorites list in state
        setFavorites([...favorites, response.data]);
      })
      .catch(error => {
        console.error('Error adding product to favorites:', error);
      });
  };

  return (
    <div>
      <h1>Welcome to the Landing Page</h1>
      {isLoggedIn ?  <button onClick={handleLogout}>Logout</button> : <Link to="/login">Login</Link>}
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {products.map(product => (
            <li key={product._id}>
              <h3>{product.name}</h3>
              Price: ${product.price} <br/>
              Description: {product.description} <br/>
              {isLoggedIn ? <button onClick={() => handleAddToFavorites(product._id)}>Add to Favorites</button> : <p>login to add the item to the favorite</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductList;
