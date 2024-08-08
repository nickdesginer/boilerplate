const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const userSchema = require("../moduler/userModuler");

const MONGO_URI = process.env.DB_URL;

mongoose.set("returnOriginal", false);

userSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: true });
mongoose.model("user", userSchema);
console.log("DB Connection URl", MONGO_URI);

try {
  mongoose.connect(MONGO_URI);
  console.log("MongoDB connection Successfully");
} catch (error) {
  console.log("DB Connection Error", error);
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:")),
  (module.exports = db);
