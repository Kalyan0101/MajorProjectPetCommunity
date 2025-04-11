class ApiError extends Error{
    constructor(
        statusCode,
        message = "Something went wrong!!!",
        errors = []
    ){
        console.log(this.data);
        
        super(message);
        this.statusCode = statusCode;
        this.data = null
        this.message = message;
        this.success = false
        this.errors = errors
    }    
}

export { ApiError };