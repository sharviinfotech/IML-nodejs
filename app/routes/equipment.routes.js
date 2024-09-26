module.exports = app => {
    const equipment = require("../controllers/equipment.controller.js");

    var router = require("express").Router();

    console.log("API Request start Step1");

    // Create a new equipment
    router.post("/", equipment.create);

    // Retrieve all equipments
    router.get("/", equipment.findAll);


    app.use('/api/equipment', router);
};