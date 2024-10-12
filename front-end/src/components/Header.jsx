import React, { useEffect, useState } from 'react';
import './Header.css';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import LogoSVG from '../assets/GlobalRemoteJobs.svg';
import Modal from './Modal';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileExists, setProfileExists] = useState(false);  // To track profile existence
  const [userRole, setUserRole] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if the user is logged in by checking if token exists
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token && role) {
      setIsLoggedIn(true);
      setUserRole(role);

      // Fetch profile info if logged in
      fetch(`http://localhost:5000/api/profile/${role}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.profile) {
            setProfileExists(true);
          }
        });
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    window.location.reload();
  };

  const handleProfileClick = () => {
    // Show modal if user is not logged in
    if (!isLoggedIn) {
      setShowModal(true);
    }
  };

  const handleConfirmLogin = () => {
    setShowModal(false);
    navigate('/login'); // Navigate to login if confirmed
  };

  return (
    <header>
      <div className='logo'>
        <Link to={'/'}>
          <img src={LogoSVG} alt='GlobalRemoteJobs Logo' />
        </Link>
      </div>
      <div className='search-bar'>
        <input type='text' placeholder='Search for jobs...' />
        <button className='search-btn'>
          <FaSearch />
        </button>
      </div>

      {/* Find My Job Button */}
      <div className='find-my-job'>
        <Link to='/find-my-job'>Find My Job</Link>
      </div>

      <div className='create-profile'>
        {isLoggedIn ? (
          // User is logged in, now check profile and role
          profileExists ? (
            userRole === 'job_seeker' ? (
              <Link to='/modify-profile/seeker'>Modify Profile</Link>
            ) : (
              <Link to='/modify-profile/company'>Modify Profile</Link>
            )
          ) : (
            userRole === 'job_seeker' ? (
              <Link to='/create-profile/seeker'>Create Profile</Link>
            ) : (
              <Link to='/create-profile/company'>Create Profile</Link>
            )
          )
        ) : (
          <Link onClick={handleProfileClick}>
            Create Profile
          </Link>
        )}
      </div>
      <div className='auth-links'>
        {isLoggedIn ? (
          <>
            <Link to='/profile'>Profile</Link>
            <button className='logout-btn' onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <button className='signup-btn'>
              <Link to='/signup'>Sign Up</Link>
            </button>
          </>
        )}
      </div>

      {/* Modal component to ask for login */}
      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onConfirm={handleConfirmLogin}
      />
    </header>  
  );
};

export default Header;