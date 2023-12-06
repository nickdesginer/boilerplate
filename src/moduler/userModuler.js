const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    username: { type: String,required: true, unique: true },
    mobile: { type: Number, required: true }, 
    password : { type: String , required: true},
  },
  {
    timestamps: true,
  }
);

module.exports = userSchema;