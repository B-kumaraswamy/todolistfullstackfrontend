import React, { useState } from 'react';
import axios from 'axios';
import Cookie from 'js-cookie';
import { Navigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/login', formData);
      console.log('Response:', response);
      setResponseMessage(response.data.message);

      if (response.data.token) {
        console.log('Successful login');
        Cookie.set('token', response.data.token);
        setRedirect(true);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setResponseMessage('Login failed. Please try again.');
    }
  };

  if (redirect) {
    console.log('Redirecting to /home');
    return <Navigate to="/home"/>;
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
      <p>{responseMessage}</p>
    </div>
  );
};

export default Login;