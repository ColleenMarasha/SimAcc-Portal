import React from 'react';
import Container from 'react-bootstrap/Container'; // Use Container for internal padding
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'; // For the individual payment method cards
import Button from 'react-bootstrap/Button'; // For the "Pay Online Now" button

// Placeholder components for the individual payment method cards
const OnlinePaymentsCard = () => (
  <Card className="h-100"> {/* h-100 makes cards equal height */}
    <Card.Body>
      <Card.Title className="text-center">Online Payments</Card.Title>
      <div className="text-center mb-3">
        {/* Placeholder for payment icons */}
        <img src="placeholder-visa.png" alt="Visa" style={{ height: '20px', margin: '5px' }} />
        <img src="placeholder-mastercard.png" alt="Mastercard" style={{ height: '20px', margin: '5px' }} />
        {/* Add other payment icons */}
      </div>
      <Card.Text className="text-center">
        Instant payments through our secure portal!
      </Card.Text>
      <div className="text-center mt-auto"> {/* mt-auto pushes button to the bottom */}
        <Button variant="success">Pay Online Now</Button>
      </div>
    </Card.Body>
  </Card>
);

const BankTransferCard = () => (
  <Card className="h-100">
    <Card.Body>
      <Card.Title className="text-center">Bank Transfer</Card.Title>
      {/* Placeholder for bank logo */}
      <div className="text-center mb-3">
        <img src="placeholder-bank.png" alt="Bank Logo" style={{ height: '30px' }} />
      </div>
      <Card.Text>
        Bank: ZB BANK<br/>
        Account: 4136-00060989-207 ZWG<br/>
        Account: 4136-00060989-405 USD<br/>
        Branch: ZB MSASA<br/>
        Swift: ZBCOZWHA
      </Card.Text>
    </Card.Body>
  </Card>
);

const MobilePaymentsCard = () => (
  <Card className="h-100">
    <Card.Body>
      <Card.Title className="text-center">Mobile Payments</Card.Title>
       {/* Placeholder for mobile payment logos */}
       <div className="text-center mb-3">
         <img src="placeholder-ecocash.png" alt="EcoCash" style={{ height: '25px', margin: '5px' }} />
         {/* Add other mobile payment logos */}
       </div>
      <Card.Text>
        USSD Code: <br/>
        <span className="text-monospace">*151*2*1*[AccountOrStandNo]#</span> {/* Example USSD code, text-monospace for fixed-width font */}
      </Card.Text>
      <Card.Text className="mt-2 text-muted" style={{ fontSize: '0.8em' }}> {/* Smaller, muted text */}
         Supported: EcoCash • OneMoney • Telecash
      </Card.Text>
    </Card.Body>
  </Card>
);


function PaymentOptions() {
  return (
    <Container className="my-4"> {/* my-4 adds vertical margin */}
      <h3 className="text-center mb-2">Payment Options</h3>
      <p className="text-center text-muted mb-4">Secure and convenient payment methods</p>

      {/* Row for the three payment method cards */}
      <Row xs={1} md={3} className="g-4"> {/* g-4 adds gutter (spacing) between grid items */}
        {/* Each Col will contain a payment method card */}
        <Col><OnlinePaymentsCard /></Col>
        <Col><BankTransferCard /></Col>
        <Col><MobilePaymentsCard /></Col>
      </Row>
    </Container>
  );
}

export default PaymentOptions;