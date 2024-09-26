const db = require("../models");
const isEmpty = require('lodash.isempty');
const lodash = require("lodash");
const User = db.user;
const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config.js");

exports.register = (req, res)  => {
 console.log("Hello User");
}

exports.login = async (req, res)  => {
    try{
        const user = await User.findOne({
            where: {
                username: req.body.username,
            },
        });
        if (!user) {
            return res.status(404).send({ "status":"error", "message": "User Not found." });
        }

        const isValidUser = await bcrypt.compareSync(req.body.password, user.password);

        if(!isValidUser) {
            return res.status(401).send({ "status":"error", "message": "Invalid Credentials" });
        }

        const token = jwt.sign({ id: user.id },
                               config.secret,
                        {algorithm: 'HS256', allowInsecureKeySizes: true, expiresIn: 86400 }
                     );
        req.session.token = token;

        return res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
        });
    }catch(e){
        res.status(500).send({"status":"error","message":e.Message});
    }
}

exports.logout = (req, res)  => {
    console.log("Hello logout");
}