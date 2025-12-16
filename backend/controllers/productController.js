const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError')

//get Products - /api/v1/products
exports.getProducts = async (req, res, next) =>{
    const products = await Product.find();
    res.status(200).json({
        success : true,
        count: products.length,
        products
    })
}

//create product - /api/v1/product/new
exports.newProduct = catchAsyncError(async (req, res, next)=>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
}) 

//get single product
exports.getSingleProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
           return next(new ErrorHandler('Product not found', 400));
        }

        res.status(200).json({
            success: true,
            product
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid product ID"
        });
    }
};

//update product - api/v1/products/:id
exports.updateProduct = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // update the product
        product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,              // return the updated product
                runValidators: true,    // apply schema validations
                
            }
        );

        res.status(200).json({
            success: true,
            product
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid product ID"
        });
    }
};

//Delete product - api/v1/products/:id
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid product ID"
        });
    }
};


