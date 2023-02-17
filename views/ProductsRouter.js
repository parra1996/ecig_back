const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

const ProductsRouter = require('../controllers/ProductsController');

router.get('/',  ProductsRouter.get_all);

module.exports = router;
