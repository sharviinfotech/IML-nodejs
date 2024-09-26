const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

const db = {};

db.Sequelize = Sequelize;

db.equipments = require("./equipment.model.js")(sequelize, Sequelize);
db.calibration = require("./calibration.models.js")(sequelize, Sequelize);
db.user = require("./user.models.js")(sequelize, Sequelize);

db.equipments.hasOne(db.calibration,{foreignKey:'equipment_id'});
db.calibration.belongsTo(db.equipments,{foreignKey:'equipment_id'});

module.exports = db;