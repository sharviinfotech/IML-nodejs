const thirdPartyService = require('../services/thirdPartyService');
const nodemailer = require('nodemailer');
// submitresult
const submitresult = async (req, res) => {
  try {
    // Check if the payload matches third-party service expectations
    const filters = req.body;

    console.log('submitresult lot with payload:', JSON.stringify(filters, null, 2));

    // Send payload to third-party service
    const result = await thirdPartyService.fetchsubmitresult(filters);

    console.log('Lot created successfully:', JSON.stringify(result, null, 2));
    res.status(200).json({
      status: true,
      data: result,
      message: 'Lot created successfully!',
    });
  } catch (error) {
    console.error('Error in createLot:', error.message);
    res.status(500).json({
      status: false,
      message: 'Failed to create lot.',
      error: error.message,
    });
  }
};

const createLot = async (req, res) => {
  try {
    // Check if the payload matches third-party service expectations
    const createPayload = { CREATE: req.body };
    console.log('Creating lot with payload:', JSON.stringify(createPayload, null, 2));

    // Send payload to third-party service
    const result = await thirdPartyService.fetchPostOrders(createPayload);

    console.log('Lot created successfully:', JSON.stringify(result, null, 2));
    res.status(200).json({
      status: true,
      data: result,
      message: 'Lot created successfully!',
    });
  } catch (error) {
    console.error('Error in createLot:', error.message);
    res.status(500).json({
      status: false,
      message: 'Failed to create lot.',
      error: error.message,
    });
  }
};


// Get Lot Reports
const getLotReports = async (req, res) => {
  try {
    const filters = req.body;
    console.log('Fetching lot reports with filters:', JSON.stringify(filters, null, 2));

    // Send filters to third-party service
    const result = await thirdPartyService.fetchPostOrders(filters);

    // Ensure the data is returned correctly
    console.log('Lot reports fetched successfully:', JSON.stringify(result, null, 2));

    res.status(200).json({
      status: true,
      data: result,  // Make sure the data is returned here
      message: 'Lot reports fetched successfully!',
    });
  } catch (error) {
    console.error('Error in getLotReports:', error.message);
    res.status(500).json({
      status: false,
      message: 'Failed to fetch lot reports.',
      error: error.message,
    });
  }
};


// Update Result Recording
const updateResultRecording = async (req, res) => {
  try {
    const inspectLot = req.params.inspectLot;  // Lot to be inspected is passed in the URL
    console.log(`Fetching result recording for inspectLot: ${inspectLot}`);

    // Fetch result recording for the specific lot from third-party service
    const result = await thirdPartyService.fetchResultRecording(inspectLot);

    console.log('Result recording fetched successfully:', JSON.stringify(result, null, 2));
    res.status(200).json({
      status: true,
      data: result,
      message: 'Result recording fetched successfully!',
    });
  } catch (error) {
    console.error('Error in updateResultRecording:', error.message);
    res.status(500).json({
      status: false,
      message: 'Failed to fetch result recording.',
      error: error.message,
    });
  }
};

// Assign Lot
const assignLot = async (req, res) => {
  try {
    console.log('Assign Lot API hit with payload:', req.body);  // Add this line for logging
    const assignPayload = req.body;
    const result = await thirdPartyService.fetchPostOrders(assignPayload);
    res.status(200).json({
      status: true,
      data: result,
      message: 'Lot assigned successfully!',
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to assign lot.',
      error: error.message,
    });
  }
};

// Update Total Result Recording
const updatingTotalResult = async (req, res) => {
  try {
    // Payload for updating the total result recording is sent in the request body (req.body)
    const updatePayload = req.body;
    console.log('Updating total result recording with payload:', JSON.stringify(updatePayload, null, 2));

    // Send the payload to third-party service
    const result = await thirdPartyService.fetchPostOrders(updatePayload);

    console.log('Total result recording updated successfully:', JSON.stringify(result, null, 2));
    res.status(200).json({
      status: true,
      data: result,
      message: 'Total result recording updated successfully!',
    });
  } catch (error) {
    console.error('Error in updatingTotalResult:', error.message);
    res.status(500).json({
      status: false,
      message: 'Failed to update total result recording.',
      error: error.message,
    });
  }
};

// Fetch Equipment Master Data
const getEquipmentMaster = async (req, res) => {
  try {
    console.log('Fetching equipment master data');
    
    // Call the third-party service to get equipment master data
    const result = await thirdPartyService.fetchEquipmentMaster();

    console.log('Equipment master data fetched successfully:', JSON.stringify(result, null, 2));
    
    res.status(200).json({
      status: true,
      data: result,
      message: 'Equipment master data fetched successfully!',
    });
  } catch (error) {
    console.error('Error in getEquipmentMaster:', error.message);
    res.status(500).json({
      status: false,
      message: 'Failed to fetch equipment master data.',
      error: error.message,
    });
  }
};

// Post Equipment Master Data
const postEquipmentMaster = async (req, res) => {
  try {
    const equipmentPayload = req.body; // Payload from client
    console.log('Posting equipment master data:', JSON.stringify(equipmentPayload, null, 2));
    
    const result = await thirdPartyService.postEquipmentMaster(equipmentPayload);

    res.status(200).json({
      status: true,
      data: result,
      message: 'Equipment master data posted successfully!',
    });
  } catch (error) {
    console.error('Error in postEquipmentMaster:', error.message);
    res.status(500).json({
      status: false,
      message: 'Failed to post equipment master data.',
      error: error.message,
    });
  }
};

// Get Lot Reports
const transactionCompleted = async (req, res) => {
  try {
    const filters = req.body;
    console.log('Fetching lot reports with filters:', JSON.stringify(filters, null, 2));

    // Send filters to third-party service
    const result = await thirdPartyService.fetchPosttransactionCompleted(filters);

    // Ensure the data is returned correctly
    console.log('Lot reports fetched successfully:', JSON.stringify(result, null, 2));

    res.status(200).json({
      status: true,
      data: result,  // Make sure the data is returned here
      message: 'Lot reports fetched successfully!',
    });
  } catch (error) {
    console.error('Error in getLotReports:', error.message);
    res.status(500).json({
      status: false,
      message: 'Failed to fetch lot reports.',
      error: error.message,
    });
  }
};

// Get resultrecord
const resultrecord = async (req, res) => {
  try {
    const filters = req.body;
    console.log('Fetching lot reports with filters:', JSON.stringify(filters, null, 2));

    // Send filters to third-party service
    const result = await thirdPartyService.fetchresultrecord(filters);

    // Ensure the data is returned correctly
    console.log('Lot reports fetched successfully:', JSON.stringify(result, null, 2));

    res.status(200).json({
      status: true,
      data: result,  // Make sure the data is returned here
      message: 'Lot reports fetched successfully!',
    });
  } catch (error) {
    console.error('Error in getLotReports:', error.message);
    res.status(500).json({
      status: false,
      message: 'Failed to fetch lot reports.',
      error: error.message,
    });
  }
};

// Usercreation
const usercreation = async (req, res) => {
  try {
    const filters = req.body;
    console.log('Fetching lot reports with filters:', JSON.stringify(filters, null, 2));

    // Send filters to third-party service
    const result = await thirdPartyService.fetchusercreation(filters);

    // Ensure the data is returned correctly
    console.log('Lot reports fetched successfully:', JSON.stringify(result, null, 2));

    res.status(200).json({
      status: true,
      data: result,  // Make sure the data is returned here
      message: 'Lot reports fetched successfully!',
    });
  } catch (error) {
    console.error('Error in getLotReports:', error.message);
    res.status(500).json({
      status: false,
      message: 'Failed to fetch lot reports.',
      error: error.message,
    });
  }
};


const getusercreation = async (req, res) => {
  try {
    console.log('Fetching getusercreation');
    
    // Optionally pass req.query or req.body if needed by the third-party service
    const result = await thirdPartyService.getusercreation(req.query);  // or req.body
    
    console.log('getusercreation data fetched successfully:', JSON.stringify(result, null, 2));
    
    res.status(200).json({
      status: true,
      data: result,
      message: 'getusercreation data fetched successfully!',
    });
  } catch (error) {
    console.error('Error in getusercreation:', error.message);
    res.status(500).json({
      status: false,
      message: 'Failed to fetch getusercreation.',
      error: error.message,
    });
  }
};
// Set up email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use any other service like 'SendGrid', 'Mailgun', etc.
  auth: {
    user: 'ranaconnectsu@gmail.com', // your email address
    pass: 'jfxa wgdi ntqf vadn', // your email password
  },
});
 
// Controller function to get Lot Reports
// const getLotReports = async (req, res) => {
//   try {
//     const filters = req.body;
//     console.log('Fetching lot reports with filters:', JSON.stringify(filters, null, 2));
 
//     // Fetch lot reports from the third-party service
//     const result = await thirdPartyService.fetchPostOrders(filters);
 
//     // Convert the fetched data into a readable format for the email body
//     const reportData = JSON.stringify(result, null, 2);
 
//     // Prepare email content, including the report data
//     const mailOptions = {
//       from: 'charan@sharviinfotech.com',
//       to:'sriramunaidug@sharviinfotech.com',
//       subject: 'Lot Reports Fetched Successfully', // Subject line
//       text: `Lot reports have been fetched successfully.\nLot Reports Data`, // Include filters and report data in the email body
//     };
 
//     // Send email with the lot reports
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('Error sending email:', error);
//       } else {
//         console.log('Email sent: ' + info.response);
//       }
//     });
 
//     // Return the lot reports as a response
//     res.status(200).json({
//       status: true,
//       data: result,  // Return the fetched reports in the response
//       message: 'Lot reports fetched successfully!',
//     });
//   } catch (error) {
//     console.error('Error in getLotReports:', error.message);
 
//     // Send error response to client
//     res.status(500).json({
//       status: false,
//       message: 'Failed to fetch lot reports.',
//       error: error.message,
//     });
//   }
// };

module.exports = {
  assignLot,
  createLot,
  getLotReports,
  updateResultRecording,
  updatingTotalResult,
  getEquipmentMaster,
  postEquipmentMaster,
  transactionCompleted,
  resultrecord,
  usercreation,
  getusercreation,
  submitresult
};
