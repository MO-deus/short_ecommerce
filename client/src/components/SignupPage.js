// SignupPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const [error, setError] = useState('');
  const history = useNavigate ();

  const handleSignup = (e) => {
    e.preventDefault();
    // Perform form validation
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    // Perform signup logic (e.g., call backend API)
    // Redirect to dashboard after successful signup
    history.push('/dashboard');
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>
          Are you a seller?
          <input
            type="checkbox"
            checked={isSeller}
            onChange={(e) => setIsSeller(e.target.checked)}
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
      <div>
      <h1>Login Page</h1>
      <button onClick={handleSignup}>Login</button>
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
    </div>
  );
};

export default SignupPage;
