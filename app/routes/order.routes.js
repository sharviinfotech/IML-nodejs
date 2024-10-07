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

// POST /Usercreation
router.post('/usercreation', ordersController.usercreation);

// GET /Usercreation
router.get('/usercreation', ordersController.getusercreation);

// put /Usercreation
// router.put('/usercreation', ordersController.usercreation);

// POST /equipment/master
router.post('/equipment/master', ordersController.postEquipmentMaster);

// POST /transactionCompleted
router.post('/transactionCompleted', ordersController.transactionCompleted);

// POST /resultrecord
router.post('/resultrecord', ordersController.resultrecord);

// Add the new route to fetch equipment master data
router.get('/equipment/master', ordersController.getEquipmentMaster);

// GET /orders/lot/resultRecording/:inspectLot
router.get('/lot/resultRecording/:inspectLot', ordersController.updateResultRecording);

// POST /orders/lot/updateResultRecordingTotal
router.post('/lot/updateResultRecordingTotal', ordersController.updatingTotalResult);


  app.use('/api/orders', router);
}
