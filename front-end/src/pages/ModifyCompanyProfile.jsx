import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './ModifyCompanyProfile.css';
import { FaHome, FaUser, FaEnvelope } from 'react-icons/fa';

const ModifyCompanyProfile = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    description: '',
    industry: '',
    companySize: '',
    website: '',
    contactInfo: { email: '', phone: '', linkedin: '' },
    companyLogo: null
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
          companyName: data.companyName,
          description: data.description,
          industry: data.industry,
          companySize: data.companySize,
          website: data.website,
          contactInfo: data.contactInfo,
          companyLogo: null // For updating the logo
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
    setFormData({ ...formData, companyLogo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    setIsSubmitting(true);
    const token = localStorage.getItem('token');
    const formDataObj = new FormData();

    formDataObj.append('companyName', formData.companyName);
    formDataObj.append('description', formData.description);
    formDataObj.append('industry', formData.industry);
    formDataObj.append('companySize', formData.companySize);
    formDataObj.append('website', formData.website);
    formDataObj.append('contactInfo[email]', formData.contactInfo.email);
    formDataObj.append('contactInfo[phone]', formData.contactInfo.phone);
    formDataObj.append('contactInfo[linkedin]', formData.contactInfo.linkedin);

    if (formData.companyLogo) {
      formDataObj.append('companyLogo', formData.companyLogo);
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/profile/company`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formDataObj
      });

      if (response.ok) {
        setSuccessMessage('Profile updated succesfully!');
      } else {
        setErrorMessage('Failed to update profile, please try again later!');
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
    <div className='modify-company-container'>
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
        <h2>Update Company Profile</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Company Name:
            <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required />
          </label>
          <label>
            Industry:
            <input type="text" name="industry" value={formData.industry} onChange={handleChange} required />
          </label>
          <label>
            Company Size:
            <input type="text" name="companySize" value={formData.companySize} onChange={handleChange} />
          </label>
          <label>
            Description:
            <textarea name="description" value={formData.description} onChange={handleChange} required />
          </label>
          <label>
            Website:
            <input type="url" name="website" value={formData.website} onChange={handleChange} required />
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
            Company Logo:
            <input type="file" name="companyLogo" onChange={handleFileChange} />
          </label>

          {errorMessage && <p className='error'>{errorMessage}</p>}
          {successMessage && <p className='success'>{successMessage}</p>}

          <button type="submit" disabled={isSubmitting}>Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default ModifyCompanyProfile;