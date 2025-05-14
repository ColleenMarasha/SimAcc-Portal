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
  const [password, setPassword] = useState('');
  // State for feedback (loading, error, success)
  const [isLoading, setIsLoading] = useState(false); // Controls spinner and form visibility
  const [error, setError] = useState(null); // Holds error message text
  const [successMessage, setSuccessMessage] = useState(null); // Holds success message text

  // --- React Router Hook ---
  // Get the navigate function for redirection
  const navigate = useNavigate();

  // --- Input Change Handlers ---
  // Updates state when account number/username input changes
  const handleAccountNumberChange = (event) => {
    setAccountNumber(event.target.value);
  };

  // Updates state when password input changes
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // --- Form Submission Handler ---
  // This function runs when the login form is submitted
 
  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // *** Simulate an API call delay ***
      console.log('Attempting login with:', { accountNumber, password });
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay (e.g., 1.5 seconds)

      // *** Add the specific username and password check here for simulation ***
      let apiResponse; // Declare apiResponse here

      if (accountNumber === 'Colleen' && password === '0000') {
        // Simulate a successful login response
        apiResponse = { success: true, message: 'Login successful!' };
      } else {
        // Simulate a failed login response for incorrect credentials
        apiResponse = { success: false, message: 'Invalid username or password.' };
      }
      // *** End of simulation check ***


      // --- Handle the API response (this part remains the same) ---
      if (apiResponse.success) {
        setSuccessMessage(apiResponse.message);
        // Redirect to the dashboard page upon successful login
        // You would typically also save the user's authentication token here
        navigate('/dashboard'); // Use the navigate function to change the route

      } else {
        // Display the error message from the API response
        setError(apiResponse.message);
      }

    } catch (err) {
      // Handle unexpected errors during the simulation delay or other issues
      console.error('Simulation Error:', err); // Log the error for debugging
      setError('An unexpected error occurred during login simulation.'); // Display a generic error message

    } finally {
      setIsLoading(false); // Stop loading
    }
  };




  // --- Component JSX (What gets rendered) ---
  return (
    // Outer Container to center the card on the page
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      {/* The Card component to visually contain the login form */}
      <Card className="p-4 shadow-lg rounded" style={{ width: '25rem' }}>
        <Card.Body>
          {/* --- Conditional Rendering for Feedback (Spinner, Error, Success) --- */}
          {/* Show spinner when isLoading is true */}
          {isLoading && <LoadingSpinner />}
          {/* Show error message when there is an error */}
          {error && <ErrorMessage message={error} />}
          {/* Show success message when there is a success message */}
          {successMessage && <SuccessMessage message={successMessage} />}

          {/* --- Conditional Rendering for the Login Form and Title --- */}
          {/* Show the title and form ONLY when not loading */}
          {!isLoading && (
            <> {/* Use a React Fragment to group multiple elements */}
              {/* Card Title */}
              <Card.Title className="text-center mb-4">SimAcc Portal Login</Card.Title>

              {/* The Login Form */}
              <Form onSubmit={handleSubmit}>
                {/* Account Number / Username Field */}
                <Form.Group className="mb-3" controlId="formBasicAccountNumber">
                  <Form.Label>Account Number or Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter account number or username"
                    value={accountNumber}
                    onChange={handleAccountNumberChange}
                    required
                    // Disable input fields while loading is true
                    disabled={isLoading}
                  />
                </Form.Group>

                {/* Password Field */}
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    // Disable input field while loading is true
                    disabled={isLoading}
                  />
                </Form.Group>

                {/* Login Button */}
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mt-3"
                  // Disable the button while loading is true
                  disabled={isLoading}
                >
                  Login
                </Button>

                {/* Link for Account Creation */}
                <div className="text-center mt-3">
                  <p className="text-muted mb-1">Don't have an account?</p>
                  {/* Link to the registration page (assuming a /register route exists) */}
                  <a href="/register" className="text-primary text-decoration-none">
                    Create Account
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