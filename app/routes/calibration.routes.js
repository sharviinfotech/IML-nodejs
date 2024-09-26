const express = require("express");
module.exports = app => {
    var router = express.Router();
    const calibrationController = require('../controllers/calibration.controller.js');

    router.post("/", calibrationController.create);
    router.get('/', calibrationController.getAll);
    router.get('/:id', calibrationController.getOne);
    router.put('/:id', calibrationController.update);
    router.put('/update/bulk', calibrationController.bulkUpdate);
    router.delete('/:id', calibrationController.delete);

    app.use('/api/calibration', router);

}