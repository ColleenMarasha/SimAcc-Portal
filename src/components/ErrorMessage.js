import React from 'react';
import Alert from 'react-bootstrap/Alert';

function ErrorMessage({ message }) { // This component accepts a 'message' prop
  if (!message) {
    return null; // Don't render if there's no message
  }

  return (
    <Alert variant="danger" className="mt-3"> {/* Bootstrap danger alert */}
      {message}
    </Alert>
  );
}

export default ErrorMessage;