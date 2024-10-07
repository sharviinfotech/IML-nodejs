module.exports = {
    HOST: "imlrds.c9cowauu46ab.ap-south-1.rds.amazonaws.com",
    PORT: "1433",
    USER: "sharviinfotech",
    PASSWORD: "sharviinfotech",
    DB: "iml",
    dialect: "mssql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};