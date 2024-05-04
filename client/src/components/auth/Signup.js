import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const history = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        isSeller: false
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://short-ecommerce-backend.vercel.app/api/users/addUsers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to signup');
            }

            const responseData = await response.json();
            localStorage.setItem('token', responseData.data.token);
            const uid = responseData.data.uid;
            history(`/dashboard`, {state : {uid}});
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <div>
                    <label>
                        Are you a seller?
                        <input type="checkbox" name="isSeller" checked={formData.isSeller} onChange={handleChange} />
                    </label>
                </div>
                <button type="submit">Signup</button>
            </form>
            {error && <div>{error}</div>}
            <div>Already registered ? <Link to='/login'> Login </Link> </div>
        </div>
    );
};

export default Signup;