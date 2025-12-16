const express = require('express');
const { getProducts,getSingleProduct,updateProduct, newProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();

router.route('/products').get(getProducts);
router.route('/products/:id').get(getSingleProduct);
router.route('/products/new').post(newProduct);
router.route('/products/:id').put(updateProduct);
router.route('/products/:id').delete(deleteProduct);

module.exports = router;