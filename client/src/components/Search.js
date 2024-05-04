import axios from 'axios';
import React, { useState } from 'react';

const SearchBar = ({products, uid, isLoggedin}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [foundProduct, setFoundProduct] = useState(null);

  const handleAddToFavorites = (productId) => {
    console.log(productId);
    axios.patch(`http://localhost:5055/api/users/addfavorite/${uid}`, { item: productId })
      .catch(error => {
        console.error('Error adding product to favorites:', error);
      });
  };

  const handleSearch = () => {
    const found = products.find(product =>
      product.name.toLowerCase() === searchTerm.toLowerCase() || product.description.toLowerCase() === searchTerm.toLowerCase()
    );
    setFoundProduct(found);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search products by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {foundProduct ? (
        <div>
          <h2>Found Product</h2>
          <p>Name: {foundProduct.name}</p>
          <p>ID: {foundProduct._id}</p>
          {isLoggedin ? <button onClick={() => handleAddToFavorites(foundProduct._id)}>Add to Favorites</button> : <p>login to add</p>}
        </div>
      ) : (
        <p>No product found.</p>
      )}
    </div>
  );
};

export default SearchBar;
