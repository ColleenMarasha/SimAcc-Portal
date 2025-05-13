import React from 'react';

import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';

import Col from 'react-bootstrap/Col';

import Card from 'react-bootstrap/Card'; // We'll use Card for the sections

import PaymentOptions from '../components/PaymentOptions';

import PaymentInstructions from '../components/PaymentInstructions';



// You might need other Bootstrap components like Button, Form, etc., later



// Placeholder components for the different sections

const AccountDetailsCard = () => <Card><Card.Body>Account Details Placeholder</Card.Body></Card>;

const BalanceCard = () => <Card><Card.Body>Current Balance Placeholder</Card.Body></Card>;

const LastPaymentCard = () => <Card><Card.Body>Last Payment Placeholder</Card.Body></Card>;

const WaitingListCard = () => <Card><Card.Body>Waiting List Placeholder</Card.Body></Card>;

const InvoiceSection = () => <Card><Card.Body>Invoice Section Placeholder</Card.Body></Card>;



function DashboardPage() {

  return (

    <Container fluid> {/* Use fluid container for full width */}

      <Row>

        {/* Sidebar Column (Example - adjust size as needed) */}

        <Col xs={12} md={3} lg={2} className="bg-light sidebar"> {/* bg-light for background color, sidebar class for potential custom styling */}

          {/* Sidebar content will go here */}

          <div className="d-flex flex-column p-3"> {/* p-3 for padding */}

            <h5>MAIN</h5>

            <ul className="nav nav-pills flex-column mb-auto"> {/* Bootstrap list styling */}

              <li className="nav-item">

                <a href="#" className="nav-link active" aria-current="page">

                  Dashboard

                </a>

              </li>

              {/* Add other navigation links here later */}

            </ul>

          </div>

        </Col>



        {/* Main Content Column */}

        <Col xs={12} md={9} lg={10} className="py-3"> {/* py-3 for vertical padding */}

          <h2>Welcome to Dashboard</h2>



          {/* Row for Date Picker, Change Password, Download Statement */}

          <Row className="mb-3 align-items-center"> {/* mb-3 for margin-bottom */}

            {/* You'll add components/elements here for the date picker and buttons */}

            <Col>{/* Date Picker Placeholder */}</Col>

            <Col xs="auto">{/* Change Password Button Placeholder */}</Col> {/* xs="auto" makes the column size based on content */}

            <Col xs="auto">{/* Download Statement Button Placeholder */}</Col>

          </Row>



          {/* Row for the 4 Information Cards */}

          <Row className="mb-3">

            <Col xs={12} md={6} lg={3} className="mb-3"><AccountDetailsCard /></Col> {/* mb-3 adds margin to the bottom of the column on smaller screens */}

            <Col xs={12} md={6} lg={3} className="mb-3"><BalanceCard /></Col>

            <Col xs={12} md={6} lg={3} className="mb-3"><LastPaymentCard /></Col>

            <Col xs={12} md={6} lg={3} className="mb-3"><WaitingListCard /></Col>

          </Row>



          {/* Row for the Invoice Section */}

          <Row>

            <Col xs={12}><InvoiceSection /></Col> {/* The invoice takes full width */}

          </Row>

          <Row className="mb-3"> {/* Added mb-3 for space below this section */}

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