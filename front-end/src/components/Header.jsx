import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './Header.css';
import { FaSearch, FaSpinner } from 'react-icons/fa';  // Import spinner icon
import { Link, useNavigate } from 'react-router-dom';
import LogoSVG from '../assets/GlobalRemoteJobs.svg';
import Modal from './Modal';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileExists, setProfileExists] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token && role) {
      setIsLoggedIn(true);
      setUserRole(role);

      fetch(`http://localhost:5000/api/profile/${role}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.profile) setProfileExists(true);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.length > 2) fetchJobSuggestions();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const fetchJobSuggestions = async () => {
    setIsSearching(true);
    try {
      const response = await axios.get(
        `https://remotive.com/api/remote-jobs?search=${searchQuery}`
      );

      const filteredJobs = response.data.jobs.filter((job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Store both job title and job id
      setSuggestions(filteredJobs.map((job) => ({
        title: job.title,
        id: job.id
      })));
    } catch (error) {
      console.error('Error fetching job suggestions:', error);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef]);

  const handleSearch = () => {
    if (suggestions.length > 0) {
      navigate(`/job/${suggestions[0].id}`);  // Navigate to the first job in the suggestions
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    window.location.reload();
  };

  const handleProfileClick = () => {
    if (!isLoggedIn) setShowModal(true);
  };

  const handleConfirmLogin = () => {
    setShowModal(false);
    navigate('/login');
  };

  return (
    <header>
      <div className='logo'>
        <Link to='/'>
          <img src={LogoSVG} alt='GlobalRemoteJobs Logo' />
        </Link>
      </div>

      <div className='search-bar' ref={searchRef}>
        <input
          type='text'
          placeholder='Search for jobs by title...'
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className='search-btn' onClick={handleSearch}>
          {isSearching ? (
            <FaSpinner className='search-spinner' />  // Spinner replaces search icon
          ) : (
            <FaSearch />
          )}
        </button>

        {suggestions.length > 0 && (
          <ul className='suggestions-list'>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => {
                  setSearchQuery(suggestion.title);
                  setSuggestions([]);
                  navigate(`/job/${suggestion.id}`);  // Navigate on selection
                }}
              >
                {suggestion.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className='find-my-job'>
        <Link to='/find-my-job'>Find My Job</Link>
      </div>

      <div className='create-profile'>
        {isLoggedIn ? (
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
          <Link onClick={handleProfileClick}>Create Profile</Link>
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

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmLogin}
      />
    </header>
  );
};

export default Header;