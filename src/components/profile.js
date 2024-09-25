import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './profile.css';

const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    gender: '',
    phoneNumber: '',
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = Cookies.get('token');
        const response = await axios.get('https://todolistfullstackbackend.onrender.com/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSave = async () => {
    try {
      const token = Cookies.get('token');
      await axios.put('https://todolistfullstackbackend.onrender.com/profile', userDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEditMode(false);
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <div className="profile-details">
        {editMode ? (
          <>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={userDetails.username}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Gender:</label>
              <input
                type="text"
                name="gender"
                value={userDetails.gender}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Phone Number:</label>
              <input
                type="text"
                name="phoneNumber"
                value={userDetails.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <button className="save-button" onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            <p><strong>Username:</strong> {userDetails.username}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>Gender:</strong> {userDetails.gender}</p>
            <p><strong>Phone Number:</strong> {userDetails.phoneNumber}</p>
            <button className="edit-button" onClick={() => setEditMode(true)}>Edit</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;