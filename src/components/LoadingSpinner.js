import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
// Import your logo image - adjust the path and filename as needed
import simaccLogo from '../assets/simacc-logo.jpg'; // <-- Update this line

function LoadingSpinner() {
  return (
    // Use flexbox to center the content both horizontally and vertically
    // Add flex-column to stack items vertically, or remove for horizontal
    <div className="d-flex flex-column justify-content-center align-items-center mt-3">
       <p className="text-muted mb-2">Just a sec...</p> 
      {/* Add your logo image */}
      <img
        src={simaccLogo}
        alt="SimAcc Portal Logo"
        style={{ width: '50px', height: '50px', marginBottom: '15px' }} // Adjust size and spacing as needed
      />

      {/* The Bootstrap Spinner */}
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default LoadingSpinner;