import React, { useState } from 'react';
// Import Bootstrap components
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// Import the reusable feedback components
import ErrorMessage from '../components/ErrorMessage';
import SuccessMessage from '../components/SuccessMessage';
import LoadingSpinner from '../components/LoadingSpinner';

// Import useNavigate from react-router-dom for redirection
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  // --- State Variables ---
  // State for input fields
  const [accountNumber, setAccountNumber] = useState('');
  const [otp, setOtp] = useState(''); // State for the entered OTP

  // State to track the stage of the login process
  const [otpSent, setOtpSent] = useState(false); // True after OTP request is successful

  // State for feedback (loading, error, success)
  const [isLoading, setIsLoading] = useState(false); // Controls spinner and form visibility
  const [error, setError] = useState(null); // Holds error message text
  const [successMessage, setSuccessMessage] = useState(null); // Holds success message text

  // --- React Router Hook ---
  // Get the navigate function for redirection
  const navigate = useNavigate();

  // --- Input Change Handlers ---
  // Updates state when account number input changes
  const handleAccountNumberChange = (event) => {
    setAccountNumber(event.target.value);
    // Optionally clear feedback when input changes
    setError(null);
    setSuccessMessage(null);
  };

  // Updates state when OTP input changes
  const handleOtpChange = (event) => {
    setOtp(event.target.value);
    // Optionally clear feedback when input changes
    setError(null);
    setSuccessMessage(null);
  };

  // --- Form Submission Handler ---
  // This function handles submission for BOTH stages
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default browser page reload

    setIsLoading(true); // Start loading for the current stage
    setError(null); // Clear previous errors
    setSuccessMessage(null); // Clear previous success messages

    try {
      if (!otpSent) { // --- STAGE 1: REQUEST OTP ---
        console.log(`Simulating OTP request for account number: ${accountNumber}`);
        // *** Simulate an API call delay ***
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

        // *** Simulate API response for OTP request (hardcoded) ***
        let apiResponse;
        if (accountNumber === '0786399754' || accountNumber.toLowerCase() === 'colleen') { // Case-insensitive check for 'colleen'
           apiResponse = { success: true, message: 'OTP sent to your registered phone/email!' };
        } else {
           apiResponse = { success: false, message: 'Account number not found.' };
        }
        // *** End of simulation for OTP request ***

        if (apiResponse.success) {
          setSuccessMessage(apiResponse.message);
          setOtpSent(true); // Move to the OTP verification stage
          setOtp(''); // Clear OTP field for new input
        } else {
          setError(apiResponse.message);
        }

      } else { // --- STAGE 2: VERIFY OTP ---
        console.log(`Simulating OTP verification for account ${accountNumber}: ${otp}`);
        // *** Simulate an API call delay ***
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

        // *** Simulate API response for OTP verification (hardcoded OTP: '1234') ***
        let apiResponse;
        if (otp === '1234') { // Hardcoded OTP for simulation
          apiResponse = { success: true, message: 'OTP verified! Logging in...' };
        } else {
          apiResponse = { success: false, message: 'Invalid OTP. Please try again.' };
        }
        // *** End of simulation for OTP verification ***

        if (apiResponse.success) {
          setSuccessMessage(apiResponse.message);
          setError(null); // Clear any previous error
          navigate('/dashboard'); // Redirect to dashboard

        } else {
          setError(apiResponse.message);
        }
      }

    } catch (err) {
      // Handle unexpected errors during the simulation (e.g., if Promise.reject was used)
      console.error('Simulation Error:', err);
      setError('An unexpected error occurred during the process simulation.');
      setSuccessMessage(null); // Clear success message on error
    } finally {
      setIsLoading(false); // Stop loading regardless of outcome
    }
  };

  // --- Component JSX (What gets rendered) ---
  return (
    // Outer Container to center the card
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      {/* The Card component */}
      <Card className="p-4 shadow-lg rounded" style={{ width: '25rem' }}>
        <Card.Body>
          {/* --- Feedback (Spinner, Error, Success) --- */}
          {/* Show spinner when isLoading is true */}
          {isLoading && <LoadingSpinner />}
          {/* Show error message when there is an error */}
          {error && <ErrorMessage message={error} />}
          {/* Show success message when there is a success message */}
          {successMessage && <SuccessMessage message={successMessage} />}

          {/* --- Form Content (Conditional based on stage) --- */}
          {/* Show the appropriate form only when not loading */}
          {!isLoading && (
            <> {/* Use a React Fragment to group multiple elements */}
              {/* Card Title - Adjust based on stage */}
              <Card.Title className="text-center mb-4">
                {otpSent ? 'Verify OTP' : 'SimAcc Portal Login'} {/* Title changes based on stage */}
              </Card.Title>

              {/* The Form */}
              <Form onSubmit={handleSubmit}>

                {!otpSent ? ( // --- Render Account Number form if OTP not sent ---
                  <>
                    <Form.Group className="mb-3" controlId="formBasicAccountNumber">
                      <Form.Label>Account Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your account number or phone (e.g., 0786399754)"
                        value={accountNumber}
                        onChange={handleAccountNumberChange}
                        required
                        disabled={isLoading}
                      />
                    </Form.Group>

                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100 mt-3"
                      disabled={isLoading}
                    >
                      Request OTP
                    </Button>
                  </>
                ) : ( // --- Render OTP verification form if OTP sent ---
                  <>
                     <p className="text-muted text-center mb-3">
                        An OTP has been sent to your registered phone number or email linked to <br/>
                        <span className="fw-bold">{accountNumber}</span>.
                     </p>
                    <Form.Group className="mb-3" controlId="formBasicOtp">
                      <Form.Label>Enter OTP</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter the 4-digit OTP"
                        value={otp}
                        onChange={handleOtpChange}
                        required
                        disabled={isLoading}
                      />
                    </Form.Group>

                    <Button
                      variant="success"
                      type="submit"
                      className="w-100 mt-3"
                      disabled={isLoading}
                    >
                      Verify OTP
                    </Button>

                    {/* Option to Resend OTP (simulated) */}
                     <div className="text-center mt-3">
                         <Button
                             variant="link" // Makes the button look like a link (Bootstrap utility)
                             onClick={(e) => {
                        
                             e.preventDefault();
                             console.log('Simulating Resend OTP clicked for account:', accountNumber);
                             setError(null);
                             setSuccessMessage('Resending OTP...');
                             setIsLoading(true);
                             // Simulate resend delay
                             setTimeout(() => {
                                 setSuccessMessage('New OTP sent!');
                                 setIsLoading(false);
                             }, 1000);
                         }} className="text-primary text-decoration-none">
                             Resend OTP
                             </Button>                       
                     </div>
                  </>
                )}

                {/* Link for Account Creation (remains at the bottom) */}
                <div className="text-center mt-3">
                  <p className="text-muted mb-1">{!otpSent ? "Don't have an account?" : "Need help logging in?"}</p>
                  <a href="/register" className="text-primary text-decoration-none">
                    {!otpSent ? "Create Account" : "Contact Support"}
                  </a>
                </div>

              </Form>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LoginPage;