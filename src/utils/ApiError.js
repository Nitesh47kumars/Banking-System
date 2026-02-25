class ApiError extends Error{
    constructor(
        statusCode,
        message = "something Went Wrong",
        errors,
        stack
    ){
        super(message);
        this.statusCode = statusCode;
        this.success = false;
        this.data = null;
        this.errors = errors;

        if(stack){
            this.stack = stack;
        }{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;