const db = require("../models");
const isEmpty = require('lodash.isempty');
const Equipment = db.equipments;
const Calibration = db.calibration;
const Op = db.Sequelize.Op;

// Create and Save multiple Equipments
exports.create = (req, res) => {
    console.log("step5");
    console.log(req.body);
    // Validate request
    if (isEmpty(req.body) || isEmpty(req.body.equipmentArray)) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const equipmentData = req.body.equipmentArray.map(item => ({
        'idNo': item.idNo,
        'equipmentName': item.equipmentName,
        'type': item.type,
        'make': item.make,
        'model': item.model,
        'specification': item.specification,
        'calFreqInMonth': item.calFreqInMonth,
        'createdAt': item.createdAt
    }));

    // Save multiple Equipment records in the database
    Equipment.bulkCreate(equipmentData)
        .then(() => {
            res.status(200).json({ status: true, message: "Values created successfully" });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Equipments."
            });
        });
};


// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
    const equipmentName = req.query.equipmentName;
    var condition = equipmentName ? { equipmentName: { [Op.like]: `%${equipmentName}%` } } : null;

    Equipment.findAll({
        where: condition,
        include: [{ model: Calibration, required: false }]
    }).then(data => {
        console.log("HIi"); const responseData = { "status": true, "data": data };
        console.log(responseData);
        res.status(200).json(responseData);
    }).catch(err => { console.log(err); res.status(500).send({ message: err.message || "Some error occurred while retrieving Equipments." }); });
};