const {STRING} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        firstname: { type :sequelize.STRING},
        Lastname: { type :sequelize.STRING},
        usename: { type :sequelize.STRING},
        email: { type :sequelize.STRING},
        password: { type :sequelize.STRING}
    })
}