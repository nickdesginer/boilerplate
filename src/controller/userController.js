require('dotenv').config();
const userService = require('../services/userService');
const APIResponse = require('../../helper/APIResponse')
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
class userController {
    async createUser(req) {
        try {
            req.body.password = bcrypt.hashSync(req.body.password, salt)
            let userData = await userService.createUser(req.body);
            return APIResponse.successCreateResponse("Registration Successfully", userData, []);
        } catch (error) {
            var resobj = APIResponse.resObj(error.message);
            return APIResponse.failResponse("Exception", {}, resobj)
        }
    }

    async getAllUser() {
        try {
            let userData = await userService.getAllUser();
            if (userData != null && userData.length != 0) {
                return APIResponse.successGetResponse("Get All Successful", userData, []);
            }
            else {
                return APIResponse.successGetResponse("users list not found", userData, []);
            }
        } catch (error) {
            var resobj = APIResponse.resObj(error.message);
            return APIResponse.failResponse("Exception", {}, resobj)
        }
    }

    async findById(req) {
        try {
            let userData = await userService.findById(req.params.id);
            if (userData != null && userData.length != 0) {
                return APIResponse.successGetResponse("Fetched Single Successfully", userData, []);
            }
            else {
                return APIResponse.successGetResponse("Please enter valid user id", userData, []);
            }
        } catch (error) {
            var resobj = APIResponse.resObj(error.message);
            return APIResponse.failResponse("Exception", {}, resobj)
        }
    }

    async UpdateUser(req) {
        try {
            let userData = await userService.findById(req.params.id);
            if (userData != null && userData.length != 0) {
                let nuserData = await userService.UpdateUser(req.params.id, req.body);
                return APIResponse.successResponse("Updated Successfully", nuserData, []);
            }
            else {
                return APIResponse.successGetResponse("Please enter valid user id", userData, []);
            }
        } catch (error) {
            var resobj = APIResponse.resObj(error.message);
            return APIResponse.failResponse("Exception", {}, resobj)
        }
    }

    async deleteUser(req) {
        try {
            let userData = await userService.findById(req.params.id);
            if (userData != null && userData.length != 0) {
                let nuserData = await userService.deleteUser(req.params.id);
                return APIResponse.successResponse("Deleted Successfully", nuserData, []);
            }
            else {
                return APIResponse.successGetResponse("Please enter valid user id", userData, []);
            }
        } catch (error) {
            var resobj = APIResponse.resObj(error.message);
            return APIResponse.failResponse("Exception", {}, resobj)
        }
    }

    async loginUser(req) {
        try {
            let userData = await userService.findByuserName(req.body.username);
            if (userData != null && userData.length != 0) {
                var comparePassword = await bcrypt.compare(req.body.password, userData.password)
                if (!comparePassword) {
                    var resobj = APIResponse.resObj("Incorrect password, Please try again");
                    return APIResponse.failResponse("Errors", {}, resobj);
                }
                else {
                    const token = jwt.sign({ userData: userData }, process.env.secretKey)
                    userData = { ...userData.toObject(), 'token': token };
                    return APIResponse.successResponse("Login Successfully", userData, []);
                }
            }
            else {
                var resobj = APIResponse.resObj("Incorrect login credentials");
                return APIResponse.failResponse("Errors", {}, resobj);
            }
        } catch (error) {
            var resobj = APIResponse.resObj(error.message);
            return APIResponse.failResponse("Exception", {}, resobj)
        }
    }
}

module.exports = new userController();