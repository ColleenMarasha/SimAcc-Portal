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

// Rename the component to ChangePasswordPage
function ChangePasswordPage() {
  // --- State Variables ---
  // State for password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // State for feedback (loading, error, success)
  const [isLoading, setIsLoading] = useState(false); // Controls spinner and form visibility
  const [error, setError] = useState(null); // Holds error message text
  const [successMessage, setSuccessMessage] = useState(null); // Holds success message text

  // --- React Router Hook ---
  // Get the navigate function for redirection
  const navigate = useNavigate();

  // --- Input Change Handlers ---
  // Updates state when current password input changes
  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };

  // Updates state when new password input changes
  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  // Updates state when confirm new password input changes
  const handleConfirmNewPasswordChange = (event) => {
    setConfirmNewPassword(event.target.value);
  };


  // --- Form Submission Handler ---
  // This function runs when the change password form is submitted
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default browser page reload

    // Basic client-side validation (optional, but good for user experience)
    if (newPassword !== confirmNewPassword) {
        setError("New passwords do not match!");
        setSuccessMessage(null);
        return; // Stop the submission if passwords don't match
    }

    // Reset feedback states and start loading
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // *** Simulate an API call to the backend to change the password ***
      // Replace this entire simulation block with your actual axios.post call later
      console.log('Attempting password change for user:', { currentPassword, newPassword });
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

      // *** Simulate an API response ***
      // In a real app, the backend would validate the current password and update to the new one
      // For simulation, let's just simulate success if new and confirm matched (which we checked above)
      const apiResponse = { success: true, message: 'Password successfully changed!' }; // Example success
      // const apiResponse = { success: false, message: 'Incorrect current password.' }; // Example error

      // --- Handle the API response ---
      if (apiResponse.success) {
        setSuccessMessage(apiResponse.message);
        setError(null); // Clear any previous mismatch error
        // *** Redirect after successful password change (e.g., back to dashboard or login) ***
        // navigate('/dashboard'); // Example: Redirect to dashboard
         // OR
         // navigate('/login'); // Example: Redirect back to login page
         // Let's redirect to dashboard for now
         navigate('/dashboard');


      } else {
        // Display the error message from the API response
        setError(apiResponse.message);
        setSuccessMessage(null);
      }

    } catch (err) {
      // Handle unexpected errors during the API call itself
      console.error('API Error:', err);
      setError('An unexpected error occurred during password change. Please try again.');
      setSuccessMessage(null);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // --- Component JSX (What gets rendered) ---
  return (
    // Outer Container to center the card on the page
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      {/* The Card component to visually contain the form */}
      <Card className="p-4 shadow-lg rounded" style={{ width: '25rem' }}>
        <Card.Body>
          {/* --- Conditional Rendering for Feedback (Spinner, Error, Success) --- */}
          {/* Show spinner when isLoading is true */}
          {isLoading && <LoadingSpinner />}
          {/* Show error message when there is an error */}
          {error && <ErrorMessage message={error} />}
          {successMessage && <SuccessMessage message={successMessage} />}

          {/* --- Conditional Rendering for the Form and Title --- */}
          {/* Show the title and form ONLY when not loading */}
          {!isLoading && (
            <> {/* Use a React Fragment to group multiple elements */}
              {/* Card Title */}
              <Card.Title className="text-center mb-4">Change Password</Card.Title> {/* Updated title */}

              {/* The Change Password Form */}
              <Form onSubmit={handleSubmit}>
                {/* Current Password Field */}
                <Form.Group className="mb-3" controlId="formCurrentPassword"> {/* Updated controlId */}
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={handleCurrentPasswordChange}
                    required
                    disabled={isLoading}
                  />
                </Form.Group>

                {/* New Password Field */}
                <Form.Group className="mb-3" controlId="formNewPassword"> {/* Updated controlId */}
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    required
                    disabled={isLoading}
                  />
                </Form.Group>

                 {/* Confirm New Password Field */}
                <Form.Group className="mb-3" controlId="formConfirmNewPassword"> {/* New controlId */}
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmNewPassword}
                    onChange={handleConfirmNewPasswordChange}
                    required
                    disabled={isLoading}
                  />
                </Form.Group>


                {/* Change Password Button */}
                <Button
                  variant="primary" // Keep or change variant (e.g., 'success')
                  type="submit"
                  className="w-100 mt-3"
                  disabled={isLoading}
                >
                  Change Password {/* Updated button text */}
                </Button>

                {/* Link back to Login or Dashboard */}
                <div className="text-center mt-3">
                  <p className="text-muted mb-1">Decided not to change?</p> {/* Updated text */}
                  {/* Link to the login page */}
                  <a href="/login" className="text-primary text-decoration-none"> {/* Link to /login */}
                    Back to Login
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

export default ChangePasswordPage; // Export with the new component name