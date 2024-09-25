import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './header.css';

const Header = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    const token = Cookies.get('token');
    if (token) {
      navigate('/profile');
    } else {
      navigate('/');
    }
  };

  const handleHomeClick = () => {
    const token = Cookies.get('token');
    if (token) {
      navigate('/home');
    } else {
      navigate('/');
    }
  };

  const handleLogoutClick = () => {
    Cookies.remove('token'); // Remove the token cookie
    navigate('/'); // Navigate to the sign-up page
  };

  return (
    <header className="header">
      <div className="header-content">
        <button className="home-button" onClick={handleHomeClick}>Home</button>
        <button className="profile-button" onClick={handleProfileClick}>Profile</button>
        <button className="logout-button" onClick={handleLogoutClick}>Logout</button>
      </div>
    </header>
  );
};

export default Header;