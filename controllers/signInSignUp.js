const bcrypt = require("bcryptjs");
const Joi = require("joi");
const { User, validation } = require("../models/user.js");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

const signUp = async (req, res) => {
  try {
    const { error } = validation(req.body);
    if (error) {
      res.status(400).send({ message: error.details[0].message });
    }
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(409).send({ message: "User with this email already exists." });
    } else {
      if (req.body.userName === "") {
        res.status(400).send({ message: `Username field is empty` });
      } else if (
        req.body.password !== req.body.confirmPassword ||
        req.body.password === ""
      ) {
        res.status(400).send({
          message: `Passwords aren't the same or password field is empty`,
        });
      } else {
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        await User.create({
          email: req.body.email,
          userName: req.body.userName,
          password: hashedPassword,
        });
        res.status(201).send({ message: "User registered succesfully!" });
      }
    }
  } catch (err) {
    res.status(500).send({ message: "Internal server error :(" });
  }
};

const signIn = async (req, res) => {
  try {
    const { error } = signInValidation(req.body);
    if (error) {
      res.status(400).send({ message: error.details[0].message });
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res
        .status(401)
        .send({ message: "User with this email adress is not registered :(" });
    }
    const validatedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validatedPassword) {
      res.status(401).send({ message: "Incorrect password" });
    }
    const token = await user.generateAuthToken(user._id, user.email);
    res
      .cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: process.env.NODE_ENV === "production" ? true : false,
        secure: false,
      })
      .status(200)
      .send({
        message: "Log in succesfully",
        userData: {
          userId: user._id,
          userName: user.userName,
          email: user.email,
          trainers: user.trainers,
          logged: true,
        },
      });
  } catch (err) {
    console.log(err.message);
  }
};

const signInViaGoogle = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({
        message:
          "You have to register your account with this email in this app",
      });
    }
    const token = user.generateAuthToken(user._id, user.email);
    res
      .cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: process.env.NODE_ENV === "production" ? true : false,
        secure: false,
      })
      .status(200)
      .send({
        message: "Log in succesfully",
        userData: {
          userId: user._id,
          userName: user.userName,
          email: user.email,
          trainers: user.trainers,
          logged: true,
        },
      });
  } catch (err) {
    res.status(500).send({ message: "Internal server error :(" });
  }
};

const logout = async (req, res) => {
  try {
    const { token } = req.cookies;
    token && res.clearCookie("token").send({ message: "Cookie cleared" });
  } catch (err) {
    res.status(500).send({ message: "Internal server error :(" });
  }
};

const newSession = async (req, res) => {
  const { token } = req.cookies;
  !token
    ? res.status(200).send({ cookie: false, logged: false })
    : res.status(200).send({ cookie: true, logged: true });
};

// validation for signIn

const signInValidation = (data) => {
  const JoiSchema = Joi.object({
    email: Joi.string().required().label("E-mail"),
    password: Joi.string().required().label("Password"),
  });
  return JoiSchema.validate(data);
};

module.exports = {
  getUsers,
  signUp,
  signIn,
  signInViaGoogle,
  logout,
  newSession,
};
