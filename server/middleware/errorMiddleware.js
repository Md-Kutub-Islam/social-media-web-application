const errorMiddleware = (err, req, res, next) => {
    // defulter error if the status code is not come 
    err.statusCode = err.statusCode || 500
    err.message = err.message || 'Something went wrong!'

    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
        stack: err.stack
    })
}

export default errorMiddleware