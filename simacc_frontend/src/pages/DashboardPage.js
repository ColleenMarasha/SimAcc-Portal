import React, { useState, useEffect } from 'react'; // Import useState and useEffect for date
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'; // Import Button
import FormControl from 'react-bootstrap/FormControl'; // Import FormControl for date input
import InputGroup from 'react-bootstrap/InputGroup'; // Optional: For grouping date input with an icon
import { useNavigate } from 'react-router-dom';

// Import your SimAcc logo (adjust path if needed)
import simaccLogo from '../assets/simacc-logo.jpg'; // <-- Ensure this path is correct

// Import an icon (e.g., Bell icon from Font Awesome)
import { FaBell } from 'react-icons/fa'; // Example: Import Bell icon from Font Awesome

import PaymentOptions from '../components/PaymentOptions';

import PaymentInstructions from '../components/PaymentInstructions';
// Placeholder components for the different sections
const AccountDetailsCard = () => <Card><Card.Body>Account Details Placeholder</Card.Body></Card>;
// ... other placeholders ...
const InvoiceSection = () => <Card><Card.Body>Invoice Section Placeholder</Card.Body></Card>;

// Placeholder components for the different sections

//const AccountDetailsCard = () => <Card><Card.Body>Account Details Placeholder</Card.Body></Card>;

const BalanceCard = () => <Card><Card.Body>Current Balance Placeholder</Card.Body></Card>;

const LastPaymentCard = () => <Card><Card.Body>Last Payment Placeholder</Card.Body></Card>;

const WaitingListCard = () => <Card><Card.Body>Waiting List Placeholder</Card.Body></Card>;


function DashboardPage() {
    // State to hold the current date
    const [currentDate, setCurrentDate] = useState('');
    const navigate = useNavigate();
    const handleBellClick = () => {
        console.log('Notification bell clicked!');
    };

    useEffect(() => {
        // Function to format the date as dd-MMM-yyyy (e.g., 13-May-2025)
        const getFormattedDate = () => {
            const today = new Date();
            const options = { day: '2-digit', month: 'short', year: 'numeric' };
            // Use toLocaleDateString with en-GB for the desired format
            const formattedDate = today.toLocaleDateString('en-GB', options);
            // Replace spaces or slashes with hyphens if needed, and ensure Month is MMM (e.g., May)
             return formattedDate.replace(/ /g, '-'); // Adjust if your locale uses slashes or other separators
        };
        setCurrentDate(getFormattedDate());
    }, []); // Empty dependency array means this runs once on component mount


  return (
    <Container fluid>
      <Row>
        {/* Sidebar Column */}
        <Col xs={12} md={3} lg={2} className="bg-light sidebar">
          <div className="d-flex flex-column p-3"> {/* p-3 for padding */}
              <h5>MAIN</h5>
              <ul className="nav nav-pills flex-column mb-auto"> {/* Bootstrap list styling */}
                <li className="nav-item">
                  <a href="#" className="nav-link active" aria-current="page">
                        Dashboard 
                  </a>
                </li>
              </ul>
          </div>
        </Col>

        {/* Main Content Column */}
        <Col xs={12} md={9} lg={10} className="py-3">
          {/* Row containing the Welcome header and the new top elements */}
          <Row className="mb-4 align-items-center"> {/* mb-4 for margin-bottom, align-items-center to vertical align */}
            {/* Welcome Message Col */}
            <Col>
              <h2>Welcome to Dashboard</h2>
            </Col>

            {/* Col for Notification Bell and SimAcc Logo */}
            <Col xs="auto" className="d-flex align-items-center gap-3"> {/* xs="auto" size based on content, d-flex, align-items-center, gap for spacing */}
                {/* Notification Bell Icon */}
                 <div
                    className="position-relative"
                    onClick={handleBellClick} // <-- Add this onClick handler
                    style={{ cursor: 'pointer' }} // Optional: Add pointer cursor to indicate clickable
                >
                     <FaBell size={24} />
                     {/* Potential badge here */}
                </div>  

                {/* SimAcc Logo */}
                <img
                    src={simaccLogo}
                    alt="SimAcc Portal Logo"
                    style={{ height: '40px' }} // Adjust size as needed
                />
            </Col>


             {/* Col for Date Picker, Change Password, Download Statement Buttons */}
            <Col md={6} lg={5} className="d-flex justify-content-end align-items-center gap-2"> {/* md={6}, lg={5} size for this col, justify-content-end to push content to the right, gap for spacing between items */}
                {/* Date Picker Input (Styled as FormControl) */}
                <InputGroup style={{ width: '180px' }}> {/* Set a width for the input group */}
                     {/* Optional: Calendar icon here */}
                     {/* <InputGroup.Text><FaCalendarAlt /></InputGroup.Text> */}
                     <FormControl
                          type="text" // Use text type to display formatted string
                          value={currentDate} // Display the formatted date
                          readOnly // Make it read-only as it's just displaying today's date
                          placeholder="Today's Date" // Placeholder if date is not set
                     />
                </InputGroup>

                    <Button
                      variant="warning"
                      onClick={() => navigate('/changePassword')} >
                      Change Password
                    </Button>

                {/* Download Current Statement Button */}
                <Button variant="primary">Download Current Statement</Button> {/* Use Bootstrap primary color */}
            </Col>
          </Row> {/* End of the row containing Welcome header and new top elements */}


          {/* Row for the 4 Information Cards */}
          <Row className="mb-3">
            {/* ... Info Cards ... */}
            <Col xs={12} md={6} lg={3} className="mb-3"><AccountDetailsCard /></Col>
            <Col xs={12} md={6} lg={3} className="mb-3"><BalanceCard /></Col>
            <Col xs={12} md={6} lg={3} className="mb-3"><LastPaymentCard /></Col>
            <Col xs={12} md={6} lg={3} className="mb-3"><WaitingListCard /></Col>
          </Row>

          {/* Row for the Invoice Section */}
          <Row className="mb-3">
            <Col xs={12}><InvoiceSection /></Col>
          </Row>

          {/* Add the new Payment Options section */}
          <Row className="mb-3">
             <Col xs={12}><PaymentOptions /></Col>
          </Row>

          {/* Add the new Payment Instructions section */}
          <Row>
             <Col xs={12}><PaymentInstructions /></Col>
          </Row>

        </Col>
      </Row>
    </Container>
  );
}

export default DashboardPage;