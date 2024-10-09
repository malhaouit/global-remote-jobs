import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ConfirmEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Verifying...');
  const [requestSent, setRequestSent] = useState(false); // Track if the request was already sent

  useEffect(() => {
    if (requestSent) return; // Prevent duplicate requests

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    fetch(`http://localhost:5000/api/confirm/${token}`)
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Email confirmed successfully') {
          setStatus('Email confirmed successfully. Redirecting to login...');
        //   setTimeout(() => navigate('/login'), 3000);
          navigate('/login');
        } else {
          setStatus('Invalid or expired token.');
        }
      })
      .catch(() => setStatus('An error occurred'));

    setRequestSent(true); // Mark the request as sent
  }, [location, navigate, requestSent]);

  return (
    <div>
      <h2>{status}</h2>
    </div>
  );
};

export default ConfirmEmail;