require('dotenv').config();
const userService = require('../services/userService');
const { successOrErrors } = require('../../helper/responseService')
const APIResponse = require('../../helper/APIResponse')
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
class userController {
    async createUser(req) {
        try {
            req.body.password = bcrypt.hashSync(req.body.password, salt)
            let userData = await userService.createUser(req.body);
            var successOrError = successOrErrors("successMessage");
            return APIResponse.successCreateResponse(successOrError.register, userData, []);
        } catch (error) {
            var successOrError = successOrErrors("ex_00");
            var resobj = APIResponse.resObj(error.message);
            return APIResponse.failResponse(successOrError.failMsg, {}, resobj)
        }
    }

    async getAllUser() {
        try {
            let userData = await userService.getAllUser();
            if (userData != null && userData.length != 0) {
                var successOrError = successOrErrors("successMessage");
                return APIResponse.successGetResponse(successOrError.getall, userData, []);
            }
            else {
                var successOrError = successOrErrors("err_00");
                return APIResponse.successGetResponse(successOrError.message, userData, []);
            }
        } catch (error) {
            var successOrError = successOrErrors("ex_00");
            var resobj = APIResponse.resObj(error.message);
            return APIResponse.failResponse(successOrError.failMsg, {}, resobj)

        }
    }

    async findById(req) {
        try {
            let userData = await userService.findById(req.params.id);
            if (userData != null && userData.length != 0) {
                var successOrError = successOrErrors("successMessage");
                return APIResponse.successGetResponse(successOrError.get, userData, []);
            }
            else {
                var successOrError = successOrErrors("err_03");
                return APIResponse.successGetResponse(successOrError.message, userData, []);
            }
        } catch (error) {
            var successOrError = successOrErrors("ex_00");
            var resobj = APIResponse.resObj(error.message);
            return APIResponse.failResponse(successOrError.failMsg, {}, resobj)
        }
    }

    async UpdateUser(req) {
        try {
            let userData = await userService.findById(req.params.id);
            if (userData != null && userData.length != 0) {
                let nuserData = await userService.UpdateUser(req.params.id, req.body);
                var successOrError = successOrErrors("successMessage");
                return APIResponse.successResponse(successOrError.update, nuserData, []);
            }
            else {
                var successOrError = successOrErrors("err_03");
                return APIResponse.successGetResponse(successOrError.message, userData, []);
            }
        } catch (error) {
            var successOrError = successOrErrors("ex_00");
            var resobj = APIResponse.resObj(error.message);
            return APIResponse.failResponse(successOrError.failMsg, {}, resobj)
        }
    }

    async deleteUser(req) {
        try {
            let userData = await userService.findById(req.params.id);
            if (userData != null && userData.length != 0) {
                let nuserData = await userService.deleteUser(req.params.id);
                var successOrError = successOrErrors("successMessage");
                return APIResponse.successResponse(successOrError.delete, nuserData, []);
            }
            else {
                var successOrError = successOrErrors("err_03");
                return APIResponse.successGetResponse(successOrError.message, userData, []);
            }
        } catch (error) {
            var successOrError = successOrErrors("ex_00");
            var resobj = APIResponse.resObj(error.message);
            return APIResponse.failResponse(successOrError.failMsg, {}, resobj)
        }
    }

    async loginUser(req) {
        try {
            let userData = await userService.findByuserName(req.body.username);
            if (userData != null && userData.length != 0) {
                var comparePassword = await bcrypt.compare(req.body.password, userData.password)
                if (!comparePassword) {
                    var successOrError = successOrErrors("err_02");
                    var resobj = APIResponse.resObj(successOrError.message);
                    return APIResponse.failResponse("Errors", {}, resobj);
                }
                else {
                    const token = jwt.sign({ userData: userData }, process.env.secretKey)
                    userData = { ...userData.toObject(), 'token': token };
                    var successOrError = successOrErrors("successMessage");
                    return APIResponse.successResponse(successOrError.login, userData, []);
                }
            }
            else {
                var successOrError = successOrErrors("err_01");
                var resobj = APIResponse.resObj(successOrError.message);
                return APIResponse.failResponse("Errors", {}, resobj);
            }
        } catch (error) {
            var successOrError = successOrErrors("ex_00");
            var resobj = APIResponse.resObj(error.message);
            return APIResponse.failResponse(successOrError.failMsg, {}, resobj)
        }
    }
}

module.exports = new userController();