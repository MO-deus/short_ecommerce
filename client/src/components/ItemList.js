import axios from 'axios';
import React, { useState } from 'react';
import SearchBar from './Search';

const ItemList = ({ products, isLoggedIn, userid }) => {
  const [favorites, setFavorites] = useState([]);
  const handleAddToFavorites = (productId) => {
    console.log(productId);
    axios.patch(`https://short-ecommerce-backend.vercel.app/api/users/addfavorite/${userid}`, { item: productId })
      .then(response => {
        setFavorites([...favorites, response.data]);
      })
      .catch(error => {
        console.error('Error adding product to favorites:', error);
      });
  };

  return (
    <div>
      <SearchBar products={products} uid={userid} isLoggedin={isLoggedIn}/>
      <h2>Products</h2>
      <table className="center">
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>Add to fav</th>
        </tr>
        {products.map(product => (
          <tr key={product._id}>
            <td>{product.name} </td>
            <td>${product.price}</td>
            <td>{isLoggedIn ? <button onClick={() => handleAddToFavorites(product._id)}>Add to Favorites</button> : <p>login to add</p>}</td>
          </tr>
        ))}
      </table>
      {/* {products.length > indexOfLastProduct && (
        <button onClick={nextPage}>Load More</button>
      )} */}
    </div>
  );
};

export default ItemList;
