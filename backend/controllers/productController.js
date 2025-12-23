const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError')
const APIFeatures = require('../utils/apiFeatures')

//get Products - /api/v1/products
exports.getProducts = catchAsyncError(async (req, res, next) =>{
    const apiFeatures =  new APIFeatures(Product.find(), req.query).search();
    const products = await Product.find();
    res.status(200).json({
        success : true,
        count: products.length,
        products
    })
});

//create product - /api/v1/product/new
exports.newProduct = catchAsyncError(async (req, res, next)=>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
}) 

//get single product
exports.getSingleProduct = catchAsyncError( async (req, res, next) => {
        const product = await Product.findById(req.params.id);

        if (!product) {
           return next(new ErrorHandler('Product not found', 400));
        }

        res.status(200).json({
            success: true,
            product
        });

})

//update product - api/v1/products/:id
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

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
});

//Delete product - api/v1/products/:id
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    });
});


