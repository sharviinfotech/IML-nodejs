module.exports = (sequelize, Sequelize) => {
    const Equipment = sequelize.define("equipment", {
        idNo: {
            type: Sequelize.STRING
        },
        equipmentName: {
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
        calFreqInMonth: {
            type: Sequelize.STRING
        }
    });

    return Equipment;
};