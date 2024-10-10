import React, { useEffect, useState } from 'react';
import './Header.css';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LogoSVG from '../assets/GlobalRemoteJobs.svg';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by checking if token exists
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    // Clear the token from localStorage and update the state
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.reload();
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
      <div className='create-profile'>
        <a href='/create-profile'>Create a profile</a>
      </div>
      <div className='auth-links'>
        {isLoggedIn ? (
          <>
            <a href='/profile'>Profile</a>
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

        {/* <a href='/login'>Login</a> */}
        {/* <Link to="/login">Login</Link>
        <button className='signup-btn'>
          <Link to='/signup'>Sign Up</Link>
        </button> */}
      </div>
    </header>  
  );
};

export default Header;