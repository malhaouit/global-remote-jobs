import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [basicInfo, setBasicInfo] = useState({ firstName: '', lastName: '', email: '' });

  const role = localStorage.getItem('role');

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch(`${import.meta.env.VITE_API_URL}/profile`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Profile not found') {
          setBasicInfo({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
          });
        } else {
          setProfile(data);
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Error fetching profile');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!profile) {
    return (
      <div className="profile-page">
        {role === 'job_seeker' ? (
          <>
            <h1>{`${basicInfo.firstName} ${basicInfo.lastName}`}</h1>
            <img src="/default-avatar.svg" alt="Default Avatar" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
            <p>{`${basicInfo.email}`}</p>
            <p>Complete your profile from here</p>
            <Link to='/create-profile/seeker'>
              <button>Complete Profile</button>
            </Link>
          </>
        ) : role === 'company' ? (
          <>
            <h1>{`${basicInfo.firstName} ${basicInfo.lastName}`}</h1>
            <img src="/default-company-logo.svg" alt="Default Company Logo" style={{ width: '150px', height: '150px' }} />
            <p>{`${basicInfo.email}`}</p>
            <p>Complete your profile from here</p>
            <Link to='/create-profile/company'>
              <button>Complete Profile</button>
            </Link>
          </>
        ) : null}
      </div>
    );
  }

  const baseUrl = process.env.REACT_APP_API_URL;

  const imageUrl = profile.profileImage 
    ? `${baseUrl}/${profile.profileImage}` 
    : profile.companyLogo 
    ? `${baseUrl}/${profile.companyLogo}` 
    : '';

  return (
    <div className="profile-container"> {/* Add the profile-container wrapper */}
      {role === 'job_seeker' ? (
        <div className="profile-page">
          <h1>{profile.user.firstName} {profile.user.lastName}</h1>

          {/* Profile Image */}
          {imageUrl && <img src={imageUrl} alt="Profile" />}

          {/* Left-aligned Profile Information */}
          <div className="profile-details">
            <p><strong>Bio:</strong> {profile.bio}</p>
            <p><strong>Skills:</strong> {profile.skills}</p>
            <p><strong>Experience:</strong> {profile.experience}</p>
            <p><strong>Education:</strong> {profile.education}</p>
            <p><strong>Email:</strong> {profile.contactInfo.email}</p>
            <p><strong>Phone:</strong> {profile.contactInfo.phone}</p>
            <p><strong>LinkedIn:</strong> <a href={profile.contactInfo.linkedin}>{profile.contactInfo.linkedin}</a></p>
          </div>

          <button>Edit Job Seeker Profile</button>
        </div>
      ) : role === 'company' ? (
        <div className="profile-page">
          <h1>{profile.companyName}</h1>

          {/* Company Logo */}
          {imageUrl && <img src={imageUrl} alt="Company Logo" />}

          {/* Left-aligned Profile Information */}
          <div className="profile-details">
            <p><strong>Description:</strong> {profile.description}</p>
            <p><strong>Industry:</strong> {profile.industry}</p>
            <p><strong>Company Size:</strong> {profile.companySize}</p>
            <p><strong>Website:</strong> <a href={profile.website}>{profile.website}</a></p>
            <p><strong>Phone:</strong> {profile.contactInfo.phone}</p>
            <p><strong>LinkedIn:</strong> <a href={profile.contactInfo.linkedin}>{profile.contactInfo.linkedin}</a></p>
          </div>

          <button>Edit Company Profile</button>
        </div>
      ) : (
        <div>Invalid profile data</div>
      )}
    </div>
  );
};

export default Profile;