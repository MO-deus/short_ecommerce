import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const history = useNavigate();

    const [useremail, setUsermail] = useState('');
    const [userpassword, setUserpassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState('');
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

            const responseData = await response.json();
            localStorage.setItem('token', responseData.data.token);
            setIsLoggedIn(true);
            
            history(`/dashboard/${responseData.data.uid}`);

        } catch (error) {
            setError(error.message);
        }
    };

    const handleLogout = () => {
        // handle logout logic
        setIsLoggedIn(false);
        localStorage.removeItem('token'); 
        window.location.href = '/';
    }

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
            <button onClick={handleLogout}>Logout</button>
            {error && <div>{error}</div>}
            <div>
                Not a registered user ? <Link to = '/signup'>signup</Link>
            </div>
        </div>
    );
};

export default Login;
