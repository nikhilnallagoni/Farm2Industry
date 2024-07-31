const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  minPrice: {
    type: Number,
  },
  maxPrice: {
    type: Number,
  },
  avgPrice: {
    type: Number,
  },
});
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please add the username"],
    },
    email: {
      type: String,
      require: [true, "please enter the email"],
      unique: [true, "email already taken"],
    },
    password: {
      type: String,
      unique: [true, "please enter the password"],
    },
    address: {
      type: String,
    },
    contactNumber: {
      type: String,
    },
    cropDetails: {
      type: [cropSchema],
    },
    type: {
      type: String,
      enum: ["farmer", "industrialist"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);
