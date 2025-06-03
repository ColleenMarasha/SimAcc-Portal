const API_BASE_URL = 'http://localhost:5000/api'; // Replace with your actual backend URL

/**
 * Generic function to handle API requests.
 * @param {string} endpoint - The API endpoint (e.g., '/users', '/login').
 * @param {string} method - The HTTP method (e.g., 'GET', 'POST').
 * @param {object} [data] - The request body data (for POST, PUT, etc.).
 * @param {object} [headers] - Additional headers for the request.
 * @returns {Promise<object>} - A promise that resolves with the JSON response.
 * @throws {Error} - Throws an error if the request fails.
 */
async function request(endpoint, method = 'GET', data = null, headers = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      // Add any default headers here, like authorization tokens
      ...headers,
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      const error = await response.json(); // Attempt to read error message from body
      throw new Error(error.message || `API request failed with status ${response.status}`);
    }

    // Parse the JSON response body
    const result = await response.json();
    return result;

  } catch (error) {
    console.error('API request error:', error);
    throw error; // Re-throw the error so the calling code can handle it
  }
}

// --- Specific API Call Functions ---

/**
 * Fetches data from a specific endpoint.
 * @param {string} endpoint - The API endpoint.
 * @param {object} [headers] - Additional headers.
 * @returns {Promise<object>} - Promise resolving with data.
 */
export async function get(endpoint, headers) {
  return request(endpoint, 'GET', null, headers);
}

/**
 * Sends data to a specific endpoint using POST.
 * @param {string} endpoint - The API endpoint.
 * @param {object} data - The data to send.
 * @param {object} [headers] - Additional headers.
 * @returns {Promise<object>} - Promise resolving with response data.
 */
export async function post(endpoint, data, headers) {
  return request(endpoint, 'POST', data, headers);
}

// You can add functions for PUT, DELETE, etc. similarly
/*
export async function put(endpoint, data, headers) {
  return request(endpoint, 'PUT', data, headers);
}

export async function del(endpoint, headers) {
  return request(endpoint, 'DELETE', null, headers); // DELETE usually doesn't have a body
}
*/

// Example of a specific login function using the post helper
export async function login(username, password) {
  const loginData = { username, password };
  // Assuming your login endpoint is '/auth/login'
  return post('/auth/login', loginData);
}

// You would export the functions you want to use in other parts of your app
//export { get, post, login }; // Or use named exports directly as shown above
