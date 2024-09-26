const thirdPartyService = require('../services/thirdPartyService');

// Create Lot
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

module.exports = {
  assignLot,
  createLot,
  getLotReports,
  updateResultRecording,
  updatingTotalResult,
};
