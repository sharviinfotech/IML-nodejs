const db = require("../models");
const isEmpty = require('lodash.isempty');
const lodash = require("lodash");
const Calibration = db.calibration;
const Equipment = db.equipments;
const Op = db.Sequelize.Op;

exports.create = (req, res)  => {
 console.log("Create Calibration");

    if (isEmpty(req.body)) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const calibrationData = req.body.calibrationArray;

    const calibration = req.body.calibrationArray.map(item => ({
            'equipment_id': item.equipment_id,
            'equipment_name': item.equipment_name,
            'type': item.type,
            'make': item.make,
            'model': item.model,
            'specification': item.specification,
            'technician_name': item.technician_name,
            'cal_sent_date': item.cal_sent_date,
            'cal_date': item.cal_date,
            'certificate': item.certificate,
            'status': item.status,
            'rejection_remarks': item.rejection_remarks,
            'rejection_date': item.rejection_date
    }));

    Calibration.bulkCreate(calibration,(req,res) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        }
    })
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).json({ status: true, message: "Value created successfully" })
}

exports.getAll = (req, res) => {
    console.log("Get ALL Calibration");

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
            required: true,
            where:calibrationFilter
        }]
    }).then(data => {
            console.log("HIi");
            const responseData = {"status":true,"data":data};
            console.log(responseData);
            res.status(200).json(responseData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Calibrations."
            });
        });
}

exports.getOne = (req, res) => {
    console.log("Get one Calibration");
    const id = req.params.id;
    Calibration.findByPk(id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Calibrations."
            })
        })


}

exports.bulkUpdate = (req, res) => {
    if (isEmpty(req.body)) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
     const reqData = req.body.calibrationArray;;
    //console.log(reqData);
    reqData.forEach(element => {
        if(!isEmpty(element) ) { //&& lodash.has(element,'id')
            console.log("Element is",element);
            const id = element.id;
            console.log("Id is",id);
            const data = element;
            delete data.id;
            console.log("Final Date",data);
            Calibration.update(data,{
                where:{id:id}
            }).catch(err => {
                res.status(500).send({
                    message: "Error updating Tutorial with id=" + id
                });
            });
        }else{
            console.log(element);
        }
     })

    res.status(200).send({"status":true,"Message":"Records are updated successfully"});

}

exports.update = (req, res) => {
    console.log("update Calibration");
    const id = req.params.id;

    Calibration.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Calibraation was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id
            });
        });
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Calibration.destroy({ where: { id: id } })
        .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Calibration was deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Cannot delete Tutorial with id=${id}. Maybe Calibration was not found!`
                    });
                }
            }
        )
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Calibrations."
            })
        })
}