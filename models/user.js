const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordJoiComplex = require("joi-password-complexity");

const { Schema, model } = mongoose;

const privateKey = process.env.PRIVATE_KEY;

const UserSchema = new Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  trainers: [Object],
  registerDate: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.methods.generateAuthToken = (id, email) => {
  const token = jwt.sign({ id: id, email: email }, process.env.PRIVATE_KEY, {
    expiresIn: "5d",
  });
  return token;
};

const User = model("User", UserSchema);

// validation for signUp

const validation = (data) => {
  const JoiSchema = Joi.object({
    userName: Joi.string().required().min(4).label("User name"),
    password: passwordJoiComplex({
      min: 4,
      max: 10,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 1,
      requirementCount: 4,
    })
      .required()
      .label("Password"),
    confirmPassword: passwordJoiComplex({
      min: 4,
      max: 10,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 1,
      requirementCount: 4,
    })
      .required()
      .label("Password"),
    email: Joi.string().email().required().label("E-mail"),
  });
  return JoiSchema.validate(data);
};

module.exports = { User, validation };
