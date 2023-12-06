function successOrErrors(key) {
    /**
     * SUCCESS MESSAGE
     */
    var successMessages = {
        "login": "Login Successfully",
        "register": "Registration Successfully",
        "update": "Updated Successfully",
        "delete": "Deleted Successfully",
        "get": "Fetched Single Successfully",
        "getall": "Get All Successful",
        "logout": "Logout Successful",
        "getbyuserid": "Get by user id",
        
    }

    /**
     * ERROR OBJECT
     */
    var obj = {
        "successMessage": successMessages,
        "ex_00": {
            code: "ex_00",
            failMsg: "Exception",
            message: "exception",
        },
        "err_00": {
            code: "err_00",
            failMsg: "NotFound",
            message: "users list not found",
        },
        "err_01": {
            code: "err_01",
            failMsg: "IncorrectDetails",
            message: "Incorrect login credentials",
        },
        "err_02": {
            code: "err_02",
            failMsg: "IncorrectDetails",
            message: "Incorrect password, Please try again",
        },
        "err_03": {
            code: "err_03",
            failMsg: "invalidUserId",
            message: "Please enter valid user id",
        },
    }
    return obj[key]
}

module.exports = {
    successOrErrors
}