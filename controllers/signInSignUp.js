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
      return res.status(400).send({ message: error.details[0].message });
    }
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(409)
        .send({ message: "User with this email already exists." });
    } else {
      if (req.body.userName === "") {
        return res.status(400).send({ message: `Username field is empty` });
      } else if (
        req.body.password !== req.body.confirmPassword ||
        req.body.password === ""
      ) {
        return res.status(400).send({
          message: `Passwords aren't the same or password field is empty`,
        });
      } else {
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        await User.create({
          email: req.body.email,
          userName: req.body.userName,
          password: hashedPassword,
        });
        return res
          .status(201)
          .send({ message: "User registered succesfully!" });
      }
    }
  } catch (err) {
    console.log(err.message);
  }
};

const signIn = async (req, res) => {
  try {
    const { error } = signInValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(401)
        .send({ message: "User with this email adress is not registered :(" });
    }
    const validatedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validatedPassword) {
      return res.status(401).send({ message: "Incorrect password" });
    }
    const token = await user.generateAuthToken(user._id, user.email);
    return res
      .cookie("token", token, {
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: true,
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

const logout = async (req, res) => {
  try {
    const { token } = req.cookies;
    token && res.clearCookie("token").send({ message: "Cookie cleared" });
  } catch (err) {
    console.log(err.message);
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
  logout,
  newSession,
};
