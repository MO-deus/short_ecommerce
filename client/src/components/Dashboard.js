import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UNSAFE_ErrorResponseImpl, useParams } from 'react-router-dom';

function Dashboard({ userId }) {
    const [itemName, setItemName] = useState('');
    const [itemDesc, setItemDesc] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemId, setItemId] = useState('');
    const { uid } = useParams();
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

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
                    // Item added successfully
                    console.log('Item id :', response.data._id);
                    // console.log(uid);
                    // Clear the input field
                    setItemName('');
                    setItemId(response.data._id)
                    setIsLoading(false);
                    setError(null);
                })
                .catch(error => {
                    // Error occurred while adding item
                    console.error('Error adding item:', error);
                    setError('Error adding item. Please try again later.');
                    setIsLoading(false);
                });
        }
        if (itemId != "") {
            // setIsLoading(true);
            const addItemResp = await  axios.patch(`http://localhost:5055/api/users/addItem/${uid}`, { itemid: itemId })
                .then(response => {
                    console.log(response.data);
                    setItemId('');
                    // setIsLoading(false);
                })
                .catch(error => {
                    console.error('Error in adding item to the current users listing')
                    // setIsLoading(false);
                })
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>
            {isLoading ? (
                <p>Loading user data...</p>
            ) : userData ? (
                <div>
                    <p>User ID: {userData._id}</p>
                    <p>User Name: {userData.name}</p>
                    <p>User Email: {userData.email}</p>
                    <p>items: {userData.items}</p>
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
        </div>
    );
}

export default Dashboard;
