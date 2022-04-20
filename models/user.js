const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordJoiComplex = require('joi-password-complexity');

const { Schema, model } = mongoose;

const privateKey = process.env.PRIVATE_KEY;

const UserSchema = new Schema({
    userName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    trainers: [Object],
    registerDate: { 
        type: Date,
        default: Date.now()
    },
});

UserSchema.methods.generateAuthToken = (id, email) => {
    const token = jwt.sign({id: id, email: email}, process.env.PRIVATE_KEY, {expiresIn: "5d"});
    return token;
}

const User = model('User', UserSchema);

// validation for signUp

const validation = (data) => {
    const JoiSchema =  Joi.object({
        userName: Joi.string().required().label('User name'),
        password: passwordJoiComplex().required().label('Password'),
        email: Joi.string().required().label('E-mail'),
    })
    return JoiSchema.validate();
}

module.exports = {User, validation}