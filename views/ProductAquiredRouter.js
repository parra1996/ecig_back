const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

const ProductsAquiredController = require('../controllers/ProductsAquiredController');

router.get('/',  ProductsAquiredController.get_all);

router.get('/:id', ProductsAquiredController.get_by_id);

router.post('/aquire/:id',  ProductsAquiredController.aquire);

router.delete('/:id',  ProductsAquiredController.delete_by_id);

router.put('/:id', ProductsAquiredController.update_sub_product);



module.exports = router;
