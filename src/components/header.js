import React from 'react';
import './header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="profile-icon">
          <img src="/path/to/profile-icon.png" alt="Profile" />
        </div>
        <button className="logout-button">Logout</button>
      </div>
    </header>
  );
};

export default Header;