const { constants } = require('../constants')

const errorHandler = (err, req, res, next) => {
    const status = res.statusCode ? res.statusCode : 500
    const errorObject = {
        message: err.message, 
        stackTrace: err.stack
    }
    switch (status) {
        case constants.VALIDATION_ERROR:
            errorObject['title'] = "Validation error"
            res.json(errorObject)
            break;

        case constants.NOT_FOUND:
            errorObject['title'] = "Resource not found"
            res.json(errorObject)
            break;

        case constants.UNAUTHORIZED:
            errorObject['title'] = "Unauthorized access blocked"
            res.json(errorObject)
            break;

        case constants.FORBIDDEN:
            errorObject['title'] = "Forbidden"
            res.json(errorObject)
            break;

        case constants.SERVER_ERROR:
            errorObject['title'] = "Internal server error"
            res.json(errorObject)
            break;

        default:
            errorObject['title'] = "Sorry something gone wrong, please try again."
            res.json(errorObject)
            break;
    }
}

module.exports = errorHandler