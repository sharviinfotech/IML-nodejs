const express = require("express");
module.exports = app => {
  var router = express.Router();
const ordersController = require('../controllers/orderscontroller');


// POST /orders/lot/create
router.post('/lot/create', ordersController.createLot);

// POST /orders/lot/reports
router.post('/lot/reports', ordersController.getLotReports);

// POST /orders/lot/assign
router.post('/lot/assign', ordersController.assignLot);

// GET /orders/lot/resultRecording/:inspectLot
router.get('/lot/resultRecording/:inspectLot', ordersController.updateResultRecording);

// POST /orders/lot/updateResultRecordingTotal
router.post('/lot/updateResultRecordingTotal', ordersController.updatingTotalResult);


  app.use('/api/orders', router);
}
