const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mainRoutes = require("./routes/main.js");
const signinSignupRoutes = require("./routes/signInSignUp.js");
const userTrainersRoutes = require("./routes/userTrainers.js");
require("dotenv").config({ path: "./.env" });

const app = express();
const port = process.env.PORT || 7000;

console.log(process.env.FRONTEND_URI);

//------Express-------

app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client", "build")));
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use("/", mainRoutes);
app.use("/auth", signinSignupRoutes);
app.use("/loggedUser", userTrainersRoutes);

//------ client build folder controller ------ //

//------ CORS handler ------

app.all("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://pokemontrainerappclient.onrender.com"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  next();
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

//------Mongoose-------

const main = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USERS_USERNAME}:${process.env.USERS_API_KEY}@pokemon-app.2s1cy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    );
    console.log("Database connection works!");
  } catch (err) {
    console.log(err.message);
  }
};

main()
  .then(() =>
    app.listen(port, () => {
      console.log(`Server works on port ${port}`);
    })
  )
  .catch((err) => console.log(err.message));
