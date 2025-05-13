import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';

// Import routing components
import { Routes, Route } from 'react-router-dom';

// Import your Header and Footer components
import Header from './components/Header';
import Footer from './components/Footer';

// Import your page components
import LoginPage from './pages/LoginPage';
// Create a placeholder for Dashboard for now
const DashboardPage = () => <h2>Dashboard Content Goes Here</h2>;
const HomePage = () => <h2>Welcome Home!</h2>; // Optional: A simple home page

function App() {
  return (
    <div className="App">
      {/* The Header will appear on all pages */}
      <Header />

      {/* The main content area where pages will be rendered based on the route */}
      <Container className="mt-4">
        {/* Set up your routes here */}
        <Routes>
          {/* Route for the Login Page */}
          <Route path="/login" element={<LoginPage />} />

          {/* Route for the Dashboard (Placeholder for now) */}
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Optional: Route for the Home Page */}
          <Route path="/" element={<HomePage />} />

          {/* Optional: A catch-all for 404 pages */}
          {/* <Route path="*" element={<h2>Page Not Found</h2>} /> */}
        </Routes>
      </Container>

      {/* The Footer will appear on all pages */}
      <Footer />
    </div>
  );
}

export default App;