const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    
    // Normalize common mongoose errors for both environments
    if (err.name === 'CastError') {
        err.message = `Resource not found: ${err.path}`;
        err.statusCode = 400;
    }
    if (err.name === 'ValidationError') {
        err.message = Object.values(err.errors).map(value => value.message).join(', ');
        err.statusCode = 400;
    }

    if (process.env.NODE_ENV == 'development') {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            stack: err.stack,
            error: err
        })
    }

    if(process.env.NODE_ENV == 'production'){
        let message = err.message;
        let error = new Error(message);


        if (err.name === "ValidationError"){
            message = Object.values(err.errors).map(value => value.message).join(', ');
            error = new Error(message);
            error.statusCode = 400;
        }

        if (err.name == 'CastError'){
            message = `Resource not found: ${err.path}`;
            error = new Error(message);
        }
        res.status(err.statusCode).json({
           success: false,
           message: error.message || 'Internal Server Error'
    })
    }

    



}