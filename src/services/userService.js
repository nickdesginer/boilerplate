const mongoose = require("mongoose");
const user = mongoose.model("user");
class userService {
    async createUser(data) {
       var userm=new user(data)
       return userm.save();
    }

    async getAllUser(){
        return user.find().sort({createdAt:-1});
    }

    async findById(id){
        return user.findOne({_id:id})
    }

    async UpdateUser(id,data){
        return user.findByIdAndUpdate(id,data)
    }

    async deleteUser(id){
        return user.deleteById(id)
    }

    async findByuserName(username){
        return user.findOne({username:username})
    }
}

module.exports = new userService;