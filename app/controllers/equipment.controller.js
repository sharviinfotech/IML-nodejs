const db = require("../models");
const isEmpty = require('lodash.isempty');
const Equipment = db.equipments;
const Calibration = db.calibration;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    console.log("API Request start Step2");
    console.log(req.body);
    // Validate request
    if (isEmpty(req.body)) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Equipment
    const equipmentData = req.body.equipmentArray;
    console.log(equipmentData);
    console.log(equipmentData[0].idNo);

    const equipment = {
                            'idNo': equipmentData[0].idNo,
                            'equipmentName': equipmentData[0].equipmentName,
                            'type': equipmentData[0].type,
                            'make': equipmentData[0].make,
                            'model': equipmentData[0].model,
                            'specification': equipmentData[0].specification,
                            'calFreqInMonth': equipmentData[0].calFreqInMonth,
                            'createdAt': equipmentData[0].createdAt
                        };
    console.log("data start1");
    console.log(equipment);
    console.log("data end2");

    // Save Tutorial in the database
    Equipment.create(equipment, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        }
    });
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).json({ status: true, message: "Value created successfully" })
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
    const equipmentName = req.query.equipmentName;
    const filter = req.body.filter;
    console.log(req.body.filter);
    let equipmentFilter = {}
    let calibrationFilter = {};

    if(!isEmpty(req.body)) {
        equipmentFilter = filter.equipment;
        calibrationFilter = filter.calibration;
    }

    Equipment.findAll({
         where: equipmentFilter,
        include: [{
            model: Calibration,
             required: false,
             where : calibrationFilter
        }]
    })
        .then(data => {
            console.log("HIi");
            const responseData = {"status":true,"data":data};
            console.log(responseData);
            res.status(200).json(responseData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Equipments."
            });
        });
};