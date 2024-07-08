// this code or file user to send error if the error is occure during runtime. basicaly it is use avoid code which we write to handle error in our code. This is the instance of the error

class AppError extends Error {
    constructor(message, statusCode){
        super(message)

        this.statusCode = statusCode

        // this line of code throw error messsage basicaly where the error is occured
        Error.captureStackTrace(this, this.contructor)
    }
}

export default AppError