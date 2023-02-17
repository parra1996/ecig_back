const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

const ProductsController = require('../controllers/ProductsController');

router.get('/',  ProductsController.get_all);

router.post('/crear', ProductsController.create)

router.delete('/delete/:id', ProductsController.delete_by_id)

router.put('/update/:id', ProductsController.update)

module.exports = router;

