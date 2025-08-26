import React, { useState } from 'react';
import './Signin.css';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';  

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${API_BASE_URL}/api/udetail?email=${encodeURIComponent(email)}`);


    if (response.ok) {
      const data = await response.json();
      if (password === data.password) {
        const fname=data.name;
        sessionStorage.setItem('key', email);
        console.log('Email stored in sessionStorage:', sessionStorage.getItem('key'));
        sessionStorage.setItem('name', fname);
        navigate('/Mainpages');
      } else {
        alert('Password does not match');
      }
    } else {
      console.error('Login failed');
      alert('User not found');
    }
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input 
            type="email" 
            id="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            placeholder="Enter your password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>

        <button type="submit">Login</button>

        <p className="signup-text">
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default Signin;
