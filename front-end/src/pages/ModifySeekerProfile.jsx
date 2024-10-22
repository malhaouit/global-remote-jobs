import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './ModifySeekerProfile.css';
import { FaHome, FaUser, FaEnvelope } from 'react-icons/fa';

const ModifySeekerProfile = () => {
  const [formData, setFormData] = useState({
    bio: '',
    skills: '',
    experience: '',
    education: '',
    contactInfo: { email: '', phone: '', linkedin: '' },
    profileImage: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/profile`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();

        setFormData({
          bio: data.bio,
          skills: data.skills.join(', '),
          experience: data.experience,
          education: data.education,
          contactInfo: data.contactInfo,
          profileImage: null
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.contactInfo) {
      setFormData({
        ...formData,
        contactInfo: { ...formData.contactInfo, [name]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    setIsSubmitting(true);
    const token = localStorage.getItem('token');
    const formDataObj = new FormData();

    formDataObj.append('bio', formData.bio);
    formDataObj.append('skills', formData.skills);
    formDataObj.append('experience', formData.experience);
    formDataObj.append('education', formData.education);
    formDataObj.append('contactInfo[email]', formData.contactInfo.email);
    formDataObj.append('contactInfo[phone]', formData.contactInfo.phone);
    formDataObj.append('contactInfo[linkedin]', formData.contactInfo.linkedin);

    if (formData.profileImage) {
      formDataObj.append('profileImage', formData.profileImage);
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/profile/seeker`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formDataObj
      });

      if (response.ok) {
        setSuccessMessage('Profile updated succesfully!');
      } else {
        setErrorMessage('Failed to update profile, please try again later!')
        console.error('Failed to update profile:', response.statusText);
      }
    } catch (error) {
      setErrorMessage('Error updating profile, please try again later!');
      console.error('Error updating profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className='modify-seeker-container'>
      <div className='navigation'>
        <Link to="/" className="nav-icon">
          <FaHome />
          <span>Home</span>
        </Link>
        <Link to="/profile" className="nav-icon">
          <FaUser />
          <span>Profile</span>
        </Link>
        <Link to="/contact" className="nav-icon">
          <FaEnvelope />
          <span>Contact Us</span>
        </Link>
      </div>

      <div className="form">
        <h2>Update Job Seeker Profile</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Bio:
            <textarea name="bio" value={formData.bio} onChange={handleChange} required />
          </label>
          <label>
            Skills:
            <input type="text" name="skills" value={formData.skills} onChange={handleChange} required />
          </label>
          <label>
            Experience:
            <textarea name="experience" value={formData.experience} onChange={handleChange} required />
          </label>
          <label>
            Education:
            <textarea name="education" value={formData.education} onChange={handleChange} required />
          </label>

          <h3>Contact Information</h3>
          <label>
            Email:
            <input type="email" name="email" value={formData.contactInfo.email} onChange={handleChange} required />
          </label>
          <label>
            Phone:
            <input type="tel" name="phone" value={formData.contactInfo.phone} onChange={handleChange} required />
          </label>
          <label>
            LinkedIn:
            <input type="url" name="linkedin" value={formData.contactInfo.linkedin} onChange={handleChange} />
          </label>

          <label>
            Profile Image:
            <input type="file" name="profileImage" onChange={handleFileChange} />
          </label>

          {errorMessage && <p className='error'>{errorMessage}</p>}
          {successMessage && <p className='success'>{successMessage}</p>}

          <button type="submit" disabled={isSubmitting}>Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default ModifySeekerProfile;