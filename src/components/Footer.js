import React from 'react';
import Container from 'react-bootstrap/Container';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light text-center text-lg-start mt-5"> {/* mt-5 adds margin top */}
      <Container className="p-4">
        <div className="text-center">
          © {currentYear} SimAcc Portal. All rights reserved.
          {/* You can add links here later */}
          {/* <a className="text-dark" href="#">Privacy Policy</a> */}
        </div>
      </Container>
    </footer>
  );
}

export default Footer;