
const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

const UserController = require('../controllers/UserController');

//CRUD RESTful

router.get('/',  UserController.get_all);

router.post('/login',  UserController.login);

router.post('/register',  UserController.register);

module.exports = router;