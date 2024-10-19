import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateSeekerProfile.css';
import { FaArrowLeft } from 'react-icons/fa';

const CreateSeekerProfile = () => {
  const [formData, setFormData] = useState({
    bio: '',
    skills: '',
    experience: '',
    education: '',
    contactInfo: {
      email: '',
      phone: '',
      linkedin: ''
    },
    profileImage: null // New state to hold the image file
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  // Handle changes for form inputs
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

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem('token');
    const formDataObj = new FormData();

    // Append form fields
    formDataObj.append('bio', formData.bio);
    formDataObj.append('skills', formData.skills);
    formDataObj.append('experience', formData.experience);
    formDataObj.append('education', formData.education);
    // Append contactInfo fields to FormData
    formDataObj.append('contactInfo[email]', formData.contactInfo.email);
    formDataObj.append('contactInfo[phone]', formData.contactInfo.phone);
    formDataObj.append('contactInfo[linkedin]', formData.contactInfo.linkedin);

    // Append the profile image
    if (formData.profileImage) {
      formDataObj.append('profileImage', formData.profileImage);
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/profile/seeker`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataObj // Send FormData with the file
      });

      if (response.ok) {
        // Navigate to success page or reload page
        navigate('/profile');
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
      <button className="back-btn" onClick={handleBack}>
        <FaArrowLeft className="back-icon" />
      </button>
      <h2>Create Job Seeker Profile</h2>
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

        <button type="submit" disabled={isSubmitting}>Create Profile</button>
      </form>
    </div>
  );
};

export default CreateSeekerProfile;