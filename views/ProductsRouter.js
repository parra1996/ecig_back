const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

const ProductsRouter = require('../controllers/ProductsController');

router.get('/', auth ,  UserController.get_all);
