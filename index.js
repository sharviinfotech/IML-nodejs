const express = require('express');
const cors = require('cors');
const isEmpty = require('lodash.isempty');
const app = express();
var corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log("API Request start");
app.get("/", (req, res) => {
    console.log("app.get request");
    res.header("Access-Control-Allow-Origin", "*");
    res.json({ message: "Welcome to bezkoder application." });
});
app.post("/", (req, res) => {
    console.log("app.post request");
    res.set('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).json({ message: "Welcome to bezkoder application. POST method" });
});
require("./app/routes/equipment.routes.js")(app);
require("./app/routes/calibration.routes.js")(app);
require("./app/routes/order.routes.js")(app);
const PORT = process.env.PORT || 9091;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});