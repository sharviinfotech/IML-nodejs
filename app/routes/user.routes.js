module.exports = function(app) {
    var users = require('../controllers/user.controller.js');
    var router = require('express').Router();

    router.route('/register', users.register);
    router.route('/login', users.login);
    router.route('/signout', users.signout);

    app.use('/users', users);

}