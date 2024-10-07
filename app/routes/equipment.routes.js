module.exports = app => {
    const equipment = require("../controllers/equipment.controller.js");
    //const cors = require('cors')
 
    // app.use(cors({
    //     origin: "*"
    // }))

    
    var router = require("express").Router();
     console.log("step1")
    // Create a new equipment
    router.post("/", equipment.create);

    // Retrieve all equipments
    router.get("/", equipment.findAll);

    // router.post("/", inout1.create);

    app.use('/api/equipment', router);
  

};