module.exports = {
    HOST: "localhost",
    PORT: "1433",
    USER: "SA",
    PASSWORD: "Ramesh@1234",
    DB: "iml",
    dialect: "mssql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};