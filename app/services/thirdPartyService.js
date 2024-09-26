const axios = require('axios');

// Ensure environment variables are defined or provide fallback values
const THIRD_PARTY_API_URL_GET = process.env.THIRD_PARTY_API_URL_GET || "http://10.10.6.113:8000/iml/lot/det?sap-client=234";
const THIRD_PARTY_API_URL_POST = process.env.THIRD_PARTY_API_URL_POST || "http://10.10.6.113:8000/iml/lot/det?sap-client=234";
const THIRD_PARTY_API_URL_RESULT_RECORDING = process.env.THIRD_PARTY_API_URL_RESULT_RECORDING || "http://10.10.6.113:8000/iml/lot/resultRecording";
const THIRD_PARTY_USERNAME = process.env.THIRD_PARTY_USERNAME || "dev00";
const THIRD_PARTY_PASSWORD = process.env.THIRD_PARTY_PASSWORD || "Dev@Hbl#1977";

// Function to get Authorization Header
const getAuthHeader = () => {
  if (!THIRD_PARTY_USERNAME || !THIRD_PARTY_PASSWORD) {
    throw new Error('Third-party API credentials are missing');
  }
  
  const credentials = `${THIRD_PARTY_USERNAME}:${THIRD_PARTY_PASSWORD}`;
  const token = Buffer.from(credentials).toString('base64');
  return `Basic ${token}`;
};

// Fetch GET Orders
const fetchGetOrders = async () => {
  try {
    if (!THIRD_PARTY_API_URL_GET) {
      throw new Error('Third-party GET API URL is missing');
    }

    const response = await axios.get(THIRD_PARTY_API_URL_GET, {
      headers: {
        'Authorization': getAuthHeader(),
      },
    });

    console.log('GET Response from third-party API:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'fetchGetOrders');
  }
};

// Fetch POST Orders
const fetchPostOrders = async (body) => {
  try {
    if (!THIRD_PARTY_API_URL_POST) {
      throw new Error('Third-party POST API URL is missing');
    }

    console.log('Sending POST payload to third-party API:', JSON.stringify(body, null, 2));
    
    const response = await axios.post(THIRD_PARTY_API_URL_POST, body, {
      headers: {
        'Authorization': getAuthHeader(),
      },
    });

    console.log('POST Response from third-party API:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'fetchPostOrders');
  }
};

// Fetch Result Recording
const fetchResultRecording = async (inspectLot) => {
  try {
    if (!THIRD_PARTY_API_URL_RESULT_RECORDING) {
      throw new Error('Third-party Result Recording API URL is missing');
    }

    const url = `${THIRD_PARTY_API_URL_RESULT_RECORDING}/${inspectLot}?sap-client=234`;
    console.log('Fetching Result Recording from third-party API:', url);
    
    const response = await axios.get(url, {
      headers: {
        'Authorization': getAuthHeader(),
      },
    });

    console.log('Result Recording Response from third-party API:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'fetchResultRecording');
  }
};

// Error Handler
const handleAxiosError = (error, functionName) => {
  if (error.response) {
    console.error(`${functionName} failed with status:`, error.response.status);
    console.error('Response headers:', error.response.headers);
    console.error('Response data:', error.response.data);
  } else if (error.request) {
    console.error(`${functionName} request made but no response received.`);
    console.error('Request:', error.request);
  } else {
    console.error(`${functionName} failed with error:`, error.message);
  }
};

// Export Functions
module.exports = {
  fetchGetOrders,
  fetchPostOrders,
  fetchResultRecording,
};
