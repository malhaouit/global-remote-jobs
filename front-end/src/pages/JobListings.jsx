import React, { useState, useEffect } from 'react';
import JobCard from '../components/JobCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './JobListings.css';

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch(`http://localhost:5000/api/jobs/paginated?page=${currentPage}&limit=10`);
      const data = await response.json();
      setJobs(data.jobs);
      setTotalPages(data.totalPages);
    };

    fetchJobs();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Header />
      
      <div className="filters">
        {/* Job filters will go here */}
      </div>

      <section className="job-listing-section">
        <div className="job-grid">
          {jobs.map((job) => (
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
          ))}
        </div>

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
      </section>

      <Footer />
    </div>
  );
};

export default JobListings;