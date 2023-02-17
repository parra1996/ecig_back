
const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

const UserController = require('../controllers/UserController');

//CRUD RESTful

router.get('/', auth ,  UserController.get_all);

router.post('/login',  UserController.login);

router.post('/register',  UserController.register);

router.delete('/:id',auth,  UserController.delete_by_id);

router.put('/', auth, UserController.modify_password);

router.put('/:id/clave', auth, UserController.modify_user);




module.exports = router;