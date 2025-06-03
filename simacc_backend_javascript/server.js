require('dotenv').config(); // Load environment variables from .env file

const express = require('express'); // Express framework
const { Pool } = require('pg'); // PostgreSQL client
const cors = require('cors'); // CORS middleware

const app = express(); // Initialize Express application
const PORT = process.env.PORT || 5000; // Use port from .env or default to 5000

// Middleware setup
app.use(cors()); // Enable CORS for all routes - essential for frontend communication
app.use(express.json()); // Enable parsing of JSON request bodies (for POST/PUT requests)

// PostgreSQL Connection Pool Configuration
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// --- Test Database Connection (Optional, but good for debugging) ---
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client from pool', err.stack);
  }
  client.query('SELECT NOW()', (err, result) => {
    release(); // Release the client back to the pool
    if (err) {
      return console.error('Error executing test query', err.stack);
    }
    console.log('Successfully connected to PostgreSQL:', result.rows[0].now);
  });
});

// --- API Routes ---

// 1. Dashboard Data Endpoint
app.get('/api/dashboard-data', async (req, res) => {
  try {
    // --- IMPORTANT: Replace these with your actual SQL queries to fetch data ---
    // For demonstration, we'll use a hardcoded user_id and account_id.
    // In a real application, these would come from an authenticated user's session.
    const userId = 1; // Example user ID
    const accountId = 1; // Example account ID (assuming user 1 has account 1)

    const accountDetailsResult = await pool.query(
      `SELECT name, phone, stand_address, account_number_str AS account_number
       FROM users
       WHERE id = $1`,
      [userId]
    );

    const balanceResult = await pool.query(
      `SELECT current_balance FROM accounts WHERE account_id = $1`,
      [accountId]
    );

    const lastPaymentResult = await pool.query(
      `SELECT amount, transaction_date FROM payments WHERE account_id = $1 ORDER BY transaction_date DESC LIMIT 1`,
      [accountId]
    );

    // Simulate waiting list status (you might have a table for this)
    const waitingListStatus = "Active"; // Placeholder

    // Structure the data to send back to the frontend
    res.json({
      success: true,
      message: 'Dashboard data fetched successfully!',
      data: {
        accountDetails: accountDetailsResult.rows[0] || null,
        currentBalance: balanceResult.rows[0] ? parseFloat(balanceResult.rows[0].current_balance) : 0.00, // Ensure numeric parsing
        lastPayment: lastPaymentResult.rows[0] || null,
        waitingListStatus: waitingListStatus
      }
    });

  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error fetching dashboard data.' });
  }
});

// --- OTP Related Endpoints (for LoginPage) ---
// These will now be handled by Express.

app.post('/api/request-otp', async (req, res) => {
    const { phoneNumber } = req.body;
    console.log(`Backend: Received request to send OTP to ${phoneNumber}`);
    try {
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Hardcoded check for demonstration (replace with database lookup in real app)
        if (phoneNumber === '0786399754' || phoneNumber.toLowerCase() === 'colleen') {
            // In a real app, you would:
            // 1. Generate a random OTP
            // 2. Store OTP in a temporary table (e.g., otp_codes) with an expiry time
            // 3. Use an SMS service (Twilio, Vonage etc.) to send the OTP to the phoneNumber
            res.json({ success: true, message: 'OTP sent successfully to registered contact!' });
        } else {
            res.status(404).json({ success: false, message: 'Account number/phone not found.' });
        }

    } catch (error) {
        console.error('Error in /api/request-otp:', error);
        res.status(500).json({ success: false, message: 'Failed to request OTP.' });
    }
});

app.post('/api/verify-otp', async (req, res) => {
    const { phoneNumber, otp } = req.body;
    console.log(`Backend: Received OTP verification for ${phoneNumber}: ${otp}`);
    try {
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Hardcoded OTP verification for this example (replace with database lookup)
        if (otp === '1234') {
            // If OTP is valid, you'd typically generate and send a JWT token here
            res.json({ success: true, message: 'OTP verified! Login successful.', token: 'fake_jwt_token_123' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid OTP.' });
        }

    } catch (error) {
        console.error('Error in /api/verify-otp:', error);
        res.status(500).json({ success: false, message: 'Failed to verify OTP.' });
    }
});


// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});