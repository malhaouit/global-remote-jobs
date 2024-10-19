import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateCompanyProfile.css';
import { FaArrowLeft } from 'react-icons/fa';

const CreateCompanyProfile = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    description: '', // renamed from companyBio
    industry: '',
    companySize: '', // added missing companySize
    website: '',
    contactInfo: {
      email: '',
      phone: '',
      linkedin: '',
    },
    companyLogo: null // New state to hold the image file
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.contactInfo) {
      setFormData({
        ...formData,
        contactInfo: {
          ...formData.contactInfo,
          [name]: value,
        }
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

    // Append the company logo if available
    if (formData.companyLogo) {
      formDataObj.append('companyLogo', formData.companyLogo);
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/profile/company`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataObj // Send formData
      });

      if (response.ok) {
        navigate('/profile'); // Redirect to success page after profile creation
      } else {
        console.error('Failed to create profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-profile-form">
      <buuton className='back-btn' onClick={handleBack}>
        <FaArrowLeft className='back-icon' />
      </buuton>
      <h2>Create Company Profile</h2>
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
          Company Description:
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

        <button type="submit" disabled={isSubmitting}>Create Profile</button>
      </form>
    </div>
  );
};

export default CreateCompanyProfile;