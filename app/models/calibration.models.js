module.exports = (sequelize, Sequelize) => {
    const calibrations = sequelize.define("calibration", {
        equipment_id: {
            type: Sequelize.STRING
        },
        equipment_name: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        make: {
            type: Sequelize.STRING
        },
        model: {
            type: Sequelize.STRING
        },
        specification: {
            type: Sequelize.STRING
        },
        technician_name: {
            type: Sequelize.STRING
        },
        cal_sent_date: {
            type: Sequelize.STRING
        },
        cal_date: {
            type: Sequelize.STRING
        },
        certificate: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        rejection_remarks: {
            type: Sequelize.STRING
        },
        rejection_date: {
            type: Sequelize.STRING
        }
    });

    return calibrations;
};