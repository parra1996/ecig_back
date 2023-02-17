const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

const ProductsAquiredRouter = require('../controllers/ProductsAquiredController');

router.get('/',  ProductsAquiredRouter.get_all);

module.exports = router;
