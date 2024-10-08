import React, { useState } from "react";
import './Filters.css';

const Filters = ({ onFilterChange }) => {
  const [jobType, setJobType] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState(''); // Predefined category
  const [customCategory, setCustomCategory] = useState(''); // Custom category
  const [isCustomCategoryEnabled, setIsCustomCategoryEnabled] = useState(true); // Track if the custom input is enabled

  const categories = [
    "Software Development",
    "Finance / Legal",
    "Product",
    "Marketing",
    "DevOps / Sysadmin",
    "Human Resources",
    "Project Management",
    "Sales / Business",
    "Writing",
    "Data Analysis",
    "Design",
    "Customer Service",
    "All others",
  ];

  const handleFilterChange = () => {
    onFilterChange({
      job_type: jobType,
      location,
      category: category,
      custom_category: isCustomCategoryEnabled ? customCategory : '',
    });
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    // Disable and clear the custom category input if a valid category is selected
    if (selectedCategory !== "") {
      setCustomCategory(""); // Clear custom category input
      setIsCustomCategoryEnabled(false); // Disable the custom input
    } else {
      setIsCustomCategoryEnabled(true); // Enable custom category input
    }
  };

  return (
    <div className="filters">
      {/* Job Type Dropdown */}
      <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
        <option value="">All Types</option>
        <option value="full_time">Full-time</option>
        <option value="part_time">Part-time</option>
        <option value="freelance">Freelance</option>
        <option value="contract">Contract</option>
      </select>

      {/* Location Input */}
      <input
        type="text"
        placeholder="Country"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      {/* Category Dropdown */}
      <select value={category} onChange={handleCategoryChange}>
        <option value="">Select Category</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Custom Category Input */}
      <input
        type="text"
        placeholder="Enter a custom category"
        value={customCategory}
        onChange={(e) => setCustomCategory(e.target.value)}
        disabled={!isCustomCategoryEnabled} /* Disable if category selected */
      />

      <button onClick={handleFilterChange}>Apply Filters</button>
    </div>
  );
};

export default Filters;