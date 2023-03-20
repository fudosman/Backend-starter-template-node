const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
  },
  middlename: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  phone_number: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  role: {
    type: String,
    enum: ["admin", "client", "freelancer"]
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  address: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  avatar: {
    type: String,
  },
  userPhoto: {
    type: String,
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: {
    type: String,
  },
  setPasswordToken: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "suspended", "deleted"],
    default: "active",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
