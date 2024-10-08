import React, { useState, useEffect } from 'react';
import Filters from '../components/Filters';
import JobCard from '../components/JobCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './JobListings.css';

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true); // Set loading to true before fetching jobs
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: 10,
        ...filters,
      }).toString();

      const response = await fetch(`http://localhost:5000/api/jobs/paginated?${queryParams}`);
      const data = await response.json();
      setJobs(data.jobs);
      setTotalPages(data.totalPages);
      setLoading(false); // Set loading to false after jobs are fetched
    };

    fetchJobs();
  }, [currentPage, filters]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <div className='job-listing-page'>
      <Header />

      <Filters onFilterChange={handleFilterChange} />

      <section className="job-listing-section">
        {/* Display a loading message or spinner while jobs are being fetched */}
        {loading && (
          <div className='loading-message'>
            <p>Loading jobs, please wait...</p>
          </div>
        )}

        {/* Display the no jobs message if no jobs are found */}
        {!loading && jobs.length === 0 && (
          <div className="no-jobs-message">
            <p>Sorry, no jobs found matching your criteria. Try adjusting your filters or check back later for new listings.</p>
          </div>
        )}

        {/* Job Grid */}
        <div className="job-grid">
          {!loading && jobs.length > 0 &&
            jobs.map((job) => (
              <JobCard
                key={job.id}
                id={job.id}
                title={job.title}
                company={job.company_name}
                logo={job.company_logo}
                location={job.candidate_required_location}
                salary={job.salary ? job.salary : 'Salary not provided'}
                job_type={job.job_type}
                posted_date={job.publication_date}
              />
            ))
          }
        </div>

        {/* Pagination */}
        {!loading && jobs.length > 0 && (
          <div className="pagination">
            {/* Previous button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {/*  Page numbers */}
            {Array.from({ length: totalPages}, (_, index) => {
              if (
                index + 1 === currentPage ||
                index + 1 === currentPage - 1 ||
                index + 1 === currentPage + 1 ||
                index + 1 === 1 ||
                index + 1 === totalPages
              ) {
                return (
                  <button
                    key={index}
                    className={currentPage === index + 1 ? 'active': ''}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                );
              } else if (index + 1 === currentPage - 2 || index + 1 === currentPage + 2) {
                return <span key={index}>...</span>;
              }
              return null;
            })}

            {/* Next button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default JobListings;