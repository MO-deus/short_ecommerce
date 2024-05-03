import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect, useLocation, useNavigate } from 'react-router-dom';
import Useritem from './Useritem';

function Dashboard({ userId }) {
    const location = useLocation();
    const [itemName, setItemName] = useState('');
    const [itemDesc, setItemDesc] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemId, setItemId] = useState('');
    const uid = location.state.uid;
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        setIsLoading(true);
        // Fetch user data based on the provided userId
        axios.get(`http://localhost:5055/api/users/${uid}`)
            .then(response => {
                // Set user data in state
                // console.log(response.data);
                setUserData(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                setIsLoading(false);
            });
    }, [uid]);

    const handleAddItem = async () => {
        if (itemName.trim() !== '') {
            setIsLoading(true);
            const productCreation = await axios.post('http://localhost:5055/api/products/createproduct', { name: itemName, description: itemDesc, price: itemPrice })
                .then(response => {
                    console.log('Item id :', response.data._id);
                    setItemName('');
                    setItemId(response.data._id)
                    setIsLoading(false);
                    setError(null);
                })
                .catch(error => {
                    console.error('Error adding item:', error);
                    setError('Error adding item. Please try again later.');
                    setIsLoading(false);
                });
        }
        if (itemId != "") {
            const addItemResp = await axios.patch(`http://localhost:5055/api/users/addItem/${uid}`, { itemid: itemId })
                .then(response => {
                    console.log(response.data);
                    setItemId('');
                })
                .catch(error => {
                    console.error('Error in adding item to the current users listing')
                })
        }
    };

    console.log(uid);

    const moveToMainPage = () => {
        navigate('/', { state: { uid } });
    };

    return (
        <div>
            <h1>Dashboard</h1>
            {isLoading ? (
                <p>Loading user data...</p>
            ) : userData ? (
                <div>
                    <div class="user-info">
                        <p class="name">Name: {userData.name}</p>
                        <p class="email">Email: {userData.email}</p>
                    </div>
                    <table className='center'>
                        <tr key={'Product Table'}>
                            <th>Product name</th>
                            <th>Product Id</th>
                            <th>Delete</th>
                        </tr>
                        <h4>Listed Items</h4>
                        {userData.items.map(itemId => (
                            <Useritem userId={uid} productId={itemId} isListedItem={true} />
                        ))}
                        <h4>Favorites Items</h4>
                        {userData.favorite.map(itemId => (
                            <Useritem userId={uid} productId={itemId} isListedItem={false} />
                        ))}
                    </table>
                    {userData.isSeller == true ? (
                        <div>
                            <h2>Add Item</h2>
                            <input
                                type="text"
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)}
                                placeholder="Enter item name"
                            />
                            <input
                                type="text"
                                value={itemDesc}
                                onChange={(e) => setItemDesc(e.target.value)}
                                placeholder="Enter item description"
                            />
                            <input
                                type="text"
                                value={itemPrice}
                                onChange={(e) => setItemPrice(e.target.value)}
                                placeholder="Enter item price"
                            />
                            <button onClick={handleAddItem} disabled={isLoading}>Add</button>
                            {isLoading && <p>Adding item...</p>}
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                        </div>
                    ) : <p> </p>}
                </div>
            ) : (
                <p>No user data found for user ID: {uid}</p>
            )}
            <button onClick={moveToMainPage}>Main page</button>
        </div>
    );
}

export default Dashboard;
