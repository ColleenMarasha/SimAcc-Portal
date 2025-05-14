import React, { useState } from 'react';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Assuming you use react-router-dom
import { get, post, login } from '../utils/api';

function LoginPage() {
  const [accountNumber, setAccountNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpMethod, setOtpMethod] = useState(null); // 'phone' or 'email'
  const [currentStep, setCurrentStep] = useState('enterAccount'); // 'enterAccount', 'chooseMethod', 'enterOtp'
  const [availableMethods, setAvailableMethods] = useState([]); // e.g., ['phone', 'email']
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // Call your backend API to request OTP
      const response = await post('/login/request-otp', { accountNumber });

      // Backend should return available methods or confirm which one was used
      if (response.data.success) {
        setAvailableMethods(response.data.availableMethods || []); // e.g., ['phone', 'email']
        // Decide the next step based on backend response
        if (response.data.sentDirectly) { // If backend auto-sent to a default method
             setCurrentStep('enterOtp');
             // Maybe backend tells you which method it used? response.data.methodUsed
             // setOtpMethod(response.data.methodUsed);
             // Or you might handle this differently if no explicit choice is needed
        } else if (response.data.availableMethods && response.data.availableMethods.length > 0) {
             setCurrentStep('chooseMethod');
        } else {
             setError("Could not determine OTP method for this account.");
        }

      } else {
        setError(response.data.message || 'Account not found or failed to initiate OTP.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while requesting OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtpByMethod = async (method) => {
      setOtpMethod(method); // Set the chosen method
      setError(null);
      setLoading(true);
      try {
          // Call backend API to explicitly send OTP via the chosen method
          const response = await post('/login/send-otp', { accountNumber, method });

          if (response.data.success) {
              setCurrentStep('enterOtp'); // Move to OTP input step
          } else {
              setError(response.data.message || `Failed to send OTP via ${method}.`);
          }
      } catch (err) {
          setError(err.response?.data?.message || 'An error occurred while sending OTP.');
      } finally {
          setLoading(false);
      }
  };


  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // Call your backend API to verify the entered OTP
      const response = await post('/login/verify-otp', {
        accountNumber,
        otp,
        otpMethod // Send the method used for verification
      });

      if (response.data.success) {
        // Backend should return auth data, e.g., a token
        localStorage.setItem('authToken', response.data.token); // Store the token
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        setError(response.data.message || 'Invalid OTP.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while verifying OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Your layout/styling */}
      <h2>Login</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {loading && <Spinner animation="border" />}

      {currentStep === 'enterAccount' && (
        <Form onSubmit={handleRequestOtp}>
          <Form.Group controlId="formAccountNumber">
            <Form.Label>Account Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your account number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading}>
            Request OTP
          </Button>
        </Form>
      )}

      {currentStep === 'chooseMethod' && (
           <div>
               <p>Select where to send the OTP:</p>
               {availableMethods.includes('phone') && (
                    <Button variant="secondary" onClick={() => handleSendOtpByMethod('phone')} disabled={loading} className="me-2">
                       Send to Phone
                    </Button>
               )}
                {availableMethods.includes('email') && (
                    <Button variant="secondary" onClick={() => handleSendOtpByMethod('email')} disabled={loading}>
                        Send to Email
                    </Button>
                )}
           </div>
      )}

      {currentStep === 'enterOtp' && (
        <Form onSubmit={handleVerifyOtp}>
          <Form.Group controlId="formOtp">
            <Form.Label>Enter 4-digit OTP</Form.Label>
            {/* You might want to show where it was sent, e.g., "Sent to your phone ending in XXX" */}
            <Form.Control
              type="text" // Or type="number" with pattern="[0-9]{4}"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              maxLength={4}
              minLength={4}
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading}>
            Verify OTP
          </Button>
          {/* Optional: Add a "Resend OTP" button */}
          {/* <Button variant="link" onClick={handleResendOtp} disabled={loading}>Resend OTP</Button> */}
        </Form>
      )}
    </div>
  );
}

export default LoginPage;