const express = require('express');
const cors = require('cors');
const app = express();
var corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});
require("./app/routes/equipment.routes.js")(app);
require("./app/routes/calibration.routes.js")(app);
require("./app/routes/order.routes.js")(app);
const PORT = process.env.PORT || 9091;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});