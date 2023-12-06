let Joi = require("joi");
const status = require('http-status');
const APIResponse = require('./APIResponse')

var usercreateJoiValidation = Joi.object()
    .keys({
        firstName: Joi.string().required().error(new Error("firstName is required")),
        lastName: Joi.string().required().error(new Error("lastName is required")),
        mobile: Joi.number().required().error(new Error("please enter Valid Mobile Number")),
        username: Joi.string().min(3).max(30).required().error(new Error("please enter Valid username")),
        password: Joi.string().required().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&]).{8,}$/)
            .pattern(new RegExp("^[a-zA-Z0-9!@#$%&]{8,}$")).error(new Error("please enter Valid Password")),
    })
    .unknown();


function userCreateValidate(req, res, next) {
    const Data = req.body;
    const { error, result } = usercreateJoiValidation.validate(Data);
    if (error) {
        return res
            .status(status.BAD_REQUEST)
            .json(APIResponse.resObj(status.BAD_REQUEST, error.message));
    } else {
        return next();
    }
}


var userupdateJoiValidation = Joi.object()
    .keys({
        firstName: Joi.string().required().error(new Error("firstName is required")),
        lastName: Joi.string().required().error(new Error("lastName is required")),
        mobile: Joi.number().required().error(new Error("please enter Valid Mobile Number")),
        username: Joi.string().min(3).max(30).required().error(new Error("please enter Valid username")),
    })
    .unknown();


function userupdateValidate(req, res, next) {
    const Data = req.body;
    const { error, result } = userupdateJoiValidation.validate(Data);
    if (error) {
        return res
            .status(status.BAD_REQUEST)
            .json(APIResponse.resObj(status.BAD_REQUEST, error.message));
    } else {
        return next();
    }
}

module.exports = {
    userCreateValidate,
    userupdateValidate
}
