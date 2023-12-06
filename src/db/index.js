const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete')
const userSchema = require('../moduler/userModuler');

const USER_DB = process.env.USER_DB || "userDB";
const URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/";
const MONGO_URI = `${URI}${USER_DB}`;

mongoose.set('returnOriginal', false);

userSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: true });
mongoose.model('user', userSchema);
console.log("DB Connection URl", MONGO_URI)

try {
  mongoose.connect(MONGO_URI);
  console.log("MongoDB connection Successfully");
} catch (error) {
  console.log("DB Connection Error", error);
}


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:')),

module.exports = db;