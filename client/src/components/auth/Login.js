import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [useremail, setUsermail] = useState('');
    const [userpassword, setUserpassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        const postData = {
            email : useremail,
            password : userpassword,
        }
        console.log(postData);
        try {
            const response = await fetch('http://localhost:5055/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData) ,
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            const { token } = await response.json();

            localStorage.setItem('token', token);

            // Redirect to the dashboard or another page upon successful login
            // Replace '/dashboard' with the actual path
            window.location.href = '/dashboard';
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <div>
                <label>UserEmail:</label>
                <input type="text" value={useremail} onChange={(e) => setUsermail(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={userpassword} onChange={(e) => setUserpassword(e.target.value)} />
            </div>
            <button onClick={handleLogin}>Login</button>
            {error && <div>{error}</div>}
            <div>
                Not a registered user ? <Link to = '/signup'>signup</Link>
            </div>
        </div>
    );
};

export default Login;
