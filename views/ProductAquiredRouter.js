const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

const ProductsAquiredController = require('../controllers/ProductsAquiredController');

router.get('/',  ProductsAquiredController.get_all);

router.post('/aquire/:id', ProductsAquiredController.aquire);

router.delete('/:id',  ProductsAquiredController.delete_by_id);


module.exports = router;
