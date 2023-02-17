
const router = require('express').Router();


const UserRouter = require('./views/UserRouter');
const ProductsRouter = require('./views/ProductsRouter');
const ProductAquiredRouter = require('./views/ProductAquiredRouter');

router.use('/users', UserRouter);
router.use('/products', ProductsRouter);
router.use('/productsAquired', ProductAquiredRouter);

module.exports = router;