const axios = require('axios');

// Ensure environment variables are defined or provide fallback values
const THIRD_PARTY_API_URL_USER_CREATION = process.env.THIRD_PARTY_API_URL_USER_CREATION || "http://10.10.6.113:8000/login/create?sap-client=234";
const THIRD_PARTY_API_URL_RESULT_RECOED = process.env.THIRD_PARTY_API_URL_RESULT_RECOED || "http://10.10.6.113:8000/iml/result_record/res?sap-client=234";
const THIRD_PARTY_API_URL_TRANSACTION_COMPLETED = process.env.THIRD_PARTY_API_URL_TRANSACTION_COMPLETED || "http://10.10.6.113:8000/transaction/completed?sap-client=234";
const THIRD_PARTY_API_URL_EQUIPMENT_MASTER = process.env.THIRD_PARTY_API_URL_EQUIPMENT_MASTER || "http://10.10.6.113:8000/equipment/master?sap-client=234";
const THIRD_PARTY_API_URL_POST_EQUIPMENT_MASTER = process.env.THIRD_PARTY_API_URL_POST_EQUIPMENT_MASTER || "http://10.10.6.113:8000/equipment/master?sap-client=234";
const THIRD_PARTY_API_URL_GET = process.env.THIRD_PARTY_API_URL_GET || "http://10.10.6.113:8000/iml/lot/det?sap-client=234";
const THIRD_PARTY_API_URL_POST = process.env.THIRD_PARTY_API_URL_POST || "http://10.10.6.113:8000/iml/lot/det?sap-client=234";
const THIRD_PARTY_API_POST_UD = process.env.THIRD_PARTY_API_POST_UD || "http://10.10.6.113:8000/iml/usaged/use?sap-client=234";
const THIRD_PARTY_API_URL_RESULT_RECORDING = process.env.THIRD_PARTY_API_URL_RESULT_RECORDING || "http://10.10.6.113:8000/iml/lot/resultRecording";
const THIRD_PARTY_USERNAME = process.env.THIRD_PARTY_USERNAME || "dev00";
const THIRD_PARTY_PASSWORD = process.env.THIRD_PARTY_PASSWORD || "Vision@2024";

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
const fetchsubmitresult = async (body) => {
  try {
    if (!THIRD_PARTY_API_POST_UD) {
      throw new Error('Third-party POST API URL is missing');
    }

    console.log('Sending POST payload to third-party API:', JSON.stringify(body, null, 2));
    
    const response = await axios.post(THIRD_PARTY_API_POST_UD, body, {
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


// Function to fetch equipment master data
const fetchEquipmentMaster = async () => {
  try {
    if (!THIRD_PARTY_API_URL_EQUIPMENT_MASTER) {
      throw new Error('Third-party Equipment Master API URL is missing');
    }

    const response = await axios.get(THIRD_PARTY_API_URL_EQUIPMENT_MASTER, {
      headers: {
        'Authorization': getAuthHeader(),
      },
    });

    console.log('GET Response from Equipment Master API:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'fetchEquipmentMaster');
  }
};

// Post to Equipment Master
const postEquipmentMaster = async (body) => {
  try {
    console.log('Sending POST payload to Equipment Master API:', JSON.stringify(body, null, 2));
    
    const response = await axios.post(THIRD_PARTY_API_URL_POST_EQUIPMENT_MASTER, body, {
      headers: {
        'Authorization': getAuthHeader(),
      },
    });

    console.log('POST Response from Equipment Master API:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'postEquipmentMaster');
  }
};

// Fetch POST Orders
const fetchPosttransactionCompleted = async (body) => {
  try {
    if (!THIRD_PARTY_API_URL_TRANSACTION_COMPLETED) {
      throw new Error('Third-party POST API URL is missing');
    }

    console.log('Sending POST payload to third-party API:', JSON.stringify(body, null, 2));
    
    const response = await axios.post(THIRD_PARTY_API_URL_TRANSACTION_COMPLETED, body, {
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

// Fetch resultrecord
const fetchresultrecord = async (body) => {
  try {
    if (!THIRD_PARTY_API_URL_RESULT_RECOED) {
      throw new Error('Third-party POST API URL is missing');
    }

    console.log('Sending POST payload to third-party API:', JSON.stringify(body, null, 2));
    
    const response = await axios.post(THIRD_PARTY_API_URL_RESULT_RECOED, body, {
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

// Fetch usercreation
const fetchusercreation = async (body) => {
  try {
    if (!THIRD_PARTY_API_URL_USER_CREATION) {
      throw new Error('Third-party POST API URL is missing');
    }

    console.log('Sending POST payload to third-party API:', JSON.stringify(body, null, 2));
    
    const response = await axios.post(THIRD_PARTY_API_URL_USER_CREATION, body, {
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


const getusercreation = async (queryParams) => {
  try {
    if (!THIRD_PARTY_API_URL_USER_CREATION) {
      throw new Error('Third-party API URL is missing');
    }

    console.log('Sending GET request to third-party API with params:', queryParams);
    
    const response = await axios.get(THIRD_PARTY_API_URL_USER_CREATION, {
      headers: {
        'Authorization': getAuthHeader(),
      },
      params: queryParams  // Optionally add query parameters
    });

    console.log('GET Response from third-party API:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'fetchusercreation');
  }
};



// Export Functions
module.exports = {
  fetchGetOrders,
  fetchPostOrders,
  fetchResultRecording,
  fetchEquipmentMaster,
  postEquipmentMaster,
  fetchPosttransactionCompleted,
  fetchresultrecord,
  fetchusercreation,
  getusercreation,
  fetchsubmitresult
};
