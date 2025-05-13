import React from 'react';
import Alert from 'react-bootstrap/Alert';

function SuccessMessage({ message }) { // This component accepts a 'message' prop
  if (!message) {
    return null; // Don't render if there's no message
  }

  return (
    <Alert variant="success" className="mt-3"> {/* Bootstrap success alert */}
      {message}
    </Alert>
  );
}

export default SuccessMessage;