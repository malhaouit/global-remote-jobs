import React from 'react';
import './Header.css';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LogoSVG from '../assets/GlobalRemoteJobs.svg';

const Header = () => {
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
        {/* <a href='/login'>Login</a> */}
        <Link to="/login">Login</Link>
        <button className='signup-btn'>
          <Link to='/signup'>Sign Up</Link>
        </button>
      </div>
    </header>  
  );
};

export default Header;