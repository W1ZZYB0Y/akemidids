import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/home'), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="landing-container d-flex flex-column justify-content-center align-items-center">
      <img src="/jaws-logo.png" alt="Jaws Logo" className="landing-logo" />
      <h1 className="text-white mt-3">JAWS</h1>
      <a href="/terms" className="text-decoration-underline text-info mt-3">Terms & Conditions</a>
    </div>
  );
}

export default LandingPage;