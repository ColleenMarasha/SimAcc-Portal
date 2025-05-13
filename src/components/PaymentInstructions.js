import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'; // Optional: Wrap in a Card for consistent look

function PaymentInstructions() {
  return (
    <Container className="my-4"> {/* my-4 adds vertical margin */}
       {/* Optional: Wrap in a Card */}
       {/* <Card>
          <Card.Body> */}
            <Row className="g-4"> {/* g-4 adds spacing between columns */}
              {/* Payment Instructions Column */}
              <Col md={6}> {/* Takes half width on medium screens and up */}
                <h5>Payment Instructions</h5>
                <ul>
                  <li>Always include your stand number as reference.</li>
                  <li>Email payment confirmation to: finance@simacc.gov.zw</li> {/* Example email */}
                  <li>Allow 24-48 hours for payment processing.</li>
                </ul>
              </Col>

              {/* Contact & Hours Column */}
              <Col md={6}> {/* Takes half width on medium screens and up */}
                <Row>
                   <Col>
                       <h6>For Queries Contact Debtors Department:</h6>
                       <p>0242 132 988/2471</p> {/* Example numbers */}
                   </Col>
                   <Col>
                        <h6>Office Hours:</h6>
                        <p>Mon-Fri: 8:00 AM - 4:30 PM</p>
                   </Col>
                </Row>
              </Col>
            </Row>
          {/* Optional: Close Card Body and Card */}
          {/* </Card.Body>
         </Card> */}
    </Container>
  );
}

export default PaymentInstructions;