const mongoose = require('mongoose');

const productschema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "Please enter product name"],
        maxlength: [100, "Product name cannot exceed 100 characters"]
    },
    price: {
        type: Number,
        default: 0.0
    },
    description: {
        type: String,
        required: [true, "Please enter product description"]
    },
    ratings: {
        type: String,
        default: 0
    },
    images: [
        {
            image: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please enter product category"],
        enum:{
            values: [
                'Electronics',
                'Mobile Phones',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'

            ],
            message: "Please select correct category "
        }
    },
    seller: {
        type: String,
        requierd: [true, "Please enter product seller"]
    },
    stock: {
        type: Number,
        requierd: [true, "please enter product stock"],
        maxlength: [20, 'Product stock cannot exceed 20']
    },
    numberOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name:{
                type: String,
                requierd: true
            },
            rating:{
                type: String,
                requierd: true
            },
            comment: {
                type: String,
                requierd: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
        
    
})

let schema = mongoose.model('Product', productschema)
 module.exports = schema